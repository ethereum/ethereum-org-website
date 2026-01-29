---
title: "সলিডিটি থেকে অন্যান্য কন্ট্র্যাক্টগুলির সাথে ইন্টারঅ্যাক্ট করুন"
description: "কীভাবে একটি বিদ্যমান কন্ট্র্যাক্ট থেকে একটি স্মার্ট কন্ট্র্যাক্ট ডেপ্লয় করবেন এবং এর সাথে ইন্টারঅ্যাক্ট করবেন"
author: "jdourlens"
tags:
  [
    "স্মার্ট কন্ট্র্যাক্ট",
    "সলিডিটি",
    "remix",
    "ডেপ্লয়িং",
    "কম্পোজেবিলিটি"
  ]
skill: advanced
lang: bn
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

আগের টিউটোরিয়ালগুলিতে আমরা অনেক কিছু শিখেছি [কীভাবে আপনার প্রথম স্মার্ট কন্ট্র্যাক্ট ডেপ্লয় করবেন](/developers/tutorials/deploying-your-first-smart-contract/) এবং এতে কিছু বৈশিষ্ট্য যোগ করা যেমন [মডিফায়ারের মাধ্যমে অ্যাক্সেস নিয়ন্ত্রণ](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) অথবা [সলিডিটিতে এরর হ্যান্ডলিং](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/)। এই টিউটোরিয়ালে আমরা শিখব কীভাবে একটি বিদ্যমান কন্ট্র্যাক্ট থেকে একটি স্মার্ট কন্ট্র্যাক্ট ডেপ্লয় করতে হয় এবং এটির সাথে ইন্টারঅ্যাক্ট করতে হয়।

আমরা এমন একটি কন্ট্র্যাক্ট তৈরি করব যা যে কাউকে তার নিজস্ব `Counter` স্মার্ট কন্ট্র্যাক্ট রাখতে সক্ষম করবে এটির জন্য একটি ফ্যাক্টরি তৈরি করার মাধ্যমে, এর নাম হবে `CounterFactory`। প্রথমে এখানে আমাদের প্রাথমিক `Counter` স্মার্ট কন্ট্র্যাক্টের কোড দেওয়া হলো:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "আপনি কন্ট্র্যাক্টের মালিক নন");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "আপনাকে ফ্যাক্টরি ব্যবহার করতে হবে");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

লক্ষ্য করুন যে আমরা ফ্যাক্টরির অ্যাড্রেস এবং কন্ট্র্যাক্টের মালিকের অ্যাড্রেসের ট্র্যাক রাখার জন্য কন্ট্র্যাক্টের কোডটি সামান্য পরিবর্তন করেছি। যখন আপনি অন্য একটি কন্ট্র্যাক্ট থেকে একটি কন্ট্র্যাক্ট কোড কল করেন, তখন msg.sender আমাদের কন্ট্র্যাক্ট ফ্যাক্টরির অ্যাড্রেসকে রেফার করবে। এটি **বোঝার জন্য একটি সত্যিই গুরুত্বপূর্ণ বিষয়** কারণ অন্যান্য কন্ট্র্যাক্টগুলির সাথে ইন্টারঅ্যাক্ট করার জন্য একটি কন্ট্র্যাক্ট ব্যবহার করা একটি সাধারণ অভ্যাস। তাই জটিল ক্ষেত্রে সেন্ডার কে, সে বিষয়ে আপনার খেয়াল রাখা উচিত।

এর জন্য আমরা একটি `onlyFactory` মডিফায়ারও যুক্ত করেছি যা নিশ্চিত করে যে স্টেট পরিবর্তনকারী ফাংশনটি কেবল ফ্যাক্টরি দ্বারা কল করা যেতে পারে, যা আসল কলারকে প্যারামিটার হিসাবে পাস করবে।

আমাদের নতুন `CounterFactory`-এর ভিতরে, যা অন্য সমস্ত কাউন্টার পরিচালনা করবে, আমরা একটি ম্যাপিং যোগ করব যা একজন মালিককে তার কাউন্টার কন্ট্র্যাক্টের অ্যাড্রেসের সাথে যুক্ত করবে:

