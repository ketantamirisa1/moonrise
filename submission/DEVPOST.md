# Moonrise: Devpost submission (copy-paste ready)

> Prepared submission copy, updated September 27, 2026 after live hosted-AI verification. The official Devpost form has not yet been inspected while signed in. Use the text below with the existing screenshots and live/source links. Before submitting, verify the registered team, main track, required fields and uploaded materials. Current event overview and organizer slides say Sunday, September 27 at noon Central; the rules body still says 10 a.m. Aim to finish before the earlier time while that conflict is unresolved.

---

## Title

**Moonrise**

## Tagline (one line)

A calm evening routine for people living with dementia, timed to the real sky, to help family caregivers prepare, share an activity and keep a useful record.

## Links

- **Live app (try it now, no login or visitor API key):** https://moonrise-kappa.vercel.app/
- **Source code for this deployment:** https://github.com/ketantamirisa1/moonrise
- **Original shared team repository:** https://github.com/kanishksatish/moonrise (the deployed fork adds hosted OpenAI generation)
- **Video:** optional in the public requirements reviewed. Use a rights-cleared video if available; no video URL is currently verified.
- **How to test it:** https://github.com/kanishksatish/moonrise/blob/main/TESTING.md

> When you show a video, say: *"This is a generated, fictional demonstration. The people aren't real patients."*
> Don't publish the version with the Frank Sinatra soundtrack; we don't have the rights to share it publicly.

---

## Short project summary

Moonrise helps a family caregiver plan an evening routine, share an activity and leave a useful record for the next caregiver. The routine is timed to local sunset and a transparent cloud-cover adjustment, then can adapt to recorded episode timing. Story, Music and Quiet stay under the caregiver's control. Optional AI drafts personal conversation starters, which require review and approval before use. The app records what was offered, played, stopped and observed, then links that session to the evening log and printable handoff.

It is a caregiver-support prototype, not a predictor or treatment. We have not tested Moonrise with patients or established clinical benefit.

---

## 1. The problem and who it's for

**Who:** family caregivers of people living with dementia, and in the future the hospice and home-care teams
who support them. The caregiver uses the app. Moonrise mode offers a calm shared screen; the caregiver handles the controls and can stop or change an activity.

