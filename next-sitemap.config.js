const i18nConfig = require("./i18n.config.json")
const locales = i18nConfig.map(({ code }) => code)

const defaultLocale = "en"

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ethereum.org",
  transform: async (_, path) => {
    const rootPath = path.split("/")[1]
    if (path.endsWith("/404")) return null
    const isDefaultLocale =
      !locales.includes(rootPath) || rootPath === defaultLocale

    // Strip default-locale (en) prefix from paths; drop the `/en` root entry
    let loc = path
    if (rootPath === defaultLocale) {
      // Drop the `/en` root entry to avoid duplicating `/`
      if (path === `/${defaultLocale}` || path === `/${defaultLocale}/`)
        return null
      const defaultLocalePrefix = new RegExp(`^/${defaultLocale}(/|$)`)
      loc = path.replace(defaultLocalePrefix, "/")
    }

    return {
      loc,
      changefreq: isDefaultLocale ? "weekly" : "monthly",
      priority: isDefaultLocale ? 0.7 : 0.5,
    }
  },
}
