---
title: "স্মার্ট কন্ট্র্যাক্ট ল্যাঙ্গুয়েজ"
description: "দুটি প্রধান স্মার্ট কন্ট্র্যাক্ট ল্যাঙ্গুয়েজ – Solidity এবং Vyper-এর একটি সংক্ষিপ্ত বিবরণ এবং তুলনা।"
lang: bn
---

Ethereum-এর একটি চমৎকার দিক হলো, স্মার্ট কন্ট্র্যাক্টগুলোকে তুলনামূলকভাবে ডেভেলপার-বান্ধব ল্যাঙ্গুয়েজ ব্যবহার করে প্রোগ্রাম করা যায়। আপনি যদি Python বা যেকোনো [কার্লি-ব্র্যাকেট ল্যাঙ্গুয়েজ](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)-এ অভিজ্ঞ হন, তাহলে আপনি পরিচিত সিনট্যাক্সসহ একটি ল্যাঙ্গুয়েজ খুঁজে পেতে পারেন।

দুটি সর্বাধিক সক্রিয় এবং রক্ষণাবেক্ষণ করা ল্যাঙ্গুয়েজ হলো:

- Solidity
- Vyper

Remix IDE, Solidity এবং Vyper উভয় ক্ষেত্রেই কন্ট্র্যাক্ট তৈরি এবং পরীক্ষা করার জন্য একটি ব্যাপক ডেভেলপমেন্ট এনভায়রনমেন্ট সরবরাহ করে। কোডিং শুরু করতে [ইন-ব্রাউজার Remix IDE ব্যবহার করে দেখুন](https://remix.ethereum.org)।

আরও অভিজ্ঞ ডেভেলপাররাও Yul, [ইথিরিয়াম ভার্চুয়াল মেশিন](/developers/docs/evm/)-এর জন্য একটি মধ্যবর্তী ল্যাঙ্গুয়েজ, অথবা Yul+, যা Yul-এর একটি এক্সটেনশন, ব্যবহার করতে চাইতে পারেন।

আপনি যদি কৌতূহলী হন এবং এমন নতুন ল্যাঙ্গুয়েজ পরীক্ষা করতে সাহায্য করতে চান যা এখনও ব্যাপকভাবে ডেভলপ করা হচ্ছে, তাহলে আপনি Fe নিয়ে পরীক্ষা করতে পারেন, এটি একটি উদীয়মান স্মার্ট কন্ট্র্যাক্ট ল্যাঙ্গুয়েজ যা বর্তমানে এখনও শৈশবাবস্থায় রয়েছে।

## পূর্বশর্ত {#prerequisites}

প্রোগ্রামিং ল্যাঙ্গুয়েজের, বিশেষ করে JavaScript বা Python-এর পূর্ববর্তী জ্ঞান, আপনাকে স্মার্ট কন্ট্র্যাক্ট ল্যাঙ্গুয়েজগুলোর পার্থক্য বুঝতে সাহায্য করতে পারে। ল্যাঙ্গুয়েজগুলোর তুলনার গভীরে যাওয়ার আগে আমরা আপনাকে একটি ধারণা হিসেবে স্মার্ট কন্ট্র্যাক্টগুলো বোঝারও পরামর্শ দিই। [স্মার্ট কন্ট্র্যাক্টের ভূমিকা](/developers/docs/smart-contracts/)।

## Solidity {#solidity}

- স্মার্ট কন্ট্র্যাক্ট বাস্তবায়নের জন্য অবজেক্ট-ওরিয়েন্টেড, হাই-লেভেল ল্যাঙ্গুয়েজ।
- কার্লি-ব্র্যাকেট ল্যাঙ্গুয়েজ যা C++ দ্বারা সবচেয়ে গভীরভাবে প্রভাবিত।
- স্ট্যাটিক্যালি টাইপড (কম্পাইল করার সময় একটি ভেরিয়েবলের টাইপ জানা যায়)।
- সাপোর্ট করে:
  - ইনহেরিটেন্স (আপনি অন্যান্য কন্ট্র্যাক্টকে প্রসারিত করতে পারেন)।
  - লাইব্রেরি (আপনি পুনঃব্যবহারযোগ্য কোড তৈরি করতে পারেন যা আপনি বিভিন্ন কন্ট্র্যাক্ট থেকে কল করতে পারেন – যেমন অন্যান্য অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং ল্যাঙ্গুয়েজে একটি স্ট্যাটিক ক্লাসের স্ট্যাটিক ফাংশন)।
  - জটিল ব্যবহারকারী-সংজ্ঞায়িত টাইপ।

### গুরুত্বপূর্ণ লিঙ্ক {#important-links}

- [নথিপত্র](https://docs.soliditylang.org/en/latest/)
- [Solidity ল্যাঙ্গুয়েজ পোর্টাল](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter চ্যাটরুম](https://gitter.im/ethereum/solidity) [Solidity Matrix চ্যাটরুম](https://matrix.to/#/#ethereum_solidity:gitter.im)-এর সাথে ব্রিজ করা
- [চিট শিট](https://reference.auditless.com/cheatsheet)
- [Solidity ব্লগ](https://blog.soliditylang.org/)
- [Solidity টুইটার](https://twitter.com/solidity_lang)

### উদাহরণ কন্ট্র্যাক্ট {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

এই উদাহরণটি আপনাকে Solidity কন্ট্র্যাক্টের সিনট্যাক্স কেমন সে সম্পর্কে একটি ধারণা দেবে। ফাংশন এবং ভেরিয়েবলগুলোর আরও বিস্তারিত বিবরণের জন্য, [ডকুমেন্টেশন দেখুন](https://docs.soliditylang.org/en/latest/contracts.html)।

## Vyper {#vyper}

- পাইথনিক প্রোগ্রামিং ল্যাঙ্গুয়েজ
- স্ট্রং টাইপিং
- ছোট এবং বোধগম্য কম্পাইলার কোড
- দক্ষ বাইটকোড জেনারেশন
- কন্ট্র্যাক্টগুলোকে আরও সুরক্ষিত এবং অডিট করা সহজ করার লক্ষ্যে এতে ইচ্ছাকৃতভাবে Solidity-এর চেয়ে কম বৈশিষ্ট্য রয়েছে। Vyper সাপোর্ট করে না:
  - মডিফায়ার
  - ইনহেরিটেন্স
  - ইনলাইন অ্যাসেম্বলি
  - ফাংশন ওভারলোডিং
  - অপারেটর ওভারলোডিং
  - রিকার্সিভ কলিং
  - অসীম দৈর্ঘ্যের লুপ
  - বাইনারি ফিক্সড পয়েন্ট

আরও তথ্যের জন্য, [Vyper-এর মূলনীতি পড়ুন](https://vyper.readthedocs.io/en/latest/index.html)।

### গুরুত্বপূর্ণ লিঙ্ক {#important-links-1}

- [নথিপত্র](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper কমিউনিটি ডিসকর্ড চ্যাট](https://discord.gg/SdvKC79cJk)
- [চিট শিট](https://reference.auditless.com/cheatsheet)
- [Vyper-এর জন্য স্মার্ট কন্ট্র্যাক্ট ডেভেলপমেন্ট ফ্রেমওয়ার্ক এবং টুলস](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper স্মার্ট কন্ট্র্যাক্ট সুরক্ষিত করতে এবং হ্যাক করতে শিখুন](https://github.com/SupremacyTeam/VyperPunk)
- [ডেভেলপমেন্টের জন্য Vyper হাব](https://github.com/zcor/vyper-dev)
- [Vyper গ্রেটেস্ট হিটস স্মার্ট কন্ট্র্যাক্টের উদাহরণ](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [অসাধারণ Vyper কিউরেটেড রিসোর্স](https://github.com/spadebuilders/awesome-vyper)

### উদাহরণ {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e., they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

এই উদাহরণটি আপনাকে Vyper কন্ট্র্যাক্টের সিনট্যাক্স কেমন সে সম্পর্কে একটি ধারণা দেবে। ফাংশন এবং ভেরিয়েবলগুলোর আরও বিস্তারিত বিবরণের জন্য, [ডকুমেন্টেশন দেখুন](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)।

## Yul and Yul+ {#yul}

আপনি যদি Ethereum-এ নতুন হন এবং এখনও স্মার্ট কন্ট্র্যাক্ট ল্যাঙ্গুয়েজ দিয়ে কোনো কোডিং না করে থাকেন, তবে আমরা Solidity বা Vyper দিয়ে শুরু করার পরামর্শ দিই। আপনি স্মার্ট কন্ট্র্যাক্টের নিরাপত্তার সেরা অনুশীলন এবং EVM-এর সাথে কাজ করার নির্দিষ্ট বিষয়গুলোর সাথে পরিচিত হওয়ার পরেই কেবল Yul বা Yul+ নিয়ে দেখুন।

**Yul**

- Ethereum-এর জন্য মধ্যবর্তী ল্যাঙ্গুয়েজ।
- [EVM](/developers/docs/evm) এবং [Ewasm](https://github.com/ewasm), যা একটি Ethereum ফ্লেভারযুক্ত WebAssembly, সাপোর্ট করে এবং এটি উভয় প্ল্যাটফর্মের একটি ব্যবহারযোগ্য সাধারণ ডিনোমিনেটর হিসাবে ডিজাইন করা হয়েছে।
- উচ্চ-স্তরের অপ্টিমাইজেশন পর্যায়ের জন্য ভালো টার্গেট যা EVM এবং Ewasm উভয় প্ল্যাটফর্মকে সমানভাবে উপকৃত করতে পারে।

**Yul+**

- Yul-এর একটি নিম্ন-স্তরের, অত্যন্ত দক্ষ এক্সটেনশন।
- প্রাথমিকভাবে একটি [অপ্টিমেস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups/) কন্ট্র্যাক্টের জন্য ডিজাইন করা হয়েছে।
- Yul+-কে Yul-এর একটি পরীক্ষামূলক আপগ্রেড প্রস্তাব হিসাবে দেখা যেতে পারে, যা এতে নতুন বৈশিষ্ট্য যুক্ত করে।

### গুরুত্বপূর্ণ লিঙ্ক {#important-links-2}

- [Yul নথিপত্র](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ নথিপত্র](https://github.com/fuellabs/yulp)
- [Yul+ পরিচিতি পোস্ট](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### উদাহরণ কন্ট্র্যাক্ট {#example-contract-2}

নিম্নলিখিত সহজ উদাহরণটি একটি পাওয়ার ফাংশন বাস্তবায়ন করে। `solc --strict-assembly --bin input.yul` ব্যবহার করে এটি কম্পাইল করা যেতে পারে। উদাহরণটি
input.yul ফাইলে সংরক্ষণ করা উচিত।

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

আপনি যদি ইতিমধ্যেই স্মার্ট কন্ট্র্যাক্টে বেশ অভিজ্ঞ হন, তাহলে Yul-এ একটি সম্পূর্ণ ERC20 ইমপ্লিমেন্টেশন [এখানে](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) পাওয়া যাবে।

## Fe {#fe}

- ইথিরিয়াম ভার্চুয়াল মেশিন (EVM)-এর জন্য স্ট্যাটিক্যালি টাইপড ল্যাঙ্গুয়েজ।
- Python এবং Rust দ্বারা অনুপ্রাণিত।
- শেখা সহজ করার লক্ষ্য রাখে -- এমনকি Ethereum ইকোসিস্টেমে নতুন ডেভেলপারদের জন্যও।
- Fe-এর ডেভেলপমেন্ট এখনও প্রাথমিক পর্যায়ে রয়েছে, ল্যাঙ্গুয়েজটির আলফা রিলিজ হয়েছিল জানুয়ারী ২০২১-এ।

### গুরুত্বপূর্ণ লিঙ্ক {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe ঘোষণা](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 রোডম্যাপ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe ডিসকর্ড চ্যাট](https://discord.com/invite/ywpkAXFjZH)
- [Fe টুইটার](https://twitter.com/official_fe)

### উদাহরণ কন্ট্র্যাক্ট {#example-contract-3}

নিম্নলিখিতটি Fe-তে বাস্তবায়িত একটি সাধারণ কন্ট্র্যাক্ট।

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

অন্যান্য যেকোনো প্রোগ্রামিং ল্যাঙ্গুয়েজের মতোই, এটি মূলত সঠিক কাজের জন্য সঠিক টুল বেছে নেওয়ার এবং সেইসাথে ব্যক্তিগত পছন্দের বিষয়।

আপনি যদি এখনও কোনো ল্যাঙ্গুয়েজ চেষ্টা না করে থাকেন, তবে এখানে কয়েকটি বিষয় বিবেচনা করার জন্য দেওয়া হল:

### Solidity-র চমৎকার দিকগুলো কী? {#solidity-advantages}

- আপনি যদি একজন শিক্ষানবিস হন, তাহলে অনেক টিউটোরিয়াল এবং শেখার টুলস রয়েছে। এ সম্পর্কে আরও দেখুন [কোডিং করে শিখুন](/developers/learning-tools/) বিভাগে।
- ভালো ডেভেলপার টুলিং উপলব্ধ।
- Solidity-র একটি বড় ডেভেলপার কমিউনিটি রয়েছে, যার মানে হল আপনি খুব সম্ভবত আপনার প্রশ্নের উত্তর বেশ দ্রুত খুঁজে পাবেন।

### Vyper-এর চমৎকার দিকগুলো কী? {#vyper-advatages}

- Python ডেভেলপারদের জন্য শুরু করার দারুণ উপায়, যারা স্মার্ট কন্ট্র্যাক্ট লিখতে চান।
- Vyper-এ কম সংখ্যক বৈশিষ্ট্য রয়েছে যা এটিকে দ্রুত আইডিয়া প্রোটোটাইপ করার জন্য চমৎকার করে তোলে।
- Vyper-এর লক্ষ্য হল অডিট করা সহজ এবং সর্বাধিক মানব-পাঠযোগ্য হওয়া।

### Yul এবং Yul+-এর চমৎকার দিকগুলো কী? {#yul-advantages}

- সরল এবং কার্যকরী নিম্ন-স্তরের ল্যাঙ্গুয়েজ।
- এটি র' EVM-এর অনেক কাছাকাছি যাওয়ার সুযোগ দেয়, যা আপনার কন্ট্র্যাক্টগুলোর গ্যাস ব্যবহার অপ্টিমাইজ করতে সাহায্য করতে পারে।

## ল্যাঙ্গুয়েজগুলোর তুলনা {#language-comparisons}

বেসিক সিনট্যাক্স, কন্ট্র্যাক্ট লাইফসাইকেল, ইন্টারফেস, অপারেটর, ডেটা স্ট্রাকচার, ফাংশন, কন্ট্রোল ফ্লো এবং আরও অনেক কিছুর তুলনার জন্য Auditless-এর এই [চিটশিটটি](https://reference.auditless.com/cheatsheet/) দেখুন

## আরও পড়ুন {#further-reading}

- [OpenZeppelin-এর Solidity কন্ট্র্যাক্টস লাইব্রেরি](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
