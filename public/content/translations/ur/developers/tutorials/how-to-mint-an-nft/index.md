---
title: "NFT کیسے منٹ کریں (NFT ٹیوٹوریل سیریز کا حصہ 2/3)"
description: "اس ٹیوٹوریل میں بتایا گیا ہے کہ ہمارے اسمارٹ کنٹریکٹ اور Web3 کا استعمال کرتے ہوئے Ethereum بلاک چین پر NFT کیسے منٹ کیا جائے۔"
author: "سومی مدگل"
tags: [ "ERC-721", "alchemy", "solidity", "اسمارٹ معاہدات" ]
skill: beginner
lang: ur-in
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 ملین
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 ملین
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 ملین

ان سبھی نے Alchemy کے طاقتور API کا استعمال کرتے ہوئے اپنے NFTs منٹ کیے۔ اس ٹیوٹوریل میں، ہم آپ کو سکھائیں گے کہ یہی کام \<10 منٹ سے کم میں کیسے کیا جائے۔

”NFT منٹ کرنا“ بلاک چین پر آپ کے ERC-721 ٹوکن کا ایک منفرد انسٹینس شائع کرنے کا عمل ہے۔ [اس NFT ٹیوٹوریل سیریز کے حصہ 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) سے ہمارے اسمارٹ کنٹریکٹ کا استعمال کرتے ہوئے، آئیے اپنی Web3 کی مہارتوں کا مظاہرہ کریں اور ایک NFT منٹ کریں۔ اس ٹیوٹوریل کے آخر میں، آپ اتنے NFTs منٹ کر سکیں گے جتنے آپ کا دل (اور والیٹ) چاہے!

آئیں شروع کرتے ہیں!

## مرحلہ 1: Web3 انسٹال کریں {#install-web3}

اگر آپ نے اپنا NFT اسمارٹ کنٹریکٹ بنانے کے پہلے ٹیوٹوریل پر عمل کیا ہے، تو آپ کو پہلے سے ہی Ethers.js استعمال کرنے کا تجربہ ہے۔ Web3 بھی Ethers کی طرح ہی ہے، کیونکہ یہ ایک لائبریری ہے جو Ethereum بلاک چین کو درخواستیں بھیجنا آسان بنانے کے لیے استعمال ہوتی ہے۔ اس ٹیوٹوریل میں ہم [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) کا استعمال کریں گے، جو ایک بہتر Web3 لائبریری ہے جو خودکار ری ٹرائی اور مضبوط WebSocket سپورٹ پیش کرتی ہے۔

اپنی پروجیکٹ ہوم ڈائریکٹری میں چلائیں:

```
npm install @alch/alchemy-web3
```

## مرحلہ 2: ایک `mint-nft.js` فائل بنائیں {#create-mintnftjs}

اپنی اسکرپٹس ڈائریکٹری کے اندر، ایک `mint-nft.js` فائل بنائیں اور کوڈ کی درج ذیل لائنیں شامل کریں:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## مرحلہ 3: اپنے کنٹریکٹ کا ABI حاصل کریں {#contract-abi}

ہمارا کنٹریکٹ ABI (ایپلی کیشن بائنری انٹرفیس) ہمارے اسمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کا انٹرفیس ہے۔ آپ کنٹریکٹ ABIs کے بارے میں مزید [یہاں](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) جان سکتے ہیں۔ Hardhat ہمارے لیے خود بخود ایک ABI بناتا ہے اور اسے `MyNFT.json` فائل میں محفوظ کرتا ہے۔ اسے استعمال کرنے کے لیے ہمیں اپنی `mint-nft.js` فائل میں کوڈ کی درج ذیل لائنیں شامل کرکے مواد کو پارس کرنا ہوگا۔

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

