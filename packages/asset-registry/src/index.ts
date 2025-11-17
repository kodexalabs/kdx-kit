export type LogoKey = 'primary' | 'mark' | 'loading1' | 'loading2' | 'loading3'

export const logos: Record<LogoKey, string> = {
  primary: '/assets/logos/k-logo.svg',
  mark: '/assets/logos/kspace-mark.svg',
  loading1: '/assets/logos/K_loading_p1.svg',
  loading2: '/assets/logos/K_loading_p2.svg',
  loading3: '/assets/logos/K_loading_p3.svg',
}

export function getLogo(key: LogoKey) {
  return logos[key]
}

export const fonts = {
  powerGrotesk: {
    regular: '/assets/fonts/PowerGrotesk-Regular.woff2',
    medium: '/assets/fonts/PowerGrotesk-Medium.woff2',
    bold: '/assets/fonts/PowerGrotesk-Bold.woff2',
    black: '/assets/fonts/PowerGrotesk-Black.woff2',
  },
}

export type Target = 'web' | 'desktop'

export function resolveAssetPath(target: Target, p: string) {
  if (target === 'desktop') return p.replace(/^\//, '')
  return p
}

export default { logos, getLogo, fonts, resolveAssetPath }