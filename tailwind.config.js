/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F9F7F2',
        sage: '#A3B18A',
        muted: '#98A6B7',
        'sage-btn': '#B5C49D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      borderRadius: {
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(255, 183, 197, 0.15)',
        'soft-hover': '0 12px 40px rgba(255, 183, 197, 0.25)',
        'portal-card': '0 4px 20px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
