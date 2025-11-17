# Asset Registry

Centralized registry for shared assets (icons, images, fonts) used across apps and packages.

## Usage
```ts
import { getAsset } from '@kdx-kit/asset-registry'

const logo = getAsset('logo.primary')
```

## Development
- `pnpm run dev` in `packages/asset-registry`
- `pnpm run build` to generate artifacts

## Notes
- Keep large binaries in `assets/` at repo root and reference via registry.