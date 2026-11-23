import { Link } from 'react-router-dom'
import { profile, socials } from '../data/profile'
import { featuredProjects } from '../data/projects'
import { Icon } from './Icon'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="brand">
              <span className="brand__mark">
                <Icon name="terminal" />
              </span>
              <span>{profile.name}</span>
            </Link>
            <p>
              {profile.title} at {profile.school}. {profile.tagline}
            </p>
            <Link to="/projects" className="btn btn--primary btn--sm">
              See my projects <Icon name="arrowRight" />
            </Link>
          </div>

          <div className="footer__col">
            <h3>Pages</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/experience">Experience</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>Projects</h3>
            <ul>
              {featuredProjects.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects#${p.slug}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Contact</h3>
            <ul>
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {profile.name} · Built with React, TypeScript & Vite ·
            Design inspired by Parrot OS
          </span>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
