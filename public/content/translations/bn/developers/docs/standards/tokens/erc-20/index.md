---
title: "ERC-20 টোকেন স্ট্যান্ডার্ড"
description: "ERC-20 সম্পর্কে জানুন, এটি Ethereum-এর ফানজিবল টোকেনগুলির জন্য একটি স্ট্যান্ডার্ড যা ইন্টারঅপারেবল টোকেন অ্যাপ্লিকেশনগুলিকে সক্ষম করে।"
lang: bn
---

## ভূমিকা {#introduction}

**টোকেন কি?**

Ethereum-এ টোকেনগুলি কার্যত যেকোনো কিছুর প্রতিনিধিত্ব করতে পারে:

- একটি অনলাইন প্ল্যাটফর্মে খ্যাতি পয়েন্ট
- একটি গেমের কোনো চরিত্রের দক্ষতা
- আর্থিক সম্পদ যেমন একটি কোম্পানির একটি শেয়ার
- USD-এর মতো একটি ফিয়াট মুদ্রা
- এক আউন্স সোনা
- এবং আরও...

Ethereum-এর এমন একটি শক্তিশালী বৈশিষ্ট্য অবশ্যই একটি শক্তিশালী মান দ্বারা পরিচালিত হতে হবে, তাই না? ঠিক এখানেই
ERC-20 তার ভূমিকা পালন করে! এই স্ট্যান্ডার্ডটি ডেভেলপারদের এমন টোকেন অ্যাপ্লিকেশন তৈরি করতে দেয় যা অন্যান্য পণ্য এবং পরিষেবাগুলির সাথে আন্তঃকার্যক্ষম। ERC-20 স্ট্যান্ডার্ডটি [ইথার](/glossary/#ether)-কে অতিরিক্ত কার্যকারিতা প্রদান করতেও ব্যবহৃত হয়।

**ERC-20 কি?**

ERC-20 ফানজিবল টোকেনগুলির জন্য একটি স্ট্যান্ডার্ড চালু করেছে, অন্য কথায়, তাদের একটি বৈশিষ্ট্য রয়েছে যা প্রতিটি টোকেনকে অন্য টোকেনের সাথে হুবহু
একই (ধরন এবং মূল্যে) করে তোলে। উদাহরণস্বরূপ, একটি ERC-20 টোকেন ঠিক ETH-এর মতো কাজ করে, যার অর্থ হল 1 টোকেন
অন্যান্য সমস্ত টোকেনের সমান এবং সর্বদা সমান থাকবে।

## পূর্বশর্ত {#prerequisites}

- [অ্যাকাউন্টগুলি](/developers/docs/accounts)
- [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/)
- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)

## বডি {#body}

ERC-20 (Ethereum রিক্যুয়েস্ট ফর কমেন্টস 20), যা নভেম্বর 2015-এ ফ্যাবিয়ান ভোগেলস্টেলার দ্বারা প্রস্তাবিত, একটি টোকেন স্ট্যান্ডার্ড যা
স্মার্ট কন্ট্র্যাক্টের মধ্যে টোকেনের জন্য একটি API প্রয়োগ করে।

ERC-20 যে উদাহরণমূলক কার্যকারিতাগুলি প্রদান করে:

- এক অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে টোকেন স্থানান্তর করা
- একটি অ্যাকাউন্টের বর্তমান টোকেন ব্যালেন্স পান
- নেটওয়ার্কে উপলব্ধ টোকেনের মোট সরবরাহ পান
- একটি অ্যাকাউন্ট থেকে একটি পরিমাণ টোকেন কোনো তৃতীয় পক্ষের অ্যাকাউন্ট দ্বারা ব্যয় করা যাবে কিনা তা অনুমোদন করুন

যদি একটি স্মার্ট কন্ট্র্যাক্ট নিম্নলিখিত পদ্ধতি এবং ইভেন্টগুলি প্রয়োগ করে তবে এটিকে একটি ERC-20 টোকেন কন্ট্র্যাক্ট বলা যেতে পারে এবং, একবার ডিপ্লয় করা হলে, এটি
Ethereum-এ তৈরি টোকেনগুলির ট্র্যাক রাখার জন্য দায়ী থাকবে।

