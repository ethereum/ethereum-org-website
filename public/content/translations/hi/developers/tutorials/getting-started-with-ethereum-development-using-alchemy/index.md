---
title: इथेरियम डेवलपमेंट के साथ शुरुआत करना
description: "यह इथेरियम डेवलपमेंट शुरू करने के लिए शुरुआती लोगों के लिए एक गाइड है। हम आपको एक API एंडपॉइंट शुरू करने से लेकर, कमांड लाइन अनुरोध करने, और आपकी पहली Web3 स्क्रिप्ट लिखने तक ले जाएंगे! ब्लॉकचेन डेवलपमेंट के किसी अनुभव की आवश्यकता नहीं है!"
author: "एलन हैल्पर्न"
tags:
  - JavaScript
  - ethers.js
  - नोड्स
  - क्वेरी करना
  - Alchemy
skill: beginner
breadcrumb: शुरुआत करना
lang: hi
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

यह इथेरियम डेवलपमेंट शुरू करने के लिए शुरुआती लोगों के लिए एक गाइड है। इस ट्यूटोरियल के लिए हम [Alchemy](https://alchemyapi.io/) का उपयोग करेंगे, जो एक अग्रणी ब्लॉकचेन डेवलपर प्लेटफॉर्म है और Maker, 0x, MyEtherWallet, Dharma और Kyber सहित शीर्ष 70% ब्लॉकचेन ऐप्स के लाखों उपयोगकर्ताओं को शक्ति प्रदान करता है। Alchemy हमें इथेरियम चेन पर एक API एंडपॉइंट तक पहुंच प्रदान करेगा ताकि हम लेनदेन को पढ़ और लिख सकें।

हम आपको Alchemy पर साइन अप करने से लेकर आपकी पहली Web3 स्क्रिप्ट लिखने तक ले जाएंगे! ब्लॉकचेन डेवलपमेंट के किसी अनुभव की आवश्यकता नहीं है!

## 1. एक मुफ़्त Alchemy खाते के लिए साइन अप करें {#sign-up-for-a-free-alchemy-account}

Alchemy के साथ खाता बनाना आसान है, [यहां मुफ़्त में साइन अप करें](https://auth.alchemy.com/)।

## 2. एक Alchemy ऐप बनाएं {#create-an-alchemy-app}

इथेरियम चेन के साथ संचार करने और Alchemy के उत्पादों का उपयोग करने के लिए, आपको अपने अनुरोधों को प्रमाणित करने के लिए एक API कुंजी की आवश्यकता होती है।

आप [डैशबोर्ड से API कुंजियां बना सकते हैं](https://dashboard.alchemy.com/)। एक नई कुंजी बनाने के लिए, नीचे दिखाए अनुसार “Create App” पर जाएं:

[_ShapeShift_](https://shapeshift.com/) _को उनका डैशबोर्ड दिखाने की अनुमति देने के लिए विशेष धन्यवाद!_

![Alchemy dashboard](./alchemy-dashboard.png)

अपनी नई कुंजी प्राप्त करने के लिए “Create App” के अंतर्गत विवरण भरें। आप यहां अपने द्वारा पहले बनाए गए ऐप्स और अपनी टीम द्वारा बनाए गए ऐप्स भी देख सकते हैं। किसी भी ऐप के लिए “View Key” पर क्लिक करके मौजूदा कुंजियां प्राप्त करें।

![Create app with Alchemy screenshot](./create-app.png)

आप “Apps” पर होवर करके और किसी एक को चुनकर मौजूदा API कुंजियां भी प्राप्त कर सकते हैं। आप यहां “View Key” कर सकते हैं, साथ ही विशिष्ट डोमेन को व्हाइटलिस्ट करने, कई डेवलपर टूल देखने और एनालिटिक्स देखने के लिए “Edit App” कर सकते हैं।

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. कमांड लाइन से एक अनुरोध करें {#make-a-request-from-the-command-line}

जेसन-आरपीसी और curl का उपयोग करके Alchemy के माध्यम से इथेरियम ब्लॉकचेन के साथ इंटरैक्ट करें।

मैन्युअल अनुरोधों के लिए, हम `POST` अनुरोधों के माध्यम से `JSON-RPC` के साथ इंटरैक्ट करने की सलाह देते हैं। बस `Content-Type: application/json` हेडर और अपनी क्वेरी को `POST` बॉडी के रूप में निम्नलिखित फ़ील्ड के साथ पास करें:

- `jsonrpc`: जेसन-आरपीसी संस्करण—वर्तमान में, केवल `2.0` समर्थित है।
- `method`: ETH API विधि। [API संदर्भ देखें।](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: विधि में पास करने के लिए मापदंडों की एक सूची।
- `id`: आपके अनुरोध की ID। यह प्रतिक्रिया द्वारा वापस की जाएगी ताकि आप ट्रैक रख सकें कि प्रतिक्रिया किस अनुरोध से संबंधित है।

यहां एक उदाहरण दिया गया है जिसे आप वर्तमान गैस मूल्य प्राप्त करने के लिए कमांड लाइन से चला सकते हैं:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**नोट:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) को अपनी स्वयं की API कुंजी `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` से बदलें।_

**परिणाम:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. अपना Web3 क्लाइंट सेट करें {#set-up-your-web3-client}

**यदि आपके पास एक मौजूदा क्लाइंट है,** तो अपने वर्तमान नोड प्रदाता URL को अपनी API कुंजी के साथ एक Alchemy URL में बदलें: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_नोट:_** नीचे दी गई स्क्रिप्ट को **नोड संदर्भ** में चलाया जाना चाहिए या **किसी फ़ाइल में सहेजा जाना चाहिए**, कमांड लाइन से नहीं चलाया जाना चाहिए। यदि आपके पास पहले से Node या npm स्थापित नहीं है, तो Mac के लिए यह त्वरित [सेट-अप गाइड](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) देखें।

ऐसी कई [Web3 लाइब्रेरी](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) हैं जिन्हें आप Alchemy के साथ एकीकृत कर सकते हैं, हालांकि, हम [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) का उपयोग करने की सलाह देते हैं, जो Web3.js का एक ड्रॉप-इन रिप्लेसमेंट है, जिसे Alchemy के साथ निर्बाध रूप से काम करने के लिए बनाया और कॉन्फ़िगर किया गया है। यह स्वचालित पुनर्प्रयास और मजबूत WebSocket समर्थन जैसे कई लाभ प्रदान करता है।

AlchemyWeb3.js स्थापित करने के लिए, **अपनी प्रोजेक्ट डायरेक्टरी में जाएं** और चलाएं:

**Yarn के साथ:**

```
yarn add @alch/alchemy-web3
```

**NPM के साथ:**

```
npm install @alch/alchemy-web3
```

Alchemy के नोड इन्फ्रास्ट्रक्चर के साथ इंटरैक्ट करने के लिए, NodeJS में चलाएं या इसे JavaScript फ़ाइल में जोड़ें:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. अपनी पहली Web3 स्क्रिप्ट लिखें! {#write-your-first-web3-script}

अब थोड़ी Web3 प्रोग्रामिंग का व्यावहारिक अनुभव प्राप्त करने के लिए हम एक सरल स्क्रिप्ट लिखेंगे जो इथेरियम मेननेट से नवीनतम ब्लॉक नंबर प्रिंट करती है।

**1. यदि आपने पहले से ऐसा नहीं किया है, तो अपने टर्मिनल में एक नई प्रोजेक्ट डायरेक्टरी बनाएं और उसमें cd करें:**

```
mkdir web3-example
cd web3-example
```

**2. यदि आपने पहले से नहीं किया है तो अपने प्रोजेक्ट में Alchemy Web3 (या कोई भी Web3) निर्भरता स्थापित करें:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` नामक एक फ़ाइल बनाएं और निम्नलिखित सामग्री जोड़ें:**

> आपको अंततः `demo` को अपनी Alchemy HTTP API कुंजी से बदलना चाहिए।

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async चीज़ों से अपरिचित हैं? यह [Medium पोस्ट](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) देखें।

**4. इसे नोड का उपयोग करके अपने टर्मिनल में चलाएं**

```
node index.js
```

**5. अब आपको अपने कंसोल में नवीनतम ब्लॉक नंबर आउटपुट देखना चाहिए!**

```
The latest block number is 11043912
```

**वाह! बधाई हो! आपने अभी Alchemy का उपयोग करके अपनी पहली Web3 स्क्रिप्ट लिखी है 🎉**

सुनिश्चित नहीं हैं कि आगे क्या करना है? अपना पहला स्मार्ट अनुबंध तैनात करने का प्रयास करें और हमारे [हैलो वर्ल्ड स्मार्ट अनुबंध गाइड](https://www.alchemy.com/docs/hello-world-smart-contract) में कुछ Solidity प्रोग्रामिंग के साथ व्यावहारिक अनुभव प्राप्त करें, या [डैशबोर्ड डेमो ऐप](https://docs.alchemyapi.io/tutorials/demo-app) के साथ अपने डैशबोर्ड ज्ञान का परीक्षण करें!

_[Alchemy के साथ मुफ़्त में साइन अप करें](https://auth.alchemy.com/), हमारे [दस्तावेज़](https://www.alchemy.com/docs/) देखें, और नवीनतम समाचारों के लिए, हमें [Twitter](https://twitter.com/AlchemyPlatform) पर फ़ॉलो करें_।