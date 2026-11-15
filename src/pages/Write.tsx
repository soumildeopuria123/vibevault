import { useMemo, useState, type FormEvent } from 'react'

import { Badge } from '../components/Chip'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { Checkbox, Select, TextArea, TextField } from '../components/Field'
import { PageHero } from '../components/PageHero'
import { REGIONS, WRITE_PAGE, type Region } from '../data'
import { postJson } from '../lib/api'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { STORY, validateStory, type FieldErrors } from '../shared/validation'

type Draft = {
  name: string
  title: string
  place: string
  country: string
  region: Region
  body: string
  consent: boolean
}

const EMPTY: Draft = { name: '', title: '', place: '', country: '', region: 'Europe', body: '', consent: false }

const paragraphs = (text: string) =>
  text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

/** The story as a reader would see it, used for the live preview and the proof. */
function StoryProof({ draft, className }: { draft: Draft; className?: string }) {
  const blocks = paragraphs(draft.body)
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3 text-[13px] text-muted">
        <Badge tone="teal">{draft.region}</Badge>
        <span>{words(draft.body)} words</span>
      </div>
      <h2 className="display mt-4 text-[34px] leading-[1] sm:text-[44px]">{draft.title || 'Untitled trip'}</h2>
      <p className="mt-3 text-[14px] text-faint">
        {draft.name || 'Your name'} · {draft.place || 'somewhere'}
        {draft.country ? `, ${draft.country}` : ''}
      </p>
      <div className="prose-article mt-6">
        {blocks.length ? (
          blocks.map((block, i) =>
            block.startsWith('## ') ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>,
          )
        ) : (
          <p className="text-muted">{WRITE_PAGE.preview.empty}</p>
        )}
      </div>
    </div>
  )
}

export function Write() {
  useDocumentTitle('Write a story')
  const [draft, setDraft] = useState<Draft>(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string>()
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState<{ reference: string } | null>(null)

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const remaining = useMemo(() => Math.max(0, STORY.bodyMin - draft.body.trim().length), [draft.body])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validateStory(draft)
    setErrors(found)
    if (Object.keys(found).length) {
      setFormError('Please check the highlighted fields.')
      return
    }
    setFormError(undefined)
    setBusy(true)
    const res = await postJson<{ reference: string }>('/api/stories', draft)
    setBusy(false)
    if (!res.ok) {
      setFormError(res.error)
      if (res.fieldErrors) setErrors(res.fieldErrors)
      return
    }
    setSent({ reference: res.data.reference })
  }

  if (sent) {
    return (
      <>
        <PageHero kicker="Sent to the vault" title={WRITE_PAGE.success.title} lede={WRITE_PAGE.success.body} />
        <Container className="py-12 sm:py-16">
          <div className="mx-auto max-w-[760px] rounded-lg border-[1.5px] border-ink bg-white p-6 shadow-ink sm:p-10">
            <p className="text-[13px] text-faint">
              Reference <strong className="font-semibold text-ink">{sent.reference}</strong> · from {draft.name}
            </p>
            <StoryProof draft={draft} className="mt-6" />
            <div className="mt-10 flex flex-wrap gap-4 border-t border-line pt-8">
              <Button
                onClick={() => {
                  setDraft(EMPTY)
                  setSent(null)
                }}
                variant="secondary"
                arrow
              >
                Write another
              </Button>
              <Button to="/stories" variant="ghost">
                Read other stories
              </Button>
            </div>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <PageHero kicker={WRITE_PAGE.kicker} title={WRITE_PAGE.title} lede={WRITE_PAGE.lede} />

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <form onSubmit={submit} noValidate className="flex flex-col gap-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Your name"
                value={draft.name}
                onChange={(e) => set('name', e.target.value)}
                error={errors.name}
                autoComplete="name"
                placeholder="Mira Halvorsen"
              />
              <Select label="Region" value={draft.region} onChange={(e) => set('region', e.target.value as Region)} error={errors.region}>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
            </div>

            <TextField
              label="Story title"
              value={draft.title}
              onChange={(e) => set('title', e.target.value)}
              error={errors.title}
              maxLength={STORY.titleMax}
              placeholder="Three days of fog on the coast"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <TextField label="Place" value={draft.place} onChange={(e) => set('place', e.target.value)} error={errors.place} placeholder="Reine" />
              <TextField
                label="Country"
                value={draft.country}
                onChange={(e) => set('country', e.target.value)}
                error={errors.country}
                optional
                placeholder="Norway"
              />
            </div>

            <TextArea
              label="Your story"
              value={draft.body}
              onChange={(e) => set('body', e.target.value)}
              error={errors.body}
              hint={
                remaining
                  ? `At least ${STORY.bodyMin} characters to send. ${remaining} to go. Start a new paragraph with a blank line, and begin one with “## ” for a heading.`
                  : `Ready to send. ${draft.body.trim().length.toLocaleString('en-US')} of up to ${STORY.bodyMax.toLocaleString('en-US')} characters.`
              }
              className="min-h-[320px]"
              placeholder={'The ferry was cancelled before we reached the dock.\n\n## What the fog hides\n\nLofoten is photographed in a particular way…'}
            />

            <Checkbox
              label="This is my own story, and VibeVault may publish it with my name."
              checked={draft.consent}
              onChange={(e) => set('consent', e.target.checked)}
              error={errors.consent}
            />

            {formError && (
              <p role="alert" className="rounded-sm border border-danger bg-danger-soft px-4 py-3 text-[14px] text-danger">
                {formError}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg" arrow loading={busy}>
                Send the story
              </Button>
              <p className="max-w-[360px] text-[13px] leading-relaxed text-muted">{WRITE_PAGE.note}</p>
            </div>
          </form>

          <aside aria-labelledby="preview-title" className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-lg border-[1.5px] border-ink bg-paper-2 p-6 sm:p-8">
              <p id="preview-title" className="kicker text-[22px]">
                {WRITE_PAGE.preview.title}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{WRITE_PAGE.preview.body}</p>
              <div className="mt-6 rounded-md border border-line bg-white p-5 sm:p-6">
                <StoryProof draft={draft} />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  )
}
