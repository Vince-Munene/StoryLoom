/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midbrown: "#B1521E",
        darkbrown: "#7F3608",
        cream: "#F3D0B4"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
}
}
