import type { CSSProperties } from 'react'
import { socials } from '../data/profile'
import { Sprite } from '../pixel/Sprite'
import './Socials.css'

/** One tile per social link, each in its own hue. */
export function Socials() {
  return (
    <ul className="socials">
      {socials.map((social) => {
        const external = !social.href.startsWith('mailto:')
        return (
          <li key={social.id}>
            <a
              className="social"
              href={social.href}
              style={{ '--hue': `var(--${social.hue})` } as CSSProperties}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="social__icon">
                <Sprite name={social.sprite} size={36} />
              </span>
              <span className="social__text">
                <span className="social__label">{social.label}</span>
                <span className="social__handle">{social.handle}</span>
                <span className="social__blurb">{social.blurb}</span>
              </span>
              <span className="social__arrow" aria-hidden="true">
                {external ? '↗' : '→'}
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
