import { AiPromptError, cleanGeneratedPrompts } from '../engine/index.js'

export const isHostedAiBuild = () => import.meta.env.VITE_HOSTED_AI === 'true'
const messages = {
  invalid_profile: 'Check the birth year and keep each optional memory answer under 160 characters.',
  rate_limited: 'The demo request limit was reached. Wait a minute and try again. Saved starters still work.',
  busy: 'Other suggestions are being prepared. Please try again in a moment.',
  refused: 'No suggestions were returned. Your built-in starters are still available.',
  bad_output: 'The suggestions could not be used. Your built-in starters are still available.',
  timeout: 'The request took too long. Your built-in starters still work; try again later.',
}
const unavailable = 'New suggestions are temporarily unavailable. Your built-in and approved starters still work.'
async function call(route, body, fetchImpl = globalThis.fetch) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), route === 'status' ? 5000 : 35000)
  try {
    const response = await fetchImpl(`/api/ai/${route}`, {
      method: route === 'status' ? 'GET' : 'POST',
      headers: route === 'status' ? {} : { 'Content-Type': 'application/json', 'X-Moonrise-Client': '1' },
      ...(body ? { body: JSON.stringify(body) } : {}), cache: 'no-store', credentials: 'same-origin', signal: controller.signal,
    })
    const data = await response.json()
    if (!response.ok) throw new AiPromptError(data.error || 'service', messages[data.error] || unavailable)
    return data
  } catch (error) {
    if (error instanceof AiPromptError) throw error
    throw new AiPromptError('offline', unavailable)
  } finally { clearTimeout(timer) }
}
export async function hostedAiStatus({ fetchImpl } = {}) {
  try {
    const data = await call('status', null, fetchImpl)
    return { hosted: true, configured: data.gateway === 'moonrise-hosted-openai-v1' && data.configured === true }
  } catch { return { hosted: true, configured: false } }
}
export async function generateHostedPrompts(profile, { existing = [], fetchImpl } = {}) {
  // Explicit allowlist: no keys, names, coordinates, logs, photos or session events.
  const selected = { birthYear: profile.birthYear, anchors: {} }
  for (const field of ['hometown', 'spouse', 'job']) {
    if (typeof profile.anchors?.[field] === 'string') selected.anchors[field] = profile.anchors[field]
  }
  const data = await call('generate', { profile: selected }, fetchImpl)
  if (!Array.isArray(data.prompts) || data.prompts.length > 6 || !data.prompts.every(p => typeof p === 'string')) throw new AiPromptError('bad_output', messages.bad_output)
  return cleanGeneratedPrompts(data.prompts, existing)
}
