// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // srcフォルダ内のすべての関連ファイルをスキャンするようにパスを修正
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // 必要であれば、ここにサイト独自のデザインルールを追加できます。
      // 例:
      // colors: {
      //   'kiban-blue': '#0077cc',
      // },
    },
  },
  plugins: [],
}
export default config
