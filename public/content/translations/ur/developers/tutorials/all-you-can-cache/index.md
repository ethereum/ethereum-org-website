---
title: "وہ سب کچھ جو آپ کیش کر سکتے ہیں"
description: "سستے رول اپ ٹرانزیکشنز کے لیے کیشنگ کنٹریکٹ بنانے اور استعمال کرنے کا طریقہ سیکھیں"
author: Ori Pomerantz
tags: [ "لیئر 2", "کیشنگ", "اسٹوریج" ]
skill: intermediate
published: 2022-09-15
lang: ur-in
---

رول اپس کا استعمال کرتے وقت ٹرانزیکشن میں ایک بائٹ کی قیمت اسٹوریج سلاٹ کی قیمت سے کہیں زیادہ مہنگی ہوتی ہے۔ لہذا، زیادہ سے زیادہ معلومات کو آن چین کیش کرنا سمجھ میں آتا ہے۔

اس مضمون میں آپ یہ سیکھیں گے کہ کیشنگ کنٹریکٹ کو اس طرح کیسے بنایا اور استعمال کیا جائے کہ کوئی بھی پیرامیٹر ویلیو جس کے متعدد بار استعمال ہونے کا امکان ہو، کیش ہو جائے اور بہت کم تعداد میں بائٹس کے ساتھ (پہلی بار کے بعد) استعمال کے لیے دستیاب ہو، اور اس کیش کو استعمال کرنے والا آف چین کوڈ کیسے لکھا جائے۔

اگر آپ مضمون کو چھوڑنا چاہتے ہیں اور صرف سورس کوڈ دیکھنا چاہتے ہیں، تو [یہ یہاں ہے](https://github.com/qbzzt/20220915-all-you-can-cache)۔ ڈیولپمنٹ اسٹیک [Foundry](https://getfoundry.sh/introduction/installation/) ہے۔

## مجموعی ڈیزائن {#overall-design}

سادگی کی خاطر ہم یہ فرض کریں گے کہ تمام ٹرانزیکشن پیرامیٹرز `uint256` ہیں، 32 بائٹس لمبے ہیں۔ جب ہمیں کوئی ٹرانزیکشن موصول ہوگا، تو ہم ہر پیرامیٹر کو اس طرح پارس کریں گے:

1. اگر پہلا بائٹ `0xFF` ہے، تو اگلے 32 بائٹس کو پیرامیٹر ویلیو کے طور پر لیں اور اسے کیش میں لکھیں۔

2. اگر پہلا بائٹ `0xFE` ہے، تو اگلے 32 بائٹس کو پیرامیٹر ویلیو کے طور پر لیں لیکن اسے کیش میں _نہ_ لکھیں۔

3. کسی بھی دوسری ویلیو کے لیے، اوپر کے چار بٹس کو اضافی بائٹس کی تعداد کے طور پر لیں، اور نیچے کے چار بٹس کو کیش کی (key) کے سب سے اہم بٹس کے طور پر لیں۔ یہاں کچھ مثالیں ہیں:

   | کال ڈیٹا میں بائٹس | کیش کی (key) |
   | :----------------- | ------------------------------: |
   | 0x0F               |                            0x0F |
   | 0x10,0x10          |                            0x10 |
   | 0x12,0xAC          |                          0x02AC |
   | 0x2D,0xEA, 0xD6    |                        0x0DEAD6 |

## کیش مینیپولیشن {#cache-manipulation}

کیش [`Cache.sol`](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol) میں نافذ کیا گیا ہے۔ آئیے اس کا لائن بہ لائن جائزہ لیں۔

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


contract Cache {

    bytes1 public constant INTO_CACHE = 0xFF;
    bytes1 public constant DONT_CACHE = 0xFE;
```

یہ کونسٹنٹس ان خاص معاملات کی تشریح کے لیے استعمال ہوتے ہیں جہاں ہم تمام معلومات فراہم کرتے ہیں اور یا تو چاہتے ہیں کہ اسے کیش میں لکھا جائے یا نہیں۔ کیش میں لکھنے کے لیے پہلے سے غیر استعمال شدہ اسٹوریج سلاٹس میں دو [`SSTORE`](https://www.evm.codes/#55) آپریشنز کی ضرورت ہوتی ہے، جن میں سے ہر ایک پر 22100 گیس لاگت آتی ہے، اس لیے ہم اسے اختیاری بناتے ہیں۔

```solidity

    mapping(uint => uint) public val2key;
```

ویلیوز اور ان کی کیز (keys) کے درمیان ایک [میپنگ](https://www.geeksforgeeks.org/solidity/solidity-mappings/)۔ ٹرانزیکشن بھیجنے سے پہلے ویلیوز کو انکوڈ کرنے کے لیے یہ معلومات ضروری ہے۔

```solidity
    // لوکیشن n میں کی (key) n+1 کے لیے ویلیو ہے، کیونکہ ہمیں صفر کو "کیش میں نہیں" کے طور پر محفوظ کرنے کی ضرورت ہے۔
    // 
    uint[] public key2val;
```

ہم کیز (keys) سے ویلیوز تک میپنگ کے لیے ایک ارے (array) کا استعمال کر سکتے ہیں کیونکہ ہم کیز (keys) تفویض کرتے ہیں، اور سادگی کے لیے ہم اسے ترتیب وار کرتے ہیں۔

```solidity
    function cacheRead(uint _key) public view returns (uint) {
        require(_key <= key2val.length, "غیر شروع شدہ کیش انٹری کو پڑھنا");
        return key2val[_key-1];
    }  // cacheRead
```

کیش سے ایک ویلیو پڑھیں۔

```solidity
    // اگر ویلیو پہلے سے موجود نہیں ہے تو اسے کیش میں لکھیں
    // ٹیسٹ کو کام کرنے کے قابل بنانے کے لیے صرف پبلک
    function cacheWrite(uint _value) public returns (uint) {
        // اگر ویلیو پہلے سے ہی کیش میں ہے، تو موجودہ کی (key) واپس کریں
        if (val2key[_value] != 0) {
            return val2key[_value];
        }
```

ایک ہی ویلیو کو ایک سے زیادہ بار کیش میں ڈالنے کا کوئی فائدہ نہیں ہے۔ اگر ویلیو پہلے سے موجود ہے، تو صرف موجودہ کی (key) واپس کریں۔

```solidity
        // چونکہ 0xFE ایک خاص کیس ہے، اس لیے سب سے بڑی کی (key) جو کیش
        // رکھ سکتا ہے وہ 0x0D ہے جس کے بعد 15 0xFF's ہیں۔ اگر کیش کی لمبائی پہلے ہی اتنی
        // بڑی ہے، تو ناکام ہو جائیں۔
        //                              1 2 3 4 5 6 7 8 9 A B C D E F
        require(key2val.length+1 < 0x0DFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF,
            "کیش اوور فلو");
```

مجھے نہیں لگتا کہ ہمیں کبھی اتنا بڑا کیش ملے گا (تقریباً 1.8\*10<sup>37</sup> اندراجات، جسے اسٹور کرنے کے لیے تقریباً 10<sup>27</sup> ٹی بی کی ضرورت ہوگی)۔ تاہم، میں اتنا بوڑھا ہوں کہ مجھے ["640kB ہمیشہ کافی ہوگا"](https://quoteinvestigator.com/2011/09/08/640k-enough/) یاد ہے۔ یہ ٹیسٹ بہت سستا ہے۔

```solidity
        // اگلی کی (key) کا استعمال کرتے ہوئے ویلیو لکھیں
        val2key[_value] = key2val.length+1;
```

ریورس لک اپ (ویلیو سے کی (key) تک) شامل کریں۔

```solidity
        key2val.push(_value);
```

فارورڈ لک اپ (کی (key) سے ویلیو تک) شامل کریں۔ چونکہ ہم ویلیوز کو ترتیب وار تفویض کرتے ہیں، اس لیے ہم اسے صرف آخری ارے ویلیو کے بعد شامل کر سکتے ہیں۔

```solidity
        return key2val.length;
    }  // cacheWrite
```

`key2val` کی نئی لمبائی واپس کریں، جو وہ سیل ہے جہاں نئی ​​ویلیو اسٹور کی گئی ہے۔

```solidity
    function _calldataVal(uint startByte, uint length)
        private pure returns (uint)
```

یہ فنکشن کال ڈیٹا سے کسی بھی لمبائی کی ویلیو پڑھتا ہے (32 بائٹس تک، ورڈ سائز)۔

```solidity
    {
        uint _retVal;

        require(length < 0x21,
            "_calldataVal لمبائی کی حد 32 بائٹس ہے");
        require(length + startByte <= msg.data.length,
            "_calldataVal کال ڈیٹا سائز سے آگے پڑھنے کی کوشش کر رہا ہے");
```

یہ فنکشن اندرونی ہے، لہذا اگر باقی کوڈ صحیح طریقے سے لکھا گیا ہے تو ان ٹیسٹوں کی ضرورت نہیں ہے۔ تاہم، ان پر زیادہ لاگت نہیں آتی ہے لہذا ہم انہیں رکھ سکتے ہیں۔

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

یہ کوڈ [Yul](https://docs.soliditylang.org/en/v0.8.16/yul.html) میں ہے۔ یہ کال ڈیٹا سے 32 بائٹ کی ویلیو پڑھتا ہے۔ یہ تب بھی کام کرتا ہے اگر کال ڈیٹا `startByte+32` سے پہلے رک جاتا ہے کیونکہ EVM میں غیر شروع شدہ جگہ کو صفر سمجھا جاتا ہے۔

```solidity
        _retVal = _retVal >> (256-length*8);
```

ہم ضروری نہیں کہ 32 بائٹ کی ویلیو چاہتے ہیں۔ اس سے اضافی بائٹس سے چھٹکارا مل جاتا ہے۔

```solidity
        return _retVal;
    } // _calldataVal


    // کال ڈیٹا سے ایک پیرامیٹر پڑھیں، _fromByte سے شروع ہو کر
    function _readParam(uint _fromByte) internal
        returns (uint _nextByte, uint _parameterValue)
    {
```

کال ڈیٹا سے ایک پیرامیٹر پڑھیں۔ نوٹ کریں کہ ہمیں نہ صرف وہ ویلیو واپس کرنے کی ضرورت ہے جو ہم نے پڑھی ہے، بلکہ اگلے بائٹ کا مقام بھی واپس کرنے کی ضرورت ہے کیونکہ پیرامیٹرز 1 بائٹ سے لے کر 33 بائٹس تک کے ہو سکتے ہیں۔

```solidity
        // پہلا بائٹ ہمیں بتاتا ہے کہ باقی کی تشریح کیسے کی جائے
        uint8 _firstByte;

        _firstByte = uint8(_calldataVal(_fromByte, 1));
```

Solidity ممکنہ طور پر خطرناک [مضمر قسم کی تبدیلیوں](https://docs.soliditylang.org/en/v0.8.16/types.html#implicit-conversions) پر پابندی لگا کر بگس کی تعداد کو کم کرنے کی کوشش کرتا ہے۔ ایک ڈاؤن گریڈ، مثال کے طور پر 256 بٹس سے 8 بٹس تک، واضح ہونا چاہیے۔

```solidity

        // ویلیو کو پڑھیں، لیکن اسے کیش میں نہ لکھیں
        if (_firstByte == uint8(DONT_CACHE))
            return(_fromByte+33, _calldataVal(_fromByte+1, 32));

        // ویلیو کو پڑھیں، اور اسے کیش میں لکھیں
        if (_firstByte == uint8(INTO_CACHE)) {
            uint _param = _calldataVal(_fromByte+1, 32);
            cacheWrite(_param);
            return(_fromByte+33, _param);
        }

        // اگر ہم یہاں پہنچ گئے تو اس کا مطلب ہے کہ ہمیں کیش سے پڑھنے کی ضرورت ہے

        // پڑھنے کے لیے اضافی بائٹس کی تعداد
        uint8 _extraBytes = _firstByte / 16;
```

نچلے [نببل](https://en.wikipedia.org/wiki/Nibble) کو لیں اور اسے دوسرے بائٹس کے ساتھ ملا کر کیش سے ویلیو پڑھیں۔

```solidity
        uint _key = (uint256(_firstByte & 0x0F) << (8*_extraBytes)) +
            _calldataVal(_fromByte+1, _extraBytes);

        return (_fromByte+_extraBytes+1, cacheRead(_key));

    }  // _readParam


    // n پیرامیٹرز پڑھیں (فنکشنز جانتے ہیں کہ وہ کتنے پیرامیٹرز کی توقع کرتے ہیں)
    function _readParams(uint _paramNum) internal returns (uint[] memory) {
```

ہم کال ڈیٹا سے ہی پیرامیٹرز کی تعداد حاصل کر سکتے ہیں، لیکن جو فنکشنز ہمیں کال کرتے ہیں وہ جانتے ہیں کہ وہ کتنے پیرامیٹرز کی توقع کرتے ہیں۔ انہیں ہمیں بتانے دینا آسان ہے۔

```solidity
        // جو پیرامیٹرز ہم پڑھتے ہیں
        uint[] memory params = new uint[](_paramNum);

        // پیرامیٹرز بائٹ 4 سے شروع ہوتے ہیں، اس سے پہلے فنکشن کا دستخط ہوتا ہے
        uint _atByte = 4;

        for(uint i=0; i<_paramNum; i++) {
            (_atByte, params[i]) = _readParam(_atByte);
        }
```

پیرامیٹرز کو اس وقت تک پڑھیں جب تک آپ کے پاس مطلوبہ تعداد نہ ہو۔ اگر ہم کال ڈیٹا کے آخر سے آگے نکل جاتے ہیں، تو `_readParams` کال کو واپس کر دے گا۔

```solidity

        return(params);
    }   // readParams

    // _readParams کی جانچ کے لیے، چار پیرامیٹرز پڑھنے کی جانچ کریں
    function fourParam() public
        returns (uint256,uint256,uint256,uint256)
    {
        uint[] memory params;
        params = _readParams(4);
        return (params[0], params[1], params[2], params[3]);
    }    // fourParam
```

Foundry کا ایک بڑا فائدہ یہ ہے کہ یہ Solidity میں ٹیسٹ لکھنے کی اجازت دیتا ہے ([نیچے کیش کی جانچ دیکھیں](#testing-the-cache))۔ اس سے یونٹ ٹیسٹ بہت آسان ہو جاتے ہیں۔ یہ ایک ایسا فنکشن ہے جو چار پیرامیٹرز کو پڑھتا ہے اور انہیں واپس کرتا ہے تاکہ ٹیسٹ اس بات کی تصدیق کر سکے کہ وہ درست تھے۔

```solidity
    // ایک ویلیو حاصل کریں، وہ بائٹس واپس کریں جو اسے انکوڈ کریں گے (اگر ممکن ہو تو کیش کا استعمال کرتے ہوئے)
    function encodeVal(uint _val) public view returns(bytes memory) {
```

`encodeVal` ایک فنکشن ہے جسے آف چین کوڈ کال کرتا ہے تاکہ کال ڈیٹا بنانے میں مدد ملے جو کیش کا استعمال کرتا ہے۔ یہ ایک ویلیو وصول کرتا ہے اور ان بائٹس کو واپس کرتا ہے جو اسے انکوڈ کرتے ہیں۔ یہ فنکشن ایک `view` ہے، لہذا اسے ٹرانزیکشن کی ضرورت نہیں ہے اور جب بیرونی طور پر کال کیا جاتا ہے تو اس پر کوئی گیس لاگت نہیں آتی ہے۔

```solidity
        uint _key = val2key[_val];

        // ویلیو ابھی کیش میں نہیں ہے، اسے شامل کریں
        if (_key == 0)
            return bytes.concat(INTO_CACHE, bytes32(_val));
```

[EVM](/developers/docs/evm/) میں تمام غیر شروع شدہ اسٹوریج کو صفر سمجھا جاتا ہے۔ لہذا اگر ہم کسی ایسی ویلیو کی کی (key) تلاش کرتے ہیں جو وہاں نہیں ہے، تو ہمیں صفر ملتا ہے۔ اس صورت میں جو بائٹس اسے انکوڈ کرتے ہیں وہ `INTO_CACHE` ہیں (تاکہ یہ اگلی بار کیش ہو جائے)، اس کے بعد اصل ویلیو ہوتی ہے۔

```solidity
        // اگر کی (key) <0x10 ہے، تو اسے ایک بائٹ کے طور پر واپس کریں
        if (_key < 0x10)
            return bytes.concat(bytes1(uint8(_key)));
```

سنگل بائٹس سب سے آسان ہیں۔ ہم صرف [`bytes.concat`](https://docs.soliditylang.org/en/v0.8.16/types.html#the-functions-bytes-concat-and-string-concat) کا استعمال کرتے ہیں تاکہ `bytes<n>` قسم کو بائٹ ارے میں تبدیل کیا جا سکے جو کسی بھی لمبائی کا ہو سکتا ہے۔ نام کے باوجود، یہ صرف ایک آرگیومنٹ فراہم کرنے پر ٹھیک کام کرتا ہے۔

```solidity
        // دو بائٹ ویلیو، 0x1vvv کے طور پر انکوڈ کی گئی
        if (_key < 0x1000)
            return bytes.concat(bytes2(uint16(_key) | 0x1000));
```

جب ہمارے پاس ایک کی (key) ہوتی ہے جو 16<sup>3</sup> سے کم ہوتی ہے، تو ہم اسے دو بائٹس میں ظاہر کر سکتے ہیں۔ ہم پہلے `_key` کو، جو 256 بٹ کی ویلیو ہے، 16 بٹ کی ویلیو میں تبدیل کرتے ہیں اور پہلے بائٹ میں اضافی بائٹس کی تعداد شامل کرنے کے لیے منطقی یا (logical or) کا استعمال کرتے ہیں۔ پھر ہم اسے `bytes2` ویلیو میں ڈالتے ہیں، جسے `bytes` میں تبدیل کیا جا سکتا ہے۔

```solidity
        // مندرجہ ذیل لائنوں کو لوپ کے طور پر کرنے کا شاید کوئی ہوشیار طریقہ ہے،
        // لیکن یہ ایک ویو فنکشن ہے اس لیے میں پروگرامر کے وقت اور
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

دیگر ویلیوز (3 بائٹس، 4 بائٹس، وغیرہ) اسی طرح ہینڈل کی جاتی ہیں، صرف مختلف فیلڈ سائز کے ساتھ۔

```solidity
        // اگر ہم یہاں پہنچ جاتے ہیں، تو کچھ غلط ہے۔
        revert("encodeVal میں خرابی، ایسا نہیں ہونا چاہیے");
```

اگر ہم یہاں پہنچ جاتے ہیں تو اس کا مطلب ہے کہ ہمیں ایک ایسی کی (key) ملی ہے جو 16\*256<sup>15</sup> سے کم نہیں ہے۔ لیکن `cacheWrite` کیز (keys) کو محدود کرتا ہے لہذا ہم 14\*256<sup>16</sup> تک بھی نہیں پہنچ سکتے (جس کا پہلا بائٹ 0xFE ہوگا، لہذا یہ `DONT_CACHE` کی طرح نظر آئے گا)۔ لیکن مستقبل میں کسی پروگرامر کی طرف سے بگ متعارف کرانے کی صورت میں ٹیسٹ شامل کرنے میں ہمیں زیادہ لاگت نہیں آتی۔

```solidity
    } // encodeVal

}  // Cache
```

### کیش کی جانچ {#testing-the-cache}

Foundry کے فوائد میں سے ایک یہ ہے کہ [یہ آپ کو Solidity میں ٹیسٹ لکھنے دیتا ہے](https://getfoundry.sh/forge/tests/overview/)، جس سے یونٹ ٹیسٹ لکھنا آسان ہو جاتا ہے۔ `Cache` کلاس کے لیے ٹیسٹ [یہاں](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/Cache.t.sol) ہیں۔ چونکہ ٹیسٹنگ کوڈ بار بار ہوتا ہے، جیسا کہ ٹیسٹ ہوتے ہیں، یہ مضمون صرف دلچسپ حصوں کی وضاحت کرتا ہے۔

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";


// کنسول کے لیے `forge test -vv` چلانے کی ضرورت ہے۔
import "forge-std/console.sol";
```

یہ صرف بوائلر پلیٹ ہے جو ٹیسٹ پیکیج اور `console.log` استعمال کرنے کے لیے ضروری ہے۔

```solidity
import "src/Cache.sol";
```

ہمیں اس کنٹریکٹ کو جاننے کی ضرورت ہے جس کی ہم جانچ کر رہے ہیں۔

```solidity
contract CacheTest is Test {
    Cache cache;

    function setUp() public {
        cache = new Cache();
    }
```

`setUp` فنکشن ہر ٹیسٹ سے پہلے کال کیا جاتا ہے۔ اس صورت میں ہم صرف ایک نیا کیش بناتے ہیں، تاکہ ہمارے ٹیسٹ ایک دوسرے کو متاثر نہ کریں۔

```solidity
    function testCaching() public {
```

ٹیسٹ وہ فنکشنز ہیں جن کے نام `test` سے شروع ہوتے ہیں۔ یہ فنکشن بنیادی کیش کی فعالیت، ویلیوز لکھنے اور انہیں دوبارہ پڑھنے کی جانچ کرتا ہے۔

```solidity
        for(uint i=1; i<5000; i++) {
            cache.cacheWrite(i*i);
        }

        for(uint i=1; i<5000; i++) {
            assertEq(cache.cacheRead(i), i*i);
```

یہ ہے کہ آپ اصل جانچ کیسے کرتے ہیں، [`assert...` فنکشنز](https://getfoundry.sh/reference/forge-std/std-assertions/) کا استعمال کرتے ہوئے۔ اس صورت میں، ہم جانچتے ہیں کہ ہم نے جو ویلیو لکھی ہے وہی ہے جو ہم نے پڑھی ہے۔ ہم `cache.cacheWrite` کے نتیجے کو مسترد کر سکتے ہیں کیونکہ ہم جانتے ہیں کہ کیش کیز (keys) لکیری طور پر تفویض کی جاتی ہیں۔

```solidity
        }
    }    // testCaching


    // ایک ہی ویلیو کو متعدد بار کیش کریں، یقینی بنائیں کہ کی (key) وہی
    // رہتی ہے
    function testRepeatCaching() public {
        for(uint i=1; i<100; i++) {
            uint _key1 = cache.cacheWrite(i);
            uint _key2 = cache.cacheWrite(i);
            assertEq(_key1, _key2);
        }
```

پہلے ہم ہر ویلیو کو دو بار کیش میں لکھتے ہیں اور یقینی بناتے ہیں کہ کیز (keys) ایک جیسی ہیں (مطلب دوسری لکھائی واقعی نہیں ہوئی)۔

```solidity
        for(uint i=1; i<100; i+=3) {
            uint _key = cache.cacheWrite(i);
            assertEq(_key, i);
        }
    }    // testRepeatCaching
```

نظریاتی طور پر ایک ایسا بگ ہو سکتا ہے جو لگاتار کیش رائٹس کو متاثر نہیں کرتا ہے۔ لہذا یہاں ہم کچھ ایسی رائٹس کرتے ہیں جو لگاتار نہیں ہیں اور دیکھتے ہیں کہ ویلیوز اب بھی دوبارہ نہیں لکھی گئیں۔

```solidity
    // میموری بفر سے ایک uint پڑھیں (یقینی بنانے کے لیے کہ ہمیں بھیجے گئے پیرامیٹرز
    // واپس ملیں)
    function toUint256(bytes memory _bytes, uint256 _start) internal pure
        returns (uint256)
```

`bytes memory` بفر سے 256 بٹ کا ورڈ پڑھیں۔ یہ یوٹیلیٹی فنکشن ہمیں اس بات کی تصدیق کرنے دیتا ہے کہ جب ہم کیش کا استعمال کرنے والی فنکشن کال چلاتے ہیں تو ہمیں درست نتائج موصول ہوتے ہیں۔

```solidity
    {
        require(_bytes.length >= _start + 32, "toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }
```

Yul `uint256` سے آگے ڈیٹا ڈھانچے کو سپورٹ نہیں کرتا، لہذا جب آپ کسی زیادہ نفیس ڈیٹا ڈھانچے کا حوالہ دیتے ہیں، جیسے میموری بفر `_bytes`، تو آپ کو اس ڈھانچے کا ایڈریس ملتا ہے۔ Solidity `bytes memory` ویلیوز کو 32 بائٹ ورڈ کے طور پر اسٹور کرتا ہے جس میں لمبائی ہوتی ہے، اس کے بعد اصل بائٹس ہوتے ہیں، لہذا بائٹ نمبر `_start` حاصل کرنے کے لیے ہمیں `_bytes+32+_start` کا حساب لگانے کی ضرورت ہے۔

```solidity

        return tempUint;
    }     // toUint256

    // fourParams() کے لیے فنکشن کا دستخط، بشکریہ
    // https://www.4byte.directory/signatures/?bytes4_signature=0x3edc1e6d
    bytes4 constant FOUR_PARAMS = 0x3edc1e6d;

    // صرف کچھ مستقل ویلیوز یہ دیکھنے کے لیے کہ ہمیں صحیح ویلیوز واپس مل رہی ہیں
    uint256 constant VAL_A = 0xDEAD60A7;
    uint256 constant VAL_B =     0xBEEF;
    uint256 constant VAL_C =     0x600D;
    uint256 constant VAL_D = 0x600D60A7;
```

جانچ کے لیے ہمیں کچھ مستقل کی ضرورت ہے۔

```solidity
    function testReadParam() public {
```

`fourParams()` کو کال کریں، ایک فنکشن جو `readParams` استعمال کرتا ہے، یہ جانچنے کے لیے کہ ہم پیرامیٹرز کو صحیح طریقے سے پڑھ سکتے ہیں۔

```solidity
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;
```

ہم کیش کا استعمال کرتے ہوئے کسی فنکشن کو کال کرنے کے لیے عام ABI میکانزم کا استعمال نہیں کر سکتے، اس لیے ہمیں نچلی سطح کے [`<address>.call()`](https://docs.soliditylang.org/en/v0.8.16/types.html#members-of-addresses) میکانزم کا استعمال کرنے کی ضرورت ہے۔ وہ میکانزم ان پٹ کے طور پر ایک `bytes memory` لیتا ہے، اور اسے (ساتھ ہی ایک بولین ویلیو) آؤٹ پٹ کے طور پر واپس کرتا ہے۔

```solidity
        // پہلی کال، کیش خالی ہے
        _callInput = bytes.concat(
            FOUR_PARAMS,
```

ایک ہی کنٹریکٹ کے لیے کیشڈ فنکشنز (براہ راست ٹرانزیکشنز سے کالز کے لیے) اور نان-کیشڈ فنکشنز (دیگر اسمارٹ کنٹریکٹس سے کالز کے لیے) دونوں کو سپورٹ کرنا مفید ہے۔ ایسا کرنے کے لیے ہمیں صحیح فنکشن کو کال کرنے کے لیے Solidity میکانزم پر انحصار جاری رکھنے کی ضرورت ہے، بجائے اس کے کہ ہر چیز کو [ایک `فال بیک` فنکشن](https://docs.soliditylang.org/en/v0.8.16/contracts.html#fallback-function) میں ڈالیں۔ ایسا کرنے سے کمپوزیبلیٹی بہت آسان ہو جاتی ہے۔ زیادہ تر معاملات میں فنکشن کی شناخت کے لیے ایک بائٹ کافی ہوگا، اس لیے ہم تین بائٹس (16\*3=48 گیس) ضائع کر رہے ہیں۔ تاہم، جیسا کہ میں یہ لکھ رہا ہوں ان 48 گیس کی قیمت 0.07 سینٹ ہے، جو آسان، کم بگ والے، کوڈ کے لیے ایک معقول قیمت ہے۔

```solidity
            // پہلی ویلیو، اسے کیش میں شامل کریں
            cache.INTO_CACHE(),
            bytes32(VAL_A),
```

پہلی ویلیو: ایک جھنڈا جو کہتا ہے کہ یہ ایک مکمل ویلیو ہے جسے کیش میں لکھنے کی ضرورت ہے، اس کے بعد ویلیو کے 32 بائٹس۔ دیگر تین ویلیوز بھی اسی طرح کی ہیں، سوائے اس کے کہ `VAL_B` کو کیش میں نہیں لکھا گیا اور `VAL_C` تیسرا پیرامیٹر اور چوتھا پیرامیٹر دونوں ہے۔

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

ہمیں امید ہے کہ کال کامیاب ہوگی۔

```solidity
        assertEq(cache.cacheRead(1), VAL_A);
        assertEq(cache.cacheRead(2), VAL_C);
```

ہم ایک خالی کیش سے شروع کرتے ہیں اور پھر `VAL_A` کے بعد `VAL_C` شامل کرتے ہیں۔ ہم توقع کریں گے کہ پہلے والے کی کی (key) 1 ہوگی، اور دوسرے والے کی 2 ہوگی۔

```
        assertEq(toUint256(_callOutput,0), VAL_A);
        assertEq(toUint256(_callOutput,32), VAL_B);
        assertEq(toUint256(_callOutput,64), VAL_C);
        assertEq(toUint256(_callOutput,96), VAL_C);
```

آؤٹ پٹ چار پیرامیٹرز ہیں۔ یہاں ہم اس بات کی تصدیق کرتے ہیں کہ یہ درست ہے۔

```solidity
        // دوسری کال، ہم کیش کا استعمال کر سکتے ہیں
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // کیش میں پہلی ویلیو
            bytes1(0x01),
```

16 سے نیچے کیش کیز (keys) صرف ایک بائٹ کی ہوتی ہیں۔

```solidity
            // دوسری ویلیو، اسے کیش میں شامل نہ کریں
            cache.DONT_CACHE(),
            bytes32(VAL_B),

            // تیسری اور چوتھی ویلیوز، ایک ہی ویلیو
            bytes1(0x02),
            bytes1(0x02)
        );
        .
        .
        .
    }   // testReadParam
```

کال کے بعد کے ٹیسٹ پہلی کال کے بعد کے ٹیسٹوں کی طرح ہیں۔

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
    }   // testEncodeVal
```

`testEncodeVal()` میں واحد اضافی ٹیسٹ یہ تصدیق کرنا ہے کہ `_callInput` کی لمبائی درست ہے۔ پہلی کال کے لیے یہ 4+33\*4 ہے۔ دوسرے کے لیے، جہاں ہر ویلیو پہلے سے ہی کیش میں ہے، یہ 4+1\*4 ہے۔

```solidity
    // encodeVal کی جانچ کریں جب کی (key) ایک بائٹ سے زیادہ ہو
    // زیادہ سے زیادہ تین بائٹس کیونکہ کیش کو چار بائٹس تک بھرنے میں
    // بہت زیادہ وقت لگتا ہے۔
    function testEncodeValBig() public {
        // کیش میں کئی ویلیوز ڈالیں۔
        // چیزوں کو آسان رکھنے کے لیے، ویلیو n کے لیے کی (key) n استعمال کریں۔
        for(uint i=1; i<0x1FFF; i++) {
            cache.cacheWrite(i);
        }
```

اوپر `testEncodeVal` فنکشن کیش میں صرف چار ویلیوز لکھتا ہے، اس لیے [فنکشن کا وہ حصہ جو ملٹی بائٹ ویلیوز سے نمٹتا ہے](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/Cache.sol#L144-L171) چیک نہیں کیا جاتا ہے۔ لیکن وہ کوڈ پیچیدہ اور غلطی کا شکار ہے۔

اس فنکشن کا پہلا حصہ ایک لوپ ہے جو 1 سے 0x1FFF تک کی تمام ویلیوز کو ترتیب سے کیش میں لکھتا ہے، لہذا ہم ان ویلیوز کو انکوڈ کر سکیں گے اور جان سکیں گے کہ وہ کہاں جا رہی ہیں۔

```solidity
        .
        .
        .

        _callInput = bytes.concat(
            FOUR_PARAMS,
            cache.encodeVal(0x000F),   // ایک بائٹ        0x0F
            cache.encodeVal(0x0010),   // دو بائٹس     0x1010
            cache.encodeVal(0x0100),   // دو بائٹس     0x1100
            cache.encodeVal(0x1000)    // تین بائٹس 0x201000
        );
```

ایک بائٹ، دو بائٹ، اور تین بائٹ ویلیوز کی جانچ کریں۔ ہم اس سے آگے کی جانچ نہیں کرتے ہیں کیونکہ کافی اسٹیک اندراجات لکھنے میں بہت زیادہ وقت لگے گا (کم از کم 0x10000000، تقریباً ایک چوتھائی ارب)۔

```solidity
        .
        .
        .
        .
    }    // testEncodeValBig


    // ٹیسٹ کریں کہ ضرورت سے زیادہ چھوٹے بفر کے ساتھ ہمیں ایک ریورٹ ملتا ہے
    function testShortCalldata() public {
```

جانچ کریں کہ غیر معمولی صورت میں کیا ہوتا ہے جہاں کافی پیرامیٹرز نہیں ہوتے ہیں۔

```solidity
        .
        .
        .
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, false);
    }   // testShortCalldata
```

چونکہ یہ ریورٹ ہوتا ہے، اس لیے ہمیں جو نتیجہ ملنا چاہیے وہ `غلط` ہے۔

```
    // کیش کیز (keys) کے ساتھ کال کریں جو وہاں نہیں ہیں
    function testNoCacheKey() public {
        .
        .
        .
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // پہلی ویلیو، اسے کیش میں شامل کریں
            cache.INTO_CACHE(),
            bytes32(VAL_A),

            // دوسری ویلیو
            bytes1(0x0F),
            bytes2(0x1234),
            bytes11(0xA10102030405060708090A)
        );
```

یہ فنکشن چار بالکل جائز پیرامیٹرز حاصل کرتا ہے، سوائے اس کے کہ کیش خالی ہے لہذا وہاں پڑھنے کے لیے کوئی ویلیو نہیں ہے۔

```solidity
        .
        .
        .
    // ٹیسٹ کریں کہ ضرورت سے زیادہ لمبے بفر کے ساتھ سب کچھ فائل کام کرتا ہے
    function testLongCalldata() public {
        address _cacheAddr = address(cache);
        bool _success;
        bytes memory _callInput;
        bytes memory _callOutput;

        // پہلی کال، کیش خالی ہے
        _callInput = bytes.concat(
            FOUR_PARAMS,

            // پہلی ویلیو، اسے کیش میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_A),

            // دوسری ویلیو، اسے کیش میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_B),

            // تیسری ویلیو، اسے کیش میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_C),

            // چوتھی ویلیو، اسے کیش میں شامل کریں
            cache.INTO_CACHE(), bytes32(VAL_D),

            // اور "اچھی قسمت" کے لیے ایک اور ویلیو
            bytes4(0x31112233)
        );
```

یہ فنکشن پانچ ویلیوز بھیجتا ہے۔ ہم جانتے ہیں کہ پانچویں ویلیو کو نظر انداز کر دیا جاتا ہے کیونکہ یہ ایک درست کیش انٹری نہیں ہے، جو اگر شامل نہ کی جاتی تو ریورٹ کا سبب بنتی۔

```solidity
        (_success, _callOutput) = _cacheAddr.call(_callInput);
        assertEq(_success, true);
        .
        .
        .
    }   // testLongCalldata

}        // CacheTest

```

## ایک نمونہ ایپلی کیشن {#a-sample-app}

Solidity میں ٹیسٹ لکھنا بہت اچھا ہے، لیکن دن کے آخر میں ایک dapp کو مفید ہونے کے لیے چین کے باہر سے درخواستوں پر کارروائی کرنے کے قابل ہونا چاہیے۔ یہ مضمون یہ ظاہر کرتا ہے کہ `WORM` کے ساتھ dapp میں کیشنگ کا استعمال کیسے کیا جائے، جس کا مطلب ہے "ایک بار لکھیں، کئی بار پڑھیں"۔ اگر کوئی کی (key) ابھی تک نہیں لکھی گئی ہے، تو آپ اس میں ایک ویلیو لکھ سکتے ہیں۔ اگر کی (key) پہلے سے لکھی ہوئی ہے، تو آپ کو ایک ریورٹ ملتا ہے۔

### کنٹریکٹ {#the-contract}

[یہ کنٹریکٹ ہے](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/src/WORM.sol)۔ یہ زیادہ تر وہی دہراتا ہے جو ہم نے `Cache` اور `CacheTest` کے ساتھ پہلے ہی کیا ہے، لہذا ہم صرف ان حصوں کا احاطہ کرتے ہیں جو دلچسپ ہیں۔

```solidity
import "./Cache.sol";

contract WORM is Cache {
```

`Cache` استعمال کرنے کا سب سے آسان طریقہ یہ ہے کہ اسے اپنے کنٹریکٹ میں وراثت میں حاصل کریں۔

```solidity
    function writeEntryCached() external {
        uint[] memory params = _readParams(2);
        writeEntry(params[0], params[1]);
    }    // writeEntryCached
```

یہ فنکشن اوپر `CacheTest` میں `fourParam` سے ملتا جلتا ہے۔ چونکہ ہم ABI کی تفصیلات پر عمل نہیں کرتے ہیں، اس لیے بہتر ہے کہ فنکشن میں کوئی پیرامیٹر نہ ڈکلیئر کریں۔

```solidity
    // ہمیں کال کرنا آسان بنائیں
    // writeEntryCached() کے لیے فنکشن کا دستخط، بشکریہ
    // https://www.4byte.directory/signatures/?bytes4_signature=0xe4e4f2d3
    bytes4 constant public WRITE_ENTRY_CACHED = 0xe4e4f2d3;
```

بیرونی کوڈ جو `writeEntryCached` کو کال کرتا ہے، اسے دستی طور پر کال ڈیٹا بنانا ہوگا، بجائے اس کے کہ `worm.writeEntryCached` استعمال کیا جائے، کیونکہ ہم ABI کی تفصیلات پر عمل نہیں کرتے ہیں۔ اس مستقل ویلیو کا ہونا اسے لکھنا آسان بنا دیتا ہے۔

نوٹ کریں کہ اگرچہ ہم `WRITE_ENTRY_CACHED` کو ایک اسٹیٹ ویری ایبل کے طور پر بیان کرتے ہیں، اسے بیرونی طور پر پڑھنے کے لیے اس کے لیے گیٹر فنکشن، `worm.WRITE_ENTRY_CACHED()` کا استعمال کرنا ضروری ہے۔

```solidity
    function readEntry(uint key) public view
        returns (uint _value, address _writtenBy, uint _writtenAtBlock)
```

ریڈ فنکشن ایک `view` ہے، لہذا اسے ٹرانزیکشن کی ضرورت نہیں ہے اور اس پر کوئی گیس لاگت نہیں آتی ہے۔ نتیجے کے طور پر، پیرامیٹر کے لیے کیش استعمال کرنے کا کوئی فائدہ نہیں ہے۔ ویو فنکشنز کے ساتھ معیاری میکانزم کا استعمال کرنا بہتر ہے جو آسان ہے۔

### جانچ کا کوڈ {#the-testing-code}

[یہ کنٹریکٹ کے لیے جانچ کا کوڈ ہے](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/test/WORM.t.sol)۔ ایک بار پھر، آئیے صرف اس پر نظر ڈالتے ہیں جو دلچسپ ہے۔

```solidity
    function testWReadWrite() public {
        worm.writeEntry(0xDEAD, 0x60A7);

        vm.expectRevert(bytes("انٹری پہلے ہی لکھی جا چکی ہے"));
        worm.writeEntry(0xDEAD, 0xBEEF);
```

[یہ (`vm.expectRevert`)](https://book.getfoundry.sh/cheatcodes/expect-revert#expectrevert) ہے کہ ہم Foundry ٹیسٹ میں کیسے بتاتے ہیں کہ اگلی کال ناکام ہونی چاہیے، اور ناکامی کی اطلاع دی گئی وجہ۔ یہ اس وقت لاگو ہوتا ہے جب ہم `<contract>.<function name>` کا نحو استعمال کرتے ہیں()` بجائے اس کے کہ کال ڈیٹا بنایا جائے اور کنٹریکٹ کو نچلی سطح کے انٹرفیس (`<contract>.call()`، وغیرہ) کا استعمال کرکے کال کیا جائے۔

```solidity
    function testReadWriteCached() public {
        uint cacheGoat = worm.cacheWrite(0x60A7);
```

یہاں ہم اس حقیقت کا استعمال کرتے ہیں کہ `cacheWrite` کیش کی (key) واپس کرتا ہے۔ یہ ایسی چیز نہیں ہے جس کی ہم پیداوار میں استعمال کی توقع کریں گے، کیونکہ `cacheWrite` اسٹیٹ کو تبدیل کرتا ہے، اور اس لیے اسے صرف ٹرانزیکشن کے دوران ہی کال کیا جا سکتا ہے۔ ٹرانزیکشنز میں واپسی کی ویلیوز نہیں ہوتی ہیں، اگر ان کے نتائج ہوتے ہیں تو ان نتائج کو ایونٹس کے طور پر خارج کیا جانا چاہیے۔ لہذا `cacheWrite` کی واپسی کی ویلیو صرف آن چین کوڈ سے قابل رسائی ہے، اور آن چین کوڈ کو پیرامیٹر کیشنگ کی ضرورت نہیں ہے۔

```solidity
        (_success,) = address(worm).call(_callInput);
```

یہ ہے کہ ہم Solidity کو کیسے بتاتے ہیں کہ جب کہ `<contract address>.call()` کی دو واپسی کی ویلیوز ہیں، ہم صرف پہلی کی پرواہ کرتے ہیں۔

```solidity
        (_success,) = address(worm).call(_callInput);
        assertEq(_success, false);
```

چونکہ ہم نچلی سطح کے `<address>.call()` فنکشن کا استعمال کرتے ہیں، اس لیے ہم `vm.expectRevert()` کا استعمال نہیں کر سکتے اور ہمیں کال سے ملنے والی بولین کامیابی کی ویلیو کو دیکھنا ہوگا۔

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

یہ وہ طریقہ ہے جس سے ہم تصدیق کرتے ہیں کہ کوڈ Foundry میں [ایک ایونٹ کو صحیح طریقے سے خارج کرتا ہے](https://getfoundry.sh/reference/cheatcodes/expect-emit/)۔

### کلائنٹ {#the-client}

ایک چیز جو آپ کو Solidity ٹیسٹوں کے ساتھ نہیں ملتی ہے وہ ہے JavaScript کوڈ جسے آپ اپنی ایپلی کیشن میں کاٹ اور پیسٹ کر سکتے ہیں۔ اس کوڈ کو لکھنے کے لیے میں نے WORM کو [Optimism Goerli](https://community.optimism.io/docs/useful-tools/networks/#optimism-goerli) پر تعینات کیا، [Optimism](https://www.optimism.io/) کا نیا ٹیسٹ نیٹ۔ یہ ایڈریس [`0xd34335b1d818cee54e3323d3246bd31d94e6a78a`](https://goerli-optimism.etherscan.io/address/0xd34335b1d818cee54e3323d3246bd31d94e6a78a) پر ہے۔

[آپ یہاں کلائنٹ کے لیے JavaScript کوڈ دیکھ سکتے ہیں](https://github.com/qbzzt/20220915-all-you-can-cache/blob/main/javascript/index.js)۔ اسے استعمال کرنے کے لیے:

1. گٹ ریپوزٹری کو کلون کریں:

   ```sh
   git clone https://github.com/qbzzt/20220915-all-you-can-cache.git
   ```

2. ضروری پیکیجز انسٹال کریں:

   ```sh
   cd javascript
   yarn
   ```

3. کنفیگریشن فائل کاپی کریں:

   ```sh
   cp .env.example .env
   ```

4. اپنی کنفیگریشن کے لیے `.env` میں ترمیم کریں:

   | پیرامیٹر                                                      | قدر                                                                                                                                                                       |
   | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | MNEMONIC                                                      | ایک اکاؤنٹ کے لیے یادداشت جس میں ٹرانزیکشن کی ادائیگی کے لیے کافی ETH ہو۔ [آپ یہاں Optimism Goerli نیٹ ورک کے لیے مفت ETH حاصل کر سکتے ہیں](https://optimismfaucet.xyz/)۔ |
   | OPTIMISM_GOERLI_URL | Optimism Goerli کا URL۔ عوامی اینڈ پوائنٹ، `https://goerli.optimism.io`، شرح محدود ہے لیکن یہاں ہماری ضرورت کے لیے کافی ہے                                                |

5. `index.js` چلائیں۔

   ```sh
   node index.js
   ```

   یہ نمونہ ایپلی کیشن پہلے WORM میں ایک انٹری لکھتی ہے، کال ڈیٹا اور Etherscan پر ٹرانزیکشن کا لنک دکھاتی ہے۔ پھر یہ اس انٹری کو واپس پڑھتا ہے، اور اس کی استعمال کردہ کی (key) اور انٹری میں ویلیوز (ویلیو، بلاک نمبر، اور مصنف) دکھاتا ہے۔

زیادہ تر کلائنٹ عام Dapp JavaScript ہے۔ تو ایک بار پھر ہم صرف دلچسپ حصوں پر جائیں گے۔

```javascript
.
.
.
const main = async () => {
    const func = await worm.WRITE_ENTRY_CACHED()

    // ہر بار ایک نئی کی (key) کی ضرورت ہے
    const key = await worm.encodeVal(Number(new Date()))
```

ایک دیئے گئے سلاٹ میں صرف ایک بار لکھا جا سکتا ہے، لہذا ہم ٹائم اسٹیمپ کا استعمال کرتے ہیں تاکہ یہ یقینی بنایا جا سکے کہ ہم سلاٹس کو دوبارہ استعمال نہ کریں۔

```javascript
const val = await worm.encodeVal("0x600D")

// ایک انٹری لکھیں
const calldata = func + key.slice(2) + val.slice(2)
```

Ethers توقع کرتا ہے کہ کال ڈیٹا ایک ہیکس سٹرنگ ہوگا، `0x` کے بعد ہیکساڈیسیمل ہندسوں کی ایک جفت تعداد۔ چونکہ `key` اور `val` دونوں `0x` سے شروع ہوتے ہیں، ہمیں ان ہیڈرز کو ہٹانے کی ضرورت ہے۔

```javascript
const tx = await worm.populateTransaction.writeEntryCached()
tx.data = calldata

sentTx = await wallet.sendTransaction(tx)
```

جیسا کہ Solidity ٹیسٹنگ کوڈ کے ساتھ ہے، ہم عام طور پر کیشڈ فنکشن کو کال نہیں کر سکتے۔ اس کے بجائے، ہمیں نچلی سطح کے میکانزم کا استعمال کرنے کی ضرورت ہے۔

```javascript
    .
    .
    .
    // ابھی لکھی گئی انٹری کو پڑھیں
    const realKey = '0x' + key.slice(4)  // FF فلیگ کو ہٹائیں
    const entryRead = await worm.readEntry(realKey)
    .
    .
    .
```

انٹریز پڑھنے کے لیے ہم عام میکانزم کا استعمال کر سکتے ہیں۔ `view` فنکشنز کے ساتھ پیرامیٹر کیشنگ استعمال کرنے کی ضرورت نہیں ہے۔

## نتیجہ {#conclusion}

اس مضمون میں کوڈ تصور کا ثبوت ہے، مقصد اس خیال کو سمجھنے میں آسان بنانا ہے۔ پیداوار کے لیے تیار نظام کے لیے آپ کو کچھ اضافی فعالیت نافذ کرنے کی ضرورت پڑ سکتی ہے:

- ان ویلیوز کو ہینڈل کریں جو `uint256` نہیں ہیں۔ مثال کے طور پر، سٹرنگز۔
- عالمی کیش کے بجائے، شاید صارفین اور کیشز کے درمیان ایک میپنگ ہو۔ مختلف صارفین مختلف ویلیوز استعمال کرتے ہیں۔
- ایڈریسز کے لیے استعمال ہونے والی ویلیوز دیگر مقاصد کے لیے استعمال ہونے والی ویلیوز سے الگ ہیں۔ صرف ایڈریسز کے لیے ایک علیحدہ کیش رکھنا سمجھ میں آ سکتا ہے۔
- فی الحال، کیش کیز (keys) "پہلے آؤ، سب سے چھوٹی کی (key)" الگورتھم پر ہیں۔ پہلی سولہ ویلیوز کو ایک بائٹ کے طور پر بھیجا جا سکتا ہے۔ اگلی 4080 ویلیوز کو دو بائٹس کے طور پر بھیجا جا سکتا ہے۔ اگلی تقریباً ملین ویلیوز تین بائٹس ہیں، وغیرہ۔ ایک پروڈکشن سسٹم کو کیش اندراجات پر استعمال کے کاؤنٹرز رکھنے چاہئیں اور انہیں دوبارہ منظم کرنا چاہیے تاکہ سولہ _سب سے عام_ ویلیوز ایک بائٹ ہوں، اگلی 4080 سب سے عام ویلیوز دو بائٹس ہوں، وغیرہ۔

  تاہم، یہ ایک ممکنہ طور پر خطرناک آپریشن ہے۔ مندرجہ ذیل واقعات کی ترتیب کا تصور کریں:

  1. نوآم نائیو ٹوکن بھیجنے کے لیے ایڈریس کو انکوڈ کرنے کے لیے `encodeVal` کو کال کرتا ہے۔ وہ ایڈریس ایپلی کیشن پر استعمال ہونے والے پہلے ایڈریسز میں سے ایک ہے، اس لیے انکوڈ شدہ ویلیو 0x06 ہے۔ یہ ایک `view` فنکشن ہے، ٹرانزیکشن نہیں، اس لیے یہ نوآم اور اس کے استعمال کردہ نوڈ کے درمیان ہے، اور کوئی اور اس کے بارے میں نہیں جانتا

  2. اوون اونر کیش ری آرڈرنگ آپریشن چلاتا ہے۔ بہت کم لوگ اصل میں اس ایڈریس کا استعمال کرتے ہیں، لہذا اب اسے 0x201122 کے طور پر انکوڈ کیا گیا ہے۔ ایک مختلف ویلیو، 10<sup>18</sup>، کو 0x06 تفویض کیا گیا ہے۔

  3. نوآم نائیو اپنے ٹوکنز 0x06 پر بھیجتا ہے۔ وہ ایڈریس `0x0000000000000000000000000de0b6b3a7640000` پر جاتے ہیں، اور چونکہ کوئی بھی اس ایڈریس کی پرائیویٹ کی (key) نہیں جانتا، وہ وہیں پھنس جاتے ہیں۔ نوآم _خوش نہیں_ ہے۔

  اس مسئلے کو حل کرنے کے طریقے ہیں، اور کیش کی دوبارہ ترتیب کے دوران میم پول میں موجود ٹرانزیکشنز کے متعلقہ مسئلے کو بھی، لیکن آپ کو اس سے آگاہ ہونا چاہیے۔

میں نے یہاں Optimism کے ساتھ کیشنگ کا مظاہرہ کیا، کیونکہ میں ایک Optimism ملازم ہوں اور یہ وہ رول اپ ہے جسے میں سب سے بہتر جانتا ہوں۔ لیکن اسے کسی بھی ایسے رول اپ کے ساتھ کام کرنا چاہیے جو اندرونی پروسیسنگ کے لیے کم سے کم لاگت وصول کرتا ہو، تاکہ اس کے مقابلے میں L1 پر ٹرانزیکشن ڈیٹا لکھنا بڑا خرچ ہو۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔

