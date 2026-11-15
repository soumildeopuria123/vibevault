import { cx } from '../lib/cx'

const CLOUDS = {
  1: {
    vb: '0 0 220 120',
    body: 'M14 104c-12 0-14-17 1-19-4-17 17-27 31-16 2-25 34-35 50-16 8-30 58-32 66 2 17-9 38 4 32 23 16 2 18 26 1 26Z',
    tail: 'M150 110h66M4 110h22',
  },
  2: {
    vb: '0 0 200 80',
    body: 'M18 64c-14 0-14-15 0-16 0-13 17-19 27-10 6-17 32-21 42-6 9-12 32-8 34 8 14-4 26 6 22 17 12 0 16 7 6 7Z',
    tail: 'M146 70h50M30 70h30',
  },
  3: {
    vb: '0 0 220 90',
    body: 'M30 74c-14 0-15-14-2-16-2-14 15-21 25-12 5-18 30-22 40-8 10-12 34-10 38 7 10-8 28-3 28 11 16-2 26 10 16 18Z',
    tail: 'M4 80h40M150 80h66',
  },
} as const

/** A hand-drawn outline cloud, white-filled so it can float over the illustration. */
export function Cloud({ className, variant = 1 }: { className?: string; variant?: 1 | 2 | 3 }) {
  const c = CLOUDS[variant]
  return (
    <svg viewBox={c.vb} aria-hidden className={cx('overflow-visible', className)} fill="none">
      <path d={c.body} fill="var(--color-white)" stroke="var(--color-ink)" strokeWidth="1.2" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path d={c.tail} stroke="var(--color-ink)" strokeWidth="1.1" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
