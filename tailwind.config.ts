import animatePlugin from 'tailwindcss-animate';
import type { Config } from 'tailwindcss';
import { extendedTheme } from './app/lib/extended-theme';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      ...extendedTheme,
    },
  },
  plugins: [animatePlugin],
};
export default config;
