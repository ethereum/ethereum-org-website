---
title: "शुरुआती लोगों के लिए Hello World स्मार्ट अनुबंध"
description: "इथेरियम पर एक सरल स्मार्ट अनुबंध लिखने और तैनात करने पर परिचयात्मक ट्यूटोरियल।"
author: "एलान"
tags: ["Solidity", "Hardhat", "Alchemy", "स्मार्ट अनुबंध", "तैनाती"]
skill: beginner
breadcrumb: "Hello World अनुबंध"
lang: hi
published: 2021-03-31
---

यदि आप ब्लॉकचेन विकास में नए हैं और नहीं जानते कि कहां से शुरू करें, या यदि आप केवल यह समझना चाहते हैं कि स्मार्ट अनुबंधों को कैसे तैनात करें और उनके साथ कैसे इंटरैक्ट करें, तो यह मार्गदर्शिका आपके लिए है। हम एक वर्चुअल वॉलेट [मेटामास्क](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), और [Alchemy](https://www.alchemy.com/eth) का उपयोग करके Sepolia टेस्ट नेटवर्क पर एक सरल स्मार्ट अनुबंध बनाने और तैनात करने की प्रक्रिया से गुजरेंगे (चिंता न करें यदि आप अभी तक इनमें से किसी का मतलब नहीं समझते हैं, हम इसे समझाएंगे)।

एक बार जब आपका अनुबंध तैनात हो जाता है, तो आप [इसके लिए एक यूजर इंटरफ़ेस बना सकते हैं](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)।

यदि आपके किसी भी बिंदु पर प्रश्न हैं, तो बेझिझक [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संपर्क करें!

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

हमें लेन-देन भेजने और प्राप्त करने के लिए एक इथेरियम खाते की आवश्यकता है। इस ट्यूटोरियल के लिए, हम मेटामास्क का उपयोग करेंगे, जो ब्राउज़र में एक वर्चुअल वॉलेट है जिसका उपयोग आपके इथेरियम खाता पते को प्रबंधित करने के लिए किया जाता है। [लेन-देन](/developers/docs/transactions/) के बारे में अधिक जानकारी।

आप मेटामास्क डाउनलोड कर सकते हैं और [यहां](https://metamask.io/download) मुफ्त में एक इथेरियम खाता बना सकते हैं। जब आप एक खाता बना रहे हों, या यदि आपके पास पहले से एक खाता है, तो नेटवर्क ड्रॉपडाउन मेनू का उपयोग करके "Sepolia" टेस्ट नेटवर्क पर स्विच करना सुनिश्चित करें (ताकि हम असली पैसे से काम न कर रहे हों)।

यदि आपको Sepolia सूचीबद्ध नहीं दिखाई देता है, तो ऊपरी दाएं कोने में मेनू खोलें, "Networks" चुनें, और नेटवर्क सूची के निचले भाग में "Show test networks" को चालू करें ([टेस्टनेट देखने के लिए मेटामास्क की मार्गदर्शिका](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) देखें)। फिर नेटवर्क चयन मेनू में "Sepolia" चुनें।

![metamask sepolia example](./metamask-sepolia-example.png)

## चरण 4: फॉसेट से ईथर जोड़ें {#step-4}

अपने स्मार्ट अनुबंध को टेस्ट नेटवर्क पर तैनात करने के लिए, हमें कुछ नकली ETH की आवश्यकता होगी। Sepolia ETH प्राप्त करने के लिए आप विभिन्न फॉसेट की सूची देखने के लिए [Sepolia नेटवर्क विवरण](/developers/docs/networks/#sepolia) पर जा सकते हैं। यदि एक काम नहीं करता है, तो दूसरा आज़माएं क्योंकि वे कभी-कभी खाली हो सकते हैं। कुछ फॉसेट के पात्रता नियम होते हैं; उदाहरण के लिए, Alchemy के Sepolia फॉसेट के लिए आवश्यक है कि प्राप्तकर्ता पते में इथेरियम मेननेट पर कम से कम 0.001 ETH हो। नेटवर्क ट्रैफ़िक के कारण आपका नकली ETH प्राप्त करने में कुछ समय लग सकता है। आपको इसके तुरंत बाद अपने मेटामास्क खाते में ETH दिखाई देना चाहिए!

## चरण 5: अपना बैलेंस जांचें {#step-5}

यह दोबारा जांचने के लिए कि हमारा बैलेंस वहां है, आइए [Alchemy के कंपोज़र टूल](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) का उपयोग करके एक [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) अनुरोध करें। यह हमारे वॉलेट में ETH की मात्रा वापस कर देगा। अपना मेटामास्क खाता पता दर्ज करने और "Send Request" पर क्लिक करने के बाद, आपको इस तरह की प्रतिक्रिया दिखाई देनी चाहिए:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **नोट:** यह परिणाम Wei में है, ETH में नहीं। Wei का उपयोग ईथर के सबसे छोटे मूल्यवर्ग के रूप में किया जाता है। Wei से ETH में रूपांतरण है: 1 eth = 10<sup>18</sup> Wei। इसलिए यदि हम 0x2B5E3AF16B1880000 को दशमलव में बदलते हैं तो हमें 5\*10¹⁸ मिलता है जो 5 ETH के बराबर है।
>
> उफ़! हमारा नकली पैसा सब वहीं है <Emoji text=":money_mouth_face:" size={1} />.

## चरण 6: हमारे प्रोजेक्ट को इनिशियलाइज़ करें {#step-6}

सबसे पहले, हमें अपने प्रोजेक्ट के लिए एक फ़ोल्डर बनाना होगा। अपनी कमांड लाइन पर जाएं और टाइप करें:

```sh
mkdir hello-world
cd hello-world
```

अब जब हम अपने प्रोजेक्ट फ़ोल्डर के अंदर हैं, तो हम प्रोजेक्ट को इनिशियलाइज़ करने के लिए `npm init` का उपयोग करेंगे। यदि आपके पास पहले से npm इंस्टॉल नहीं है, तो [Node.js इंस्टॉलेशन निर्देशों](https://nodejs.org/en/download/) का पालन करें (हमें इस ट्यूटोरियल के लिए Node.js और npm की आवश्यकता होगी)।

```sh
npm init
```

इससे कोई खास फर्क नहीं पड़ता कि आप इंस्टॉलेशन प्रश्नों का उत्तर कैसे देते हैं, संदर्भ के लिए हमने इसे इस प्रकार किया है:

```console
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

package.json को स्वीकृति दें। Hardhat 3, जिसे हम आगे इंस्टॉल करेंगे, केवल ES मॉड्यूल प्रोजेक्ट्स का समर्थन करता है, इसलिए प्रोजेक्ट को उसी रूप में चिह्नित करें:

```sh
npm pkg set type=module
```

और हम तैयार हैं!

## चरण 7: [Hardhat](https://hardhat.org/docs/getting-started) डाउनलोड करें {#step-7}

Hardhat आपके इथेरियम सॉफ़्टवेयर को संकलित, तैनात, परीक्षण और डीबग करने के लिए एक विकास वातावरण है। यह लाइव चेन पर तैनात करने से पहले स्थानीय रूप से स्मार्ट अनुबंध और विकेंद्रीकृत एप्लिकेशन (dapp) बनाते समय डेवलपर्स की मदद करता है।

Hardhat 3 के लिए Node.js v22.13.0 या उसके बाद के संस्करण की आवश्यकता होती है। हमारे `hello-world` प्रोजेक्ट के अंदर चलाएं:

```sh
npm install --save-dev hardhat
```

[इंस्टॉलेशन निर्देशों](https://hardhat.org/docs/getting-started) पर अधिक जानकारी के लिए इस पेज को देखें।

## चरण 8: Hardhat प्रोजेक्ट बनाएं {#step-8}

`npx hardhat --init` चलाने से एक संपूर्ण नमूना प्रोजेक्ट उत्पन्न होगा, लेकिन इस ट्यूटोरियल के लिए हम चीजों को मैन्युअल रूप से सेट करेंगे ताकि आप हर हिस्से को देख सकें। अपने प्रोजेक्ट फ़ोल्डर के रूट में, निम्नलिखित सामग्री के साथ `hardhat.config.js` नामक एक फ़ाइल बनाएं:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

यहीं पर हम अपने प्रोजेक्ट के लिए सभी सेटअप निर्दिष्ट करेंगे (चरण 13 पर)। अभी के लिए, यह केवल Hardhat को बताता है कि Solidity कंपाइलर के किस संस्करण का उपयोग करना है।

## चरण 9: प्रोजेक्ट फ़ोल्डर जोड़ें {#step-9}

अपने प्रोजेक्ट को व्यवस्थित रखने के लिए हम दो नए फ़ोल्डर बनाएंगे। अपनी कमांड लाइन में अपने प्रोजेक्ट की रूट डायरेक्टरी पर जाएं और टाइप करें:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` वह जगह है जहां हम अपनी hello world स्मार्ट अनुबंध कोड फ़ाइल रखेंगे
- `scripts/` वह जगह है जहां हम अपने अनुबंध को तैनात करने और उसके साथ इंटरैक्ट करने के लिए स्क्रिप्ट रखेंगे

## चरण 10: अपना अनुबंध लिखें {#step-10}

आप खुद से पूछ रहे होंगे, आख़िर हम कोड कब लिखने वाले हैं?? खैर, हम यहाँ हैं, चरण 10 पर।

अपने पसंदीदा एडिटर में hello-world प्रोजेक्ट खोलें (हमें [VSCode](https://code.visualstudio.com/) पसंद है)। स्मार्ट अनुबंध Solidity नामक भाषा में लिखे जाते हैं, जिसका उपयोग हम अपना HelloWorld.sol स्मार्ट अनुबंध लिखने के लिए करेंगे।‌

1.  “contracts” फ़ोल्डर में जाएं और HelloWorld.sol नामक एक नई फ़ाइल बनाएं
2.  नीचे एथेरियम फाउंडेशन का एक नमूना Hello World स्मार्ट अनुबंध दिया गया है जिसका उपयोग हम इस ट्यूटोरियल के लिए करेंगे। नीचे दी गई सामग्री को अपनी HelloWorld.sol फ़ाइल में कॉपी और पेस्ट करें, और यह समझने के लिए टिप्पणियों को पढ़ना सुनिश्चित करें कि यह अनुबंध क्या करता है:

```solidity
// SPDX-License-Identifier: MIT
// सिमेंटिक वर्ज़निंग का उपयोग करते हुए, Solidity का संस्करण निर्दिष्ट करता है।
// अधिक जानें: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// `HelloWorld` नामक एक अनुबंध को परिभाषित करता है।
// एक अनुबंध फ़ंक्शंस और डेटा (इसकी स्थिति) का एक संग्रह है। एक बार तैनात होने के बाद, एक अनुबंध इथेरियम ब्लॉकचेन पर एक विशिष्ट पते पर रहता है। अधिक जानें: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // `string` प्रकार के एक स्टेट वेरिएबल `message` की घोषणा करता है।
   // स्टेट वेरिएबल वे वेरिएबल होते हैं जिनके मान स्थायी रूप से अनुबंध स्टोरेज में संग्रहीत होते हैं। कीवर्ड `public` वेरिएबल्स को अनुबंध के बाहर से सुलभ बनाता है और एक फ़ंक्शन बनाता है जिसे अन्य अनुबंध या क्लाइंट मान तक पहुंचने के लिए कॉल कर सकते हैं।
   string public message;

   // कई क्लास-आधारित ऑब्जेक्ट-ओरिएंटेड भाषाओं के समान, कंस्ट्रक्टर एक विशेष फ़ंक्शन है जो केवल अनुबंध निर्माण पर निष्पादित होता है।
   // कंस्ट्रक्टर्स का उपयोग अनुबंध के डेटा को इनिशियलाइज़ करने के लिए किया जाता है। अधिक जानें: https://docs.soliditylang.org/en/latest/contracts.html#constructors
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

हमने एक मेटामास्क वॉलेट, Alchemy खाता बना लिया है, और अपना स्मार्ट अनुबंध लिख लिया है, अब इन तीनों को जोड़ने का समय आ गया है।

आपके वर्चुअल वॉलेट से भेजे गए प्रत्येक लेन-देन के लिए आपकी अद्वितीय निजी कुंजी का उपयोग करके एक हस्ताक्षर की आवश्यकता होती है। हमारे प्रोग्राम को यह अनुमति प्रदान करने के लिए, हम अपनी निजी कुंजी (और Alchemy API कुंजी) को एक पर्यावरण फ़ाइल में सुरक्षित रूप से संग्रहीत कर सकते हैं।

> लेन-देन भेजने के बारे में अधिक जानने के लिए, [लेन-देन दस्तावेज़](/developers/docs/transactions/) देखें।

हमारे प्रोजेक्ट की रूट डायरेक्टरी में एक `.env` फ़ाइल बनाएं, और इसमें अपनी मेटामास्क निजी कुंजी और HTTP Alchemy API URL जोड़ें।

- अपनी निजी कुंजी निर्यात करने के लिए [इन निर्देशों](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) का पालन करें
- HTTP Alchemy API URL प्राप्त करने के लिए नीचे देखें

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL कॉपी करें

आपकी `.env` इस तरह दिखनी चाहिए:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

इन्हें वास्तव में हमारे कोड से जोड़ने के लिए, हम चरण 13 पर अपनी `hardhat.config.js` फ़ाइल में इन चरों का संदर्भ देंगे। Node.js अपने आप `.env` फ़ाइलों को पढ़ सकता है, इसलिए इंस्टॉल करने के लिए कोई अतिरिक्त पैकेज नहीं है।

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> को कमिट न करें! कृपया सुनिश्चित करें कि आप अपनी <code>.env</code> फ़ाइल को कभी भी किसी के साथ साझा या उजागर न करें, क्योंकि ऐसा करने पर आप अपने रहस्यों से समझौता कर रहे हैं। यदि आप संस्करण नियंत्रण का उपयोग कर रहे हैं, तो अपनी <code>.env</code> को एक <a href="https://git-scm.com/docs/gitignore">gitignore</a> फ़ाइल में जोड़ें।
</AlertDescription>
</AlertContent>
</Alert>

## चरण 12: Ethers.js इंस्टॉल करें {#step-12-install-ethersjs}

Ethers.js एक लाइब्रेरी है जो [मानक जेसन-आरपीसी विधियों](/developers/docs/apis/json-rpc/) को अधिक उपयोगकर्ता के अनुकूल विधियों के साथ लपेटकर इथेरियम के साथ इंटरैक्ट करना और अनुरोध करना आसान बनाती है।

Hardhat अतिरिक्त टूलिंग और विस्तारित कार्यक्षमता के लिए [प्लगइन्स](https://hardhat.org/docs/plugins/official-plugins) को एकीकृत करना बहुत आसान बनाता है। हम अनुबंध तैनाती के लिए [Ethers प्लगइन](https://hardhat.org/docs/plugins/hardhat-ethers) का लाभ उठाएंगे ([Ethers.js](https://docs.ethers.org/v6/) में कुछ बहुत ही स्पष्ट अनुबंध तैनाती विधियां हैं)।

अपनी प्रोजेक्ट डायरेक्टरी में टाइप करें:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

हम अगले चरण में अपनी `hardhat.config.js` में भी प्लगइन जोड़ेंगे।

## चरण 13: hardhat.config.js को अपडेट करें {#step-13-update-hardhatconfigjs}

हमने अब तक कई निर्भरताएं और प्लगइन्स जोड़े हैं, अब हमें `hardhat.config.js` को अपडेट करने की आवश्यकता है ताकि हमारे प्रोजेक्ट को उन सभी के बारे में पता चल सके।

अपनी `hardhat.config.js` को इस तरह दिखने के लिए अपडेट करें:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// यदि यह मौजूद है, तो .env फ़ाइल से API_URL और PRIVATE_KEY को process.env में लोड करें।
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` Hardhat को केवल आवश्यकता होने पर ही पर्यावरण चर से प्रत्येक मान पढ़ने के लिए कहता है, इसलिए `compile` जैसे कमांड मान सेट होने से पहले भी काम करते हैं। यदि आप अपनी निजी कुंजी को सादे टेक्स्ट फ़ाइल में नहीं रखना चाहते हैं, तो Hardhat [एन्क्रिप्टेड कीस्टोर से कॉन्फ़िगरेशन चर](https://hardhat.org/docs/guides/configuration-variables) भी पढ़ सकता है।

## चरण 14: अपना अनुबंध संकलित करें {#step-14-compile-our-contracts}

यह सुनिश्चित करने के लिए कि अब तक सब कुछ काम कर रहा है, आइए अपने अनुबंध को संकलित करें। `compile` कार्य अंतर्निहित Hardhat कार्यों में से एक है।

कमांड लाइन से चलाएं:

```sh
npx hardhat compile
```

जब आप पहली बार संकलित करते हैं, तो Hardhat Solidity कंपाइलर डाउनलोड करता है। फिर आपको `Compiled 1 Solidity file with solc 0.8.34` जैसा कुछ दिखाई देना चाहिए। यदि नहीं, तो आप हमेशा [Alchemy डिस्कॉर्ड](https://discord.gg/gWuC7zB) में संदेश भेज सकते हैं।

## चरण 15: अपनी डिप्लॉय स्क्रिप्ट लिखें {#step-15-write-our-deploy-scripts}

अब जब हमारा अनुबंध लिखा जा चुका है और हमारी कॉन्फ़िगरेशन फ़ाइल तैयार है, तो यह हमारी अनुबंध डिप्लॉय स्क्रिप्ट लिखने का समय है।

`scripts/` फ़ोल्डर में जाएं और `deploy.js` नामक एक नई फ़ाइल बनाएं, जिसमें निम्नलिखित सामग्री जोड़ें:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// तैनाती शुरू करें, एक प्रॉमिस लौटाते हुए जो एक अनुबंध ऑब्जेक्ट में रिज़ॉल्व होता है।
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

आइए देखें कि कोड की इनमें से प्रत्येक पंक्ति क्या करती है।

```js
const { ethers } = await network.create()
```

Hardhat 3 में, एक स्क्रिप्ट स्पष्ट रूप से एक नेटवर्क से कनेक्शन खोलती है। जब आप स्क्रिप्ट चलाते हैं तो `network.create()` उस नेटवर्क से जुड़ता है जिसे आप `--network` विकल्प के साथ चुनते हैं, और `hardhat-ethers` प्लगइन उस कनेक्शन में एक `ethers` ऑब्जेक्ट जोड़ता है।

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js में एक `ContractFactory` एक एब्स्ट्रैक्शन है जिसका उपयोग नए स्मार्ट अनुबंधों को तैनात करने के लिए किया जाता है, इसलिए यहाँ `HelloWorld` हमारे hello world अनुबंध के उदाहरणों के लिए एक फ़ैक्टरी है। `hardhat-ethers` प्लगइन का उपयोग करते समय `ContractFactory` और `Contract` उदाहरण डिफ़ॉल्ट रूप से पहले हस्ताक्षरकर्ता से जुड़े होते हैं।

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

`ContractFactory` पर `deploy()` को कॉल करने से तैनाती शुरू हो जाएगी, और एक `Promise` वापस आएगा जो एक `Contract` में रिज़ॉल्व होता है। यह वह ऑब्जेक्ट है जिसमें हमारे प्रत्येक स्मार्ट अनुबंध फ़ंक्शन के लिए एक विधि है। जो तर्क आप `deploy()` को पास करते हैं, वे अनुबंध के कंस्ट्रक्टर में जाते हैं, यहाँ प्रारंभिक संदेश।

`waitForDeployment()` तब तक प्रतीक्षा करता है जब तक कि तैनाती लेन-देन एक ब्लॉक में शामिल नहीं हो जाता, और `getAddress()` नए अनुबंध का पता लौटाता है। अधिक जानकारी के लिए [ethers.js अनुबंध दस्तावेज़](https://docs.ethers.org/v6/api/contract/) देखें।

## चरण 16: अपना अनुबंध तैनात करें {#step-16-deploy-our-contract}

हम अंततः अपने स्मार्ट अनुबंध को तैनात करने के लिए तैयार हैं! कमांड लाइन पर जाएं और चलाएं:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

फिर आपको कुछ ऐसा दिखाई देना चाहिए:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

यदि हम [Sepolia Etherscan](https://sepolia.etherscan.io/) पर जाते हैं और अपने अनुबंध पते की खोज करते हैं तो हम यह देखने में सक्षम होंगे कि इसे सफलतापूर्वक तैनात किया गया है। लेन-देन कुछ इस तरह दिखेगा:

![etherscan contract](./etherscan-contract.png)

`From` पता आपके मेटामास्क खाता पते से मेल खाना चाहिए और To पते में "Contract Creation" लिखा होगा, लेकिन यदि हम लेन-देन पर क्लिक करते हैं तो हम `To` फ़ील्ड में अपना अनुबंध पता देखेंगे:

![etherscan transaction](./etherscan-transaction.png)

बधाई हो! आपने अभी-अभी इथेरियम चेन पर एक स्मार्ट अनुबंध तैनात किया है 🎉

यह समझने के लिए कि आंतरिक रूप से क्या हो रहा है, आप उन अनुरोधों को देख सकते हैं जो आपके "Hello World" ऐप को आपके [Alchemy डैशबोर्ड](https://dashboard.alchemy.com/) में प्राप्त हुए हैं।

वहाँ आप कुछ जेसन-आरपीसी कॉल देखेंगे जो Hardhat/Ethers ने हमारे लिए आंतरिक रूप से किए थे जब हमने `.deploy()` फ़ंक्शन को कॉल किया था। यहाँ ध्यान देने योग्य दो महत्वपूर्ण कॉल [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction) हैं, जो वास्तव में हमारे अनुबंध को Sepolia चेन पर लिखने का अनुरोध है, और [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) जो हैश दिए जाने पर हमारे लेन-देन के बारे में जानकारी पढ़ने का अनुरोध है (लेन-देन भेजते समय एक विशिष्ट पैटर्न)। लेन-देन भेजने के बारे में अधिक जानने के लिए, [लेन-देन दस्तावेज़](/developers/docs/transactions/) देखें।

इस ट्यूटोरियल के लिए बस इतना ही। इसके बाद, आप [अपने अनुबंध के लिए एक यूजर इंटरफ़ेस बना सकते हैं](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)।
