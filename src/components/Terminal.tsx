import { featuredProjects } from '../data/projects'
import { profile } from '../data/profile'

type Line = { cmd: string; out: string }

const lines: Line[] = [
  { cmd: 'whoami', out: `${profile.name} — CS student @ ${profile.school}` },
  { cmd: 'cat focus.txt', out: 'networking · systems · backend · embedded' },
  {
    cmd: 'ls ~/projects',
    out: featuredProjects
      .slice(0, 4)
      .map((p) => `${p.slug}/`)
      .join('  '),
  },
  { cmd: 'echo $STATUS', out: profile.availability },
]

function Prompt() {
  return (
    <span className="term__prompt">
      <span className="term__frame">┌─[</span>
      <span className="term__user">madhav</span>
      <span className="term__at">@</span>
      <span className="term__host">parrot</span>
      <span className="term__frame">]─[</span>
      <span className="term__dir">~</span>
      <span className="term__frame">]</span>
    </span>
  )
}

/** A static terminal window styled after the Parrot OS shell prompt. */
export function Terminal() {
  return (
    <figure className="term" aria-label="Terminal introducing Madhav">
      <div className="term__bar">
        <span className="term__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="term__title">madhav@parrot: ~</span>
      </div>
      <div className="term__body">
        {lines.map((l) => (
          <div className="term__block" key={l.cmd}>
            <Prompt />
            <div>
              <span className="term__frame">└──╼ </span>
              <span className="term__dollar">$</span> <span className="term__cmd">{l.cmd}</span>
            </div>
            <div className="term__out">{l.out}</div>
          </div>
        ))}
        <div className="term__block">
          <Prompt />
          <div>
            <span className="term__frame">└──╼ </span>
            <span className="term__dollar">$</span> <span className="term__cursor" aria-hidden="true" />
          </div>
        </div>
      </div>
    </figure>
  )
}
