# 🚀 Next.js 14 Starter Kit

Moderní, výkonný a flexibilní šablon pro Next.js 14 aplikace s pokročilými
funkcemi.

## ✨ Funkce

- **🔄 Next.js 14** s App Router
- **🌍 Automatická detekce jazyka** podle systémového nastavení
- **🎨 Design System** s CSS proměnnými a Tailwind CSS
- **🌙 Dark/Light Mode** s automatickým přepínáním
- **📱 Responzivní design** s moderním UI
- **⚡ Optimalizace výkonu** a SEO
- **🔒 TypeScript** pro type safety
- **📊 Analytics** a Web Vitals
- **🍪 Cookies consent** management

## 🚀 Rychlý start

### 1. Použít jako šablonu

```bash
# Klikněte na "Use this template" na GitHub
# Nebo použijte GitHub CLI
gh repo create my-app --template UrbanJakubDev/nextjs-v14-starterkit

# Nebo klonujte a upravte
git clone https://github.com/UrbanJakubDev/nextjs-v14-starterkit.git my-app
cd my-app
```

### 2. Instalace závislostí

```bash
npm install
# nebo
yarn install
# nebo
pnpm install
```

### 3. Nastavení prostředí

```bash
# Zkopírujte .env.example
cp .env.example .env.local

# Upravte .env.local podle potřeby
```

### 4. Spuštění development serveru

```bash
npm run dev
# nebo
yarn dev
# nebo
pnpm dev
```

Otevřete [http://localhost:3000](http://localhost:3000) ve vašem prohlížeči.

## 🌍 Jazyková podpora

### Automatická detekce jazyka

Aplikace automaticky detekuje preferovaný jazyk uživatele:

1. **Priorita 1**: Uložený jazyk v cookies
2. **Priorita 2**: Jazyk z `Accept-Language` headeru
3. **Priorita 3**: Výchozí jazyk (čeština)

### Podporované jazyky

- 🇨🇿 **Čeština** (cs) - výchozí
- 🇬🇧 **Angličtina** (en)
- 🇩🇪 **Němčina** (de)

### Přidání nového jazyka

1. **Přidejte překlady** do `messages/[locale].json`
2. **Přidejte locale** do `src/i18n.ts`
3. **Aktualizujte middleware** v `src/middleware.ts`

## 🎨 Design System

### CSS Proměnné

Aplikace používá CSS proměnné místo hardcoded Tailwind tříd:

```css
:root {
  --primary: #333366; /* Hlavní text */
  --secondary: #097fa5; /* Sekundární barvy */
  --background: #ededed; /* Pozadí */
  --button: #097fa5; /* Tlačítka */
  --text-secondary: #3c3c3c; /* Sekundární text */
}
```

### Použití v komponentách

```tsx
// ✅ Správně - Používejte design tokeny
<div className="text-primary bg-background border-background-secondary">

// ❌ Špatně - Nepoužívejte hardcoded třídy
<div className="text-gray-600 bg-white border-gray-200">
```

## 📁 Struktura projektu

```
src/
├── app/                    # App Router
│   ├── [locale]/          # Lokalizované stránky
│   ├── icons/             # SVG ikony
│   └── globals.css        # Globální styly
├── components/             # React komponenty
│   ├── Header.tsx         # Hlavička s jazykovým přepínačem
│   ├── LanguageSettings.tsx # Nastavení jazyka
│   ├── ThemeSwitch.tsx    # Přepínač tématu
│   └── Button.tsx         # Design systém komponenty
├── hooks/                  # Custom hooks
│   └── useLanguagePreference.ts # Jazykové preference
├── middleware.ts           # Next.js middleware
├── i18n.ts                # Internacionalizace
└── navigation.tsx         # Navigace
```

## 🔧 Konfigurace

### Tailwind CSS

```ts
// tailwind.config.ts
colors: {
  background: 'var(--background)',
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  button: 'var(--button)',
  'text-secondary': 'var(--text-secondary)',
}
```

### Next.js

```js
// next.config.js
const withNextIntl = require('next-intl/plugin')()
```

## 📚 Dostupné skripty

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint kontrola
npm run type-check   # TypeScript kontrola
```

## 🌟 Pokročilé funkce

### Jazykové nastavení

- **Automatická detekce** jazyka systému
- **Uložení preference** do localStorage a cookies
- **Dropdown nastavení** s možností resetu
- **Respektování** uživatelských preferencí

### Design System

- **Konzistentní barvy** napříč aplikacemi
- **Automatické přepínání** témat
- **CSS proměnné** pro snadnou údržbu
- **Responsive komponenty** s Tailwind CSS

### Performance

- **Automatická optimalizace** obrázků
- **Font optimization** s next/font
- **Bundle analysis** a monitoring
- **SEO optimalizace** s metadata API

## 🤝 Contributing

1. Fork repozitáře
2. Vytvořte feature branch (`git checkout -b feature/amazing-feature`)
3. Commitněte změny (`git commit -m 'Add amazing feature'`)
4. Pushněte branch (`git push origin feature/amazing-feature`)
5. Otevřete Pull Request

## 📄 Licence

Tento projekt je licencován pod MIT licencí - viz [LICENSE](LICENSE) soubor pro
detaily.

## 🙏 Poděkování

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [next-intl](https://next-intl-docs.vercel.app/) - Internacionalizace
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme switching

## 📞 Support

Pokud máte otázky nebo potřebujete pomoc:

- 📧 Vytvořte
  [Issue](https://github.com/UrbanJakubDev/nextjs-v14-starterkit/issues)
- 💬 Diskutujte v
  [Discussions](https://github.com/UrbanJakubDev/nextjs-v14-starterkit/discussions)
- ⭐ Dejte hvězdičku, pokud se vám líbí!

---

**Vytvořeno s ❤️ pro Next.js komunitu**
