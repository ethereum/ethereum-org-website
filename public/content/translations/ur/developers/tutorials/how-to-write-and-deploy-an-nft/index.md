---
title: "⁦NFT⁩ کیسے لکھیں اور تعینات کریں (⁦NFT⁩ ٹیوٹوریل سیریز کا حصہ ⁦1/3⁩)"
description: "یہ ٹیوٹوریل ⁦NFTs⁩ پر مبنی سیریز کا حصہ ⁦1⁩ ہے جو آپ کو قدم بہ قدم بتائے گا کہ ایتھیریم اور انٹر پلانیٹری فائل سسٹم (⁦IPFS⁩) کا استعمال کرتے ہوئے نان فنجیبل ٹوکن (⁦ERC-721⁩ ٹوکن) سمارٹ کنٹریکٹ کیسے لکھیں اور تعینات کریں۔"
author: "سومی مدگل"
tags:
  - ERC-721
  - Alchemy
  - Solidity
  - سمارٹ کنٹریکٹس
skill: beginner
breadcrumb: "⁦NFT⁩ لکھیں اور تعینات کریں"
lang: ur
published: 2021-04-22
---

چونکہ <span dir="ltr">NFTs</span> بلاک چین کو عوام کی نظروں میں لا رہے ہیں، اس لیے اب ایتھیریم بلاک چین پر اپنا <span dir="ltr">NFT</span> کنٹریکٹ (<span dir="ltr">ERC-721</span> ٹوکن) شائع کر کے خود اس مقبولیت کو سمجھنے کا ایک بہترین موقع ہے!

<span dir="ltr">Alchemy</span> کو <span dir="ltr">NFT</span> کی دنیا کے سب سے بڑے ناموں کو طاقت فراہم کرنے پر بے حد فخر ہے، جن میں Makersplace (جس نے حال ہی میں Christie’s میں <span dir="ltr">$69 Million</span> میں ڈیجیٹل آرٹ ورک کی فروخت کا ریکارڈ قائم کیا)، Dapper Labs (<span dir="ltr">NBA Top Shot</span> اور <span dir="ltr">Crypto Kitties</span> کے تخلیق کار)، اوپن سی (دنیا کی سب سے بڑی <span dir="ltr">NFT</span> مارکیٹ پلیس)، Zora، Super Rare، NFTfi، Foundation، Enjin، Origin Protocol، Immutable، اور دیگر شامل ہیں۔

