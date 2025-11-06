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
import {
  HiOutlineCash,
  HiOutlineHome,
  HiOutlineUserGroup
} from 'react-icons/hi'
import { InactivityRedirectHandler } from '../InactivityRedirectHandler'

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
      <div className='text-2xl font-bold text-text-primary'>{title}</div>
      <p className='text-xl leading-relaxed text-text-primary'>{description}</p>
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
      <p className='mb-4 text-xl font-bold text-gray-900'>{description}</p>
      <ul className='space-y-2 text-lg text-gray-700'>
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
      <h3 className='text-5xl font-bold'>{value}</h3>
      <p className={`mb-2 text-xl ${titleColor}`}>{title}</p>
      <p className={`mt-2 text-lg ${subtitleColor}`}>{subtitle}</p>
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
      <div className='text-xl text-gray-700'>{content}</div>
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
      <InactivityRedirectHandler
        redirectPath='/'
        timeout={60000}
        enabled={true}
      />
      <div className='bg-repower-background text-text-primary'>
        {/* Hero Section */}
        <AnimatedHero className='relative overflow-hidden px-4 py-40'>
          {/* Background Image */}
          <div
            className='bg-fill absolute inset-0 bg-no-repeat'
            style={{
              backgroundImage: 'url(/images/repower/hero-background.png)',
              backgroundPosition: '90% 80%'
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className='absolute inset-0 bg-black bg-opacity-50'></div>
          </div>

          {/* Content */}
          <div className='relative z-10 mx-auto flex w-full max-w-6xl items-center gap-8 text-left'>
            {/* Left: Logo image on 1/3 */}
            <div className='flex w-1/3 items-center justify-start'>
              <img
                src='/images/repower/image8.png'
                alt='Repower logo'
                className='w-full max-w-md object-contain'
              />
            </div>
            {/* Right: Hero content on 2/3 (optional, currently empty for future use) */}
            <div className='w-2/3'></div>
          </div>
        </AnimatedHero>

        <AnimatedSection>
          <div className='col-span-2 flex w-full flex-col items-center justify-center py-20'>
            <h1 className='mb-8 text-7xl'>
              {t('companies.repower.hero.title')}
            </h1>
            <p className='mx-auto max-w-4xl text-2xl leading-relaxed'>
              {t('companies.repower.hero.description')}
            </p>
          </div>
        </AnimatedSection>

        {/* Agenda Section */}
        <AnimatedSection animation='fadeUp' delay={100} className='px-4 py-20'>
          <div className='mx-auto max-w-6xl text-text-primary'>
            <div className='mb-8 text-left'>
              <span className='mb-4 inline-block text-6xl'>
                {t('companies.repower.agenda.title')}
              </span>
            </div>
            <div className='grid grid-cols-3 gap-6'>
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
          <div className='mx-auto grid max-w-6xl grid-cols-2 items-center gap-8'>
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
              <h2 className='mb-6 block text-6xl'>
                {t('companies.repower.investment.title')}
              </h2>
              <ol className='list-decimal space-y-4 pl-6 text-xl text-text-primary'>
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
              <h2 className='mb-6 text-6xl'>
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
          <div className='mx-auto grid max-w-6xl grid-cols-2 items-center gap-8'>
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
              <h2 className='mb-6 text-6xl'>
                {t('companies.repower.location.title')}
              </h2>
              <p className='mb-6 text-xl leading-relaxed text-gray-700'>
                {t('companies.repower.location.description1')}
              </p>
              <p className='mb-6 text-xl leading-relaxed text-gray-700'>
                {t('companies.repower.location.description2')}
              </p>
              <p className='text-xl leading-relaxed text-gray-700'>
                {t('companies.repower.location.description3')}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Investment Costs and Returns Section */}
        <AnimatedSection animation='fadeUp' delay={100} className=' px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            {/* Title */}
            <h2 className='mb-6 text-center text-6xl'>
              {t('companies.repower.financial.title')}
            </h2>

            {/* Description */}
            <p className='mb-8 text-center text-xl leading-relaxed text-gray-700'>
              {t('companies.repower.financial.description')}
            </p>

            {/* Line Divider */}
            <div className='mb-12 h-[2px] w-full bg-gray-600'></div>

            {/* 2-col Grid: Image Left, Cards Right */}
            <div className='grid grid-cols-2 gap-8'>
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
            <div className='grid grid-cols-2 gap-8'>
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
            <h2 className='text-left text-6xl'>
              {t('companies.repower.partners.seeking.title')}
            </h2>
            <p className='mb-8 text-left text-xl leading-relaxed text-gray-700'>
              {t('companies.repower.partners.seeking.subtitle')}
            </p>
            <div className='grid grid-cols-3 gap-8'>
              <AnimatedCard
                delay={100}
                className='rounded-2xl bg-white p-6 shadow-lg'
              >
                <div className='mb-4'>
                  <HiOutlineCash className='mb-3 h-7 w-7 text-text-primary' />
                  <h3 className='text-2xl font-bold text-text-primary'>
                    {t('companies.repower.partners.seeking.investors.title')}
                  </h3>
                </div>
                <p className='text-xl leading-relaxed text-gray-700'>
                  {t(
                    'companies.repower.partners.seeking.investors.description'
                  )}
                </p>
              </AnimatedCard>

              <AnimatedCard
                delay={200}
                className='rounded-2xl bg-white p-6 shadow-lg'
              >
                <div className='mb-4'>
                  <HiOutlineHome className='mb-3 h-7 w-7 text-text-primary' />
                  <h3 className='text-2xl font-bold text-text-primary'>
                    {t('companies.repower.partners.seeking.landOwners.title')}
                  </h3>
                </div>
                <p className='text-xl leading-relaxed text-gray-700'>
                  {t(
                    'companies.repower.partners.seeking.landOwners.description'
                  )}
                </p>
              </AnimatedCard>

              <AnimatedCard
                delay={300}
                className='rounded-2xl bg-white p-6 shadow-lg'
              >
                <div className='mb-4'>
                  <HiOutlineUserGroup className='mb-3 h-7 w-7 text-text-primary' />
                  <h3 className='text-2xl font-bold text-text-primary'>
                    {t(
                      'companies.repower.partners.seeking.implementation.title'
                    )}
                  </h3>
                </div>
                <p className='text-xl leading-relaxed text-gray-700'>
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
            <h2 className='mb-4 text-left text-6xl'>
              {t('companies.repower.partners.key.title')}
            </h2>

            {/* Subtitle */}
            <h3 className='mb-6 text-left text-2xl font-semibold text-gray-700'>
              {t('companies.repower.partners.key.subtitle')}
            </h3>

            {/* Description */}
            <p className='mb-8 text-left text-xl leading-relaxed text-gray-700'>
              {t('companies.repower.partners.key.description')}
            </p>

            {/* 5-col Grid with Mini Images */}
            <div className='mb-12 grid grid-cols-5 gap-4'>
              {[1, 2, 3, 4, 5].map(index => (
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

            {/* Large Image */}
            <div className='mb-8 flex justify-center'>
              <img
                src={t('companies.repower.partners.key.mainImage')}
                alt={t('companies.repower.partners.key.mainImageAlt')}
                className='w-full max-w-2xl rounded-2xl object-cover shadow-lg'
              />
            </div>

            {/* Final Description */}
            <p className='text-left text-xl leading-relaxed text-gray-700'>
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
            <div className='rounded-2xl bg-repower-background p-16 shadow-lg'>
              <div className='grid grid-cols-3 gap-8'>
                {/* Column 1: Contact Info + QR Code */}
                <div className='flex flex-col items-center justify-center space-y-6 text-center'>
                  <div>
                    <h3 className='mb-4 text-xl font-bold text-gray-900'>
                      {t('companies.repower.contact.title')}
                    </h3>
                    <div className='space-y-3 text-gray-700'>
                      <div className='flex gap-4 text-left'>
                        <span className='mb-1 font-semibold'>
                          {t('companies.repower.contact.emailLabel')}:
                        </span>
                        <span className='text-blue-600'>
                          {t('companies.repower.contact.email')}
                        </span>
                      </div>
                      <div className='flex gap-4 text-left'>
                        <span className='mb-1 font-semibold'>
                          {t('companies.repower.contact.phoneLabel')}:
                        </span>
                        <span className='text-blue-600'>
                          {t('companies.repower.contact.phone')}
                        </span>
                      </div>
                      <div className='flex gap-4 text-left'>
                        <span className='mb-1 font-semibold'>
                          {t('companies.repower.contact.websiteLabel')}:
                        </span>
                        <span className='text-blue-600'>
                          {t('companies.repower.contact.website')}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* QR Code */}
                  <div className='flex items-center justify-center'>
                    <div className='rounded-lg bg-white p-4 shadow-md'>
                      <img
                        src='/images/repower/qr.png'
                        alt='Repower QR code'
                        className='h-full w-full object-contain'
                      />
                    </div>
                  </div>
                </div>

                {/* Column 2: Logos */}
                <div className='mx-auto flex flex-col items-center justify-center space-y-8 px-10'>
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
                <div className='flex flex-col items-center space-y-6 text-center'>
                  <div>
                    <h3 className='mb-4 text-2xl font-bold text-gray-900'>
                      {t('companies.repower.contact.cta.title')}
                    </h3>
                    <p className='mb-6 text-xl leading-relaxed text-gray-700'>
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
