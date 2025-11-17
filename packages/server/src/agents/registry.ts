export type AgentStatus =
  | 'IN_PROGRESS'
  | 'WAITING_FOR_ACTION'
  | 'PLAN_DRAFTED'
  | 'BLOCKED'
  | 'COMPLETE'
  | 'QUEUED'

export interface AgentError { message: string }

export interface AgentState {
  id: string
  name: string
  status: AgentStatus
  currentTask?: string
  completedTasks: string[]
  remainingTasks: string[]
  errors: AgentError[]
  nextActions?: string[]
  lastUpdated?: number
  context?: any
}

export interface AgentActionCmd {
  agentId: string
  action: string
  context?: any
}

export class AgentRegistry {
  private store = new Map<string, AgentState>()

  getAll(): AgentState[] {
    return Array.from(this.store.values())
  }

  get(id: string): AgentState | undefined {
    return this.store.get(id)
  }

  upsert(state: AgentState) {
    const next: AgentState = { ...state, lastUpdated: Date.now() }
    this.store.set(state.id, next)
    return next
  }

  setStatus(id: string, status: AgentStatus, currentTask?: string) {
    const s = this.store.get(id)
    if (!s) return undefined
    s.status = status
    if (currentTask !== undefined) s.currentTask = currentTask
    s.lastUpdated = Date.now()
    return s
  }

  applyAction(cmd: AgentActionCmd) {
    const s = this.store.get(cmd.agentId)
    if (!s) return undefined
    // naive action application: move first remaining task to completed on "Continue"
    if (cmd.action.startsWith('Continue')) {
      const next = s.remainingTasks.shift()
      if (next) s.completedTasks.push(next)
      s.status = s.remainingTasks.length ? 'IN_PROGRESS' : 'COMPLETE'
    }
    s.lastUpdated = Date.now()
    return s
  }
}

export const agentRegistry = new AgentRegistry()