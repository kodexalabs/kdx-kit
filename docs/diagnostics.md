# Diagnostics & Quality Gate

Quality Gate provides security and quality checks across the codebase.

## Commands
- Security audit: `pnpm run audit:security`
- Validate a file: `node tools/security/quality-gate.js validate --file=path/to/file.ts`
- JSON output: add `--format=json`

## Rules
- Security vulnerabilities, dependency security
- Environment checks: `.env` presence, `.gitignore` sensitive entries
- Documentation/testing thresholds
- Accessibility/performance heuristics

## Interpreting Results
- Score `>=95`: excellent
- Any errors: status `failed`
- Recommendations list remediation priorities

## CI Usage
- Add audit and validate steps before build to block on critical/high issues.