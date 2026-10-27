---
title: "مبتدیان کے لیے ⁦Hello World⁩ سمارٹ کنٹریکٹ"
description: "ایتھیریم پر ایک سادہ سمارٹ کنٹریکٹ لکھنے اور تعینات کرنے کے بارے میں تعارفی ٹیوٹوریل۔"
author: "ایلان ایچ"
tags: ["Solidity", "Hardhat", "Alchemy", "سمارٹ کنٹریکٹس", "تعیناتی"]
skill: beginner
breadcrumb: "⁦Hello World⁩ کنٹریکٹ"
lang: ur
published: 2021-03-31
---

اگر آپ بلاک چین ڈیولپمنٹ میں نئے ہیں اور نہیں جانتے کہ کہاں سے شروع کریں، یا اگر آپ صرف یہ سمجھنا چاہتے ہیں کہ سمارٹ کنٹریکٹس کو کیسے تعینات کیا جائے اور ان کے ساتھ کیسے تعامل کیا جائے، تو یہ گائیڈ آپ کے لیے ہے۔ ہم ایک ورچوئل والیٹ [میٹاماسک](https://metamask.io/)، [Solidity](https://docs.soliditylang.org/)، [Hardhat](https://hardhat.org/)، اور [Alchemy](https://www.alchemy.com/eth) کا استعمال کرتے ہوئے Sepolia ٹیسٹ نیٹ ورک پر ایک سادہ سمارٹ کنٹریکٹ بنانے اور تعینات کرنے کے عمل سے گزریں گے (اگر آپ ابھی تک ان میں سے کسی کا مطلب نہیں سمجھتے تو پریشان نہ ہوں، ہم اس کی وضاحت کریں گے)۔

ایک بار جب آپ کا کنٹریکٹ تعینات ہو جائے، تو آپ [اس کے لیے ایک یوزر انٹرفیس بنا سکتے ہیں](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)۔

اگر آپ کو کسی بھی موقع پر سوالات ہوں تو بلا جھجھک [Alchemy ڈسکارڈ](https://discord.gg/gWuC7zB) میں رابطہ کریں!

## مرحلہ 1: ایتھیریم نیٹ ورک سے جڑیں {#step-1}

ایتھیریم چین کو درخواستیں بھیجنے کے کئی طریقے ہیں۔ سادگی کے لیے، ہم Alchemy پر ایک مفت اکاؤنٹ استعمال کریں گے، جو کہ ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں اپنے نوڈز چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی اجازت دیتا ہے۔ اس پلیٹ فارم میں نگرانی اور تجزیات کے لیے ڈیولپر ٹولز بھی موجود ہیں جن کا ہم اس ٹیوٹوریل میں فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہماری سمارٹ کنٹریکٹ تعیناتی میں اندرونی طور پر کیا ہو رہا ہے۔ اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو [آپ یہاں مفت سائن اپ کر سکتے ہیں](https://dashboard.alchemy.com/signup)۔

## مرحلہ 2: اپنی ایپ (اور API کلید) بنائیں {#step-2}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر API کلید تیار کر سکتے ہیں۔ یہ ہمیں Sepolia ٹیسٹ نیٹ ورک پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹس سے واقف نہیں ہیں، تو [یہ صفحہ](/developers/docs/networks/) دیکھیں۔

1.  نیویگیشن بار میں <span dir="ltr">"Select an app"</span> کو منتخب کر کے اور <span dir="ltr">"Create new app"</span> پر کلک کر کے اپنے Alchemy ڈیش بورڈ میں <span dir="ltr">"Create new app"</span> صفحہ پر جائیں۔

![Hello world create app](./hello-world-create-app.png)

2. اپنی ایپ کا نام <span dir="ltr">"Hello World"</span> رکھیں، ایک مختصر تفصیل فراہم کریں، اور استعمال کا کیس منتخب کریں، مثلاً، <span dir="ltr">"Infra & Tooling"</span>۔ اس کے بعد، <span dir="ltr">"Ethereum"</span> تلاش کریں اور نیٹ ورک منتخب کریں۔

![create app view hello world](./create-app-view-hello-world.png)

3. آگے بڑھنے کے لیے <span dir="ltr">"Next"</span> پر کلک کریں، پھر <span dir="ltr">"Create app"</span> اور بس! آپ کی ایپ نیویگیشن بار کے ڈراپ ڈاؤن مینو میں ظاہر ہونی چاہیے، جس کے ساتھ کاپی کرنے کے لیے ایک API کلید دستیاب ہوگی۔

## مرحلہ 3: ایک ایتھیریم اکاؤنٹ (پتہ) بنائیں {#step-3}

ہمیں ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم میٹاماسک استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ کا پتہ منظم کرنے کے لیے استعمال کیا جاتا ہے۔ [ٹرانزیکشنز](/developers/docs/transactions/) کے بارے میں مزید جانیں۔

آپ میٹاماسک ڈاؤن لوڈ کر سکتے ہیں اور [یہاں](https://metamask.io/download) مفت میں ایک ایتھیریم اکاؤنٹ بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ ہے، تو یقینی بنائیں کہ نیٹ ورک ڈراپ ڈاؤن مینو کا استعمال کرتے ہوئے <span dir="ltr">"Sepolia"</span> ٹیسٹ نیٹ ورک پر سوئچ کریں (تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں)۔

اگر آپ کو Sepolia فہرست میں نظر نہیں آتا، تو اوپری دائیں کونے میں مینو کھولیں، <span dir="ltr">"Networks"</span> کو منتخب کریں، اور نیٹ ورک کی فہرست کے نیچے <span dir="ltr">"Show test networks"</span> کو آن کریں ([ٹیسٹ نیٹس دیکھنے کے لیے میٹاماسک کی گائیڈ](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) دیکھیں)۔ پھر نیٹ ورک کے انتخاب کے مینو میں <span dir="ltr">"Sepolia"</span> کو منتخب کریں۔

![metamask sepolia example](./metamask-sepolia-example.png)

## مرحلہ 4: فوسٹ سے ایتھر شامل کریں {#step-4}

اپنے سمارٹ کنٹریکٹ کو ٹیسٹ نیٹ ورک پر تعینات کرنے کے لیے، ہمیں کچھ نقلی ETH کی ضرورت ہوگی۔ Sepolia ETH حاصل کرنے کے لیے آپ مختلف فوسٹس کی فہرست دیکھنے کے لیے [Sepolia نیٹ ورک کی تفصیلات](/developers/docs/networks/#sepolia) پر جا سکتے ہیں۔ اگر ایک کام نہیں کرتا، تو دوسرا آزمائیں کیونکہ وہ کبھی کبھی خالی ہو سکتے ہیں۔ کچھ فوسٹس کے اہلیت کے اصول ہوتے ہیں؛ مثال کے طور پر، Alchemy کے Sepolia فوسٹ کے لیے ضروری ہے کہ وصول کرنے والے پتے پر ایتھیریم مین نیٹ پر کم از کم <span dir="ltr">0.001 ETH</span> موجود ہوں۔ نیٹ ورک ٹریفک کی وجہ سے آپ کا نقلی ETH وصول کرنے میں کچھ وقت لگ سکتا ہے۔ آپ کو جلد ہی اپنے میٹاماسک اکاؤنٹ میں ETH نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#step-5}

یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [Alchemy کے کمپوزر ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [eth_getBalance](/developers/docs/apis/json-rpc/#eth-getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں ETH کی مقدار واپس کرے گا۔ اپنا میٹاماسک اکاؤنٹ کا پتہ درج کرنے اور <span dir="ltr">“Send Request”</span> پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **نوٹ:** یہ نتیجہ Wei میں ہے ETH میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ Wei سے ETH میں تبدیلی یہ ہے: <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>۔ لہذا اگر ہم <span dir="ltr">0x2B5E3AF16B1880000</span> کو اعشاریہ میں تبدیل کریں تو ہمیں <span dir="ltr">5\*10¹⁸</span> ملتا ہے جو <span dir="ltr">5 ETH</span> کے برابر ہے۔
>
> شکر ہے! ہماری نقلی رقم پوری موجود ہے <Emoji text=":money_mouth_face:" size={1} />۔

## مرحلہ 6: اپنا پروجیکٹ انیشلائز کریں {#step-6}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

```sh
mkdir hello-world
cd hello-world
```

اب چونکہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو انیشلائز کرنے کے لیے `npm init` استعمال کریں گے۔ اگر آپ کے پاس پہلے سے npm انسٹال نہیں ہے، تو [Node.js کی انسٹالیشن کی ہدایات](https://nodejs.org/en/download/) پر عمل کریں (ہمیں اس ٹیوٹوریل کے لیے Node.js اور npm کی ضرورت ہوگی)۔

```sh
npm init
```

اس سے کوئی خاص فرق نہیں پڑتا کہ آپ انسٹالیشن کے سوالات کے کیا جواب دیتے ہیں، حوالے کے لیے ہم نے اسے اس طرح کیا ہے:

```console
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/.../.../.../hello-world/package.json:

{
  "name": "hello-world",
  "version": "1.0.0",
  "description": "hello world smart contract",
  "main": "index.js",
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

<span dir="ltr">package.json</span> کو منظور کریں۔ <span dir="ltr">Hardhat 3</span>، جسے ہم آگے انسٹال کریں گے، صرف ES ماڈیول پروجیکٹس کو سپورٹ کرتا ہے، اس لیے پروجیکٹ کو اس کے طور پر نشان زد کریں:

```sh
npm pkg set type=module
```

اور ہم تیار ہیں!

## مرحلہ 7: [Hardhat](https://hardhat.org/docs/getting-started) ڈاؤن لوڈ کریں {#step-7}

Hardhat آپ کے ایتھیریم سافٹ ویئر کو مرتب کرنے، تعینات کرنے، ٹیسٹ کرنے اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ لائیو چین پر تعینات کرنے سے پہلے مقامی طور پر سمارٹ کنٹریکٹس اور غیر مرکزی ایپلی کیشنز (dapps) بناتے وقت ڈیولپرز کی مدد کرتا ہے۔

Hardhat 3 کے لیے Node.js <span dir="ltr">v22.13.0</span> یا اس کے بعد کا ورژن درکار ہے۔ ہمارے `hello-world` پروجیکٹ کے اندر چلائیں:

```sh
npm install --save-dev hardhat
```

[انسٹالیشن کی ہدایات](https://hardhat.org/docs/getting-started) پر مزید تفصیلات کے لیے اس صفحہ کو دیکھیں۔

## مرحلہ 8: Hardhat پروجیکٹ بنائیں {#step-8}

`npx hardhat --init` چلانے سے ایک مکمل نمونہ پروجیکٹ تیار ہو جائے گا، لیکن اس ٹیوٹوریل کے لیے ہم چیزوں کو دستی طور پر ترتیب دیں گے تاکہ آپ ہر حصے کو دیکھ سکیں۔ اپنے پروجیکٹ فولڈر کی روٹ میں، مندرجہ ذیل مواد کے ساتھ `hardhat.config.js` نامی ایک فائل بنائیں:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

یہ وہ جگہ ہے جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔ فی الحال، یہ صرف Hardhat کو بتاتا ہے کہ Solidity کمپائلر کا کون سا ورژن استعمال کرنا ہے۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#step-9}

اپنے پروجیکٹ کو منظم رکھنے کے لیے ہم دو نئے فولڈرز بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنی ہیلو ورلڈ سمارٹ کنٹریکٹ کوڈ فائل رکھیں گے
- `scripts/` وہ جگہ ہے جہاں ہم اپنے کنٹریکٹ کو تعینات کرنے اور اس کے ساتھ تعامل کرنے کے لیے سکرپٹس رکھیں گے

## مرحلہ 10: اپنا کنٹریکٹ لکھیں {#step-10}

آپ شاید خود سے پوچھ رہے ہوں گے کہ ہم آخر کوڈ کب لکھنے والے ہیں؟؟ خیر، ہم یہاں ہیں، مرحلہ 10 پر۔

اپنے پسندیدہ ایڈیٹر میں hello-world پروجیکٹ کھولیں (ہمیں [VSCode](https://code.visualstudio.com/) پسند ہے)۔ سمارٹ کنٹریکٹس Solidity نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا HelloWorld.sol سمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔‌

1.  <span dir="ltr">“contracts”</span> فولڈر میں جائیں اور HelloWorld.sol نامی ایک نئی فائل بنائیں۔
2.  نیچے ایتھیریم فاؤنڈیشن کی جانب سے ایک نمونہ Hello World سمارٹ کنٹریکٹ ہے جسے ہم اس ٹیوٹوریل کے لیے استعمال کریں گے۔ نیچے دیے گئے مواد کو کاپی کریں اور اپنی HelloWorld.sol فائل میں پیسٹ کریں، اور یہ سمجھنے کے لیے تبصرے ضرور پڑھیں کہ یہ کنٹریکٹ کیا کرتا ہے:

```solidity
// SPDX-License-Identifier: MIT
// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن متعین کرتا ہے۔
// مزید جانیں: https://docs.soliditylang.org/en/latest/layout-of-source-files.html#pragma
pragma solidity ^0.8.24;

// `HelloWorld` نامی ایک کنٹریکٹ کی وضاحت کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی سٹیٹ) کا مجموعہ ہوتا ہے۔ ایک بار تعینات ہونے کے بعد، ایک کنٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص پتہ پر موجود ہوتا ہے۔ مزید جانیں: https://docs.soliditylang.org/en/latest/structure-of-a-contract.html
contract HelloWorld {

   // `string` قسم کے ایک سٹیٹ ویری ایبل `message` کا اعلان کرتا ہے۔
   // سٹیٹ ویری ایبلز وہ ویری ایبلز ہوتے ہیں جن کی قدریں مستقل طور پر کنٹریکٹ سٹوریج میں محفوظ ہوتی ہیں۔ کلیدی لفظ `public` ویری ایبلز کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس قدر تک رسائی حاصل کرنے کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، کنسٹرکٹر ایک خاص فنکشن ہوتا ہے جو صرف کنٹریکٹ بننے پر ہی عمل میں لایا جاتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو انیشلائز کرنے کے لیے کیا جاتا ہے۔ مزید جانیں: https://docs.soliditylang.org/en/latest/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک سٹرنگ آرگومنٹ `initMessage` کو قبول کرتا ہے اور قدر کو کنٹریکٹ کے `message` سٹوریج ویری ایبل میں سیٹ کرتا ہے)۔
      message = initMessage;
   }

   // ایک پبلک فنکشن جو سٹرنگ آرگومنٹ کو قبول کرتا ہے اور `message` سٹوریج ویری ایبل کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

یہ ایک انتہائی سادہ سمارٹ کنٹریکٹ ہے جو بننے پر ایک پیغام محفوظ کرتا ہے اور `update` فنکشن کو کال کر کے اسے اپ ڈیٹ کیا جا سکتا ہے۔

## مرحلہ 11: میٹاماسک اور Alchemy کو اپنے پروجیکٹ سے جوڑیں {#step-11}

ہم نے ایک میٹاماسک والیٹ، Alchemy اکاؤنٹ بنا لیا ہے، اور اپنا سمارٹ کنٹریکٹ لکھ لیا ہے، اب وقت آ گیا ہے کہ ان تینوں کو جوڑا جائے۔

آپ کے ورچوئل والیٹ سے بھیجی جانے والی ہر ٹرانزیکشن کے لیے آپ کی منفرد نجی کلید کا استعمال کرتے ہوئے ایک دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی نجی کلید (اور Alchemy API کلید) کو محفوظ طریقے سے ایک انوائرنمنٹ فائل میں محفوظ کر سکتے ہیں۔

> ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [ٹرانزیکشنز کی دستاویزات](/developers/docs/transactions/) دیکھیں۔

ہمارے پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی میٹاماسک نجی کلید اور HTTP Alchemy API URL شامل کریں۔

- اپنی نجی کلید ایکسپورٹ کرنے کے لیے [ان ہدایات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) پر عمل کریں۔
- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں۔

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL کاپی کریں

آپ کی `.env` کچھ اس طرح دکھنی چاہیے:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

انہیں درحقیقت اپنے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 پر اپنی `hardhat.config.js` فائل میں ان متغیرات کا حوالہ دیں گے۔ Node.js خود سے `.env` فائلیں پڑھ سکتا ہے، اس لیے کوئی اضافی پیکیج انسٹال کرنے کی ضرورت نہیں ہے۔

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> کو کمٹ نہ کریں! براہ کرم یقینی بنائیں کہ اپنی <code>.env</code> فائل کو کبھی بھی کسی کے ساتھ شیئر یا ظاہر نہ کریں، کیونکہ ایسا کرنے سے آپ اپنے رازوں کو خطرے میں ڈال رہے ہیں۔ اگر آپ ورژن کنٹرول استعمال کر رہے ہیں، تو اپنی <code>.env</code> کو ایک <a href="https://git-scm.com/docs/gitignore">gitignore</a> فائل میں شامل کریں۔
</AlertDescription>
</AlertContent>
</Alert>

## مرحلہ 12: Ethers.js انسٹال کریں {#step-12-install-ethersjs}

Ethers.js ایک لائبریری ہے جو [معیاری جے سن آر پی سی طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر ایتھیریم کے ساتھ تعامل کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

Hardhat اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/docs/plugins/official-plugins) کو مربوط کرنا انتہائی آسان بناتا ہے۔ ہم کنٹریکٹ کی تعیناتی کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/hardhat-ethers) کا فائدہ اٹھائیں گے ([Ethers.js](https://docs.ethers.org/v6/) میں کنٹریکٹ کی تعیناتی کے کچھ انتہائی صاف طریقے موجود ہیں)۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

ہم اگلے مرحلے میں پلگ ان کو اپنی `hardhat.config.js` میں بھی شامل کریں گے۔

## مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#step-13-update-hardhatconfigjs}

ہم نے اب تک کئی انحصار (dependencies) اور پلگ انز شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اپ ڈیٹ کریں تاکہ یہ اس طرح نظر آئے:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// اگر .env فائل موجود ہے، تو اس سے API_URL اور PRIVATE_KEY کو process.env میں لوڈ کریں۔
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` Hardhat کو بتاتا ہے کہ ہر قدر کو انوائرنمنٹ متغیر سے صرف اسی وقت پڑھے جب اس کی ضرورت ہو، تاکہ `compile` جیسی کمانڈز اقدار کے سیٹ ہونے سے پہلے بھی کام کریں۔ اگر آپ اپنی نجی کلید کو سادہ ٹیکسٹ فائل میں نہیں رکھنا چاہتے، تو Hardhat [ایک انکرپٹڈ کی اسٹور سے کنفیگریشن متغیرات](https://hardhat.org/docs/guides/configuration-variables) بھی پڑھ سکتا ہے۔

## مرحلہ 14: اپنا کنٹریکٹ مرتب کریں {#step-14-compile-our-contracts}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کنٹریکٹ کو مرتب (compile) کریں۔ `compile` ٹاسک بلٹ ان Hardhat ٹاسکس میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```sh
npx hardhat compile
```

جب آپ پہلی بار مرتب کرتے ہیں، تو Hardhat Solidity کمپائلر ڈاؤن لوڈ کرتا ہے۔ اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے `Compiled 1 Solidity file with solc 0.8.34`۔ اگر نہیں، تو آپ ہمیشہ [Alchemy ڈسکارڈ](https://discord.gg/gWuC7zB) میں پیغام بھیج سکتے ہیں۔

## مرحلہ 15: اپنی تعیناتی کی سکرپٹ لکھیں {#step-15-write-our-deploy-scripts}

اب جب کہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، تو وقت آ گیا ہے کہ ہم اپنے کنٹریکٹ کی تعیناتی کی سکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، جس میں مندرجہ ذیل مواد شامل کریں:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const HelloWorld = await ethers.getContractFactory("HelloWorld")

// تعیناتی شروع کریں، ایک پرامس واپس کرتے ہوئے جو ایک کنٹریکٹ آبجیکٹ پر ریزالو ہوتا ہے۔
const hello_world = await HelloWorld.deploy("Hello World!")
await hello_world.waitForDeployment()
console.log("Contract deployed to address:", await hello_world.getAddress())
```

آئیے دیکھتے ہیں کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے۔

```js
const { ethers } = await network.create()
```

Hardhat 3 میں، ایک سکرپٹ واضح طور پر نیٹ ورک سے کنکشن کھولتی ہے۔ `network.create()` اس نیٹ ورک سے جڑتا ہے جسے آپ سکرپٹ چلاتے وقت `--network` آپشن کے ساتھ منتخب کرتے ہیں، اور `hardhat-ethers` پلگ ان اس کنکشن میں ایک `ethers` آبجیکٹ شامل کرتا ہے۔

```js
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js میں ایک `ContractFactory` ایک تجرید (abstraction) ہے جسے نئے سمارٹ کنٹریکٹس کو تعینات کرنے کے لیے استعمال کیا جاتا ہے، لہذا یہاں `HelloWorld` ہمارے ہیلو ورلڈ کنٹریکٹ کی مثالوں کے لیے ایک فیکٹری ہے۔ `hardhat-ethers` پلگ ان استعمال کرتے وقت `ContractFactory` اور `Contract` کی مثالیں پہلے سے طے شدہ طور پر پہلے دستخط کنندہ (signer) سے جڑی ہوتی ہیں۔

```js
const hello_world = await HelloWorld.deploy("Hello World!")
```

`ContractFactory` پر `deploy()` کو کال کرنے سے تعیناتی شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` پر حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے سمارٹ کنٹریکٹ کے ہر فنکشن کے لیے ایک طریقہ (method) موجود ہے۔ جو دلائل آپ `deploy()` کو پاس کرتے ہیں وہ کنٹریکٹ کے کنسٹرکٹر کو جاتے ہیں، یہاں ابتدائی پیغام۔

`waitForDeployment()` اس وقت تک انتظار کرتا ہے جب تک کہ تعیناتی کی ٹرانزیکشن ایک بلاک میں شامل نہ ہو جائے، اور `getAddress()` نئے کنٹریکٹ کا پتہ واپس کرتا ہے۔ مزید تفصیلات کے لیے [ethers.js کنٹریکٹ کی دستاویزات](https://docs.ethers.org/v6/api/contract/) دیکھیں۔

## مرحلہ 16: اپنا کنٹریکٹ تعینات کریں {#step-16-deploy-our-contract}

ہم بالآخر اپنا سمارٹ کنٹریکٹ تعینات کرنے کے لیے تیار ہیں! کمانڈ لائن پر جائیں اور چلائیں:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے:

```text
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

اگر ہم [Sepolia Etherscan](https://sepolia.etherscan.io/) پر جائیں اور اپنے کنٹریکٹ کا پتہ تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی سے تعینات کر دیا گیا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![etherscan contract](./etherscan-contract.png)

`From` کا پتہ آپ کے میٹاماسک اکاؤنٹ کے پتے سے میل کھانا چاہیے اور To کے پتے میں <span dir="ltr">“Contract Creation”</span> لکھا ہوگا لیکن اگر ہم ٹرانزیکشن پر کلک کریں تو ہمیں `To` فیلڈ میں اپنے کنٹریکٹ کا پتہ نظر آئے گا:

![etherscan transaction](./etherscan-transaction.png)

مبارک ہو! آپ نے ابھی ایتھیریم چین پر ایک سمارٹ کنٹریکٹ تعینات کیا ہے 🎉

یہ سمجھنے کے لیے کہ اندرونی طور پر کیا ہو رہا ہے، آپ ان درخواستوں کو دیکھ سکتے ہیں جو آپ کی <span dir="ltr">"Hello World"</span> ایپ کو آپ کے [Alchemy ڈیش بورڈ](https://dashboard.alchemy.com/) میں موصول ہوئی ہیں۔

وہاں آپ کو مٹھی بھر جے سن آر پی سی کالز نظر آئیں گی جو Hardhat/Ethers نے ہمارے لیے اندرونی طور پر اس وقت کیں جب ہم نے `.deploy()` فنکشن کو کال کیا۔ یہاں ذکر کرنے کے لیے دو اہم کالز [`eth_sendRawTransaction`](/developers/docs/apis/json-rpc/#eth-sendrawtransaction) ہیں، جو دراصل ہمارے کنٹریکٹ کو Sepolia چین پر لکھنے کی درخواست ہے، اور [`eth_getTransactionByHash`](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز بھیجتے وقت ایک عام نمونہ)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [ٹرانزیکشنز کی دستاویزات](/developers/docs/transactions/) دیکھیں۔

اس ٹیوٹوریل کے لیے بس اتنا ہی۔ آگے، آپ [اپنے کنٹریکٹ کے لیے ایک یوزر انٹرفیس بنا سکتے ہیں](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/)۔
