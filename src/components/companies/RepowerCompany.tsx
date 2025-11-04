'use client'

import { SimplePageWrapper } from '@/src/components/PageWrapper'
import {
  AnimatedSection,
  AnimatedHero,
  AnimatedCard,
  AnimatedText
} from '@/src/components/AnimatedSection'
import React from 'react'
import { CompanyPageProps } from './types'
import { QRCodeSVG } from 'qrcode.react'
import { ImageTextSection } from '../ImageTextSection'

interface AgendaItemProps {
  number: string
  title: string
  description: string
}

function AgendaItem({ number, title, description }: AgendaItemProps) {
  return (
    <div className='text-text-primary'>
      <div className='text-xl text-secondary'>{number}</div>
      {/* Divider with line */}
      <div className='h-[2px] w-full bg-background'></div>
      <div className='text-text-primary text-2xl font-bold'>{title}</div>
      <p className='text-text-primary text-lg leading-relaxed'>{description}</p>
    </div>
  )
}

interface ParameterCardProps {
  keyName: string
  colorClass: string
  titleColor: string
  delay: number
  t: any
}

function ParameterCard({
  keyName,
  colorClass,
  titleColor,
  delay,
  t
}: ParameterCardProps) {
  const title = t(`companies.repower.parameters.${keyName}.title`)
  const description = t(`companies.repower.parameters.${keyName}.description`)
  const point1 = t(`companies.repower.parameters.${keyName}.point1`)
  const point2 = t(`companies.repower.parameters.${keyName}.point2`)
  const point3 = t(`companies.repower.parameters.${keyName}.point3`)

  return (
    <AnimatedCard delay={delay} className={colorClass}>
      <h3 className={`mb-4 text-2xl font-bold ${titleColor}`}>{title}</h3>
      <p className='mb-4 font-bold text-gray-900'>{description}</p>
      <ul className='space-y-2 text-sm text-gray-700'>
        <li>• {point1}</li>
        <li>• {point2}</li>
        <li>• {point3}</li>
      </ul>
    </AnimatedCard>
  )
}

interface FinancialCardProps {
  keyName: string
  gradientClass: string
  titleColor: string
  subtitleColor: string
  delay: number
  t: any
}

function FinancialCard({
  keyName,
  gradientClass,
  titleColor,
  subtitleColor,
  delay,
  t
}: FinancialCardProps) {
  const title = t(`companies.repower.financial.${keyName}.title`)
  const value = t(`companies.repower.financial.${keyName}.value`)
  const subtitle = t(`companies.repower.financial.${keyName}.subtitle`)

  return (
    <AnimatedCard
      delay={delay}
      className={`rounded-2xl bg-gradient-to-br ${gradientClass} flex flex-col items-center justify-center p-8 text-center text-white`}
    >
      <h3 className='text-4xl font-bold'>{value}</h3>
      <p className={`mb-2 text-lg ${titleColor}`}>{title}</p>
      <p className={`mt-2 text-sm ${subtitleColor}`}>{subtitle}</p>
    </AnimatedCard>
  )
}

interface ContentCardProps {
  title: string
  content: React.ReactNode
  delay: number
}

function ContentCard({ title, content, delay }: ContentCardProps) {
  return (
    <AnimatedCard delay={delay} className='rounded-2xl bg-white p-8 shadow-lg'>
      <h3 className='mb-6 text-2xl font-bold text-gray-900'>{title}</h3>
      <div className='text-lg text-gray-700'>{content}</div>
    </AnimatedCard>
  )
}

