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

[<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) معیار کا استعمال نان فنجیبل ٹوکنز (<span dir="ltr">NFT</span>) کی ملکیت رکھنے کے لیے کیا جاتا ہے۔
[<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) ٹوکنز ایک شے (commodity) کے طور پر برتاؤ کرتے ہیں، کیونکہ انفرادی ٹوکنز کے درمیان کوئی فرق نہیں ہوتا۔
اس کے برعکس، <span dir="ltr">ERC-721</span> ٹوکنز ایسے اثاثوں کے لیے بنائے گئے ہیں جو ملتے جلتے تو ہیں لیکن بالکل ایک جیسے نہیں، جیسے کہ مختلف [بلیوں کے کارٹونز](https://www.cryptokitties.co/)
یا رئیل اسٹیٹ کے مختلف حصوں کے ملکیتی حقوق۔

اس مضمون میں ہم [ریویا ناکامورا کے <span dir="ltr">ERC-721</span> کنٹریکٹ](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) کا تجزیہ کریں گے۔
یہ کنٹریکٹ [Vyper](https://vyper.readthedocs.io/en/latest/index.html) میں لکھا گیا ہے، جو کہ Python جیسی ایک کنٹریکٹ زبان ہے جسے اس طرح ڈیزائن کیا گیا ہے کہ اس میں غیر محفوظ کوڈ لکھنا Solidity کی نسبت زیادہ مشکل ہو۔

## کنٹریکٹ {#contract}

```python
# @dev ERC-721 نان فنجیبل ٹوکن اسٹینڈرڈ کا نفاذ۔
# @author Ryuya Nakamura (@nrryuya)
# یہاں سے ترمیم شدہ: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper میں تبصرے (comments)، بالکل Python کی طرح، ایک ہیش (`#`) سے شروع ہوتے ہیں اور لائن کے آخر تک جاری رہتے ہیں۔ وہ تبصرے جن میں
`@<keyword>` شامل ہوتا ہے، انہیں [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) انسانوں کے پڑھنے کے قابل دستاویزات (documentation) تیار کرنے کے لیے استعمال کرتا ہے۔

```python
from vyper.interfaces import ERC721

implements: ERC721
```

<span dir="ltr">ERC-721</span> انٹرفیس Vyper زبان میں پہلے سے موجود (built-in) ہے۔
[آپ یہاں کوڈ کی تعریف دیکھ سکتے ہیں](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)۔
انٹرفیس کی تعریف Vyper کے بجائے Python میں لکھی گئی ہے، کیونکہ انٹرفیسز نہ صرف بلاک چین کے اندر استعمال ہوتے ہیں، بلکہ کسی بیرونی کلائنٹ سے بلاک چین کو ٹرانزیکشن بھیجتے وقت بھی استعمال ہوتے ہیں، جو کہ Python میں لکھا ہو سکتا ہے۔

پہلی لائن انٹرفیس کو امپورٹ کرتی ہے، اور دوسری یہ بتاتی ہے کہ ہم اسے یہاں نافذ (implement) کر رہے ہیں۔

### <span dir="ltr">ERC721Receiver</span> انٹرفیس {#receiver-interface}

```python
# safeTransferFrom() کے ذریعے کال کیے گئے کنٹریکٹ کا انٹرفیس
interface ERC721Receiver:
    def onERC721Received(
```

<span dir="ltr">ERC-721</span> دو قسم کی منتقلی کو سپورٹ کرتا ہے:

- `transferFrom`، جو بھیجنے والے کو کسی بھی منزل کا پتہ بتانے کی اجازت دیتا ہے اور منتقلی کی ذمہ داری بھیجنے والے پر ڈالتا ہے۔ اس کا مطلب ہے کہ آپ کسی غلط پتے پر بھی منتقلی کر سکتے ہیں، جس صورت میں
  <span dir="ltr">NFT</span> ہمیشہ کے لیے ضائع ہو جاتا ہے۔
- `safeTransferFrom`، جو یہ چیک کرتا ہے کہ آیا منزل کا پتہ کوئی کنٹریکٹ ہے۔ اگر ایسا ہے، تو <span dir="ltr">ERC-721</span> کنٹریکٹ
  وصول کرنے والے کنٹریکٹ سے پوچھتا ہے کہ کیا وہ <span dir="ltr">NFT</span> وصول کرنا چاہتا ہے۔

`safeTransferFrom` درخواستوں کا جواب دینے کے لیے وصول کرنے والے کنٹریکٹ کو `ERC721Receiver` نافذ کرنا پڑتا ہے۔

```python
            _operator: address,
            _from: address,
```

`_from` پتہ ٹوکن کا موجودہ مالک ہے۔ `_operator` پتہ وہ ہے جس نے
منتقلی کی درخواست کی تھی (یہ دونوں ایک جیسے نہیں بھی ہو سکتے، الاؤنسز کی وجہ سے)۔

```python
            _tokenId: uint256,
```

<span dir="ltr">ERC-721</span> ٹوکن آئی ڈیز <span dir="ltr">256 bits</span> کی ہوتی ہیں۔ عام طور پر یہ اس چیز کی تفصیل کی ہیشنگ کر کے بنائی جاتی ہیں جس کی
ٹوکن نمائندگی کرتا ہے۔

```python
            _data: Bytes[1024]
```

درخواست میں صارف کا <span dir="ltr">1024 bytes</span> تک کا ڈیٹا ہو سکتا ہے۔

```python
        ) -> bytes32: view
```

ایسے معاملات کو روکنے کے لیے جن میں کوئی کنٹریکٹ غلطی سے منتقلی قبول کر لے، واپسی کی قدر (return value) بولین (boolean) نہیں ہوتی،
بلکہ ایک مخصوص قدر کے ساتھ <span dir="ltr">256 bits</span> ہوتی ہے۔

یہ فنکشن ایک `view` ہے، جس کا مطلب ہے کہ یہ بلاک چین کی حالت کو پڑھ سکتا ہے، لیکن اسے تبدیل نہیں کر سکتا۔

### ایونٹس {#events}

[ایونٹس](/developers/docs/smart-contracts/anatomy/#events-and-logs)
کو بلاک چین سے باہر صارفین اور سرورز کو واقعات سے آگاہ کرنے کے لیے خارج (emit) کیا جاتا ہے۔ یاد رکھیں کہ ایونٹس کا مواد
بلاک چین پر موجود کنٹریکٹس کے لیے دستیاب نہیں ہوتا۔

```python
# @dev جب کسی بھی طریقہ کار سے کسی بھی NFT کی ملکیت تبدیل ہوتی ہے تو خارج ہوتا ہے۔ یہ ایونٹ اس وقت خارج ہوتا ہے جب NFTs
#      بنائے جاتے ہیں (`from` == 0) اور تباہ کیے جاتے ہیں (`to` == 0)۔ استثنیٰ: کنٹریکٹ کی تخلیق کے دوران، کوئی بھی
#      تعداد میں NFTs بنائے اور تفویض کیے جا سکتے ہیں بغیر Transfer خارج کیے۔ کسی بھی
#      منتقلی کے وقت، اس NFT کے لیے منظور شدہ پتہ (اگر کوئی ہے) کو ری سیٹ کر کے کچھ نہیں (none) کر دیا جاتا ہے۔
# @param _from NFT بھیجنے والا (اگر پتہ صفر ایڈریس ہے تو یہ ٹوکن کی تخلیق کی نشاندہی کرتا ہے)۔
# @param _to NFT وصول کرنے والا (اگر پتہ صفر ایڈریس ہے تو یہ ٹوکن کی تباہی کی نشاندہی کرتا ہے)۔
# @param _tokenId وہ NFT جس کی منتقلی ہوئی۔
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

یہ <span dir="ltr">ERC-20</span> ٹرانسفر ایونٹ کی طرح ہے، سوائے اس کے کہ ہم رقم کے بجائے `tokenId` رپورٹ کرتے ہیں۔
صفر ایڈریس کا کوئی مالک نہیں ہوتا، اس لیے روایت کے مطابق ہم اسے ٹوکنز کی تخلیق اور تباہی کی اطلاع دینے کے لیے استعمال کرتے ہیں۔

```python
# @dev یہ اس وقت خارج ہوتا ہے جب کسی NFT کے لیے منظور شدہ پتہ تبدیل یا دوبارہ تصدیق کیا جاتا ہے۔ صفر
#      ایڈریس اس بات کی نشاندہی کرتا ہے کہ کوئی منظور شدہ پتہ نہیں ہے۔ جب کوئی Transfer ایونٹ خارج ہوتا ہے، تو یہ اس بات کی بھی
#      نشاندہی کرتا ہے کہ اس NFT کے لیے منظور شدہ پتہ (اگر کوئی ہے) کو ری سیٹ کر کے کچھ نہیں (none) کر دیا گیا ہے۔
# @param _owner NFT کا مالک۔
# @param _approved وہ پتہ جسے ہم منظور کر رہے ہیں۔
# @param _tokenId وہ NFT جسے ہم منظور کر رہے ہیں۔
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ایک <span dir="ltr">ERC-721</span> منظوری (approval) <span dir="ltr">ERC-20</span> الاؤنس کی طرح ہوتی ہے۔ ایک مخصوص پتے کو ایک مخصوص
ٹوکن منتقل کرنے کی اجازت دی جاتی ہے۔ یہ کنٹریکٹس کو ٹوکن قبول کرنے پر ردعمل ظاہر کرنے کا طریقہ کار فراہم کرتا ہے۔ کنٹریکٹس
ایونٹس کو نہیں سن سکتے، اس لیے اگر آپ صرف ٹوکن انہیں منتقل کر دیں تو انہیں اس کے بارے میں "پتہ" نہیں چلتا۔ اس طرح
مالک پہلے منظوری جمع کراتا ہے اور پھر کنٹریکٹ کو درخواست بھیجتا ہے: "میں نے آپ کو ٹوکن
X منتقل کرنے کی منظوری دے دی ہے، براہ کرم یہ کریں..."۔

یہ ایک ڈیزائن کا انتخاب ہے تاکہ <span dir="ltr">ERC-721</span> معیار کو <span dir="ltr">ERC-20</span> معیار کے مشابہ بنایا جا سکے۔ چونکہ
<span dir="ltr">ERC-721</span> ٹوکنز فنجیبل نہیں ہوتے، اس لیے ایک کنٹریکٹ ٹوکن کی ملکیت دیکھ کر بھی یہ پہچان سکتا ہے کہ اسے ایک مخصوص ٹوکن ملا ہے۔

```python
# @dev یہ اس وقت خارج ہوتا ہے جب کسی مالک کے لیے کوئی آپریٹر فعال یا غیر فعال کیا جاتا ہے۔ آپریٹر مالک کے تمام
#      NFTs کا انتظام کر سکتا ہے۔
# @param _owner NFT کا مالک۔
# @param _operator وہ پتہ جس پر ہم آپریٹر کے حقوق سیٹ کر رہے ہیں۔
# @param _approved آپریٹر کے حقوق کی حالت (اگر آپریٹر کے حقوق دیے گئے ہیں تو true اور اگر
# منسوخ کیے گئے ہیں تو false)۔
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

بعض اوقات ایک _آپریٹر_ کا ہونا مفید ہوتا ہے جو کسی اکاؤنٹ کے ایک مخصوص قسم کے تمام ٹوکنز (وہ جو کسی مخصوص کنٹریکٹ کے زیر انتظام ہوں) کا انتظام کر سکے، بالکل پاور آف اٹارنی کی طرح۔ مثال کے طور پر، میں ایک ایسے کنٹریکٹ کو یہ اختیار دینا چاہوں گا جو یہ چیک کرے کہ آیا
میں نے چھ ماہ سے اس سے رابطہ نہیں کیا، اور اگر ایسا ہے تو میرے اثاثے میرے ورثاء میں تقسیم کر دے (اگر ان میں سے کوئی اس کی درخواست کرے، کنٹریکٹس
ٹرانزیکشن کے ذریعے کال کیے بغیر کچھ نہیں کر سکتے)۔ <span dir="ltr">ERC-20</span> میں ہم صرف ایک وراثتی کنٹریکٹ کو زیادہ الاؤنس دے سکتے ہیں،
لیکن یہ <span dir="ltr">ERC-721</span> کے لیے کام نہیں کرتا کیونکہ ٹوکنز فنجیبل نہیں ہوتے۔ یہ اسی کا متبادل ہے۔

`approved` قدر ہمیں بتاتی ہے کہ آیا ایونٹ منظوری کے لیے ہے، یا منظوری واپس لینے کے لیے۔

### حالت کے متغیرات (State Variables) {#state-vars}

یہ متغیرات (variables) ٹوکنز کی موجودہ حالت پر مشتمل ہوتے ہیں: کون سے دستیاب ہیں اور ان کا مالک کون ہے۔ ان میں سے زیادہ تر
`HashMap` آبجیکٹس ہیں، [یک طرفہ میپنگز جو دو اقسام کے درمیان موجود ہوتی ہیں](https://vyper.readthedocs.io/en/latest/types.html#mappings)۔

```python
# @dev NFT ID سے اس کے مالک کے پتہ تک میپنگ۔
idToOwner: HashMap[uint256, address]

# @dev NFT ID سے منظور شدہ پتہ تک میپنگ۔
idToApprovals: HashMap[uint256, address]
```

ایتھیریم میں صارف اور کنٹریکٹ کی شناخت کو <span dir="ltr">160-bit</span> پتوں سے ظاہر کیا جاتا ہے۔ یہ دو متغیرات میپ کرتے ہیں
ٹوکن آئی ڈیز سے ان کے مالکان اور انہیں منتقل کرنے کی منظوری پانے والوں تک (ہر ایک کے لیے زیادہ سے زیادہ ایک)۔ ایتھیریم میں،
غیر شروع شدہ (uninitialized) ڈیٹا ہمیشہ صفر ہوتا ہے، لہذا اگر کوئی مالک یا منظور شدہ ٹرانسفرر نہیں ہے تو اس ٹوکن کی قدر
صفر ہوتی ہے۔

```python
# @dev مالک کے پتہ سے اس کے ٹوکنز کی گنتی تک میپنگ۔
ownerToNFTokenCount: HashMap[address, uint256]
```

یہ متغیر ہر مالک کے لیے ٹوکنز کی گنتی رکھتا ہے۔ مالکان سے ٹوکنز تک کوئی میپنگ نہیں ہے، اس لیے
کسی مخصوص مالک کے ٹوکنز کی شناخت کرنے کا واحد طریقہ بلاک چین کی ایونٹ ہسٹری میں پیچھے مڑ کر دیکھنا اور
مناسب `Transfer` ایونٹس کو تلاش کرنا ہے۔ ہم اس متغیر کا استعمال یہ جاننے کے لیے کر سکتے ہیں کہ ہمارے پاس تمام <span dir="ltr">NFTs</span> کب آ گئے ہیں اور
ہمیں مزید پیچھے دیکھنے کی ضرورت نہیں ہے۔

یاد رکھیں کہ یہ الگورتھم صرف یوزر انٹرفیسز اور بیرونی سرورز کے لیے کام کرتا ہے۔ خود بلاک چین پر چلنے والا کوڈ
ماضی کے ایونٹس کو نہیں پڑھ سکتا۔

```python
# @dev مالک کے پتہ سے آپریٹر کے پتوں کی میپنگ تک میپنگ۔
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

ایک اکاؤنٹ کے ایک سے زیادہ آپریٹرز ہو سکتے ہیں۔ ان کا ٹریک رکھنے کے لیے ایک سادہ `HashMap` ناکافی ہے،
کیونکہ ہر کلید ایک ہی قدر کی طرف لے جاتی ہے۔ اس کے بجائے، آپ
`HashMap[address, bool]` کو قدر کے طور پر استعمال کر سکتے ہیں۔ پہلے سے طے شدہ (by default) ہر پتے کی قدر `False` ہوتی ہے، جس کا مطلب ہے کہ یہ
آپریٹر نہیں ہے۔ آپ ضرورت کے مطابق اقدار کو `True` پر سیٹ کر سکتے ہیں۔

```python
# @dev منٹر کا پتہ، جو ٹوکن کو ڈھال سکتا ہے
minter: address
```

نئے ٹوکنز کو کسی نہ کسی طرح بنانا پڑتا ہے۔ اس کنٹریکٹ میں صرف ایک ہی ہستی کو ایسا کرنے کی اجازت ہے، جو کہ
`minter` ہے۔ مثال کے طور پر، یہ کسی گیم کے لیے کافی ہو سکتا ہے۔ دیگر مقاصد کے لیے، زیادہ پیچیدہ کاروباری منطق (business logic) بنانا ضروری ہو سکتا ہے۔

```python
# @dev انٹرفیس آئی ڈی سے بولین (bool) تک میپنگ کہ آیا یہ سپورٹڈ ہے یا نہیں۔
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 کی ERC165 انٹرفیس آئی ڈی
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721 کی ERC165 انٹرفیس آئی ڈی
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[<span dir="ltr">ERC-165</span>](https://eips.ethereum.org/EIPS/eip-165) ایک کنٹریکٹ کے لیے یہ ظاہر کرنے کا طریقہ کار بتاتا ہے کہ ایپلی کیشنز
اس کے ساتھ کیسے بات چیت کر سکتی ہیں، اور یہ کن <span dir="ltr">ERCs</span> کی تعمیل کرتا ہے۔ اس صورت میں، کنٹریکٹ <span dir="ltr">ERC-165</span> اور <span dir="ltr">ERC-721</span> کی تعمیل کرتا ہے۔

### فنکشنز {#functions}

یہ وہ فنکشنز ہیں جو دراصل <span dir="ltr">ERC-721</span> کو نافذ کرتے ہیں۔

#### کنسٹرکٹر {#constructor}

```python
@external
def __init__():
```

Vyper میں، بالکل Python کی طرح، کنسٹرکٹر فنکشن کو `__init__` کہا جاتا ہے۔

```python
    """
    @dev کنٹریکٹ کنسٹرکٹر۔
    """
```

Python اور Vyper میں، آپ ایک ملٹی لائن سٹرنگ (جو `"""` سے شروع اور ختم ہوتی ہے) بتا کر بھی تبصرہ بنا سکتے ہیں،
اور اسے کسی بھی طرح استعمال نہیں کر سکتے۔ ان تبصروں میں
[NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) بھی شامل ہو سکتا ہے۔

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

حالت کے متغیرات تک رسائی حاصل کرنے کے لیے آپ `self.<variable name>` استعمال کرتے ہیں (دوبارہ، بالکل Python کی طرح)۔

#### ویو فنکشنز (View Functions) {#views}

یہ وہ فنکشنز ہیں جو بلاک چین کی حالت کو تبدیل نہیں کرتے، اور اس لیے اگر انہیں بیرونی طور پر کال کیا جائے تو انہیں
مفت میں چلایا جا سکتا ہے۔ اگر ویو فنکشنز کو کسی کنٹریکٹ کے ذریعے کال کیا جائے تو انہیں پھر بھی ہر نوڈ پر چلانا پڑتا ہے اور اس لیے ان پر گیس خرچ ہوتی ہے۔

```python
@view
@external
```

فنکشن کی تعریف سے پہلے یہ کلیدی الفاظ جو ایٹ سائن (`@`) سے شروع ہوتے ہیں، انہیں _ڈیکوریشنز_ (decorations) کہا جاتا ہے۔ یہ
ان حالات کی وضاحت کرتے ہیں جن میں کسی فنکشن کو کال کیا جا سکتا ہے۔

- `@view` یہ بتاتا ہے کہ یہ فنکشن ایک ویو (view) ہے۔
- `@external` یہ بتاتا ہے کہ اس مخصوص فنکشن کو ٹرانزیکشنز اور دیگر کنٹریکٹس کے ذریعے کال کیا جا سکتا ہے۔

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python کے برعکس، Vyper ایک [سٹیٹک ٹائپڈ زبان](https://wikipedia.org/wiki/Type_system#Static_type_checking) ہے۔
آپ [ڈیٹا ٹائپ](https://vyper.readthedocs.io/en/latest/types.html) کی شناخت کیے بغیر کسی متغیر، یا فنکشن پیرامیٹر کا اعلان نہیں کر سکتے۔ اس صورت میں ان پٹ پیرامیٹر `bytes32` ہے، جو کہ ایک <span dir="ltr">256-bit</span> قدر ہے
(<span dir="ltr">256 bits</span> [ایتھیریم ورچوئل مشین](/developers/docs/evm/) کا مقامی ورڈ سائز ہے)۔ آؤٹ پٹ ایک بولین
قدر ہے۔ روایت کے مطابق، فنکشن پیرامیٹرز کے نام انڈرسکور (`_`) سے شروع ہوتے ہیں۔

```python
    """
    @dev انٹرفیس کی شناخت ERC-165 میں بیان کی گئی ہے۔
    @param _interfaceID انٹرفیس کی آئی ڈی
    """
    return self.supportedInterfaces[_interfaceID]
```

`self.supportedInterfaces` ہیش میپ (HashMap) سے قدر واپس کریں، جو کنسٹرکٹر (`__init__`) میں سیٹ کی گئی ہے۔

```python
### ویو فنکشنز ###
```

یہ وہ ویو فنکشنز ہیں جو ٹوکنز کے بارے میں معلومات صارفین اور دیگر کنٹریکٹس کو دستیاب کراتے ہیں۔

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner` کی ملکیت میں موجود NFTs کی تعداد لوٹاتا ہے۔
         اگر `_owner` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے۔ صفر ایڈریس کو تفویض کردہ NFTs کو نامانوس (invalid) سمجھا جاتا ہے۔
    @param _owner وہ پتہ جس کا بیلنس معلوم کرنا ہے۔
    """
    assert _owner != ZERO_ADDRESS
```

یہ لائن [یقینی بناتی ہے](https://vyper.readthedocs.io/en/latest/statements.html#assert) کہ `_owner`
صفر نہیں ہے۔ اگر ایسا ہے، تو ایک خرابی ہے اور آپریشن کو ریورٹ کر دیا جاتا ہے۔

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT کے مالک کا پتہ لوٹاتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔
    @param _tokenId NFT کا شناخت کنندہ۔
    """
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے
    assert owner != ZERO_ADDRESS
    return owner
```

ایتھیریم ورچوئل مشین (<span dir="ltr">EVM</span>) میں کوئی بھی سٹوریج جس میں کوئی قدر محفوظ نہ ہو، وہ صفر ہوتی ہے۔
اگر `_tokenId` پر کوئی ٹوکن نہیں ہے تو `self.idToOwner[_tokenId]` کی قدر صفر ہوتی ہے۔ اس
صورت میں فنکشن ریورٹ ہو جاتا ہے۔

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev ایک سنگل NFT کے لیے منظور شدہ پتہ حاصل کریں۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔
    @param _tokenId اس NFT کی آئی ڈی جس کی منظوری معلوم کرنی ہے۔
    """
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

یاد رکھیں کہ `getApproved` صفر واپس _کر سکتا ہے_۔ اگر ٹوکن درست ہے تو یہ `self.idToApprovals[_tokenId]` واپس کرتا ہے۔
اگر کوئی منظوری دینے والا نہیں ہے تو وہ قدر صفر ہوتی ہے۔

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

یہ فنکشن چیک کرتا ہے کہ آیا `_operator` کو اس کنٹریکٹ میں `_owner` کے تمام ٹوکنز کا انتظام کرنے کی اجازت ہے۔
چونکہ ایک سے زیادہ آپریٹرز ہو سکتے ہیں، اس لیے یہ دو درجے کا ہیش میپ (HashMap) ہے۔

#### ٹرانسفر ہیلپر فنکشنز {#transfer-helpers}

یہ فنکشنز ان آپریشنز کو نافذ کرتے ہیں جو ٹوکنز کی منتقلی یا انتظام کا حصہ ہیں۔

```python

### ٹرانسفر فنکشن ہیلپرز ###

@view
@internal
```

اس ڈیکوریشن، `@internal`، کا مطلب ہے کہ فنکشن صرف اسی کنٹریکٹ کے اندر موجود دیگر فنکشنز سے قابل رسائی ہے۔
روایت کے مطابق، ان فنکشنز کے نام بھی انڈرسکور (`_`) سے شروع ہوتے ہیں۔

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev لوٹاتا ہے کہ آیا دیا گیا خرچ کرنے والا (spender) دی گئی ٹوکن آئی ڈی کی منتقلی کر سکتا ہے یا نہیں
    @param spender خرچ کرنے والے کا پتہ جس کے بارے میں معلوم کرنا ہے
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

1. پتہ ٹوکن کا مالک ہو
2. پتے کو وہ ٹوکن خرچ کرنے کی منظوری دی گئی ہو
3. پتہ ٹوکن کے مالک کا آپریٹر ہو

مندرجہ بالا فنکشن ایک ویو ہو سکتا ہے کیونکہ یہ حالت کو تبدیل نہیں کرتا۔ آپریٹنگ اخراجات کو کم کرنے کے لیے، کوئی بھی
فنکشن جو ویو _ہو سکتا ہے_ اسے ویو _ہونا چاہیے_۔

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev دیے گئے پتہ پر ایک NFT شامل کریں
         اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (Throws) دیتا ہے۔
    """
    # اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (Throws) دیتا ہے
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # مالک کو تبدیل کریں
    self.idToOwner[_tokenId] = _to
    # گنتی کی ٹریکنگ کو تبدیل کریں
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev دیے گئے پتہ سے ایک NFT ہٹائیں
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے۔
    """
    # اگر `_from` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے
    assert self.idToOwner[_tokenId] == _from
    # مالک کو تبدیل کریں
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # گنتی کی ٹریکنگ کو تبدیل کریں
    self.ownerToNFTokenCount[_from] -= 1
```

جب منتقلی میں کوئی مسئلہ ہوتا ہے تو ہم کال کو ریورٹ کر دیتے ہیں۔

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev دیے گئے پتہ کی منظوری کو صاف (Clear) کریں
         اگر `_owner` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے۔
    """
    # اگر `_owner` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # منظوریوں کو ری سیٹ کریں
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

صرف ضرورت پڑنے پر ہی قدر تبدیل کریں۔ حالت کے متغیرات سٹوریج میں رہتے ہیں۔ سٹوریج میں لکھنا
ان سب سے مہنگے آپریشنز میں سے ایک ہے جو <span dir="ltr">EVM</span> (ایتھیریم ورچوئل مشین) کرتا ہے ([گیس](/developers/docs/gas/) کے لحاظ سے)۔ اس لیے، اسے کم سے کم کرنا ایک اچھا خیال ہے، یہاں تک کہ
موجودہ قدر کو لکھنے کی بھی زیادہ قیمت ہوتی ہے۔

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFT کی منتقلی کو انجام دیں۔
         ایرر (Throws) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         پتہ نہ ہو۔ (نوٹ: پرائیویٹ فنکشن میں `msg.sender` کی اجازت نہیں ہے اس لیے `_sender` پاس کریں۔)
         اگر `_to` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔
    """
```

ہمارے پاس یہ اندرونی فنکشن اس لیے ہے کیونکہ ٹوکنز منتقل کرنے کے دو طریقے ہیں (باقاعدہ اور محفوظ)، لیکن
ہم کوڈ میں صرف ایک ہی جگہ چاہتے ہیں جہاں ہم یہ کریں تاکہ آڈیٹنگ کو آسان بنایا جا سکے۔

```python
    # ضروریات چیک کریں
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # اگر `_to` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے
    assert _to != ZERO_ADDRESS
    # منظوری صاف کریں۔ اگر `_from` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے
    self._clearApproval(_from, _tokenId)
    # NFT ہٹائیں۔ اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے
    self._removeTokenFrom(_from, _tokenId)
    # NFT شامل کریں
    self._addTokenTo(_to, _tokenId)
    # منتقلی کو لاگ کریں
    log Transfer(_from, _to, _tokenId)
```

Vyper میں ایونٹ خارج کرنے کے لیے آپ `log` سٹیٹمنٹ استعمال کرتے ہیں ([مزید تفصیلات کے لیے یہاں دیکھیں](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging))۔

#### ٹرانسفر فنکشنز {#transfer-funs}

```python

### ٹرانسفر فنکشنز ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev ایرر (Throws) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         پتہ نہ ہو۔
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_to` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔
    @notice کال کرنے والا اس بات کی تصدیق کرنے کا ذمہ دار ہے کہ `_to` NFTs وصول کرنے کی صلاحیت رکھتا ہے ورنہ
            وہ ہمیشہ کے لیے ضائع ہو سکتے ہیں۔
    @param _from NFT کا موجودہ مالک۔
    @param _to نیا مالک۔
    @param _tokenId وہ NFT جس کی منتقلی کرنی ہے۔
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

یہ فنکشن آپ کو کسی بھی صوابدیدی (arbitrary) پتے پر منتقل کرنے کی اجازت دیتا ہے۔ جب تک کہ پتہ کوئی صارف نہ ہو، یا کوئی ایسا کنٹریکٹ نہ ہو جو
ٹوکنز منتقل کرنا جانتا ہو، آپ کا منتقل کردہ کوئی بھی ٹوکن اس پتے میں پھنس جائے گا اور بیکار ہو جائے گا۔

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev ایک NFT کی ملکیت کو ایک پتہ سے دوسرے پتہ پر منتقل کرتا ہے۔
         ایرر (Throws) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے
         منظور شدہ پتہ نہ ہو۔
         اگر `_from` موجودہ مالک نہیں ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_to` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_to` ایک سمارٹ کنٹریکٹ ہے، تو یہ `_to` پر `onERC721Received` کو کال کرتا ہے اور اگر
         واپسی کی قدر `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` نہیں ہے تو ایرر (Throws) دیتا ہے۔
         نوٹ: bytes4 کو پیڈنگ کے ساتھ bytes32 کے ذریعے ظاہر کیا جاتا ہے
    @param _from NFT کا موجودہ مالک۔
    @param _to نیا مالک۔
    @param _tokenId وہ NFT جس کی منتقلی کرنی ہے۔
    @param _data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `_to` کی کال میں بھیجا جاتا ہے۔
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

پہلے منتقلی کرنا ٹھیک ہے کیونکہ اگر کوئی مسئلہ ہوا تو ہم ویسے بھی ریورٹ کرنے والے ہیں،
اس لیے کال میں کیا گیا ہر کام منسوخ ہو جائے گا۔

```python
    if _to.is_contract: # چیک کریں کہ آیا `_to` ایک کنٹریکٹ کا پتہ ہے
```

پہلے یہ چیک کریں کہ آیا پتہ کوئی کنٹریکٹ ہے (اگر اس میں کوڈ ہے)۔ اگر نہیں، تو فرض کریں کہ یہ صارف کا
پتہ ہے اور صارف ٹوکن استعمال کرنے یا اسے منتقل کرنے کے قابل ہو گا۔ لیکن اسے آپ کو تحفظ کے جھوٹے احساس میں مبتلا نہ ہونے دیں۔ آپ ٹوکنز کھو سکتے ہیں، یہاں تک کہ `safeTransferFrom` کے ساتھ بھی، اگر آپ
انہیں کسی ایسے پتے پر منتقل کرتے ہیں جس کی نجی کلید کوئی نہیں جانتا۔

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ہدف کنٹریکٹ کو کال کریں تاکہ یہ دیکھا جا سکے کہ آیا وہ <span dir="ltr">ERC-721</span> ٹوکنز وصول کر سکتا ہے۔

```python
        # اگر منتقلی کی منزل ایک ایسا کنٹریکٹ ہے جو 'onERC721Received' کو نافذ نہیں کرتا ہے تو ایرر (Throws) دیتا ہے
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

اگر منزل ایک کنٹریکٹ ہے، لیکن ایسا جو <span dir="ltr">ERC-721</span> ٹوکنز قبول نہیں کرتا (یا جس نے اس مخصوص منتقلی کو
قبول نہ کرنے کا فیصلہ کیا ہے)، تو ریورٹ کریں۔

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev کسی NFT کے لیے منظور شدہ پتہ سیٹ کریں یا دوبارہ تصدیق کریں۔ صفر ایڈریس اس بات کی نشاندہی کرتا ہے کہ کوئی منظور شدہ پتہ نہیں ہے۔
         ایرر (Throws) دیتا ہے جب تک کہ `msg.sender` موجودہ NFT کا مالک، یا موجودہ مالک کا مجاز آپریٹر نہ ہو۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا ہے)
         اگر `_approved` موجودہ مالک ہے تو ایرر (Throws) دیتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا ہے)
    @param _approved دی گئی NFT آئی ڈی کے لیے منظور کیا جانے والا پتہ۔
    @param _tokenId منظور کیے جانے والے ٹوکن کی آئی ڈی۔
    """
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے
    assert owner != ZERO_ADDRESS
    # اگر `_approved` موجودہ مالک ہے تو ایرر (Throws) دیتا ہے
    assert _approved != owner
```

روایت کے مطابق اگر آپ نہیں چاہتے کہ کوئی منظوری دینے والا ہو تو آپ صفر ایڈریس مقرر کرتے ہیں، خود کو نہیں۔

```python
    # ضروریات چیک کریں
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

منظوری سیٹ کرنے کے لیے آپ یا تو مالک ہو سکتے ہیں، یا مالک کی طرف سے مجاز آپریٹر۔

```python
    # منظوری سیٹ کریں
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev کسی تیسرے فریق ("آپریٹر") کے لیے `msg.sender` کے تمام اثاثوں کا انتظام کرنے کی منظوری کو فعال یا غیر فعال کرتا ہے۔ یہ ApprovalForAll ایونٹ بھی خارج کرتا ہے۔
         اگر `_operator` ہی `msg.sender` ہے تو ایرر (Throws) دیتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا ہے)
    @notice یہ اس وقت بھی کام کرتا ہے جب بھیجنے والے کے پاس اس وقت کوئی ٹوکن نہ ہو۔
    @param _operator مجاز آپریٹرز کے سیٹ میں شامل کرنے کے لیے پتہ۔
    @param _approved اگر آپریٹرز منظور شدہ ہیں تو True، منظوری منسوخ کرنے کے لیے false۔
    """
    # اگر `_operator` ہی `msg.sender` ہے تو ایرر (Throws) دیتا ہے
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### نئے ٹوکنز ڈھالنا اور موجودہ کو تباہ کرنا {#mint-burn}

جس اکاؤنٹ نے کنٹریکٹ بنایا ہے وہ `minter` ہے، وہ سپر یوزر جو نئے
<span dir="ltr">NFTs</span> ڈھالنے کا مجاز ہے۔ تاہم، اسے بھی موجودہ ٹوکنز جلانے کی اجازت نہیں ہے۔ صرف مالک، یا مالک کی طرف سے
مجاز کوئی ہستی ہی ایسا کر سکتی ہے۔

```python
### ڈھالنے اور جلانے کے فنکشنز ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

یہ فنکشن ہمیشہ `True` واپس کرتا ہے، کیونکہ اگر آپریشن ناکام ہو جاتا ہے تو اسے ریورٹ کر دیا جاتا ہے۔

```python
    """
    @dev ٹوکنز ڈھالنے کا فنکشن
         اگر `msg.sender` منٹر نہیں ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_to` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے۔
         اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (Throws) دیتا ہے۔
    @param _to وہ پتہ جو ڈھالے گئے ٹوکنز وصول کرے گا۔
    @param _tokenId ڈھالنے کے لیے ٹوکن آئی ڈی۔
    @return ایک بولین جو ظاہر کرتا ہے کہ آیا آپریشن کامیاب رہا۔
    """
    # اگر `msg.sender` منٹر نہیں ہے تو ایرر (Throws) دیتا ہے
    assert msg.sender == self.minter
```

صرف منٹر (وہ اکاؤنٹ جس نے <span dir="ltr">ERC-721</span> کنٹریکٹ بنایا ہے) ہی نئے ٹوکنز ڈھال سکتا ہے۔ یہ
مستقبل میں ایک مسئلہ ہو سکتا ہے اگر ہم منٹر کی شناخت تبدیل کرنا چاہیں۔
پروڈکشن کنٹریکٹ میں آپ شاید ایک ایسا فنکشن چاہیں گے جو منٹر کو منٹر کے مراعات کسی اور کو منتقل کرنے کی اجازت دے۔

```python
    # اگر `_to` صفر ایڈریس ہے تو ایرر (Throws) دیتا ہے
    assert _to != ZERO_ADDRESS
    # NFT شامل کریں۔ اگر `_tokenId` کسی کی ملکیت ہے تو ایرر (Throws) دیتا ہے
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

روایت کے مطابق، نئے ٹوکنز کی ڈھلائی کو صفر ایڈریس سے منتقلی کے طور پر شمار کیا جاتا ہے۔

```python

@external
def burn(_tokenId: uint256):
    """
    @dev ایک مخصوص ERC721 ٹوکن کو جلاتا ہے۔
         ایرر (Throws) دیتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         پتہ نہ ہو۔
         اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے۔
    @param _tokenId جلائے جانے والے ERC721 ٹوکن کی uint256 آئی ڈی۔
    """
    # ضروریات چیک کریں
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک درست NFT نہیں ہے تو ایرر (Throws) دیتا ہے
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

جس کسی کو بھی ٹوکن منتقل کرنے کی اجازت ہے اسے جلانے کی بھی اجازت ہے۔ اگرچہ جلانا
صفر ایڈریس پر منتقل کرنے کے مترادف لگتا ہے، لیکن صفر ایڈریس دراصل ٹوکن وصول نہیں کرتا۔ یہ ہمیں
وہ تمام سٹوریج خالی کرنے کی اجازت دیتا ہے جو ٹوکن کے لیے استعمال کی گئی تھی، جس سے ٹرانزیکشن کی گیس کی قیمت کم ہو سکتی ہے۔

## اس کنٹریکٹ کا استعمال {#using-contract}

Solidity کے برعکس، Vyper میں وراثت (inheritance) نہیں ہوتی۔ یہ ایک دانستہ ڈیزائن کا انتخاب ہے تاکہ
کوڈ کو واضح اور اس لیے محفوظ بنانے میں آسانی ہو۔ لہذا اپنا Vyper <span dir="ltr">ERC-721</span> کنٹریکٹ بنانے کے لیے آپ [یہ
کنٹریکٹ](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) لیتے ہیں اور اپنی مطلوبہ کاروباری منطق کو نافذ کرنے کے لیے اس میں ترمیم کرتے ہیں۔

## نتیجہ {#conclusion}

جائزے کے لیے، اس کنٹریکٹ کے کچھ اہم ترین خیالات یہ ہیں:

- محفوظ منتقلی کے ساتھ <span dir="ltr">ERC-721</span> ٹوکنز وصول کرنے کے لیے، کنٹریکٹس کو `ERC721Receiver` انٹرفیس نافذ کرنا پڑتا ہے۔
- یہاں تک کہ اگر آپ محفوظ منتقلی کا استعمال کرتے ہیں، تب بھی ٹوکنز پھنس سکتے ہیں اگر آپ انہیں کسی ایسے پتے پر بھیجتے ہیں جس کی نجی کلید
  نامعلوم ہے۔
- جب کسی آپریشن میں کوئی مسئلہ ہو تو کال کو `revert` کرنا ایک اچھا خیال ہے، بجائے اس کے کہ صرف
  ناکامی کی قدر واپس کی جائے۔
- <span dir="ltr">ERC-721</span> ٹوکنز تب موجود ہوتے ہیں جب ان کا کوئی مالک ہو۔
- <span dir="ltr">NFT</span> منتقل کرنے کا مجاز ہونے کے تین طریقے ہیں۔ آپ مالک ہو سکتے ہیں، کسی مخصوص ٹوکن کے لیے منظور شدہ ہو سکتے ہیں،
  یا مالک کے تمام ٹوکنز کے لیے آپریٹر ہو سکتے ہیں۔
- ماضی کے ایونٹس صرف بلاک چین کے باہر نظر آتے ہیں۔ بلاک چین کے اندر چلنے والا کوڈ انہیں نہیں دیکھ سکتا۔

اب جائیں اور محفوظ Vyper کنٹریکٹس نافذ کریں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