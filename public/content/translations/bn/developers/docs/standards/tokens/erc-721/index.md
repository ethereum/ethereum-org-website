---
title: "ERC-721 নন-ফাঞ্জিবল টোকেন স্ট্যান্ডার্ড"
description: "ERC-721 সম্পর্কে জানুন, ইথেরিয়ামে অনন্য ডিজিটাল সম্পদের প্রতিনিধিত্বকারী নন-ফাঞ্জিবল টোকেন (NFTs)-এর জন্য একটি স্ট্যান্ডার্ড।"
lang: bn
---

## ভূমিকা {#introduction}

**নন-ফাঞ্জিবল টোকেন কী?**

একটি নন-ফাঞ্জিবল টোকেন (NFT) কোনো কিছু বা কাউকে একটি অনন্য উপায়ে শনাক্ত করতে ব্যবহৃত হয়। এই ধরনের টোকেন এমন প্ল্যাটফর্মে ব্যবহারের জন্য উপযুক্ত যা সংগ্রহযোগ্য আইটেম, অ্যাক্সেস কী, লটারির টিকিট, কনসার্ট এবং
খেলার ম্যাচের জন্য সংখ্যাযুক্ত আসন ইত্যাদি অফার করে। এই বিশেষ ধরনের টোকেনের অসাধারণ সম্ভাবনা রয়েছে তাই এর জন্য একটি সঠিক স্ট্যান্ডার্ড প্রয়োজন, ERC-721
সেই সমাধান নিয়ে এসেছে!

**ERC-721 কী?**

ERC-721, NFT-এর জন্য একটি স্ট্যান্ডার্ড চালু করে, অন্য কথায়, এই ধরনের টোকেন অনন্য এবং একই স্মার্ট কন্ট্র্যাক্ট থেকে অন্য টোকেনের চেয়ে ভিন্ন মান
থাকতে পারে, সম্ভবত এর বয়স, বিরলতা বা এমনকি এর ভিজ্যুয়ালের মতো অন্য কিছুর কারণে।
অপেক্ষা করুন, ভিজ্যুয়াল?

হ্যাঁ! সমস্ত NFT-এর `tokenId` নামক একটি `uint256` ভেরিয়েবল আছে, তাই যেকোনো ERC-721 কন্ট্র্যাক্টের জন্য, `contract address, uint256 tokenId` জোড়াটি
বিশ্বব্যাপী অনন্য হতে হবে। বলা বাহুল্য, একটি dapp-এর একটি "কনভার্টার" থাকতে পারে যা
ইনপুট হিসাবে `tokenId` ব্যবহার করে এবং জম্বি, অস্ত্র, দক্ষতা বা আশ্চর্যজনক কিটিদের মতো দুর্দান্ত কিছুর একটি চিত্র আউটপুট করে!

## পূর্বশর্ত {#prerequisites}

- [অ্যাকাউন্ট](/developers/docs/accounts/)
- [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/)
- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)

## বডি {#body}

ERC-721 (Ethereum Request for Comments 721), যা উইলিয়াম এন্টিকেন, ডিটার শার্লি, জ্যাকব ইভান্স,
নাস্টাসিয়া শ্যাক্স দ্বারা জানুয়ারী 2018-এ প্রস্তাবিত, এটি একটি নন-ফাঞ্জিবল টোকেন স্ট্যান্ডার্ড যা স্মার্ট কন্ট্র্যাক্টের মধ্যে টোকেনগুলির জন্য একটি API প্রয়োগ করে।

এটি একটি অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে টোকেন স্থানান্তর করা, একটি অ্যাকাউন্টের বর্তমান টোকেন ব্যালেন্স
পাওয়া, একটি নির্দিষ্ট টোকেনের মালিক কে তা জানা এবং নেটওয়ার্কে উপলব্ধ টোকেনের মোট সরবরাহ জানার মতো কার্যকারিতা প্রদান করে।
এগুলি ছাড়াও, এটিতে আরও কিছু কার্যকারিতা রয়েছে, যেমন কোনও অ্যাকাউন্ট থেকে একটি নির্দিষ্ট পরিমাণ টোকেন একটি তৃতীয় পক্ষের অ্যাকাউন্টের দ্বারা
স্থানান্তর করার অনুমোদন দেওয়া।

যদি একটি স্মার্ট কন্ট্র্যাক্ট নিম্নলিখিত পদ্ধতি এবং ইভেন্টগুলি প্রয়োগ করে তবে এটিকে একটি ERC-721 নন-ফাঞ্জিবল টোকেন কন্ট্র্যাক্ট বলা যেতে পারে
এবং, একবার ডিপ্লয় করা হলে, এটি ইথেরিয়ামে তৈরি টোকেনগুলির ট্র্যাক রাখার জন্য দায়ী থাকবে।

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) থেকে:

### মেথড {#methods}

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

### ইভেন্ট {#events}

```solidity
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
```

### উদাহরণ {#web3py-example}

আসুন দেখি কীভাবে একটি স্ট্যান্ডার্ড ইথেরিয়ামের যেকোনো ERC-721 টোকেন কন্ট্র্যাক্ট পরীক্ষা করার জন্য আমাদের জন্য জিনিসগুলিকে সহজ করে তোলে।
যেকোনো ERC-721 টোকেনের একটি ইন্টারফেস তৈরি করতে আমাদের শুধুমাত্র কন্ট্র্যাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) প্রয়োজন। যেমন আপনি নিচে
দেখতে পাচ্ছেন, এটিকে একটি ঝামেলাহীন উদাহরণ তৈরি করতে আমরা একটি সরলীকৃত ABI ব্যবহার করব।

#### Web3.py উদাহরণ {#web3py-example}

