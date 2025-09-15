'use client'

import { useState, useEffect } from 'react'
import Button from './Button'
import { useTranslations } from 'next-intl'

interface Testimonial {
  id: string
  name: string
  company?: string
  position?: string
  content: string
  rating: number
  avatar?: string
  date?: string
}

interface TestimonialsData {
  cs: Testimonial[]
  en: Testimonial[]
  de: Testimonial[]
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function Testimonials({
  testimonials,
  title,
  subtitle,
  className = '',
  autoPlay = true,
  autoPlayInterval = 5000
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations('testimonials')

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
      </svg>
    ))
  }

  if (testimonials.length === 0) return null

  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className='mb-8 text-center sm:mb-12'>
        <h2 className='mb-3 text-2xl font-bold text-primary sm:mb-4 sm:text-3xl'>
          {title || t('defaultTitle')}
        </h2>
        <p className='mx-auto max-w-2xl text-base text-text-secondary sm:text-lg'>
          {subtitle || t('defaultSubtitle')}
        </p>
      </div>

      <div className='relative'>
        {/* Main testimonial */}
        <div className='rounded-2xl border border-background-secondary bg-background p-6 text-center shadow-xl sm:p-8 md:p-12'>
          <div className='mb-4 sm:mb-6'>
            {renderStars(testimonials[currentIndex].rating)}
          </div>

          <blockquote className='mb-6 text-lg italic text-primary sm:mb-8 sm:text-xl md:text-2xl'>
            &ldquo;{testimonials[currentIndex].content}&rdquo;
          </blockquote>

          <div className='flex items-center justify-center'>
            {testimonials[currentIndex].avatar && (
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className='mr-3 h-12 w-12 rounded-full object-cover sm:mr-4 sm:h-16 sm:w-16'
              />
            )}
            <div className='text-left'>
              <div className='text-sm font-semibold text-primary sm:text-base'>
                {testimonials[currentIndex].name}
              </div>
              {testimonials[currentIndex].company && (
                <div className='text-xs text-text-secondary sm:text-sm'>
                  {testimonials[currentIndex].company}
                </div>
              )}
              {testimonials[currentIndex].position && (
                <div className='text-xs text-text-secondary sm:text-sm'>
                  {testimonials[currentIndex].position}
                </div>
              )}
              {testimonials[currentIndex].date && (
                <div className='text-xs text-text-secondary sm:text-sm'>
                  {testimonials[currentIndex].date}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation arrows */}
        <Button
          onClick={goToPrevious}
          className='absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-button-secondary p-2 text-primary shadow-lg transition-colors duration-200 hover:bg-button hover:text-button-text sm:left-4 sm:p-3'
          aria-label={t('previousLabel')}
        >
          <svg
            className='h-5 w-5 sm:h-6 sm:w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </Button>

        <Button
          onClick={goToNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-button-secondary p-2 text-primary shadow-lg transition-colors duration-200 hover:bg-button hover:text-button-text sm:right-4 sm:p-3'
          aria-label={t('nextLabel')}
        >
          <svg
            className='h-5 w-5 sm:h-6 sm:w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </Button>

        {/* Dots indicator */}
        <div className='mt-6 flex justify-center space-x-2 sm:mt-8'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 sm:h-3 sm:w-3 ${
                index === currentIndex
                  ? 'bg-button'
                  : 'bg-text-secondary opacity-50 hover:bg-button hover:opacity-75'
              }`}
              aria-label={t('slideLabel').replace(
                '{number}',
                (index + 1).toString()
              )}
            />
          ))}
        </div>
      </div>

      {/* All testimonials grid (optional) */}
      <div className='mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`cursor-pointer rounded-lg border-2 bg-background p-4 shadow-md transition-all duration-200 hover:shadow-lg sm:p-6 ${
              index === currentIndex
                ? 'border-button bg-background-secondary'
                : 'border-background-secondary hover:border-text-secondary'
            }`}
            onClick={() => goToSlide(index)}
          >
            <div className='mb-3 sm:mb-4'>
              {renderStars(testimonial.rating)}
            </div>

            <blockquote className='mb-3 line-clamp-4 text-xs text-primary sm:mb-4 sm:text-sm'>
              &ldquo;{testimonial.content}&rdquo;
            </blockquote>

            <div className='flex items-center'>
              {testimonial.avatar && (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className='mr-2 h-8 w-8 rounded-full object-cover sm:mr-3 sm:h-10 sm:w-10'
                />
              )}
              <div>
                <div className='text-xs font-semibold text-primary sm:text-sm'>
                  {testimonial.name}
                </div>
                {testimonial.company && (
                  <div className='text-xs text-text-secondary'>
                    {testimonial.company}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
