import { useState, useEffect } from 'react'
import { useNotes } from '../../hooks/useNotes'
import Button from '../common/Button'
import Input from '../common/Input'
import TextArea from '../common/TextArea'
import TagInput from '../common/TagInput'
const defaultInitialData = { title: '', content: '', tags: [] }
const NoteForm = ({
  initialData = defaultInitialData,
  onSubmit,
  isEdit = false
}) => {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [suggestedTags, setSuggestedTags] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFetchingTags, setIsFetchingTags] = useState(false)
  const { getSuggestedTags } = useNotes()
  
  // Update formData if initialData changes (e.g. when fetching existing note)
  useEffect(() => {
    setFormData(initialData)
  }, [initialData])
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }
  
  // Handle tags change
  const handleTagsChange = (newTags) => {
    setFormData(prev => ({ ...prev, tags: newTags }))
  }
  
  // Function to manually fetch tag suggestions
  const handleSuggestTags = async () => {
    if (formData.content.trim().length < 10) {
      setErrors(prev => ({ 
        ...prev, 
        content: 'Need at least 10 characters to generate tag suggestions' 
      }))
      return
    }

    setIsFetchingTags(true)
    
    try {
      const suggestedTags = await getSuggestedTags(formData.content)
      // Filter out tags that are already selected
      const filteredTags = suggestedTags.filter(tag => !formData.tags.includes(tag))
      setSuggestedTags(filteredTags)
    } catch (error) {
      console.error('Failed to get tag suggestions:', error)
    } finally {
      setIsFetchingTags(false)
    }
  }
  
  // Function to add a suggested tag when clicked
  const handleAddSuggestedTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      const newTags = [...formData.tags, tag]
      setFormData(prev => ({ ...prev, tags: newTags }))
      
      // Remove from suggestions after adding
      setSuggestedTags(prev => prev.filter(t => t !== tag))
    }
  }
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
      // Form submission handled by parent component
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter note title"
        error={errors.title}
        required
      />
      
      <TextArea
        label="Content"
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Write your note here..."
        rows={8}
        error={errors.content}
        required
      />
      
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <Button 
            type="button" 
            onClick={handleSuggestTags} 
            isLoading={isFetchingTags}
            variant="secondary"
            size="sm"
          >
            Suggest Tags
          </Button>
        </div>
        
        <TagInput
          id="tags"
          tags={formData.tags}
          onChange={handleTagsChange}
          placeholder="Add tags (press Enter to add)"
        />
        
        {suggestedTags.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Suggested tags (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddSuggestedTag(tag)}
                  className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          {isEdit ? 'Update Note' : 'Create Note'}
        </Button>
      </div>
    </form>
  )
}

export default NoteForm