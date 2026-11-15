import { Hono } from 'hono'

import { validateStory, validateSubscribe, type FieldErrors } from '../shared/validation'

// The Worker in front of the static site. The form routes validate input and
// return a reference; connect them to an email provider, a D1 table or an
// editorial queue to keep what people send.
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

const reference = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`

async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await req.json()
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}

const invalid = (fieldErrors: FieldErrors) => Response.json({ error: 'Please check the highlighted fields.', fieldErrors }, { status: 422 })
const badJson = () => Response.json({ error: 'Send a JSON object.' }, { status: 400 })

app.get('/api/health', (c) => c.json({ ok: true }))

app.post('/api/stories', async (c) => {
  const body = await readBody(c.req.raw)
  if (!body) return badJson()
  const errors = validateStory(body)
  if (Object.keys(errors).length) return invalid(errors)
  return c.json({ ok: true, reference: reference('VV') }, 201)
})

app.post('/api/subscribe', async (c) => {
  const body = await readBody(c.req.raw)
  if (!body) return badJson()
  const errors = validateSubscribe(body)
  if (Object.keys(errors).length) return invalid(errors)
  return c.json({ ok: true }, 201)
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
