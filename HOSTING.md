# Moonrise judge demo on Vercel

This branch adds a separate hosted OpenAI adapter. It is not deployed merely by adding
these files. Live provider access, Vercel function routing, firewall behavior and the final
judge URL must be checked after deployment. The original laptop server remains local-only.

## Before import

Review the hosted-AI branch and merge it into **your fork** only when ready. No changes to
Kanishk's live GitHub Pages app are required. This fork keeps the existing attribution.

Vercel can import a personally owned fork through GitHub. Choose **Vite** and repository
root, and allow the checked-in `vercel.json` to supply its build command. It uses
`VITE_HOSTED_AI=true VITE_BASE=/ npm run build`; output is `dist`. `VITE_HOSTED_AI` is a
public feature flag, not a credential. The API entrypoints are `api/ai/status.js` and
`api/ai/generate.js`, using Vercel's Node Web Handler interface.

## Owner setup

1. Import your fork at https://vercel.com/new. Leave the configuration file's settings
   in effect. Use the production branch containing this change. Do not pay for a plan
   or subscription merely to follow this guide.
2. In Environment Variables, add **OPENAI_API_KEY**, Production only. Paste your
   dedicated OpenAI key directly into Vercel's private field. Never use a `VITE_` prefix,
   commit a key, paste it in chat, or expose it in the browser. Check its permissions,
   expiration and account billing privately. The endpoint uses Responses with the
   existing `gpt-4.1-mini-2025-04-14` snapshot and at most 700 output tokens per request.
3. Initially leave **MOONRISE_AI_ENABLED** unset, or set it to **false**. Deploy the
   production app; it should offer built-in starters with new generation unavailable.
   Existing local browser records on other domains are not copied to the new site.
4. In the Vercel project's **Firewall → Configure → New Rule**, add a rate-limit rule
   for request path **/api/ai/generate**, using Fixed Window, **3 requests per 60 seconds**,
   counting by IP, with the **429** action. Save, review, and publish the rule. Do not
   leave its action at Log (that does not block). Review any displayed charges; do not
   purchase an upgrade without deciding to do so. The current docs list one included
   rate-limit rule on Hobby. Counters are regional, so this is not a global cost cap.
5. In the dedicated OpenAI project's limits, configure an appropriate **hard spend limit**
   and usage alerts for the judging period. An alert or soft budget is not a hard cap.
   Confirm which controls are actually available in your account before exposing the
   endpoint. Requests use the owner's paid API balance. The code additionally limits
   concurrent and repeated calls inside each active instance, but serverless instances
   do not share memory: that safeguard is not a global cap either.
6. Once the firewall and provider controls are ready, set **MOONRISE_AI_ENABLED=true**
   for Production and redeploy. Keep automatic Vercel system environment variables
   exposed: the adapter uses `VERCEL`, `VERCEL_ENV`, `VERCEL_URL`, and
   `VERCEL_PROJECT_PRODUCTION_URL` to require production HTTPS origins. Preview
   deployments deliberately cannot use this connection.
7. Use the production URL, not a protected preview URL. Verify it opens in an unsigned-in
   private browser without Vercel authentication; adjust production deployment protection
   if necessary. Keep the private Vercel dashboard protected.

## Judge acceptance check (fictional details only)

- Open the final URL on another device/network. The laptop is not needed.
- Create a fictional person such as Avery, born 1942, optional hometown Dayton/job teacher.
- Settings → Conversation starters must have **Generate prompts** enabled and **no API
  key entry field**. The disclosure identifies OpenAI through the Vercel-hosted server.
- Generate once. Confirm actual new drafts arrive. A configured flag alone is not a
  successful provider test. Review, skip one and approve one; only the approved selection
  should appear in a Story routine. Reload and verify it remains saved.
- Check native music, Stop, Finish → Log → Report. Check that logs/photos/profile names
  are absent from the API request; only birth year and hometown/spouse/job answers are sent.
- Confirm three quick calls from the same IP are followed by a 429, without making large
  numbers of billable requests. Provider and function logs must not contain keys or
  request bodies. The application itself never logs those values.
- Disable network and confirm saved/built-in starters remain usable; fresh generation
  correctly requires internet. The service worker does not cache API fetch responses.
- Only after passing, replace the Devpost live link and identify the hosted OpenAI provider
  in the tech stack. Do not claim this establishes patient testing or hospice readiness.

## Privacy and limits

The key stays in Vercel's private environment and server request. The frontend sends
birth year and entered hometown/spouse/job answers; these answers can identify a person.
Vercel processes this request on the way to OpenAI. Profile name, coordinates, photos,
prepared stories, session events and evening logs are excluded. OpenAI `store:false` is
used; that is not a claim of zero provider retention. Vercel infrastructure may retain
access metadata. The app stores approved starters in the user's browser, as before.

The endpoint accepts only the fixed suggestion task and bounded profile schema. It rejects
cross-origin browser calls and never exposes key setup/disconnect, arbitrary model selection,
user-supplied system instructions, or provider error bodies. Origin checks are CSRF protection,
not user authentication. This is a public hackathon demo with limited access to a paid API,
not a production healthcare deployment.

To stop public generation, set MOONRISE_AI_ENABLED=false and redeploy. Revoke its dedicated
OpenAI key when immediate provider cutoff is needed; old immutable deployments can otherwise
retain their configured environment. Keep the app's built-in routine as the fallback.

## Official references

- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/environment-variables
- https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
- https://vercel.com/docs/deployment-protection
- https://developers.openai.com/api/docs/guides/production-best-practices
- https://developers.openai.com/api/reference/overview
