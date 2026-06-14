import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// ── EN resources ────────────────────────────────────────────────────────────
import enCommon     from './locales/en/common.json'
import enHero       from './locales/en/hero.json'
import enAbout      from './locales/en/about.json'
import enExperience from './locales/en/experience.json'
import enProjects   from './locales/en/projects.json'
import enSkills     from './locales/en/skills.json'
import enContact    from './locales/en/contact.json'

// ── ES resources ────────────────────────────────────────────────────────────
import esCommon     from './locales/es/common.json'
import esHero       from './locales/es/hero.json'
import esAbout      from './locales/es/about.json'
import esExperience from './locales/es/experience.json'
import esProjects   from './locales/es/projects.json'
import esSkills     from './locales/es/skills.json'
import esContact    from './locales/es/contact.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    defaultNS: 'common',
    ns: ['common', 'hero', 'about', 'skills', 'experience', 'projects', 'contact'],
    resources: {
      en: {
        common:     enCommon,
        hero:       enHero,
        about:      enAbout,
        skills:     enSkills,
        experience: enExperience,
        projects:   enProjects,
        contact:    enContact,
      },
      es: {
        common:     esCommon,
        hero:       esHero,
        about:      esAbout,
        skills:     esSkills,
        experience: esExperience,
        projects:   esProjects,
        contact:    esContact,
      },
    },
    detection: {
      // Orden: 1) localStorage guardado, 2) preferencia del navegador
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio-lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
  })

export default i18n
