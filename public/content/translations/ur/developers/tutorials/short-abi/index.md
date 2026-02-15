---
title: "کال ڈیٹا آپٹمائزیشن کے لیے مختصر ABIs"
description: "آپٹیمسٹک رول اپس کے لیے اسمارٹ کنٹریکٹس کو آپٹمائز کرنا"
author: Ori Pomerantz
lang: ur-in
tags: [ "لیئر 2" ]
skill: intermediate
published: 2022-04-01
---

## تعارف {#introduction}

اس مضمون میں، آپ [optimistic rollups](/developers/docs/scaling/optimistic-rollups)، ان پر ٹرانزیکشنز کی لاگت، اور اس بارے میں جانیں گے کہ کس طرح یہ مختلف لاگت کا ڈھانچہ ہمیں Ethereum Mainnet کے مقابلے میں مختلف چیزوں کے لیے آپٹمائز کرنے کا تقاضا کرتا ہے۔
آپ یہ بھی سیکھیں گے کہ اس آپٹمائزیشن کو کیسے نافذ کیا جائے۔

### مکمل انکشاف {#full-disclosure}

میں [Optimism](https://www.optimism.io/) کا کل وقتی ملازم ہوں، اس لیے اس مضمون میں مثالیں Optimism پر چلیں گی۔
تاہم، یہاں بیان کردہ تکنیک دیگر رول اپس کے لیے بھی اتنی ہی اچھی طرح کام کرنی چاہیے۔

### اصطلاحات {#terminology}

رول اپس پر بحث کرتے وقت، 'لیئر 1' (L1) کی اصطلاح Mainnet، یعنی پروڈکشن Ethereum نیٹ ورک کے لیے استعمال ہوتی ہے۔
'لیئر 2' (L2) کی اصطلاح رول اپ یا کسی دوسرے ایسے سسٹم کے لیے استعمال ہوتی ہے جو سیکیورٹی کے لیے L1 پر انحصار کرتا ہے لیکن اپنی زیادہ تر پروسیسنگ آف چین کرتا ہے۔

## ہم L2 ٹرانزیکشنز کی لاگت کو مزید کیسے کم کر سکتے ہیں؟ {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[آپٹیمسٹک رول اپس](/developers/docs/scaling/optimistic-rollups) کو ہر تاریخی ٹرانزیکشن کا ریکارڈ محفوظ رکھنا ہوتا ہے تاکہ کوئی بھی ان کا جائزہ لے سکے اور اس بات کی تصدیق کر سکے کہ موجودہ اسٹیٹ درست ہے۔
Ethereum Mainnet میں ڈیٹا داخل کرنے کا سب سے سستا طریقہ اسے کال ڈیٹا کے طور پر لکھنا ہے۔
یہ حل [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) اور [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) دونوں نے منتخب کیا تھا۔

### L2 ٹرانزیکشنز کی لاگت {#cost-of-l2-transactions}

L2 ٹرانزیکشنز کی لاگت دو اجزاء پر مشتمل ہے:

1. L2 پروسیسنگ، جو عام طور پر انتہائی سستی ہوتی ہے
2. L1 اسٹوریج، جو Mainnet گیس کی لاگت سے منسلک ہے

جب میں یہ لکھ رہا ہوں، Optimism پر L2 گیس کی لاگت 0.001 [Gwei](/developers/docs/gas/#pre-london) ہے۔
دوسری طرف، L1 گیس کی لاگت تقریباً 40 gwei ہے۔
[آپ موجودہ قیمتیں یہاں دیکھ سکتے ہیں](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)۔

کال ڈیٹا کے ایک بائٹ کی لاگت یا تو 4 گیس ہے (اگر یہ صفر ہے) یا 16 گیس ہے (اگر یہ کوئی اور قدر ہے)۔
EVM پر سب سے مہنگے آپریشنز میں سے ایک اسٹوریج میں لکھنا ہے۔
L2 پر اسٹوریج میں 32 بائٹ کا ورڈ لکھنے کی زیادہ سے زیادہ لاگت 22100 گیس ہے۔ فی الحال، یہ 22.1 gwei ہے۔
لہذا اگر ہم کال ڈیٹا کا ایک صفر بائٹ بچا سکتے ہیں، تو ہم اسٹوریج میں تقریباً 200 بائٹ لکھ سکیں گے اور پھر بھی فائدے میں رہیں گے۔

### ABI {#the-abi}

ٹرانزیکشنز کی بڑی اکثریت ایک بیرونی ملکیت والے اکاؤنٹ سے ایک کنٹریکٹ تک رسائی حاصل کرتی ہے۔
زیادہ تر کنٹریکٹس Solidity میں لکھے جاتے ہیں اور اپنے ڈیٹا فیلڈ کی تشریح [ایپلیکیشن بائنری انٹرفیس (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) کے مطابق کرتے ہیں۔

تاہم، ABI کو L1 کے لیے ڈیزائن کیا گیا تھا، جہاں کال ڈیٹا کے ایک بائٹ کی لاگت تقریباً چار ریاضیاتی آپریشنز کے برابر ہے، نہ کہ L2 کے لیے جہاں کال ڈیٹا کے ایک بائٹ کی لاگت ایک ہزار سے زیادہ ریاضیاتی آپریشنز کے برابر ہے۔
کال ڈیٹا کو اس طرح تقسیم کیا گیا ہے:

| سیکشن        | لمبائی | بائٹس | ضائع شدہ بائٹس | ضائع شدہ گیس | ضروری بائٹس | ضروری گیس |
| ------------ | -----: | ----: | -------------: | -----------: | ----------: | --------: |
| فنکشن سلیکٹر |      4 |   0-3 |              3 |           48 |           1 |        16 |
| صفر          |     12 |  4-15 |             12 |           48 |           0 |         0 |
| منزل کا پتہ  |     20 | 16-35 |              0 |            0 |          20 |       320 |
| رقم          |     32 | 36-67 |             17 |           64 |          15 |       240 |
| کل           |     68 |       |                |          160 |             |       576 |

وضاحت:

- **فنکشن سلیکٹر**: کنٹریکٹ میں 256 سے کم فنکشنز ہیں، اس لیے ہم ایک بائٹ سے ان میں فرق کر سکتے ہیں۔
  یہ بائٹس عام طور پر غیر صفر ہوتے ہیں اور اس لیے ان کی [لاگت سولہ گیس](https://eips.ethereum.org/EIPS/eip-2028) ہوتی ہے۔
- **صفر**: یہ بائٹس ہمیشہ صفر ہوتے ہیں کیونکہ بیس بائٹ کے پتے کو رکھنے کے لیے بتیس بائٹ کے ورڈ کی ضرورت نہیں ہوتی۔
  صفر رکھنے والے بائٹس کی لاگت چار گیس ہوتی ہے ([یلو پیپر دیکھیں](https://ethereum.github.io/yellowpaper/paper.pdf)، ضمیمہ G،
  صفحہ 27، `G`<sub>`txdatazero`</sub> کی قدر)۔
- **رقم**: اگر ہم فرض کریں کہ اس کنٹریکٹ میں `decimals` اٹھارہ (عام قدر) ہے اور ٹوکنز کی زیادہ سے زیادہ رقم جو ہم منتقل کریں گے 10<sup>18</sup> ہوگی، تو ہمیں 10<sup>36</sup> کی زیادہ سے زیادہ رقم ملتی ہے۔
  256<sup>15</sup> &gt; 10<sup>36</sup>، اس لیے پندرہ بائٹس کافی ہیں۔

L1 پر 160 گیس کا ضیاع عام طور پر نہ ہونے کے برابر ہے۔ ایک ٹرانزیکشن کی لاگت کم از کم [21,000 گیس](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed) ہوتی ہے، اس لیے اضافی 0.8% سے کوئی فرق نہیں پڑتا۔
تاہم، L2 پر، چیزیں مختلف ہیں۔ ٹرانزیکشن کی تقریباً پوری لاگت اسے L1 پر لکھنا ہے۔
ٹرانزیکشن کال ڈیٹا کے علاوہ، ٹرانزیکشن ہیڈر کے 109 بائٹس ہوتے ہیں (منزل کا پتہ، دستخط، وغیرہ)۔
اس لیے کل لاگت `109*16+576+160=2480` ہے، اور ہم اس کا تقریباً 6.5% ضائع کر رہے ہیں۔

## لاگت کم کرنا جب آپ منزل کو کنٹرول نہیں کرتے {#reducing-costs-when-you-dont-control-the-destination}

یہ فرض کرتے ہوئے کہ آپ کا منزل کے کنٹریکٹ پر کوئی کنٹرول نہیں ہے، آپ پھر بھی [اس والے](https://github.com/qbzzt/ethereum.org-20220330-shortABI) جیسا حل استعمال کر سکتے ہیں۔
آئیے متعلقہ فائلوں کا جائزہ لیں۔

### Token.sol {#token-sol}

[یہ منزل کا کنٹریکٹ ہے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)۔
یہ ایک معیاری ERC-20 کنٹریکٹ ہے، جس میں ایک اضافی خصوصیت ہے۔
یہ `faucet` فنکشن کسی بھی صارف کو استعمال کرنے کے لیے کچھ ٹوکن حاصل کرنے دیتا ہے۔
یہ ایک پروڈکشن ERC-20 کنٹریکٹ کو بیکار بنا دے گا، لیکن یہ زندگی کو آسان بنا دیتا ہے جب ایک ERC-20 صرف ٹیسٹنگ کی سہولت کے لیے موجود ہو۔

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[یہ وہ کنٹریکٹ ہے جسے ٹرانزیکشنز کو مختصر کال ڈیٹا کے ساتھ کال کرنا چاہیے](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)۔
آئیے اس کا لائن بہ لائن جائزہ لیں۔

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

ہمیں ٹوکن فنکشن کی ضرورت ہے تاکہ یہ جان سکیں کہ اسے کیسے کال کرنا ہے۔

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

اس ٹوکن کا پتہ جس کے لیے ہم پراکسی ہیں۔

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

ٹوکن کا پتہ ہی واحد پیرامیٹر ہے جسے ہمیں متعین کرنے کی ضرورت ہے۔

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

ہم میموری میں ایک 32-بائٹ (256-بٹ) ورڈ لوڈ کرنے جا رہے ہیں اور ان بائٹس کو ہٹانے جا رہے ہیں جو اس فیلڈ کا حصہ نہیں ہیں جسے ہم چاہتے ہیں۔
یہ الگورتھم 32 بائٹس سے لمبی قدروں کے لیے کام نہیں کرتا، اور یقیناً ہم کال ڈیٹا کے آخر سے آگے نہیں پڑھ سکتے۔
L1 پر گیس بچانے کے لیے ان ٹیسٹوں کو چھوڑنا ضروری ہو سکتا ہے، لیکن L2 پر گیس انتہائی سستی ہے، جو ہمارے ذہن میں آنے والے کسی بھی قسم کے سیفٹی چیکس کو ممکن بناتی ہے۔

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

ہم `fallback()` (نیچے دیکھیں) کی کال سے ڈیٹا کاپی کر سکتے تھے، لیکن [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) کا استعمال کرنا آسان ہے، جو EVM کی اسمبلی لینگویج ہے۔

یہاں ہم [CALLDATALOAD opcode](https://www.evm.codes/#35) کا استعمال کرتے ہیں تاکہ بائٹس `startByte` سے `startByte+31` کو اسٹیک میں پڑھ سکیں۔
عام طور پر، Yul میں ایک opcode کا نحو یہ ہے `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`

```solidity

        _retVal = _retVal >> (256-length*8);
```

صرف سب سے اہم `length` بائٹس فیلڈ کا حصہ ہیں، اس لیے ہم دوسری قدروں سے چھٹکارا پانے کے لیے [رائٹ-شفٹ](https://en.wikipedia.org/wiki/Logical_shift) کرتے ہیں۔
اس کا اضافی فائدہ یہ ہے کہ یہ قدر کو فیلڈ کے دائیں طرف منتقل کر دیتا ہے، لہذا یہ خود قدر ہے بجائے اس کے کہ قدر کو 256<sup>کچھ</sup> سے ضرب دیا جائے۔

```solidity

        return _retVal;
    }


    fallback() external {
```

جب ایک Solidity کنٹریکٹ کو کی گئی کال کسی بھی فنکشن کے دستخط سے مماثل نہیں ہوتی ہے، تو یہ [the `fallback()` function](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) کو کال کرتی ہے (یہ فرض کرتے ہوئے کہ کوئی موجود ہے)۔
`CalldataInterpreter` کے معاملے میں، _کوئی بھی_ کال یہاں پہنچتی ہے کیونکہ کوئی دوسرا `external` یا `public` فنکشن نہیں ہے۔

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

کال ڈیٹا کا پہلا بائٹ پڑھیں، جو ہمیں فنکشن بتاتا ہے۔
دو وجوہات ہیں کہ کوئی فنکشن یہاں دستیاب کیوں نہیں ہوگا:

1. جو فنکشنز `pure` یا `view` ہیں وہ اسٹیٹ کو تبدیل نہیں کرتے اور گیس کی لاگت نہیں اٹھاتے (جب آف چین کال کیا جاتا ہے)۔
   ان کی گیس کی لاگت کو کم کرنے کی کوشش کرنا کوئی معنی نہیں رکھتا۔
2. وہ فنکشنز جو [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) پر انحصار کرتے ہیں۔
   `msg.sender` کی قدر `CalldataInterpreter` کا پتہ ہوگی، کالر کا نہیں۔

بدقسمتی سے، [looking at the ERC-20 specifications](https://eips.ethereum.org/EIPS/eip-20) کو دیکھنے پر، یہ صرف ایک فنکشن، `transfer` چھوڑتا ہے۔
یہ ہمارے پاس صرف دو فنکشنز چھوڑتا ہے: `transfer` (کیونکہ ہم `transferFrom` کو کال کر سکتے ہیں) اور `faucet` (کیونکہ ہم ٹوکنز کو واپس اسی کو منتقل کر سکتے ہیں جس نے ہمیں کال کیا)۔

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

`faucet()` کو ایک کال، جس میں پیرامیٹرز نہیں ہوتے۔

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

جب ہم `token.faucet()` کو کال کرتے ہیں تو ہمیں ٹوکن ملتے ہیں۔ تاہم، پراکسی کنٹریکٹ کے طور پر، ہمیں ٹوکنز کی **ضرورت** نہیں ہے۔
EOA (بیرونی ملکیت والا اکاؤنٹ) یا وہ کنٹریکٹ جس نے ہمیں کال کیا تھا اسے ضرورت ہے۔
لہذا ہم اپنے تمام ٹوکنز اس کو منتقل کر دیتے ہیں جس نے ہمیں کال کیا تھا۔

```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```

ٹوکنز کی منتقلی کے لیے دو پیرامیٹرز کی ضرورت ہوتی ہے: منزل کا پتہ اور رقم۔

```solidity
            token.transferFrom(
                msg.sender,
```

ہم صرف کال کرنے والوں کو اپنے ملکیت والے ٹوکن منتقل کرنے کی اجازت دیتے ہیں

```solidity
                address(uint160(calldataVal(1, 20))),
```

منزل کا پتہ بائٹ #1 سے شروع ہوتا ہے (بائٹ #0 فنکشن ہے)۔
ایک پتے کے طور پر، یہ 20-بائٹس لمبا ہے۔

```solidity
                calldataVal(21, 2)
```

اس خاص کنٹریکٹ کے لیے ہم فرض کرتے ہیں کہ کوئی بھی شخص جو زیادہ سے زیادہ ٹوکن منتقل کرنا چاہے گا وہ دو بائٹس (65536 سے کم) میں فٹ ہو جائے گا۔

```solidity
            );
        }
```

مجموعی طور پر، ایک منتقلی میں کال ڈیٹا کے 35 بائٹس لگتے ہیں:

| سیکشن        | لمبائی | بائٹس |
| ------------ | -----: | ----: |
| فنکشن سلیکٹر |      1 |     0 |
| منزل کا پتہ  |     32 |  1-32 |
| رقم          |      2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[یہ JavaScript یونٹ ٹیسٹ](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) ہمیں دکھاتا ہے کہ اس میکانزم کا استعمال کیسے کریں (اور اس کی تصدیق کیسے کریں کہ یہ صحیح طریقے سے کام کرتا ہے)۔
میں یہ فرض کر رہا ہوں کہ آپ [chai](https://www.chaijs.com/) اور [ethers](https://docs.ethers.io/v5/) کو سمجھتے ہیں اور صرف ان حصوں کی وضاحت کروں گا جو خاص طور پر کنٹریکٹ پر لاگو ہوتے ہیں۔

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

ہم دونوں کنٹریکٹس کو تعینات کرکے شروع کرتے ہیں۔

```javascript
    // Get tokens to play with
    const faucetTx = {
```

ہم ٹرانزیکشنز بنانے کے لیے عام طور پر استعمال ہونے والے اعلیٰ سطحی فنکشنز (جیسے `token.faucet()`) کا استعمال نہیں کر سکتے، کیونکہ ہم ABI کی پیروی نہیں کرتے۔
اس کے بجائے، ہمیں خود ٹرانزیکشن بنانا ہوگا اور پھر اسے بھیجنا ہوگا۔

```javascript
      to: cdi.address,
      data: "0x01"
```

ٹرانزیکشن کے لیے ہمیں دو پیرامیٹرز فراہم کرنے کی ضرورت ہے:

1. `to`، منزل کا پتہ۔
   یہ کال ڈیٹا انٹرپریٹر کنٹریکٹ ہے۔
2. `data`، بھیجنے کے لیے کال ڈیٹا۔
   faucet کال کی صورت میں، ڈیٹا ایک بائٹ، `0x01` ہے۔

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

ہم [the signer's `sendTransaction` method](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) کو کال کرتے ہیں کیونکہ ہم نے پہلے ہی منزل (`faucetTx.to`) کی وضاحت کر دی ہے اور ہمیں ٹرانزیکشن پر دستخط کرنے کی ضرورت ہے۔

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

یہاں ہم بیلنس کی تصدیق کرتے ہیں۔
`view` فنکشنز پر گیس بچانے کی ضرورت نہیں ہے، لہذا ہم انہیں عام طور پر چلاتے ہیں۔

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

منتقلی کرنے کے قابل ہونے کے لیے کال ڈیٹا انٹرپریٹر کو ایک الاؤنس دیں۔

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

ایک منتقلی کا ٹرانزیکشن بنائیں۔ پہلا بائٹ "0x02" ہے، اس کے بعد منزل کا پتہ، اور آخر میں رقم (0x0100، جو ڈیسیمل میں 256 ہے)۔

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## لاگت کو کم کرنا جب آپ منزل کے کنٹریکٹ کو کنٹرول کرتے ہیں {#reducing-the-cost-when-you-do-control-the-destination-contract}

اگر آپ کا منزل کے کنٹریکٹ پر کنٹرول ہے تو آپ ایسے فنکشنز بنا سکتے ہیں جو `msg.sender` چیکس کو بائی پاس کرتے ہیں کیونکہ وہ کال ڈیٹا انٹرپریٹر پر بھروسہ کرتے ہیں۔
[آپ یہاں اس کی ایک مثال دیکھ سکتے ہیں کہ یہ کیسے کام کرتا ہے، `control-contract` برانچ میں](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)۔

اگر کنٹریکٹ صرف بیرونی ٹرانزیکشنز کا جواب دے رہا ہوتا، تو ہم صرف ایک کنٹریکٹ کے ساتھ کام چلا سکتے تھے۔
تاہم، اس سے [composability](/developers/docs/smart-contracts/composability/) ٹوٹ جائے گی۔
ایک ایسا کنٹریکٹ رکھنا بہت بہتر ہے جو عام ERC-20 کالز کا جواب دے، اور دوسرا کنٹریکٹ جو مختصر کال ڈیٹا والے ٹرانزیکشنز کا جواب دے۔

### Token.sol {#token-sol-2}

اس مثال میں ہم `Token.sol` میں ترمیم کر سکتے ہیں۔
یہ ہمیں کئی ایسے فنکشنز رکھنے کی اجازت دیتا ہے جنہیں صرف پراکسی ہی کال کر سکتا ہے۔
یہاں نئے حصے ہیں:

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

ERC-20 کنٹریکٹ کو مجاز پراکسی کی شناخت جاننے کی ضرورت ہے۔
تاہم، ہم اس متغیر کو کنسٹرکٹر میں سیٹ نہیں کر سکتے، کیونکہ ہمیں ابھی تک قدر کا علم نہیں ہے۔
یہ کنٹریکٹ پہلے انسٹینٹی ایٹ کیا جاتا ہے کیونکہ پراکسی اپنے کنسٹرکٹر میں ٹوکن کے پتے کی توقع کرتا ہے۔

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

تخلیق کار کا پتہ (جسے `owner` کہا جاتا ہے) یہاں ذخیرہ کیا جاتا ہے کیونکہ یہ واحد پتہ ہے جسے پراکسی سیٹ کرنے کی اجازت ہے۔

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

پراکسی کو مراعات یافتہ رسائی حاصل ہے، کیونکہ یہ سیکیورٹی چیک کو بائی پاس کر سکتا ہے۔
یہ یقینی بنانے کے لیے کہ ہم پراکسی پر بھروسہ کر سکتے ہیں، ہم صرف `owner` کو اس فنکشن کو کال کرنے دیتے ہیں، اور صرف ایک بار۔
ایک بار جب `proxy` کی کوئی حقیقی قدر (صفر نہیں) ہو جاتی ہے، تو وہ قدر تبدیل نہیں ہو سکتی، لہذا یہاں تک کہ اگر مالک بدمعاش بننے کا فیصلہ کرتا ہے، یا اس کے لیے میمونک ظاہر ہو جاتا ہے، ہم پھر بھی محفوظ ہیں۔

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

یہ ایک [`modifier` function](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) ہے، یہ دوسرے فنکشنز کے کام کرنے کے طریقے میں ترمیم کرتا ہے۔

```solidity
      require(msg.sender == proxy);
```

سب سے پہلے، تصدیق کریں کہ ہمیں پراکسی نے کال کیا ہے اور کسی اور نے نہیں۔
اگر نہیں، تو `revert` کریں۔

```solidity
      _;
    }
```

اگر ایسا ہے تو، اس فنکشن کو چلائیں جس میں ہم ترمیم کرتے ہیں۔

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

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

یہ تین آپریشنز ہیں جن کے لیے عام طور پر پیغام کو براہ راست ٹوکن منتقل کرنے یا الاؤنس منظور کرنے والی ہستی سے آنے کی ضرورت ہوتی ہے۔
یہاں ہمارے پاس ان آپریشنز کا ایک پراکسی ورژن ہے جو:

1. `onlyProxy()` کے ذریعے ترمیم کیا گیا ہے تاکہ کسی اور کو انہیں کنٹرول کرنے کی اجازت نہ ہو۔
2. وہ پتہ حاصل کرتا ہے جو عام طور پر `msg.sender` ہوگا ایک اضافی پیرامیٹر کے طور پر۔

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

کال ڈیٹا انٹرپریٹر اوپر والے سے تقریباً مماثل ہے، سوائے اس کے کہ پراکسیڈ فنکشنز کو `msg.sender` پیرامیٹر ملتا ہے اور `transfer` کے لیے الاؤنس کی کوئی ضرورت نہیں ہے۔

```solidity
        // transfer (no need for allowance)
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

پچھلے ٹیسٹنگ کوڈ اور اس کے درمیان کچھ تبدیلیاں ہیں۔

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

ہمیں ERC-20 کنٹریکٹ کو یہ بتانے کی ضرورت ہے کہ کس پراکسی پر بھروسہ کرنا ہے

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

`approve()` اور `transferFrom()` کو چیک کرنے کے لیے ہمیں دوسرے دستخط کنندہ کی ضرورت ہے۔
ہم اسے `poorSigner` کہتے ہیں کیونکہ اسے ہمارے کوئی ٹوکن نہیں ملتے (اس کے پاس ETH ہونا ضروری ہے، یقیناً)۔

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

کیونکہ ERC-20 کنٹریکٹ پراکسی (`cdi`) پر بھروسہ کرتا ہے، ہمیں منتقلیوں کو ریلے کرنے کے لیے الاؤنس کی ضرورت نہیں ہے۔

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

دو نئے فنکشنز کی جانچ کریں۔
نوٹ کریں کہ `transferFromTx` کو دو ایڈریس پیرامیٹرز کی ضرورت ہے: الاؤنس دینے والا اور وصول کنندہ۔

## نتیجہ {#conclusion}

دونوں [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) اور [Arbitrum](https://developer.offchainlabs.com/docs/special_features) L1 پر لکھے گئے کال ڈیٹا کے سائز کو کم کرنے اور اس وجہ سے ٹرانزیکشنز کی لاگت کو کم کرنے کے طریقے تلاش کر رہے ہیں۔
تاہم، عام حل تلاش کرنے والے بنیادی ڈھانچے فراہم کرنے والوں کے طور پر، ہماری صلاحیتیں محدود ہیں۔
ڈ ایپ ڈیولپر کے طور پر، آپ کے پاس ایپلیکیشن کے لیے مخصوص علم ہے، جو آپ کو اپنے کال ڈیٹا کو ہم سے کہیں بہتر طور پر آپٹمائز کرنے دیتا ہے جتنا کہ ہم ایک عام حل میں کر سکتے ہیں۔
امید ہے کہ یہ مضمون آپ کو اپنی ضروریات کے لیے مثالی حل تلاش کرنے میں مدد کرے گا۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

