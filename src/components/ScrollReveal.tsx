'use client'

import { useEffect, useRef, useState } from 'react'

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            setHasAnimated(true)
          }
        } else if (!once && !hasAnimated) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [threshold, once, hasAnimated])

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

  const observeElement = (
    id: string,
    element: HTMLElement,
    threshold = 0.1
  ) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
          });
        }
      },
      {
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
