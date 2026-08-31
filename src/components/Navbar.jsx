import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ChevronDown,
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Languages,
  Mail,
  Wrench,
} from 'lucide-react'
import { useI18n } from '../i18n-context'

const navLinks = [
  { key: 'home', href: '#home', icon: Home },
  { key: 'projects', href: '#work', icon: FolderKanban },
  { key: 'skills', href: '#skills', icon: Wrench },
  { key: 'contact', href: '#contact', icon: Mail },
]

function Navbar() {
  const [activeHref, setActiveHref] = useState('#home')
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const { language, languages, setLanguage, t } = useI18n()
  const selectedLanguage =
    languages.find((item) => item.code === language) ?? languages[0]

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-y-2 px-5 py-3 sm:px-6 lg:grid lg:h-[4.75rem] lg:grid-cols-[1fr_auto_1fr] lg:gap-y-0 lg:px-10 lg:py-0 xl:h-20"
      >
        <a
          href="#home"
          aria-label="Return to hero"
          className="shrink-0 text-base font-bold tracking-[-0.03em] text-white transition-colors hover:text-green-400 lg:text-lg"
        >
          Na<span className="text-green-500">Rith</span>
        </a>

        <div className="order-3 flex w-full min-w-0 items-center justify-center overflow-x-auto pt-1 lg:order-none lg:w-auto lg:justify-self-center lg:pt-0 lg:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                className={`relative inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-green-500 min-[390px]:px-2.5 sm:gap-2 sm:px-4 sm:text-sm lg:min-h-12 lg:px-5 lg:text-[15px] ${
                  activeHref === link.href
                    ? 'text-green-400'
                    : 'text-slate-400 hover:text-green-400'
                }`}
              >
                {activeHref === link.href && (
                  <motion.span
                    layoutId="active-navigation"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg border border-green-500/25 bg-green-500/10"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon className="relative z-10 size-3.5 sm:size-4" />
                <span className="relative z-10">{t(`nav.${link.key}`)}</span>
              </a>
            )
          })}
        </div>

        <div className="order-2 ml-auto flex items-center lg:order-none lg:ml-0 lg:justify-self-end">
          {isLanguageMenuOpen && (
            <button
              type="button"
              aria-label="Close language menu"
              onClick={() => setIsLanguageMenuOpen(false)}
              className="fixed inset-0 z-0 cursor-default bg-black/25 backdrop-blur-[3px]"
            />
          )}
          <div className="relative">
          <button
            type="button"
            onClick={() => setIsLanguageMenuOpen((isOpen) => !isOpen)}
            aria-expanded={isLanguageMenuOpen}
            aria-label={t('nav.language')}
            className="relative z-20 flex min-h-10 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.035] px-2 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-green-500/35 sm:gap-2 sm:px-3 lg:min-h-12 lg:px-4"
          >
            <Languages className="hidden size-4 text-green-400 sm:block" />
            <img
              src={selectedLanguage.flagUrl}
              alt=""
              className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-white/15 sm:h-4 sm:w-6"
            />
            <span className="text-xs font-semibold text-slate-200 lg:text-sm">
              {selectedLanguage.short}
            </span>
            <ChevronDown className={`size-3.5 text-slate-400 transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isLanguageMenuOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-36 overflow-hidden rounded-lg border border-white/10 bg-neutral-950 p-1 shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-3xl before:absolute before:inset-0 before:-z-10 before:bg-black/80">
              {languages.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    setLanguage(item.code)
                    setIsLanguageMenuOpen(false)
                  }}
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                    language === item.code
                      ? 'bg-green-500/15 text-green-400'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <img
                    src={item.flagUrl}
                    alt=""
                    className="h-3.5 w-5 rounded-[2px] object-cover ring-1 ring-white/15"
                  />
                  {item.short}
                </button>
              ))}
            </div>
          )}
          </div>

          <a
            href="#contact"
            className="group ml-5 hidden shrink-0 items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-green-500/50 hover:bg-green-500/15 md:flex lg:min-h-12 lg:px-5 lg:text-sm"
          >
            <BriefcaseBusiness className="size-4 text-green-400 transition-transform group-hover:scale-105" />
            {t('nav.available')}
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

export default Navbar
