const i18nConfig = require("./i18n.config.json")
const locales = i18nConfig.map(({ code }) => code)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://ethereum.org",
  generateRobotsTxt: true,
  transform: async (_, path) => {
    const rootPath = path.split("/")[1]
    if (path.endsWith("/404")) return null
    const isDefaultLocale = !locales.includes(rootPath) || rootPath === "en"
    return {
      loc: path,
      changefreq: isDefaultLocale ? "weekly" : "monthly",
      priority: isDefaultLocale ? 0.7 : 0.5,
    }
  },
}
