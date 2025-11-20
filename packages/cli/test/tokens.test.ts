import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import fs from 'node:fs'

function run(cmd: string) {
  return execSync(`node ./dist/index.js ${cmd}`, { stdio: 'pipe' }).toString()
}

describe('token validators', () => {
  it('emits tokens report', () => {
    run('validate:tokens')
    expect(fs.existsSync('dist/reports/tokens-report.json')).toBe(true)
  })
})
