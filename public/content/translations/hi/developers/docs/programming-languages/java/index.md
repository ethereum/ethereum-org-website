---
title: "जावा डेवलपर्स के लिए इथिरीयम"
description: "जावा-आधारित परियोजनाओं और टूलींग का उपयोग करके एथेरियम के लिए विकास करना सीखें"
lang: hi
incomplete: true
---

<FeaturedText>जावा-आधारित प्रोजेक्ट्स और टूलिंग का उपयोग करके Ethereum के लिए डेवलप करना सीखें</FeaturedText>

विकेन्द्रीकृत अनुप्रयोगों (या "डैप्स") बनाने के लिए इथिरीयम का उपयोग करें जो क्रिप्टोक्यूरेंसी और ब्लॉकचैन तकनीक के लाभों का उपयोग करते हैं। ये डैप भरोसेमंद हो सकते हैं, जिसका अर्थ है कि एक बार इथिरीयम में तैनात होने के बाद, वे हमेशा प्रोग्राम किए गए अनुसार चलेंगे। नए प्रकार के वित्तीय अनुप्रयोग बनाने के लिए वे डिजिटल संपत्ति को नियंत्रित कर सकते हैं। उन्हें विकेंद्रीकृत किया जा सकता है, जिसका अर्थ है कि कोई एकल इकाई या व्यक्ति उन्हें नियंत्रित नहीं करता है और सेंसर के लिए लगभग असंभव है।

## स्मार्ट अनुबंधों और सॉलिडिटी भाषा के साथ आरंभ करना {#getting-started-with-smart-contracts-and-solidity}

**जावा को Ethereum के साथ इंटीग्रेट करने के लिए अपने पहले कदम उठाएं**

पहले एक और बुनियादी प्राइमर की आवश्यकता है? [ethereum.org/learn](/learn/) या [ethereum.org/developers.](/developers/) देखें।

- [ब्लॉकचेन समझाया गया](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट अनुबंधों को समझना](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [अपना पहला स्मार्ट अनुबंध लिखें](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी को कंपाइल और डिप्लॉय करना सीखें](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Ethereum क्लाइंट्स के साथ काम करना {#working-with-ethereum-clients}

[Web3J](https://github.com/web3j/web3j) और Hyperledger Besu का उपयोग करना सीखें, जो दो प्रमुख जावा Ethereum क्लाइंट्स हैं

- [जावा, Eclipse और Web3J के साथ एक Ethereum क्लाइंट से कनेक्ट करना](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [जावा और Web3j के साथ एक Ethereum खाते को मैनेज करना](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [अपने स्मार्ट कॉन्ट्रैक्ट से एक जावा रैपर जेनरेट करना](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [एक Ethereum स्मार्ट कॉन्ट्रैक्ट के साथ इंटरैक्ट करना](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Ethereum स्मार्ट कॉन्ट्रैक्ट इवेंट्स के लिए लिसन करना](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linux के साथ Besu (Pantheon), जावा Ethereum क्लाइंट का उपयोग करना](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [जावा इंटीग्रेशन टेस्ट में Hyperledger Besu (Pantheon) नोड को रन करना](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j चीट शीट](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

[ethers-kt](https://github.com/Kr1ptal/ethers-kt) का उपयोग करना सीखें, जो EVM-आधारित ब्लॉकचेन के साथ इंटरैक्ट करने के लिए एक एसिंक, उच्च-प्रदर्शन वाली कोटलिन लाइब्रेरी है। जेवीएम और एंड्रॉइड प्लेटफॉर्म को लक्षित करना।

- [ERC20 टोकन ट्रांसफर करना](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [इवेंट लिसनिंग के साथ UniswapV2 स्वैप](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC20 बैलेंस ट्रैकर](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## मध्यवर्ती लेख {#intermediate-articles}

- [IPFS के साथ एक जावा एप्लिकेशन में स्टोरेज मैनेज करना](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j के साथ जावा में ERC20 टोकन मैनेज करना](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j ट्रांजैक्शन मैनेजर्स](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## उन्नत उपयोग पैटर्न {#advanced-use-patterns}

- [जावा स्मार्ट कॉन्ट्रैक्ट डेटा कैश बनाने के लिए Eventeum का उपयोग करना](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## जावा प्रोजेक्ट्स और टूल्स {#java-projects-and-tools}

- [Web3J (Ethereum क्लाइंट्स के साथ इंटरैक्ट करने के लिए लाइब्रेरी)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-आधारित ब्लॉकचेन के लिए एसिंक, उच्च-प्रदर्शन वाली कोटलिन/जावा/एंड्रॉइड लाइब्रेरी।)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (इवेंट लिसनर)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS देव टूल्स)](https://github.com/ConsenSys/mahuta)

अधिक संसाधनों की तलाश है? [ethereum.org/developers.](/developers/) देखें।

## जावा समुदाय के योगदानकर्ता {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