export function RepowerCompany({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <div className='bg-repower-background text-text-primary'>
        {/* Hero Section */}
        <AnimatedHero className='relative overflow-hidden px-4 py-20'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat '
            style={{
              backgroundImage: 'url(/images/repower/hero-background.png)'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
          </div>

          {/* Content */}
          <div className='relative z-10 mx-auto max-w-6xl text-center'>
            <h1 className='mb-8 text-5xl font-bold text-white drop-shadow-lg md:text-7xl'>
              {t('companies.repower.hero.title')}
            </h1>
            <p className='mx-auto max-w-4xl text-xl leading-relaxed text-gray-100 drop-shadow-md md:text-2xl'>
              {t('companies.repower.hero.description')}
            </p>
          </div>
        </AnimatedHero>

        {/* Agenda Section */}
        <AnimatedSection animation='fadeUp' delay={100} className='px-4 py-20'>
          <div className='text-text-primary mx-auto max-w-6xl'>
            <div className='mb-8 text-left'>
              <span className='mb-4 inline-block text-6xl font-bold '>
                {t('companies.repower.agenda.title')}
              </span>
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
              {[1, 2, 3].map(item => (
                <AgendaItem
                  key={item}
                  number={t(
                    `companies.repower.agenda.items.item${item}.number`
                  )}
                  title={t(`companies.repower.agenda.items.item${item}.title`)}
                  description={t(
                    `companies.repower.agenda.items.item${item}.description`
                  )}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Investment in Ukrainian Energy Section */}
        <AnimatedSection animation='fadeUp' delay={100} className='px-4 py-20'>
          <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2'>
            {/* Left: Image */}
            <div className='flex justify-center'>
              <svg
                viewBox='126.6 -13.4 748.8 550.8'
                width='100%'
                height='auto'
                preserveAspectRatio='xMidYMid meet'
                overflow='visible'
                style={{ maxWidth: '100%', display: 'block' }}
                className='w-full max-w-md '
                aria-label='Investment in Ukrainian Energy diagram'
              >
                <g id='packed_circles-frame'>
                  <g
                    id='step-1'
                    className='themed-svg-shape-fill themed-svg-shape-background'
                  >
                    <circle
                      id='step-1-accent'
                      cx='291'
                      cy='329'
                      r='150'
                      className='themed-svg-shape-fill themed-svg-shape-background'
                      style={
                        {
                          '--shape-bg-color-override': '#323234ff'
                        } as React.CSSProperties
                      }
                    />
                  </g>
                  <g
                    id='step-2'
                    className='themed-svg-shape-fill themed-svg-shape-background'
                  >
                    <circle
                      id='step-2-accent'
                      cx='542'
                      cy='185'
                      r='120'
                      className='themed-svg-shape-fill themed-svg-shape-background'
                      style={
                        {
                          '--shape-bg-color-override': '#414044ff'
                        } as React.CSSProperties
                      }
                    />
                  </g>
                  <g
                    id='step-3'
                    className='themed-svg-shape-fill themed-svg-shape-background'
                  >
                    <circle
                      id='step-3-accent'
                      cx='751'
                      cy='324'
                      r='110'
                      className='themed-svg-shape-fill themed-svg-shape-background'
                      style={
                        {
                          '--shape-bg-color-override': '#504f54ff'
                        } as React.CSSProperties
                      }
                    />
                  </g>
                  <g
                    id='step-4'
                    className='themed-svg-shape-fill themed-svg-shape-background'
                  >
                    <circle
                      id='step-4-accent'
                      cx='544'
                      cy='423'
                      r='100'
                      className='themed-svg-shape-fill themed-svg-shape-background'
                      style={
                        {
                          '--shape-bg-color-override': '#5f5e63ff'
                        } as React.CSSProperties
                      }
                    />
                  </g>
                  <g
                    id='step-5'
                    className='themed-svg-shape-fill themed-svg-shape-background'
                  >
                    <circle
                      id='step-5-accent'
                      cx='343.5'
                      cy='88.5'
                      r='87.5'
                      className='themed-svg-shape-fill themed-svg-shape-background'
                      style={
                        {
                          '--shape-bg-color-override': '#6e6c73ff'
                        } as React.CSSProperties
                      }
                    />
                  </g>
                </g>
                {/* Labeled circles (Investment themes) */}
                <foreignObject
                  x='164.16796875'
                  y='247.0625'
                  width='251'
                  height='163'
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontSize: 28,
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    Infrastructure Needs
                  </div>
                </foreignObject>
                <foreignObject
                  x='443.16796875'
                  y='120.0625'
                  width='195'
                  height='127'
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    GENTEC CHP Units
                  </div>
                </foreignObject>
                <foreignObject
                  x='661.16796875'
                  y='262.0625'
                  width='177'
                  height='129'
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    Energy Security
                  </div>
                </foreignObject>
                <foreignObject
                  x='459.16796875'
                  y='363.0625'
                  width='167'
                  height='121'
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    Cost Efficiency
                  </div>
                </foreignObject>
                <foreignObject
                  x='268.16796875'
                  y='41.0625'
                  width='147'
                  height='96'
                  style={{ overflow: 'visible' }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    Investment Opportunity
                  </div>
                </foreignObject>
              </svg>
            </div>
            {/* Right: Heading + Ordered List */}
            <div>
              <span className='mb-6 block text-4xl font-bold md:text-6xl'>
                {t('companies.repower.investment.title')}
              </span>
              <ol className='text-text-primary list-decimal space-y-4 pl-6 text-lg'>
                <li>{t('companies.repower.investment.point1')}</li>
                <li>{t('companies.repower.investment.point2')}</li>
                <li>{t('companies.repower.investment.point3')}</li>
                <li>{t('companies.repower.investment.point4')}</li>
              </ol>
            </div>
          </div>
        </AnimatedSection>

        {/* Main Project Parameters Section */}
        <AnimatedSection animation='fadeUp' delay={100} className=' px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-12 text-center'>
              <h2 className='mb-6 text-4xl font-bold text-gray-900'>
                {t('companies.repower.parameters.title')}
              </h2>
            </div>
            <div className='grid grid-cols-2 items-center gap-8'>
              {/* Left: Cards */}
              <div className='space-y-6'>
                <ParameterCard
                  keyName='pilotCapacity'
                  colorClass='bg-gray-100 p-4 rounded-xl'
                  titleColor='text-text-primary'
                  delay={100}
                  t={t}
                />
                <ParameterCard
                  keyName='expansion'
                  colorClass='bg-gray-100 p-4 rounded-xl'
                  titleColor='text-text-primary'
                  delay={200}
                  t={t}
                />
                <ParameterCard
                  keyName='lease'
                  colorClass='bg-gray-100 p-4 rounded-xl'
                  titleColor='text-text-primary'
                  delay={300}
                  t={t}
                />
                <ParameterCard
                  keyName='siteSelection'
                  colorClass='bg-gray-100 p-4 rounded-xl'
                  titleColor='text-text-primary'
                  delay={400}
                  t={t}
                />
              </div>
              {/* Right: Image */}
              <div className='flex h-full items-center justify-center'>
                <AnimatedCard
                  delay={500}
                  className='flex h-full w-full items-center justify-center rounded-2xl '
                >
                  <img
                    src='/images/repower/image11.png'
                    alt='Repower company illustration'
                    className='h-full w-full rounded-xl object-cover'
                  />
                </AnimatedCard>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Location Schema Section */}
        <AnimatedSection animation='fadeUp' delay={100} className=' px-4 py-20'>
          <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2'>
            {/* Left: Image */}
            <div className='flex justify-center'>
              <img
                src='/images/repower/location-schema.jpg'
                alt={t('companies.repower.location.title')}
                className='w-full max-w-2xl rounded-2xl object-cover shadow-lg'
              />
            </div>
            {/* Right: Heading + Paragraphs */}
            <div>
              <h2 className='mb-6 text-4xl font-bold text-gray-900 md:text-6xl'>
                {t('companies.repower.location.title')}
              </h2>
              <p className='mb-6 text-lg leading-relaxed text-gray-700'>
                {t('companies.repower.location.description1')}
              </p>
              <p className='mb-6 text-lg leading-relaxed text-gray-700'>
                {t('companies.repower.location.description2')}
              </p>
              <p className='text-lg leading-relaxed text-gray-700'>
                {t('companies.repower.location.description3')}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Investment Costs and Returns Section */}
        <AnimatedSection animation='fadeUp' delay={100} className=' px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            {/* Title */}
            <h2 className='mb-6 text-center text-4xl font-bold text-gray-900'>
              {t('companies.repower.financial.title')}
            </h2>

            {/* Description */}
            <p className='mb-8 text-center text-lg leading-relaxed text-gray-700'>
              {t('companies.repower.financial.description')}
            </p>

            {/* Line Divider */}
            <div className='mb-12 h-[2px] w-full bg-gray-200'></div>

            {/* 2-col Grid: Image Left, Cards Right */}
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              {/* Left: Image */}
              <div className='flex justify-center'>
                <img
                  src='/images/repower/financial-analysis.jpg'
                  alt={t('companies.repower.financial.title')}
                  className='w-full max-w-md rounded-2xl object-cover shadow-lg'
                />
              </div>

              {/* Right: 2-col Grid with Cards */}
              <div className='grid grid-cols-2 gap-4'>
                <FinancialCard
                  keyName='investment'
                  gradientClass='from-blue-600 to-indigo-600'
                  titleColor='text-blue-100'
                  subtitleColor='text-blue-100'
                  delay={100}
                  t={t}
                />
                <FinancialCard
                  keyName='irr'
                  gradientClass='from-green-600 to-emerald-600'
                  titleColor='text-green-100'
                  subtitleColor='text-green-100'
                  delay={200}
                  t={t}
                />
                <FinancialCard
                  keyName='equityPayback'
                  gradientClass='from-purple-600 to-pink-600'
                  titleColor='text-purple-100'
                  subtitleColor='text-purple-100'
                  delay={300}
                  t={t}
                />
                <FinancialCard
                  keyName='totalPayback'
                  gradientClass='from-orange-600 to-red-600'
                  titleColor='text-orange-100'
                  subtitleColor='text-orange-100'
                  delay={400}
                  t={t}
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Financing Structure & Investment Conclusion Section */}
        <AnimatedSection animation='fadeUp' delay={100} className=' px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
              {/* Financing Structure Card */}
              <ContentCard
                title={t('companies.repower.financing.title')}
                delay={100}
                content={
                  <ul className='space-y-4'>
                    <li className='flex items-start'>
                      <span className='mr-3 text-2xl'>•</span>
                      <span>{t('companies.repower.financing.point1')}</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-3 text-2xl'>•</span>
                      <span>{t('companies.repower.financing.point2')}</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='mr-3 text-2xl'>•</span>
                      <span>{t('companies.repower.financing.point3')}</span>
                    </li>
                  </ul>
                }
              />

              {/* Investment Conclusion Card */}
              <ContentCard
                title={t('companies.repower.conclusion.title')}
                delay={200}
                content={
                  <p className='leading-relaxed'>
                    {t('companies.repower.conclusion.description')}
                  </p>
                }
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Seeking Strategic Partners Section */}
        <AnimatedSection animation='fadeUp' delay={100} className=' px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <h2 className='text-left text-4xl font-bold text-gray-900'>
              {t('companies.repower.partners.seeking.title')}
            </h2>
            <p className='mb-8 text-left text-lg leading-relaxed text-gray-700'>
              {t('companies.repower.partners.seeking.subtitle')}
            </p>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <AnimatedCard
                delay={100}
                className='rounded-2xl bg-white p-6 shadow-lg'
              >
                <h3 className='mb-4 text-2xl font-bold text-blue-600'>
                  {t('companies.repower.partners.seeking.investors.title')}
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  {t(
                    'companies.repower.partners.seeking.investors.description'
                  )}
                </p>
              </AnimatedCard>

              <AnimatedCard
                delay={200}
                className='rounded-2xl bg-white p-6 shadow-lg'
              >
                <h3 className='mb-4 text-2xl font-bold text-green-600'>
                  {t('companies.repower.partners.seeking.landOwners.title')}
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  {t(
                    'companies.repower.partners.seeking.landOwners.description'
                  )}
                </p>
              </AnimatedCard>

              <AnimatedCard
                delay={300}
                className='rounded-2xl bg-white p-6 shadow-lg'
              >
                <h3 className='mb-4 text-2xl font-bold text-purple-600'>
                  {t('companies.repower.partners.seeking.implementation.title')}
                </h3>
                <p className='text-lg leading-relaxed text-gray-700'>
                  {t(
                    'companies.repower.partners.seeking.implementation.description'
                  )}
                </p>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Partners Section */}
        <AnimatedSection animation='fadeUp' delay={100} className='px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            {/* Title */}
            <h2 className='mb-4 text-left text-4xl font-bold text-gray-900'>
              {t('companies.repower.partners.key.title')}
            </h2>

            {/* Subtitle */}
            <h3 className='mb-6 text-left text-2xl font-semibold text-gray-700'>
              {t('companies.repower.partners.key.subtitle')}
            </h3>

            {/* Description */}
            <p className='mb-8 text-left text-lg leading-relaxed text-gray-700'>
              {t('companies.repower.partners.key.description')}
            </p>

            {/* 5-col Grid with Mini Images */}
            <div className='mb-12 grid grid-cols-4 gap-4'>
              {[1, 2, 3, 4].map(index => (
                <AnimatedCard
                  key={index}
                  delay={index * 100}
                  className='flex items-center justify-center'
                >
                  <img
                    src={t(
                      `companies.repower.partners.key.partner${index}.image`
                    )}
                    alt={t(
                      `companies.repower.partners.key.partner${index}.name`
                    )}
                    className='h-20 w-full object-contain'
                  />
                </AnimatedCard>
              ))}
            </div>

            <div className='mb-8 flex justify-center'>
              <img
                src={t('companies.repower.partners.key.image1')}
                alt={t('companies.repower.partners.key.image1Alt')}
                className='w-full max-w-xs rounded-2xl object-cover shadow-lg'
              />
            </div>

            {/* Large Image */}
            <div className='mb-8 flex justify-center'>
              <img
                src={t('companies.repower.partners.key.mainImage')}
                alt={t('companies.repower.partners.key.mainImageAlt')}
                className='w-full max-w-2xl rounded-2xl object-cover shadow-lg'
              />
            </div>

            {/* Final Description */}
            <p className='text-left text-lg leading-relaxed text-gray-700'>
              {t('companies.repower.partners.key.finalDescription')}
            </p>
          </div>
        </AnimatedSection>

        {/* Contact Section with Dark Background */}
        <AnimatedSection
          animation='fadeUp'
          delay={100}
          className='bg-black px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='bg-repower-background rounded-2xl p-8 shadow-lg'>
              <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                {/* Column 1: Contact Info + QR Code */}
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-4 text-xl font-bold text-gray-900'>
                      {t('companies.repower.contact.title')}
                    </h3>
                    <div className='space-y-3 text-gray-700'>
                      <div className='flex items-center'>
                        <span className='mr-2 font-semibold'>
                          {t('companies.repower.contact.emailLabel')}:
                        </span>
                        <a
                          href={`mailto:${t('companies.repower.contact.email')}`}
                          className='text-blue-600 hover:underline'
                        >
                          {t('companies.repower.contact.email')}
                        </a>
                      </div>
                      <div className='flex items-center'>
                        <span className='mr-2 font-semibold'>
                          {t('companies.repower.contact.phoneLabel')}:
                        </span>
                        <a
                          href={`tel:${t('companies.repower.contact.phone')}`}
                          className='text-blue-600 hover:underline'
                        >
                          {t('companies.repower.contact.phone')}
                        </a>
                      </div>
                      <div className='flex items-center'>
                        <span className='mr-2 font-semibold'>
                          {t('companies.repower.contact.websiteLabel')}:
                        </span>
                        <a
                          href={t('companies.repower.contact.website')}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-blue-600 hover:underline'
                        >
                          {t('companies.repower.contact.website')}
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* QR Code */}
                  <div className='flex items-center justify-center'>
                    <div className='rounded-lg bg-white p-4 shadow-md'>
                      <QRCodeSVG
                        value={t('companies.repower.contact.website')}
                        size={160}
                        bgColor='#ffffff'
                        fgColor='#000000'
                        level='M'
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2: Logos */}
                <div className='flex flex-col items-center justify-center space-y-8'>
                  <div className='flex items-center justify-center'>
                    <img
                      src={t('companies.repower.contact.logos.repower')}
                      alt={t('companies.repower.contact.logos.repowerAlt')}
                      className='h-full w-full object-contain'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <img
                      src={t('companies.repower.contact.logos.gentec')}
                      alt={t('companies.repower.contact.logos.gentecAlt')}
                      className='h-full w-full object-contain'
                    />
                  </div>
                </div>

                {/* Column 3: CTA + Image */}
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900'>
                      {t('companies.repower.contact.cta.title')}
                    </h3>
                    <p className='mb-6 text-lg leading-relaxed text-gray-700'>
                      {t('companies.repower.contact.cta.description')}
                    </p>
                  </div>
                  <div className='flex justify-center'>
                    <img
                      src={t('companies.repower.contact.cta.image')}
                      alt={t('companies.repower.contact.cta.title')}
                      className='w-full max-w-md rounded-lg object-cover shadow-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </SimplePageWrapper>
  )
}
