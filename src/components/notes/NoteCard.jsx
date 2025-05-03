import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import Tag from '../common/Tag'

const NoteCard = ({ note }) => {
  const { _id, title, summary, tags, createdAt, updatedAt } = note
  
  // Format date to display
  const formattedDate = format(new Date(updatedAt || createdAt), 'MMM d, yyyy')
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card h-full flex flex-col"
    >
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {summary}
        </p>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <Tag key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span>{formattedDate}</span>
          
          <Link
            to={`/view-note/${_id}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default NoteCard