اس ٹیوٹوریل میں، ہم [میٹاماسک](https://metamask.io/)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org/)، [Pinata](https://pinata.cloud/) اور [Alchemy](https://alchemy.com/signup/eth) کا استعمال کرتے ہوئے <span dir="ltr">Sepolia</span> آزمائشی نیٹ ورک پر ایک <span dir="ltr">ERC-721</span> سمارٹ کنٹریکٹ بنانے اور تعینات کرنے کا طریقہ سیکھیں گے (اگر آپ کو ابھی تک ان میں سے کسی کا مطلب سمجھ نہیں آیا تو پریشان نہ ہوں — ہم اس کی وضاحت کریں گے!)۔

اس ٹیوٹوریل کے حصہ 2 میں ہم دیکھیں گے کہ ہم اپنے سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے ایک <span dir="ltr">NFT</span> کیسے ڈھال سکتے ہیں، اور حصہ 3 میں ہم وضاحت کریں گے کہ میٹاماسک پر اپنا <span dir="ltr">NFT</span> کیسے دیکھیں۔

اور یقیناً، اگر آپ کے ذہن میں کسی بھی وقت کوئی سوال ہو، تو [<span dir="ltr">Alchemy</span> ڈسکارڈ](https://discord.gg/gWuC7zB) میں رابطہ کرنے سے نہ ہچکچائیں یا [<span dir="ltr">Alchemy</span> کی <span dir="ltr">NFT API</span> دستاویزات](https://www.alchemy.com/docs/reference/nft-api-quickstart) دیکھیں۔

## مرحلہ 1: ایتھیریم نیٹ ورک سے جڑیں {#connect-to-ethereum}

ایتھیریم بلاک چین پر درخواستیں بھیجنے کے کئی طریقے ہیں، لیکن چیزوں کو آسان بنانے کے لیے، ہم [Alchemy](https://alchemy.com/signup/eth) پر ایک مفت اکاؤنٹ استعمال کریں گے، جو کہ ایک بلاک چین ڈیولپر پلیٹ فارم اور <span dir="ltr">API</span> ہے جو ہمیں اپنے نوڈز چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی سہولت دیتا ہے۔

اس ٹیوٹوریل میں، ہم نگرانی اور تجزیات کے لیے <span dir="ltr">Alchemy</span> کے ڈیولپر ٹولز کا بھی فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہماری سمارٹ کنٹریکٹ تعیناتی میں اندرونی طور پر کیا ہو رہا ہے۔ اگر آپ کے پاس پہلے سے <span dir="ltr">Alchemy</span> اکاؤنٹ نہیں ہے، تو آپ [یہاں](https://alchemy.com/signup/eth) مفت سائن اپ کر سکتے ہیں۔

## مرحلہ 2: اپنی ایپ (اور <span dir="ltr">API</span> کلید) بنائیں {#make-api-key}

ایک بار جب آپ <span dir="ltr">Alchemy</span> اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر <span dir="ltr">API</span> کلید تیار کر سکتے ہیں۔ یہ ہمیں <span dir="ltr">Sepolia</span> آزمائشی نیٹ ورک پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ آزمائشی نیٹ ورکس کے بارے میں مزید جاننے کے متجسس ہیں تو [یہ گائیڈ](https://www.alchemy.com/docs/choosing-a-web3-network) دیکھیں۔

1. نیویگیشن بار میں "Apps" پر ہوور کر کے اور "Create App" پر کلک کر کے اپنے <span dir="ltr">Alchemy</span> ڈیش بورڈ میں "Create App" صفحہ پر جائیں۔

![Create your app](./create-your-app.png)

2. اپنی ایپ کا نام رکھیں (ہم نے "My First NFT!" کا انتخاب کیا)، ایک مختصر تفصیل فراہم کریں، چین کے لیے "Ethereum" منتخب کریں، اور اپنے نیٹ ورک کے لیے "Sepolia" کا انتخاب کریں۔ دی مرج کے بعد سے دیگر آزمائشی نیٹ ورکس کو متروک کر دیا گیا ہے۔

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. "Create app" پر کلک کریں اور بس! آپ کی ایپ نیچے دیے گئے ٹیبل میں ظاہر ہونی چاہیے۔

## مرحلہ 3: ایک ایتھیریم اکاؤنٹ (پتہ) بنائیں {#create-eth-address}

ہمیں ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم میٹاماسک استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ کا پتہ منظم کرنے کے لیے استعمال کیا جاتا ہے۔ اگر آپ مزید سمجھنا چاہتے ہیں کہ ایتھیریم پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو ایتھیریم فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

آپ [یہاں](https://metamask.io/download) مفت میں میٹاماسک اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپر دائیں جانب "Sepolia Test Network" پر سوئچ کریں (تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں)۔

![Set Sepolia as your network](./metamask-goerli.png)

## مرحلہ 4: فوسٹ سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

اپنے سمارٹ کنٹریکٹ کو آزمائشی نیٹ ورک پر تعینات کرنے کے لیے، ہمیں کچھ نقلی <span dir="ltr">ETH</span> کی ضرورت ہوگی۔ <span dir="ltr">ETH</span> حاصل کرنے کے لیے آپ <span dir="ltr">Alchemy</span> کے زیر اہتمام [<span dir="ltr">Sepolia</span> فوسٹ](https://sepoliafaucet.com/) پر جا سکتے ہیں، لاگ ان کریں اور اپنے اکاؤنٹ کا پتہ درج کریں، "Send Me ETH" پر کلک کریں۔ آپ کو جلد ہی اپنے میٹاماسک اکاؤنٹ میں <span dir="ltr">ETH</span> نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#check-balance}

یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [<span dir="ltr">Alchemy</span> کے سینڈ باکس ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [<span dir="ltr">eth_getBalance</span>](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود <span dir="ltr">ETH</span> کی مقدار واپس کرے گا۔ اپنا میٹاماسک اکاؤنٹ کا پتہ درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **نوٹ** یہ نتیجہ <span dir="ltr">Wei</span> میں ہے، <span dir="ltr">ETH</span> میں نہیں۔ <span dir="ltr">Wei</span> کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ <span dir="ltr">Wei</span> سے <span dir="ltr">ETH</span> میں تبدیلی <span dir="ltr">1 eth = 10<sup>18</sup> wei</span> ہے۔ لہذا اگر ہم <span dir="ltr">0xde0b6b3a7640000</span> کو اعشاریہ میں تبدیل کریں تو ہمیں <span dir="ltr">1\*10<sup>18</sup> wei</span> ملتا ہے، جو <span dir="ltr">1 ETH</span> کے برابر ہے۔

شکر ہے! ہماری تمام نقلی رقم وہاں موجود ہے۔
## مرحلہ 6: اپنا پروجیکٹ شروع کریں {#initialize-project}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

    mkdir my-nft
    cd my-nft

اب چونکہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے <span dir="ltr">npm init</span> کا استعمال کریں گے۔ اگر آپ کے پاس پہلے سے <span dir="ltr">npm</span> انسٹال نہیں ہے، تو [<span dir="ltr">Node.js</span> کی انسٹالیشن کی ہدایات](https://nodejs.org/en/download/) پر عمل کریں (ہمیں اس ٹیوٹوریل کے لیے <span dir="ltr">Node.js</span> اور <span dir="ltr">npm</span> کی ضرورت ہوگی)۔

    npm init

اس سے کوئی خاص فرق نہیں پڑتا کہ آپ انسٹالیشن کے سوالات کے کیا جوابات دیتے ہیں؛ حوالہ کے لیے ہم نے اسے اس طرح کیا ہے:

```json
    package name: (my-nft)
    version: (1.0.0)
    description: My first NFT!
    entry point: (index.js)
    test command:
    git repository:
    keywords:
    author:
    license: (ISC)
    About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

    {
      "name": "my-nft",
      "version": "1.0.0",
      "description": "My first NFT!",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC"
    }
```

<span dir="ltr">package.json</span> کو منظور کریں، اور ہم تیار ہیں!
## مرحلہ 7: [Hardhat](https://hardhat.org/getting-started/#overview) انسٹال کریں {#install-hardhat}

Hardhat آپ کے ایتھیریم سافٹ ویئر کو مرتب کرنے، تعینات کرنے، جانچنے اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ ڈیولپرز کو لائیو چین پر تعینات کرنے سے پہلے مقامی طور پر سمارٹ کنٹریکٹس اور غیر مرکزی ایپلی کیشنز (dapps) بنانے میں مدد کرتا ہے۔

ہمارے `my-nft` پروجیکٹ کے اندر چلائیں:

    npm install --save-dev hardhat

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

## مرحلہ 8: Hardhat پروجیکٹ بنائیں {#create-hardhat-project}

ہمارے پروجیکٹ فولڈر کے اندر چلائیں:

    npx hardhat

پھر آپ کو ایک خوش آمدیدی پیغام اور یہ منتخب کرنے کا آپشن نظر آنا چاہیے کہ آپ کیا کرنا چاہتے ہیں۔ "create an empty hardhat.config.js" منتخب کریں:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat <span dir="ltr">v2.0.11</span> 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

یہ ہمارے لیے ایک `hardhat.config.js` فائل تیار کرے گا جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#add-project-folders}

اپنے پروجیکٹ کو منظم رکھنے کے لیے، ہم دو نئے فولڈرز بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

    mkdir contracts
    mkdir scripts

- `contracts/` وہ جگہ ہے جہاں ہم اپنا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ کوڈ رکھیں گے

- `scripts/` وہ جگہ ہے جہاں ہم اپنے سمارٹ کنٹریکٹ کو تعینات کرنے اور اس کے ساتھ بات چیت کرنے کے لیے سکرپٹس رکھیں گے

## مرحلہ 10: اپنا کنٹریکٹ لکھیں {#write-contract}

اب چونکہ ہمارا ماحول سیٹ اپ ہو چکا ہے، تو مزید دلچسپ چیزوں کی طرف چلتے ہیں: _اپنا سمارٹ کنٹریکٹ کوڈ لکھنا!_

اپنے پسندیدہ ایڈیٹر میں `my-nft` پروجیکٹ کھولیں (ہمیں [VSCode](https://code.visualstudio.com/) پسند ہے)۔ سمارٹ کنٹریکٹس Solidity نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا `MyNFT.sol` سمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔‌

1. `contracts` فولڈر میں جائیں اور `MyNFT.sol` نامی ایک نئی فائل بنائیں۔

2. ذیل میں ہمارا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ کوڈ ہے، جس کی بنیاد ہم نے [اوپن زیپلن](https://docs.openzeppelin.com/contracts/3.x/erc721) لائبریری کی <span dir="ltr">ERC-721</span> عمل درآمد پر رکھی ہے۔ ذیل کے مواد کو کاپی کریں اور اپنی `MyNFT.sol` فائل میں پیسٹ کریں۔

   ```solidity
   //[https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) پر مبنی کنٹریکٹ
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/utils/Counters.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       using Counters for Counters.Counter;
       Counters.Counter private _tokenIds;

       constructor() ERC721("MyNFT", "NFT") {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           _tokenIds.increment();

           uint256 newItemId = _tokenIds.current();
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. چونکہ ہم اوپن زیپلن کنٹریکٹس لائبریری سے کلاسز وراثت میں لے رہے ہیں، اس لیے لائبریری کو اپنے فولڈر میں انسٹال کرنے کے لیے اپنی کمانڈ لائن میں `npm install @openzeppelin/contracts^4.0.0` چلائیں۔

تو، یہ کوڈ دراصل _کرتا_ کیا ہے؟ آئیے اسے لائن بہ لائن سمجھتے ہیں۔

اپنے سمارٹ کنٹریکٹ کے اوپری حصے میں، ہم تین [اوپن زیپلن](https://openzeppelin.com/) سمارٹ کنٹریکٹ کلاسز درآمد کرتے ہیں:

- `@openzeppelin/contracts/token/ERC721/ERC721.sol` میں <span dir="ltr">ERC-721</span> معیار کا عمل درآمد شامل ہے، جسے ہمارا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ وراثت میں لے گا۔ (ایک درست <span dir="ltr">NFT</span> ہونے کے لیے، آپ کے سمارٹ کنٹریکٹ کو <span dir="ltr">ERC-721</span> معیار کے تمام طریقوں کو نافذ کرنا چاہیے۔) وراثت میں ملے <span dir="ltr">ERC-721</span> فنکشنز کے بارے میں مزید جاننے کے لیے، انٹرفیس کی تعریف [یہاں](https://eips.ethereum.org/EIPS/eip-721) دیکھیں۔

- `@openzeppelin/contracts/utils/Counters.sol` ایسے کاؤنٹرز فراہم کرتا ہے جنہیں صرف ایک سے بڑھایا یا کم کیا جا سکتا ہے۔ ہمارا سمارٹ کنٹریکٹ ڈھالے گئے <span dir="ltr">NFTs</span> کی کل تعداد کا ٹریک رکھنے اور ہمارے نئے <span dir="ltr">NFT</span> پر منفرد <span dir="ltr">ID</span> سیٹ کرنے کے لیے ایک کاؤنٹر استعمال کرتا ہے۔ (سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے ڈھالے گئے ہر <span dir="ltr">NFT</span> کو ایک منفرد <span dir="ltr">ID</span> تفویض کی جانی چاہیے—یہاں ہماری منفرد <span dir="ltr">ID</span> کا تعین صرف موجودہ <span dir="ltr">NFTs</span> کی کل تعداد سے ہوتا ہے۔ مثال کے طور پر، ہم اپنے سمارٹ کنٹریکٹ کے ساتھ جو پہلا <span dir="ltr">NFT</span> ڈھالتے ہیں اس کی <span dir="ltr">ID</span> "1" ہے، ہمارے دوسرے <span dir="ltr">NFT</span> کی <span dir="ltr">ID</span> "2" ہے، وغیرہ۔)

- `@openzeppelin/contracts/access/Ownable.sol` ہمارے سمارٹ کنٹریکٹ پر [ایکسیس کنٹرول](https://docs.openzeppelin.com/contracts/3.x/access-control) سیٹ کرتا ہے، تاکہ صرف سمارٹ کنٹریکٹ کا مالک (آپ) ہی <span dir="ltr">NFTs</span> ڈھال سکے۔ (نوٹ، ایکسیس کنٹرول شامل کرنا مکمل طور پر ایک ترجیح ہے۔ اگر آپ چاہتے ہیں کہ کوئی بھی آپ کے سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے <span dir="ltr">NFT</span> ڈھال سکے، تو لائن 10 پر لفظ `Ownable` اور لائن 17 پر `onlyOwner` کو ہٹا دیں۔)

ہماری امپورٹ سٹیٹمنٹس کے بعد، ہمارے پاس اپنا کسٹم <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ ہے، جو حیرت انگیز طور پر مختصر ہے — اس میں صرف ایک کاؤنٹر، ایک کنسٹرکٹر، اور ایک ہی فنکشن شامل ہے! یہ ہمارے وراثت میں ملے اوپن زیپلن کنٹریکٹس کی بدولت ہے، جو ان زیادہ تر طریقوں کو نافذ کرتے ہیں جن کی ہمیں <span dir="ltr">NFT</span> بنانے کے لیے ضرورت ہوتی ہے، جیسے کہ `ownerOf` جو <span dir="ltr">NFT</span> کا مالک واپس کرتا ہے، اور `transferFrom`، جو <span dir="ltr">NFT</span> کی ملکیت ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں منتقل کرتا ہے۔

ہمارے <span dir="ltr">ERC-721</span> کنسٹرکٹر میں، آپ دیکھیں گے کہ ہم 2 سٹرنگز، "MyNFT" اور "NFT" پاس کرتے ہیں۔ پہلا متغیر سمارٹ کنٹریکٹ کا نام ہے، اور دوسرا اس کی علامت ہے۔ آپ ان میں سے ہر ایک متغیر کا جو چاہیں نام رکھ سکتے ہیں!

آخر میں، ہمارے پاس اپنا فنکشن `mintNFT(address recipient, string memory tokenURI)` ہے جو ہمیں ایک <span dir="ltr">NFT</span> ڈھالنے کی اجازت دیتا ہے! آپ دیکھیں گے کہ یہ فنکشن دو متغیرات لیتا ہے:

- `address recipient` اس پتے کی وضاحت کرتا ہے جو آپ کا تازہ ڈھالا ہوا <span dir="ltr">NFT</span> وصول کرے گا

- `string memory tokenURI` ایک سٹرنگ ہے جسے ایک <span dir="ltr">JSON</span> دستاویز پر حل ہونا چاہیے جو <span dir="ltr">NFT</span> کے میٹا ڈیٹا کو بیان کرتی ہے۔ ایک <span dir="ltr">NFT</span> کا میٹا ڈیٹا ہی دراصل اسے زندہ کرتا ہے، جس سے اس میں قابل ترتیب خصوصیات، جیسے کہ نام، تفصیل، تصویر، اور دیگر اوصاف شامل ہو سکتے ہیں۔ اس ٹیوٹوریل کے حصہ 2 میں، ہم بیان کریں گے کہ اس میٹا ڈیٹا کو کیسے ترتیب دیا جائے۔

`mintNFT` وراثت میں ملی <span dir="ltr">ERC-721</span> لائبریری سے کچھ طریقوں کو کال کرتا ہے، اور بالآخر ایک نمبر واپس کرتا ہے جو تازہ ڈھالے گئے <span dir="ltr">NFT</span> کی <span dir="ltr">ID</span> کی نمائندگی کرتا ہے۔

## مرحلہ 11: میٹاماسک اور <span dir="ltr">Alchemy</span> کو اپنے پروجیکٹ سے جوڑیں {#connect-metamask-and-alchemy}

اب چونکہ ہم نے ایک میٹاماسک والیٹ، <span dir="ltr">Alchemy</span> اکاؤنٹ بنا لیا ہے، اور اپنا سمارٹ کنٹریکٹ لکھ لیا ہے، تو اب وقت آ گیا ہے کہ ان تینوں کو آپس میں جوڑا جائے۔

آپ کے ورچوئل والیٹ سے بھیجی گئی ہر ٹرانزیکشن کے لیے آپ کی منفرد نجی کلید کا استعمال کرتے ہوئے دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی نجی کلید (اور <span dir="ltr">Alchemy API</span> کلید) کو محفوظ طریقے سے ایک انوائرنمنٹ فائل میں محفوظ کر سکتے ہیں۔

ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائرکٹری میں `dotenv` پیکیج انسٹال کریں:

    npm install dotenv --save

پھر، ہمارے پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی میٹاماسک نجی کلید اور <span dir="ltr">HTTP Alchemy API URL</span> شامل کریں۔

- میٹاماسک سے اپنی نجی کلید ایکسپورٹ کرنے کے لیے [ان ہدایات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) پر عمل کریں

- <span dir="ltr">HTTP Alchemy API URL</span> حاصل کرنے کے لیے نیچے دیکھیں اور اسے اپنے کلپ بورڈ پر کاپی کریں

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

آپ کی `.env` اب اس طرح دکھنی چاہیے:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

درحقیقت انہیں اپنے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 میں اپنی `hardhat.config.js` فائل میں ان متغیرات کا حوالہ دیں گے۔

<EnvWarningBanner />

## مرحلہ 12: Ethers.js انسٹال کریں {#install-ethers}

Ethers.js ایک لائبریری ہے جو [معیاری جے سن آر پی سی طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر ایتھیریم کے ساتھ بات چیت کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

Hardhat اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو مربوط کرنا انتہائی آسان بناتا ہے۔ ہم کنٹریکٹ کی تعیناتی کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) کا فائدہ اٹھائیں گے ([Ethers.js](https://github.com/ethers-io/ethers.js/) میں کنٹریکٹ کی تعیناتی کے کچھ انتہائی صاف طریقے موجود ہیں)۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

ہمیں اگلے مرحلے میں اپنی `hardhat.config.js` میں بھی `ethers` کی ضرورت ہوگی۔

## مرحلہ 13: `hardhat.config.js` کو اپ ڈیٹ کریں {#update-hardhat-config}

ہم نے اب تک کئی انحصار (dependencies) اور پلگ انز شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اس طرح دکھنے کے لیے اپ ڈیٹ کریں:

```js
    /**
    * @type import('hardhat/config').HardhatUserConfig
    */
    require('dotenv').config();
    require("@nomiclabs/hardhat-ethers");
    const { API_URL, PRIVATE_KEY } = process.env;
    module.exports = {
       solidity: "0.8.1",
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

## مرحلہ 14: اپنا کنٹریکٹ مرتب کریں {#compile-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنا کنٹریکٹ مرتب کریں۔ مرتب کرنے کا کام Hardhat کے بلٹ ان کاموں میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

    npx hardhat compile

آپ کو سورس فائل میں فراہم نہ کیے گئے <span dir="ltr">SPDX</span> لائسنس شناخت کنندہ کے بارے میں ایک انتباہ مل سکتا ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک لگ رہا ہے! اگر نہیں، تو آپ ہمیشہ [<span dir="ltr">Alchemy</span> ڈسکارڈ](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

## مرحلہ 15: اپنی تعیناتی کی سکرپٹ لکھیں {#write-deploy}

اب چونکہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، تو اب وقت آ گیا ہے کہ ہم اپنے کنٹریکٹ کی تعیناتی کی سکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، اور اس میں درج ذیل مواد شامل کریں:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // تعیناتی شروع کریں، جو ایک promise واپس کرتا ہے جو ایک کنٹریکٹ آبجیکٹ پر resolve ہوتا ہے
  const myNFT = await MyNFT.deploy()
  await myNFT.deployed()
  console.log("Contract deployed to address:", myNFT.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
```

Hardhat اپنے [کنٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں یہ بتانے کا ایک حیرت انگیز کام کرتا ہے کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتیں اپنائی ہیں۔

    const MyNFT = await ethers.getContractFactory("MyNFT");

Ethers.js میں ایک `ContractFactory` ایک تجرید (abstraction) ہے جسے نئے سمارٹ کنٹریکٹس تعینات کرنے کے لیے استعمال کیا جاتا ہے، لہذا یہاں `MyNFT` ہمارے <span dir="ltr">NFT</span> کنٹریکٹ کی مثالوں کے لیے ایک فیکٹری ہے۔ `hardhat-ethers` پلگ ان استعمال کرتے وقت `ContractFactory` اور `Contract` کی مثالیں پہلے سے طے شدہ طور پر پہلے دستخط کنندہ سے جڑی ہوتی ہیں۔

    const myNFT = await MyNFT.deploy();

`ContractFactory` پر `deploy()` کو کال کرنے سے تعیناتی شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` پر حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے سمارٹ کنٹریکٹ کے ہر فنکشن کے لیے ایک طریقہ موجود ہے۔

## مرحلہ 16: اپنا کنٹریکٹ تعینات کریں {#deploy-contract}

ہم بالآخر اپنا سمارٹ کنٹریکٹ تعینات کرنے کے لیے تیار ہیں! اپنی پروجیکٹ ڈائرکٹری کی روٹ پر واپس جائیں، اور کمانڈ لائن میں چلائیں:

    npx hardhat --network sepolia run scripts/deploy.js

پھر آپ کو کچھ اس طرح نظر آنا چاہیے:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

اگر ہم [<span dir="ltr">Sepolia</span> Etherscan](https://sepolia.etherscan.io/) پر جائیں اور اپنے کنٹریکٹ کا پتہ تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی سے تعینات کر دیا گیا ہے۔ اگر آپ اسے فوری طور پر نہیں دیکھ سکتے، تو براہ کرم کچھ دیر انتظار کریں کیونکہ اس میں کچھ وقت لگ سکتا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From کا پتہ آپ کے میٹاماسک اکاؤنٹ کے پتے سے مماثل ہونا چاہیے اور To کے پتے میں "Contract Creation" لکھا ہوگا۔ اگر ہم ٹرانزیکشن پر کلک کرتے ہیں، تو ہم To فیلڈ میں اپنے کنٹریکٹ کا پتہ دیکھیں گے:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

زبردست! آپ نے ابھی اپنا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ ایتھیریم (آزمائشی نیٹ ورک) چین پر تعینات کر دیا ہے!

یہ سمجھنے کے لیے کہ اندرونی طور پر کیا ہو رہا ہے، آئیے اپنے [<span dir="ltr">Alchemy</span> ڈیش بورڈ](https://dashboard.alchemy.com/explorer) میں ایکسپلورر ٹیب پر جائیں۔ اگر آپ کے پاس متعدد <span dir="ltr">Alchemy</span> ایپس ہیں تو یقینی بنائیں کہ ایپ کے لحاظ سے فلٹر کریں اور "MyNFT" کو منتخب کریں۔

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

یہاں آپ کو مٹھی بھر جے سن آر پی سی کالز نظر آئیں گی جو Hardhat/Ethers نے ہمارے لیے اندرونی طور پر کی تھیں جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں ذکر کرنے کے لیے دو اہم کالز [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) ہیں، جو دراصل ہمارے سمارٹ کنٹریکٹ کو <span dir="ltr">Sepolia</span> چین پر لکھنے کی درخواست ہے، اور [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز بھیجتے وقت ایک عام پیٹرن)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) پر یہ ٹیوٹوریل دیکھیں۔

اس ٹیوٹوریل کے حصہ 1 کے لیے بس اتنا ہی۔ [حصہ 2 میں، ہم دراصل ایک <span dir="ltr">NFT</span> ڈھال کر اپنے سمارٹ کنٹریکٹ کے ساتھ بات چیت کریں گے](/developers/tutorials/how-to-mint-an-nft/)، اور [حصہ 3 میں ہم آپ کو دکھائیں گے کہ اپنے ایتھیریم والیٹ میں اپنا <span dir="ltr">NFT</span> کیسے دیکھیں](/developers/tutorials/how-to-view-nft-in-metamask/)!
