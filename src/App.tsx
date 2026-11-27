import { useCallback, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Bar } from './components/Bar'
import { BootScreen } from './components/BootScreen'
import { Footer } from './components/Footer'
import { WORKSPACES } from './data/nav'
import type { ThemeId } from './data/themes'
import { useBoot } from './hooks/useBoot'
import { useHotkeys } from './hooks/useHotkeys'
import { useTheme } from './hooks/useTheme'
import Experience from './pages/Experience'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Projects from './pages/Projects'

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
  const { showBoot, motionOff, finishBoot, reboot } = useBoot()
  const navigate = useNavigate()
  useRouteEffects()

  // Shortcuts are off while the boot menu is open, so its arrow keys and Enter work alone.
  useHotkeys(
    showBoot
      ? {}
      : {
          ...Object.fromEntries(WORKSPACES.map((workspace) => [workspace.key, () => navigate(workspace.to)])),
          t: cycle,
        },
  )

  const onBoot = useCallback(
    (entry: { theme: ThemeId; motionOff: boolean }) => {
      setTheme(entry.theme)
      finishBoot(entry.motionOff)
    },
    [setTheme, finishBoot],
  )

  return (
    <>
      {showBoot && <BootScreen theme={theme} motionOff={motionOff} onBoot={onBoot} />}
      <div className="shell" inert={showBoot}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Bar theme={theme} onSelectTheme={setTheme} onReboot={reboot} />
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
    </>
  )
}
