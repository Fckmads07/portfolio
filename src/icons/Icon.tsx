import { ICONS, type IconName, type Shape } from './icons'

interface IconProps {
  name: IconName
  /** Rendered edge length in CSS pixels. */
  size?: number
  /** Palette slot for the color, e.g. "green". Defaults to the inherited text color. */
  hue?: string
  className?: string
}

/** Thinner strokes at large sizes, so big icons don't look heavy. In 24-unit grid space. */
function strokeFor(size: number) {
  if (size >= 64) return 1.25
  if (size >= 36) return 1.5
  return 2
}

function draw(shape: Shape, key: number) {
  if (typeof shape === 'string') return <path key={key} d={shape} />
  if ('c' in shape) {
    const [cx, cy, r] = shape.c
    return <circle key={key} cx={cx} cy={cy} r={r} />
  }
  const [x, y, width, height, rx] = shape.r
  return <rect key={key} x={x} y={y} width={width} height={height} rx={rx} />
}

/** A line icon. Decorative, so hidden from assistive tech. */
export function Icon({ name, size = 48, hue, className }: IconProps) {
  return (
    <svg
      className={['icon', className].filter(Boolean).join(' ')}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeFor(size)}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={hue ? { color: `var(--${hue})` } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name].map(draw)}
    </svg>
  )
}
