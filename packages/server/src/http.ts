import http from 'http'
import { agentRegistry, AgentActionCmd, AgentState } from './agents/registry'
import fs from 'fs'
import path from 'path'

function readBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (c) => chunks.push(Buffer.from(c)))
    req.on('end', () => {
      if (!chunks.length) return resolve(undefined)
      try {
        const body = Buffer.concat(chunks).toString('utf8')
        resolve(JSON.parse(body))
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
}

function writeJson(res: http.ServerResponse, code: number, payload: any) {
  res.statusCode = code
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

function appendAudit(entry: Record<string, any>) {
  try {
    const defaultAudit = path.resolve(
      process.env.KDX_AGENT_AUDIT_PATH ||
        'D:/Kodexalabs/TRAE_TRAINING_WORKSPACE/docs/agent-audit.log'
    )
    const line = JSON.stringify({ ...entry, ts: Date.now() }) + '\n'
    fs.appendFileSync(defaultAudit, line)
  } catch {}
}

export function startAgentServer(port = Number(process.env.KDX_AGENT_PORT || 5858)) {
  // seed minimal example for visibility
  if (!agentRegistry.get('CoreAgent')) {
    const seed: AgentState = {
      id: 'CoreAgent',
      name: 'CoreAgent',
      status: 'IN_PROGRESS',
      currentTask: 'Initialize registry',
      completedTasks: ['Bootstrap'],
      remainingTasks: ['Refine suggestions'],
      errors: [],
      nextActions: ['Continue with: Refine suggestions'],
      lastUpdated: Date.now(),
    }
    agentRegistry.upsert(seed)
  }

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host}`)
    if (req.method === 'GET' && url.pathname === '/api/agents/status') {
      return writeJson(res, 200, agentRegistry.getAll())
    }
    if (req.method === 'POST' && url.pathname === '/api/agents/execute') {
      try {
        const body = (await readBody(req)) as AgentActionCmd
        const updated = agentRegistry.applyAction(body)
        appendAudit({ type: 'execute', body })
        return writeJson(res, 200, { success: !!updated })
      } catch (e: any) {
        return writeJson(res, 400, { success: false, error: e?.message || String(e) })
      }
    }
    writeJson(res, 404, { error: 'Not Found' })
  })
  server.listen(port)
  return { server, port }
}