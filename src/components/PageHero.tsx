import type { ReactNode } from 'react'

import type { ImageKey } from '../lib/images'
import { Art } from './Art'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'

/** The header block of every inner page: kicker, serif title, lede and an ink vignette. */
export function PageHero({ kicker, title, lede, image, children }: { kicker: string; title: string; lede: string; image?: ImageKey; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-12 pt-10 sm:pb-16 sm:pt-14">
      <Container className="grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-rise">
          <SectionHeading as="h1" kicker={kicker} title={title} body={lede} />
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && <Art name={image} eager decorative className="hidden aspect-[3/2] w-full lg:block" imgClassName="object-contain" />}
      </Container>
    </section>
  )
}
