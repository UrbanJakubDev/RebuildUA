'use client'

import { useState, useEffect } from 'react'

const backgroundImages = [
  'https://cdn.prod.website-files.com/643cfe991777ad8572921f53/643e821e4e00c21c16956103_gentec.jpg',
  'https://cdn.prod.website-files.com/6430096b9642ff175076fa37/6439393ecee32000ba9b68b8_2.jpg',
  'https://cdn.prod.website-files.com/643cfe991777ad8572921f53/6447ecc1a6b8e41acd7de1a0_image004.jpg'
]

export function BackgroundSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        prevIndex => (prevIndex + 1) % backgroundImages.length
      )
    }, 2000) // Střídání každé 2 sekundy

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='absolute inset-0'>
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url("${image}")`
          }}
        />
      ))}
      {/* Black overlay */}
      <div className='absolute inset-0 bg-black/90'></div>
    </div>
  )
}
