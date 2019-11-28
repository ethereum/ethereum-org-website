// the lang (e.g. 'en-US') is globally accessible in components via `this.$lang`
// it should be specified in the front matter of every markdown page:
// https://vuepress.vuejs.org/guide/markdown.html#front-matter

// These lang keys should match the equivalent CrowdIn translation page
// e.g. `es-EM` --> https://crowdin.com/project/ethereumfoundation/es-EM
// e.g. `nl` --> https://crowdin.com/project/ethereumfoundation/nl
const translations = {
  'en-US': {
    path: '/',
    name: 'English',
    'english-name': 'English',
    ethereum: 'Ethereum',
    'page-last-updated': 'Page last updated',
    'website-last-updated': 'Website last updated',
    'page-home': 'Ethereum',
    'page-home-title':
      'Ethereum is a global, open-source platform for decentralized applications.',
    'page-home-subtitle':
      'On Ethereum, you can write code that controls digital value, runs exactly as programmed, and is accessible anywhere in the world.',
    'page-home-section-beginners-title': 'Beginners', // TODO remove for all langs
    'page-home-section-beginners-item-one': 'Completely new to Ethereum?', // TODO remove for all langs
    'page-home-section-beginners-item-two': 'What is Ethereum?', // TODO remove for all langs
    'page-home-section-beginners-item-three': 'Why should I care?', // TODO remove for all langs
    'page-home-section-use-title': 'Use', // TODO remove for all langs
    'page-home-section-use-item-one': 'What can I do with Ethereum today?', // TODO remove for all langs
    'page-home-section-use-item-two': 'How do I get Ether?', // TODO remove for all langs
    'page-home-section-use-item-three': "What's a wallet?", // TODO remove for all langs
    'page-home-section-individuals-title': 'For Individuals',
    'page-home-section-individuals-item-one': 'What is Ethereum?',
    'page-home-section-individuals-item-one-link': '/beginners/',
    'page-home-section-individuals-item-two': 'Use Ethereum',
    'page-home-section-individuals-item-two-link': '/use/',
    'page-home-section-individuals-item-three': 'Guides & Resources',
    'page-home-section-individuals-item-three-link': '/learn/',
    'page-home-section-learn-title': 'Learn',
    'page-home-section-learn-item-one': 'Beginner resources',
    'page-home-section-learn-item-two': 'How Ethereum works',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'For Developers',
    'page-home-section-developers-item-one': 'Getting started guides',
    'page-home-section-developers-item-two': 'Learn to program smart contracts',
    'page-home-section-developers-item-two-link':
      '/developers/#smart-contract-languages',
    'page-home-section-developers-item-three': 'Latest developer tools',
    'page-home-section-developers-item-three-link':
      '/developers/#developer-tools',
    'page-home-section-enterprise-title': 'For Enterprise',
    'page-home-section-enterprise-item-one': 'Why Enterprise Ethereum?',
    'page-home-section-enterprise-item-two': 'Enterprise Features',
    'page-home-section-enterprise-item-three': 'Enterprise Developer Community',
    'page-beginners': 'Beginners', // TODO remove
    'page-use': 'Use', // TODOD update key to 'page-indivduals' when rolled across languages
    'page-individuals': 'Individuals',
    'page-learn': 'Learn', // TODO remove
    'page-enterprise': 'Enterprise', // TODO add for other languages
    'page-developers': 'Developers'
  },
  de: {
    path: '/de/',
    name: 'Deutsch',
    'english-name': 'German',
    ethereum: 'Ethereum',
    'page-last-updated': 'Seite zuletzt aktualisiert',
    'website-last-updated': 'Website zuletzt aktualisiert',
    'page-home': 'Startseite',
    'page-home-title':
      'Ethereum ist eine globale Open-Source-Plattform für dezentralisierte Anwendungen.',
    'page-home-subtitle':
      'Auf Ethereum kannst du Code schreiben, der digitale Werte verwaltet, der exakt wie programmiert ausgeführt wird und der von überall auf der Welt zugänglich ist.',
    'page-home-section-beginners-title': 'Anfänger',
    'page-home-section-beginners-item-one': 'Neu bei Ethereum?',
    'page-home-section-beginners-item-two': 'Was ist Ethereum?',
    'page-home-section-beginners-item-three': 'Welchen Nutzen bringt es mir?',
    'page-home-section-use-title': 'Anwendung',
    'page-home-section-use-item-one':
      'Was kann ich schon heute mit Ethereum tun?',
    'page-home-section-use-item-two': 'Wie komme ich an Ether?',
    'page-home-section-use-item-three': 'Was ist eine Wallet?',
    'page-home-section-learn-title': 'Lernen',
    'page-home-section-learn-item-one': 'Die Ethereum-Grundlagen',
    'page-home-section-learn-item-two': 'Wie Ethereum funktioniert',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Entwickler',
    'page-home-section-developers-item-one': 'Erste Schritte',
    'page-home-section-developers-item-two':
      'Lerne Smart Contracts zu programmieren',
    'page-home-section-developers-item-three':
      'Finde die neuesten Entwickler-Tools',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Anfänger',
    'page-use': 'Anwendung',
    'page-learn': 'Lernen',
    'page-developers': 'Entwickler'
  },
  el: {
    path: '/el/',
    name: 'Ελληνικά',
    'english-name': 'Greek',
    ethereum: 'Ethereum',
    'page-last-updated': 'Η τελευταία σελίδα ενημερώθηκε',
    'website-last-updated': 'Η ιστοσελίδα ενημερώθηκε τελευταία',
    'page-home': 'Αρχική',
    'page-home-title':
      'Το Ethereum είναι μια παγκόσμια πλατφόρμα ανοικτού κώδικα για αποκεντρωμένες εφαρμογές.’',
    'page-home-subtitle':
      'Στο Ethereum, μπορείτε να γράψετε κώδικα ο οποίος ελέγχει ψηφιακές αξίες, τρέχει ακριβώς όπως έχει προγραμματιστεί και είναι προσβάσιμος οπουδήποτε στον κόσμο.',
    'page-home-section-beginners-title': 'Αρχάριοι',
    'page-home-section-beginners-item-one': 'Εντελώς καινούργιοι στο Ethereum;',
    'page-home-section-beginners-item-two': 'Τι είναι το Ethereum;',
    'page-home-section-beginners-item-three': 'Γιατί να ενδιαφερθώ;',
    'page-home-section-use-title': 'Χρήση',
    'page-home-section-use-item-one': 'Τι μπορώ να κάνω σήμερα με το Ethereum;',
    'page-home-section-use-item-two': 'Πώς μπορώ να αποκτήσω Ether;',
    'page-home-section-use-item-three': 'Τι είναι το πορτοφόλι;',
    'page-home-section-learn-title': 'Μάθηση',
    'page-home-section-learn-item-one': 'Βοηθήματα για αρχάριους',
    'page-home-section-learn-item-two': 'Πώς λειτουργεί το Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Προγραμματιστές',
    'page-home-section-developers-item-one': 'Οδηγός έναρξης',
    'page-home-section-developers-item-two':
      'Μάθετε να προγραμματίζετε τα Smart Contracts',
    'page-home-section-developers-item-three':
      'Βρείτε τα τελευταία εργαλεία προγραμματισμού',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Αρχάριοι',
    'page-use': 'Χρήση',
    'page-learn': 'Μάθηση',
    'page-developers': 'Προγραμματιστές'
  },
  'es-EM': {
    path: '/es/',
    name: 'Español',
    'english-name': 'Spanish',
    ethereum: 'Ethereum',
    'page-last-updated': 'Última actualización de la página',
    'website-last-updated': 'Sitio web actualizado por última vez',
    'page-home': 'Inicio',
    'page-home-title':
      'Ethereum es una plataforma global de código abierto para aplicaciones descentralizadas.',
    'page-home-subtitle':
      'En Ethereum, puedes escribir código que controle valor digital, que se ejecute exactamente como fue programado y que sea accesible desde cualquier parte del mundo.',
    'page-home-section-beginners-title': 'Principiantes',
    'page-home-section-beginners-item-one': '¿Completamente nuevo en Ethereum?',
    'page-home-section-beginners-item-two': '¿Qué es Ethereum?',
    'page-home-section-beginners-item-three': '¿Por qué me debería interesar?',
    'page-home-section-use-title': 'Uso',
    'page-home-section-use-item-one':
      '¿Qué puedo hacer con Ethereum hoy en día?',
    'page-home-section-use-item-two': '¿Cómo puedo obtener Ether?',
    'page-home-section-use-item-three': '¿Qué es una billetera?',
    'page-home-section-learn-title': 'Aprender',
    'page-home-section-learn-item-one': 'Recursos para principiantes',
    'page-home-section-learn-item-two': 'Cómo funciona Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Desarrolladores',
    'page-home-section-developers-item-one': 'Guías de inicio',
    'page-home-section-developers-item-two':
      'Aprende a programar contratos inteligentes',
    'page-home-section-developers-item-three':
      'Encuentra las últimas herramientas para desarrolladores',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Principiantes',
    'page-use': 'Uso',
    'page-learn': 'Aprender',
    'page-developers': 'Desarrolladores'
  },
  fr: {
    path: '/fr/',
    name: 'Français',
    'english-name': 'French',
    ethereum: 'Ethereum',
    'page-last-updated': 'Dernière mise à jour',
    'website-last-updated': 'Dernière mise à jour du site',
    'page-home': 'Accueil',
    'page-home-title':
      'Ethereum est une plate-forme globale et open-source pour des applications décentralisées.',
    'page-home-subtitle':
      "Sur Ethereum, vous pouvez écrire du code qui contrôle un actif numérique, qui s'exécute exactement comme il a été programmé et qui est accessible partout dans le monde.",
    'page-home-section-beginners-title': 'Débutants',
    'page-home-section-beginners-item-one':
      'Vous ne connaissez rien à Ethereum ?',
    'page-home-section-beginners-item-two': "Qu'est-ce qu'Ethereum ?",
    'page-home-section-beginners-item-three':
      'En quoi est-ce que ça me concerne ?',
    'page-home-section-use-title': 'Utilisation',
    'page-home-section-use-item-one':
      "Que puis-je faire avec Ethereum aujourd'hui ?",
    'page-home-section-use-item-two': "Comment obtenir de l'Ether ?",
    'page-home-section-use-item-three':
      "Qu'est-ce qu'un portefeuille (wallet) ?",
    'page-home-section-learn-title': 'Apprendre',
    'page-home-section-learn-item-one': 'Ressources pour débutants',
    'page-home-section-learn-item-two': 'Comment fonctionne Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Développeurs',
    'page-home-section-developers-item-one': 'Guides de démarrage',
    'page-home-section-developers-item-two':
      'Apprendre à programmer des smart contracts',
    'page-home-section-developers-item-three':
      'Trouver les derniers outils de développement',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Débutants',
    'page-use': 'Utiliser',
    'page-learn': 'Apprendre',
    'page-developers': 'Développeurs'
  },
  it: {
    path: '/it/',
    name: 'Italiano',
    'english-name': 'Italian',
    ethereum: 'Ethereum',
    'page-last-updated': 'Ultimo aggiornamento della pagina',
    'website-last-updated': 'Ultimo aggiornamento del sito Web',
    'page-home': 'Home',
    'page-home-title':
      'Ethereum è una piattaforma open source globale per applicazioni decentralizzate.',
    'page-home-subtitle':
      'Su Ethereum, è possibile scrivere codice che controlla il valore digitale, opera esattamente come programmato ed è accessibile ovunque nel mondo.',
    'page-home-section-beginners-title': 'Principianti',
    'page-home-section-beginners-item-one': 'Non hai mai usato Ethereum?',
    'page-home-section-beginners-item-two': "Cos'è Ethereum?",
    'page-home-section-beginners-item-three': 'Perché dovrebbe interessarmi?',
    'page-home-section-use-title': 'Uso',
    'page-home-section-use-item-one': 'Cosa posso fare con Ethereum oggi?',
    'page-home-section-use-item-two': 'Come faccio a ottenere Ether?',
    'page-home-section-use-item-three': "Cos'è un portafoglio?",
    'page-home-section-learn-title': 'Formazione',
    'page-home-section-learn-item-one': 'Risorse per principianti',
    'page-home-section-learn-item-two': 'Come funziona Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Sviluppatori',
    'page-home-section-developers-item-one': 'Guide introduttive',
    'page-home-section-developers-item-two':
      'Impara a programmare gli Smart Contract',
    'page-home-section-developers-item-three':
      'Scopri gli ultimi strumenti per sviluppatori',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Principianti',
    'page-use': 'Uso',
    'page-learn': 'Formazione',
    'page-developers': 'Sviluppatori'
  },
  ja: {
    path: '/ja/',
    name: '日本語',
    'english-name': 'Japanese',
    ethereum: 'イーサリアム',
    'page-last-updated': '最後に更新されたページ',
    'website-last-updated': 'ウェブサイトの最終更新',
    'page-home': 'ホーム',
    'page-home-title':
      'イーサリアムは、分散型アプリケーションのためのグローバルでオープンソースなプラットフォームです。',
    'page-home-subtitle':
      'イーサリアム上で、書かれたコードは、世界中のどこからでもアクセスが可能であり、プログラムした通りに正確に動作し、デジタルな価値をコントロールすることを可能にします。',
    'page-home-section-beginners-title': '初心者',
    'page-home-section-beginners-item-one': 'イーサリアムは初めてですか？',
    'page-home-section-beginners-item-two': 'イーサリアムとは？',
    'page-home-section-beginners-item-three': 'なぜ重要なのですか？',
    'page-home-section-use-title': '使う',
    'page-home-section-use-item-one': 'イーサリアムで何ができるか？',
    'page-home-section-use-item-two': 'Etherを手に入れるには？',
    'page-home-section-use-item-three': 'ウォレットとは？',
    'page-home-section-learn-title': '学ぶ',
    'page-home-section-learn-item-one': '初心者向け資料',
    'page-home-section-learn-item-two': 'イーサリアムの仕組み',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'ディベロッパー',
    'page-home-section-developers-item-one': '入門ガイド',
    'page-home-section-developers-item-two':
      'スマートコントラクトのプログラミングを学ぶ',
    'page-home-section-developers-item-three': '最新の開発者ツールを見つける',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': '初心者',
    'page-use': 'イーサリアムを使う',
    'page-learn': 'イーサリアムについて学ぶ',
    'page-developers': 'デベロッパー'
  },
  ko: {
    path: '/ko/',
    name: '한국어',
    'english-name': 'Korean',
    ethereum: '이더리움',
    'page-last-updated': '마지막으로 업데이트 된 페이지',
    'website-last-updated': '웹 사이트 마지막 업데이트',
    'page-home': '이더리움이란',
    'page-home-title':
      '이더리움은 탈중앙화된 애플리케이션을 위한 글로벌 오픈 소스 플랫폼입니다.',
    'page-home-subtitle':
      '여러분은 이더리움을 통해 디지털화된 가치를 제어하고, 프로그래밍한 대로 작동되며, 전 세계 어디에서든 동일하게 이용할 수 있는 코드를 작성할 수 있습니다.',
    'page-home-section-beginners-title': '입문자',
    'page-home-section-beginners-item-one': '이더리움을 처음 접하시나요?',
    'page-home-section-beginners-item-two': '이더리움이란?',
    'page-home-section-beginners-item-three': '왜 중요한가요?',
    'page-home-section-use-title': '사용하기',
    'page-home-section-use-item-one':
      '오늘날 이더리움으로 어떤 것을 할 수 있을까요?',
    'page-home-section-use-item-two': '어떻게 이더를 얻을 수 있나요?',
    'page-home-section-use-item-three': '지갑이란 무엇인가요?',
    'page-home-section-learn-title': '배우기',
    'page-home-section-learn-item-one': '입문자를 위한 참고자료',
    'page-home-section-learn-item-two': '이더리움은 어떻게 작동하나요?',
    'page-home-section-learn-item-three': '이더리움 2.0',
    'page-home-section-developers-title': '개발자',
    'page-home-section-developers-item-one': '시작하기',
    'page-home-section-developers-item-two':
      '스마트 컨트랙트 프로그래밍 배우기',
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
  nl: {
    path: '/nl/',
    name: 'Nederlands',
    'english-name': 'Dutch',
    ethereum: 'Ethereum',
    'page-last-updated': 'Pagina laatst bijgewerkt',
    'website-last-updated': 'Website laatst bijgewerkt',
    'page-home': 'Ethereum',
    'page-home-title':
      'Ethereum is een wereldwijd, open-source platform voor gedecentraliseerde toepassingen.',
    'page-home-subtitle':
      'Op Ethereum kunt u code schrijven die digitale waarde beheert, precies werkt zoals het is geprogrammeerd, en overal ter wereld toegankelijk is.',
    'page-home-section-beginners-title': 'Beginners',
    'page-home-section-beginners-item-one': 'Nieuw bij Ethereum?',
    'page-home-section-beginners-item-two': 'Wat is Ethereum?',
    'page-home-section-beginners-item-three': 'Wat heb ik eraan?',
    'page-home-section-use-title': 'Gebruik',
    'page-home-section-use-item-one': 'Wat kan ik nu doen met Ethereum?',
    'page-home-section-use-item-two': 'Hoe krijg ik Ether?',
    'page-home-section-use-item-three':
      "Wat is een 'wallet' of digitale portemonnee?",
    'page-home-section-learn-title': 'Info',
    'page-home-section-learn-item-one': 'Beginnersinformatie',
    'page-home-section-learn-item-two': 'Hoe Ethereum werkt',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Ontwikkelaars',
    'page-home-section-developers-item-one': 'Snel aan de slag',
    'page-home-section-developers-item-two':
      'Leer slimme contracten te programmeren',
    'page-home-section-developers-item-three':
      'Vind de nieuwste tools voor ontwikkelaars',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Beginners',
    'page-use': 'Gebruik',
    'page-learn': 'Info',
    'page-developers': 'Ontwikkelaars'
  },
  pl: {
    path: '/pl/',
    name: 'Polski',
    'english-name': 'Polish',
    ethereum: 'Ethereum',
    'page-last-updated': 'Ostatnia aktualizacja strony',
    'website-last-updated': 'Ostatnia aktualizacja strony internetowej',
    'page-home': 'Ethereum',
    'page-home-title':
      'Ethereum to globalna platforma open source dla zdecentralizowanych aplikacji.',
    'page-home-subtitle':
      'Dzięki Ethereum, możesz tworzyć kod który pozwala utrzymać cyfrową jakość, działa dokładnie tak jak został zaprogramowany i jest dostępny na całym świecie.',
    'page-home-section-beginners-title': 'Początki',
    'page-home-section-beginners-item-one': 'Nowy w Ethereum?',
    'page-home-section-beginners-item-two': 'Co to jest Ethereum?',
    'page-home-section-beginners-item-three': 'Czemu warto się zainteresować?',
    'page-home-section-use-title': 'Zastosowania',
    'page-home-section-use-item-one': 'Co mogę zrobić z Ethereum?',
    'page-home-section-use-item-two': 'Jak pozyskać Ether?',
    'page-home-section-use-item-three': 'Czym jest portfel?',
    'page-home-section-learn-title': 'Nauka',
    'page-home-section-learn-item-one': 'Zasoby dla początkujących',
    'page-home-section-learn-item-two': 'Jak działa Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Developerzy',
    'page-home-section-developers-item-one': 'Przewodniki dla początkujących',
    'page-home-section-developers-item-two':
      'Jak tworzyć inteligentne kontrakty?',
    'page-home-section-developers-item-three': 'Narzędzia deweloperskie',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Początki',
    'page-use': 'Zastosowania',
    'page-learn': 'Nauka',
    'page-developers': 'Developerzy'
  },
  sk: {
    path: '/sk/',
    name: 'Slovenský',
    'english-name': 'Slovak',
    ethereum: 'Ethereum',
    'page-last-updated': 'Posledná aktualizácia stránky',
    'website-last-updated': 'Posledná aktualizácia webovej stránky',
    'page-home': 'Domov',
    'page-home-title':
      'Ethereum je celosvetová open-source platforma pre decentralizované aplikácie.',
    'page-home-subtitle':
      'Na Ethereu môžete napísať kód, ktorý bude riadiť digitálne hodnoty, bežať presne tak, ako bol naprogramovaný a bude prístupný odkiaľkoľvek na svete.',
    'page-home-section-beginners-title': 'Pre začiatočníkov',
    'page-home-section-beginners-item-one': 'Úplný nováčik v Ethereu?',
    'page-home-section-beginners-item-two': 'Čo je to Ethereum?',
    'page-home-section-beginners-item-three': 'Čím je zaujímavý?',
    'page-home-section-use-title': 'Používanie',
    'page-home-section-use-item-one': 'Čo môžem v Ethereu robiť?',
    'page-home-section-use-item-two': 'Ako získam Ethereá?',
    'page-home-section-use-item-three': 'Čo je to peňaženka?',
    'page-home-section-learn-title': 'Základné informácie',
    'page-home-section-learn-item-one': 'Návody pre začiatočníkov',
    'page-home-section-learn-item-two': 'Ako funguje Ethereum',
    'page-home-section-learn-item-three': 'Ethereum 2.0',
    'page-home-section-developers-title': 'Pre vývojárov',
    'page-home-section-developers-item-one': 'Ako začať',
    'page-home-section-developers-item-two': 'Ako vytvárať smart kontrakty',
    'page-home-section-developers-item-three':
      'Najnovšie nástroje pre vývojárov',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Pre začiatočníkov',
    'page-use': 'Používanie',
    'page-learn': 'Základné informácie',
    'page-developers': 'Pre vývojárov'
  },
  sl: {
    path: '/sl/',
    name: 'Slovenija',
    'english-name': 'Slovene',
    ethereum: 'Ethereum',
    'page-last-updated': 'Stran je bila nazadnje posodobljena',
    'website-last-updated': 'Spletno mesto je bilo nazadnje posodobljeno',
    'page-home': 'Ethereum',
    'page-home-title':
      'Ethereum je globalna odprtokodna platforma za decentralizirane aplikacije.',
    'page-home-subtitle':
      'Na Ethereum lahko napišete kodo, ki nadzoruje digitalno vrednost, deluje natančno tako, kot je programirano in je dostopna kjer koli po svetu.',
    'page-home-section-beginners-title': 'Začetniki',
    'page-home-section-beginners-item-one':
      'Ste popolnoma novi v svetu Ethereum?',
    'page-home-section-beginners-item-two': 'Kaj je Ethereum?',
    'page-home-section-beginners-item-three': 'Zakaj bi vas to zanimalo?',
    'page-home-section-use-title': 'Uporaba',
    'page-home-section-use-item-one': 'Kaj lahko danes naredim z Ethereum?',
    'page-home-section-use-item-two': 'Kako dobim Ether?',
    'page-home-section-use-item-three': 'Kaj je denarnica?',
    'page-home-section-learn-title': 'Nauči se',
    'page-home-section-learn-item-one': 'Sredstva za začetnike',
    'page-home-section-learn-item-two': 'Kako deluje Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Za razvijalce',
    'page-home-section-developers-item-one': 'Uvodna navodila',
    'page-home-section-developers-item-two':
      'Naučite se programirati pametne pogodbe',
    'page-home-section-developers-item-three':
      'Najnovejša orodja za razvijalce',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Začetniki',
    'page-use': 'Uporaba',
    'page-learn': 'Nauči se',
    'page-developers': 'Razvijalci'
  },
  ru: {
    path: '/ru/',
    name: 'Pусский',
    'english-name': 'Russian',
    ethereum: 'Ethereum',
    'page-last-updated': 'Последнее обновление страницы',
    'website-last-updated': 'Сайт в последний раз обновлялся',
    'page-home': 'Заглавная',
    'page-home-title':
      'Ethereum – глобальная платформа с открытым исходным кодом для децентрализованных приложений.',
    'page-home-subtitle':
      'С помощью Ethereum вы сможете писать доступные всему миру программы для управления цифровыми данными, работающие именно так, как задумано.',
    'page-home-section-beginners-title': 'Начинающим',
    'page-home-section-beginners-item-one': 'С чего начать изучение Ethereum?',
    'page-home-section-beginners-item-two': 'Что такое Ethereum?',
    'page-home-section-beginners-item-three': 'Чем он может быть полезен?',
    'page-home-section-use-title': 'Применение',
    'page-home-section-use-item-one':
      'Что можно сделать с помощью Ethereum уже сегодня?',
    'page-home-section-use-item-two': 'Как можно получить Ether?',
    'page-home-section-use-item-three': 'Что такое кошелек?',
    'page-home-section-learn-title': 'Обучение',
    'page-home-section-learn-item-one': 'Полезная информация для начинающих',
    'page-home-section-learn-item-two': 'Как работает Ethereum',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'Разработчикам',
    'page-home-section-developers-item-one': 'Руководства по началу работы',
    'page-home-section-developers-item-two':
      'Обучение программированию умных контрактов',
    'page-home-section-developers-item-three':
      'Актуальные инструменты для разработчиков',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'Начинающим',
    'page-use': 'Применение',
    'page-learn': 'Обучение',
    'page-developers': 'Разработчикам'
  },
  'zh-CN': {
    path: '/zh/',
    name: '简体中文',
    'english-name': 'Simplified Chinese',
    ethereum: '以太坊',
    'page-last-updated': '页面上次更新',
    'website-last-updated': '网站上次更新',
    'page-home': '首页',
    'page-home-title': '以太坊是一个为去中心化应用（DApp）而生的全球开源平台。',
    'page-home-subtitle':
      '在以太坊上，你可以通过编写代码管理数字资产、运行程序，更重要的是，这一切都不受地域限制。',
    'page-home-section-beginners-title': '初学者',
    'page-home-section-beginners-item-one': '初识以太坊',
    'page-home-section-beginners-item-two': '以太坊简介',
    'page-home-section-beginners-item-three': '以太坊的意义',
    'page-home-section-use-title': '使用',
    'page-home-section-use-item-one': '我能用以太坊做什么',
    'page-home-section-use-item-two': '如何获得 ETH',
    'page-home-section-use-item-three': '什么是钱包？',
    'page-home-section-learn-title': '学习',
    'page-home-section-learn-item-one': '初学者资源',
    'page-home-section-learn-item-two': '以太坊如何工作',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': '开发者',
    'page-home-section-developers-item-one': '入门指南',
    'page-home-section-developers-item-two': '编写智能合约',
    'page-home-section-developers-item-three': '最新的开发者工具',
    'page-home-section-enterprise-title': '',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': '初学者',
    'page-use': '使用',
    'page-learn': '学习',
    'page-developers': '开发者'
  },
  fa: {
    path: '/fa/',
    name: 'فارسی',
    'english-name': 'Farsi',
    ethereum: 'اتریوم',
    'page-last-updated': 'صفحه آخرین به روزرسانی',
    'website-last-updated': 'آخرین وب سایت به روز شد',
    'page-home': 'اتریوم',
    'page-home-title':
      'اتریوم یک پلتفرم متن باز جهانی٫ برای برنامه های غیر متمرکز است.',
    'page-home-subtitle':
      'در اتریوم٫ شما میتوانید برنامه‌ای بنویسید که ارزش دیجیتالی داشته باشد٫ دقیقا همان کدی که نوشته‌اید را اجرا میکند٫ و در تمامی نقاط جهان قابل دسترسی است.',
    'page-home-section-beginners-title': 'مبتدیان',
    'page-home-section-beginners-item-one':
      'آیا هیچ ایده‌ای درباره‌ اتریوم ندارید؟',
    'page-home-section-beginners-item-two': 'اتریوم چیست؟',
    'page-home-section-beginners-item-three': 'چرا باید اهمیت بدهم؟',
    'page-home-section-use-title': 'استفاده',
    'page-home-section-use-item-one':
      'از یک برنامه کاربردی ساخته‌شده روی اتریوم استفاده کنید',
    'page-home-section-use-item-two': 'چگونه اتریوم بدست بیاورید؟',
    'page-home-section-use-item-three': 'کیف پول (والت) چیست؟',
    'page-home-section-learn-title': 'آموزش',
    'page-home-section-learn-item-one': 'مراجع برای مبتدیان',
    'page-home-section-learn-item-two': 'اتریوم چگونه کار می کند؟',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'توسعه دهندگان',
    'page-home-section-developers-item-one': 'مطالبی برای شروع',
    'page-home-section-developers-item-two':
      'آموزش برنامه‌نویسی قراردادهای هوشمند',
    'page-home-section-developers-item-three':
      'جدیدترین ابزارها برای توسعه دهندگان',
    'page-home-section-enterprise-title': 'Enterprise',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'مبتدیان',
    'page-use': 'استفاده',
    'page-learn': 'آموزش',
    'page-developers': 'توسعه دهندگان'
  },
  ar: {
    path: '/ar/',
    name: 'العربية',
    'english-name': 'Arabic',
    ethereum: 'ايثريوم',
    'page-last-updated': 'آخر تحديث الصفحة',
    'website-last-updated': 'آخر تحديث للموقع',
    'page-home': 'ايثريوم',
    'page-home-title':
      'ايثريوم هي عبارة عن منصة عالمية مفتوحة المصدر للتطبيقات اللامركزية.',
    'page-home-subtitle':
      'عبر إيثريوم يمكنك كتابة أكواد تتحكم بالقيمة الرقمية، ويتم تنفيذها تمامًا على النحو الذي تمت برمجتها به، ويمكن الوصول لها من أي مكان بالعالم.',
    'page-home-section-beginners-title': 'المبتدئون',
    'page-home-section-beginners-item-one': ' هل أنت جديد تمامًا على ايثيريوم؟',
    'page-home-section-beginners-item-two': 'ما هي إيثريوم؟',
    'page-home-section-beginners-item-three': 'ما الميزات التي سأحصل عليها؟',
    'page-home-section-use-title': 'اﻻستخدام',
    'page-home-section-use-item-one':
      'ما الذي يمكنني إنجازه عبر إيثريوم اليوم؟',
    'page-home-section-use-item-two': 'كيف أحصل على عملة الإيثر؟',
    'page-home-section-use-item-three': 'ماهي المحفظة؟',
    'page-home-section-learn-title': 'تعلّم',
    'page-home-section-learn-item-one': 'أدوات للمبتدئين',
    'page-home-section-learn-item-two': 'كيفية عمل إيثريوم',
    'page-home-section-learn-item-three': 'ETH 2.0',
    'page-home-section-developers-title': 'المطورين',
    'page-home-section-developers-item-one': 'أدلة البدء',
    'page-home-section-developers-item-two': 'تعلم برمجة العقود الذكية',
    'page-home-section-developers-item-three': 'احصل على أحدث أدوات المبرمجين',
    'page-home-section-enterprise-title': 'Enterprise',
    'page-home-section-enterprise-item-one': '',
    'page-home-section-enterprise-item-two': '',
    'page-home-section-enterprise-item-three': '',
    'page-beginners': 'المبتدئون',
    'page-use': 'اﻻستخدام',
    'page-learn': 'تعلّم',
    'page-developers': 'المطورين'
  }
}

const translate = (lookup, lang = 'en-US') => {
  const translation = translations[lang][lookup]
  if (translation === undefined) {
    console.error(`No translation for: ${lookup} on lang: ${lang}`)
  }
  return translation || ''
}

module.exports = {
  translate,
  translations
}
