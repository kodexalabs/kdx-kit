import React from 'react'
import { gsap } from './gsap'

// Custom hook for GSAP animations
export const useGsap = () => {
  const timeline = React.useRef<gsap.core.Timeline | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeline.current) {
        timeline.current.kill()
      }
    }
  }, [])

  const createTimeline = () => {
    timeline.current = gsap.timeline()
    return timeline.current
  }

  return { createTimeline, timeline: timeline.current }
}

// Motion component wrapper
export const Motion = ({ 
  children, 
  initial = {}, 
  animate = {}, 
  transition = {}, 
  className = '',
  ...props 
}: {
  children: React.ReactNode
  initial?: any
  animate?: any
  transition?: any
  className?: string
  [key: string]: any
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current, initial, { ...animate, ...transition })
    }
  }, [])

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
}

export { gsap } from './gsap'