// TODO automatically load from /intl/ files
const supportedLanguages = [
  `ar`,
  `bn`,
  `cs`,
  `de`,
  `el`,
  `es`,
  `fa`,
  `fr`,
  `id`,
  `ig`,
  `it`,
  `ja`,
  `ko`,
  `nl`,
  `pl`,
  `pt-br`,
  `ro`,
  `ru`,
  `se`,
  `sk`,
  `sl`,
  `tr`,
  `zh`,
]
const defaultLanguage = `en`

module.exports = {
  siteMetadata: {
    title: `Ethereum.org`,
    description: ``, // TODO
    url: "https://ethereum.org",
    siteUrl: "https://ethereum.org", // sitemap
    author: `@Ethereum`,
    image: "", // TODO
    defaultLanguage,
    supportedLanguages,
  },
  plugins: [
    // i18n support
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: supportedLanguages,
        // language file path
        defaultLanguage,
        // redirect to `/en/` when connecting `/`
        redirect: false, // TODO set back to true?
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },

    `gatsby-transformer-remark`,
  ],
}
