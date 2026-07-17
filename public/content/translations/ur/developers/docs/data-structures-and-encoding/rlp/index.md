---
title: "⁦Recursive-length prefix (RLP)⁩ سلسلہ بندی"
description: "ایتھیریم کی عمل درآمد کی تہہ میں ⁦rlp⁩ انکوڈنگ کی تعریف۔"
lang: ur
sidebarDepth: 2
---

⁦Recursive Length Prefix (RLP)⁩ سلسلہ بندی کا استعمال ایتھیریم کے ایگزیکیوشن کلائنٹس میں وسیع پیمانے پر کیا جاتا ہے۔ ⁦RLP⁩ نوڈز کے درمیان ڈیٹا کی منتقلی کو ایک جگہ بچانے والے (space-efficient) فارمیٹ میں معیاری بناتا ہے۔ ⁦RLP⁩ کا مقصد بائنری ڈیٹا کے من مانے طریقے سے نیسٹڈ (nested) اریز (arrays) کو انکوڈ کرنا ہے، اور ⁦RLP⁩ ایتھیریم کی عمل درآمد کی تہہ میں آبجیکٹس کی سلسلہ بندی کے لیے استعمال ہونے والا بنیادی انکوڈنگ طریقہ ہے۔ ⁦RLP⁩ کا بنیادی مقصد ساخت کو انکوڈ کرنا ہے؛ مثبت اعداد (positive integers) کے علاوہ، ⁦RLP⁩ مخصوص ڈیٹا کی اقسام (جیسے سٹرنگز، فلوٹس) کی انکوڈنگ کو اعلیٰ درجے کے پروٹوکولز کے حوالے کر دیتا ہے۔ مثبت اعداد کو بغیر کسی ابتدائی صفر (leading zeroes) کے بگ اینڈِین بائنری شکل میں پیش کیا جانا چاہیے (اس طرح صفر کی عددی قدر خالی بائٹ ایرے کے برابر ہو جاتی ہے)۔ ⁦RLP⁩ استعمال کرنے والے کسی بھی اعلیٰ درجے کے پروٹوکول کو ابتدائی صفر والے ڈی سیریلائزڈ (deserialized) مثبت اعداد کو نامعتبر (invalid) سمجھنا چاہیے۔

