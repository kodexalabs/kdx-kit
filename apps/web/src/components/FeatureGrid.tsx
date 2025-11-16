'use client'

import { useEffect, useRef } from 'react'
import { Motion, animateText, textScramble, glitchText, useGsap } from '@kdx-kit/anim'
import { Card } from '@kdx-kit/ui'

const features = [
  {
    title: 'React 18 + Next.js',
    description: 'Modern React with server-side rendering and static generation for optimal performance.',
    icon: '⚛️',
  },
  {
    title: 'GSAP Animations',
    description: 'High-performance timeline-based animations and motion choreographies.',
    icon: '🎬',
  },
  {
    title: 'TailwindCSS',
    description: 'Utility-first CSS framework for rapid iteration and responsive design.',
    icon: '🎨',
  },
  {
    title: 'TypeScript',
    description: 'Full type safety across the entire stack with modern ES features.',
    icon: '🔒',
  },
  {
    title: 'AI Integration',
    description: 'Built-in OpenAI and Gemini API integration for intelligent features.',
    icon: '🤖',
  },
  {
    title: 'Monorepo Architecture',
    description: 'Scalable pnpm workspaces with Turborepo for efficient builds.',
    icon: '🏗️',
  },
]

export function FeatureGrid() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { createTimeline } = useGsap()

  useEffect(() => {
    const tl = createTimeline()
    
    // Animate title with text reveal
    if (titleRef.current) {
      animateText(titleRef.current, {
        duration: 1.2,
        stagger: 0.05,
        ease: 'power3.out'
      })
    }
    
    // Animate subtitle with fade in
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })
    }

    return () => tl.kill()
  }, [])

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 
            ref={titleRef}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Powerful Features
          </h2>
          <p 
            ref={subtitleRef}
            className="mt-4 text-lg leading-8 text-gray-600"
          >
            Everything you need to build modern, responsive, and performant applications.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <Motion
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              scrollTrigger={{
                trigger: `.feature-card-${index}`,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
              }}
            >
              <Card className={`feature-card-${index} h-full p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group`}>
                <Motion
                  className="text-4xl mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.2, ease: 'back.out(1.7)' }}
                >
                  {feature.icon}
                </Motion>
                <h3 className="text-lg font-semibold leading-7 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </Card>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}