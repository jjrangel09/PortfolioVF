import { useTranslation } from 'react-i18next'
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiYoutube } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import { getHero } from '@/content'
import type { Platform } from '@/content'
import { NAV_ITEMS } from '@/navigation'

// ── Social icon map ───────────────────────────────────────────────────────────

const SOCIAL_ICONS: Partial<Record<Platform, IconType>> = {
  github:   FiGithub,
  linkedin: FiLinkedin,
  twitter:  FiTwitter,
  email:    FiMail,
  youtube:  FiYoutube,
}

// ── Static data ───────────────────────────────────────────────────────────────

const { socials } = getHero()

// ── Component ─────────────────────────────────────────────────────────────────

export function Footer() {
  const { t } = useTranslation('common')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-12 lg:py-16">

        {/* Top grid: wordmark | nav | socials */}
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 mb-10">

          {/* Wordmark + tagline */}
          <div>
            <p className="font-mono text-sm text-accent tracking-widest mb-2 select-none">
              jjrangel
            </p>
            <p className="font-mono text-[0.68rem] text-muted/70 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label={t('footer.nav_label')} className="flex flex-col gap-2.5">
            {NAV_ITEMS.map(({ id, num, labelKey }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex items-baseline gap-2 w-fit font-mono text-xs text-muted hover:text-foreground transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                <span className="text-[0.58rem] text-accent/30 group-hover:text-accent/60 transition-colors duration-fast">
                  {num}.
                </span>
                {t(labelKey)}
              </a>
            ))}
          </nav>

          {/* Social links */}
          <div>
            <p className="font-mono text-[0.58rem] text-muted/50 tracking-[0.2em] uppercase mb-4 select-none">
              {t('footer.socials_label')}
            </p>
            <ul className="flex items-center gap-4" role="list">
              {socials.map(social => {
                const Icon = SOCIAL_ICONS[social.platform]
                if (!Icon) return null
                return (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.handle}
                      className="block text-muted/70 hover:text-accent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                    >
                      <Icon size={17} />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/25">
          <p className="font-mono text-[0.62rem] text-muted/50 text-center tabular-nums">
            {t('footer.copyright', { year })}
          </p>
        </div>

      </div>
    </footer>
  )
}
