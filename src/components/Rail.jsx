import { profile, sections } from '../data/content'
import './Rail.css'

export default function Rail({ active, onOpenPalette, open, onToggle }) {
  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (open) onToggle(false)
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="railbar">
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
