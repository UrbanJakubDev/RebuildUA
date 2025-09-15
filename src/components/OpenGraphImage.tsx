import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Next.js Starter Kit'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px'
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          Next.js Starter Kit
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: '800px'
          }}
        >
          Powerful, performant, and versatile boilerplate for building modern
          web applications
        </div>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '40px'
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '18px',
              color: 'white'
            }}
          >
            TypeScript
          </div>
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '18px',
              color: 'white'
            }}
          >
            Tailwind CSS
          </div>
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              fontSize: '18px',
              color: 'white'
            }}
          >
            i18n
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  )
}
