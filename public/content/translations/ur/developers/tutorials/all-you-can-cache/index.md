---
title: "سب کچھ جو آپ کیش کر سکتے ہیں"
description: "سستے رول اپ ٹرانزیکشنز کے لیے کیشنگ (caching) کنٹریکٹ بنانے اور استعمال کرنے کا طریقہ سیکھیں۔"
author: "اوری پومرانٹز"
tags: ["لیئر 2", "کیشنگ", "اسٹوریج", "اسکیلنگ"]
skill: intermediate
breadcrumb: "رول اپس کے لیے کیشنگ"
published: 2022-09-15
lang: ur
---

رول اپس (rollups) کا استعمال کرتے وقت ٹرانزیکشن میں ایک بائٹ کی قیمت اسٹوریج سلاٹ کی قیمت سے کہیں زیادہ مہنگی ہوتی ہے۔ اس لیے، زیادہ سے زیادہ معلومات کو آن چین (onchain) کیش (cache) کرنا سمجھداری کی بات ہے۔

اس مضمون میں آپ سیکھیں گے کہ کیشنگ کنٹریکٹ کو کس طرح بنایا اور استعمال کیا جائے تاکہ کسی بھی پیرامیٹر کی ویلیو جس کے متعدد بار استعمال ہونے کا امکان ہو، اسے کیش کیا جا سکے اور (پہلی بار کے بعد) بہت کم بائٹس کے ساتھ استعمال کے لیے دستیاب ہو، اور اس کیش کو استعمال کرنے والا آف چین (offchain) کوڈ کیسے لکھا جائے۔

