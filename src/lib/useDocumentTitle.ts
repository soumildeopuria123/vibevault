import { useEffect } from 'react'

import { BRAND } from '../data'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND.name}` : `${BRAND.name}: ${BRAND.tagline}`
  }, [title])
}
