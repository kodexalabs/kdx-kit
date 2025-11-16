import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { gsap, ScrollTrigger, SplitText, textMorph, magneticEffect, flipCard, particleExplosion, waveAnimation, morphingBlob } from './gsap'

// Enhanced Motion component with advanced features
export interface MotionProps {
  children: React.ReactNode
  className?: string
  // Animation properties
  initial?: gsap.TweenVars
  animate?: gsap.TweenVars
  whileInView?: gsap.TweenVars
  exit?: gsap.TweenVars
  // Scroll trigger properties
  scrollTrigger?: ScrollTrigger.Vars
  // Timing properties
  transition?: {
    duration?: number
    delay?: number
    ease?: string
    stagger?: number
    repeat?: number
    yoyo?: boolean
  }
  // Text animation properties
  textAnimation?: {
    type?: 'chars' | 'words' | 'lines'
    stagger?: number
    scramble?: boolean
    glitch?: boolean
  }
  // Parallax properties
  parallax?: {
    speed?: number
    direction?: 'vertical' | 'horizontal'
  }
  // Advanced effects
  magnetic?: {
    strength?: number
    distance?: number
    ease?: string
  }
  particleExplosion?: boolean
  wave?: {
    amplitude?: number
    frequency?: number
    duration?: number
  }
  textMorph?: {
    text: string
    duration?: number
    chars?: string
  }
  flip?: {
    direction?: 'horizontal' | 'vertical'
    duration?: number
  }
  morphingBlob?: boolean
  // Lifecycle callbacks
  onStart?: () => void
  onComplete?: () => void
  onUpdate?: () => void
  onReverseStart?: () => void
  onReverseComplete?: () => void
}

export const Motion = forwardRef<any, MotionProps>(
  ({ 
    children, 
    className = '',
    initial = {}, 
    animate = {}, 
    whileInView = {},
    exit = {},
    scrollTrigger,
    transition = {},
    textAnimation,
    parallax,
    magnetic,
    particleExplosion,
    wave,
    textMorph,
    flip,
    morphingBlob,
    onStart,
    onComplete,
    onUpdate,
    onReverseStart,
    onReverseComplete
  }, ref) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const splitTextRef = useRef<SplitText | null>(null)
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

    useImperativeHandle(ref, () => ({
      play: () => timelineRef.current?.play(),
      pause: () => timelineRef.current?.pause(),
      reverse: () => timelineRef.current?.reverse(),
      restart: () => timelineRef.current?.restart(),
      getTimeline: () => timelineRef.current,
      getScrollTrigger: () => scrollTriggerRef.current
    }))

    useEffect(() => {
      if (!elementRef.current) return

      const element = elementRef.current
      
      // Initialize performance optimizations
      gsap.config({ force3D: true })

      // Create main timeline
      const tl = gsap.timeline({
        onStart,
        onComplete,
        onUpdate,
        onReverseStart,
        onReverseComplete
      })
      timelineRef.current = tl

      // Handle magnetic effect
      if (magnetic) {
        const cleanup = magneticEffect(element, magnetic)
        return cleanup
      }

      // Handle particle explosion
      if (particleExplosion) {
        element.addEventListener('click', () => {
          particleExplosion(element)
        })
      }

      // Handle wave animation
      if (wave) {
        waveAnimation(element, wave)
      }

      // Handle text morph
      if (textMorph) {
        textMorph(element, textMorph.text, {
          duration: textMorph.duration,
          chars: textMorph.chars
        })
      }

      // Handle flip animation
      if (flip) {
        flipCard(element, flip)
      }

      // Handle morphing blob
      if (morphingBlob) {
        morphingBlob(element)
      }

      // Handle text animations
      if (textAnimation) {
        const { type = 'chars', stagger = 0.02, scramble, glitch } = textAnimation
        
        if (scramble) {
          // Scramble text animation
          tl.to(element, {
            duration: transition.duration || 1,
            scrambleText: {
              text: element.textContent,
              chars: '!<>-_\\/[]{}—=+*^?#________',
              speed: 0.3
            },
            ease: 'none'
          })
        } else if (glitch) {
          // Glitch effect
          tl.to(element, { duration: 0.1, opacity: 0.8, x: '+=5', color: '#ff0040' })
            .to(element, { duration: 0.1, opacity: 1, x: '-=10', color: '#00ff40' })
            .to(element, { duration: 0.1, x: '+=5', color: '#4000ff' })
            .to(element, { duration: 0.1, color: '#ffffff' })
        } else {
          // Split text animation
          splitTextRef.current = new SplitText(element, { type })
          const targets = type === 'chars' ? splitTextRef.current.chars : 
                          type === 'words' ? splitTextRef.current.words : 
                          splitTextRef.current.lines
          
          tl.from(targets, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            stagger,
            duration: transition.duration || 0.8,
            ease: transition.ease || 'power3.out'
          })
        }
      }

      // Handle parallax effects
      if (parallax) {
        const { speed = 0.5, direction = 'vertical' } = parallax
        
        if (direction === 'vertical') {
          gsap.to(element, {
            yPercent: -100 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          })
        } else {
          gsap.to(element, {
            xPercent: -100 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: element,
              start: 'left right',
              end: 'right left',
              scrub: true
            }
          })
        }
      }

      // Handle scroll-triggered animations
      if (scrollTrigger) {
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: element,
          animation: tl,
          start: scrollTrigger.start || 'top 80%',
          end: scrollTrigger.end || 'bottom 20%',
          toggleActions: scrollTrigger.toggleActions || 'play none none reverse',
          scrub: scrollTrigger.scrub || false,
          markers: scrollTrigger.markers || false
        })
      } else if (Object.keys(whileInView).length > 0) {
        // Handle whileInView animations
        scrollTriggerRef.current = ScrollTrigger.create({
          trigger: element,
          animation: tl.fromTo(element, initial, { ...whileInView, ...transition }),
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        })
      } else {
        // Handle regular animations
        if (Object.keys(initial).length > 0) {
          tl.fromTo(element, initial, { ...animate, ...transition })
        } else {
          tl.to(element, { ...animate, ...transition })
        }
      }

      return () => {
        tl.kill()
        scrollTriggerRef.current?.kill()
        splitTextRef.current?.revert()
      }
    }, [])

    return (
      <div ref={elementRef} className={className}>
        {children}
      </div>
    )
  }
)

Motion.displayName = 'Motion'

// Custom hook for advanced GSAP animations
export const useGsap = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  const createTimeline = (options = {}) => {
    timelineRef.current = gsap.timeline(options)
    return timelineRef.current
  }

  const createScrollTrigger = (vars: ScrollTrigger.Vars) => {
    return ScrollTrigger.create(vars)
  }

  const createSplitText = (element: HTMLElement, vars = {}) => {
    return new SplitText(element, vars)
  }

  return { 
    createTimeline, 
    createScrollTrigger, 
    createSplitText,
    timeline: timelineRef.current,
    gsap 
  }
}

export { gsap, ScrollTrigger, SplitText } from './gsap'