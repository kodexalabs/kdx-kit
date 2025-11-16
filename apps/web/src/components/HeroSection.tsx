'use client'

import { useEffect, useRef } from 'react'
import { Motion, useGsap, animateText, textScramble, glitchText, scrollReveal } from '@kdx-kit/anim'
import { Button } from '@kdx-kit/ui'

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { createTimeline } = useGsap()

  useEffect(() => {
    const tl = createTimeline()
    
    // Advanced text reveal animation
    if (titleRef.current) {
      animateText(titleRef.current, {
        duration: 1.5,
        stagger: 0.03,
        ease: 'power3.out'
      })
    }
    
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      })
    }
    
    // Button animations
    tl.from('.hero-button', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    })
    
    // Background parallax effect
    tl.to('.hero-bg', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => tl.kill()
  }, [])

  const handleGlitch = () => {
    if (titleRef.current) {
      glitchText(titleRef.current)
    }
  }

  const handleScramble = () => {
    if (subtitleRef.current) {
      textScramble(subtitleRef.current, 'Experience the future of web development with AI-powered tools and stunning animations')
    }
  }

  return (
    <section className="hero-section relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-blue-900 py-24 sm:py-32 min-h-screen flex items-center">
      {/* Animated background */}
      <div className="hero-bg absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <Motion
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'power3.out' }}
        >
          <Motion
            className="inline-block mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-primary-700/50 backdrop-blur-sm rounded-full text-sm font-medium text-primary-100 border border-primary-600/50">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              KodexaLabs Production Stack
            </span>
          </Motion>
          
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
          >
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              KodexaLabs
            </span>
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              UI Stack
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl leading-relaxed text-primary-100 mb-10 max-w-3xl mx-auto"
          >
            Modular, ultra-responsive UI experiments and production-ready applications
            powered by React 18, Next.js, GSAP, and AI integration. Experience the future
            of web development with stunning animations and intelligent features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="hero-button bg-white text-primary-600 hover:bg-primary-50 font-semibold px-8 py-4 text-lg"
              onMouseEnter={handleGlitch}
            >
              🚀 Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hero-button border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm"
              onMouseEnter={handleScramble}
            >
              📖 View Documentation
            </Button>
          </div>
        </Motion>
        
        {/* Floating elements */}
        <Motion
          className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'sine.inOut'
          }}
        />
        
        <Motion
          className="absolute bottom-20 right-10 w-6 h-6 bg-pink-400 rounded-full"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 0.5
          }}
        />
        
        <Motion
          className="absolute top-1/3 right-20 w-3 h-3 bg-cyan-400 rounded-full"
          animate={{
            x: [-10, 10, -10],
            y: [-5, 5, -5],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 1
          }}
        />
      </div>
      
      {/* Scroll indicator */}
      <Motion
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'sine.inOut'
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </div>
      </Motion>
    </section>
  )
}