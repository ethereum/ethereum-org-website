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

چونکہ غیر متبادل ٹوکن (NFTs) بلاک چین کو عوام کی نظروں میں لا رہے ہیں، اس لیے اب ایتھیریم بلاک چین پر اپنا <span dir="ltr">NFT</span> کنٹریکٹ (<span dir="ltr">ERC-721</span> ٹوکن) شائع کر کے خود اس ہائپ کو سمجھنے کا ایک بہترین موقع ہے!

اس ٹیوٹوریل میں، ہم [میٹاماسک](https://metamask.io/)، [<span dir="ltr">Solidity</span>](https://docs.soliditylang.org/)، [<span dir="ltr">Hardhat</span>](https://hardhat.org/)، [<span dir="ltr">Pinata</span>](https://pinata.cloud/) اور [<span dir="ltr">Alchemy</span>](https://alchemy.com/signup/eth) کا استعمال کرتے ہوئے <span dir="ltr">Sepolia</span> آزمائشی نیٹ ورک پر ایک <span dir="ltr">ERC-721</span> سمارٹ کنٹریکٹ بنانے اور تعینات کرنے کے عمل سے گزریں گے (اگر آپ کو ابھی تک ان میں سے کسی کا مطلب سمجھ نہیں آیا تو پریشان نہ ہوں — ہم اس کی وضاحت کریں گے!)۔

اس ٹیوٹوریل کے حصہ 2 میں ہم دیکھیں گے کہ ہم اپنے سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے ایک <span dir="ltr">NFT</span> کیسے ڈھال سکتے ہیں، اور حصہ 3 میں ہم وضاحت کریں گے کہ میٹاماسک پر اپنا <span dir="ltr">NFT</span> کیسے دیکھا جائے۔

اور یقیناً، اگر آپ کے کسی بھی موقع پر سوالات ہوں، تو [<span dir="ltr">Alchemy</span> ڈسکارڈ](https://discord.gg/gWuC7zB) میں رابطہ کرنے سے نہ ہچکچائیں یا [<span dir="ltr">Alchemy</span> کی <span dir="ltr">NFT</span> ایپلیکیشن پروگرامنگ انٹرفیس (API) دستاویزات](https://www.alchemy.com/docs/reference/nft-api-quickstart) ملاحظہ کریں!

## مرحلہ 1: ایتھیریم نیٹ ورک سے جڑیں {#connect-to-ethereum}

ایتھیریم بلاک چین پر درخواستیں بھیجنے کے کئی طریقے ہیں، لیکن چیزوں کو آسان بنانے کے لیے، ہم [Alchemy](https://alchemy.com/signup/eth) پر ایک مفت اکاؤنٹ استعمال کریں گے، جو کہ ایک بلاک چین ڈیولپر پلیٹ فارم اور <span dir="ltr">API</span> ہے جو ہمیں اپنے نوڈز چلائے بغیر ایتھیریم چین کے ساتھ بات چیت کرنے کی سہولت دیتا ہے۔

اس ٹیوٹوریل میں، ہم نگرانی اور تجزیات کے لیے <span dir="ltr">Alchemy</span> کے ڈیولپر ٹولز کا بھی فائدہ اٹھائیں گے تاکہ یہ سمجھ سکیں کہ ہماری سمارٹ کنٹریکٹ تعیناتی میں اندرونی طور پر کیا ہو رہا ہے۔ اگر آپ کے پاس پہلے سے <span dir="ltr">Alchemy</span> اکاؤنٹ نہیں ہے، تو آپ [یہاں](https://alchemy.com/signup/eth) مفت سائن اپ کر سکتے ہیں۔

## مرحلہ 2: اپنی ایپ (اور <span dir="ltr">API</span> کلید) بنائیں {#make-api-key}

ایک بار جب آپ <span dir="ltr">Alchemy</span> اکاؤنٹ بنا لیتے ہیں، تو آپ ایک ایپ بنا کر <span dir="ltr">API</span> کلید تیار کر سکتے ہیں۔ یہ ہمیں <span dir="ltr">Sepolia</span> آزمائشی نیٹ ورک پر درخواستیں بھیجنے کی اجازت دے گا۔ اگر آپ آزمائشی نیٹ ورکس کے بارے میں مزید جاننے کے لیے متجسس ہیں تو [یہ گائیڈ](https://www.alchemy.com/docs/choosing-a-web3-network) دیکھیں۔

1. نیویگیشن بار میں "Select an app" کو منتخب کر کے اور "Create new app" پر کلک کر کے اپنے <span dir="ltr">Alchemy</span> ڈیش بورڈ میں "Create new app" صفحہ پر جائیں۔

![اپنی ایپ بنائیں](./alchemy-create-new-app.png)

2. اپنی ایپ کا نام رکھیں (ہم نے "My First NFT!" کا انتخاب کیا)، ایک مختصر تفصیل فراہم کریں، اور استعمال کا کیس منتخب کریں۔ اس کے بعد، "Ethereum" تلاش کریں اور نیٹ ورک کو منتخب کریں۔ ہم <span dir="ltr">Sepolia</span> کا استعمال کریں گے، جو ایپلیکیشن ڈیولپمنٹ کے لیے تجویز کردہ آزمائشی نیٹ ورک ہے ([ایتھیریم نیٹ ورکس](/developers/docs/networks/#ethereum-testnets) دیکھیں)۔

3. آگے بڑھنے کے لیے "Next" پر کلک کریں، پھر "Create app" اور بس! آپ کی ایپ نیویگیشن بار کے ڈراپ ڈاؤن مینو میں ظاہر ہونی چاہیے، جس میں کاپی کرنے کے لیے ایک <span dir="ltr">API</span> کلید دستیاب ہوگی۔

## مرحلہ 3: ایک ایتھیریم اکاؤنٹ (پتہ) بنائیں {#create-eth-address}

ہمیں ٹرانزیکشنز بھیجنے اور وصول کرنے کے لیے ایک ایتھیریم اکاؤنٹ کی ضرورت ہے۔ اس ٹیوٹوریل کے لیے، ہم میٹاماسک کا استعمال کریں گے، جو براؤزر میں ایک ورچوئل والیٹ ہے جسے آپ کے ایتھیریم اکاؤنٹ کا پتہ منظم کرنے کے لیے استعمال کیا جاتا ہے۔ اگر آپ اس بارے میں مزید سمجھنا چاہتے ہیں کہ ایتھیریم پر ٹرانزیکشنز کیسے کام کرتی ہیں، تو ایتھیریم فاؤنڈیشن کا [یہ صفحہ](/developers/docs/transactions/) دیکھیں۔

آپ [یہاں](https://metamask.io/download) مفت میں میٹاماسک اکاؤنٹ ڈاؤن لوڈ اور بنا سکتے ہیں۔ جب آپ اکاؤنٹ بنا رہے ہوں، یا اگر آپ کے پاس پہلے سے ہی ایک اکاؤنٹ ہے، تو نیٹ ورک کے انتخاب کے مینو کا استعمال کرتے ہوئے "Sepolia" آزمائشی نیٹ ورک پر سوئچ کرنا یقینی بنائیں (تاکہ ہم حقیقی رقم کے ساتھ کام نہ کر رہے ہوں)۔ اگر آپ کو <span dir="ltr">Sepolia</span> فہرست میں نظر نہیں آتا ہے، تو اوپری دائیں کونے میں مینو کھولیں، "Networks" کو منتخب کریں، اور "Show test networks" کو آن کریں ([آزمائشی نیٹ ورکس دیکھنے کے لیے میٹاماسک کی گائیڈ](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) دیکھیں)۔

![Sepolia کو اپنے نیٹ ورک کے طور پر سیٹ کریں](./metamask-sepolia.png)

## مرحلہ 4: فوسٹ سے ایتھر شامل کریں {#step-4-add-ether-from-a-faucet}

اپنے سمارٹ کنٹریکٹ کو آزمائشی نیٹ ورک پر تعینات کرنے کے لیے، ہمیں کچھ نقلی <span dir="ltr">ETH</span> کی ضرورت ہوگی۔ <span dir="ltr">Sepolia ETH</span> حاصل کرنے کے لیے، [<span dir="ltr">Sepolia</span> نیٹ ورک کی تفصیلات](/developers/docs/networks/#sepolia) میں درج فوسٹس میں سے ایک کا انتخاب کریں اور اپنے اکاؤنٹ کا پتہ درج کریں۔ اگر ایک کام نہیں کرتا ہے، تو دوسرا آزمائیں کیونکہ وہ بعض اوقات خشک ہو سکتے ہیں، اور کچھ کے اہلیت کے اصول ہوتے ہیں: مثال کے طور پر، [<span dir="ltr">Alchemy Sepolia</span> فوسٹ](https://www.alchemy.com/faucets/ethereum-sepolia) کے لیے ضروری ہے کہ وصول کرنے والے پتے کے پاس ایتھیریم مین نیٹ پر کم از کم <span dir="ltr">0.001 ETH</span> ہوں۔ آپ کو جلد ہی اپنے میٹاماسک اکاؤنٹ میں <span dir="ltr">ETH</span> نظر آنا چاہیے!

## مرحلہ 5: اپنا بیلنس چیک کریں {#check-balance}

یہ دوبارہ چیک کرنے کے لیے کہ ہمارا بیلنس موجود ہے، آئیے [<span dir="ltr">Alchemy</span> کے سینڈ باکس ٹول](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest) کا استعمال کرتے ہوئے ایک [<span dir="ltr">eth_getBalance</span>](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) درخواست کریں۔ یہ ہمارے والیٹ میں موجود <span dir="ltr">ETH</span> کی مقدار واپس کرے گا۔ اپنا میٹاماسک اکاؤنٹ کا پتہ درج کرنے اور "Send Request" پر کلک کرنے کے بعد، آپ کو اس طرح کا جواب نظر آنا چاہیے:

    `{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}`

> **نوٹ** یہ نتیجہ <span dir="ltr">Wei</span> میں ہے، <span dir="ltr">ETH</span> میں نہیں۔ <span dir="ltr">Wei</span> کو ایتھر کی سب سے چھوٹی اکائی کے طور پر استعمال کیا جاتا ہے۔ <span dir="ltr">Wei</span> سے <span dir="ltr">ETH</span> میں تبدیلی <span dir="ltr">1 eth = 10<sup>18</sup> wei</span> ہے۔ لہذا اگر ہم <span dir="ltr">0xde0b6b3a7640000</span> کو اعشاریہ میں تبدیل کریں تو ہمیں <span dir="ltr">1\*10<sup>18</sup> wei</span> ملتا ہے، جو <span dir="ltr">1 ETH</span> کے برابر ہے۔

شکر ہے! ہماری تمام نقلی رقم وہاں موجود ہے۔

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```
## مرحلہ 6: ہمارے پروجیکٹ کو شروع کریں {#initialize-project}

سب سے پہلے، ہمیں اپنے پروجیکٹ کے لیے ایک فولڈر بنانا ہوگا۔ اپنی کمانڈ لائن پر جائیں اور ٹائپ کریں:

```sh
mkdir my-nft
cd my-nft
```

اب جب کہ ہم اپنے پروجیکٹ فولڈر کے اندر ہیں، ہم پروجیکٹ کو شروع کرنے کے لیے `npm init` کا استعمال کریں گے۔ اگر آپ کے پاس پہلے سے `npm` انسٹال نہیں ہے، تو [<span dir="ltr">Node.js</span> کی تنصیب کی ہدایات](https://nodejs.org/en/download/) پر عمل کریں (ہمیں اس ٹیوٹوریل کے لیے <span dir="ltr">Node.js</span> اور `npm` کی ضرورت ہوگی)۔

```sh
npm init
```

اس سے کوئی خاص فرق نہیں پڑتا کہ آپ تنصیب کے سوالات کا کیا جواب دیتے ہیں؛ حوالہ کے لیے ہم نے اسے اس طرح کیا ہے:

```console
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

`package.json` کو منظور کریں۔ <span dir="ltr">Hardhat 3</span>، جسے ہم آگے انسٹال کریں گے، صرف <span dir="ltr">ES</span> ماڈیول پروجیکٹس کو سپورٹ کرتا ہے، لہذا پروجیکٹ کو اس کے طور پر نشان زد کریں:

```sh
npm pkg set type=module
```

اور ہم تیار ہیں!

## مرحلہ 7: [<span dir="ltr">Hardhat</span>](https://hardhat.org/docs/getting-started) انسٹال کریں {#install-hardhat}

<span dir="ltr">Hardhat</span> آپ کے ایتھیریم سافٹ ویئر کو مرتب کرنے، تعینات کرنے، جانچنے اور ڈیبگ کرنے کے لیے ایک ڈیولپمنٹ ماحول ہے۔ یہ لائیو چین پر تعینات کرنے سے پہلے مقامی طور پر سمارٹ کنٹریکٹس اور غیر مرکزی ایپلی کیشنز (dapps) بناتے وقت ڈیولپرز کی مدد کرتا ہے۔

<span dir="ltr">Hardhat 3</span> کے لیے <span dir="ltr">Node.js v22.13.0</span> یا اس کے بعد کا ورژن درکار ہے۔ ہمارے `my-nft` پروجیکٹ کے اندر چلائیں:

```sh
npm install --save-dev hardhat
```

[تنصیب کی ہدایات](https://hardhat.org/docs/getting-started) پر مزید تفصیلات کے لیے یہ صفحہ دیکھیں۔

## مرحلہ 8: <span dir="ltr">Hardhat</span> پروجیکٹ بنائیں {#create-hardhat-project}

`npx hardhat --init` چلانے سے ایک مکمل نمونہ پروجیکٹ تیار ہو جائے گا، لیکن اس ٹیوٹوریل کے لیے ہم چیزوں کو ہاتھ سے ترتیب دیں گے تاکہ آپ ہر حصے کو دیکھ سکیں۔ اپنے پروجیکٹ فولڈر کی روٹ میں، مندرجہ ذیل مشمولات کے ساتھ `hardhat.config.js` نامی ایک فائل بنائیں:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

یہ وہ جگہ ہے جہاں ہم اپنے پروجیکٹ کے لیے تمام سیٹ اپ کی وضاحت کریں گے (مرحلہ 13 پر)۔ فی الحال، یہ صرف <span dir="ltr">Hardhat</span> کو بتاتا ہے کہ <span dir="ltr">Solidity</span> کمپائلر کا کون سا ورژن استعمال کرنا ہے۔

## مرحلہ 9: پروجیکٹ فولڈرز شامل کریں {#add-project-folders}

اپنے پروجیکٹ کو منظم رکھنے کے لیے، ہم دو نئے فولڈرز بنائیں گے۔ اپنی کمانڈ لائن میں اپنے پروجیکٹ کی روٹ ڈائرکٹری پر جائیں اور ٹائپ کریں:

```sh
mkdir contracts
mkdir scripts
```

- `contracts/` وہ جگہ ہے جہاں ہم اپنا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ کوڈ رکھیں گے

- `scripts/` وہ جگہ ہے جہاں ہم اپنے سمارٹ کنٹریکٹ کو تعینات کرنے اور اس کے ساتھ تعامل کرنے کے لیے سکرپٹس رکھیں گے

## مرحلہ 10: اپنا کنٹریکٹ لکھیں {#write-contract}

اب جب کہ ہمارا ماحول ترتیب پا چکا ہے، مزید دلچسپ چیزوں کی طرف بڑھتے ہیں: _اپنا سمارٹ کنٹریکٹ کوڈ لکھنا!_

اپنے پسندیدہ ایڈیٹر میں `my-nft` پروجیکٹ کھولیں (ہمیں [<span dir="ltr">VSCode</span>](https://code.visualstudio.com/) پسند ہے)۔ سمارٹ کنٹریکٹس <span dir="ltr">Solidity</span> نامی زبان میں لکھے جاتے ہیں جسے ہم اپنا `MyNFT.sol` سمارٹ کنٹریکٹ لکھنے کے لیے استعمال کریں گے۔

1. `contracts` فولڈر میں جائیں اور `MyNFT.sol` نامی ایک نئی فائل بنائیں۔

2. ذیل میں ہمارا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ کوڈ ہے، جس کی بنیاد ہم نے [اوپن زیپلن](https://docs.openzeppelin.com/contracts/5.x/erc721) لائبریری کے <span dir="ltr">ERC-721</span> نفاذ پر رکھی ہے۔ ذیل کے مشمولات کو کاپی کریں اور اپنی `MyNFT.sol` فائل میں پیسٹ کریں۔

   ```solidity
   // https://docs.openzeppelin.com/contracts/5.x/erc721 پر مبنی کنٹریکٹ
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. چونکہ ہم اوپن زیپلن کنٹریکٹس لائبریری سے کلاسز وراثت میں لے رہے ہیں، اس لیے لائبریری کو ہمارے فولڈر میں انسٹال کرنے کے لیے اپنی کمانڈ لائن میں `npm install @openzeppelin/contracts` چلائیں۔ یہ ٹیوٹوریل اوپن زیپلن کنٹریکٹس <span dir="ltr">5.x</span> کا استعمال کرتا ہے، جس کے لیے <span dir="ltr">Solidity 0.8.24</span> یا اس کے بعد کا ورژن درکار ہے۔

تو، یہ کوڈ بالکل کیا _کرتا_ ہے؟ آئیے اسے لائن بہ لائن سمجھتے ہیں۔

اپنے سمارٹ کنٹریکٹ کے اوپری حصے میں، ہم تین [اوپن زیپلن](https://openzeppelin.com/) سمارٹ کنٹریکٹ کلاسز درآمد کرتے ہیں:

- `@openzeppelin/contracts/token/ERC721/ERC721.sol` میں <span dir="ltr">ERC-721</span> معیار کا نفاذ شامل ہے، جسے ہمارا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ وراثت میں لے گا۔ (ایک درست <span dir="ltr">NFT</span> ہونے کے لیے، آپ کے سمارٹ کنٹریکٹ کو <span dir="ltr">ERC-721</span> معیار کے تمام طریقوں کو نافذ کرنا چاہیے۔) وراثت میں ملنے والے <span dir="ltr">ERC-721</span> فنکشنز کے بارے میں مزید جاننے کے لیے، [یہاں](https://eips.ethereum.org/EIPS/eip-721) انٹرفیس کی تعریف دیکھیں۔

- `@openzeppelin/contracts/access/Ownable.sol` ہمارے سمارٹ کنٹریکٹ پر [رسائی کنٹرول](https://docs.openzeppelin.com/contracts/5.x/access-control) سیٹ کرتا ہے، تاکہ صرف سمارٹ کنٹریکٹ کا مالک (آپ) ہی <span dir="ltr">NFTs</span> ڈھال سکے۔ مالک وہ `initialOwner` پتہ ہے جو کنسٹرکٹر کو پاس کیا گیا ہے۔ (نوٹ کریں، رسائی کنٹرول کو شامل کرنا مکمل طور پر ایک ترجیح ہے۔ اگر آپ چاہتے ہیں کہ کوئی بھی آپ کے سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے <span dir="ltr">NFT</span> ڈھال سکے، تو کنٹریکٹ کی تعریف اور کنسٹرکٹر سے `Ownable` اور `Ownable(initialOwner)` کو ہٹا دیں، اور `mintNFT` فنکشن سے `onlyOwner` کو ہٹا دیں۔)

- `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol` <span dir="ltr">ERC-721</span> کو بڑھاتا ہے تاکہ ہر ٹوکن اپنا میٹا ڈیٹا <span dir="ltr">URI</span> محفوظ کر سکے، جسے ہم ڈھلائی کے وقت سیٹ کرتے ہیں۔

ہمارے درآمدی بیانات کے بعد، ہمارے پاس اپنا حسب ضرورت <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ ہے، جو حیرت انگیز طور پر مختصر ہے — اس میں صرف ایک کاؤنٹر، ایک کنسٹرکٹر، اور ایک ہی فنکشن شامل ہے! یہ ہمارے وراثت میں ملنے والے اوپن زیپلن کنٹریکٹس کی بدولت ہے، جو ان زیادہ تر طریقوں کو نافذ کرتے ہیں جن کی ہمیں <span dir="ltr">NFT</span> بنانے کے لیے ضرورت ہوتی ہے، جیسے کہ `ownerOf` جو <span dir="ltr">NFT</span> کا مالک واپس کرتا ہے، اور `transferFrom`، جو <span dir="ltr">NFT</span> کی ملکیت کو ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں منتقل کرتا ہے۔

کاؤنٹر، `_nextTokenId`، ڈھالے گئے <span dir="ltr">NFTs</span> کی کل تعداد کا ٹریک رکھتا ہے اور ہمارے نئے <span dir="ltr">NFT</span> پر منفرد <span dir="ltr">ID</span> سیٹ کرتا ہے۔ (سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے ڈھالے گئے ہر <span dir="ltr">NFT</span> کو ایک منفرد <span dir="ltr">ID</span> تفویض کی جانی چاہیے—یہاں ہماری منفرد <span dir="ltr">ID</span> کا تعین صرف موجود <span dir="ltr">NFTs</span> کی کل تعداد سے ہوتا ہے۔ `++_nextTokenId` استعمال ہونے سے پہلے کاؤنٹر کو بڑھاتا ہے، لہذا پہلے <span dir="ltr">NFT</span> جسے ہم اپنے سمارٹ کنٹریکٹ کے ساتھ ڈھالتے ہیں اس کی <span dir="ltr">ID</span> "1" ہوتی ہے، ہمارے دوسرے <span dir="ltr">NFT</span> کی <span dir="ltr">ID</span> "2" ہوتی ہے، وغیرہ۔)

ہمارے <span dir="ltr">ERC-721</span> کنسٹرکٹر میں، آپ دیکھیں گے کہ ہم 2 سٹرنگز، "MyNFT" اور "NFT" پاس کرتے ہیں۔ پہلا متغیر سمارٹ کنٹریکٹ کا نام ہے، اور دوسرا اس کی علامت ہے۔ آپ ان میں سے ہر ایک متغیر کا نام جو چاہیں رکھ سکتے ہیں!

آخر میں، ہمارے پاس اپنا فنکشن `mintNFT(address recipient, string memory tokenURI)` ہے جو ہمیں ایک <span dir="ltr">NFT</span> ڈھالنے کی اجازت دیتا ہے! آپ دیکھیں گے کہ یہ فنکشن دو متغیرات لیتا ہے:

- `address recipient` اس پتے کی وضاحت کرتا ہے جو آپ کا تازہ ڈھالا ہوا <span dir="ltr">NFT</span> وصول کرے گا

- `string memory tokenURI` ایک سٹرنگ ہے جسے ایک <span dir="ltr">JSON</span> دستاویز میں حل ہونا چاہیے جو <span dir="ltr">NFT</span> کے میٹا ڈیٹا کو بیان کرتی ہے۔ ایک <span dir="ltr">NFT</span> کا میٹا ڈیٹا واقعی وہ چیز ہے جو اسے زندہ کرتا ہے، جس سے اس میں قابل ترتیب خصوصیات، جیسے کہ نام، تفصیل، تصویر، اور دیگر صفات شامل ہو سکتی ہیں۔ اس ٹیوٹوریل کے حصہ 2 میں، ہم بیان کریں گے کہ اس میٹا ڈیٹا کو کیسے ترتیب دیا جائے۔

`mintNFT` وراثت میں ملنے والی <span dir="ltr">ERC-721</span> لائبریری سے کچھ طریقوں کو کال کرتا ہے، اور بالآخر ایک نمبر واپس کرتا ہے جو تازہ ڈھالے گئے <span dir="ltr">NFT</span> کی <span dir="ltr">ID</span> کی نمائندگی کرتا ہے۔

## مرحلہ 11: میٹاماسک اور <span dir="ltr">Alchemy</span> کو اپنے پروجیکٹ سے جوڑیں {#connect-metamask-and-alchemy}

اب جب کہ ہم نے ایک میٹاماسک والیٹ، <span dir="ltr">Alchemy</span> اکاؤنٹ بنا لیا ہے، اور اپنا سمارٹ کنٹریکٹ لکھ لیا ہے، اب وقت آ گیا ہے کہ ان تینوں کو جوڑا جائے۔

آپ کے ورچوئل والیٹ سے بھیجی جانے والی ہر ٹرانزیکشن کے لیے آپ کی منفرد نجی کلید کا استعمال کرتے ہوئے دستخط کی ضرورت ہوتی ہے۔ ہمارے پروگرام کو یہ اجازت فراہم کرنے کے لیے، ہم اپنی نجی کلید (اور <span dir="ltr">Alchemy API</span> کلید) کو محفوظ طریقے سے ایک ماحولیاتی فائل میں محفوظ کر سکتے ہیں۔

ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [ٹرانزیکشنز کی دستاویزات](/developers/docs/transactions/) دیکھیں۔

ہمارے پروجیکٹ کی روٹ ڈائرکٹری میں ایک `.env` فائل بنائیں، اور اس میں اپنی میٹاماسک نجی کلید اور <span dir="ltr">HTTP Alchemy API URL</span> شامل کریں۔

- میٹاماسک سے اپنی نجی کلید برآمد کرنے کے لیے [ان ہدایات](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) پر عمل کریں

- <span dir="ltr">HTTP Alchemy API URL</span> حاصل کرنے کے لیے نیچے دیکھیں اور اسے اپنے کلپ بورڈ پر کاپی کریں

![اپنا Alchemy API URL کاپی کریں](./copy-alchemy-api-url.mp4#842x480)

آپ کا `.env` اب اس طرح نظر آنا چاہیے:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

انہیں دراصل اپنے کوڈ سے جوڑنے کے لیے، ہم مرحلہ 13 میں اپنی `hardhat.config.js` فائل میں ان متغیرات کا حوالہ دیں گے۔ <span dir="ltr">Node.js</span> خود ہی `.env` فائلوں کو پڑھ سکتا ہے، اس لیے انسٹال کرنے کے لیے کوئی اضافی پیکیج نہیں ہے۔

<EnvWarningBanner />

## مرحلہ 12: <span dir="ltr">Ethers.js</span> انسٹال کریں {#install-ethers}

<span dir="ltr">Ethers.js</span> ایک لائبریری ہے جو [معیاری جے سن آر پی سی (JSON-RPC) طریقوں](/developers/docs/apis/json-rpc/) کو زیادہ صارف دوست طریقوں کے ساتھ لپیٹ کر ایتھیریم کے ساتھ تعامل کرنے اور درخواستیں بھیجنے کو آسان بناتی ہے۔

<span dir="ltr">Hardhat</span> اضافی ٹولنگ اور توسیعی فعالیت کے لیے [پلگ انز](https://hardhat.org/docs/plugins/official-plugins) کو مربوط کرنا انتہائی آسان بناتا ہے۔ ہم کنٹریکٹ کی تعیناتی کے لیے [<span dir="ltr">Ethers</span> پلگ ان](https://hardhat.org/docs/plugins/hardhat-ethers) کا فائدہ اٹھائیں گے ([<span dir="ltr">Ethers.js</span>](https://docs.ethers.org/v6/) میں کنٹریکٹ کی تعیناتی کے کچھ انتہائی صاف طریقے ہیں)۔

اپنی پروجیکٹ ڈائرکٹری میں ٹائپ کریں:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

ہم اگلے مرحلے میں پلگ ان کو اپنی `hardhat.config.js` میں بھی شامل کریں گے۔

## مرحلہ 13: `hardhat.config.js` کو اپ ڈیٹ کریں {#update-hardhat-config}

ہم نے اب تک کئی انحصار اور پلگ انز شامل کیے ہیں، اب ہمیں `hardhat.config.js` کو اپ ڈیٹ کرنے کی ضرورت ہے تاکہ ہمارے پروجیکٹ کو ان سب کے بارے میں معلوم ہو۔

اپنی `hardhat.config.js` کو اس طرح نظر آنے کے لیے اپ ڈیٹ کریں:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// API_URL اور نجی کلید کو .env فائل سے process.env میں لوڈ کریں، اگر یہ موجود ہو
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

`configVariable` <span dir="ltr">Hardhat</span> کو بتاتا ہے کہ وہ ہر قدر کو ماحولیاتی متغیر سے صرف اسی وقت پڑھے جب اس کی ضرورت ہو، لہذا `compile` جیسی کمانڈز اقدار کے سیٹ ہونے سے پہلے بھی کام کرتی ہیں۔ اگر آپ اپنی نجی کلید کو سادہ ٹیکسٹ فائل میں نہیں رکھنا چاہتے ہیں، تو <span dir="ltr">Hardhat</span> [انکرپٹڈ کی اسٹور سے کنفیگریشن متغیرات](https://hardhat.org/docs/guides/configuration-variables) بھی پڑھ سکتا ہے۔

## مرحلہ 14: اپنا کنٹریکٹ مرتب کریں {#compile-contract}

یہ یقینی بنانے کے لیے کہ اب تک سب کچھ کام کر رہا ہے، آئیے اپنا کنٹریکٹ مرتب کریں۔ مرتب کرنے کا کام <span dir="ltr">Hardhat</span> کے بلٹ ان کاموں میں سے ایک ہے۔

کمانڈ لائن سے چلائیں:

```sh
npx hardhat compile
```

پہلی بار جب آپ مرتب کرتے ہیں، تو <span dir="ltr">Hardhat</span> <span dir="ltr">Solidity</span> کمپائلر ڈاؤن لوڈ کرتا ہے۔ اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے `Compiled 1 Solidity file with solc 0.8.34`۔ اگر نہیں، تو آپ ہمیشہ [<span dir="ltr">Alchemy</span> ڈسکارڈ](https://discord.gg/gWuC7zB) میں پیغام بھیج سکتے ہیں۔

## مرحلہ 15: اپنی تعیناتی کی سکرپٹ لکھیں {#write-deploy}

اب جب کہ ہمارا کنٹریکٹ لکھا جا چکا ہے اور ہماری کنفیگریشن فائل تیار ہے، اب وقت آ گیا ہے کہ ہم اپنے کنٹریکٹ کی تعیناتی کی سکرپٹ لکھیں۔

`scripts/` فولڈر میں جائیں اور `deploy.js` نامی ایک نئی فائل بنائیں، جس میں درج ذیل مشمولات شامل کریں:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// تعیناتی شروع کریں، ایک promise واپس کرتے ہوئے جو ایک کنٹریکٹ آبجیکٹ پر resolve ہوتا ہے
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

آئیے دیکھتے ہیں کہ کوڈ کی ان میں سے ہر ایک لائن کیا کرتی ہے۔

```js
const { ethers } = await network.create()
```

<span dir="ltr">Hardhat 3</span> میں، ایک سکرپٹ واضح طور پر نیٹ ورک سے کنکشن کھولتی ہے۔ `network.create()` اس نیٹ ورک سے جڑتا ہے جسے آپ سکرپٹ چلاتے وقت `--network` آپشن کے ساتھ منتخب کرتے ہیں، اور `hardhat-ethers` پلگ ان اس کنکشن میں ایک `ethers` آبجیکٹ شامل کرتا ہے۔

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` نیٹ ورک کے لیے کنفیگر کیے گئے اکاؤنٹس واپس کرتا ہے۔ <span dir="ltr">Sepolia</span> پر، یہ وہ اکاؤنٹ ہے جس کی نجی کلید آپ نے `.env` میں رکھی ہے۔ ہم اس کا پتہ کنسٹرکٹر کو پاس کرتے ہیں تاکہ آپ کنٹریکٹ کے مالک بن جائیں۔

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

<span dir="ltr">Ethers.js</span> میں ایک `ContractFactory` ایک تجرید ہے جسے نئے سمارٹ کنٹریکٹس کو تعینات کرنے کے لیے استعمال کیا جاتا ہے، لہذا یہاں `MyNFT` ہمارے <span dir="ltr">NFT</span> کنٹریکٹ کی مثالوں کے لیے ایک فیکٹری ہے۔ `hardhat-ethers` پلگ ان کا استعمال کرتے وقت `ContractFactory` اور `Contract` کی مثالیں پہلے سے طے شدہ طور پر پہلے دستخط کنندہ سے جڑی ہوتی ہیں۔

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

`ContractFactory` پر `deploy()` کو کال کرنے سے تعیناتی شروع ہو جائے گی، اور ایک `Promise` واپس آئے گا جو ایک `Contract` میں حل ہوتا ہے۔ یہ وہ آبجیکٹ ہے جس میں ہمارے سمارٹ کنٹریکٹ کے ہر فنکشن کے لیے ایک طریقہ ہوتا ہے۔ جو دلائل آپ `deploy()` کو پاس کرتے ہیں وہ کنٹریکٹ کے کنسٹرکٹر میں جاتے ہیں، یہاں `initialOwner` کا پتہ۔

`waitForDeployment()` اس وقت تک انتظار کرتا ہے جب تک کہ تعیناتی کی ٹرانزیکشن کسی بلاک میں شامل نہ ہو جائے، اور `getAddress()` نئے کنٹریکٹ کا پتہ واپس کرتا ہے۔ مزید تفصیلات کے لیے [<span dir="ltr">ethers.js</span> کنٹریکٹ کی دستاویزات](https://docs.ethers.org/v6/api/contract/) دیکھیں۔

## مرحلہ 16: اپنا کنٹریکٹ تعینات کریں {#deploy-contract}

ہم بالآخر اپنا سمارٹ کنٹریکٹ تعینات کرنے کے لیے تیار ہیں! اپنی پروجیکٹ ڈائرکٹری کی روٹ پر واپس جائیں، اور کمانڈ لائن میں چلائیں:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

اس کے بعد آپ کو کچھ اس طرح نظر آنا چاہیے:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

اگر ہم [<span dir="ltr">Sepolia Etherscan</span>](https://sepolia.etherscan.io/) پر جائیں اور اپنے کنٹریکٹ کا پتہ تلاش کریں تو ہمیں یہ دیکھنے کے قابل ہونا چاہیے کہ اسے کامیابی کے ساتھ تعینات کر دیا گیا ہے۔ اگر آپ اسے فوری طور پر نہیں دیکھ سکتے ہیں، تو براہ کرم تھوڑی دیر انتظار کریں کیونکہ اس میں کچھ وقت لگ سکتا ہے۔ ٹرانزیکشن کچھ اس طرح نظر آئے گی:

![Etherscan پر اپنی ٹرانزیکشن کا پتہ دیکھیں](./etherscan-sepoila-contract-creation.png)

From کا پتہ آپ کے میٹاماسک اکاؤنٹ کے پتے سے مماثل ہونا چاہیے اور To کے پتے میں "Contract Creation" لکھا ہوگا۔ اگر ہم ٹرانزیکشن پر کلک کرتے ہیں، تو ہم To فیلڈ میں اپنے کنٹریکٹ کا پتہ دیکھیں گے:

![Etherscan پر اپنے کنٹریکٹ کا پتہ دیکھیں](./etherscan-sepolia-tx-details.png)

زبردست! آپ نے ابھی اپنا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ ایتھیریم (آزمائشی نیٹ ورک) چین پر تعینات کیا ہے!

یہ سمجھنے کے لیے کہ اندرونی طور پر کیا ہو رہا ہے، آپ ان درخواستوں کو دیکھ سکتے ہیں جو آپ کی ایپ کو آپ کے [<span dir="ltr">Alchemy</span> ڈیش بورڈ](https://dashboard.alchemy.com/) میں موصول ہوئی ہیں۔

وہاں آپ کو مٹھی بھر جے سن آر پی سی (JSON-RPC) کالز نظر آئیں گی جو <span dir="ltr">Hardhat/Ethers</span> نے ہمارے لیے اندرونی طور پر کی تھیں جب ہم نے `.deploy()` فنکشن کو کال کیا تھا۔ یہاں ذکر کرنے کے لیے دو اہم کالز [<span dir="ltr">eth_sendRawTransaction</span>](/developers/docs/apis/json-rpc/#eth-sendrawtransaction) ہیں، جو دراصل ہمارے سمارٹ کنٹریکٹ کو <span dir="ltr">Sepolia</span> چین پر لکھنے کی درخواست ہے، اور [<span dir="ltr">eth_getTransactionByHash</span>](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) جو ہیش دیے جانے پر ہماری ٹرانزیکشن کے بارے میں معلومات پڑھنے کی درخواست ہے (ٹرانزیکشنز بھیجتے وقت ایک عام نمونہ)۔ ٹرانزیکشنز بھیجنے کے بارے میں مزید جاننے کے لیے، [ٹرانزیکشنز کی دستاویزات](/developers/docs/transactions/) دیکھیں۔

اس ٹیوٹوریل کے حصہ 1 کے لیے بس اتنا ہی۔ [حصہ 2 میں، ہم دراصل ایک <span dir="ltr">NFT</span> ڈھال کر اپنے سمارٹ کنٹریکٹ کے ساتھ تعامل کریں گے](/developers/tutorials/how-to-mint-an-nft/)، اور [حصہ 3 میں ہم آپ کو دکھائیں گے کہ اپنے ایتھیریم والیٹ میں اپنا <span dir="ltr">NFT</span> کیسے دیکھا جائے](/developers/tutorials/how-to-view-nft-in-metamask/)!
