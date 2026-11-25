import { useEffect, useRef } from 'react'
import './pixel.css'

/** Grid step and square size, in CSS pixels. */
const STEP = 18
const SQUARE = 8
/** Width of the content column; mirrors --page in theme.css. */
const PAGE = 1120
const HUES = ['--accent', '--accent-alt', '--green'] as const
const TICK_MS = 160

/** 4×4 ordered-dither (Bayer) thresholds, so the squares fade in a regular pattern. */
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

interface Cell {
  x: number
  y: number
  /** How strongly this spot wants to be lit, 0–1. */
  density: number
  threshold: number
  hue: number
  alpha: number
  on: boolean
}

/** Seeded PRNG, so the field looks the same on every visit. */
function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Blocky low-frequency noise, so the squares gather in patches. */
function patch(col: number, row: number): number {
  const n = Math.sin(Math.floor(col / 4) * 17.13 + Math.floor(row / 4) * 61.71) * 9631.17
  return n - Math.floor(n)
}

function buildCells(width: number, height: number): Cell[] {
  const random = seeded(2007)
  const cells: Cell[] = []
  const gutter = Math.min(Math.max(16, width * 0.04), 32)
  // Distance from the screen edge to the start of the text column.
  const margin = Math.max(gutter, (width - PAGE) / 2)
  const reach = margin + Math.min(140, width * 0.18)

  const cols = Math.ceil(width / STEP)
  const rows = Math.ceil(height / STEP)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const center = col * STEP + STEP / 2
      const fromEdge = Math.min(center, width - center)
      if (fromEdge > reach) continue

      // 1 at the screen edge, fading to 0 a little way inside the text column.
      const t = 1 - fromEdge / reach
      const density = t * t * (0.45 + patch(col, row) * 0.75)
      if (density < 0.05) continue

      const insideText = fromEdge > margin
      cells.push({
        x: col * STEP + (STEP - SQUARE) / 2,
        y: row * STEP + (STEP - SQUARE) / 2,
        density,
        threshold: BAYER[(row % 4) * 4 + (col % 4)],
        hue: Math.floor(random() * HUES.length),
        alpha: insideText ? 0.07 : 0.1 + random() * 0.16,
        on: false,
      })
    }
  }
  return cells
}

/**
 * The dithered field of squares behind every page, thickest at the screen edges
 * and twinkling slowly. `theme` only triggers a redraw; colors come from CSS.
 */
export function PixelField({ theme }: { theme: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let cells: Cell[] = []
    let colors: string[] = []
    let timer: number | undefined

    const roll = (cell: Cell) => {
      cell.on = cell.density + (Math.random() - 0.5) * 0.35 > cell.threshold
    }

    const paint = (cell: Cell) => {
      ctx.clearRect(cell.x, cell.y, SQUARE, SQUARE)
      if (!cell.on) return
      ctx.globalAlpha = cell.alpha
      ctx.fillStyle = colors[cell.hue]
      ctx.fillRect(cell.x, cell.y, SQUARE, SQUARE)
    }

    const draw = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      const styles = getComputedStyle(document.documentElement)
      colors = HUES.map((name) => styles.getPropertyValue(name).trim())
      cells = buildCells(width, height)
      for (const cell of cells) {
        cell.on = cell.density > cell.threshold
        paint(cell)
      }
    }

    const twinkle = () => {
      if (document.hidden || cells.length === 0) return
      const flips = Math.max(2, Math.round(cells.length / 80))
      for (let i = 0; i < flips; i++) {
        const cell = cells[Math.floor(Math.random() * cells.length)]
        roll(cell)
        paint(cell)
      }
    }

    const start = () => {
      window.clearInterval(timer)
      if (!motion.matches) timer = window.setInterval(twinkle, TICK_MS)
    }

    draw()
    start()
    window.addEventListener('resize', draw)
    motion.addEventListener('change', start)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('resize', draw)
      motion.removeEventListener('change', start)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="pixel-field" aria-hidden="true" />
}
