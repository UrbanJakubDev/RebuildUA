import React from 'react'
import { AnchorLink } from './AnchorLink'

// Drobné stavební prvky stránek firem podle nového designu

export function Container({
  className = '',
  children
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`mx-auto max-w-[1280px] px-12 ${className}`}>
      {children}
    </div>
  )
}

export function Section({
  id,
  className = '',
  style,
  children
}: {
  id?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`scroll-mt-[176px] ${className}`} style={style}>
      {children}
    </section>
  )
}

export function Eyebrow({
  color,
  className = 'text-xs',
  children
}: {
  color: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`font-bold uppercase tracking-[0.15em] ${className}`}
      style={{ color }}
    >
      {children}
    </div>
  )
}

export function Heading({
  as: Tag = 'h2',
  className = 'text-5xl leading-[1.05]',
  style,
  children
}: {
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <Tag
      className={`whitespace-pre-line font-black tracking-[-0.025em] ${className}`}
      style={style}
    >
      {children}
    </Tag>
  )
}

/** Zaoblené tlačítko vedoucí na sekci stránky */
export function PillAnchor({
  to,
  className,
  arrow = false,
  children
}: {
  to: string
  className: string
  arrow?: boolean
  children: React.ReactNode
}) {
  return (
    <AnchorLink
      to={to}
      className={`inline-flex items-center gap-2.5 rounded-full text-base font-bold transition-colors ${className}`}
    >
      {children}
      {arrow && <span>›</span>}
    </AnchorLink>
  )
}

/** Zaoblené tlačítko s externím odkazem (mailto, web) */
export function PillLink({
  href,
  className,
  children
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2.5 self-start rounded-full px-[30px] py-4 text-base font-bold transition-colors ${className}`}
    >
      {children} <span>›</span>
    </a>
  )
}

/** Řádek kontaktu „Popisek …… hodnota“ */
export function ContactRow({
  href,
  label,
  value,
  borderColor = 'rgba(255,255,255,0.4)'
}: {
  href: string
  label: string
  value: string
  borderColor?: string
}) {
  return (
    <a
      href={href}
      className='flex justify-between border-b py-4 text-white hover:text-white'
      style={{ borderColor }}
    >
      <span className='text-[13px] font-medium'>{label}</span>
      <span className='text-lg font-bold'>{value}</span>
    </a>
  )
}

/** Číslo položky ve formátu 01, 02, … */
export const num = (i: number) => String(i + 1).padStart(2, '0')
