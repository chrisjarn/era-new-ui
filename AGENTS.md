# ERA Safety Website

Marketing website for ERA Safety, the closed-loop emergency response platform.

## Key Points

1. This is a marketing site for ERA Safety, not the platform itself
2. ERA Safety is a "platform" -- the closed-loop emergency response platform
3. Voice is professional, authoritative, and safety-focused
4. SEO metadata lives in `app/layout.tsx` and `package.json`
5. AI agent discovery endpoint is at `/llms.txt`

## What is ERA Safety?

ERA Safety is the closed-loop emergency response platform that captures hazards, trains your people, runs your drills, manages real emergencies, and proves you did it right.

The five phases: Capture, Train, Simulate, Manage, Improve.

- Hazard and incident reporting from any device
- Warden training and compliance tracking
- Drill planning with real-time headcounts
- Live emergency dashboards
- Auditable records for regulators

## Tech Stack

- **Next.js 16** - App Router, Turbopack, Cache Components
- **React 19** - Latest React with React Compiler enabled
- **Tailwind CSS 4** - CSS-first configuration
- **TypeScript** - Strict mode
- **Biome** - Linting and formatting
- **Bun** - Package manager and runtime
- **GSAP** - Animations
- **React Three Fiber** - WebGL/3D graphics

## Repository Structure

```
app/
├── (pages)/home/       # Landing page sections (hero, features, pricing, etc.)
├── blog/               # Blog with MDX posts
├── layout.tsx          # Root layout with metadata and JSON-LD
└── sitemap.ts          # Dynamic sitemap generation

components/
├── blog/               # Blog components
├── button/             # CTA buttons
├── image/              # Image wrapper (always use this, not next/image)
├── link/               # Link wrapper (auto-detects external)
├── gsap/               # GSAP runtime and animations
└── ...                 # UI components

libs/
├── config.tsx          # Site configuration and links
└── get-posts.ts        # Blog post utilities

styles/                 # Global styles, Tailwind config
webgl/                  # 3D graphics and WebGL components
orchestra/              # Debug tools (CMD+O to toggle)
```

## Key Files

- `app/layout.tsx` - Site metadata, SEO, JSON-LD structured data
- `public/llms.txt` - Plain text endpoint for AI agents (summary)
- `public/llms-full.txt` - Full site content for AI agents
- `scripts/generate-llms-full.ts` - Generator for llms-full.txt
- `package.json` - Site description (used in metadata)
- `libs/config.tsx` - Site configuration, footer

## Creating Pages

Pages separate content from presentation. See `app/(pages)/contact-us/` for reference:
- `data.ts` - Content and copy
- `page.tsx` - React component (imports from data.ts)

**Important:** When adding a new page or section, you must also add its content to `scripts/generate-llms-full.ts` so AI agents can discover it. The file is generated automatically during `bun build`.

## Commands

```bash
# Development
bun install
bun dev

# Build
bun build
bun start

# Code quality
bun lint
bun lint:fix
bun typecheck

# Utilities
bun setup:styles            # Generate style files
bun validate:env            # Check environment variables
bun cleanup:integrations    # List unused integrations
bun analyze                 # Bundle analysis
```

## Styling

### CSS Modules
Components use CSS modules with the `s` import convention:

```tsx
import s from './component.module.css'

function Component() {
  return <div className={s.wrapper} />
}
```

### Responsive Design
Custom viewport functions:

```css
.element {
  width: mobile-vw(150);    /* 150px at mobile viewport */
  height: desktop-vh(100);  /* 100px at desktop viewport */
}
```

## Debug Tools

Toggle with `Cmd/Ctrl + O`:
- Theatre.js Studio - Visual animation editor
- FPS Meter - Performance monitoring
- Grid Overlay - Layout debugging
- Minimap - Page overview

## Important Notes

**Images & Links**
- Always use `~/components/link` (auto-detects external, smart prefetch)
- Always use `~/components/image` for DOM (never `next/image` directly)
- Use `~/webgl/components/image` in WebGL contexts

**GSAP & Animation**
- `<GSAPRuntime />` is in `app/layout.tsx` for ScrollTrigger + Lenis
- No manual ticker setup needed

**React Compiler**
- Enabled automatically (`reactCompiler: true`)
- No need for manual `useMemo`, `useCallback`, or `React.memo`

**Orchestra Debug**
- State persists in `localStorage` and syncs across tabs
- Automatically excluded from production builds

## Marketing Voice

ERA Safety's voice is professional, authoritative, and safety-focused. Clear and direct. Written for facility managers, safety officers, and compliance teams.

**Key positioning:**
- "platform" -- the closed-loop emergency response platform
- Tagline: "Every second counts. Every person accounted for."

**Important:** Any copy changes should also update:
- `public/llms.txt` - Summary for AI agents
- `scripts/generate-llms-full.ts` - Full content (auto-generated on build)

## SEO and Metadata

Metadata is defined in:
- `app/layout.tsx` - Main site metadata, JSON-LD
- `app/blog/layout.tsx` - Blog metadata
- `app/blog/page.tsx` - Blog index page metadata
- `package.json` - Site description

The site includes:
- JSON-LD structured data (Organization, WebSite schemas)
- OpenGraph and Twitter card tags
- Dynamic sitemap at `/sitemap.xml`
- AI agent endpoints:
  - `/llms.txt` - Summary (navigation + key features)
  - `/.well-known/llms.txt` - Alias (redirects to `/llms.txt`)
  - `/llms-full.txt` - Full content (marketing site + all blog posts)

## Links

- Website: https://erasafety.net
- Email: sales@erasafety.net
