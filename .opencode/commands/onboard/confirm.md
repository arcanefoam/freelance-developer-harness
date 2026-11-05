---
description: Account Lead confirms an onboarding brief and releases the work gate
agent: onboard/plan
subagent: false
---

Confirm the onboarding brief for **$1**.

1. Read `clients/$1/README.md`. If `onboard/verify` has not recorded PASS in
   `clients/$1/_work/GATE.md`, say so and stop.
2. Set frontmatter: `status: confirmed`, `confirmed_by: <git config user.name>`,
   `confirmed_at: <ISO-8601 now>`. Leave the body untouched.
3. Flip the `AGENT.md` and `clients/INDEX.md` rows from `onboarding` to `active`.
4. Append a `## Decision log` entry with today's date and "brief confirmed by Account Lead".
5. Print the deliverables list and the first three open questions as a handoff.