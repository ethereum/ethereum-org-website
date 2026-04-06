export const baseLocales = {
  en: { title: "English", left: "En" },
  zh: { title: "中国人", left: "Zh" },
  ru: { title: "Русский", left: "Ru" },
  uk: { title: "українська", left: "Uk" },
  ar: { title: "العربية", left: "Ar" },
}

// Only i18n files named in this array are being exposed to Storybook. Add filenames as necessary.
export const ns = [
  "common",
  "glossary",
  "glossary-tooltip",
  "learn-quizzes",
  "page-about",
  "page-assets",
  "page-index",
  "page-learn",
  "page-upgrades",
  "page-developers-index",
  "page-roadmap-vision",
  "page-what-is-ethereum",
  "page-upgrades-index",
  "page-wallets-find-wallet",
  "page-developers-docs",
  "table",
] as const
const supportedLngs = Object.keys(baseLocales)

/**
 * Taking the ns array and generating those files for each language available.
 * Uses require() because this file is bundled by webpack for the browser —
 * webpack resolves require() at build time. Node-only APIs like fs or
 * import.meta.dirname do not work here.
 */
const messagesByLocale = ns.reduce(
  (acc, n) => {
    supportedLngs.forEach((lng) => {
      if (!acc[lng]) acc[lng] = {}

      try {
        acc[lng] = {
          ...acc[lng],
          [n]: {
            ...acc[lng][n],
            ...require(`../src/intl/${lng}/${n}.json`),
          },
        }
      } catch {
        acc[lng] = {
          ...acc[lng],
          [n]: {
            ...acc[lng][n],
            ...require(`../src/intl/en/${n}.json`),
          },
        }
      }
    })

    return acc
  },
  {} as Record<string, Record<string, Record<string, string>>>
)

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
  getMessageFallback: ({ key }: { key: string }) => {
    const keyOnly = key.split(".").pop()
    return keyOnly || key
  },
}

export default nextIntl
