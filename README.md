# kdx-kit

KodexaLabs modular, ultra-responsive UI experiment and production stack.

## Install

- Requires Node \>=18 and pnpm \>=8
- On D drive at `\\10.0.0.58\d\Kodexalabs`: `pnpm install`

## Scripts

- `pnpm dev` — run dev tasks via Turbo
- `pnpm build` — build all workspaces
- `pnpm lint` — lint all packages
- `pnpm test` — run tests (workspace-defined)

## Web App

- Next.js app at `apps/web`
- Theme integration: `ThemeProvider` and `monochrome.css` injected in `apps/web/src/app/layout.tsx`
- Assistant UI mounted globally

## CI

- GitHub Actions runs lint, build, tests and applies a coverage gate (\>=80%) when coverage data is present

## Environment Note

Primary working storage is the D drive on 10.0.0.58; do not assume the local S drive. Paths and scripts are aligned to D on 10.0.0.58.
