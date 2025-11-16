'use client'

import { motion } from '@kdx-kit/anim'
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
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Everything you need to build modern, responsive, and performant applications.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}