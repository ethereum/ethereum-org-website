const { translate } = require('./theme/utils/translations')
const { renderHeaderWithExplicitAnchor } = require('./theme/utils/markdown')

module.exports = {
  title: 'Ethereum.org',
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
    [
      'meta',
      {
        property: 'og:video',
        content: 'https://www.youtube.com/channel/UCNOfzGXD_C9YMYmnefmPH0g'
      }
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
    ],
    [
      'script',
      { type: 'application/ld+json' },

      `{"@context": "https://schema.org", "@type": "Organization", "url": "https://www.ethereum.org", "email": "press@ethereum.org", "name": "ethereum.org (Ethereum)", "logo": "https://ethereum.org/og-image.png"}`
    ]
  ],
  markdown: {
    anchor: {
      permalinkSymbol: '↳',
      renderPermalink: renderHeaderWithExplicitAnchor
    }
  },
  extendMarkdown: md => {
    md.use(require('markdown-it-attrs'))
    const r = md.renderer.rules

    const buildTag = (token, slf, classname) => {
      // We need to add our md classes
      const mdClasses = token.attrGet('class') || ''
      token.attrSet('class', classname + ' ' + mdClasses)
      let attrs = slf.renderAttrs(token)
      return `<${token.tag} ${attrs}>`
    }

    r.heading_open = (tokens, idx, options, env, slf) => {
      tkn = tokens[idx]
      const anchor =
        tkn.tag == 'h2' || tkn.tag == 'h3' ? 'markdown-heading' : ''
      const classes = [
        // text level class, h1 = l1, h2 = l2, etc
        'l' + tkn.tag.substr(-1),
        anchor,
        // Add classes here
        'tc-text-500'
      ].join(' ')
      return buildTag(tkn, slf, classes)
    }
    r.paragraph_open = (tokens, idx, options, env, slf) =>
      buildTag(tokens[idx], slf, 'l7 tc-text300')
    r.paragraph_close = () => '</p>'
    r.bullet_list_open = (tokens, idx, options, env, slf) =>
      buildTag(tokens[idx], slf, 'l7 tc-text300')
    r.ordered_list_open = (tokens, idx, options, env, slf) =>
      buildTag(tokens[idx], slf, 'l7 tc-text300')
  },

  extendPageData($page) {
    if ($page.path.split('/')[1] == 'translations') {
      $page.path = $page.path.replace('/translations/', '/')
    }
  },
  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US',
      label: translate('language'),
      nav: [
        { text: translate('page-home'), link: '/', hideMobile: true },
        {
          text: translate('page-individuals'),
          ariaLabel: translate('page-individuals-aria-label'),
          items: [
            {
              text: translate('page-home-section-individuals-item-one'),
              link: '/what-is-ethereum/'
            },
            {
              text: translate('page-home-section-individuals-item-four'),
              link: '/eth/'
            },
            {
              text: translate('page-home-section-individuals-item-two'),
              link: '/dapps/'
            },
            {
              text: translate('page-home-section-individuals-item-five'),
              link: '/wallets/'
            },
            {
              text: translate('page-home-section-individuals-item-three'),
              link: '/learn/'
            },
            { text: translate('page-community'), link: '/community/' }
          ]
        },
        {
          text: translate('page-developers'),
          ariaLabel: translate('page-developers-aria-label'),
          items: [
            {
              text: translate('get-started'),
              link: '/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources'),
              link: '/developers/'
            }
          ]
        },
        { text: translate('page-enterprise'), link: '/enterprise/' }
      ]
    },
    '/cs/': {
      lang: 'cs',
      label: translate('language', 'cs'),
      title: translate('ethereum', 'cs'),
      nav: [
        { text: translate('page-home', 'cs'), link: '/cs/' },
        {
          text: translate('page-beginners', 'cs'),
          link: '/cs/what-is-ethereum/'
        },
        { text: translate('page-use', 'cs'), link: '/cs/use/' },
        { text: translate('page-learn', 'cs'), link: '/cs/learn/' },
        { text: translate('page-developers', 'cs'), link: '/cs/developers/' }
      ]
    },
    '/de/': {
      lang: 'de',
      label: translate('language', 'de'),
      title: translate('ethereum', 'de'),
      nav: [
        { text: translate('page-home', 'de'), link: '/de/' },
        {
          text: translate('page-beginners', 'de'),
          link: '/de/what-is-ethereum/'
        },
        { text: translate('page-use', 'de'), link: '/de/use/' },
        { text: translate('page-learn', 'de'), link: '/de/learn/' },
        { text: translate('page-developers', 'de'), link: '/de/developers/' }
      ]
    },
    '/el/': {
      lang: 'el',
      label: translate('language', 'el'),
      title: translate('ethereum', 'el'),
      nav: [
        { text: translate('page-home', 'el'), link: '/el/' },
        {
          text: translate('page-beginners', 'el'),
          link: '/el/what-is-ethereum/'
        },
        { text: translate('page-use', 'el'), link: '/el/use/' },
        { text: translate('page-learn', 'el'), link: '/el/learn/' },
        { text: translate('page-developers', 'el'), link: '/el/developers/' }
      ]
    },
    '/es/': {
      lang: 'es-EM',
      label: translate('language', 'es-EM'),
      title: translate('ethereum', 'es-EM'),
      nav: [
        { text: translate('page-home', 'es-EM'), link: '/es/' },
        {
          text: translate('page-beginners', 'es-EM'),
          link: '/es/what-is-ethereum/'
        },
        { text: translate('page-use', 'es-EM'), link: '/es/use/' },
        { text: translate('page-learn', 'es-EM'), link: '/es/learn/' },
        { text: translate('page-developers', 'es-EM'), link: '/es/developers/' }
      ]
    },
    '/fr/': {
      lang: 'fr',
      label: translate('language', 'fr'),
      title: translate('ethereum', 'fr'),
      nav: [
        { text: translate('page-home', 'fr'), link: '/fr/' },
        {
          text: translate('page-beginners', 'fr'),
          link: '/fr/what-is-ethereum/'
        },
        { text: translate('page-use', 'fr'), link: '/fr/use/' },
        { text: translate('page-learn', 'fr'), link: '/fr/learn/' },
        { text: translate('page-developers', 'fr'), link: '/fr/developers/' }
      ]
    },
    '/id/': {
      lang: 'id',
      label: translate('language', 'id'),
      title: translate('ethereum', 'id'),
      nav: [
        { text: translate('page-home', 'id'), link: '/id/' },
        {
          text: translate('page-individuals', 'id'),
          ariaLabel: "Individual's Menu", // TODO translate & update
          // TODO add /eth, /wallets & /dapps once translated
          items: [
            {
              text: translate('page-home-section-individuals-item-one', 'id'),
              link: '/id/what-is-ethereum/'
            },
            {
              text: translate('page-home-section-individuals-item-two', 'id'),
              link: '/id/use/'
            },
            {
              text: translate('page-home-section-individuals-item-three', 'id'),
              link: '/id/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'id'),
          ariaLabel: "Developer's Menu", // TODO translate & update
          items: [
            {
              text: translate('get-started', 'id'),
              link: '/id/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'id'),
              link: '/id/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'id'), link: '/id/enterprise/' }
      ]
    },
    '/ig/': {
      lang: 'ig',
      label: translate('language', 'ig'),
      title: translate('ethereum', 'ig'),
      nav: [
        { text: translate('page-home', 'ig'), link: '/ig/' },
        {
          text: translate('page-beginners', 'ig'),
          link: '/ig/what-is-ethereum/'
        },
        { text: translate('page-use', 'ig'), link: '/ig/use/' },
        { text: translate('page-learn', 'ig'), link: '/ig/learn/' },
        { text: translate('page-developers', 'ig'), link: '/ig/developers/' }
      ]
    },
    '/it/': {
      lang: 'it',
      label: translate('language', 'it'),
      title: translate('ethereum', 'it'),
      nav: [
        { text: translate('page-home', 'it'), link: '/it/' },
        {
          text: translate('page-beginners', 'it'),
          link: '/it/what-is-ethereum/'
        },
        { text: translate('page-use', 'it'), link: '/it/use/' },
        { text: translate('page-learn', 'it'), link: '/it/learn/' },
        { text: translate('page-developers', 'it'), link: '/it/developers/' }
      ]
    },
    '/ja/': {
      lang: 'ja',
      label: translate('language', 'ja'),
      title: translate('ethereum', 'ja'),
      nav: [
        { text: translate('page-home', 'ja'), link: '/ja/' },
        {
          text: translate('page-beginners', 'ja'),
          link: '/ja/what-is-ethereum/'
        },
        { text: translate('page-use', 'ja'), link: '/ja/use/' },
        { text: translate('page-learn', 'ja'), link: '/ja/learn/' },
        { text: translate('page-developers', 'ja'), link: '/ja/developers/' }
      ]
    },
    '/ko/': {
      lang: 'ko',
      label: translate('language', 'ko'),
      title: translate('ethereum', 'ko'),
      nav: [
        { text: translate('page-home', 'ko'), link: '/ko/' },
        {
          text: translate('page-beginners', 'ko'),
          link: '/ko/what-is-ethereum/'
        },
        { text: translate('page-use', 'ko'), link: '/ko/use/' },
        { text: translate('page-learn', 'ko'), link: '/ko/learn/' },
        { text: translate('page-developers', 'ko'), link: '/ko/developers/' }
      ]
    },
    '/nl/': {
      lang: 'nl',
      label: translate('language', 'nl'),
      title: translate('ethereum', 'nl'),
      nav: [
        { text: translate('page-home', 'nl'), link: '/nl/' },
        {
          text: translate('page-beginners', 'nl'),
          link: '/nl/what-is-ethereum/'
        },
        { text: translate('page-use', 'nl'), link: '/nl/use/' },
        { text: translate('page-learn', 'nl'), link: '/nl/learn/' },
        { text: translate('page-developers', 'nl'), link: '/nl/developers/' }
      ]
    },
    '/pl/': {
      lang: 'pl',
      label: translate('language', 'pl'),
      title: translate('ethereum', 'pl'),
      nav: [
        { text: translate('page-home', 'pl'), link: '/pl/' },
        {
          text: translate('page-beginners', 'pl'),
          link: '/pl/what-is-ethereum/'
        },
        { text: translate('page-use', 'pl'), link: '/pl/use/' },
        { text: translate('page-learn', 'pl'), link: '/pl/learn/' },
        { text: translate('page-developers', 'pl'), link: '/pl/developers/' }
      ]
    },
    '/pt-br/': {
      lang: 'pt-BR',
      label: translate('language', 'pt-BR'),
      title: translate('ethereum', 'pt-BR'),
      nav: [
        { text: translate('page-home', 'pt-BR'), link: '/pt-br/' },
        {
          text: translate('page-beginners', 'pt-BR'),
          link: '/pt-br/what-is-ethereum/'
        },
        { text: translate('page-use', 'pt-BR'), link: '/pt-br/use/' },
        { text: translate('page-learn', 'pt-BR'), link: '/pt-br/learn/' },
        {
          text: translate('page-developers', 'pt-BR'),
          link: '/pt-br/developers/'
        }
      ]
    },
    '/se/': {
      lang: 'sv-SE',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'sv-SE'), link: '/se/' },
        {
          text: translate('page-individuals', 'sv-SE'),
          ariaLabel: translate('page-individuals-aria-label', 'sv-SE'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'sv-SE'
              ),
              link: '/se/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'sv-SE'
              ),
              link: '/se/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'sv-SE'
              ),
              link: '/se/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'sv-SE'
              ),
              link: '/se/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'sv-SE'
              ),
              link: '/se/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'sv-SE'),
          ariaLabel: translate('page-developers-aria-label', 'sv-SE'),
          items: [
            {
              text: translate('get-started', 'sv-SE'),
              link: '/se/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'sv-SE'),
              link: '/se/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'sv-SE'), link: '/se/enterprise/' }
      ]
    },
    '/sk/': {
      lang: 'sk',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'sk'), link: '/sk/' },
        {
          text: translate('page-individuals', 'sk'),
          ariaLabel: translate('page-individuals-aria-label', 'sk'),
          items: [
            {
              text: translate('page-home-section-individuals-item-one', 'sk'),
              link: '/sk/what-is-ethereum/'
            },
            {
              text: translate('page-home-section-individuals-item-four', 'sk'),
              link: '/sk/eth/'
            },
            {
              text: translate('page-home-section-individuals-item-two', 'sk'),
              link: '/sk/dapps/'
            },
            {
              text: translate('page-home-section-individuals-item-five', 'sk'),
              link: '/sk/wallets/'
            },
            {
              text: translate('page-home-section-individuals-item-three', 'sk'),
              link: '/sk/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'sk'),
          ariaLabel: translate('page-developers-aria-label', 'sk'),
          items: [
            {
              text: translate('get-started', 'sk'),
              link: '/sk/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'sk'),
              link: '/sk/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'sk'), link: '/sk/enterprise/' }
      ]
    },
    '/sl/': {
      lang: 'sl',
      label: translate('language', 'sl'),
      title: translate('ethereum', 'sl'),
      nav: [
        { text: translate('page-home', 'sl'), link: '/sl/' },
        {
          text: translate('page-beginners', 'sl'),
          link: '/sl/what-is-ethereum/'
        },
        { text: translate('page-use', 'sl'), link: '/sl/use/' },
        { text: translate('page-learn', 'sl'), link: '/sl/learn/' },
        { text: translate('page-developers', 'sl'), link: '/sl/developers/' }
      ]
    },
    '/ru/': {
      lang: 'ru',
      label: translate('language', 'ru'),
      title: translate('ethereum', 'ru'),
      nav: [
        { text: translate('page-home', 'ru'), link: '/ru/' },
        {
          text: translate('page-beginners', 'ru'),
          link: '/ru/what-is-ethereum/'
        },
        { text: translate('page-use', 'ru'), link: '/ru/use/' },
        { text: translate('page-learn', 'ru'), link: '/ru/learn/' },
        { text: translate('page-developers', 'ru'), link: '/ru/developers/' }
      ]
    },
    '/zh/': {
      lang: 'zh-CN',
      label: translate('language', 'zh-CN'),
      title: translate('ethereum', 'zh-CN'),
      nav: [
        { text: translate('page-home', 'zh-CN'), link: '/zh/' },
        {
          text: translate('page-beginners', 'zh-CN'),
          link: '/zh/what-is-ethereum/'
        },
        { text: translate('page-use', 'zh-CN'), link: '/zh/use/' },
        { text: translate('page-learn', 'zh-CN'), link: '/zh/learn/' },
        { text: translate('page-developers', 'zh-CN'), link: '/zh/developers/' }
      ]
    },
    '/fa/': {
      lang: 'fa',
      label: translate('language', 'fa'),
      title: translate('ethereum', 'fa'),
      nav: [
        { text: translate('page-home', 'fa'), link: '/fa/' },
        {
          text: translate('page-beginners', 'fa'),
          link: '/fa/what-is-ethereum/'
        },
        { text: translate('page-use', 'fa'), link: '/fa/use/' },
        { text: translate('page-learn', 'fa'), link: '/fa/learn/' },
        { text: translate('page-developers', 'fa'), link: '/fa/developers/' }
      ]
    },
    '/ar/': {
      lang: 'ar',
      label: translate('language', 'ar'),
      title: translate('ethereum', 'ar'),
      nav: [
        { text: translate('page-home', 'ar'), link: '/ar/' },
        {
          text: translate('page-beginners', 'ar'),
          link: '/ar/what-is-ethereum/'
        },
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
