---
title: "سمارٹ کنٹریکٹ کی زبانیں"
description: "دو اہم سمارٹ کنٹریکٹ زبانوں – ⁦Solidity⁩ اور ⁦Vyper⁩ کا جائزہ اور موازنہ۔"
lang: ur
---

[ایتھیریم](/) کے بارے میں ایک بہترین پہلو یہ ہے کہ سمارٹ کنٹریکٹس کو نسبتاً ڈیولپر دوست زبانوں کا استعمال کرتے ہوئے پروگرام کیا جا سکتا ہے۔ اگر آپ کو Python یا کسی بھی [کرلی بریکٹ زبان](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) کا تجربہ ہے، تو آپ مانوس سنٹیکس والی زبان تلاش کر سکتے ہیں۔

دو سب سے زیادہ فعال اور برقرار رکھی جانے والی زبانیں یہ ہیں:

- Solidity
- Vyper

Remix مربوط ترقیاتی ماحول (آئی ڈی ای) Solidity اور Vyper دونوں میں کنٹریکٹس بنانے اور ٹیسٹ کرنے کے لیے ایک جامع ترقیاتی ماحول فراہم کرتا ہے۔ کوڈنگ شروع کرنے کے لیے [براؤزر میں موجود Remix آئی ڈی ای کو آزمائیں](https://remix.ethereum.org)۔

زیادہ تجربہ کار ڈیولپرز Yul کا استعمال بھی کرنا چاہیں گے، جو [ایتھیریم ورچوئل مشین (EVM)](/developers/docs/evm/) کے لیے ایک درمیانی زبان ہے، یا Yul+، جو Yul کی ایک توسیع ہے۔

اگر آپ متجسس ہیں اور نئی زبانوں کو ٹیسٹ کرنے میں مدد کرنا پسند کرتے ہیں جو ابھی تک بھاری ترقی کے مراحل میں ہیں، تو آپ Fe کے ساتھ تجربہ کر سکتے ہیں، جو ایک ابھرتی ہوئی سمارٹ کنٹریکٹ زبان ہے اور فی الحال اپنے ابتدائی مراحل میں ہے۔

## پیشگی شرائط {#prerequisites}

پروگرامنگ زبانوں، خاص طور پر JavaScript یا Python کا پیشگی علم، آپ کو سمارٹ کنٹریکٹ زبانوں میں فرق کو سمجھنے میں مدد دے سکتا ہے۔ ہم یہ بھی تجویز کرتے ہیں کہ زبانوں کے موازنے میں گہرائی تک جانے سے پہلے آپ سمارٹ کنٹریکٹس کو ایک تصور کے طور پر سمجھیں۔ [سمارٹ کنٹریکٹس کا تعارف](/developers/docs/smart-contracts/)۔

## Solidity {#solidity}

- سمارٹ کنٹریکٹس کو نافذ کرنے کے لیے آبجیکٹ اورینٹڈ، ہائی لیول زبان۔
- کرلی بریکٹ زبان جو C++ سے سب سے زیادہ متاثر ہوئی ہے۔
- سٹیٹیکلی ٹائپڈ (متغیر کی قسم کمپائل کے وقت معلوم ہوتی ہے)۔
- یہ سپورٹ کرتی ہے:
  - وراثت (آپ دوسرے کنٹریکٹس کو بڑھا سکتے ہیں)۔
  - لائبریریاں (آپ دوبارہ استعمال کے قابل کوڈ بنا سکتے ہیں جسے آپ مختلف کنٹریکٹس سے کال کر سکتے ہیں – جیسے دیگر آبجیکٹ اورینٹڈ پروگرامنگ زبانوں میں سٹیٹک کلاس میں سٹیٹک فنکشنز)۔
  - پیچیدہ صارف کی متعین کردہ اقسام۔

### اہم لنکس {#important-links}

- [دستاویزات](https://docs.soliditylang.org/en/latest/)
- [Solidity لینگویج پورٹل](https://soliditylang.org/)
- [Solidity بذریعہ مثال](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter چیٹ روم](https://gitter.im/ethereum/solidity) جو [Solidity Matrix چیٹ روم](https://matrix.to/#/#ethereum_solidity:gitter.im) سے منسلک ہے
- [چیٹ شیٹ](https://reference.auditless.com/cheatsheet)
- [Solidity بلاگ](https://blog.soliditylang.org/)
- [Solidity ٹوئٹر](https://twitter.com/solidity_lang)

### مثال کا کنٹریکٹ {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // کی ورڈ "public" ویری ایبلز کو بناتا ہے
    // دوسرے کنٹریکٹس سے قابل رسائی
    address public minter;
    mapping (address => uint) public balances;

    // ایونٹس کلائنٹس کو مخصوص
    // کنٹریکٹ کی تبدیلیوں پر ردعمل ظاہر کرنے کی اجازت دیتے ہیں جو آپ ڈکلیئر کرتے ہیں
    event Sent(address from, address to, uint amount);

    // کنسٹرکٹر کوڈ صرف اسی وقت چلتا ہے جب کنٹریکٹ
    // بنایا جاتا ہے
    constructor() {
        minter = msg.sender;
    }

    // نئے بنائے گئے کوائنز کی ایک مقدار کسی ایڈریس پر بھیجتا ہے
    // اسے صرف کنٹریکٹ بنانے والا ہی کال کر سکتا ہے
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // موجودہ کوائنز کی ایک مقدار بھیجتا ہے
    // کسی بھی کالر سے کسی ایڈریس پر
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

یہ مثال آپ کو اندازہ دے گی کہ Solidity کنٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور متغیرات کی مزید تفصیلی وضاحت کے لیے، [دستاویزات دیکھیں](https://docs.soliditylang.org/en/latest/contracts.html)۔

## Vyper {#vyper}

- پائتھونک (Pythonic) پروگرامنگ زبان
- سٹرانگ ٹائپنگ
- چھوٹا اور قابل فہم کمپائلر کوڈ
- موثر بائٹ کوڈ کی تخلیق
- جان بوجھ کر Solidity سے کم خصوصیات رکھتی ہے تاکہ کنٹریکٹس کو زیادہ محفوظ اور آڈٹ کرنے میں آسان بنایا جا سکے۔ Vyper درج ذیل کو سپورٹ نہیں کرتی:
  - موڈیفائرز (Modifiers)
  - وراثت (Inheritance)
  - ان لائن اسمبلی (Inline assembly)
  - فنکشن اوورلوڈنگ (Function overloading)
  - آپریٹر اوورلوڈنگ (Operator overloading)
  - ریکرسیو کالنگ (Recursive calling)
  - لامحدود لمبائی کے لوپس (Infinite-length loops)
  - بائنری فکسڈ پوائنٹس (Binary fixed points)

<span dir="ltr">v0.4.0</span> کے بعد سے، Vyper ایک [ماڈیول سسٹم](https://docs.vyperlang.org/en/stable/using-modules.html) کو سپورٹ کرتی ہے۔ کوڈ کا دوبارہ استعمال کلاس کی وراثت کے بجائے کمپوزیشن کے ذریعے حاصل کیا جاتا ہے۔

مزید معلومات کے لیے، [Vyper کی دلیل پڑھیں](https://vyper.readthedocs.io/en/latest/index.html)۔

### اہم لنکس {#important-links-1}

- [دستاویزات](https://vyper.readthedocs.io)
- [Vyper بذریعہ مثال](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [مزید Vyper بذریعہ مثال](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper کمیونٹی ڈسکارڈ چیٹ](https://discord.gg/SdvKC79cJk)
- [چیٹ شیٹ](https://reference.auditless.com/cheatsheet)
- [Vyper کے لیے سمارٹ کنٹریکٹ ڈیولپمنٹ فریم ورکس اور ٹولز](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper سمارٹ کنٹریکٹس کو محفوظ بنانا اور ہیک کرنا سیکھیں](https://github.com/SupremacyTeam/VyperPunk)
- [ڈیولپمنٹ کے لیے Vyper ہب](https://github.com/zcor/vyper-dev)
- [Vyper کی بہترین سمارٹ کنٹریکٹ مثالیں](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper کے منتخب کردہ وسائل](https://github.com/spadebuilders/awesome-vyper)

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

# آخر میں true پر سیٹ کیا جاتا ہے، کسی بھی تبدیلی کی اجازت نہیں دیتا
ended: public(bool)

# واپس کی گئی بولیوں کا ریکارڈ رکھیں تاکہ ہم ودڈرا پیٹرن کی پیروی کر سکیں
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` کے ساتھ ایک سادہ نیلامی بنائیں
# سیکنڈز بولی کا وقت، اس کی طرف سے
# فائدہ اٹھانے والے کے ایڈریس `_beneficiary`۔
@deploy
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# بھیجی گئی ویلیو کے ساتھ نیلامی میں بولی لگائیں
# اس ٹرانزیکشن کے ساتھ۔
# ویلیو صرف اسی صورت میں واپس کی جائے گی اگر
# نیلامی نہیں جیتی جاتی۔
@external
@payable
def bid():
    # چیک کریں کہ کیا بولی کا وقت ختم ہو گیا ہے۔
    assert block.timestamp < self.auctionEnd
    # چیک کریں کہ کیا بولی کافی زیادہ ہے
    assert msg.value > self.highestBid
    # پچھلے سب سے زیادہ بولی لگانے والے کے ریفنڈ کو ٹریک کریں
    self.pendingReturns[self.highestBidder] += self.highestBid
    # نئی سب سے زیادہ بولی کو ٹریک کریں
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# پہلے سے ریفنڈ کی گئی بولی کو نکالیں۔ ودڈرا پیٹرن کا استعمال
# یہاں ایک سیکیورٹی مسئلے سے بچنے کے لیے کیا گیا ہے۔ اگر ریفنڈز براہ راست
# bid() کے حصے کے طور پر بھیجے جاتے، تو ایک نقصان دہ بولی لگانے والا کنٹریکٹ
# ان ریفنڈز کو روک سکتا تھا اور اس طرح نئی زیادہ بولیوں کو آنے سے روک سکتا تھا۔
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# نیلامی ختم کریں اور سب سے زیادہ بولی
# فائدہ اٹھانے والے کو بھیجیں۔
@external
def endAuction():
    # یہ ایک اچھی گائیڈ لائن ہے کہ ان فنکشنز کو اسٹرکچر کیا جائے جو
    # دوسرے کنٹریکٹس کے ساتھ تعامل کرتے ہیں (یعنی، وہ فنکشنز کو کال کرتے ہیں یا ایتھر بھیجتے ہیں)
    # تین مراحل میں:
    # 1. شرائط چیک کرنا
    # 2. ایکشنز انجام دینا (ممکنہ طور پر شرائط کو تبدیل کرنا)
    # 3. دوسرے کنٹریکٹس کے ساتھ تعامل کرنا
    # اگر ان مراحل کو ملا دیا جائے، تو دوسرا کنٹریکٹ
    # موجودہ کنٹریکٹ میں واپس کال کر سکتا ہے اور اسٹیٹ کو تبدیل کر سکتا ہے یا
    # اثرات (ایتھر کی ادائیگی) کو کئی بار انجام دینے کا سبب بن سکتا ہے۔
    # اگر اندرونی طور پر کال کیے گئے فنکشنز میں بیرونی
    # کنٹریکٹس کے ساتھ تعامل شامل ہے، تو انہیں بھی بیرونی کنٹریکٹس کے ساتھ
    # تعامل سمجھا جانا چاہیے۔

    # 1. شرائط
    # چیک کریں کہ کیا نیلامی کے اختتامی وقت تک پہنچ چکے ہیں
    assert block.timestamp >= self.auctionEnd
    # چیک کریں کہ کیا یہ فنکشن پہلے ہی کال کیا جا چکا ہے
    assert not self.ended

    # 2. اثرات
    self.ended = True

    # 3. تعامل
    send(self.beneficiary, self.highestBid)
```

یہ مثال آپ کو اندازہ دے گی کہ Vyper کنٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور متغیرات کی مزید تفصیلی وضاحت کے لیے، [دستاویزات دیکھیں](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)۔

## Yul اور Yul+ {#yul}

اگر آپ ایتھیریم میں نئے ہیں اور ابھی تک سمارٹ کنٹریکٹ زبانوں کے ساتھ کوئی کوڈنگ نہیں کی ہے، تو ہم تجویز کرتے ہیں کہ Solidity یا Vyper سے شروعات کریں۔ Yul یا Yul+ کو صرف اسی وقت دیکھیں جب آپ سمارٹ کنٹریکٹ سیکیورٹی کے بہترین طریقوں اور EVM کے ساتھ کام کرنے کی تفصیلات سے واقف ہو جائیں۔

**Yul**

- ایتھیریم کے لیے درمیانی زبان۔
- [EVM](/developers/docs/evm) اور [Ewasm](https://github.com/ewasm) کو سپورٹ کرتی ہے، جو ایتھیریم کے ذائقے والی WebAssembly ہے، اور اسے دونوں پلیٹ فارمز کے قابل استعمال مشترکہ ڈینومینیٹر کے طور پر ڈیزائن کیا گیا ہے۔
- اعلیٰ سطحی آپٹیمائزیشن کے مراحل کے لیے ایک اچھا ہدف جو EVM اور Ewasm دونوں پلیٹ فارمز کو یکساں طور پر فائدہ پہنچا سکتا ہے۔

**Yul+**

- Yul کی ایک نچلی سطح کی، انتہائی موثر توسیع۔
- ابتدائی طور پر ایک [آپٹمسٹک رول اپ](/developers/docs/scaling/optimistic-rollups/) کنٹریکٹ کے لیے ڈیزائن کیا گیا تھا۔
- Yul+ کو Yul کے لیے ایک تجرباتی اپ گریڈ تجویز کے طور پر دیکھا جا سکتا ہے، جو اس میں نئی خصوصیات کا اضافہ کرتا ہے۔

### اہم لنکس {#important-links-2}

- [Yul کی دستاویزات](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ کی دستاویزات](https://github.com/fuellabs/yulp)
- [Yul+ کے تعارف کی پوسٹ](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### مثال کا کنٹریکٹ {#example-contract-2}

درج ذیل سادہ مثال ایک پاور فنکشن کو نافذ کرتی ہے۔ اسے `solc --strict-assembly --bin input.yul` کا استعمال کرتے ہوئے کمپائل کیا جا سکتا ہے۔ اس مثال کو input.yul فائل میں محفوظ کیا جانا چاہیے۔

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

اگر آپ پہلے سے ہی سمارٹ کنٹریکٹس کا اچھا تجربہ رکھتے ہیں، تو Yul میں ایک مکمل <span dir="ltr">ERC-20</span> کا نفاذ [یہاں](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) پایا جا سکتا ہے۔

## Fe {#fe}

- ایتھیریم ورچوئل مشین (EVM) کے لیے سٹیٹیکلی ٹائپڈ زبان۔
- Python اور Rust سے متاثر۔
- اس کا مقصد سیکھنے میں آسان ہونا ہے -- یہاں تک کہ ان ڈیولپرز کے لیے بھی جو ایتھیریم ایکو سسٹم میں نئے ہیں۔
- Fe کی ترقی ابھی اپنے ابتدائی مراحل میں ہے، اس زبان کا الفا ریلیز جنوری 2021 میں ہوا تھا۔

### اہم لنکس {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe کا اعلان](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe کا 2021 کا روڈ میپ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe ڈسکارڈ چیٹ](https://discord.com/invite/ywpkAXFjZH)
- [Fe ٹوئٹر](https://twitter.com/official_fe)

### مثال کا کنٹریکٹ {#example-contract-3}

درج ذیل Fe میں نافذ کیا گیا ایک سادہ کنٹریکٹ ہے۔

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

## انتخاب کیسے کریں {#how-to-choose}

کسی بھی دوسری پروگرامنگ زبان کی طرح، یہ زیادہ تر صحیح کام کے لیے صحیح ٹول کے انتخاب کے ساتھ ساتھ ذاتی ترجیحات کے بارے میں ہے۔

اگر آپ نے ابھی تک کسی بھی زبان کو نہیں آزمایا ہے تو یہاں غور کرنے کے لیے چند چیزیں ہیں:

### Solidity کے بارے میں کیا زبردست ہے؟ {#solidity-advantages}

- اگر آپ ابتدائی ہیں، تو وہاں بہت سے ٹیوٹوریلز اور سیکھنے کے ٹولز موجود ہیں۔ اس کے بارے میں مزید [کوڈنگ کے ذریعے سیکھیں](/developers/learning-tools/) سیکشن میں دیکھیں۔
- اچھے ڈیولپر ٹولز دستیاب ہیں۔
- Solidity کی ایک بڑی ڈیولپر کمیونٹی ہے، جس کا مطلب ہے کہ آپ کو اپنے سوالات کے جوابات بہت جلد ملنے کا امکان ہے۔

### Vyper کے بارے میں کیا زبردست ہے؟ {#vyper-advatages}

- ان Python ڈیولپرز کے لیے شروعات کرنے کا بہترین طریقہ جو سمارٹ کنٹریکٹس لکھنا چاہتے ہیں۔
- Vyper میں خصوصیات کی تعداد کم ہے جو اسے آئیڈیاز کی فوری پروٹو ٹائپنگ کے لیے بہترین بناتی ہے۔
- Vyper کا مقصد آڈٹ کرنے میں آسان اور زیادہ سے زیادہ انسانوں کے پڑھنے کے قابل ہونا ہے۔

### Yul اور Yul+ کے بارے میں کیا زبردست ہے؟ {#yul-advantages}

- سادہ اور فعال نچلی سطح کی زبان۔
- خام EVM کے بہت قریب جانے کی اجازت دیتی ہے، جو آپ کے کنٹریکٹس کے گیس کے استعمال کو بہتر بنانے میں مدد کر سکتی ہے۔

## زبانوں کا موازنہ {#language-comparisons}

بنیادی سنٹیکس، کنٹریکٹ کے لائف سائیکل، انٹرفیسز، آپریٹرز، ڈیٹا سٹرکچرز، فنکشنز، کنٹرول فلو، اور مزید کے موازنے کے لیے Auditless کی یہ [چیٹ شیٹ](https://reference.auditless.com/cheatsheet/) دیکھیں۔

## مزید مطالعہ {#further-reading}

- [اوپن زیپلن کی جانب سے Solidity کنٹریکٹس کی لائبریری](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity بذریعہ مثال](https://solidity-by-example.org)