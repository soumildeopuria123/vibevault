import { useState } from 'react'

import { cx } from '../lib/cx'
import { IMAGES, type ImageKey } from '../lib/images'

/** An ink illustration from the image map, blended into the paper. Shows a shimmer until it loads. */
export function Art({ name, className, imgClassName, eager, decorative, sizes }: { name: ImageKey; className?: string; imgClassName?: string; eager?: boolean; decorative?: boolean; sizes?: string }) {
  const img = IMAGES[name]
  const [loaded, setLoaded] = useState(false)
  return (
    <span className={cx('relative block overflow-hidden', !loaded && 'skeleton', className)}>
      <img
        src={img.src}
        alt={decorative ? '' : img.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth) setLoaded(true)
        }}
        className={cx('ink-art size-full object-cover transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', imgClassName)}
      />
    </span>
  )
}
