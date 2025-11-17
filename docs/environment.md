# Environment Setup

## Requirements
- Node.js >= 18
- pnpm >= 8
- Turbo (installed via devDependencies)

## Install
```sh
pnpm -w install
```

## Common Scripts
- `pnpm run dev` — Turbo dev across apps/packages
- `pnpm run build` — build all
- `pnpm run lint` — lint
- `pnpm run type-check` — type checks
- `pnpm run test` — tests
- `pnpm run format` — Prettier format

## Env Variables
- `OPENAI_API_KEY`, `GEMINI_API_KEY` for AI
- Do not commit secrets; use `.env` locally and ensure `.gitignore` covers sensitive patterns.

## Windows Notes
- Line endings warnings (CRLF vs LF) are harmless; ensure `core.autocrlf` is configured per team policy.