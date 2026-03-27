---
title: "جاوا اسکرپٹ میں ایتھیریم بلاک چین استعمال کرنے کے لیے web3.js سیٹ اپ کریں"
description: "جاوا اسکرپٹ ایپلی کیشنز سے ایتھیریم بلاک چین کے ساتھ تعامل کرنے کے لیے web3.js لائبریری کو سیٹ اپ اور کنفیگر کرنے کا طریقہ سیکھیں۔"
author: "jdourlens"
tags:
  - web3.js
  - javascript
skill: beginner
breadcrumb: "web3.js سیٹ اپ"
lang: ur
published: 2020-04-11
source: EthereumDev
sourceUrl: https://ethereumdev.io/setup-web3js-to-use-the-ethereum-blockchain-in-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

اس ٹیوٹوریل میں، ہم دیکھیں گے کہ ایتھیریم بلاک چین کے ساتھ تعامل کرنے کے لیے [web3.js](https://web3js.readthedocs.io/) کے ساتھ کیسے شروعات کی جائے۔ Web3.js کو فرنٹ اینڈز اور بیک اینڈز دونوں میں بلاک چین سے ڈیٹا پڑھنے یا ٹرانزیکشنز کرنے اور یہاں تک کہ اسمارٹ کانٹریکٹس (smart contracts) کو ڈیپلائے کرنے کے لیے استعمال کیا جا سکتا ہے۔

پہلا قدم اپنے پروجیکٹ میں web3.js کو شامل کرنا ہے۔ اسے ویب پیج میں استعمال کرنے کے لیے، آپ JSDeliver جیسے CDN کا استعمال کرتے ہوئے لائبریری کو براہ راست امپورٹ کر سکتے ہیں۔

```html
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
```

اگر آپ اپنے بیک اینڈ یا فرنٹ اینڈ پروجیکٹ جو بلڈ (build) استعمال کرتا ہے، میں استعمال کرنے کے لیے لائبریری کو انسٹال کرنے کو ترجیح دیتے ہیں تو آپ اسے npm کا استعمال کرتے ہوئے انسٹال کر سکتے ہیں:

```bash
npm install web3 --save
```

پھر Web3.js کو Node.js اسکرپٹ یا Browserify فرنٹ اینڈ پروجیکٹ میں امپورٹ کرنے کے لیے، آپ جاوا اسکرپٹ کی درج ذیل لائن استعمال کر سکتے ہیں:

```js
const Web3 = require("web3")
```

اب چونکہ ہم نے پروجیکٹ میں لائبریری شامل کر لی ہے، ہمیں اسے انیشلائز (initialize) کرنے کی ضرورت ہے۔ آپ کے پروجیکٹ کو بلاک چین کے ساتھ بات چیت کرنے کے قابل ہونا چاہیے۔ زیادہ تر ایتھیریم لائبریریاں RPC کالز کے ذریعے ایک [نوڈ](/developers/docs/nodes-and-clients/) کے ساتھ بات چیت کرتی ہیں۔ اپنے Web3 پرووائیڈر کو شروع کرنے کے لیے، ہم پرووائیڈر کے URL کو کنسٹرکٹر کے طور پر پاس کرتے ہوئے ایک Web3 انسٹینس (instance) بنائیں گے۔ اگر آپ کے کمپیوٹر پر کوئی نوڈ یا [ganache انسٹینس چل رہا ہے](https://ethereumdev.io/testing-your-smart-contract-with-existing-protocols-ganache-fork/) تو یہ اس طرح نظر آئے گا:

```js
const web3 = new Web3("http://localhost:8545")
```

اگر آپ براہ راست کسی ہوسٹڈ نوڈ تک رسائی حاصل کرنا چاہتے ہیں تو آپ [نوڈز بطور سروس](/developers/docs/nodes-and-clients/nodes-as-a-service) پر آپشنز تلاش کر سکتے ہیں۔

```js
const web3 = new Web3("https://cloudflare-eth.com")
```

یہ جانچنے کے لیے کہ آیا ہم نے اپنے Web3 انسٹینس کو درست طریقے سے کنفیگر کیا ہے، ہم `getBlockNumber` فنکشن کا استعمال کرتے ہوئے تازہ ترین بلاک نمبر بازیافت کرنے کی کوشش کریں گے۔ یہ فنکشن ایک پیرامیٹر کے طور پر کال بیک (callback) کو قبول کرتا ہے اور بلاک نمبر کو ایک انٹیجر (integer) کے طور پر واپس کرتا ہے۔

```js
var Web3 = require("web3")
const web3 = new Web3("https://cloudflare-eth.com")

web3.eth.getBlockNumber(function (error, result) {
  console.log(result)
})
```

اگر آپ اس پروگرام کو چلاتے ہیں، تو یہ آسانی سے تازہ ترین بلاک نمبر پرنٹ کرے گا: بلاک چین کا سب سے اوپری حصہ۔ آپ اپنے کوڈ میں نیسٹنگ کال بیکس (nesting callbacks) سے بچنے کے لیے `await/async` فنکشن کالز بھی استعمال کر سکتے ہیں:

```js
async function getBlockNumber() {
  const latestBlockNumber = await web3.eth.getBlockNumber()
  console.log(latestBlockNumber)
  return latestBlockNumber
}

getBlockNumber()
```

آپ Web3 انسٹینس پر دستیاب تمام فنکشنز کو [آفیشل web3.js دستاویزات](https://docs.web3js.org/) میں دیکھ سکتے ہیں۔

زیادہ تر Web3 لائبریریاں غیر ہم آہنگ (asynchronous) ہوتی ہیں کیونکہ پس منظر میں لائبریری نوڈ کو JSON-RPC کالز کرتی ہے جو نتیجہ واپس بھیجتا ہے۔

<Divider />

اگر آپ براؤزر میں کام کر رہے ہیں، تو کچھ والیٹس براہ راست ایک Web3 انسٹینس انجیکٹ کرتے ہیں اور آپ کو جب بھی ممکن ہو اسے استعمال کرنے کی کوشش کرنی چاہیے، خاص طور پر اگر آپ ٹرانزیکشنز کرنے کے لیے صارف کے ایتھیریم ایڈریس کے ساتھ تعامل کرنے کا ارادہ رکھتے ہیں۔

یہ جانچنے کے لیے کہ آیا MetaMask والیٹ دستیاب ہے اور اگر ہے تو اسے فعال کرنے کی کوشش کرنے کے لیے اسنیپٹ (snippet) یہ ہے۔ یہ بعد میں آپ کو صارف کا بیلنس پڑھنے کی اجازت دے گا اور انہیں ان ٹرانزیکشنز کی توثیق کرنے کے قابل بنائے گا جو آپ ان سے ایتھیریم بلاک چین پر کروانا چاہتے ہیں:

```js
if (window.ethereum != null) {
  state.web3 = new Web3(window.ethereum)
  try {
    // اگر ضرورت ہو تو اکاؤنٹ تک رسائی کی درخواست کریں
    await window.ethereum.enable()
    // اکاؤنٹس اب ظاہر ہو چکے ہیں
  } catch (error) {
    // صارف نے اکاؤنٹ تک رسائی سے انکار کر دیا...
  }
}
```

web3.js کے متبادل جیسے [Ethers.js](https://docs.ethers.io/) موجود ہیں اور عام طور پر استعمال بھی ہوتے ہیں۔ اگلے ٹیوٹوریل میں ہم دیکھیں گے کہ [بلاک چین پر آنے والے نئے بلاکس کو آسانی سے کیسے سنا جائے اور دیکھا جائے کہ ان میں کیا ہے](https://ethereumdev.io/listening-to-new-transactions-happening-on-the-blockchain/)۔