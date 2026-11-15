import { Link } from 'react-router'

import type { Story } from '../data'
import { cx } from '../lib/cx'
import { longDate } from '../lib/format'
import { Art } from './Art'
import { LongArrow } from './Button'
import { Badge } from './Chip'

/** A story teaser: illustration, place, headline and the opening line. */
export function StoryCard({ story, force }: { story: Story; force?: string }) {
  return (
    <Link
      to={`/stories/${story.slug}`}
      data-force={force}
      className="group flex h-full flex-col overflow-hidden rounded-lg border-[1.5px] border-ink bg-white transition-[transform,box-shadow] duration-200 hov:-translate-y-1 hov:shadow-ink-lg pressed:translate-y-0 pressed:shadow-none"
    >
      <Art
        name={story.image}
        decorative
        className={cx('aspect-[3/2] w-full bg-white')}
        imgClassName="transition-transform duration-500 group-hov:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col gap-3 border-t border-line p-6">
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
          <Badge tone="peach">{story.region}</Badge>
          <span>{story.minutes} min read</span>
        </div>
        <h3 className="display text-[30px]">{story.title}</h3>
        <p className="text-[15px] leading-relaxed text-muted">{story.excerpt}</p>
        <p className="mt-auto pt-3 text-[13px] text-faint">
          {story.author} · {story.place} · {longDate(story.date)}
        </p>
        <span className="inline-flex items-center gap-2 text-[14px] font-medium text-ink">
          Read the story <LongArrow />
        </span>
      </div>
    </Link>
  )
}
