---
title: ERC-721 نان فنجیبل ٹوکن اسٹینڈرڈ
description: ERC-721 کے بارے میں جانیں، جو نان فنجیبل ٹوکنز (NFTs) کے لیے ایک معیار ہے جو ایتھیریم پر منفرد ڈیجیٹل اثاثوں کی نمائندگی کرتے ہیں۔
lang: ur-in
---

## تعارف {#introduction}

**نان فنجیبل ٹوکن کیا ہے؟**

ایک نان فنجیبل ٹوکن (NFT) کسی چیز یا کسی شخص کی منفرد طریقے سے شناخت کرنے کے لیے استعمال ہوتا ہے۔ اس قسم کا ٹوکن ان پلیٹ فارمز پر استعمال کے لیے بہترین ہے جو جمع کرنے والی اشیاء، رسائی کیز، لاٹری ٹکٹ، کنسرٹ اور کھیلوں کے میچوں کے لیے نمبر والی سیٹیں وغیرہ پیش کرتے ہیں۔ اس خاص قسم کے ٹوکن میں حیرت انگیز امکانات ہیں اس لیے یہ ایک مناسب معیار کا مستحق ہے، ERC-721 اسے حل کرنے کے لیے آیا ہے!

**ERC-721 کیا ہے؟**

ERC-721 این ایف ٹی کے لیے ایک معیار متعارف کراتا ہے، دوسرے لفظوں میں، اس قسم کا ٹوکن منفرد ہوتا ہے اور اسی اسمارٹ کنٹریکٹ کے دوسرے ٹوکن سے مختلف قیمت کا ہو سکتا ہے، شاید اس کی عمر، نایابیت یا اس کے بصری جیسی کسی اور چیز کی وجہ سے۔
انتظار کرو، بصری؟

جی ہاں! تمام NFTs میں `tokenId` نامی ایک `uint256` متغیر ہوتا ہے، لہذا کسی بھی ERC-721 کنٹریکٹ کے لیے، جوڑا `contract address, uint256 tokenId` عالمی سطح پر منفرد ہونا چاہیے۔ اس نے کہا، ایک ڈی ایپ میں ایک "کنورٹر" ہوسکتا ہے جو `tokenId` کو ان پٹ کے طور پر استعمال کرتا ہے اور کسی ٹھنڈی چیز کی تصویر آؤٹ پٹ کرتا ہے، جیسے زومبیز، ہتھیار، مہارتیں یا حیرت انگیز بلیاں!

## شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts/)
- [اسمارٹ کنٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن معیارات](/developers/docs/standards/tokens/)

## باڈی {#body}

ERC-721 (ایتھیریم ریکویسٹ فار کمنٹس 721)، جسے جنوری 2018 میں ولیم اینٹریکن، ڈیٹر شرلی، جیکب ایونز، نستاسیا سیکس نے تجویز کیا تھا، ایک نان فنجیبل ٹوکن اسٹینڈرڈ ہے جو اسمارٹ کنٹریکٹس کے اندر ٹوکنز کے لیے ایک API نافذ کرتا ہے۔

یہ ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں ٹوکن منتقل کرنے، کسی اکاؤنٹ کا موجودہ ٹوکن بیلنس حاصل کرنے، کسی مخصوص ٹوکن کا مالک حاصل کرنے اور نیٹ ورک پر دستیاب ٹوکن کی کل سپلائی حاصل کرنے جیسی خصوصیات فراہم کرتا ہے۔
ان کے علاوہ اس میں کچھ دیگر خصوصیات بھی ہیں جیسے کہ یہ منظور کرنا کہ کسی اکاؤنٹ سے ٹوکن کی رقم تیسرے فریق کے اکاؤنٹ کے ذریعے منتقل کی جا سکتی ہے۔

اگر کوئی اسمارٹ کنٹریکٹ درج ذیل طریقوں اور ایونٹس کو نافذ کرتا ہے تو اسے ERC-721 نان فنجیبل ٹوکن کنٹریکٹ کہا جا سکتا ہے اور، ایک بار تعینات ہونے کے بعد، یہ ایتھیریم پر بنائے گئے ٹوکنز کا ٹریک رکھنے کا ذمہ دار ہوگا۔

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) سے:

### طریقے {#methods}

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

### ایونٹس {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### مثالیں {#web3py-example}

آئیے دیکھتے ہیں کہ ایتھیریم پر کسی بھی ERC-721 ٹوکن کنٹریکٹ کا معائنہ کرنے کے لیے چیزوں کو آسان بنانے کے لیے ایک معیار کتنا اہم ہے۔
ہمیں کسی بھی ERC-721 ٹوکن کا انٹرفیس بنانے کے لیے صرف کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) کی ضرورت ہے۔ جیسا کہ آپ
نیچے دیکھ سکتے ہیں ہم ایک آسان کردہ ABI استعمال کریں گے، تاکہ اسے ایک کم رگڑ والی مثال بنایا جا سکے۔

#### Web3.py کی مثال {#web3py-example}

