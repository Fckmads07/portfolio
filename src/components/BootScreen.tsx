import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { profile } from '../data/profile'
import type { ThemeId } from '../data/themes'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import './BootScreen.css'

interface BootEntry {
  label: string
  theme: ThemeId
  /** Fail-safe: turn animations off for the whole site. */
  motionOff?: boolean
}

const ENTRIES: readonly BootEntry[] = [
  { label: 'Live system (Kali skin)', theme: 'kali' },
  { label: 'Live system (Kali skin, root session)', theme: 'kali-root' },
  { label: 'Live system (Parrot skin)', theme: 'parrot' },
  { label: 'Live system (fail-safe: no animations)', theme: 'kali', motionOff: true },
]

const AUTO_BOOT_SECONDS = 5
const LINE_MS = 170

function bootLog(entry: BootEntry): string[] {
  return [
    'Loading Linux 6.12.0-mr-amd64 ...',
    'Loading initial ramdisk ...',
    'OK|Started NetworkManager.',
    `OK|Reached target Network is Online (${profile.location}).`,
    `OK|Mounted /home/madhav (${profile.school}, ${profile.semester}).`,
    'OK|Started github-sync.timer (every 2 days).',
    'OK|Started portfolio.service.',
    `${entry.label.replace('Live system ', 'Booted ')}.`,
  ]
}

interface BootScreenProps {
  /** The skin that is already active; its entry is highlighted first. */
  theme: ThemeId
  motionOff: boolean
  onBoot: (entry: { theme: ThemeId; motionOff: boolean }) => void
}

/**
 * A GRUB-style boot menu shown on the first visit (and on Reboot). Each entry
 * picks a skin, then a short boot log plays and the site appears.
 */
export function BootScreen({ theme, motionOff, onBoot }: BootScreenProps) {
  const initial = Math.max(
    0,
    ENTRIES.findIndex((entry) => entry.theme === theme && Boolean(entry.motionOff) === motionOff),
  )
  const [selected, setSelected] = useState(initial)
  const [countdown, setCountdown] = useState<number | null>(AUTO_BOOT_SECONDS)
  const [booting, setBooting] = useState<BootEntry | null>(null)
  const [lines, setLines] = useState(0)
  const reducedMotion = usePrefersReducedMotion()
  const listRef = useRef<HTMLUListElement>(null)

  const finish = useCallback((entry: BootEntry) => onBoot({ theme: entry.theme, motionOff: Boolean(entry.motionOff) }), [onBoot])

  const boot = useCallback(
    (entry: BootEntry) => {
      setCountdown(null)
      if (reducedMotion || entry.motionOff) {
        finish(entry)
        return
      }
      setBooting(entry)
    },
    [finish, reducedMotion],
  )

  // Focus the highlighted entry and stop the page behind from scrolling.
  useEffect(() => {
    listRef.current?.querySelectorAll('button')[initial]?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [initial])

  // GRUB-style countdown; any key or pointer move stops it.
  useEffect(() => {
    if (countdown === null) return
    const timer = window.setTimeout(() => {
      if (countdown > 1) setCountdown(countdown - 1)
      else boot(ENTRIES[selected])
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [countdown, selected, boot])

  // Print the boot log a line at a time, then hand over to the site.
  useEffect(() => {
    if (!booting) return
    const total = bootLog(booting).length
    if (lines < total) {
      const timer = window.setTimeout(() => setLines(lines + 1), LINE_MS)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => finish(booting), 350)
    return () => window.clearTimeout(timer)
  }, [booting, lines, finish])

  const move = (index: number) => {
    const next = (index + ENTRIES.length) % ENTRIES.length
    setSelected(next)
    listRef.current?.querySelectorAll('button')[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    setCountdown(null)
    if (booting) {
      // Any key skips the rest of the log.
      event.preventDefault()
      finish(booting)
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      move(selected + 1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      move(selected - 1)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      finish(ENTRIES[selected])
    }
  }

  return (
    <div
      className="boot"
      role="dialog"
      aria-modal="true"
      aria-label="Boot menu: choose how to view the site"
      onKeyDown={onKeyDown}
      onPointerMove={() => setCountdown(null)}
    >
      {booting ? (
        <div className="boot__log" aria-live="polite" onClick={() => finish(booting)}>
          {bootLog(booting)
            .slice(0, lines)
            .map((line, index, shown) => {
              const [tag, text] = line.startsWith('OK|') ? ['OK', line.slice(3)] : [null, line]
              const last = index === shown.length - 1 && shown.length === bootLog(booting).length
              return (
                <p className={last ? 'boot__done' : undefined} key={line}>
                  {tag && <span className="boot__ok">[  OK  ]</span>} {text}
                </p>
              )
            })}
          <p className="boot__skip">Press any key or click to skip</p>
        </div>
      ) : (
        <div className="boot__grub">
          <h2 className="boot__title">MR GNU/Linux · portfolio live boot</h2>
          <ul className="boot__list" ref={listRef}>
            {ENTRIES.map((entry, index) => (
              <li key={entry.label}>
                <button
                  type="button"
                  className={`boot__entry${index === selected ? ' is-selected' : ''}`}
                  onClick={() => boot(entry)}
                  onFocus={() => setSelected(index)}
                  onMouseEnter={() => setSelected(index)}
                >
                  {entry.label}
                </button>
              </li>
            ))}
          </ul>
          <p className="boot__help">
            Use the ↑ and ↓ keys, then Enter. Esc skips the boot.
            <br />
            {countdown !== null ? (
              <>The highlighted entry boots automatically in {countdown}s.</>
            ) : (
              <>You can change this later from Applications → Reboot.</>
            )}
          </p>
        </div>
      )}
    </div>
  )
}
