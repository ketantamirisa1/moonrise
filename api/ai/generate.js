import { hostedAi } from '../../server/hosted-ai.mjs'
export default { fetch: request => hostedAi(request, 'generate') }
