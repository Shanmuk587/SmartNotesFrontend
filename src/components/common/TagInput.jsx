import { useState, useEffect, useRef } from 'react'
import Tag from './Tag'

const TagInput = ({
  label,
  id,
  tags = [],
  onChange,
  suggestedTags = [],
  onAddSuggestion,
  placeholder = 'Add tags...',
  disabled = false,
  error,
  ...props
}) => {
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef(null)
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  
  // Handle keydown
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      
      // Check if tag already exists
      if (!tags.includes(inputValue.trim().toLowerCase())) {
        const newTags = [...tags, inputValue.trim().toLowerCase()]
        onChange(newTags)
      }
      
      setInputValue('')
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove the last tag when backspace is pressed on an empty input
      const newTags = [...tags.slice(0, -1)]
      onChange(newTags)
    }
  }
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    const newTags = tags.filter(tag => tag !== tagToRemove)
    onChange(newTags)
  }
  
  // Add a suggested tag
  const addSuggestion = (tag) => {
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag]
      onChange(newTags)
      if (onAddSuggestion) {
        onAddSuggestion(tag)
      }
    }
  }
  
  // Focus the input when clicking on the container
  const handleContainerClick = () => {
    inputRef.current?.focus()
  }
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      
      <div 
        className={`
          flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md bg-white focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500
          ${error ? 'border-error-500 focus-within:border-error-500 focus-within:ring-error-500' : ''}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        `}
        onClick={handleContainerClick}
      >
        {/* Existing tags */}
        {tags.map(tag => (
          <Tag 
            key={tag}
            onRemove={() => !disabled && removeTag(tag)}
          >
            {tag}
          </Tag>
        ))}
        
        {/* Input field */}
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled}
          className="flex-grow min-w-[120px] p-1 border-none focus:outline-none focus:ring-0 text-sm"
          {...props}
        />
      </div>
      
      {/* Error message */}
      {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      
      {/* Suggested tags */}
      {suggestedTags.length > 0 && !disabled && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.map(tag => (
              <Tag
                key={tag}
                onClick={() => addSuggestion(tag)}
                isSelected={tags.includes(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TagInput