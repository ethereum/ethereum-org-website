---
title: "ریکرسیو-لینتھ پریفکس (RLP) سیریلائزیشن"
description: "Ethereum کی ایگزیکیوشن لیئر میں rlp انکوڈنگ کی ایک تعریف۔"
lang: ur-in
sidebarDepth: 2
---

ریکرسیو لینتھ پریفکس (RLP) سیریلائزیشن کا استعمال Ethereum کے ایگزیکیوشن کلائنٹس میں بڑے پیمانے پر کیا جاتا ہے۔ RLP نوڈز کے درمیان ڈیٹا کی منتقلی کو ایک اسپیس-ایفیشینٹ فارمیٹ میں معیاری بناتا ہے۔ RLP کا مقصد بائنری ڈیٹا کی من مانی طور پر نیسٹڈ اریز کو انکوڈ کرنا ہے، اور RLP Ethereum کی ایگزیکیوشن لیئر میں آبجیکٹس کو سیریلائز کرنے کے لیے استعمال ہونے والا بنیادی انکوڈنگ طریقہ ہے۔ RLP کا بنیادی مقصد اسٹرکچر کو انکوڈ کرنا ہے؛ مثبت انٹیجرز کے علاوہ، RLP مخصوص ڈیٹا کی اقسام (مثلاً، سٹرنگز، فلوٹس) کی انکوڈنگ کو ہائیر-آرڈر پروٹوکولز کو تفویض کرتا ہے۔ مثبت انٹیجرز کی نمائندگی بگ-اینڈین بائنری فارم میں بغیر کسی لیڈنگ زیرو کے کی جانی چاہئے (اس طرح انٹیجر ویلیو صفر کو خالی بائٹ اری کے برابر بناتا ہے)۔ لیڈنگ زیرو والے ڈی سیریلائزڈ مثبت انٹیجرز کو RLP استعمال کرنے والے کسی بھی ہائیر-آرڈر پروٹوکول کے ذریعہ غلط سمجھا جانا چاہئے۔

