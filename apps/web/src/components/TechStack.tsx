'use client'

import { useEffect, useRef } from 'react'
import { Motion, animateText, useGsap, glitchText } from '@kdx-kit/anim'

const techStack = [
  { name: 'React 18', category: 'Frontend', color: 'bg-blue-500' },
  { name: 'Next.js 14', category: 'Framework', color: 'bg-gray-900' },
  { name: 'TypeScript', category: 'Language', color: 'bg-blue-600' },
  { name: 'TailwindCSS', category: 'Styling', color: 'bg-cyan-500' },
  { name: 'GSAP', category: 'Animation', color: 'bg-green-500' },
  { name: 'Node.js', category: 'Backend', color: 'bg-green-600' },
  { name: 'Electron', category: 'Desktop', color: 'bg-blue-700' },
  { name: 'OpenAI API', category: 'AI', color: 'bg-purple-600' },
  { name: 'Gemini API', category: 'AI', color: 'bg-orange-500' },
  { name: 'pnpm', category: 'Package Manager', color: 'bg-yellow-500' },
  { name: 'Turborepo', category: 'Build Tool', color: 'bg-red-500' },
  { name: 'ESLint', category: 'Linting', color: 'bg-purple-500' },
]

export function TechStack() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { createTimeline } = useGsap()

  useEffect(() => {
    const tl = createTimeline()
    
    // Animate title with glitch effect on hover
    if (titleRef.current) {
      animateText(titleRef.current, {
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out'
      })
    }
    
    // Animate subtitle with fade in
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      })
    }

    return () => tl.kill()
  }, [])

  const handleTechHover = (event: React.MouseEvent<HTMLDivElement>) => {
    const nameElement = event.currentTarget.querySelector('h3')
    if (nameElement) {
      glitchText(nameElement)
    }
  }

  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 
            ref={titleRef}
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl cursor-pointer hover:text-primary-600 transition-colors"
          >
            Tech Stack
          </h2>
          <p 
            ref={subtitleRef}
            className="mt-4 text-lg leading-8 text-gray-600"
          >
            Modern technologies for building exceptional applications.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {techStack.map((tech, index) => (
            <Motion
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`tech-item-${index} flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}
              onMouseEnter={handleTechHover}
            >
              <Motion
                className={`w-12 h-12 rounded-lg ${tech.color} flex items-center justify-center mb-3`}
                initial={{ rotate: -180, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 + 0.2, ease: 'back.out(1.7)' }}
              >
                <span className="text-white font-bold text-sm group-hover:animate-pulse">{tech.name.charAt(0)}</span>
              </Motion>
              <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                {tech.name}
              </h3>
              <p className="text-xs text-gray-500 text-center mt-1 group-hover:text-primary-500 transition-colors">
                {tech.category}
              </p>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  )
}