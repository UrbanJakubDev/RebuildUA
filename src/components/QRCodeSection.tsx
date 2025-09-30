'use client'

import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { AnimatedSection } from './AnimatedSection'
import { useTranslations } from 'next-intl'

interface QRCodeSectionProps {
  url: string
  qrSize?: number
  backgroundColor?: string
}

export function QRCodeSection({
  url,
  qrSize = 160,
  backgroundColor = 'px-4 py-20'
}: QRCodeSectionProps) {
  const t = useTranslations('qrCode')
  return (
    <AnimatedSection animation='fadeUp' delay={100} className={backgroundColor}>
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='mb-6 text-4xl font-bold text-white'>{t('title')}</h2>
        <p className='mb-8 text-xl text-gray-300'>{t('subtitle')}</p>

        {/* QR Code */}
        <div className='mx-auto mb-8 flex justify-center'>
          <div className='rounded-2xl bg-white p-6 shadow-lg'>
            <QRCodeSVG
              value={url}
              size={qrSize}
              bgColor='#ffffff'
              fgColor='#000000'
              level='M'
            />
          </div>
        </div>

        <p className='text-gray-400'>{t('instructionText')}</p>
      </div>
    </AnimatedSection>
  )
}
