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
    'page-home-title': 'Ethereum is a global, open-source platform for decentralized applications.',
    'page-home-subtitle': 'On Ethereum, you can write code that controls digital value, runs exactly as programmed, and is accessible anywhere in the world.',
    'page-home-section-beginners-title': 'Beginners',
    'page-home-section-beginners-item-one': 'Completely new to Ethereum?',
    'page-home-section-beginners-item-two': 'What is Ethereum?',
    'page-home-section-beginners-item-three': 'Why should I care?',
    'page-home-section-use-title': 'Use',
    'page-home-section-use-item-one': 'What can I do with Ethereum today?',
    'page-home-section-use-item-two': 'How do I get Ether?',
    'page-home-section-use-item-three': 'What\'s a wallet?',
    'page-home-section-learn-title': 'Learn',
    'page-home-section-learn-item-one': 'Beginner resources',
    'page-home-section-learn-item-two': 'How Ethereum works',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Developers',
    'page-home-section-developers-item-one': 'Getting started guides',
    'page-home-section-developers-item-two': 'Learn to program smart contracts',
    'page-home-section-developers-item-three': 'Find the latest developer tools',
    'page-home-section-enterprise-title': 'Enterprise',
    'page-home-section-enterprise-item-one': 'Why Enterprise Ethereum?',
    'page-home-section-enterprise-item-two': 'Enterprise Features',
    'page-home-section-enterprise-item-three': 'Enterprise Developer Community',
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
    'page-home-title': '이더리움은 탈중앙화된 애플리케이션을 위한 글로벌 오픈 소스 플랫폼입니다.',
    'page-home-subtitle': '여러분은 이더리움을 통해 디지털화된 가치를 제어하고, 프로그래밍한 대로 작동되며, 전 세계 어디에서든 동일하게 이용할 수 있는 코드를 작성할 수 있습니다.',
    'page-home-section-beginners-title': '입문자',
    'page-home-section-beginners-item-one': '이더리움을 처음 접하시나요?',
    'page-home-section-beginners-item-two': '이더리움이란?',
    'page-home-section-beginners-item-three': '왜 중요한가요?',
    'page-home-section-use-title': '사용하기',
    'page-home-section-use-item-one': '오늘날 이더리움으로 어떤 것을 할 수 있을까요?',
    'page-home-section-use-item-two': '어떻게 이더를 얻을 수 있나요?',
    'page-home-section-use-item-three': '지갑이란 무엇인가요?',
    'page-home-section-learn-title': '배우기',
    'page-home-section-learn-item-one': '입문자를 위한 참고자료',
    'page-home-section-learn-item-two': '이더리움은 어떻게 작동하나요?',
    'page-home-section-learn-item-three': '이더리움 2.0',
    'page-home-section-developers-title': '개발자',
    'page-home-section-developers-item-one': '시작하기',
    'page-home-section-developers-item-two': '스마트 컨트랙트 프로그래밍 배우기',
    'page-home-section-developers-item-three': '최신 개발자 도구 알아보기',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
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
