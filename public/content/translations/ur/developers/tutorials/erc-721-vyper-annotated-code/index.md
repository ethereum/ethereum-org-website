---
title: "Vyper ERC-721 کنٹریکٹ کا جائزہ"
description: "Ryuya Nakamura کا ERC-721 کنٹریکٹ اور یہ کیسے کام کرتا ہے"
author: "اوری پومرانٹز"
lang: ur
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: Vyper ERC-721
published: 2021-04-01
---

## تعارف {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) اسٹینڈرڈ کو Non-Fungible Tokens (NFT) کی ملکیت رکھنے کے لیے استعمال کیا جاتا ہے۔
[ERC-20](/developers/docs/standards/tokens/erc-20/) ٹوکنز ایک کموڈٹی (commodity) کے طور پر برتاؤ کرتے ہیں، کیونکہ انفرادی ٹوکنز کے درمیان کوئی فرق نہیں ہوتا۔
اس کے برعکس، ERC-721 ٹوکنز ایسے اثاثوں کے لیے بنائے گئے ہیں جو ملتے جلتے تو ہیں لیکن بالکل ایک جیسے نہیں، جیسے کہ مختلف [بلیوں کے کارٹونز](https://www.cryptokitties.co/) یا رئیل اسٹیٹ کے مختلف حصوں کے ٹائٹلز۔

اس مضمون میں ہم [Ryuya Nakamura کے ERC-721 کنٹریکٹ](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) کا تجزیہ کریں گے۔
یہ کنٹریکٹ [Vyper](https://vyper.readthedocs.io/en/latest/index.html) میں لکھا گیا ہے، جو کہ Python جیسی ایک کنٹریکٹ زبان ہے جسے اس طرح ڈیزائن کیا گیا ہے کہ اس میں غیر محفوظ کوڈ لکھنا Solidity کی نسبت زیادہ مشکل ہو۔

## کنٹریکٹ {#contract}

```python
# @dev ERC-721 نان فنجیبل ٹوکن (non-fungible token) سٹینڈرڈ کی امپلیمینٹیشن۔
# @author Ryuya Nakamura (@nrryuya)
# یہاں سے تبدیل کیا گیا: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper میں تبصرے (comments)، بالکل Python کی طرح، ہیش (`#`) سے شروع ہوتے ہیں اور لائن کے آخر تک جاری رہتے ہیں۔ وہ تبصرے جن میں `@<keyword>` شامل ہوتا ہے، انہیں [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) انسانوں کے پڑھنے کے قابل دستاویزات (documentation) بنانے کے لیے استعمال کرتا ہے۔

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 انٹرفیس Vyper زبان میں پہلے سے موجود (built-in) ہے۔
[آپ کوڈ کی تعریف یہاں دیکھ سکتے ہیں](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py)۔
انٹرفیس کی تعریف Vyper کے بجائے Python میں لکھی گئی ہے، کیونکہ انٹرفیسز نہ صرف بلاک چین کے اندر استعمال ہوتے ہیں، بلکہ بیرونی کلائنٹ سے بلاک چین کو ٹرانزیکشن بھیجتے وقت بھی استعمال ہوتے ہیں، جو کہ Python میں لکھا ہو سکتا ہے۔

پہلی لائن انٹرفیس کو امپورٹ کرتی ہے، اور دوسری یہ بتاتی ہے کہ ہم اسے یہاں نافذ (implement) کر رہے ہیں۔

### ERC721Receiver انٹرفیس {#receiver-interface}

```python
# safeTransferFrom() کے ذریعے کال کیے گئے کانٹریکٹ کا انٹرفیس
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721 دو قسم کی منتقلی (transfer) کو سپورٹ کرتا ہے:

- `transferFrom`، جو بھیجنے والے کو کسی بھی منزل کا ایڈریس (destination address) بتانے کی اجازت دیتا ہے اور منتقلی کی ذمہ داری بھیجنے والے پر ڈالتا ہے۔ اس کا مطلب ہے کہ آپ کسی نامانوس (invalid) ایڈریس پر بھی منتقلی کر سکتے ہیں، جس صورت میں NFT ہمیشہ کے لیے ضائع ہو جاتا ہے۔
- `safeTransferFrom`، جو یہ چیک کرتا ہے کہ آیا منزل کا ایڈریس کوئی کنٹریکٹ ہے۔ اگر ایسا ہے، تو ERC-721 کنٹریکٹ وصول کرنے والے کنٹریکٹ سے پوچھتا ہے کہ کیا وہ NFT وصول کرنا چاہتا ہے۔

`safeTransferFrom` کی درخواستوں کا جواب دینے کے لیے وصول کرنے والے کنٹریکٹ کو `ERC721Receiver` نافذ کرنا پڑتا ہے۔

```python
            _operator: address,
            _from: address,
```

`_from` ایڈریس ٹوکن کا موجودہ مالک ہے۔ `_operator` ایڈریس وہ ہے جس نے منتقلی کی درخواست کی ہے (یہ دونوں الاؤنسز کی وجہ سے ایک جیسے نہیں بھی ہو سکتے)۔

```python
            _tokenId: uint256,
```

ERC-721 ٹوکن IDs 256 بٹس کے ہوتے ہیں۔ عام طور پر یہ اس چیز کی تفصیل کو ہیش (hash) کر کے بنائے جاتے ہیں جس کی ٹوکن نمائندگی کرتا ہے۔

```python
            _data: Bytes[1024]
```

درخواست میں 1024 بائٹس تک کا صارف کا ڈیٹا ہو سکتا ہے۔

```python
        ) -> bytes32: view
```

ایسے معاملات کو روکنے کے لیے جن میں کوئی کنٹریکٹ غلطی سے منتقلی کو قبول کر لے، واپسی کی قدر (return value) بولین (boolean) نہیں ہوتی، بلکہ ایک مخصوص قدر کے ساتھ 256 بٹس ہوتی ہے۔

یہ فنکشن ایک `view` ہے، جس کا مطلب ہے کہ یہ بلاک چین کی اسٹیٹ (state) کو پڑھ سکتا ہے، لیکن اسے تبدیل نہیں کر سکتا۔

### ایونٹس {#events}

[ایونٹس](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e) کو بلاک چین سے باہر کے صارفین اور سرورز کو واقعات کی اطلاع دینے کے لیے خارج (emit) کیا جاتا ہے۔ یاد رکھیں کہ ایونٹس کا مواد بلاک چین پر موجود کنٹریکٹس کے لیے دستیاب نہیں ہوتا۔

```python
# @dev جب کسی بھی طریقے سے کسی NFT کی ملکیت تبدیل ہوتی ہے تو یہ ایمٹ (emit) ہوتا ہے۔ یہ ایونٹ تب ایمٹ ہوتا ہے جب NFTs
# بنائے جاتے ہیں (`from` == 0) اور ختم کیے جاتے ہیں (`to` == 0)۔ استثنیٰ: کانٹریکٹ بننے کے دوران، کوئی بھی
# تعداد میں NFTs بنائے اور تفویض کیے جا سکتے ہیں بغیر Transfer ایمٹ کیے۔ کسی بھی
# ٹرانسفر کے وقت، اس NFT کا منظور شدہ ایڈریس (اگر کوئی ہو) ری سیٹ ہو کر ختم (none) ہو جاتا ہے۔
# @param _from NFT بھیجنے والا (اگر ایڈریس زیرو ایڈریس ہے تو یہ ٹوکن بننے کی نشاندہی کرتا ہے)۔
# @param _to NFT وصول کرنے والا (اگر ایڈریس زیرو ایڈریس ہے تو یہ ٹوکن ختم ہونے کی نشاندہی کرتا ہے)۔
# @param _tokenId وہ NFT جو ٹرانسفر ہوا۔
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

یہ ERC-20 ٹرانسفر ایونٹ سے ملتا جلتا ہے، سوائے اس کے کہ ہم رقم کے بجائے `tokenId` رپورٹ کرتے ہیں۔ ایڈریس صفر (zero address) کا کوئی مالک نہیں ہوتا، اس لیے روایت کے مطابق ہم اسے ٹوکنز کی تخلیق اور تباہی کی رپورٹ دینے کے لیے استعمال کرتے ہیں۔

```python
# @dev یہ تب ایمٹ ہوتا ہے جب کسی NFT کا منظور شدہ ایڈریس تبدیل یا دوبارہ تصدیق کیا جاتا ہے۔ زیرو
# ایڈریس ظاہر کرتا ہے کہ کوئی منظور شدہ ایڈریس نہیں ہے۔ جب کوئی Transfer ایونٹ ایمٹ ہوتا ہے، تو یہ بھی
# ظاہر کرتا ہے کہ اس NFT کا منظور شدہ ایڈریس (اگر کوئی ہو) ری سیٹ ہو کر ختم (none) ہو گیا ہے۔
# @param _owner NFT کا مالک۔
# @param _approved وہ ایڈریس جسے ہم منظور کر رہے ہیں۔
# @param _tokenId وہ NFT جسے ہم منظور کر رہے ہیں۔
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 کی منظوری (approval) ERC-20 الاؤنس کی طرح ہے۔ ایک مخصوص ایڈریس کو ایک مخصوص ٹوکن منتقل کرنے کی اجازت دی جاتی ہے۔ یہ کنٹریکٹس کو ٹوکن قبول کرنے پر ردعمل ظاہر کرنے کا طریقہ کار فراہم کرتا ہے۔ کنٹریکٹس ایونٹس کو نہیں سن سکتے، اس لیے اگر آپ صرف ٹوکن انہیں منتقل کر دیں تو انہیں اس کے بارے میں "پتہ" نہیں چلتا۔ اس طرح مالک پہلے منظوری جمع کراتا ہے اور پھر کنٹریکٹ کو درخواست بھیجتا ہے: "میں نے آپ کو ٹوکن X منتقل کرنے کی منظوری دے دی ہے، براہ کرم ..."۔

یہ ایک ڈیزائن کا انتخاب ہے تاکہ ERC-721 اسٹینڈرڈ کو ERC-20 اسٹینڈرڈ کے مشابہ بنایا جا سکے۔ چونکہ ERC-721 ٹوکنز fungible نہیں ہوتے، اس لیے ایک کنٹریکٹ ٹوکن کی ملکیت کو دیکھ کر یہ بھی پہچان سکتا ہے کہ اسے ایک مخصوص ٹوکن ملا ہے۔

```python
# @dev یہ تب ایمٹ ہوتا ہے جب کسی مالک کے لیے کوئی آپریٹر فعال (enable) یا غیر فعال (disable) کیا جاتا ہے۔ آپریٹر مالک کے
# تمام NFTs کو مینج کر سکتا ہے۔
# @param _owner NFT کا مالک۔
# @param _operator وہ ایڈریس جسے ہم آپریٹر کے حقوق دے رہے ہیں۔
# @param _approved آپریٹر کے حقوق کا سٹیٹس (اگر حقوق دیے گئے ہیں تو true اور اگر
# منسوخ کیے گئے ہیں تو false)۔
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

بعض اوقات ایک _آپریٹر (operator)_ کا ہونا مفید ہوتا ہے جو کسی اکاؤنٹ کے ایک مخصوص قسم کے تمام ٹوکنز (وہ جو کسی مخصوص کنٹریکٹ کے زیر انتظام ہوں) کا انتظام کر سکے، بالکل پاور آف اٹارنی کی طرح۔ مثال کے طور پر، میں شاید ایسی طاقت کسی ایسے کنٹریکٹ کو دینا چاہوں جو یہ چیک کرے کہ آیا میں نے چھ ماہ سے اس سے رابطہ نہیں کیا ہے، اور اگر ایسا ہے تو میرے اثاثے میرے ورثاء میں تقسیم کر دے (اگر ان میں سے کوئی اس کی درخواست کرے، کنٹریکٹس ٹرانزیکشن کے ذریعے کال کیے بغیر کچھ نہیں کر سکتے)۔ ERC-20 میں ہم وراثت کے کنٹریکٹ کو صرف ایک بڑا الاؤنس دے سکتے ہیں، لیکن یہ ERC-721 کے لیے کام نہیں کرتا کیونکہ ٹوکنز fungible نہیں ہوتے۔ یہ اسی کا متبادل ہے۔

`approved` کی قدر ہمیں بتاتی ہے کہ آیا ایونٹ منظوری کے لیے ہے، یا منظوری واپس لینے کے لیے۔

### اسٹیٹ ویری ایبلز {#state-vars}

یہ ویری ایبلز ٹوکنز کی موجودہ اسٹیٹ پر مشتمل ہوتے ہیں: کون سے دستیاب ہیں اور ان کا مالک کون ہے۔ ان میں سے زیادہ تر `HashMap` آبجیکٹس ہیں، [یک طرفہ میپنگز جو دو اقسام کے درمیان موجود ہوتی ہیں](https://vyper.readthedocs.io/en/latest/types.html#mappings)۔

```python
# @dev NFT ID سے اس کے مالک کے ایڈریس تک کی میپنگ (Mapping)۔
idToOwner: HashMap[uint256, address]

# @dev NFT ID سے منظور شدہ ایڈریس تک کی میپنگ۔
idToApprovals: HashMap[uint256, address]
```

ایتھریم میں صارف اور کنٹریکٹ کی شناخت 160-بٹ ایڈریسز سے ظاہر کی جاتی ہے۔ یہ دو ویری ایبلز ٹوکن IDs سے ان کے مالکان اور انہیں منتقل کرنے کی منظوری پانے والوں (ہر ایک کے لیے زیادہ سے زیادہ ایک) تک میپ کرتے ہیں۔ ایتھریم میں، غیر شروع شدہ (uninitialized) ڈیٹا ہمیشہ صفر ہوتا ہے، لہذا اگر کوئی مالک یا منظور شدہ ٹرانسفرر نہیں ہے تو اس ٹوکن کی قدر صفر ہوتی ہے۔

```python
# @dev مالک کے ایڈریس سے اس کے ٹوکنز کی تعداد تک کی میپنگ۔
ownerToNFTokenCount: HashMap[address, uint256]
```

یہ ویری ایبل ہر مالک کے لیے ٹوکنز کی گنتی رکھتا ہے۔ مالکان سے ٹوکنز تک کوئی میپنگ نہیں ہے، اس لیے کسی مخصوص مالک کے ٹوکنز کی شناخت کرنے کا واحد طریقہ یہ ہے کہ بلاک چین کی ایونٹ ہسٹری میں پیچھے مڑ کر دیکھیں اور مناسب `Transfer` ایونٹس تلاش کریں۔ ہم اس ویری ایبل کا استعمال یہ جاننے کے لیے کر سکتے ہیں کہ ہمارے پاس تمام NFTs کب آ گئے ہیں اور ہمیں مزید پیچھے دیکھنے کی ضرورت نہیں ہے۔

یاد رکھیں کہ یہ الگورتھم صرف یوزر انٹرفیسز اور بیرونی سرورز کے لیے کام کرتا ہے۔ خود بلاک چین پر چلنے والا کوڈ ماضی کے ایونٹس کو نہیں پڑھ سکتا۔

```python
# @dev مالک کے ایڈریس سے آپریٹر ایڈریسز کی میپنگ تک کی میپنگ۔
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

ایک اکاؤنٹ کے ایک سے زیادہ آپریٹرز ہو سکتے ہیں۔ ان کا ٹریک رکھنے کے لیے ایک سادہ `HashMap` ناکافی ہے، کیونکہ ہر کلید (key) ایک ہی قدر کی طرف لے جاتی ہے۔ اس کے بجائے، آپ قدر کے طور پر `HashMap[address, bool]` استعمال کر سکتے ہیں۔ پہلے سے طے شدہ (default) طور پر ہر ایڈریس کی قدر `False` ہوتی ہے، جس کا مطلب ہے کہ یہ آپریٹر نہیں ہے۔ آپ ضرورت کے مطابق اقدار کو `True` پر سیٹ کر سکتے ہیں۔

```python
# @dev منٹر (minter) کا ایڈریس، جو ٹوکن منٹ (mint) کر سکتا ہے
minter: address
```

نئے ٹوکنز کو کسی نہ کسی طرح بنانا پڑتا ہے۔ اس کنٹریکٹ میں صرف ایک ہی ہستی کو ایسا کرنے کی اجازت ہے، جو کہ `minter` ہے۔ مثال کے طور پر، یہ کسی گیم کے لیے کافی ہو سکتا ہے۔ دیگر مقاصد کے لیے، زیادہ پیچیدہ بزنس لاجک بنانا ضروری ہو سکتا ہے۔

```python
# @dev انٹرفیس آئی ڈی سے بولین (bool) تک کی میپنگ کہ آیا یہ سپورٹڈ ہے یا نہیں
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 کی ERC165 انٹرفیس آئی ڈی
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721 کی ERC165 انٹرفیس آئی ڈی
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165) ایک کنٹریکٹ کے لیے یہ ظاہر کرنے کا طریقہ کار بتاتا ہے کہ ایپلی کیشنز اس کے ساتھ کیسے بات چیت کر سکتی ہیں، اور یہ کن ERCs کی تعمیل کرتا ہے۔ اس صورت میں، کنٹریکٹ ERC-165 اور ERC-721 کی تعمیل کرتا ہے۔

### فنکشنز {#functions}

یہ وہ فنکشنز ہیں جو دراصل ERC-721 کو نافذ کرتے ہیں۔

#### کنسٹرکٹر {#constructor}

```python
@external
def __init__():
```

Vyper میں، Python کی طرح، کنسٹرکٹر فنکشن کو `__init__` کہا جاتا ہے۔

```python
    # @dev Contract constructor.
```

Python اور Vyper میں، آپ ایک ملٹی لائن سٹرنگ (جو `"""` سے شروع اور ختم ہوتی ہے) بتا کر بھی ایک تبصرہ بنا سکتے ہیں، اور اسے کسی بھی طرح استعمال نہیں کر سکتے۔ ان تبصروں میں [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html) بھی شامل ہو سکتا ہے۔

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

اسٹیٹ ویری ایبلز تک رسائی حاصل کرنے کے لیے آپ `self.<variable name>` استعمال کرتے ہیں (دوبارہ، بالکل Python کی طرح)۔

#### ویو فنکشنز {#views}

یہ وہ فنکشنز ہیں جو بلاک چین کی اسٹیٹ کو تبدیل نہیں کرتے، اور اس لیے اگر انہیں بیرونی طور پر کال کیا جائے تو انہیں مفت میں چلایا جا سکتا ہے۔ اگر ویو فنکشنز کو کسی کنٹریکٹ کے ذریعے کال کیا جائے تو انہیں پھر بھی ہر نوڈ پر چلانا پڑتا ہے اور اس لیے گیس خرچ ہوتی ہے۔

```python
@view
@external
```

فنکشن کی تعریف سے پہلے یہ کلیدی الفاظ (keywords) جو ایٹ سائن (`@`) سے شروع ہوتے ہیں، انہیں _ڈیکوریشنز (decorations)_ کہا جاتا ہے۔ یہ ان حالات کی وضاحت کرتے ہیں جن میں کسی فنکشن کو کال کیا جا سکتا ہے۔

- `@view` بتاتا ہے کہ یہ فنکشن ایک ویو (view) ہے۔
- `@external` بتاتا ہے کہ اس مخصوص فنکشن کو ٹرانزیکشنز اور دیگر کنٹریکٹس کے ذریعے کال کیا جا سکتا ہے۔

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python کے برعکس، Vyper ایک [اسٹیٹک ٹائپڈ زبان (static typed language)](https://wikipedia.org/wiki/Type_system#Static_type_checking) ہے۔ آپ [ڈیٹا ٹائپ](https://vyper.readthedocs.io/en/latest/types.html) کی شناخت کیے بغیر کسی ویری ایبل، یا فنکشن پیرامیٹر کا اعلان نہیں کر سکتے۔ اس صورت میں ان پٹ پیرامیٹر `bytes32` ہے، جو کہ 256-بٹ کی قدر ہے (256 بٹس [Ethereum Virtual Machine](/developers/docs/evm/) کا مقامی ورڈ سائز ہے)۔ آؤٹ پٹ ایک بولین قدر ہے۔ روایت کے مطابق، فنکشن پیرامیٹرز کے نام انڈرسکور (`_`) سے شروع ہوتے ہیں۔

```python
    # @dev انٹرفیس کی شناخت ERC-165 میں بیان کی گئی ہے۔
    @param _interfaceID انٹرفیس کی آئی ڈی
    return self.supportedInterfaces[_interfaceID]
```

`self.supportedInterfaces` HashMap سے قدر واپس کریں، جو کنسٹرکٹر (`__init__`) میں سیٹ کی گئی ہے۔

```python
# ## ویو فنکشنز (VIEW FUNCTIONS) ###
```

یہ وہ ویو فنکشنز ہیں جو ٹوکنز کے بارے میں معلومات صارفین اور دیگر کنٹریکٹس کو دستیاب کراتے ہیں۔

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    # @dev `_owner` کی ملکیت میں موجود NFTs کی تعداد واپس کرتا ہے۔
         اگر `_owner` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے۔ زیرو ایڈریس کو تفویض کردہ NFTs کو نامعتبر سمجھا جاتا ہے۔
    @param _owner وہ ایڈریس جس کا بیلنس معلوم کرنا ہے۔
    assert _owner != ZERO_ADDRESS
```

یہ لائن [یقینی بناتی ہے (asserts)](https://vyper.readthedocs.io/en/latest/statements.html#assert) کہ `_owner` صفر نہیں ہے۔ اگر ایسا ہے، تو ایک خرابی (error) ہوتی ہے اور آپریشن کو ریورٹ (revert) کر دیا جاتا ہے۔

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    # @dev NFT کے مالک کا ایڈریس واپس کرتا ہے۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔
    @param _tokenId NFT کا شناخت کنندہ (identifier)۔
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے
    assert owner != ZERO_ADDRESS
    return owner
```

Ethereum Virtual Machine (EVM) میں کوئی بھی اسٹوریج جس میں کوئی قدر محفوظ نہ ہو، وہ صفر ہوتی ہے۔ اگر `_tokenId` پر کوئی ٹوکن نہیں ہے تو `self.idToOwner[_tokenId]` کی قدر صفر ہوتی ہے۔ اس صورت میں فنکشن ریورٹ ہو جاتا ہے۔

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    # @dev کسی ایک NFT کا منظور شدہ ایڈریس حاصل کریں۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔
    @param _tokenId اس NFT کی آئی ڈی جس کی منظوری معلوم کرنی ہے۔
    # اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

یاد رکھیں کہ `getApproved` صفر واپس _کر سکتا ہے_۔ اگر ٹوکن درست ہے تو یہ `self.idToApprovals[_tokenId]` واپس کرتا ہے۔ اگر کوئی منظوری دینے والا (approver) نہیں ہے تو وہ قدر صفر ہوتی ہے۔

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    # @dev چیک کرتا ہے کہ کیا `_operator`، `_owner` کے لیے ایک منظور شدہ آپریٹر ہے۔
    @param _owner وہ ایڈریس جو NFTs کا مالک ہے۔
    @param _operator وہ ایڈریس جو مالک کی طرف سے کام کرتا ہے۔
    return (self.ownerToOperators[_owner])[_operator]
```

یہ فنکشن چیک کرتا ہے کہ آیا `_operator` کو اس کنٹریکٹ میں `_owner` کے تمام ٹوکنز کا انتظام کرنے کی اجازت ہے۔ چونکہ ایک سے زیادہ آپریٹرز ہو سکتے ہیں، اس لیے یہ دو سطح کا HashMap ہے۔

#### ٹرانسفر ہیلپر فنکشنز {#transfer-helpers}

یہ فنکشنز ان آپریشنز کو نافذ کرتے ہیں جو ٹوکنز کی منتقلی یا انتظام کا حصہ ہیں۔

```python

# ## ٹرانسفر فنکشن ہیلپرز (TRANSFER FUNCTION HELPERS) ###

@view
@internal
```

اس ڈیکوریشن، `@internal`، کا مطلب ہے کہ فنکشن صرف اسی کنٹریکٹ کے اندر موجود دیگر فنکشنز سے قابل رسائی ہے۔ روایت کے مطابق، ان فنکشنز کے نام بھی انڈرسکور (`_`) سے شروع ہوتے ہیں۔

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    # @dev بتاتا ہے کہ آیا دیا گیا سپینڈر (spender) دی گئی ٹوکن آئی ڈی کو ٹرانسفر کر سکتا ہے یا نہیں
    @param spender سپینڈر کا ایڈریس جس کے بارے میں معلوم کرنا ہے
    @param tokenId ٹرانسفر کیے جانے والے ٹوکن کی uint256 آئی ڈی
    @return bool کیا msg.sender دی گئی ٹوکن آئی ڈی کے لیے منظور شدہ ہے،
        مالک کا آپریٹر ہے، یا ٹوکن کا مالک ہے
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

تین طریقے ہیں جن سے کسی ایڈریس کو ٹوکن منتقل کرنے کی اجازت دی جا سکتی ہے:

1. ایڈریس ٹوکن کا مالک ہے
2. ایڈریس کو وہ ٹوکن خرچ کرنے کی منظوری دی گئی ہے
3. ایڈریس ٹوکن کے مالک کا آپریٹر ہے

اوپر دیا گیا فنکشن ایک ویو ہو سکتا ہے کیونکہ یہ اسٹیٹ کو تبدیل نہیں کرتا۔ آپریٹنگ اخراجات کو کم کرنے کے لیے، کوئی بھی فنکشن جو ویو _ہو سکتا ہے_ اسے ویو _ہونا چاہیے_۔

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    # @dev دیے گئے ایڈریس میں ایک NFT شامل کریں
         اگر `_tokenId` پہلے سے کسی کی ملکیت ہو تو ایرر تھرو کرتا ہے۔
    # اگر `_tokenId` پہلے سے کسی کی ملکیت ہو تو ایرر تھرو کرتا ہے
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # مالک کو تبدیل کریں
    self.idToOwner[_tokenId] = _to
    # کاؤنٹ ٹریکنگ کو تبدیل کریں
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    # @dev دیے گئے ایڈریس سے ایک NFT ہٹائیں
         اگر `_from` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے۔
    # اگر `_from` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے
    assert self.idToOwner[_tokenId] == _from
    # مالک کو تبدیل کریں
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # کاؤنٹ ٹریکنگ کو تبدیل کریں
    self.ownerToNFTokenCount[_from] -= 1
```

جب منتقلی میں کوئی مسئلہ ہوتا ہے تو ہم کال کو ریورٹ کر دیتے ہیں۔

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    # @dev دیے گئے ایڈریس کی منظوری (approval) کو کلیئر کریں
         اگر `_owner` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے۔
    # اگر `_owner` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # منظوریوں (approvals) کو ری سیٹ کریں
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

قدر کو صرف اسی صورت میں تبدیل کریں جب ضروری ہو۔ اسٹیٹ ویری ایبلز اسٹوریج میں رہتے ہیں۔ اسٹوریج میں لکھنا EVM (Ethereum Virtual Machine) کے سب سے مہنگے آپریشنز میں سے ایک ہے ([گیس](/developers/docs/gas/) کے لحاظ سے)۔ اس لیے، اسے کم سے کم کرنا ایک اچھا خیال ہے، یہاں تک کہ موجودہ قدر کو لکھنے کی بھی زیادہ قیمت ہوتی ہے۔

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    # @dev NFT کا ٹرانسفر انجام دیں۔
         ایرر تھرو کرتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         ایڈریس نہ ہو۔ (نوٹ: پرائیویٹ فنکشن میں `msg.sender` کی اجازت نہیں ہے اس لیے `_sender` پاس کریں۔)
         اگر `_to` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے۔
         اگر `_from` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔
```

ہمارے پاس یہ اندرونی (internal) فنکشن اس لیے ہے کیونکہ ٹوکنز منتقل کرنے کے دو طریقے ہیں (باقاعدہ اور محفوظ)، لیکن ہم کوڈ میں صرف ایک ہی جگہ چاہتے ہیں جہاں ہم یہ کریں تاکہ آڈیٹنگ آسان ہو سکے۔

```python
    # ضروریات چیک کریں
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # اگر `_to` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے
    assert _to != ZERO_ADDRESS
    # منظوری کلیئر کریں۔ اگر `_from` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے
    self._clearApproval(_from, _tokenId)
    # NFT ہٹائیں۔ اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے
    self._removeTokenFrom(_from, _tokenId)
    # NFT شامل کریں
    self._addTokenTo(_to, _tokenId)
    # ٹرانسفر کو لاگ (Log) کریں
    log Transfer(_from, _to, _tokenId)
```

Vyper میں ایونٹ خارج کرنے کے لیے آپ `log` اسٹیٹمنٹ استعمال کرتے ہیں ([مزید تفصیلات کے لیے یہاں دیکھیں](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging))۔

#### ٹرانسفر فنکشنز {#transfer-funs}

```python

# ## ٹرانسفر فنکشنز (TRANSFER FUNCTIONS) ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    # @dev ایرر تھرو کرتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         ایڈریس نہ ہو۔
         اگر `_from` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے۔
         اگر `_to` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔
    @notice کال کرنے والے کی ذمہ داری ہے کہ وہ تصدیق کرے کہ `_to` NFTs وصول کرنے کی صلاحیت رکھتا ہے ورنہ
            وہ ہمیشہ کے لیے ضائع ہو سکتے ہیں۔
    @param _from NFT کا موجودہ مالک۔
    @param _to نیا مالک۔
    @param _tokenId ٹرانسفر کیا جانے والا NFT۔
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

یہ فنکشن آپ کو کسی بھی من مانے (arbitrary) ایڈریس پر منتقل کرنے کی اجازت دیتا ہے۔ جب تک کہ ایڈریس کوئی صارف نہ ہو، یا کوئی ایسا کنٹریکٹ نہ ہو جو ٹوکنز منتقل کرنا جانتا ہو، آپ کا منتقل کردہ کوئی بھی ٹوکن اس ایڈریس میں پھنس جائے گا اور بیکار ہو جائے گا۔

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    # @dev ایک NFT کی ملکیت کو ایک ایڈریس سے دوسرے ایڈریس پر ٹرانسفر کرتا ہے۔
         ایرر تھرو کرتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے
         منظور شدہ ایڈریس نہ ہو۔
         اگر `_from` موجودہ مالک نہ ہو تو ایرر تھرو کرتا ہے۔
         اگر `_to` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔
         اگر `_to` ایک سمارٹ کانٹریکٹ ہے، تو یہ `_to` پر `onERC721Received` کو کال کرتا ہے اور اگر
         ریٹرن ویلیو `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))` نہ ہو تو ایرر تھرو کرتا ہے۔
         نوٹ: bytes4 کو پیڈنگ کے ساتھ bytes32 سے ظاہر کیا جاتا ہے
    @param _from NFT کا موجودہ مالک۔
    @param _to نیا مالک۔
    @param _tokenId ٹرانسفر کیا جانے والا NFT۔
    @param _data بغیر کسی مخصوص فارمیٹ کے اضافی ڈیٹا، جو `_to` کی کال میں بھیجا جاتا ہے۔
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

پہلے منتقلی کرنا ٹھیک ہے کیونکہ اگر کوئی مسئلہ ہوا تو ہم ویسے بھی ریورٹ کرنے والے ہیں، اس لیے کال میں کیا گیا ہر کام منسوخ ہو جائے گا۔

```python
    if _to.is_contract: # چیک کریں کہ کیا `_to` ایک کانٹریکٹ ایڈریس ہے
```

پہلے یہ چیک کریں کہ آیا ایڈریس کوئی کنٹریکٹ ہے (اگر اس میں کوڈ ہے)۔ اگر نہیں، تو فرض کریں کہ یہ صارف کا ایڈریس ہے اور صارف ٹوکن استعمال کرنے یا اسے منتقل کرنے کے قابل ہو گا۔ لیکن اسے آپ کو تحفظ کے جھوٹے احساس میں مبتلا نہ ہونے دیں۔ آپ ٹوکنز کھو سکتے ہیں، یہاں تک کہ `safeTransferFrom` کے ساتھ بھی، اگر آپ انہیں کسی ایسے ایڈریس پر منتقل کرتے ہیں جس کی پرائیویٹ کی (private key) کوئی نہیں جانتا۔

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

ٹارگٹ کنٹریکٹ کو کال کریں تاکہ یہ دیکھا جا سکے کہ آیا وہ ERC-721 ٹوکنز وصول کر سکتا ہے۔

```python
        # اگر ٹرانسفر کی منزل ایک ایسا کانٹریکٹ ہے جو 'onERC721Received' کو امپلیمنٹ نہیں کرتا تو ایرر تھرو کرتا ہے
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

اگر منزل کوئی کنٹریکٹ ہے، لیکن ایسا جو ERC-721 ٹوکنز قبول نہیں کرتا (یا جس نے اس مخصوص منتقلی کو قبول نہ کرنے کا فیصلہ کیا ہے)، تو ریورٹ کریں۔

```python
@external
def approve(_approved: address, _tokenId: uint256):
    # @dev کسی NFT کے لیے منظور شدہ ایڈریس سیٹ کریں یا دوبارہ تصدیق کریں۔ زیرو ایڈریس ظاہر کرتا ہے کہ کوئی منظور شدہ ایڈریس نہیں ہے۔
         ایرر تھرو کرتا ہے جب تک کہ `msg.sender` موجودہ NFT کا مالک، یا موجودہ مالک کا کوئی مجاز آپریٹر نہ ہو۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا)
         اگر `_approved` موجودہ مالک ہو تو ایرر تھرو کرتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا)
    @param _approved دی گئی NFT آئی ڈی کے لیے منظور کیا جانے والا ایڈریس۔
    @param _tokenId منظور کیے جانے والے ٹوکن کی آئی ڈی۔
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے
    assert owner != ZERO_ADDRESS
    # اگر `_approved` موجودہ مالک ہو تو ایرر تھرو کرتا ہے
    assert _approved != owner
