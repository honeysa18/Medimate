# MEDIMATE — Frontend (Milestone 1)

This is the first build milestone for MEDIMATE: a working Next.js frontend
covering the **landing page**, **dashboard**, and **symptom checker** flow,
with a typed API contract ready for a real AI backend.

## What's included

- **Landing page** (`/`) — hero with a live animated symptom-to-triage demo,
  feature grid, trust/security strip, footer.
- **Dashboard** (`/dashboard`) — health score, active follow-ups, medication
  reminders, recent assessments, emergency contacts. Backed by mock data in
  `src/lib/mock-dashboard-data.ts`.
- **Symptom Checker** (`/symptom-checker`) — full intake flow: free-text
  description, follow-up questions (duration, severity), AI assessment,
  structured results (risk level, possible conditions, next steps, home
  care, emergency banner when applicable).
- **Mock assessment API** (`/api/symptom-assessment`) — returns realistic,
  correctly-typed responses today via keyword matching, with a hard-coded
  emergency short-circuit for red-flag symptoms (chest pain, breathing
  difficulty, stroke signs, suicidal ideation, seizures) that bypasses any
  model call entirely.

## Design system

- **Colors**: Medical Blue `#2563EB`, Teal `#14B8A6`, soft gray-blue
  background `#F8FAFC`, plus a dedicated risk-state palette (low/moderate/
  emergency) used consistently everywhere risk appears.
- **Type**: Lexend (display — chosen for its reading-clarity design, which
  fits a clinical product), Inter (body), JetBrains Mono (data/vitals/
  scores). Self-hosted via `@fontsource` rather than fetched from Google
  Fonts at runtime, since the build sandbox couldn't reach
  `fonts.googleapis.com` — this is also more robust for production, since
  it removes an external runtime dependency.
- **Signature element**: the `RiskMeter` component
  (`src/components/ui/risk-meter.tsx`) — a three-segment gauge
  (Low -> Moderate -> Emergency) reused identically across the symptom
  checker, dashboard, and follow-up cards, so "where does this sit on the
  risk spectrum" is one consistent visual language across the whole app.

## Architecture notes — read before wiring up the real AI layer

**Type contracts are the seam.** `src/types/symptom-assessment.ts` defines
`SymptomAssessmentRequest` and `SymptomAssessmentResult`. Every component
(`IntakeChat`, `FollowUpPrompt`, `AssessmentResult`) is built against these
types, not against the mock implementation. To go live:

1. Add your OpenAI API key as an environment variable (e.g.
   `OPENAI_API_KEY` in `.env.local` — never commit this file).
2. In `src/app/api/symptom-assessment/route.ts`, replace the body of
   `runMockAssessment()` with a real call to the OpenAI API. Prompt it to
   return JSON matching `SymptomAssessmentResult` exactly — OpenAI's
   structured outputs / JSON mode is the simplest path.
3. **Keep `detectEmergencyKeywords()` in front of the model call.** Red-flag
   symptoms (chest pain, breathing difficulty, stroke signs, suicidal
   intent, seizures) should never depend solely on an LLM's judgment — a
   model can be wrong or inconsistent, and a missed emergency is the
   costliest possible failure mode for this product. The current code
   already short-circuits to a hard-coded emergency response before any
   model call happens; preserve that structure even after the mock is
   replaced with a real model.
4. Nothing in the frontend needs to change. `IntakeChat`, `FollowUpPrompt`,
   and `AssessmentResult` only know about the type contract, not about how
   the result was produced.

**This frontend does not implement:**
- Authentication (Clerk/Auth.js) — routes are currently open.
- The FastAPI backend, PostgreSQL schema, or ML disease-prediction pipeline
  from the original spec — those are separate, substantial deliverables.
- Prescription OCR, the TelMed voice agent (ElevenLabs/Twilio), Google Maps
  hospital finder, or the admin panel — nav links to these routes exist,
  but the pages themselves aren't built yet.
- Real HIPAA compliance. The UI and copy reflect "HIPAA-inspired" security
  patterns (encryption framing, RBAC mentions, audit-log mentions), but true
  compliance requires BAAs with every vendor, infrastructure-level controls,
  and audits — none of which a frontend can provide on its own. Don't
  market this build as HIPAA-compliant without doing that work first.
- Real medication dosage guidance beyond general OTC information with
  disclaimers. Do not extend the mock API to give prescription-strength
  dosing without clinical review — that crosses from decision support into
  practicing medicine.

## Running locally

```bash
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## Project structure

```
src/
  app/
    page.tsx                          -> landing page
    dashboard/page.tsx                -> dashboard
    symptom-checker/page.tsx          -> symptom checker flow
    api/symptom-assessment/route.ts   -> mock AI assessment endpoint
  components/
    ui/                               -> Button, Card, Badge, RiskMeter
    landing/                          -> hero, feature grid, trust strip, footer
    dashboard/                        -> nav, all dashboard widgets
    symptom-checker/                  -> intake chat, follow-up prompts, results
  lib/
    utils.ts                          -> cn() class merger
    mock-dashboard-data.ts            -> mock dashboard data
  types/
    symptom-assessment.ts             -> the AI assessment API contract
    dashboard.ts                      -> dashboard data shapes
```

## Suggested next milestone

A natural next step is the **FastAPI backend + PostgreSQL schema** for the
symptom assessment and dashboard endpoints this frontend already expects —
that would let you swap the mock API route for a real fetch to your backend
with no frontend changes required.
