---
title: "ERC-223 টোকেন স্ট্যান্ডার্ড"
description: "ERC-223 ফাঞ্জিবল টোকেন স্ট্যান্ডার্ডের একটি ওভারভিউ, এটি কীভাবে কাজ করে এবং ERC-20 এর সাথে একটি তুলনা।"
lang: bn
---

## ভূমিকা {#introduction}

### ERC-223 কী? {#what-is-erc223}

ERC-223 হলো ফাঞ্জিবল টোকেনের জন্য একটি স্ট্যান্ডার্ড, যা অনেকটা ERC-20 স্ট্যান্ডার্ডের মতো। মূল পার্থক্য হলো ERC-223 শুধুমাত্র টোকেন API-ই সংজ্ঞায়িত করে না, বরং প্রেরক থেকে প্রাপকের কাছে টোকেন ট্রান্সফার করার লজিকও নির্ধারণ করে। এটি এমন একটি কমিউনিকেশন মডেল নিয়ে এসেছে যা প্রাপকের দিক থেকে টোকেন ট্রান্সফার পরিচালনা করার সুযোগ দেয়।

### ERC-20 থেকে পার্থক্য {#erc20-differences}

ERC-223, ERC-20 এর কিছু সীমাবদ্ধতা দূর করে এবং টোকেন কন্ট্রাক্ট ও টোকেন গ্রহণ করতে পারে এমন একটি কন্ট্রাক্টের মধ্যে ইন্টারঅ্যাকশনের একটি নতুন পদ্ধতি চালু করে। এমন কিছু বিষয় আছে যা ERC-223 এর মাধ্যমে সম্ভব কিন্তু ERC-20 এর মাধ্যমে নয়:

- প্রাপকের দিক থেকে টোকেন ট্রান্সফার পরিচালনা: প্রাপকরা শনাক্ত করতে পারে যে একটি ERC-223 টোকেন জমা হচ্ছে।
- ভুলভাবে পাঠানো টোকেন প্রত্যাখ্যান: যদি কোনো ব্যবহারকারী এমন কোনো কন্ট্রাক্টে ERC-223 টোকেন পাঠায় যার টোকেন গ্রহণ করার কথা নয়, তবে কন্ট্রাক্টটি লেনদেন প্রত্যাখ্যান করতে পারে, যা টোকেন হারানো প্রতিরোধ করে।
- ট্রান্সফারে মেটাডেটা: ERC-223 টোকেনগুলোতে মেটাডেটা অন্তর্ভুক্ত থাকতে পারে, যা টোকেন লেনদেনের সাথে যেকোনো তথ্য যুক্ত করার সুযোগ দেয়।

## পূর্বশর্ত {#prerequisites}

- [একাউন্ট](/developers/docs/accounts)
- [স্মার্ট কন্ট্রাক্ট](/developers/docs/smart-contracts/)
- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## মূল অংশ {#body}

ERC-223 হলো একটি টোকেন স্ট্যান্ডার্ড যা স্মার্ট কন্ট্রাক্টের মধ্যে টোকেনের জন্য একটি API প্রয়োগ করে। এটি এমন কন্ট্রাক্টগুলোর জন্যও একটি API ঘোষণা করে যাদের ERC-223 টোকেন গ্রহণ করার কথা। যেসব কন্ট্রাক্ট ERC-223 রিসিভার API সমর্থন করে না, তারা ERC-223 টোকেন গ্রহণ করতে পারে না, যা ব্যবহারকারীর ভুল প্রতিরোধ করে।

যদি একটি স্মার্ট কন্ট্রাক্ট নিচের মেথড এবং ইভেন্টগুলো প্রয়োগ করে, তবে এটিকে একটি ERC-223 সামঞ্জস্যপূর্ণ টোকেন কন্ট্রাক্ট বলা যেতে পারে। একবার ডিপ্লয় করা হলে, এটি ইথিরিয়ামে তৈরি করা টোকেনগুলোর ট্র্যাক রাখার জন্য দায়ী থাকবে।

