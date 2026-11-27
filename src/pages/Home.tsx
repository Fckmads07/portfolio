import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Prompt, SectionHead } from '../components/Prompt'
import { Socials } from '../components/Socials'
import { Typewriter } from '../components/Typewriter'
import { ago, formatDate, github, languageShare, repoByName, repos } from '../data/github'
import { fetchGroups, fetchLogo, history, hobbies, profile, socialById, techStack, traits } from '../data/profile'
import { categoryHue, featuredProjects } from '../data/projects'
import { Icon } from '../icons/Icon'
import './Home.css'

function Hero() {
  const linkedin = socialById('linkedin')
  const github = socialById('github')

  return (
    <section className="hero" aria-labelledby="hero-title">
      {linkedin && (
        <a className="hero__pill" href={linkedin.href} target="_blank" rel="noreferrer">
          <span className="dot hero__pill-dot" aria-hidden="true" />
          {profile.availability}
          <span aria-hidden="true">→</span>
        </a>
      )}

      <Prompt command="whoami" />
      <h1 className="hero__title cursor" id="hero-title">
        {profile.firstName} <span className="hero__title-last">{profile.name.replace(`${profile.firstName} `, '')}</span>
      </h1>

      <p className="hero__tagline">
        Focused on <Typewriter words={profile.focus} />
      </p>
      <p className="hero__lead">{profile.intro}</p>

      <div className="hero__actions">
        <Link className="btn btn--primary" to="/projects">
          See my work
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <Link className="btn" to="/experience">
          <Icon name="briefcase" size={16} />
          Experience
        </Link>
        {github && (
          <a className="btn" href={github.href} target="_blank" rel="noreferrer">
            <Icon name="github" size={16} />
            GitHub
          </a>
        )}
      </div>
    </section>
  )
}

