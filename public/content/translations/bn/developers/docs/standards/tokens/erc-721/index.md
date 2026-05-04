---
title: "ERC-721 নন-ফান্জেবল টোকেন স্ট্যান্ডার্ড"
description: "ERC-721 সম্পর্কে জানুন, যা ইথিরিয়ামে অনন্য ডিজিটাল সম্পদের প্রতিনিধিত্বকারী নন-ফান্জেবল টোকেন (NFTs)-এর স্ট্যান্ডার্ড।"
lang: bn
---

## ভূমিকা {#introduction}

**নন-ফান্জেবল টোকেন কী?**

একটি নন-ফান্জেবল টোকেন (NFT) কোনো কিছু বা কাউকে অনন্য উপায়ে শনাক্ত করতে ব্যবহৃত হয়। এই ধরনের টোকেন এমন প্ল্যাটফর্মগুলোতে ব্যবহারের জন্য উপযুক্ত যা সংগ্রহযোগ্য আইটেম, অ্যাক্সেস কী, লটারির টিকিট, কনসার্ট এবং স্পোর্টস ম্যাচের জন্য নম্বরযুক্ত আসন ইত্যাদি অফার করে। এই বিশেষ ধরনের টোকেনের আশ্চর্যজনক সম্ভাবনা রয়েছে, তাই এর একটি সঠিক স্ট্যান্ডার্ড থাকা প্রাপ্য, আর ERC-721 সেই সমস্যার সমাধান নিয়ে এসেছে!

**ERC-721 কী?**

ERC-721 NFT-এর জন্য একটি স্ট্যান্ডার্ড প্রবর্তন করে, অন্য কথায়, এই ধরনের টোকেন অনন্য এবং একই স্মার্ট কন্ট্রাক্ট থেকে আসা অন্য টোকেনের চেয়ে এর মান ভিন্ন হতে পারে, হতে পারে এর বয়স, বিরলতা বা এমনকি এর ভিজ্যুয়ালের মতো অন্য কিছুর কারণে। একটু দাঁড়ান, ভিজ্যুয়াল?

হ্যাঁ! সমস্ত NFT-তে `tokenId` নামক একটি `uint256` ভেরিয়েবল থাকে, তাই যেকোনো ERC-721 কন্ট্রাক্টের জন্য, `contract address, uint256 tokenId` জোড়াটি বিশ্বব্যাপী অনন্য হতে হবে। বলা যায়, একটি ডিএ্যাপ-এ এমন একটি "কনভার্টার" থাকতে পারে যা `tokenId`-কে ইনপুট হিসেবে ব্যবহার করে এবং জম্বি, অস্ত্র, দক্ষতা বা চমৎকার বিড়ালছানার মতো দারুণ কিছুর ছবি আউটপুট হিসেবে দেয়!

## পূর্বশর্ত {#prerequisites}

- [একাউন্ট](/developers/docs/accounts/)
- [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/)
- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)

## মূল অংশ {#body}

ERC-721 ([Ethereum](/) Request for Comments 721), যা 2018 সালের জানুয়ারিতে উইলিয়াম এন্ট্রিকেন, ডিটার শার্লি, জ্যাকব ইভান্স এবং নাস্তাসিয়া শ্যাক্স দ্বারা প্রস্তাবিত হয়েছিল, এটি একটি নন-ফান্জেবল টোকেন স্ট্যান্ডার্ড যা স্মার্ট কন্ট্রাক্ট-এর মধ্যে টোকেনগুলোর জন্য একটি API বাস্তবায়ন করে।

এটি এক একাউন্ট থেকে অন্য একাউন্টে টোকেন স্থানান্তর করা, একটি একাউন্টের বর্তমান টোকেন ব্যালেন্স জানা, একটি নির্দিষ্ট টোকেনের মালিককে খুঁজে বের করা এবং নেটওয়ার্ক-এ উপলব্ধ টোকেনের মোট সরবরাহ জানার মতো কার্যকারিতা প্রদান করে। এগুলোর পাশাপাশি এর আরও কিছু কার্যকারিতা রয়েছে, যেমন একটি একাউন্ট থেকে নির্দিষ্ট পরিমাণ টোকেন তৃতীয় পক্ষের একাউন্ট দ্বারা সরানো যেতে পারে তা অনুমোদন করা।

যদি একটি স্মার্ট কন্ট্রাক্ট নিচের মেথড এবং ইভেন্টগুলো বাস্তবায়ন করে, তবে এটিকে একটি ERC-721 নন-ফান্জেবল টোকেন কন্ট্রাক্ট বলা যেতে পারে এবং একবার ডিপ্লয় করা হলে, এটি ইথিরিয়ামে তৈরি করা টোকেনগুলোর ট্র্যাক রাখার জন্য দায়ী থাকবে।

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

আসুন দেখি ইথিরিয়ামে যেকোনো ERC-721 টোকেন কন্ট্রাক্ট পরিদর্শন করা আমাদের জন্য সহজ করতে একটি স্ট্যান্ডার্ড কতটা গুরুত্বপূর্ণ। যেকোনো ERC-721 টোকেনের জন্য একটি ইন্টারফেস তৈরি করতে আমাদের শুধু কন্ট্রাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) প্রয়োজন। নিচে দেখতে পাবেন যে আমরা একটি সরলীকৃত ABI ব্যবহার করব, যাতে এটি সহজে বোঝা যায় এমন একটি উদাহরণ হয়।

