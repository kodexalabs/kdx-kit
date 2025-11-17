'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Motion, 
  liquidMorph, 
  noiseDistortion, 
  chromaticAberration, 
  scanlineEffect,
  vhsGlitch,
  breathingEffect,
  liquidText,
  neonGlow,
  matrixRain,
  useGsap
} from '@kdx-kit/anim'
import { Button } from '@kdx-kit/ui'

export function KodexaLabsEffectsShowcase() {
  const [activeEffect, setActiveEffect] = useState('none')
  const liquidRef = useRef<HTMLDivElement>(null)
  const noiseRef = useRef<HTMLDivElement>(null)
  const chromaticRef = useRef<HTMLDivElement>(null)
  const scanlineRef = useRef<HTMLDivElement>(null)
  const vhsRef = useRef<HTMLDivElement>(null)
  const breathingRef = useRef<HTMLDivElement>(null)
  const liquidTextRef = useRef<HTMLSpanElement>(null)
  const neonRef = useRef<HTMLDivElement>(null)
  const matrixRef = useRef<HTMLDivElement>(null)
  const { createTimeline } = useGsap()

  useEffect(() => {
    const tl = createTimeline()
    
    // Initialize breathing effect on the main container
    if (breathingRef.current) {
      breathingEffect(breathingRef.current, {
        duration: 4,
        scaleIntensity: 0.02,
        opacityIntensity: 0.1
      })
    }

    // Animate title with liquid text effect
    if (liquidTextRef.current) {
      liquidText(liquidTextRef.current, {
        duration: 3,
        waveAmplitude: 15,
        waveFrequency: 0.4
      })
    }

    // Neon glow effect on subtitle
    if (neonRef.current) {
      neonGlow(neonRef.current, {
        color: '#00ffff',
        intensity: 25,
        pulse: true
      })
    }

    return () => tl.kill()
  }, [])

  const handleLiquidMorph = () => {
    if (liquidRef.current) {
      liquidMorph(liquidRef.current, {
        duration: 2.5,
        intensity: 0.4,
        ease: 'power3.inOut'
      })
    }
  }

  const handleNoiseDistortion = () => {
    if (noiseRef.current) {
      noiseDistortion(noiseRef.current, {
        duration: 2,
        intensity: 25,
        frequency: 0.15
      })
    }
  }

  const handleChromaticAberration = () => {
    if (chromaticRef.current) {
      chromaticAberration(chromaticRef.current, {
        duration: 1.2,
        intensity: 8,
        rgbShift: { r: 3, g: 0, b: -3 }
      })
    }
  }

  const handleVHSGlitch = () => {
    if (vhsRef.current) {
      vhsGlitch(vhsRef.current, {
        duration: 0.8,
        intensity: 8,
        rgbShift: true
      })
    }
  }

  const handleMatrixRain = () => {
    if (matrixRef.current) {
      matrixRain(matrixRef.current, {
        duration: 2,
        chars: '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
        speed: 0.08
      })
    }
  }

  const handleScanlineEffect = () => {
    if (scanlineRef.current) {
      const effect = scanlineEffect(scanlineRef.current, {
        duration: 3,
        lineHeight: 3,
        opacity: 0.4,
        speed: 0.8
      })
      
      // Cleanup after animation
      setTimeout(() => {
        if (effect.cleanup) effect.cleanup()
      }, 3000)
    }
  }

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-br from-black via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background with breathing effect */}
      <div 
        ref={breathingRef}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header with KodexaLabs branding */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h1 
            ref={liquidTextRef}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 font-mono"
          >
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              KODEXALABS
            </span>
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SIGNATURE EFFECTS
            </span>
          </h1>
          
          <p 
            ref={neonRef}
            className="text-xl md:text-2xl leading-relaxed text-gray-300 mb-10 max-w-3xl mx-auto font-mono"
          >
            Experience the premium animation effects that define KodexaLabs production quality.
            Cyberpunk aesthetics, retro futurism, and cutting-edge motion design.
          </p>
        </div>

        {/* Interactive demo buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleLiquidMorph}
            className="bg-cyan-500/20 backdrop-blur-sm border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 font-mono"
          >
            🌊 LIQUID MORPH
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleNoiseDistortion}
            className="bg-purple-500/20 backdrop-blur-sm border-purple-400/30 text-purple-300 hover:bg-purple-500/30 font-mono"
          >
            📺 NOISE DISTORTION
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleChromaticAberration}
            className="bg-pink-500/20 backdrop-blur-sm border-pink-400/30 text-pink-300 hover:bg-pink-500/30 font-mono"
          >
            🌈 CHROMATIC ABERRATION
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleVHSGlitch}
            className="bg-red-500/20 backdrop-blur-sm border-red-400/30 text-red-300 hover:bg-red-500/30 font-mono"
          >
            📼 VHS GLITCH
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleMatrixRain}
            className="bg-green-500/20 backdrop-blur-sm border-green-400/30 text-green-300 hover:bg-green-500/30 font-mono"
          >
            💚 MATRIX RAIN
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={handleScanlineEffect}
            className="bg-blue-500/20 backdrop-blur-sm border-blue-400/30 text-blue-300 hover:bg-blue-500/30 font-mono"
          >
            📺 SCANLINE EFFECT
          </Button>
        </div>

        {/* KodexaLabs signature effects showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Liquid Morph Effect */}
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/20 cyberpunk-border"
            initial={{ opacity: 0, rotateY: -90 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-4 font-mono">LIQUID MORPH</h3>
            <p className="text-gray-300 mb-6 font-mono text-sm">
              Organic shape transformation that creates fluid, living animations.
              Perfect for futuristic UI elements and cyberpunk interfaces.
            </p>
            <div 
              ref={liquidRef}
              className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mx-auto cursor-pointer hover:from-pink-500 hover:to-purple-600 transition-all duration-1000 cyberpunk-glow"
              onClick={handleLiquidMorph}
              style={{
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
              }}
            />
          </Motion>

          {/* Noise Distortion */}
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-purple-400/20"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'back.out(1.7)' }}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4 font-mono">NOISE DISTORTION</h3>
            <p className="text-gray-300 mb-6 font-mono text-sm">
              Digital distortion effect that simulates analog signal interference.
              Creates authentic retro-futuristic aesthetics.
            </p>
            <div 
              ref={noiseRef}
              className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mx-auto cursor-pointer cyberpunk-glow"
              onClick={handleNoiseDistortion}
            />
          </Motion>

          {/* Chromatic Aberration */}
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-pink-400/20"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h3 className="text-2xl font-bold text-pink-400 mb-4 font-mono">CHROMATIC ABERRATION</h3>
            <p className="text-gray-300 mb-6 font-mono text-sm">
              RGB color separation that creates digital lens distortion.
              Signature KodexaLabs effect for premium visual impact.
            </p>
            <div 
              ref={chromaticRef}
              className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg mx-auto cursor-pointer cyberpunk-glow"
              onClick={handleChromaticAberration}
            />
          </Motion>

          {/* VHS Glitch */}
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-red-400/20"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h3 className="text-2xl font-bold text-red-400 mb-4 font-mono">VHS GLITCH</h3>
            <p className="text-gray-300 mb-6 font-mono text-sm">
              Retro analog glitch effect with RGB shifting and scanline flicker.
              Perfect for nostalgic cyberpunk aesthetics.
            </p>
            <div 
              ref={vhsRef}
              className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg mx-auto cursor-pointer cyberpunk-glow font-mono flex items-center justify-center text-white text-2xl"
              onClick={handleVHSGlitch}
            >
              VHS
            </div>
          </Motion>
        </div>

        {/* Matrix Rain and Scanline Effects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Matrix Rain */}
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-green-400/20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">MATRIX RAIN</h3>
            <p className="text-gray-300 mb-6 font-mono text-sm">
              Digital rain effect with Japanese characters and binary code.
              Iconic KodexaLabs signature animation from cyberpunk culture.
            </p>
            <div 
              ref={matrixRef}
              className="w-full h-32 bg-black rounded-lg mx-auto cursor-pointer cyberpunk-glow flex items-center justify-center text-green-400 text-xl font-mono overflow-hidden"
              onClick={handleMatrixRain}
            >
              マトリックス レイン
            </div>
          </Motion>

          {/* Scanline Effect */}
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-blue-400/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'back.out(1.7)' }}
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-4 font-mono">SCANLINE EFFECT</h3>
            <p className="text-gray-300 mb-6 font-mono text-sm">
              Retro CRT monitor scanline animation.
              Creates authentic vintage display aesthetics for KodexaLabs interfaces.
            </p>
            <div 
              ref={scanlineRef}
              className="w-full h-32 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg mx-auto cursor-pointer cyberpunk-glow flex items-center justify-center text-white text-xl font-mono"
              onClick={handleScanlineEffect}
            >
              CRT DISPLAY
            </div>
          </Motion>
        </div>

        {/* Floating cyberpunk elements */}
        <Motion
          className="absolute top-20 right-20 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full cyberpunk-pulse"
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
          className="absolute bottom-32 left-16 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full cyberpunk-pulse"
          animate={{
            y: [0, 40, 0],
            x: [0, -15, 0],
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 1
          }}
        />
        
        <Motion
          className="absolute top-1/3 right-8 w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full cyberpunk-pulse"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.5, 1, 0.5],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'sine.inOut',
            delay: 2
          }}
        />
      </div>

      {/* Custom cyberpunk styles */}
      <style jsx>{`
        .cyberpunk-border {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1);
        }
        .cyberpunk-glow {
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
        }
        .cyberpunk-pulse {
          animation: cyberpunkPulse 2s ease-in-out infinite;
        }
        @keyframes cyberpunkPulse {
          0%, 100% { 
            box-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; 
          }
          50% { 
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor; 
          }
        }
      `}</style>
    </section>
  )
}