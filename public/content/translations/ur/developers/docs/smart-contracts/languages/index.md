---
title: "اسمارٹ کانٹریکٹ کی زبانیں"
description: "دو اہم اسمارٹ کانٹریکٹ زبانوں – Solidity اور Vyper کا جائزہ اور موازنہ۔"
lang: ur
---

[Ethereum](/) کے بارے میں ایک بہترین پہلو یہ ہے کہ اسمارٹ کانٹریکٹس کو نسبتاً ڈیولپر دوست زبانوں کا استعمال کرتے ہوئے پروگرام کیا جا سکتا ہے۔ اگر آپ Python یا کسی بھی [curly-bracket language](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) کا تجربہ رکھتے ہیں، تو آپ مانوس سنٹیکس والی زبان تلاش کر سکتے ہیں۔

دو سب سے زیادہ فعال اور زیرِ انتظام (maintained) زبانیں یہ ہیں:

- Solidity
- Vyper

Remix IDE، Solidity اور Vyper دونوں میں کانٹریکٹس بنانے اور ٹیسٹ کرنے کے لیے ایک جامع ڈیولپمنٹ ماحول فراہم کرتا ہے۔ کوڈنگ شروع کرنے کے لیے [براؤزر میں موجود Remix IDE آزمائیں](https://remix.ethereum.org)۔

زیادہ تجربہ کار ڈیولپرز Yul کا استعمال بھی کر سکتے ہیں، جو [Ethereum Virtual Machine](/developers/docs/evm/) کے لیے ایک درمیانی (intermediate) زبان ہے، یا Yul+، جو Yul کی ایک ایکسٹینشن ہے۔

اگر آپ متجسس ہیں اور نئی زبانوں کو ٹیسٹ کرنے میں مدد کرنا چاہتے ہیں جو ابھی تک ڈیولپمنٹ کے مراحل میں ہیں، تو آپ Fe کے ساتھ تجربہ کر سکتے ہیں، جو ایک ابھرتی ہوئی اسمارٹ کانٹریکٹ زبان ہے اور فی الحال اپنے ابتدائی مراحل میں ہے۔

## پیشگی شرائط {#prerequisites}

پروگرامنگ زبانوں، خاص طور پر JavaScript یا Python کا پچھلا علم، آپ کو اسمارٹ کانٹریکٹ زبانوں میں فرق کو سمجھنے میں مدد دے سکتا ہے۔ ہم یہ بھی تجویز کرتے ہیں کہ زبانوں کے موازنے میں گہرائی تک جانے سے پہلے آپ اسمارٹ کانٹریکٹس کو بطور تصور سمجھیں۔ [اسمارٹ کانٹریکٹس کا تعارف](/developers/docs/smart-contracts/)۔

## Solidity {#solidity}

- اسمارٹ کانٹریکٹس کو نافذ کرنے کے لیے آبجیکٹ اورینٹڈ، ہائی لیول زبان۔
- کرلی بریکٹ (Curly-bracket) زبان جو C++ سے سب سے زیادہ متاثر ہے۔
- اسٹیٹیکلی ٹائپڈ (Statically typed) (ویری ایبل کی ٹائپ کمپائل ٹائم پر معلوم ہوتی ہے)۔
- سپورٹ کرتی ہے:
  - انہیریٹنس (Inheritance) (آپ دوسرے کانٹریکٹس کو ایکسٹینڈ کر سکتے ہیں)۔
  - لائبریریز (آپ دوبارہ استعمال کے قابل کوڈ بنا سکتے ہیں جسے آپ مختلف کانٹریکٹس سے کال کر سکتے ہیں – جیسے دیگر آبجیکٹ اورینٹڈ پروگرامنگ زبانوں میں اسٹیٹک کلاس میں اسٹیٹک فنکشنز)۔
  - پیچیدہ یوزر ڈیفائنڈ ٹائپس (Complex user-defined types)۔

### اہم لنکس {#important-links}

- [ڈاکیومنٹیشن](https://docs.soliditylang.org/en/latest/)
- [Solidity لینگویج پورٹل](https://soliditylang.org/)
- [Solidity بذریعہ مثال (Solidity by Example)](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter چیٹ روم](https://gitter.im/ethereum/solidity) جو [Solidity Matrix چیٹ روم](https://matrix.to/#/#ethereum_solidity:gitter.im) سے منسلک ہے
- [چیٹ شیٹ (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Solidity بلاگ](https://blog.soliditylang.org/)
- [Solidity ٹوئٹر](https://twitter.com/solidity_lang)

### مثال کا کانٹریکٹ {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // لفظ "public" ویری ایبلز کو
    // دوسرے کنٹریکٹس سے قابل رسائی بناتا ہے
    address public minter;
    mapping (address => uint) public balances;

    // ایونٹس کلائنٹس کو مخصوص
    // آپ کی بیان کردہ کنٹریکٹ کی تبدیلیوں پر ردعمل ظاہر کرنے کی اجازت دیتے ہیں
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
    // کسی بھی کالر کی طرف سے کسی ایڈریس پر
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

یہ مثال آپ کو اندازہ دے گی کہ Solidity کانٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور ویری ایبلز کی مزید تفصیلی وضاحت کے لیے، [ڈاکیومنٹیشن دیکھیں](https://docs.soliditylang.org/en/latest/contracts.html)۔

## Vyper {#vyper}

- پائتھونک (Pythonic) پروگرامنگ زبان
- اسٹرانگ ٹائپنگ (Strong typing)
- چھوٹا اور قابل فہم کمپائلر کوڈ
- موثر بائٹ کوڈ (bytecode) جنریشن
- جان بوجھ کر Solidity سے کم فیچرز رکھتی ہے تاکہ کانٹریکٹس کو زیادہ محفوظ اور آڈٹ کرنے میں آسان بنایا جا سکے۔ Vyper درج ذیل کو سپورٹ نہیں کرتی:
  - موڈیفائرز (Modifiers)
  - انہیریٹنس (Inheritance)
  - ان لائن اسمبلی (Inline assembly)
  - فنکشن اوورلوڈنگ (Function overloading)
  - آپریٹر اوورلوڈنگ (Operator overloading)
  - ریکرسیو کالنگ (Recursive calling)
  - لامحدود لمبائی والے لوپس (Infinite-length loops)
  - بائنری فکسڈ پوائنٹس (Binary fixed points)

مزید معلومات کے لیے، [Vyper کا استدلال (rationale) پڑھیں](https://vyper.readthedocs.io/en/latest/index.html)۔

### اہم لنکس {#important-links-1}

- [ڈاکیومنٹیشن](https://vyper.readthedocs.io)
- [Vyper بذریعہ مثال (Vyper by Example)](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [مزید Vyper بذریعہ مثال](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper کمیونٹی Discord چیٹ](https://discord.gg/SdvKC79cJk)
- [چیٹ شیٹ (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Vyper کے لیے اسمارٹ کانٹریکٹ ڈیولپمنٹ فریم ورکس اور ٹولز](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper اسمارٹ کانٹریکٹس کو محفوظ بنانا اور ہیک کرنا سیکھیں](https://github.com/SupremacyTeam/VyperPunk)
- [ڈیولپمنٹ کے لیے Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper کی بہترین اسمارٹ کانٹریکٹ مثالیں](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper کے منتخب کردہ وسائل](https://github.com/spadebuilders/awesome-vyper)

### مثال {#example}

```python
# کھلی نیلامی

# نیلامی کے پیرامیٹرز
# فائدہ اٹھانے والے کو سب سے بڑی بولی لگانے والے سے رقم ملتی ہے
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# نیلامی کی موجودہ حالت
highestBidder: public(address)
highestBid: public(uint256)

# آخر میں true پر سیٹ کیا جاتا ہے، کسی بھی تبدیلی کی اجازت نہیں دیتا
ended: public(bool)

# واپس کی گئی بولیوں کا ریکارڈ رکھیں تاکہ ہم ودڈرا (withdraw) پیٹرن کی پیروی کر سکیں
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` کے ساتھ ایک سادہ نیلامی بنائیں
# سیکنڈز کی بولی کا وقت، جس کی طرف سے
# فائدہ اٹھانے والے کا ایڈریس `_beneficiary` ہے۔
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# بھیجی گئی ویلیو کے ساتھ نیلامی میں بولی لگائیں
# جو اس ٹرانزیکشن کے ساتھ ہے۔
# ویلیو صرف اسی صورت میں واپس کی جائے گی اگر
# نیلامی نہیں جیتی جاتی۔
@external
@payable
def bid():
    # چیک کریں کہ کیا بولی کا وقت ختم ہو گیا ہے۔
    assert block.timestamp < self.auctionEnd
    # چیک کریں کہ کیا بولی کافی زیادہ ہے
    assert msg.value > self.highestBid
    # پچھلے سب سے بڑے بولی دہندہ کے ریفنڈ کا ریکارڈ رکھیں
    self.pendingReturns[self.highestBidder] += self.highestBid
    # نئی سب سے بڑی بولی کا ریکارڈ رکھیں
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# پہلے سے ریفنڈ کی گئی بولی نکلوائیں۔ یہاں ودڈرا (withdraw) پیٹرن
# سیکیورٹی کے مسئلے سے بچنے کے لیے استعمال کیا گیا ہے۔ اگر ریفنڈز براہ راست
# bid() کے حصے کے طور پر بھیجے جاتے، تو ایک نقصان دہ بڈنگ کنٹریکٹ ان ریفنڈز کو روک سکتا تھا
# اور اس طرح نئی بڑی بولیوں کو آنے سے روک سکتا تھا۔
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# نیلامی ختم کریں اور سب سے بڑی بولی
# فائدہ اٹھانے والے کو بھیجیں۔
@external
def endAuction():
    # یہ ایک اچھی گائیڈ لائن ہے کہ ان فنکشنز کو اسٹرکچر کیا جائے جو
    # دوسرے کنٹریکٹس کے ساتھ تعامل کرتے ہیں (یعنی وہ فنکشنز کال کرتے ہیں یا ایتھر بھیجتے ہیں)
    # تین مراحل میں:
    # 1. شرائط چیک کرنا
    # 2. ایکشنز پرفارم کرنا (ممکنہ طور پر شرائط کو تبدیل کرنا)
    # 3. دوسرے کنٹریکٹس کے ساتھ تعامل کرنا
    # اگر ان مراحل کو ملا دیا جائے، تو دوسرا کنٹریکٹ واپس
    # موجودہ کنٹریکٹ کو کال کر سکتا ہے اور اسٹیٹ کو تبدیل کر سکتا ہے یا
    # اثرات (ایتھر کی ادائیگی) کو کئی بار پرفارم کرنے کا سبب بن سکتا ہے۔
    # اگر اندرونی طور پر کال کیے گئے فنکشنز میں بیرونی کنٹریکٹس کے ساتھ
    # تعامل شامل ہے، تو انہیں بھی بیرونی کنٹریکٹس کے ساتھ
    # تعامل سمجھا جانا چاہیے۔

    # 1. شرائط
    # چیک کریں کہ کیا نیلامی کے ختم ہونے کا وقت آ گیا ہے
    assert block.timestamp >= self.auctionEnd
    # چیک کریں کہ کیا یہ فنکشن پہلے ہی کال کیا جا چکا ہے
    assert not self.ended

    # 2. اثرات
    self.ended = True

    # 3. تعامل
    send(self.beneficiary, self.highestBid)
```

یہ مثال آپ کو اندازہ دے گی کہ Vyper کانٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور ویری ایبلز کی مزید تفصیلی وضاحت کے لیے، [ڈاکیومنٹیشن دیکھیں](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)۔

## Yul اور Yul+ {#yul}

اگر آپ Ethereum میں نئے ہیں اور ابھی تک اسمارٹ کانٹریکٹ زبانوں کے ساتھ کوئی کوڈنگ نہیں کی ہے، تو ہم تجویز کرتے ہیں کہ Solidity یا Vyper سے شروعات کریں۔ Yul یا Yul+ کو تب ہی دیکھیں جب آپ اسمارٹ کانٹریکٹ سیکیورٹی کی بہترین پریکٹسز اور EVM کے ساتھ کام کرنے کی خصوصیات سے واقف ہو جائیں۔

**Yul**

- Ethereum کے لیے درمیانی (Intermediate) زبان۔
- [EVM](/developers/docs/evm) اور [Ewasm](https://github.com/ewasm) (جو کہ Ethereum فلیورڈ WebAssembly ہے) کو سپورٹ کرتی ہے، اور اسے دونوں پلیٹ فارمز کے قابل استعمال مشترکہ ڈینومینیٹر (common denominator) کے طور پر ڈیزائن کیا گیا ہے۔
- ہائی لیول آپٹیمائزیشن کے مراحل کے لیے ایک اچھا ہدف ہے جو EVM اور Ewasm دونوں پلیٹ فارمز کو یکساں فائدہ پہنچا سکتا ہے۔

**Yul+**

- Yul کی ایک لو لیول (low-level)، انتہائی موثر ایکسٹینشن۔
- ابتدائی طور پر ایک [optimistic rollup](/developers/docs/scaling/optimistic-rollups/) کانٹریکٹ کے لیے ڈیزائن کی گئی تھی۔
- Yul+ کو Yul کے لیے ایک تجرباتی اپ گریڈ تجویز کے طور پر دیکھا جا سکتا ہے، جو اس میں نئے فیچرز کا اضافہ کرتی ہے۔

### اہم لنکس {#important-links-2}

- [Yul ڈاکیومنٹیشن](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ ڈاکیومنٹیشن](https://github.com/fuellabs/yulp)
- [Yul+ تعارفی پوسٹ](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### مثال کا کانٹریکٹ {#example-contract-2}

درج ذیل سادہ مثال ایک پاور فنکشن کو نافذ کرتی ہے۔ اسے `solc --strict-assembly --bin input.yul` کا استعمال کرتے ہوئے کمپائل کیا جا سکتا ہے۔ اس مثال کو input.yul فائل میں اسٹور کیا جانا چاہیے۔

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

اگر آپ پہلے ہی اسمارٹ کانٹریکٹس کا اچھا تجربہ رکھتے ہیں، تو Yul میں مکمل ERC20 کا نفاذ [یہاں](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) پایا جا سکتا ہے۔

## Fe {#fe}

- Ethereum Virtual Machine (EVM) کے لیے اسٹیٹیکلی ٹائپڈ (Statically typed) زبان۔
- Python اور Rust سے متاثر۔
- اس کا مقصد سیکھنے میں آسان ہونا ہے -- یہاں تک کہ ان ڈیولپرز کے لیے بھی جو Ethereum ایکو سسٹم میں نئے ہیں۔
- Fe کی ڈیولپمنٹ ابھی اپنے ابتدائی مراحل میں ہے، اس زبان کا الفا (alpha) ریلیز جنوری <span dir="ltr">2021</span> میں ہوا تھا۔

### اہم لنکس {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe کا اعلان](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe کا <span dir="ltr">2021</span> روڈ میپ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord چیٹ](https://discord.com/invite/ywpkAXFjZH)
- [Fe ٹوئٹر](https://twitter.com/official_fe)

### مثال کا کانٹریکٹ {#example-contract-3}

ذیل میں Fe میں نافذ کیا گیا ایک سادہ کانٹریکٹ ہے۔

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

اگر آپ نے ابھی تک کسی بھی زبان کو نہیں آزمایا ہے تو یہاں چند چیزوں پر غور کرنا چاہیے:

### Solidity کے بارے میں کیا بہترین ہے؟ {#solidity-advantages}

- اگر آپ ابتدائی (beginner) ہیں، تو وہاں بہت سے ٹیوٹوریلز اور سیکھنے کے ٹولز موجود ہیں۔ اس کے بارے میں مزید [کوڈنگ کے ذریعے سیکھیں](/developers/learning-tools/) سیکشن میں دیکھیں۔
- اچھے ڈیولپر ٹولز دستیاب ہیں۔
- Solidity کی ایک بڑی ڈیولپر کمیونٹی ہے، جس کا مطلب ہے کہ آپ کو اپنے سوالات کے جوابات بہت جلد ملنے کا امکان ہے۔

### Vyper کے بارے میں کیا بہترین ہے؟ {#vyper-advatages}

- Python ڈیولپرز کے لیے شروعات کرنے کا بہترین طریقہ جو اسمارٹ کانٹریکٹس لکھنا چاہتے ہیں۔
- Vyper میں فیچرز کی تعداد کم ہے جو اسے آئیڈیاز کی فوری پروٹو ٹائپنگ (prototyping) کے لیے بہترین بناتی ہے۔
- Vyper کا مقصد آڈٹ کرنے میں آسان اور زیادہ سے زیادہ انسانوں کے پڑھنے کے قابل (human-readable) ہونا ہے۔

### Yul اور Yul+ کے بارے میں کیا بہترین ہے؟ {#yul-advantages}

- سادہ اور فنکشنل لو لیول (low-level) زبان۔
- خام EVM کے بہت قریب جانے کی اجازت دیتی ہے، جو آپ کے کانٹریکٹس کے گیس کے استعمال کو بہتر (optimize) بنانے میں مدد کر سکتی ہے۔

## زبانوں کا موازنہ {#language-comparisons}

بنیادی سنٹیکس، کانٹریکٹ لائف سائیکل، انٹرفیسز، آپریٹرز، ڈیٹا اسٹرکچرز، فنکشنز، کنٹرول فلو، اور مزید کے موازنے کے لیے Auditless کی یہ [چیٹ شیٹ (cheatsheet)](https://reference.auditless.com/cheatsheet/) دیکھیں۔

## مزید مطالعہ {#further-reading}

- [OpenZeppelin کی جانب سے Solidity کانٹریکٹس لائبریری](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity بذریعہ مثال (Solidity by Example)](https://solidity-by-example.org)