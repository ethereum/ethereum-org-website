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
      // TODO: Confirm new tw breakpoints
      screens: {
        sm: "20rem", // 320px
        md: "30rem", // 480px (previous Chakra "sm")
        lg: "48rem", // 768px (previous Chakra "md")
        xl: "62rem", // 992px (previous Chakra "lg")
        "2xl": "80rem", // 1280px (previous Chakra "xl")
        max: "96rem", // 1536px (previous Chakra "2xl")
      },
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
          DEFAULT: "rgba(var(--primary))",
          "high-contrast": "rgba(var(--primary-high-contrast))",
          "low-contrast": "rgba(var(--primary-low-contrast))",
          hover: "rgba(var(--primary-hover))",
          light: "rgba(var(--primary-light))" /* TODO: Migrate/deprecate */,
          dark: "rgba(var(--primary-dark))" /* TODO: Migrate/deprecate */,
        },
        accent: {
          a: {
            DEFAULT: "rgba(var(--accent-a))",
            "high-contrast": "rgba(var(--accent-a-high-contrast))",
            "low-contrast": "rgba(var(--accent-a-low-contrast))",
            hover: "rgba(var(--accent-a-hover))",
          },
          b: {
            DEFAULT: "rgba(var(--accent-b))",
            "high-contrast": "rgba(var(--accent-b-high-contrast))",
            "low-contrast": "rgba(var(--accent-b-low-contrast))",
            hover: "rgba(var(--accent-b-hover))",
          },
          c: {
            DEFAULT: "rgba(var(--accent-c))",
            "high-contrast": "rgba(var(--accent-c-high-contrast))",
            "low-contrast": "rgba(var(--accent-c-low-contrast))",
            hover: "rgba(var(--accent-c-hover))",
          },
        },
        body: {
          DEFAULT: "rgba(var(--body))",
          medium: "rgba(var(--body-medium))",
          light: "rgba(var(--body-light))",
        },
        background: {
          DEFAULT: "rgba(var(--background))",
          highlight: "rgba(var(--background-highlight))",
        },
        disabled: "rgba(var(--disabled))",
        "tooltip-shadow": "var(--tooltip-shadow)",
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
        "gradient-main": "var(--gradient-main)",
        "primary-highlight-gradient": "var(--primary-highlight-gradient)",
        "accent-gradient-a": "var(--accent-gradient-a)",
        "accent-gradient-b": "var(--accent-gradient-b)",
        "gradient-banner": "var(--gradient-banner)",
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent-a": "var(--gradient-accent-a)",
        "gradient-accent-b": "var(--gradient-accent-b)",
        "gradient-accent-c": "var(--gradient-accent-c)",
        "gradient-primary-hero": "var(--gradient-primary-hero)",
      },
      boxShadow: {
        "table-box": "var(--table-box-shadow)",
        table:
          "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
        drop: "0 4px 17px 0 rgba(0,0,0,0.08)",
        "table-box-hover": "0px 8px 17px rgba(0, 0, 0, 0.15)",
        "table-item-box": "var(--table-item-box-shadow)",
        "table-item-box-hover": "0 0 1px rgba(var(--primary))",
        "grid-yellow-box-shadow": "8px 8px 0px 0px #ffe78e",
        "grid-blue-box-shadow": "8px 8px 0px 0px #a7d0f4",
        // Part of new DS
        "menu-accordion":
          "0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset",
        // TODO: From current theme. Deprecate for 'button-hover'
        primary: "4px 4px 0px 0px rgba(var(--primary))",
        "button-hover": "4px 4px 0 0 rgba(var(--primary-low-contrast))",
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
      gridTemplateColumns: {
        bento: "2rem repeat(10, 1fr) 2rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
