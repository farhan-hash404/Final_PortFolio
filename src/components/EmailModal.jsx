import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import Icon from './Icon'
import './EmailModal.css'

export default function EmailModal({ open, onClose }) {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  useEffect(() => {
    if (!open) return

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    // Prevent body scroll when open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    profile.email
  )}`
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(
    profile.email
  )}`
  const mailtoUrl = `mailto:${profile.email}`

  return (
    <div className="em" role="dialog" aria-modal="true" aria-labelledby="em-title">
      <div className="em__scrim" onClick={onClose} />

      <div className="em__panel">
        <header className="em__head">
          <div className="em__headTop">
            <span className="em__tag mono">
              <Icon name="mail" size={12} /> EMAIL OPTIONS
            </span>
            <button
              className="em__close"
              onClick={onClose}
              aria-label="Close email options"
              data-cursor="link"
            >
              <Icon name="close" size={13} />
            </button>
          </div>

          <h3 id="em-title" className="em__title">
            Send an email to {profile.firstName}
          </h3>
          <p className="em__sub">
            Pick your preferred service to compose directly, or copy the address.
          </p>

          <div className="em__pill">
            <span className="em__pillAddress">{profile.email}</span>
            <button
              className={`em__pillBtn ${copied ? 'is-copied' : ''}`}
              onClick={copyEmail}
              data-cursor="link"
            >
              <Icon name={copied ? 'check' : 'copy'} size={12} />
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </header>

        <div className="em__list">
          {/* Gmail */}
          <a
            className="em__item em__item--primary"
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            data-cursor="link"
          >
            <span className="em__itemIcon">
              <Icon name="gmail" size={18} />
            </span>
            <span className="em__itemBody">
              <span className="em__itemRow">
                <span className="em__itemTitle">Open in Gmail</span>
                <span className="em__itemBadge">Recommended</span>
              </span>
              <span className="em__itemDesc">Compose directly in your browser via mail.google.com</span>
            </span>
            <Icon name="arrowUpRight" size={15} className="em__itemArrow" />
          </a>

          {/* Outlook Web */}
          <a
            className="em__item"
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            data-cursor="link"
          >
            <span className="em__itemIcon">
              <Icon name="outlook" size={18} />
            </span>
            <span className="em__itemBody">
              <span className="em__itemRow">
                <span className="em__itemTitle">Open in Outlook Web</span>
                <span className="em__itemBadge">Web</span>
              </span>
              <span className="em__itemDesc">Compose via outlook.live.com in a new tab</span>
            </span>
            <Icon name="arrowUpRight" size={15} className="em__itemArrow" />
          </a>

          {/* Default Mail App */}
          <a
            className="em__item"
            href={mailtoUrl}
            onClick={onClose}
            data-cursor="link"
          >
            <span className="em__itemIcon">
              <Icon name="mail" size={18} />
            </span>
            <span className="em__itemBody">
              <span className="em__itemRow">
                <span className="em__itemTitle">Default Mail App</span>
                <span className="em__itemBadge">mailto:</span>
              </span>
              <span className="em__itemDesc">Launch system email client (Apple Mail, Outlook, etc.)</span>
            </span>
            <Icon name="arrowUpRight" size={15} className="em__itemArrow" />
          </a>

          {/* Copy Address Item */}
          <button
            type="button"
            className={`em__item ${copied ? 'em__item--copied' : ''}`}
            onClick={copyEmail}
            data-cursor="link"
          >
            <span className="em__itemIcon">
              <Icon name={copied ? 'check' : 'copy'} size={18} />
            </span>
            <span className="em__itemBody">
              <span className="em__itemRow">
                <span className="em__itemTitle">
                  {copied ? 'Copied to clipboard!' : 'Copy Email Address'}
                </span>
                <span className="em__itemBadge">{copied ? 'Done' : 'Clipboard'}</span>
              </span>
              <span className="em__itemDesc">{profile.email}</span>
            </span>
            <Icon name={copied ? 'check' : 'arrowRight'} size={15} className="em__itemArrow" />
          </button>
        </div>

        <footer className="em__foot">
          <span className="em__footStatus">
            <span className="ct__dot" />
            {profile.availabilityNote}
          </span>
          <span className="em__esc mono">ESC to close</span>
        </footer>
      </div>
    </div>
  )
}
