import { useTranslations } from 'next-intl'
import { Metadata } from 'next'
import Button from '@/src/components/Button'
import { SimplePageWrapper } from '@/src/components/PageWrapper'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generatePageMetadata } = await import('@/src/lib/metadata')
  return generatePageMetadata(locale, 'home')
}

export default function DashboardPage() {
  const t = useTranslations('pages.home')
  return (
    <SimplePageWrapper>
      <section className='flex flex-col items-center justify-center py-24'>
        <h1 className='text-center text-7xl font-extrabold leading-tight'>
          {t('hero.title')}
        </h1>
        <div className='my-6 px-20 text-center text-2xl text-text-secondary'>
          {t('hero.subtitle')}
        </div>
        <div className='mt-4 flex flex-row gap-4'>
          <a
            href='https://github.com/new?template_name=nextjs-template&template_owner=yahyaparvar'
            target='_blank'
          >
            <Button rounded size='large'>
              {t('hero.cta.useTemplate')}
            </Button>
          </a>
          <a
            href='https://github.com/yahyaparvar/nextjs-template'
            target='_blank'
          >
            <Button rounded size='large' variant='secondary'>
              {t('hero.cta.learnMore')}
            </Button>
          </a>
        </div>
      </section>
      <section className='bg-background-secondary py-20 max-lg:py-10'>
        <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-7 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
          <div className='text-center'>
            <h2 className='mb-3  text-xl font-semibold'>
              {t('features.approachable.title')}
            </h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('features.approachable.description')}
            </p>
          </div>
          <div className='text-center'>
            <h2 className='mb-3 text-xl font-semibold'>
              {t('features.versatile.title')}
            </h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('features.versatile.description')}
            </p>
          </div>
          <div className='text-center'>
            <h2 className='mb-3 text-xl font-semibold'>
              {t('features.performant.title')}
            </h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t('features.performant.description')}
            </p>
          </div>
        </div>
      </section>
    </SimplePageWrapper>
  )
}
