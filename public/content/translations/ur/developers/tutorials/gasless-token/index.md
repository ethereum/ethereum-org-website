---
title: "اپنے گیس کے بغیر صارفین کو ٹوکن رکھنے اور کنٹریکٹس کال کرنے کی اجازت دینا"
description: "اکاؤنٹ کی تجرید کا استعمال کرتے ہوئے، ہم ایسے سمارٹ کنٹریکٹ والیٹس بنا سکتے ہیں جو کسی مخصوص EOA کے ذریعے بھیجی گئی یا اس EOA کے ذریعے دستخط شدہ ٹرانزیکشنز کو قبول کرتے ہیں۔ یہ سمارٹ کنٹریکٹس پھر ٹوکنز کے مالک ہو سکتے ہیں، جو EOA کے کنٹرول میں ہوتے ہیں۔"
author: "اوری پومرانٹز"
tags: ["گیس کے بغیر", "erc-20", "اکاؤنٹ کی تجرید"]
skill: intermediate
breadcrumb: "گیس کے بغیر ٹوکن"
lang: ur
published: 2026-04-01
---

## تعارف {#introduction}

ایک [پچھلے مضمون](/developers/tutorials/gasless/) میں <span dir="ltr">EIP-712</span> دستخطوں کا استعمال کرتے ہوئے آپ کی اپنی ایپلیکیشن تک گیس کے بغیر رسائی کے استعمال پر تبادلہ خیال کیا گیا تھا، لیکن یہ آپ کے اپنے سمارٹ کنٹریکٹس تک محدود ہے۔ [اکاؤنٹ کی تجرید](/roadmap/account-abstraction/) کا استعمال کرتے ہوئے، ہم ایسے سمارٹ کنٹریکٹ والیٹس بنا سکتے ہیں جو دو قسم کی ٹرانزیکشنز کو قبول کرتے ہیں اور انہیں مطلوبہ منزل تک پہنچاتے ہیں:

- کسی مخصوص <span dir="ltr">EOA</span> کے ذریعے بھیجی گئی ٹرانزیکشنز (جن کے لیے اس <span dir="ltr">EOA</span> کے پاس <span dir="ltr">ETH</span> ہونا ضروری ہے)
- کہیں سے بھی بھیجی گئی ٹرانزیکشنز، لیکن اسی <span dir="ltr">EOA</span> کے ذریعے دستخط شدہ۔

اس طرح، ہم کسی اکاؤنٹ کو اثاثے (ٹوکنز وغیرہ) رکھنے اور وہ تمام افعال انجام دینے کے لیے گیس کے بغیر طریقہ فراہم کر سکتے ہیں جو گیس والا <span dir="ltr">EOA</span> کر سکتا ہے۔

### ہم صرف درخواست کو آگے کیوں نہیں بھیج سکتے؟ {#why-no-tx-origin}

<span dir="ltr">ERC-20</span> اور متعلقہ معیارات میں، اکاؤنٹ کا مالک [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) ہوتا ہے، وہ پتہ جس نے ٹوکن کنٹریکٹ کو کال کیا، جو ضروری نہیں کہ ٹرانزیکشن شروع کرنے والا، [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties) ہو۔ یہ [سیکیورٹی وجوہات](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin) کی بنا پر ضروری ہے۔ اس کا مطلب یہ ہے کہ اگر ہم ٹوکن کی منتقلی کی درخواستوں کو آگے بھیجتے ہیں، تو وہ صارف کے زیر کنٹرول پتے کے بجائے ریلے کرنے والے کے پتے سے ٹوکن منتقل کرنے کی کوشش کریں گے۔

