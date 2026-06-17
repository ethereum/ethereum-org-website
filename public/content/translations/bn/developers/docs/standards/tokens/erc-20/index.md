---
title: ERC-20 টোকেন স্ট্যান্ডার্ড
description: ইথেরিয়ামে বিনিমেয় টোকেনের স্ট্যান্ডার্ড ERC-20 সম্পর্কে জানুন, যা আন্তঃক্রিয়াশীল টোকেন অ্যাপ্লিকেশন তৈরি করতে সক্ষম করে।
lang: bn
---

## ভূমিকা {#introduction}

**টোকেন কী?**

টোকেন [ইথেরিয়াম](/)-এ কার্যত যেকোনো কিছুর প্রতিনিধিত্ব করতে পারে:

- একটি অনলাইন প্ল্যাটফর্মে রেপুটেশন পয়েন্ট
- একটি গেমে কোনো চরিত্রের দক্ষতা
- কোম্পানির শেয়ারের মতো আর্থিক সম্পদ
- USD-এর মতো ফিয়াট মুদ্রা
- এক আউন্স সোনা
- এবং আরও অনেক কিছু...

ইথেরিয়ামের এমন একটি শক্তিশালী বৈশিষ্ট্য অবশ্যই একটি শক্তিশালী স্ট্যান্ডার্ড দ্বারা পরিচালিত হওয়া উচিত, তাই না? ঠিক এখানেই ERC-20 তার ভূমিকা পালন করে! এই স্ট্যান্ডার্ডটি ডেভেলপারদের এমন টোকেন অ্যাপ্লিকেশন তৈরি করতে দেয় যা অন্যান্য পণ্য এবং পরিষেবাগুলির সাথে আন্তঃক্রিয়াশীল। ERC-20 স্ট্যান্ডার্ডটি [ইথার](/glossary/#ether)-এ অতিরিক্ত কার্যকারিতা প্রদান করতেও ব্যবহৃত হয়।

**ERC-20 কী?**

ERC-20 বিনিমেয় টোকেন (Fungible Tokens)-এর জন্য একটি স্ট্যান্ডার্ড প্রবর্তন করে, অন্য কথায়, তাদের এমন একটি বৈশিষ্ট্য রয়েছে যা প্রতিটি টোকেনকে অন্য টোকেনের (ধরন এবং মূল্যের দিক থেকে) ঠিক একই রকম করে তোলে। উদাহরণস্বরূপ, একটি ERC-20 টোকেন ঠিক ETH-এর মতো কাজ করে, যার অর্থ 1 টোকেন সর্বদা অন্যান্য সমস্ত টোকেনের সমান হবে।

## পূর্বশর্ত {#prerequisites}

- [অ্যাকাউন্ট](/developers/docs/accounts)
- [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/)
- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)

## মূল অংশ {#body}

নভেম্বর 2015-এ ফ্যাবিয়ান ভোগেলস্টেলার (Fabian Vogelsteller) দ্বারা প্রস্তাবিত ERC-20 (Ethereum Request for Comments 20) হলো একটি টোকেন স্ট্যান্ডার্ড যা স্মার্ট কন্ট্রাক্টের মধ্যে টোকেনগুলির জন্য একটি API প্রয়োগ করে।

ERC-20 যে কার্যকারিতাগুলো প্রদান করে তার উদাহরণ:

- এক অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে টোকেন হস্তান্তর করা
- একটি অ্যাকাউন্টের বর্তমান টোকেন ব্যালেন্স জানা
- নেটওয়ার্কে উপলব্ধ টোকেনের মোট সরবরাহ জানা
- কোনো অ্যাকাউন্ট থেকে নির্দিষ্ট পরিমাণ টোকেন তৃতীয় পক্ষের অ্যাকাউন্ট দ্বারা ব্যয় করা যাবে কি না তা অনুমোদন করা

যদি একটি স্মার্ট কন্ট্রাক্ট নিচের মেথড এবং ইভেন্টগুলো প্রয়োগ করে, তবে এটিকে একটি ERC-20 টোকেন কন্ট্রাক্ট বলা যেতে পারে এবং একবার ডিপ্লয় করা হলে, এটি ইথেরিয়ামে তৈরি করা টোকেনগুলোর ট্র্যাক রাখার জন্য দায়ী থাকবে।

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

আসুন দেখি ইথেরিয়ামে যেকোনো ERC-20 টোকেন কন্ট্রাক্ট পরিদর্শন করা আমাদের জন্য সহজ করতে একটি স্ট্যান্ডার্ড কতটা গুরুত্বপূর্ণ। যেকোনো ERC-20 টোকেনের জন্য একটি ইন্টারফেস তৈরি করতে আমাদের শুধু কন্ট্রাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI) প্রয়োজন। নিচে দেখতে পাবেন, আমরা একটি সরলীকৃত ABI ব্যবহার করব, যাতে এটি সহজে বোঝা যায়।

#### Web3.py উদাহরণ {#web3py-example-2}

