// tailwind.config.ts
import type { Config } from "tailwindcss"
import animate from "tailwindcss-animate"

export default {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    
  ],
  theme: {
    extend: {
      // optional shadcn radius tokens
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config
