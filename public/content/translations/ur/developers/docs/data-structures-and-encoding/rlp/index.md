---
title: "Recursive-length prefix (RLP) سیریلائزیشن"
description: "ایتھریم کی ایگزیکیوشن لیئر میں rlp انکوڈنگ کی تعریف۔"
lang: ur
sidebarDepth: 2
---

Recursive Length Prefix (RLP) سیریلائزیشن کا استعمال ایتھریم کے ایگزیکیوشن کلائنٹس میں وسیع پیمانے پر کیا جاتا ہے۔ RLP نوڈز کے درمیان ڈیٹا کی منتقلی کو ایک اسپیس-ایفیشینٹ (space-efficient) فارمیٹ میں معیاری بناتا ہے۔ RLP کا مقصد بائنری ڈیٹا کی من مانی طور پر نیسٹڈ (nested) ایریز کو انکوڈ کرنا ہے، اور RLP ایتھریم کی ایگزیکیوشن لیئر میں آبجیکٹس کو سیریلائز کرنے کے لیے استعمال ہونے والا بنیادی انکوڈنگ طریقہ ہے۔ RLP کا بنیادی مقصد اسٹرکچر کو انکوڈ کرنا ہے؛ مثبت انٹیجرز (positive integers) کے علاوہ، RLP مخصوص ڈیٹا ٹائپس (جیسے، اسٹرنگز، فلوٹس) کی انکوڈنگ کو ہائیر-آرڈر پروٹوکولز کے حوالے کر دیتا ہے۔ مثبت انٹیجرز کو بغیر کسی لیڈنگ زیروز (leading zeroes) کے بگ-اینڈین (big-endian) بائنری شکل میں پیش کیا جانا چاہیے (اس طرح انٹیجر ویلیو صفر خالی بائٹ ایری کے برابر ہو جاتی ہے)۔ لیڈنگ زیروز کے ساتھ ڈی سیریلائزڈ (deserialized) مثبت انٹیجرز کو RLP استعمال کرنے والے کسی بھی ہائیر-آرڈر پروٹوکول کے ذریعے نامانوس (invalid) سمجھا جانا چاہیے۔

