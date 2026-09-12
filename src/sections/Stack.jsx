import { stack } from '../data/content'
import SectionHead from '../components/SectionHead'
import { useSpotlight } from '../hooks/usePointer'
import './Stack.css'

function StackCard({ group }) {
  const spot = useSpotlight()

  return (
    <div className="stack__card card spotlight" {...spot}>
      <div className="stack__cardHeader">
        <div className="stack__dots">
          <span className="stack__dot is-active" />
          <span className="stack__dot" />
          <span className="stack__dot" />
        </div>
        <span className="stack__cardTag mono">[ {group.tag} ]</span>
      </div>

      <div className="stack__items">
        {group.items.map((it) => (
          <div className="stack__row" key={it.name}>
            <span className="stack__name">{it.name}</span>
            <div className="stack__status">
              <span className="stack__level mono">{it.level}</span>
              <div
                className="stack__meter"
                role="progressbar"
                aria-label={`${it.name} proficiency: ${it.level}`}
                aria-valuenow={it.score}
                aria-valuemin="0"
                aria-valuemax="10"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <span
                    key={i}
                    className={`stack__segment ${i < it.score ? 'is-filled' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  return (
    <section id="stack" className="stack">
      <SectionHead
        num="04"
        title="Stack"
        blurb="What I reach for when an idea has to become a system that runs."
      />

      <div className="stack__grid reveal">
        {stack.map((group) => (
          <StackCard key={group.tag} group={group} />
        ))}
      </div>
    </section>
  )
}
