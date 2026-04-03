---
title: "ڈیٹا اور تجزیات"
description: "اپنی ڈی ایپس (dapps) میں استعمال کے لیے آن چین تجزیات اور ڈیٹا کیسے حاصل کریں"
lang: ur
---

## تعارف {#Introduction}

جیسے جیسے نیٹ ورک کا استعمال بڑھتا جا رہا ہے، آن چین ڈیٹا میں قیمتی معلومات کی ایک بڑھتی ہوئی مقدار موجود ہوگی۔ چونکہ ڈیٹا کے حجم میں تیزی سے اضافہ ہوتا ہے، اس معلومات کا حساب لگانا اور اسے اکٹھا کرنا تاکہ اس پر رپورٹ کی جا سکے یا کسی ڈی ایپ (dapp) کو چلایا جا سکے، ایک وقت طلب اور بھاری عمل بن سکتا ہے۔

موجودہ ڈیٹا فراہم کنندگان کا فائدہ اٹھانا ڈیولپمنٹ کو تیز کر سکتا ہے، زیادہ درست نتائج پیدا کر سکتا ہے، اور جاری دیکھ بھال کی کوششوں کو کم کر سکتا ہے۔ اس سے ایک ٹیم کو اس بنیادی فعالیت پر توجہ مرکوز کرنے کے قابل بنایا جا سکے گا جو ان کا پروجیکٹ فراہم کرنے کی کوشش کر رہا ہے۔

## پیشگی شرائط {#prerequisites}

