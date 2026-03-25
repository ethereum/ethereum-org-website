---
title: "ابتدائی افراد کے لیے ہیلو ورلڈ اسمارٹ کانٹریکٹ - فل اسٹیک"
description: "ایتھریم پر ایک سادہ اسمارٹ کانٹریکٹ لکھنے اور ڈیپلائے کرنے کے بارے میں تعارفی ٹیوٹوریل۔"
author: "nstrike2"
breadcrumb: "ہیلو ورلڈ فل اسٹیک"
tags:
  [
    "Solidity",
    "Hardhat",
    "Alchemy",
    "اسمارٹ کانٹریکٹس",
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

یہ گائیڈ آپ کے لیے ہے اگر آپ بلاک چین ڈیولپمنٹ میں نئے ہیں اور نہیں جانتے کہ کہاں سے شروع کرنا ہے یا اسمارٹ کانٹریکٹس کو کیسے ڈیپلائے کرنا اور ان کے ساتھ کیسے تعامل کرنا ہے۔ ہم [MetaMask](https://metamask.io)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org)، اور [Alchemy](https://alchemy.com/eth) کا استعمال کرتے ہوئے Goerli ٹیسٹ نیٹ ورک پر ایک سادہ اسمارٹ کانٹریکٹ بنانے اور ڈیپلائے کرنے کے عمل سے گزریں گے۔

اس ٹیوٹوریل کو مکمل کرنے کے لیے آپ کو ایک Alchemy اکاؤنٹ کی ضرورت ہوگی۔ [مفت اکاؤنٹ کے لیے سائن اپ کریں](https://www.alchemy.com/)۔

اگر آپ کو کسی بھی مقام پر سوالات ہوں، تو بلا جھجھک [Alchemy Discord](https://discord.gg/gWuC7zB) میں رابطہ کریں!

## حصہ 1 - Hardhat کا استعمال کرتے ہوئے اپنا اسمارٹ کانٹریکٹ بنائیں اور ڈیپلائے کریں {#part-1}

### ایتھیریم نیٹ ورک سے جڑیں {#connect-to-the-ethereum-network}

ایتھیریم چین پر درخواستیں بھیجنے کے کئی طریقے ہیں۔ سادگی کے لیے، ہم Alchemy پر ایک مفت اکاؤنٹ استعمال کریں گے، جو کہ ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں خود نوڈ چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی سہولت دیتا ہے۔ Alchemy میں نگرانی اور تجزیات کے لیے ڈیولپر ٹولز بھی موجود ہیں؛ ہم اس ٹیوٹوریل میں ان کا فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہمارے اسمارٹ کانٹریکٹ کی ڈیپلائمنٹ کے پس منظر میں کیا ہو رہا ہے۔

### اپنی ایپ اور API کلید بنائیں {#create-your-app-and-api-key}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر API کلید تیار کر سکتے ہیں۔ یہ آپ کو Goerli ٹیسٹ نیٹ پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹس سے واقف نہیں ہیں تو آپ [نیٹ ورک کے انتخاب کے لیے Alchemy کی گائیڈ پڑھ سکتے ہیں](https://www.alchemy.com/docs/choosing-a-web3-network)۔

Alchemy ڈیش بورڈ پر، نیویگیشن بار میں **Apps** ڈراپ ڈاؤن تلاش کریں اور **Create App** پر کلک کریں۔

![Hello world create app](./hello-world-create-app.png)

اپنی ایپ کو '_Hello World_' کا نام دیں اور ایک مختصر تفصیل لکھیں۔ اپنے ماحول کے طور پر **Staging** اور اپنے نیٹ ورک کے طور پر **Goerli** کو منتخب کریں۔

![create app view hello world](./create-app-view-hello-world.png)

_نوٹ: یقینی بنائیں کہ آپ **Goerli** کو منتخب کریں، ورنہ یہ ٹیوٹوریل کام نہیں کرے گا۔_

**Create app** پر کلک کریں۔ آپ کی ایپ نیچے دیے گئے ٹیبل میں ظاہر ہو جائے گی۔

### ایک ایتھیریم اکاؤنٹ بنائیں {#create-an-ethereum-account}

ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے آپ کو ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے اور صارفین کو اپنے ایتھیریم اکاؤنٹ کے ایڈریس کا انتظام کرنے کی سہولت دیتا ہے۔

آپ [یہاں](https://metamask.io/download) سے مفت میں MetaMask ڈاؤن لوڈ کر کے اکاؤنٹ بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ موجود ہے، تو یقینی بنائیں کہ اوپر دائیں جانب "Goerli Test Network" پر سوئچ کر لیں (تاکہ ہم اصلی پیسوں کے ساتھ کام نہ کر رہے ہوں)۔

### مرحلہ 4: Faucet سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

اپنے اسمارٹ کانٹریکٹ کو ٹیسٹ نیٹ ورک پر ڈیپلائے کرنے کے لیے، آپ کو کچھ نقلی ETH کی ضرورت ہوگی۔ Goerli نیٹ ورک پر ETH حاصل کرنے کے لیے، ایک Goerli faucet پر جائیں اور اپنا Goerli اکاؤنٹ ایڈریس درج کریں۔ نوٹ کریں کہ Goerli faucets حال ہی میں کچھ غیر معتبر ہو سکتے ہیں - آزمانے کے لیے آپشنز کی فہرست کے لیے [ٹیسٹ نیٹ ورکس کا صفحہ](/developers/docs/networks/#goerli) دیکھیں:

_نوٹ: نیٹ ورک کے ہجوم کی وجہ سے، اس میں کچھ وقت لگ سکتا ہے۔_
``

### مرحلہ 5: اپنا بیلنس چیک کریں {#step-5-check-your-balance}

یہ دوبارہ چیک کرنے کے لیے کہ ETH آپ کے والیٹ میں موجود ہے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود ETH کی مقدار واپس کرے گا۔ مزید جاننے کے لیے [کمپوزر ٹول استعمال کرنے کے طریقے پر Alchemy کا مختصر ٹیوٹوریل](https://youtu.be/r6sjRxBZJuU) دیکھیں۔

اپنا MetaMask اکاؤنٹ ایڈریس درج کریں اور **Send Request** پر کلک کریں۔ آپ کو ایک جواب نظر آئے گا جو نیچے دیے گئے کوڈ اسنیپٹ جیسا ہوگا۔

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000" }
```

> _نوٹ: یہ نتیجہ wei میں ہے، ETH میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔_

شکر ہے! ہمارے نقلی پیسے وہاں موجود ہیں۔

### مرحلہ 6: ہمارے پروجیکٹ کو شروع کریں {#step-6-initialize-our-project}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور درج ذیل درج کریں:

```
mkdir hello-world
cd hello-world
```

اب جب کہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے `npm init` استعمال کریں گے۔

> اگر آپ کے پاس ابھی تک npm انسٹال نہیں ہے، تو [Node.js اور npm انسٹال کرنے کے لیے ان ہدایات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) پر عمل کریں۔

اس ٹیوٹوریل کے مقصد کے لیے، اس سے کوئی فرق نہیں پڑتا کہ آپ ابتدائی سوالات کا کیا جواب دیتے ہیں۔ حوالے کے لیے ہم نے اسے اس طرح کیا ہے:

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

package.json کو منظور کریں اور ہم تیار ہیں!

### مرحلہ 7: Hardhat ڈاؤن لوڈ کریں {#step-7-download-hardhat}

Hardhat آپ کے ایتھیریم سافٹ ویئر کو مرتب (compile)، ڈیپلائے، ٹیسٹ اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ لائیو چین پر ڈیپلائے کرنے سے پہلے مقامی طور پر اسمارٹ کانٹریکٹس اور dapps بناتے وقت ڈیولپرز کی مدد کرتا ہے۔

ہمارے `hello-world` پروجیکٹ کے اندر چلائیں:

```
npm install --save-dev hardhat
```

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے اس صفحے کو دیکھیں۔

### مرحلہ 8: Hardhat پروجیکٹ بنائیں {#step-8-create-hardhat-project}

ہمارے `hello-world` پروجیکٹ فولڈر کے اندر، چلائیں:

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

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

یہ پروجیکٹ میں ایک `hardhat.config.js` فائل تیار کرے گا۔ ہم اسے بعد میں ٹیوٹوریل میں اپنے پروجیکٹ کے سیٹ اپ کی وضاحت کرنے کے لیے استعمال کریں گے۔

### مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#step-9-add-project-folders}

پروجیکٹ کو منظم رکھنے کے لیے، آئیے دو نئے فولڈرز بنائیں۔ کمانڈ لائن میں، اپنے `hello-world` پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

```
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنی ہیلو ورلڈ اسمارٹ کانٹریکٹ کوڈ فائل رکھیں گے
- `scripts/` وہ جگہ ہے جہاں ہم اپنے کانٹریکٹ کو ڈیپلائے کرنے اور اس کے ساتھ بات چیت کرنے کے لیے اسکرپٹس رکھیں گے

### مرحلہ 10: اپنا کانٹریکٹ لکھیں {#step-10-write-our-contract}

آپ شاید خود سے پوچھ رہے ہوں گے کہ ہم کوڈ کب لکھنے والے ہیں؟ اب وقت آ گیا ہے!

اپنے پسندیدہ ایڈیٹر میں hello-world پروجیکٹ کھولیں۔ اسمارٹ کانٹریکٹس عام طور پر Solidity میں لکھے جاتے ہیں، جسے ہم اپنا اسمارٹ کانٹریکٹ لکھنے کے لیے استعمال کریں گے۔‌

1. `contracts` فولڈر میں جائیں اور `HelloWorld.sol` کے نام سے ایک نئی فائل بنائیں۔
2. ذیل میں ایک نمونہ Hello World اسمارٹ کانٹریکٹ ہے جسے ہم اس ٹیوٹوریل کے لیے استعمال کریں گے۔ نیچے دیے گئے مواد کو `HelloWorld.sol` فائل میں کاپی کریں۔

_نوٹ: یہ سمجھنے کے لیے کہ یہ کانٹریکٹ کیا کرتا ہے، تبصرے (comments) ضرور پڑھیں۔_

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

یہ ایک بنیادی اسمارٹ کانٹریکٹ ہے جو بننے پر ایک پیغام محفوظ کرتا ہے۔ اسے `update` فنکشن کو کال کر کے اپ ڈیٹ کیا جا سکتا ہے۔

### مرحلہ 11: MetaMask اور Alchemy کو اپنے پروجیکٹ سے جوڑیں {#step-11-connect-metamask-alchemy-to-your-project}

ہم نے ایک MetaMask والیٹ، Alchemy اکاؤنٹ بنا لیا ہے، اور اپنا اسمارٹ کانٹریکٹ لکھ لیا ہے، اب وقت آ گیا ہے کہ ان تینوں کو آپس میں جوڑیں۔

آپ کے والیٹ سے بھیجی گئی ہر ٹرانزیکشن کے لیے آپ کی منفرد پرائیویٹ کلید کا استعمال کرتے ہوئے دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی پرائیویٹ کلید کو محفوظ طریقے سے ایک انوائرنمنٹ (environment) فائل میں اسٹور کر سکتے ہیں۔ ہم یہاں Alchemy کے لیے ایک API کلید بھی اسٹور کریں گے۔

> ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](https://www.alchemy.com/docs/hello-world-smart-contract#step-11-connect-metamask--alchemy-to-your-project) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائرکٹری میں dotenv پیکیج انسٹال کریں:

```
npm install dotenv --save
```

پھر، پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں۔ اس میں اپنی MetaMask پرائیویٹ کلید اور HTTP Alchemy API URL شامل کریں۔

آپ کی انوائرنمنٹ فائل کا نام `.env` ہونا چاہیے ورنہ اسے انوائرنمنٹ فائل کے طور پر تسلیم نہیں کیا جائے گا۔

اسے `process.env` یا `.env-custom` یا کوئی اور نام نہ دیں۔

- اپنی پرائیویٹ کلید ایکسپورٹ کرنے کے لیے [ان ہدایات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) پر عمل کریں
- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں

![Animated walkthrough of getting an Alchemy API key](./get-alchemy-api-key.gif)

آپ کا `.env` کچھ اس طرح نظر آنا چاہیے:

```
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

انہیں دراصل اپنے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 پر اپنی `hardhat.config.js` فائل میں ان متغیرات (variables) کا حوالہ دیں گے۔

### مرحلہ 12: Ethers.js انسٹال کریں {#step-12-install-ethersjs}

Ethers.js ایک لائبریری ہے جو [معیاری JSON-RPC طریقوں](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر ایتھیریم کے ساتھ بات چیت کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

Hardhat ہمیں اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو مربوط کرنے کی اجازت دیتا ہے۔ ہم کانٹریکٹ کی ڈیپلائمنٹ کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) کا فائدہ اٹھائیں گے۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

### مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#step-13-update-hardhat-configjs}

ہم نے اب تک کئی انحصار (dependencies) اور پلگ انز شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنے `hardhat.config.js` کو اپ ڈیٹ کریں تاکہ یہ اس طرح نظر آئے:

```javascript
/* *
 * @type import('hardhat/config').HardhatUserConfig */

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

### مرحلہ 14: اپنے کانٹریکٹ کو مرتب (Compile) کریں {#step-14-compile-our-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کانٹریکٹ کو مرتب کریں۔ `compile` ٹاسک بلٹ ان hardhat ٹاسکس میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```bash
npx hardhat compile
```

آپ کو `SPDX license identifier not provided in source file` کے بارے میں ایک وارننگ مل سکتی ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک لگ رہا ہوگا! اگر نہیں، تو آپ ہمیشہ [Alchemy discord](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

### مرحلہ 15: اپنی ڈیپلائے اسکرپٹ لکھیں {#step-15-write-our-deploy-script}

اب جب کہ ہمارا کانٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آ گیا ہے کہ ہم اپنی کانٹریکٹ ڈیپلائے اسکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` کے نام سے ایک نئی فائل بنائیں، اور اس میں درج ذیل مواد شامل کریں:

```javascript
async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")

  // ڈپلائمنٹ شروع کریں، ایک promise واپس کرتا ہے جو کنٹریکٹ آبجیکٹ پر resolve ہوتا ہے
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

Hardhat اپنے [کانٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں یہ بتانے کا ایک حیرت انگیز کام کرتا ہے کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتیں اپنائی ہیں۔

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld")
```

ethers.js میں ایک `ContractFactory` ایک تجرید (abstraction) ہے جو نئے اسمارٹ کانٹریکٹس کو ڈیپلائے کرنے کے لیے استعمال ہوتی ہے، لہذا یہاں `HelloWorld` ہمارے ہیلو ورلڈ کانٹریکٹ کی مثالوں (instances) کے لیے ایک [فیکٹری](<https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)>) ہے۔ `hardhat-ethers` پلگ ان `ContractFactory` اور `Contract` کا استعمال کرتے وقت، مثالیں پہلے سے طے شدہ طور پر پہلے دستخط کنندہ (مالک) سے جڑی ہوتی ہیں۔

```javascript
const hello_world = await HelloWorld.deploy()
```

ایک `ContractFactory` پر `deploy()` کو کال کرنے سے ڈیپلائمنٹ شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` آبجیکٹ میں حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے ہر اسمارٹ کانٹریکٹ فنکشن کے لیے ایک طریقہ (method) موجود ہے۔

### مرحلہ 16: اپنا کانٹریکٹ ڈیپلائے کریں {#step-16-deploy-our-contract}

ہم آخر کار اپنا اسمارٹ کانٹریکٹ ڈیپلائے کرنے کے لیے تیار ہیں! کمانڈ لائن پر جائیں اور چلائیں:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**براہ کرم اس ایڈریس کو محفوظ کر لیں**۔ ہم اسے بعد میں ٹیوٹوریل میں استعمال کریں گے۔

اگر ہم [Goerli etherscan](https://goerli.etherscan.io) پر جائیں اور اپنے کانٹریکٹ ایڈریس کو تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی کے ساتھ ڈیپلائے کر دیا گیا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![](./etherscan-contract.png)

`From` ایڈریس آپ کے MetaMask اکاؤنٹ ایڈریس سے مماثل ہونا چاہیے اور `To` ایڈریس میں **Contract Creation** لکھا ہوگا۔ اگر ہم ٹرانزیکشن پر کلک کریں گے تو ہمیں `To` فیلڈ میں اپنا کانٹریکٹ ایڈریس نظر آئے گا۔

![](./etherscan-transaction.png)

مبارک ہو! آپ نے ابھی ایک ایتھیریم ٹیسٹ نیٹ پر ایک اسمارٹ کانٹریکٹ ڈیپلائے کیا ہے۔

یہ سمجھنے کے لیے کہ پس منظر میں کیا ہو رہا ہے، آئیے اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemy.com/explorer) میں Explorer ٹیب پر جائیں۔ اگر آپ کے پاس متعدد Alchemy ایپس ہیں تو یقینی بنائیں کہ ایپ کے لحاظ سے فلٹر کریں اور **Hello World** کو منتخب کریں۔

![](./hello-world-explorer.png)

یہاں آپ کو مٹھی بھر JSON-RPC طریقے نظر آئیں گے جو Hardhat/Ethers نے ہمارے لیے پس منظر میں بنائے تھے جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں دو اہم طریقے [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) ہیں، جو ہمارے کانٹریکٹ کو Goerli چین پر لکھنے کی درخواست ہے، اور [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_gettransactionbyhash) ہے، جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر ہمارا ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

## حصہ 2: اپنے اسمارٹ کانٹریکٹ کے ساتھ تعامل کریں {#part-2-interact-with-your-smart-contract}

اب جب کہ ہم نے کامیابی کے ساتھ Goerli نیٹ ورک پر ایک اسمارٹ کانٹریکٹ ڈیپلائے کر لیا ہے، تو آئیے سیکھتے ہیں کہ اس کے ساتھ کیسے تعامل (interact) کیا جائے۔

### ایک interact.js فائل بنائیں {#create-a-interactjs-file}

یہ وہ فائل ہے جہاں ہم اپنی interaction اسکرپٹ لکھیں گے۔ ہم Ethers.js لائبریری استعمال کریں گے جسے آپ نے پہلے حصہ 1 میں انسٹال کیا تھا۔

اپنے `scripts/` فولڈر کے اندر، `interact.js` کے نام سے ایک نئی فائل بنائیں اور درج ذیل کوڈ شامل کریں:

```javascript
// interact.js

const API_KEY = process.env.API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
```

### اپنی .env فائل کو اپ ڈیٹ کریں {#update-your-env-file}

ہم نئے انوائرنمنٹ ویری ایبلز (environment variables) استعمال کریں گے، اس لیے ہمیں انہیں اس `.env` فائل میں ڈیفائن کرنے کی ضرورت ہے جو [ہم نے پہلے بنائی تھی](#step-11-connect-metamask-&-alchemy-to-your-project)۔

ہمیں اپنی Alchemy کی `API_KEY` اور اس `CONTRACT_ADDRESS` کے لیے ایک ڈیفینیشن شامل کرنے کی ضرورت ہوگی جہاں آپ کا اسمارٹ کانٹریکٹ ڈیپلائے کیا گیا تھا۔

آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```bash
# .env

API_URL = "https://eth-goerli.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### اپنے کانٹریکٹ کا ABI حاصل کریں {#grab-your-contract-ABI}

ہمارا کانٹریکٹ [ABI (Application Binary Interface)](/glossary/#abi) ہمارے اسمارٹ کانٹریکٹ کے ساتھ تعامل کرنے کا انٹرفیس ہے۔ Hardhat خود بخود ایک ABI تیار کرتا ہے اور اسے `HelloWorld.json` میں محفوظ کرتا ہے۔ ABI کو استعمال کرنے کے لیے، ہمیں اپنی `interact.js` فائل میں کوڈ کی درج ذیل لائنیں شامل کر کے اس کے مواد کو پارس (parse) کرنا ہوگا:

```javascript
// interact.js
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json")
```

اگر آپ ABI دیکھنا چاہتے ہیں تو آپ اسے اپنے کنسول پر پرنٹ کر سکتے ہیں:

```javascript
console.log(JSON.stringify(contract.abi))
```

اپنے ABI کو کنسول پر پرنٹ ہوتا دیکھنے کے لیے، اپنے ٹرمینل پر جائیں اور رن کریں:

```bash
npx hardhat run scripts/interact.js
```

### اپنے کانٹریکٹ کا ایک instance بنائیں {#create-an-instance-of-your-contract}

اپنے کانٹریکٹ کے ساتھ تعامل کرنے کے لیے، ہمیں اپنے کوڈ میں ایک کانٹریکٹ instance بنانے کی ضرورت ہے۔ Ethers.js کے ساتھ ایسا کرنے کے لیے، ہمیں تین تصورات کے ساتھ کام کرنا ہوگا:

1. Provider - ایک نوڈ پرووائیڈر جو آپ کو بلاک چین تک پڑھنے اور لکھنے (read and write) کی رسائی دیتا ہے
2. Signer - ایک Ethereum اکاؤنٹ کی نمائندگی کرتا ہے جو ٹرانزیکشنز پر دستخط کر سکتا ہے
3. Contract - ایک Ethers.js آبجیکٹ جو آن چین ڈیپلائے کیے گئے کسی مخصوص کانٹریکٹ کی نمائندگی کرتا ہے

ہم کانٹریکٹ کا instance بنانے کے لیے پچھلے مرحلے سے کانٹریکٹ ABI کا استعمال کریں گے:

```javascript
// interact.js

// پرووائیڈر
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  API_KEY
)

// سائنر
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// کنٹریکٹ
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
)
```

Providers، Signers، اور Contracts کے بارے میں مزید جاننے کے لیے [ethers.js کی دستاویزات](https://docs.ethers.io/v5/) دیکھیں۔

### init میسج پڑھیں {#read-the-init-message}

یاد ہے جب ہم نے اپنا کانٹریکٹ `initMessage = "Hello world!"` کے ساتھ ڈیپلائے کیا تھا؟ اب ہم اپنے اسمارٹ کانٹریکٹ میں محفوظ اس میسج کو پڑھنے اور اسے کنسول پر پرنٹ کرنے جا رہے ہیں۔

JavaScript میں، نیٹ ورکس کے ساتھ تعامل کرتے وقت asynchronous فنکشنز استعمال کیے جاتے ہیں۔ asynchronous فنکشنز کے بارے میں مزید جاننے کے لیے، [یہ میڈیم آرٹیکل پڑھیں](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff)۔

ہمارے اسمارٹ کانٹریکٹ میں `message` فنکشن کو کال کرنے اور init میسج پڑھنے کے لیے نیچے دیا گیا کوڈ استعمال کریں:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message()
  console.log("The message is: " + message)
}
main()
```

ٹرمینل میں `npx hardhat run scripts/interact.js` کا استعمال کرتے ہوئے فائل کو رن کرنے کے بعد ہمیں یہ جواب نظر آنا چاہیے:

```
The message is: Hello world!
```

مبارک ہو! آپ نے ابھی کامیابی کے ساتھ Ethereum بلاک چین سے اسمارٹ کانٹریکٹ کا ڈیٹا پڑھ لیا ہے، بہت خوب!

### میسج کو اپ ڈیٹ کریں {#update-the-message}

صرف میسج پڑھنے کے بجائے، ہم `update` فنکشن کا استعمال کرتے ہوئے اپنے اسمارٹ کانٹریکٹ میں محفوظ کردہ میسج کو اپ ڈیٹ بھی کر سکتے ہیں! ہے نا زبردست؟

میسج کو اپ ڈیٹ کرنے کے لیے، ہم براہ راست اپنے instantiated Contract آبجیکٹ پر `update` فنکشن کو کال کر سکتے ہیں:

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

نوٹ کریں کہ لائن 11 پر، ہم واپس کیے گئے ٹرانزیکشن آبجیکٹ پر `.wait()` کو کال کرتے ہیں۔ یہ اس بات کو یقینی بناتا ہے کہ ہماری اسکرپٹ فنکشن سے باہر نکلنے سے پہلے بلاک چین پر ٹرانزیکشن کے مائن ہونے کا انتظار کرے۔ اگر `.wait()` کال شامل نہیں کی گئی ہے، تو ہو سکتا ہے کہ اسکرپٹ کو کانٹریکٹ میں اپ ڈیٹ شدہ `message` کی ویلیو نظر نہ آئے۔

### نیا میسج پڑھیں {#read-the-new-message}

اپ ڈیٹ شدہ `message` کی ویلیو کو پڑھنے کے لیے آپ کو [پچھلے مرحلے](#read-the-init-message) کو دہرانے کے قابل ہونا چاہیے۔ ایک لمحہ نکالیں اور دیکھیں کہ کیا آپ اس نئی ویلیو کو پرنٹ کرنے کے لیے ضروری تبدیلیاں کر سکتے ہیں!

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

// کنٹریکٹ انسٹینس
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

اب بس اسکرپٹ کو رن کریں اور آپ کو پرانا میسج، اپ ڈیٹ ہونے کا اسٹیٹس، اور نیا میسج اپنے ٹرمینل پر پرنٹ ہوتا نظر آنا چاہیے!

`npx hardhat run scripts/interact.js --network goerli`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

اس اسکرپٹ کو رن کرتے وقت، آپ محسوس کر سکتے ہیں کہ نیا میسج لوڈ ہونے سے پہلے `Updating the message...` کا مرحلہ لوڈ ہونے میں کچھ وقت لیتا ہے۔ یہ مائننگ کے عمل کی وجہ سے ہے؛ اگر آپ ٹرانزیکشنز کے مائن ہونے کے دوران انہیں ٹریک کرنے کے بارے میں متجسس ہیں، تو ٹرانزیکشن کا اسٹیٹس دیکھنے کے لیے [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) پر جائیں۔ اگر ٹرانزیکشن ڈراپ ہو جاتی ہے، تو [Goerli Etherscan](https://goerli.etherscan.io) کو چیک کرنا اور اپنے ٹرانزیکشن ہیش کو تلاش کرنا بھی مددگار ثابت ہوتا ہے۔

## حصہ 3: اپنے اسمارٹ کانٹریکٹ کو Etherscan پر شائع کریں {#part-3-publish-your-smart-contract-to-etherscan}

آپ نے اپنے اسمارٹ کانٹریکٹ کو حقیقت کا روپ دینے کے لیے تمام تر محنت کر لی ہے؛ اب وقت آ گیا ہے کہ اسے دنیا کے ساتھ شیئر کریں!

Etherscan پر اپنے اسمارٹ کانٹریکٹ کی تصدیق کر کے، کوئی بھی آپ کا سورس کوڈ دیکھ سکتا ہے اور آپ کے اسمارٹ کانٹریکٹ کے ساتھ تعامل (interact) کر سکتا ہے۔ آئیے شروع کرتے ہیں!

### مرحلہ 1: اپنے Etherscan اکاؤنٹ پر ایک API Key بنائیں {#step-1-generate-an-api-key-on-your-etherscan-account}

یہ تصدیق کرنے کے لیے کہ آپ اس اسمارٹ کانٹریکٹ کے مالک ہیں جسے آپ شائع کرنے کی کوشش کر رہے ہیں، ایک Etherscan API Key کا ہونا ضروری ہے۔

اگر آپ کے پاس پہلے سے Etherscan اکاؤنٹ نہیں ہے، تو [اکاؤنٹ کے لیے سائن اپ کریں](https://etherscan.io/register)۔

لاگ ان ہونے کے بعد، نیویگیشن بار میں اپنا یوزر نیم تلاش کریں، اس پر ہوور (hover) کریں اور **My profile** بٹن کو منتخب کریں۔

اپنے پروفائل پیج پر، آپ کو ایک سائیڈ نیویگیشن بار نظر آئے گا۔ سائیڈ نیویگیشن بار سے، **API Keys** کو منتخب کریں۔ اس کے بعد، ایک نئی API key بنانے کے لیے "Add" بٹن دبائیں، اپنی ایپ کا نام **hello-world** رکھیں اور **Create New API Key** بٹن دبائیں۔

آپ کی نئی API key کو API key ٹیبل میں ظاہر ہونا چاہیے۔ API key کو اپنے کلپ بورڈ پر کاپی کریں۔

اس کے بعد، ہمیں Etherscan API key کو اپنی `.env` فائل میں شامل کرنے کی ضرورت ہے۔

اسے شامل کرنے کے بعد، آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```javascript
API_URL = "https://eth-goerli.alchemyapi.io/v2/your-api-key"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
CONTRACT_ADDRESS = "your-contract-address"
ETHERSCAN_API_KEY = "your-etherscan-key"
```

### Hardhat کے ذریعے ڈیپلائے کیے گئے اسمارٹ کانٹریکٹس {#hardhat-deployed-smart-contracts}

#### hardhat-etherscan انسٹال کریں {#install-hardhat-etherscan}

Hardhat کا استعمال کرتے ہوئے اپنے کانٹریکٹ کو Etherscan پر شائع کرنا سیدھا اور آسان ہے۔ شروع کرنے کے لیے آپ کو سب سے پہلے `hardhat-etherscan` پلگ ان انسٹال کرنے کی ضرورت ہوگی۔ `hardhat-etherscan` خود بخود Etherscan پر اسمارٹ کانٹریکٹ کے سورس کوڈ اور ABI کی تصدیق کر دے گا۔ اسے شامل کرنے کے لیے، `hello-world` ڈائریکٹری میں رن کریں:

```text
npm install --save-dev @nomiclabs/hardhat-etherscan
```

ایک بار انسٹال ہونے کے بعد، اپنی `hardhat.config.js` کے اوپری حصے میں درج ذیل اسٹیٹمنٹ شامل کریں، اور Etherscan کنفیگریشن کے اختیارات شامل کریں:

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
    // https://etherscan.io/ سے ایک حاصل کریں
    apiKey: ETHERSCAN_API_KEY,
  },
}
```

#### Etherscan پر اپنے اسمارٹ کانٹریکٹ کی تصدیق کریں {#verify-your-smart-contract-on-etherscan}

یقینی بنائیں کہ تمام فائلیں محفوظ (save) ہو چکی ہیں اور تمام `.env` ویری ایبلز درست طریقے سے کنفیگر کیے گئے ہیں۔

کانٹریکٹ کا ایڈریس، اور وہ نیٹ ورک جہاں اسے ڈیپلائے کیا گیا ہے، پاس کرتے ہوئے `verify` ٹاسک رن کریں:

```text
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS 'Hello World!'
```

یقینی بنائیں کہ `DEPLOYED_CONTRACT_ADDRESS` Goerli ٹیسٹ نیٹ ورک پر آپ کے ڈیپلائے کیے گئے اسمارٹ کانٹریکٹ کا ایڈریس ہے۔ اس کے علاوہ، آخری آرگومنٹ (`'Hello World!'`) وہی اسٹرنگ ویلیو ہونی چاہیے جو [حصہ 1 میں ڈیپلائے کے مرحلے کے دوران](#write-our-deploy-script) استعمال کی گئی تھی۔

اگر سب کچھ ٹھیک رہا، تو آپ کو اپنے ٹرمینل میں درج ذیل پیغام نظر آئے گا:

```text
Successfully submitted source code for contract
contracts/HelloWorld.sol:HelloWorld at 0xdeployed-contract-address
for verification on Etherscan. Waiting for verification result...


Successfully verified contract HelloWorld on Etherscan.
https: // goerli.etherscan.io/address/<contract-address>#contracts
```

مبارک ہو! آپ کے اسمارٹ کانٹریکٹ کا کوڈ Etherscan پر موجود ہے!

### Etherscan پر اپنا اسمارٹ کانٹریکٹ دیکھیں! {#check-out-your-smart-contract-on-etherscan}

جب آپ اپنے ٹرمینل میں فراہم کردہ لنک پر جائیں گے، تو آپ کو Etherscan پر شائع شدہ اپنا اسمارٹ کانٹریکٹ کوڈ اور ABI نظر آنا چاہیے!

**واہ - آپ نے کمال کر دیا چیمپ! اب کوئی بھی آپ کے اسمارٹ کانٹریکٹ کو کال کر سکتا ہے یا اس میں لکھ سکتا ہے! ہم یہ دیکھنے کے لیے بے تاب ہیں کہ آپ آگے کیا بناتے ہیں!**

## حصہ 4 - اپنے اسمارٹ کانٹریکٹ کو فرنٹ اینڈ کے ساتھ مربوط کرنا {#part-4-integrating-your-smart-contract-with-the-frontend}

اس ٹیوٹوریل کے اختتام تک، آپ جان جائیں گے کہ کیسے:

- ایک MetaMask والیٹ کو اپنی ڈیپ (dapp) سے منسلک کریں
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API کا استعمال کرتے ہوئے اپنے اسمارٹ کانٹریکٹ سے ڈیٹا پڑھیں
- MetaMask کا استعمال کرتے ہوئے Ethereum ٹرانزیکشنز پر دستخط کریں

اس ڈیپ کے لیے، ہم اپنے فرنٹ اینڈ فریم ورک کے طور پر [React](https://react.dev/) کا استعمال کریں گے؛ تاہم، یہ نوٹ کرنا ضروری ہے کہ ہم اس کے بنیادی اصولوں کو سمجھنے میں زیادہ وقت صرف نہیں کریں گے، کیونکہ ہماری زیادہ تر توجہ اپنے پروجیکٹ میں Web3 کی فعالیت لانے پر ہوگی۔

ایک شرط کے طور پر، آپ کو React کی ابتدائی سطح کی سمجھ ہونی چاہیے۔ اگر نہیں، تو ہم تجویز کرتے ہیں کہ آپ آفیشل [Intro to React tutorial](https://react.dev/learn) مکمل کریں۔

### اسٹارٹر فائلز کلون کریں {#clone-the-starter-files}

سب سے پہلے، اس پروجیکٹ کے لیے اسٹارٹر فائلز حاصل کرنے کے لیے [hello-world-part-four GitHub repository](https://github.com/alchemyplatform/hello-world-part-four-tutorial) پر جائیں اور اس ریپوزٹری کو اپنی لوکل مشین پر کلون کریں۔

کلون شدہ ریپوزٹری کو لوکلی کھولیں۔ غور کریں کہ اس میں دو فولڈرز ہیں: `starter-files` اور `completed`۔

- `starter-files`- **ہم اس ڈائرکٹری میں کام کریں گے**، ہم UI کو آپ کے Ethereum والیٹ اور اس اسمارٹ کانٹریکٹ سے جوڑیں گے جسے ہم نے [حصہ 3](#part-3) میں Etherscan پر پبلش کیا تھا۔
- `completed` میں مکمل ٹیوٹوریل موجود ہے اور اگر آپ کہیں پھنس جائیں تو اسے صرف ایک حوالے کے طور پر استعمال کیا جانا چاہیے۔

اس کے بعد، اپنے پسندیدہ کوڈ ایڈیٹر میں `starter-files` کی اپنی کاپی کھولیں، اور پھر `src` فولڈر میں جائیں۔

ہم جو بھی کوڈ لکھیں گے وہ `src` فولڈر کے اندر ہوگا۔ ہم اپنے پروجیکٹ کو Web3 کی فعالیت دینے کے لیے `HelloWorld.js` کمپوننٹ اور `util/interact.js` جاوا اسکرپٹ فائلوں میں ترمیم کریں گے۔

### اسٹارٹر فائلز چیک کریں {#check-out-the-starter-files}

کوڈنگ شروع کرنے سے پہلے، آئیے دیکھتے ہیں کہ اسٹارٹر فائلوں میں ہمیں کیا فراہم کیا گیا ہے۔

#### اپنا ری ایکٹ پروجیکٹ چلائیں {#get-your-react-project-running}

آئیے اپنے براؤزر میں React پروجیکٹ چلا کر شروعات کریں۔ React کی خوبصورتی یہ ہے کہ ایک بار جب ہمارا پروجیکٹ ہمارے براؤزر میں چلنے لگتا ہے، تو ہم جو بھی تبدیلیاں محفوظ کرتے ہیں وہ ہمارے براؤزر میں لائیو اپ ڈیٹ ہو جائیں گی۔

پروجیکٹ کو چلانے کے لیے، `starter-files` فولڈر کی روٹ ڈائرکٹری میں جائیں، اور پروجیکٹ کی ڈیپینڈینسیز (dependencies) انسٹال کرنے کے لیے اپنے ٹرمینل میں `npm install` چلائیں:

```bash
cd starter-files
npm install
```

ایک بار جب وہ انسٹال ہو جائیں، تو اپنے ٹرمینل میں `npm start` چلائیں:

```bash
npm start
```

ایسا کرنے سے آپ کے براؤزر میں [http://localhost:3000/](http://localhost:3000/) کھل جانا چاہیے، جہاں آپ کو ہمارے پروجیکٹ کا فرنٹ اینڈ نظر آئے گا۔ یہ ایک فیلڈ \(آپ کے اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرنے کی جگہ\)، ایک "Connect Wallet" بٹن، اور ایک "Update" بٹن پر مشتمل ہونا چاہیے۔

اگر آپ کسی بھی بٹن پر کلک کرنے کی کوشش کرتے ہیں، تو آپ دیکھیں گے کہ وہ کام نہیں کرتے—اس کی وجہ یہ ہے کہ ہمیں ابھی بھی ان کی فعالیت کو پروگرام کرنے کی ضرورت ہے۔

#### `HelloWorld.js` کمپوننٹ {#the-helloworld-js-component}

آئیے اپنے ایڈیٹر میں `src` فولڈر میں واپس جائیں اور `HelloWorld.js` فائل کھولیں۔ یہ بہت اہم ہے کہ ہم اس فائل میں موجود ہر چیز کو سمجھیں، کیونکہ یہ وہ بنیادی React کمپوننٹ ہے جس پر ہم کام کریں گے۔

اس فائل کے اوپری حصے میں، آپ دیکھیں گے کہ ہمارے پاس کئی امپورٹ اسٹیٹمنٹس ہیں جو ہمارے پروجیکٹ کو چلانے کے لیے ضروری ہیں، بشمول React لائبریری، useEffect اور useState ہکس، `./util/interact.js` سے کچھ آئٹمز (ہم جلد ہی ان کی مزید تفصیلات بیان کریں گے!)، اور Alchemy کا لوگو۔

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

اس کے بعد، ہمارے پاس ہمارے اسٹیٹ (state) ویری ایبلز ہیں جنہیں ہم مخصوص ایونٹس کے بعد اپ ڈیٹ کریں گے۔

```javascript
// HelloWorld.js

// سٹیٹ ویری ایبلز
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [message, setMessage] = useState("No connection to the network.")
const [newMessage, setNewMessage] = useState("")
```

یہاں بتایا گیا ہے کہ ہر ویری ایبل کس چیز کی نمائندگی کرتا ہے:

- `walletAddress` - ایک اسٹرنگ جو صارف کے والیٹ کا ایڈریس محفوظ کرتی ہے
- `status`- ایک اسٹرنگ جو ایک مددگار پیغام محفوظ کرتی ہے جو صارف کی رہنمائی کرتا ہے کہ ڈیپ کے ساتھ کیسے تعامل کیا جائے
- `message` - ایک اسٹرنگ جو اسمارٹ کانٹریکٹ میں موجودہ پیغام کو محفوظ کرتی ہے
- `newMessage` - ایک اسٹرنگ جو اس نئے پیغام کو محفوظ کرتی ہے جسے اسمارٹ کانٹریکٹ میں لکھا جائے گا

اسٹیٹ ویری ایبلز کے بعد، آپ کو پانچ غیر نافذ شدہ (un-implemented) فنکشنز نظر آئیں گے: `useEffect`، `addSmartContractListener`، `addWalletListener`، `connectWalletPressed`، اور `onUpdatePressed`۔ ہم ذیل میں وضاحت کریں گے کہ وہ کیا کرتے ہیں:

```javascript
// HelloWorld.js

// صرف ایک بار کال کیا جاتا ہے
useEffect(async () => {
  // TODO: امپلیمنٹ کریں
}, [])

function addSmartContractListener() {
  // TODO: امپلیمنٹ کریں
}

function addWalletListener() {
  // TODO: امپلیمنٹ کریں
}

const connectWalletPressed = async () => {
  // TODO: امپلیمنٹ کریں
}

const onUpdatePressed = async () => {
  // TODO: امپلیمنٹ کریں
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html)- یہ ایک React ہک ہے جسے آپ کے کمپوننٹ کے رینڈر ہونے کے بعد کال کیا جاتا ہے۔ چونکہ اس میں ایک خالی ایرے `[]` پراپ پاس کیا گیا ہے \(لائن 4 دیکھیں\)، اس لیے اسے صرف کمپوننٹ کے _پہلے_ رینڈر پر کال کیا جائے گا۔ یہاں ہم اپنے اسمارٹ کانٹریکٹ میں محفوظ کردہ موجودہ پیغام کو لوڈ کریں گے، اپنے اسمارٹ کانٹریکٹ اور والیٹ لسنرز کو کال کریں گے، اور اپنے UI کو اپ ڈیٹ کریں گے تاکہ یہ ظاہر ہو سکے کہ آیا کوئی والیٹ پہلے سے منسلک ہے یا نہیں۔
- `addSmartContractListener`- یہ فنکشن ایک لسنر سیٹ اپ کرتا ہے جو ہمارے HelloWorld کانٹریکٹ کے `UpdatedMessages` ایونٹ پر نظر رکھے گا اور جب ہمارے اسمارٹ کانٹریکٹ میں پیغام تبدیل ہوگا تو ہمارے UI کو اپ ڈیٹ کرے گا۔
- `addWalletListener`- یہ فنکشن ایک لسنر سیٹ اپ کرتا ہے جو صارف کے MetaMask والیٹ کی اسٹیٹ میں تبدیلیوں کا پتہ لگاتا ہے، جیسے کہ جب صارف اپنا والیٹ منقطع کرتا ہے یا ایڈریس تبدیل کرتا ہے۔
- `connectWalletPressed`- اس فنکشن کو صارف کے MetaMask والیٹ کو ہماری ڈیپ سے منسلک کرنے کے لیے کال کیا جائے گا۔
- `onUpdatePressed` - اس فنکشن کو اس وقت کال کیا جائے گا جب صارف اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرنا چاہے گا۔

اس فائل کے آخر کے قریب، ہمارے پاس اپنے کمپوننٹ کا UI ہے۔

```javascript
// HelloWorld.js

// ہمارے کمپوننٹ کا UI
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

اگر آپ اس کوڈ کا بغور جائزہ لیں، تو آپ دیکھیں گے کہ ہم اپنے UI میں اپنے مختلف اسٹیٹ ویری ایبلز کہاں استعمال کرتے ہیں:

- لائنز 6-12 پر، اگر صارف کا والیٹ منسلک ہے \(یعنی، `walletAddress.length > 0`\), تو ہم "walletButton" آئی ڈی والے بٹن میں صارف کے `walletAddress` کا ایک مختصر ورژن دکھاتے ہیں؛ بصورت دیگر یہ صرف "Connect Wallet" کہتا ہے۔
- لائن 17 پر، ہم اسمارٹ کانٹریکٹ میں محفوظ کردہ موجودہ پیغام دکھاتے ہیں، جو `message` اسٹرنگ میں کیپچر کیا گیا ہے۔
- لائنز 23-26 پر، جب ٹیکسٹ فیلڈ میں ان پٹ تبدیل ہوتا ہے تو ہم اپنے `newMessage` اسٹیٹ ویری ایبل کو اپ ڈیٹ کرنے کے لیے ایک [کنٹرولڈ کمپوننٹ](https://legacy.reactjs.org/docs/forms.html#controlled-components) استعمال کرتے ہیں۔

ہمارے اسٹیٹ ویری ایبلز کے علاوہ، آپ یہ بھی دیکھیں گے کہ `connectWalletPressed` اور `onUpdatePressed` فنکشنز کو اس وقت کال کیا جاتا ہے جب بالترتیب `publishButton` اور `walletButton` آئی ڈی والے بٹنوں پر کلک کیا جاتا ہے۔

آخر میں، آئیے دیکھتے ہیں کہ یہ `HelloWorld.js` کمپوننٹ کہاں شامل کیا گیا ہے۔

اگر آپ `App.js` فائل میں جاتے ہیں، جو کہ React میں مرکزی کمپوننٹ ہے اور دیگر تمام کمپوننٹس کے لیے ایک کنٹینر کے طور پر کام کرتا ہے، تو آپ دیکھیں گے کہ ہمارا `HelloWorld.js` کمپوننٹ لائن 7 پر انجیکٹ کیا گیا ہے۔

آخر میں، آئیے آپ کے لیے فراہم کردہ ایک اور فائل، `interact.js` فائل کو چیک کرتے ہیں۔

#### `interact.js` فائل {#the-interact-js-file}

چونکہ ہم [M-V-C](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) پیراڈائم (paradigm) کی پیروی کرنا چاہتے ہیں، اس لیے ہم ایک الگ فائل چاہیں گے جس میں ہماری ڈیپ کی لاجک، ڈیٹا، اور قواعد کو منظم کرنے کے لیے ہمارے تمام فنکشنز موجود ہوں، اور پھر ہم ان فنکشنز کو اپنے فرنٹ اینڈ \(ہمارے `HelloWorld.js` کمپوننٹ\) میں ایکسپورٹ کر سکیں۔

👆🏽ہماری `interact.js` فائل کا بالکل یہی مقصد ہے!

اپنی `src` ڈائرکٹری میں `util` فولڈر میں جائیں، اور آپ دیکھیں گے کہ ہم نے `interact.js` نامی ایک فائل شامل کی ہے جس میں ہمارے اسمارٹ کانٹریکٹ کے تعامل اور والیٹ کے تمام فنکشنز اور ویری ایبلز شامل ہوں گے۔

```javascript
// interact.js

// export const helloWorldContract;

export const loadCurrentMessage = async () => {}

export const connectWallet = async () => {}

const getCurrentWalletConnected = async () => {}

export const updateMessage = async (message) => {}
```

آپ فائل کے اوپری حصے میں دیکھیں گے کہ ہم نے `helloWorldContract` آبجیکٹ کو کمنٹ آؤٹ کر دیا ہے۔ اس ٹیوٹوریل میں بعد میں، ہم اس آبجیکٹ کو ان کمنٹ کریں گے اور اس ویری ایبل میں اپنے اسمارٹ کانٹریکٹ کو انسٹینشی ایٹ (instantiate) کریں گے، جسے ہم پھر اپنے `HelloWorld.js` کمپوننٹ میں ایکسپورٹ کریں گے۔

ہمارے `helloWorldContract` آبجیکٹ کے بعد چار غیر نافذ شدہ فنکشنز درج ذیل کام کرتے ہیں:

- `loadCurrentMessage` - یہ فنکشن اسمارٹ کانٹریکٹ میں محفوظ کردہ موجودہ پیغام کو لوڈ کرنے کی لاجک کو ہینڈل کرتا ہے۔ یہ [Alchemy Web3 API](https://github.com/alchemyplatform/alchemy-web3) کا استعمال کرتے ہوئے Hello World اسمارٹ کانٹریکٹ کو ایک _read_ کال کرے گا۔
- `connectWallet` - یہ فنکشن صارف کے MetaMask کو ہماری ڈیپ سے منسلک کرے گا۔
- `getCurrentWalletConnected` - یہ فنکشن چیک کرے گا کہ آیا پیج لوڈ ہونے پر کوئی Ethereum اکاؤنٹ پہلے سے ہی ہماری ڈیپ سے منسلک ہے اور اس کے مطابق ہمارے UI کو اپ ڈیٹ کرے گا۔
- `updateMessage` - یہ فنکشن اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرے گا۔ یہ Hello World اسمارٹ کانٹریکٹ کو ایک _write_ کال کرے گا، لہذا پیغام کو اپ ڈیٹ کرنے کے لیے صارف کے MetaMask والیٹ کو ایک Ethereum ٹرانزیکشن پر دستخط کرنے ہوں گے۔

اب جب کہ ہم سمجھ گئے ہیں کہ ہم کس چیز کے ساتھ کام کر رہے ہیں، آئیے معلوم کرتے ہیں کہ اپنے اسمارٹ کانٹریکٹ سے کیسے پڑھا جائے!

### مرحلہ 3: اپنے اسمارٹ کانٹریکٹ سے پڑھیں {#step-3-read-from-your-smart-contract}

اپنے اسمارٹ کانٹریکٹ سے پڑھنے کے لیے، آپ کو کامیابی کے ساتھ درج ذیل کو سیٹ اپ کرنے کی ضرورت ہوگی:

- Ethereum چین سے ایک API کنکشن
- آپ کے اسمارٹ کانٹریکٹ کا ایک لوڈ شدہ انسٹینس (instance)
- آپ کے اسمارٹ کانٹریکٹ فنکشن کو کال کرنے کے لیے ایک فنکشن
- ایک لسنر جو اس وقت اپ ڈیٹس پر نظر رکھے جب آپ اسمارٹ کانٹریکٹ سے جو ڈیٹا پڑھ رہے ہیں وہ تبدیل ہو جائے

یہ بہت سارے مراحل کی طرح لگ سکتا ہے، لیکن فکر نہ کریں! ہم آپ کو مرحلہ وار بتائیں گے کہ ان میں سے ہر ایک کو کیسے کرنا ہے! :\)

#### Ethereum چین سے ایک API کنکشن قائم کریں {#establish-an-api-connection-to-the-ethereum-chain}

تو یاد ہے کہ اس ٹیوٹوریل کے حصہ 2 میں، ہم نے اپنے [اسمارٹ کانٹریکٹ سے پڑھنے کے لیے اپنی Alchemy Web3 کلید کا استعمال کیا تھا](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/interacting-with-a-smart-contract#step-1-install-web3-library)؟ آپ کو چین سے پڑھنے کے لیے اپنی ڈیپ میں بھی ایک Alchemy Web3 کلید کی ضرورت ہوگی۔

اگر آپ کے پاس یہ پہلے سے نہیں ہے، تو سب سے پہلے اپنی `starter-files` کی روٹ ڈائرکٹری میں جا کر اور اپنے ٹرمینل میں درج ذیل کو چلا کر [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) انسٹال کریں:

```text
npm install @alch/alchemy-web3
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) دراصل [Web3.js](https://docs.web3js.org/) کے گرد ایک ریپر (wrapper) ہے، جو ایک web3 ڈیولپر کے طور پر آپ کی زندگی کو آسان بنانے کے لیے بہتر API طریقے اور دیگر اہم فوائد فراہم کرتا ہے۔ اسے اس طرح ڈیزائن کیا گیا ہے کہ اس میں کم سے کم کنفیگریشن کی ضرورت ہو تاکہ آپ اسے فوراً اپنی ایپ میں استعمال کرنا شروع کر سکیں!

پھر، اپنی پروجیکٹ ڈائرکٹری میں [dotenv](https://www.npmjs.com/package/dotenv) پیکیج انسٹال کریں، تاکہ ہمارے پاس اپنی API کلید حاصل کرنے کے بعد اسے محفوظ کرنے کے لیے ایک محفوظ جگہ ہو۔

```text
npm install dotenv --save
```

اپنی ڈیپ کے لیے، **ہم اپنی HTTP API کلید کے بجائے اپنی Websockets API کلید استعمال کریں گے**، کیونکہ یہ ہمیں ایک ایسا لسنر سیٹ اپ کرنے کی اجازت دے گا جو اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کے تبدیل ہونے کا پتہ لگاتا ہے۔

ایک بار جب آپ کے پاس اپنی API کلید آجائے، تو اپنی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں اور اس میں اپنا Alchemy Websockets url شامل کریں۔ اس کے بعد، آپ کی `.env` فائل کچھ اس طرح دکھنی چاہیے:

```javascript
REACT_APP_ALCHEMY_KEY = wss: // eth-goerli.ws.alchemyapi.io/v2/<key>
```

اب، ہم اپنی ڈیپ میں اپنا Alchemy Web3 اینڈ پوائنٹ سیٹ اپ کرنے کے لیے تیار ہیں! آئیے اپنے `interact.js` پر واپس چلتے ہیں، جو ہمارے `util` فولڈر کے اندر موجود ہے اور فائل کے اوپری حصے میں درج ذیل کوڈ شامل کریں:

```javascript
// interact.js

require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

// export const helloWorldContract;
```

اوپر، ہم نے سب سے پہلے اپنی `.env` فائل سے Alchemy کلید امپورٹ کی اور پھر اپنا Alchemy Web3 اینڈ پوائنٹ قائم کرنے کے لیے اپنی `alchemyKey` کو `createAlchemyWeb3` میں پاس کیا۔

اس اینڈ پوائنٹ کے تیار ہونے کے ساتھ، اب وقت آگیا ہے کہ ہم اپنا اسمارٹ کانٹریکٹ لوڈ کریں!

#### اپنا Hello World اسمارٹ کانٹریکٹ لوڈ کرنا {#loading-your-hello-world-smart-contract}

اپنا Hello World اسمارٹ کانٹریکٹ لوڈ کرنے کے لیے، آپ کو اس کے کانٹریکٹ ایڈریس اور ABI کی ضرورت ہوگی، یہ دونوں Etherscan پر مل سکتے ہیں اگر آپ نے [اس ٹیوٹوریل کا حصہ 3](/developers/tutorials/hello-world-smart-contract-fullstack/#part-3-publish-your-smart-contract-to-etherscan-part-3-publish-your-smart-contract-to-etherscan) مکمل کر لیا ہے۔

#### Etherscan سے اپنے کانٹریکٹ کا ABI کیسے حاصل کریں {#how-to-get-your-contract-abi-from-etherscan}

اگر آپ نے اس ٹیوٹوریل کا حصہ 3 چھوڑ دیا ہے، تو آپ ایڈریس [0x6f3f635A9762B47954229Ea479b4541eAF402A6A](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) کے ساتھ HelloWorld کانٹریکٹ استعمال کر سکتے ہیں۔ اس کا ABI [یہاں](https://goerli.etherscan.io/address/0x6f3f635a9762b47954229ea479b4541eaf402a6a#code) پایا جا سکتا ہے۔

ایک کانٹریکٹ ABI یہ بتانے کے لیے ضروری ہے کہ کانٹریکٹ کون سا فنکشن شروع کرے گا اور ساتھ ہی یہ یقینی بنانے کے لیے بھی کہ فنکشن اس فارمیٹ میں ڈیٹا واپس کرے گا جس کی آپ توقع کر رہے ہیں۔ ایک بار جب ہم اپنا کانٹریکٹ ABI کاپی کر لیں، تو آئیے اسے اپنی `src` ڈائرکٹری میں `contract-abi.json` نامی JSON فائل کے طور پر محفوظ کریں۔

آپ کی contract-abi.json آپ کے src فولڈر میں محفوظ ہونی چاہیے۔

اپنے کانٹریکٹ ایڈریس، ABI، اور Alchemy Web3 اینڈ پوائنٹ سے لیس ہو کر، ہم اپنے اسمارٹ کانٹریکٹ کا ایک انسٹینس لوڈ کرنے کے لیے [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) استعمال کر سکتے ہیں۔ اپنے کانٹریکٹ ABI کو `interact.js` فائل میں امپورٹ کریں اور اپنا کانٹریکٹ ایڈریس شامل کریں۔

```javascript
// interact.js

const contractABI = require("../contract-abi.json")
const contractAddress = "0x6f3f635A9762B47954229Ea479b4541eAF402A6A"
```

اب ہم آخر کار اپنے `helloWorldContract` ویری ایبل کو ان کمنٹ کر سکتے ہیں، اور اپنے AlchemyWeb3 اینڈ پوائنٹ کا استعمال کرتے ہوئے اسمارٹ کانٹریکٹ کو لوڈ کر سکتے ہیں:

```javascript
// interact.js
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)
```

خلاصہ کرنے کے لیے، آپ کے `interact.js` کی پہلی 12 لائنیں اب کچھ اس طرح دکھنی چاہئیں:

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

اب جب کہ ہمارا کانٹریکٹ لوڈ ہو چکا ہے، ہم اپنا `loadCurrentMessage` فنکشن نافذ کر سکتے ہیں!

#### اپنی `interact.js` فائل میں `loadCurrentMessage` کو نافذ کرنا {#implementing-loadCurrentMessage-in-your-interact-js-file}

یہ فنکشن بہت آسان ہے۔ ہم اپنے کانٹریکٹ سے پڑھنے کے لیے ایک سادہ async web3 کال کرنے جا رہے ہیں۔ ہمارا فنکشن اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام واپس کرے گا:

اپنی `interact.js` فائل میں `loadCurrentMessage` کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// interact.js

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.message().call()
  return message
}
```

چونکہ ہم اس اسمارٹ کانٹریکٹ کو اپنے UI میں دکھانا چاہتے ہیں، اس لیے آئیے اپنے `HelloWorld.js` کمپوننٹ میں `useEffect` فنکشن کو درج ذیل میں اپ ڈیٹ کریں:

```javascript
// HelloWorld.js

// صرف ایک بار کال کیا جاتا ہے
useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
}, [])
```

نوٹ کریں، ہم صرف یہ چاہتے ہیں کہ ہمارا `loadCurrentMessage` کمپوننٹ کے پہلے رینڈر کے دوران ایک بار کال کیا جائے۔ ہم جلد ہی اسمارٹ کانٹریکٹ میں پیغام تبدیل ہونے کے بعد UI کو خود بخود اپ ڈیٹ کرنے کے لیے `addSmartContractListener` نافذ کریں گے۔

اس سے پہلے کہ ہم اپنے لسنر کی طرف بڑھیں، آئیے دیکھتے ہیں کہ اب تک ہمارے پاس کیا ہے! اپنی `HelloWorld.js` اور `interact.js` فائلیں محفوظ کریں، اور پھر [http://localhost:3000/](http://localhost:3000/) پر جائیں

آپ دیکھیں گے کہ موجودہ پیغام اب "No connection to the network" نہیں کہتا۔ اس کے بجائے یہ اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کو ظاہر کرتا ہے۔ زبردست!

#### آپ کا UI اب اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کو ظاہر کرنا چاہیے {#your-UI-should-now-reflect-the-message-stored-in-the-smart-contract}

اب اس لسنر کی بات کرتے ہیں...

#### `addSmartContractListener` نافذ کریں {#implement-addsmartcontractlistener}

اگر آپ اس `HelloWorld.sol` فائل کو یاد کریں جو ہم نے [اس ٹیوٹوریل سیریز کے حصہ 1](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#step-10-write-our-contract) میں لکھی تھی، تو آپ کو یاد ہوگا کہ ایک اسمارٹ کانٹریکٹ ایونٹ ہے جسے `UpdatedMessages` کہا جاتا ہے جو ہمارے اسمارٹ کانٹریکٹ کے `update` فنکشن کو شروع کرنے کے بعد خارج (emit) ہوتا ہے \(لائنز 9 اور 27 دیکھیں\):

```javascript
// HelloWorld.sol

// سیمینٹک ورژننگ کا استعمال کرتے ہوئے، Solidity کا ورژن متعین کرتا ہے۔
// مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.7.3;

// `HelloWorld` نامی کنٹریکٹ کی وضاحت کرتا ہے۔
// کنٹریکٹ فنکشنز اور ڈیٹا (اس کی سٹیٹ) کا مجموعہ ہوتا ہے۔ ایک بار ڈپلائے ہونے کے بعد، کنٹریکٹ ایتھیریم بلاک چین پر ایک مخصوص ایڈریس پر موجود ہوتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   // جب اپ ڈیٹ فنکشن کال کیا جاتا ہے تو ایمٹ (emit) ہوتا ہے
   // سمارٹ کنٹریکٹ ایونٹس آپ کے کنٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر کچھ ہوا ہے تاکہ آپ کی ایپ کا فرنٹ اینڈ، جو مخصوص ایونٹس کو 'سن' رہا ہو، ان کے ہونے پر ایکشن لے سکے۔
   event UpdatedMessages(string oldStr, string newStr);

   // `string` ٹائپ کے ایک سٹیٹ ویری ایبل `message` کا اعلان کرتا ہے۔
   // سٹیٹ ویری ایبلز وہ ویری ایبلز ہیں جن کی ویلیوز مستقل طور پر کنٹریکٹ سٹوریج میں محفوظ ہوتی ہیں۔ `public` کی ورڈ ویری ایبلز کو کنٹریکٹ کے باہر سے قابل رسائی بناتا ہے اور ایک فنکشن بناتا ہے جسے دوسرے کنٹریکٹس یا کلائنٹس ویلیو تک رسائی کے لیے کال کر سکتے ہیں۔
   string public message;

   // بہت سی کلاس پر مبنی آبجیکٹ اورینٹڈ زبانوں کی طرح، کنسٹرکٹر ایک خاص فنکشن ہے جو صرف کنٹریکٹ بننے پر ہی ایگزیکیوٹ ہوتا ہے۔
   // کنسٹرکٹرز کا استعمال کنٹریکٹ کے ڈیٹا کو انیشلائز کرنے کے لیے کیا جاتا ہے۔ مزید جانیں: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // ایک سٹرنگ آرگومنٹ `initMessage` قبول کرتا ہے اور ویلیو کو کنٹریکٹ کے `message` سٹوریج ویری ایبل میں سیٹ کرتا ہے۔
      message = initMessage;
   }

   // ایک پبلک فنکشن جو سٹرنگ آرگومنٹ قبول کرتا ہے اور `message` سٹوریج ویری ایبل کو اپ ڈیٹ کرتا ہے۔
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

اسمارٹ کانٹریکٹ ایونٹس آپ کے کانٹریکٹ کے لیے یہ بتانے کا ایک طریقہ ہیں کہ بلاک چین پر کچھ ہوا ہے \(یعنی، ایک _ایونٹ_ ہوا تھا\) آپ کی فرنٹ اینڈ ایپلیکیشن کو، جو مخصوص ایونٹس کو 'سن' سکتی ہے اور ان کے ہونے پر کارروائی کر سکتی ہے۔

`addSmartContractListener` فنکشن خاص طور پر ہمارے Hello World اسمارٹ کانٹریکٹ کے `UpdatedMessages` ایونٹ کو سنے گا، اور نیا پیغام دکھانے کے لیے ہمارے UI کو اپ ڈیٹ کرے گا۔

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

آئیے تفصیل سے دیکھتے ہیں کہ جب لسنر کسی ایونٹ کا پتہ لگاتا ہے تو کیا ہوتا ہے:

- اگر ایونٹ کے خارج ہونے پر کوئی خرابی پیش آتی ہے، تو یہ ہمارے `status` اسٹیٹ ویری ایبل کے ذریعے UI میں ظاہر ہوگا۔
- بصورت دیگر، ہم واپس کیے گئے `data` آبجیکٹ کا استعمال کریں گے۔ `data.returnValues` ایک ایرے ہے جو صفر پر انڈیکس کیا گیا ہے جہاں ایرے میں پہلا عنصر پچھلے پیغام کو محفوظ کرتا ہے اور دوسرا عنصر اپ ڈیٹ شدہ پیغام کو محفوظ کرتا ہے۔ مجموعی طور پر، ایک کامیاب ایونٹ پر ہم اپنی `message` اسٹرنگ کو اپ ڈیٹ شدہ پیغام پر سیٹ کریں گے، `newMessage` اسٹرنگ کو صاف کریں گے، اور اپنے `status` اسٹیٹ ویری ایبل کو اپ ڈیٹ کریں گے تاکہ یہ ظاہر ہو سکے کہ ہمارے اسمارٹ کانٹریکٹ پر ایک نیا پیغام پبلش کیا گیا ہے۔

آخر میں، آئیے اپنے لسنر کو اپنے `useEffect` فنکشن میں کال کریں تاکہ یہ `HelloWorld.js` کمپوننٹ کے پہلے رینڈر پر انیشلائز (initialize) ہو جائے۔ مجموعی طور پر، آپ کا `useEffect` فنکشن کچھ اس طرح دکھنا چاہیے:

```javascript
// HelloWorld.js

useEffect(async () => {
  const message = await loadCurrentMessage()
  setMessage(message)
  addSmartContractListener()
}, [])
```

اب جب کہ ہم اپنے اسمارٹ کانٹریکٹ سے پڑھنے کے قابل ہو گئے ہیں، تو یہ معلوم کرنا بھی بہت اچھا ہوگا کہ اس پر کیسے لکھا جائے! تاہم، اپنی ڈیپ پر لکھنے کے لیے، ہمارے پاس پہلے اس سے منسلک ایک Ethereum والیٹ ہونا چاہیے۔

لہذا، آگے ہم اپنا Ethereum والیٹ \(MetaMask\) سیٹ اپ کرنے اور پھر اسے اپنی ڈیپ سے منسلک کرنے کا کام کریں گے!

### مرحلہ 4: اپنا Ethereum والیٹ سیٹ اپ کریں {#step-4-set-up-your-ethereum-wallet}

Ethereum چین پر کچھ بھی لکھنے کے لیے، صارفین کو اپنے ورچوئل والیٹ کی پرائیویٹ کیز (private keys) کا استعمال کرتے ہوئے ٹرانزیکشنز پر دستخط کرنے ہوں گے۔ اس ٹیوٹوریل کے لیے، ہم [MetaMask](https://metamask.io/) استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے Ethereum اکاؤنٹ ایڈریس کو منظم کرنے کے لیے استعمال کیا جاتا ہے، کیونکہ یہ آخری صارف کے لیے اس ٹرانزیکشن پر دستخط کرنے کو بہت آسان بنا دیتا ہے۔

اگر آپ اس بارے میں مزید سمجھنا چاہتے ہیں کہ Ethereum پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو Ethereum فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

#### MetaMask ڈاؤن لوڈ کریں {#download-metamask}

آپ [یہاں](https://metamask.io/download) مفت میں MetaMask ڈاؤن لوڈ کر سکتے ہیں اور اکاؤنٹ بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی کوئی اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں جانب "Goerli Test Network" پر سوئچ کریں \(تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں\)۔

#### Faucet سے ایتھر شامل کریں {#add-ether-from-a-faucet}

Ethereum بلاک چین پر ٹرانزیکشن پر دستخط کرنے کے لیے، ہمیں کچھ جعلی Eth کی ضرورت ہوگی۔ Eth حاصل کرنے کے لیے آپ [FaucETH](https://fauceth.komputing.org) پر جا سکتے ہیں اور اپنا Goerli اکاؤنٹ ایڈریس درج کر سکتے ہیں، "Request funds" پر کلک کریں، پھر ڈراپ ڈاؤن میں "Ethereum Testnet Goerli" کو منتخب کریں اور آخر میں دوبارہ "Request funds" بٹن پر کلک کریں۔ آپ کو جلد ہی اپنے MetaMask اکاؤنٹ میں Eth نظر آنا چاہیے!

#### اپنا بیلنس چیک کریں {#check-your-balance}

یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں Eth کی مقدار واپس کرے گا۔ اپنا MetaMask اکاؤنٹ ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**نوٹ:** یہ نتیجہ wei میں ہے eth میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے eth میں تبدیلی یہ ہے: <span dir="ltr">1 eth = 10¹⁸ wei</span>۔ لہذا اگر ہم 0xde0b6b3a7640000 کو ڈیسیمل میں تبدیل کرتے ہیں تو ہمیں <span dir="ltr">1\*10¹⁸</span> ملتا ہے جو 1 eth کے برابر ہے۔

شکر ہے! ہماری جعلی رقم پوری طرح موجود ہے! 🤑

### مرحلہ 5: MetaMask کو اپنے UI سے منسلک کریں {#step-5-connect-metamask-to-your-UI}

اب جب کہ ہمارا MetaMask والیٹ سیٹ اپ ہو چکا ہے، آئیے اپنی ڈیپ کو اس سے منسلک کریں!

#### `connectWallet` فنکشن {#the-connectWallet-function}

اپنی `interact.js` فائل میں، آئیے `connectWallet` فنکشن نافذ کریں، جسے ہم پھر اپنے `HelloWorld.js` کمپوننٹ میں کال کر سکتے ہیں۔

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

تو کوڈ کا یہ بڑا بلاک بالکل کیا کرتا ہے؟

خیر، سب سے پہلے، یہ چیک کرتا ہے کہ آیا آپ کے براؤزر میں `window.ethereum` فعال ہے۔

`window.ethereum` ایک عالمی API ہے جسے MetaMask اور دیگر والیٹ فراہم کنندگان کے ذریعے انجیکٹ کیا جاتا ہے جو ویب سائٹس کو صارفین کے Ethereum اکاؤنٹس کی درخواست کرنے کی اجازت دیتا ہے۔ اگر منظور ہو جائے، تو یہ ان بلاک چینز سے ڈیٹا پڑھ سکتا ہے جن سے صارف منسلک ہے، اور تجویز کر سکتا ہے کہ صارف پیغامات اور ٹرانزیکشنز پر دستخط کرے۔ مزید معلومات کے لیے [MetaMask docs](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) دیکھیں!

اگر `window.ethereum` موجود _نہیں_ ہے، تو اس کا مطلب ہے کہ MetaMask انسٹال نہیں ہے۔ اس کے نتیجے میں ایک JSON آبجیکٹ واپس کیا جاتا ہے، جہاں واپس کیا گیا `address` ایک خالی اسٹرنگ ہوتا ہے، اور `status` JSX آبجیکٹ یہ بتاتا ہے کہ صارف کو MetaMask انسٹال کرنا چاہیے۔

اب اگر `window.ethereum` موجود _ہے_، تو تب چیزیں دلچسپ ہو جاتی ہیں۔

ایک try/catch لوپ کا استعمال کرتے ہوئے، ہم [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts) کو کال کر کے MetaMask سے منسلک ہونے کی کوشش کریں گے۔ اس فنکشن کو کال کرنے سے براؤزر میں MetaMask کھل جائے گا، جس کے ذریعے صارف کو اپنا والیٹ آپ کی ڈیپ سے منسلک کرنے کا اشارہ کیا جائے گا۔

- اگر صارف منسلک ہونے کا انتخاب کرتا ہے، تو `method: "eth_requestAccounts"` ایک ایرے واپس کرے گا جس میں صارف کے وہ تمام اکاؤنٹ ایڈریسز شامل ہوں گے جو ڈیپ سے منسلک ہوئے تھے۔ مجموعی طور پر، ہمارا `connectWallet` فنکشن ایک JSON آبجیکٹ واپس کرے گا جس میں اس ایرے کا _پہلا_ `address` \(لائن 9 دیکھیں\) اور ایک `status` پیغام شامل ہوگا جو صارف کو اسمارٹ کانٹریکٹ پر ایک پیغام لکھنے کا اشارہ کرتا ہے۔
- اگر صارف کنکشن کو مسترد کر دیتا ہے، تو JSON آبجیکٹ میں واپس کیے گئے `address` کے لیے ایک خالی اسٹرنگ اور ایک `status` پیغام شامل ہوگا جو یہ ظاہر کرتا ہے کہ صارف نے کنکشن کو مسترد کر دیا ہے۔

اب جب کہ ہم نے یہ `connectWallet` فنکشن لکھ لیا ہے، اگلا مرحلہ اسے اپنے `HelloWorld.js` کمپوننٹ میں کال کرنا ہے۔

#### `connectWallet` فنکشن کو اپنے `HelloWorld.js` UI کمپوننٹ میں شامل کریں {#add-the-connectWallet-function-to-your-HelloWorld-js-ui-component}

`HelloWorld.js` میں `connectWalletPressed` فنکشن پر جائیں، اور اسے درج ذیل میں اپ ڈیٹ کریں:

```javascript
// HelloWorld.js

const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

غور کریں کہ ہماری زیادہ تر فعالیت کو `interact.js` فائل سے ہمارے `HelloWorld.js` کمپوننٹ سے کیسے الگ (abstract) کیا گیا ہے؟ یہ اس لیے ہے تاکہ ہم M-V-C پیراڈائم کی تعمیل کریں!

`connectWalletPressed` میں، ہم بس اپنے امپورٹ کردہ `connectWallet` فنکشن کو ایک await کال کرتے ہیں، اور اس کے جواب کا استعمال کرتے ہوئے، ہم اپنے `status` اور `walletAddress` ویری ایبلز کو ان کے اسٹیٹ ہکس کے ذریعے اپ ڈیٹ کرتے ہیں۔

اب، آئیے دونوں فائلوں \(`HelloWorld.js` اور `interact.js`\) کو محفوظ کریں اور اب تک کے اپنے UI کی جانچ کریں۔

اپنے براؤزر کو [http://localhost:3000/](http://localhost:3000/) صفحہ پر کھولیں، اور صفحے کے اوپری دائیں جانب "Connect Wallet" بٹن دبائیں۔

اگر آپ کے پاس MetaMask انسٹال ہے، تو آپ کو اپنا والیٹ اپنی ڈیپ سے منسلک کرنے کا اشارہ کیا جانا چاہیے۔ منسلک ہونے کی دعوت قبول کریں۔

آپ کو دیکھنا چاہیے کہ والیٹ بٹن اب ظاہر کرتا ہے کہ آپ کا ایڈریس منسلک ہے! زبردست 🔥

اس کے بعد، صفحہ کو ریفریش کرنے کی کوشش کریں... یہ عجیب ہے۔ ہمارا والیٹ بٹن ہمیں MetaMask کو منسلک کرنے کا اشارہ کر رہا ہے، حالانکہ یہ پہلے سے ہی منسلک ہے...

تاہم، ڈرنے کی کوئی بات نہیں! ہم `getCurrentWalletConnected` کو نافذ کر کے آسانی سے اس مسئلے کو حل کر سکتے ہیں، جو یہ چیک کرے گا کہ آیا کوئی ایڈریس پہلے سے ہی ہماری ڈیپ سے منسلک ہے اور اس کے مطابق ہمارے UI کو اپ ڈیٹ کرے گا!

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

یہ کوڈ اس `connectWallet` فنکشن سے _بہت_ ملتا جلتا ہے جو ہم نے ابھی پچھلے مرحلے میں لکھا تھا۔

بنیادی فرق یہ ہے کہ `eth_requestAccounts` طریقہ کار کو کال کرنے کے بجائے، جو صارف کے لیے اپنا والیٹ منسلک کرنے کے لیے MetaMask کھولتا ہے، یہاں ہم `eth_accounts` طریقہ کار کو کال کرتے ہیں، جو بس ایک ایرے واپس کرتا ہے جس میں فی الحال ہماری ڈیپ سے منسلک MetaMask ایڈریسز شامل ہوتے ہیں۔

اس فنکشن کو عمل میں دیکھنے کے لیے، آئیے اسے اپنے `HelloWorld.js` کمپوننٹ کے `useEffect` فنکشن میں کال کریں:

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

غور کریں، ہم اپنے `walletAddress` اور `status` اسٹیٹ ویری ایبلز کو اپ ڈیٹ کرنے کے لیے `getCurrentWalletConnected` کی اپنی کال کے جواب کا استعمال کرتے ہیں۔

اب جب کہ آپ نے یہ کوڈ شامل کر لیا ہے، آئیے اپنے براؤزر ونڈو کو ریفریش کرنے کی کوشش کریں۔

بہت خوب! بٹن کو یہ بتانا چاہیے کہ آپ منسلک ہیں، اور آپ کے منسلک والیٹ کے ایڈریس کا پیش نظارہ دکھانا چاہیے - یہاں تک کہ آپ کے ریفریش کرنے کے بعد بھی!

#### `addWalletListener` نافذ کریں {#implement-addwalletlistener}

ہمارے ڈیپ والیٹ سیٹ اپ کا آخری مرحلہ والیٹ لسنر کو نافذ کرنا ہے تاکہ جب ہمارے والیٹ کی اسٹیٹ تبدیل ہو تو ہمارا UI اپ ڈیٹ ہو جائے، جیسے کہ جب صارف منقطع ہوتا ہے یا اکاؤنٹس تبدیل کرتا ہے۔

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

- سب سے پہلے، ہمارا فنکشن چیک کرتا ہے کہ آیا `window.ethereum` فعال ہے \(یعنی، MetaMask انسٹال ہے\)۔
  - اگر ایسا نہیں ہے، تو ہم بس اپنے `status` اسٹیٹ ویری ایبل کو ایک JSX اسٹرنگ پر سیٹ کرتے ہیں جو صارف کو MetaMask انسٹال کرنے کا اشارہ کرتا ہے۔
  - اگر یہ فعال ہے، تو ہم لائن 3 پر لسنر `window.ethereum.on("accountsChanged")` سیٹ اپ کرتے ہیں جو MetaMask والیٹ میں اسٹیٹ کی تبدیلیوں کو سنتا ہے، جس میں وہ وقت شامل ہے جب صارف ڈیپ سے ایک اضافی اکاؤنٹ منسلک کرتا ہے، اکاؤنٹس تبدیل کرتا ہے، یا کسی اکاؤنٹ کو منقطع کرتا ہے۔ اگر کم از کم ایک اکاؤنٹ منسلک ہے، تو `walletAddress` اسٹیٹ ویری ایبل کو لسنر کے ذریعے واپس کیے گئے `accounts` ایرے میں پہلے اکاؤنٹ کے طور پر اپ ڈیٹ کیا جاتا ہے۔ بصورت دیگر، `walletAddress` کو ایک خالی اسٹرنگ کے طور پر سیٹ کیا جاتا ہے۔

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

اور بس! ہم نے کامیابی کے ساتھ اپنے والیٹ کی تمام فعالیت کی پروگرامنگ مکمل کر لی ہے! اب اپنے آخری کام کی طرف: اپنے اسمارٹ کانٹریکٹ میں محفوظ کردہ پیغام کو اپ ڈیٹ کرنا!

### مرحلہ 6: `updateMessage` فنکشن نافذ کریں {#step-6-implement-the-updateMessage-function}

ٹھیک ہے دوستو، ہم آخری مرحلے پر پہنچ گئے ہیں! اپنی `interact.js` فائل کے `updateMessage` میں، ہم درج ذیل کام کرنے جا رہے ہیں:

1. یقینی بنائیں کہ جو پیغام ہم اپنے اسمارٹ کانٹریکٹ میں پبلش کرنا چاہتے ہیں وہ درست ہے
2. MetaMask کا استعمال کرتے ہوئے اپنی ٹرانزیکشن پر دستخط کریں
3. اس فنکشن کو اپنے `HelloWorld.js` فرنٹ اینڈ کمپوننٹ سے کال کریں

اس میں زیادہ وقت نہیں لگے گا؛ آئیے اس ڈیپ کو ختم کریں!

#### ان پٹ ایرر ہینڈلنگ {#input-error-handling}

فطری طور پر، فنکشن کے آغاز میں کسی قسم کی ان پٹ ایرر ہینڈلنگ کا ہونا سمجھ میں آتا ہے۔

ہم چاہیں گے کہ ہمارا فنکشن جلد واپس آ جائے اگر کوئی MetaMask ایکسٹینشن انسٹال نہیں ہے، کوئی والیٹ منسلک نہیں ہے \(یعنی، پاس کیا گیا `address` ایک خالی اسٹرنگ ہے\)، یا `message` ایک خالی اسٹرنگ ہے۔ آئیے `updateMessage` میں درج ذیل ایرر ہینڈلنگ شامل کریں:

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

اب جب کہ اس میں مناسب ان پٹ ایرر ہینڈلنگ ہے، اب وقت آگیا ہے کہ MetaMask کے ذریعے ٹرانزیکشن پر دستخط کریں!

#### اپنی ٹرانزیکشن پر دستخط کرنا {#signing-our-transaction}

اگر آپ پہلے ہی روایتی web3 Ethereum ٹرانزیکشنز کے ساتھ آرام دہ ہیں، تو جو کوڈ ہم آگے لکھیں گے وہ بہت مانوس ہوگا۔ اپنے ان پٹ ایرر ہینڈلنگ کوڈ کے نیچے، `updateMessage` میں درج ذیل شامل کریں:

```javascript
// interact.js

// ٹرانزیکشن پیرامیٹرز سیٹ کریں
const transactionParameters = {
  to: contractAddress, // کنٹریکٹ پبلیکیشنز کے علاوہ درکار ہے۔
  from: address, // صارف کے فعال ایڈریس سے مماثل ہونا چاہیے۔
  data: helloWorldContract.methods.update(message).encodeABI(),
}

// ٹرانزیکشن سائن کریں
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

آئیے تفصیل سے دیکھتے ہیں کہ کیا ہو رہا ہے۔ سب سے پہلے، ہم اپنے ٹرانزیکشنز کے پیرامیٹرز سیٹ اپ کرتے ہیں، جہاں:

- `to` وصول کنندہ کا ایڈریس \(ہمارا اسمارٹ کانٹریکٹ\) بتاتا ہے
- `from` ٹرانزیکشن کے دستخط کنندہ کو بتاتا ہے، وہ `address` ویری ایبل جو ہم نے اپنے فنکشن میں پاس کیا تھا
- `data` میں ہمارے Hello World اسمارٹ کانٹریکٹ کے `update` طریقہ کار کی کال شامل ہے، جو ہمارے `message` اسٹرنگ ویری ایبل کو ان پٹ کے طور پر وصول کرتی ہے

پھر، ہم ایک await کال کرتے ہیں، `window.ethereum.request`، جہاں ہم MetaMask سے ٹرانزیکشن پر دستخط کرنے کو کہتے ہیں۔ غور کریں، لائنز 11 اور 12 پر، ہم اپنا eth طریقہ کار، `eth_sendTransaction` بتا رہے ہیں اور اپنے `transactionParameters` پاس کر رہے ہیں۔

اس مقام پر، براؤزر میں MetaMask کھل جائے گا، اور صارف کو ٹرانزیکشن پر دستخط کرنے یا اسے مسترد کرنے کا اشارہ کرے گا۔

- اگر ٹرانزیکشن کامیاب ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `status` JSX اسٹرنگ صارف کو اپنی ٹرانزیکشن کے بارے میں مزید معلومات کے لیے Etherscan چیک کرنے کا اشارہ کرتی ہے۔
- اگر ٹرانزیکشن ناکام ہو جاتی ہے، تو فنکشن ایک JSON آبجیکٹ واپس کرے گا جہاں `status` اسٹرنگ ایرر کا پیغام بتاتی ہے۔

مجموعی طور پر، ہمارا `updateMessage` فنکشن کچھ اس طرح دکھنا چاہیے:

```javascript
// interact.js

export const updateMessage = async (address, message) => {
  // ان پٹ ایرر ہینڈلنگ
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

  // ٹرانزیکشن پیرامیٹرز سیٹ کریں
  const transactionParameters = {
    to: contractAddress, // کنٹریکٹ پبلیکیشنز کے علاوہ درکار ہے۔
    from: address, // صارف کے فعال ایڈریس سے مماثل ہونا چاہیے۔
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  // ٹرانزیکشن سائن کریں
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

آخر میں، ہمیں اپنے `updateMessage` فنکشن کو اپنے `HelloWorld.js` کمپوننٹ سے منسلک کرنے کی ضرورت ہے۔

#### `updateMessage` کو `HelloWorld.js` فرنٹ اینڈ سے منسلک کریں {#connect-updatemessage-to-the-helloworld-js-frontend}

ہمارے `onUpdatePressed` فنکشن کو امپورٹ کردہ `updateMessage` فنکشن کو ایک await کال کرنی چاہیے اور `status` اسٹیٹ ویری ایبل کو تبدیل کرنا چاہیے تاکہ یہ ظاہر ہو سکے کہ ہماری ٹرانزیکشن کامیاب ہوئی یا ناکام:

```javascript
// HelloWorld.js

const onUpdatePressed = async () => {
  const { status } = await updateMessage(walletAddress, newMessage)
  setStatus(status)
}
```

یہ بہت صاف اور سادہ ہے۔ اور اندازہ لگائیں کیا... آپ کی ڈیپ مکمل ہو گئی ہے!!!

آگے بڑھیں اور **Update** بٹن کی جانچ کریں!

### اپنی خود کی کسٹم ڈیپ بنائیں {#make-your-own-custom-dapp}

واہ، آپ ٹیوٹوریل کے اختتام تک پہنچ گئے! خلاصہ کرنے کے لیے، آپ نے سیکھا کہ کیسے:

- ایک MetaMask والیٹ کو اپنے ڈیپ پروجیکٹ سے منسلک کریں
- [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) API کا استعمال کرتے ہوئے اپنے اسمارٹ کانٹریکٹ سے ڈیٹا پڑھیں
- MetaMask کا استعمال کرتے ہوئے Ethereum ٹرانزیکشنز پر دستخط کریں

اب آپ اس ٹیوٹوریل سے حاصل کردہ مہارتوں کو لاگو کر کے اپنا خود کا کسٹم ڈیپ پروجیکٹ بنانے کے لیے پوری طرح تیار ہیں! ہمیشہ کی طرح، اگر آپ کے کوئی سوالات ہیں، تو [Alchemy Discord](https://discord.gg/gWuC7zB) میں مدد کے لیے ہم سے رابطہ کرنے میں ہچکچاہٹ محسوس نہ کریں۔ 🧙‍♂️

ایک بار جب آپ یہ ٹیوٹوریل مکمل کر لیں، تو ہمیں بتائیں کہ آپ کا تجربہ کیسا رہا یا اگر آپ کی کوئی رائے ہے تو ہمیں ٹوئٹر پر [@alchemyplatform](https://twitter.com/AlchemyPlatform) ٹیگ کر کے بتائیں!