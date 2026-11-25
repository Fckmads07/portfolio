import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { findTheme, THEMES, type ThemeId } from '../data/themes'
import './ThemeMenu.css'

interface ThemeMenuProps {
  theme: ThemeId
  onSelect: (theme: ThemeId) => void
}

/** The theme picker in the top bar. */
export function ThemeMenu({ theme, onSelect }: ThemeMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const current = findTheme(theme)

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

  // Up and down arrows move between the options.
  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const options = [...event.currentTarget.querySelectorAll('button')]
    const index = options.indexOf(document.activeElement as HTMLButtonElement)
    const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length
    options[next]?.focus()
  }

  return (
    <div className="theme-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="theme-menu__button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Theme: ${current.name}. Change theme`}
        title="Change theme (t for the next one)"
      >
        <span className="theme-menu__swatch" aria-hidden="true">
          <i style={{ background: 'var(--accent)' }} />
          <i style={{ background: 'var(--accent-alt)' }} />
          <i style={{ background: 'var(--green)' }} />
          <i style={{ background: 'var(--yellow)' }} />
        </span>
        <span className="theme-menu__name">theme: {current.name.toLowerCase()}</span>
      </button>

      {open && (
        <div className="theme-menu__panel" id={panelId} onKeyDown={onPanelKeyDown}>
          <p className="theme-menu__heading" aria-hidden="true">
            Theme
          </p>
          {THEMES.map((option) => (
            <button
              type="button"
              className="theme-menu__option"
              key={option.id}
              aria-pressed={option.id === theme}
              onClick={() => onSelect(option.id)}
            >
              <span className="theme-menu__preview" aria-hidden="true" style={{ background: option.swatch[0] }}>
                {option.swatch.slice(1).map((color) => (
                  <i key={color} style={{ background: color }} />
                ))}
              </span>
              <span className="theme-menu__label">
                {option.name}
                <span className="theme-menu__note">{option.note}</span>
              </span>
              <span className="theme-menu__check" aria-hidden="true">
                {option.id === theme ? '●' : ''}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
