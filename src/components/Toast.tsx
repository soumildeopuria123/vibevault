import { CheckCircle2, CircleAlert } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type Toast = { id: number; tone: 'success' | 'error'; text: string }
const Ctx = createContext<(text: string, tone?: Toast['tone']) => void>(() => {})

export const useToast = () => useContext(Ctx)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([])
  const push = useCallback((text: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random()
    setItems((l) => [...l, { id, tone, text }])
    setTimeout(() => setItems((l) => l.filter((t) => t.id !== id)), 4200)
  }, [])
  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="pointer-events-auto"
            >
              <ToastCard tone={t.tone} text={t.text} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}

export function ToastCard({ tone, text }: { tone: 'success' | 'error'; text: string }) {
  return (
    <div role="status" className="flex max-w-[440px] items-center gap-3 rounded-md border-[1.5px] border-ink bg-white px-4 py-3 text-[15px] text-ink shadow-ink">
      {tone === 'success' ? <CheckCircle2 className="size-5 shrink-0 text-success" strokeWidth={1.75} /> : <CircleAlert className="size-5 shrink-0 text-danger" strokeWidth={1.75} />}
      {text}
    </div>
  )
}