প্রথমে, নিশ্চিত করুন যে আপনি [Web3.py](https://web3py.readthedocs.io/en/stable/quickstart.html#installation) Python লাইব্রেরি ইনস্টল করেছেন:

```
pip install web3
```

```python
from web3 import Web3


w3 = Web3(Web3.HTTPProvider("https://cloudflare-eth.com"))

dai_token_addr = "0x6B175474E89094C44Da98b954EedeAC495271d0F"     # DAI
weth_token_addr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"    # র‍্যাপড ইথার (WETH)

acc_address = "0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11"        # ইউনিসোয়াপ V2: DAI 2

# এটি একটি ERC-20 টোকেন কন্ট্রাক্ট-এর সরলীকৃত কন্ট্রাক্ট অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (ABI)।
# এটি শুধুমাত্র balanceOf(address), decimals(), symbol() এবং totalSupply() মেথডগুলো প্রকাশ করবে।
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

## পরিচিত সমস্যা {#erc20-issues}

### ERC-20 টোকেন গ্রহণের সমস্যা {#reception-issue}

**06/20/2024 তারিখ পর্যন্ত এই সমস্যার কারণে অন্তত $83,656,418 মূল্যের ERC-20 টোকেন হারিয়ে গেছে। মনে রাখবেন যে একটি বিশুদ্ধ ERC-20 বাস্তবায়ন এই সমস্যার সম্মুখীন হতে পারে, যদি না আপনি নিচে তালিকাভুক্ত স্ট্যান্ডার্ডের ওপর অতিরিক্ত কিছু বিধিনিষেধ প্রয়োগ করেন।**

যখন ERC-20 টোকেনগুলো এমন একটি স্মার্ট কন্ট্রাক্টে পাঠানো হয় যা ERC-20 টোকেনগুলো পরিচালনা করার জন্য ডিজাইন করা হয়নি, তখন সেই টোকেনগুলো স্থায়ীভাবে হারিয়ে যেতে পারে। এটি ঘটে কারণ গ্রহণকারী কন্ট্রাক্টের আগত টোকেনগুলো শনাক্ত করার বা প্রতিক্রিয়া জানানোর কার্যকারিতা নেই এবং আগত টোকেনগুলো সম্পর্কে গ্রহণকারী কন্ট্রাক্টকে জানানোর জন্য ERC-20 স্ট্যান্ডার্ডে কোনো মেকানিজম নেই। এই সমস্যাটি মূলত যেভাবে দেখা দেয় তা হলো:

1.	টোকেন হস্তান্তর মেকানিজম
  - ERC-20 টোকেনগুলো transfer বা transferFrom ফাংশন ব্যবহার করে হস্তান্তর করা হয়
	- যখন কোনো ব্যবহারকারী এই ফাংশনগুলো ব্যবহার করে কোনো কন্ট্রাক্ট ঠিকানায় টোকেন পাঠান, তখন গ্রহণকারী কন্ট্রাক্ট সেগুলো পরিচালনা করার জন্য ডিজাইন করা হয়েছে কি না তা বিবেচনা না করেই টোকেনগুলো হস্তান্তর করা হয়
2.	বিজ্ঞপ্তির অভাব
	- গ্রহণকারী কন্ট্রাক্ট কোনো বিজ্ঞপ্তি বা কলব্যাক পায় না যে এতে টোকেন পাঠানো হয়েছে
	- যদি গ্রহণকারী কন্ট্রাক্টে টোকেনগুলো পরিচালনা করার জন্য কোনো মেকানিজমের অভাব থাকে (যেমন, একটি ফলব্যাক ফাংশন বা টোকেন গ্রহণ পরিচালনা করার জন্য একটি ডেডিকেটেড ফাংশন), তবে টোকেনগুলো কার্যকরভাবে কন্ট্রাক্টের ঠিকানায় আটকে যায়
3.	কোনো বিল্ট-ইন হ্যান্ডলিং নেই
	- ERC-20 স্ট্যান্ডার্ডে গ্রহণকারী কন্ট্রাক্টগুলোর প্রয়োগ করার জন্য কোনো বাধ্যতামূলক ফাংশন অন্তর্ভুক্ত নেই, যার ফলে এমন একটি পরিস্থিতির সৃষ্টি হয় যেখানে অনেক কন্ট্রাক্ট আগত টোকেনগুলো সঠিকভাবে পরিচালনা করতে অক্ষম হয়

**সম্ভাব্য সমাধান**

যদিও ERC-20-এর মাধ্যমে এই সমস্যাটি পুরোপুরি প্রতিরোধ করা সম্ভব নয়, তবে এমন কিছু পদ্ধতি রয়েছে যা শেষ ব্যবহারকারীর জন্য টোকেন হারানোর সম্ভাবনা উল্লেখযোগ্যভাবে হ্রাস করতে দেয়:

- সবচেয়ে সাধারণ সমস্যাটি হলো যখন কোনো ব্যবহারকারী টোকেন কন্ট্রাক্টের ঠিকানাতেই টোকেন পাঠান (যেমন, USDT টোকেন কন্ট্রাক্টের ঠিকানায় USDT জমা দেওয়া)। এই ধরনের হস্তান্তর প্রচেষ্টা রিভার্ট করার জন্য `transfer(..)` ফাংশনটিকে সীমাবদ্ধ করার পরামর্শ দেওয়া হয়। `transfer(..)` ফাংশনের বাস্তবায়নের মধ্যে `require(_to != address(this));` চেক যোগ করার কথা বিবেচনা করুন।
- `transfer(..)` ফাংশনটি সাধারণত কন্ট্রাক্টে টোকেন জমা দেওয়ার জন্য ডিজাইন করা হয়নি। এর পরিবর্তে কন্ট্রাক্টে ERC-20 টোকেন জমা দেওয়ার জন্য `approve(..) & transferFrom(..)` প্যাটার্ন ব্যবহার করা হয়। এর মাধ্যমে যেকোনো কন্ট্রাক্টে টোকেন জমা দেওয়া নিষিদ্ধ করার জন্য transfer ফাংশনটিকে সীমাবদ্ধ করা সম্ভব, তবে এটি এমন কন্ট্রাক্টগুলোর সাথে সামঞ্জস্যতা নষ্ট করতে পারে যেগুলো ধরে নেয় যে `transfer(..)` ফাংশনের মাধ্যমে কন্ট্রাক্টে টোকেন জমা দেওয়া যেতে পারে (যেমন, ইউনিসোয়াপ তারল্য পুল)।
- সর্বদা ধরে নিন যে ERC-20 টোকেনগুলো আপনার কন্ট্রাক্টে এসে পৌঁছাতে পারে, এমনকি যদি আপনার কন্ট্রাক্ট কখনো কোনো টোকেন গ্রহণ করার কথা না থাকে। প্রাপকের প্রান্তে দুর্ঘটনাবশত জমা হওয়া প্রতিরোধ বা প্রত্যাখ্যান করার কোনো উপায় নেই। এমন একটি ফাংশন প্রয়োগ করার পরামর্শ দেওয়া হয় যা দুর্ঘটনাবশত জমা হওয়া ERC-20 টোকেনগুলো বের করার অনুমতি দেবে।
- বিকল্প টোকেন স্ট্যান্ডার্ড ব্যবহার করার কথা বিবেচনা করুন।

এই সমস্যা থেকে কিছু বিকল্প স্ট্যান্ডার্ড বেরিয়ে এসেছে যেমন [ERC-223](/developers/docs/standards/tokens/erc-223) বা [ERC-1363](/developers/docs/standards/tokens/erc-1363)।

## আরও পড়ুন {#further-reading}

- [EIP-20: ERC-20 টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20)
- [ওপেনজেপেলিন - টোকেন](https://docs.openzeppelin.com/contracts/3.x/tokens#ERC20)
- [ওপেনজেপেলিন - ERC-20 বাস্তবায়ন](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)
- [Alchemy - Solidity ERC20 টোকেনের গাইড](https://www.alchemy.com/overviews/erc20-solidity)

## অন্যান্য বিনিমেয় টোকেন স্ট্যান্ডার্ড {#fungible-token-standards}

- [ERC-223](/developers/docs/standards/tokens/erc-223)
- [ERC-1363](/developers/docs/standards/tokens/erc-1363)
- [ERC-777](/developers/docs/standards/tokens/erc-777)
- [ERC-4626 - টোকেনাইজড ভল্ট](/developers/docs/standards/tokens/erc-4626)

## টিউটোরিয়াল: ইথেরিয়ামে ERC-20 দিয়ে তৈরি করুন {#tutorials}

- [ERC-20 কন্ট্রাক্ট ওয়াক-থ্রু](/developers/tutorials/erc20-annotated-code/) _– ওপেনজেপেলিন ERC-20 কন্ট্রাক্ট বাস্তবায়নের একটি লাইন-বাই-লাইন টীকাযুক্ত ওয়াকথ্রু।_
- [সেফটি রেলস সহ ERC-20](/developers/tutorials/erc20-with-safety-rails/) _– ব্যবহারকারীদের সাধারণ ভুল এড়াতে সাহায্য করার জন্য কীভাবে ERC-20 টোকেনে সুরক্ষামূলক ব্যবস্থা যোগ করতে হয়।_
- [Ethers.js ব্যবহার করে টোকেন পাঠানো](/developers/tutorials/send-token-ethersjs/) _– Ethers.js ব্যবহার করে ERC-20 টোকেন হস্তান্তর করার জন্য নতুনদের উপযোগী একটি গাইড।_
- [স্ক্যাম টোকেনগুলোর ব্যবহৃত কিছু কৌশল এবং কীভাবে সেগুলো শনাক্ত করবেন](/developers/tutorials/scam-token-tricks/) _– স্ক্যাম ERC-20 টোকেন প্যাটার্ন এবং কীভাবে সেগুলো শনাক্ত করতে হয় তার একটি বিস্তারিত আলোচনা।_