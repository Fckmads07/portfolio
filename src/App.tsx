import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
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
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function App() {
  useRouteEffects()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
