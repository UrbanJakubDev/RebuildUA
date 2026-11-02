'use client'

import React from 'react'
import { CompanyPageProps } from './types'
import {
  CompanyShell,
  CompanyTheme,
  Container,
  ContactRow,
  Eyebrow,
  Heading,
  PillAnchor,
  PillLink,
  Section,
  SectionNav,
  SectionNavItem,
  num
} from '../company-layout'

interface RepowerContent {
  nav: SectionNavItem[]
  hero: Record<
    'eyebrow' | 'title' | 'highlight' | 'text' | 'cta' | 'ctaSecondary',
    string
  >
  facts: {
    items: { title: string; value: string; unit: string; label: string }[]
  }
  about: Record<'title' | 'text', string>
  locations: Record<
    'eyebrow' | 'title' | 'capacity' | 'unit' | 'text1' | 'text2',
    string
  >
  pilot: Record<
    | 'eyebrow'
    | 'title'
    | 'goalTitle'
    | 'goalText'
    | 'techTitle'
    | 'techText'
    | 'initial'
    | 'unit'
    | 'initialLabel'
    | 'expand'
    | 'expandLabel'
    | 'auditEyebrow'
    | 'auditTitle'
    | 'auditText1'
    | 'auditText2',
    string
  >
  economics: Record<
    | 'eyebrow'
    | 'title'
    | 'financingTitle'
    | 'equity'
    | 'loan'
    | 'grants'
    | 'conclusionTitle'
    | 'conclusion',
    string
  > & { returns: { value: string; title: string; sub: string }[] }
  evaluation: Record<'eyebrow' | 'title' | 'subtitle' | 'text', string>
  jv: { eyebrow: string; title: string; items: string[] }
  timeline: {
    eyebrow: string
    title: string
    items: { title: string; dur: string; text: string }[]
  }
  partners: Record<'eyebrow' | 'title' | 'text', string>
  contact: Record<
    'eyebrow' | 'title' | 'text' | 'label' | 'email' | 'web' | 'cta',
    string
  >
}

const theme: CompanyTheme = {
  text: '#2c2a29',
  accent: '#b90426',
  border: '#ebebeb',
  tabBg: '#f5f5f5'
}

const img = (file: string) => `/images/repower/${file}`

const partnerLogos = [
  { src: 'image3.png', alt: 'GENTEC', maxHeight: 64 },
  { src: 'image21.png', alt: 'MTU', maxHeight: 48 },
  { src: 'image24.png', alt: 'MWM', maxHeight: 60 },
  { src: 'image23.png', alt: 'MND', maxHeight: 72 },
  { src: 'image20.png', alt: 'Národní rozvojová banka', maxHeight: 52 },
  {
    src: 'image22.jpeg',
    alt: 'Ukraine Facility',
    maxHeight: 72,
    noBlend: true
  },
  { src: 'image18.png', alt: 'Virtuel', maxHeight: 36 },
  { src: 'image19.png', alt: 'Aggregaat', maxHeight: 32 },
  { src: 'egap.png', alt: 'EGAP', maxHeight: 52 }
]

const contact = {
  email: 'gentec@gentec.cz',
  web: 'www.gentec.cz/en',
  webHref: 'https://www.gentec.cz/en'
}

const bodyText = 'text-base leading-[1.65] text-[#2c2a29]'

