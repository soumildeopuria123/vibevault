import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'

import { NAV } from '../data'
import { cx } from '../lib/cx'
import { setSession } from '../lib/session'
import { Button, IconButton } from './Button'
import { HelpDrawer } from './HelpDrawer'
import { Logo } from './Logo'
import { Drawer } from './Overlay'

function QuestionMark() {
  return (
    <svg viewBox="0 0 20 24" aria-hidden className="h-5 w-4">
      <path d="M5 7.5C5 4.6 7.2 3 10 3s5 1.7 5 4.3c0 2.3-1.6 3.3-3.1 4.2-1.3.8-1.9 1.6-1.9 3v1.2" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="10" cy="20" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function Nav() {
  const [help, setHelp] = useState(false)
  const [menu, setMenu] = useState(false)
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const signOut = () => {
    setSession(null)
    navigate('/login', { replace: true })
  }
  const isActive = (to: string) => (to.includes('#') ? pathname === '/' && hash === to.slice(1) : pathname.startsWith(to))
  return (
    <header className="relative z-30">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <div className="mx-auto flex h-[92px] max-w-[1480px] items-center justify-between gap-6 px-5 sm:h-[112px] sm:px-8 xl:px-[72px]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={() =>
                cx(
                  'rounded-pill px-4 py-2.5 text-[15px] text-ink transition-colors hov:bg-paper-3',
                  isActive(n.to) && 'underline decoration-[1.5px] underline-offset-[6px]',
                )
              }
              aria-current={isActive(n.to) ? 'page' : undefined}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden sm:block lg:hidden xl:block">
            <Button to="/stories" arrow>
              Read the stories
            </Button>
          </span>
          <IconButton label="Questions about the vault" onClick={() => setHelp(true)}>
            <QuestionMark />
          </IconButton>
          <button
            type="button"
            onClick={signOut}
            className="hidden min-h-10 items-center px-2 text-[14px] text-muted underline-offset-4 hov:text-ink hov:underline sm:inline-flex"
          >
            Sign out
          </button>
          <button
            type="button"
            className="round inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-ink bg-white lg:hidden"
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Menu className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <HelpDrawer open={help} onClose={() => setHelp(false)} />
      <Drawer open={menu} onClose={() => setMenu(false)} title="Menu">
        <nav aria-label="Mobile" className="flex flex-col">
          {[{ label: 'Home', to: '/' }, ...NAV].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="display flex min-h-14 items-center border-b border-line text-[34px] text-ink hov:text-teal-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <Button to="/stories" arrow size="lg" className="mt-8 w-full" onClick={() => setMenu(false)}>
          Read the stories
        </Button>
        <Button variant="ghost" size="lg" className="mt-2 w-full" onClick={signOut}>
          Sign out
        </Button>
      </Drawer>
    </header>
  )
}
