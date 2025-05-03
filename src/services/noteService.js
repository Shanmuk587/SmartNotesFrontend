import api from './api'

// Get all notes with pagination
export const getNotes = (page = 1, limit = 9) => {
  return api.get(`/notes?page=${page}&limit=${limit}`)
}

// Get a single note by ID
export const getNote = (id) => {
  return api.get(`/notes/${id}`)
}

// Create a new note
export const createNote = (noteData) => {
  return api.post('/notes', noteData)
}

// Update an existing note
export const updateNote = (id, noteData) => {
  return api.put(`/notes/${id}`, noteData)
}

// Delete a note
export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`)
}

// Search notes by content or tags
export const searchNotes = (query = '', tags = [], page = 1, limit = 9) => {
  const queryParams = new URLSearchParams()
  
  if (query) {
    queryParams.append('query', query)
  }
  
  if (tags && tags.length > 0) {
    tags.forEach(tag => {
      queryParams.append('tags', tag)
    })
  }
  
  queryParams.append('page', page)
  queryParams.append('limit', limit)
  
  return api.get(`/notes/search?${queryParams.toString()}`)
}

// Get AI-suggested tags based on content
export const getSuggestedTags = (content) => {
  return api.post('/notes/suggest-tags', { content })
}