import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '../../')
const src = path.join(root, 'assets')
const targets = [
  { name: 'web', dir: path.join(root, 'apps', 'web', 'public', 'assets') },
  { name: 'desktop', dir: path.join(root, 'apps', 'desktop', 'renderer', 'assets') },
  { name: 'desktop-src', dir: path.join(root, 'apps', 'desktop', 'src', 'renderer', 'assets') },
]

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function copyRecursive(from, to) {
  await ensureDir(to)
  await fs.cp(from, to, { recursive: true, force: true })
}

async function main() {
  try {
    const start = Date.now()
    for (const t of targets) {
      await copyRecursive(src, t.dir)
      process.stdout.write(`[assets:sync] Synced to ${t.name} → ${t.dir}\n`)
    }
    const ms = Date.now() - start
    process.stdout.write(`[assets:sync] Done in ${ms}ms\n`)
  } catch (err) {
    process.stderr.write(`[assets:sync] Error: ${err?.message || err}\n`)
    process.exitCode = 1
  }
}

main()