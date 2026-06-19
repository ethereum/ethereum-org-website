---
title: ایتھیریم ڈیولپمنٹ کا آغاز
description: "یہ ایتھیریم ڈیولپمنٹ شروع کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ ہم آپ کو ⁦API⁩ اینڈ پوائنٹ بنانے سے لے کر کمانڈ لائن کی درخواست کرنے اور اپنی پہلی ⁦Web3⁩ سکرپٹ لکھنے تک لے جائیں گے! بلاک چین ڈیولپمنٹ کے کسی تجربے کی ضرورت نہیں ہے!"
author: "ایلان ہیلپرن"
tags: ["javascript", "ethers.js", "نوڈز", "کیوری کرنا", "alchemy"]
skill: beginner
breadcrumb: آغاز کریں
lang: ur
published: 2020-10-30
source: Medium
sourceUrl: https://medium.com/alchemy-api/getting-started-with-ethereum-development-using-alchemy-c3d6a45c567f
---

![Ethereum and Alchemy logos](./ethereum-alchemy.png)

یہ ایتھیریم ڈیولپمنٹ شروع کرنے کے لیے ایک ابتدائی گائیڈ ہے۔ اس ٹیوٹوریل کے لیے ہم [Alchemy](https://alchemyapi.io/) کا استعمال کریں گے، جو کہ ایک سرکردہ بلاک چین ڈیولپر پلیٹ فارم ہے اور Maker، 0x، MyEtherWallet، Dharma، اور Kyber سمیت <span dir="ltr">70%</span> سرفہرست بلاک چین ایپس کے لاکھوں صارفین کو طاقت فراہم کرتا ہے۔ Alchemy ہمیں ایتھیریم چین پر ایک API اینڈ پوائنٹ تک رسائی دے گا تاکہ ہم ٹرانزیکشنز کو پڑھ اور لکھ سکیں۔

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

![Gif showing a user how to pull API keys](./pull-api-keys.gif)

## <span dir="ltr">3.</span> کمانڈ لائن سے درخواست کریں {#make-a-request-from-the-command-line}

جے سن آر پی سی اور curl کا استعمال کرتے ہوئے Alchemy کے ذریعے ایتھیریم بلاک چین کے ساتھ تعامل کریں۔

دستی درخواستوں کے لیے، ہم `POST` درخواستوں کے ذریعے `JSON-RPC` کے ساتھ تعامل کرنے کی تجویز کرتے ہیں۔ بس `Content-Type: application/json` ہیڈر اور اپنی کیوری کو `POST` باڈی کے طور پر درج ذیل فیلڈز کے ساتھ پاس کریں:

- `jsonrpc`: جے سن آر پی سی ورژن—فی الحال، صرف `2.0` تعاون یافتہ ہے۔
- `method`: ETH API طریقہ۔ [API حوالہ دیکھیں۔](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc)
- `params`: طریقے کو پاس کرنے کے لیے پیرامیٹرز کی فہرست۔
- `id`: آپ کی درخواست کی ID۔ یہ جواب کے ذریعے واپس کی جائے گی تاکہ آپ ٹریک رکھ سکیں کہ کون سا جواب کس درخواست سے تعلق رکھتا ہے۔

یہاں ایک مثال ہے جسے آپ موجودہ گیس کی قیمت حاصل کرنے کے لیے کمانڈ لائن سے چلا سکتے ہیں:

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

## <span dir="ltr">4.</span> اپنا Web3 کلائنٹ سیٹ اپ کریں {#set-up-your-web3-client}

**اگر آپ کے پاس پہلے سے کوئی کلائنٹ موجود ہے،** تو اپنے موجودہ نوڈ پرووائیڈر URL کو اپنی API کلید کے ساتھ Alchemy URL میں تبدیل کریں: `“https://eth-mainnet.alchemyapi.io/v2/your-api-key"`

**_نوٹ:_** ذیل کی سکرپٹس کو **نوڈ سیاق و سباق** میں چلانے یا **کسی فائل میں محفوظ کرنے** کی ضرورت ہے، نہ کہ کمانڈ لائن سے چلانے کی۔ اگر آپ کے پاس پہلے سے Node یا npm انسٹال نہیں ہے، تو میک کے لیے یہ فوری [سیٹ اپ گائیڈ](https://app.gitbook.com/@alchemyapi/s/alchemy/guides/alchemy-for-macs) دیکھیں۔

بہت سی [Web3 لائبریریاں](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries) ہیں جنہیں آپ Alchemy کے ساتھ مربوط کر سکتے ہیں، تاہم، ہم [Alchemy Web3](https://docs.alchemy.com/reference/api-overview) استعمال کرنے کی تجویز کرتے ہیں، جو web3.js کا ایک ڈراپ ان متبادل ہے، جسے Alchemy کے ساتھ بغیر کسی رکاوٹ کے کام کرنے کے لیے بنایا اور کنفیگر کیا گیا ہے۔ یہ خودکار ری ٹرائی اور مضبوط WebSocket سپورٹ جیسے متعدد فوائد فراہم کرتا ہے۔

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

## <span dir="ltr">5.</span> اپنی پہلی Web3 سکرپٹ لکھیں! {#write-your-first-web3-script}

اب تھوڑی سی Web3 پروگرامنگ کے ساتھ عملی تجربہ حاصل کرنے کے لیے ہم ایک سادہ سکرپٹ لکھیں گے جو ایتھیریم مین نیٹ سے تازہ ترین بلاک نمبر پرنٹ کرے گی۔

**<span dir="ltr">1.</span> اگر آپ نے پہلے ایسا نہیں کیا ہے، تو اپنے ٹرمینل میں ایک نئی پروجیکٹ ڈائریکٹری بنائیں اور اس میں cd کریں:**

```
mkdir web3-example
cd web3-example
```

**<span dir="ltr">2.</span> اگر آپ نے پہلے سے نہیں کیا ہے تو اپنے پروجیکٹ میں Alchemy Web3 (یا کوئی بھی Web3) ڈیپینڈنسی انسٹال کریں:**

```
npm install @alch/alchemy-web3
```

**<span dir="ltr">3.</span> `index.js` نامی ایک فائل بنائیں اور درج ذیل مواد شامل کریں:**

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

**<span dir="ltr">4.</span> اسے node کا استعمال کرتے ہوئے اپنے ٹرمینل میں چلائیں**

```
node index.js
```

**<span dir="ltr">5.</span> اب آپ کو اپنے کنسول میں تازہ ترین بلاک نمبر کا آؤٹ پٹ نظر آنا چاہیے!**

```
The latest block number is 11043912
```

**واہ! مبارک ہو! آپ نے ابھی Alchemy کا استعمال کرتے ہوئے اپنی پہلی Web3 سکرپٹ لکھی ہے 🎉**

یقین نہیں ہے کہ آگے کیا کرنا ہے؟ اپنا پہلا سمارٹ کنٹریکٹ ڈیپلائے کرنے کی کوشش کریں اور ہماری [ہیلو ورلڈ سمارٹ کنٹریکٹ گائیڈ](https://www.alchemy.com/docs/hello-world-smart-contract) میں کچھ Solidity پروگرامنگ کے ساتھ عملی تجربہ حاصل کریں، یا [ڈیش بورڈ ڈیمو ایپ](https://docs.alchemyapi.io/tutorials/demo-app) کے ساتھ اپنے ڈیش بورڈ کے علم کی جانچ کریں!

_[Alchemy کے ساتھ مفت سائن اپ کریں](https://auth.alchemy.com/)، ہماری [دستاویزات](https://www.alchemy.com/docs/) دیکھیں، اور تازہ ترین خبروں کے لیے، ہمیں [Twitter](https://twitter.com/AlchemyPlatform) پر فالو کریں۔_