'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search as SearchIcon, X } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  excerpt?: string
  url: string
  collection: string
}

interface SearchComponentProps {
  placeholder?: string
  className?: string
}

export const Search: React.FC<SearchComponentProps> = ({ 
  placeholder = "Buscar eventos, páginas...", 
  className = "" 
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.length > 2) {
        performSearch(query)
      } else {
        setResults([])
        setIsOpen(false)
        setError('')
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true)
    setError('')
    
    try {
      console.log('Searching for:', searchQuery) // Debug log
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      
      console.log('Response status:', response.status) // Debug log
      
      if (response.ok) {
        const data = await response.json()
        console.log('Search results:', data) // Debug log
        
        setResults(data.docs || [])
        setIsOpen(true)
      } else {
        const errorData = await response.text()
        console.error('Search response error:', errorData)
        setError('Error en la búsqueda')
        setResults([])
        setIsOpen(true)
      }
    } catch (error) {
      console.error('Search error:', error)
      setError('Error de conexión')
      setResults([])
      setIsOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    setError('')
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full text-gray-800 pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onFocus={() => (query.length > 2 || error) && setIsOpen(true)}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Buscando...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              {error}
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={handleResultClick}
                  className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {result.title}
                      </h4>
                      {result.excerpt && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {result.collection === 'events' ? 'Evento' : 
                       result.collection === 'posts' ? 'Post' : 'Página'}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 2 ? (
            <div className="p-4 text-center text-gray-500">
              No se encontraron resultados para "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}