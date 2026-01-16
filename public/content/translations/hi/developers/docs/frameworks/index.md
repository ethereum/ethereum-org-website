---
title: "Dapp डेवलपमेंट फ़्रेमवर्क"
description: "फ़्रेमवर्क के लाभों का अन्वेषण करें और उपलब्ध विकल्पों की तुलना करें।"
lang: hi
---

## फ्रेमवर्क का परिचय {#introduction-to-frameworks}

एक पूर्ण विकसित dapp बनाने की आवश्यकता है
टैकनोलजी के विभिन्न टुकड़े। सॉफ्टवेयर फ़्रेमवर्क में कई आवश्यक शामिल हैं ताकि
सुविधाओं या आसान प्लगइन सिस्टम प्रदान करने वाले टूल को चुनने के लिए जो आप चाहते हैं ।

फ़्रेमवर्क बहुत सारी आउट-ऑफ़-द-बॉक्स कार्यक्षमता के साथ आते हैं,
उदाहरण के लिए:

- एक स्थानीय ब्लॉकचेन उदाहरण को स्पिन करने के लिए विशेष रूप से प्रदर्शित होता है।
- आपके स्मार्ट अनुबंध को संकलित करने और परीक्षण करने के लिए उपयोगिताएँ।
- अपने उपयोगकर्ता-उन्मुख एप्लिकेशन को एक ही प्रोजेक्ट/रिपॉजिटरी के भीतर बनाने
  के लिए क्लाइंट डेवलपमेंट ऐड-ऑन।
- Ethereum नेटवर्क से कनेक्ट करने और अनुबंधों को डिप्लॉय करने
  के लिए कॉन्फ़िगरेशन, चाहे वह स्थानीय रूप से चल रहे इंस्टेंस के लिए हो, या Ethereum के
  सार्वजनिक नेटवर्कों में से एक के लिए हो।
- विकेंद्रीकृत ऐप वितरण - IPFS जैसे स्टोरेज
  विकल्पों के साथ एकीकरण।

## पूर्वापेक्षाएं {#prerequisites}

फ्रेमवर्क में जाने से पहले, हम अनुशंसा करते हैं कि आप पहले हमारे [डैप्स](/developers/docs/dapps/) और [Ethereum स्टैक](/developers/docs/ethereum-stack/) का परिचय पढ़ें।

## उपलब्ध फ्रेमवर्क {#available-frameworks}

**Foundry** - **_Foundry, Ethereum एप्लिकेशन डेवलपमेंट के लिए एक अत्यंत तेज, पोर्टेबल और मॉड्यूलर टूलकिट है_**

