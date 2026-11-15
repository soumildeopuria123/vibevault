// Every string, place, story and memory on the site lives here. Edit this file
// to rebrand; pictures are mapped in src/lib/images.ts.

import type { ImageKey } from './lib/images'
import { REGION_IDS } from './shared/validation'

export const BRAND = {
  name: 'VibeVault',
  short: 'VibeVault',
  tagline: 'Travels, stories & memories',
  email: 'hello@vibevault.example',
  place: 'Kept from everywhere',
  storagePrefix: 'vibevault:',
}

export const NAV = [
  { label: 'Stories', to: '/stories' },
  { label: 'Destinations', to: '/#destinations' },
  { label: 'Memories', to: '/#memories' },
  { label: 'About', to: '/about' },
  { label: 'Write', to: '/write' },
]

export const HERO = {
  kicker: 'A travel journal',
  title: ['Every journey', 'leaves a story.'],
  lede: 'VibeVault keeps the trips that stayed with us: the wrong turns, the strangers who fed us, the mornings worth waking up for.',
  cta: 'Read the stories',
}

export type Region = (typeof REGION_IDS)[number]
export const REGIONS: Region[] = [...REGION_IDS]

export type Destination = {
  id: string
  name: string
  country: string
  region: Region
  blurb: string
  image: ImageKey
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'lofoten',
    name: 'Lofoten',
    country: 'Norway',
    region: 'Nordic',
    blurb: 'Fishing villages pinned to granite, and a sea that never quite goes dark in June.',
    image: 'lighthouse',
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    blurb: 'Lantern-lit lanes, a thousand small gardens, and breakfast served at seven sharp.',
    image: 'footbridge',
  },
  {
    id: 'dolomites',
    name: 'Dolomites',
    country: 'Italy',
    region: 'Europe',
    blurb: 'Limestone towers, rifugio lunches, and trails that end at somebody else’s table.',
    image: 'summit',
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Chile',
    region: 'Americas',
    blurb: 'Wind, ice, and a horizon that keeps moving further away from you.',
    image: 'sailboat',
  },
]

export type Story = {
  slug: string
  title: string
  excerpt: string
  region: Region
  place: string
  country: string
  date: string
  minutes: number
  author: string
  image: ImageKey
  body: { h?: string; p: string }[]
}

export const STORIES_PAGE = {
  kicker: 'Stories',
  title: 'Field notes from the road.',
  lede: 'Long reads about places we did not plan for and people we did not expect. One trip per story, told slowly.',
}

