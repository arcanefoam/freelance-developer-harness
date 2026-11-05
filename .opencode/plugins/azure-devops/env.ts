import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

/**
 * Loads the harness `.env` into `process.env` so plugins never depend on the
 * caller having exported the variables first.
 *
 * The path comes from this module's own location, not `process.cwd()`, so the
 * lookup still lands on the repo root when the server starts elsewhere.
 * Variables that are already set win over the file, so a real shell export or
 * a CI environment keeps precedence.
 */

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
let loaded = false;

export function loadEnv(): void {
  if (loaded) return;
  loaded = true;

  let contents: string;
  try {
    contents = readFileSync(resolve(root, ".env"), "utf8");
  } catch {
    // No .env: fall back to whatever the process already carries.
    return;
  }

  for (const line of contents.split(/\r?\n/)) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;

    const [, key, raw] = match;
    if (process.env[key] !== undefined) continue;

    process.env[key] = raw.trim().replace(/^(['"])(.*)\1$/, "$2");
  }
}

/** Reads a variable that the plugin cannot run without. */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set (checked the process env and .env)`);
  }
  return value;
}
