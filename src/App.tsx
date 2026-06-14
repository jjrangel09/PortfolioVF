import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navbar }     from '@/components/Navbar'
import { Footer }     from '@/components/Footer'
import { Hero }       from '@/sections/Hero'
import { About }      from '@/sections/About'
import { Skills }     from '@/sections/Skills'
import { Experience } from '@/sections/Experience'
import { Projects }   from '@/sections/Projects'
import { Contact }    from '@/sections/Contact'

export default function App() {
  const { i18n } = useTranslation()

  // Sync <html lang=""> attribute whenever the user switches language.
  // Keeps accessibility tree and search engine signals correct without SSR.
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? 'en'
  }, [i18n.resolvedLanguage])

  return (
    <div className="bg-canvas min-h-svh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
