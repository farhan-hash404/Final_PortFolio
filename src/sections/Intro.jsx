import { hero, profile } from '../data/content'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { useSpotlight } from '../hooks/usePointer'
import './Intro.css'

export default function Intro({ onOpenEmail }) {
  const spot = useSpotlight()

  const handleEmailClick = () => {
    if (onOpenEmail) {
      onOpenEmail()
    } else {
      window.dispatchEvent(new CustomEvent('open-email-modal'))
    }
  }

  return (
    <section id="intro" className="intro">
      {/* ---- eyebrow ---- */}
      <header className="intro__top reveal">
        <p className="intro__crumbs mono">
          <span className="accent">01</span>
          <span className="intro__slash">|</span>
          {/* Role is hidden on small screens — the top bar already shows it. */}
          <span className="intro__crumbRole">
            {profile.role}
            <span className="intro__slash">/</span>
          </span>
          {profile.location}
        </p>

        <div className="intro__stats">
          {hero.stats.map((s) => (
            <div key={s.label} className="intro__stat">
              <span className="intro__statVal">{s.value}</span>
              <span className="intro__statLbl mono">{s.label}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ---- badge ---- */}
      <a
        className="intro__badge reveal"
        href={hero.badge.action.href}
        target={hero.badge.action.target || '_blank'}
        rel="noopener noreferrer"
        style={{ '--reveal-delay': '60ms' }}
        data-cursor="link"
        title="View Certificate of Honorable Mention"
      >
        <Icon name="trophy" size={15} className="intro__badgeIcon" />
        <span>
          {hero.badge.text} <strong>{hero.badge.highlight}</strong> {hero.badge.tail}
        </span>
        <span className="intro__badgeBtn">
          {hero.badge.action.label}
          <Icon name="arrowUpRight" size={12} />
        </span>
      </a>

      {/* ---- name + tagline ---- */}
      <h1 className="intro__h1 reveal" style={{ '--reveal-delay': '110ms' }}>
        {profile.name}
      </h1>

      <p className="intro__tagline reveal" style={{ '--reveal-delay': '150ms' }}>
        {hero.tagline[0]} <span className="intro__hl">{hero.tagline[1]}</span>{' '}
        {hero.tagline[2]}
      </p>

      <p className="intro__sub reveal" style={{ '--reveal-delay': '190ms' }}>
        {hero.subline}
      </p>

      {/* ---- points + focus card ---- */}
      <div className="intro__mid">
        <ul className="intro__points reveal" style={{ '--reveal-delay': '210ms' }}>
          {hero.points.map((p) => (
            <li key={p.lead}>
              <strong>{p.lead}</strong> — {p.body}
            </li>
          ))}
        </ul>

        <div
          className="intro__focus card spotlight reveal"
          style={{ '--reveal-delay': '260ms' }}
          {...spot}
        >
          <div className="intro__focusHead">
            <span className="mono">
              <Icon name="chart" size={12} /> {hero.focusCard.title}
            </span>
            <span className="intro__focusHint">{hero.focusCard.hint}</span>
          </div>

          <div className="intro__bars">
            {hero.focusCard.bars.map((b, i) => (
              <div className="intro__bar" key={b.label}>
                <div className="intro__barTop">
                  <span>{b.label}</span>
                  <span className="intro__barVal">{b.value}%</span>
                </div>
                <div className="intro__barTrack">
                  <i style={{ '--w': `${b.value}%`, '--d': `${i * 120 + 200}ms` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- proof strip ---- */}
      <div className="intro__proof reveal">
        <div className="intro__proofItems">
          {hero.proof.map((p) => (
            <span className="intro__proofItem" key={p.text}>
              <Icon name={p.icon} size={15} />
              {p.text}
            </span>
          ))}
        </div>

        <div className="intro__cta">
          <Button
            variant="solid"
            icon="arrowUpRight"
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            View work
          </Button>
          <Button
            variant="ghost"
            as="button"
            onClick={handleEmailClick}
          >
            Get in touch
          </Button>
        </div>
      </div>
    </section>
  )
}
