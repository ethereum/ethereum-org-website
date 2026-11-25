---
title: "⁦Vyper ERC-721⁩ کنٹریکٹ کا جائزہ"
description: "ریویا ناکامورا کا ⁦ERC-721⁩ کنٹریکٹ اور یہ کیسے کام کرتا ہے"
author: "اوری پومرانٹز"
lang: ur
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "⁦Vyper ERC-721⁩"
published: 2021-04-01
---

## تعارف {#introduction}

[<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) معیار غیر متبادل ٹوکن (NFT) کی ملکیت رکھنے کے لیے استعمال ہوتا ہے۔
[<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) ٹوکنز ایک شے (commodity) کے طور پر برتاؤ کرتے ہیں، کیونکہ انفرادی ٹوکنز کے درمیان کوئی فرق نہیں ہوتا۔
اس کے برعکس، <span dir="ltr">ERC-721</span> ٹوکنز ایسے اثاثوں کے لیے بنائے گئے ہیں جو ملتے جلتے تو ہیں لیکن بالکل ایک جیسے نہیں، جیسے کہ مختلف [بلیوں کے کارٹونز](https://www.cryptokitties.co/)
یا رئیل اسٹیٹ کے مختلف حصوں کے ملکیتی حقوق۔

اس مضمون میں ہم [ریویا ناکامورا کے <span dir="ltr">ERC-721</span> کنٹریکٹ](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) کا تجزیہ کریں گے۔
یہ کنٹریکٹ [Vyper](https://vyper.readthedocs.io/en/latest/index.html) میں لکھا گیا ہے، جو کہ <span dir="ltr">Python</span> جیسی ایک کنٹریکٹ زبان ہے جسے اس لیے ڈیزائن کیا گیا ہے تاکہ غیر محفوظ کوڈ لکھنا <span dir="ltr">Solidity</span> کی نسبت زیادہ مشکل ہو۔

## کنٹریکٹ {#contract}

```python
#pragma version >0.3.10
```

`#pragma version` لائن کمپائلر کو بتاتی ہے کہ کنٹریکٹ کن <span dir="ltr">Vyper</span> ورژنز کے لیے لکھا گیا ہے۔ `>0.3.10` <span dir="ltr">0.3.10</span> سے نئے کسی بھی ریلیز کو قبول کرتا ہے، لیکن اس کنٹریکٹ کو درحقیقت <span dir="ltr">Vyper 0.4.1</span> یا اس کے بعد کے ورژن کی ضرورت ہے: یہ کلیدی الفاظ کے دلائل (keyword arguments) کے ساتھ ایونٹس کو لاگ کرتا ہے (مثال کے طور پر `log IERC721.Transfer(...)`)، یہ فیچر <span dir="ltr">Vyper 0.4.1</span> میں شامل کیا گیا تھا، اس لیے یہ <span dir="ltr">0.4.0</span> پر کمپائل نہیں ہوتا۔

```python
# @dev ERC-721 غیر متبادل ٹوکن (NFT) معیار کا نفاذ۔
# @author Ryuya Nakamura (@nrryuya)
# یہاں سے ترمیم شدہ: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

<span dir="ltr">Vyper</span> میں تبصرے (comments)، بالکل <span dir="ltr">Python</span> کی طرح، ہیش (`#`) سے شروع ہوتے ہیں اور لائن کے آخر تک جاری رہتے ہیں۔ وہ تبصرے جن میں
`@<keyword>` شامل ہوتا ہے، انہیں [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) انسانوں کے پڑھنے کے قابل دستاویزات تیار کرنے کے لیے استعمال کرتا ہے۔

```python
from ethereum.ercs import IERC165
from ethereum.ercs import IERC721

implements: IERC721
implements: IERC165
```

<span dir="ltr">ERC-165</span> اور <span dir="ltr">ERC-721</span> انٹرفیسز <span dir="ltr">Vyper</span> کمپائلر کے ساتھ آتے ہیں، اس لیے ہم انہیں خود لکھنے کے بجائے `ethereum.ercs` سے امپورٹ کرتے ہیں۔ [آپ <span dir="ltr">ERC-721</span> انٹرفیس کی تعریف یہاں دیکھ سکتے ہیں](https://github.com/vyperlang/vyper/blob/master/vyper/builtins/interfaces/IERC721.vyi)۔
`implements:` لائنز یہ اعلان کرتی ہیں کہ یہ کنٹریکٹ دونوں انٹرفیسز فراہم کرتا ہے، اور کمپائلر یہ چیک کرتا ہے کہ ان کے لیے درکار ہر فنکشن نیچے بیان کیا گیا ہے۔

### ERC721Receiver انٹرفیس {#receiver-interface}

```python
# safeTransferFrom() کے ذریعے کال کیے گئے کنٹریکٹ کے لیے انٹرفیس
interface ERC721Receiver:
    def onERC721Received(
```

<span dir="ltr">ERC-721</span> دو قسم کی منتقلی کو سپورٹ کرتا ہے:

- `transferFrom`، جو بھیجنے والے کو کسی بھی منزل کا پتہ بتانے کی اجازت دیتا ہے اور منتقلی کی ذمہ داری بھیجنے والے پر ڈالتا ہے۔ اس کا مطلب ہے کہ آپ کسی غلط پتے پر بھی منتقلی کر سکتے ہیں، جس صورت میں NFT ہمیشہ کے لیے ضائع ہو جاتا ہے۔
- `safeTransferFrom`، جو یہ چیک کرتا ہے کہ آیا منزل کا پتہ ایک کنٹریکٹ ہے۔ اگر ایسا ہے، تو <span dir="ltr">ERC-721</span> کنٹریکٹ وصول کرنے والے کنٹریکٹ سے پوچھتا ہے کہ کیا وہ NFT وصول کرنا چاہتا ہے۔

`safeTransferFrom` درخواستوں کا جواب دینے کے لیے وصول کرنے والے کنٹریکٹ کو `ERC721Receiver` نافذ کرنا پڑتا ہے۔

```python
            _operator: address,
            _from: address,
```

`_from` پتہ ٹوکن کا موجودہ مالک ہے۔ `_operator` پتہ وہ ہے جس نے منتقلی کی درخواست کی تھی (الاؤنسز کی وجہ سے یہ دونوں ایک جیسے نہیں بھی ہو سکتے)۔ روایت کے مطابق، اس کنٹریکٹ میں زیادہ تر فنکشن پیرامیٹرز انڈرسکور (`_`) سے شروع ہوتے ہیں۔

```python
            _tokenId: uint256,
```

<span dir="ltr">ERC-721</span> ٹوکن IDs <span dir="ltr">256</span> بٹس کے ہوتے ہیں۔ عام طور پر یہ ٹوکن جس چیز کی نمائندگی کرتا ہے اس کی تفصیل کی ہیشنگ کر کے بنائے جاتے ہیں۔

```python
            _data: Bytes[1024]
```

درخواست میں صارف کا <span dir="ltr">1024</span> بائٹس تک کا ڈیٹا ہو سکتا ہے۔

```python
        ) -> bytes4: nonpayable
```

ایسے معاملات کو روکنے کے لیے جن میں کوئی کنٹریکٹ غلطی سے منتقلی کو قبول کر لے، واپسی کی قدر (return value) بولین (boolean) نہیں ہوتی، بلکہ ایک مخصوص چار بائٹ کی قدر ہوتی ہے، جو کہ `onERC721Received` کا فنکشن سلیکٹر ہے۔ فنکشن `nonpayable` ہے کیونکہ وصول کرنے والا کنٹریکٹ ٹوکن قبول کرتے وقت اپنی حالت تبدیل کر سکتا ہے۔

### ایونٹس {#events}

[ایونٹس](/developers/docs/smart-contracts/anatomy/#events-and-logs)
بلاک چین سے باہر صارفین اور سرورز کو واقعات سے آگاہ کرنے کے لیے خارج (emit) کیے جاتے ہیں۔ یاد رکھیں کہ ایونٹس کا مواد بلاک چین پر موجود کنٹریکٹس کے لیے دستیاب نہیں ہوتا۔ تین <span dir="ltr">ERC-721</span> ایونٹس کی تعریف اس `IERC721` انٹرفیس کے ذریعے کی گئی ہے جسے ہم نے امپورٹ کیا ہے، اس لیے یہ کنٹریکٹ انہیں خود ڈکلیئر نہیں کرتا؛ یہ انہیں `log IERC721.<Event>(...)` کے ساتھ خارج کرتا ہے، جیسا کہ ہم نیچے منتقلی کے فنکشنز میں دیکھیں گے۔

`Transfer` (`sender`, `receiver`, `token_id`) ایک NFT کی ملکیت میں تبدیلی کی اطلاع دیتا ہے۔ یہ <span dir="ltr">ERC-20</span> ٹرانسفر ایونٹ کی طرح ہے، سوائے اس کے کہ ہم رقم کے بجائے `token_id` کی اطلاع دیتے ہیں۔ صفر ایڈریس کا کوئی مالک نہیں ہوتا، اس لیے روایت کے مطابق ہم اسے ٹوکنز کی تخلیق اور تباہی کی اطلاع دینے کے لیے استعمال کرتے ہیں۔ اس میں ایک استثنا کنٹریکٹ کی تخلیق ہے، جس کے دوران `Transfer` کو خارج کیے بغیر کسی بھی تعداد میں NFTs بنائے اور تفویض کیے جا سکتے ہیں۔

ایک <span dir="ltr">ERC-721</span> منظوری (approval) <span dir="ltr">ERC-20</span> الاؤنس کی طرح ہے: ایک مخصوص پتے کو ایک مخصوص ٹوکن منتقل کرنے کی اجازت دی جاتی ہے، اور جب بھی وہ منظور شدہ پتہ سیٹ یا دوبارہ تصدیق کیا جاتا ہے تو `Approval` (`owner`, `approved`, `token_id`) خارج ہوتا ہے۔ یہ کنٹریکٹس کو ٹوکن قبول کرنے پر ردعمل ظاہر کرنے کا ایک طریقہ کار فراہم کرتا ہے۔ کنٹریکٹس ایونٹس کو نہیں سن سکتے، اس لیے اگر آپ صرف ٹوکن انہیں منتقل کرتے ہیں تو انہیں اس کے بارے میں "پتہ" نہیں چلتا۔ اس طرح مالک پہلے منظوری جمع کراتا ہے اور پھر کنٹریکٹ کو درخواست بھیجتا ہے: "میں نے آپ کو ٹوکن X منتقل کرنے کی منظوری دے دی ہے، براہ کرم یہ کریں..."۔ یہ ایک ڈیزائن کا انتخاب ہے تاکہ <span dir="ltr">ERC-721</span> معیار کو <span dir="ltr">ERC-20</span> معیار کے مماثل بنایا جا سکے۔ چونکہ <span dir="ltr">ERC-721</span> ٹوکنز غیر متبادل ہوتے ہیں، اس لیے ایک کنٹریکٹ ٹوکن کی ملکیت کو دیکھ کر یہ بھی پہچان سکتا ہے کہ اسے ایک مخصوص ٹوکن ملا ہے۔

آخر میں، `ApprovalForAll` (`owner`, `operator`, `approved`) اس وقت خارج ہوتا ہے جب کسی مالک کے لیے ایک _آپریٹر_ کو فعال یا غیر فعال کیا جاتا ہے۔ بعض اوقات ایک ایسا آپریٹر ہونا مفید ہوتا ہے جو کسی اکاؤنٹ کے ایک مخصوص قسم کے تمام ٹوکنز (وہ جو کسی مخصوص کنٹریکٹ کے زیر انتظام ہوں) کا انتظام کر سکے، بالکل پاور آف اٹارنی کی طرح۔ مثال کے طور پر، میں ایک ایسے کنٹریکٹ کو یہ اختیار دینا چاہوں گا جو یہ چیک کرے کہ آیا میں نے چھ ماہ سے اس سے رابطہ نہیں کیا ہے، اور اگر ایسا ہے تو میرے اثاثے میرے ورثاء میں تقسیم کر دے (اگر ان میں سے کوئی اس کی درخواست کرے، کنٹریکٹس ٹرانزیکشن کے ذریعے کال کیے بغیر کچھ نہیں کر سکتے)۔ <span dir="ltr">ERC-20</span> میں ہم وراثت کے کنٹریکٹ کو صرف ایک بڑا الاؤنس دے سکتے ہیں، لیکن یہ <span dir="ltr">ERC-721</span> کے لیے کام نہیں کرتا کیونکہ ٹوکنز غیر متبادل ہوتے ہیں۔ یہ اسی کا متبادل ہے۔ `approved` کی قدر ہمیں بتاتی ہے کہ آیا ایونٹ منظوری کے لیے ہے، یا منظوری واپس لینے کے لیے۔

### اسٹیٹ ویری ایبلز {#state-vars}

یہ ویری ایبلز ٹوکنز کی موجودہ حالت پر مشتمل ہوتے ہیں: کون سے دستیاب ہیں اور ان کا مالک کون ہے۔ ان میں سے زیادہ تر `HashMap` آبجیکٹس ہیں، [یک طرفہ میپنگز جو دو اقسام کے درمیان موجود ہوتی ہیں](https://vyper.readthedocs.io/en/latest/types.html#mappings)۔

```python
# @dev NFT ID سے اس کی ملکیت رکھنے والے پتہ تک میپنگ۔
idToOwner: HashMap[uint256, address]

# @dev NFT ID سے منظور شدہ پتہ تک میپنگ۔
idToApprovals: HashMap[uint256, address]
```

ایتھیریم میں صارف اور کنٹریکٹ کی شناخت <span dir="ltr">160</span>-بٹ پتوں سے ظاہر کی جاتی ہے۔ یہ دو ویری ایبلز ٹوکن IDs سے ان کے مالکان اور انہیں منتقل کرنے کے لیے منظور شدہ افراد (ہر ایک کے لیے زیادہ سے زیادہ ایک) تک میپ کرتے ہیں۔ ایتھیریم میں، غیر شروع شدہ (uninitialized) ڈیٹا ہمیشہ صفر ہوتا ہے، اس لیے اگر کوئی مالک یا منظور شدہ ٹرانسفرر نہیں ہے تو اس ٹوکن کی قدر صفر ہوتی ہے۔

```python
# @dev مالک کے پتہ سے اس کے ٹوکنز کی تعداد تک میپنگ۔
ownerToNFTokenCount: HashMap[address, uint256]
```

یہ ویری ایبل ہر مالک کے لیے ٹوکنز کی گنتی رکھتا ہے۔ مالکان سے ٹوکنز تک کوئی میپنگ نہیں ہے، اس لیے کسی مخصوص مالک کے ٹوکنز کی شناخت کرنے کا واحد طریقہ بلاک چین کی ایونٹ ہسٹری میں پیچھے مڑ کر دیکھنا اور مناسب `Transfer` ایونٹس کو دیکھنا ہے۔ ہم اس ویری ایبل کا استعمال یہ جاننے کے لیے کر سکتے ہیں کہ ہمارے پاس تمام NFTs کب آ گئے ہیں اور ہمیں وقت میں مزید پیچھے دیکھنے کی ضرورت نہیں ہے۔

یاد رکھیں کہ یہ الگورتھم صرف یوزر انٹرفیسز اور بیرونی سرورز کے لیے کام کرتا ہے۔ خود بلاک چین پر چلنے والا کوڈ ماضی کے ایونٹس کو نہیں پڑھ سکتا۔

```python
# @dev مالک کے پتہ سے آپریٹر کے پتوں کی میپنگ تک میپنگ۔
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

ایک اکاؤنٹ کے ایک سے زیادہ آپریٹر ہو سکتے ہیں۔ ان کا ٹریک رکھنے کے لیے ایک سادہ `HashMap` ناکافی ہے، کیونکہ ہر کلید ایک ہی قدر کی طرف لے جاتی ہے۔ اس کے بجائے، آپ قدر کے طور پر `HashMap[address, bool]` استعمال کر سکتے ہیں۔ پہلے سے طے شدہ طور پر ہر پتے کی قدر `False` ہوتی ہے، جس کا مطلب ہے کہ یہ آپریٹر نہیں ہے۔ آپ ضرورت کے مطابق اقدار کو `True` پر سیٹ کر سکتے ہیں۔

```python
# @dev منٹر کا پتہ، جو ٹوکن ڈھال سکتا ہے
minter: address
```

نئے ٹوکنز کو کسی نہ کسی طرح بنانا پڑتا ہے۔ اس کنٹریکٹ میں صرف ایک ہی ہستی کو ایسا کرنے کی اجازت ہے، جو کہ `minter` ہے۔ مثال کے طور پر، یہ کسی گیم کے لیے کافی ہو سکتا ہے۔ دیگر مقاصد کے لیے، زیادہ پیچیدہ کاروباری منطق (business logic) بنانا ضروری ہو سکتا ہے۔

```python
# @dev تعاون یافتہ ERC165 انٹرفیس آئی ڈیز کی جامد فہرست
SUPPORTED_INTERFACES: constant(bytes4[2]) = [
    # ERC165 کی ERC165 انٹرفیس آئی ڈی
    0x01ffc9a7,
    # ERC721 کی ERC165 انٹرفیس آئی ڈی
    0x80ac58cd,
]
```

[<span dir="ltr">ERC-165</span>](https://eips.ethereum.org/EIPS/eip-165) ایک کنٹریکٹ کے لیے یہ ظاہر کرنے کا طریقہ کار بتاتا ہے کہ ایپلی کیشنز اس کے ساتھ کیسے بات چیت کر سکتی ہیں، اور یہ کن ERCs کے مطابق ہے۔ `SUPPORTED_INTERFACES` ان دو چار بائٹ انٹرفیس IDs کی ایک مستقل فہرست ہے جن کے یہ کنٹریکٹ مطابق ہے: خود <span dir="ltr">ERC-165</span> اور <span dir="ltr">ERC-721</span>۔

### فنکشنز {#functions}

یہ وہ فنکشنز ہیں جو دراصل <span dir="ltr">ERC-721</span> کو نافذ کرتے ہیں۔

#### کنسٹرکٹر {#constructor}

```python
@deploy
def __init__():
```

<span dir="ltr">Vyper</span> میں، <span dir="ltr">Python</span> کی طرح، کنسٹرکٹر فنکشن کو `__init__` کہا جاتا ہے۔ اسے `@deploy` ڈیکوریشن کے ساتھ نشان زد کیا گیا ہے، جس کا مطلب ہے کہ یہ ایک بار چلتا ہے، جب کنٹریکٹ کو تعینات (deploy) کیا جاتا ہے۔

```python
    """
    @dev کنٹریکٹ کنسٹرکٹر۔
    """
```

<span dir="ltr">Python</span> اور <span dir="ltr">Vyper</span> میں، آپ ایک ملٹی لائن سٹرنگ (جو `"""` سے شروع اور ختم ہوتی ہے) بتا کر بھی ایک تبصرہ بنا سکتے ہیں، اور اسے کسی بھی طرح استعمال نہیں کر سکتے۔ ان تبصروں میں [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) بھی شامل ہو سکتا ہے۔

```python
    self.minter = msg.sender
```

اسٹیٹ ویری ایبلز تک رسائی کے لیے آپ `self.<variable name>` استعمال کرتے ہیں (دوبارہ، <span dir="ltr">Python</span> کی طرح)۔ کنسٹرکٹر اس اکاؤنٹ کو ریکارڈ کرتا ہے جس نے کنٹریکٹ کو `minter` کے طور پر تعینات کیا تھا۔

#### ویو فنکشنز {#views}

یہ وہ فنکشنز ہیں جو بلاک چین کی حالت کو تبدیل نہیں کرتے، اور اس لیے اگر انہیں بیرونی طور پر کال کیا جائے تو انہیں مفت میں چلایا جا سکتا ہے۔ اگر ویو فنکشنز کو کسی کنٹریکٹ کے ذریعے کال کیا جائے تو انہیں اب بھی ہر نوڈ پر چلانا پڑتا ہے اور اس لیے گیس خرچ ہوتی ہے۔

```python
@view
@external
```

فنکشن کی تعریف سے پہلے یہ کلیدی الفاظ جو ایٹ سائن (`@`) سے شروع ہوتے ہیں انہیں _ڈیکوریشنز_ کہا جاتا ہے۔ یہ ان حالات کی وضاحت کرتے ہیں جن میں کسی فنکشن کو کال کیا جا سکتا ہے۔

- `@view` یہ بتاتا ہے کہ یہ فنکشن ایک ویو ہے۔
- `@external` یہ بتاتا ہے کہ اس مخصوص فنکشن کو ٹرانزیکشنز اور دیگر کنٹریکٹس کے ذریعے کال کیا جا سکتا ہے۔

```python
def supportsInterface(interface_id: bytes4) -> bool:
```

<span dir="ltr">Python</span> کے برعکس، <span dir="ltr">Vyper</span> ایک [سٹیٹک ٹائپڈ زبان](https://wikipedia.org/wiki/Type_system#Static_type_checking) ہے۔ آپ [ڈیٹا ٹائپ](https://vyper.readthedocs.io/en/latest/types.html) کی شناخت کیے بغیر کسی ویری ایبل، یا فنکشن پیرامیٹر کا اعلان نہیں کر سکتے۔ اس صورت میں ان پٹ پیرامیٹر `bytes4` ہے، جو کہ چار بائٹ کی قدر ہے، اور آؤٹ پٹ ایک بولین قدر ہے۔

```python
    """
    @dev انٹرفیس کی شناخت ERC-165 میں متعین کی گئی ہے۔
    @param interface_id انٹرفیس کی آئی ڈی
    """
    return interface_id in SUPPORTED_INTERFACES
```

اگر `interface_id` `SUPPORTED_INTERFACES` فہرست میں موجود انٹرفیس IDs میں سے ایک ہے تو `True` واپس کریں۔

```python
### ویو فنکشنز ###
```

یہ وہ ویو فنکشنز ہیں جو ٹوکنز کے بارے میں معلومات صارفین اور دیگر کنٹریکٹس کو دستیاب کراتے ہیں۔

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner` کی ملکیت والے NFTs کی تعداد لوٹاتا ہے۔
         اگر `_owner` صفر ایڈریس ہو تو ایرر (throw) دیتا ہے۔ صفر ایڈریس کو تفویض کردہ NFTs کو نامانوس سمجھا جاتا ہے۔
    @param _owner وہ پتہ جس کا بیلنس معلوم کرنا ہے۔
    """
    assert _owner != empty(address)
```

یہ لائن [دعویٰ کرتی ہے](https://vyper.readthedocs.io/en/latest/statements.html#assert) کہ `_owner` صفر ایڈریس نہیں ہے، جسے `empty(address)` کے طور پر لکھا جاتا ہے۔ اگر ایسا ہے، تو ایک خرابی ہے اور آپریشن کو ریورٹ کر دیا جاتا ہے۔

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT کے مالک کا پتہ لوٹاتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔
    @param _tokenId NFT کے لیے شناخت کنندہ۔
    """
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے
    assert owner != empty(address)
    return owner
```

ایتھیریم ورچوئل مشین (EVM) میں کوئی بھی سٹوریج جس میں کوئی قدر محفوظ نہ ہو وہ صفر ہوتی ہے۔ اگر `_tokenId` پر کوئی ٹوکن نہیں ہے تو `self.idToOwner[_tokenId]` کی قدر صفر ہے۔ اس صورت میں فنکشن ریورٹ ہو جاتا ہے۔

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev ایک واحد NFT کے لیے منظور شدہ پتہ حاصل کریں۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔
    @param _tokenId اس NFT کی آئی ڈی جس کی منظوری معلوم کرنی ہے۔
    """
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے
    assert self.idToOwner[_tokenId] != empty(address)
    return self.idToApprovals[_tokenId]
```

یاد رکھیں کہ `getApproved` صفر واپس _کر سکتا ہے_۔ اگر ٹوکن درست ہے تو یہ `self.idToApprovals[_tokenId]` واپس کرتا ہے۔ اگر کوئی منظور کنندہ نہیں ہے تو وہ قدر صفر ہوتی ہے۔

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev چیک کرتا ہے کہ آیا `_operator`، `_owner` کے لیے ایک منظور شدہ آپریٹر ہے۔
    @param _owner وہ پتہ جو NFTs کا مالک ہے۔
    @param _operator وہ پتہ جو مالک کی جانب سے کام کرتا ہے۔
    """
    return (self.ownerToOperators[_owner])[_operator]
```

یہ فنکشن چیک کرتا ہے کہ آیا `_operator` کو اس کنٹریکٹ میں `_owner` کے تمام ٹوکنز کا انتظام کرنے کی اجازت ہے۔ چونکہ ایک سے زیادہ آپریٹرز ہو سکتے ہیں، اس لیے یہ دو سطح کا ہیش میپ (HashMap) ہے۔

#### ٹرانسفر ہیلپر فنکشنز {#transfer-helpers}

یہ فنکشنز ان آپریشنز کو نافذ کرتے ہیں جو ٹوکنز کی منتقلی یا انتظام کا حصہ ہیں۔

```python

### منتقلی فنکشن ہیلپرز ###

@view
@internal
```

اس ڈیکوریشن، `@internal`، کا مطلب ہے کہ فنکشن صرف اسی کنٹریکٹ کے اندر موجود دیگر فنکشنز سے قابل رسائی ہے۔ روایت کے مطابق، ان فنکشنز کے نام بھی انڈرسکور (`_`) سے شروع ہوتے ہیں۔

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev لوٹاتا ہے کہ آیا دیا گیا خرچ کنندہ (spender) دی گئی ٹوکن آئی ڈی کی منتقلی کر سکتا ہے یا نہیں
    @param spender خرچ کنندہ کا پتہ جس کے بارے میں معلوم کرنا ہے
    @param tokenId منتقل کیے جانے والے ٹوکن کی uint256 آئی ڈی
    @return bool آیا msg.sender دی گئی ٹوکن آئی ڈی کے لیے منظور شدہ ہے،
        مالک کا آپریٹر ہے، یا ٹوکن کا مالک ہے
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

تین طریقے ہیں جن سے کسی پتے کو ٹوکن منتقل کرنے کی اجازت دی جا سکتی ہے:

1. پتہ ٹوکن کا مالک ہے
2. پتے کو وہ ٹوکن خرچ کرنے کی منظوری دی گئی ہے
3. پتہ ٹوکن کے مالک کا آپریٹر ہے

اوپر دیا گیا فنکشن ایک ویو ہو سکتا ہے کیونکہ یہ حالت کو تبدیل نہیں کرتا۔ آپریٹنگ اخراجات کو کم کرنے کے لیے، کوئی بھی فنکشن جو ویو _ہو سکتا ہے_ اسے ویو _ہونا چاہیے_۔

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev دیے گئے پتہ میں ایک NFT شامل کریں
         اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (throw) دیتا ہے۔
    """
    # اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (throw) دیتا ہے
    assert self.idToOwner[_tokenId] == empty(address)
    # مالک کو تبدیل کریں
    self.idToOwner[_tokenId] = _to
    # تعداد کی ٹریکنگ کو تبدیل کریں
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev دیے گئے پتہ سے ایک NFT ہٹائیں
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے۔
    """
    # اگر `_from` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے
    assert self.idToOwner[_tokenId] == _from
    # مالک کو تبدیل کریں
    self.idToOwner[_tokenId] = empty(address)
    # تعداد کی ٹریکنگ کو تبدیل کریں
    self.ownerToNFTokenCount[_from] -= 1
```

جب منتقلی میں کوئی مسئلہ ہوتا ہے تو ہم کال کو ریورٹ کر دیتے ہیں۔

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev دیے گئے پتہ کی منظوری کو صاف کریں
         اگر `_owner` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے۔
    """
    # اگر `_owner` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != empty(address):
        # منظوریوں کو ری سیٹ کریں
        self.idToApprovals[_tokenId] = empty(address)
```

صرف ضرورت پڑنے پر قدر تبدیل کریں۔ اسٹیٹ ویری ایبلز سٹوریج میں رہتے ہیں۔ سٹوریج میں لکھنا ان سب سے مہنگے آپریشنز میں سے ایک ہے جو EVM (ایتھیریم ورچوئل مشین) کرتا ہے ([گیس](/developers/docs/gas/) کے لحاظ سے)۔ اس لیے، اسے کم سے کم کرنا ایک اچھا خیال ہے، یہاں تک کہ موجودہ قدر کو لکھنے کی بھی زیادہ قیمت ہوتی ہے۔

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFT کی منتقلی کو انجام دیں۔
         ایرر (throw) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         پتہ نہ ہو۔ (نوٹ: پرائیویٹ فنکشن میں `msg.sender` کی اجازت نہیں ہے اس لیے `_sender` پاس کریں۔)
         اگر `_to` صفر ایڈریس ہے تو ایرر (throw) دیتا ہے۔
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔
    """
```

ہمارے پاس یہ اندرونی فنکشن اس لیے ہے کیونکہ ٹوکنز منتقل کرنے کے دو طریقے ہیں (باقاعدہ اور محفوظ)، لیکن ہم کوڈ میں صرف ایک ہی جگہ چاہتے ہیں جہاں ہم یہ کریں تاکہ آڈیٹنگ کو آسان بنایا جا سکے۔

```python
    # تقاضے چیک کریں
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # اگر `_to` صفر ایڈریس ہے تو ایرر (throw) دیتا ہے
    assert _to != empty(address)
    # منظوری صاف کریں۔ اگر `_from` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے
    self._clearApproval(_from, _tokenId)
    # NFT ہٹائیں۔ اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے
    self._removeTokenFrom(_from, _tokenId)
    # NFT شامل کریں
    self._addTokenTo(_to, _tokenId)
    # منتقلی کو لاگ کریں
    log IERC721.Transfer(sender=_from, receiver=_to, token_id=_tokenId)
```

<span dir="ltr">Vyper</span> میں ایونٹ خارج کرنے کے لیے آپ `log` سٹیٹمنٹ استعمال کرتے ہیں ([مزید تفصیلات کے لیے یہاں دیکھیں](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging))۔ چونکہ ایونٹس امپورٹ کیے گئے انٹرفیس سے تعلق رکھتے ہیں، اس لیے ہم انہیں `IERC721.Transfer` کے طور پر حوالہ دیتے ہیں اور ان کے فیلڈز کو کلیدی لفظ (keyword) کے ذریعے پاس کرتے ہیں۔

#### ٹرانسفر فنکشنز {#transfer-funs}

```python

### منتقلی فنکشنز ###

@external
@payable
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev ایرر (throw) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         پتہ نہ ہو۔
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے۔
         اگر `_to` صفر ایڈریس ہے تو ایرر (throw) دیتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔
    @notice کال کرنے والا اس بات کی تصدیق کرنے کا ذمہ دار ہے کہ `_to` NFTs وصول کرنے کی صلاحیت رکھتا ہے ورنہ
            وہ مستقل طور پر ضائع ہو سکتے ہیں۔
    @param _from NFT کا موجودہ مالک۔
    @param _to نیا مالک۔
    @param _tokenId منتقلی کے لیے NFT۔
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

یہ فنکشن آپ کو کسی بھی صوابدیدی (arbitrary) پتے پر منتقل کرنے کی اجازت دیتا ہے۔ جب تک کہ پتہ کوئی صارف نہ ہو، یا کوئی ایسا کنٹریکٹ نہ ہو جو ٹوکنز منتقل کرنا جانتا ہو، آپ کا منتقل کردہ کوئی بھی ٹوکن اس پتے پر پھنس جائے گا اور بیکار ہو جائے گا۔

`@payable` ڈیکوریشن یہاں اس لیے ہے کیونکہ `IERC721` انٹرفیس `transferFrom`، `safeTransferFrom`، اور `approve` کو قابل ادائیگی (payable) قرار دیتا ہے، اس لیے جو کنٹریکٹ اس انٹرفیس کو نافذ کرتا ہے اسے ان دستخطوں (signatures) سے مماثل ہونا چاہیے۔

```python
@external
@payable
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev ایک NFT کی ملکیت کو ایک پتہ سے دوسرے پتہ میں منتقل کرتا ہے۔
         ایرر (throw) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے
         منظور شدہ پتہ نہ ہو۔
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (throw) دیتا ہے۔
         اگر `_to` صفر ایڈریس ہے تو ایرر (throw) دیتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔
         اگر `_to` ایک سمارٹ کنٹریکٹ ہے، تو یہ `_to` پر `onERC721Received` کو کال کرتا ہے اور اگر
         واپسی کی قدر `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` نہیں ہے تو ایرر (throw) دیتا ہے۔
    @param _from NFT کا موجودہ مالک۔
    @param _to نیا مالک۔
    @param _tokenId منتقلی کے لیے NFT۔
    @param _data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `_to` کی کال میں بھیجا جاتا ہے۔
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

پہلے منتقلی کرنا ٹھیک ہے کیونکہ اگر کوئی مسئلہ ہوتا ہے تو ہم ویسے بھی ریورٹ کرنے والے ہیں، اس لیے کال میں کیا گیا ہر کام منسوخ ہو جائے گا۔

```python
    if _to.is_contract: # چیک کریں کہ آیا `_to` ایک کنٹریکٹ کا پتہ ہے
```

پہلے یہ چیک کریں کہ آیا پتہ ایک کنٹریکٹ ہے (اگر اس میں کوڈ ہے)۔ اگر نہیں، تو فرض کریں کہ یہ صارف کا پتہ ہے اور صارف ٹوکن استعمال کرنے یا اسے منتقل کرنے کے قابل ہو گا۔ لیکن اسے آپ کو تحفظ کے جھوٹے احساس میں مبتلا نہ ہونے دیں۔ آپ ٹوکنز کھو سکتے ہیں، یہاں تک کہ `safeTransferFrom` کے ساتھ بھی، اگر آپ انہیں کسی ایسے پتے پر منتقل کرتے ہیں جس کی نجی کلید کوئی نہیں جانتا۔

```python
        returnValue: bytes4 = extcall ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ہدف کنٹریکٹ کو کال کر کے دیکھیں کہ آیا وہ <span dir="ltr">ERC-721</span> ٹوکنز وصول کر سکتا ہے۔ <span dir="ltr">Vyper 0.4</span> میں دیگر کنٹریکٹس کی کالز کو نشان زد کرنا ضروری ہے، اس لیے کال سے پہلے `extcall` لگایا جاتا ہے۔

```python
        # اگر منتقلی کی منزل ایک ایسا کنٹریکٹ ہے جو 'onERC721Received' کو نافذ نہیں کرتا ہے تو ایرر (throw) دیتا ہے
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes4)
```

اگر منزل ایک کنٹریکٹ ہے، لیکن ایسا جو <span dir="ltr">ERC-721</span> ٹوکنز قبول نہیں کرتا (یا جس نے اس مخصوص منتقلی کو قبول نہ کرنے کا فیصلہ کیا ہے)، تو ریورٹ کریں۔

```python
@external
@payable
def approve(_approved: address, _tokenId: uint256):
    """
    @dev ایک NFT کے لیے منظور شدہ پتہ سیٹ کریں یا اس کی دوبارہ تصدیق کریں۔ صفر ایڈریس ظاہر کرتا ہے کہ کوئی منظور شدہ پتہ نہیں ہے۔
         ایرر (throw) دیتا ہے جب تک کہ `msg.sender` موجودہ NFT کا مالک، یا موجودہ مالک کا مجاز آپریٹر نہ ہو۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا ہے)
         اگر `_approved` موجودہ مالک ہے تو ایرر (throw) دیتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا ہے)
    @param _approved دی گئی NFT آئی ڈی کے لیے منظور کیا جانے والا پتہ۔
    @param _tokenId منظور کیے جانے والے ٹوکن کی آئی ڈی。
    """
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے
    assert owner != empty(address)
    # اگر `_approved` موجودہ مالک ہے تو ایرر (throw) دیتا ہے
    assert _approved != owner
```

روایت کے مطابق اگر آپ کوئی منظور کنندہ نہیں رکھنا چاہتے تو آپ صفر ایڈریس مقرر کرتے ہیں، خود کو نہیں۔

```python
    # تقاضے چیک کریں
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

منظوری سیٹ کرنے کے لیے آپ یا تو مالک ہو سکتے ہیں، یا مالک کی طرف سے مجاز آپریٹر۔

```python
    # منظوری سیٹ کریں
    self.idToApprovals[_tokenId] = _approved
    log IERC721.Approval(owner=owner, approved=_approved, token_id=_tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev کسی تیسرے فریق ("آپریٹر") کے لیے `msg.sender` کے تمام اثاثوں کا انتظام کرنے کی منظوری کو فعال یا غیر فعال کرتا ہے۔ یہ ApprovalForAll ایونٹ بھی خارج کرتا ہے۔
         اگر `_operator` ہی `msg.sender` ہے تو ایرر (throw) دیتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا ہے)
    @notice یہ تب بھی کام کرتا ہے اگر بھیجنے والے کے پاس اس وقت کوئی ٹوکن نہ ہو۔
    @param _operator مجاز آپریٹرز کے سیٹ میں شامل کرنے کے لیے پتہ۔
    @param _approved True اگر آپریٹرز منظور شدہ ہیں، false منظوری منسوخ کرنے کے لیے۔
    """
    # اگر `_operator` ہی `msg.sender` ہے تو ایرر (throw) دیتا ہے
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log IERC721.ApprovalForAll(owner=msg.sender, operator=_operator, approved=_approved)
```

#### نئے ٹوکنز ڈھالنا اور موجودہ کو تباہ کرنا {#mint-burn}

جس اکاؤنٹ نے کنٹریکٹ بنایا ہے وہ `minter` ہے، وہ سپر یوزر جو نئے NFTs ڈھالنے کا مجاز ہے۔ تاہم، اسے بھی موجودہ ٹوکنز جلانے کی اجازت نہیں ہے۔ صرف مالک، یا مالک کی طرف سے مجاز کوئی ہستی، ایسا کر سکتی ہے۔

```python
### ڈھالنا اور جلانا فنکشنز ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

یہ فنکشن ہمیشہ `True` واپس کرتا ہے، کیونکہ اگر آپریشن ناکام ہو جاتا ہے تو اسے ریورٹ کر دیا جاتا ہے۔

```python
    """
    @dev ٹوکن ڈھالنے کا فنکشن
         اگر `msg.sender` منٹر نہیں ہے تو ایرر (throw) دیتا ہے۔
         اگر `_to` صفر ایڈریس ہے تو ایرر (throw) دیتا ہے۔
         اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (throw) دیتا ہے۔
    @param _to وہ پتہ جو ڈھالے گئے ٹوکن وصول کرے گا۔
    @param _tokenId ڈھالنے کے لیے ٹوکن آئی ڈی۔
    @return ایک بولین جو ظاہر کرتا ہے کہ آیا آپریشن کامیاب رہا。
    """
    # اگر `msg.sender` منٹر نہیں ہے تو ایرر (throw) دیتا ہے
    assert msg.sender == self.minter
```

صرف منٹر (وہ اکاؤنٹ جس نے <span dir="ltr">ERC-721</span> کنٹریکٹ بنایا ہے) نئے ٹوکنز ڈھال سکتا ہے۔ مستقبل میں یہ ایک مسئلہ ہو سکتا ہے اگر ہم منٹر کی شناخت تبدیل کرنا چاہیں۔ پروڈکشن کنٹریکٹ میں آپ شاید ایک ایسا فنکشن چاہیں گے جو منٹر کو منٹر کے مراعات کسی اور کو منتقل کرنے کی اجازت دے۔

```python
    # اگر `_to` صفر ایڈریس ہے تو ایرر (throw) دیتا ہے
    assert _to != empty(address)
    # NFT شامل کریں۔ اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (throw) دیتا ہے
    self._addTokenTo(_to, _tokenId)
    log IERC721.Transfer(sender=empty(address), receiver=_to, token_id=_tokenId)
    return True
```

روایت کے مطابق، نئے ٹوکنز کی ڈھلائی صفر ایڈریس سے منتقلی کے طور پر شمار ہوتی ہے۔

```python

@external
def burn(_tokenId: uint256):
    """
    @dev ایک مخصوص ERC721 ٹوکن کو جلاتا ہے۔
         ایرر (throw) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         پتہ نہ ہو۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے۔
    @param _tokenId جلائے جانے والے ERC721 ٹوکن کی uint256 آئی ڈی。
    """
    # تقاضے چیک کریں
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (throw) دیتا ہے
    assert owner != empty(address)
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log IERC721.Transfer(sender=owner, receiver=empty(address), token_id=_tokenId)
```

جس کسی کو بھی ٹوکن منتقل کرنے کی اجازت ہے اسے جلانے کی بھی اجازت ہے۔ اگرچہ جلانا صفر ایڈریس پر منتقلی کے برابر لگتا ہے، لیکن صفر ایڈریس دراصل ٹوکن وصول نہیں کرتا۔ یہ ہمیں اس تمام سٹوریج کو خالی کرنے کی اجازت دیتا ہے جو ٹوکن کے لیے استعمال کی گئی تھی، جس سے ٹرانزیکشن کی گیس کی قیمت کم ہو سکتی ہے۔

## اس کنٹریکٹ کا استعمال {#using-contract}

<span dir="ltr">Solidity</span> کے برعکس، <span dir="ltr">Vyper</span> میں وراثت (inheritance) نہیں ہے۔ یہ ایک دانستہ ڈیزائن کا انتخاب ہے تاکہ کوڈ کو واضح اور اس لیے محفوظ بنانا آسان ہو۔ لہذا اپنا <span dir="ltr">Vyper ERC-721</span> کنٹریکٹ بنانے کے لیے آپ [اس کنٹریکٹ](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) کو لیتے ہیں اور اپنی مطلوبہ کاروباری منطق کو نافذ کرنے کے لیے اس میں ترمیم کرتے ہیں۔

## نتیجہ {#conclusion}

جائزے کے لیے، اس کنٹریکٹ میں کچھ اہم ترین خیالات یہ ہیں:

- محفوظ منتقلی کے ساتھ <span dir="ltr">ERC-721</span> ٹوکنز وصول کرنے کے لیے، کنٹریکٹس کو `ERC721Receiver` انٹرفیس نافذ کرنا پڑتا ہے۔
- یہاں تک کہ اگر آپ محفوظ منتقلی استعمال کرتے ہیں، تب بھی ٹوکنز پھنس سکتے ہیں اگر آپ انہیں کسی ایسے پتے پر بھیجتے ہیں جس کی نجی کلید نامعلوم ہے۔
- جب کسی آپریشن میں کوئی مسئلہ ہو تو کال کو `revert` کرنا ایک اچھا خیال ہے، بجائے اس کے کہ صرف ناکامی کی قدر واپس کی جائے۔
- <span dir="ltr">ERC-721</span> ٹوکنز اس وقت موجود ہوتے ہیں جب ان کا کوئی مالک ہو۔
- NFT منتقل کرنے کا مجاز ہونے کے تین طریقے ہیں۔ آپ مالک ہو سکتے ہیں، کسی مخصوص ٹوکن کے لیے منظور شدہ ہو سکتے ہیں، یا مالک کے تمام ٹوکنز کے لیے آپریٹر ہو سکتے ہیں۔
- ماضی کے ایونٹس صرف بلاک چین کے باہر نظر آتے ہیں۔ بلاک چین کے اندر چلنے والا کوڈ انہیں نہیں دیکھ سکتا۔

اب جائیں اور محفوظ <span dir="ltr">Vyper</span> کنٹریکٹس نافذ کریں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔
