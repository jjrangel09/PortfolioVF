interface SectionHeadingProps {
  /** Número de sección, ej. "02". Siempre en monospace + acento. */
  number: string
  /** Título ya traducido que recibe el componente padre. */
  title: string
  className?: string
}

/**
 * Encabezado reutilizable para todas las secciones del portafolio.
 * Establece el patrón visual: número en monospace (acento) + título en sans.
 * El padre es responsable de la animación (framer-motion), no este componente.
 *
 * Uso:
 *   <SectionHeading number="02" title={t('about.section_title')} />
 */
export function SectionHeading({ number, title, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-block lg:mb-block-wide ${className}`}>
      <span className="font-mono text-accent text-xs tracking-[0.3em] block mb-3 select-none">
        {number} /
      </span>
      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight">
        {title}
      </h2>
    </div>
  )
}
