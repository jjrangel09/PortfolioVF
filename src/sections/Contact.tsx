import { useState, useEffect, useRef } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { FiMail, FiLinkedin } from 'react-icons/fi'
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { getContactLinks } from '@/content'
import type { ContactLinkType } from '@/content'
import { Section } from '@/components/Section'
import { SectionHeading } from '@/components/SectionHeading'

// ── Icon map ──────────────────────────────────────────────────────────────────

const LINK_ICONS: Record<ContactLinkType, IconType> = {
  email:     FiMail,
  whatsapp:  FaWhatsapp,
  linkedin:  FiLinkedin,
  messenger: FaFacebookMessenger,
}

// ── Static data ───────────────────────────────────────────────────────────────

const contactLinks = getContactLinks()

// ── Types ─────────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormValues {
  name:    string
  email:   string
  message: string
}

interface FormErrors {
  name?:    string
  email?:   string
  message?: string
}

// ── Input base class ──────────────────────────────────────────────────────────

const inputBase = [
  'w-full rounded-lg border border-border bg-surface',
  'px-4 py-3 text-sm text-foreground placeholder:text-muted/50',
  'transition-colors duration-fast',
  'focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'aria-[invalid=true]:border-red-500/50 aria-[invalid=true]:focus:ring-red-500/20',
].join(' ')

// ── Component ─────────────────────────────────────────────────────────────────

export function Contact() {
  const { t } = useTranslation('contact')
  const shouldReduceMotion = useReducedMotion()

  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const statusRef = useRef<HTMLDivElement>(null)

  // Focus the status message when it appears so keyboard/SR users are aware
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      statusRef.current?.focus()
    }
  }, [status])

  const easing = [0.4, 0, 0.2, 1] as [number, number, number, number]

  // ── Validation ────────────────────────────────────────────────────────────
  function validate(vals: FormValues): FormErrors {
    const errs: FormErrors = {}
    if (!vals.name.trim()) {
      errs.name = t('form.validation.required')
    }
    if (!vals.email.trim()) {
      errs.email = t('form.validation.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) {
      errs.email = t('form.validation.email_invalid')
    }
    if (!vals.message.trim()) {
      errs.message = t('form.validation.required')
    }
    return errs
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues(v => ({ ...v, [field]: value }))
    // Clear error on field when user starts correcting it
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate(values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:  values.name,
          from_email: values.email,
          message:    values.message,
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      setStatus('success')
      setValues({ name: '', email: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  function handleReset() {
    setStatus('idle')
  }

  // ── Animation variants ────────────────────────────────────────────────────

  const headingVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing } },
  }

  const panelVariants = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: easing, delay: shouldReduceMotion ? 0 : delay },
    }),
  }

  return (
    <Section id="contact" label={t('section_title')}>

      {/* Invisible aria-live region — announces status to screen readers */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'success' && `${t('form.success.title')} ${t('form.success.body')}`}
        {status === 'error'   && `${t('form.error.title')} ${t('form.error.body')}`}
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={headingVariants}
      >
        <SectionHeading number="05" title={t('section_title')} />
        <p className="text-muted text-base leading-relaxed max-w-xl -mt-8 mb-block">
          {t('subheadline')}
        </p>
      </motion.div>

      {/* Two-column layout: form | direct links */}
      <div className="grid lg:grid-cols-[3fr_2fr] gap-block lg:gap-block-wide items-start">

        {/* ── Form (or success state) ─────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          custom={0}
          variants={panelVariants}
        >
          {status === 'success' ? (

            /* Success panel */
            <div
              ref={statusRef}
              tabIndex={-1}
              className="flex flex-col gap-6 rounded-xl border border-accent/20 bg-accent-dim p-inset lg:p-inset-wide focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none" aria-hidden>✓</span>
                <p className="text-lg font-semibold text-foreground">{t('form.success.title')}</p>
              </div>
              <p className="text-muted text-sm leading-relaxed">{t('form.success.body')}</p>
              <button
                onClick={handleReset}
                className="self-start font-mono text-xs text-accent hover:text-accent/70 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
              >
                {t('form.reset')} →
              </button>
            </div>

          ) : (

            /* Contact form */
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

              {/* Name */}
              <Field id="name" label={t('form.name.label')} error={errors.name}>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={t('form.name.placeholder')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={status === 'sending'}
                  className={inputBase}
                />
              </Field>

              {/* Email */}
              <Field id="email" label={t('form.email.label')} error={errors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={e => handleChange('email', e.target.value)}
                  placeholder={t('form.email.placeholder')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={status === 'sending'}
                  className={inputBase}
                />
              </Field>

              {/* Message */}
              <Field id="message" label={t('form.message.label')} error={errors.message}>
                <textarea
                  id="message"
                  value={values.message}
                  onChange={e => handleChange('message', e.target.value)}
                  placeholder={t('form.message.placeholder')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  disabled={status === 'sending'}
                  rows={6}
                  className={`${inputBase} resize-none`}
                />
              </Field>

              {/* Error banner */}
              {status === 'error' && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  className="rounded-lg border border-red-500/30 bg-red-500/8 px-4 py-3 focus:outline-none"
                >
                  <p className="text-sm font-medium text-red-400">{t('form.error.title')}</p>
                  <p className="text-xs text-red-400/80 mt-0.5">{t('form.error.body')}</p>
                </div>
              )}

              {/* Submit */}
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="font-mono text-sm text-canvas bg-accent hover:bg-accent/85 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3.5 rounded-lg transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                >
                  {status === 'sending' ? t('form.sending') : t('form.submit')}
                </button>
              </div>

            </form>
          )}
        </motion.div>

        {/* ── Direct contact links ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          custom={0.15}
          variants={panelVariants}
          className="lg:pt-1"
        >
          <p className="font-mono text-[0.7rem] text-muted tracking-[0.2em] uppercase mb-6 select-none">
            {t('links.title')}
          </p>
          <ul className="flex flex-col gap-3">
            {contactLinks.map(link => {
              const Icon = LINK_ICONS[link.type]
              return (
                <li key={link.type}>
                  <a
                    href={link.href}
                    target={link.type === 'email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:border-accent/30 transition-colors duration-fast focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent-dim border border-accent/15 text-accent shrink-0 transition-colors duration-fast group-hover:bg-accent/20">
                      <Icon size={16} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[0.65rem] text-muted uppercase tracking-wider group-hover:text-foreground transition-colors duration-fast">
                        {t(link.labelKey)}
                      </p>
                      <p className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-fast truncate mt-0.5">
                        {link.detail}
                      </p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </motion.div>

      </div>
    </Section>
  )
}

// ── Field wrapper ─────────────────────────────────────────────────────────────

interface FieldProps {
  id:       string
  label:    string
  error?:   string
  children: ReactNode
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-xs text-muted tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="font-mono text-[0.68rem] text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
