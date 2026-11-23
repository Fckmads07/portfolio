import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../components/Icon'

export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <section className="page-hero container">
      <span className="eyebrow">Error 404</span>
      <h1>
        Command not <span className="accent">found</span>
      </h1>
      <p>
        <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
          bash: cd {pathname}: No such file or directory
        </code>
      </p>
      <div style={{ marginTop: 32 }}>
        <Link to="/" className="btn btn--primary">
          Back home <Icon name="arrowRight" />
        </Link>
      </div>
    </section>
  )
}
