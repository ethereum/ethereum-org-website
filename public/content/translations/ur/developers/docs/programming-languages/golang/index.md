---
title: "Go ڈیولپرز کے لیے ایتھیریم"
description: "Go پر مبنی پروجیکٹس اور ٹولز کا استعمال کرتے ہوئے ایتھیریم کے لیے ڈیولپ کرنے کا طریقہ سیکھیں"
lang: ur
incomplete: true
---

<FeaturedText>Go پر مبنی پروجیکٹس اور ٹولز کا استعمال کرتے ہوئے ایتھیریم کے لیے ڈیولپ کرنے کا طریقہ سیکھیں</FeaturedText>

ڈی سینٹرلائزڈ ایپلی کیشنز (یا "dapps") بنانے کے لیے ایتھیریم کا استعمال کریں۔ یہ dapps قابل اعتماد ہو سکتی ہیں، جس کا مطلب ہے کہ ایک بار جب وہ ایتھیریم پر ڈیپلائے ہو جائیں، تو وہ ہمیشہ پروگرام کے مطابق چلیں گی۔ وہ ڈی سینٹرلائزڈ ہیں، جس کا مطلب ہے کہ وہ پیئر ٹو پیئر نیٹ ورک پر چلتی ہیں اور ان میں ناکامی کا کوئی واحد نقطہ (single point of failure) نہیں ہے۔ کوئی واحد ادارہ یا شخص انہیں کنٹرول نہیں کرتا اور انہیں سینسر کرنا تقریباً ناممکن ہے۔ وہ نئی قسم کی ایپلی کیشنز بنانے کے لیے ڈیجیٹل اثاثوں کو کنٹرول کر سکتی ہیں۔

## اسمارٹ کانٹریکٹس اور Solidity زبان کے ساتھ شروعات {#getting-started-with-smart-contracts-and-solidity}

**Go کو ایتھیریم کے ساتھ مربوط کرنے کے لیے اپنے پہلے قدم اٹھائیں**

کیا پہلے مزید بنیادی معلومات کی ضرورت ہے؟ [ethereum.org/learn](/learn/) یا [ethereum.org/developers](/developers/) دیکھیں۔

