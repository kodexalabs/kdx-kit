'use client'

import { motion } from '@kdx-kit/anim'
import { Button } from '@kdx-kit/ui'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            KodexaLabs
            <span className="block text-primary-200">UI Stack</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-primary-100">
            Modular, ultra-responsive UI experiments and production-ready applications
            powered by React 18, Next.js, GSAP, and TailwindCSS.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-600"
            >
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}