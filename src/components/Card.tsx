import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cx } from '../lib/cx'

export type CardTone = 'white' | 'paper' | 'ink'

/** A white sheet with a hairline border. `inked` adds the hard pen shadow. */
export function Card({
  tone = 'white',
  inked,
  className,
  children,
  ...rest
}: { tone?: CardTone; inked?: boolean; className?: string; children: ReactNode } & ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cx(
        'rounded-lg border',
        tone === 'white' && 'border-line bg-white',
        tone === 'paper' && 'border-line bg-paper-2',
        tone === 'ink' && 'on-dark border-ink bg-ink text-paper',
        inked && 'border-[1.5px] border-ink shadow-ink-lg',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
