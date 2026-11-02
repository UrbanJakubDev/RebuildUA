'use client'

import React from 'react'
import { scrollToSection } from './scroll'

type AnchorLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to: string
}

export function AnchorLink({ to, onClick, ...props }: AnchorLinkProps) {
  return (
    <a
      href={`#${to}`}
      onClick={e => {
        e.preventDefault()
        scrollToSection(to)
        onClick?.(e)
      }}
      {...props}
    />
  )
}
