export interface Theme {
  /** Value of <html data-theme>; must match a block in styles/theme.css. */
  id: string
  name: string
  /** One line shown under the name in the theme menu. */
  note: string
  /** Picker preview: background first, then three hues. */
  swatch: readonly [string, string, string, string]
}

/** Every theme, in the order the `t` key cycles through them. */
export const THEMES = [
  { id: 'noc', name: 'NOC', note: 'navy and cyan', swatch: ['#0b1120', '#22d3ee', '#60a5fa', '#4ade80'] },
  { id: 'soc', name: 'SOC', note: 'phosphor green', swatch: ['#090d0a', '#4ade80', '#86efac', '#fde047'] },
  { id: 'red-team', name: 'Red team', note: 'charcoal and red', swatch: ['#110d10', '#f87171', '#fca5a5', '#fbbf24'] },
  { id: 'daylight', name: 'Daylight', note: 'light, for reading', swatch: ['#f6f8fb', '#0e7490', '#1d4ed8', '#15803d'] },
  { id: 'parrot', name: 'Parrot', note: 'the original look', swatch: ['#0a0118', '#00fff0', '#4d9fff', '#5cffa1'] },
] as const satisfies readonly Theme[]

export type ThemeId = (typeof THEMES)[number]['id']

export const DEFAULT_THEME: ThemeId = 'noc'

export function findTheme(id: string): Theme {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0]
}

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value)
}
