import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleUserRound,
  Code2,
  Copy,
  GraduationCap,
  Mail,
  Music2,
} from 'lucide-react'

const email = 'sovannarith1293@gmail.com'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Rith-wep',
    icon: Code2,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hong-sovannarith-4a870b353/',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/hong.sovannarith.168',
    icon: CircleUserRound,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@rith_is_me1',
    icon: Music2,
  },
]

function ContactFooter() {
  const [copied, setCopied] = useState(false)
  const feedbackTimer = useRef()

  useEffect(
    () => () => {
      window.clearTimeout(feedbackTimer.current)
    },
    [],
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = email
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }

    window.clearTimeout(feedbackTimer.current)
    setCopied(true)
    feedbackTimer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <footer id="contact" className="relative z-10 scroll-mt-24 px-5 pt-16 sm:px-6 sm:pt-24 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-neutral-700/60 bg-neutral-950/90 px-5 py-10 shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:rounded-[2rem] sm:px-10 sm:py-14 lg:px-14"
      >
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-40 size-96 rounded-full bg-green-500/[0.08] blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-52 -left-20 size-96 rounded-full bg-green-500/[0.05] blur-[110px]"
        />

        <div className="relative grid items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
              Have a project in mind?
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-white min-[390px]:text-4xl sm:text-[2.75rem] lg:text-5xl">
              Let&apos;s talk about what you&apos;re building.
            </h2>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-9">
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-green-500 bg-green-500 px-4 text-sm font-semibold text-white shadow-[0_0_26px_rgba(34,197,94,0.2)] transition-all hover:border-green-400 hover:bg-green-400 hover:shadow-[0_0_32px_rgba(34,197,94,0.3)] sm:w-auto sm:px-5"
              >
                <Mail className="size-4" />
                <span className="max-w-[13rem] truncate sm:max-w-none">
                  {email}
                </span>
              </a>
              <motion.button
                type="button"
                onClick={copyEmail}
                whileTap={{ scale: 0.95 }}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                className={`inline-flex min-h-12 w-full min-w-28 items-center justify-center gap-2 rounded-full border px-4 text-xs font-semibold transition-colors sm:w-auto ${
                  copied
                    ? 'border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border-white/12 bg-white/5 text-slate-300 hover:border-green-500/35 hover:text-white'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? 'copied' : 'copy'}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.16 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                    {copied ? 'Copied!' : 'Copy Email'}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Find me online
            </p>
            <div className="grid grid-cols-2 gap-3 sm:flex">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-green-500/35 hover:bg-green-500/[0.08] hover:text-white sm:gap-3 sm:px-4"
                >
                  <Icon className="size-4 text-slate-500 transition-colors group-hover:text-green-400" />
                  {label}
                  <ArrowUpRight className="size-3.5 text-slate-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-12 border-t border-white/8 pt-7">
          <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/15 px-4 py-3 text-xs leading-5 text-slate-400 sm:inline-flex sm:items-center sm:rounded-full sm:py-2.5">
            <GraduationCap className="size-4 shrink-0 text-green-400" />
            <span>
              B.Sc in Computer Science
              <span className="mx-2 text-slate-700">/</span>
               University of Mumbai <span className="mx-2 text-slate-700">/</span> India
            </span>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 py-8 text-center text-[11px] text-slate-600 sm:flex-row sm:text-left">
        <p>&copy; {new Date().getFullYear()} Hong Sovannarith. All rights reserved.</p>
        
      </div>
    </footer>
  )
}

export default ContactFooter
