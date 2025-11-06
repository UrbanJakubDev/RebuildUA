import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1440px'
      }
    },
    extend: {
      backgroundImage: {
        'span-bg': 'var(--span-bg)'
      },
      colors: {
        background: 'var(--background)',
        primary: {
          DEFAULT: 'var(--primary)'
        },
        'button-secondary': 'var(--button-secondary)',
        'button-text': 'var(--button-text)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'background-secondary': 'var(--background-secondary)',
        'repower-background': 'var(--repower-background)',
        secondary: 'var(--secondary)',
        button: 'var(--button)',
        selected: 'var(--selected)',
        dropdown: 'var(--dropdown)',
        dropdownHover: 'var(--dropdown-hover)',
        buttonSecondary: 'var(--button-secondary)',
        // New theme colors
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
        'card-bg': 'var(--card-bg)',
        'card-shadow': 'var(--card-shadow)',
        'card-shadow-hover': 'var(--card-shadow-hover)',

        // Gentec theme colors
        'gentec-red': 'var(--gentec-red)',
        'gentec-dark-gray': 'var(--gentec-dark-gray)',
        'gentec-background': 'var(--gentec-background)',
        'gentec-text-primary': 'var(--gentec-text-primary)',
        'gentec-text-secondary': 'var(--gentec-text-secondary)',
        'gentec-dropdown': 'var(--gentec-dropdown)',
        'gentec-dropdown-hover': 'var(--gentec-dropdown-hover)',
        'gentec-button-secondary': 'var(--gentec-button-secondary)',
        'gentec-selected': 'var(--gentec-selected)',
        'gentec-logo-shadow': 'var(--gentec-logo-shadow)',
        'gentec-logo-body': 'var(--gentec-logo-body)'
      },

      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'var(--rubik)'],
        gentec: ['var(--font-avenir)', 'sans-serif']
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