سب سے پہلے، یقینی بنائیں کہ آپ نے [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python لائبریری انسٹال کر لی ہے:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # کرپٹو کٹیز کنٹریکٹ

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # کرپٹو کٹیز سیلز آکشن

# یہ ایک ERC-721 NFT کنٹریکٹ کا ایک سادہ کنٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) ہے۔
# یہ صرف طریقوں کو ظاہر کرے گا: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# منتقل شدہ کٹیز کے بارے میں معلومات حاصل کرنے کے لیے ٹرانسفر ایونٹ ABI کا استعمال۔
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# ہمیں لاگز کو فلٹر کرنے کے لیے ایونٹ کے دستخط کی ضرورت ہے۔
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# نوٹس:
#   - اگر کوئی ٹرانسفر ایونٹ واپس نہیں آتا ہے تو بلاکس کی تعداد 120 سے بڑھا دیں۔
#   - اگر آپ کو کوئی ٹرانسفر ایونٹ نہیں ملا تو آپ یہاں سے ایک ٹوکن آئی ڈی حاصل کرنے کی کوشش بھی کر سکتے ہیں:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       ایونٹ کے لاگز کو پھیلانے کے لیے کلک کریں اور اس کے "tokenId" دلیل کو کاپی کریں۔
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # اوپر دیے گئے لنک سے "tokenId" کو یہاں پیسٹ کریں۔
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties کنٹریکٹ میں معیاری ایونٹس کے علاوہ کچھ دلچسپ ایونٹس بھی ہیں۔

آئیے ان میں سے دو کو چیک کریں، `Pregnant` اور `Birth`۔

```python
# نئی کٹیز کے بارے میں معلومات حاصل کرنے کے لیے پریگننٹ اور برتھ ایونٹس ABI کا استعمال۔
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

# ہمیں لاگز کو فلٹر کرنے کے لیے ایونٹ کے دستخط کی ضرورت ہے۔
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# یہاں ایک پریگننٹ ایونٹ ہے:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# یہاں ایک برتھ ایونٹ ہے:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## مشہور NFTs {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) ٹرانسفر حجم کے لحاظ سے ایتھیریم پر سرفہرست NFT کی فہرست دیتا ہے۔
- [CryptoKitties](https://www.cryptokitties.co/) ایک ایسا گیم ہے جو افزائش کے قابل، جمع کرنے کے قابل، اور بہت ہی پیارے مخلوقات کے ارد گرد مرکوز ہے جسے ہم CryptoKitties کہتے ہیں۔
- [Sorare](https://sorare.com/) ایک عالمی فینٹسی فٹ بال گیم ہے جہاں آپ محدود ایڈیشن جمع کرنے والی اشیاء جمع کر سکتے ہیں، اپنی ٹیموں کا انتظام کر سکتے ہیں اور انعامات حاصل کرنے کے لیے مقابلہ کر سکتے ہیں۔
- [The Ethereum Name Service (ENS)](https://ens.domains/) سادہ، انسانی پڑھنے کے قابل ناموں کا استعمال کرتے ہوئے بلاک چین پر اور اس سے باہر دونوں وسائل کو ایڈریس کرنے کا ایک محفوظ اور غیر مرکزی طریقہ پیش کرتا ہے۔
- [POAP](https://poap.xyz) ان لوگوں کو مفت NFTs فراہم کرتا ہے جو ایونٹس میں شرکت کرتے ہیں یا مخصوص کارروائیاں مکمل کرتے ہیں۔ POAPs بنانے اور تقسیم کرنے کے لیے مفت ہیں۔
- [Unstoppable Domains](https://unstoppabledomains.com/) ایک سان فرانسسکو میں مقیم کمپنی ہے جو بلاک چینز پر ڈومینز بناتی ہے۔ بلاک چین ڈومینز کرپٹو کرنسی ایڈریسز کو انسانی پڑھنے کے قابل ناموں سے بدل دیتے ہیں اور سنسرشپ سے مزاحم ویب سائٹس کو فعال کرنے کے لیے استعمال کیے جا سکتے ہیں۔
- [Gods Unchained Cards](https://godsunchained.com/) ایتھیریم بلاک چین پر ایک TCG ہے جو ان گیم اثاثوں کو حقیقی ملکیت دلانے کے لیے NFT's کا استعمال کرتا ہے۔
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) 10,000 منفرد NFTs کا ایک مجموعہ ہے، جو، ثابت طور پر نایاب آرٹ کا ایک ٹکڑا ہونے کے ساتھ ساتھ، کلب کے لیے ایک رکنیت ٹوکن کے طور پر کام کرتا ہے، جو ممبر کے فوائد اور فوائد فراہم کرتا ہے جو کمیونٹی کی کوششوں کے نتیجے میں وقت کے ساتھ ساتھ بڑھتے ہیں۔

## مزید پڑھیں {#further-reading}

- [EIP-721: ERC-721 نان فنجیبل ٹوکن اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 دستاویزات](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 نفاذ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
