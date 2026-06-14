import type { Certification } from '@/content'
import { useReducedMotion, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getAbout } from '@/content'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'

const about = getAbout()

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function About() {
  const { t } = useTranslation('about')
  const shouldReduceMotion = useReducedMotion()

  const easing = [0.4, 0, 0.2, 1] as [number, number, number, number]
  const transition = { duration: shouldReduceMotion ? 0 : 0.5, ease: easing }

  return (
    <Section id="about" label={t('section_title')}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        transition={transition}
      >
        <SectionHeading number="01" title={t('section_title')} />
      </motion.div>

      {/* Two-column layout: photo | content */}
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-28 items-start">

        {/* ── Photo ─────────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-64 sm:w-72 lg:w-full max-w-xs shrink-0">
            {/* Offset accent frame */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-xl border border-accent/30 translate-x-3 translate-y-3 pointer-events-none"
            />
            <img
              src={about.photoUrl}
              alt={t('photo_alt')}
              width={576}
              height={576}
              loading="lazy"
              decoding="async"
              className="
                relative w-full aspect-square object-cover rounded-xl
                grayscale hover:grayscale-0
                transition-[filter] duration-slow
                border border-border
              "
            />
          </div>
        </motion.div>

        {/* ── Content ───────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.2 }}
          className="flex flex-col gap-12"
        >
          {/* Headline */}
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-prose">
            {t('headline')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            <StatCard value={about.yearsOfExperience} label={t('stats.years.label')} />
            <StatCard value={about.companiesCount}    label={t('stats.companies.label')} />
            <StatCard value={about.projectsCount}     label={t('stats.projects.label')} />
          </div>

          {/* Certifications */}
          {about.certifications.length > 0 && (
            <div>
              <p className="text-xs font-mono text-muted tracking-widest uppercase mb-5">
                {t('certifications.label')}
              </p>
              <ul className="flex flex-col gap-4">
                {about.certifications.map(cert => (
                  <li key={cert.id}>
                    {cert.credentialUrl ? (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 w-fit"
                      >
                        <CertBadge badge={cert.badge} />
                        <CertInfo cert={cert} />
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">
                        <CertBadge badge={cert.badge} />
                        <CertInfo cert={cert} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </Section>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: number; label: string }) {
  const lines = label.split('\n')
  return (
    <div className="border-l-2 border-accent pl-4 py-1">
      <p className="text-3xl font-semibold text-foreground tabular-nums leading-none mb-2">
        {value}<span className="text-accent">+</span>
      </p>
      <p className="text-muted text-xs leading-snug whitespace-pre-line">
        {lines.map((line, i) => (
          <span key={i} className={i === 0 ? 'font-medium text-foreground/80' : ''}>
            {line}{i < lines.length - 1 ? '\n' : ''}
          </span>
        ))}
      </p>
    </div>
  )
}

function CertBadge({ badge }: { badge: string }) {
  return (
    <span className="
      inline-flex items-center justify-center shrink-0
      w-11 h-11 rounded-lg
      bg-accent-dim border border-accent/20
      font-mono text-accent text-[0.6rem] font-semibold tracking-wide
      select-none
    ">
      {badge}
    </span>
  )
}

function CertInfo({ cert }: { cert: Certification }) {
  return (
    <div className="min-w-0">
      <p className="text-foreground text-sm font-medium leading-snug group-hover:text-accent transition-colors duration-fast">
        {cert.name}
      </p>
      <p className="text-muted text-xs mt-0.5">
        {cert.issuer}{cert.year ? ` · ${cert.year}` : ''}
      </p>
    </div>
  )
}
