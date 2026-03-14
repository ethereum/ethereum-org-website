---
title: "DApp विकास फ्रेमवर्क्स"
description: "फ्रेमवर्कच्या फायद्यांचे अन्वेषण करा आणि उपलब्ध पर्यायांची तुलना करा."
lang: mr
---

## फ्रेमवर्कची ओळख {#introduction-to-frameworks}

एक परिपूर्ण DApp तयार करण्यासाठी
वेगवेगळ्या तंत्रज्ञानाची आवश्यकता असते. सॉफ्टवेअर फ्रेमवर्क्समध्ये अनेक आवश्यक
वैशिष्ट्ये समाविष्ट असतात किंवा तुम्हाला हवी असलेली साधने निवडण्यासाठी सोप्या प्लगइन प्रणाली पुरवतात.

फ्रेमवर्क्स बऱ्याच आउट-ऑफ-द-बॉक्स कार्यक्षमतेसह येतात,
जसे की:

- स्थानिक ब्लॉकचेन उदाहरण स्पिन अप करण्यासाठी वैशिष्ट्ये.
- तुमचे स्मार्ट कॉन्ट्रॅक्ट संकलित करण्यासाठी आणि चाचणी करण्यासाठी उपयुक्तता.
- त्याच प्रोजेक्ट/रिपॉझिटरीमध्ये तुमचा वापरकर्ता-केंद्रित ॲप्लिकेशन तयार करण्यासाठी
  क्लायंट डेव्हलपमेंट ॲड-ऑन्स.
- Ethereum नेटवर्क्सशी कनेक्ट होण्यासाठी आणि कॉन्ट्रॅक्ट्स तैनात करण्यासाठी
  कॉन्फिगरेशन, मग ते स्थानिक पातळीवर चालणाऱ्या इन्स्टन्सवर असो, किंवा Ethereum च्या
  सार्वजनिक नेटवर्क्सपैकी एकावर असो.
- विकेंद्रित ॲप वितरण - IPFS सारख्या स्टोरेज
  पर्यायांसह एकत्रीकरण.

## पूर्वतयारी {#prerequisites}

फ्रेमवर्क्समध्ये खोलवर जाण्यापूर्वी, आम्ही शिफारस करतो की तुम्ही प्रथम आमची [dapps](/developers/docs/dapps/) आणि [Ethereum स्टॅक](/developers/docs/ethereum-stack/) ची ओळख वाचून घ्या.

## उपलब्ध फ्रेमवर्क्स {#available-frameworks}

**Foundry** - **_Foundry हे Ethereum ऍप्लिकेशन डेव्हलपमेंटसाठी एक अतिशय वेगवान, पोर्टेबल आणि मॉड्युलर टूलकिट आहे_**

