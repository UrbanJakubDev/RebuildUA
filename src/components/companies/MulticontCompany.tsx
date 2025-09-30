'use client'

import { SimplePageWrapper } from '@/src/components/PageWrapper'
import {
  AnimatedSection,
  AnimatedHero,
  AnimatedCard,
  AnimatedText
} from '@/src/components/AnimatedSection'
import React from 'react'
import { CompanyPageProps, CompanyStats } from './types'
import { QRCodeSection } from '../QRCodeSection'
import { ImageTextSection } from '../ImageTextSection'

export function MulticontCompany({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  // Get company-specific content or fallback to generic content
  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <div>
        {/* Hero Section - Logistics Theme with Background Image */}
        <AnimatedHero className='relative overflow-hidden px-4 py-20'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: 'url(/images/hero-background.jpg)'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
          </div>

          {/* Content */}
          <div className='relative z-10 mx-auto max-w-6xl text-center'>
            <h1 className='mb-8 text-5xl font-bold text-white drop-shadow-lg md:text-7xl'>
              {t('companies.multicont.hero.title')}
            </h1>
            <p className='mx-auto max-w-4xl text-xl leading-relaxed text-gray-100 drop-shadow-md md:text-2xl'>
              {t('companies.multicont.hero.description')}
            </p>
          </div>
        </AnimatedHero>
        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/container-image.jpg'
          imageAlt='Naše technologie'
          title={t('companies.multicont.company.title')}
          description={t('companies.multicont.company.description')}
          imagePosition='left'
        />

        {/* Just test section */}
        <AnimatedSection
          animation='fadeUp'
          delay={100}
          className='bg-white px-4 py-20'
        >
          <div className='mx-auto max-w-6xl px-4 py-12'>
            <h2 className='mb-8 text-center text-4xl font-bold text-black'>
              {t('companies.multicont.specifications.title')}
            </h2>
            <div className='mb-10 grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
              <div className='rounded-2xl bg-white p-6 '>
                <div className='mb-2 text-2xl font-semibold text-black'>
                  {t('companies.multicont.specifications.maxDimensions.title')}
                </div>
                <div className='text-lg text-black'>
                  {t('companies.multicont.specifications.maxDimensions.value')}
                </div>
              </div>
              <div className='rounded-2xl bg-white p-6 '>
                <div className='mb-2 text-2xl font-semibold text-black'>
                  {t(
                    'companies.multicont.specifications.weightAssembled.title'
                  )}
                </div>
                <div className='text-lg text-black'>
                  {t(
                    'companies.multicont.specifications.weightAssembled.value'
                  )}
                </div>
              </div>
              <div className='rounded-2xl bg-white p-6 '>
                <div className='mb-2 text-2xl font-semibold text-black'>
                  {t('companies.multicont.specifications.weightEmpty.title')}
                </div>
                <div className='text-lg text-black'>
                  {t('companies.multicont.specifications.weightEmpty.value')}
                </div>
              </div>
            </div>
            <div className='mb-4 rounded-2xl bg-white p-4 text-center text-lg text-black '>
              {t('companies.multicont.specifications.capabilities1')}
            </div>
            <div className='rounded-2xl bg-white p-4 text-center text-lg text-black '>
              {t('companies.multicont.specifications.capabilities2')}
            </div>
          </div>
        </AnimatedSection>

        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/container-image.jpg'
          imageAlt='Twin pack kontejner o délce 14 metrů'
          title={t('companies.multicont.projects.twinPack.title')}
          description={t('companies.multicont.projects.twinPack.description')}
          imagePosition='left'
        />
        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/container-biogas.jpg'
          imageAlt='Kontejner pro bioplynovou stanici'
          title={t('companies.multicont.projects.biogas.title')}
          description={t('companies.multicont.projects.biogas.description')}
          imagePosition='right'
        />

        {/* Contact Section with QR Code */}
        <QRCodeSection url='https://www.multicont.eu' qrSize={160} />

        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/akurat-group-logo.jpg'
          imageAlt='AKURAT GROUP logo'
          title={t('companies.multicont.company.title')}
          description={t('companies.multicont.company.description')}
          imagePosition='left'
        />
      </div>
    </SimplePageWrapper>
  )
}
