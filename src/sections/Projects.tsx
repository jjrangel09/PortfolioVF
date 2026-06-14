import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiExternalLink, FiPlay, FiGithub } from 'react-icons/fi'
import { getFeaturedProjects, getProjects } from '@/content'
import type { Project } from '@/content'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'

// ── Static data ───────────────────────────────────────────────────────────────

const featuredProjects  = getFeaturedProjects()
const secondaryProjects = getProjects().filter(p => !p.featured)

// ── Section ───────────────────────────────────────────────────────────────────

export function Projects() {
  const { t } = useTranslation('projects')
  const shouldReduceMotion = useReducedMotion()

  const easing = [0.4, 0, 0.2, 1] as [number, number, number, number]

  const headingVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing } },
  }

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 } },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.45, ease: easing } },
  }

  const liveLbl = t('links.live')
  const demoLbl = t('links.demo')
  const repoLbl = t('links.repo')

  return (
    <Section id="projects" label={t('section_title')}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={headingVariants}
      >
        <SectionHeading number="04" title={t('section_title')} />
      </motion.div>

      {/* ── Featured grid ──────────────────────────────────────────────────── */}
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-card lg:gap-card-wide mb-24 lg:mb-32"
        role="list"
      >
        {featuredProjects.map(project => (
          <motion.li key={project.id} variants={itemVariants} className="flex">
            <FeaturedCard
              project={project}
              title={t(`${project.id}.title`)}
              desc={t(`${project.id}.desc`)}
              liveLbl={liveLbl}
              demoLbl={demoLbl}
              repoLbl={repoLbl}
            />
          </motion.li>
        ))}
      </motion.ul>

      {/* ── Secondary list ─────────────────────────────────────────────────── */}
      {secondaryProjects.length > 0 && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={container}
        >
          <p className="font-mono text-[0.7rem] text-muted tracking-[0.2em] uppercase mb-6 select-none">
            {t('other_label')}
          </p>
          <ul className="flex flex-col">
            {secondaryProjects.map(project => (
              <motion.li key={project.id} variants={itemVariants}>
                <SecondaryRow
                  project={project}
                  title={t(`${project.id}.title`)}
                  liveLbl={liveLbl}
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </Section>
  )
}

// ── Featured card ─────────────────────────────────────────────────────────────

interface FeaturedCardProps {
  project: Project
  title: string
  desc: string
  liveLbl: string
  demoLbl: string
  repoLbl: string
}

function FeaturedCard({ project, title, desc, liveLbl, demoLbl, repoLbl }: FeaturedCardProps) {
  return (
    <article className="
      group flex flex-col w-full
      bg-surface border border-border rounded-xl overflow-hidden
      hover:border-accent/30 transition-colors duration-slow
    ">
      {/* Image / Logo */}
      {project.imageUrl && project.imageMode === 'logo' ? (
        <div className="flex items-center justify-center aspect-[4/3] shrink-0 bg-canvas border-b border-border px-10">
          <img
            src={project.imageUrl}
            alt=""
            aria-hidden
            loading="lazy"
            decoding="async"
            className="max-h-14 w-full max-w-[220px] object-contain"
          />
        </div>
      ) : project.imageUrl ? (
        <div className="relative aspect-[4/3] overflow-hidden shrink-0 bg-surface">
          <img
            src={project.imageUrl}
            alt=""
            aria-hidden
            width={600}
            height={450}
            loading="lazy"
            decoding="async"
            className="
              w-full h-full object-cover
              grayscale group-hover:grayscale-0
              transition-[filter] duration-slow
            "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent pointer-events-none" />
        </div>
      ) : null}

      {/* Content */}
      <div className="flex flex-col flex-1 p-inset lg:p-inset-wide gap-4">
        <span className="font-mono text-[0.65rem] text-muted">{project.year}</span>

        <h3 className="text-base font-semibold text-foreground leading-snug">{title}</h3>

        <p className="text-muted text-sm leading-relaxed flex-1">{desc}</p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="font-mono text-[0.65rem] text-accent/75 bg-accent-dim border border-accent/10 px-2 py-[3px] rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links — only rendered when at least one URL exists */}
        {(project.links.live ?? project.links.demo ?? project.links.repo) && (
          <div className="flex items-center gap-5 pt-1">
            {project.links.live && (
              <ExtBtn href={project.links.live} label={liveLbl}>
                <FiExternalLink size={13} />
                <span>{liveLbl}</span>
              </ExtBtn>
            )}
            {project.links.demo && (
              <ExtBtn href={project.links.demo} label={demoLbl}>
                <FiPlay size={13} />
                <span>{demoLbl}</span>
              </ExtBtn>
            )}
            {project.links.repo && (
              <ExtBtn href={project.links.repo} label={repoLbl}>
                <FiGithub size={13} />
                <span>{repoLbl}</span>
              </ExtBtn>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

// ── Secondary row ─────────────────────────────────────────────────────────────

interface SecondaryRowProps {
  project: Project
  title: string
  liveLbl: string
}

function SecondaryRow({ project, title, liveLbl }: SecondaryRowProps) {
  const href = project.links.live ?? project.links.demo ?? project.links.repo

  return (
    <div className="group flex items-baseline justify-between gap-4 py-5 border-b border-border last:border-0">
      <div className="flex items-baseline gap-5 min-w-0 flex-1">
        <span className="font-mono text-xs text-muted shrink-0 tabular-nums">{project.year}</span>
        <span className="text-sm font-medium text-foreground/75 group-hover:text-foreground transition-colors duration-fast truncate">
          {title}
        </span>
        <div className="hidden sm:flex gap-2 shrink-0">
          {project.stack.slice(0, 3).map(tech => (
            <span key={tech} className="font-mono text-[0.6rem] text-muted border border-border px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={liveLbl}
          className="text-muted hover:text-accent transition-colors duration-fast shrink-0"
        >
          <FiExternalLink size={14} />
        </a>
      )}
    </div>
  )
}

// ── Shared link button ────────────────────────────────────────────────────────

interface ExtBtnProps {
  href: string
  label: string
  children: ReactNode
}

function ExtBtn({ href, label, children }: ExtBtnProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-accent transition-colors duration-fast"
    >
      {children}
    </a>
  )
}
