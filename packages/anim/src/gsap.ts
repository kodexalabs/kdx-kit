import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin)

// Re-export GSAP and plugins
export { gsap, ScrollTrigger, TextPlugin }

// Custom animation utilities
export const animateIn = (element: HTMLElement, options = {}) => {
  return gsap.fromTo(element, 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', ...options }
  )
}

export const animateOut = (element: HTMLElement, options = {}) => {
  return gsap.to(element, 
    { opacity: 0, y: -50, duration: 0.6, ease: 'power2.in', ...options }
  )
}

export const staggerIn = (elements: HTMLElement[], options = {}) => {
  return gsap.fromTo(elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', ...options }
  )
}

export const textReveal = (element: HTMLElement, options = {}) => {
  return gsap.fromTo(element,
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: 1, ease: 'power2.out', ...options }
  )
}

export const scaleIn = (element: HTMLElement, options = {}) => {
  return gsap.fromTo(element,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', ...options }
  )
}