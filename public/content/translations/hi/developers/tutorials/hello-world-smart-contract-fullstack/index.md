---
title: "शुरुआती लोगों के लिए हैलो वर्ल्ड स्मार्ट अनुबंध - फुलस्टैक"
description: "एथेरियम पर एक सरल स्मार्ट अनुबंध लिखने और तैनात करने पर परिचयात्मक ट्यूटोरियल।"
author: "nstrike2"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "स्मार्ट अनुबंध",
    "परिनियोजित करना",
    "ब्लॉक खोजकर्ता",
    "frontend",
    "लेनदेन"
  ]
skill: beginner
lang: hi
published: 2021-10-25
---

यह गाइड आपके लिए है यदि आप ब्लॉकचेन डेवलपमेंट में नए हैं और नहीं जानते कि कहां से शुरू करें या स्मार्ट अनुबंधों को कैसे डिप्लॉय और उनके साथ कैसे इंटरैक्ट करें। हम [मेटामास्क](https://metamask.io), [सॉलिडिटी](https://docs.soliditylang.org/en/v0.8.0/), [हार्डहैट](https://hardhat.org), और [अल्केमी](https://alchemy.com/eth) का उपयोग करके Goerli टेस्ट नेटवर्क पर एक सरल, स्मार्ट अनुबंध बनाने और डिप्लॉय करने के बारे में बताएंगे।

इस ट्यूटोरियल को पूरा करने के लिए आपको एक अल्केमी खाते की आवश्यकता होगी। [एक मुफ्त खाते के लिए साइन अप करें](https://www.alchemy.com/)।

यदि आपके पास किसी भी समय कोई प्रश्न है, तो बेझिझक [अल्केमी डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संपर्क करें!

## भाग 1 - हार्डहैट का उपयोग करके अपना स्मार्ट अनुबंध बनाएं और डिप्लॉय करें {#part-1}

### एथेरियम नेटवर्क से कनेक्ट करें {#connect-to-the-ethereum-network}

एथेरियम श्रृंखला के लिए अनुरोध करने के कई तरीके हैं। सरलता के लिए, हम अल्केमी पर एक मुफ्त खाते का उपयोग करेंगे, जो एक ब्लॉकचेन डेवलपर प्लेटफ़ॉर्म और API है जो हमें खुद एक नोड चलाए बिना एथेरियम श्रृंखला के साथ संचार करने की अनुमति देता है। अल्केमी में निगरानी और विश्लेषण के लिए डेवलपर टूल भी हैं; हम इस ट्यूटोरियल में इनका लाभ उठाएंगे ताकि यह समझ सकें कि हमारे स्मार्ट अनुबंध डिप्लॉयमेंट में क्या हो रहा है।

### अपना ऐप और API कुंजी बनाएं {#create-your-app-and-api-key}

एक बार जब आप एक अल्केमी खाता बना लेते हैं, तो आप एक ऐप बनाकर एक API कुंजी उत्पन्न कर सकते हैं। यह आपको Goerli टेस्टनेट पर अनुरोध करने की अनुमति देगा। यदि आप टेस्टनेट से परिचित नहीं हैं तो आप [एक नेटवर्क चुनने के लिए अल्केमी की गाइड पढ़ सकते हैं](https://www.alchemy.com/docs/choosing-a-web3-network)।

अल्केमी डैशबोर्ड पर, नेविगेशन बार में **Apps** ड्रॉपडाउन ढूंढें और **Create App** पर क्लिक करें।

![हैलो वर्ल्ड ऐप बनाएं](./hello-world-create-app.png)

अपने ऐप को '_Hello World_' नाम दें और एक संक्षिप्त विवरण लिखें। अपने परिवेश के रूप में **स्टेजिंग** और अपने नेटवर्क के रूप में **Goerli** का चयन करें।

![ऐप व्यू हैलो वर्ल्ड बनाएं](./create-app-view-hello-world.png)

_नोट: **Goerli** का चयन करना सुनिश्चित करें, अन्यथा यह ट्यूटोरियल काम नहीं करेगा।_

**Create app** पर क्लिक करें। आपका ऐप नीचे दी गई तालिका में दिखाई देगा।

### एक एथेरियम खाता बनाएं {#create-an-ethereum-account}

लेन-देन भेजने और प्राप्त करने के लिए आपको एक एथेरियम खाते की आवश्यकता है। हम मेटामास्क का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जो यूज़र्स को अपना एथेरियम खाता पता प्रबंधित करने देता है।

आप [यहां](https://metamask.io/download) मुफ्त में मेटामास्क खाता डाउनलोड और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो ऊपरी दाएं कोने में "Goerli टेस्ट नेटवर्क" पर स्विच करना सुनिश्चित करें (ताकि हम असली पैसे से काम न कर रहे हों)।

### चरण 4: एक फोसेट से ईथर जोड़ें {#step-4-add-ether-from-a-faucet}

अपने स्मार्ट अनुबंध को टेस्ट नेटवर्क पर डिप्लॉय करने के लिए, आपको कुछ नकली ETH की आवश्यकता होगी। Goerli नेटवर्क पर ETH प्राप्त करने के लिए, Goerli फॉसेट पर जाएं और अपना Goerli खाता पता दर्ज करें। ध्यान दें कि Goerli फॉसेट हाल ही में थोड़े अविश्वसनीय हो सकते हैं - आज़माने के लिए विकल्पों की सूची के लिए [टेस्ट नेटवर्क पेज](/developers/docs/networks/#goerli) देखें:

_नोट: नेटवर्क संकुलन के कारण, इसमें कुछ समय लग सकता है।_
``

### चरण 5: अपना बैलेंस जांचें {#step-5-check-your-balance}

यह दोबारा जांचने के लिए कि ETH आपके वॉलेट में है, आइए [अल्केमी के कंपोजर टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) का उपयोग करके एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) अनुरोध करें। यह हमारे वॉलेट में ETH की राशि वापस कर देगा। अधिक जानने के लिए [कंपोजर टूल का उपयोग कैसे करें पर अल्केमी का छोटा ट्यूटोरियल](https://youtu.be/r6sjRxBZJuU) देखें।

अपना मेटामास्क खाता पता दर्ज करें और **अनुरोध भेजें** पर क्लिक करें। आपको एक प्रतिक्रिया दिखाई देगी जो नीचे दिए गए कोड स्निपेट की तरह दिखती है।

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _नोट: यह परिणाम wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है।_

उफ्फ! हमारे नकली पैसे पूरे हैं।

### चरण 6: हमारे प्रोजेक्ट को शुरू करें {#step-6-initialize-our-project}

सबसे पहले, हमें अपने प्रोजेक्ट के लिए एक फ़ोल्डर बनाना होगा। अपनी कमांड लाइन पर नेविगेट करें और निम्नलिखित इनपुट करें।

```
mkdir hello-world
cd hello-world
```

अब जब हम अपने प्रोजेक्ट फ़ोल्डर के अंदर हैं, तो हम प्रोजेक्ट को प्रारंभ करने के लिए `npm init` का उपयोग करेंगे।

> यदि आपके पास अभी तक npm स्थापित नहीं है, तो [नोड.जेएस और npm स्थापित करने के लिए इन निर्देशों का पालन करें](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)।

इस ट्यूटोरियल के उद्देश्य के लिए, इससे कोई फर्क नहीं पड़ता कि आप आरंभीकरण प्रश्नों का उत्तर कैसे देते हैं। यहां संदर्भ के लिए बताया गया है कि हमने इसे कैसे किया:

```
पैकेज का नाम: (hello-world)
संस्करण: (1.0.0)
विवरण: हैलो वर्ल्ड स्मार्ट अनुबंध
एंट्री पॉइंट: (index.js)
टेस्ट कमांड:
गिट रिपॉजिटरी:
कीवर्ड:
लेखक:
लाइसेंस: (ISC)

/Users/.../.../.../hello-world/package.json पर लिखने वाला है:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "हैलो वर्ल्ड स्मार्ट अनुबंध",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json को स्वीकृत करें और हम जाने के लिए तैयार हैं!

### चरण 7: हार्डहैट डाउनलोड करें {#step-7-download-hardhat}

हार्डहैट आपके एथेरियम सॉफ्टवेयर को कंपाइल, डिप्लॉय, टेस्ट और डीबग करने के लिए एक डेवलपमेंट वातावरण है। यह डेवलपर्स को लाइव चेन पर डिप्लॉय करने से पहले स्थानीय रूप से स्मार्ट अनुबंध और डैप्स बनाने में मदद करता है।

हमारे `hello-world` प्रोजेक्ट के अंदर चलाएं:

```
npm install --save-dev hardhat
```

[इंस्टॉलेशन निर्देशों](https://hardhat.org/getting-started/#overview) पर अधिक जानकारी के लिए यह पेज देखें।

### चरण 8: हार्डहैट प्रोजेक्ट बनाएं {#step-8-create-hardhat-project}

हमारे `hello-world` प्रोजेक्ट फ़ोल्डर के अंदर, चलाएँ:

```
npx hardhat
```

इसके बाद आपको एक स्वागत संदेश और यह चुनने का विकल्प देखना चाहिए कि आप क्या करना चाहते हैं। “create an empty hardhat.config.js” चुनें:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.11 में आपका स्वागत है 👷‍

आप क्या करना चाहते हैं? …
एक नमूना प्रोजेक्ट बनाएं
❯ एक खाली hardhat.config.js बनाएं
छोड़ें
```

यह प्रोजेक्ट में एक `hardhat.config.js` फ़ाइल उत्पन्न करेगा। हम इसका उपयोग बाद में ट्यूटोरियल में अपने प्रोजेक्ट के सेटअप को निर्दिष्ट करने के लिए करेंगे।

### चरण 9: प्रोजेक्ट फ़ोल्डर जोड़ें {#step-9-add-project-folders}

प्रोजेक्ट को व्यवस्थित रखने के लिए, आइए दो नए फ़ोल्डर बनाएं। कमांड लाइन में, अपने `hello-world` प्रोजेक्ट की रूट डायरेक्टरी पर नेविगेट करें और टाइप करें:

```
mkdir contracts
mkdir scripts
```

- `contracts/` वह जगह है जहाँ हम अपनी हैलो वर्ल्ड स्मार्ट अनुबंध कोड फ़ाइल रखेंगे
- `scripts/` वह जगह है जहाँ हम अपने अनुबंध को तैनात करने और उसके साथ बातचीत करने के लिए स्क्रिप्ट रखेंगे

### चरण 10: हमारा अनुबंध लिखें {#step-10-write-our-contract}

आप खुद से पूछ रहे होंगे कि हम कोड कब लिखेंगे? यही समय है!

अपने पसंदीदा संपादक में हैलो-वर्ल्ड प्रोजेक्ट खोलें। स्मार्ट अनुबंध आमतौर पर सॉलिडिटी में लिखे जाते हैं, जिसका उपयोग हम अपना स्मार्ट अनुबंध लिखने के लिए करेंगे।‌

1. `contracts` फ़ोल्डर में नेविगेट करें और `HelloWorld.sol` नामक एक नई फ़ाइल बनाएं
2. नीचे एक नमूना हैलो वर्ल्ड स्मार्ट अनुबंध है जिसका उपयोग हम इस ट्यूटोरियल के लिए करेंगे। नीचे दी गई सामग्री को `HelloWorld.sol` फ़ाइल में कॉपी करें।

_नोट: यह अनुबंध क्या करता है यह समझने के लिए टिप्पणियों को पढ़ना सुनिश्चित करें।_

```
// सिमेंटिक वर्जनिंग का उपयोग करके, सॉलिडिटी के संस्करण को निर्दिष्ट करता है।
// और जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// 'HelloWorld' नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध कार्यों और डेटा (इसकी स्थिति) का एक संग्रह है। एक बार डिप्लॉय होने के बाद, एक अनुबंध एथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है। और जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //अपडेट फ़ंक्शन कॉल होने पर उत्सर्जित होता है
   //स्मार्ट अनुबंध इवेंट आपके अनुबंध के लिए यह संवाद करने का एक तरीका है कि ब्लॉकचेन पर आपके ऐप फ्रंट-एंड में कुछ हुआ है, जो कुछ इवेंट्स को 'सुन' सकता है और उनके होने पर कार्रवाई कर सकता है।
   event UpdatedMessages(string oldStr, string newStr);

   // 'स्ट्रिंग' प्रकार के एक स्टेट चर 'संदेश' की घोषणा करता है।
   // स्टेट चर वे चर होते हैं जिनके मान अनुबंध भंडारण में स्थायी रूप से संग्रहीत होते हैं। कीवर्ड 'पब्लिक' चर को अनुबंध के बाहर से सुलभ बनाता है और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
   string public message;

   // कई वर्ग-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, एक कंस्ट्रक्टर एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
   // कंस्ट्रक्टर का उपयोग अनुबंध के डेटा को आरंभ करने के लिए किया जाता है। और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग तर्क 'initMessage' स्वीकार करता है और अनुबंध के 'संदेश' भंडारण चर में मान सेट करता है)।
      message = initMessage;
   }

   // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है और 'संदेश' भंडारण चर को अपडेट करता है।
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

यह एक बुनियादी स्मार्ट अनुबंध है जो निर्माण पर एक संदेश संग्रहीत करता है। इसे `update` फ़ंक्शन को कॉल करके अपडेट किया जा सकता है।

### चरण 11: मेटामास्क और अल्केमी को अपने प्रोजेक्ट से कनेक्ट करें {#step-11-connect-metamask-alchemy-to-your-project}

हमने एक मेटामास्क वॉलेट, अल्केमी खाता बनाया है, और अपना स्मार्ट अनुबंध लिखा है, अब तीनों को जोड़ने का समय है।

आपके वॉलेट से भेजे गए प्रत्येक लेनदेन के लिए आपकी अद्वितीय निजी कुंजी का उपयोग करके एक हस्ताक्षर की आवश्यकता होती है। हमारे प्रोग्राम को यह अनुमति प्रदान करने के लिए, हम अपनी निजी कुंजी को एक पर्यावरण फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं। हम यहां अल्केमी के लिए एक API कुंजी भी संग्रहीत करेंगे।

> लेन-देन भेजने के बारे में अधिक जानने के लिए, वेब3 का उपयोग करके लेन-देन भेजने पर [यह ट्यूटोरियल](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) देखें।

सबसे पहले, अपने प्रोजेक्ट डायरेक्टरी में dotenv पैकेज इंस्टॉल करें:

```
npm install dotenv --save
```

फिर, प्रोजेक्ट की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं। अपनी मेटामास्क निजी कुंजी और HTTP अल्केमी API URL इसमें जोड़ें।

आपकी पर्यावरण फ़ाइल का नाम `.env` होना चाहिए या इसे पर्यावरण फ़ाइल के रूप में नहीं पहचाना जाएगा।

इसे `process.env` या `.env-custom` या कुछ और नाम न दें।

- अपनी निजी कुंजी निर्यात करने के लिए [इन निर्देशों](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) का पालन करें
- HTTP अल्केमी API URL प्राप्त करने के लिए नीचे देखें

![](./get-alchemy-api-key.gif)

आपका `.env` इस तरह दिखना चाहिए:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

वास्तव में इन्हें हमारे कोड से जोड़ने के लिए, हम इन चरों को अपनी `hardhat.config.js` फ़ाइल में चरण 13 पर संदर्भित करेंगे।

### चरण 12: ईथर्स.जेएस इंस्टॉल करें {#step-12-install-ethersjs}

ईथर्स.जेएस एक लाइब्रेरी है जो अधिक उपयोगकर्ता अनुकूल तरीकों के साथ [मानक JSON-RPC विधियों](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) को लपेटकर एथेरियम से इंटरैक्ट करना और अनुरोध करना आसान बनाती है।

हार्डहैट हमें अतिरिक्त टूलींग और विस्तारित कार्यक्षमता के लिए [प्लगइन्स](https://hardhat.org/plugins/) को एकीकृत करने की अनुमति देता है। हम अनुबंध डिप्लॉयमेंट के लिए [ईथर प्लगइन](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) का लाभ उठाएंगे।

अपनी प्रोजेक्ट डायरेक्टरी में टाइप करें:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### चरण 13: hardhat.config.js को अपडेट करें {#step-13-update-hardhat-configjs}

हमने अब तक कई निर्भरताएँ और प्लगइन्स जोड़े हैं, अब हमें `hardhat.config.js` को अपडेट करने की आवश्यकता है ताकि हमारी परियोजना उन सभी के बारे में जान सके।

अपने `hardhat.config.js` को इस तरह दिखने के लिए अपडेट करें:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### चरण 14: हमारे अनुबंध को संकलित करें {#step-14-compile-our-contract}

यह सुनिश्चित करने के लिए कि अब तक सब कुछ काम कर रहा है, आइए हम अपने अनुबंध को कंपाइल करें। `compile` कार्य अंतर्निहित हार्डहैट कार्यों में से एक है।

कमांड लाइन से चलाएं:

```bash
npx hardhat compile
```

आपको `SPDX लाइसेंस पहचानकर्ता स्रोत फ़ाइल में प्रदान नहीं किया गया है` के बारे में एक चेतावनी मिल सकती है, लेकिन इसके बारे में चिंता करने की कोई आवश्यकता नहीं है - उम्मीद है कि बाकी सब कुछ अच्छा लगेगा! यदि नहीं, तो आप हमेशा [अल्केमी discord](https://discord.gg/u72VCg3) में संदेश भेज सकते हैं।

### चरण 15: हमारी डिप्लॉय स्क्रिप्ट लिखें {#step-15-write-our-deploy-script}

अब जब हमारा अनुबंध लिखा गया है और हमारी कॉन्फ़िगरेशन फ़ाइल तैयार है, तो हमारी अनुबंध डिप्लॉय स्क्रिप्ट लिखने का समय आ गया है।

`scripts/` फ़ोल्डर पर नेविगेट करें और `deploy.js` नामक एक नई फ़ाइल बनाएं, जिसमें निम्नलिखित सामग्री जोड़ें:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // परिनियोजन शुरू करें, एक वादा लौटाते हुए जो एक अनुबंध वस्तु में हल हो जाता है
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("अनुबंध पते पर तैनात किया गया:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

हार्डहैट अपने [अनुबंध ट्यूटोरियल](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) में कोड की इन पंक्तियों में से प्रत्येक क्या करता है, यह समझाने का एक अद्भुत काम करता है, हमने यहां उनकी व्याख्याओं को अपनाया है।

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js में एक `ContractFactory` नए स्मार्ट अनुबंधों को डिप्लॉय करने के लिए उपयोग किया जाने वाला एक सार है, इसलिए `HelloWorld` यहां हमारे हैलो वर्ल्ड अनुबंध के उदाहरणों के लिए एक [फ़ैक्टरी](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) है। `hardhat-ethers` प्लगइन `ContractFactory` और `Contract` का उपयोग करते समय, उदाहरण डिफ़ॉल्ट रूप से पहले हस्ताक्षरकर्ता (स्वामी) से जुड़े होते हैं।

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory` पर `deploy()` को कॉल करने से परिनियोजन शुरू हो जाएगा, और एक `Promise` वापस आ जाएगी जो `Contract` ऑब्जेक्ट में हल हो जाएगी। यह वह ऑब्जेक्ट है जिसमें हमारे प्रत्येक स्मार्ट अनुबंध फ़ंक्शन के लिए एक विधि है।

### चरण 16: हमारे अनुबंध को तैनात करें {#step-16-deploy-our-contract}

हम अंततः अपने स्मार्ट अनुबंध को डिप्लॉय करने के लिए तैयार हैं! कमांड लाइन पर नेविगेट करें और चलाएं:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

इसके बाद आपको कुछ इस तरह देखना चाहिए:

```bash
अनुबंध पते पर तैनात: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**कृपया इस पते को सेव करें**। हम इसका उपयोग बाद में ट्यूटोरियल में करेंगे।

यदि हम [Goerli etherscan](https://goerli.etherscan.io) पर जाते हैं और अपने अनुबंध पते की खोज करते हैं तो हमें यह देखने में सक्षम होना चाहिए कि इसे सफलतापूर्वक डिप्लॉय किया गया है। लेनदेन कुछ इस तरह दिखेगा:

![](./etherscan-contract.png)

`From` पता आपके मेटामास्क खाता पते से मेल खाना चाहिए और `To` पता **अनुबंध निर्माण** कहेगा। यदि हम लेनदेन में क्लिक करते हैं तो हम `To` फ़ील्ड में अपना अनुबंध पता देखेंगे।

![](./etherscan-transaction.png)

बधाई हो! आपने अभी-अभी एक एथेरियम टेस्टनेट पर एक स्मार्ट अनुबंध डिप्लॉय किया है।

यह समझने के लिए कि हुड के नीचे क्या हो रहा है, आइए हमारे [अल्केमी डैशबोर्ड](https://dashboard.alchemy.com/explorer) में एक्सप्लोरर टैब पर नेविगेट करें। यदि आपके पास कई अल्केमी ऐप्स हैं तो ऐप द्वारा फ़िल्टर करना सुनिश्चित करें और **हैलो वर्ल्ड** का चयन करें।

![](./hello-world-explorer.png)

यहां आपको कुछ JSON-RPC विधियां दिखाई देंगी जो हार्डहैट/Ethers ने हमारे लिए तब बनाई थीं जब हमने `.deploy()` फ़ंक्शन को कॉल किया था। यहां दो महत्वपूर्ण विधियां हैं [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction), जो हमारे अनुबंध को Goerli श्रृंखला पर लिखने का अनुरोध है, और [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash), जो हैश दिए जाने पर हमारे लेनदेन के बारे में जानकारी पढ़ने का अनुरोध है। लेन-देन भेजने के बारे में अधिक जानने के लिए, [वेब3 का उपयोग करके लेन-देन भेजने पर हमारा ट्यूटोरियल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) देखें।

## भाग 2: अपने स्मार्ट अनुबंध के साथ सहभागिता करें {#part-2-interact-with-your-smart-contract}

अब जब हमने Goerli नेटवर्क पर एक स्मार्ट अनुबंध सफलतापूर्वक तैनात कर लिया है, तो आइए जानें कि इसके साथ कैसे इंटरैक्ट किया जाए।

### एक interact.js फ़ाइल बनाएँ {#create-a-interactjs-file}

यह वह फ़ाइल है जहाँ हम अपनी इंटरैक्शन स्क्रिप्ट लिखेंगे। हम ईथर्स.जेएस लाइब्रेरी का उपयोग करेंगे जिसे आपने पहले भाग 1 में स्थापित किया था।

`scripts/`फ़ोल्डर के अंदर, `interact.js` नामक एक नई फ़ाइल बनाएँ, निम्नलिखित कोड जोड़ें:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### अपनी .env फ़ाइल अपडेट करें {#update-your-env-file}

हम नए पर्यावरण चर का उपयोग करेंगे, इसलिए हमें उन्हें `.env` फ़ाइल में परिभाषित करने की आवश्यकता है जिसे [हमने पहले बनाया था](#step-11-connect-metamask-&-alchemy-to-your-project)।

हमें अपने अल्केमी `API_KEY` और `CONTRACT_ADDRESS` के लिए एक परिभाषा जोड़ने की आवश्यकता होगी जहाँ आपका स्मार्ट अनुबंध डिप्लॉय किया गया था।

आपकी `.env` फ़ाइल कुछ इस तरह दिखनी चाहिए:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### अपना अनुबंध ABI प्राप्त करें {#grab-your-contract-ABI}

हमारा अनुबंध [ABI (एप्लिकेशन बाइनरी इंटरफ़ेस)](/glossary/#abi) हमारे स्मार्ट अनुबंध के साथ इंटरैक्ट करने का इंटरफ़ेस है। हार्डहैट स्वचालित रूप से एक ABI उत्पन्न करता है और इसे `HelloWorld.json` में सहेजता है। ABI का उपयोग करने के लिए, हमें अपनी `interact.js` फ़ाइल में कोड की निम्नलिखित पंक्तियाँ जोड़कर सामग्री को पार्स करना होगा:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

यदि आप ABI देखना चाहते हैं तो आप इसे अपने कंसोल पर प्रिंट कर सकते हैं:

```javascript
console.log(JSON.stringify(contract.abi))
```

कंसोल में अपना ABI मुद्रित देखने के लिए, अपने टर्मिनल पर नेविगेट करें और चलाएँ:

```bash
npx hardhat run scripts/interact.js
```

### अपने अनुबंध का एक उदाहरण बनाएँ {#create-an-instance-of-your-contract}

हमारे अनुबंध के साथ इंटरैक्ट करने के लिए, हमें अपने कोड में एक अनुबंध उदाहरण बनाने की आवश्यकता है। ईथर्स.जेएस के साथ ऐसा करने के लिए, हमें तीन अवधारणाओं के साथ काम करने की आवश्यकता होगी:

1. प्रदाता - एक नोड प्रदाता जो आपको ब्लॉकचेन तक पढ़ने और लिखने की सुविधा देता है
2. हस्ताक्षरकर्ता - एक एथेरियम खाते का प्रतिनिधित्व करता है जो लेनदेन पर हस्ताक्षर कर सकता है
3. अनुबंध - ऑनचेन तैनात एक विशिष्ट अनुबंध का प्रतिनिधित्व करने वाली एक ईथर्स.जेएस ऑब्जेक्ट

हम अनुबंध का उदाहरण बनाने के लिए पिछले चरण से अनुबंध ABI का उपयोग करेंगे:

```javascript
// interact.js

// प्रदाता
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// हस्ताक्षरकर्ता
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// अनुबंध
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

[ethers.js प्रलेखन](https://docs.ethers.io/v5/) में प्रदाताओं, हस्ताक्षरकर्ताओं और अनुबंधों के बारे में अधिक जानें।

### प्रारंभिक संदेश पढ़ें {#read-the-init-message}

याद रखें जब हमने `initMessage = "Hello world!"` के साथ अपना अनुबंध डिप्लॉय किया था? अब हम अपने स्मार्ट अनुबंध में संग्रहीत उस संदेश को पढ़ने और उसे कंसोल पर प्रिंट करने जा रहे हैं।

जावास्क्रिप्ट में, नेटवर्क के साथ इंटरैक्ट करते समय अतुल्यकालिक कार्यों का उपयोग किया जाता है। अतुल्यकालिक कार्यों के बारे में अधिक जानने के लिए, [यह मध्यम लेख पढ़ें](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)।

हमारे स्मार्ट अनुबंध में `message` फ़ंक्शन को कॉल करने और प्रारंभ संदेश को पढ़ने के लिए नीचे दिए गए कोड का उपयोग करें:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

टर्मिनल में `npx hardhat run scripts/interact.js` का उपयोग करके फ़ाइल चलाने के बाद हमें यह प्रतिक्रिया देखनी चाहिए:

```
संदेश है: हैलो वर्ल्ड!
```

बधाई हो! आपने अभी-अभी एथेरियम ब्लॉकचेन से स्मार्ट अनुबंध डेटा सफलतापूर्वक पढ़ा है, बहुत बढ़िया!

### संदेश अपडेट करें {#update-the-message}

सिर्फ संदेश पढ़ने के बजाय, हम `update` फ़ंक्शन का उपयोग करके अपने स्मार्ट अनुबंध में सहेजे गए संदेश को भी अपडेट कर सकते हैं! बहुत बढ़िया, है ना?

संदेश को अपडेट करने के लिए, हम सीधे अपने इंस्टेंटिएटेड अनुबंध ऑब्जेक्ट पर `update` फ़ंक्शन को कॉल कर सकते हैं:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

ध्यान दें कि पंक्ति 11 पर, हम लौटाए गए लेनदेन ऑब्जेक्ट पर `.wait()` पर कॉल करते हैं। यह सुनिश्चित करता है कि हमारी स्क्रिप्ट फ़ंक्शन से बाहर निकलने से पहले ब्लॉकचेन पर लेनदेन के खनन की प्रतीक्षा करती है। यदि `.wait()` कॉल शामिल नहीं है, तो स्क्रिप्ट अनुबंध में अपडेट किए गए `message` मान को नहीं देख सकती है।

### नया संदेश पढ़ें {#read-the-new-message}

आपको अपडेट किए गए `message` मान को पढ़ने के लिए [पिछला चरण](#read-the-init-message) दोहराने में सक्षम होना चाहिए। एक क्षण लें और देखें कि क्या आप उस नए मान को प्रिंट करने के लिए आवश्यक परिवर्तन कर सकते हैं!

यदि आपको किसी संकेत की आवश्यकता है, तो यहां बताया गया है कि आपकी `interact.js` फ़ाइल इस बिंदु पर कैसी दिखनी चाहिए:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// प्रदाता - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// हस्ताक्षरकर्ता - आप
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// अनुबंध उदाहरण
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

अब बस स्क्रिप्ट चलाएं और आपको पुराना संदेश, अपडेटिंग स्थिति और नया संदेश अपने टर्मिनल पर मुद्रित होना चाहिए!

`npx hardhat run scripts/interact.js --network goerli`

```
संदेश है: हैलो वर्ल्ड!
संदेश अपडेट हो रहा है...
नया संदेश है: यह नया संदेश है।
```

उस स्क्रिप्ट को चलाते समय, आप देख सकते हैं कि नया संदेश लोड होने से पहले `Updating the message...` चरण लोड होने में कुछ समय लगता है। यह खनन प्रक्रिया के कारण है; यदि आप लेन-देन को ट्रैक करने के बारे में उत्सुक हैं, जबकि वे खनन किए जा रहे हैं, तो लेन-देन की स्थिति देखने के लिए [अल्केमी mempool](https://dashboard.alchemyapi.io/mempool) पर जाएं। यदि लेन-देन गिरा दिया जाता है, तो [Goerli ईथरस्कैन](https://goerli.etherscan.io) की जाँच करना और अपने लेन-देन हैश की खोज करना भी सहायक होता है।

## भाग 3: अपने स्मार्ट अनुबंध को ईथरस्कैन पर प्रकाशित करें {#part-3-publish-your-smart-contract-to-etherscan}

आपने अपने स्मार्ट अनुबंध को जीवंत करने की सारी मेहनत की; अब इसे दुनिया के साथ साझा करने का समय है!

ईथरस्कैन पर अपने स्मार्ट अनुबंध को सत्यापित करके, कोई भी आपके स्रोत कोड को देख सकता है और आपके स्मार्ट अनुबंध के साथ इंटरैक्ट कर सकता है। चलिए शुरू करते हैं!

### चरण 1: अपने ईथरस्कैन खाते पर एक API कुंजी उत्पन्न करें {#step-1-generate-an-api-key-on-your-etherscan-account}

एक ईथरस्कैन API कुंजी यह सत्यापित करने के लिए आवश्यक है कि आप जिस स्मार्ट अनुबंध को प्रकाशित करने का प्रयास कर रहे हैं, उसके स्वामी हैं।

यदि आपके पास पहले से ईथरस्कैन खाता नहीं है, तो [एक खाते के लिए साइन अप करें](https://etherscan.io/register)।

लॉग इन करने के बाद, नेविगेशन बार में अपना उपयोगकर्ता नाम ढूंढें, उस पर होवर करें और **मेरी प्रोफ़ाइल** बटन का चयन करें।

आपके प्रोफ़ाइल पृष्ठ पर, आपको एक साइड नेविगेशन बार देखना चाहिए। साइड नेविगेशन बार से, **API कुंजियाँ** चुनें। अगला, एक नई API कुंजी बनाने के लिए "जोड़ें" बटन दबाएं, अपने ऐप को **hello-world** नाम दें और **नई API कुंजी बनाएं** बटन दबाएं।

आपकी नई API कुंजी API कुंजी तालिका में दिखाई देनी चाहिए। API कुंजी को अपने क्लिपबोर्ड पर कॉपी करें।

इसके बाद, हमें अपनी `.env` फ़ाइल में ईथरस्कैन API कुंजी जोड़नी होगी।

इसे जोड़ने के बाद, आपकी `.env` फ़ाइल इस तरह दिखनी चाहिए:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### हार्डहैट-डिप्लॉयड स्मार्ट अनुबंध {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan स्थापित करें {#install-hardhat-etherscan}

हार्डहैट का उपयोग करके ईथरस्कैन पर अपना अनुबंध प्रकाशित करना सीधा है। शुरू करने के लिए आपको पहले `hardhat-etherscan` प्लगइन स्थापित करना होगा। `hardhat-etherscan` स्वचालित रूप से स्मार्ट अनुबंध के स्रोत कोड और ईथरस्कैन पर ABI को सत्यापित करेगा। इसे जोड़ने के लिए, `hello-world` निर्देशिका में चलाएँ:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

एक बार स्थापित हो जाने के बाद, अपनी `hardhat.config.js` के शीर्ष पर निम्नलिखित कथन शामिल करें, और ईथरस्कैन कॉन्फ़िगरेशन विकल्प जोड़ें:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan के लिए आपकी API कुंजी
    // https://etherscan.io/ पर एक प्राप्त करें
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### ईथरस्कैन पर अपने स्मार्ट अनुबंध को सत्यापित करें {#verify-your-smart-contract-on-etherscan}

सुनिश्चित करें कि सभी फाइलें सहेजी गई हैं और सभी `.env` चर सही ढंग से कॉन्फ़िगर किए गए हैं।

`verify` कार्य चलाएँ, अनुबंध पता पास करें, और वह नेटवर्क जहाँ यह डिप्लॉय किया गया है:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

सुनिश्चित करें कि `DEPLOYED_CONTRACT_ADDRESS` Goerli टेस्ट नेटवर्क पर आपके डिप्लॉयड स्मार्ट अनुबंध का पता है। इसके अलावा, अंतिम तर्क (`'Hello World!'`) वही स्ट्रिंग मान होना चाहिए जिसका उपयोग [भाग 1 में डिप्लॉय चरण के दौरान](#write-our-deploy-script) किया गया था।

यदि सब कुछ ठीक रहा, तो आपको अपने टर्मिनल में निम्नलिखित संदेश दिखाई देगा:

```text
अनुबंध के लिए स्रोत कोड सफलतापूर्वक सबमिट किया गया
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
Etherscan पर सत्यापन के लिए। सत्यापन परिणाम की प्रतीक्षा में...


Etherscan पर HelloWorld अनुबंध सफलतापूर्वक सत्यापित किया गया।
https://goerli.etherscan.io/address/<contract-address>#contracts
```

बधाई हो! आपका स्मार्ट अनुबंध कोड ईथरस्कैन पर है!

### ईथरस्कैन पर अपना स्मार्ट अनुबंध देखें! {#check-out-your-smart-contract-on-etherscan}

जब आप अपने टर्मिनल में दिए गए लिंक पर नेविगेट करते हैं, तो आपको अपना स्मार्ट अनुबंध कोड और ABI ईथरस्कैन पर प्रकाशित होना चाहिए!

**बहुत बढ़िया - आपने कर दिखाया, चैंपियन! अब कोई भी आपके स्मार्ट अनुबंध को कॉल या लिख सकता है! हम यह देखने के लिए इंतजार नहीं कर सकते कि आप आगे क्या बनाते हैं!**

## भाग 4 - अपने स्मार्ट अनुबंध को फ्रंटएंड के साथ एकीकृत करना {#part-4-integrating-your-smart-contract-with-the-frontend}

इस ट्यूटोरियल के अंत तक, आप जानेंगे कि कैसे:

- एक मेटामास्क वॉलेट को अपने डैप से कनेक्ट करें
- [अल्केमी वेब3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API का उपयोग करके अपने स्मार्ट अनुबंध से डेटा पढ़ें
- मेटामास्क का उपयोग करके एथेरियम लेनदेन पर हस्ताक्षर करें

इस डैप के लिए, हम [रिएक्ट](https://react.dev/) को अपने फ्रंटएंड फ्रेमवर्क के रूप में उपयोग करेंगे; हालांकि, यह ध्यान रखना महत्वपूर्ण है कि हम इसकी बुनियादी बातों को तोड़ने में ज्यादा समय नहीं बिताएंगे, क्योंकि हम ज्यादातर अपने प्रोजेक्ट में वेब3 कार्यक्षमता लाने पर ध्यान केंद्रित करेंगे।

एक शर्त के रूप में, आपको रिएक्ट की शुरुआती स्तर की समझ होनी चाहिए। यदि नहीं, तो हम आधिकारिक [Intro to रिएक्ट tutorial](https://react.dev/learn) को पूरा करने की सलाह देते हैं।

### स्टार्टर फ़ाइलों को क्लोन करें {#clone-the-starter-files}

सबसे पहले, इस प्रोजेक्ट के लिए स्टार्टर फ़ाइलों को प्राप्त करने के लिए [hello-world-part-four गिटहब repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial) पर जाएँ और इस रिपॉजिटरी को अपनी स्थानीय मशीन पर क्लोन करें।

स्थानीय रूप से क्लोन किए गए भंडार को खोलें। ध्यान दें कि इसमें दो फ़ोल्डर हैं: `starter-files` और `completed`।

- `starter-files`- **हम इस डायरेक्टरी में काम करेंगे**, हम UI को आपके एथेरियम वॉलेट और [भाग 3](#part-3) में ईथरस्कैन पर प्रकाशित स्मार्ट अनुबंध से जोड़ेंगे।
- `completed` में पूरा ट्यूटोरियल शामिल है और इसे केवल संदर्भ के रूप में उपयोग किया जाना चाहिए यदि आप फंस जाते हैं।

अगला, `starter-files` की अपनी प्रति को अपने पसंदीदा कोड संपादक में खोलें, और फिर `src` फ़ोल्डर में नेविगेट करें।

हम जो भी कोड लिखेंगे वह `src` फोल्डर के अंतर्गत रहेगा। हम अपने प्रोजेक्ट को वेब3 कार्यक्षमता देने के लिए `HelloWorld.js` घटक और `util/interact.js` जावास्क्रिप्ट फ़ाइलों को संपादित करेंगे।

### स्टार्टर फ़ाइलों की जाँच करें {#check-out-the-starter-files}

कोडिंग शुरू करने से पहले, आइए जानें कि हमें स्टार्टर फ़ाइलों में क्या प्रदान किया गया है।

#### अपना react प्रोजेक्ट चलाएँ {#get-your-react-project-running}

आइए अपने ब्राउज़र में रिएक्ट प्रोजेक्ट चलाकर शुरू करें। रिएक्ट की खूबी यह है कि एक बार जब हमारा प्रोजेक्ट हमारे ब्राउज़र में चल रहा होता है, तो हमारे द्वारा सहेजे गए कोई भी परिवर्तन हमारे ब्राउज़र में लाइव अपडेट हो जाएँगे।

प्रोजेक्ट को चलाने के लिए, `starter-files` फ़ोल्डर की रूट डायरेक्टरी पर नेविगेट करें, और प्रोजेक्ट की निर्भरता को स्थापित करने के लिए अपने टर्मिनल में `npm install` चलाएँ:

```bash
cd starter-files
npm install
```

एक बार वे स्थापित हो जाने के बाद, अपने टर्मिनल में `npm start` चलाएँ:

```bash
npm start
```

ऐसा करने से आपके ब्राउज़र में [http://localhost:3000/](http://localhost:3000/) खुल जाना चाहिए, जहाँ आपको हमारे प्रोजेक्ट का फ्रंटएंड दिखाई देगा। इसमें एक फ़ील्ड (आपके स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करने के लिए एक जगह), एक "वॉलेट कनेक्ट करें" बटन, और एक "अपडेट करें" बटन होना चाहिए।

यदि आप किसी भी बटन पर क्लिक करने का प्रयास करते हैं, तो आप देखेंगे कि वे काम नहीं करते हैं - ऐसा इसलिए है क्योंकि हमें अभी भी उनकी कार्यक्षमता को प्रोग्राम करने की आवश्यकता है।

#### The `HelloWorld.js` घटक {#the-helloworld-js-component}

आइए अपने संपादक में `src` फ़ोल्डर में वापस जाएं और `HelloWorld.js` फ़ाइल खोलें। यह बहुत महत्वपूर्ण है कि हम इस फ़ाइल में सब कुछ समझें, क्योंकि यह प्राथमिक रिएक्ट घटक है जिस पर हम काम करेंगे।

इस फ़ाइल के शीर्ष पर, आप देखेंगे कि हमारे पास कई आयात कथन हैं जो हमारे प्रोजेक्ट को चलाने के लिए आवश्यक हैं, जिनमें रिएक्ट लाइब्रेरी, useEffect और useState हुक, `./util/interact.js` से कुछ आइटम (हम उन्हें जल्द ही और विस्तार से वर्णित करेंगे!), और अल्केमी लोगो शामिल हैं।

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

अगला, हमारे पास हमारे स्टेट चर हैं जिन्हें हम विशिष्ट घटनाओं के बाद अपडेट करेंगे।

```javascript
// HelloWorld.js

//स्टेट चर
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("नेटवर्क से कोई कनेक्शन नहीं है।")
const [newMessage, setNewMessage] = useState("")
```

यहाँ प्रत्येक चर का प्रतिनिधित्व क्या है:

- `walletAddress` - एक स्ट्रिंग जो यूज़र के वॉलेट पते को संग्रहीत करती है
- `status`- एक स्ट्रिंग जो एक उपयोगी संदेश संग्रहीत करती है जो उपयोगकर्ता को डैप के साथ इंटरैक्ट करने के तरीके पर मार्गदर्शन करती है
- `message` - एक स्ट्रिंग जो स्मार्ट अनुबंध में वर्तमान संदेश को संग्रहीत करती है
- `newMessage` - एक स्ट्रिंग जो नया संदेश संग्रहीत करती है जिसे स्मार्ट अनुबंध में लिखा जाएगा

स्टेट चर के बाद, आपको पाँच गैर-कार्यान्वित फ़ंक्शन दिखाई देंगे: `useEffect`, `addSmartContractListener`, `addWalletListener`, `connectWalletPressed`, और `onUpdatePressed`। हम नीचे बताएंगे कि वे क्या करते हैं:

```javascript
// HelloWorld.js

//केवल एक बार कॉल किया गया
useEffect(async () => {
  //TODO: लागू करें
}, [])

function addSmartContractListener() {
  //TODO: लागू करें
}

function addWalletListener() {
  //TODO: लागू करें
}

const connectWalletPressed = async () => {
  //TODO: लागू करें
}

const onUpdatePressed = async () => {
  //TODO: लागू करें
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- यह एक रिएक्ट हुक है जिसे आपके घटक के प्रस्तुत होने के बाद कॉल किया जाता है। क्योंकि इसमें एक खाली ऐरे `[]` प्रोप पास किया गया है (पंक्ति 4 देखें), इसे केवल घटक के _पहले_ रेंडर पर कॉल किया जाएगा। यहां हम अपने स्मार्ट अनुबंध में संग्रहीत वर्तमान संदेश को लोड करेंगे, अपने स्मार्ट अनुबंध और वॉलेट श्रोताओं को कॉल करेंगे, और यह प्रतिबिंबित करने के लिए कि क्या कोई वॉलेट पहले से जुड़ा हुआ है, अपनी UI को अपडेट करेंगे।
- `addSmartContractListener`- यह फ़ंक्शन एक श्रोता स्थापित करता है जो हमारे HelloWorld अनुबंध के `UpdatedMessages` इवेंट को देखेगा और हमारे स्मार्ट अनुबंध में संदेश बदलने पर हमारी UI को अपडेट करेगा।
- `addWalletListener`- यह फ़ंक्शन एक श्रोता स्थापित करता है जो उपयोगकर्ता के मेटामास्क वॉलेट की स्थिति में बदलाव का पता लगाता है, जैसे कि जब उपयोगकर्ता अपने वॉलेट को डिस्कनेक्ट करता है या पते बदलता है।
- `connectWalletPressed`- इस फ़ंक्शन को उपयोगकर्ता के मेटामास्क वॉलेट को हमारे डैप से जोड़ने के लिए कॉल किया जाएगा।
- `onUpdatePressed` - इस फ़ंक्शन को तब कॉल किया जाएगा जब उपयोगकर्ता स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करना चाहता है।

इस फ़ाइल के अंत के पास, हमारे पास हमारे घटक का UI है।

```javascript
// HelloWorld.js

//हमारे घटक का UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
</div>
 
</div>
)
```

यदि आप इस कोड को ध्यान से स्कैन करते हैं, तो आप देखेंगे कि हम अपनी UI में अपने विभिन्न स्टेट चर का उपयोग कहाँ करते हैं:

- पंक्ति 6-12 पर, यदि उपयोगकर्ता का वॉलेट जुड़ा हुआ है (यानी, `walletAddress.length > 0`), तो हम आईडी "walletButton" के साथ बटन में उपयोगकर्ता `walletAddress` का एक छोटा संस्करण प्रदर्शित करते हैं; अन्यथा यह बस "कनेक्ट वॉलेट" कहता है।
- पंक्ति 17 पर, हम स्मार्ट अनुबंध में संग्रहीत वर्तमान संदेश प्रदर्शित करते हैं, जिसे `message` स्ट्रिंग में कैप्चर किया जाता है।
- पंक्ति 23-26 पर, हम पाठ फ़ील्ड में इनपुट बदलने पर हमारे `newMessage` स्टेट चर को अपडेट करने के लिए एक [नियंत्रित घटक](https://legacy.reactjs.org/docs/forms.html#controlled-components) का उपयोग करते हैं।

हमारे स्टेट चर के अलावा, आप यह भी देखेंगे कि `connectWalletPressed` और `onUpdatePressed` फ़ंक्शन को तब कॉल किया जाता है जब क्रमशः `publishButton` और `walletButton` आईडी वाले बटन पर क्लिक किया जाता है।

अंत में, आइए संबोधित करें कि यह `HelloWorld.js` घटक कहाँ जोड़ा गया है।

यदि आप `App.js` फ़ाइल पर जाते हैं, जो रिएक्ट में मुख्य घटक है जो अन्य सभी घटकों के लिए एक कंटेनर के रूप में कार्य करता है, तो आप देखेंगे कि हमारा `HelloWorld.js` घटक पंक्ति 7 पर इंजेक्ट किया गया है।

अंतिम लेकिन कम से कम नहीं, आइए आपके लिए प्रदान की गई एक और फ़ाइल देखें, `interact.js` फ़ाइल।

#### `interact.js` फ़ाइल {#the-interact-js-file}

क्योंकि हम [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) प्रतिमान का पालन करना चाहते हैं, हम एक अलग फ़ाइल चाहेंगे जिसमें हमारे डैप के तर्क, डेटा और नियमों का प्रबंधन करने के लिए हमारे सभी फ़ंक्शन हों, और फिर उन फ़ंक्शन को हमारे फ्रंटएंड (हमारे `HelloWorld.js` घटक) में निर्यात करने में सक्षम हों।

👆🏽यही हमारी `interact.js` फ़ाइल का सटीक उद्देश्य है!

अपनी `src` डायरेक्टरी में `util` फ़ोल्डर पर नेविगेट करें, और आप देखेंगे कि हमने `interact.js` नामक एक फ़ाइल शामिल की है जिसमें हमारे सभी स्मार्ट अनुबंध इंटरैक्शन और वॉलेट फ़ंक्शन और चर होंगे।

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

आप फ़ाइल के शीर्ष पर देखेंगे कि हमने `helloWorldContract` ऑब्जेक्ट पर टिप्पणी की है। बाद में इस ट्यूटोरियल में, हम इस ऑब्जेक्ट पर से टिप्पणी हटा देंगे और इस चर में अपने स्मार्ट अनुबंध को इंस्टेंटिएट करेंगे, जिसे हम फिर अपने `HelloWorld.js` घटक में निर्यात करेंगे।

हमारे `helloWorldContract` ऑब्जेक्ट के बाद चार गैर-कार्यान्वित फ़ंक्शन निम्नलिखित करते हैं:

- `loadCurrentMessage` - यह फ़ंक्शन स्मार्ट अनुबंध में संग्रहीत वर्तमान संदेश को लोड करने के तर्क को संभालता है। यह [अल्केमी वेब3 API](https://github.com/alchemyplatform/alchemy-web3) का उपयोग करके हैलो वर्ल्ड स्मार्ट अनुबंध को एक _read_ कॉल करेगा।
- `connectWallet` - यह फ़ंक्शन उपयोगकर्ता के मेटामास्क को हमारे डैप से जोड़ेगा।
- `getCurrentWalletConnected` - यह फ़ंक्शन जाँच करेगा कि क्या कोई एथेरियम खाता पहले से ही हमारे डैप से पृष्ठ लोड पर जुड़ा हुआ है और तदनुसार हमारी UI को अपडेट करेगा।
- `updateMessage` - यह फ़ंक्शन स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करेगा। यह हैलो वर्ल्ड स्मार्ट अनुबंध को एक _write_ कॉल करेगा, इसलिए उपयोगकर्ता के मेटामास्क वॉलेट को संदेश को अपडेट करने के लिए एक एथेरियम लेनदेन पर हस्ताक्षर करना होगा।

अब जब हम समझते हैं कि हम किसके साथ काम कर रहे हैं, तो आइए जानें कि हमारे स्मार्ट अनुबंध से कैसे पढ़ा जाए!

### चरण 3: अपने स्मार्ट अनुबंध से पढ़ें {#step-3-read-from-your-smart-contract}

अपने स्मार्ट अनुबंध से पढ़ने के लिए, आपको सफलतापूर्वक सेट अप करना होगा:

- एथेरियम श्रृंखला के लिए एक API कनेक्शन
- आपके स्मार्ट अनुबंध का एक लोड किया गया उदाहरण
- आपके स्मार्ट अनुबंध फ़ंक्शन को कॉल करने के लिए एक फ़ंक्शन
- स्मार्ट अनुबंध से पढ़े जा रहे डेटा के बदलने पर अपडेट देखने के लिए एक श्रोता

यह बहुत सारे चरणों की तरह लग सकता है, लेकिन चिंता न करें! हम आपको बताएंगे कि उनमें से प्रत्येक को चरण-दर-चरण कैसे करना है! :\)

#### एथेरियम श्रृंखला के लिए एक API कनेक्शन स्थापित करें {#establish-an-api-connection-to-the-ethereum-chain}

तो याद रखें कि इस ट्यूटोरियल के भाग 2 में, हमने अपने स्मार्ट अनुबंध से पढ़ने के लिए अपनी [अल्केमी वेब3 कुंजी का उपयोग किया था](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)? श्रृंखला से पढ़ने के लिए आपको अपने डैप में एक अल्केमी वेब3 कुंजी की भी आवश्यकता होगी।

यदि आपके पास यह पहले से नहीं है, तो पहले [अल्केमी वेब3](https://github.com/alchemyplatform/alchemy-web3) को अपने `starter-files` की रूट डायरेक्टरी पर नेविगेट करके और अपने टर्मिनल में निम्नलिखित चलाकर स्थापित करें:

```text
npm install @alch/alchemy-web3
```

[अल्केमी वेब3](https://github.com/alchemyplatform/alchemy-web3) [वेब3.जेएस](https://docs.web3js.org/) के चारों ओर एक रैपर है, जो उन्नत API विधियों और अन्य महत्वपूर्ण लाभ प्रदान करता है ताकि आपका जीवन एक web3 डेवलपर के रूप में आसान हो सके। इसे न्यूनतम कॉन्फ़िगरेशन की आवश्यकता के लिए डिज़ाइन किया गया है ताकि आप इसे अपने ऐप में तुरंत उपयोग करना शुरू कर सकें!

फिर, अपने प्रोजेक्ट डायरेक्टरी में [dotenv](https://www.npmjs.com/package/dotenv) पैकेज स्थापित करें, ताकि हमारे पास अपनी API कुंजी प्राप्त करने के बाद उसे संग्रहीत करने के लिए एक सुरक्षित स्थान हो।

```text
npm install dotenv --save
```

हमारे डैप के लिए, **हम अपनी HTTP API कुंजी के बजाय अपनी Websockets API कुंजी का उपयोग करेंगे**, क्योंकि यह हमें एक श्रोता स्थापित करने की अनुमति देगा जो यह पता लगाता है कि स्मार्ट अनुबंध में संग्रहीत संदेश कब बदलता है।

एक बार जब आपके पास अपनी API कुंजी हो, तो अपनी रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं और उसमें अपना अल्केमी Websockets url जोड़ें। इसके बाद, आपकी `.env` फ़ाइल इस तरह दिखनी चाहिए:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

अब, हम अपने डैप में अपना अल्केमी वेब3 एंडपॉइंट सेट करने के लिए तैयार हैं! आइए हमारी `interact.js` पर वापस जाएं, जो हमारे `util` फ़ोल्डर के अंदर नेस्टेड है और फ़ाइल के शीर्ष पर निम्नलिखित कोड जोड़ें:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

ऊपर, हमने पहले अपनी `.env` फ़ाइल से अल्केमी कुंजी आयात की और फिर अपना अल्केमी वेब3 एंडपॉइंट स्थापित करने के लिए `createAlchemyWeb3` को अपनी `alchemyKey` पास की।

इस एंडपॉइंट के तैयार होने के साथ, यह हमारे स्मार्ट अनुबंध को लोड करने का समय है!

#### अपने हैलो वर्ल्ड स्मार्ट अनुबंध को लोड करना {#loading-your-hello-world-smart-contract}

अपने हैलो वर्ल्ड स्मार्ट अनुबंध को लोड करने के लिए, आपको इसके अनुबंध पते और ABI की आवश्यकता होगी, दोनों ही ईथरस्कैन पर मिल सकते हैं यदि आपने [इस ट्यूटोरियल का भाग 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) पूरा कर लिया है।

#### ईथरस्कैन से अपना अनुबंध ABI कैसे प्राप्त करें {#how-to-get-your-contract-abi-from-etherscan}

यदि आपने इस ट्यूटोरियल का भाग 3 छोड़ दिया है, तो आप पते [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) के साथ HelloWorld अनुबंध का उपयोग कर सकते हैं। इसका ABI [यहां](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) पाया जा सकता है।

एक अनुबंध ABI यह निर्दिष्ट करने के लिए आवश्यक है कि कोई अनुबंध किस फ़ंक्शन को लागू करेगा और यह सुनिश्चित करने के लिए कि फ़ंक्शन आपके द्वारा अपेक्षित प्रारूप में डेटा लौटाएगा। एक बार जब हम अपना अनुबंध ABI कॉपी कर लेते हैं, तो आइए इसे अपनी `src` डायरेक्टरी में `contract-abi.json` नामक JSON फ़ाइल के रूप में सहेजें।

आपकी contract-abi.json आपकी src फ़ोल्डर में संग्रहीत होनी चाहिए।

हमारे अनुबंध पते, ABI, और अल्केमी वेब3 एंडपॉइंट से लैस, हम अपने स्मार्ट अनुबंध का एक उदाहरण लोड करने के लिए [अनुबंध विधि](https://docs.web3js.org/api/web3-eth-contract/class/Contract) का उपयोग कर सकते हैं। अपने अनुबंध ABI को `interact.js` फ़ाइल में आयात करें और अपना अनुबंध पता जोड़ें।

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

अब हम अंततः अपने `helloWorldContract` चर पर से टिप्पणी हटा सकते हैं, और अपने AlchemyWeb3 एंडपॉइंट का उपयोग करके स्मार्ट अनुबंध को लोड कर सकते हैं:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

संक्षेप में, आपकी `interact.js` की पहली 12 पंक्तियाँ अब इस तरह दिखनी चाहिए:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

अब जब हमने अपना अनुबंध लोड कर लिया है, तो हम अपने `loadCurrentMessage` फ़ंक्शन को लागू कर सकते हैं!

#### अपनी `interact.js` फ़ाइल में `loadCurrentMessage` लागू करना {#implementing-loadCurrentMessage-in-your-interact-js-file}

यह फ़ंक्शन बहुत सरल है। हम अपने अनुबंध से पढ़ने के लिए एक सरल अतुल्यकालिक वेब3 कॉल करने जा रहे हैं। हमारा फ़ंक्शन स्मार्ट अनुबंध में संग्रहीत संदेश लौटाएगा:

अपनी `interact.js` फ़ाइल में `loadCurrentMessage` को निम्नलिखित में अपडेट करें:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

चूंकि हम इस स्मार्ट अनुबंध को अपनी UI में प्रदर्शित करना चाहते हैं, आइए अपने `HelloWorld.js` घटक में `useEffect` फ़ंक्शन को निम्नलिखित में अपडेट करें:

```javascript
// HelloWorld.js

//केवल एक बार कॉल किया गया
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

ध्यान दें, हम चाहते हैं कि हमारा `loadCurrentMessage` केवल घटक के पहले रेंडर के दौरान एक बार कॉल किया जाए। हम जल्द ही `addSmartContractListener` को लागू करेंगे ताकि स्मार्ट अनुबंध में संदेश बदलने के बाद UI स्वचालित रूप से अपडेट हो जाए।

हमारे श्रोता में गोता लगाने से पहले, आइए देखें कि हमारे पास अब तक क्या है! अपनी `HelloWorld.js` और `interact.js` फ़ाइलों को सहेजें, और फिर [http://localhost:3000/](http://localhost:3000/) पर जाएं

आप देखेंगे कि वर्तमान संदेश अब "नेटवर्क से कोई कनेक्शन नहीं है" नहीं कहता है। इसके बजाय यह स्मार्ट अनुबंध में संग्रहीत संदेश को दर्शाता है। बहुत बढ़िया!

#### आपकी UI अब स्मार्ट अनुबंध में संग्रहीत संदेश को प्रतिबिंबित करनी चाहिए {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

अब उस श्रोता की बात करते हैं...

#### `addSmartContractListener` लागू करें {#implement-addsmartcontractlistener}

यदि आप [इस ट्यूटोरियल श्रृंखला के भाग 1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) में लिखी गई `HelloWorld.sol` फ़ाइल के बारे में सोचते हैं, तो आपको याद होगा कि `UpdatedMessages` नामक एक स्मार्ट अनुबंध इवेंट है जो हमारे स्मार्ट अनुबंध के `update` फ़ंक्शन को लागू करने के बाद उत्सर्जित होता है (पंक्ति 9 और 27 देखें):

```javascript
// HelloWorld.sol

// सिमेंटिक वर्जनिंग का उपयोग करके, सॉलिडिटी के संस्करण को निर्दिष्ट करता है।
// और जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// 'HelloWorld' नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध कार्यों और डेटा (इसकी स्थिति) का एक संग्रह है। एक बार डिप्लॉय होने के बाद, एक अनुबंध एथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है। और जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //अपडेट फ़ंक्शन कॉल होने पर उत्सर्जित होता है
   //स्मार्ट अनुबंध इवेंट आपके अनुबंध के लिए यह संवाद करने का एक तरीका है कि ब्लॉकचेन पर आपके ऐप फ्रंट-एंड में कुछ हुआ है, जो कुछ इवेंट्स को 'सुन' सकता है और उनके होने पर कार्रवाई कर सकता है।
   event UpdatedMessages(string oldStr, string newStr);

   // 'स्ट्रिंग' प्रकार के एक स्टेट चर 'संदेश' की घोषणा करता है।
   // स्टेट चर वे चर होते हैं जिनके मान अनुबंध भंडारण में स्थायी रूप से संग्रहीत होते हैं। कीवर्ड 'पब्लिक' चर को अनुबंध के बाहर से सुलभ बनाता है और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
   string public message;

   // कई वर्ग-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, एक कंस्ट्रक्टर एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
   // कंस्ट्रक्टर का उपयोग अनुबंध के डेटा को आरंभ करने के लिए किया जाता है। और जानें: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग तर्क 'initMessage' स्वीकार करता है और अनुबंध के 'संदेश' भंडारण चर में मान सेट करता है)।
      message = initMessage;
   }

   // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है और 'संदेश' भंडारण चर को अपडेट करता है।
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

स्मार्ट अनुबंध इवेंट आपके अनुबंध के लिए यह संवाद करने का एक तरीका है कि ब्लॉकचेन पर आपके फ्रंट-एंड एप्लिकेशन में कुछ हुआ है (यानी, एक _इवेंट_ हुआ था), जो विशिष्ट इवेंट के लिए 'सुन' सकता है और उनके होने पर कार्रवाई कर सकता है।

`addSmartContractListener` फ़ंक्शन विशेष रूप से हमारे हैलो वर्ल्ड स्मार्ट अनुबंध के `UpdatedMessages` इवेंट को सुनेगा, और नए संदेश को प्रदर्शित करने के लिए हमारी UI को अपडेट करेगा।

`addSmartContractListener` को निम्नलिखित में संशोधित करें:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 आपका संदेश अपडेट कर दिया गया है!")
    }
  })
}
```

आइए तोड़ते हैं कि जब श्रोता एक घटना का पता लगाता है तो क्या होता है:

- यदि घटना उत्सर्जित होने पर कोई त्रुटि होती है, तो यह हमारे `status` स्टेट चर के माध्यम से UI में परिलक्षित होगी।
- अन्यथा, हम लौटाए गए `data` ऑब्जेक्ट का उपयोग करेंगे। `data.returnValues` शून्य पर अनुक्रमित एक सरणी है जहां सरणी में पहला तत्व पिछला संदेश संग्रहीत करता है और दूसरा तत्व अद्यतन एक को संग्रहीत करता है। कुल मिलाकर, एक सफल घटना पर हम अपनी `message` स्ट्रिंग को अपडेट किए गए संदेश पर सेट करेंगे, `newMessage` स्ट्रिंग को साफ़ करेंगे, और यह दर्शाने के लिए कि हमारे स्मार्ट अनुबंध पर एक नया संदेश प्रकाशित किया गया है, अपने `status` स्टेट चर को अपडेट करेंगे।

अंत में, आइए अपने श्रोता को हमारे `useEffect` फ़ंक्शन में कॉल करें ताकि यह `HelloWorld.js` घटक के पहले रेंडर पर आरंभ हो जाए। कुल मिलाकर, आपका `useEffect` फ़ंक्शन इस तरह दिखना चाहिए:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

अब जब हम अपने स्मार्ट अनुबंध से पढ़ने में सक्षम हैं, तो यह पता लगाना बहुत अच्छा होगा कि इसे कैसे लिखा जाए! हालाँकि, हमारे डैप पर लिखने के लिए, हमारे पास पहले इससे जुड़ा एक एथेरियम वॉलेट होना चाहिए।

तो, आगे हम अपना एथेरियम वॉलेट (मेटामास्क) सेट करेंगे और फिर इसे अपने डैप से जोड़ेंगे!

### चरण 4: अपना एथेरियम वॉलेट सेट करें {#step-4-set-up-your-ethereum-wallet}

एथेरियम श्रृंखला पर कुछ भी लिखने के लिए, उपयोगकर्ताओं को अपने वर्चुअल वॉलेट की निजी कुंजी का उपयोग करके लेनदेन पर हस्ताक्षर करना होगा। इस ट्यूटोरियल के लिए, हम [मेटामास्क](https://metamask.io/) का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके एथेरियम खाता पते को प्रबंधित करने के लिए किया जाता है, क्योंकि यह अंतिम-उपयोगकर्ता के लिए इस लेनदेन पर हस्ताक्षर करना बहुत आसान बनाता है।

यदि आप यह समझना चाहते हैं कि एथेरियम पर लेनदेन कैसे काम करते हैं, तो एथेरियम फाउंडेशन से [यह पेज](/developers/docs/transactions/) देखें।

#### मेटामास्क डाउनलोड करें {#download-metamask}

आप [यहां](https://metamask.io/download) मुफ्त में मेटामास्क खाता डाउनलोड और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो ऊपरी दाएं कोने में "Goerli टेस्ट नेटवर्क" पर स्विच करना सुनिश्चित करें (ताकि हम असली पैसे से काम न कर रहे हों)।

#### एक फॉसेट से ईथर जोड़ें {#add-ether-from-a-faucet}

एथेरियम ब्लॉकचेन पर एक लेनदेन पर हस्ताक्षर करने के लिए, हमें कुछ नकली Eth की आवश्यकता होगी। Eth प्राप्त करने के लिए आप [FaucETH](https://fauceth.komputing.org) पर जा सकते हैं और अपना Goerli खाता पता दर्ज कर सकते हैं, "फंड का अनुरोध करें" पर क्लिक करें, फिर ड्रॉपडाउन में "एथेरियम टेस्टनेट Goerli" का चयन करें और अंत में फिर से "फंड का अनुरोध करें" बटन पर क्लिक करें। आपको जल्द ही अपने मेटामास्क खाते में Eth दिखना चाहिए!

#### अपना बैलेंस जांचें {#check-your-balance}

यह सुनिश्चित करने के लिए कि हमारा बैलेंस वहाँ है, चलिए [अल्केमी के कंपोजर टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) का उपयोग करके एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) अनुरोध करें। यह हमारे वॉलेट में Eth की मात्रा लौटाएगा। जब आप अपना मेटामास्क खाता पता इनपुट करते हैं और "Send Request" पर क्लिक करते हैं, तो आपको इस तरह का एक जवाब देखना चाहिए:

```text
{\"jsonrpc\": \"2.0\", \"id\": 0, \"result\": \"0xde0b6b3a7640000\"}
```

**ध्यान दें:** यह परिणाम eth में नहीं, wei में है। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। wei से eth में रूपांतरण है: 1 eth = 10¹⁸ wei। तो अगर हम 0xde0b6b3a7640000 को दशमलव में बदलते हैं तो हमें 1\*10¹⁸ मिलता है जो 1 eth के बराबर है।

उफ्फ! हमारा नकली पैसा सब वहाँ है! 🤑

### चरण 5: मेटामास्क को अपनी UI से कनेक्ट करें {#step-5-connect-metamask-to-your-UI}

अब जब हमारा मेटामास्क वॉलेट सेट हो गया है, तो चलिए अपने डैप को इससे कनेक्ट करते हैं!

#### `connectWallet` फ़ंक्शन {#the-connectWallet-function}

हमारी `interact.js` फ़ाइल में, आइए `connectWallet` फ़ंक्शन को लागू करें, जिसे हम फिर अपने `HelloWorld.js` घटक में कॉल कर सकते हैं।

आइए `connectWallet` को निम्नलिखित में संशोधित करें:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 ऊपर दिए गए टेक्स्ट-फील्ड में एक संदेश लिखें।",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              आपको अपने ब्राउज़र में MetaMask, एक वर्चुअल एथेरियम वॉलेट स्थापित करना होगा।
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

तो कोड का यह विशाल ब्लॉक वास्तव में क्या करता है?

खैर, सबसे पहले, यह जांचता है कि आपके ब्राउज़र में `window.ethereum` सक्षम है या नहीं।

`window.ethereum` मेटामास्क और अन्य वॉलेट प्रदाताओं द्वारा इंजेक्ट किया गया एक वैश्विक API है जो वेबसाइटों को यूज़र्स के एथेरियम खातों का अनुरोध करने की अनुमति देता है। यदि अनुमोदित हो, तो यह उन ब्लॉकचेन से डेटा पढ़ सकता है जिनसे उपयोगकर्ता जुड़ा हुआ है, और सुझाव दे सकता है कि उपयोगकर्ता संदेशों और लेनदेन पर हस्ताक्षर करे। अधिक जानकारी के लिए [मेटामास्क दस्तावेज़](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) देखें!

यदि `window.ethereum` मौजूद _नहीं_ है, तो इसका मतलब है कि मेटामास्क इंस्टॉल नहीं है। इसके परिणामस्वरूप एक JSON ऑब्जेक्ट वापस कर दिया जाता है, जहाँ लौटाया गया `address` एक खाली स्ट्रिंग है, और `status` JSX ऑब्जेक्ट यह बताता है कि यूज़र को मेटामास्क इंस्टॉल करना होगा।

अब यदि `window.ethereum` मौजूद _है_, तो चीजें दिलचस्प हो जाती हैं।

एक try/catch लूप का उपयोग करके, हम [`window.ethereum.request({ method: \"eth_requestAccounts\" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) को कॉल करके मेटामास्क से कनेक्ट करने का प्रयास करेंगे। इस फ़ंक्शन को कॉल करने से ब्राउज़र में मेटामास्क खुल जाएगा, जिससे यूज़र को अपने वॉलेट को आपके डैप से कनेक्ट करने के लिए प्रेरित किया जाएगा।

- यदि उपयोगकर्ता कनेक्ट करने का विकल्प चुनता है, तो `method: "eth_requestAccounts"` एक सरणी लौटाएगा जिसमें डैप से जुड़े उपयोगकर्ता के सभी खाता पते होंगे। कुल मिलाकर, हमारा `connectWallet` फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जिसमें इस ऐरे में _पहला_ `पता` (पंक्ति 9 देखें) और एक `स्थिति` संदेश होगा जो यूज़र को स्मार्ट अनुबंध को एक संदेश लिखने के लिए प्रेरित करता है।
- यदि यूज़र कनेक्शन को अस्वीकार कर देता है, तो JSON ऑब्जेक्ट में लौटाए गए `पते` के लिए एक खाली स्ट्रिंग और एक `स्थिति` संदेश होगा जो यह दर्शाता है कि यूज़र ने कनेक्शन को अस्वीकार कर दिया है।

अब जब हमने यह `connectWallet` फ़ंक्शन लिख लिया है, तो अगला चरण इसे हमारे `HelloWorld.js` घटक पर कॉल करना है।

#### `connectWallet` फ़ंक्शन को अपने `HelloWorld.js` UI घटक में जोड़ें {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js` में `connectWalletPressed` फ़ंक्शन पर नेविगेट करें, और इसे निम्नलिखित में अपडेट करें:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

ध्यान दें कि हमारी अधिकांश कार्यक्षमता `interact.js` फ़ाइल से हमारे `HelloWorld.js` घटक से कैसे दूर कर दी गई है? यह इसलिए है ताकि हम M-V-C प्रतिमान का अनुपालन करें!

`connectWalletPressed` में, हम बस अपने आयातित `connectWallet` फ़ंक्शन को एक await कॉल करते हैं, और इसकी प्रतिक्रिया का उपयोग करके, हम अपने `status` और `walletAddress` चर को उनके स्थिति हुक के माध्यम से अपडेट करते हैं।

अब, आइए दोनों फ़ाइलों (`HelloWorld.js` और `interact.js`) को सहेजें और अब तक हमारी UI का परीक्षण करें।

[http://localhost:3000/](http://localhost:3000/) पृष्ठ पर अपना ब्राउज़र खोलें, और पृष्ठ के ऊपरी दाएं कोने में "कनेक्ट वॉलेट" बटन दबाएं।

यदि आपने मेटामास्क इंस्टॉल किया है, तो आपको अपने वॉलेट को अपने डैप से कनेक्ट करने के लिए प्रेरित किया जाना चाहिए। कनेक्ट करने के लिए निमंत्रण स्वीकार करें।

आपको देखना चाहिए कि वॉलेट बटन अब यह दर्शाता है कि आपका पता जुड़ा हुआ है! यस 🔥

अगला, पृष्ठ को रीफ्रेश करने का प्रयास करें... यह अजीब है। हमारा वॉलेट बटन हमें मेटामास्क से कनेक्ट करने के लिए कह रहा है, भले ही यह पहले से ही जुड़ा हुआ है...

हालाँकि, कोई डर नहीं! हम आसानी से इसका समाधान कर सकते हैं (समझ गए?) `getCurrentWalletConnected` को लागू करके, जो जांच करेगा कि क्या कोई पता पहले से ही हमारे डैप से जुड़ा हुआ है और तदनुसार हमारी UI को अपडेट करेगा!

#### `getCurrentWalletConnected` फ़ंक्शन {#the-getcurrentwalletconnected-function}

`interact.js` फ़ाइल में अपने `getCurrentWalletConnected` फ़ंक्शन को निम्नलिखित में अपडेट करें:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 ऊपर दिए गए टेक्स्ट-फील्ड में एक संदेश लिखें।",
        }
      } else {
        return {
          address: "",
          status: "🦊 ऊपरी दाएं बटन का उपयोग करके MetaMask से कनेक्ट करें।",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              आपको अपने ब्राउज़र में MetaMask, एक वर्चुअल एथेरियम वॉलेट स्थापित करना होगा।
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

यह कोड पिछले चरण में लिखे गए `connectWallet` फ़ंक्शन के _बहुत_ समान है।

मुख्य अंतर यह है कि `eth_requestAccounts` विधि को कॉल करने के बजाय, जो यूज़र को अपने वॉलेट को कनेक्ट करने के लिए मेटामास्क खोलता है, यहाँ हम `eth_accounts` विधि को कॉल करते हैं, जो बस एक ऐरे लौटाता है जिसमें वर्तमान में हमारे डैप से जुड़े मेटामास्क पते होते हैं।

इस फ़ंक्शन को क्रिया में देखने के लिए, आइए इसे हमारे `HelloWorld.js` घटक के `useEffect` फ़ंक्शन में कॉल करें:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

ध्यान दें, हम अपने `walletAddress` और `status` स्थिति चर को अपडेट करने के लिए `getCurrentWalletConnected` पर हमारी कॉल की प्रतिक्रिया का उपयोग करते हैं।

अब जब आपने यह कोड जोड़ लिया है, तो आइए अपनी ब्राउज़र विंडो को रीफ्रेश करने का प्रयास करें।

बहुत बढ़िया! बटन को कहना चाहिए कि आप जुड़े हुए हैं, और अपने जुड़े हुए वॉलेट के पते का पूर्वावलोकन दिखाएं - भले ही आप रीफ्रेश करें!

#### `addWalletListener` लागू करें {#implement-addwalletlistener}

हमारे डैप वॉलेट सेटअप में अंतिम चरण वॉलेट श्रोता को लागू करना है ताकि हमारा UI तब अपडेट हो जब हमारे वॉलेट की स्थिति बदल जाए, जैसे कि जब यूज़र डिस्कनेक्ट हो जाता है या खाते बदलता है।

अपनी `HelloWorld.js` फ़ाइल में, अपने `addWalletListener` फ़ंक्शन को इस प्रकार संशोधित करें:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 ऊपर दिए गए टेक्स्ट-फील्ड में एक संदेश लिखें।")
      } else {
        setWallet("")
        setStatus("🦊 ऊपरी दाएं बटन का उपयोग करके MetaMask से कनेक्ट करें।")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          आपको अपने ब्राउज़र में MetaMask, एक वर्चुअल एथेरियम वॉलेट स्थापित करना होगा।
        </a>
      </p>
    )
  }
}
```

मुझे यकीन है कि आपको इस बिंदु पर यह समझने के लिए हमारी मदद की भी आवश्यकता नहीं है कि यहाँ क्या हो रहा है, लेकिन पूरी तरह से उद्देश्यों के लिए, आइए इसे जल्दी से तोड़ दें:

- सबसे पहले, हमारा फ़ंक्शन जांचता है कि क्या `window.ethereum` सक्षम है (यानी, मेटामास्क इंस्टॉल है)।
  - यदि यह नहीं है, तो हम बस अपने `status` स्थिति चर को एक JSX स्ट्रिंग पर सेट करते हैं जो यूज़र को मेटामास्क इंस्टॉल करने के लिए प्रेरित करता है।
  - यदि यह सक्षम है, तो हम श्रोता `window.ethereum.on("accountsChanged")` को लाइन 3 पर सेट करते हैं जो मेटामास्क वॉलेट में स्थिति परिवर्तनों को सुनता है, जिसमें जब यूज़र डैप में एक अतिरिक्त खाता जोड़ता है, खाते बदलता है, या एक खाता डिस्कनेक्ट करता है। यदि कम से कम एक खाता जुड़ा हुआ है, तो `walletAddress` स्थिति चर को श्रोता द्वारा लौटाए गए `accounts` ऐरे में पहले खाते के रूप में अपडेट किया जाता है। अन्यथा, `walletAddress` को एक खाली स्ट्रिंग के रूप में सेट किया जाता है।

अंतिम लेकिन कम से कम नहीं, हमें इसे अपने `useEffect` फ़ंक्शन में कॉल करना होगा:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

और बस इतना ही! हमने अपनी सभी वॉलेट कार्यक्षमता को सफलतापूर्वक प्रोग्राम कर लिया है! अब हमारे अंतिम कार्य पर: हमारे स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करना!

### चरण 6: `updateMessage` फ़ंक्शन लागू करें {#step-6-implement-the-updateMessage-function}

ठीक है दोस्तों, हम अंतिम चरण पर आ गए हैं! आपकी `interact.js` फ़ाइल के `updateMessage` में, हम निम्नलिखित करने जा रहे हैं:

1. सुनिश्चित करें कि हम अपने स्मार्ट संपर्क में जो संदेश प्रकाशित करना चाहते हैं, वह मान्य है
2. मेटामास्क का उपयोग करके हमारे लेनदेन पर हस्ताक्षर करें
3. इस फ़ंक्शन को हमारे `HelloWorld.js` फ्रंटएंड घटक से कॉल करें

इसमें ज्यादा समय नहीं लगेगा; आइए इस डैप को पूरा करें!

#### इनपुट त्रुटि हैंडलिंग {#input-error-handling}

स्वाभाविक रूप से, फ़ंक्शन की शुरुआत में किसी प्रकार का इनपुट त्रुटि प्रबंधन होना समझ में आता है।

हम चाहेंगे कि हमारा फ़ंक्शन जल्दी लौट आए यदि कोई मेटामास्क एक्सटेंशन स्थापित नहीं है, कोई वॉलेट जुड़ा नहीं है (यानी, पास किया गया `address` एक खाली स्ट्रिंग है), या `message` एक खाली स्ट्रिंग है। आइए `updateMessage` में निम्नलिखित त्रुटि प्रबंधन जोड़ें:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 ब्लॉकचेन पर संदेश को अपडेट करने के लिए अपना MetaMask वॉलेट कनेक्ट करें।",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ आपका संदेश एक खाली स्ट्रिंग नहीं हो सकता है।",
    }
  }
}
```

अब जब इसमें उचित इनपुट त्रुटि प्रबंधन है, तो मेटामास्क के माध्यम से लेनदेन पर हस्ताक्षर करने का समय है!

#### हमारे लेनदेन पर हस्ताक्षर करना {#signing-our-transaction}

यदि आप पहले से ही पारंपरिक वेब3 एथेरियम लेनदेन से सहज हैं, तो हम जो कोड आगे लिखेंगे वह बहुत परिचित होगा। अपने इनपुट त्रुटि प्रबंधन कोड के नीचे, `updateMessage` में निम्नलिखित जोड़ें:

```javascript
// interact.js

//लेनदेन पैरामीटर सेट करें
const transactionParameters = {
  to: contractAddress, // अनुबंध प्रकाशनों के दौरान छोड़कर आवश्यक है।
  from: address, // उपयोगकर्ता के सक्रिय पते से मेल खाना चाहिए।
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//लेनदेन पर हस्ताक्षर करें
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          Etherscan पर अपने लेनदेन की स्थिति देखें!
        </a>
        <br />
        ℹ️ एक बार नेटवर्क द्वारा लेनदेन सत्यापित हो जाने पर, संदेश स्वचालित रूप से अपडेट हो जाएगा।
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

आइए तोड़ते हैं कि क्या हो रहा है। सबसे पहले, हम अपने लेनदेन पैरामीटर सेट करते हैं, जहाँ:

- `to` प्राप्तकर्ता का पता निर्दिष्ट करता है (हमारा स्मार्ट अनुबंध)
- `from` लेनदेन के हस्ताक्षरकर्ता को निर्दिष्ट करता है, `address` चर हमने अपने फ़ंक्शन में पास किया है
- `data` में हमारे हैलो वर्ल्ड स्मार्ट अनुबंध के `update` विधि के लिए कॉल होता है, जो इनपुट के रूप में हमारे `message` स्ट्रिंग चर को प्राप्त करता है

फिर, हम एक await कॉल, `window.ethereum.request` करते हैं, जहाँ हम मेटामास्क से लेनदेन पर हस्ताक्षर करने के लिए कहते हैं। ध्यान दें, पंक्तियों 11 और 12 पर, हम अपनी eth विधि, `eth_sendTransaction` निर्दिष्ट कर रहे हैं और अपने `transactionParameters` में पास कर रहे हैं।

इस बिंदु पर, मेटामास्क ब्राउज़र में खुल जाएगा, और यूज़र को लेनदेन पर हस्ताक्षर करने या अस्वीकार करने के लिए प्रेरित करेगा।

- यदि लेनदेन सफल होता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जहाँ `status` JSX स्ट्रिंग उपयोगकर्ता को उनके लेनदेन के बारे में अधिक जानकारी के लिए ईथरस्कैन देखने के लिए प्रेरित करती है।
- यदि लेनदेन विफल हो जाता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट लौटाएगा जहाँ `status` स्ट्रिंग त्रुटि संदेश को रिले करती है।

कुल मिलाकर, हमारा `updateMessage` फ़ंक्शन इस तरह दिखना चाहिए:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //इनपुट त्रुटि प्रबंधन
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 ब्लॉकचेन पर संदेश को अपडेट करने के लिए अपना MetaMask वॉलेट कनेक्ट करें।",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ आपका संदेश एक खाली स्ट्रिंग नहीं हो सकता है।",
    }
  }

  //लेनदेन पैरामीटर सेट करें
  const transactionParameters = {
    to: contractAddress, // अनुबंध प्रकाशनों के दौरान छोड़कर आवश्यक है।
    from: address, // उपयोगकर्ता के सक्रिय पते से मेल खाना चाहिए।
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //लेनदेन पर हस्ताक्षर करें
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            Etherscan पर अपने लेनदेन की स्थिति देखें!
          </a>
          <br />
          ℹ️ एक बार नेटवर्क द्वारा लेनदेन सत्यापित हो जाने पर, संदेश स्वचालित रूप से अपडेट हो जाएगा।
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

अंतिम लेकिन कम से कम नहीं, हमें अपने `updateMessage` फ़ंक्शन को हमारे `HelloWorld.js` घटक से कनेक्ट करने की आवश्यकता है।

#### `updateMessage` को `HelloWorld.js` फ्रंटएंड से कनेक्ट करें {#connect-updatemessage-to-the-helloworld-js-frontend}

हमारे `onUpdatePressed` फ़ंक्शन को आयातित `updateMessage` फ़ंक्शन पर एक await कॉल करना चाहिए और `status` स्टेट चर को यह दर्शाने के लिए संशोधित करना चाहिए कि हमारा लेनदेन सफल हुआ या विफल:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

यह बहुत साफ और सरल है। और अनुमान लगाओ क्या... आपका डैप पूरा हो गया है!!!

आगे बढ़ें और **अपडेट करें** बटन का परीक्षण करें!

### अपना खुद का कस्टम डैप बनाएं {#make-your-own-custom-dapp}

वाह, आप ट्यूटोरियल के अंत तक पहुंच गए! संक्षेप में, आपने सीखा कि कैसे:

- अपने डैप प्रोजेक्ट से एक मेटामास्क वॉलेट कनेक्ट करें
- [अल्केमी वेब3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API का उपयोग करके अपने स्मार्ट अनुबंध से डेटा पढ़ें
- मेटामास्क का उपयोग करके एथेरियम लेनदेन पर हस्ताक्षर करें

अब आप इस ट्यूटोरियल से अपने खुद के कस्टम डैप प्रोजेक्ट को बनाने के लिए कौशल लागू करने के लिए पूरी तरह से सुसज्जित हैं! हमेशा की तरह, यदि आपके कोई प्रश्न हैं, तो [अल्केमी डिस्कॉर्ड](https://discord.gg/gWuC7zB) में मदद के लिए हमसे संपर्क करने में संकोच न करें। 🧙‍♂️

एक बार जब आप यह ट्यूटोरियल पूरा कर लेते हैं, तो हमें बताएं कि आपका अनुभव कैसा रहा या यदि आपके पास कोई प्रतिक्रिया है तो हमें ट्विटर पर [@alchemyplatform](https://twitter.com/AlchemyPlatform) टैग करके बताएं!
