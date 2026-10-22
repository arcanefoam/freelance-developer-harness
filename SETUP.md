# Getting Started

The Freelance Developer Harness is a AI Agent operating system for running a structured agency team across multiple 
client projects. It gives you specialized roles (architects, designers, developers, QA, security) organized into three
councils, enforced quality gates, and an automated PM-driven workflow.

## Prerequisites

The Agent uses the Azure CLI to get the state of work items related to the project.

```bash
# Install Azure DevOps extension (one-time)
az extension add --name azure-devops

# Login to Azure to save credentials, authentication is done via browser.
az login

# Set default organization and project
az devops configure --defaults organization=https://dev.azure.com/<org> project=<project>

# Verify authentication
az devops user show --output table
```

## Quick start

```bash
git clone <this-repo> harness
cd harness
bash scripts/setup.sh
```

The setup wizard will ask for:
- Your studio name
- Where your project repos live on disk
- API keys (Anthropic, Google — optional)
- GitHub token (optional)

Then open Claude Code in this directory and follow the prompts at the end of setup.

## What setup does

- Writes `.env` from `.env.template` with your values
- Substitutes your studio name into `AGENT.md`
- Prints exact next steps

## After setup

```bash
# In Claude Code:
/onboard-client acme-corp        # creates clients/acme-corp/ workspace
/use-client acme-corp            # locks this session to acme-corp
/pm on                           # enables automatic PM routing
/kickoff                         # run full project kickoff
```

## Directory layout

```
harness/                  ← this repo (docs, specs, configs only)
clients/
  _template/              ← blueprint for new clients
  example-client/         ← example of a populated workspace
  your-client/            ← created by /onboard-client
    brief.md
    requirements.md
    projects/
      your-project/
        specs/            ← ADRs, PM summaries
        design/           ← design assets
        qa/               ← test reports
        deliverables/     ← client-facing outputs

../your-project/          ← source code lives HERE (sibling repo)
```

The harness holds intent (specs, briefs, deliverables). Source code lives in separate repos alongside it.

## Full documentation

- `README.md` — architecture, diagrams, how pieces connect
- `AGENT.md` — complete operating model (loaded automatically by Claude Code)
- `AGENTS.md` — team roster, authorities, governance matrix
- `docs/onboarding.md` — team guide
- `docs/workflows/` — detailed per-stage workflow docs
