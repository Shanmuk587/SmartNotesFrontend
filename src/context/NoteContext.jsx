import { createContext, useState, useEffect, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'
import { 
  getNotes, 
  getNote, 
  createNote, 
  updateNote, 
  deleteNote,
  searchNotes as apiSearchNotes,
  getSuggestedTags
} from '../services/noteService'

export const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalNotes: 0,
    limit: 9
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTags, setSearchTags] = useState([])
  const [isSearchActive, setIsSearchActive] = useState(false)
  const { isAuthenticated } = useAuth()
  
  // Prevent auto-fetching on mount (we'll control this from the components)
  const initialFetchDone = useRef(false)

  // Fetch notes - wrapped in useCallback to prevent recreation on each render
  const fetchNotes = useCallback(async (page = 1, limit = 9) => {
    if (!isAuthenticated) return null
    
    setLoading(true)
    setError(null)
    try {
      const response = await getNotes(page, limit)
      setNotes(response.data.data)
      setPagination({
        currentPage: response.data.pagination.page,
        totalPages: response.data.pagination.pages,
        totalNotes: response.data.pagination.total,
        limit: response.data.pagination.limit
      })
      return response.data
    } catch (error) {
      setError('Failed to fetch notes')
      toast.error('Failed to fetch notes')
      return null
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  // Fetch a single note - wrapped in useCallback
  const fetchNote = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await getNote(id)
      setCurrentNote(response.data.data)
      return response.data
    } catch (error) {
      setError('Failed to fetch note')
      toast.error('Failed to fetch note')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Create a new note - wrapped in useCallback
  const handleCreateNote = useCallback(async (noteData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await createNote(noteData)
      toast.success('Note created successfully')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create note'
      setError(message)
      toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Update an existing note - wrapped in useCallback
  const handleUpdateNote = useCallback(async (id, noteData) => {
    setLoading(true)
    setError(null)
    try {
      const response = await updateNote(id, noteData)
      toast.success('Note updated successfully')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update note'
      setError(message)
      toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // Delete a note - wrapped in useCallback
  const handleDeleteNote = useCallback(async (id) => {
    setLoading(true)
    setError(null)
    try {
      await deleteNote(id)
      setNotes(notes.filter(note => note.id !== id))
      toast.success('Note deleted successfully')
      return true
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete note'
      setError(message)
      toast.error(message)
      return false
    } finally {
      setLoading(false)
    }
  }, [notes])

  // Search notes - wrapped in useCallback
  const searchNotes = useCallback(async (query = '', tags = [], page = 1, limit = 9) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiSearchNotes(query, tags, page, limit)
      setNotes(response.data.data)
      setPagination({
        currentPage: response.data.pagination.page,
        totalPages: response.data.pagination.pages,
        totalNotes: response.data.pagination.total,
        limit: response.data.pagination.limit
      })
      return response.data.data
    } catch (error) {
      setError('Search failed')
      toast.error('Search failed')
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  // Get tag suggestions - wrapped in useCallback
  const handleGetSuggestedTags = useCallback(async (content) => {
    try {
      const response = await getSuggestedTags(content)
      console.log(response,'suggested tags')
      return response.data.data.suggestedTags
    } catch (error) {
      console.error('Failed to get tag suggestions:', error)
      return []
    }
  }, [])

  // Disable automatic fetching on mount - let components control fetching
  useEffect(() => {
    // Only fetch notes automatically if it's the first time and we're not in search mode
    if (isAuthenticated && !isSearchActive && !initialFetchDone.current) {
      initialFetchDone.current = true
      // We don't call fetchNotes here - we let the Dashboard component handle that
    }
  }, [isAuthenticated, isSearchActive])

  const contextValue = {
    notes,
    currentNote,
    loading,
    error,
    pagination,
    searchQuery,
    setSearchQuery,
    searchTags,
    setSearchTags,
    isSearchActive,
    setIsSearchActive,
    fetchNotes,
    fetchNote,
    createNote: handleCreateNote,
    updateNote: handleUpdateNote,
    deleteNote: handleDeleteNote,
    searchNotes,
    getSuggestedTags: handleGetSuggestedTags
  }

  return (
    <NoteContext.Provider value={contextValue}>
      {children}
    </NoteContext.Provider>
  )
}