import { useCallback, useEffect, useMemo, useState } from 'react'

import Cursor from './components/Cursor'
import Rail from './components/Rail'
import Palette from './components/Palette'
import EmailModal from './components/EmailModal'

import Intro from './sections/Intro'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Stack from './sections/Stack'
import Credentials from './sections/Credentials'
import Contact from './sections/Contact'

import { sections } from './data/content'
import { useReveal } from './hooks/useReveal'
import { useActiveSection } from './hooks/useActiveSection'
import { useFinePointer } from './hooks/usePointer'
import { useScrollingClass } from './hooks/useScrollingClass'

import './App.css'

export default function App() {
  const ids = useMemo(() => sections.map((s) => s.id), [])
  const active = useActiveSection(ids)
  const finePointer = useFinePointer()

  const [paletteOpen, setPaletteOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useReveal()
  useScrollingClass()

  // Listen for global request to open email modal
  useEffect(() => {
    const handleOpen = () => setEmailModalOpen(true)
    window.addEventListener('open-email-modal', handleOpen)
    return () => window.removeEventListener('open-email-modal', handleOpen)
  }, [])

  // ⌘K / Ctrl-K anywhere on the page
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll progress bar
  useEffect(() => {
    let frame = 0
    const measure = () => {
      frame = 0
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const openPalette = useCallback(() => {
    setNavOpen(false)
    setPaletteOpen(true)
  }, [])

  return (
    <>
      {finePointer && <Cursor />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>

      <Rail
        active={active}
        onOpenPalette={openPalette}
        open={navOpen}
        onToggle={setNavOpen}
      />

      <main id="main" className="shell">
        <div className="shell__inner">
          <Intro onOpenEmail={() => setEmailModalOpen(true)} />
          <Projects />
          <Experience />
          <Stack />
          <Credentials />
          <Contact onOpenEmail={() => setEmailModalOpen(true)} />
        </div>
      </main>

      <Palette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpenEmail={() => setEmailModalOpen(true)}
      />
      <EmailModal open={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
    </>
  )
}
