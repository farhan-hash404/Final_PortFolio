import { certifications, education, languages } from '../data/content'
import SectionHead from '../components/SectionHead'
import Icon from '../components/Icon'
import { useSpotlight } from '../hooks/usePointer'
import './Credentials.css'

export default function Credentials() {
  return (
    <section id="credentials" className="cred">
      <SectionHead
        num="05"
        title="Credentials"
        blurb="Degree, capstone programme, and the certifications behind the work — the paper trail under the projects."
      />

      <div className="cred__grid">
        {certifications.map((c, i) => (
          <CertCard key={c.title} c={c} delay={i * 60} />
        ))}
      </div>

      <div className="cred__lower">
        <EduCard />
        <LangCard />
      </div>
    </section>
  )
}

function CertCard({ c, delay }) {
  const spot = useSpotlight()
  const CardTag = c.proof ? 'a' : 'article'
  const linkProps = c.proof
    ? {
        href: c.proof,
        target: '_blank',
        rel: 'noopener noreferrer',
        'data-cursor': 'link',
        title: `View proof for ${c.title}`,
      }
    : {}

  return (
    <CardTag
      className={`cert card spotlight reveal ${c.accent ? 'is-accent' : ''} ${c.proof ? 'is-link' : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...spot}
      {...linkProps}
    >
      <div className="cert__head">
        <div className="cert__icon">
          <Icon name={c.accent ? 'trophy' : 'medal'} size={17} />
        </div>
        {c.proof && (
          <span className="cert__proofBadge mono">
            <span>{c.proofLabel || 'View Proof'}</span>
            <Icon name="arrowUpRight" size={11} />
          </span>
        )}
      </div>
      <p className="cert__tag mono">{c.tag}</p>
      <h3 className="cert__title">{c.title}</h3>
      <p className="cert__issuer">{c.issuer}</p>

      {c.verifyUrl && (
        <div className="cert__extraLinks" onClick={(e) => e.stopPropagation()}>
          <a
            href={c.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cert__verifyLink mono"
            data-cursor="link"
          >
            <span>Verify on Coursera</span>
            <Icon name="arrowUpRight" size={10} />
          </a>
        </div>
      )}
    </CardTag>
  )
}

function EduCard() {
  const spot = useSpotlight()
  return (
    <article className="edu card spotlight reveal" {...spot}>
      <div className="edu__head">
        <div>
          <p className="mono accent">Education</p>
          <h3 className="edu__degree">{education.degree}</h3>
          <p className="edu__school">{education.school}</p>
        </div>
        <span className="edu__period mono">{education.period}</span>
      </div>

      <ul className="edu__notes">
        {education.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </article>
  )
}

function LangCard() {
  const spot = useSpotlight()
  return (
    <article className="lang card spotlight reveal" style={{ '--reveal-delay': '80ms' }} {...spot}>
      <p className="mono accent">Languages</p>
      <div className="lang__list">
        {languages.map((l) => (
          <div className="lang__row" key={l.name}>
            <span className="lang__name">{l.name}</span>
            <i />
            <span className="lang__level mono">{l.level}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
