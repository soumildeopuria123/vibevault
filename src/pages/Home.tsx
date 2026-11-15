import { useDocumentTitle } from '../lib/useDocumentTitle'
import { Hero } from '../sections/Hero'
import { CtaBand, Destinations, LatestStories, Manifesto, Memories, Numbers } from '../sections/HomeSections'

export function Home() {
  useDocumentTitle()
  return (
    <>
      <Hero />
      <LatestStories />
      <Destinations />
      <Numbers />
      <Memories />
      <Manifesto />
      <CtaBand />
    </>
  )
}
