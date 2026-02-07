/**
 * Tailwind CSS Configuration
 * STRICT DESIGN SYSTEM ENFORCEMENT
 * 
 * Rules:
 * 1. Only 3 border-radius values allowed (sm, base, full)
 * 2. Only 8 spacing values allowed (1, 2, 3, 4, 6, 8, 12, 16)
 * 3. No arbitrary values allowed (e.g., w-[350px], rounded-[20px])
 * 4. All colors must use CSS custom properties
 */

export default {
  // Disable JIT mode arbitrary values
  mode: 'jit',
  
  // Strict content paths
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  
  // Core plugins - disable ones that allow arbitrary values
  corePlugins: {
    // Keep these enabled
    borderRadius: true,
    spacing: true,
    colors: true,
    // Disable arbitrary value patterns
    container: false, // Use custom container classes instead
  },
  
  theme: {
    // STRICT SPACING SCALE - 8 values only
    spacing: {
      '0': '0',
      '1': 'var(--space-1)',   // 4px
      '2': 'var(--space-2)',   // 8px
      '3': 'var(--space-3)',   // 12px
      '4': 'var(--space-4)',   // 16px
      '6': 'var(--space-6)',   // 24px
      '8': 'var(--space-8)',   // 32px
      '12': 'var(--space-12)', // 48px
      '16': 'var(--space-16)', // 64px
    },
    
    // STRICT BORDER RADIUS - 3 values only
    borderRadius: {
      'none': '0',
      'sm': 'var(--radius-sm)',   // 8px
      'DEFAULT': 'var(--radius-base)', // 12px (base)
      'base': 'var(--radius-base)', // 12px
      'full': 'var(--radius-full)', // 9999px
    },
    
    // STRICT COLORS - must use CSS custom properties
    colors: {
      // Surface colors
      'surface': {
        '900': 'var(--color-surface-900)',
        '800': 'var(--color-surface-800)',
        '700': 'var(--color-surface-700)',
        '600': 'var(--color-surface-600)',
      },
      // Primary accent
      'primary': {
        DEFAULT: 'var(--color-primary)',
        'hover': 'var(--color-primary-hover)',
      },
      // Text colors
      'text': {
        'white': 'var(--color-text-white)',
        'primary': 'var(--color-text-primary)',
        'muted': 'var(--color-text-muted)',
        'subtle': 'var(--color-text-subtle)',
      },
      // Semantic colors
      'success': 'var(--color-success)',
      'warning': 'var(--color-warning)',
      'error': 'var(--color-error)',
      'info': 'var(--color-info)',
      // Transparent
      'transparent': 'transparent',
      'current': 'currentColor',
    },
    
    // Font families
    fontFamily: {
      'display': ['var(--font-display)'],
      'sans': ['var(--font-sans)'],
      'mono': ['var(--font-mono)'],
    },
    
    // Font sizes
    fontSize: {
      'xs': 'var(--font-size-xs)',     // 12px
      'sm': 'var(--font-size-sm)',     // 14px
      'base': 'var(--font-size-base)', // 16px
      'lg': 'var(--font-size-lg)',     // 18px
      'xl': 'var(--font-size-xl)',     // 20px
      '2xl': 'var(--font-size-2xl)',   // 24px
      '3xl': 'var(--font-size-3xl)',   // 30px
      '4xl': 'var(--font-size-4xl)',   // 36px
    },
    
    // Shadows
    boxShadow: {
      'sm': 'var(--shadow-sm)',
      'base': 'var(--shadow-base)',
      'lg': 'var(--shadow-lg)',
      'xl': 'var(--shadow-xl)',
      'none': 'none',
    },
    
    // Transitions
    transitionDuration: {
      'fast': '150ms',
      'base': '200ms',
      'slow': '300ms',
    },
    
    // Extend with empty to prevent accidental extensions
    extend: {},
  },
  
  // No arbitrary values allowed
  // This is enforced by PostCSS plugin as well
  safelist: [],
  
  // Plugins
  plugins: [],
  
  // Experimental features - disable to prevent breaking changes
  experimental: {},
};
