import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cx } from '../lib/cx'

/** Toggle chip for filters. Pressed chips fill with ink. */
export function Chip({ active, className, children, ...rest }: { active?: boolean; children: ReactNode } & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cx(
        'inline-flex h-10 items-center gap-2 rounded-pill border-[1.5px] px-4 text-[14px] font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50',
        active ? 'border-ink bg-ink text-paper' : 'border-line-strong bg-white text-ink hov:border-ink pressed:bg-paper-3',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export type BadgeTone = 'neutral' | 'teal' | 'peach' | 'success' | 'danger'

export function Badge({ tone = 'neutral', className, children }: { tone?: BadgeTone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cx(
        'inline-flex h-7 items-center gap-1.5 rounded-pill px-3 text-[13px] font-medium',
        tone === 'neutral' && 'bg-paper-3 text-body',
        tone === 'teal' && 'bg-teal-soft text-teal-ink',
        tone === 'peach' && 'bg-peach-soft text-coral-ink',
        tone === 'success' && 'bg-success-soft text-success',
        tone === 'danger' && 'bg-danger-soft text-danger',
        className,
      )}
    >
      {children}
    </span>
  )
}
