'use client'

import React, { useState, useEffect } from 'react'

interface InactivityDebuggerProps {
  getTimeSinceLastActivity: () => number
  timeout: number
}

export function InactivityDebugger({
  getTimeSinceLastActivity,
  timeout
}: InactivityDebuggerProps) {
  const [timeSinceActivity, setTimeSinceActivity] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceActivity(getTimeSinceLastActivity())
    }, 100) // Aktualizace každých 100ms

    return () => clearInterval(interval)
  }, [getTimeSinceLastActivity])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = Math.min((timeSinceActivity / timeout) * 100, 100)
  const isWarning = progressPercentage > 70
  const isCritical = progressPercentage > 90

  if (!isVisible) return null

  return (
    <div className='fixed left-4 top-4 z-50 min-w-[200px] rounded-lg bg-black bg-opacity-90 p-4 text-white shadow-lg'>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='text-sm font-bold'>Inactivity Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className='text-xs text-gray-400 hover:text-white'
          title='Skrýt debugger'
        >
          ✕
        </button>
      </div>

      <div className='space-y-2 text-xs'>
        <div>
          <span className='text-gray-400'>Čas neaktivity:</span>
          <span
            className={`ml-2 font-mono ${
              isCritical
                ? 'text-red-400'
                : isWarning
                  ? 'text-yellow-400'
                  : 'text-green-400'
            }`}
          >
            {formatTime(timeSinceActivity)}
          </span>
        </div>

        <div>
          <span className='text-gray-400'>Timeout:</span>
          <span className='ml-2 font-mono text-blue-400'>
            {formatTime(timeout)}
          </span>
        </div>

        <div>
          <span className='text-gray-400'>Progress:</span>
          <span className='ml-2 font-mono'>
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className='mt-3'>
        <div className='h-2 w-full rounded-full bg-gray-700'>
          <div
            className={`h-2 rounded-full transition-all duration-100 ${
              isCritical
                ? 'bg-red-500'
                : isWarning
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Status indicator */}
      <div className='mt-2 text-xs'>
        <span
          className={`rounded px-2 py-1 ${
            isCritical
              ? 'bg-red-600'
              : isWarning
                ? 'bg-yellow-600'
                : 'bg-green-600'
          }`}
        >
          {isCritical ? 'KRITICKÉ' : isWarning ? 'VAROVÁNÍ' : 'OK'}
        </span>
      </div>
    </div>
  )
}
