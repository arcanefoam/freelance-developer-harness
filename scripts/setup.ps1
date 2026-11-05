#!/usr/bin/env pwsh
# =============================================================================
# Freelance Developer Harness — Setup Wizard
# Walks you through initial configuration on first run.
# Safe to re-run: prompts show current values as defaults.
# =============================================================================

$ErrorActionPreference = "Stop"

$HARNESS_DIR = Split-Path -Parent $PSScriptRoot
$ENV_FILE = Join-Path $HARNESS_DIR ".env"
$ENV_TEMPLATE = Join-Path $HARNESS_DIR ".env.template"
$AGENT_MD = Join-Path $HARNESS_DIR "AGENT.md"

# ── Colours ──────────────────────────────────────────────────────────────────
function Write-Header($text) {
    Write-Host "`n$text" -ForegroundColor Cyan -NoNewline
    Write-Host ""
}

function Write-Ok($text) {
    Write-Host "  " -NoNewline
    Write-Host "✓" -ForegroundColor Green -NoNewline
    Write-Host " $text"
}

function Write-Warn($text) {
    Write-Host "  " -NoNewline
    Write-Host "!" -ForegroundColor Yellow -NoNewline
    Write-Host " $text"
}

function Write-Ask($text) {
    Write-Host "  $text " -NoNewline
}

# ── Load existing .env values as defaults ────────────────────────────────────
function Get-EnvVar($key) {
    if (Test-Path $ENV_FILE) {
        $line = Get-Content $ENV_FILE | Where-Object { $_ -match "^$key=" } | Select-Object -First 1
        if ($line) {
            return ($line -split '=', 2)[1] -replace '"', ''
        }
    }
    return ""
}

# ── Prompt helper: shows default, returns value ───────────────────────────────
function Read-Prompt($label, $default) {
    if ($default) {
        Write-Ask "${label} [${default}]:"
    } else {
        Write-Ask "${label}:"
    }
    $value = Read-Host
    if ([string]::IsNullOrWhiteSpace($value)) {
        return $default
    }
    return $value
}

# ── Secret prompt helper: hidden input, shows whether a default exists ───────
function Read-SecretPrompt($label, $default) {
    if ($default) {
        Write-Ask "${label} [saved, Enter to keep]:"
    } else {
        Write-Ask "${label}:"
    }
    $secure = Read-Host -AsSecureString
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
        $value = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    }
    if ([string]::IsNullOrWhiteSpace($value)) {
        return $default
    }
    return $value
}

# ── Start ─────────────────────────────────────────────────────────────────────
Clear-Host
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════╗"
Write-Host "║     Freelance Developer Harness — Setup          ║"
Write-Host "╚══════════════════════════════════════════════════╝"
Write-Host ""
Write-Host "  This wizard configures your harness for first use."
Write-Host "  Press Enter to accept a default value."

# ── Guard: warn if .env already exists ───────────────────────────────────────
if (Test-Path $ENV_FILE) {
    Write-Warn ".env already exists. Re-running will update values you change."
    Write-Warn "Press Ctrl-C to abort, or Enter to continue."
    Read-Host | Out-Null
}

# ── Step 1: Studio identity ───────────────────────────────────────────────────
Write-Header "Step 1 — Studio identity"
Write-Host "  This name appears in AGENT.md and agent context."

$current_studio = Get-EnvVar "STUDIO_NAME"
$STUDIO_NAME = Read-Prompt "Studio name" $(if ($current_studio) { $current_studio } else { "My Studio" })

$current_slug = Get-EnvVar "STUDIO_SLUG"
$default_slug = $STUDIO_NAME.ToLower() -replace '[^a-z0-9-]', '-' -replace '--+', '-' -replace '^-|-$', ''
$STUDIO_SLUG = Read-Prompt "Studio slug (url-safe)" $(if ($current_slug) { $current_slug } else { $default_slug })

$current_email = Get-EnvVar "STUDIO_EMAIL"
$STUDIO_EMAIL = Read-Prompt "Studio email" $(if ($current_email) { $current_email } else { "hello@yourstudio.com" })

