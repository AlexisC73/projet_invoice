/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/Layout/**/*.{js,ts,jsx,tsx}',
    './src/store/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        desktop_product: '214px 46px 100px 56px 1fr',
        mobile_product: '16% 26% 24% 1fr',
        tablet_product: '35% 10% 20% 20% 12%',
      },
    },
  },
  plugins: [],
}
