---
title: इथेरियम डेव्हलपमेंटला सुरुवात करणे
description: "इथेरियम डेव्हलपमेंटला सुरुवात करण्यासाठी हे नवशिक्यांसाठीचे मार्गदर्शक आहे. आम्ही तुम्हाला API एंडपॉईंट सुरू करण्यापासून, कमांड लाईन विनंती करण्यापर्यंत आणि तुमची पहिली Web3 स्क्रिप्ट लिहिण्यापर्यंत मार्गदर्शन करू! ब्लॉकचेन डेव्हलपमेंटच्या कोणत्याही अनुभवाची आवश्यकता नाही!"
author: "एलन हॅल्पर्न"
tags:
  - JavaScript
  - ethers.js
  - नोड्स
  - क्वेरी करणे
  - Alchemy
skill: beginner
breadcrumb: सुरुवात करणे
lang: mr
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

इथेरियम डेव्हलपमेंटला सुरुवात करण्यासाठी हे नवशिक्यांसाठीचे मार्गदर्शक आहे. या ट्युटोरिअलसाठी आम्ही [Alchemy](https://alchemyapi.io/) वापरणार आहोत, जे Maker, 0x, MyEtherWallet, Dharma आणि Kyber यांसारख्या 70% आघाडीच्या ब्लॉकचेन ॲप्समधील लाखो वापरकर्त्यांना सक्षम करणारे एक प्रमुख ब्लॉकचेन डेव्हलपर प्लॅटफॉर्म आहे. Alchemy आपल्याला इथेरियम चेनवरील API एंडपॉईंटचा ॲक्सेस देईल जेणेकरून आपण ट्रान्झॅक्शन्स वाचू आणि लिहू शकू.

आम्ही तुम्हाला Alchemy वर साईन अप करण्यापासून ते तुमची पहिली Web3 स्क्रिप्ट लिहिण्यापर्यंत मार्गदर्शन करू! ब्लॉकचेन डेव्हलपमेंटच्या कोणत्याही अनुभवाची आवश्यकता नाही!

## 1. मोफत Alchemy खात्यासाठी साईन अप करा {#sign-up-for-a-free-alchemy-account}

Alchemy वर खाते तयार करणे सोपे आहे, [येथे मोफत साईन अप करा](https://auth.alchemy.com/).

## 2. Alchemy ॲप तयार करा {#create-an-alchemy-app}

इथेरियम चेनशी संवाद साधण्यासाठी आणि Alchemy ची उत्पादने वापरण्यासाठी, तुमच्या विनंत्या प्रमाणित करण्यासाठी तुम्हाला API की ची आवश्यकता आहे.

तुम्ही [डॅशबोर्डवरून API की तयार करू शकता](https://dashboard.alchemy.com/). नवीन की तयार करण्यासाठी, खाली दर्शविल्याप्रमाणे “Create App” वर जा:

आम्हाला त्यांचा डॅशबोर्ड दाखवण्याची परवानगी दिल्याबद्दल [_ShapeShift_](https://shapeshift.com/) _चे विशेष आभार!_

![Alchemy dashboard](./alchemy-dashboard.png)

तुमची नवीन की मिळवण्यासाठी “Create App” अंतर्गत तपशील भरा. तुम्ही यापूर्वी तयार केलेले आणि तुमच्या टीमने तयार केलेले ॲप्स देखील येथे पाहू शकता. कोणत्याही ॲपसाठी “View Key” वर क्लिक करून विद्यमान की मिळवा.

![Create app with Alchemy screenshot](./create-app.png)

तुम्ही “Apps” वर होव्हर करून आणि एखादे ॲप निवडून विद्यमान API की देखील मिळवू शकता. तुम्ही येथे “View Key” करू शकता, तसेच विशिष्ट डोमेन्सना व्हाईटलिस्ट करण्यासाठी, अनेक डेव्हलपर टूल्स पाहण्यासाठी आणि ॲनालिटिक्स पाहण्यासाठी “Edit App” करू शकता.

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## 3. कमांड लाईनवरून विनंती करा {#make-a-request-from-the-command-line}

जेसॉन-आरपीसी आणि curl वापरून Alchemy द्वारे इथेरियम ब्लॉकचेनशी संवाद साधा.

मॅन्युअल विनंत्यांसाठी, आम्ही `POST` विनंत्यांद्वारे `JSON-RPC` शी संवाद साधण्याची शिफारस करतो. फक्त `Content-Type: application/json` हेडर आणि तुमची क्वेरी `POST` बॉडी म्हणून खालील फील्ड्ससह पास करा:

- `jsonrpc`: जेसॉन-आरपीसी आवृत्ती—सध्या, फक्त `2.0` समर्थित आहे.
- `method`: ETH API पद्धत. [API संदर्भ पहा.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: पद्धतीला पास करण्यासाठी पॅरामीटर्सची सूची.
- `id`: तुमच्या विनंतीचा ID. प्रतिसादाद्वारे परत केला जाईल जेणेकरून तुम्ही प्रतिसाद कोणत्या विनंतीचा आहे याचा मागोवा ठेवू शकाल.

सध्याची गॅसची किंमत मिळवण्यासाठी तुम्ही कमांड लाईनवरून रन करू शकता असे एक उदाहरण येथे आहे:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**टीप:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) ला तुमच्या स्वतःच्या API की `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` ने बदला._

**निकाल:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. तुमचा Web3 क्लायंट सेट करा {#set-up-your-web3-client}

**जर तुमच्याकडे विद्यमान क्लायंट असेल,** तर तुमचा सध्याचा नोड प्रोव्हायडर URL तुमच्या API की सह Alchemy URL मध्ये बदला: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_टीप:_** खालील स्क्रिप्ट्स **नोड कॉन्टेक्स्टमध्ये** रन करणे किंवा **फाईलमध्ये सेव्ह करणे** आवश्यक आहे, कमांड लाईनवरून रन करू नये. जर तुमच्याकडे आधीपासून Node किंवा npm इन्स्टॉल केलेले नसेल, तर हे द्रुत [मॅकसाठी सेट-अप मार्गदर्शक](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) पहा.

अनेक [Web3 लायब्ररीज](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) आहेत ज्या तुम्ही Alchemy सोबत इंटिग्रेट करू शकता, तथापि, आम्ही [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) वापरण्याची शिफारस करतो, जे Web3.js साठी एक ड्रॉप-इन रिप्लेसमेंट आहे, जे Alchemy सोबत अखंडपणे काम करण्यासाठी तयार आणि कॉन्फिगर केलेले आहे. हे स्वयंचलित रिट्राय आणि मजबूत WebSocket सपोर्ट यांसारखे अनेक फायदे प्रदान करते.

AlchemyWeb3.js इन्स्टॉल करण्यासाठी, **तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये जा** आणि रन करा:

**Yarn सह:**

```
yarn add @alch/alchemy-web3
```

**NPM सह:**

```
npm install @alch/alchemy-web3
```

Alchemy च्या नोड इन्फ्रास्ट्रक्चरशी संवाद साधण्यासाठी, NodeJS मध्ये रन करा किंवा हे JavaScript फाईलमध्ये जोडा:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. तुमची पहिली Web3 स्क्रिप्ट लिहा! {#write-your-first-web3-script}

आता थोड्या Web3 प्रोग्रामिंगचा प्रत्यक्ष अनुभव घेण्यासाठी आपण एक साधी स्क्रिप्ट लिहू जी इथरियम मेननेटवरून नवीनतम ब्लॉक क्रमांक प्रिंट करेल.

**1. जर तुम्ही आधीच केले नसेल, तर तुमच्या टर्मिनलमध्ये एक नवीन प्रोजेक्ट डिरेक्टरी तयार करा आणि त्यात cd करा:**

```
mkdir web3-example
cd web3-example
```

**2. जर तुम्ही आधीच केले नसेल तर तुमच्या प्रोजेक्टमध्ये Alchemy Web3 (किंवा कोणतीही Web3) डिपेंडन्सी इन्स्टॉल करा:**

```
npm install @alch/alchemy-web3
```

**3. `index.js` नावाची फाईल तयार करा आणि खालील मजकूर जोडा:**

> तुम्ही शेवटी `demo` ला तुमच्या Alchemy HTTP API की ने बदलले पाहिजे.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async गोष्टींबद्दल माहिती नाही? ही [Medium पोस्ट](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) पहा.

**4. नोड वापरून ते तुमच्या टर्मिनलमध्ये रन करा**

```
node index.js
```

**5. आता तुम्हाला तुमच्या कन्सोलमध्ये नवीनतम ब्लॉक क्रमांकाचे आउटपुट दिसायला हवे!**

```
The latest block number is 11043912
```

**व्वा! अभिनंदन! तुम्ही नुकतीच Alchemy वापरून तुमची पहिली Web3 स्क्रिप्ट लिहिली आहे 🎉**

पुढे काय करावे हे माहित नाही? तुमचे पहिले स्मार्ट कॉन्ट्रॅक्ट डिप्लॉय करण्याचा प्रयत्न करा आणि आमच्या [Hello World स्मार्ट कॉन्ट्रॅक्ट मार्गदर्शकामध्ये](https://www.alchemy.com/docs/hello-world-smart-contract) काही Solidity प्रोग्रामिंगचा प्रत्यक्ष अनुभव घ्या, किंवा [डॅशबोर्ड डेमो ॲपसह](https://docs.alchemyapi.io/tutorials/demo-app) तुमच्या डॅशबोर्ड ज्ञानाची चाचणी घ्या!

_[Alchemy वर मोफत साईन अप करा](https://auth.alchemy.com/), आमचे [डॉक्युमेंटेशन](https://www.alchemy.com/docs/) पहा, आणि ताज्या बातम्यांसाठी, आम्हाला [Twitter](https://twitter.com/AlchemyPlatform) वर फॉलो करा_.