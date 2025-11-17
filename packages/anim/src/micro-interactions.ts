/**
 * KodexaLabs Micro-interactions System
 * Production-ready micro-interactions for enhanced UX
 */

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

export interface MicroInteractionConfig {
  duration?: number
  ease?: string
  scale?: number
  opacity?: number
  rotation?: number
  y?: number
  x?: number
}

/**
 * Hover micro-interactions for enhanced UX
 */
export function useHoverInteraction<T extends HTMLElement>(
  config: MicroInteractionConfig = {}
) {
  const elementRef = useRef<T>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const defaultConfig = {
    duration: 0.3,
    ease: 'power2.out',
    scale: 1.05,
    y: -2,
    ...config
  }

  const handleMouseEnter = useCallback(() => {
    if (!elementRef.current) return

    timelineRef.current?.kill()
    timelineRef.current = gsap.timeline()
      .to(elementRef.current, {
        scale: defaultConfig.scale,
        y: defaultConfig.y,
        duration: defaultConfig.duration,
        ease: defaultConfig.ease
      })
  }, [defaultConfig])

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return

    timelineRef.current?.kill()
    timelineRef.current = gsap.timeline()
      .to(elementRef.current, {
        scale: 1,
        y: 0,
        duration: defaultConfig.duration,
        ease: defaultConfig.ease
      })
  }, [defaultConfig])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      timelineRef.current?.kill()
    }
  }, [handleMouseEnter, handleMouseLeave])

  return elementRef
}

/**
 * Click ripple effect micro-interaction
 */
export function useRippleEffect<T extends HTMLElement>() {
  const elementRef = useRef<T>(null)

  const createRipple = useCallback((event: MouseEvent) => {
    if (!elementRef.current) return

    const button = elementRef.current
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.style.width = ripple.style.height = size + 'px'
    ripple.style.left = x + 'px'
    ripple.style.top = y + 'px'
    ripple.className = 'absolute rounded-full bg-white/30 pointer-events-none'
    ripple.style.transform = 'scale(0)'
    ripple.style.animation = 'ripple 0.6s linear'

    button.appendChild(ripple)

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove()
    }, 600)
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    element.addEventListener('click', createRipple)

    return () => {
      element.removeEventListener('click', createRipple)
    }
  }, [createRipple])

  return elementRef
}

/**
 * Magnetic cursor effect for interactive elements
 */
export function useMagneticCursor<T extends HTMLElement>(
  config: { strength?: number; distance?: number } = {}
) {
  const elementRef = useRef<T>(null)
  const { strength = 0.5, distance = 100 } = config

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = event.clientX - centerX
    const deltaY = event.clientY - centerY
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distanceFromCenter < distance) {
      const force = (1 - distanceFromCenter / distance) * strength
      const translateX = deltaX * force
      const translateY = deltaY * force

      gsap.to(elementRef.current, {
        x: translateX,
        y: translateY,
        duration: 0.3,
        ease: 'power2.out'
      })
    } else {
      gsap.to(elementRef.current, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }, [strength, distance])

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return

    gsap.to(elementRef.current, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    document.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return elementRef
}

/**
 * Smooth reveal animation for elements entering viewport
 */
export function useRevealOnScroll<T extends HTMLElement>(
  config: MicroInteractionConfig = {}
) {
  const elementRef = useRef<T>(null)
  const hasRevealed = useRef(false)

  const defaultConfig = {
    duration: 0.8,
    ease: 'power3.out',
    y: 30,
    opacity: 0,
    ...config
  }

  useEffect(() => {
    if (!elementRef.current || hasRevealed.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed.current) {
            hasRevealed.current = true
            
            gsap.fromTo(
              elementRef.current,
              {
                opacity: defaultConfig.opacity,
                y: defaultConfig.y,
                scale: 0.95
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: defaultConfig.duration,
                ease: defaultConfig.ease
              }
            )
            
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [defaultConfig])

  return elementRef
}

/**
 * Stagger animation for lists and grids
 */
export function useStaggerAnimation<T extends HTMLElement>(
  items: any[],
  config: MicroInteractionConfig = {}
) {
  const containerRef = useRef<T>(null)

  const defaultConfig = {
    duration: 0.5,
    ease: 'power2.out',
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ...config
  }

  useEffect(() => {
    if (!containerRef.current) return

    const children = Array.from(containerRef.current.children) as HTMLElement[]
    
    gsap.fromTo(
      children,
      {
        opacity: defaultConfig.opacity,
        y: defaultConfig.y
      },
      {
        opacity: 1,
        y: 0,
        duration: defaultConfig.duration,
        ease: defaultConfig.ease,
        stagger: defaultConfig.stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [items, defaultConfig])

  return containerRef
}

/**
 * Pulsing animation for attention-grabbing elements
 */
export function usePulseAnimation<T extends HTMLElement>(
  config: { scale?: number; duration?: number } = {}
) {
  const elementRef = useRef<T>(null)
  const { scale = 1.05, duration = 2 } = config

  useEffect(() => {
    if (!elementRef.current) return

    const pulse = gsap.to(elementRef.current, {
      scale: scale,
      duration: duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    return () => {
      pulse.kill()
    }
  }, [scale, duration])

  return elementRef
}

/**
 * Loading skeleton animation
 */
export function useSkeletonAnimation<T extends HTMLElement>() {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const skeleton = gsap.to(elementRef.current, {
      opacity: 0.3,
      duration: 1,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    return () => {
      skeleton.kill()
    }
  }, [])

  return elementRef
}

/**
 * Enhanced button with all micro-interactions
 */
export function EnhancedButton({ 
  children, 
  className = '', 
  onClick,
  variant = 'primary',
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const buttonRef = useHoverInteraction<HTMLButtonElement>({
    scale: 1.02,
    y: -1,
    duration: 0.2
  })
  
  const rippleRef = useRippleEffect<HTMLButtonElement>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Add click animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.98,
        duration: 0.1,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
      })
    }
    
    onClick?.(event)
  }

  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  }[variant]

  // Combine refs
  const combinedRef = (el: HTMLButtonElement | null) => {
    if (buttonRef.current) buttonRef.current = el
    if (rippleRef.current) rippleRef.current = el
  }

  return (
    <button
      ref={combinedRef}
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all duration-200 ${variantClasses} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Add CSS animations for ripple effect
 */
export function addRippleStyles() {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      background-color: rgba(255, 255, 255, 0.7);
    }
  `
  document.head.appendChild(style)
}

// Auto-add ripple styles
if (typeof window !== 'undefined') {
  addRippleStyles()
}

// Export all micro-interaction hooks
export const microInteractions = {
  useHoverInteraction,
  useRippleEffect,
  useMagneticCursor,
  useRevealOnScroll,
  useStaggerAnimation,
  usePulseAnimation,
  useSkeletonAnimation,
  EnhancedButton
}