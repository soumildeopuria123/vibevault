import { Link } from 'react-router'

import { BRAND, FOOTER } from '../data'
import { Container } from './Container'
import { Logo } from './Logo'
import { NewsletterForm } from './NewsletterForm'

export function Footer() {
  return (
    <footer className="mt-auto border-t-[1.5px] border-ink bg-paper-2">
      <Container className="grid gap-12 py-14 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[380px] text-[15px] leading-relaxed text-muted">{FOOTER.blurb}</p>
          <div className="mt-6 max-w-[420px]">
            <NewsletterForm compact />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER.columns.map((c) => (
            <div key={c.title}>
              <h2 className="text-[14px] font-semibold text-ink">{c.title}</h2>
              <ul className="mt-3 space-y-1">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="inline-flex min-h-10 items-center text-[15px] text-muted hov:text-ink hov:underline hov:underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-[14px] font-semibold text-ink">Say hello</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {BRAND.place}. Write to us about a trip you cannot stop talking about.
            </p>
            <a href={`mailto:${BRAND.email}`} className="mt-2 inline-flex min-h-10 items-center text-[15px] text-ink hov:underline">
              {BRAND.email}
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-[13px] leading-relaxed text-faint sm:flex-row sm:justify-between">
          <p className="max-w-[820px]">{FOOTER.legal}</p>
          <p className="shrink-0">
            © {new Date().getFullYear()} {BRAND.name}
          </p>
        </Container>
      </div>
    </footer>
  )
}
