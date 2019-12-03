const { translate } = require('./theme/utils/translations')
const { renderHeaderWithExplicitAnchor } = require('./theme/utils/markdown')

module.exports = {
  title: 'Ethereum',
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
    anchor: {
      permalinkSymbol: '↳',
      renderPermalink: renderHeaderWithExplicitAnchor
    }
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
        {
          text: translate('page-individuals'),
          ariaLabel: "Individual's Menu",
          items: [
            {
              text: translate('page-home-section-individuals-item-one'),
              link: translate('page-home-section-individuals-item-one-link')
            },
            {
              text: translate('page-home-section-individuals-item-two'),
              link: translate('page-home-section-individuals-item-two-link')
            },
            {
              text: translate('page-home-section-individuals-item-three'),
              link: translate('page-home-section-individuals-item-three-link')
            }
          ]
        },
        {
          text: translate('page-developers'),
          ariaLabel: "Developer's Menu",
          items: [
            {
              text: 'Get Started',
              link: '/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: 'Developer Resources',
              link: '/developers/'
            }
          ]
        },
        { text: translate('page-enterprise'), link: '/enterprise/' }
      ]
    },
    '/cs/': {
      lang: 'cs',
      label: translate('name', 'cs'),
      title: translate('ethereum', 'cs'),
      nav: [
        { text: translate('page-home', 'cs'), link: '/cs/' },
        { text: translate('page-beginners', 'cs'), link: '/cs/beginners/' },
        { text: translate('page-use', 'cs'), link: '/cs/use/' },
        { text: translate('page-learn', 'cs'), link: '/cs/learn/' },
        { text: translate('page-developers', 'cs'), link: '/cs/developers/' }
      ]
    },
    '/de/': {
      lang: 'de',
      label: translate('name', 'de'),
      title: translate('ethereum', 'de'),
      nav: [
        { text: translate('page-home', 'de'), link: '/de/' },
        { text: translate('page-beginners', 'de'), link: '/de/beginners/' },
        { text: translate('page-use', 'de'), link: '/de/use/' },
        { text: translate('page-learn', 'de'), link: '/de/learn/' },
        { text: translate('page-developers', 'de'), link: '/de/developers/' }
      ]
    },
    '/el/': {
      lang: 'el',
      label: translate('name', 'el'),
      title: translate('ethereum', 'el'),
      nav: [
        { text: translate('page-home', 'el'), link: '/el/' },
        { text: translate('page-beginners', 'el'), link: '/el/beginners/' },
        { text: translate('page-use', 'el'), link: '/el/use/' },
        { text: translate('page-learn', 'el'), link: '/el/learn/' },
        { text: translate('page-developers', 'el'), link: '/el/developers/' }
      ]
    },
    '/es/': {
      lang: 'es-EM',
      label: translate('name', 'es-EM'),
      title: translate('ethereum', 'es-EM'),
      nav: [
        { text: translate('page-home', 'es-EM'), link: '/es/' },
        { text: translate('page-beginners', 'es-EM'), link: '/es/beginners/' },
        { text: translate('page-use', 'es-EM'), link: '/es/use/' },
        { text: translate('page-learn', 'es-EM'), link: '/es/learn/' },
        { text: translate('page-developers', 'es-EM'), link: '/es/developers/' }
      ]
    },
    '/fr/': {
      lang: 'fr',
      label: translate('name', 'fr'),
      title: translate('ethereum', 'fr'),
      nav: [
        { text: translate('page-home', 'fr'), link: '/fr/' },
        { text: translate('page-beginners', 'fr'), link: '/fr/beginners/' },
        { text: translate('page-use', 'fr'), link: '/fr/use/' },
        { text: translate('page-learn', 'fr'), link: '/fr/learn/' },
        { text: translate('page-developers', 'fr'), link: '/fr/developers/' }
      ]
    },
    '/ig/': {
      lang: 'ig',
      label: translate('name', 'ig'),
      title: translate('ethereum', 'ig'),
      nav: [
        { text: translate('page-home', 'ig'), link: '/ig/' },
        { text: translate('page-beginners', 'ig'), link: '/ig/beginners/' },
        { text: translate('page-use', 'ig'), link: '/ig/use/' },
        { text: translate('page-learn', 'ig'), link: '/ig/learn/' },
        { text: translate('page-developers', 'ig'), link: '/ig/developers/' }
      ]
    },
    '/it/': {
      lang: 'it',
      label: translate('name', 'it'),
      title: translate('ethereum', 'it'),
      nav: [
        { text: translate('page-home', 'it'), link: '/it/' },
        { text: translate('page-beginners', 'it'), link: '/it/beginners/' },
        { text: translate('page-use', 'it'), link: '/it/use/' },
        { text: translate('page-learn', 'it'), link: '/it/learn/' },
        { text: translate('page-developers', 'it'), link: '/it/developers/' }
      ]
    },
    '/ja/': {
      lang: 'ja',
      label: translate('name', 'ja'),
      title: translate('ethereum', 'ja'),
      nav: [
        { text: translate('page-home', 'ja'), link: '/ja/' },
        { text: translate('page-beginners', 'ja'), link: '/ja/beginners/' },
        { text: translate('page-use', 'ja'), link: '/ja/use/' },
        { text: translate('page-learn', 'ja'), link: '/ja/learn/' },
        { text: translate('page-developers', 'ja'), link: '/ja/developers/' }
      ]
    },
    '/ko/': {
      lang: 'ko',
      label: translate('name', 'ko'),
      title: translate('ethereum', 'ko'),
      nav: [
        { text: translate('page-home', 'ko'), link: '/ko/' },
        { text: translate('page-beginners', 'ko'), link: '/ko/beginners/' },
        { text: translate('page-use', 'ko'), link: '/ko/use/' },
        { text: translate('page-learn', 'ko'), link: '/ko/learn/' },
        { text: translate('page-developers', 'ko'), link: '/ko/developers/' }
      ]
    },
    '/nl/': {
      lang: 'nl',
      label: translate('name', 'nl'),
      title: translate('ethereum', 'nl'),
      nav: [
        { text: translate('page-home', 'nl'), link: '/nl/' },
        { text: translate('page-beginners', 'nl'), link: '/nl/beginners/' },
        { text: translate('page-use', 'nl'), link: '/nl/use/' },
        { text: translate('page-learn', 'nl'), link: '/nl/learn/' },
        { text: translate('page-developers', 'nl'), link: '/nl/developers/' }
      ]
    },
    '/pl/': {
      lang: 'pl',
      label: translate('name', 'pl'),
      title: translate('ethereum', 'pl'),
      nav: [
        { text: translate('page-home', 'pl'), link: '/pl/' },
        { text: translate('page-beginners', 'pl'), link: '/pl/beginners/' },
        { text: translate('page-use', 'pl'), link: '/pl/use/' },
        { text: translate('page-learn', 'pl'), link: '/pl/learn/' },
        { text: translate('page-developers', 'pl'), link: '/pl/developers/' }
      ]
    },
    '/sk/': {
      lang: 'sk',
      label: translate('name', 'sk'),
      title: translate('ethereum', 'sk'),
      nav: [
        { text: translate('page-home', 'sk'), link: '/sk/' },
        { text: translate('page-beginners', 'sk'), link: '/sk/beginners/' },
        { text: translate('page-use', 'sk'), link: '/sk/use/' },
        { text: translate('page-learn', 'sk'), link: '/sk/learn/' },
        { text: translate('page-developers', 'sk'), link: '/sk/developers/' }
      ]
    },
    '/sl/': {
      lang: 'sl',
      label: translate('name', 'sl'),
      title: translate('ethereum', 'sl'),
      nav: [
        { text: translate('page-home', 'sl'), link: '/sl/' },
        { text: translate('page-beginners', 'sl'), link: '/sl/beginners/' },
        { text: translate('page-use', 'sl'), link: '/sl/use/' },
        { text: translate('page-learn', 'sl'), link: '/sl/learn/' },
        { text: translate('page-developers', 'sl'), link: '/sl/developers/' }
      ]
    },
    '/ru/': {
      lang: 'ru',
      label: translate('name', 'ru'),
      title: translate('ethereum', 'ru'),
      nav: [
        { text: translate('page-home', 'ru'), link: '/ru/' },
        { text: translate('page-beginners', 'ru'), link: '/ru/beginners/' },
        { text: translate('page-use', 'ru'), link: '/ru/use/' },
        { text: translate('page-learn', 'ru'), link: '/ru/learn/' },
        { text: translate('page-developers', 'ru'), link: '/ru/developers/' }
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
    },
    '/fa/': {
      lang: 'fa',
      label: translate('name', 'fa'),
      title: translate('ethereum', 'fa'),
      nav: [
        { text: translate('page-home', 'fa'), link: '/fa/' },
        { text: translate('page-beginners', 'fa'), link: '/fa/beginners/' },
        { text: translate('page-use', 'fa'), link: '/fa/use/' },
        { text: translate('page-learn', 'fa'), link: '/fa/learn/' },
        { text: translate('page-developers', 'fa'), link: '/fa/developers/' }
      ]
    },
    '/ar/': {
      lang: 'ar',
      label: translate('name', 'ar'),
      title: translate('ethereum', 'ar'),
      nav: [
        { text: translate('page-home', 'ar'), link: '/ar/' },
        { text: translate('page-beginners', 'ar'), link: '/ar/beginners/' },
        { text: translate('page-use', 'ar'), link: '/ar/use/' },
        { text: translate('page-learn', 'ar'), link: '/ar/learn/' },
        { text: translate('page-developers', 'ar'), link: '/ar/developers/' }
      ]
    }
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: timestamp => timestamp
      }
    ],
    [
      'sitemap',
      {
        hostname: 'https://ethereum.org',
        changefreq: 'weekly'
      }
    ]
  ]
}
