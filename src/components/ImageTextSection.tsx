'use client'

import React from 'react'
import { AnimatedSection } from './AnimatedSection'

// Image Text Section Component
interface ImageTextSectionProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string | string[]
  imagePosition: 'left' | 'right'
  backgroundColor?: string
  icon?: string
  imageAlign?: 'left' | 'center' | 'right'
  imageSize?: 'fit' | 'cover' | 'fill'
}

export function ImageTextSection({
  imageSrc,
  imageAlt,
  title,
  description,
  imagePosition,
  backgroundColor = 'bg-black',
  icon = '🚀',
  imageAlign = 'center',
  imageSize = 'cover'
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
                  className={`h-full w-full object-${imageSize}`}
                  style={{ objectPosition: imageAlign }}
                />
              )}
            </div>
          </div>

          {/* Text */}
          <div
            className={`${imagePosition === 'right' ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}
          >
            <h2 className='mb-6 text-4xl font-bold text-white'>{title}</h2>
            <div className='space-y-4 text-lg leading-relaxed text-gray-300'>
              {Array.isArray(description) ? (
                description.map((item, index) => (
                  <p key={index} className='m-0'>
                    {item}
                  </p>
                ))
              ) : (
                <p className='m-0'>{description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
