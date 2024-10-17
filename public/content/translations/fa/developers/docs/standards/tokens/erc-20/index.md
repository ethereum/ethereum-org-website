---
title: استاندارد توکن ERC-20
description:
lang: fa
---

## معرفی {#introduction}

**توکن چیست؟**

توکن ها میتوانند هرچیزی را بصورت مجازی در اتریوم ارائه دهند:

- امتیاز شهرت در یک پلتفرم آنلاین
- مهارت های یک کاراکتر در یک بازی
- دارایی های اقتصادی مانند سهام یک شرکت
- یک ارز فیات مانند دلار
- یک اونس طلا
- و موارد دیگر...

این نوع ویژگی قدرتمند اتریوم باید با یک استاندارد قوی اداره شود، اینطور نیست؟ این دقیقا همان جایی است که ERC-20 نقش خودش را اجرا میکند! این استانداردها به توسعه دهندگان این امکان را می دهد تا توکن اپلیکیشن هایی که با سایر محصولات و خدمات سازگار هستند را بسازند. همچنین این استاندارد عملکرد اضافه‌تری را برای اتر (واحد ارز داخلی اتریم یا ETH) فراهم می‌کند.

**ERC-20 چیست؟**

ERC-20 استانداردی را برای توکن‌های تعویض پذیر معرفی می کند، به عبارت دیگر، آنها دارای خاصیتی هستند که باعث می شود هر توکن دقیقاً مشابه (از نظر نوع و مقدار) با توکن دیگر باشد. برای مثال توکن های ERC-20 دقیقا مثل اتر رفتار میکنند. به این معنی که 1 توکن همیشه با دیگر توکن ها برابر بوده و خواهد بود.

## پیش نیاز ها {#prerequisites}

- [حساب ها](/developers/docs/accounts)
- [قرارداد‌های هوشمند](/developers/docs/smart-contracts/)
- [استانداردهای توکن](/developers/docs/standards/tokens/)

## ساختار {#body}

مفهوم توکن ERC-20 یا درخواست اتریوم برای نظرات 20 توسط فابیان ووگلستلر در نوامبر 2015 به عنوان استاندارد توکنی بیان شد که یک API برای توکن های قراردادهای هوشمند ارایه میکند.

نمونه هایی از عملکردهای ERC-20 عبارتند از:

- انتقال توکن ها از یک حساب به حساب دیگر
- دریافت موجودی توکن یک حساب
- دریافت کل عرضه توکن موجود در شبکه
- تایید این که آیا مقداری توکن از یک حساب می‌تواند توسط یک حساب شخص ثالث خرج شود یا خیر

اگر یک قرارداد هوشمند روش‌ها و رویدادهای زیر را اجرا کند، می‌توان آن را یک قرارداد توکن تعویض ناپذیر ERC-20 نامید و پس از استقرار، مسئولیت پیگیری توکن‌های ایجاد شده در اتریوم را بر عهده خواهد داشت.

از [EIP-20](https://eips.ethereum.org/EIPS/eip-20):

### روشها {#methods}

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)
```

### رویدادها {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### مثال‌ها {#web3py-example}

بیایید ببینیم سادگی یک استاندارد چقدر مهم است تا باعث شود هر گونه قرارداد توکن ERC-20 را در اتریوم بازرسی کنیم. ما برای ایجاد یک رابط در هر توکن ERC-20، فقط به رابط دوتایی برنامه قرارداد (ABI) نیاز داریم. همانطور که در زیر می بینید ما از یک ABI ساده شده استفاده می کنیم تا آن را به مثال قابل هضمی تبدیل کنیم.

#### مثال Web3.py {#web3py-example}

ابتدا مطمئن شوید که کتابخانه پایتون [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) را نصب کرده اید:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # Wrapped ether (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-20 Token Contract.
# It will expose only the methods: balanceOf(address), decimals(), symbol() and totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'account', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'decimals',
        'outputs': [{'internalType': 'uint8', 'name': '', 'type': 'uint8'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

dai_contract = w3.eth.contract(address=w3.to_checksum_address(dai_token_addr), abi=simplified_abi)
symbol = dai_contract.functions.symbol().call()
decimals = dai_contract.functions.decimals().call()
totalSupply = dai_contract.functions.totalSupply().call() / 10**decimals
addr_balance = dai_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  DAI
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("Total Supply:", totalSupply)
print("Addr Balance:", addr_balance)
```

## مشکلات شناخته شده {#erc20-issues}

### مشکل دریافت توکن ERC-20 {#reception-issue}

هنگامی که توکن‌های ERC-20 به یک قرارداد هوشمند ارسال می‌شوند که برای مدیریت توکن‌های ERC-20 طراحی نشده است، توکن‌ها برای همیشه از دست خواهند رفت. این زمانی اتفاق می‌افتد که قرارداد هوشمند گیرنده، عملکرد لازم برای شناسایی یا پاسخ به توکن‌های دریافتی را ندارد و هیچ مکانیزمی در استاندارد ERC-20 وجود ندارد که قرارداد دریافت کننده را از توکن‌های دریافتی مطلع کند. راه‌های اصلی شکل‌گیری این موضوع:

1.  مکانیسم انتقال توکن
  - توکن‌های ERC-20 با استفاده از تابع transfer یا transferFrom انتقال می‌یابند
    -   هنگامی که کاربر با استفاده از این توابع، توکن‌ها را به آدرس یک قرارداد هوشمند ارسال می‌کند، توکن‌ها بدون در نظر گرفتن این که آیا قرارداد دریافت کننده برای رسیدگی به آن‌ها طراحی شده است یا خیر، انتقال خواهند یافت
2.  عدم اطلاع رسانی
    -   قرارداد دریافت‌کننده اعلان یا تماسی مبنی بر ارسال توکن به آن دریافت نمی‌کند
    -   اگر قرارداد دریافت‌کننده مکانیزمی برای مدیریت توکن‌ها نداشته باشد (به عنوان مثال، یک تابع بازگشتی یا یک تابع اختصاصی برای مدیریت دریافت توکن)، توکن‌ها به طور مؤثر در آدرس قرارداد گیر می‌کنند
3.  بدون مدیریت داخلی
    -   استاندارد ERC-20 دارای یک تابع اجباری برای اجرای دریافت قراردادها نیست، که این امر منجر به وضعیتی می‌شود که بسیاری از قراردادها قادر به مدیریت صحیح توکن‌های دریافتی نیستند

برخی استانداردهای جایگزین بر این مشکل فائق آمده‌اند، مانند [ERC-223](/developers/docs/standards/tokens/erc-223)

## اطلاعات بیشتر {#further-reading}

- [EIP-20: استاندارد توکن ERC-20](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - توکن ها](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - پیاده‌سازی ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - راهنمایی برای توکن‌های ERC-20 نوشته شده با Solidity](https://www.alchemy.com/overviews/erc20-solidity)


## سایر استانداردهای توکن قابل تعویض {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - خزانه‌های توکنیزه شده](/developers/docs/standards/tokens/erc-4626)