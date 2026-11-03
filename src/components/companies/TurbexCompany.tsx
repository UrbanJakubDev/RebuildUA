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

interface TurbexContent {
  nav: SectionNavItem[]
  hero: Record<
    'eyebrow' | 'title' | 'highlight' | 'cta' | 'ctaSecondary',
    string
  >
  mission: Record<'eyebrow' | 'title' | 'text', string>
  goals: {
    eyebrow: string
    title: string
    items: { title: string; text: string }[]
  }
  competences: {
    eyebrow: string
    title: string
    items: { title: string; text: string }[]
  }
  team: { eyebrow: string; title: string; items: string[] }
  parts: { eyebrow: string; title: string; items: string[] }
  market: {
    eyebrow: string
    title: string
    items: { title: string; items: string[] }[]
  }
  growth: {
    eyebrow: string
    title: string
    items: { title: string; items: string[] }[]
  }
  contact: Record<
    'title' | 'name' | 'role' | 'label' | 'tel' | 'email' | 'web' | 'cta',
    string
  >
}

const theme: CompanyTheme = {
  text: '#0f2a17',
  accent: '#12bf23',
  border: '#e3ebe4'
}

const img = (n: number, ext = 'png') => `/images/turbex/image${n}.${ext}`

const goalIcons = [8, 9, 10, 11]
const competenceIcons = [12, 13, 14, 15]
const teamIcons = [15, 16, 12, 17]
const marketIcons = [19, 20, 21, 22]

const contact = {
  phone: '+38 050 302 15 25',
  phoneHref: 'tel:+380503021525',
  email: 'gulya@turbex.com.ua',
  web: 'turbex.com.ua',
  webHref: 'http://turbex.com.ua/'
}