```

روایت کے مطابق اگر آپ نہیں چاہتے کہ کوئی منظوری دینے والا ہو تو آپ صفر ایڈریس (zero address) مقرر کرتے ہیں، خود کو نہیں۔

```python
    # ضروریات چیک کریں
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

منظوری سیٹ کرنے کے لیے آپ یا تو مالک ہو سکتے ہیں، یا مالک کی طرف سے مجاز آپریٹر۔

```python
    # منظوری (approval) سیٹ کریں
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    # @dev کسی تیسرے فریق ("آپریٹر") کے لیے `msg.sender` کے تمام اثاثوں کو مینج کرنے کی منظوری کو فعال یا غیر فعال کرتا ہے۔
         یہ ApprovalForAll ایونٹ بھی ایمٹ کرتا ہے۔
         اگر `_operator` ہی `msg.sender` ہو تو ایرر تھرو کرتا ہے۔ (نوٹ: یہ EIP میں نہیں لکھا گیا)
    @notice یہ تب بھی کام کرتا ہے جب بھیجنے والے کے پاس اس وقت کوئی ٹوکن نہ ہو۔
    @param _operator مجاز آپریٹرز کے سیٹ میں شامل کرنے کے لیے ایڈریس۔
    @param _approved اگر آپریٹرز منظور شدہ ہیں تو True، منظوری منسوخ کرنے کے لیے false۔
    # اگر `_operator` ہی `msg.sender` ہو تو ایرر تھرو کرتا ہے
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### نئے ٹوکنز منٹ کریں اور موجودہ کو تباہ کریں {#mint-burn}

وہ اکاؤنٹ جس نے کنٹریکٹ بنایا ہے وہ `minter` ہے، وہ سپر یوزر جو نئے NFTs منٹ (mint) کرنے کا مجاز ہے۔ تاہم، اسے بھی موجودہ ٹوکنز کو برن (burn) کرنے کی اجازت نہیں ہے۔ صرف مالک، یا مالک کی طرف سے مجاز کوئی ہستی، ایسا کر سکتی ہے۔

```python
# ## منٹ اور برن فنکشنز (MINT & BURN FUNCTIONS) ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

