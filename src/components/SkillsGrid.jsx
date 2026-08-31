import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useI18n } from '../i18n-context'

const brandLogos = {
  java:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  nodejs:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  python:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  aws:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  cloudflare:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg',
  nginx:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
  postgresql:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  jwt: 'https://cdn.simpleicons.org/jsonwebtokens/FB2C94',
  openssl:
    'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openssl/openssl-original.svg',
  spring: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  tailwind: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  linux: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  githubActions: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
  bash: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
  maven: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg',
  render: 'https://cdn.simpleicons.org/render/46E3B7',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  postman: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
  vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
  mysql: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
}

const categories = [
  {
    id: 'languages',
    accent: '#22c55e',
    skills: [
      {
        name: 'Java',
        ecosystem: 'Backend applications', role: 'Language',
        logo: brandLogos.java,
      },
      { name: 'Spring Boot', ecosystem: 'Java services & APIs', role: 'Framework', logo: brandLogos.spring },
      {
        name: 'Node.js',
        ecosystem: 'JavaScript runtime', role: 'Runtime',
        logo: brandLogos.nodejs,
      },
      { name: 'Express.js', ecosystem: 'REST API services', role: 'Framework', logo: brandLogos.express },
      { name: 'React', ecosystem: 'Interactive interfaces', role: 'Frontend', logo: brandLogos.react },
      {
        name: 'Python',
        ecosystem: 'Automation & services', role: 'Language',
        logo: brandLogos.python,
      },
      { name: 'FastAPI', ecosystem: 'Async Python APIs', role: 'Framework', logo: brandLogos.fastapi },
      { name: 'Tailwind CSS', ecosystem: 'Utility-first styling', role: 'Styling', logo: brandLogos.tailwind },
    ],
  },
  {
    id: 'cloud',
    accent: '#22c55e',
    skills: [
      {
        name: 'AWS',
        ecosystem: 'EC2, SSM, IAM',
        role: 'Cloud Platform',
        logo: brandLogos.aws,
      },
      {
        name: 'Cloudflare',
        ecosystem: 'Cloudflare DNS / CDN',
        role: 'Traffic & SSL',
        logo: brandLogos.cloudflare,
      },
      {
        name: 'Linux', ecosystem: 'Server administration', role: 'Operating System', logo: brandLogos.linux,
      },
      {
        name: 'Nginx', ecosystem: 'Web server & proxy', role: 'Reverse Proxy',
        logo: brandLogos.nginx,
      },
      { name: 'Docker', ecosystem: 'Containerized services', role: 'Containers', logo: brandLogos.docker },
    ],
  },
  {
    id: 'automation',
    accent: '#22c55e',
    skills: [
      { name: 'GitHub Actions', ecosystem: 'Automated workflows', role: 'CI/CD', logo: brandLogos.githubActions },
      { name: 'Shell Script', ecosystem: 'Task automation', role: 'Scripting', logo: brandLogos.bash },
      { name: 'Maven', ecosystem: 'Java builds & dependencies', role: 'Build Tool', logo: brandLogos.maven },
    ],
  },
  {
    id: 'security', accent: '#22c55e',
    skills: [
      { name: 'SSL/TLS', ecosystem: 'Certificates & encryption', role: 'Security', logo: brandLogos.openssl },
      { name: 'Render', ecosystem: 'Application deployment', role: 'Hosting', logo: brandLogos.render },
    ],
  },
  {
    id: 'tools', accent: '#22c55e',
    skills: [
      { name: 'Git', ecosystem: 'Version control', role: 'Source Control', logo: brandLogos.git },
      { name: 'Postman', ecosystem: 'API development & testing', role: 'API Tool', logo: brandLogos.postman },
      { name: 'VS Code', ecosystem: 'Development environment', role: 'Editor', logo: brandLogos.vscode },
    ],
  },
  {
    id: 'databases', accent: '#22c55e',
    skills: [
      { name: 'MongoDB', ecosystem: 'Document database', role: 'NoSQL', logo: brandLogos.mongodb },
      { name: 'PostgreSQL', ecosystem: 'Relational database', role: 'SQL', logo: brandLogos.postgresql },
      { name: 'MySQL', ecosystem: 'Relational database', role: 'SQL', logo: brandLogos.mysql },
    ],
  },
]

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.16 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: 'easeOut' },
  },
}

function SkillsGrid() {
  const { t } = useI18n()
  const [activeId, setActiveId] = useState(categories[0].id)
  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0]

  return (
    <section
      id="skills"
      className="relative z-10 mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.55 }}
        className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end"
      >
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
            {t('skills.eyebrow')}
          </p>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white min-[390px]:text-4xl sm:text-5xl">
            {t('skills.title')}
          </h2>
        </div>
      </motion.div>

      <div>
        <div
          role="tablist"
          aria-label="Engineering skill categories"
          className="flex snap-x snap-mandatory flex-row gap-3 overflow-x-auto pb-3"
        >
          {categories.map((category) => {
            const isActive = activeId === category.id

            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="skills-panel"
                onClick={() => setActiveId(category.id)}
                className={`min-h-11 shrink-0 snap-start rounded-full border px-4 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 ${
                  isActive
                    ? 'border-white/80 bg-green-500 text-white shadow-[0_0_22px_rgba(34,197,94,0.18)]'
                    : 'border-neutral-800 bg-neutral-900/70 text-neutral-400 hover:border-green-500/40 hover:text-green-400'
                }`}
              >
                <span className="block text-sm font-semibold">
                  {t(`skills.categories.${category.id}`)}
                </span>
              </button>
            )
          })}
        </div>

        <div
          id="skills-panel"
          role="tabpanel"
          className="mt-6 min-h-[18rem]"
        >
          <div className="mb-4 flex items-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
              {t(`skills.categoryEyebrows.${activeCategory.id}`)}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {activeCategory.skills.map((skill) => {
                return (
                  <motion.article
                    key={skill.name}
                    variants={cardVariants}
                    whileHover={{ y: -3 }}
                    className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/85 p-3 transition-colors hover:border-green-500/50 sm:p-4"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 size-28 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
                      style={{ backgroundColor: activeCategory.accent }}
                    />

                    <div className="relative flex items-center gap-3">
                      <div
                        className="shrink-0 rounded-lg border border-neutral-800 bg-neutral-950 p-2.5 text-green-400"
                      >
                        <img
                          src={skill.logo}
                          alt=""
                          className="size-5 object-contain"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-neutral-100">
                          {skill.name}
                        </h3>
                        <p className="mt-1 font-mono text-xs leading-5 text-neutral-400">
                          {skill.ecosystem}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default SkillsGrid
