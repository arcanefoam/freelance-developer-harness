# {{STUDIO_NAME}} — Freelance Developer Harness

A multi-client agency harness. The **Product Manager** leads: all work is scoped, routed, and gated through the PM. 
Specialists do the work; the PM does not implement.

Full role authorities, RACI, and gate matrix: `AGENTS.md`. Per-role trigger conditions live in each agent's own 
`description` — do not restate them here.

## Routing

Four councils, all directed by the PM. Membership (the agent files themselves say *when* to pick each one):

| Council | Members                                                                                                                                                                             |
|---|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Leadership | `product-manager`, `account-lead`                                                                                                                                                   |
| Creative | `creative-director`, `innovation-lead`, `ux-researcher`, `ui-designer`                                                                                                              |
| Technical | `solution-architect`, `frontend-developer`, `backend-developer`, `apple-platform-engineer`, `android-platform-engineer`, `llm-engineer`, `blockchain-engineer`, `security-reviewer` |
| Delivery | `tech-writer`, `qa-specialist`, `azure-vc-specialist`                                                                                                                               |

On intake the PM classifies the project, which selects the pipeline:

- **Software** (API, UI, app, web, database, mobile) → standard pipeline

```
Client need → Account Lead (brief) → PM (epics + delegation)
  → Creative (UX validation gate) → Technical (arch sign-off, build)
  → Delivery (QA gate, security sign-off, docs) → Ship
```

## Gates — stop-the-line

A blocked gate halts the pipeline. The PM surfaces the blocker; it is not routed around silently.

1. Signed brief before any client work — Account Lead confirms
2. PM approval before anything is scoped or delegated
3. Architecture sign-off before implementation — Solution Architect
4. UX validation before design handoff — UX Researcher
5. QA approval before delivery — QA Specialist
6. Security review before anything public-facing — Security Reviewer

For small engagements, `tech-writer` may collapse into the developer roles, and `account-lead` into the PM.

## Where things go

- Client docs (brief, requirements): `clients/<client>/` — never source code
- Project specs, deliverables, design assets: `clients/<client>/projects/<project>/`
- ADRs and PM summaries: `.../specs/`
- Deliverables: `.../deliverables/`
- Sprints: `.../sprints/sprint-NNN.md`, with `CURRENT` a **symlink** to the active one
- Reusable patterns: `patterns/` — never client-specific code
- Client source code: its own private repo at `$SOURCE_ROOT_BASE/<project>/`, **never inside this harness**

Active clients are the directories under `clients/`. Onboard with `/onboard-client <slug>`.

## Traps

- **No session lock = no scoping.** The client boundary guard and the context injection both key off
    `.agent/sessions/<SESSION_ID>.client`, written by `/use-client`. Without it there is no active client and the guard 
    allows every path. Run `/use-client` before touching client work.
- **`.env` missing is silent.** `SOURCE_ROOT_BASE` falls back to the harness's *parent directory*, so source reads land 
    somewhere plausible but wrong. Copy `.env.template` to `.env` and run `bash scripts/setup.sh`.
- **Sprint files never live in `specs/`.** `specs/` is ADRs, PM summaries, architecture docs only. `/sprint-plan` picks
    the next number and repoints `CURRENT`; `/retro` closes `CURRENT` in place and writes the retro into the same file 
    — there is no separate retro file.
- **`CURRENT` is a symlink, not a copy.** Writing a regular file there breaks `/retro`.
- **Search before building.** Use `/graphify`, then `patterns/`, then the project's `specs/`, then `templates/`.
    Validate anything net-new with `solution-architect` first.

## Version control

Developers open their own PRs. `azure-vc-specialist` advises on branch naming, commit hygiene, and PR timing, and raises 
blocking flags for stale branches or unreviewed PRs — it does not open or merge PRs. Merging is a human decision. 
Never commit directly to `main`.
