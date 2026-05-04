---
title: "ایک NFT کیسے لکھیں اور ڈیپلائے کریں (NFT ٹیوٹوریل سیریز کا حصہ 1/3)"
description: "یہ ٹیوٹوریل NFTs پر مبنی سیریز کا پہلا حصہ ہے جو آپ کو ایتھیریم اور انٹر پلانیٹری فائل سسٹم (IPFS) کا استعمال کرتے ہوئے نان فنجیبل ٹوکن (ERC-721 ٹوکن) اسمارٹ کانٹریکٹ لکھنے اور ڈیپلائے کرنے کا مرحلہ وار طریقہ بتائے گا۔"
author: "سومی مدگل"
tags: ["ERC-721", "Alchemy", "Solidity", "اسمارٹ کانٹریکٹس"]
skill: beginner
breadcrumb: "NFT لکھیں اور ڈیپلائے کریں"
lang: ur
published: 2021-04-22
---

NFTs کے بلاک چین کو عوام کی نظروں میں لانے کے ساتھ، اب آپ کے لیے ایتھیریم بلاک چین پر اپنا NFT کانٹریکٹ (ERC-721 ٹوکن) پبلش کر کے اس ہائپ کو خود سمجھنے کا ایک بہترین موقع ہے!

Alchemy کو NFT اسپیس میں سب سے بڑے ناموں کو پاور کرنے پر بے حد فخر ہے، جن میں Makersplace (جس نے حال ہی میں Christie’s میں 69 ملین ڈالر میں ڈیجیٹل آرٹ ورک کی فروخت کا ریکارڈ قائم کیا)، Dapper Labs (NBA Top Shot اور Crypto Kitties کے تخلیق کار)، OpenSea (دنیا کی سب سے بڑی NFT مارکیٹ پلیس)، Zora، Super Rare، NFTfi، Foundation، Enjin، Origin Protocol، Immutable، اور دیگر شامل ہیں۔