یہ فنکشن ہمیشہ `True` واپس کرتا ہے، کیونکہ اگر آپریشن ناکام ہو جاتا ہے تو اسے ریورٹ کر دیا جاتا ہے۔

```python
    # @dev ٹوکنز منٹ (mint) کرنے کا فنکشن
         اگر `msg.sender` منٹر (minter) نہ ہو تو ایرر تھرو کرتا ہے۔
         اگر `_to` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے۔
         اگر `_tokenId` پہلے سے کسی کی ملکیت ہو تو ایرر تھرو کرتا ہے۔
    @param _to وہ ایڈریس جو منٹ کیے گئے ٹوکنز وصول کرے گا۔
    @param _tokenId منٹ کی جانے والی ٹوکن آئی ڈی۔
    @return ایک بولین (boolean) جو ظاہر کرتا ہے کہ آیا آپریشن کامیاب رہا۔
    # اگر `msg.sender` منٹر (minter) نہ ہو تو ایرر تھرو کرتا ہے
    assert msg.sender == self.minter
```

صرف منٹر (وہ اکاؤنٹ جس نے ERC-721 کنٹریکٹ بنایا) نئے ٹوکنز منٹ کر سکتا ہے۔ مستقبل میں یہ ایک مسئلہ ہو سکتا ہے اگر ہم منٹر کی شناخت تبدیل کرنا چاہیں۔ پروڈکشن کنٹریکٹ میں آپ شاید ایک ایسا فنکشن چاہیں گے جو منٹر کو منٹر کے حقوق کسی اور کو منتقل کرنے کی اجازت دے۔