اگر آپ مضمون کو چھوڑ کر صرف سورس کوڈ دیکھنا چاہتے ہیں، تو [وہ یہاں ہے](https://github.com/qbzzt/20220915-all-you-can-cache)۔ ڈیولپمنٹ اسٹیک [Foundry](https://getfoundry.sh/introduction/installation/) ہے۔

## مجموعی ڈیزائن {#overall-design}

سادگی کی خاطر ہم فرض کریں گے کہ تمام ٹرانزیکشن پیرامیٹرز `uint256` ہیں، جو 32 بائٹس طویل ہیں۔ جب ہمیں کوئی ٹرانزیکشن موصول ہوتی ہے، تو ہم ہر پیرامیٹر کو اس طرح پارس (parse) کریں گے:

1. اگر پہلی بائٹ `0xFF` ہے، تو اگلی 32 بائٹس کو پیرامیٹر ویلیو کے طور پر لیں اور اسے کیش میں لکھیں۔

2. اگر پہلی بائٹ `0xFE` ہے، تو اگلی 32 بائٹس کو پیرامیٹر ویلیو کے طور پر لیں لیکن اسے کیش میں _نہ_ لکھیں۔

3. کسی بھی دوسری ویلیو کے لیے، اوپر والی چار بٹس کو اضافی بائٹس کی تعداد کے طور پر لیں، اور نیچے والی چار بٹس کو کیش کی (key) کی سب سے اہم بٹس (most significant bits) کے طور پر لیں۔ یہاں کچھ مثالیں ہیں:

   | کال ڈیٹا میں بائٹس | کیش کی (key) |
   | :---------------- | --------: |
   | 0x0F              |      0x0F |
   | 0x10,0x10         |      0x10 |
   | 0x12,0xAC         |    0x02AC |
   | 0x2D,0xEA, 0xD6   |  0x0DEAD6 |

## کیش مینیپولیشن {#cache-manipulation}

کیش کو [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) میں لاگو کیا گیا ہے۔ آئیے اس کا لائن بہ لائن جائزہ لیتے ہیں۔

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

یہ کنسٹنٹس (constants) ان خاص صورتوں کی تشریح کے لیے استعمال ہوتے ہیں جہاں ہم تمام معلومات فراہم کرتے ہیں اور یا تو اسے کیش میں لکھنا چاہتے ہیں یا نہیں۔ کیش میں لکھنے کے لیے پہلے سے غیر استعمال شدہ اسٹوریج سلاٹس میں دو [`SSTORE`](https://www.evm.codes/#55) آپریشنز کی ضرورت ہوتی ہے جن میں سے ہر ایک کی قیمت 22100 گیس ہوتی ہے، اس لیے ہم اسے اختیاری بناتے ہیں۔

```solidity

    mapping(uint => uint) public val2key;
```

ویلیوز اور ان کی کیز (keys) کے درمیان ایک [میپنگ (mapping)](https://www.geeksforgeeks.org/solidity/solidity-mappings/)۔ ٹرانزیکشن بھیجنے سے پہلے ویلیوز کو انکوڈ کرنے کے لیے یہ معلومات ضروری ہے۔

```solidity
    // مقام n میں کلید n+1 کی قدر ہے، کیونکہ ہمیں محفوظ رکھنے کی ضرورت ہے
    // صفر کو بطور "کیشے میں نہیں"۔
    uint[] public key2val;
```

ہم کیز سے ویلیوز تک میپنگ کے لیے ایک ایرے (array) استعمال کر سکتے ہیں کیونکہ ہم کیز تفویض کرتے ہیں، اور سادگی کے لیے ہم اسے ترتیب وار کرتے ہیں۔

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "Reading uninitialize cache entry");
        return key2val[_key-1];
    } // cacheRead
```

کیش سے ایک ویلیو پڑھیں۔

```solidity
    // اگر کوئی قدر پہلے سے کیشے میں موجود نہیں ہے تو اسے کیشے میں لکھیں
    // صرف پبلک ہے تاکہ ٹیسٹ کام کر سکے
    function cacheWrite(uint _value) public returns (uint) {
        // اگر قدر پہلے سے کیشے میں موجود ہے، تو موجودہ کلید واپس کریں
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

ایک ہی ویلیو کو ایک سے زیادہ بار کیش میں رکھنے کا کوئی فائدہ نہیں۔ اگر ویلیو پہلے سے موجود ہے، تو بس موجودہ کی (key) واپس کر دیں۔

```solidity
        // چونکہ 0xFE ایک خاص صورت ہے، اس لیے سب سے بڑی کلید جو کیشے
        // رکھ سکتا ہے وہ 0x0D ہے جس کے بعد 15 0xFF آتے ہیں۔ اگر کیشے کی لمبائی پہلے ہی اتنی
        // بڑی ہے، تو ناکام ہو جائیں۔
        // 1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "cache overflow");
```

مجھے نہیں لگتا کہ ہمیں کبھی اتنی بڑی کیش ملے گی (تقریباً <span dir="ltr">1.8\*10<sup>37</sup></span> اندراجات، جنہیں اسٹور کرنے کے لیے تقریباً <span dir="ltr">10<sup>27</sup></span> TB درکار ہوں گے)۔ تاہم، میں اتنا پرانا ہوں کہ مجھے یاد ہے ["640kB ہمیشہ کافی ہوگا"](https://quoteinvestigator.com/2011/09/08/640k-enough/)۔ یہ ٹیسٹ بہت سستا ہے۔

```solidity
        // اگلی کلید کا استعمال کرتے ہوئے قدر لکھیں
        val2key[_value] = key2val.length+1;
```

ریورس لک اپ (ویلیو سے کی تک) شامل کریں۔

```solidity
        key2val.push(_value);
```

فارورڈ لک اپ (کی سے ویلیو تک) شامل کریں۔ چونکہ ہم ویلیوز کو ترتیب وار تفویض کرتے ہیں اس لیے ہم اسے آخری ایرے ویلیو کے بعد شامل کر سکتے ہیں۔

```solidity
        return key2val.length;
    } // cacheWrite
```

`key2val` کی نئی لمبائی واپس کریں، جو وہ سیل ہے جہاں نئی ویلیو اسٹور کی گئی ہے۔

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

یہ فنکشن صوابدیدی لمبائی (32 بائٹس تک، جو ورڈ سائز ہے) کے کال ڈیٹا سے ایک ویلیو پڑھتا ہے۔

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal length limit is 32 bytes");
        require(length + startByte <= msg.data.length,
            "_calldataVal trying to read beyond calldatasize");
```

یہ فنکشن انٹرنل (internal) ہے، لہذا اگر باقی کوڈ درست طریقے سے لکھا گیا ہے تو ان ٹیسٹس کی ضرورت نہیں ہے۔ تاہم، ان پر زیادہ لاگت نہیں آتی اس لیے ہم انہیں رکھ سکتے ہیں۔

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

یہ کوڈ [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) میں ہے۔ یہ کال ڈیٹا سے 32 بائٹ کی ویلیو پڑھتا ہے۔ یہ تب بھی کام کرتا ہے اگر کال ڈیٹا `startByte+32` سے پہلے رک جائے کیونکہ EVM میں غیر شروع شدہ (uninitialized) جگہ کو صفر سمجھا جاتا ہے۔

```solidity
        _retVal = _retVal >> (256-length*8);
```

ہمیں لازمی طور پر 32 بائٹ کی ویلیو نہیں چاہیے۔ یہ اضافی بائٹس سے چھٹکارا دلاتا ہے۔

```solidity
        return _retVal;
    } // _calldataVal


    // کال ڈیٹا (calldata) سے ایک پیرامیٹر پڑھیں، جس کی شروعات _fromByte سے ہو
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

کال ڈیٹا سے ایک واحد پیرامیٹر پڑھیں۔ نوٹ کریں کہ ہمیں نہ صرف وہ ویلیو واپس کرنے کی ضرورت ہے جو ہم نے پڑھی ہے، بلکہ اگلی بائٹ کا مقام بھی کیونکہ پیرامیٹرز 1 بائٹ سے لے کر 33 بائٹس تک طویل ہو سکتے ہیں۔

```solidity
        // پہلا بائٹ ہمیں بتاتا ہے کہ باقی کو کیسے سمجھنا ہے
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity ممکنہ طور پر خطرناک [امپلیسٹ ٹائپ کنورژنز (implicit type conversions)](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) کو منع کر کے بگز کی تعداد کو کم کرنے کی کوشش کرتی ہے۔ ایک ڈاؤن گریڈ، مثال کے طور پر 256 بٹس سے 8 بٹس تک، واضح (explicit) ہونا چاہیے۔

```solidity

        // قدر پڑھیں، لیکن اسے کیشے میں نہ لکھیں
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // قدر پڑھیں، اور اسے کیشے میں لکھیں
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // اگر ہم یہاں پہنچ گئے ہیں تو اس کا مطلب ہے کہ ہمیں کیشے سے پڑھنے کی ضرورت ہے

        // پڑھنے کے لیے اضافی بائٹس کی تعداد
        uint8 _extraBytes = _firstByte / 16;
```

نچلا [نبل (nibble)](https://en.wikipedia.org/wiki/Nibble) لیں اور اسے کیش سے ویلیو پڑھنے کے لیے دوسری بائٹس کے ساتھ جوڑیں۔

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    } // _readParam


    // n پیرامیٹرز پڑھیں (فنکشنز جانتے ہیں کہ انہیں کتنے پیرامیٹرز کی توقع ہے)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

ہم کال ڈیٹا سے ہی اپنے پاس موجود پیرامیٹرز کی تعداد حاصل کر سکتے ہیں، لیکن جو فنکشنز ہمیں کال کرتے ہیں وہ جانتے ہیں کہ انہیں کتنے پیرامیٹرز کی توقع ہے۔ یہ زیادہ آسان ہے کہ ہم انہیں بتانے دیں۔

```solidity
        // وہ پیرامیٹرز جو ہم نے پڑھے
        uint[] memory params = new uint[](_paramNum);

        // پیرامیٹرز بائٹ 4 سے شروع ہوتے ہیں، اس سے پہلے یہ فنکشن کے دستخط (signature) ہیں
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

پیرامیٹرز کو اس وقت تک پڑھیں جب تک کہ آپ کے پاس مطلوبہ تعداد نہ آجائے۔ اگر ہم کال ڈیٹا کے اختتام سے آگے نکل جاتے ہیں، تو `_readParams` کال کو ریورٹ (revert) کر دے گا۔

```solidity

        return(params);
    } // readParams

    // _readParams کی جانچ کے لیے، چار پیرامیٹرز پڑھنے کا ٹیسٹ کریں
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    } // fourParam
```

Foundry کا ایک بڑا فائدہ یہ ہے کہ یہ ٹیسٹس کو Solidity میں لکھنے کی اجازت دیتا ہے ([نیچے کیش کی ٹیسٹنگ دیکھیں](#testing-the-cache))۔ اس سے یونٹ ٹیسٹس بہت آسان ہو جاتے ہیں۔ یہ ایک فنکشن ہے جو چار پیرامیٹرز پڑھتا ہے اور انہیں واپس کرتا ہے تاکہ ٹیسٹ تصدیق کر سکے کہ وہ درست تھے۔

```solidity
    // ایک قدر حاصل کریں، وہ بائٹس واپس کریں جو اسے انکوڈ کریں گے (اگر ممکن ہو تو کیشے کا استعمال کرتے ہوئے)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` ایک فنکشن ہے جسے آف چین کوڈ کال کرتا ہے تاکہ ایسا کال ڈیٹا بنانے میں مدد ملے جو کیش استعمال کرتا ہو۔ یہ ایک واحد ویلیو وصول کرتا ہے اور اسے انکوڈ کرنے والی بائٹس واپس کرتا ہے۔ یہ فنکشن ایک `view` ہے، اس لیے اسے ٹرانزیکشن کی ضرورت نہیں ہوتی اور جب اسے بیرونی طور پر کال کیا جاتا ہے تو اس پر کوئی گیس خرچ نہیں ہوتی۔

```solidity
        uint _key = val2key[_val];

        // قدر ابھی کیشے میں نہیں ہے، اسے شامل کریں
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/) میں تمام غیر شروع شدہ (uninitialized) اسٹوریج کو صفر فرض کیا جاتا ہے۔ لہذا اگر ہم کسی ایسی ویلیو کی کی (key) تلاش کرتے ہیں جو وہاں نہیں ہے، تو ہمیں صفر ملتا ہے۔ اس صورت میں اسے انکوڈ کرنے والی بائٹس `INTO_CACHE` ہوتی ہیں (تاکہ اگلی بار اسے کیش کیا جا سکے)، جس کے بعد اصل ویلیو ہوتی ہے۔

```solidity
        // اگر کلید <0x10 ہے، تو اسے سنگل بائٹ کے طور پر واپس کریں
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

سنگل بائٹس سب سے آسان ہیں۔ ہم صرف [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) کا استعمال کرتے ہیں تاکہ `bytes<n>` ٹائپ کو بائٹ ایرے میں تبدیل کیا جا سکے جو کسی بھی لمبائی کی ہو سکتی ہے۔ نام کے باوجود، یہ تب بھی ٹھیک کام کرتا ہے جب اسے صرف ایک آرگومنٹ فراہم کیا جائے۔

```solidity
        // دو بائٹ کی قدر، جسے 0x1vvv کے طور پر انکوڈ کیا گیا ہے
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

جب ہمارے پاس کوئی کی (key) ہوتی ہے جو <span dir="ltr">16<sup>3</sup></span> سے کم ہوتی ہے، تو ہم اسے دو بائٹس میں ظاہر کر سکتے ہیں۔ ہم پہلے `_key` کو، جو کہ 256 بٹ کی ویلیو ہے، 16 بٹ کی ویلیو میں تبدیل کرتے ہیں اور پہلی بائٹ میں اضافی بائٹس کی تعداد شامل کرنے کے لیے لاجیکل OR کا استعمال کرتے ہیں۔ پھر ہم اسے `bytes2` ویلیو میں ڈال دیتے ہیں، جسے `bytes` میں تبدیل کیا جا سکتا ہے۔

```solidity
        // شاید مندرجہ ذیل لائنوں کو لوپ کے طور پر کرنے کا کوئی ہوشیار طریقہ موجود ہے،
        // لیکن یہ ایک ویو (view) فنکشن ہے اس لیے میں پروگرامر کے وقت اور
        // سادگی کے لیے آپٹمائز کر رہا ہوں۔

        if (_key < 16*256**2)
            return bytes.concat(bytes3(uint24(_key) | (0x2 * 16 * 256**2)));
        if (_key < 16*256**3)
            return bytes.concat(bytes4(uint32(_key) | (0x3 * 16 * 256**3)));
             .
             .
             .
        if (_key < 16*256**14)
            return bytes.concat(bytes15(uint120(_key) | (0xE * 16 * 256**14)));
        if (_key < 16*256**15)
            return bytes.concat(bytes16(uint128(_key) | (0xF * 16 * 256**15)));
```

دیگر ویلیوز (3 بائٹس، 4 بائٹس، وغیرہ) کو اسی طرح ہینڈل کیا جاتا ہے، بس مختلف فیلڈ سائز کے ساتھ۔

```solidity
        // اگر ہم یہاں پہنچتے ہیں، تو کچھ غلط ہے۔
        revert("Error in encodeVal, should not happen");
```

اگر ہم یہاں پہنچتے ہیں تو اس کا مطلب ہے کہ ہمیں ایک ایسی کی (key) ملی ہے جو <span dir="ltr">16\*256<sup>15</sup></span> سے کم نہیں ہے۔ لیکن `cacheWrite` کیز کو محدود کرتا ہے اس لیے ہم <span dir="ltr">14\*256<sup>16</sup></span> تک بھی نہیں پہنچ سکتے (جس کی پہلی بائٹ 0xFE ہوگی، اس لیے یہ `DONT_CACHE` کی طرح نظر آئے گی)۔ لیکن اگر مستقبل کا کوئی پروگرامر کوئی بگ متعارف کراتا ہے تو اس صورت میں ٹیسٹ شامل کرنے پر ہمیں زیادہ لاگت نہیں آتی۔

### کیش کی ٹیسٹنگ {#testing-the-cache}

Foundry کے فوائد میں سے ایک یہ ہے کہ [یہ آپ کو Solidity میں ٹیسٹ لکھنے کی اجازت دیتا ہے](https://getfoundry.sh/forge/tests/overview/)، جس سے یونٹ ٹیسٹ لکھنا آسان ہو جاتا ہے۔ `Cache` کلاس کے ٹیسٹ [یہاں](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol) ہیں۔ چونکہ ٹیسٹنگ کوڈ دہرایا جاتا ہے، جیسا کہ ٹیسٹس میں ہوتا ہے، یہ مضمون صرف دلچسپ حصوں کی وضاحت کرتا ہے۔

```solidity
    } // encodeVal

} // کیشے
```

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// کنسول کے لیے `forge test -vv` چلانے کی ضرورت ہے۔
import "forge-std/console.sol";
```

یہ صرف بوائلرپلیٹ (boilerplate) ہے جو ٹیسٹ پیکج اور `console.log` استعمال کرنے کے لیے ضروری ہے۔

```solidity
import "src/Cache.sol";
```

ہمیں اس کنٹریکٹ کو جاننے کی ضرورت ہے جس کا ہم ٹیسٹ کر رہے ہیں۔

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` فنکشن ہر ٹیسٹ سے پہلے کال کیا جاتا ہے۔ اس صورت میں ہم صرف ایک نئی کیش بناتے ہیں، تاکہ ہمارے ٹیسٹ ایک دوسرے کو متاثر نہ کریں۔

```solidity
    function testCaching() public {
```

ٹیسٹس وہ فنکشنز ہوتے ہیں جن کے نام `test` سے شروع ہوتے ہیں۔ یہ فنکشن بنیادی کیش فعالیت کو چیک کرتا ہے، ویلیوز لکھتا ہے اور انہیں دوبارہ پڑھتا ہے۔

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

اس طرح آپ اصل ٹیسٹنگ کرتے ہیں، [`assert...` فنکشنز](https://getfoundry.sh/reference/forge-std/std-assertions/) کا استعمال کرتے ہوئے۔ اس صورت میں، ہم چیک کرتے ہیں کہ جو ویلیو ہم نے لکھی ہے وہی ہم نے پڑھی ہے۔ ہم `cache.cacheWrite` کے نتیجے کو مسترد کر سکتے ہیں کیونکہ ہم جانتے ہیں کہ کیش کیز لینیئر (linearly) طور پر تفویض کی جاتی ہیں۔

```solidity
        }
    } // testCaching


    // ایک ہی قدر کو کئی بار کیشے کریں، یقینی بنائیں کہ کلید وہی
    // رہتی ہے
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

پہلے ہم ہر ویلیو کو دو بار کیش میں لکھتے ہیں اور اس بات کو یقینی بناتے ہیں کہ کیز ایک جیسی ہیں (یعنی دوسری بار لکھنا واقعی نہیں ہوا)۔

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    } // testRepeatCaching
```

نظریاتی طور پر کوئی ایسا بگ ہو سکتا ہے جو لگاتار کیش رائٹس (writes) کو متاثر نہ کرے۔ لہذا یہاں ہم کچھ ایسی رائٹس کرتے ہیں جو لگاتار نہیں ہیں اور دیکھتے ہیں کہ ویلیوز اب بھی دوبارہ نہیں لکھی گئیں۔

```solidity
    // میموری بفر سے ایک uint پڑھیں (یہ یقینی بنانے کے لیے کہ ہمیں وہ پیرامیٹرز واپس ملیں
    // جو ہم نے بھیجے تھے)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory` بفر سے 256 بٹ کا ورڈ پڑھیں۔ یہ یوٹیلیٹی فنکشن ہمیں اس بات کی تصدیق کرنے دیتا ہے کہ جب ہم کیش استعمال کرنے والی فنکشن کال چلاتے ہیں تو ہمیں درست نتائج موصول ہوتے ہیں۔

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul `uint256` سے آگے ڈیٹا اسٹرکچرز کو سپورٹ نہیں کرتا، لہذا جب آپ کسی زیادہ نفیس ڈیٹا اسٹرکچر کا حوالہ دیتے ہیں، جیسے کہ میموری بفر `_bytes`، تو آپ کو اس اسٹرکچر کا ایڈریس ملتا ہے۔ Solidity `bytes memory` ویلیوز کو 32 بائٹ ورڈ کے طور پر اسٹور کرتی ہے جس میں لمبائی ہوتی ہے، جس کے بعد اصل بائٹس ہوتی ہیں، لہذا بائٹ نمبر `_start` حاصل کرنے کے لیے ہمیں `_bytes+32+_start` کا حساب لگانا ہوگا۔

