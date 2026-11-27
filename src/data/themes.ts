export interface Theme {
  /** Value of <html data-theme>; must match a block in styles/theme.css. */
  id: string
  name: string
  /** One line shown under the name in the theme menu. */
  note: string
  /** Picker preview: background first, then three hues. */
  swatch: readonly [string, string, string, string]
}

/**
 * The OS skins, in the order the `t` key cycles through them. The colors, fonts
 * and the shell prompt for each one live in styles/theme.css.
 */
export const THEMES = [
  { id: 'kali', name: 'Kali', note: 'blue, user session', swatch: ['#0f1218', '#4d8bf5', '#8fb6ff', '#4cd388'] },
  { id: 'kali-root', name: 'Kali root', note: 'red, root session', swatch: ['#130f11', '#f25c5c', '#ff9b9b', '#f5c451'] },
  { id: 'parrot', name: 'Parrot', note: 'teal, Parrot skin', swatch: ['#07161b', '#1bd6c8', '#ff4b55', '#ffd23f'] },
] as const satisfies readonly Theme[]

export type ThemeId = (typeof THEMES)[number]['id']

export const DEFAULT_THEME: ThemeId = 'kali'

export function findTheme(id: string): Theme {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0]
}

export function isThemeId(value: unknown): value is ThemeId {
  return THEMES.some((theme) => theme.id === value)
}