- [Foundry इंस्टॉल करें](https://book.getfoundry.sh/)
- [Foundry बुक](https://book.getfoundry.sh/)
- [टेलीग्राम पर Foundry कम्युनिटी चैट](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_पेशेवरों के लिए Ethereum डेवलपमेंट वातावरण।_**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_Pythonistas, डेटा साइंटिस्ट और सुरक्षा पेशेवरों के लिए स्मार्ट अनुबंध डेवलपमेंट टूल।_**

- [प्रलेखन](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_JVM पर ब्लॉकचेन एप्लिकेशन विकसित करने का एक प्लेटफॉर्म।_**

- [होमपेज](https://www.web3labs.com/web3j-sdk)
- [प्रलेखन](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_EVM-आधारित ब्लॉकचेन के लिए एसिंक, उच्च-प्रदर्शन Kotlin/Java/Android लाइब्रेरी।_**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [उदाहरण](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_एक कमांड से Ethereum-संचालित ऐप्स बनाएँ। चुनने के लिए UI फ्रेमवर्क और DeFi टेम्प्लेट की एक विस्तृत पेशकश के साथ आता है।_**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [टेम्प्लेट्स](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + वेब3 के लिए React कंपोनेंट और हुक: स्मार्ट अनुबंधों द्वारा संचालित विकेंद्रीकृत एप्लिकेशन बनाने के लिए आपको जो कुछ भी चाहिए।_**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_वेब3 डेवलपमेंट प्लेटफॉर्म जो ब्लॉकचेन डेवलपर को स्मार्ट अनुबंध बनाने, टेस्ट करने, डीबग करने, मॉनिटर करने और संचालित करने और डैप UX को बेहतर बनाने में सक्षम बनाता है।_**

- [वेबसाइट](https://tenderly.co/)
- [प्रलेखन](https://docs.tenderly.co/)

**The Graph -** **_ब्लॉकचेन डेटा को कुशलतापूर्वक क्वेरी करने के लिए The Graph।_**

- [वेबसाइट](https://thegraph.com/)
- [ट्यूटोरियल](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Ethereum डेवलपमेंट प्लेटफॉर्म।_**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Ethereum डेवलपमेंट प्लेटफॉर्म।_**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_हमारे शक्तिशाली SDKs और CLI का उपयोग करके अपने स्मार्ट अनुबंधों के साथ इंटरैक्ट कर सकने वाले वेब3 एप्लिकेशन बनाएँ।_**

- [प्रलेखन](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_वेब3 (Ethereum और अन्य) डेवलपमेंट प्लेटफॉर्म।_**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_एंटरप्राइज-ग्रेड वेब3 डेवलपमेंट प्लेटफॉर्म, जो आपको सभी प्रमुख EVM चेन्स (और अन्य) पर NFT एप्लिकेशन बनाने की अनुमति देता है।_**

- [वेबसाइट](https://www.crossmint.com)
- [प्रलेखन](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Python-आधारित डेवलपमेंट वातावरण और टेस्टिंग फ्रेमवर्क।_**

- [प्रलेखन](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie का रखरखाव वर्तमान में नहीं किया जा रहा है**

**OpenZeppelin SDK -** **_द अल्टीमेट स्मार्ट अनुबंध टूलकिट: आपको स्मार्ट अनुबंधों को डेवलप करने, कंपाइल करने, अपग्रेड करने, डिप्लॉय करने और उनके साथ इंटरैक्ट करने में मदद करने के लिए टूल का एक सूट।_**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [कम्युनिटी फोरम](https://forum.openzeppelin.com/c/support/17)
- **OpenZeppelin SDK का डेवलपमेंट समाप्त हो गया है**

**Catapulta -** **_मल्टी-चेन स्मार्ट अनुबंध डिप्लॉयमेंट टूल, ब्लॉक एक्सप्लोरर में वेरिफ़िकेशन को स्वचालित करता है, डिप्लॉय किए गए स्मार्ट अनुबंधों का ट्रैक रखता है और डिप्लॉयमेंट रिपोर्ट शेयर करता है, Foundry और Hardhat प्रोजेक्ट्स के लिए प्लग-एंड-प्ले।_**

- [वेबसाइट](https://catapulta.sh/)
- [प्रलेखन](https://catapulta.sh/docs)
- [Github](https://github.com/catapulta-sh)

**GoldRush (Covalent द्वारा संचालित) -** **_GoldRush डेवलपर, विश्लेषकों और उद्यमों के लिए सबसे व्यापक ब्लॉकचेन डेटा API सुइट प्रदान करता है। चाहे आप DeFi डैशबोर्ड, एक वॉलेट, एक ट्रेडिंग बॉट, एक AI एजेंट या एक अनुपालन प्लेटफॉर्म बना रहे हों, डेटा API आपको आवश्यक ऑन-चेन डेटा के लिए तेज, सटीक और डेवलपर-अनुकूल एक्सेस प्रदान करते हैं_**

- [वेबसाइट](https://goldrush.dev/)
- [प्रलेखन](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_अनुबंधों के परीक्षण, फ़ज़िंग, परिनियोजन, भेद्यता स्कैनिंग और कोड नेविगेशन के लिए ऑल-इन-वन Python फ्रेमवर्क।_**

- [होमपेज](https://getwake.io/)
- [प्रलेखन](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [VS Code एक्सटेंशन](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_ओपन सोर्स, मॉड्यूलर और एग्नोस्टिक फ्रेमवर्क जो विकेंद्रीकृत एप्लिकेशन डेवलपर के लिए अपने एप्लिकेशन में विकेंद्रीकृत पहचान और सत्यापन योग्य क्रेडेंशियल बनाना आसान बनाता है।_**

- [होमपेज](https://veramo.io/)
- [प्रलेखन](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [NPM पैकेज](https://www.npmjs.com/package/@veramo/core)

## आगे की रीडिंग {#further-reading}

_क्या आप किसी सामुदायिक संसाधन के बारे में जानते हैं जिसने आपकी मदद की हो? इस पृष्ठ को संपादित करें और इसे जोड़ें!_

## संबंधित विषय {#related-topics}

- [एक स्थानीय डेवलपमेंट परिवेश सेट करें](/developers/local-environment/)
