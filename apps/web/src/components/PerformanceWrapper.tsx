/**
 * KodexaLabs Performance-Optimized App Wrapper
 * Production-ready performance monitoring and optimization
 */

'use client'

import { useEffect } from 'react'
import { 
  usePerformanceMonitor, 
  detectDeviceCapabilities, 
  optimizeGSAPAnimations,
  performanceMonitor 
} from '@kdx-kit/anim'

interface PerformanceWrapperProps {
  children: React.ReactNode
}

export function PerformanceWrapper({ children }: PerformanceWrapperProps) {
  const metrics = usePerformanceMonitor((metrics) => {
    // Log performance warnings in development
    if (process.env.NODE_ENV === 'development') {
      if (metrics.fps < 30) {
        console.warn(`⚠️ Low FPS detected: ${metrics.fps}fps`)
      }
      
      if (metrics.memoryUsage > 100) {
        console.warn(`⚠️ High memory usage: ${metrics.memoryUsage.toFixed(2)}MB`)
      }
      
      if (metrics.animationCount > 50) {
        console.warn(`⚠️ Too many active animations: ${metrics.animationCount}`)
      }
    }

    // Auto-optimize based on performance
    if (metrics.fps < 20) {
      // Reduce animation quality for better performance
      document.documentElement.style.setProperty('--animation-quality', 'low')
    } else if (metrics.fps > 50) {
      // Restore high quality animations
      document.documentElement.style.setProperty('--animation-quality', 'high')
    }
  })

  useEffect(() => {
    // Detect device capabilities and optimize animations
    const config = detectDeviceCapabilities()
    optimizeGSAPAnimations(config)

    // Set CSS custom properties for responsive animations
    document.documentElement.style.setProperty('--fps-target', config.fpsTarget.toString())
    document.documentElement.style.setProperty('--gpu-acceleration', config.gpuAcceleration ? 'true' : 'false')
    
    // Add performance monitoring styles
    const style = document.createElement('style')
    style.textContent = `
      :root {
        --animation-quality: high;
        --fps-target: 60;
        --gpu-acceleration: true;
      }
      
      /* Performance-based animation quality */
      [data-animation-quality="low"] * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
      
      /* Reduced motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
      
      /* GPU acceleration hints */
      .gpu-accelerated {
        transform: translateZ(0);
        will-change: transform;
      }
      
      /* Performance monitor overlay */
      .performance-monitor {
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: #00ff00;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        backdrop-filter: blur(10px);
      }
      
      .performance-monitor.warning {
        background: rgba(255, 165, 0, 0.8);
        color: #000;
      }
      
      .performance-monitor.critical {
        background: rgba(255, 0, 0, 0.8);
        color: #fff;
      }
    `
    document.head.appendChild(style)

    // Cleanup function
    return () => {
      performanceMonitor.stopMonitoring()
      style.remove()
    }
  }, [])

  // Performance indicator component
  const PerformanceIndicator = () => {
    if (process.env.NODE_ENV === 'production') return null

    const getStatusClass = () => {
      if (metrics.fps < 20) return 'critical'
      if (metrics.fps < 30) return 'warning'
      return ''
    }

    return (
      <div className={`performance-monitor ${getStatusClass()}`}>
        <div>FPS: {metrics.fps}</div>
        <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
        <div>Animations: {metrics.animationCount}</div>
        <div>Frame Time: {metrics.frameTime.toFixed(1)}ms</div>
      </div>
    )
  }

  return (
    <>
      {children}
      <PerformanceIndicator />
    </>
  )
}

/**
 * Initialize performance optimizations on app start
 */
export function initializePerformance() {
  const config = detectDeviceCapabilities()
  
  // Optimize based on device capabilities
  optimizeGSAPAnimations(config)
  
  // Set up performance monitoring
  performanceMonitor.startMonitoring()
  
  // Add global performance optimizations
  if (config.lowEndDevice) {
    // Disable complex animations on low-end devices
    document.documentElement.setAttribute('data-animation-quality', 'low')
  }
  
  if (config.reduceMotion) {
    // Respect user preference for reduced motion
    document.documentElement.setAttribute('data-reduce-motion', 'true')
  }
  
  // Optimize image loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    })
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img)
    })
  }
  
  // Preload critical resources
  const preloadCriticalResources = () => {
    const criticalResources = [
      // Add critical fonts, images, or other resources
    ]
    
    criticalResources.forEach((resource) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource.href
      if (resource.as) link.as = resource.as
      document.head.appendChild(link)
    })
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources)
  } else {
    preloadCriticalResources()
  }
}

// Auto-initialize performance optimizations
if (typeof window !== 'undefined') {
  initializePerformance()
}