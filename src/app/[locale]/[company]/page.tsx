'use client'

import { SimplePageWrapper } from '@/src/components/PageWrapper'
import {
  AnimatedSection,
  AnimatedHero,
  AnimatedCard,
  AnimatedText
} from '@/src/components/AnimatedSection'
import React from 'react'
import { useTranslations } from 'next-intl'

export default function CompanyPage({
  params
}: {
  params: { company: string; locale: string }
}): JSX.Element {
  const t = useTranslations('pages.company')
  const companyKey = params.company.toLowerCase()

  // Get company-specific content or fallback to generic content
  const getCompanyContent = (path: string, fallback?: string) => {
    const companyPath = `companies.${companyKey}.${path}`
    const genericPath = fallback || path

    // Try company-specific first, then fallback to generic
    try {
      return t(companyPath)
    } catch {
      return t(genericPath)
    }
  }

  const getCompanyStats = () => {
    try {
      const stats = {
        projects: t(`companies.${companyKey}.statistics.projects`),
        capacity: t(`companies.${companyKey}.statistics.capacity`),
        experience: t(`companies.${companyKey}.statistics.experience`)
      }
      return stats
    } catch {
      return {
        projects: '150+',
        capacity: '25 MW',
        experience: '15 let'
      }
    }
  }

  const stats = getCompanyStats()
  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <div>
        {/* Hero Section */}
        <AnimatedHero className='px-4 py-20'>
          <div className='mx-auto max-w-6xl text-center'>
            <h1 className='mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl'>
              {params.company}
            </h1>
            <p className='mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl'>
              {getCompanyContent('hero.description', 'hero.description')}
            </p>
          </div>
        </AnimatedHero>

        {/* Statistics Section */}
        <AnimatedSection
          animation='fadeUp'
          delay={200}
          className='bg-gray-50 py-16'
        >
          <div className='mx-auto max-w-6xl px-4'>
            <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
              <div className='rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-2 text-4xl font-bold text-blue-600'>
                  {stats.projects}
                </div>
                <div className='text-gray-600'>
                  {t('statistics.projectsCompleted')}
                </div>
              </div>
              <div className='rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-2 text-4xl font-bold text-green-600'>
                  {stats.capacity}
                </div>
                <div className='text-gray-600'>
                  {t('statistics.totalCapacity')}
                </div>
              </div>
              <div className='rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-2 text-4xl font-bold text-purple-600'>
                  {stats.experience}
                </div>
                <div className='text-gray-600'>
                  {t('statistics.yearsExperience')}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 1 - Text Left, Image Right */}
        <AnimatedSection
          animation='fadeLeft'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div>
                <div className='mb-4 text-sm font-semibold text-blue-600'>
                  {t('sections.mission.number')}
                </div>
                <h2 className='mb-6 text-4xl font-bold'>
                  {getCompanyContent('mission.title', 'sections.mission.title')}
                </h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  {getCompanyContent(
                    'mission.description1',
                    'sections.mission.description1'
                  )}
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  {getCompanyContent(
                    'mission.description2',
                    'sections.mission.description2'
                  )}
                </p>
              </div>
              <div className='relative'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100'>
                  <div className='text-6xl'>⚡</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2 - Image Left, Text Right */}
        <AnimatedSection
          animation='fadeRight'
          delay={100}
          className='bg-gray-50 px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div className='relative order-2 lg:order-1'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-blue-100'>
                  <div className='text-6xl'>🌱</div>
                </div>
              </div>
              <div className='order-1 lg:order-2'>
                <div className='mb-4 text-sm font-semibold text-green-600'>
                  {t('sections.sustainability.number')}
                </div>
                <h2 className='mb-6 text-4xl font-bold'>
                  {getCompanyContent(
                    'sustainability.title',
                    'sections.sustainability.title'
                  )}
                </h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  {getCompanyContent(
                    'sustainability.description1',
                    'sections.sustainability.description1'
                  )}
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  {getCompanyContent(
                    'sustainability.description2',
                    'sections.sustainability.description2'
                  )}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 3 - Text Left, Image Right */}
        <AnimatedSection
          animation='fadeLeft'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div>
                <div className='mb-4 text-sm font-semibold text-purple-600'>
                  {t('sections.innovation.number')}
                </div>
                <h2 className='mb-6 text-4xl font-bold'>
                  {t('sections.innovation.title')}
                </h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  {t('sections.innovation.description1')}
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  {t('sections.innovation.description2')}
                </p>
              </div>
              <div className='relative'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100'>
                  <div className='text-6xl'>🚀</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 4 - Image Left, Text Right */}
        <AnimatedSection
          animation='fadeRight'
          delay={100}
          className='bg-gray-50 px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div className='relative order-2 lg:order-1'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-red-100'>
                  <div className='text-6xl'>🤝</div>
                </div>
              </div>
              <div className='order-1 lg:order-2'>
                <div className='mb-4 text-sm font-semibold text-orange-600'>
                  {t('sections.partnership.number')}
                </div>
                <h2 className='mb-6 text-4xl font-bold'>
                  {t('sections.partnership.title')}
                </h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  {t('sections.partnership.description1')}
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  {t('sections.partnership.description2')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection animation='fadeUp' delay={200} className='px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-16 text-center'>
              <h2 className='mb-6 text-4xl font-bold'>{t('services.title')}</h2>
              <p className='mx-auto max-w-3xl text-xl text-gray-600'>
                {t('services.subtitle')}
              </p>
            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <AnimatedCard
                delay={100}
                className='rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl'
              >
                <div className='mb-4 text-4xl'>🔧</div>
                <h3 className='mb-4 text-xl font-bold'>
                  {t('services.installation.title')}
                </h3>
                <p className='text-gray-600'>
                  {t('services.installation.description')}
                </p>
              </AnimatedCard>
              <AnimatedCard
                delay={200}
                className='rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl'
              >
                <div className='mb-4 text-4xl'>📊</div>
                <h3 className='mb-4 text-xl font-bold'>
                  {t('services.monitoring.title')}
                </h3>
                <p className='text-gray-600'>
                  {t('services.monitoring.description')}
                </p>
              </AnimatedCard>
              <AnimatedCard
                delay={300}
                className='rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl'
              >
                <div className='mb-4 text-4xl'>🛠️</div>
                <h3 className='mb-4 text-xl font-bold'>
                  {t('services.maintenance.title')}
                </h3>
                <p className='text-gray-600'>
                  {t('services.maintenance.description')}
                </p>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection
          animation='fadeUp'
          delay={200}
          className='bg-gray-50 px-4 py-20'
        >
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='mb-6 text-4xl font-bold'>{t('contact.title')}</h2>
            <p className='mb-8 text-xl text-gray-600'>
              {t('contact.subtitle')}
            </p>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 text-3xl'>📞</div>
                <h3 className='mb-2 font-bold'>{t('contact.phone')}</h3>
                <p className='text-gray-600'>+420 123 456 789</p>
              </div>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 text-3xl'>✉️</div>
                <h3 className='mb-2 font-bold'>{t('contact.email')}</h3>
                <p className='text-gray-600'>
                  info@{params.company.toLowerCase()}.cz
                </p>
              </div>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 text-3xl'>📍</div>
                <h3 className='mb-2 font-bold'>{t('contact.address')}</h3>
                <p className='text-gray-600'>{t('contact.location')}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </SimplePageWrapper>
  )
}
