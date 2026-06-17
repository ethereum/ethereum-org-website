---
title: Go डेवलपर्स के लिए इथेरियम
description: Go-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें
lang: hi
incomplete: true
---

<FeaturedText>Go-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें</FeaturedText>

विकेंद्रीकृत एप्लिकेशन (dapp) बनाने के लिए इथेरियम का उपयोग करें। ये dapp भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार जब वे इथेरियम पर तैनात हो जाते हैं, तो वे हमेशा प्रोग्राम किए गए अनुसार ही चलेंगे। वे विकेंद्रीकृत हैं, जिसका अर्थ है कि वे एक पीयर-टू-पीयर नेटवर्क पर चलते हैं और विफलता का कोई एक बिंदु (single point of failure) नहीं है। कोई भी एक संस्था या व्यक्ति उन्हें नियंत्रित नहीं करता है और उन्हें सेंसर करना लगभग असंभव है। नए प्रकार के एप्लिकेशन बनाने के लिए वे डिजिटल संपत्तियों को नियंत्रित कर सकते हैं।

## स्मार्ट अनुबंध और Solidity भाषा के साथ शुरुआत करना {#getting-started-with-smart-contracts-and-solidity}

**Go को इथेरियम के साथ एकीकृत करने के लिए अपने पहले कदम उठाएं**

क्या पहले अधिक बुनियादी जानकारी की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers](/developers/) देखें।

- [ब्लॉकचेन को समझना](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity को संकलित (Compile) और तैनात करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [अनुबंध ट्यूटोरियल](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## शुरुआती लेख और किताबें {#beginner-articles-and-books}

- [Geth के साथ शुरुआत करना](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [इथेरियम से जुड़ने के लिए Golang का उपयोग करें](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang का उपयोग करके इथेरियम स्मार्ट अनुबंध तैनात करें](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go में इथेरियम स्मार्ट अनुबंधों के परीक्षण और तैनाती के लिए चरण-दर-चरण मार्गदर्शिका](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ई-बुक: Go के साथ इथेरियम विकास](https://goethereumbook.org/) - _Go के साथ इथेरियम एप्लिकेशन विकसित करें_

## मध्यवर्ती लेख और दस्तावेज़ {#intermediate-articles-and-docs}

- [गो इथेरियम दस्तावेज़ीकरण](https://geth.ethereum.org/docs) - _आधिकारिक इथेरियम Golang के लिए दस्तावेज़ीकरण_
- [एरिगोन प्रोग्रामर गाइड](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _स्थिति ट्री, मल्टी-प्रूफ और लेन-देन प्रसंस्करण सहित सचित्र मार्गदर्शिका_
- [एरिगोन और स्टेटलेस इथेरियम](https://youtu.be/3-Mn7OckSus?t=394) - _2020 इथेरियम कम्युनिटी कॉन्फ्रेंस (EthCC 3)_
- [एरिगोन: इथेरियम क्लाइंट्स को अनुकूलित करना](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [गो इथेरियम GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth के साथ Go में एक dapp बनाना](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang और Geth के साथ इथेरियम प्राइवेट नेटवर्क के साथ काम करें](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go के साथ इथेरियम पर Solidity अनुबंधों की यूनिट टेस्टिंग](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [एक लाइब्रेरी के रूप में Geth का उपयोग करने के लिए त्वरित संदर्भ](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## उन्नत उपयोग पैटर्न {#advanced-use-patterns}

- [GETH सिम्युलेटेड बैकएंड](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [इथेरियम और Quorum का उपयोग करके ब्लॉकचेन-एज़-ए-सर्विस ऐप्स](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [इथेरियम ब्लॉकचेन एप्लिकेशन में वितरित स्टोरेज IPFS और स्वार्म](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [मोबाइल क्लाइंट: लाइब्रेरी और इनप्रोक इथेरियम नोड्स](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [नेटिव dapps: इथेरियम अनुबंधों के लिए Go बाइंडिंग](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go प्रोजेक्ट्स और टूल्स {#go-projects-and-tools}

- [Geth / गो इथेरियम](https://github.com/ethereum/go-ethereum) - _इथेरियम प्रोटोकॉल का आधिकारिक Go कार्यान्वयन_
- [गो इथेरियम कोड विश्लेषण](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _गो इथेरियम स्रोत कोड की समीक्षा और विश्लेषण_
- [एरिगोन](https://github.com/ledgerwatch/erigon) - _गो इथेरियम का तेज़ व्युत्पन्न (derivative), जो आर्काइव नोड्स पर केंद्रित है_
- [Golem](https://github.com/golemfactory/golem) - _Golem कंप्यूटिंग शक्ति के लिए एक वैश्विक बाज़ार बना रहा है_
- [Quorum](https://github.com/jpmorganchase/quorum) - _डेटा गोपनीयता का समर्थन करने वाला इथेरियम का एक अनुमति-प्राप्त कार्यान्वयन_
- [प्रिज़्म](https://github.com/prysmaticlabs/prysm) - _इथेरियम 'Serenity' 2.0 Go कार्यान्वयन_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _विकेंद्रीकृत ट्विटर: इथेरियम ब्लॉकचेन पर चलने वाली एक माइक्रोब्लॉगिंग सेवा_
- [प्लाज्मा MVP Golang](https://github.com/kyokan/plasma) — _न्यूनतम व्यवहार्य प्लाज्मा (Minimum Viable Plasma) विनिर्देश का Golang कार्यान्वयन और विस्तार_
- [ओपन इथेरियम माइनिंग पूल](https://github.com/sammy007/open-ethereum-pool) - _एक ओपन सोर्स इथेरियम खनन पूल_
- [इथेरियम HD वॉलेट](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go में इथेरियम HD वॉलेट व्युत्पन्न (derivations)_
- [मल्टी Geth](https://github.com/multi-geth/multi-geth) - _इथेरियम नेटवर्क की कई प्रजातियों के लिए समर्थन_
- [Geth लाइट क्लाइंट](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _लाइट इथेरियम सबप्रोटोकॉल का Geth कार्यान्वयन_
- [इथेरियम Golang SDK](https://github.com/everFinance/goether) - _Golang में एक सरल इथेरियम वॉलेट कार्यान्वयन और उपयोगिताएँ_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ ब्लॉकचेन के लिए Go SDK के माध्यम से कुशल ब्लॉकचेन डेटा एक्सेस_

क्या आप और अधिक संसाधनों की तलाश में हैं? [ethereum.org/developers](/developers/) देखें

## Go समुदाय के योगदानकर्ता {#go-community-contributors}

- [Geth डिस्कॉर्ड](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum चैनल](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - इथेरियम](https://ethereum.stackexchange.com/)
- [मल्टी Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [इथेरियम Gitter](https://gitter.im/ethereum/home)
- [Geth लाइट क्लाइंट Gitter](https://gitter.im/ethereum/light-client)

## अन्य एकत्रित सूचियाँ {#other-aggregated-lists}

- [ऑसम इथेरियम](https://github.com/btomashvili/awesome-ethereum)
- [कॉन्सेन्सिस: इथेरियम डेवलपर टूल्स की एक निश्चित सूची](https://web.archive.org/web/2023/https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub स्रोत](https://github.com/ConsenSys/ethereum-developer-tools-list)