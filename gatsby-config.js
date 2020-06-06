// const supportedLanguages = [`en`]
// const defaultLanguage = `en`

module.exports = {
  siteMetadata: {
    title: `Ethereum.org`,
    description: ``, // TODO
    url: "https://ethereum.org",
    siteUrl: "https://ethereum.org", // sitemap
    author: `@Ethereum`,
    image: "", // TODO
    // defaultLanguage,
    // supportedLanguages,
  },
  plugins: [
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
