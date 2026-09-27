// Development-only fixture, omitted from production. No provider requests or saved records.
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import AiPrompts from '../../src/components/AiPrompts.jsx'
import '../../src/index.css'
import '../../src/styles/app.css'
import '../../src/styles/visual.css'

const realFetch = window.fetch.bind(window)
window.fetch = async (url, options) => {
  if (url === '/api/ai/status') return Response.json({ gateway: 'moonrise-hosted-openai-v1', configured: true })
  if (url === '/api/ai/generate') return Response.json({ prompts: ['A garden can be full of familiar colors.', 'A favorite melody can start a conversation.'] })
  return realFetch(url, options)
}
function Fixture() {
  const [state, update] = useState({ profile: { name: 'Fictional Avery', birthYear: 1942, anchors: { hometown: 'Dayton' } }, logs: [], approvedPrompts: [] })
  return <div className="app"><main className="screen">
    <h1>TEST · hosted review layout</h1>
    <p>Fictional visual fixture. Replies are simulated. No API requests or records are saved.</p>
    <AiPrompts state={state} update={update} />
  </main></div>
}
createRoot(document.getElementById('root')).render(<Fixture />)
