import { stack } from '../data/content'
import SectionHead from '../components/SectionHead'
import { useSpotlight } from '../hooks/usePointer'
import './Stack.css'

export default function Stack() {
  const spot = useSpotlight()

  return (
    <section id="stack" className="stack">
      <SectionHead
        num="04"
        title="Stack"
        blurb="What I reach for when an idea has to become a system that runs."
      />

      <div className="stack__grid card spotlight reveal" {...spot}>
        {stack.map((g) => (
          <div className="stack__cell" key={g.group}>
            <p className="stack__group mono">{g.group}</p>
            <div className="stack__items">
              {g.items.map((it) => (
                <span className="stack__item" key={it}>
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
