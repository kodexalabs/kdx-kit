# KDX Kit

KodexaLabs modular monorepo for web, desktop, and server packages. This repository uses pnpm workspaces and Turbo to coordinate builds, linting, type checks, and development.

## Workspace Structure
- `apps/web` — Next.js web app
- `apps/desktop` — Electron app (electron-vite)
- `packages/ui` — Reusable UI components
- `packages/anim` — Animation utilities and effects
- `packages/server` — Server utilities and TRPC setup
- `tools` — Internal tooling and diagnostics (quality gate, assets)

## Diagnostics & Quality Gate
The Quality Gate provides security and quality diagnostics.

- Security audit: `pnpm run audit:security`
- Validate a file: `node tools/security/quality-gate.js validate --file=path/to/file.ts`
- JSON output: add `--format=json`

Quality Gate rules include security vulnerabilities, environment checks, accessibility, performance thresholds, documentation coverage, and testing thresholds.

## AI Service Configuration
The AI service uses OpenAI and Gemini. Set these environment variables:

- `OPENAI_API_KEY` — required for OpenAI
- `GEMINI_API_KEY` — required for Gemini

Error handling reports clear messages if keys are missing or upstream calls fail.

## Common Scripts
Run these at the repository root `D:\Kodexalabs\kdx-kit`:

- `pnpm run dev` — start dev across workspaces (Turbo)
- `pnpm run build` — build all packages/apps
- `pnpm run lint` — lint across workspaces
- `pnpm run type-check` — TypeScript type checks across workspaces
- `pnpm run test` — run tests across workspaces
- `pnpm run format` — format with Prettier

Note: some scripts require dependencies installed (`pnpm -w install`).

## Contributing
- Create a feature branch: `git checkout -b feature/<name>`
- Stage changes: `git add <paths>`
- Commit: `git commit -m "<scope>: <message>"`
- Push: `git push -u origin feature/<name>`
- Open a PR targeting `main`