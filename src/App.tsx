import { AnimatePresence, motion } from 'motion/react'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { Footer } from './components/Footer'
import { Logo } from './components/Logo'
import { Nav } from './components/Nav'
import { ToastProvider } from './components/Toast'
import { BRAND } from './data'
import { useSession } from './lib/session'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { Stories } from './pages/Stories'
import { Story } from './pages/Story'
import { Write } from './pages/Write'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 320)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])
  return null
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main"
        tabIndex={-1}
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 focus:outline-none"
      >
        <Routes location={location}>
          <Route index element={<Home />} />
          <Route path="stories" element={<Stories />} />
          <Route path="stories/:slug" element={<Story />} />
          <Route path="about" element={<About />} />
          <Route path="write" element={<Write />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

/** The only thing a signed-out visitor sees: the mark, the auth screen, a line of legal. */
function BareHeader() {
  return (
    <header className="mx-auto flex h-[92px] w-full max-w-[1480px] items-center px-5 sm:h-[112px] sm:px-8 xl:px-[72px]">
      <span className="pointer-events-none">
        <Logo />
      </span>
    </header>
  )
}

function BareFooter() {
  return (
    <footer className="border-t border-line">
      <p className="mx-auto max-w-[1480px] px-5 py-6 text-[13px] text-faint sm:px-8 xl:px-[72px]">
        {BRAND.name} · {BRAND.tagline} · © {new Date().getFullYear()}
      </p>
    </footer>
  )
}

function Shell() {
  const session = useSession()
  const location = useLocation()

  if (!session) {
    // A deep link is remembered, so signing in returns you to the page you asked for.
    const here = `${location.pathname}${location.search}`
    const destination = here.startsWith('/login') ? '/' : here
    return (
      <div className="flex min-h-dvh flex-col">
        <BareHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          <Login next={destination} />
        </main>
        <BareFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Nav />
      <Pages />
      <Footer />
    </div>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ScrollManager />
        <Shell />
      </ToastProvider>
    </BrowserRouter>
  )
}
