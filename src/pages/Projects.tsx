import { useState } from 'react'
import { Activity } from '../components/Activity'
import { Prompt, SectionHead } from '../components/Prompt'
import { ago, formatShort, isNew, languageHue, repoByName, repos } from '../data/github'
import { socialById } from '../data/profile'
import {
  categories,
  categoryHue,
  coursework,
  featuredProjects,
  netsecLabs,
  otherProjects,
  type Category,
  type Project,
} from '../data/projects'
import { Icon } from '../icons/Icon'
import './Projects.css'

type Filter = 'All' | Category

/** Hand-written names and taglines win over GitHub's repo name and description. */
const written = new Map([...featuredProjects, ...otherProjects].flatMap((p) => (p.repoName ? [[p.repoName, p]] : [])))

function CategoryLabel({ category }: { category: Category }) {
  return (
    <span className="category" style={{ color: `var(--${categoryHue[category]})` }}>
      <span className="dot" aria-hidden="true" />
      {category.toLowerCase()}
    </span>
  )
}

function NetsecLabs() {
  return (
    <section className="section" aria-labelledby="netsec-title">
      <SectionHead dir="~/projects" command="cat labs/netsec/*.md" title="Network & security labs" id="netsec-title">
        The coursework closest to what I want to do. The repositories are private (school work), so here is what is
        inside.
      </SectionHead>

      <ul className="netsec">
        {netsecLabs.map((lab) => (
          <li className="window window--hover" key={lab.code}>
            <div className="window__bar">
              <span className="window__title">{lab.code}</span>
              <span className="window__meta">
                <span className="state">
                  <Icon name="lock" size={12} />
                  private
                </span>
              </span>
            </div>
            <div className="window__body netsec__body">
              <div className="netsec__head">
                <Icon name={lab.icon} hue={lab.hue} size={48} />
                <div>
                  <h3 className="netsec__title">{lab.title}</h3>
                  <p className="netsec__text">{lab.text}</p>
                </div>
              </div>
              {lab.highlights && (
                <ul className="plus-list">
                  {lab.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProjectWindow({ project }: { project: Project }) {
  const hue = categoryHue[project.category]
  const repo = repoByName(project.repoName)

  return (
    <li className="project window window--hover" id={project.slug}>
      <div className="window__bar">
        <span className="window__title">~/projects/{project.slug}</span>
        <span className="window__meta">
          {project.status ? (
            <span className="state state--busy">
              <span className="dot" aria-hidden="true" />
              in progress
            </span>
          ) : (
            project.period
          )}
        </span>
      </div>

      <div className="window__body project__body">
        <div className="project__head">
          <Icon name={project.icon} hue={hue} size={48} />
          <div>
            <h3 className="project__name">{project.name}</h3>
            <p className="project__tagline">{project.tagline}</p>
          </div>
        </div>

        {project.description && <p className="project__desc">{project.description}</p>}

        {project.highlights.length > 0 && (
          <ul className="plus-list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        )}

        <ul className="tags" aria-label="Tech stack">
          {project.stack.map((item) => (
            <li className="tag" key={item}>
              {item}
            </li>
          ))}
        </ul>

        <div className="project__foot">
          <CategoryLabel category={project.category} />
          <span className="project__period">{repo ? `pushed ${ago(repo.pushedAt)}` : project.period}</span>
          <span className="project__links">
            {project.links.length === 0 ? (
              <span className="project__private">repo coming soon</span>
            ) : (
              project.links.map((link) => (
                <a
                  key={link.href}
                  className="project__link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} — ${project.name}`}
                >
                  {link.label.toLowerCase()} <span aria-hidden="true">↗</span>
                </a>
              ))
            )}
          </span>
        </div>
      </div>
    </li>
  )
}

function Featured() {
  const [filter, setFilter] = useState<Filter>('All')
  const shown = filter === 'All' ? featuredProjects : featuredProjects.filter((p) => p.category === filter)
  const command = filter === 'All' ? 'ls featured/' : `ls featured/ --category=${filter.toLowerCase()}`

  return (
    <section className="section" aria-labelledby="featured-title">
      <SectionHead dir="~/projects" command={command} title="Things I've built" id="featured-title">
        Hardware, back ends and web apps — the projects that taught me how the pieces fit together.
      </SectionHead>

      <div className="filters" role="group" aria-label="Filter projects by category">
        {categories.map((category) => {
          const count =
            category === 'All' ? featuredProjects.length : featuredProjects.filter((p) => p.category === category).length
          return (
            <button
              key={category}
              type="button"
              className="filter"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category === 'All' ? 'all' : `--${category.toLowerCase()}`}
              <span className="filter__count">{count}</span>
            </button>
          )
        })}
      </div>

      <ul className="projects">
        {shown.map((project) => (
          <ProjectWindow project={project} key={project.slug} />
        ))}
      </ul>
    </section>
  )
}

function AllRepos() {
  return (
    <section className="section" aria-labelledby="repos-title">
      <SectionHead dir="~/projects" command="ls -lt ~/github" title="Every public repository" id="repos-title">
        This list fills itself from GitHub every two days, newest push first. Anything I push shows up here.
      </SectionHead>

      <ul className="listing window">
        {repos.map((repo) => {
          const own = written.get(repo.name)
          return (
            <li key={repo.name}>
              <a className="listing__row" href={repo.url} target="_blank" rel="noreferrer">
                <span className="listing__date" title={`last push ${formatShort(repo.pushedAt)}`}>
                  {ago(repo.pushedAt)}
                </span>
                <span className="listing__name">
                  {own?.name ?? repo.name}
                  {isNew(repo) && <span className="listing__new">new</span>}
                </span>
                <span className="listing__desc">{own?.tagline || repo.description || 'No description yet.'}</span>
                <span className="listing__lang">
                  {repo.language && (
                    <>
                      <span className="dot" style={{ color: `var(--${languageHue(repo.language)})` }} aria-hidden="true" />
                      {repo.language}
                    </>
                  )}
                </span>
                <span className="listing__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default function Projects() {
  const github = socialById('github')

  return (
    <>
      <header className="page-head">
        <Prompt dir="~/projects" command="ls" />
        <h1 className="page-head__title cursor">Projects</h1>
        <p className="page-head__lead">
          Network and security labs first, then the things I've built, then everything on my GitHub — kept up to date
          automatically.
        </p>
      </header>

      <NetsecLabs />

      <section className="section" id="activity" aria-labelledby="activity-title">
        <SectionHead dir="~/projects" command="iftop -i github0" title="Traffic on my GitHub" id="activity-title">
          My contributions over the last twelve months, and what my public repos are written in. Synced every two days.
        </SectionHead>
        <Activity />
      </section>

      <Featured />
      <AllRepos />

      <section className="section" aria-labelledby="lab-title">
        <SectionHead dir="~/projects" command="cat coursework/*.md" title="Other coursework" id="lab-title">
          Programming foundations from school, in private repositories.
        </SectionHead>

        <ul className="lab">
          {coursework.map((course) => (
            <li className="window" key={course.title}>
              <div className="window__bar">
                <span className="window__title">{course.code}</span>
                <span className="window__meta">private</span>
              </div>
              <div className="window__body lab__body">
                <Icon name={course.icon} hue={course.hue} size={36} />
                <div>
                  <h3 className="lab__title">{course.title}</h3>
                  <p className="lab__text">{course.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {github && (
        <section className="section" aria-labelledby="remote-title">
          <div className="remote window">
            <div className="window__bar">
              <span className="window__title">git remote -v</span>
            </div>
            <div className="window__body remote__body">
              <div>
                <h2 className="remote__title" id="remote-title">
                  Want to see everything?
                </h2>
                <p className="remote__text">Every lab, experiment and work in progress is on my GitHub.</p>
              </div>
              <a className="btn btn--primary" href={github.href} target="_blank" rel="noreferrer">
                <Icon name="github" size={16} />
                github.com/{github.handle.slice(1)}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
