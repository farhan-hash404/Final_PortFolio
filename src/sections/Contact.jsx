import { useState } from 'react'
import { careerFocus, contactLinks, profile } from '../data/content'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { useSpotlight } from '../hooks/usePointer'
import './Contact.css'

export default function Contact() {
  const spot = useSpotlight()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked (insecure context or denied) — the mailto link
      // beside this button still works, so just leave the label alone.
    }
  }

  return (
    <section id="contact" className="ct">
      <div className="ct__panel card spotlight reveal" {...spot}>
        <p className="ct__num mono">
          <span className="accent">06</span> — CONTACT
        </p>

        <h2 className="ct__h2">
          Let&apos;s build something
          <br />
          that <span className="accent">reasons</span>.
        </h2>

        <p className="ct__blurb">{careerFocus}</p>

        <div className="ct__actions">
          <Button variant="solid" icon="arrowUpRight" href={`mailto:${profile.email}`}>
            Email me
          </Button>
          <Button as="button" variant="quiet" icon={copied ? 'check' : 'copy'} onClick={copyEmail}>
            {copied ? 'Copied' : profile.email}
          </Button>
          <Button variant="quiet" icon="download" href={profile.cv} download>
            Download CV
          </Button>
        </div>

        <div className="ct__links">
          {contactLinks.map((l) => (
            <a
              className="ct__link"
              key={l.id}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              data-cursor="link"
            >
              <span className="ct__linkIcon">
                <Icon name={l.icon} size={16} />
              </span>
              <span className="ct__linkText">
                <span className="ct__linkLabel mono">{l.label}</span>
                <span className="ct__linkValue">{l.value}</span>
              </span>
              <Icon name={l.external ? 'arrowUpRight' : 'arrowRight'} size={15} />
            </a>
          ))}
        </div>

        <p className="ct__avail">
          <span className="ct__dot" />
          {profile.availabilityNote} · {profile.location}
        </p>
      </div>

      <footer className="ft">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="ft__mid mono">Built with React · Deployed on Netlify</span>
        <a href="#intro" className="ft__top" data-cursor="link">
          Back to top <Icon name="arrowUpRight" size={13} />
        </a>
      </footer>
    </section>
  )
}
