import { Link, useLocation } from 'react-router-dom'
import { Prompt } from '../components/Prompt'
import { PixelText } from '../pixel/PixelText'

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <header className="page-head">
      <Prompt command={`cd ${pathname}`} />
      <h1 className="page-head__title">
        <span className="sr-only">Page not found</span>
        <PixelText text="404" shadow tracking={2} animate />
      </h1>
      <p className="page-head__lead">
        <code style={{ color: 'var(--red)' }}>bash: cd: {pathname}: No such file or directory</code>
      </p>
      <div style={{ marginTop: 32 }}>
        <Link to="/" className="btn btn--primary">
          cd ~
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </header>
  )
}
