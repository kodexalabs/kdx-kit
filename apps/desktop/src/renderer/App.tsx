import React from 'react'
import { motion } from '@kdx-kit/anim'
import { Button, Card } from '@kdx-kit/ui'

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">KodexaLabs Desktop</h1>
          <p className="text-xl text-blue-200 mb-8">
            Electron + React + GSAP + TailwindCSS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h3 className="text-xl font-semibold mb-3">🚀 Modern Stack</h3>
              <p className="text-slate-300">
                Built with React 18, TypeScript, and Electron for cross-platform compatibility.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h3 className="text-xl font-semibold mb-3">🎬 GSAP Animations</h3>
              <p className="text-slate-300">
                High-performance animations and transitions powered by GSAP.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-6 bg-slate-800 border-slate-700">
              <h3 className="text-xl font-semibold mb-3">🎨 TailwindCSS</h3>
              <p className="text-slate-300">
                Utility-first CSS framework for rapid UI development.
              </p>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default App