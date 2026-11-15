import type { ReactNode } from 'react'

import { cx } from '../lib/cx'

export function Container({ className, children, wide }: { className?: string; children: ReactNode; wide?: boolean }) {
  return <div className={cx('mx-auto w-full px-5 sm:px-8', wide ? 'max-w-[1480px]' : 'max-w-[1320px]', className)}>{children}</div>
}