```solidity

        return tempUint;
    } // toUint256

    // fourParams() کے لیے فنکشن کے دستخط، بشکریہ
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // یہ دیکھنے کے لیے کہ ہمیں درست قدریں واپس مل رہی ہیں، بس کچھ مستقل (constant) قدریں
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

کچھ کنسٹنٹس (constants) جن کی ہمیں ٹیسٹنگ کے لیے ضرورت ہے۔

```solidity
    function testReadParam() public {
```

`fourParams()` کو کال کریں، جو ایک فنکشن ہے جو `readParams` استعمال کرتا ہے، تاکہ یہ ٹیسٹ کیا جا سکے کہ ہم پیرامیٹرز کو درست طریقے سے پڑھ سکتے ہیں۔

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

ہم کیش کا استعمال کرتے ہوئے کسی فنکشن کو کال کرنے کے لیے عام ABI میکانزم استعمال نہیں کر سکتے، اس لیے ہمیں لو لیول (low level) [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) میکانزم استعمال کرنے کی ضرورت ہے۔ وہ میکانزم ان پٹ کے طور پر `bytes memory` لیتا ہے، اور اسے (نیز ایک بولین ویلیو) آؤٹ پٹ کے طور پر واپس کرتا ہے۔

```solidity
        // پہلی کال، کیشے خالی ہے
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

ایک ہی کنٹریکٹ کے لیے کیشڈ فنکشنز (براہ راست ٹرانزیکشنز سے کالز کے لیے) اور نان کیشڈ فنکشنز (دوسرے اسمارٹ کنٹریکٹس سے کالز کے لیے) دونوں کو سپورٹ کرنا مفید ہے۔ ایسا کرنے کے لیے ہمیں درست فنکشن کو کال کرنے کے لیے Solidity میکانزم پر انحصار جاری رکھنے کی ضرورت ہے، بجائے اس کے کہ ہر چیز کو [ایک `fallback` فنکشن](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) میں ڈال دیا جائے۔ ایسا کرنے سے کمپوزایبلٹی (composability) بہت آسان ہو جاتی ہے۔ زیادہ تر معاملات میں فنکشن کی شناخت کے لیے ایک بائٹ کافی ہوگی، اس لیے ہم تین بائٹس (<span dir="ltr">16\*3=48</span> گیس) ضائع کر رہے ہیں۔ تاہم، جب میں یہ لکھ رہا ہوں تو ان 48 گیس کی قیمت 0.07 سینٹ ہے، جو کہ آسان، کم بگ والے کوڈ کی ایک معقول قیمت ہے۔

```solidity
            // پہلی قدر، اسے کیشے میں شامل کریں
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

پہلی ویلیو: ایک فلیگ (flag) جو یہ بتاتا ہے کہ یہ ایک مکمل ویلیو ہے جسے کیش میں لکھنے کی ضرورت ہے، جس کے بعد ویلیو کی 32 بائٹس ہیں۔ باقی تین ویلیوز بھی اسی طرح کی ہیں، سوائے اس کے کہ `VAL_B` کو کیش میں نہیں لکھا جاتا اور `VAL_C` تیسرا اور چوتھا دونوں پیرامیٹر ہے۔

```solidity
             .
             .
             .
        );
        (_success, _callOutput) = _cacheAddr.call(_callInput);