اگر آپ ABI دیکھنا چاہتے ہیں تو آپ اسے اپنے کنسول پر پرنٹ کر سکتے ہیں:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` چلانے اور اپنے ABI کو کنسول پر پرنٹ ہوتے دیکھنے کے لیے اپنے ٹرمینل پر جائیں اور چلائیں:

```js
node scripts/mint-nft.js
```

## مرحلہ 4: IPFS کا استعمال کرتے ہوئے اپنے NFT کے لیے میٹا ڈیٹا کنفیگر کریں {#config-meta}

اگر آپ کو حصہ 1 میں ہمارے ٹیوٹوریل سے یاد ہو، تو ہمارا `mintNFT` اسمارٹ کنٹریکٹ فنکشن ایک tokenURI پیرامیٹر لیتا ہے جسے NFT کے میٹا ڈیٹا کی وضاحت کرنے والے JSON دستاویز میں حل ہونا چاہیے— جو واقعی NFT کو زندہ کرتا ہے، جس سے اس میں قابلِ ترتیب خصوصیات جیسے نام، تفصیل، تصویر اور دیگر صفات شامل ہو سکتے ہیں۔

> _انٹرپلینیٹری فائل سسٹم (IPFS) تقسیم شدہ فائل سسٹم میں ڈیٹا کو اسٹور اور شیئر کرنے کے لیے ایک غیر مرکزی پروٹوکول اور پیئر ٹو پیئر نیٹ ورک ہے۔_

ہم اپنے NFT اثاثے اور میٹا ڈیٹا کو ذخیرہ کرنے کے لیے Pinata، ایک آسان IPFS API اور ٹول کٹ، کا استعمال کریں گے تاکہ یہ یقینی بنایا جا سکے کہ ہمارا NFT واقعی غیر مرکزی ہے۔ اگر آپ کا Pinata اکاؤنٹ نہیں ہے، تو [یہاں](https://app.pinata.cloud) ایک مفت اکاؤنٹ کے لیے سائن اپ کریں اور اپنی ای میل کی توثیق کرنے کے اقدامات مکمل کریں۔

ایک بار جب آپ اکاؤنٹ بنا لیں:

- ”فائلز“ پیج پر جائیں اور صفحہ کے اوپر بائیں جانب نیلے "اپ لوڈ" بٹن پر کلک کریں۔

- Pinata پر ایک تصویر اپ لوڈ کریں — یہ آپ کے NFT کے لیے تصویری اثاثہ ہوگا۔ آپ اثاثے کو جو چاہیں نام دے سکتے ہیں

- اپ لوڈ کرنے کے بعد، آپ کو "فائلز" پیج پر ٹیبل میں فائل کی معلومات نظر آئیں گی۔ آپ کو ایک CID کالم بھی نظر آئے گا۔ آپ اس کے ساتھ والے کاپی بٹن پر کلک کرکے CID کو کاپی کر سکتے ہیں۔ آپ اپنا اپ لوڈ یہاں دیکھ سکتے ہیں: `https://gateway.pinata.cloud/ipfs/<CID>`۔ مثال کے طور پر، آپ IPFS پر ہمارے ذریعہ استعمال کردہ تصویر کو [یہاں](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) تلاش کر سکتے ہیں۔

زیادہ بصری سیکھنے والوں کے لیے، اوپر دیے گئے اقدامات کا خلاصہ یہاں دیا گیا ہے:

![Pinata پر اپنی تصویر کیسے اپ لوڈ کریں](./instructionsPinata.gif)

اب، ہم Pinata پر ایک اور دستاویز اپ لوڈ کرنا چاہیں گے۔ لیکن ایسا کرنے سے پہلے، ہمیں اسے بنانا ہوگا!

اپنی روٹ ڈائریکٹری میں، `nft-metadata.json` نامی ایک نئی فائل بنائیں اور درج ذیل json کوڈ شامل کریں:

```json
{
  "attributes": [
    {
      "trait_type": "نسل",
      "value": "مالٹیپو"
    },
    {
      "trait_type": "آنکھوں کا رنگ",
      "value": "موکا"
    }
  ],
  "description": "دنیا کا سب سے پیارا اور حساس پپی۔",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "ریمسیز"
}
```

