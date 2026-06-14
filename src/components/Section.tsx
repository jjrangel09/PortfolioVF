import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** Texto para aria-label — suele ser el título traducido de la sección. */
  label: string
  children: ReactNode
  /** Clases extras para el elemento <section> — ej. "relative overflow-hidden". */
  className?: string
}

/**
 * Wrapper reutilizable para todas las secciones del portafolio.
 * Encapsula:
 *   • Padding vertical:    py-section  → lg:py-section-wide  (tokens del tema)
 *   • Padding horizontal:  px-6 → sm:px-12 → lg:px-20       (escala Tailwind)
 *   • Max-width centrado:  max-w-6xl mx-auto
 *
 * Uso:
 *   <Section id="skills" label={t('section_title')}>…</Section>
 */
export function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`
        py-section lg:py-section-wide
        px-6 sm:px-12 lg:px-20
        max-w-6xl mx-auto
        scroll-mt-20
        ${className}
      `.trim()}
    >
      {children}
    </section>
  )
}
