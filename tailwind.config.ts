import type { Config } from 'tailwindcss'

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "eth-",
  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-inter)"
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          highContrast: "var(--primary-highContrast)",
          lowContrast: "var(--primary-lowContrast)",
          hover: "var(--primary-hover)",
          visited: "var(--primary-visited)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
          pressed: "var(--primary-pressed)",
        },
        body: {
          DEFAULT: "var(--body)",
          medium: "var(--body-medium)",
          light: "var(--body-light)",
          inverted: "var(--body-inverted)",
        },
        background: {
          DEFAULT: "var(--background)",
          highlight: "var(--background-highlight)",
        },
        disabled: "var(--disabled)",
        neutral: "var(--neutral)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

