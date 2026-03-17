---
title: "স্মার্ট কন্ট্র্যাক্টের অ্যানাটমি"
description: "একটি স্মার্ট কন্ট্রাক্টের অ্যানাটমির উপর একটি গভীর দৃষ্টিপাত – ফাংশন, ডেটা এবং ভেরিয়েবল।"
lang: bn
---

স্মার্ট কন্ট্র্যাক্ট হল এমন একটি প্রোগ্রাম যা Ethereum-এর একটি ঠিকানায় চলে। এগুলি ডেটা এবং ফাংশন দ্বারা গঠিত যা একটি লেনদেন পাওয়ার পরে এক্সিকিউট করতে পারে। এখানে একটি স্মার্ট কন্ট্র্যাক্ট কী দিয়ে তৈরি তার একটি ওভারভিউ দেওয়া হল।

## পূর্বশর্ত {#prerequisites}

প্রথমে আপনি [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/) সম্পর্কে পড়েছেন তা নিশ্চিত করুন। এই ডকুমেন্টটি ধরে নিচ্ছে যে আপনি ইতিমধ্যে JavaScript বা Python-এর মতো প্রোগ্রামিং ভাষার সাথে পরিচিত।

## ডেটা {#data}

যেকোনো কন্ট্রাক্ট ডেটা অবশ্যই একটি অবস্থানে বরাদ্দ করতে হবে: হয় `storage`-এ বা `memory`-তে। একটি স্মার্ট কন্ট্র্যাক্টে সংগ্রহস্থল পরিবর্তন করা ব্যয়বহুল, তাই আপনার ডেটা কোথায় থাকবে তা আপনাকে বিবেচনা করতে হবে।

### সংগ্রহস্থল {#storage}

স্থায়ী ডেটাকে সংগ্রহস্থল হিসাবে উল্লেখ করা হয় এবং স্টেট ভেরিয়েবল দ্বারা উপস্থাপিত হয়। এই মানগুলি ব্লকচেইনে স্থায়ীভাবে সংরক্ষণ করা হয়। আপনাকে টাইপটি ডিক্লেয়ার করতে হবে যাতে কন্ট্রাক্টটি কম্পাইল করার সময় ব্লকচেইনে কতটা সংগ্রহস্থলের প্রয়োজন তা ট্র্যাক রাখতে পারে।

```solidity
// সলিডিটি উদাহরণ
contract SimpleStorage {
    uint storedData; // স্টেট ভেরিয়েবল
    // ...
}
```

```python
# ভাইপার উদাহরণ
storedData: int128
```

আপনি যদি আগে থেকেই অবজেক্ট-ওরিয়েন্টেড ভাষা প্রোগ্রাম করে থাকেন, তাহলে আপনি সম্ভবত বেশিরভাগ টাইপের সাথে পরিচিত হবেন। যাইহোক, আপনি যদি Ethereum ডেভেলপমেন্টে নতুন হন তবে `address` আপনার কাছে নতুন হওয়া উচিত।

একটি `address` টাইপ একটি Ethereum ঠিকানা ধারণ করতে পারে যা 20 বাইট বা 160 বিটের সমান। এটি একটি অগ্রগামী 0x সহ হেক্সাডেসিমেল নোটেশনে রিটার্ন করে।

অন্যান্য টাইপের মধ্যে রয়েছে:

- বুলিয়ান
- পূর্ণসংখ্যা
- ফিক্সড পয়েন্ট সংখ্যা
- নির্দিষ্ট-আকারের বাইট অ্যারে
- ডাইনামিকভাবে আকারযুক্ত বাইট অ্যারে
- যৌক্তিক এবং পূর্ণসংখ্যা লিটারেল
- স্ট্রিং লিটারেল
- হেক্সাডেসিমেল লিটারেল
- এনুমস

আরো ব্যাখ্যার জন্য, ডক্স দেখুন:

