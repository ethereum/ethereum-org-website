---
title: "سمارٹ کنٹریکٹ کی زبانیں"
description: "دو اہم سمارٹ کنٹریکٹ زبانوں – ⁦Solidity⁩ اور ⁦Vyper⁩ کا جائزہ اور موازنہ۔"
lang: ur
---

[ایتھیریم](/) کے بارے میں ایک بہترین پہلو یہ ہے کہ سمارٹ کنٹریکٹس کو نسبتاً ڈیولپر دوست زبانوں کا استعمال کرتے ہوئے پروگرام کیا جا سکتا ہے۔ اگر آپ کو <span dir="ltr">Python</span> یا کسی بھی [کرلی بریکٹ زبان](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) کا تجربہ ہے، تو آپ مانوس سنٹیکس والی زبان تلاش کر سکتے ہیں۔

دو سب سے زیادہ فعال اور زیرِ انتظام زبانیں یہ ہیں:

- <span dir="ltr">Solidity</span>
- <span dir="ltr">Vyper</span>

<span dir="ltr">Remix IDE</span> <span dir="ltr">Solidity</span> اور <span dir="ltr">Vyper</span> دونوں میں کنٹریکٹس بنانے اور ٹیسٹ کرنے کے لیے ایک جامع ڈیولپمنٹ ماحول فراہم کرتا ہے۔ کوڈنگ شروع کرنے کے لیے [براؤزر میں موجود <span dir="ltr">Remix IDE</span> آزمائیں](https://remix.ethereum.org)۔

زیادہ تجربہ کار ڈیولپرز <span dir="ltr">Yul</span> کا استعمال بھی کرنا چاہیں گے، جو [ایتھیریم ورچوئل مشین (<span dir="ltr">EVM</span>)](/developers/docs/evm/) کے لیے ایک درمیانی زبان ہے، یا <span dir="ltr">Yul+</span>، جو <span dir="ltr">Yul</span> کی ایک ایکسٹینشن ہے۔

اگر آپ متجسس ہیں اور نئی زبانوں کو ٹیسٹ کرنے میں مدد کرنا پسند کرتے ہیں جو ابھی تک تیزی سے ڈیولپمنٹ کے مراحل میں ہیں، تو آپ <span dir="ltr">Fe</span> کے ساتھ تجربہ کر سکتے ہیں، جو ایک ابھرتی ہوئی سمارٹ کنٹریکٹ زبان ہے اور فی الحال اپنے ابتدائی مراحل میں ہے۔

## پیشگی شرائط {#prerequisites}

پروگرامنگ زبانوں، خاص طور پر <span dir="ltr">JavaScript</span> یا <span dir="ltr">Python</span> کا پچھلا علم، آپ کو سمارٹ کنٹریکٹ زبانوں میں فرق کو سمجھنے میں مدد دے سکتا ہے۔ ہم یہ بھی تجویز کرتے ہیں کہ زبانوں کے موازنے میں گہرائی تک جانے سے پہلے آپ سمارٹ کنٹریکٹس کو ایک تصور کے طور پر سمجھیں۔ [سمارٹ کنٹریکٹس کا تعارف](/developers/docs/smart-contracts/)۔

## <span dir="ltr">Solidity</span> {#solidity}

- سمارٹ کنٹریکٹس کو نافذ کرنے کے لیے آبجیکٹ اورینٹڈ، ہائی لیول زبان۔
- کرلی بریکٹ زبان جو <span dir="ltr">C++</span> سے سب سے زیادہ متاثر ہوئی ہے۔
- سٹیٹیکلی ٹائپڈ (ویری ایبل کی ٹائپ کمپائل کے وقت معلوم ہوتی ہے)۔
- سپورٹ کرتی ہے:
  - انہیریٹنس (آپ دوسرے کنٹریکٹس کو ایکسٹینڈ کر سکتے ہیں)۔
  - لائبریریاں (آپ دوبارہ استعمال کے قابل کوڈ بنا سکتے ہیں جسے آپ مختلف کنٹریکٹس سے کال کر سکتے ہیں – جیسے دیگر آبجیکٹ اورینٹڈ پروگرامنگ زبانوں میں سٹیٹک کلاس میں سٹیٹک فنکشنز)۔
  - پیچیدہ یوزر ڈیفائنڈ ٹائپس۔

### اہم لنکس {#important-links}

- [دستاویزات](https://docs.soliditylang.org/en/latest/)
- [<span dir="ltr">Solidity</span> لینگویج پورٹل](https://soliditylang.org/)
- [مثال کے ذریعے <span dir="ltr">Solidity</span>](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [<span dir="ltr">Solidity</span> Gitter چیٹ روم](https://gitter.im/ethereum/solidity) جو [<span dir="ltr">Solidity</span> میٹرکس چیٹ روم](https://matrix.to/#/#ethereum_solidity:gitter.im) سے منسلک ہے
- [چیٹ شیٹ](https://reference.auditless.com/cheatsheet)
- [<span dir="ltr">Solidity</span> بلاگ](https://blog.soliditylang.org/)
- [<span dir="ltr">Solidity</span> ٹوئٹر](https://twitter.com/solidity_lang)

### مثال کا کنٹریکٹ {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // لفظ "public" ویری ایبلز کو
    // دوسرے کنٹریکٹس سے قابل رسائی بناتا ہے
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

یہ مثال آپ کو اندازہ دے گی کہ <span dir="ltr">Solidity</span> کنٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور ویری ایبلز کی مزید تفصیلی وضاحت کے لیے، [دستاویزات دیکھیں](https://docs.soliditylang.org/en/latest/contracts.html)۔

## <span dir="ltr">Vyper</span> {#vyper}

- پائتھونک پروگرامنگ زبان
- سٹرانگ ٹائپنگ
- چھوٹا اور قابل فہم کمپائلر کوڈ
- موثر بائٹ کوڈ جنریشن
- جان بوجھ کر <span dir="ltr">Solidity</span> سے کم فیچرز رکھتی ہے جس کا مقصد کنٹریکٹس کو زیادہ محفوظ اور آڈٹ کرنے میں آسان بنانا ہے۔ <span dir="ltr">Vyper</span> درج ذیل کو سپورٹ نہیں کرتی:
  - موڈیفائرز
  - انہیریٹنس
  - ان لائن اسمبلی
  - فنکشن اوورلوڈنگ
  - آپریٹر اوورلوڈنگ
  - ریکرسیو کالنگ
  - لامحدود لمبائی والے لوپس
  - بائنری فکسڈ پوائنٹس

مزید معلومات کے لیے، [<span dir="ltr">Vyper</span> کی دلیل پڑھیں](https://vyper.readthedocs.io/en/latest/index.html)۔

### اہم لنکس {#important-links-1}

- [دستاویزات](https://vyper.readthedocs.io)
- [مثال کے ذریعے <span dir="ltr">Vyper</span>](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [مثال کے ذریعے مزید <span dir="ltr">Vyper</span>](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [<span dir="ltr">Vyper</span> کمیونٹی ڈسکارڈ چیٹ](https://discord.gg/SdvKC79cJk)
- [چیٹ شیٹ](https://reference.auditless.com/cheatsheet)
- [<span dir="ltr">Vyper</span> کے لیے سمارٹ کنٹریکٹ ڈیولپمنٹ فریم ورکس اور ٹولز](/developers/docs/programming-languages/python/)
- [<span dir="ltr">VyperPunk</span> - <span dir="ltr">Vyper</span> سمارٹ کنٹریکٹس کو محفوظ بنانا اور ہیک کرنا سیکھیں](https://github.com/SupremacyTeam/VyperPunk)
- [ڈیولپمنٹ کے لیے <span dir="ltr">Vyper Hub</span>](https://github.com/zcor/vyper-dev)
- [<span dir="ltr">Vyper</span> کی بہترین سمارٹ کنٹریکٹ مثالیں](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [بہترین <span dir="ltr">Vyper</span> کے منتخب کردہ وسائل](https://github.com/spadebuilders/awesome-vyper)

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

# ریفنڈ کی گئی بولیوں کا ریکارڈ رکھیں تاکہ ہم ودڈرا (withdraw) پیٹرن کی پیروی کر سکیں
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` کے ساتھ ایک سادہ نیلامی بنائیں
# سیکنڈز بولی کا وقت، جو کہ
# فائدہ اٹھانے والے کے ایڈریس `_beneficiary` کی طرف سے ہو۔
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# بھیجی گئی ویلیو کے ساتھ نیلامی پر بولی لگائیں
# جو اس ٹرانزیکشن کے ساتھ ہو۔
# ویلیو صرف اسی صورت میں ریفنڈ کی جائے گی اگر
# نیلامی جیتی نہ جائے۔
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

# پہلے سے ریفنڈ کی گئی بولی کو ودڈرا (withdraw) کریں۔ ودڈرا پیٹرن کو
# یہاں سیکیورٹی کے مسئلے سے بچنے کے لیے استعمال کیا گیا ہے۔ اگر ریفنڈز براہ راست
# bid() کے حصے کے طور پر بھیجے جاتے، تو ایک بدنیتی پر مبنی بولی لگانے والا کنٹریکٹ
# ان ریفنڈز کو بلاک کر سکتا تھا اور اس طرح نئی زیادہ بولیوں کو آنے سے روک سکتا تھا۔
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
    # 2. ایکشنز پرفارم کرنا (ممکنہ طور پر شرائط کو تبدیل کرنا)
    # 3. دوسرے کنٹریکٹس کے ساتھ تعامل کرنا
    # اگر ان مراحل کو ملا دیا جائے، تو دوسرا کنٹریکٹ
    # موجودہ کنٹریکٹ میں واپس کال کر سکتا ہے اور اسٹیٹ کو تبدیل کر سکتا ہے یا
    # اثرات (ایتھر کی ادائیگی) کو کئی بار پرفارم کرنے کا سبب بن سکتا ہے۔
    # اگر اندرونی طور پر کال کیے گئے فنکشنز میں بیرونی
    # کنٹریکٹس کے ساتھ تعامل شامل ہے، تو انہیں بھی
    # بیرونی کنٹریکٹس کے ساتھ تعامل سمجھا جانا چاہیے۔

    # 1. شرائط
    # چیک کریں کہ کیا نیلامی کے اختتام کا وقت آ گیا ہے
    assert block.timestamp >= self.auctionEnd
    # چیک کریں کہ کیا یہ فنکشن پہلے ہی کال کیا جا چکا ہے
    assert not self.ended

    # 2. اثرات
    self.ended = True

    # 3. تعامل
    send(self.beneficiary, self.highestBid)
```

یہ مثال آپ کو اندازہ دے گی کہ <span dir="ltr">Vyper</span> کنٹریکٹ کا سنٹیکس کیسا ہوتا ہے۔ فنکشنز اور ویری ایبلز کی مزید تفصیلی وضاحت کے لیے، [دستاویزات دیکھیں](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)۔

## <span dir="ltr">Yul</span> اور <span dir="ltr">Yul+</span> {#yul}

اگر آپ ایتھیریم میں نئے ہیں اور ابھی تک سمارٹ کنٹریکٹ زبانوں کے ساتھ کوئی کوڈنگ نہیں کی ہے، تو ہم <span dir="ltr">Solidity</span> یا <span dir="ltr">Vyper</span> سے شروعات کرنے کی تجویز کرتے ہیں۔ <span dir="ltr">Yul</span> یا <span dir="ltr">Yul+</span> کو تب ہی دیکھیں جب آپ سمارٹ کنٹریکٹ سیکیورٹی کے بہترین طریقوں اور <span dir="ltr">EVM</span> کے ساتھ کام کرنے کی تفصیلات سے واقف ہو جائیں۔

**<span dir="ltr">Yul</span>**

- ایتھیریم کے لیے درمیانی زبان۔
- [<span dir="ltr">EVM</span>](/developers/docs/evm) اور [<span dir="ltr">Ewasm</span>](https://github.com/ewasm) کو سپورٹ کرتی ہے، جو ایتھیریم کے انداز کی <span dir="ltr">WebAssembly</span> ہے، اور اسے دونوں پلیٹ فارمز کے قابل استعمال مشترکہ ڈینومینیٹر کے طور پر ڈیزائن کیا گیا ہے۔
- ہائی لیول آپٹیمائزیشن کے مراحل کے لیے ایک اچھا ہدف ہے جو <span dir="ltr">EVM</span> اور <span dir="ltr">Ewasm</span> دونوں پلیٹ فارمز کو یکساں طور پر فائدہ پہنچا سکتا ہے۔

**<span dir="ltr">Yul+</span>**

- <span dir="ltr">Yul</span> کی ایک لو لیول، انتہائی موثر ایکسٹینشن۔
- ابتدائی طور پر ایک [آپٹمسٹک رول اپ](/developers/docs/scaling/optimistic-rollups/) کنٹریکٹ کے لیے ڈیزائن کی گئی تھی۔
- <span dir="ltr">Yul+</span> کو <span dir="ltr">Yul</span> کے لیے ایک تجرباتی اپ گریڈ تجویز کے طور پر دیکھا جا سکتا ہے، جو اس میں نئے فیچرز کا اضافہ کرتی ہے۔

### اہم لنکس {#important-links-2}

- [<span dir="ltr">Yul</span> کی دستاویزات](https://docs.soliditylang.org/en/latest/yul.html)
- [<span dir="ltr">Yul+</span> کی دستاویزات](https://github.com/fuellabs/yulp)
- [<span dir="ltr">Yul+</span> کی تعارفی پوسٹ](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### مثال کا کنٹریکٹ {#example-contract-2}

درج ذیل سادہ مثال ایک پاور فنکشن کو نافذ کرتی ہے۔ اسے `solc --strict-assembly --bin input.yul` کا استعمال کرتے ہوئے کمپائل کیا جا سکتا ہے۔ اس مثال کو <span dir="ltr">input.yul</span> فائل میں محفوظ کیا جانا چاہیے۔

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

اگر آپ پہلے ہی سمارٹ کنٹریکٹس کا اچھا تجربہ رکھتے ہیں، تو <span dir="ltr">Yul</span> میں ایک مکمل <span dir="ltr">ERC-20</span> کا نفاذ [یہاں](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) پایا جا سکتا ہے۔

## <span dir="ltr">Fe</span> {#fe}

- ایتھیریم ورچوئل مشین (<span dir="ltr">EVM</span>) کے لیے سٹیٹیکلی ٹائپڈ زبان۔
- <span dir="ltr">Python</span> اور <span dir="ltr">Rust</span> سے متاثر۔
- اس کا مقصد سیکھنے میں آسان ہونا ہے -- یہاں تک کہ ان ڈیولپرز کے لیے بھی جو ایتھیریم ایکو سسٹم میں نئے ہیں۔
- <span dir="ltr">Fe</span> کی ڈیولپمنٹ ابھی اپنے ابتدائی مراحل میں ہے، اس زبان کا الفا ریلیز جنوری <span dir="ltr">2021</span> میں ہوا تھا۔

### اہم لنکس {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [<span dir="ltr">Fe</span> کا اعلان](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [<span dir="ltr">Fe</span> کا <span dir="ltr">2021</span> کا روڈ میپ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [<span dir="ltr">Fe</span> ڈسکارڈ چیٹ](https://discord.com/invite/ywpkAXFjZH)
- [<span dir="ltr">Fe</span> ٹوئٹر](https://twitter.com/official_fe)

### مثال کا کنٹریکٹ {#example-contract-3}

ذیل میں <span dir="ltr">Fe</span> میں نافذ کیا گیا ایک سادہ کنٹریکٹ ہے۔

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

### <span dir="ltr">Solidity</span> کے بارے میں کیا زبردست ہے؟ {#solidity-advantages}

- اگر آپ ابتدائی ہیں، تو وہاں بہت سے ٹیوٹوریلز اور سیکھنے کے ٹولز موجود ہیں۔ اس کے بارے میں مزید [کوڈنگ کے ذریعے سیکھیں](/developers/learning-tools/) سیکشن میں دیکھیں۔
- اچھے ڈیولپر ٹولز دستیاب ہیں۔
- <span dir="ltr">Solidity</span> کی ایک بڑی ڈیولپر کمیونٹی ہے، جس کا مطلب ہے کہ آپ کو اپنے سوالات کے جوابات بہت جلد ملنے کا امکان ہے۔

### <span dir="ltr">Vyper</span> کے بارے میں کیا زبردست ہے؟ {#vyper-advatages}

- ان <span dir="ltr">Python</span> ڈیولپرز کے لیے شروعات کرنے کا بہترین طریقہ جو سمارٹ کنٹریکٹس لکھنا چاہتے ہیں۔
- <span dir="ltr">Vyper</span> میں فیچرز کی تعداد کم ہے جو اسے آئیڈیاز کی فوری پروٹو ٹائپنگ کے لیے بہترین بناتی ہے۔
- <span dir="ltr">Vyper</span> کا مقصد آڈٹ کرنے میں آسان اور زیادہ سے زیادہ انسانوں کے پڑھنے کے قابل ہونا ہے۔

### <span dir="ltr">Yul</span> اور <span dir="ltr">Yul+</span> کے بارے میں کیا زبردست ہے؟ {#yul-advantages}

- سادہ اور فنکشنل لو لیول زبان۔
- خام <span dir="ltr">EVM</span> کے بہت قریب جانے کی اجازت دیتی ہے، جو آپ کے کنٹریکٹس کے گیس کے استعمال کو بہتر بنانے میں مدد کر سکتی ہے۔

## زبانوں کا موازنہ {#language-comparisons}

بنیادی سنٹیکس، کنٹریکٹ لائف سائیکل، انٹرفیسز، آپریٹرز، ڈیٹا سٹرکچرز، فنکشنز، کنٹرول فلو، اور مزید کے موازنے کے لیے [آڈٹ لیس کی یہ چیٹ شیٹ](https://reference.auditless.com/cheatsheet/) دیکھیں۔

## مزید مطالعہ {#further-reading}

- [اوپن زیپلن کی جانب سے <span dir="ltr">Solidity</span> کنٹریکٹس لائبریری](https://docs.openzeppelin.com/contracts/5.x/)
- [مثال کے ذریعے <span dir="ltr">Solidity</span>](https://solidity-by-example.org)
