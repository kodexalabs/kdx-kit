# PR Title
<type>(<scope>): <subject>

## Context
- Background and motivation
- Related issues/tickets: #<id>

## Technical Implementation
- Summary of changes
- Affected files/modules
- Purpose/impact

## Testing Performed
- Security audit results
- Quality Gate validation results
- Manual checks

## SCI Snippets
```js
// Example (quality-gate)
try { /* read .env* */ } catch (error) {
  if (error && error.code !== 'ENOENT') {
    issues.push({ type: 'sensitive_env_file_read_error', severity: 'low', file: f, description: `Error reading ${f}: ${error.message}` })
  }
}
```

```ts
// Example (AI service)
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable')
}
```

## CodeRabbit Review Request
- Please provide optimization suggestions for validators and error propagation.
- Is there a free review tier available for open-source repositories?

## QA Checklist
- [ ] Code functionality verified
- [ ] Style consistency verified
- [ ] Documentation complete and accurate