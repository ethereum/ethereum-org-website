import type { Config } from 'tailwindcss'

const config = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
    // TODO: remove after migration
    './tailwind/**/*.tsx'
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-inter)",
        body: "var(--font-inter)",
        monospace: "var(--font-mono)"
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
        tooltipShadow: "var(--tooltipShadow)",
        switchBackground: "var(--switchBackground)",
        hubHeroContentBg: "var(--hubHeroContentBg)",
      },
      backgroundImage: {
        bgMainGradient: "var(--bg-main-gradient)"
      },
      boxShadow: {
        tableBox: "var(--table-box-shadow)",
        table: "0 14px 66px rgba(0,0,0,.07), 0 10px 17px rgba(0,0,0,.03), 0 4px 7px rgba(0,0,0,.05)",
        drop: "0 4px 17px 0 rgba(0,0,0,0.08)",
        tableBoxHover: "0px 8px 17px rgba(0, 0, 0, 0.15)",
        tableItemBox: "var(--table-item-box-shadow)",
        tableItemBoxHover: "0 0 1px var(--primary)",
        gridYellowBoxShadow: "8px 8px 0px 0px #ffe78e",
        gridBlueBowShadow: "8px 8px 0px 0px #a7d0f4",
        // Part of new DS
        "menu-accordion": "0px 2px 2px 0px rgba(0, 0, 0, 0.12) inset, 0px -3px 2px 0px rgba(0, 0, 0, 0.14) inset",
        // TODO: From current theme. Deprecate for 'buttonHover'
        primary: "4px 4px 0px 0px var(--primary)",
        buttonHover: "4px 4px 0 0 var(--primary-lowContrast)",
        tooltip: "0 0 16px var(--tooltipShadow)",
      },
      spacing: {
        7.5: "1.875rem",
        10.5: "2.625rem",
        19: "4.75rem", // Nav height
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

export default config