import { formatDate, formatShort, github, languageHue, languageShare } from '../data/github'
import './Activity.css'

const CELL = 10
const GAP = 3
const PITCH = CELL + GAP
const LEFT = 26
const TOP = 16
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']
const monthFormat = new Intl.DateTimeFormat('en-CA', { month: 'short', timeZone: 'UTC' })

const days = github.contributions.weeks.flat()
const max = Math.max(1, ...days.map((d) => d.count))

/** 0 for none, then four steps, like GitHub's own graph. */
function level(count: number): number {
  if (count === 0) return 0
  return Math.min(4, Math.ceil((count / max) * 4))
}

function longestStreak(): number {
  let best = 0
  let run = 0
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0
    best = Math.max(best, run)
  }
  return best
}

const busiest = days.reduce((top, day) => (day.count > top.count ? day : top), { date: '', count: 0 })
const activeDays = days.filter((d) => d.count > 0).length

/** One label per month, above the first week that starts in it. */
const monthLabels = github.contributions.weeks.flatMap((week, index) => {
  const first = week[0]
  if (!first) return []
  const previous = github.contributions.weeks[index - 1]?.[0]
  const month = first.date.slice(0, 7)
  if (previous && previous.date.slice(0, 7) === month) return []
  if (!previous && Number(first.date.slice(8)) > 7) return []
  return [{ x: LEFT + index * PITCH, label: monthFormat.format(new Date(first.date)) }]
})

/** The contribution graph, drawn like traffic on a link, plus the language split. */
export function Activity() {
  const weeks = github.contributions.weeks
  const width = LEFT + weeks.length * PITCH
  const height = TOP + 7 * PITCH

  return (
    <div className="activity">
      <div className="activity__graph window">
        <div className="window__bar">
          <span className="window__title">iftop -i github0 · last 12 months</span>
          <span className="window__meta">synced {formatDate(github.syncedAt)}</span>
        </div>
        <div className="window__body">
          <div className="activity__scroll">
            <svg
              className="activity__svg"
              viewBox={`0 0 ${width} ${height}`}
              width={width}
              height={height}
              shapeRendering="crispEdges"
              role="img"
              aria-label={`${github.contributions.total} contributions in the last year`}
            >
              {monthLabels.map((m) => (
                <text key={m.x} x={m.x} y={10} className="activity__label">
                  {m.label}
                </text>
              ))}
              {DAY_LABELS.map((label, row) =>
                label ? (
                  <text key={label} x={0} y={TOP + row * PITCH + CELL - 1} className="activity__label">
                    {label}
                  </text>
                ) : null,
              )}
              {weeks.map((week, col) =>
                week.map((day) => {
                  const row = new Date(day.date).getUTCDay()
                  return (
                    <rect
                      key={day.date}
                      x={LEFT + col * PITCH}
                      y={TOP + row * PITCH}
                      width={CELL}
                      height={CELL}
                      className={`activity__cell activity__cell--${level(day.count)}`}
                    >
                      <title>
                        {day.count} contribution{day.count === 1 ? '' : 's'} on {formatShort(day.date)}
                      </title>
                    </rect>
                  )
                }),
              )}
            </svg>
          </div>

          <div className="activity__foot">
            <p className="activity__caption">
              <strong>{github.contributions.total}</strong> contributions · {activeDays} active days · longest streak{' '}
              {longestStreak()} days
              {busiest.count > 0 && (
                <>
                  {' '}
                  · peak {busiest.count} on {formatShort(busiest.date)}
                </>
              )}
            </p>
            <p className="activity__legend" aria-hidden="true">
              less
              {[0, 1, 2, 3, 4].map((n) => (
                <i key={n} className={`activity__cell--${n}`} />
              ))}
              more
            </p>
          </div>
        </div>
      </div>

      <div className="activity__langs window">
        <div className="window__bar">
          <span className="window__title">languages across public repos</span>
          <span className="window__meta">by bytes</span>
        </div>
        <div className="window__body">
          <div className="langbar" aria-hidden="true">
            {languageShare.map((l) => (
              <span key={l.name} style={{ width: `${l.percent}%`, background: `var(--${languageHue(l.name)})` }} />
            ))}
          </div>
          <ul className="langlist">
            {languageShare.map((l) => (
              <li key={l.name}>
                <span className="dot" style={{ color: `var(--${languageHue(l.name)})` }} aria-hidden="true" />
                <span className="langlist__name">{l.name}</span>
                <span className="langlist__pct">{l.percent.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
