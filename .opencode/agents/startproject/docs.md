---
# .opencode/agents/docs.md
description: Writes the documentation set for a new client project
mode: subagent
model: venice/qwen-3-8-flash
steps: 10
permissions:
  - action: "edit"
    resource: "*"
    effect: deny
---