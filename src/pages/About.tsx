import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { NewsletterForm } from '../components/NewsletterForm'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { ABOUT_PAGE } from '../data'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function About() {
  useDocumentTitle('About')
  return (
    <>
      <PageHero kicker={ABOUT_PAGE.kicker} title={ABOUT_PAGE.title} lede={ABOUT_PAGE.lede} image="oak" />

      <section id="how" aria-labelledby="how-title" className="scroll-mt-6 border-b border-line py-16 sm:py-24">
        <Container>
          <SectionHeading kicker="How it works" title={<span id="how-title">Three habits, one vault.</span>} />
          <ol className="mt-12 grid gap-10 sm:grid-cols-3">
            {ABOUT_PAGE.how.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 0.08}>
                  <span className="display block text-[60px] text-teal-ink">{s.n}</span>
                  <svg viewBox="0 0 200 8" aria-hidden className="mt-2 h-2 w-full text-ink">
                    <path d="M1 4.5C40 2 90 6 199 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <h3 className="mt-5 text-[19px] font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="py-16 sm:py-24">
        <Container>
          <SectionHeading kicker="What we keep to" title={<span id="values-title">How we treat the stories.</span>} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ABOUT_PAGE.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-lg border-[1.5px] border-ink bg-white p-8 shadow-ink">
                  <h3 className="display text-[32px]">{v.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="write" aria-labelledby="write-title" className="scroll-mt-6 border-t-[1.5px] border-ink bg-teal-soft py-16 sm:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 id="write-title" className="display text-[44px] sm:text-[62px]">
              {ABOUT_PAGE.write.title}
            </h2>
            <p className="mt-5 max-w-[540px] text-[17px] leading-relaxed text-body">{ABOUT_PAGE.write.body}</p>
            <Button to="/write" arrow size="lg" className="mt-8">
              {ABOUT_PAGE.write.cta}
            </Button>
            <p className="mt-4 text-[14px] text-muted">
              Or write to{' '}
              <a href={`mailto:${ABOUT_PAGE.write.email}`} className="text-link">
                {ABOUT_PAGE.write.email}
              </a>
            </p>
          </div>
          <div className="rounded-lg border-[1.5px] border-ink bg-white p-6 sm:p-8">
            <h3 className="display text-[30px]">The Sunday postcard</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">One story a week, from somewhere new. No adverts, ever.</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
