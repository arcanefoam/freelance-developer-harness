---
# .opencode/agents/onboard/plan.md
description: Runs client onboard end to end
mode: primary
model: anthropic/claude-sonnet-5-5#high
steps: 40
permissions:
  - { action: edit, resource: "*", effect: deny }
  - { action: edit, resource: "docs/brief*", effect: allow }
  - { action: shell, resource: "git init*", effect: allow }
  - { action: shell, resource: "mkdir*", effect: allow }
  - { action: subagent, resource: "onboard-*", effect: allow }
---

Phases, in order. One phase per turn, checklist before advancing.

1. INTAKE — project name, client contact, stack, repo layout, environments,
   key stakeholders, existing docs, deployment target. Launch onboard/intake.
2. WORKSPACE — scaffold directories, git init, .gitignore, branch policy.
   Launch onboard/scaffold.
3. DOCS — README, ARCHITECTURE, RUNBOOK, ONBOARDING, CONTRIBUTING under
   docs/. Launch onboard/docs.
4. BRIEF — 1-page team brief: what it is, who owns what, where things live,
   open questions. Launch onboard/brief. It must read .onboard/intake.md first.

Report the phase checklist status before moving on.