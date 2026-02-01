---
title: "ابتدائی افراد کے لیے ہیلو ورلڈ اسمارٹ کنٹریکٹ"
description: "Ethereum پر ایک سادہ اسمارٹ کنٹریکٹ لکھنے اور اسے ڈیپلائے کرنے کے بارے میں تعارفی ٹیوٹوریل۔"
author: "elanh"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "اسمارٹ معاہدات",
    "تعینات کرنا"
  ]
skill: beginner
lang: ur-in
published: 2021-03-31
---

اگر آپ بلاک چین ڈیولپمنٹ میں نئے ہیں اور نہیں جانتے کہ کہاں سے شروع کریں، یا اگر آپ صرف یہ سمجھنا چاہتے ہیں کہ اسمارٹ کنٹریکٹس کو کیسے ڈیپلائے اور ان کے ساتھ کیسے انٹریکٹ کیا جائے، تو یہ گائیڈ آپ کے لیے ہے۔ ہم ایک ورچوئل والیٹ [MetaMask](https://metamask.io/)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org/)، اور [Alchemy](https://www.alchemy.com/eth) کا استعمال کرتے ہوئے Sepolia ٹیسٹ نیٹ ورک پر ایک سادہ اسمارٹ کنٹریکٹ بنانے اور اسے ڈیپلائے کرنے کے عمل سے گزریں گے (اگر آپ ابھی تک یہ نہیں سمجھ پائے ہیں کہ ان میں سے کسی کا کیا مطلب ہے تو فکر نہ کریں، ہم اس کی وضاحت کریں گے)۔

اس ٹیوٹوریل کے [حصہ 2](https://docs.alchemy.com/docs/interacting-with-a-smart-contract) میں ہم یہ دیکھیں گے کہ ایک بار یہاں ڈیپلائے ہونے کے بعد ہم اپنے اسمارٹ کنٹریکٹ کے ساتھ کیسے انٹریکٹ کر سکتے ہیں، اور [حصہ 3](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) میں ہم اسے Etherscan پر کیسے پبلش کرنا ہے اس پر بات کریں گے۔

اگر کسی بھی وقت آپ کے سوالات ہوں تو [Alchemy Discord](https://discord.gg/gWuC7zB) میں بلا جھجھک رابطہ کریں!

## مرحلہ 1: Ethereum نیٹ ورک سے جڑیں {#step-1}

Ethereum چین سے درخواستیں کرنے کے بہت سے طریقے ہیں۔ سادگی کے لیے، ہم Alchemy پر ایک مفت اکاؤنٹ استعمال کریں گے، جو ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں اپنے نوڈس چلائے بغیر Ethereum چین کے ساتھ بات چیت کرنے کی اجازت دیتا ہے۔ اس پلیٹ فارم میں نگرانی اور تجزیات کے لیے ڈیولپر ٹولز بھی ہیں جن سے ہم اس ٹیوٹوریل میں فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہمارے اسمارٹ کنٹریکٹ کی ڈیپلائمنٹ میں پس پردہ کیا ہو رہا ہے۔ اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو [آپ یہاں مفت میں سائن اپ کر سکتے ہیں](https://dashboard.alchemy.com/signup)۔

## مرحلہ 2: اپنی ایپ (اور API کلید) بنائیں {#step-2}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیں، تو آپ ایک ایپ بنا کر API کلید تیار کر سکتے ہیں۔ یہ ہمیں Sepolia ٹیسٹ نیٹ ورک سے درخواستیں کرنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹس سے واقف نہیں ہیں، تو [یہ صفحہ](/developers/docs/networks/) دیکھیں۔

1. نیو بار میں "Select an app" منتخب کرکے اور "Create new app" پر کلک کرکے اپنے Alchemy ڈیش بورڈ میں "Create new app" صفحہ پر جائیں۔

![Hello world create app](./hello-world-create-app.png)

2. اپنی ایپ کو ”Hello World“ کا نام دیں، ایک مختصر تفصیل پیش کریں، اور ایک یوز کیس منتخب کریں، مثلاً، "Infra & Tooling"۔ اگلا، "Ethereum" تلاش کریں اور نیٹ ورک منتخب کریں۔

![create app view hello world](./create-app-view-hello-world.png)

3. آگے بڑھنے کے لیے "Next" پر کلک کریں، پھر ”Create app“ اور بس! آپ کا کام ہو گیا۔ آپ کی ایپ نیو بار ڈراپ ڈاؤن مینو میں ظاہر ہونی چاہیے، جس میں کاپی کرنے کے لیے ایک API کلید دستیاب ہوگی۔

## مرحلہ 3: ایک Ethereum اکاؤنٹ (ایڈریس) بنائیں {#step-3}

ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ہمیں ایک Ethereum اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جو آپ کے Ethereum اکاؤنٹ ایڈریس کو منظم کرنے کے لیے استعمال ہوتا ہے۔ [لین دین](/developers/docs/transactions/) پر مزید۔

آپ [یہاں](https://metamask.io/download) سے MetaMask ڈاؤن لوڈ کر سکتے ہیں اور مفت میں ایک Ethereum اکاؤنٹ بنا سکتے ہیں۔ جب آپ ایک اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی ایک اکاؤنٹ ہے، تو یقینی بنائیں کہ آپ نیٹ ورک ڈراپ ڈاؤن مینو کا استعمال کرکے "Sepolia" ٹیسٹ نیٹ ورک پر سوئچ کر لیں (تاکہ ہم حقیقی رقم سے نمٹ نہ رہے ہوں)۔

اگر آپ کو فہرست میں Sepolia نظر نہیں آتا، تو مینو میں جائیں، پھر ایڈوانسڈ میں جائیں اور "Show test networks" کو آن کرنے کے لیے نیچے اسکرول کریں۔ نیٹ ورک سلیکشن مینو میں، ٹیسٹ نیٹس کی فہرست تلاش کرنے کے لیے "Custom" ٹیب کا انتخاب کریں اور "Sepolia" کو منتخب کریں۔

![metamask sepolia example](./metamask-sepolia-example.png)

## مرحلہ 4: ایک فوسیٹ سے ایتھر شامل کریں {#step-4}

اپنے اسمارٹ کنٹریکٹ کو ٹیسٹ نیٹ ورک پر ڈیپلائے کرنے کے لیے، ہمیں کچھ جعلی Eth کی ضرورت ہوگی۔ Sepolia ETH حاصل کرنے کے لیے آپ مختلف فوسیٹس کی فہرست دیکھنے کے لیے [Sepolia نیٹ ورک کی تفصیلات](/developers/docs/networks/#sepolia) پر جا سکتے ہیں۔ اگر کوئی کام نہ کرے تو دوسرا آزمائیں کیونکہ وہ کبھی کبھی خالی ہو سکتے ہیں۔ نیٹ ورک ٹریفک کی وجہ سے آپ کو اپنا جعلی ETH حاصل کرنے میں کچھ وقت لگ سکتا ہے۔ آپ کو جلد ہی اپنے Metamask اکاؤنٹ میں ETH نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#step-5}

یہ یقینی بنانے کے لیے کہ ہمارا بیلنس وہاں ہے، آئیے [Alchemy کے کمپوزر ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [eth_getBalance](/developers/docs/apis/json-rpc/#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں ETH کی رقم واپس کرے گا۔ اپنے MetaMask اکاؤنٹ کا ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> **نوٹ:** یہ نتیجہ ETH میں نہیں بلکہ wei میں ہے۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے ETH میں تبدیلی یہ ہے: 1 eth = 10<sup>18</sup> wei۔ لہذا اگر ہم 0x2B5E3AF16B1880000 کو ڈیسیمل میں تبدیل کریں تو ہمیں 5\*10¹⁸ ملتا ہے جو 5 ETH کے برابر ہے۔
>
> اف! ہمارے جعلی پیسے سب وہاں ہیں <Emoji text=":money_mouth_face:" size={1} />۔

## مرحلہ 6: ہمارے پروجیکٹ کو شروع کریں {#step-6}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

```
mkdir hello-world
cd hello-world
```

اب جب کہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے `npm init` استعمال کریں گے۔ اگر آپ کے پاس پہلے سے npm انسٹال نہیں ہے، تو [ان ہدایات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) پر عمل کریں (ہمیں Node.js کی بھی ضرورت ہوگی لہذا اسے بھی ڈاؤن لوڈ کریں!)۔

```
npm init
```

اس سے کوئی فرق نہیں پڑتا کہ آپ انسٹالیشن کے سوالات کا جواب کیسے دیتے ہیں، یہاں حوالہ کے لیے ہم نے اسے کیسے کیا:

```
پیکیج کا نام: (hello-world)
ورژن: (1.0.0)
تفصیل: hello world smart contract
اینٹری پوائنٹ: (index.js)
ٹیسٹ کمانڈ:
گٹ ریپوزٹری:
کلیدی الفاظ:
مصنف:
لائسنس: (ISC)
/Users/.../.../.../hello-world/package.json میں لکھنے کے بارے میں:

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

Hardhat آپ کے Ethereum سافٹ ویئر کو کمپائل، ڈیپلوئے، ٹیسٹ اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ ڈیولپرز کو لائیو چین پر ڈیپلوئے کرنے سے پہلے مقامی طور پر اسمارٹ کنٹریکٹس اور dapps بنانے میں مدد کرتا ہے۔

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

پھر آپ کو ایک خوش آمدیدی پیغام اور یہ منتخب کرنے کا آپشن نظر آئے گا کہ آپ کیا کرنا چاہتے ہیں۔ “create an empty hardhat.config.js” منتخب کریں:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Hardhat v2.0.11 میں خوش آمدید 👷‍?

آپ کیا کرنا چاہتے ہیں؟ …
ایک نمونہ پروجیکٹ بنائیں
❯ ایک خالی hardhat.config.js بنائیں
باہر نکلیں
```

یہ ہمارے لیے ایک `hardhat.config.js` فائل بنائے گا جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#step-9}

اپنے پروجیکٹ کو منظم رکھنے کے لیے ہم دو نئے فولڈر بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

```
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنی ہیلو ورلڈ اسمارٹ کنٹریکٹ کوڈ فائل رکھیں گے۔
- `scripts/` وہ جگہ ہے جہاں ہم اپنے کنٹریکٹ کو ڈیپلائے کرنے اور اس کے ساتھ انٹریکٹ کرنے کے لیے اسکرپٹس رکھیں گے۔

## مرحلہ 10: ہمارا کنٹریکٹ لکھیں {#step-10}

آپ خود سے پوچھ رہے ہوں گے کہ آخر ہم کوڈ کب لکھیں گے؟ خیر، ہم یہاں ہیں، مرحلہ 10 پر۔

اپنے پسندیدہ ایڈیٹر میں ہیلو-ورلڈ پروجیکٹ کھولیں (ہمیں [VSCode](https://code.visualstudio.com/) پسند ہے)۔ اسمارٹ کنٹریکٹس Solidity نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا HelloWorld.sol اسمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔

1. ”contracts“ فولڈر پر جائیں اور HelloWorld.sol نامی ایک نئی فائل بنائیں۔
2. نیچے Ethereum فاؤنڈیشن کا ایک نمونہ ہیلو ورلڈ اسمارٹ کنٹریکٹ ہے جسے ہم اس ٹیوٹوریل کے لیے استعمال کریں گے۔ نیچے دیے گئے مواد کو اپنی HelloWorld.sol فائل میں کاپی اور پیسٹ کریں، اور یہ سمجھنے کے لیے تبصرے ضرور پڑھیں کہ یہ کنٹریکٹ کیا کرتا ہے:

```solidity
// سیمنٹک ورژنگ کا استعمال کرتے ہوئے، Solidity کا ورژن بتاتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.0;

// `HelloWorld` نامی ایک کنٹریکٹ کی وضاحت کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی اسٹیٹ) کا مجموعہ ہوتا ہے۔ ایک بار ڈیپلائے ہونے کے بعد، ایک کنٹریکٹ Ethereum بلاک چین پر ایک مخصوص ایڈریس پر رہتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // `string` قسم کے ایک اسٹیٹ ویری ایبل `message` کا اعلان کرتا ہے۔
   // اسٹیٹ ویری ایبلز ایسے ویری ایبلز ہیں جن کی ویلیوز مستقل طور پر کنٹریکٹ اسٹوریج میں محفوظ ہوجاتی ہیں۔ کلیدی لفظ `public` ویری ایبلز کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک ایسا فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس ویلیو تک رسائی کے لیے کال کرسکتے ہیں۔
   string public message;

   // کئی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، ایک کنسٹرکٹر ایک خاص فنکشن ہے جو صرف کنٹریکٹ بنانے پر ہی عمل میں لایا جاتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے کیا جاتا ہے۔ مزید جانیں:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک سٹرنگ آرگیومنٹ `initMessage` کو قبول کرتا ہے اور ویلیو کو کنٹریکٹ کے `message` اسٹوریج ویری ایبل میں سیٹ کرتا ہے۔
      message = initMessage;
   }

   // ایک پبلک فنکشن جو ایک سٹرنگ آرگیومنٹ کو قبول کرتا ہے اور `message` اسٹوریج ویری ایبل کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      message = newMessage;
   }
}
```

یہ ایک انتہائی سادہ اسمارٹ کنٹریکٹ ہے جو بناتے وقت ایک پیغام اسٹور کرتا ہے اور `update` فنکشن کو کال کرکے اپ ڈیٹ کیا جاسکتا ہے۔

## مرحلہ 11: MetaMask اور Alchemy کو اپنے پروجیکٹ سے جوڑیں {#step-11}

ہم نے ایک MetaMask والیٹ، Alchemy اکاؤنٹ بنایا ہے، اور اپنا اسمارٹ کنٹریکٹ لکھا ہے، اب ان تینوں کو جوڑنے کا وقت آگیا ہے۔

آپ کے ورچوئل والیٹ سے بھیجی گئی ہر ٹرانزیکشن کے لیے آپ کی منفرد پرائیویٹ کلید کا استعمال کرتے ہوئے ایک دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی پرائیویٹ کلید (اور Alchemy API کلید) کو ایک ماحولیاتی فائل میں محفوظ طریقے سے اسٹور کر سکتے ہیں۔

> ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائرکٹری میں dotenv پیکیج انسٹال کریں:

```
npm install dotenv --save
```

پھر، ہمارے پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی MetaMask پرائیویٹ کلید اور HTTP Alchemy API URL شامل کریں۔

- اپنی پرائیویٹ کلید کو ایکسپورٹ کرنے کے لیے [ان ہدایات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) پر عمل کریں۔
- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں

![get alchemy api key](./get-alchemy-api-key.png)

Alchemy API URL کاپی کریں

آپ کا `.env` اس طرح نظر آنا چاہیے:

```
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

انہیں حقیقت میں ہمارے کوڈ سے جوڑنے کے لیے، ہم ان متغیرات کا حوالہ اپنی `hardhat.config.js` فائل میں مرحلہ 13 پر دیں گے۔

<Alert variant="warning">
<AlertContent>
<AlertDescription>
<code>.env</code> کو کمٹ نہ کریں! براہ کرم یقینی بنائیں کہ آپ اپنی <code>.env</code> فائل کسی کے ساتھ شیئر یا ظاہر نہ کریں، کیونکہ ایسا کرنے سے آپ اپنے رازوں پر سمجھوتہ کر رہے ہیں۔ اگر آپ ورژن کنٹرول استعمال کر رہے ہیں، تو اپنی <code>.env</code> کو <a href="https://git-scm.com/docs/gitignore">gitignore</a> فائل میں شامل کریں۔
</AlertDescription>
</AlertContent>
</Alert>

## مرحلہ 12: Ethers.js انسٹال کریں {#step-12-install-ethersjs}

Ethers.js ایک لائبریری ہے جو [معیاری JSON-RPC طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر Ethereum کے ساتھ تعامل اور درخواستیں کرنا آسان بناتی ہے۔

Hardhat اضافی ٹولنگ اور توسیع شدہ فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو ضم کرنا انتہائی آسان بناتا ہے۔ ہم کنٹریکٹ ڈیپلائمنٹ کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) سے فائدہ اٹھائیں گے ([Ethers.js](https://github.com/ethers-io/ethers.js/) میں کچھ انتہائی صاف کنٹریکٹ ڈیپلائمنٹ کے طریقے ہیں)۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

```
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

ہمیں اگلے مرحلے میں اپنی `hardhat.config.js` میں بھی ethers کی ضرورت ہوگی۔

## مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#step-13-update-hardhatconfigjs}

ہم نے اب تک کئی انحصارات اور پلگ ان شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اس طرح اپ ڈیٹ کریں:

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

## مرحلہ 14: ہمارے کنٹریکٹ کو کمپائل کریں {#step-14-compile-our-contracts}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کنٹریکٹ کو کمپائل کریں۔ `compile` ٹاسک بلٹ ان ہارڈ ہیٹ ٹاسک میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```
npx hardhat compile
```

آپ کو `SPDX license identifier not provided in source file` کے بارے میں ایک وارننگ مل سکتی ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ اچھا لگے گا! اگر نہیں، تو آپ ہمیشہ [Alchemy discord](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

## مرحلہ 15: ہماری ڈیپلائے اسکرپٹ لکھیں {#step-15-write-our-deploy-scripts}

اب جب کہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آگیا ہے کہ ہم اپنی کنٹریکٹ ڈیپلوئے اسکرپٹ لکھیں۔

`scripts/` فولڈر پر جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، اس میں درج ذیل مواد شامل کریں:

```
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // ڈیپلائمنٹ شروع کریں، ایک پرومس واپس کرتا ہے جو ایک کنٹریکٹ آبجیکٹ میں ریزولو ہوتا ہے
   const hello_world = await HelloWorld.deploy("Hello World!");
   console.log("Contract deployed to address:", hello_world.address);}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat اپنے [کنٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں بہت اچھی طرح سے وضاحت کرتا ہے کہ کوڈ کی یہ ہر لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتیں اپنائی ہیں۔

```
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.js میں ایک `ContractFactory` ایک ابسٹریکشن ہے جو نئے اسمارٹ کنٹریکٹس کو ڈیپلائے کرنے کے لیے استعمال ہوتی ہے، لہذا یہاں `HelloWorld` ہمارے ہیلو ورلڈ کنٹریکٹ کی مثالوں کے لیے ایک فیکٹری ہے۔ `hardhat-ethers` پلگ ان کا استعمال کرتے وقت `ContractFactory` اور `Contract` کی مثالیں پہلے دستخط کنندہ سے بطور ڈیفالٹ جڑی ہوتی ہیں۔

```
const hello_world = await HelloWorld.deploy();
```

ایک `ContractFactory` پر `deploy()` کو کال کرنے سے ڈیپلائمنٹ شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` میں ریزولو ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے ہر اسمارٹ کنٹریکٹ فنکشن کے لیے ایک طریقہ ہے۔

## مرحلہ 16: ہمارا کنٹریکٹ ڈیپلائے کریں {#step-16-deploy-our-contract}

ہم آخر کار اپنے اسمارٹ کنٹریکٹ کو ڈیپلوئے کرنے کے لیے تیار ہیں! کمانڈ لائن پر جائیں اور چلائیں:

```
npx hardhat run scripts/deploy.js --network sepolia
```

پھر آپ کو کچھ اس طرح نظر آنا چاہیے:

```
کنٹریکٹ اس ایڈریس پر ڈیپلائے کیا گیا: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

اگر ہم [Sepolia etherscan](https://sepolia.etherscan.io/) پر جائیں اور اپنے کنٹریکٹ ایڈریس کو تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ یہ کامیابی سے ڈیپلائے ہو گیا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![etherscan contract](./etherscan-contract.png)

`From` ایڈریس آپ کے MetaMask اکاؤنٹ کے ایڈریس سے مماثل ہونا چاہیے اور To ایڈریس پر ”Contract Creation“ لکھا ہوگا لیکن اگر ہم ٹرانزیکشن میں کلک کریں گے تو ہمیں `To` فیلڈ میں اپنا کنٹریکٹ ایڈریس نظر آئے گا:

![etherscan transaction](./etherscan-transaction.png)

مبارک ہو! آپ نے ابھی Ethereum چین پر ایک اسمارٹ کنٹریکٹ ڈیپلائے کیا ہے 🎉

یہ سمجھنے کے لیے کہ پس پردہ کیا ہو رہا ہے، آئیے اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemyapi.io/explorer) میں ایکسپلورر ٹیب پر جائیں۔ اگر آپ کے پاس متعدد Alchemy ایپس ہیں تو ایپ کے لحاظ سے فلٹر کرنا اور ”Hello World“ کو منتخب کرنا یقینی بنائیں۔
![hello world explorer](./hello-world-explorer.png)

یہاں آپ کو مٹھی بھر JSON-RPC کالز نظر آئیں گی جو Hardhat/Ethers نے ہمارے لیے پس پردہ کی تھیں جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں دو اہم کالز ہیں [`eth_sendRawTransaction`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-send-raw-transaction)، جو دراصل ہمارے کنٹریکٹ کو Sepolia چین پر لکھنے کی درخواست ہے، اور [`eth_getTransactionByHash`](https://www.alchemy.com/docs/node/abstract/abstract-api-endpoints/eth-get-transaction-by-hash) جو ہیش دیے جانے پر ہمارے ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز کے وقت ایک عام پیٹرن)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 اور Alchemy کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) پر یہ ٹیوٹوریل دیکھیں۔

اس ٹیوٹوریل کے حصہ 1 کے لیے بس اتنا ہی، حصہ 2 میں ہم اصل میں [اپنے اسمارٹ کنٹریکٹ کے ساتھ انٹریکٹ کریں گے](https://www.alchemy.com/docs/interacting-with-a-smart-contract) اپنے ابتدائی پیغام کو اپ ڈیٹ کرکے، اور حصہ 3 میں ہم [اپنے اسمارٹ کنٹریکٹ کو Etherscan پر پبلش کریں گے](https://www.alchemy.com/docs/submitting-your-smart-contract-to-etherscan) تاکہ ہر کوئی جان سکے کہ اس کے ساتھ کیسے انٹریکٹ کرنا ہے۔

**Alchemy کے بارے میں مزید جاننا چاہتے ہیں؟ ہماری [ویب سائٹ](https://www.alchemy.com/eth) دیکھیں۔ کبھی بھی کوئی اپ ڈیٹ مس نہیں کرنا چاہتے؟ ہمارے نیوز لیٹر کو [یہاں](https://www.alchemy.com/newsletter) سبسکرائب کریں! ہمارے [Discord](https://discord.gg/u72VCg3) میں بھی شامل ہونا یقینی بنائیں۔**۔
