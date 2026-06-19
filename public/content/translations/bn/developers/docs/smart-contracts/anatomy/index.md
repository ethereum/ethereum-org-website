---
title: স্মার্ট কন্ট্রাক্টের গঠন
description: একটি স্মার্ট কন্ট্রাক্টের গঠনের বিস্তারিত রূপ – এর ফাংশন, ডেটা এবং ভেরিয়েবল।
lang: bn
---

স্মার্ট কন্ট্রাক্ট হলো এমন একটি প্রোগ্রাম যা ইথেরিয়ামের একটি ঠিকানায় রান করে। এগুলো ডেটা এবং ফাংশন দিয়ে তৈরি যা কোনো ট্রানজ্যাকশন গ্রহণ করার পর এক্সিকিউট হতে পারে। নিচে একটি স্মার্ট কন্ট্রাক্ট কী কী দিয়ে তৈরি হয় তার একটি ওভারভিউ দেওয়া হলো।

## পূর্বশর্ত {#prerequisites}

প্রথমে নিশ্চিত করুন যে আপনি [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/) সম্পর্কে পড়েছেন। এই ডকুমেন্টটি ধরে নেয় যে আপনি ইতিমধ্যেই JavaScript বা Python-এর মতো প্রোগ্রামিং ভাষার সাথে পরিচিত।

## ডেটা {#data}

যেকোনো কন্ট্রাক্ট ডেটাকে অবশ্যই একটি লোকেশনে অ্যাসাইন করতে হবে: হয় `storage` অথবা `memory`-এ। একটি স্মার্ট কন্ট্রাক্টে স্টোরেজ পরিবর্তন করা ব্যয়বহুল, তাই আপনার ডেটা কোথায় থাকা উচিত তা বিবেচনা করা প্রয়োজন।

### স্টোরেজ {#storage}

স্থায়ী ডেটাকে স্টোরেজ বলা হয় এবং এটি স্টেট ভেরিয়েবল দ্বারা উপস্থাপন করা হয়। এই মানগুলো ব্লকচেইনে স্থায়ীভাবে সংরক্ষিত হয়। আপনাকে এর ধরন (type) ঘোষণা করতে হবে যাতে কন্ট্রাক্টটি কম্পাইল করার সময় ব্লকচেইনে এর কতটুকু স্টোরেজ প্রয়োজন তার হিসাব রাখতে পারে।

```solidity
// Solidity উদাহরণ
contract SimpleStorage {
    uint storedData; // স্টেট ভেরিয়েবল
    // ...
}
```

```python
# Vyper উদাহরণ
storedData: int128
```

আপনি যদি আগে থেকেই অবজেক্ট-ওরিয়েন্টেড ভাষায় প্রোগ্রামিং করে থাকেন, তবে আপনি সম্ভবত বেশিরভাগ ধরনের (types) সাথেই পরিচিত হবেন। তবে, আপনি যদি [ইথেরিয়াম](/) ডেভেলপমেন্টে নতুন হয়ে থাকেন, তবে `address` আপনার কাছে নতুন মনে হতে পারে।

একটি `address` টাইপ একটি ইথেরিয়াম ঠিকানা ধারণ করতে পারে যা 20 বাইট বা 160 বিটের সমান। এটি শুরুতে 0x যুক্ত হেক্সাডেসিমাল নোটেশনে রিটার্ন করে।

অন্যান্য টাইপগুলোর মধ্যে রয়েছে:

- বুলিয়ান (boolean)
- ইন্টিজার (integer)
- ফিক্সড পয়েন্ট নাম্বার (fixed point numbers)
- ফিক্সড-সাইজ বাইট অ্যারে (fixed-size byte arrays)
- ডায়নামিকালি সাইজড বাইট অ্যারে (dynamically sized byte arrays)
- র‍্যাশনাল এবং ইন্টিজার লিটারেল (rational and integer literals)
- স্ট্রিং লিটারেল (string literals)
- হেক্সাডেসিমাল লিটারেল (hexadecimal literals)
- এনাম (enums)

আরও ব্যাখ্যার জন্য, ডক্সগুলো দেখুন:

- [Vyper টাইপগুলো দেখুন](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity টাইপগুলো দেখুন](https://docs.soliditylang.org/en/latest/types.html#value-types)

### মেমরি {#memory}

যেসব মান শুধুমাত্র একটি কন্ট্রাক্ট ফাংশন এক্সিকিউট হওয়ার সময়কালের জন্য সংরক্ষিত থাকে, সেগুলোকে মেমরি ভেরিয়েবল বলা হয়। যেহেতু এগুলো ব্লকচেইনে স্থায়ীভাবে সংরক্ষিত হয় না, তাই এগুলো ব্যবহার করা অনেক বেশি সাশ্রয়ী।

ইভিএম (EVM) কীভাবে ডেটা সংরক্ষণ করে (স্টোরেজ, মেমরি এবং স্ট্যাক) সে সম্পর্কে [Solidity ডক্সে](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack) আরও জানুন।

### এনভায়রনমেন্ট ভেরিয়েবল {#environment-variables}

আপনার কন্ট্রাক্টে সংজ্ঞায়িত ভেরিয়েবলগুলো ছাড়াও, কিছু বিশেষ গ্লোবাল ভেরিয়েবল রয়েছে। এগুলো মূলত ব্লকচেইন বা বর্তমান ট্রানজ্যাকশন সম্পর্কে তথ্য প্রদান করতে ব্যবহৃত হয়।

উদাহরণ:

| **প্রপার্টি**          | **স্টেট ভেরিয়েবল** | **বিবরণ**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | বর্তমান ব্লক ইপক টাইমস্ট্যাম্প        |
| `msg.sender`      | address            | বার্তার প্রেরক (বর্তমান কল) |

## ফাংশন {#functions}

সবচেয়ে সহজ কথায়, ফাংশনগুলো আগত ট্রানজ্যাকশনের প্রতিক্রিয়ায় তথ্য পেতে বা সেট করতে পারে।

দুই ধরনের ফাংশন কল রয়েছে:

- `internal` – এগুলো কোনো EVM কল তৈরি করে না
  - ইন্টারনাল ফাংশন এবং স্টেট ভেরিয়েবলগুলো শুধুমাত্র অভ্যন্তরীণভাবে অ্যাক্সেস করা যায় (অর্থাৎ, বর্তমান কন্ট্রাক্ট বা এটি থেকে উদ্ভূত কন্ট্রাক্টগুলোর ভেতর থেকে)
- `external` – এগুলো EVM কল তৈরি করে
  - এক্সটারনাল ফাংশনগুলো কন্ট্রাক্ট ইন্টারফেসের অংশ, যার মানে হলো এগুলোকে অন্যান্য কন্ট্রাক্ট থেকে এবং ট্রানজ্যাকশনের মাধ্যমে কল করা যেতে পারে। একটি এক্সটারনাল ফাংশন `f`-কে অভ্যন্তরীণভাবে কল করা যায় না (অর্থাৎ, `f()` কাজ করে না, তবে `this.f()` কাজ করে)।

এগুলো `public` বা `private`-ও হতে পারে

- `public` ফাংশনগুলোকে কন্ট্রাক্টের ভেতর থেকে অভ্যন্তরীণভাবে বা বার্তার মাধ্যমে বাহ্যিকভাবে কল করা যেতে পারে
- `private` ফাংশনগুলো শুধুমাত্র সেই কন্ট্রাক্টের জন্যই দৃশ্যমান যেখানে এগুলো সংজ্ঞায়িত করা হয়েছে এবং উদ্ভূত (derived) কন্ট্রাক্টগুলোতে দৃশ্যমান নয়

ফাংশন এবং স্টেট ভেরিয়েবল উভয়কেই পাবলিক বা প্রাইভেট করা যেতে পারে

একটি কন্ট্রাক্টে স্টেট ভেরিয়েবল আপডেট করার জন্য একটি ফাংশন নিচে দেওয়া হলো:

```solidity
// Solidity উদাহরণ
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` টাইপের প্যারামিটার `value` ফাংশনে পাস করা হয়েছে: `update_name`
- এটি `public` হিসেবে ঘোষণা করা হয়েছে, যার মানে যে কেউ এটি অ্যাক্সেস করতে পারে
- এটি `view` হিসেবে ঘোষণা করা হয়নি, তাই এটি কন্ট্রাক্ট স্টেট পরিবর্তন করতে পারে

### ভিউ ফাংশন (View functions) {#view-functions}

এই ফাংশনগুলো কন্ট্রাক্টের ডেটার স্টেট পরিবর্তন না করার প্রতিশ্রুতি দেয়। এর সাধারণ উদাহরণ হলো "গেটার (getter)" ফাংশন – উদাহরণস্বরূপ, আপনি কোনো ব্যবহারকারীর ব্যালেন্স জানতে এটি ব্যবহার করতে পারেন।

```solidity
// Solidity উদাহরণ
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

স্টেট পরিবর্তন হিসেবে যা বিবেচনা করা হয়:

1. স্টেট ভেরিয়েবলে লেখা।
2. [ইভেন্ট এমিট করা](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)।
3. [অন্যান্য কন্ট্রাক্ট তৈরি করা](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)।
4. `selfdestruct` ব্যবহার করা।
5. কলের মাধ্যমে ইথার পাঠানো।
6. `view` বা `pure` হিসেবে চিহ্নিত নয় এমন কোনো ফাংশন কল করা।
7. লো-লেভেল কল ব্যবহার করা।
8. নির্দিষ্ট অপকোড (opcodes) ধারণকারী ইনলাইন অ্যাসেম্বলি ব্যবহার করা।

### কনস্ট্রাক্টর ফাংশন {#constructor-functions}

`constructor` ফাংশনগুলো শুধুমাত্র একবার এক্সিকিউট হয় যখন কন্ট্রাক্টটি প্রথমবার ডিপ্লয় করা হয়। অনেক ক্লাস-ভিত্তিক প্রোগ্রামিং ভাষার `constructor`-এর মতো, এই ফাংশনগুলো প্রায়শই স্টেট ভেরিয়েবলগুলোকে তাদের নির্দিষ্ট মান দিয়ে ইনিশিয়ালাইজ করে।

```solidity
// Solidity উদাহরণ
// কন্ট্রাক্ট-এর ডেটা ইনিশিয়ালাইজ করে, `owner` সেট করে
// কন্ট্রাক্ট তৈরি করার ব্যক্তির ঠিকানায়।
constructor() public {
    // সব স্মার্ট কন্ট্রাক্ট এর ফাংশনগুলো ট্রিগার করার জন্য এক্সটার্নাল ট্রানজ্যাকশন-এর ওপর নির্ভর করে।
    // `msg` হলো একটি গ্লোবাল ভেরিয়েবল যা প্রদত্ত ট্রানজ্যাকশন সম্পর্কে প্রাসঙ্গিক ডেটা ধারণ করে,
    // যেমন প্রেরকের ঠিকানা এবং ট্রানজ্যাকশন-এ অন্তর্ভুক্ত ETH-এর পরিমাণ।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper উদাহরণ

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### বিল্ট-ইন ফাংশন {#built-in-functions}

আপনার কন্ট্রাক্টে সংজ্ঞায়িত ভেরিয়েবল এবং ফাংশনগুলো ছাড়াও, কিছু বিশেষ বিল্ট-ইন ফাংশন রয়েছে। এর সবচেয়ে সুস্পষ্ট উদাহরণ হলো:

- `address.send()` – Solidity
- `send(address)` – Vyper

এগুলো কন্ট্রাক্টগুলোকে অন্যান্য অ্যাকাউন্টে ETH পাঠানোর অনুমতি দেয়।

## ফাংশন লেখা {#writing-functions}

আপনার ফাংশনের জন্য যা প্রয়োজন:

- প্যারামিটার ভেরিয়েবল এবং টাইপ (যদি এটি প্যারামিটার গ্রহণ করে)
- internal/external-এর ঘোষণা
- pure/view/payable-এর ঘোষণা
- রিটার্ন টাইপ (যদি এটি কোনো মান রিটার্ন করে)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // স্টেট ভেরিয়েবল

    // কন্ট্রাক্ট ডিপ্লয় করার সময় কল করা হয় এবং মান ইনিশিয়ালাইজ করে
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get ফাংশন
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set ফাংশন
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

একটি সম্পূর্ণ কন্ট্রাক্ট দেখতে অনেকটা এরকম হতে পারে। এখানে `constructor` ফাংশনটি `dapp_name` ভেরিয়েবলের জন্য একটি প্রাথমিক মান প্রদান করে।

## ইভেন্ট এবং লগ {#events-and-logs}

ইভেন্ট আপনার স্মার্ট কন্ট্রাক্টকে আপনার ফ্রন্টএন্ড বা অন্যান্য সাবস্ক্রাইবিং অ্যাপ্লিকেশনের সাথে যোগাযোগ করতে সক্ষম করে। একবার কোনো ট্রানজ্যাকশন যাচাই হয়ে ব্লকে যুক্ত হলে, স্মার্ট কন্ট্রাক্টগুলো ইভেন্ট এমিট করতে পারে এবং তথ্য লগ করতে পারে, যা ফ্রন্টএন্ড পরবর্তীতে প্রসেস করে ব্যবহার করতে পারে।

## টীকাযুক্ত উদাহরণ {#annotated-examples}

এগুলো Solidity-তে লেখা কিছু উদাহরণ। আপনি যদি কোড নিয়ে কাজ করতে চান, তবে আপনি [Remix](https://remix.ethereum.org)-এ এগুলোর সাথে ইন্টারঅ্যাক্ট করতে পারেন।

### হ্যালো ওয়ার্ল্ড (Hello world) {#hello-world}

```solidity
// সিম্যান্টিক ভার্সনিং ব্যবহার করে Solidity-এর ভার্সন নির্দিষ্ট করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` নামের একটি কন্ট্রাক্ট সংজ্ঞায়িত করে।
// একটি কন্ট্রাক্ট হলো ফাংশন এবং ডেটার (এর স্টেট) একটি সংগ্রহ।
// একবার ডিপ্লয় করা হলে, একটি কন্ট্রাক্ট ইথেরিয়াম ব্লকচেইন-এর একটি নির্দিষ্ট ঠিকানায় অবস্থান করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` টাইপের একটি স্টেট ভেরিয়েবল `message` ঘোষণা করে।
    // স্টেট ভেরিয়েবল হলো সেই ভেরিয়েবল যার মান স্থায়ীভাবে কন্ট্রাক্ট স্টোরেজে সংরক্ষিত থাকে।
    // `public` কিওয়ার্ডটি ভেরিয়েবলগুলোকে কন্ট্রাক্ট-এর বাইরে থেকে অ্যাক্সেসযোগ্য করে তোলে
    // এবং এমন একটি ফাংশন তৈরি করে যা অন্য কন্ট্রাক্ট বা ক্লায়েন্টরা মান অ্যাক্সেস করতে কল করতে পারে।
    string public message;

    // অনেক ক্লাস-ভিত্তিক অবজেক্ট-ওরিয়েন্টেড ভাষার মতো, একটি কনস্ট্রাক্টর হলো
    // একটি বিশেষ ফাংশন যা শুধুমাত্র কন্ট্রাক্ট তৈরি করার সময় এক্সিকিউট হয়।
    // কনস্ট্রাক্টর ব্যবহার করা হয় কন্ট্রাক্ট-এর ডেটা ইনিশিয়ালাইজ করার জন্য।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // একটি স্ট্রিং আর্গুমেন্ট `initMessage` গ্রহণ করে এবং মান সেট করে
        // কন্ট্রাক্ট-এর `message` স্টোরেজ ভেরিয়েবলে)।
        message = initMessage;
    }

    // একটি পাবলিক ফাংশন যা একটি স্ট্রিং আর্গুমেন্ট গ্রহণ করে
    // এবং `message` স্টোরেজ ভেরিয়েবল আপডেট করে।
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### টোকেন {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // একটি `address` (ঠিকানা) ইমেইল ঠিকানার সাথে তুলনীয় - এটি ইথেরিয়াম-এ একটি অ্যাকাউন্ট শনাক্ত করতে ব্যবহৃত হয়।
    // ঠিকানাগুলো একটি স্মার্ট কন্ট্রাক্ট বা এক্সটার্নাল (ব্যবহারকারী) অ্যাকাউন্টকে উপস্থাপন করতে পারে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // একটি `mapping` মূলত একটি হ্যাশ টেবিল ডেটা স্ট্রাকচার।
    // এই `mapping` একটি ঠিকানায় (টোকেন হোল্ডার) একটি আনসাইনড ইন্টিজার (টোকেন ব্যালেন্স) অ্যাসাইন করে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // ইভেন্ট ব্লকচেইন-এ অ্যাক্টিভিটি লগ করার অনুমতি দেয়।
    // কন্ট্রাক্ট স্টেট পরিবর্তনের প্রতিক্রিয়া জানাতে ইথেরিয়াম ক্লায়েন্টরা ইভেন্ট শুনতে পারে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // কন্ট্রাক্ট-এর ডেটা ইনিশিয়ালাইজ করে, `owner` সেট করে
    // কন্ট্রাক্ট তৈরি করার ব্যক্তির ঠিকানায়।
    constructor() public {
        // সব স্মার্ট কন্ট্রাক্ট এর ফাংশনগুলো ট্রিগার করার জন্য এক্সটার্নাল ট্রানজ্যাকশন-এর ওপর নির্ভর করে।
        // `msg` হলো একটি গ্লোবাল ভেরিয়েবল যা প্রদত্ত ট্রানজ্যাকশন সম্পর্কে প্রাসঙ্গিক ডেটা ধারণ করে,
        // যেমন প্রেরকের ঠিকানা এবং ট্রানজ্যাকশন-এ অন্তর্ভুক্ত ETH-এর পরিমাণ।
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // কিছু পরিমাণ নতুন টোকেন তৈরি করে এবং সেগুলোকে একটি ঠিকানায় পাঠায়।
    function mint(address receiver, uint amount) public {
        // `require` হলো একটি কন্ট্রোল স্ট্রাকচার যা নির্দিষ্ট শর্ত প্রয়োগ করতে ব্যবহৃত হয়।
        // যদি একটি `require` স্টেটমেন্ট `false` মূল্যায়ন করে, তবে একটি এক্সেপশন ট্রিগার হয়,
        // যা বর্তমান কলের সময় স্টেট-এ করা সমস্ত পরিবর্তন বাতিল (revert) করে দেয়।
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // শুধুমাত্র কন্ট্রাক্ট মালিক এই ফাংশনটি কল করতে পারেন
        require(msg.sender == owner, "You are not the owner.");

        // টোকেন-এর সর্বোচ্চ পরিমাণ প্রয়োগ করে
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver`-এর ব্যালেন্স `amount` পরিমাণ বাড়ায়
        balances[receiver] += amount;
    }

    // যেকোনো কলার থেকে একটি ঠিকানায় কিছু পরিমাণ বিদ্যমান টোকেন পাঠায়।
    function transfer(address receiver, uint amount) public {
        // প্রেরকের কাছে পাঠানোর মতো পর্যাপ্ত টোকেন থাকতে হবে
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // দুটি ঠিকানার টোকেন ব্যালেন্স সমন্বয় করে
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // আগে সংজ্ঞায়িত ইভেন্ট এমিট করে
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### অনন্য ডিজিটাল সম্পদ {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// অন্যান্য ফাইল থেকে বর্তমান কন্ট্রাক্ট-এ সিম্বল ইমপোর্ট করে।
// এই ক্ষেত্রে, OpenZeppelin থেকে হেল্পার কন্ট্রাক্ট-এর একটি সিরিজ।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` কিওয়ার্ডটি এক্সটার্নাল কন্ট্রাক্ট থেকে ফাংশন এবং কিওয়ার্ড ইনহেরিট করতে ব্যবহৃত হয়।
// এই ক্ষেত্রে, `CryptoPizza` `IERC721` এবং `ERC165` কন্ট্রাক্ট থেকে ইনহেরিট করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // নিরাপদে গাণিতিক অপারেশন করতে OpenZeppelin-এর SafeMath লাইব্রেরি ব্যবহার করে।
    // আরও জানুন: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity-তে কনস্ট্যান্ট স্টেট ভেরিয়েবলগুলো অন্যান্য ভাষার মতোই
    // তবে আপনাকে এমন একটি এক্সপ্রেশন থেকে অ্যাসাইন করতে হবে যা কম্পাইল করার সময় কনস্ট্যান্ট থাকে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct টাইপ আপনাকে নিজের টাইপ সংজ্ঞায়িত করতে দেয়
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza স্ট্রাক্ট-এর একটি খালি অ্যারে তৈরি করে
    Pizza[] public pizzas;

    // পিজা ID থেকে এর মালিকের ঠিকানায় ম্যাপিং
    mapping(uint256 => address) public pizzaToOwner;

    // মালিকের ঠিকানা থেকে মালিকানাধীন টোকেন-এর সংখ্যায় ম্যাপিং
    mapping(address => uint256) public ownerPizzaCount;

    // টোকেন ID থেকে অনুমোদিত ঠিকানায় ম্যাপিং
    mapping(uint256 => address) pizzaApprovals;

    // আপনি ম্যাপিং নেস্ট করতে পারেন, এই উদাহরণটি মালিক থেকে অপারেটর অনুমোদনগুলোতে ম্যাপ করে
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // স্ট্রিং (নাম) এবং DNA থেকে একটি র‍্যান্ডম পিজা তৈরি করার ইন্টারনাল ফাংশন
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` কিওয়ার্ডের মানে হলো এই ফাংশনটি শুধুমাত্র দৃশ্যমান
        // এই কন্ট্রাক্ট এবং এই কন্ট্রাক্ট থেকে ডিরাইভ করা কন্ট্রাক্টগুলোর মধ্যে
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` হলো একটি ফাংশন মডিফায়ার যা পিজাটি আগে থেকেই আছে কিনা তা চেক করে
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // পিজাগুলোর অ্যারেতে পিজা যোগ করে এবং id পায়
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // পিজার মালিক বর্তমান ব্যবহারকারীর সমান কিনা তা চেক করে
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // লক্ষ্য করুন যে address(0) হলো জিরো ঠিকানা,
        // যা নির্দেশ করে যে pizza[id] এখনও কোনো নির্দিষ্ট ব্যবহারকারীকে বরাদ্দ করা হয়নি।

        assert(pizzaToOwner[id] == address(0));

        // পিজাকে মালিকের সাথে ম্যাপ করে
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // স্ট্রিং (নাম) থেকে একটি র‍্যান্ডম পিজা তৈরি করে
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // স্ট্রিং (নাম) এবং মালিকের (স্রষ্টা) ঠিকানা থেকে র‍্যান্ডম DNA জেনারেট করে
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` হিসেবে চিহ্নিত ফাংশনগুলো স্টেট থেকে রিড বা মডিফাই না করার প্রতিশ্রুতি দেয়
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // স্ট্রিং (নাম) + ঠিকানা (মালিক) থেকে র‍্যান্ডম uint জেনারেট করে
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // মালিকের পাওয়া পিজাগুলোর অ্যারে রিটার্ন করে
    function getPizzasByOwner(address _owner)
        public
        // `view` হিসেবে চিহ্নিত ফাংশনগুলো স্টেট মডিফাই না করার প্রতিশ্রুতি দেয়
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // মানগুলো সংরক্ষণ করতে `memory` স্টোরেজ লোকেশন ব্যবহার করে শুধুমাত্র
        // এই ফাংশন কলের লাইফসাইকেলের জন্য।
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // পিজা এবং মালিকানা অন্য ঠিকানায় ট্রান্সফার করে
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // ইমপোর্ট করা IERC721 কন্ট্রাক্ট-এ সংজ্ঞায়িত ইভেন্ট এমিট করে
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * একটি নির্দিষ্ট টোকেন ID-এর মালিকানা নিরাপদে অন্য ঠিকানায় ট্রান্সফার করে
     * যদি টার্গেট ঠিকানাটি একটি কন্ট্রাক্ট হয়, তবে এটিকে অবশ্যই `onERC721Received` ইমপ্লিমেন্ট করতে হবে,
     * যা একটি নিরাপদ ট্রান্সফারের সময় কল করা হয়, এবং ম্যাজিক ভ্যালু রিটার্ন করে
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * অন্যথায়, ট্রান্সফারটি বাতিল (revert) করা হয়।
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * একটি নির্দিষ্ট টোকেন ID-এর মালিকানা নিরাপদে অন্য ঠিকানায় ট্রান্সফার করে
     * যদি টার্গেট ঠিকানাটি একটি কন্ট্রাক্ট হয়, তবে এটিকে অবশ্যই `onERC721Received` ইমপ্লিমেন্ট করতে হবে,
     * যা একটি নিরাপদ ট্রান্সফারের সময় কল করা হয়, এবং ম্যাজিক ভ্যালু রিটার্ন করে
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * অন্যথায়, ট্রান্সফারটি বাতিল (revert) করা হয়।
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * একটি টার্গেট ঠিকানায় `onERC721Received` ইনভোক করার ইন্টারনাল ফাংশন
     * টার্গেট ঠিকানাটি কন্ট্রাক্ট না হলে কলটি এক্সিকিউট হয় না
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // একটি পিজা বার্ন করে - টোকেন সম্পূর্ণভাবে ধ্বংস করে
    // `external` ফাংশন মডিফায়ারের মানে হলো এই ফাংশনটি
    // কন্ট্রাক্ট ইন্টারফেসের অংশ এবং অন্যান্য কন্ট্রাক্ট এটিকে কল করতে পারে
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // ঠিকানা অনুযায়ী পিজার সংখ্যা রিটার্ন করে
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id দ্বারা পাওয়া পিজার মালিককে রিটার্ন করে
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // পিজার মালিকানা ট্রান্সফার করতে অন্য ঠিকানাকে অনুমোদন করে
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // নির্দিষ্ট পিজার জন্য অনুমোদিত ঠিকানা রিটার্ন করে
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * একটি নির্দিষ্ট টোকেন ID-এর বর্তমান অনুমোদন ক্লিয়ার করার প্রাইভেট ফাংশন
     * প্রদত্ত ঠিকানাটি টোকেন-এর প্রকৃত মালিক না হলে রিভার্ট করে
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * একজন নির্দিষ্ট অপারেটরের অনুমোদন সেট বা আনসেট করে
     * একজন অপারেটর প্রেরকের পক্ষে তার সমস্ত টোকেন ট্রান্সফার করার অনুমতি পায়
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // একজন নির্দিষ্ট মালিক দ্বারা একজন অপারেটর অনুমোদিত কিনা তা জানায়
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // পিজার মালিকানা গ্রহণ করে - শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // পিজা আছে কিনা তা চেক করে
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // ঠিকানাটি মালিক কিনা বা পিজা ট্রান্সফার করার জন্য অনুমোদিত কিনা তা চেক করে
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // solium চেক নিষ্ক্রিয় করুন কারণ
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // পিজাটি ইউনিক কিনা এবং এখনও বিদ্যমান নেই কিনা তা চেক করুন
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // টার্গেট ঠিকানাটি একটি কন্ট্রাক্ট কিনা তা রিটার্ন করে
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // বর্তমানে কোনো ঠিকানায় কন্ট্রাক্ট আছে কিনা তা চেক করার এর চেয়ে ভালো কোনো উপায় নেই
        // সেই ঠিকানায় কোডের সাইজ চেক করা ছাড়া।
        // দেখুন https://ethereum.stackexchange.com/a/14016/36603
        // এটি কীভাবে কাজ করে সে সম্পর্কে আরও বিস্তারিত জানতে।
        // TODO Serenity রিলিজের আগে এটি আবার চেক করুন, কারণ তখন সমস্ত ঠিকানা
        // কন্ট্রাক্ট হবে।
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## আরও পড়ুন {#further-reading}

স্মার্ট কন্ট্রাক্টের আরও সম্পূর্ণ ওভারভিউ পেতে Solidity এবং Vyper-এর ডকুমেন্টেশন দেখুন:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## সম্পর্কিত টপিক {#related-topics}

- [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/)
- [ইথেরিয়াম ভার্চুয়াল মেশিন](/developers/docs/evm/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [কন্ট্রাক্টের সাইজ লিমিট এড়াতে কন্ট্রাক্ট ছোট করা](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– আপনার স্মার্ট কন্ট্রাক্টের সাইজ কমানোর জন্য কিছু ব্যবহারিক টিপস।_
- [ইভেন্টের মাধ্যমে স্মার্ট কন্ট্রাক্ট থেকে ডেটা লগ করা](/developers/tutorials/logging-events-smart-contracts/) _– স্মার্ট কন্ট্রাক্ট ইভেন্টের পরিচিতি এবং ডেটা লগ করার জন্য আপনি কীভাবে সেগুলো ব্যবহার করতে পারেন।_
- [Solidity থেকে অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– কীভাবে একটি বিদ্যমান কন্ট্রাক্ট থেকে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয়।_