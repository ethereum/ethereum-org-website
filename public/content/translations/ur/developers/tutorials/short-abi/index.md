---
title: "کال ڈیٹا کی بہتری کے لیے مختصر ⁦ABIs⁩"
description: "آپٹیمسٹک رول اپس کے لیے سمارٹ کنٹریکٹس کو بہتر بنانا"
author: اوری پومرانٹز
lang: ur
tags: ["لیئر ۲ (l2)"]
skill: intermediate
breadcrumb: "مختصر ⁦ABIs⁩"
published: 2022-04-01
---

## تعارف {#introduction}

اس مضمون میں، آپ [آپٹیمسٹک رول اپس](/developers/docs/scaling/optimistic-rollups)، ان پر ٹرانزیکشنز کی لاگت، اور اس بارے میں جانیں گے کہ لاگت کا یہ مختلف ڈھانچہ ہمیں ایتھیریم مین نیٹ کی نسبت مختلف چیزوں کو بہتر بنانے کا تقاضا کیسے کرتا ہے۔
آپ یہ بھی سیکھیں گے کہ اس بہتری کو کیسے نافذ کیا جائے۔

### مکمل انکشاف {#full-disclosure}

میں [آپٹیمزم](https://www.optimism.io/) کا کل وقتی ملازم ہوں، اس لیے اس مضمون میں دی گئی مثالیں آپٹیمزم پر چلیں گی۔
تاہم، یہاں بیان کی گئی تکنیک دیگر رول اپس کے لیے بھی اتنی ہی اچھی طرح کام کرنی چاہیے۔

### اصطلاحات {#terminology}

رول اپس پر بات کرتے وقت، اصطلاح 'لیئر ۱ (l1)' مین نیٹ، یعنی پروڈکشن ایتھیریم نیٹ ورک کے لیے استعمال ہوتی ہے۔
اصطلاح 'لیئر ۲ (l2)' رول اپ یا کسی دوسرے ایسے سسٹم کے لیے استعمال ہوتی ہے جو سیکیورٹی کے لیے <span dir="ltr">L1</span> پر انحصار کرتا ہے لیکن اپنی زیادہ تر پروسیسنگ آف چین کرتا ہے۔

## ہم <span dir="ltr">L2</span> ٹرانزیکشنز کی لاگت کو مزید کیسے کم کر سکتے ہیں؟ {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[آپٹیمسٹک رول اپس](/developers/docs/scaling/optimistic-rollups) کو ہر تاریخی ٹرانزیکشن کا ریکارڈ محفوظ کرنا ہوتا ہے تاکہ کوئی بھی ان کا جائزہ لے سکے اور تصدیق کر سکے کہ موجودہ حالت درست ہے۔
ایتھیریم مین نیٹ میں ڈیٹا داخل کرنے کا سب سے سستا طریقہ اسے کال ڈیٹا کے طور پر لکھنا ہے۔
یہ حل [آپٹیمزم](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) اور [آربٹرم](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) دونوں نے منتخب کیا تھا۔

### <span dir="ltr">L2</span> ٹرانزیکشنز کی لاگت {#cost-of-l2-transactions}

<span dir="ltr">L2</span> ٹرانزیکشنز کی لاگت دو اجزاء پر مشتمل ہوتی ہے:

1. <span dir="ltr">L2</span> پروسیسنگ، جو عام طور پر انتہائی سستی ہوتی ہے
2. <span dir="ltr">L1</span> اسٹوریج، جو مین نیٹ گیس کی لاگت سے منسلک ہے

جب میں یہ لکھ رہا ہوں، آپٹیمزم پر <span dir="ltr">L2</span> گیس کی لاگت [<span dir="ltr">0.001 Gwei</span>](/developers/docs/gas/#pre-london) ہے۔
دوسری طرف، <span dir="ltr">L1</span> گیس کی لاگت تقریباً <span dir="ltr">40 Gwei</span> ہے۔
[آپ موجودہ قیمتیں یہاں دیکھ سکتے ہیں](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)۔

کال ڈیٹا کے ایک بائٹ کی لاگت یا تو <span dir="ltr">4</span> گیس (اگر یہ صفر ہے) یا <span dir="ltr">16</span> گیس (اگر یہ کوئی اور قدر ہے) ہوتی ہے۔
<span dir="ltr">EVM</span> پر سب سے مہنگے آپریشنز میں سے ایک اسٹوریج میں لکھنا ہے۔
<span dir="ltr">L2</span> پر اسٹوریج میں <span dir="ltr">32-byte</span> کا لفظ لکھنے کی زیادہ سے زیادہ لاگت <span dir="ltr">22,100</span> گیس ہے۔ فی الحال، یہ <span dir="ltr">22.1 Gwei</span> ہے۔
لہذا اگر ہم کال ڈیٹا کا ایک بھی صفر بائٹ بچا سکیں، تو ہم اسٹوریج میں تقریباً <span dir="ltr">200 bytes</span> لکھنے کے قابل ہو جائیں گے اور پھر بھی فائدے میں رہیں گے۔

### <span dir="ltr">ABI</span> {#the-abi}

ٹرانزیکشنز کی اکثریت ایک بیرونی ملکیت والے اکاؤنٹ سے کنٹریکٹ تک رسائی حاصل کرتی ہے۔
زیادہ تر کنٹریکٹس Solidity میں لکھے جاتے ہیں اور [ایپلیکیشن بائنری انٹرفیس (<span dir="ltr">ABI</span>)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) کے مطابق اپنے ڈیٹا فیلڈ کی تشریح کرتے ہیں۔

تاہم، <span dir="ltr">ABI</span> کو <span dir="ltr">L1</span> کے لیے ڈیزائن کیا گیا تھا، جہاں کال ڈیٹا کے ایک بائٹ کی لاگت تقریباً چار ریاضیاتی آپریشنز کے برابر ہوتی ہے، نہ کہ <span dir="ltr">L2</span> کے لیے جہاں کال ڈیٹا کے ایک بائٹ کی لاگت ایک ہزار سے زیادہ ریاضیاتی آپریشنز کے برابر ہوتی ہے۔
کال ڈیٹا کو اس طرح تقسیم کیا گیا ہے:

| سیکشن | لمبائی | بائٹس | ضائع شدہ بائٹس | ضائع شدہ گیس | ضروری بائٹس | ضروری گیس |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| فنکشن سلیکٹر | 4 | 0-3 | 3 | 48 | 1 | 16 |
| صفر | 12 | 4-15 | 12 | 48 | 0 | 0 |
| منزل کا پتہ | 20 | 16-35 | 0 | 0 | 20 | 320 |
| رقم | 32 | 36-67 | 17 | 64 | 15 | 240 |
| کل | 68 | | | 160 | | 576 |

وضاحت:

- **فنکشن سلیکٹر**: کنٹریکٹ میں <span dir="ltr">256</span> سے کم فنکشنز ہیں، اس لیے ہم انہیں ایک ہی بائٹ سے ممتاز کر سکتے ہیں۔
  یہ بائٹس عام طور پر غیر صفر ہوتے ہیں اور اس لیے [ان کی لاگت سولہ گیس ہوتی ہے](https://eips.ethereum.org/EIPS/eip-2028)۔
- **صفر**: یہ بائٹس ہمیشہ صفر ہوتے ہیں کیونکہ بیس بائٹ کے پتے کو رکھنے کے لیے بتیس بائٹ کے لفظ کی ضرورت نہیں ہوتی۔
  صفر رکھنے والے بائٹس کی لاگت چار گیس ہوتی ہے ([یلو پیپر دیکھیں](https://ethereum.github.io/yellowpaper/paper.pdf)، ضمیمہ G،
  صفحہ 27، `G`<sub>`txdatazero`</sub> کی قدر)۔
- **رقم**: اگر ہم فرض کریں کہ اس کنٹریکٹ میں `decimals` اٹھارہ ہے (عام قدر) اور ہم جو ٹوکنز منتقل کریں گے ان کی زیادہ سے زیادہ رقم <span dir="ltr">10<sup>18</sup></span> ہوگی، تو ہمیں زیادہ سے زیادہ رقم <span dir="ltr">10<sup>36</sup></span> ملتی ہے۔
  <span dir="ltr">256<sup>15</sup> &gt; 10<sup>36</sup></span>، اس لیے پندرہ بائٹس کافی ہیں۔

<span dir="ltr">L1</span> پر <span dir="ltr">160</span> گیس کا ضیاع عام طور پر نہ ہونے کے برابر ہے۔ ایک ٹرانزیکشن کی لاگت کم از کم [<span dir="ltr">21,000</span> گیس](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) ہوتی ہے، اس لیے اضافی <span dir="ltr">0.8%</span> سے کوئی فرق نہیں پڑتا۔
تاہم، <span dir="ltr">L2</span> پر، صورتحال مختلف ہے۔ ٹرانزیکشن کی تقریباً پوری لاگت اسے <span dir="ltr">L1</span> پر لکھنے کی ہوتی ہے۔
ٹرانزیکشن کال ڈیٹا کے علاوہ، ٹرانزیکشن ہیڈر (منزل کا پتہ، دستخط، وغیرہ) کے <span dir="ltr">109 bytes</span> ہوتے ہیں۔
لہذا کل لاگت `109*16+576+160=2480` ہے، اور ہم اس کا تقریباً <span dir="ltr">6.5%</span> ضائع کر رہے ہیں۔

## جب منزل پر آپ کا کنٹرول نہ ہو تو لاگت کو کم کرنا {#reducing-costs-when-you-dont-control-the-destination}

یہ فرض کرتے ہوئے کہ منزل کے کنٹریکٹ پر آپ کا کنٹرول نہیں ہے، آپ پھر بھی [اس جیسا](https://github.com/qbzzt/ethereum.org-20220330-shortABI) حل استعمال کر سکتے ہیں۔
آئیے متعلقہ فائلوں کا جائزہ لیتے ہیں۔

### Token.sol {#token-sol}

[یہ منزل کا کنٹریکٹ ہے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)۔ یہ ایک معیاری <span dir="ltr">ERC-20</span> کنٹریکٹ ہے، جس میں ایک اضافی خصوصیت ہے۔
یہ `faucet` فنکشن کسی بھی صارف کو استعمال کرنے کے لیے کچھ ٹوکن حاصل کرنے دیتا ہے۔
یہ پروڈکشن <span dir="ltr">ERC-20</span> کنٹریکٹ کو بیکار بنا دے گا، لیکن جب کوئی <span dir="ltr">ERC-20</span> صرف ٹیسٹنگ کی سہولت کے لیے موجود ہو تو یہ زندگی کو آسان بنا دیتا ہے۔

```solidity
    /**
     * @dev کالر کو کھیلنے کے لیے 1000 ٹوکن دیتا ہے
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[یہ وہ کنٹریکٹ ہے جسے ٹرانزیکشنز کو مختصر کال ڈیٹا کے ساتھ کال کرنا چاہیے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)۔
آئیے اس کا لائن بہ لائن جائزہ لیتے ہیں۔

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

ہمیں ٹوکن فنکشن کی ضرورت ہے تاکہ معلوم ہو سکے کہ اسے کیسے کال کرنا ہے۔

```solidity
کنٹریکٹ CalldataInterpreter {

    OrisUselessToken public immutable token;
```

اس ٹوکن کا پتہ جس کے لیے ہم پراکسی ہیں۔

```solidity

    /**
     * @dev ٹوکن کا پتہ متعین کریں
     * @param tokenAddr_ ERC-20 کنٹریکٹ کا پتہ
     */
    کنسٹرکٹر(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
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

ہم میموری میں ایک <span dir="ltr">32-byte (256-bit)</span> کا لفظ لوڈ کرنے جا رہے ہیں اور ان بائٹس کو ہٹا دیں گے جو ہمارے مطلوبہ فیلڈ کا حصہ نہیں ہیں۔
یہ الگورتھم <span dir="ltr">32 bytes</span> سے لمبی قدروں کے لیے کام نہیں کرتا، اور یقیناً ہم کال ڈیٹا کے اختتام سے آگے نہیں پڑھ سکتے۔
<span dir="ltr">L1</span> پر گیس بچانے کے لیے ان ٹیسٹس کو چھوڑنا ضروری ہو سکتا ہے، لیکن <span dir="ltr">L2</span> پر گیس انتہائی سستی ہے، جو ہمیں ہر قسم کے ضروری چیکس شامل کرنے کے قابل بناتی ہے۔

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

ہم `fallback()` کی کال سے ڈیٹا کاپی کر سکتے تھے (نیچے دیکھیں)، لیکن <span dir="ltr">EVM</span> کی اسمبلی زبان، [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) کا استعمال کرنا زیادہ آسان ہے۔

یہاں ہم اسٹیک میں بائٹس `startByte` سے `startByte+31` تک پڑھنے کے لیے [CALLDATALOAD آپ کوڈ](https://www.evm.codes/#35) استعمال کرتے ہیں۔
عام طور پر، Yul میں آپ کوڈ کا سنٹیکس `<opcode name>(<first stack value, if any>,<second stack value, if any>...)` ہوتا ہے۔

```solidity

        _retVal = _retVal >> (256-length*8);
```

صرف سب سے اہم `length` بائٹس فیلڈ کا حصہ ہیں، اس لیے ہم دیگر قدروں سے چھٹکارا پانے کے لیے [رائٹ شفٹ](https://en.wikipedia.org/wiki/Logical_shift) کرتے ہیں۔
اس کا ایک اضافی فائدہ یہ ہے کہ قدر فیلڈ کے دائیں طرف منتقل ہو جاتی ہے، اس لیے یہ قدر بذات خود ہوتی ہے نہ کہ قدر ضرب <span dir="ltr">256<sup>something</sup></span>۔

```solidity

        return _retVal;
    }


    fallback() external {
```

جب کسی Solidity کنٹریکٹ کی کال کسی بھی فنکشن کے دستخطوں سے میل نہیں کھاتی، تو یہ [`fallback()` فنکشن](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) کو کال کرتی ہے (یہ فرض کرتے ہوئے کہ وہاں ایک موجود ہے)۔
`CalldataInterpreter` کے معاملے میں، _کوئی بھی_ کال یہاں آتی ہے کیونکہ کوئی اور `external` یا `public` فنکشنز نہیں ہیں۔

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

کال ڈیٹا کا پہلا بائٹ پڑھیں، جو ہمیں فنکشن بتاتا ہے۔
یہاں کسی فنکشن کے دستیاب نہ ہونے کی دو وجوہات ہیں:

1. وہ فنکشنز جو `pure` یا `view` ہیں، حالت کو تبدیل نہیں کرتے اور ان پر گیس خرچ نہیں ہوتی (جب آف چین کال کیا جائے)۔
   ان کی گیس کی لاگت کو کم کرنے کی کوشش کرنے کا کوئی فائدہ نہیں ہے۔
2. وہ فنکشنز جو [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) پر انحصار کرتے ہیں۔
   `msg.sender` کی قدر `CalldataInterpreter` کا پتہ ہوگی، نہ کہ کال کرنے والے کا۔

بدقسمتی سے، [<span dir="ltr">ERC-20</span> کی خصوصیات کو دیکھتے ہوئے](https://eips.ethereum.org/EIPS/eip-20)، اس سے صرف ایک فنکشن، `transfer` بچتا ہے۔
اس سے ہمارے پاس صرف دو فنکشنز بچتے ہیں: `transfer` (کیونکہ ہم `transferFrom` کو کال کر سکتے ہیں) اور `faucet` (کیونکہ ہم ٹوکنز واپس اسی کو منتقل کر سکتے ہیں جس نے ہمیں کال کیا تھا)۔

```solidity

        // ٹوکن کے حالت تبدیل کرنے والے میتھڈز کو استعمال کرتے ہوئے کال کریں
        // کال ڈیٹا سے معلومات

        // faucet
        if (_func == 1) {
```

`faucet()` کو ایک کال، جس میں پیرامیٹرز نہیں ہیں۔

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

جب ہم `token.faucet()` کو کال کرتے ہیں تو ہمیں ٹوکنز ملتے ہیں۔ تاہم، پراکسی کنٹریکٹ کے طور پر، ہمیں ٹوکنز کی **ضرورت** نہیں ہے۔
<span dir="ltr">EOA</span> (بیرونی ملکیت والا اکاؤنٹ) یا کنٹریکٹ جس نے ہمیں کال کیا ہے، اسے ضرورت ہوتی ہے۔
اس لیے ہم اپنے تمام ٹوکنز اسی کو منتقل کر دیتے ہیں جس نے ہمیں کال کیا تھا۔

```solidity
        // منتقلی (فرض کریں کہ ہمارے پاس اس کے لیے الاؤنس ہے)
        if (_func == 2) {
```

ٹوکنز منتقل کرنے کے لیے دو پیرامیٹرز کی ضرورت ہوتی ہے: منزل کا پتہ اور رقم۔

```solidity
            token.transferFrom(
                msg.sender,
```

ہم کال کرنے والوں کو صرف وہی ٹوکنز منتقل کرنے کی اجازت دیتے ہیں جن کے وہ مالک ہیں۔

```solidity
                address(uint160(calldataVal(1, 20))),
```

منزل کا پتہ بائٹ #1 سے شروع ہوتا ہے (بائٹ #0 فنکشن ہے)۔
ایک پتے کے طور پر، یہ <span dir="ltr">20-bytes</span> لمبا ہوتا ہے۔

```solidity
                calldataVal(21, 2)
```

اس مخصوص کنٹریکٹ کے لیے ہم فرض کرتے ہیں کہ ٹوکنز کی زیادہ سے زیادہ تعداد جسے کوئی بھی منتقل کرنا چاہے گا، وہ دو بائٹس میں سما سکتی ہے (<span dir="ltr">65536</span> سے کم)۔

```solidity
            );
        }
```

مجموعی طور پر، ایک منتقلی میں کال ڈیٹا کے <span dir="ltr">35 bytes</span> لگتے ہیں:

| سیکشن | لمبائی | بائٹس |
| ------------------- | -----: | ----: |
| فنکشن سلیکٹر | 1 | 0 |
| منزل کا پتہ | 32 | 1-32 |
| رقم | 2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[یہ JavaScript یونٹ ٹیسٹ](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ہمیں دکھاتا ہے کہ اس طریقہ کار کو کیسے استعمال کیا جائے (اور یہ کیسے تصدیق کی جائے کہ یہ صحیح طریقے سے کام کرتا ہے)۔
میں یہ فرض کرنے جا رہا ہوں کہ آپ [chai](https://www.chaijs.com/) اور [ethers](https://docs.ethers.io/v5/) کو سمجھتے ہیں اور صرف ان حصوں کی وضاحت کروں گا جو خاص طور پر کنٹریکٹ پر لاگو ہوتے ہیں۔

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

ہم دونوں کنٹریکٹس کو ڈیپلائے کر کے شروعات کرتے ہیں۔

```javascript
    // کھیلنے کے لیے ٹوکن حاصل کریں
    const faucetTx = {
```

ہم ٹرانزیکشنز بنانے کے لیے وہ اعلیٰ سطحی فنکشنز استعمال نہیں کر سکتے جو ہم عام طور پر استعمال کرتے ہیں (جیسے `token.faucet()`)، کیونکہ ہم <span dir="ltr">ABI</span> کی پیروی نہیں کرتے۔
اس کے بجائے، ہمیں ٹرانزیکشن خود بنانی ہوگی اور پھر اسے بھیجنا ہوگا۔

```javascript
      to: cdi.address,
      data: "0x01"
```

ٹرانزیکشن کے لیے ہمیں دو پیرامیٹرز فراہم کرنے کی ضرورت ہے:

1. `to`، منزل کا پتہ۔
   یہ کال ڈیٹا انٹرپریٹر کنٹریکٹ ہے۔
2. `data`، بھیجنے کے لیے کال ڈیٹا۔
   فوسٹ کال کی صورت میں، ڈیٹا ایک ہی بائٹ، `0x01` ہوتا ہے۔

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

ہم [سائنر کے `sendTransaction` طریقہ کار](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) کو کال کرتے ہیں کیونکہ ہم نے پہلے ہی منزل (`faucetTx.to`) بتا دی ہے اور ہمیں ٹرانزیکشن پر دستخط کرنے کی ضرورت ہے۔

```javascript
// چیک کریں کہ faucet ٹوکن درست طریقے سے فراہم کرتا ہے
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

یہاں ہم بیلنس کی تصدیق کرتے ہیں۔
`view` فنکشنز پر گیس بچانے کی کوئی ضرورت نہیں ہے، اس لیے ہم انہیں بس عام طریقے سے چلاتے ہیں۔

```javascript
// CDI کو الاؤنس دیں (منظوریوں کو پراکسی نہیں کیا جا سکتا)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

کال ڈیٹا انٹرپریٹر کو منتقلی کرنے کے قابل ہونے کے لیے ایک الاؤنس دیں۔

```javascript
// ٹوکن کی منتقلی
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

منتقلی کی ٹرانزیکشن بنائیں۔ پہلا بائٹ "<span dir="ltr">0x02</span>" ہے، اس کے بعد منزل کا پتہ، اور آخر میں رقم (<span dir="ltr">0x0100</span>، جو اعشاریہ میں <span dir="ltr">256</span> ہے)۔

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // چیک کریں کہ ہمارے پاس 256 ٹوکن کم ہیں
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // اور یہ کہ ہماری منزل کو وہ مل گئے ہیں
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## جب منزل کے کنٹریکٹ پر آپ کا کنٹرول ہو تو لاگت کو کم کرنا {#reducing-the-cost-when-you-do-control-the-destination-contract}

اگر منزل کے کنٹریکٹ پر آپ کا کنٹرول ہے تو آپ ایسے فنکشنز بنا سکتے ہیں جو `msg.sender` چیکس کو نظر انداز کر دیں کیونکہ وہ کال ڈیٹا انٹرپریٹر پر بھروسہ کرتے ہیں۔
[آپ یہاں `control-contract` برانچ میں اس کی ایک مثال دیکھ سکتے ہیں کہ یہ کیسے کام کرتا ہے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)۔

اگر کنٹریکٹ صرف بیرونی ٹرانزیکشنز کا جواب دے رہا ہوتا، تو ہم صرف ایک کنٹریکٹ رکھ کر کام چلا سکتے تھے۔
تاہم، اس سے [ترکیب پذیری](/developers/docs/smart-contracts/composability/) ٹوٹ جائے گی۔
یہ بہت بہتر ہے کہ ایک ایسا کنٹریکٹ ہو جو عام <span dir="ltr">ERC-20</span> کالز کا جواب دے، اور دوسرا کنٹریکٹ جو مختصر کال ڈیٹا والی ٹرانزیکشنز کا جواب دے۔

### Token.sol {#token-sol-2}

اس مثال میں ہم `Token.sol` میں ترمیم کر سکتے ہیں۔
یہ ہمیں ایسے کئی فنکشنز رکھنے کی سہولت دیتا ہے جنہیں صرف پراکسی ہی کال کر سکتی ہے۔
یہاں نئے حصے ہیں:

```solidity
    // واحد پتہ جسے CalldataInterpreter کا پتہ متعین کرنے کی اجازت ہے
    address owner;

    // CalldataInterpreter کا پتہ
    address proxy = address(0);
```

<span dir="ltr">ERC-20</span> کنٹریکٹ کو مجاز پراکسی کی شناخت جاننے کی ضرورت ہوتی ہے۔
تاہم، ہم اس متغیر کو کنسٹرکٹر میں سیٹ نہیں کر سکتے، کیونکہ ہم ابھی تک اس کی قدر نہیں جانتے۔
یہ کنٹریکٹ پہلے شروع کیا جاتا ہے کیونکہ پراکسی اپنے کنسٹرکٹر میں ٹوکن کے پتے کی توقع کرتی ہے۔

```solidity
    /**
     * @dev ERC20 کنسٹرکٹر کو کال کرتا ہے۔
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

بنانے والے کا پتہ (جسے `owner` کہا جاتا ہے) یہاں محفوظ کیا جاتا ہے کیونکہ یہی واحد پتہ ہے جسے پراکسی سیٹ کرنے کی اجازت ہے۔

```solidity
    /**
     * @dev پراکسی (CalldataInterpreter) کے لیے پتہ سیٹ کریں۔
     * مالک کی طرف سے صرف ایک بار کال کیا جا سکتا ہے
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

پراکسی کو مراعات یافتہ رسائی حاصل ہے، کیونکہ یہ سیکیورٹی چیکس کو نظر انداز کر سکتی ہے۔
یہ یقینی بنانے کے لیے کہ ہم پراکسی پر بھروسہ کر سکتے ہیں، ہم صرف `owner` کو اس فنکشن کو کال کرنے دیتے ہیں، اور وہ بھی صرف ایک بار۔
ایک بار جب `proxy` کی کوئی حقیقی قدر (صفر نہیں) ہو جاتی ہے، تو وہ قدر تبدیل نہیں ہو سکتی، اس لیے اگر مالک دھوکہ دینے کا فیصلہ بھی کر لے، یا اس کا یادداشت کا جملہ (mnemonic) ظاہر ہو جائے، تب بھی ہم محفوظ رہتے ہیں۔

```solidity
    /**
     * @dev کچھ فنکشنز کو صرف پراکسی کے ذریعے کال کیا جا سکتا ہے۔
     */
    modifier onlyProxy {
```

یہ ایک [`modifier` فنکشن](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) ہے، یہ دوسرے فنکشنز کے کام کرنے کے طریقے کو تبدیل کرتا ہے۔

```solidity
      require(msg.sender == proxy);
```

سب سے پہلے، تصدیق کریں کہ ہمیں پراکسی نے کال کیا ہے اور کسی اور نے نہیں۔
اگر نہیں، تو `revert`۔

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

یہ تین ایسے آپریشنز ہیں جن میں عام طور پر یہ تقاضا ہوتا ہے کہ پیغام براہ راست اس ہستی کی طرف سے آئے جو ٹوکنز منتقل کر رہی ہو یا الاؤنس منظور کر رہی ہو۔
یہاں ہمارے پاس ان آپریشنز کا ایک پراکسی ورژن ہے جو:

1. `onlyProxy()` کے ذریعے تبدیل کیا گیا ہے تاکہ کسی اور کو انہیں کنٹرول کرنے کی اجازت نہ ہو۔
2. وہ پتہ حاصل کرتا ہے جو عام طور پر ایک اضافی پیرامیٹر کے طور پر `msg.sender` ہوتا ہے۔

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

کال ڈیٹا انٹرپریٹر تقریباً اوپر والے جیسا ہی ہے، سوائے اس کے کہ پراکسی کیے گئے فنکشنز کو ایک `msg.sender` پیرامیٹر ملتا ہے اور `transfer` کے لیے کسی الاؤنس کی ضرورت نہیں ہوتی۔

```solidity
        // منتقلی (الاؤنس کی ضرورت نہیں)
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

ہمیں <span dir="ltr">ERC-20</span> کنٹریکٹ کو بتانا ہوگا کہ کس پراکسی پر بھروسہ کرنا ہے۔

```js
console.log("CalldataInterpreter addr:", cdi.address)

// الاؤنسز کی تصدیق کے لیے دو دستخط کنندگان کی ضرورت ہے
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` اور `transferFrom()` کو چیک کرنے کے لیے ہمیں ایک دوسرے سائنر کی ضرورت ہے۔
ہم اسے `poorSigner` کہتے ہیں کیونکہ اسے ہمارے کوئی ٹوکنز نہیں ملتے (یقیناً اس کے پاس ETH ہونا ضروری ہے)۔

```js
// ٹوکن کی منتقلی
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

چونکہ <span dir="ltr">ERC-20</span> کنٹریکٹ پراکسی (`cdi`) پر بھروسہ کرتا ہے، اس لیے ہمیں منتقلی کو آگے بھیجنے کے لیے کسی الاؤنس کی ضرورت نہیں ہے۔

```js
// منظوری اور transferFrom
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

// چیک کریں کہ approve / transferFrom کومبو درست طریقے سے کیا گیا تھا
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

دو نئے فنکشنز کی جانچ کریں۔
نوٹ کریں کہ `transferFromTx` کو دو پتے کے پیرامیٹرز کی ضرورت ہوتی ہے: الاؤنس دینے والا اور وصول کرنے والا۔

## نتیجہ {#conclusion}

[آپٹیمزم](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) اور [آربٹرم](https://developer.offchainlabs.com/docs/special_features) دونوں <span dir="ltr">L1</span> پر لکھے گئے کال ڈیٹا کے سائز کو کم کرنے اور اس طرح ٹرانزیکشنز کی لاگت کو کم کرنے کے طریقے تلاش کر رہے ہیں۔
تاہم، عام حل تلاش کرنے والے انفراسٹرکچر فراہم کنندگان کے طور پر، ہماری صلاحیتیں محدود ہیں۔
غیر مرکزی ایپلی کیشن (dapp) کے ڈویلپر کے طور پر، آپ کے پاس ایپلی کیشن سے متعلق مخصوص علم ہوتا ہے، جو آپ کو اپنے کال ڈیٹا کو اس سے کہیں بہتر طریقے سے بہتر بنانے کی سہولت دیتا ہے جتنا ہم کسی عام حل میں کر سکتے ہیں۔
امید ہے کہ یہ مضمون آپ کو اپنی ضروریات کے لیے مثالی حل تلاش کرنے میں مدد کرے گا۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