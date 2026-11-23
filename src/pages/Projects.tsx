import { useState } from 'react'
import { Icon } from '../components/Icon'
import { ProjectCard } from '../components/ProjectCard'
import { categories, coursework, featuredProjects, otherProjects } from '../data/projects'
import type { Category } from '../data/projects'
import './Projects.css'

type Filter = 'All' | Category

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const shown =
    filter === 'All' ? featuredProjects : featuredProjects.filter((p) => p.category === filter)

  return (
    <>
      <section className="page-hero container fade-up">
        <span className="eyebrow">~/projects</span>
        <h1>
          Things I've <span className="accent">built</span>
        </h1>
        <p>
          From microcontrollers to full-stack web apps — the projects I'm proudest of, plus the
          labs and experiments that got me there.
        </p>
        <ul className="chips">
          <li className="chip chip--accent">{featuredProjects.length} featured</li>
          <li className="chip">Embedded · Web · Backend</li>
          <li className="chip">Open source on GitHub</li>
        </ul>
      </section>

      <section className="section section--tight container" aria-labelledby="featured-heading">
        <div className="projects-bar">
          <h2 className="sr-only" id="featured-heading">
            Featured projects
          </h2>
          <div className="tabs" role="group" aria-label="Filter projects by category">
            {categories.map((c) => {
              const count =
                c === 'All'
                  ? featuredProjects.length
                  : featuredProjects.filter((p) => p.category === c).length
              return (
                <button
                  key={c}
                  type="button"
                  className={`tab${filter === c ? ' tab--active' : ''}`}
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {c}
                  <span className="tab__count">{count}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="projects-grid">
          {shown.map((p) => (
            <ProjectCard project={p} key={p.slug} />
          ))}
        </div>
      </section>

      <section className="section section--tight container" aria-labelledby="more-heading">
        <div className="section-head">
          <span className="eyebrow">Also on GitHub</span>
          <h2 className="section-title" id="more-heading">
            Smaller <span className="accent">builds</span>
          </h2>
          <p className="section-lead">Front-end exercises where I practised HTML, CSS and JavaScript.</p>
        </div>
        <div className="projects-grid projects-grid--3">
          {otherProjects.map((p) => (
            <ProjectCard project={p} compact key={p.slug} />
          ))}
        </div>
      </section>

      <section className="section section--tight container" aria-labelledby="lab-heading">
        <div className="section-head">
          <span className="eyebrow">In the lab</span>
          <h2 className="section-title" id="lab-heading">
            Coursework <span className="accent">&amp; practice</span>
          </h2>
          <p className="section-lead">
            School work that lives in private repositories — the foundations behind the projects
            above.
          </p>
        </div>
        <ul className="lab-grid">
          {coursework.map((c) => (
            <li className="card lab" key={c.title}>
              <span className="icon-badge">
                <Icon name={c.icon} />
              </span>
              <div>
                <span className="lab__code">{c.code}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section--tight container">
        <div className="card cta">
          <div>
            <h2>Want to see everything?</h2>
            <p>Every lab, experiment and work in progress is on my GitHub.</p>
          </div>
          <a
            className="btn btn--primary"
            href="https://github.com/Fckmads07"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" /> github.com/Fckmads07
          </a>
        </div>
      </section>
    </>
  )
}
