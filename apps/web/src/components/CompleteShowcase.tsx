/**
 * KodexaLabs Complete Showcase
 * Demonstrates all animation systems, performance optimizations, and micro-interactions
 */

'use client'

import { useEffect, useState } from 'react'
import { 
  Motion, 
  useGsap, 
  usePerformanceMonitor,
  detectDeviceCapabilities,
  useHoverInteraction,
  useRippleEffect,
  useRevealOnScroll,
  useStaggerAnimation,
  usePulseAnimation,
  EnhancedButton,
  liquidMorph,
  textScramble,
  glitchText,
  breathingEffect,
  neonGlow,
  matrixRain,
  noiseDistortion,
  chromaticAberration,
  vhsGlitch,
  scanlineEffect
} from '@kdx-kit/anim'
import { Button } from '@kdx-kit/ui'

export function CompleteShowcase() {
  const [activeDemo, setActiveDemo] = useState('performance')
  const [isClient, setIsClient] = useState(false)
  const { createTimeline } = useGsap()
  const metrics = usePerformanceMonitor()
  const deviceConfig = detectDeviceCapabilities()

  // Client-side only rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Reveal animations
  const titleRef = useRevealOnScroll<HTMLHeadingElement>()
  const subtitleRef = useRevealOnScroll<HTMLParagraphElement>({ delay: 0.2 })
  const cardContainerRef = useStaggerAnimation([1, 2, 3, 4, 5, 6], { stagger: 0.1 })
  const pulseRef = usePulseAnimation<HTMLDivElement>({ duration: 3 })

  // Micro-interaction refs
  const hoverButtonRef = useHoverInteraction<HTMLButtonElement>()
  const rippleButtonRef = useRippleEffect<HTMLButtonElement>()

  const demos = [
    { id: 'performance', name: 'Performance Monitor', icon: '📊' },
    { id: 'micro', name: 'Micro-interactions', icon: '✨' },
    { id: 'advanced', name: 'Advanced Effects', icon: '🎨' },
    { id: 'mobile', name: 'Mobile Optimized', icon: '📱' }
  ]

  const handleAdvancedEffect = (effect: string, element: HTMLElement) => {
    switch (effect) {
      case 'liquid':
        liquidMorph(element, { duration: 2, intensity: 0.3 })
        break
      case 'glitch':
        glitchText(element)
        break
      case 'scramble':
        textScramble(element, 'KodexaLabs Production Quality')
        break
      case 'neon':
        neonGlow(element, { color: '#00ffff', intensity: 20 })
        break
      case 'matrix':
        matrixRain(element, { duration: 1.5, chars: '01アイウエオ' })
        break
      case 'vhs':
        vhsGlitch(element, { duration: 0.8, intensity: 6 })
        break
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div ref={pulseRef} className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-purple-400/30">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              KodexaLabs Complete Animation System
            </span>
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Production-Ready
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Animation System
            </span>
          </h1>
          
          <p ref={subtitleRef} className="text-xl text-gray-300 max-w-3xl mx-auto">
            Complete showcase of KodexaLabs animation technologies with performance monitoring,
            micro-interactions, mobile optimization, and advanced effects.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {demos.map((demo) => (
            <Button
              key={demo.id}
              variant={activeDemo === demo.id ? 'secondary' : 'outline'}
              onClick={() => setActiveDemo(demo.id)}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <span className="mr-2">{demo.icon}</span>
              {demo.name}
            </Button>
          ))}
        </div>

        {/* Performance Monitor Demo */}
        {activeDemo === 'performance' && (
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-green-400/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">🚀 Performance Monitor</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{metrics.fps}</div>
                <div className="text-sm text-gray-400">FPS</div>
                <div className={`h-1 rounded-full mt-2 ${
                  metrics.fps > 50 ? 'bg-green-500' : metrics.fps > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{metrics.memoryUsage.toFixed(1)}MB</div>
                <div className="text-sm text-gray-400">Memory Usage</div>
                <div className={`h-1 rounded-full mt-2 ${
                  metrics.memoryUsage < 50 ? 'bg-green-500' : metrics.memoryUsage < 100 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{metrics.animationCount}</div>
                <div className="text-sm text-gray-400">Active Animations</div>
                <div className={`h-1 rounded-full mt-2 ${
                  metrics.animationCount < 20 ? 'bg-green-500' : metrics.animationCount < 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{deviceConfig.fpsTarget}fps</div>
                <div className="text-sm text-gray-400">Target FPS</div>
                <div className="h-1 bg-cyan-500 rounded-full mt-2" />
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-4">
                Device: {deviceConfig.lowEndDevice ? 'Low-end' : 'High-end'} | 
                GPU Acceleration: {deviceConfig.gpuAcceleration ? 'Enabled' : 'Disabled'} | 
                Reduced Motion: {deviceConfig.reduceMotion ? 'Active' : 'Inactive'}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <EnhancedButton variant="primary">
                  Test Performance
                </EnhancedButton>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Optimize Settings
                </Button>
              </div>
            </div>
          </Motion>
        )}

        {/* Micro-interactions Demo */}
        {activeDemo === 'micro' && (
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">✨ Micro-interactions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Hover Effects</h3>
                <div className="space-y-4">
                  <Button ref={hoverButtonRef} variant="secondary" className="w-full">
                    Hover Me
                  </Button>
                  <div className="bg-gray-700/50 rounded-lg p-4" ref={useHoverInteraction({ scale: 1.02 })}>
                    Card Hover Effect
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Ripple Effects</h3>
                <div className="space-y-4">
                  <Button ref={rippleButtonRef} variant="outline" className="w-full border-white/30 text-white">
                    Click for Ripple
                  </Button>
                  <EnhancedButton variant="primary" className="w-full">
                    Enhanced Button
                  </EnhancedButton>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Reveal Animations</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-lg p-4" ref={useRevealOnScroll({ delay: 0.1 })}>
                    Scroll to Reveal
                  </div>
                  <div className="bg-gradient-to-r from-pink-600/50 to-red-600/50 rounded-lg p-4" ref={useRevealOnScroll({ delay: 0.3 })}>
                    Staggered Animation
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        )}

        {/* Advanced Effects Demo */}
        {activeDemo === 'advanced' && (
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">🎨 Advanced Effects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={cardContainerRef}>
              {[
                { name: 'Liquid Morph', effect: 'liquid', color: 'from-cyan-500 to-blue-600' },
                { name: 'Glitch Text', effect: 'glitch', color: 'from-red-500 to-pink-600' },
                { name: 'Text Scramble', effect: 'scramble', color: 'from-green-500 to-emerald-600' },
                { name: 'Neon Glow', effect: 'neon', color: 'from-blue-500 to-cyan-600' },
                { name: 'Matrix Rain', effect: 'matrix', color: 'from-green-600 to-emerald-700' },
                { name: 'VHS Glitch', effect: 'vhs', color: 'from-purple-500 to-pink-600' }
              ].map((item, index) => (
                <div
                  key={item.effect}
                  className={`bg-gradient-to-br ${item.color} rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105`}
                  onClick={(e) => handleAdvancedEffect(item.effect, e.currentTarget)}
                >
                  <h3 className="text-white font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-white/80 text-sm">Click to activate</p>
                </div>
              ))}
            </div>
          </Motion>
        )}

        {/* Mobile Optimization Demo */}
        {activeDemo === 'mobile' && (
          <Motion
            className="bg-black/40 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'power3.out' }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">📱 Mobile Optimized</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Device Detection</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-3">
                    <span className="text-gray-300">Device Type:</span>
                    <span className="text-white font-medium">{deviceConfig.lowEndDevice ? 'Low-end' : 'High-end'}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-3">
                    <span className="text-gray-300">FPS Target:</span>
                    <span className="text-white font-medium">{deviceConfig.fpsTarget}fps</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-3">
                    <span className="text-gray-300">GPU Acceleration:</span>
                    <span className="text-white font-medium">{deviceConfig.gpuAcceleration ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-800/50 rounded-lg p-3">
                    <span className="text-gray-300">Reduced Motion:</span>
                    <span className="text-white font-medium">{deviceConfig.reduceMotion ? 'Active' : 'Inactive'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Optimizations</h3>
                <div className="space-y-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-green-400 font-medium">✓ Automatic Quality Reduction</div>
                    <div className="text-gray-400 text-sm">Reduces animation complexity on low-end devices</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-blue-400 font-medium">✓ Memory Management</div>
                    <div className="text-gray-400 text-sm">Efficient memory usage and cleanup</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-purple-400 font-medium">✓ Frame Rate Limiting</div>
                    <div className="text-gray-400 text-sm">Adaptive frame rate based on device capability</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-yellow-400 font-medium">✓ Accessibility Support</div>
                    <div className="text-gray-400 text-sm">Respects prefers-reduced-motion preference</div>
                  </div>
                </div>
              </div>
            </div>
          </Motion>
        )}

        {/* Footer */}
        <Motion
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="text-gray-400 mb-6">
            Experience the complete KodexaLabs animation system with production-ready performance,
            accessibility, and mobile optimization.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
              🚀 Get Started
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              📖 Documentation
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              💻 View on GitHub
            </Button>
          </div>
        </Motion>
      </div>

      {/* Floating elements */}
      {isClient && (
        <>
          <Motion
            className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
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
            className="absolute bottom-32 left-16 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
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
        </>
      )}
    </section>
  )
}