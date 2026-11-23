import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const TYPE_MS = 85
const DELETE_MS = 40
const HOLD_MS = 1700
const GAP_MS = 320

/** Types and deletes each word in turn, like the Parrot OS hero. */
export function Typewriter({ words }: { words: string[] }) {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return
    const word = words[index % words.length]
    const full = !deleting && text === word
    const empty = deleting && text === ''

    const delay = full ? HOLD_MS : empty ? GAP_MS : deleting ? DELETE_MS : TYPE_MS
    const timer = window.setTimeout(() => {
      if (full) setDeleting(true)
      else if (empty) {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [text, deleting, index, words, reduced])

  return (
    <span className="typer">
      <span className="sr-only">{words.join(', ')}</span>
      <span aria-hidden="true">{reduced ? words[0] : text}</span>
      <span className="typer__caret" aria-hidden="true" />
    </span>
  )
}
