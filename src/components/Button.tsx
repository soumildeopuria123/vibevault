import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router'

import { cx } from '../lib/cx'
import { Spinner } from './Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-pill font-medium transition-[transform,box-shadow,background-color,color] duration-150 ease-out disabled:cursor-not-allowed aria-disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  // Seafoam pill with an ink outline and a hard ink shadow, as in the hero.
  primary:
    'border-[1.5px] border-ink bg-teal text-ink shadow-ink hov:bg-teal-hover hov:-translate-x-px hov:-translate-y-px hov:shadow-[3px_4px_0_0_var(--color-ink)] pressed:translate-x-[2px] pressed:translate-y-[3px] pressed:shadow-none disabled:border-line-strong disabled:bg-paper-3 disabled:text-faint disabled:shadow-none',
  secondary:
    'border-[1.5px] border-ink bg-white text-ink shadow-ink hov:bg-paper-2 hov:-translate-x-px hov:-translate-y-px hov:shadow-[3px_4px_0_0_var(--color-ink)] pressed:translate-x-[2px] pressed:translate-y-[3px] pressed:shadow-none disabled:border-line-strong disabled:text-faint disabled:shadow-none',
  ghost: 'border-[1.5px] border-transparent text-ink hov:bg-paper-3 pressed:bg-line disabled:text-faint',
  dark: 'border-[1.5px] border-ink bg-ink text-paper hov:bg-body pressed:translate-y-px disabled:opacity-50',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[14px]',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-12 px-6 text-[16px]',
}

/** The long hand-drawn arrow that follows every call to action. */
export function LongArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 12" fill="none" aria-hidden className={cx('h-3 w-7 shrink-0 transition-transform duration-200 group-hov:translate-x-1', className)}>
      <path d="M1 6.4c6-.3 15.5-.5 25-.2M20.5 1.2c1.8 1.8 3.6 3.4 5.7 5-2.2 1.4-4 3-5.6 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Common = {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  arrow?: boolean
  icon?: ReactNode
  className?: string
  children: ReactNode
}

type AsButton = Common & ComponentPropsWithoutRef<'button'> & { to?: undefined; href?: undefined }
type AsLink = Common & { to: string; href?: undefined } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>
type AsAnchor = Common & { href: string; to?: undefined } & ComponentPropsWithoutRef<'a'>

export type ButtonProps = AsButton | AsLink | AsAnchor

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cx('group', base, variants[variant], sizes[size], className)
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', loading, arrow, icon, className, children, ...rest } = props
  const inner = (
    <>
      {loading ? <Spinner className="size-4" /> : icon}
      <span className={cx(loading && 'opacity-80')}>{children}</span>
      {arrow && !loading && <LongArrow />}
    </>
  )
  const cls = buttonClass(variant, size, className)
  if ('to' in rest && rest.to !== undefined) {
    const { to, ...a } = rest as AsLink
    return (
      <Link to={to} className={cls} {...a}>
        {inner}
      </Link>
    )
  }
  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as AsAnchor)}>
        {inner}
      </a>
    )
  }
  const b = rest as ComponentPropsWithoutRef<'button'>
  return (
    <button type={b.type ?? 'button'} className={cls} aria-busy={loading || undefined} {...b} disabled={b.disabled || loading}>
      {inner}
    </button>
  )
}

/** Round ink-outlined icon button (the "?" help button in the nav). */
export function IconButton({ label, className, children, ...rest }: ComponentPropsWithoutRef<'button'> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        'round inline-flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink bg-teal text-ink shadow-ink transition-[transform,box-shadow,background-color] duration-150 hov:bg-teal-hover hov:-translate-x-px hov:-translate-y-px hov:shadow-[3px_4px_0_0_var(--color-ink)] pressed:translate-x-[2px] pressed:translate-y-[3px] pressed:shadow-none disabled:opacity-50',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
