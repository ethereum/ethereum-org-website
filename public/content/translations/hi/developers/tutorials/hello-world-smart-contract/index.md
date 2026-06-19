---
title: शुरुआती लोगों के लिए Hello World स्मार्ट अनुबंध
description: इथेरियम पर एक सरल स्मार्ट अनुबंध लिखने और तैनात करने पर परिचयात्मक ट्यूटोरियल।
author: "एलान"
tags: ["Solidity", "Hardhat", "Alchemy", "स्मार्ट अनुबंध", "तैनाती"]
skill: beginner
breadcrumb: Hello World अनुबंध
lang: hi
published: 2021-03-31
---

यदि आप ब्लॉकचेन डेवलपमेंट में नए हैं और नहीं जानते कि कहां से शुरू करें, या यदि आप केवल यह समझना चाहते हैं कि स्मार्ट अनुबंधों को कैसे तैनात किया जाए और उनके साथ कैसे इंटरैक्ट किया जाए, तो यह गाइड आपके लिए है। हम एक वर्चुअल वॉलेट [मेटामास्क](https://metamask.io/), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org/), और [Alchemy](https://www.alchemy.com/eth) का उपयोग करके Sepolia टेस्ट नेटवर्क पर एक सरल स्मार्ट अनुबंध बनाने और तैनात करने के बारे में जानेंगे (चिंता न करें यदि आप अभी तक यह नहीं समझते हैं कि इनमें से किसी का क्या अर्थ है, हम इसे समझाएंगे)।

इस ट्यूटोरियल के [भाग 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) में हम देखेंगे कि एक बार यहां तैनात होने के बाद हम अपने स्मार्ट अनुबंध के साथ कैसे इंटरैक्ट कर सकते हैं, और [भाग 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) में हम इसे Etherscan पर प्रकाशित करने के तरीके को कवर करेंगे।

यदि आपके पास किसी भी बिंदु पर प्रश्न हैं, तो बेझिझक [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संपर्क करें!

## चरण 1: इथेरियम नेटवर्क से जुड़ें {#step-1}

इथेरियम चेन से अनुरोध करने के कई तरीके हैं। सरलता के लिए, हम Alchemy पर एक मुफ्त खाते का उपयोग करेंगे, जो एक ब्लॉकचेन डेवलपर प्लेटफॉर्म और API है जो हमें अपने स्वयं के नोड चलाए बिना इथेरियम चेन के साथ संवाद करने की अनुमति देता है। प्लेटफॉर्म में निगरानी और विश्लेषण के लिए डेवलपर टूल भी हैं जिनका हम इस ट्यूटोरियल में लाभ उठाएंगे ताकि यह समझा जा सके कि हमारे स्मार्ट अनुबंध की तैनाती में आंतरिक रूप से क्या हो रहा है। यदि आपके पास पहले से Alchemy खाता नहीं है, तो [आप यहां मुफ्त में साइन अप कर सकते हैं](https://dashboard.alchemy.com/signup)।

## चरण 2: अपना ऐप (और API कुंजी) बनाएं {#step-2}

एक बार जब आप Alchemy खाता बना लेते हैं, तो आप एक ऐप बनाकर API कुंजी उत्पन्न कर सकते हैं। यह हमें Sepolia टेस्ट नेटवर्क से अनुरोध करने की अनुमति देगा। यदि आप टेस्टनेट से परिचित नहीं हैं, तो [इस पेज](/developers/docs/networks/) को देखें।

1.  नेव बार में "Select an app" चुनकर और "Create new app" पर क्लिक करके अपने Alchemy डैशबोर्ड में "Create new app" पेज पर जाएं

![Hello world create app](./hello-world-create-app.png)

2. अपने ऐप को "Hello World" नाम दें, एक संक्षिप्त विवरण दें, और एक उपयोग का मामला चुनें, उदाहरण के लिए, "Infra & Tooling"। इसके बाद, "Ethereum" खोजें और नेटवर्क चुनें।

![create app view hello world](./create-app-view-hello-world.png)

3. आगे बढ़ने के लिए "Next" पर क्लिक करें, फिर "Create app" और बस हो गया! आपका ऐप नेव बार ड्रॉपडाउन मेनू में दिखाई देना चाहिए, जिसमें कॉपी करने के लिए एक API कुंजी उपलब्ध होगी।

## चरण 3: एक इथेरियम खाता (पता) बनाएं {#step-3}

लेन-देन भेजने और प्राप्त करने के लिए हमें एक इथेरियम खाते की आवश्यकता है। इस ट्यूटोरियल के लिए, हम मेटामास्क का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके इथेरियम खाता पते को प्रबंधित करने के लिए किया जाता है। [लेन-देन](/developers/docs/transactions/) के बारे में अधिक जानकारी।

आप मेटामास्क डाउनलोड कर सकते हैं और [यहां](https://metamask.io/download) मुफ्त में एक इथेरियम खाता बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से एक खाता है, तो नेटवर्क ड्रॉपडाउन मेनू का उपयोग करके "Sepolia" टेस्ट नेटवर्क पर स्विच करना सुनिश्चित करें (ताकि हम असली पैसे से लेन-देन न कर रहे हों)।

यदि आपको Sepolia सूचीबद्ध नहीं दिखता है, तो मेनू में जाएं, फिर Advanced में जाएं और "Show test networks" को चालू करने के लिए नीचे स्क्रॉल करें। नेटवर्क चयन मेनू में, टेस्टनेट की सूची खोजने के लिए "Custom" टैब चुनें और "Sepolia" चुनें।

![metamask sepolia example](./metamask-sepolia-example.png)

## चरण 4: फॉसेट से ईथर जोड़ें {#step-4}

टेस्ट नेटवर्क पर हमारे स्मार्ट अनुबंध को तैनात करने के लिए, हमें कुछ नकली ETH की आवश्यकता होगी। Sepolia ETH प्राप्त करने के लिए आप विभिन्न फॉसेट की सूची देखने के लिए [Sepolia नेटवर्क विवरण](/developers/docs/networks/#sepolia) पर जा सकते हैं। यदि एक काम नहीं करता है, तो दूसरा आज़माएं क्योंकि वे कभी-कभी खाली हो सकते हैं। नेटवर्क ट्रैफ़िक के कारण आपका नकली ETH प्राप्त करने में कुछ समय लग सकता है। आपको जल्द ही अपने मेटामास्क खाते में ETH दिखाई देना चाहिए!

## चरण 5: अपना बैलेंस जांचें {#step-5}

यह दोबारा जांचने के लिए कि हमारा बैलेंस वहां है, आइए [Alchemy के कंपोज़र टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) का उपयोग करके एक [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) अनुरोध करें। यह हमारे वॉलेट में ETH की मात्रा वापस कर देगा। अपना मेटामास्क खाता पता दर्ज करने और "Send Request" पर क्लिक करने के बाद, आपको इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **नोट:** यह परिणाम Wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। Wei से ETH में रूपांतरण है: 1 eth = 10<sup>18</sup> Wei। इसलिए यदि हम 0x2B5E3AF16B1880000 को दशमलव में बदलते हैं तो हमें 5\*10¹⁸ मिलता है जो 5 ETH के बराबर है।
>
> उफ़! हमारा नकली पैसा सब वहीं है <Emoji text=":money_mouth_face:" size={1} />.

## चरण 6: हमारे प्रोजेक्ट को इनिशियलाइज़ करें {#step-6}

सबसे पहले, हमें अपने प्रोजेक्ट के लिए एक फ़ोल्डर बनाना होगा। अपनी कमांड लाइन पर जाएं और टाइप करें:

```
mkdir hello-world
cd hello-world
```

अब जब हम अपने प्रोजेक्ट फ़ोल्डर के अंदर हैं, तो हम प्रोजेक्ट को इनिशियलाइज़ करने के लिए `npm init` का उपयोग करेंगे। यदि आपके पास पहले से npm स्थापित नहीं है, तो [इन निर्देशों](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) का पालन करें (हमें Node.js की भी आवश्यकता होगी इसलिए उसे भी डाउनलोड करें!)।

```
npm init
```

इससे कोई खास फर्क नहीं पड़ता कि आप इंस्टॉलेशन के सवालों का जवाब कैसे देते हैं, संदर्भ के लिए हमने इसे इस तरह किया है:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json को स्वीकृति दें और हम आगे बढ़ने के लिए तैयार हैं!

## चरण 7: [Hardhat](https://hardhat.org/getting-started/#overview) डाउनलोड करें {#step-7}

Hardhat आपके इथेरियम सॉफ़्टवेयर को संकलित, तैनात, परीक्षण और डीबग करने के लिए एक विकास वातावरण है। यह लाइव चेन पर तैनात करने से पहले स्थानीय रूप से स्मार्ट अनुबंध और विकेंद्रीकृत एप्लिकेशन (dapp) बनाते समय डेवलपर्स की मदद करता है।

हमारे `hello-world` प्रोजेक्ट के अंदर चलाएं:

```
npm install --save-dev hardhat
```

[इंस्टॉलेशन निर्देशों](https://hardhat.org/getting-started/#overview) पर अधिक जानकारी के लिए इस पेज को देखें।

## चरण 8: Hardhat प्रोजेक्ट बनाएं {#step-8}

हमारे प्रोजेक्ट फ़ोल्डर के अंदर चलाएं:

```
npx hardhat
```

इसके बाद आपको एक स्वागत संदेश और यह चुनने का विकल्प दिखाई देना चाहिए कि आप क्या करना चाहते हैं। "create an empty hardhat.config.js" चुनें:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

यह हमारे लिए एक `hardhat.config.js` फ़ाइल उत्पन्न करेगा जहां हम अपने प्रोजेक्ट के लिए सभी सेटअप निर्दिष्ट करेंगे (चरण 13 पर)।

## चरण 9: प्रोजेक्ट फ़ोल्डर जोड़ें {#step-9}

अपने प्रोजेक्ट को व्यवस्थित रखने के लिए हम दो नए फ़ोल्डर बनाएंगे। अपनी कमांड लाइन में अपने प्रोजेक्ट की रूट डायरेक्टरी पर जाएं और टाइप करें:

```
mkdir contracts
mkdir scripts
```

- `contracts/` वह जगह है जहां हम अपनी hello world स्मार्ट अनुबंध कोड फ़ाइल रखेंगे
- `scripts/` वह जगह है जहां हम अपने अनुबंध को तैनात करने और उसके साथ इंटरैक्ट करने के लिए स्क्रिप्ट रखेंगे

## चरण 10: अपना अनुबंध लिखें {#step-10}

आप खुद से पूछ रहे होंगे कि हम कोड कब लिखने वाले हैं?? खैर, हम यहाँ हैं, चरण 10 पर।

अपने पसंदीदा एडिटर में hello-world प्रोजेक्ट खोलें (हमें [VSCode](https://code.visualstudio.com/) पसंद है)। स्मार्ट अनुबंध Solidity नामक भाषा में लिखे जाते हैं जिसका उपयोग हम अपना HelloWorld.sol स्मार्ट अनुबंध लिखने के लिए करेंगे।‌

1.  "contracts" फ़ोल्डर में जाएं और HelloWorld.sol नामक एक नई फ़ाइल बनाएं
2.  नीचे एथेरियम फाउंडेशन का एक नमूना Hello World स्मार्ट अनुबंध है जिसका उपयोग हम इस ट्यूटोरियल के लिए करेंगे। नीचे दी गई सामग्री को अपनी HelloWorld.sol फ़ाइल में कॉपी और पेस्ट करें, और यह अनुबंध क्या करता है यह समझने के लिए टिप्पणियों को पढ़ना सुनिश्चित करें:

```solidity
// सिमेंटिक वर्ज़निंग का उपयोग करके, Solidity के संस्करण को निर्दिष्ट करता है।
// अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध फ़ंक्शंस और डेटा (इसकी स्थिति) का एक संग्रह है। एक बार तैनात होने के बाद, एक अनुबंध इथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है। अधिक जानें: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` प्रकार के एक स्टेट वेरिएबल `message` की घोषणा करता है।
   // स्टेट वेरिएबल वे वेरिएबल होते हैं जिनके मान स्थायी रूप से अनुबंध स्टोरेज में संग्रहीत होते हैं। `public` कीवर्ड वेरिएबल्स को एक अनुबंध के बाहर से सुलभ बनाता है और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
   string public message;

   // कई क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, कंस्ट्रक्टर एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
   // कंस्ट्रक्टर्स का उपयोग अनुबंध के डेटा को इनिशियलाइज़ करने के लिए किया जाता है। अधिक जानें:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // एक स्ट्रिंग तर्क `initMessage` स्वीकार करता है और मान को अनुबंध के `message` स्टोरेज वेरिएबल में सेट करता है)।
      message = initMessage;
   }

   // एक सार्वजनिक फ़ंक्शन जो एक स्ट्रिंग तर्क स्वीकार करता है और `message` स्टोरेज वेरिएबल को अपडेट करता है।
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

यह एक बहुत ही सरल स्मार्ट अनुबंध है जो निर्माण पर एक संदेश संग्रहीत करता है और `update` फ़ंक्शन को कॉल करके इसे अपडेट किया जा सकता है।

## चरण 11: मेटामास्क और Alchemy को अपने प्रोजेक्ट से कनेक्ट करें {#step-11}

हमने एक मेटामास्क वॉलेट, Alchemy खाता बनाया है, और अपना स्मार्ट अनुबंध लिखा है, अब इन तीनों को जोड़ने का समय आ गया है।

आपके वर्चुअल वॉलेट से भेजे गए प्रत्येक लेन-देन के लिए आपकी अद्वितीय निजी कुंजी का उपयोग करके एक हस्ताक्षर की आवश्यकता होती है। हमारे प्रोग्राम को यह अनुमति प्रदान करने के लिए, हम अपनी निजी कुंजी (और Alchemy API कुंजी) को एक पर्यावरण फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं।

> लेन-देन भेजने के बारे में अधिक जानने के लिए, Web3 का उपयोग करके लेन-देन भेजने पर [यह ट्यूटोरियल](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) देखें।

सबसे पहले, अपनी प्रोजेक्ट डायरेक्टरी में dotenv पैकेज स्थापित करें:

```
npm install dotenv --save
```

फिर, हमारे प्रोजेक्ट की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं, और इसमें अपनी मेटामास्क निजी कुंजी और HTTP Alchemy API URL जोड़ें।

- अपनी निजी कुंजी निर्यात करने के लिए [इन निर्देशों](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) का पालन करें
- HTTP Alchemy API URL प्राप्त करने के लिए नीचे देखें

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL कॉपी करें

आपकी `.env` इस तरह दिखनी चाहिए:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

वास्तव में इन्हें हमारे कोड से जोड़ने के लिए, हम चरण 13 पर अपनी `hardhat.config.js` फ़ाइल में इन चरों का संदर्भ देंगे।

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> को कमिट न करें! कृपया सुनिश्चित करें कि आप अपनी <code>.env</code> फ़ाइल को कभी भी किसी के साथ साझा या उजागर न करें, क्योंकि ऐसा करने पर आप अपने रहस्यों से समझौता कर रहे हैं। यदि आप संस्करण नियंत्रण का उपयोग कर रहे हैं, तो अपनी <code>.env</code> को एक <a href="https://git-scm.com/docs/gitignore">gitignore</a> फ़ाइल में जोड़ें।
</AlertDescription>
</AlertContent>
</Alert>

## चरण 12: Ethers.js स्थापित करें {#step-12-install-ethersjs}

Ethers.js एक लाइब्रेरी है जो [मानक जेसन-आरपीसी विधियों](/developers/docs/apis/json-rpc/) को अधिक उपयोगकर्ता के अनुकूल विधियों के साथ लपेटकर इथेरियम के साथ इंटरैक्ट करना और अनुरोध करना आसान बनाती है।

Hardhat अतिरिक्त टूलिंग और विस्तारित कार्यक्षमता के लिए [प्लगइन्स](https://hardhat.org/plugins/) को एकीकृत करना बहुत आसान बनाता है। हम अनुबंध तैनाती के लिए [Ethers प्लगइन](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) का लाभ उठाएंगे ([Ethers.js](https://github.com/ethers-io/ethers.js/) में कुछ बहुत ही स्पष्ट अनुबंध तैनाती विधियां हैं)।

अपनी प्रोजेक्ट डायरेक्टरी में टाइप करें:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

हमें अगले चरण में अपनी `hardhat.config.js` में ethers की भी आवश्यकता होगी।

## चरण 13: hardhat.config.js को अपडेट करें {#step-13-update-hardhatconfigjs}

हमने अब तक कई निर्भरताएं और प्लगइन्स जोड़े हैं, अब हमें `hardhat.config.js` को अपडेट करने की आवश्यकता है ताकि हमारे प्रोजेक्ट को उन सभी के बारे में पता चल सके।

अपनी `hardhat.config.js` को इस तरह दिखने के लिए अपडेट करें:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## चरण 14: अपना अनुबंध संकलित करें {#step-14-compile-our-contracts}

यह सुनिश्चित करने के लिए कि अब तक सब कुछ काम कर रहा है, आइए अपने अनुबंध को संकलित करें। `compile` कार्य अंतर्निहित hardhat कार्यों में से एक है।

कमांड लाइन से चलाएं:

```
npx hardhat compile
```

आपको `SPDX license identifier not provided in source file` के बारे में एक चेतावनी मिल सकती है, लेकिन इसके बारे में चिंता करने की कोई आवश्यकता नहीं है — उम्मीद है कि बाकी सब कुछ ठीक लग रहा है! यदि नहीं, तो आप हमेशा [Alchemy डिस्कॉर्ड](https://discord.gg/u72VCg3) में संदेश भेज सकते हैं।

## चरण 15: अपनी तैनाती स्क्रिप्ट लिखें {#step-15-write-our-deploy-scripts}

अब जब हमारा अनुबंध लिखा जा चुका है और हमारी कॉन्फ़िगरेशन फ़ाइल तैयार है, तो यह हमारी अनुबंध तैनाती स्क्रिप्ट लिखने का समय है।

`scripts/` फ़ोल्डर में जाएं और `deploy.js` नामक एक नई फ़ाइल बनाएं, जिसमें निम्नलिखित सामग्री जोड़ें:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat अपने [अनुबंध ट्यूटोरियल](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) में यह समझाने का एक अद्भुत काम करता है कि कोड की इनमें से प्रत्येक पंक्ति क्या करती है, हमने यहां उनके स्पष्टीकरण को अपनाया है।

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js में एक `ContractFactory` नए स्मार्ट अनुबंधों को तैनात करने के लिए उपयोग किया जाने वाला एक एब्स्ट्रैक्शन है, इसलिए यहां `HelloWorld` हमारे hello world अनुबंध के उदाहरणों के लिए एक फ़ैक्टरी है। `hardhat-ethers` प्लगइन का उपयोग करते समय `ContractFactory` और `Contract` उदाहरण डिफ़ॉल्ट रूप से पहले हस्ताक्षरकर्ता से जुड़े होते हैं।

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory` पर `deploy()` कॉल करने से तैनाती शुरू हो जाएगी, और एक `Promise` वापस आ जाएगा जो एक `Contract` में रिज़ॉल्व होता है। यह वह ऑब्जेक्ट है जिसमें हमारे प्रत्येक स्मार्ट अनुबंध फ़ंक्शन के लिए एक विधि है।

## चरण 16: अपना अनुबंध तैनात करें {#step-16-deploy-our-contract}

हम अंततः अपने स्मार्ट अनुबंध को तैनात करने के लिए तैयार हैं! कमांड लाइन पर जाएं और चलाएं:

```
npx hardhat run scripts/deploy.js --network sepolia
```

इसके बाद आपको कुछ इस तरह दिखाई देना चाहिए:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

यदि हम [Sepolia Etherscan](https://sepolia.etherscan.io/) पर जाते हैं और अपने अनुबंध पते की खोज करते हैं तो हमें यह देखने में सक्षम होना चाहिए कि इसे सफलतापूर्वक तैनात किया गया है। लेन-देन कुछ इस तरह दिखेगा:

![etherscan contract](./etherscan-contract.png)

`From` पता आपके मेटामास्क खाता पते से मेल खाना चाहिए और To पते में "Contract Creation" लिखा होगा लेकिन यदि हम लेन-देन में क्लिक करते हैं तो हम `To` फ़ील्ड में अपना अनुबंध पता देखेंगे:

![etherscan transaction](./etherscan-transaction.png)

बधाई हो! आपने अभी-अभी इथेरियम चेन पर एक स्मार्ट अनुबंध तैनात किया है 🎉

आंतरिक रूप से क्या हो रहा है यह समझने के लिए, आइए अपने [Alchemy डैशबोर्ड](https://dashboard.alchemyapi.io/explorer) में एक्सप्लोरर टैब पर जाएं। यदि आपके पास कई Alchemy ऐप हैं तो ऐप द्वारा फ़िल्टर करना और "Hello World" चुनना सुनिश्चित करें।
![hello world explorer](./hello-world-explorer.png)

यहां आपको कुछ जेसन-आरपीसी कॉल दिखाई देंगे जो Hardhat/Ethers ने हमारे लिए आंतरिक रूप से किए थे जब हमने `.deploy()` फ़ंक्शन को कॉल किया था। यहां ध्यान देने योग्य दो महत्वपूर्ण कॉल [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction) हैं, जो वास्तव में हमारे अनुबंध को Sepolia चेन पर लिखने का अनुरोध है, और [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) जो हैश दिए जाने पर हमारे लेन-देन के बारे में जानकारी पढ़ने का अनुरोध है (लेन-देन करते समय एक विशिष्ट पैटर्न)। लेन-देन भेजने के बारे में अधिक जानने के लिए, [Web3 का उपयोग करके लेन-देन भेजने](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) पर यह ट्यूटोरियल देखें।

इस ट्यूटोरियल के भाग 1 के लिए बस इतना ही, भाग 2 में हम वास्तव में अपने प्रारंभिक संदेश को अपडेट करके [अपने स्मार्ट अनुबंध के साथ इंटरैक्ट करेंगे](https://www.alchemy.com/docs/interacting-with-a-smart-contract), और भाग 3 में हम [अपने स्मार्ट अनुबंध को Etherscan पर प्रकाशित करेंगे](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) ताकि सभी को पता चल सके कि इसके साथ कैसे इंटरैक्ट करना है।

**Alchemy के बारे में अधिक जानना चाहते हैं? हमारी [वेबसाइट](https://www.alchemy.com/eth) देखें। क्या आप कभी कोई अपडेट मिस नहीं करना चाहते हैं? हमारे न्यूज़लेटर की सदस्यता [यहां](https://www.alchemy.com/newsletter) लें! हमारे [डिस्कॉर्ड](https://discord.gg/u72VCg3) से भी जुड़ना सुनिश्चित करें।**।