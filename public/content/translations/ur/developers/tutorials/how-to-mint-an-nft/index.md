---
title: "ایک NFT کیسے منٹ کریں (NFT ٹیوٹوریل سیریز کا حصہ 2/3)"
description: "یہ ٹیوٹوریل بتاتا ہے کہ ہمارے سمارٹ کنٹریکٹ اور Web3 کا استعمال کرتے ہوئے ایتھیریم بلاک چین پر NFT کیسے منٹ کیا جائے۔"
author: "سومی مدگل"
tags: ["ERC-721", "Alchemy", "Solidity", "سمارٹ کنٹریکٹس"]
skill: beginner
breadcrumb: "ایک NFT منٹ کریں"
lang: ur
published: 2021-04-22
---

[Beeple](https://www.nytimes.com/2021/03/11/arts/design/nft-auction-christies-beeple.html): $69 ملین
[3LAU](https://www.forbes.com/sites/abrambrown/2021/03/03/3lau-nft-nonfungible-tokens-justin-blau/?sh=5f72ef64643b): $11 ملین
[Grimes](https://www.theguardian.com/music/2021/mar/02/grimes-sells-digital-art-collection-non-fungible-tokens): $6 ملین

ان سب نے Alchemy کی طاقتور API کا استعمال کرتے ہوئے اپنے NFTs منٹ کیے۔ اس ٹیوٹوریل میں، ہم آپ کو سکھائیں گے کہ آپ \<10 منٹ سے بھی کم وقت میں ایسا کیسے کر سکتے ہیں۔

"NFT منٹ کرنا" بلاک چین پر آپ کے ERC-721 ٹوکن کی ایک منفرد مثال شائع کرنے کا عمل ہے۔ [اس NFT ٹیوٹوریل سیریز کے حصہ 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) سے ہمارے سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے، آئیے اپنی Web3 کی مہارتوں کو آزمائیں اور ایک NFT منٹ کریں۔ اس ٹیوٹوریل کے اختتام پر، آپ اتنے NFTs منٹ کر سکیں گے جتنا آپ کا دل (اور والیٹ) چاہے گا!

آئیے شروع کرتے ہیں!

## مرحلہ 1: Web3 انسٹال کریں {#install-web3}

اگر آپ نے اپنا NFT سمارٹ کنٹریکٹ بنانے کے پہلے ٹیوٹوریل کی پیروی کی ہے، تو آپ کو پہلے ہی Ethers.js استعمال کرنے کا تجربہ ہے۔ Web3 بھی Ethers کی طرح ہے، کیونکہ یہ ایک لائبریری ہے جو [Ethereum](/) بلاک چین پر درخواستیں بھیجنے کو آسان بنانے کے لیے استعمال ہوتی ہے۔ اس ٹیوٹوریل میں ہم [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) استعمال کریں گے، جو کہ ایک بہتر Web3 لائبریری ہے اور خودکار ری ٹرائی (automatic retries) اور مضبوط WebSocket سپورٹ فراہم کرتی ہے۔

اپنے پروجیکٹ کی ہوم ڈائرکٹری میں رن کریں:

```
npm install @alch/alchemy-web3
```

## مرحلہ 2: ایک `mint-nft.js` فائل بنائیں {#create-mintnftjs}

اپنی scripts ڈائرکٹری کے اندر، ایک `mint-nft.js` فائل بنائیں اور کوڈ کی درج ذیل لائنیں شامل کریں:

```js
require("dotenv").config()
const API_URL = process.env.API_URL
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
```

## مرحلہ 3: اپنے کنٹریکٹ کا ABI حاصل کریں {#contract-abi}

ہمارے کنٹریکٹ کا ABI (ایپلیکیشن بائنری انٹرفیس) ہمارے سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کا انٹرفیس ہے۔ آپ کنٹریکٹ ABIs کے بارے میں مزید [یہاں](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is) جان سکتے ہیں۔ Hardhat خود بخود ہمارے لیے ایک ABI تیار کرتا ہے اور اسے `MyNFT.json` فائل میں محفوظ کرتا ہے۔ اسے استعمال کرنے کے لیے ہمیں اپنی `mint-nft.js` فائل میں کوڈ کی درج ذیل لائنیں شامل کر کے اس کے مواد کو پارس (parse) کرنا ہوگا:

```js
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
```

اگر آپ ABI دیکھنا چاہتے ہیں تو آپ اسے اپنے کنسول پر پرنٹ کر سکتے ہیں:

```js
console.log(JSON.stringify(contract.abi))
```

`mint-nft.js` کو چلانے اور اپنے ABI کو کنسول پر پرنٹ ہوتا دیکھنے کے لیے اپنے ٹرمینل پر جائیں اور رن کریں:

```js
node scripts/mint-nft.js
```

## مرحلہ 4: IPFS کا استعمال کرتے ہوئے اپنے NFT کے لیے میٹا ڈیٹا کنفیگر کریں {#config-meta}

اگر آپ کو حصہ 1 میں ہمارے ٹیوٹوریل سے یاد ہو، تو ہمارا `mintNFT` سمارٹ کنٹریکٹ فنکشن ایک tokenURI پیرامیٹر لیتا ہے جسے ایک JSON دستاویز پر ریزولو (resolve) ہونا چاہیے جو NFT کے میٹا ڈیٹا کو بیان کرتا ہے— جو دراصل NFT کو زندہ کرتا ہے، اور اسے قابل ترتیب خصوصیات، جیسے کہ نام، تفصیل، تصویر، اور دیگر اوصاف رکھنے کی اجازت دیتا ہے۔

> _انٹرپلینیٹری فائل سسٹم (IPFS) ایک ڈسٹری بیوٹڈ فائل سسٹم میں ڈیٹا کو ذخیرہ کرنے اور شیئر کرنے کے لیے ایک ڈی سینٹرلائزڈ پروٹوکول اور پیئر ٹو پیئر نیٹ ورک ہے۔_

ہم اپنے NFT اثاثے اور میٹا ڈیٹا کو ذخیرہ کرنے کے لیے Pinata کا استعمال کریں گے، جو کہ ایک آسان IPFS API اور ٹول کٹ ہے، تاکہ یہ یقینی بنایا جا سکے کہ ہمارا NFT واقعی ڈی سینٹرلائزڈ ہے۔ اگر آپ کے پاس Pinata اکاؤنٹ نہیں ہے، تو [یہاں](https://app.pinata.cloud) مفت اکاؤنٹ کے لیے سائن اپ کریں اور اپنا ای میل تصدیق کرنے کے مراحل مکمل کریں۔

ایک بار جب آپ اکاؤنٹ بنا لیں:

- "Files" صفحہ پر جائیں اور صفحے کے اوپری بائیں جانب نیلے رنگ کے "Upload" بٹن پر کلک کریں۔

- Pinata پر ایک تصویر اپ لوڈ کریں — یہ آپ کے NFT کے لیے تصویری اثاثہ ہوگا۔ آپ اثاثے کا جو چاہیں نام رکھ سکتے ہیں۔

- اپ لوڈ کرنے کے بعد، آپ کو "Files" صفحہ پر موجود ٹیبل میں فائل کی معلومات نظر آئیں گی۔ آپ کو ایک CID کالم بھی نظر آئے گا۔ آپ اس کے آگے موجود کاپی بٹن پر کلک کر کے CID کاپی کر سکتے ہیں۔ آپ اپنی اپ لوڈ کو یہاں دیکھ سکتے ہیں: `https://gateway.pinata.cloud/ipfs/<CID>`۔ مثال کے طور پر، آپ وہ تصویر جو ہم نے IPFS پر استعمال کی ہے [یہاں](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) تلاش کر سکتے ہیں۔

بصری طور پر سیکھنے والوں کے لیے، مندرجہ بالا مراحل کا خلاصہ یہاں دیا گیا ہے:

![Pinata پر اپنی تصویر کیسے اپ لوڈ کریں](./instructionsPinata.gif)

اب، ہم Pinata پر ایک اور دستاویز اپ لوڈ کرنا چاہیں گے۔ لیکن ایسا کرنے سے پہلے، ہمیں اسے بنانا ہوگا!

اپنی روٹ ڈائرکٹری میں، `nft-metadata.json` کے نام سے ایک نئی فائل بنائیں اور درج ذیل json کوڈ شامل کریں:

```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "Maltipoo"
    },
    {
      "trait_type": "Eye color",
      "value": "Mocha"
    }
  ],
  "description": "The world's most adorable and sensitive pup.",
  "image": "ipfs://QmWmvTJmJU3pozR9ZHFmQC2DNDwi2XJtf3QGyYiiagFSWb",
  "name": "Ramses"
}
```

json میں ڈیٹا کو تبدیل کرنے میں ہچکچاہٹ محسوس نہ کریں۔ آپ attributes سیکشن میں اضافہ کر سکتے ہیں یا اسے ہٹا سکتے ہیں۔ سب سے اہم بات، اس بات کو یقینی بنائیں کہ image فیلڈ آپ کی IPFS تصویر کے مقام کی طرف اشارہ کرتی ہے — بصورت دیگر، آپ کے NFT میں ایک (بہت پیارے!) کتے کی تصویر شامل ہوگی۔

ایک بار جب آپ JSON فائل میں ترمیم کر لیں، تو اسے محفوظ کریں اور تصویر اپ لوڈ کرنے کے لیے ہم نے جو مراحل اختیار کیے تھے انہی پر عمل کرتے ہوئے اسے Pinata پر اپ لوڈ کریں۔

![اپنا nft-metadata.json Pinata پر کیسے اپ لوڈ کریں](./uploadPinata.gif)

## مرحلہ 5: اپنے کنٹریکٹ کی ایک مثال (instance) بنائیں {#instance-contract}

اب، اپنے کنٹریکٹ کے ساتھ تعامل کرنے کے لیے، ہمیں اپنے کوڈ میں اس کی ایک مثال (instance) بنانے کی ضرورت ہے۔ ایسا کرنے کے لیے ہمیں اپنے کنٹریکٹ کے ایڈریس کی ضرورت ہوگی جو ہم ڈیپلائمنٹ سے یا [Blockscout](https://eth-sepolia.blockscout.com/) سے وہ ایڈریس تلاش کر کے حاصل کر سکتے ہیں جو آپ نے کنٹریکٹ کو ڈیپلائے کرنے کے لیے استعمال کیا تھا۔

![Etherscan پر اپنے کنٹریکٹ کا ایڈریس دیکھیں](./view-contract-etherscan.png)

مندرجہ بالا مثال میں، ہمارے کنٹریکٹ کا ایڈریس 0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778 ہے۔

اس کے بعد ہم ABI اور ایڈریس کا استعمال کرتے ہوئے اپنا کنٹریکٹ بنانے کے لیے Web3 [contract method](https://docs.web3js.org/api/web3-eth-contract/class/Contract) کا استعمال کریں گے۔ اپنی `mint-nft.js` فائل میں، درج ذیل شامل کریں:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
```

## مرحلہ 6: `.env` فائل کو اپ ڈیٹ کریں {#update-env}

اب، ایتھیریم چین پر ٹرانزیکشنز بنانے اور بھیجنے کے لیے، ہم اکاؤنٹ کا نانس (nonce) حاصل کرنے کے لیے آپ کا پبلک ایتھیریم اکاؤنٹ ایڈریس استعمال کریں گے (نیچے وضاحت کی جائے گی)۔

اپنی پبلک کی (public key) کو اپنی `.env` فائل میں شامل کریں — اگر آپ نے ٹیوٹوریل کا حصہ 1 مکمل کر لیا ہے، تو ہماری `.env` فائل اب کچھ اس طرح دکھنی چاہیے:

```js
API_URL = "https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

## مرحلہ 7: اپنی ٹرانزیکشن بنائیں {#create-txn}

سب سے پہلے، آئیے `mintNFT(tokenData)` کے نام سے ایک فنکشن کی وضاحت کریں اور درج ذیل کام کر کے اپنی ٹرانزیکشن بنائیں:

1. `.env` فائل سے اپنی _PRIVATE_KEY_ اور _PUBLIC_KEY_ حاصل کریں۔

1. اس کے بعد، ہمیں اکاؤنٹ کا نانس (nonce) معلوم کرنے کی ضرورت ہوگی۔ نانس کی تفصیل آپ کے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد کا ٹریک رکھنے کے لیے استعمال ہوتی ہے — جس کی ہمیں سیکیورٹی کے مقاصد اور [ری پلے حملوں (replay attacks)](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce) کو روکنے کے لیے ضرورت ہوتی ہے۔ آپ کے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد حاصل کرنے کے لیے، ہم [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount) استعمال کرتے ہیں۔

1. آخر میں ہم درج ذیل معلومات کے ساتھ اپنی ٹرانزیکشن سیٹ اپ کریں گے:

- `'from': PUBLIC_KEY` — ہماری ٹرانزیکشن کا آغاز ہمارا پبلک ایڈریس ہے

- `'to': contractAddress` — وہ کنٹریکٹ جس کے ساتھ ہم تعامل کرنا اور ٹرانزیکشن بھیجنا چاہتے ہیں

- `'nonce': nonce` — ہمارے ایڈریس سے بھیجی گئی ٹرانزیکشنز کی تعداد کے ساتھ اکاؤنٹ کا نانس

- `'gas': estimatedGas` — ٹرانزیکشن مکمل کرنے کے لیے درکار تخمینی گیس

- `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — وہ کمپیوٹیشن جو ہم اس ٹرانزیکشن میں انجام دینا چاہتے ہیں — جو اس صورت میں ایک NFT منٹ کرنا ہے

آپ کی `mint-nft.js` فائل اب اس طرح دکھنی چاہیے:

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

اب جب کہ ہم نے اپنی ٹرانزیکشن بنا لی ہے، ہمیں اسے بھیجنے کے لیے اس پر دستخط کرنے کی ضرورت ہے۔ یہاں ہم اپنی پرائیویٹ کی (private key) استعمال کریں گے۔

`web3.eth.sendSignedTransaction` ہمیں ٹرانزیکشن ہیش دے گا، جسے ہم یہ یقینی بنانے کے لیے استعمال کر سکتے ہیں کہ ہماری ٹرانزیکشن مائن ہو گئی تھی اور نیٹ ورک کی طرف سے ڈراپ نہیں ہوئی تھی۔ آپ دیکھیں گے کہ ٹرانزیکشن پر دستخط کرنے والے سیکشن میں، ہم نے کچھ ایرر چیکنگ شامل کی ہے تاکہ ہمیں معلوم ہو سکے کہ آیا ہماری ٹرانزیکشن کامیابی سے مکمل ہو گئی ہے۔

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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log(" Promise failed:", err)
    })
}
```

## مرحلہ 9: `mintNFT` کو کال کریں اور node `mint-nft.js` رن کریں {#call-mintnft-fn}

کیا آپ کو وہ `metadata.json` یاد ہے جو آپ نے Pinata پر اپ لوڈ کیا تھا؟ Pinata سے اس کا ہیش کوڈ حاصل کریں اور درج ذیل کو `mintNFT` فنکشن میں پیرامیٹر کے طور پر پاس کریں `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`

ہیش کوڈ حاصل کرنے کا طریقہ یہاں ہے:

![Pinata پر اپنے nft میٹا ڈیٹا کا ہیش کوڈ کیسے حاصل کریں](./metadataPinata.gif)_Pinata پر اپنے nft میٹا ڈیٹا کا ہیش کوڈ کیسے حاصل کریں_

> ایک الگ ونڈو میں `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` لوڈ کر کے دوبارہ چیک کریں کہ آپ نے جو ہیش کوڈ کاپی کیا ہے وہ آپ کے **metadata.json** سے لنک کرتا ہے۔ صفحہ نیچے دیے گئے اسکرین شاٹ جیسا دکھنا چاہیے:

![آپ کے صفحے پر json میٹا ڈیٹا ظاہر ہونا چاہیے](./metadataJSON.png)_آپ کے صفحے پر json میٹا ڈیٹا ظاہر ہونا چاہیے_

مجموعی طور پر، آپ کا کوڈ کچھ اس طرح دکھنا چاہیے:

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
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            )
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            )
          }
        }
      )
    })
    .catch((err) => {
      console.log("Promise failed:", err)
    })
}

mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

اب، اپنا NFT ڈیپلائے کرنے کے لیے `node scripts/mint-nft.js` رن کریں۔ چند سیکنڈ کے بعد، آپ کو اپنے ٹرمینل میں اس طرح کا رسپانس نظر آنا چاہیے:

    The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8

    Check Alchemy's Mempool to view the status of your transaction!

اس کے بعد، اپنی ٹرانزیکشن کا اسٹیٹس دیکھنے کے لیے اپنے [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) پر جائیں (چاہے یہ زیر التوا ہو، مائن ہو گئی ہو، یا نیٹ ورک کی طرف سے ڈراپ ہو گئی ہو)۔ اگر آپ کی ٹرانزیکشن ڈراپ ہو گئی ہے، تو [Blockscout](https://eth-sepolia.blockscout.com/) چیک کرنا اور اپنے ٹرانزیکشن ہیش کو تلاش کرنا بھی مددگار ثابت ہوتا ہے۔

![Etherscan پر اپنا NFT ٹرانزیکشن ہیش دیکھیں](./view-nft-etherscan.png)_Etherscan پر اپنا NFT ٹرانزیکشن ہیش دیکھیں_

اور بس! اب آپ نے ایتھیریم بلاک چین پر ایک NFT ڈیپلائے اور منٹ کر لیا ہے <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` کا استعمال کرتے ہوئے آپ اتنے NFTs منٹ کر سکتے ہیں جتنا آپ کا دل (اور والیٹ) چاہے! بس اس بات کو یقینی بنائیں کہ NFT کے میٹا ڈیٹا کو بیان کرنے والا ایک نیا tokenURI پاس کریں (بصورت دیگر، آپ صرف مختلف IDs کے ساتھ ایک جیسے بہت سے NFTs بنا لیں گے)۔

غالباً، آپ اپنے والیٹ میں اپنا NFT دکھانا چاہیں گے — لہذا [حصہ 3: اپنے والیٹ میں اپنا NFT کیسے دیکھیں](/developers/tutorials/how-to-view-nft-in-metamask/) کو ضرور چیک کریں!