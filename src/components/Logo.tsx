import { Link } from 'react-router'

import { cx } from '../lib/cx'

/**
 * The VibeVault mark: a bold V monogram inside a compass ring, with a feather
 * for the writing and a pen nib below, drawn in a single ink weight.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={cx('size-11 shrink-0', className)}>
      <circle cx="32" cy="32" r="26.5" stroke="currentColor" strokeWidth="1.4" opacity="0.9" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7">
        <path d="M32 9.4v3.8" />
        <path d="M32 50.8v3.8" />
        <path d="M9.4 32h3.8" />
        <path d="M50.8 32h3.8" />
      </g>
      {/* the feather */}
      <path
        d="M31 45.5C36 39 41.6 29.4 45.4 15.2c1.1 6 .3 14-2.7 20.2-3 6-7.4 9.2-11.7 10.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M32.2 43.4C37 36.2 41.6 26.4 44.8 17" stroke="currentColor" strokeWidth="0.9" />
      <path d="M37.4 34.6l4.2-2.2M39.8 29.2l3.6-2.2M42 23.6l2.6-1.4" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      {/* the V */}
      <path d="M17 15.5h5.6L32 37.4l9.4-21.9H47l-12 27h-6Z" fill="currentColor" />
      <path d="M15 15.5h8.2M40.8 15.5H49" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
      {/* the nib */}
      <path d="M32 41.8 37 48l-5 7.4L27 48Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M32 46.4v6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="32" cy="45.2" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="VibeVault: travels, stories and memories — home"
      className={cx('group inline-flex items-center gap-2.5 text-ink sm:gap-3', className)}
    >
      <LogoMark className="size-10 sm:size-12" />
      <span className="flex flex-col leading-none">
        <span className="display text-[23px] leading-[0.95] sm:text-[27px]">
          <span className="text-ink/60">Vibe</span>
          <span className="text-ink">Vault</span>
        </span>
        <span className="mt-1.5 hidden text-[8px] tracking-[0.3em] text-muted sm:block">TRAVELS, STORIES &amp; MEMORIES</span>
      </span>
    </Link>
  )
}
