'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initSmoothScroll, optimizeForPerformance } from './gsap'

// Register plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

export function useSmoothScroll(options = {}) {
  useEffect(() => {
    // Initialize performance optimizations
    optimizeForPerformance()
    
    // Initialize smooth scrolling with custom options
    const smoother = initSmoothScroll()
    
    // Apply custom options
    if (options.effects !== undefined) {
      smoother.effects(options.effects)
    }
    
    if (options.smooth !== undefined) {
      smoother.smooth(options.smooth)
    }

    return () => {
      smoother.kill()
    }
  }, [])
}

export function useScrollTo(options = {}) {
  const scrollTo = (target: string | number, customOptions = {}) => {
    const scrollOptions = { ...options, ...customOptions }
    
    if (typeof target === 'string') {
      const element = document.querySelector(target)
      if (element) {
        gsap.to(window, {
          scrollTo: {
            y: element,
            autoKill: false
          },
          duration: scrollOptions.duration || 1.5,
          ease: scrollOptions.ease || 'power3.inOut'
        })
      }
    } else {
      gsap.to(window, {
        scrollTo: {
          y: target,
          autoKill: false
        },
        duration: scrollOptions.duration || 1.5,
        ease: scrollOptions.ease || 'power3.inOut'
      })
    }
  }
  
  return { scrollTo }
}

export function useParallax(ref: React.RefObject<HTMLElement>, speed = 0.5, options = {}) {
  useEffect(() => {
    if (!ref.current) return
    
    const element = ref.current
    const parallaxOptions = {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        ...options
      }
    }
    
    gsap.to(element, parallaxOptions)
    
    return () => {
      ScrollTrigger.getById(element.id)?.kill()
    }
  }, [ref, speed, options])
}