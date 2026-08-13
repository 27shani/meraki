import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#FB575F",
          light: "#FF7D8A",
        },
        purple: {
          DEFAULT: "#8F53FC",
          light: "#A880FF",
        },
        ink: "#191818",
        paper: "#FFFEFA",
      },
      fontFamily: {
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
        sans: ["var(--font-urbanist)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "meraki-gradient": "linear-gradient(90deg, #FB575F 0%, #FB575F 55%, #8F53FC 130%)",
        "meraki-gradient-soft": "linear-gradient(90deg, #FF7D8A 0%, #A880FF 100%)",
        "meraki-gradient-diag": "linear-gradient(135deg, #FB575F 0%, #8F53FC 100%)",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      screens: {
        xs: "390px",
      },
      transitionTimingFunction: {
        meraki: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
