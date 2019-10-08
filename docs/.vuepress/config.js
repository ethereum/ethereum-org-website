const { translate } = require('./theme/utils/translations');

module.exports = {
  title: 'Ethereum',
  themeConfig: {
    nav: [
      { text: translate('page-home'), link: '/' },
      { text: translate('page-beginners'), link: '/beginners/' },
      { text: translate('page-use'), link: '/use/' },
      { text: translate('page-learn'), link: '/learn/' },
      { text: translate('page-developers'), link: '/developers/' }
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
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'ethereum.org' }],
    ['meta', { property: 'og:url', content: 'https://ethereum.org' }],
    [
      'meta',
      { property: 'og:image', content: 'https://ethereum.org/og-image.png' }
    ],
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:site', content: '@ethereum' }],
    ['meta', { property: 'twitter:creator', content: '@ethereum' }],
    [
      'meta',
      {
        property: 'twitter:image',
        content: 'https://ethereum.org/og-image-twitter.png'
      }
    ],
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
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US',
      label: translate('name'),
      title: translate('ethereum'),
      nav: [
        { text: translate('page-home'), link: '/' },
        { text: translate('page-beginners'), link: '/beginners/' },
        { text: translate('page-use'), link: '/use/' },
        { text: translate('page-learn'), link: '/learn/' },
        { text: translate('page-developers'), link: '/developers/' }
      ]
    },
    '/de/': {
      lang: 'de-DE',
      label: translate('name', 'de-DE'),
      title: translate('ethereum', 'de-DE'),
      nav: [
        { text: translate('page-home', 'de-DE'), link: '/de/' },
        { text: translate('page-beginners', 'de-DE'), link: '/de/beginners/' },
        { text: translate('page-use', 'de-DE'), link: '/de/use/' },
        { text: translate('page-learn', 'de-DE'), link: '/de/learn/' },
        { text: translate('page-developers', 'de-DE'), link: '/de/developers/' }
      ]
    },
    '/el/': {
      lang: 'el-GR',
      label: translate('name', 'el-GR'),
      title: translate('ethereum', 'el-GR'),
      nav: [
        { text: translate('page-home', 'el-GR'), link: '/el/' },
        { text: translate('page-beginners', 'el-GR'), link: '/el/beginners/' },
        { text: translate('page-use', 'el-GR'), link: '/el/use/' },
        { text: translate('page-learn', 'el-GR'), link: '/el/learn/' },
        { text: translate('page-developers', 'el-GR'), link: '/el/developers/' }
      ]
    },
    '/es/': {
      lang: 'es-ES',
      label: translate('name', 'es-ES'),
      title: translate('ethereum', 'es-ES'),
      nav: [
        { text: translate('page-home', 'es-ES'), link: '/es/' },
        { text: translate('page-beginners', 'es-ES'), link: '/es/beginners/' },
        { text: translate('page-use', 'es-ES'), link: '/es/use/' },
        { text: translate('page-learn', 'es-ES'), link: '/es/learn/' },
        { text: translate('page-developers', 'es-ES'), link: '/es/developers/' }
      ]
    },
    '/fr/': {
      lang: 'fr-FR',
      label: translate('name', 'fr-FR'),
      title: translate('ethereum', 'fr-FR'),
      nav: [
        { text: translate('page-home', 'fr-FR'), link: '/fr/' },
        { text: translate('page-beginners', 'fr-FR'), link: '/fr/beginners/' },
        { text: translate('page-use', 'fr-FR'), link: '/fr/use/' },
        { text: translate('page-learn', 'fr-FR'), link: '/fr/learn/' },
        { text: translate('page-developers', 'fr-FR'), link: '/fr/developers/' }
      ]
    },
    '/it/': {
      lang: 'it-IT',
      label: translate('name', 'it-IT'),
      title: translate('ethereum', 'it-IT'),
      nav: [
        { text: translate('page-home', 'it-IT'), link: '/it/' },
        { text: translate('page-beginners', 'it-IT'), link: '/it/beginners/' },
        { text: translate('page-use', 'it-IT'), link: '/it/use/' },
        { text: translate('page-learn', 'it-IT'), link: '/it/learn/' },
        { text: translate('page-developers', 'it-IT'), link: '/it/developers/' }
      ]
    },
    '/ja/': {
      lang: 'ja-JP',
      label: translate('name', 'ja-JP'),
      title: translate('ethereum', 'ja-JP'),
      nav: [
        { text: translate('page-home', 'ja-JP'), link: '/ja/' },
        { text: translate('page-beginners', 'ja-JP'), link: '/ja/beginners/' },
        { text: translate('page-use', 'ja-JP'), link: '/ja/use/' },
        { text: translate('page-learn', 'ja-JP'), link: '/ja/learn/' },
        { text: translate('page-developers', 'ja-JP'), link: '/ja/developers/' }
      ]
    },
    '/ko/': {
      lang: 'ko-KR',
      label: translate('name', 'ko-KR'),
      title: translate('ethereum', 'ko-KR'),
      nav: [
        { text: translate('page-home', 'ko-KR'), link: '/ko/' },
        { text: translate('page-beginners', 'ko-KR'), link: '/ko/beginners/' },
        { text: translate('page-use', 'ko-KR'), link: '/ko/use/' },
        { text: translate('page-learn', 'ko-KR'), link: '/ko/learn/' },
        { text: translate('page-developers', 'ko-KR'), link: '/ko/developers/' }
      ]
    },
    '/sk/': {
      lang: 'sk-SK',
      label: translate('name', 'sk-SK'),
      title: translate('ethereum', 'sk-SK'),
      nav: [
        { text: translate('page-home', 'sk-SK'), link: '/sk/' },
        { text: translate('page-beginners', 'sk-SK'), link: '/sk/beginners/' },
        { text: translate('page-use', 'sk-SK'), link: '/sk/use/' },
        { text: translate('page-learn', 'sk-SK'), link: '/sk/learn/' },
        { text: translate('page-developers', 'sk-SK'), link: '/sk/developers/' }
      ]
    },
    '/ru/': {
      lang: 'ru-RU',
      label: translate('name', 'ru-RU'),
      title: translate('ethereum', 'ru-RU'),
      nav: [
        { text: translate('page-home', 'ru-RU'), link: '/ru/' },
        { text: translate('page-beginners', 'ru-RU'), link: '/ru/beginners/' },
        { text: translate('page-use', 'ru-RU'), link: '/ru/use/' },
        { text: translate('page-learn', 'ru-RU'), link: '/ru/learn/' },
        { text: translate('page-developers', 'ru-RU'), link: '/ru/developers/' }
      ]
    },
    '/zh/': {
      lang: 'zh-CN',
      label: translate('name', 'zh-CN'),
      title: translate('ethereum', 'zh-CN'),
      nav: [
        { text: translate('page-home', 'zh-CN'), link: '/zh/' },
        { text: translate('page-beginners', 'zh-CN'), link: '/zh/beginners/' },
        { text: translate('page-use', 'zh-CN'), link: '/zh/use/' },
        { text: translate('page-learn', 'zh-CN'), link: '/zh/learn/' },
        { text: translate('page-developers', 'zh-CN'), link: '/zh/developers/' }
      ]
    }
  },
  plugins: {
    // TODO remove once we set up Netlify redirects
    redirect: {
      alias: {
        '/foundation/': '/',
        '/pdfs/*': '/',
        '/brand/': '/',
        '/donate/': '/',
        '/ether/': '/use/',
        '/token/': '/developers/',
        '/build/': '/developers/',
        '/crowdsale/': '/developers/',
        '/dao/': '/developers/',
        '/cli/': '/developers/',
        '/greeter/': '/developers/'
      }
    }
  }
};
