'use client'

import { SimplePageWrapper } from '@/src/components/PageWrapper'
import {
  AnimatedSection,
  AnimatedHero,
  AnimatedCard,
  GentecAnimatedSection
} from '@/src/components/AnimatedSection'
import React from 'react'
import { CompanyPageProps } from './types'
import { QRCodeSVG } from 'qrcode.react'
import { InactivityRedirectHandler } from '../InactivityRedirectHandler'

export function GentecCompany({
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
      <div className='bg-gentec-background text-gentec-text-primary'>
        {/* Hero Section - Slide 1 */}
        <AnimatedHero className='relative min-h-[600px] overflow-hidden px-4 py-20'>
          <div className='absolute inset-0 bg-gentec-background'></div>
          <div className='absolute right-0 top-0 h-full w-1/3 bg-gentec-red'></div>
          <div
            className='bg-fill absolute inset-0 bg-no-repeat'
            style={{
              backgroundImage: 'url(/images/gentec/hero-background.png)',
              backgroundPosition: '80% 80%'
            }}
          >
            {/* Dark overlay for better text readability */}
            {/* Overlay content: Right top = slogan, Left = image3 */}
            <div className='relative z-10 flex h-full w-full items-start justify-between p-16'>
              {/* Left: image3 */}
              <div className='flex-shrink-0'>
                <img
                  src='/images/gentec/image3.png'
                  alt='Gentec CHP unit'
                  className='h-40 w-40 object-contain '
                  style={{ minWidth: 100 }}
                />
              </div>
              {/* Right: slogan */}
              <div className='ml-auto text-right uppercase'>
                <span className='block text-5xl font-bold uppercase tracking-wide text-white drop-shadow-lg'>
                  {t('companies.gentec.hero.title')}
                </span>
                <span className='block text-4xl text-white drop-shadow-xl'>
                  We change <br /> power to <br /> energy
                </span>
              </div>
            </div>
          </div>
        </AnimatedHero>

        <AnimatedSection>
          <div className='relative mx-auto grid grid-cols-1 items-center gap-10  md:grid-cols-2 max-w-6xl'>
            {/* LEVÝ sloupec s obrázky */}
            <div className='flex h-full w-full flex-col items-center justify-center gap-8 bg-gentec-background'>
              {/* 3. row */}
              <div className='flex w-full items-center justify-center'>
                <img
                  src='/images/gentec/akurat-group-logo-nobg.png'
                  alt='Gentec image row 3'
                  className='object-contain'
                />
              </div>
              {/* 1. row */}
              <div className='flex w-full items-center justify-center'>
                <img
                  src='/images/gentec/partner2.png'
                  alt='Gentec image row 1'
                  className='h-full w-full object-contain'
                />
              </div>
              {/* 2. row */}
              <div className='flex w-full items-center justify-center'>
                <img
                  src='/images/gentec/partner1.png'
                  alt='Gentec image row 2'
                  className='object-contain'
                />
              </div>
              {/* 4. row - dva obrázky vedle sebe */}
              <div className='flex w-full flex-row items-center justify-center gap-8'>
                <img
                  src='/images/gentec/image9.png'
                  alt='Gentec image row 4a'
                  className='w-1/3 object-contain'
                />
                <img
                  src='/images/multicont.svg'
                  alt='Gentec image row 4b'
                  className='w-1/3 object-contain'
                />
              </div>
            </div>
            {/* PRAVÝ sloupec s textem */}
            <div
              className='flex h-full flex-col items-center justify-center p-8 text-center md:items-start md:text-left'
              style={{
                backgroundImage: "url('/images/gentec/powerlines.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <h1 className='mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-6xl'>
                {t('companies.gentec.groupFormation.title')}
              </h1>
              <h2 className='mb-4 text-3xl font-semibold text-white md:text-5xl'>
                {t('companies.gentec.groupFormation.subtitle')}
              </h2>
              <p className='mx-auto max-w-2xl text-lg text-white md:mx-0 md:text-xl'>
                {t('companies.gentec.groupFormation.description')}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Company Introduction - Slide 2 */}
        <AnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 pt-32'
        >
          <div className='relative z-10 mx-auto max-w-6xl'>
            <header className='mb-10'>
              <h2 className='mb-2 text-4xl font-bold text-gentec-text-primary'>
                {t('companies.gentec.companyIntroduction.title')}
              </h2>
              <div className='h-1 w-24 bg-gentec-red'></div>
            </header>
            <div className='grid grid-cols-2 items-start gap-10 overflow-visible'>
              <div>
                <h3 className='mb-4 text-2xl font-semibold text-gentec-red'>
                  {t('companies.gentec.companyIntroduction.subtitle')}
                </h3>
                <p className='text-xl leading-relaxed text-gentec-text-primary'>
                  {t('companies.gentec.companyIntroduction.description')}
                </p>
              </div>
              {/* Na mapu dáváme overflow-visible wrapper aby se neořízla */}
              <div className='relative' style={{ overflow: 'visible' }}>
                <img
                  src='/images/gentec/world-map.png'
                  alt='GENTEC global presence map'
                  className='z-10 rounded-2xl  object-cover'
                  style={{
                    height: '500px',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    transform: 'translateY(-120px) translateX(-10%)'
                  }}
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className='flex items-center justify-center'>
            <img
              src='/images/gentec/image-divider.png'
              alt='Gentec company headquarters'
              className=' h-auto max-w-full'
              loading='lazy'
            />
          </div>
        </AnimatedSection>

        {/* Major Customers & Partners - Slide 3 */}
        <AnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 py-20'
        >
          <div className='relative z-10 mx-auto h-full w-full max-w-6xl py-10'>
            <header className='mb-10'>
              <h2 className='mb-2 text-3xl font-bold text-gentec-text-primary'>
                {t('companies.gentec.customersPartners.title')}
              </h2>
              <div className='h-1 w-24 bg-gentec-red'></div>
              <p className='text-lg text-gentec-text-primary'>
                {t('companies.gentec.customersPartners.subtitle')}
              </p>
            </header>
            <div className='grid h-full w-full grid-cols-2 gap-12'>
              <ul className='list-inside list-disc space-y-2 text-gentec-text-primary'>
                <li>{t('companies.gentec.customersPartners.points.point1')}</li>
                <li>{t('companies.gentec.customersPartners.points.point2')}</li>
                <li>{t('companies.gentec.customersPartners.points.point3')}</li>
              </ul>
              <div>
                <ul className='list-inside list-disc space-y-2 text-gentec-text-primary'>
                  <li>
                    {t('companies.gentec.customersPartners.points.point4')}
                  </li>
                  <li>
                    {t('companies.gentec.customersPartners.points.point5')}
                  </li>
                </ul>
              </div>
            </div>
            <div className='mt-10 grid w-full grid-cols-2 items-center justify-items-center gap-8 rounded-xl py-6 sm:grid-cols-3 md:grid-cols-5'>
              <img
                src='/images/gentec/veolia-logo.png'
                alt='Veolia logo'
                className='h-28 w-auto object-contain'
                loading='lazy'
              />
              <img
                src='/images/gentec/innogy-logo-1.png'
                alt='Innogy logo'
                className='h-28 w-auto object-contain'
                loading='lazy'
              />
              <img
                src='/images/gentec/man-rollo-logo.png'
                alt='Man Rollo logo'
                className='h-28 w-auto object-contain'
                loading='lazy'
              />
              <img
                src='/images/gentec/mtu-logo.png'
                alt='MTU logo'
                className='h-28 w-auto object-contain'
                loading='lazy'
              />
              <img
                src='/images/gentec/rhk-logo.png'
                alt='RHK logo'
                className='h-28 w-auto object-contain'
                loading='lazy'
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Product Range - Slide 4 */}
        <GentecAnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 pt-20'
        >
          <div className='absolute inset-0 bg-gentec-background'></div>
          <div className='absolute right-0 top-0 h-full w-1/3 bg-gentec-red'></div>
          <div className='relative z-10 mx-auto max-w-6xl'>
            <header className='mb-10'>
              <h2 className='mb-2 text-3xl font-bold text-gentec-text-primary'>
                {t('companies.gentec.productRange.title')}
              </h2>
              <div className='h-1 w-24 bg-gentec-red'></div>
              <p className='text-lg text-gentec-text-primary'>
                {t('companies.gentec.productRange.range')}
              </p>
            </header>
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2'>
              <div>
                <p className='mb-4 text-lg text-gentec-text-primary'>
                  {t('companies.gentec.productRange.description')}
                </p>
                <ul className='list-inside list-disc space-y-2 text-gentec-text-primary'>
                  <li>{t('companies.gentec.productRange.points.point1')}</li>
                  <li>{t('companies.gentec.productRange.points.point2')}</li>
                  <li>{t('companies.gentec.productRange.points.point3')}</li>
                  <li>{t('companies.gentec.productRange.points.point4')}</li>
                </ul>
              </div>
              <img
                src='/images/gentec/GENTEC CHP - kogenerační jednotka (1).png'
                alt='Product lineup of CHP units'
                className='rounded-xl object-contain'
                style={{
                  height: '700px',
                  maxWidth: 'none',
                  maxHeight: 'none',
                  transform: 'translateY(-120px) translateX(-25%)'
                }}
                loading='lazy'
              />
            </div>
          </div>
        </GentecAnimatedSection>

        <GentecAnimatedSection>
          <div className='flex items-center justify-center'>
            <img
              src='/images/gentec/big-motor.png'
              alt='Big Motor'
              className='z-10 h-auto max-w-full object-contain'
              style={{ maxHeight: '500px' }}
              loading='lazy'
            />
          </div>
        </GentecAnimatedSection>

        {/* Strengths - Slide 5 */}
        <GentecAnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 py-20'
        >
          <div className='absolute inset-0 bg-gentec-background'></div>
          <div className='absolute right-0 top-0 h-full w-1/3 bg-gentec-red'></div>
          <div className='relative z-10 mx-auto max-w-6xl'>
            <header className='mb-10 text-left'>
              <h2 className='mb-2 text-3xl font-bold text-gentec-text-primary'>
                {t('companies.gentec.strengths.title')}
              </h2>
              <div className='h-1 w-24 bg-gentec-red'></div>
              <p className='text-lg text-gentec-text-primary'>
                {t('companies.gentec.strengths.subtitle')}
              </p>
            </header>
            <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
              {[
                {
                  key: 'serviceSupport',
                  image: '/images/gentec/service-support.svg'
                },
                {
                  key: 'partnership',
                  image: '/images/gentec/partnership.png'
                },
                {
                  key: 'productFlexibility',
                  image: '/images/gentec/Product-flex.png'
                },
                {
                  key: 'proCustomerApproach',
                  image: '/images/gentec/customer-approach.png'
                },
                {
                  key: 'focusOnQuality',
                  image: '/images/gentec/quality.svg'
                },
                {
                  key: 'serviceNetwork',
                  image: '/images/gentec/service-network.png'
                }
              ].map((item, i) => {
                const title = t(
                  `companies.gentec.strengths.items.${item.key}.title`
                )
                const description = t(
                  `companies.gentec.strengths.items.${item.key}.description`
                )
                return (
                  <AnimatedCard
                    key={i}
                    delay={i * 100}
                    className='bg-white p-6 text-center shadow-sm'
                  >
                    {item.image && (
                      <div className='mb-4 flex justify-center'>
                        <img
                          src={item.image}
                          alt={title + ' icon'}
                          className='h-12 w-12 object-contain'
                        />
                      </div>
                    )}
                    <h3 className='mb-3 text-xl font-semibold text-gentec-red'>
                      {title}
                    </h3>
                    <p className='text-sm text-gentec-text-primary'>
                      {description}
                    </p>
                  </AnimatedCard>
                )
              })}
            </div>
          </div>
        </GentecAnimatedSection>

        {/* Research and Development - Slide 6 */}
        <AnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 py-20'
        >
          <div className='relative z-10 mx-auto max-w-6xl'>
            <header className='mb-10 text-left'>
              <h2 className='mb-2 text-left text-3xl font-bold text-gentec-text-primary'>
                {t('companies.gentec.researchDevelopment.title')}
              </h2>
              <div className='h-1 w-24 bg-gentec-red'></div>
              <p className='text-lg text-gentec-text-primary'>
                {t('companies.gentec.researchDevelopment.subtitle')}
              </p>
            </header>
            <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
              <AnimatedCard delay={100} className='text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='relative flex h-64 w-64 items-center justify-center bg-gentec-red'>
                    <span className='relative select-none text-[7rem] font-bold text-white'>
                      CO
                      <sub className='relative bottom-[-0.3em] text-[4rem]'>
                        2
                      </sub>
                    </span>
                    {/* Diagonal line over CO2 */}
                    <div
                      className='absolute left-1/2 top-1/2 h-1 w-[15rem] bg-white'
                      style={{
                        transform: 'translate(-50%, -50%) rotate(-45deg)',
                        zIndex: 10
                      }}
                    />
                  </div>
                </div>
                <h3 className='mb-3 text-xl font-semibold text-gentec-red'>
                  {t(
                    'companies.gentec.researchDevelopment.items.lowEmission.title'
                  )}
                </h3>
                <p className='text-gentec-text-primary'>
                  {t(
                    'companies.gentec.researchDevelopment.items.lowEmission.description'
                  )}
                </p>
              </AnimatedCard>
              <AnimatedCard delay={200} className='text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='flex h-64 w-64 items-center justify-center bg-gentec-red'>
                    <img
                      src='/images/gentec/ai.png'
                      alt='Artificial Intelligence icon'
                      className='h-48 w-48 object-fill'
                    />
                  </div>
                </div>
                <h3 className='mb-3 text-xl font-semibold text-gentec-red'>
                  {t(
                    'companies.gentec.researchDevelopment.items.artificialIntelligence.title'
                  )}
                </h3>
                <p className='text-gentec-text-primary'>
                  {t(
                    'companies.gentec.researchDevelopment.items.artificialIntelligence.description'
                  )}
                </p>
              </AnimatedCard>
              <AnimatedCard delay={300} className='text-center'>
                <div className='mb-4 flex justify-center'>
                  <div className='flex h-64 w-64 items-center justify-center bg-gentec-red'>
                    <span className='select-none text-[7rem] font-bold text-white'>
                      H
                      <sub className='relative bottom-[-0.3em] text-[4rem]'>
                        2
                      </sub>
                    </span>
                  </div>
                </div>
                <h3 className='mb-3 text-xl font-semibold text-gentec-red'>
                  {t(
                    'companies.gentec.researchDevelopment.items.hydrogenReady.title'
                  )}
                </h3>
                <p className='text-gentec-text-primary'>
                  {t(
                    'companies.gentec.researchDevelopment.items.hydrogenReady.description'
                  )}
                </p>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* References - Slide 7 */}
        <GentecAnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 py-20'
        >
          <div className='absolute inset-0 bg-gentec-background'></div>
          <div className='absolute right-0 top-0 h-full w-1/3 bg-gentec-red'></div>
          <div className='relative z-10 mx-auto max-w-6xl'>
            {/* Reference white banner */}
            <header className='mb-10 text-left'>
              <h2 className='mb-2 text-left text-3xl font-bold text-gentec-text-primary'>
                {t('companies.gentec.references.title')}
              </h2>
              <div className='h-1 w-24 bg-gentec-red'></div>
              <p className='text-lg text-gentec-text-primary'>
                {t('companies.gentec.references.subtitle')}
              </p>
            </header>

            {/* Grid with 2 columns - left full height, right 2 rows */}
            <AnimatedCard
              delay={100}
              className='bg-transparent p-0 shadow-none'
            >
              <div className='flex flex-col items-center justify-center gap-8'>
                {[
                  {
                    key: 'uaProject',
                    imags: [
                      '/images/gentec/references/ua-project/Picture1.jpg',
                      '/images/gentec/references/ua-project/Picture2.jpg',
                      '/images/gentec/references/ua-project/Picture3.jpg'
                    ]
                  },
                  {
                    key: 'amperGeneration',
                    imags: [
                      '/images/gentec/references/amp-gen/Picture1.jpg',
                      '/images/gentec/references/amp-gen/Picture2.jpg',
                      '/images/gentec/references/amp-gen/Picture3.jpg'
                    ]
                  },
                  {
                    key: 'brewdog',
                    imags: [
                      '/images/gentec/references/brewdog/Picture1.jpg',
                      '/images/gentec/references/brewdog/Picture2.jpg',
                      '/images/gentec/references/brewdog/Picture3.jpg'
                    ]
                  },
                  {
                    key: 'envirogy',
                    imags: [
                      '/images/gentec/references/envirogy/Picture1.jpg',
                      '/images/gentec/references/envirogy/Picture2.jpg'
                    ]
                  },
                  {
                    key: 'innogy',
                    imags: ['/images/gentec/references/innogy/Picture1.jpg']
                  },
                  {
                    key: 'pittsburg',
                    imags: ['/images/gentec/references/pitsburg/Picture1.jpg']
                  },
                  {
                    key: 'mutenice',
                    imags: [
                      '/images/gentec/references/mutenice/Picture3.jpg',
                      '/images/gentec/references/mutenice/Picture1.jpg',
                      '/images/gentec/references/mutenice/Picture2.jpg'
                    ]
                  },
                  {
                    key: 'olbena',
                    imags: [
                      '/images/gentec/references/olbena/Picture1.jpg',
                      '/images/gentec/references/olbena/Picture2.jpg',
                      '/images/gentec/references/olbena/Picture3.jpg'
                    ]
                  }
                ].map((ref, i) => {
                  const title = t(
                    `companies.gentec.references.items.${ref.key}.title`
                  )
                  const desc = t(
                    `companies.gentec.references.items.${ref.key}.description`
                  )
                  // Even indices (0, 2, 4...) go to left column (full height, row-span-2)
                  // Odd indices (1, 3, 5...) go to right column (half height each)
                  const isLeftColumn = i % 2 === 0

                  if (isLeftColumn) {
                    // Left column - full height card (spans 2 rows)
                    return (
                      <div
                        key={i}
                        className='bg-white p-6 shadow-md md:row-span-2 '
                      >
                        <div className='pb-8'>
                          <h3 className='mb-2 text-xl font-semibold text-gentec-red'>
                            {title}
                          </h3>
                          <p className='text-sm text-gentec-text-primary'>
                            {desc}
                          </p>
                        </div>
                        {ref.imags && ref.imags.length > 0 && (
                          <div className='mb-4'>
                            {ref.imags.length === 1 ? (
                              // 1 image: fullscreen
                              <img
                                src={ref.imags[0]}
                                alt={title}
                                className='w-full rounded-lg object-cover'
                              />
                            ) : ref.imags.length === 2 ? (
                              // 2 images: side by side 50% each
                              <div className='grid grid-cols-2 gap-4'>
                                {ref.imags.map((img, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={img}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                ))}
                              </div>
                            ) : ref.imags.length === 3 ? (
                              // 3 images: large left, 2 small right stacked vertically
                              <div className='grid grid-cols-2 gap-4'>
                                <div className='row-span-2'>
                                  <img
                                    src={ref.imags[0]}
                                    alt={title}
                                    className='h-full w-full rounded-lg object-cover'
                                  />
                                </div>
                                <div>
                                  <img
                                    src={ref.imags[1]}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                </div>
                                <div>
                                  <img
                                    src={ref.imags[2]}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                </div>
                              </div>
                            ) : (
                              // More than 3 images: fallback to grid
                              <div className='grid grid-cols-3 gap-4'>
                                {ref.imags.map((img, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={img}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  } else {
                    // Right column - half height card (1 row each)
                    return (
                      <div key={i} className='bg-white p-6 shadow-md'>
                        <div className='pb-8'>
                          <h3 className='mb-2 text-xl font-semibold text-gentec-red'>
                            {title}
                          </h3>
                          <p className='text-sm text-gentec-text-primary'>
                            {desc}
                          </p>
                        </div>
                        {ref.imags && ref.imags.length > 0 && (
                          <div className='mb-4'>
                            {ref.imags.length === 1 ? (
                              // 1 image: fullscreen
                              <img
                                src={ref.imags[0]}
                                alt={title}
                                className='w-full rounded-lg object-cover'
                              />
                            ) : ref.imags.length === 2 ? (
                              // 2 images: side by side 50% each
                              <div className='grid grid-cols-2 gap-4'>
                                {ref.imags.map((img, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={img}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                ))}
                              </div>
                            ) : ref.imags.length === 3 ? (
                              // 3 images: large left, 2 small right stacked vertically
                              <div className='grid grid-cols-2 gap-4'>
                                <div className='row-span-2'>
                                  <img
                                    src={ref.imags[0]}
                                    alt={title}
                                    className='h-full w-full rounded-lg object-cover'
                                  />
                                </div>
                                <div>
                                  <img
                                    src={ref.imags[1]}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                </div>
                                <div>
                                  <img
                                    src={ref.imags[2]}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                </div>
                              </div>
                            ) : (
                              // More than 3 images: fallback to grid
                              <div className='grid grid-cols-3 gap-4'>
                                {ref.imags.map((img, imgIdx) => (
                                  <img
                                    key={imgIdx}
                                    src={img}
                                    alt={title}
                                    className='w-full rounded-lg object-cover'
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  }
                })}
              </div>
            </AnimatedCard>
          </div>
        </GentecAnimatedSection>

        {/* Contact Section */}
        <GentecAnimatedSection
          delay={100}
          className='relative overflow-hidden px-4 py-20'
        >
          <div className='absolute inset-0 bg-gentec-dark-gray'></div>
          <div className='relative z-10 mx-auto max-w-6xl'>
            <div className='grid gap-8 text-center md:grid-cols-3 md:place-items-center'>
              {/* Column 1: Contact Info + QR Code */}
              <div className='flex flex-col items-center space-y-6 text-white'>
                <div>
                  <h3 className='mb-4 text-xl font-bold'>
                    {t('companies.gentec.contact.title')}
                  </h3>
                  <div className='space-y-3 text-lg'>
                    <div className='flex flex-col'>
                      <span className='font-semibold'>
                        {t('companies.gentec.contact.emailLabel')}
                      </span>
                      <span>{t('companies.gentec.contact.email')}</span>
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-semibold'>
                        {t('companies.gentec.contact.websiteLabel')}
                      </span>
                      <span>{t('companies.gentec.contact.website')}</span>
                    </div>
                  </div>
                </div>
                {/* QR Code */}
                <div className='flex justify-center'>
                  <div className='rounded-lg bg-white p-4 shadow-md'>
                    <QRCodeSVG
                      value={t('companies.gentec.contact.qrUrl')}
                      size={160}
                      bgColor='#ffffff'
                      fgColor='#000000'
                      level='M'
                    />
                  </div>
                </div>
              </div>

              {/* Column 2: Logo with different background */}
              <div className='flex h-full w-full flex-col items-center justify-center rounded-lg bg-gentec-background px-4 py-10'>
                <img
                  src='/images/gentec_logo.svg'
                  alt='GENTEC logo'
                  className='h-full w-full object-contain'
                />
              </div>

              {/* Column 3: Additional Info */}
              <div className='flex flex-col items-center space-y-6 text-white'>
                <div>
                  <h3 className='mb-4 text-2xl font-bold'>
                    {t('companies.gentec.contact.partnerTitle')}
                  </h3>
                  <p className='text-lg leading-relaxed text-gray-200'>
                    {t('companies.gentec.contact.partnerDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </GentecAnimatedSection>
      </div>
    </SimplePageWrapper>
  )
}
