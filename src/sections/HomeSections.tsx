import { Link } from 'react-router'

import { Art } from '../components/Art'
import { Button, LongArrow } from '../components/Button'
import { StoryCard } from '../components/Cards'
import { Container } from '../components/Container'
import { Counter } from '../components/Counter'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { CTA, DESTINATIONS, MANIFESTO, MEMORIES, NUMBERS, STORIES } from '../data'

/** The three most recent stories. */
export function LatestStories() {
  return (
    <section aria-labelledby="latest-title" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading kicker="Fresh from the road" title={<span id="latest-title">The latest stories.</span>} />
          <Button to="/stories" variant="secondary" arrow className="self-start lg:self-end">
            All stories
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STORIES.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** Places the stories come from. */
export function Destinations() {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="scroll-mt-6 border-y-[1.5px] border-ink bg-paper-2 py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Destinations"
          title={<span id="destinations-title">Places worth a long story.</span>}
          body="Four corners of the notebook. Each one has at least one trip we would take again, and one we would plan differently."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.07}>
              <Link
                to={`/stories?region=${d.region}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border-[1.5px] border-ink bg-white transition-[transform,box-shadow] duration-200 hov:-translate-y-1 hov:shadow-ink-lg"
              >
                <Art name={d.image} decorative className="aspect-[4/3] w-full bg-white" imgClassName="transition-transform duration-700 group-hov:scale-105" />
                <div className="flex flex-1 flex-col gap-2 border-t border-line p-6">
                  <span className="text-[13px] font-medium text-teal-ink">{d.region}</span>
                  <h3 className="display text-[30px]">{d.name}</h3>
                  <p className="text-[13px] text-faint">{d.country}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{d.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-medium text-ink">
                    Read the stories <LongArrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** A few honest totals for the vault. */
export function Numbers() {
  return (
    <section aria-label="The vault in numbers" className="py-14 sm:py-18">
      <Container>
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {NUMBERS.map((n) => (
            <div key={n.label} className="border-l-[1.5px] border-ink pl-5">
              <dt className="sr-only">{n.label}</dt>
              <dd className="display text-[52px] text-ink sm:text-[68px]">
                <Counter value={n.value} prefix={n.prefix} suffix={n.suffix} />
              </dd>
              <dd className="mt-2 max-w-[200px] text-[15px] text-muted">{n.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

/** The photograph wall: small, captioned memories. */
export function Memories() {
  return (
    <section id="memories" aria-labelledby="memories-title" className="scroll-mt-6 py-16 sm:py-24">
      <Container>
        <SectionHeading
          kicker="Memories"
          title={<span id="memories-title">What we kept.</span>}
          body="Not the best photographs, the ones that still bring the trip back."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MEMORIES.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <figure className="overflow-hidden rounded-lg border-[1.5px] border-ink bg-white">
                <Art name={m.image} className="aspect-[4/3] w-full bg-white" imgClassName="transition-transform duration-700 hov:scale-[1.03]" />
                <figcaption className="border-t border-line p-5">
                  <p className="display text-[24px] leading-tight">{m.caption}</p>
                  <p className="mt-2 text-[13px] text-faint">
                    {m.place} · {m.year}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** Why the journal exists, set beside the map illustration. */
export function Manifesto() {
  return (
    <section aria-labelledby="manifesto-title" className="border-t border-line bg-paper-2 py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionHeading kicker={MANIFESTO.kicker} title={<span id="manifesto-title">{MANIFESTO.title}</span>} body={MANIFESTO.body} />
          <ul className="mt-8 space-y-3">
            {MANIFESTO.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[16px] text-ink">
                <svg viewBox="0 0 12 12" aria-hidden className="mt-1.5 size-3 shrink-0 text-teal-ink">
                  <path d="M1 6.5 4.4 10 11 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <Button to="/about" variant="secondary" arrow className="mt-8">
            About the vault
          </Button>
        </div>
        <Art name="map" decorative className="aspect-[4/3] w-full" imgClassName="object-contain" />
      </Container>
    </section>
  )
}

/** Closing band. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-t-[1.5px] border-ink bg-peach-soft">
      <Container className="grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div className="relative z-10">
          <h2 id="cta-title" className="display text-[44px] sm:text-[64px]">
            {CTA.title}
          </h2>
          <p className="mt-5 max-w-[480px] text-[17px] leading-relaxed text-body">{CTA.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/stories" arrow size="lg">
              {CTA.primary}
            </Button>
            <Button to="/about" variant="secondary" size="lg">
              {CTA.secondary}
            </Button>
          </div>
        </div>
        <Art name="summit" decorative className="aspect-[3/2] w-full" imgClassName="object-contain" />
      </Container>
    </section>
  )
}
