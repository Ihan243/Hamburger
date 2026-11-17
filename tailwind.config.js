/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFC83D',
          yellowDark: '#E5A800',
          yellowLight: '#FFE79A',
          purple: '#1D0E1F',
          purpleDeep: '#130815',
          purpleCard: '#27142A',
          purpleMuted: '#381E3D',
          orange: '#F95738',
          crimson: '#F15A32',
          cream: '#FAF6EE',
          graySub: '#A89CAE',
        }
      },
      fontFamily: {
        street: ['Anton', 'Impact', 'sans-serif'],
        anton: ['Anton', 'Impact', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        epilogue: ['"Epilogue"', 'sans-serif'],
        hanken: ['"Hanken Grotesk"', 'sans-serif'],
      },
      animation: {
        'marquee-slow': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-rev 25s linear infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'slideLeft': 'slideLeft 350ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fadeIn': 'fadeIn 250ms ease-out both',
        'scaleUp': 'scaleUp 240ms ease-out both'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)', opacity: '0.8' },
          '100%': { transform: 'translateX(0%)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleUp: {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.04)' }
        }
      }
    },
  },
  plugins: [],
}
