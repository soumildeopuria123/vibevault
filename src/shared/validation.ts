// Validation shared by the forms and the Worker, so both give the same answers.

export type FieldErrors = Record<string, string>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

/** The four corners of the notebook. Shared so the form and the Worker agree. */
export const REGION_IDS = ['Nordic', 'Asia', 'Europe', 'Americas'] as const
export type RegionId = (typeof REGION_IDS)[number]

export const STORY = { titleMax: 90, nameMax: 60, placeMax: 60, bodyMin: 200, bodyMax: 6000 } as const


export function validateSubscribe(body: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {}
  const email = str(body.email)
  if (!email) e.email = 'Enter your email address.'
  else if (!EMAIL.test(email)) e.email = 'That email address does not look right.'
  return e
}

export function validateSignIn(body: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {}
  const email = str(body.email)
  const password = str(body.password)
  if (!email) e.email = 'Enter your email address.'
  else if (!EMAIL.test(email)) e.email = 'That email address does not look right.'
  if (!password) e.password = 'Enter your password.'
  return e
}

export function validateSignUp(body: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {}
  const name = str(body.name)
  const email = str(body.email)
  const password = str(body.password)
  if (name.length < 2) e.name = 'Tell us what to call you.'
  else if (name.length > STORY.nameMax) e.name = `Keep your name under ${STORY.nameMax} characters.`
  if (!email) e.email = 'Enter your email address.'
  else if (!EMAIL.test(email)) e.email = 'That email address does not look right.'
  if (password.length < 8) e.password = 'Use at least 8 characters.'
  else if (password.length > 200) e.password = 'That password is too long.'
  return e
}

export function validateStory(body: Record<string, unknown>): FieldErrors {
  const e: FieldErrors = {}
  const name = str(body.name)
  const title = str(body.title)
  const place = str(body.place)
  const country = str(body.country)
  const region = str(body.region)
  const story = str(body.body)

  if (name.length < 2) e.name = 'Tell us who wrote it.'
  else if (name.length > STORY.nameMax) e.name = `Keep your name under ${STORY.nameMax} characters.`

  if (title.length < 4) e.title = 'Give the story a title of at least 4 characters.'
  else if (title.length > STORY.titleMax) e.title = `Keep the title under ${STORY.titleMax} characters.`

  if (place.length < 2) e.place = 'Where did this happen?'
  else if (place.length > STORY.placeMax) e.place = `Keep the place under ${STORY.placeMax} characters.`

  if (country.length > STORY.placeMax) e.country = `Keep the country under ${STORY.placeMax} characters.`

  if (!REGION_IDS.includes(region as RegionId)) e.region = 'Pick the part of the world it belongs to.'

  if (story.length < STORY.bodyMin) e.body = `A little more, please: at least ${STORY.bodyMin} characters (${story.length} so far).`
  else if (story.length > STORY.bodyMax) e.body = `Trim the story to ${STORY.bodyMax.toLocaleString('en-US')} characters or fewer.`

  if (body.consent !== true) e.consent = 'Please confirm the story is yours to share.'

  return e
}
