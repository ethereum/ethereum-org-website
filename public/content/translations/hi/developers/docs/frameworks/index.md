---
title: "Dapp डेवलपमेंट फ्रेमवर्क"
description: "फ्रेमवर्क के फायदों का अन्वेषण करें और उपलब्ध विकल्पों की तुलना करें।"
lang: hi
---

## फ्रेमवर्क का परिचय {#introduction-to-frameworks}

एक पूर्ण विकसित विकेंद्रीकृत एप्लिकेशन (dapp) बनाने के लिए विभिन्न प्रकार की तकनीक की आवश्यकता होती है। सॉफ़्टवेयर फ्रेमवर्क में कई आवश्यक सुविधाएँ शामिल होती हैं या वे आपके इच्छित टूल चुनने के लिए आसान प्लगइन सिस्टम प्रदान करते हैं।

फ्रेमवर्क बिना किसी अतिरिक्त कॉन्फ़िगरेशन के कई कार्यक्षमताओं के साथ आते हैं, जैसे:

- एक स्थानीय ब्लॉकचेन इंस्टेंस शुरू करने की सुविधाएँ।
- आपके स्मार्ट अनुबंधों को संकलित और परीक्षण करने के लिए उपयोगिताएँ।
- उसी प्रोजेक्ट/रिपॉजिटरी के भीतर उपयोगकर्ताओं के लिए एप्लिकेशन बनाने के लिए क्लाइंट डेवलपमेंट ऐड-ऑन।
- इथेरियम नेटवर्क से जुड़ने और अनुबंधों को तैनात करने के लिए कॉन्फ़िगरेशन, चाहे वह स्थानीय रूप से चल रहे इंस्टेंस पर हो, या इथेरियम के सार्वजनिक नेटवर्क में से किसी एक पर।
- विकेंद्रीकृत ऐप वितरण - IPFS जैसे स्टोरेज विकल्पों के साथ एकीकरण।

## पूर्वापेक्षाएँ {#prerequisites}

फ्रेमवर्क में गहराई से जाने से पहले, हम अनुशंसा करते हैं कि आप पहले [dapps](/developers/docs/dapps/) और [इथेरियम स्टैक](/developers/docs/ethereum-stack/) के हमारे परिचय को पढ़ें।

## उपलब्ध फ्रेमवर्क {#available-frameworks}

**Foundry** - **_Foundry इथेरियम एप्लिकेशन विकास के लिए एक बेहद तेज़, पोर्टेबल और मॉड्यूलर टूलकिट है_**

