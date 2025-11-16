import { gsap } from 'gsap'
import { ScrollTrigger, TextPlugin, ScrollSmoother, SplitText } from '../src/gsap'
import { 
  animateText, 
  textScramble, 
  glitchText, 
  parallaxEffect,
  staggerAnimation,
  scrollReveal,
  animationPresets,
  optimizeForPerformance,
  initSmoothScroll
} from '../src/gsap'

// Test GSAP plugins registration
describe('GSAP Plugins Registration', () => {
  test('All plugins should be registered', () => {
    expect(gsap.plugins).toBeDefined()
    expect(ScrollTrigger).toBeDefined()
    expect(TextPlugin).toBeDefined()
    expect(ScrollSmoother).toBeDefined()
    expect(SplitText).toBeDefined()
  })
})

describe('KodexaLabs Animation Presets', () => {
  test('Animation presets should be defined', () => {
    expect(animationPresets).toBeDefined()
    expect(animationPresets.fadeInUp).toBeDefined()
    expect(animationPresets.fadeInDown).toBeDefined()
    expect(animationPresets.fadeInLeft).toBeDefined()
    expect(animationPresets.fadeInRight).toBeDefined()
    expect(animationPresets.scaleIn).toBeDefined()
    expect(animationPresets.textReveal).toBeDefined()
  })

  test('Animation presets should have correct structure', () => {
    expect(animationPresets.fadeInUp.from).toEqual({ opacity: 0, y: 100 })
    expect(animationPresets.fadeInUp.to).toMatchObject({
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    })
  })
})

describe('Text Animation Functions', () => {
  let mockElement: HTMLElement

  beforeEach(() => {
    mockElement = document.createElement('div')
    mockElement.textContent = 'Test text'
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
  })

  test('animateText should return a GSAP timeline', () => {
    const result = animateText(mockElement)
    expect(result).toBeDefined()
    expect(result.duration).toBeDefined()
  })

  test('textScramble should create scramble animation', () => {
    const result = textScramble(mockElement, 'New text')
    expect(result).toBeDefined()
    expect(result.duration).toBeDefined()
  })

  test('glitchText should create glitch effect', () => {
    const result = glitchText(mockElement)
    expect(result).toBeDefined()
    expect(result.duration).toBeDefined()
  })
})

describe('Scroll and Parallax Effects', () => {
  let mockElement: HTMLElement

  beforeEach(() => {
    mockElement = document.createElement('div')
    document.body.appendChild(mockElement)
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
  })

  test('parallaxEffect should create scroll-triggered animation', () => {
    const result = parallaxEffect(mockElement, 0.5)
    expect(result).toBeDefined()
  })

  test('scrollReveal should create scroll-triggered animation', () => {
    const result = scrollReveal(mockElement)
    expect(result).toBeDefined()
  })
})

describe('Performance Optimizations', () => {
  test('optimizeForPerformance should configure GSAP', () => {
    optimizeForPerformance()
    expect(gsap.config().force3D).toBe(true)
  })
})

describe('Smooth Scroll Initialization', () => {
  test('initSmoothScroll should return ScrollSmoother instance', () => {
    const smoother = initSmoothScroll()
    expect(smoother).toBeDefined()
    expect(smoother.kill).toBeDefined()
    smoother.kill()
  })
})

describe('Staggered Animations', () => {
  let mockElements: HTMLElement[]

  beforeEach(() => {
    mockElements = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div')
    ]
    mockElements.forEach(el => document.body.appendChild(el))
  })

  afterEach(() => {
    mockElements.forEach(el => document.body.removeChild(el))
  })

  test('staggerAnimation should animate multiple elements', () => {
    const result = staggerAnimation(mockElements)
    expect(result).toBeDefined()
    expect(result.duration).toBeDefined()
  })
})