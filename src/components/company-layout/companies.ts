// Firmy zobrazené v prezentaci – pořadí odpovídá záložkám v horní liště
export const COMPANY_TABS = [
  { slug: 'gentec', name: 'Gentec' },
  { slug: 'repower', name: 'Repower' },
  { slug: 'ukrhold', name: 'UKRHOLD' },
  { slug: 'turbex', name: 'Turbex' }
] as const

export const COMPANY_SLUGS = COMPANY_TABS.map(c => c.slug)

export type CompanySlug = (typeof COMPANY_TABS)[number]['slug']

export interface CompanyTheme {
  /** Barva textu stránky */
  text: string
  /** Akcent podtržení aktivní sekce */
  accent: string
  /** Barva oddělovacích linek lišt a patičky */
  border: string
  /** Pozadí aktivní záložky firmy */
  tabBg: string
}
