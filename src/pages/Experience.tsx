import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { jobs } from '../data/experience'
import { profile, socials } from '../data/profile'
import './Experience.css'

const current = jobs.find((j) => j.current)

export default function Experience() {
  const contact = socials.filter((s) => s.id === 'linkedin' || s.id === 'gmail')

  return (
    <>
      <section className="page-hero container fade-up">
        <span className="eyebrow">~/experience</span>
        <h1>
          Work <span className="accent">experience</span>
        </h1>
        <p>
          Where I've worked so far — the jobs that taught me teamwork, responsibility and how to
          learn fast.
        </p>
        <ul className="chips">
          {current ? (
            <li className="chip chip--accent">
              Now: {current.role} @ {current.company}
            </li>
          ) : null}
          <li className="chip">{jobs.length} positions</li>
          <li className="chip">{profile.availability}</li>
        </ul>
      </section>

      <section className="section section--tight container">
        <div className="xp-layout">
          <ol className="xp-list">
            {jobs.map((job) => (
              <li key={job.slug}>
                <article className={`card xp${job.current ? ' xp--current' : ''}`} id={job.slug}>
                  <header className="xp__head">
                    <span className="icon-badge">
                      <Icon name={job.icon} />
                    </span>
                    <div className="xp__title">
                      <h2>{job.role}</h2>
                      <p>
                        {job.company} <span aria-hidden="true">·</span> {job.location}
                      </p>
                    </div>
                    {job.current ? (
                      <span className="xp__badge">
                        <span className="status-dot" aria-hidden="true" /> Current
                      </span>
                    ) : null}
                  </header>

                  <dl className="xp__meta">
                    <div>
                      <dt>
                        <Icon name="calendar" /> Period
                      </dt>
                      <dd>
                        {job.start} – {job.end}
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <Icon name="briefcase" /> Type
                      </dt>
                      <dd>{job.type}</dd>
                    </div>
                    <div>
                      <dt>
                        <Icon name="mapPin" /> Location
                      </dt>
                      <dd>{job.location}</dd>
                    </div>
                  </dl>

                  <p className="xp__summary">{job.summary}</p>

                  <h3 className="xp__subhead">What I did</h3>
                  <ul className="xp__duties">
                    {job.duties.map((d) => (
                      <li key={d}>
                        <Icon name="check" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <ul className="chips" aria-label="Skills">
                    {job.skills.map((s) => (
                      <li className="chip chip--accent" key={s}>
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>

          <aside className="xp-aside">
            <div className="card aside-card">
              <h2>At a glance</h2>
              <dl className="kv">
                <div>
                  <dt>Currently</dt>
                  <dd>{current ? `${current.role}, ${current.company}` : '—'}</dd>
                </div>
                <div>
                  <dt>Studying</dt>
                  <dd>
                    {profile.program}, {profile.semester}
                  </dd>
                </div>
                <div>
                  <dt>School</dt>
                  <dd>{profile.school}</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>
            </div>

            <div className="card aside-card aside-card--accent">
              <span className="status-dot" aria-hidden="true" />
              <h2>Looking for an intern?</h2>
              <p>
                I'm looking for an internship starting <strong>Summer 2027</strong> in networking,
                systems or backend development.
              </p>
              <div className="aside-actions">
                {contact.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    className={`btn btn--sm ${s.id === 'linkedin' ? 'btn--primary' : 'btn--ghost'}`}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    <Icon name={s.icon} /> {s.label}
                  </a>
                ))}
              </div>
            </div>

            <Link to="/projects" className="card card--interactive aside-link">
              <span className="icon-badge">
                <Icon name="code" />
              </span>
              <span>
                <strong>See what I build</strong>
                <span>Projects, labs and experiments</span>
              </span>
              <Icon name="arrowRight" className="aside-link__arrow" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
