'use client'

import { motion } from '@kdx-kit/anim'

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
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Modern technologies for building exceptional applications.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${tech.color} flex items-center justify-center mb-3`}>
                <span className="text-white font-bold text-sm">{tech.name.charAt(0)}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 text-center">{tech.name}</h3>
              <p className="text-xs text-gray-500 text-center mt-1">{tech.category}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}