- [Foundry इंस्टॉल करा](https://book.getfoundry.sh/)
- [Foundry पुस्तक](https://book.getfoundry.sh/)
- [Telegram वर Foundry कम्युनिटी चॅट](https://t.me/foundry_support)
- [ऑसम Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_व्यावसायिकांसाठी Ethereum विकास वातावरण._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_पायथनिस्ट, डेटा सायंटिस्ट आणि सुरक्षा व्यावसायिकांसाठी स्मार्ट कॉन्ट्रॅक्ट डेव्हलपमेंट टूल._**

- [दस्तऐवजीकरण](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM वर ब्लॉकचेन ऍप्लिकेशन्स विकसित करण्यासाठी एक प्लॅटफॉर्म._**

- [होमपेज](https://www.web3labs.com/web3j-sdk)
- [दस्तऐवजीकरण](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-आधारित ब्लॉकचेनसाठी Async, उच्च-कार्यक्षमता असलेली Kotlin/Java/Android लायब्ररी._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरणे](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_एका कमांडने Ethereum-सक्षम ॲप्स तयार करा. निवडण्यासाठी UI फ्रेमवर्क्स आणि DeFi टेम्पलेट्सच्या विस्तृत श्रेणीसह येते._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [टेम्पलेट्स](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + web3 साठी React कंपोनंट्स आणि हुक्स: स्मार्ट कॉन्ट्रॅक्ट्सद्वारे चालणाऱ्या विकेंद्रित ॲप्लिकेशन्सची निर्मिती सुरू करण्यासाठी तुम्हाला आवश्यक असलेले सर्वकाही._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Web3 डेव्हलपमेंट प्लॅटफॉर्म जे ब्लॉकचेन डेव्हलपर्सना स्मार्ट कॉन्ट्रॅक्ट्स तयार करणे, तपासणे, डीबग करणे, मॉनिटर करणे, आणि ऑपरेट करण्यास आणि dApp UX सुधारण्यास सक्षम करते._**

- [वेबसाईट](https://tenderly.co/)
- [दस्तऐवजीकरण](https://docs.tenderly.co/)

**The Graph -** **_ब्लॉकचेन डेटा कार्यक्षमतेने क्वेरी करण्यासाठी._**

- [वेबसाईट](https://thegraph.com/)
- [ट्यूटोरियल](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum डेव्हलपमेंट प्लॅटफॉर्म._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum डेव्हलपमेंट प्लॅटफॉर्म._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_आमच्या शक्तिशाली SDKs आणि CLI चा वापर करून तुमच्या स्मार्ट कॉन्ट्रॅक्ट्ससोबत संवाद साधू शकणारे web3 ॲप्लिकेशन्स तयार करा._**

- [दस्तऐवजीकरण](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Web3 (Ethereum आणि इतर) डेव्हलपमेंट प्लॅटफॉर्म._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_एंटरप्राइझ-ग्रेड web3 डेव्हलपमेंट प्लॅटफॉर्म, जो तुम्हाला सर्व प्रमुख EVM चेन्स (आणि इतरांवर) NFT ॲप्लिकेशन्स तयार करण्याची परवानगी देतो._**

- [वेबसाईट](https://www.crossmint.com)
- [दस्तऐवजीकरण](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_पायथन-आधारित डेव्हलपमेंट एनव्हायर्नमेंट आणि टेस्टिंग फ्रेमवर्क._**

- [दस्तऐवजीकरण](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie ची देखभाल सध्या केली जात नाही**

**OpenZeppelin SDK -** **_अल्टिमेट स्मार्ट कॉन्ट्रॅक्ट टूलकिट: साधनांचा एक संच जो तुम्हाला स्मार्ट कॉन्ट्रॅक्ट्स विकसित करणे, कंपाईल करणे, अपग्रेड करणे, तैनात करणे आणि त्यांच्याशी संवाद साधण्यात मदत करतो._**

- [OpenZeppelin डिफेंडर SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [कम्युनिटी फोरम](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK चा विकास थांबला आहे**

**Catapulta -** **_मल्टी-चेन स्मार्ट कॉन्ट्रॅक्ट्स डिप्लॉयमेंट टूल, ब्लॉक एक्सप्लोररमध्ये व्हेरिफिकेशन्स ऑटोमेट करते, डिप्लॉय केलेल्या स्मार्ट कॉन्ट्रॅक्ट्सचा मागोवा ठेवते आणि डिप्लॉयमेंट रिपोर्ट्स शेअर करते, Foundry आणि Hardhat प्रोजेक्ट्ससाठी प्लग-एन-प्ले._**

- [वेबसाईट](https://catapulta.sh/)
- [दस्तऐवजीकरण](https://catapulta.sh/docs)
- [Github](https://github.com/catapulta-sh)

**GoldRush (Covalent द्वारा समर्थित) -** **_GoldRush डेव्हलपर्स, विश्लेषक आणि एंटरप्राइझसाठी सर्वात व्यापक ब्लॉकचेन डेटा API सूट प्रदान करते. तुम्ही DeFi डॅशबोर्ड, वॉलेट, ट्रेडिंग बॉट, AI एजंट किंवा कंप्लायन्स प्लॅटफॉर्म तयार करत असाल, डेटा APIs तुम्हाला आवश्यक असलेल्या महत्त्वाच्या ऑनचेन डेटासाठी वेगवान, अचूक आणि डेव्हलपर-फ्रेंडली ऍक्सेस प्रदान करतात_**

- [वेबसाईट](https://goldrush.dev/)
- [दस्तऐवजीकरण](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_कॉन्ट्रॅक्ट्स टेस्टिंग, फझिंग, डिप्लॉयमेंट, व्हल्नरेबिलिटी स्कॅनिंग आणि कोड नेव्हिगेशनसाठी ऑल-इन-वन पायथन फ्रेमवर्क._**

- [होमपेज](https://getwake.io/)
- [दस्तऐवजीकरण](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS कोड एक्सटेन्शन](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_ओपन सोर्स, मॉड्युलर आणि ॲग्नॉस्टिक फ्रेमवर्क जे विकेंद्रित ऍप्लिकेशन डेव्हलपर्ससाठी त्यांच्या ऍप्लिकेशन्समध्ये विकेंद्रित ओळख आणि व्हेरिफायेबल क्रेडेन्शियल्स तयार करणे सोपे करते._**

- [होमपेज](https://veramo.io/)
- [दस्तऐवजीकरण](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM पॅकेज](https://www.npmjs.com/package/@veramo/core)

## पुढील वाचन {#further-reading}

_तुम्हाला मदत केलेल्या सामुदायिक संसाधनाबद्दल माहिती आहे का?_ हे पृष्ठ संपादित करा आणि ते जोडा!_

## संबंधित विषय {#related-topics}

- [स्थानिक विकास वातावरण सेट अप करा](/developers/local-environment/)
