---
title: "⁦ERC-1155⁩ ملٹی ٹوکن سٹینڈرڈ"
description: "⁦ERC-1155⁩ کے بارے میں جانیں، ایک ملٹی ٹوکن سٹینڈرڈ جو ایک ہی کنٹریکٹ میں قابل تبادلہ اور ناقابل تبادلہ ٹوکنز کو یکجا کرتا ہے۔"
lang: ur
---

## تعارف {#introduction}

متعدد ٹوکن اقسام کا انتظام کرنے والے کنٹریکٹس کے لیے ایک معیاری انٹرفیس۔ ایک ہی ڈیپلائے شدہ کنٹریکٹ میں قابل تبادلہ ٹوکنز، ناقابل تبادلہ ٹوکنز یا دیگر کنفیگریشنز (جیسے نیم قابل تبادلہ ٹوکنز) کا کوئی بھی مجموعہ شامل ہو سکتا ہے۔

**ملٹی ٹوکن سٹینڈرڈ سے کیا مراد ہے؟**

یہ خیال سادہ ہے اور ایک ایسا سمارٹ کنٹریکٹ انٹرفیس بنانے کی کوشش کرتا ہے جو کسی بھی تعداد میں قابل تبادلہ اور ناقابل تبادلہ ٹوکن اقسام کی نمائندگی اور کنٹرول کر سکے۔ اس طرح، <span dir="ltr">ERC-1155</span> ٹوکن وہی افعال انجام دے سکتا ہے جو ایک [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) اور [<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) ٹوکن کرتا ہے، اور یہاں تک کہ دونوں ایک ہی وقت میں۔ یہ <span dir="ltr">ERC-20</span> اور <span dir="ltr">ERC-721</span> دونوں معیارات کی فعالیت کو بہتر بناتا ہے، اسے زیادہ موثر بناتا ہے اور واضح نفاذ کی غلطیوں کو درست کرتا ہے۔

