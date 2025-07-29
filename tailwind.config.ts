import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.md',
    './src/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: { color: theme('colors.blue.600') },
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
  plugins: [require('@tailwindcss/typography')],
}

export default config
