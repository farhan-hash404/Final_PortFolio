import { useEffect } from 'react'

/**
 * Toggles `.is-scrolling` on <body> while the page is actively scrolling,
 * clearing it ~160ms after the last scroll event.
 *
 * Used to pause the project diagrams' always-on SVG animations (the
 * dashed connector flow, the pulsing status dot) during scroll. Both
 * animate properties — stroke-dashoffset, the `r` attribute — that force
 * a repaint on every single frame forever, and that repaint competing
 * with the browser's scroll compositing is what shows up as flicker.
 * Pausing for the duration of the scroll removes the contention; the
 * animations resume exactly where they left off once scrolling settles.
 */
export function useScrollingClass() {
  useEffect(() => {
    let timer = 0

    const onScroll = () => {
      document.body.classList.add('is-scrolling')
      clearTimeout(timer)
      timer = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling')
      }, 160)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      document.body.classList.remove('is-scrolling')
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
