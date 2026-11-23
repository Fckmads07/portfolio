import { socials } from '../data/profile'
import { Icon } from './Icon'

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`socials ${className}`.trim()}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            className="social-btn"
            href={s.href}
            aria-label={s.label}
            title={s.label}
            {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <Icon name={s.icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}
