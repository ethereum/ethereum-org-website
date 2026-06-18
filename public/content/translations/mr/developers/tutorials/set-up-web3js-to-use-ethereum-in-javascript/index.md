---
title: JavaScript मध्ये इथेरियम ब्लॉकचेन वापरण्यासाठी web3.js सेट अप करा
description: JavaScript ॲप्लिकेशन्समधून इथेरियम ब्लॉकचेनशी संवाद साधण्यासाठी web3.js लायब्ररी कशी सेट अप आणि कॉन्फिगर करावी हे शिका.
author: "jdourlens"
tags: ["web3.js", "javascript"]
skill: beginner
breadcrumb: web3.js सेटअप
lang: mr
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

या ट्युटोरियलमध्ये, आपण इथेरियम ब्लॉकचेनशी संवाद साधण्यासाठी [web3.js](https://web3js.readthedocs.io/) सह सुरुवात कशी करावी हे पाहणार आहोत. Web3.js चा वापर फ्रंटएंड आणि बॅकएंड दोन्हीमध्ये ब्लॉकचेनवरून डेटा वाचण्यासाठी किंवा ट्रान्झॅक्शन्स करण्यासाठी आणि स्मार्ट कॉन्ट्रॅक्ट्स प्रस्थापित करण्यासाठी देखील केला जाऊ शकतो.

पहिली पायरी म्हणजे तुमच्या प्रोजेक्टमध्ये web3.js समाविष्ट करणे. वेब पेजमध्ये याचा वापर करण्यासाठी, तुम्ही JSDeliver सारख्या CDN चा वापर करून लायब्ररी थेट इम्पोर्ट करू शकता.

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

जर तुम्हाला तुमच्या बॅकएंडमध्ये किंवा बिल्ड वापरणाऱ्या फ्रंटएंड प्रोजेक्टमध्ये वापरण्यासाठी लायब्ररी इन्स्टॉल करायची असेल, तर तुम्ही npm वापरून ती इन्स्टॉल करू शकता:

```bash
npm install web3 --save
```

त्यानंतर Node.js स्क्रिप्ट किंवा Browserify फ्रंटएंड प्रोजेक्टमध्ये Web3.js इम्पोर्ट करण्यासाठी, तुम्ही JavaScript ची खालील ओळ वापरू शकता:

```js
const Web3 = require("web3")
```

आता आपण प्रोजेक्टमध्ये लायब्ररी समाविष्ट केली आहे, आपल्याला ती इनिशियलाइज (initialize) करणे आवश्यक आहे. तुमच्या प्रोजेक्टला ब्लॉकचेनशी संवाद साधता आला पाहिजे. बहुतांश इथेरियम लायब्ररीज RPC कॉल्सद्वारे [नोड](/developers/docs/nodes-and-clients/) शी संवाद साधतात. आपला Web3 प्रोव्हायडर सुरू करण्यासाठी, आपण प्रोव्हायडरची URL कन्स्ट्रक्टर म्हणून पास करून Web3 इन्स्टन्स तयार करू. जर तुमच्या कॉम्प्युटरवर नोड किंवा [ganache इन्स्टन्स चालू असेल](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) तर ते असे दिसेल:

```js
const web3 = new Web3("http://localhost:8545")
```

जर तुम्हाला होस्ट केलेल्या नोडमध्ये थेट ॲक्सेस मिळवायचा असेल, तर तुम्ही [नोड्स ॲज अ सर्व्हिस (nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service) वर पर्याय शोधू शकता.

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

आपण आपला Web3 इन्स्टन्स योग्यरित्या कॉन्फिगर केला आहे की नाही हे तपासण्यासाठी, आपण `getBlockNumber` फंक्शन वापरून नवीनतम ब्लॉक नंबर मिळवण्याचा प्रयत्न करू. हे फंक्शन पॅरामीटर म्हणून कॉलबॅक स्वीकारते आणि ब्लॉक नंबर इंटिजर (integer) म्हणून परत करते.

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

जर तुम्ही हा प्रोग्राम कार्यान्वित केला, तर तो फक्त नवीनतम ब्लॉक नंबर प्रिंट करेल: ब्लॉकचेनचा सर्वात वरचा भाग. तुमच्या कोडमध्ये कॉलबॅक्स नेस्ट करणे टाळण्यासाठी तुम्ही `await/async` फंक्शन कॉल्स देखील वापरू शकता:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

तुम्ही Web3 इन्स्टन्सवर उपलब्ध असलेली सर्व फंक्शन्स [अधिकृत web3.js डॉक्युमेंटेशन](https://docs.web3js.org/) मध्ये पाहू शकता.

बहुतांश Web3 लायब्ररीज असिंक्रोनस (asynchronous) असतात कारण बॅकग्राउंडमध्ये लायब्ररी नोडला जेसॉन-आरपीसी कॉल्स करते जे निकाल परत पाठवतात.

<Divider />

जर तुम्ही ब्राउझरमध्ये काम करत असाल, तर काही वॉलेट्स थेट Web3 इन्स्टन्स इंजेक्ट करतात आणि शक्य असेल तेव्हा तुम्ही त्याचा वापर करण्याचा प्रयत्न केला पाहिजे, विशेषतः जर तुम्ही ट्रान्झॅक्शन्स करण्यासाठी युजरच्या इथेरियम पत्त्याशी संवाद साधण्याची योजना आखत असाल.

मेटामास्क वॉलेट उपलब्ध आहे की नाही हे शोधण्यासाठी आणि असल्यास ते सक्षम करण्याचा प्रयत्न करण्यासाठी येथे स्निपेट (snippet) दिले आहे. हे तुम्हाला नंतर युजरचा बॅलन्स वाचण्याची अनुमती देईल आणि त्यांना इथेरियम ब्लॉकचेनवर तुम्ही करू इच्छित असलेली ट्रान्झॅक्शन्स प्रमाणित करण्यास सक्षम करेल:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // आवश्यक असल्यास खाते प्रवेशाची विनंती करा
    await window.ethereum.enable()
    // खाती आता उघड झाली आहेत
  } catch (error) {
    // वापरकर्त्याने खाते प्रवेश नाकारला...
  }
}
```

web3.js ला [Ethers.js](https://docs.ethers.io/) सारखे पर्याय अस्तित्वात आहेत आणि ते सामान्यतः वापरले देखील जातात. पुढील ट्युटोरियलमध्ये आपण पाहू की [ब्लॉकचेनवर नवीन येणारे ब्लॉक्स सहजपणे कसे ऐकायचे आणि त्यात काय आहे ते कसे पाहायचे](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/).