مزید معلومات [ایتھیریم ییلو پیپر (اپینڈکس B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19) میں۔

ایک ڈکشنری کو انکوڈ کرنے کے لئے RLP کا استعمال کرنے کے لئے، دو تجویز کردہ کینونیکل فارمز ہیں:

- `[[k1,v1],[k2,v2]...]` کا استعمال کریں جس میں کیز لیکسیکوگرافک آرڈر میں ہوں۔
- ہائیر-لیول پیٹریشیا ٹری انکوڈنگ کا استعمال کریں جیسا کہ Ethereum کرتا ہے۔

## تعریف {#definition}

RLP انکوڈنگ فنکشن ایک آئٹم لیتا ہے۔ ایک آئٹم کی تعریف اس طرح ہے:

- ایک سٹرنگ (یعنی بائٹ اری) ایک آئٹم ہے
- آئٹمز کی ایک لسٹ ایک آئٹم ہے
- ایک مثبت انٹیجر ایک آئٹم ہے

مثال کے طور پر، مندرجہ ذیل تمام آئٹمز ہیں:

- ایک خالی سٹرنگ؛
- لفظ "cat" پر مشتمل سٹرنگ؛
- کسی بھی تعداد میں سٹرنگز پر مشتمل ایک لسٹ؛
- اور مزید پیچیدہ ڈیٹا اسٹرکچرز جیسے `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`۔
- نمبر `100`

نوٹ کریں کہ اس صفحے کے باقی حصے کے سیاق و سباق میں، 'سٹرنگ' کا مطلب ہے "بائنری ڈیٹا کے بائٹس کی ایک خاص تعداد"؛ کوئی خاص انکوڈنگ استعمال نہیں کی جاتی ہے، اور سٹرنگز کے مواد کے بارے میں کسی علم کا مطلب نہیں ہے (سوائے اس کے کہ غیر کم از کم مثبت انٹیجرز کے خلاف اصول کے مطابق ضرورت ہو)۔

RLP انکوڈنگ کی تعریف اس طرح ہے:

- ایک مثبت انٹیجر کے لیے، اسے سب سے چھوٹی بائٹ اری میں تبدیل کیا جاتا ہے جس کی بگ-اینڈین تشریح انٹیجر ہے، اور پھر نیچے دیے گئے اصولوں کے مطابق ایک سٹرنگ کے طور پر انکوڈ کیا جاتا ہے۔
- ایک واحد بائٹ کے لیے جس کی ویلیو `[0x00, 0x7f]` (ڈیسیمل `[0, 127]`) رینج میں ہے، وہ بائٹ خود اس کی RLP انکوڈنگ ہے۔
- بصورت دیگر، اگر کوئی سٹرنگ 0-55 بائٹس لمبی ہے، تو RLP انکوڈنگ ایک واحد بائٹ پر مشتمل ہوتی ہے جس کی ویلیو **0x80** (ڈیسیمل 128) ہوتی ہے، اور اس کے بعد سٹرنگ کی لمبائی اور پھر سٹرنگ آتی ہے۔ اس طرح پہلے بائٹ کی رینج `[0x80, 0xb7]` (ڈیسیمل `[128, 183]`) ہے۔
- اگر کوئی سٹرنگ 55 بائٹس سے زیادہ لمبی ہے، تو RLP انکوڈنگ **0xb7** (ڈیسیمل 183) کی ویلیو کے ساتھ ایک واحد بائٹ پر مشتمل ہوتی ہے، اور اس کے بعد بائنری فارم میں سٹرنگ کی لمبائی کی بائٹس میں لمبائی، پھر سٹرنگ کی لمبائی، اور پھر سٹرنگ آتی ہے۔ مثال کے طور پر، ایک 1024 بائٹ لمبی سٹرنگ کو `\xb9\x04\x00` (ڈیسیمل `185, 4, 0`) کے طور پر انکوڈ کیا جائے گا جس کے بعد سٹرنگ آئے گی۔ یہاں، `0xb9` (183 + 2 = 185) پہلے بائٹ کے طور پر ہے، جس کے بعد 2 بائٹس `0x0400` (ڈیسیمل 1024) آتے ہیں جو اصل سٹرنگ کی لمبائی کو ظاہر کرتے ہیں۔ اس طرح پہلے بائٹ کی رینج `[0xb8, 0xbf]` (ڈیسیمل `[184, 191]`) ہے۔
- اگر کوئی سٹرنگ 2^64 بائٹس لمبی، یا اس سے زیادہ لمبی ہے، تو اسے انکوڈ نہیں کیا جا سکتا۔
- اگر کسی لسٹ کا کل پے لوڈ (یعنی، اس کے تمام آئٹمز کی مشترکہ لمبائی جنہیں RLP انکوڈ کیا جا رہا ہے) 0-55 بائٹس لمبا ہے، تو RLP انکوڈنگ **0xc0** کی ویلیو کے ساتھ ایک واحد بائٹ پر مشتمل ہوتی ہے، اور اس کے بعد پے لوڈ کی لمبائی اور پھر آئٹمز کی RLP انکوڈنگز کا کنکیٹنیشن آتا ہے۔ اس طرح پہلے بائٹ کی رینج `[0xc0, 0xf7]` (ڈیسیمل `[192, 247]`) ہے۔
- اگر کسی لسٹ کا کل پے لوڈ 55 بائٹس سے زیادہ لمبا ہے، تو RLP انکوڈنگ **0xf7** کی ویلیو کے ساتھ ایک واحد بائٹ پر مشتمل ہوتی ہے، اور اس کے بعد بائنری فارم میں پے لوڈ کی لمبائی کی بائٹس میں لمبائی، پھر پے لوڈ کی لمبائی، اور پھر آئٹمز کی RLP انکوڈنگز کا کنکیٹنیشن آتا ہے۔ اس طرح پہلے بائٹ کی رینج `[0xf8, 0xff]` (ڈیسیمل `[248, 255]`) ہے۔

کوڈ میں، یہ ہے:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## مثالیں {#examples}

- سٹرنگ "dog" = [ 0x83, 'd', 'o', 'g' ]
- لسٹ [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- خالی سٹرنگ ('null') = `[ 0x80 ]`
- خالی لسٹ = `[ 0xc0 ]`
- انٹیجر 0 = `[ 0x80 ]`
- بائٹ '\\x00' = `[ 0x00 ]`
- بائٹ '\\x0f' = `[ 0x0f ]`
- بائٹس '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- تین کی [سیٹ تھیوریٹیکل نمائندگی](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)، `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- سٹرنگ "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` `, 'e', 'l', 'i', 't' ]`

## RLP ڈی کوڈنگ {#rlp-decoding}

RLP انکوڈنگ کے اصولوں اور عمل کے مطابق، RLP ڈی کوڈ کے ان پٹ کو بائنری ڈیٹا کا ایک اری سمجھا جاتا ہے۔ RLP ڈی کوڈنگ کا عمل اس طرح ہے:

1. ان پٹ ڈیٹا کے پہلے بائٹ (یعنی پریفکس) کے مطابق ڈیٹا کی قسم، اصل ڈیٹا کی لمبائی اور آفسیٹ کو ڈی کوڈ کرنا؛

2. ڈیٹا کی قسم اور آفسیٹ کے مطابق، ڈیٹا کو اسی کے مطابق ڈی کوڈ کریں، مثبت انٹیجرز کے لئے کم از کم انکوڈنگ کے اصول کا احترام کرتے ہوئے؛

3. باقی ان پٹ کو ڈی کوڈ کرنا جاری رکھیں؛

ان میں سے، ڈیٹا کی اقسام اور آفسیٹ کو ڈی کوڈ کرنے کے اصول اس طرح ہیں:

1. ڈیٹا ایک سٹرنگ ہے اگر پہلے بائٹ (یعنی پریفکس) کی رینج [0x00, 0x7f] ہے، اور سٹرنگ خود بالکل پہلا بائٹ ہے؛

2. ڈیٹا ایک سٹرنگ ہے اگر پہلے بائٹ کی رینج [0x80, 0xb7] ہے، اور وہ سٹرنگ جس کی لمبائی پہلے بائٹ مائنس 0x80 کے برابر ہے پہلے بائٹ کے بعد آتی ہے؛

3. ڈیٹا ایک سٹرنگ ہے اگر پہلے بائٹ کی رینج [0xb8, 0xbf] ہے، اور سٹرنگ کی لمبائی جس کی بائٹس میں لمبائی پہلے بائٹ مائنس 0xb7 کے برابر ہے پہلے بائٹ کے بعد آتی ہے، اور سٹرنگ، سٹرنگ کی لمبائی کے بعد آتی ہے؛

4. ڈیٹا ایک لسٹ ہے اگر پہلے بائٹ کی رینج [0xc0, 0xf7] ہے، اور لسٹ کے تمام آئٹمز کی RLP انکوڈنگز کا کنکیٹنیشن جس کا کل پے لوڈ پہلے بائٹ مائنس 0xc0 کے برابر ہے پہلے بائٹ کے بعد آتا ہے؛

5. ڈیٹا ایک لسٹ ہے اگر پہلے بائٹ کی رینج [0xf8, 0xff] ہے، اور لسٹ کا کل پے لوڈ جس کی لمبائی پہلے بائٹ مائنس 0xf7 کے برابر ہے پہلے بائٹ کے بعد آتا ہے، اور لسٹ کے تمام آئٹمز کی RLP انکوڈنگز کا کنکیٹنیشن لسٹ کے کل پے لوڈ کے بعد آتا ہے؛

کوڈ میں، یہ ہے:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## مزید پڑھیں {#further-reading}

- [Ethereum میں RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum انڈر دی ہڈ: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). ACL2 میں Ethereum کا ریکرسیو لینتھ پریفکس۔ arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## متعلقہ موضوعات {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