# ── Step 2: Source root ───────────────────────────────────────────────────────
Write-Header "Step 2 — Source root"
Write-Host "  Where do your project repos live on disk?"
Write-Host "  Convention: all project repos are siblings of this harness directory."
Write-Host "  Example: if harness is at ~/projects/harness, repos at ~/projects/<slug>/"

$default_source_root = Split-Path -Parent $HARNESS_DIR
$current_source_root = Get-EnvVar "SOURCE_ROOT_BASE"
$SOURCE_ROOT_BASE = Read-Prompt "Source root" $(if ($current_source_root) { $current_source_root } else { $default_source_root })

# ── Step 3: AI providers ──────────────────────────────────────────────────────
Write-Header "Step 3 — AI providers (optional, leave blank to skip)"

$current_venice = Get-EnvVar "VENICE_API_KEY"
$VENICE_API_KEY = Read-Prompt "Venice API key" $current_venice

# ── Step 4: Project management ───────────────────────────────────────────────────
Write-Header "Step 4 — Project management (optional)"
Write-Host "  Input for the PAT is hidden, like a password."

$current_az_org = Get-EnvVar "AZURE_ORG"
$AZURE_ORG = Read-Prompt "Azure organization (e.g. https://dev.azure.com/myorg)" $current_az_org

$current_az_pat = Get-EnvVar "AZURE_ORG_PAT"
$AZURE_ORG_PAT = Read-SecretPrompt "Azure personal access token (hidden)" $current_az_pat

# ── Write .env ────────────────────────────────────────────────────────────────
Write-Header "Writing .env..."

# Start from template, substitute known values
Copy-Item $ENV_TEMPLATE $ENV_FILE -Force

function Set-EnvVar($key, $value) {
    if (![string]::IsNullOrWhiteSpace($value)) {
        # Escape '$' so -replace treats the value literally (PATs can contain it)
        $escaped = $value -replace '\$', '$$'
        $content = Get-Content $ENV_FILE
        $content = $content -replace "^$key=.*", "$key=$escaped"
        Set-Content -Path $ENV_FILE -Value $content
    }
}

Set-EnvVar "STUDIO_NAME" $STUDIO_NAME
Set-EnvVar "STUDIO_SLUG" $STUDIO_SLUG
Set-EnvVar "STUDIO_EMAIL" $STUDIO_EMAIL
Set-EnvVar "SOURCE_ROOT_BASE" $SOURCE_ROOT_BASE
Set-EnvVar "VENICE_API_KEY" $VENICE_API_KEY
Set-EnvVar "AZURE_ORG" $AZURE_ORG
Set-EnvVar "AZURE_ORG_PAT" $AZURE_ORG_PAT

Write-Ok ".env written"

# ── Patch AGENT.md studio name ───────────────────────────────────────────────
if (Test-Path $AGENT_MD) {
    $agentContent = Get-Content $AGENT_MD -Raw
    if ($agentContent -match '\{\{STUDIO_NAME\}\}') {
        $agentContent = $agentContent -replace '\{\{STUDIO_NAME\}\}', $STUDIO_NAME
        Set-Content -Path $AGENT_MD -Value $agentContent -NoNewline
        Write-Ok "AGENT.md updated with studio name: $STUDIO_NAME"
    } else {
        Write-Ok "AGENT.md already has studio name set"
    }
}

# ── Done ──────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:"
Write-Host "  1. Open your Agent App or Agent-Enabled IDE in this directory"
Write-Host "  2. Login to azure cli: az login from the docker container terminal"
Write-Host "  2. Run: /onboard-client <your-client-slug>"
Write-Host "     (creates clients/<slug>/ workspace from template)"
Write-Host "  3. Run: /use-client <slug>"
Write-Host "     (locks this session to that client)"
Write-Host "  4. Run: /pm on"
Write-Host "     (enables automatic PM routing for all prompts)"
Write-Host ""
Write-Host "  Reference:"
Write-Host "  - SETUP.md        — overview and quick-start"
Write-Host "  - AGENT.md        — full operating model"
Write-Host "  - AGENTS.md       — team roster and governance"
Write-Host "  - docs/onboarding.md — team guide"
Write-Host ""
