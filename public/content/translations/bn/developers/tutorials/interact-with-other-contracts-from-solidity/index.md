---
title: "Solidity থেকে অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করা"
description: "একটি বিদ্যমান কন্ট্রাক্ট থেকে কীভাবে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা যায় এবং এর সাথে ইন্টারঅ্যাক্ট করা যায়"
author: "jdourlens"
tags:
  - স্মার্ট কন্ট্রাক্ট
  - solidity
  - remix
  - ডিপ্লয় করা
  - কম্পোজেবিলিটি
skill: advanced
breadcrumb: "কন্ট্রাক্ট ইন্টারঅ্যাকশন"
lang: bn
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

পূর্ববর্তী টিউটোরিয়ালগুলোতে আমরা [কীভাবে আপনার প্রথম স্মার্ট কন্ট্রাক্ট ডিপ্লয় করবেন](/developers/tutorials/deploying-your-first-smart-contract/) এবং এতে কিছু বৈশিষ্ট্য যোগ করবেন যেমন [মডিফায়ার দিয়ে অ্যাক্সেস নিয়ন্ত্রণ করা](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) বা [Solidity-তে এরর হ্যান্ডলিং](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/) সম্পর্কে অনেক কিছু শিখেছি। এই টিউটোরিয়ালে আমরা শিখব কীভাবে একটি বিদ্যমান কন্ট্রাক্ট থেকে একটি স্মার্ট কন্ট্রাক্ট ডিপ্লয় করা যায় এবং এর সাথে ইন্টারঅ্যাক্ট করা যায়।

আমরা এমন একটি কন্ট্রাক্ট তৈরি করব যা যে কাউকে তার নিজস্ব `Counter` স্মার্ট কন্ট্রাক্ট রাখার সুযোগ দেবে এর জন্য একটি ফ্যাক্টরি তৈরি করে, এর নাম হবে `CounterFactory`। প্রথমে এখানে আমাদের প্রাথমিক `Counter` স্মার্ট কন্ট্রাক্টের কোড দেওয়া হলো:

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

লক্ষ্য করুন যে আমরা ফ্যাক্টরির ঠিকানা এবং কন্ট্রাক্ট মালিকের ঠিকানা ট্র্যাক করার জন্য কন্ট্রাক্ট কোডটি সামান্য পরিবর্তন করেছি। যখন আপনি অন্য একটি কন্ট্রাক্ট থেকে একটি কন্ট্রাক্ট কোড কল করেন, তখন msg.sender আমাদের কন্ট্রাক্ট ফ্যাক্টরির ঠিকানাকে নির্দেশ করবে। এটি **বোঝার জন্য সত্যিই একটি গুরুত্বপূর্ণ বিষয়** কারণ অন্যান্য কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি কন্ট্রাক্ট ব্যবহার করা একটি সাধারণ অনুশীলন। তাই জটিল ক্ষেত্রে প্রেরক কে সেদিকে আপনার খেয়াল রাখা উচিত।

এর জন্য আমরা একটি `onlyFactory` মডিফায়ারও যোগ করেছি যা নিশ্চিত করে যে স্টেট পরিবর্তনকারী ফাংশনটি শুধুমাত্র সেই ফ্যাক্টরি দ্বারা কল করা যেতে পারে যা মূল কলারকে একটি প্যারামিটার হিসেবে পাস করবে।

আমাদের নতুন `CounterFactory` এর ভিতরে যা অন্যান্য সমস্ত Counter পরিচালনা করবে, আমরা একটি ম্যাপিং যোগ করব যা একজন মালিককে তার counter কন্ট্রাক্টের ঠিকানার সাথে যুক্ত করবে:

```solidity
mapping(address => Counter) _counters;
```

ইথেরিয়াম-এ, ম্যাপিং হলো JavaScript-এর অবজেক্টের সমতুল্য, এগুলো A ধরনের একটি কী-কে B ধরনের একটি মানের সাথে ম্যাপ করতে সক্ষম করে। এই ক্ষেত্রে আমরা একজন মালিকের ঠিকানাকে তার Counter-এর ইনস্ট্যান্সের সাথে ম্যাপ করি।

কারও জন্য একটি নতুন Counter ইনস্ট্যানশিয়েট করা দেখতে এরকম হবে:

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

আমরা প্রথমে চেক করি যে ওই ব্যক্তির কাছে ইতিমধ্যে একটি counter আছে কিনা। যদি তার কাছে কোনো counter না থাকে তবে আমরা তার ঠিকানাকে `Counter` কনস্ট্রাক্টর-এ পাস করে একটি নতুন counter ইনস্ট্যানশিয়েট করি এবং নতুন তৈরি করা ইনস্ট্যান্সটিকে ম্যাপিংয়ে অ্যাসাইন করি।

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

প্রথম ফাংশনটি চেক করে যে একটি প্রদত্ত ঠিকানার জন্য Counter কন্ট্রাক্টটি বিদ্যমান কিনা এবং তারপর ইনস্ট্যান্স থেকে `getCount` মেথডটিকে কল করে। দ্বিতীয় ফাংশন: `getMyCount` হলো msg.sender-কে সরাসরি `getCount` ফাংশনে পাস করার জন্য একটি শর্টকাট।

`increment` ফাংশনটি বেশ একই রকম তবে এটি মূল ট্রানজ্যাকশন প্রেরককে `Counter` কন্ট্রাক্টে পাস করে:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

লক্ষ্য করুন যে যদি অনেকবার কল করা হয়, তবে আমাদের counter সম্ভবত একটি ওভারফ্লো-এর শিকার হতে পারে। এই সম্ভাব্য পরিস্থিতি থেকে রক্ষা পেতে আপনার যতটা সম্ভব [SafeMath লাইব্রেরি](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) ব্যবহার করা উচিত।

আমাদের কন্ট্রাক্ট ডিপ্লয় করার জন্য, আপনাকে `CounterFactory` এবং `Counter` উভয়ের কোড প্রদান করতে হবে। উদাহরণস্বরূপ Remix-এ ডিপ্লয় করার সময় আপনাকে CounterFactory নির্বাচন করতে হবে।

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

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

তারপর আপনি আপনার কন্ট্রাক্ট ফ্যাক্টরি নিয়ে কাজ করতে পারেন এবং মান পরিবর্তন হচ্ছে কিনা তা চেক করতে পারেন। আপনি যদি একটি ভিন্ন ঠিকানা থেকে স্মার্ট কন্ট্রাক্টটিকে কল করতে চান তবে আপনাকে Remix-এর Account সিলেক্টে ঠিকানাটি পরিবর্তন করতে হবে।