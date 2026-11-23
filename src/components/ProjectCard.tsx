import type { Project } from '../data/projects'
import { Icon } from './Icon'
import './ProjectCard.css'

export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { name, tagline, description, highlights, stack, category, icon, period, status, links } =
    project

  return (
    <article className={`card card--interactive project${compact ? ' project--compact' : ''}`} id={project.slug}>
      <header className="project__head">
        <span className="icon-badge">
          <Icon name={icon} />
        </span>
        <div className="project__meta">
          <span className="project__category">{category}</span>
          <span className="project__period">{period}</span>
        </div>
        {status ? (
          <span className="project__status">
            <span className="status-dot" aria-hidden="true" />
            {status}
          </span>
        ) : null}
      </header>

      <h3 className="project__name">{name}</h3>
      <p className="project__tagline">{tagline}</p>

      {!compact && description ? <p className="project__desc">{description}</p> : null}

      {!compact && highlights.length > 0 ? (
        <ul className="project__highlights">
          {highlights.map((h) => (
            <li key={h}>
              <Icon name="check" />
              {h}
            </li>
          ))}
        </ul>
      ) : null}

      <ul className="chips project__stack" aria-label="Tech stack">
        {stack.map((s) => (
          <li className="chip" key={s}>
            {s}
          </li>
        ))}
      </ul>

      <footer className="project__links">
        {links.length === 0 ? (
          <span className="project__private">
            <Icon name="code" /> Repository coming soon
          </span>
        ) : (
          links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className={`btn btn--sm ${l.kind === 'demo' ? 'btn--primary' : 'btn--ghost'}`}
              aria-label={`${l.label} — ${name}`}
            >
              <Icon name={l.kind === 'repo' ? 'github' : 'external'} />
              {l.label}
            </a>
          ))
        )}
      </footer>
    </article>
  )
}
