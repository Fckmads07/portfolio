import { Link } from 'react-router-dom'
import { Prompt, SectionHead } from '../components/Prompt'
import { jobs } from '../data/experience'
import { profile, socialById } from '../data/profile'
import { Icon } from '../icons/Icon'
import './Experience.css'

const current = jobs.find((job) => job.current)

export default function Experience() {
  const linkedin = socialById('linkedin')
  const gmail = socialById('gmail')

  return (
    <>
      <header className="page-head">
        <Prompt dir="~/experience" command="cat jobs.log" />
        <h1 className="page-head__title cursor">Experience</h1>
        <p className="page-head__lead">
          Where I've worked so far — the jobs that taught me teamwork, responsibility and how to learn fast.
        </p>
      </header>

      <section className="section" aria-labelledby="jobs-title">
        <SectionHead dir="~/experience" command="systemctl status 'job@*'" title="Work experience" id="jobs-title" />

        <div className="xp">
          <ol className="jobs">
            {jobs.map((job) => (
              <li className="job window" id={job.slug} key={job.slug}>
                <div className="window__bar">
                  <span className={`state${job.current ? ' state--on' : ''}`}>
                    <span className="dot" aria-hidden="true" />
                    {job.current ? 'active (running)' : 'inactive (exited)'}
                  </span>
                  <span className="window__meta">
                    {job.start} → {job.end}
                  </span>
                </div>

                <div className="window__body job__body">
                  <Icon name={job.icon} hue={job.current ? 'peach' : 'blue'} size={56} className="job__icon" />
                  <div className="job__main">
                    <h3 className="job__role">{job.role}</h3>
                    <p className="job__company">
                      {job.company} <span aria-hidden="true">·</span> {job.location}{' '}
                      <span aria-hidden="true">·</span> {job.type.toLowerCase()}
                    </p>
                    <p className="job__summary">{job.summary}</p>
                    <ul className="plus-list job__duties">
                      {job.duties.map((duty) => (
                        <li key={duty}>{duty}</li>
                      ))}
                    </ul>
                    <ul className="tags" aria-label="Skills">
                      {job.skills.map((skill) => (
                        <li className="tag" key={skill}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <aside className="xp__aside">
            <div className="window">
              <div className="window__bar">
                <span className="window__title">whoami</span>
              </div>
              <dl className="window__body kv">
                <div>
                  <dt>currently</dt>
                  <dd>{current ? `${current.role}, ${current.company}` : '—'}</dd>
                </div>
                <div>
                  <dt>studying</dt>
                  <dd>
                    {profile.program}, {profile.semester}
                  </dd>
                </div>
                <div>
                  <dt>school</dt>
                  <dd>{profile.school}</dd>
                </div>
                <div>
                  <dt>based in</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>
            </div>

            <div className="next window" aria-labelledby="next-title">
              <div className="window__bar">
                <span className="state state--queued">
                  <span className="dot" aria-hidden="true" />
                  queued
                </span>
                <span className="window__meta">Summer 2027</span>
              </div>
              <div className="window__body">
                <h2 className="next__title" id="next-title">
                  Looking for an intern?
                </h2>
                <p className="next__text">
                  I'm looking for an internship starting <strong>Summer 2027</strong> in networking, IT
                  infrastructure or cybersecurity. The{' '}
                  <Link className="link" to="/projects">
                    projects page
                  </Link>{' '}
                  shows what I can do.
                </p>
                <div className="next__actions">
                  {linkedin && (
                    <a className="btn btn--primary btn--sm" href={linkedin.href} target="_blank" rel="noreferrer">
                      <Icon name="linkedin" size={14} />
                      LinkedIn
                    </a>
                  )}
                  {gmail && (
                    <a className="btn btn--sm" href={gmail.href}>
                      <Icon name="mail" size={14} />
                      Email me
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
