---
# .opencode/commands/onboard-client.md
description: Onboard a new client project into the harness
agent: onboard/plan
subagent: false
---

Onboard client **$1** into the harness.

Optional slug override: `$2` — if empty, derive the slug from $1 using the shared slug convention defined in the project instructions.

For the rest of this workflow, the canonical slug is: `<slug>`.

IMPORTANT:
- Always use this exact slug.
- Never derive it again.
- Save it in `.context/client.md`
- Pass it explicitly to every subagent.

## Repo state

!`git status --short; echo '--- clients/ ---'; ls -1 clients/ 2>/dev/null; echo '--- root ---'; ls -1`

## Rules

- `clients/<slug>/README.md` is the only client record that matters. Everything else is scratch.
- Never put secret values in the README — pointers only. Real values go in `clients/<slug>/.env.local`.
- Do not read project source yourself. Delegate to `onboard/recon`.
- Ask, don't guess. Unresolved items belong in `## Open questions`, not smoothed into prose.
- Run phases in order. Do not advance past a phase until its checklist passes.
- Rewrite `clients/<slug>/.onboard-state.json` after every phase.

## Phases

Print the phase list before starting so I know what's coming, then run the checklist in your
system prompt.

If `clients/<slug>/` already exists, stop and ask: resume, restart from scratch, work on a client project?

## Finish

1. `onboard/verify` must return PASS. Fix the gaps and re-run until PASS.
2. Add the row to `clients/INDEX.md` and to the Clients table in `AGENT.md` with status `onboarding`.
3. Print the Account Lead summary.

**GATE:** the client stays `status: draft`. No creative or technical work starts until the Account
Lead replies `/confirm-client <slug>`.