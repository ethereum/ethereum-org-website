import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    // TODO: remove after migration
    "./tailwind/**/*.tsx",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-inter)",
        body: "var(--font-inter)",
        monospace: "var(--font-mono)",
      },
      fontSize: {
        "7xl": ["4rem", "1.1"], // [7xl, 6xs]
        "6xl": ["3.75rem", "1.2"], // [6xl, 4xs]
        "5xl": ["3rem", "1.2"], // [5xl, 4xs]
        "4xl": ["2.25rem", "1.2"], // [4xl, 4xs]
        "3xl": ["1.875rem", "1.3"], // [3xl, 2xs]
        "2xl": ["1.5rem", "1.3"], // [2xl, 2xs]
        xl: ["1.25rem", "1.4"], // [xl, xs]
        lg: ["1.125rem", "1.6"], // [lg, base]
        md: ["1rem", "1.6"], // [md, base]
        sm: ["0.875rem", "1.6"], // [sm, base]
        xs: ["0.75rem", "1.6"], // [xs, base]
      },
      lineHeight: {
        "6xs": "1.1",
        "5xs": "1.15",
        "4xs": "1.2",
        "3xs": "1.25",
        "2xs": "1.3",
        xs: "1.4",
        sm: "1.5",
        base: "1.6",
      },
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          "high-contrast": "var(--primary-high-contrast)",
          "low-contrast": "var(--primary-low-contrast)",
          hover: "var(--primary-hover)",
          visited: "var(--primary-visited)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
          pressed: "var(--primary-pressed)",
        },
        accent: {
          a: "var(--accent-a)",
          b: "var(--accent-b)",
          c: "var(--accent-c)",
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
        "tooltip-shadow": "var(--tooltip-shadow)",
        "switch-background": "var(--switch-background)",
        "hub-hero-content-bg": "var(--hub-hero-content-bg)",
        attention: {
          DEFAULT: "var(--attention)",
          light: "var(--attention-light)",
          outline: "var(--attention-outline)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
          outline: "var(--error-outline)",
          neutral: "var(--error-neutral)",
        },
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
          outline: "var(--success-outline)",
          neutral: "var(--success-neutral)",
        },
      },
      backgroundImage: {
        "bg-main-gradient": "var(--bg-main-gradient)",
        "primary-highlight-gradient": "var(--primary-highlight-gradient)",
        "accent-gradient": "var(--accept-gradient)",
      },
      boxShadow: {
        "table-box": "var(--table-box-shadow)",
        table:
          "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
        drop: "0 4px 17px 0 rgba(0,0,0,0.08)",
        "table-box-hover": "0px 8px 17px rgba(0, 0, 0, 0.15)",
        "table-item-box": "var(--table-item-box-shadow)",
        "table-item-box-hover": "0 0 1px var(--primary)",
        "grid-yellow-box-shadow": "8px 8px 0px 0px #ffe78e",
        "grid-blue-box-shadow": "8px 8px 0px 0px #a7d0f4",
        // Part of new DS
        "menu-accordion":
          "0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset",
        // TODO: From current theme. Deprecate for 'button-hover'
        primary: "4px 4px 0px 0px var(--primary)",
        "button-hover": "4px 4px 0 0 var(--primary-low-contrast)",
        tooltip: "0 0 16px var(--tooltip-shadow)",
      },
      spacing: {
        7.5: "1.875rem",
        10.5: "2.625rem",
        19: "4.75rem", // Nav height
        31: "7.75rem", // FeedbackWidget conditional bottom offset
        128: "32rem",
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
      // Add custom border-radius tailwinds extension for "4xl" as "2rem"
      borderRadius: {
        "4xl": "2rem" /* 32px */,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
