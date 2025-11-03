'use client'
import { SimplePageWrapper } from '@/src/components/PageWrapper'
import React from 'react'
import { useInactivityRedirect } from '@/src/hooks/useInactivityRedirect'
import { InactivityDebugger } from '@/src/components/InactivityDebugger'

export function RepowerCompany(): JSX.Element {
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const lastActivityRef = React.useRef<number>(Date.now())

  // Funkce pro registraci aktivity
  const registerActivity = React.useCallback(() => {
    lastActivityRef.current = Date.now()
    console.log('User activity detected')
  }, [])

  // Inactivity redirect
  const { getTimeSinceLastActivity } = useInactivityRedirect({
    timeout: 60000,
    redirectPath: '/',
    enabled: true
  })

  // Přidání event listenerů pro detekci interakce s PDF
  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Touchscreen události
    const events = [
      'touchstart',
      'touchmove',
      'touchend',
      'wheel', // scroll myší (pro testování na PC)
      'click',
      'mousedown'
    ]

    events.forEach(event => {
      container.addEventListener(event, registerActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        container.removeEventListener(event, registerActivity)
      })
    }
  }, [registerActivity])

  const goToFirstPage = () => {
    const iframe = document.querySelector('iframe')
    if (iframe) {
      iframe.src =
        '/Prezentace REBUILD UKRAINE.pptx#toolbar=0&navpanes=0&scrollbar=0&view=FitH&statusbar=0&messages=0&page=1'
    }
  }

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <div className='relative flex h-full w-full grow flex-col max-w-[1920px] mx-auto'>
        <div
          ref={containerRef}
          className='flex-1 overflow-auto bg-gray-100'
          // Inline event handlers jako záloha
          onTouchStart={registerActivity}
          onTouchMove={registerActivity}
          onTouchEnd={registerActivity}
          onWheel={registerActivity}
          onClick={registerActivity}
        >
          {isLoading && (
            <div className='flex h-screen items-center justify-center'>
              <div className='text-center'>
                <div className='mb-4'>
                  <div className='mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600'></div>
                </div>
                <div className='text-lg font-semibold text-gray-700'>
                  Načítání prezentace...
                </div>
                <div className='mt-2 text-sm text-gray-500'>
                  Prosím počkejte
                </div>
              </div>
            </div>
          )}

          <iframe
            src='/Prezentace REBUILD UKRAINE.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&statusbar=0&messages=0&scrollbar=0&zoom=auto'
            width='100%'
            height='100%'
            className='border-0'
            style={{
              display: isLoading ? 'none' : 'block',
              border: 'none',
              outline: 'none',
              minHeight: '100vh',
              pointerEvents: 'auto' // Důležité pro zachycení eventů
            }}
            onLoad={() => {
              console.log('PDF loaded in iframe')
              setIsLoading(false)
            }}
            onError={e => {
              console.error('PDF loading error in iframe:', e)
            }}
            title='REBUILD UKRAINE Prezentace'
          />
        </div>

        <button
          onClick={() => {
            registerActivity()
            goToFirstPage()
          }}
          className='fixed bottom-6 right-6 z-20 rounded-full bg-blue-600 p-4 text-white shadow-lg transition-colors hover:bg-blue-700'
          title='Na první stránku prezentace'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M5 10l7-7m0 0l7 7m-7-7v18'
            />
          </svg>
        </button>

        {/* <InactivityDebugger
          getTimeSinceLastActivity={getTimeSinceLastActivity}
          timeout={30000}
        /> */}
      </div>
    </SimplePageWrapper>
  )
}
