---
title: "ایک ⁦NFT⁩ کیسے ڈھالیں (⁦NFT⁩ ٹیوٹوریل سیریز کا حصہ ⁦2/3⁩)"
description: "یہ ٹیوٹوریل بیان کرتا ہے کہ ہمارے سمارٹ کنٹریکٹ، ⁦Hardhat⁩ اور ⁦ethers.js⁩ کا استعمال کرتے ہوئے ایتھیریم بلاک چین پر ⁦NFT⁩ کیسے ڈھالیں۔"
author: "سومی مدگل"
tags: ["ERC-721", "Alchemy", "Solidity", "سمارٹ کنٹریکٹس"]
skill: beginner
breadcrumb: "ایک ⁦NFT⁩ ڈھالیں"
lang: ur
published: 2021-04-22
---

"ایک غیر متبادل ٹوکن (NFT) کی ڈھلائی" بلاک چین پر آپ کے <span dir="ltr">ERC-721</span> ٹوکن کی ایک منفرد مثال شائع کرنے کا عمل ہے۔ [اس <span dir="ltr">NFT</span> ٹیوٹوریل سیریز کے حصہ 1](/developers/tutorials/how-to-write-and-deploy-an-nft/) سے ہمارے سمارٹ کنٹریکٹ کا استعمال کرتے ہوئے، آئیے اپنی <span dir="ltr">Web3</span> کی مہارتوں کو آزمائیں اور ایک <span dir="ltr">NFT</span> ڈھالیں۔ اس ٹیوٹوریل کے اختتام پر، آپ اتنے <span dir="ltr">NFTs</span> ڈھالنے کے قابل ہو جائیں گے جتنا آپ کا دل (اور والیٹ) چاہے گا!

آئیے شروع کریں!

## مرحلہ 1: اپنا سیٹ اپ چیک کریں {#install-web3}

