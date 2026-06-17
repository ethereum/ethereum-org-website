---
title: "Go डेव्हलपर्ससाठी इथेरियम"
description: "Go-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलपमेंट कसे करावे ते शिका"
lang: mr
incomplete: true
---

<FeaturedText>Go-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलपमेंट कसे करावे ते शिका</FeaturedText>

विकेंद्रित ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियम वापरा. हे dapps विश्वासार्ह असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर प्रस्थापित केले की, ते नेहमी प्रोग्राम केल्याप्रमाणेच चालतील. ते विकेंद्रित आहेत, याचा अर्थ ते पीअर-टू-पीअर नेटवर्कवर चालतात आणि त्यात बिघाडाचा कोणताही एकच बिंदू नसतो. कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि त्यांना सेन्सॉर करणे जवळजवळ अशक्य आहे. नवीन प्रकारचे ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि Solidity भाषेशी सुरुवात करणे {#getting-started-with-smart-contracts-and-solidity}

**Go ला इथेरियमसोबत इंटिग्रेट करण्यासाठी तुमची पहिली पावले उचला**

प्रथम अधिक मूलभूत माहिती हवी आहे का? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers](/developers/) तपासा.

- [ब्लॉकचेन स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचे पहिले स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity कंपाईल आणि प्रस्थापित कसे करावे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [कॉन्ट्रॅक्ट ट्युटोरिअल](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## नवशिक्यांसाठी लेख आणि पुस्तके {#beginner-articles-and-books}

- [गेथ (Geth) सोबत सुरुवात करणे](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [इथेरियमशी कनेक्ट करण्यासाठी Golang वापरा](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang वापरून इथेरियम स्मार्ट कॉन्ट्रॅक्ट्स प्रस्थापित करा](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go मध्ये इथेरियम स्मार्ट कॉन्ट्रॅक्ट्सची चाचणी आणि प्रस्थापित करण्यासाठी टप्प्याटप्प्याने मार्गदर्शक](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ई-बुक: Go सह इथेरियम डेव्हलपमेंट](https://goethereumbook.org/) - _Go सह इथेरियम ॲप्लिकेशन्स विकसित करा_

## मध्यवर्ती लेख आणि दस्तऐवज {#intermediate-articles-and-docs}

- [गो इथेरियम दस्तऐवजीकरण](https://geth.ethereum.org/docs) - _अधिकृत इथेरियम Golang साठी दस्तऐवजीकरण_
- [एरिगॉन प्रोग्रामरचे मार्गदर्शक](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _स्थिती ट्री (state tree), मल्टी-प्रूफ्स आणि व्यवहार प्रक्रियेसह सचित्र मार्गदर्शक_
- [एरिगॉन आणि स्टेटलेस इथेरियम](https://youtu.be/3-Mn7OckSus?t=394) - _2020 इथेरियम कम्युनिटी कॉन्फरन्स (EthCC 3)_
- [एरिगॉन: इथेरियम क्लायंट्स ऑप्टिमाइझ करणे](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [गो इथेरियम GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [गेथ (Geth) सह Go मध्ये dapp तयार करणे](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang आणि गेथ (Geth) सह इथेरियम प्रायव्हेट नेटवर्कवर काम करा](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go सह इथेरियमवर Solidity कॉन्ट्रॅक्ट्सचे युनिट टेस्टिंग](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [गेथ (Geth) ला लायब्ररी म्हणून वापरण्यासाठी त्वरित संदर्भ](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## प्रगत वापर पद्धती {#advanced-use-patterns}

- [गेथ (GETH) सिम्युलेटेड बॅकएंड](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [इथेरियम आणि Quorum वापरून ब्लॉकचेन-ॲज-अ-सर्व्हिस ॲप्स](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [इथेरियम ब्लॉकचेन ॲप्लिकेशन्समध्ये डिस्ट्रिब्युटेड स्टोरेज IPFS आणि स्वॉर्म](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [मोबाईल क्लायंट्स: लायब्ररीज आणि इनप्रोक इथेरियम नोड्स](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [नेटिव्ह dapps: इथेरियम कॉन्ट्रॅक्ट्ससाठी Go बाइंडिंग्ज](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go प्रोजेक्ट्स आणि टूल्स {#go-projects-and-tools}

- [गेथ / गो इथेरियम](https://github.com/ethereum/go-ethereum) - _इथेरियम प्रोटोकॉलची अधिकृत Go अंमलबजावणी_
- [गो इथेरियम कोड विश्लेषण](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _गो इथेरियम सोर्स कोडचे पुनरावलोकन आणि विश्लेषण_
- [एरिगॉन](https://github.com/ledgerwatch/erigon) - _गो इथेरियमची वेगवान आवृत्ती, ज्याचा मुख्य भर आर्काइव्ह नोड्सवर आहे_
- [Golem](https://github.com/golemfactory/golem) - _Golem संगणकीय शक्तीसाठी जागतिक बाजारपेठ तयार करत आहे_
- [Quorum](https://github.com/jpmorganchase/quorum) - _डेटा गोपनीयतेला समर्थन देणारी इथेरियमची परवानगीयुक्त अंमलबजावणी_
- [प्रिझम](https://github.com/prysmaticlabs/prysm) - _इथेरियम 'Serenity' 2.0 Go अंमलबजावणी_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _विकेंद्रित ट्विटर्: इथेरियम ब्लॉकचेनवर चालणारी मायक्रोब्लॉगिंग सेवा_
- [प्लाझ्मा MVP Golang](https://github.com/kyokan/plasma) — _मिनिमम व्हायबल प्लाझ्मा स्पेसिफिकेशनची Golang अंमलबजावणी आणि विस्तार_
- [ओपन इथेरियम मायनिंग पूल](https://github.com/sammy007/open-ethereum-pool) - _एक ओपन सोर्स इथेरियम खनन पूल_
- [इथेरियम HD वॉलेट](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go मध्ये इथेरियम HD वॉलेट डेरिव्हेशन्स_
- [मल्टी गेथ](https://github.com/multi-geth/multi-geth) - _इथेरियम नेटवर्कच्या अनेक प्रकारांसाठी समर्थन_
- [गेथ लाइट क्लायंट](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _लाइट इथेरियम सबप्रोटोकॉलची गेथ अंमलबजावणी_
- [इथेरियम Golang SDK](https://github.com/everFinance/goether) - _Golang मध्ये एक साधी इथेरियम वॉलेट अंमलबजावणी आणि युटिलिटीज_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ ब्लॉकचेनसाठी Go SDK द्वारे कार्यक्षम ब्लॉकचेन डेटा ॲक्सेस_

अधिक संसाधने शोधत आहात? [ethereum.org/developers](/developers/) तपासा

## Go कम्युनिटी योगदानकर्ते {#go-community-contributors}

- [गेथ डिस्कॉर्ड्](https://discordapp.com/invite/nthXNEv)
- [गेथ Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum चॅनेल](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - इथेरियम](https://ethereum.stackexchange.com/)
- [मल्टी गेथ Gitter](https://gitter.im/ethoxy/multi-geth)
- [इथेरियम Gitter](https://gitter.im/ethereum/home)
- [गेथ लाइट क्लायंट Gitter](https://gitter.im/ethereum/light-client)

## इतर एकत्रित याद्या {#other-aggregated-lists}

- [ऑसम इथेरियम](https://github.com/btomashvili/awesome-ethereum)
- [कॉन्सेन्सिस्: इथेरियम डेव्हलपर टूल्सची निश्चित यादी](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub सोर्स](https://github.com/ConsenSys/ethereum-developer-tools-list)