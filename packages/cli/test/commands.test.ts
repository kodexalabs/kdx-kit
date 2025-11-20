import { describe, it, expect } from 'vitest'
import { execSync } from 'node:child_process'
import fs from 'node:fs'

function run(cmd: string) {
  return execSync(`node ./dist/index.js ${cmd}`, { stdio: 'pipe' }).toString()
}

describe('kdx cli', () => {
  it('manifest-validate writes report', () => {
    run('manifest-validate')
    expect(fs.existsSync('dist/reports/manifest-validate.json')).toBe(true)
  })
  it('version-bump writes state', () => {
    run('version-bump --patch')
    expect(fs.existsSync('dist/state/version-bump.json')).toBe(true)
  })
})
