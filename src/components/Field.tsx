import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'

import { cx } from '../lib/cx'

const control =
  'w-full rounded-sm border-[1.5px] bg-white px-4 text-[16px] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-150 hov:border-ink focus:outline-none focus-visible:outline-none focus:border-ink focus:shadow-ink data-[force~=focus]:border-ink data-[force~=focus]:shadow-ink data-[force~=focus]:outline-none disabled:cursor-not-allowed disabled:bg-paper-2 disabled:text-faint'

function Wrap({ id, label, hint, error, optional, children, className }: { id: string; label: string; hint?: ReactNode; error?: string; optional?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-faint">optional</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="text-[13px] font-medium text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

type FieldBase = { label: string; hint?: ReactNode; error?: string; optional?: boolean; wrapClassName?: string }

export function TextField({ label, hint, error, optional, wrapClassName, className, id, ...rest }: FieldBase & ComponentPropsWithoutRef<'input'>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Wrap id={fid} label={label} hint={hint} error={error} optional={optional} className={wrapClassName}>
      <input
        id={fid}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fid}-msg` : undefined}
        className={cx(control, 'h-12', error ? 'border-danger' : 'border-line-strong', className)}
        {...rest}
      />
    </Wrap>
  )
}

export function TextArea({ label, hint, error, optional, wrapClassName, className, id, ...rest }: FieldBase & ComponentPropsWithoutRef<'textarea'>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Wrap id={fid} label={label} hint={hint} error={error} optional={optional} className={wrapClassName}>
      <textarea
        id={fid}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? `${fid}-msg` : undefined}
        className={cx(control, 'min-h-28 py-3 leading-relaxed', error ? 'border-danger' : 'border-line-strong', className)}
        {...rest}
      />
    </Wrap>
  )
}

export function Select({ label, hint, error, optional, wrapClassName, className, id, children, ...rest }: FieldBase & ComponentPropsWithoutRef<'select'>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <Wrap id={fid} label={label} hint={hint} error={error} optional={optional} className={wrapClassName}>
      <div className="relative">
        <select
          id={fid}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? `${fid}-msg` : undefined}
          className={cx(control, 'h-12 appearance-none pr-11', error ? 'border-danger' : 'border-line-strong', className)}
          {...rest}
        >
          {children}
        </select>
        <svg viewBox="0 0 12 8" aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-ink">
          <path d="M1 1.5 6 6l5-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    </Wrap>
  )
}

export function Checkbox({ label, error, className, id, ...rest }: { label: ReactNode; error?: string } & ComponentPropsWithoutRef<'input'>) {
  const auto = useId()
  const fid = id ?? auto
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={fid} className="flex min-h-10 cursor-pointer items-start gap-3 text-[15px] leading-snug text-body">
        <input
          id={fid}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${fid}-msg` : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-xs border-[1.5px] border-ink bg-white bg-center bg-no-repeat checked:bg-teal checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path d=%22M3.5 8.5l3 3 6-7%22 fill=%22none%22 stroke=%22%23141414%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')] disabled:cursor-not-allowed disabled:opacity-50"
          {...rest}
        />
        <span>{label}</span>
      </label>
      {error && (
        <p id={`${fid}-msg`} role="alert" className="pl-8 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
