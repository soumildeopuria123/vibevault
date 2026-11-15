// Every picture on the site goes through this one map. The files are
// generated ink-and-wash placeholders in public/images/; swap a path here (or
// replace the file) to use your own photography or illustration.
export const IMAGES = {
  hero: { src: '/images/hero-landscape.webp', alt: '' },
  balloon: { src: '/images/balloon.webp', alt: '' },
  lighthouse: { src: '/images/bearing-income.webp', alt: 'A lighthouse on a rocky headland' },
  footbridge: { src: '/images/bearing-invest.webp', alt: 'A wooden footbridge over a mountain stream' },
  sailboat: { src: '/images/bearing-tax.webp', alt: 'A sailboat on a calm lake beside pines' },
  oak: { src: '/images/bearing-legacy.webp', alt: 'An old oak tree with a bench beneath it' },
  map: { src: '/images/resource-map.webp', alt: 'A trail map, a compass and reading glasses on a table' },
  canoe: { src: '/images/resource-canoe.webp', alt: 'A canoe on the shore of a misty lake at dawn' },
  summit: { src: '/images/cta-summit.webp', alt: 'A winding road climbing to a cabin below a summit' },
} as const

export type ImageKey = keyof typeof IMAGES
