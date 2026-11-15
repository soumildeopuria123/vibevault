import { Link, useParams } from 'react-router'

import { Art } from '../components/Art'
import { Button } from '../components/Button'
import { StoryCard } from '../components/Cards'
import { Badge } from '../components/Chip'
import { Container } from '../components/Container'
import { STORIES } from '../data'
import { longDate } from '../lib/format'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFound } from './NotFound'

export function Story() {
  const { slug } = useParams()
  const story = STORIES.find((s) => s.slug === slug)
  useDocumentTitle(story?.title ?? 'Story not found')

  if (!story) return <NotFound />

  const more = STORIES.filter((s) => s.slug !== story.slug).slice(0, 3)

  return (
    <>
      <Container className="pt-8 sm:pt-12">
        <Link to="/stories" className="text-link inline-flex min-h-10 items-center text-[14px]">
          ← All stories
        </Link>
        <article className="mt-4">
          <header className="max-w-[860px]">
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted">
              <Badge tone="teal">{story.region}</Badge>
              <span>{story.minutes} min read</span>
            </div>
            <h1 className="display mt-5 text-[46px] leading-[0.96] sm:text-[72px]">{story.title}</h1>
            <p className="mt-5 max-w-[680px] text-[18px] leading-relaxed text-muted">{story.excerpt}</p>
            <p className="mt-6 text-[14px] text-faint">
              {story.author} · {story.place}, {story.country} · {longDate(story.date)}
            </p>
          </header>

          <Art name={story.image} eager className="mt-10 aspect-[16/9] w-full rounded-lg border-[1.5px] border-ink bg-white" />

          <div className="prose-article mx-auto mt-12 max-w-[700px] pb-4">
            {story.body.map((block, i) => (
              <div key={i}>
                {block.h && <h2>{block.h}</h2>}
                <p>{block.p}</p>
              </div>
            ))}
          </div>

          <footer className="mx-auto mt-12 max-w-[700px] border-t-[1.5px] border-ink pt-6">
            <p className="text-[15px] text-muted">
              Written by <strong className="font-semibold text-ink">{story.author}</strong>, from a trip to {story.place} in {story.date.slice(0, 4)}.
            </p>
            <Button to="/stories" variant="secondary" arrow className="mt-6">
              More stories
            </Button>
          </footer>
        </article>
      </Container>

      <section aria-labelledby="more-title" className="mt-16 border-t border-line bg-paper-2 py-16 sm:py-20">
        <Container>
          <h2 id="more-title" className="display text-[40px] sm:text-[52px]">
            Keep reading.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {more.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