مزید معلومات [ایتھریم یلو پیپر (ضمیمہ B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19) میں۔

ڈکشنری کو انکوڈ کرنے کے لیے RLP کا استعمال کرنے کے لیے، دو تجویز کردہ کینونیکل (canonical) شکلیں یہ ہیں:

- لیکسیکوگرافک (lexicographic) ترتیب میں کیز (keys) کے ساتھ `[[k1,v1],[k2,v2]...]` استعمال کریں
- ہائیر-لیول Patricia Tree انکوڈنگ استعمال کریں جیسا کہ [Ethereum](/) کرتا ہے

## تعریف {#definition}

RLP انکوڈنگ فنکشن ایک آئٹم لیتا ہے۔ ایک آئٹم کی تعریف اس طرح کی گئی ہے:

- ایک اسٹرنگ (یعنی، بائٹ ایری) ایک آئٹم ہے
- آئٹمز کی ایک فہرست ایک آئٹم ہے
- ایک مثبت انٹیجر ایک آئٹم ہے

مثال کے طور پر، درج ذیل تمام آئٹمز ہیں:

- ایک خالی اسٹرنگ؛
- وہ اسٹرنگ جس میں لفظ "cat" شامل ہو؛
- ایک فہرست جس میں کسی بھی تعداد میں اسٹرنگز شامل ہوں؛
- اور ایک زیادہ پیچیدہ ڈیٹا اسٹرکچرز جیسے `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`۔
- نمبر `100`

نوٹ کریں کہ اس صفحے کے باقی حصے کے تناظر میں، 'اسٹرنگ' کا مطلب ہے "بائنری ڈیٹا کے بائٹس کی ایک مخصوص تعداد"؛ کوئی خاص انکوڈنگز استعمال نہیں کی جاتی ہیں، اور اسٹرنگز کے مواد کے بارے میں کسی علم کا اشارہ نہیں دیا گیا ہے (سوائے اس کے جو نان-منیمم مثبت انٹیجرز کے خلاف اصول کے ذریعہ درکار ہے)۔

RLP انکوڈنگ کی تعریف اس طرح کی گئی ہے:

- ایک مثبت انٹیجر کے لیے، اسے مختصر ترین بائٹ ایری میں تبدیل کیا جاتا ہے جس کی بگ-اینڈین تشریح وہ انٹیجر ہے، اور پھر نیچے دیے گئے اصولوں کے مطابق اسے ایک اسٹرنگ کے طور پر انکوڈ کیا جاتا ہے۔
- ایک سنگل بائٹ کے لیے جس کی ویلیو `[0x00, 0x7f]` (ڈیسیمل `[0, 127]`) رینج میں ہے، وہ بائٹ اپنی خود کی RLP انکوڈنگ ہے۔
- بصورت دیگر، اگر ایک اسٹرنگ <span dir="ltr">0-55</span> بائٹس لمبی ہے، تو RLP انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی ویلیو **0x80** (ڈیسیمل 128) پلس اسٹرنگ کی لمبائی اور اس کے بعد اسٹرنگ ہوتی ہے۔ اس طرح پہلے بائٹ کی رینج `[0x80, 0xb7]` (ڈیسیمل `[128, 183]`) ہے۔
- اگر ایک اسٹرنگ 55 بائٹس سے زیادہ لمبی ہے، تو RLP انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی ویلیو **0xb7** (ڈیسیمل 183) پلس بائنری شکل میں اسٹرنگ کی لمبائی کی بائٹس میں لمبائی، اس کے بعد اسٹرنگ کی لمبائی، اور اس کے بعد اسٹرنگ ہوتی ہے۔ مثال کے طور پر، ایک 1024 بائٹ لمبی اسٹرنگ کو `\xb9\x04\x00` (ڈیسیمل `185, 4, 0`) اور اس کے بعد اسٹرنگ کے طور پر انکوڈ کیا جائے گا۔ یہاں، `0xb9` (<span dir="ltr">183 + 2 = 185</span>) پہلے بائٹ کے طور پر، اس کے بعد 2 بائٹس `0x0400` (ڈیسیمل 1024) جو اصل اسٹرنگ کی لمبائی کو ظاہر کرتے ہیں۔ اس طرح پہلے بائٹ کی رینج `[0xb8, 0xbf]` (ڈیسیمل `[184, 191]`) ہے۔
- اگر ایک اسٹرنگ <span dir="ltr">2^64</span> بائٹس لمبی، یا اس سے زیادہ لمبی ہے، تو اسے انکوڈ نہیں کیا جا سکتا۔
- اگر کسی فہرست کا کل پے لوڈ (یعنی، اس کے تمام آئٹمز کی مشترکہ لمبائی جو RLP انکوڈ ہو رہے ہیں) <span dir="ltr">0-55</span> بائٹس لمبا ہے، تو RLP انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی ویلیو **0xc0** پلس پے لوڈ کی لمبائی اور اس کے بعد آئٹمز کی RLP انکوڈنگز کا کنکیٹینیشن (concatenation) ہوتا ہے۔ اس طرح پہلے بائٹ کی رینج `[0xc0, 0xf7]` (ڈیسیمل `[192, 247]`) ہے۔
- اگر کسی فہرست کا کل پے لوڈ 55 بائٹس سے زیادہ لمبا ہے، تو RLP انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی ویلیو **0xf7** پلس بائنری شکل میں پے لوڈ کی لمبائی کی بائٹس میں لمبائی، اس کے بعد پے لوڈ کی لمبائی، اور اس کے بعد آئٹمز کی RLP انکوڈنگز کا کنکیٹینیشن ہوتا ہے۔ اس طرح پہلے بائٹ کی رینج `[0xf8, 0xff]` (ڈیسیمل `[248, 255]`) ہے۔

مختصر شکل میں:

| رینج | بائٹ 1 | بائٹ 2 | ... | بائٹ 9 | بائٹ 10 | مطلب |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | سنگل بائٹ اسٹرنگ |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | شارٹ اسٹرنگ (<span dir="ltr">0-55</span> بائٹس) |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | لانگ اسٹرنگ، لمبائی کے لیے <span dir="ltr">N+1</span> بائٹس، پھر پے لوڈ |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | شارٹ لسٹ (<span dir="ltr">0-55</span> بائٹس) |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | لانگ لسٹ، لمبائی کے لیے <span dir="ltr">N+1</span> بائٹس، پھر پے لوڈ |

- `p` = پے لوڈ
- `n` = لمبائی (پے لوڈ بائٹس کی تعداد)
- `N` = لمبائی-کی-لمبائی کا آفسیٹ (<span dir="ltr">N+1</span> `n` بائٹس پیروی کرتے ہیں)

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

- اسٹرنگ "dog" = [ 0x83, 'd', 'o', 'g' ]
- فہرست [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- خالی اسٹرنگ ('null') = `[ 0x80 ]`
- خالی فہرست = `[ 0xc0 ]`
- انٹیجر 0 = `[ 0x80 ]`
- بائٹ '\\x00' = `[ 0x00 ]`
- بائٹ '\\x0f' = `[ 0x0f ]`
- بائٹس '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- تین کی [سیٹ تھیوریٹیکل نمائندگی](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)، `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- اسٹرنگ "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP ڈی کوڈنگ {#rlp-decoding}

RLP انکوڈنگ کے اصولوں اور عمل کے مطابق، RLP ڈی کوڈ کے ان پٹ کو بائنری ڈیٹا کی ایک ایری کے طور پر سمجھا جاتا ہے۔ RLP ڈی کوڈنگ کا عمل درج ذیل ہے:

1.  ان پٹ ڈیٹا کے پہلے بائٹ (یعنی، پریفکس) اور ڈیٹا ٹائپ کو ڈی کوڈ کرنے کے مطابق، اصل ڈیٹا کی لمبائی اور آفسیٹ؛

2.  ڈیٹا کی ٹائپ اور آفسیٹ کے مطابق، مثبت انٹیجرز کے لیے کم از کم انکوڈنگ اصول کا احترام کرتے ہوئے، ڈیٹا کو اسی مناسبت سے ڈی کوڈ کریں؛

3.  باقی ان پٹ کو ڈی کوڈ کرنا جاری رکھیں؛

ان میں سے، ڈیٹا ٹائپس اور آفسیٹ کو ڈی کوڈ کرنے کے اصول درج ذیل ہیں:

1.  ڈیٹا ایک اسٹرنگ ہے اگر پہلے بائٹ (یعنی، پریفکس) کی رینج [0x00, 0x7f] ہے، اور اسٹرنگ بالکل پہلا بائٹ ہی ہے؛

2.  ڈیٹا ایک اسٹرنگ ہے اگر پہلے بائٹ کی رینج [0x80, 0xb7] ہے، اور وہ اسٹرنگ جس کی لمبائی پہلے بائٹ مائنس 0x80 کے برابر ہے، پہلے بائٹ کے بعد آتی ہے؛

3.  ڈیٹا ایک اسٹرنگ ہے اگر پہلے بائٹ کی رینج [0xb8, 0xbf] ہے، اور اسٹرنگ کی لمبائی جس کی بائٹس میں لمبائی پہلے بائٹ مائنس 0xb7 کے برابر ہے، پہلے بائٹ کے بعد آتی ہے، اور اسٹرنگ اسٹرنگ کی لمبائی کے بعد آتی ہے؛

4.  ڈیٹا ایک فہرست ہے اگر پہلے بائٹ کی رینج [0xc0, 0xf7] ہے، اور فہرست کے تمام آئٹمز کی RLP انکوڈنگز کا کنکیٹینیشن جس کا کل پے لوڈ پہلے بائٹ مائنس 0xc0 کے برابر ہے، پہلے بائٹ کے بعد آتا ہے؛

5.  ڈیٹا ایک فہرست ہے اگر پہلے بائٹ کی رینج [0xf8, 0xff] ہے، اور فہرست کا کل پے لوڈ جس کی لمبائی پہلے بائٹ مائنس 0xf7 کے برابر ہے، پہلے بائٹ کے بعد آتا ہے، اور فہرست کے تمام آئٹمز کی RLP انکوڈنگز کا کنکیٹینیشن فہرست کے کل پے لوڈ کے بعد آتا ہے؛

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

## مزید مطالعہ {#further-reading}

- [ایتھریم میں RLP](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [ایتھریم انڈر دی ہڈ: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## متعلقہ موضوعات {#related-topics}

- [پیٹریشیا مرکل ٹرائی (Patricia merkle trie)](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)