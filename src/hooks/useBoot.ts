import { useCallback, useLayoutEffect, useState } from 'react'

const BOOTED_KEY = 'booted'
const MOTION_KEY = 'motion'

function read(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    // Storage can be blocked (private mode).
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Not remembered, which is fine.
  }
}

/**
 * Whether the boot menu is showing, and the fail-safe (no animations) setting
 * it controls. The menu shows on the first visit and again on Reboot.
 */
export function useBoot() {
  const [showBoot, setShowBoot] = useState(() => read(BOOTED_KEY) !== '1')
  const [motionOff, setMotionOff] = useState(() => read(MOTION_KEY) === 'off')

  useLayoutEffect(() => {
    if (motionOff) document.documentElement.dataset.motion = 'off'
    else delete document.documentElement.dataset.motion
    write(MOTION_KEY, motionOff ? 'off' : 'on')
  }, [motionOff])

  const finishBoot = useCallback((nextMotionOff: boolean) => {
    setMotionOff(nextMotionOff)
    setShowBoot(false)
    write(BOOTED_KEY, '1')
  }, [])

  const reboot = useCallback(() => setShowBoot(true), [])

  return { showBoot, motionOff, finishBoot, reboot }
}
