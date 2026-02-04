---
title: जावा डेव्हलपर्ससाठी इथेरियम
description: जावा-आधारित प्रकल्प आणि टूलिंग वापरून इथेरियमसाठी कसे डेव्हलप करावे हे शिका
lang: mr
incomplete: true
---

<FeaturedText>जावा-आधारित प्रकल्प आणि टूलिंग वापरून इथेरियमसाठी कसे डेव्हलप करावे हे शिका</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा उपयोग करणाऱ्या विकेंद्रीकृत ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियम वापरा. हे dapps विश्वासार्ह असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर तैनात केले की, ते नेहमी प्रोग्राम केल्याप्रमाणे चालतील. नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि सेन्सॉर करणे जवळजवळ अशक्य आहे.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि सॉलिडिटी भाषेसह प्रारंभ करणे {#getting-started-with-smart-contracts-and-solidity}

**जावाला इथेरियमसोबत एकत्रित करण्यासाठी तुमची पहिली पावले उचला**

प्रथम अधिक मूलभूत प्राइमरची आवश्यकता आहे? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers.](/developers/) पहा

- [ब्लॉकचेन स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [सॉलिडिटी कसे संकलित आणि तैनात करायचे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## इथेरियम क्लायंट्ससोबत काम करणे {#working-with-ethereum-clients}

दोन अग्रगण्य जावा इथेरियम क्लायंट, [Web3J](https://github.com/web3j/web3j) आणि हायपरलेजर बेसू कसे वापरावे हे शिका

- [जावा, इक्लिप्स आणि Web3J सह इथेरियम क्लायंटशी कनेक्ट करणे](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [जावा आणि Web3j सह इथेरियम खाते व्यवस्थापित करणे](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून जावा रॅपर तयार करणे](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्टसोबत संवाद साधणे](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्ट इव्हेंट्ससाठी ऐकणे](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [बेसू (पँथिऑन) वापरणे, लिनक्ससह जावा इथेरियम क्लायंट](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [जावा इंटिग्रेशन टेस्टमध्ये हायपरलेजर बेसू (पँथिऑन) नोड चालवणे](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j चीट शीट](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

EVM-आधारित ब्लॉकचेनशी संवाद साधण्यासाठी [ethers-kt](https://github.com/Kr1ptal/ethers-kt), एक असिंक, उच्च-कार्यक्षमता असलेली कोटलिन लायब्ररी, कशी वापरावी हे शिका. JVM आणि अँड्रॉइड प्लॅटफॉर्मला लक्ष्य करते.

- [ERC20 टोकन्स हस्तांतरित करा](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [इव्हेंट लिसनिंगसह UniswapV2 स्वॅप](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC20 बॅलन्स ट्रॅकर](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## मध्यम स्तरावरील लेख {#intermediate-articles}

- [IPFS सह जावा ऍप्लिकेशनमध्ये स्टोरेज व्यवस्थापित करणे](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j सह जावामध्ये ERC20 टोकन्स व्यवस्थापित करणे](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j ट्रान्झॅक्शन व्यवस्थापक](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## प्रगत वापर पद्धती {#advanced-use-patterns}

- [जावा स्मार्ट कॉन्ट्रॅक्ट डेटा कॅशे तयार करण्यासाठी Eventeum वापरणे](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## जावा प्रकल्प आणि साधने {#java-projects-and-tools}

- [Web3J (इथेरियम क्लायंट्सशी संवाद साधण्यासाठी लायब्ररी)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-आधारित ब्लॉकचेनसाठी असिंक, उच्च-कार्यक्षमता असलेली कोटलिन/जावा/अँड्रॉइड लायब्ररी.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (इव्हेंट लिसनर)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS डेव्ह टूल्स)](https://github.com/ConsenSys/mahuta)

अधिक संसाधने शोधत आहात? [ethereum.org/developers.](/developers/) तपासा.

## जावा समुदाय योगदानकर्ते {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
