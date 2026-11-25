import { useMemo, type CSSProperties } from 'react'
import { layoutText } from './font'
import './pixel.css'

interface PixelTextProps {
  text: string
  /** Draw a copy one pixel down and to the right, in a darker accent. */
  shadow?: boolean
  /** Blank columns between glyphs. */
  tracking?: number
  /** Pixels pop in at random on mount. */
  animate?: boolean
  className?: string
}

/** A stable value in [0, 1) per pixel, so the pop-in order is the same on every render. */
function noise(x: number, y: number): number {
  const n = Math.sin(x * 91.7 + y * 47.3 + 13.1) * 24634.6345
  return n - Math.floor(n)
}

/**
 * Text drawn from the bitmap font. Size it with `--px` (the edge of one pixel)
 * on the element or an ancestor. Purely visual: pair it with real text.
 */
export function PixelText({ text, shadow = false, tracking = 1, animate = false, className }: PixelTextProps) {
  const layout = useMemo(() => layoutText(text, tracking), [text, tracking])
  const pad = shadow ? 1 : 0
  const width = layout.width + pad
  const height = layout.height + pad

  const rects = (dx: number, extraDelay: number) =>
    layout.pixels.map(({ x, y }) => (
      <rect
        key={`${x}-${y}`}
        x={x + dx}
        y={y + dx}
        width="1"
        height="1"
        style={animate ? { animationDelay: `${extraDelay + Math.round(noise(x, y) * 800)}ms` } : undefined}
      />
    ))

  return (
    <svg
      className={['pixel-text', animate && 'pixel-text--animate', className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${width} ${height}`}
      style={{ aspectRatio: `${width} / ${height}`, '--rows': height } as CSSProperties}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {shadow && <g className="pixel-text__shadow">{rects(1, 100)}</g>}
      <g className="pixel-text__face">{rects(0, 0)}</g>
    </svg>
  )
}
