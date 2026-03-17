---
title: "జావా డెవలపర్‌ల కోసం Ethereum"
description: "జావాస్క్రిప్ట్ ప్రాజెక్ట్స్ మరియు టూల్స్ తో ఈతెరియంను ఎలా నిర్మించాలో నేర్చుకోండి"
lang: te
incomplete: true
---

<FeaturedText>జావా-ఆధారిత ప్రాజెక్ట్‌లు మరియు టూలింగ్‌ను ఉపయోగించి Ethereum కోసం ఎలా అభివృద్ధి చేయాలో తెలుసుకోండి</FeaturedText>

క్రిప్ట్టో కరెన్సీ మరియు బ్లాక్చైన్ టెక్నాలజీని వాడే వికేంద్రీకృత అప్లికేషన్స్ ( లేదా "డేప్స్") కి ఈతేరియంని ఉపయోగించండి. ఈ డ్డాప్స్ అప్లికేషన్స్ విశ్వసనీయమైనవి, దాని అర్థం వాటిని ఒకసారి ఏతీరియంకి డెప్లోయ్ చేసాక ఎప్పటికి ప్రోగ్రాం చేసిన విధంగానే పని చేస్తాయి. కొత్త తరహా ఫైనాన్సియల్ అప్లికేషన్స్ ని రూపొందించడానికి ఈ డ్డాప్స్ డిజిటల్ ఆస్తులను నియత్రించగలవు. ఇవి వికేంద్రీకృతమైనవి, దాని అర్థం వీటిని ఏ ఒక్క తత్వమో లేదా మనిషి నియత్రించలేవు మరియు సెన్సార్ చేయడం అసాధ్యం.

## స్మార్ట్ కాంట్రాక్టులు మరియు సాలిడిటీ భాషతో ప్రారంభించడం {#getting-started-with-smart-contracts-and-solidity}

**Ethereumతో Javaను అనుసంధానించడానికి మీ మొదటి అడుగులు వేయండి**

ఇంకా స్పష్టమైన వివరాలు కావాలి? [ethereum.org/learn](/learn/) లేదా [ethereum.org/developers.](/developers/)ని తనిఖీ చేయండి.

