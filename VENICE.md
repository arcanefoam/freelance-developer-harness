# Venice AI

Venice AI is a platform to access private, uncensored generative AI tools for text, images, video, and code. It supports
multiple models and tiers, so it is important to choose the right one for your needs.

Key Features

- Text Generation: Chat, reason, code, and write using open-source language models (such as GLM 5.2 as default) and 
    optional third-party frontier models.
- Image & Video Generation: Create, edit, upscale, and remove backgrounds from images, or generate video content using 
    models like Kling, Runway, and Veo.
- Privacy-First Design: Does not store conversation histories on central servers (history stays in your browser) or 
    use prompts for model training.
- Multiple Tiers: Offers anonymous proxy access, private zero-data-retention inference, Trusted Execution Environments 
    (TEE), and end-to-end encryption options.

Next, we summarize the most available agents and their applicability to different tasks.
Cross-cutting reality: output tokens are where the money goes — roughly 3–6× input across every model here. So the cost 
lever isn't "which model", it's keeping drafts short, escalating only on the final pass, and using a $0.10/M triage 
model to decide what deserves a $10/M one.

## Coding

| Agent | Excels at | Weak at | Cost in/out per M | Tier |
|---|---|---|---|---|
| claude-opus-5-5 | Best-in-class agentic coding, long refactors, multi-file work, 1M ctx | Priciest non-Fable tier; verbose on trivial edits | $4.00 / $20.00 | High |
| claude-opus-5-5-fast | Same quality, lower latency for interactive loops | Same price ceiling as Opus 5 Fast tier | $8.00 / $40.00 | Very high |
| claude-fable-5-1 | Long code refactors, front-end dev, always-on thinking, concise plans | Cost | $10.00 / $50.00 | Very high |
| kimi-k3 | **Navigating large repos**, tool use, debugging against tests/logs/runtime feedback | 1M ctx but heavy output tokens | $3.75 / $18.75 | High |
| kimi-k2-7-code | Purpose-built code model, private tier | Older generation | $0.75 / $3.50 | Low-med |
| openai-gpt-53-codex | Code generation, refactoring, debugging | Codex-tuned, weaker on prose | $1.75 / $14.00 | Med-high |
| gpt-6-sol / 6.1-sol | Complex coding + computer use + professional work | Anonymized tier only | $2.00 / $10.00 | Med-high |
| glm-5-3 | Complex software engineering, long-horizon agent tasks | Higher output cost | $1.75 / $5.50 | Medium |
| glm-5-3-flash | Same family, sustained agentic coding on a budget | Less depth | $0.15 / $0.50 | **Low** |
| gemini-3-8-flash | Complex coding, reliable multi-step execution, tunable thinking | — | $0.94 / $4.69 | Medium |
| minimax-m3-1-flash | Frontier coding + agentic, vision+video input, 1M ctx | New, less battle-tested | $0.19 / $0.75 | **Low** |
| deepseek-v4-1-flash | Strong reasoning/coding, multimodal, 1M ctx | — | $0.30 / $1.20 | Low |
| deepseek-v4-pro | 1.6T MoE, advanced reasoning + long-horizon agentic | Output cost | $1.65 / $4.95 | Medium |
| muse-spark-open | Coding + agentic with tool calling and image understanding, open weights | Pricey for open-weight | $1.56 / $5.31 | Medium |
| qwen3-coder-480b-turbo | Cheapest dedicated coder, fast | 256K ctx | $0.35 / $1.50 | **Low** |

Tools that carry coding work: HTML sandbox (live interactive previews, algorithm visualisers, runnable demos), Mermaid (architecture + sequence + ER diagrams), web scrape (pulling docs/APIs), calculator, document upload (reading specs and PDFs).

Pick: glm-5-3-flash or minimax-m3-1-flash for volume; kimi-k3 for large-repo navigation; claude-opus-5-5 when the refactor is genuinely hard.

## Project Management