- [Vyper টাইপ দেখুন](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity টাইপ দেখুন](https://docs.soliditylang.org/en/latest/types.html#value-types)

### মেমরি {#memory}

যে মানগুলি শুধুমাত্র একটি কন্ট্রাক্ট ফাংশনের এক্সিকিউশনের জীবনকালের জন্য সংরক্ষণ করা হয় তাকে মেমরি ভেরিয়েবল বলা হয়। যেহেতু এগুলি ব্লকচেইনে স্থায়ীভাবে সংরক্ষণ করা হয় না, তাই এগুলি ব্যবহার করা অনেক সস্তা।

[Solidity ডক্স](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)-এ EVM কীভাবে ডেটা (Storage, Memory, এবং Stack) স্টোর করে সে সম্পর্কে আরও জানুন।

### এনভায়রনমেন্ট ভেরিয়েবল {#environment-variables}

আপনার কন্ট্রাক্টে আপনি যে ভেরিয়েবলগুলি সংজ্ঞায়িত করেন সেগুলি ছাড়াও, কিছু বিশেষ গ্লোবাল ভেরিয়েবল রয়েছে। এগুলি প্রাথমিকভাবে ব্লকচেইন বা বর্তমান লেনদেন সম্পর্কে তথ্য প্রদানের জন্য ব্যবহৃত হয়।

উদাহরণ:

| **Prop**          | **স্টেট ভেরিয়েবল** | **বিবরণ**                                      |
| ----------------- | ------------------- | ---------------------------------------------- |
| `block.timestamp` | uint256             | বর্তমান ব্লক ইপক টাইমস্ট্যাম্প                 |
| `msg.sender`      | address             | বার্তার প্রেরক (বর্তমান কল) |

## ফাংশন {#functions}

সবচেয়ে সহজ ভাষায়, ফাংশনগুলি ইনকামিং লেনদেনের প্রতিক্রিয়া হিসাবে তথ্য পেতে বা সেট করতে পারে।

দুই ধরনের ফাংশন কল আছে:

- `internal` – এগুলি একটি EVM কল তৈরি করে না
  - ইন্টারনাল ফাংশন এবং স্টেট ভেরিয়েবল শুধুমাত্র ইন্টারনালি অ্যাক্সেস করা যেতে পারে (যেমন, বর্তমান কন্ট্রাক্ট বা এটি থেকে প্রাপ্ত কন্ট্রাক্টের মধ্যে থেকে)
- `external` – এগুলি একটি EVM কল তৈরি করে
  - এক্সটার্নাল ফাংশনগুলি কন্ট্রাক্ট ইন্টারফেসের অংশ, যার মানে হল সেগুলি অন্যান্য কন্ট্রাক্ট থেকে এবং লেনদেনের মাধ্যমে কল করা যেতে পারে। একটি এক্সটার্নাল ফাংশন `f` ইন্টারনালি কল করা যায় না (যেমন, `f()` কাজ করে না, কিন্তু `this.f()` কাজ করে)।

এগুলি `public` বা `private`ও হতে পারে

- `public` ফাংশনগুলি কন্ট্রাক্টের মধ্যে থেকে ইন্টারনালি বা মেসেজের মাধ্যমে এক্সটারনালি কল করা যেতে পারে
- `private` ফাংশনগুলি শুধুমাত্র সেই কন্ট্রাক্টের জন্য দৃশ্যমান যেখানে সেগুলি সংজ্ঞায়িত করা হয়েছে এবং প্রাপ্ত কন্ট্রাক্টে নয়

ফাংশন এবং স্টেট ভেরিয়েবল উভয়ই পাবলিক বা প্রাইভেট করা যেতে পারে

এখানে একটি কন্ট্রাক্টে একটি স্টেট ভেরিয়েবল আপডেট করার জন্য একটি ফাংশন দেওয়া হল:

```solidity
// সলিডিটি উদাহরণ
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` টাইপের `value` প্যারামিটারটি `update_name` ফাংশনে পাস করা হয়েছে
- এটি `public` হিসাবে ডিক্লেয়ার করা হয়েছে, যার অর্থ যে কেউ এটি অ্যাক্সেস করতে পারে
- এটি `view` হিসাবে ডিক্লেয়ার করা হয়নি, তাই এটি কন্ট্রাক্টের স্টেট পরিবর্তন করতে পারে

### ভিউ ফাংশন {#view-functions}

এই ফাংশনগুলি কন্ট্রাক্টের ডেটার স্টেট পরিবর্তন না করার প্রতিশ্রুতি দেয়। সাধারণ উদাহরণ হল "গেটার" ফাংশন – উদাহরণস্বরূপ, আপনি এটি ব্যবহারকারীর ব্যালেন্স গ্রহণ করতে ব্যবহার করতে পারেন।

```solidity
// সলিডিটি উদাহরণ
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

স্টেট পরিবর্তন করা বলতে যা বোঝায়:

1. স্টেট ভেরিয়েবলে লেখা।
2. [ইভেন্ট এমিট করা](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events)।
3. [অন্যান্য কন্ট্রাক্ট তৈরি করা](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts)।
4. `selfdestruct` ব্যবহার করা।
5. কলের মাধ্যমে ইথার পাঠানো।
6. `view` বা `pure` হিসাবে চিহ্নিত নয় এমন কোনো ফাংশন কল করা।
7. নিম্ন-স্তরের কল ব্যবহার করা।
8. ইনলাইন অ্যাসেম্বলি ব্যবহার করা যাতে নির্দিষ্ট অপকোড থাকে।

### কনস্ট্রাক্টর ফাংশন {#constructor-functions}

`constructor` ফাংশনগুলি শুধুমাত্র একবার এক্সিকিউট করা হয় যখন কন্ট্রাক্টটি প্রথমবার ডেপ্লয় করা হয়। অনেক ক্লাস-ভিত্তিক প্রোগ্রামিং ভাষার `constructor`-এর মতো, এই ফাংশনগুলি প্রায়শই স্টেট ভেরিয়েবলগুলিকে তাদের নির্দিষ্ট মানগুলিতে ইনিশিয়ালাইজ করে।

```solidity
// সলিডিটি উদাহরণ
// কন্ট্রাক্টের ডেটা ইনিশিয়ালাইজ করে, `owner`-কে
// কন্ট্রাক্ট নির্মাতার ঠিকানায় সেট করে।
constructor() public {
    // সমস্ত স্মার্ট কন্ট্র্যাক্ট তার ফাংশন ট্রিগার করতে এক্সটার্নাল লেনদেনের উপর নির্ভর করে।
    // `msg` একটি গ্লোবাল ভেরিয়েবল যা প্রদত্ত লেনদেনের প্রাসঙ্গিক ডেটা অন্তর্ভুক্ত করে,
    // যেমন প্রেরকের ঠিকানা এবং লেনদেনে অন্তর্ভুক্ত ETH মান।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# ভাইপার উদাহরণ

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### অন্তর্নির্মিত ফাংশন {#built-in-functions}

আপনার কন্ট্রাক্টে আপনি যে ভেরিয়েবল এবং ফাংশনগুলি সংজ্ঞায়িত করেন সেগুলি ছাড়াও, কিছু বিশেষ অন্তর্নির্মিত ফাংশন রয়েছে। সবচেয়ে সুস্পষ্ট উদাহরণ হল:

- `address.send()` – Solidity
- `send(address)` – Vyper

এগুলি কন্ট্রাক্টগুলিকে অন্য অ্যাকাউন্টে ETH পাঠাতে দেয়।

## ফাংশন লেখা {#writing-functions}

আপনার ফাংশনের প্রয়োজন:

- প্যারামিটার ভেরিয়েবল এবং টাইপ (যদি এটি প্যারামিটার গ্রহণ করে)
- ইন্টারনাল/এক্সটার্নাল ডিক্লেয়ারেশন
- pure/view/payable-এর ডিক্লেয়ারেশন
- রিটার্নস টাইপ (যদি এটি একটি মান রিটার্ন করে)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // স্টেট ভেরিয়েবল

    // কন্ট্রাক্টটি ডেপ্লয় করার সময় কল করা হয় এবং মানটি ইনিশিয়ালাইজ করে
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // গেট ফাংশন
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // সেট ফাংশন
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

একটি সম্পূর্ণ কন্ট্রাক্ট দেখতে এরকম হতে পারে। এখানে `constructor` ফাংশন `dapp_name` ভেরিয়েবলের জন্য একটি প্রাথমিক মান প্রদান করে।

## ইভেন্ট এবং লগ {#events-and-logs}

ইভেন্টগুলি আপনার স্মার্ট কন্ট্র্যাক্টকে আপনার ফ্রন্টএন্ড বা অন্যান্য সাবস্ক্রাইবিং অ্যাপ্লিকেশনের সাথে যোগাযোগ করতে সক্ষম করে। একবার একটি লেনদেন যাচাই এবং একটি ব্লকে যোগ করা হলে, স্মার্ট কন্ট্র্যাক্টগুলি ইভেন্ট এবং লগ তথ্য এমিট করতে পারে, যা ফ্রন্টএন্ড তখন প্রক্রিয়া এবং ব্যবহার করতে পারে।

## টিকাসহ উদাহরণ {#annotated-examples}

এইগুলি হল Solidity-তে লেখা কিছু উদাহরণ। আপনি যদি কোডটি নিয়ে খেলতে চান, তাহলে আপনি [Remix](http://remix.ethereum.org)-এ তাদের সাথে ইন্টারঅ্যাক্ট করতে পারেন।

### হ্যালো ওয়ার্ল্ড {#hello-world}

```solidity
// সেমান্টিক ভার্শনিং ব্যবহার করে Solidity-এর সংস্করণ নির্দিষ্ট করে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld` নামের একটি কন্ট্রাক্ট সংজ্ঞায়িত করে।
// একটি কন্ট্রাক্ট হল ফাংশন এবং ডেটার (তার স্টেট) একটি সংগ্রহ।
// একবার ডেপ্লয় করা হলে, একটি কন্ট্রাক্ট Ethereum ব্লকচেইনের একটি নির্দিষ্ট ঠিকানায় থাকে।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` টাইপের একটি স্টেট ভেরিয়েবল `message` ডিক্লেয়ার করে।
    // স্টেট ভেরিয়েবল হল এমন ভেরিয়েবল যার মান স্থায়ীভাবে কন্ট্রাক্টের সংগ্রহস্থলে সংরক্ষণ করা হয়।
    // `public` কীওয়ার্ডটি একটি কন্ট্রাক্টের বাইরে থেকে ভেরিয়েবলগুলিকে অ্যাক্সেসযোগ্য করে তোলে
    // এবং একটি ফাংশন তৈরি করে যা অন্য কন্ট্রাক্ট বা ক্লায়েন্টরা মান অ্যাক্সেস করার জন্য কল করতে পারে।
    string public message;

    // অনেক ক্লাস-ভিত্তিক অবজেক্ট-ওরিয়েন্টেড ভাষার মতো, একটি কনস্ট্রাক্টর হল
    // একটি বিশেষ ফাংশন যা শুধুমাত্র কন্ট্রাক্ট তৈরির সময় এক্সিকিউট করা হয়।
    // কনস্ট্রাক্টরগুলি কন্ট্রাক্টের ডেটা ইনিশিয়ালাইজ করতে ব্যবহৃত হয়।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // একটি স্ট্রিং আর্গুমেন্ট `initMessage` গ্রহণ করে এবং মানটি সেট করে
        // কন্ট্রাক্টের `message` সংগ্রহস্থল ভেরিয়েবলে)।
        message = initMessage;
    }

    // একটি পাবলিক ফাংশন যা একটি স্ট্রিং আর্গুমেন্ট গ্রহণ করে
    // এবং `message` সংগ্রহস্থল ভেরিয়েবল আপডেট করে।
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### টোকেন {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // একটি `address` একটি ইমেল ঠিকানার সাথে তুলনীয় - এটি Ethereum-এ একটি অ্যাকাউন্ট শনাক্ত করতে ব্যবহৃত হয়।
    // ঠিকানাগুলি একটি স্মার্ট কন্ট্র্যাক্ট বা একটি এক্সটার্নাল (ব্যবহারকারী) অ্যাকাউন্টকে প্রতিনিধিত্ব করতে পারে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // একটি `mapping` মূলত একটি হ্যাস টেবিল ডেটা স্ট্রাকচার।
    // এই `mapping` একটি আনসাইন্ড ইন্টিজার (টোকেন ব্যালেন্স) একটি ঠিকানায় (টোকেন হোল্ডার) বরাদ্দ করে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // ইভেন্টগুলি ব্লকচেইনে কার্যকলাপ লগ করার অনুমতি দেয়।
    // Ethereum ক্লায়েন্টরা কন্ট্রাক্ট স্টেট পরিবর্তনের প্রতিক্রিয়া জানাতে ইভেন্ট শুনতে পারে।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // কন্ট্রাক্টের ডেটা ইনিশিয়ালাইজ করে, `owner`-কে
    // কন্ট্রাক্ট নির্মাতার ঠিকানায় সেট করে।
    constructor() public {
        // সমস্ত স্মার্ট কন্ট্র্যাক্ট তার ফাংশন ট্রিগার করতে এক্সটার্নাল লেনদেনের উপর নির্ভর করে।
        // `msg` একটি গ্লোবাল ভেরিয়েবল যা প্রদত্ত লেনদেনের প্রাসঙ্গিক ডেটা অন্তর্ভুক্ত করে,
        // যেমন প্রেরকের ঠিকানা এবং লেনদেনে অন্তর্ভুক্ত ETH মান।
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // নতুন টোকেনের একটি পরিমাণ তৈরি করে এবং সেগুলিকে একটি ঠিকানায় পাঠায়।
    function mint(address receiver, uint amount) public {
        // `require` একটি নিয়ন্ত্রণ কাঠামো যা নির্দিষ্ট শর্ত প্রয়োগ করতে ব্যবহৃত হয়।
        // যদি একটি `require` স্টেটমেন্ট `false` হিসাবে মূল্যায়ন করে, একটি ব্যতিক্রম ট্রিগার হয়,
        // যা বর্তমান কলের সময় স্টেটে করা সমস্ত পরিবর্তন ফিরিয়ে দেয়।
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // শুধুমাত্র কন্ট্রাক্টের মালিক এই ফাংশনটি কল করতে পারেন
        require(msg.sender == owner, "আপনি মালিক নন।");

        // টোকেনের সর্বোচ্চ পরিমাণ প্রয়োগ করে
        require(amount < 1e60, "সর্বোচ্চ ইস্যুয়েন্স অতিক্রম করেছে");

        // `receiver`-এর ব্যালেন্স `amount` দ্বারা বৃদ্ধি করে
        balances[receiver] += amount;
    }

    // যেকোনো কলার থেকে একটি ঠিকানায় বিদ্যমান টোকেনের একটি পরিমাণ পাঠায়।
    function transfer(address receiver, uint amount) public {
        // প্রেরকের পাঠানোর জন্য যথেষ্ট টোকেন থাকতে হবে
        require(amount <= balances[msg.sender], "অপর্যাপ্ত ব্যালেন্স।");

        // দুটি ঠিকানার টোকেন ব্যালেন্স সামঞ্জস্য করে
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // পূর্বে সংজ্ঞায়িত ইভেন্ট এমিট করে
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### অনন্য ডিজিটাল সম্পদ {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// বর্তমান কন্ট্রাক্টে অন্যান্য ফাইল থেকে প্রতীক ইম্পোর্ট করে।
// এই ক্ষেত্রে, OpenZeppelin থেকে হেল্পার কন্ট্রাক্টের একটি সিরিজ।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` কীওয়ার্ডটি এক্সটার্নাল কন্ট্রাক্ট থেকে ফাংশন এবং কীওয়ার্ড উত্তরাধিকার সূত্রে পেতে ব্যবহৃত হয়।
// এই ক্ষেত্রে, `CryptoPizza` `IERC721` এবং `ERC165` কন্ট্রাক্ট থেকে উত্তরাধিকার সূত্রে প্রাপ্ত।
// আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // নিরাপদে গাণিতিক ক্রিয়াকলাপ সম্পাদনের জন্য OpenZeppelin-এর SafeMath লাইব্রেরি ব্যবহার করে।
    // আরও জানুন: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // সলিডিটিতে ধ্রুবক স্টেট ভেরিয়েবলগুলি অন্যান্য ভাষার মতোই
    // কিন্তু আপনাকে অবশ্যই একটি এক্সপ্রেশন থেকে বরাদ্দ করতে হবে যা কম্পাইলের সময় ধ্রুবক।
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // স্ট্রাক্ট টাইপ আপনাকে আপনার নিজের টাইপ সংজ্ঞায়িত করতে দেয়
    // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // পিৎজা স্ট্রাক্টের একটি খালি অ্যারে তৈরি করে
    Pizza[] public pizzas;

    // পিৎজা আইডি থেকে তার মালিকের ঠিকানায় ম্যাপিং
    mapping(uint256 => address) public pizzaToOwner;

    // মালিকের ঠিকানা থেকে মালিকানাধীন টোকেনের সংখ্যায় ম্যাপিং
    mapping(address => uint256) public ownerPizzaCount;

    // টোকেন আইডি থেকে অনুমোদিত ঠিকানায় ম্যাপিং
    mapping(uint256 => address) pizzaApprovals;

    // আপনি ম্যাপিং নেস্ট করতে পারেন, এই উদাহরণটি অপারেটর অনুমোদনের জন্য মালিককে ম্যাপ করে
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // স্ট্রিং (নাম) এবং ডিএনএ থেকে একটি র‍্যান্ডম পিৎজা তৈরি করার জন্য ইন্টারনাল ফাংশন
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` কীওয়ার্ডটির অর্থ হল এই ফাংশনটি শুধুমাত্র দৃশ্যমান
        // এই কন্ট্রাক্ট এবং এই কন্ট্রাক্ট থেকে প্রাপ্ত কন্ট্রাক্টের মধ্যে
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` একটি ফাংশন মডিফায়ার যা পিৎজা আগে থেকেই বিদ্যমান কিনা তা পরীক্ষা করে
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // পিৎজাকে পিৎজার অ্যারেতে যোগ করে এবং আইডি পায়
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // পিৎজার মালিক বর্তমান ব্যবহারকারীর সমান কিনা তা পরীক্ষা করে
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // মনে রাখবেন যে address(0) হল শূন্য ঠিকানা,
        // যা নির্দেশ করে যে pizza[id] এখনও কোনো নির্দিষ্ট ব্যবহারকারীকে বরাদ্দ করা হয়নি।

        assert(pizzaToOwner[id] == address(0));

        // পিৎজাকে মালিকের সাথে ম্যাপ করে
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // স্ট্রিং (নাম) থেকে একটি র‍্যান্ডম পিৎজা তৈরি করে
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // স্ট্রিং (নাম) এবং মালিকের (নির্মাতা) ঠিকানা থেকে র‍্যান্ডম ডিএনএ তৈরি করে
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure` হিসাবে চিহ্নিত ফাংশনগুলি স্টেট থেকে পড়া বা পরিবর্তন না করার প্রতিশ্রুতি দেয়
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // স্ট্রিং (নাম) + ঠিকানা (মালিক) থেকে র‍্যান্ডম ইউইন্ট তৈরি করে
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // মালিক দ্বারা পাওয়া পিৎজার অ্যারে রিটার্ন করে
    function getPizzasByOwner(address _owner)
        public
        // `view` হিসাবে চিহ্নিত ফাংশনগুলি স্টেট পরিবর্তন না করার প্রতিশ্রুতি দেয়
        // আরও জানুন: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // শুধুমাত্র এই ফাংশন কলের জীবনচক্রের জন্য মান সঞ্চয় করতে `memory` সংগ্রহস্থল অবস্থান ব্যবহার করে।
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

    // পিৎজা এবং মালিকানা অন্য ঠিকানায় স্থানান্তর করে
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "অবৈধ ঠিকানা।");
        require(_exists(_pizzaId), "পিৎজা বিদ্যমান নেই।");
        require(_from != _to, "একই ঠিকানায় স্থানান্তর করা যাবে না।");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "ঠিকানাটি অনুমোদিত নয়।");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // ইম্পোর্ট করা IERC721 কন্ট্রাক্টে সংজ্ঞায়িত ইভেন্ট এমিট করে
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * একটি প্রদত্ত টোকেন আইডির মালিকানা নিরাপদে অন্য ঠিকানায় স্থানান্তর করে
     * যদি টার্গেট ঠিকানা একটি কন্ট্রাক্ট হয়, তবে এটি অবশ্যই `onERC721Received` প্রয়োগ করবে,
     * যা একটি নিরাপদ স্থানান্তরের উপর কল করা হয়, এবং ম্যাজিক মান রিটার্ন করে
     * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`;
     * অন্যথায়, স্থানান্তরটি ফিরিয়ে দেওয়া হয়।
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * একটি প্রদত্ত টোকেন আইডির মালিকানা নিরাপদে অন্য ঠিকানায় স্থানান্তর করে
     * যদি টার্গেট ঠিকানা একটি কন্ট্রাক্ট হয়, তবে এটি অবশ্যই `onERC721Received` প্রয়োগ করবে,
     * যা একটি নিরাপদ স্থানান্তরের উপর কল করা হয়, এবং ম্যাজিক মান রিটার্ন করে
     * `bytes4(keccak256(\"onERC721Received(address,address,uint256,bytes)\"))`;
     * অন্যথায়, স্থানান্তরটি ফিরিয়ে দেওয়া হয়।
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "অবশ্যই onERC721Received প্রয়োগ করতে হবে।");
    }

    /**
     * একটি টার্গেট ঠিকানায় `onERC721Received`-কে আহ্বান করার জন্য ইন্টারনাল ফাংশন
     * যদি টার্গেট ঠিকানা একটি কন্ট্রাক্ট না হয় তবে কলটি এক্সিকিউট করা হয় না
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

    // একটি পিৎজা বার্ন করে - টোকেন সম্পূর্ণরূপে ধ্বংস করে
    // `external` ফাংশন মডিফায়ারের অর্থ হল এই ফাংশনটি
    // কন্ট্রাক্ট ইন্টারফেসের অংশ এবং অন্যান্য কন্ট্রাক্ট এটিকে কল করতে পারে
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "অবৈধ ঠিকানা।");
        require(_exists(_pizzaId), "পিৎজা বিদ্যমান নেই।");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "ঠিকানাটি অনুমোদিত নয়।");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // ঠিকানা দ্বারা পিৎজার সংখ্যা রিটার্ন করে
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // আইডি দ্বারা পাওয়া পিৎজার মালিককে রিটার্ন করে
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "অবৈধ পিৎজা আইডি।");
        return owner;
    }

    // পিৎজার মালিকানা স্থানান্তরের জন্য অন্য ঠিকানাকে অনুমোদন দেয়
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "অবশ্যই পিৎজার মালিক হতে হবে।");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // নির্দিষ্ট পিৎজার জন্য অনুমোদিত ঠিকানা রিটার্ন করে
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "পিৎজা বিদ্যমান নেই।");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * একটি প্রদত্ত টোকেন আইডির বর্তমান অনুমোদন পরিষ্কার করার জন্য প্রাইভেট ফাংশন
     * যদি প্রদত্ত ঠিকানাটি টোকেনের মালিক না হয় তবে ফিরিয়ে দেয়
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "অবশ্যই পিৎজার মালিক হতে হবে।");
        require(_exists(_pizzaId), "পিৎজা বিদ্যমান নেই।");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * একটি প্রদত্ত অপারেটরের অনুমোদন সেট বা আনসেট করে
     * একজন অপারেটর প্রেরকের পক্ষ থেকে তার সমস্ত টোকেন স্থানান্তর করার অনুমতি পায়
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "নিজের ঠিকানা অনুমোদন করা যাবে না");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // একটি প্রদত্ত মালিক দ্বারা একজন অপারেটর অনুমোদিত কিনা তা বলে
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // পিৎজার মালিকানা নেয় - শুধুমাত্র অনুমোদিত ব্যবহারকারীদের জন্য
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "ঠিকানাটি অনুমোদিত নয়।");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // পিৎজা বিদ্যমান কিনা তা পরীক্ষা করে
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // ঠিকানাটি মালিক বা পিৎজা স্থানান্তরের জন্য অনুমোদিত কিনা তা পরীক্ষা করে
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // solium চেক অক্ষম করুন কারণ
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // পিৎজা অনন্য এবং এখনও বিদ্যমান নেই কিনা তা পরীক্ষা করুন
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
        require(result, "এই নামের পিৎজা ইতিমধ্যে বিদ্যমান।");
        _;
    }

    // টার্গেট ঠিকানাটি একটি কন্ট্রাক্ট কিনা তা রিটার্ন করে
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // বর্তমানে একটি ঠিকানায় একটি কন্ট্রাক্ট আছে কিনা তা পরীক্ষা করার জন্য এর থেকে ভালো কোনো উপায় নেই
        // সেই ঠিকানার কোডের আকার পরীক্ষা করা ছাড়া।
        // এটি কীভাবে কাজ করে সে সম্পর্কে আরও জানতে দেখুন https://ethereum.stackexchange.com/a/14016/36603
        // ।
        // TODO Serenity রিলিজের আগে এটি আবার পরীক্ষা করুন, কারণ তখন সমস্ত ঠিকানা
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

স্মার্ট কন্ট্র্যাক্টগুলির একটি আরো সম্পূর্ণ ওভারভিউর জন্য Solidity এবং Vyper-এর ডকুমেন্টেশন দেখুন:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## সম্পর্কিত বিষয় {#related-topics}

- [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/)
- [ইথিরিয়াম ভার্চুয়াল মেশিন](/developers/docs/evm/)

## সম্পর্কিত টিউটোরিয়াল {#related-tutorials}

- [কন্ট্রাক্টের আকারের সীমার সাথে লড়াই করার জন্য কন্ট্রাক্ট ছোট করা](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– আপনার স্মার্ট কন্ট্র্যাক্টের আকার কমানোর জন্য কিছু ব্যবহারিক টিপস।_
- [ইভেন্টের মাধ্যমে স্মার্ট কন্ট্র্যাক্ট থেকে ডেটা লগ করা](/developers/tutorials/logging-events-smart-contracts/) _– স্মার্ট কন্ট্র্যাক্ট ইভেন্টের একটি ভূমিকা এবং আপনি ডেটা লগ করতে কীভাবে সেগুলি ব্যবহার করতে পারেন।_
- [Solidity থেকে অন্যান্য কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করুন](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– কীভাবে একটি বিদ্যমান কন্ট্রাক্ট থেকে একটি স্মার্ট কন্ট্র্যাক্ট ডেপ্লয় করবেন এবং এটির সাথে ইন্টারঅ্যাক্ট করবেন।_
