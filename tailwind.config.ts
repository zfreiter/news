import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgreen: '#378805',
        atlantis: '#86dc3d',
      },
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
