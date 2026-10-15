'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  distance?: string
  threshold?: number
  className?: string
  once?: boolean
}

function getScrollParent(node: HTMLElement | null): Element | null {
  let parent = node?.parentElement ?? null
  while (parent) {
    const { overflowY } = window.getComputedStyle(parent)
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return parent
    }
    parent = parent.parentElement
  }
  return null
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = '30px',
  threshold = 0.1,
  className = '',
  once = true
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Reset animation state when pathname changes (for navigation)
  useEffect(() => {
    setIsVisible(false)
    setHasAnimated(false)
  }, [pathname])

  useEffect(() => {
    const currentElement = elementRef.current
    if (!currentElement) return

    const reveal = () => {
      setIsVisible(true)
      if (once) {
        setHasAnimated(true)
      }
    }

    // Immediate check — covers first paint and custom scroll containers
    // where IntersectionObserver root defaults would miss the element.
    const rect = currentElement.getBoundingClientRect()
    const inView = rect.top < window.innerHeight && rect.bottom > 0
    if (inView) {
      // Respect delay for first paint without leaving content permanently hidden
      const timeoutId = window.setTimeout(reveal, delay)
      return () => window.clearTimeout(timeoutId)
    }

    const scrollRoot = getScrollParent(currentElement)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
        } else if (!once && !hasAnimated) {
          setIsVisible(false)
        }
      },
      {
        root: scrollRoot,
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(currentElement)

    return () => {
      observer.unobserve(currentElement)
    }
  }, [threshold, once, hasAnimated, delay, pathname])

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${distance})`
      case 'down':
        return `translateY(-${distance})`
      case 'left':
        return `translateX(${distance})`
      case 'right':
        return `translateX(-${distance})`
      case 'fade':
        return 'translateY(0px)'
      default:
        return `translateY(${distance})`
    }
  }

  const getVisibleTransform = () => {
    return 'translateY(0px) translateX(0px)'
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: isVisible ? getVisibleTransform() : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  )
}

// Hook pro bulk animace více elementů
export function useScrollReveal() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const pathname = usePathname()

  // Reset visible elements when pathname changes
  useEffect(() => {
    setVisibleElements(new Set())
  }, [pathname])

  const observeElement = (
    id: string,
    element: HTMLElement,
    threshold = 0.1
  ) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => {
            const newSet = new Set(prev)
            newSet.add(id)
            return newSet
          })
        }
      },
      {
        root: getScrollParent(element),
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }

  const isVisible = (id: string) => visibleElements.has(id)

  return { observeElement, isVisible }
}

// Předpřipravené animace
export const ScrollRevealVariants = {
  fadeUp: {
    direction: 'up' as const,
    duration: 600,
    distance: '30px'
  },
  fadeDown: {
    direction: 'down' as const,
    duration: 600,
    distance: '30px'
  },
  fadeLeft: {
    direction: 'left' as const,
    duration: 600,
    distance: '30px'
  },
  fadeRight: {
    direction: 'right' as const,
    duration: 600,
    distance: '30px'
  },
  fade: {
    direction: 'fade' as const,
    duration: 600,
    distance: '0px'
  },
  slow: {
    direction: 'up' as const,
    duration: 1000,
    distance: '50px'
  },
  fast: {
    direction: 'up' as const,
    duration: 300,
    distance: '20px'
  }
}
