/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7622",
        secondary: "#FFD27C",
        black: "#000000",
        white: "#FFFFFF",
        grey: "#646982",
        lightGrey: "#E1E5EA",
        background: "#121223",
        textField: "#F0F5FA",
      },
    },
  },
  plugins: [],
}