**The problem:**
- The Alzheimer's Association's **2025 report** describes nearly **12 million family members and friends** providing **19.2 billion hours of unpaid care** ([Alzheimer's Association, 2025 Facts and Figures](https://www.alz.org/news/2025/facts-figures-report-alzheimers-treatment)).
- **Late-day confusion and agitation ("sundowning") is common.** Estimates vary widely because definitions differ;
  one clinical study found it in **21% of 184 patients** (about 1 in 5)
  ([Toccaceli Blasi et al., *J. Alzheimer's Disease*, 2023](https://pubmed.ncbi.nlm.nih.gov/37334595/)).
- Evenings are hard to plan: sunset changes through the year, daylight varies with weather, and a tired caregiver
  often notices the problem only once it has started. When the family talks to a doctor, they rarely have a clear record
  of what actually happened each evening.

**Why our approach is useful:**
- **No special hardware:** a browser-based prototype for phones and tablets, with no wearable or sensor requirement. The core app needs no account.
- **A concrete plan:** it suggests a routine start using sunset, a cloud adjustment and available logged timing. This is a scheduling rule, not a clinically validated prediction of agitation.
- **Personal:** it adjusts to that one person's logged evenings with simple rules anyone can check.
- **Local records, explicit online features:** profiles, plans, logs and session records remain in browser storage; resized photos remain in IndexedDB. Weather/city lookup and optional AI generation have the limited external data transfers described below.
- **A record to discuss with a clinician:** a one-page weekly record and, when present, a second session-handoff page, with a reminder to raise sudden changes with a doctor,
  because pain, infection or a medication change can also cause evening agitation.

## 2. The solution: what it does, page by page

(Screenshots are in [`submission/screenshots/`](https://github.com/kanishksatish/moonrise/tree/main/submission/screenshots).)

| Page | How to get there | What it does | Screenshot |
|---|---|---|---|
| **Setup** | Opens the first time | Name, birth year, location (GPS or type a city), and optional memories (hometown, spouse, job) | `01-setup.png` |
| **Today** | Left menu (tablet) or bottom bar (phone) → **Today** | Choose tonight's activity (Story, Music, Quiet) and tap **Start Moonrise now**. The **sky card** shows the suggested start with a countdown, estimated dusk (sunset with a bounded cloud-cover adjustment) and the moon phase | `02-today.png`, `03-today-sky-card.png`, `13-phone-today.png` |
| **Launch** | Tap **Start Moonrise now** | A 2-second rocket flight to the moon ("Fly me to the moon"). Can be skipped | `04-launch.png` |
| **Moonrise mode (music)** | **A little music** | A big calm panel with a sky that follows the real sky and a moon that rises over an hour. Plays licensed recordings inside the app (works offline) and shows **Now playing** | `05-moonrise-music.png` |
| **Moonrise mode (story)** | **A familiar story** | One large conversation starter for the caregiver to read aloud. It changes every 3 minutes. The caregiver can note what they noticed | `06-moonrise-story.png` |
| **Log** | Tap **Finish**, or menu → **Log** | Three giant buttons: **Calm**, **Restless**, **Episode**. Optional: when the episode started, and comfort steps used | `07-log.png`, `08-log-saved.png` |
| **Report** | Menu → **Report** | The week at a glance, plus **Print care handoff**. Demo data has its own clearly labelled **Fictional example preview** | `09-report-recorded.png`, `10-report-example-week.png`, `11-report-printed.png` |
| **Settings** | Menu → **Settings** | Edit the profile, optional AI conversation starters (caregiver approves each one), **Load demo week**, **Start over** (erase everything) | `12-settings.png` |

**Try it in 2 minutes:** open the live link → set up a fictional person born 1942 → **Start Moonrise now** → **A little music** → play **Für Elise** → **Finish** → tap **Episode** → **Report**.
Full step-by-step guide: [TESTING.md](https://github.com/kanishksatish/moonrise/blob/main/TESTING.md).

**Try live AI:** use only fictional details for the public demonstration. Complete setup, then open **Settings → Generate prompts**. Review each draft with **Approve** or **Skip**. Return to **Today → A familiar story → Start Moonrise now** to use an approved starter. Judges do not enter a key. New generation needs internet and is subject to request and spending limits; built-in starters remain available.

## What the app keeps track of (the evening indicators)

These are **things the caregiver records or the app calculates**. They are not medical measurements; Moonrise has no sensors.

| Indicator | Where it comes from | Why it's useful |
|---|---|---|
| **Evening outcome:** Calm / Restless / Episode | One tap by the caregiver | Shows how evenings are going over the week |
| **Episode start time** | Optional, entered by the caregiver | Shows *when* hard evenings begin |
| **Minutes before dusk** that the episode started | Calculated: start time vs that evening's estimated dusk | The key number the start-time suggestion learns from |
| **Estimated dusk** | Sunset (Open-Meteo) moved earlier by cloud cover in the 2 hours before sunset | A transparent scheduling heuristic; not a measured light level or validated clinical threshold |
| **Cloudy vs clear evenings** | Forecast cloud cover (50% or more counts as cloudy) | Shows whether hard evenings tend to be cloudy ones |
| **Recording that actually played** | Only when the player reports real playback | An honest music record (not "the song worked") |
| **Comfort steps used** | Optional caregiver checklist | Record of what was tried |
| **Caregiver observations** | Free text, e.g. "hummed along" | Details for the next caregiver |
| **Session timeline** | Automatic: offered, started, declined, stopped, finished | A handoff for the next caregiver or nurse |
| **Evenings not recorded** | Automatic | Makes gaps visible instead of hiding them |

## How Moonrise "learns" (and our training data), in plain words

**Inside the app: it learns from each family's own evenings, with simple rules you can check.**
- **Start time:** by default the routine starts **45 minutes before dusk**. After **3 logged evenings** with at least one timed
  episode, Moonrise looks at when episodes usually start compared to dusk (the *median*, so one odd night doesn't throw it off)
  and suggests starting **20 minutes earlier than that**, never more than 90 or less than 15 minutes before dusk.
- **Why rules and not a big AI model?** One family logs maybe 7 to 30 evenings. That's far too little to train an AI model.
  We tested "smarter" statistical versions on **1,000 simulated families** and the tested onset-timing median rule performed better than the tested shrinkage alternative under those simulation assumptions. These are simulated results, not patient outcomes
  ([METHODOLOGY.md](https://github.com/kanishksatish/moonrise/blob/main/METHODOLOGY.md)).

**Outside the app: exploratory model research on a public dataset.**
- We analyzed the public **TIHM dataset** ([Zenodo](https://zenodo.org/records/7622128)), containing about one million home-monitoring records from 56 people living with dementia. The modeling analysis used participant-separated evaluation; see the full methods for included participants, six-hour windows and label handling.
- Logistic regression and gradient-boosting models were evaluated. Comparing recent activity with personal baselines improved average precision from **0.0504 to 0.0640** in one same-cohort comparison. Average precision measures ranking; it is not alert accuracy.
- Further bounded tuning did **not** establish an alert policy meeting its fixed precision and support requirements. We repeatedly developed on this cohort, so these results are exploratory rather than independent final validation.
- Labels are incomplete. An unlabelled six-hour window is **not a confirmed clinical negative**. The source cohort and app users also differ; the study does not validate Moonrise's scheduling rule or establish a music effect.
- **No trained predictor, fitted model or participant-level records are shipped in the app or repository.** Demo data is fictional. We have not tested Moonrise with patients or established hospice benefit.
- Full methods, aggregate results and limitations: [RESEARCH_RESULTS.md](https://github.com/kanishksatish/moonrise/blob/main/RESEARCH_RESULTS.md).

## Why this matters

Moonrise's goal is to make the most difficult hours of a dementia caregiver's day **easier to plan and document**:
- It gives the caregiver a visible suggested start time and a personal evening plan.
- It turns the evening into a **familiar, calm routine** (music, light, conversation) that the caregiver leads.
- It gives **families, nurses and doctors a clear record** of what happened each evening, including a reminder that sudden changes
  can have medical causes (pain, infection, medication), for discussion with a clinician. We have not measured whether it changes help-seeking or outcomes.
- It aims to reduce the work of remembering what was tried; caregiver burden has not yet been measured.

**Honest note:** Moonrise is a caregiver-support prototype. It has not been tested with patients, and we don't claim it treats or
prevents sundowning. The next step is a pilot with a hospice or care partner, with ethics review and family consent, to measure whether it helps.

---

## 3. Technology stack

| Category | What we used |
|---|---|
| **AI models (in the app)** | The submitted Vercel demo uses **OpenAI gpt-4.1-mini-2025-04-14** through the Responses API to draft conversation starters behind a caregiver approval gate. The original GitHub Pages build retains optional caregiver-supplied **Claude Haiku 4.5** access; a separate local OpenAI adapter also exists |
| **AI / ML (research)** | Logistic regression and gradient boosting (participant-separated cross-validation) on the TIHM dataset |
| **AI dev tools** | **Claude Code** and **Codex** assisted implementation, review and testing, coordinating through a GitHub issue. Codex also implemented the fork's hosted AI adapter. **Higgsfield** for 2 decorative illustrations |
| **APIs** | **Open-Meteo** Forecast API (sunset, hourly cloud cover) and Geocoding API (city search), free with no key |
| **Datasets** | **TIHM** public dementia home-monitoring dataset (research only); a curated seed list of 70 era songs (title/artist/year); **11 licensed recordings** (CC0, public-domain and CC BY/BY-SA, credited in the app) |
| **Libraries** | React 19, Vite 8, SunCalc (sun and moon position and phase), Zod, @anthropic-ai/sdk |
| **Platform** | Progressive Web App (installable, offline via service worker), plain CSS, localStorage and IndexedDB for local records; optional online weather and AI features |
| **Testing** | Vitest + Testing Library (**540 automated tests** in the hosted fork, including 32 added adapter/client tests), browser checks for generation, approval, offline behavior and printing. Original shared build: 508 tests |
| **Hosting** | **Vercel** serves the submitted app and server-side OpenAI adapter; GitHub Pages remains the original core-app deployment. GitHub Actions runs CI |

## 4. Build story

**What we completed in the build window:**
- A complete, deployed, offline-capable app: Setup, Today (live sky card with countdown), Moonrise mode (real-sky gradient, rising moon,
  warm light, in-app music, rotating conversation starters), one-tap Log, printable Report and session handoff, and Settings.
- A transparent engine: effective dusk from sunset + clouds, a start time that adapts to logged evenings, and a weekly report.
- Optional AI conversation starters with a caregiver approval gate, including a Vercel-hosted OpenAI adapter so demo visitors do not need a key.
- Real model training on the TIHM dementia dataset, reported honestly.
- 540 automated tests in the hosted fork, the original 26 offline checks and full-evening browser run, and a live hosted Generate → review → approve → use check with fictional details.

**Challenges and surprises:**
- **Two AI coding agents on one codebase.** Claude Code and Codex split engine vs UI and talked through a GitHub issue. Codex found
  a production-only offline bug (GitHub Pages serves MP3 files under a different type name), and Claude reproduced and fixed it.
- **Music rights.** YouTube videos wouldn't embed (error 150), and most classic recordings are still under copyright. We switched to
  11 recordings with clear licenses that play inside the app and offline.
- **Offline audio** needed special handling so you can skip around in a cached song.
- **The research boundary:** an onset-rule comparison on simulated families favored the median rule under its assumptions. Separately, the public TIHM benchmark did not establish a usable alert policy. Neither analysis establishes clinical effectiveness; trained prediction remains outside the app.

**What we learned:**
- For a tired caregiver, the small things matter most: big buttons, nothing that plays by itself, never losing an unsaved note, and
  clearly showing when something *wasn't* recorded.
- Splitting evaluation by participant reduces one source of leakage. Repeated development on the same cohort still requires independent confirmation.
- Being honest about limits builds more trust than a flashy claim, especially in healthcare.

**What we'd build next:**
- A pilot with a hospice or home-care partner (ethics review, consent, caregiver usability sessions).
- **Multiple people per device** for care settings, with a per-person switcher and access controls.
- Background reminders that work when the app is closed.
- Production access controls, auditability and an organization-approved data-handling design beyond the public demo's limited hosted generation endpoint.
- Re-testing prediction only with consented, app-relevant data from a real pilot.

## 5. Credits (what we built and what we used)

**Our team's contribution:** the product idea and design, the whole app (engine and UI), the dusk and start-time rules, the report and
handoff, offline support, the tests, the research benchmark on TIHM, and the docs. Code was written by our two humans working with
AI coding agents (**Claude Code** and **Codex**).

**Existing tools and resources we used (thank you):**
- Open-Meteo (weather and geocoding), SunCalc (sun and moon), React, Vite, Zod, Vitest, Playwright, Vercel and GitHub Pages.
- Anthropic Claude Haiku 4.5 and OpenAI gpt-4.1-mini (optional conversation-starter drafts).
- TIHM dataset (Zenodo record 7622128), used for research only; no records are in our repo.
- Music: 11 recordings, each with its license and performer credited in the app and in
  [`src/assets/audio/LICENSES.md`](https://github.com/kanishksatish/moonrise/blob/main/src/assets/audio/LICENSES.md) (for example, *Für Elise* by V Gao, CC0).
- Illustrations: 2 images generated with Higgsfield ([DESIGN.md](https://github.com/kanishksatish/moonrise/blob/main/DESIGN.md)).
- Promo videos: generated, fictional people and scenes, not real patients.

## Required disclosures (keep in the submission)

- Caregiver-support prototype; not a diagnostic, treatment or prevention tool. No Moonrise patient testing, clinical validation or hospice benefit has been established.
- Personal profiles, plans, logs, sessions, approved starters and resized photos are kept in this browser's local storage/IndexedDB. Open-Meteo receives coordinates or city text for weather/city lookup.
- Optional Generate sends birth year and entered hometown, spouse and job answers to the selected AI provider. Those answers can identify someone. Profile name, coordinates, logs, photos, prepared stories, preferences and session events are excluded from generation requests. Generated drafts require caregiver approval.
- The submitted Vercel app sends optional generation requests through its server to OpenAI. Its owner-managed key remains in Vercel's private environment; visitors do not provide a key. Request limits and a project spending limit restrict generation. OpenAI requests use store:false; this is not a claim of zero provider retention. The original GitHub Pages build uses a separate caregiver-supplied Anthropic path.
- On September 27, the deployed Vercel app generated six drafts using fictional details. Five were skipped and one approved; the approved starter survived reload and appeared in the session. Finish returned to the evening log. This is a software workflow test, not patient testing or clinical validation.
- Public TIHM research is exploratory and separate from the app. No trained predictor or participant-level records are shipped. Music playback records and observed evening outcomes do not establish causation.
- Generated promo scenes depict fictional people, not patients. The Sinatra-soundtrack version is not cleared for public release; use rights-cleared media or the live app/screenshots instead.

---

## Before you hit submit ✅

- [ ] Title: **Moonrise**
- [ ] Problem and audience (section 1)
- [ ] Solution (section 2 + indicators + learning)
- [ ] Technology list (section 3)
- [ ] Screenshots uploaded (from `submission/screenshots/`, at least 02, 03, 05, 06, 07, 11)
- [ ] Live demo link + repo link
- [ ] If including a video: rights-cleared audio, fictional-media disclosure and working link
- [ ] Build story and lessons learned (section 4)
- [ ] Credits (section 5) and disclosures
- [ ] Registered eligible human team members named and accepted (maximum four)
- [ ] Main track selected; do not claim Photon without the required integration
- [ ] Accurate human contributions and actual build dates added
- [ ] Final saved form reviewed; submission status and project URL recorded
- [ ] Deadline checked: overview/slides noon Central Sunday; rules body 10 a.m. conflict unresolved
