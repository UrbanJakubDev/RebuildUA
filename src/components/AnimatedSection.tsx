'use client'

import { ScrollReveal, ScrollRevealVariants } from './ScrollReveal'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: keyof typeof ScrollRevealVariants
  delay?: number
  className?: string
}

export function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = ''
}: AnimatedSectionProps) {
  const animationProps = ScrollRevealVariants[animation]

  return (
    <ScrollReveal {...animationProps} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  )
}

// Předpřipravené komponenty pro různé typy sekcí
export function AnimatedHero({
  children,
  className = ''
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <AnimatedSection animation='fade' delay={200} className={className}>
      {children}
    </AnimatedSection>
  )
}

export function AnimatedCard({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <AnimatedSection animation='fadeUp' delay={delay} className={className}>
      {children}
    </AnimatedSection>
  )
}

export function AnimatedText({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <AnimatedSection animation='fade' delay={delay} className={className}>
      {children}
    </AnimatedSection>
  )
}
