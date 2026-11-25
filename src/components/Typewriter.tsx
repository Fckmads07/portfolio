import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const TYPE_MS = 85
const DELETE_MS = 40
const HOLD_MS = 1700
const GAP_MS = 320

/** Types and deletes each word in turn, ending in a block cursor. */
export function Typewriter({ words }: { words: string[] }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const word = words[index % words.length]
  const holding = !deleting && text === word
  const waiting = deleting && text === ''

  useEffect(() => {
    if (reduced) return
    const delay = holding ? HOLD_MS : waiting ? GAP_MS : deleting ? DELETE_MS : TYPE_MS
    const timer = window.setTimeout(() => {
      if (holding) setDeleting(true)
      else if (waiting) {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [text, deleting, holding, waiting, word, reduced])

  // Like a real terminal, the cursor stays solid while letters go in or out.
  const busy = !reduced && !holding && !waiting

  return (
    <span className="typer">
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">{reduced ? words[0] : text}</span>
      <span className={`typer__cursor${busy ? ' is-busy' : ''}`} aria-hidden="true" />
    </span>
  )
}
