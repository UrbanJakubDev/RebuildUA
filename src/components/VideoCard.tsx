'use client'

import { IoPlay } from 'react-icons/io5'

interface VideoCardProps {
  title: string
  thumbnail?: string
  duration?: string
  description?: string
  videoUrl?: string
  onClick?: () => void
}

export function VideoCard({
  title,
  thumbnail,
  duration,
  description,
  videoUrl,
  onClick
}: VideoCardProps) {
  return (
    <div
      className='border-border bg-card-bg shadow-card-shadow hover:border-border-hover hover:shadow-card-shadow-hover group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-background-secondary'
      onClick={onClick}
    >
      {/* Video Thumbnail */}
      <div className='relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900'>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className='h-full w-full object-cover'
          />
        ) : (
          // Placeholder gradient using theme colors
          <div className='from-accent/20 to-accent/10 flex h-full w-full items-center justify-center bg-gradient-to-br'>
            <div className='text-secondary'>
              <IoPlay size={48} />
            </div>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className='bg-background/20 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
          <div className='bg-card-bg/90 border-border rounded-full border p-3 transition-transform duration-300 group-hover:scale-110'>
            <IoPlay size={24} className='ml-1 text-primary' />
          </div>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className='bg-background/80 border-border absolute bottom-2 right-2 rounded border px-2 py-1 text-xs text-primary'>
            {duration}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className='flex flex-1 flex-col p-4'>
        <h3 className='mb-2 line-clamp-2 font-semibold text-primary'>
          {title}
        </h3>
        {description && (
          <p className='line-clamp-3 text-sm text-secondary'>{description}</p>
        )}
      </div>

      {/* Glass thickness effects using theme colors */}
      <div className='via-accent/30 absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent to-transparent opacity-60' />
      <div className='via-accent/20 absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent to-transparent opacity-40' />
      <div className='via-accent/20 absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent to-transparent opacity-40' />

      {/* Hover glow effect */}
      <div className='from-accent/20 to-accent/10 absolute inset-0 rounded-lg bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

      {/* Inner glass reflection */}
      <div className='from-accent/10 absolute inset-2 rounded-md bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
    </div>
  )
}
