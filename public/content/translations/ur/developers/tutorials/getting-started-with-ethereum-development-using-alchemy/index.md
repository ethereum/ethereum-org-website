---
title: "ایتھیریم ڈیولپمنٹ کے ساتھ شروعات کرنا"
description: "یہ ایتھیریم ڈیولپمنٹ کے ساتھ شروعات کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ ہم آپ کو ایک API اینڈ پوائنٹ شروع کرنے، کمانڈ لائن کی درخواست کرنے سے لے کر آپ کی پہلی ویب 3 اسکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!"
author: "ایلن ہالپرن"
tags:
  [
    "javascript",
    "ethers.js",
    "نوڈز",
    "querying",
    "alchemy"
  ]
skill: beginner
lang: ur-in
published: 2020-10-30
source: "درمیانہ"
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![ایتھیریم اور Alchemy لوگو](./ethereum-alchemy.png)

یہ ایتھیریم ڈیولپمنٹ کے ساتھ شروعات کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ اس ٹیوٹوریل کے لیے ہم [Alchemy](https://alchemyapi.io/) کا استعمال کریں گے، جو کہ معروف بلاک چین ڈیولپر پلیٹ فارم ہے جو Maker، 0x، MyEtherWallet، Dharma، اور Kyber سمیت 70% سرفہرست بلاک چین ایپس کے لاکھوں صارفین کو تقویت فراہم کرتا ہے۔ Alchemy ہمیں ایتھیریم چین پر ایک API اینڈ پوائنٹ تک رسائی فراہم کرے گا تاکہ ہم ٹرانزیکشنز کو پڑھ اور لکھ سکیں۔

ہم آپ کو Alchemy کے ساتھ سائن اپ کرنے سے لے کر آپ کی پہلی ویب 3 اسکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!

## 1۔ ایک مفت Alchemy اکاؤنٹ کے لیے سائن اپ کریں {#sign-up-for-a-free-alchemy-account}

Alchemy کے ساتھ ایک اکاؤنٹ بنانا آسان ہے، [یہاں مفت میں سائن اپ کریں](https://auth.alchemy.com/)۔

## 2۔ ایک Alchemy ایپ بنائیں {#create-an-alchemy-app}

ایتھیریم چین کے ساتھ کمیونیکیٹ کرنے اور Alchemy کی پروڈکٹس کا استعمال کرنے کے لیے، آپ کو اپنی درخواستوں کی توثیق کرنے کے لیے ایک API کی کی ضرورت ہے۔

آپ [ڈیش بورڈ سے API کیز بنا سکتے ہیں](https://dashboard.alchemy.com/)۔ ایک نئی کی بنانے کے لیے، نیچے دکھائے گئے "ایپ بنائیں" (Create App) پر نیویگیٹ کریں:

_ہمیں اپنا ڈیش بورڈ دکھانے کی اجازت دینے کے لیے [_ShapeShift_](https://shapeshift.com/) کا خصوصی شکریہ!_

![Alchemy ڈیش بورڈ](./alchemy-dashboard.png)

اپنی نئی کی حاصل کرنے کے لیے "ایپ بنائیں" (Create App) کے تحت تفصیلات پُر کریں۔ آپ یہاں اپنی پہلے بنائی ہوئی ایپس اور اپنی ٹیم کی بنائی ہوئی ایپس کو بھی دیکھ سکتے ہیں۔ کسی بھی ایپ کے لیے "کی دیکھیں" (View Key) پر کلک کرکے موجودہ کیز حاصل کریں۔

![Alchemy کے ساتھ ایپ بنانے کا اسکرین شاٹ](./create-app.png)

آپ "ایپس" (Apps) پر ہوور کرکے اور کسی ایک کو منتخب کرکے بھی موجودہ API کیز حاصل کر سکتے ہیں۔ آپ یہاں "کی دیکھیں" (View Key) کے ساتھ ساتھ مخصوص ڈومینز کو وائٹ لسٹ کرنے، کئی ڈیولپر ٹولز دیکھنے اور اینالیٹکس دیکھنے کے لیے "ایپ میں ترمیم کریں" (Edit App) بھی کر سکتے ہیں۔

![ایک صارف کو API کیز حاصل کرنے کا طریقہ دکھانے والا Gif](./pull-api-keys.gif)

## 3۔ کمانڈ لائن سے ایک درخواست کریں {#make-a-request-from-the-command-line}

JSON-RPC اور curl کا استعمال کرتے ہوئے Alchemy کے ذریعے ایتھیریم بلاک چین کے ساتھ انٹریکٹ کریں۔

مینوئل درخواستوں کے لیے، ہم `POST` درخواستوں کے ذریعے `JSON-RPC` کے ساتھ انٹریکٹ کرنے کی تجویز دیتے ہیں۔ بس `Content-Type: application/json` ہیڈر پاس کریں اور اپنی کوئری کو `POST` باڈی کے طور پر درج ذیل فیلڈز کے ساتھ پاس کریں:

- `jsonrpc`: JSON-RPC ورژن — فی الحال، صرف `2.0` سپورٹڈ ہے۔
- `method`: ETH API کا طریقہ۔ [API کا حوالہ دیکھیں۔](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: طریقہ کار کو پاس کیے جانے والے پیرامیٹرز کی ایک فہرست۔
- `id`: آپ کی درخواست کا ID۔ جواب کے ذریعے واپس کیا جائے گا تاکہ آپ ٹریک رکھ سکیں کہ کونسا جواب کس درخواست سے تعلق رکھتا ہے۔

یہاں ایک مثال ہے جسے آپ موجودہ گیس کی قیمت حاصل کرنے کے لیے کمانڈ لائن سے چلا سکتے ہیں:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**نوٹ:** [https://eth-mainnet.alchemyapi.io/v2/demo](https://eth-mainnet.alchemyapi.io/jsonrpc/demo) کو اپنی API کی `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` سے بدلیں۔_

**نتائج:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```

## 4. اپنا ویب 3 کلائنٹ سیٹ اپ کریں {#set-up-your-web3-client}

**اگر آپ کے پاس پہلے سے کلائنٹ ہے،** تو اپنے موجودہ نوڈ پرووائیڈر URL کو اپنی API کی کے ساتھ Alchemy URL میں تبدیل کریں: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_نوٹ:_** نیچے دی گئی اسکرپٹس کو **نوڈ کانٹیکسٹ** میں چلانے یا **فائل میں محفوظ کرنے** کی ضرورت ہے، کمانڈ لائن سے نہیں۔ اگر آپ کے پاس پہلے سے نوڈ یا npm انسٹال نہیں ہے، تو میکس کے لیے یہ فوری [سیٹ اپ گائیڈ](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) دیکھیں۔

بہت ساری [ویب 3 لائبریریاں](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) ہیں جنہیں آپ Alchemy کے ساتھ انٹیگریٹ کر سکتے ہیں، تاہم، ہم [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) استعمال کرنے کی تجویز دیتے ہیں، جو web3.js کا ایک ڈراپ ان متبادل ہے، جسے Alchemy کے ساتھ بغیر کسی رکاوٹ کے کام کرنے کے لیے بنایا اور کنفیگر کیا گیا ہے۔ یہ متعدد فوائد فراہم کرتا ہے جیسے خودکار دوبارہ کوششیں اور مضبوط WebSocket سپورٹ۔

AlchemyWeb3.js کو انسٹال کرنے کے لیے، **اپنی پروجیکٹ ڈائرکٹری پر نیویگیٹ کریں** اور چلائیں:

**Yarn کے ساتھ:**

```
yarn add @alch/alchemy-web3
```

**NPM کے ساتھ:**

```
npm install @alch/alchemy-web3
```

Alchemy کے نوڈ انفراسٹرکچر کے ساتھ انٹریکٹ کرنے کے لیے، NodeJS میں چلائیں یا اسے جاوا اسکرپٹ فائل میں شامل کریں:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```

## 5. اپنی پہلی ویب 3 اسکرپٹ لکھیں! {#write-your-first-web3-script}

اب تھوڑی ویب 3 پروگرامنگ میں عملی طور پر کام کرنے کے لیے، ہم ایک سادہ اسکرپٹ لکھیں گے جو ایتھیریم مین نیٹ سے تازہ ترین بلاک نمبر پرنٹ کرتی ہے۔

**1.** **اگر آپ نے پہلے سے ایسا نہیں کیا ہے، تو اپنے ٹرمینل میں ایک نئی پروجیکٹ ڈائرکٹری بنائیں اور اس میں cd کریں:**

```
mkdir web3-example
cd web3-example
```

**2.** **اگر آپ نے پہلے سے نہیں کیا ہے تو Alchemy web3 (یا کوئی بھی web3) ڈیپینڈینسی کو اپنے پروجیکٹ میں انسٹال کریں:**

```
npm install @alch/alchemy-web3
```

**3.** **`index.js` نامی ایک فائل بنائیں اور اس میں درج ذیل مواد شامل کریں:**

> آپ کو بالآخر `demo` کو اپنی Alchemy HTTP API کی سے بدلنا چاہیے۔

```js
async function main() {
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
  const web3 = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/v2/demo")
  const blockNumber = await web3.eth.getBlockNumber()
  console.log("تازہ ترین بلاک نمبر ہے " + blockNumber)
}
main()
```

async چیزوں سے ناواقف ہیں؟ یہ [میڈیم پوسٹ](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) دیکھیں۔

\*\*4۔ **اسے اپنے ٹرمینل میں نوڈ کا استعمال کرتے ہوئے چلائیں**

```
node index.js
```

\*\*5۔ **اب آپ کو اپنے کنسول میں تازہ ترین بلاک نمبر کا آؤٹ پٹ نظر آنا چاہیے!**

```
تازہ ترین بلاک نمبر 11043912 ہے
```

**واہ!** مبارک ہو! **آپ نے ابھی ابھی Alchemy کا استعمال کرتے ہوئے اپنی پہلی ویب 3 اسکرپٹ لکھی ہے 🎉**

یقین نہیں ہے کہ آگے کیا کرنا ہے؟ ہمارے [ہیلو ورلڈ اسمارٹ کنٹریکٹ گائیڈ](https://www.alchemy.com/docs/hello-world-smart-contract) میں اپنا پہلا اسمارٹ کنٹریکٹ ڈیپلائے کرنے کی کوشش کریں اور کچھ سولیڈیٹی پروگرامنگ میں عملی کام کریں، یا [ڈیش بورڈ ڈیمو ایپ](https://docs.alchemyapi.io/tutorials/demo-app) کے ساتھ اپنے ڈیش بورڈ کے علم کی جانچ کریں!

_[Alchemy کے ساتھ مفت میں سائن اپ کریں](https://auth.alchemy.com/)، ہماری [دستاویزات](https://www.alchemy.com/docs/) دیکھیں، اور تازہ ترین خبروں کے لیے، ہمیں [Twitter](https://twitter.com/AlchemyPlatform) پر فالو کریں_۔
