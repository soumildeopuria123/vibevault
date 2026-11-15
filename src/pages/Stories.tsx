import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { StoryCard } from '../components/Cards'
import { Chip } from '../components/Chip'
import { Container } from '../components/Container'
import { TextField } from '../components/Field'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { REGIONS, STORIES, STORIES_PAGE, type Region } from '../data'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function Stories() {
  useDocumentTitle('Stories')
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')

  const region = params.get('region') as Region | null
  const active = region && REGIONS.includes(region) ? region : null

  const setRegion = (r: Region | null) => {
    const next = new URLSearchParams(params)
    if (r) next.set('region', r)
    else next.delete('region')
    setParams(next, { replace: true })
  }

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return STORIES.filter((s) => (!active || s.region === active) && (!q || `${s.title} ${s.place} ${s.country} ${s.excerpt}`.toLowerCase().includes(q)))
  }, [active, query])

  return (
    <>
      <PageHero kicker={STORIES_PAGE.kicker} title={STORIES_PAGE.title} lede={STORIES_PAGE.lede} image="canoe" />

      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter stories by region">
            <Chip active={!active} onClick={() => setRegion(null)}>
              All stories
            </Chip>
            {REGIONS.map((r) => (
              <Chip key={r} active={active === r} onClick={() => setRegion(r)}>
                {r}
              </Chip>
            ))}
          </div>
          <TextField
            label="Search stories"
            type="search"
            placeholder="Place, country or a word"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            wrapClassName="w-full lg:max-w-[320px]"
          />
        </div>

        <p className="mt-6 text-[14px] text-muted" role="status">
          {shown.length} {shown.length === 1 ? 'story' : 'stories'}
          {active ? ` from ${active}` : ''}
        </p>

        {shown.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <StoryCard story={s} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-lg border-[1.5px] border-ink bg-paper-2 p-10 text-center">
            <p className="display text-[34px]">Nothing in the vault for that yet.</p>
            <p className="mt-3 text-[15px] text-muted">Try another region, or clear the search.</p>
          </div>
        )}
      </Container>
    </>
  )
}
