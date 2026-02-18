---
title: "NFT کیسے لکھیں اور ڈیپلوئے کریں (NFT ٹیوٹوریل سیریز کا حصہ 1/3)"
description: "یہ ٹیوٹوریل NFTs پر ایک سیریز کا حصہ 1 ہے جو آپ کو مرحلہ وار بتائے گا کہ Ethereum اور انٹر پلینٹری فائل سسٹم (IPFS) کا استعمال کرتے ہوئے ایک نان-فنجیبل ٹوکن (ERC-721 ٹوکن) اسمارٹ کنٹریکٹ کیسے لکھیں اور ڈیپلوئے کریں۔"
author: "Sumi Mudgil"
tags: [ "ERC-721", "Alchemy", "Solidity", "اسمارٹ معاہدات" ]
skill: beginner
lang: ur-in
published: 2021-04-22
---

NFTs کے بلاک چین کو عوام کی نظروں میں لانے کے ساتھ، اب آپ کے لیے Ethereum بلاک چین پر اپنا خود کا NFT کنٹریکٹ (ERC-721 ٹوکن) شائع کرکے اس ہائپ کو خود سمجھنے کا ایک بہترین موقع ہے!

Alchemy کو NFT اسپیس کے سب سے بڑے ناموں کو طاقت فراہم کرنے پر بے حد فخر ہے، جس میں Makersplace (جس نے حال ہی میں کرسٹی'ز میں 69 ملین ڈالر میں ایک ریکارڈ ڈیجیٹل آرٹ ورک فروخت کیا)، Dapper Labs (NBA Top Shot اور Crypto Kitties کے تخلیق کار)، OpenSea (دنیا کا سب سے بڑا NFT مارکیٹ پلیس)، Zora، Super Rare، NFTfi، Foundation، Enjin، Origin Protocol، Immutable، اور مزید شامل ہیں۔

اس ٹیوٹوریل میں، ہم [MetaMask](https://metamask.io/)، [Solidity](https://docs.soliditylang.org/en/v0.8.0/)، [Hardhat](https://hardhat.org/)، [Pinata](https://pinata.cloud/) اور [Alchemy](https://alchemy.com/signup/eth) کا استعمال کرتے ہوئے Sepolia ٹیسٹ نیٹ ورک پر ایک ERC-721 اسمارٹ کنٹریکٹ بنانے اور ڈیپلوئے کرنے کے بارے میں بتائیں گے (اگر آپ ابھی تک نہیں سمجھتے کہ ان میں سے کسی کا کیا مطلب ہے تو پریشان نہ ہوں — ہم اس کی وضاحت کریں گے!)۔

اس ٹیوٹوریل کے حصہ 2 میں ہم دیکھیں گے کہ ہم اپنے اسمارٹ کنٹریکٹ کا استعمال کرکے ایک NFT کیسے مِنٹ کر سکتے ہیں، اور حصہ 3 میں ہم وضاحت کریں گے کہ MetaMask پر اپنے NFT کو کیسے دیکھیں۔

اور ہاں، اگر آپ کے پاس کسی بھی وقت کوئی سوالات ہوں، تو [Alchemy Discord](https://discord.gg/gWuC7zB) میں رابطہ کرنے یا [Alchemy کی NFT API دستاویزات](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api) پر جانے میں ہچکچاہٹ محسوس نہ کریں!

## مرحلہ 1: Ethereum نیٹ ورک سے جڑیں {#connect-to-ethereum}

Ethereum بلاک چین سے درخواستیں کرنے کے بہت سے طریقے ہیں، لیکن چیزوں کو آسان بنانے کے لیے، ہم [Alchemy](https://alchemy.com/signup/eth) پر ایک مفت اکاؤنٹ استعمال کریں گے، جو ایک بلاک چین ڈیولپر پلیٹ فارم اور API ہے جو ہمیں اپنے نوڈس چلائے بغیر Ethereum چین کے ساتھ بات چیت کرنے کی اجازت دیتا ہے۔

اس ٹیوٹوریل میں، ہم اپنے اسمارٹ کنٹریکٹ کی ڈیپلوئمنٹ کے دوران پس پردہ کیا ہو رہا ہے یہ سمجھنے کے لیے مانیٹرنگ اور تجزیات کے لیے Alchemy کے ڈیولپر ٹولز کا بھی فائدہ اٹھائیں گے۔ اگر آپ کے پاس پہلے سے Alchemy اکاؤنٹ نہیں ہے، تو آپ [یہاں](https://alchemy.com/signup/eth) مفت میں سائن اپ کر سکتے ہیں۔

## مرحلہ 2: اپنی ایپ (اور API کلید) بنائیں {#make-api-key}

ایک بار جب آپ Alchemy اکاؤنٹ بنا لیں، تو آپ ایک ایپ بنا کر API کلید تیار کر سکتے ہیں۔ یہ ہمیں Sepolia ٹیسٹ نیٹ ورک سے درخواستیں کرنے کی اجازت دے گا۔ اگر آپ ٹیسٹ نیٹ ورکس کے بارے میں مزید جاننے کے لیے متجسس ہیں تو [اس گائیڈ](https://docs.alchemyapi.io/guides/choosing-a-network) کو دیکھیں۔

1. نیو بار میں "Apps" پر ہوور کرکے اور "Create App" پر کلک کرکے اپنے Alchemy ڈیش بورڈ میں "Create App" صفحہ پر جائیں۔

![اپنی ایپ بنائیں](./create-your-app.png)

2. اپنی ایپ کو نام دیں (ہم نے “My First NFT!” منتخب کیا)، ایک مختصر تفصیل دیں، چین کے لیے “Ethereum” منتخب کریں، اور اپنے نیٹ ورک کے لیے “Sepolia” کا انتخاب کریں۔ مرج کے بعد سے دوسرے ٹیسٹ نیٹس کو فرسودہ کر دیا گیا ہے۔

![اپنی ایپ کو کنفیگر اور شائع کریں](./alchemy-explorer-sepolia.png)

3. “Create app” پر کلک کریں اور بس! آپ کی ایپ نیچے دی گئی ٹیبل میں ظاہر ہونی چاہیے۔

## مرحلہ 3: ایک Ethereum اکاؤنٹ (ایڈریس) بنائیں {#create-eth-address}

ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ہمیں ایک Ethereum اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم MetaMask استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جو آپ کے Ethereum اکاؤنٹ ایڈریس کو منظم کرنے کے لیے استعمال ہوتا ہے۔ اگر آپ یہ سمجھنا چاہتے ہیں کہ Ethereum پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو Ethereum فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

آپ [یہاں](https://metamask.io/download) مفت میں MetaMask اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی اکاؤنٹ ہے، تو یقینی بنائیں کہ اوپری دائیں کونے میں "Sepolia Test Network" پر سوئچ کریں (تاکہ ہم اصلی پیسے کے ساتھ کام نہ کر رہے ہوں)۔

![Sepolia کو اپنے نیٹ ورک کے طور پر سیٹ کریں](./metamask-goerli.png)

## مرحلہ 4: ایک فاسیٹ سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

اپنے اسمارٹ کنٹریکٹ کو ٹیسٹ نیٹ ورک پر ڈیپلوئے کرنے کے لیے، ہمیں کچھ جعلی ETH کی ضرورت ہوگی۔ ETH حاصل کرنے کے لیے آپ Alchemy کے زیر اہتمام [Sepolia Faucet](https://sepoliafaucet.com/) پر جا سکتے ہیں، لاگ ان کریں اور اپنا اکاؤنٹ ایڈریس درج کریں، "Send Me ETH" پر کلک کریں۔ اس کے فوراً بعد آپ کو اپنے MetaMask اکاؤنٹ میں ETH نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#check-balance}

ہمارا بیلنس موجود ہے یا نہیں اس کی دوبارہ جانچ کرنے کے لیے، آئیے [Alchemy کے کمپوزر ٹول](https://composer.alchemyapi.io?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D) کا استعمال کرتے ہوئے ایک [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) درخواست کریں۔ یہ ہمارے والیٹ میں ETH کی رقم واپس کرے گا۔ اپنے MetaMask اکاؤنٹ کا ایڈریس درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

    ```
    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`
    ```

> **نوٹ** یہ نتیجہ wei میں ہے، ETH میں نہیں۔ Wei کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ wei سے ETH میں تبدیلی 1 eth = 10<sup>18</sup> wei ہے۔ لہذا اگر ہم 0xde0b6b3a7640000 کو ڈیسیمل میں تبدیل کرتے ہیں تو ہمیں 1\*10<sup>18</sup> wei ملتا ہے، جو 1 ETH کے برابر ہے۔

اف! ہمارا جعلی پیسہ سب وہیں ہے۔

## مرحلہ 6: ہمارے پروجیکٹ کو شروع کریں {#initialize-project}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

    ```
    mkdir my-nft
    cd my-nft
    ```

اب جب کہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے npm init استعمال کریں گے۔ اگر آپ کے پاس پہلے سے npm انسٹال نہیں ہے، تو [ان ہدایات](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) پر عمل کریں (ہمیں [Node.js](https://nodejs.org/en/download/) کی بھی ضرورت ہوگی، لہذا اسے بھی ڈاؤن لوڈ کریں!)۔

    ```
    npm init
    ```

اس سے کوئی فرق نہیں پڑتا کہ آپ انسٹالیشن کے سوالات کا جواب کیسے دیتے ہیں؛ یہاں ہم نے اسے حوالہ کے لیے کیسے کیا ہے:

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

Hardhat آپ کے Ethereum سافٹ ویئر کو کمپائل، ڈیپلوئے، ٹیسٹ اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ ڈیولپرز کو لائیو چین پر ڈیپلوئے کرنے سے پہلے مقامی طور پر اسمارٹ کنٹریکٹس اور dapps بنانے میں مدد کرتا ہے۔

ہمارے my-nft پروجیکٹ کے اندر چلائیں:

    ```
    npm install --save-dev hardhat
    ```

[انسٹالیشن کی ہدایات](https://hardhat.org/getting-started/#overview) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

## مرحلہ 8: Hardhat پروجیکٹ بنائیں {#create-hardhat-project}

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
    👷 Welcome to Hardhat v2.0.11 👷‍
    ? What do you want to do? …
    Create a sample project
    ❯ Create an empty hardhat.config.js
    Quit
    ```

یہ ہمارے لیے ایک hardhat.config.js فائل تیار کرے گا جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#add-project-folders}

اپنے پروجیکٹ کو منظم رکھنے کے لیے، ہم دو نئے فولڈر بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

    ```
    mkdir contracts
    mkdir scripts
    ```

- `contracts/` وہ جگہ ہے جہاں ہم اپنا NFT اسمارٹ کنٹریکٹ کوڈ رکھیں گے۔

- `scripts/` وہ جگہ ہے جہاں ہم اپنے اسمارٹ کنٹریکٹ کو ڈیپلوئے کرنے اور اس کے ساتھ تعامل کرنے کے لیے اسکرپٹس رکھیں گے۔

## مرحلہ 10: ہمارا کنٹریکٹ لکھیں {#write-contract}

اب جب کہ ہمارا ماحول سیٹ ہو گیا ہے، تو مزید دلچسپ چیزوں کی طرف بڑھتے ہیں: _ہمارا اسمارٹ کنٹریکٹ کوڈ لکھنا!_

اپنے پسندیدہ ایڈیٹر میں my-nft پروجیکٹ کھولیں (ہمیں [VSCode](https://code.visualstudio.com/) پسند ہے)۔ اسمارٹ کنٹریکٹس Solidity نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا MyNFT.sol اسمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔

1. `contracts` فولڈر پر جائیں اور MyNFT.sol نامی ایک نئی فائل بنائیں۔

2. ذیل میں ہمارا NFT اسمارٹ کنٹریکٹ کوڈ ہے، جسے ہم نے [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc721) لائبریری کے ERC-721 نفاذ پر مبنی کیا ہے۔ نیچے دیئے گئے مواد کو اپنی MyNFT.sol فائل میں کاپی اور پیسٹ کریں۔

   ```solidity
   //Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
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

3. چونکہ ہم OpenZeppelin کنٹریکٹ لائبریری سے کلاسز وراثت میں لے رہے ہیں، اپنی کمانڈ لائن میں `npm install @openzeppelin/contracts^4.0.0` چلا کر لائبریری کو اپنے فولڈر میں انسٹال کریں۔

تو، یہ کوڈ اصل میں _کرتا_ کیا ہے؟ آئیے اسے لائن بہ لائن توڑتے ہیں۔

ہمارے اسمارٹ کنٹریکٹ کے اوپری حصے میں، ہم تین [OpenZeppelin](https://openzeppelin.com/) اسمارٹ کنٹریکٹ کلاسز درآمد کرتے ہیں:

- @openzeppelin/contracts/token/ERC721/ERC721.sol میں ERC-721 معیار کا نفاذ شامل ہے، جسے ہمارا NFT اسمارٹ کنٹریکٹ وراثت میں لے گا۔ (ایک درست NFT ہونے کے لیے، آپ کے اسمارٹ کنٹریکٹ کو ERC-721 معیار کے تمام طریقوں کو نافذ کرنا ہوگا)۔ وراثت میں ملے ERC-721 فنکشنز کے بارے میں مزید جاننے کے لیے، انٹرفیس کی تعریف [یہاں](https://eips.ethereum.org/EIPS/eip-721) دیکھیں۔

- @openzeppelin/contracts/utils/Counters.sol کاؤنٹرز فراہم کرتا ہے جنہیں صرف ایک سے بڑھایا یا گھٹایا جا سکتا ہے۔ ہمارا اسمارٹ کنٹریکٹ مِنٹ کیے گئے NFTs کی کل تعداد پر نظر رکھنے اور ہمارے نئے NFT پر منفرد ID سیٹ کرنے کے لیے ایک کاؤنٹر استعمال کرتا ہے۔ (ایک اسمارٹ کنٹریکٹ کا استعمال کرتے ہوئے مِنٹ کیے گئے ہر NFT کو ایک منفرد ID تفویض کی جانی چاہیے—یہاں ہماری منفرد ID صرف موجودہ NFTs کی کل تعداد سے طے ہوتی ہے۔ مثال کے طور پر، پہلا NFT جسے ہم اپنے اسمارٹ کنٹریکٹ سے مِنٹ کرتے ہیں اس کی ID "1" ہے، ہمارے دوسرے NFT کی ID "2" ہے، وغیرہ)۔

- @openzeppelin/contracts/access/Ownable.sol ہمارے اسمارٹ کنٹریکٹ پر [رسائی کنٹرول](https://docs.openzeppelin.com/contracts/3.x/access-control) سیٹ کرتا ہے، تاکہ صرف اسمارٹ کنٹریکٹ کا مالک (آپ) ہی NFTs مِنٹ کر سکے۔ (نوٹ کریں، رسائی کنٹرول کو شامل کرنا مکمل طور پر ایک ترجیح ہے۔ اگر آپ چاہتے ہیں کہ کوئی بھی آپ کے اسمارٹ کنٹریکٹ کا استعمال کرتے ہوئے NFT مِنٹ کر سکے، تو لائن 10 پر Ownable لفظ اور لائن 17 پر onlyOwner کو ہٹا دیں)۔

ہمارے امپورٹ اسٹیٹمنٹس کے بعد، ہمارے پاس ہمارا کسٹم NFT اسمارٹ کنٹریکٹ ہے، جو حیرت انگیز طور پر مختصر ہے — اس میں صرف ایک کاؤنٹر، ایک کنسٹرکٹر، اور ایک ہی فنکشن ہے! یہ ہمارے وراثت میں ملے OpenZeppelin کنٹریکٹس کی بدولت ہے، جو ایک NFT بنانے کے لیے درکار زیادہ تر طریقوں کو نافذ کرتے ہیں، جیسے `ownerOf` جو NFT کے مالک کو واپس کرتا ہے، اور `transferFrom`، جو NFT کی ملکیت کو ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں منتقل کرتا ہے۔

ہمارے ERC-721 کنسٹرکٹر میں، آپ دیکھیں گے کہ ہم 2 اسٹرنگز، “MyNFT” اور “NFT” پاس کرتے ہیں۔ پہلا متغیر اسمارٹ کنٹریکٹ کا نام ہے، اور دوسرا اس کی علامت ہے۔ آپ ان میں سے ہر ایک متغیر کو جو چاہیں نام دے سکتے ہیں!

آخر میں، ہمارے پاس ہمارا فنکشن `mintNFT(address recipient, string memory tokenURI)` ہے جو ہمیں ایک NFT مِنٹ کرنے کی اجازت دیتا ہے! آپ دیکھیں گے کہ یہ فنکشن دو متغیرات لیتا ہے:

- `address recipient` اس ایڈریس کی وضاحت کرتا ہے جو آپ کا تازہ مِنٹ کیا ہوا NFT وصول کرے گا

- `string memory tokenURI` ایک اسٹرنگ ہے جسے ایک JSON دستاویز میں حل ہونا چاہئے جو NFT کے میٹا ڈیٹا کو بیان کرتا ہے۔ ایک NFT کا میٹا ڈیٹا ہی دراصل اسے زندگی بخشتا ہے، جس سے اس میں قابل ترتیب خصوصیات ہوتی ہیں، جیسے نام، تفصیل، تصویر، اور دیگر خصوصیات۔ اس ٹیوٹوریل کے حصہ 2 میں، ہم اس میٹا ڈیٹا کو کنفیگر کرنے کا طریقہ بیان کریں گے۔

`mintNFT` وراثت میں ملی ERC-721 لائبریری سے کچھ طریقے کال کرتا ہے، اور آخر میں ایک نمبر واپس کرتا ہے جو تازہ مِنٹ کیے گئے NFT کی ID کی نمائندگی کرتا ہے۔

## مرحلہ 11: MetaMask اور Alchemy کو اپنے پروجیکٹ سے جوڑیں {#connect-metamask-and-alchemy}

اب جب کہ ہم نے ایک MetaMask والیٹ، Alchemy اکاؤنٹ بنا لیا ہے، اور اپنا اسمارٹ کنٹریکٹ لکھ لیا ہے، اب وقت آگیا ہے کہ تینوں کو جوڑا جائے۔

آپ کے ورچوئل والیٹ سے بھیجی گئی ہر ٹرانزیکشن کے لیے آپ کی منفرد پرائیویٹ کلید کا استعمال کرتے ہوئے ایک دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی پرائیویٹ کلید (اور Alchemy API کلید) کو ایک ماحولیاتی فائل میں محفوظ طریقے سے اسٹور کر سکتے ہیں۔

ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے پر [یہ ٹیوٹوریل](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) دیکھیں۔

سب سے پہلے، اپنی پروجیکٹ ڈائرکٹری میں dotenv پیکیج انسٹال کریں:

    ```
    npm install dotenv --save
    ```

پھر، ہمارے پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی MetaMask پرائیویٹ کلید اور HTTP Alchemy API URL شامل کریں۔

- اپنی پرائیویٹ کلید کو MetaMask سے ایکسپورٹ کرنے کے لیے [ان ہدایات](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) پر عمل کریں۔

- HTTP Alchemy API URL حاصل کرنے کے لیے نیچے دیکھیں اور اسے اپنے کلپ بورڈ پر کاپی کریں۔

![اپنا Alchemy API URL کاپی کریں](./copy-alchemy-api-url.gif)

اب آپ کی `.env` فائل اس طرح نظر آنی چاہیے:

    ```
    API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
    PRIVATE_KEY="your-metamask-private-key"
    ```

ان کو حقیقت میں ہمارے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 میں اپنی hardhat.config.js فائل میں ان متغیرات کا حوالہ دیں گے۔

<EnvWarningBanner />

## مرحلہ 12: Ethers.js انسٹال کریں {#install-ethers}

Ethers.js ایک لائبریری ہے جو [معیاری JSON-RPC طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر Ethereum کے ساتھ تعامل اور درخواستیں کرنا آسان بناتی ہے۔

Hardhat اضافی ٹولنگ اور توسیع شدہ فعالیت کے لیے [پلگ انز](https://hardhat.org/plugins/) کو ضم کرنا انتہائی آسان بناتا ہے۔ ہم کنٹریکٹ ڈیپلائمنٹ کے لیے [Ethers پلگ ان](https://hardhat.org/docs/plugins/official-plugins#hardhat-ethers) سے فائدہ اٹھائیں گے ([Ethers.js](https://github.com/ethers-io/ethers.js/) میں کچھ انتہائی صاف کنٹریکٹ ڈیپلائمنٹ کے طریقے ہیں)۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

    ```
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    ```

ہم اگلے مرحلے میں اپنی hardhat.config.js میں بھی ethers کی ضرورت محسوس کریں گے۔

## مرحلہ 13: hardhat.config.js کو اپ ڈیٹ کریں {#update-hardhat-config}

ہم نے اب تک کئی انحصار اور پلگ ان شامل کیے ہیں، اب ہمیں hardhat.config.js کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی hardhat.config.js کو اس طرح دکھنے کے لیے اپ ڈیٹ کریں:

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

## مرحلہ 14: ہمارا کنٹریکٹ کمپائل کریں {#compile-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنے کنٹریکٹ کو کمپائل کریں۔ کمپائل ٹاسک بلٹ ان ہارڈ ہیٹ ٹاسک میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

    ```
    npx hardhat compile
    ```

آپ کو سورس فائل میں SPDX لائسنس شناخت کنندہ فراہم نہ کیے جانے کے بارے میں ایک انتباہ مل سکتا ہے، لیکن اس کے بارے میں فکر کرنے کی ضرورت نہیں ہے — امید ہے کہ باقی سب کچھ ٹھیک نظر آئے گا! اگر نہیں، تو آپ ہمیشہ [Alchemy discord](https://discord.gg/u72VCg3) میں پیغام بھیج سکتے ہیں۔

## مرحلہ 15: ہماری ڈیپلوئے اسکرپٹ لکھیں {#write-deploy}

اب جب کہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آگیا ہے کہ ہم اپنی کنٹریکٹ ڈیپلوئے اسکرپٹ لکھیں۔

`scripts/` فولڈر پر جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، اس میں درج ذیل مواد شامل کریں:

```js
async function main() {
  const MyNFT = await ethers.getContractFactory("MyNFT")

  // Start deployment, returning a promise that resolves to a contract object
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

Hardhat اپنے [کنٹریکٹس ٹیوٹوریل](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) میں بہت اچھی طرح سے وضاحت کرتا ہے کہ کوڈ کی یہ ہر لائن کیا کرتی ہے، ہم نے یہاں ان کی وضاحتیں اپنائی ہیں۔

    ```
    const MyNFT = await ethers.getContractFactory("MyNFT");
    ```

ethers.js میں ایک ContractFactory نئے اسمارٹ کنٹریکٹس کو ڈیپلوئے کرنے کے لیے استعمال ہونے والا ایک خلاصہ ہے، لہذا MyNFT یہاں ہمارے NFT کنٹریکٹ کی مثالوں کے لیے ایک فیکٹری ہے۔ hardhat-ethers پلگ ان کا استعمال کرتے وقت ContractFactory اور Contract مثالیں پہلے دستخط کنندہ سے بطور ڈیفالٹ منسلک ہوتی ہیں۔

    ```
    const myNFT = await MyNFT.deploy();
    ```

ContractFactory پر deploy() کو کال کرنے سے ڈیپلوئمنٹ شروع ہو جائے گی، اور ایک Promise واپس آئے گا جو ایک Contract میں حل ہو جائے گا۔ یہ وہ آبجیکٹ ہے جس میں ہمارے ہر اسمارٹ کنٹریکٹ فنکشن کے لیے ایک طریقہ ہے۔

## مرحلہ 16: ہمارا کنٹریکٹ ڈیپلوئے کریں {#deploy-contract}

ہم آخر کار اپنے اسمارٹ کنٹریکٹ کو ڈیپلوئے کرنے کے لیے تیار ہیں! اپنی پروجیکٹ ڈائرکٹری کی جڑ پر واپس جائیں، اور کمانڈ لائن میں چلائیں:

    ```
    npx hardhat --network sepolia run scripts/deploy.js
    ```

پھر آپ کو کچھ اس طرح نظر آنا چاہیے:

    ```
    Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
    ```

اگر ہم [Sepolia etherscan](https://sepolia.etherscan.io/) پر جائیں اور اپنے کنٹریکٹ ایڈریس کو تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہئے کہ یہ کامیابی سے ڈیپلوئے ہو گیا ہے۔ اگر آپ اسے فوراً نہیں دیکھ سکتے ہیں، تو براہ کرم تھوڑی دیر انتظار کریں کیونکہ اس میں کچھ وقت لگ سکتا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![Etherscan پر اپنے ٹرانزیکشن کا ایڈریس دیکھیں](./etherscan-sepoila-contract-creation.png)

From ایڈریس آپ کے MetaMask اکاؤنٹ کے ایڈریس سے ملنا چاہیے اور To ایڈریس پر “Contract Creation” لکھا ہوگا۔ اگر ہم ٹرانزیکشن میں کلک کرتے ہیں، تو ہمیں To فیلڈ میں اپنا کنٹریکٹ ایڈریس نظر آئے گا:

![Etherscan پر اپنے کنٹریکٹ کا ایڈریس دیکھیں](./etherscan-sepolia-tx-details.png)

یاہ! آپ نے ابھی اپنا NFT اسمارٹ کنٹریکٹ Ethereum (ٹیسٹ نیٹ) چین پر ڈیپلوئے کیا ہے!

یہ سمجھنے کے لیے کہ پس پردہ کیا ہو رہا ہے، آئیے اپنے [Alchemy ڈیش بورڈ](https://dashboard.alchemyapi.io/explorer) میں ایکسپلورر ٹیب پر جائیں۔ اگر آپ کے پاس ایک سے زیادہ Alchemy ایپس ہیں تو ایپ کے ذریعے فلٹر کرنا اور “MyNFT” منتخب کرنا یقینی بنائیں۔

![Alchemy کے ایکسپلورر ڈیش بورڈ کے ساتھ “پس پردہ” کی گئی کالز دیکھیں](./alchemy-explorer-goerli.png)

یہاں آپ کو مٹھی بھر JSON-RPC کالز نظر آئیں گی جو Hardhat/Ethers نے ہمارے لیے پس پردہ کی تھیں جب ہم نے .deploy() فنکشن کو کال کیا تھا۔ یہاں دو اہم کالز [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth_sendrawtransaction) ہیں، جو دراصل ہمارے اسمارٹ کنٹریکٹ کو Sepolia چین پر لکھنے کی درخواست ہے، اور [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth_gettransactionbyhash) جو ہیش کی بنیاد پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز بھیجتے وقت ایک عام نمونہ)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [Web3 کا استعمال کرتے ہوئے ٹرانزیکشنز بھیجنے](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) پر یہ ٹیوٹوریل دیکھیں۔

اس ٹیوٹوریل کے حصہ 1 کے لیے بس اتنا ہی۔ [حصہ 2 میں، ہم اصل میں ایک NFT مِنٹ کرکے اپنے اسمارٹ کنٹریکٹ کے ساتھ تعامل کریں گے](/developers/tutorials/how-to-mint-an-nft/)، اور [حصہ 3 میں ہم آپ کو دکھائیں گے کہ اپنے Ethereum والیٹ میں اپنے NFT کو کیسے دیکھیں](/developers/tutorials/how-to-view-nft-in-metamask/)!
