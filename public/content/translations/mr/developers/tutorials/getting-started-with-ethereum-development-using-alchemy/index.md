---
title: "Ethereum डेव्हलपमेंटसोबत सुरुवात करणे"
description: "हे Ethereum डेव्हलपमेंटची सुरुवात करण्यासाठी नवशिक्यांचे मार्गदर्शक आहे. आम्ही तुम्हाला API एंडपॉइंट तयार करण्यापासून, कमांड लाइन रिक्वेस्ट करण्यापर्यंत, ते तुमचे पहिले web3 स्क्रिप्ट लिहिण्यापर्यंत घेऊन जाऊ! ब्लॉकचेन डेव्हलपमेंट अनुभवाची आवश्यकता नाही!"
author: "Elan Halpern"
tags:
  [
    "JavaScript",
    "ethers.js",
    "नोड्स",
    "querying",
    "Alchemy"
  ]
skill: beginner
lang: mr
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum आणि Alchemy चे लोगो](./ethereum-alchemy.png)

हे Ethereum डेव्हलपमेंटची सुरुवात करण्यासाठी नवशिक्यांचे मार्गदर्शक आहे. या ट्युटोरियलसाठी आम्ही [Alchemy](https://alchemyapi.io/) वापरणार आहोत, जे Maker, 0x, MyEtherWallet, Dharma आणि Kyber सह 70% आघाडीच्या ब्लॉकचेन ॲप्समधील लाखो वापरकर्त्यांना सामर्थ्य देणारे, अग्रगण्य ब्लॉकचेन डेव्हलपर प्लॅटफॉर्म आहे. Alchemy आम्हाला Ethereum चेनवर एका API एंडपॉइंटमध्ये प्रवेश देईल जेणेकरून आम्ही व्यवहार (transactions) वाचू आणि लिहू शकू.

आम्ही तुम्हाला Alchemy वर साइन अप करण्यापासून ते तुमचे पहिले web3 स्क्रिप्ट लिहिण्यापर्यंत घेऊन जाऊ! ब्लॉकचेन डेव्हलपमेंट अनुभवाची आवश्यकता नाही!

## १. मोफत Alchemy खात्यासाठी साइन अप करा {#sign-up-for-a-free-alchemy-account}

Alchemy वर खाते तयार करणे सोपे आहे, [येथे विनामूल्य साइन अप करा](https://auth.alchemy.com/).

## २. Alchemy ॲप तयार करा {#create-an-alchemy-app}

Ethereum चेनशी संवाद साधण्यासाठी आणि Alchemy ची उत्पादने वापरण्यासाठी, तुमच्या रिक्वेस्ट प्रमाणित करण्याकरिता तुम्हाला एका API की ची आवश्यकता आहे.

तुम्ही [डॅशबोर्डवरून API की तयार करू शकता](https://dashboard.alchemy.com/). नवीन की तयार करण्यासाठी, खाली दर्शविल्याप्रमाणे “ॲप तयार करा” (Create App) वर नेव्हिगेट करा:

[_ShapeShift_](https://shapeshift.com/) _यांचे त्यांचा डॅशबोर्ड दाखवण्याची परवानगी दिल्याबद्दल विशेष आभार!_

![Alchemy डॅशबोर्ड](./alchemy-dashboard.png)

तुमची नवीन की मिळवण्यासाठी “ॲप तयार करा” (Create App) अंतर्गत तपशील भरा. तुम्ही पूर्वी तयार केलेले ॲप्स आणि तुमच्या टीमने बनवलेले ॲप्स देखील येथे पाहू शकता. कोणत्याही ॲपसाठी विद्यमान की मिळवण्यासाठी “की पाहा” (View Key) वर क्लिक करा.

![Alchemy सह ॲप तयार करा स्क्रीनशॉट](./create-app.png)

तुम्ही “ॲप्स” (Apps) वर फिरवून आणि एक निवडून विद्यमान API की देखील मिळवू शकता. तुम्ही येथे “की पाहा” (View Key) करू शकता, तसेच विशिष्ट डोमेन व्हाइटलिस्ट करण्यासाठी, अनेक डेव्हलपर टूल्स पाहण्यासाठी, आणि ॲनालिटिक्स पाहण्यासाठी “ॲप संपादित करा” (Edit App) देखील वापरू शकता.

![API की कशा मिळवायच्या हे वापरकर्त्याला दाखवणारी Gif](./pull-api-keys.gif)

## ३. कमांड लाइनवरून रिक्वेस्ट करा {#make-a-request-from-the-command-line}

JSON-RPC आणि curl वापरून Alchemy द्वारे Ethereum ब्लॉकचेनशी संवाद साधा.

मॅन्युअल रिक्वेस्टसाठी, आम्ही `POST` रिक्वेस्टद्वारे `JSON-RPC` शी संवाद साधण्याची शिफारस करतो. फक्त `Content-Type: application/json` हेडर आणि तुमची क्वेरी `POST` बॉडी म्हणून खालील फील्डसह पास करा:

- `jsonrpc`: JSON-RPC आवृत्ती—सध्या, फक्त `2.0` समर्थित आहे.
- `method`: ETH API पद्धत. [API संदर्भ पाहा.](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: पद्धतीला पास करण्यासाठी पॅरामीटर्सची यादी.
- `id`: तुमच्या रिक्वेस्टचा ID. हे प्रतिसादाद्वारे परत केले जाईल जेणेकरून प्रतिसाद कोणत्या रिक्वेस्टचा आहे याचा तुम्ही मागोवा ठेवू शकाल.

सध्याची गॅस किंमत मिळवण्यासाठी तुम्ही कमांड लाइनवरून चालवू शकता असे एक उदाहरण येथे आहे:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**टीप:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) ला तुमच्या स्वतःच्या API की `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` ने बदला._

**परिणाम:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## ४. तुमचा Web3 क्लायंट सेट अप करा {#set-up-your-web3-client}

**तुमच्याकडे विद्यमान क्लायंट असल्यास,** तुमचा सध्याचा नोड प्रोव्हायडर URL तुमच्या API की सह Alchemy URL मध्ये बदला: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_टीप:_** खालील स्क्रिप्ट्स **नोड संदर्भात** चालवणे किंवा **फाईलमध्ये सेव्ह करणे** आवश्यक आहे, कमांड लाइनवरून चालवू नये. तुमच्याकडे आधीपासून Node किंवा npm इंस्टॉल केलेले नसल्यास, मॅकसाठी हे द्रुत [सेट-अप मार्गदर्शक](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) पाहा.

अशा अनेक [Web3 लायब्ररीज](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) आहेत ज्या तुम्ही Alchemy सह समाकलित करू शकता, तथापि, आम्ही [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) वापरण्याची शिफारस करतो, जे web3.js साठी एक ड्रॉप-इन रिप्लेसमेंट आहे, आणि जे Alchemy सोबत अखंडपणे काम करण्यासाठी तयार आणि कॉन्फिगर केले आहे. हे स्वयंचलित पुन्हा प्रयत्न (automatic retries) आणि मजबूत WebSocket समर्थन यासारखे अनेक फायदे प्रदान करते.

AlchemyWeb3.js इंस्टॉल करण्यासाठी, **तुमच्या प्रोजेक्ट डिरेक्टरीमध्ये नेव्हिगेट करा** आणि चालवा:

**Yarn सह:**

```
yarn add @alch/alchemy-web3
```

**NPM सह:**

```
npm install @alch/alchemy-web3
```

Alchemy च्या नोड इन्फ्रास्ट्रक्चरशी संवाद साधण्यासाठी, NodeJS मध्ये चालवा किंवा हे जावास्क्रिप्ट फाईलमध्ये जोडा:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## ५. तुमची पहिली Web3 स्क्रिप्ट लिहा! {#write-your-first-web3-script}

आता थोडे web3 प्रोग्रामिंग करून पाहण्यासाठी, आपण Ethereum मेननेटवरून नवीनतम ब्लॉक नंबर प्रिंट करणारी एक साधी स्क्रिप्ट लिहूया.

**१.** **तुम्ही आधीच केले नसेल तर, तुमच्या टर्मिनलमध्ये एक नवीन प्रोजेक्ट डिरेक्टरी तयार करा आणि त्यात cd करा:**

```
mkdir web3-example
cd web3-example
```

**२.** **तुम्ही आधीच केली नसेल तर तुमच्या प्रोजेक्टमध्ये Alchemy web3 (किंवा कोणतीही web3) डिपेन्डन्सी इंस्टॉल करा:**

```
npm install @alch/alchemy-web3
```

**३.** **`index.js` नावाची फाईल तयार करा आणि खालील सामग्री जोडा:**

> तुम्ही शेवटी `demo` ला तुमच्या Alchemy HTTP API की ने बदलले पाहिजे.

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("नवीनतम ब्लॉक नंबर आहे " + blockNumber)
}
main()
```

async गोष्टींशी अपरिचित आहात? ही [मीडियम पोस्ट](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) पाहा.

\*\*4. **node वापरून ते तुमच्या टर्मिनलमध्ये चालवा**

```
node index.js
```

\*\*5. **तुम्हाला आता तुमच्या कन्सोलमध्ये नवीनतम ब्लॉक नंबर आउटपुट दिसेल!**

```
नवीनतम ब्लॉक नंबर आहे 11043912
```

**व्वा!** अभिनंदन! **तुम्ही Alchemy वापरून तुमची पहिली web3 स्क्रिप्ट नुकतीच लिहिली आहे 🎉**

पुढे काय करायचे याची खात्री नाही? आमच्या [हॅलो वर्ल्ड स्मार्ट कॉन्ट्रॅक्ट मार्गदर्शक](https://www.alchemy.com/docs/hello-world-smart-contract) मध्ये तुमचा पहिला स्मार्ट कॉन्ट्रॅक्ट तैनात (deploy) करून आणि काही solidity प्रोग्रामिंग करून पाहा, किंवा [डॅशबोर्ड डेमो ॲप](https://docs.alchemyapi.io/tutorials/demo-app) सह तुमचे डॅशबोर्ड ज्ञान तपासा!

_[Alchemy सह विनामूल्य साइन अप करा](https://auth.alchemy.com/), आमचे [दस्तऐवजीकरण](https://www.alchemy.com/docs/) पाहा, आणि नवीनतम बातम्यांसाठी, आम्हाला [Twitter](https://twitter.com/AlchemyPlatform) वर फॉलो करा_.
