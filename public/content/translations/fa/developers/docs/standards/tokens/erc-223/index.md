---
title: استاندارد توکن ERC-223
description: مروری بر استاندارد توکن تعویض پذیر ERC-223، طرز کار آن و مقایسه‌ آن با ERC-20.
lang: fa
---

## مقدمه {#introduction}

### ERC-223 چیست؟ {#what-is-erc223}

استاندارد ERC-223 همانند ERC-20، برای توکن‌های تعویض پذیر است. تفاوت کلیدی آن‌ها این است که ERC-223 علاوه بر API (رابط کاربری برنامه نویسی)، منطق انتقال توکن‌ها از فرستنده به گیرنده را نیز تعریف می‌نماید. این استاندارد یک مدل ارتباطی را معرفی می‌کند که اجازه می‌دهد انتقال توکن‌ها در طرف گیرنده انجام شود.

### تفاوت‌ها با ERC-20{#erc20-differences}

ERC-223 به یک سری از محدودیت‌های استاندارد ERC-20 پاسخ می‌دهد و شیوه‌ی جدیدی از ارتباط بین قرارداد هوشمند منبع توکن و قرارداد هوشمندی که ممکن است دریافت کننده توکن‌ها باشد را معرفی می‌کند. این‌ها برخی از مواردی هستند که با ERC-223 امکان پذیرند ولی با ERC-20 نه:

- انجام و پردازش انتقال توکن در سمت گیرنده: گیرنده‌ها می‌توانند تشخیص دهند که یک توکن ERC-223 برای آن‌ها واریز می‌شود.
- رد کردن توکن‌هایی که به درستی ارسال نشده‌اند: اگر کاربری توکن‌های ERC-223 را به قرارداد اشتباهی واریز نماید، آن قرارداد می‌تواند تراکنش را رد کند و باعث جلوگیری از دست رفتن توکن‌ها شود.
- ابرداده در تراکنش ها: توکن‌های ERC-223 می‌توانند شامل ابرداده باشند و اجازه دهند تا اطلاعات دلخواه به تراکنش توکن‌ها الصاق شود.

## پیش نیازها {#prerequisites}

