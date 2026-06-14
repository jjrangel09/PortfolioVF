import { useTranslation } from 'react-i18next'
import { BsLinkedin, BsGithub } from 'react-icons/bs'
import { getHero } from '@/content'
import type { Social } from '@/content'
import { ParticleField } from '@/components/ParticleField'

const SOCIAL_ICONS: Partial<Record<Social['platform'], React.ReactNode>> = {
  linkedin: <BsLinkedin size={18} />,
  github:   <BsGithub size={18} />,
}

export function Hero() {
  const { t }  = useTranslation('hero')
  const { t: tc } = useTranslation('common')
  const hero   = getHero()

  return (
    <section
      id="home"
      className="relative min-h-svh overflow-hidden"
    >
      {/* ── Capa de fondo: partículas (z-0, decorativa) ── */}
      <ParticleField />

      {/* ── Capa de contenido: siempre por encima del canvas (z-10) ── */}
      <div className="
        relative z-10
        flex flex-col justify-center
        min-h-svh
        px-6 sm:px-12 lg:px-24 xl:px-40
        pt-24 pb-16
      ">

        {/* Section index */}
        <span className="font-mono text-accent text-xs tracking-[0.3em] mb-10 select-none">
          01 /
        </span>

        {/* Greeting */}
        <p className="font-mono text-muted text-sm mb-3 tracking-wide">
          {t('greeting')}
        </p>

        {/* Name */}
        <h1 className="
          text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
          font-semibold text-foreground leading-[1.05] tracking-tight
          mb-4
        ">
          {hero.name}
        </h1>

        {/* Role */}
        <h2 className="
          text-xl sm:text-2xl lg:text-3xl
          font-light text-muted leading-snug
          mb-8 max-w-2xl
        ">
          {t('role')}
        </h2>

        {/* Positioning statement */}
        <p className="text-muted text-base lg:text-lg leading-relaxed max-w-xl mb-10">
          {t('positioning')}
        </p>

        {/* Availability badge */}
        <div className="flex items-center gap-2 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            {hero.availableForWork && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${hero.availableForWork ? 'bg-accent' : 'bg-red-500'}`} />
          </span>
          <span className={`font-mono text-xs tracking-wide ${hero.availableForWork ? 'text-accent' : 'text-red-400'}`}>
            {hero.availableForWork ? tc('availability') : tc('not_available')}
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-14">
          <a
            href={hero.cvUrl}
            download
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              bg-accent text-canvas font-medium text-sm
              hover:bg-accent/90
              transition-colors duration-[--duration-base]
            "
          >
            {tc('download_cv')}
          </a>
          <a
            href="#contact"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              border border-accent text-accent text-sm
              hover:bg-accent/10
              transition-colors duration-[--duration-base]
            "
          >
            {tc('get_in_touch')}
          </a>
        </div>

        {/* Featured stack */}
        <div className="mb-10">
          <p className="font-mono text-xs text-muted tracking-widest mb-3 uppercase">
            {t('stack_label')}
          </p>
          <div className="flex flex-wrap gap-2">
            {hero.featuredStack.map(tech => {
              const isLearning = tech.endsWith('*')
              const label = isLearning ? tech.slice(0, -1) : tech
              return (
                <span
                  key={tech}
                  className={`
                    font-mono text-xs px-3 py-1 rounded-full border
                    transition-colors duration-[--duration-base]
                    ${isLearning
                      ? 'border-border text-muted/60 italic'
                      : 'border-border text-muted hover:border-accent hover:text-accent'
                    }
                  `}
                >
                  {label}
                  {isLearning && <span className="ml-1 text-accent not-italic">*</span>}
                </span>
              )
            })}
          </div>
          <p className="font-mono text-xs text-muted/50 mt-2">{t('web3_note')}</p>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-5">
          {hero.socials.map(social => {
            const icon = SOCIAL_ICONS[social.platform]
            if (!icon) return null
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="text-muted hover:text-accent transition-colors duration-[--duration-base]"
              >
                {icon}
              </a>
            )
          })}
        </div>

        {/* Scroll hint */}
        <div className="
          absolute bottom-10 right-6 lg:right-16
          hidden sm:flex flex-col items-center gap-3
          font-mono text-xs text-muted tracking-widest select-none
        ">
          <span className="rotate-90">scroll</span>
          <span className="w-px h-12 bg-gradient-to-b from-muted/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
