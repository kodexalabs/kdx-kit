import { HeroSection } from '@/components/HeroSection'
import { FeatureGrid } from '@/components/FeatureGrid'
import { TechStack } from '@/components/TechStack'
import { AnimationShowcase } from '@/components/AnimationShowcase'
import { AdvancedAnimationShowcase } from '@/components/AdvancedAnimationShowcase'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <AnimationShowcase />
      <AdvancedAnimationShowcase />
      <FeatureGrid />
      <TechStack />
    </main>
  )
}