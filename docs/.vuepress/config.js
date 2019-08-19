module.exports = {
  title: 'Ethereum',
  description: 'Ethereum resources',
  themeConfig: {
    nav: [
      { text: 'Ethereum', link: '/' },
      { text: 'Beginners', link: '/beginners/' },
      { text: 'Use', link: '/use/' },
      { text: 'Learn', link: '/learn/' },
      { text: 'Developers', link: '/developers/' }
    ]
  },
  head: [
    [
      'meta',
      {
        name: 'viewport',
        content:
          'width=device-width,initial-scale=1,maximum-scale=1,maximum-scale=1'
      }
    ],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'twitter:site', content: '@Ethereum' }],
    ['meta', { name: 'twitter:creator', content: '@Ethereum' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Ethereum' }],
    ['meta', { property: 'og:site_name', content: 'ethereum.org' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Ethereum is a global, decentralized platform for money and new kinds of applications. On Ethereum, you can write code that controls money, and build applications accessible anywhere in the world.'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://ethereum.org' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:site', content: '@ethereum' }],
    ['meta', { property: 'twitter:creator', content: '@ethereum' }],
    ['meta', { property: 'twitter:title', content: 'Ethereum' }],
    [
      'meta',
      {
        property: 'twitter:description',
        content:
          'Ethereum is a global, decentralized platform for money and new kinds of applications. On Ethereum, you can write code that controls money, and build applications accessible anywhere in the world.'
      }
    ],
    ['meta', { property: 'twitter:image', content: '/og-image-twitter.png' }],
    // Matomo tracking
    // see https://github.com/vuejs/vuepress/issues/790
    [
      'script',
      {},
      `
        var _paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['setCookieDomain', '*.ethereum.org']);
        _paq.push(['setDomains', ['*.ethereum.org']]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u='//matomo.ethereum.org/piwik/';
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '4']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
        `
    ],
    [
      'noscript',
      {},
      `<p><img src="//matomo.ethereum.org/piwik/matomo.php?idsite=4&amp;rec=1" style="border:0;" alt="" /></p>`
    ]
  ],
  markdown: {
    anchor: { permalinkSymbol: '↳' }
  }
};
