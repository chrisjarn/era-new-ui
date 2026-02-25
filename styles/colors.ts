const colors = {
  red: '#e30613',
  blue: '#0070f3',
  green: '#00ff88',
  purple: '#7928ca',
  pink: '#FFC4EB',
  'light-pink': '#FFD6F1',
  'dark-pink': '#E1C9D9',
  // PRIMARY → ACCENT (cyan)
  'ghost-mint': '#164e57',
  mint: '#20b8cd',
  teal: '#1aa3b5',
  'dark-teal': '#1a8a9a',
  // NEUTRAL → DARK SURFACES
  'off-white': '#e8e8e8',
  'light-gray': '#888888',
  grey: '#1c1c1c',
  'dark-grey': '#282828',
  // WHITE → SURFACE
  white: '#141414',
  // BLACK → BACKGROUND
  black: '#0a0a0a',
  // FOREST → DEEP ACCENT
  forest: '#0e7a8a',
} as const

const themeNames = ['dark'] as const
const colorNames = ['primary', 'secondary', 'contrast'] as const

const themes = {
  dark: {
    primary: '#141414',
    secondary: '#f5f5f5',
    contrast: '#20b8cd',
  },
} as const satisfies Themes

export { colors, themeNames, themes }

// UTIL TYPES
export type Themes = Record<
  (typeof themeNames)[number],
  Record<(typeof colorNames)[number], string>
>
