---
title: "ایتھیریم ڈیولپمنٹ کا آغاز"
description: "یہ ایتھیریم ڈیولپمنٹ شروع کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ ہم آپ کو ⁦API⁩ اینڈ پوائنٹ بنانے سے لے کر کمانڈ لائن کی درخواست کرنے اور اپنی پہلی ⁦Web3⁩ سکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!"
author: "ایلان ہیلپرن"
tags: ["JavaScript", "ethers.js", "نوڈز", "کیوری کرنا", "Alchemy"]
skill: beginner
breadcrumb: "آغاز کریں"
lang: ur
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

یہ ایتھیریم ڈیولپمنٹ شروع کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ اس ٹیوٹوریل کے لیے ہم [Alchemy](https://www.alchemy.com/) کا استعمال کریں گے، جو کہ ایک سرکردہ بلاک چین ڈیولپر پلیٹ فارم ہے اور Maker، <span dir="ltr">0x</span>، MyEtherWallet، Dharma، اور Kyber سمیت <span dir="ltr">70%</span> سرفہرست بلاک چین ایپس کے لاکھوں صارفین کو طاقت فراہم کرتا ہے۔ Alchemy ہمیں ایتھیریم چین پر ایک API اینڈ پوائنٹ تک رسائی دے گا تاکہ ہم ٹرانزیکشنز کو پڑھ اور لکھ سکیں۔

ہم آپ کو Alchemy پر سائن اپ کرنے سے لے کر اپنی پہلی Web3 سکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!

## <span dir="ltr">1.</span> ایک مفت Alchemy اکاؤنٹ کے لیے سائن اپ کریں {#sign-up-for-a-free-alchemy-account}

Alchemy کے ساتھ اکاؤنٹ بنانا آسان ہے، [یہاں مفت سائن اپ کریں](https://auth.alchemy.com/)۔

## <span dir="ltr">2.</span> ایک Alchemy ایپ بنائیں {#create-an-alchemy-app}

ایتھیریم چین کے ساتھ بات چیت کرنے اور Alchemy کی پروڈکٹس استعمال کرنے کے لیے، آپ کو اپنی درخواستوں کی تصدیق کے لیے ایک API کلید کی ضرورت ہے۔

آپ [ڈیش بورڈ سے API کلیدیں بنا سکتے ہیں](https://dashboard.alchemy.com/)۔ ایک نئی کلید بنانے کے لیے، نیچے دکھائے گئے طریقے کے مطابق “Create App” پر جائیں:

[_ShapeShift_](https://shapeshift.com/) _کا خصوصی شکریہ جنہوں نے ہمیں اپنا ڈیش بورڈ دکھانے کی اجازت دی!_

![Alchemy dashboard](./alchemy-dashboard.png)

اپنی نئی کلید حاصل کرنے کے لیے “Create App” کے تحت تفصیلات پُر کریں۔ آپ یہاں اپنی پہلے سے بنائی گئی ایپس اور اپنی ٹیم کی بنائی ہوئی ایپس بھی دیکھ سکتے ہیں۔ کسی بھی ایپ کے لیے “View Key” پر کلک کر کے موجودہ کلیدیں حاصل کریں۔

![Create app with Alchemy screenshot](./create-app.png)

آپ “Apps” پر ہوور کر کے اور کسی ایک کو منتخب کر کے بھی موجودہ API کلیدیں حاصل کر سکتے ہیں۔ آپ یہاں “View Key” کر سکتے ہیں، نیز مخصوص ڈومینز کو وائٹ لسٹ کرنے، کئی ڈیولپر ٹولز دیکھنے، اور اینالیٹکس دیکھنے کے لیے “Edit App” کر سکتے ہیں۔

![Gif showing a user how to pull API keys](./pull-api-keys.mp4#600x340)

## <span dir="ltr">3.</span> کمانڈ لائن سے درخواست کریں

جے سن آر پی سی اور <span dir="ltr">curl</span> کا استعمال کرتے ہوئے Alchemy کے ذریعے ایتھیریم بلاک چین کے ساتھ تعامل کریں۔

دستی درخواستوں کے لیے، ہم تجویز کرتے ہیں کہ `POST` درخواستوں کے ذریعے `JSON-RPC` کے ساتھ تعامل کریں۔ بس `Content-Type: application/json` ہیڈر اور اپنی کیوری کو `POST` باڈی کے طور پر درج ذیل فیلڈز کے ساتھ پاس کریں:

- `jsonrpc`: جے سن آر پی سی ورژن—فی الحال، صرف `2.0` تعاون یافتہ ہے۔
- `method`: ETH API کا طریقہ۔ [API کا حوالہ دیکھیں۔](/developers/docs/apis/json-rpc/)
- `params`: طریقے کو پاس کرنے کے لیے پیرامیٹرز کی فہرست۔
- `id`: آپ کی درخواست کی ID۔ یہ رسپانس کے ذریعے واپس کی جائے گی تاکہ آپ ٹریک رکھ سکیں کہ کون سا رسپانس کس درخواست سے تعلق رکھتا ہے۔

یہاں ایک مثال ہے جسے آپ موجودہ گیس کی قیمت حاصل کرنے کے لیے کمانڈ لائن سے چلا سکتے ہیں:

```bash
curl https://eth-mainnet.alchemyapi.io/v2/demo \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
```

_**نوٹ:** `https://eth-mainnet.alchemyapi.io/v2/demo` کو اپنی API کلید `https://eth-mainnet.alchemyapi.io/v2/**your-api-key` سے تبدیل کریں۔_

**نتائج:**

```json
{ "id": 73,"jsonrpc": "2.0","result": "0x09184e72a000" // 10000000000000 }
```
## <span dir="ltr">4.</span> اپنا Web3 کلائنٹ سیٹ اپ کریں

**اگر آپ کے پاس پہلے سے کوئی کلائنٹ موجود ہے،** تو اپنے موجودہ نوڈ پرووائیڈر URL کو اپنی API کلید کے ساتھ Alchemy URL میں تبدیل کریں: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_نوٹ:_** ذیل کی سکرپٹس کو **نوڈ کے سیاق و سباق** میں چلانے یا **کسی فائل میں محفوظ کرنے** کی ضرورت ہے، انہیں کمانڈ لائن سے نہیں چلایا جا سکتا۔ اگر آپ کے پاس پہلے سے Node یا <span dir="ltr">npm</span> انسٹال نہیں ہے، تو [Node.js کی انسٹالیشن کی ہدایات](https://nodejs.org/en/download/) پر عمل کریں۔

بہت سی [Web3 لائبریریاں](/developers/docs/apis/javascript/) ہیں جنہیں آپ Alchemy کے ساتھ مربوط کر سکتے ہیں، تاہم، ہم [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) استعمال کرنے کی تجویز کرتے ہیں، جو Web3.js کا ایک ڈراپ ان متبادل ہے، اور اسے Alchemy کے ساتھ بغیر کسی رکاوٹ کے کام کرنے کے لیے بنایا اور کنفیگر کیا گیا ہے۔ یہ خودکار ری ٹرائی اور مضبوط <span dir="ltr">WebSocket</span> سپورٹ جیسے متعدد فوائد فراہم کرتا ہے۔

AlchemyWeb3.js انسٹال کرنے کے لیے، **اپنی پروجیکٹ ڈائریکٹری میں جائیں** اور چلائیں:

**Yarn کے ساتھ:**

```
yarn add @alch/alchemy-web3
```

**NPM کے ساتھ:**

```
npm install @alch/alchemy-web3
```

Alchemy کے نوڈ انفراسٹرکچر کے ساتھ تعامل کرنے کے لیے، NodeJS میں چلائیں یا اسے JavaScript فائل میں شامل کریں:

```js
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
)
```
## <span dir="ltr">5.</span> اپنی پہلی Web3 سکرپٹ لکھیں!

اب تھوڑی سی Web3 پروگرامنگ کا عملی تجربہ حاصل کرنے کے لیے ہم ایک سادہ سکرپٹ لکھیں گے جو ایتھیریم مین نیٹ سے تازہ ترین بلاک نمبر پرنٹ کرے گی۔

**<span dir="ltr">1.</span> اگر آپ نے پہلے ایسا نہیں کیا ہے، تو اپنے ٹرمینل میں ایک نئی پروجیکٹ ڈائریکٹری بنائیں اور اس میں <span dir="ltr">cd</span> کریں:**

```
mkdir web3-example
cd web3-example
```

**<span dir="ltr">2.</span> اگر آپ نے پہلے سے نہیں کیا ہے تو اپنے پروجیکٹ میں Alchemy Web3 (یا کوئی بھی Web3) ڈیپینڈنسی انسٹال کریں:**

```
npm install @alch/alchemy-web3
```

**<span dir="ltr">3.</span> `index.js` کے نام سے ایک فائل بنائیں اور اس میں درج ذیل مواد شامل کریں:**

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

<span dir="ltr">async</span> چیزوں سے ناواقف ہیں؟ یہ [Medium پوسٹ](https://medium.com/better-programming/understanding-async-await-in-javascript-1d81bb079b2c) دیکھیں۔

**<span dir="ltr">4.</span> اسے نوڈ کا استعمال کرتے ہوئے اپنے ٹرمینل میں چلائیں**

```
node index.js
```

**<span dir="ltr">5.</span> اب آپ کو اپنے کنسول میں تازہ ترین بلاک نمبر کا آؤٹ پٹ نظر آنا چاہیے!**

```
The latest block number is 11043912
```

**زبردست! مبارک ہو! آپ نے ابھی Alchemy کا استعمال کرتے ہوئے اپنی پہلی Web3 سکرپٹ لکھی ہے 🎉**

یقین نہیں ہے کہ آگے کیا کرنا ہے؟ اپنا پہلا سمارٹ کنٹریکٹ ڈیپلائے کرنے کی کوشش کریں اور ہماری [ہیلو ورلڈ سمارٹ کنٹریکٹ گائیڈ](/developers/tutorials/hello-world-smart-contract/) میں کچھ Solidity پروگرامنگ کا عملی تجربہ حاصل کریں، یا مزید مثالوں کے لیے [Alchemy کی دستاویزات](https://www.alchemy.com/docs/) کو دریافت کرنا جاری رکھیں۔

_[Alchemy کے ساتھ مفت سائن اپ کریں](https://auth.alchemy.com/)، ہماری [دستاویزات](https://www.alchemy.com/docs/) دیکھیں، اور تازہ ترین خبروں کے لیے، ہمیں [Twitter](https://twitter.com/AlchemyPlatform) پر فالو کریں۔_
