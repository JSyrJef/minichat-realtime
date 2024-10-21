/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        custombgIndex: '#231c35',
        custombgCard: '#2a2b47',
        custombgButton: '#6e5774',
      }
    },
  },
  plugins: [],
}

