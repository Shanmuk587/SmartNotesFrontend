import { motion } from 'framer-motion'

const Tag = ({ 
  children, 
  onClick, 
  onRemove, 
  isSelected = false, 
  className = '',
  ...props 
}) => {
  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${isSelected 
          ? 'bg-primary-100 text-primary-800 hover:bg-primary-200' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500 focus:outline-none focus:bg-gray-500 focus:text-white"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
        >
          <span className="sr-only">Remove tag</span>
          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
          </svg>
        </button>
      )}
    </motion.span>
  )
}

export default Tag