اگر آپ نے اپنا <span dir="ltr">NFT</span> سمارٹ کنٹریکٹ بنانے کے پہلے ٹیوٹوریل کی پیروی کی ہے، تو آپ کے پاس پہلے سے ہی وہ سب کچھ موجود ہے جس کی آپ کو ضرورت ہے: [<span dir="ltr">Ethers</span> پلگ ان](https://hardhat.org/docs/plugins/hardhat-ethers) اور [<span dir="ltr">ethers.js</span>](https://docs.ethers.org/v6/) کے ساتھ ایک <span dir="ltr">Hardhat 3</span> پروجیکٹ، جو ایک لائبریری ہے جسے [ایتھیریم](/) بلاک چین پر درخواستیں بنانے کو آسان بنانے کے لیے استعمال کیا جاتا ہے۔ ہم اپنا ڈھلائی کا کوڈ ایک <span dir="ltr">Hardhat</span> سکرپٹ کے طور پر لکھیں گے، تاکہ یہ <span dir="ltr">Sepolia</span> نیٹ ورک کی ترتیبات اور حصہ 1 سے `API_URL` اور `PRIVATE_KEY` کی اقدار کو دوبارہ استعمال کر سکے — انسٹال کرنے کے لیے کچھ نیا نہیں ہے۔

## مرحلہ 2: ایک `mint-nft.js` فائل بنائیں {#create-mintnftjs}

اپنی سکرپٹس ڈائرکٹری کے اندر، ایک `mint-nft.js` فائل بنائیں اور کوڈ کی درج ذیل لائنیں شامل کریں:

```js
import { network } from "hardhat"

const { ethers } = await network.create()
```

جیسا کہ ہمارے تعینات کرنے کے سکرپٹ میں، جب آپ سکرپٹ چلاتے ہیں تو `network.create()` اس نیٹ ورک سے جڑ جاتا ہے جسے آپ `--network` کے ساتھ منتخب کرتے ہیں، اور ہمیں اس کے لیے ایک `ethers` آبجیکٹ دیتا ہے۔

## مرحلہ 3: اپنے کنٹریکٹ کی اے بی آئی حاصل کریں {#contract-abi}

ہمارے کنٹریکٹ کی ایپلیکیشن بائنری انٹرفیس (اے بی آئی) ہمارے سمارٹ کنٹریکٹ کے ساتھ تعامل کرنے کا انٹرفیس ہے۔ آپ [کنٹریکٹ کی اے بی آئیز](/glossary/#abi) کے بارے میں مزید جان سکتے ہیں۔ جب <span dir="ltr">Hardhat</span> کنٹریکٹ کو مرتب کرتا ہے تو یہ خود بخود ہمارے لیے ایک اے بی آئی تیار کرتا ہے اور اسے `artifacts/contracts/MyNFT.sol/MyNFT.json` فائل میں محفوظ کرتا ہے۔ جب ہم مرحلہ 5 میں اپنے کنٹریکٹ کی مثال بناتے ہیں تو <span dir="ltr">Hardhat Ethers</span> پلگ ان اسے ہمارے لیے وہاں سے پڑھتا ہے، اس لیے ہمیں اسے خود لوڈ کرنے کی ضرورت نہیں ہے۔

اگر آپ اے بی آئی دیکھنا چاہتے ہیں تو آپ اسے اپنے کنسول پر پرنٹ کر سکتے ہیں۔ اپنے پروجیکٹ کی روٹ ڈائرکٹری سے، چلائیں:

```sh
node -p "JSON.stringify(require('./artifacts/contracts/MyNFT.sol/MyNFT.json').abi)"
```

## مرحلہ 4: <span dir="ltr">IPFS</span> کا استعمال کرتے ہوئے اپنے <span dir="ltr">NFT</span> کے لیے میٹا ڈیٹا کنفیگر کریں {#config-meta}

اگر آپ کو حصہ 1 میں ہمارے ٹیوٹوریل سے یاد ہے، تو ہمارا `mintNFT` سمارٹ کنٹریکٹ فنکشن ایک <span dir="ltr">tokenURI</span> پیرامیٹر لیتا ہے جسے ایک <span dir="ltr">JSON</span> دستاویز میں حل ہونا چاہیے جو <span dir="ltr">NFT</span> کے میٹا ڈیٹا کو بیان کرتا ہے— جو واقعی <span dir="ltr">NFT</span> کو زندہ کرتا ہے، جس سے اس میں قابل ترتیب خصوصیات، جیسے کہ نام، تفصیل، تصویر، اور دیگر اوصاف شامل ہو سکتے ہیں۔

> _انٹرپلینیٹری فائل سسٹم (<span dir="ltr">IPFS</span>) ایک تقسیم شدہ فائل سسٹم میں ڈیٹا کو ذخیرہ کرنے اور شیئر کرنے کے لیے ایک لامركزی پروٹوکول اور پیئر ٹو پیئر نیٹ ورک ہے۔_

ہم اپنے <span dir="ltr">NFT</span> اثاثے اور میٹا ڈیٹا کو ذخیرہ کرنے کے لیے <span dir="ltr">Pinata</span> کا استعمال کریں گے، جو ایک آسان <span dir="ltr">IPFS</span> ایپلیکیشن پروگرامنگ انٹرفیس (API) اور ٹول کٹ ہے، تاکہ یہ یقینی بنایا جا سکے کہ ہمارا <span dir="ltr">NFT</span> واقعی لامركزی ہے۔ اگر آپ کے پاس <span dir="ltr">Pinata</span> اکاؤنٹ نہیں ہے، تو [یہاں](https://app.pinata.cloud) مفت اکاؤنٹ کے لیے سائن اپ کریں اور اپنا ای میل تصدیق کرنے کے مراحل مکمل کریں۔

ایک بار جب آپ اکاؤنٹ بنا لیں:

- [فائلز کے صفحے](https://app.pinata.cloud/ipfs/files) پر جائیں اور صفحے کے اوپری دائیں کونے میں "Add" بٹن پر کلک کریں۔

- <span dir="ltr">Pinata</span> پر ایک تصویر اپ لوڈ کریں — یہ آپ کے <span dir="ltr">NFT</span> کے لیے تصویری اثاثہ ہوگا۔ آپ اثاثے کا جو بھی نام رکھنا چاہیں رکھ سکتے ہیں۔ یقینی بنائیں کہ آپ اسے عوامی <span dir="ltr">IPFS</span> پر اپ لوڈ کرتے ہیں: [نجی <span dir="ltr">IPFS</span>](https://docs.pinata.cloud/files/private-ipfs) پر موجود فائلیں ان والیٹس اور مارکیٹ پلیسز کے ذریعے حاصل نہیں کی جا سکتیں جو آپ کا <span dir="ltr">NFT</span> دکھاتے ہیں۔

- اپ لوڈ کرنے کے بعد، آپ کو فائلز کے صفحے پر اس کے <span dir="ltr">CID</span> (مواد کا شناخت کنندہ) کے ساتھ فائل درج نظر آئے گی۔ <span dir="ltr">CID</span> کاپی کریں۔ آپ اپنا اپ لوڈ یہاں دیکھ سکتے ہیں: `https://gateway.pinata.cloud/ipfs/<CID>`، یا <span dir="ltr">Pinata</span> سائیڈ بار میں "Gateways" کے تحت درج مخصوص گیٹ وے کے ذریعے۔ مثال کے طور پر، آپ وہ تصویر تلاش کر سکتے ہیں جو ہم نے <span dir="ltr">IPFS</span> پر [یہاں](https://gateway.pinata.cloud/ipfs/QmZdd5KYdCFApWn7eTZJ1qgJu18urJrP9Yh1TZcZrZxxB5) استعمال کی تھی۔

اب، ہم <span dir="ltr">Pinata</span> پر ایک اور دستاویز اپ لوڈ کرنا چاہیں گے۔ لیکن ایسا کرنے سے پہلے، ہمیں اسے بنانا ہوگا!

اپنی روٹ ڈائرکٹری میں، `nft-metadata.json` نامی ایک نئی فائل بنائیں اور درج ذیل <span dir="ltr">json</span> کوڈ شامل کریں:

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

<span dir="ltr">json</span> میں ڈیٹا کو تبدیل کرنے میں ہچکچاہٹ محسوس نہ کریں۔ آپ اوصاف (attributes) کے حصے کو ہٹا یا اس میں اضافہ کر سکتے ہیں۔ سب سے اہم بات، یقینی بنائیں کہ تصویر کا فیلڈ آپ کی <span dir="ltr">IPFS</span> تصویر کے مقام کی طرف اشارہ کرتا ہے، `ipfs://<image-CID>` کی شکل میں — بصورت دیگر، آپ کے <span dir="ltr">NFT</span> میں ایک (بہت پیارے!) کتے کی تصویر شامل ہوگی۔

ایک بار جب آپ <span dir="ltr">JSON</span> فائل میں ترمیم کر لیں، تو اسے محفوظ کریں اور تصویر اپ لوڈ کرنے کے لیے ہم نے جو اقدامات کیے تھے انہی پر عمل کرتے ہوئے اسے <span dir="ltr">Pinata</span> پر اپ لوڈ کریں۔ `nft-metadata.json` کا <span dir="ltr">CID</span> بھی کاپی کریں؛ ہمیں مرحلہ 9 میں اس کی ضرورت ہوگی۔

## مرحلہ 5: اپنے کنٹریکٹ کی ایک مثال بنائیں {#instance-contract}

اب، اپنے کنٹریکٹ کے ساتھ تعامل کرنے کے لیے، ہمیں اپنے کوڈ میں اس کی ایک مثال بنانے کی ضرورت ہے۔ ایسا کرنے کے لیے ہمیں اپنے کنٹریکٹ کے پتہ کی ضرورت ہوگی، جسے ہمارے تعینات کرنے کے سکرپٹ نے حصہ 1 میں پرنٹ کیا تھا۔ آپ اسے [<span dir="ltr">Etherscan</span>](https://sepolia.etherscan.io/) یا [<span dir="ltr">Blockscout</span>](https://eth-sepolia.blockscout.com/) پر بھی اس پتہ کو تلاش کر کے پا سکتے ہیں جسے آپ نے کنٹریکٹ تعینات کرنے کے لیے استعمال کیا تھا۔

![View your contract address on Etherscan](./view-contract-etherscan.png)

مندرجہ بالا مثال میں، ہمارے کنٹریکٹ کا پتہ <span dir="ltr">0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778</span> ہے۔

اس کے بعد ہم <span dir="ltr">Hardhat Ethers</span> پلگ ان کا `getContractAt` طریقہ استعمال کریں گے تاکہ اس کے نام (جو اسے بتاتا ہے کہ کون سی اے بی آئی استعمال کرنی ہے) اور اس کے پتہ کا استعمال کرتے ہوئے اپنا کنٹریکٹ بنائیں۔ اپنی `mint-nft.js` فائل میں، پتہ کو اپنے پتہ سے تبدیل کرتے ہوئے درج ذیل شامل کریں:

```js
const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)
```

## مرحلہ 6: `.env` فائل چیک کریں {#update-env}

ہمارے بھیجے گئے ہر ٹرانزیکشن پر آپ کے اکاؤنٹ کی نجی کلید سے دستخط ہونا ضروری ہے۔ اگر آپ نے ٹیوٹوریل کا حصہ 1 مکمل کر لیا ہے، تو ہماری `.env` فائل پہلے ہی اس طرح نظر آنی چاہیے:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

اپنا عوامی پتہ شامل کرنے کی کوئی ضرورت نہیں ہے: <span dir="ltr">ethers</span> اسے نجی کلید سے خود نکال لیتا ہے۔

## مرحلہ 7: اپنا ٹرانزیکشن بنائیں {#create-txn}

سب سے پہلے، آئیے `mintNFT(tokenURI)` نامی ایک فنکشن کی وضاحت کریں اور درج ذیل کام کر کے اپنا ٹرانزیکشن بنائیں:

1. وہ اکاؤنٹ حاصل کریں جس سے ہم ٹرانزیکشن بھیجتے ہیں۔ `ethers.getSigners()` نیٹ ورک کے لیے کنفیگر کیے گئے اکاؤنٹس واپس کرتا ہے، جو <span dir="ltr">Sepolia</span> پر وہ اکاؤنٹ ہے جس کی نجی کلید `.env` میں ہے۔ چونکہ `mintNFT` `onlyOwner` ہے، اس لیے یہ وہی اکاؤنٹ ہونا چاہیے جس نے کنٹریکٹ تعینات کیا تھا۔

1. وصول کنندہ کے طور پر اپنے پتہ اور میٹا ڈیٹا <span dir="ltr">URI</span> کے ساتھ، ہمارے کنٹریکٹ کی مثال پر `mintNFT` فنکشن کو کال کریں۔ یہ وہ کمپیوٹیشن ہے جو ہم اس ٹرانزیکشن میں انجام دینا چاہتے ہیں — جو اس معاملے میں ایک <span dir="ltr">NFT</span> کی ڈھلائی ہے۔

آپ کو خود نانس (آپ کے پتہ سے بھیجے گئے ٹرانزیکشنز کی تعداد، جو ری پلے حملوں کو روکتی ہے)، گیس کی حد، یا فیس کا حساب لگانے کی ضرورت نہیں ہے: <span dir="ltr">ethers</span> ٹرانزیکشن بھیجنے سے پہلے انہیں حاصل کرتا ہے یا ان کا تخمینہ لگاتا ہے۔

آپ کی `mint-nft.js` فائل اب اس طرح نظر آنی چاہیے:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  // ٹرانزیکشن بھیجیں۔ ethers ہمارے لیے نانس، گیس کی حد اور فیس بھر دیتا ہے۔
  const tx = await nftContract.mintNFT(signer.address, tokenURI)
}
```

## مرحلہ 8: ٹرانزیکشن پر دستخط کریں {#sign-txn}

چونکہ نیٹ ورک ہماری نجی کلید کے ساتھ کنفیگر کیا گیا ہے، اس لیے <span dir="ltr">ethers</span> اسے بھیجنے سے پہلے خود بخود اس کے ساتھ ٹرانزیکشن پر دستخط کر دیتا ہے۔

ٹرانزیکشن بھیجے جانے کے بعد `mintNFT` کو کال کرنا واپس آ جاتا ہے، اور ہمیں ٹرانزیکشن ہیش دیتا ہے، جسے ہم یہ یقینی بنانے کے لیے استعمال کر سکتے ہیں کہ ہمارا ٹرانزیکشن مائن ہو گیا تھا اور نیٹ ورک کے ذریعے ڈراپ نہیں ہوا تھا۔ `tx.wait()` پھر اس وقت تک انتظار کرتا ہے جب تک کہ ٹرانزیکشن ایک بلاک میں شامل نہ ہو جائے۔ ہم نے کچھ ایرر چیکنگ بھی شامل کی ہے تاکہ ہمیں معلوم ہو سکے کہ آیا ہمارا ٹرانزیکشن کامیابی سے مکمل ہوا ہے۔

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // ٹرانزیکشن بھیجیں۔ ethers ہمارے لیے نانس، گیس کی حد اور فیس بھر دیتا ہے۔
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // ٹرانزیکشن کے ایک بلاک میں شامل ہونے کا انتظار کریں۔
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}
```

## مرحلہ 9: `mintNFT` کو کال کریں اور `mint-nft.js` چلائیں {#call-mintnft-fn}

کیا آپ کو وہ `nft-metadata.json` یاد ہے جو آپ نے <span dir="ltr">Pinata</span> پر اپ لوڈ کیا تھا؟ <span dir="ltr">Pinata</span> سے اس کا <span dir="ltr">CID</span> حاصل کریں اور `ipfs://<metadata-CID>` کو `mintNFT` فنکشن کے پیرامیٹر کے طور پر پاس کریں۔ والیٹس اور مارکیٹ پلیسز اپنی پسند کے <span dir="ltr">IPFS</span> گیٹ وے کے ذریعے `ipfs://` <span dir="ltr">URIs</span> کو حل کرتے ہیں، اس لیے آپ کا <span dir="ltr">NFT</span> کسی ایک گیٹ وے پر منحصر نہیں ہے۔

> ایک الگ ونڈو میں `https://gateway.pinata.cloud/ipfs/<metadata-CID>` لوڈ کر کے دو بار چیک کریں کہ آپ نے جو <span dir="ltr">CID</span> کاپی کیا ہے وہ آپ کے **nft-metadata.json** سے لنک کرتا ہے۔ صفحہ نیچے دیے گئے سکرین شاٹ جیسا نظر آنا چاہیے:

![Your page should display the json metadata](./metadataJSON.png)_آپ کے صفحے کو <span dir="ltr">json</span> میٹا ڈیٹا دکھانا چاہیے_

مجموعی طور پر، آپ کا کوڈ کچھ اس طرح نظر آنا چاہیے:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const contractAddress = "0x5a738a5c5fe46a1fd5ee7dd7e38f722e2aef7778"
const nftContract = await ethers.getContractAt("MyNFT", contractAddress)

async function mintNFT(tokenURI) {
  const [signer] = await ethers.getSigners()

  try {
    // ٹرانزیکشن بھیجیں۔ ethers ہمارے لیے نانس، گیس کی حد اور فیس بھر دیتا ہے۔
    const tx = await nftContract.mintNFT(signer.address, tokenURI)
    console.log("The hash of your transaction is:", tx.hash)

    // ٹرانزیکشن کے ایک بلاک میں شامل ہونے کا انتظار کریں۔
    const receipt = await tx.wait()
    console.log("Your NFT was minted in block", receipt.blockNumber)
  } catch (err) {
    console.log("Something went wrong when submitting your transaction:", err)
  }
}

await mintNFT("ipfs://QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP")
```

اب، اپنا <span dir="ltr">NFT</span> ڈھالنے کے لیے <span dir="ltr">Sepolia</span> کے خلاف سکرپٹ چلائیں:

```sh
npx hardhat run scripts/mint-nft.js --network sepolia
```

چند سیکنڈ کے بعد، آپ کو اپنے ٹرمینل میں اس طرح کا جواب نظر آنا چاہیے:

```text
The hash of your transaction is: 0x301791fdf492001fcd9d5e5b12f3aa1bbbea9a88ed24993a8ab2cdae2d06e1e8
Your NFT was minted in block <block number>
```

اپنے ٹرانزیکشن کی تفصیلات دیکھنے کے لیے، [<span dir="ltr">Etherscan</span>](https://sepolia.etherscan.io/) یا [<span dir="ltr">Blockscout</span>](https://eth-sepolia.blockscout.com/) پر اس کا ہیش تلاش کریں۔

![View your NFT transaction hash on Etherscan](./view-nft-etherscan.png)_<span dir="ltr">Etherscan</span> پر اپنا <span dir="ltr">NFT</span> ٹرانزیکشن ہیش دیکھیں_

اور بس! اب آپ نے ایتھیریم بلاک چین پر ایک <span dir="ltr">NFT</span> کے ساتھ تعینات اور ڈھلائی کر لی ہے <Emoji text=":money_mouth_face:" size={1} />

`mint-nft.js` کا استعمال کرتے ہوئے آپ اتنے <span dir="ltr">NFTs</span> ڈھال سکتے ہیں جتنا آپ کا دل (اور والیٹ) چاہے گا! بس اس بات کو یقینی بنائیں کہ <span dir="ltr">NFT</span> کے میٹا ڈیٹا کو بیان کرنے والا ایک نیا <span dir="ltr">tokenURI</span> پاس کریں (بصورت دیگر، آپ صرف مختلف <span dir="ltr">IDs</span> کے ساتھ ایک جیسے بہت سے <span dir="ltr">NFTs</span> بنا لیں گے)۔

غالباً، آپ اپنے والیٹ میں اپنا <span dir="ltr">NFT</span> دکھانا چاہیں گے — لہذا [حصہ 3: اپنے والیٹ میں اپنا <span dir="ltr">NFT</span> کیسے دیکھیں](/developers/tutorials/how-to-view-nft-in-metamask/) کو ضرور چیک کریں!
