// Fuente única de verdad para el orden canónico de secciones.
// Consumida por Navbar (scroll-spy + links) y Footer (links).
// SectionHeading.number en cada sección debe coincidir con `num`.

export const NAV_ITEMS = [
  { id: 'about',      num: '01', labelKey: 'nav.about'      },
  { id: 'skills',     num: '02', labelKey: 'nav.skills'     },
  { id: 'experience', num: '03', labelKey: 'nav.experience' },
  { id: 'projects',   num: '04', labelKey: 'nav.projects'   },
  { id: 'contact',    num: '05', labelKey: 'nav.contact'    },
] as const

export type SectionId = typeof NAV_ITEMS[number]['id']
