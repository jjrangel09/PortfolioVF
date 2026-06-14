import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getExperience } from '@/content'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'

const experiences = getExperience()

export function Experience() {
  const { t, i18n } = useTranslation('experience')
  const shouldReduceMotion = useReducedMotion()

  function formatDate(date: string | null): string {
    if (!date) return t('present')
    const [y, m] = date.split('-').map(Number)
    return new Date(y, m - 1, 1).toLocaleDateString(
      i18n.resolvedLanguage ?? 'en',
      { month: 'short', year: 'numeric' }
    )
  }

  const easing = [0.4, 0, 0.2, 1] as [number, number, number, number]

  const headingVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing } },
  }

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  }

  const entryVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing } },
  }

  return (
    <Section id="experience" label={t('section_title')}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={headingVariants}
      >
        <SectionHeading number="03" title={t('section_title')} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={container}
        className="max-w-2xl"
      >
        {experiences.map((exp, i) => {
          const isLast    = i === experiences.length - 1
          const bullets   = t(exp.descriptionKey, { returnObjects: true }) as unknown as string[]
          const dateRange = `${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}`

          return (
            <motion.div
              key={exp.id}
              variants={entryVariants}
              className="relative pl-12 pb-24 last:pb-0"
            >
              {/* Vertical connector to next entry */}
              {!isLast && (
                <div
                  aria-hidden
                  className="absolute left-[13px] top-9 bottom-0 w-px bg-border"
                />
              )}

              {/* Timeline dot */}
              <div
                aria-hidden
                className="absolute left-0 top-[3px] w-7 h-7 rounded-full bg-canvas border border-accent/50 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-accent" />
              </div>

              {/* Date + type badge */}
              <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mb-2">
                <span className="font-mono text-xs text-muted">{dateRange}</span>
                <span className="font-mono text-[0.6rem] leading-none text-muted border border-border px-2 py-[3px] rounded-full">
                  {t(`types.${exp.type}`)}
                </span>
              </div>

              {/* Company */}
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-medium text-accent hover:text-accent/70 transition-colors duration-fast text-sm mb-1.5"
                >
                  {exp.company}
                </a>
              ) : (
                <p className="font-medium text-accent text-sm mb-1.5">{exp.company}</p>
              )}

              {/* Role title */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-tight mb-6">
                {t(exp.titleKey)}
              </h3>

              {/* Achievement bullets */}
              {Array.isArray(bullets) && bullets.length > 0 && (
                <ul className="flex flex-col gap-5 mb-6">
                  {bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 text-muted text-sm leading-relaxed">
                      <span aria-hidden className="text-accent shrink-0 mt-[3px] select-none">▹</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {exp.stack.map(tech => (
                  <span
                    key={tech}
                    className="font-mono text-[0.7rem] text-accent/80 bg-accent-dim border border-accent/10 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
