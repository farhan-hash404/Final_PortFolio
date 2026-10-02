import { useCallback, useEffect, useRef, useState } from 'react'
import { featuredProjects, marqueeTags, sideProjects } from '../data/content'
import SectionHead from '../components/SectionHead'
import ProjectVisual from '../components/ProjectVisual'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { useSpotlight } from '../hooks/usePointer'
import './Projects.css'

function Marquee() {
  // Duplicated once so the -50% translate loops seamlessly.
  const row = [...marqueeTags, ...marqueeTags]
  return (
    <div className="mq reveal">
      <span className="mq__pin">FEATURED</span>
      <div className="mq__track">
        <div className="mq__row">
          {row.map((t, i) => (
            <span className="mq__item" key={`${t}-${i}`}>
              {t}
              <i>/</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Screenshots first, architecture schematic last. A project with no
 * screenshots yet still gets a strip — just one frame holding the diagram.
 */
function framesFor(p) {
  const shots = (p.shots || []).map((s, i) => ({ ...s, kind: 'shot', n: i + 1 }))
  if (!p.visual) return shots
  return [...shots, { kind: 'schema', visual: p.visual, label: 'Architecture', n: shots.length + 1 }]
}

export default function Projects() {
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="projects" className="proj">
      <SectionHead
        num="02"
        title="Selected work"
        blurb="Agent systems, deep learning models, and predictive pipelines — each one built end to end, from the data to the endpoint that serves it."
      />

      <Marquee />

      <div className="rows">
        {featuredProjects.map((p) => (
          <ProjectRow key={p.id} p={p} onOpenShot={setLightbox} />
        ))}
      </div>

      {/* ---------- extras ---------- */}
      <div className="extras">
        <p className="extras__eyebrow mono reveal">Also built</p>

        <div className="extras__toggleRow reveal">
          <button
            className="extras__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="more-projects"
          >
            <span>{open ? 'Show less' : `See more (${sideProjects.length})`}</span>
            <Icon name={open ? 'arrowUp' : 'arrowDown'} size={14} />
          </button>
        </div>

        {open && (
          <div className="extras__grid" id="more-projects">
            {sideProjects.map((s, idx) => (
              <ExtraCard key={s.id} p={s} delay={idx * 70} />
            ))}
          </div>
        )}
      </div>

      {lightbox && <Lightbox shot={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  )
}

function ProjectRow({ p, onOpenShot }) {
  const frames = framesFor(p)

  return (
    <article className="pr reveal">
      <header className="pr__head">
        <p className="pr__eyebrow mono">
          <span className="accent">{p.index}</span>
          <i>·</i>
          {p.kicker}
          <i>·</i>
          <span className={p.live ? 'pr__live' : undefined}>
            {p.live && <b />}
            {p.period}
          </span>
        </p>

        <div className="pr__row">
          <h3 className="pr__title">{p.title}</h3>

          {((p.actions && p.actions.length > 0) || p.repo) && (
            <div className="pr__actions">
              {(p.actions && p.actions.length > 0
                ? p.actions
                : [{ label: 'GitHub', href: p.repo, icon: 'github' }]
              ).map((act) => (
                <Button
                  key={act.label}
                  href={act.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={act.variant || 'quiet'}
                  icon={act.icon || 'external'}
                  className="btn--sm"
                >
                  {act.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <p className="pr__tagline">{p.tagline}</p>

        {p.award &&
          (p.awardProof ? (
            <a
              href={p.awardProof}
              target="_blank"
              rel="noopener noreferrer"
              className="pr__award pr__award--link"
              data-cursor="link"
              title="View Certificate of Honorable Mention"
            >
              <Icon name="trophy" size={13} />
              <span>{p.award}</span>
              <Icon name="arrowUpRight" size={11} />
            </a>
          ) : (
            <p className="pr__award">
              <Icon name="trophy" size={13} />
              {p.award}
            </p>
          ))}
      </header>

      <Strip frames={frames} project={p} onOpenShot={onOpenShot} />

      <details className="pr__more">
        <summary data-cursor="link">
          <Icon name="arrowDown" size={13} />
          <span>Technical detail</span>
        </summary>

        <ul className="pr__points">
          {(p.highlights || []).map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="pr__stack">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </details>
    </article>
  )
}

/** Horizontal, snap-scrolling frame strip with an overlay next/prev control. */
function Strip({ frames, project, onOpenShot }) {
  const ref = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 })
  }, [])

  useEffect(() => {
    measure()
    const el = ref.current
    if (!el) return
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const nudge = (dir) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector('.frame')
    const step = card ? card.getBoundingClientRect().width + 14 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <div className="strip" style={project.tint ? { '--tint': project.tint } : undefined}>
      <div className="strip__track" ref={ref}>
        {frames.map((f) => (
          <Frame key={`${f.kind}-${f.n}`} f={f} project={project} onOpenShot={onOpenShot} />
        ))}
      </div>

      {!edge.start && (
        <button className="strip__nav strip__nav--prev" onClick={() => nudge(-1)} aria-label="Previous">
          <Icon name="arrowLeft" size={16} />
        </button>
      )}
      {!edge.end && (
        <button className="strip__nav strip__nav--next" onClick={() => nudge(1)} aria-label="Next">
          <Icon name="arrowRight" size={16} />
        </button>
      )}
    </div>
  )
}

/* Not every frame is tilted, and the ones that are lean different ways —
   a uniform angle just reads as a mistake. Kept under a degree: rotation
   forces the browser to resample the image, and anything stronger visibly
   softened the UI text inside these screenshots. */
const TILTS = ['-0.8deg', '0.6deg', '0deg', '-0.5deg', '0.7deg', '0deg']

/**
 * Every frame is the same size so the strip reads as one tidy row. A
 * schematic can't be legible at that size, so it opens in the lightbox
 * like a screenshot does rather than being given its own wider slot.
 */
function Frame({ f, project, onOpenShot }) {
  const isSchema = f.kind === 'schema'

  return (
    <button
      className={`frame ${isSchema ? 'frame--schema' : 'frame--shot'}`}
      onClick={() =>
        onOpenShot({
          ...f,
          project: project.title,
          src: isSchema ? f.src : f.src.replace(/\.jpg$/, '-full.jpg'),
        })
      }
      data-cursor="view"
      data-cursor-label={isSchema ? 'OPEN' : 'VIEW'}
      aria-label={`${project.title} — ${f.label}, open full size`}
      style={{ '--tilt': isSchema ? '0deg' : TILTS[(f.n - 1) % TILTS.length] }}
      /* Thumbnails use the 16:10 crop; the lightbox gets the uncropped
         original, so nothing is lost at full size. */
      data-full={isSchema ? undefined : f.src.replace(/\.jpg$/, '-full.jpg')}
    >
      <div className="frame__media">
        {isSchema ? (
          <ProjectVisual kind={f.visual} />
        ) : (
          <span className="frame__plate">
            <img src={f.src} alt={`${project.title} — ${f.label}`} loading="lazy" decoding="async" />
          </span>
        )}
      </div>
      <div className="frame__bar mono">
        <span className="frame__n">{String(f.n).padStart(2, '0')}</span>
        <span className="frame__label">{f.label}</span>
      </div>
    </button>
  )
}

function Lightbox({ shot, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // Collapses the nav rail while open — see .lb-open in Projects.css.
    document.body.classList.add('lb-open')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.classList.remove('lb-open')
    }
  }, [onClose])

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${shot.project} — ${shot.label}`}>
      <div className="lb__scrim" onClick={onClose} />
      <div className="lb__panel">
        <div className="lb__head">
          <span className="mono">
            {shot.project} <i>·</i> {shot.label}
          </span>
          <button className="lb__close" onClick={onClose} aria-label="Close">
            <Icon name="close" size={16} />
          </button>
        </div>
        <div className="lb__body">
          {shot.kind === 'schema' ? (
            <div className="lb__schema">
              <ProjectVisual kind={shot.visual} />
            </div>
          ) : (
            <img src={shot.src} alt={`${shot.project} — ${shot.label}`} />
          )}
        </div>
      </div>
    </div>
  )
}

function ExtraCard({ p, delay }) {
  const spot = useSpotlight()
  // Mount animation rather than .reveal — these appear after the scroll
  // observer has already been set up, so they'd never be observed.
  return (
    <article className="extra card spotlight" style={{ '--d': `${delay}ms` }} {...spot}>
      <div className="extra__top">
        <span className="extra__num mono">{p.index}</span>
        <span className="extra__kicker mono">{p.kicker}</span>
      </div>
      <h4 className="extra__title">{p.title}</h4>
      <p className="extra__body">{p.body}</p>
      <div className="extra__stack">
        {p.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>

      {p.repo && (
        <a
          className="extra__repo"
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
        >
          <Icon name="github" size={14} />
          GitHub
          <Icon name="arrowUpRight" size={12} />
        </a>
      )}
    </article>
  )
}
