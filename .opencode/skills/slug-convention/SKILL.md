# Slug Convention

All client, work product and work identifiers must follow these rules:

- Lowercase
- Kebab-case
- ASCII characters only
- No special characters
- Descriptive but concise


Derive from the client name: lowercase, strip accents (NFKD), non-alphanumerics to `-`, collapse
runs, trim leading/trailing `-`, truncate to 48 chars. If the result is empty or in
`clients/INDEX.md`, ask the user to provide a slug.
Slug is fixed for the rest of the run.