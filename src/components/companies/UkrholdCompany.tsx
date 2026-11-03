'use client'

import React from 'react'
import { CompanyPageProps } from './types'
import {
  CompanyShell,
  CompanyTheme,
  Container,
  Eyebrow,
  Heading,
  PillAnchor,
  PillLink,
  Section,
  SectionNav,
  SectionNavItem,
  num
} from '../company-layout'

interface UkrholdContent {
  nav: SectionNavItem[]
  hero: Record<
    | 'eyebrow'
    | 'title'
    | 'subtitle'
    | 'text'
    | 'cta'
    | 'ctaSecondary'
    | 'stages'
    | 'scope',
    string
  >
  facts: { items: { value: string; title: string; label: string }[] }
  about: Record<'eyebrow' | 'title' | 'text' | 'clientsTitle', string> & {
    clients: string[]
  }
  directions: {
    eyebrow: string
    title: string
    items: { title: string; text: string }[]
  }
  process: Record<'eyebrow' | 'title' | 'resultLabel' | 'result', string> & {
    items: { title: string; text: string }[]
  }
  solutions: Record<
    'eyebrow' | 'title' | 'taskLabel' | 'solutionLabel',
    string
  > & {
    items: { title: string; task: string; sol: string }[]
  }
  models: Record<'eyebrow' | 'title' | 'whyTitle', string> & {
    items: { title: string; text: string }[]
    why: string[]
  }
  contact: Record<
    'eyebrow' | 'title' | 'text' | 'name' | 'role' | 'cta',
    string
  >
}

const theme: CompanyTheme = {
  text: '#1b2147',
  accent: '#f2c230',
  border: '#e3e7f0'
}

const img = (n: number) => `/images/ukrhold/image${n}.png`

const directionImages = [6, 8, 9, 10, 11, 7]
const stepIcons = [12, 13, 14, 15, 16]
const solutionIcons = [17, 18, 19, 20]
const modelIcons = [21, 22, 23]

const whiteIcon = { filter: 'brightness(0) invert(1)' }

const contact = {
  phone: '+38 (066) 851-69-34',
  phoneHref: 'tel:+380668516934',
  email: 'info@ukrhold.com',
  web: 'ukrhold.com',
  webHref: 'https://ukrhold.com'
}

