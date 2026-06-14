import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
  const { i18n, t } = useTranslation('common')
  const current = i18n.resolvedLanguage ?? 'en'

  function toggle() {
    const next = current === 'en' ? 'es' : 'en'
    void i18n.changeLanguage(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={t('lang.toggle_label')}
      className="
        flex items-center gap-1.5
        font-mono text-xs tracking-widest
        px-3 py-1.5 rounded-full
        border border-border
        text-muted
        transition-colors duration-[--duration-base]
        hover:border-accent hover:text-accent
      "
    >
      <span className={current === 'en' ? 'text-accent' : 'text-muted'}>EN</span>
      <span className="text-border select-none">|</span>
      <span className={current === 'es' ? 'text-accent' : 'text-muted'}>ES</span>
    </button>
  )
}
