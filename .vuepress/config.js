module.exports = {
  title: 'ethereum.org',
  description: 'Ethereum resources',
  themeConfig: {
    nav: [
      { text: 'ethereum.org', link: '/' },
      { text: 'Beginners', link: '/beginners/' },
      { text: 'Use', link: '/use/' },
      { text: 'Learn', link: '/learn/' },
      { text: 'Build', link: '/build/' }
    ]
  },
  head: [
    ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,maximum-scale=1'}]
  ],
  markdown: {
    config: md => {
      md.use(require('markdown-it-attrs'))
    },
    anchor: { permalinkSymbol: '↳' }
  }
}