export const STORIES: Story[] = [
  {
    slug: 'three-days-of-fog-on-the-lofoten-coast',
    title: 'Three days of fog on the Lofoten coast',
    excerpt: 'The ferry was cancelled, the mountain was invisible, and the week turned out better for it.',
    region: 'Nordic',
    place: 'Reine',
    country: 'Norway',
    date: '2026-09-18',
    minutes: 6,
    author: 'Mira Halvorsen',
    image: 'lighthouse',
    body: [
      { p: 'The ferry to Vindstad was cancelled before we reached the dock. A man in oilskins looked at the grey water, then at us, and said the word “imorgon” — tomorrow — with the patience of someone who has said it many times.' },
      { h: 'What the fog hides', p: 'Lofoten is photographed in a particular way: sharp peaks, black water, a red cabin in the foreground. The fog gives you none of that. It gives you the sound of a pump in the harbour, the smell of drying cod, and a lighthouse that appears for four minutes at a time.' },
      { p: 'We walked the coast road instead, past racks of fish that had been hanging since March, and ate a bag of cinnamon buns on a bench outside the shop because it was the only bench not facing the wind.' },
      { h: 'The detour', p: 'On the second evening a fisherman named Anders waved us into his boathouse to get out of the rain. He made coffee in a pot older than either of us, and told us the weather had been the same the week his daughter was born, which he took as a good sign.' },
      { p: 'We never did take the ferry. The mountain stayed hidden the whole three days. What we brought home instead was a small, specific memory of a boathouse and a coffee pot, and the phrase “imorgon”, used kindly.' },
    ],
  },
  {
    slug: 'the-lantern-shop-in-gion',
    title: 'The lantern shop in Gion',
    excerpt: 'A broken lantern, a shopkeeper with a roll of washi paper, and an hour I did not budget for.',
    region: 'Asia',
    place: 'Kyoto',
    country: 'Japan',
    date: '2026-08-30',
    minutes: 5,
    author: 'Kenji Aoki',
    image: 'footbridge',
    body: [
      { p: 'The lantern had survived two flights and a bus before the paper finally split along one seam. I carried it into a narrow shop in Gion because the window was full of exactly this kind of damage, repaired and hanging again.' },
      { h: 'A repair, not a replacement', p: 'The shopkeeper did not offer to sell me a new one. She took the lantern, turned it over twice, and asked where it came from. When I said my grandmother’s house, she nodded and cut a strip of new washi that was close enough to the old paper to belong.' },
      { p: 'The repair took forty minutes. I sat on a stool by the door and watched the street fill with people heading to dinner. She worked without small talk, then held it up to the window light and said, in English, “Now it has two lives.”' },
      { p: 'I had planned to see three temples that afternoon and saw none of them. The lantern is on my shelf now, with a visible seam, and I would trade every temple queue for that stool by the door.' },
    ],
  },
  {
    slug: 'a-canoe-a-lake-and-nothing-to-prove',
    title: 'A canoe, a lake, and nothing to prove',
    excerpt: 'Four days in the Boundary Waters taught me to portage badly and stop apologising for it.',
    region: 'Americas',
    place: 'Boundary Waters',
    country: 'United States',
    date: '2026-08-04',
    minutes: 4,
    author: 'Noor Haddad',
    image: 'canoe',
    body: [
      { p: 'The first portage was 180 rods, which the map made look like a small green line and my shoulders have not forgiven. I dropped the canoe twice, apologised to nobody in particular, and got back under it.' },
      { h: 'The quiet arrives slowly', p: 'For the first day the lake is just water you have to cross. On the second morning, with the tent still wet and the coffee not yet made, a loon called from somewhere behind the island and the whole lake seemed to hold still for it.' },
      { p: 'We caught two smallmouth bass and let both go. We read the same paperback out loud badly. We did not check our phones, because there was nothing to check them against.' },
      { p: 'The last morning I paddled out before anyone woke. No photograph of that lake looks like the lake did, so I have stopped trying to describe it and started saying: go, in September, and take one bag fewer than you think.' },
    ],
  },
  {
    slug: 'above-cappadocia-before-the-sun',
    title: 'Above Cappadocia before the sun',
    excerpt: 'Thirty balloons, one burner, and the strange politeness of floating over someone’s roof at dawn.',
    region: 'Asia',
    place: 'Göreme',
    country: 'Türkiye',
    date: '2026-07-21',
    minutes: 5,
    author: 'Tomás Ferreira',
    image: 'balloon',
    body: [
      { p: 'The pickup was at 4:40 and I was the only person in the minibus awake enough to be nervous. By the time we reached the field, the balloons were already being inflated in the dark, breathing like something enormous asleep.' },
      { h: 'The first ten minutes', p: 'You rise faster than you expect. One moment there is a field with torches in it, the next there are roofs, then gardens, then the valleys opening out in that pale rose light that photographs never quite get.' },
      { p: 'Our pilot, who had been doing this for nineteen years, put us down in a vineyard between two rows and apologised to the grower, who was standing there with a bucket and seemed entirely unbothered.' },
      { p: 'The champagne was cheap and warm. The certificate had my name spelled wrong. I have it pinned above my desk anyway, because it is the only proof I have that a person can be that quiet and that happy at the same time.' },
    ],
  },
  {
    slug: 'the-trail-that-ended-at-a-strangers-table',
    title: 'The trail that ended at a stranger’s table',
    excerpt: 'A wrong turn in the Dolomites, a closed rifugio, and a kitchen that took us in for the night.',
    region: 'Europe',
    place: 'Dolomites',
    country: 'Italy',
    date: '2026-06-12',
    minutes: 6,
    author: 'Mira Halvorsen',
    image: 'summit',
    body: [
      { p: 'The sign said forty minutes to the rifugio. It said this in the confident way that mountain signs do, and it was wrong, and the afternoon was getting longer while the path got steeper.' },
      { h: 'The wrong valley', p: 'We came down into the wrong valley at dusk. The rifugio on the map was shuttered for the season. A woman on the terrace of a house below the trail watched us read the map for a while, then asked, in Italian, whether we had eaten.' },
      { p: 'She fed us polenta, cheese from a neighbour, and a bottle of something homemade that nobody wrote down the name of. Her son translated between courses and her husband complained about the weather, the tourists and the road, in that order, twice.' },
      { p: 'We slept in a room that was usually for grandchildren and left before seven with a jar of preserves we had not asked for. I still cannot find the house on a map, and I have stopped trying. Some trips are only meant to be remembered.' },
    ],
  },
  {
    slug: 'the-map-i-stopped-following',
    title: 'The map I stopped following',
    excerpt: 'A paper map of Lisbon, a wrong tram, and the afternoon I stopped treating getting lost as a failure.',
    region: 'Europe',
    place: 'Lisbon',
    country: 'Portugal',
    date: '2026-05-03',
    minutes: 5,
    author: 'Tomás Ferreira',
    image: 'map',
    body: [
      { p: 'I had a paper map because the guidebook said I should, and I followed it with the seriousness of a person who has never been late in their life. I saw every viewpoint marked on it and remembered none of them.' },
      { h: 'The wrong tram', p: 'On the third day I got on the wrong tram, noticed four stops later, and decided not to get off. Thirty minutes later the city opened up into streets with no names I could find on the map, and a bakery with three tables and a queue out the door.' },
      { p: 'I ate a custard tart standing up. A woman next to me explained that the queue was worth it because the oven was older than the building. I have no way to verify the second part, and it does not matter.' },
      { p: 'The map is folded in a drawer now, with the bakery marked in pen, badly. That is the only annotation on it I trust.' },
    ],
  },
]

