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
  parallaxEffect,
  textMorph,
  magneticEffect,
  particleExplosion,
  waveAnimation,
  flipCard,
  morphingBlob
} from '@kdx-kit/anim'
import { Button } from '@kdx-kit/ui'

export function AdvancedAnimationShowcase() {
  const [currentEffect, setCurrentEffect] = useState('none')
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const morphRef = useRef<HTMLSpanElement>(null)
  const magneticRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)
  const flipRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
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
    const showcaseElements = document.querySelectorAll('.advanced-showcase-item')
    staggerAnimation(Array.from(showcaseElements), {
      from: { opacity: 0, y: 60, rotationX: -15 },
      to: { opacity: 1, y: 0, rotationX: 0 },
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    })

    return () => tl.kill()
  }, [])

  const handleTextMorph = () => {
    if (morphRef.current) {
      const texts = [
        'Advanced Text Morphing',
        'KodexaLabs Production Magic',
        'Next-Level Animations',
        'Interactive Typography',
        'Motion Design Excellence'
      ]
      const randomText = texts[Math.floor(Math.random() * texts.length)]
      textMorph(morphRef.current, randomText, {
        duration: 2,
        chars: '!<>-_\/[]{}—=+*^?#________'
      })
    }
  }

  const handleParticleExplosion = () => {
    if (magneticRef.current) {
      particleExplosion(magneticRef.current, {
        particleCount: 30,
        colors: ['#ff0040', '#00ff40', '#4000ff', '#ffff00', '#ff00ff']
      })
    }
  }

  const handleWaveAnimation = () => {
    if (waveRef.current) {
      waveAnimation(waveRef.current, {
        amplitude: 25,
        frequency: 0.3,
        duration: 3
      })
    }
  }

  const handleFlipCard = () => {
    if (flipRef.current) {
      flipCard(flipRef.current, {
        direction: 'horizontal',
        duration: 0.8
      })
    }
  }

  const handleMorphingBlob = () => {
    if (blobRef.current) {
      morphingBlob(blobRef.current, {
        duration: 4,
        complexity: 8
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
              Advanced
            </span>
            <span className="block bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Animations
            </span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Experience the next level of KodexaLabs animation technology with advanced
            text morphing, particle systems, magnetic effects, and dynamic transformations.
          </p>
        </div>

        {/* Interactive demo buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleTextMorph}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            🔄 Text Morph
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleParticleExplosion}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            💥 Particle Explosion
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleWaveAnimation}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            🌊 Wave Animation
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleFlipCard}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            🔄 3D Flip
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleMorphingBlob}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            🎨 Morphing Blob
          </Button>
        </div>

        {/* Advanced animations showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Text Morphing */}
          <Motion
            className="advanced-showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Text Morphing</h3>
            <p className="text-gray-300 mb-6">
              Advanced text transformation with smooth morphing between different states.
              Click the button to see dynamic text evolution.
            </p>
            <span 
              ref={morphRef}
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:from-pink-400 hover:to-purple-400 transition-all"
              onClick={handleTextMorph}
            >
              Click to morph text!
            </span>
          </Motion>

          {/* Magnetic Effect */}
          <Motion
            className="advanced-showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'back.out(1.7)' }}
            magnetic={{
              strength: 0.8,
              distance: 150,
              ease: 'power2.out'
            }}
            ref={magneticRef}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Magnetic Effect</h3>
            <p className="text-gray-300 mb-6">
              Interactive magnetic attraction that responds to cursor movement.
              Hover over this card to feel the magnetic pull.
            </p>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto" />
          </Motion>

          {/* Wave Animation */}
          <Motion
            className="advanced-showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Wave Animation</h3>
            <p className="text-gray-300 mb-6">
              Sinusoidal wave motion that creates fluid, organic movement.
              Perfect for text effects and decorative animations.
            </p>
            <div 
              ref={waveRef}
              className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
            >
              W A V E  T E X T
            </div>
          </Motion>

          {/* 3D Flip Card */}
          <Motion
            className="advanced-showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, rotateX: -90 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
            flip={{
              direction: 'horizontal',
              duration: 0.8
            }}
            ref={flipRef}
          >
            <h3 className="text-2xl font-bold text-white mb-4">3D Flip Card</h3>
            <p className="text-gray-300 mb-6">
              Three-dimensional card flip with perspective and depth.
              Click to experience the 3D transformation.
            </p>
            <div className="w-24 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg mx-auto shadow-2xl" />
          </Motion>
        </div>

        {/* Morphing Blob */}
        <Motion
          className="advanced-showcase-item bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mx-auto max-w-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'back.out(1.7)' }}
        >
          <h3 className="text-2xl font-bold text-white mb-4 text-center">Morphing Blob</h3>
          <p className="text-gray-300 mb-8 text-center">
            Organic shape transformation that creates living, breathing animations.
            Watch as the blob continuously morphs and evolves.
          </p>
          <div 
            ref={blobRef}
            className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto cursor-pointer hover:from-cyan-500 hover:to-blue-500 transition-all duration-1000"
            onClick={handleMorphingBlob}
            style={{
              clipPath: 'circle(50% at 50% 50%)'
            }}
          />
        </Motion>

        {/* Floating elements with infinite animations */}
        <Motion
          className="absolute top-20 right-20 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.3, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'sine.inOut'
          }}
        />
        
        <Motion
          className="absolute bottom-32 left-16 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
          animate={{
            y: [0, 50, 0],
            x: [0, -25, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 1
          }}
        />
        
        <Motion
          className="absolute top-1/3 right-8 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 720, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 2
          }}
        />
      </div>
    </section>
  )
}