آپ json میں ڈیٹا تبدیل کرنے کے لیے آزاد ہیں۔ آپ صفات کے سیکشن سے ہٹا سکتے ہیں یا اس میں اضافہ کر سکتے ہیں۔ سب سے اہم بات، یقینی بنائیں کہ تصویر کا فیلڈ آپ کی IPFS تصویر کے مقام کی طرف اشارہ کرتا ہے — ورنہ، آپ کے NFT میں ایک (بہت پیارے!) کی تصویر شامل ہوگی کتے کی۔

ایک بار جب آپ JSON فائل کی ترمیم مکمل کر لیں، تو اسے محفوظ کریں اور Pinata پر اپ لوڈ کریں، اسی طرح کے اقدامات پر عمل کرتے ہوئے جو ہم نے تصویر اپ لوڈ کرنے کے لیے کیے تھے۔

![Pinata پر اپنی nft-metadata.json کیسے اپ لوڈ کریں](./uploadPinata.gif)

## مرحلہ 5: اپنے کنٹریکٹ کا ایک انسٹینس بنائیں {#instance-contract}

اب، اپنے کنٹریکٹ کے ساتھ تعامل کرنے کے لیے، ہمیں اپنے کوڈ میں اس کا ایک انسٹینس بنانا ہوگا۔ ایسا کرنے کے لیے ہمیں اپنے کنٹریکٹ ایڈریس کی ضرورت ہوگی جسے ہم ڈیپلائمنٹ یا [Blockscout](https://eth-sepolia.blockscout.com/) سے اس ایڈریس کو تلاش کرکے حاصل کر سکتے ہیں جسے آپ نے کنٹریکٹ ڈیپلائے کرنے کے لیے استعمال کیا تھا۔

![Etherscan پر اپنا کنٹریکٹ ایڈریس دیکھیں](./view-contract-etherscan.png)

مندرجہ بالا مثال میں، ہمارا کنٹریکٹ ایڈریس 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 ہے۔

اگلا ہم ABI اور ایڈریس کا استعمال کرکے اپنا کنٹریکٹ بنانے کے لیے Web3 [کنٹریکٹ میتھڈ](https://docs.web3js.org/api/web3-eth-contract/class/Contract) کا استعمال کریں گے۔ اپنی `mint-nft.js` فائل میں، درج ذیل شامل کریں:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## مرحلہ 6: `.env` فائل کو اپ ڈیٹ کریں {#update-env}

اب، Ethereum چین پر ٹرانزیکشنز بنانے اور بھیجنے کے لیے، ہم اکاؤنٹ نانس حاصل کرنے کے لیے آپ کے عوامی Ethereum اکاؤنٹ ایڈریس کا استعمال کریں گے (نیچے وضاحت کی جائے گی)۔

اپنی پبلک کی کو اپنی `.env` فائل میں شامل کریں — اگر آپ نے ٹیوٹوریل کا حصہ 1 مکمل کر لیا ہے، تو ہماری `.env` فائل اب کچھ اس طرح نظر آنی چاہیے:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## مرحلہ 7: اپنی ٹرانزیکشن بنائیں {#create-txn}

سب سے پہلے، آئیے `mintNFT(tokenData)` نامی ایک فنکشن کی وضاحت کریں اور درج ذیل کام کرکے اپنی ٹرانزیکشن بنائیں:

1. `.env` فائل سے اپنی _PRIVATE_KEY_ اور _PUBLIC_KEY_ حاصل کریں۔

2. اگلا، ہمیں اکاؤنٹ نانس کا پتہ لگانے کی ضرورت ہوگی۔ نانس کی تفصیلات آپ کے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد پر نظر رکھنے کے لیے استعمال ہوتی ہیں — جس کی ہمیں سیکیورٹی مقاصد اور [ری پلے حملوں](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) کو روکنے کے لیے ضرورت ہے۔ اپنے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد حاصل کرنے کے لیے، ہم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) کا استعمال کرتے ہیں۔

3. آخر میں ہم درج ذیل معلومات کے ساتھ اپنی ٹرانزیکشن ترتیب دیں گے:

- `'from': PUBLIC_KEY` — ہماری ٹرانزیکشن کا ماخذ ہمارا پبلک ایڈریس ہے

- `'to': contractAddress` — وہ کنٹریکٹ جس کے ساتھ ہم تعامل کرنا اور ٹرانزیکشن بھیجنا چاہتے ہیں

- `'nonce': nonce` — ہمارے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد کے ساتھ اکاؤنٹ نانس

- `'gas': estimatedGas` — ٹرانزیکشن مکمل کرنے کے لیے درکار تخمینہ شدہ گیس

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — وہ حساب جو ہم اس ٹرانزیکشن میں انجام دینا چاہتے ہیں — جو اس معاملے میں ایک NFT منٹ کرنا ہے

آپ کی `mint-nft.js` فائل اب اس طرح نظر آنی چاہیے:

```js
   require('dotenv').config();
   const API_URL = process.env.API_URL;
   const PUBLIC_KEY = process.env.PUBLIC_KEY;
   const PRIVATE_KEY = process.env.PRIVATE_KEY;

   const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
   const web3 = createAlchemyWeb3(API_URL);

   const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
   const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778";
   const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

   async function mintNFT(tokenURI) {
     const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // تازہ ترین نانس حاصل کریں

   // ٹرانزیکشن
     const tx = {
       'from': PUBLIC_KEY,
       'to': contractAddress,
       'nonce': nonce,
       'gas': 500000,
       'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
     };
   }​
```

## مرحلہ 8: ٹرانزیکشن پر دستخط کریں {#sign-txn}

اب جب کہ ہم نے اپنی ٹرانزیکشن بنا لی ہے، ہمیں اسے بھیجنے کے لیے اس پر دستخط کرنے کی ضرورت ہے۔ یہ وہ جگہ ہے جہاں ہم اپنی پرائیویٹ کی کا استعمال کریں گے۔

`web3.eth.sendSignedTransaction` ہمیں ٹرانزیکشن ہیش دے گا، جسے ہم یہ یقینی بنانے کے لیے استعمال کر سکتے ہیں کہ ہماری ٹرانزیکشن مائن ہو گئی ہے اور نیٹ ورک کے ذریعے ڈراپ نہیں ہوئی ہے۔ آپ دیکھیں گے کہ ٹرانزیکشن پر دستخط کرنے والے سیکشن میں، ہم نے کچھ ایرر چیکنگ شامل کی ہے تاکہ ہمیں معلوم ہو کہ ہماری ٹرانزیکشن کامیابی سے گزر گئی ہے یا نہیں۔

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // تازہ ترین نانس حاصل کریں

  // ٹرانزیکشن
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "آپ کی ٹرانزیکشن کا ہیش ہے: ",
              hash,
              "\nاپنی ٹرانزیکشن کی حیثیت دیکھنے کے لیے Alchemy's Mempool کو چیک کریں!"
            )
          } else {
            console.log(
              "آپ کی ٹرانزیکشن جمع کرتے وقت کچھ غلط ہو گیا:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" وعدہ ناکام رہا:", err)
    })
}
```

## مرحلہ 9: `mintNFT` کو کال کریں اور node `mint-nft.js` چلائیں {#call-mintnft-fn}

کیا آپ کو وہ `metadata.json` یاد ہے جسے آپ نے Pinata پر اپ لوڈ کیا تھا؟ Pinata سے اس کا ہیش کوڈ حاصل کریں اور `mintNFT` فنکشن میں پیرامیٹر کے طور پر درج ذیل کو پاس کریں `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

