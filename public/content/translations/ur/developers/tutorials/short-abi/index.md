---
title: "کال ڈیٹا (Calldata) کی بہتری کے لیے مختصر ABIs"
description: "آپٹیمسٹک رول اپس (Optimistic Rollups) کے لیے اسمارٹ کانٹریکٹس کو بہتر بنانا"
author: "اوری پومرانٹز"
lang: ur
tags: ["لیئر 2"]
skill: intermediate
breadcrumb: "مختصر ABIs"
published: 2022-04-01
---

## تعارف {#introduction}

اس مضمون میں، آپ [آپٹیمسٹک رول اپس](/developers/docs/scaling/optimistic-rollups) (optimistic rollups)، ان پر ٹرانزیکشنز کی لاگت، اور اس بارے میں جانیں گے کہ کس طرح یہ مختلف لاگت کا ڈھانچہ ہمیں ایتھیریم مین نیٹ (Mainnet) کی نسبت مختلف چیزوں کو بہتر بنانے کا تقاضا کرتا ہے۔ آپ یہ بھی سیکھیں گے کہ اس بہتری کو کیسے نافذ کیا جائے۔

### مکمل انکشاف {#full-disclosure}

میں [Optimism](https://www.optimism.io/) کا کل وقتی ملازم ہوں، اس لیے اس مضمون میں دی گئی مثالیں Optimism پر چلیں گی۔ تاہم، یہاں بیان کی گئی تکنیک دیگر رول اپس کے لیے بھی اتنی ہی اچھی طرح کام کرنی چاہیے۔

### اصطلاحات {#terminology}

جب رول اپس پر بات کی جاتی ہے، تو اصطلاح 'لیئر 1' (L1) مین نیٹ (Mainnet)، یعنی پروڈکشن ایتھیریم نیٹ ورک کے لیے استعمال ہوتی ہے۔ اصطلاح 'لیئر 2' (L2) رول اپ یا کسی دوسرے سسٹم کے لیے استعمال ہوتی ہے جو سیکیورٹی کے لیے L1 پر انحصار کرتا ہے لیکن اپنی زیادہ تر پروسیسنگ آف چین (offchain) کرتا ہے۔

## ہم L2 ٹرانزیکشنز کی لاگت کو مزید کیسے کم کر سکتے ہیں؟ {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[آپٹیمسٹک رول اپس](/developers/docs/scaling/optimistic-rollups) کو ہر تاریخی ٹرانزیکشن کا ریکارڈ محفوظ کرنا ہوتا ہے تاکہ کوئی بھی ان کا جائزہ لے سکے اور تصدیق کر سکے کہ موجودہ اسٹیٹ (state) درست ہے۔ ایتھیریم مین نیٹ میں ڈیٹا داخل کرنے کا سب سے سستا طریقہ اسے کال ڈیٹا (calldata) کے طور پر لکھنا ہے۔ یہ حل [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) اور [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) دونوں نے منتخب کیا تھا۔

### L2 ٹرانزیکشنز کی لاگت {#cost-of-l2-transactions}

L2 ٹرانزیکشنز کی لاگت دو اجزاء پر مشتمل ہوتی ہے:

1. L2 پروسیسنگ، جو عام طور پر انتہائی سستی ہوتی ہے
2. L1 اسٹوریج، جو مین نیٹ گیس کی لاگت سے منسلک ہوتی ہے

جب میں یہ لکھ رہا ہوں، Optimism پر L2 گیس کی قیمت 0.001 [Gwei](/developers/docs/gas/#pre-london) ہے۔ دوسری طرف، L1 گیس کی قیمت تقریباً 40 gwei ہے۔ [آپ موجودہ قیمتیں یہاں دیکھ سکتے ہیں](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)۔

کال ڈیٹا کے ایک بائٹ کی قیمت یا تو 4 گیس (اگر یہ صفر ہو) یا 16 گیس (اگر یہ کوئی اور قدر ہو) ہوتی ہے۔ EVM پر سب سے مہنگے آپریشنز میں سے ایک اسٹوریج میں لکھنا ہے۔ L2 پر اسٹوریج میں 32 بائٹ کا لفظ لکھنے کی زیادہ سے زیادہ لاگت 22100 گیس ہے۔ فی الحال، یہ 22.1 gwei ہے۔ لہذا اگر ہم کال ڈیٹا کا ایک بھی صفر بائٹ بچا سکیں، تو ہم اسٹوریج میں تقریباً 200 بائٹس لکھنے کے قابل ہو جائیں گے اور پھر بھی فائدے میں رہیں گے۔

### ABI {#the-abi}

ٹرانزیکشنز کی اکثریت ایک بیرونی ملکیت والے اکاؤنٹ (externally-owned account) سے کانٹریکٹ تک رسائی حاصل کرتی ہے۔ زیادہ تر کانٹریکٹس Solidity میں لکھے جاتے ہیں اور اپنے ڈیٹا فیلڈ کی تشریح [ایپلیکیشن بائنری انٹرفیس (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) کے مطابق کرتے ہیں۔

تاہم، ABI کو L1 کے لیے ڈیزائن کیا گیا تھا، جہاں کال ڈیٹا کے ایک بائٹ کی قیمت تقریباً چار ریاضیاتی آپریشنز کے برابر ہوتی ہے، نہ کہ L2 کے لیے جہاں کال ڈیٹا کے ایک بائٹ کی قیمت ایک ہزار سے زیادہ ریاضیاتی آپریشنز سے زیادہ ہوتی ہے۔ کال ڈیٹا کو اس طرح تقسیم کیا گیا ہے:

| سیکشن | لمبائی | بائٹس | ضائع شدہ بائٹس | ضائع شدہ گیس | ضروری بائٹس | ضروری گیس |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| فنکشن سلیکٹر | 4 | 0-3 | 3 | 48 | 1 | 16 |
| صفر (Zeroes) | 12 | 4-15 | 12 | 48 | 0 | 0 |
| منزل کا پتہ | 20 | 16-35 | 0 | 0 | 20 | 320 |
| رقم | 32 | 36-67 | 17 | 64 | 15 | 240 |
| کل | 68 | | | 160 | | 576 |

وضاحت:

- **فنکشن سلیکٹر**: کانٹریکٹ میں 256 سے کم فنکشنز ہیں، اس لیے ہم انہیں ایک بائٹ سے ممتاز کر سکتے ہیں۔ یہ بائٹس عام طور پر غیر صفر ہوتے ہیں اور اس لیے [ان کی قیمت سولہ گیس ہوتی ہے](https://eips.ethereum.org/EIPS/eip-2028)۔
- **صفر (Zeroes)**: یہ بائٹس ہمیشہ صفر ہوتے ہیں کیونکہ بیس بائٹ کے پتے کو رکھنے کے لیے بتیس بائٹ کے لفظ کی ضرورت نہیں ہوتی۔ صفر رکھنے والے بائٹس کی قیمت چار گیس ہوتی ہے ([یلو پیپر دیکھیں](https://ethereum.github.io/yellowpaper/paper.pdf)، ضمیمہ G، صفحہ 27، `G`<sub>`txdatazero`</sub> کی قدر)۔
- **رقم**: اگر ہم فرض کریں کہ اس کانٹریکٹ میں `decimals` اٹھارہ ہیں (عام قدر) اور ٹوکنز کی زیادہ سے زیادہ رقم جو ہم منتقل کریں گے وہ <span dir="ltr">10<sup>18</sup></span> ہوگی، تو ہمیں زیادہ سے زیادہ رقم <span dir="ltr">10<sup>36</sup></span> ملتی ہے۔ <span dir="ltr">256<sup>15</sup> &gt; 10<sup>36</sup></span>، اس لیے پندرہ بائٹس کافی ہیں۔

L1 پر 160 گیس کا ضیاع عام طور پر نہ ہونے کے برابر ہے۔ ایک ٹرانزیکشن کی لاگت کم از کم [21,000 گیس](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) ہوتی ہے، اس لیے اضافی 0.8% سے کوئی فرق نہیں پڑتا۔ تاہم، L2 پر، چیزیں مختلف ہیں۔ ٹرانزیکشن کی تقریباً پوری لاگت اسے L1 پر لکھنے کی ہوتی ہے۔ ٹرانزیکشن کال ڈیٹا کے علاوہ، ٹرانزیکشن ہیڈر (منزل کا پتہ، دستخط، وغیرہ) کے 109 بائٹس ہوتے ہیں۔ اس لیے کل لاگت `109*16+576+160=2480` ہے، اور ہم اس کا تقریباً 6.5% ضائع کر رہے ہیں۔

## جب آپ کا منزل پر کنٹرول نہ ہو تو لاگت کو کم کرنا {#reducing-costs-when-you-dont-control-the-destination}

یہ فرض کرتے ہوئے کہ آپ کا منزل کے کانٹریکٹ پر کنٹرول نہیں ہے، آپ پھر بھی [اس جیسے](https://github.com/qbzzt/ethereum.org-20220330-shortABI) حل کا استعمال کر سکتے ہیں۔ آئیے متعلقہ فائلوں کا جائزہ لیتے ہیں۔

### Token.sol {#token-sol}

[یہ منزل کا کانٹریکٹ ہے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)۔ یہ ایک معیاری ERC-20 کانٹریکٹ ہے، جس میں ایک اضافی خصوصیت ہے۔ یہ `faucet` فنکشن کسی بھی صارف کو استعمال کے لیے کچھ ٹوکن حاصل کرنے دیتا ہے۔ یہ ایک پروڈکشن ERC-20 کانٹریکٹ کو بیکار بنا دے گا، لیکن جب کوئی ERC-20 صرف ٹیسٹنگ کی سہولت کے لیے موجود ہو تو یہ زندگی کو آسان بنا دیتا ہے۔

```solidity
    /* *
     * @dev کالر کو کھیلنے کے لیے 1000 ٹوکنز دیتا ہے */
    function faucet() external {
        _mint(msg.sender, 1000);
    } // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[یہ وہ کانٹریکٹ ہے جسے ٹرانزیکشنز کو مختصر کال ڈیٹا کے ساتھ کال کرنا چاہیے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)۔ آئیے اس کا لائن بہ لائن جائزہ لیتے ہیں۔

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

ہمیں ٹوکن فنکشن کی ضرورت ہے تاکہ معلوم ہو سکے کہ اسے کیسے کال کرنا ہے۔

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

اس ٹوکن کا پتہ جس کے لیے ہم ایک پراکسی ہیں۔

```solidity

    /* *
     * @dev ٹوکن کا ایڈریس متعین کریں
     * @param tokenAddr_ ERC-20 کنٹریکٹ کا ایڈریس */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    } // constructor
```

ٹوکن کا پتہ واحد پیرامیٹر ہے جسے ہمیں بتانے کی ضرورت ہے۔

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

کال ڈیٹا سے ایک قدر پڑھیں۔

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

ہم میموری میں ایک 32 بائٹ (256 بٹ) کا لفظ لوڈ کرنے جا رہے ہیں اور ان بائٹس کو ہٹا دیں گے جو ہمارے مطلوبہ فیلڈ کا حصہ نہیں ہیں۔ یہ الگورتھم 32 بائٹس سے لمبی قدروں کے لیے کام نہیں کرتا، اور یقیناً ہم کال ڈیٹا کے اختتام سے آگے نہیں پڑھ سکتے۔ L1 پر گیس بچانے کے لیے ان ٹیسٹس کو چھوڑنا ضروری ہو سکتا ہے، لیکن L2 پر گیس انتہائی سستی ہے، جو ہمیں کسی بھی قسم کے سینیٹی چیکس (sanity checks) کو فعال کرنے کی اجازت دیتی ہے جو ہم سوچ سکتے ہیں۔

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

ہم `fallback()` کی کال سے ڈیٹا کاپی کر سکتے تھے (نیچے دیکھیں)، لیکن EVM کی اسمبلی زبان [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) کا استعمال کرنا زیادہ آسان ہے۔

یہاں ہم اسٹیک میں `startByte` سے `startByte+31` تک بائٹس پڑھنے کے لیے [CALLDATALOAD اوپ کوڈ (opcode)](https://www.evm.codes/#35) کا استعمال کرتے ہیں۔ عام طور پر، Yul میں اوپ کوڈ کا نحو (syntax) `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` ہوتا ہے۔

```solidity

        _retVal = _retVal >> (256-length*8);
```

صرف سب سے اہم `length` بائٹس فیلڈ کا حصہ ہیں، اس لیے ہم دیگر قدروں سے چھٹکارا پانے کے لیے [رائٹ شفٹ (right-shift)](https://en.wikipedia.org/wiki/Logical_shift) کرتے ہیں۔ اس کا ایک اضافی فائدہ یہ ہے کہ قدر فیلڈ کے دائیں طرف منتقل ہو جاتی ہے، اس لیے یہ قدر بذات خود ہوتی ہے نہ کہ قدر ضرب <span dir="ltr">256<sup>something</sup></span>۔

```solidity

        return _retVal;
    }


    fallback() external {
```

جب کسی Solidity کانٹریکٹ کی کال کسی بھی فنکشن کے دستخطوں (signatures) سے میل نہیں کھاتی، تو یہ [`fallback()` فنکشن](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) کو کال کرتی ہے (یہ فرض کرتے ہوئے کہ وہاں ایک موجود ہے)۔ `CalldataInterpreter` کے معاملے میں، _کوئی بھی_ کال یہاں آتی ہے کیونکہ کوئی اور `external` یا `public` فنکشنز نہیں ہیں۔

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

کال ڈیٹا کا پہلا بائٹ پڑھیں، جو ہمیں فنکشن بتاتا ہے۔ یہاں کسی فنکشن کے دستیاب نہ ہونے کی دو وجوہات ہو سکتی ہیں:

1. وہ فنکشنز جو `pure` یا `view` ہیں وہ اسٹیٹ (state) کو تبدیل نہیں کرتے اور ان پر گیس خرچ نہیں ہوتی (جب آف چین کال کیا جائے)۔ ان کی گیس کی لاگت کو کم کرنے کی کوشش کرنے کا کوئی مطلب نہیں ہے۔
2. وہ فنکشنز جو [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) پر انحصار کرتے ہیں۔ `msg.sender` کی قدر کال کرنے والے کی بجائے `CalldataInterpreter` کا پتہ ہوگی۔

بدقسمتی سے، [ERC-20 کی خصوصیات کو دیکھتے ہوئے](https://eips.ethereum.org/EIPS/eip-20)، اس سے صرف ایک فنکشن، `transfer` بچتا ہے۔ اس سے ہمارے پاس صرف دو فنکشنز بچتے ہیں: `transfer` (کیونکہ ہم `transferFrom` کو کال کر سکتے ہیں) اور `faucet` (کیونکہ ہم ٹوکنز واپس اس شخص کو منتقل کر سکتے ہیں جس نے ہمیں کال کیا تھا)۔

```solidity

        // ٹوکن کے اسٹیٹ تبدیل کرنے والے میتھڈز کو کال کریں استعمال کرتے ہوئے
        // کال ڈیٹا سے معلومات

        // faucet
        if (_func == 1) {
```

`faucet()` کی ایک کال، جس میں پیرامیٹرز نہیں ہوتے۔

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

`token.faucet()` کو کال کرنے کے بعد ہمیں ٹوکن ملتے ہیں۔ تاہم، پراکسی کانٹریکٹ کے طور پر، ہمیں ٹوکنز کی **ضرورت** نہیں ہے۔ EOA (بیرونی ملکیت والا اکاؤنٹ) یا جس کانٹریکٹ نے ہمیں کال کیا اسے ضرورت ہے۔ اس لیے ہم اپنے تمام ٹوکنز اس شخص کو منتقل کر دیتے ہیں جس نے ہمیں کال کیا تھا۔

```solidity
        // ٹرانسفر (فرض کریں کہ ہمارے پاس اس کے لیے الاؤنس موجود ہے)
        if (_func == 2) {
```

ٹوکنز منتقل کرنے کے لیے دو پیرامیٹرز کی ضرورت ہوتی ہے: منزل کا پتہ اور رقم۔

```solidity
            token.transferFrom(
                msg.sender,
```

ہم کال کرنے والوں کو صرف ان کے اپنے ٹوکنز منتقل کرنے کی اجازت دیتے ہیں

```solidity
                address(uint160(calldataVal(1, 20))),
```

منزل کا پتہ بائٹ #1 سے شروع ہوتا ہے (بائٹ #0 فنکشن ہے)۔ ایک پتے کے طور پر، یہ 20 بائٹس لمبا ہوتا ہے۔

```solidity
                calldataVal(21, 2)
```

اس مخصوص کانٹریکٹ کے لیے ہم فرض کرتے ہیں کہ ٹوکنز کی زیادہ سے زیادہ تعداد جو کوئی بھی منتقل کرنا چاہے گا وہ دو بائٹس میں فٹ ہو جاتی ہے (65536 سے کم)۔

```solidity
            );
        }
```

مجموعی طور پر، ایک منتقلی میں کال ڈیٹا کے 35 بائٹس لگتے ہیں:

| سیکشن | لمبائی | بائٹس |
| ------------------- | -----: | ----: |
| فنکشن سلیکٹر | 1 | 0 |
| منزل کا پتہ | 32 | 1-32 |
| رقم | 2 | 33-34 |

```solidity
    } // fallback

} // contract CalldataInterpreter
```

### test.js {#test-js}

[یہ جاوا اسکرپٹ یونٹ ٹیسٹ](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ہمیں دکھاتا ہے کہ اس طریقہ کار کو کیسے استعمال کیا جائے (اور یہ کیسے تصدیق کی جائے کہ یہ صحیح طریقے سے کام کرتا ہے)۔ میں یہ فرض کرنے جا رہا ہوں کہ آپ [chai](https://www.chaijs.com/) اور [ethers](https://docs.ethers.io/v5/) کو سمجھتے ہیں اور صرف ان حصوں کی وضاحت کروں گا جو خاص طور پر کانٹریکٹ پر لاگو ہوتے ہیں۔

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

ہم دونوں کانٹریکٹس کو ڈیپلائے کر کے شروعات کرتے ہیں۔

```javascript
    // کھیلنے کے لیے ٹوکنز حاصل کریں
    const faucetTx = {
```

ہم ٹرانزیکشنز بنانے کے لیے وہ ہائی لیول فنکشنز استعمال نہیں کر سکتے جو ہم عام طور پر استعمال کرتے ہیں (جیسے `token.faucet()`)، کیونکہ ہم ABI کی پیروی نہیں کرتے۔ اس کے بجائے، ہمیں ٹرانزیکشن خود بنانی ہوگی اور پھر اسے بھیجنا ہوگا۔

```javascript
      to: cdi.address,
      data: "0x01"
```

ٹرانزیکشن کے لیے ہمیں دو پیرامیٹرز فراہم کرنے کی ضرورت ہے:

1. `to`، منزل کا پتہ۔ یہ کال ڈیٹا انٹرپریٹر کانٹریکٹ ہے۔
2. `data`، بھیجنے کے لیے کال ڈیٹا۔ faucet کال کی صورت میں، ڈیٹا ایک واحد بائٹ، `0x01` ہوتا ہے۔

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

ہم [سائنر (signer) کے `sendTransaction` طریقہ کار](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) کو کال کرتے ہیں کیونکہ ہم نے پہلے ہی منزل (`faucetTx.to`) بتا دی ہے اور ہمیں ٹرانزیکشن پر دستخط کرنے کی ضرورت ہے۔

```javascript
// چیک کریں کہ faucet ٹوکنز درست طریقے سے فراہم کرتا ہے
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

یہاں ہم بیلنس کی تصدیق کرتے ہیں۔ `view` فنکشنز پر گیس بچانے کی کوئی ضرورت نہیں ہے، اس لیے ہم انہیں بس عام طریقے سے چلاتے ہیں۔

```javascript
// CDI کو الاؤنس دیں (اپروولز کو پراکسی نہیں کیا جا سکتا)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

کال ڈیٹا انٹرپریٹر کو الاؤنس (allowance) دیں تاکہ وہ منتقلی کر سکے۔

```javascript
// ٹوکنز ٹرانسفر کریں
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

ایک ٹرانسفر ٹرانزیکشن بنائیں۔ پہلا بائٹ "0x02" ہے، اس کے بعد منزل کا پتہ، اور آخر میں رقم (0x0100، جو اعشاریہ میں 256 ہے)۔

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // چیک کریں کہ ہمارے پاس 256 ٹوکنز کم ہیں
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // اور یہ کہ ہماری منزل کو وہ مل گئے ہیں
    expect (await token.balanceOf(destAddr)).to.equal(256)
  }) // it
}) // describe
```

## جب آپ کا منزل کے کانٹریکٹ پر کنٹرول ہو تو لاگت کو کم کرنا {#reducing-the-cost-when-you-do-control-the-destination-contract}

اگر آپ کا منزل کے کانٹریکٹ پر کنٹرول ہے تو آپ ایسے فنکشنز بنا سکتے ہیں جو `msg.sender` چیکس کو نظرانداز کر دیں کیونکہ وہ کال ڈیٹا انٹرپریٹر پر بھروسہ کرتے ہیں۔ [آپ اس کی ایک مثال یہاں دیکھ سکتے ہیں کہ یہ کیسے کام کرتا ہے، `control-contract` برانچ میں](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)۔

اگر کانٹریکٹ صرف بیرونی ٹرانزیکشنز کا جواب دے رہا ہوتا، تو ہم صرف ایک کانٹریکٹ رکھ کر کام چلا سکتے تھے۔ تاہم، اس سے [کمپوزایبلٹی (composability)](/developers/docs/smart-contracts/composability/) ٹوٹ جائے گی۔ یہ بہت بہتر ہے کہ ایک ایسا کانٹریکٹ ہو جو عام ERC-20 کالز کا جواب دے، اور دوسرا کانٹریکٹ جو مختصر کال ڈیٹا والی ٹرانزیکشنز کا جواب دے۔

### Token.sol {#token-sol-2}

اس مثال میں ہم `Token.sol` میں ترمیم کر سکتے ہیں۔ اس سے ہمیں کئی ایسے فنکشنز رکھنے کی اجازت ملتی ہے جنہیں صرف پراکسی کال کر سکتی ہے۔ یہاں نئے حصے ہیں:

```solidity
    // وہ واحد ایڈریس جسے CalldataInterpreter کا ایڈریس متعین کرنے کی اجازت ہے
    address owner;

    // CalldataInterpreter کا ایڈریس
    address proxy = address(0);
```

ERC-20 کانٹریکٹ کو مجاز پراکسی کی شناخت جاننے کی ضرورت ہوتی ہے۔ تاہم، ہم اس متغیر کو کنسٹرکٹر (constructor) میں سیٹ نہیں کر سکتے، کیونکہ ہم ابھی تک اس کی قدر نہیں جانتے۔ یہ کانٹریکٹ پہلے انسٹینشی ایٹ (instantiate) کیا جاتا ہے کیونکہ پراکسی اپنے کنسٹرکٹر میں ٹوکن کے پتے کی توقع کرتی ہے۔

```solidity
    /* *
     * @dev ERC20 کنسٹرکٹر کو کال کرتا ہے۔ */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

بنانے والے کا پتہ (جسے `owner` کہا جاتا ہے) یہاں محفوظ کیا جاتا ہے کیونکہ یہی واحد پتہ ہے جسے پراکسی سیٹ کرنے کی اجازت ہے۔

```solidity
    /* *
     * @dev پراکسی (CalldataInterpreter) کے لیے ایڈریس سیٹ کریں۔
     * اسے مالک کی طرف سے صرف ایک بار کال کیا جا سکتا ہے */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    } // function setProxy
```

پراکسی کو مراعات یافتہ رسائی حاصل ہے، کیونکہ یہ سیکیورٹی چیکس کو نظرانداز کر سکتی ہے۔ اس بات کو یقینی بنانے کے لیے کہ ہم پراکسی پر بھروسہ کر سکتے ہیں، ہم صرف `owner` کو اس فنکشن کو کال کرنے دیتے ہیں، اور وہ بھی صرف ایک بار۔ ایک بار جب `proxy` کی کوئی حقیقی قدر (صفر نہیں) ہو جاتی ہے، تو وہ قدر تبدیل نہیں ہو سکتی، اس لیے اگر مالک دھوکہ دینے کا فیصلہ بھی کر لے، یا اس کا نیمونک (mnemonic) ظاہر ہو جائے، تب بھی ہم محفوظ رہتے ہیں۔

```solidity
    /* *
     * @dev کچھ فنکشنز کو صرف پراکسی کے ذریعے کال کیا جا سکتا ہے۔ */
    modifier onlyProxy {
```

یہ ایک [`modifier` فنکشن](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) ہے، یہ دوسرے فنکشنز کے کام کرنے کے طریقے کو تبدیل کرتا ہے۔

```solidity
      require(msg.sender == proxy);
```

سب سے پہلے، تصدیق کریں کہ ہمیں پراکسی نے کال کیا ہے اور کسی اور نے نہیں۔ اگر نہیں، تو `revert` کریں۔

```solidity
      _;
    }
```

اگر ایسا ہے، تو وہ فنکشن چلائیں جس میں ہم ترمیم کرتے ہیں۔

```solidity
   /* وہ فنکشنز جو پراکسی کو دراصل اکاؤنٹس کے لیے پراکسی کرنے کی اجازت دیتے ہیں */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

یہ تین ایسے آپریشنز ہیں جن میں عام طور پر پیغام کا براہ راست اس ہستی سے آنا ضروری ہوتا ہے جو ٹوکنز منتقل کر رہی ہو یا الاؤنس منظور کر رہی ہو۔ یہاں ہمارے پاس ان آپریشنز کا ایک پراکسی ورژن ہے جو:

1. `onlyProxy()` کے ذریعے تبدیل کیا گیا ہے تاکہ کسی اور کو انہیں کنٹرول کرنے کی اجازت نہ ہو۔
2. وہ پتہ حاصل کرتا ہے جو عام طور پر ایک اضافی پیرامیٹر کے طور پر `msg.sender` ہوتا ہے۔

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

کال ڈیٹا انٹرپریٹر تقریباً اوپر والے جیسا ہی ہے، سوائے اس کے کہ پراکسیڈ فنکشنز کو ایک `msg.sender` پیرامیٹر ملتا ہے اور `transfer` کے لیے کسی الاؤنس کی ضرورت نہیں ہوتی۔

```solidity
        // ٹرانسفر (الاؤنس کی ضرورت نہیں)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

پچھلے ٹیسٹنگ کوڈ اور اس کوڈ کے درمیان کچھ تبدیلیاں ہیں۔

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ہمیں ERC-20 کانٹریکٹ کو بتانا ہوگا کہ کس پراکسی پر بھروسہ کرنا ہے

```js
console.log("CalldataInterpreter addr:", cdi.address)

// الاؤنسز کی تصدیق کے لیے دو سائنرز کی ضرورت ہے
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` اور `transferFrom()` کو چیک کرنے کے لیے ہمیں ایک دوسرے سائنر کی ضرورت ہے۔ ہم اسے `poorSigner` کہتے ہیں کیونکہ اسے ہمارے کوئی ٹوکن نہیں ملتے (یقیناً اس کے پاس ETH ہونا ضروری ہے)۔

```js
// ٹوکنز ٹرانسفر کریں
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

چونکہ ERC-20 کانٹریکٹ پراکسی (`cdi`) پر بھروسہ کرتا ہے، اس لیے ہمیں ٹرانسفرز کو ریلے (relay) کرنے کے لیے کسی الاؤنس کی ضرورت نہیں ہے۔

```js
// approval اور transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// چیک کریں کہ approve / transferFrom کا کمبو درست طریقے سے کیا گیا تھا
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

دو نئے فنکشنز کی جانچ کریں۔ نوٹ کریں کہ `transferFromTx` کو دو ایڈریس پیرامیٹرز کی ضرورت ہوتی ہے: الاؤنس دینے والا اور وصول کرنے والا۔

## نتیجہ {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) اور [Arbitrum](https://developer.offchainlabs.com/docs/special_features) دونوں L1 پر لکھے جانے والے کال ڈیٹا کے سائز کو کم کرنے اور اس طرح ٹرانزیکشنز کی لاگت کو کم کرنے کے طریقے تلاش کر رہے ہیں۔ تاہم، عام حل تلاش کرنے والے انفراسٹرکچر فراہم کنندگان کے طور پر، ہماری صلاحیتیں محدود ہیں۔ ڈیپ (dapp) ڈیولپر کے طور پر، آپ کے پاس ایپلیکیشن سے متعلق مخصوص علم ہوتا ہے، جو آپ کو اپنے کال ڈیٹا کو اس سے کہیں بہتر طریقے سے بہتر بنانے کی اجازت دیتا ہے جتنا ہم کسی عام حل میں کر سکتے ہیں۔ امید ہے کہ یہ مضمون آپ کو اپنی ضروریات کے لیے مثالی حل تلاش کرنے میں مدد دے گا۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