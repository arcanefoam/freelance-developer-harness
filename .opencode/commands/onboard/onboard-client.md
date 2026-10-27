---
# .opencode/commands/onboard-client.md
description: Onboard a new client project into the harness
agent: onboard/plan
subagent: false
---

Onboard client **$1** into the harness.

Optional slug override: `$2` — if empty, derive it with the rule in your system prompt.

## Repo state

!`git status --short; echo '--- clients/ ---'; ls -1 clients/ 2>/dev/null; echo '--- root ---'; ls -1`

## Rules

- `clients/{{CLIENT_SLUG}}/README.md` is the only client record that matters. Everything else is scratch.
- Never put secret values in the README — pointers only. Real values go in `clients/{{CLIENT_SLUG}}/.env.local`.
- Do not read project source yourself. Delegate to `onboard/recon`.
- Ask, don't guess. Unresolved items belong in `## Open questions`, not smoothed into prose.
- Run phases in order. Do not advance past a phase until its checklist passes.
- Rewrite `clients/{{CLIENT_SLUG}}/.onboard-state.json` after every phase.

## Phases

Print the phase list before starting so I know what's coming, then run the checklist in your
system prompt.

If `clients/{{CLIENT_SLUG}}/` already exists, stop and ask: resume, restart from scratch, work on a client project?

## Finish

1. `onboard/verify` must return PASS. Fix the gaps and re-run until PASS.
2. Add the row to `clients/INDEX.md` and to the Clients table in `AGENT.md` with status `onboarding`.
3. Print the Account Lead summary.

**GATE:** the client stays `status: draft`. No creative or technical work starts until the Account
Lead replies `/confirm-client {{CLIENT_SLUG}}`.