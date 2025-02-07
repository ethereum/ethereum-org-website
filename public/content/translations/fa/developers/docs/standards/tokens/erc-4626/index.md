---
title: ERC-4626 استاندارد خزانه توکنیزه شده
description: استانداری برای خزانه‌های سودده.
lang: fa
---

## مقدمه  {#introduction}

ERC-4626 استانداردی برای بهینه‌سازی و یکپارچه‌سازی متغیر‌های فنی خزانه‌های سودده می‌باشد. این الگو یک API (وب‌سرویس) استاندارد را برای ارتباط با خزانه‌های سودده توکنیزه شده‌ که نشانگر ارزش سهمی یک توکن ERC-20 پایه هستند، فراهم می‌کند. ERC-4626 همچنین یک افزونه‌ی اختیاری را برای خزانه‌های توکنیزه شده‌ای که از توکن‌های ERC-20 استفاده میکنند، ترسیم می‌کند که شامل عملکرد حداقلی برای سپرده‌گذاری، برداشت و نمایش موجودی توکن‌ها است.

**نقش استاندارد ERC-4626 در خزانه‌های سودده**

بازارهای وام‌دهی، گردآورندگان و توکن‌هایی که ذاتا سودده هستند، به کاربران کمک می‌کنند تا با اجرای استراتژی‌های متخلف، بهترین سود را برای توکن‌های رمزارز پیدا کنند. این استراتژی‌ها در انواع کم تفاوتی پیاده‌سازی می‌شوند که می‌تواند منجر به خطا یا هدر رفت منابع توسعه شود.

استاندارد ERC-4626 با ایجاد الگوهای پیاده‌سازی پایدار و نبوغ آمیز، باعث کاهش زحمت یکپارچه‌سازی خزانه‌های سودده خواهد شد و امکان دسترسی به قابلیت کسب سود در اپلیکیشن‌های مختلف را، با صرف کمترین دانش فنی از سوی برنامه نویسان فراهم می‌کند.

توکن ERC-4626 به طور کامل در [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) توضیح داده شده است.

## پیش نیاز ها {#prerequisites}

برای درک بهتر مطالب این صفحه، به شما پیشنهاد می‌کنیم تا ابتدا درباره‌ی [استانداردهای توکن](/developers/docs/standards/tokens/) و [ERC-20](/developers/docs/standards/tokens/erc-20/) مطالعه بفرمائید.

## توابع و ویژگی های ERC-4626: {#body}

### روشها {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

این تابع، آدرس توکن پایه را که در خزانه برای واریز، برداشت و حسابداری مورد استفاده قرار میگیرد، فراخوانی می‌کند.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

این تابع، مجموع مقدار توکن پایه را که در خزانه نگهداری می‌شود نشان می‌دهد.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

این تابع مقدار `سهمی` که خزانه در ازای مقدار `دارایی` معاوضه خواهد کرد را نشان می‌دهد.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

این تابع مقدار `سهمی` که خزانه در ازای مقدار `دارایی (توکن پایه)` معاوضه خواهد کرد را نشان می‌دهد.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

این تابع حداکثر مقدار توکن پایه قابل واریز را که می‌تواند در یک تراکنش [`deposit`](#deposit) توسط `receiver` اجرا شود، نمایش می‌دهد.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

این تابع به کاربران اجازه می‌دهد تاثیر تراکنش واریز خود را بر بلوک فعلی شبیه‌سازی کنند.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

این تابع `دارایی` یا همان توکن پایه را به خزانه واریز می‌کند و حق مالکیت `سهام (shares)` را به `گیرنده (receiver)` اعطا می‌کند.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

این تابع حداکثر مقدار سهامی که در یک تراکنش [`mint`](#mint) توسط `receiver` می‌تواند ضرب شود را نمایش می‌دهد.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

این تابع به کاربران اجازه می‌دهد تا تاثیر تراکنش ضرب دارایی خود را بر بلوک فعلی شبیه‌سازی کنند.

#### ضرب سکه {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

این تابع با واریز مقدار `assets` از توکن پایه، دقیقاً به مقدار `shares` از سهام خزانه را برای آدرس `receiver` صادر می‌کند.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

این تابع حداکثر مقدار توکن پایه که در یک تراکنش برداشت یا [`withdraw`](#withdraw) توسط `owner` می‌تواند برداشت شود را نمایش می‌دهد.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

این تابع به کاربران اجازه می‌دهد تا تاثیر تراکنش برداشت دارایی (توکن پایه) خود را بر بلوک فعلی شبیه‌سازی کنند.

#### عقب نشینی {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

این تابع مقدار `shares` یا سهام را از آدرس `owner` می‌سوزاند و دقیقاً به مقدار `assets`، توکن پایه را از خزانه به آدرس `receiver` ارسال می‌کند.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

این تابع حداکثر مقدار سهام را که از موجودی `owner`، از طریق اجرای تابع [`redeem`](#redeem) می‌توان برداشت کرد، نشان می‌دهد.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

این تابع به کاربران اجازه می‌دهد تا تأثیر تراکنش بازخرید سهام (redeem) خود را بر روی بلوک فعلی شبیه سازی نمایند.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

این تابع مقدار مشخصی از `shares` را از جانب `owner` بازخرید می‌کند و به مقدار `assets`، توکن پایه از خزانه به آدرس `receiver` ارسال می‌کند.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

مقدار مجموع سهم‌های خزانه بازخرید نشده که در گردش هستند را نشان می‌دهد.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

مقدار مجموع سهم‌های خزانه ای که `owner` در حال حاضر مالک آن‌ها می‌باشد را نشان می‌دهد.

### نقشه رابط برنامه نویسی {#mapOfTheInterface}

![نقشه رابط برنامه نویسی ERC-4626](./map-of-erc-4626.png)

### رویدادها {#events}

#### رویداد واریز

**باید** زمانی که توکن‌ها از طریق توابع [`mint`](#mint) و [`deposit`](#deposit) به درون خزانه واریز می‌شوند، اجرا شود

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

`sender` کاربری می‌باشد که مقدار `assets` را در ازای مقدار `shares` مبادله کرده و مقدار `shares` را به آدرس `owner` انتقال داده است.

#### رویداد برداشت

**باید** زمانی که سهم‌ها توسط یک سپرده گذار با استفاده از توابع [`redeem`](#redeem) یا [`withdraw`](#withdraw) برداشت می‌شوند، اجرا شود.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

`sender` کاربری می‌باشد که تراکنش برداشت را اجرا نموده و مقدار `shares` را که `owner` مالک آن بوده، در ازای مقدار `assets` مبادله کرده است. `receiver` آدرس کاربری می‌‎باشد که مقدار `asset` را دریافت کرده است.

## بیشتر بخوانید {#further-reading}

- [ERC-4626 استاندارد خزانه توکنیزه شده](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: در Repo گیت هاب](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
