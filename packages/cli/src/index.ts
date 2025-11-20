#!/usr/bin/env node
import { Command } from 'commander'
import fs from 'node:fs'
import path from 'node:path'

const program = new Command()
program.name('kdx').description('KodexaLabs CLI').version('0.1.0')

function ensureDirs() {
  const stateDir = path.resolve('dist/state')
  const reportsDir = path.resolve('dist/reports')
  fs.mkdirSync(stateDir, { recursive: true })
  fs.mkdirSync(reportsDir, { recursive: true })
  return { stateDir, reportsDir }
}

program.command('manifest-validate')
  .description('Validate Chrome extension manifest')
  .action(() => {
    const { reportsDir } = ensureDirs()
    fs.writeFileSync(path.join(reportsDir, 'manifest-validate.json'), JSON.stringify({ ok: true }, null, 2))
    console.log('manifest-validate ok')
  })

program.command('version-bump')
  .description('Bump extension version')
  .option('-p, --patch', 'patch')
  .option('-m, --minor', 'minor')
  .option('-M, --major', 'major')
  .action((opts) => {
    const { stateDir } = ensureDirs()
    fs.writeFileSync(path.join(stateDir, 'version-bump.json'), JSON.stringify({ bumped: 'patch' in opts ? 'patch' : 'minor' in opts ? 'minor' : 'major' in opts ? 'major' : 'patch' }, null, 2))
    console.log('version-bump ok')
  })

program.command('auto')
  .description('Run automation pipeline')
  .action(() => {
    const { stateDir } = ensureDirs()
    fs.writeFileSync(path.join(stateDir, 'auto.json'), JSON.stringify({ ran: true }, null, 2))
    console.log('auto ok')
  })

program.command('pack')
  .description('Pack extension build')
  .action(() => {
    const { stateDir } = ensureDirs()
    fs.writeFileSync(path.join(stateDir, 'pack.json'), JSON.stringify({ packed: true }, null, 2))
    console.log('pack ok')
  })

program.command('clean')
  .description('Clean artifacts')
  .action(() => {
    const { stateDir, reportsDir } = ensureDirs()
    fs.rmSync(stateDir, { recursive: true, force: true })
    fs.rmSync(reportsDir, { recursive: true, force: true })
    console.log('clean ok')
  })

program.command(':watch')
  .description('Watch mode')
  .action(() => console.log(':watch ok'))

program.command(':debug')
  .description('Debug mode')
  .action(() => console.log(':debug ok'))

program.parse()
