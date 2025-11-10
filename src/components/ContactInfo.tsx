'use client'

import React from 'react'

interface ContactInfoProps {
  phone?: string
  email?: string
  website?: string
  websiteLabel?: string
  className?: string
  t: (key: string) => string
}

const sanitizePhoneNumber = (phone: string): string => phone.replace(/\s+/g, '')

const getWebsiteLabel = (href?: string, label?: string): string | undefined => {
  if (label) {
    return label
  }

  if (!href) {
    return undefined
  }

  return href.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export function ContactInfo({
  phone,
  email,
  website,
  websiteLabel,
  className,
  t
}: ContactInfoProps): JSX.Element {
  const containerClasses = [
    'flex flex-col items-center justify-center pb-12 text-center text-xl text-white',
    className
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      {phone && (
        <div className='mb-2'>
          <span className='mr-2 font-bold'>
            {t('companies.common.contact.phone')}:
          </span>
          <a
            href={`tel:${sanitizePhoneNumber(phone)}`}
            className='underline hover:text-accent-hover'
          >
            {phone}
          </a>
        </div>
      )}
      {email && (
        <div className='mb-2'>
          <span className='mr-2 font-bold'>
            {t('companies.common.contact.email')}:
          </span>
          <a
            href={`mailto:${email}`}
            className='underline hover:text-accent-hover'
          >
            {email}
          </a>
        </div>
      )}
      {website && (
        <div>
          <span className='mr-2 font-bold'>
            {t('companies.common.contact.web')}:
          </span>
          <a
            href={website}
            target='_blank'
            rel='noopener noreferrer'
            className='underline hover:text-accent-hover'
          >
            {getWebsiteLabel(website, websiteLabel)}
          </a>
        </div>
      )}
    </div>
  )
}