প্রথমে, নিশ্চিত করুন যে আপনি [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) পাইথন লাইব্রেরিটি ইনস্টল করেছেন:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"    # CryptoKitties কন্ট্র্যাক্ট

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C"      # CryptoKitties সেলস অকশন

# এটি একটি ERC-721 NFT কন্ট্র্যাক্টের একটি সরলীকৃত কন্ট্র্যাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)।
# এটি শুধুমাত্র এই পদ্ধতিগুলিকে প্রকাশ করবে: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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
print(f"{name} [{symbol}] অকশনে থাকা NFTs: {kitties_auctions}")

pregnant_kitties = ck_contract.functions.pregnantKitties().call()
print(f"{name} [{symbol}] গর্ভবতী NFTs: {pregnant_kitties}")

# স্থানান্তরিত কিটিদের সম্পর্কে তথ্য পেতে ট্রান্সফার ইভেন্ট ABI ব্যবহার করে।
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# লগগুলি ফিল্টার করার জন্য আমাদের ইভেন্টের স্বাক্ষর প্রয়োজন
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# নোট:
#   - যদি কোনো ট্রান্সফার ইভেন্ট ফেরত না আসে তাহলে ব্লকের সংখ্যা 120 থেকে বাড়ান।
#   - আপনি যদি কোনো ট্রান্সফার ইভেন্ট খুঁজে না পান তাহলে আপনি এখানে একটি টোকেনআইডি পাওয়ার চেষ্টাও করতে পারেন:
#       https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
#       ইভেন্টের লগগুলি প্রসারিত করতে ক্লিক করুন এবং এর "tokenId" আর্গুমেন্টটি কপি করুন
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # উপরের লিঙ্ক থেকে "tokenId" এখানে পেস্ট করুন
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} গর্ভবতী: {is_pregnant}")
```

CryptoKitties কন্ট্র্যাক্টে স্ট্যান্ডার্ড ইভেন্টগুলি ছাড়াও কিছু আকর্ষণীয় ইভেন্ট রয়েছে।

আসুন তাদের মধ্যে দুটি পরীক্ষা করি, `Pregnant` এবং `Birth`।

```python
# নতুন কিটিদের সম্পর্কে তথ্য পেতে Pregnant এবং Birth ইভেন্টের ABI ব্যবহার করে।
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

# লগগুলি ফিল্টার করার জন্য আমাদের ইভেন্টের স্বাক্ষর প্রয়োজন
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# এখানে একটি Pregnant ইভেন্ট রয়েছে:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# এখানে একটি Birth ইভেন্ট রয়েছে:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## জনপ্রিয় NFT {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) স্থানান্তরের ভলিউম অনুসারে ইথেরিয়ামের শীর্ষস্থানীয় NFT-এর তালিকা করে।
- [CryptoKitties](https://www.cryptokitties.co/) হল প্রজননযোগ্য, সংগ্রহযোগ্য এবং অত্যন্ত আরাধ্য প্রাণীদের কেন্দ্র করে একটি গেম,
  যাদের আমরা CryptoKitties বলি।
- [Sorare](https://sorare.com/) একটি বিশ্বব্যাপী ফ্যান্টাসি ফুটবল খেলা যেখানে আপনি সীমিত সংস্করণের সংগ্রহযোগ্য জিনিস সংগ্রহ করতে পারেন,
  আপনার দল পরিচালনা করতে পারেন এবং পুরস্কার অর্জনের জন্য প্রতিযোগিতা করতে পারেন।
- [The Ethereum Name Service (ENS)](https://ens.domains/) সহজ, মানুষের পাঠযোগ্য নাম ব্যবহার করে ব্লকচেইনের
  ভিতরে এবং বাইরে উভয় রিসোর্স অ্যাড্রেস করার জন্য একটি নিরাপদ ও বিকেন্দ্রীভূত উপায় অফার করে।
- [POAP](https://poap.xyz) যারা ইভেন্টে যোগ দেয় বা নির্দিষ্ট কাজ সম্পন্ন করে তাদের বিনামূল্যে NFT সরবরাহ করে। POAP তৈরি এবং বিতরণ করা বিনামূল্যে।
- [Unstoppable Domains](https://unstoppabledomains.com/) হল একটি সান ফ্রান্সিসকো-ভিত্তিক কোম্পানি যা
  ব্লকচেইনে ডোমেইন তৈরি করে। ব্লকচেইন ডোমেইনগুলি ক্রিপ্টোকারেন্সি অ্যাড্রেসগুলিকে মানুষের পাঠযোগ্য নাম দিয়ে প্রতিস্থাপন করে এবং সেন্সরশিপ-প্রতিরোধী ওয়েবসাইটগুলিকে
  সক্ষম করতে ব্যবহার করা যেতে পারে।
- [Gods Unchained Cards](https://godsunchained.com/) হল Ethereum ব্লকচেইনের একটি TCG যা ইন-গেম অ্যাসেটগুলিতে প্রকৃত মালিকানা আনতে
  NFT ব্যবহার করে।
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) হলো ১০,০০০টি অনন্য NFT-এর একটি সংগ্রহ, যা একটি প্রমাণযোগ্য-বিরল শিল্পকর্ম হওয়ার পাশাপাশি ক্লাবের সদস্যপদ টোকেন হিসেবে কাজ করে, যা সদস্যদের জন্য বিভিন্ন সুযোগ-সুবিধা প্রদান করে এবং সম্প্রদায়ের প্রচেষ্টার ফলে সময়ের সাথে সাথে এর সুবিধা বাড়তে থাকে।

## আরও পড়ুন {#further-reading}

- [EIP-721: ERC-721 নন-ফাঞ্জিবল টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 ডকস](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 ইমপ্লিমেন্টেশন](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
