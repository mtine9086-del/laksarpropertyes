import type { Config } from 'tailwindcss';

/**
 * Laksar Properties design system.
 * Earthy, natural palette — farmland greens, warm neutrals, charcoal ink.
 * Restrained by design (see master spec Phase 2): no neon, no luxury gold/black.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // warm off-white backgrounds
        cream: {
          50: '#FBF9F5',
          100: '#F6F2EA',
          200: '#EDE7DA',
          300: '#E0D6C2',
        },
        // charcoal ink
        ink: {
          900: '#1C211C',
          800: '#242A24',
          700: '#323A32',
          600: '#4A534A',
          500: '#5F695F',
          400: '#7A8378',
        },
        // farmland green (primary)
        forest: {
          50: '#EFF5EF',
          100: '#DCE9DC',
          200: '#BAD3BA',
          300: '#8FB691',
          400: '#5E9266',
          500: '#3E7548',
          600: '#2C5E37',
          700: '#234B2D',
          800: '#1C3B24',
          900: '#152D1C',
        },
        // warm earth / harvest accent (used sparingly)
        earth: {
          300: '#E3C9A8',
          400: '#D2A66F',
          500: '#C08A45',
          600: '#A97132',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        // layered, realistic elevation (subtle 3D depth system)
        'e-1': '0 1px 2px rgba(28,33,28,0.06), 0 1px 6px rgba(28,33,28,0.05)',
        'e-2': '0 2px 6px rgba(28,33,28,0.07), 0 8px 24px rgba(28,33,28,0.08)',
        'e-3': '0 6px 16px rgba(28,33,28,0.09), 0 18px 48px rgba(28,33,28,0.12)',
        'e-4': '0 10px 28px rgba(28,33,28,0.12), 0 30px 80px rgba(28,33,28,0.16)',
        'inner-line': 'inset 0 0 0 1px rgba(28,33,28,0.08)',
      },
      borderRadius: {
        card: '0.875rem',
      },
      maxWidth: {
        site: '76rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1.02) translate3d(0,0,0)' },
          '100%': { transform: 'scale(1.12) translate3d(-1.5%,-1.5%,0)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 24s ease-in-out infinite alternate',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
