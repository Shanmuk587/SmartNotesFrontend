import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useNotes } from '../hooks/useNotes'
import NoteForm from '../components/notes/NoteForm'
import { useMemo } from 'react'

const CreateNote = () => {
  const { createNote } = useNotes()
  const navigate = useNavigate()
  
  // Handle form submission
  const handleSubmit = async (formData) => {
    const note = await createNote(formData)
    if (note) {
      navigate('/dashboard')
    }
  }
  
  // No need for useMemo here since the default values are now in NoteForm
  // But if you want to keep it for consistency:
  // const initialData = useMemo(() => ({
  //   title: '',
  //   content: '',
  //   tags: []
  // }), [])

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Note</h1>
        <NoteForm onSubmit={handleSubmit} />
      </motion.div>
    </div>
  )
}

export default CreateNote