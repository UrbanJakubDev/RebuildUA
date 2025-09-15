'use client'

import { useState, useEffect, useRef } from 'react'
import Button from './Button'

interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'service' | 'blog' | 'faq'
  tags?: string[]
}

interface SearchProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  results?: SearchResult[]
  isLoading?: boolean
  showResults?: boolean
}

export function Search({
  placeholder = 'Hledat na webu...',
  className = '',
  onSearch,
  results = [],
  isLoading = false,
  showResults = true
}: SearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setFocusedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          event.preventDefault()
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          event.preventDefault()
          if (focusedIndex >= 0 && results[focusedIndex]) {
            window.location.href = results[focusedIndex].url
          } else if (query.trim()) {
            handleSearch()
          }
          break
        case 'Escape':
          setIsOpen(false)
          setFocusedIndex(-1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, focusedIndex, results, query])

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query)
      setIsOpen(true)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)
    if (value.trim()) {
      setIsOpen(true)
      onSearch?.(value)
    } else {
      setIsOpen(false)
    }
    setFocusedIndex(-1)
  }

  const handleResultClick = (result: SearchResult) => {
    window.location.href = result.url
    setIsOpen(false)
    setQuery('')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page':
        return (
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
              clipRule='evenodd'
            />
          </svg>
        )
      case 'service':
        return (
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
            <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
          </svg>
        )
      case 'blog':
        return (
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v2H7V5zm6 4H7v2h6V9zm-6 4h6v2H7v-2z'
              clipRule='evenodd'
            />
          </svg>
        )
      case 'faq':
        return (
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
              clipRule='evenodd'
            />
          </svg>
        )
      default:
        return (
          <svg className='h-4 w-4' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'
            />
          </svg>
        )
    }
  }

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className='relative'>
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={e => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-12 pr-20 text-gray-900 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
          onFocus={() => {
            if (query.trim()) setIsOpen(true)
          }}
        />

        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <svg
            className='h-5 w-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </div>

        <Button
          onClick={handleSearch}
          className='absolute inset-y-0 right-0 rounded-r-lg bg-blue-600 px-4 text-white transition-colors duration-200 hover:bg-blue-700'
        >
          Hledat
        </Button>
      </div>

      {/* Search Results */}
      {isOpen && showResults && (
        <div className='absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl'>
          {isLoading ? (
            <div className='p-4 text-center text-gray-500'>
              <div className='mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600'></div>
              Hledám...
            </div>
          ) : results.length > 0 ? (
            <div className='py-2'>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors duration-200 hover:bg-gray-50 ${
                    index === focusedIndex
                      ? 'border-l-4 border-blue-500 bg-blue-50'
                      : ''
                  }`}
                >
                  <div className='mt-1 flex-shrink-0 text-gray-400'>
                    {getTypeIcon(result.type)}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='truncate font-medium text-gray-900'>
                      {result.title}
                    </div>
                    <div className='line-clamp-2 text-sm text-gray-600'>
                      {result.description}
                    </div>
                    {result.tags && result.tags.length > 0 && (
                      <div className='mt-2 flex flex-wrap gap-1'>
                        {result.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className='inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : query.trim() ? (
            <div className='p-4 text-center text-gray-500'>
              <p>Žádné výsledky pro "{query}"</p>
              <p className='mt-1 text-sm'>Zkuste jiný výraz</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
