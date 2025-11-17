/**
 * KodexaLabs Animation Performance Optimization System
 * Production-ready performance monitoring and optimization utilities
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import gsap from 'gsap'

export interface PerformanceConfig {
  fpsTarget: number
  reduceMotion: boolean
  lowEndDevice: boolean
  gpuAcceleration: boolean
  memoryLimit: number
}

export interface PerformanceMetrics {
  fps: number
  frameTime: number
  memoryUsage: number
  animationCount: number
  renderTime: number
}

class AnimationPerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    animationCount: 0,
    renderTime: 0
  }
  
  private frameCount = 0
  private lastFrameTime = performance.now()
  private fpsUpdateInterval = 1000 // 1 second
  private animationCount = 0
  private isMonitoring = false
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = []

  startMonitoring() {
    if (this.isMonitoring) return
    this.isMonitoring = true
    this.updateLoop()
  }

  stopMonitoring() {
    this.isMonitoring = false
  }

  private updateLoop = () => {
    if (!this.isMonitoring) return

    const now = performance.now()
    const delta = now - this.lastFrameTime
    
    this.frameCount++
    this.metrics.frameTime = delta

    // Update FPS every second
    if (now - this.lastFrameTime >= this.fpsUpdateInterval) {
      this.metrics.fps = Math.round((this.frameCount * 1000) / (now - this.lastFrameTime))
      this.frameCount = 0
      this.lastFrameTime = now
    }

    // Update memory usage
    if ('memory' in performance) {
      this.metrics.memoryUsage = (performance as any).memory.usedJSHeapSize / 1024 / 1024
    }

    this.metrics.animationCount = this.animationCount

    // Notify callbacks
    this.callbacks.forEach(callback => callback(this.metrics))

    requestAnimationFrame(this.updateLoop)
  }

  incrementAnimationCount() {
    this.animationCount++
  }

  decrementAnimationCount() {
    this.animationCount = Math.max(0, this.animationCount - 1)
  }

  onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback)
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback)
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics }
  }
}

// Global performance monitor instance
export const performanceMonitor = new AnimationPerformanceMonitor()

/**
 * Detect device capabilities for optimal animation settings
 */
export function detectDeviceCapabilities(): PerformanceConfig {
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  const isLowEndDevice = isMobile || /trident|edge|msie/i.test(userAgent)
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Check WebGL support
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  const hasWebGL = !!gl
  
  // Check available memory
  const memoryInfo = (navigator as any).deviceMemory
  const hasLowMemory = memoryInfo && memoryInfo < 4
  
  return {
    fpsTarget: isLowEndDevice ? 30 : 60,
    reduceMotion: prefersReducedMotion,
    lowEndDevice: isLowEndDevice || hasLowMemory,
    gpuAcceleration: hasWebGL && !isLowEndDevice,
    memoryLimit: hasLowMemory ? 50 : 100 // MB
  }
}

/**
 * Optimize GSAP animations based on device capabilities
 */
export function optimizeGSAPAnimations(config: PerformanceConfig) {
  // Set GSAP performance settings
  gsap.config({
    force3D: config.gpuAcceleration,
    nullTargetWarn: false,
    trialWarn: false
  })

  // Reduce motion for accessibility
  if (config.reduceMotion) {
    gsap.globalTimeline.timeScale(0.5)
  }

  // Optimize for low-end devices
  if (config.lowEndDevice) {
    gsap.defaults({
      ease: 'none', // Use linear easing for better performance
      force3D: false // Disable 3D transforms
    })
  }
}

/**
 * React hook for performance monitoring
 */
export function usePerformanceMonitor(onMetricsUpdate?: (metrics: PerformanceMetrics) => void) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
    memoryUsage: 0,
    animationCount: 0,
    renderTime: 0
  })

  useEffect(() => {
    performanceMonitor.startMonitoring()

    const unsubscribe = performanceMonitor.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics)
      onMetricsUpdate?.(newMetrics)
    })

    return () => {
      unsubscribe()
      performanceMonitor.stopMonitoring()
    }
  }, [onMetricsUpdate])

  return metrics
}

/**
 * Animation frame rate limiter
 */
export function createFrameRateLimiter(targetFPS: number) {
  const frameInterval = 1000 / targetFPS
  let lastFrameTime = 0

  return function limitFrameRate(currentTime: number): boolean {
    if (currentTime - lastFrameTime >= frameInterval) {
      lastFrameTime = currentTime
      return true
    }
    return false
  }
}

/**
 * Memory-efficient animation pool
 */
export class AnimationPool {
  private pool: gsap.core.Timeline[] = []
  private maxSize: number

  constructor(maxSize = 10) {
    this.maxSize = maxSize
  }

  acquire(): gsap.core.Timeline {
    if (this.pool.length > 0) {
      return this.pool.pop()!
    }
    return gsap.timeline()
  }

  release(timeline: gsap.core.Timeline) {
    timeline.kill()
    timeline.clear()
    
    if (this.pool.length < this.maxSize) {
      this.pool.push(timeline)
    }
  }

  clear() {
    this.pool.forEach(timeline => timeline.kill())
    this.pool = []
  }
}

/**
 * Performance-optimized scroll handler
 */
export function useOptimizedScroll(callback: (progress: number) => void, options?: { throttle?: number }) {
  const callbackRef = useRef(callback)
  const throttleMs = options?.throttle || 16 // ~60fps
  const lastCallTime = useRef(0)
  const rafId = useRef<number>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const handleScroll = useCallback(() => {
    const now = performance.now()
    
    if (now - lastCallTime.current >= throttleMs) {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      callbackRef.current(progress)
      lastCallTime.current = now
    }

    rafId.current = requestAnimationFrame(handleScroll)
  }, [])

  useEffect(() => {
    rafId.current = requestAnimationFrame(handleScroll)
    
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])
}

/**
 * Lazy load animations for better initial performance
 */
export function useLazyAnimation<T extends HTMLElement>(
  animationFactory: (element: T) => gsap.core.Timeline | gsap.core.Tween,
  options?: { threshold?: number; rootMargin?: string }
) {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationRef.current) {
            performanceMonitor.incrementAnimationCount()
            animationRef.current = animationFactory(elementRef.current!)
            
            // Clean up when animation completes
            if ('then' in animationRef.current) {
              (animationRef.current as any).then(() => {
                performanceMonitor.decrementAnimationCount()
              })
            }
          }
        })
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '50px'
      }
    )

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
      if (animationRef.current) {
        animationRef.current.kill()
        performanceMonitor.decrementAnimationCount()
      }
    }
  }, [animationFactory, options])

  return elementRef
}

/**
 * Batch multiple DOM reads/writes for better performance
 */
export function batchDOMOperations(operations: () => void) {
  // Use requestAnimationFrame to batch operations
  requestAnimationFrame(() => {
    operations()
  })
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }
}

// Export performance utilities
export const performanceUtils = {
  detectDeviceCapabilities,
  optimizeGSAPAnimations,
  createFrameRateLimiter,
  batchDOMOperations,
  debounce
}