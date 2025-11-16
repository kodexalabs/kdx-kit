'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Motion, 
  animateText, 
  textScramble, 
  glitchText, 
  useGsap, 
  staggerAnimation,
  scrollReveal,
  parallaxEffect 
} from '@kdx-kit/anim'
import { Button } from '@kdx-kit/ui'

export function AnimationShowcase() {
  const [currentEffect, setCurrentEffect] = useState('none')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrambleRef = useRef<HTMLSpanElement>(null)
  const glitchRef = useRef<HTMLSpanElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const { createTimeline, createScrollTrigger } = useGsap()

  useEffect(() => {
    const tl = createTimeline()
    
    // Advanced text reveal with split text
    if (titleRef.current) {
      animateText(titleRef.current, {
        duration: 2,
        stagger: 0.04,
        ease: 'power3.out'
      })
    }
    
    // Staggered subtitle animation
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
      })
    }

    // Parallax effect for background elements
    if (parallaxRef.current) {
      parallaxEffect(parallaxRef.current, 0.3)
    }

    // Scroll-triggered animations for showcase elements
    const showcaseElements = document.querySelectorAll('.showcase-item')
    staggerAnimation(Array.from(showcaseElements), {
      from: { opacity: 0, y: 60, rotationX: -15 },
      to: { opacity: 1, y: 0, rotationX: 0 },
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    })

    return () => tl.kill()
  }, [])

  const handleScrambleDemo = () => {
    if (scrambleRef.current) {
      const texts = [
        'KodexaLabs Production Effects',
        'Advanced Text Animations',
        'GSAP Power Features',
        'Smooth Scrolling Magic',
        'Interactive Typography'
      ]
      const randomText = texts[Math.floor(Math.random() * texts.length)]
      textScramble(scrambleRef.current, randomText, {
        duration: 2,
        speed: 0.4
      })
    }
  }

  const handleGlitchDemo = () => {
    if (glitchRef.current) {
      glitchText(glitchRef.current)
    }
  }

  const handleTextReveal = () => {
    if (titleRef.current) {
      animateText(titleRef.current, {
        duration: 1.5,
        stagger: 0.03,
        ease: 'power3.out'
      })
    }
  }

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Parallax background elements */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with text animations */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
          >
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              KodexaLabs
            </span>
            <span className="block bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Animation Showcase
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Experience the full power of GSAP animations, smooth scrolling, text effects,
            and interactive motion design that defines KodexaLabs production quality.
          </p>
        </div>

        {/* Interactive demo buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleTextReveal}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            🎯 Text Reveal
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleScrambleDemo}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            🔀 Text Scramble
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleGlitchDemo}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            ⚡ Glitch Effect
          </Button>
        </div>

        {/* Text effects showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Text Scramble Effect</h3>
            <p className="text-gray-300 mb-6">
              Click the button above to see the text scramble animation in action.
              This effect creates a cyberpunk-style text transformation.
            </p>
            <span 
              ref={scrambleRef}
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              Click the scramble button!
            </span>
          </div>

          <div className="showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">Glitch Effect</h3>
            <p className="text-gray-300 mb-6">
              Experience the digital distortion effect that creates a futuristic,
              tech-inspired visual impact.
            </p>
            <span 
              ref={glitchRef}
              className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
            >
              Hover to glitch!
            </span>
          </div>
        </div>

        {/* Advanced animations showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Motion
            className="showcase-item bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <div className="text-4xl mb-4">🎭</div>
            <h4 className="text-lg font-semibold text-white mb-2">Split Text Animation</h4>
            <p className="text-gray-300 text-sm">
              Characters, words, and lines animate independently for sophisticated typography effects.
            </p>
          </Motion>

          <Motion
            className="showcase-item bg-gradient-to-br from-green-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'back.out(1.7)' }}
          >
            <div className="text-4xl mb-4">🎪</div>
            <h4 className="text-lg font-semibold text-white mb-2">Staggered Animations</h4>
            <p className="text-gray-300 text-sm">
              Elements animate in sequence with customizable delays and timing.
            </p>
          </Motion>

          <Motion
            className="showcase-item bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-lg font-semibold text-white mb-2">Scroll Triggers</h4>
            <p className="text-gray-300 text-sm">
              Animations triggered by scroll position with precise control over timing.
            </p>
          </Motion>
        </div>

        {/* Floating elements with infinite animations */}
        <Motion
          className="absolute top-20 right-20 w-6 h-6 bg-yellow-400 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'sine.inOut'
          }}
        />
        
        <Motion
          className="absolute bottom-32 left-16 w-4 h-4 bg-pink-400 rounded-full"
          animate={{
            y: [0, 40, 0],
            x: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 360]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 1
          }}
        />
        
        <Motion
          className="absolute top-1/2 left-8 w-3 h-3 bg-cyan-400 rounded-full"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 2
          }}
        />
      </div>
    </section>
  )
}