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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        secondary: ["Roboto Mono", "monospace"],
      },
      fontSize: {
        md: "15px",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
            h2: {
              fontSize: "20px",
            },
            h3: {
              fontSize: "17px",
            },
            h4: {
              fontSize: "16px",
            },
            h5: {
              fontSize: "15px",
            },
            h6: {
              fontSize: "14px",
            },
            p: {
              fontSize: "15px",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
