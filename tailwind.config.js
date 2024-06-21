/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"]
      }
    },
    colors : {
      orange: {
        0: "#e94f37"
      },
      black: {
        0: "#393e41"
      },
      white: {
        0: "#FFFFFF"
      },
      theme: {
        0: "#f7fff7",
        1: "#292f36",
        2: "#4ecdc4"
      }
    }
  },
  plugins: [],
}