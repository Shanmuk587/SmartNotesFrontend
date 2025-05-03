import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useNotes } from '../hooks/useNotes'
import NoteForm from '../components/notes/NoteForm'
import LoadingSpinner from '../components/common/LoadingSpinner'

const EditNote = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { fetchNote, updateNote } = useNotes()
  
  const [note, setNote] = useState(location.state?.note || null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(!location.state?.note)

  useEffect(() => {
    // Only fetch the note if it wasn't passed through navigation state
    if (!location.state?.note && id) {
      const getNoteData = async () => {
        setLoading(true)
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
          setLoading(false)
        }
      }
      
      getNoteData()
    }
  }, [id, location.state])

  const handleSubmit = async (formData) => {
    try {
      const updatedNote = await updateNote(id, formData)
      if (updatedNote) {
        // Navigate back to view note page with the updated note data
        navigate(`/view-note/${id}`, { state: { note: updatedNote } })
      } else {
        setError('Failed to update note')
      }
    } catch (err) {
      console.error('Error updating note:', err)
      setError('Failed to update note')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

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

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Note</h1>
        <NoteForm initialData={note} onSubmit={handleSubmit} isEdit />
      </motion.div>
    </div>
  )
}

export default EditNote