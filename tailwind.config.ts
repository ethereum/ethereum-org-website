import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

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
      screens: {
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        heading: "var(--font-inter)",
        body: "var(--font-inter)",
        monospace: "var(--font-mono)",
      },
      fontSize: {
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
        "2xs": ["0.625rem", "1.6"], // [2xs, base]
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
      zIndex: {
        hide: "-1",
        auto: "auto",
        base: "0",
        docked: "10",
        dropdown: "1000",
        sticky: "1100",
        banner: "1200",
        overlay: "1300",
        modal: "1400",
        popover: "1500",
        skipLink: "1600",
        toast: "1700",
        tooltip: "1800",
      },
      colors: {
        gray: {
          100: "var(--gray-100)",
          150: "var(--gray-150)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },

        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },

        orange: {
          50: "var(--orange-50)",
          100: "var(--orange-100)",
          200: "var(--orange-200)",
          300: "var(--orange-300)",
          400: "var(--orange-400)",
          500: "var(--orange-500)",
          550: "var(--orange-550)",
          600: "var(--orange-600)",
          700: "var(--orange-700)",
          800: "var(--orange-800)",
          900: "var(--orange-900)",
        },

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
        "main-gradient": "var(--main-gradient)",
        "feedback-gradient": "var(--feedback-gradient)",
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
      textUnderlineOffset: {
        3: "3px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchVariant }) {
      // The :not() pseudo-class. `i.e. not-[:checked]`
      matchVariant(
        "not",
        (value) => {
          return `&:not(${value})`
        },
        {
          values: {
            // not-disabled => ":not(:disabled)"
            disabled: ":disabled",
          },
        }
      )
    }),
  ],
} satisfies Config

export default config
