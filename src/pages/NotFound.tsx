import { Art } from '../components/Art'
import { Button } from '../components/Button'
import { Container } from '../components/Container'
import { NOT_FOUND } from '../data'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <Container className="flex flex-col items-center py-16 text-center sm:py-24">
      <Art name="map" decorative eager className="aspect-[3/2] w-full max-w-[460px]" imgClassName="object-contain" />
      <p className="kicker mt-6">Error 404</p>
      <h1 className="display mt-3 text-[48px] sm:text-[72px]">{NOT_FOUND.title}</h1>
      <p className="mt-4 max-w-[520px] text-[17px] text-muted">{NOT_FOUND.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button to="/" arrow>
          Back to home
        </Button>
        <Button to="/stories" variant="secondary">
          Browse stories
        </Button>
      </div>
    </Container>
  )
}
