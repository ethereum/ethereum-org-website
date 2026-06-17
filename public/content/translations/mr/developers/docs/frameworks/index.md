---
title: Dapp विकास फ्रेमवर्क्स
description: फ्रेमवर्क्सचे फायदे एक्सप्लोर करा आणि उपलब्ध पर्यायांची तुलना करा.
lang: mr
---

## फ्रेमवर्क्सची ओळख {#introduction-to-frameworks}

एक परिपूर्ण विकेंद्रित ॲप्लिकेशन (dapp) तयार करण्यासाठी विविध तंत्रज्ञानांची आवश्यकता असते. सॉफ्टवेअर फ्रेमवर्क्समध्ये अनेक आवश्यक वैशिष्ट्ये समाविष्ट असतात किंवा तुम्हाला हवी असलेली साधने निवडण्यासाठी सोपी प्लगइन सिस्टीम प्रदान करतात.

फ्रेमवर्क्स अनेक अंगभूत (out-of-the-box) कार्यक्षमतेसह येतात, जसे की:

- स्थानिक ब्लॉकचेन इन्स्टन्स सुरू करण्यासाठी वैशिष्ट्ये.
- तुमचे स्मार्ट कॉन्ट्रॅक्ट्स संकलित (compile) आणि तपासण्यासाठी (test) उपयुक्तता (utilities).
- एकाच प्रोजेक्ट/रिपॉझिटरीमध्ये तुमचे युझर-फेसिंग ॲप्लिकेशन तयार करण्यासाठी क्लायंट डेव्हलपमेंट ॲड-ऑन्स.
- इथेरियम नेटवर्क्सशी कनेक्ट करण्यासाठी आणि कॉन्ट्रॅक्ट्स प्रस्थापित करण्यासाठी कॉन्फिगरेशन, मग ते स्थानिक पातळीवर चालणारे इन्स्टन्स असो किंवा इथेरियमच्या सार्वजनिक नेटवर्क्सपैकी एक असो.
- विकेंद्रित ॲप वितरण - IPFS सारख्या स्टोरेज पर्यायांसह एकत्रीकरण (integrations).

## पूर्व शर्ती {#prerequisites}

फ्रेमवर्क्समध्ये जाण्यापूर्वी, आम्ही शिफारस करतो की तुम्ही प्रथम आमची [dapps](/developers/docs/dapps/) आणि [इथेरियम स्टॅक](/developers/docs/ethereum-stack/) ची ओळख वाचावी.

## उपलब्ध फ्रेमवर्क्स {#available-frameworks}

**Foundry** - **_Foundry हे इथेरियम ॲप्लिकेशन डेव्हलपमेंटसाठी अत्यंत वेगवान, पोर्टेबल आणि मॉड्युलर टूलकिट आहे_**

