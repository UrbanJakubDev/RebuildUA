import { SimplePageWrapper } from '@/src/components/PageWrapper'
import {
  AnimatedSection,
  AnimatedHero,
  AnimatedCard,
  AnimatedText
} from '@/src/components/AnimatedSection'
import React from 'react'

export default function CompanyPage({
  params
}: {
  params: { company: string; locale: string }
}): JSX.Element {
  return (
    <SimplePageWrapper showBreadcrumbs={false}>
      <div>
        {/* Hero Section */}
        <AnimatedHero className='px-4 py-20'>
          <div className='mx-auto max-w-6xl text-center'>
            <h1 className='mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent md:text-7xl'>
              {params.company}
            </h1>
            <p className='mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl'>
              Inovativní řešení pro moderní energetiku. Spojujeme tradici s
              budoucností, vytváříme udržitelné energetické systémy pro příští
              generace.
            </p>
          </div>
        </AnimatedHero>

        {/* Statistics Section */}
        <AnimatedSection
          animation='fadeUp'
          delay={200}
          className='bg-gray-50 py-16'
        >
          <div className='mx-auto max-w-6xl px-4'>
            <div className='grid grid-cols-1 gap-8 text-center md:grid-cols-3'>
              <div className='rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-2 text-4xl font-bold text-blue-600'>
                  150+
                </div>
                <div className='text-gray-600'>Projektů realizováno</div>
              </div>
              <div className='rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-2 text-4xl font-bold text-green-600'>
                  25 MW
                </div>
                <div className='text-gray-600'>Celková kapacita</div>
              </div>
              <div className='rounded-lg bg-white p-8 shadow-lg'>
                <div className='mb-2 text-4xl font-bold text-purple-600'>
                  15 let
                </div>
                <div className='text-gray-600'>Zkušeností v oboru</div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 1 - Text Left, Image Right */}
        <AnimatedSection
          animation='fadeLeft'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div>
                <div className='mb-4 text-sm font-semibold text-blue-600'>
                  01
                </div>
                <h2 className='mb-6 text-4xl font-bold'>Naše mise</h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  Jsme průkopníci v oblasti obnovitelných zdrojů energie. Naše
                  mise je vytvořit udržitelnou energetickou budoucnost
                  prostřednictvím inovativních technologií a inteligentních
                  řešení.
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  Kombinujeme letité zkušenosti s nejmodernějšími technologiemi,
                  abychom poskytovali našim klientům nejlepší možné řešení pro
                  jejich energetické potřeby.
                </p>
              </div>
              <div className='relative'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100'>
                  <div className='text-6xl'>⚡</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 2 - Image Left, Text Right */}
        <AnimatedSection
          animation='fadeRight'
          delay={100}
          className='bg-gray-50 px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div className='relative order-2 lg:order-1'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-blue-100'>
                  <div className='text-6xl'>🌱</div>
                </div>
              </div>
              <div className='order-1 lg:order-2'>
                <div className='mb-4 text-sm font-semibold text-green-600'>
                  02
                </div>
                <h2 className='mb-6 text-4xl font-bold'>Udržitelnost</h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  Věříme v sílu obnovitelných zdrojů energie. Naše řešení jsou
                  navržena tak, aby minimalizovala dopad na životní prostředí a
                  maximalizovala energetickou účinnost.
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  Každý projekt realizujeme s ohledem na dlouhodobou
                  udržitelnost a pozitivní dopad na komunitu a životní
                  prostředí.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 3 - Text Left, Image Right */}
        <AnimatedSection
          animation='fadeLeft'
          delay={100}
          className='px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div>
                <div className='mb-4 text-sm font-semibold text-purple-600'>
                  03
                </div>
                <h2 className='mb-6 text-4xl font-bold'>Inovace</h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  Neustále investujeme do výzkumu a vývoje nových technologií.
                  Naše týmy pracují na řešeních, která posouvají hranice toho,
                  co je v energetice možné.
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  Používáme nejmodernější technologie včetně umělé inteligence a
                  machine learningu pro optimalizaci energetických systémů.
                </p>
              </div>
              <div className='relative'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100'>
                  <div className='text-6xl'>🚀</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Section 4 - Image Left, Text Right */}
        <AnimatedSection
          animation='fadeRight'
          delay={100}
          className='bg-gray-50 px-4 py-20'
        >
          <div className='mx-auto max-w-6xl'>
            <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
              <div className='relative order-2 lg:order-1'>
                <div className='flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-red-100'>
                  <div className='text-6xl'>🤝</div>
                </div>
              </div>
              <div className='order-1 lg:order-2'>
                <div className='mb-4 text-sm font-semibold text-orange-600'>
                  04
                </div>
                <h2 className='mb-6 text-4xl font-bold'>Partnerství</h2>
                <p className='mb-6 text-lg leading-relaxed text-gray-600'>
                  Věříme v sílu spolupráce. Naši klienti jsou pro nás partnery,
                  se kterými budujeme dlouhodobé vztahy založené na důvěře a
                  vzájemném prospěchu.
                </p>
                <p className='text-lg leading-relaxed text-gray-600'>
                  Poskytujeme komplexní podporu od počátečního plánování až po
                  dlouhodobý provoz a údržbu energetických systémů.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection animation='fadeUp' delay={200} className='px-4 py-20'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-16 text-center'>
              <h2 className='mb-6 text-4xl font-bold'>Naše služby</h2>
              <p className='mx-auto max-w-3xl text-xl text-gray-600'>
                Poskytujeme komplexní energetická řešení pro různé typy projektů
              </p>
            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <AnimatedCard
                delay={100}
                className='rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl'
              >
                <div className='mb-4 text-4xl'>🔧</div>
                <h3 className='mb-4 text-xl font-bold'>Instalace systémů</h3>
                <p className='text-gray-600'>
                  Kompletní instalace energetických systémů s garancí kvality a
                  spolehlivosti.
                </p>
              </AnimatedCard>
              <AnimatedCard
                delay={200}
                className='rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl'
              >
                <div className='mb-4 text-4xl'>📊</div>
                <h3 className='mb-4 text-xl font-bold'>Monitoring</h3>
                <p className='text-gray-600'>
                  Nepřetržité sledování výkonu a optimalizace energetických
                  systémů.
                </p>
              </AnimatedCard>
              <AnimatedCard
                delay={300}
                className='rounded-lg bg-white p-8 shadow-lg transition-shadow hover:shadow-xl'
              >
                <div className='mb-4 text-4xl'>🛠️</div>
                <h3 className='mb-4 text-xl font-bold'>Údržba</h3>
                <p className='text-gray-600'>
                  Preventivní a opravárenská údržba pro maximální životnost
                  systémů.
                </p>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection
          animation='fadeUp'
          delay={200}
          className='bg-gray-50 px-4 py-20'
        >
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='mb-6 text-4xl font-bold'>Zaujali jsme vás?</h2>
            <p className='mb-8 text-xl text-gray-600'>
              Kontaktujte nás a společně najdeme nejlepší řešení pro vaše
              energetické potřeby
            </p>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 text-3xl'>📞</div>
                <h3 className='mb-2 font-bold'>Telefon</h3>
                <p className='text-gray-600'>+420 123 456 789</p>
              </div>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 text-3xl'>✉️</div>
                <h3 className='mb-2 font-bold'>Email</h3>
                <p className='text-gray-600'>
                  info@{params.company.toLowerCase()}.cz
                </p>
              </div>
              <div className='rounded-lg bg-white p-6 shadow-lg'>
                <div className='mb-4 text-3xl'>📍</div>
                <h3 className='mb-2 font-bold'>Adresa</h3>
                <p className='text-gray-600'>Praha, Česká republika</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </SimplePageWrapper>
  )
}
