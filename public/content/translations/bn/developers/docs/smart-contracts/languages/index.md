---
title: স্মার্ট কন্ট্রাক্ট ল্যাঙ্গুয়েজ
description: দুটি প্রধান স্মার্ট কন্ট্রাক্ট ল্যাঙ্গুয়েজ – Solidity এবং Vyper-এর একটি ওভারভিউ এবং তুলনা।
lang: bn
---

[ইথেরিয়াম](/)-এর একটি দারুণ দিক হলো, তুলনামূলকভাবে ডেভেলপার-বান্ধব ল্যাঙ্গুয়েজ ব্যবহার করে স্মার্ট কন্ট্রাক্ট প্রোগ্রাম করা যায়। আপনার যদি Python বা কোনো [কার্লি-ব্র্যাকেট ল্যাঙ্গুয়েজ](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)-এর অভিজ্ঞতা থাকে, তবে আপনি পরিচিত সিনট্যাক্সসহ একটি ল্যাঙ্গুয়েজ খুঁজে পেতে পারেন।

সবচেয়ে সক্রিয় এবং রক্ষণাবেক্ষণ করা দুটি ল্যাঙ্গুয়েজ হলো:

- Solidity
- Vyper

Remix IDE, Solidity এবং Vyper উভয় ল্যাঙ্গুয়েজেই কন্ট্রাক্ট তৈরি এবং পরীক্ষা করার জন্য একটি বিস্তৃত ডেভেলপমেন্ট পরিবেশ প্রদান করে। কোডিং শুরু করতে [ইন-ব্রাউজার Remix IDE ব্যবহার করে দেখুন](https://remix.ethereum.org)।

অধিক অভিজ্ঞ ডেভেলপাররা চাইলে Yul ব্যবহার করতে পারেন, যা [ইথেরিয়াম ভার্চুয়াল মেশিন (EVM)](/developers/docs/evm/)-এর জন্য একটি ইন্টারমিডিয়েট ল্যাঙ্গুয়েজ, অথবা Yul+, যা Yul-এর একটি এক্সটেনশন।

আপনি যদি কৌতূহলী হন এবং এখনও ব্যাপকভাবে ডেভেলপমেন্টের অধীনে থাকা নতুন ল্যাঙ্গুয়েজগুলো পরীক্ষা করতে সাহায্য করতে চান, তবে আপনি Fe নিয়ে পরীক্ষা-নিরীক্ষা করতে পারেন, যা একটি উদীয়মান স্মার্ট কন্ট্রাক্ট ল্যাঙ্গুয়েজ এবং বর্তমানে এটি প্রাথমিক পর্যায়ে রয়েছে।

## পূর্বশর্ত {#prerequisites}

প্রোগ্রামিং ল্যাঙ্গুয়েজ, বিশেষ করে JavaScript বা Python-এর পূর্ব অভিজ্ঞতা আপনাকে স্মার্ট কন্ট্রাক্ট ল্যাঙ্গুয়েজগুলোর পার্থক্য বুঝতে সাহায্য করতে পারে। ল্যাঙ্গুয়েজগুলোর তুলনার গভীরে যাওয়ার আগে আমরা আপনাকে একটি ধারণা হিসেবে স্মার্ট কন্ট্রাক্ট বোঝার পরামর্শ দিই। [স্মার্ট কন্ট্রাক্ট পরিচিতি](/developers/docs/smart-contracts/)।

## Solidity {#solidity}

- স্মার্ট কন্ট্রাক্ট বাস্তবায়নের জন্য অবজেক্ট-ওরিয়েন্টেড, হাই-লেভেল ল্যাঙ্গুয়েজ।
- কার্লি-ব্র্যাকেট ল্যাঙ্গুয়েজ যা C++ দ্বারা সবচেয়ে বেশি প্রভাবিত হয়েছে।
- স্ট্যাটিক্যালি টাইপড (কম্পাইল করার সময় ভেরিয়েবলের টাইপ জানা যায়)।
- সাপোর্ট করে:
  - ইনহেরিট্যান্স (আপনি অন্যান্য কন্ট্রাক্ট এক্সটেন্ড করতে পারেন)।
  - লাইব্রেরি (আপনি পুনরায় ব্যবহারযোগ্য কোড তৈরি করতে পারেন যা বিভিন্ন কন্ট্রাক্ট থেকে কল করা যায় – যেমন অন্যান্য অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং ল্যাঙ্গুয়েজে স্ট্যাটিক ক্লাসের স্ট্যাটিক ফাংশন)।
  - জটিল ইউজার-ডিফাইনড টাইপ।

### গুরুত্বপূর্ণ লিংক {#important-links}

- [ডকুমেন্টেশন](https://docs.soliditylang.org/en/latest/)
- [Solidity ল্যাঙ্গুয়েজ পোর্টাল](https://soliditylang.org/)
- [Solidity বাই এক্সাম্পল](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter চ্যাটরুম](https://gitter.im/ethereum/solidity) যা [Solidity Matrix চ্যাটরুম](https://matrix.to/#/#ethereum_solidity:gitter.im)-এর সাথে যুক্ত
- [চিট শিট](https://reference.auditless.com/cheatsheet)
- [Solidity ব্লগ](https://blog.soliditylang.org/)
- [Solidity টুইটার](https://twitter.com/solidity_lang)

### উদাহরণ কন্ট্রাক্ট {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // "public" কীওয়ার্ডটি ভেরিয়েবলগুলোকে
    // অন্যান্য কন্ট্রাক্ট থেকে অ্যাক্সেসযোগ্য করে তোলে
    address public minter;
    mapping (address => uint) public balances;

    // ইভেন্টগুলো ক্লায়েন্টদের নির্দিষ্ট
    // আপনার ঘোষণা করা কন্ট্রাক্ট পরিবর্তনের প্রতি প্রতিক্রিয়া জানাতে দেয়
    event Sent(address from, address to, uint amount);

    // কনস্ট্রাক্টর কোড শুধুমাত্র তখনই রান হয় যখন কন্ট্রাক্ট
    // তৈরি করা হয়
    constructor() {
        minter = msg.sender;
    }

    // নতুন তৈরি করা কয়েনের একটি পরিমাণ কোনো ঠিকানায় পাঠায়
    // শুধুমাত্র কন্ট্রাক্ট নির্মাতাই কল করতে পারবেন
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // বিদ্যমান কয়েনের একটি পরিমাণ পাঠায়
    // যেকোনো কলার থেকে কোনো ঠিকানায়
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

এই উদাহরণটি আপনাকে Solidity কন্ট্রাক্ট সিনট্যাক্স কেমন হয় তার একটি ধারণা দেবে। ফাংশন এবং ভেরিয়েবলগুলোর আরও বিস্তারিত বর্ণনার জন্য, [ডকুমেন্টেশন দেখুন](https://docs.soliditylang.org/en/latest/contracts.html)।

## Vyper {#vyper}

- পাইথনিক প্রোগ্রামিং ল্যাঙ্গুয়েজ
- স্ট্রং টাইপিং
- ছোট এবং বোধগম্য কম্পাইলার কোড
- দক্ষ বাইটকোড জেনারেশন
- কন্ট্রাক্টগুলোকে আরও সুরক্ষিত এবং অডিট করা সহজ করার উদ্দেশ্যে ইচ্ছাকৃতভাবেই এতে Solidity-এর চেয়ে কম ফিচার রাখা হয়েছে। Vyper যা সাপোর্ট করে না:
  - মডিফায়ার
  - ইনহেরিট্যান্স
  - ইনলাইন অ্যাসেম্বলি
  - ফাংশন ওভারলোডিং
  - অপারেটর ওভারলোডিং
  - রিকার্সিভ কলিং
  - ইনফিনিট-লেংথ লুপ
  - বাইনারি ফিক্সড পয়েন্ট

আরও তথ্যের জন্য, [Vyper-এর যৌক্তিকতা পড়ুন](https://vyper.readthedocs.io/en/latest/index.html)।

### গুরুত্বপূর্ণ লিংক {#important-links-1}

- [ডকুমেন্টেশন](https://vyper.readthedocs.io)
- [Vyper বাই এক্সাম্পল](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [আরও Vyper বাই এক্সাম্পল](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper কমিউনিটি ডিসকর্ড চ্যাট](https://discord.gg/SdvKC79cJk)
- [চিট শিট](https://reference.auditless.com/cheatsheet)
- [Vyper-এর জন্য স্মার্ট কন্ট্রাক্ট ডেভেলপমেন্ট ফ্রেমওয়ার্ক এবং টুলস](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper স্মার্ট কন্ট্রাক্ট সুরক্ষিত করা এবং হ্যাক করা শিখুন](https://github.com/SupremacyTeam/VyperPunk)
- [ডেভেলপমেন্টের জন্য Vyper হাব](https://github.com/zcor/vyper-dev)
- [Vyper-এর সেরা স্মার্ট কন্ট্রাক্ট উদাহরণ](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [অসাধারণ Vyper কিউরেটেড রিসোর্স](https://github.com/spadebuilders/awesome-vyper)

### উদাহরণ {#example}

```python
# উন্মুক্ত নিলাম

# নিলামের প্যারামিটার
# সুবিধাভোগী সর্বোচ্চ দরদাতার কাছ থেকে অর্থ গ্রহণ করেন
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# নিলামের বর্তমান অবস্থা
highestBidder: public(address)
highestBid: public(uint256)

# শেষে true সেট করা হয়, কোনো পরিবর্তনের অনুমতি দেয় না
ended: public(bool)

# রিফান্ড করা বিডগুলোর ট্র্যাক রাখুন যাতে আমরা উইথড্র প্যাটার্ন অনুসরণ করতে পারি
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time` দিয়ে একটি সাধারণ নিলাম তৈরি করুন
# সেকেন্ড বিডিং সময়, যার পক্ষে
# সুবিধাভোগীর ঠিকানা `_beneficiary`।
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# পাঠানো ভ্যালুর সাথে নিলামে বিড করুন
# এই ট্রানজ্যাকশনের সাথে একসাথে।
# ভ্যালু শুধুমাত্র তখনই রিফান্ড করা হবে যদি
# নিলামে জয়ী না হয়।
@external
@payable
def bid():
    # বিডিংয়ের সময় শেষ হয়েছে কিনা তা চেক করুন।
    assert block.timestamp < self.auctionEnd
    # বিড যথেষ্ট বেশি কিনা তা চেক করুন
    assert msg.value > self.highestBid
    # আগের সর্বোচ্চ দরদাতার রিফান্ড ট্র্যাক করুন
    self.pendingReturns[self.highestBidder] += self.highestBid
    # নতুন সর্বোচ্চ বিড ট্র্যাক করুন
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# আগে রিফান্ড করা একটি বিড উইথড্র করুন। উইথড্র প্যাটার্নটি
# এখানে একটি নিরাপত্তা সমস্যা এড়াতে ব্যবহার করা হয়েছে। যদি রিফান্ড সরাসরি
# bid() এর অংশ হিসেবে পাঠানো হতো, তবে একটি ক্ষতিকারক বিডিং কন্ট্রাক্ট ব্লক করতে পারতো
# সেই রিফান্ডগুলো এবং এর ফলে নতুন উচ্চতর বিড আসাও ব্লক করতে পারতো।
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# নিলাম শেষ করুন এবং সর্বোচ্চ বিডটি পাঠান
# সুবিধাভোগীর কাছে।
@external
def endAuction():
    # ইন্টারঅ্যাক্ট করে এমন ফাংশনগুলো গঠন করার জন্য এটি একটি ভালো নির্দেশিকা
    # অন্যান্য কন্ট্রাক্টের সাথে (অর্থাৎ, তারা ফাংশন কল করে বা ইথার পাঠায়)
    # তিনটি ধাপে:
    # ১. শর্ত চেক করা
    # ২. কাজ সম্পাদন করা (সম্ভাব্যভাবে শর্ত পরিবর্তন করা)
    # ৩. অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা
    # যদি এই ধাপগুলো মিশে যায়, তবে অন্য কন্ট্রাক্টটি
    # বর্তমান কন্ট্রাক্টে কলব্যাক করতে পারে এবং স্টেট পরিবর্তন করতে পারে বা
    # প্রভাবগুলো (ইথার পেআউট) একাধিকবার সম্পাদন করতে পারে।
    # যদি অভ্যন্তরীণভাবে কল করা ফাংশনগুলোতে এক্সটার্নাল
    # কন্ট্রাক্টের সাথে ইন্টারঅ্যাকশন অন্তর্ভুক্ত থাকে, তবে সেগুলোকেও
    # এক্সটার্নাল কন্ট্রাক্টের সাথে ইন্টারঅ্যাকশন হিসেবে বিবেচনা করতে হবে।

    # ১. শর্তাবলী
    # নিলামের শেষ সময় পৌঁছেছে কিনা তা চেক করুন
    assert block.timestamp >= self.auctionEnd
    # এই ফাংশনটি ইতিমধ্যে কল করা হয়েছে কিনা তা চেক করুন
    assert not self.ended

    # ২. প্রভাব
    self.ended = True

    # ৩. ইন্টারঅ্যাকশন
    send(self.beneficiary, self.highestBid)
```

এই উদাহরণটি আপনাকে Vyper কন্ট্রাক্ট সিনট্যাক্স কেমন হয় তার একটি ধারণা দেবে। ফাংশন এবং ভেরিয়েবলগুলোর আরও বিস্তারিত বর্ণনার জন্য, [ডকুমেন্টেশন দেখুন](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)।

## Yul এবং Yul+ {#yul}

আপনি যদি ইথেরিয়ামে নতুন হয়ে থাকেন এবং এখনও স্মার্ট কন্ট্রাক্ট ল্যাঙ্গুয়েজ দিয়ে কোনো কোডিং না করে থাকেন, তবে আমরা Solidity বা Vyper দিয়ে শুরু করার পরামর্শ দিই। স্মার্ট কন্ট্রাক্ট নিরাপত্তার সর্বোত্তম অনুশীলন এবং EVM-এর সাথে কাজ করার সুনির্দিষ্ট বিষয়গুলোর সাথে পরিচিত হওয়ার পরেই কেবল Yul বা Yul+ নিয়ে কাজ করুন।

**Yul**

- ইথেরিয়ামের জন্য ইন্টারমিডিয়েট ল্যাঙ্গুয়েজ।
- [EVM](/developers/docs/evm) এবং [Ewasm](https://github.com/ewasm) (একটি ইথেরিয়াম ফ্লেভারড WebAssembly) সাপোর্ট করে এবং এটি উভয় প্ল্যাটফর্মের একটি ব্যবহারযোগ্য সাধারণ ডিনোমিনেটর হিসেবে ডিজাইন করা হয়েছে।
- হাই-লেভেল অপ্টিমাইজেশন ধাপগুলোর জন্য ভালো টার্গেট, যা EVM এবং Ewasm উভয় প্ল্যাটফর্মকেই সমানভাবে উপকৃত করতে পারে।

**Yul+**

- Yul-এর একটি লো-লেভেল, অত্যন্ত দক্ষ এক্সটেনশন।
- প্রাথমিকভাবে একটি [অপটিমিস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups/) কন্ট্রাক্টের জন্য ডিজাইন করা হয়েছে।
- Yul+-কে Yul-এর একটি পরীক্ষামূলক আপগ্রেড প্রস্তাব হিসেবে দেখা যেতে পারে, যা এতে নতুন ফিচার যোগ করে।

### গুরুত্বপূর্ণ লিংক {#important-links-2}

- [Yul ডকুমেন্টেশন](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ ডকুমেন্টেশন](https://github.com/fuellabs/yulp)
- [Yul+ পরিচিতি পোস্ট](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### উদাহরণ কন্ট্রাক্ট {#example-contract-2}

নিচের সহজ উদাহরণটি একটি পাওয়ার ফাংশন বাস্তবায়ন করে। এটি `solc --strict-assembly --bin input.yul` ব্যবহার করে কম্পাইল করা যেতে পারে। উদাহরণটি input.yul ফাইলে সংরক্ষণ করা উচিত।

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

আপনার যদি আগে থেকেই স্মার্ট কন্ট্রাক্ট সম্পর্কে ভালো অভিজ্ঞতা থাকে, তবে Yul-এ একটি সম্পূর্ণ ERC-20 ইমপ্লিমেন্টেশন [এখানে](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) পাওয়া যাবে।

## Fe {#fe}

- ইথেরিয়াম ভার্চুয়াল মেশিন (EVM)-এর জন্য স্ট্যাটিক্যালি টাইপড ল্যাঙ্গুয়েজ।
- Python এবং Rust দ্বারা অনুপ্রাণিত।
- এটি শেখা সহজ করার লক্ষ্য রাখে -- এমনকি ইথেরিয়াম ইকোসিস্টেমে নতুন ডেভেলপারদের জন্যও।
- Fe ডেভেলপমেন্ট এখনও প্রাথমিক পর্যায়ে রয়েছে, 2021 সালের জানুয়ারিতে ল্যাঙ্গুয়েজটির আলফা রিলিজ হয়েছিল।

### গুরুত্বপূর্ণ লিংক {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe ঘোষণা](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 রোডম্যাপ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe ডিসকর্ড চ্যাট](https://discord.com/invite/ywpkAXFjZH)
- [Fe টুইটার](https://twitter.com/official_fe)

### উদাহরণ কন্ট্রাক্ট {#example-contract-3}

নিচে Fe-তে বাস্তবায়িত একটি সাধারণ কন্ট্রাক্ট দেওয়া হলো।

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## কীভাবে বেছে নেবেন {#how-to-choose}

অন্য যেকোনো প্রোগ্রামিং ল্যাঙ্গুয়েজের মতো, এটি মূলত সঠিক কাজের জন্য সঠিক টুল বেছে নেওয়ার পাশাপাশি ব্যক্তিগত পছন্দের ওপর নির্ভর করে।

আপনি যদি এখনও কোনো ল্যাঙ্গুয়েজ ব্যবহার করে না থাকেন, তবে এখানে কিছু বিষয় বিবেচনা করতে পারেন:

### Solidity-এর দারুণ দিক কী? {#solidity-advantages}

- আপনি যদি একজন শিক্ষানবিস হন, তবে এর জন্য অনেক টিউটোরিয়াল এবং শেখার টুল রয়েছে। [কোডিংয়ের মাধ্যমে শিখুন](/developers/learning-tools/) বিভাগে এ সম্পর্কে আরও দেখুন।
- ভালো ডেভেলপার টুলিং পাওয়া যায়।
- Solidity-এর একটি বড় ডেভেলপার কমিউনিটি রয়েছে, যার মানে হলো আপনি খুব দ্রুত আপনার প্রশ্নের উত্তর খুঁজে পাবেন।

### Vyper-এর দারুণ দিক কী? {#vyper-advatages}

- যেসব Python ডেভেলপার স্মার্ট কন্ট্রাক্ট লিখতে চান, তাদের জন্য শুরু করার একটি দারুণ উপায়।
- Vyper-এ ফিচারের সংখ্যা কম, যা আইডিয়াগুলোর দ্রুত প্রোটোটাইপিংয়ের জন্য এটিকে দারুণ করে তোলে।
- Vyper-এর লক্ষ্য হলো অডিট করা সহজ হওয়া এবং মানুষের পড়ার জন্য সর্বোচ্চ উপযোগী হওয়া।

### Yul এবং Yul+-এর দারুণ দিক কী? {#yul-advantages}

- সহজ এবং কার্যকরী লো-লেভেল ল্যাঙ্গুয়েজ।
- র (raw) EVM-এর অনেক কাছাকাছি যাওয়ার সুযোগ দেয়, যা আপনার কন্ট্রাক্টগুলোর গ্যাস ব্যবহার অপ্টিমাইজ করতে সাহায্য করতে পারে।

## ল্যাঙ্গুয়েজগুলোর তুলনা {#language-comparisons}

বেসিক সিনট্যাক্স, কন্ট্রাক্ট লাইফসাইকেল, ইন্টারফেস, অপারেটর, ডেটা স্ট্রাকচার, ফাংশন, কন্ট্রোল ফ্লো এবং আরও অনেক কিছুর তুলনার জন্য Auditless-এর এই [চিটশিটটি দেখুন](https://reference.auditless.com/cheatsheet/)

## আরও পড়ুন {#further-reading}

- [ওপেনজেপেলিন-এর Solidity কন্ট্রাক্ট লাইব্রেরি](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity বাই এক্সাম্পল](https://solidity-by-example.org)