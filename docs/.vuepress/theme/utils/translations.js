// the lang (e.g. 'en-US') is globally accessible in components via this.$lang
// it's specified in the front matter of every markdown page:
// https://vuepress.vuejs.org/guide/markdown.html#front-matter
const translations = {
  'en-US': {
    ethereum: 'Ethereum',
    languages: 'Languages',
    'language-english': 'English',
    'language-korean': 'Korean',
    'page-home': 'Ethereum',
    'page-beginners': 'Beginners',
    'page-use': 'Use',
    'page-learn': 'Learn',
    'page-developers': 'Developers'
  },
  'ko-KR': {
    ethereum: '이더리움은',
    languages: '언어',
    'language-english': '영어',
    'language-korean': '한국어',
    'page-home': '이더리움은',
    'page-beginners': '입문자',
    'page-use': '사용법',
    'page-learn': '배우기',
    'page-developers': '개발자 가이드'
  }
};

const translate = (lookup, lang = 'en-US') => {
  const translation = translations[lang][lookup];
  if (translation === undefined) {
    console.error(`No translation for: ${lookup} on lang: ${lang}`);
  }
  return translation || '';
};

module.exports = {
  translate
};
