---
title: ابدأ تطوير الواجهة الأمامية لتطبيقك اللامركزي مع create-eth-app
description: نظرة عامة على كيفية استخدام create-eth-app وميزاته
author: "Markus Waas"
tags:
  [
    "واجهة التطبيق",
    "جافا سكريبت",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: ar
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

في المرة الأخيرة، ألقينا نظرة على [الصورة الكبيرة للغة سوليديتي](https://soliditydeveloper.com/solidity-overview-2020) وذكرنا بالفعل [create-eth-app](https://github.com/PaulRBerg/create-eth-app). ستكتشف الآن كيفية استخدامه، وما هي الميزات المدمجة والأفكار الإضافية حول كيفية التوسع فيه. بدأه Paul Razvan Berg، مؤسس [Sablier](http://sablier.com/)، وهذا التطبيق سيعطي دفعة قوية لتطوير واجهة التطبيق لديك ويأتي مع العديد من عمليات التكامل الاختيارية للاختيار من بينها.

## التثبيت {#installation}

يتطلب التثبيت إصدار Yarn 0.25 أو أعلى (`npm install yarn --global`). الأمر بسيط مثل تشغيل:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

إنه يستخدم [create-react-app](https://github.com/facebook/create-react-app) كأساس له. لرؤية تطبيقك، افتح `http://localhost:3000/`. عندما تكون جاهزًا للنشر في بيئة الإنتاج، أنشئ حزمة مصغرة باستخدام yarn build. إحدى الطرق السهلة لاستضافة هذا هي [Netlify](https://www.netlify.com/). يمكنك إنشاء مستودع GitHub، وإضافته إلى Netlify، وإعداد أمر البناء وتكون قد انتهيت! سيتم استضافة تطبيقك وسيكون قابلاً للاستخدام للجميع. وكل هذا مجانًا.

## الميزات {#features}

### React و create-react-app {#react--create-react-app}

أولاً وقبل كل شيء، قلب التطبيق: React وجميع الميزات الإضافية التي تأتي مع _create-react-app_. استخدام هذا فقط هو خيار رائع إذا كنت لا تريد دمج إيثريوم. يجعل [React](https://react.dev/) نفسه بناء واجهات مستخدم تفاعلية أمرًا سهلاً للغاية. قد لا يكون سهل الاستخدام للمبتدئين مثل [Vue](https://vuejs.org/)، ولكنه لا يزال الأكثر استخدامًا، ويحتوي على ميزات أكثر، والأهم من ذلك، آلاف المكتبات الإضافية للاختيار من بينها. يجعل _create-react-app_ من السهل جدًا البدء به أيضًا ويتضمن:

- دعم صيغة React, JSX, ES6, TypeScript, Flow.
- إضافات لغوية تتجاوز ES6 مثل عامل نشر الكائن.
- CSS ذو بادئات تلقائية، لذلك لا تحتاج إلى webkit- أو بادئات أخرى.
- مشغل اختبار وحدة تفاعلي سريع مع دعم مدمج لتقارير التغطية.
- خادم تطوير مباشر يحذر من الأخطاء الشائعة.
- نص برمجي للبناء لتجميع JS وCSS والصور للإنتاج، مع الهاشات وخرائط المصدر.

يستفيد _create-eth-app_ بشكل خاص من [تأثيرات الخطاطيف (hooks)](https://legacy.reactjs.org/docs/hooks-effect.html) الجديدة. طريقة لكتابة مكونات وظيفية قوية وصغيرة جدًا في نفس الوقت. انظر القسم أدناه حول Apollo لمعرفة كيفية استخدامها في _create-eth-app_.

### مساحات عمل Yarn {#yarn-workspaces}

تسمح لك [مساحات عمل Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) بامتلاك حزم متعددة، مع القدرة على إدارتها جميعًا من المجلد الجذر وتثبيت التبعيات لها جميعًا مرة واحدة باستخدام `yarn install`. هذا منطقي بشكل خاص للحزم الإضافية الصغيرة مثل إدارة عناوين/واجهة التطبيق الثنائية (ABI) للعقود الذكية (المعلومات حول مكان نشر العقود الذكية وكيفية التواصل معها) أو تكامل The Graph، وكلاهما جزء من `create-eth-app`.

### ethers.js {#ethersjs}

بينما لا يزال [Web3](https://docs.web3js.org/) هو الأكثر استخدامًا، فقد اكتسب [ethers.js](https://docs.ethers.io/) زخمًا أكبر كبديل في العام الماضي وهو المدمج في _create-eth-app_. يمكنك العمل مع هذا، أو تغييره إلى Web3 أو التفكير في الترقية إلى [ethers.js v5](https://docs.ethers.org/v5/) الذي أوشك على الخروج من المرحلة التجريبية.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) هي طريقة بديلة للتعامل مع البيانات مقارنة بـ [واجهة برمجة تطبيقات Restful](https://restfulapi.net/). لديهم العديد من المزايا على واجهات برمجة تطبيقات Restful، خاصة لبيانات بلوكتشين اللامركزية. إذا كنت مهتمًا بالمنطق وراء ذلك، فقم بإلقاء نظرة على [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

عادةً ما تجلب البيانات من عقدك الذكي مباشرة. هل تريد قراءة وقت آخر تداول؟ ما عليك سوى استدعاء `MyContract.methods.latestTradeTime().call()` الذي يجلب البيانات من عقدة إيثريوم إلى تطبيقك اللامركزي. ولكن ماذا لو كنت بحاجة إلى مئات من نقاط البيانات المختلفة؟ سيؤدي ذلك إلى مئات من عمليات جلب البيانات إلى العقدة، مما يتطلب في كل مرة [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) مما يجعل تطبيقك اللامركزي بطيئًا وغير فعال. أحد الحلول قد يكون دالة استدعاء لجلب البيانات داخل عقدك تعيد بيانات متعددة في وقت واحد. لكن هذا ليس مثاليًا دائمًا.

ثم قد تكون مهتمًا بالبيانات التاريخية أيضًا. تريد أن تعرف ليس فقط وقت آخر تداول، ولكن أوقات جميع التداولات التي قمت بها بنفسك على الإطلاق. استخدم حزمة الرسم البياني الفرعي لـ _create-eth-app_، واقرأ [التوثيق](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) وقم بتكييفه مع عقودك الخاصة. إذا كنت تبحث عن عقود ذكية شائعة، فقد يكون هناك بالفعل رسم بياني فرعي. تحقق من [مستكشف الرسوم البيانية الفرعية](https://thegraph.com/explorer/).

بمجرد أن يكون لديك رسم بياني فرعي، فإنه يسمح لك بكتابة استعلام واحد بسيط في تطبيقك اللامركزي يسترد جميع بيانات بلوكتشين المهمة بما في ذلك البيانات التاريخية التي تحتاجها، ويتطلب جلبًا واحدًا فقط.

### Apollo {#apollo}

بفضل تكامل [Apollo Boost](https://www.apollographql.com/docs/react/get-started/)، يمكنك بسهولة دمج The Graph في تطبيق React اللامركزي الخاص بك. خاصة عند استخدام [خطاطيف React (React hooks) و Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks)، يصبح جلب البيانات بسيطًا مثل كتابة استعلام GraphQl واحد في مكونك:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## القوالب {#templates}

علاوة على ذلك، يمكنك الاختيار من بين عدة قوالب مختلفة. حتى الآن يمكنك استخدام تكامل Aave أو Compound أو UniSwap أو Sablier. تضيف جميعها عناوين عقود ذكية خدمية مهمة إلى جانب عمليات تكامل الرسوم البيانية الفرعية المعدة مسبقًا. ما عليك سوى إضافة القالب إلى أمر الإنشاء مثل `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) هو سوق إقراض أموال لامركزي. يوفر المودعون السيولة للسوق لكسب دخل سلبي، بينما يمكن للمقترضين الاقتراض باستخدام ضمانات إضافية. إحدى الميزات الفريدة لـ Aave هي [القروض السريعة](https://aave.com/docs/developers/flash-loans) التي تسمح لك باقتراض الأموال دون أي ضمان إضافي، طالما أنك تعيد القرض في غضون معاملة واحدة. يمكن أن يكون هذا مفيدًا على سبيل المثال لمنحك أموالًا إضافية في تداول المراجحة.

تسمى الرموز المتداولة التي تكسبك فوائد _aTokens_.

عندما تختار دمج Aave مع _create-eth-app_، ستحصل على [تكامل رسم بياني فرعي](https://docs.aave.com/developers/getting-started/using-graphql). تستخدم Aave The Graph وتوفر لك بالفعل العديد من الرسوم البيانية الفرعية الجاهزة للاستخدام على [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) و[الشبكة الرئيسية](https://thegraph.com/explorer/subgraph/aave/protocol) في شكل [خام](https://thegraph.com/explorer/subgraph/aave/protocol-raw) أو [منسق](https://thegraph.com/explorer/subgraph/aave/protocol).

![ميم عن القرض السريع من Aave – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

يشبه [Compound](https://compound.finance/) Aave. يتضمن التكامل بالفعل [الرسم البياني الفرعي الجديد لـ Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). من المدهش أن الرموز التي تكسب فائدة هنا تسمى _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) هي منصة تبادل لامركزية (DEX). يمكن لمزودي السيولة كسب الرسوم عن طريق توفير الرموز أو الإيثر المطلوب لكلا جانبي الصفقة. يستخدم على نطاق واسع وبالتالي لديه واحدة من أعلى السيولة لمجموعة واسعة جدًا من الرموز. يمكنك دمجه بسهولة في تطبيقك اللامركزي، على سبيل المثال، للسماح للمستخدمين بمبادلة ETH الخاص بهم بـ DAI.

للأسف، في وقت كتابة هذا التقرير، فإن التكامل مخصص فقط لـ Uniswap v1 وليس [الإصدار 2 الذي تم إصداره للتو](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

يسمح [Sablier](https://sablier.com/) للمستخدمين ببث مدفوعات الأموال. بدلاً من يوم دفع واحد، تحصل بالفعل على أموالك باستمرار دون إدارة إضافية بعد الإعداد الأولي. يتضمن التكامل [الرسم البياني الفرعي الخاص به](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## ماذا بعد؟ {#whats-next}

إذا كانت لديك أسئلة حول _create-eth-app_، فانتقل إلى [خادم مجتمع Sablier](https://discord.gg/bsS8T47)، حيث يمكنك التواصل مع مؤلفي _create-eth-app_. كخطوات تالية أولى، قد ترغب في دمج إطار عمل لواجهة المستخدم مثل [Material UI](https://mui.com/material-ui/)، وكتابة استعلامات GraphQL للبيانات التي تحتاجها بالفعل وإعداد النشر.