اس ٹیوٹوریل میں، ہم [MetaMask](https://metamask.io/)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org/)، [Pinata](https://pinata.cloud/) اور [Alchemy](https://alchemy.com/signup/eth) کا استعمال کرتے ہوئے Sepolia ٹیسٹ نیٹ ورک پر ایک ERC-721 اسمارٹ کانٹریکٹ بنانے اور ڈیپلائے کرنے کا طریقہ کار دیکھیں گے (اگر آپ کو ابھی تک ان میں سے کسی کا مطلب سمجھ نہیں آیا تو پریشان نہ ہوں — ہم اس کی وضاحت کریں گے!)۔

اس ٹیوٹوریل کے حصہ 2 میں ہم دیکھیں گے کہ ہم اپنے اسمارٹ کانٹریکٹ کو NFT منٹ کرنے کے لیے کیسے استعمال کر سکتے ہیں، اور حصہ 3 میں ہم وضاحت کریں گے کہ آپ اپنا NFT MetaMask پر کیسے دیکھ سکتے ہیں۔

اور یقیناً، اگر آپ کے کسی بھی موقع پر سوالات ہوں، تو [Alchemy Discord](https://discord.gg/gWuC7zB) میں رابطہ کرنے سے نہ ہچکچائیں یا [Alchemy's NFT API docs](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) وزٹ کریں!

## مرحلہ 1: ایتھیریم نیٹ ورک سے کنیکٹ کریں {#connect-to-ethereum}

ایتھیریم بلاک چین پر درخواستیں بھیجنے کے کئی طریقے ہیں، لیکن چیزوں کو آسان بنانے کے لیے، ہم [Alchemy](https://alchemy.com/signup/eth) پر ایک مفت اکاؤنٹ استعمال کریں گے، جو کہ ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں اپنے نوڈز چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی اجازت دیتا ہے۔

اس ٹیوٹوریل میں، ہم مانیٹرنگ اور اینالیٹکس کے لیے Alchemy کے ڈیولپر ٹولز کا بھی فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہمارے اسمارٹ کانٹریکٹ کی ڈیپلائمنٹ کے پس پردہ کیا ہو رہا ہے۔ اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو آپ [یہاں](https://alchemy.com/signup/eth) مفت سائن اپ کر سکتے ہیں۔

## مرحلہ 2: اپنی ایپ (اور API کلید) بنائیں {#make-api-key}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر API کلید (key) جنریٹ کر سکتے ہیں۔ یہ ہمیں Sepolia ٹیسٹ نیٹ ورک پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹ ورکس کے بارے میں مزید جاننے کے خواہشمند ہیں تو [یہ گائیڈ](https://docs.alchemyapi.io/guides/choosing-a-network) دیکھیں۔

1. نیویگیشن بار میں "Apps" پر ہوور کر کے اور "Create App" پر کلک کر کے اپنے Alchemy ڈیش بورڈ میں "Create App" صفحہ پر جائیں۔

![Create your app](./create-your-app.png)

2. اپنی ایپ کا نام رکھیں (ہم نے "My First NFT!" کا انتخاب کیا)، ایک مختصر تفصیل فراہم کریں، Chain کے لیے "Ethereum" منتخب کریں، اور اپنے نیٹ ورک کے لیے "Sepolia" کا انتخاب کریں۔ مرج (merge) کے بعد سے دیگر ٹیسٹ نیٹس کو متروک (deprecated) کر دیا گیا ہے۔

![Configure and publish your app](./alchemy-explorer-sepolia.png)

3. "Create app" پر کلک کریں اور بس! آپ کی ایپ نیچے دیے گئے ٹیبل میں ظاہر ہونی چاہیے۔

## مرحلہ 3: ایک ایتھیریم اکاؤنٹ (ایڈریس) بنائیں {#create-eth-address}

ہمیں ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ ایڈریس کو منظم کرنے کے لیے استعمال کیا جاتا ہے۔ اگر آپ اس بارے میں مزید سمجھنا چاہتے ہیں کہ ایتھیریم پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو ایتھیریم فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

آپ [یہاں](https://metamask.io/download) سے مفت میں MetaMask ڈاؤن لوڈ کر کے اکاؤنٹ بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپر دائیں جانب "Sepolia Test Network" پر سوئچ کریں (تاکہ ہم حقیقی پیسوں کے ساتھ کام نہ کر رہے ہوں)۔

![Set Sepolia as your network](./metamask-goerli.png)

## مرحلہ 4: فوسٹ (Faucet) سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

اپنے اسمارٹ کانٹریکٹ کو ٹیسٹ نیٹ ورک پر ڈیپلائے کرنے کے لیے، ہمیں کچھ نقلی ETH کی ضرورت ہوگی۔ ETH حاصل کرنے کے لیے آپ Alchemy کے زیر اہتمام [Sepolia Faucet](https://sepoliafaucet.com/) پر جا سکتے ہیں، لاگ ان کریں اور اپنا اکاؤنٹ ایڈریس درج کریں، "Send Me ETH" پر کلک کریں۔ آپ کو جلد ہی اپنے MetaMask اکاؤنٹ میں ETH نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#check-balance}

یہ دوہری تصدیق کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست بھیجیں۔ یہ ہمارے والیٹ میں موجود ETH کی مقدار واپس کرے گا۔ اپنا MetaMask اکاؤنٹ ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا رسپانس نظر آنا چاہیے:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **نوٹ** یہ نتیجہ wei میں ہے، ETH میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے ETH میں تبدیلی <span dir="ltr">1 eth = 10<sup>18</sup> wei</span> ہے۔ لہذا اگر ہم 0xde0b6b3a7640000 کو ڈیسیمل میں تبدیل کریں تو ہمیں <span dir="ltr">1\*10<sup>18</sup> wei</span> ملتا ہے، جو 1 ETH کے برابر ہے۔

شکر ہے! ہمارا سارا نقلی پیسہ وہاں موجود ہے۔

## مرحلہ 6: اپنا پروجیکٹ انیشلائز کریں {#initialize-project}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

    mkdir my-nft
    cd my-nft

اب چونکہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو انیشلائز کرنے کے لیے npm init استعمال کریں گے۔ اگر آپ کے پاس پہلے سے npm انسٹال نہیں ہے، تو [ان ہدایات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) پر عمل کریں (ہمیں [Node.js](https://nodejs.org/en/download/) کی بھی ضرورت ہوگی، لہذا اسے بھی ڈاؤن لوڈ کریں!)۔

    npm init

اس سے کوئی خاص فرق نہیں پڑتا کہ آپ انسٹالیشن کے سوالات کا کیا جواب دیتے ہیں؛ حوالہ کے لیے ہم نے اسے اس طرح کیا ہے:

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

package.json کو منظور کریں، اور ہم تیار ہیں!

## مرحلہ 7: [Hardhat](https://hardhat.org/getting-started/#overview) انسٹال کریں {#install-hardhat}

Hardhat آپ کے ایتھیریم سافٹ ویئر کو کمپائل، ڈیپلائے، ٹیسٹ، اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ انوائرنمنٹ ہے۔ یہ لائیو چین پر ڈیپلائے کرنے سے پہلے مقامی طور پر اسمارٹ کانٹریکٹس اور dapps بناتے وقت ڈیولپرز کی مدد کرتا ہے۔

ہمارے my-nft پروجیکٹ کے اندر رن کریں:

    npm install --save-dev hardhat

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

## مرحلہ 8: Hardhat پروجیکٹ بنائیں {#create-hardhat-project}

ہمارے پروجیکٹ فولڈر کے اندر رن کریں:

    npx hardhat

پھر آپ کو ایک خوش آمدید کا پیغام اور یہ منتخب کرنے کا آپشن نظر آنا چاہیے کہ آپ کیا کرنا چاہتے ہیں۔ "create an empty hardhat.config.js" منتخب کریں:

    888    888                      888 888               888
    888    888                      888 888               888
    888    888                      888 888               888
    8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
    888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
    888    888 .d888888 888    888  888 888  888 .d888888 888
    888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
    888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit

یہ ہمارے لیے ایک hardhat.config.js فائل جنریٹ کرے گا جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#add-project-folders}

اپنے پروجیکٹ کو منظم رکھنے کے لیے، ہم دو نئے فولڈرز بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائریکٹری پر جائیں اور ٹائپ کریں:

    mkdir contracts
    mkdir scripts

- contracts/ وہ جگہ ہے جہاں ہم اپنا NFT اسمارٹ کانٹریکٹ کوڈ رکھیں گے

- scripts/ وہ جگہ ہے جہاں ہم اپنے اسمارٹ کانٹریکٹ کو ڈیپلائے کرنے اور اس کے ساتھ تعامل کرنے کے لیے اسکرپٹس رکھیں گے

## مرحلہ 10: اپنا کانٹریکٹ لکھیں {#write-contract}

اب جب کہ ہمارا انوائرنمنٹ سیٹ اپ ہو چکا ہے، مزید دلچسپ چیزوں کی طرف چلتے ہیں: _اپنا اسمارٹ کانٹریکٹ کوڈ لکھنا!_

اپنے پسندیدہ ایڈیٹر میں my-nft پروجیکٹ کھولیں (ہمیں [VSCode](https://code.visualstudio.com/) پسند ہے)۔ اسمارٹ کانٹریکٹس Solidity نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا MyNFT.sol اسمارٹ کانٹریکٹ لکھنے کے لیے استعمال کریں گے۔‌

1. `contracts` فولڈر میں جائیں اور MyNFT.sol نامی ایک نئی فائل بنائیں۔

2. ذیل میں ہمارا NFT اسمارٹ کانٹریکٹ کوڈ ہے، جس کی بنیاد ہم نے [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) لائبریری کی ERC-721 امپلیمینٹیشن پر رکھی ہے۔ نیچے دیے گئے مواد کو کاپی کریں اور اپنی MyNFT.sol فائل میں پیسٹ کریں۔

   ```solidity
   // یہ کنٹریکٹ [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721) پر مبنی ہے
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

3. چونکہ ہم OpenZeppelin کانٹریکٹس لائبریری سے کلاسز وراثت (inherit) میں لے رہے ہیں، اس لیے لائبریری کو اپنے فولڈر میں انسٹال کرنے کے لیے اپنی کمانڈ لائن میں `npm install @openzeppelin/contracts^4.0.0` رن کریں۔

تو، یہ کوڈ دراصل _کرتا_ کیا ہے؟ آئیے اسے لائن بہ لائن سمجھتے ہیں۔

اپنے اسمارٹ کانٹریکٹ کے اوپری حصے میں، ہم تین [OpenZeppelin](https://openzeppelin.com/) اسمارٹ کانٹریکٹ کلاسز امپورٹ کرتے ہیں:

- @openzeppelin/contracts/token/ERC721/ERC721.sol میں ERC-721 اسٹینڈرڈ کی امپلیمینٹیشن شامل ہے، جسے ہمارا NFT اسمارٹ کانٹریکٹ وراثت میں لے گا۔ (ایک درست NFT ہونے کے لیے، آپ کے اسمارٹ کانٹریکٹ کو ERC-721 اسٹینڈرڈ کے تمام میتھڈز کو لاگو کرنا چاہیے۔) وراثت میں ملنے والے ERC-721 فنکشنز کے بارے میں مزید جاننے کے لیے، انٹرفیس کی تعریف [یہاں](https://eips.ethereum.org/EIPS/eip-721) دیکھیں۔

- @openzeppelin/contracts/utils/Counters.sol ایسے کاؤنٹرز فراہم کرتا ہے جنہیں صرف ایک سے بڑھایا یا کم کیا جا سکتا ہے۔ ہمارا اسمارٹ کانٹریکٹ منٹ کیے گئے NFTs کی کل تعداد کا ٹریک رکھنے اور ہمارے نئے NFT پر منفرد ID سیٹ کرنے کے لیے ایک کاؤنٹر استعمال کرتا ہے۔ (اسمارٹ کانٹریکٹ کا استعمال کرتے ہوئے منٹ کیے گئے ہر NFT کو ایک منفرد ID تفویض کی جانی چاہیے—یہاں ہماری منفرد ID کا تعین صرف موجودہ NFTs کی کل تعداد سے ہوتا ہے۔ مثال کے طور پر، ہم اپنے اسمارٹ کانٹریکٹ کے ساتھ جو پہلا NFT منٹ کرتے ہیں اس کی ID "1" ہے، ہمارے دوسرے NFT کی ID "2" ہے، وغیرہ۔)

- @openzeppelin/contracts/access/Ownable.sol ہمارے اسمارٹ کانٹریکٹ پر [ایکسیس کنٹرول](https://docs.openzeppelin.com/contracts/3.x/access-control) سیٹ اپ کرتا ہے، تاکہ صرف اسمارٹ کانٹریکٹ کا مالک (آپ) ہی NFTs منٹ کر سکے۔ (نوٹ، ایکسیس کنٹرول شامل کرنا مکمل طور پر ایک ترجیح ہے۔ اگر آپ چاہتے ہیں کہ کوئی بھی آپ کے اسمارٹ کانٹریکٹ کا استعمال کرتے ہوئے NFT منٹ کر سکے، تو لائن 10 پر Ownable اور لائن 17 پر onlyOwner کا لفظ ہٹا دیں۔)

ہماری امپورٹ اسٹیٹمنٹس کے بعد، ہمارے پاس اپنا کسٹم NFT اسمارٹ کانٹریکٹ ہے، جو حیرت انگیز طور پر مختصر ہے — اس میں صرف ایک کاؤنٹر، ایک کنسٹرکٹر، اور ایک ہی فنکشن شامل ہے! یہ ہمارے وراثت میں ملے OpenZeppelin کانٹریکٹس کی بدولت ہے، جو ان زیادہ تر میتھڈز کو لاگو کرتے ہیں جن کی ہمیں NFT بنانے کے لیے ضرورت ہوتی ہے، جیسے کہ `ownerOf` جو NFT کا مالک واپس کرتا ہے، اور `transferFrom`، جو NFT کی ملکیت کو ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں منتقل کرتا ہے۔

ہمارے ERC-721 کنسٹرکٹر میں، آپ دیکھیں گے کہ ہم 2 اسٹرنگز، "MyNFT" اور "NFT" پاس کرتے ہیں۔ پہلا ویری ایبل اسمارٹ کانٹریکٹ کا نام ہے، اور دوسرا اس کا سمبل ہے۔ آپ ان میں سے ہر ایک ویری ایبل کا نام جو چاہیں رکھ سکتے ہیں!

آخر میں، ہمارے پاس اپنا فنکشن `mintNFT(address recipient, string memory tokenURI)` ہے جو ہمیں NFT منٹ کرنے کی اجازت دیتا ہے! آپ دیکھیں گے کہ یہ فنکشن دو ویری ایبلز لیتا ہے:

- `address recipient` اس ایڈریس کی وضاحت کرتا ہے جو آپ کا تازہ منٹ شدہ NFT وصول کرے گا

- `string memory tokenURI` ایک اسٹرنگ ہے جسے ایک JSON دستاویز پر ریزالو ہونا چاہیے جو NFT کے میٹا ڈیٹا کو بیان کرتی ہے۔ ایک NFT کا میٹا ڈیٹا ہی دراصل اسے زندہ کرتا ہے، جس سے اس میں قابل ترتیب خصوصیات، جیسے کہ نام، تفصیل، تصویر، اور دیگر ایٹریبیوٹس شامل ہو سکتے ہیں۔ اس ٹیوٹوریل کے حصہ 2 میں، ہم بیان کریں گے کہ اس میٹا ڈیٹا کو کیسے کنفیگر کیا جائے۔

`mintNFT` وراثت میں ملی ERC-721 لائبریری سے کچھ میتھڈز کو کال کرتا ہے، اور بالآخر ایک نمبر واپس کرتا ہے جو تازہ منٹ شدہ NFT کی ID کی نمائندگی کرتا ہے۔

## مرحلہ 11: MetaMask اور Alchemy کو اپنے پروجیکٹ سے کنیکٹ کریں {#connect-metamask-and-alchemy}

اب جب کہ ہم نے ایک MetaMask والیٹ، Alchemy اکاؤنٹ بنا لیا ہے، اور اپنا اسمارٹ کانٹریکٹ لکھ لیا ہے، اب وقت آگیا ہے کہ ان تینوں کو آپس میں کنیکٹ کریں۔

آپ کے ورچوئل والیٹ سے بھیجی گئی ہر ٹرانزیکشن کے لیے آپ کی منفرد پرائیویٹ کلید (private key) کا استعمال کرتے ہوئے دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی پرائیویٹ کلید (اور Alchemy API کلید) کو محفوظ طریقے سے ایک انوائرنمنٹ فائل میں اسٹور کر سکتے ہیں۔

ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائریکٹری میں dotenv پیکیج انسٹال کریں:

    npm install dotenv --save

پھر، ہمارے پروجیکٹ کی روٹ ڈائریکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی MetaMask پرائیویٹ کلید اور HTTP Alchemy API URL شامل کریں۔

- MetaMask سے اپنی پرائیویٹ کلید ایکسپورٹ کرنے کے لیے [ان ہدایات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) پر عمل کریں

- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں اور اسے اپنے کلپ بورڈ پر کاپی کریں

![Copy your Alchemy API URL](./copy-alchemy-api-url.gif)

آپ کا `.env` اب اس طرح نظر آنا چاہیے:

    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"

انہیں دراصل اپنے کوڈ سے کنیکٹ کرنے کے لیے، ہم مرحلہ 13 میں اپنی hardhat.config.js فائل میں ان ویری ایبلز کا حوالہ دیں گے۔

<EnvWarningBanner />

## مرحلہ 12: Ethers.js انسٹال کریں {#install-ethers}

Ethers.js ایک لائبریری ہے جو [معیاری JSON-RPC میتھڈز](/developers/docs/apis/json-rpc/) کو زیادہ یوزر فرینڈلی میتھڈز کے ساتھ ریپ (wrap) کر کے ایتھیریم کے ساتھ تعامل کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

Hardhat اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو انٹیگریٹ کرنا انتہائی آسان بناتا ہے۔ ہم کانٹریکٹ ڈیپلائمنٹ کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) کا فائدہ اٹھائیں گے ([Ethers.js](https://github.com/ethers-io/ethers.js/) میں کانٹریکٹ ڈیپلائمنٹ کے کچھ انتہائی کلین میتھڈز ہیں)۔

اپنی پروجیکٹ ڈائریکٹری میں ٹائپ کریں:

    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0

ہمیں اگلے مرحلے میں اپنی hardhat.config.js میں بھی ethers کی ضرورت ہوگی۔

## مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#update-hardhat-config}

ہم نے اب تک کئی ڈیپینڈینسیز اور پلگ انز شامل کیے ہیں، اب ہمیں hardhat.config.js کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی hardhat.config.js کو اپ ڈیٹ کریں تاکہ یہ اس طرح نظر آئے:

```js
    /* *
    * @type import('hardhat/config').HardhatUserConfig */
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

## مرحلہ 14: اپنا کانٹریکٹ کمپائل کریں {#compile-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنا کانٹریکٹ کمپائل کریں۔ کمپائل ٹاسک بلٹ ان hardhat ٹاسکس میں سے ایک ہے۔

کمانڈ لائن سے رن کریں:

    npx hardhat compile

آپ کو سورس فائل میں SPDX لائسنس شناخت کنندہ فراہم نہ کیے جانے کے بارے میں ایک وارننگ مل سکتی ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک لگ رہا ہوگا! اگر نہیں، تو آپ ہمیشہ [Alchemy discord](https://discord.gg/u72VCg3) میں میسج کر سکتے ہیں۔

## مرحلہ 15: اپنی ڈیپلائے اسکرپٹ لکھیں {#write-deploy}

اب جب کہ ہمارا کانٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آگیا ہے کہ ہم اپنی کانٹریکٹ ڈیپلائے اسکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، اور اس میں درج ذیل مواد شامل کریں:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // ڈپلائمنٹ شروع کریں، جو ایک promise واپس کرتا ہے جو ایک contract object پر resolve ہوتا ہے
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

Hardhat اپنے [کانٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں یہ بتانے کا ایک حیرت انگیز کام کرتا ہے کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتیں اپنائی ہیں۔

    const MyNFT = await ethers.getContractFactory("MyNFT");

ethers.js میں ایک ContractFactory ایک ایبسٹریکشن ہے جسے نئے اسمارٹ کانٹریکٹس ڈیپلائے کرنے کے لیے استعمال کیا جاتا ہے، لہذا یہاں MyNFT ہمارے NFT کانٹریکٹ کے انسٹینسز کے لیے ایک فیکٹری ہے۔ hardhat-ethers پلگ ان استعمال کرتے وقت ContractFactory اور Contract انسٹینسز بائی ڈیفالٹ پہلے سائنر (signer) سے جڑے ہوتے ہیں۔

    const myNFT = await MyNFT.deploy();

ContractFactory پر deploy() کو کال کرنے سے ڈیپلائمنٹ شروع ہو جائے گی، اور ایک Promise واپس آئے گا جو ایک Contract پر ریزالو ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے ہر اسمارٹ کانٹریکٹ فنکشن کے لیے ایک میتھڈ ہوتا ہے۔

## مرحلہ 16: اپنا کانٹریکٹ ڈیپلائے کریں {#deploy-contract}

ہم بالآخر اپنا اسمارٹ کانٹریکٹ ڈیپلائے کرنے کے لیے تیار ہیں! اپنی پروجیکٹ ڈائریکٹری کی روٹ پر واپس جائیں، اور کمانڈ لائن میں رن کریں:

    npx hardhat --network sepolia run scripts/deploy.js

پھر آپ کو کچھ اس طرح نظر آنا چاہیے:

    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650

اگر ہم [Sepolia etherscan](https://sepolia.etherscan.io/) پر جائیں اور اپنا کانٹریکٹ ایڈریس تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی سے ڈیپلائے کر دیا گیا ہے۔ اگر آپ اسے فوری طور پر نہیں دیکھ سکتے ہیں، تو براہ کرم تھوڑی دیر انتظار کریں کیونکہ اس میں کچھ وقت لگ سکتا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

From ایڈریس آپ کے MetaMask اکاؤنٹ ایڈریس سے مماثل ہونا چاہیے اور To ایڈریس میں "Contract Creation" لکھا ہوگا۔ اگر ہم ٹرانزیکشن پر کلک کرتے ہیں، تو ہم To فیلڈ میں اپنا کانٹریکٹ ایڈریس دیکھیں گے:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

زبردست! آپ نے ابھی اپنا NFT اسمارٹ کانٹریکٹ ایتھیریم (ٹیسٹ نیٹ) چین پر ڈیپلائے کر دیا ہے!

یہ سمجھنے کے لیے کہ پس پردہ کیا ہو رہا ہے، آئیے اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemyapi.io/explorer) میں Explorer ٹیب پر جائیں۔ اگر آپ کے پاس متعدد Alchemy ایپس ہیں تو یقینی بنائیں کہ ایپ کے لحاظ سے فلٹر کریں اور "MyNFT" کو منتخب کریں۔

![View calls made “under the hood” with Alchemy’s Explorer Dashboard](./alchemy-explorer-goerli.png)

یہاں آپ کو مٹھی بھر JSON-RPC کالز نظر آئیں گی جو Hardhat/Ethers نے ہمارے لیے پس پردہ کی تھیں جب ہم نے .deploy() فنکشن کو کال کیا تھا۔ یہاں ذکر کرنے کے لیے دو اہم کالز [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) ہیں، جو دراصل ہمارے اسمارٹ کانٹریکٹ کو Sepolia چین پر لکھنے کی درخواست ہے، اور [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز بھیجتے وقت ایک عام پیٹرن)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) پر یہ ٹیوٹوریل دیکھیں۔

اس ٹیوٹوریل کے حصہ 1 کے لیے بس اتنا ہی۔ [حصہ 2 میں، ہم دراصل ایک NFT منٹ کر کے اپنے اسمارٹ کانٹریکٹ کے ساتھ تعامل کریں گے](/developers/tutorials/how-to-mint-an-nft/)، اور [حصہ 3 میں ہم آپ کو دکھائیں گے کہ آپ اپنے ایتھیریم والیٹ میں اپنا NFT کیسے دیکھ سکتے ہیں](/developers/tutorials/how-to-view-nft-in-metamask/)!