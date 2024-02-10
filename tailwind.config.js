/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('/src/assets/images/bg.jpg')",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
    },
  },
  plugins: [],
};
