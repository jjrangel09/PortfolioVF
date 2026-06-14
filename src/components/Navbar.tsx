import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'
import { NAV_ITEMS } from '@/navigation'
import type { SectionId } from '@/navigation'

// ── Scroll to section, offset for fixed header ────────────────────────────────

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Navbar() {
  const { t } = useTranslation('common')
  const shouldReduceMotion = useReducedMotion()

  const [scrolled,      setScrolled]      = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)
  const [menuOpen,      setMenuOpen]      = useState(false)

  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const panelRef     = useRef<HTMLDivElement>(null)

  // ── Scroll-based header appearance ────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Scroll-spy: IntersectionObserver detects section in center of viewport ─
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        }
      },
      // A ~5% detection band in the vertical center of the viewport.
      // Ensures exactly one section is active at any scroll position.
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    for (const { id } of NAV_ITEMS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  // ── Mobile menu: Escape + Tab focus trap ──────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }

      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        )
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // ── Mobile menu: move focus to first item on open ─────────────────────────
  useEffect(() => {
    if (!menuOpen) return
    const raf = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus()
    })
    return () => cancelAnimationFrame(raf)
  }, [menuOpen])

  // ── Mobile menu: lock body scroll while open ──────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(id: string) {
    scrollToSection(id)
    setMenuOpen(false)
  }

  const easing = [0.4, 0, 0.2, 1] as [number, number, number, number]
  const dur     = shouldReduceMotion ? 0 : 0.5

  return (
    <>
      {/* ── Fixed header ────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: shouldReduceMotion ? 0 : -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: dur, ease: easing, delay: shouldReduceMotion ? 0 : 0.15 }}
        className={[
          'fixed top-0 inset-x-0 z-50 h-[72px]',
          'flex items-center justify-between',
          'px-6 sm:px-10 lg:px-16',
          'transition-[background-color,border-color,box-shadow] duration-slow',
          scrolled
            ? 'bg-canvas/90 backdrop-blur-md border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.35)]'
            : 'border-b border-transparent',
        ].join(' ')}
      >
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="font-mono text-sm text-accent tracking-widest hover:opacity-70 transition-opacity duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
        >
          jjrangel
        </button>

        {/* Desktop navigation */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ id, num, labelKey }) => {
            const active = activeSection === id
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                aria-current={active ? 'location' : undefined}
                className={[
                  'group flex items-baseline gap-1.5 font-mono text-xs tracking-wide',
                  'transition-colors duration-fast',
                  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm',
                  active ? 'text-accent' : 'text-muted hover:text-foreground',
                ].join(' ')}
              >
                <span className={[
                  'text-[0.6rem] transition-colors duration-fast',
                  active ? 'text-accent' : 'text-accent/35 group-hover:text-accent/60',
                ].join(' ')}>
                  {num}.
                </span>
                {t(labelKey)}
              </button>
            )
          })}
        </nav>

        {/* Right slot: LanguageToggle (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? t('nav.menu_close') : t('nav.menu_open')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-md hover:bg-surface transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <span aria-hidden className={['block w-5 h-px bg-foreground/80 transition-all duration-base origin-center', menuOpen ? 'rotate-45 translate-y-[6px]' : ''].join(' ')} />
            <span aria-hidden className={['block w-4 h-px bg-foreground/80 transition-all duration-base',               menuOpen ? 'opacity-0 scale-x-0'           : ''].join(' ')} />
            <span aria-hidden className={['block w-5 h-px bg-foreground/80 transition-all duration-base origin-center', menuOpen ? '-rotate-45 -translate-y-[6px]' : ''].join(' ')} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-canvas/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              key="panel"
              ref={panelRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.aria_dialog')}
              initial={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 0 : 1 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.28, ease: easing }}
              className={[
                'fixed right-0 top-0 bottom-0 z-50',
                'w-[min(75vw,320px)]',
                'flex flex-col',
                'bg-surface border-l border-border',
                'pt-24 pb-10 px-8',
                'overflow-y-auto',
                'md:hidden',
              ].join(' ')}
            >
              <nav aria-label="Mobile navigation" className="flex flex-col">
                {NAV_ITEMS.map(({ id, num, labelKey }) => {
                  const active = activeSection === id
                  return (
                    <button
                      key={id}
                      onClick={() => handleNavClick(id)}
                      aria-current={active ? 'location' : undefined}
                      className={[
                        'group flex items-center gap-4 w-full text-left',
                        'py-4 border-b border-border/40 last:border-0',
                        'transition-colors duration-fast',
                        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm',
                        active ? 'text-accent' : 'text-muted hover:text-foreground',
                      ].join(' ')}
                    >
                      <span className={[
                        'font-mono text-[0.6rem] transition-colors duration-fast shrink-0',
                        active ? 'text-accent' : 'text-accent/35',
                      ].join(' ')}>
                        {num}.
                      </span>
                      <span className="font-mono text-sm tracking-wide">{t(labelKey)}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="mt-auto pt-8">
                <LanguageToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