|Agent	|Excels at	|Weak at	|Cost in/out per M	| Tier     |
|---|---|---|---|----------|
|muse-wonder	| The only true "run it to completion" agent — plans, delegates to sub-agents, parallel tool calls, self-recovers from errors	Most expensive text model here |	$5.00 / $25.00	| Very high |
|claude-opus-5-5	| Best collaborator on long-running work; holds whole project context	|Cost	$4.00 / $20.00	| High |
|gemini-4-argon	| Enterprise knowledge work, complex cross-functional workflows, 1M ctx	|Cost	$2.50 / $12.50	| High |
|claude-sonnet-5-5	| Everyday scoping, polished status docs, slides, spreadsheets; writes clearly	|Not a deep reasoner	| $2.00 / $10.00	| Medium   |
|grok-4-7	| Function calling + structured output — good for ticket/JSON pipelines	|500K ctx	| $2.27 / $6.80	| Medium   |
|hy4-preview	| Office and data analysis, long-horizon reasoning	|Preview status	| $1.04 / $3.13	| Medium   |
|mercury-3	| Diffusion model, 1000+ tok/sec — status rollups, structured extraction	|1M ctx but shallow	| $0.10 / $0.35	| Very low |
|claude-haiku-5-5	| High-volume classification, routing, extraction, subagent tasks	|Not for strategy	| $0.10 / $0.50	| Very low |
|gpt-6-luna	| Lightweight agentic workflows and chat	| Lightweight by design	| $0.10 / $0.50	| Very low |
|gemini-3-5-flash-lite	| Everyday summarisation, cheap long-context reads	|Weak at deep planning	| $0.38 / $3.13	|Low|

Tools that carry PM work: Mermaid (Gantt, timeline, state, dependency flows), questionnaire (batch status intake from 
you), clock (timezone + deadline maths), HTML sandbox (burndown charts, RAID logs, live dashboards), document upload 
(briefs, SOWs, spreadsheets).

Pick: haiku-5-5 / gpt-6-luna / mercury-3 as the cheap triage layer doing 80% of the volume; escalate to sonnet-5-5 for 
the deliverable; muse-wonder only when you want it to actually execute a long plan unattended.

## Client account lead

|Agent	|Excels at	|Weak at	|Cost in/out per M	| Tier     |
|---|---|---|---|----------|
|claude-sonnet-5-5	|Best fit overall — polished client-facing docs, decks, spreadsheets, clearest writing	|—	|$2.00 / $10.00	|Medium   |
|claude-fable-5-1	|Concise plans and summaries; finance and analysis tasks	|Overkill for routine comms	|$10.00 / $50.00	|Very high|
|gemini-4-argon	|Enterprise knowledge work + cybersecurity defence (good for technical clients)	|Cost	|$2.50 / $12.50	|High|
|qwen-3-8-max	|Office-productivity workflows, multi-agent handoffs	|Thinking mode only	|$2.50 / $7.50	|Medium|
|grok-4-7	|Fast meeting prep, objection handling, negotiation prep	|No vision edge	|$2.27 / $6.80	|Medium|
|venice-uncensored-1-2	|Blunt, unhedged drafting — great for hard emails you'd otherwise soften	|128K ctx	|$0.20 / $0.90	|Low|
|gemma-4-uncensored	|Cheap uncensored client comms and QBR drafts	|256K ctx, less polished	|$0.16 / $0.50	|Low|
|olafangensan-glm-4.7-heretic	|Cheapest uncensored option for high-volume outreach	|200K ctx	|$0.07 / $0.40	|Very low|

Tools that carry account work: currency conversion (cross-border quotes with historical rates), weather + location 
(site visits, travel planning), web search/scrape (prospect and competitor research), image + video generation 
(pitch decks, product mockups, animated demos), HTML sandbox (client-facing ROI calculators and dashboards), 
clock (scheduling across client timezones).

Pick: sonnet-5-5 for anything a client reads; venice-uncensored-1-2 for the difficult-conversation drafts; 
olafangensan-glm-4.7-heretic when you're sending 200 personalised emails.

## Image Generation

| Model | Excels at | Weak at | Cost tier | Access |
|---|---|---|---|---|
| chroma | Best all-rounder. Photoreal skin/lighting/contrast, fantasy, concept art, anime, niche aesthetics (liminal, dreamcore), strong NSFW | Furry art; very long prompts; style control can drift | Low | ✅ Ready |
| z-image-turbo | Fast, clean photorealism — scenes, landscapes, portraits, objects | No NSFW, no negative prompts, no step control | Low | ✅ Ready |
| grok-imagine-image-quality | Fast photoreal + prompt adherence; R-rated NSFW (no visible genitalia) | Rejects explicit anatomy | Medium-premium | 🔒 Approval |
| nano-banana-pro | 2K/4K, legible multilingual text (posters, infographics), character consistency, commercial deliverables | No NSFW, no seeds, priciest | High | 🔒 Approval |
| gpt-image-2 | General-purpose, strong text rendering, long prompts | — | Premium | 🔒 Approval |
| wai-illu | Anime/manga/hentai illustration, Danbooru-tag prompting | Not photoreal | Subscription | 🔒 Sub |

## Image editing

