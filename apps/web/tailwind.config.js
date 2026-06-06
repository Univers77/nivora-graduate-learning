/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090816",
        panel: "#151329",
        lime: "#A78BFA",
        cyan: "#FF8A70",
      },
      fontFamily: {
        sans: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
