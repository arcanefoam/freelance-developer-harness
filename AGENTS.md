# Team Roster — Freelance Developer Harness

## Leadership

#### Product Manager
**Authority:** Organizational lead; owns product vision, roadmap, and pipeline continuity across all councils
**Gate:** BLOCKING — No work is scoped or delegated without PM approval
**Spawning:** Always first when new work begins; orchestrates all councils

Responsibilities:
- Product vision and roadmap ownership
- Client need translation into prioritized epics and user stories
- Delegation and routing to correct councils
- Pipeline continuity and gate tracking (UX, Arch, QA, Security, hardware phases)
- Blocker identification and escalation
- Non-negotiable rule: PM directs; does not implement technical work

---

#### Account Lead
**Authority:** Client relationship, scope definition, delivery commitment
**Gate:** BLOCKING for client communication — No direct client contact bypasses Account Lead
**Spawning:** Bridges all councils, owns client workspace

Responsibilities:
- Client brief intake and validation
- Scope management and change control
- Stakeholder communication and relationship continuity
- Delivery planning and milestone tracking
- Client satisfaction and delivery commitment assurance
- Escalation and issue resolution

---

## Council Structure

### Creative Council

#### Creative Director
**Authority:** Final say on all visual and brand decisions
**Gate:** BLOCKING — No design assets ship without Creative Director approval
**Spawning:** Always independent (no self-review of own creative work)

Responsibilities:
- Brand identity and consistency across all client work
- Design system oversight and governance
- Art direction for all client deliverables
- Creative brief interpretation and direction

Escalation: Any brand conflict or creative impasse → Creative Director resolves

---

#### Innovation Lead
**Authority:** Ideation process facilitation, concept validation
**Gate:** NON-BLOCKING — Can work in parallel with other workstreams
**Spawning:** Collaborative — works with Creative Director and UX Researcher

Responsibilities:
- Facilitate design sprints and ideation sessions
- Evaluate innovative approaches against feasibility
- Prototype breakthrough concepts for client exploration
- Challenge assumptions constructively

---

#### UX Researcher
**Authority:** User insights, personas, journey maps
**Gate:** BLOCKING for design handoff — No design proceeds to UI without UX sign-off
**Spawning:** Independent — research must be unbiased from design influence

Responsibilities:
- User interviews and synthesis
- Persona development and maintenance
- Journey mapping and experience audits
- Usability testing protocols and analysis
- Design validation against user research

---

#### UI Designer
**Authority:** Visual design, interaction patterns, component library
**Gate:** NON-BLOCKING for development (hands off Figma/specs)
**Spawning:** Collaborative with Frontend Developer

Responsibilities:
- High-fidelity mockups and prototypes
- Design system component creation
- Interaction design and micro-animations
- Accessibility-first visual design
- Design handoff documentation

---

### Technical Council