export function TurbexCompany({ t }: CompanyPageProps): JSX.Element {
  const c = t.raw('companies.turbex') as TurbexContent

  return (
    <CompanyShell theme={theme}>
      {/* Hero */}
      <section
        className='relative min-h-[620px] overflow-hidden bg-[#0f2a17] bg-cover bg-center bg-no-repeat text-white'
        style={{ backgroundImage: `url(${img(1, 'jpeg')})` }}
      >
        <img
          src={img(3)}
          alt='TURBEX'
          className='absolute right-12 top-11 z-[2] h-9'
        />
        <Container className='relative grid min-h-[620px] grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-end gap-12 pb-[72px] pt-[120px]'>
          <div className='flex flex-col gap-7'>
            <Eyebrow color='#12bf23' className='text-sm'>
              {c.hero.eyebrow}
            </Eyebrow>
            <Heading
              as='h1'
              className='text-[84px] leading-none tracking-[-0.03em] text-white'
            >
              {c.hero.title}
              <br />
              <span className='text-[#12bf23]'>{c.hero.highlight}</span>
            </Heading>
            <div className='flex items-center gap-3'>
              <PillAnchor
                to='contact'
                arrow
                className='bg-[#12bf23] px-[30px] py-4 text-[#0f2a17] hover:bg-white'
              >
                {c.hero.cta}
              </PillAnchor>
              <PillAnchor
                to='competences'
                className='border-2 border-white/70 px-7 py-3.5 text-white hover:bg-white hover:text-[#0f2a17]'
              >
                {c.hero.ctaSecondary}
              </PillAnchor>
            </div>
          </div>
          <img
            src={img(5)}
            alt='GENTEC CHP unit'
            className='block w-full self-center'
          />
        </Container>
      </section>

      <SectionNav items={c.nav} theme={theme} />

      {/* Mission */}
      <Section id='mission' className='bg-white'>
        <Container className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-16 pb-24 pt-28'>
          <div className='flex flex-col gap-6'>
            <Eyebrow color='#0b7916'>{c.mission.eyebrow}</Eyebrow>
            <Heading className='text-[44px] leading-[1.1]'>
              {c.mission.title}
            </Heading>
            <p className='text-[19px] leading-[1.6] text-[#2c5636]'>
              {c.mission.text}
            </p>
            <img src={img(7)} alt='GENTEC' className='mt-3 h-14 self-start' />
          </div>
          <img
            src={img(6)}
            alt='Service network map of Europe'
            className='block w-full'
          />
        </Container>
      </Section>

      {/* Goals */}
      <Section id='goals' className='bg-[#eff5ef]'>
        <Container className='flex flex-col gap-12 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#0b7916'>{c.goals.eyebrow}</Eyebrow>
            <Heading>{c.goals.title}</Heading>
          </div>
          <div className='grid grid-cols-4 gap-6'>
            {c.goals.items.map((goal, i) => (
              <div key={i} className='flex flex-col gap-[18px] bg-white p-7'>
                <div className='flex items-center justify-between'>
                  <div className='flex h-[52px] w-[52px] items-center justify-center bg-[#0b7916]'>
                    <img
                      src={img(goalIcons[i])}
                      alt=''
                      className='h-[26px] w-[26px]'
                    />
                  </div>
                  <span className='text-2xl font-black text-[#12bf23]'>
                    {num(i)}
                  </span>
                </div>
                <h3 className='text-xl font-black leading-[1.25]'>
                  {goal.title}
                </h3>
                <p className='text-[15px] leading-[1.6] text-[#2c5636]'>
                  {goal.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Competences */}
      <Section id='competences' className='bg-[#0f2a17] text-white'>
        <Container className='flex flex-col gap-14 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#12bf23'>{c.competences.eyebrow}</Eyebrow>
            <Heading className='text-5xl leading-[1.05] text-white'>
              {c.competences.title}
            </Heading>
          </div>
          <div className='grid grid-cols-2 gap-0.5 bg-[#2c5636]'>
            {c.competences.items.map((item, i) => (
              <div key={i} className='flex items-start gap-6 bg-[#0f2a17] p-9'>
                <div className='flex h-14 w-14 flex-none items-center justify-center border-2 border-[#12bf23]'>
                  <img
                    src={img(competenceIcons[i])}
                    alt=''
                    className='h-7 w-7'
                  />
                </div>
                <div className='flex flex-col gap-2.5'>
                  <div className='flex items-baseline gap-3.5'>
                    <span className='text-lg font-black text-[#12bf23]'>
                      {num(i)}
                    </span>
                    <h3 className='text-[22px] font-black text-white'>
                      {item.title}
                    </h3>
                  </div>
                  <p className='text-[15px] leading-[1.65] text-[#bccbc0]'>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section id='team' className='bg-white'>
        <Container className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-start gap-[72px] py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#0b7916'>{c.team.eyebrow}</Eyebrow>
            <Heading>{c.team.title}</Heading>
          </div>
          <div className='flex flex-col'>
            {c.team.items.map((text, i) => (
              <div
                key={i}
                className='flex items-start gap-5 border-b border-[#e3ebe4] py-[22px]'
              >
                <div className='flex h-11 w-11 flex-none items-center justify-center bg-[#eff5ef]'>
                  <img
                    src={img(teamIcons[i])}
                    alt=''
                    className='h-[22px] w-[22px]'
                    style={{
                      filter:
                        'brightness(0) saturate(100%) invert(30%) sepia(90%) saturate(1500%) hue-rotate(95deg)'
                    }}
                  />
                </div>
                <p className='text-[17px] leading-[1.6] text-[#0f2a17]'>
                  {text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spare parts */}
      <Section id='parts' className='bg-[#eff5ef]'>
        <Container className='grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-16 py-28'>
          <div className='flex flex-col gap-9'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#0b7916'>{c.parts.eyebrow}</Eyebrow>
              <Heading>{c.parts.title}</Heading>
            </div>
            <div className='flex flex-col border-t border-[#bccbc0]'>
              {c.parts.items.map((text, i) => (
                <div
                  key={i}
                  className='flex items-baseline gap-5 border-b border-[#bccbc0] py-[18px]'
                >
                  <span className='w-9 flex-none text-xl font-black text-[#0b7916]'>
                    {num(i)}
                  </span>
                  <span className='text-[19px] font-bold'>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex items-center justify-center p-6'>
            <img src={img(18)} alt='MAN' className='block w-full' />
          </div>
        </Container>
      </Section>

      {/* Market */}
      <Section id='market' className='bg-white'>
        <Container className='flex flex-col gap-12 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#0b7916'>{c.market.eyebrow}</Eyebrow>
            <Heading>{c.market.title}</Heading>
          </div>
          <div className='grid grid-cols-4 gap-6'>
            {c.market.items.map((segment, i) => (
              <div
                key={i}
                className='flex flex-col gap-[18px] border-t-4 border-[#12bf23] bg-[#eff5ef] p-7'
              >
                <div className='flex h-[52px] w-[52px] items-center justify-center bg-[#0f2a17]'>
                  <img
                    src={img(marketIcons[i])}
                    alt=''
                    className='h-[26px] w-[26px]'
                  />
                </div>
                <h3 className='min-h-[50px] text-[21px] font-black leading-[1.2]'>
                  {segment.title}
                </h3>
                <div className='flex flex-col gap-3'>
                  {segment.items.map((item, j) => (
                    <div
                      key={j}
                      className='flex items-baseline gap-2.5 text-[15px] leading-[1.5] text-[#2c5636]'
                    >
                      <span className='h-1.5 w-1.5 flex-none -translate-y-0.5 bg-[#0b7916]' />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Growth */}
      <Section id='growth' className='bg-[#173b21] text-white'>
        <Container className='flex flex-col gap-14 py-28'>
          <div className='flex flex-col gap-4'>
            <Eyebrow color='#12bf23'>{c.growth.eyebrow}</Eyebrow>
            <Heading className='text-5xl leading-[1.05] text-white'>
              {c.growth.title}
            </Heading>
          </div>
          <div className='grid grid-cols-3 gap-10'>
            {c.growth.items.map((item, i) => (
              <div
                key={i}
                className='flex flex-col gap-[18px] border-t border-[#2c5636] pt-7'
              >
                <span className='text-[56px] font-black leading-none text-[#12bf23]'>
                  {num(i)}
                </span>
                <h3 className='text-[26px] font-black text-white'>
                  {item.title}
                </h3>
                {item.items.map((text, j) => (
                  <p key={j} className='text-base leading-[1.6] text-[#bccbc0]'>
                    {text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id='contact' className='bg-[#0b7916] text-white'>
        <Container className='grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-16 py-24'>
          <div className='flex flex-col gap-5'>
            <Heading className='text-[56px] leading-[1.02] tracking-[-0.03em] text-white'>
              {c.contact.title}
            </Heading>
            <div className='mt-2 flex flex-col gap-1'>
              <span className='text-[22px] font-black'>{c.contact.name}</span>
              <span className='text-[15px]'>{c.contact.role}</span>
            </div>
          </div>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-between'>
              <Eyebrow color='#fff'>{c.contact.label}</Eyebrow>
              <img src={img(3)} alt='TURBEX' className='h-7' />
            </div>
            <div className='flex flex-col border-t border-white/40'>
              <ContactRow
                href={contact.phoneHref}
                label={c.contact.tel}
                value={contact.phone}
              />
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
              className='bg-white text-[#0b7916] hover:bg-[#0f2a17] hover:text-white'
            >
              {c.contact.cta}
            </PillLink>
          </div>
        </Container>
      </Section>
    </CompanyShell>
  )
}