ہیش کوڈ حاصل کرنے کا طریقہ یہاں ہے:

![Pinata پر اپنے nft میٹا ڈیٹا کا ہیش کوڈ کیسے حاصل کریں](./metadataPinata.gif)_Pinata پر اپنے nft میٹا ڈیٹا کا ہیش کوڈ کیسے حاصل کریں_

> اس بات کو یقینی بنانے کے لیے دو بار چیک کریں کہ آپ نے جو ہیش کوڈ کاپی کیا ہے وہ آپ کی **metadata.json** سے لنک کرتا ہے، اس کے لیے `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` کو ایک الگ ونڈو میں لوڈ کریں۔ صفحہ نیچے دیے گئے اسکرین شاٹ کی طرح نظر آنا چاہیے:

![آپ کے صفحے پر json میٹا ڈیٹا ظاہر ہونا چاہیے](./metadataJSON.png)_آپ کے صفحے پر json میٹا ڈیٹا ظاہر ہونا چاہیے_

مجموعی طور پر، آپ کا کوڈ کچھ اس طرح نظر آنا چاہیے:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const PUBLIC_KEY = process.env.PUBLIC_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") // تازہ ترین نانس حاصل کریں

  // ٹرانزیکشن
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  }

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "آپ کی ٹرانزیکشن کا ہیش ہے: ",
              hash,
              "\nاپنی ٹرانزیکشن کی حیثیت دیکھنے کے لیے Alchemy's Mempool کو چیک کریں!"
            )
          } else {
            console.log(
              "آپ کی ٹرانزیکشن جمع کرتے وقت کچھ غلط ہو گیا:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("وعدہ ناکام رہا:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

اب، اپنا NFT ڈیپلائے کرنے کے لیے `node scripts/mint-nft.js` چلائیں۔ چند سیکنڈ کے بعد، آپ کو اپنے ٹرمینل میں اس طرح کا جواب نظر آنا چاہیے:

    ```
    آپ کی ٹرانزیکشن کا ہیش ہے: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
    
    اپنی ٹرانزیکشن کا اسٹیٹس دیکھنے کے لیے Alchemy کا Mempool چیک کریں!
    ```

اگلا، اپنی ٹرانزیکشن کا اسٹیٹس دیکھنے کے لیے اپنے [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) پر جائیں (چاہے وہ پینڈنگ ہو، مائن ہو گیا ہو، یا نیٹ ورک کے ذریعے ڈراپ ہو گیا ہو)۔ اگر آپ کی ٹرانزیکشن ڈراپ ہو گئی ہے، تو [Blockscout](https://eth-sepolia.blockscout.com/) کو چیک کرنا اور اپنی ٹرانزیکشن ہیش کو تلاش کرنا بھی مددگار ہے۔

![Etherscan پر اپنے NFT ٹرانزیکشن ہیش کو دیکھیں](./view-nft-etherscan.png)_Etherscan پر اپنے NFT ٹرانزیکشن ہیش کو دیکھیں_

اور بس ہو گیا! اب آپ نے Ethereum بلاک چین پر ایک NFT ڈیپلائے اور منٹ کر لیا ہے <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` کا استعمال کرتے ہوئے آپ اتنے NFTs منٹ کر سکتے ہیں جتنے آپ کا دل (اور والیٹ) چاہے! بس یہ یقینی بنائیں کہ آپ NFT کے میٹا ڈیٹا کی وضاحت کرنے والا ایک نیا tokenURI پاس کریں (ورنہ، آپ مختلف IDs کے ساتھ بہت سارے یکساں بنا لیں گے)۔

یقیناً، آپ اپنے NFT کو اپنے والیٹ میں دکھانا چاہیں گے — تو [حصہ 3: اپنے والیٹ میں اپنا NFT کیسے دیکھیں](/developers/tutorials/how-to-view-nft-in-metamask/) ضرور دیکھیں!
