import { useContext, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NoteCard from './NoteCard'
import LoadingSpinner from '../common/LoadingSpinner'
import Pagination from '../common/Pagination'

const NoteList = ({ notes, loading, pagination, onPageChange }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (loading && (!notes || notes.length === 0)) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No notes found</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new note.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {notes.map(note => (
          <NoteCard key={note._id} note={note} />
        ))}
      </motion.div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          className="pt-4"
        />
      )}
    </div>
  )
}

export default NoteList