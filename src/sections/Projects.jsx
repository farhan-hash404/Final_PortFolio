import { useState } from 'react'
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

export default function Projects() {
  const [open, setOpen] = useState(false)

  return (
    <section id="projects" className="proj">
      <SectionHead
        num="02"
        title="Selected work"
        blurb="Agent systems, deep learning models, and predictive pipelines — each one built end to end, from the data to the endpoint that serves it."
      />

      <Marquee />

      {/* ---------- featured stack: scroll through them in order ---------- */}
      <div className="show">
        {featuredProjects.map((p, idx) => (
          <FeaturedCard key={p.id} p={p} flip={idx % 2 === 1} />
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
    </section>
  )
}

/* Alternating sides keep three tall cards from reading as one repeated
   template; on narrow screens they collapse to visual-over-text. */
function FeaturedCard({ p, flip }) {
  // Deliberately no cursor-tracking spotlight here. These cards are huge,
  // and a mouse-anchored radial gradient across that area repaints badly
  // against scroll compositing. Hover lighting is plain CSS instead.
  return (
    <article className={`show__main card reveal ${flip ? 'is-flipped' : ''}`}>
      <div className="show__body">
        <p className="show__kicker mono">
          <span className="accent">{p.index}</span> — {p.kicker}
        </p>

        <h3 className="show__title">{p.title}</h3>
        <p className="show__tagline">{p.tagline}</p>

        {/* Both lists ship; CSS picks one per breakpoint. Cheaper and
            flash-free versus a matchMedia hook, and display:none keeps the
            hidden one out of the accessibility tree too. */}
        <ul className="show__points">
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {p.short && (
          <ul className="show__points show__points--short">
            {p.short.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <div className="show__stack">
          {p.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>

        {p.actions && p.actions.length > 0 && (
          <div className="show__actions">
            {p.actions.map((act) => (
              <Button
                key={act.label}
                href={act.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="quiet"
                icon={act.icon || 'external'}
                className="show__actionBtn"
              >
                {act.label}
              </Button>
            ))}
          </div>
        )}

        <div className="show__meta">
          <span>{p.meta}</span>
          <i />
          <span className={p.live ? 'show__live' : ''}>
            {p.live && <b />}
            {p.period}
          </span>
        </div>
      </div>

      <div className="show__visual" data-cursor="view" data-cursor-label="SCHEMA">
        <ProjectVisual kind={p.visual} />
      </div>
    </article>
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
    </article>
  )
}
