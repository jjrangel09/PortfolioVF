/* ─────────────────────────────────────────────────────────────────────────────
   CONTENT TYPES
   Separan datos ESTRUCTURADOS (tipados aquí) de textos TRADUCIBLES (claves i18n).
   Las funciones accesoras en index.ts están diseñadas para que la fuente de datos
   pueda cambiar de archivos locales a una API REST sin modificar los componentes.
   ───────────────────────────────────────────────────────────────────────────── */

export type Platform = 'github' | 'linkedin' | 'twitter' | 'email' | 'youtube'

export interface Social {
  platform: Platform
  url: string
  handle: string
}

export interface HeroData {
  name: string
  /** Ruta a la foto de perfil; null = usa iniciales como fallback */
  avatarUrl: string | null
  availableForWork: boolean
  cvUrl: string
  socials: Social[]
  /** Tecnologías destacadas que aparecen como badges en el hero */
  featuredStack: string[]
}

// ── Experience ──────────────────────────────────────────────────────────────

export type EmploymentType = 'fulltime' | 'contract' | 'freelance'

export interface WorkExperience {
  id: string
  company: string
  companyUrl: string | null
  /** Formato YYYY-MM */
  startDate: string
  /** Formato YYYY-MM; null = presente */
  endDate: string | null
  /** Clave i18n para el título del rol */
  titleKey: string
  /** Clave i18n para la descripción de responsabilidades */
  descriptionKey: string
  stack: string[]
  type: EmploymentType
}

// ── Projects ─────────────────────────────────────────────────────────────────

export interface ProjectLinks {
  live: string | null
  repo: string | null
  demo: string | null
}

export interface Project {
  id: string
  /** Clave i18n */
  titleKey: string
  /** Clave i18n */
  descriptionKey: string
  stack: string[]
  links: ProjectLinks
  featured: boolean
  year: number
  imageUrl: string | null
  /** 'cover' = screenshot full-bleed (default); 'logo' = logo centrado en bg-canvas */
  imageMode?: 'cover' | 'logo'
}

// ── Skills ───────────────────────────────────────────────────────────────────

export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'mobile'
  | 'cloud'
  | 'testing'
  | 'tools'
  | 'web3'

export type SkillLevel = 'expert' | 'proficient' | 'learning'

export interface Skill {
  name: string
  category: SkillCategory
  level: SkillLevel
}

/** Metadatos de una categoría: orden de visualización + clave i18n del label. */
export interface SkillCategoryMeta {
  id: SkillCategory
  /** Clave i18n bajo el namespace 'skills', ej. "categories.backend.label" */
  labelKey: string
}

// ── About / Positioning ──────────────────────────────────────────────────────

export interface Certification {
  id: string
  name: string
  issuer: string
  /** Sigla o etiqueta corta para mostrar como badge (ej. "AWS", "SCRUM") */
  badge: string
  /** Clave i18n para descripción opcional */
  descriptionKey: string | null
  credentialUrl: string | null
  year: number | null
}

// ── Contact ──────────────────────────────────────────────────────────────────

export type ContactLinkType = 'email' | 'whatsapp' | 'linkedin' | 'messenger'

export interface ContactLink {
  type: ContactLinkType
  /** URL completa con protocolo. mailto: para email, https:// para el resto. */
  href: string
  /** Clave i18n bajo el namespace 'contact', ej. "links.email" */
  labelKey: string
  /** Identificador visible: dirección, número de teléfono, handle, etc. */
  detail: string
}

// ── About / Positioning ──────────────────────────────────────────────────────

export interface AboutData {
  /** URL de la foto de perfil (importada como asset Vite). */
  photoUrl: string
  location: string
  /** Años de experiencia — aparece en los stats. TODO: actualizar. */
  yearsOfExperience: number
  /** Cantidad de empresas con las que ha trabajado. */
  companiesCount: number
  /** Proyectos entregados aproximados. TODO: actualizar. */
  projectsCount: number
  certifications: Certification[]
}
