const path = require('path')

module.exports = ctx => {
  const { themeConfig, siteConfig } = ctx

  // resolve algolia
  const isAlgoliaSearch =
    themeConfig.algolia ||
    Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
      base => themeConfig.locales[base].algolia
    )

  return {
    alias() {
      return {
        '@AlgoliaSearchBox': isAlgoliaSearch
          ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
          : path.resolve(__dirname, 'noopModule.js')
      }
    },
    plugins: [
      '@vuepress/register-components',
      {
        componentsDir: [path.resolve(__dirname, 'components')]
      },
      '@vuepress/active-header-links'
    ]
  }
}
