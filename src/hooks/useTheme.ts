import { useCallback, useLayoutEffect, useState } from 'react'
import { DEFAULT_THEME, isThemeId, THEMES, type ThemeId } from '../data/themes'

const STORAGE_KEY = 'theme'

function readStored(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isThemeId(stored)) return stored
  } catch {
    // Storage can be blocked (private mode); the default applies.
  }
  return DEFAULT_THEME
}

/** The active theme, mirrored on <html data-theme> and remembered in localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(readStored)

  // A layout effect, so the attribute is set before the first paint.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Not remembered, which is fine.
    }
    const base = getComputedStyle(document.documentElement).getPropertyValue('--base').trim()
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', base)
  }, [theme])

  const cycle = useCallback(() => {
    setTheme((current) => {
      const index = THEMES.findIndex((option) => option.id === current)
      return THEMES[(index + 1) % THEMES.length].id
    })
  }, [])

  return { theme, setTheme, cycle }
}
