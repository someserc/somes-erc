/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* SOMES BLUE — Primary Identity */
        primary: {
          50: "hsl(215, 85%, 97%)",
          100: "hsl(216, 84%, 93%)",
          200: "hsl(216, 85%, 86%)",
          300: "hsl(216, 84%, 76%)",
          400: "hsl(217, 83%, 63%)",
          500: "hsl(217, 90%, 54%)", // main blue
          600: "hsl(218, 94%, 44%)", // #0B2FBF equivalent
          700: "hsl(218, 96%, 36%)",
          800: "hsl(219, 92%, 30%)",
          900: "hsl(220, 88%, 24%)",
          950: "hsl(222, 85%, 16%)",
        },

        /* SOMES RED — Accent / CTA */
        secondary: {
          50: "hsl(0, 85%, 97%)",
          100: "hsl(0, 87%, 93%)",
          200: "hsl(0, 88%, 86%)",
          300: "hsl(0, 87%, 75%)",
          400: "hsl(0, 86%, 63%)",
          500: "hsl(0, 84%, 55%)",
          600: "hsl(0, 87%, 46%)", // #E10600 equivalent
          700: "hsl(0, 90%, 38%)",
          800: "hsl(0, 92%, 32%)",
          900: "hsl(0, 90%, 26%)",
          950: "hsl(0, 88%, 18%)",
        },

        /* Neutral Backgrounds — Keep as-is (Good) */
        background: {
          50: "hsl(0, 0%, 100%)",
          100: "hsl(0, 0%, 94%)",
          200: "hsl(0, 0%, 86%)",
          300: "hsl(0, 0%, 74%)",
          400: "hsl(0, 0%, 60%)",
          500: "hsl(0, 0%, 49%)",
          600: "hsl(0, 0%, 40%)",
          700: "hsl(0, 0%, 32%)",
          800: "hsl(0, 0%, 27%)",
          900: "hsl(0, 0%, 24%)",
          950: "hsl(0, 0%, 16%)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
