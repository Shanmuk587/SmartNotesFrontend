import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { IoAddCircle } from 'react-icons/io5'
import { useNotes } from '../hooks/useNotes'
import NoteList from '../components/notes/NoteList'
import SearchBar from '../components/common/SearchBar'
import TagInput from '../components/common/TagInput'
import Button from '../components/common/Button'

const Dashboard = () => {
  const { 
    notes, 
    loading, 
    pagination,
    searchQuery,
    setSearchQuery, 
    searchTags,
    setSearchTags, 
    searchNotes, 
    fetchNotes,
    setIsSearchActive
  } = useNotes()
  
  const [isSearching, setIsSearching] = useState(false)
  
  // Fetch notes on component mount
  useEffect(() => {
    // If we're not in search mode, refresh the notes
    if (!isSearching) {
      fetchNotes(1, pagination.limit)
    }
  }, []) // Empty dependency array to run only on mount
  
  // Handle search query change
  const handleSearchQueryChange = (value) => {
    setSearchQuery(value)
  }
  
  // Handle search tags change
  const handleSearchTagsChange = (tags) => {
    setSearchTags(tags)
  }
  
  // Handle search submit
  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim() || searchTags.length > 0) {
      setIsSearching(true)
      setIsSearchActive(true)
      searchNotes(searchQuery, searchTags)
    } else {
      clearSearch()
    }
  }, [searchQuery, searchTags, searchNotes, setIsSearchActive])
  
  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchTags([])
    setIsSearching(false)
    setIsSearchActive(false)
    fetchNotes(1, pagination.limit)
  }, [setSearchQuery, setSearchTags, fetchNotes, pagination, setIsSearchActive])
  
  // Handle page change
  const handlePageChange = useCallback((page) => {
    if (isSearching) {
      searchNotes(searchQuery, searchTags, page, pagination.limit)
    } else {
      fetchNotes(page, pagination.limit)
    }
  }, [isSearching, searchQuery, searchTags, searchNotes, fetchNotes, pagination])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          {isSearching ? 'Search Results' : 'My Notes'}
        </motion.h1>
        
        <Link to="/create-note">
          <Button>
            <IoAddCircle className="h-5 w-5 mr-2" />
            New Note
          </Button>
        </Link>
      </div>
      
      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Search Notes</h2>
        
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onSubmit={handleSearchSubmit}
            placeholder="Search by title or content..."
          />
          
          <TagInput
            tags={searchTags}
            onChange={handleSearchTagsChange}
            placeholder="Search by tags..."
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSearchSubmit}
              variant="primary"
            >
              Search
            </Button>
            
            {(searchQuery || (searchTags && searchTags.length > 0)) && (
              <Button 
                onClick={clearSearch}
                variant="secondary"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Results */}
      <NoteList 
        notes={notes} 
        loading={loading} 
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default Dashboard