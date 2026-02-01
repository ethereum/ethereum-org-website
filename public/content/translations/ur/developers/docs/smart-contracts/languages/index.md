---
title: اسمارٹ کنٹریکٹ کی زبانیں
description: دو اہم اسمارٹ کنٹریکٹ زبانوں – Solidity اور Vyper کا ایک جائزہ اور موازنہ۔
lang: ur-in
---

Ethereum کے بارے میں ایک بڑی بات یہ ہے کہ اسمارٹ کنٹریکٹس کو نسبتاً ڈیولپر-دوست زبانوں کا استعمال کرتے ہوئے پروگرام کیا جا سکتا ہے۔ اگر آپ Python یا کسی بھی [کرلی-بریکٹ زبان](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) کے ساتھ تجربہ کار ہیں، تو آپ کو مانوس سنٹیکس والی زبان مل سکتی ہے۔

دو سب سے زیادہ فعال اور برقرار رکھی جانے والی زبانیں ہیں:

- Solidity
- Vyper

Remix IDE، Solidity اور Vyper دونوں میں کنٹریکٹس بنانے اور ٹیسٹ کرنے کے لیے ایک جامع ڈیولپمنٹ ماحول فراہم کرتا ہے۔ [کوڈنگ شروع کرنے کے لیے ان-براؤزر Remix IDE آزمائیں](https://remix.ethereum.org)۔

زیادہ تجربہ کار ڈیولپرز Yul، جو [Ethereum ورچوئل مشین](/developers/docs/evm/) کے لیے ایک درمیانی زبان ہے، یا Yul+، جو Yul کی ایک ایکسٹینشن ہے، کا استعمال بھی کرنا چاہ سکتے ہیں۔

اگر آپ متجسس ہیں اور ایسی نئی زبانوں کی جانچ میں مدد کرنا پسند کرتے ہیں جو ابھی بھی بہت زیادہ ڈیولپمنٹ کے تحت ہیں، تو آپ Fe کے ساتھ تجربہ کر سکتے ہیں، جو ایک ابھرتی ہوئی اسمارٹ کنٹریکٹ زبان ہے اور فی الحال اپنے ابتدائی مرحلے میں ہے۔

## شرائط {#prerequisites}

پروگرامنگ زبانوں کا پچھلا علم، خاص طور پر JavaScript یا Python کا، آپ کو اسمارٹ کنٹریکٹ زبانوں میں فرق کو سمجھنے میں مدد کر سکتا ہے۔ ہم یہ بھی تجویز کرتے ہیں کہ آپ زبان کے موازنے میں بہت گہرائی میں جانے سے پہلے اسمارٹ کنٹریکٹس کو ایک تصور کے طور پر سمجھ لیں۔ [اسمارٹ کنٹریکٹس کا تعارف](/developers/docs/smart-contracts/)۔

## Solidity {#solidity}

- اسمارٹ کنٹریکٹس کو نافذ کرنے کے لیے آبجیکٹ اورینٹڈ، اعلیٰ سطحی زبان۔
- کرلی-بریکٹ زبان جو C++ سے سب سے زیادہ متاثر ہوئی ہے۔
- اسٹیٹیکلی ٹائپڈ (متغیر کی قسم کمپائل کے وقت معلوم ہوتی ہے)۔
- سپورٹ کرتا ہے:
  - انہیریٹنس (آپ دوسرے کنٹریکٹس کو بڑھا سکتے ہیں)۔
  - لائبریریاں (آپ دوبارہ قابل استعمال کوڈ بنا سکتے ہیں جسے آپ مختلف کنٹریکٹس سے کال کر سکتے ہیں - جیسے دیگر آبجیکٹ اورینٹڈ پروگرامنگ زبانوں میں ایک اسٹیٹک کلاس میں اسٹیٹک فنکشنز)۔
  - پیچیدہ صارف کی طرف سے متعین کردہ اقسام۔

### اہم لنکس {#important-links}

- [دستاویزات](https://docs.soliditylang.org/en/latest/)
- [Solidity لینگویج پورٹل](https://soliditylang.org/)
- [Solidity بہ مثال](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter چیٹ روم](https://gitter.im/ethereum/solidity) سے [Solidity Matrix چیٹ روم](https://matrix.to/#/#ethereum_solidity:gitter.im) پر برج کیا گیا۔
- [چیٹ شیٹ](https://reference.auditless.com/cheatsheet)
- [Solidity بلاگ](https://blog.soliditylang.org/)
- [Solidity ٹویٹر](https://twitter.com/solidity_lang)

### مثال کا کنٹریکٹ {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // کلیدی لفظ "public" متغیرات کو
    // دوسرے کنٹریکٹس سے قابل رسائی بناتا ہے
    address public minter;
    mapping (address => uint) public balances;

    // ایونٹس کلائنٹس کو آپ کی اعلان کردہ مخصوص
    // کنٹریکٹ تبدیلیوں پر رد عمل ظاہر کرنے کی اجازت دیتے ہیں
    event Sent(address from, address to, uint amount);

    // کنسٹرکٹر کوڈ صرف اس وقت چلتا ہے جب کنٹریکٹ
    // بنایا جاتا ہے
    constructor() {
        minter = msg.sender;
    }

    // ایک ایڈریس پر نئے بنائے گئے کوائنز کی ایک رقم بھیجتا ہے
    // صرف کنٹریکٹ بنانے والے کے ذریعے کال کیا جا سکتا ہے
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // کسی بھی کالر سے ایک ایڈریس پر
    // موجودہ کوائنز کی ایک رقم بھیجتا ہے
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "ناکافی بیلنس۔");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

یہ مثال آپ کو اس بات کا اندازہ دے گی کہ Solidity کنٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور متغیرات کی مزید تفصیلی تفصیل کے لیے، [دستاویزات دیکھیں](https://docs.soliditylang.org/en/latest/contracts.html)۔

## Vyper {#vyper}

- پائیتھونک پروگرامنگ زبان
- مضبوط ٹائپنگ
- چھوٹا اور قابل فہم کمپائلر کوڈ
- موثر بائٹ کوڈ جنریشن
- جان بوجھ کر Solidity سے کم خصوصیات ہیں اس مقصد کے ساتھ کہ کنٹریکٹس کو زیادہ محفوظ اور آڈٹ کرنے میں آسان بنایا جائے۔ Vyper سپورٹ نہیں کرتا:
  - موڈیفائرز
  - انہیریٹنس
  - ان لائن اسمبلی
  - فنکشن اوورلوڈنگ
  - آپریٹر اوورلوڈنگ
  - ریکرسیو کالنگ
  - لامحدود لمبائی کے لوپس
  - بائنری فکسڈ پوائنٹس

مزید معلومات کے لیے، [Vyper کا جواز پڑھیں](https://vyper.readthedocs.io/en/latest/index.html)۔

### اہم لنکس {#important-links-1}

- [دستاویزات](https://vyper.readthedocs.io)
- [Vyper بہ مثال](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [مزید Vyper بہ مثال](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper کمیونٹی ڈسکارڈ چیٹ](https://discord.gg/SdvKC79cJk)
- [چیٹ شیٹ](https://reference.auditless.com/cheatsheet)
- [Vyper کے لیے اسمارٹ کنٹریکٹ ڈیولپمنٹ فریم ورک اور ٹولز](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper اسمارٹ کنٹریکٹس کو محفوظ بنانا اور ہیک کرنا سیکھیں](https://github.com/SupremacyTeam/VyperPunk)
- [ڈیولپمنٹ کے لیے Vyper ہب](https://github.com/zcor/vyper-dev)
- [Vyper کے بہترین اسمارٹ کنٹریکٹ کی مثالیں](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [شاندار Vyper کیوریٹڈ وسائل](https://github.com/spadebuilders/awesome-vyper)

### مثال {#example}

```python
# کھلی نیلامی

# نیلامی کے پیرامیٹرز
# فائدہ اٹھانے والا سب سے زیادہ بولی لگانے والے سے رقم وصول کرتا ہے
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# نیلامی کی موجودہ حالت
highestBidder: public(address)
highestBid: public(uint256)

# آخر میں true پر سیٹ کریں، کسی بھی تبدیلی کی اجازت نہیں دیتا
ended: public(bool)

# واپس کی گئی بولیوں کا ٹریک رکھیں تاکہ ہم ودڈرال پیٹرن کی پیروی کر سکیں
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` کے ساتھ ایک سادہ نیلامی بنائیں
# `_beneficiary` ایڈریس والے فائدہ اٹھانے والے کی جانب سے
# سیکنڈ بولی لگانے کا وقت۔
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# اس ٹرانزیکشن کے ساتھ بھیجی گئی
# قیمت کے ساتھ نیلامی پر بولی لگائیں۔
# قیمت صرف اس صورت میں واپس کی جائے گی جب
# نیلامی نہیں جیتی جاتی ہے۔
@external
@payable
def bid():
    # چیک کریں کہ بولی کی مدت ختم ہو گئی ہے یا نہیں۔
    assert block.timestamp < self.auctionEnd
    # چیک کریں کہ بولی کافی زیادہ ہے
    assert msg.value > self.highestBid
    # پچھلے سب سے زیادہ بولی لگانے والے کے لیے ریفنڈ کو ٹریک کریں
    self.pendingReturns[self.highestBidder] += self.highestBid
    # نئی اونچی بولی کو ٹریک کریں
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# پہلے سے واپس کی گئی بولی واپس لیں۔ ودڈرال پیٹرن
# یہاں ایک سیکیورٹی مسئلے سے بچنے کے لیے استعمال کیا جاتا ہے۔ اگر ریفنڈز براہ راست
# bid() کے حصے کے طور پر بھیجے جاتے، تو ایک بدنیتی پر مبنی بولی لگانے والا کنٹریکٹ
# ان ریفنڈز کو بلاک کر سکتا تھا اور اس طرح نئی اونچی بولیوں کو آنے سے روک سکتا تھا۔
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# نیلامی ختم کریں اور سب سے اونچی بولی
# فائدہ اٹھانے والے کو بھیجیں۔
@external
def endAuction():
    # یہ دوسرے کنٹریکٹس کے ساتھ تعامل کرنے والے فنکشنز کو (یعنی، وہ فنکشنز کو کال کرتے ہیں یا ایتھر بھیجتے ہیں)
    # تین مراحل میں ترتیب دینے کے لیے ایک اچھی رہنما خطوط ہے:
    # 1. شرائط کی جانچ کرنا
    # 2. اعمال انجام دینا (ممکنہ طور پر شرائط کو تبدیل کرنا)
    # 3. دوسرے کنٹریکٹس کے ساتھ تعامل کرنا
    # اگر یہ مراحل آپس میں مل جاتے ہیں، تو دوسرا کنٹریکٹ
    # موجودہ کنٹریکٹ میں واپس کال کر سکتا ہے اور اسٹیٹ میں ترمیم کر سکتا ہے یا
    # اثرات (ایتھر کی ادائیگی) کو کئی بار انجام دینے کا سبب بن سکتا ہے۔
    # اگر اندرونی طور پر کال کیے گئے فنکشنز میں بیرونی
    # کنٹریکٹس کے ساتھ تعامل شامل ہے، تو انہیں بھی بیرونی
    # کنٹریکٹس کے ساتھ تعامل سمجھا جانا چاہیے۔

    # 1. شرائط
    # چیک کریں کہ نیلامی کا اختتامی وقت پہنچ گیا ہے
    assert block.timestamp >= self.auctionEnd
    # چیک کریں کہ یہ فنکشن پہلے ہی کال کیا جا چکا ہے
    assert not self.ended

    # 2. اثرات
    self.ended = True

    # 3. تعامل
    send(self.beneficiary, self.highestBid)
```

یہ مثال آپ کو اس بات کا اندازہ دے گی کہ Vyper کنٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور متغیرات کی مزید تفصیلی تفصیل کے لیے، [دستاویزات دیکھیں](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)۔

## Yul اور Yul+ {#yul}

اگر آپ Ethereum میں نئے ہیں اور ابھی تک اسمارٹ کنٹریکٹ زبانوں کے ساتھ کوئی کوڈنگ نہیں کی ہے، تو ہم Solidity یا Vyper کے ساتھ شروع کرنے کی تجویز کرتے ہیں۔ Yul یا Yul+ کو صرف تب دیکھیں جب آپ اسمارٹ کنٹریکٹ سیکیورٹی کے بہترین طریقوں اور EVM کے ساتھ کام کرنے کی تفصیلات سے واقف ہوں۔

**Yul**

- Ethereum کے لیے درمیانی زبان۔
- [EVM](/developers/docs/evm) اور [Ewasm](https://github.com/ewasm)، جو ایک Ethereum فلیورڈ WebAssembly ہے، کو سپورٹ کرتا ہے اور اسے دونوں پلیٹ فارمز کا ایک قابل استعمال مشترکہ ڈینومینیٹر ہونے کے لیے ڈیزائن کیا گیا ہے۔
- اعلیٰ سطحی آپٹیمائزیشن مراحل کے لیے اچھا ہدف جو EVM اور Ewasm دونوں پلیٹ فارمز کو یکساں طور پر فائدہ پہنچا سکتے ہیں۔

**Yul+**

- Yul کی ایک نچلی سطح کی، انتہائی موثر ایکسٹینشن۔
- ابتدائی طور پر ایک [آپٹیمسٹک رول اپ](/developers/docs/scaling/optimistic-rollups/) کنٹریکٹ کے لیے ڈیزائن کیا گیا ہے۔
- Yul+ کو Yul کے لیے ایک تجرباتی اپ گریڈ تجویز کے طور پر دیکھا جا سکتا ہے، جو اس میں نئی خصوصیات شامل کرتا ہے۔

### اہم لنکس {#important-links-2}

- [Yul دستاویزات](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ دستاویزات](https://github.com/fuellabs/yulp)
- [Yul+ تعارفی پوسٹ](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### مثال کا کنٹریکٹ {#example-contract-2}

درج ذیل سادہ مثال ایک پاور فنکشن کو نافذ کرتی ہے۔ اسے `solc --strict-assembly --bin input.yul` کا استعمال کرتے ہوئے کمپائل کیا جا سکتا ہے۔ مثال کو
input.yul فائل میں محفوظ کیا جانا چاہیے۔

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

اگر آپ پہلے سے ہی اسمارٹ کنٹریکٹس کے ساتھ اچھی طرح سے تجربہ کار ہیں، تو Yul میں ایک مکمل ERC20 نفاذ [یہاں](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) پایا جا سکتا ہے۔

## Fe {#fe}

- Ethereum ورچوئل مشین (EVM) کے لیے اسٹیٹیکلی ٹائپڈ زبان۔
- Python اور Rust سے متاثر۔
- سیکھنے میں آسان ہونے کا مقصد ہے -- یہاں تک کہ ان ڈیولپرز کے لیے بھی جو Ethereum ایکو سسٹم میں نئے ہیں۔
- Fe ڈیولپمنٹ ابھی بھی اپنے ابتدائی مراحل میں ہے، زبان کی الفا ریلیز جنوری 2021 میں ہوئی تھی۔

### اہم لنکس {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe اعلان](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 روڈ میپ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe ڈسکارڈ چیٹ](https://discord.com/invite/ywpkAXFjZH)
- [Fe ٹویٹر](https://twitter.com/official_fe)

### مثال کا کنٹریکٹ {#example-contract-3}

درج ذیل Fe میں نافذ کردہ ایک سادہ کنٹریکٹ ہے۔

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## کیسے انتخاب کریں {#how-to-choose}

کسی بھی دوسری پروگرامنگ زبان کی طرح، یہ زیادہ تر صحیح کام کے لیے صحیح ٹول کا انتخاب کرنے کے ساتھ ساتھ ذاتی ترجیحات کے بارے میں ہے۔

اگر آپ نے ابھی تک کسی بھی زبان کو نہیں آزمایا ہے تو یہاں کچھ چیزیں ہیں جن پر غور کرنا ہے:

### Solidity کے بارے میں کیا بڑی بات ہے؟ {#solidity-advantages}

- اگر آپ ایک ابتدائی ہیں، تو وہاں بہت سے ٹیوٹوریلز اور سیکھنے کے ٹولز موجود ہیں۔ اس کے بارے میں مزید [کوڈنگ کے ذریعے سیکھیں](/developers/learning-tools/) سیکشن میں دیکھیں۔
- اچھی ڈیولپر ٹولنگ دستیاب ہے۔
- Solidity کی ایک بڑی ڈیولپر کمیونٹی ہے، جس کا مطلب ہے کہ آپ کو اپنے سوالات کے جوابات بہت جلد مل جائیں گے۔

### Vyper کے بارے میں کیا بڑی بات ہے؟ {#vyper-advatages}

- ان Python ڈیولپرز کے لیے شروع کرنے کا بہترین طریقہ جو اسمارٹ کنٹریکٹس لکھنا چاہتے ہیں۔
- Vyper میں کم خصوصیات ہیں جو اسے آئیڈیاز کی فوری پروٹوٹائپنگ کے لیے بہترین بناتی ہیں۔
- Vyper کا مقصد آڈٹ کرنے میں آسان اور زیادہ سے زیادہ انسانی-پڑھنے کے قابل ہونا ہے۔

### Yul اور Yul+ کے بارے میں کیا بڑی بات ہے؟ {#yul-advantages}

- سادہ اور فنکشنل نچلی سطح کی زبان۔
- خام EVM کے بہت قریب جانے کی اجازت دیتا ہے، جو آپ کے کنٹریکٹس کے گیس کے استعمال کو بہتر بنانے میں مدد کر سکتا ہے۔

## زبانوں کا موازنہ {#language-comparisons}

بنیادی سنٹیکس، کنٹریکٹ لائف سائیکل، انٹرفیس، آپریٹرز، ڈیٹا اسٹرکچرز، فنکشنز، کنٹرول فلو، اور مزید کے موازنے کے لیے Auditless کی اس [چیٹ شیٹ](https://reference.auditless.com/cheatsheet/) کو دیکھیں۔

## مزید پڑھیں {#further-reading}

- [OpenZeppelin کی طرف سے Solidity کنٹریکٹس لائبریری](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity بہ مثال](https://solidity-by-example.org)
