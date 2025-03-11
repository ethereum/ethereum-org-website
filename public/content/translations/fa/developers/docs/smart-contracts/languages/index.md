---
title: زبان های قرارداد هوشمند
description: بررسی اجمالی و مقایسه دو زبان اصلی قرارداد هوشمند - Solidity و Vyper.
lang: fa
---

یکی از جنبه‌های مهم در مورد اتریوم این است که قراردادهای هوشمند می‌توانند با استفاده از زبان‌های نسبتاً مناسب برای توسعه‌دهندگان برنامه‌نویسی شوند. اگر با پایتون و یا هر [ زبان براکت کرلی](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages) دیگر تجربه دارید، می توانید یک زبان با ترکیب مشابه را پیدا کنید.

دو زبان فعال و نگهداری شده عبارتند از:

- Solidity
- Vyper

Remix IDE یک محیط توسعه جامع برای ایجاد و تست قراردادها در سالیدیتی و وایپر فراهم می‌کند. [برای شروع کدنویسی، محیط توسعه Remix IDE](https://remix.ethereum.org) درون مرورگر را امتحان کنید.

توسعه‌دهندگان با تجربه‌تر ممکن است بخواهند از Yul یک زبان میانی برای [ماشین مجازی اتریوم](/developers/docs/evm/)، یا Yul+ افزونه‌ای برای Yul استفاده کنند.

اگر کنجکاو هستید و دوست دارید زبان‌های جدیدی را آزمایش کنید که هنوز در حال توسعه هستند، می‌توانید با Fe، یک زبان قرارداد هوشمند نوظهور که در حال حاضر هنوز در مراحل ابتدایی خود است، آزمایش کنید.

## پیش‌نیازها {#prerequisites}

دانش قبلی از زبان های برنامه نویسی، به ویژه جاوا اسکریپت یا پایتون، می تواند به شما کمک کند تفاوت زبان های قرارداد هوشمند را درک کنید. ما همچنین توصیه می کنیم قبل از اینکه به مقایسه عمیق زبان‌ها بپردازید، قراردادهای هوشمند را به عنوان یک مفهوم درک کنید. معرفی [قراردادهای هوشمند](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- زبان شی‌گرا و سطح بالا برای اجرای قراردادهای هوشمند.
- زبان براکتی کرلی که عمیق‌ترین تأثیر را از C++ گرفته است.
- استاتیک تایپ (نوع متغیر در زمان کامپایل مشخص است).
- موارد زیر را پشتیبانی می‌کند:
  - ارث‌بری (شما می‌توانید دیگر قراردادها را بسط دهید).
  - کتابخانه ها (شما می توانید کدهای قابل استفاده مجدد ایجاد کنید که می توانید آنها را از قراردادهای مختلف فراخوانی کنید - مانند توابع استاتیک در یک کلاس ثابت در سایر زبان های برنامه نویسی شی گرا).
  - انواع پیچیده‌ مشخص‌شده توسط کاربر.

### پیوند های مهم {#important-links}

- [مستندات](https://docs.soliditylang.org/en/latest/)
- [پرتال زبان Solidity](https://soliditylang.org/)
- [Solidity با مثال](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [گیت هاب](https://github.com/ethereum/solidity/)
- [چت روم گیتر Solidity](https://gitter.im/ethereum/solidity) با پلی به [چت روم ماتریس Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [برگه تقلب](https://reference.auditless.com/cheatsheet)
- [وبلاگ Solidity](https://blog.soliditylang.org/)
- [توییتر Solidity](https://twitter.com/solidity_lang)

### قرارداد نمونه {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

این مثال باید به شما این حس را بدهد که سینتکس قرارداد Solidity چگونه است. برای جزئیات بیشتر در مورد توابع و متغیرها [مستندات را مشاهده کنید](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- زبان برنامه نویسی پایتونیک
- تایپ کردن قوی
- کد کامپایلر کوچک و قابل فهم
- تولید بایت کد کارآمد
- عمدا دارای ویژگی های کمتری نسبت به Solidity با هدف ایمن تر کردن قراردادها و تسهیل حسابرسی است. Vyper موارد زیر را پشتیبانی نمی کند:
  - اصلاح‌کننده‌ها
  - ارث‌بری
  - اسمبلی درخط
  - اضافه بار تابع
  - اضافه باز اپراتور
  - فراخوانی بازگشتی
  - لوپ‌های طول بی‌نهایت
  - نقاط ثابت دوتایی

برای اطلاعات بیشتر [منطق Vyper را مطالعه کنید](https://vyper.readthedocs.io/en/latest/index.html).

### لینک های مهم {#important-links-1}

- [مستندات](https://vyper.readthedocs.io)
- [Vyper با مثال](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Vyper بیشتر با مثال](https://vyper-by-example.org/)
- [گیت‌هاب](https://github.com/vyperlang/vyper)
- [انجمن چت Vyper Discord](https://discord.gg/SdvKC79cJk)
- [برگه ی تقلب](https://reference.auditless.com/cheatsheet)
- [چارچوب ها و ابزارهای توسعه قرارداد هوشمند برای Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - یاد بگیرید که قراردادهای هوشمند Vyper را ایمن و هک کنید](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - نمونه های آسیب پذیری Vyper](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub برای توسعه](https://github.com/zcor/vyper-dev)
- [نمونه‌های مهم قرارداد هوشمند Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [منابع عالی Vyper سرپرستی شده](https://github.com/spadebuilders/awesome-vyper)

### مثال {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

این مثال باید به شما این حس را بدهد که سینتکس قرارداد Vyper چگونه است. برای جزئیات بیشتر در مورد توابع و متغیرها [مستندات را مشاهده کنید](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul و +Yul {#yul}

اگر به تازگی وارد اتریوم شده اید و هنوز هیچ کدنویسی با زبان های قرارداد هوشمند انجام نداده اید، توصیه می کنیم با Solidity یا Vyper شروع کنید. فقط زمانی به Yul یا +Yul نگاه کنید که با بهترین روش‌های امنیتی قرارداد هوشمند و ویژگی‌های کار با EVM آشنا شدید.

**Yul**

- زبان میانی برای اتریوم.
- از [ماشین مجازی اتریوم](/developers/docs/evm) و [Ewasm](https://github.com/ewasm)، یک WebAssembly با طعم اتریوم، پشتیبانی می کند و طراحی شده تا مخرج مشترک قابل استفاده هر دو پلتفرم باشد.
- هدف خوبی برای مراحل بهینه‌سازی سطح بالا است که می‌تواند برای هر دو پلتفرم ماشین مجازی اتریوم و Ewasm به طور یکسان مفید باشد.

**+Yul**

- یک برنامه افزودنی سطح پایین و بسیار کارآمد برای Yul.
- در ابتدا برای یک قرارداد [رول آپ خوش بینانه](/developers/docs/scaling/optimistic-rollups/) طراحی شد.
- +Yul را می‌توان به‌عنوان پیشنهاد ارتقای آزمایشی Yul در نظر گرفت و ویژگی‌های جدیدی را به آن اضافه کرد.

### پیوند های مهم {#important-links-2}

- [مستندات Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [مستندات +Yul](https://github.com/fuellabs/yulp)
- [زمین بازی +Yul](https://yulp.fuel.sh/)
- [پست معرفی +Yul](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### قرارداد نمونه {#example-contract-2}

مثال ساده زیر یک تابع توان را پیاده‌سازی می کند. می‌تواند با استفاده از `solc --strict-assembly --bin input.yul` کامپایل شود. مثال باید در فایل input.yul ذخیره شود.

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

اگر قبلاً در قراردادهای هوشمند تجربه خوبی دارید، پیاده‌سازی کامل ERC20 در Yul را می‌توانید در [اینجا](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) پیدا کنید.

## Fe {#fe}

- زبان تایپ ایستا برای ماشین مجازی اتریوم (EVM).
- با الهام از پایتون و Rust.
- هدف این است که یادگیری آسان باشد -- حتی برای توسعه دهندگانی که به تازگی وارد اکوسیستم اتریوم شده اند.
- توسعه Fe هنوز در مراحل اولیه خود است، این زبان در ژانویه 2021 انتشار نسخه آلفای خود را داشت.

### پیوند های مهم {#important-links-3}

- [گیت‌هاب](https://github.com/ethereum/fe)
- [اطلاعیه Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [نقشه‌ی راه ۲۰۲۱ Fe](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [چت دیسکورد Fe](https://discord.com/invite/ywpkAXFjZH)
- [توییتر Fe](https://twitter.com/official_fe)

### قرارداد نمونه {#example-contract-3}

در زیر یک قرارداد ساده اجرا شده در Fe است.

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

## چگونه انتخاب کنیم {#how-to-choose}

مانند هر زبان برنامه نویسی دیگری، بیشتر در مورد انتخاب ابزار مناسب برای کار مناسب و همچنین ترجیحات شخصی است.

اگر هنوز هیچ یک از زبان ها را امتحان نکرده اید، چند نکته را در نظر بگیرید:

### چه چیز درباره‌ی Solidity عالی است؟ {#solidity-advantages}

- اگر مبتدی هستید، آموزش ها و ابزارهای یادگیری زیادی وجود دارد. در بخش [آموزش با برنامه‌نویسی](/developers/learning-tools/) اطلاعات بیشتری در مورد آن ببینید.
- ابزار توسعه دهنده خوب در دسترس است.
- Solidity یک جامعه توسعه دهندگان بزرگ دارد، به این معنی که به احتمال زیاد پاسخ سوالات خود را خیلی سریع پیدا خواهید کرد.

### چه چیز درباره‌ی Vyper عالی است؟ {#vyper-advatages}

- راه عالی برای شروع برای توسعه دهندگان پایتون که می خواهند قراردادهای هوشمند بنویسند.
- Vyper تعداد کمتری ویژگی دارد که آن را برای نمونه سازی سریع ایده ها عالی می کند.
- هدف Vyper این است که برای ممیزی آسان و برای انسان حداکثر خوانا باشد.

### چه چیزی در مورد Yul و +Yul عالی است؟ {#yul-advantages}

- زبان سطح پایین ساده و کاربردی.
- اجازه می دهد تا به EVM خام نزدیک تر شوید، که می تواند به بهینه‌سازی مصرف گاز در قراردادهای شما کمک کند.

## مقایسه‌های زبان {#language-comparisons}

برای مقایسه ترکیب اولیه، چرخه عمر قرارداد، رابط ها، عملگر ها، ساختارهای داده، توابع، جریان کنترل و موارد دیگر، این [برگه تقلب از Auditless](https://reference.auditless.com/cheatsheet/) را بررسی کنید

## اطلاعات بیشتر {#further-reading}

- [کتابخانه قراردادهای Solidity از OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity با مثال](https://solidity-by-example.org)
