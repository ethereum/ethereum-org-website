---
title: Java डेव्हलपर्ससाठी इथेरियम
description: Java-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलपमेंट कसे करायचे ते शिका
lang: mr
incomplete: true
---

<FeaturedText>Java-आधारित प्रोजेक्ट्स आणि टूलिंग वापरून इथेरियमसाठी डेव्हलपमेंट कसे करायचे ते शिका</FeaturedText>

क्रिप्टोकरन्सी आणि ब्लॉकचेन तंत्रज्ञानाच्या फायद्यांचा वापर करणारे विकेंद्रित ॲप्लिकेशन्स (किंवा "dapps") तयार करण्यासाठी इथेरियम वापरा. हे dapps विश्वासार्ह असू शकतात, याचा अर्थ असा की एकदा ते इथेरियमवर प्रस्थापित केले की, ते नेहमी प्रोग्राम केल्याप्रमाणेच चालतील. नवीन प्रकारचे आर्थिक ॲप्लिकेशन्स तयार करण्यासाठी ते डिजिटल मालमत्ता नियंत्रित करू शकतात. ते विकेंद्रित असू शकतात, याचा अर्थ असा की कोणतीही एक संस्था किंवा व्यक्ती त्यांना नियंत्रित करत नाही आणि त्यांना सेन्सॉर करणे जवळजवळ अशक्य आहे.

## स्मार्ट कॉन्ट्रॅक्ट्स आणि Solidity भाषेशी सुरुवात करणे {#getting-started-with-smart-contracts-and-solidity}

**Java ला इथेरियमसोबत इंटिग्रेट करण्यासाठी तुमची पहिली पावले उचला**

आधी अधिक मूलभूत माहिती हवी आहे का? [ethereum.org/learn](/learn/) किंवा [ethereum.org/developers.](/developers/) तपासा.

- [ब्लॉकचेन स्पष्टीकरण](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [स्मार्ट कॉन्ट्रॅक्ट्स समजून घेणे](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [तुमचे पहिले स्मार्ट कॉन्ट्रॅक्ट लिहा](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [Solidity कंपाईल आणि प्रस्थापित कसे करायचे ते शिका](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## इथेरियम क्लायंट्ससोबत काम करणे {#working-with-ethereum-clients}

दोन प्रमुख Java इथेरियम क्लायंट्स, [Web3J](https://github.com/web3j/web3j) आणि Hyperledger बेसू कसे वापरायचे ते शिका

- [Java, Eclipse आणि Web3J वापरून इथेरियम क्लायंटशी कनेक्ट करणे](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Java आणि Web3j वापरून इथेरियम खाते व्यवस्थापित करणे](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [तुमच्या स्मार्ट कॉन्ट्रॅक्टमधून Java रॅपर (Wrapper) तयार करणे](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्टशी संवाद साधणे](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [इथेरियम स्मार्ट कॉन्ट्रॅक्ट घटना (Events) ऐकणे](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linux सोबत बेसू (Pantheon), Java इथेरियम क्लायंट वापरणे](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [Java इंटिग्रेशन टेस्ट्समध्ये Hyperledger बेसू (Pantheon) नोड चालवणे](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j चीट शीट](<https://kauri.io/web3j-cheat-sheet-(java-ethereum)/5dfa1ea941ac3d0001ce1d90/c>)

EVM-आधारित ब्लॉकचेनशी संवाद साधण्यासाठी एक असिंक (async), उच्च-कार्यक्षमता असलेली Kotlin लायब्ररी, [ethers-kt](https://github.com/Kr1ptal/ethers-kt) कशी वापरायची ते शिका. ही JVM आणि Android प्लॅटफॉर्म्सना लक्ष्य करते.
- [ERC20 टोकन्सचे हस्तांतरण](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [इव्हेंट लिसनिंगसह UniswapV2 अदलाबदल](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC20 बॅलन्स ट्रॅकर](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## मध्यवर्ती (Intermediate) लेख {#intermediate-articles}

- [IPFS सह Java ॲप्लिकेशनमध्ये स्टोरेज व्यवस्थापित करणे](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3j सह Java मध्ये ERC20 टोकन्स व्यवस्थापित करणे](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j व्यवहार व्यवस्थापक](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## प्रगत वापर पद्धती {#advanced-use-patterns}

- [Java स्मार्ट कॉन्ट्रॅक्ट डेटा कॅशे तयार करण्यासाठी Eventeum वापरणे](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## Java प्रोजेक्ट्स आणि टूल्स {#java-projects-and-tools}

- [Web3J (इथेरियम क्लायंट्सशी संवाद साधण्यासाठी लायब्ररी)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-आधारित ब्लॉकचेनसाठी असिंक, उच्च-कार्यक्षमता असलेली Kotlin/Java/Android लायब्ररी.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (इव्हेंट लिसनर)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS डेव्ह टूल्स)](https://github.com/ConsenSys/mahuta)

अधिक संसाधने शोधत आहात? [ethereum.org/developers.](/developers/) तपासा.

## Java कम्युनिटी योगदानकर्ते {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)