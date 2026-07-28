import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        field: {
          950: "#0a1f14",
          900: "#0f2e1c",
          800: "#153c24",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