```python
    # اگر `_to` زیرو ایڈریس ہو تو ایرر تھرو کرتا ہے
    assert _to != ZERO_ADDRESS
    # NFT شامل کریں۔ اگر `_tokenId` پہلے سے کسی کی ملکیت ہو تو ایرر تھرو کرتا ہے
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

روایت کے مطابق، نئے ٹوکنز کی منٹنگ کو ایڈریس صفر سے منتقلی کے طور پر شمار کیا جاتا ہے۔

```python

@external
def burn(_tokenId: uint256):
    # @dev ایک مخصوص ERC721 ٹوکن کو برن (burn) کرتا ہے۔
         ایرر تھرو کرتا ہے جب تک کہ `msg.sender` موجودہ مالک، ایک مجاز آپریٹر، یا اس NFT کے لیے منظور شدہ
         ایڈریس نہ ہو۔
         اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے۔
    @param _tokenId برن کیے جانے والے ERC721 ٹوکن کی uint256 آئی ڈی۔
    # ضروریات چیک کریں
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # اگر `_tokenId` ایک معتبر NFT نہ ہو تو ایرر تھرو کرتا ہے
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

کوئی بھی شخص جسے ٹوکن منتقل کرنے کی اجازت ہے اسے برن کرنے کی بھی اجازت ہے۔ اگرچہ برن کرنا صفر ایڈریس پر منتقل کرنے کے مترادف لگتا ہے، لیکن صفر ایڈریس دراصل ٹوکن وصول نہیں کرتا۔ یہ ہمیں اس تمام اسٹوریج کو خالی کرنے کی اجازت دیتا ہے جو ٹوکن کے لیے استعمال کی گئی تھی، جس سے ٹرانزیکشن کی گیس کی قیمت کم ہو سکتی ہے۔

