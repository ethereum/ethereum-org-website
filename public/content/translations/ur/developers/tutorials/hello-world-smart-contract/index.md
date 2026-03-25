---
title: "ابتدائی افراد کے لیے ہیلو ورلڈ اسمارٹ کانٹریکٹ"
description: "ایتھیریم پر ایک سادہ اسمارٹ کانٹریکٹ لکھنے اور تعینات کرنے کے بارے میں تعارفی ٹیوٹوریل۔"
author: "elanh"
tags: ["Solidity", "Hardhat", "Alchemy", "اسمارٹ کانٹریکٹس", "تعیناتی"]
skill: beginner
breadcrumb: "ہیلو ورلڈ کانٹریکٹ"
lang: ur
published: 2021-03-31
---

اگر آپ بلاک چین ڈیولپمنٹ میں نئے ہیں اور نہیں جانتے کہ کہاں سے شروع کرنا ہے، یا اگر آپ صرف یہ سمجھنا چاہتے ہیں کہ اسمارٹ کانٹریکٹس کو کیسے تعینات کیا جائے اور ان کے ساتھ کیسے تعامل کیا جائے، تو یہ گائیڈ آپ کے لیے ہے۔ ہم ایک ورچوئل والیٹ [MetaMask](https://metamask.io/)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org/)، اور [Alchemy](https://www.alchemy.com/eth) کا استعمال کرتے ہوئے Sepolia ٹیسٹ نیٹ ورک پر ایک سادہ اسمارٹ کانٹریکٹ بنانے اور تعینات کرنے کے عمل سے گزریں گے (اگر آپ کو ابھی تک ان میں سے کسی کا مطلب سمجھ نہیں آیا تو پریشان نہ ہوں، ہم اس کی وضاحت کریں گے)۔

اس ٹیوٹوریل کے [حصہ 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) میں ہم دیکھیں گے کہ ایک بار یہاں تعینات ہونے کے بعد ہم اپنے اسمارٹ کانٹریکٹ کے ساتھ کیسے تعامل کر سکتے ہیں، اور [حصہ 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) میں ہم اس بات کا احاطہ کریں گے کہ اسے Etherscan پر کیسے شائع کیا جائے۔

اگر آپ کے کسی بھی موقع پر سوالات ہوں تو بلا جھجھک [Alchemy Discord](https://discord.gg/gWuC7zB) میں رابطہ کریں!

## مرحلہ 1: ایتھیریم نیٹ ورک سے جڑیں {#step-1}

ایتھیریم چین پر درخواستیں بھیجنے کے کئی طریقے ہیں۔ سادگی کے لیے، ہم Alchemy پر ایک مفت اکاؤنٹ استعمال کریں گے، جو کہ ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں اپنے نوڈز چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی اجازت دیتا ہے۔ اس پلیٹ فارم میں نگرانی اور تجزیات کے لیے ڈیولپر ٹولز بھی موجود ہیں جن کا ہم اس ٹیوٹوریل میں فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہمارے اسمارٹ کانٹریکٹ کی تعیناتی کے پس منظر میں کیا ہو رہا ہے۔ اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو [آپ یہاں مفت سائن اپ کر سکتے ہیں](https://dashboard.alchemy.com/signup)۔

## مرحلہ 2: اپنی ایپ (اور API کلید) بنائیں {#step-2}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر API کلید تیار کر سکتے ہیں۔ یہ ہمیں Sepolia ٹیسٹ نیٹ ورک پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹس سے واقف نہیں ہیں، تو [یہ صفحہ](/developers/docs/networks/) دیکھیں۔

1. اپنے Alchemy ڈیش بورڈ میں نیویگیشن بار میں "Select an app" کو منتخب کر کے اور "Create new app" پر کلک کر کے "Create new app" صفحہ پر جائیں۔

![ہیلو ورلڈ ایپ بنائیں](./hello-world-create-app.png)

2. اپنی ایپ کا نام "Hello World" رکھیں، ایک مختصر تفصیل فراہم کریں، اور استعمال کا کیس منتخب کریں، مثلاً، "Infra & Tooling"۔ اس کے بعد، "Ethereum" تلاش کریں اور نیٹ ورک منتخب کریں۔

![ایپ ویو ہیلو ورلڈ بنائیں](./create-app-view-hello-world.png)

3. آگے بڑھنے کے لیے "Next" پر کلک کریں، پھر "Create app" اور بس! آپ کی ایپ نیویگیشن بار کے ڈراپ ڈاؤن مینو میں ظاہر ہونی چاہیے، جس میں کاپی کرنے کے لیے ایک API کلید دستیاب ہوگی۔

## مرحلہ 3: ایک ایتھیریم اکاؤنٹ (ایڈریس) بنائیں {#step-3}

ہمیں ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ ایڈریس کو منظم کرنے کے لیے استعمال کیا جاتا ہے۔ [ٹرانزیکشنز](/developers/docs/transactions/) کے بارے میں مزید جانیں۔

آپ MetaMask ڈاؤن لوڈ کر سکتے ہیں اور [یہاں](https://metamask.io/download) مفت میں ایک ایتھیریم اکاؤنٹ بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ ہے، تو یقینی بنائیں کہ نیٹ ورک ڈراپ ڈاؤن مینو کا استعمال کرتے ہوئے "Sepolia" ٹیسٹ نیٹ ورک پر سوئچ کریں (تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں)۔

اگر آپ کو Sepolia فہرست میں نظر نہیں آتا، تو مینو میں جائیں، پھر Advanced میں جائیں اور نیچے اسکرول کر کے "Show test networks" کو آن کریں۔ نیٹ ورک کے انتخاب کے مینو میں، ٹیسٹ نیٹس کی فہرست تلاش کرنے کے لیے "Custom" ٹیب کا انتخاب کریں اور "Sepolia" کو منتخب کریں۔

![metamask sepolia کی مثال](./metamask-sepolia-example.png)

## مرحلہ 4: فاسٹ (faucet) سے ایتھر شامل کریں {#step-4}

اپنے اسمارٹ کانٹریکٹ کو ٹیسٹ نیٹ ورک پر تعینات کرنے کے لیے، ہمیں کچھ نقلی ETH کی ضرورت ہوگی۔ Sepolia ETH حاصل کرنے کے لیے آپ مختلف فاسٹس کی فہرست دیکھنے کے لیے [Sepolia نیٹ ورک کی تفصیلات](/developers/docs/networks/#sepolia) پر جا سکتے ہیں۔ اگر ایک کام نہیں کرتا، تو دوسرا آزمائیں کیونکہ وہ بعض اوقات خالی ہو سکتے ہیں۔ نیٹ ورک ٹریفک کی وجہ سے آپ کو اپنا نقلی ETH وصول کرنے میں کچھ وقت لگ سکتا ہے۔ آپ کو جلد ہی اپنے MetaMask اکاؤنٹ میں ETH نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#step-5}

یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [Alchemy کے کمپوزر ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود ETH کی رقم واپس کرے گا۔ اپنا MetaMask اکاؤنٹ ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **نوٹ:** یہ نتیجہ wei میں ہے نہ کہ ETH میں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے ETH میں تبدیلی یہ ہے: <span dir="ltr">1 eth = 10<sup>18</sup> wei</span>۔ لہذا اگر ہم 0x2B5E3AF16B1880000 کو اعشاریہ میں تبدیل کریں تو ہمیں <span dir="ltr">5\*10¹⁸</span> ملتا ہے جو 5 ETH کے برابر ہے۔
>
> شکر ہے! ہماری نقلی رقم پوری موجود ہے <Emoji text=":money_mouth_face:" size={1} />۔

## مرحلہ 6: ہمارے پروجیکٹ کو شروع کریں {#step-6}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

```
mkdir hello-world
cd hello-world
```

اب جب کہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے `npm init` کا استعمال کریں گے۔ اگر آپ کے پاس پہلے سے npm انسٹال نہیں ہے، تو [ان ہدایات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) پر عمل کریں (ہمیں Node.js کی بھی ضرورت ہوگی لہذا اسے بھی ڈاؤن لوڈ کریں!)۔

```
npm init
```

اس سے کوئی خاص فرق نہیں پڑتا کہ آپ انسٹالیشن کے سوالات کا کیا جواب دیتے ہیں، حوالہ کے لیے ہم نے اسے اس طرح کیا ہے:

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
     "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

package.json کو منظور کریں اور ہم تیار ہیں!

## مرحلہ 7: [Hardhat](https://hardhat.org/getting-started/#overview) ڈاؤن لوڈ کریں {#step-7}

Hardhat آپ کے ایتھیریم سافٹ ویئر کو مرتب (compile)، تعینات، ٹیسٹ، اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ لائیو چین پر تعینات کرنے سے پہلے مقامی طور پر اسمارٹ کانٹریکٹس اور dapps بناتے وقت ڈیولپرز کی مدد کرتا ہے۔

ہمارے `hello-world` پروجیکٹ کے اندر چلائیں:

```
npm install --save-dev hardhat
```

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

## مرحلہ 8: Hardhat پروجیکٹ بنائیں {#step-8}

ہمارے پروجیکٹ فولڈر کے اندر چلائیں:

```
npx hardhat
```

اس کے بعد آپ کو ایک خوش آمدید کا پیغام اور یہ منتخب کرنے کا آپشن نظر آنا چاہیے کہ آپ کیا کرنا چاہتے ہیں۔ "create an empty hardhat.config.js" کو منتخب کریں:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍?

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

یہ ہمارے لیے ایک `hardhat.config.js` فائل تیار کرے گا جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#step-9}

اپنے پروجیکٹ کو منظم رکھنے کے لیے ہم دو نئے فولڈرز بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

```
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنی ہیلو ورلڈ اسمارٹ کانٹریکٹ کوڈ فائل رکھیں گے
- `scripts/` وہ جگہ ہے جہاں ہم اپنے کانٹریکٹ کو تعینات کرنے اور اس کے ساتھ تعامل کرنے کے لیے اسکرپٹس رکھیں گے

## مرحلہ 10: اپنا کانٹریکٹ لکھیں {#step-10}

آپ شاید خود سے پوچھ رہے ہوں گے کہ ہم آخر کوڈ کب لکھنے والے ہیں؟؟ خیر، ہم یہاں ہیں، مرحلہ 10 پر۔

اپنے پسندیدہ ایڈیٹر میں hello-world پروجیکٹ کھولیں (ہمیں [VSCode](https://code.visualstudio.com/) پسند ہے)۔ اسمارٹ کانٹریکٹس Solidity نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا HelloWorld.sol اسمارٹ کانٹریکٹ لکھنے کے لیے استعمال کریں گے۔

1. "contracts" فولڈر میں جائیں اور HelloWorld.sol نامی ایک نئی فائل بنائیں۔
2. ذیل میں ایتھیریم فاؤنڈیشن کی جانب سے ایک نمونہ ہیلو ورلڈ اسمارٹ کانٹریکٹ ہے جسے ہم اس ٹیوٹوریل کے لیے استعمال کریں گے۔ ذیل کے مواد کو کاپی کر کے اپنی HelloWorld.sol فائل میں پیسٹ کریں، اور یہ سمجھنے کے لیے تبصرے ضرور پڑھیں کہ یہ کانٹریکٹ کیا کرتا ہے:

```solidity
// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، سولیڈیٹی (Solidity) کا ورژن متعین کرتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` کے نام سے ایک کنٹریکٹ کی تعریف کرتا ہے۔
// کنٹریکٹ فنکشنز اور ڈیٹا (اس کی اسٹیٹ) کا مجموعہ ہوتا ہے۔ ایک بار ڈیپلائے ہونے کے بعد، کنٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص ایڈریس پر موجود ہوتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` ٹائپ کے ایک اسٹیٹ ویری ایبل `message` کا اعلان کرتا ہے۔
   // اسٹیٹ ویری ایبلز وہ ویری ایبلز ہوتے ہیں جن کی ویلیوز مستقل طور پر کنٹریکٹ اسٹوریج میں محفوظ ہوتی ہیں۔ `public` کی ورڈ ویری ایبلز کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک ایسا فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس ویلیو تک رسائی کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس بیسڈ آبجیکٹ اورینٹڈ زبانوں کی طرح، کنسٹرکٹر ایک خاص فنکشن ہوتا ہے جو صرف کنٹریکٹ بننے پر ہی ایگزیکیوٹ ہوتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو انیشلائز کرنے کے لیے کیا جاتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک سٹرنگ آرگومنٹ `initMessage` قبول کرتا ہے اور اس کی ویلیو کو کنٹریکٹ کے `message` اسٹوریج ویری ایبل میں سیٹ کرتا ہے۔
      message = initMessage;
   }

   // ایک پبلک فنکشن جو سٹرنگ آرگومنٹ قبول کرتا ہے اور `message` اسٹوریج ویری ایبل کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

یہ ایک انتہائی سادہ اسمارٹ کانٹریکٹ ہے جو بننے پر ایک پیغام محفوظ کرتا ہے اور `update` فنکشن کو کال کر کے اسے اپ ڈیٹ کیا جا سکتا ہے۔

## مرحلہ 11: MetaMask اور Alchemy کو اپنے پروجیکٹ سے جوڑیں {#step-11}

ہم نے ایک MetaMask والیٹ، Alchemy اکاؤنٹ بنا لیا ہے، اور اپنا اسمارٹ کانٹریکٹ لکھ لیا ہے، اب وقت آ گیا ہے کہ ان تینوں کو آپس میں جوڑیں۔

آپ کے ورچوئل والیٹ سے بھیجی جانے والی ہر ٹرانزیکشن کے لیے آپ کی منفرد نجی کلید (private key) کا استعمال کرتے ہوئے دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی نجی کلید (اور Alchemy API کلید) کو محفوظ طریقے سے ایک انوائرنمنٹ فائل میں اسٹور کر سکتے ہیں۔

> ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائرکٹری میں dotenv پیکیج انسٹال کریں:

```
npm install dotenv --save
```

پھر، ہمارے پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی MetaMask نجی کلید اور HTTP Alchemy API URL شامل کریں۔

- اپنی نجی کلید ایکسپورٹ کرنے کے لیے [ان ہدایات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) پر عمل کریں
- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں

![alchemy api کلید حاصل کریں](./get-alchemy-api-key.png)

Alchemy API URL کاپی کریں

آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

انہیں دراصل اپنے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 پر اپنی `hardhat.config.js` فائل میں ان متغیرات (variables) کا حوالہ دیں گے۔

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> کو کمٹ (commit) نہ کریں! براہ کرم یقینی بنائیں کہ اپنی <code>.env</code> فائل کو کبھی بھی کسی کے ساتھ شیئر یا ظاہر نہ کریں، کیونکہ ایسا کرنے سے آپ اپنے رازوں کو خطرے میں ڈال رہے ہیں۔ اگر آپ ورژن کنٹرول استعمال کر رہے ہیں، تو اپنی <code>.env</code> کو ایک <a href="https://git-scm.com/docs/gitignore">gitignore</a> فائل میں شامل کریں۔
</AlertDescription>
</AlertContent>
</Alert>

## مرحلہ 12: Ethers.js انسٹال کریں {#step-12-install-ethersjs}

Ethers.js ایک لائبریری ہے جو [معیاری JSON-RPC طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر ایتھیریم کے ساتھ تعامل کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

Hardhat اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو مربوط کرنا انتہائی آسان بناتا ہے۔ ہم کانٹریکٹ کی تعیناتی کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) کا فائدہ اٹھائیں گے ([Ethers.js](https://github.com/ethers-io/ethers.js/) میں کانٹریکٹ کی تعیناتی کے کچھ انتہائی صاف طریقے موجود ہیں)۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

ہمیں اگلے مرحلے میں اپنی `hardhat.config.js` میں بھی ethers کی ضرورت ہوگی۔

## مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#step-13-update-hardhatconfigjs}

ہم نے اب تک کئی انحصار (dependencies) اور پلگ انز شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اپ ڈیٹ کریں تاکہ یہ اس طرح نظر آئے:

```
require('dotenv').config();

require("@nomiclabs/hardhat-ethers");
const { API_URL, PRIVATE_KEY } = process.env;

/**
* @type import('hardhat/config').HardhatUserConfig
*/
module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "sepolia",
   networks: {
      hardhat: {},
      sepolia: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

## مرحلہ 14: اپنا کانٹریکٹ مرتب (compile) کریں {#step-14-compile-our-contracts}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کانٹریکٹ کو مرتب کریں۔ `compile` ٹاسک بلٹ ان hardhat ٹاسکس میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```
npx hardhat compile
```

آپ کو `SPDX license identifier not provided in source file` کے بارے میں ایک انتباہ مل سکتا ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک لگ رہا ہوگا! اگر نہیں، تو آپ ہمیشہ [Alchemy discord](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

## مرحلہ 15: اپنی تعیناتی (deploy) اسکرپٹ لکھیں {#step-15-write-our-deploy-scripts}

اب جب کہ ہمارا کانٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آ گیا ہے کہ ہم اپنی کانٹریکٹ تعیناتی اسکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، اور اس میں درج ذیل مواد شامل کریں:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat اپنے [کانٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں یہ بتانے کا ایک حیرت انگیز کام کرتا ہے کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتوں کو اپنایا ہے۔

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js میں ایک `ContractFactory` ایک تجرید (abstraction) ہے جسے نئے اسمارٹ کانٹریکٹس کو تعینات کرنے کے لیے استعمال کیا جاتا ہے، لہذا یہاں `HelloWorld` ہمارے ہیلو ورلڈ کانٹریکٹ کی مثالوں (instances) کے لیے ایک فیکٹری ہے۔ `hardhat-ethers` پلگ ان کا استعمال کرتے وقت `ContractFactory` اور `Contract` کی مثالیں پہلے سے طے شدہ طور پر پہلے دستخط کنندہ (signer) سے جڑی ہوتی ہیں۔

```
const hello_world = await HelloWorld.deploy();
```

`ContractFactory` پر `deploy()` کو کال کرنے سے تعیناتی شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` میں حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے اسمارٹ کانٹریکٹ کے ہر فنکشن کے لیے ایک طریقہ (method) موجود ہے۔

## مرحلہ 16: اپنا کانٹریکٹ تعینات کریں {#step-16-deploy-our-contract}

ہم بالآخر اپنا اسمارٹ کانٹریکٹ تعینات کرنے کے لیے تیار ہیں! کمانڈ لائن پر جائیں اور چلائیں:

```
npx hardhat run scripts/deploy.js --network sepolia
```

اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے:

```
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

اگر ہم [Sepolia etherscan](https://sepolia.etherscan.io/) پر جائیں اور اپنا کانٹریکٹ ایڈریس تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی کے ساتھ تعینات کر دیا گیا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![etherscan کانٹریکٹ](./etherscan-contract.png)

`From` ایڈریس آپ کے MetaMask اکاؤنٹ ایڈریس سے مماثل ہونا چاہیے اور To ایڈریس میں "Contract Creation" لکھا ہوگا لیکن اگر ہم ٹرانزیکشن پر کلک کریں تو ہمیں `To` فیلڈ میں اپنا کانٹریکٹ ایڈریس نظر آئے گا:

![etherscan ٹرانزیکشن](./etherscan-transaction.png)

مبارک ہو! آپ نے ابھی ایتھیریم چین پر ایک اسمارٹ کانٹریکٹ تعینات کیا ہے 🎉

یہ سمجھنے کے لیے کہ پس منظر میں کیا ہو رہا ہے، آئیے اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemyapi.io/explorer) میں Explorer ٹیب پر جائیں۔ اگر آپ کے پاس متعدد Alchemy ایپس ہیں تو یقینی بنائیں کہ ایپ کے لحاظ سے فلٹر کریں اور "Hello World" کو منتخب کریں۔
![ہیلو ورلڈ ایکسپلورر](./hello-world-explorer.png)

یہاں آپ کو مٹھی بھر JSON-RPC کالز نظر آئیں گی جو Hardhat/Ethers نے ہمارے لیے پس منظر میں کی تھیں جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں ذکر کرنے کے لیے دو اہم کالز [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction) ہیں، جو دراصل ہمارے کانٹریکٹ کو Sepolia چین پر لکھنے کی درخواست ہے، اور [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز کے وقت ایک عام پیٹرن)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) پر یہ ٹیوٹوریل دیکھیں۔

اس ٹیوٹوریل کے حصہ 1 کے لیے بس اتنا ہی، حصہ 2 میں ہم دراصل اپنا ابتدائی پیغام اپ ڈیٹ کر کے [اپنے اسمارٹ کانٹریکٹ کے ساتھ تعامل کریں گے](https://www.alchemy.com/docs/interacting-with-a-smart-contract)، اور حصہ 3 میں ہم [اپنا اسمارٹ کانٹریکٹ Etherscan پر شائع کریں گے](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) تاکہ سب کو معلوم ہو سکے کہ اس کے ساتھ کیسے تعامل کرنا ہے۔

**Alchemy کے بارے میں مزید جاننا چاہتے ہیں؟ ہماری [ویب سائٹ](https://www.alchemy.com/eth) دیکھیں۔ کبھی کوئی اپ ڈیٹ نہیں چھوڑنا چاہتے؟ [یہاں](https://www.alchemy.com/newsletter) ہمارے نیوز لیٹر کو سبسکرائب کریں! ہمارے [Discord](https://discord.gg/u72VCg3) میں بھی شامل ہونا یقینی بنائیں۔**۔