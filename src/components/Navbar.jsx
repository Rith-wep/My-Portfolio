import { useState } from 'react'
import { motion } from 'motion/react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [activeHref, setActiveHref] = useState('#home')

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-xl"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10"
      >
        <a
          href="#home"
          aria-label="Return to hero"
          className="shrink-0 text-base font-bold tracking-[-0.03em] text-white transition-colors hover:text-green-400"
        >
          Na<span className="text-green-500">Rith</span>
        </a>

        <div className="ml-auto flex min-w-0 items-center overflow-x-auto sm:ml-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveHref(link.href)}
              className={`relative inline-flex min-h-10 shrink-0 items-center rounded-lg px-2 py-2 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-green-500 min-[390px]:px-2.5 sm:px-4 sm:text-sm ${
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
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="group ml-5 hidden shrink-0 items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-xs font-semibold text-green-400 transition-colors hover:border-green-500/50 hover:bg-green-500/15 md:flex"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          Available for Hire
        </a>
      </nav>
    </motion.header>
  )
}

export default Navbar
