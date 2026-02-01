---
title: ہیلو ورلڈ اسمارٹ کنٹریکٹ برائے مبتدی - فل اسٹیک
description: Ethereum پر ایک سادہ اسمارٹ کنٹریکٹ لکھنے اور اسے ڈیپلائے کرنے کے بارے میں تعارفی ٹیوٹوریل۔
author: "nstrike2"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "اسمارٹ معاہدات",
    "تعینات کرنا",
    "بلاک ایکسپلورر",
    "فرنٹ اینڈ",
    "لین دین"
  ]
skill: beginner
lang: ur-in
published: 2021-10-25
---

اگر آپ بلاک چین ڈیولپمنٹ میں نئے ہیں اور یہ نہیں جانتے کہ کہاں سے شروع کرنا ہے یا اسمارٹ کنٹریکٹس کو کیسے ڈیپلائے اور ان کے ساتھ تعامل کرنا ہے تو یہ گائیڈ آپ کے لیے ہے۔ ہم [MetaMask](https://metamask.io)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org)، اور [Alchemy](https://alchemy.com/eth) کا استعمال کرتے ہوئے Goerli ٹیسٹ نیٹ ورک پر ایک سادہ، اسمارٹ کنٹریکٹ بنانے اور اسے ڈیپلائے کرنے کے عمل سے گزریں گے۔

اس ٹیوٹوریل کو مکمل کرنے کے لیے آپ کو ایک Alchemy اکاؤنٹ کی ضرورت ہوگی۔ [ایک مفت اکاؤنٹ کے لیے سائن اپ کریں](https://www.alchemy.com/).

اگر آپ کو کسی بھی وقت کوئی سوال ہو تو، بلا جھجھک [Alchemy Discord](https://discord.gg/gWuC7zB) میں رابطہ کریں!

## حصہ 1 - Hardhat کا استعمال کرتے ہوئے اپنا اسمارٹ کنٹریکٹ بنائیں اور ڈیپلائے کریں {#part-1}

### Ethereum نیٹ ورک سے جڑیں {#connect-to-the-ethereum-network}

Ethereum چین سے درخواستیں کرنے کے بہت سے طریقے ہیں۔ سادگی کے لیے، ہم Alchemy پر ایک مفت اکاؤنٹ استعمال کریں گے، جو ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں خود ایک نوڈ چلائے بغیر Ethereum چین کے ساتھ بات چیت کرنے کی اجازت دیتا ہے۔ Alchemy میں نگرانی اور تجزیات کے لیے ڈیولپر ٹولز بھی ہیں؛ ہم اس ٹیوٹوریل میں ان سے فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہمارے اسمارٹ کنٹریکٹ کی ڈیپلائیمنٹ میں پس پردہ کیا ہو رہا ہے۔

### اپنی ایپ اور API کلید بنائیں {#create-your-app-and-api-key}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر ایک API کلید تیار کر سکتے ہیں۔ یہ آپ کو Goerli ٹیسٹ نیٹ پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹ سے واقف نہیں ہیں تو آپ [نیٹ ورک منتخب کرنے کے لیے Alchemy کی گائیڈ پڑھ سکتے ہیں](https://www.alchemy.com/docs/choosing-a-web3-network)۔

Alchemy ڈیش بورڈ پر، نیویگیشن بار میں **ایپس** ڈراپ ڈاؤن تلاش کریں اور **ایپ بنائیں** پر کلک کریں۔

![Hello world create app](./hello-world-create-app.png)

اپنی ایپ کو '_ہیلو ورلڈ_' نام دیں اور ایک مختصر تفصیل لکھیں۔ اپنے ماحول کے طور پر **اسٹیجنگ** اور اپنے نیٹ ورک کے طور پر **Goerli** منتخب کریں۔

![create app view hello world](./create-app-view-hello-world.png)

_نوٹ: یقینی بنائیں کہ **Goerli** منتخب کریں، ورنہ یہ ٹیوٹوریل کام نہیں کرے گا۔_

**ایپ بنائیں** پر کلک کریں۔ آپ کی ایپ نیچے دی گئی جدول میں ظاہر ہوگی۔

### ایک Ethereum اکاؤنٹ بنائیں {#create-an-ethereum-account}

ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے آپ کو ایک Ethereum اکاؤنٹ کی ضرورت ہے۔ ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جو صارفین کو اپنے Ethereum اکاؤنٹ کے پتے کا انتظام کرنے کی اجازت دیتا ہے۔

آپ [یہاں](https://metamask.io/download) مفت میں MetaMask اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ ایک اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی ایک اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں کونے میں "Goerli ٹیسٹ نیٹ ورک" پر سوئچ کریں (تاکہ ہم اصلی پیسے سے نمٹ نہ رہے ہوں)۔

### مرحلہ 4: ایک فاسیٹ سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

اپنے اسمارٹ کنٹریکٹ کو ٹیسٹ نیٹ ورک پر ڈیپلائے کرنے کے لیے، آپ کو کچھ جعلی ETH کی ضرورت ہوگی۔ Goerli نیٹ ورک پر ETH حاصل کرنے کے لیے، Goerli فوسیٹ پر جائیں اور اپنا Goerli اکاؤنٹ ایڈریس درج کریں۔ نوٹ کریں کہ Goerli فوسیٹس حال ہی میں تھوڑے غیر معتبر ہو سکتے ہیں - آزمانے کے لیے اختیارات کی فہرست کے لیے [ٹیسٹ نیٹ ورکس کا صفحہ](/developers/docs/networks/#goerli) دیکھیں۔

_نوٹ: نیٹ ورک کی بھیڑ کی وجہ سے، اس میں کچھ وقت لگ سکتا ہے۔_
\`\`

### مرحلہ 5: اپنا بیلنس چیک کریں {#step-5-check-your-balance}

یہ دوبارہ چیک کرنے کے لیے کہ آیا ETH آپ کے والیٹ میں ہے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں ETH کی رقم واپس کرے گا۔ مزید جاننے کے لیے [کمپوزر ٹول کا استعمال کیسے کریں اس پر Alchemy کا مختصر ٹیوٹوریل](https://youtu.be/r6sjRxBZJuU) دیکھیں۔

اپنا MetaMask اکاؤنٹ کا پتہ درج کریں اور **درخواست بھیجیں** پر کلک کریں۔ آپ کو ایک جواب نظر آئے گا جو نیچے دیے گئے کوڈ کے ٹکڑے جیسا لگتا ہے۔

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _نوٹ: یہ نتیجہ wei میں ہے، ETH میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔_

اف! ہمارا جعلی پیسہ سب وہیں ہے۔

### مرحلہ 6: ہمارے پروجیکٹ کو شروع کریں {#step-6-initialize-our-project}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور درج ذیل کو ان پٹ کریں۔

```
mkdir hello-world
cd hello-world
```

اب جب کہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے `npm init` استعمال کریں گے۔

> اگر آپ کے پاس ابھی تک npm انسٹال نہیں ہے، تو [Node.js اور npm انسٹال کرنے کے لیے ان ہدایات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) پر عمل کریں۔

اس ٹیوٹوریل کے مقصد کے لیے، اس سے کوئی فرق نہیں پڑتا کہ آپ ابتدائی سوالات کا جواب کیسے دیتے ہیں۔ حوالہ کے لیے ہم نے اسے اس طرح کیا:

```
پیکیج کا نام: (hello-world)
ورژن: (1.0.0)
تفصیل: ہیلو ورلڈ اسمارٹ کنٹریکٹ
انٹری پوائنٹ: (index.js)
ٹیسٹ کمانڈ:
گٹ ریپوزٹری:
کلیدی الفاظ:
مصنف:
لائسنس: (ISC)

/Users/.../.../.../hello-world/package.json پر لکھنے کے بارے میں:

{
   "name": "hello-world",
   "version": "1.0.0",
   "description": "ہیلو ورلڈ اسمارٹ کنٹریکٹ",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.json کو منظور کریں اور ہم تیار ہیں!

### مرحلہ 7: Hardhat ڈاؤن لوڈ کریں {#step-7-download-hardhat}

Hardhat آپ کے Ethereum سافٹ ویئر کو کمپائل، ڈیپلوئے، ٹیسٹ اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ ڈیولپرز کو لائیو چین پر ڈیپلوئے کرنے سے پہلے مقامی طور پر اسمارٹ کنٹریکٹس اور dapps بنانے میں مدد کرتا ہے۔

ہمارے `hello-world` پروجیکٹ کے اندر چلائیں:

```
npm install --save-dev hardhat
```

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

### مرحلہ 8: Hardhat پروجیکٹ بنائیں {#step-8-create-hardhat-project}

ہمارے `hello-world` پروجیکٹ فولڈر کے اندر، چلائیں:

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

👷 Hardhat v2.0.11 میں خوش آمدید 👷‍

آپ کیا کرنا چاہتے ہیں؟ …
ایک نمونہ پروجیکٹ بنائیں
❯ ایک خالی hardhat.config.js بنائیں
بند کریں
```

یہ پروجیکٹ میں ایک `hardhat.config.js` فائل بنائے گا۔ ہم اسے بعد میں ٹیوٹوریل میں اپنے پروجیکٹ کے سیٹ اپ کی وضاحت کے لیے استعمال کریں گے۔

### مرحلہ 9: پروجیکٹ فولڈر شامل کریں {#step-9-add-project-folders}

پروجیکٹ کو منظم رکھنے کے لیے، آئیے دو نئے فولڈر بنائیں۔ کمانڈ لائن میں، اپنے `hello-world` پروجیکٹ کی روٹ ڈائرکٹری میں جائیں اور ٹائپ کریں:

```
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنی ہیلو ورلڈ اسمارٹ کنٹریکٹ کوڈ فائل رکھیں گے۔
- `scripts/` وہ جگہ ہے جہاں ہم اپنے کنٹریکٹ کو ڈیپلائے کرنے اور اس کے ساتھ انٹریکٹ کرنے کے لیے اسکرپٹس رکھیں گے۔

### مرحلہ 10: ہمارا کنٹریکٹ لکھیں {#step-10-write-our-contract}

آپ خود سے پوچھ رہے ہوں گے کہ ہم کوڈ کب لکھنے جا رہے ہیں؟ یہی وقت ہے!

اپنے پسندیدہ ایڈیٹر میں ہیلو-ورلڈ پروجیکٹ کھولیں۔ اسمارٹ کنٹریکٹس زیادہ تر Solidity میں لکھے جاتے ہیں، جسے ہم اپنا اسمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔‌

1. `contracts` فولڈر پر جائیں اور `HelloWorld.sol` نامی ایک نئی فائل بنائیں۔
2. ذیل میں ایک نمونہ ہیلو ورلڈ اسمارٹ کنٹریکٹ ہے جسے ہم اس ٹیوٹوریل کے لیے استعمال کریں گے۔ نیچے دیے گئے مواد کو `HelloWorld.sol` فائل میں کاپی کریں۔

_نوٹ: یہ سمجھنے کے لیے کہ یہ کنٹریکٹ کیا کرتا ہے، تبصرے ضرور پڑھیں۔_

```
// Solidity کے ورژن کی وضاحت کرتا ہے، سیمنٹک ورژننگ کا استعمال کرتے ہوئے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// `HelloWorld` نامی ایک کنٹریکٹ کی وضاحت کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی حالت) کا ایک مجموعہ ہے۔ ایک بار ڈیپلائے ہونے کے بعد، ایک کنٹریکٹ Ethereum بلاک چین پر ایک مخصوص ایڈریس پر رہتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //اپ ڈیٹ فنکشن کال ہونے پر جاری کیا جاتا ہے
   //اسمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر آپ کے ایپ فرنٹ اینڈ پر کچھ ہوا ہے، جو کچھ ایونٹس کے لیے 'سن' سکتا ہے اور جب وہ ہوتے ہیں تو کارروائی کر سکتا ہے۔
   event UpdatedMessages(string oldStr, string newStr);

   // `string` قسم کے `message` نامی ایک اسٹیٹ متغیر کا اعلان کرتا ہے۔
   // اسٹیٹ متغیرات وہ متغیرات ہیں جن کی قدریں کنٹریکٹ اسٹوریج میں مستقل طور پر محفوظ ہوتی ہیں۔ کلیدی لفظ `public` متغیرات کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس قدر تک رسائی کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، ایک کنسٹرکٹر ایک خاص فنکشن ہے جو صرف کنٹریکٹ کی تخلیق پر عمل میں لایا جاتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے کیا جاتا ہے۔ مزید جانیں:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک اسٹرنگ آرگیومنٹ `initMessage` کو قبول کرتا ہے اور قدر کو کنٹریکٹ کے `message` اسٹوریج متغیر میں سیٹ کرتا ہے۔
      message = initMessage;
   }

   // ایک عوامی فنکشن جو ایک اسٹرنگ آرگیومنٹ کو قبول کرتا ہے اور `message` اسٹوریج متغیر کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

یہ ایک بنیادی اسمارٹ کنٹریکٹ ہے جو تخلیق کے وقت ایک پیغام محفوظ کرتا ہے۔ اسے `update` فنکشن کو کال کرکے اپ ڈیٹ کیا جاسکتا ہے۔

### مرحلہ 11: MetaMask اور Alchemy کو اپنے پروجیکٹ سے جوڑیں {#step-11-connect-metamask-alchemy-to-your-project}

ہم نے ایک MetaMask والیٹ، Alchemy اکاؤنٹ بنایا ہے، اور اپنا اسمارٹ کنٹریکٹ لکھا ہے، اب ان تینوں کو جوڑنے کا وقت آگیا ہے۔

آپ کے والیٹ سے بھیجی گئی ہر ٹرانزیکشن کے لیے آپ کی منفرد پرائیویٹ کلید کا استعمال کرتے ہوئے ایک دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت دینے کے لیے، ہم اپنی پرائیویٹ کلید کو ایک انوائرمنٹ فائل میں محفوظ طریقے سے محفوظ کر سکتے ہیں۔ ہم یہاں Alchemy کے لیے ایک API کلید بھی محفوظ کریں گے۔

> ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائرکٹری میں dotenv پیکیج انسٹال کریں:

```
npm install dotenv --save
```

پھر، پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں۔ اس میں اپنی MetaMask پرائیویٹ کلید اور HTTP Alchemy API URL شامل کریں۔

آپ کی انوائرمنٹ فائل کا نام `.env` ہونا چاہئے ورنہ اسے انوائرمنٹ فائل کے طور پر تسلیم نہیں کیا جائے گا۔

اس کا نام `process.env` یا `.env-custom` یا کچھ اور نہ رکھیں۔

- اپنی پرائیویٹ کلید برآمد کرنے کے لیے [ان ہدایات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) پر عمل کریں
- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں

![](./get-alchemy-api-key.gif)

آپ کا `.env` اس طرح نظر آنا چاہیے:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

انہیں حقیقت میں ہمارے کوڈ سے جوڑنے کے لیے، ہم ان متغیرات کا حوالہ اپنی `hardhat.config.js` فائل میں مرحلہ 13 پر دیں گے۔

### مرحلہ 12: Ethers.js انسٹال کریں {#step-12-install-ethersjs}

Ethers.js ایک لائبریری ہے جو زیادہ صارف دوست طریقوں کے ساتھ [معیاری JSON-RPC طریقوں](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) کو لپیٹ کر Ethereum کے ساتھ تعامل اور درخواستیں کرنا آسان بناتی ہے۔

Hardhat ہمیں اضافی ٹولنگ اور توسیع شدہ فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو مربوط کرنے کی اجازت دیتا ہے۔ ہم کنٹریکٹ ڈیپلائیمنٹ کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) سے فائدہ اٹھائیں گے۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#step-13-update-hardhat-configjs}

ہم نے اب تک کئی انحصارات اور پلگ ان شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اس طرح اپ ڈیٹ کریں:

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
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
```

### مرحلہ 14: ہمارا کنٹریکٹ کمپائل کریں {#step-14-compile-our-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کنٹریکٹ کو کمپائل کریں۔ `compile` ٹاسک بلٹ ان ہارڈ ہیٹ ٹاسک میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```bash
npx hardhat compile
```

آپ کو `SPDX license identifier not provided in source file` کے بارے میں ایک انتباہ مل سکتا ہے، لیکن اس کے بارے میں فکر کرنے کی کوئی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک نظر آئے گا! اگر نہیں، تو آپ ہمیشہ [Alchemy discord](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

### مرحلہ 15: ہمارا ڈیپلائے اسکرپٹ لکھیں {#step-15-write-our-deploy-script}

اب جب کہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آگیا ہے کہ ہم اپنی کنٹریکٹ ڈیپلوئے اسکرپٹ لکھیں۔

`scripts/` فولڈر پر جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، اس میں درج ذیل مواد شامل کریں:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // ڈیپلائیمنٹ شروع کریں، ایک وعدہ واپس کریں جو ایک کنٹریکٹ آبجیکٹ پر حل ہوتا ہے
  const hello_world = await HelloWorld.deploy("Hello World!")
  console.log("کنٹریکٹ اس ایڈریس پر ڈیپلائے کیا گیا:", hello_world.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat اپنے [کنٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں بہت اچھی طرح سے وضاحت کرتا ہے کہ کوڈ کی یہ ہر لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتیں اپنائی ہیں۔

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js میں ایک `ContractFactory` ایک تجرید ہے جو نئے اسمارٹ کنٹریکٹس کو ڈیپلائے کرنے کے لیے استعمال ہوتی ہے، لہذا یہاں `HelloWorld` ہمارے ہیلو ورلڈ کنٹریکٹ کی مثالوں کے لیے ایک [فیکٹری](https://en.wikipedia.org/wiki/Factory_\(object-oriented_programming\)) ہے۔ `hardhat-ethers` پلگ ان کا استعمال کرتے وقت `ContractFactory` اور `Contract`، مثالیں پہلے دستخط کنندہ (مالک) سے بطور ڈیفالٹ جڑی ہوتی ہیں۔

```javascript
const hello_world = await HelloWorld.deploy()
```

`ContractFactory` پر `deploy()` کو کال کرنے سے ڈیپلائیمنٹ شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` آبجیکٹ پر حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے ہر اسمارٹ کنٹریکٹ فنکشن کے لیے ایک طریقہ ہے۔

### مرحلہ 16: ہمارا کنٹریکٹ ڈیپلائے کریں {#step-16-deploy-our-contract}

ہم آخر کار اپنے اسمارٹ کنٹریکٹ کو ڈیپلوئے کرنے کے لیے تیار ہیں! کمانڈ لائن پر جائیں اور چلائیں:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

پھر آپ کو کچھ اس طرح نظر آنا چاہیے:

```bash
کنٹریکٹ اس ایڈریس پر ڈیپلائے کیا گیا: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**براہ کرم یہ ایڈریس محفوظ کریں**۔ ہم اسے بعد میں ٹیوٹوریل میں استعمال کریں گے۔

اگر ہم [Goerli etherscan](https://goerli.etherscan.io) پر جائیں اور اپنے کنٹریکٹ ایڈریس کو تلاش کریں تو ہمیں یہ دیکھنا چاہیے کہ یہ کامیابی سے ڈیپلائے ہو گیا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![](./etherscan-contract.png)

`From` ایڈریس آپ کے MetaMask اکاؤنٹ ایڈریس سے مماثل ہونا چاہئے اور `To` ایڈریس **کنٹریکٹ کی تخلیق** کہے گا۔ اگر ہم ٹرانزیکشن پر کلک کرتے ہیں تو ہمیں `To` فیلڈ میں اپنا کنٹریکٹ ایڈریس نظر آئے گا۔

![](./etherscan-transaction.png)

مبارک ہو! آپ نے ابھی ایک Ethereum ٹیسٹ نیٹ پر ایک اسمارٹ کنٹریکٹ ڈیپلائے کیا ہے۔

پس پردہ کیا ہو رہا ہے یہ سمجھنے کے لیے، آئیے اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemy.com/explorer) میں ایکسپلورر ٹیب پر جائیں۔ اگر آپ کے پاس متعدد Alchemy ایپس ہیں تو یقینی بنائیں کہ ایپ کے لحاظ سے فلٹر کریں اور **ہیلو ورلڈ** منتخب کریں۔

![](./hello-world-explorer.png)

یہاں آپ کو کچھ JSON-RPC طریقے نظر آئیں گے جو Hardhat/Ethers نے ہمارے لیے پس پردہ بنائے تھے جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں دو اہم طریقے ہیں [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction)، جو ہمارے کنٹریکٹ کو Goerli چین پر لکھنے کی درخواست ہے، اور [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash)، جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر ہمارا ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

## حصہ 2: اپنے اسمارٹ کنٹریکٹ کے ساتھ تعامل کریں {#part-2-interact-with-your-smart-contract}

اب جب کہ ہم نے Goerli نیٹ ورک پر ایک اسمارٹ کنٹریکٹ کامیابی سے ڈیپلائے کر لیا ہے، آئیے سیکھتے ہیں کہ اس کے ساتھ کیسے تعامل کیا جائے۔

### ایک interact.js فائل بنائیں {#create-a-interactjs-file}

یہ وہ فائل ہے جہاں ہم اپنا تعامل کا اسکرپٹ لکھیں گے۔ ہم Ethers.js لائبریری استعمال کریں گے جو آپ نے پہلے حصہ 1 میں انسٹال کی تھی۔

`scripts/` فولڈر کے اندر، `interact.js` نامی ایک نئی فائل بنائیں اور درج ذیل کوڈ شامل کریں:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### اپنی .env فائل کو اپ ڈیٹ کریں {#update-your-env-file}

ہم نئے انوائرمنٹ متغیرات استعمال کریں گے، لہذا ہمیں انہیں `.env` فائل میں بیان کرنے کی ضرورت ہے جو [ہم نے پہلے بنائی تھی](#step-11-connect-metamask-&-alchemy-to-your-project)۔

ہمیں اپنے Alchemy `API_KEY` اور `CONTRACT_ADDRESS` کے لیے ایک تعریف شامل کرنے کی ضرورت ہوگی جہاں آپ کا اسمارٹ کنٹریکٹ ڈیپلائے کیا گیا تھا۔

آپ کی `.env` فائل کچھ اس طرح نظر آنی چاہیے:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### اپنا کنٹریکٹ ABI حاصل کریں {#grab-your-contract-ABI}

ہمارا کنٹریکٹ [ABI (ایپلیکیشن بائنری انٹرفیس)](/glossary/#abi) ہمارے اسمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کا انٹرفیس ہے۔ Hardhat خود بخود ایک ABI تیار کرتا ہے اور اسے `HelloWorld.json` میں محفوظ کرتا ہے۔ ABI کا استعمال کرنے کے لیے، ہمیں اپنی `interact.js` فائل میں کوڈ کی درج ذیل لائنیں شامل کرکے مواد کو پارس کرنا ہوگا:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

اگر آپ ABI دیکھنا چاہتے ہیں تو آپ اسے اپنے کنسول پر پرنٹ کر سکتے ہیں:

```javascript
console.log(JSON.stringify(contract.abi))
```

اپنا ABI کنسول پر پرنٹ دیکھنے کے لیے، اپنے ٹرمینل پر جائیں اور چلائیں:

```bash
npx hardhat run scripts/interact.js
```

### اپنے کنٹریکٹ کی ایک مثال بنائیں {#create-an-instance-of-your-contract}

ہمارے کنٹریکٹ کے ساتھ تعامل کرنے کے لیے، ہمیں اپنے کوڈ میں کنٹریکٹ کی ایک مثال بنانے کی ضرورت ہے۔ Ethers.js کے ساتھ ایسا کرنے کے لیے، ہمیں تین تصورات کے ساتھ کام کرنے کی ضرورت ہوگی:

1. پرووائیڈر - ایک نوڈ پرووائیڈر جو آپ کو بلاک چین تک پڑھنے اور لکھنے کی رسائی دیتا ہے
2. دستخط کنندہ - ایک Ethereum اکاؤنٹ کی نمائندگی کرتا ہے جو ٹرانزیکشنز پر دستخط کر سکتا ہے
3. کنٹریکٹ - ایک Ethers.js آبجیکٹ جو آن چین ڈیپلائے کیے گئے ایک مخصوص کنٹریکٹ کی نمائندگی کرتا ہے

ہم کنٹریکٹ کی اپنی مثال بنانے کے لیے پچھلے مرحلے سے کنٹریکٹ ABI کا استعمال کریں گے:

```javascript
// interact.js

// پرووائیڈر
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// دستخط کنندہ
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// کنٹریکٹ
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

[ethers.js دستاویزات](https://docs.ethers.io/v5/) میں پرووائیڈرز، دستخط کنندگان، اور کنٹریکٹس کے بارے میں مزید جانیں۔

### ابتدائی پیغام پڑھیں {#read-the-init-message}

یاد ہے جب ہم نے اپنا کنٹریکٹ `initMessage = "Hello world!"` کے ساتھ ڈیپلائے کیا تھا؟ اب ہم اپنے اسمارٹ کنٹریکٹ میں محفوظ اس پیغام کو پڑھنے اور اسے کنسول پر پرنٹ کرنے جا رہے ہیں۔

JavaScript میں، نیٹ ورکس کے ساتھ تعامل کرتے وقت غیر مطابقت پذیر فنکشنز استعمال ہوتے ہیں۔ غیر مطابقت پذیر فنکشنز کے بارے میں مزید جاننے کے لیے، [یہ میڈیم مضمون پڑھیں](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)۔

ہمارے اسمارٹ کنٹریکٹ میں `message` فنکشن کو کال کرنے اور ابتدائی پیغام پڑھنے کے لیے نیچے دیے گئے کوڈ کا استعمال کریں:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("پیغام یہ ہے: " + message)
}
main()
```

`npx hardhat run scripts/interact.js` کا استعمال کرتے ہوئے ٹرمینل میں فائل چلانے کے بعد ہمیں یہ جواب نظر آنا چاہیے:

```
پیغام یہ ہے: ہیلو ورلڈ!
```

مبارک ہو! آپ نے ابھی Ethereum بلاک چین سے اسمارٹ کنٹریکٹ کا ڈیٹا کامیابی سے پڑھ لیا ہے، شاباش!

### پیغام کو اپ ڈیٹ کریں {#update-the-message}

صرف پیغام پڑھنے کے بجائے، ہم `update` فنکشن کا استعمال کرتے ہوئے اپنے اسمارٹ کنٹریکٹ میں محفوظ پیغام کو بھی اپ ڈیٹ کر سکتے ہیں! بہت اچھا ہے، ہے نا؟

پیغام کو اپ ڈیٹ کرنے کے لیے، ہم اپنے انسٹینٹی ایٹڈ کنٹریکٹ آبجیکٹ پر براہ راست `update` فنکشن کو کال کر سکتے ہیں:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("پیغام یہ ہے: " + message)

  console.log("پیغام کو اپ ڈیٹ کیا جا رہا ہے...")
  const tx = await helloWorldContract.update("یہ نیا پیغام ہے۔")
  await tx.wait()
}
main()
```

نوٹ کریں کہ لائن 11 پر، ہم واپس کیے گئے ٹرانزیکشن آبجیکٹ پر `.wait()` کو کال کرتے ہیں۔ یہ یقینی بناتا ہے کہ ہمارا اسکرپٹ فنکشن سے باہر نکلنے سے پہلے بلاک چین پر ٹرانزیکشن کے مائن ہونے کا انتظار کرے۔ اگر `.wait()` کال شامل نہیں ہے، تو اسکرپٹ کنٹریکٹ میں اپ ڈیٹ شدہ `message` قدر نہیں دیکھ سکتا۔

### نیا پیغام پڑھیں {#read-the-new-message}

آپ کو اپ ڈیٹ شدہ `message` قدر پڑھنے کے لیے [پچھلے مرحلے](#read-the-init-message) کو دہرانے کے قابل ہونا چاہیے۔ ایک لمحہ نکالیں اور دیکھیں کہ کیا آپ اس نئی قدر کو پرنٹ کرنے کے لیے ضروری تبدیلیاں کر سکتے ہیں!

اگر آپ کو کوئی اشارہ چاہیے، تو یہاں یہ ہے کہ آپ کی `interact.js` فائل اس وقت کیسی نظر آنی چاہیے:

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

// دستخط کنندہ - آپ
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// کنٹریکٹ کی مثال
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)

async function main() {
  const message = await helloWorldContract.message()
  console.log("پیغام یہ ہے: " + message)

  console.log("پیغام کو اپ ڈیٹ کیا جا رہا ہے...")
  const tx = await helloWorldContract.update("یہ نیا پیغام ہے")
  await tx.wait()

  const newMessage = await helloWorldContract.message()
  console.log("نیا پیغام یہ ہے: " + newMessage)
}

main()
```

اب صرف اسکرپٹ چلائیں اور آپ کو پرانا پیغام، اپ ڈیٹ کی حیثیت، اور نیا پیغام اپنے ٹرمینل پر پرنٹ ہوتا نظر آنا چاہیے!

`npx hardhat run scripts/interact.js --network goerli`

```
پیغام یہ ہے: ہیلو ورلڈ!
پیغام کو اپ ڈیٹ کیا جا رہا ہے...
نیا پیغام یہ ہے: یہ نیا پیغام ہے۔
```

اس اسکرپٹ کو چلاتے وقت، آپ کو معلوم ہو سکتا ہے کہ نیا پیغام لوڈ ہونے سے پہلے `Updating the message...` مرحلے میں کچھ وقت لگتا ہے۔ یہ مائننگ کے عمل کی وجہ سے ہے؛ اگر آپ ٹرانزیکشنز کو مائن ہونے کے دوران ٹریک کرنے میں دلچسپی رکھتے ہیں، تو ٹرانزیکشن کی حیثیت دیکھنے کے لیے [Alchemy میم پول](https://dashboard.alchemyapi.io/mempool) پر جائیں۔ اگر ٹرانزیکشن ڈراپ ہو جاتی ہے، تو [Goerli Etherscan](https://goerli.etherscan.io) کو چیک کرنا اور اپنی ٹرانزیکشن ہیش کو تلاش کرنا بھی مددگار ہے۔

## حصہ 3: اپنے اسمارٹ کنٹریکٹ کو Etherscan پر شائع کریں {#part-3-publish-your-smart-contract-to-etherscan}

آپ نے اپنے اسمارٹ کنٹریکٹ کو زندہ کرنے کی تمام محنت کی؛ اب اسے دنیا کے ساتھ شیئر کرنے کا وقت ہے!

Etherscan پر اپنے اسمارٹ کنٹریکٹ کی تصدیق کرکے، کوئی بھی آپ کا سورس کوڈ دیکھ سکتا ہے اور آپ کے اسمارٹ کنٹریکٹ کے ساتھ تعامل کر سکتا ہے۔ آئیے شروع کرتے ہیں!

### مرحلہ 1: اپنے Etherscan اکاؤنٹ پر ایک API کلید تیار کریں {#step-1-generate-an-api-key-on-your-etherscan-account}

Etherscan API کلید اس بات کی تصدیق کے لیے ضروری ہے کہ آپ اس اسمارٹ کنٹریکٹ کے مالک ہیں جسے آپ شائع کرنے کی کوشش کر رہے ہیں۔

اگر آپ کے پاس پہلے سے Etherscan اکاؤنٹ نہیں ہے، تو [ایک اکاؤنٹ کے لیے سائن اپ کریں](https://etherscan.io/register)۔

لاگ ان ہونے کے بعد، نیویگیشن بار میں اپنا صارف نام تلاش کریں، اس پر ہوور کریں اور **میری پروفائل** بٹن منتخب کریں۔

آپ کے پروفائل صفحہ پر، آپ کو ایک سائیڈ نیویگیشن بار نظر آنا چاہیے۔ سائیڈ نیویگیشن بار سے، **API کیز** منتخب کریں۔ اگلا، ایک نئی API کلید بنانے کے لیے "شامل کریں" بٹن دبائیں، اپنی ایپ کا نام **hello-world** رکھیں اور **نئی API کلید بنائیں** بٹن دبائیں۔

آپ کی نئی API کلید API کلید کی میز میں ظاہر ہونی چاہیے۔ API کلید کو اپنے کلپ بورڈ پر کاپی کریں۔

اگلا، ہمیں Etherscan API کلید کو اپنی `.env` فائل میں شامل کرنے کی ضرورت ہے۔

اسے شامل کرنے کے بعد، آپ کی `.env` فائل اس طرح نظر آنی چاہیے:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat کے ذریعے ڈیپلائے کیے گئے اسمارٹ کنٹریکٹس {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan انسٹال کریں {#install-hardhat-etherscan}

Hardhat کا استعمال کرتے ہوئے اپنے کنٹریکٹ کو Etherscan پر شائع کرنا سیدھا سادہ ہے۔ شروع کرنے کے لیے آپ کو پہلے `hardhat-etherscan` پلگ ان انسٹال کرنے کی ضرورت ہوگی۔ `hardhat-etherscan` خود بخود اسمارٹ کنٹریکٹ کے سورس کوڈ اور ABI کی Etherscan پر تصدیق کرے گا۔ اسے شامل کرنے کے لیے، `hello-world` ڈائرکٹری میں چلائیں:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

انسٹال ہونے کے بعد، اپنی `hardhat.config.js` کے اوپری حصے میں درج ذیل بیان شامل کریں، اور Etherscan کنفیگریشن کے اختیارات شامل کریں:

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
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // Etherscan کے لیے آپ کی API کلید
    // https://etherscan.io/ پر ایک حاصل کریں
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan پر اپنے اسمارٹ کنٹریکٹ کی تصدیق کریں {#verify-your-smart-contract-on-etherscan}

یقینی بنائیں کہ تمام فائلیں محفوظ ہیں اور تمام `.env` متغیرات صحیح طریقے سے کنفیگر کیے گئے ہیں۔

`verify` ٹاسک چلائیں، کنٹریکٹ ایڈریس، اور جس نیٹ ورک پر یہ ڈیپلائے کیا گیا ہے اسے پاس کریں:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

یقینی بنائیں کہ `DEPLOYED_CONTRACT_ADDRESS` Goerli ٹیسٹ نیٹ ورک پر آپ کے ڈیپلائے کیے گئے اسمارٹ کنٹریکٹ کا ایڈریس ہے۔ اس کے علاوہ، آخری آرگیومنٹ (`'Hello World!'`) وہی اسٹرنگ قدر ہونی چاہیے جو [حصہ 1 میں ڈیپلائے مرحلے کے دوران](#write-our-deploy-script) استعمال کی گئی تھی۔

اگر سب کچھ ٹھیک رہا، تو آپ کو اپنے ٹرمینل میں درج ذیل پیغام نظر آئے گا:

```text
کنٹریکٹ کے لیے سورس کوڈ کامیابی سے جمع کر دیا گیا
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
Etherscan پر تصدیق کے لیے۔ تصدیق کے نتیجے کا انتظار ہے...


Etherscan پر HelloWorld کنٹریکٹ کامیابی سے تصدیق شدہ ہے۔
https://goerli.etherscan.io/address/<contract-address>#contracts
```

مبارک ہو! آپ کا اسمارٹ کنٹریکٹ کوڈ Etherscan پر ہے!

### Etherscan پر اپنا اسمارٹ کنٹریکٹ دیکھیں! {#check-out-your-smart-contract-on-etherscan}

جب آپ اپنے ٹرمینل میں فراہم کردہ لنک پر جاتے ہیں، تو آپ کو Etherscan پر اپنا اسمارٹ کنٹریکٹ کوڈ اور ABI شائع ہوتا نظر آنا چاہیے!

**واہو - آپ نے کر دکھایا چیمپئن! اب کوئی بھی آپ کے اسمارٹ کنٹریکٹ کو کال یا اس پر لکھ سکتا ہے! ہم یہ دیکھنے کے لیے انتظار نہیں کر سکتے کہ آپ اگلا کیا بناتے ہیں!**

## حصہ 4 - اپنے اسمارٹ کنٹریکٹ کو فرنٹ اینڈ کے ساتھ مربوط کرنا {#part-4-integrating-your-smart-contract-with-the-frontend}

اس ٹیوٹوریل کے آخر تک، آپ جان جائیں گے کہ کیسے:

- MetaMask والیٹ کو اپنے dapp سے جوڑیں
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API کا استعمال کرتے ہوئے اپنے اسمارٹ کنٹریکٹ سے ڈیٹا پڑھیں
- MetaMask کا استعمال کرتے ہوئے Ethereum ٹرانزیکشنز پر دستخط کریں

اس dapp کے لیے، ہم اپنے فرنٹ اینڈ فریم ورک کے طور پر [React](https://react.dev/) کا استعمال کریں گے؛ تاہم، یہ نوٹ کرنا ضروری ہے کہ ہم اس کی بنیادی باتوں کو توڑنے میں زیادہ وقت نہیں گزاریں گے، کیونکہ ہم زیادہ تر اپنے پروجیکٹ میں Web3 کی فعالیت لانے پر توجہ دیں گے۔

پیشگی شرط کے طور پر، آپ کو React کی مبتدی سطح کی سمجھ ہونی چاہیے۔ اگر نہیں، تو ہم سرکاری [React کا تعارف ٹیوٹوریل](https://react.dev/learn) مکمل کرنے کی سفارش کرتے ہیں۔

### اسٹارٹر فائلیں کلون کریں {#clone-the-starter-files}

سب سے پہلے، اس پروجیکٹ کے لیے اسٹارٹر فائلیں حاصل کرنے کے لیے [hello-world-part-four GitHub repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial) پر جائیں اور اس ریپوزٹری کو اپنی مقامی مشین پر کلون کریں۔

کلون کی گئی ریپوزٹری کو مقامی طور پر کھولیں۔ نوٹ کریں کہ اس میں دو فولڈرز ہیں: `starter-files` اور `completed`۔

- `starter-files`- **ہم اس ڈائرکٹری میں کام کریں گے**، ہم UI کو آپ کے Ethereum والیٹ اور اسمارٹ کنٹریکٹ سے جوڑیں گے جسے ہم نے [حصہ 3](#part-3) میں Etherscan پر شائع کیا تھا۔
- `completed` میں مکمل ٹیوٹوریل شامل ہے اور اسے صرف ایک حوالہ کے طور پر استعمال کیا جانا چاہئے اگر آپ پھنس جائیں۔

اگلا، اپنی `starter-files` کی کاپی کو اپنے پسندیدہ کوڈ ایڈیٹر میں کھولیں، اور پھر `src` فولڈر میں جائیں۔

ہمارا لکھا ہوا سارا کوڈ `src` فولڈر کے تحت رہے گا۔ ہم اپنے پروجیکٹ کو Web3 کی فعالیت دینے کے لیے `HelloWorld.js` جزو اور `util/interact.js` JavaScript فائلوں میں ترمیم کریں گے۔

### اسٹارٹر فائلیں چیک کریں {#check-out-the-starter-files}

کوڈنگ شروع کرنے سے پہلے، آئیے دریافت کریں کہ اسٹارٹر فائلوں میں ہمیں کیا فراہم کیا گیا ہے۔

#### اپنا react پروجیکٹ چلائیں {#get-your-react-project-running}

آئیے اپنے براؤزر میں React پروجیکٹ چلا کر شروع کریں۔ React کی خوبصورتی یہ ہے کہ ایک بار جب ہمارا پروجیکٹ ہمارے براؤزر میں چل رہا ہو، تو ہمارے ذریعے محفوظ کی گئی کوئی بھی تبدیلی ہمارے براؤزر میں لائیو اپ ڈیٹ ہو جائے گی۔

پروجیکٹ کو چلانے کے لیے، `starter-files` فولڈر کی روٹ ڈائرکٹری پر جائیں، اور پروجیکٹ کی انحصار کو انسٹال کرنے کے لیے اپنے ٹرمینل میں `npm install` چلائیں:

```bash
cd starter-files
npm install
```

ان کے انسٹال ہونے کے بعد، اپنے ٹرمینل میں `npm start` چلائیں:

```bash
npm start
```

ایسا کرنے سے آپ کے براؤزر میں [http://localhost:3000/](http://localhost:3000/) کھل جانا چاہیے، جہاں آپ کو ہمارے پروجیکٹ کا فرنٹ اینڈ نظر آئے گا۔ اس میں ایک فیلڈ (آپ کے اسمارٹ کنٹریکٹ میں محفوظ پیغام کو اپ ڈیٹ کرنے کی جگہ)، ایک "والیٹ جوڑیں" بٹن، اور ایک "اپ ڈیٹ" بٹن ہونا چاہیے۔

اگر آپ کسی بھی بٹن پر کلک کرنے کی کوشش کرتے ہیں، تو آپ دیکھیں گے کہ وہ کام نہیں کرتے ہیں - اس کی وجہ یہ ہے کہ ہمیں ابھی بھی ان کی فعالیت کو پروگرام کرنے کی ضرورت ہے۔

#### `HelloWorld.js` جزو {#the-helloworld-js-component}

آئیے اپنے ایڈیٹر میں `src` فولڈر میں واپس جائیں اور `HelloWorld.js` فائل کھولیں۔ یہ بہت ضروری ہے کہ ہم اس فائل میں ہر چیز کو سمجھیں، کیونکہ یہ بنیادی React کمپونینٹ ہے جس پر ہم کام کریں گے۔

اس فائل کے اوپری حصے میں، آپ دیکھیں گے کہ ہمارے پاس کئی درآمدی بیانات ہیں جو ہمارے پروجیکٹ کو چلانے کے لیے ضروری ہیں، بشمول React لائبریری، useEffect اور useState ہکس، `./util/interact.js` سے کچھ آئٹمز (ہم ان کی مزید تفصیلات جلد بیان کریں گے!)، اور Alchemy لوگو۔

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

اگلا، ہمارے پاس ہمارے ریاستی متغیرات ہیں جنہیں ہم مخصوص واقعات کے بعد اپ ڈیٹ کریں گے۔

```javascript
// HelloWorld.js

//ریاستی متغیرات
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("نیٹ ورک سے کوئی کنکشن نہیں ہے۔")
const [newMessage, setNewMessage] = useState("")
```

یہاں ہر متغیر کی نمائندگی کرتا ہے:

- `walletAddress` - ایک اسٹرنگ جو صارف کے والیٹ کا پتہ محفوظ کرتا ہے
- `status`- ایک اسٹرنگ جو ایک مددگار پیغام محفوظ کرتا ہے جو صارف کو dapp کے ساتھ تعامل کرنے کے طریقے کے بارے میں رہنمائی کرتا ہے
- `message` - ایک اسٹرنگ جو اسمارٹ کنٹریکٹ میں موجودہ پیغام کو محفوظ کرتا ہے
- `newMessage` - ایک اسٹرنگ جو نیا پیغام محفوظ کرتا ہے جو اسمارٹ کنٹریکٹ میں لکھا جائے گا

ریاستی متغیرات کے بعد، آپ کو پانچ غیر نافذ شدہ افعال نظر آئیں گے: `useEffect` ,`addSmartContractListener`, `addWalletListener` , `connectWalletPressed`, اور `onUpdatePressed`۔ ہم ذیل میں وضاحت کریں گے کہ وہ کیا کرتے ہیں:

```javascript
// HelloWorld.js

//صرف ایک بار کال کیا گیا
useEffect(async () => {
  //TODO: نافذ کریں
}, [])

function addSmartContractListener() {
  //TODO: نافذ کریں
}

function addWalletListener() {
  //TODO: نافذ کریں
}

const connectWalletPressed = async () => {
  //TODO: نافذ کریں
}

const onUpdatePressed = async () => {
  //TODO: نافذ کریں
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- یہ ایک React ہک ہے جسے آپ کے جزو کے رینڈر ہونے کے بعد کال کیا جاتا ہے۔ کیونکہ اس میں ایک خالی سرنی `[]` پراپ پاس کی گئی ہے (لائن 4 دیکھیں)، اسے صرف جزو کے _پہلے_ رینڈر پر کال کیا جائے گا۔ یہاں ہم اپنے اسمارٹ کنٹریکٹ میں محفوظ موجودہ پیغام کو لوڈ کریں گے، اپنے اسمارٹ کنٹریکٹ اور والیٹ سننے والوں کو کال کریں گے، اور اپنے UI کو اپ ڈیٹ کریں گے تاکہ یہ ظاہر ہو کہ آیا والیٹ پہلے سے جڑا ہوا ہے۔
- `addSmartContractListener`- یہ فنکشن ایک سننے والا سیٹ اپ کرتا ہے جو ہمارے HelloWorld کنٹریکٹ کے `UpdatedMessages` ایونٹ کو دیکھے گا اور جب ہمارے اسمارٹ کنٹریکٹ میں پیغام تبدیل ہو جائے گا تو ہمارے UI کو اپ ڈیٹ کرے گا۔
- `addWalletListener`- یہ فنکشن ایک سننے والا سیٹ اپ کرتا ہے جو صارف کے MetaMask والیٹ کی حالت میں تبدیلیوں کا پتہ لگاتا ہے، جیسے کہ جب صارف اپنا والیٹ منقطع کرتا ہے یا پتے تبدیل کرتا ہے۔
- `connectWalletPressed`- اس فنکشن کو صارف کے MetaMask والیٹ کو ہمارے dapp سے جوڑنے کے لیے کال کیا جائے گا۔
- `onUpdatePressed` - اس فنکشن کو اس وقت کال کیا جائے گا جب صارف اسمارٹ کنٹریکٹ میں محفوظ پیغام کو اپ ڈیٹ کرنا چاہے گا۔

اس فائل کے آخر کے قریب، ہمارے پاس ہمارے کمپونینٹ کا UI ہے۔

```javascript
// HelloWorld.js

//ہمارے جزو کا UI
return (
  <div id="container">
    <img id="logo" src={alchemylogo}></img>
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "منسلک: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>والیٹ جوڑیں</span>
      )}
    </button>

    <h2 style={{ paddingTop: "50px" }}>موجودہ پیغام:</h2>
    <p>{message}</p>

    <h2 style={{ paddingTop: "18px" }}>نیا پیغام:</h2>

    <div>
      <input
        type="text"
        placeholder="اپنے اسمارٹ کنٹریکٹ میں پیغام کو اپ ڈیٹ کریں۔"
        onChange={(e) => setNewMessage(e.target.value)}
        value={newMessage}
      />
      <p id="status">{status}</p>

      <button id="publishButton" onClick={onUpdatePressed}>
        اپ ڈیٹ
      </button>
    </div>
  </div>
)
```

اگر آپ اس کوڈ کو احتیاط سے اسکین کرتے ہیں، تو آپ دیکھیں گے کہ ہم اپنے UI میں اپنے مختلف ریاستی متغیرات کہاں استعمال کرتے ہیں:

- لائن 6-12 پر، اگر صارف کا والیٹ جڑا ہوا ہے (یعنی، `walletAddress.length > 0`)، تو ہم ID "walletButton" والے بٹن میں صارف کے `walletAddress` کا ایک چھوٹا ورژن دکھاتے ہیں؛ ورنہ یہ صرف "والیٹ جوڑیں" کہتا ہے۔
- لائن 17 پر، ہم اسمارٹ کنٹریکٹ میں محفوظ موجودہ پیغام دکھاتے ہیں، جو `message` اسٹرنگ میں پکڑا گیا ہے۔
- لائن 23-26 پر، ہم اپنے `newMessage` ریاستی متغیر کو اپ ڈیٹ کرنے کے لیے ایک [کنٹرولڈ جزو](https://legacy.reactjs.org/docs/forms.html#controlled-components) استعمال کرتے ہیں جب ٹیکسٹ فیلڈ میں ان پٹ تبدیل ہوتا ہے۔

ہمارے ریاستی متغیرات کے علاوہ، آپ یہ بھی دیکھیں گے کہ `connectWalletPressed` اور `onUpdatePressed` افعال کو اس وقت کال کیا جاتا ہے جب IDs `publishButton` اور `walletButton` والے بٹنوں پر بالترتیب کلک کیا جاتا ہے۔

آخر میں، آئیے اس بات پر توجہ دیں کہ یہ `HelloWorld.js` جزو کہاں شامل کیا گیا ہے۔

اگر آپ `App.js` فائل پر جاتے ہیں، جو React میں مرکزی جزو ہے جو دیگر تمام اجزاء کے لیے کنٹینر کے طور پر کام کرتا ہے، تو آپ دیکھیں گے کہ ہمارا `HelloWorld.js` جزو لائن 7 پر داخل کیا گیا ہے۔

آخری لیکن کم از کم، آئیے ایک اور فائل چیک کریں جو آپ کے لیے فراہم کی گئی ہے، `interact.js` فائل۔

#### `interact.js` فائل {#the-interact-js-file}

چونکہ ہم [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) پیراڈائم کی پیروی کرنا چاہتے ہیں، ہم ایک الگ فائل چاہیں گے جس میں ہمارے dapp کی منطق، ڈیٹا، اور قوانین کا انتظام کرنے کے لیے ہمارے تمام افعال شامل ہوں، اور پھر ان افعال کو ہمارے فرنٹ اینڈ (ہمارا `HelloWorld.js` جزو) میں برآمد کرنے کے قابل ہوں۔

👆🏽یہ ہماری `interact.js` فائل کا عین مقصد ہے!

اپنی `src` ڈائرکٹری میں `util` فولڈر پر جائیں، اور آپ دیکھیں گے کہ ہم نے `interact.js` نامی ایک فائل شامل کی ہے جس میں ہمارے تمام اسمارٹ کنٹریکٹ تعامل اور والیٹ افعال اور متغیرات شامل ہوں گے۔

```javascript
// interact.js

//export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

آپ دیکھیں گے کہ فائل کے اوپری حصے میں، ہم نے `helloWorldContract` آبجیکٹ پر تبصرہ کیا ہے۔ بعد میں اس ٹیوٹوریل میں، ہم اس آبجیکٹ کو غیر تبصرہ کریں گے اور اس متغیر میں اپنے اسمارٹ کنٹریکٹ کو انسٹینٹی ایٹ کریں گے، جسے ہم پھر اپنے `HelloWorld.js` جزو میں برآمد کریں گے۔

ہمارے `helloWorldContract` آبجیکٹ کے بعد چار غیر نافذ شدہ افعال درج ذیل کام کرتے ہیں:

- `loadCurrentMessage` - یہ فنکشن اسمارٹ کنٹریکٹ میں محفوظ موجودہ پیغام کو لوڈ کرنے کی منطق کو سنبھالتا ہے۔ یہ [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) کا استعمال کرتے ہوئے ہیلو ورلڈ اسمارٹ کنٹریکٹ پر ایک _ریڈ_ کال کرے گا۔
- `connectWallet` - یہ فنکشن صارف کے MetaMask کو ہمارے dapp سے جوڑے گا۔
- `getCurrentWalletConnected` - یہ فنکشن چیک کرے گا کہ آیا کوئی Ethereum اکاؤنٹ پہلے سے ہی صفحہ لوڈ پر ہمارے dapp سے جڑا ہوا ہے اور ہمارے UI کو اسی کے مطابق اپ ڈیٹ کرے گا۔
- `updateMessage` - یہ فنکشن اسمارٹ کنٹریکٹ میں محفوظ پیغام کو اپ ڈیٹ کرے گا۔ یہ ہیلو ورلڈ اسمارٹ کنٹریکٹ پر ایک _رائٹ_ کال کرے گا، لہذا صارف کے MetaMask والیٹ کو پیغام کو اپ ڈیٹ کرنے کے لیے ایک Ethereum ٹرانزیکشن پر دستخط کرنا ہوگا۔

اب جب کہ ہم سمجھ گئے ہیں کہ ہم کس کے ساتھ کام کر رہے ہیں، آئیے یہ معلوم کریں کہ اپنے اسمارٹ کنٹریکٹ سے کیسے پڑھا جائے!

### مرحلہ 3: اپنے اسمارٹ کنٹریکٹ سے پڑھیں {#step-3-read-from-your-smart-contract}

اپنے اسمارٹ کنٹریکٹ سے پڑھنے کے لیے، آپ کو کامیابی سے سیٹ اپ کرنے کی ضرورت ہوگی:

- Ethereum چین سے ایک API کنکشن
- آپ کے اسمارٹ کنٹریکٹ کی ایک لوڈ شدہ مثال
- آپ کے اسمارٹ کنٹریکٹ فنکشن کو کال کرنے کے لیے ایک فنکشن
- ایک سننے والا جو اپ ڈیٹس کے لیے دیکھتا ہے جب آپ اسمارٹ کنٹریکٹ سے پڑھ رہے ڈیٹا میں تبدیلی آتی ہے

یہ بہت سارے مراحل لگ سکتے ہیں، لیکن فکر نہ کریں! ہم آپ کو ہر ایک کو قدم بہ قدم کرنے کا طریقہ بتائیں گے! :\)

#### Ethereum چین سے ایک API کنکشن قائم کریں {#establish-an-api-connection-to-the-ethereum-chain}

تو یاد ہے کہ اس ٹیوٹوریل کے حصہ 2 میں، ہم نے اپنے اسمارٹ کنٹریکٹ سے پڑھنے کے لیے اپنی [Alchemy Web3 کلید کا استعمال کیا تھا](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)؟ آپ کو اپنے dapp میں چین سے پڑھنے کے لیے بھی ایک Alchemy Web3 کلید کی ضرورت ہوگی۔

اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو پہلے [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) انسٹال کریں، اپنی `starter-files` کی روٹ ڈائرکٹری پر جائیں اور اپنے ٹرمینل میں درج ذیل کو چلائیں:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) [Web3.js](https://docs.web3js.org/) کے ارد گرد ایک ریپر ہے، جو بہتر API طریقے اور دیگر اہم فوائد فراہم کرتا ہے تاکہ آپ کی زندگی کو ایک web3 ڈیولپر کے طور پر آسان بنایا جا سکے۔ یہ کم سے کم کنفیگریشن کی ضرورت کے لیے ڈیزائن کیا گیا ہے تاکہ آپ اسے اپنی ایپ میں فوراً استعمال کرنا شروع کر سکیں!

پھر، اپنے پروجیکٹ ڈائرکٹری میں [dotenv](https://www.npmjs.com/package/dotenv) پیکیج انسٹال کریں، تاکہ ہمارے پاس اپنی API کلید کو حاصل کرنے کے بعد اسے محفوظ کرنے کے لیے ایک محفوظ جگہ ہو۔

```text
npm install dotenv --save
```

ہمارے dapp کے لیے، **ہم اپنی HTTP API کلید کے بجائے اپنی Websockets API کلید کا استعمال کریں گے**، کیونکہ یہ ہمیں ایک سننے والا سیٹ اپ کرنے کی اجازت دے گا جو اس وقت پتہ لگاتا ہے جب اسمارٹ کنٹریکٹ میں محفوظ پیغام تبدیل ہوتا ہے۔

ایک بار جب آپ کے پاس اپنی API کلید ہو، تو اپنی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں اور اس میں اپنا Alchemy Websockets url شامل کریں۔ اس کے بعد، آپ کی `.env` فائل اس طرح نظر آنی چاہیے:

```javascript
REACT_APP_ALCHEMY_KEY = wss://eth-goerli.ws.alchemyapi.io/v2/<key>
```

اب، ہم اپنے dapp میں اپنا Alchemy Web3 اینڈ پوائنٹ سیٹ اپ کرنے کے لیے تیار ہیں! آئیے اپنی `interact.js` پر واپس جائیں، جو ہمارے `util` فولڈر کے اندر نیسٹڈ ہے اور فائل کے اوپری حصے میں درج ذیل کوڈ شامل کریں:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

//export const helloWorldContract;
```

اوپر، ہم نے پہلے اپنی `.env` فائل سے Alchemy کلید درآمد کی اور پھر اپنا Alchemy Web3 اینڈ پوائنٹ قائم کرنے کے لیے اپنی `alchemyKey` کو `createAlchemyWeb3` میں پاس کیا۔

اس اینڈ پوائنٹ کے تیار ہونے کے ساتھ، اب وقت آگیا ہے کہ ہم اپنا اسمارٹ کنٹریکٹ لوڈ کریں!

#### اپنا ہیلو ورلڈ اسمارٹ کنٹریکٹ لوڈ کرنا {#loading-your-hello-world-smart-contract}

اپنے ہیلو ورلڈ اسمارٹ کنٹریکٹ کو لوڈ کرنے کے لیے، آپ کو اس کا کنٹریکٹ ایڈریس اور ABI کی ضرورت ہوگی، جو دونوں Etherscan پر مل سکتے ہیں اگر آپ نے [اس ٹیوٹوریل کا حصہ 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) مکمل کیا ہو۔

#### Etherscan سے اپنا کنٹریکٹ ABI کیسے حاصل کریں {#how-to-get-your-contract-abi-from-etherscan}

اگر آپ نے اس ٹیوٹوریل کا حصہ 3 چھوڑ دیا ہے، تو آپ HelloWorld کنٹریکٹ کا استعمال کر سکتے ہیں جس کا ایڈریس [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) ہے۔ اس کا ABI [یہاں](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) پایا جا سکتا ہے۔

ایک کنٹریکٹ ABI اس بات کی وضاحت کے لیے ضروری ہے کہ کنٹریکٹ کس فنکشن کو کال کرے گا اور یہ بھی یقینی بناتا ہے کہ فنکشن آپ کی توقع کے مطابق فارمیٹ میں ڈیٹا واپس کرے گا۔ ایک بار جب ہم اپنا کنٹریکٹ ABI کاپی کر لیں، تو آئیے اسے اپنی `src` ڈائرکٹری میں `contract-abi.json` نامی JSON فائل کے طور پر محفوظ کریں۔

آپ کی contract-abi.json فائل آپ کی src فولڈر میں محفوظ ہونی چاہیے۔

ہمارے کنٹریکٹ ایڈریس، ABI، اور Alchemy Web3 اینڈ پوائنٹ سے لیس، ہم اپنے اسمارٹ کنٹریکٹ کی ایک مثال لوڈ کرنے کے لیے [کنٹریکٹ میتھڈ](https://docs.web3js.org/api/web3-eth-contract/class/Contract) کا استعمال کر سکتے ہیں۔ `interact.js` فائل میں اپنا کنٹریکٹ ABI درآمد کریں اور اپنا کنٹریکٹ ایڈریس شامل کریں۔

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

اب ہم آخر کار اپنے `helloWorldContract` متغیر کو غیر تبصرہ کر سکتے ہیں، اور اپنے AlchemyWeb3 اینڈ پوائنٹ کا استعمال کرتے ہوئے اسمارٹ کنٹریکٹ کو لوڈ کر سکتے ہیں:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

خلاصہ کرنے کے لیے، آپ کی `interact.js` کی پہلی 12 لائنیں اب اس طرح نظر آنی چاہئیں:

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

اب جب کہ ہمارا کنٹریکٹ لوڈ ہو گیا ہے، ہم اپنا `loadCurrentMessage` فنکشن نافذ کر سکتے ہیں!

#### اپنی `interact.js` فائل میں `loadCurrentMessage` کو نافذ کرنا {#implementing-loadCurrentMessage-in-your-interact-js-file}

یہ فنکشن بہت سادہ ہے۔ ہم اپنے کنٹریکٹ سے پڑھنے کے لیے ایک سادہ غیر مطابقت پذیر web3 کال کریں گے۔ ہمارا فنکشن اسمارٹ کنٹریکٹ میں محفوظ پیغام کو واپس کرے گا:

اپنی `interact.js` فائل میں `loadCurrentMessage` کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

چونکہ ہم اس اسمارٹ کنٹریکٹ کو اپنے UI میں دکھانا چاہتے ہیں، آئیے اپنے `HelloWorld.js` جزو میں `useEffect` فنکشن کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// HelloWorld.js

//صرف ایک بار کال کیا گیا
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

نوٹ کریں، ہم صرف یہ چاہتے ہیں کہ ہمارا `loadCurrentMessage` جزو کے پہلے رینڈر کے دوران ایک بار کال کیا جائے۔ ہم جلد ہی `addSmartContractListener` نافذ کریں گے تاکہ اسمارٹ کنٹریکٹ میں پیغام تبدیل ہونے کے بعد UI خود بخود اپ ڈیٹ ہو جائے۔

اس سے پہلے کہ ہم اپنے سننے والے میں غوطہ لگائیں، آئیے دیکھتے ہیں کہ ہمارے پاس اب تک کیا ہے۔ اپنی `HelloWorld.js` اور `interact.js` فائلیں محفوظ کریں، اور پھر [http://localhost:3000/](http://localhost:3000/) پر جائیں۔

آپ دیکھیں گے کہ موجودہ پیغام اب "نیٹ ورک سے کوئی کنکشن نہیں ہے" نہیں کہتا۔ اس کے بجائے یہ اسمارٹ کنٹریکٹ میں محفوظ پیغام کی عکاسی کرتا ہے۔ زبردست!

#### آپ کا UI اب اسمارٹ کنٹریکٹ میں محفوظ پیغام کی عکاسی کرنا چاہئے {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

اب اس سننے والے کی بات کرتے ہیں...

#### `addSmartContractListener` نافذ کریں {#implement-addsmartcontractlistener}

اگر آپ اس ٹیوٹوریل سیریز کے [حصہ 1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) میں لکھی گئی `HelloWorld.sol` فائل کو یاد کریں، تو آپ کو یاد ہوگا کہ `UpdatedMessages` نامی ایک اسمارٹ کنٹریکٹ ایونٹ ہے جو ہمارے اسمارٹ کنٹریکٹ کے `update` فنکشن کو کال کرنے کے بعد خارج ہوتا ہے (لائن 9 اور 27 دیکھیں):

```javascript
// HelloWorld.sol

// Solidity کے ورژن کی وضاحت کرتا ہے، سیمنٹک ورژننگ کا استعمال کرتے ہوئے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` نامی ایک کنٹریکٹ کی وضاحت کرتا ہے۔
// ایک کنٹریکٹ فنکشنز اور ڈیٹا (اس کی حالت) کا ایک مجموعہ ہے۔ ایک بار ڈیپلائے ہونے کے بعد، ایک کنٹریکٹ Ethereum بلاک چین پر ایک مخصوص ایڈریس پر رہتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //اپ ڈیٹ فنکشن کال ہونے پر جاری کیا جاتا ہے
   //اسمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر آپ کے ایپ فرنٹ اینڈ پر کچھ ہوا ہے، جو کچھ ایونٹس کے لیے 'سن' سکتا ہے اور جب وہ ہوتے ہیں تو کارروائی کر سکتا ہے۔
   event UpdatedMessages(string oldStr, string newStr);

   // `string` قسم کے `message` نامی ایک اسٹیٹ متغیر کا اعلان کرتا ہے۔
   // اسٹیٹ متغیرات وہ متغیرات ہیں جن کی قدریں کنٹریکٹ اسٹوریج میں مستقل طور پر محفوظ ہوتی ہیں۔ کلیدی لفظ `public` متغیرات کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس قدر تک رسائی کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، ایک کنسٹرکٹر ایک خاص فنکشن ہے جو صرف کنٹریکٹ کی تخلیق پر عمل میں لایا جاتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو شروع کرنے کے لیے کیا جاتا ہے۔ مزید جانیں:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک اسٹرنگ آرگیومنٹ `initMessage` کو قبول کرتا ہے اور قدر کو کنٹریکٹ کے `message` اسٹوریج متغیر میں سیٹ کرتا ہے۔
      message = initMessage;
   }

   // ایک عوامی فنکشن جو ایک اسٹرنگ آرگیومنٹ کو قبول کرتا ہے اور `message` اسٹوریج متغیر کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

اسمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر کچھ ہوا ہے (یعنی، ایک _ایونٹ_ تھا) آپ کی فرنٹ اینڈ ایپلیکیشن کو، جو مخصوص ایونٹس کے لیے 'سن' سکتی ہے اور جب وہ ہوتے ہیں تو کارروائی کر سکتی ہے۔

`addSmartContractListener` فنکشن خاص طور پر ہمارے ہیلو ورلڈ اسمارٹ کنٹریکٹ کے `UpdatedMessages` ایونٹ کو سنے گا، اور ہمارے UI کو نیا پیغام دکھانے کے لیے اپ ڈیٹ کرے گا۔

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
      setStatus("🎉 آپ کا پیغام اپ ڈیٹ ہو گیا ہے!")
    }
  })
}
```

آئیے دیکھتے ہیں کہ جب سننے والا کسی ایونٹ کا پتہ لگاتا ہے تو کیا ہوتا ہے:

- اگر ایونٹ کے خارج ہونے پر کوئی خرابی ہوتی ہے، تو یہ ہمارے `status` ریاستی متغیر کے ذریعے UI میں ظاہر ہوگی۔
- ورنہ، ہم واپس کیے گئے `data` آبجیکٹ کا استعمال کریں گے۔ `data.returnValues` ایک صفر پر انڈیکس شدہ سرنی ہے جہاں سرنی میں پہلا عنصر پچھلا پیغام اور دوسرا عنصر اپ ڈیٹ شدہ پیغام کو محفوظ کرتا ہے۔ مجموعی طور پر، ایک کامیاب ایونٹ پر ہم اپنی `message` اسٹرنگ کو اپ ڈیٹ شدہ پیغام پر سیٹ کریں گے، `newMessage` اسٹرنگ کو صاف کریں گے، اور اپنی `status` ریاستی متغیر کو اپ ڈیٹ کریں گے تاکہ یہ ظاہر ہو کہ ہمارے اسمارٹ کنٹریکٹ پر ایک نیا پیغام شائع ہوا ہے۔

آخر میں، آئیے اپنے `useEffect` فنکشن میں اپنے سننے والے کو کال کریں تاکہ یہ `HelloWorld.js` جزو کے پہلے رینڈر پر شروع ہو۔ مجموعی طور پر، آپ کا `useEffect` فنکشن اس طرح نظر آنا چاہیے:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

اب جب کہ ہم اپنے اسمارٹ کنٹریکٹ سے پڑھنے کے قابل ہیں، یہ بہت اچھا ہوگا کہ یہ معلوم کیا جائے کہ اس پر کیسے لکھا جائے! تاہم، اپنے dapp پر لکھنے کے لیے، ہمارے پاس پہلے ایک Ethereum والیٹ اس سے جڑا ہونا چاہیے۔

لہذا، اگلا ہم اپنا Ethereum والیٹ (MetaMask) سیٹ اپ کرنے اور پھر اسے اپنے dapp سے جوڑنے کا کام کریں گے!

### مرحلہ 4: اپنا Ethereum والیٹ سیٹ اپ کریں {#step-4-set-up-your-ethereum-wallet}

Ethereum چین پر کچھ بھی لکھنے کے لیے، صارفین کو اپنی ورچوئل والیٹ کی پرائیویٹ کیز کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کرنا ہوگا۔ اس ٹیوٹوریل کے لیے، ہم [MetaMask](https://metamask.io/) کا استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جو آپ کے Ethereum اکاؤنٹ کے پتے کا انتظام کرنے کے لیے استعمال ہوتا ہے، کیونکہ یہ اس ٹرانزیکشن پر دستخط کو آخری صارف کے لیے بہت آسان بنا دیتا ہے۔

اگر آپ یہ سمجھنا چاہتے ہیں کہ Ethereum پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو Ethereum فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

#### MetaMask ڈاؤن لوڈ کریں {#download-metamask}

آپ [یہاں](https://metamask.io/download) مفت میں MetaMask اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ ایک اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی ایک اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں کونے میں "Goerli ٹیسٹ نیٹ ورک" پر سوئچ کریں (تاکہ ہم اصلی پیسے سے نمٹ نہ رہے ہوں)۔

#### ایک فوسیٹ سے ایتھر شامل کریں {#add-ether-from-a-faucet}

Ethereum بلاک چین پر ایک ٹرانزیکشن پر دستخط کرنے کے لیے، ہمیں کچھ جعلی Eth کی ضرورت ہوگی۔ Eth حاصل کرنے کے لیے آپ [FaucETH](https://fauceth.komputing.org) پر جا سکتے ہیں اور اپنا Goerli اکاؤنٹ ایڈریس درج کر سکتے ہیں، "فنڈز کی درخواست کریں" پر کلک کریں، پھر ڈراپ ڈاؤن میں "Ethereum Testnet Goerli" منتخب کریں اور آخر میں "فنڈز کی درخواست کریں" بٹن کو دوبارہ کلک کریں۔ اس کے فوراً بعد آپ کو اپنے MetaMask اکاؤنٹ میں Eth نظر آنا چاہیے!

#### اپنا بیلنس چیک کریں {#check-your-balance}

ہمارا بیلنس موجود ہے یا نہیں اس کی دوبارہ جانچ کرنے کے لیے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) کی درخواست کریں۔ یہ ہمارے والیٹ میں Eth کی رقم واپس کرے گا۔ اپنے MetaMask اکاؤنٹ کا ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**نوٹ:** یہ نتیجہ wei میں ہے eth میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے eth میں تبدیلی یہ ہے: 1 eth = 10¹⁸ wei۔ تو اگر ہم 0xde0b6b3a7640000 کو اعشاریہ میں تبدیل کرتے ہیں تو ہمیں 1\*10¹⁸ ملتا ہے جو 1 eth کے برابر ہے۔

اف! ہمارا جعلی پیسہ سب وہیں ہے! 🤑

### مرحلہ 5: MetaMask کو اپنے UI سے جوڑیں {#step-5-connect-metamask-to-your-UI}

اب جب کہ ہمارا MetaMask والیٹ سیٹ اپ ہو گیا ہے، آئیے اپنے dApp کو اس سے جوڑتے ہیں!

#### `connectWallet` فنکشن {#the-connectWallet-function}

ہماری `interact.js` فائل میں، آئیے `connectWallet` فنکشن کو نافذ کریں، جسے ہم پھر اپنے `HelloWorld.js` جزو میں کال کر سکتے ہیں۔

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
        status: "👆🏽 اوپر ٹیکسٹ فیلڈ میں ایک پیغام لکھیں۔",
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
              آپ کو اپنے براؤزر میں MetaMask، ایک ورچوئل Ethereum والیٹ، انسٹال کرنا ہوگا۔
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

تو کوڈ کا یہ بڑا بلاک بالکل کیا کرتا ہے؟

پہلے، یہ چیک کرتا ہے کہ آیا آپ کے براؤزر میں `window.ethereum` فعال ہے۔

`window.ethereum` MetaMask اور دیگر والیٹ فراہم کنندگان کے ذریعے انجیکٹ کردہ ایک عالمی API ہے جو ویب سائٹس کو صارفین کے Ethereum اکاؤنٹس کی درخواست کرنے کی اجازت دیتا ہے۔ اگر منظور ہو جائے، تو یہ ان بلاک چینز سے ڈیٹا پڑھ سکتا ہے جن سے صارف جڑا ہوا ہے، اور صارف کو پیغامات اور ٹرانزیکشنز پر دستخط کرنے کا مشورہ دے سکتا ہے۔ مزید معلومات کے لیے [MetaMask دستاویزات](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) دیکھیں!

اگر `window.ethereum` موجود _نہیں_ ہے، تو اس کا مطلب ہے کہ MetaMask انسٹال نہیں ہے۔ اس کے نتیجے میں ایک JSON آبجیکٹ واپس کیا جاتا ہے، جہاں واپس کیا گیا `address` ایک خالی اسٹرنگ ہوتا ہے، اور `status` JSX آبجیکٹ یہ بتاتا ہے کہ صارف کو MetaMask انسٹال کرنا ہوگا۔

اب اگر `window.ethereum` موجود _ہے_، تو یہ وہ جگہ ہے جہاں چیزیں دلچسپ ہو جاتی ہیں۔

ایک try/catch لوپ کا استعمال کرتے ہوئے، ہم [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) کو کال کرکے MetaMask سے جڑنے کی کوشش کریں گے۔ اس فنکشن کو کال کرنے سے براؤزر میں MetaMask کھل جائے گا، جس کے تحت صارف سے اپنے والیٹ کو آپ کے dApp سے جوڑنے کا کہا جائے گا۔

- اگر صارف جڑنے کا انتخاب کرتا ہے، تو `method: "eth_requestAccounts"` ایک سرنی واپس کرے گا جس میں صارف کے تمام اکاؤنٹ پتے شامل ہوں گے جو dapp سے جڑے ہوئے ہیں۔ مجموعی طور پر، ہمارا `connectWallet` فنکشن ایک JSON آبجیکٹ واپس کرے گا جس میں اس اری کا _پہلا_ `address` (لائن 9 دیکھیں) اور ایک `status` پیغام ہوگا جو صارف کو اسمارٹ کنٹریکٹ کے لیے ایک پیغام لکھنے کا کہے گا۔
- اگر صارف کنکشن کو مسترد کر دیتا ہے، تو JSON آبجیکٹ میں واپس کیے گئے `address` کے لیے ایک خالی اسٹرنگ اور ایک `status` پیغام ہوگا جو یہ ظاہر کرے گا کہ صارف نے کنکشن کو مسترد کر دیا ہے۔

اب جب کہ ہم نے یہ `connectWallet` فنکشن لکھ لیا ہے، اگلا مرحلہ اسے اپنے `HelloWorld.js` جزو میں کال کرنا ہے۔

#### `connectWallet` فنکشن کو اپنے `HelloWorld.js` UI جزو میں شامل کریں {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js` میں `connectWalletPressed` فنکشن پر جائیں، اور اسے درج ذیل میں اپ ڈیٹ کریں:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

نوٹ کریں کہ ہماری زیادہ تر فعالیت `interact.js` فائل سے ہمارے `HelloWorld.js` جزو سے کس طرح تجرید کی گئی ہے؟ یہ اس لیے ہے تاکہ ہم M-V-C پیراڈائم کی تعمیل کریں!

`connectWalletPressed` میں، ہم صرف اپنے امپورٹ کردہ `connectWallet` فنکشن پر ایک await کال کرتے ہیں، اور اس کے جواب کا استعمال کرتے ہوئے، ہم اپنے `status` اور `walletAddress` متغیرات کو ان کے اسٹیٹ ہکس کے ذریعے اپ ڈیٹ کرتے ہیں۔

اب، آئیے دونوں فائلیں (`HelloWorld.js` اور `interact.js`) محفوظ کریں اور اب تک اپنے UI کی جانچ کریں۔

[http://localhost:3000/](http://localhost:3000/) صفحے پر اپنا براؤزر کھولیں، اور صفحے کے اوپری دائیں کونے میں "والیٹ جوڑیں" بٹن دبائیں۔

اگر آپ نے MetaMask انسٹال کیا ہوا ہے، تو آپ سے اپنے والیٹ کو اپنے dApp سے جوڑنے کا کہا جائے گا۔ جڑنے کی دعوت قبول کریں۔

آپ کو دیکھنا چاہئے کہ والیٹ بٹن اب یہ ظاہر کرتا ہے کہ آپ کا پتہ جڑا ہوا ہے! بہت خوب 🔥

اگلا، صفحہ کو ریفریش کرنے کی کوشش کریں... یہ عجیب ہے۔ ہمارا والیٹ بٹن ہمیں MetaMask سے جڑنے کا کہہ رہا ہے، حالانکہ یہ پہلے سے ہی جڑا ہوا ہے...

تاہم، کوئی خوف نہیں! ہم اسے آسانی سے حل کر سکتے ہیں (سمجھے؟) `getCurrentWalletConnected` کو نافذ کرکے، جو یہ چیک کرے گا کہ آیا کوئی پتہ پہلے سے ہی ہمارے dapp سے جڑا ہوا ہے اور ہمارے UI کو اسی کے مطابق اپ ڈیٹ کرے گا!

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
          status: "👆🏽 اوپر ٹیکسٹ فیلڈ میں ایک پیغام لکھیں۔",
        }
      } else {
        return {
          address: "",
          status: "🦊 اوپر دائیں بٹن کا استعمال کرتے ہوئے MetaMask سے جڑیں۔",
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
              آپ کو اپنے براؤزر میں MetaMask، ایک ورچوئل Ethereum والیٹ، انسٹال کرنا ہوگا۔
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

یہ کوڈ _بہت_ ملتا جلتا ہے `connectWallet` فنکشن سے جو ہم نے پچھلے مرحلے میں لکھا تھا۔

بنیادی فرق یہ ہے کہ `eth_requestAccounts` میتھڈ کو کال کرنے کے بجائے، جو صارف کے لیے اپنے والیٹ کو جوڑنے کے لیے MetaMask کھولتا ہے، یہاں ہم `eth_accounts` میتھڈ کو کال کرتے ہیں، جو صرف ایک اری واپس کرتا ہے جس میں فی الحال ہمارے dApp سے جڑے ہوئے MetaMask پتے ہوتے ہیں۔

اس فنکشن کو عمل میں دیکھنے کے لیے، آئیے اسے اپنے `HelloWorld.js` جزو کے `useEffect` فنکشن میں کال کریں:

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

نوٹ کریں، ہم اپنے `walletAddress` اور `status` اسٹیٹ متغیرات کو اپ ڈیٹ کرنے کے لیے `getCurrentWalletConnected` پر اپنی کال کے جواب کا استعمال کرتے ہیں۔

اب جب کہ آپ نے یہ کوڈ شامل کر دیا ہے، آئیے اپنے براؤزر ونڈو کو ریفریش کرنے کی کوشش کریں۔

بہت اچھے! بٹن کو کہنا چاہیے کہ آپ جڑے ہوئے ہیں، اور آپ کے جڑے ہوئے والیٹ کے پتے کا ایک پیش نظارہ دکھانا چاہیے - یہاں تک کہ آپ کے ریفریش کرنے کے بعد بھی!

#### `addWalletListener` نافذ کریں {#implement-addwalletlistener}

ہمارے dApp والیٹ سیٹ اپ کا آخری مرحلہ والیٹ لسنر کو نافذ کرنا ہے تاکہ جب ہمارے والیٹ کی حالت تبدیل ہو تو ہمارا UI اپ ڈیٹ ہو، جیسے جب صارف منقطع ہوتا ہے یا اکاؤنٹس تبدیل کرتا ہے۔

اپنی `HelloWorld.js` فائل میں، اپنے `addWalletListener` فنکشن کو درج ذیل میں تبدیل کریں:

```javascript
// HelloWorld.js

function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 اوپر ٹیکسٹ فیلڈ میں ایک پیغام لکھیں۔")
      } else {
        setWallet("")
        setStatus("🦊 اوپر دائیں بٹن کا استعمال کرتے ہوئے MetaMask سے جڑیں۔")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          آپ کو اپنے براؤزر میں MetaMask، ایک ورچوئل Ethereum والیٹ، انسٹال کرنا ہوگا۔
        </a>
      </p>
    )
  }
}
```

مجھے شرط ہے کہ آپ کو اس مقام پر کیا ہو رہا ہے یہ سمجھنے کے لیے ہماری مدد کی بھی ضرورت نہیں ہے، لیکن مکمل ہونے کی خاطر، آئیے اسے جلدی سے توڑتے ہیں:

- سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا `window.ethereum` فعال ہے (یعنی، MetaMask انسٹال ہے)۔
  - اگر ایسا نہیں ہے، تو ہم صرف اپنے `status` اسٹیٹ متغیر کو ایک JSX اسٹرنگ پر سیٹ کرتے ہیں جو صارف کو MetaMask انسٹال کرنے کا کہتا ہے۔
  - اگر یہ فعال ہے، تو ہم لائن 3 پر لسنر `window.ethereum.on("accountsChanged")` سیٹ اپ کرتے ہیں جو MetaMask والیٹ میں اسٹیٹ تبدیلیوں کو سنتا ہے، جس میں یہ شامل ہے کہ جب صارف dApp سے ایک اضافی اکاؤنٹ جوڑتا ہے، اکاؤنٹس تبدیل کرتا ہے، یا ایک اکاؤنٹ منقطع کرتا ہے۔ اگر کم از کم ایک اکاؤنٹ جڑا ہوا ہے، تو `walletAddress` اسٹیٹ متغیر کو لسنر کے ذریعے واپس کیے گئے `accounts` اری میں پہلے اکاؤنٹ کے طور پر اپ ڈیٹ کیا جاتا ہے۔ ورنہ، `walletAddress` کو ایک خالی اسٹرنگ کے طور پر سیٹ کیا جاتا ہے۔

آخری لیکن کم از کم، ہمیں اسے اپنے `useEffect` فنکشن میں کال کرنا ہوگا:

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

اور بس! ہم نے کامیابی سے اپنی تمام والیٹ کی فعالیت کی پروگرامنگ مکمل کر لی ہے! اب اپنے آخری کام کی طرف: اپنے اسمارٹ کنٹریکٹ میں محفوظ پیغام کو اپ ڈیٹ کرنا!

### مرحلہ 6: `updateMessage` فنکشن نافذ کریں {#step-6-implement-the-updateMessage-function}

ٹھیک ہے فیم، ہم آخری مرحلے پر پہنچ گئے ہیں! اپنی `interact.js` فائل کے `updateMessage` میں، ہم درج ذیل کام کرنے جا رہے ہیں:

1. یقینی بنائیں کہ وہ پیغام جسے ہم اپنے اسمارٹ رابطہ میں شائع کرنا چاہتے ہیں، درست ہے
2. MetaMask کا استعمال کرتے ہوئے اپنے ٹرانزیکشن پر دستخط کریں
3. اس فنکشن کو ہمارے `HelloWorld.js` فرنٹ اینڈ جزو سے کال کریں

اس میں زیادہ وقت نہیں لگے گا؛ آئیے اس dapp کو مکمل کریں!

#### ان پٹ کی خرابی کو ہینڈل کرنا {#input-error-handling}

فطری طور پر، فنکشن کے آغاز میں کسی قسم کا ان پٹ ایرر ہینڈلنگ ہونا معنی خیز ہے۔

ہم چاہیں گے کہ ہمارا فنکشن جلد واپس آ جائے اگر کوئی MetaMask ایکسٹینشن انسٹال نہیں ہے، کوئی والیٹ جڑا ہوا نہیں ہے (یعنی، پاس کیا گیا `address` ایک خالی اسٹرنگ ہے)، یا `message` ایک خالی اسٹرنگ ہے۔ آئیے `updateMessage` میں درج ذیل ایرر ہینڈلنگ شامل کریں:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 بلاک چین پر پیغام کو اپ ڈیٹ کرنے کے لیے اپنا MetaMask والیٹ جوڑیں۔",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ آپ کا پیغام خالی اسٹرنگ نہیں ہو سکتا۔",
    }
  }
}
```

اب جب کہ اس میں مناسب ان پٹ ایرر ہینڈلنگ ہے، اب وقت آگیا ہے کہ MetaMask کے ذریعے ٹرانزیکشن پر دستخط کریں!

#### ہمارے ٹرانزیکشن پر دستخط کرنا {#signing-our-transaction}

اگر آپ پہلے سے ہی روایتی web3 Ethereum ٹرانزیکشنز کے ساتھ آرام دہ ہیں، تو جو کوڈ ہم اگلا لکھیں گے وہ بہت مانوس ہوگا۔ اپنے ان پٹ ایرر ہینڈلنگ کوڈ کے نیچے، `updateMessage` میں درج ذیل شامل کریں:

```javascript
// interact.js

//ٹرانزیکشن پیرامیٹرز سیٹ اپ کریں
const transactionParameters = {
  to: contractAddress, // کنٹریکٹ کی اشاعت کے دوران کے علاوہ ضروری ہے۔
  from: address, // صارف کے فعال پتے سے مماثل ہونا چاہئے۔
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
          Etherscan پر اپنے ٹرانزیکشن کی حیثیت دیکھیں!
        </a>
        <br />
        ℹ️ ایک بار جب ٹرانزیکشن نیٹ ورک کے ذریعے تصدیق ہو جائے گی، پیغام خود بخود اپ ڈیٹ ہو جائے گا۔
      </span>
    ),
  }
} catch (error) {
  return {
    status: "😥 " + error.message,
  }
}
```

آئیے دیکھتے ہیں کہ کیا ہو رہا ہے۔ پہلے، ہم اپنے ٹرانزیکشنز پیرامیٹرز سیٹ اپ کرتے ہیں، جہاں:

- `to` وصول کنندہ کا پتہ (ہمارا اسمارٹ کنٹریکٹ) بتاتا ہے
- `from` ٹرانزیکشن کے دستخط کنندہ کی وضاحت کرتا ہے، `address` متغیر جسے ہم نے اپنے فنکشن میں پاس کیا تھا
- `data` ہمارے ہیلو ورلڈ اسمارٹ کنٹریکٹ کے `update` میتھڈ کی کال پر مشتمل ہے، جو ہمارے `message` اسٹرنگ متغیر کو ان پٹ کے طور پر حاصل کرتا ہے

پھر، ہم ایک `window.ethereum.request` کال کا انتظار کرتے ہیں، جہاں ہم MetaMask سے ٹرانزیکشن پر دستخط کرنے کے لیے کہتے ہیں۔ نوٹ کریں، لائن 11 اور 12 پر، ہم اپنے eth میتھڈ، `eth_sendTransaction` کی وضاحت کر رہے ہیں اور اپنے `transactionParameters` کو پاس کر رہے ہیں۔

اس مقام پر، MetaMask براؤزر میں کھل جائے گا، اور صارف سے ٹرانزیکشن پر دستخط کرنے یا مسترد کرنے کا کہے گا۔

- اگر ٹرانزیکشن کامیاب ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `status` JSX اسٹرنگ صارف کو اپنے ٹرانزیکشن کے بارے میں مزید معلومات کے لیے Etherscan چیک کرنے کا اشارہ دیتی ہے۔
- اگر ٹرانزیکشن ناکام ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `status` اسٹرنگ خرابی کا پیغام پہنچاتی ہے۔

مجموعی طور پر، ہمارا `updateMessage` فنکشن اس طرح نظر آنا چاہیے:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  //ان پٹ ایرر ہینڈلنگ
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 بلاک چین پر پیغام کو اپ ڈیٹ کرنے کے لیے اپنا MetaMask والیٹ جوڑیں۔",
    }
  }

  if (message.trim() === "") {
    return {
      status: "❌ آپ کا پیغام خالی اسٹرنگ نہیں ہو سکتا۔",
    }
  }

  //ٹرانزیکشن پیرامیٹرز سیٹ اپ کریں
  const transactionParameters = {
    to: contractAddress, // کنٹریکٹ کی اشاعت کے دوران کے علاوہ ضروری ہے۔
    from: address, // صارف کے فعال پتے سے مماثل ہونا چاہئے۔
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
            Etherscan پر اپنے ٹرانزیکشن کی حیثیت دیکھیں!
          </a>
          <br />
          ℹ️ ایک بار جب ٹرانزیکشن نیٹ ورک کے ذریعے تصدیق ہو جائے گی، پیغام خود بخود اپ ڈیٹ ہو جائے گا۔
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

آخری لیکن کم از کم، ہمیں اپنے `updateMessage` فنکشن کو اپنے `HelloWorld.js` جزو سے جوڑنے کی ضرورت ہے۔

#### `updateMessage` کو `HelloWorld.js` فرنٹ اینڈ سے جوڑیں {#connect-updatemessage-to-the-helloworld-js-frontend}

ہمارے `onUpdatePressed` فنکشن کو درآمد شدہ `updateMessage` فنکشن پر ایک await کال کرنی چاہیے اور `status` ریاستی متغیر میں ترمیم کرنی چاہیے تاکہ یہ ظاہر ہو کہ آیا ہمارا ٹرانزیکشن کامیاب ہوا یا ناکام:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

یہ بہت صاف اور سادہ ہے۔ اور اندازہ لگائیں کیا... آپ کا DAPP مکمل ہے!!!

آگے بڑھیں اور **اپ ڈیٹ** بٹن کو آزمائیں!

### اپنا کسٹم dapp بنائیں {#make-your-own-custom-dapp}

واہ، آپ ٹیوٹوریل کے آخر تک پہنچ گئے! خلاصہ کرنے کے لیے، آپ نے سیکھا کہ کیسے:

- MetaMask والیٹ کو اپنے dapp پروجیکٹ سے جوڑیں
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API کا استعمال کرتے ہوئے اپنے اسمارٹ کنٹریکٹ سے ڈیٹا پڑھیں
- MetaMask کا استعمال کرتے ہوئے Ethereum ٹرانزیکشنز پر دستخط کریں

اب آپ اس ٹیوٹوریل کی مہارتوں کو اپنے کسٹم dapp پروجیکٹ کی تعمیر کے لیے استعمال کرنے کے لیے پوری طرح سے لیس ہیں! ہمیشہ کی طرح، اگر آپ کے کوئی سوالات ہیں، تو [Alchemy Discord](https://discord.gg/gWuC7zB) میں مدد کے لیے ہم سے رابطہ کرنے میں ہچکچاہٹ نہ کریں۔ 🧙‍♂️

ایک بار جب آپ یہ ٹیوٹوریل مکمل کر لیں، تو ہمیں بتائیں کہ آپ کا تجربہ کیسا رہا یا اگر آپ کے پاس کوئی رائے ہے تو ہمیں ٹویٹر پر [@alchemyplatform](https://twitter.com/AlchemyPlatform) پر ٹیگ کرکے بتائیں!
