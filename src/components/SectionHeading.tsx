import type { ReactNode } from 'react'

import { cx } from '../lib/cx'

export function SectionHeading({
  kicker,
  title,
  body,
  align = 'left',
  as: Tag = 'h2',
  className,
}: {
  kicker?: string
  title: ReactNode
  body?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  className?: string
}) {
  return (
    <div className={cx('max-w-[760px]', align === 'center' && 'mx-auto text-center', className)}>
      {kicker && <p className="kicker mb-4">{kicker}</p>}
      <Tag className={cx('display', Tag === 'h1' ? 'text-[52px] sm:text-[72px] lg:text-[88px]' : 'text-[42px] sm:text-[56px] lg:text-[64px]')}>{title}</Tag>
      {body && <p className={cx('mt-5 max-w-[620px] text-[17px] leading-relaxed text-muted sm:text-[18px]', align === 'center' && 'mx-auto')}>{body}</p>}
    </div>
  )
}
