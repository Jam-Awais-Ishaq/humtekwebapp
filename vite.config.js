import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()], resolve: {
    alias: {
      '@': '/src',
    },
  },
})

module.exports = {
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(50px)' },
          '66%': { transform: 'translateY(10px) translateX(-10px)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
}