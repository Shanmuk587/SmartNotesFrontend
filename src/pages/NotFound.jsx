import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/common/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center">
          <div className="bg-primary-100 text-primary-600 p-3 rounded-full inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8">
          <Link to="/dashboard">
            <Button size="lg">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound