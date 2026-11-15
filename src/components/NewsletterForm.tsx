import { useState, type FormEvent } from 'react'

import { postJson } from '../lib/api'
import { useLocalState } from '../lib/store'
import { validateSubscribe } from '../shared/validation'
import { Button } from './Button'
import { TextField } from './Field'

export function NewsletterForm({ compact }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string>()
  const [busy, setBusy] = useState(false)
  const [subscribed, setSubscribed] = useLocalState<string | null>('newsletter', null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validateSubscribe({ email })
    if (errs.email) return setError(errs.email)
    setBusy(true)
    setError(undefined)
    const res = await postJson('/api/subscribe', { email })
    setBusy(false)
    if (!res.ok) return setError(res.fieldErrors?.email ?? res.error)
    setSubscribed(email.trim())
    setEmail('')
  }

  if (subscribed)
    return (
      <p role="status" className="rounded-md border border-teal/60 bg-teal-soft px-4 py-3 text-[14px] text-body">
        Thanks. The monthly letter will reach <strong className="font-semibold text-ink">{subscribed}</strong>.{' '}
        <button type="button" className="text-link min-h-10" onClick={() => setSubscribed(null)}>
          Use another address
        </button>
      </p>
    )

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <TextField
        label={compact ? 'Monthly letter' : 'Email address'}
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
        wrapClassName="flex-1"
      />
      <Button type="submit" variant="secondary" size="lg" loading={busy} className="sm:mt-[30px]">
        Subscribe
      </Button>
    </form>
  )
}
