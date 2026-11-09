import { motion } from 'motion/react'
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
    icon: Layers3,
    stack: ['React', 'Node.js', 'MongoDB', 'Gemini API'],
  },
  {
    id: 'scientia',
    domain: 'AWS EC2',
    liveUrl: null,
    sourceUrl: 'https://github.com/Rith-wep',
    icon: Cloud,
    stack: ['React', 'REST API', 'AWS EC2', 'Linux'],
  },
  {
    id: 'workcloud',
    domain: 'KHQR / ABA PayWay',
    liveUrl: null,
    sourceUrl: 'https://github.com/Rith-wep',
    icon: ShieldCheck,
    stack: ['React', 'KHQR', 'ABA PayWay', 'HMAC'],
  },
]

function ProjectCard({ project, index }) {
  const { t } = useI18n()
  const content = t('projects.items')[index]
  const Icon = project.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#191a1c] shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-colors hover:border-white/20"
    >
      <div className="flex h-16 items-center gap-3 bg-green-500 px-5 sm:px-6">
        <div className="grid size-9 place-items-center rounded-lg bg-black/15 text-white">
          <Icon className="size-[1.15rem]" />
        </div>
        <h3 className="truncate text-lg font-semibold tracking-tight text-white">
          {content.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-400">
            {t('projects.featured')}
          </p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {content.description}
          </p>
        </div>

        <div className="mt-6">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-300">
            <Code2 className="size-4 text-green-400" />
            {t('projects.details')}
          </p>
          <ul className="space-y-2.5">
            {content.architecture.map((item) => (
              <li key={item} className="flex items-start gap-3 text-xs leading-5 text-zinc-400">
                <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/8 pt-5">
          {project.stack.map((technology) => (
            <span key={technology} className="rounded-md bg-white/[0.055] px-2.5 py-1.5 text-[10px] font-medium text-zinc-300">
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-7">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-green-500 px-4 text-xs font-semibold text-white transition-colors hover:bg-green-400"
              aria-label={t('projects.liveLabel', { title: content.title })}
            >
              {t('projects.liveDemo')}
              <ExternalLink className="size-3.5" />
            </a>
          )}
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-4 text-xs font-semibold text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
            aria-label={t('projects.sourceLabel', { title: content.title })}
          >
            {t('projects.sourceCode')}
            <Code2 className="size-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function Projects() {
  const { t } = useI18n()

  return (
    <section id="work" className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-20 px-5 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mb-9 sm:mb-12"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
          {t('projects.eyebrow')}
        </p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white min-[390px]:text-3xl sm:text-5xl">
          {t('projects.title')}
        </h2>
      </motion.div>

      <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <a href="https://github.com/Rith-wep" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
          {t('projects.browseAll')}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  )
}

export default Projects
