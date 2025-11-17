# Code Rabbit Documentation

## 1. Overview
Code Rabbit is a developer assistant that accelerates coding tasks through AI-powered generation, review, diagnostics, and refactoring. It integrates with CLI and VS Code to:
- Generate boilerplate and implementation code from concise prompts
- Review diffs for potential bugs, complexity, and security issues
- Run diagnostics using the Quality Gate to surface risks early
- Apply guided refactors with safe change previews

## 2. Installation
### System Requirements
- Windows/macOS/Linux
- Node.js >= 18
- pnpm >= 8
- VS Code >= 1.85 (for extension integration)
- Network access to model providers (OpenAI/Gemini)

### Setup Steps
1. Install workspace dependencies:
   ```sh
   pnpm -w install
   ```
2. Configure environment keys (if using AI providers):
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
3. Optional: Install the VS Code extension if available in your environment marketplace.
4. Verify diagnostics tooling:
   ```sh
   pnpm run audit:security
   node tools/security/quality-gate.js validate --file=packages/server/src/services/ai.ts
   ```

## 3. Configuration
Create or update `coderabbit.config.json` at the project root:
```json
{
  "provider": "openai",
  "model": "gpt-4",
  "temperature": 0.2,
  "maxTokens": 2000,
  "contextPaths": ["src", "packages"],
  "enableDiagnostics": true,
  "qualityGate": {
    "failOnCritical": true,
    "reportFormat": "table"
  },
  "autoFix": false,
  "logging": "info"
}
```
Available options:
- `provider` (`openai` | `gemini`)
- `model` (e.g., `gpt-4`, `gpt-3.5-turbo`, `gemini-pro`)
- `temperature` (0–1)
- `maxTokens`
- `contextPaths` (directories to feed as context)
- `enableDiagnostics` (runs Quality Gate on generated changes)
- `qualityGate.failOnCritical` (block output on critical issues)
- `qualityGate.reportFormat` (`table` | `json`)
- `autoFix` (apply suggested fixes automatically)
- `logging` (`silent` | `error` | `info` | `debug`)

## 4. Usage
### CLI Commands
- `coderabbit init` — create default config
- `coderabbit config --set key=value` — update configuration
- `coderabbit generate "Build a REST API for notes" --lang ts` — generate code
- `coderabbit review --diff` — review current Git diff and annotate issues
- `coderabbit diagnose --file path/to/file.ts` — run Quality Gate validation
- `coderabbit fix --file path/to/file.ts` — apply safe refactors and show patch

### VS Code Integration
- Command Palette:
  - `Code Rabbit: Generate Code`
  - `Code Rabbit: Review Diff`
  - `Code Rabbit: Diagnose Active File`
  - `Code Rabbit: Apply Suggested Fixes`
- Inline actions:
  - Right‑click on file/selection → Code Rabbit actions
  - Diagnostics panel shows Quality Gate results with recommended fixes

## 5. Examples
### Generate Component
```ts
// Prompt: "Create a responsive Card component with title, description, and actions"
export function Card({ title, description, onAction }: { title: string; description: string; onAction?: () => void }) {
  return (
    <div className="rounded border p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {onAction && (
        <button className="mt-2 px-3 py-1 border rounded" onClick={onAction}>
          Action
        </button>
      )}
    </div>
  )
}
```

### Review Diff
```sh
# Analyze staged changes and surface issues
coderabbit review --diff
```
Output includes complexity warnings, potential security risks, and suggestions.

### Diagnose File
```sh
coderabbit diagnose --file packages/server/src/services/ai.ts
# Under the hood this calls Quality Gate validate
node tools/security/quality-gate.js validate --file=packages/server/src/services/ai.ts
```

## 6. Troubleshooting
- Missing API key: set `OPENAI_API_KEY` or `GEMINI_API_KEY`
- Rate limiting: reduce `temperature` or batch requests; retry with backoff
- Registry/network errors: run `pnpm -w install` when stable; verify proxies
- Turbo not found: ensure devDependencies installed (`turbo` present) and rerun install
- Quality Gate failures: read recommendations and fix critical/high findings before continuing

## 7. Best Practices
- Keep prompts concise and specific; include language/framework
- Provide context paths to improve relevance
- Run diagnostics on generated changes to catch issues early
- Avoid committing secrets; use environment variables and `.gitignore`
- Validate with type-checks and tests before merging

## 8. Version History
- `1.0.0` — Initial release (generate, review, VS Code integration)
- `1.1.0` — Diagnostics integration with Quality Gate and JSON reporting
- `1.2.0` — Configurable providers, improved refactor suggestions

## 9. Support
- Issues: GitHub repository issue tracker
- Email: support@kodexalabs.dev
- Slack: #dev-assist