```solidity
mapping(address => Counter) _counters;
```

ইথেরিয়ামে, ম্যাপিং জাভাস্ক্রিপ্টে অবজেক্টের সমতুল্য, এগুলি A টাইপের একটি কী-কে B টাইপের একটি মানের সাথে ম্যাপ করতে সক্ষম করে। এক্ষেত্রে আমরা একজন মালিকের অ্যাড্রেসকে তার কাউন্টারের ইনস্ট্যান্সের সাথে ম্যাপ করি।

কারও জন্য একটি নতুন কাউন্টার ইনস্ট্যানশিয়েট করা এরকম দেখাবে:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

আমরা প্রথমে পরীক্ষা করি যে ব্যক্তিটির ইতিমধ্যে একটি কাউন্টার আছে কিনা। যদি তার কোনো কাউন্টার না থাকে, আমরা তার অ্যাড্রেসটি `Counter` কন্সট্রাক্টরের কাছে পাস করে একটি নতুন কাউন্টার ইনস্ট্যানশিয়েট করি এবং নতুন তৈরি করা ইনস্ট্যান্সটি ম্যাপিং-এ অ্যাসাইন করি।

একটি নির্দিষ্ট কাউন্টারের গণনা পেতে এটি এরকম দেখাবে:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

প্রথম ফাংশনটি পরীক্ষা করে যে একটি প্রদত্ত অ্যাড্রেসের জন্য কাউন্টার কন্ট্র্যাক্টটি বিদ্যমান কিনা এবং তারপর ইনস্ট্যান্স থেকে `getCount` মেথডটি কল করে। দ্বিতীয় ফাংশন: `getMyCount` এটি msg.sender-কে সরাসরি `getCount` ফাংশনে পাস করার একটি সংক্ষিপ্ত উপায় মাত্র।

`increment` ফাংশনটিও বেশ একইরকম, কিন্তু এটি মূল ট্রানজ্যাকশন সেন্ডারকে `Counter` কন্ট্র্যাক্টে পাস করে দেয়:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

লক্ষ্য করুন যে যদি অনেকবার কল করা হয়, আমাদের কাউন্টার একটি ওভারফ্লোর শিকার হতে পারে। এই সম্ভাব্য পরিস্থিতি থেকে রক্ষা পাওয়ার জন্য আপনার যতটা সম্ভব [সেফম্যাথ লাইব্রেরি](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) ব্যবহার করা উচিত।

আমাদের কন্ট্র্যাক্ট ডেপ্লয় করার জন্য, আপনাকে `CounterFactory` এবং `Counter` উভয়ের কোড সরবরাহ করতে হবে। উদাহরণস্বরূপ রিমিক্সে ডেপ্লয় করার সময় আপনাকে CounterFactory নির্বাচন করতে হবে।

এখানে সম্পূর্ণ কোডটি দেওয়া হলো:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "আপনি কন্ট্র্যাক্টের মালিক নন");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "আপনাকে ফ্যাক্টরি ব্যবহার করতে হবে");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

কম্পাইল করার পরে, রিমিক্সের ডেপ্লয় বিভাগে আপনি ডেপ্লয় করার জন্য ফ্যাক্টরিটি নির্বাচন করবেন:

![রিমিক্সে ডেপ্লয় করার জন্য ফ্যাক্টরি নির্বাচন করা হচ্ছে](./counterfactory-deploy.png)

তারপর আপনি আপনার কন্ট্র্যাক্ট ফ্যাক্টরি নিয়ে খেলতে পারেন এবং মানের পরিবর্তন পরীক্ষা করতে পারেন। আপনি যদি একটি ভিন্ন অ্যাড্রেস থেকে স্মার্ট কন্ট্র্যাক্টটি কল করতে চান, তবে আপনাকে রিমিক্সের অ্যাকাউন্ট সিলেক্টে অ্যাড্রেসটি পরিবর্তন করতে হবে।