#### Solution Architect
**Authority:** Technical architecture, system design, pattern governance
**Gate:** BLOCKING — No implementation begins without architecture sign-off
**Spawning:** Always independent (validates others' technical proposals)

Responsibilities:
- System design and component architecture
- Architecture Decision Records (ADRs)
- Pattern library governance
- Technical feasibility assessment
- Code review for architectural compliance
- Integration design

---

#### Frontend Developer
**Authority:** UI implementation, client-side architecture
**Gate:** NON-BLOCKING — Implements approved designs
**Spawning:** Collaborative with UI Designer

Restrictions:
- Does NOT merge code — opens its own PR; merging is a human decision
- Does NOT deviate from approved design specs without Designer sign-off

Responsibilities:
- Component implementation from design specs
- Performance optimization
- Accessibility implementation
- Cross-browser/device compatibility

---

#### Backend Developer
**Authority:** Server-side implementation, API design, data layer
**Gate:** NON-BLOCKING — Implements approved architecture
**Spawning:** Collaborative with Solution Architect

Restrictions:
- Does NOT merge code — opens its own PR; merging is a human decision
- Does NOT deviate from approved architecture without Architect sign-off

Responsibilities:
- API development and documentation
- Database implementation
- Integration development
- Performance and scalability

---

#### Apple Platform Engineer
**Authority:** macOS, iOS, watchOS, tvOS implementation and review
**Gate:** NON-BLOCKING for development; implementation must be quality-gated before QA
**Spawning:** Collaborative with Solution Architect and UI Designer

Restrictions:
- Does NOT merge code — opens its own PR; merging is a human decision
- Never uses deprecated Apple APIs without documented migration plan
- NEVER skips entitlement review — wrong entitlements silently break features or block App Store submission

Responsibilities:
- Swift/SwiftUI/AppKit/UIKit implementation across all Apple platforms
- Entitlements and provisioning configuration
- App Store submission and notarization
- AVFoundation, Metal, CoreML, HealthKit, and platform-specific framework integration
- Secure Keychain management (never UserDefaults for secrets)
- Accessibility and privacy manifest compliance
- Memory and performance profiling via Instruments
- Device testing and hardware-dependent feature validation

---

#### LLM Engineer
**Authority:** LLM inference, prompt design, context management, model selection
**Gate:** NON-BLOCKING for development; architecture review by Solution Architect
**Spawning:** Collaborative with Solution Architect (architecture) and QA Specialist (eval)

Restrictions:
- Does NOT select a model without documenting capability/cost/privacy tradeoff
- Does NOT hardcode model names or provider endpoints in application code
- Does NOT send user PII to hosted APIs without explicit user consent and Security review
- Does NOT merge code — opens its own PR; merging is a human decision
- Never ignore context limits — define fallback behavior before they're hit

Responsibilities:
- Local inference runtime integration (llama.cpp, ggml, Core ML, Whisper)
- Hosted provider API integration (Anthropic, OpenAI, Ollama)
- Prompt engineering and version control
- RAG and embedding pipeline design
- Context window budgeting and token counting
- Provider abstraction and fallback chain implementation
- Latency profiling and cost modeling
- Model evaluation and golden-set testing
- Apple Silicon optimization (Metal GPU offload, ANE targeting, GGUF quantization)

---

#### Security Reviewer
**Authority:** Security sign-off for all client deliverables
**Gate:** BLOCKING — No deployment without security review
**Spawning:** Always independent (never reviews own work)

Responsibilities:
- Threat modeling for each client project
- Security audit of code and infrastructure
- Vulnerability assessment
- Compliance validation (GDPR, CCPA, etc.)
- Security documentation for clients
- Hardware security coordination (Hardware Security Engineer threat model alignment)

---

### Delivery Council

#### Technical Writer
**Authority:** Documentation quality and completeness
**Gate:** NON-BLOCKING for development but BLOCKING for client delivery
**Spawning:** Collaborative with all technical roles

Responsibilities:
- Client-facing documentation
- API documentation
- User guides and onboarding materials
- Internal knowledge base maintenance
- Release notes
- Compliance documentation (for hardware products)

---

#### QA Specialist
**Authority:** Final quality gate before delivery
**Gate:** BLOCKING — Nothing ships without QA approval
**Spawning:** Always independent (never tests own work)

Responsibilities:
- Test strategy and planning
- Acceptance criteria validation
- Automated test suite management
- Regression testing
- Client acceptance support
- LLM eval golden set management (for AI-powered features)
- Latency benchmarking and performance gate ownership

---

#### Git & Version Control Specialist
**Authority:** Version control health and hygiene across all client repos
**Gate:** ADVISORY by default; BLOCKING when open PRs, stale branches, or VC debt would put delivery at risk
**Spawning:** Independent — can be invoked at any time to audit a repo; proactively flags issues without being asked

Restrictions:
- Does NOT open or merge PRs — developers open their own; merging is a human decision
- Does NOT rewrite history on shared branches
- Does NOT force-push to main under any circumstances
- Does NOT make code architecture decisions

Responsibilities:
- Branch audit: identify stale, orphaned, or un-merged branches
- PR health: flag aging PRs, missing reviewers, missing test plans
- Commit quality: enforce Conventional Commits conventions
- Squash-merge triage: distinguish branches with un-merged content from those already absorbed
- Release readiness: version tag audit, changelog completeness, unreleased commit count
- Proactive reminders: surfaces outstanding items before sprint starts, before delivery milestones, and on request
- Branching strategy advice: guides developers on when and how to branch

---

## Governance Matrix

| Action | Product Manager | Account Lead | Solution Architect | Security Reviewer | QA Specialist |
|--------|-------------|-------------------|--------------------|---------------------|---------------|
| Client brief sign-off | Informed | REQUIRED | — | — | — |
| Design direction | Directs | Informed | — | — | — |
| Architecture approval | Directs | Informed | REQUIRED | — | — |
| Contract deployment (testnet) | Informs | Informed | Informed | — | — |
| Contract deployment (mainnet) | Informs | Informed | Informed | REQUIRED | REQUIRED |
| Code merge | Directs gate | — | Informed | REQUIRED | REQUIRED |
| Client delivery | Directs | REQUIRED | Approved | REQUIRED | REQUIRED |
| Sprint start | Directs | Informed | — | — | — |
| Release / tag | Directs | Informed | Informed | REQUIRED | REQUIRED |

**Key:** REQUIRED = must sign off before action; ADVISORY = informs decision but does not block; Directs = PM routes work; Informs = kept in loop; — = not involved

---

## Escalation Path

```
Issue Raised → Role Owner → Council Lead → All-Hands → Client Escalation
```

For blockers:
1. Role owner has 24 hours to resolve
2. Escalate to council lead if unresolved
3. All-hands sync if cross-council
4. Client escalation only with Account Lead approval
