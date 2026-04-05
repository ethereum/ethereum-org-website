---
title: "ٹوکن کے معیارات کو سمجھنا"
description: "ایتھیریم پر سب سے عام ٹوکن معیارات اور ان کے کام کرنے کے طریقے کے بارے میں ایک گائیڈ۔"
image: /images/tokens/token-standards-hero.png
alt: "ٹوکن معیارات کا خاکہ"
template: tutorial
lang: ur
skill: intermediate
published: 2025-08-15
---

# ٹوکن کے معیارات کو سمجھنا {#understanding-token-standards}

ٹوکن کے معیارات اس بات کا تعین کرتے ہیں کہ ڈیجیٹل اثاثے ایتھیریم نیٹ ورک پر کس طرح برتاؤ کرتے ہیں۔ وہ ایک مشترکہ انٹرفیس فراہم کرتے ہیں جس پر بٹوے (wallets)، ایکسچینجز، اور ایپلیکیشنز ٹوکنز کے ساتھ متوقع طور پر تعامل کرنے کے لیے انحصار کر سکتے ہیں۔

## ٹوکن کے معیارات کیا ہیں؟ {#what-are-token-standards}

ٹوکن کا معیار ان اصولوں کا ایک مجموعہ ہے جسے ایک [سمارٹ کنٹریکٹ](/glossary/#smart-contract) کے طور پر نافذ کیا جاتا ہے جو یہ طے کرتا ہے کہ ٹوکنز کو کس طرح بنایا، منتقل، اور منظم کیا جاتا ہے۔ سب سے زیادہ اپنایا جانے والا معیار [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) ہے، جو ایتھیریم پر زیادہ تر قابل تبادلہ (fungible) ٹوکنز کو طاقت بخشتا ہے۔

_معیارات کے بغیر_، ہر ٹوکن کو کسٹم انٹیگریشن کوڈ کی ضرورت ہوگی۔ مثال کے طور پر، `approve` اور `transferFrom` فنکشنز لامركزی ایکسچینجز کو آپ کی اجازت دینے کے بعد آپ کی جانب سے ٹوکنز منتقل کرنے کی سہولت دیتے ہیں۔

آپ یہ تصدیق کرنے کے لیے کہ یہ کس معیار کو نافذ کرتا ہے، <a href="https://eth.blockscout.com/tokens">Etherscan</a> پر ٹوکن کا کنٹریکٹ چیک کر سکتے ہیں۔

![Token approval flow](/images/tokens/approval-flow.png)

## عام معیارات {#common-standards}

### <span dir="ltr">ERC-20</span>: قابل تبادلہ ٹوکنز {#erc-20}

<span dir="ltr">ERC-20</span> **قابل تبادلہ ٹوکنز** کے لیے ایک معیاری انٹرفیس کی وضاحت کرتا ہے۔ ہر اکائی ایک جیسی اور قابل تبادلہ ہوتی ہے، بالکل اسی طرح جیسے ایک ڈالر کا نوٹ کسی دوسرے نوٹ جیسا ہوتا ہے۔

```solidity
// وصول کنندہ کو ٹوکن کی منتقلی
function transfer(address to, uint256 amount) public returns (bool) {
    require(balanceOf(msg.sender) >= amount, "Insufficient balance");
    _balances[msg.sender] -= amount;
    _balances[to] += amount;
    return true;
}
```

کسی <span dir="ltr">ERC-20</span> ٹوکن کی کل سپلائی عام طور پر تعیناتی کے وقت طے کی جاتی ہے۔ مثال کے طور پر، ایک پروجیکٹ <span dir="ltr">18</span> اعشاریہ مقامات کے ساتھ <span dir="ltr">1,000,000</span> ٹوکنز بنا سکتا ہے، جس کا مطلب ہے کہ سب سے چھوٹی اکائی `0.000000000000000001` ٹوکنز ہے۔ اوپر دیے گئے `translate` فنکشن میں، اگر بھیجنے والے کے پاس <span dir="ltr">100</span> ٹوکنز ہیں اور وہ <span dir="ltr">10</span> بھیجنے کی درخواست کرتا ہے، تو اس کے پاس <span dir="ltr">90</span> (<span dir="ltr">100 - 10 = 90</span>) بچیں گے اور وصول کنندہ کو <span dir="ltr">10</span> مزید مل جائیں گے۔

آپ [Sepolia](https://sepolia.dev/) پر [Remix](https://remix.ethereum.org/) کا استعمال کرتے ہوئے ٹوکنز تعینات کر سکتے ہیں، اور [Blockscout](https://eth.blockscout.com/) پر سورس کوڈ کی تصدیق کر سکتے ہیں۔

### <span dir="ltr">ERC-721</span>: ناقابل تبادلہ ٹوکنز {#erc-721}

<span dir="ltr">ERC-20</span> کے برعکس، ہر <span dir="ltr">ERC-721</span> ٹوکن منفرد ہوتا ہے۔ انہیں عام طور پر <span dir="ltr">NFTs</span> کے نام سے جانا جاتا ہے اور یہ مختلف اشیاء جیسے ڈیجیٹل آرٹ ورک، ڈومین ناموں، یا گیم کے اندر موجود اثاثوں کی ملکیت کی نمائندگی کے لیے استعمال ہوتے ہیں۔

```md
کسی NFT کے لیے میٹا ڈیٹا کی مثال:
- نام: CryptoKitty #42
- تفصیل: ایک نایاب ڈیجیٹل مجموعہ
- تصویر: ipfs://QmXyz...
```

## گیس کی لاگت {#gas-costs}

ٹوکن کی منتقلی کے لیے گیس فیس کی ضرورت ہوتی ہے جسے Gwei میں ظاہر کیا جاتا ہے۔ ایک معیاری <span dir="ltr">ERC-20</span> منتقلی پر تقریباً <span dir="ltr">21,000</span> گیس یونٹس کی لاگت آتی ہے، جبکہ <span dir="ltr">ERC-721</span> کی منتقلی کے لیے عام طور پر کنٹریکٹ کے نفاذ کے لحاظ سے <span dir="ltr">50,000</span> سے <span dir="ltr">100,000</span> گیس یونٹس درکار ہوتے ہیں۔

بنیادی فیس نیٹ ورک کی طلب کی بنیاد پر اتار چڑھاؤ کا شکار ہوتی ہے۔ جب نیٹ ورک پر ہجوم ہوتا ہے، تو فیس میں فی بلاک <span dir="ltr">12.5%</span> تک اضافہ ہو سکتا ہے۔

<ExpandableCard title="Why do NFT transfers cost more?" eventCategory="/test-drift" eventName="clicked Why do NFT transfers cost more?">

<span dir="ltr">NFT</span> کی منتقلی میں زیادہ پیچیدہ اسٹوریج آپریشنز شامل ہوتے ہیں۔ ہر ٹوکن کی ایک منفرد <span dir="ltr">ID</span> ہوتی ہے جسے انفرادی طور پر ٹریک کیا جانا چاہیے، اور منتقلی کی اجازت دینے سے پہلے کنٹریکٹ کو ملکیت کی تصدیق کرنی چاہیے۔ اس اضافی کمپیوٹیشن کے لیے مزید گیس درکار ہوتی ہے۔

تفصیلی وضاحت کے لیے [ایتھیریم گیس کی دستاویزات](/developers/docs/gas/) دیکھیں۔

</ExpandableCard>

<ExpandableCard title="How to reduce gas costs" eventCategory="/test-drift" eventName="clicked How to reduce gas costs">

ٹرانزیکشن کے اخراجات کو نمایاں طور پر کم کرنے کے لیے لیئر ۲ (l2) کے حل جیسے <a href="https://optimism.io">Optimism</a> یا [Arbitrum](/developers/docs/scaling/optimistic-rollups/) استعمال کرنے پر غور کریں۔ یہ رول اپس متعدد ٹرانزیکشنز کو ایک ساتھ جمع کرتے ہیں اور انہیں ایتھیریم مین نیٹ پر ایک ہی ٹرانزیکشن کے طور پر جمع کراتے ہیں۔

</ExpandableCard>

## ٹولز اور وسائل {#tools-and-resources}

<InfoBanner emoji=":books:">
  <a href="https://docs.openzeppelin.com/contracts">اوپن زیپلن کنٹریکٹس لائبریری</a> تمام بڑے ٹوکن معیارات کے آڈٹ شدہ نفاذ فراہم کرتی ہے۔
</InfoBanner>

- ایتھیریم امپروومنٹ پروپوزلز (Ethereum Improvement Proposals) سائٹ پر [<span dir="ltr">ERC-20</span> کی تفصیلات](https://eips.ethereum.org/EIPS/eip-20)
- [اوپن زیپلن <span dir="ltr">ERC-20</span> گائیڈ](https://docs.openzeppelin.com/contracts/erc20)
- [Blockscout](https://eth.blockscout.com/tokens) پر ٹوکن ایکسپلورر

<YouTube id="dQw4w9WgXcQ" />

## ٹیسٹنگ کے لیے خالی سیکشن {#empty-section}

## مزید مطالعہ {#further-reading}

_خاکہ [Token Standards Illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) سے اخذ کیا گیا ہے_

_خاکہ [Token Standards Illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf) سے اخذ کیا گیا ہے_

| معیار | قسم | گیس کی لاگت | استعمال کی صورت |
|----------|------|----------|----------|
| [<span dir="ltr">ERC-20</span>](/developers/docs/standards/tokens/erc-20/) | قابل تبادلہ | <span dir="ltr">\~21,000</span> | کرنسیاں، یوٹیلیٹی ٹوکنز |
| [<span dir="ltr">ERC-721</span>](/developers/docs/standards/tokens/erc-721/) | ناقابل تبادلہ | <span dir="ltr">\~65,000</span> | ڈیجیٹل آرٹ، جمع کرنے والی اشیاء |
| [<span dir="ltr">ERC-1155</span>](/developers/docs/standards/tokens/erc-1155/) | ملٹی ٹوکن | <span dir="ltr">\~35,000</span> | گیمنگ آئٹمز، مخلوط اثاثے |