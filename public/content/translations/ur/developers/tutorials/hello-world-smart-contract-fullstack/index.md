---
title: "ابتدائی افراد کے لیے ہیلو ورلڈ سمارٹ کنٹریکٹ - فل اسٹیک"
description: "ایتھیریم پر ایک سادہ سمارٹ کنٹریکٹ لکھنے اور تعینات کرنے کے بارے میں تعارفی ٹیوٹوریل۔"
author: "nstrike2"
breadcrumb: "ہیلو ورلڈ فل اسٹیک"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "سمارٹ کنٹریکٹس",
    "تعیناتی",
    "بلاک ایکسپلورر",
    "فرنٹ اینڈ",
    "ٹرانزیکشنز",
    "فریم ورک",
  ]
skill: beginner
lang: ur
published: 2021-10-25
---

یہ گائیڈ آپ کے لیے ہے اگر آپ بلاک چین ڈیولپمنٹ میں نئے ہیں اور نہیں جانتے کہ کہاں سے شروعات کرنی ہے یا سمارٹ کنٹریکٹس کو کیسے تعینات کرنا ہے اور ان کے ساتھ کیسے تعامل کرنا ہے۔ ہم [میٹاماسک](https://metamask.io)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org)، اور [Alchemy](https://alchemy.com/eth) کا استعمال کرتے ہوئے گورلی آزمائشی نیٹ ورک پر ایک سادہ سمارٹ کنٹریکٹ بنانے اور تعینات کرنے کے عمل سے گزریں گے۔

اس ٹیوٹوریل کو مکمل کرنے کے لیے آپ کو ایک Alchemy اکاؤنٹ کی ضرورت ہوگی۔ [مفت اکاؤنٹ کے لیے سائن اپ کریں](https://www.alchemy.com/)۔

اگر آپ کے کسی بھی موقع پر سوالات ہوں، تو بلا جھجھک [Alchemy ڈسکارڈ](https://discord.gg/gWuC7zB) میں رابطہ کریں!

## حصہ 1 - <span dir="ltr">Hardhat</span> کا استعمال کرتے ہوئے اپنا سمارٹ کنٹریکٹ بنائیں اور تعینات کریں {#part-1}

### ایتھیریم نیٹ ورک سے جڑیں {#connect-to-the-ethereum-network}

ایتھیریم چین کو درخواستیں بھیجنے کے کئی طریقے ہیں۔ سادگی کے لیے، ہم <span dir="ltr">Alchemy</span> پر ایک مفت اکاؤنٹ استعمال کریں گے، جو ایک بلاک چین ڈیولپر پلیٹ فارم اور <span dir="ltr">API</span> ہے جو ہمیں خود نوڈ چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی سہولت دیتا ہے۔ <span dir="ltr">Alchemy</span> میں نگرانی اور تجزیات کے لیے ڈیولپر ٹولز بھی موجود ہیں؛ ہم اس ٹیوٹوریل میں ان کا فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہماری سمارٹ کنٹریکٹ کی تعیناتی میں اندرونی طور پر کیا ہو رہا ہے۔

### اپنی ایپ اور <span dir="ltr">API</span> کلید بنائیں {#create-your-app-and-api-key}

ایک بار جب آپ <span dir="ltr">Alchemy</span> اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر <span dir="ltr">API</span> کلید تیار کر سکتے ہیں۔ یہ آپ کو گورلی آزمائشی نیٹ ورک پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ آزمائشی نیٹ ورکس سے واقف نہیں ہیں تو آپ [نیٹ ورک کے انتخاب کے لیے <span dir="ltr">Alchemy</span> کی گائیڈ پڑھ سکتے ہیں](https://www.alchemy.com/docs/choosing-a-web3-network)۔

<span dir="ltr">Alchemy</span> ڈیش بورڈ پر، نیویگیشن بار میں **<span dir="ltr">Apps</span>** ڈراپ ڈاؤن تلاش کریں اور **<span dir="ltr">Create App</span>** پر کلک کریں۔

![Hello world create app](./hello-world-create-app.png)

اپنی ایپ کو '_<span dir="ltr">Hello World</span>_' کا نام دیں اور ایک مختصر تفصیل لکھیں۔ اپنے ماحول کے طور پر **<span dir="ltr">Staging</span>** اور اپنے نیٹ ورک کے طور پر **گورلی** کو منتخب کریں۔

![create app view hello world](./create-app-view-hello-world.png)

_نوٹ: یقینی بنائیں کہ آپ **گورلی** کو منتخب کریں، ورنہ یہ ٹیوٹوریل کام نہیں کرے گا۔_

**<span dir="ltr">Create app</span>** پر کلک کریں۔ آپ کی ایپ نیچے دیے گئے ٹیبل میں ظاہر ہو جائے گی۔

### ایک ایتھیریم اکاؤنٹ بنائیں {#create-an-ethereum-account}

ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے آپ کو ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ ہم میٹاماسک استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے اور صارفین کو اپنے ایتھیریم اکاؤنٹ کا پتہ منظم کرنے کی سہولت دیتا ہے۔

آپ [یہاں](https://metamask.io/download) مفت میں میٹاماسک اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں جانب "<span dir="ltr">Goerli Test Network</span>" پر سوئچ کر لیں (تاکہ ہم حقیقی پیسوں کے ساتھ کام نہ کر رہے ہوں)۔

### مرحلہ 4: فوسٹ سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

آزمائشی نیٹ ورک پر اپنا سمارٹ کنٹریکٹ تعینات کرنے کے لیے، آپ کو کچھ نقلی <span dir="ltr">ETH</span> کی ضرورت ہوگی۔ گورلی نیٹ ورک پر <span dir="ltr">ETH</span> حاصل کرنے کے لیے، گورلی فوسٹ پر جائیں اور اپنا گورلی اکاؤنٹ کا پتہ درج کریں۔ نوٹ کریں کہ گورلی فوسٹس حال ہی میں کچھ غیر معتبر ہو سکتے ہیں - آزمانے کے لیے اختیارات کی فہرست کے لیے [آزمائشی نیٹ ورکس کا صفحہ](/developers/docs/networks/#goerli) دیکھیں:

_نوٹ: نیٹ ورک کے ہجوم کی وجہ سے، اس میں کچھ وقت لگ سکتا ہے۔_
``

### مرحلہ 5: اپنا بیلنس چیک کریں
یہ دوبارہ چیک کرنے کے لیے کہ <span dir="ltr">ETH</span> آپ کے والیٹ میں موجود ہے، آئیے [<span dir="ltr">Alchemy</span> کے سینڈ باکس ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [<span dir="ltr">eth_getBalance</span>](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود <span dir="ltr">ETH</span> کی رقم واپس کرے گا۔ مزید جاننے کے لیے [کمپوزر ٹول استعمال کرنے کے طریقے پر <span dir="ltr">Alchemy</span> کا مختصر ٹیوٹوریل](https://youtu.be/r6sjRxBZJuU) دیکھیں۔

اپنے میٹاماسک اکاؤنٹ کا پتہ درج کریں اور **<span dir="ltr">Send Request</span>** پر کلک کریں۔ آپ کو ایک جواب نظر آئے گا جو نیچے دیے گئے کوڈ کے ٹکڑے جیسا ہوگا۔

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _نوٹ: یہ نتیجہ <span dir="ltr">wei</span> میں ہے، <span dir="ltr">ETH</span> میں نہیں۔ <span dir="ltr">Wei</span> کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔_

شکر ہے! ہمارا سارا نقلی پیسہ وہیں موجود ہے۔
### مرحلہ 6: اپنا پروجیکٹ شروع (initialize) کریں

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانے کی ضرورت ہوگی۔ اپنی کمانڈ لائن پر جائیں اور درج ذیل درج کریں۔

```
mkdir hello-world
cd hello-world
```

اب چونکہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع (initialize) کرنے کے لیے `npm init` کا استعمال کریں گے۔

> اگر آپ کے پاس ابھی تک <span dir="ltr">npm</span> انسٹال نہیں ہے، تو <span dir="ltr">Node.js</span> اور <span dir="ltr">npm</span> انسٹال کرنے کے لیے [<span dir="ltr">Node.js</span> کی انسٹالیشن کی ہدایات](https://nodejs.org/en/download/) پر عمل کریں۔

اس ٹیوٹوریل کے مقصد کے لیے، اس سے کوئی فرق نہیں پڑتا کہ آپ شروعاتی (initialization) سوالات کے کیا جواب دیتے ہیں۔ حوالے کے لیے ہم نے اسے اس طرح کیا ہے:

```
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

<span dir="ltr">package.json</span> کو منظور کریں اور ہم آگے بڑھنے کے لیے تیار ہیں!
### مرحلہ 7: <span dir="ltr">Hardhat</span> ڈاؤن لوڈ کریں {#step-7-download-hardhat}

<span dir="ltr">Hardhat</span> آپ کے ایتھیریم سافٹ ویئر کو مرتب کرنے، تعینات کرنے، ٹیسٹ کرنے اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ لائیو چین پر تعینات کرنے سے پہلے مقامی طور پر سمارٹ کنٹریکٹس اور غیر مرکزی ایپلی کیشنز (<span dir="ltr">dapps</span>) بنانے میں ڈیولپرز کی مدد کرتا ہے۔

ہمارے `hello-world` پروجیکٹ کے اندر چلائیں:

```
npm install --save-dev hardhat
```

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

### مرحلہ 8: <span dir="ltr">Hardhat</span> پروجیکٹ بنائیں {#step-8-create-hardhat-project}

ہمارے `hello-world` پروجیکٹ فولڈر کے اندر، چلائیں:

```
npx hardhat
```

اس کے بعد آپ کو ایک خوش آمدید کا پیغام اور یہ منتخب کرنے کا اختیار نظر آنا چاہیے کہ آپ کیا کرنا چاہتے ہیں۔ "<span dir="ltr">create an empty hardhat.config.js</span>" کو منتخب کریں:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

یہ پروجیکٹ میں ایک `hardhat.config.js` فائل تیار کرے گا۔ ہم اسے بعد میں ٹیوٹوریل میں اپنے پروجیکٹ کے سیٹ اپ کی وضاحت کرنے کے لیے استعمال کریں گے۔

### مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#step-9-add-project-folders}

پروجیکٹ کو منظم رکھنے کے لیے، آئیے دو نئے فولڈرز بنائیں۔ کمانڈ لائن میں، اپنے `hello-world` پروجیکٹ کی روٹ ڈائریکٹری پر جائیں اور ٹائپ کریں:

```
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنی ہیلو ورلڈ سمارٹ کنٹریکٹ کوڈ فائل رکھیں گے
- `scripts/` وہ جگہ ہے جہاں ہم اپنے کنٹریکٹ کو تعینات کرنے اور اس کے ساتھ بات چیت کرنے کے لیے سکرپٹس رکھیں گے

### مرحلہ 10: اپنا کنٹریکٹ لکھیں {#step-10-write-our-contract}

آپ شاید خود سے پوچھ رہے ہوں گے کہ ہم کوڈ کب لکھنے والے ہیں؟ اب وقت آ گیا ہے!

اپنے پسندیدہ ایڈیٹر میں <span dir="ltr">hello-world</span> پروجیکٹ کھولیں۔ سمارٹ کنٹریکٹس عام طور پر <span dir="ltr">Solidity</span> میں لکھے جاتے ہیں، جسے ہم اپنا سمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔‌

1. `contracts` فولڈر میں جائیں اور `HelloWorld.sol` کے نام سے ایک نئی فائل بنائیں
2. ذیل میں ایک نمونہ <span dir="ltr">Hello World</span> سمارٹ کنٹریکٹ ہے جسے ہم اس ٹیوٹوریل کے لیے استعمال کریں گے۔ ذیل کے مواد کو `HelloWorld.sol` فائل میں کاپی کریں۔

_نوٹ: یہ سمجھنے کے لیے کہ یہ کنٹریکٹ کیا کرتا ہے، تبصرے (comments) ضرور پڑھیں۔_

```
// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن متعین کرتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` نامی کنٹریکٹ کی وضاحت کرتا ہے۔
// کنٹریکٹ فنکشنز اور ڈیٹا (اس کی حالت) کا مجموعہ ہوتا ہے۔ ایک بار تعینات ہونے کے بعد، کنٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص پتے پر موجود ہوتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // اپ ڈیٹ فنکشن کال ہونے پر خارج (emit) ہوتا ہے
   // سمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر کچھ ہوا ہے، جسے آپ کی ایپ کا فرنٹ اینڈ 'سن' سکتا ہے اور ان کے ہونے پر کارروائی کر سکتا ہے۔
   event UpdatedMessages(string oldStr, string newStr);

   // `string` قسم کے ایک سٹیٹ ویری ایبل `message` کا اعلان کرتا ہے۔
   // سٹیٹ ویری ایبلز وہ ویری ایبلز ہوتے ہیں جن کی قدریں مستقل طور پر کنٹریکٹ سٹوریج میں محفوظ ہوتی ہیں۔ کلیدی لفظ `public` ویری ایبلز کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک ایسا فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس قدر تک رسائی کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، کنسٹرکٹر ایک خاص فنکشن ہوتا ہے جو صرف کنٹریکٹ بننے پر ہی چلتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے کیا جاتا ہے۔ مزید جانیں:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک سٹرنگ آرگومنٹ `initMessage` قبول کرتا ہے اور قدر کو کنٹریکٹ کے `message` سٹوریج ویری ایبل میں سیٹ کرتا ہے۔
      message = initMessage;
   }

   // ایک عوامی فنکشن جو ایک سٹرنگ آرگومنٹ قبول کرتا ہے اور `message` سٹوریج ویری ایبل کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

یہ ایک بنیادی سمارٹ کنٹریکٹ ہے جو بننے پر ایک پیغام محفوظ کرتا ہے۔ اسے `update` فنکشن کو کال کر کے اپ ڈیٹ کیا جا سکتا ہے۔

### مرحلہ 11: میٹاماسک اور <span dir="ltr">Alchemy</span> کو اپنے پروجیکٹ سے جوڑیں {#step-11-connect-metamask-alchemy-to-your-project}

ہم نے ایک میٹاماسک والیٹ، <span dir="ltr">Alchemy</span> اکاؤنٹ بنا لیا ہے، اور اپنا سمارٹ کنٹریکٹ لکھ لیا ہے، اب وقت آ گیا ہے کہ ان تینوں کو آپس میں جوڑیں۔

آپ کے والیٹ سے بھیجی جانے والی ہر ٹرانزیکشن کے لیے آپ کی منفرد نجی کلید کا استعمال کرتے ہوئے دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی نجی کلید کو محفوظ طریقے سے ایک انوائرنمنٹ (environment) فائل میں محفوظ کر سکتے ہیں۔ ہم یہاں <span dir="ltr">Alchemy</span> کے لیے ایک <span dir="ltr">API</span> کلید بھی محفوظ کریں گے۔

> ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، <span dir="ltr">Web3</span> کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائریکٹری میں <span dir="ltr">dotenv</span> پیکیج انسٹال کریں:

```
npm install dotenv --save
```

پھر، پروجیکٹ کی روٹ ڈائریکٹری میں ایک `.env` فائل بنائیں۔ اس میں اپنی میٹاماسک نجی کلید اور <span dir="ltr">HTTP Alchemy API URL</span> شامل کریں۔

آپ کی انوائرنمنٹ فائل کا نام `.env` ہونا چاہیے ورنہ اسے انوائرنمنٹ فائل کے طور پر تسلیم نہیں کیا جائے گا۔

اس کا نام `process.env` یا `.env-custom` یا کچھ اور نہ رکھیں۔

- اپنی نجی کلید برآمد کرنے کے لیے [ان ہدایات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) پر عمل کریں
- <span dir="ltr">HTTP Alchemy API URL</span> حاصل کرنے کے لیے نیچے دیکھیں

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

آپ کی `.env` کچھ اس طرح دکھنی چاہیے:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

انہیں دراصل اپنے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 میں اپنی `hardhat.config.js` فائل میں ان ویری ایبلز کا حوالہ دیں گے۔

### مرحلہ 12: <span dir="ltr">Ethers.js</span> انسٹال کریں {#step-12-install-ethersjs}

<span dir="ltr">Ethers.js</span> ایک لائبریری ہے جو [معیاری <span dir="ltr">JSON-RPC</span> طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر ایتھیریم کے ساتھ بات چیت کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

<span dir="ltr">Hardhat</span> ہمیں اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو مربوط کرنے کی اجازت دیتا ہے۔ ہم کنٹریکٹ کی تعیناتی کے لیے [<span dir="ltr">Ethers</span> پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) کا فائدہ اٹھائیں گے۔

اپنی پروجیکٹ ڈائریکٹری میں ٹائپ کریں:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### مرحلہ 13: <span dir="ltr">hardhat.config.js</span> کو اپ ڈیٹ کریں {#step-13-update-hardhat-configjs}

ہم نے اب تک کئی انحصار (dependencies) اور پلگ انز شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اپ ڈیٹ کریں تاکہ یہ اس طرح دکھے:

```javascript
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")

const { API_URL, PRIVATE_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`<span dir="ltr">0x</span>${PRIVATE_KEY}`],
    },
  },
}
```

### مرحلہ 14: اپنا کنٹریکٹ مرتب (compile) کریں {#step-14-compile-our-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کنٹریکٹ کو مرتب کریں۔ `compile` ٹاسک بلٹ ان <span dir="ltr">Hardhat</span> ٹاسکس میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```bash
npx hardhat compile
```

آپ کو `SPDX license identifier not provided in source file` کے بارے میں ایک انتباہ مل سکتا ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک لگ رہا ہے! اگر نہیں، تو آپ ہمیشہ [<span dir="ltr">Alchemy</span> ڈسکارڈ](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

### مرحلہ 15: اپنی تعیناتی کی سکرپٹ لکھیں {#step-15-write-our-deploy-script}

اب جب کہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آ گیا ہے کہ ہم اپنے کنٹریکٹ کی تعیناتی کی سکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` کے نام سے ایک نئی فائل بنائیں، اور اس میں درج ذیل مواد شامل کریں:

```javascript
async function main() {
  const HelloWorld = await ethers.getکنٹریکٹFactory("HelloWorld")

  // تعیناتی شروع کریں، ایک promise واپس کر رہا ہے جو ایک کنٹریکٹ آبجیکٹ پر resolve ہوتا ہے
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("Contract deployed to address:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

<span dir="ltr">Hardhat</span> اپنے [کنٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں یہ بتانے کا ایک حیرت انگیز کام کرتا ہے کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے، ہم نے ان کی وضاحتوں کو یہاں اپنایا ہے۔

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

<span dir="ltr">ethers.js</span> میں ایک `ContractFactory` ایک تجرید (abstraction) ہے جو نئے سمارٹ کنٹریکٹس کو تعینات کرنے کے لیے استعمال ہوتی ہے، لہذا یہاں `HelloWorld` ہمارے ہیلو ورلڈ کنٹریکٹ کی مثالوں (instances) کے لیے ایک [فیکٹری](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) ہے۔ `hardhat-ethers` پلگ ان `ContractFactory` اور `Contract` کا استعمال کرتے وقت، مثالیں پہلے سے طے شدہ طور پر پہلے دستخط کنندہ (مالک) سے جڑی ہوتی ہیں۔

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory` پر `deploy()` کو کال کرنے سے تعیناتی شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` آبجیکٹ میں حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے ہر سمارٹ کنٹریکٹ فنکشن کے لیے ایک طریقہ (method) موجود ہے۔

### مرحلہ 16: اپنا کنٹریکٹ تعینات کریں {#step-16-deploy-our-contract}

ہم بالآخر اپنا سمارٹ کنٹریکٹ تعینات کرنے کے لیے تیار ہیں! کمانڈ لائن پر جائیں اور چلائیں:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**براہ کرم اس پتے کو محفوظ کر لیں**۔ ہم اسے بعد میں ٹیوٹوریل میں استعمال کریں گے۔

اگر ہم [گورلی <span dir="ltr">Etherscan</span>](https://goerli.etherscan.io) پر جائیں اور اپنے کنٹریکٹ کا پتہ تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی کے ساتھ تعینات کر دیا گیا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![](./etherscan-contract.png)

`From` کا پتہ آپ کے میٹاماسک اکاؤنٹ کے پتے سے میل کھانا چاہیے اور `To` کا پتہ **<span dir="ltr">Contract Creation</span>** کہے گا۔ اگر ہم ٹرانزیکشن پر کلک کرتے ہیں تو ہم `To` فیلڈ میں اپنے کنٹریکٹ کا پتہ دیکھیں گے۔

![](./etherscan-transaction.png)

مبارک ہو! آپ نے ابھی ایک ایتھیریم آزمائشی نیٹ ورک پر ایک سمارٹ کنٹریکٹ تعینات کیا ہے۔

یہ سمجھنے کے لیے کہ اندرونی طور پر کیا ہو رہا ہے، آئیے اپنے [<span dir="ltr">Alchemy</span> ڈیش بورڈ](https://dashboard.alchemy.com/explorer) میں ایکسپلورر (<span dir="ltr">Explorer</span>) ٹیب پر جائیں۔ اگر آپ کے پاس متعدد <span dir="ltr">Alchemy</span> ایپس ہیں تو یقینی بنائیں کہ ایپ کے لحاظ سے فلٹر کریں اور **<span dir="ltr">Hello World</span>** کو منتخب کریں۔

![](./hello-world-explorer.png)

یہاں آپ کو مٹھی بھر <span dir="ltr">JSON-RPC</span> طریقے نظر آئیں گے جو <span dir="ltr">Hardhat</span>/<span dir="ltr">Ethers</span> نے ہمارے لیے اندرونی طور پر بنائے تھے جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں دو اہم طریقے [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) ہیں، جو ہمارے کنٹریکٹ کو گورلی چین پر لکھنے کی درخواست ہے، اور [`eth_getTransactionByHash`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-by-hash) ہے، جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [<span dir="ltr">Web3</span> کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر ہمارا ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

## حصہ 2: اپنے سمارٹ کنٹریکٹ کے ساتھ تعامل کریں {#part-2-interact-with-your-smart-contract}

اب چونکہ ہم نے کامیابی کے ساتھ گورلی نیٹ ورک پر ایک سمارٹ کنٹریکٹ تعینات کر دیا ہے، تو آئیے سیکھتے ہیں کہ اس کے ساتھ کیسے تعامل کیا جائے۔

### ایک <span dir="ltr">interact.js</span> فائل بنائیں {#create-a-interactjs-file}

یہ وہ فائل ہے جہاں ہم اپنا تعامل کا اسکرپٹ لکھیں گے۔ ہم <span dir="ltr">Ethers.js</span> لائبریری استعمال کریں گے جسے آپ نے پہلے حصہ 1 میں انسٹال کیا تھا۔

`scripts/` فولڈر کے اندر، `interact.js` کے نام سے ایک نئی فائل بنائیں اور درج ذیل کوڈ شامل کریں:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### اپنی <span dir="ltr">.env</span> فائل کو اپ ڈیٹ کریں {#update-your-env-file}

ہم نئے انوائرنمنٹ ویری ایبلز استعمال کریں گے، اس لیے ہمیں انہیں اس `.env` فائل میں متعین کرنے کی ضرورت ہے جو [ہم نے پہلے بنائی تھی](#step-11-connect-metamask-alchemy-to-your-project)۔

ہمیں اپنی Alchemy `API_KEY` اور اس `CONTRACT_ADDRESS` کے لیے ایک تعریف شامل کرنے کی ضرورت ہوگی جہاں آپ کا سمارٹ کنٹریکٹ تعینات کیا گیا تھا۔

آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### اپنے کنٹریکٹ کا ABI حاصل کریں {#grab-your-contract-abi}

ہمارے کنٹریکٹ کا [ABI (Application Binary Interface)](/glossary/#abi) ہمارے سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کا انٹرفیس ہے۔ Hardhat خود بخود ایک ABI تیار کرتا ہے اور اسے `HelloWorld.json` میں محفوظ کرتا ہے۔ ABI استعمال کرنے کے لیے، ہمیں اپنی `interact.js` فائل میں کوڈ کی درج ذیل لائنیں شامل کر کے مواد کو پارس کرنے کی ضرورت ہوگی:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

اگر آپ ABI دیکھنا چاہتے ہیں تو آپ اسے اپنے کنسول پر پرنٹ کر سکتے ہیں:

```javascript
console.log(JSON.stringify(contract.abi))
```

اپنے ABI کو کنسول پر پرنٹ ہوتا دیکھنے کے لیے، اپنے ٹرمینل پر جائیں اور چلائیں:

```bash
npx hardhat run scripts/interact.js
```

### اپنے کنٹریکٹ کی ایک مثال (instance) بنائیں {#create-an-instance-of-your-contract}

اپنے کنٹریکٹ کے ساتھ تعامل کرنے کے لیے، ہمیں اپنے کوڈ میں ایک کنٹریکٹ کی مثال بنانے کی ضرورت ہے۔ <span dir="ltr">Ethers.js</span> کے ساتھ ایسا کرنے کے لیے، ہمیں تین تصورات کے ساتھ کام کرنے کی ضرورت ہوگی:

1. پرووائیڈر (پرووائیڈر) - ایک نوڈ پرووائیڈر جو آپ کو بلاک چین تک پڑھنے اور لکھنے کی رسائی دیتا ہے
2. سائنر (سائنر) - ایک ایتھیریم اکاؤنٹ کی نمائندگی کرتا ہے جو ٹرانزیکشنز پر دستخط کر سکتا ہے
3. کنٹریکٹ (Contract) - ایک <span dir="ltr">Ethers.js</span> آبجیکٹ جو آن چین تعینات کردہ ایک مخصوص کنٹریکٹ کی نمائندگی کرتا ہے

ہم کنٹریکٹ کی مثال بنانے کے لیے پچھلے مرحلے سے کنٹریکٹ ABI کا استعمال کریں گے:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

پرووائیڈرز، سائنرز، اور کنٹریکٹس کے بارے میں مزید جانیں [<span dir="ltr">ethers.js</span> کی دستاویزات](https://docs.ethers.io/v5/) میں۔

### ابتدائی پیغام (init message) پڑھیں {#read-the-init-message}

یاد ہے جب ہم نے اپنا کنٹریکٹ `initMessage = "Hello world!"` کے ساتھ تعینات کیا تھا؟ اب ہم اپنے سمارٹ کنٹریکٹ میں محفوظ اس پیغام کو پڑھنے اور اسے کنسول پر پرنٹ کرنے جا رہے ہیں۔

جاوا اسکرپٹ میں، نیٹ ورکس کے ساتھ تعامل کرتے وقت غیر مطابقت پذیر (asynchronous) فنکشنز استعمال ہوتے ہیں۔ غیر مطابقت پذیر فنکشنز کے بارے میں مزید جاننے کے لیے، [یہ میڈیم (Medium) آرٹیکل پڑھیں](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)۔

ہمارے سمارٹ کنٹریکٹ میں `message` فنکشن کو کال کرنے اور ابتدائی پیغام پڑھنے کے لیے نیچے دیا گیا کوڈ استعمال کریں:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

ٹرمینل میں `npx hardhat run scripts/interact.js` کا استعمال کرتے ہوئے فائل کو چلانے کے بعد ہمیں یہ جواب دیکھنا چاہیے:

```
پیغام یہ ہے: Hello world!
```

مبارک ہو! آپ نے ابھی کامیابی کے ساتھ ایتھیریم بلاک چین سے سمارٹ کنٹریکٹ کا ڈیٹا پڑھ لیا ہے، بہت خوب!

### پیغام کو اپ ڈیٹ کریں {#update-the-message}

صرف پیغام پڑھنے کے بجائے، ہم `update` فنکشن کا استعمال کرتے ہوئے اپنے سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ بھی کر سکتے ہیں! ہے نا زبردست؟

پیغام کو اپ ڈیٹ کرنے کے لیے، ہم براہ راست اپنے بنائے گئے کنٹریکٹ آبجیکٹ پر `update` فنکشن کو کال کر سکتے ہیں:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("This is the new message.")
  await tx.wait()
}
main()
```

نوٹ کریں کہ لائن 11 پر، ہم واپس کیے گئے ٹرانزیکشن آبجیکٹ پر `.wait()` کو کال کرتے ہیں۔ یہ اس بات کو یقینی بناتا ہے کہ ہمارا اسکرپٹ فنکشن سے باہر نکلنے سے پہلے بلاک چین پر ٹرانزیکشن کے مائن ہونے کا انتظار کرے۔ اگر `.wait()` کال شامل نہیں کی گئی ہے، تو ہو سکتا ہے کہ اسکرپٹ کو کنٹریکٹ میں اپ ڈیٹ شدہ `message` ویلیو نظر نہ آئے۔

### نیا پیغام پڑھیں {#read-the-new-message}

اپ ڈیٹ شدہ `message` ویلیو کو پڑھنے کے لیے آپ کو [پچھلے مرحلے](#read-the-init-message) کو دہرانے کے قابل ہونا چاہیے۔ ایک لمحہ نکالیں اور دیکھیں کہ کیا آپ اس نئی ویلیو کو پرنٹ کرنے کے لیے ضروری تبدیلیاں کر سکتے ہیں!

اگر آپ کو اشارے کی ضرورت ہے، تو یہاں بتایا گیا ہے کہ اس مقام پر آپ کی `interact.js` فائل کیسی دکھنی چاہیے:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")

// پرووائیڈر - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// سائنر - آپ
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// کنٹریکٹ کی مثال
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)

  console.log("Updating the message...")
  const tx = await helloWorldContract.update("this is the new message")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("The new message is: " + newMessage)
}

main()
```

اب بس اسکرپٹ چلائیں اور آپ کو پرانا پیغام، اپ ڈیٹ ہونے کا اسٹیٹس، اور نیا پیغام اپنے ٹرمینل پر پرنٹ ہوتا نظر آنا چاہیے!

`npx hardhat run scripts/interact.js --network goerli`

```
پیغام یہ ہے: Hello World!
پیغام کو اپ ڈیٹ کیا جا رہا ہے...
نیا پیغام یہ ہے: This is the new message.
```

اس اسکرپٹ کو چلاتے وقت، آپ محسوس کر سکتے ہیں کہ نیا پیغام لوڈ ہونے سے پہلے `Updating the message...` کا مرحلہ لوڈ ہونے میں کچھ وقت لیتا ہے۔ یہ مائننگ کے عمل کی وجہ سے ہے؛ اگر آپ ٹرانزیکشنز کے مائن ہونے کے دوران انہیں ٹریک کرنے کے بارے میں متجسس ہیں، تو ٹرانزیکشن کا اسٹیٹس دیکھنے کے لیے [Alchemy میم پول (mempool)](https://dashboard.alchemy.com/mempool) پر جائیں۔ اگر ٹرانزیکشن ڈراپ ہو جاتی ہے، تو [گورلی Etherscan](https://goerli.etherscan.io) کو چیک کرنا اور اپنے ٹرانزیکشن ہیش کو تلاش کرنا بھی مددگار ثابت ہوتا ہے۔

## حصہ 3: اپنے سمارٹ کنٹریکٹ کو Etherscan پر شائع کریں {#part-3-publish-your-smart-contract-to-etherscan}

آپ نے اپنے سمارٹ کنٹریکٹ کو حقیقت کا روپ دینے کے لیے تمام محنت کر لی ہے؛ اب اسے دنیا کے ساتھ شیئر کرنے کا وقت آ گیا ہے!

Etherscan پر اپنے سمارٹ کنٹریکٹ کی تصدیق کر کے، کوئی بھی آپ کا سورس کوڈ دیکھ سکتا ہے اور آپ کے سمارٹ کنٹریکٹ کے ساتھ تعامل کر سکتا ہے۔ آئیے شروع کرتے ہیں!

### مرحلہ 1: اپنے Etherscan اکاؤنٹ پر ایک API کلید تیار کریں {#step-1-generate-an-api-key-on-your-etherscan-account}

یہ تصدیق کرنے کے لیے کہ آپ اس سمارٹ کنٹریکٹ کے مالک ہیں جسے آپ شائع کرنے کی کوشش کر رہے ہیں، ایک Etherscan API کلید ضروری ہے۔

اگر آپ کے پاس پہلے سے Etherscan اکاؤنٹ نہیں ہے، تو [اکاؤنٹ کے لیے سائن اپ کریں](https://etherscan.io/register)۔

لاگ ان ہونے کے بعد، نیویگیشن بار میں اپنا صارف نام تلاش کریں، اس پر ہوور کریں اور **<span dir="ltr">My profile</span>** بٹن کو منتخب کریں۔

اپنے پروفائل صفحہ پر، آپ کو ایک سائیڈ نیویگیشن بار نظر آنا چاہیے۔ سائیڈ نیویگیشن بار سے، **<span dir="ltr">API Keys</span>** کو منتخب کریں۔ اس کے بعد، ایک نئی API کلید بنانے کے لیے "<span dir="ltr">Add</span>" بٹن دبائیں، اپنی ایپ کا نام **<span dir="ltr">hello-world</span>** رکھیں اور **<span dir="ltr">Create New API Key</span>** بٹن دبائیں۔

آپ کی نئی API کلید کو API کلید کے ٹیبل میں ظاہر ہونا چاہیے۔ API کلید کو اپنے کلپ بورڈ پر کاپی کریں۔

اس کے بعد، ہمیں Etherscan API کلید کو اپنی `.env` فائل میں شامل کرنے کی ضرورت ہے۔

اسے شامل کرنے کے بعد، آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat کے ذریعے تعینات کردہ سمارٹ کنٹریکٹس {#hardhat-deployed-smart-contracts}

#### <span dir="ltr">hardhat-etherscan</span> انسٹال کریں {#install-hardhat-etherscan}

Hardhat کا استعمال کرتے ہوئے اپنے کنٹریکٹ کو Etherscan پر شائع کرنا سیدھا اور آسان ہے۔ شروع کرنے کے لیے آپ کو سب سے پہلے `hardhat-etherscan` پلگ ان انسٹال کرنے کی ضرورت ہوگی۔ `hardhat-etherscan` خود بخود Etherscan پر سمارٹ کنٹریکٹ کے سورس کوڈ اور <span dir="ltr">ABI</span> کی تصدیق کر دے گا۔ اسے شامل کرنے کے لیے، `hello-world` ڈائرکٹری میں چلائیں:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

ایک بار انسٹال ہونے کے بعد، اپنی `hardhat.config.js` کے اوپری حصے میں درج ذیل بیان شامل کریں، اور Etherscan کنفیگریشن کے اختیارات شامل کریں:

```javascript
// hardhat.config.js

require("dotenv").config()
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env

module.exports = {
  solidity: "0.7.3",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`<span dir="ltr">0x</span>${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan کے لیے آپ کی API کلید
    // اسے https://etherscan.io/ سے حاصل کریں
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan پر اپنے سمارٹ کنٹریکٹ کی تصدیق کریں {#verify-your-smart-contract-on-etherscan}

یقینی بنائیں کہ تمام فائلیں محفوظ ہو چکی ہیں اور تمام `.env` متغیرات درست طریقے سے کنفیگر کیے گئے ہیں۔

کنٹریکٹ کا پتہ، اور وہ نیٹ ورک جہاں اسے تعینات کیا گیا ہے، پاس کرتے ہوئے `verify` ٹاسک چلائیں:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

اس بات کو یقینی بنائیں کہ `DEPLOYED_CONTRACT_ADDRESS` گورلی آزمائشی نیٹ ورک پر آپ کے تعینات کردہ سمارٹ کنٹریکٹ کا پتہ ہے۔ اس کے علاوہ، آخری دلیل (`'Hello World!'`) وہی سٹرنگ ویلیو ہونی چاہیے جو [حصہ 1 میں تعیناتی کے مرحلے کے دوران](#step-15-write-our-deploy-script) استعمال کی گئی تھی۔

اگر سب کچھ ٹھیک رہا، تو آپ کو اپنے ٹرمینل میں درج ذیل پیغام نظر آئے گا:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https://goerli.etherscan.io/address/<contract-address>#contracts
```

مبارک ہو! آپ کا سمارٹ کنٹریکٹ کوڈ Etherscan پر ہے!

### Etherscan پر اپنا سمارٹ کنٹریکٹ دیکھیں! {#check-out-your-smart-contract-on-etherscan}

جب آپ اپنے ٹرمینل میں فراہم کردہ لنک پر جاتے ہیں، تو آپ کو Etherscan پر شائع شدہ اپنا سمارٹ کنٹریکٹ کوڈ اور <span dir="ltr">ABI</span> نظر آنا چاہیے!

**واہ - آپ نے کر دکھایا چیمپ! اب کوئی بھی آپ کے سمارٹ کنٹریکٹ کو کال کر سکتا ہے یا اس میں لکھ سکتا ہے! ہم یہ دیکھنے کے لیے بے تاب ہیں کہ آپ آگے کیا بناتے ہیں!**

## حصہ 4 - اپنے سمارٹ کنٹریکٹ کو فرنٹ اینڈ کے ساتھ مربوط کرنا {#part-4-integrating-your-smart-contract-with-the-frontend}

اس ٹیوٹوریل کے اختتام تک، آپ جان جائیں گے کہ کیسے:

- ایک میٹاماسک والیٹ کو اپنی غیر مرکزی ایپلی کیشن (dapp) سے منسلک کریں
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API کا استعمال کرتے ہوئے اپنے سمارٹ کنٹریکٹ سے ڈیٹا پڑھیں
- میٹاماسک کا استعمال کرتے ہوئے ایتھیریم ٹرانزیکشنز پر دستخط کریں

اس dapp کے لیے، ہم [React](https://react.dev/) کو اپنے فرنٹ اینڈ فریم ورک کے طور پر استعمال کریں گے؛ تاہم، یہ نوٹ کرنا ضروری ہے کہ ہم اس کے بنیادی اصولوں کو سمجھنے میں زیادہ وقت صرف نہیں کریں گے، کیونکہ ہماری زیادہ تر توجہ اپنے پروجیکٹ میں Web3 کی فعالیت لانے پر ہوگی۔

ایک شرط کے طور پر، آپ کو React کی ابتدائی سطح کی سمجھ ہونی چاہیے۔ اگر نہیں، تو ہم تجویز کرتے ہیں کہ آپ آفیشل [Intro to React ٹیوٹوریل](https://react.dev/learn) مکمل کریں۔

### اسٹارٹر فائلز کو کلون کریں {#clone-the-starter-files}

سب سے پہلے، اس پروجیکٹ کے لیے اسٹارٹر فائلز حاصل کرنے کے لیے [hello-world-part-four GitHub ریپوزٹری](https://github.com/alchemyplatform/hello-world-part-four-tutorial) پر جائیں اور اس ریپوزٹری کو اپنی مقامی مشین پر کلون کریں۔

کلون شدہ ریپوزٹری کو مقامی طور پر کھولیں۔ غور کریں کہ اس میں دو فولڈرز ہیں: `starter-files` اور `completed`۔

- `starter-files`- **ہم اس ڈائرکٹری میں کام کریں گے**، ہم UI کو آپ کے ایتھیریم والیٹ اور اس سمارٹ کنٹریکٹ سے جوڑیں گے جسے ہم نے [حصہ 3](#part-3-publish-your-smart-contract-to-etherscan) میں Etherscan پر شائع کیا تھا۔
- `completed` میں مکمل ٹیوٹوریل موجود ہے اور اگر آپ کہیں پھنس جائیں تو اسے صرف ایک حوالے کے طور پر استعمال کیا جانا چاہیے۔

اس کے بعد، اپنے پسندیدہ کوڈ ایڈیٹر میں `starter-files` کی اپنی کاپی کھولیں، اور پھر `src` فولڈر میں جائیں۔

ہم جو بھی کوڈ لکھیں گے وہ `src` فولڈر کے اندر ہوگا۔ ہم اپنے پروجیکٹ کو Web3 کی فعالیت دینے کے لیے `HelloWorld.js` جزو اور `util/interact.js` جاوا اسکرپٹ فائلوں میں ترمیم کریں گے۔

### اسٹارٹر فائلز چیک کریں {#check-out-the-starter-files}

اس سے پہلے کہ ہم کوڈنگ شروع کریں، آئیے دریافت کریں کہ اسٹارٹر فائلوں میں ہمیں کیا فراہم کیا گیا ہے۔

#### اپنا React پروجیکٹ چلائیں {#get-your-react-project-running}

آئیے اپنے براؤزر میں React پروجیکٹ چلا کر شروعات کریں۔ React کی خوبصورتی یہ ہے کہ ایک بار جب ہمارا پروجیکٹ ہمارے براؤزر میں چلنے لگتا ہے، تو ہم جو بھی تبدیلیاں محفوظ کرتے ہیں وہ ہمارے براؤزر میں لائیو اپ ڈیٹ ہو جائیں گی۔

پروجیکٹ کو چلانے کے لیے، `starter-files` فولڈر کی روٹ ڈائرکٹری میں جائیں، اور پروجیکٹ کی انحصار (dependencies) کو انسٹال کرنے کے لیے اپنے ٹرمینل میں `npm install` چلائیں:

```bash
cd starter-files
npm install
```

ایک بار جب وہ انسٹال ہو جائیں، تو اپنے ٹرمینل میں `npm start` چلائیں:

```bash
npm start
```

ایسا کرنے سے آپ کے براؤزر میں [http://localhost:3000/](http://localhost:3000/) کھل جانا چاہیے، جہاں آپ کو ہمارے پروجیکٹ کا فرنٹ اینڈ نظر آئے گا۔ اس میں ایک فیلڈ (آپ کے سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرنے کی جگہ)، ایک "Connect Wallet" بٹن، اور ایک "Update" بٹن شامل ہونا چاہیے۔

اگر آپ کسی بھی بٹن پر کلک کرنے کی کوشش کرتے ہیں، تو آپ دیکھیں گے کہ وہ کام نہیں کرتے—اس کی وجہ یہ ہے کہ ہمیں ابھی بھی ان کی فعالیت کو پروگرام کرنے کی ضرورت ہے۔

#### `HelloWorld.js` جزو {#the-helloworld-js-component}

آئیے اپنے ایڈیٹر میں `src` فولڈر میں واپس جائیں اور `HelloWorld.js` فائل کھولیں۔ یہ بہت اہم ہے کہ ہم اس فائل میں موجود ہر چیز کو سمجھیں، کیونکہ یہ وہ بنیادی React جزو ہے جس پر ہم کام کریں گے۔

اس فائل کے اوپری حصے میں، آپ دیکھیں گے کہ ہمارے پاس کئی امپورٹ اسٹیٹمنٹس ہیں جو ہمارے پروجیکٹ کو چلانے کے لیے ضروری ہیں، جن میں React لائبریری، useEffect اور useState ہکس، `./util/interact.js` سے کچھ آئٹمز (ہم جلد ہی ان کی مزید تفصیلات بیان کریں گے!)، اور Alchemy کا لوگو شامل ہیں۔

```javascript
// HelloWorld.js

import React from "react"
import { useEffect, useState } from "react"
import {
  helloWorldContract,
  connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
} from "./util/interact.js"

import alchemylogo from "./alchemylogo.svg"
```

اس کے بعد، ہمارے پاس ہمارے حالت (state) متغیرات ہیں جنہیں ہم مخصوص واقعات کے بعد اپ ڈیٹ کریں گے۔

```javascript
// HelloWorld.js

//حالت کے متغیرات
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

یہاں بتایا گیا ہے کہ ہر متغیر کس چیز کی نمائندگی کرتا ہے:

- `walletAddress` - ایک سٹرنگ جو صارف کے والیٹ کا پتہ محفوظ کرتی ہے
- `status`- ایک سٹرنگ جو ایک مددگار پیغام محفوظ کرتی ہے جو صارف کی رہنمائی کرتا ہے کہ dapp کے ساتھ کیسے تعامل کیا جائے
- `message` - ایک سٹرنگ جو سمارٹ کنٹریکٹ میں موجودہ پیغام کو محفوظ کرتی ہے
- `newMessage` - ایک سٹرنگ جو نیا پیغام محفوظ کرتی ہے جسے سمارٹ کنٹریکٹ میں لکھا جائے گا

حالت کے متغیرات کے بعد، آپ کو پانچ غیر نافذ شدہ فنکشنز نظر آئیں گے: `useEffect` ،`addSmartContractListener`، `addWalletListener` ، `connectWalletPressed`، اور `onUpdatePressed`۔ ہم ذیل میں وضاحت کریں گے کہ وہ کیا کرتے ہیں:

```javascript
// HelloWorld.js

//صرف ایک بار کال کیا گیا
useEffect(async () => {
  //TODO: لاگو کریں
}, [])

function addSmartContractListener() {
  //TODO: لاگو کریں
}

function addWalletListener() {
  //TODO: لاگو کریں
}

const connectWalletPressed = async () => {
  //TODO: لاگو کریں
}

const onUpdatePressed = async () => {
  //TODO: لاگو کریں
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- یہ ایک React ہک ہے جسے آپ کے جزو کے رینڈر ہونے کے بعد کال کیا جاتا ہے۔ چونکہ اس میں ایک خالی سرنی (array) `[]` پراپ پاس کیا گیا ہے (لائن 4 دیکھیں)، اسے صرف جزو کے _پہلے_ رینڈر پر کال کیا جائے گا۔ یہاں ہم اپنے سمارٹ کنٹریکٹ میں محفوظ کردہ موجودہ پیغام کو لوڈ کریں گے، اپنے سمارٹ کنٹریکٹ اور والیٹ کے سامعین (listeners) کو کال کریں گے، اور اپنے UI کو اپ ڈیٹ کریں گے تاکہ یہ ظاہر ہو سکے کہ آیا کوئی والیٹ پہلے سے منسلک ہے۔
- `addSmartContractListener`- یہ فنکشن ایک سامع (listener) سیٹ کرتا ہے جو ہمارے HelloWorld کنٹریکٹ کے `UpdatedMessages` ایونٹ پر نظر رکھے گا اور جب ہمارے سمارٹ کنٹریکٹ میں پیغام تبدیل ہوگا تو ہمارے UI کو اپ ڈیٹ کرے گا۔
- `addWalletListener`- یہ فنکشن ایک سامع سیٹ کرتا ہے جو صارف کے میٹاماسک والیٹ کی حالت میں تبدیلیوں کا پتہ لگاتا ہے، جیسے کہ جب صارف اپنا والیٹ منقطع کرتا ہے یا پتے تبدیل کرتا ہے۔
- `connectWalletPressed`- اس فنکشن کو صارف کے میٹاماسک والیٹ کو ہمارے dapp سے منسلک کرنے کے لیے کال کیا جائے گا۔
- `onUpdatePressed` - اس فنکشن کو اس وقت کال کیا جائے گا جب صارف سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرنا چاہے گا۔

اس فائل کے آخر کے قریب، ہمارے پاس اپنے جزو کا UI ہے۔

```javascript
// HelloWorld.js

//ہمارے جزو کا UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>Current Message:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>New Message:</h2>

    <div>
      <input
        type="text"
        placeholder="Update the message in your smart contract."
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        Update
      </button>
 
</div>
 
</div>
)
```

اگر آپ اس کوڈ کا بغور جائزہ لیں، تو آپ دیکھیں گے کہ ہم اپنے UI میں اپنے مختلف حالت کے متغیرات کو کہاں استعمال کرتے ہیں:

- لائنز 6-12 پر، اگر صارف کا والیٹ منسلک ہے (یعنی، `walletAddress.length > 0`)، تو ہم "walletButton" آئی ڈی والے بٹن میں صارف کے `walletAddress` کا ایک مختصر ورژن دکھاتے ہیں؛ بصورت دیگر یہ صرف "Connect Wallet" کہتا ہے۔
- لائن 17 پر، ہم سمارٹ کنٹریکٹ میں محفوظ کردہ موجودہ پیغام دکھاتے ہیں، جو `message` سٹرنگ میں کیپچر کیا گیا ہے۔
- لائنز 23-26 پر، جب ٹیکسٹ فیلڈ میں ان پٹ تبدیل ہوتا ہے تو ہم اپنے `newMessage` حالت کے متغیر کو اپ ڈیٹ کرنے کے لیے ایک [کنٹرولڈ جزو](https://legacy.reactjs.org/docs/forms.html#controlled-components) استعمال کرتے ہیں۔

ہمارے حالت کے متغیرات کے علاوہ، آپ یہ بھی دیکھیں گے کہ `connectWalletPressed` اور `onUpdatePressed` فنکشنز کو اس وقت کال کیا جاتا ہے جب بالترتیب `publishButton` اور `walletButton` آئی ڈی والے بٹنوں پر کلک کیا جاتا ہے۔

آخر میں، آئیے اس بات پر توجہ دیں کہ یہ `HelloWorld.js` جزو کہاں شامل کیا گیا ہے۔

اگر آپ `App.js` فائل میں جاتے ہیں، جو React میں مرکزی جزو ہے اور دیگر تمام اجزاء کے لیے ایک کنٹینر کے طور پر کام کرتا ہے، تو آپ دیکھیں گے کہ ہمارا `HelloWorld.js` جزو لائن 7 پر شامل کیا گیا ہے۔

آخر میں، آئیے آپ کے لیے فراہم کردہ ایک اور فائل، `interact.js` فائل کو چیک کریں۔

#### `interact.js` فائل {#the-interact-js-file}

چونکہ ہم [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) پیراڈائم کی پیروی کرنا چاہتے ہیں، اس لیے ہم ایک الگ فائل چاہیں گے جس میں ہمارے dapp کی منطق، ڈیٹا، اور قواعد کو منظم کرنے کے لیے ہمارے تمام فنکشنز موجود ہوں، اور پھر ان فنکشنز کو اپنے فرنٹ اینڈ (ہمارے `HelloWorld.js` جزو) میں ایکسپورٹ کرنے کے قابل ہوں۔

👆🏽یہ ہماری `interact.js` فائل کا بالکل یہی مقصد ہے!

اپنی `src` ڈائرکٹری میں `util` فولڈر میں جائیں، اور آپ دیکھیں گے کہ ہم نے `interact.js` نامی ایک فائل شامل کی ہے جس میں ہمارے سمارٹ کنٹریکٹ کے تعامل اور والیٹ کے تمام فنکشنز اور متغیرات شامل ہوں گے۔

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

آپ فائل کے اوپری حصے میں دیکھیں گے کہ ہم نے `helloWorldContract` آبجیکٹ کو کمنٹ آؤٹ کر دیا ہے۔ اس ٹیوٹوریل میں بعد میں، ہم اس آبجیکٹ کو ان کمنٹ کریں گے اور اس متغیر میں اپنے سمارٹ کنٹریکٹ کو انسٹینشیٹ (instantiate) کریں گے، جسے ہم پھر اپنے `HelloWorld.js` جزو میں ایکسپورٹ کریں گے۔

ہمارے `helloWorldContract` آبجیکٹ کے بعد چار غیر نافذ شدہ فنکشنز درج ذیل کام کرتے ہیں:

- `loadCurrentMessage` - یہ فنکشن سمارٹ کنٹریکٹ میں محفوظ کردہ موجودہ پیغام کو لوڈ کرنے کی منطق کو سنبھالتا ہے۔ یہ [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) کا استعمال کرتے ہوئے Hello World سمارٹ کنٹریکٹ کو ایک _read_ کال کرے گا۔
- `connectWallet` - یہ فنکشن صارف کے میٹاماسک کو ہمارے dapp سے منسلک کرے گا۔
- `getCurrentWalletConnected` - یہ فنکشن چیک کرے گا کہ آیا صفحہ لوڈ ہونے پر کوئی ایتھیریم اکاؤنٹ پہلے سے ہی ہمارے dapp سے منسلک ہے اور اس کے مطابق ہمارے UI کو اپ ڈیٹ کرے گا۔
- `updateMessage` - یہ فنکشن سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرے گا۔ یہ Hello World سمارٹ کنٹریکٹ کو ایک _write_ کال کرے گا، لہذا صارف کے میٹاماسک والیٹ کو پیغام کو اپ ڈیٹ کرنے کے لیے ایک ایتھیریم ٹرانزیکشن پر دستخط کرنے ہوں گے۔

اب جب کہ ہم سمجھ گئے ہیں کہ ہم کس چیز کے ساتھ کام کر رہے ہیں، آئیے معلوم کریں کہ اپنے سمارٹ کنٹریکٹ سے کیسے پڑھا جائے!

### مرحلہ 3: اپنے سمارٹ کنٹریکٹ سے پڑھیں {#step-3-read-from-your-smart-contract}

اپنے سمارٹ کنٹریکٹ سے پڑھنے کے لیے، آپ کو کامیابی کے ساتھ درج ذیل کو ترتیب دینے کی ضرورت ہوگی:

- ایتھیریم چین سے ایک API کنکشن
- آپ کے سمارٹ کنٹریکٹ کی ایک لوڈ شدہ مثال (instance)
- آپ کے سمارٹ کنٹریکٹ فنکشن کو کال کرنے کے لیے ایک فنکشن
- جب آپ سمارٹ کنٹریکٹ سے جو ڈیٹا پڑھ رہے ہیں وہ تبدیل ہوتا ہے تو اپ ڈیٹس پر نظر رکھنے کے لیے ایک سامع (listener)

یہ بہت سارے مراحل کی طرح لگ سکتا ہے، لیکن فکر نہ کریں! ہم آپ کو مرحلہ وار بتائیں گے کہ ان میں سے ہر ایک کو کیسے کرنا ہے! :)

#### ایتھیریم چین سے ایک <span dir="ltr">API</span> کنکشن قائم کریں

تو کیا آپ کو یاد ہے کہ اس ٹیوٹوریل کے حصہ 2 میں، ہم نے اپنے سمارٹ کنٹریکٹ سے پڑھنے کے لیے اپنی <span dir="ltr">Alchemy Web3</span> کلید کا استعمال کیسے کیا تھا؟ آپ کو چین سے پڑھنے کے لیے اپنی غیر مرکزی ایپلی کیشن (dapp) میں بھی ایک <span dir="ltr">Alchemy Web3</span> کلید کی ضرورت ہوگی。

اگر آپ کے پاس یہ پہلے سے موجود نہیں ہے، تو سب سے پہلے اپنی `starter-files` کی روٹ ڈائرکٹری میں جا کر اور اپنے ٹرمینل میں درج ذیل کو چلا کر [<span dir="ltr">Alchemy Web3</span>](https://github.com/alchemyplatform/alchemy-web3) انسٹال کریں:

```text
npm install @alch/alchemy-web3
```

[<span dir="ltr">Alchemy Web3</span>](https://github.com/alchemyplatform/alchemy-web3) دراصل [<span dir="ltr">Web3.js</span>](https://docs.web3js.org/) کے گرد ایک ریپر (wrapper) ہے، جو بہتر <span dir="ltr">API</span> طریقے اور دیگر اہم فوائد فراہم کرتا ہے تاکہ ایک <span dir="ltr">Web3</span> ڈیولپر کے طور پر آپ کی زندگی آسان ہو سکے۔ اسے اس طرح ڈیزائن کیا گیا ہے کہ اس میں کم سے کم کنفیگریشن کی ضرورت ہو تاکہ آپ اسے فوراً اپنی ایپ میں استعمال کرنا شروع کر سکیں!

پھر، اپنی پروجیکٹ ڈائرکٹری میں [<span dir="ltr">dotenv</span>](https://www.npmjs.com/package/dotenv) پیکیج انسٹال کریں، تاکہ اسے حاصل کرنے کے بعد ہمارے پاس اپنی <span dir="ltr">API</span> کلید کو محفوظ کرنے کے لیے ایک محفوظ جگہ ہو۔

```text
npm install dotenv --save
```

اپنے <span dir="ltr">dapp</span> کے لیے، **ہم اپنی <span dir="ltr">HTTP API</span> کلید کے بجائے اپنی <span dir="ltr">Websockets API</span> کلید استعمال کریں گے**، کیونکہ یہ ہمیں ایک ایسا سامع (listener) سیٹ کرنے کی اجازت دے گا جو سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کے تبدیل ہونے کا پتہ لگاتا ہے۔

ایک بار جب آپ اپنی <span dir="ltr">API</span> کلید حاصل کر لیں، تو اپنی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں اور اس میں اپنا <span dir="ltr">Alchemy Websockets URL</span> شامل کریں۔ اس کے بعد، آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

اب، ہم اپنے <span dir="ltr">dapp</span> میں اپنا <span dir="ltr">Alchemy Web3</span> اینڈ پوائنٹ سیٹ کرنے کے لیے تیار ہیں! آئیے اپنی `interact.js` پر واپس چلتے ہیں، جو ہمارے `util` فولڈر کے اندر موجود ہے اور فائل کے اوپری حصے میں درج ذیل کوڈ شامل کریں:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

اوپر، ہم نے سب سے پہلے اپنی `.env` فائل سے <span dir="ltr">Alchemy</span> کلید امپورٹ کی اور پھر اپنا <span dir="ltr">Alchemy Web3</span> اینڈ پوائنٹ قائم کرنے کے لیے اپنی `alchemyKey` کو `createAlchemyWeb3` میں پاس کیا۔

اس اینڈ پوائنٹ کے تیار ہونے کے بعد، اب وقت آ گیا ہے کہ ہم اپنا سمارٹ کنٹریکٹ لوڈ کریں!
#### اپنا Hello World سمارٹ کنٹریکٹ لوڈ کرنا {#loading-your-hello-world-smart-contract}

اپنے Hello World سمارٹ کنٹریکٹ کو لوڈ کرنے کے لیے، آپ کو اس کے کنٹریکٹ کا پتہ اور ABI درکار ہوگا، یہ دونوں Etherscan پر مل سکتے ہیں اگر آپ نے [اس ٹیوٹوریل کا حصہ 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) مکمل کر لیا ہے۔

#### Etherscan سے اپنے کنٹریکٹ کا ABI کیسے حاصل کریں {#how-to-get-your-contract-abi-from-etherscan}

اگر آپ نے اس ٹیوٹوریل کا حصہ 3 چھوڑ دیا ہے، تو آپ [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) پتے کے ساتھ HelloWorld کنٹریکٹ استعمال کر سکتے ہیں۔ اس کا ABI [یہاں](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) پایا جا سکتا ہے۔

ایک کنٹریکٹ ABI یہ بتانے کے لیے ضروری ہے کہ کنٹریکٹ کس فنکشن کو طلب (invoke) کرے گا اور ساتھ ہی یہ یقینی بنانے کے لیے بھی کہ فنکشن اس فارمیٹ میں ڈیٹا واپس کرے گا جس کی آپ توقع کر رہے ہیں۔ ایک بار جب ہم نے اپنے کنٹریکٹ کا ABI کاپی کر لیا، تو آئیے اسے اپنی `src` ڈائرکٹری میں `contract-abi.json` نامی JSON فائل کے طور پر محفوظ کریں۔

آپ کا contract-abi.json آپ کے src فولڈر میں محفوظ ہونا چاہیے۔

اپنے کنٹریکٹ کے پتے، ABI، اور Alchemy Web3 اینڈ پوائنٹ سے لیس ہو کر، ہم اپنے سمارٹ کنٹریکٹ کی ایک مثال (instance) لوڈ کرنے کے لیے [contract طریقہ](https://docs.web3js.org/api/web3-eth-contract/class/Contract) استعمال کر سکتے ہیں۔ اپنے کنٹریکٹ کے ABI کو `interact.js` فائل میں امپورٹ کریں اور اپنے کنٹریکٹ کا پتہ شامل کریں۔

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

اب ہم آخر کار اپنے `helloWorldContract` متغیر کو ان کمنٹ کر سکتے ہیں، اور اپنے AlchemyWeb3 اینڈ پوائنٹ کا استعمال کرتے ہوئے سمارٹ کنٹریکٹ کو لوڈ کر سکتے ہیں:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

خلاصہ کرنے کے لیے، آپ کے `interact.js` کی پہلی 12 لائنیں اب اس طرح دکھنی چاہئیں:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

اب جب کہ ہمارا کنٹریکٹ لوڈ ہو چکا ہے، ہم اپنا `loadCurrentMessage` فنکشن نافذ کر سکتے ہیں!

#### اپنی `interact.js` فائل میں `loadCurrentMessage` کو نافذ کرنا {#implementing-loadcurrentmessage-in-your-interact-js-file}

یہ فنکشن بہت آسان ہے۔ ہم اپنے کنٹریکٹ سے پڑھنے کے لیے ایک سادہ async web3 کال کرنے جا رہے ہیں۔ ہمارا فنکشن سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام واپس کرے گا:

اپنی `interact.js` فائل میں `loadCurrentMessage` کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

چونکہ ہم اس سمارٹ کنٹریکٹ کو اپنے UI میں دکھانا چاہتے ہیں، اس لیے آئیے اپنے `HelloWorld.js` جزو میں `useEffect` فنکشن کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// HelloWorld.js

//صرف ایک بار کال کیا گیا
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

نوٹ کریں، ہم صرف یہ چاہتے ہیں کہ ہمارا `loadCurrentMessage` جزو کے پہلے رینڈر کے دوران ایک بار کال کیا جائے۔ ہم جلد ہی `addSmartContractListener` کو نافذ کریں گے تاکہ سمارٹ کنٹریکٹ میں پیغام تبدیل ہونے کے بعد UI خود بخود اپ ڈیٹ ہو جائے۔

اس سے پہلے کہ ہم اپنے سامع (listener) کی طرف بڑھیں، آئیے چیک کریں کہ اب تک ہمارے پاس کیا ہے! اپنی `HelloWorld.js` اور `interact.js` فائلیں محفوظ کریں، اور پھر [http://localhost:3000/](http://localhost:3000/) پر جائیں

آپ دیکھیں گے کہ موجودہ پیغام اب "No connection to the network" نہیں کہتا۔ اس کے بجائے یہ سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو ظاہر کرتا ہے۔ زبردست!

#### آپ کا UI اب سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو ظاہر کرنا چاہیے {#your-ui-should-now-reflect-the-message-stored-in-the-smart-contract}

اب اس سامع (listener) کی بات کرتے ہیں...

#### `addSmartContractListener` کو نافذ کریں {#implement-addsmartcontractlistener}

اگر آپ اس `HelloWorld.sol` فائل کو یاد کریں جو ہم نے [اس ٹیوٹوریل سیریز کے حصہ 1](#step-10-write-our-contract) میں لکھی تھی، تو آپ کو یاد ہوگا کہ `UpdatedMessages` نامی ایک سمارٹ کنٹریکٹ ایونٹ ہے جو ہمارے سمارٹ کنٹریکٹ کے `update` فنکشن کو طلب (invoke) کیے جانے کے بعد خارج (emit) ہوتا ہے (لائنز 9 اور 27 دیکھیں):

```javascript
// HelloWorld.sol

// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن متعین کرتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` نامی ایک کنٹریکٹ کی وضاحت کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی حالت) کا مجموعہ ہے۔ ایک بار تعینات ہونے کے بعد، ایک کنٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص پتہ پر رہتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //جب اپ ڈیٹ فنکشن کو کال کیا جاتا ہے تو خارج ہوتا ہے
   //سمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر کچھ ہوا ہے آپ کی ایپ کے فرنٹ اینڈ کو، جو کچھ مخصوص ایونٹس کے لیے 'سن' سکتا ہے اور ان کے ہونے پر کارروائی کر سکتا ہے۔
   event UpdatedMessages(string oldStr, string newStr);

   // `string` قسم کے ایک حالت کے متغیر `message` کا اعلان کرتا ہے۔
   // حالت کے متغیرات وہ متغیرات ہیں جن کی قدریں مستقل طور پر کنٹریکٹ کی سٹوریج میں محفوظ ہوتی ہیں۔ کلیدی لفظ `public` متغیرات کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک فنکشن بناتا ہے جسے دوسرے کنٹریکٹ یا کلائنٹس قدر تک رسائی کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، کنسٹرکٹر ایک خاص فنکشن ہے جو صرف کنٹریکٹ کی تخلیق پر عمل میں لایا جاتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے کیا جاتا ہے۔ مزید جانیں:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک سٹرنگ آرگومنٹ `initMessage` کو قبول کرتا ہے اور قدر کو کنٹریکٹ کے `message` سٹوریج متغیر میں سیٹ کرتا ہے)۔
      message = initMessage;
   }

   // ایک پبلک فنکشن جو ایک سٹرنگ آرگومنٹ کو قبول کرتا ہے اور `message` سٹوریج متغیر کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

سمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر کچھ ہوا ہے (یعنی، ایک _ایونٹ_ ہوا ہے) آپ کی فرنٹ اینڈ ایپلیکیشن کو، جو مخصوص ایونٹس کے لیے 'سن' سکتی ہے اور ان کے ہونے پر کارروائی کر سکتی ہے۔

یہ `addSmartContractListener` فنکشن خاص طور پر ہمارے Hello World سمارٹ کنٹریکٹ کے `UpdatedMessages` ایونٹ کو سنے گا، اور نیا پیغام دکھانے کے لیے ہمارے UI کو اپ ڈیٹ کرے گا۔

`addSmartContractListener` کو درج ذیل میں تبدیل کریں:

```javascript
// HelloWorld.js

function addSmartContractListener() {
  helloWorldContract.events.UpdatedMessages({}, (error, data) => {
    if (error) {
      setStatus("😥 " + error.message)
    } else {
      setMessage(data.returnValues[1])
      setNewMessage("")
      setStatus("🎉 Your message has been updated!")
    }
  })
}
```

آئیے تفصیل سے دیکھتے ہیں کہ جب سامع (listener) کسی ایونٹ کا پتہ لگاتا ہے تو کیا ہوتا ہے:

- اگر ایونٹ کے خارج ہونے پر کوئی خرابی پیش آتی ہے، تو یہ ہمارے `status` حالت کے متغیر کے ذریعے UI میں ظاہر ہوگا۔
- بصورت دیگر، ہم واپس کیے گئے `data` آبجیکٹ کا استعمال کریں گے۔ `data.returnValues` صفر پر انڈیکس کی گئی ایک سرنی (array) ہے جہاں سرنی کا پہلا عنصر پچھلا پیغام محفوظ کرتا ہے اور دوسرا عنصر اپ ڈیٹ شدہ پیغام محفوظ کرتا ہے۔ مجموعی طور پر، ایک کامیاب ایونٹ پر ہم اپنی `message` سٹرنگ کو اپ ڈیٹ شدہ پیغام پر سیٹ کریں گے، `newMessage` سٹرنگ کو صاف کریں گے، اور اپنے `status` حالت کے متغیر کو اپ ڈیٹ کریں گے تاکہ یہ ظاہر ہو سکے کہ ہمارے سمارٹ کنٹریکٹ پر ایک نیا پیغام شائع کیا گیا ہے۔

آخر میں، آئیے اپنے سامع کو اپنے `useEffect` فنکشن میں کال کریں تاکہ یہ `HelloWorld.js` جزو کے پہلے رینڈر پر شروع (initialize) ہو جائے۔ مجموعی طور پر، آپ کا `useEffect` فنکشن اس طرح دکھنا چاہیے:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

اب جب کہ ہم اپنے سمارٹ کنٹریکٹ سے پڑھنے کے قابل ہو گئے ہیں، تو یہ جاننا بھی بہت اچھا ہوگا کہ اس میں کیسے لکھا جائے! تاہم، اپنے dapp میں لکھنے کے لیے، ہمارے پاس پہلے اس سے منسلک ایک ایتھیریم والیٹ ہونا چاہیے۔

لہذا، آگے ہم اپنا ایتھیریم والیٹ (میٹاماسک) ترتیب دینے اور پھر اسے اپنے dapp سے منسلک کرنے کا کام کریں گے!

### مرحلہ 4: اپنا ایتھیریم والیٹ ترتیب دیں {#step-4-set-up-your-ethereum-wallet}

ایتھیریم چین پر کچھ بھی لکھنے کے لیے، صارفین کو اپنے ورچوئل والیٹ کی نجی کلیدوں (private keys) کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کرنے ہوں گے۔ اس ٹیوٹوریل کے لیے، ہم [میٹاماسک](https://metamask.io/) استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ کا پتہ منظم کرنے کے لیے استعمال کیا جاتا ہے، کیونکہ یہ آخری صارف کے لیے اس ٹرانزیکشن پر دستخط کرنے کو بہت آسان بنا دیتا ہے۔

اگر آپ اس بارے میں مزید سمجھنا چاہتے ہیں کہ ایتھیریم پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو ایتھیریم فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

#### میٹاماسک ڈاؤن لوڈ کریں {#download-metamask}

آپ [یہاں](https://metamask.io/download) مفت میں میٹاماسک ڈاؤن لوڈ کر سکتے ہیں اور اکاؤنٹ بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپر دائیں جانب "Goerli Test Network" پر سوئچ کریں (تاکہ ہم حقیقی پیسوں کے ساتھ کام نہ کر رہے ہوں)۔

#### فوسٹ سے ایتھر شامل کریں {#add-ether-from-a-faucet}

ایتھیریم بلاک چین پر ٹرانزیکشن پر دستخط کرنے کے لیے، ہمیں کچھ جعلی Eth کی ضرورت ہوگی۔ Eth حاصل کرنے کے لیے آپ [FaucETH](https://fauceth.komputing.org) پر جا سکتے ہیں اور اپنا گورلی اکاؤنٹ کا پتہ درج کر سکتے ہیں، "Request funds" پر کلک کریں، پھر ڈراپ ڈاؤن میں "Ethereum Testnet Goerli" کو منتخب کریں اور آخر میں دوبارہ "Request funds" بٹن پر کلک کریں۔ آپ کو جلد ہی اپنے میٹاماسک اکاؤنٹ میں Eth نظر آنا چاہیے!

#### اپنا بیلنس چیک کریں
یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [<span dir="ltr">Alchemy</span> کے سینڈ باکس ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [<span dir="ltr">eth_getBalance</span>](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود <span dir="ltr">Eth</span> کی مقدار واپس کرے گا۔ اپنا میٹاماسک اکاؤنٹ کا پتہ درج کرنے اور "<span dir="ltr">Send Request</span>" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**نوٹ:** یہ نتیجہ <span dir="ltr">wei</span> میں ہے، <span dir="ltr">eth</span> میں نہیں۔ <span dir="ltr">Wei</span> کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ <span dir="ltr">wei</span> سے <span dir="ltr">eth</span> میں تبدیلی یہ ہے: <span dir="ltr">1 eth = 10¹⁸ wei</span>۔ لہذا اگر ہم <span dir="ltr">0xde0b6b3a7640000</span> کو اعشاریہ (decimal) میں تبدیل کریں تو ہمیں <span dir="ltr">1\*10¹⁸</span> ملتا ہے جو <span dir="ltr">1 eth</span> کے برابر ہے۔

شکر ہے! ہمارے تمام نقلی پیسے وہاں موجود ہیں! 🤑
### مرحلہ 5: میٹاماسک کو اپنے UI سے منسلک کریں {#step-5-connect-metamask-to-your-ui}

اب جب کہ ہمارا میٹاماسک والیٹ ترتیب دیا جا چکا ہے، آئیے اپنے dapp کو اس سے منسلک کریں!

#### `connectWallet` فنکشن {#the-connectwallet-function}

اپنی `interact.js` فائل میں، آئیے `connectWallet` فنکشن کو نافذ کریں، جسے ہم پھر اپنے `HelloWorld.js` جزو میں کال کر سکتے ہیں۔

آئیے `connectWallet` کو درج ذیل میں تبدیل کریں:

```javascript
// interact.js

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

تو کوڈ کا یہ بڑا بلاک دراصل کیا کرتا ہے؟

خیر، سب سے پہلے، یہ چیک کرتا ہے کہ آیا آپ کے براؤزر میں `window.ethereum` فعال ہے۔

`window.ethereum` ایک عالمی API ہے جسے میٹاماسک اور دیگر والیٹ فراہم کنندگان کے ذریعے انجیکٹ کیا جاتا ہے جو ویب سائٹس کو صارفین کے ایتھیریم اکاؤنٹس کی درخواست کرنے کی اجازت دیتا ہے۔ اگر منظور ہو جائے، تو یہ ان بلاک چینز سے ڈیٹا پڑھ سکتا ہے جن سے صارف منسلک ہے، اور تجویز کر سکتا ہے کہ صارف پیغامات اور ٹرانزیکشنز پر دستخط کرے۔ مزید معلومات کے لیے [میٹاماسک کی دستاویزات](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) دیکھیں!

اگر `window.ethereum` موجود _نہیں_ ہے، تو اس کا مطلب ہے کہ میٹاماسک انسٹال نہیں ہے۔ اس کے نتیجے میں ایک JSON آبجیکٹ واپس کیا جاتا ہے، جہاں واپس کیا گیا `address` ایک خالی سٹرنگ ہے، اور `status` JSX آبجیکٹ یہ بتاتا ہے کہ صارف کو میٹاماسک انسٹال کرنا چاہیے۔

اب اگر `window.ethereum` موجود _ہے_، تو تب چیزیں دلچسپ ہو جاتی ہیں۔

ایک try/catch لوپ کا استعمال کرتے ہوئے، ہم [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) کو کال کر کے میٹاماسک سے منسلک ہونے کی کوشش کریں گے۔ اس فنکشن کو کال کرنے سے براؤزر میں میٹاماسک کھل جائے گا، جس کے ذریعے صارف کو اپنا والیٹ آپ کے dapp سے منسلک کرنے کا کہا جائے گا۔

- اگر صارف منسلک ہونے کا انتخاب کرتا ہے، تو `method: "eth_requestAccounts"` ایک سرنی (array) واپس کرے گا جس میں صارف کے ان تمام اکاؤنٹس کے پتے شامل ہوں گے جو dapp سے منسلک ہوئے ہیں۔ مجموعی طور پر، ہمارا `connectWallet` فنکشن ایک JSON آبجیکٹ واپس کرے گا جس میں اس سرنی کا _پہلا_ `address` (لائن 9 دیکھیں) اور ایک `status` پیغام شامل ہوگا جو صارف کو سمارٹ کنٹریکٹ میں پیغام لکھنے کی ترغیب دیتا ہے۔
- اگر صارف کنکشن کو مسترد کر دیتا ہے، تو JSON آبجیکٹ میں واپس کیے گئے `address` کے لیے ایک خالی سٹرنگ اور ایک `status` پیغام شامل ہوگا جو یہ ظاہر کرتا ہے کہ صارف نے کنکشن کو مسترد کر دیا ہے۔

اب جب کہ ہم نے یہ `connectWallet` فنکشن لکھ لیا ہے، اگلا مرحلہ اسے اپنے `HelloWorld.js` جزو میں کال کرنا ہے۔

#### اپنے `HelloWorld.js` UI جزو میں `connectWallet` فنکشن شامل کریں {#add-the-connectwallet-function-to-your-helloworld-js-ui-component}

`HelloWorld.js` میں `connectWalletPressed` فنکشن پر جائیں، اور اسے درج ذیل میں اپ ڈیٹ کریں:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

غور کریں کہ ہماری زیادہ تر فعالیت کو `interact.js` فائل سے ہمارے `HelloWorld.js` جزو سے کیسے الگ (abstract) کیا گیا ہے؟ یہ اس لیے ہے تاکہ ہم M-V-C پیراڈائم کی تعمیل کر سکیں!

`connectWalletPressed` میں، ہم بس اپنے امپورٹ کردہ `connectWallet` فنکشن کو ایک await کال کرتے ہیں، اور اس کے جواب کا استعمال کرتے ہوئے، ہم اپنے `status` اور `walletAddress` متغیرات کو ان کے اسٹیٹ ہکس کے ذریعے اپ ڈیٹ کرتے ہیں۔

اب، آئیے دونوں فائلوں (`HelloWorld.js` اور `interact.js`) کو محفوظ کریں اور اب تک کے اپنے UI کی جانچ کریں۔

اپنے براؤزر کو [http://localhost:3000/](http://localhost:3000/) صفحہ پر کھولیں، اور صفحے کے اوپری دائیں جانب "Connect Wallet" بٹن دبائیں۔

اگر آپ کے پاس میٹاماسک انسٹال ہے، تو آپ کو اپنا والیٹ اپنے dapp سے منسلک کرنے کا کہا جائے گا۔ منسلک ہونے کی دعوت قبول کریں۔

آپ کو دیکھنا چاہیے کہ والیٹ کا بٹن اب ظاہر کرتا ہے کہ آپ کا پتہ منسلک ہے! زبردست 🔥

اس کے بعد، صفحہ کو ریفریش کرنے کی کوشش کریں... یہ عجیب ہے۔ ہمارا والیٹ بٹن ہمیں میٹاماسک کو منسلک کرنے کا کہہ رہا ہے، حالانکہ یہ پہلے سے ہی منسلک ہے...

تاہم، ڈرنے کی کوئی بات نہیں! ہم `getCurrentWalletConnected` کو نافذ کر کے آسانی سے اس مسئلے کو حل کر سکتے ہیں، جو یہ چیک کرے گا کہ آیا کوئی پتہ پہلے سے ہی ہمارے dapp سے منسلک ہے اور اس کے مطابق ہمارے UI کو اپ ڈیٹ کرے گا!

#### `getCurrentWalletConnected` فنکشن {#the-getcurrentwalletconnected-function}

`interact.js` فائل میں اپنے `getCurrentWalletConnected` فنکشن کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// interact.js

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

یہ کوڈ اس `connectWallet` فنکشن سے _بہت_ ملتا جلتا ہے جو ہم نے پچھلے مرحلے میں لکھا تھا۔

بنیادی فرق یہ ہے کہ `eth_requestAccounts` طریقہ کار کو کال کرنے کے بجائے، جو صارف کے لیے اپنا والیٹ منسلک کرنے کے لیے میٹاماسک کھولتا ہے، یہاں ہم `eth_accounts` طریقہ کار کو کال کرتے ہیں، جو بس ایک سرنی واپس کرتا ہے جس میں فی الحال ہمارے dapp سے منسلک میٹاماسک پتے شامل ہوتے ہیں۔

اس فنکشن کو کام کرتے ہوئے دیکھنے کے لیے، آئیے اسے اپنے `HelloWorld.js` جزو کے `useEffect` فنکشن میں کال کریں:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

غور کریں، ہم اپنے `walletAddress` اور `status` حالت کے متغیرات کو اپ ڈیٹ کرنے کے لیے `getCurrentWalletConnected` کو کی گئی اپنی کال کے جواب کا استعمال کرتے ہیں۔

اب جب کہ آپ نے یہ کوڈ شامل کر لیا ہے، آئیے اپنے براؤزر کی ونڈو کو ریفریش کرنے کی کوشش کریں۔

بہت خوب! بٹن کو یہ بتانا چاہیے کہ آپ منسلک ہیں، اور آپ کے منسلک والیٹ کے پتے کا پیش نظارہ دکھانا چاہیے - یہاں تک کہ آپ کے ریفریش کرنے کے بعد بھی!

#### `addWalletListener` کو نافذ کریں {#implement-addwalletlistener}

ہمارے dapp والیٹ سیٹ اپ کا آخری مرحلہ والیٹ سامع (listener) کو نافذ کرنا ہے تاکہ جب ہمارے والیٹ کی حالت تبدیل ہو، جیسے کہ جب صارف منقطع ہوتا ہے یا اکاؤنٹس تبدیل کرتا ہے، تو ہمارا UI اپ ڈیٹ ہو جائے۔

اپنی `HelloWorld.js` فائل میں، اپنے `addWalletListener` فنکشن کو درج ذیل کے طور پر تبدیل کریں:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

مجھے یقین ہے کہ اس مقام پر آپ کو یہ سمجھنے کے لیے ہماری مدد کی بھی ضرورت نہیں ہے کہ یہاں کیا ہو رہا ہے، لیکن مکمل ہونے کے مقاصد کے لیے، آئیے اسے جلدی سے تفصیل سے دیکھتے ہیں:

- سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا `window.ethereum` فعال ہے (یعنی، میٹاماسک انسٹال ہے)۔
  - اگر ایسا نہیں ہے، تو ہم بس اپنے `status` حالت کے متغیر کو ایک JSX سٹرنگ پر سیٹ کرتے ہیں جو صارف کو میٹاماسک انسٹال کرنے کی ترغیب دیتی ہے۔
  - اگر یہ فعال ہے، تو ہم لائن 3 پر سامع `window.ethereum.on("accountsChanged")` ترتیب دیتے ہیں جو میٹاماسک والیٹ میں حالت کی تبدیلیوں کو سنتا ہے، جس میں وہ وقت شامل ہے جب صارف dapp سے ایک اضافی اکاؤنٹ منسلک کرتا ہے، اکاؤنٹس تبدیل کرتا ہے، یا کسی اکاؤنٹ کو منقطع کرتا ہے۔ اگر کم از کم ایک اکاؤنٹ منسلک ہے، تو `walletAddress` حالت کا متغیر سامع کے ذریعے واپس کی گئی `accounts` سرنی میں پہلے اکاؤنٹ کے طور پر اپ ڈیٹ ہو جاتا ہے۔ بصورت دیگر، `walletAddress` کو ایک خالی سٹرنگ کے طور پر سیٹ کیا جاتا ہے۔

آخر میں، ہمیں اسے اپنے `useEffect` فنکشن میں کال کرنا چاہیے:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()

  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

اور بس! ہم نے کامیابی کے ساتھ اپنے والیٹ کی تمام فعالیت کی پروگرامنگ مکمل کر لی ہے! اب ہمارے آخری کام کی طرف: ہمارے سمارٹ کنٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرنا!

### مرحلہ 6: `updateMessage` فنکشن کو نافذ کریں {#step-6-implement-the-updatemessage-function}

ٹھیک ہے دوستو، ہم آخری مرحلے پر پہنچ گئے ہیں! آپ کی `interact.js` فائل کے `updateMessage` میں، ہم درج ذیل کام کرنے جا رہے ہیں:

1. اس بات کو یقینی بنائیں کہ جو پیغام ہم اپنے سمارٹ کنٹریکٹ میں شائع کرنا چاہتے ہیں وہ درست ہے
2. میٹاماسک کا استعمال کرتے ہوئے اپنی ٹرانزیکشن پر دستخط کریں
3. اس فنکشن کو اپنے `HelloWorld.js` فرنٹ اینڈ جزو سے کال کریں

اس میں زیادہ وقت نہیں لگے گا؛ آئیے اس dapp کو ختم کریں!

#### ان پٹ کی خرابیوں کو سنبھالنا {#input-error-handling}

فطری طور پر، فنکشن کے آغاز میں کسی قسم کی ان پٹ کی خرابیوں کو سنبھالنے (error handling) کا ہونا سمجھ میں آتا ہے۔

ہم چاہیں گے کہ ہمارا فنکشن جلد واپس آ جائے اگر کوئی میٹاماسک ایکسٹینشن انسٹال نہیں ہے، کوئی والیٹ منسلک نہیں ہے (یعنی، پاس کیا گیا `address` ایک خالی سٹرنگ ہے)، یا `message` ایک خالی سٹرنگ ہے۔ آئیے `updateMessage` میں درج ذیل ایرر ہینڈلنگ شامل کریں:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }
}
```

اب جب کہ اس میں مناسب ان پٹ ایرر ہینڈلنگ موجود ہے، اب وقت آگیا ہے کہ میٹاماسک کے ذریعے ٹرانزیکشن پر دستخط کیے جائیں!

#### اپنی ٹرانزیکشن پر دستخط کرنا {#signing-our-transaction}

اگر آپ پہلے ہی روایتی web3 ایتھیریم ٹرانزیکشنز کے ساتھ آرام دہ ہیں، تو جو کوڈ ہم آگے لکھیں گے وہ بہت مانوس ہوگا۔ اپنے ان پٹ ایرر ہینڈلنگ کوڈ کے نیچے، `updateMessage` میں درج ذیل شامل کریں:

```javascript
// interact.js

//ٹرانزیکشن کے پیرامیٹرز سیٹ کریں
const transactionParameters = {
  to: contractAddress, // کنٹریکٹ کی اشاعتوں کے علاوہ درکار ہے۔
  from: address, // صارف کے فعال پتہ سے مماثل ہونا چاہیے۔
  data: helloWorldContract.methods.update(message).encodeABI(),
}

//ٹرانزیکشن پر دستخط کریں
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    status: (
      <span>
        ✅{" "}
        <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
          View the status of your transaction on Etherscan!
        </a>
        <br />
        ℹ️ Once the transaction is verified by the network, the message will be
        updated automatically.
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

آئیے تفصیل سے دیکھتے ہیں کہ کیا ہو رہا ہے۔ سب سے پہلے، ہم اپنے ٹرانزیکشنز کے پیرامیٹرز ترتیب دیتے ہیں، جہاں:

- `to` وصول کنندہ کا پتہ (ہمارا سمارٹ کنٹریکٹ) بتاتا ہے
- `from` ٹرانزیکشن پر دستخط کرنے والے کو بتاتا ہے، وہ `address` متغیر جو ہم نے اپنے فنکشن میں پاس کیا تھا
- `data` میں ہمارے Hello World سمارٹ کنٹریکٹ کے `update` طریقہ کار کی کال شامل ہے، جو ہمارے `message` سٹرنگ متغیر کو ان پٹ کے طور پر وصول کرتی ہے

پھر، ہم ایک await کال کرتے ہیں، `window.ethereum.request`، جہاں ہم میٹاماسک سے ٹرانزیکشن پر دستخط کرنے کو کہتے ہیں۔ غور کریں، لائنز 11 اور 12 پر، ہم اپنا eth طریقہ کار، `eth_sendTransaction` بتا رہے ہیں اور اپنا `transactionParameters` پاس کر رہے ہیں۔

اس مقام پر، میٹاماسک براؤزر میں کھل جائے گا، اور صارف کو ٹرانزیکشن پر دستخط کرنے یا اسے مسترد کرنے کا کہے گا۔

- اگر ٹرانزیکشن کامیاب ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `status` JSX سٹرنگ صارف کو اپنی ٹرانزیکشن کے بارے میں مزید معلومات کے لیے Etherscan چیک کرنے کی ترغیب دیتی ہے۔
- اگر ٹرانزیکشن ناکام ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `status` سٹرنگ خرابی کا پیغام بتاتی ہے۔

مجموعی طور پر، ہمارا `updateMessage` فنکشن اس طرح دکھنا چاہیے:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //ان پٹ ایرر ہینڈلنگ
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ Your message cannot be an empty string.",
    }
  }

  //ٹرانزیکشن کے پیرامیٹرز سیٹ کریں
  const transactionParameters = {
    to: contractAddress, // کنٹریکٹ کی اشاعتوں کے علاوہ درکار ہے۔
    from: address, // صارف کے فعال پتہ سے مماثل ہونا چاہیے۔
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  //ٹرانزیکشن پر دستخط کریں
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{" "}
          <a target="_blank" href={`https://goerli.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: "😥 " + error.message,
    }
  }
}
```

آخر میں، ہمیں اپنے `updateMessage` فنکشن کو اپنے `HelloWorld.js` جزو سے منسلک کرنے کی ضرورت ہے۔

#### `updateMessage` کو `HelloWorld.js` فرنٹ اینڈ سے منسلک کریں {#connect-updatemessage-to-the-helloworld-js-frontend}

ہمارے `onUpdatePressed` فنکشن کو امپورٹ کردہ `updateMessage` فنکشن کو ایک await کال کرنی چاہیے اور `status` حالت کے متغیر کو تبدیل کرنا چاہیے تاکہ یہ ظاہر ہو سکے کہ ہماری ٹرانزیکشن کامیاب ہوئی یا ناکام:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

یہ بہت صاف اور سادہ ہے۔ اور اندازہ لگائیں کیا... آپ کا DAPP مکمل ہو گیا ہے!!!

آگے بڑھیں اور **Update** بٹن کی جانچ کریں!

### اپنا خود کا کسٹم dapp بنائیں {#make-your-own-custom-dapp}

واہ، آپ ٹیوٹوریل کے اختتام تک پہنچ گئے! خلاصہ کرنے کے لیے، آپ نے سیکھا کہ کیسے:

- ایک میٹاماسک والیٹ کو اپنے dapp پروجیکٹ سے منسلک کریں
- [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) API کا استعمال کرتے ہوئے اپنے سمارٹ کنٹریکٹ سے ڈیٹا پڑھیں
- میٹاماسک کا استعمال کرتے ہوئے ایتھیریم ٹرانزیکشنز پر دستخط کریں

اب آپ اس ٹیوٹوریل سے حاصل کردہ مہارتوں کو لاگو کر کے اپنا خود کا کسٹم dapp پروجیکٹ بنانے کے لیے پوری طرح لیس ہیں! ہمیشہ کی طرح، اگر آپ کے کوئی سوالات ہیں، تو [Alchemy ڈسکارڈ](https://discord.gg/gWuC7zB) میں مدد کے لیے ہم سے رابطہ کرنے میں ہچکچاہٹ محسوس نہ کریں۔ 🧙‍♂️

ایک بار جب آپ یہ ٹیوٹوریل مکمل کر لیں، تو ہمیں بتائیں کہ آپ کا تجربہ کیسا رہا یا اگر آپ کی کوئی رائے ہے تو ہمیں ٹوئٹر پر [@alchemyplatform](https://twitter.com/AlchemyPlatform) ٹیگ کر کے بتائیں!
