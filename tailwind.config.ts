import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:   '#2563eb',
        secondary: '#64748b',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.blue.600'),
              '&:hover': { color: theme('colors.blue.800') },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: { color: theme('colors.blue.400') },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
