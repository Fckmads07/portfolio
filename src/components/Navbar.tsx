import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Icon } from './Icon'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/experience', label: 'Experience', end: false },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <nav className="container nav__inner" aria-label="Main">
        <Link to="/" className="brand" aria-label="Madhav Ramdin — home">
          <span className="brand__mark">
            <Icon name="terminal" />
          </span>
          <span>
            Madhav Ramdin <span className="brand__sub">~/portfolio</span>
          </span>
        </Link>

        <ul className="nav__links" id="nav-links">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className="nav__link">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <a
            className="btn btn--primary btn--sm nav__cta"
            href="https://www.linkedin.com/in/madhav-ramdin-241a06377/"
            target="_blank"
            rel="noreferrer"
          >
            Let's connect
          </a>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>
    </header>
  )
}