কন্ট্রাক্টটিতে শুধুমাত্র এই ফাংশনগুলো থাকতেই হবে এমন কোনো বাধ্যবাধকতা নেই এবং একজন ডেভেলপার এই কন্ট্রাক্টে বিভিন্ন টোকেন স্ট্যান্ডার্ড থেকে অন্য যেকোনো ফিচার যোগ করতে পারেন। উদাহরণস্বরূপ, `approve` এবং `transferFrom` ফাংশনগুলো ERC-223 স্ট্যান্ডার্ডের অংশ নয়, তবে প্রয়োজন হলে এই ফাংশনগুলো প্রয়োগ করা যেতে পারে।

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) থেকে:

### মেথড {#methods}

ERC-223 টোকেনকে অবশ্যই নিচের মেথডগুলো প্রয়োগ করতে হবে:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

যে কন্ট্রাক্টের ERC-223 টোকেন গ্রহণ করার কথা, তাকে অবশ্যই নিচের মেথডটি প্রয়োগ করতে হবে:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

যদি ERC-223 টোকেন এমন কোনো কন্ট্রাক্টে পাঠানো হয় যা `tokenReceived(..)` ফাংশন প্রয়োগ করে না, তবে ট্রান্সফারটি অবশ্যই ব্যর্থ হবে এবং প্রেরকের ব্যালেন্স থেকে টোকেনগুলো সরানো যাবে না।

### ইভেন্ট {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### উদাহরণ {#examples}

ERC-223 টোকেনের API অনেকটা ERC-20 এর মতোই, তাই UI ডেভেলপমেন্টের দৃষ্টিকোণ থেকে কোনো পার্থক্য নেই। এখানে একমাত্র ব্যতিক্রম হলো ERC-223 টোকেনগুলোতে `approve` + `transferFrom` ফাংশন নাও থাকতে পারে, কারণ এই স্ট্যান্ডার্ডের জন্য এগুলো ঐচ্ছিক।

#### সলিডিটি উদাহরণ {#solidity-example}

নিচের উদাহরণটি দেখায় কীভাবে একটি সাধারণ ERC-223 টোকেন কন্ট্রাক্ট কাজ করে:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

এখন আমরা চাই অন্য একটি কন্ট্রাক্ট `tokenA` এর ডিপোজিট গ্রহণ করুক, ধরে নিচ্ছি যে tokenA হলো একটি ERC-223 টোকেন। কন্ট্রাক্টটিকে অবশ্যই শুধুমাত্র tokenA গ্রহণ করতে হবে এবং অন্য যেকোনো টোকেন প্রত্যাখ্যান করতে হবে। যখন কন্ট্রাক্টটি tokenA গ্রহণ করবে, তখন এটিকে অবশ্যই একটি `Deposit()` ইভেন্ট এমিট করতে হবে এবং অভ্যন্তরীণ `deposits` ভেরিয়েবলের মান বাড়াতে হবে।

এখানে কোডটি দেওয়া হলো:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // একমাত্র টোকেন যা আমরা গ্রহণ করতে চাই।
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // এটি বোঝা গুরুত্বপূর্ণ যে এই ফাংশনের মধ্যে
        // msg.sender হলো সেই টোকেনের ঠিকানা যা গ্রহণ করা হচ্ছে,
        // msg.value সর্বদা 0 হয় কারণ বেশিরভাগ ক্ষেত্রে টোকেন কন্ট্রাক্ট ইথার ধারণ করে না বা পাঠায় না,
        // _from হলো টোকেন ট্রান্সফারের প্রেরক,
        // _value হলো জমা করা টোকেনের পরিমাণ।
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## সচরাচর জিজ্ঞাসিত প্রশ্ন {#faq}

### যদি আমরা কন্ট্রাক্টে কিছু tokenB পাঠাই তবে কী হবে? {#sending-tokens}

লেনদেন ব্যর্থ হবে এবং টোকেন ট্রান্সফার হবে না। টোকেনগুলো প্রেরকের এডড্রেসে ফেরত পাঠানো হবে।

### আমরা কীভাবে এই কন্ট্রাক্টে ডিপোজিট করতে পারি? {#contract-deposits}

ERC-223 টোকেনের `transfer(address,uint256)` অথবা `transfer(address,uint256,bytes)` ফাংশন কল করুন, যেখানে `RecipientContract` এর এডড্রেস উল্লেখ করতে হবে।

### যদি আমরা এই কন্ট্রাক্টে একটি ERC-20 টোকেন ট্রান্সফার করি তবে কী হবে? {#erc-20-transfers}

