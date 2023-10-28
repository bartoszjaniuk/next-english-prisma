import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        primaryHover: "#6376f1",
        backgroundDark: "#202020",
        layoutDark: "#2c2c2c",
        layoutLight: "#ffffff",
        backgroundLight: "#f3f6f8",
        font: "#dddddd",
      },
    },
    // fontFamily: {
    //   primary: ["var(--font-raleway)"],
    // },
  },
  plugins: [],
}
export default config
