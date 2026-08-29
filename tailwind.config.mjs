/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        austrian: {
          red: '#C8102E',
          dark: '#A00C23',
        },
      },
    },
  },
  plugins: [],
};
