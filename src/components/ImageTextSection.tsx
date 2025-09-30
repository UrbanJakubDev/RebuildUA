'use client'

import React from 'react'
import { AnimatedSection } from './AnimatedSection'

// Image Text Section Component
interface ImageTextSectionProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  imagePosition: 'left' | 'right'
  backgroundColor?: string
  icon?: string
}

export function ImageTextSection({
  imageSrc,
  imageAlt,
  title,
  description,
  imagePosition,
  backgroundColor = 'bg-black',
  icon = '🚀'
}: ImageTextSectionProps) {
  return (
    <AnimatedSection
      animation={imagePosition === 'left' ? 'fadeRight' : 'fadeLeft'}
      delay={100}
      className={`px-4 py-20 ${backgroundColor}`}
    >
      <div className='mx-auto max-w-6xl'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Image */}
          <div
            className={`relative ${imagePosition === 'right' ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}
          >
            <div className='flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent-hover to-accent-hover'>
              {imageSrc.endsWith('.svg') ? (
                <div className='text-8xl'>{icon}</div>
              ) : (
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className='h-full w-full object-cover'
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div
            className={`${imagePosition === 'right' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
          >
            <h2 className='mb-6 text-4xl font-bold text-white'>{title}</h2>
            <p className='text-lg leading-relaxed text-gray-300'>
              {description}
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
