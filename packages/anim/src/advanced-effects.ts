import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// KodexaLabs signature liquid morph effect
export const liquidMorph = (element: HTMLElement, options = {}) => {
  const {
    duration = 2,
    ease = 'power2.inOut',
    intensity = 0.3,
    complexity = 8
  } = options

  const timeline = gsap.timeline()
  
  // Create liquid morphing effect
  timeline.to(element, {
    duration: duration * 0.5,
    scaleX: 1 + intensity,
    scaleY: 1 - intensity * 0.5,
    rotation: 5,
    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    ease: ease
  })
  .to(element, {
    duration: duration * 0.5,
    scaleX: 1 - intensity * 0.5,
    scaleY: 1 + intensity * 0.7,
    rotation: -3,
    borderRadius: '30% 70% 60% 40% / 50% 60% 30% 60%',
    ease: ease
  })

  return timeline
}

// Advanced noise distortion effect
export const noiseDistortion = (element: HTMLElement, options = {}) => {
  const {
    duration = 1.5,
    intensity = 20,
    frequency = 0.1
  } = options

  const timeline = gsap.timeline()
  const filter = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='${frequency}' numOctaves='4' result='noise'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='${intensity}'/%3E%3C/filter%3E%3C/svg%3E#noise")`

  timeline.set(element, { filter })
  .to(element, {
    duration,
    filter: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='${frequency * 2}' numOctaves='6' result='noise'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='${intensity * 1.5}'/%3E%3C/filter%3E%3C/svg%3E#noise")`,
    ease: 'sine.inOut'
  })
  .to(element, {
    duration: duration * 0.5,
    filter: 'none',
    ease: 'power2.out'
  })

  return timeline
}

// Chromatic aberration effect (KodexaLabs signature)
export const chromaticAberration = (element: HTMLElement, options = {}) => {
  const {
    duration = 0.8,
    intensity = 3,
    rgbOffset = { r: 2, g: 0, b: -2 }
  } = options

  const timeline = gsap.timeline()
  
  // Create chromatic aberration using CSS filters
  const createChromaticFilter = (r: number, g: number, b: number) => {
    return `
      drop-shadow(${r}px 0 0 rgba(255, 0, 0, 0.8))
      drop-shadow(${g}px 0 0 rgba(0, 255, 0, 0.8))
      drop-shadow(${b}px 0 0 rgba(0, 0, 255, 0.8))
    `
  }

  timeline.set(element, {
    filter: createChromaticFilter(rgbOffset.r, rgbOffset.g, rgbOffset.b)
  })
  .to(element, {
    duration: duration * 0.3,
    filter: createChromaticFilter(rgbOffset.r * intensity, rgbOffset.g * intensity, rgbOffset.b * intensity),
    ease: 'power2.in'
  })
  .to(element, {
    duration: duration * 0.7,
    filter: 'none',
    ease: 'power2.out'
  })

  return timeline
}

// Advanced scanline effect
export const scanlineEffect = (element: HTMLElement, options = {}) => {
  const {
    duration = 2,
    lineHeight = 2,
    opacity = 0.3,
    speed = 0.5
  } = options

  // Create scanline overlay
  const scanline = document.createElement('div')
  scanline.style.position = 'absolute'
  scanline.style.top = '0'
  scanline.style.left = '0'
  scanline.style.right = '0'
  scanline.style.height = `${lineHeight}px`
  scanline.style.background = `linear-gradient(to bottom, transparent 0%, rgba(255,255,255,${opacity}) 50%, transparent 100%)`
  scanline.style.pointerEvents = 'none'
  scanline.style.zIndex = '1000'

  element.style.position = 'relative'
  element.appendChild(scanline)

  const timeline = gsap.timeline()
  
  timeline.fromTo(scanline, 
    { y: -lineHeight },
    { 
      y: element.offsetHeight + lineHeight,
      duration: duration,
      ease: 'none',
      repeat: -1
    }
  )

  return {
    timeline,
    cleanup: () => scanline.remove()
  }
}