[EIP-20](https://eips.ethereum.org/EIPS/eip-20) থেকে:

### মেথড {#methods}

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

### ইভেন্ট {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

### উদাহরণ {#web3py-example}

আসুন দেখি Ethereum-এর যেকোনো ERC-20 টোকেন চুক্তি পরিদর্শন করার জন্য আমাদের কাজকে সহজ করতে একটি স্ট্যান্ডার্ড কতটা গুরুত্বপূর্ণ।
যেকোনো ERC-20 টোকেনের জন্য একটি ইন্টারফেস তৈরি করতে আমাদের শুধু কন্ট্র্যাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) প্রয়োজন। যেমন আপনি নিচে
দেখতে পাচ্ছেন, এটিকে একটি ঝামেলাহীন উদাহরণ তৈরি করতে আমরা একটি সরলীকৃত ABI ব্যবহার করব।

#### Web3.py উদাহরণ {#web3py-example}

প্রথমে, নিশ্চিত করুন যে আপনি [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) পাইথন লাইব্রেরিটি ইনস্টল করেছেন:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # র‍্যাপড ইথার (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # Uniswap V2: DAI 2

# এটি একটি ERC-20 টোকেন কন্ট্রাক্টের একটি সরলীকৃত কন্ট্রাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)।
# এটি শুধুমাত্র এই পদ্ধতিগুলিকে প্রকাশ করবে: balanceOf(address), decimals(), symbol() এবং totalSupply()
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
print("মোট সাপ্লাই:", totalSupply)
print("ঠিকানার ব্যালেন্স:", addr_balance)

weth_contract = w3.eth.contract(address=w3.to_checksum_address(weth_token_addr), abi=simplified_abi)
symbol = weth_contract.functions.symbol().call()
decimals = weth_contract.functions.decimals().call()
totalSupply = weth_contract.functions.totalSupply().call() / 10**decimals
addr_balance = weth_contract.functions.balanceOf(acc_address).call() / 10**decimals

