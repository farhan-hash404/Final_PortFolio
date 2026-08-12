import { useEffect, useMemo, useRef, useState } from 'react'
import { contactLinks, sections } from '../data/content'
import Icon from './Icon'
import './Palette.css'

/** ⌘K / Ctrl-K jump menu — sections plus the outbound links. */
export default function Palette({ open, onClose }) {
  const [q, setQ] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const commands = useMemo(() => {
    const nav = sections.map((s) => ({
      id: `nav-${s.id}`,
      kind: 'Go to',
      label: s.label,
      hint: s.num,
      run: () =>
        document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    }))

    const links = contactLinks.map((l) => ({
      id: `link-${l.id}`,
      kind: 'Open',
      label: l.label,
      hint: l.value,
      icon: l.icon,
      run: () => window.open(l.href, l.external ? '_blank' : '_self', 'noopener,noreferrer'),
    }))

    return [...nav, ...links]
  }, [])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter((c) =>
      `${c.kind} ${c.label} ${c.hint ?? ''}`.toLowerCase().includes(needle)
    )
  }, [q, commands])

  useEffect(() => {
    if (open) {
      setQ('')
      setCursor(0)
      // Wait a frame so the input exists and the panel has painted.
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => setCursor(0), [q])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCursor((c) => (results.length ? (c + 1) % results.length : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const hit = results[cursor]
        if (hit) {
          hit.run()
          onClose()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, cursor, onClose])

  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector('.pal__row.is-on')?.scrollIntoView({ block: 'nearest' })
  }, [cursor, open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="pal" role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="pal__scrim" onClick={onClose} />

      <div className="pal__panel">
        <div className="pal__search">
          <Icon name="search" size={16} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to a section or link…"
            aria-label="Search commands"
            spellCheck="false"
          />
          <button className="pal__esc" onClick={onClose} aria-label="Close">
            ESC
          </button>
        </div>

        <div className="pal__list" ref={listRef}>
          {results.length === 0 && <p className="pal__empty">No matches for “{q}”</p>}

          {results.map((c, i) => (
            <button
              key={c.id}
              className={`pal__row ${i === cursor ? 'is-on' : ''}`}
              onMouseEnter={() => setCursor(i)}
              onClick={() => {
                c.run()
                onClose()
              }}
            >
              <span className="pal__kind">{c.kind}</span>
              <span className="pal__label">
                {c.icon && <Icon name={c.icon} size={14} />}
                {c.label}
              </span>
              <span className="pal__hint">{c.hint}</span>
            </button>
          ))}
        </div>

        <div className="pal__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}
