---
title: शुरुआती लोगों के लिए हैलो वर्ल्ड स्मार्ट अनुबंध - फुलस्टैक
description: इथेरियम पर एक सरल स्मार्ट अनुबंध लिखने और तैनात करने पर परिचयात्मक ट्यूटोरियल।
author: "nstrike2"
breadcrumb: हैलो वर्ल्ड फुलस्टैक
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "स्मार्ट अनुबंध",
    "तैनाती",
    "ब्लॉक एक्सप्लोरर",
    "फ्रंटएंड",
    "लेन-देन",
    "फ्रेमवर्क",
  ]
skill: beginner
lang: hi
published: 2021-10-25
---

यह गाइड आपके लिए है यदि आप ब्लॉकचेन विकास में नए हैं और नहीं जानते कि कहां से शुरू करें या स्मार्ट अनुबंधों को कैसे तैनात करें और उनके साथ कैसे इंटरैक्ट करें। हम [मेटामास्क](https://metamask.io), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), और [Alchemy](https://alchemy.com/eth) का उपयोग करके गोएर्ली टेस्ट नेटवर्क पर एक सरल स्मार्ट अनुबंध बनाने और तैनात करने की प्रक्रिया से गुजरेंगे।

इस ट्यूटोरियल को पूरा करने के लिए आपको एक Alchemy खाते की आवश्यकता होगी। [मुफ्त खाते के लिए साइन अप करें](https://www.alchemy.com/)।

यदि किसी भी बिंदु पर आपके कोई प्रश्न हैं, तो बेझिझक [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संपर्क करें!

## भाग 1 - Hardhat का उपयोग करके अपना स्मार्ट अनुबंध बनाएं और तैनात करें {#part-1}

### इथेरियम नेटवर्क से जुड़ें {#connect-to-the-ethereum-network}

इथेरियम चेन पर अनुरोध करने के कई तरीके हैं। सरलता के लिए, हम Alchemy पर एक मुफ़्त खाते का उपयोग करेंगे, जो एक ब्लॉकचेन डेवलपर प्लेटफ़ॉर्म और API है जो हमें स्वयं नोड चलाए बिना इथेरियम चेन के साथ संवाद करने की अनुमति देता है। Alchemy में निगरानी और विश्लेषण के लिए डेवलपर टूल भी हैं; हम इस ट्यूटोरियल में इनका लाभ उठाएंगे ताकि यह समझ सकें कि हमारे स्मार्ट अनुबंध की तैनाती में आंतरिक रूप से (under the hood) क्या हो रहा है।

### अपना ऐप और API कुंजी बनाएं {#create-your-app-and-api-key}

एक बार जब आप Alchemy खाता बना लेते हैं, तो आप एक ऐप बनाकर API कुंजी उत्पन्न कर सकते हैं। यह आपको गोएर्ली टेस्टनेट पर अनुरोध करने की अनुमति देगा। यदि आप टेस्टनेट से परिचित नहीं हैं तो आप [नेटवर्क चुनने के लिए Alchemy की मार्गदर्शिका पढ़ सकते हैं](https://www.alchemy.com/docs/choosing-a-web3-network)।

Alchemy डैशबोर्ड पर, नेविगेशन बार में **Apps** ड्रॉपडाउन खोजें और **Create App** पर क्लिक करें।

![Hello world create app](./hello-world-create-app.png)

अपने ऐप को '_Hello World_' नाम दें और एक संक्षिप्त विवरण लिखें। अपने वातावरण के रूप में **Staging** और अपने नेटवर्क के रूप में **Goerli** चुनें।

![create app view hello world](./create-app-view-hello-world.png)

_नोट: **Goerli** चुनना सुनिश्चित करें, अन्यथा यह ट्यूटोरियल काम नहीं करेगा।_

**Create app** पर क्लिक करें। आपका ऐप नीचे दी गई तालिका में दिखाई देगा।

### एक इथेरियम खाता बनाएं {#create-an-ethereum-account}

लेन-देन भेजने और प्राप्त करने के लिए आपको एक इथेरियम खाते की आवश्यकता है। हम मेटामास्क का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जो उपयोगकर्ताओं को अपने इथेरियम खाता पता प्रबंधित करने देता है।

आप [यहाँ](https://metamask.io/download) मुफ़्त में मेटामास्क खाता डाउनलोड कर सकते हैं और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो सुनिश्चित करें कि आप ऊपरी दाएं कोने में "Goerli Test Network" पर स्विच करें (ताकि हम असली पैसे के साथ काम न कर रहे हों)।

### चरण 4: फॉसेट से ईथर जोड़ें {#step-4-add-ether-from-a-faucet}

अपने स्मार्ट अनुबंध को टेस्ट नेटवर्क पर तैनात करने के लिए, आपको कुछ नकली ETH की आवश्यकता होगी। गोएर्ली नेटवर्क पर ETH प्राप्त करने के लिए, गोएर्ली फॉसेट पर जाएं और अपना गोएर्ली खाता पता दर्ज करें। ध्यान दें कि गोएर्ली फॉसेट हाल ही में थोड़े अविश्वसनीय हो सकते हैं - आज़माने के विकल्पों की सूची के लिए [टेस्ट नेटवर्क पृष्ठ](/developers/docs/networks/#goerli) देखें:

_नोट: नेटवर्क की भीड़ के कारण, इसमें कुछ समय लग सकता है।_
``

### चरण 5: अपना बैलेंस जांचें {#step-5-check-your-balance}

यह दोबारा जांचने के लिए कि ETH आपके वॉलेट में है, आइए [Alchemy के कंपोज़र टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) का उपयोग करके एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) अनुरोध करें। यह हमारे वॉलेट में ETH की मात्रा वापस कर देगा। अधिक जानने के लिए [कंपोज़र टूल का उपयोग करने के तरीके पर Alchemy का संक्षिप्त ट्यूटोरियल](https://youtu.be/r6sjRxBZJuU) देखें।

अपना मेटामास्क खाता पता दर्ज करें और **Send Request** पर क्लिक करें। आपको एक प्रतिक्रिया दिखाई देगी जो नीचे दिए गए कोड स्निपेट जैसी दिखती है।

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _नोट: यह परिणाम wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है।_

उफ़! हमारा सारा नकली पैसा वहीं है।

### चरण 6: हमारे प्रोजेक्ट को प्रारंभ करें {#step-6-initialize-our-project}

सबसे पहले, हमें अपने प्रोजेक्ट के लिए एक फ़ोल्डर बनाना होगा। अपनी कमांड लाइन पर जाएं और निम्नलिखित इनपुट करें।

```
mkdir hello-world
cd hello-world
```

अब जब हम अपने प्रोजेक्ट फ़ोल्डर के अंदर हैं, तो हम प्रोजेक्ट को प्रारंभ करने के लिए `npm init` का उपयोग करेंगे।

> यदि आपने अभी तक npm स्थापित नहीं किया है, तो [Node.js और npm स्थापित करने के लिए इन निर्देशों](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) का पालन करें।

इस ट्यूटोरियल के उद्देश्य के लिए, इससे कोई फर्क नहीं पड़ता कि आप प्रारंभिक प्रश्नों का उत्तर कैसे देते हैं। संदर्भ के लिए हमने इसे इस प्रकार किया है:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json को स्वीकृत करें और हम आगे बढ़ने के लिए तैयार हैं!

### चरण 7: Hardhat डाउनलोड करें {#step-7-download-hardhat}

Hardhat आपके इथेरियम सॉफ़्टवेयर को संकलित करने, तैनात करने, परीक्षण करने और डीबग करने के लिए एक विकास वातावरण है। यह लाइव चेन पर तैनात करने से पहले स्थानीय रूप से स्मार्ट अनुबंध और विकेंद्रीकृत एप्लिकेशन (dapp) बनाते समय डेवलपर्स की मदद करता है।

हमारे `hello-world` प्रोजेक्ट के अंदर चलाएं:

```
npm install --save-dev hardhat
```

[स्थापना निर्देशों](https://hardhat.org/getting-started/#overview) पर अधिक जानकारी के लिए इस पृष्ठ को देखें।

### चरण 8: Hardhat प्रोजेक्ट बनाएं {#step-8-create-hardhat-project}

हमारे `hello-world` प्रोजेक्ट फ़ोल्डर के अंदर, चलाएं:

```
npx hardhat
```

इसके बाद आपको एक स्वागत संदेश और यह चुनने का विकल्प दिखाई देगा कि आप क्या करना चाहते हैं। "create an empty hardhat.config.js" चुनें:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

यह प्रोजेक्ट में एक `hardhat.config.js` फ़ाइल उत्पन्न करेगा। हम इस ट्यूटोरियल में बाद में अपने प्रोजेक्ट के लिए सेटअप निर्दिष्ट करने के लिए इसका उपयोग करेंगे।

### चरण 9: प्रोजेक्ट फ़ोल्डर जोड़ें {#step-9-add-project-folders}

प्रोजेक्ट को व्यवस्थित रखने के लिए, आइए दो नए फ़ोल्डर बनाएं। कमांड लाइन में, अपने `hello-world` प्रोजेक्ट की रूट डायरेक्टरी पर जाएं और टाइप करें:

```
mkdir contracts
mkdir scripts
```

- `contracts/` वह जगह है जहां हम अपनी hello world स्मार्ट अनुबंध कोड फ़ाइल रखेंगे
- `scripts/` वह जगह है जहां हम अपने अनुबंध को तैनात करने और उसके साथ बातचीत करने के लिए स्क्रिप्ट रखेंगे

### चरण 10: अपना अनुबंध लिखें {#step-10-write-our-contract}

आप खुद से पूछ रहे होंगे, हम कोड कब लिखने जा रहे हैं? अब समय आ गया है!

अपने पसंदीदा संपादक में hello-world प्रोजेक्ट खोलें। स्मार्ट अनुबंध आमतौर पर Solidity में लिखे जाते हैं, जिसका उपयोग हम अपना स्मार्ट अनुबंध लिखने के लिए करेंगे।‌

1. `contracts` फ़ोल्डर पर जाएं और `HelloWorld.sol` नामक एक नई फ़ाइल बनाएं
2. नीचे एक नमूना Hello World स्मार्ट अनुबंध है जिसका उपयोग हम इस ट्यूटोरियल के लिए करेंगे। नीचे दी गई सामग्री को `HelloWorld.sol` फ़ाइल में कॉपी करें।

_नोट: यह अनुबंध क्या करता है, यह समझने के लिए टिप्पणियों को पढ़ना सुनिश्चित करें।_

```
// सिमेंटिक वर्ज़निंग का उपयोग करके, Solidity का संस्करण निर्दिष्ट करता है।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध फ़ंक्शन और डेटा (इसकी स्थिति) का एक संग्रह है। एक बार तैनात होने के बाद, एक अनुबंध इथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है। अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //जब अपडेट फ़ंक्शन को कॉल किया जाता है तब उत्सर्जित होता है
   //स्मार्ट अनुबंध ईवेंट आपके अनुबंध के लिए यह संवाद करने का एक तरीका है कि ब्लॉकचेन पर कुछ हुआ है जो आपके ऐप फ्रंट-एंड को बताता है, जो कुछ ईवेंट के लिए 'सुन' सकता है और उनके होने पर कार्रवाई कर सकता है।
   event UpdatedMessages(string oldStr, string newStr);

   // `string` प्रकार के एक स्थिति चर `message` की घोषणा करता है।
   // स्थिति चर वे चर होते हैं जिनके मान स्थायी रूप से अनुबंध स्टोरेज में संग्रहीत होते हैं। कीवर्ड `public` चर को अनुबंध के बाहर से सुलभ बनाता है और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
   string public message;

   // कई क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, एक कंस्ट्रक्टर एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
   // कंस्ट्रक्टर का उपयोग अनुबंध के डेटा को प्रारंभ करने के लिए किया जाता है। अधिक जानें:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग तर्क `initMessage` स्वीकार करता है और मान को अनुबंध के `message` स्टोरेज चर में सेट करता है)।
      message = initMessage;
   }

   // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है और `message` स्टोरेज चर को अपडेट करता है।
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

यह एक बुनियादी स्मार्ट अनुबंध है जो निर्माण पर एक संदेश संग्रहीत करता है। इसे `update` फ़ंक्शन को कॉल करके अपडेट किया जा सकता है।

### चरण 11: मेटामास्क और Alchemy को अपने प्रोजेक्ट से कनेक्ट करें {#step-11-connect-metamask-alchemy-to-your-project}

हमने एक मेटामास्क वॉलेट, Alchemy खाता बनाया है, और अपना स्मार्ट अनुबंध लिखा है, अब इन तीनों को जोड़ने का समय आ गया है।

आपके वॉलेट से भेजे गए प्रत्येक लेन-देन के लिए आपकी अद्वितीय निजी कुंजी का उपयोग करके हस्ताक्षर की आवश्यकता होती है। हमारे प्रोग्राम को यह अनुमति प्रदान करने के लिए, हम अपनी निजी कुंजी को एक पर्यावरण (environment) फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं। हम यहां Alchemy के लिए एक API कुंजी भी संग्रहीत करेंगे।

> लेन-देन भेजने के बारे में अधिक जानने के लिए, Web3 का उपयोग करके लेन-देन भेजने पर [यह ट्यूटोरियल](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) देखें।

सबसे पहले, अपनी प्रोजेक्ट डायरेक्टरी में dotenv पैकेज स्थापित करें:

```
npm install dotenv --save
```

फिर, प्रोजेक्ट की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं। इसमें अपनी मेटामास्क निजी कुंजी और HTTP Alchemy API URL जोड़ें।

आपकी पर्यावरण फ़ाइल का नाम `.env` होना चाहिए अन्यथा इसे पर्यावरण फ़ाइल के रूप में मान्यता नहीं दी जाएगी।

इसे `process.env` या `.env-custom` या कुछ और नाम न दें।

- अपनी निजी कुंजी निर्यात करने के लिए [इन निर्देशों](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) का पालन करें
- HTTP Alchemy API URL प्राप्त करने के लिए नीचे देखें

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

आपका `.env` इस तरह दिखना चाहिए:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

वास्तव में इन्हें हमारे कोड से जोड़ने के लिए, हम चरण 13 पर अपनी `hardhat.config.js` फ़ाइल में इन चरों का संदर्भ देंगे।

### चरण 12: Ethers.js स्थापित करें {#step-12-install-ethersjs}

Ethers.js एक लाइब्रेरी है जो [मानक JSON-RPC विधियों](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) को अधिक उपयोगकर्ता के अनुकूल विधियों के साथ लपेटकर इथेरियम के साथ बातचीत करना और अनुरोध करना आसान बनाती है।

Hardhat हमें अतिरिक्त टूलिंग और विस्तारित कार्यक्षमता के लिए [प्लगइन्स](https://hardhat.org/plugins/) को एकीकृत करने की अनुमति देता है। हम अनुबंध तैनाती के लिए [Ethers प्लगइन](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) का लाभ उठाएंगे।

अपनी प्रोजेक्ट डायरेक्टरी में टाइप करें:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### चरण 13: hardhat.config.js को अपडेट करें {#step-13-update-hardhat-configjs}

हमने अब तक कई निर्भरताएं और प्लगइन्स जोड़े हैं, अब हमें `hardhat.config.js` को अपडेट करने की आवश्यकता है ताकि हमारे प्रोजेक्ट को उन सभी के बारे में पता चल सके।

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

### चरण 14: अपना अनुबंध संकलित करें {#step-14-compile-our-contract}

यह सुनिश्चित करने के लिए कि अब तक सब कुछ काम कर रहा है, आइए अपने अनुबंध को संकलित करें। `compile` कार्य अंतर्निहित Hardhat कार्यों में से एक है।

कमांड लाइन से चलाएं:

```bash
npx hardhat compile
```

आपको `SPDX license identifier not provided in source file` के बारे में एक चेतावनी मिल सकती है, लेकिन इसके बारे में चिंता करने की कोई आवश्यकता नहीं है — उम्मीद है कि बाकी सब कुछ अच्छा लग रहा है! यदि नहीं, तो आप हमेशा [Alchemy डिस्कॉर्ड](https://discord.gg/u72VCg3) में संदेश भेज सकते हैं।

### चरण 15: अपनी तैनाती स्क्रिप्ट लिखें {#step-15-write-our-deploy-script}

अब जब हमारा अनुबंध लिखा जा चुका है और हमारी कॉन्फ़िगरेशन फ़ाइल तैयार है, तो यह हमारी अनुबंध तैनाती स्क्रिप्ट लिखने का समय है।

`scripts/` फ़ोल्डर पर जाएं और `deploy.js` नामक एक नई फ़ाइल बनाएं, इसमें निम्नलिखित सामग्री जोड़ें:

```javascript
async function main() {
  const HelloWorld = await ethers.getअनुबंधFactory("HelloWorld")

  // तैनाती शुरू करें, एक प्रॉमिस लौटाते हुए जो एक अनुबंध ऑब्जेक्ट में रिज़ॉल्व होता है
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat अपने [अनुबंध ट्यूटोरियल](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) में यह समझाने का एक अद्भुत काम करता है कि कोड की इनमें से प्रत्येक पंक्ति क्या करती है, हमने यहां उनके स्पष्टीकरण को अपनाया है।

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js में एक `ContractFactory` नए स्मार्ट अनुबंधों को तैनात करने के लिए उपयोग किया जाने वाला एक एब्स्ट्रैक्शन है, इसलिए यहां `HelloWorld` हमारे hello world अनुबंध के उदाहरणों के लिए एक [फ़ैक्टरी](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) है। `hardhat-ethers` प्लगइन `ContractFactory` और `Contract` का उपयोग करते समय, उदाहरण डिफ़ॉल्ट रूप से पहले हस्ताक्षरकर्ता (मालिक) से जुड़े होते हैं।

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory` पर `deploy()` को कॉल करने से तैनाती शुरू हो जाएगी, और एक `Promise` वापस आ जाएगा जो एक `Contract` ऑब्जेक्ट में रिज़ॉल्व होता है। यह वह ऑब्जेक्ट है जिसमें हमारे प्रत्येक स्मार्ट अनुबंध फ़ंक्शन के लिए एक विधि है।

### चरण 16: अपना अनुबंध तैनात करें {#step-16-deploy-our-contract}

हम अंततः अपना स्मार्ट अनुबंध तैनात करने के लिए तैयार हैं! कमांड लाइन पर जाएं और चलाएं:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

इसके बाद आपको कुछ ऐसा दिखाई देना चाहिए:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**कृपया इस पते को सहेजें**। हम ट्यूटोरियल में बाद में इसका उपयोग करेंगे।

यदि हम [गोएर्ली Etherscan](https://goerli.etherscan.io) पर जाते हैं और अपने अनुबंध पते की खोज करते हैं तो हमें यह देखने में सक्षम होना चाहिए कि इसे सफलतापूर्वक तैनात किया गया है। लेन-देन कुछ इस तरह दिखेगा:

![](./etherscan-contract.png)

`From` पता आपके मेटामास्क खाता पते से मेल खाना चाहिए और `To` पते पर **Contract Creation** लिखा होगा। यदि हम लेन-देन पर क्लिक करते हैं तो हम `To` फ़ील्ड में अपना अनुबंध पता देखेंगे।

![](./etherscan-transaction.png)

बधाई हो! आपने अभी-अभी एक इथेरियम टेस्टनेट पर एक स्मार्ट अनुबंध तैनात किया है।

आंतरिक रूप से (under the hood) क्या हो रहा है, यह समझने के लिए, आइए अपने [Alchemy डैशबोर्ड](https://dashboard.alchemy.com/explorer) में एक्सप्लोरर टैब पर जाएं। यदि आपके पास कई Alchemy ऐप हैं तो ऐप द्वारा फ़िल्टर करना सुनिश्चित करें और **Hello World** चुनें।

![](./hello-world-explorer.png)

यहां आपको कुछ JSON-RPC विधियां दिखाई देंगी जो Hardhat/Ethers ने हमारे लिए आंतरिक रूप से बनाई थीं जब हमने `.deploy()` फ़ंक्शन को कॉल किया था। यहां दो महत्वपूर्ण विधियां [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) हैं, जो हमारे अनुबंध को गोएर्ली चेन पर लिखने का अनुरोध है, और [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) है, जो हैश दिए जाने पर हमारे लेन-देन के बारे में जानकारी पढ़ने का अनुरोध है। लेन-देन भेजने के बारे में अधिक जानने के लिए, [Web3 का उपयोग करके लेन-देन भेजने पर हमारा ट्यूटोरियल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) देखें।

## भाग 2: अपने स्मार्ट अनुबंध के साथ इंटरैक्ट करें {#part-2-interact-with-your-smart-contract}

अब जब हमने गोएर्ली नेटवर्क पर सफलतापूर्वक एक स्मार्ट अनुबंध तैनात कर दिया है, तो आइए जानें कि इसके साथ कैसे इंटरैक्ट किया जाए।

### एक interact.js फ़ाइल बनाएं {#create-a-interactjs-file}

यह वह फ़ाइल है जहाँ हम अपनी इंटरैक्शन स्क्रिप्ट लिखेंगे। हम Ethers.js लाइब्रेरी का उपयोग करेंगे जिसे आपने पहले भाग 1 में इंस्टॉल किया था।

`scripts/` फ़ोल्डर के अंदर, `interact.js` नाम की एक नई फ़ाइल बनाएं और निम्नलिखित कोड जोड़ें:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### अपनी .env फ़ाइल को अपडेट करें {#update-your-env-file}

हम नए एनवायरनमेंट वेरिएबल्स का उपयोग करेंगे, इसलिए हमें उन्हें उस `.env` फ़ाइल में परिभाषित करने की आवश्यकता है जिसे [हमने पहले बनाया था](#step-11-connect-metamask-alchemy-to-your-project)।

हमें अपने Alchemy `API_KEY` और उस `CONTRACT_ADDRESS` के लिए एक परिभाषा जोड़ने की आवश्यकता होगी जहाँ आपका स्मार्ट अनुबंध तैनात किया गया था।

आपकी `.env` फ़ाइल कुछ इस तरह दिखनी चाहिए:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### अपने अनुबंध का ABI प्राप्त करें {#grab-your-contract-abi}

हमारे अनुबंध का [ABI (एप्लिकेशन बाइनरी इंटरफ़ेस)](/glossary/#abi) हमारे स्मार्ट अनुबंध के साथ इंटरैक्ट करने का इंटरफ़ेस है। Hardhat स्वचालित रूप से एक ABI जनरेट करता है और इसे `HelloWorld.json` में सहेजता है। ABI का उपयोग करने के लिए, हमें अपनी `interact.js` फ़ाइल में कोड की निम्नलिखित पंक्तियों को जोड़कर सामग्री को पार्स करना होगा:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

यदि आप ABI देखना चाहते हैं तो आप इसे अपने कंसोल पर प्रिंट कर सकते हैं:

```javascript
console.log(JSON.stringify(contract.abi))
```

अपने ABI को कंसोल पर प्रिंट होते देखने के लिए, अपने टर्मिनल पर जाएं और रन करें:

```bash
npx hardhat run scripts/interact.js
```

### अपने अनुबंध का एक इंस्टेंस बनाएं {#create-an-instance-of-your-contract}

अपने अनुबंध के साथ इंटरैक्ट करने के लिए, हमें अपने कोड में एक अनुबंध इंस्टेंस बनाने की आवश्यकता है। Ethers.js के साथ ऐसा करने के लिए, हमें तीन अवधारणाओं के साथ काम करना होगा:

1. प्रदाता - एक नोड प्रदाता जो आपको ब्लॉकचेन पर पढ़ने और लिखने का एक्सेस देता है
2. हस्ताक्षरकर्ता - एक इथेरियम खाते का प्रतिनिधित्व करता है जो लेन-देन पर हस्ताक्षर कर सकता है
3. Contract - एक Ethers.js ऑब्जेक्ट जो ऑनचेन तैनात किसी विशिष्ट अनुबंध का प्रतिनिधित्व करता है

हम अनुबंध का अपना इंस्टेंस बनाने के लिए पिछले चरण से अनुबंध ABI का उपयोग करेंगे:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

[ethers.js दस्तावेज़](https://docs.ethers.io/v5/) में Providers, Signers और Contracts के बारे में अधिक जानें।

### init संदेश पढ़ें {#read-the-init-message}

याद है जब हमने `initMessage = "Hello world!"` के साथ अपना अनुबंध तैनात किया था? अब हम अपने स्मार्ट अनुबंध में संग्रहीत उस संदेश को पढ़ने जा रहे हैं और इसे कंसोल पर प्रिंट करेंगे।

JavaScript में, नेटवर्क के साथ इंटरैक्ट करते समय एसिंक्रोनस फ़ंक्शंस का उपयोग किया जाता है। एसिंक्रोनस फ़ंक्शंस के बारे में अधिक जानने के लिए, [यह मीडियम लेख पढ़ें](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)।

हमारे स्मार्ट अनुबंध में `message` फ़ंक्शन को कॉल करने और init संदेश पढ़ने के लिए नीचे दिए गए कोड का उपयोग करें:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

टर्मिनल में `npx hardhat run scripts/interact.js` का उपयोग करके फ़ाइल को रन करने के बाद हमें यह प्रतिक्रिया दिखनी चाहिए:

```
संदेश है: Hello world!
```

बधाई हो! आपने अभी-अभी इथेरियम ब्लॉकचेन से स्मार्ट अनुबंध डेटा को सफलतापूर्वक पढ़ा है, बहुत बढ़िया!

### संदेश को अपडेट करें {#update-the-message}

केवल संदेश पढ़ने के बजाय, हम `update` फ़ंक्शन का उपयोग करके अपने स्मार्ट अनुबंध में सहेजे गए संदेश को अपडेट भी कर सकते हैं! बहुत बढ़िया है, है ना?

संदेश को अपडेट करने के लिए, हम सीधे अपने इंस्टेंशिएटेड Contract ऑब्जेक्ट पर `update` फ़ंक्शन को कॉल कर सकते हैं:

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

ध्यान दें कि लाइन 11 पर, हम लौटाए गए लेन-देन ऑब्जेक्ट पर `.wait()` को कॉल करते हैं। यह सुनिश्चित करता है कि हमारी स्क्रिप्ट फ़ंक्शन से बाहर निकलने से पहले ब्लॉकचेन पर लेन-देन के माइन होने की प्रतीक्षा करे। यदि `.wait()` कॉल शामिल नहीं है, तो स्क्रिप्ट अनुबंध में अपडेट किए गए `message` मान को नहीं देख पाएगी।

### नया संदेश पढ़ें {#read-the-new-message}

अपडेट किए गए `message` मान को पढ़ने के लिए आपको [पिछले चरण](#read-the-init-message) को दोहराने में सक्षम होना चाहिए। थोड़ा समय लें और देखें कि क्या आप उस नए मान को प्रिंट करने के लिए आवश्यक बदलाव कर सकते हैं!

यदि आपको किसी संकेत की आवश्यकता है, तो इस बिंदु पर आपकी `interact.js` फ़ाइल कुछ इस तरह दिखनी चाहिए:

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

// अनुबंध इंस्टेंस
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

अब बस स्क्रिप्ट को रन करें और आप अपने टर्मिनल पर पुराना संदेश, अपडेटिंग स्थिति और नया संदेश प्रिंट होते हुए देख पाएंगे!

`npx hardhat run scripts/interact.js --network goerli`

```
संदेश है: Hello World!
संदेश अपडेट हो रहा है...
नया संदेश है: This is the new message.
```

उस स्क्रिप्ट को रन करते समय, आप देख सकते हैं कि नया संदेश लोड होने से पहले `Updating the message...` चरण लोड होने में थोड़ा समय लेता है। ऐसा माइनिंग प्रक्रिया के कारण होता है; यदि आप लेन-देन के माइन होने के दौरान उन्हें ट्रैक करने के बारे में उत्सुक हैं, तो लेन-देन की स्थिति देखने के लिए [Alchemy मेमपूल](https://dashboard.alchemyapi.io/mempool) पर जाएं। यदि लेन-देन ड्रॉप हो जाता है, तो [गोएर्ली Etherscan](https://goerli.etherscan.io) की जांच करना और अपने लेन-देन हैश को खोजना भी मददगार होता है।

## भाग 3: अपने स्मार्ट अनुबंध को Etherscan पर प्रकाशित करें {#part-3-publish-your-smart-contract-to-etherscan}

आपने अपने स्मार्ट अनुबंध को जीवंत करने के लिए बहुत मेहनत की है; अब इसे दुनिया के साथ साझा करने का समय आ गया है!

Etherscan पर अपने स्मार्ट अनुबंध को सत्यापित करके, कोई भी आपके स्रोत कोड (source code) को देख सकता है और आपके स्मार्ट अनुबंध के साथ इंटरैक्ट कर सकता है। चलिए शुरू करते हैं!

### चरण 1: अपने Etherscan खाते पर एक API कुंजी जनरेट करें {#step-1-generate-an-api-key-on-your-etherscan-account}

यह सत्यापित करने के लिए कि आप उस स्मार्ट अनुबंध के स्वामी हैं जिसे आप प्रकाशित करने का प्रयास कर रहे हैं, एक Etherscan API कुंजी आवश्यक है।

यदि आपके पास पहले से Etherscan खाता नहीं है, तो [एक खाते के लिए साइन अप करें](https://etherscan.io/register)।

लॉग इन करने के बाद, नेविगेशन बार में अपना उपयोगकर्ता नाम (username) खोजें, उस पर होवर करें और **My profile** बटन चुनें।

अपने प्रोफ़ाइल पृष्ठ पर, आपको एक साइड नेविगेशन बार दिखाई देगा। साइड नेविगेशन बार से, **API Keys** चुनें। इसके बाद, एक नई API कुंजी बनाने के लिए "Add" बटन दबाएं, अपने ऐप का नाम **hello-world** रखें और **Create New API Key** बटन दबाएं।

आपकी नई API कुंजी API कुंजी तालिका में दिखाई देनी चाहिए। API कुंजी को अपने क्लिपबोर्ड पर कॉपी करें।

इसके बाद, हमें Etherscan API कुंजी को अपनी `.env` फ़ाइल में जोड़ना होगा।

इसे जोड़ने के बाद, आपकी `.env` फ़ाइल इस तरह दिखनी चाहिए:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat द्वारा तैनात स्मार्ट अनुबंध {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan इंस्टॉल करें {#install-hardhat-etherscan}

Hardhat का उपयोग करके अपने अनुबंध को Etherscan पर प्रकाशित करना सीधा और आसान है। शुरू करने के लिए आपको सबसे पहले `hardhat-etherscan` प्लगइन इंस्टॉल करना होगा। `hardhat-etherscan` स्वचालित रूप से Etherscan पर स्मार्ट अनुबंध के स्रोत कोड और ABI को सत्यापित करेगा। इसे जोड़ने के लिए, `hello-world` डायरेक्टरी में यह चलाएं:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

एक बार इंस्टॉल हो जाने के बाद, अपनी `hardhat.config.js` के शीर्ष पर निम्नलिखित कथन शामिल करें, और Etherscan कॉन्फ़िगरेशन विकल्प जोड़ें:

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

#### Etherscan पर अपने स्मार्ट अनुबंध को सत्यापित करें {#verify-your-smart-contract-on-etherscan}

सुनिश्चित करें कि सभी फ़ाइलें सहेजी गई हैं और सभी `.env` चर (variables) सही ढंग से कॉन्फ़िगर किए गए हैं।

अनुबंध का पता, और उस नेटवर्क को पास करते हुए जहां इसे तैनात किया गया है, `verify` कार्य चलाएं:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

सुनिश्चित करें कि `DEPLOYED_CONTRACT_ADDRESS` गोएर्ली टेस्ट नेटवर्क पर आपके तैनात स्मार्ट अनुबंध का पता है। इसके अलावा, अंतिम तर्क (argument) (`'Hello World!'`) वही स्ट्रिंग मान होना चाहिए जिसका उपयोग [भाग 1 में तैनाती चरण के दौरान](#step-15-write-our-deploy-script) किया गया था।

यदि सब कुछ ठीक रहा, तो आपको अपने टर्मिनल में निम्नलिखित संदेश दिखाई देगा:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

बधाई हो! आपका स्मार्ट अनुबंध कोड Etherscan पर है!

### Etherscan पर अपना स्मार्ट अनुबंध देखें! {#check-out-your-smart-contract-on-etherscan}

जब आप अपने टर्मिनल में दिए गए लिंक पर नेविगेट करते हैं, तो आपको Etherscan पर प्रकाशित अपना स्मार्ट अनुबंध कोड और ABI देखने में सक्षम होना चाहिए!

**वाह - आपने कर दिखाया चैंपियन! अब कोई भी आपके स्मार्ट अनुबंध को कॉल कर सकता है या उसमें लिख सकता है! हम यह देखने के लिए उत्सुक हैं कि आप आगे क्या बनाते हैं!**

## भाग 4 - अपने स्मार्ट अनुबंध को फ्रंटएंड के साथ एकीकृत करना {#part-4-integrating-your-smart-contract-with-the-frontend}

इस ट्यूटोरियल के अंत तक, आप जानेंगे कि कैसे:

- एक मेटामास्क वॉलेट को अपने विकेंद्रीकृत एप्लिकेशन (dapp) से कनेक्ट करें
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API का उपयोग करके अपने स्मार्ट अनुबंध से डेटा पढ़ें
- मेटामास्क का उपयोग करके इथेरियम लेन-देन पर हस्ताक्षर करें

इस dapp के लिए, हम अपने फ्रंटएंड फ्रेमवर्क के रूप में [React](https://react.dev/) का उपयोग करेंगे; हालाँकि, यह ध्यान रखना महत्वपूर्ण है कि हम इसके मूल सिद्धांतों को समझने में अधिक समय नहीं लगाएंगे, क्योंकि हमारा मुख्य ध्यान अपने प्रोजेक्ट में Web3 कार्यक्षमता लाने पर होगा।

पूर्वापेक्षा के रूप में, आपको React की शुरुआती स्तर की समझ होनी चाहिए। यदि नहीं, तो हम आधिकारिक [Intro to React tutorial](https://react.dev/learn) को पूरा करने की सलाह देते हैं।

### स्टार्टर फ़ाइलों को क्लोन करें {#clone-the-starter-files}

सबसे पहले, इस प्रोजेक्ट के लिए स्टार्टर फ़ाइलें प्राप्त करने के लिए [hello-world-part-four GitHub repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial) पर जाएं और इस रिपॉजिटरी को अपनी स्थानीय मशीन पर क्लोन करें।

क्लोन की गई रिपॉजिटरी को स्थानीय रूप से खोलें। ध्यान दें कि इसमें दो फ़ोल्डर हैं: `starter-files` और `completed`।

- `starter-files`- **हम इस डायरेक्टरी में काम करेंगे**, हम UI को आपके इथेरियम वॉलेट और उस स्मार्ट अनुबंध से जोड़ेंगे जिसे हमने [भाग 3](#part-3-publish-your-smart-contract-to-etherscan) में Etherscan पर प्रकाशित किया था।
- `completed` में पूरा किया गया ट्यूटोरियल है और यदि आप कहीं फंस जाते हैं तो इसका उपयोग केवल संदर्भ के रूप में किया जाना चाहिए।

इसके बाद, अपने पसंदीदा कोड एडिटर में `starter-files` की अपनी कॉपी खोलें, और फिर `src` फ़ोल्डर में नेविगेट करें।

हम जो भी कोड लिखेंगे वह `src` फ़ोल्डर के अंतर्गत रहेगा। हम अपने प्रोजेक्ट को Web3 कार्यक्षमता देने के लिए `HelloWorld.js` घटक और `util/interact.js` जावास्क्रिप्ट फ़ाइलों को संपादित करेंगे।

### स्टार्टर फ़ाइलों की जाँच करें {#check-out-the-starter-files}

कोडिंग शुरू करने से पहले, आइए देखें कि स्टार्टर फ़ाइलों में हमें क्या प्रदान किया गया है।

#### अपना React प्रोजेक्ट चलाएं {#get-your-react-project-running}

आइए अपने ब्राउज़र में React प्रोजेक्ट चलाकर शुरुआत करें। React की खूबी यह है कि एक बार जब हमारा प्रोजेक्ट हमारे ब्राउज़र में चलने लगता है, तो हमारे द्वारा सहेजे गए कोई भी बदलाव हमारे ब्राउज़र में लाइव अपडेट हो जाएंगे।

प्रोजेक्ट को चलाने के लिए, `starter-files` फ़ोल्डर की रूट डायरेक्टरी में नेविगेट करें, और प्रोजेक्ट की निर्भरताओं (dependencies) को स्थापित करने के लिए अपने टर्मिनल में `npm install` चलाएं:

```bash
cd starter-files
npm install
```

एक बार जब वे स्थापित हो जाएं, तो अपने टर्मिनल में `npm start` चलाएं:

```bash
npm start
```

ऐसा करने से आपके ब्राउज़र में [http://localhost:3000/](http://localhost:3000/) खुल जाना चाहिए, जहाँ आप हमारे प्रोजेक्ट का फ्रंटएंड देखेंगे। इसमें एक फ़ील्ड \(आपके स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करने का स्थान\), एक "Connect Wallet" बटन, और एक "Update" बटन होना चाहिए।

यदि आप किसी भी बटन पर क्लिक करने का प्रयास करते हैं, तो आप देखेंगे कि वे काम नहीं करते हैं—ऐसा इसलिए है क्योंकि हमें अभी भी उनकी कार्यक्षमता को प्रोग्राम करना है।

#### `HelloWorld.js` घटक {#the-helloworld-js-component}

आइए अपने एडिटर में `src` फ़ोल्डर में वापस जाएं और `HelloWorld.js` फ़ाइल खोलें। यह बहुत महत्वपूर्ण है कि हम इस फ़ाइल में सब कुछ समझें, क्योंकि यह प्राथमिक React घटक है जिस पर हम काम करेंगे।

इस फ़ाइल के शीर्ष पर, आप देखेंगे कि हमारे पास कई आयात (import) कथन हैं जो हमारे प्रोजेक्ट को चलाने के लिए आवश्यक हैं, जिनमें React लाइब्रेरी, useEffect और useState हुक, `./util/interact.js` से कुछ आइटम (हम जल्द ही उनका अधिक विस्तार से वर्णन करेंगे!), और Alchemy लोगो शामिल हैं।

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

इसके बाद, हमारे पास हमारे स्थिति (state) चर (variables) हैं जिन्हें हम विशिष्ट घटनाओं के बाद अपडेट करेंगे।

```javascript
// HelloWorld.js

//स्थिति चर
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

यहाँ बताया गया है कि प्रत्येक चर क्या दर्शाता है:

- `walletAddress` - एक स्ट्रिंग जो उपयोगकर्ता के वॉलेट का पता संग्रहीत करती है
- `status`- एक स्ट्रिंग जो एक उपयोगी संदेश संग्रहीत करती है जो उपयोगकर्ता को dapp के साथ बातचीत करने के तरीके पर मार्गदर्शन करती है
- `message` - एक स्ट्रिंग जो स्मार्ट अनुबंध में वर्तमान संदेश को संग्रहीत करती है
- `newMessage` - एक स्ट्रिंग जो उस नए संदेश को संग्रहीत करती है जिसे स्मार्ट अनुबंध में लिखा जाएगा

स्थिति चरों के बाद, आप पाँच गैर-कार्यान्वित (un-implemented) फ़ंक्शन देखेंगे: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, और `onUpdatePressed`। हम नीचे बताएंगे कि वे क्या करते हैं:

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

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- यह एक React हुक है जिसे आपके घटक के रेंडर होने के बाद कॉल किया जाता है। क्योंकि इसमें एक खाली ऐरे `[]` प्रॉप पास किया गया है \(लाइन 4 देखें\), इसे केवल घटक के _पहले_ रेंडर पर कॉल किया जाएगा। यहाँ हम अपने स्मार्ट अनुबंध में संग्रहीत वर्तमान संदेश को लोड करेंगे, अपने स्मार्ट अनुबंध और वॉलेट श्रोताओं (listeners) को कॉल करेंगे, और यह दर्शाने के लिए अपने UI को अपडेट करेंगे कि क्या कोई वॉलेट पहले से जुड़ा हुआ है।
- `addSmartContractListener`- यह फ़ंक्शन एक श्रोता (listener) सेट करता है जो हमारे HelloWorld अनुबंध के `UpdatedMessages` ईवेंट पर नज़र रखेगा और हमारे स्मार्ट अनुबंध में संदेश बदले जाने पर हमारे UI को अपडेट करेगा।
- `addWalletListener`- यह फ़ंक्शन एक श्रोता सेट करता है जो उपयोगकर्ता के मेटामास्क वॉलेट की स्थिति में बदलाव का पता लगाता है, जैसे कि जब उपयोगकर्ता अपना वॉलेट डिस्कनेक्ट करता है या पते बदलता है।
- `connectWalletPressed`- इस फ़ंक्शन को उपयोगकर्ता के मेटामास्क वॉलेट को हमारे dapp से जोड़ने के लिए कॉल किया जाएगा।
- `onUpdatePressed` - इस फ़ंक्शन को तब कॉल किया जाएगा जब उपयोगकर्ता स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करना चाहेगा।

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

यदि आप इस कोड को ध्यान से देखते हैं, तो आप देखेंगे कि हम अपने UI में अपने विभिन्न स्थिति चरों का उपयोग कहाँ करते हैं:

- लाइन 6-12 पर, यदि उपयोगकर्ता का वॉलेट जुड़ा हुआ है \(यानी, `walletAddress.length > 0`\), तो हम "walletButton" ID वाले बटन में उपयोगकर्ता के `walletAddress` का एक छोटा संस्करण प्रदर्शित करते हैं; अन्यथा यह केवल "Connect Wallet" कहता है।
- लाइन 17 पर, हम स्मार्ट अनुबंध में संग्रहीत वर्तमान संदेश प्रदर्शित करते हैं, जिसे `message` स्ट्रिंग में कैप्चर किया गया है।
- लाइन 23-26 पर, जब टेक्स्ट फ़ील्ड में इनपुट बदलता है तो हम अपने `newMessage` स्थिति चर को अपडेट करने के लिए एक [नियंत्रित घटक (controlled component)](https://legacy.reactjs.org/docs/forms.html#controlled-components) का उपयोग करते हैं।

हमारे स्थिति चरों के अलावा, आप यह भी देखेंगे कि `connectWalletPressed` और `onUpdatePressed` फ़ंक्शंस को तब कॉल किया जाता है जब क्रमशः `publishButton` और `walletButton` ID वाले बटन क्लिक किए जाते हैं।

अंत में, आइए देखें कि यह `HelloWorld.js` घटक कहाँ जोड़ा गया है।

यदि आप `App.js` फ़ाइल पर जाते हैं, जो React में मुख्य घटक है जो अन्य सभी घटकों के लिए एक कंटेनर के रूप में कार्य करता है, तो आप देखेंगे कि हमारा `HelloWorld.js` घटक लाइन 7 पर इंजेक्ट किया गया है।

अंतिम लेकिन कम नहीं, आइए आपके लिए प्रदान की गई एक और फ़ाइल, `interact.js` फ़ाइल की जाँच करें।

#### `interact.js` फ़ाइल {#the-interact-js-file}

चूंकि हम [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) प्रतिमान (paradigm) का पालन करना चाहते हैं, इसलिए हम एक अलग फ़ाइल चाहेंगे जिसमें हमारे dapp के तर्क, डेटा और नियमों को प्रबंधित करने के लिए हमारे सभी फ़ंक्शन हों, और फिर उन फ़ंक्शंस को हमारे फ्रंटएंड \(हमारे `HelloWorld.js` घटक\) में निर्यात करने में सक्षम हों।

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

आप फ़ाइल के शीर्ष पर देखेंगे कि हमने `helloWorldContract` ऑब्जेक्ट को कमेंट आउट कर दिया है। इस ट्यूटोरियल में बाद में, हम इस ऑब्जेक्ट को अनकमेंट करेंगे और इस चर में अपने स्मार्ट अनुबंध को इंस्टेंटिएट (instantiate) करेंगे, जिसे हम फिर अपने `HelloWorld.js` घटक में निर्यात करेंगे।

हमारे `helloWorldContract` ऑब्जेक्ट के बाद चार गैर-कार्यान्वित फ़ंक्शन निम्नलिखित कार्य करते हैं:

- `loadCurrentMessage` - यह फ़ंक्शन स्मार्ट अनुबंध में संग्रहीत वर्तमान संदेश को लोड करने के तर्क को संभालता है। यह [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) का उपयोग करके Hello World स्मार्ट अनुबंध पर एक _read_ कॉल करेगा।
- `connectWallet` - यह फ़ंक्शन उपयोगकर्ता के मेटामास्क को हमारे dapp से जोड़ेगा।
- `getCurrentWalletConnected` - यह फ़ंक्शन जांच करेगा कि क्या पेज लोड होने पर कोई इथेरियम खाता पहले से ही हमारे dapp से जुड़ा हुआ है और तदनुसार हमारे UI को अपडेट करेगा।
- `updateMessage` - यह फ़ंक्शन स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करेगा। यह Hello World स्मार्ट अनुबंध पर एक _write_ कॉल करेगा, इसलिए संदेश को अपडेट करने के लिए उपयोगकर्ता के मेटामास्क वॉलेट को एक इथेरियम लेन-देन पर हस्ताक्षर करना होगा।

अब जब हम समझ गए हैं कि हम किसके साथ काम कर रहे हैं, तो आइए जानें कि अपने स्मार्ट अनुबंध से कैसे पढ़ें!

### चरण 3: अपने स्मार्ट अनुबंध से पढ़ें {#step-3-read-from-your-smart-contract}

अपने स्मार्ट अनुबंध से पढ़ने के लिए, आपको सफलतापूर्वक सेट अप करना होगा:

- इथेरियम चेन के लिए एक API कनेक्शन
- आपके स्मार्ट अनुबंध का एक लोड किया गया इंस्टेंस
- आपके स्मार्ट अनुबंध फ़ंक्शन को कॉल करने के लिए एक फ़ंक्शन
- स्मार्ट अनुबंध से आपके द्वारा पढ़े जा रहे डेटा में परिवर्तन होने पर अपडेट देखने के लिए एक श्रोता (listener)

यह बहुत सारे चरणों की तरह लग सकता है, लेकिन चिंता न करें! हम आपको चरण-दर-चरण बताएंगे कि उनमें से प्रत्येक को कैसे करना है! :\)

#### इथेरियम चेन के लिए एक API कनेक्शन स्थापित करें {#establish-an-api-connection-to-the-ethereum-chain}

तो याद है कि इस ट्यूटोरियल के भाग 2 में, हमने [अपने स्मार्ट अनुबंध से पढ़ने के लिए अपनी Alchemy Web3 कुंजी](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library) का उपयोग कैसे किया था? चेन से पढ़ने के लिए आपको अपने dapp में भी एक Alchemy Web3 कुंजी की आवश्यकता होगी।

यदि आपके पास यह पहले से नहीं है, तो सबसे पहले अपने `starter-files` की रूट डायरेक्टरी में नेविगेट करके और अपने टर्मिनल में निम्नलिखित चलाकर [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) स्थापित करें:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3), [Web3.js](https://docs.web3js.org/) के चारों ओर एक रैपर है, जो एक Web3 डेवलपर के रूप में आपके जीवन को आसान बनाने के लिए उन्नत API विधियाँ और अन्य महत्वपूर्ण लाभ प्रदान करता है। इसे न्यूनतम कॉन्फ़िगरेशन की आवश्यकता के लिए डिज़ाइन किया गया है ताकि आप इसे तुरंत अपने ऐप में उपयोग करना शुरू कर सकें!

फिर, अपनी प्रोजेक्ट डायरेक्टरी में [dotenv](https://www.npmjs.com/package/dotenv) पैकेज स्थापित करें, ताकि हमारी API कुंजी प्राप्त करने के बाद उसे संग्रहीत करने के लिए हमारे पास एक सुरक्षित स्थान हो।

```text
npm install dotenv --save
```

हमारे dapp के लिए, **हम अपनी HTTP API कुंजी के बजाय अपनी Websockets API कुंजी का उपयोग करेंगे**, क्योंकि यह हमें एक श्रोता सेट करने की अनुमति देगा जो स्मार्ट अनुबंध में संग्रहीत संदेश के बदलने का पता लगाता है।

एक बार जब आपके पास अपनी API कुंजी हो जाए, तो अपनी रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं और उसमें अपना Alchemy Websockets url जोड़ें। इसके बाद, आपकी `.env` फ़ाइल इस तरह दिखनी चाहिए:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

अब, हम अपने dapp में अपना Alchemy Web3 एंडपॉइंट सेट करने के लिए तैयार हैं! आइए अपने `interact.js` पर वापस जाएं, जो हमारे `util` फ़ोल्डर के अंदर नेस्टेड है और फ़ाइल के शीर्ष पर निम्नलिखित कोड जोड़ें:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

ऊपर, हमने सबसे पहले अपनी `.env` फ़ाइल से Alchemy कुंजी आयात की और फिर अपना Alchemy Web3 एंडपॉइंट स्थापित करने के लिए अपने `alchemyKey` को `createAlchemyWeb3` में पास किया।

इस एंडपॉइंट के तैयार होने के साथ, अब हमारे स्मार्ट अनुबंध को लोड करने का समय आ गया है!

#### अपना Hello World स्मार्ट अनुबंध लोड करना {#loading-your-hello-world-smart-contract}

अपने Hello World स्मार्ट अनुबंध को लोड करने के लिए, आपको इसके अनुबंध पते और ABI की आवश्यकता होगी, यदि आपने [इस ट्यूटोरियल का भाग 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) पूरा कर लिया है तो ये दोनों Etherscan पर पाए जा सकते हैं।

#### Etherscan से अपना अनुबंध ABI कैसे प्राप्त करें {#how-to-get-your-contract-abi-from-etherscan}

यदि आपने इस ट्यूटोरियल का भाग 3 छोड़ दिया है, तो आप पता [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) वाले HelloWorld अनुबंध का उपयोग कर सकते हैं। इसका ABI [यहाँ](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) पाया जा सकता है।

एक अनुबंध ABI यह निर्दिष्ट करने के लिए आवश्यक है कि अनुबंध किस फ़ंक्शन को लागू करेगा और साथ ही यह सुनिश्चित करेगा कि फ़ंक्शन उस प्रारूप में डेटा वापस करेगा जिसकी आप अपेक्षा कर रहे हैं। एक बार जब हम अपने अनुबंध ABI की प्रतिलिपि बना लेते हैं, तो आइए इसे अपनी `src` डायरेक्टरी में `contract-abi.json` नामक JSON फ़ाइल के रूप में सहेजें।

आपका contract-abi.json आपके src फ़ोल्डर में संग्रहीत होना चाहिए।

हमारे अनुबंध पते, ABI और Alchemy Web3 एंडपॉइंट से लैस होकर, हम अपने स्मार्ट अनुबंध का एक इंस्टेंस लोड करने के लिए [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) का उपयोग कर सकते हैं। अपने अनुबंध ABI को `interact.js` फ़ाइल में आयात करें और अपना अनुबंध पता जोड़ें।

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

अब हम अंततः अपने `helloWorldContract` चर को अनकमेंट कर सकते हैं, और अपने AlchemyWeb3 एंडपॉइंट का उपयोग करके स्मार्ट अनुबंध को लोड कर सकते हैं:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

संक्षेप में, आपके `interact.js` की पहली 12 लाइनें अब इस तरह दिखनी चाहिए:

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

अब जब हमारा अनुबंध लोड हो गया है, तो हम अपना `loadCurrentMessage` फ़ंक्शन लागू कर सकते हैं!

#### अपनी `interact.js` फ़ाइल में `loadCurrentMessage` लागू करना {#implementing-loadcurrentmessage-in-your-interact-js-file}

यह फ़ंक्शन बहुत सरल है। हम अपने अनुबंध से पढ़ने के लिए एक साधारण async web3 कॉल करने जा रहे हैं। हमारा फ़ंक्शन स्मार्ट अनुबंध में संग्रहीत संदेश वापस करेगा:

अपनी `interact.js` फ़ाइल में `loadCurrentMessage` को निम्नलिखित में अपडेट करें:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

चूंकि हम इस स्मार्ट अनुबंध को अपने UI में प्रदर्शित करना चाहते हैं, इसलिए आइए अपने `HelloWorld.js` घटक में `useEffect` फ़ंक्शन को निम्नलिखित में अपडेट करें:

```javascript
// HelloWorld.js

//केवल एक बार कॉल किया गया
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

ध्यान दें, हम केवल यह चाहते हैं कि घटक के पहले रेंडर के दौरान हमारे `loadCurrentMessage` को एक बार कॉल किया जाए। हम जल्द ही स्मार्ट अनुबंध में संदेश बदलने के बाद UI को स्वचालित रूप से अपडेट करने के लिए `addSmartContractListener` लागू करेंगे।

इससे पहले कि हम अपने श्रोता में गोता लगाएँ, आइए देखें कि हमारे पास अब तक क्या है! अपनी `HelloWorld.js` और `interact.js` फ़ाइलें सहेजें, और फिर [http://localhost:3000/](http://localhost:3000/) पर जाएं

आप देखेंगे कि वर्तमान संदेश अब "No connection to the network." नहीं कहता है। इसके बजाय यह स्मार्ट अनुबंध में संग्रहीत संदेश को दर्शाता है। बहुत बढ़िया!

#### आपका UI अब स्मार्ट अनुबंध में संग्रहीत संदेश को दर्शाना चाहिए {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

अब उस श्रोता की बात करें...

#### `addSmartContractListener` लागू करें {#implement-addsmartcontractlistener}

यदि आप [इस ट्यूटोरियल श्रृंखला के भाग 1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) में हमारे द्वारा लिखी गई `HelloWorld.sol` फ़ाइल को याद करते हैं, तो आपको याद होगा कि `UpdatedMessages` नामक एक स्मार्ट अनुबंध ईवेंट है जो हमारे स्मार्ट अनुबंध के `update` फ़ंक्शन को लागू करने के बाद उत्सर्जित (emitted) होता है \(लाइन 9 और 27 देखें\):

```javascript
// HelloWorld.sol

// सिमेंटिक वर्ज़निंग का उपयोग करके, Solidity का संस्करण निर्दिष्ट करता है।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध फ़ंक्शंस और डेटा (इसकी स्थिति) का एक संग्रह है। एक बार तैनात होने के बाद, एक अनुबंध इथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है। अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //अपडेट फ़ंक्शन कॉल किए जाने पर उत्सर्जित होता है
   //स्मार्ट अनुबंध ईवेंट आपके अनुबंध के लिए आपके ऐप फ्रंट-एंड को यह संचार करने का एक तरीका है कि ब्लॉकचेन पर कुछ हुआ है, जो कुछ ईवेंट्स के लिए 'सुन' सकता है और उनके होने पर कार्रवाई कर सकता है।
   event UpdatedMessages(string oldStr, string newStr);

   // `string` प्रकार का एक स्थिति चर `संदेश` घोषित करता है।
   // स्थिति चर वे चर होते हैं जिनके मान स्थायी रूप से अनुबंध स्टोरेज में संग्रहीत होते हैं। `public` कीवर्ड चरों को अनुबंध के बाहर से सुलभ बनाता है और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
   string public message;

   // कई क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, कंस्ट्रक्टर एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
   // कंस्ट्रक्टर्स का उपयोग अनुबंध के डेटा को इनिशियलाइज़ करने के लिए किया जाता है। अधिक जानें:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग तर्क `initMessage` स्वीकार करता है और मान को अनुबंध के `संदेश` स्टोरेज चर में सेट करता है)।
      message = initMessage;
   }

   // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है और `संदेश` स्टोरेज चर को अपडेट करता है।
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

स्मार्ट अनुबंध ईवेंट आपके अनुबंध के लिए यह संवाद करने का एक तरीका है कि ब्लॉकचेन पर कुछ हुआ है \(यानी, एक _ईवेंट_ था\) आपके फ्रंट-एंड एप्लिकेशन को, जो विशिष्ट ईवेंट के लिए 'सुन' सकता है और उनके होने पर कार्रवाई कर सकता है।

हमारा `addSmartContractListener` फ़ंक्शन विशेष रूप से हमारे Hello World स्मार्ट अनुबंध के `UpdatedMessages` ईवेंट को सुनने जा रहा है, और नया संदेश प्रदर्शित करने के लिए हमारे UI को अपडेट करेगा।

निम्नलिखित में `addSmartContractListener` को संशोधित करें:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

आइए समझते हैं कि जब श्रोता किसी ईवेंट का पता लगाता है तो क्या होता है:

- यदि ईवेंट उत्सर्जित होने पर कोई त्रुटि होती है, तो यह हमारे `status` स्थिति चर के माध्यम से UI में दिखाई देगी।
- अन्यथा, हम वापस किए गए `data` ऑब्जेक्ट का उपयोग करेंगे। `data.returnValues` शून्य पर अनुक्रमित (indexed) एक ऐरे है जहाँ ऐरे में पहला तत्व पिछला संदेश संग्रहीत करता है और दूसरा तत्व अपडेट किया गया संदेश संग्रहीत करता है। कुल मिलाकर, एक सफल ईवेंट पर हम अपनी `message` स्ट्रिंग को अपडेट किए गए संदेश पर सेट करेंगे, `newMessage` स्ट्रिंग को साफ़ करेंगे, और यह दर्शाने के लिए अपने `status` स्थिति चर को अपडेट करेंगे कि हमारे स्मार्ट अनुबंध पर एक नया संदेश प्रकाशित किया गया है।

अंत में, आइए अपने `useEffect` फ़ंक्शन में अपने श्रोता को कॉल करें ताकि यह `HelloWorld.js` घटक के पहले रेंडर पर प्रारंभ (initialized) हो जाए। कुल मिलाकर, आपका `useEffect` फ़ंक्शन इस तरह दिखना चाहिए:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

अब जब हम अपने स्मार्ट अनुबंध से पढ़ने में सक्षम हैं, तो यह पता लगाना बहुत अच्छा होगा कि इसमें कैसे लिखा जाए! हालाँकि, हमारे dapp में लिखने के लिए, हमारे पास सबसे पहले इससे जुड़ा एक इथेरियम वॉलेट होना चाहिए।

तो, आगे हम अपना इथेरियम वॉलेट \(मेटामास्क\) सेट करने और फिर उसे अपने dapp से जोड़ने का काम करेंगे!

### चरण 4: अपना इथेरियम वॉलेट सेट करें {#step-4-set-up-your-ethereum-wallet}

इथेरियम चेन पर कुछ भी लिखने के लिए, उपयोगकर्ताओं को अपने वर्चुअल वॉलेट की निजी कुंजियों का उपयोग करके लेन-देन पर हस्ताक्षर करना होगा। इस ट्यूटोरियल के लिए, हम [मेटामास्क](https://metamask.io/) का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके इथेरियम खाता पते को प्रबंधित करने के लिए किया जाता है, क्योंकि यह अंतिम-उपयोगकर्ता के लिए इस लेन-देन पर हस्ताक्षर करना बहुत आसान बनाता है।

यदि आप इस बारे में अधिक समझना चाहते हैं कि इथेरियम पर लेन-देन कैसे काम करता है, तो इथेरियम फाउंडेशन के [इस पेज](/developers/docs/transactions/) को देखें।

#### मेटामास्क डाउनलोड करें {#download-metamask}

आप [यहाँ](https://metamask.io/download) मुफ्त में मेटामास्क खाता डाउनलोड और बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से ही एक खाता है, तो सुनिश्चित करें कि ऊपर दाईं ओर "Goerli Test Network" पर स्विच करें \(ताकि हम वास्तविक पैसे से न खेलें\)।

#### फॉसेट से ईथर जोड़ें {#add-ether-from-a-faucet}

इथेरियम ब्लॉकचेन पर लेन-देन पर हस्ताक्षर करने के लिए, हमें कुछ नकली Eth की आवश्यकता होगी। Eth प्राप्त करने के लिए आप [FaucETH](https://fauceth.komputing.org) पर जा सकते हैं और अपना गोएर्ली खाता पता दर्ज कर सकते हैं, "Request funds" पर क्लिक करें, फिर ड्रॉपडाउन में "Ethereum Testnet Goerli" चुनें और अंत में फिर से "Request funds" बटन पर क्लिक करें। आपको जल्द ही अपने मेटामास्क खाते में Eth दिखाई देना चाहिए!

#### अपना बैलेंस जांचें {#check-your-balance}

यह दोबारा जांचने के लिए कि हमारा बैलेंस वहां है, आइए [Alchemy के कंपोज़र टूल](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) का उपयोग करके एक [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) अनुरोध करें। यह हमारे वॉलेट में Eth की मात्रा वापस कर देगा। अपना मेटामास्क खाता पता दर्ज करने और "Send Request" पर क्लिक करने के बाद, आपको इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**नोट:** यह परिणाम wei में है eth में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। wei से eth में रूपांतरण है: 1 eth = 10¹⁸ wei। इसलिए यदि हम 0xde0b6b3a7640000 को दशमलव में बदलते हैं तो हमें 1\*10¹⁸ मिलता है जो 1 eth के बराबर है।

फ़्यू! हमारा नकली पैसा सब वहीं है! 🤑

### चरण 5: मेटामास्क को अपने UI से कनेक्ट करें {#step-5-connect-metamask-to-your-ui}

अब जब हमारा मेटामास्क वॉलेट सेट हो गया है, तो आइए अपने dapp को इससे कनेक्ट करें!

#### `connectWallet` फ़ंक्शन {#the-connectwallet-function}

अपनी `interact.js` फ़ाइल में, आइए `connectWallet` फ़ंक्शन लागू करें, जिसे हम फिर अपने `HelloWorld.js` घटक में कॉल कर सकते हैं।

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
        status: "👆🏽 Write a message in the text-field above.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

तो कोड का यह विशाल ब्लॉक वास्तव में क्या करता है?

खैर, सबसे पहले, यह जांचता है कि क्या आपके ब्राउज़र में `window.ethereum` सक्षम है।

`window.ethereum` मेटामास्क और अन्य वॉलेट प्रदाताओं द्वारा इंजेक्ट किया गया एक वैश्विक API है जो वेबसाइटों को उपयोगकर्ताओं के इथेरियम खातों का अनुरोध करने की अनुमति देता है। यदि स्वीकृत हो जाता है, तो यह उन ब्लॉकचेन से डेटा पढ़ सकता है जिनसे उपयोगकर्ता जुड़ा हुआ है, और सुझाव दे सकता है कि उपयोगकर्ता संदेशों और लेन-देन पर हस्ताक्षर करे। अधिक जानकारी के लिए [मेटामास्क दस्तावेज़](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) देखें!

यदि `window.ethereum` मौजूद _नहीं_ है, तो इसका मतलब है कि मेटामास्क स्थापित नहीं है। इसके परिणामस्वरूप एक JSON ऑब्जेक्ट वापस किया जाता है, जहाँ वापस किया गया `address` एक खाली स्ट्रिंग है, और `status` JSX ऑब्जेक्ट यह संदेश देता है कि उपयोगकर्ता को मेटामास्क स्थापित करना होगा।

अब यदि `window.ethereum` मौजूद _है_, तो चीजें दिलचस्प हो जाती हैं।

एक try/catch लूप का उपयोग करके, हम [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) को कॉल करके मेटामास्क से कनेक्ट करने का प्रयास करेंगे। इस फ़ंक्शन को कॉल करने से ब्राउज़र में मेटामास्क खुल जाएगा, जिससे उपयोगकर्ता को अपने वॉलेट को आपके dapp से कनेक्ट करने के लिए कहा जाएगा।

- यदि उपयोगकर्ता कनेक्ट करना चुनता है, तो `method: "eth_requestAccounts"` एक ऐरे वापस करेगा जिसमें उपयोगकर्ता के वे सभी खाता पते होंगे जो dapp से जुड़े हैं। कुल मिलाकर, हमारा `connectWallet` फ़ंक्शन एक JSON ऑब्जेक्ट वापस करेगा जिसमें इस ऐरे में _पहला_ `address` \(लाइन 9 देखें\) और एक `status` संदेश होगा जो उपयोगकर्ता को स्मार्ट अनुबंध में एक संदेश लिखने के लिए प्रेरित करता है।
- यदि उपयोगकर्ता कनेक्शन को अस्वीकार करता है, तो JSON ऑब्जेक्ट में वापस किए गए `address` के लिए एक खाली स्ट्रिंग और एक `status` संदेश होगा जो यह दर्शाता है कि उपयोगकर्ता ने कनेक्शन को अस्वीकार कर दिया है।

अब जब हमने यह `connectWallet` फ़ंक्शन लिख लिया है, तो अगला कदम इसे अपने `HelloWorld.js` घटक में कॉल करना है।

#### अपने `HelloWorld.js` UI घटक में `connectWallet` फ़ंक्शन जोड़ें {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js` में `connectWalletPressed` फ़ंक्शन पर नेविगेट करें, और इसे निम्नलिखित में अपडेट करें:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

ध्यान दें कि हमारी अधिकांश कार्यक्षमता `interact.js` फ़ाइल से हमारे `HelloWorld.js` घटक से कैसे अलग (abstracted) की गई है? ऐसा इसलिए है ताकि हम M-V-C प्रतिमान का पालन कर सकें!

`connectWalletPressed` में, हम बस अपने आयातित `connectWallet` फ़ंक्शन पर एक await कॉल करते हैं, और इसकी प्रतिक्रिया का उपयोग करके, हम अपने `status` और `walletAddress` चरों को उनके स्थिति हुक के माध्यम से अपडेट करते हैं।

अब, आइए दोनों फ़ाइलों \(`HelloWorld.js` और `interact.js`\) को सहेजें और अब तक अपने UI का परीक्षण करें।

[http://localhost:3000/](http://localhost:3000/) पेज पर अपना ब्राउज़र खोलें, और पेज के ऊपर दाईं ओर "Connect Wallet" बटन दबाएं।

यदि आपके पास मेटामास्क स्थापित है, तो आपको अपने वॉलेट को अपने dapp से कनेक्ट करने के लिए कहा जाना चाहिए। कनेक्ट करने के निमंत्रण को स्वीकार करें।

आपको देखना चाहिए कि वॉलेट बटन अब यह दर्शाता है कि आपका पता जुड़ा हुआ है! बहुत बढ़िया 🔥

इसके बाद, पेज को रीफ्रेश करने का प्रयास करें... यह अजीब है। हमारा वॉलेट बटन हमें मेटामास्क कनेक्ट करने के लिए प्रेरित कर रहा है, भले ही यह पहले से ही जुड़ा हुआ है...

हालाँकि, डरें नहीं! हम `getCurrentWalletConnected` को लागू करके आसानी से इसे संबोधित (address) कर सकते हैं, जो यह जांच करेगा कि क्या कोई पता पहले से ही हमारे dapp से जुड़ा हुआ है और तदनुसार हमारे UI को अपडेट करेगा!

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
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
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
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

यह कोड पिछले चरण में हमारे द्वारा लिखे गए `connectWallet` फ़ंक्शन के _बहुत_ समान है।

मुख्य अंतर यह है कि `eth_requestAccounts` विधि को कॉल करने के बजाय, जो उपयोगकर्ता के लिए अपना वॉलेट कनेक्ट करने के लिए मेटामास्क खोलता है, यहाँ हम `eth_accounts` विधि को कॉल करते हैं, जो केवल एक ऐरे वापस करता है जिसमें वर्तमान में हमारे dapp से जुड़े मेटामास्क पते होते हैं।

इस फ़ंक्शन को काम करते हुए देखने के लिए, आइए इसे अपने `HelloWorld.js` घटक के `useEffect` फ़ंक्शन में कॉल करें:

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

ध्यान दें, हम अपने `walletAddress` और `status` स्थिति चरों को अपडेट करने के लिए `getCurrentWalletConnected` पर अपने कॉल की प्रतिक्रिया का उपयोग करते हैं।

अब जब आपने यह कोड जोड़ लिया है, तो आइए अपनी ब्राउज़र विंडो को रीफ्रेश करने का प्रयास करें।

बहुत बढ़िया! बटन को यह कहना चाहिए कि आप जुड़े हुए हैं, और आपके जुड़े हुए वॉलेट के पते का पूर्वावलोकन दिखाना चाहिए - आपके रीफ्रेश करने के बाद भी!

#### `addWalletListener` लागू करें {#implement-addwalletlistener}

हमारे dapp वॉलेट सेटअप में अंतिम चरण वॉलेट श्रोता को लागू करना है ताकि हमारे वॉलेट की स्थिति बदलने पर हमारा UI अपडेट हो जाए, जैसे कि जब उपयोगकर्ता डिस्कनेक्ट करता है या खाते बदलता है।

अपनी `HelloWorld.js` फ़ाइल में, अपने `addWalletListener` फ़ंक्शन को निम्नलिखित के रूप में संशोधित करें:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

मुझे यकीन है कि इस बिंदु पर यहाँ क्या हो रहा है यह समझने के लिए आपको हमारी मदद की भी आवश्यकता नहीं है, लेकिन पूर्णता के उद्देश्यों के लिए, आइए इसे जल्दी से समझें:

- सबसे पहले, हमारा फ़ंक्शन जांचता है कि क्या `window.ethereum` सक्षम है \(यानी, मेटामास्क स्थापित है\)।
  - यदि यह नहीं है, तो हम बस अपने `status` स्थिति चर को एक JSX स्ट्रिंग पर सेट करते हैं जो उपयोगकर्ता को मेटामास्क स्थापित करने के लिए प्रेरित करता है।
  - यदि यह सक्षम है, तो हम लाइन 3 पर श्रोता `window.ethereum.on("accountsChanged")` सेट करते हैं जो मेटामास्क वॉलेट में स्थिति परिवर्तनों को सुनता है, जिसमें तब शामिल होता है जब उपयोगकर्ता dapp से एक अतिरिक्त खाता जोड़ता है, खाते बदलता है, या किसी खाते को डिस्कनेक्ट करता है। यदि कम से कम एक खाता जुड़ा हुआ है, तो `walletAddress` स्थिति चर को श्रोता द्वारा वापस किए गए `accounts` ऐरे में पहले खाते के रूप में अपडेट किया जाता है। अन्यथा, `walletAddress` को एक खाली स्ट्रिंग के रूप में सेट किया जाता है।

अंतिम लेकिन कम नहीं, हमें इसे अपने `useEffect` फ़ंक्शन में कॉल करना होगा:

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

और बस हो गया! हमने अपने सभी वॉलेट कार्यक्षमता की प्रोग्रामिंग सफलतापूर्वक पूरी कर ली है! अब हमारे अंतिम कार्य पर: हमारे स्मार्ट अनुबंध में संग्रहीत संदेश को अपडेट करना!

### चरण 6: `updateMessage` फ़ंक्शन लागू करें {#step-6-implement-the-updatemessage-function}

ठीक है दोस्तों, हम अंतिम चरण में पहुँच गए हैं! आपकी `interact.js` फ़ाइल के `updateMessage` में, हम निम्नलिखित करने जा रहे हैं:

1. सुनिश्चित करें कि जो संदेश हम अपने स्मार्ट अनुबंध में प्रकाशित करना चाहते हैं वह मान्य है
2. मेटामास्क का उपयोग करके अपने लेन-देन पर हस्ताक्षर करें
3. इस फ़ंक्शन को हमारे `HelloWorld.js` फ्रंटएंड घटक से कॉल करें

इसमें बहुत अधिक समय नहीं लगेगा; आइए इस dapp को पूरा करें!

#### इनपुट त्रुटि हैंडलिंग {#input-error-handling}

स्वाभाविक रूप से, फ़ंक्शन की शुरुआत में किसी प्रकार की इनपुट त्रुटि हैंडलिंग होना समझ में आता है।

हम चाहेंगे कि हमारा फ़ंक्शन जल्दी वापस आ जाए यदि कोई मेटामास्क एक्सटेंशन स्थापित नहीं है, कोई वॉलेट जुड़ा नहीं है \(यानी, पास किया गया `address` एक खाली स्ट्रिंग है\), या `message` एक खाली स्ट्रिंग है। आइए `updateMessage` में निम्नलिखित त्रुटि हैंडलिंग जोड़ें:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

अब जब इसमें उचित इनपुट त्रुटि हैंडलिंग है, तो मेटामास्क के माध्यम से लेन-देन पर हस्ताक्षर करने का समय आ गया है!

#### हमारे लेन-देन पर हस्ताक्षर करना {#signing-our-transaction}

यदि आप पहले से ही पारंपरिक Web3 इथेरियम लेन-देन के साथ सहज हैं, तो हम आगे जो कोड लिखेंगे वह बहुत परिचित होगा। अपने इनपुट त्रुटि हैंडलिंग कोड के नीचे, `updateMessage` में निम्नलिखित जोड़ें:

```javascript
// interact.js

//लेन-देन पैरामीटर सेट करें
const transactionParameters = {
  to: contractAddress, // अनुबंध प्रकाशनों के दौरान छोड़कर आवश्यक है।
  from: address, // उपयोगकर्ता के सक्रिय पते से मेल खाना चाहिए।
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//लेन-देन पर हस्ताक्षर करें
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
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

आइए समझते हैं कि क्या हो रहा है। सबसे पहले, हम अपने लेन-देन पैरामीटर सेट करते हैं, जहाँ:

- `to` प्राप्तकर्ता का पता \(हमारा स्मार्ट अनुबंध\) निर्दिष्ट करता है
- `from` लेन-देन के हस्ताक्षरकर्ता को निर्दिष्ट करता है, `address` चर जिसे हमने अपने फ़ंक्शन में पास किया था
- `data` में हमारे Hello World स्मार्ट अनुबंध की `update` विधि का कॉल शामिल है, जो इनपुट के रूप में हमारे `message` स्ट्रिंग चर को प्राप्त करता है

फिर, हम एक await कॉल करते हैं, `window.ethereum.request`, जहाँ हम मेटामास्क को लेन-देन पर हस्ताक्षर करने के लिए कहते हैं। ध्यान दें, लाइन 11 और 12 पर, हम अपनी eth विधि, `eth_sendTransaction` निर्दिष्ट कर रहे हैं और अपना `transactionParameters` पास कर रहे हैं।

इस बिंदु पर, मेटामास्क ब्राउज़र में खुल जाएगा, और उपयोगकर्ता को लेन-देन पर हस्ताक्षर करने या अस्वीकार करने के लिए प्रेरित करेगा।

- यदि लेन-देन सफल होता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट वापस करेगा जहाँ `status` JSX स्ट्रिंग उपयोगकर्ता को उनके लेन-देन के बारे में अधिक जानकारी के लिए Etherscan देखने के लिए प्रेरित करती है।
- यदि लेन-देन विफल हो जाता है, तो फ़ंक्शन एक JSON ऑब्जेक्ट वापस करेगा जहाँ `status` स्ट्रिंग त्रुटि संदेश देती है।

कुल मिलाकर, हमारा `updateMessage` फ़ंक्शन इस तरह दिखना चाहिए:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //इनपुट त्रुटि हैंडलिंग
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //लेन-देन पैरामीटर सेट करें
  const transactionParameters = {
    to: contractAddress, // अनुबंध प्रकाशनों के दौरान छोड़कर आवश्यक है।
    from: address, // उपयोगकर्ता के सक्रिय पते से मेल खाना चाहिए।
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //लेन-देन पर हस्ताक्षर करें
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
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
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

अंतिम लेकिन कम नहीं, हमें अपने `updateMessage` फ़ंक्शन को अपने `HelloWorld.js` घटक से जोड़ना होगा।

#### `updateMessage` को `HelloWorld.js` फ्रंटएंड से कनेक्ट करें {#connect-updatemessage-to-the-helloworld-js-frontend}

हमारे `onUpdatePressed` फ़ंक्शन को आयातित `updateMessage` फ़ंक्शन पर एक await कॉल करना चाहिए और यह दर्शाने के लिए `status` स्थिति चर को संशोधित करना चाहिए कि हमारा लेन-देन सफल हुआ या विफल:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

यह बहुत साफ और सरल है। और अंदाज़ा लगाइए... आपका DAPP पूरा हो गया है!!!

आगे बढ़ें और **Update** बटन का परीक्षण करें!

### अपना खुद का कस्टम dapp बनाएं {#make-your-own-custom-dapp}

वाह, आप ट्यूटोरियल के अंत तक पहुँच गए! संक्षेप में, आपने सीखा कि कैसे:

- एक मेटामास्क वॉलेट को अपने dapp प्रोजेक्ट से कनेक्ट करें
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API का उपयोग करके अपने स्मार्ट अनुबंध से डेटा पढ़ें
- मेटामास्क का उपयोग करके इथेरियम लेन-देन पर हस्ताक्षर करें

अब आप अपना खुद का कस्टम dapp प्रोजेक्ट बनाने के लिए इस ट्यूटोरियल के कौशल को लागू करने के लिए पूरी तरह से सुसज्जित हैं! हमेशा की तरह, यदि आपके कोई प्रश्न हैं, तो [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में मदद के लिए हमसे संपर्क करने में संकोच न करें। 🧙‍♂️

एक बार जब आप इस ट्यूटोरियल को पूरा कर लेते हैं, तो हमें बताएं कि आपका अनुभव कैसा रहा या यदि आपके पास कोई प्रतिक्रिया है तो हमें ट्विटर [@alchemyplatform](https://twitter.com/AlchemyPlatform) पर टैग करें!