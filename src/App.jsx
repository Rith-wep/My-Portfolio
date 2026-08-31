import ContactFooter from './components/ContactFooter'
import Hero from './components/Hero'
import InteractiveBackground from './components/InteractiveBackground'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import SkillsGrid from './components/SkillsGrid'
import { useI18n } from './i18n-context'

function App() {
  const { language } = useI18n()

  return (
    <main className={`font-language-${language} relative isolate min-h-screen overflow-hidden bg-neutral-950 text-white`}>
      <InteractiveBackground className="opacity-60 [mask-image:radial-gradient(circle_at_32%_44%,black_0%,black_34%,rgba(0,0,0,0.42)_58%,transparent_86%)]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(82,82,82,0.2),rgba(23,23,23,0.94)_72%)]" />

      <Navbar />
      <Hero />
      <Projects />
      <SkillsGrid />
      <ContactFooter />
    </main>
  )
}

export default App