<span dir="ltr">ERC-1155</span> ٹوکن کو [<span dir="ltr">EIP-1155</span>](https://eips.ethereum.org/EIPS/eip-1155) میں مکمل طور پر بیان کیا گیا ہے۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [ٹوکن معیارات](/developers/docs/standards/tokens/)، [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/)، اور [<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) کے بارے میں پڑھیں۔

## <span dir="ltr">ERC-1155</span> کے افعال اور خصوصیات: {#body}

- [بیچ منتقلی](#batch-transfers): ایک ہی کال میں متعدد اثاثوں کی منتقلی۔
- [بیچ بیلنس](#batch-balance): ایک ہی کال میں متعدد اثاثوں کا بیلنس حاصل کریں۔
- [بیچ منظوری](#batch-approval): کسی پتے پر تمام ٹوکنز منظور کریں۔
- [ہکس](#receive-hook): ٹوکنز وصول کرنے کا ہک۔
- [NFT سپورٹ](#nft-support): اگر سپلائی صرف <span dir="ltr">1</span> ہے، تو اسے NFT کے طور پر سمجھیں۔
- [محفوظ منتقلی کے اصول](#safe-transfer-rule): محفوظ منتقلی کے لیے اصولوں کا مجموعہ۔

### بیچ منتقلی {#batch-transfers}

بیچ منتقلی باقاعدہ <span dir="ltr">ERC-20</span> منتقلی کی طرح ہی کام کرتی ہے۔ آئیے باقاعدہ <span dir="ltr">ERC-20</span> کے `transferFrom` فنکشن کو دیکھتے ہیں:

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

<span dir="ltr">ERC-1155</span> میں واحد فرق یہ ہے کہ ہم اقدار کو ایک سرنی (array) کے طور پر پاس کرتے ہیں اور ہم ids کی ایک سرنی بھی پاس کرتے ہیں۔ مثال کے طور پر `ids=[3, 6, 13]` اور `values=[100, 200, 5]` دیے جانے پر، نتیجے میں ہونے والی منتقلی یہ ہوگی:

1. `_from` سے `_to` تک id 3 والے <span dir="ltr">100</span> ٹوکنز کی منتقلی۔
2. `_from` سے `_to` تک id 6 والے <span dir="ltr">200</span> ٹوکنز کی منتقلی۔
3. `_from` سے `_to` تک id 13 والے <span dir="ltr">5</span> ٹوکنز کی منتقلی۔

<span dir="ltr">ERC-1155</span> میں ہمارے پاس صرف `transferFrom` ہے، کوئی `transfer` نہیں ہے۔ اسے باقاعدہ `transfer` کی طرح استعمال کرنے کے لیے، بس from پتے کو اس پتے پر سیٹ کریں جو فنکشن کو کال کر رہا ہے۔

### بیچ بیلنس {#batch-balance}

متعلقہ <span dir="ltr">ERC-20</span> کی `balanceOf` کال میں بھی بیچ سپورٹ کے ساتھ اس کا ساتھی فنکشن موجود ہے۔ یاد دہانی کے طور پر، یہ <span dir="ltr">ERC-20</span> ورژن ہے:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

بیلنس کال کے لیے اس سے بھی آسان، ہم ایک ہی کال میں متعدد بیلنس بازیافت کر سکتے ہیں۔ ہم مالکان کی سرنی پاس کرتے ہیں، جس کے بعد ٹوکن ids کی سرنی ہوتی ہے۔

مثال کے طور پر `_ids=[3, 6, 13]` اور `_owners=[0xbeef..., 0x1337..., 0x1111...]` دیے جانے پر، واپسی کی قدر یہ ہوگی:

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### بیچ منظوری {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

منظوریاں <span dir="ltr">ERC-20</span> سے قدرے مختلف ہیں۔ مخصوص رقوم منظور کرنے کے بجائے، آپ `setApprovalForAll` کے ذریعے کسی آپریٹر کو منظور شدہ یا غیر منظور شدہ پر سیٹ کرتے ہیں۔

موجودہ حیثیت کو `isApprovedForAll` کے ذریعے پڑھا جا سکتا ہے۔ جیسا کہ آپ دیکھ سکتے ہیں، یہ ایک سب کچھ یا کچھ نہیں (all-or-nothing) آپریشن ہے۔ آپ یہ متعین نہیں کر سکتے کہ کتنے ٹوکنز منظور کرنے ہیں یا کون سی ٹوکن کلاس۔

اسے جان بوجھ کر سادگی کو ذہن میں رکھتے ہوئے ڈیزائن کیا گیا ہے۔ آپ صرف ایک پتے کے لیے سب کچھ منظور کر سکتے ہیں۔

### وصولی ہک {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

[<span dir="ltr">EIP-165</span>](https://eips.ethereum.org/EIPS/eip-165) سپورٹ کے پیش نظر، <span dir="ltr">ERC-1155</span> صرف سمارٹ کنٹریکٹس کے لیے وصولی ہکس کو سپورٹ کرتا ہے۔ ہک فنکشن کو ایک جادوئی پہلے سے طے شدہ <span dir="ltr">bytes4</span> قدر واپس کرنی چاہیے جو اس طرح دی گئی ہے:

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

جب وصول کرنے والا کنٹریکٹ یہ قدر واپس کرتا ہے، تو یہ فرض کیا جاتا ہے کہ کنٹریکٹ منتقلی کو قبول کرتا ہے اور جانتا ہے کہ <span dir="ltr">ERC-1155</span> ٹوکنز کو کیسے ہینڈل کرنا ہے۔ زبردست، اب کنٹریکٹ میں کوئی ٹوکن نہیں پھنسے گا!

### NFT سپورٹ {#nft-support}

جب سپلائی صرف ایک ہو، تو ٹوکن بنیادی طور پر ایک ناقابل تبادلہ ٹوکن (NFT) ہوتا ہے۔ اور جیسا کہ <span dir="ltr">ERC-721</span> کے لیے معیاری ہے، آپ ایک میٹا ڈیٹا URL کی وضاحت کر سکتے ہیں۔ URL کو کلائنٹس کے ذریعے پڑھا اور تبدیل کیا جا سکتا ہے، [یہاں](https://eips.ethereum.org/EIPS/eip-1155#metadata) دیکھیں۔

### محفوظ منتقلی کا اصول {#safe-transfer-rule}

ہم پچھلی وضاحتوں میں پہلے ہی کچھ محفوظ منتقلی کے اصولوں پر بات کر چکے ہیں۔ لیکن آئیے سب سے اہم اصولوں پر نظر ڈالتے ہیں:

1. کال کرنے والے کو `_from` پتے کے لیے ٹوکن خرچ کرنے کی منظوری ہونی چاہیے یا کال کرنے والا `_from` کے برابر ہونا چاہیے۔
2. منتقلی کی کال کو ریورٹ ہونا چاہیے اگر
   1. `_to` پتہ 0 ہے۔
   2. `_ids` کی لمبائی `_values` کی لمبائی کے برابر نہیں ہے۔
   3. `_ids` میں ٹوکن(ز) کے لیے ہولڈر(ز) کا کوئی بھی بیلنس وصول کنندہ کو بھیجی گئی `_values` میں متعلقہ رقم(رقوم) سے کم ہے۔
   4. کوئی اور خرابی واقع ہوتی ہے۔

_نوٹ_: ہک سمیت تمام بیچ فنکشنز بغیر بیچ والے ورژنز کے طور پر بھی موجود ہیں۔ یہ گیس کی کارکردگی کے لیے کیا گیا ہے، اس بات پر غور کرتے ہوئے کہ صرف ایک اثاثہ منتقل کرنا ممکنہ طور پر اب بھی سب سے زیادہ استعمال ہونے والا طریقہ ہوگا۔ ہم نے انہیں وضاحتوں میں سادگی کے لیے چھوڑ دیا ہے، بشمول محفوظ منتقلی کے اصول۔ نام ایک جیسے ہیں، بس 'Batch' کو ہٹا دیں۔

## مزید مطالعہ {#further-reading}

- [<span dir="ltr">EIP-1155: Multi Token Standard</span>](https://eips.ethereum.org/EIPS/eip-1155)
- [<span dir="ltr">ERC-1155</span>: اوپن زیپلن دستاویزات](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [<span dir="ltr">ERC-1155</span>: <span dir="ltr">GitHub</span> ریپو](https://github.com/enjin/erc-1155)
- [<span dir="ltr">Alchemy NFT API</span>](https://www.alchemy.com/docs/reference/nft-api-quickstart)