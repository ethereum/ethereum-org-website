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
          100: "hsla(var(--gray-100))",
          150: "hsla(var(--gray-150))",
          200: "hsla(var(--gray-200))",
          300: "hsla(var(--gray-300))",
          400: "hsla(var(--gray-400))",
          500: "hsla(var(--gray-500))",
          600: "hsla(var(--gray-600))",
          700: "hsla(var(--gray-700))",
          800: "hsla(var(--gray-800))",
          900: "hsla(var(--gray-900))",
        },

        blue: {
          50: "hsla(var(--blue-50))",
          100: "hsla(var(--blue-100))",
          200: "hsla(var(--blue-200))",
          300: "hsla(var(--blue-300))",
          400: "hsla(var(--blue-400))",
          500: "hsla(var(--blue-500))",
          600: "hsla(var(--blue-600))",
          700: "hsla(var(--blue-700))",
          800: "hsla(var(--blue-800))",
          900: "hsla(var(--blue-900))",
        },

        orange: {
          50: "hsla(var(--orange-50))",
          100: "hsla(var(--orange-100))",
          200: "hsla(var(--orange-200))",
          300: "hsla(var(--orange-300))",
          400: "hsla(var(--orange-400))",
          500: "hsla(var(--orange-500))",
          550: "hsla(var(--orange-550))",
          600: "hsla(var(--orange-600))",
          700: "hsla(var(--orange-700))",
          800: "hsla(var(--orange-800))",
          900: "hsla(var(--orange-900))",
        },

        primary: {
          DEFAULT: "hsla(var(--primary))",
          "high-contrast": "hsla(var(--primary-high-contrast))",
          "low-contrast": "hsla(var(--primary-low-contrast))",
          hover: "hsla(var(--primary-hover))",
          action: "hsla(var(--primary-action))",
          light: "hsla(var(--primary-light))" /* TODO: Migrate/deprecate */,
          dark: "hsla(var(--primary-dark))" /* TODO: Migrate/deprecate */,
        },
        accent: {
          a: {
            DEFAULT: "hsla(var(--accent-a))",
          },
          b: {
            DEFAULT: "hsla(var(--accent-b))",
          },
          c: {
            DEFAULT: "hsla(var(--accent-c))",
          },
        },
        body: {
          DEFAULT: "hsla(var(--body))",
          medium: "hsla(var(--body-medium))",
          light: "hsla(var(--body-light))",
        },
        background: {
          DEFAULT: "hsla(var(--background))",
          highlight: "hsla(var(--background-highlight))",
        },
        neutral: "hsla(var(--neutral))", // TODO: Migrate/deprecate
        "switch-background": "hsla(var(--switch-background))", // TODO: Migrate/deprecate
        disabled: "hsla(var(--disabled))",
        "tooltip-shadow": "var(--tooltip-shadow)",
        "hub-hero-content-bg": "var(--hub-hero-content-bg)",
        attention: {
          DEFAULT: "hsla(var(--attention))",
          light: "hsla(var(--attention-light))",
          outline: "hsla(var(--attention-outline))",
        },
        error: {
          DEFAULT: "hsla(var(--error))",
          light: "hsla(var(--error-light))",
          outline: "hsla(var(--error-outline))",
          neutral: "hsla(var(--error-neutral))",
        },
        success: {
          DEFAULT: "hsla(var(--success))",
          light: "hsla(var(--success-light))",
          outline: "hsla(var(--success-outline))",
          neutral: "hsla(var(--success-neutral))",
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
        "main-gradient": "var(--gradient-main)", // TODO: Duplicate; remove one
        "feedback-gradient": "var(--feedback-gradient)",
      },
      boxShadow: {
        "table-box": "var(--table-box-shadow)",
        table:
          "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
        drop: "0 4px 17px 0 rgba(0,0,0,0.08)",
        "table-box-hover": "0px 8px 17px rgba(0, 0, 0, 0.15)",
        "table-item-box": "var(--table-item-box-shadow)",
        "table-item-box-hover": "0 0 1px hsla(var(--primary))",
        "grid-yellow-box-shadow": "8px 8px 0px 0px #ffe78e",
        "grid-blue-box-shadow": "8px 8px 0px 0px #a7d0f4",
        // Part of new DS
        "menu-accordion":
          "0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset",
        // TODO: From current theme. Deprecate for 'button-hover'
        primary: "4px 4px 0px 0px hsla(var(--primary))",
        "button-hover": "4px 4px 0 0 hsla(var(--primary-low-contrast))",
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