export type Memory = {
  id: string
  caption: string
  place: string
  year: number
  image: ImageKey
}

export const MEMORIES: Memory[] = [
  { id: 'fog', caption: 'Fog over the harbour, four minutes of lighthouse', place: 'Reine, Norway', year: 2026, image: 'lighthouse' },
  { id: 'bridge', caption: 'The last light on the footbridge', place: 'Kyoto, Japan', year: 2026, image: 'footbridge' },
  { id: 'glass', caption: 'Morning glass before the loons woke', place: 'Boundary Waters, USA', year: 2026, image: 'canoe' },
  { id: 'balloons', caption: 'Thirty balloons, one sunrise', place: 'Göreme, Türkiye', year: 2026, image: 'balloon' },
  { id: 'polenta', caption: 'Polenta, and a borrowed chair', place: 'Dolomites, Italy', year: 2026, image: 'summit' },
  { id: 'first', caption: 'The map that started all of this', place: 'Lisbon, Portugal', year: 2019, image: 'map' },
]

export const NUMBERS = [
  { value: 41, suffix: '', label: 'countries in the vault' },
  { value: 168, suffix: '', label: 'stories collected' },
  { value: 9, suffix: ' yrs', label: 'of keeping this notebook' },
  { value: 0, prefix: '$', suffix: '', label: 'spent on advertising, ever' },
]

export const MANIFESTO = {
  kicker: 'Why a vault',
  title: 'Trips fade. Stories do not.',
  body: 'A photograph tells you that you were there. A story tells you what it was like — the cancelled ferry, the coffee pot, the woman on the terrace who asked whether you had eaten.',
  points: ['Written by the people who went', 'One place at a time, no listicles', 'Kept for whoever comes next'],
}

