import { readFileSync } from "fs"
import { join } from "path"

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

const rootDir = join(import.meta.dirname, "..")

/**
 * Taking the ns array and generating those files for each language available.
 */
const messagesByLocale = ns.reduce(
  (acc, n) => {
    supportedLngs.forEach((lng) => {
      if (!acc[lng]) acc[lng] = {}

      try {
        const filePath = join(rootDir, "src", "intl", lng, `${n}.json`)
        acc[lng] = {
          ...acc[lng],
          [n]: {
            ...acc[lng][n],
            ...JSON.parse(readFileSync(filePath, "utf-8")),
          },
        }
      } catch {
        const fallbackPath = join(rootDir, "src", "intl", "en", `${n}.json`)
        acc[lng] = {
          ...acc[lng],
          [n]: {
            ...acc[lng][n],
            ...JSON.parse(readFileSync(fallbackPath, "utf-8")),
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
