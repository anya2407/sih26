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
          bg: '#FAF9F6',
          surface: '#FFFFFF',
          red: '#9E1B32',
          deepRed: '#7F1628',
          textDark: '#171717',
          textMuted: '#6B6B6B',
          border: '#E8E3DD',
          beige: '#F2EDE6',
          gold: '#C5A059',
          goldLight: '#F7F3EB',
          charcoal: '#232323',
          cardHover: '#FCFBF9'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Cinzel"', 'Georgia', 'serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
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
