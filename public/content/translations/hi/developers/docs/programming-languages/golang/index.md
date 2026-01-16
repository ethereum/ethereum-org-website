---
title: गो डेवलपर्स के लिए इथिरीयम
description: गो-आधारित परियोजनाओं और टूलींग का उपयोग करके एथेरियम के लिए विकसित करना सीखें
lang: hi
incomplete: true
---

<FeaturedText>Go-आधारित परियोजनाओं और टूलिंग का उपयोग करके Ethereum के लिए विकसित करना सीखें</FeaturedText>

एथेरियम का उपयोग करके विकेंद्रीकृत अनुप्रयोग (या "dapps") बनाएं। ये डैप भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार इथिरीयम में तैनात होने के बाद, वे हमेशा प्रोग्राम किए गए अनुसार चलेंगे। वे विकेंद्रीकृत होते हैं, जिसका अर्थ है कि वे पीयर-टू-पीयर नेटवर्क पर चलते हैं और इसमें किसी एकल विफलता बिंदु का जोखिम नहीं होता है। कोई एकल इकाई या व्यक्ति इन्हें नियंत्रित नहीं करता है, और इन्हें सेंसर करना लगभग असंभव है। वे डिजिटल संपत्तियों को नियंत्रित कर सकते हैं ताकि नए प्रकार के अनुप्रयोग बनाए जा सकें।

## स्मार्ट अनुबंधों और सॉलिडिटी भाषा के साथ आरंभ करना {#getting-started-with-smart-contracts-and-solidity}

**Go को Ethereum के साथ एकीकृत करने के लिए अपने पहले कदम उठाएँ**

पहले एक और बुनियादी प्राइमर की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers](/developers/) देखें।

- [ब्लॉकचेन समझाया गया](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी को कंपाइल और डिप्लॉय करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)
- [अनुबंध ट्यूटोरियल](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial)

## शुरुआती लोगों के लिए लेख और पुस्तकें {#beginner-articles-and-books}

