'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'

interface CustomScrollbarProps {
  children: React.ReactNode
  thumbWidth?: number
  className?: string
  enabled?: boolean
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  children,
  thumbWidth = 50,
  className = '',
  enabled = true
}) => {
  // If disabled, just render children without custom scrollbar
  if (!enabled) {
    return <>{children}</>
  }
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [thumbHeight, setThumbHeight] = useState(0)
  const [thumbTop, setThumbTop] = useState(0)
  const [showScrollbar, setShowScrollbar] = useState(false)
  const dragStartY = useRef(0)
  const scrollStartY = useRef(0)

  // Calculate thumb size and position
  const updateScrollbar = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return

    const container = containerRef.current
    const content = contentRef.current

    const containerHeight = container.clientHeight
    const contentHeight = content.scrollHeight
    const scrollTop = container.scrollTop

    // Show scrollbar only if content is scrollable
    const isScrollable = contentHeight > containerHeight
    setShowScrollbar(isScrollable)

    if (!isScrollable) return

    // Calculate thumb height (proportional to visible content)
    const thumbHeightCalc = Math.max(
      (containerHeight / contentHeight) * containerHeight,
      50 // Minimum thumb height
    )
    setThumbHeight(thumbHeightCalc)

    // Calculate thumb position
    const maxScroll = contentHeight - containerHeight
    const scrollRatio = scrollTop / maxScroll
    const maxThumbTop = containerHeight - thumbHeightCalc
    setThumbTop(scrollRatio * maxThumbTop)
  }, [])

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (!isDragging) {
      updateScrollbar()
    }
  }, [isDragging, updateScrollbar])

  // Handle thumb drag start (mouse)
  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartY.current = e.clientY
    scrollStartY.current = containerRef.current?.scrollTop || 0
  }

  // Handle thumb drag start (touch)
  const handleThumbTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    dragStartY.current = e.touches[0].clientY
    scrollStartY.current = containerRef.current?.scrollTop || 0
  }

  // Handle thumb drag
  useEffect(() => {
    const handleMove = (clientY: number) => {
      if (!isDragging || !containerRef.current || !contentRef.current) return

      const container = containerRef.current
      const content = contentRef.current

      const containerHeight = container.clientHeight
      const contentHeight = content.scrollHeight
      const maxScroll = contentHeight - containerHeight
      const maxThumbTop = containerHeight - thumbHeight

      // Calculate how much the mouse/touch moved
      const deltaY = clientY - dragStartY.current

      // Calculate the ratio of thumb movement to container height
      const thumbMoveRatio = deltaY / maxThumbTop

      // Apply this ratio to the max scroll distance
      const scrollDelta = thumbMoveRatio * maxScroll
      const newScrollTop = scrollStartY.current + scrollDelta

      // Clamp the scroll position
      container.scrollTop = Math.max(0, Math.min(newScrollTop, maxScroll))

      // Update thumb position immediately for smooth dragging
      updateScrollbar()
    }

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      handleMove(e.touches[0].clientY)
    }

    const handleEnd = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleEnd)
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false
      })
      document.addEventListener('touchend', handleEnd)
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleEnd)
      document.body.style.userSelect = ''
    }
  }, [isDragging, thumbHeight, updateScrollbar])

  // Handle track click (mouse)
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !containerRef.current ||
      !contentRef.current ||
      e.target !== e.currentTarget
    )
      return

    const track = e.currentTarget
    const rect = track.getBoundingClientRect()
    const clickY = e.clientY - rect.top

    const container = containerRef.current
    const content = contentRef.current
    const containerHeight = container.clientHeight
    const contentHeight = content.scrollHeight

    // Calculate new scroll position
    const scrollRatio = clickY / containerHeight
    const maxScroll = contentHeight - containerHeight
    container.scrollTop = scrollRatio * maxScroll
  }

  // Handle track touch
  const handleTrackTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      !containerRef.current ||
      !contentRef.current ||
      e.target !== e.currentTarget
    )
      return

    const track = e.currentTarget
    const rect = track.getBoundingClientRect()
    const touchY = e.touches[0].clientY - rect.top

    const container = containerRef.current
    const content = contentRef.current
    const containerHeight = container.clientHeight
    const contentHeight = content.scrollHeight

    // Calculate new scroll position
    const scrollRatio = touchY / containerHeight
    const maxScroll = contentHeight - containerHeight
    container.scrollTop = scrollRatio * maxScroll
  }

  // Update scrollbar on content/window resize
  useEffect(() => {
    updateScrollbar()

    const resizeObserver = new ResizeObserver(updateScrollbar)
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current)
    }
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [updateScrollbar])

  // Add scroll listener
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* Scrollable content container */}
      <div
        ref={containerRef}
        className='h-full w-full overflow-x-hidden overflow-y-scroll'
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          touchAction: 'pan-y' // Enable touch scrolling
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome/Safari/Opera */
          }
        `}</style>
        <div ref={contentRef}>{children}</div>
      </div>

      {/* Custom scrollbar track and thumb */}
      {showScrollbar && (
        <div
          className='absolute bottom-0 right-0 top-0 z-50 flex cursor-pointer items-center justify-center'
          style={{ width: `${thumbWidth}px` }}
          onClick={handleTrackClick}
          onTouchStart={handleTrackTouch}
        >
          {/* Track - thin gray line */}
          <div className='absolute h-full w-[2px] bg-[#404040]' />

          {/* Thumb - pill shape */}
          <div
            ref={thumbRef}
            className={`absolute cursor-grab rounded-full shadow-lg transition-all ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            style={{
              width: `${thumbWidth - 10}px`,
              height: `${thumbHeight}px`,
              top: `${thumbTop}px`,
              backgroundColor: isDragging ? '#d4d4d4' : '#e5e5e5',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              border: '3px solid #000000'
            }}
            onMouseDown={handleThumbMouseDown}
            onTouchStart={handleThumbTouchStart}
            onMouseEnter={e => {
              if (!isDragging) {
                e.currentTarget.style.backgroundColor = '#fafafa'
              }
            }}
            onMouseLeave={e => {
              if (!isDragging) {
                e.currentTarget.style.backgroundColor = '#e5e5e5'
              }
            }}
          />
        </div>
      )}
    </div>
  )
}
