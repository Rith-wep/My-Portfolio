import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
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
import { useI18n } from '../i18n-context'

const spring = { type: 'spring', stiffness: 150, damping: 15 }

function AnimatedHeadline() {
  const { language, t } = useI18n()
  const title = t('hero.title')
  const titleLines = (() => {
    if (language === 'en') return ['I build reliable', 'web systems.']
    if (language === 'km') return title.split('\n')
    if (language === 'zh' && title.includes(' Web ')) {
      const [beforeWeb, afterWeb] = title.split(' Web ')
      return [`${beforeWeb} Web`, afterWeb]
    }

    return [title]
  })()
  const headlineSize =
    language === 'km'
      ? 'text-[1.75rem] leading-[1.24] min-[390px]:text-[1.95rem] sm:text-[2.75rem] xl:text-[3.45rem] 2xl:text-[3.85rem]'
      : language === 'zh'
        ? 'text-[1.85rem] leading-[1.16] min-[390px]:text-[2.1rem] sm:text-[3rem] xl:text-[3.7rem] 2xl:text-[4.05rem]'
        : 'text-[2.35rem] leading-[1.08] min-[390px]:text-[2.7rem] sm:text-6xl sm:leading-[1.03] xl:text-[5.15rem] 2xl:text-[5.65rem]'

  return (
    <motion.h1
      initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      aria-label={title}
      className={`${headlineSize} bg-gradient-to-r from-white via-zinc-200 to-emerald-400 bg-clip-text text-balance font-semibold tracking-normal text-transparent [-webkit-text-stroke:0.8px_rgba(255,255,255,0.28)] [filter:drop-shadow(0_0_18px_rgba(16,185,129,0.16))]`}
    >
      {titleLines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
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
  const { t } = useI18n()
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
    <div className="relative mx-auto w-full max-w-[21rem] [perspective:1000px] sm:max-w-[25rem] lg:max-w-[32rem] xl:max-w-[35rem]">
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
        className="relative aspect-square overflow-hidden rounded-full bg-gradient-to-br from-white/80 via-emerald-300/85 to-emerald-600/90 p-[5px] shadow-[0_18px_70px_rgba(0,0,0,0.42)] sm:p-[6px]"
      >
        <div className="h-full w-full overflow-hidden rounded-full bg-zinc-950">
          <img
            src="/profile.jpg"
            alt="Hong Sovannarith"
            className="h-full w-full object-cover object-[50%_36%] transition-transform duration-700 hover:scale-[1.04]"
          />
        </div>
        <motion.div
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(255,255,255,.18), transparent 38%)',
          }}
          className="pointer-events-none absolute inset-0"
        />
      </motion.div>

      <div
        className="relative z-10 mx-auto -mt-8 flex w-max max-w-[90%] items-center justify-center rounded-full border border-emerald-500/30 bg-zinc-900/80 px-4 py-2 text-center text-[11px] font-medium leading-4 text-emerald-400 shadow-[0_18px_45px_rgba(0,0,0,0.32)] backdrop-blur-md sm:-mt-9 sm:px-5 sm:text-sm"
      >
        {t('hero.role')}
      </div>

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
  const { t } = useI18n()
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -45])
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative z-10 mx-auto grid min-h-[calc(100svh-4.75rem)] w-full max-w-[92rem] items-center gap-8 px-5 pb-12 pt-36 sm:px-6 sm:pb-16 sm:pt-36 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:px-10 lg:py-14 xl:min-h-[calc(100svh-5rem)] xl:gap-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="order-2 text-center lg:order-1 lg:text-left"
      >
        <AnimatedHeadline />

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-400 sm:text-lg lg:mx-0 xl:text-xl xl:leading-8">
          {t('hero.subtitle')}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:mt-8 lg:items-start">
          <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:gap-4 lg:justify-start">
            <MagneticLink
              href="#work"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-green-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_0_26px_rgba(34,197,94,0.2)] transition-all hover:border-emerald-200 hover:bg-green-400 hover:shadow-[0_0_32px_rgba(34,197,94,0.3)] sm:flex-none sm:px-6"
            >
              {t('hero.viewProjects')}
              <ArrowDownRight className="size-4" />
            </MagneticLink>
            <MagneticLink
              href="#contact"
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-green-500/40 bg-green-500/5 px-4 py-3.5 text-sm font-semibold text-green-400 backdrop-blur-md transition-all hover:border-green-500/70 hover:bg-green-500/15 sm:flex-none sm:px-6"
            >
              {t('hero.getInTouch')}
            </MagneticLink>
          </div>

          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <MagneticLink
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="grid size-11 place-items-center rounded-full border border-white/10 bg-zinc-900/70 text-slate-400 backdrop-blur-md transition-all hover:scale-105 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_24px_-8px_rgba(16,185,129,0.6)]"
              >
                <Icon className="size-[1.1rem]" />
              </MagneticLink>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
        style={prefersReducedMotion ? undefined : { y: portraitY, scale: portraitScale }}
        className="order-1 px-5 sm:px-8 lg:order-2 lg:px-0"
      >
        <Portrait />
      </motion.div>
    </section>
  )
}

export default Hero