```

یہ وہ جگہ ہے جہاں ہم اصل میں `Cache` کنٹریکٹ کو کال کرتے ہیں۔

```solidity
        assertEq(_success, true);
```

ہمیں توقع ہے کہ کال کامیاب ہوگی۔

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

ہم ایک خالی کیش سے شروع کرتے ہیں اور پھر `VAL_A` اور اس کے بعد `VAL_C` شامل کرتے ہیں۔ ہمیں توقع ہوگی کہ پہلے کی کی (key) 1 ہوگی، اور دوسرے کی 2 ہوگی۔

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

آؤٹ پٹ چار پیرامیٹرز ہیں۔ یہاں ہم تصدیق کرتے ہیں کہ یہ درست ہے۔

```solidity
        // دوسری کال، ہم کیشے استعمال کر سکتے ہیں
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // کیشے میں پہلی قدر
            bytes1(0x01),
```

16 سے کم کیش کیز صرف ایک بائٹ کی ہوتی ہیں۔

```solidity
            // دوسری قدر، اسے کیشے میں شامل نہ کریں
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // تیسری اور چوتھی قدریں، ایک ہی قدر
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    } // testReadParam
```

کال کے بعد کے ٹیسٹ پہلی کال کے بعد کے ٹیسٹوں سے بالکل ملتے جلتے ہیں۔

```solidity
    function testEncodeVal() public {
```

یہ فنکشن `testReadParam` سے ملتا جلتا ہے، سوائے اس کے کہ پیرامیٹرز کو واضح طور پر لکھنے کے بجائے ہم `encodeVal()` استعمال کرتے ہیں۔

```solidity
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(VAL_A),
            cache.encodeVal(VAL_B),
            cache.encodeVal(VAL_C),
            cache.encodeVal(VAL_D)
        );
        .
        .
        .
        assertEq(_callInput.length, 4+1*4);
    } // testEncodeVal
