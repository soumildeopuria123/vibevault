import { useCallback, useEffect, useState } from 'react'

import { BRAND } from '../data'

const PREFIX = BRAND.storagePrefix

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

/** useState that persists to localStorage under the brand prefix and syncs across tabs. */
export function useLocalState<T>(key: string, initial: T | (() => T)) {
  const [value, setValue] = useState<T>(() => read(key, typeof initial === 'function' ? (initial as () => T)() : initial))
  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
      /* storage full or blocked: keep working in memory */
    }
  }, [key, value])
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === PREFIX + key && e.newValue) setValue(JSON.parse(e.newValue) as T)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [key])
  const reset = useCallback(() => setValue(typeof initial === 'function' ? (initial as () => T)() : initial), []) // eslint-disable-line react-hooks/exhaustive-deps
  return [value, setValue, reset] as const
}

export const uid = () => Math.random().toString(36).slice(2, 10)
