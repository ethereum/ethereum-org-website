const i18nConfig = require("./i18n.config.json")

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    // supported locales defined in `i18n.config.json`
    locales: i18nConfig.map((lang) => lang.code).sort(),
  },
  // define custom location for intl files, otherwise default to public/locales (https://github.com/i18next/next-i18next#2-translation-content)
  localePath: "./src/intl",
  // see updates to your translation JSON files without having to restart your development server each time
  reloadOnPrerender: true,
}
