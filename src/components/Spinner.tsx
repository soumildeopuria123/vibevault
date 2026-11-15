import { cx } from '../lib/cx'

export function Spinner({ className }: { className?: string }) {
  return <span aria-hidden className={cx('round inline-block animate-spin rounded-full border-2 border-current border-r-transparent', className)} />
}
