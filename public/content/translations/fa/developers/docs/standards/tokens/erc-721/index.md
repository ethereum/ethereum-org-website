---
title: ERC-721 استاندارد توکن تعویض ناپذیر
description:
lang: fa
---

## معرفی {#introduction}

**توکن تعویض ناپذیر چیست؟**

از یک توکن تعویض ناپذیر (NFT) برای شناسایی چیزی یا شخصی به روشی منحصر به فرد استفاده می شود. این نوع توکن برای استفاده در پلتفرم هایی که آیتم های کلکسیونی، کلیدهای دسترسی، بلیط های بخت آزمایی، صندلی های شماره دار دارند و همچنین برای کنسرت ها و مسابقات ورزشی و غیره مناسب می باشد. این نوع خاص از توکن دارای امکانات شگفت انگیزی است، بنابراین سزاوار استانداردی مناسب است، بنابراین ERC-721 برای حل آن آمده است!

**ERC-721 چیست؟**

ERC-721 استانداردی را برای NFT معرفی می کند، به عبارت دیگر، شاید به دلیل قدمت، کمیاب بودن یا حتی چیز دیگری همچون ظاهر آن، این نوع توکن منحصر به فرد است و می تواند ارزش متفاوتی نسبت به توکن دیگری از همان قرارداد هوشمند را داشته باشد. صبر کنید، ظاهر؟

بله! همه NFT ها دارای یک متغیر `uint256` به نام `tokenId` هستند، بنابراین برای هر قرارداد ERC-721، جفت `contract address، uint256 tokenId` باید در سطح جهانی یکتا باشد. گفته می شود، یک dapp می تواند یک "مبدل" داشته باشد که از `tokenId` به عنوان ورودی استفاده می کند و تصویری از چیز جالبی مانند زامبی ها، سلاح ها، مهارت ها یا بچه گربه های شگفت انگیز را خروجی می دهد!

## پیش نیاز ها {#prerequisites}

- [حساب ها](/developers/docs/accounts/)
- [↳ قرارداد‌های هوشمند](/developers/docs/smart-contracts/)
- [استانداردهای توکن](/developers/docs/standards/tokens/)

## Body {#body}

ERC-721 (درخواست اتریوم برای نظرات 721)، که توسط ویلیام انتریکن، دیتر شرلی، جیکوب ایوانز، ناستاسیا ساکس در ژانویه 2018 پیشنهاد شد، یک استاندارد توکن تعویض ناپذیر است که یک API برای توکن‌ها در قراردادهای هوشمند پیاده‌سازی می‌کند.

این ویژگی عملکردهایی مانند انتقال توکن ها از یک حساب به حساب دیگر، دریافت موجودی رمز فعلی یک حساب، به دست آوردن صاحب یک توکن خاص و نیز کل عرضه توکن موجود در شبکه را ارائه می دهد. علاوه بر اینها، عملکردهای دیگری همچون تأیید مقدار توکنی که از یک حساب می تواند توسط یک حساب شخص ثالث منتقل شود، را نیز در خود دارد.

اگر یک قرارداد هوشمند، توابع و رویدادهای زیر را پیاده‌سازی کند، می‌توان آن را یک قرارداد توکن تعویض ناپذیر ERC-721 نامید و پس از استقرار، مسئولیت پیگیری توکن‌های ایجاد شده در اتریوم را بر عهده خواهد داشت.

