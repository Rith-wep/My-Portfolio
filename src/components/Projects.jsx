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

const projects = [
  {
    title: 'Math Vision',
    description:
      'Upload a math problem as an image and receive a clear, step-by-step solution generated with Gemini.',
    domain: 'Cloudflare + Render',
    liveUrl: 'https://math-vision.com',
    sourceUrl: 'https://github.com/Rith-wep',
    accent: '#22c55e',
    icon: Layers3,
    architecture: [
      'MERN application with image uploads',
      'Gemini-powered problem analysis',
      'Deployed with Cloudflare and Render',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'Gemini API'],
  },
  {
    title: 'Scientia',
    description:
      'A full-stack knowledge platform deployed on AWS EC2, with a REST API and a repeatable server setup.',
    domain: 'AWS EC2',
    liveUrl: '#scientia',
    sourceUrl: 'https://github.com/Rith-wep',
    accent: '#22c55e',
    icon: Cloud,
    architecture: [
      'React frontend with a REST API',
      'Hosted on an AWS EC2 instance',
      'Linux-based deployment workflow',
    ],
    stack: ['React', 'REST API', 'AWS EC2', 'Linux'],
  },
  {
    title: 'WorkCloud & Buy More E-Mart',
    description:
      'A business operations and e-commerce system with local payment support through KHQR and ABA PayWay.',
    domain: 'KHQR / ABA PayWay',
    liveUrl: '#workcloud',
    sourceUrl: 'https://github.com/Rith-wep',
    accent: '#22c55e',
    icon: ShieldCheck,
    architecture: [
      'Responsive React operations dashboard',
      'KHQR and ABA PayWay integration',
      'HMAC verification for payment requests',
    ],
    stack: ['React', 'KHQR', 'ABA PayWay', 'HMAC'],
  },
]

const tiltSpring = { stiffness: 160, damping: 18, mass: 0.55 }

function ProjectCard({ project, index }) {
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
      className="group relative rounded-[1.6rem] bg-gradient-to-br from-neutral-600/55 via-green-500/15 to-green-500/40 p-px shadow-2xl shadow-black/25"
    >
      <div className="relative flex h-full min-h-[29rem] flex-col overflow-hidden rounded-[calc(1.6rem-1px)] border border-white/5 bg-neutral-950/90 p-5 backdrop-blur-xl sm:min-h-[31rem] sm:p-7">
        <motion.div
          aria-hidden="true"
          style={{ background: highlight }}
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 size-48 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ backgroundColor: project.accent }}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div
            className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5"
            style={{ color: project.accent }}
          >
            <Icon className="size-5" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-green-400">
            <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
            {project.domain}
          </span>
        </div>

        <div className="relative mt-7">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Featured project / 0{index + 1}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {project.description}
          </p>
        </div>

        <div className="relative mt-6 border-y border-white/7 py-5">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
            <Code2 className="size-3.5 text-green-400" />
            Key details
          </p>
          <ul className="space-y-2.5">
            {project.architecture.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-xs leading-5 text-slate-400"
              >
                <span
                  className="mt-2 size-1 shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-white/8 bg-white/[0.035] px-2.5 py-1.5 text-[10px] font-medium text-slate-300 transition-colors group-hover:border-white/15"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6 sm:gap-5 sm:pt-7">
          <motion.a
            href={project.liveUrl}
            target={project.liveUrl.startsWith('http') ? '_blank' : undefined}
            rel={project.liveUrl.startsWith('http') ? 'noreferrer' : undefined}
            onClick={celebrateLaunch}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-white transition-colors hover:bg-green-500/10 hover:text-green-400"
            aria-label={`Open ${project.title} live demo`}
          >
            Live Demo
            <ExternalLink className="size-3.5" />
          </motion.a>
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
            aria-label={`View ${project.title} source code`}
          >
            Source Code
            <Code2 className="size-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function Projects() {
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
            Selected projects
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white min-[390px]:text-4xl sm:text-5xl">
            A few things I&apos;ve built.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-400">
          Practical web products covering AI-assisted learning, cloud
          deployment, and local payment integrations.
        </p>
      </motion.div>

      <div className="grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <a
          href="https://github.com/Rith-wep"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          Browse all repositories
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

export default Projects
