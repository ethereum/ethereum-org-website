---
title: "সলিডিটি থেকে অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করুন"
description: "একটি বিদ্যমান কন্ট্রাক্ট থেকে কীভাবে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয়"
author: "jdourlens"
tags: ["স্মার্ট কন্ট্রাক্ট", "Solidity", "Remix", "ডিপ্লয়িং", "কম্পোজেবিলিটি"]
skill: advanced
breadcrumb: "কন্ট্রাক্ট ইন্টারঅ্যাকশন"
lang: bn
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

আগের টিউটোরিয়ালগুলোতে আমরা [কীভাবে আপনার প্রথম স্মার্ট কন্ট্রাক্ট ডিপ্লয় করবেন](/developers/tutorials/deploying-your-first-smart-contract/) এবং এতে কিছু ফিচার যোগ করবেন যেমন [মডিফায়ার দিয়ে অ্যাক্সেস নিয়ন্ত্রণ করা](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) বা [Solidity-তে এরর হ্যান্ডলিং](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) সম্পর্কে অনেক কিছু শিখেছি। এই টিউটোরিয়ালে আমরা শিখব কীভাবে একটি বিদ্যমান কন্ট্রাক্ট থেকে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করতে হয় এবং এর সাথে ইন্টারঅ্যাক্ট করতে হয়।

আমরা এমন একটি কন্ট্রাক্ট তৈরি করব যা যে কাউকে তার নিজস্ব `Counter` স্মার্ট কন্ট্রাক্ট তৈরি করার সুযোগ দেবে এর জন্য একটি ফ্যাক্টরি তৈরি করে, যার নাম হবে `CounterFactory`। প্রথমে এখানে আমাদের প্রাথমিক `Counter` স্মার্ট কন্ট্রাক্টের কোড দেওয়া হলো:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

লক্ষ্য করুন যে আমরা ফ্যাক্টরির এডড্রেস এবং কন্ট্রাক্ট মালিকের এডড্রেস ট্র্যাক করার জন্য কন্ট্রাক্ট কোডটি সামান্য পরিবর্তন করেছি। যখন আপনি অন্য একটি কন্ট্রাক্ট থেকে একটি কন্ট্রাক্ট কোড কল করবেন, তখন msg.sender আমাদের কন্ট্রাক্ট ফ্যাক্টরির এডড্রেস নির্দেশ করবে। এটি **বোঝার জন্য সত্যিই একটি গুরুত্বপূর্ণ বিষয়** কারণ অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি কন্ট্রাক্ট ব্যবহার করা একটি সাধারণ প্র্যাকটিস। তাই জটিল ক্ষেত্রে সেন্ডার কে সেদিকে আপনার খেয়াল রাখা উচিত।

এর জন্য আমরা একটি `onlyFactory` মডিফায়ারও যোগ করেছি যা নিশ্চিত করে যে স্টেট পরিবর্তনকারী ফাংশনটি শুধুমাত্র সেই ফ্যাক্টরি দ্বারা কল করা যেতে পারে যা মূল কলারকে একটি প্যারামিটার হিসেবে পাস করবে।

আমাদের নতুন `CounterFactory`-এর ভেতরে যা অন্যান্য সমস্ত Counter পরিচালনা করবে, আমরা একটি ম্যাপিং যোগ করব যা একজন মালিককে তার কাউন্টার কন্ট্রাক্টের এডড্রেসের সাথে যুক্ত করবে:

```solidity
mapping(address => Counter) _counters;
```

ইথিরিয়ামে, ম্যাপিং হলো জাভাস্ক্রিপ্টের অবজেক্টের সমতুল্য, এগুলো A টাইপের একটি কী-কে B টাইপের একটি ভ্যালুর সাথে ম্যাপ করতে সক্ষম করে। এই ক্ষেত্রে আমরা একজন মালিকের এডড্রেসকে তার Counter-এর ইনস্ট্যান্সের সাথে ম্যাপ করি।

কারও জন্য একটি নতুন Counter ইনস্ট্যানশিয়েট করা দেখতে এরকম হবে:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

আমরা প্রথমে চেক করি যে ওই ব্যক্তির কাছে ইতিমধ্যে একটি কাউন্টার আছে কিনা। যদি তার কাছে কোনো কাউন্টার না থাকে তবে আমরা তার এডড্রেসটি `Counter` কনস্ট্রাক্টরে পাস করে একটি নতুন কাউন্টার ইনস্ট্যানশিয়েট করি এবং নতুন তৈরি করা ইনস্ট্যান্সটি ম্যাপিংয়ে অ্যাসাইন করি।

একটি নির্দিষ্ট Counter-এর কাউন্ট পেতে এটি দেখতে এরকম হবে:

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

প্রথম ফাংশনটি চেক করে যে একটি নির্দিষ্ট এডড্রেসের জন্য Counter কন্ট্রাক্টটি বিদ্যমান কিনা এবং তারপর ইনস্ট্যান্স থেকে `getCount` মেথডটি কল করে। দ্বিতীয় ফাংশন: `getMyCount` হলো msg.sender-কে সরাসরি `getCount` ফাংশনে পাস করার একটি শর্টকাট।

`increment` ফাংশনটি বেশ একই রকম তবে এটি মূল লেনদেন সেন্ডারকে `Counter` কন্ট্রাক্টে পাস করে:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

লক্ষ্য করুন যে যদি অনেকবার কল করা হয়, তবে আমাদের কাউন্টারটি সম্ভবত ওভারফ্লোর শিকার হতে পারে। এই সম্ভাব্য পরিস্থিতি থেকে রক্ষা পেতে আপনার যতটা সম্ভব [SafeMath লাইব্রেরি](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) ব্যবহার করা উচিত।

আমাদের কন্ট্রাক্ট ডিপ্লয় করতে, আপনাকে `CounterFactory` এবং `Counter` উভয়ের কোড প্রদান করতে হবে। উদাহরণস্বরূপ Remix-এ ডিপ্লয় করার সময় আপনাকে CounterFactory নির্বাচন করতে হবে।

এখানে সম্পূর্ণ কোড দেওয়া হলো:

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

কম্পাইল করার পর, Remix ডিপ্লয় সেকশনে আপনি ডিপ্লয় করার জন্য ফ্যাক্টরিটি নির্বাচন করবেন:

![Remix-এ ডিপ্লয় করার জন্য ফ্যাক্টরি নির্বাচন করা হচ্ছে](./counterfactory-deploy.png)

তারপর আপনি আপনার কন্ট্রাক্ট ফ্যাক্টরি নিয়ে কাজ করতে পারেন এবং ভ্যালু পরিবর্তন হচ্ছে কিনা তা চেক করতে পারেন। আপনি যদি একটি ভিন্ন এডড্রেস থেকে স্মার্ট কন্ট্রাক্টটি কল করতে চান তবে আপনাকে Remix-এর Account সিলেক্ট অপশনে এডড্রেসটি পরিবর্তন করতে হবে।