از [EIP-721](https://eips.ethereum.org/EIPS/eip-721):

### روشها {#methods}

```solidity
    function balanceOf(address _owner) external view returns (uint256);
    function ownerOf(uint256 _tokenId) external view returns (address);
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;
    function approve(address _approved, uint256 _tokenId) external payable;
    function setApprovalForAll(address _operator, bool _approved) external;
    function getApproved(uint256 _tokenId) external view returns (address);
    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
```

### رویدادها {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### مثال‌ها {#web3py-example}

بیایید ببینیم یک استاندارد چقدر مهم است که کار ما را برای بررسی قراردادهای هوشمند ERC-721 آسان می‌کند. ما فقط به رابط دوتایی برنامه قرارداد (ABI) برای ایجاد یک رابط برای هر توکن ERC-721 نیاز داریم. همانطور که در زیر می بینید ما از یک ABI ساده شده استفاده می کنیم تا آن را به عنوان مثالی با اصطکاک کم تبدیل کنیم.

#### مثال Web3.py {#web3py-example}

ابتدا مطمئن شوید که کتابخانه پایتون [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) را نصب کرده اید:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties Contract

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties Sales Auction

# This is a simplified Contract Application Binary Interface (ABI) of an ERC-721 NFT Contract.
# It will expose only the methods: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
simplified_abi = [
    {
        'inputs': [{'internalType': 'address', 'name': 'owner', 'type': 'address'}],
        'name': 'balanceOf',
        'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}],
        'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'}],
        'name': 'ownerOf',
        'outputs': [{'internalType': 'address', 'name': '', 'type': 'address'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
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
    },
]

ck_extra_abi = [
    {
        'inputs': [],
        'name': 'pregnantKitties',
        'outputs': [{'name': '', 'type': 'uint256'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    },
    {
        'inputs': [{'name': '_kittyId', 'type': 'uint256'}],
        'name': 'isPregnant',
        'outputs': [{'name': '', 'type': 'bool'}],
        'payable': False, 'stateMutability': 'view', 'type': 'function', 'constant': True
    }
]

ck_contract = w3.eth.contract(address=w3.to_checksum_address(ck_token_addr), abi=simplified_abi+ck_extra_abi)
name = ck_contract.functions.name().call()
symbol = ck_contract.functions.symbol().call()
kitties_auctions = ck_contract.functions.balanceOf(acc_address).call()
print(f"{name} [{symbol}] NFTs in Auctions: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] NFTs Pregnants: {pregnant_kitties}")

# Using the Transfer Event ABI to get info about transferred Kitties.
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# We need the event's signature to filter the logs
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# Notes:
#   - Increase the number of blocks up from 120 if no Transfer event is returned.
#   - If you didn't find any Transfer event you can also try to get a tokenId at:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       Click to expand the event's logs and copy its "tokenId" argument
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # Paste the "tokenId" here from the link above
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

قرارداد CryptoKitties دارای رویدادهای جالبی به غیر از موارد استاندارد است.

بیایید دو مورد از آنها، `حامله` و `تولد` را بررسی کنیم.

```python
# Using the Pregnant and Birth Events ABI to get info about new Kitties.
ck_extra_events_abi = [
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'cooldownEndBlock', 'type': 'uint256'}],
        'name': 'Pregnant',
        'type': 'event'
    },
    {
        'anonymous': False,
        'inputs': [
            {'indexed': False, 'name': 'owner', 'type': 'address'},
            {'indexed': False, 'name': 'kittyId', 'type': 'uint256'},
            {'indexed': False, 'name': 'matronId', 'type': 'uint256'},
            {'indexed': False, 'name': 'sireId', 'type': 'uint256'},
            {'indexed': False, 'name': 'genes', 'type': 'uint256'}],
        'name': 'Birth',
        'type': 'event'
    }]

# We need the event's signature to filter the logs
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# Here is a Pregnant Event:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# Here is a Birth Event:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## NFT های محبوب {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/tokens-nft) برترین NFT در اتریوم را بر اساس حجم نقل و انتقالات فهرست می کند.
- [CryptoKitties](https://www.cryptokitties.co/) یک بازی حول موجودات قابل پرورش، کلکسیونی و بسیار شایان ستایش است که به آنها CryptoKitties می گوییم.
- [Sorare](https://sorare.com/) یک بازی فوتبال فانتزی جهانی است که در آن می‌توانید کلکسیون‌های نسخه‌های محدودی را جمع‌آوری کنید، تیم‌های خود را مدیریت کنید و برای کسب جوایز به رقابت بپردازید.
- [سرویس نام اتریوم (ENS)](https://ens.domains/) یک & روش غیرمتمرکز برای آدرس‌دهی منابع هم در داخل و هم خارج از بلاک چین با استفاده از نام‌های ساده و قابل خواندن برای انسان می باشد.
- [POAP](https://poap.xyz) NFTهای رایگان را به افرادی که در رویدادها شرکت می کنند یا اقدامات خاصی را انجام می دهند ارائه می دهد. ایجاد و توزیع POAP ها رایگان است.
- [Unstoppable Domains](https://unstoppabledomains.com/) یک شرکت مستقر در سانفرانسیسکو است که دامنه‌های خود را بر روی بلاک چین ها می سازد. دامنه‌های بلاک چین آدرس‌های ارزهای دیجیتال را با نام‌های قابل خواندن برای انسان جایگزین می‌کنند و می‌توان از آنها برای فعال کردن وب‌سایت‌های مقاوم در برابر سانسور استفاده کرد.
- [Gods Unchained Cards](https://godsunchained.com/) یک TCG در بلاک چین اتریوم است که از NFT برای ایجاد مالکیت واقعی بر دارایی‌های درون بازی استفاده می‌کند.
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) مجموعه ای از 10000 NFT منحصر به فرد است که علاوه بر اینکه یک اثر هنری نادر است، به عنوان نماد عضویت در باشگاه عمل می کند و امتیازات و مزایایی را برای اعضا فراهم می کند که در نتیجه تلاش های جامعه در طول زمان افزایش می یابد.

## بیشتر بخوانید {#further-reading}

- [EIP-721: استاندارد توکن تعویض ناپذیر ERC-721](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - مستندات ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - پیاده سازی ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
