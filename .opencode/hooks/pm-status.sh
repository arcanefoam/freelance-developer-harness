#!/bin/bash
# Shows PM mode indicator in the .opencode Code status line — only when PM mode is ON.
SESSION_ID="${.opencode_SESSION_ID:-default}"
PM_MODE_FILE="..opencode/sessions/${SESSION_ID}.pm-mode"

if [ -f "$PM_MODE_FILE" ] && [ "$(cat "$PM_MODE_FILE" 2>/dev/null | tr -d '[:space:]')" = "on" ]; then
  echo "⚡ PM"
fi
