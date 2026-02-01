---
title: create-eth-app کے ساتھ اپنے ڈیپ فرنٹ اینڈ ڈیولپمنٹ کو کک اسٹارٹ کریں
description: create-eth-app کا استعمال کیسے کریں اور اس کی خصوصیات کا ایک جائزہ
author: "Markus Waas"
tags:
  [
    "فرنٹ اینڈ",
    "javascript",
    "ethers.js",
    "دی گراف",
    "defi"
  ]
skill: beginner
lang: ur-in
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

پچھلی بار ہم نے [Solidity کی بڑی تصویر](https://soliditydeveloper.com/solidity-overview-2020) پر نظر ڈالی تھی اور [create-eth-app](https://github.com/PaulRBerg/create-eth-app) کا ذکر بھی کیا تھا۔ اب آپ جانیں گے کہ اسے کیسے استعمال کیا جائے، کون سی خصوصیات اس میں ضم ہیں اور اس کو مزید وسیع کرنے کے اضافی آئیڈیاز کیا ہیں۔ [Sablier](http://sablier.com/) کے بانی، Paul Razvan Berg کے ذریعہ شروع کی گئی، یہ ایپ آپ کے فرنٹ اینڈ ڈیولپمنٹ کو کِک اسٹارٹ کرے گی اور منتخب کرنے کے لیے کئی اختیاری انضمام کے ساتھ آتی ہے۔

## انسٹالیشن {#installation}

انسٹالیشن کے لیے Yarn 0.25 یا اس سے اعلیٰ ورژن کی ضرورت ہے (`npm install yarn --global`)۔ یہ چلانے جتنا ہی آسان ہے:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

یہ اندرونی طور پر [create-react-app](https://github.com/facebook/create-react-app) کا استعمال کر رہا ہے۔ اپنی ایپ دیکھنے کے لیے، `http://localhost:3000/` کھولیں۔ جب آپ پروڈکشن میں ڈیپلائے کرنے کے لیے تیار ہوں، تو yarn build کے ساتھ ایک مِنیفائیڈ بنڈل بنائیں۔ اسے ہوسٹ کرنے کا ایک آسان طریقہ [Netlify](https://www.netlify.com/) ہوگا۔ آپ ایک GitHub ریپو بنا سکتے ہیں، اسے Netlify میں شامل کر سکتے ہیں، بلڈ کمانڈ سیٹ اپ کر سکتے ہیں اور بس ہو گیا! آپ کی ایپ ہوسٹ ہو جائے گی اور ہر کسی کے لیے قابل استعمال ہوگی۔ اور یہ سب کچھ مفت ہے۔

## خصوصیات {#features}

### React اور create-react-app {#react--create-react-app}

سب سے پہلے ایپ کا دل: React اور _create-react-app_ کے ساتھ آنے والی تمام اضافی خصوصیات۔ اگر آپ Ethereum کو انٹیگریٹ نہیں کرنا چاہتے ہیں تو صرف اس کا استعمال کرنا ایک بہترین آپشن ہے۔ [React](https://react.dev/) خود انٹرایکٹو UI بنانا بہت آسان بنا دیتا ہے۔ ہو سکتا ہے یہ [Vue](https://vuejs.org/) کی طرح مبتدیوں کے لیے آسان نہ ہو، لیکن یہ اب بھی زیادہ تر استعمال ہوتا ہے، اس میں زیادہ خصوصیات ہیں اور سب سے اہم بات یہ ہے کہ منتخب کرنے کے لیے ہزاروں اضافی لائبریریاں موجود ہیں۔ _create-react-app_ اس کے ساتھ شروعات کرنا بھی بہت آسان بنا دیتا ہے اور اس میں شامل ہیں:

- React, JSX, ES6, TypeScript, فلو سنٹیکس سپورٹ۔
- ES6 سے آگے زبان کی اضافی چیزیں جیسے آبجیکٹ اسپریڈ آپریٹر۔
- آٹوپریفکسڈ CSS، لہذا آپ کو -webkit- یا دیگر پریفکس کی ضرورت نہیں ہے۔
- کوریج رپورٹنگ کے لیے بلٹ ان سپورٹ کے ساتھ ایک تیز انٹرایکٹو یونٹ ٹیسٹ رنر۔
- ایک لائیو ڈیولپمنٹ سرور جو عام غلطیوں کے بارے میں خبردار کرتا ہے۔
- ہیشز اور سورس میپس کے ساتھ، پروڈکشن کے لیے JS، CSS، اور تصاویر کو بنڈل کرنے کے لیے ایک بلڈ اسکرپٹ۔

خاص طور پر _create-eth-app_ نئے [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html) کا استعمال کر رہا ہے۔ طاقتور، پھر بھی بہت چھوٹے نام نہاد فنکشنل کمپونینٹس لکھنے کا ایک طریقہ۔ _create-eth-app_ میں ان کا استعمال کیسے ہوتا ہے اس کے لیے Apollo کے بارے میں نیچے والا سیکشن دیکھیں۔

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) آپ کو ایک سے زیادہ پیکیجز رکھنے کی اجازت دیتے ہیں، لیکن ان سب کو روٹ فولڈر سے منظم کرنے اور `yarn install` کا استعمال کرتے ہوئے سب کے لیے ایک ساتھ ڈیپینڈینسیز انسٹال کرنے کے قابل بناتے ہیں۔ یہ خاص طور پر چھوٹے اضافی پیکیجز کے لیے معنی خیز ہے جیسے کہ اسمارٹ کنٹریکٹس ایڈریس/ABI مینجمنٹ (یہ معلومات کہ آپ نے کون سے اسمارٹ کنٹریکٹس کہاں ڈیپلائے کیے ہیں اور ان کے ساتھ کیسے کمیونیکیٹ کرنا ہے) یا گراف انٹیگریشن، دونوں `create-eth-app` کا حصہ ہیں۔

### ethers.js {#ethersjs}

جبکہ [Web3](https://docs.web3js.org/) اب بھی زیادہ تر استعمال ہوتا ہے، [ethers.js](https://docs.ethers.io/) نے پچھلے سال ایک متبادل کے طور پر بہت زیادہ مقبولیت حاصل کی ہے اور یہی وہ ہے جسے _create-eth-app_ میں انٹیگریٹ کیا گیا ہے۔ آپ اس کے ساتھ کام کر سکتے ہیں، اسے Web3 میں تبدیل کر سکتے ہیں یا [ethers.js v5](https://docs.ethers.org/v5/) میں اپ گریڈ کرنے پر غور کر سکتے ہیں جو تقریباً بیٹا سے باہر ہے۔

### دی گراف {#the-graph}

[GraphQL](https://graphql.org/) ایک [Restful API](https://restfulapi.net/) کے مقابلے میں ڈیٹا کو ہینڈل کرنے کا ایک متبادل طریقہ ہے۔ ان کے Restful Apis پر کئی فوائد ہیں، خاص طور پر وکندریقرت بلاک چین ڈیٹا کے لیے۔ اگر آپ اس کے پیچھے کی وجہ جاننے میں دلچسپی رکھتے ہیں، تو [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a) پر ایک نظر ڈالیں۔

عام طور پر آپ براہ راست اپنے اسمارٹ کنٹریکٹ سے ڈیٹا حاصل کرتے ہیں۔ تازہ ترین ٹریڈ کا وقت پڑھنا چاہتے ہیں؟ بس `MyContract.methods.latestTradeTime().call()` کو کال کریں جو Ethereum نوڈ سے آپ کے ڈی ایپ میں ڈیٹا حاصل کرتا ہے۔ لیکن کیا ہوگا اگر آپ کو سینکڑوں مختلف ڈیٹا پوائنٹس کی ضرورت ہو؟ اس کے نتیجے میں نوڈ پر سینکڑوں ڈیٹا فیچ ہوں گے، جس میں ہر بار [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) کی ضرورت ہوگی، جو آپ کے ڈی ایپ کو سست اور ناکارہ بنا دے گا۔ ایک حل آپ کے کنٹریکٹ کے اندر ایک فیچر کال فنکشن ہو سکتا ہے جو ایک ساتھ ایک سے زیادہ ڈیٹا واپس کرتا ہے۔ اگرچہ یہ ہمیشہ مثالی نہیں ہے۔

اور پھر آپ کو تاریخی ڈیٹا میں بھی دلچسپی ہو سکتی ہے۔ آپ نہ صرف آخری ٹریڈ کا وقت جاننا چاہتے ہیں، بلکہ ان تمام ٹریڈز کے اوقات بھی جاننا چاہتے ہیں جو آپ نے خود کیے ہیں۔ _create-eth-app_ سب گراف پیکیج کا استعمال کریں، [ڈاکومنٹیشن](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) پڑھیں اور اسے اپنے کنٹریکٹس کے مطابق ڈھالیں۔ اگر آپ مقبول اسمارٹ کنٹریکٹس کی تلاش میں ہیں، تو ہو سکتا ہے کہ پہلے سے ہی ایک سب گراف موجود ہو۔ [سب گراف ایکسپلورر](https://thegraph.com/explorer/) دیکھیں۔

ایک بار جب آپ کے پاس سب گراف ہو جاتا ہے، تو یہ آپ کو اپنے ڈی ایپ میں ایک سادہ کوئری لکھنے کی اجازت دیتا ہے جو آپ کے لیے درکار تمام اہم بلاک چین ڈیٹا کو بازیافت کرتا ہے، بشمول تاریخی ڈیٹا، اور اس کے لیے صرف ایک فیچ کی ضرورت ہوتی ہے۔

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) انٹیگریشن کی بدولت آپ آسانی سے اپنے React ڈی ایپ میں گراف کو انٹیگریٹ کر سکتے ہیں۔ خاص طور پر [React hooks and Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) کا استعمال کرتے وقت، ڈیٹا حاصل کرنا اتنا ہی آسان ہے جتنا کہ اپنے کمپونینٹ میں ایک ہی GraphQl کوئری لکھنا:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## ٹیمپلیٹس {#templates}

اس کے علاوہ آپ کئی مختلف ٹیمپلیٹس میں سے انتخاب کر سکتے ہیں۔ اب تک آپ Aave، Compound، UniSwap یا sablier انٹیگریشن استعمال کر سکتے ہیں۔ وہ سبھی پہلے سے بنے سب گراف انٹیگریشنز کے ساتھ اہم سروس اسمارٹ کنٹریکٹ ایڈریسز شامل کرتے ہیں۔ بس ٹیمپلیٹ کو کریشن کمانڈ میں شامل کریں جیسے `yarn create eth-app my-eth-app --with-template aave`۔

### Aave {#aave}

[Aave](https://aave.com/) ایک وکندریقرت رقم قرض دینے والی مارکیٹ ہے۔ ڈیپازیٹرز غیر فعال آمدنی حاصل کرنے کے لیے مارکیٹ کو لیکویڈیٹی فراہم کرتے ہیں، جبکہ قرض لینے والے کولیٹرلز کا استعمال کرکے قرض لے سکتے ہیں۔ Aave کی ایک منفرد خصوصیت [فلیش لونز](https://aave.com/docs/developers/flash-loans) ہیں جو آپ کو بغیر کسی کولیٹرل کے رقم ادھار لینے کی اجازت دیتے ہیں، جب تک کہ آپ ایک ٹرانزیکشن کے اندر قرض واپس کر دیں۔ یہ مفید ہو سکتا ہے، مثال کے طور پر، آربٹریج ٹریڈنگ پر آپ کو اضافی نقد رقم دینے کے لیے۔

ٹریڈ کیے گئے ٹوکنز جو آپ کو سود کماتے ہیں انہیں _aTokens_ کہا جاتا ہے۔

جب آپ _create-eth-app_ کے ساتھ Aave کو انٹیگریٹ کرنے کا انتخاب کرتے ہیں، تو آپ کو ایک [سب گراف انٹیگریشن](https://docs.aave.com/developers/getting-started/using-graphql) ملے گا۔ Aave، The Graph کا استعمال کرتا ہے اور آپ کو پہلے ہی [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) اور [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) پر [خام](https://thegraph.com/explorer/subgraph/aave/protocol-raw) یا [فارمیٹ شدہ](https://thegraph.com/explorer/subgraph/aave/protocol) شکل میں کئی استعمال کے لیے تیار سب گراف فراہم کرتا ہے۔

![Aave فلیش لون میم – "ہاں، اگر میں اپنا فلیش لون 1 ٹرانزیکشن سے زیادہ وقت تک رکھ سکتا، تو یہ بہت اچھا ہوتا"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/)، Aave کی طرح ہے۔ انٹیگریشن میں نیا [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) پہلے سے ہی شامل ہے۔ یہاں سود کمانے والے ٹوکنز کو حیرت انگیز طور پر _cTokens_ کہا جاتا ہے۔

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) ایک وکندریقرت ایکسچینج (DEX) ہے۔ لیکویڈیٹی فراہم کرنے والے ٹریڈ کے دونوں اطراف کے لیے مطلوبہ ٹوکنز یا ایتھر فراہم کرکے فیس کما سکتے ہیں۔ یہ بڑے پیمانے پر استعمال ہوتا ہے اور اس لیے ٹوکنز کی ایک بہت وسیع رینج کے لیے اس کی لیکویڈیٹی سب سے زیادہ ہے۔ آپ اسے آسانی سے اپنے ڈی ایپ میں انٹیگریٹ کر سکتے ہیں، مثال کے طور پر، صارفین کو اپنے ETH کو DAI سے تبدیل کرنے کی اجازت دینے کے لیے۔

بدقسمتی سے، اس تحریر کے وقت انٹیگریشن صرف Uniswap v1 کے لیے ہے نہ کہ [ابھی جاری کردہ v2](https://uniswap.org/blog/uniswap-v2/) کے لیے۔

### Sablier {#sablier}

[Sablier](https://sablier.com/) صارفین کو رقم کی ادائیگیوں کو اسٹریم کرنے کی اجازت دیتا ہے۔ ایک ہی تنخواہ کے دن کے بجائے، آپ کو ابتدائی سیٹ اپ کے بعد مزید کسی انتظامی کارروائی کے بغیر مسلسل اپنی رقم ملتی ہے۔ انٹیگریشن میں اس کا [اپنا سب گراف](https://thegraph.com/explorer/subgraph/sablierhq/sablier) شامل ہے۔

## آگے کیا ہے؟ {#whats-next}

اگر آپ کے پاس _create-eth-app_ کے بارے میں سوالات ہیں، تو [Sablier کمیونٹی سرور](https://discord.gg/bsS8T47) پر جائیں، جہاں آپ _create-eth-app_ کے مصنفین سے رابطہ کر سکتے ہیں۔ کچھ پہلے اگلے اقدامات کے طور پر آپ [Material UI](https://mui.com/material-ui/) جیسے UI فریم ورک کو انٹیگریٹ کرنا چاہ سکتے ہیں، اس ڈیٹا کے لیے GraphQL کوئریز لکھیں جس کی آپ کو واقعی ضرورت ہے اور ڈیپلائمنٹ سیٹ اپ کریں۔
