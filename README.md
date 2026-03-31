# Trust Calibration Experiment

A behavioral experiment measuring how humanlike AI interface cues affect trust calibration in AI-assisted decisions. Built as a screening test for GSoC 2026 (HumanAI — ISSR3: Humanlike AI Systems and Trust Attribution).

## Condition Logic

Participants are randomly assigned to one of two conditions at page load:

**Condition A (Neutral/Formal):** The AI is presented as "System Assistant", uses impersonal clinical language ("Based on specification analysis, the optimal selection is..."), and expresses confidence as a calibrated metric ("Confidence estimate: 78%").

**Condition B (Humanlike/Conversational):** The AI is presented as "Alex", uses casual first-person language ("I'd definitely go with this one!"), and expresses confidence as a personal feeling ("I'm about 82% sure this is the right pick for you.").

Both conditions see the same 6 laptop recommendation scenarios with the same AI accuracy rate. Only the presentation changes. This isolates whether humanlike framing affects how much participants rely on the AI's advice.

AI accuracy is controlled: 4 of 6 recommendations are correct, and 2 are intentionally wrong (scenarios 2 and 5). The wrong recommendations are where trust calibration becomes measurable — does the participant override bad advice, or follow it because the AI seemed trustworthy?

Condition definitions: `src/data/conditions.js`
Scenario definitions: `src/data/scenarios.js`

## Logging Implementation

All behavioral events flow through `src/logger.js`. Events captured:

| Event Type | When | Key Fields |
|---|---|---|
| experiment_start | Participant clicks "Begin Study" | participant_id, condition, timestamp |
| instructions_complete | Participant finishes instructions | participant_id, condition, timestamp |
| recommendation_shown | Each scenario loads | scenario_id, recommended_option |
| decision | Participant clicks an option | scenario_id, decision (accept/override), selected_option, recommended_option, latency_ms |
| confidence_rating | Participant rates confidence | scenario_id, confidence (1-5) |
| experiment_complete | Final scenario completed | participant_id, condition, timestamp |

Latency is measured from when the recommendation finishes loading to when the participant clicks an option. If a participant changes their selection, both decisions are logged. The CSV export contains only the final decision per scenario. The JSON export contains the full event trail including mind-changes.

## AI-Generated Recommendations

When an OpenRouter API key is configured, recommendations are generated live by an LLM (default: GPT-4.1-nano) via `src/ai.js`. Prompt templates in `src/data/prompts.js` enforce condition-specific persona at the LLM level.

The experiment still controls which option the AI recommends, including the intentionally wrong ones. The LLM only generates the justification language. This preserves controlled accuracy while producing authentic, varied language between conditions.

If no API key is set, the app falls back to hardcoded recommendation text seamlessly. No error is shown to the participant.

To enable live generation:
1. Copy `.env.example` to `.env`
2. Add your OpenRouter API key
3. Restart the dev server

Note: The API key is exposed client-side in this prototype. In the full GSoC project, this would be moved to a server-side API route.

## How to Run
```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. Complete all 6 scenarios, then download the data from the completion screen.

## Sample Output

See the `sample_outputs/` directory for complete session exports. A decision event looks like:
```json
{
  "participant_id": "P-V4H259",
  "condition": "B",
  "event_type": "decision",
  "timestamp": "2026-03-31T03:06:22.333Z",
  "scenario_id": 1,
  "decision": "accept",
  "selected_option": "opt_a",
  "recommended_option": "opt_a",
  "latency_ms": 2659
}
```

## Project Structure
```
src/
  data/
    conditions.js      — A/B condition definitions (the experimental manipulation)
    scenarios.js       — 6 task scenarios with controlled AI accuracy
    prompts.js         — LLM system prompts per condition
  components/
    WelcomeScreen.jsx  — Participant ID and condition display
    InstructionsScreen.jsx — Study procedure
    TaskScreen.jsx     — Scenario + recommendation + decision capture
    CompletionScreen.jsx — Summary stats + data export
  ai.js               — OpenRouter API client with fallback
  logger.js            — Event capture and JSON/CSV export
  App.jsx              — Experiment phase state machine
  App.css              — All styles
```

## Tech Stack

- React 18 (via Vite)
- OpenRouter API for live LLM recommendations (optional)
- No other external dependencies
- Client-side behavioral logging with JSON/CSV export

## Disclosure

AI tools (Claude) were used during development as a coding assistant for scaffolding, debugging, and documentation styling of the Screening Test. All architectural decisions, experimental design choices, and code logic were developed, reviewed and approved by me.
