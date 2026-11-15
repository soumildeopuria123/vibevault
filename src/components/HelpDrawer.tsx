import { Mail } from 'lucide-react'

import { ABOUT_PAGE, BRAND, HELP } from '../data'
import { Accordion } from './Accordion'
import { Button } from './Button'
import { Drawer } from './Overlay'

export function HelpDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title={HELP.title}>
      <p className="text-[15px] leading-relaxed text-muted">{HELP.body}</p>
      <Accordion items={HELP.faqs} className="mt-6" defaultOpen={0} />
      <ul className="mt-8 space-y-3 text-[15px] text-body">
        <li className="flex items-center gap-3">
          <Mail className="size-[18px] text-teal-ink" strokeWidth={1.75} aria-hidden />
          <a className="text-link" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
        </li>
        <li className="flex items-center gap-3">
          <Mail className="size-[18px] text-teal-ink" strokeWidth={1.75} aria-hidden />
          <a className="text-link" href={`mailto:${ABOUT_PAGE.write.email}`}>
            {ABOUT_PAGE.write.email}
          </a>
        </li>
      </ul>
      <Button to="/stories" arrow className="mt-8 w-full" onClick={onClose}>
        Read the stories
      </Button>
    </Drawer>
  )
}
