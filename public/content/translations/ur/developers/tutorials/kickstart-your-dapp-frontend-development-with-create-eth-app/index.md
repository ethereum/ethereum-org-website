---
title: "create-eth-app کے ساتھ اپنی ڈیپ (dapp) فرنٹ اینڈ ڈیولپمنٹ کا آغاز کریں"
description: "create-eth-app کو استعمال کرنے کے طریقے اور اس کی خصوصیات کا جائزہ"
author: "مارکس واس"
tags:
  ["فرنٹ اینڈ", "JavaScript", "ethers.js", "the graph", "ڈی فائی"]
skill: beginner
breadcrumb: create-eth-app
lang: ur
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

پچھلی بار ہم نے [Solidity کی بڑی تصویر](https://soliditydeveloper.com/solidity-overview-2020) پر نظر ڈالی تھی اور پہلے ہی [create-eth-app](https://github.com/PaulRBerg/create-eth-app) کا ذکر کیا تھا۔ اب آپ جانیں گے کہ اسے کیسے استعمال کرنا ہے، اس میں کون سی خصوصیات شامل ہیں اور اسے مزید وسعت دینے کے اضافی آئیڈیاز کیا ہیں۔ [Sablier](http://sablier.com/) کے بانی Paul Razvan Berg کی طرف سے شروع کی گئی، یہ ایپ آپ کی فرنٹ اینڈ ڈیولپمنٹ کا آغاز کرے گی اور اس میں منتخب کرنے کے لیے کئی اختیاری انضمام (integrations) شامل ہیں۔

## انسٹالیشن {#installation}

انسٹالیشن کے لیے Yarn 0.25 یا اس سے اوپر کا ورژن درکار ہے (`npm install yarn --global`)۔ اسے چلانا اتنا ہی آسان ہے جتنا:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

یہ پس پردہ [create-react-app](https://github.com/facebook/create-react-app) کا استعمال کر رہا ہے۔ اپنی ایپ دیکھنے کے لیے، `http://localhost:3000/` کھولیں۔ جب آپ پروڈکشن میں ڈیپلائے کرنے کے لیے تیار ہوں، تو yarn build کے ساتھ ایک minified بنڈل بنائیں۔ اسے ہوسٹ کرنے کا ایک آسان طریقہ [Netlify](https://www.netlify.com/) ہوگا۔ آپ ایک GitHub ریپو بنا سکتے ہیں، اسے Netlify میں شامل کر سکتے ہیں، بلڈ کمانڈ سیٹ اپ کر سکتے ہیں اور آپ کا کام مکمل ہو گیا! آپ کی ایپ ہوسٹ ہو جائے گی اور ہر کسی کے لیے قابل استعمال ہوگی۔ اور یہ سب بالکل مفت ہے۔

## خصوصیات {#features}

### React اور create-react-app {#react--create-react-app}

سب سے پہلے ایپ کا دل: React اور _create-react-app_ کے ساتھ آنے والی تمام اضافی خصوصیات۔ اگر آپ Ethereum کو ضم (integrate) نہیں کرنا چاہتے تو صرف اس کا استعمال ایک بہترین آپشن ہے۔ [React](https://react.dev/) بذات خود انٹرایکٹو UI بنانا بہت آسان بناتا ہے۔ یہ شاید [Vue](https://vuejs.org/) جتنا مبتدیوں کے لیے آسان نہ ہو، لیکن یہ اب بھی سب سے زیادہ استعمال ہوتا ہے، اس میں زیادہ خصوصیات ہیں اور سب سے اہم بات یہ ہے کہ اس میں منتخب کرنے کے لیے ہزاروں اضافی لائبریریاں موجود ہیں۔ _create-react-app_ اس کے ساتھ شروعات کرنا بھی بہت آسان بناتا ہے اور اس میں شامل ہیں:

- React، JSX، ES6، TypeScript، Flow سنٹیکس سپورٹ۔
- ES6 سے آگے زبان کے اضافی فیچرز جیسے آبجیکٹ اسپریڈ آپریٹر۔
- آٹوپریفکسڈ CSS، تاکہ آپ کو -webkit- یا دیگر پریفکسز کی ضرورت نہ پڑے۔
- کوریج رپورٹنگ کے لیے بلٹ ان سپورٹ کے ساتھ ایک تیز انٹرایکٹو یونٹ ٹیسٹ رنر۔
- ایک لائیو ڈیولپمنٹ سرور جو عام غلطیوں کے بارے میں خبردار کرتا ہے۔
- پروڈکشن کے لیے JS، CSS، اور امیجز کو بنڈل کرنے کے لیے ایک بلڈ اسکرپٹ، ہیشز اور سورس میپس کے ساتھ۔

خاص طور پر _create-eth-app_ نئے [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html) کا استعمال کر رہا ہے۔ طاقتور، پھر بھی بہت چھوٹے نام نہاد فنکشنل کمپوننٹس لکھنے کا ایک طریقہ۔ _create-eth-app_ میں ان کا استعمال کیسے ہوتا ہے، اس کے لیے Apollo کے بارے میں نیچے دیا گیا سیکشن دیکھیں۔

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) آپ کو متعدد پیکجز رکھنے کی اجازت دیتے ہیں، لیکن آپ ان سب کو روٹ فولڈر سے منظم کر سکتے ہیں اور `yarn install` کا استعمال کرتے ہوئے ایک ہی وقت میں سب کے لیے ڈیپینڈینسیز (dependencies) انسٹال کر سکتے ہیں۔ یہ خاص طور پر چھوٹے اضافی پیکجز کے لیے کارآمد ہے جیسے اسمارٹ کانٹریکٹس ایڈریسز/ABI مینجمنٹ (یہ معلومات کہ آپ نے کون سے اسمارٹ کانٹریکٹس کہاں ڈیپلائے کیے ہیں اور ان کے ساتھ کیسے بات چیت کرنی ہے) یا گراف انضمام، جو دونوں `create-eth-app` کا حصہ ہیں۔

### ethers.js {#ethersjs}

اگرچہ [Web3](https://docs.web3js.org/) اب بھی زیادہ تر استعمال ہوتا ہے، لیکن پچھلے سال میں ایک متبادل کے طور پر [ethers.js](https://docs.ethers.io/) نے بہت زیادہ مقبولیت حاصل کی ہے اور یہی _create-eth-app_ میں ضم کیا گیا ہے۔ آپ اس کے ساتھ کام کر سکتے ہیں، اسے Web3 میں تبدیل کر سکتے ہیں یا [ethers.js v5](https://docs.ethers.org/v5/) پر اپ گریڈ کرنے پر غور کر سکتے ہیں جو تقریباً بیٹا (beta) سے باہر ہے۔

### The Graph {#the-graph}

[Restful API](https://restfulapi.net/) کے مقابلے میں ڈیٹا کو ہینڈل کرنے کے لیے [GraphQL](https://graphql.org/) ایک متبادل طریقہ ہے۔ Restful APIs پر ان کے کئی فوائد ہیں، خاص طور پر ڈی سینٹرلائزڈ بلاک چین ڈیٹا کے لیے۔ اگر آپ اس کے پیچھے کی وجوہات میں دلچسپی رکھتے ہیں، تو [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a) پر ایک نظر ڈالیں۔

عام طور پر آپ اپنے اسمارٹ کانٹریکٹ سے براہ راست ڈیٹا حاصل کرتے ہیں۔ کیا آپ تازہ ترین ٹریڈ کا وقت پڑھنا چاہتے ہیں؟ بس `MyContract.methods.latestTradeTime().call()` کو کال کریں جو ایک Ethereum نوڈ سے آپ کی ڈیپ (dapp) میں ڈیٹا لاتا ہے۔ لیکن کیا ہوگا اگر آپ کو سینکڑوں مختلف ڈیٹا پوائنٹس کی ضرورت ہو؟ اس کے نتیجے میں نوڈ سے سینکڑوں بار ڈیٹا لانا پڑے گا، ہر بار ایک [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) کی ضرورت ہوگی جو آپ کی ڈیپ کو سست اور غیر موثر بنا دے گی۔ اس کا ایک حل آپ کے کانٹریکٹ کے اندر ایک فیچر (fetcher) کال فنکشن ہو سکتا ہے جو ایک ہی وقت میں متعدد ڈیٹا واپس کرتا ہے۔ تاہم، یہ ہمیشہ مثالی نہیں ہوتا۔

اور پھر آپ تاریخی ڈیٹا میں بھی دلچسپی لے سکتے ہیں۔ آپ نہ صرف آخری ٹریڈ کا وقت جاننا چاہتے ہیں، بلکہ ان تمام ٹریڈز کے اوقات بھی جاننا چاہتے ہیں جو آپ نے خود کبھی کی تھیں۔ _create-eth-app_ سب گراف (subgraph) پیکج کا استعمال کریں، [دستاویزات](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) پڑھیں اور اسے اپنے کانٹریکٹس کے مطابق ڈھالیں۔ اگر آپ مقبول اسمارٹ کانٹریکٹس تلاش کر رہے ہیں، تو ہو سکتا ہے کہ پہلے سے ہی کوئی سب گراف موجود ہو۔ [سب گراف ایکسپلورر](https://thegraph.com/explorer/) چیک کریں۔

ایک بار جب آپ کے پاس سب گراف ہو جاتا ہے، تو یہ آپ کو اپنی ڈیپ میں ایک سادہ کیوری (query) لکھنے کی اجازت دیتا ہے جو آپ کی ضرورت کے تمام اہم بلاک چین ڈیٹا بشمول تاریخی ڈیٹا کو بازیافت کرتا ہے، جس کے لیے صرف ایک فیچ (fetch) درکار ہوتا ہے۔

### Apollo {#apollo}

[Apollo Boost](https://www.apollographql.com/docs/react/get-started/) انضمام کی بدولت آپ آسانی سے گراف کو اپنی React ڈیپ میں ضم کر سکتے ہیں۔ خاص طور پر جب [React hooks اور Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) کا استعمال کیا جائے، تو ڈیٹا لانا اتنا ہی آسان ہے جتنا آپ کے کمپوننٹ میں ایک واحد GraphQl کیوری لکھنا:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## ٹیمپلیٹس {#templates}

اس کے علاوہ آپ کئی مختلف ٹیمپلیٹس میں سے انتخاب کر سکتے ہیں۔ اب تک آپ Aave، Compound، UniSwap یا sablier انضمام کا استعمال کر سکتے ہیں۔ یہ سب پہلے سے بنے ہوئے سب گراف انضمام کے ساتھ اہم سروس اسمارٹ کانٹریکٹ ایڈریسز شامل کرتے ہیں۔ بس تخلیق کی کمانڈ میں ٹیمپلیٹ شامل کریں جیسے `yarn create eth-app my-eth-app --with-template aave`۔

### Aave {#aave}

[Aave](https://aave.com/) ایک ڈی سینٹرلائزڈ منی لینڈنگ مارکیٹ ہے۔ جمع کرنے والے (Depositors) غیر فعال آمدنی (passive income) حاصل کرنے کے لیے مارکیٹ کو لیکویڈیٹی فراہم کرتے ہیں، جبکہ قرض لینے والے کولیٹرل (collaterals) کا استعمال کرتے ہوئے قرض لے سکتے ہیں۔ Aave کی ایک منفرد خصوصیت وہ [فلیش لونز (flash loans)](https://aave.com/docs/developers/flash-loans) ہیں جو آپ کو بغیر کسی کولیٹرل کے رقم ادھار لینے کی اجازت دیتے ہیں، بشرطیکہ آپ ایک ہی ٹرانزیکشن کے اندر قرض واپس کر دیں۔ یہ مثال کے طور پر آربٹریج (arbitrage) ٹریڈنگ پر آپ کو اضافی نقد رقم دینے کے لیے مفید ہو سکتا ہے۔

ٹریڈ کیے گئے ٹوکنز جو آپ کو سود (interests) کماتے ہیں انہیں _aTokens_ کہا جاتا ہے۔

جب آپ Aave کو _create-eth-app_ کے ساتھ ضم کرنے کا انتخاب کرتے ہیں، تو آپ کو ایک [سب گراف انضمام](https://docs.aave.com/developers/getting-started/using-graphql) ملے گا۔ Aave The Graph کا استعمال کرتا ہے اور پہلے ہی آپ کو [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) اور [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) پر [خام (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) یا [فارمیٹ شدہ](https://thegraph.com/explorer/subgraph/aave/protocol) شکل میں کئی استعمال کے لیے تیار سب گرافس فراہم کرتا ہے۔

![Aave فلیش لون میم – "ہاں، اگر میں اپنا فلیش لون 1 ٹرانزیکشن سے زیادہ دیر تک رکھ سکتا، تو یہ بہت اچھا ہوتا"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) Aave سے ملتا جلتا ہے۔ انضمام میں پہلے ہی نیا [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) شامل ہے۔ یہاں سود کمانے والے ٹوکنز کو حیرت انگیز طور پر _cTokens_ کہا جاتا ہے۔

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) ایک ڈی سینٹرلائزڈ ایکسچینج (DEX) ہے۔ لیکویڈیٹی فراہم کرنے والے ٹریڈ کے دونوں اطراف کے لیے مطلوبہ ٹوکنز یا ایتھر (ether) فراہم کر کے فیس کما سکتے ہیں۔ یہ وسیع پیمانے پر استعمال ہوتا ہے اور اس لیے ٹوکنز کی ایک بہت وسیع رینج کے لیے اس میں سب سے زیادہ لیکویڈیٹی موجود ہے۔ آپ اسے آسانی سے اپنی ڈیپ میں ضم کر سکتے ہیں تاکہ، مثال کے طور پر، صارفین کو اپنے ETH کو DAI کے بدلے سویپ (swap) کرنے کی اجازت دی جا سکے۔

بدقسمتی سے، اس تحریر کے وقت انضمام صرف Uniswap v1 کے لیے ہے اور [حال ہی میں جاری کردہ v2](https://uniswap.org/blog/uniswap-v2/) کے لیے نہیں۔

### Sablier {#sablier}

[Sablier](https://sablier.com/) صارفین کو رقم کی ادائیگیوں کو اسٹریم (stream) کرنے کی اجازت دیتا ہے۔ ایک ہی پے ڈے (payday) کے بجائے، آپ کو ابتدائی سیٹ اپ کے بعد مزید انتظامیہ کے بغیر مسلسل اپنی رقم ملتی رہتی ہے۔ انضمام میں اس کا [اپنا سب گراف](https://thegraph.com/explorer/subgraph/sablierhq/sablier) شامل ہے۔

## آگے کیا ہے؟ {#whats-next}

اگر آپ کے پاس _create-eth-app_ کے بارے میں سوالات ہیں، تو [Sablier کمیونٹی سرور](https://discord.gg/bsS8T47) پر جائیں، جہاں آپ _create-eth-app_ کے مصنفین سے رابطہ کر سکتے ہیں۔ کچھ ابتدائی اگلے اقدامات کے طور پر آپ [Material UI](https://mui.com/material-ui/) جیسے UI فریم ورک کو ضم کرنا، اس ڈیٹا کے لیے GraphQL کیوریز لکھنا جس کی آپ کو درحقیقت ضرورت ہے اور ڈیپلائمنٹ سیٹ اپ کرنا چاہیں گے۔