- [Foundry इंस्टॉल करें](https://book.getfoundry.sh/)
- [Foundry बुक](https://book.getfoundry.sh/)
- [टेलीग्राम पर Foundry कम्युनिटी चैट](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_पेशेवरों के लिए इथेरियम विकास वातावरण।_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Python विशेषज्ञों, डेटा वैज्ञानिकों और सुरक्षा पेशेवरों के लिए स्मार्ट अनुबंध विकास टूल।_**

- [दस्तावेज़ीकरण](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM पर ब्लॉकचेन एप्लिकेशन विकसित करने के लिए एक प्लेटफ़ॉर्म।_**

- [होमपेज](https://www.web3labs.com/web3j-sdk)
- [दस्तावेज़ीकरण](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-आधारित ब्लॉकचेन के लिए एसिंक (Async), उच्च-प्रदर्शन वाली Kotlin/Java/Android लाइब्रेरी।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरण](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [डिस्कॉर्ड](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_एक कमांड के साथ इथेरियम-संचालित ऐप बनाएं। चुनने के लिए UI फ्रेमवर्क और विकेंद्रीकृत वित्त (DeFi) टेम्प्लेट की एक विस्तृत पेशकश के साथ आता है।_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [टेम्प्लेट](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-ETH -** **_Web3 के लिए Ethers.js + Hardhat + React कंपोनेंट्स और हुक्स: स्मार्ट अनुबंधों द्वारा संचालित विकेंद्रीकृत एप्लिकेशन बनाना शुरू करने के लिए आवश्यक सब कुछ।_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 विकास प्लेटफ़ॉर्म जो ब्लॉकचेन डेवलपर्स को स्मार्ट अनुबंध बनाने, परीक्षण करने, डिबग करने, मॉनिटर करने और संचालित करने तथा dapp UX को बेहतर बनाने में सक्षम बनाता है।_**

- [वेबसाइट](https://tenderly.co/)
- [दस्तावेज़ीकरण](https://docs.tenderly.co/)

**The Graph -** **_ब्लॉकचेन डेटा को कुशलतापूर्वक क्वेरी करने के लिए The Graph।_**

- [वेबसाइट](https://thegraph.com/)
- [ट्यूटोरियल](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_इथेरियम विकास प्लेटफ़ॉर्म।_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [डिस्कॉर्ड](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_इथेरियम विकास प्लेटफ़ॉर्म।_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [डिस्कॉर्ड](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_हमारे शक्तिशाली SDKs और CLI का उपयोग करके ऐसे Web3 एप्लिकेशन बनाएं जो आपके स्मार्ट अनुबंधों के साथ इंटरैक्ट कर सकें।_**

- [दस्तावेज़ीकरण](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (इथेरियम और अन्य) विकास प्लेटफ़ॉर्म।_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [डिस्कॉर्ड](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_एंटरप्राइज़-ग्रेड Web3 विकास प्लेटफ़ॉर्म, जो आपको सभी प्रमुख चेनों EVM चेनों (और अन्य) पर NFT एप्लिकेशन बनाने की अनुमति देता है।_**

- [वेबसाइट](https://www.crossmint.com)
- [दस्तावेज़ीकरण](https://docs.crossmint.com)
- [डिस्कॉर्ड](https://discord.com/invite/crossmint)

**Brownie -** **_Python-आधारित विकास वातावरण और परीक्षण फ्रेमवर्क।_**

- [दस्तावेज़ीकरण](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie का वर्तमान में रखरखाव नहीं किया जा रहा है**

**ओपनजेपेलिन SDK -** **_अल्टीमेट स्मार्ट अनुबंध टूलकिट: स्मार्ट अनुबंधों को विकसित करने, संकलित करने, अपग्रेड करने, तैनात करने और उनके साथ इंटरैक्ट करने में आपकी सहायता करने के लिए टूल का एक सूट।_**

- [ओपनजेपेलिन Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [कम्युनिटी फोरम](https://forum.openzeppelin.com/c/support/17)
- **ओपनजेपेलिन SDK का विकास समाप्त हो गया है**

**Catapulta -** **_मल्टी-चेन स्मार्ट अनुबंध तैनाती टूल, ब्लॉक एक्सप्लोरर में सत्यापन को स्वचालित करता है, तैनात स्मार्ट अनुबंधों का ट्रैक रखता है और तैनाती रिपोर्ट साझा करता है, Foundry और Hardhat प्रोजेक्ट्स के लिए प्लग-एन-प्ले।_**

- [GitHub](https://github.com/catapulta-sh)

**GoldRush (Covalent द्वारा संचालित) -** **_GoldRush डेवलपर्स, विश्लेषकों और उद्यमों के लिए सबसे व्यापक ब्लॉकचेन डेटा API सूट प्रदान करता है। चाहे आप DeFi डैशबोर्ड, वॉलेट, ट्रेडिंग बॉट, एआई एजेंट या अनुपालन प्लेटफ़ॉर्म बना रहे हों, डेटा APIs आपके लिए आवश्यक ऑनचेन डेटा तक तेज़, सटीक और डेवलपर-अनुकूल पहुँच प्रदान करते हैं_**

- [वेबसाइट](https://goldrush.dev/)
- [दस्तावेज़ीकरण](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [डिस्कॉर्ड](https://www.covalenthq.com/discord/)

**Wake -** **_अनुबंध परीक्षण, फ़ज़िंग (fuzzing), तैनाती, भेद्यता स्कैनिंग और कोड नेविगेशन के लिए ऑल-इन-वन Python फ्रेमवर्क।_**

- [होमपेज](https://getwake.io/)
- [दस्तावेज़ीकरण](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_ओपन सोर्स, मॉड्यूलर और एग्नॉस्टिक फ्रेमवर्क जो विकेंद्रीकृत एप्लिकेशन डेवलपर्स के लिए अपने एप्लिकेशन में विकेंद्रीकृत पहचान और सत्यापन योग्य क्रेडेंशियल्स बनाना आसान बनाता है।_**

- [होमपेज](https://veramo.io/)
- [दस्तावेज़ीकरण](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [डिस्कॉर्ड](https://discord.com/invite/FRRBdjemHV)
- [NPM पैकेज](https://www.npmjs.com/package/@veramo/core)

## आगे की पढ़ाई {#further-reading}

_क्या आप किसी ऐसे कम्युनिटी संसाधन के बारे में जानते हैं जिसने आपकी मदद की हो? इस पेज को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [एक स्थानीय विकास वातावरण सेट करें](/developers/local-environment/)

## ट्यूटोरियल: इथेरियम पर विकास फ्रेमवर्क {#tutorials}

- [शुरुआती लोगों के लिए हैलो वर्ल्ड स्मार्ट अनुबंध – फुलस्टैक](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Hardhat का उपयोग करके एक हैलो वर्ल्ड स्मार्ट अनुबंध बनाएं और तैनात करें, फिर इसे फ्रंटएंड से कनेक्ट करें।_