#### Web3.py উদাহরণ {#web3py-example}

প্রথমে, নিশ্চিত করুন যে আপনি [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) পাইথন লাইব্রেরি ইনস্টল করেছেন:

```
pip install web3
```

```python
from web3 import Web3
from web3._utils.events import get_event_data


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

ck_token_addr = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d" # ক্রিপ্টোকিটিজ কন্ট্রাক্ট

acc_address = "0xb1690C08E213a35Ed9bAb7B318DE14420FB57d8C" # ক্রিপ্টোকিটিজ বিক্রির নিলাম

# এটি একটি ERC-721 NFT কন্ট্রাক্টের সরলীকৃত কন্ট্রাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)।
# এটি শুধুমাত্র এই মেথডগুলো প্রকাশ করবে: balanceOf(address), name(), ownerOf(tokenId), symbol(), totalSupply()
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

# ট্রান্সফার হওয়া কিটিজ সম্পর্কে তথ্য পেতে ট্রান্সফার ইভেন্ট ABI ব্যবহার করা হচ্ছে।
tx_event_abi = {
    'anonymous': False,
    'inputs': [
        {'indexed': False, 'name': 'from', 'type': 'address'},
        {'indexed': False, 'name': 'to', 'type': 'address'},
        {'indexed': False, 'name': 'tokenId', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}

# লগগুলো ফিল্টার করার জন্য আমাদের ইভেন্টের সিগনেচার প্রয়োজন
event_signature = w3.keccak(text="Transfer(address,address,uint256)").hex()

logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [event_signature]
})

# দ্রষ্টব্য:
# - যদি কোনো ট্রান্সফার ইভেন্ট না পাওয়া যায়, তবে ব্লকের সংখ্যা ১২০ থেকে বাড়িয়ে দিন।
# - যদি আপনি কোনো ট্রান্সফার ইভেন্ট খুঁজে না পান, তবে আপনি এখান থেকেও একটি tokenId পাওয়ার চেষ্টা করতে পারেন:
# https://etherscan.io/address/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d#events
# ইভেন্টের লগগুলো প্রসারিত করতে ক্লিক করুন এবং এর "tokenId" আর্গুমেন্টটি কপি করুন
recent_tx = [get_event_data(w3.codec, tx_event_abi, log)["args"] for log in logs]

if recent_tx:
    kitty_id = recent_tx[0]['tokenId'] # উপরের লিংক থেকে "tokenId" এখানে পেস্ট করুন
    is_pregnant = ck_contract.functions.isPregnant(kitty_id).call()
    print(f"{name} [{symbol}] NFTs {kitty_id} is pregnant: {is_pregnant}")
```

ক্রিপ্টোকিটিজ (CryptoKitties) কন্ট্রাক্টে স্ট্যান্ডার্ড ইভেন্টগুলো ছাড়াও কিছু আকর্ষণীয় ইভেন্ট রয়েছে।

আসুন সেগুলোর মধ্যে দুটি পরীক্ষা করে দেখি, `Pregnant` এবং `Birth`।

```python
# নতুন কিটিজ সম্পর্কে তথ্য পেতে প্রেগন্যান্ট এবং বার্থ ইভেন্ট ABI ব্যবহার করা হচ্ছে।
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

# লগগুলো ফিল্টার করার জন্য আমাদের ইভেন্টের সিগনেচার প্রয়োজন
ck_event_signatures = [
    w3.keccak(text="Pregnant(address,uint256,uint256,uint256)").hex(),
    w3.keccak(text="Birth(address,uint256,uint256,uint256,uint256)").hex(),
]

# এখানে একটি প্রেগন্যান্ট ইভেন্ট দেওয়া হলো:
# - https://etherscan.io/tx/0xc97eb514a41004acc447ac9d0d6a27ea6da305ac8b877dff37e49db42e1f8cef#eventlog
pregnant_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[0]]
})

recent_pregnants = [get_event_data(w3.codec, ck_extra_events_abi[0], log)["args"] for log in pregnant_logs]

# এখানে একটি বার্থ ইভেন্ট দেওয়া হলো:
# - https://etherscan.io/tx/0x3978028e08a25bb4c44f7877eb3573b9644309c044bf087e335397f16356340a
birth_logs = w3.eth.get_logs({
    "fromBlock": w3.eth.block_number - 120,
    "address": w3.to_checksum_address(ck_token_addr),
    "topics": [ck_event_signatures[1]]
})

recent_births = [get_event_data(w3.codec, ck_extra_events_abi[1], log)["args"] for log in birth_logs]
```

## জনপ্রিয় NFTs {#popular-nfts}

