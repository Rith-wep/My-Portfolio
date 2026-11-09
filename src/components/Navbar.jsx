import { useEffect, useState } from 'react'
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

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveHref(`#${visible.target.id}`)
      },
      { rootMargin: '-20% 0px -65%', threshold: [0.05, 0.2, 0.5] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#101112]/95 shadow-[0_1px_0_rgba(0,0,0,.35),0_10px_30px_rgba(0,0,0,.12)] backdrop-blur-xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto grid w-full max-w-[90rem] grid-cols-[1fr_auto] items-center gap-x-3 px-3 pt-2 sm:px-5 lg:h-[4.25rem] lg:grid-cols-[1fr_minmax(28rem,36rem)_1fr] lg:px-8 lg:py-0"
      >
        <a
          href="#home"
          aria-label="Return to hero"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-base font-extrabold tracking-[-0.06em] text-white shadow-[0_0_0_4px_rgba(34,197,94,.08)] transition-transform hover:scale-105 lg:size-11"
        >
          NR
        </a>

        <div className="order-3 col-span-2 mt-1 grid w-full grid-cols-4 lg:order-none lg:col-span-1 lg:mt-0 lg:h-full lg:justify-self-center">
          {navLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveHref(link.href)}
                aria-current={activeHref === link.href ? 'page' : undefined}
                className={`group relative inline-flex min-h-11 items-center justify-center gap-2 px-2 text-[11px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-green-500 sm:text-xs lg:h-full lg:min-h-0 lg:px-4 lg:text-sm ${
                  activeHref === link.href
                    ? 'text-green-400'
                    : 'text-slate-400 hover:bg-white/[0.045] hover:text-slate-100'
                }`}
              >
                {activeHref === link.href && (
                  <motion.span
                    layoutId="active-navigation"
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-0 h-[3px] rounded-t-full bg-green-500 shadow-[0_-2px_12px_rgba(34,197,94,.35)] lg:inset-x-3"
                    transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                  />
                )}
                <Icon className="relative z-10 size-[1.05rem] transition-transform group-hover:scale-105 lg:size-[1.15rem]" strokeWidth={activeHref === link.href ? 2.35 : 1.8} />
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
            className="relative z-20 flex size-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-white/[0.07] text-xs font-semibold text-slate-300 transition-colors hover:bg-white/[0.12] sm:w-auto sm:px-3 lg:h-11"
          >
            <Languages className="size-4 text-green-400" />
            <img
              src={selectedLanguage.flagUrl}
              alt=""
              className="hidden h-4 w-6 rounded-[2px] object-cover ring-1 ring-white/15 sm:block"
            />
            <span className="hidden text-xs font-semibold text-slate-200 sm:block">
              {selectedLanguage.short}
            </span>
            <ChevronDown className={`hidden size-3.5 text-slate-400 transition-transform sm:block ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
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
            className="group ml-2 hidden h-11 shrink-0 items-center gap-2 rounded-full bg-white/[0.07] px-4 text-xs font-semibold text-white transition-colors hover:bg-green-500/15 md:flex lg:text-sm"
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
