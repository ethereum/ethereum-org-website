---
title: "JavaScript में इथेरियम ब्लॉकचेन का उपयोग करने के लिए web3.js सेट अप करें"
description: "जानें कि JavaScript एप्लिकेशन से इथेरियम ब्लॉकचेन के साथ इंटरैक्ट करने के लिए web3.js लाइब्रेरी को कैसे सेट अप और कॉन्फ़िगर करें।"
author: "jdourlens"
tags: ["web3.js", "JavaScript"]
skill: beginner
breadcrumb: "web3.js सेट अप"
lang: hi
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

इस ट्यूटोरियल में, हम देखेंगे कि इथेरियम ब्लॉकचेन के साथ इंटरैक्ट करने के लिए [web3.js](https://web3js.readthedocs.io/) के साथ शुरुआत कैसे करें। Web3.js का उपयोग फ्रंटएंड और बैकएंड दोनों में ब्लॉकचेन से डेटा पढ़ने या ट्रांजेक्शन करने और यहां तक कि स्मार्ट कॉन्ट्रैक्ट तैनात करने के लिए किया जा सकता है।

पहला कदम अपने प्रोजेक्ट में web3.js को शामिल करना है। इसे वेब पेज में उपयोग करने के लिए, आप JSDeliver जैसे CDN का उपयोग करके सीधे लाइब्रेरी को इंपोर्ट कर सकते हैं।

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

यदि आप अपने बैकएंड या बिल्ड का उपयोग करने वाले फ्रंटएंड प्रोजेक्ट में उपयोग करने के लिए लाइब्रेरी इंस्टॉल करना पसंद करते हैं, तो आप इसे npm का उपयोग करके इंस्टॉल कर सकते हैं:

```bash
npm install web3 --save
```

फिर Web3.js को Node.js स्क्रिप्ट या Browserify फ्रंटएंड प्रोजेक्ट में इंपोर्ट करने के लिए, आप JavaScript की निम्नलिखित लाइन का उपयोग कर सकते हैं:

```js
const Web3 = require("web3")
```

अब जब हमने प्रोजेक्ट में लाइब्रेरी को शामिल कर लिया है, तो हमें इसे इनिशियलाइज़ करना होगा। आपके प्रोजेक्ट को ब्लॉकचेन के साथ संचार करने में सक्षम होना चाहिए। अधिकांश इथेरियम लाइब्रेरी RPC कॉल के माध्यम से एक [नोड](/developers/docs/nodes-and-clients/) के साथ संचार करती हैं। हमारे Web3 प्रोवाइडर को शुरू करने के लिए, हम प्रोवाइडर के URL को कंस्ट्रक्टर के रूप में पास करते हुए एक Web3 इंस्टेंस को इंस्टेंशिएट करेंगे। यदि आपके कंप्यूटर पर कोई नोड या [ganache इंस्टेंस चल रहा है](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) तो यह इस तरह दिखेगा:

```js
const web3 = new Web3("http://localhost:8545")
```

यदि आप सीधे किसी होस्ट किए गए नोड तक पहुंचना चाहते हैं, तो आप [नोड्स एज़ ए सर्विस (nodes as a service)](/developers/docs/nodes-and-clients/nodes-as-a-service) पर विकल्प पा सकते हैं।

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

यह जांचने के लिए कि हमने अपने Web3 इंस्टेंस को सही ढंग से कॉन्फ़िगर किया है, हम `getBlockNumber` फ़ंक्शन का उपयोग करके नवीनतम ब्लॉक नंबर प्राप्त करने का प्रयास करेंगे। यह फ़ंक्शन पैरामीटर के रूप में एक कॉलबैक स्वीकार करता है और ब्लॉक नंबर को एक पूर्णांक (integer) के रूप में लौटाता है।

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

यदि आप इस प्रोग्राम को निष्पादित (execute) करते हैं, तो यह बस नवीनतम ब्लॉक नंबर प्रिंट करेगा: ब्लॉकचेन का शीर्ष। आप अपने कोड में नेस्टिंग कॉलबैक से बचने के लिए `await/async` फ़ंक्शन कॉल का भी उपयोग कर सकते हैं:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

आप Web3 इंस्टेंस पर उपलब्ध सभी फ़ंक्शन [आधिकारिक web3.js दस्तावेज़](https://docs.web3js.org/) में देख सकते हैं।

अधिकांश Web3 लाइब्रेरी एसिंक्रोनस (asynchronous) होती हैं क्योंकि बैकग्राउंड में लाइब्रेरी नोड को जेसन-आरपीसी कॉल करती है जो परिणाम वापस भेजता है।

<Divider />

यदि आप ब्राउज़र में काम कर रहे हैं, तो कुछ वॉलेट सीधे Web3 इंस्टेंस इंजेक्ट करते हैं और आपको जब भी संभव हो इसका उपयोग करने का प्रयास करना चाहिए, खासकर यदि आप ट्रांजेक्शन करने के लिए उपयोगकर्ता के इथेरियम पते के साथ इंटरैक्ट करने की योजना बना रहे हैं।

यह पता लगाने के लिए स्निपेट यहां दिया गया है कि क्या मेटामास्क वॉलेट उपलब्ध है और यदि है तो इसे सक्षम करने का प्रयास करें। यह बाद में आपको उपयोगकर्ता का बैलेंस पढ़ने की अनुमति देगा और उन्हें उन ट्रांजेक्शन को मान्य करने में सक्षम करेगा जो आप उनसे इथेरियम ब्लॉकचेन पर करवाना चाहते हैं:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // यदि आवश्यक हो तो खाता एक्सेस का अनुरोध करें
    await window.ethereum.enable()
    // खाते अब एक्सपोज़ हो गए हैं
  } catch (error) {
    // उपयोगकर्ता ने खाता एक्सेस अस्वीकार कर दिया...
  }
}
```

web3.js के विकल्प जैसे [Ethers.js](https://docs.ethers.io/) मौजूद हैं और आमतौर पर उपयोग भी किए जाते हैं। अगले ट्यूटोरियल में हम देखेंगे कि [ब्लॉकचेन पर आने वाले नए ब्लॉक को आसानी से कैसे सुनें और देखें कि उनमें क्या है](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)।