export const CTA = {
  title: 'Bring back something worth telling.',
  body: 'One story every Sunday: a new place, a wrong turn, and one thing we would do differently next time. No adverts, no affiliate links.',
  primary: 'Read the stories',
  secondary: 'About the vault',
}

export const NEWSLETTER = {
  title: 'The Sunday postcard',
  body: 'One story from the road, once a week. unsubscribe any time.',
}

export const FOOTER = {
  blurb: 'A travel journal for trips that stayed with us: stories, destinations and the memories we kept.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'All stories', to: '/stories' },
        { label: 'Destinations', to: '/#destinations' },
        { label: 'Memories', to: '/#memories' },
      ],
    },
    {
      title: 'The vault',
      links: [
        { label: 'About', to: '/about' },
        { label: 'How it works', to: '/about#how' },
        { label: 'Write a story', to: '/write' },
      ],
    },
  ],
  legal:
    'VibeVault is a fictional travel journal, created for demonstration. The places are real; the names, stories and photographs are illustrative.',
}

/* ---------- Write ---------- */

export const WRITE_PAGE = {
  kicker: 'Write a story',
  title: 'Tell us about the trip.',
  lede: 'A cancelled ferry, a kitchen you were invited into, a wrong tram. Write it the way you would tell a friend.',
  preview: {
    title: 'What the reader sees',
    body: 'Your story appears here as you type. Nothing is sent until you press send.',
    empty: 'Start with where you were, then write the one thing you still think about.',
  },
  note: 'Every story is read by a person. We never publish one without your say, and we never add adverts to it.',
  success: {
    title: 'Your story is in the vault.',
    body: 'It is queued for a read. Keep the reference below; we reply to every story we receive.',
  },
}

/* ---------- About ---------- */

export const ABOUT_PAGE = {
  kicker: 'About the vault',
  title: 'A shared vault for travels, stories and memories.',
  lede: 'VibeVault began as one notebook passed around a hostel kitchen. It is still mostly that: a place to keep the trip in words, before the details go.',
  how: [
    { n: '01', title: 'Go somewhere', body: 'Anywhere counts. A wrong tram across town is a trip if you let it be one.' },
    { n: '02', title: 'Write it down', body: 'The ferry that was cancelled. The name of the coffee pot. What the street smelled like at seven.' },
    { n: '03', title: 'Keep it here', body: 'Stories are kept with their place and their year, so you can find them again in a decade.' },
  ],
  values: [
    { title: 'Slow over seen', body: 'One place, told properly, beats ten photographs of a queue.' },
    { title: 'Nothing sold', body: 'No adverts, no affiliate links, no sponsored itineraries. Nobody pays to be in the vault.' },
    { title: 'People first', body: 'The best part of any trip is somebody who fed you. The stories are about them.' },
  ],
  write: {
    title: 'Have a story in the vault?',
    body: 'Send us the trip you cannot stop talking about. We read everything, we reply to everything, and we never publish without your say.',
    email: 'stories@vibevault.example',
    cta: 'Write your story',
  },
}

export const HELP = {
  title: 'A little about the vault',
  body: 'The short answers to what people ask before they start reading. Anything else, write to us and a person will reply.',
  faqs: [
    { q: 'What is VibeVault?', a: 'A travel journal: stories about places, the people we met there, and the memories we did not want to lose.' },
    { q: 'Who writes the stories?', a: 'Travellers, mostly first-hand. Every story names the person who wrote it and the year they went.' },
    { q: 'Can I share mine?', a: 'Yes. Write to stories@vibevault.example with the place and a few paragraphs. We reply to every message.' },
    { q: 'Is any of it sponsored?', a: 'No. There are no adverts and no affiliate links, and no one pays to appear in the vault.' },
  ],
}

export const NOT_FOUND = {
  title: 'This path leads nowhere.',
  body: 'The page you were looking for has moved or was never on the map. Let us point you back toward the road.',
}
