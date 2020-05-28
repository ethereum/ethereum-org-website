const fs = require('fs')
const { parse } = require('twemoji-parser')
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
      'script',
      { type: 'application/ld+json' },

      `{"@context": "https://schema.org", "@type": "Organization", "url": "https://ethereum.org", "email": "press@ethereum.org", "name": "Ethereum", "logo": "https://ethereum.org/og-image.png"}`
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

    r.emoji = (token, idx) => {
      // Get file name from parser
      let file = parse(token[idx].content)
        .find(({ url }) => url)
        .url.split('/')
        .pop()
      // get svg file contents, remove xml tag, and add a class
      let svg = fs.readFileSync('node_modules/twemoji/svg/' + file, 'utf8')
      svg = svg.replace(/\<?[^)]+\?>/im, '')
      svg = svg.replace(/<svg/g, '<svg class="twemoji-svg"')
      return svg
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
    '/bn/': {
      lang: 'bn-BD',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'bn-BD'), link: '/bn/' },
        {
          text: translate('page-individuals', 'bn-BD'),
          ariaLabel: translate('page-individuals-aria-label', 'bn-BD'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'bn-BD'
              ),
              link: '/bn/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'bn-BD'
              ),
              link: '/bn/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'bn-BD'
              ),
              link: '/bn/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'bn-BD'
              ),
              link: '/bn/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'bn-BD'
              ),
              link: '/bn/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'bn-BD'),
          ariaLabel: translate('page-developers-aria-label', 'bn-BD'),
          items: [
            {
              text: translate('get-started', 'bn-BD'),
              link: '/bn/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'bn-BD'),
              link: '/bn/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'bn-BD'), link: '/bn/enterprise/' }
      ]
    },
    '/de/': {
      lang: 'de-DE',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'de-DE'), link: '/de/' },
        {
          text: translate('page-individuals', 'de-DE'),
          ariaLabel: translate('page-individuals-aria-label', 'de-DE'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'de-DE'
              ),
              link: '/de/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'de-DE'
              ),
              link: '/de/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'de-DE'
              ),
              link: '/de/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'de-DE'
              ),
              link: '/de/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'de-DE'
              ),
              link: '/de/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'de-DE'),
          ariaLabel: translate('page-developers-aria-label', 'de-DE'),
          items: [
            {
              text: translate('get-started', 'de-DE'),
              link: '/de/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'de-DE'),
              link: '/de/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'de-DE'), link: '/de/enterprise/' }
      ]
    },
    '/el/': {
      lang: 'el',
      label: translate('language', 'el'),
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
      lang: 'fr-FR',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'fr-FR'), link: '/fr/' },
        {
          text: translate('page-individuals', 'fr-FR'),
          ariaLabel: translate('page-individuals-aria-label', 'fr-FR'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'fr-FR'
              ),
              link: '/fr/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'fr-FR'
              ),
              link: '/fr/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'fr-FR'
              ),
              link: '/fr/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'fr-FR'
              ),
              link: '/fr/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'fr-FR'
              ),
              link: '/fr/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'fr-FR'),
          ariaLabel: translate('page-developers-aria-label', 'fr-FR'),
          items: [
            {
              text: translate('get-started', 'fr-FR'),
              link: '/fr/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'fr-FR'),
              link: '/fr/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'fr-FR'), link: '/fr/enterprise/' }
      ]
    },
    '/id/': {
      lang: 'id-ID',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'id-ID'), link: '/id/' },
        {
          text: translate('page-individuals', 'id-ID'),
          ariaLabel: translate('page-individuals-aria-label', 'id-ID'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'id-ID'
              ),
              link: '/id/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'id-ID'
              ),
              link: '/id/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'id-ID'
              ),
              link: '/id/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'id-ID'
              ),
              link: '/id/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'id-ID'
              ),
              link: '/id/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'id-ID'),
          ariaLabel: translate('page-developers-aria-label', 'id-ID'),
          items: [
            {
              text: translate('get-started', 'id-ID'),
              link: '/id/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'id-ID'),
              link: '/id/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'id-ID'), link: '/id/enterprise/' }
      ]
    },
    '/ig/': {
      lang: 'ig',
      label: translate('language', 'ig'),
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
    '/ml/': {
      lang: 'ml-IN',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'ml-IN'), link: '/ml/' },
        {
          text: translate('page-individuals', 'ml-IN'),
          ariaLabel: translate('page-individuals-aria-label', 'ml-IN'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'ml-IN'
              ),
              link: '/ml/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'ml-IN'
              ),
              link: '/ml/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'ml-IN'
              ),
              link: '/ml/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'ml-IN'
              ),
              link: '/ml/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'ml-IN'
              ),
              link: '/ml/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'ml-IN'),
          ariaLabel: translate('page-developers-aria-label', 'ml-IN'),
          items: [
            {
              text: translate('get-started', 'ml-IN'),
              link: '/ml/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'ml-IN'),
              link: '/ml/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'ml-IN'), link: '/ml/enterprise/' }
      ]
    },
    '/nl/': {
      lang: 'nl',
      label: translate('language', 'nl'),
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
    '/no/': {
      lang: 'nb-NO',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'nb-NO'), link: '/no/' },
        {
          text: translate('page-individuals', 'nb-NO'),
          ariaLabel: translate('page-individuals-aria-label', 'nb-NO'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'nb-NO'
              ),
              link: '/no/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'nb-NO'
              ),
              link: '/no/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'nb-NO'
              ),
              link: '/no/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'nb-NO'
              ),
              link: '/no/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'nb-NO'
              ),
              link: '/no/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'nb-NO'),
          ariaLabel: translate('page-developers-aria-label', 'nb-NO'),
          items: [
            {
              text: translate('get-started', 'nb-NO'),
              link: '/no/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'nb-NO'),
              link: '/no/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'nb-NO'), link: '/se/enterprise/' }
      ]
    },
    '/pl/': {
      lang: 'pl',
      label: translate('language', 'pl'),
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
    '/ro/': {
      lang: 'ro-RO',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'ro-RO'), link: '/ro/' },
        {
          text: translate('page-individuals', 'ro-RO'),
          ariaLabel: translate('page-individuals-aria-label', 'ro-RO'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'ro-RO'
              ),
              link: '/ro/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'ro-RO'
              ),
              link: '/ro/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'ro-RO'
              ),
              link: '/ro/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'ro-RO'
              ),
              link: '/ro/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'ro-RO'
              ),
              link: '/ro/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'ro-RO'),
          ariaLabel: translate('page-developers-aria-label', 'ro-RO'),
          items: [
            {
              text: translate('get-started', 'ro-RO'),
              link: '/ro/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'ro-RO'),
              link: '/ro/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'ro-RO'), link: '/ro/enterprise/' }
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
    '/tr/': {
      lang: 'tr',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'tr'), link: '/tr/' },
        {
          text: translate('page-individuals', 'tr'),
          ariaLabel: translate('page-individuals-aria-label', 'tr'),
          items: [
            {
              text: translate('page-home-section-individuals-item-one', 'tr'),
              link: '/tr/what-is-ethereum/'
            },
            {
              text: translate('page-home-section-individuals-item-four', 'tr'),
              link: '/tr/eth/'
            },
            {
              text: translate('page-home-section-individuals-item-two', 'tr'),
              link: '/tr/dapps/'
            },
            {
              text: translate('page-home-section-individuals-item-five', 'tr'),
              link: '/tr/wallets/'
            },
            {
              text: translate('page-home-section-individuals-item-three', 'tr'),
              link: '/tr/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'tr'),
          ariaLabel: translate('page-developers-aria-label', 'tr'),
          items: [
            {
              text: translate('get-started', 'tr'),
              link: '/tr/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'tr'),
              link: '/tr/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'tr'), link: '/tr/enterprise/' }
      ]
    },
    '/zh/': {
      lang: 'zh-CN',
      label: translate('language', 'zh-CN'),
      nav: [
        { text: translate('page-home', 'zh-CN'), link: '/zh/' },
        {
          text: translate('page-individuals', 'zh-CN'),
          ariaLabel: translate('page-individuals-aria-label', 'zh-CN'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'zh-CN'
              ),
              link: '/zh/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'zh-CN'
              ),
              link: '/zh/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'zh-CN'
              ),
              link: '/zh/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'zh-CN'
              ),
              link: '/zh/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'zh-CN'
              ),
              link: '/zh/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'zh-CN'),
          ariaLabel: translate('page-developers-aria-label', 'zh-CN'),
          items: [
            {
              text: translate('get-started', 'zh-CN'),
              link: '/zh/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'zh-CN'),
              link: '/zh/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'zh-CN'), link: '/zh/enterprise/' }
      ]
    },
    '/zh-tw/': {
      lang: 'zh-TW',
      label: translate('language', 'zh-TW'),
      nav: [
        { text: translate('page-home', 'zh-TW'), link: '/zh-tw/' },
        {
          text: translate('page-individuals', 'zh-TW'),
          ariaLabel: translate('page-individuals-aria-label', 'zh-TW'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'zh-TW'
              ),
              link: '/zh-tw/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'zh-TW'
              ),
              link: '/zh-tw/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'zh-TW'
              ),
              link: '/zh-tw/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'zh-TW'
              ),
              link: '/zh-tw/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'zh-TW'
              ),
              link: '/zh-tw/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'zh-TW'),
          ariaLabel: translate('page-developers-aria-label', 'zh-TW'),
          items: [
            {
              text: translate('get-started', 'zh-TW'),
              link: '/zh-tw/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'zh-TW'),
              link: '/zh-tw/developers/'
            }
          ]
        },
        {
          text: translate('page-enterprise', 'zh-TW'),
          link: '/zh-tw/enterprise/'
        }
      ]
    },
    '/fa/': {
      lang: 'fa',
      label: translate('language', 'fa'),
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
      lang: 'ar-AR',
      label: translate('language'),
      nav: [
        { text: translate('page-home', 'ar-AR'), link: '/ar/' },
        {
          text: translate('page-individuals', 'ar-AR'),
          ariaLabel: translate('page-individuals-aria-label', 'ar-AR'),
          items: [
            {
              text: translate(
                'page-home-section-individuals-item-one',
                'ar-AR'
              ),
              link: '/ar/what-is-ethereum/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-four',
                'ar-AR'
              ),
              link: '/ar/eth/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-two',
                'ar-AR'
              ),
              link: '/ar/dapps/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-five',
                'ar-AR'
              ),
              link: '/ar/wallets/'
            },
            {
              text: translate(
                'page-home-section-individuals-item-three',
                'ar-AR'
              ),
              link: '/ar/learn/'
            }
          ]
        },
        {
          text: translate('page-developers', 'ar-AR'),
          ariaLabel: translate('page-developers-aria-label', 'ar-AR'),
          items: [
            {
              text: translate('get-started', 'ar-AR'),
              link: '/ar/build/'
            },
            {
              text: 'Ethereum Studio',
              link: 'https://studio.ethereum.org/'
            },
            {
              text: translate('developer-resources', 'ar-AR'),
              link: '/ar/developers/'
            }
          ]
        },
        { text: translate('page-enterprise', 'ar-AR'), link: '/ar/enterprise/' }
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
    ],
    ['vuepress-plugin-ipfs'],
    [
      'vuepress-plugin-canonical',
      {
        baseURL: 'https://ethereum.org',
        stringExtension: true
      }
    ]
  ],
  themeConfig: {
    algolia: {
      apiKey: 'f57f4f44f67b48ac256292b74ab0c304',
      indexName: 'ethereum'
    }
  }
}
