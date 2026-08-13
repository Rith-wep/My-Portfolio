import ContactFooter from './components/ContactFooter'
import Hero from './components/Hero'
import InteractiveBackground from './components/InteractiveBackground'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import SkillsGrid from './components/SkillsGrid'

function App() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-neutral-950 text-white">
      <InteractiveBackground />

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
