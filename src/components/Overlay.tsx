import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cx } from '../lib/cx'
import { useFocusTrap } from '../lib/useFocusTrap'

function Panel({ kind, title, onClose, children, wide }: { kind: 'modal' | 'drawer'; title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  useFocusTrap(ref, true, onClose)
  const drawer = kind === 'drawer'
  return (
    <div className={cx('fixed inset-0 z-50 flex', drawer ? 'justify-end' : 'items-end justify-center sm:items-center sm:p-6')}>
      <motion.div className="absolute inset-0 bg-scrim/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-t`}
        tabIndex={-1}
        initial={drawer ? { x: '100%' } : { opacity: 0, y: 24 }}
        animate={drawer ? { x: 0 } : { opacity: 1, y: 0 }}
        exit={drawer ? { x: '100%' } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cx(
          'relative flex max-h-full flex-col overflow-y-auto bg-paper focus:outline-none',
          drawer ? 'h-full w-full max-w-[460px] border-l-[1.5px] border-ink' : cx('max-h-[92dvh] w-full rounded-t-lg border-[1.5px] border-ink shadow-ink-lg sm:rounded-lg', wide ? 'sm:max-w-[860px]' : 'sm:max-w-[560px]'),
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/95 px-6 py-4 backdrop-blur">
          <h2 id={`${id}-t`} className="display text-[30px]">
            {title}
          </h2>
          <button type="button" onClick={onClose} aria-label="Close" className="round inline-flex size-11 items-center justify-center rounded-full border-[1.5px] border-ink bg-white hov:bg-paper-3">
            <X className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        <div className="flex-1 px-6 py-6">{children}</div>
      </motion.div>
    </div>
  )
}

/** Centred dialog (bottom sheet on phones). Esc and the scrim close it; focus is trapped and restored. */
export function Modal({ open, ...rest }: { open: boolean; title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  return createPortal(<AnimatePresence>{open && <Panel kind="modal" {...rest} />}</AnimatePresence>, document.body)
}

/** Right-hand drawer. Same keyboard contract as Modal. */
export function Drawer({ open, ...rest }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) {
  return createPortal(<AnimatePresence>{open && <Panel kind="drawer" {...rest} />}</AnimatePresence>, document.body)
}