```

`testEncodeVal()` میں واحد اضافی ٹیسٹ یہ تصدیق کرنا ہے کہ `_callInput` کی لمبائی درست ہے۔ پہلی کال کے لیے یہ <span dir="ltr">4+33\*4</span> ہے۔ دوسری کے لیے، جہاں ہر ویلیو پہلے سے ہی کیش میں موجود ہے، یہ <span dir="ltr">4+1\*4</span> ہے۔

```solidity
    // جب کلید ایک بائٹ سے زیادہ ہو تو encodeVal کا ٹیسٹ کریں
    // زیادہ سے زیادہ تین بائٹس کیونکہ کیشے کو چار بائٹس تک بھرنے میں بہت
    // وقت لگتا ہے۔
    function testEncodeValBig() public {
        // کیشے میں متعدد قدریں رکھیں۔
        // چیزوں کو سادہ رکھنے کے لیے، قدر n کے لیے کلید n استعمال کریں۔
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

اوپر دیا گیا `testEncodeVal` فنکشن کیش میں صرف چار ویلیوز لکھتا ہے، اس لیے [فنکشن کا وہ حصہ جو ملٹی بائٹ ویلیوز سے نمٹتا ہے](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) چیک نہیں کیا جاتا۔ لیکن وہ کوڈ پیچیدہ ہے اور اس میں غلطی کا امکان ہے۔

اس فنکشن کا پہلا حصہ ایک لوپ ہے جو 1 سے 0x1FFF تک کی تمام ویلیوز کو ترتیب سے کیش میں لکھتا ہے، تاکہ ہم ان ویلیوز کو انکوڈ کر سکیں اور جان سکیں کہ وہ کہاں جا رہی ہیں۔

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F), // ایک بائٹ        0x0F
            cache.encodeVal(0x0010), // دو بائٹس     0x1010
            cache.encodeVal(0x0100), // دو بائٹس     0x1100
            cache.encodeVal(0x1000) // تین بائٹس 0x201000
        );
