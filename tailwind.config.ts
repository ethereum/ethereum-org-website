import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

import { screens } from "./src/lib/utils/screen"

const config = {
  // TODO: Move to "class" strategy after removing Chakra
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{ts,tsx}",
    // TODO: remove after migration
    "./tailwind/**/*.tsx",
  ],
  prefix: "",
  theme: {
    extend: {
      screens,
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

        purple: {
          50: "hsla(var(--purple-50))",
          100: "hsla(var(--purple-100))",
          200: "hsla(var(--purple-200))",
          300: "hsla(var(--purple-300))",
          400: "hsla(var(--purple-400))",
          500: "hsla(var(--purple-500))",
          600: "hsla(var(--purple-600))",
          700: "hsla(var(--purple-700))",
          800: "hsla(var(--purple-800))",
          900: "hsla(var(--purple-900))",
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

        pink: {
          50: "hsla(var(--pink-50))",
          100: "hsla(var(--pink-100))",
          200: "hsla(var(--pink-200))",
          300: "hsla(var(--pink-300))",
          400: "hsla(var(--pink-400))",
          500: "hsla(var(--pink-500))",
          600: "hsla(var(--pink-600))",
          700: "hsla(var(--pink-700))",
          800: "hsla(var(--pink-800))",
          900: "hsla(var(--pink-900))",
        },

        teal: {
          50: "hsla(var(--teal-50))",
          100: "hsla(var(--teal-100))",
          200: "hsla(var(--teal-200))",
          300: "hsla(var(--teal-300))",
          400: "hsla(var(--teal-400))",
          500: "hsla(var(--teal-500))",
          600: "hsla(var(--teal-600))",
          700: "hsla(var(--teal-700))",
          800: "hsla(var(--teal-800))",
          900: "hsla(var(--teal-900))",
        },

        orange: {
          100: "hsla(var(--orange-100))",
          800: "hsla(var(--orange-800))",
          900: "hsla(var(--orange-900))",
        },

        body: {
          DEFAULT: "hsla(var(--body))",
          medium: "hsla(var(--body-medium))",
          light: "hsla(var(--body-light))",
          inverse: "hsla(var(--body-inverse))",
          menu: {
            DEFAULT: "hsla(var(--body-menu))",
            low: "hsla(var(--body-menu-low))",
            medium: "hsla(var(--body-menu-medium))",
            high: "hsla(var(--body-menu-high))",
          },
        },

        disabled: "hsla(var(--disabled))",

        background: {
          DEFAULT: "hsla(var(--background))",
          highlight: "hsla(var(--background-highlight))",
          low: "hsla(var(--background-low))",
          medium: "hsla(var(--background-medium))",
          high: "hsla(var(--background-high))",
        },

        border: {
          DEFAULT: "hsla(var(--border))",
          "high-contrast": "hsla(var(--border-high-contrast))",
          "low-contrast": "hsla(var(--border-low-contrast))",
          hover: "hsla(var(--border-hover))",
        },

        primary: {
          DEFAULT: "hsla(var(--primary))",
          "high-contrast": "hsla(var(--primary-high-contrast))",
          "low-contrast": "hsla(var(--primary-low-contrast))",
          hover: "hsla(var(--primary-hover))",
          visited: "hsla(var(--primary-visited))",
          action: "hsla(var(--primary-action))",
          "action-hover": "hsla(var(--primary-action-hover))",
        },

        accent: {
          a: {
            DEFAULT: "hsla(var(--accent-a))",
            hover: "hsla(var(--accent-a-hover))",
          },
          b: {
            DEFAULT: "hsla(var(--accent-b))",
            hover: "hsla(var(--accent-b-hover))",
          },
          c: {
            DEFAULT: "hsla(var(--accent-c))",
            hover: "hsla(var(--accent-c-hover))",
          },
        },

        success: {
          DEFAULT: "hsla(var(--success))",
          light: "hsla(var(--success-light))",
          dark: "hsla(var(--success-dark))",
          border: "hsla(var(--success-border))",
        },

        error: {
          DEFAULT: "hsla(var(--error))",
          light: "hsla(var(--error-light))",
          dark: "hsla(var(--error-dark))",
          border: "hsla(var(--error-border))",
        },

        warning: {
          DEFAULT: "hsla(var(--warning))",
          light: "hsla(var(--warning-light))",
          dark: "hsla(var(--warning-dark))",
          border: "hsla(var(--warning-border))",
        },

        staking: {
          gold: "var(--staking-gold)",
          "gold-fill": "var(--staking-gold-fill)",
          green: "var(--staking-green)",
          "green-fill": "var(--staking-green-fill)",
          blue: "var(--staking-blue)",
          "blue-fill": "var(--staking-blue-fill)",
          red: "var(--staking-red)",
          "red-fill": "var(--staking-red-fill)",
        },

        /** @deprecated */
        "switch-background": "hsla(var(--switch-background))", // TODO: Migrate
        "tooltip-shadow": "var(--tooltip-shadow)",
        "hub-hero-content": "var(--hub-hero-content)",
        "search-background": "var(--search-background)",
      },

      backgroundImage: {
        "gradient-main": "var(--gradient-main)",
        "gradient-banner": "var(--gradient-banner)",
        "main-gradient": "var(--gradient-main)", // TODO: Duplicate; remove one
        "feedback-gradient": "var(--feedback-gradient)",
        "banner-grid-gradient": "var(--banner-grid-gradient)",
        "radial-a": "var(--radial-a)",
        "linear-bug-bounty-title": "var(--linear-bug-bounty-title)",
      },
      boxShadow: {
        "table-box": "var(--table-box-shadow)",
        table: `
          0 14px 66px rgba(0,0,0,.07),
          0 10px 17px rgba(0,0,0,.03),
          0 4px 7px rgba(0,0,0,.05)`,
        drop: "0 4px 17px 0 rgba(0,0,0,0.08)",
        "table-box-hover": "0px 8px 17px rgba(0, 0, 0, 0.15)",
        "table-item-box": "var(--table-item-box-shadow)",
        "table-item-box-hover": "0 0 1px hsla(var(--primary))",
        "grid-yellow-box-shadow": "8px 8px 0px 0px #ffe78e",
        "grid-blue-box-shadow": "8px 8px 0px 0px #a7d0f4",
        // Part of new DS
        "menu-accordion": `
          0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset,
          0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset`,
        tooltip: "0 0 16px var(--tooltip-shadow)",
        "svg-button-link": `
          var(--shadow-svg-button-link-1), var(--shadow-svg-button-link-2),
          var(--shadow-svg-button-link-3), var(--shadow-svg-button-link-4)`,
        "svg-button-link-hover": `
          var(--shadow-svg-button-link-1-hover),
          var(--shadow-svg-button-link-2-hover),
          var(--shadow-svg-button-link-3-hover),
          var(--shadow-svg-button-link-4-hover)`,
        "card-hover": "var(--shadow-body-md), var(--shadow-body-lg)",
        "window-box": `
          var(--shadow-window-box-1), var(--shadow-window-box-2),
          var(--shadow-window-box-3), var(--shadow-window-box-4),
          var(--shadow-window-box-5)`,
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

        "scroll-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-left": "scroll-left 30s linear infinite",
        "scroll-right": "scroll-right 30s linear infinite",
        "spin-30": "spin 60s linear infinite",
        "counter-spin-30": "spin 60s linear infinite reverse",
        "spin-21": "spin 42s linear infinite",
        "counter-spin-21": "spin 42s linear infinite reverse",
        "spin-18": "spin 36s linear infinite",
        "counter-spin-18": "spin 36s linear infinite reverse",
        "spin-9": "spin 18s linear infinite",
        "counter-spin-9": "spin 18s linear infinite reverse",
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
