---
title: "ERC-721 نان فنجیبل ٹوکن اسٹینڈرڈ"
description: "ERC-721 کے بارے میں جانیں، جو نان فنجیبل ٹوکنز (NFTs) کا معیار ہے اور Ethereum پر منفرد ڈیجیٹل اثاثوں کی نمائندگی کرتا ہے۔"
lang: ur
---

## تعارف {#introduction}

**نان فنجیبل ٹوکن کیا ہے؟**

ایک نان فنجیبل ٹوکن (NFT) کسی چیز یا شخص کو منفرد انداز میں پہچاننے کے لیے استعمال ہوتا ہے۔ اس قسم کا ٹوکن ان پلیٹ فارمز پر استعمال کے لیے بہترین ہے جو جمع کرنے والی اشیاء (collectible items)، رسائی کی چابیاں (access keys)، لاٹری ٹکٹ، کنسرٹس اور کھیلوں کے میچوں کے لیے نمبر والی نشستیں وغیرہ پیش کرتے ہیں۔ اس خاص قسم کے ٹوکن میں حیرت انگیز امکانات ہیں اس لیے یہ ایک مناسب معیار (Standard) کا حقدار ہے، ERC-721 اسی مسئلے کو حل کرنے کے لیے آیا ہے!

**ERC-721 کیا ہے؟**

ERC-721 NFT کے لیے ایک معیار متعارف کراتا ہے، دوسرے الفاظ میں، اس قسم کا ٹوکن منفرد ہوتا ہے اور ایک ہی اسمارٹ کانٹریکٹ کے دوسرے ٹوکن سے مختلف قدر رکھ سکتا ہے، شاید اس کی عمر، نایاب ہونے یا اس کی ظاہری شکل (visual) جیسی کسی اور چیز کی وجہ سے۔
رکیے، ظاہری شکل؟

جی ہاں! تمام NFTs میں ایک `uint256` متغیر (variable) ہوتا ہے جسے `tokenId` کہا جاتا ہے، لہذا کسی بھی ERC-721 کانٹریکٹ کے لیے، جوڑا `contract address, uint256 tokenId` عالمی سطح پر منفرد ہونا چاہیے۔ اس کے ساتھ، ایک dapp میں ایک "کنورٹر" ہو سکتا ہے جو `tokenId` کو ان پٹ کے طور پر استعمال کرتا ہے اور کسی زبردست چیز کی تصویر آؤٹ پٹ کرتا ہے، جیسے زومبی، ہتھیار، مہارتیں یا حیرت انگیز بلیاں!

## پیشگی شرائط {#prerequisites}

- [اکاؤنٹس](/developers/docs/accounts/)
- [اسمارٹ کانٹریکٹس](/developers/docs/smart-contracts/)
- [ٹوکن کے معیارات](/developers/docs/standards/tokens/)

## باڈی {#body}

ERC-721 ([Ethereum](/) Request for Comments 721)، جسے ولیم اینٹریکن (William Entriken)، ڈیٹر شرلی (Dieter Shirley)، جیکب ایونز (Jacob Evans)، اور نسٹاسیا سیکس (Nastassia Sachs) نے جنوری 2018 میں تجویز کیا تھا، ایک نان فنجیبل ٹوکن اسٹینڈرڈ ہے جو اسمارٹ کانٹریکٹس کے اندر ٹوکنز کے لیے ایک API نافذ کرتا ہے۔

یہ ایک اکاؤنٹ سے دوسرے اکاؤنٹ میں ٹوکن منتقل کرنے، کسی اکاؤنٹ کا موجودہ ٹوکن بیلنس حاصل کرنے، کسی مخصوص ٹوکن کے مالک کو جاننے اور نیٹ ورک پر دستیاب ٹوکن کی کل سپلائی حاصل کرنے جیسی خصوصیات فراہم کرتا ہے۔
ان کے علاوہ اس میں کچھ اور خصوصیات بھی ہیں جیسے یہ منظور کرنا کہ کسی اکاؤنٹ سے ٹوکن کی ایک مقدار کو کسی تیسرے فریق (third party) کے اکاؤنٹ کے ذریعے منتقل کیا جا سکتا ہے۔

اگر کوئی اسمارٹ کانٹریکٹ درج ذیل طریقوں (methods) اور ایونٹس (events) کو نافذ کرتا ہے تو اسے ERC-721 نان فنجیبل ٹوکن کانٹریکٹ کہا جا سکتا ہے اور، ایک بار ڈیپلائے ہونے کے بعد، یہ Ethereum پر بنائے گئے ٹوکنز کا ریکارڈ رکھنے کا ذمہ دار ہوگا۔

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) سے:

### طریقے (Methods) {#methods}

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

### ایونٹس (Events) {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### مثالیں {#web3py-example}

آئیے دیکھتے ہیں کہ Ethereum پر کسی بھی ERC-721 ٹوکن کانٹریکٹ کا معائنہ کرنے کے لیے چیزوں کو آسان بنانے میں ایک معیار (Standard) کتنا اہم ہے۔
ہمیں کسی بھی ERC-721 ٹوکن کا انٹرفیس بنانے کے لیے صرف کانٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) کی ضرورت ہے۔ جیسا کہ آپ نیچے دیکھ سکتے ہیں ہم ایک آسان ABI استعمال کریں گے، تاکہ اسے سمجھنے میں آسانی ہو۔

#### Web3.py کی مثال {#web3py-example}

سب سے پہلے، یقینی بنائیں کہ آپ نے [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) ازگر (Python) لائبریری انسٹال کر لی ہے:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" # کرپٹو کٹیز کانٹریکٹ

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C" # کرپٹو کٹیز سیلز آکشن

# یہ ایک ERC-721 NFT کانٹریکٹ کا سادہ کانٹریکٹ ایپلیکیشن بائنری انٹرفیس (ABI) ہے۔
# یہ صرف ان میتھڈز کو ظاہر کرے گا: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# منتقل شدہ کٹیز کے بارے میں معلومات حاصل کرنے کے لیے ٹرانسفر ایونٹ ABI کا استعمال کیا جا رہا ہے۔
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# ہمیں لاگز کو فلٹر کرنے کے لیے ایونٹ کے دستخط (signature) کی ضرورت ہے۔
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# نوٹس:
# - اگر کوئی ٹرانسفر ایونٹ واپس نہیں آتا ہے تو بلاکس کی تعداد 120 سے بڑھا دیں۔
# - اگر آپ کو کوئی ٹرانسفر ایونٹ نہیں ملا تو آپ یہاں سے بھی tokenId حاصل کرنے کی کوشش کر سکتے ہیں:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# ایونٹ کے لاگز کو پھیلانے کے لیے کلک کریں اور اس کا "tokenId" آرگومنٹ کاپی کریں۔
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # اوپر دیے گئے لنک سے "tokenId" یہاں پیسٹ کریں۔
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

CryptoKitties کانٹریکٹ میں معیاری ایونٹس کے علاوہ کچھ دلچسپ ایونٹس بھی ہیں۔

آئیے ان میں سے دو کو چیک کرتے ہیں، `Pregnant` اور `Birth`۔

```python
# نئی کٹیز کے بارے میں معلومات حاصل کرنے کے لیے پریگننٹ (Pregnant) اور برتھ (Birth) ایونٹس ABI کا استعمال کیا جا رہا ہے۔
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

# ہمیں لاگز کو فلٹر کرنے کے لیے ایونٹ کے دستخط (signature) کی ضرورت ہے۔
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# یہاں ایک پریگننٹ (Pregnant) ایونٹ ہے:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# یہاں ایک برتھ (Birth) ایونٹ ہے:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## مقبول NFTs {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) ٹرانسفر والیوم کے لحاظ سے Ethereum پر سرفہرست NFT کی فہرست بناتا ہے۔
- [CryptoKitties](https://www.cryptokitties.co/) ایک گیم ہے جو نسل کشی کے قابل، جمع کرنے کے قابل، اور انتہائی پیاری مخلوقات کے گرد گھومتی ہے جنہیں ہم CryptoKitties کہتے ہیں۔
- [Sorare](https://sorare.com/) ایک عالمی فینٹسی فٹ بال گیم ہے جہاں آپ محدود ایڈیشن کی جمع کرنے والی اشیاء اکٹھی کر سکتے ہیں، اپنی ٹیموں کا نظم کر سکتے ہیں اور انعامات جیتنے کے لیے مقابلہ کر سکتے ہیں۔
- [The Ethereum Name Service (ENS)](https://ens.domains/) سادہ، انسانوں کے پڑھنے کے قابل ناموں کا استعمال کرتے ہوئے بلاک چین پر اور اس سے باہر وسائل کو ایڈریس کرنے کا ایک محفوظ اور غیر مرکزی طریقہ پیش کرتا ہے۔
- [POAP](https://poap.xyz) ان لوگوں کو مفت NFTs فراہم کرتا ہے جو ایونٹس میں شرکت کرتے ہیں یا مخصوص کام مکمل کرتے ہیں۔ POAPs بنانا اور تقسیم کرنا مفت ہے۔
- [Unstoppable Domains](https://unstoppabledomains.com/) سان فرانسسکو میں قائم ایک کمپنی ہے جو بلاک چینز پر ڈومینز بناتی ہے۔ بلاک چین ڈومینز کریپٹو کرنسی ایڈریسز کو انسانوں کے پڑھنے کے قابل ناموں سے بدل دیتے ہیں اور انہیں سنسرشپ کے خلاف مزاحمت کرنے والی ویب سائٹس کو فعال کرنے کے لیے استعمال کیا جا سکتا ہے۔
- [Gods Unchained Cards](https://godsunchained.com/) Ethereum بلاک چین پر ایک TCG ہے جو ان گیم اثاثوں کی حقیقی ملکیت لانے کے لیے NFTs کا استعمال کرتا ہے۔
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) 10,000 منفرد NFTs کا مجموعہ ہے، جو کہ آرٹ کا ایک ثابت شدہ نایاب نمونہ ہونے کے ساتھ ساتھ، کلب کے ممبرشپ ٹوکن کے طور پر بھی کام کرتا ہے، جو ممبران کو مراعات اور فوائد فراہم کرتا ہے جو کمیونٹی کی کوششوں کے نتیجے میں وقت کے ساتھ بڑھتے ہیں۔

## مزید مطالعہ {#further-reading}

- [EIP-721: ERC-721 نان فنجیبل ٹوکن اسٹینڈرڈ](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 دستاویزات](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 کا نفاذ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## ٹیوٹوریلز: Ethereum پر نان فنجیبل ٹوکنز (ERC-721) کے ساتھ تعمیر کریں {#tutorials}

- [Vyper ERC-721 کانٹریکٹ واک تھرو](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyper میں لکھے گئے مکمل ERC-721 NFT کانٹریکٹ کا ایک تشریحی واک تھرو۔_
- [NFT کیسے لکھیں اور ڈیپلائے کریں (حصہ 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– اپنا پہلا ERC-721 اسمارٹ کانٹریکٹ لکھنے اور ڈیپلائے کرنے کے لیے مرحلہ وار گائیڈ۔_
- [NFT کو منٹ (Mint) کیسے کریں (حصہ 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– اپنے ڈیپلائے کیے گئے اسمارٹ کانٹریکٹ اور Web3 کا استعمال کرتے ہوئے ERC-721 NFT کو منٹ کرنے کا طریقہ۔_
- [اپنے والیٹ میں اپنا NFT کیسے دیکھیں (حصہ 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– ڈیپلائمنٹ کے بعد MetaMask میں اپنے منٹ کیے گئے NFT کو دکھانے کا طریقہ۔_
- [NFT منٹر ٹیوٹوریل](/developers/tutorials/nft-minter/) _– React فرنٹ اینڈ، MetaMask، اور Alchemy کے ساتھ ایک فل اسٹیک NFT منٹنگ dapp بنائیں۔_