```

ایک بائٹ، دو بائٹ، اور تین بائٹ ویلیوز کا ٹیسٹ کریں۔ ہم اس سے آگے ٹیسٹ نہیں کرتے کیونکہ کافی اسٹیک اندراجات (کم از کم 0x10000000، تقریباً ایک چوتھائی ارب) لکھنے میں بہت زیادہ وقت لگے گا۔

```solidity
        .
        .
        .
        .
    } // testEncodeValBig


    // ٹیسٹ کریں کہ انتہائی چھوٹے بفر کے ساتھ ہمیں ریورٹ (revert) ملتا ہے
    function testShortCalldata() public {
```

ٹیسٹ کریں کہ غیر معمولی صورت میں کیا ہوتا ہے جہاں کافی پیرامیٹرز نہیں ہوتے ہیں۔

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    } // testShortCalldata
```

چونکہ یہ ریورٹ (revert) ہوتا ہے، اس لیے ہمیں جو نتیجہ ملنا چاہیے وہ `false` ہے۔

```
    // Call with cache keys that aren't there
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // First value, add it to the cache
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // Second value
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

اس فنکشن کو چار بالکل جائز پیرامیٹرز ملتے ہیں، سوائے اس کے کہ کیش خالی ہے اس لیے وہاں پڑھنے کے لیے کوئی ویلیوز نہیں ہیں۔

```solidity
        .
        .
        .
    // ٹیسٹ کریں کہ انتہائی لمبے بفر کے ساتھ سب کچھ ٹھیک کام کرتا ہے
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // پہلی کال، کیشے خالی ہے
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // پہلی قدر، اسے کیشے میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_A),

            // دوسری قدر، اسے کیشے میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_B),

            // تیسری قدر، اسے کیشے میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_C),

            // چوتھی قدر، اسے کیشے میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_D),

            // اور "خوش قسمتی" کے لیے ایک اور قدر
            bytes4(0x31112233)
        );
```

یہ فنکشن پانچ ویلیوز بھیجتا ہے۔ ہم جانتے ہیں کہ پانچویں ویلیو کو نظر انداز کر دیا جاتا ہے کیونکہ یہ ایک درست کیش انٹری نہیں ہے، جس کی وجہ سے اگر اسے شامل نہ کیا جاتا تو ریورٹ ہو جاتا۔

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    } // testLongCalldata

} // CacheTest

```

## ایک نمونہ ایپلی کیشن {#a-sample-app}

Solidity میں ٹیسٹ لکھنا بہت اچھی بات ہے، لیکن آخر کار ایک ڈیپ (dapp) کو مفید ہونے کے لیے چین کے باہر سے آنے والی درخواستوں پر کارروائی کرنے کے قابل ہونا چاہیے۔ یہ مضمون ظاہر کرتا ہے کہ `WORM` کے ساتھ ڈیپ میں کیشنگ کا استعمال کیسے کیا جائے، جس کا مطلب ہے "Write Once, Read Many" (ایک بار لکھیں، کئی بار پڑھیں)۔ اگر کوئی کی (key) ابھی تک نہیں لکھی گئی ہے، تو آپ اس پر ایک ویلیو لکھ سکتے ہیں۔ اگر کی پہلے سے لکھی ہوئی ہے، تو آپ کو ریورٹ ملتا ہے۔

### کنٹریکٹ {#the-contract}

[یہ کنٹریکٹ ہے](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)۔ یہ زیادہ تر وہی دہراتا ہے جو ہم پہلے ہی `Cache` اور `CacheTest` کے ساتھ کر چکے ہیں، اس لیے ہم صرف ان حصوں کا احاطہ کرتے ہیں جو دلچسپ ہیں۔

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache` کو استعمال کرنے کا سب سے آسان طریقہ اسے اپنے کنٹریکٹ میں وراثت (inherit) میں لینا ہے۔

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    } // writeEntryCached
```

یہ فنکشن اوپر `CacheTest` میں `fourParam` سے ملتا جلتا ہے۔ چونکہ ہم ABI تصریحات (specifications) کی پیروی نہیں کرتے ہیں، اس لیے بہتر ہے کہ فنکشن میں کسی بھی پیرامیٹر کا اعلان نہ کیا جائے۔