- [Etherscan NFT Tracker](https://etherscan.io/nft-top-contracts) ট্রান্সফার ভলিউম অনুযায়ী ইথিরিয়ামের শীর্ষ NFT-গুলোর তালিকা করে।
- [CryptoKitties](https://www.cryptokitties.co/) হলো প্রজননযোগ্য, সংগ্রহযোগ্য এবং অত্যন্ত আরাধ্য প্রাণীদের কেন্দ্র করে তৈরি একটি গেম, যাদের আমরা ক্রিপ্টোকিটিজ (CryptoKitties) বলি।
- [Sorare](https://sorare.com/) হলো একটি গ্লোবাল ফ্যান্টাসি ফুটবল গেম যেখানে আপনি সীমিত সংস্করণের সংগ্রহযোগ্য আইটেম সংগ্রহ করতে পারেন, আপনার দল পরিচালনা করতে পারেন এবং পুরস্কার জেতার জন্য প্রতিযোগিতা করতে পারেন।
- [The Ethereum Name Service (ENS)](https://ens.domains/) সহজ, মানুষের পাঠযোগ্য নাম ব্যবহার করে ব্লকচেইন-এর ভেতরে এবং বাইরে উভয় ক্ষেত্রেই রিসোর্সগুলোকে অ্যাড্রেস করার একটি নিরাপদ এবং ডিসেন্ট্রালাইজড উপায় অফার করে।
- [POAP](https://poap.xyz) ইভেন্টে অংশগ্রহণকারী বা নির্দিষ্ট কাজ সম্পন্নকারী ব্যক্তিদের বিনামূল্যে NFT প্রদান করে। POAP তৈরি এবং বিতরণ করা সম্পূর্ণ বিনামূল্যে।
- [Unstoppable Domains](https://unstoppabledomains.com/) হলো সান ফ্রান্সিসকো-ভিত্তিক একটি কোম্পানি যা ব্লকচেইন-এ ডোমেইন তৈরি করে। ব্লকচেইন ডোমেইনগুলো ক্রিপটোকারেন্সি এডড্রেস-কে মানুষের পাঠযোগ্য নাম দিয়ে প্রতিস্থাপন করে এবং সেন্সরশিপ-প্রতিরোধী ওয়েবসাইটগুলো সক্ষম করতে ব্যবহার করা যেতে পারে।
- [Gods Unchained Cards](https://godsunchained.com/) হলো ইথিরিয়াম ব্লকচেইন-এর ওপর একটি TCG যা ইন-গেম অ্যাসেটগুলোতে প্রকৃত মালিকানা আনতে NFT ব্যবহার করে।
- [Bored Ape Yacht Club](https://boredapeyachtclub.com) হলো 10,000টি অনন্য NFT-এর একটি সংগ্রহ, যা একটি প্রমাণিত-বিরল শিল্পকর্ম হওয়ার পাশাপাশি ক্লাবের সদস্যপদ টোকেন হিসেবে কাজ করে, যা সদস্যদের এমন সব সুবিধা প্রদান করে যা সময়ের সাথে সাথে কমিউনিটির প্রচেষ্টার ফলে বৃদ্ধি পায়।

## আরও পড়ুন {#further-reading}

- [EIP-721: ERC-721 নন-ফান্জেবল টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin - ERC-721 ডক্স](https://docs.openzeppelin.com/contracts/3.x/erc721)
- [OpenZeppelin - ERC-721 ইমপ্লিমেন্টেশন](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)

## টিউটোরিয়াল: ইথিরিয়ামে নন-ফান্জেবল টোকেন (ERC-721) দিয়ে তৈরি করুন {#tutorials}

- [Vyper ERC-721 কন্ট্রাক্ট ওয়াকথ্রু](/developers/tutorials/erc-721-vyper-annotated-code/) _– Vyper-এ লেখা একটি সম্পূর্ণ ERC-721 NFT কন্ট্রাক্টের টীকাযুক্ত ওয়াকথ্রু।_
- [কীভাবে একটি NFT লিখতে এবং ডিপ্লয় করতে হয় (পর্ব 1/3)](/developers/tutorials/how-to-write-and-deploy-an-nft/) _– আপনার প্রথম ERC-721 স্মার্ট কন্ট্রাক্ট লেখা এবং ডিপ্লয় করার ধাপে ধাপে গাইড।_
- [কীভাবে একটি NFT মিন্ট করবেন (পর্ব 2/3)](/developers/tutorials/how-to-mint-an-nft/) _– আপনার ডিপ্লয় করা স্মার্ট কন্ট্রাক্ট এবং Web3 ব্যবহার করে কীভাবে একটি ERC-721 NFT মিন্ট করবেন।_
- [কীভাবে আপনার ওয়ালেটে আপনার NFT দেখবেন (পর্ব 3/3)](/developers/tutorials/how-to-view-nft-in-metamask/) _– ডিপ্লয়মেন্টের পর MetaMask-এ আপনার মিন্ট করা NFT কীভাবে প্রদর্শন করবেন।_
- [NFT মিন্টার টিউটোরিয়াল](/developers/tutorials/nft-minter/) _– React ফ্রন্টএন্ড, MetaMask এবং Alchemy দিয়ে একটি ফুল-স্ট্যাক NFT মিন্টিং ডিএ্যাপ তৈরি করুন।_