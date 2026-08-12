import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently under the reading line so the rail
 * can highlight it. Picks the section whose top is closest to ~35% down
 * the viewport, which behaves better than a pure IntersectionObserver
 * when sections differ wildly in height.
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let best = ids[0]
      let bestDist = Infinity

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const { top, bottom } = el.getBoundingClientRect()
        if (bottom < 0 || top > window.innerHeight) continue
        const dist = Math.abs(top - line)
        if (dist < bestDist) {
          bestDist = dist
          best = id
        }
      }

      // Pin the last section once the page is scrolled to the very bottom.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 40) {
        best = ids[ids.length - 1]
      }

      setActive((prev) => (prev === best ? prev : best))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
