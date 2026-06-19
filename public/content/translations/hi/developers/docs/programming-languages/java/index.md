---
title: Java डेवलपर्स के लिए इथेरियम
description: Java-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें
lang: hi
incomplete: true
---

<FeaturedText>Java-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके इथेरियम के लिए विकास करना सीखें</FeaturedText>

क्रिप्टोकरेंसी और ब्लॉकचेन तकनीक के लाभों का उपयोग करने वाले विकेंद्रीकृत एप्लिकेशन (dapp) बनाने के लिए इथेरियम का उपयोग करें। ये dapp भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार जब वे इथेरियम पर तैनात हो जाते हैं, तो वे हमेशा प्रोग्राम किए गए अनुसार ही चलेंगे। वे नए प्रकार के वित्तीय एप्लिकेशन बनाने के लिए डिजिटल संपत्तियों को नियंत्रित कर सकते हैं। वे विकेंद्रीकृत हो सकते हैं, जिसका अर्थ है कि कोई भी एकल संस्था या व्यक्ति उन्हें नियंत्रित नहीं करता है और उन्हें सेंसर करना लगभग असंभव है।

## स्मार्ट अनुबंध और Solidity भाषा के साथ शुरुआत करना {#getting-started-with-smart-contracts-and-solidity}

**Java को इथेरियम के साथ एकीकृत करने के लिए अपने पहले कदम उठाएं**

क्या पहले अधिक बुनियादी जानकारी की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers.](/developers/) देखें।

- [ब्लॉकचेन को समझना](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity को संकलित और तैनात करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## इथेरियम क्लाइंट्स के साथ काम करना {#working-with-ethereum-clients}

जानें कि [Web3j](https://github.com/web3j/web3j) और Hyperledger बेसु का उपयोग कैसे करें, जो दो प्रमुख Java इथेरियम क्लाइंट हैं

- [Java, Eclipse और Web3j के साथ इथेरियम क्लाइंट से जुड़ना](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Java और Web3j के साथ इथेरियम खाता प्रबंधित करें](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [अपने स्मार्ट अनुबंध से Java रैपर जनरेट करें](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [इथेरियम स्मार्ट अनुबंध के साथ इंटरैक्ट करना](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [इथेरियम स्मार्ट अनुबंध की घटनाएँ सुनना](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linux के साथ Java इथेरियम क्लाइंट, बेसु (Pantheon) का उपयोग करना](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java इंटीग्रेशन टेस्ट में Hyperledger बेसु (Pantheon) नोड चलाना](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j चीट शीट](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

जानें कि [ethers-kt](https://github.com/Kr1ptal/ethers-kt) का उपयोग कैसे करें, जो EVM-आधारित ब्लॉकचेन के साथ इंटरैक्ट करने के लिए एक एसिंक, उच्च-प्रदर्शन वाली Kotlin लाइब्रेरी है। यह JVM और Android प्लेटफॉर्म को लक्षित करती है।
- [ERC-20 टोकन ट्रांसफर करें](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [घटनाएँ सुनने के साथ UniswapV2 स्वैप](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC-20 बैलेंस ट्रैकर](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## मध्यवर्ती लेख {#intermediate-articles}

- [IPFS के साथ Java एप्लिकेशन में स्टोरेज प्रबंधित करना](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j के साथ Java में ERC-20 टोकन प्रबंधित करें](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j लेन-देन प्रबंधक](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## उन्नत उपयोग पैटर्न {#advanced-use-patterns}

- [Java स्मार्ट अनुबंध डेटा कैश बनाने के लिए Eventeum का उपयोग करना](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java प्रोजेक्ट्स और टूल्स {#java-projects-and-tools}

- [Web3j (इथेरियम क्लाइंट्स के साथ इंटरैक्ट करने के लिए लाइब्रेरी)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-आधारित ब्लॉकचेन के लिए एसिंक, उच्च-प्रदर्शन वाली Kotlin/Java/Android लाइब्रेरी।)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (इवेंट लिसनर)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS डेव टूल्स)](https://github.com/ConsenSys/mahuta)

क्या और संसाधनों की तलाश है? [ethereum.org/developers.](/developers/) देखें।

## Java समुदाय के योगदानकर्ता {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)