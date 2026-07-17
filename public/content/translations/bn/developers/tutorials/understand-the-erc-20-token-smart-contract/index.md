---
title: "ERC-20 টোকেন স্মার্ট কন্ট্রাক্ট বোঝা"
description: "একটি সম্পূর্ণ Solidity স্মার্ট কন্ট্রাক্ট উদাহরণ এবং ব্যাখ্যার মাধ্যমে কীভাবে ERC-20 টোকেন স্ট্যান্ডার্ড প্রয়োগ করতে হয় তা শিখুন।"
author: jdourlens
tags:
  - স্মার্ট কন্ট্রাক্ট
  - টোকেন
  - solidity
  - erc-20
skill: beginner
breadcrumb: "ERC-20 টোকেনের বেসিক"
lang: bn
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

ইথেরিয়াম-এর অন্যতম গুরুত্বপূর্ণ [স্মার্ট কন্ট্রাক্ট স্ট্যান্ডার্ড](/developers/docs/standards/) [ERC-20](/developers/docs/standards/tokens/erc-20/) নামে পরিচিত, যা বিনিমেয় টোকেন বাস্তবায়নের জন্য ইথেরিয়াম ব্লকচেইন-এর সমস্ত স্মার্ট কন্ট্রাক্টে ব্যবহৃত প্রযুক্তিগত স্ট্যান্ডার্ড হিসেবে আবির্ভূত হয়েছে।

ERC-20 এমন একটি সাধারণ নিয়মের তালিকা সংজ্ঞায়িত করে যা সমস্ত বিনিমেয় ইথেরিয়াম টোকেনের মেনে চলা উচিত। ফলস্বরূপ, এই টোকেন স্ট্যান্ডার্ডটি সব ধরনের ডেভেলপারদের বৃহত্তর ইথেরিয়াম সিস্টেমের মধ্যে নতুন টোকেনগুলো কীভাবে কাজ করবে তা সঠিকভাবে অনুমান করার ক্ষমতা দেয়। এটি ডেভেলপারদের কাজকে সহজ করে তোলে, কারণ তারা তাদের কাজ চালিয়ে যেতে পারে এই জেনে যে, যতক্ষণ টোকেনটি নিয়মগুলো অনুসরণ করে, ততক্ষণ প্রতিটি নতুন টোকেন রিলিজ হওয়ার সময় নতুন প্রজেক্টগুলো বারবার নতুন করে করার প্রয়োজন হবে না।

এখানে একটি ইন্টারফেস হিসেবে উপস্থাপন করা হয়েছে, যে ফাংশনগুলো একটি ERC-20-কে অবশ্যই প্রয়োগ করতে হবে। আপনি যদি ইন্টারফেস কী সে সম্পর্কে নিশ্চিত না হন: তবে [Solidity-তে OOP প্রোগ্রামিং](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) সম্পর্কে আমাদের আর্টিকেলটি দেখুন।

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

প্রতিটি ফাংশন কীসের জন্য তার একটি লাইন-বাই-লাইন ব্যাখ্যা নিচে দেওয়া হলো। এর পরে আমরা ERC-20 টোকেনের একটি সাধারণ বাস্তবায়ন উপস্থাপন করব।

## গেটার {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

বিদ্যমান টোকেনের পরিমাণ রিটার্ন করে। এই ফাংশনটি একটি গেটার এবং এটি কন্ট্রাক্ট-এর স্টেট পরিবর্তন করে না। মনে রাখবেন যে Solidity-তে কোনো ফ্লোট (floats) নেই। তাই বেশিরভাগ টোকেন 18 ডেসিমাল গ্রহণ করে এবং 1 টোকেনের জন্য 1000000000000000000 হিসেবে মোট সরবরাহ এবং অন্যান্য ফলাফল রিটার্ন করবে। প্রতিটি টোকেনের 18 ডেসিমাল থাকে না এবং টোকেন নিয়ে কাজ করার সময় এটি আপনাকে সত্যিই খেয়াল রাখতে হবে।

```solidity
function balanceOf(address account) external view returns (uint256);
```

একটি ঠিকানা (`account`) দ্বারা মালিকানাধীন টোকেনের পরিমাণ রিটার্ন করে। এই ফাংশনটি একটি গেটার এবং এটি কন্ট্রাক্ট-এর স্টেট পরিবর্তন করে না।

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 স্ট্যান্ডার্ড একটি ঠিকানাকে অন্য একটি ঠিকানায় অ্যালাউন্স দেওয়ার অনুমতি দেয় যাতে সেখান থেকে টোকেনগুলো পুনরুদ্ধার করা যায়। এই গেটারটি অবশিষ্ট টোকেনের সংখ্যা রিটার্ন করে যা `spender`-কে `owner`-এর পক্ষে ব্যয় করার অনুমতি দেওয়া হবে। এই ফাংশনটি একটি গেটার এবং এটি কন্ট্রাক্ট-এর স্টেট পরিবর্তন করে না এবং ডিফল্টরূপে 0 রিটার্ন করা উচিত।

## ফাংশন {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

ফাংশন কলার ঠিকানা (`msg.sender`) থেকে প্রাপকের ঠিকানায় টোকেনের `amount` হস্তান্তর করে। এই ফাংশনটি পরে সংজ্ঞায়িত `Transfer` ইভেন্ট এমিট করে। হস্তান্তর সম্ভব হলে এটি true রিটার্ন করে।

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

ফাংশন কলার (`msg.sender`) ব্যালেন্স থেকে `spender`-কে হস্তান্তর করার অনুমতি দেওয়া `allowance`-এর পরিমাণ সেট করে। এই ফাংশনটি Approval ইভেন্ট এমিট করে। ফাংশনটি রিটার্ন করে যে অ্যালাউন্স সফলভাবে সেট করা হয়েছে কিনা।

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

অ্যালাউন্স মেকানিজম ব্যবহার করে `sender` থেকে `recipient`-এ টোকেনের `amount` হস্তান্তর করে। এরপর কলারের অ্যালাউন্স থেকে পরিমাণটি কেটে নেওয়া হয়। এই ফাংশনটি `Transfer` ইভেন্ট এমিট করে।

## ইভেন্ট {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

যখন টোকেনের পরিমাণ (value) `from` ঠিকানা থেকে `to` ঠিকানায় পাঠানো হয় তখন এই ইভেন্টটি এমিট হয়।

নতুন টোকেন মিন্টিং-এর ক্ষেত্রে, হস্তান্তরটি সাধারণত 0x00..0000 ঠিকানা `from` হয়, অন্যদিকে টোকেন পোড়ানো-এর ক্ষেত্রে হস্তান্তরটি 0x00..0000 `to` হয়।

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

যখন টোকেনের পরিমাণ (`value`) `spender` দ্বারা ব্যবহার করার জন্য `owner` দ্বারা অনুমোদিত হয় তখন এই ইভেন্টটি এমিট হয়।

## ERC-20 টোকেনের একটি বেসিক বাস্তবায়ন {#a-basic-implementation-of-erc-20-tokens}

আপনার ERC-20 টোকেন তৈরি করার জন্য সবচেয়ে সহজ কোডটি নিচে দেওয়া হলো:

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

ERC-20 টোকেন স্ট্যান্ডার্ডের আরেকটি চমৎকার বাস্তবায়ন হলো [ওপেনজেপেলিন ERC-20 বাস্তবায়ন](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)।