- [Foundry इन्स्टॉल करा](https://book.getfoundry.sh/)
- [Foundry पुस्तक](https://book.getfoundry.sh/)
- [टेलिग्राम् वर Foundry कम्युनिटी चॅट](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_व्यावसायिकांसाठी इथेरियम डेव्हलपमेंट वातावरण._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Python वापरकर्ते, डेटा सायंटिस्ट्स आणि सुरक्षा व्यावसायिकांसाठी स्मार्ट कॉन्ट्रॅक्ट डेव्हलपमेंट टूल._**

- [डॉक्युमेंटेशन](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM वर ब्लॉकचेन ॲप्लिकेशन्स विकसित करण्यासाठी एक प्लॅटफॉर्म._**

- [होमपेज](https://www.web3labs.com/web3j-sdk)
- [डॉक्युमेंटेशन](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-आधारित ब्लॉकचेनसाठी असिंक (Async), उच्च-कार्यक्षमता असलेली Kotlin/Java/Android लायब्ररी._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरणे](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [डिस्कॉर्ड्](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_एका कमांडने इथेरियम-सक्षम ॲप्स तयार करा. निवडण्यासाठी UI फ्रेमवर्क्स आणि विकेंद्रित वित्त (DeFi) टेम्पलेट्सच्या विस्तृत ऑफरसह येते._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [टेम्पलेट्स](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Web3 साठी Ethers.js + Hardhat + React कंपोनंट्स आणि हुक्स: स्मार्ट कॉन्ट्रॅक्ट्सद्वारे समर्थित विकेंद्रित ॲप्लिकेशन्स तयार करण्यास सुरुवात करण्यासाठी तुम्हाला आवश्यक असलेले सर्व काही._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 डेव्हलपमेंट प्लॅटफॉर्म जे ब्लॉकचेन डेव्हलपर्सना स्मार्ट कॉन्ट्रॅक्ट्स तयार करण्यास, तपासण्यास, डीबग करण्यास, मॉनिटर करण्यास आणि ऑपरेट करण्यास तसेच dapp UX सुधारण्यास सक्षम करते._**

- [वेबसाइट](https://tenderly.co/)
- [डॉक्युमेंटेशन](https://docs.tenderly.co/)

**The Graph -** **_ब्लॉकचेन डेटा कार्यक्षमतेने क्वेरी करण्यासाठी The Graph._**

- [वेबसाइट](https://thegraph.com/)
- [ट्युटोरिअल](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_इथेरियम डेव्हलपमेंट प्लॅटफॉर्म._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [डिस्कॉर्ड्](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_इथेरियम डेव्हलपमेंट प्लॅटफॉर्म._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [डिस्कॉर्ड्](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_आमच्या शक्तिशाली SDKs आणि CLI चा वापर करून तुमच्या स्मार्ट कॉन्ट्रॅक्ट्सशी संवाद साधू शकणारे Web3 ॲप्लिकेशन्स तयार करा._**

- [डॉक्युमेंटेशन](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (इथेरियम आणि इतर) डेव्हलपमेंट प्लॅटफॉर्म._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [डिस्कॉर्ड्](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_एंटरप्राइझ-ग्रेड Web3 डेव्हलपमेंट प्लॅटफॉर्म, जे तुम्हाला सर्व प्रमुख चेन्स EVM चेन्स (आणि इतर) वर NFT ॲप्लिकेशन्स तयार करण्याची अनुमती देते._**

- [वेबसाइट](https://www.crossmint.com)
- [डॉक्युमेंटेशन](https://docs.crossmint.com)
- [डिस्कॉर्ड्](https://discord.com/invite/crossmint)

**Brownie -** **_Python-आधारित डेव्हलपमेंट वातावरण आणि टेस्टिंग फ्रेमवर्क._**

- [डॉक्युमेंटेशन](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie सध्या अनमेंटेन्ड (unmaintained) आहे**

**ओपनझेपलिन SDK -** **_अल्टीमेट स्मार्ट कॉन्ट्रॅक्ट टूलकिट: स्मार्ट कॉन्ट्रॅक्ट्स विकसित करण्यासाठी, संकलित करण्यासाठी, अपग्रेड करण्यासाठी, प्रस्थापित करण्यासाठी आणि त्यांच्याशी संवाद साधण्यासाठी मदत करणारी टूल्सची एक सूट._**

- [ओपनझेपलिन Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [कम्युनिटी फोरम](https://forum.openzeppelin.com/c/support/17)
- **ओपनझेपलिन SDK चा विकास थांबला आहे**

**Catapulta -** **_मल्टी-चेन स्मार्ट कॉन्ट्रॅक्ट्स प्रस्थापना टूल, ब्लॉक एक्सप्लोरर्समध्ये पडताळणी स्वयंचलित करते, प्रस्थापित केलेल्या स्मार्ट कॉन्ट्रॅक्ट्सचा मागोवा ठेवते आणि प्रस्थापना अहवाल शेअर करते, Foundry आणि Hardhat प्रोजेक्ट्ससाठी प्लग-अँड-प्ले._**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (Covalent द्वारे समर्थित) -** **_GoldRush डेव्हलपर्स, विश्लेषक आणि एंटरप्रायझेससाठी सर्वात व्यापक ब्लॉकचेन डेटा API सूट ऑफर करते. तुम्ही विकेंद्रित वित्त (DeFi) डॅशबोर्ड, वॉलेट, ट्रेडिंग बॉट, एआय एजंट किंवा कंप्लायन्स प्लॅटफॉर्म तयार करत असलात तरीही, डेटा APIs तुम्हाला आवश्यक असलेल्या आवश्यक ऑनचेन डेटासाठी जलद, अचूक आणि डेव्हलपर-अनुकूल ॲक्सेस प्रदान करतात_**

- [वेबसाइट](https://goldrush.dev/)
- [डॉक्युमेंटेशन](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [डिस्कॉर्ड्](https://www.covalenthq.com/discord/)

**Wake -** **_कॉन्ट्रॅक्ट्स टेस्टिंग, फझिंग, प्रस्थापना, असुरक्षितता स्कॅनिंग आणि कोड नेव्हिगेशनसाठी ऑल-इन-वन Python फ्रेमवर्क._**

- [होमपेज](https://getwake.io/)
- [डॉक्युमेंटेशन](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code एक्स्टेंशन](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_ओपन सोर्स, मॉड्युलर आणि अज्ञेयवादी (agnostic) फ्रेमवर्क जे विकेंद्रित ॲप्लिकेशन डेव्हलपर्सना त्यांच्या ॲप्लिकेशन्समध्ये विकेंद्रित ओळख आणि पडताळणी करण्यायोग्य क्रेडेन्शियल्स तयार करणे सोपे करते._**

- [होमपेज](https://veramo.io/)
- [डॉक्युमेंटेशन](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [डिस्कॉर्ड्](https://discord.com/invite/FRRBdjemHV)
- [NPM पॅकेज](https://www.npmjs.com/package/@veramo/core)

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या एखाद्या कम्युनिटी रिसोर्सबद्दल माहिती आहे का? हे पेज संपादित करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [स्थानिक डेव्हलपमेंट वातावरण सेट करा](/developers/local-environment/)

## ट्युटोरिअल्स: इथेरियमवरील डेव्हलपमेंट फ्रेमवर्क्स {#tutorials}

- [नवशिक्यांसाठी हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट – फुलस्टॅक](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhat वापरून हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट तयार करा आणि प्रस्थापित करा, त्यानंतर ते फ्रंटएंडशी कनेक्ट करा._