---
title: "ابدأ تطوير الواجهة الأمامية لتطبيقك اللامركزي (dapp) باستخدام ⁦create-eth-app⁩"
description: "نظرة عامة على كيفية استخدام ⁦create-eth-app⁩ وميزاته"
author: "ماركوس واس"
tags:
  ["الواجهة الأمامية", "javascript", "ethers.js", "the graph", "التمويل اللامركزي"]
skill: beginner
breadcrumb: "⁦create-eth-app⁩"
lang: ar
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

في المرة السابقة نظرنا إلى [الصورة العامة لـ Solidity](https://soliditydeveloper.com/solidity-overview-2020) وذكرنا بالفعل [<span dir="ltr">create-eth-app</span>](https://github.com/PaulRBerg/create-eth-app). الآن ستكتشف كيفية استخدامه، وما هي الميزات المدمجة فيه، وأفكار إضافية حول كيفية التوسع فيه. بدأه بول رازفان بيرج، مؤسس [Sablier](https://sablier.com/)، وسيبدأ هذا التطبيق تطوير الواجهة الأمامية الخاصة بك ويأتي مع العديد من عمليات الدمج الاختيارية للاختيار من بينها.

## التثبيت {#installation}

يتطلب التثبيت <span dir="ltr">Yarn 0.25</span> أو أعلى (`npm install yarn --global`). الأمر بسيط مثل تشغيل:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

إنه يستخدم [<span dir="ltr">create-react-app</span>](https://github.com/facebook/create-react-app) داخليًا. لرؤية تطبيقك، افتح `http://localhost:3000/`. عندما تكون مستعدًا للنشر في بيئة الإنتاج، قم بإنشاء حزمة مصغرة باستخدام <span dir="ltr">yarn build</span>. إحدى الطرق السهلة لاستضافة هذا ستكون [Netlify](https://www.netlify.com/). يمكنك إنشاء مستودع GitHub، وإضافته إلى Netlify، وإعداد أمر البناء، وبذلك تكون قد انتهيت! سيتم استضافة تطبيقك وسيكون قابلاً للاستخدام للجميع. وكل ذلك مجانًا.

## الميزات {#features}

### React و create-react-app {#react--create-react-app}

أولاً وقبل كل شيء قلب التطبيق: React وجميع الميزات الإضافية التي تأتي مع _create-react-app_. يعد استخدام هذا فقط خيارًا رائعًا إذا كنت لا ترغب في دمج إيثيريوم. يجعل [React](https://react.dev/) نفسه بناء واجهات مستخدم تفاعلية أمرًا سهلاً للغاية. قد لا يكون صديقًا للمبتدئين مثل [Vue](https://vuejs.org/)، ولكنه لا يزال الأكثر استخدامًا، ويحتوي على المزيد من الميزات، والأهم من ذلك آلاف المكتبات الإضافية للاختيار من بينها. يجعل _create-react-app_ من السهل جدًا البدء به أيضًا ويتضمن:

- دعم بناء جملة React و JSX و ES6 و TypeScript و Flow.
- إضافات لغوية تتجاوز ES6 مثل عامل انتشار الكائن (object spread operator).
- CSS ببادئة تلقائية، لذلك لا تحتاج إلى <span dir="ltr">-webkit-</span> أو بادئات أخرى.
- مشغل اختبار وحدة تفاعلي سريع مع دعم مدمج لتقارير التغطية.
- خادم تطوير مباشر يحذر من الأخطاء الشائعة.
- برنامج نصي للبناء لتجميع JS و CSS والصور للإنتاج، مع التجزئات وخرائط المصدر (sourcemaps).

يستفيد _create-eth-app_ بشكل خاص من [تأثيرات الخطافات (hooks effects)](https://legacy.reactjs.org/docs/hooks-effect.html) الجديدة. طريقة لكتابة ما يسمى بالمكونات الوظيفية القوية، ولكنها صغيرة جدًا. راجع القسم أدناه حول Apollo لمعرفة كيفية استخدامها في _create-eth-app_.

### مساحات عمل Yarn {#yarn-workspaces}

تتيح لك [مساحات عمل Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) الحصول على حزم متعددة، مع القدرة على إدارتها جميعًا من المجلد الجذر وتثبيت التبعيات للجميع في وقت واحد باستخدام `yarn install`. هذا منطقي بشكل خاص للحزم الإضافية الأصغر مثل إدارة عناوين العقود الذكية/ABI (المعلومات حول مكان نشر العقود الذكية وكيفية التواصل معها) أو دمج The Graph، وكلاهما جزء من `create-eth-app`.

### ethers.js {#ethersjs}

بينما لا يزال [Web3](https://docs.web3js.org/) هو الأكثر استخدامًا، فقد اكتسب [ethers.js](https://docs.ethers.io/) الكثير من الزخم كبديل في العام الماضي وهو المدمج في _create-eth-app_. يمكنك العمل مع هذا، أو تغييره إلى Web3 أو التفكير في الترقية إلى [<span dir="ltr">ethers.js v5</span>](https://docs.ethers.org/v5/) والذي كاد أن يخرج من المرحلة التجريبية.

### The Graph {#the-graph}

يعد [GraphQL](https://graphql.org/) طريقة بديلة للتعامل مع البيانات مقارنة بـ [Restful API](https://restfulapi.net/). لديهم العديد من المزايا مقارنة بـ Restful APIs، خاصة لبيانات سلسلة الكتل اللامركزية. إذا كنت مهتمًا بالسبب وراء ذلك، فألق نظرة على [GraphQL سيعمل على تشغيل الويب اللامركزي](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

عادة ما تقوم بجلب البيانات من عقدك الذكي مباشرة. هل تريد قراءة وقت أحدث تداول؟ ما عليك سوى استدعاء `MyContract.methods.latestTradeTime().call()` الذي يجلب البيانات من عقدة إيثيريوم إلى تطبيقك اللامركزي (dapp). ولكن ماذا لو كنت بحاجة إلى مئات من نقاط البيانات المختلفة؟ سيؤدي ذلك إلى مئات من عمليات جلب البيانات إلى العقدة، وفي كل مرة تتطلب [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) مما يجعل تطبيقك اللامركزي (dapp) بطيئًا وغير فعال. قد يكون أحد الحلول البديلة هو دالة استدعاء جلب (fetcher call function) داخل عقدك تُرجع بيانات متعددة في وقت واحد. هذا ليس مثاليًا دائمًا.

وبعد ذلك قد تكون مهتمًا بالبيانات التاريخية أيضًا. أنت لا تريد معرفة وقت التداول الأخير فحسب، بل أوقات جميع التداولات التي قمت بها بنفسك. استخدم حزمة الرسم البياني الفرعي لـ _create-eth-app_، واقرأ [الوثائق](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) وقم بتكييفها مع عقودك الخاصة. إذا كنت تبحث عن عقود ذكية شائعة، فقد يكون هناك بالفعل رسم بياني فرعي. تحقق من [مستكشف الرسم البياني الفرعي](https://thegraph.com/explorer/).

بمجرد أن يكون لديك رسم بياني فرعي، فإنه يسمح لك بكتابة استعلام بسيط واحد في تطبيقك اللامركزي (dapp) يسترد جميع بيانات سلسلة الكتل المهمة بما في ذلك البيانات التاريخية التي تحتاجها، ولا يتطلب الأمر سوى عملية جلب واحدة.

### Apollo {#apollo}

بفضل دمج [Apollo Boost](https://www.apollographql.com/docs/react/get-started/)، يمكنك بسهولة دمج The Graph في تطبيق React اللامركزي الخاص بك. خاصة عند استخدام [خطافات React و Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks)، فإن جلب البيانات بسيط مثل كتابة استعلام GraphQL واحد في المكون الخاص بك:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## القوالب {#templates}

علاوة على ذلك، يمكنك الاختيار من بين عدة قوالب مختلفة. حتى الآن يمكنك استخدام دمج آفي أو Compound أو يونيسواب أو Sablier. تضيف جميعها عناوين عقود ذكية للخدمات المهمة إلى جانب عمليات دمج الرسم البياني الفرعي الجاهزة. ما عليك سوى إضافة القالب إلى أمر الإنشاء مثل `yarn create eth-app my-eth-app --with-template aave`.

### آفي {#aave}

يعد [آفي](https://aave.com/) سوق إقراض أموال لامركزي. يوفر المودعون سيولة للسوق لكسب دخل سلبي، بينما يتمكن المقترضون من الاقتراض باستخدام ضمانات. إحدى الميزات الفريدة لـ آفي هي تلك [القروض السريعة](https://aave.com/docs/developers/flash-loans) التي تسمح لك باقتراض الأموال دون أي ضمان، طالما أنك تعيد القرض في غضون معاملة واحدة. يمكن أن يكون هذا مفيدًا على سبيل المثال لمنحك نقودًا إضافية في تداول المراجحة (arbitrage trading).

تسمى الرموز المتداولة التي تكسبك فوائد بـ _aTokens_.

عندما تختار دمج آفي مع _create-eth-app_، ستحصل على [دمج رسم بياني فرعي](https://docs.aave.com/developers/getting-started/using-graphql). يستخدم آفي The Graph ويوفر لك بالفعل العديد من الرسوم البيانية الفرعية الجاهزة للاستخدام على [روبستن](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) و [الشبكة الرئيسية](https://thegraph.com/explorer/subgraph/aave/protocol) في شكل [خام](https://thegraph.com/explorer/subgraph/aave/protocol-raw) أو [منسق](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

يشبه [Compound](https://compound.finance/) آفي. يتضمن الدمج بالفعل [الرسم البياني الفرعي لـ <span dir="ltr">Compound v2</span>](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) الجديد. تسمى الرموز التي تكسب الفوائد هنا بشكل مفاجئ بـ _cTokens_.

### يونيسواب {#uniswap}

يعد [يونيسواب](https://uniswap.exchange/) بورصة لامركزية (DEX). يمكن لمزودي السيولة كسب رسوم من خلال توفير الرموز المطلوبة أو إيثر لكلا جانبي التداول. يستخدم على نطاق واسع وبالتالي لديه واحدة من أعلى السيولات لمجموعة واسعة جدًا من الرموز. يمكنك بسهولة دمجه في تطبيقك اللامركزي (dapp) للسماح للمستخدمين، على سبيل المثال، بمبادلة ETH الخاص بهم بـ DAI.

لسوء الحظ، في وقت كتابة هذا التقرير، كان الدمج مخصصًا فقط لـ <span dir="ltr">Uniswap v1</span> وليس [الإصدار الثاني (v2) الذي تم إصداره للتو](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

يسمح [Sablier](https://sablier.com/) للمستخدمين ببث المدفوعات المالية. بدلاً من يوم دفع واحد، تحصل في الواقع على أموالك باستمرار دون مزيد من الإدارة بعد الإعداد الأولي. يتضمن الدمج [الرسم البياني الفرعي الخاص به](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## ماذا بعد؟ {#whats-next}

إذا كانت لديك أسئلة حول _create-eth-app_، فانتقل إلى [خادم مجتمع Sablier](https://discord.gg/bsS8T47)، حيث يمكنك التواصل مع مؤلفي _create-eth-app_. كبعض الخطوات التالية الأولى، قد ترغب في دمج إطار عمل واجهة مستخدم مثل [Material UI](https://mui.com/material-ui/)، وكتابة استعلامات GraphQL للبيانات التي تحتاجها بالفعل وإعداد النشر.