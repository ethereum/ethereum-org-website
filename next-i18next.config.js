/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path")
const i18nConfig = require("./i18n.config.json")

const BUILD_LOCALES = process.env.BUILD_LOCALES
// Supported locales defined in `i18n.config.json`
const locales = BUILD_LOCALES
  ? BUILD_LOCALES.split(",")
  : i18nConfig.map(({ code }) => code)

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    // "default" locale is a hack to always display the locale prefix in the
    // url. Ref: https://nextjs.org/docs/pages/building-your-application/routing/internationalization#prefixing-the-default-locale
    defaultLocale: "default",
    // supported locales defined in `i18n.config.json`
    locales: ["default", ...locales],
    localeDetection: false,
  },
  // define custom location for intl files, otherwise default to public/locales (https://github.com/i18next/next-i18next#2-translation-content)
  // use path.resolve to work with Netlify (https://github.com/i18next/next-i18next/issues/1552#issuecomment-1538452722)
  localePath: path.resolve("./src/intl"),
  // see updates to your translation JSON files without having to restart your development server each time
  reloadOnPrerender: true,
  // Language codes to lookup, given set language is 'en-US': 'all' --> ['en-US', 'en', 'dev'], 'currentOnly' --> 'en-US', 'languageOnly' --> 'en'
  load: "currentOnly",
  // Language will be lowercased EN --> en while leaving full locales like en-US
  cleanCode: true,
  // Language will be lowercased eg. en-US --> en-us
  lowerCaseLng: true,
}
