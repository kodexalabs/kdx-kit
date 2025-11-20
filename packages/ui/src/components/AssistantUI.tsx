"use client"
import React from "react"

export function AssistantUI() {
  return (
    <div aria-live="polite" style={{ position:'fixed', bottom:16, right:16, zIndex:50, background:'#111', color:'#eee', border:'1px solid #444', borderRadius:8, padding:'8px 12px', fontSize:12 }}>
      Assistant UI mounted
    </div>
  )
}
