#!/usr/bin/env node
/**
 * Pulls my public GitHub data into src/data/github.json, which the site reads at build time.
 *
 * Runs every two days from .github/workflows/sync-github.yml (and by hand with `npm run sync`).
 * The workflow commits the new file, and the push makes Vercel rebuild the site.
 *
 * Token: GITHUB_TOKEN or GH_TOKEN if set, otherwise the one the `gh` CLI is logged in with.
 * Without a token the REST data still works (rate-limited), but the contribution graph needs one.
 * If any part fails, the previous values in github.json are kept, so a bad sync never blanks the site.
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const USER = 'Fckmads07'
/** Repos that are not projects (the profile README). */
const HIDDEN = new Set([USER])
const OUT = fileURLToPath(new URL('../src/data/github.json', import.meta.url))

function findToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN
  try {
    return execSync('gh auth token', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null
  } catch {
    return null
  }
}

const token = findToken()
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'portfolio-sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

async function rest(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers })
  if (!response.ok) throw new Error(`GET ${path}: ${response.status} ${response.statusText}`)
  return response.json()
}

async function graphql(query, variables) {
  if (!token) throw new Error('no token, skipping the contribution graph')
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const body = await response.json()
  if (!response.ok || body.errors) throw new Error(`GraphQL: ${JSON.stringify(body.errors ?? response.status)}`)
  return body.data
}

function readPrevious() {
  try {
    return JSON.parse(readFileSync(OUT, 'utf8'))
  } catch {
    return {}
  }
}

/** Run one part of the sync; on failure, warn and fall back to the old value. */
async function attempt(label, task, fallback) {
  try {
    return await task()
  } catch (error) {
    console.warn(`! ${label}: ${error.message}${fallback === undefined ? '' : ' (kept the previous data)'}`)
    return fallback
  }
}

async function main() {
  const previous = readPrevious()

  const user = await attempt(
    'profile',
    async () => {
      const u = await rest(`/users/${USER}`)
      return { login: u.login, url: u.html_url, publicRepos: u.public_repos, followers: u.followers, createdAt: u.created_at }
    },
    previous.user,
  )

  const repos = await attempt(
    'repos',
    async () => {
      const list = await rest(`/users/${USER}/repos?per_page=100&type=owner&sort=pushed`)
      return list
        .filter((r) => !r.fork && !r.private && !HIDDEN.has(r.name))
        .map((r) => ({
          name: r.name,
          url: r.html_url,
          description: r.description ?? '',
          language: r.language,
          topics: r.topics ?? [],
          homepage: r.homepage || null,
          stars: r.stargazers_count,
          createdAt: r.created_at,
          pushedAt: r.pushed_at,
        }))
    },
    previous.repos ?? [],
  )

  // Language bytes summed over every public repo, the way GitHub counts them.
  const languages = await attempt(
    'languages',
    async () => {
      const totals = {}
      for (const repo of repos) {
        const bytes = await rest(`/repos/${USER}/${repo.name}/languages`)
        for (const [name, size] of Object.entries(bytes)) totals[name] = (totals[name] ?? 0) + size
      }
      return Object.entries(totals)
        .map(([name, bytes]) => ({ name, bytes }))
        .sort((a, b) => b.bytes - a.bytes)
    },
    previous.languages ?? [],
  )

  const contributions = await attempt(
    'contributions',
    async () => {
      const data = await graphql(
        `query ($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks { contributionDays { date contributionCount } }
              }
            }
          }
        }`,
        { login: USER },
      )
      const calendar = data.user.contributionsCollection.contributionCalendar
      return {
        total: calendar.totalContributions,
        weeks: calendar.weeks.map((week) =>
          week.contributionDays.map((day) => ({ date: day.date, count: day.contributionCount })),
        ),
      }
    },
    previous.contributions ?? { total: 0, weeks: [] },
  )

  const snapshot = { syncedAt: new Date().toISOString(), user, repos, languages, contributions }
  writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(
    `Synced ${repos.length} repos, ${languages.length} languages, ${contributions.total} contributions → src/data/github.json`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