ڈیٹا تجزیات کے تناظر میں ان کے استعمال کو بہتر طور پر سمجھنے کے لیے آپ کو [Block Explorers](/developers/docs/data-and-analytics/block-explorers/) کے بنیادی تصور کو سمجھنا چاہیے۔ اس کے علاوہ، سسٹم ڈیزائن میں ان کے شامل کردہ فوائد کو سمجھنے کے لیے خود کو [index](/glossary/#index) کے تصور سے واقف کریں۔

آرکیٹیکچرل بنیادی باتوں کے لحاظ سے، یہ سمجھنا کہ [API](https://www.wikipedia.org/wiki/API) اور [REST](https://www.wikipedia.org/wiki/Representational_state_transfer) کیا ہیں، کم از کم نظریاتی طور پر۔

## بلاک ایکسپلوررز {#block-explorers}

بہت سے [Block Explorers](/developers/docs/data-and-analytics/block-explorers/) ایسے [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) گیٹ ویز پیش کرتے ہیں جو ڈیولپرز کو بلاکس، ٹرانزیکشنز، ویلیڈیٹرز، اکاؤنٹس، اور دیگر آن چین سرگرمیوں پر ریئل ٹائم ڈیٹا تک رسائی فراہم کریں گے۔

ڈیولپرز پھر اس ڈیٹا کو پروسیس اور تبدیل کر سکتے ہیں تاکہ وہ اپنے صارفین کو [blockchain](/glossary/#blockchain) کے ساتھ منفرد بصیرت اور تعاملات فراہم کر سکیں۔ مثال کے طور پر، [Etherscan](https://etherscan.io) اور [Blockscout](https://eth.blockscout.com) ہر 12s سلاٹ کے لیے ایگزیکیوشن اور کنسینسس ڈیٹا فراہم کرتے ہیں۔

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) ایک انڈیکسنگ پروٹوکول ہے جو اوپن APIs، جنہیں subgraphs کہا جاتا ہے، کے ذریعے بلاک چین ڈیٹا کو کوئری (query) کرنے کا ایک آسان طریقہ فراہم کرتا ہے۔

The Graph کے ساتھ، ڈیولپرز درج ذیل سے فائدہ اٹھا سکتے ہیں:

- ڈی سینٹرلائزڈ انڈیکسنگ: متعدد انڈیکسرز کے ذریعے بلاک چین ڈیٹا کی انڈیکسنگ کو قابل بناتا ہے، اس طرح ناکامی کے کسی بھی واحد مقام (single point of failure) کو ختم کرتا ہے۔
- GraphQL کوئریز: انڈیکس شدہ ڈیٹا کو کوئری کرنے کے لیے ایک طاقتور GraphQL انٹرفیس فراہم کرتا ہے، جس سے ڈیٹا کی بازیافت انتہائی آسان ہو جاتی ہے۔
- کسٹمائزیشن: بلاک چین ڈیٹا کو تبدیل کرنے اور اسٹور کرنے کے لیے اپنی منطق (logic) کی وضاحت کریں، اور The Graph Network پر دیگر ڈیولپرز کے شائع کردہ subgraphs کو دوبارہ استعمال کریں۔

5 منٹ کے اندر ایک subgraph بنانے، تعینات کرنے اور کوئری کرنے کے لیے اس [quick-start](https://thegraph.com/docs/en/quick-start/) گائیڈ پر عمل کریں۔

## کلائنٹ کا تنوع {#client-diversity}

[Client diversity](/developers/docs/nodes-and-clients/client-diversity/) ایتھریم نیٹ ورک کی مجموعی صحت کے لیے اہم ہے کیونکہ یہ بگز اور خطرات کے خلاف لچک فراہم کرتا ہے۔ اب کئی کلائنٹ ڈائیورسٹی ڈیش بورڈز موجود ہیں جن میں [clientdiversity.org](https://clientdiversity.org/)، [rated.network](https://www.rated.network)، [supermajority.info](https://supermajority.info//) اور [Ethernodes](https://ethernodes.org/) شامل ہیں۔

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) بلاک چین ڈیٹا کو ریلیشنل ڈیٹا بیس (DuneSQL) ٹیبلز میں پری پروسیس کرتا ہے، صارفین کو SQL کا استعمال کرتے ہوئے بلاک چین ڈیٹا کو کوئری کرنے اور کوئری کے نتائج کی بنیاد پر ڈیش بورڈز بنانے کی اجازت دیتا ہے۔ آن چین ڈیٹا کو 4 خام ٹیبلز میں منظم کیا گیا ہے: `blocks`، `transactions`، (ایونٹ) `logs` اور (کال) `traces`۔ مقبول کنٹریکٹس اور پروٹوکولز کو ڈی کوڈ کیا گیا ہے، اور ہر ایک کے پاس ایونٹ اور کال ٹیبلز کا اپنا سیٹ ہے۔ ان ایونٹ اور کال ٹیبلز پر مزید کارروائی کی جاتی ہے اور انہیں پروٹوکولز کی قسم کے لحاظ سے ایبسٹریکشن ٹیبلز میں منظم کیا جاتا ہے، مثال کے طور پر، dex، لینڈنگ، stablecoins، وغیرہ۔

## SQD {#sqd}

[SQD](https://sqd.dev/) ایک ڈی سینٹرلائزڈ ہائپر اسکیل ایبل ڈیٹا پلیٹ فارم ہے جسے ڈیٹا کے بڑے حجم تک موثر، بغیر اجازت رسائی فراہم کرنے کے لیے بہتر بنایا گیا ہے۔ یہ فی الحال تاریخی آن چین ڈیٹا پیش کرتا ہے، جس میں ایونٹ لاگز، ٹرانزیکشن کی رسیدیں، ٹریسز، اور فی ٹرانزیکشن اسٹیٹ ڈِفس (state diffs) شامل ہیں۔ SQD کسٹم ڈیٹا نکالنے اور پروسیسنگ پائپ لائنز بنانے کے لیے ایک طاقتور ٹول کٹ پیش کرتا ہے، جو فی سیکنڈ 150k بلاکس تک کی انڈیکسنگ کی رفتار حاصل کرتا ہے۔

شروع کرنے کے لیے، [documentation](https://docs.sqd.dev/) دیکھیں یا [EVM examples](https://github.com/subsquid-labs/squid-evm-examples) دیکھیں کہ آپ SQD کے ساتھ کیا بنا سکتے ہیں۔

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) ایک سرکردہ ڈیٹا انڈیکسر ہے جو ڈیولپرز کو ان کے web3 پروجیکٹس کے لیے تیز، قابل اعتماد، ڈی سینٹرلائزڈ، اور کسٹمائزڈ APIs دیتا ہے۔ SubQuery 165+ سے زیادہ ایکو سسٹمز (بشمول ایتھریم) کے ڈیولپرز کو بھرپور انڈیکس شدہ ڈیٹا کے ساتھ بااختیار بناتا ہے تاکہ وہ اپنے صارفین کے لیے ایک بدیہی اور عمیق تجربہ تیار کر سکیں۔ SubQuery Network آپ کی نہ رکنے والی ایپس کو ایک لچکدار اور ڈی سینٹرلائزڈ انفراسٹرکچر نیٹ ورک کے ساتھ طاقت بخشتا ہے۔ ڈیٹا پروسیسنگ کی سرگرمیوں کے لیے کسٹم بیک اینڈ بنانے میں وقت صرف کیے بغیر، مستقبل کی web3 ایپلی کیشنز بنانے کے لیے SubQuery کی بلاک چین ڈیولپر ٹول کٹ کا استعمال کریں۔

شروع کرنے کے لیے، [SubQuery's managed service](https://managedservice.subquery.network/) یا [SubQuery's decentralised network](https://app.subquery.network/dashboard) پر لائیو جانے سے پہلے ٹیسٹنگ کے لیے مقامی Docker ماحول میں منٹوں میں ایتھریم بلاک چین ڈیٹا کی انڈیکسنگ شروع کرنے کے لیے [Ethereum quick start guide](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) دیکھیں۔

## Codex {#codex}

[Codex](https://www.codex.io/) ایک ریئل ٹائم بلاک چین ڈیٹا API ہے جو 80+ نیٹ ورکس پر 70 ملین+ ٹوکنز کے لیے افزودہ ڈیٹا فراہم کرتا ہے۔ ڈیولپرز کسٹم انڈیکسنگ انفراسٹرکچر کو برقرار رکھے بغیر اسٹرکچرڈ ٹوکن کی قیمتوں، والیٹ بیلنس، ٹرانزیکشن ہسٹری، اور مجموعی تجزیات (حجم، لیکویڈیٹی، منفرد والیٹس) تک رسائی حاصل کر سکتے ہیں۔ Codex WebSocket اور webhook انضمام کے ذریعے سب سیکنڈ ڈیٹا کی ترسیل کو سپورٹ کرتا ہے۔

شروع کرنے کے لیے، [documentation](https://docs.codex.io) دیکھیں، [Explorer](https://docs.codex.io/explore) آزمائیں، یا [dashboard](https://dashboard.codex.io/signup) پر سائن اپ کریں۔

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) ایک SQL جیسی زبان ہے جسے EVM (Ethereum Virtual Machine) چینز کو کوئری کرنے کے لیے ڈیزائن کیا گیا ہے۔ EQL کا حتمی مقصد EVM چین کے فرسٹ کلاس شہریوں (بلاکس، اکاؤنٹس، اور ٹرانزیکشنز) پر پیچیدہ ریلیشنل کوئریز کو سپورٹ کرنا ہے جبکہ ڈیولپرز اور محققین کو روزمرہ کے استعمال کے لیے ایک ایرگونومک سنٹیکس فراہم کرنا ہے۔ EQL کے ساتھ، ڈیولپرز مانوس SQL جیسے سنٹیکس کا استعمال کرتے ہوئے بلاک چین ڈیٹا حاصل کر سکتے ہیں اور پیچیدہ بوائلر پلیٹ کوڈ کی ضرورت کو ختم کر سکتے ہیں۔ EQL معیاری بلاک چین ڈیٹا کی درخواستوں کو سپورٹ کرتا ہے (جیسے، ایتھریم پر کسی اکاؤنٹ کا نانس (nonce) اور بیلنس بازیافت کرنا یا موجودہ بلاک کا سائز اور ٹائم اسٹیمپ حاصل کرنا) اور مزید پیچیدہ درخواستوں اور فیچر سیٹس کے لیے مسلسل سپورٹ شامل کر رہا ہے۔

## مزید مطالعہ {#further-reading}

- [کرپٹو ڈیٹا کی تلاش I: ڈیٹا فلو آرکیٹیکچرز](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [گراف نیٹ ورک کا جائزہ](https://thegraph.com/docs/en/about/)
- [گراف کوئری پلے گراؤنڈ](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [EtherScan پر API کوڈ کی مثالیں](https://etherscan.io/apis#contracts)
- [Blockscout پر API کی دستاویزات](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in بیکن چین ایکسپلورر](https://beaconcha.in)
- [Dune کی بنیادی باتیں](https://docs.dune.com/#dune-basics)
- [SubQuery ایتھریم کوئیک اسٹارٹ گائیڈ](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [SQD نیٹ ورک کا جائزہ](https://docs.sqd.dev/)
- [EVM کوئری لینگویج](https://eql.sh/blog/alpha-release-notes)

## ٹیوٹوریلز: ڈیٹا اور تجزیات / ایتھریم پر SQL {#tutorials}

- [SQL کے ساتھ ایتھریم کے بنیادی موضوعات سیکھیں](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– ٹرانزیکشنز، بلاکس، اور گیس کے بنیادی اصولوں کو سمجھنے کے لیے SQL کے ساتھ آن چین ایتھریم ڈیٹا کو کوئری کریں۔_