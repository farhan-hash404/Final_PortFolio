import { useCallback, useEffect, useState } from 'react'

/** True only for real mouse users — touch devices skip the custom cursor. */
export function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)')
    const apply = () => setFine(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return fine
}

/**
 * Feeds --mx/--my to an element so `.spotlight` can paint a glow that
 * follows the cursor. Returns props to spread onto the element.
 */
export function useSpotlight() {
  const onMouseMove = useCallback((e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return { onMouseMove }
}

/**
 * Magnetic pull — the element leans toward the cursor while hovered and
 * springs back on exit. `strength` is the max travel in px.
 */
export function useMagnetic(strength = 8) {
  const onMouseMove = useCallback(
    (e) => {
      const el = e.currentTarget
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
      el.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
    },
    [strength]
  )

  const onMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = ''
  }, [])

  return { onMouseMove, onMouseLeave }
}
