import { useSyncExternalStore } from 'react'

import { BRAND } from '../data'

/** Where the demo session and the demo account live. */
export const SESSION_KEY = `${BRAND.storagePrefix}session`

export type Session = { name: string; email: string }

let cached: Session | null | undefined
const listeners = new Set<() => void>()

function parse(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const value = JSON.parse(raw) as Partial<Session> | null
    if (!value || typeof value.email !== 'string' || !value.email) return null
    return { name: typeof value.name === 'string' && value.name ? value.name : value.email.split('@')[0], email: value.email }
  } catch {
    return null
  }
}

function emit() {
  for (const listener of listeners) listener()
}

/** The session for code that is not a component. */
export function getSession(): Session | null {
  if (cached === undefined) cached = typeof localStorage === 'undefined' ? null : parse()
  return cached
}

/** Sign in (or out, with null) and tell every subscribed component. */
export function setSession(next: Session | null) {
  cached = next
  try {
    if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next))
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage blocked: the session still lives in memory for this tab */
  }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === SESSION_KEY) {
      cached = parse()
      emit()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/** Reactive session: re-renders on sign in, sign out and other tabs. */
export function useSession(): Session | null {
  return useSyncExternalStore(subscribe, getSession, () => null)
}