مزید معلومات [ایتھیریم یلو پیپر (ضمیمہ B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19) میں موجود ہیں۔

ڈکشنری کو انکوڈ کرنے کے لیے ⁦RLP⁩ کا استعمال کرتے ہوئے، دو تجویز کردہ مستند (canonical) شکلیں یہ ہیں:

- لغوی ترتیب (lexicographic order) میں کیز (keys) کے ساتھ `[[k1,v1],[k2,v2]...]` استعمال کریں
- اعلیٰ درجے کی پیٹریشیا ٹری (Patricia Tree) انکوڈنگ استعمال کریں جیسا کہ [ایتھیریم](/) کرتا ہے

## تعریف {#definition}

⁦RLP⁩ انکوڈنگ فنکشن ایک آئٹم لیتا ہے۔ ایک آئٹم کی تعریف اس طرح کی گئی ہے:

- ایک سٹرنگ (یعنی بائٹ ایرے) ایک آئٹم ہے
- آئٹمز کی ایک فہرست ایک آئٹم ہے
- ایک مثبت عدد ایک آئٹم ہے

مثال کے طور پر، درج ذیل تمام آئٹمز ہیں:

- ایک خالی سٹرنگ؛
- لفظ "cat" پر مشتمل سٹرنگ؛
- کسی بھی تعداد میں سٹرنگز پر مشتمل ایک فہرست؛
- اور زیادہ پیچیدہ ڈیٹا سٹرکچرز جیسے `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`۔
- عدد `100`

نوٹ کریں کہ اس صفحے کے باقی حصے کے تناظر میں، 'سٹرنگ' کا مطلب "بائنری ڈیٹا کے بائٹس کی ایک مخصوص تعداد" ہے؛ کوئی خاص انکوڈنگ استعمال نہیں کی جاتی، اور سٹرنگز کے مواد کے بارے میں کوئی علم ظاہر نہیں کیا جاتا (سوائے اس کے جو غیر کم از کم مثبت اعداد کے خلاف اصول کے ذریعہ درکار ہے)۔

⁦RLP⁩ انکوڈنگ کی تعریف اس طرح کی گئی ہے:

- ایک مثبت عدد کے لیے، اسے سب سے چھوٹی بائٹ ایرے میں تبدیل کیا جاتا ہے جس کی بگ اینڈِین تشریح وہ عدد ہوتی ہے، اور پھر نیچے دیے گئے اصولوں کے مطابق اسے ایک سٹرنگ کے طور پر انکوڈ کیا جاتا ہے۔
- ایک سنگل بائٹ جس کی قدر `[0x00, 0x7f]` (اعشاریہ `[0, 127]`) کی حد میں ہو، وہ بائٹ اپنی ⁦RLP⁩ انکوڈنگ خود ہوتی ہے۔
- بصورت دیگر، اگر ایک سٹرنگ <span dir="ltr">0-55</span> بائٹس لمبی ہے، تو ⁦RLP⁩ انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی قدر **<span dir="ltr">0x80</span>** (اعشاریہ <span dir="ltr">128</span>) جمع سٹرنگ کی لمبائی ہوتی ہے، جس کے بعد سٹرنگ آتی ہے۔ اس طرح پہلے بائٹ کی حد `[0x80, 0xb7]` (اعشاریہ `[128, 183]`) ہوتی ہے۔
- اگر ایک سٹرنگ <span dir="ltr">55</span> بائٹس سے زیادہ لمبی ہے، تو ⁦RLP⁩ انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی قدر **<span dir="ltr">0xb7</span>** (اعشاریہ <span dir="ltr">183</span>) جمع بائنری شکل میں سٹرنگ کی لمبائی کی بائٹس میں لمبائی ہوتی ہے، جس کے بعد سٹرنگ کی لمبائی، اور پھر سٹرنگ آتی ہے۔ مثال کے طور پر، ایک <span dir="ltr">1024</span> بائٹ لمبی سٹرنگ کو `\xb9\x04\x00` (اعشاریہ `185, 4, 0`) کے طور پر انکوڈ کیا جائے گا جس کے بعد سٹرنگ آئے گی۔ یہاں، `0xb9` (<span dir="ltr">183 + 2 = 185</span>) پہلے بائٹ کے طور پر، جس کے بعد <span dir="ltr">2</span> بائٹس `0x0400` (اعشاریہ <span dir="ltr">1024</span>) آتے ہیں جو اصل سٹرنگ کی لمبائی کو ظاہر کرتے ہیں۔ اس طرح پہلے بائٹ کی حد `[0xb8, 0xbf]` (اعشاریہ `[184, 191]`) ہوتی ہے۔
- اگر ایک سٹرنگ <span dir="ltr">2^64</span> بائٹس لمبی، یا اس سے زیادہ لمبی ہے، تو اسے انکوڈ نہیں کیا جا سکتا۔
- اگر کسی فہرست کا کل پے لوڈ (یعنی اس کے تمام آئٹمز کی مشترکہ لمبائی جنہیں ⁦RLP⁩ انکوڈ کیا جا رہا ہے) <span dir="ltr">0-55</span> بائٹس لمبا ہے، تو ⁦RLP⁩ انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی قدر **<span dir="ltr">0xc0</span>** جمع پے لوڈ کی لمبائی ہوتی ہے، جس کے بعد آئٹمز کی ⁦RLP⁩ انکوڈنگز کا کنکیٹینیشن (concatenation) آتا ہے۔ اس طرح پہلے بائٹ کی حد `[0xc0, 0xf7]` (اعشاریہ `[192, 247]`) ہوتی ہے۔
- اگر کسی فہرست کا کل پے لوڈ <span dir="ltr">55</span> بائٹس سے زیادہ لمبا ہے، تو ⁦RLP⁩ انکوڈنگ ایک سنگل بائٹ پر مشتمل ہوتی ہے جس کی قدر **<span dir="ltr">0xf7</span>** جمع بائنری شکل میں پے لوڈ کی لمبائی کی بائٹس میں لمبائی ہوتی ہے، جس کے بعد پے لوڈ کی لمبائی، اور پھر آئٹمز کی ⁦RLP⁩ انکوڈنگز کا کنکیٹینیشن آتا ہے۔ اس طرح پہلے بائٹ کی حد `[0xf8, 0xff]` (اعشاریہ `[248, 255]`) ہوتی ہے۔

مختصر شکل میں:

| حد       | بائٹ 1     | بائٹ 2     | ...        | بائٹ 9                | بائٹ 10    | مطلب                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | سنگل بائٹ سٹرنگ                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | چھوٹی سٹرنگ (<span dir="ltr">0-55</span> بائٹس)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | لمبی سٹرنگ، لمبائی کے لیے <span dir="ltr">N+1</span> بائٹس، پھر پے لوڈ |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | چھوٹی فہرست (<span dir="ltr">0-55</span> بائٹس)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | لمبی فہرست، لمبائی کے لیے <span dir="ltr">N+1</span> بائٹس، پھر پے لوڈ |

- `p` = پے لوڈ
- `n` = لمبائی (پے لوڈ بائٹس کی تعداد)
- `N` = لمبائی کی لمبائی کا آفسیٹ (<span dir="ltr">N+1</span> `n` بائٹس آگے آتے ہیں)

کوڈ میں، یہ اس طرح ہے:

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

- سٹرنگ "dog" = <span dir="ltr">[ 0x83, 'd', 'o', 'g' ]</span>
- فہرست <span dir="ltr">[ "cat", "dog" ]</span> = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- خالی سٹرنگ ('null') = `[ 0x80 ]`
- خالی فہرست = `[ 0xc0 ]`
- عدد <span dir="ltr">0</span> = `[ 0x80 ]`
- بائٹ <span dir="ltr">'\x00'</span> = `[ 0x00 ]`
- بائٹ <span dir="ltr">'\x0f'</span> = `[ 0x0f ]`
- بائٹس <span dir="ltr">'\x04\x00'</span> = `[ 0x82, 0x04, 0x00 ]`
- تین کی [سیٹ نظریاتی نمائندگی (set theoretical representation)](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers)، `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- سٹرنگ "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## ⁦RLP⁩ ڈی کوڈنگ {#rlp-decoding}

⁦RLP⁩ انکوڈنگ کے اصولوں اور عمل کے مطابق، ⁦RLP⁩ ڈی کوڈ کے ان پٹ کو بائنری ڈیٹا کی ایک ایرے کے طور پر سمجھا جاتا ہے۔ ⁦RLP⁩ ڈی کوڈنگ کا عمل درج ذیل ہے:

1.  ان پٹ ڈیٹا کے پہلے بائٹ (یعنی سابقہ) اور ڈیٹا کی قسم کو ڈی کوڈ کرنے کے مطابق، اصل ڈیٹا کی لمبائی اور آفسیٹ؛

2.  ڈیٹا کی قسم اور آفسیٹ کے مطابق، مثبت اعداد کے لیے کم از کم انکوڈنگ کے اصول کا احترام کرتے ہوئے، ڈیٹا کو اسی مناسبت سے ڈی کوڈ کریں؛

3.  باقی ان پٹ کو ڈی کوڈ کرنا جاری رکھیں؛

ان میں سے، ڈیٹا کی اقسام اور آفسیٹ کو ڈی کوڈ کرنے کے اصول درج ذیل ہیں:

1.  ڈیٹا ایک سٹرنگ ہے اگر پہلے بائٹ (یعنی سابقہ) کی حد <span dir="ltr">[0x00, 0x7f]</span> ہے، اور سٹرنگ بالکل پہلا بائٹ ہی ہے؛

2.  ڈیٹا ایک سٹرنگ ہے اگر پہلے بائٹ کی حد <span dir="ltr">[0x80, 0xb7]</span> ہے، اور وہ سٹرنگ جس کی لمبائی پہلے بائٹ مائنس <span dir="ltr">0x80</span> کے برابر ہے، پہلے بائٹ کے بعد آتی ہے؛

3.  ڈیٹا ایک سٹرنگ ہے اگر پہلے بائٹ کی حد <span dir="ltr">[0xb8, 0xbf]</span> ہے، اور اس سٹرنگ کی لمبائی جس کی بائٹس میں لمبائی پہلے بائٹ مائنس <span dir="ltr">0xb7</span> کے برابر ہے، پہلے بائٹ کے بعد آتی ہے، اور سٹرنگ اس سٹرنگ کی لمبائی کے بعد آتی ہے؛

4.  ڈیٹا ایک فہرست ہے اگر پہلے بائٹ کی حد <span dir="ltr">[0xc0, 0xf7]</span> ہے، اور فہرست کے ان تمام آئٹمز کی ⁦RLP⁩ انکوڈنگز کا کنکیٹینیشن جن کا کل پے لوڈ پہلے بائٹ مائنس <span dir="ltr">0xc0</span> کے برابر ہے، پہلے بائٹ کے بعد آتا ہے؛

5.  ڈیٹا ایک فہرست ہے اگر پہلے بائٹ کی حد <span dir="ltr">[0xf8, 0xff]</span> ہے، اور اس فہرست کا کل پے لوڈ جس کی لمبائی پہلے بائٹ مائنس <span dir="ltr">0xf7</span> کے برابر ہے، پہلے بائٹ کے بعد آتا ہے، اور فہرست کے تمام آئٹمز کی ⁦RLP⁩ انکوڈنگز کا کنکیٹینیشن فہرست کے کل پے لوڈ کے بعد آتا ہے؛

کوڈ میں، یہ اس طرح ہے:

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

- [ایتھیریم میں ⁦RLP⁩](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [ایتھیریم اندرونی طور پر (under the hood): ⁦RLP⁩](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## متعلقہ موضوعات {#related-topics}

- [پیٹریشیا مرکل ٹرائی (Patricia merkle trie)](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)