```solidity
    // ہمیں کال کرنا آسان بنائیں
    // writeEntryCached() کے لیے فنکشن کے دستخط، بشکریہ
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

وہ بیرونی کوڈ جو `writeEntryCached` کو کال کرتا ہے اسے `worm.writeEntryCached` استعمال کرنے کے بجائے دستی طور پر کال ڈیٹا بنانا ہوگا، کیونکہ ہم ABI تصریحات کی پیروی نہیں کرتے ہیں۔ اس کنسٹنٹ ویلیو کا ہونا اسے لکھنا آسان بنا دیتا ہے۔

نوٹ کریں کہ اگرچہ ہم `WRITE_ENTRY_CACHED` کو ایک اسٹیٹ (state) ویری ایبل کے طور پر بیان کرتے ہیں، اسے بیرونی طور پر پڑھنے کے لیے اس کے لیے گیٹر (getter) فنکشن، `worm.WRITE_ENTRY_CACHED()` استعمال کرنا ضروری ہے۔

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

ریڈ (read) فنکشن ایک `view` ہے، اس لیے اسے ٹرانزیکشن کی ضرورت نہیں ہوتی اور اس پر گیس خرچ نہیں ہوتی۔ نتیجے کے طور پر، پیرامیٹر کے لیے کیش استعمال کرنے کا کوئی فائدہ نہیں ہے۔ ویو فنکشنز کے ساتھ معیاری میکانزم استعمال کرنا بہتر ہے جو زیادہ آسان ہے۔

### ٹیسٹنگ کوڈ {#the-testing-code}

[یہ کنٹریکٹ کے لیے ٹیسٹنگ کوڈ ہے](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)۔ ایک بار پھر، آئیے صرف اس پر نظر ڈالیں جو دلچسپ ہے۔

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("entry already written"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[یہ (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) وہ طریقہ ہے جس سے ہم Foundry ٹیسٹ میں یہ بتاتے ہیں کہ اگلی کال ناکام ہونی چاہیے، اور ناکامی کی اطلاع دی گئی وجہ کیا ہے۔ یہ اس وقت لاگو ہوتا ہے جب ہم کال ڈیٹا بنانے اور لو لیول انٹرفیس (`<contract>.call()`, وغیرہ) کا استعمال کرتے ہوئے کنٹریکٹ کو کال کرنے کے بجائے سنٹیکس `<contract>.<function name>()` استعمال کرتے ہیں۔

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

یہاں ہم اس حقیقت کا استعمال کرتے ہیں کہ `cacheWrite` کیش کی (key) واپس کرتا ہے۔ یہ کوئی ایسی چیز نہیں ہے جس کی ہم پروڈکشن میں استعمال کرنے کی توقع کریں گے، کیونکہ `cacheWrite` اسٹیٹ (state) کو تبدیل کرتا ہے، اور اس لیے اسے صرف ٹرانزیکشن کے دوران کال کیا جا سکتا ہے۔ ٹرانزیکشنز کی ریٹرن ویلیوز نہیں ہوتیں، اگر ان کے نتائج ہوں تو ان نتائج کو ایونٹس کے طور پر خارج (emit) کیا جانا چاہیے۔ لہذا `cacheWrite` کی ریٹرن ویلیو صرف آن چین کوڈ سے قابل رسائی ہے، اور آن چین کوڈ کو پیرامیٹر کیشنگ کی ضرورت نہیں ہے۔

```solidity
        (_success,) = address(worm).call(_callInput);
```

اس طرح ہم Solidity کو بتاتے ہیں کہ اگرچہ `<contract address>.call()` کی دو ریٹرن ویلیوز ہیں، ہمیں صرف پہلی کی پرواہ ہے۔

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

چونکہ ہم لو لیول `<address>.call()` فنکشن استعمال کرتے ہیں، اس لیے ہم `vm.expectRevert()` استعمال نہیں کر سکتے اور ہمیں اس بولین کامیابی کی ویلیو کو دیکھنا ہوگا جو ہمیں کال سے ملتی ہے۔

```solidity
    event EntryWritten(uint indexed key, uint indexed value);

        .
        .
        .

        _callInput = bytes.concat(
            worm.WRITE_ENTRY_CACHED(), worm.encodeVal(a), worm.encodeVal(b));
        vm.expectEmit(true, true, false, false);
        emit EntryWritten(a, b);
        (_success,) = address(worm).call(_callInput);
```

یہ وہ طریقہ ہے جس سے ہم تصدیق کرتے ہیں کہ کوڈ Foundry میں [ایونٹ کو درست طریقے سے خارج (emit) کرتا ہے](https://getfoundry.sh/reference/cheatcodes/expect-emit/)۔

### کلائنٹ {#the-client}

ایک چیز جو آپ کو Solidity ٹیسٹس کے ساتھ نہیں ملتی وہ JavaScript کوڈ ہے جسے آپ کاٹ کر اپنی ایپلی کیشن میں پیسٹ کر سکتے ہیں۔ اس کوڈ کو لکھنے کے لیے میں نے WORM کو [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli) پر ڈیپلائے کیا، جو [Optimism کا](https://www.optimism.io/) نیا ٹیسٹ نیٹ ہے۔ یہ ایڈریس [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a) پر ہے۔

[آپ کلائنٹ کے لیے JavaScript کوڈ یہاں دیکھ سکتے ہیں](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)۔ اسے استعمال کرنے کے لیے:

1. گٹ (git) ریپوزٹری کو کلون کریں:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. ضروری پیکجز انسٹال کریں:

   ```sh
   cd javascript
   yarn
   ```

3. کنفیگریشن فائل کاپی کریں:

   ```sh
   cp .env.example .env
   ```

4. اپنی کنفیگریشن کے لیے `.env` میں ترمیم کریں:

   | پیرامیٹر | ویلیو |
   | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC | ایک اکاؤنٹ کے لیے نیمونک (mnemonic) جس کے پاس ٹرانزیکشن کی ادائیگی کے لیے کافی ETH ہے۔ [آپ Optimism Goerli نیٹ ورک کے لیے مفت ETH یہاں سے حاصل کر سکتے ہیں](https://optimismfaucet.xyz/)۔ |
   | OPTIMISM_GOERLI_URL | Optimism Goerli کا URL۔ پبلک اینڈ پوائنٹ، `https://goerli.optimism.io`، ریٹ لمیٹڈ (rate limited) ہے لیکن ہماری ضرورت کے لیے کافی ہے۔ |

5. `index.js` چلائیں۔

   ```sh
   node index.js
   ```

   یہ نمونہ ایپلی کیشن پہلے WORM میں ایک انٹری لکھتی ہے، کال ڈیٹا اور Etherscan پر ٹرانزیکشن کا لنک دکھاتی ہے۔ پھر یہ اس انٹری کو واپس پڑھتی ہے، اور اس کی استعمال کردہ کی (key) اور انٹری میں موجود ویلیوز (ویلیو، بلاک نمبر، اور مصنف) دکھاتی ہے۔

کلائنٹ کا زیادہ تر حصہ عام Dapp JavaScript ہے۔ لہذا ایک بار پھر ہم صرف دلچسپ حصوں کا جائزہ لیں گے۔

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // ہر بار ایک نئی کلید کی ضرورت ہے
    const key = await worm.encodeVal(Number(new Date()))