## اس کنٹریکٹ کا استعمال {#using-contract}

Solidity کے برعکس، Vyper میں وراثت (inheritance) نہیں ہوتی۔ یہ ایک دانستہ ڈیزائن کا انتخاب ہے تاکہ کوڈ کو واضح اور اس لیے محفوظ بنانے میں آسانی ہو۔ لہذا اپنا Vyper ERC-721 کنٹریکٹ بنانے کے لیے آپ [یہ کنٹریکٹ](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy) لیتے ہیں اور اپنی مطلوبہ بزنس لاجک کو نافذ کرنے کے لیے اس میں ترمیم کرتے ہیں۔

## نتیجہ {#conclusion}

جائزے کے لیے، اس کنٹریکٹ میں کچھ اہم ترین خیالات یہ ہیں:

- محفوظ منتقلی کے ساتھ ERC-721 ٹوکنز وصول کرنے کے لیے، کنٹریکٹس کو `ERC721Receiver` انٹرفیس نافذ کرنا پڑتا ہے۔
- یہاں تک کہ اگر آپ محفوظ منتقلی کا استعمال کرتے ہیں، تب بھی ٹوکنز پھنس سکتے ہیں اگر آپ انہیں کسی ایسے ایڈریس پر بھیجتے ہیں جس کی پرائیویٹ کی نامعلوم ہو۔
- جب کسی آپریشن میں کوئی مسئلہ ہو تو کال کو `revert` کرنا ایک اچھا خیال ہے، بجائے اس کے کہ صرف ناکامی کی قدر واپس کی جائے۔
- ERC-721 ٹوکنز اس وقت موجود ہوتے ہیں جب ان کا کوئی مالک ہو۔
- NFT منتقل کرنے کا مجاز ہونے کے تین طریقے ہیں۔ آپ مالک ہو سکتے ہیں، کسی مخصوص ٹوکن کے لیے منظور شدہ ہو سکتے ہیں، یا مالک کے تمام ٹوکنز کے لیے آپریٹر ہو سکتے ہیں۔
- ماضی کے ایونٹس صرف بلاک چین کے باہر نظر آتے ہیں۔ بلاک چین کے اندر چلنے والا کوڈ انہیں نہیں دیکھ سکتا۔

اب جائیں اور محفوظ Vyper کنٹریکٹس نافذ کریں۔

[میرے مزید کام کے لیے یہاں دیکھیں](https://cryptodocguy.pro/)۔