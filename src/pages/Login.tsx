import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { Art } from '../components/Art'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { Container } from '../components/Container'
import { Checkbox, TextField } from '../components/Field'
import { setSession, useSession, type Session } from '../lib/session'
import { useLocalState } from '../lib/store'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { validateSignIn, validateSignUp, type FieldErrors } from '../shared/validation'

type Mode = 'signin' | 'signup'

const SIGN_IN = {
  kicker: 'Returning traveller',
  title: 'Come back to the vault.',
  lede: 'Your stories, drafts and saved places are exactly where you left them.',
}

const SIGN_UP = {
  kicker: 'New traveller',
  title: 'Keep the trips that matter.',
  lede: 'An account keeps your stories in one place, so a trip written down tonight is still there in ten years.',
}

export function Login({ next: destination = '/' }: { next?: string }) {
  useDocumentTitle('Sign in')
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const session = useSession()
  const [account] = useLocalState<Session | null>('account', null)
  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : 'signin')
  const [form, setForm] = useState({ name: '', email: '', password: '', keep: true })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string>()
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const next = new URLSearchParams(params)
    if (mode === 'signup') next.set('mode', 'signup')
    else next.delete('mode')
    setParams(next, { replace: true })
    // Only the tab change should rewrite the URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  const copy = mode === 'signup' ? SIGN_UP : SIGN_IN

  // Only same-site paths may be used as a post-sign-in destination.
  const requested = params.get('next') ?? destination
  const next = requested.startsWith('/') && !requested.startsWith('//') ? requested : '/'

  const set = (key: keyof typeof form, value: string | boolean) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    setErrors({})
    setFormError(undefined)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = mode === 'signup' ? validateSignUp(form) : validateSignIn(form)
    setErrors(found)
    if (Object.keys(found).length) {
      setFormError('Please check the highlighted fields.')
      return
    }
    setBusy(true)
    setFormError(undefined)
    const email = form.email.trim()
    const name = mode === 'signup' ? form.name.trim() : (account?.name ?? email.split('@')[0])
    if (mode === 'signin' && account && account.email.toLowerCase() !== email.toLowerCase()) {
      setBusy(false)
      setErrors({ email: 'No account with that address on this device. Create one instead.' })
      setFormError('That email is not the one this browser signed up with.')
      return
    }
    setSession({ name, email })
    setBusy(false)
    navigate(next, { replace: true })
  }

  if (session) {
    return (
      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-[620px] rounded-lg border-[1.5px] border-ink bg-white p-8 text-center shadow-ink-lg sm:p-12">
          <span className="round display mx-auto flex size-20 items-center justify-center rounded-full border-[1.5px] border-ink bg-teal text-[34px] text-ink">
            {session.name.slice(0, 1).toUpperCase()}
          </span>
          <p className="kicker mt-6 text-[24px]">Signed in</p>
          <h1 className="display mt-2 text-[44px] sm:text-[56px]">Welcome, {session.name}.</h1>
          <p className="mt-4 text-[16px] leading-relaxed text-muted">
            Signed in as <strong className="font-semibold text-ink">{session.email}</strong>. Your vault is open on this device.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to={next} arrow size="lg">
              Enter the vault
            </Button>
            <Button to="/write" variant="secondary" size="lg">
              Write a story
            </Button>
          </div>
          <button
            type="button"
            onClick={() => {
              setSession(null)
              navigate('/login', { replace: true })
            }}
            className="text-link mt-6 text-[14px]"
          >
            Sign out
          </button>
          <p className="mt-6 border-t border-line pt-5 text-[12px] leading-relaxed text-faint">
            Demo accounts are kept in this browser only. Nothing is sent to a server, and no real account is created.
          </p>
        </div>
      </Container>
    )
  }

  return (
    <section aria-labelledby="auth-title" className="border-b border-line">
      <Container className="grid items-start gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_0.95fr]">
        <div className="animate-rise">
          <p className="kicker">{copy.kicker}</p>
          <h1 id="auth-title" className="display mt-4 text-[48px] leading-[0.95] sm:text-[68px]">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-muted">{copy.lede}</p>

          <ul className="mt-8 space-y-3">
            {['Keep every story in one place', 'Draft a trip and finish it later', 'Your name on the stories you send'].map((point) => (
              <li key={point} className="flex items-start gap-3 text-[16px] text-ink">
                <svg viewBox="0 0 12 12" aria-hidden className="mt-1.5 size-3 shrink-0 text-teal-ink">
                  <path d="M1 6.5 4.4 10 11 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>

          <Art name="footbridge" decorative className="mt-10 hidden aspect-[3/2] w-full max-w-[460px] lg:block" imgClassName="object-contain" />
        </div>

        <div className="rounded-lg border-[1.5px] border-ink bg-white p-6 shadow-ink-lg sm:p-8">
          <div className="flex gap-2" role="group" aria-label="Choose sign in or create account">
            <Chip active={mode === 'signin'} onClick={() => switchMode('signin')}>
              Sign in
            </Chip>
            <Chip active={mode === 'signup'} onClick={() => switchMode('signup')}>
              Create account
            </Chip>
          </div>

          <h2 className="display mt-6 text-[34px]">{mode === 'signup' ? 'Create your account' : 'Sign in to your vault'}</h2>

          <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-5">
            {mode === 'signup' && (
              <TextField
                label="Your name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                error={errors.name}
                autoComplete="name"
                placeholder="Elena Marsh"
              />
            )}

            <TextField
              label="Email address"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              error={errors.email}
              autoComplete="email"
              placeholder="you@example.com"
            />

            <TextField
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              error={errors.password}
              hint={mode === 'signup' ? 'At least 8 characters.' : undefined}
              autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'}
            />

            {mode === 'signup' && (
              <Checkbox
                label="Send me the Sunday postcard, one story a week."
                checked={form.keep}
                onChange={(e) => set('keep', e.target.checked)}
              />
            )}

            {formError && (
              <p role="alert" className="rounded-sm border border-danger bg-danger-soft px-4 py-3 text-[14px] text-danger">
                {formError}
              </p>
            )}

            <Button type="submit" size="lg" arrow loading={busy} className="w-full">
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          <p className="mt-5 text-[14px] text-muted">
            {mode === 'signup' ? 'Already have an account? ' : 'New to VibeVault? '}
            <button type="button" onClick={() => switchMode(mode === 'signup' ? 'signin' : 'signup')} className="text-link">
              {mode === 'signup' ? 'Sign in' : 'Create one'}
            </button>
          </p>

          <p className="mt-5 border-t border-line pt-5 text-[12px] leading-relaxed text-faint">
            The journal is private: stories, destinations and memories unlock once you sign in. This is a demonstration, so the account lives in this browser only.
          </p>
        </div>
      </Container>
    </section>
  )
}
