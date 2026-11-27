import { formatDate, github } from '../data/github'
import { profile, socials } from '../data/profile'
import { Icon } from '../icons/Icon'
import './Footer.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__road" aria-hidden="true">
        <Icon name="car" hue="red" size={36} className="footer__car" />
      </div>
      <div className="footer__inner">
        <p className="footer__keys">
          <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> switch page
          <span className="footer__sep" aria-hidden="true">
            ·
          </span>
          <kbd>t</kbd> next skin
        </p>

        <ul className="footer__links">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                className="footer__link"
                href={social.href}
                {...(social.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
              >
                {social.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>

        <p className="footer__note">
          GitHub data synced {formatDate(github.syncedAt)}, automatically every two days.
        </p>
        <p className="footer__note">
          © {YEAR} {profile.name}. Built with React, TypeScript and Vite. Look inspired by{' '}
          <a className="footer__link" href="https://germanviter.github.io/" target="_blank" rel="noreferrer">
            German Viter's site
          </a>{' '}
          and{' '}
          <a className="footer__link" href="https://omarchy.org" target="_blank" rel="noreferrer">
            Omarchy
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
