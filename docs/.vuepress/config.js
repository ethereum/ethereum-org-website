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
    ['meta', {name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,maximum-scale=1'}],
    ['link', {rel: 'icon', type: 'image/png', href: 'favicon.png'}]
    ['meta', { name: 'twitter:site', content: '@Ethereum' }],
    ['meta', { name: 'twitter:creator', content: '@Ethereum' }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { property: 'og:title', content: 'Ethereum' }],
    ['meta', { property: 'og:site_name', content: 'ethereum.org' }],
    ['meta', { property: 'og:url', content: 'https://ethereum.org' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://ethereum.org/assets/img/hero.bc77fa26.jpg',
      },
    ],
  ],
  markdown: {
    anchor: { permalinkSymbol: '↳' }
  }
}
