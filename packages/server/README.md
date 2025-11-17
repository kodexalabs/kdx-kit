# Server Package

Utilities and services for backend features including TRPC setup and AI integrations.

## AI Service
- Supports OpenAI and Gemini text generation.
- Required env vars:
  - `OPENAI_API_KEY`
  - `GEMINI_API_KEY`

### Usage
```ts
import { aiService } from './src/services/ai'

const text = await aiService.generateText('Explain monorepos')
const code = await aiService.generateCode('Hello world HTTP server', 'typescript')
const gemini = await aiService.generateWithGemini('Write a haiku about wind')
```

### Error Handling
- Clear messages when env keys are missing.
- Upstream API errors are surfaced with context while avoiding sensitive leakage.

## Diagnostics
Validate file quality:
- `node tools/security/quality-gate.js validate --file=packages/server/src/services/ai.ts`