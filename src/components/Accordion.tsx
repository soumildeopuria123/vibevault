import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'

import { cx } from '../lib/cx'

export type AccordionItem = { q: string; a: string }

export function Accordion({ items, className, defaultOpen = -1 }: { items: AccordionItem[]; className?: string; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className={cx('divide-y divide-line border-y border-line', className)}>
      {items.map((it, i) => {
        const on = open === i
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={on}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="group flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left text-[17px] font-medium text-ink"
              >
                <span className="group-hov:underline group-hov:underline-offset-4">{it.q}</span>
                <span aria-hidden className={cx('round relative size-8 shrink-0 rounded-full border-[1.5px] border-ink transition-[background-color,transform] duration-300', on ? 'rotate-45 bg-teal' : 'bg-white')}>
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3 -translate-1/2 bg-ink" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-[1.5px] -translate-1/2 bg-ink" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[640px] pb-5 pr-12 text-[16px] leading-relaxed text-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