- [బ్లాక్ చైను వివరణ](https://kauri.io/article/d55684513211466da7f8cc03987607d5/blockchain-explained)
- [స్మార్ట్ కాంట్రాక్టులను అర్థం చేసుకోవడం](https://kauri.io/article/e4f66c6079e74a4a9b532148d3158188/ethereum-101-part-5-the-smart-contract)
- [మీ మొదటి స్మార్ట్ కాంట్రాక్టును వ్రాయండి](https://kauri.io/article/124b7db1d0cf4f47b414f8b13c9d66e2/remix-ide-your-first-smart-contract)
- [సాలిడిటీని కంపైల్ చేయడం మరియు డిప్లాయ్ చేయడం ఎలాగో తెలుసుకోండి](https://kauri.io/article/973c5f54c4434bb1b0160cff8c695369/understanding-smart-contract-compilation-and-deployment)

## Ethereum క్లయింట్‌లతో పనిచేయడం {#working-with-ethereum-clients}

రెండు ప్రముఖ జావా Ethereum క్లయింట్లు అయిన [Web3J](https://github.com/web3j/web3j) మరియు Hyperledger Besuను ఎలా ఉపయోగించాలో తెలుసుకోండి

- [Java, Eclipse మరియు Web3Jతో Ethereum క్లయింట్‌కు కనెక్ట్ అవ్వడం](https://kauri.io/article/b9eb647c47a546bc95693acc0be72546/connecting-to-an-ethereum-client-with-java-eclipse-and-web3j)
- [Java మరియు Web3jతో Ethereum ఖాతాను నిర్వహించడం](https://kauri.io/article/925d923e12c543da9a0a3e617be963b4/manage-an-ethereum-account-with-java-and-web3j)
- [మీ స్మార్ట్ కాంట్రాక్ట్ నుండి జావా వ్రాపర్‌ను రూపొందించడం](https://kauri.io/article/84475132317d4d6a84a2c42eb9348e4b/generate-a-java-wrapper-from-your-smart-contract)
- [ఒక Ethereum స్మార్ట్ కాంట్రాక్ట్‌తో పరస్పర చర్య చేయడం](https://kauri.io/article/14dc434d11ef4ee18bf7d57f079e246e/interacting-with-an-ethereum-smart-contract-in-java)
- [Ethereum స్మార్ట్ కాంట్రాక్ట్ ఈవెంట్‌ల కోసం వినడం](https://kauri.io/article/760f495423db42f988d17b8c145b0874/listening-for-ethereum-smart-contract-events-in-java)
- [Linuxతో జావా Ethereum క్లయింట్ అయిన Besu (Pantheon)ను ఉపయోగించడం](https://kauri.io/article/276dd27f1458443295eea58403fd6965/using-pantheon-the-java-ethereum-client-with-linux)
- [జావా ఇంటిగ్రేషన్ పరీక్షలలో Hyperledger Besu (Pantheon) నోడ్‌ను నడపడం](https://kauri.io/article/7dc3ecc391e54f7b8cbf4e5fa0caf780/running-a-pantheon-node-in-java-integration-tests)
- [Web3j చీట్ షీట్](https://kauri.io/web3j-cheat-sheet-\(java-ethereum\)/5dfa1ea941ac3d0001ce1d90/c)

EVM-ఆధారిత బ్లాక్‌చెయిన్‌లతో పరస్పర చర్య చేయడానికి [ethers-kt](https://github.com/Kr1ptal/ethers-kt) అనే అసింక్, అధిక-పనితీరు గల Kotlin లైబ్రరీని ఎలా ఉపయోగించాలో తెలుసుకోండి. JVM మరియు ఆండ్రాయిడ్ ప్లాట్‌ఫారమ్‌లను లక్ష్యంగా చేసుకోవడం.

- [ERC20 టోకెన్‌లను బదిలీ చేయడం](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/abi/TransferERC20.kt)
- [ఈవెంట్ లిజనింగ్‌తో UniswapV2 స్వాప్](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/tokenswapwitheventlistening/TokenSwapWithEventListening.kt)
- [ETH / ERC20 బ్యాలెన్స్ ట్రాకర్](https://github.com/Kr1ptal/ethers-kt/blob/master/examples/src/main/kotlin/io/ethers/examples/balancetracker/BalanceTracker.kt)

## మధ్యస్థ వ్యాసాలు {#intermediate-articles}

- [IPFSతో జావా అప్లికేషన్‌లో నిల్వను నిర్వహించడం](https://kauri.io/article/3e8494f4f56f48c4bb77f1f925c6d926/managing-storage-in-a-java-application-with-ipfs)
- [Web3jతో జావాలో ERC20 టోకెన్‌లను నిర్వహించడం](https://kauri.io/article/d13e911bbf624108b1d5718175a5e0a0/manage-erc20-tokens-in-java-with-web3j)
- [Web3j లావాదేవీ నిర్వాహకులు](https://kauri.io/article/4cb780bb4d0846438d11885a25b6d7e7/web3j-transaction-managers)

## అధునాతన వినియోగ నమూనాలు {#advanced-use-patterns}

- [జావా స్మార్ట్ కాంట్రాక్ట్ డేటా కాష్‌ను నిర్మించడానికి Eventeumను ఉపయోగించడం](https://kauri.io/article/fe81ee9612eb4e5a9ab72790ef24283d/using-eventeum-to-build-a-java-smart-contract-data-cache)

## జావా ప్రాజెక్ట్‌లు మరియు ఉపకరణాలు {#java-projects-and-tools}

- [Web3J (Ethereum క్లయింట్‌లతో పరస్పర చర్య కోసం లైబ్రరీ)](https://github.com/web3j/web3j)
- [ethers-kt (EVM-ఆధారిత బ్లాక్‌చెయిన్‌ల కోసం అసింక్, అధిక-పనితీరు గల Kotlin/Java/Android లైబ్రరీ.)](https://github.com/Kr1ptal/ethers-kt)
- [Eventeum (ఈవెంట్ లిజనర్)](https://github.com/ConsenSys/eventeum)
- [Mahuta (IPFS దేవ్ ఉపకరణాలు)](https://github.com/ConsenSys/mahuta)

ఇంకొన్ని వనరులు (రిసోర్సెస్) కావాలా? [ethereum.org/developers.](/developers/) చూడండి

## జావా కమ్యూనిటీ సహాయకులు {#java-community-contributors}

- [IO Builders](https://io.builders)
- [Kauri](https://kauri.io)
