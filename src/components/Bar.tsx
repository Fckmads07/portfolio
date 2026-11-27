import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatShort, github } from '../data/github'
import { WORKSPACES } from '../data/nav'
import { socialById } from '../data/profile'
import type { ThemeId } from '../data/themes'
import { Icon } from '../icons/Icon'
import { AppMenu } from './AppMenu'
import { ThemeMenu } from './ThemeMenu'
import './Bar.css'

const clockFormat = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Toronto',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <time className="bar__clock" dateTime={now.toISOString()} title="Local time in Montréal">
      {clockFormat.format(now).replace(',', '')} <span className="bar__clock-zone">Montréal</span>
    </time>
  )
}

interface BarProps {
  theme: ThemeId
  onSelectTheme: (theme: ThemeId) => void
  onReboot: () => void
}

/** The top panel, laid out like Kali's Xfce panel: applications menu, task buttons, clock, tray. */
export function Bar({ theme, onSelectTheme, onReboot }: BarProps) {
  const githubLink = socialById('github')
  const linkedin = socialById('linkedin')

  return (
    <header className="bar">
      <div className="bar__inner">
        <AppMenu onReboot={onReboot} />

        <nav className="bar__nav" aria-label="Main">
          {WORKSPACES.map((workspace) => (
            <NavLink
              key={workspace.to}
              to={workspace.to}
              end={workspace.to === '/'}
              className={({ isActive }) => `bar__link${isActive ? ' is-active' : ''}`}
              title={`${workspace.label} (press ${workspace.key})`}
            >
              {workspace.label}
            </NavLink>
          ))}
        </nav>

        <div className="bar__status">
          <Clock />
          <a
            className="bar__sync"
            href={github.user.url}
            target="_blank"
            rel="noreferrer"
            title="GitHub data is synced automatically every two days"
          >
            <span className="dot" aria-hidden="true" />
            synced {formatShort(github.syncedAt)}
          </a>
        </div>

        <div className="bar__tray">
          <ThemeMenu theme={theme} onSelect={onSelectTheme} />
          {githubLink && (
            <a className="bar__icon" href={githubLink.href} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub">
              <Icon name="github" size={18} />
            </a>
          )}
          {linkedin && (
            <a className="btn btn--primary bar__cta" href={linkedin.href} target="_blank" rel="noreferrer">
              Let's connect
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
