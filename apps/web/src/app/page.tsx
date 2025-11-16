import { HeroSection } from '@/components/HeroSection'
import { FeatureGrid } from '@/components/FeatureGrid'
import { TechStack } from '@/components/TechStack'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <FeatureGrid />
      <TechStack />
    </main>
  )
}