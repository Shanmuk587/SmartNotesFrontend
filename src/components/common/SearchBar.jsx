import { useState } from 'react'
import { motion } from 'framer-motion'
import { IoSearch, IoClose } from 'react-icons/io5'

const SearchBar = ({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Search notes...',
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(value)
    }
  }
  
  const handleClear = () => {
    onChange('')
  }
  
  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative ${className}`}
    >
      <motion.div
        animate={{
          boxShadow: isFocused 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
            : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }}
        className="flex items-center w-full rounded-lg border border-gray-300 bg-white overflow-hidden"
      >
        <div className="pl-3 pr-2">
          <IoSearch className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full py-2 px-1 text-gray-700 leading-tight focus:outline-none"
        />
        
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <IoClose className="h-5 w-5" />
          </button>
        )}
      </motion.div>
    </form>
  )
}

export default SearchBar