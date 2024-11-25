import type { Config } from "tailwindcss";
import tailForm from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          500: "#ef4444", // 예제에서 사용하는 빨간색
        },
        blue: {
          500: "#3b82f6", // 예제에서 사용하는 파란색
        },
      },
    },
  },
  plugins: [tailForm],
};
export default config;
