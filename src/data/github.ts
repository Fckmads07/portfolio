/**
 * Live GitHub data. src/data/github.json is rewritten every two days by
 * scripts/sync-github.mjs (see .github/workflows/sync-github.yml); never edit it by hand.
 */
import snapshot from './github.json'

export interface Repo {
  name: string
  url: string
  description: string
  language: string | null
  topics: string[]
  homepage: string | null
  stars: number
  createdAt: string
  pushedAt: string
}

export interface ContributionDay {
  date: string
  count: number
}

export const github = snapshot as {
  syncedAt: string
  user: { login: string; url: string; publicRepos: number; followers: number; createdAt: string }
  repos: Repo[]
  languages: { name: string; bytes: number }[]
  contributions: { total: number; weeks: ContributionDay[][] }
}

/** Most recently pushed first. */
export const repos = [...github.repos].sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))

export const repoByName = (name: string | undefined) => (name ? github.repos.find((r) => r.name === name) : undefined)

const DAY = 86_400_000

/** Measured from the sync, not from "now", so the static page never drifts out of date. */
export function ago(iso: string): string {
  const days = Math.max(0, Math.floor((Date.parse(github.syncedAt) - Date.parse(iso)) / DAY))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  const years = Math.round(days / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

const dateFormat = new Intl.DateTimeFormat('en-CA', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
export const formatDate = (iso: string) => dateFormat.format(new Date(iso))

const shortFormat = new Intl.DateTimeFormat('en-CA', { day: 'numeric', month: 'short', timeZone: 'UTC' })
export const formatShort = (iso: string) => shortFormat.format(new Date(iso))

/** A repo counts as new for 30 days after it is created. */
export const isNew = (repo: Repo) => Date.parse(github.syncedAt) - Date.parse(repo.createdAt) < 30 * DAY

/** Language share in percent, rounded, biggest first. */
export const languageShare = (() => {
  const total = github.languages.reduce((sum, l) => sum + l.bytes, 0) || 1
  return github.languages.map((l) => ({ name: l.name, percent: (l.bytes / total) * 100 }))
})()

/** Palette slot per language, for dots and bars. */
const LANGUAGE_HUES: Record<string, string> = {
  Python: 'yellow',
  JavaScript: 'peach',
  TypeScript: 'blue',
  HTML: 'red',
  CSS: 'mauve',
  Java: 'pink',
  C: 'teal',
  Shell: 'green',
}
export const languageHue = (name: string | null) => (name && LANGUAGE_HUES[name]) || 'overlay1'

/** Days with any activity in the last 30 days of the calendar. */
export const activeDaysLastMonth = github.contributions.weeks
  .flat()
  .slice(-30)
  .filter((d) => d.count > 0).length
