'use client'

import React, { useState } from 'react'
import type { Event } from '@/payload-types'
import { EventsArchive } from './index'

interface PaginatedEventsArchiveProps {
  initialEvents: Event[]
  totalDocs: number
  hasNextPage: boolean
  hasPrevPage: boolean
  totalPages: number
  limit: number
  populateBy?: 'collection' | 'selection'
  selectedEvents?: any[]
}

export const PaginatedEventsArchive: React.FC<PaginatedEventsArchiveProps> = ({
  initialEvents,
  totalDocs,
  hasNextPage: initialHasNextPage,
  hasPrevPage: initialHasPrevPage,
  totalPages,
  limit,
  populateBy,
  selectedEvents,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const startIndex = (currentPage - 1) * limit
  const endIndex = startIndex + limit
  const currentEvents = initialEvents.slice(startIndex, endIndex)
  
  const hasNextPage = endIndex < initialEvents.length
  const hasPrevPage = currentPage > 1

  const handleNextPage = () => {
    if (hasNextPage && !loading) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (hasPrevPage && !loading) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handlePageClick = (page: number) => {
    if (page !== currentPage && !loading) {
      setCurrentPage(page)
    }
  }

  if (populateBy !== 'collection') {
    return <EventsArchive events={initialEvents} />
  }

  const calculatedTotalPages = Math.ceil(initialEvents.length / limit)

  const pageNumbers = []
  const maxPagesToShow = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = Math.min(calculatedTotalPages, startPage + maxPagesToShow - 1)

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <div className={loading ? 'opacity-50 transition-opacity' : ''}>
        <EventsArchive events={currentEvents} />
      </div>

      {calculatedTotalPages > 1 && (
        <div className="container mt-12">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={!hasPrevPage || loading}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Anterior
            </button>

            <div className="flex gap-1">
              {startPage > 1 && (
                <>
                  <button
                    onClick={() => handlePageClick(1)}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    1
                  </button>
                  {startPage > 2 && <span className="px-2 py-2">...</span>}
                </>
              )}

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  disabled={loading}
                  className={`px-3 py-2 border rounded-md ${
                    page === currentPage
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {endPage < calculatedTotalPages && (
                <>
                  {endPage < calculatedTotalPages - 1 && <span className="px-2 py-2">...</span>}
                  <button
                    onClick={() => handlePageClick(calculatedTotalPages)}
                    className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    {calculatedTotalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={handleNextPage}
              disabled={!hasNextPage || loading}
              className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Siguiente
            </button>
          </div>

          <div className="text-center mt-4 text-gray-600">
            Página {currentPage} de {calculatedTotalPages} ({initialEvents.length} eventos en total)
          </div>
        </div>
      )}
    </div>
  )
}