```

دیے گئے سلاٹ میں صرف ایک بار لکھا جا سکتا ہے، اس لیے ہم ٹائم اسٹیمپ کا استعمال کرتے ہیں تاکہ یہ یقینی بنایا جا سکے کہ ہم سلاٹس کو دوبارہ استعمال نہیں کرتے ہیں۔

```javascript
const val = await worm.encodeVal("0x600D")

// ایک اندراج (entry) لکھیں
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers توقع کرتا ہے کہ کال ڈیٹا ایک ہیکس (hex) اسٹرنگ ہوگا، `0x` جس کے بعد ہیکسا ڈیسیمل ہندسوں کی جفت تعداد ہوگی۔ چونکہ `key` اور `val` دونوں `0x` سے شروع ہوتے ہیں، اس لیے ہمیں ان ہیڈرز کو ہٹانے کی ضرورت ہے۔

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

Solidity ٹیسٹنگ کوڈ کی طرح، ہم کیشڈ فنکشن کو عام طور پر کال نہیں کر سکتے۔ اس کے بجائے، ہمیں لو لیول میکانزم استعمال کرنے کی ضرورت ہے۔

```javascript
    .
    .
    .
    // ابھی لکھا گیا اندراج پڑھیں
    const realKey = '0x' + key.slice(4) // FF فلیگ کو ہٹا دیں
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

انٹریز پڑھنے کے لیے ہم عام میکانزم استعمال کر سکتے ہیں۔ `view` فنکشنز کے ساتھ پیرامیٹر کیشنگ استعمال کرنے کی کوئی ضرورت نہیں ہے۔

## نتیجہ {#conclusion}

اس مضمون میں موجود کوڈ ایک پروف آف کانسیپٹ (proof of concept) ہے، جس کا مقصد خیال کو سمجھنے میں آسان بنانا ہے۔ پروڈکشن کے لیے تیار سسٹم کے لیے آپ کچھ اضافی فعالیت لاگو کرنا چاہیں گے:

- ان ویلیوز کو ہینڈل کریں جو `uint256` نہیں ہیں۔ مثال کے طور پر، اسٹرنگز (strings)۔
- گلوبل کیش کے بجائے، شاید صارفین اور کیشز کے درمیان میپنگ ہو۔ مختلف صارفین مختلف ویلیوز استعمال کرتے ہیں۔
- ایڈریسز کے لیے استعمال ہونے والی ویلیوز دیگر مقاصد کے لیے استعمال ہونے والی ویلیوز سے الگ ہوتی ہیں۔ صرف ایڈریسز کے لیے ایک الگ کیش رکھنا سمجھداری کی بات ہو سکتی ہے۔
- فی الحال، کیش کیز "پہلے آئیں، سب سے چھوٹی کی" الگورتھم پر ہیں۔ پہلی سولہ ویلیوز کو ایک بائٹ کے طور پر بھیجا جا سکتا ہے۔ اگلی 4080 ویلیوز کو دو بائٹس کے طور پر بھیجا جا سکتا ہے۔ اگلی تقریباً دس لاکھ ویلیوز تین بائٹس کی ہیں، وغیرہ۔ ایک پروڈکشن سسٹم کو کیش انٹریز پر استعمال کے کاؤنٹرز رکھنے چاہئیں اور انہیں دوبارہ منظم کرنا چاہیے تاکہ سولہ _سب سے عام_ ویلیوز ایک بائٹ کی ہوں، اگلی 4080 سب سے عام ویلیوز دو بائٹس کی ہوں، وغیرہ۔

  تاہم، یہ ممکنہ طور پر ایک خطرناک آپریشن ہے۔ واقعات کی درج ذیل ترتیب کا تصور کریں:

  1. Noam Naive اس ایڈریس کو انکوڈ کرنے کے لیے `encodeVal` کو کال کرتا ہے جس پر وہ ٹوکن بھیجنا چاہتا ہے۔ وہ ایڈریس ایپلی کیشن پر استعمال ہونے والے پہلے ایڈریسز میں سے ایک ہے، اس لیے انکوڈ شدہ ویلیو 0x06 ہے۔ یہ ایک `view` فنکشن ہے، ٹرانزیکشن نہیں، اس لیے یہ Noam اور اس کے استعمال کردہ نوڈ کے درمیان ہے، اور کسی اور کو اس کے بارے میں معلوم نہیں ہے۔

  2. Owen Owner کیش ری آرڈرنگ (reordering) آپریشن چلاتا ہے۔ بہت کم لوگ دراصل اس ایڈریس کو استعمال کرتے ہیں، اس لیے اب اسے 0x201122 کے طور پر انکوڈ کیا گیا ہے۔ ایک مختلف ویلیو، <span dir="ltr">10<sup>18</sup></span>، کو 0x06 تفویض کیا گیا ہے۔

  3. Noam Naive اپنے ٹوکن 0x06 پر بھیجتا ہے۔ وہ ایڈریس `0x0000000000000000000000000de0b6b3a7640000` پر جاتے ہیں، اور چونکہ کوئی بھی اس ایڈریس کی پرائیویٹ کی (private key) نہیں جانتا، اس لیے وہ وہیں پھنس جاتے ہیں۔ Noam _خوش نہیں_ ہے۔

  اس مسئلے کو حل کرنے کے طریقے موجود ہیں، اور کیش ری آرڈر کے دوران میم پول (mempool) میں موجود ٹرانزیکشنز کے متعلقہ مسئلے کو بھی، لیکن آپ کو اس سے آگاہ ہونا چاہیے۔

میں نے یہاں Optimism کے ساتھ کیشنگ کا مظاہرہ کیا، کیونکہ میں Optimism کا ملازم ہوں اور یہ وہ رول اپ ہے جسے میں سب سے بہتر جانتا ہوں۔ لیکن اسے کسی بھی ایسے رول اپ کے ساتھ کام کرنا چاہیے جو اندرونی پروسیسنگ کے لیے کم سے کم لاگت وصول کرتا ہو، تاکہ اس کے مقابلے میں ٹرانزیکشن ڈیٹا کو L1 پر لکھنا بڑا خرچ ہو۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