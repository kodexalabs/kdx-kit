"use client"
import React from "react"

export type Theme = "monochrome" | "system"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <div data-theme="monochrome">{children}</div>
}
