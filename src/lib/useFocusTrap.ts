import { useEffect, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/** Keeps Tab inside `ref` while `active`, closes on Escape and restores focus to the opener. */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return
    const opener = document.activeElement as HTMLElement | null
    const node = ref.current
    const items = () => Array.from(node?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => el.offsetParent !== null || el === document.activeElement)
    const first = node?.querySelector<HTMLElement>('[data-autofocus]') ?? items()[0]
    requestAnimationFrame(() => (first ?? node)?.focus())
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const i = list.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && (i <= 0)) {
        e.preventDefault()
        list[list.length - 1].focus()
      } else if (!e.shiftKey && i === list.length - 1) {
        e.preventDefault()
        list[0].focus()
      }
    }
    document.addEventListener('keydown', onKey, true)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey, true)
      document.body.style.overflow = prevOverflow
      if (opener && document.contains(opener)) opener.focus()
    }
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps
}
