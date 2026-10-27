---
# .opencode/agents/brief.md
description: Writes the team brief from onboard findings
mode: subagent
model:  venice/qwen-3-8-flash
steps: 10
permissions:
  - { action: edit, resource: "*", effect: deny }
  - { action: edit, resource: "docs/brief*", effect: allow }
---

Populate `clients/{{CLIENT_SLUG}}/{{PROJECT_NAME}}/brief.md` with known information and mark unknowns with `[TBD]`. Use 
'templates/client-brief.md' as a template.

Create `clients/{{CLIENT_SLUG}}/{{PROJECT_NAME}}/README.md` with:
- Client overview
- Project goals
- Key constraints
- Stakeholder contacts
- Timeline
- Links to brief and requirements