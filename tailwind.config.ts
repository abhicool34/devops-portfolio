import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "#0d1117",
        bg2:     "#161b22",
        bg3:     "#1c2128",
        green:   "#00d084",
        cyan:    "#58a6ff",
        text1:   "#e6edf3",
        text2:   "#8b949e",
        text3:   "#6e7681",
        border:  "rgba(48,54,61,0.8)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        blink:  "blink 1.1s step-end infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        bounce2:"bounce2 2s ease-in-out infinite",
      },
      keyframes: {
        blink:  { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        pulse2: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(0,208,132,0.4)" },
          "50%":     { boxShadow: "0 0 0 7px rgba(0,208,132,0)" },
        },
        bounce2:{
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(7px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
