import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        secondaryBackground: '#EDF2FA',
        foreground: '#00205B',    // Deeper, richer navy
        title: '#00205B',         // Deeper, richer navy
        body: '#1C1C1C',
        primary: '#E3A82B',       // Balanced gold
        secondary: '#00205B',     // Rich navy
        highlight: '#E3A82B',     // Vibrant gold
      },
    },
  },
  plugins: [],
} satisfies Config;
