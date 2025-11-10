'use client'

import { SimplePageWrapper } from '@/src/components/PageWrapper'
import {
  AnimatedSection,
  AnimatedHero,
  AnimatedCard,
  AnimatedText
} from '@/src/components/AnimatedSection'
import React, { useState } from 'react'
import { CompanyPageProps, CompanyStats } from './types'
import { ImageTextSection } from '../ImageTextSection'
import { QRCodeSection } from '../QRCodeSection'
import { InactivityRedirectHandler } from '../InactivityRedirectHandler'
import { ContactInfo } from '../ContactInfo'

// Accordion Item Component
interface AccordionItemProps {
  title: string
  content: string
  isOpen: boolean
  onClick: () => void
}

function AccordionItem({
  title,
  content,
  isOpen,
  onClick
}: AccordionItemProps) {
  return (
    <div className='border-b border-gray-700'>
      <button
        onClick={onClick}
        className='flex w-full items-center justify-between py-4 text-left transition-colors hover:text-accent-hover'
      >
        <h3 className='text-xl font-semibold text-white'>{title}</h3>
        <div
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <svg
            className='h-5 w-5 text-accent-hover'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        }`}
      >
        <p className='text-gray-300'>{content}</p>
      </div>
    </div>
  )
}

export function AggrCompany({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  // State for active section
  const [activeSection, setActiveSection] = useState(0)
  // State for accordion
  const [activeAccordion, setActiveAccordion] = useState(-1)
  const carouselImages = [
    '/images/aggregaat/accordeon01.jpg',
    '/images/aggregaat/accordeon02.jpg',
    '/images/aggregaat/accordeon03.jpg',
    '/images/aggregaat/accordeon04.jpg',
    '/images/aggregaat/accordeon05.jpg'
  ]
  const carouselSequence = [...carouselImages, ...carouselImages]

  const contactInfo = {
    phone: '+420 725 564 366',
    email: 'yaroslav.kozun@aggregaat.cz',
    website: 'https://www.aggregaat.cz',
    websiteLabel: 'www.aggregaat.cz'
  }

  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <InactivityRedirectHandler
        redirectPath='/'
        timeout={60000}
        enabled={true}
      />
      <div className='bg-black'>
        {/* Hero Section - Mining Theme */}
        <AnimatedHero className='relative flex min-h-[600px] items-center justify-center px-4 py-20'>
          <div className='mx-auto max-w-6xl text-center'>
            <div
              className='absolute inset-0 -z-10 h-full w-full'
              style={{
                backgroundImage: "url('/images/aggregaat/hero-bg.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.5,
                pointerEvents: 'none'
              }}
              aria-hidden='true'
            />
            <h1 className='mb-8  bg-clip-text text-8xl font-bold text-transparent text-white'>
              {t('companies.aggregaat.hero.title')}
            </h1>
            <p className='mx-auto max-w-4xl text-2xl leading-relaxed text-gray-50 md:text-2xl'>
              {t('companies.aggregaat.hero.description')}
            </p>
          </div>
        </AnimatedHero>

        {/* Image Left Text Right Section */}
        <ImageTextSection
          imageSrc='/images/aggregaat/gentec.jpg'
          imageAlt='Naše technologie'
          title={t('companies.aggregaat.company.title')}
          description={[
            t('companies.aggregaat.company.description.p1'),
            t('companies.aggregaat.company.description.p2'),
            t('companies.aggregaat.company.description.p3')
          ]}
          imagePosition='left'
          imageAlign='right'
        />

        {/* Interactive Sections */}
        <AnimatedSection
          animation='fadeLeft'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-3 gap-12'>
              {/* Left side - Navigation List (1/3) */}
              <div className='space-y-8'>
                <h1 className='text-5xl font-bold'>
                  {t('companies.aggregaat.sections.title')}
                </h1>
                <div
                  onClick={() => setActiveSection(0)}
                  className='flex w-full gap-4 text-left text-white transition-all duration-300 '
                >
                  <div
                    className={`mb-2 text-sm font-bold ${
                      activeSection === 0 ? 'text-accent-hover' : ''
                    }`}
                  >
                    01
                  </div>
                  <h3 className='text-2xl font-bold'>
                    {t('companies.aggregaat.sections.flexibility.title')}
                  </h3>
                </div>
                <div
                  onClick={() => setActiveSection(1)}
                  className='flex w-full gap-4 text-left text-white transition-all duration-300 '
                >
                  <div
                    className={`mb-2 text-sm font-bold ${
                      activeSection === 1 ? 'text-accent-hover' : ''
                    }`}
                  >
                    02
                  </div>
                  <h3 className='text-2xl font-bold'>
                    {t('companies.aggregaat.sections.operation.title')}
                  </h3>
                </div>
                <div
                  onClick={() => setActiveSection(2)}
                  className='flex w-full gap-4 text-left text-white transition-all duration-300 '
                >
                  <div
                    className={`mb-2 text-sm font-bold ${
                      activeSection === 2 ? 'text-accent-hover' : ''
                    }`}
                  >
                    03
                  </div>
                  <h3 className='text-2xl font-bold'>
                    {t('companies.aggregaat.sections.management.title')}
                  </h3>
                </div>
                <div
                  onClick={() => setActiveSection(3)}
                  className='flex w-full gap-4 text-left text-white transition-all duration-300 '
                >
                  <div
                    className={`mb-2 text-sm font-bold ${
                      activeSection === 3 ? 'text-accent-hover' : ''
                    }`}
                  >
                    04
                  </div>
                  <h3 className='text-2xl font-bold'>
                    {t('companies.aggregaat.sections.investment.title')}
                  </h3>
                </div>
              </div>

              {/* Right side - Content (2/3) */}
              <div className='col-span-2'>
                <div className='mb-6'>
                  <div className='mb-4 text-sm font-semibold text-accent-hover'>
                    0{activeSection + 1}
                  </div>
                  <h2 className='mb-6 text-4xl font-bold text-white'>
                    {activeSection === 0 &&
                      t('companies.aggregaat.sections.flexibility.title')}
                    {activeSection === 1 &&
                      t('companies.aggregaat.sections.operation.title')}
                    {activeSection === 2 &&
                      t('companies.aggregaat.sections.management.title')}
                    {activeSection === 3 &&
                      t('companies.aggregaat.sections.investment.title')}
                  </h2>
                  <p className='text-lg leading-relaxed text-white'>
                    {activeSection === 0 &&
                      t('companies.aggregaat.sections.flexibility.description')}
                    {activeSection === 1 &&
                      t('companies.aggregaat.sections.operation.description')}
                    {activeSection === 2 &&
                      t('companies.aggregaat.sections.management.description')}
                    {activeSection === 3 &&
                      t('companies.aggregaat.sections.investment.description')}
                  </p>
                </div>

                {/* Image */}
                <div className='relative rounded-2xl border-4 border-accent-hover p-2'>
                  <div className='flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100'>
                    <img
                      src='/images/aggregaat/01.jpg'
                      alt='Virtuální dispečink agregace flexibility'
                      className='h-full w-full object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section with image on left and text on right */}
        <AnimatedSection
          animation='fadeRight'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div className='relative'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-accent-hover to-accent-hover'>
                  <img
                    src='/images/aggregaat/batteries.jpg'
                    alt='Agregaat'
                    className='h-full w-full rounded-lg object-cover'
                  />
                </div>
              </div>
              <div className='order-1 lg:order-2'>
                <h2 className='mb-6 text-4xl font-bold'>
                  {t('companies.aggregaat.stats.title')}
                </h2>
                <p className='text-lg leading-relaxed text-white'>
                  {t('companies.aggregaat.stats.description')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section with left text and right accordion */}
        <AnimatedSection
          animation='fadeLeft'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-start gap-12 lg:grid-cols-2'>
              {/* Left side - Text content */}
              <div>
                <h2 className='mb-6 text-4xl font-bold text-white'>
                  {t('companies.aggregaat.services.title')}
                </h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-300'>
                  {t('companies.aggregaat.services.description1')}
                </p>
                <p className='text-lg leading-relaxed text-gray-300'>
                  {t('companies.aggregaat.services.description2')}
                </p>
              </div>

              {/* Right side - Accordion */}
              <div className='space-y-4'>
                <AccordionItem
                  title={t(
                    'companies.aggregaat.services.accordion.flexibility.title'
                  )}
                  content={t(
                    'companies.aggregaat.services.accordion.flexibility.content'
                  )}
                  isOpen={activeAccordion === 0}
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 0 ? -1 : 0)
                  }
                />
                <AccordionItem
                  title={t(
                    'companies.aggregaat.services.accordion.management.title'
                  )}
                  content={t(
                    'companies.aggregaat.services.accordion.management.content'
                  )}
                  isOpen={activeAccordion === 1}
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 1 ? -1 : 1)
                  }
                />
                <AccordionItem
                  title={t(
                    'companies.aggregaat.services.accordion.monitoring.title'
                  )}
                  content={t(
                    'companies.aggregaat.services.accordion.monitoring.content'
                  )}
                  isOpen={activeAccordion === 2}
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 2 ? -1 : 2)
                  }
                />
                <AccordionItem
                  title={t(
                    'companies.aggregaat.services.accordion.investment.title'
                  )}
                  content={t(
                    'companies.aggregaat.services.accordion.investment.content'
                  )}
                  isOpen={activeAccordion === 3}
                  onClick={() =>
                    setActiveAccordion(activeAccordion === 3 ? -1 : 3)
                  }
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Infinite Carousel Section */}
        <AnimatedSection animation='fadeUp' delay={100} className='px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='mb-12 text-center text-4xl font-bold text-white'>
              {t('companies.aggregaat.projects.title')}
            </h2>

            {/* Infinite Carousel */}
            <div className='relative overflow-hidden'>
              <div className='animate-scroll-infinite flex'>
                <div className='flex min-w-full gap-8'>
                  {carouselSequence.map((imageSrc, index) => (
                    <div
                      key={`${index}-${imageSrc}`}
                      className='min-w-[520px] flex-1 flex-shrink-0'
                    >
                      <div
                        className='w-full overflow-hidden rounded-2xl border-4 border-accent-hover'
                        style={{ aspectRatio: '16 / 9' }}
                      >
                        <img
                          src={imageSrc}
                          alt={`Projekt ${index + 1}`}
                          className='h-full w-full object-cover'
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section with QR Code */}
        <div className='bg-gentec-red '>
          <div className='max-w-6xl mx-auto grid grid-cols-2 '>
          <QRCodeSection
            url='https://www.aggregaat.cz'
            qrSize={160}
            className='bg-gentec-red py-20'
          />
          <ContactInfo
            phone={contactInfo.phone}
            email={contactInfo.email}
            website={contactInfo.website}
            websiteLabel={contactInfo.websiteLabel}
            className='bg-gentec-red py-20'
            t={t}
          />
          </div>
        </div>
      </div>
    </SimplePageWrapper>
  )
}
