---
title: Go ڈیولپرز کے لیے ایتھریم
description: Go پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے ایتھریم کے لیے ڈیولپ کرنے کا طریقہ سیکھیں
lang: ur-in
incomplete: true
---

<FeaturedText>Go پر مبنی پروجیکٹس اور ٹولنگ کا استعمال کرتے ہوئے ایتھریم کے لیے ڈیولپ کرنے کا طریقہ سیکھیں</FeaturedText>

غیر مرکزی ایپلی کیشنز (یا "dapps") بنانے کے لیے ایتھریم کا استعمال کریں۔ یہ dapps قابل اعتماد ہو سکتی ہیں، یعنی ایک بار جب انہیں Ethereum پر ڈیپلائے کر دیا جاتا ہے، تو وہ ہمیشہ پروگرام کے مطابق چلیں گی۔ وہ غیر مرکزی ہیں، یعنی وہ پیئر ٹو پیئر نیٹ ورک پر چلتے ہیں اور ناکامی کا کوئی واحد نقطہ نہیں ہے۔ کوئی واحد ادارہ یا شخص انہیں کنٹرول نہیں کرتا ہے اور انہیں سنسر کرنا تقریباً ناممکن ہے۔ وہ نئی قسم کی ایپلی کیشنز بنانے کے لیے ڈیجیٹل اثاثوں کو کنٹرول کر سکتے ہیں۔

## اسمارٹ کنٹریکٹس اور Solidity زبان کے ساتھ شروعات کرنا {#getting-started-with-smart-contracts-and-solidity}

**Go کو ایتھریم کے ساتھ مربوط کرنے کے لیے اپنے پہلے اقدامات کریں**

پہلے مزید بنیادی پرائمر کی ضرورت ہے؟ [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/) دیکھیں۔

- [بلاک چین کی وضاحت](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [اسمارٹ کنٹریکٹس کو سمجھنا](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اپنا پہلا اسمارٹ کنٹریکٹ لکھیں](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity کو کمپائل اور ڈیپلائے کرنے کا طریقہ سیکھیں](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [کنٹریکٹ ٹیوٹوریل](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## ابتدائی مضامین اور کتابیں {#beginner-articles-and-books}

- [Geth کے ساتھ شروعات کرنا](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [ایتھریم سے منسلک ہونے کے لیے Golang کا استعمال کریں](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang کا استعمال کرتے ہوئے ایتھریم اسمارٹ کنٹریکٹس کو ڈیپلائے کریں](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go میں ایتھریم اسمارٹ کنٹریکٹس کی جانچ اور ڈیپلائے کرنے کے لیے ایک مرحلہ وار گائیڈ](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ای بک: Go کے ساتھ ایتھریم ڈیولپمنٹ](https://goethereumbook.org/) - _Go کے ساتھ ایتھریم ایپلی کیشنز ڈیولپ کریں_

## انٹرمیڈیٹ مضامین اور دستاویزات {#intermediate-articles-and-docs}

- [Go Ethereum کی دستاویزات](https://geth.ethereum.org/docs/) - _آفیشل Ethereum Golang کے لیے دستاویزات_
- [Erigon پروگرامر کی گائیڈ](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _اسٹیٹ ٹری، ملٹی پروفس، اور ٹرانزیکشن پروسیسنگ سمیت تصویری گائیڈ_
- [Erigon اور اسٹیٹ لیس ایتھریم](https://youtu.be/3-Mn7OckSus?t=394) - _2020 ایتھریم کمیونٹی کانفرنس (EthCC 3)_
- [Erigon: ایتھریم کلائنٹس کو بہتر بنانا](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth کے ساتھ Go میں ایک dapp بنانا](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang اور Geth کے ساتھ ایتھریم پرائیویٹ نیٹ ورک کے ساتھ کام کریں](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go کے ساتھ ایتھریم پر Solidity کنٹریکٹس کی یونٹ ٹیسٹنگ](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth کو لائبریری کے طور پر استعمال کرنے کے لیے فوری حوالہ](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## استعمال کے جدید پیٹرن {#advanced-use-patterns}

- [GETH سمیولیٹڈ بیک اینڈ](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [ایتھریم اور Quorum کا استعمال کرتے ہوئے بلاک چین-ایز-اے-سروس ایپس](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [ایتھریم بلاک چین ایپلی کیشنز میں ڈسٹری بیوٹیڈ اسٹوریج IPFS اور Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [موبائل کلائنٹس: لائبریریز اور انپراک ایتھریم نوڈس](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [نیٹیو dapps: ایتھریم کنٹریکٹس کے لیے Go بائنڈنگز](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go پروجیکٹس اور ٹولز {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _ایتھریم پروٹوکول کا آفیشل Go نفاذ_
- [Go Ethereum کوڈ کا تجزیہ](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum سورس کوڈ کا جائزہ اور تجزیہ_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go Ethereum کا تیز ترین ڈیریویٹیو، آرکائیو نوڈس پر توجہ کے ساتھ_
- [Golem](https://github.com/golemfactory/golem) - _Golem کمپیوٹنگ پاور کے لیے ایک عالمی مارکیٹ بنا رہا ہے_
- [Quorum](https://github.com/jpmorganchase/quorum) - _ایتھریم کا ایک اجازت یافتہ نفاذ جو ڈیٹا کی رازداری کو سپورٹ کرتا ہے_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _ایتھریم 'Serenity' 2.0 Go کا نفاذ_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _غیر مرکزی ٹویٹر: ایتھریم بلاک چین پر چلنے والی ایک مائیکرو بلاگنگ سروس_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _کم از کم قابل عمل پلازما کی تفصیلات کا Golang نفاذ اور توسیع_
- [اوپن ایتھریم مائننگ پول](https://github.com/sammy007/open-ethereum-pool) - _ایک اوپن سورس ایتھریم مائننگ پول_
- [ایتھریم HD والیٹ](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go میں ایتھریم HD والیٹ ڈیریویشنز_
- [ملٹی Geth](https://github.com/multi-geth/multi-geth) - _ایتھریم نیٹ ورکس کی کئی اقسام کے لیے سپورٹ_
- [Geth لائٹ کلائنٹ](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _لائٹ ایتھریم سب پروٹوکول کا Geth نفاذ_
- [ایتھریم Golang SDK](https://github.com/everFinance/goether) - _Golang میں ایک سادہ ایتھریم والیٹ کا نفاذ اور یوٹیلیٹیز_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ بلاک چینز کے لیے Go SDK کے ذریعے موثر بلاک چین ڈیٹا تک رسائی_

مزید وسائل کی تلاش ہے؟ [ethereum.org/developers](/developers/) دیکھیں

## Go کمیونٹی کے تعاون کنندگان {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum چینل](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - ایتھریم](https://ethereum.stackexchange.com/)
- [ملٹی Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [ایتھریم Gitter](https://gitter.im/ethereum/home)
- [Geth لائٹ کلائنٹ Gitter](https://gitter.im/ethereum/light-client)

## دیگر مجموعی فہرستیں {#other-aggregated-lists}

- [شاندار ایتھریم](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: ایتھریم ڈیولپر ٹولز کی ایک حتمی فہرست](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub سورس](https://github.com/ConsenSys/ethereum-developer-tools-list)
