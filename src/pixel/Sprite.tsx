import { useMemo } from 'react'
import { PALETTE, SPRITES, type SpriteName } from './sprites'
import './pixel.css'

interface SpriteProps {
  name: SpriteName
  /** Rendered edge length in CSS pixels. */
  size?: number
  /** Palette slot for the main color, e.g. "green". Defaults to the inherited text color. */
  hue?: string
  className?: string
}

/** Merge each row's neighbouring pixels of one color into a single rect. */
function toRuns(rows: readonly string[]) {
  const runs: { x: number; y: number; length: number; fill: string }[] = []
  rows.forEach((row, y) => {
    let x = 0
    while (x < row.length) {
      let end = x + 1
      while (end < row.length && row[end] === row[x]) end++
      const fill = PALETTE[row[x]]
      if (fill) runs.push({ x, y, length: end - x, fill })
      x = end
    }
  })
  return runs
}

/** A piece of pixel art. Decorative, so hidden from assistive tech. */
export function Sprite({ name, size = 48, hue, className }: SpriteProps) {
  const rows = SPRITES[name]
  const runs = useMemo(() => toRuns(rows), [rows])

  return (
    <svg
      className={['sprite', className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${rows[0].length} ${rows.length}`}
      width={size}
      height={size}
      style={hue ? { color: `var(--${hue})` } : undefined}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {runs.map((run) => (
        <rect key={`${run.x}-${run.y}`} x={run.x} y={run.y} width={run.length} height="1" fill={run.fill} />
      ))}
    </svg>
  )
}
