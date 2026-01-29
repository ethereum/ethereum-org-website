---
title: ERC-20 টোকেন স্মার্ট কন্ট্র্যাক্টটি বুঝুন
description: একটি সম্পূর্ণ সলিডিটি স্মার্ট কন্ট্র্যাক্টের উদাহরণ এবং ব্যাখ্যা সহ কীভাবে ERC-20 টোকেন স্ট্যান্ডার্ড প্রয়োগ করতে হয় তা জানুন।
author: "jdourlens"
tags: [ "স্মার্ট কন্ট্র্যাক্ট", "টোকেন", "সলিডিটি", "erc-20" ]
skill: beginner
lang: bn
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Ethereum-এর অন্যতম গুরুত্বপূর্ণ [স্মার্ট কন্ট্র্যাক্ট স্ট্যান্ডার্ড](/developers/docs/standards/) [ERC-20](/developers/docs/standards/tokens/erc-20/) নামে পরিচিত, যা ফাঞ্জিবল টোকেন বাস্তবায়নের জন্য Ethereum ব্লকচেইনে সমস্ত স্মার্ট কন্ট্র্যাক্টের জন্য ব্যবহৃত প্রযুক্তিগত স্ট্যান্ডার্ড হিসাবে আবির্ভূত হয়েছে।

ERC-20 নিয়মের একটি সাধারণ তালিকা নির্ধারণ করে যা সমস্ত ফাঞ্জিবল Ethereum টোকেন মেনে চলা উচিত। ফলস্বরূপ, এই টোকেন স্ট্যান্ডার্ডটি সমস্ত ধরনের ডেভেলপারদের বৃহত্তর Ethereum সিস্টেমের মধ্যে নতুন টোকেনগুলি কীভাবে কাজ করবে তা সঠিকভাবে ভবিষ্যদ্বাণী করার ক্ষমতা দেয়। এটি ডেভেলপারদের কাজকে সহজ এবং সরল করে তোলে, কারণ তারা তাদের কাজ চালিয়ে যেতে পারে, এটা জেনে যে যতক্ষণ টোকেনটি নিয়মগুলি অনুসরণ করে, প্রতিবার নতুন টোকেন প্রকাশের সময় প্রতিটি নতুন প্রজেক্ট পুনরায় করার প্রয়োজন হবে না।

এখানে একটি ইন্টারফেস হিসাবে উপস্থাপিত হলো সেই ফাংশনগুলি যা একটি ERC-20 কে অবশ্যই প্রয়োগ করতে হবে। আপনি যদি নিশ্চিত না হন যে একটি ইন্টারফেস কী: [Solidity-তে OOP প্রোগ্রামিং](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) সম্পর্কে আমাদের নিবন্ধটি দেখুন।

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

এখানে প্রতিটি ফাংশন কীসের জন্য তার একটি লাইন-বাই-লাইন ব্যাখ্যাকারী রয়েছে। এর পরে আমরা ERC-20 টোকেনের একটি সহজ বাস্তবায়ন উপস্থাপন করব।

## গেটার্স {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

বিদ্যমান টোকেনের পরিমাণ প্রদান করে। এই ফাংশনটি একটি গেটার এবং চুক্তির স্টেট পরিবর্তন করে না। মনে রাখবেন যে Solidity-তে কোনো ফ্লোট নেই। তাই বেশিরভাগ টোকেন 18 ডেসিমেল গ্রহণ করে এবং 1 টোকেনের জন্য মোট সরবরাহ এবং অন্যান্য ফলাফল 1000000000000000000 হিসাবে প্রদান করবে। প্রতিটি টোকেনে 18 ডেসিমেল থাকে না এবং টোকেন নিয়ে কাজ করার সময় এটি এমন একটি বিষয় যা আপনাকে সত্যিই খেয়াল রাখতে হবে।

```solidity
function balanceOf(address account) external view returns (uint256);
```

একটি ঠিকানার (`account`) মালিকানাধীন টোকেনের পরিমাণ প্রদান করে। এই ফাংশনটি একটি গেটার এবং চুক্তির স্টেট পরিবর্তন করে না।

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 স্ট্যান্ডার্ড একটি ঠিকানাকে অন্য ঠিকানাকে একটি অ্যালাউন্স দেওয়ার অনুমতি দেয় যাতে এটি থেকে টোকেন পুনরুদ্ধার করা যায়। এই গেটারটি অবশিষ্ট টোকেনের সংখ্যা প্রদান করে যা `spender`-কে `owner`-এর পক্ষ থেকে ব্যয় করার অনুমতি দেওয়া হবে। এই ফাংশনটি একটি গেটার এবং চুক্তির স্টেট পরিবর্তন করে না এবং ডিফল্টরূপে 0 প্রদান করা উচিত।

## ফাংশন {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

ফাংশন কলারের ঠিকানা (`msg.sender`) থেকে প্রাপকের ঠিকানায় টোকেনের `amount` স্থানান্তর করে। এই ফাংশনটি পরে সংজ্ঞায়িত `Transfer` ইভেন্টটি নির্গত করে। স্থানান্তর সম্ভব হলে এটি ট্রু প্রদান করে।

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender`-কে ফাংশন কলারের (`msg.sender`) ব্যালেন্স থেকে স্থানান্তর করার জন্য অনুমোদিত `allowance`-এর পরিমাণ সেট করুন। এই ফাংশনটি Approval ইভেন্টটি নির্গত করে। ফাংশনটি অ্যালাউন্স সফলভাবে সেট করা হয়েছে কিনা তা প্রদান করে।

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

অ্যালাউন্স মেকানিজম ব্যবহার করে `sender` থেকে `recipient`-এর কাছে টোকেনের `amount` স্থানান্তর করে। তারপর কলারের অ্যালাউন্স থেকে amount কেটে নেওয়া হয়। এই ফাংশনটি `Transfer` ইভেন্টটি নির্গত করে।

## ইভেন্ট {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

এই ইভেন্টটি তখন নির্গত হয় যখন টোকেনের পরিমাণ (value) `from` ঠিকানা থেকে `to` ঠিকানায় পাঠানো হয়।

নতুন টোকেন মিন্ট করার ক্ষেত্রে, স্থানান্তর সাধারণত 0x00..0000 ঠিকানা `from` হয়, যেখানে টোকেন বার্ন করার ক্ষেত্রে স্থানান্তর 0x00..0000 `to` হয়।

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

এই ইভেন্টটি তখন নির্গত হয় যখন টোকেনের পরিমাণ (`value`) `owner` দ্বারা `spender`-কে ব্যবহারের জন্য অনুমোদিত হয়।

## ERC-20 টোকেনের একটি মৌলিক বাস্তবায়ন {#a-basic-implementation-of-erc-20-tokens}

এখানে সবচেয়ে সহজ কোডটি দেওয়া হলো যার উপর ভিত্তি করে আপনি আপনার ERC-20 টোকেন তৈরি করতে পারেন:

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
