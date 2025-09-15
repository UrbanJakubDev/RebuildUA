import { useTranslations } from 'next-intl'
import { Metadata } from 'next'
import { PageWrapperWithMetadata } from '@/src/components/PageWrapper'
import ClickableImage from '@/src/components/ClickableImage'
import { Gallery } from '@/src/components/Gallery'
import Loader from '@/src/components/Loader'
import ImageSuspense from '@/src/components/ImageSuspense'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generatePageMetadata } = await import('@/src/lib/metadata')
  return generatePageMetadata(locale, 'support')
}

export default function Support() {
  const t = useTranslations('pages.support')

  const images = [
    'https://res.cloudinary.com/dqdmwnui6/image/upload/v1755081478/Screenshot_2025-07-10_at_14.15.24_labsm0.png',
    'https://res.cloudinary.com/dqdmwnui6/image/upload/v1755083665/Screenshot_2025-07-17_at_7.34.55_igl7ze.png',
    'https://res.cloudinary.com/dqdmwnui6/image/upload/v1755081478/Screenshot_2025-07-10_at_14.15.24_labsm0.png',
    'https://res.cloudinary.com/dqdmwnui6/image/upload/v1755081478/Screenshot_2025-07-17_at_7.34.55_igl7ze.png'
  ]

  return (
    <PageWrapperWithMetadata
      author='Your Name'
      className='px-4 py-12 sm:px-8 lg:px-32 lg:py-24'
    >
      <div className='mb-6 text-center text-lg sm:mb-8 sm:text-2xl'>
        {t('description')}
      </div>

      {/* Loader examples */}
      <div className='mb-6 sm:mb-8'>
        <h2 className='mb-3 text-lg font-semibold sm:mb-4 sm:text-xl'>
          Loader komponenty
        </h2>
        <div className='flex flex-col items-center space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0'>
          <div className='text-center'>
            <Loader size='sm' variant='spinner' />
            <p className='mt-2 text-xs sm:text-sm'>Spinner (sm)</p>
          </div>
          <div className='text-center'>
            <Loader size='md' variant='dots' />
            <p className='mt-2 text-xs sm:text-sm'>Dots (md)</p>
          </div>
          <div className='text-center'>
            <Loader size='lg' variant='pulse' />
            <p className='mt-2 text-xs sm:text-sm'>Pulse (lg)</p>
          </div>
          <div className='text-center'>
            <Loader size='xl' variant='spinner' />
            <p className='mt-2 text-xs sm:text-sm'>Spinner (xl)</p>
          </div>
        </div>
      </div>

      {/* Clickable image with custom loader */}
      <div className='mb-6 sm:mb-8'>
        <h2 className='mb-3 text-lg font-semibold sm:mb-4 sm:text-xl'>
          Klikatelný obrázek s custom loaderem
        </h2>
        <div className='flex justify-center'>
          <ClickableImage
            publicId='https://res.cloudinary.com/dqdmwnui6/image/upload/v1755081478/Screenshot_2025-07-10_at_14.15.24_labsm0.png'
            alt='Description of my image'
            width={250}
            height={250}
            crop='limit'
            gravity='center'
            format='webp'
            quality={90}
            loaderSize='lg'
            loaderVariant='dots'
            className='w-full max-w-[300px] sm:w-auto'
          />
        </div>
      </div>

      {/* Image with Suspense */}
      <div className='mb-6 sm:mb-8'>
        <h2 className='mb-3 text-lg font-semibold sm:mb-4 sm:text-xl'>
          Obrázek s Suspense
        </h2>
        <div className='flex justify-center'>
          <ImageSuspense loaderSize='lg' loaderVariant='pulse'>
            <ClickableImage
              publicId='https://res.cloudinary.com/dqdmwnui6/image/upload/v1755081478/Screenshot_2025-07-10_at_14.15.24_labsm0.png'
              alt='Image with Suspense'
              width={350}
              height={250}
              crop='fit'
              quality={90}
              className='w-full max-w-[400px] sm:w-auto'
            />
          </ImageSuspense>
        </div>
      </div>

      {/* Gallery */}
      <div className='mb-6 sm:mb-8'>
        <h2 className='mb-3 text-lg font-semibold sm:mb-4 sm:text-xl'>
          Galerie s loaderem
        </h2>
        <Gallery images={images} columns={1} />
      </div>
    </PageWrapperWithMetadata>
  )
}
