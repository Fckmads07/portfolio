import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { ProjectCard } from '../components/ProjectCard'
import { SocialLinks } from '../components/SocialLinks'
import { Terminal } from '../components/Terminal'
import { Typewriter } from '../components/Typewriter'
import { history, profile, socials, stats, techStack, traits } from '../data/profile'
import { featuredProjects } from '../data/projects'
import './Home.css'

function Hero() {
  return (
    <section className="hero container">
      <div className="hero__text fade-up">
        <a
          className="pill"
          href="https://www.linkedin.com/in/madhav-ramdin-241a06377/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="pill__tag">Open</span>
          {profile.availability}
          <Icon name="arrowRight" />
        </a>

        <h1 className="hero__title">
          <span className="hero__name">Hi, I'm {profile.firstName}.</span>
          I build for <Typewriter words={profile.focus} />
        </h1>

        <p className="hero__lead">{profile.intro}</p>

        <ul className="hero__facts">
          <li>
            <Icon name="graduation" /> {profile.program} · {profile.semester}
          </li>
          <li>
            <Icon name="mapPin" /> {profile.school}, {profile.location}
          </li>
        </ul>

        <div className="hero__actions">
          <Link to="/projects" className="btn btn--primary">
            View my projects <Icon name="arrowRight" />
          </Link>
          <Link to="/experience" className="btn btn--ghost">
            <Icon name="briefcase" /> Experience
          </Link>
        </div>

        <SocialLinks className="hero__socials" />
      </div>

      <div className="hero__visual fade-up" style={{ animationDelay: '120ms' }}>
        <Terminal />
      </div>
    </section>
  )
}

function Traits() {
  return (
    <section className="section container" aria-labelledby="why-title">
      <div className="section-head section-head--center">
        <span className="eyebrow">About me</span>
        <h2 className="section-title" id="why-title">
          Why <span className="accent">Madhav</span>?
        </h2>
        <p className="section-lead">
          I like knowing how things actually work — so I take them apart, wire them up and rebuild
          them in code.
        </p>
      </div>
      <ul className="traits">
        {traits.map((t) => (
          <li className="card trait" key={t.title}>
            <span className="icon-badge">
              <Icon name={t.icon} />
            </span>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Stats() {
  return (
    <section className="section section--tight container" aria-labelledby="stats-title">
      <div className="section-head">
        <span className="eyebrow">By the numbers</span>
        <h2 className="section-title" id="stats-title">
          The Madhav <span className="accent">Project</span>
        </h2>
      </div>
      <ul className="stats">
        {stats.map((s) => (
          <li className="card stat" key={s.label}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
            <p>{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

function History() {
  return (
    <section className="section container" id="history" aria-labelledby="history-title">
      <div className="section-head">
        <span className="eyebrow">My history</span>
        <h2 className="section-title" id="history-title">
          How I got <span className="accent">here</span>
        </h2>
        <p className="section-lead">
          From my first lines of code in 2025 to networks and microcontrollers today — one
          semester at a time.
        </p>
      </div>

      <ol className="timeline">
        {history.map((m) => (
          <li
            className={`timeline__item${m.current ? ' timeline__item--current' : ''}`}
            key={m.title}
          >
            <span className="timeline__node" aria-hidden="true" />
            <div className="card timeline__card">
              <div className="timeline__date">
                {m.date}
                {m.current ? <span className="timeline__now">Now</span> : null}
              </div>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
              <ul className="chips">
                {m.tags.map((t) => (
                  <li className="chip" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function FeaturedPreview() {
  return (
    <section className="section section--tight container" aria-labelledby="featured-title">
      <div className="section-row">
        <div className="section-head">
          <span className="eyebrow">Featured work</span>
          <h2 className="section-title" id="featured-title">
            Projects I'm <span className="accent">proud of</span>
          </h2>
        </div>
        <Link to="/projects" className="btn btn--ghost">
          All projects <Icon name="arrowRight" />
        </Link>
      </div>
      <div className="featured-grid">
        {featuredProjects.slice(0, 3).map((p) => (
          <ProjectCard project={p} compact key={p.slug} />
        ))}
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section className="section section--tight container" aria-labelledby="stack-title">
      <div className="section-head">
        <span className="eyebrow">Toolbox</span>
        <h2 className="section-title" id="stack-title">
          Tech <span className="accent">stack</span>
        </h2>
      </div>
      <ul className="stack">
        {techStack.map((g) => (
          <li className="card stack__group" key={g.area}>
            <h3>
              <Icon name={g.icon} /> {g.area}
            </h3>
            <ul className="chips">
              {g.items.map((i) => (
                <li className="chip chip--accent" key={i}>
                  {i}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section className="section container" id="contact" aria-labelledby="contact-title">
      <div className="section-head section-head--center">
        <span className="eyebrow">Get in touch</span>
        <h2 className="section-title" id="contact-title">
          Let's build something
          <br />
          <span className="accent">together</span>
        </h2>
        <p className="section-lead">
          Looking for an intern, a teammate or just want to talk networks? Here is where to find
          me.
        </p>
      </div>
      <ul className="contact">
        {socials.map((s, i) => (
          <li key={s.id} className={i < 2 ? 'contact__item contact__item--lg' : 'contact__item'}>
            <a
              className="card card--interactive contact__card"
              href={s.href}
              {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="icon-badge">
                <Icon name={s.icon} />
              </span>
              <span className="contact__body">
                <span className="contact__label">{s.label}</span>
                {s.handle ? <span className="contact__handle">{s.handle}</span> : null}
                <span className="contact__blurb">{s.blurb}</span>
              </span>
              <Icon name="arrowRight" className="contact__arrow" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Traits />
      <Stats />
      <History />
      <FeaturedPreview />
      <Stack />
      <Contact />
    </>
  )
}
