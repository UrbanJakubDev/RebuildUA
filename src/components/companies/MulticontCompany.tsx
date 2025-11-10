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
import { InactivityRedirectHandler } from '../InactivityRedirectHandler'
import { ContactInfo } from '../ContactInfo'

export function MulticontCompany({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  const contactInfo = {
    phone: '+420 724 575 452',
    email: 'radek.vones@multicont.eu',
    web: 'www.multicont.eu'
  }

  // Get company-specific content or fallback to generic content
  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <InactivityRedirectHandler
        redirectPath='/'
        timeout={60000}
        enabled={true}
      />
      <div>
        {/* Hero Section - Logistics Theme with Background Image */}
        <AnimatedHero className='relative overflow-hidden px-4 py-20'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: 'url(/images/multicont/hero-background.jpg)'
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
          imageSrc='/images/multicont/container-image.jpg'
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
          imageSrc='/images/multicont/reference/twinpack.jpg'
          imageAlt='Twin pack kontejner o délce 14 metrů'
          title={t('companies.multicont.projects.twinPack.title')}
          description={t('companies.multicont.projects.twinPack.description')}
          imagePosition='left'
        />
        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/multicont/container-biogas.jpg'
          imageAlt='Kontejner pro bioplynovou stanici'
          title={t('companies.multicont.projects.biogas.title')}
          description={t('companies.multicont.projects.biogas.description')}
          imagePosition='right'
        />

        <AnimatedSection>
          <div className='mx-auto max-w-5xl py-12'>
            <h2 className='text-multicont-primary mb-8 text-center text-3xl font-bold'>
              {t('companies.multicont.referenceGallery.title', {
                defaultValue: 'Reference Gallery'
              })}
            </h2>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {[
                {
                  src: '/images/multicont/reference/twinpack.jpg',
                  alt: 'Twin Pack 14m'
                },
                {
                  src: '/images/multicont/reference/interior.jpg',
                  alt: 'Container Interior'
                },
                {
                  src: '/images/multicont/reference/01.jpg',
                  alt: 'Reference Container 01'
                },
                {
                  src: '/images/multicont/reference/02.jpg',
                  alt: 'Reference Container 02'
                },
                {
                  src: '/images/multicont/reference/03.jpg',
                  alt: 'Reference Container 03'
                },
                {
                  src: '/images/multicont/reference/04.jpg',
                  alt: 'Reference Container 04'
                },
                {
                  src: '/images/multicont/reference/05.jpg',
                  alt: 'Reference Container 05'
                },
                {
                  src: '/images/multicont/reference/06.jpg',
                  alt: 'Reference Container 06'
                },
                {
                  src: '/images/multicont/reference/2504-02.PNG',
                  alt: 'Reference Container 07'
                }
              ].map((img, i) => (
                <div
                  key={i}
                  className='overflow-hidden rounded-xl bg-white shadow'
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className='h-[350px] w-full object-cover transition-transform duration-300 hover:scale-105'
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/multicont/akurat-group-logo.jpg'
          imageAlt='AKURAT GROUP logo'
          title={t('companies.multicont.company.title')}
          description={[
            t('companies.multicont.company.description.p1'),
            t('companies.multicont.company.description.p2'),
            t('companies.multicont.company.description.p3')
          ]}
          imagePosition='left'
          imageSize='fill'
        />
        {/* Contact Section with QR Code */}
        <div className='bg-multicont-primary grid grid-cols-2 py-20'>
          <QRCodeSection url='https://www.multicont.eu' qrSize={160} className='bg-multicont-primary' />
          <ContactInfo
            phone={contactInfo.phone}
            email={contactInfo.email}
            website={contactInfo.web}
            t={t}
            className='bg-multicont-primary'
          />
        </div>
      </div>
    </SimplePageWrapper>
  )
}
