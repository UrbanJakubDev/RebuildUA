declare global {
  interface Window {
    gtag?: (
      command: 'consent' | 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        analytics_storage?: 'granted' | 'denied'
        marketing_storage?: 'granted' | 'denied'
        functionality_storage?: 'granted' | 'denied'
        page_title?: string
        page_location?: string
        [key: string]: any
      }
    ) => void
  }

  interface Navigator {
    share?: (data: {
      title?: string
      text?: string
      url?: string
    }) => Promise<void>
    clipboard?: {
      writeText(text: string): Promise<void>
      readText(): Promise<string>
    }
  }
}

export {}
