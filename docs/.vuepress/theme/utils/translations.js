// the lang (e.g. 'en-US') is globally accessible in components via `this.$lang`
// it should be specified in the front matter of every markdown page:
// https://vuepress.vuejs.org/guide/markdown.html#front-matter
const translations = {
  'en-US': {
    path: '/',
    language: 'English',
    ethereum: 'Ethereum',
    'link-text-artwork': 'Read about the new artwork!',
    'link-text-more': '→  More',
    'page-home': 'Ethereum',
    'page-beginners': 'Beginners',
    'page-use': 'Use',
    'page-learn': 'Learn',
    'page-developers': 'Developers'
  },
  'ko-KR': {
    path: '/ko/',
    language: '한국어',
    ethereum: '이더리움',
    'link-text-artwork': '새로운 미디어 아트에 대해 읽어보세요!',
    'link-text-more': '→  더 알아보기',
    'page-home': '이더리움이란',
    'page-beginners': '입문자',
    'page-use': '사용법',
    'page-learn': '배우기',
    'page-developers': '개발자 가이드'
  },
  'zh-CN': {
    path: '/zh/',
    // TODO confirm these translations
    language: '简体中文',
    ethereum: '以太坊',
    'link-text-artwork': '阅读有关新艺术品的信息',
    'link-text-more': '→  更多',
    'page-home': '首页',
    'page-beginners': '初学者',
    'page-use': '使用',
    'page-learn': '学习',
    'page-developers': '开发者'
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
