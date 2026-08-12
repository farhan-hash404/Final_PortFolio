import './SectionHead.css'

export default function SectionHead({ num, title, blurb, children }) {
  return (
    <header className="sh reveal">
      <div className="sh__num mono">
        <span className="accent">{num}</span>
        <i />
      </div>
      <h2 className="sh__title">{title}</h2>
      {blurb && <p className="sh__blurb">{blurb}</p>}
      {children}
    </header>
  )
}
