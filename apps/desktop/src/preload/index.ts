import { contextBridge } from 'electron'

export const api = {
  // Add your API methods here
}

contextBridge.exposeInMainWorld('api', api)