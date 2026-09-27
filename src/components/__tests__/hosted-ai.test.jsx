// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import AiPrompts from '../AiPrompts.jsx'
import * as hosted from '../hostedAi.js'
import * as local from '../localAi.js'
vi.mock('../hostedAi.js', async original => ({ ...await original(), isHostedAiBuild: () => true, hostedAiStatus: vi.fn(), generateHostedPrompts: vi.fn() }))
vi.mock('../localAi.js', async original => ({ ...await original(), localAiStatus: vi.fn(), generateLocalPrompts: vi.fn() }))
const state = { profile: { name: 'Fictional Avery', birthYear: 1942, anchors: { hometown: 'Dayton' } }, logs: [], approvedPrompts: [] }
beforeEach(() => {
  localStorage.clear(); vi.clearAllMocks()
  hosted.hostedAiStatus.mockResolvedValue({ hosted: true, configured: true })
  hosted.generateHostedPrompts.mockResolvedValue(['A garden can be lovely.', 'A song can be familiar.'])
})
afterEach(cleanup)
it('lets a judge generate without a key and requires approval before saving', async () => {
  const update = vi.fn(), anthropic = vi.fn()
  await act(async () => render(<AiPrompts state={state} update={update} generatePrompts={anthropic} />))
  expect(screen.queryByLabelText('Anthropic API key')).toBeNull()
  expect(screen.queryByText('Connect OpenAI on this laptop')).toBeNull()
  expect(screen.getByText(/answers go to OpenAI through Moonrise’s Vercel-hosted server/)).toBeTruthy()
  expect(hosted.generateHostedPrompts).not.toHaveBeenCalled()
  await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Generate prompts' })))
  expect(hosted.generateHostedPrompts).toHaveBeenCalledExactlyOnceWith(state.profile, { existing: [] })
  expect(anthropic).not.toHaveBeenCalled()
  expect(local.localAiStatus).not.toHaveBeenCalled()
  expect(local.generateLocalPrompts).not.toHaveBeenCalled()
  expect(update).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Skip prompt 2' }))
  expect(update).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Approve prompt 1' }))
  expect(update).toHaveBeenCalledExactlyOnceWith({ ...state, approvedPrompts: ['A garden can be lovely.'] })
  expect(localStorage.length).toBe(0)
})
it('does not fall back to a saved browser key when hosted AI is unavailable', async () => {
  hosted.hostedAiStatus.mockResolvedValue({ hosted: true, configured: false })
  localStorage.setItem('moonrise:ai-key', 'fictional-old-key')
  await act(async () => render(<AiPrompts state={state} update={vi.fn()} />))
  expect(screen.getByRole('button', { name: 'Generate prompts' }).disabled).toBe(true)
  expect(screen.getByText(/New suggestions are temporarily unavailable/)).toBeTruthy()
  expect(screen.queryByLabelText('Anthropic API key')).toBeNull()
  expect(hosted.generateHostedPrompts).not.toHaveBeenCalled()
})
