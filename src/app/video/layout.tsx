import { ThemeProvider } from '@/src/components/ThemeProvider'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import '../[locale]/globals.css'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

export const metadata: Metadata = {
  title: 'Video',
  description: 'Video player'
}

export default function VideoLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className='h-screen w-screen overflow-hidden bg-white'>
        {children}
      </body>
    </html>
  )
}