ایک حل موجود ہے جو آپ کو [<span dir="ltr">EIP-7702</span>](https://eip7702.io/) کے ذریعے <span dir="ltr">EOA</span> پتہ استعمال کرنے کی اجازت دیتا ہے، لیکن اس کے لیے ممکنہ طور پر خطرناک تفویض پر دستخط کرنے کی ضرورت ہوتی ہے، لہذا آپ اسے صرف ایسے سمارٹ کنٹریکٹ کو تفویض کرنے کے لیے استعمال کر سکتے ہیں جسے والیٹ فراہم کنندہ منظور کرتا ہو۔ اس ٹیوٹوریل کے لیے میں صارف کے پراکسی کے طور پر سمارٹ کنٹریکٹ بنانے کے بہت آسان طریقے کو ترجیح دیتا ہوں۔

## اسے عملی شکل میں دیکھنا {#in-action}

1. یقینی بنائیں کہ آپ کے پاس [<span dir="ltr">Node</span>](https://nodejs.org/en/download) اور [<span dir="ltr">Foundry</span>](https://www.getfoundry.sh/introduction/installation) دونوں موجود ہیں۔

2. ایپلیکیشن کو کلون کریں اور ضروری سافٹ ویئر انسٹال کریں۔

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. `SEPOLIA_PRIVATE_KEY` کو ایسے والیٹ پر سیٹ کرنے کے لیے `.env` میں ترمیم کریں جس کے پاس <span dir="ltr">Sepolia</span> پر <span dir="ltr">ETH</span> ہو۔ اگر آپ کو <span dir="ltr">Sepolia ETH</span> کی ضرورت ہے، تو اسے حاصل کرنے کے لیے [فوسٹ کا استعمال کریں](/developers/docs/networks/#sepolia)۔ مثالی طور پر، یہ نجی کلید اس کلید سے مختلف ہونی چاہیے جو آپ کے براؤزر والیٹ میں ہے۔

4. سرور شروع کریں۔

   ```sh
   npm run dev
   ```

5. <span dir="ltr">URL</span> [`http://localhost:5173`](http://localhost:5173) پر ایپلیکیشن براؤز کریں۔

6. والیٹ سے جڑنے کے لیے **Connect with Injected** پر کلک کریں۔ والیٹ میں منظور کریں، اور اگر ضروری ہو تو <span dir="ltr">Sepolia</span> میں تبدیلی کو منظور کریں۔

7. نیچے سکرول کریں اور **Deploy UserProxy (slow process)** پر کلک کریں۔

8. آپ دیکھ سکتے ہیں کہ صارف پراکسی کب تعینات ہوتی ہے کیونکہ **UserProxy access** کے آگے ایک پتہ ہوتا ہے۔ اگر آپ نے 24 سیکنڈ (2 بلاکس) انتظار کیا اور یہ اب بھی نہیں ہوا ہے، تو تبدیلیوں کا پتہ لگانے میں کوئی مسئلہ ہو سکتا ہے۔

   اگر ایسا ہے، تو [<span dir="ltr">Sepolia</span> ایکسپلورر](https://eth-sepolia.blockscout.com/) پر جائیں اور وہ تعیناتی ٹرانزیکشن ہیش درج کریں جو آپ کو `npm run dev` پر سرور آؤٹ پٹ میں نظر آتا ہے۔ اس کا پتہ دیکھنے کے لیے بنائے گئے کنٹریکٹ پر کلک کریں، پھر اسے کاپی کریں۔ پتے کو _Or enter existing proxy address_ فیلڈ میں پیسٹ کریں، پھر **Set proxy address** پر کلک کریں۔

9. ٹوکن حاصل کرنے کے لیے <span dir="ltr">ERC-20</span> کنٹریکٹ کے [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) فنکشن کو کال جمع کرانے کے لیے **Request more tokens for proxy** پر کلک کریں۔ والیٹ میں دستخط کی **تصدیق کریں**۔ یقیناً، ٹوکن صارف کے پتے پر نہیں بلکہ پراکسی کے پتے پر پہنچتے ہیں۔

10. نیچے سکرول کریں اور _Last transaction:_ کے نیچے دیے گئے لنک پر کلک کریں۔ یہ آپ کو `faucet` ٹرانزیکشن دکھانے کے لیے براؤزر کھول دے گا۔

11. _amount to transfer_ میں، ایک اور ایک ہزار کے درمیان کوئی عدد درج کریں۔ ٹوکنز کو اپنے پتے پر منتقل کرنے کے لیے **Transfer** پر کلک کریں۔ درخواست کے لیے **Confirm** پر کلک کرنے سے پہلے، دیکھیں کہ جس ڈیٹا پر دستخط کیے جا رہے ہیں وہ غیر واضح ہے۔ صارفین کو یہ سمجھنے میں مشکل پیش آئے گی کہ وہ کس چیز پر دستخط کر رہے ہیں۔ یاد رکھیں کہ ہم اس پر [نیچے](#vulnerabilities) تبادلہ خیال کریں گے۔

12. ٹرانزیکشن کی تصدیق ہونے کے بعد، _your balance_ اور _proxy balance_ دونوں میں تبدیلی دیکھنے کا انتظار کریں۔ نوٹ کریں کہ اس میں بھی کچھ وقت لگے گا، کیونکہ <span dir="ltr">Sepolia</span> کا بلاک کا وقت 12 سیکنڈ ہے۔

## یہ کیسے کام کرتا ہے {#how-work}

گیس کے بغیر تجربے کے لیے، ہمیں صارف کے لیے ایک یوزر انٹرفیس، یوزر انٹرفیس سے پیغامات کو چین تک پہنچانے کے لیے ایک سرور، اور انہیں وصول کرنے اور ان کی تصدیق کرنے کے لیے ایک سمارٹ کنٹریکٹ کی ضرورت ہوتی ہے۔

### والیٹ سمارٹ کنٹریکٹ {#wallet-smart-contract}

یہ [سمارٹ کنٹریکٹ](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol) ہے۔ اس کا مقصد وہ سب کچھ کرنا ہے جو اصل مالک درخواست کرتا ہے، قطع نظر اس کے کہ اس کی درخواست کرنے کے لیے کون سا چینل استعمال کیا گیا ہے، اور باقی سب کچھ نظر انداز کرنا ہے۔ ایسا کرنے کے لیے، اس کے فنکشنز کال کرنے کے لیے ایک ہدف کا پتہ اور اسے کال کرنے کے لیے استعمال ہونے والا ڈیٹا وصول کرتے ہیں۔

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

مالک کی شناخت اور پیغامات کو دہرائے جانے سے روکنے کے لیے ایک [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce)۔ چونکہ نانس ایک `public` متغیر ہے، اس لیے <span dir="ltr">Solidity</span> کمپائلر ایک ویو فنکشن، [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0) بھی بناتا ہے، جو آف چین کوڈ کو اس کی قدر پڑھنے کی اجازت دیتا ہے۔

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

[<span dir="ltr">EIP-712</span> دستخطوں](https://eips.ethereum.org/EIPS/eip-712) کی تصدیق کے لیے درکار معلومات۔

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

ایک `UserProxy` ایک ہی مالک کے پتے سے منسلک ہوتا ہے۔ یہ ضروری ہے کیونکہ یہ اثاثوں (<span dir="ltr">ERC-20</span> ٹوکنز، <span dir="ltr">NFTs</span> وغیرہ) کا مالک ہو سکتا ہے۔ ہم مختلف مالکان کے اثاثوں کو آپس میں ملانا نہیں چاہتے۔

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

[ڈومین الگ کرنے والا](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator)۔ اس کا حساب کمپائل کے وقت نہیں لگایا جا سکتا، کیونکہ یہ چین <span dir="ltr">ID</span> اور کنٹریکٹ کے پتے پر منحصر ہے۔ یہ کسی <span dir="ltr">UserProxy</span> کے لیے دوسرے کے لیے تیار کردہ پیغام سے بے وقوف بننا ناممکن بنا دیتا ہے۔

```solidity
    event CallResult(address target, bytes returnData);
```

کال کے نتائج کو لاگ کریں۔

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

اس فنکشن کو مالک براہ راست کال کر سکتا ہے۔ اگر کوئی ریلے دستیاب نہیں ہیں، تو مالک اب بھی بلاک چین پر براہ راست اثاثوں تک رسائی حاصل کر سکتا ہے (اگر صارف کے پاس <span dir="ltr">ETH</span> ہے)۔

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

اگر ہمیں مالک کی طرف سے _براہ راست_ کال کیا جاتا ہے، تو فراہم کردہ کال ڈیٹا کے ساتھ ہدف کو کال کریں۔

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

یہ `UserProxy` کا بنیادی فنکشن ہے۔ یہ `target` اور `data` کے ساتھ ساتھ ایک دستخط بھی حاصل کرتا ہے۔

```solidity
    external returns (bytes memory) {
        // EIP-712 ڈائجسٹ کا حساب لگائیں
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

ڈائجسٹ میں نانس بھی شامل ہوتا ہے، لیکن ہمیں اسے ٹرانزیکشن سے وصول کرنے کی ضرورت نہیں ہے؛ ہم پہلے ہی صحیح قدر جانتے ہیں۔ غلط نانس والے دستخط کو مسترد کر دیا جائے گا۔

```solidity

    // دستخط کنندہ کو بازیافت کریں
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

اگر دستخط غلط ہے، تو `ecrecover` عام طور پر ایک مختلف پتہ واپس کرے گا، اور اسے قبول نہیں کیا جائے گا۔

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

اس کنٹریکٹ کو کال کریں جسے صارف نے ہمیں کال کرنے کو کہا تھا، اور اگر کامیاب نہ ہو تو ریورٹ کریں۔

```solidity
    emit CallResult(target, returnData);

    nonce++; // ری پلے کو روکنے کے لیے نانس میں اضافہ کریں

    return returnData;
}
```

اگر کامیاب ہو جائے، تو ایک لاگ ایونٹ خارج کریں اور نانس میں اضافہ کریں۔

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

یہ تقریباً ایک جیسی اقسام ہیں جو آپ کو کنٹریکٹ سے <span dir="ltr">ETH</span> منتقل کرنے کی بھی اجازت دیتی ہیں۔

### ریلے کرنے والا {#relayer}

ریلے کرنے والا ایک [سرور جزو](/developers/tutorials/server-components/) ہے۔ یہ <span dir="ltr">JavaScript</span> میں لکھا گیا ہے؛ آپ سورس کوڈ [یہاں](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js) دیکھ سکتے ہیں۔

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

وہ لائبریریاں جن کی ہمیں ضرورت ہے۔ یہ ایک [<span dir="ltr">Express</span>](https://expressjs.com/) سرور ہے، جو یوزر انٹرفیس کوڈ پیش کرنے کے لیے [<span dir="ltr">Vite</span>](https://vite.dev/) کا استعمال کرتا ہے۔ ہم بلاک چین کے ساتھ بات چیت کرنے کے لیے [<span dir="ltr">Viem</span>](https://viem.sh/) کا استعمال کرتے ہیں، اور ٹرانزیکشن بھیجنے والے پتے کے لیے نجی کلید پڑھنے کے لیے [<span dir="ltr">dotenv</span>](https://www.dotenv.org/) کا استعمال کرتے ہیں۔

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

یہ مرتب شدہ `UserProxy` کو پڑھنے کا ایک آسان طریقہ ہے۔ ہمیں `UserProxy` کو کال کرنے کے قابل ہونے کے لیے <span dir="ltr">ABI</span> کی ضرورت ہے، اور اسے صارف کے لیے تعینات کرنے کے قابل ہونے کے لیے مرتب شدہ کوڈ کی ضرورت ہے۔

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

`.env` فائل پڑھیں، پتہ نکالیں، اور اسے کنسول پر پرنٹ کریں۔

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

<span dir="ltr">Viem</span> کلائنٹس جو بلاک چین سے بات کرتے ہیں۔

```js
const start = async () => {
  const app = express()
```

ایک <span dir="ltr">Express</span> سرور چلائیں۔

```js
  app.use(express.json())
```

<span dir="ltr">Express</span> کو درخواست کا باڈی پڑھنے کو کہیں، اور اگر یہ <span dir="ltr">JSON</span> ہے تو اسے پارس کریں۔

```js
  app.post("/server/deploy", async (req, res) => {
```

یہ وہ کوڈ ہے جو پراکسی کو تعینات کرنے کی درخواستوں کو سنبھالتا ہے۔ نوٹ کریں کہ ہم یہاں [ڈینائل آف سروس](https://en.wikipedia.org/wiki/Denial-of-service_attack) حملوں کا شکار ہو سکتے ہیں کیونکہ ایک حملہ آور ہمیں پراکسی تعینات کرنے کی درخواستوں کے ساتھ اس وقت تک سپیم کر سکتا ہے جب تک کہ ہمارا <span dir="ltr">ETH</span> ختم نہ ہو جائے۔ پروڈکشن سسٹم پر، ہم شاید یہ تقاضا کریں گے کہ پراکسی تعینات کرنے کی درخواست پر دستخط کیے جائیں اور دستخط کنندہ ایک موجودہ گاہک ہو۔

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

درخواست سے مالک کا پتہ حاصل کریں۔

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[کنٹریکٹ تعینات کریں](https://viem.sh/docs/contract/deployContract#deploycontract) اور [اس کے تعینات ہونے تک انتظار کریں](https://viem.sh/docs/actions/public/waitForTransactionReceipt)۔

```js
      res.json({ contractAddress: receipt.contractAddress })
```

اگر سب کچھ ٹھیک ہے، تو پراکسی کا پتہ یوزر انٹرفیس کو واپس کریں۔

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

اگر کوئی مسئلہ ہے، تو اس کی اطلاع دیں۔

```js
  app.post("/server/message", async (req, res) => {
```

یہ وہ کوڈ ہے جو `UserProxy` کنٹریکٹ کے لیے صارف کے پیغامات پر کارروائی کرتا ہے۔ یہ ایک اور نقطہ ہے جو ڈینائل آف سروس حملے کا شکار ہو سکتا ہے۔

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

درخواست کا ڈیٹا حاصل کریں اور اسے پراکسی پر `signedAccess` کو کال کرنے کے لیے استعمال کریں۔

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

ٹرانزیکشن ہیش واپس رپورٹ کریں۔ یہ <span dir="ltr">UI</span> کو صارف کے لیے ٹرانزیکشن چیک کرنے کے لیے ایک <span dir="ltr">URL</span> دکھانے کی اجازت دیتا ہے۔

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

دوبارہ، اگر کوئی مسئلہ ہے، تو اس کی اطلاع دیں۔

```js
  // باقی سب کچھ Vite کو سنبھالنے دیں
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

باقی ہر چیز کے لیے، <span dir="ltr">Vite</span> کا استعمال کریں، جو ہمارے لیے یوزر انٹرفیس پیش کرنے کا کام سنبھالتا ہے۔

### یوزر انٹرفیس {#user-interface}

[یہ یوزر انٹرفیس کوڈ ہے](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src)۔ زیادہ تر کوڈ تقریباً ویسا ہی ہے جیسا کہ [اس مضمون](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through) میں دستاویزی شکل میں موجود ہے، سوائے [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) کے۔

[`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) کے کچھ حصے [اس مضمون](/developers/tutorials/gasless/#ui-changes) میں [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) سے ملتے جلتے ہیں۔ یہاں نئے حصے ہیں۔

```js
import {
   encodeFunctionData
       } from 'viem'
```

[یہ فنکشن](https://viem.sh/docs/contract/encodeFunctionData) ایک <span dir="ltr">EVM</span> فنکشن کال کے لیے کال ڈیٹا بناتا ہے۔ یہ ضروری ہے تاکہ صارف کال ڈیٹا پر دستخط کر سکے۔

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

`UserProxy`، جس کی وضاحت اوپر کی گئی ہے۔

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[یہ کنٹریکٹ](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) زیادہ تر ایک عام <span dir="ltr">ERC-20</span> کنٹریکٹ ہے، جس میں ایک اہم فنکشن، `faucet()` کا اضافہ کیا گیا ہے۔ یہ فنکشن جانچ کے مقاصد کے لیے ان ٹوکنز کی درخواست کرنے والے کسی بھی شخص کو ٹوکن دیتا ہے۔

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

`FaucetToken` کا پتہ۔

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

یہ جزو بلاک ایکسپلورر پر کنٹریکٹ کے لنک کے ساتھ ایک پتہ آؤٹ پٹ کرتا ہے۔

```js
const Token = () => {
    ...
```

یہ وہ بنیادی جزو ہے جو زیادہ تر کام کرتا ہے۔

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

صارف کے پتے کا ٹوکن بیلنس۔

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

صارف کی ملکیت والی پراکسی کا پتہ۔

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

پراکسی کا ٹوکن بیلنس۔

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

یہ فیلڈ اس وقت استعمال ہوتی ہے جب صارف دستی طور پر پراکسی کا پتہ سیٹ کرتا ہے۔ پراکسی کا پتہ دستی طور پر سیٹ کرنے کی صلاحیت ہونے سے صارف ہر بار نئی پراکسی تعینات کرنے (اور پرانی پراکسی کی ملکیت والے تمام ٹوکنز کھونے) کے بجائے موجودہ پراکسی استعمال کر سکتا ہے۔

```js
  const [ txHash, setTxHash ] = useState(null)
```

آخری ٹرانزیکشن کا ہیش، جو ایکسپلورر کا لنک دکھانے کے لیے استعمال ہوتا ہے تاکہ صارف اس ٹرانزیکشن کو چیک کر سکے۔

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

یہ تمام فیلڈز <span dir="ltr">ERC-20</span> کنٹریکٹ کو ٹوکن کی منتقلی کی کمانڈز بھیجنے کے لیے استعمال ہوتی ہیں۔ یہ `FaucetToken` ہو سکتا ہے، لیکن ایسا ہونا ضروری نہیں ہے۔ [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) فنکشن <span dir="ltr">ERC-20</span> معیار کا حصہ ہے۔

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

ان دو ٹوکن بیلنسز کو پڑھیں جن میں ہماری دلچسپی ہے، صارف کے پاس کتنا ہے، اور پراکسی کے پاس کتنا ہے۔

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

ری پلے حملوں کو روکنے کے لیے (مثال کے طور پر، کوئی بیچنے والا ایسی ٹرانزیکشن کو ری پلے کرے جو اسے پیسے دیتی ہے)، ہم ایک [نانس](https://en.wikipedia.org/wiki/Cryptographic_nonce) استعمال کرتے ہیں۔ ہمیں موجودہ قدر جاننے کی ضرورت ہے تاکہ اسے اس ڈیٹا میں شامل کیا جا سکے جس پر ہم دستخط کرتے ہیں۔

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

جب بلاک چین سے پڑھی گئی معلومات تبدیل ہوتی ہیں تو صارف کو دکھائے جانے والے بیلنس کو اپ ڈیٹ کرنے کے لیے [`useEffect`](https://react.dev/reference/react/useEffect) کا استعمال کریں۔

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

پہلے سے طے شدہ طور پر `FaucetToken` ٹوکنز کو صارف کے اپنے اکاؤنٹ میں منتقل کرنا ہے۔ یہاں ہم ان اقدار کو اس وقت سیٹ کرتے ہیں جب ہم انہیں <span dir="ltr">Viem</span> سے وصول کرتے ہیں۔

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

ٹیکسٹ فیلڈز تبدیل ہونے پر ایونٹ ہینڈلرز۔

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

سرور سے اس صارف کے لیے پراکسی تعینات کرنے کو کہیں۔

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

آن چین `UserProxy` کو بھیجنے کے لیے سرور کو بھیجنے سے پہلے ایک پیغام پر دستخط کریں۔ اس کی وضاحت [یہاں](/developers/tutorials/gasless/#ui-changes) کی گئی ہے۔ ہمیں ہدف کے پتے (اس ٹوکن کا پتہ جسے ہم کال کر رہے ہیں) اور بھیجے جانے والے کال ڈیٹا دونوں کے ساتھ ایک پیغام پر دستخط کرنے کی ضرورت ہے۔

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

ایک دستخط شدہ پیغام `UserProxy` کو بھیجیں، جو دستخط کی تصدیق کرے گا اور پھر اسے `target` کو بھیج دے گا۔

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // دونوں پتے
          data,           // ہدف کو بھیجنے کے لیے کال ڈیٹا
          v, r, s         // دستخط
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

سرور کو ایک درخواست بھیجیں، اور جب آپ کو جواب موصول ہو، تو ٹرانزیکشن ہیش حاصل کریں۔

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

`faucet` فنکشن کو کال کرنے کی نقل کریں۔ ہم فوسٹ بٹن کو صرف اسی صورت میں فعال کرتے ہیں جب یہ کامیاب ہو۔

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

سرور اور `UserProxy` کے ذریعے کسی فنکشن کو کال کرنے کے لیے، ہم تین مراحل پر عمل کرتے ہیں:

1. [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData) کا استعمال کرتے ہوئے دستخط کرنے اور بھیجنے کے لیے کال ڈیٹا بنائیں۔

2. پیغام پر دستخط کریں (ہدف کا پتہ، کال ڈیٹا، اور نانس)۔

3. پیغام سرور کو بھیجیں۔

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

جزو کا یہ حصہ آپ کو براؤزر سے براہ راست `FaucetToken` استعمال کرنے دیتا ہے۔ اس کا بنیادی مقصد ڈیبگنگ میں سہولت فراہم کرنا ہے۔

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

صارف کو ایک نیا `UserProxy` تعینات کرنے دیں۔

```js
         <br /><br />
         <input type="text" placeholder="یا موجودہ پراکسی پتہ درج کریں" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

صارفین کو صرف اس وقت **Set proxy address** پر کلک کرنے دیں جب وہ کوئی جائز پتہ درج کریں۔ نوٹ کریں کہ یہ اس بات کو یقینی نہیں بناتا کہ زیر بحث پتہ واقعی ایک `UserProxy` کنٹریکٹ ہے۔ ایسی جانچ شامل کرنا ممکن ہے، لیکن یہ بہت سست ہوگا (صارف کا بدتر تجربہ) اور سیکیورٹی کو بہتر نہیں بنائے گا (حملہ آور ہمیشہ یوزر انٹرفیس کے لیے اپنا کوڈ استعمال کر سکتے ہیں)۔

```js
         <br /><br />
         { proxyAddr && (
```

باقی حصہ _صرف_ اس صورت میں دکھائیں جب کوئی جائز پراکسی پتہ موجود ہو۔

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

صارف کو نانس جاننے کی ضرورت نہیں ہے؛ یہ صرف ڈیبگنگ کے مقاصد کے لیے ہے۔

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

ہم پراکسی کے ذریعے `faucet()` کو کال کی نقل نہیں کر سکتے۔ تاہم، ہم کم از کم یہ یقینی بنا سکتے ہیں کہ ہمارے پاس ایک پراکسی ہے اور پراکسی نے ہمیں ایک نانس کی اطلاع دی ہے۔

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

صارف کو <span dir="ltr">ERC-20</span> منتقلی کی ٹرانزیکشنز جاری کرنے دیں۔

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

اگر کوئی آخری ٹرانزیکشن ہیش ہے، تو ایک لنک دکھائیں تاکہ صارف اسے بلاک ایکسپلورر میں دیکھ سکے۔

```js
 
</div>
    </>
  )
}

export {Token}
```

یہ صرف <span dir="ltr">React</span> بوائلرپلیٹ ہے۔

## کمزوریاں {#vulnerabilities}

ہمارا سرور ڈینائل آف سروس حملوں کا شکار ہو سکتا ہے۔ اس حملے کی وضاحت [سیریز کے پچھلے مضمون میں](/developers/tutorials/gasless/#dos-on-server) کی گئی ہے۔

مزید برآں، ہم صارف کے برے رویے کی حوصلہ افزائی کر رہے ہیں۔ ہم صارف سے اس پر دستخط کرنے کو کہتے ہیں:

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_ہم_ جانتے ہیں کہ یہ اس ٹوکن، رقم، اور منزل کے پتے کے لیے ایک جائز <span dir="ltr">ERC-20</span> منتقلی ہے جسے صارف منتقل کرنا چاہتا ہے۔ لیکن زیادہ تر صارفین نہیں جانتے کہ کال ڈیٹا کی تشریح کیسے کی جائے، اور انہیں اندازہ نہیں ہوتا کہ وہ کس چیز پر دستخط کر رہے ہیں۔ یہ دو وجوہات کی بنا پر برا ڈیزائن ہے:

- کچھ صارفین ہمیں استعمال نہیں کریں گے کیونکہ وہ اس ڈیٹا پر بھروسہ نہیں کرتے جس پر ہم انہیں دستخط کرنے کو کہتے ہیں۔
- دوسرے صارفین ہم پر بھروسہ _کریں گے_ اور یہ سیکھیں گے کہ انہیں یہ سمجھے بغیر کال ڈیٹا پر دستخط کر دینے چاہئیں کہ یہ کیا ہے۔ اس کا مطلب یہ ہے کہ اگر کوئی حملہ آور انہیں اپنی ویب سائٹ پر بھیجنے میں کامیاب ہو جاتا ہے، تو وہ ان سے ایسی ٹرانزیکشن پر دستخط کروا سکتا ہے جو اسے صارف کی ملکیت والے تمام <span dir="ltr">USDC</span> (یا <span dir="ltr">DAI</span>، یا کوئی اور <span dir="ltr">ERC-20</span>) دے دے۔

اس کا حل یہ ہے کہ عام طور پر استعمال ہونے والے فنکشنز، جیسے منتقلی کے لیے `UserProxy` میں الگ الگ فنکشنز ہوں۔ پھر صارفین کسی ایسی چیز پر دستخط کر سکتے ہیں جسے وہ سمجھتے ہوں۔

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**نوٹ:** اگرچہ صارفین اپنی مرضی کا کوئی بھی والیٹ استعمال کر سکتے ہیں، لیکن یہ انتہائی تجویز کیا جاتا ہے کہ <span dir="ltr">EIP-712</span> استعمال کرنے والی ایپلیکیشنز انہیں ایسا والیٹ استعمال کرنے کی ترغیب دیں جو [دستخط کا مکمل ڈیٹا دکھاتا ہو](https://rabby.io/)۔ کچھ والیٹس پتے کو کاٹ دیتے ہیں، جو غیر محفوظ ہے۔ ایک حملہ آور ایسا پتہ بنا سکتا ہے جس کے شروع اور آخر کے حروف ایک جیسے ہوں، لیکن درمیان میں مختلف ہوں۔

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## نتیجہ {#conclusion}

مذکورہ بالا کمزوریوں کے علاوہ، اس ٹیوٹوریل کے حل میں کئی خامیاں ہیں جنہیں دور کرنے میں ایتھیریم ہماری مدد کر سکتا ہے۔

- _سنسرشپ کے خلاف مزاحمت_۔ فی الحال، صارفین آپ کا سرور، کسی اور کا قائم کردہ مسابقتی سرور استعمال کر سکتے ہیں، یا براہ راست ایتھیریم سے جڑ سکتے ہیں، جس پر گیس کی لاگت آتی ہے۔ [<span dir="ltr">ERC-4337</span>](https://docs.erc4337.io/#what-is-erc-4337) کا استعمال صارفین کو اپنی ٹرانزیکشن سرورز کے ایک بڑے پول کو پیش کرنے دیتا ہے، جس سے ان کی ٹرانزیکشنز کے سنسر ہونے کا امکان کم ہو جاتا ہے۔
- _<span dir="ltr">EOA</span> کی ملکیت والے اثاثے_۔ جیسا کہ اوپر بتایا گیا ہے، [<span dir="ltr">EIP-7702</span>](https://eip7702.io/) کو <span dir="ltr">EOA</span> پتے کی ملکیت والے اثاثوں کا انتظام کرنے کے لیے استعمال کیا جا سکتا ہے۔ اس کی اپنی مشکلات ہیں، لیکن بعض اوقات یہ ضروری ہوتا ہے۔

مجھے امید ہے کہ مستقبل قریب میں ان خصوصیات کو شامل کرنے کے بارے میں ٹیوٹوریلز شائع کروں گا۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
