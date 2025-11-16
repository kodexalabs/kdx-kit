# KodexaLabs Animation System

This document outlines the comprehensive animation system built for KodexaLabs production applications, featuring GSAP integration, smooth scrolling (Lelis), and advanced text effects.

## 🎬 Core Features

### 1. Smooth Scrolling (Lelis)
- **ScrollSmoother Integration**: Native GSAP ScrollSmoother for buttery-smooth scrolling
- **Performance Optimized**: Configured for optimal performance across devices
- **Touch Support**: Smooth scrolling on mobile devices
- **Normalization**: Consistent scroll behavior across browsers

```typescript
import { useSmoothScroll } from '@kdx-kit/anim'

function App() {
  useSmoothScroll({
    smooth: 2,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
    ignoreMobileResize: true
  })
}
```

### 2. Text Animation Effects

#### Text Reveal with SplitText
- **Character-by-character**: Animate individual characters
- **Word-by-word**: Animate complete words
- **Line-by-line**: Animate text lines
- **Customizable timing**: Flexible duration and easing

```typescript
import { animateText } from '@kdx-kit/anim'

// Split text animation
animateText(element, {
  duration: 1.5,
  stagger: 0.03,
  ease: 'power3.out'
})
```

#### Text Scramble Effect (KodexaLabs Favorite)
- **Cyberpunk aesthetic**: Digital text transformation
- **Customizable characters**: Define scramble character set
- **Smooth transitions**: Seamless text morphing
- **Interactive**: Trigger on hover, click, or scroll

```typescript
import { textScramble } from '@kdx-kit/anim'

// Scramble effect
textScramble(element, 'Final text', {
  duration: 2,
  speed: 0.4
})
```

#### Glitch Effect
- **Digital distortion**: RGB color separation
- **Quick animations**: Subtle glitch timing
- **Interactive**: Perfect for hover effects
- **Customizable colors**: Adjust glitch color palette

```typescript
import { glitchText } from '@kdx-kit/anim'

// Glitch effect
glitchText(element)
```

### 3. Advanced Scroll-Triggered Animations

#### ScrollReveal
- **Viewport-based**: Trigger when elements enter viewport
- **Flexible triggers**: Custom start/end points
- **Toggle actions**: Play, pause, reverse, complete
- **Performance optimized**: Efficient scroll listeners

```typescript
import { scrollReveal } from '@kdx-kit/anim'

// Scroll-triggered reveal
scrollReveal(element, {
  trigger: element,
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse'
})
```

#### Parallax Effects
- **Vertical parallax**: Background movement on scroll
- **Horizontal parallax**: Side-to-side movement
- **Speed control**: Adjustable parallax intensity
- **Smooth scrubbing**: Synchronized with scroll

```typescript
import { parallaxEffect } from '@kdx-kit/anim'

// Parallax effect
parallaxEffect(element, 0.5) // 50% parallax speed
```

### 4. Animation Presets

#### Production-Ready Presets
- **fadeInUp**: Classic upward fade
- **fadeInDown**: Downward fade entrance
- **fadeInLeft/Right**: Side entrance animations
- **scaleIn**: Zoom entrance with bounce
- **rotateIn**: Rotational entrance
- **textReveal**: Typography-focused reveal

```typescript
import { animationPresets } from '@kdx-kit/anim'

// Use preset animations
gsap.fromTo(element, 
  animationPresets.fadeInUp.from,
  animationPresets.fadeInUp.to
)
```

### 5. Motion Component

#### React Integration
- **Declarative API**: React-friendly animation syntax
- **Lifecycle hooks**: onStart, onComplete, onUpdate
- **Text animation support**: Built-in SplitText integration
- **Parallax ready**: Easy parallax implementation
- **Scroll trigger**: Native scroll-triggered animations

```tsx
import { Motion } from '@kdx-kit/anim'

<Motion
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: 'power3.out' }}
  textAnimation={{
    type: 'chars',
    stagger: 0.02,
    scramble: true
  }}
>
  Animated Content
</Motion>
```

### 6. Performance Optimizations

#### GSAP Configuration
- **force3D**: Hardware acceleration enabled
- **nullTargetWarn**: Disabled for cleaner console
- **trialWarn**: Disabled for production
- **ScrollTrigger optimization**: Efficient scroll handling

```typescript
import { optimizeForPerformance } from '@kdx-kit/anim'

// Apply performance optimizations
optimizeForPerformance()
```

## 🎯 Implementation Examples

### Hero Section with Advanced Animations
```tsx
'use client'

import { useEffect, useRef } from 'react'
import { animateText, textScramble, glitchText, useGsap } from '@kdx-kit/anim'

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const { createTimeline } = useGsap()

  useEffect(() => {
    const tl = createTimeline()
    
    // Advanced text reveal
    if (titleRef.current) {
      animateText(titleRef.current, {
        duration: 1.5,
        stagger: 0.03,
        ease: 'power3.out'
      })
    }

    return () => tl.kill()
  }, [])

  const handleGlitch = () => {
    if (titleRef.current) {
      glitchText(titleRef.current)
    }
  }

  return (
    <section className="hero-section">
      <h1 ref={titleRef} onMouseEnter={handleGlitch}>
        KodexaLabs Production Stack
      </h1>
    </section>
  )
}
```

### Interactive Text Effects
```tsx
const handleScramble = () => {
  if (elementRef.current) {
    textScramble(elementRef.current, 'New scrambled text', {
      duration: 2,
      speed: 0.3
    })
  }
}

const handleGlitch = () => {
  if (elementRef.current) {
    glitchText(elementRef.current)
  }
}
```

## 🚀 Production Features

### 1. Smooth Scrolling (Lelis)
- ✅ **ScrollSmoother integration**
- ✅ **Performance optimized**
- ✅ **Touch device support**
- ✅ **Cross-browser consistency**

### 2. Text Animation Effects
- ✅ **SplitText integration**
- ✅ **Text scramble effect**
- ✅ **Glitch effect**
- ✅ **Character/word/line animations**

### 3. Advanced Animations
- ✅ **Scroll-triggered animations**
- ✅ **Parallax effects**
- ✅ **Staggered animations**
- ✅ **Performance optimizations**

### 4. React Integration
- ✅ **Motion component**
- ✅ **Custom hooks**
- ✅ **TypeScript support**
- ✅ **Lifecycle management**

## 📱 Browser Support
- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+

## 🔧 Performance Considerations
- **Hardware acceleration**: force3D enabled
- **Efficient scroll listeners**: ScrollTrigger optimized
- **Memory management**: Proper cleanup on unmount
- **Mobile optimizations**: Touch-friendly animations
- **Reduced motion support**: Respects user preferences

## 🎨 Design Principles
- **Subtle sophistication**: Elegant, not overwhelming
- **Performance first**: Smooth 60fps animations
- **Accessibility**: Respects user preferences
- **Mobile-first**: Optimized for touch devices
- **Production-ready**: Tested and optimized

This animation system provides KodexaLabs with a comprehensive toolkit for creating stunning, performant web experiences that align with production standards.