import { useRef } from 'react'
import confetti from 'canvas-confetti'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react'
import {
  ArrowUpRight,
  Cloud,
  Code2,
  ExternalLink,
  Layers3,
  ShieldCheck,
} from 'lucide-react'
import { useI18n } from '../i18n-context'

const projects = [
  {
    id: 'math-vision',
    domain: 'Cloudflare + Render',
    liveUrl: 'https://math-vision.com',
    sourceUrl: 'https://github.com/Rith-wep',
    accent: '#22c55e',
    icon: Layers3,
    stack: ['React', 'Node.js', 'MongoDB', 'Gemini API'],
  },
  {
    id: 'scientia',
    domain: 'AWS EC2',
    liveUrl: '#scientia',
    sourceUrl: 'https://github.com/Rith-wep',
    accent: '#22c55e',
    icon: Cloud,
    stack: ['React', 'REST API', 'AWS EC2', 'Linux'],
  },
  {
    id: 'workcloud',
    domain: 'KHQR / ABA PayWay',
    liveUrl: '#workcloud',
    sourceUrl: 'https://github.com/Rith-wep',
    accent: '#22c55e',
    icon: ShieldCheck,
    stack: ['React', 'KHQR', 'ABA PayWay', 'HMAC'],
  },
]

const tiltSpring = { stiffness: 160, damping: 18, mass: 0.55 }

function ProjectCard({ project, index }) {
  const { t } = useI18n()
  const content = t('projects.items')[index]
  const cardRef = useRef(null)
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const rotateX = useSpring(rotateXValue, tiltSpring)
  const rotateY = useSpring(rotateYValue, tiltSpring)
  const highlight = useMotionTemplate`radial-gradient(circle at ${pointerX}% ${pointerY}%, ${project.accent}24, transparent 42%)`

  const handleMouseMove = (event) => {
    const bounds = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    rotateYValue.set((x - 0.5) * 10)
    rotateXValue.set((y - 0.5) * -10)
    pointerX.set(x * 100)
    pointerY.set(y * 100)
  }

  const resetTilt = () => {
    rotateXValue.set(0)
    rotateYValue.set(0)
    pointerX.set(50)
    pointerY.set(50)
  }

  const celebrateLaunch = (event) => {
    if (project.liveUrl.startsWith('#')) event.preventDefault()

    const origin = {
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    }

    confetti({
      particleCount: 70,
      spread: 65,
      startVelocity: 28,
      gravity: 0.85,
      scalar: 0.8,
      origin,
      colors: [project.accent, '#4ade80', '#ffffff'],
      disableForReducedMotion: true,
    })
  }

  const Icon = project.icon

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.09 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -7 }}
      className="group relative h-full rounded-[1.35rem] bg-gradient-to-br from-zinc-800/80 via-zinc-800/70 to-zinc-900/80 p-px shadow-2xl shadow-black/25 transition-all duration-300 ease-out hover:from-emerald-500/40 hover:via-zinc-700/80 hover:to-emerald-400/20 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]"
    >
      <div className="relative flex h-full min-h-[30rem] flex-col justify-between overflow-hidden rounded-[calc(1.35rem-1px)] border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-300 ease-out group-hover:border-emerald-500/40 sm:min-h-[32rem] sm:p-7">
        <motion.div
          aria-hidden="true"
          style={{ background: highlight }}
          className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 ease-out group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 size-48 rounded-full opacity-10 blur-3xl transition-opacity duration-500 ease-out group-hover:opacity-25"
          style={{ backgroundColor: project.accent }}
        />

        <div className="relative flex grow flex-col">
          <div className="flex items-start justify-between gap-4">
            <div
              className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 ease-out group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10"
              style={{ color: project.accent }}
            >
              <Icon className="size-5 transition-transform duration-300 ease-out group-hover:scale-110" />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-zinc-950/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-emerald-300 shadow-[0_0_18px_-10px_rgba(16,185,129,0.8)] backdrop-blur-sm transition-all duration-300 ease-out group-hover:border-emerald-300/45 group-hover:bg-emerald-400/10">
              {project.domain}
            </span>
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              {t('projects.featured')} / 0{index + 1}
            </p>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
            {content.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {content.description}
          </p>
          </div>

          <div className="mt-6 border-y border-white/7 py-5 transition-colors duration-300 ease-out group-hover:border-emerald-400/15">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-300">
              <Code2 className="size-3.5 text-emerald-400" />
              {t('projects.details')}
            </p>
            <ul className="space-y-2.5">
              {content.architecture.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs leading-5 text-zinc-400"
                >
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full shadow-[0_0_8px_rgba(52,211,153,0.75)]"
                    style={{ backgroundColor: project.accent }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <span
                key={technology}
                className="rounded-md border border-white/8 bg-white/[0.035] px-2.5 py-1.5 text-[10px] font-medium text-zinc-300 transition-all duration-300 ease-out hover:scale-105 hover:border-emerald-300/35 hover:bg-emerald-400/10 hover:text-emerald-100 group-hover:border-white/15"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6 sm:gap-5 sm:pt-7">
          <motion.a
            href={project.liveUrl}
            target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
            rel={project.liveUrl.startsWith('http') ? 'noreferrer' : undefined}
            onClick={celebrateLaunch}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-white transition-all duration-300 ease-out hover:bg-emerald-500/10 hover:text-emerald-300"
            aria-label={t('projects.liveLabel', { title: content.title })}
          >
            {t('projects.liveDemo')}
            <ExternalLink className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-zinc-400 transition-all duration-300 ease-out hover:bg-white/5 hover:text-white"
            aria-label={t('projects.sourceLabel', { title: content.title })}
          >
            {t('projects.sourceCode')}
            <Code2 className="size-3.5 transition-transform duration-300 ease-out group-hover:scale-110" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function Projects() {
  const { t } = useI18n()

  return (
    <section
      id="work"
      className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55 }}
        className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end sm:gap-6"
      >
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
            {t('projects.eyebrow')}
          </p>
          <h2 className="max-w-2xl bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-3xl font-semibold tracking-[-0.04em] text-transparent min-[390px]:text-4xl sm:text-5xl">
            {t('projects.title')}
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-400">
          {t('projects.summary')}
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <a
          href="https://github.com/Rith-wep"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          {t('projects.browseAll')}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

export default Projects
