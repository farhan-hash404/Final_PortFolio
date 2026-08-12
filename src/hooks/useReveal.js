import { useEffect } from 'react'

/**
 * Fades `.reveal` elements in once they enter the viewport.
 *
 * The observer drives the animation, but it is deliberately not the only
 * thing that can reveal content: these elements start at opacity 0, so a
 * delayed or throttled callback would leave the page looking blank. A
 * cheap scroll sweep plus a one-shot timer guarantee everything on screen
 * becomes visible even if the observer never reports. Both detach as soon
 * as nothing is left hidden, and in a healthy browser the observer always
 * wins first, so the staggered animation is unchanged.
 */
export function useReveal() {
  useEffect(() => {
    const remaining = () => document.querySelectorAll('.reveal:not(.is-in)')
    if (!remaining().length) return

    const show = (el) => el.classList.add('is-in')

    if (!('IntersectionObserver' in window)) {
      remaining().forEach(show)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target)
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    )
    remaining().forEach((n) => io.observe(n))

    // --- backstop ---
    // Time-throttled rather than rAF-throttled on purpose: rAF is part of
    // the same rendering pipeline that would be stalled in the case this
    // guards against.
    let last = 0

    const sweep = () => {
      last = performance.now()
      remaining().forEach((el) => {
        const b = el.getBoundingClientRect()
        if (b.top < window.innerHeight * 0.9 && b.bottom > 0) {
          show(el)
          io.unobserve(el)
        }
      })
      if (!remaining().length) detach()
    }

    const onScroll = () => {
      if (performance.now() - last > 100) sweep()
    }

    function detach() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const failsafe = setTimeout(sweep, 1500)

    return () => {
      clearTimeout(failsafe)
      detach()
      io.disconnect()
    }
  }, [])
}
