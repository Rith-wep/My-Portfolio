import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import {
  ArrowDownRight,
  BriefcaseBusiness,
  CircleUserRound,
  Code2,
  Mail,
  Music2,
} from 'lucide-react'

const spring = { type: 'spring', stiffness: 150, damping: 15 }

const headlineVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.25, staggerChildren: 0.035 },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function AnimatedHeadline() {
  const words = 'I build reliable web'.split(' ')

  return (
    <motion.h1
      variants={headlineVariants}
      initial="hidden"
      animate="visible"
      aria-label="I build reliable web systems."
      className="text-balance text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white min-[390px]:text-[2.7rem] sm:text-6xl sm:leading-[1.03] xl:text-7xl"
    >
      <span aria-hidden="true">
        {words.map((word) => (
          <span
            key={word}
            className="mr-[0.22em] inline-block whitespace-nowrap"
          >
            {word.split('').map((letter, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
        <span className="inline-block whitespace-nowrap bg-gradient-to-r from-green-300 via-green-400 to-green-500 bg-clip-text text-transparent">
          {'systems.'.split('').map((letter, index) => (
            <motion.span
              key={`systems-${index}`}
              variants={letterVariants}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </span>
    </motion.h1>
  )
}

function MagneticLink({ children, className, href, ...props }) {
  const linkRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const bounds = linkRef.current.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.22)
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.22)
  }

  const resetPosition = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={linkRef}
      href={href}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  )
}

function Portrait() {
  const cardRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const rotateXTarget = useMotionValue(0)
  const rotateYTarget = useMotionValue(0)
  const rotateX = useSpring(rotateXTarget, spring)
  const rotateY = useSpring(rotateYTarget, spring)
  const glowX = useTransform(rotateY, [-8, 8], ['35%', '65%'])
  const glowY = useTransform(rotateX, [-8, 8], ['65%', '35%'])

  const handlePointerMove = (event) => {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return
    const bounds = cardRef.current.getBoundingClientRect()
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5

    rotateYTarget.set(horizontal * 14)
    rotateXTarget.set(vertical * -14)
  }

  const resetTilt = () => {
    rotateXTarget.set(0)
    rotateYTarget.set(0)
  }

  return (
    <div className="relative mx-auto w-full max-w-[19rem] [perspective:1000px] sm:max-w-[22rem] lg:max-w-[25rem]">
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          '--glow-x': glowX,
          '--glow-y': glowY,
        }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-green-500/40 bg-slate-900 shadow-[0_0_35px_rgba(34,197,94,0.28)]"
      >
        <img
          src="/profile.jpg"
          alt="Hong Sovannarith"
          className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.025]"
        />
        <motion.div
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,.18), transparent 38%)',
          }}
          className="pointer-events-none absolute inset-0"
        />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950/80 to-transparent" />

        <div
          className="absolute inset-x-4 bottom-5 flex items-center justify-center rounded-full border border-white/15 bg-slate-950/55 px-3 py-2 text-center text-[11px] font-medium leading-4 text-white shadow-xl backdrop-blur-xl sm:left-1/2 sm:right-auto sm:w-max sm:-translate-x-1/2 sm:whitespace-nowrap sm:px-4 sm:text-sm"
        >
          {/* <span className="size-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" /> */}
          Backend &amp; DevOps Engineer
        </div>
      </motion.div>

    </div>
  )
}

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Rith-wep', icon: Code2 },
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
  { label: 'Email', href: 'mailto:sovannarith1293@gmail.com', icon: Mail },
]

function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-24 sm:px-6 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="order-2 text-center lg:order-1 lg:text-left"
      >
        <AnimatedHeadline />

        <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-slate-400 sm:text-lg lg:mx-0">
          I&apos;m a backend and DevOps engineer working with Java, Spring
          Boot, Node.js, AWS, and Cloudflare. I build APIs, deploy services,
          and keep production systems running reliably.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-9 sm:gap-4 lg:justify-start">
          <MagneticLink
            href="#work"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-green-500 bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_26px_rgba(34,197,94,0.2)] transition-all hover:border-green-400 hover:bg-green-400 hover:shadow-[0_0_32px_rgba(34,197,94,0.3)] sm:w-auto"
          >
            View Projects
            <ArrowDownRight className="size-4" />
          </MagneticLink>
          <MagneticLink
            href="#contact"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-green-500/40 bg-green-500/5 px-6 py-3.5 text-sm font-semibold text-green-400 backdrop-blur-md transition-colors hover:border-green-500/70 hover:bg-green-500/15 sm:w-auto"
          >
            Get in Touch
          </MagneticLink>
        </div>

        <div className="mt-8 flex justify-center gap-3 lg:justify-start">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <MagneticLink
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-slate-900/70 text-slate-400 backdrop-blur-md transition-colors hover:border-green-500/40 hover:text-green-400"
            >
              <Icon className="size-[1.1rem]" />
            </MagneticLink>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
        className="order-1 px-5 sm:px-8 lg:order-2 lg:px-0"
      >
        <Portrait />
      </motion.div>
    </section>
  )
}

export default Hero