export function UkrholdCompany({ t }: CompanyPageProps): JSX.Element {
  const c = t.raw('companies.ukrhold') as UkrholdContent

  const contactRows = [
    { href: contact.phoneHref, icon: 25, value: contact.phone },
    { href: `mailto:${contact.email}`, icon: 26, value: contact.email },
    { href: contact.webHref, icon: 27, value: contact.web }
  ]

  return (
    <CompanyShell theme={theme}>
      {/* Hero */}
      <section className='relative min-h-[640px] overflow-hidden bg-[#1b2147] text-white'>
        <img
          src={img(6)}
          alt='Containerised CHP unit'
          className='absolute right-0 top-0 block h-full w-[62%] object-cover object-[60%_50%]'
        />
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(to right, #1b2147 0%, #1b2147 40%, rgba(27,33,71,0.6) 56%, rgba(27,33,71,0) 72%)'
          }}
        />
        <img
          src={img(5)}
          alt='UKRHOLD Energy Group'
          className='absolute right-10 top-10 z-[2] h-11'
        />
        <Container className='relative flex min-h-[640px] flex-col justify-end gap-7 pb-14 pt-[120px]'>
          <Eyebrow color='#f2c230' className='text-sm'>
            {c.hero.eyebrow}
          </Eyebrow>
          <Heading
            as='h1'
            className='max-w-[720px] text-[80px] leading-none tracking-[-0.03em] text-white'
          >
            {c.hero.title}
          </Heading>
          <div className='max-w-[620px] text-[26px] font-medium text-[#cfe0ff]'>
            {c.hero.subtitle}
          </div>
          <p className='max-w-[560px] text-lg leading-[1.6]'>{c.hero.text}</p>
          <div className='flex items-center gap-3'>
            <PillAnchor
              to='contact'
              arrow
              className='bg-[#f2c230] px-[30px] py-4 text-[#1b2147] hover:bg-white'
            >
              {c.hero.cta}
            </PillAnchor>
            <PillAnchor
              to='directions'
              className='border-2 border-white/70 px-7 py-3.5 text-white hover:bg-white hover:text-[#1b2147]'
            >
              {c.hero.ctaSecondary}
            </PillAnchor>
          </div>
          <div className='mt-6 flex flex-col gap-2 border-t border-[rgba(207,224,255,0.25)] pt-5'>
            <div className='text-[13px] font-bold tracking-[0.14em]'>
              {c.hero.stages}
            </div>
            <div className='text-sm font-medium text-[#cfe0ff]'>
              {c.hero.scope}
            </div>
          </div>
        </Container>
      </section>

      {/* Key facts */}
      <section className='bg-[#f2f5fb]'>
        <Container className='grid grid-cols-4'>
          {c.facts.items.map((fact, i) => (
            <div key={i} className='flex flex-col gap-1.5 py-9 pr-7'>
              <div className='whitespace-nowrap text-[44px] font-black leading-none tracking-[-0.02em] text-[#1b2147]'>
                {fact.value}
              </div>
              <div className='text-base font-bold text-[#2f6fd0]'>
                {fact.title}
              </div>
              <div className='text-[13px] leading-[1.5] text-[#4a5578]'>
                {fact.label}
              </div>
            </div>
          ))}
        </Container>
      </section>

      <SectionNav items={c.nav} theme={theme} />

      {/* About */}
      <Section id='about' className='bg-white'>
        <Container className='grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start gap-20 pb-24 pt-28'>
          <div className='flex flex-col gap-6'>
            <Eyebrow color='#2f6fd0'>{c.about.eyebrow}</Eyebrow>
            <Heading className='text-[52px] leading-[1.06] [text-wrap:balance]'>
              {c.about.title}
            </Heading>
            <p className='text-lg leading-[1.65] text-[#4a5578]'>
              {c.about.text}
            </p>
          </div>
          <div className='flex flex-col gap-2 pt-9'>
            <h3 className='mb-3 text-xl font-black'>{c.about.clientsTitle}</h3>
            {c.about.clients.map((client, i) => (
              <div
                key={i}
                className='flex items-baseline gap-4 border-b border-[#e3e7f0] py-3.5 text-[17px] font-medium leading-[1.4]'
              >
                <span className='h-2.5 w-2.5 flex-none bg-[#f2c230]' />
                {client}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Directions */}
      <Section id='directions' className='bg-[#f2f5fb]'>
        <Container className='flex flex-col gap-12 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#2f6fd0'>{c.directions.eyebrow}</Eyebrow>
            <Heading>{c.directions.title}</Heading>
          </div>
          <div className='grid grid-cols-3 gap-6'>
            {c.directions.items.map((direction, i) => (
              <div key={i} className='flex flex-col bg-white'>
                <img
                  src={img(directionImages[i])}
                  alt={direction.title}
                  className='block aspect-[12/7] w-full bg-[#1b2147] object-cover'
                />
                <div className='flex flex-col gap-2.5 px-6 pb-7 pt-6'>
                  <h3 className='text-[21px] font-black leading-[1.2]'>
                    {direction.title}
                  </h3>
                  <p className='text-[15px] leading-[1.6] text-[#4a5578]'>
                    {direction.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section id='process' className='bg-[#1b2147] text-white'>
        <Container className='flex flex-col gap-14 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#f2c230'>{c.process.eyebrow}</Eyebrow>
            <Heading className='text-5xl leading-[1.05] text-white'>
              {c.process.title}
            </Heading>
          </div>
          <div className='grid grid-cols-5 gap-7'>
            {c.process.items.map((step, i) => (
              <div key={i} className='flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex h-14 w-14 items-center justify-center bg-[#2f6fd0]'>
                    <img
                      src={img(stepIcons[i])}
                      alt=''
                      className='h-7 w-7'
                      style={whiteIcon}
                    />
                  </div>
                  <span className='text-[28px] font-black text-[#f2c230]'>
                    {num(i)}
                  </span>
                </div>
                <h3 className='text-[19px] font-black leading-[1.25] text-white'>
                  {step.title}
                </h3>
                <p className='text-sm leading-[1.6] text-[#cfe0ff]'>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
          <div className='bg-[#f2c230] px-7 py-6 text-lg leading-[1.5] text-[#1b2147]'>
            <strong className='font-black'>{c.process.resultLabel}</strong>{' '}
            {c.process.result}
          </div>
        </Container>
      </Section>

      {/* Solutions */}
      <Section id='solutions' className='bg-white'>
        <Container className='flex flex-col gap-12 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#2f6fd0'>{c.solutions.eyebrow}</Eyebrow>
            <Heading>{c.solutions.title}</Heading>
          </div>
          <div className='grid grid-cols-4 gap-6'>
            {c.solutions.items.map((solution, i) => (
              <div key={i} className='flex flex-col gap-5 bg-[#f2f5fb] p-7'>
                <img src={img(solutionIcons[i])} alt='' className='h-11 w-11' />
                <h3 className='min-h-[50px] text-[21px] font-black leading-[1.2]'>
                  {solution.title}
                </h3>
                <div className='flex flex-col gap-1.5'>
                  <span className='text-[11px] font-bold tracking-[0.12em] text-[#4a5578]'>
                    {c.solutions.taskLabel}
                  </span>
                  <p className='text-[15px] leading-[1.5] text-[#4a5578]'>
                    {solution.task}
                  </p>
                </div>
                <div className='flex flex-col gap-1.5 border-t border-[#cfe0ff] pt-4'>
                  <span className='text-[11px] font-bold tracking-[0.12em] text-[#2f6fd0]'>
                    {c.solutions.solutionLabel}
                  </span>
                  <p className='text-[15px] font-bold leading-[1.5] text-[#1b2147]'>
                    {solution.sol}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cooperation models */}
      <Section id='models' className='bg-[#f2f5fb]'>
        <Container className='grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-start gap-16 py-28'>
          <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#2f6fd0'>{c.models.eyebrow}</Eyebrow>
              <Heading>{c.models.title}</Heading>
            </div>
            <div className='flex flex-col gap-4'>
              {c.models.items.map((model, i) => (
                <div key={i} className='flex items-start gap-6 bg-white p-6'>
                  <div className='flex h-14 w-14 flex-none items-center justify-center bg-[#1b2147]'>
                    <img
                      src={img(modelIcons[i])}
                      alt=''
                      className='h-7 w-7'
                      style={whiteIcon}
                    />
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <h3 className='text-[21px] font-black'>{model.title}</h3>
                    <p className='text-[15px] leading-[1.6] text-[#4a5578]'>
                      {model.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-[132px] flex flex-col gap-2 bg-[#1b2147] p-10 text-white'>
            <Eyebrow color='#f2c230' className='mb-3 text-xs'>
              {c.models.whyTitle}
            </Eyebrow>
            {c.models.why.map((reason, i) => (
              <div
                key={i}
                className='flex items-start gap-3.5 py-3 text-base leading-[1.45]'
              >
                <img
                  src={img(24)}
                  alt=''
                  className='mt-px h-[22px] w-[22px] flex-none'
                />
                {reason}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id='contact' className='bg-[#1b2147] text-white'>
        <Container className='grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-16 py-24'>
          <div className='flex flex-col gap-5'>
            <Eyebrow color='#f2c230'>{c.contact.eyebrow}</Eyebrow>
            <Heading className='text-[52px] leading-[1.04] tracking-[-0.03em] text-white'>
              {c.contact.title}
            </Heading>
            <p className='max-w-[520px] text-lg leading-[1.6] text-[#cfe0ff]'>
              {c.contact.text}
            </p>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-between gap-6'>
              <div className='flex flex-col gap-1'>
                <span className='text-[22px] font-black'>{c.contact.name}</span>
                <span className='text-sm text-[#cfe0ff]'>{c.contact.role}</span>
              </div>
              <img src={img(5)} alt='UKRHOLD Energy Group' className='h-8' />
            </div>
            <div className='flex flex-col border-t border-[rgba(207,224,255,0.3)]'>
              {contactRows.map(row => (
                <a
                  key={row.href}
                  href={row.href}
                  className='flex items-center gap-3.5 border-b border-[rgba(207,224,255,0.3)] py-4 text-white hover:text-white'
                >
                  <img
                    src={img(row.icon)}
                    alt=''
                    className='h-5 w-5'
                    style={whiteIcon}
                  />
                  <span className='text-lg font-bold'>{row.value}</span>
                </a>
              ))}
            </div>
            <PillLink
              href={`mailto:${contact.email}`}
              className='bg-[#f2c230] text-[#1b2147] hover:bg-white'
            >
              {c.contact.cta}
            </PillLink>
          </div>
        </Container>
      </Section>
    </CompanyShell>
  )
}
