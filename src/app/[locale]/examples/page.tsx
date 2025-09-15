import { useTranslations } from 'next-intl'
import { Metadata } from 'next'
import { PageWrapperWithMetadata } from '@/src/components/PageWrapper'
import { ComponentExamples } from '@/src/components/examples/ComponentExamples'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { generatePageMetadata } = await import('@/src/lib/metadata')
  return generatePageMetadata(locale, 'examples')
}

export default function Examples() {
  const t = useTranslations('pages.examples')

  return (
    <PageWrapperWithMetadata
      author='Your Name'
      className='px-4 py-12 sm:px-8 lg:px-32 lg:py-24'
    >
      <div className='text-center text-lg sm:text-xl lg:text-2xl'>
        {t('description')}
      </div>
      <ComponentExamples />
    </PageWrapperWithMetadata>
  )
}
