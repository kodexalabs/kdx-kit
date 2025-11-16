'use client'

import { useEffect } from 'react'
import { useSmoothScroll } from '@kdx-kit/anim'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
    ignoreMobileResize: true
  })

  return <>{children}</>
}