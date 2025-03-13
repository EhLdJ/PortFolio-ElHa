/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' }
        },
        boxShadow: {
          'indigo-xl': '0 20px 25px -5px rgba(99, 102, 241, 0.1), 0 10px 10px -5px rgba(99, 102, 241, 0.04)'
        },
        transitionDuration: {
          '400': '400ms'
        }
      },
      animation: {
        bounce: 'bounce 1s infinite'
      }
    },
  },
  plugins: [],
}