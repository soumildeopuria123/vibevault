import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

import { Button } from '../components/Button'
import { Cloud } from '../components/Clouds'
import { HERO } from '../data'
import { IMAGES } from '../lib/images'

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const balloonY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -160])
  const cloudX = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -48])
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Landscape: black ink on white, multiplied into the paper and faded at the top edge. */}
      <div className="relative z-0 mt-[236px] h-[340px] sm:mt-[270px] sm:h-[520px] lg:mt-[250px] lg:h-[620px]">
        <img
          src={IMAGES.hero.src}
          alt=""
          fetchPriority="high"
          className="ink-art absolute inset-0 size-full object-cover object-[50%_58%] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_30%,#000_86%,transparent_100%)]"
        />
      </div>

      <motion.div style={{ x: cloudX }} className="pointer-events-none absolute inset-0 z-0">
        <Cloud variant={1} className="absolute left-[14%] top-[300px] hidden w-[21%] max-w-[310px] animate-cloud sm:block lg:top-[250px]" />
        <Cloud variant={2} className="absolute left-[44%] top-[372px] w-[30%] max-w-[300px] animate-cloud [animation-delay:-8s] sm:top-[440px] sm:w-[20%] lg:top-[436px]" />
        <Cloud variant={3} className="absolute right-[-2%] top-[300px] w-[26%] max-w-[340px] animate-cloud [animation-delay:-14s] sm:top-[380px] sm:w-[23%] lg:top-[370px]" />
      </motion.div>
      <motion.div
        style={{ y: balloonY }}
        className="pointer-events-none absolute left-[26%] top-[330px] z-0 w-[54px] mix-blend-multiply sm:left-[34%] sm:top-[400px] sm:w-[78px] lg:left-[36%] lg:top-[372px] lg:w-[92px]"
      >
        <img src={IMAGES.balloon.src} alt="" className="animate-drift aspect-square w-full object-contain" />
      </motion.div>

      <div className="absolute inset-x-0 top-0 z-10 mx-auto flex max-w-[1100px] flex-col items-center px-5 pt-4 text-center sm:pt-6">
        <h1 id="hero-title" className="display animate-rise text-[52px] leading-[0.92] sm:text-[80px] lg:text-[100px]">
          <span className="block">{HERO.title[0]}</span>
          <span className="block">{HERO.title[1]}</span>
        </h1>
        <p className="mt-4 max-w-[640px] animate-rise text-[16px] text-muted [animation-delay:120ms] sm:text-[19px]">{HERO.lede}</p>
        <div className="mt-6 animate-rise [animation-delay:220ms]">
          <Button to="/stories" arrow size="md">
            {HERO.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
