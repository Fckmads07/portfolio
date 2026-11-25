import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Bar } from './components/Bar'
import { Footer } from './components/Footer'
import { WORKSPACES } from './data/nav'
import { useHotkeys } from './hooks/useHotkeys'
import { useTheme } from './hooks/useTheme'
import Experience from './pages/Experience'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'
import { PixelField } from './pixel/PixelField'

const titles: Record<string, string> = {
  '/': 'Madhav Ramdin · Portfolio',
  '/projects': 'Projects · Madhav Ramdin',
  '/experience': 'Experience · Madhav Ramdin',
}

/** Scroll to the top (or to the #hash target) and update the tab title on navigation. */
function useRouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] ?? 'Not found · Madhav Ramdin'
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}

export default function App() {
  const { theme, setTheme, cycle } = useTheme()
  const navigate = useNavigate()
  useRouteEffects()

  useHotkeys({
    ...Object.fromEntries(WORKSPACES.map((workspace) => [workspace.key, () => navigate(workspace.to)])),
    t: cycle,
  })

  return (
    <div className="shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <PixelField theme={theme} />
      <Bar theme={theme} onSelectTheme={setTheme} />
      <main className="page" id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