// VHS glitch effect (KodexaLabs retro style)
export const vhsGlitch = (element: HTMLElement, options = {}) => {
  const {
    duration = 0.5,
    intensity = 5,
    rgbShift = true
  } = options

  const timeline = gsap.timeline()
  
  // VHS-style glitch with RGB shift
  if (rgbShift) {
    timeline.set(element, {
      textShadow: `
        ${intensity}px 0 rgba(255,0,0,0.8),
        ${-intensity}px 0 rgba(0,255,0,0.8),
        0 ${intensity}px rgba(0,0,255,0.8)
      `
    })
    .to(element, {
      duration: 0.1,
      x: Math.random() * intensity - intensity/2,
      y: Math.random() * intensity - intensity/2,
      ease: 'none'
    })
    .to(element, {
      duration: 0.1,
      x: Math.random() * intensity - intensity/2,
      y: Math.random() * intensity - intensity/2,
      ease: 'none'
    })
    .to(element, {
      duration: 0.1,
      x: 0,
      y: 0,
      textShadow: 'none',
      ease: 'power2.out'
    })
  }

  // Add scanline flicker
  timeline.to(element, {
    duration: 0.05,
    opacity: 0.8,
    ease: 'none'
  })
  .to(element, {
    duration: 0.05,
    opacity: 1,
    ease: 'none'
  })

  return timeline
}

// Advanced breathing/pulse effect
export const breathingEffect = (element: HTMLElement, options = {}) => {
  const {
    duration = 3,
    scaleIntensity = 0.05,
    opacityIntensity = 0.2,
    ease = 'sine.inOut'
  } = options

  return gsap.to(element, {
    scale: 1 + scaleIntensity,
    opacity: 1 - opacityIntensity,
    duration: duration / 2,
    ease: ease,
    yoyo: true,
    repeat: -1
  })
}

// Liquid text effect (KodexaLabs premium)
export const liquidText = (element: HTMLElement, options = {}) => {
  const {
    duration = 2,
    waveAmplitude = 10,
    waveFrequency = 0.5,
    stagger = 0.05
  } = options

  const split = new SplitText(element, { type: 'chars' })
  const chars = split.chars

  return gsap.to(chars, {
    y: (i) => Math.sin(i * waveFrequency) * waveAmplitude,
    rotation: (i) => Math.sin(i * waveFrequency) * 5,
    scaleY: (i) => 1 + Math.sin(i * waveFrequency) * 0.1,
    duration: duration,
    ease: 'sine.inOut',
    stagger: stagger,
    yoyo: true,
    repeat: -1
  })
}

// Neon glow effect
export const neonGlow = (element: HTMLElement, options = {}) => {
  const {
    duration = 1.5,
    color = '#00ffff',
    intensity = 20,
    pulse = true
  } = options

  const timeline = gsap.timeline()
  
  if (pulse) {
    timeline.to(element, {
      textShadow: `
        0 0 ${intensity}px ${color},
        0 0 ${intensity * 2}px ${color},
        0 0 ${intensity * 3}px ${color}
      `,
      duration: duration / 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    })
  } else {
    timeline.set(element, {
      textShadow: `
        0 0 ${intensity}px ${color},
        0 0 ${intensity * 2}px ${color},
        0 0 ${intensity * 3}px ${color}
      `
    })
  }

  return timeline
}

// Matrix rain effect
export const matrixRain = (element: HTMLElement, options = {}) => {
  const {
    duration = 3,
    chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    speed = 0.1
  } = options

  const split = new SplitText(element, { type: 'chars' })
  const originalText = element.textContent || ''

  return gsap.to(split.chars, {
    textContent: () => chars[Math.floor(Math.random() * chars.length)],
    duration: speed,
    ease: 'none',
    stagger: {
      each: speed * 0.1,
      from: 'start'
    },
    onComplete: () => {
      gsap.set(element, { textContent: originalText })
    }
  })
}