import { motion } from 'framer-motion'

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  // Generate page numbers array
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }
  
  const pageNumbers = getPageNumbers()
  
  // If only one page, don't show pagination
  if (totalPages <= 1) {
    return null
  }
  
  return (
    <nav className={`flex items-center justify-center ${className}`}>
      <ul className="flex space-x-1">
        {/* Previous button */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Prev
          </button>
        </li>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 rounded-md text-sm text-gray-700">
                ...
              </span>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-primary-600 text-white border border-primary-600'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </motion.button>
            )}
          </li>
        ))}
        
        {/* Next button */}
        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination