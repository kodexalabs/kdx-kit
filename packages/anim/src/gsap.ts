import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

// Register all GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollSmoother, SplitText)

// Re-export GSAP and plugins
export { gsap, ScrollTrigger, TextPlugin, ScrollSmoother, SplitText }

// KodexaLabs production animation presets
export const animationPresets = {
  // Smooth entrance animations
  fadeInUp: {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  },
  
  fadeInDown: {
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  },
  
  fadeInLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  },
  
  fadeInRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  },
  
  // Scale animations
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
  },
  
  scaleOut: {
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.in(1.7)' }
  },
  
  // Rotation animations
  rotateIn: {
    from: { opacity: 0, rotation: -180, scale: 0.5 },
    to: { opacity: 1, rotation: 0, scale: 1, duration: 1, ease: 'power3.out' }
  },
  
  // Text reveal animations
  textReveal: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
  }
}

// Initialize smooth scrolling (Lelis)
export const initSmoothScroll = () => {
  return ScrollSmoother.create({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
    ignoreMobileResize: true,
  })
}

// Advanced text animation with split text
export const animateText = (element: HTMLElement, options = {}) => {
  const split = new SplitText(element, { type: 'chars,words,lines' })
  
  return gsap.from(split.chars, {
    opacity: 0,
    y: 50,
    rotationX: -90,
    stagger: 0.02,
    duration: 0.8,
    ease: 'power3.out',
    ...options
  })
}

// Parallax effect for elements
export const parallaxEffect = (element: HTMLElement, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -100 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  })
}

// Staggered animations for lists
export const staggerAnimation = (elements: HTMLElement[], options = {}) => {
  const defaultOptions = {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0 },
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  }
  
  return gsap.fromTo(elements, 
    { ...defaultOptions.from, ...options.from },
    { ...defaultOptions.to, ...options.to, stagger: defaultOptions.stagger, ...options }
  )
}

// Magnetic cursor effect
export const magneticCursor = (element: HTMLElement, strength = 0.5) => {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  return gsap.to(element, {
    x: (i, target) => (event.clientX - centerX) * strength,
    y: (i, target) => (event.clientY - centerY) * strength,
    duration: 0.3,
    ease: 'power2.out'
  })
}

// Advanced scroll-triggered animations
export const scrollReveal = (element: HTMLElement, options = {}) => {
  const defaultOptions = {
    trigger: element,
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
    animation: animationPresets.fadeInUp
  }
  
  const config = { ...defaultOptions, ...options }
  
  return ScrollTrigger.create({
    trigger: config.trigger,
    start: config.start,
    end: config.end,
    toggleActions: config.toggleActions,
    animation: gsap.fromTo(element, config.animation.from, config.animation.to)
  })
}

// Custom entrance animations
export const animateIn = (element: HTMLElement, options = {}) => {
  return gsap.fromTo(element, 
    { opacity: 0, y: 50, ...options.from },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', ...options.to }
  )
}

export const animateOut = (element: HTMLElement, options = {}) => {
  return gsap.to(element, 
    { opacity: 0, y: -50, duration: 0.6, ease: 'power3.in', ...options }
  )
}

// Text scramble effect (KodexaLabs favorite)
export const textScramble = (element: HTMLElement, finalText: string, options = {}) => {
  const chars = '!<>-_\/[]{}—=+*^?#________'
  const text = element.innerText
  const length = text.length
  
  return gsap.to(element, {
    duration: options.duration || 1,
    scrambleText: {
      text: finalText,
      chars: chars,
      speed: options.speed || 0.3
    },
    ease: 'none',
    ...options
  })
}

// Glitch effect for text
export const glitchText = (element: HTMLElement, options = {}) => {
  const tl = gsap.timeline()
  
  tl.to(element, {
    duration: 0.1,
    opacity: 0.8,
    x: '+=5',
    color: '#ff0040',
    ease: 'power2.inOut'
  })
  .to(element, {
    duration: 0.1,
    opacity: 1,
    x: '-=10',
    color: '#00ff40',
    ease: 'power2.inOut'
  })
  .to(element, {
    duration: 0.1,
    x: '+=5',
    color: '#4000ff',
    ease: 'power2.inOut'
  })
  .to(element, {
    duration: 0.1,
    color: '#ffffff',
    ease: 'power2.inOut'
  })
  
  return tl
}

// Performance optimization for animations
export const optimizeForPerformance = () => {
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
    trialWarn: false,
    units: { left: "%", top: "%", rotation: "deg" }
  })
  
  ScrollTrigger.config({
    limitCallbacks: true,
    syncInterval: 40,
    ignoreMobileResize: true
  })
}

// Advanced magnetic effect with improved performance
export const magneticEffect = (element: HTMLElement, options = {}) => {
  const {
    strength = 0.5,
    distance = 100,
    ease = 'power2.out',
    duration = 0.3
  } = options

  let isHovering = false
  let animation: gsap.core.Timeline | null = null

  const handleMouseMove = (e: MouseEvent) => {
    if (!isHovering) return

    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    
    if (distanceFromCenter < distance) {
      const force = Math.max(0, 1 - distanceFromCenter / distance) * strength
      
      if (animation) animation.kill()
      animation = gsap.to(element, {
        x: deltaX * force,
        y: deltaY * force,
        duration,
        ease
      })
    }
  }

  const handleMouseEnter = () => {
    isHovering = true
  }

  const handleMouseLeave = () => {
    isHovering = false
    if (animation) animation.kill()
    gsap.to(element, {
      x: 0,
      y: 0,
      duration,
      ease
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('mouseleave', handleMouseLeave)
    if (animation) animation.kill()
  }
}

// Advanced text morphing effect
export const textMorph = (element: HTMLElement, finalText: string, options = {}) => {
  const {
    duration = 1.5,
    stagger = 0.02,
    ease = 'power3.out',
    chars = '!<>-_\/[]{}—=+*^?#________'
  } = options

  const split = new SplitText(element, { type: 'chars' })
  const originalChars = split.chars
  const finalLength = finalText.length
  const currentLength = element.textContent?.length || 0

  // Create intermediate steps
  const steps = Math.max(finalLength, currentLength)
  const timeline = gsap.timeline()

  // Scramble phase
  timeline.to(originalChars, {
    duration: duration * 0.3,
    scrambleText: {
      text: finalText,
      chars: chars,
      speed: 0.5
    },
    stagger: stagger,
    ease: 'none'
  })

  // Morph phase
  timeline.to(originalChars, {
    duration: duration * 0.4,
    opacity: 1,
    scale: 1,
    rotation: 0,
    stagger: stagger,
    ease: ease
  })

  // Reveal phase
  timeline.to(element, {
    duration: duration * 0.3,
    scrambleText: {
      text: finalText,
      chars: finalText,
      speed: 0.1
    },
    ease: ease
  })

  return timeline
}

// 3D flip card animation
export const flipCard = (element: HTMLElement, options = {}) => {
  const {
    duration = 0.8,
    ease = 'power3.inOut',
    direction = 'horizontal',
    flipTo = 180
  } = options

  const rotationAxis = direction === 'horizontal' ? 'rotationY' : 'rotationX'

  return gsap.to(element, {
    [rotationAxis]: flipTo,
    duration,
    ease,
    transformStyle: 'preserve-3d',
    transformPerspective: 1000
  })
}

// Particle explosion effect
export const particleExplosion = (element: HTMLElement, options = {}) => {
  const {
    particleCount = 20,
    duration = 1,
    ease = 'power2.out',
    colors = ['#ff0040', '#00ff40', '#4000ff', '#ffff00']
  } = options

  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const particles: HTMLElement[] = []
  const timeline = gsap.timeline()

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.style.position = 'fixed'
    particle.style.width = '4px'
    particle.style.height = '4px'
    particle.style.backgroundColor = colors[i % colors.length]
    particle.style.borderRadius = '50%'
    particle.style.pointerEvents = 'none'
    particle.style.zIndex = '9999'
    particle.style.left = `${centerX}px`
    particle.style.top = `${centerY}px`

    document.body.appendChild(particle)
    particles.push(particle)

    const angle = (i / particleCount) * Math.PI * 2
    const distance = 50 + Math.random() * 100
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance

    timeline.to(particle, {
      x,
      y,
      opacity: 0,
      scale: Math.random() * 2 + 0.5,
      duration,
      ease,
      delay: Math.random() * 0.2
    }, 0)
  }

  // Cleanup
  timeline.call(() => {
    particles.forEach(particle => particle.remove())
  })

  return timeline
}

// Advanced wave animation
export const waveAnimation = (element: HTMLElement, options = {}) => {
  const {
    duration = 2,
    ease = 'sine.inOut',
    amplitude = 20,
    frequency = 0.5,
    stagger = 0.1
  } = options

  const split = new SplitText(element, { type: 'chars' })
  const chars = split.chars

  return gsap.to(chars, {
    y: (i) => Math.sin(i * frequency) * amplitude,
    rotation: (i) => Math.sin(i * frequency) * 10,
    duration,
    ease,
    stagger,
    repeat: -1,
    yoyo: true
  })
}

// Morphing blob effect
export const morphingBlob = (element: HTMLElement, options = {}) => {
  const {
    duration = 3,
    ease = 'sine.inOut',
    complexity = 6
  } = options

  const points = []
  for (let i = 0; i < complexity; i++) {
    points.push({
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100
    })
  }

  const timeline = gsap.timeline({ repeat: -1 })

  points.forEach((point, index) => {
    timeline.to(point, {
      x: 50 + Math.random() * 100,
      y: 50 + Math.random() * 100,
      duration,
      ease,
      onUpdate: () => {
        const path = `M ${points.map((p, i) => 
          `${p.x},${p.y} ${i === 0 ? 'L' : 'Q'} ${p.x},${p.y}`
        ).join(' ')} Z`
        gsap.set(element, { clipPath: `path('${path}')` })
      }
    }, index * 0.2)
  })

  return timeline
}