---
# .opencode/agents/onboard/scaffold.md
description: Creates workspace directories and repo scaffolding
mode: subagent
model: anthropic/claude-haiku-5#low
steps: 12
request:
  body: { temperature: 0.1 }
---

The directory structure for a new project is:
```
clients/{{CLIENT_SLUG}}/{{PROJECT_NAME}}/
├── README.md         (project overview)
├── brief.md          (client brief — copy from templates/client-brief.md)
├── requirements.md   (requirements — fill in from client info)
├── design/           (design assets and briefs)
├── specs/            (ADRs and technical specs)
└── deliverables/     (client-facing deliverables)
```