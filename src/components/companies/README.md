# Company Components System

Tento systém umožňuje mít pro každou firmu vlastní design a komponentu, přičemž
zachovává konzistentní API a funkčnost.

## Struktura

```
src/components/companies/
├── types.ts              # TypeScript typy a interface
├── CompanyFactory.tsx    # Factory pattern pro dynamické renderování
├── index.ts             # Export všech komponent
├── AggrCompany.tsx      # Komponenta pro firmu Aggr (těžební)
├── GentecCompany.tsx    # Komponenta pro firmu Gentec (technologická)
├── RepowerCompany.tsx   # Komponenta pro firmu Repower (energetická)
├── MulticontCompany.tsx # Komponenta pro firmu Multicont (logistická)
└── README.md            # Tato dokumentace
```

## Jak to funguje

1. **CompanyFactory** - Hlavní komponenta, která podle `companyKey` vybere
   správnou komponentu
2. **Individuální komponenty** - Každá firma má svou vlastní komponentu s
   unikátním designem
3. **Společné typy** - Všechny komponenty používají stejné interface pro
   konzistenci

## Přidání nové firmy

1. Vytvořte novou komponentu v `src/components/companies/NewCompany.tsx`
2. Implementujte interface `CompanyPageProps`
3. Přidejte komponentu do `companyComponents` registry v `CompanyFactory.tsx`
4. Exportujte komponentu v `index.ts`
5. Přidejte překlady do `messages/en.json` a `messages/ua.json`

### Příklad nové komponenty:

```tsx
'use client'

import { SimplePageWrapper } from '@/src/components/PageWrapper'
import { AnimatedSection, AnimatedHero } from '@/src/components/AnimatedSection'
import React from 'react'
import { CompanyPageProps } from './types'

export function NewCompany({
  companyKey,
  companyName,
  t
}: CompanyPageProps): JSX.Element {
  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <div>
        <AnimatedHero className='from-your-color-50 to-your-color-100 bg-gradient-to-br px-4 py-20'>
          {/* Váš unikátní design */}
        </AnimatedHero>
        {/* Zbytek vašeho designu */}
      </div>
    </SimplePageWrapper>
  )
}
```

## Designové rozdíly mezi firmami

### Aggr (Těžební firma)

- **Barvy**: Amber, Orange, Stone (hnědé/žluté tóny)
- **Téma**: Těžba, přírodní zdroje, udržitelnost
- **Ikony**: ⛏️, 🌱, 🔧
- **Pozadí**: Stonkové a jantarové gradienty

### Gentec (Technologická firma)

- **Barvy**: Blue, Indigo, Purple (modré tóny)
- **Téma**: Automatizace, AI, chytrá výroba
- **Ikony**: 🤖, 🏭, 🚀
- **Pozadí**: Modré a fialové gradienty

### Repower (Energetická firma)

- **Barvy**: Yellow, Orange, Red (energetické barvy)
- **Téma**: Obnovitelná energie, smart grid
- **Ikony**: ⚡, 🌱, 🔌
- **Pozadí**: Žluté a oranžové gradienty

### Multicont (Logistická firma)

- **Barvy**: Teal, Cyan, Blue (logistické barvy)
- **Téma**: Globální logistika, dodavatelské řetězce
- **Ikony**: 🌍, 🚛, 📦
- **Pozadí**: Tyrkysové a modré gradienty

## Použití

Hlavní stránka `src/app/[locale]/[company]/page.tsx` nyní jednoduše používá:

```tsx
import { CompanyFactory } from '@/src/components/companies'

export default function CompanyPage({ params }) {
  const t = useTranslations('pages.company')

  return (
    <CompanyFactory
      companyKey={params.company.toLowerCase()}
      companyName={params.company}
      t={t}
    />
  )
}
```

## Výhody tohoto systému

1. **Modularita** - Každá firma má svou vlastní komponentu
2. **Konzistence** - Společné API a typy
3. **Rozšiřitelnost** - Snadné přidání nové firmy
4. **Údržba** - Změny v jedné firmě neovlivní ostatní
5. **Performance** - Lazy loading komponent podle potřeby
6. **Type Safety** - Plná TypeScript podpora
