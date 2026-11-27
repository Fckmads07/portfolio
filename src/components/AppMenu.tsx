import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { APP_MENU } from '../data/nav'
import { profile } from '../data/profile'
import './AppMenu.css'

interface AppMenuProps {
  /** Show the boot menu again. */
  onReboot: () => void
}

/** The Kali-style Applications menu at the left of the panel. */
export function AppMenu({ onReboot }: AppMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  // Close on a click outside or on Escape.
  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Up and down arrows move between the entries.
  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const entries = [...event.currentTarget.querySelectorAll<HTMLElement>('a, button')]
    const index = entries.indexOf(document.activeElement as HTMLElement)
    const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + entries.length) % entries.length
    entries[next]?.focus()
  }

  return (
    <div className="app-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="app-menu__button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Applications menu"
      >
        <span className="app-menu__mark" aria-hidden="true">
          MR
        </span>
        <span className="app-menu__label">Applications</span>
      </button>

      {open && (
        <div className="app-menu__panel" id={panelId} onKeyDown={onPanelKeyDown}>
          <p className="app-menu__heading" aria-hidden="true">
            {profile.name}
          </p>
          <nav aria-label="Sections">
            {APP_MENU.map((entry) => (
              <Link className="app-menu__entry" to={entry.to} key={entry.num} onClick={() => setOpen(false)}>
                <span className="app-menu__num" aria-hidden="true">
                  {entry.num}
                </span>
                <span className="app-menu__text">
                  {entry.label}
                  <span className="app-menu__category">
                    {entry.num} - {entry.category}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
          <hr className="app-menu__rule" />
          <button
            type="button"
            className="app-menu__entry"
            onClick={() => {
              setOpen(false)
              onReboot()
            }}
          >
            <span className="app-menu__num" aria-hidden="true">
              ⏻
            </span>
            <span className="app-menu__text">
              Reboot
              <span className="app-menu__category">back to the boot menu</span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
