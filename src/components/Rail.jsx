import { useEffect, useRef, useState } from 'react'
import { profile, sections } from '../data/content'
import './Rail.css'

/**
 * On a phone the bar is fixed overhead the whole way down the page, which
 * costs vertical room on the screen that can least spare it. It now slides
 * away once you're reading and comes back the moment you scroll up, so the
 * content area gets the full viewport while you're moving through it.
 */
function useHideOnScroll(disabled) {
  const [hidden, setHidden] = useState(false)
  const last = useRef(0)

  useEffect(() => {
    if (disabled) {
      setHidden(false)
      return
    }
    // Time-throttled rather than rAF-throttled on purpose: rAF is part of
    // the render loop, which is exactly what gets starved on a struggling
    // phone. A timestamp gate keeps the bar responsive regardless.
    let lastRun = 0
    const measure = () => {
      lastRun = performance.now()
      const y = window.scrollY
      // Near the top the bar is always shown, unconditionally. Deriving it
      // from scroll direction alone can strand it off-screen after a jump
      // that reports no delta — an anchor scroll, or a restored position.
      if (y <= 140) {
        setHidden(false)
        last.current = y
        return
      }
      const delta = y - last.current
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0)
        last.current = y
      }
    }
    const onScroll = () => {
      if (performance.now() - lastRun > 80) measure()
    }
    last.current = window.scrollY
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [disabled])

  return hidden
}

export default function Rail({ active, onOpenPalette, open, onToggle }) {
  // Keep the bar pinned while the drawer is open, or it slides out from
  // under its own close button.
  const hidden = useHideOnScroll(open)

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (open) onToggle(false)
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className={`railbar ${hidden ? 'is-hidden' : ''}`}>
        <div className="railbar__id">
          <span className="railbar__name">{profile.name}</span>
          <span className="railbar__role">{profile.shortRole}</span>
        </div>
        <button
          className={`railbar__burger ${open ? 'is-open' : ''}`}
          onClick={() => onToggle(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
        >
          <span />
          <span />
        </button>
      </div>

      <aside className={`rail ${open ? 'is-open' : ''}`}>
        <div className="rail__top">
          <a className="rail__name" href="#intro" onClick={(e) => go(e, 'intro')}>
            {profile.name}
          </a>
          <p className="rail__loc">{profile.location}</p>

          <p className="rail__role">{profile.role}</p>

          {profile.available && (
            <p className="rail__status">
              <span className="rail__dot" />
              AVAILABLE
            </p>
          )}
        </div>

        <nav className="rail__nav" aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rail__link ${active === s.id ? 'is-active' : ''}`}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={(e) => go(e, s.id)}
            >
              <span className="rail__num">{s.num}</span>
              <span className="rail__label">{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="rail__bottom">
          <button className="rail__cmd" onClick={onOpenPalette} data-cursor="link">
            <kbd>⌘K</kbd>
            <span>Navigate</span>
          </button>
        </div>
      </aside>

      {open && <div className="rail__scrim" onClick={() => onToggle(false)} />}
    </>
  )
}
