'use client'

import { WhatsAppButton } from '../WhatsAppButton'
import { CallToAction } from '../CallToAction'
import { PricingTable } from '../PricingTable'
import { Testimonials } from '../Testimonials'
import { FAQ } from '../FAQ'
import { Map, MapLocations } from '../Map'
import { ScrollReveal, ScrollRevealVariants } from '../ScrollReveal'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

// Sample data for examples - Lang-first structure
const samplePricingData = {
  cs: [
    {
      id: 'basic',
      name: 'Základní balíček',
      description: 'Ideální pro malé firmy a začínající podnikatele',
      price: '2 500 Kč',
      features: [
        'Jednoduchý web s 5 stránkami',
        'Responzivní design',
        'Základní SEO optimalizace',
        'Kontaktní formulář',
        'Dodání do 2 týdnů'
      ]
    },
    {
      id: 'professional',
      name: 'Profesionální balíček',
      description: 'Pro střední firmy s pokročilými požadavky',
      price: '5 500 Kč',
      features: [
        'Web s až 15 stránkami',
        'Responzivní design',
        'Pokročilé SEO',
        'Kontaktní formulář',
        'Integrace s Google Analytics',
        'Blog sekce',
        'Dodání do 3 týdnů',
        '1 měsíc podpory'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium balíček',
      description: 'Kompletní řešení pro velké firmy',
      price: '12 500 Kč',
      features: [
        'Neomezený počet stránek',
        'Responzivní design',
        'Pokročilé SEO a PPC',
        'E-shop funkcionalita',
        'Integrace s CRM',
        'Blog a novinky',
        'Dodání do 4 týdnů',
        '3 měsíce podpory',
        'Školení pro zaměstnance'
      ]
    }
  ],
  en: [
    {
      id: 'basic',
      name: 'Basic Package',
      description: 'Perfect for small businesses and beginning entrepreneurs',
      price: '€100',
      features: [
        'Simple website with 5 pages',
        'Responsive design',
        'Basic SEO optimization',
        'Contact form',
        'Delivery in 2 weeks'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Package',
      description: 'For medium companies with advanced requirements',
      price: '€220',
      features: [
        'Website with up to 15 pages',
        'Responsive design',
        'Advanced SEO',
        'Contact form',
        'Google Analytics integration',
        'Blog section',
        'Delivery in 3 weeks',
        '1 month of support'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Package',
      description: 'Complete solution for large companies',
      price: '€500',
      features: [
        'Unlimited number of pages',
        'Responsive design',
        'Advanced SEO and PPC',
        'E-shop functionality',
        'CRM integration',
        'Blog and news',
        'Delivery in 4 weeks',
        '3 months of support',
        'Employee training'
      ]
    }
  ],
  de: [
    {
      id: 'basic',
      name: 'Grundpaket',
      description: 'Ideal für kleine Unternehmen und Gründer',
      price: '100 €',
      features: [
        'Einfache Website mit 5 Seiten',
        'Responsives Design',
        'Grundlegende SEO-Optimierung',
        'Kontaktformular',
        'Lieferung in 2 Wochen'
      ]
    },
    {
      id: 'professional',
      name: 'Professionelles Paket',
      description: 'Für mittlere Unternehmen mit erweiterten Anforderungen',
      price: '220 €',
      features: [
        'Website mit bis zu 15 Seiten',
        'Responsives Design',
        'Erweiterte SEO',
        'Kontaktformular',
        'Google Analytics Integration',
        'Blog-Bereich',
        'Lieferung in 3 Wochen',
        '1 Monat Support'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium-Paket',
      description: 'Komplettlösung für große Unternehmen',
      price: '500 €',
      features: [
        'Unbegrenzte Anzahl von Seiten',
        'Responsives Design',
        'Erweiterte SEO und PPC',
        'E-Shop-Funktionalität',
        'CRM-Integration',
        'Blog und News',
        'Lieferung in 4 Wochen',
        '3 Monate Support',
        'Mitarbeiterschulung'
      ]
    }
  ]
}

const sampleTestimonialsData = {
  cs: [
    {
      id: '1',
      name: 'Jan Novák',
      company: 'Novák & spol. s.r.o.',
      position: 'Ředitel',
      content:
        'Profesionální přístup a kvalitní práce. Web jsme dostali včas a přesně podle našich představ. Vřele doporučujeme!',
      rating: 5,
      avatar: '/avatars/jan-novak.jpg',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Marie Svobodová',
      company: 'Beauty Salon Svoboda',
      position: 'Majitelka',
      content:
        'Skvělá spolupráce od začátku do konce. Web je moderní, rychlý a přináší nám nové klienty. Děkujeme!',
      rating: 5,
      avatar: '/avatars/marie-svobodova.jpg',
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Petr Černý',
      company: 'Černý Consulting',
      position: 'Konzultant',
      content:
        'Výborná práce s respektem k našim požadavkům. Web je funkční a vypadá profesionálně. Určitě budeme spolupracovat znovu.',
      rating: 5,
      avatar: '/avatars/petr-cerny.jpg',
      date: '2024-01-05'
    }
  ],
  en: [
    {
      id: '1',
      name: 'John Smith',
      company: 'Smith & Partners Ltd.',
      position: 'Director',
      content:
        'Professional approach and quality work. We received the website on time and exactly according to our ideas. We highly recommend!',
      rating: 5,
      avatar: '/avatars/jan-novak.jpg',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mary Johnson',
      company: 'Beauty Salon Johnson',
      position: 'Owner',
      content:
        'Great cooperation from start to finish. The website is modern, fast and brings us new clients. Thank you!',
      rating: 5,
      avatar: '/avatars/marie-svobodova.jpg',
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Peter Black',
      company: 'Black Consulting',
      position: 'Consultant',
      content:
        'Excellent work with respect for our requirements. The website is functional and looks professional. We will definitely work together again.',
      rating: 5,
      avatar: '/avatars/petr-cerny.jpg',
      date: '2024-01-05'
    }
  ],
  de: [
    {
      id: '1',
      name: 'Johann Müller',
      company: 'Müller & Partner GmbH',
      position: 'Geschäftsführer',
      content:
        'Professioneller Ansatz und qualitativ hochwertige Arbeit. Wir haben die Website pünktlich und genau nach unseren Vorstellungen erhalten. Wir empfehlen wärmstens!',
      rating: 5,
      avatar: '/avatars/jan-novak.jpg',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Maria Schmidt',
      company: 'Beauty Salon Schmidt',
      position: 'Inhaberin',
      content:
        'Großartige Zusammenarbeit von Anfang bis Ende. Die Website ist modern, schnell und bringt uns neue Kunden. Danke!',
      rating: 5,
      avatar: '/avatars/marie-svobodova.jpg',
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Peter Schwarz',
      company: 'Schwarz Consulting',
      position: 'Berater',
      content:
        'Ausgezeichnete Arbeit mit Respekt für unsere Anforderungen. Die Website ist funktional und sieht professionell aus. Wir werden definitiv wieder zusammenarbeiten.',
      rating: 5,
      avatar: '/avatars/petr-cerny.jpg',
      date: '2024-01-05'
    }
  ]
}

const sampleFAQData = {
  cs: [
    {
      id: '1',
      question: 'Jak dlouho trvá vytvoření webu?',
      answer:
        'Doba vytvoření závisí na složitosti projektu. Jednoduché weby dodáváme do 2 týdnů, složitější projekty do 4-6 týdnů.',
      category: 'Časové údaje'
    },
    {
      id: '2',
      question: 'Můžete upravit existující web?',
      answer:
        'Ano, rádi vám pomůžeme s úpravami existujícího webu. Můžeme přidat nové funkce, upravit design nebo optimalizovat výkon.',
      category: 'Služby'
    },
    {
      id: '3',
      question: 'Jaké jsou možnosti platby?',
      answer:
        'Přijímáme platby bankovním převodem, kartou nebo hotově. Pro větší projekty nabízíme možnost splátek.',
      category: 'Platby'
    },
    {
      id: '4',
      question: 'Poskytujete technickou podporu?',
      answer:
        'Ano, všechny naše balíčky obsahují technickou podporu. Můžeme vám pomoci s údržbou, aktualizacemi a řešením problémů.',
      category: 'Podpora'
    },
    {
      id: '5',
      question: 'Můžete integrovat e-shop?',
      answer:
        'Ano, nabízíme kompletní e-shop řešení s platebními bránami, správou zboží a objednávek.',
      category: 'Služby'
    }
  ],
  en: [
    {
      id: '1',
      question: 'How long does it take to create a website?',
      answer:
        'The creation time depends on the complexity of the project. We deliver simple websites within 2 weeks, more complex projects within 4-6 weeks.',
      category: 'Timeline'
    },
    {
      id: '2',
      question: 'Can you modify an existing website?',
      answer:
        'Yes, we are happy to help you modify an existing website. We can add new features, modify the design or optimize performance.',
      category: 'Services'
    },
    {
      id: '3',
      question: 'What are the payment options?',
      answer:
        'We accept payments by bank transfer, card or cash. For larger projects we offer installment options.',
      category: 'Payments'
    },
    {
      id: '4',
      question: 'Do you provide technical support?',
      answer:
        'Yes, all our packages include technical support. We can help you with maintenance, updates and troubleshooting.',
      category: 'Support'
    },
    {
      id: '5',
      question: 'Can you integrate an e-shop?',
      answer:
        'Yes, we offer complete e-shop solutions with payment gateways, product management and order management.',
      category: 'Services'
    }
  ],
  de: [
    {
      id: '1',
      question: 'Wie lange dauert es, eine Website zu erstellen?',
      answer:
        'Die Erstellungszeit hängt von der Komplexität des Projekts ab. Einfache Websites liefern wir innerhalb von 2 Wochen, komplexere Projekte innerhalb von 4-6 Wochen.',
      category: 'Zeitrahmen'
    },
    {
      id: '2',
      question: 'Können Sie eine bestehende Website bearbeiten?',
      answer:
        'Ja, wir helfen Ihnen gerne bei der Bearbeitung einer bestehenden Website. Wir können neue Funktionen hinzufügen, das Design ändern oder die Leistung optimieren.',
      category: 'Dienstleistungen'
    },
    {
      id: '3',
      question: 'Welche Zahlungsmöglichkeiten gibt es?',
      answer:
        'Wir akzeptieren Zahlungen per Banküberweisung, Karte oder Bargeld. Für größere Projekte bieten wir Ratenzahlungen an.',
      category: 'Zahlungen'
    },
    {
      id: '4',
      question: 'Bieten Sie technischen Support an?',
      answer:
        'Ja, alle unsere Pakete beinhalten technischen Support. Wir können Ihnen bei Wartung, Updates und Fehlerbehebung helfen.',
      category: 'Support'
    },
    {
      id: '5',
      question: 'Können Sie einen E-Shop integrieren?',
      answer:
        'Ja, wir bieten komplette E-Shop-Lösungen mit Zahlungsgateways, Produktverwaltung und Bestellverwaltung an.',
      category: 'Dienstleistungen'
    }
  ]
}

export function ComponentExamples() {
  const t = useTranslations('callToAction')
  const pathname = usePathname()
  const locale = (pathname.split('/')[1] || 'cs') as 'cs' | 'en' | 'de'

  // Helper function to get localized data
  const getLocalizedData = (data: Record<'cs' | 'en' | 'de', any[]>): any[] => {
    return data[locale] || data.cs
  }

  return (
    <div className='min-h-screen bg-background py-8 sm:py-12'>
      <div className='mx-auto max-w-7xl space-y-12 px-4 sm:space-y-16 sm:px-6 lg:px-8'>
        {/* WhatsApp Button */}
        <ScrollReveal {...ScrollRevealVariants.fade} delay={100}>
          <WhatsAppButton
            phoneNumber='+420 723 456 789'
            message='Dobrý den, rád/a bych se zeptal/a na vaše služby.'
          />
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal {...ScrollRevealVariants.fadeUp} delay={200}>
          <section>
            <h2 className='mb-6 text-center text-xl font-bold text-primary sm:mb-8 sm:text-2xl'>
              Call to Action
            </h2>
            <CallToAction
              phoneNumber='+420 123 456 789'
              email='info@firma.cz'
              title={t('title')}
              description={t('description')}
            />
          </section>
        </ScrollReveal>

        {/* Pricing Table */}
        <ScrollReveal {...ScrollRevealVariants.fadeUp} delay={100}>
          <section>
            <h2 className='mb-6 text-center text-xl font-bold text-primary sm:mb-8 sm:text-2xl'>
              Ceník služeb
            </h2>
            <PricingTable
              items={getLocalizedData(samplePricingData)}
              downloadUrl='/cenik-sluzeb.pdf'
            />
          </section>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal {...ScrollRevealVariants.fadeLeft} delay={150}>
          <section>
            <h2 className='mb-6 text-center text-xl font-bold text-primary sm:mb-8 sm:text-2xl'>
              Reference klientů
            </h2>
            <Testimonials
              testimonials={getLocalizedData(sampleTestimonialsData)}
            />
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal {...ScrollRevealVariants.fadeRight} delay={100}>
          <section>
            <h2 className='mb-6 text-center text-xl font-bold text-primary sm:mb-8 sm:text-2xl'>
              FAQ sekce
            </h2>
            <FAQ items={getLocalizedData(sampleFAQData)} grouped={true} />
          </section>
        </ScrollReveal>

        {/* WhatsApp Button - inline example */}
        <ScrollReveal {...ScrollRevealVariants.fade} delay={200}>
          <section>
            <h2 className='mb-6 text-center text-xl font-bold text-primary sm:mb-8 sm:text-2xl'>
              WhatsApp Button
            </h2>
            <div className='text-center'>
              <WhatsAppButton
                phoneNumber='+420 123 456 789'
                message='Dobrý den, rád/a bych se zeptal/a na vaše služby.'
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal {...ScrollRevealVariants.slow} delay={100}>
          <section>
            <h2 className='mb-6 text-center text-xl font-bold text-primary sm:mb-8 sm:text-2xl'>
              Google Maps
            </h2>
            <div className='space-y-6'>
              <ScrollReveal {...ScrollRevealVariants.fadeUp} delay={200}>
                <div>
                  <h3 className='mb-3 text-lg font-semibold text-primary'>
                    Praha
                  </h3>
                  <Map src={MapLocations.prague} height='300px' />
                </div>
              </ScrollReveal>
              <ScrollReveal {...ScrollRevealVariants.fadeUp} delay={300}>
                <div>
                  <h3 className='mb-3 text-lg font-semibold text-primary'>
                    Brno
                  </h3>
                  <Map src={MapLocations.brno} height='300px' />
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