- [بلاک چین کی وضاحت](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [اسمارٹ کانٹریکٹس کو سمجھنا](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [اپنا پہلا اسمارٹ کانٹریکٹ لکھیں](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity کو کمپائل اور ڈیپلائے کرنے کا طریقہ سیکھیں](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [کانٹریکٹ ٹیوٹوریل](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## ابتدائی مضامین اور کتابیں {#beginner-articles-and-books}

- [Geth کے ساتھ شروعات](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [ایتھیریم سے جڑنے کے لیے Golang کا استعمال کریں](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang کا استعمال کرتے ہوئے ایتھیریم اسمارٹ کانٹریکٹس ڈیپلائے کریں](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go میں ایتھیریم اسمارٹ کانٹریکٹس کی ٹیسٹنگ اور ڈیپلائمنٹ کے لیے مرحلہ وار گائیڈ](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ای بک: Go کے ساتھ ایتھیریم ڈیولپمنٹ](https://goethereumbook.org/) - _Go کے ساتھ ایتھیریم ایپلی کیشنز ڈیولپ کریں_

## درمیانی سطح کے مضامین اور دستاویزات {#intermediate-articles-and-docs}

- [Go Ethereum کی دستاویزات](https://geth.ethereum.org/docs) - _آفیشل ایتھیریم Golang کے لیے دستاویزات_
- [Erigon پروگرامر گائیڈ](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _اسٹیٹ ٹری، ملٹی پروفز، اور ٹرانزیکشن پروسیسنگ سمیت تصویری گائیڈ_
- [Erigon اور اسٹیٹ لیس ایتھیریم](https://youtu.be/3-Mn7OckSus?t=394) - _2020 ایتھیریم کمیونٹی کانفرنس (EthCC 3)_
- [Erigon: ایتھیریم کلائنٹس کو بہتر بنانا](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth کے ساتھ Go میں dapp بنانا](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang اور Geth کے ساتھ ایتھیریم پرائیویٹ نیٹ ورک کے ساتھ کام کریں](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go کے ساتھ ایتھیریم پر Solidity کانٹریکٹس کی یونٹ ٹیسٹنگ](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth کو بطور لائبریری استعمال کرنے کے لیے فوری حوالہ](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## اعلی درجے کے استعمال کے پیٹرنز {#advanced-use-patterns}

- [GETH سیمولیٹڈ بیک اینڈ](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [ایتھیریم اور Quorum کا استعمال کرتے ہوئے Blockchain-as-a-Service ایپس](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [ایتھیریم بلاک چین ایپلی کیشنز میں ڈسٹری بیوٹڈ اسٹوریج IPFS اور Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [موبائل کلائنٹس: لائبریریاں اور Inproc ایتھیریم نوڈز](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [نیٹو dapps: ایتھیریم کانٹریکٹس کے لیے Go بائنڈنگز](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go پروجیکٹس اور ٹولز {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _ایتھیریم پروٹوکول کی آفیشل Go امپلیمینٹیشن_
- [Go Ethereum کوڈ کا تجزیہ](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum سورس کوڈ کا جائزہ اور تجزیہ_
- [Erigon](https://github.com/ledgerwatch/erigon) - _آرکائیو نوڈز پر توجہ کے ساتھ، Go Ethereum کا تیز تر ڈیریویٹو_
- [Golem](https://github.com/golemfactory/golem) - _Golem کمپیوٹنگ پاور کے لیے ایک عالمی مارکیٹ بنا رہا ہے_
- [Quorum](https://github.com/jpmorganchase/quorum) - _ڈیٹا پرائیویسی کو سپورٹ کرنے والی ایتھیریم کی ایک پرمیشنڈ امپلیمینٹیشن_
- [Prysm](https://github.com/prysmaticlabs/prysm) - _ایتھیریم 'Serenity' 2.0 کی Go امپلیمینٹیشن_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _ڈی سینٹرلائزڈ ٹوئٹر: ایتھیریم بلاک چین پر چلنے والی ایک مائیکرو بلاگنگ سروس_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _Minimum Viable Plasma تصریح کی Golang امپلیمینٹیشن اور ایکسٹینشن_
- [اوپن ایتھیریم مائننگ پول](https://github.com/sammy007/open-ethereum-pool) - _ایک اوپن سورس ایتھیریم مائننگ پول_
- [ایتھیریم HD والیٹ](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go میں ایتھیریم HD والیٹ ڈیریویشنز_
- [Multi Geth](https://github.com/multi-geth/multi-geth) - _ایتھیریم نیٹ ورکس کی کئی اقسام کے لیے سپورٹ_
- [Geth لائٹ کلائنٹ](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _لائٹ ایتھیریم سب پروٹوکول کی Geth امپلیمینٹیشن_
- [ایتھیریم Golang SDK](https://github.com/everFinance/goether) - _Golang میں ایک سادہ ایتھیریم والیٹ امپلیمینٹیشن اور یوٹیلیٹیز_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ بلاک چینز کے لیے Go SDK کے ذریعے موثر بلاک چین ڈیٹا تک رسائی_

مزید وسائل تلاش کر رہے ہیں؟ [ethereum.org/developers](/developers/) دیکھیں

## Go کمیونٹی کے تعاون کنندگان {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum چینل](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - ایتھیریم](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [ایتھیریم Gitter](https://gitter.im/ethereum/home)
- [Geth لائٹ کلائنٹ Gitter](https://gitter.im/ethereum/light-client)

## دیگر مجموعی فہرستیں {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: ایتھیریم ڈیولپر ٹولز کی ایک حتمی فہرست](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub سورس](https://github.com/ConsenSys/ethereum-developer-tools-list)