export function RepowerCompany({ t }: CompanyPageProps): JSX.Element {
  const c = t.raw('companies.repower') as RepowerContent

  return (
    <CompanyShell slug='repower' theme={theme} topSectionId='about'>
      {/* Hero */}
      <section className='relative h-[640px] overflow-hidden bg-[#2c2a29]'>
        <img
          src={img('hero-aerial.jpg')}
          alt='GENTEC CHP site in Ukraine'
          className='absolute inset-0 block h-full w-full object-cover object-[55%_60%]'
        />
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(to right, rgba(20,19,19,0.97) 0%, rgba(20,19,19,0.9) 38%, rgba(20,19,19,0.4) 60%, rgba(20,19,19,0) 78%)'
          }}
        />
        <img
          src='/images/shared/logo-red-white.png'
          alt='GENTEC'
          className='absolute right-10 top-10 z-[2] h-[72px]'
        />
        <Container className='relative flex h-full flex-col justify-end gap-7 pb-16 pt-12 text-white'>
          <Eyebrow color='#fff' className='text-sm'>
            {c.hero.eyebrow}
          </Eyebrow>
          <Heading
            as='h1'
            className='max-w-[760px] text-[88px] leading-[0.98] tracking-[-0.03em] text-white'
          >
            {c.hero.title}
            <br />
            <span className='text-[#b90426]'>{c.hero.highlight}</span>
          </Heading>
          <p className='max-w-[560px] text-lg leading-[1.6]'>{c.hero.text}</p>
          <div className='flex items-center gap-3'>
            <PillAnchor
              to='contact'
              arrow
              className='bg-[#b90426] px-[30px] py-4 text-white hover:bg-[#960320]'
            >
              {c.hero.cta}
            </PillAnchor>
            <PillAnchor
              to='pilot'
              className='border-2 border-white/70 px-7 py-3.5 text-white hover:bg-white hover:text-[#2c2a29]'
            >
              {c.hero.ctaSecondary}
            </PillAnchor>
          </div>
        </Container>
      </section>

      {/* Key facts */}
      <section className='bg-[#2c2a29] text-white'>
        <Container>
          <div className='grid grid-cols-4 border-l border-white/[0.12] pl-7'>
            {c.facts.items.map((fact, i) => (
              <div
                key={i}
                className='mr-7 flex flex-col gap-2 border-r border-white/[0.12] py-8 pr-7'
              >
                <div className='text-[13px] font-bold uppercase tracking-[0.12em]'>
                  {fact.title}
                </div>
                <div className='whitespace-nowrap text-[42px] font-black leading-[1.05] tracking-[-0.02em]'>
                  {fact.value}
                  <span className='ml-1.5 text-2xl text-[#b90426]'>
                    {fact.unit}
                  </span>
                </div>
                <div className='text-[13px] leading-[1.5]'>{fact.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionNav items={c.nav} theme={theme} />

      {/* About */}
      <Section id='about' className='bg-white'>
        <Container className='grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-[72px] pb-24 pt-28'>
          <div className='flex flex-col gap-7'>
            <img
              src={img('image7.png')}
              alt='RePOWER Ukraine'
              className='h-14 self-start'
            />
            <Heading className='text-[40px] leading-[1.12] tracking-[-0.02em] [text-wrap:pretty]'>
              {c.about.title}
            </Heading>
            <p className='max-w-[600px] text-lg leading-[1.65] text-[#2c2a29]'>
              {c.about.text}
            </p>
          </div>
          <img
            src={img('image10.png')}
            alt='GENTEC container CHP unit'
            className='block aspect-[4/5] w-full object-cover'
          />
        </Container>
      </Section>

      {/* Locations */}
      <Section id='locations' className='bg-[#f5f5f5]'>
        <Container className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-center gap-16 py-24'>
          <div className='flex flex-col gap-5'>
            <Eyebrow color='#b90426'>{c.locations.eyebrow}</Eyebrow>
            <Heading className='text-[56px] leading-[1.02]'>
              {c.locations.title}
            </Heading>
            <div className='text-[28px] font-black tracking-[-0.01em]'>
              {c.locations.capacity}{' '}
              <span className='text-[#b90426]'>{c.locations.unit}</span>
            </div>
            <p className='text-[17px] leading-[1.65] text-[#2c2a29]'>
              {c.locations.text1}
            </p>
            <p className='text-[17px] leading-[1.65] text-[#2c2a29]'>
              {c.locations.text2}
            </p>
          </div>
          <img
            src={img('image13.jpg')}
            alt='Map of identified CHP locations in Ukraine'
            className='block w-full mix-blend-multiply'
          />
        </Container>
      </Section>

      {/* Pilot project */}
      <Section id='pilot' className='bg-white'>
        <Container className='flex flex-col gap-14 pb-24 pt-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#b90426'>{c.pilot.eyebrow}</Eyebrow>
            <Heading className='text-[64px] leading-none tracking-[-0.03em]'>
              {c.pilot.title}
            </Heading>
          </div>
          <div className='grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start gap-14'>
            <img
              src={img('image14.png')}
              alt='GENTEC CHP units on site'
              className='block aspect-[819/725] w-full object-cover'
            />
            <div className='flex flex-col gap-9'>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[22px] font-black'>{c.pilot.goalTitle}</h3>
                <p className={bodyText}>{c.pilot.goalText}</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h3 className='text-[22px] font-black'>{c.pilot.techTitle}</h3>
                <p className={bodyText}>{c.pilot.techText}</p>
              </div>
              <div className='grid grid-cols-2 border-t border-[#d1d1d1]'>
                {[
                  [c.pilot.initial, c.pilot.initialLabel],
                  [c.pilot.expand, c.pilot.expandLabel]
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className='flex flex-col gap-1 border-b border-[#d1d1d1] py-5'
                  >
                    <span className='text-[32px] font-black tracking-[-0.02em]'>
                      {value}{' '}
                      <span className='text-xl text-[#b90426]'>
                        {c.pilot.unit}
                      </span>
                    </span>
                    <span className='text-[13px] text-[#2c2a29]'>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-center gap-14 bg-[#f5f5f5]'>
            <img
              src={img('image15.png')}
              alt='Site visualisation'
              className='block aspect-[4/5] w-full object-cover'
            />
            <div className='flex flex-col gap-5 py-12 pr-14'>
              <Eyebrow color='#b90426'>{c.pilot.auditEyebrow}</Eyebrow>
              <Heading
                as='h3'
                className='text-4xl leading-[1.1] tracking-[-0.02em]'
              >
                {c.pilot.auditTitle}
              </Heading>
              <p className={bodyText}>{c.pilot.auditText1}</p>
              <p className={bodyText}>{c.pilot.auditText2}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Economics */}
      <Section id='economics' className='bg-[#2c2a29] text-white'>
        <Container className='flex flex-col gap-16 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#b90426'>{c.economics.eyebrow}</Eyebrow>
            <Heading className='text-5xl leading-[1.05] text-white'>
              {c.economics.title}
            </Heading>
          </div>
          <div className='grid grid-cols-4 gap-8'>
            {c.economics.returns.map((item, i) => (
              <div
                key={i}
                className='flex flex-col gap-2.5 border-t-[3px] border-[#b90426] pt-6'
              >
                <div className='text-[56px] font-black leading-none tracking-[-0.03em]'>
                  {item.value}
                </div>
                <div className='text-lg font-bold'>{item.title}</div>
                <div className='text-sm leading-[1.5] text-[#d1d1d1]'>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
          <div className='grid grid-cols-2 gap-16'>
            <div className='flex flex-col gap-6'>
              <h3 className='text-[22px] font-black'>
                {c.economics.financingTitle}
              </h3>
              <div className='flex h-14 text-xl font-black'>
                <div className='flex w-[30%] items-center bg-[#b90426] px-4'>
                  30%
                </div>
                <div className='flex flex-1 items-center bg-[#4c4d54] px-4'>
                  70%
                </div>
              </div>
              <div className='flex flex-col gap-2.5 text-base leading-[1.5]'>
                <div className='flex items-center gap-3'>
                  <span className='h-3 w-3 flex-none bg-[#b90426]' />
                  {c.economics.equity}
                </div>
                <div className='flex items-center gap-3'>
                  <span className='h-3 w-3 flex-none border border-white/40 bg-[#4c4d54]' />
                  {c.economics.loan}
                </div>
                <div className='flex items-center gap-3'>
                  <span className='h-3 w-3 flex-none border border-dashed border-white/60' />
                  {c.economics.grants}
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='text-[22px] font-black'>
                {c.economics.conclusionTitle}
              </h3>
              <p className='text-lg leading-[1.65]'>{c.economics.conclusion}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Evaluation */}
      <Section className='bg-white'>
        <Container className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-center gap-16 py-24'>
          <div className='flex flex-col gap-5'>
            <Eyebrow color='#b90426'>{c.evaluation.eyebrow}</Eyebrow>
            <Heading className='text-[40px] leading-[1.1] tracking-[-0.02em]'>
              {c.evaluation.title}
            </Heading>
            <div className='text-base font-bold'>{c.evaluation.subtitle}</div>
            <p className={bodyText}>{c.evaluation.text}</p>
          </div>
          <img
            src={img('image17.png')}
            alt='Return on equity chart'
            className='block w-full'
          />
        </Container>
      </Section>

      {/* Joint venture */}
      <Section id='jv' className='bg-[#f5f5f5]'>
        <Container className='grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-[72px] py-28'>
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#b90426'>{c.jv.eyebrow}</Eyebrow>
              <Heading>{c.jv.title}</Heading>
            </div>
            <div className='flex flex-col gap-7'>
              {c.jv.items.map((text, i) => (
                <div
                  key={i}
                  className='flex items-baseline gap-5 text-[17px] leading-[1.6] text-[#2c2a29]'
                >
                  <span className='w-10 flex-none text-[22px] font-black text-[#b90426]'>
                    {num(i)}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
          <img
            src={img('image16.jpeg')}
            alt='GENTEC container CHP unit in hall'
            className='block aspect-[4/5] w-full object-cover'
          />
        </Container>
      </Section>

      {/* Timeline */}
      <Section id='timeline' className='bg-white'>
        <Container className='flex flex-col gap-12 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#b90426'>{c.timeline.eyebrow}</Eyebrow>
            <Heading>{c.timeline.title}</Heading>
          </div>
          <div className='flex flex-col border-t border-[#d1d1d1]'>
            {c.timeline.items.map((phase, i) => (
              <div
                key={i}
                className='grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1.6fr)] items-baseline gap-8 border-b border-[#d1d1d1] py-8'
              >
                <span className='text-[40px] font-black leading-none text-[#b90426]'>
                  {num(i)}
                </span>
                <div className='flex flex-col gap-2.5'>
                  <h3 className='text-[22px] font-black leading-[1.2]'>
                    {phase.title}
                  </h3>
                  <span className='self-start bg-[#2c2a29] px-2.5 py-[5px] text-xs font-bold uppercase tracking-[0.08em] text-white'>
                    {phase.dur}
                  </span>
                </div>
                <p className={bodyText}>{phase.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partners */}
      <Section id='partners' className='bg-[#f5f5f5]'>
        <Container className='flex flex-col gap-12 py-24'>
          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-end gap-16'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#b90426'>{c.partners.eyebrow}</Eyebrow>
              <Heading className='text-[40px] leading-[1.1] tracking-[-0.02em]'>
                {c.partners.title}
              </Heading>
            </div>
            <p className='text-[17px] leading-[1.6] text-[#2c2a29]'>
              {c.partners.text}
            </p>
          </div>
          <div className='grid grid-cols-5 items-center gap-x-10 gap-y-6'>
            {partnerLogos.map(logo => (
              <div
                key={logo.alt}
                className='flex h-[110px] items-center justify-center'
              >
                <img
                  src={img(logo.src)}
                  alt={logo.alt}
                  className={`max-w-full ${logo.noBlend ? '' : 'mix-blend-multiply'}`}
                  style={{ maxHeight: logo.maxHeight }}
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id='contact' className='bg-[#b90426] text-white'>
        <Container className='grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-16 py-24'>
          <div className='flex flex-col gap-5'>
            <Eyebrow color='#fff'>{c.contact.eyebrow}</Eyebrow>
            <Heading className='text-[56px] leading-[1.02] tracking-[-0.03em] text-white'>
              {c.contact.title}
            </Heading>
            <p className='max-w-[520px] text-lg leading-[1.6]'>
              {c.contact.text}
            </p>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-between'>
              <Eyebrow color='#fff'>{c.contact.label}</Eyebrow>
              <img
                src='/images/shared/logo-white.png'
                alt='GENTEC'
                className='h-14'
              />
            </div>
            <div className='flex flex-col border-t border-white/40'>
              <ContactRow
                href={`mailto:${contact.email}`}
                label={c.contact.email}
                value={contact.email}
              />
              <ContactRow
                href={contact.webHref}
                label={c.contact.web}
                value={contact.web}
              />
            </div>
            <PillLink
              href={`mailto:${contact.email}`}
              className='bg-white text-[#b90426] hover:bg-[#2c2a29] hover:text-white'
            >
              {c.contact.cta}
            </PillLink>
          </div>
        </Container>
      </Section>
    </CompanyShell>
  )
}
