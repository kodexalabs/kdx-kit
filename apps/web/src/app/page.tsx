import { HeroSection } from '@/components/HeroSection'
import { FeatureGrid } from '@/components/FeatureGrid'
import { TechStack } from '@/components/TechStack'
import { AnimationShowcase } from '@/components/AnimationShowcase'
import { AdvancedAnimationShowcase } from '@/components/AdvancedAnimationShowcase'
import { KodexaLabsEffectsShowcase } from '@/components/KodexaLabsEffectsShowcase'
import { CompleteShowcase } from '@/components/CompleteShowcase'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <HeroSection />
      <AnimationShowcase />
      <AdvancedAnimationShowcase />
      <KodexaLabsEffectsShowcase />
      <CompleteShowcase />
      <FeatureGrid />
      <TechStack />
    </main>
  )
}