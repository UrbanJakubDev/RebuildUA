'use client'

import React, { useState } from 'react'
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

type ReferenceType = 'Container' | 'Canopy' | 'Frame' | 'Multi-unit'
type Filter = 'All' | 'Container' | 'Canopy' | 'Frame'

interface Reference {
  id: string
  title: string
  specs: string
  type: string
  typeKey: ReferenceType
}

interface GentecContent {
  nav: SectionNavItem[]
  hero: Record<'title' | 'highlight' | 'cta' | 'ctaSecondary', string>
  facts: { items: { value: string; unit: string; label: string }[] }
  about: Record<'eyebrow' | 'title' | 'groupLabel', string>
  intro: Record<'eyebrow' | 'title' | 'text' | 'active' | 'other', string>
  products: Record<
    | 'eyebrow'
    | 'title'
    | 'text'
    | 'manRange'
    | 'mtuRange'
    | 'multiUnit'
    | 'scaleMin'
    | 'scaleMax'
    | 'version',
    string
  > & { forms: string[] }
  strengths: Record<'eyebrow' | 'title' | 'text', string> & { items: string[] }
  rnd: {
    eyebrow: string
    title: string
    items: { mark: string; title: string; text: string }[]
  }
  references: {
    eyebrow: string
    title: string
    featuredLabel: string
    featured: { title: string; specs: string[] }
    /** Popisky filtrů ve stejném pořadí jako FILTERS */
    filters: string[]
    items: Reference[]
  }
  partners: { eyebrow: string; title: string; items: string[] }
  contact: Record<
    'title' | 'text' | 'label' | 'tel' | 'email' | 'web' | 'cta',
    string
  >
}

const theme: CompanyTheme = {
  text: '#2c2a29',
  accent: '#b90426',
  border: '#ebebeb',
  tabBg: '#f5f5f5'
}

const shared = (file: string) => `/images/shared/${file}`
const reference = (path: string) => `/images/gentec/references/${path}`

const FILTERS: Filter[] = ['All', 'Container', 'Canopy', 'Frame']

// Pořadí referencí při filtrech (v režimu „All“ je pořadí dané obsahem)
const FILTER_ORDER = ['amp', 'brew', 'env', 'inn', 'pit', 'mut', 'olb']

const referenceImages: Record<string, { src: string; position?: string }> = {
  amp: { src: reference('amp-gen/Picture2.jpg') },
  brew: { src: shared('ref-brewdog-web.jpg') },
  env: { src: reference('envirogy/Picture1.jpg') },
  inn: { src: reference('innogy/Picture1.jpg'), position: 'center 75%' },
  pit: { src: reference('pitsburg/Picture1.jpg') },
  mut: { src: shared('ref-veolia-web.jpg') },
  olb: { src: shared('ref-olbena.jpg') }
}

const formImages = ['crop-frame.png', 'crop-hood.png', 'crop-container.png']

const groupLogos = [
  { src: 'crop-gentec-black.png', alt: 'GENTEC', height: 60 },
  { src: 'crop-multicont.png', alt: 'Multicont', height: 60 },
  { src: 'crop-aggregaat.png', alt: 'Aggregaat', height: 34 },
  { src: 'crop-virtuel.png', alt: 'Virtuel', height: 38 }
]

const partnerLogos = [
  { src: shared('p-veolia.png'), alt: 'Veolia' },
  { src: shared('p-innogy.png'), alt: 'Innogy' },
  { src: shared('p-man.png'), alt: 'MAN' },
  { src: shared('p-mtu.png'), alt: 'MTU' },
  { src: '/images/gentec/rhk-logo.png', alt: 'RHK' }
]

const contact = {
  phone: '+420 725 024 798',
  phoneHref: 'tel:+420725024798',
  email: 'richard.joura@gentec.cz',
  web: 'www.gentec.cz',
  webHref: 'https://www.gentec.cz'
}

const matchesFilter = (type: ReferenceType, filter: Filter) =>
  filter === 'All' ||
  type === filter ||
  (filter === 'Container' && type === 'Multi-unit')

// Rozložení karet v mřížce: v režimu „All“ 14 sloupců s různými velikostmi
function referenceLayout(id: string, showAll: boolean) {
  if (!showAll) return { col: 'span 2', aspect: '4/3' }
  if (id === 'amp' || id === 'inn') return { col: 'span 7', aspect: '16/9' }
  if (id === 'olb') return { col: 'span 6', tall: true }
  return { col: 'span 4', aspect: '1/1' }
}

