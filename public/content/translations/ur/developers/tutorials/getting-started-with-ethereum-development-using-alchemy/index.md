---
title: "ایتھیریم ڈیولپمنٹ کا آغاز"
description: "یہ ایتھیریم ڈیولپمنٹ شروع کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ ہم آپ کو ایک API اینڈ پوائنٹ بنانے سے لے کر، کمانڈ لائن کی درخواست کرنے، اور آپ کی پہلی web3 اسکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!"
author: "ایلان ہیلپرن"
tags: ["JavaScript", "ethers.js", "نوڈز", "کیوری کرنا", "Alchemy"]
skill: beginner
breadcrumb: "آغاز کریں"
lang: ur
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![ایتھیریم اور الکیمی کے لوگو](./ethereum-alchemy.png)

یہ ایتھیریم ڈیولپمنٹ شروع کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ اس ٹیوٹوریل کے لیے ہم [Alchemy](https://alchemyapi.io/) کا استعمال کریں گے، جو کہ ایک سرکردہ بلاک چین ڈیولپر پلیٹ فارم ہے اور Maker، 0x، MyEtherWallet، Dharma، اور Kyber سمیت 70% سرفہرست بلاک چین ایپس کے لاکھوں صارفین کو طاقت فراہم کرتا ہے۔ Alchemy ہمیں ایتھیریم چین پر ایک API اینڈ پوائنٹ تک رسائی دے گا تاکہ ہم ٹرانزیکشنز کو پڑھ اور لکھ سکیں۔

ہم آپ کو Alchemy پر سائن اپ کرنے سے لے کر آپ کی پہلی web3 اسکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!

## 1. ایک مفت Alchemy اکاؤنٹ کے لیے سائن اپ کریں {#sign-up-for-a-free-alchemy-account}

Alchemy پر اکاؤنٹ بنانا آسان ہے، [یہاں مفت سائن اپ کریں](https://auth.alchemy.com/)۔

## 2. ایک Alchemy ایپ بنائیں {#create-an-alchemy-app}

ایتھیریم چین کے ساتھ بات چیت کرنے اور Alchemy کی پروڈکٹس استعمال کرنے کے لیے، آپ کو اپنی درخواستوں کی تصدیق کے لیے ایک API کلید (key) کی ضرورت ہے۔

آپ [ڈیش بورڈ سے API کیز بنا سکتے ہیں](https://dashboard.alchemy.com/)۔ ایک نئی کلید بنانے کے لیے، نیچے دکھائے گئے طریقے کے مطابق "Create App" پر جائیں:

[_ShapeShift_](https://shapeshift.com/) _کا خاص شکریہ جنہوں نے ہمیں اپنا ڈیش بورڈ دکھانے کی اجازت دی!_

![Alchemy ڈیش بورڈ](./alchemy-dashboard.png)

اپنی نئی کلید حاصل کرنے کے لیے "Create App" کے تحت تفصیلات پُر کریں۔ آپ یہاں اپنی پہلے سے بنائی گئی ایپس اور اپنی ٹیم کی بنائی گئی ایپس بھی دیکھ سکتے ہیں۔ کسی بھی ایپ کے لیے "View Key" پر کلک کر کے موجودہ کیز حاصل کریں۔

![Alchemy کے ساتھ ایپ بنانے کا اسکرین شاٹ](./create-app.png)

آپ "Apps" پر ہوور (hover) کر کے اور کسی ایک کو منتخب کر کے بھی موجودہ API کیز حاصل کر سکتے ہیں۔ آپ یہاں "View Key" کر سکتے ہیں، اور ساتھ ہی مخصوص ڈومینز کو وائٹ لسٹ کرنے، کئی ڈیولپر ٹولز دیکھنے، اور اینالیٹکس دیکھنے کے لیے "Edit App" بھی کر سکتے ہیں۔

![صارف کو API کیز حاصل کرنے کا طریقہ دکھانے والا Gif](./pull-api-keys.gif)

## 3. کمانڈ لائن سے ایک درخواست کریں {#make-a-request-from-the-command-line}

JSON-RPC اور curl کا استعمال کرتے ہوئے Alchemy کے ذریعے ایتھیریم بلاک چین کے ساتھ تعامل کریں۔

دستی درخواستوں کے لیے، ہم تجویز کرتے ہیں کہ `POST` درخواستوں کے ذریعے `JSON-RPC` کے ساتھ تعامل کریں۔ بس `Content-Type: application/json` ہیڈر اور اپنی کیوری کو `POST` باڈی کے طور پر درج ذیل فیلڈز کے ساتھ پاس کریں:

- `jsonrpc`: JSON-RPC کا ورژن—فی الحال، صرف `2.0` تعاون یافتہ ہے۔
- `method`: ETH API کا طریقہ۔ [API کا حوالہ دیکھیں۔](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: طریقہ کار (method) کو پاس کرنے کے لیے پیرامیٹرز کی ایک فہرست۔
- `id`: آپ کی درخواست کی ID۔ یہ جواب (response) کے ذریعے واپس کی جائے گی تاکہ آپ ٹریک رکھ سکیں کہ کون سا جواب کس درخواست کا ہے۔

موجودہ گیس کی قیمت حاصل کرنے کے لیے یہاں ایک مثال ہے جسے آپ کمانڈ لائن سے چلا سکتے ہیں:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**نوٹ:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) کو اپنی API کلید `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` سے تبدیل کریں۔_

**نتائج:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. اپنا Web3 کلائنٹ سیٹ اپ کریں {#set-up-your-web3-client}

**اگر آپ کے پاس پہلے سے کوئی کلائنٹ موجود ہے،** تو اپنے موجودہ نوڈ پرووائیڈر کے URL کو اپنی API کلید کے ساتھ Alchemy کے URL میں تبدیل کریں: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_نوٹ:_** ذیل کی اسکرپٹس کو **نوڈ کے سیاق و سباق (node context)** میں چلانے یا **کسی فائل میں محفوظ کرنے** کی ضرورت ہے، انہیں کمانڈ لائن سے نہیں چلایا جانا چاہیے۔ اگر آپ کے پاس پہلے سے Node یا npm انسٹال نہیں ہے، تو میک (Macs) کے لیے یہ فوری [سیٹ اپ گائیڈ](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) دیکھیں۔

ایسی بہت سی [Web3 لائبریریاں](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) ہیں جنہیں آپ Alchemy کے ساتھ مربوط کر سکتے ہیں، تاہم، ہم [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) استعمال کرنے کی تجویز کرتے ہیں، جو web3.js کا ایک ڈراپ ان متبادل ہے، اور اسے Alchemy کے ساتھ بغیر کسی رکاوٹ کے کام کرنے کے لیے بنایا اور کنفیگر کیا گیا ہے۔ یہ خودکار ری ٹرائی (automatic retries) اور مضبوط WebSocket سپورٹ جیسے متعدد فوائد فراہم کرتا ہے۔

AlchemyWeb3.js انسٹال کرنے کے لیے، **اپنی پروجیکٹ ڈائرکٹری میں جائیں** اور چلائیں:

**Yarn کے ساتھ:**

```
yarn add @alch/alchemy-web3
```

**NPM کے ساتھ:**

```
npm install @alch/alchemy-web3
```

Alchemy کے نوڈ انفراسٹرکچر کے ساتھ تعامل کرنے کے لیے، NodeJS میں چلائیں یا اسے کسی JavaScript فائل میں شامل کریں:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. اپنی پہلی Web3 اسکرپٹ لکھیں! {#write-your-first-web3-script}

اب تھوڑی سی web3 پروگرامنگ کا عملی تجربہ حاصل کرنے کے لیے ہم ایک سادہ اسکرپٹ لکھیں گے جو ایتھیریم مین نیٹ (Mainnet) سے تازہ ترین بلاک نمبر پرنٹ کرے گی۔

1. **اگر آپ نے پہلے ایسا نہیں کیا ہے، تو اپنے ٹرمینل میں ایک نئی پروجیکٹ ڈائرکٹری بنائیں اور اس میں cd کریں:**

```
mkdir web3-example
cd web3-example
```

2. **اگر آپ نے پہلے سے نہیں کیا ہے تو اپنے پروجیکٹ میں Alchemy web3 (یا کوئی بھی web3) ڈیپینڈنسی انسٹال کریں:**

```
npm install @alch/alchemy-web3
```

3. **`index.js` کے نام سے ایک فائل بنائیں اور اس میں درج ذیل مواد شامل کریں:**

> آپ کو بالآخر `demo` کو اپنی Alchemy HTTP API کلید سے تبدیل کرنا چاہیے۔

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("The latest block number is " + blockNumber)
}
main()
```

async چیزوں سے ناواقف ہیں؟ یہ [Medium پوسٹ](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) دیکھیں۔

4. **اسے node کا استعمال کرتے ہوئے اپنے ٹرمینل میں چلائیں**

```
node index.js
```

5. **اب آپ کو اپنے کنسول میں تازہ ترین بلاک نمبر کا آؤٹ پٹ نظر آنا چاہیے!**

```
The latest block number is 11043912
```

**واہ! مبارک ہو! آپ نے ابھی Alchemy کا استعمال کرتے ہوئے اپنی پہلی web3 اسکرپٹ لکھی ہے 🎉**

سمجھ نہیں آ رہا کہ آگے کیا کرنا ہے؟ اپنا پہلا اسمارٹ کانٹریکٹ (smart contract) ڈیپلائے کرنے کی کوشش کریں اور ہماری [ہیلو ورلڈ اسمارٹ کانٹریکٹ گائیڈ](https://www.alchemy.com/docs/hello-world-smart-contract) میں کچھ Solidity پروگرامنگ کا عملی تجربہ حاصل کریں، یا [ڈیش بورڈ ڈیمو ایپ](https://docs.alchemyapi.io/tutorials/demo-app) کے ساتھ اپنے ڈیش بورڈ کے علم کی جانچ کریں!

_[Alchemy پر مفت سائن اپ کریں](https://auth.alchemy.com/)، ہماری [دستاویزات](https://www.alchemy.com/docs/) دیکھیں، اور تازہ ترین خبروں کے لیے، ہمیں [Twitter](https://twitter.com/AlchemyPlatform) پر فالو کریں۔_