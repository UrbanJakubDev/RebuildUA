'use client'

interface MapProps {
  src: string
  title?: string
  className?: string
  height?: string
  allowFullScreen?: boolean
  loading?: 'lazy' | 'eager'
}

export const Map = ({
  src,
  title = 'Google Maps',
  className = '',
  height = '400px',
  allowFullScreen = true,
  loading = 'lazy'
}: MapProps) => {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={src}
        title={title}
        width='100%'
        height={height}
        style={{ border: 0 }}
        allowFullScreen={allowFullScreen}
        loading={loading}
        referrerPolicy='no-referrer-when-downgrade'
        className='rounded-lg shadow-lg'
      />
    </div>
  )
}

// Predefined map locations for common use cases
export const MapLocations = {
  // Prague, Czech Republic
  prague:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163930.4994419267!2d14.3255407!3d50.0755381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f6fd2fef0!2sPrague%2C%20Czech%20Republic!5e0!3m2!1sen!2scz!4v1234567890',

  // Brno, Czech Republic
  brno: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87281.123456789!2d16.607189!3d49.1950602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712943ac03f0001%3A0x400af0f6fd2fef0!2sBrno%2C%20Czech%20Republic!5e0!3m2!1sen!2scz!4v1234567890',

  // Ostrava, Czech Republic
  ostrava:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87281.123456789!2d18.292041!3d49.8209226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4713e33b0e0b0001%3A0x400af0f6fd2fef0!2sOstrava%2C%20Czech%20Republic!5e0!3m2!1sen!2scz!4v1234567890',

  // Custom location - replace with your actual embed URL
  custom: 'https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE'
}

/*
📍 JAK ZÍSKAT GOOGLE MAPS EMBED URL:

1. Jdi na Google Maps (maps.google.com)
2. Najdi požadovanou lokaci
3. Klikni na "Sdílet" (Share)
4. Vyber "Vložit mapu" (Embed a map)
5. Zkopíruj URL z iframe kódu
6. Použij ji v Map komponentě

Příklad použití:
<Map src={MapLocations.prague} />
<Map src={MapLocations.brno} height="500px" />
<Map src="https://your-custom-embed-url" title="My Location" />

💡 Tip: Pro vlastní lokaci nahraď MapLocations.custom svým embed URL
*/