#  WETH
print("===== %s =====" % symbol)
print("মোট সাপ্লাই:", totalSupply)
print("ঠিকানার ব্যালেন্স:", addr_balance)
```

## জ্ঞাত সমস্যা {#erc20-issues}

### ERC-20 টোকেন গ্রহণ সমস্যা {#reception-issue}

**06/20/2024 অনুযায়ী এই সমস্যার কারণে কমপক্ষে $83,656,418 মূল্যের ERC-20 টোকেন হারিয়ে গেছে। মনে রাখবেন যে একটি বিশুদ্ধ ERC-20 ইমপ্লিমেন্টেশন এই সমস্যার জন্য ঝুঁকিপূর্ণ, যদি না আপনি নীচে তালিকাভুক্ত স্ট্যান্ডার্ডের উপরে অতিরিক্ত বিধিনিষেধের একটি সেট প্রয়োগ করেন।**

যখন ERC-20 টোকেন এমন একটি স্মার্ট কন্ট্রাক্টে পাঠানো হয় যা ERC-20 টোকেন পরিচালনা করার জন্য ডিজাইন করা হয়নি, তখন সেই টোকেনগুলি স্থায়ীভাবে হারিয়ে যেতে পারে। এটি ঘটে কারণ গ্রহণকারী কন্ট্র্যাক্টের আগত টোকেনগুলিকে চিনতে বা তার প্রতিক্রিয়া জানানোর কার্যকারিতা নেই এবং ERC-20 স্ট্যান্ডার্ডে গ্রহণকারী কন্ট্র্যাক্টকে আগত টোকেন সম্পর্কে অবহিত করার কোনো ব্যবস্থা নেই। এই সমস্যাটি যে প্রধান উপায়ে রূপ নেয় তা হল:

1. টোকেন স্থানান্তর পদ্ধতি

- ERC-20 টোকেনগুলি `transfer` বা `transferFrom` ফাংশন ব্যবহার করে স্থানান্তরিত হয়
  - যখন একজন ব্যবহারকারী এই ফাংশনগুলি ব্যবহার করে একটি কন্ট্র্যাক্ট ঠিকানায় টোকেন পাঠায়, তখন গ্রহণকারী কন্ট্র্যাক্টটি সেগুলি পরিচালনা করার জন্য ডিজাইন করা হয়েছে কিনা তা নির্বিশেষে টোকেনগুলি স্থানান্তরিত হয়

2. বিজ্ঞপ্তির অভাব
   - গ্রহণকারী কন্ট্র্যাক্ট কোনো বিজ্ঞপ্তি বা কলব্যাক পায় না যে টোকেনগুলি এতে পাঠানো হয়েছে।
   - যদি গ্রহণকারী কন্ট্র্যাক্টে টোকেন পরিচালনা করার কোনো ব্যবস্থার অভাব থাকে (যেমন, একটি ফলব্যাক ফাংশন বা টোকেন গ্রহণ পরিচালনা করার জন্য একটি নিবেদিত ফাংশন), তাহলে টোকেনগুলি কার্যকরভাবে কন্ট্র্যাক্টের ঠিকানায় আটকে যায়।
3. কোনো বিল্ট-ইন হ্যান্ডলিং নেই
   - ERC-20 স্ট্যান্ডার্ডে গ্রহণকারী কন্ট্র্যাক্টগুলি প্রয়োগ করার জন্য কোনো বাধ্যতামূলক ফাংশন অন্তর্ভুক্ত নেই, যার ফলে এমন একটি পরিস্থিতি তৈরি হয় যেখানে অনেক কন্ট্র্যাক্ট আগত টোকেনগুলি সঠিকভাবে পরিচালনা করতে অক্ষম।

**সম্ভাব্য সমাধান**

যদিও ERC-20 এর সাথে এই সমস্যাটি সম্পূর্ণরূপে প্রতিরোধ করা সম্ভব নয়, তবে এমন কিছু পদ্ধতি রয়েছে যা শেষ ব্যবহারকারীর জন্য টোকেন হারানোর সম্ভাবনা উল্লেখযোগ্যভাবে হ্রাস করতে পারে:

- সবচেয়ে সাধারণ সমস্যা হলো যখন একজন ব্যবহারকারী টোকেন কন্ট্র্যাক্টের ঠিকানাতেই টোকেন পাঠায় (যেমন, USDT টোকেন কন্ট্র্যাক্টের ঠিকানায় USDT জমা দেওয়া)। `transfer(..)` ফাংশনটিকে এই ধরনের স্থানান্তর প্রচেষ্টাগুলি প্রত্যাবর্তন করার জন্য সীমাবদ্ধ করার সুপারিশ করা হয়। `transfer(..)` ফাংশনের প্রয়োগের মধ্যে `require(_to != address(this));` চেক যোগ করার কথা বিবেচনা করুন।
- `transfer(..)` ফাংশনটি সাধারণত কন্ট্র্যাক্টে টোকেন জমা করার জন্য ডিজাইন করা হয়নি। `approve(..) এবং `transferFrom(..)`প্যাটার্ন এর পরিবর্তে কন্ট্র্যাক্টে ERC-20 টোকেন জমা করতে ব্যবহৃত হয়। ট্রান্সফার ফাংশনটিকে সীমাবদ্ধ করে যেকোনো কন্ট্রাক্টে টোকেন জমা দেওয়া নিষিদ্ধ করা সম্ভব, তবে এটি এমন কন্ট্রাক্টগুলোর সাথে সামঞ্জস্যতা ভঙ্গ করতে পারে যেগুলো ধরে নেয় যে`trasnfer(..)` ফাংশন ব্যবহার করে কন্ট্রাক্টে টোকেন জমা করা যায় (যেমন, Uniswap লিকুইডিটি পুল)।
- সর্বদা ধরে নিন যে ERC-20 টোকেনগুলি আপনার কন্ট্রাক্টে এসে জমা হতে পারে, এমনকি যদি আপনার কন্ট্রাক্টের কোনো টোকেন গ্রহণ করার কথা না থাকে। প্রাপকের পক্ষ থেকে দুর্ঘটনাজনিত জমা প্রতিরোধ বা প্রত্যাখ্যান করার কোনো উপায় নেই। এমন একটি ফাংশন প্রয়োগ করার পরামর্শ দেওয়া হয় যা দুর্ঘটনাক্রমে জমা হওয়া ERC-20 টোকেনগুলি বের করার অনুমতি দেবে।
- বিকল্প টোকেন স্ট্যান্ডার্ড ব্যবহার করার কথা বিবেচনা করুন।

এই সমস্যা থেকে কিছু বিকল্প স্ট্যান্ডার্ড বেরিয়ে এসেছে যেমন [ERC-223](/developers/docs/standards/tokens/erc-223) বা [ERC-1363](/developers/docs/standards/tokens/erc-1363)।

## আরও পড়ুন {#further-reading}

- [EIP-20: ERC-20 টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20)
- [OpenZeppelin - টোকেন](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [OpenZeppelin - ERC-20 ইমপ্লিমেন্টেশন](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - সলিডিটি ERC20 টোকেনের জন্য গাইড](https://www.alchemy.com/overviews/erc20-solidity)

## অন্যান্য ফানজিবল টোকেন স্ট্যান্ডার্ড {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - টোকেনাইজড ভল্ট](/developers/docs/standards/tokens/erc-4626)
