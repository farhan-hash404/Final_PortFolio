import { experienceIntro, highlightCards, timeline } from '../data/content'
import SectionHead from '../components/SectionHead'
import { useSpotlight } from '../hooks/usePointer'
import './Experience.css'

export default function Experience() {
  const spot = useSpotlight()

  return (
    <section id="experience" className="exp">
      <SectionHead num="03" title="Experience" blurb={experienceIntro} />

      {/* highlight split card */}
      <div className="exp__split card spotlight reveal" {...spot}>
        {highlightCards.map((h) => (
          <div className="exp__splitCell" key={h.title}>
            <p className={`exp__splitLabel ${h.accent ? 'accent' : ''}`}>{h.label}</p>
            <h3 className="exp__splitTitle">{h.title}</h3>
            <p className="exp__splitMeta">{h.meta}</p>
          </div>
        ))}
      </div>

      {/* timeline */}
      <ol className="tl">
        {timeline.map((t, i) => (
          <li
            className={`tl__item reveal ${t.current ? 'is-current' : ''}`}
            key={t.id}
            style={{ '--reveal-delay': `${i * 70}ms` }}
          >
            <span className="tl__dot" aria-hidden="true" />

            <article className="tl__card">
              <div className="tl__head">
                <h3 className="tl__role">
                  {t.role} <span className="tl__org">· {t.org}</span>
                </h3>
                <span className="tl__period mono">{t.period}</span>
              </div>

              <p className="tl__loc mono">{t.location}</p>

              <ul className="tl__bullets">
                {t.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
