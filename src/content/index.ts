/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT ACCESSORS
   Funciones accesoras tipadas para toda la capa de contenido.

   INTENCIÓN DE DISEÑO: estas funciones son el único punto de contacto entre
   los componentes y la fuente de datos. Hoy retornan datos locales (archivos
   TypeScript). En el futuro, pueden ser reemplazadas por llamadas a una API
   REST, un CMS headless o una base de datos — sin tocar ningún componente.

   Patrón de migración sugerido:
     export async function getProjects(): Promise<Project[]> {
       const res = await fetch('/api/projects')
       return res.json()
     }
   ───────────────────────────────────────────────────────────────────────────── */

import { heroData }          from './data/hero'
import { aboutData }         from './data/about'
import { experienceData }    from './data/experience'
import { projectsData }      from './data/projects'
import { skillsData, skillCategories } from './data/skills'
import { contactLinksData }  from './data/contact'

import type {
  HeroData,
  AboutData,
  Certification,
  WorkExperience,
  Project,
  Skill,
  SkillLevel,
  SkillCategory,
  SkillCategoryMeta,
  Social,
  Platform,
  ContactLink,
  ContactLinkType,
} from './types'

export type { HeroData, AboutData, Certification, WorkExperience, Project, Skill, SkillLevel, SkillCategory, SkillCategoryMeta, Social, Platform, ContactLink, ContactLinkType }

/** Datos del hero (nombre, avatar, socials, stack destacado). */
export function getHero(): HeroData {
  return heroData
}

/** Datos estructurados de la sección About (foto, stats, certificaciones). */
export function getAbout(): AboutData {
  return aboutData
}

/** Lista completa de experiencia laboral, ordenada por más reciente primero. */
export function getExperience(): WorkExperience[] {
  return experienceData
}

/** Todos los proyectos. */
export function getProjects(): Project[] {
  return projectsData
}

/** Solo proyectos marcados como `featured: true`. */
export function getFeaturedProjects(): Project[] {
  return projectsData.filter(p => p.featured)
}

/** Todos los skills. */
export function getSkills(): Skill[] {
  return skillsData
}

/** Orden canónico de categorías con sus claves i18n, para construir el grid de Skills. */
export function getSkillCategories(): SkillCategoryMeta[] {
  return skillCategories
}

/** Skills filtrados por categoría. */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skillsData.filter(s => s.category === category)
}

/** Enlaces de contacto directo (email, WhatsApp, LinkedIn, Messenger). */
export function getContactLinks(): ContactLink[] {
  return contactLinksData
}
