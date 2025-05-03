import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format, isValid } from 'date-fns'
import { IoArrowBack, IoPencil, IoTrash } from 'react-icons/io5'
import { useNotes } from '../hooks/useNotes'
import Button from '../components/common/Button'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Tag from '../components/common/Tag'

const ViewNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { fetchNote, deleteNote } = useNotes()
  const [note, setNote] = useState(null)
  const [error, setError] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch note data
  useEffect(() => {
    const getNoteData = async () => {
      setIsLoading(true)
      try {
        const response = await fetchNote(id)
        if (response && response.data) {
          setNote(response.data)
          setError(null)
        } else {
          setError('Note not found')
        }
      } catch (err) {
        console.error('Error fetching note:', err)
        setError('Failed to load note')
      } finally {
        setIsLoading(false)
      }
    }
    
    if (id) {
      getNoteData()
    }
  }, [id])
  
  // Handle note deletion
  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const success = await deleteNote(id)
      if (success) {
        navigate('/dashboard')
      } else {
        setError('Failed to delete note')
        setShowDeleteConfirm(false)
      }
    } catch (err) {
      console.error('Error deleting note:', err)
      setError('Failed to delete note')
      setShowDeleteConfirm(false)
    } finally {
      setIsDeleting(false)
    }
  }
  
  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return isValid(date) ? format(date, 'MMMM d, yyyy') : null;
  }
  
  // Navigate to edit page with note data
  const handleEdit = () => {
    navigate(`/edit-note/${id}`, { state: { note } });
  };
  
  // Show loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  
  // Show error message
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600">{error}</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }

  // Ensure note exists
  if (!note) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600">Note not found</div>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Return to Dashboard
        </button>
      </div>
    )
  }
  
  // Get formatted dates
  const updatedDate = formatDate(note.updatedAt);
  const createdDate = formatDate(note.createdAt);
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
        >
          <IoArrowBack className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm overflow-hidden"
      >
        {/* Note header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{note.title}</h1>
            
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={handleEdit}>
                <IoPencil className="h-5 w-5 mr-2" />
                Edit
              </Button>
              
              <Button 
                variant="danger" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                <IoTrash className="h-5 w-5 mr-2" />
                Delete
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-sm text-gray-500">
            {updatedDate ? (
              <span>Updated on {updatedDate}</span>
            ) : createdDate ? (
              <span>Created on {createdDate}</span>
            ) : (
              <span>No date available</span>
            )}
          </div>
        </div>
        
        {/* Note summary */}
        <div className="p-6 bg-gray-50 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Summary</h2>
          <p className="text-gray-800">{note.summary || 'No summary available'}</p>
        </div>
        
        {/* Note content */}
        <div className="p-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Content</h2>
          <div className="prose max-w-none">
            {note.content ? (
              note.content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index} className="mb-4 text-gray-800">
                    {paragraph}
                  </p>
                ) : <br key={index} />
              ))
            ) : (
              <p className="text-gray-600 italic">No content available</p>
            )}
          </div>
        </div>
        
        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="px-6 pb-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delete Note</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <Button 
                variant="secondary" 
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewNote