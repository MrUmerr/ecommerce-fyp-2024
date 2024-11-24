// /** @type {import('tailwindcss').Config} */

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     darkMode: "class",

//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('daisyui'),
//   ],
// }

/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Move darkMode outside the content array
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