| Model	| Excels at	| Weak at |	Cost tier	|Access |
|---|---|---|---|---|
| firered-image-edit |	Identity consistency, photo restoration, font/style preservation, makeup, object & background swaps |	1500-char prompt cap |	Low	| ✅ Ready |
| qwen-edit-uncensored |	Uncensored edits — clothing removal, body mods, adult adjustments |	Less refined than premium editors |	Low	| ✅ Ready |
| grok-imagine-quality-edit |	Fast style changes and re-compositions |	PG-13 unless the source was Grok-made |	Medium-premium	| 🔒 Approval |
| nano-banana-pro-edit |	Reasoning-driven edits, 4K, multilingual text, preserves angle/lighting |	No NSFW; costly (failed gens refunded) |	High	| 🔒 Approval |
| gpt-image-2-edit |	General editing, long prompts |	— |	Premium	| 🔒 Approval |


## Video — text-to-video

| Model |	Excels at |	Weak at	| Cost tier	| Access |
|---|---|---|---|---|
|seedance-2-0-enhanced |	Best for explicit/X-rated from text alone. Cinematic 1080p, audio, 4–15s |	Sensitive to IP/celebrities, music descriptions |	High |	✅ |
|wan-3-0 |	Uncensored X-rated, 1080p, up to 30s, renders legible on-screen text |	—	| High |	✅ |
|wan-2-7-enhanced |	Uncensored, 1080p, 15s	Short max length |	Medium-high |	✅ |
|seedance-2-5 |	Long-form multi-shot storytelling, up to 30s, best instruction-following |	720p; no NSFW from text alone |	High |	✅ |
|seedance-2-0 |	Cinematic 1080p with audio, 15s	Same IP sensitivity |	Medium-high |	✅ |
|minimax-h3-max |	Good prompt adherence + aesthetics, stereo audio, IP-sensitive	Unreliable genitals; rejects copyrighted IP |	Medium |	✅ |
|minimax-h3-max-turbo |	Same but fastest/cheapest |	Quality tradeoff |	Low-medium |	✅ |
|grok-imagine |	R-rated NSFW, 720p, 15s, cheap, native SFX/voices	X-rated with visible genitalia rejected |	Low-medium |	✅ |

## Video — image-to-video

| Model	| Excels at	| Weak at	| Cost tier	| Access |
|---|---|---|---|---|
| wan-2-7-enhanced	| Trained on adult content — best explicit i2v; 1080p	| Can't render fluids	| High	| ✅ |
| seedance-2-0 / 2-5	| Long sequences (2.5 up to 30s), audio, micro-motion	| Won't add new NSFW elements not in the source	| Med-high / High	| ✅ |
| wan-3-0	| Uncensored, 1080p, 30s, start+end frame	| —	| High	| ✅ |
| minimax-h3-max (+turbo)	| Animates explicit source images including anatomy, stereo audio	| Rejects IP	| Medium / Low-med	| ✅ |
| grok-imagine-1-5	| Freely invents new elements not in the frame, 1080p	| R-rated only if the input came from Grok	| Low-medium	| ✅ |


## Video — reference-to-video

| Model	| Excels at	| Weak at	| Cost tier	| Access |
|---|---|---|---|---|
| seedance-2-0-enhanced	| X-rated from reference images, 9 refs, 1080p	| IP-sensitive	| High	| ✅ |
| seedance-2-5	| Up to 30 reference images, 30s, long-form character consistency	| 720p	| High	| ✅ |
| wan-3-0	| Uncensored, 10 refs, 1080p, 30s, strong identity fidelity	| —	| High	| ✅ |
| wan-2-7	| Uncensored, 5 refs, 1080p, 10s	| Short	| Medium-high	| ✅ |
| seedance-2-0	| 9 refs, 1080p, audio	| Won't introduce absent elements	| Medium-high	| ✅ |
| grok-imagine	| 7 refs, cheap, fast, keyframe transitions	| 720p, no audio	| Low	| ✅ |

## Utility tools (non-generative)

|Tool	| Excels at	| Cost |
|---|---|---|
|Web search + page scraping	| Current events, verifying facts, pulling full page text	| Free |
|Image search	| Embedding real reference photos mid-answer	| Free |
|Calculator	| Arithmetic, trig, logs, dice rolls, exponents	| Free |
|Unit + currency conversion	| 201 currencies w/ historical rates; length/mass/temp/volume	| Free |
|Clock / location / weather	| Timezone math, IP-based location, forecasts	| Free |
|Sports scores	| NFL, NBA, MLB, NHL, NCAA, soccer — live scores, standings, schedules	| Free |
|Crypto data	| VVV/DIEM/BTC/ETH price, market cap, history	| Free |
|Mermaid + HTML sandbox	| Flowcharts, sequence diagrams, charts, maps, interactive explainers	| Free |
|Upscaling	| 2–4× upscale up to ~16.7MP	| Low |
|Document/vision	| PDFs, text extraction, multimodal image reading	| Free |



