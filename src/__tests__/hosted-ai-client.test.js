import { expect, it, vi } from 'vitest'
import { generateHostedPrompts, hostedAiStatus } from '../components/hostedAi.js'

it('only sends approved field categories, with no browser key or private observations', async () => {
  const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ prompts: ['A familiar garden can be lovely.'] })))
  const profile = { name: 'Private', birthYear: 1942, lat: 32, lon: -96, anchors: { hometown: 'Dayton', job: 'teacher', extra: 'private' }, logs: ['secret'], photos: ['secret'] }
  expect(await generateHostedPrompts(profile, { fetchImpl })).toEqual(['A familiar garden can be lovely.'])
  const [url, options] = fetchImpl.mock.calls[0]
  expect(url).toBe('/api/ai/generate')
  expect(JSON.parse(options.body)).toEqual({ profile: { birthYear: 1942, anchors: { hometown: 'Dayton', job: 'teacher' } } })
  expect(options.headers.Authorization).toBeUndefined()
})
it('checks readiness without profile data and treats invalid/missing status as unavailable', async () => {
  const fetchImpl = vi.fn().mockResolvedValue(new Response('<html>not an API</html>'))
  expect(await hostedAiStatus({ fetchImpl })).toEqual({ hosted: true, configured: false })
  expect(fetchImpl.mock.calls[0][1].body).toBeUndefined()
})
it('filters previously approved and invalid new drafts', async () => {
  const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ prompts: ['A garden.', 'A garden.', 'A song.', 'A funeral.'] })))
  expect(await generateHostedPrompts({ birthYear: 1942 }, { fetchImpl, existing: ['A garden.'] })).toEqual(['A song.'])
})
it('returns helpful fixed failure messages, not arbitrary server text', async () => {
  const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: 'private-provider-error' }), { status: 503 }))
  await expect(generateHostedPrompts({ birthYear: 1942 }, { fetchImpl })).rejects.toThrow('temporarily unavailable')
})
