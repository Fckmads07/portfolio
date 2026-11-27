import { useEffect, useState } from 'react'

const query = '(prefers-reduced-motion: reduce)'

/** Fail-safe mode from the boot menu sets <html data-motion="off">. */
function motionOff() {
  return document.documentElement.dataset.motion === 'off'
}

/** True when the OS asks for less motion, or when fail-safe mode is on. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches || motionOff())

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setReduced(mql.matches || motionOff())
    mql.addEventListener('change', onChange)
    const observer = new MutationObserver(onChange)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
    return () => {
      mql.removeEventListener('change', onChange)
      observer.disconnect()
    }
  }, [])

  return reduced
}
