import { CheckCircle2, CircleAlert, Info } from 'lucide-react'
import type { ReactNode } from 'react'

import { cx } from '../lib/cx'

export type AlertTone = 'info' | 'success' | 'error' | 'note'

export function Alert({ tone = 'info', title, children, className }: { tone?: AlertTone; title?: string; children: ReactNode; className?: string }) {
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'error' ? CircleAlert : Info
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      className={cx(
        'flex gap-3 rounded-md border px-4 py-3.5 text-[14px] leading-relaxed',
        tone === 'info' && 'border-teal/60 bg-teal-soft text-body',
        tone === 'note' && 'border-peach bg-peach-soft text-body',
        tone === 'success' && 'border-success/40 bg-success-soft text-body',
        tone === 'error' && 'border-danger/40 bg-danger-soft text-body',
        className,
      )}
    >
      <Icon
        className={cx('mt-0.5 size-[18px] shrink-0', tone === 'success' ? 'text-success' : tone === 'error' ? 'text-danger' : tone === 'note' ? 'text-coral-ink' : 'text-teal-ink')}
        strokeWidth={1.75}
        aria-hidden
      />
      <div>
        {title && <p className="font-semibold text-ink">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  )
}