- [حساب‌ها](/developers/docs/accounts)
- [قراردادهای هوشمند](/developers/docs/smart-contracts/)
- [Token standards](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## ساختار{#body}

ERC-223 یک استاندارد مخصوص توکن است که یک API برای توکن‌ها در داخل قراردادهای هوشمند پیاده‌سازی می‌کند. همچنین یک API هم برای قراردادهایی که قرار است توکن‌های ERC-223 دریافت کنند، تعریف می‌کند. قراردادهایی که از API گیرنده‌ی ERC-223 پشتیبانی نمی‌کنند، قادر نخواهند بود توکن‌های ERC-223 دریافت کنند و این باعث جلوگیری از خطای کاربر می‌شود.

اگر یک قرارداد هوشمند توابع و رویدادهایی که قرار است مطرح شوند را پیاده‌سازی نماید، می‌تواند به‌عنوان یک قرارداد توکن سازگار با ERC-223 شناخته شود. پس از استقرار، مسئولیت پیگیری توکن‌های ایجاد شده در اتریوم را بر عهده خواهد داشت.

قرارداد ملزم نیست فقط توابع و عملکرد زیر را داشته باشد و یک توسعه دهنده می‌تواند هر قابلیت دیگری را از سایر استانداردهای توکن‌ متفاوت به این قرارداد اضافه کند. برای مثال توابع `approve` (تائید) و `transferFrom` (انتقال از) جزئی از استاندارد ERC-223 نیستند، بلکه این توابع می‌توانند در صورت نیاز پیاده‌سازی شوند.

از [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### روش‌ها {#methods}

توکن ERC-223 باید روش‌های زیر را پیاده‌سازی کند:

```solidity
// تابع اسم
function name() public view returns (string)
// تابع سمبل
function symbol() public view returns (string)
// تابع اعشار
function decimals() public view returns (uint8)
// تابع عرضه کل
function totalSupply() public view returns (uint256)
// تابع موجودی (آدرس دلخواه)
function balanceOf(address _owner) public view returns (uint256 balance)
// تابع انتقال توکن
function transfer(address _to, uint256 _value) public returns (bool success)
// تابع انتقال توکن (همراه با متغیر اضافه برای انتقال داده)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

قراردادی که قصد دارد توکن‌های ERC-223 دریافت کند، باید روش زیر را پیاده‌سازی کند:

```solidity
// تابع قلاب دریافت توکن برای پیاده‌سازی توسط قرارداد هوشمند
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

اگر توکن‌های ERC-223 به قراردادی ارسال شوند که تابع `tokenReceived(..)` را پیاده‌سازی نکرده باشد، تراکنش باید شکست بخورد و توکن‌ها نباید از موجودی فرستنده منتقل شوند.

### رویدادها {#events}

```solidity
// رویداد انتقال
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### مثال‌ها {#examples}

رابط برنامه‌نویسی (API) توکن ERC-223 مشابه ERC-20 می‌باشد، بنابراین از نظر توسعه فرانت-اند هیچ تفاوتی ایجاد نمی‌شود. تنها تفاوت این است که احتمال دارد توکن ERC-223 توابع `approve` + `transferFrom` را نداشته باشد، چرا که آنها در این استاندارد اختیاری هستند.

#### مثال‌های Solidity{#solidity-example}

مثال‌های زیر نشان می‌دهد که چگونه یک قرارداد ساده و اولیه توکن ERC-223 عمل می‌کند:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

حال ما به یک قرارداد دیگر نیاز داریم تا واریز `tokenA` را بپذیرد، با فرض اینکه توکن A یک توکن ERC-223 است. این قرارداد باید فقط توکن A را بپذیرد و هر توکن دیگری را رد کند. زمانی که قرارداد توکن A را دریافت می‌کند، باید یک رویداد `Deposit()` را اطلاع رسانی کند و مقدار متغیر داخلی `deposits` را افزایش دهد.

کد مذکور به این شکل است:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## سوالات متداول {#faq}

### اگر مقداری از توکن B به قرارداد بفرستیم، چه اتفاقی خواهد افتاد؟ {#sending-tokens}

تراکنش شکست خواهد خورد و انتقال توکن‌ها انجام نخواهد شد. توکن‌ها به آدرس فرستنده بازگشت داده خواهند شد.

### چگونه می‌توانیم به این قرارداد واریز انجام دهیم؟ {#contract-deposits}

تابع `transfer(address,uint256)` یا `transfer(address,uint256,bytes)` از توکن ERC-223 را با مشخص کردن آدرس `RecipientContract`، فراخوانی کنید.

### اگر یک توکن ERC-20 را به این قرارداد ارسال کنیم، چه اتفاقی خواهد افتاد؟ {#erc-20-transfers}

اگر یک توکن ERC-20 به `RecipientContract` ارسال کنیم، توکن‌ها انتقال خواهند یافت اما این انتقال شناسایی نخواهد شد (هیچ رویداد `Deposit()` اجرا نخواهد شد و مقدار واریزی‌ها تغییر نخواهد کرد). از واریزهای ERC-20 ناخواسته نمی‌توان جلوگیری کرد.

### چه می‌شود اگر بخواهیم پس از تکمیل انتقال توکن، تابع دیگری را اجرا کنیم؟ {#function-execution}

برای انجام دادن این کار راه‌های مختلف وجود دارد. در این مثال ما روشی را دنبال خواهیم کرد که باعث می‌شود انتقال ERC-223 مشابه انتقال اتر شود:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

هنگامی که `RecipientContract` یک توکن ERC-223 را دریافت می‌کند، درست همانطور که تراکنش‌های ارسال اتر فراخوانی توابع را بعنوان `data` در تراکنش کدنگاری می‌کنند، قرارداد نیز تابعی را که به عنوان متغیر `_data` در تراکنش توکن کدنگاری شده است اجرا خواهد کرد. برای اطلاعات بیشتر [دیتا فیلد](https://ethereum.org/en/developers/docs/transactions/#the-data-field) را مطالعه فرمائید.

در مثال بالا، توکن ERC-223 باید با استفاده از تابع `transfer(address,uin256,bytes calldata _data)` به آدرس `RecipientContract` انتقال یابد. اگر مقدار پارامتر دیتا `0xc2985578` باشد (معادل امضاء تابع `foo()`)، بعد از دریافت توکن واریزی و اجراء رویداد Foo()، تابع foo() اجرا خواهد شد.

پارامترها (متغیرهای ورودی) نیز می‌توانند در `data` انتقال توکن کدنگاری شوند، برای مثال ما میتوانیم تابع bar() را با مقدار 12345 برای `_someNumber` اجرا کنیم. در این حالت مقدار `data` باید
`0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` باشد به شکلی که
`0x0423a132` امضاء تابع `bar(uint256)` است و
`00000000000000000000000000000000000000000000000000000000000004d2` همان 12345 است در قالب uint256.

## محدودیت‌ها {#limitations}

در حالی که ERC-223 به چندین مشکل پیدا شده در استاندارد ERC-20 می‌پردازد، خودش محدودیت‌های خاص خود را دارد:

- پذیرش و سازگاری: ERC-223 هنوز به صورت فراگیر پذیرفته و پیاده‌سازی نشده است که باعث محدود شدن سازگاری آن با ابزارها و پلتفرم‌های موجود می‌شود.
- پیش سازگاری: ERC-223 با ERC-20 پیش سازگار نیست، یعنی قراردادها و ابزارهای موجود برای ERC-20، باید برای کار کردن با ERC-223 اصلاح شوند.
- هزینه گاز: بررسی‌ها و عملکردهای اضافه در تراکنش‌های انتقال ERC-223 می‌توانند منجر به هزینه‌های گاز بیشتر در مقایسه با تراکنش‌های ERC-20 شوند.

## ادامه مطلب {#further-reading}

- [EIP-223: استاندارد توکن ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [پیشنهاد اولیه ERC-223](https://github.com/ethereum/eips/issues/223)
