/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          bg: '#F8F3EC',
          parchment: '#F5EDE0',
          surface: '#FFFFFF',
          red: '#C0392B',
          deepRed: '#96281B',
          textDark: '#1A1209',
          textMuted: '#7a6050',
          border: '#EDE5D8',
          beige: '#F5EDE0',
          gold: '#D4AA57',
          goldLight: '#FEF3C7',
          amber: '#F59E0B',
          terracotta: '#4A0E00',
          turmeric: '#FDF0D5',
          teak: '#2C1A0E',
          charcoal: '#1A1209',
          cardHover: '#FDF0D5'
        }
      },
      fontFamily: {
        display: ['"Lobster Two"', 'cursive'],
        serif: ['"Lora"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        bodoni: ['"Libre Bodoni"', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(0, 0, 0, 0.04), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -4px rgba(23, 23, 23, 0.05)',
        'card-hover': '0 12px 32px -8px rgba(158, 27, 50, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'modal': '0 24px 64px -12px rgba(23, 23, 23, 0.15)',
        'glow-red': '0 0 24px rgba(158, 27, 50, 0.25)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        wave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '32px' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      }
    },
  },
  plugins: [],
}
