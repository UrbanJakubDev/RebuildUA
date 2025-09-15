# Nové komponenty pro Next.js Starter Kit

Tento dokument popisuje nově přidané komponenty určené pro firemní weby a
prezentace podnikatelů.

## 📱 WhatsAppButton

Plovoucí tlačítko pro přímý kontakt přes WhatsApp Business.

### Použití

```tsx
import { WhatsAppButton } from '@/components/WhatsAppButton'
;<WhatsAppButton
  phoneNumber='+420 123 456 789'
  message='Dobrý den, rád/a bych se zeptal/a na vaše služby.'
/>
```

### Props

- `phoneNumber` (string, required) - Telefonní číslo ve formátu +420 123 456 789
- `message` (string, optional) - Předem připravená zpráva
- `className` (string, optional) - Dodatečné CSS třídy
- `children` (ReactNode, optional) - Vlastní obsah tlačítka

---

## 📞 CallToAction

Komponenta s tlačítky pro přímý kontakt (telefon, email, kopírování emailu).

### Použití

```tsx
import { CallToAction } from '@/components/CallToAction'
;<CallToAction
  phoneNumber='+420 123 456 789'
  email='info@firma.cz'
  title='Potřebujete pomoci?'
  description='Kontaktujte nás přímo'
/>
```

### Props

- `phoneNumber` (string, required) - Telefonní číslo
- `email` (string, required) - Email adresa
- `title` (string, optional) - Nadpis sekce
- `description` (string, optional) - Popis sekce
- `className` (string, optional) - Dodatečné CSS třídy

---

## 💰 PricingTable

Tabulka cenových balíčků s možností stažení PDF ceníku.

### Použití

```tsx
import { PricingTable } from '@/components/PricingTable'

const pricingItems = [
  {
    id: 'basic',
    name: 'Základní balíček',
    description: 'Ideální pro malé firmy',
    price: '2 500 Kč',
    features: ['Web s 5 stránkami', 'Responzivní design'],
    popular: false
  }
]

;<PricingTable
  items={pricingItems}
  title='Naše cenové balíčky'
  downloadUrl='/cenik-sluzeb.pdf'
/>
```

### Props

- `items` (PricingItem[], required) - Pole cenových balíčků
- `title` (string, optional) - Nadpis sekce
- `subtitle` (string, optional) - Podnadpis sekce
- `downloadUrl` (string, optional) - URL pro stažení PDF ceníku
- `className` (string, optional) - Dodatečné CSS třídy

### PricingItem interface

```tsx
interface PricingItem {
  id: string
  name: string
  description: string
  price: string
  features: string[]
  popular?: boolean
}
```

---

## ⭐ Testimonials

Komponenta pro zobrazení referencí a recenzí klientů s carousel funkcionalitou.

### Použití

```tsx
import { Testimonials } from '@/components/Testimonials'

const testimonials = [
  {
    id: '1',
    name: 'Jan Novák',
    company: 'Firma s.r.o.',
    content: 'Skvělá práce!',
    rating: 5,
    avatar: '/avatar.jpg'
  }
]

;<Testimonials
  testimonials={testimonials}
  title='Co o nás říkají klienti'
  autoPlay={true}
  autoPlayInterval={5000}
/>
```

### Props

- `testimonials` (Testimonial[], required) - Pole referencí
- `title` (string, optional) - Nadpis sekce
- `subtitle` (string, optional) - Podnadpis sekce
- `autoPlay` (boolean, optional) - Automatické přepínání
- `autoPlayInterval` (number, optional) - Interval přepínání v ms
- `className` (string, optional) - Dodatečné CSS třídy

### Testimonial interface

```tsx
interface Testimonial {
  id: string
  name: string
  company?: string
  position?: string
  content: string
  rating: number
  avatar?: string
  date?: string
}
```

---

## ❓ FAQ

Sekce často kladených otázek s možností skupování podle kategorií.

### Použití

```tsx
import { FAQ } from '@/components/FAQ'

const faqItems = [
  {
    id: '1',
    question: 'Jak dlouho trvá vytvoření webu?',
    answer: 'Dodáváme do 2-4 týdnů.',
    category: 'Časové údaje'
  }
]

;<FAQ items={faqItems} title='Často kladené otázky' grouped={true} />
```

### Props

- `items` (FAQItem[], required) - Pole otázek a odpovědí
- `title` (string, optional) - Nadpis sekce
- `subtitle` (string, optional) - Podnadpis sekce
- `grouped` (boolean, optional) - Skupování podle kategorií
- `className` (string, optional) - Dodatečné CSS třídy

### FAQItem interface

```tsx
interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
}
```

---

## ⬆️ BackToTop

Tlačítko pro návrat na začátek stránky, které se zobrazí při scrollování.

### Použití

```tsx
import { BackToTop } from '@/components/BackToTop'
;<BackToTop threshold={300} smooth={true} />
```

### Props

- `threshold` (number, optional) - Počet pixelů pro zobrazení tlačítka
  (default: 300)
- `smooth` (boolean, optional) - Plynulé scrollování (default: true)
- `className` (string, optional) - Dodatečné CSS třídy

---

## 🔍 Search

Vyhledávací komponenta s výsledky a klávesnicovou navigací.

### Použití

```tsx
import { Search } from '@/components/Search'

const searchResults = [
  {
    id: '1',
    title: 'Webové stránky',
    description: 'Tvorba webů',
    url: '/sluzby/webove-stranky',
    type: 'service'
  }
]

;<Search
  placeholder='Hledejte na webu...'
  onSearch={query => console.log('Searching:', query)}
  results={searchResults}
  showResults={true}
/>
```

### Props

- `placeholder` (string, optional) - Placeholder text
- `onSearch` (function, optional) - Callback při vyhledávání
- `results` (SearchResult[], optional) - Výsledky vyhledávání
- `isLoading` (boolean, optional) - Stav načítání
- `showResults` (boolean, optional) - Zobrazení výsledků
- `className` (string, optional) - Dodatečné CSS třídy

### SearchResult interface

```tsx
interface SearchResult {
  id: string
  title: string
  description: string
  url: string
  type: 'page' | 'service' | 'blog' | 'faq'
  tags?: string[]
}
```

---

## 🎨 Vlastní styly

Všechny komponenty používají Tailwind CSS a jsou plně responzivní. Můžete je
přizpůsobit pomocí `className` prop nebo úpravou CSS tříd v komponentách.

## 📱 Responzivita

Komponenty jsou optimalizovány pro:

- Mobilní zařízení (320px+)
- Tablety (768px+)
- Desktop (1024px+)
- Velké obrazovky (1280px+)

## ♿ Přístupnost

Všechny komponenty obsahují:

- Správné ARIA atributy
- Klávesnicovou navigaci
- Screen reader podporu
- Kontrastní barvy
- Focus stavy

## 🚀 Výkon

Komponenty jsou optimalizovány pro:

- Lazy loading
- Memoizaci
- Minimalizaci re-renderů
- Optimalizované animace

## 📚 Další informace

Pro ukázky použití všech komponent viz `ComponentExamples.tsx` v
`src/components/examples/`.
