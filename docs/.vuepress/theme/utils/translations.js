// the lang (e.g. 'en-US') is globally accessible in components via `this.$lang`
// it should be specified in the front matter of every markdown page:
// https://vuepress.vuejs.org/guide/markdown.html#front-matter

// String translations are imported from a `strings.json` file within each lang directory.
// This is to make the files compatible with CrowdIn & easily exportable/uploadable.
const english = require('../../../strings.json')
const ar = require('../../../ar/strings.json')
const cs = require('../../../cs/strings.json')
const de = require('../../../de/strings.json')
const el = require('../../../el/strings.json')
const spanishModern = require('../../../es/strings.json')
const fa = require('../../../fa/strings.json')
const fr = require('../../../fr/strings.json')
const ig = require('../../../ig/strings.json')
const it = require('../../../it/strings.json')
const ja = require('../../../ja/strings.json')
const ko = require('../../../ko/strings.json')
const nl = require('../../../nl/strings.json')
const pl = require('../../../pl/strings.json')
const portugueseBrazilian = require('../../../pt-br/strings.json')
const ru = require('../../../ru/strings.json')
const sk = require('../../../sk/strings.json')
const sl = require('../../../sl/strings.json')
const simplifiedChinese = require('../../../zh/strings.json')

// These lang keys should match the equivalent CrowdIn translation page
// e.g. `es-EM` --> https://crowdin.com/project/ethereumfoundation/es-EM
// e.g. `nl` --> https://crowdin.com/project/ethereumfoundation/nl
const stringTranslations = {
  'en-US': english,
  ar,
  cs,
  de,
  el,
  'es-EM': spanishModern,
  fa,
  fr,
  ig,
  it,
  ja,
  ko,
  nl,
  pl,
  'pt-BR': portugueseBrazilian,
  ru,
  sk,
  sl,
  'zh-CN': simplifiedChinese
}

// These lang keys should match `stringTranslations` keys
const languageMetaData = {
  'en-US': {
    language: 'English',
    'language-english': 'English',
    path: '/'
  },
  ar: { language: 'العربية', 'language-english': 'Arabic', path: '/ar/' },
  cs: { language: 'čeština', 'language-english': 'Czech', path: '/cs/' },
  de: { language: 'Deutsch', 'language-english': 'German', path: '/de/' },
  el: { language: 'Ελληνικά', 'language-english': 'Greek', path: '/el/' },
  'es-EM': { language: 'Español', 'language-english': 'Spanish', path: '/es/' },
  fa: { language: 'فارسی', 'language-english': 'Farsi', path: '/fa/' },
  fr: { language: 'Français', 'language-english': 'French', path: '/fr/' },
  ig: { language: 'Ibo', 'language-english': 'Igbo', path: '/ig/' },
  it: { language: 'Italiano', 'language-english': 'Italian', path: '/it/' },
  ja: { language: '日本語', 'language-english': 'Japanese', path: '/ja/' },
  ko: { language: '한국어', 'language-english': 'Korean', path: '/ko/' },
  nl: { language: 'Nederlands', 'language-english': 'Dutch', path: '/nl/' },
  pl: { language: 'Polski', 'language-english': 'Polish', path: '/pl/' },
  'pt-BR': {
    language: 'Português',
    'language-english': 'Portuguese (Brazilian)',
    path: '/pt-br/'
  },
  ru: { language: 'Pусский', 'language-english': 'Russian', path: '/ru/' },
  sk: { language: 'Slovenský', 'language-english': 'Slovak', path: '/sk/' },
  sl: { language: 'Slovenija', 'language-english': 'Slovenian', path: '/sl/' },
  'zh-CN': {
    language: '简体中文',
    'language-english': 'Simplified Chinese',
    path: '/zh/'
  }
}

// Merge stringTranslations & languageMetaData
let translations = {}
for (const lang in stringTranslations) {
  const langTranslationsAndMeta = Object.assign(
    {},
    stringTranslations[lang],
    languageMetaData[lang]
  )
  translations[lang] = langTranslationsAndMeta
}

const translate = (lookup, lang = 'en-US') => {
  const translation = translations[lang][lookup]
  if (translation === undefined) {
    console.warn(`No translation for: "${lookup}" on lang: "${lang}"`)
  }
  return translation || ''
}

module.exports = {
  translate,
  translations
}