যদি `RecipientContract` এ একটি ERC-20 টোকেন পাঠানো হয়, তবে টোকেনগুলো ট্রান্সফার হবে, কিন্তু ট্রান্সফারটি শনাক্ত করা যাবে না (কোনো `Deposit()` ইভেন্ট ফায়ার হবে না এবং ডিপোজিটের মান পরিবর্তন হবে না)। অনাকাঙ্ক্ষিত ERC-20 ডিপোজিট ফিল্টার বা প্রতিরোধ করা যাবে না।

### টোকেন ডিপোজিট সম্পন্ন হওয়ার পর যদি আমরা কোনো ফাংশন এক্সিকিউট করতে চাই তবে কী হবে? {#function-execution}

এটি করার একাধিক উপায় রয়েছে। এই উদাহরণে আমরা এমন একটি পদ্ধতি অনুসরণ করব যা ERC-223 ট্রান্সফারকে ইথার ট্রান্সফারের অনুরূপ করে তোলে:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // একমাত্র টোকেন যা আমরা গ্রহণ করতে চাই।
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // আগত ট্রানজ্যাকশন পরিচালনা করুন এবং পরবর্তী ফাংশন কলটি সম্পাদন করুন।
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

যখন `RecipientContract` একটি ERC-223 টোকেন গ্রহণ করবে, তখন কন্ট্রাক্টটি টোকেন লেনদেনের `_data` প্যারামিটার হিসেবে এনকোড করা একটি ফাংশন এক্সিকিউট করবে, ঠিক যেভাবে ইথার লেনদেনগুলো ফাংশন কলগুলোকে লেনদেনের `data` হিসেবে এনকোড করে। আরও তথ্যের জন্য [ডেটা ফিল্ড](/developers/docs/transactions/#the-data-field) পড়ুন।

উপরের উদাহরণে একটি ERC-223 টোকেনকে অবশ্যই `transfer(address,uin256,bytes calldata _data)` ফাংশনের মাধ্যমে `RecipientContract` এর এডড্রেসে ট্রান্সফার করতে হবে। যদি ডেটা প্যারামিটার `0xc2985578` (একটি `foo()` ফাংশনের সিগনেচার) হয়, তবে টোকেন ডিপোজিট পাওয়ার পর foo() ফাংশনটি ইনভোক করা হবে এবং Foo() ইভেন্ট ফায়ার হবে।

প্যারামিটারগুলো টোকেন ট্রান্সফারের `data` তেও এনকোড করা যেতে পারে, উদাহরণস্বরূপ আমরা `_someNumber` এর জন্য 12345 মান দিয়ে bar() ফাংশন কল করতে পারি। এই ক্ষেত্রে `data` অবশ্যই `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` হতে হবে, যেখানে `0x0423a132` হলো `bar(uint256)` ফাংশনের সিগনেচার এবং `00000000000000000000000000000000000000000000000000000000000004d2` হলো uint256 হিসেবে 12345।

## সীমাবদ্ধতা {#limitations}

যদিও ERC-223, ERC-20 স্ট্যান্ডার্ডে পাওয়া বেশ কয়েকটি সমস্যার সমাধান করে, তবে এর নিজস্ব কিছু সীমাবদ্ধতাও রয়েছে:

- গ্রহণ এবং সামঞ্জস্যতা: ERC-223 এখনও ব্যাপকভাবে গৃহীত হয়নি, যা বিদ্যমান টুল এবং প্ল্যাটফর্মগুলোর সাথে এর সামঞ্জস্যতা সীমিত করতে পারে।
- ব্যাকওয়ার্ড সামঞ্জস্যতা: ERC-223, ERC-20 এর সাথে ব্যাকওয়ার্ড সামঞ্জস্যপূর্ণ নয়, যার অর্থ হলো বিদ্যমান ERC-20 কন্ট্রাক্ট এবং টুলগুলো কোনো পরিবর্তন ছাড়া ERC-223 টোকেনের সাথে কাজ করবে না।
- গ্যাস খরচ: ERC-223 ট্রান্সফারে অতিরিক্ত চেক এবং কার্যকারিতার কারণে ERC-20 লেনদেনের তুলনায় গ্যাস খরচ বেশি হতে পারে।

## আরও পড়ুন {#further-reading}

- [EIP-223: ERC-223 টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-223)
- [প্রাথমিক ERC-223 প্রস্তাবনা](https://github.com/ethereum/eips/issues/223)