import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { getSkills, getSkillCategories } from '@/content'
import type { Skill, SkillLevel } from '@/content'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'

// ── Static data ───────────────────────────────────────────────────────────────

const LEVEL_ORDER: Record<SkillLevel, number> = { expert: 0, proficient: 1, learning: 2 }

const allSkills = getSkills()

const grouped = getSkillCategories()
  .map(meta => ({
    meta,
    skills: allSkills
      .filter(s => s.category === meta.id)
      .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level]),
  }))
  .filter(g => g.skills.length > 0)

// ── Component ─────────────────────────────────────────────────────────────────

export function Skills() {
  const { t } = useTranslation('skills')
  const shouldReduceMotion = useReducedMotion()

  const easing = [0.4, 0, 0.2, 1] as [number, number, number, number]
  const dur    = shouldReduceMotion ? 0 : 0.45

  const headingVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing } },
  }

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.07 } },
  }

  const cardVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: dur, ease: easing } },
  }

  return (
    <Section id="skills" label={t('section_title')}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={headingVariants}
      >
        <SectionHeading number="02" title={t('section_title')} />
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-card lg:gap-card-wide"
        role="list"
      >
        {grouped.map(({ meta, skills }) => (
          <motion.li key={meta.id} variants={cardVariants} className="flex">
            <CategoryCard
              label={t(meta.labelKey)}
              skills={skills}
              learningBadge={t('learning_badge')}
            />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}

// ── Category card ─────────────────────────────────────────────────────────────

interface CategoryCardProps {
  label: string
  skills: Skill[]
  learningBadge: string
}

function CategoryCard({ label, skills, learningBadge }: CategoryCardProps) {
  return (
    <div className="
      w-full bg-surface border border-border rounded-xl
      p-inset lg:p-inset-wide
      hover:border-accent/30 transition-colors duration-slow
    ">
      <h3 className="font-mono text-accent text-[0.7rem] tracking-[0.2em] uppercase mb-6 select-none">
        {label}
      </h3>
      <ul className="flex flex-col gap-3">
        {skills.map(skill => (
          <li key={skill.name} className="flex items-center gap-3 flex-wrap">
            <span className={nameClass(skill.level)}>{skill.name}</span>
            {skill.level === 'learning' && (
              <span className="
                font-mono text-[0.6rem] leading-none whitespace-nowrap shrink-0
                text-muted border border-dashed border-muted/30
                px-2 py-0.5 rounded-full
              ">
                {learningBadge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function nameClass(level: SkillLevel): string {
  const base = 'font-mono text-sm leading-snug'
  if (level === 'expert')     return `${base} text-foreground`
  if (level === 'proficient') return `${base} text-foreground/65`
  return `${base} text-muted`
}