function Whois() {
  return (
    <section className="fetch window" aria-label="Profile summary, styled like whois output">
      <div className="window__bar">
        <span className="window__title">madhav@montreal: ~</span>
        <span className="window__meta">bash</span>
      </div>
      <div className="window__body fetch__body">
        <Prompt command="whois madhav-ramdin" />
        <div className="fetch__grid">
          <pre className="fetch__logo" aria-hidden="true">
            {fetchLogo.join('\n')}
          </pre>
          <div className="fetch__info">
            {fetchGroups.map((group) => (
              <dl className="fetch__group" key={group[0].key}>
                {group.map((row) => {
                  const [head, tail] = row.key.split('.')
                  return (
                    <div className="fetch__row" key={row.key}>
                      <dt>
                        {head}
                        {tail && (
                          <>
                            <span className="fetch__key-dot">.</span>
                            <span className="fetch__key-tail">{tail}</span>
                          </>
                        )}
                      </dt>
                      <dd>{row.value}</dd>
                    </div>
                  )
                })}
              </dl>
            ))}
            <p className="fetch__hobbies" aria-hidden="true">
              {hobbies.map((hobby) => (
                <Icon key={hobby.process} name={hobby.icon} hue={hobby.hue} size={24} />
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section" aria-labelledby="about-title">
      <SectionHead command="cat /etc/motd" title={`Why ${profile.firstName}?`} id="about-title">
        Less about writing code for its own sake, more about how networks and systems hold together — and how to keep
        them secure.
      </SectionHead>

      <ul className="traits">
        {traits.map((trait) => (
          <li className="trait" key={trait.title}>
            <Icon name={trait.icon} hue={trait.hue} size={40} />
            <div>
              <h3 className="trait__title">{trait.title}</h3>
              <p className="trait__text">{trait.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Scan() {
  return (
    <section className="section" aria-labelledby="scan-title">
      <SectionHead command="nmap -sV madhav.local" title="Open ports (what I work with)" id="scan-title">
        Every skill area as a service on an open port. Networking and security come first.
      </SectionHead>

      <div className="scan window">
        <div className="window__bar">
          <span className="window__title">Nmap scan report for madhav.local</span>
          <span className="window__meta">host is up</span>
        </div>
        <table className="scan__table">
          <thead>
            <tr>
              <th scope="col">port</th>
              <th scope="col">state</th>
              <th scope="col">service</th>
              <th scope="col">version</th>
            </tr>
          </thead>
          <tbody>
            {techStack.map((row) => (
              <tr key={row.port}>
                <td className="scan__port">{row.port}</td>
                <td className="scan__state">open</td>
                <th scope="row" className="scan__service" style={{ color: `var(--${row.hue})` }}>
                  {row.service}
                </th>
                <td>
                  <ul className="tags">
                    {row.items.map((item) => (
                      <li className="tag" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="scan__done">
          Nmap done: 1 IP address (1 host up) scanned · {techStack.length} open ports
        </p>
      </div>
    </section>
  )
}

function Live() {
  const last = repos[0]
  const tiles = [
    { value: String(github.user.publicRepos), label: 'Public repos', text: `on github.com/${github.user.login}` },
    {
      value: String(github.contributions.total),
      label: 'Contributions',
      text: 'commits, pull requests and issues in the last 12 months',
    },
    {
      value: String(github.languages.length),
      label: 'Languages',
      text: languageShare
        .slice(0, 3)
        .map((l) => l.name)
        .join(', '),
    },
  ]

  return (
    <section className="section" aria-labelledby="live-title">
      <SectionHead
        command="netstat -s --github"
        title="Live from GitHub"
        id="live-title"
        aside={
          <Link className="btn" to="/projects#activity">
            Full activity
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      >
        Pulled from my GitHub automatically every two days. Last sync: {formatDate(github.syncedAt)}.
      </SectionHead>

      <ul className="stats">
        {tiles.map((tile) => (
          <li className="stat window" key={tile.label}>
            <div className="window__bar">
              <span className="window__title">~/{tile.label.toLowerCase().replace(' ', '-')}</span>
              <span className="window__meta state state--on">
                <span className="dot" aria-hidden="true" />
                live
              </span>
            </div>
            <div className="window__body">
              <p className="stat__value">{tile.value}</p>
              <p className="stat__label">{tile.label}</p>
              <p className="stat__text">{tile.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {last && (
        <p className="live__last">
          <span className="prompt__char" aria-hidden="true" /> last push: <a className="link" href={last.url} target="_blank" rel="noreferrer">{last.name}</a>,{' '}
          {ago(last.pushedAt)}
        </p>
      )}
    </section>
  )
}

function Featured() {
  return (
    <section className="section" aria-labelledby="featured-title">
      <SectionHead
        command="ls ~/projects | head -3"
        title="Things I've built"
        id="featured-title"
        aside={
          <Link className="btn" to="/projects">
            All projects
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        }
      />
      <ul className="featured">
        {featuredProjects.slice(0, 3).map((project) => {
          const repo = repoByName(project.repoName)
          return (
            <li key={project.slug}>
              <Link className="feature window window--hover" to={`/projects#${project.slug}`}>
                <div className="window__bar">
                  <span className="window__title">~/projects/{project.slug}</span>
                  <span className="window__meta">{repo ? `pushed ${ago(repo.pushedAt)}` : project.period}</span>
                </div>
                <div className="window__body feature__body">
                  <Icon name={project.icon} hue={categoryHue[project.category]} size={40} />
                  <h3 className="feature__name">{project.name}</h3>
                  <p className="feature__tagline">{project.tagline}</p>
                  <ul className="tags">
                    {project.stack.map((item) => (
                      <li className="tag" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Traceroute() {
  const headIndex = history.findIndex((entry) => entry.current)

  return (
    <section className="section" id="history" aria-labelledby="history-title">
      <SectionHead command="traceroute internship-2027" title="How I got here" id="history-title">
        Every hop from my first lines of code in 2025 to today. The last one hasn't answered yet.
      </SectionHead>

      <ol className="route">
        {history.map((entry, index) => {
          const here = index === headIndex
          const pending = headIndex !== -1 && index > headIndex
          return (
            <li className={`route__hop${here ? ' is-here' : ''}${pending ? ' is-pending' : ''}`} key={entry.title}>
              <span className="route__num" aria-hidden="true">
                {String(index + 1).padStart(2, ' ')}
              </span>
              <div className="route__body">
                <p className="route__meta">
                  <span className="route__host">{entry.date}</span>
                  {here && <span className="route__flag">← you are here</span>}
                  {pending && <span className="route__timeout">* * * (pending)</span>}
                </p>
                <h3 className="route__title">{entry.title}</h3>
                <p className="route__text">{entry.text}</p>
                <ul className="tags route__tags">
                  {entry.tags.map((tag) => (
                    <li className="tag" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function OffTheClock() {
  return (
    <section className="section" aria-labelledby="hobbies-title">
      <SectionHead command="ps aux | grep -v work" title="Off the clock" id="hobbies-title">
        What keeps running when the laptop is closed.
      </SectionHead>

      <ul className="hobbies">
        {hobbies.map((hobby, index) => (
          <li className="hobby window window--hover" key={hobby.process} style={{ '--hue': `var(--${hobby.hue})` } as CSSProperties}>
            <div className="window__bar">
              <span className="window__title">
                PID {1337 + index * 42} · {hobby.process}
              </span>
              <span className="window__meta state state--on">
                <span className="dot" aria-hidden="true" />
                running
              </span>
            </div>
            <div className="hobby__art" aria-hidden="true">
              <Icon name={hobby.icon} hue={hobby.hue} size={96} className={`hobby__icon hobby__icon--${hobby.process}`} />
            </div>
            <div className="window__body hobby__body">
              <h3 className="hobby__title">{hobby.title}</h3>
              <p className="hobby__text">{hobby.text}</p>
              <ul className="tags">
                {hobby.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <SectionHead command="ping madhav" title="Get in touch" id="contact-title">
        Looking for an intern, a teammate or just want to talk networks and security? Here is where to find me.
      </SectionHead>
      <Socials />
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Whois />
      <About />
      <Scan />
      <Live />
      <Featured />
      <Traceroute />
      <OffTheClock />
      <Contact />
    </>
  )
}
