import { useEffect, useRef, useState } from 'react'
import './Cursor.css'

/**
 * Two-part cursor: a dot that tracks the pointer exactly and a ring that
 * lags behind it. Position is written straight to the DOM inside a rAF
 * loop — only the hover *variant* lives in React state, so moving the
 * mouse never triggers a re-render.
 *
 * Elements opt into a variant with `data-cursor="view|link|drag|text"`.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const target = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef(0)

  const [variant, setVariant] = useState('default')
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      if (!visible) setVisible(true)
    }

    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target.closest('[data-cursor]') : null
      if (el) {
        setVariant(el.dataset.cursor || 'link')
        setLabel(el.dataset.cursorLabel || '')
        return
      }
      const hit =
        e.target instanceof Element
          ? e.target.closest('a, button, input, textarea, [role="button"]')
          : null
      if (hit) {
        const isText = hit.tagName === 'INPUT' || hit.tagName === 'TEXTAREA'
        setVariant(isText ? 'text' : 'link')
        setLabel('')
      } else {
        setVariant('default')
        setLabel('')
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const tick = () => {
      // Dot snaps; ring eases toward the same point for the trailing feel.
      ring.current.x += (target.current.x - ring.current.x) * 0.16
      ring.current.y += (target.current.y - ring.current.y) * 0.16

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [visible])

  useEffect(() => {
    document.body.classList.add('cursor-custom')
    return () => document.body.classList.remove('cursor-custom')
  }, [])

  const state = [
    'cur',
    `cur--${variant}`,
    visible ? 'is-on' : '',
    pressed ? 'is-pressed' : '',
  ].join(' ')

  return (
    <div className={state} aria-hidden="true">
      <div className="cur__ring" ref={ringRef}>
        <span className="cur__label">{label || (variant === 'view' ? 'VIEW' : '')}</span>
      </div>
      <div className="cur__dot" ref={dotRef} />
    </div>
  )
}