export function GentecCompany({ t }: CompanyPageProps): JSX.Element {
  const c = t.raw('companies.gentec') as GentecContent
  const [filter, setFilter] = useState<Filter>('All')

  const showAll = filter === 'All'
  const references = showAll
    ? c.references.items
    : FILTER_ORDER.map(id => c.references.items.find(r => r.id === id))
        .filter((r): r is Reference => !!r)
        .filter(r => matchesFilter(r.typeKey, filter))

  const filterCount = (f: Filter) =>
    f === 'All'
      ? c.references.items.length + 1
      : c.references.items.filter(r => matchesFilter(r.typeKey, f)).length

  return (
    <CompanyShell slug='gentec' theme={theme} topSectionId='about'>
      {/* Hero */}
      <section className='relative h-[640px] overflow-hidden bg-[#2c2a29]'>
        <img
          src={shared('hero4.jpg')}
          alt='GENTEC CHP unit in plant room'
          className='absolute inset-0 block h-full w-full object-cover object-[50%_45%]'
        />
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(to right, rgba(20,19,19,0.97) 0%, rgba(20,19,19,0.9) 35%, rgba(20,19,19,0.4) 55%, rgba(20,19,19,0) 72%)'
          }}
        />
        <img
          src={shared('logo-red-white.png')}
          alt='GENTEC'
          className='absolute right-10 top-10 z-[2] h-[72px]'
        />
        <Container className='relative flex h-full flex-col justify-end gap-7 pb-16 pt-12'>
          <Heading
            as='h1'
            className='max-w-[760px] text-[88px] leading-[0.98] tracking-[-0.03em] text-white'
          >
            {c.hero.title}
            <br />
            <span className='text-[#b90426]'>{c.hero.highlight}</span>
          </Heading>
          <div className='flex items-center gap-3'>
            <PillAnchor
              to='contact'
              arrow
              className='bg-[#b90426] px-[30px] py-4 text-white hover:bg-[#960320]'
            >
              {c.hero.cta}
            </PillAnchor>
            <PillAnchor
              to='references'
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
          <div className='grid grid-cols-[1.4fr_1fr_1.25fr_1.15fr] border-l border-white/[0.12] pl-7'>
            {c.facts.items.map((fact, i) => (
              <div
                key={i}
                className='mr-7 flex flex-col gap-1.5 border-r border-white/[0.12] py-8 pr-7'
              >
                <div className='whitespace-pre-line text-[42px] font-black leading-[1.05] tracking-[-0.02em]'>
                  {fact.value}
                  {fact.unit && (
                    <span className='ml-1.5 text-2xl text-[#b90426]'>
                      {fact.unit}
                    </span>
                  )}
                </div>
                <div className='text-[13px] leading-[1.5]'>{fact.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <SectionNav items={c.nav} theme={theme} />

      {/* About / group */}
      <Section id='about' className='bg-white'>
        <Container className='pb-24 pt-28'>
          <div className='flex max-w-[860px] flex-col gap-6'>
            <Eyebrow color='#b90426' className='text-base'>
              {c.about.eyebrow}
            </Eyebrow>
            <Heading className='text-[52px] leading-[1.08] [text-wrap:balance]'>
              {c.about.title}
            </Heading>
            <p className='mt-[72px] text-2xl font-medium leading-[1.5] text-black'>
              {c.about.groupLabel}
            </p>
            <div className='-mt-1 flex flex-wrap items-center gap-12'>
              {groupLogos.map(logo => (
                <img
                  key={logo.alt}
                  src={shared(logo.src)}
                  alt={logo.alt}
                  style={{ height: logo.height }}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Company introduction + map */}
      <section className='bg-[#f5f5f5]'>
        <Container className='grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-center gap-8 py-24'>
          <div className='relative z-[1] flex flex-col gap-5 self-end pb-6'>
            <Eyebrow color='#b90426'>{c.intro.eyebrow}</Eyebrow>
            <Heading className='text-[56px] leading-[1.02]'>
              {c.intro.title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  <span className={i === 0 ? 'whitespace-nowrap' : ''}>
                    {line}
                  </span>
                </React.Fragment>
              ))}
            </Heading>
            <p className='max-w-[440px] text-[17px] leading-[1.65] text-[#2c2a29]'>
              {c.intro.text}
            </p>
            <div className='mt-2 flex items-center gap-5 text-[13px] text-[#2c2a29]'>
              <span className='flex items-center gap-2'>
                <span className='h-3 w-3 bg-[#b90426]' />
                {c.intro.active}
              </span>
              <span className='flex items-center gap-2'>
                <span className='h-3 w-3 bg-[#b0b0b0]' />
                {c.intro.other}
              </span>
            </div>
          </div>
          <img
            src={shared('world-map.png')}
            alt='GENTEC global presence map'
            className='mix-blend-multiply'
            style={{ width: '135%', margin: '-12% -6% -10% -17%' }}
          />
        </Container>
      </section>

      {/* Products */}
      <Section id='products' className='bg-white'>
        <Container className='flex flex-col gap-14 pb-24 pt-28'>
          <div className='grid grid-cols-2 items-end gap-16'>
            <div className='flex flex-col gap-5'>
              <Eyebrow color='#b90426'>{c.products.eyebrow}</Eyebrow>
              <Heading className='text-[64px] leading-none tracking-[-0.03em]'>
                {c.products.title}
              </Heading>
            </div>
            <p className='text-[17px] leading-[1.65] text-[#2c2a29]'>
              {c.products.text}
            </p>
          </div>

          {/* Engine scale */}
          <div className='flex flex-col gap-3.5'>
            <div className='relative h-14 bg-[#f5f5f5]'>
              <div className='absolute inset-y-0 left-0 flex w-[26%] items-center justify-between bg-[#4c4d54] px-5 text-white'>
                <span className='text-lg font-black'>MAN</span>
                <span className='text-sm font-medium'>
                  {c.products.manRange}
                </span>
              </div>
              <div className='absolute inset-y-0 left-[27%] flex w-[43%] items-center justify-between bg-[#b90426] px-5 text-white'>
                <span className='text-lg font-black'>MTU</span>
                <span className='text-sm font-medium'>
                  {c.products.mtuRange}
                </span>
              </div>
              <div className='absolute inset-y-0 left-[71%] right-0 flex items-center border border-dashed border-[#d1d1d1] px-5 text-sm text-[#2c2a29]'>
                {c.products.multiUnit}
              </div>
            </div>
            <div className='flex justify-between text-xs font-medium text-[#2c2a29]'>
              <span>{c.products.scaleMin}</span>
              <span>{c.products.scaleMax}</span>
            </div>
          </div>

          {/* Form factors */}
          <div className='grid grid-cols-3 gap-6'>
            {c.products.forms.map((name, i) => (
              <div key={name} className='flex flex-col border border-[#ebebeb]'>
                <div className='flex h-80 items-center justify-center bg-white p-10'>
                  <div
                    role='img'
                    aria-label={name}
                    className='h-full w-full bg-contain bg-center bg-no-repeat'
                    style={{
                      backgroundImage: `url(${shared(formImages[i])})`
                    }}
                  />
                </div>
                <div className='flex items-baseline justify-between border-t border-[#ebebeb] px-6 pb-6 pt-5'>
                  <h3 className='text-[22px] font-black'>{name}</h3>
                  <span className='text-xs font-medium uppercase tracking-[0.08em] text-[#2c2a29]'>
                    {c.products.version}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Strengths + R&D */}
      <Section
        id='strengths'
        className='relative overflow-hidden bg-[#2c2a29] text-white'
      >
        <Container className='flex flex-col gap-24 py-28'>
          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-16'>
            <div className='flex flex-col gap-5'>
              <Eyebrow color='#b90426'>{c.strengths.eyebrow}</Eyebrow>
              <Heading className='text-[40px] leading-[1.1] tracking-[-0.02em] text-white'>
                {c.strengths.title}
              </Heading>
              <p className='text-base leading-[1.65] text-[#d1d1d1]'>
                {c.strengths.text}
              </p>
            </div>
            <div className='grid grid-cols-2'>
              {c.strengths.items.map((title, i) => (
                <div key={i} className='flex items-baseline gap-5 py-[26px]'>
                  <span className='w-10 text-[22px] font-black text-[#b90426]'>
                    {num(i)}
                  </span>
                  <span className='text-[22px] font-bold tracking-[-0.01em]'>
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div id='rnd' className='flex scroll-mt-[110px] flex-col gap-10'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#b90426'>{c.rnd.eyebrow}</Eyebrow>
              <Heading className='text-[40px] leading-[1.1] tracking-[-0.02em] text-white'>
                {c.rnd.title}
              </Heading>
            </div>
            <div className='grid grid-cols-3 gap-0.5'>
              {c.rnd.items.map((item, i) => (
                <div
                  key={i}
                  className='flex flex-col gap-4 bg-[#2c2a29] px-8 pb-10 pt-9'
                >
                  <div className='text-[56px] font-black leading-none tracking-[-0.03em] text-[#b90426]'>
                    {item.mark}
                  </div>
                  <h3 className='text-[22px] font-bold'>{item.title}</h3>
                  <p className='text-[15px] leading-[1.6] text-[#d1d1d1]'>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* References */}
      <Section id='references' className='bg-white'>
        <Container className='flex flex-col gap-10 pb-24 pt-28'>
          <div className='flex flex-wrap items-end justify-between gap-8'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#b90426'>{c.references.eyebrow}</Eyebrow>
              <Heading className='text-[40px] leading-[1.1] tracking-[-0.02em]'>
                {c.references.title}
              </Heading>
            </div>
            <div className='flex gap-2'>
              {FILTERS.map((f, i) => {
                const active = filter === f
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`cursor-pointer rounded-full border px-4 py-[9px] text-[13px] font-bold ${
                      active
                        ? 'border-[#2c2a29] bg-[#2c2a29] text-white'
                        : 'border-[#d1d1d1] bg-white text-[#2c2a29]'
                    }`}
                  >
                    {c.references.filters[i]}
                    <span className='ml-1.5 font-medium opacity-60'>
                      {filterCount(f)}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Featured: Ukraine */}
          {showAll && (
            <div className='grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] bg-[#f5f5f5]'>
              <div className='relative aspect-[16/10] overflow-hidden bg-[#2c2a29]'>
                <div
                  role='img'
                  aria-label={c.references.featured.title}
                  className='h-full w-full bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: `url(${shared('ref-undp-1-web.jpg')})`
                  }}
                />
              </div>
              <div className='flex flex-col justify-center gap-5 p-10'>
                <Eyebrow color='#b90426'>{c.references.featuredLabel}</Eyebrow>
                <h3 className='text-[32px] font-black leading-[1.1] tracking-[-0.02em]'>
                  {c.references.featured.title}
                </h3>
                <div className='flex flex-col border-t border-[#d1d1d1]'>
                  {c.references.featured.specs.map(spec => (
                    <div
                      key={spec}
                      className='border-b border-[#d1d1d1] py-3 text-[15px] font-medium text-[#2c2a29]'
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div
            className='grid items-stretch gap-x-6 gap-y-10'
            style={{
              gridTemplateColumns: showAll
                ? 'repeat(14,minmax(0,1fr))'
                : 'repeat(6,minmax(0,1fr))'
            }}
          >
            {references.map(ref => {
              const layout = referenceLayout(ref.id, showAll)
              const image = referenceImages[ref.id]
              return (
                <div
                  key={ref.id}
                  className='flex flex-col gap-4'
                  style={{
                    gridColumn: layout.col,
                    gridRow: layout.tall ? 'span 2' : 'auto'
                  }}
                >
                  <div
                    className='relative overflow-hidden bg-[#ebebeb]'
                    style={
                      layout.tall
                        ? { flex: 1, minHeight: 0 }
                        : { aspectRatio: layout.aspect }
                    }
                  >
                    <div
                      role='img'
                      aria-label={ref.title}
                      className='h-full w-full bg-cover bg-no-repeat'
                      style={{
                        backgroundImage: `url(${image.src})`,
                        backgroundPosition: image.position ?? 'center'
                      }}
                    />
                    <span className='absolute left-3 top-3 bg-[#2c2a29] px-[9px] py-[5px] text-[11px] font-bold uppercase tracking-[0.08em] text-white'>
                      {ref.type}
                    </span>
                  </div>
                  <div
                    className='flex flex-col gap-1.5'
                    style={{
                      minHeight: showAll && layout.aspect !== '16/9' ? 116 : 0
                    }}
                  >
                    <h3 className='text-lg font-bold leading-[1.3]'>
                      {ref.title}
                    </h3>
                    <p className='text-sm leading-[1.5] text-[#2c2a29]'>
                      {ref.specs}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Customers & partners */}
      <Section id='partners' className='bg-[#f5f5f5]'>
        <Container className='flex flex-col gap-12 py-24'>
          <div className='grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-16'>
            <div className='flex flex-col gap-4'>
              <Eyebrow color='#b90426'>{c.partners.eyebrow}</Eyebrow>
              <Heading className='text-[40px] leading-[1.1] tracking-[-0.02em]'>
                {c.partners.title}
              </Heading>
            </div>
            <div className='flex flex-col gap-7 self-start'>
              {c.partners.items.map((text, i) => (
                <div
                  key={i}
                  className='flex items-baseline gap-5 text-[17px] leading-[1.5] text-[#2c2a29]'
                >
                  <span className='w-10 flex-none text-[22px] font-black text-[#b90426]'>
                    {num(i)}
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-5 gap-0.5'>
            {partnerLogos.map(logo => (
              <div
                key={logo.alt}
                className='flex h-[120px] items-center justify-center p-7'
              >
                <div
                  role='img'
                  aria-label={logo.alt}
                  className='h-[52px] w-full bg-contain bg-center bg-no-repeat opacity-80 mix-blend-multiply grayscale'
                  style={{ backgroundImage: `url(${logo.src})` }}
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
                src={shared('logo-white.png')}
                alt='GENTEC'
                className='h-14'
              />
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