- [Geth के साथ शुरुआत करना](https://medium.com/@tzhenghao/getting-started-with-geth-c1a30b8d6458)
- [Ethereum से कनेक्ट करने के लिए Golang का उपयोग करें](https://www.youtube.com/watch?v=-7uChuO_VzM)
- [Golang का उपयोग करके Ethereum स्मार्ट अनुबंध तैनात करें](https://www.youtube.com/watch?v=pytGqQmDslE)
- [Go में Ethereum स्मार्ट अनुबंधों का परीक्षण और परिनियोजन के लिए चरण-दर-चरण मार्गदर्शिका](https://hackernoon.com/a-step-by-step-guide-to-testing-and-deploying-ethereum-smart-contracts-in-go-9fc34b178d78)
- [ई-पुस्तक: Go के साथ Ethereum का विकास](https://goethereumbook.org/) - _Go के साथ Ethereum अनुप्रयोग विकसित करें_

## मध्यवर्ती लेख और दस्तावेज़ {#intermediate-articles-and-docs}

- [Go Ethereum प्रलेखन](https://geth.ethereum.org/docs/) - _आधिकारिक Ethereum Golang के लिए प्रलेखन_
- [Erigon प्रोग्रामर की मार्गदर्शिका](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/guide.md) - _स्टेट ट्री, मल्टी-प्रूफ़ और लेनदेन प्रसंस्करण सहित सचित्र मार्गदर्शिका_
- [Erigon और स्टेटलेस Ethereum](https://youtu.be/3-Mn7OckSus?t=394) - _2020 Ethereum सामुदायिक सम्मेलन (EthCC 3)_
- [Erigon: Ethereum क्लाइंट को अनुकूलित करना](https://www.youtube.com/watch?v=CSpc1vZQW2Q) - _2018 Devcon 4_
- [Go Ethereum GoDoc](https://godoc.org/github.com/ethereum/go-ethereum)
- [Geth के साथ Go में एक डैप बनाना](https://kauri.io/#collections/A%20Hackathon%20Survival%20Guide/creating-a-dapp-in-go-with-geth/)
- [Golang और Geth के साथ Ethereum निजी नेटवर्क के साथ काम करें](https://myhsts.org/tutorial-learn-how-to-work-with-ethereum-private-network-with-golang-with-geth.php)
- [Go के साथ Ethereum पर Solidity अनुबंधों का यूनिट परीक्षण](https://medium.com/coinmonks/unit-testing-solidity-contracts-on-ethereum-with-go-3cc924091281)
- [Geth को लाइब्रेरी के रूप में उपयोग करने के लिए त्वरित संदर्भ](https://medium.com/coinmonks/web3-go-part-1-31c68c68e20e)

## उन्नत उपयोग पैटर्न {#advanced-use-patterns}

- [GETH सिम्युलेटेड बैकएंड](https://kauri.io/#collections/An%20ethereum%20test%20toolkit%20in%20Go/the-geth-simulated-backend/#_top)
- [Ethereum और Quorum का उपयोग करके ब्लॉकचेन-एज़-अ-सर्विस ऐप्स](https://blockchain.dcwebmakers.com/blockchain-as-a-service-apps-using-ethereum-and-quorum.html)
- [Ethereum ब्लॉकचेन अनुप्रयोगों में वितरित भंडारण IPFS और Swarm](https://blockchain.dcwebmakers.com/work-with-distributed-storage-ipfs-and-swarm-in-ethereum.html)
- [मोबाइल क्लाइंट: लाइब्रेरी और इनप्रोक Ethereum नोड्स](https://github.com/ethereum/go-ethereum/wiki/Mobile-Clients:-Libraries-and-Inproc-Ethereum-Nodes)
- [देशी डैप्स: Ethereum अनुबंधों के लिए Go बाइंडिंग](https://github.com/ethereum/go-ethereum/wiki/Native-DApps:-Go-bindings-to-Ethereum-contracts)

## Go परियोजनाएं और उपकरण {#go-projects-and-tools}

- [Geth / Go Ethereum](https://github.com/ethereum/go-ethereum) - _Ethereum प्रोटोकॉल का आधिकारिक Go कार्यान्वयन_
- [Go Ethereum कोड विश्लेषण](https://github.com/ZtesoftCS/go-ethereum-code-analysis) - _Go Ethereum स्रोत कोड की समीक्षा और विश्लेषण_
- [Erigon](https://github.com/ledgerwatch/erigon) - _Go Ethereum का तेज़ व्युत्पन्न, जो संग्रह नोड्स पर केंद्रित है_
- [Golem](https://github.com/golemfactory/golem) - _Golem कंप्यूटिंग शक्ति के लिए एक वैश्विक बाज़ार बना रहा है_
- [Quorum](https://github.com/jpmorganchase/quorum) - _डेटा गोपनीयता का समर्थन करने वाला Ethereum का एक अनुमति प्राप्त कार्यान्वयन_
- [प्रिज़्म](https://github.com/prysmaticlabs/prysm) - _Ethereum 'सेरेनिटी' 2.0 Go कार्यान्वयन_
- [Eth Tweet](https://github.com/yep/eth-tweet) - _विकेंद्रीकृत ट्विटर: Ethereum ब्लॉकचेन पर चलने वाली एक माइक्रोब्लॉगिंग सेवा_
- [Plasma MVP Golang](https://github.com/kyokan/plasma) — _न्यूनतम व्यवहार्य प्लाज्मा विनिर्देश का Golang कार्यान्वयन और विस्तार_
- [ओपन Ethereum माइनिंग पूल](https://github.com/sammy007/open-ethereum-pool) - _एक ओपन सोर्स Ethereum माइनिंग पूल_
- [Ethereum HD वॉलेट](https://github.com/miguelmota/go-ethereum-hdwallet) - _Go में Ethereum HD वॉलेट व्युत्पत्तियाँ_
- [मल्टी Geth](https://github.com/multi-geth/multi-geth) - _कई प्रकार के Ethereum नेटवर्क के लिए समर्थन_
- [Geth लाइट क्लाइंट](https://github.com/zsfelfoldi/go-ethereum/wiki/Geth-Light-Client) - _लाइट Ethereum सबप्रोटोकॉल का Geth कार्यान्वयन_
- [Ethereum Golang SDK](https://github.com/everFinance/goether) - _Golang में एक सरल Ethereum वॉलेट कार्यान्वयन और यूटिलिटीज_
- [Covalent Golang SDK](https://github.com/covalenthq/covalent-api-sdk-go) - _200+ ब्लॉकचेन के लिए Go SDK के माध्यम से कुशल ब्लॉकचेन डेटा एक्सेस_

अधिक संसाधनों की तलाश है? [ethereum.org/developers](/developers/) देखें

## Go समुदाय के योगदानकर्ता {#go-community-contributors}

- [Geth Discord](https://discordapp.com/invite/nthXNEv)
- [Geth Gist](https://gitter.im/ethereum/go-ethereum)
- [Gophers Slack](https://invite.slack.golangbridge.org/) - [#ethereum चैनल](https://gophers.slack.com/messages/C9HP1S9V2)
- [StackExchange - Ethereum](https://ethereum.stackexchange.com/)
- [Multi Geth Gitter](https://gitter.im/ethoxy/multi-geth)
- [Ethereum Gitter](https://gitter.im/ethereum/home)
- [Geth लाइट क्लाइंट Gitter](https://gitter.im/ethereum/light-client)

## अन्य एकत्रित सूचियाँ {#other-aggregated-lists}

- [Awesome Ethereum](https://github.com/btomashvili/awesome-ethereum)
- [Consensys: Ethereum डेवलपर उपकरणों की एक निश्चित सूची](https://media.consensys.net/an-definitive-list-of-ethereum-developer-tools-2159ce865974) | [GitHub स्रोत](https://github.com/ConsenSys/ethereum-developer-tools-list)
