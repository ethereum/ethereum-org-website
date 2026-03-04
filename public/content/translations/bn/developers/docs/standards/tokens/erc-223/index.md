---
title: "ERC-223 টোকেন স্ট্যান্ডার্ড"
description: "ERC-223 ফাঞ্জিবল টোকেন স্ট্যান্ডার্ডের একটি সংক্ষিপ্ত বিবরণ, এটি কীভাবে কাজ করে, এবং ERC-20 এর সাথে একটি তুলনা।"
lang: bn
---

## ভূমিকা {#introduction}

### ERC-223 কী? {#what-is-erc223}

ERC-223 হল ফাঞ্জিবল টোকেনের জন্য একটি স্ট্যান্ডার্ড, যা ERC-20 স্ট্যান্ডার্ডের অনুরূপ। মূল পার্থক্য হল ERC-223 শুধুমাত্র টোকেন API সংজ্ঞায়িত করে না, বরং প্রেরক থেকে প্রাপকের কাছে টোকেন স্থানান্তরের জন্য লজিকও সংজ্ঞায়িত করে। এটি একটি যোগাযোগ মডেল চালু করে যা প্রাপকের দিকে টোকেন স্থানান্তর পরিচালনা করার অনুমতি দেয়।

### ERC-20 থেকে পার্থক্য {#erc20-differences}

ERC-223, ERC-20 এর কিছু সীমাবদ্ধতা মোকাবেলা করে এবং টোকেন কন্ট্র্যাক্ট এবং টোকেন গ্রহণ করতে পারে এমন একটি কন্ট্র্যাক্টের মধ্যে পারস্পরিক যোগাযোগের একটি নতুন পদ্ধতি চালু করে। এমন কিছু জিনিস আছে যা ERC-223 দিয়ে সম্ভব কিন্তু ERC-20 দিয়ে নয়:

- প্রাপকের দিকে টোকেন স্থানান্তর পরিচালনা: প্রাপকরা শনাক্ত করতে পারেন যে একটি ERC-223 টোকেন জমা দেওয়া হচ্ছে।
- ভুলভাবে পাঠানো টোকেন প্রত্যাখ্যান: যদি একজন ব্যবহারকারী এমন কোনো কন্ট্র্যাক্টে ERC-223 টোকেন পাঠায় যা টোকেন গ্রহণ করার জন্য নয়, তাহলে কন্ট্র্যাক্টটি লেনদেন প্রত্যাখ্যান করতে পারে, যার ফলে টোকেনের ক্ষতি রোধ করা যায়।
- স্থানান্তরে মেটাডেটা: ERC-223 টোকেনগুলিতে মেটাডেটা অন্তর্ভুক্ত থাকতে পারে, যা টোকেন লেনদেনের সাথে ইচ্ছামত তথ্য সংযুক্ত করার অনুমতি দেয়।

## পূর্বশর্ত {#prerequisites}

- [অ্যাকাউন্টগুলি](/developers/docs/accounts)
- [স্মার্ট কন্ট্র্যাক্ট](/developers/docs/smart-contracts/)
- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## বডি {#body}

ERC-223 হল একটি টোকেন স্ট্যান্ডার্ড যা স্মার্ট কন্ট্র্যাক্টের মধ্যে টোকেনের জন্য একটি API প্রয়োগ করে। এটি সেইসব কন্ট্র্যাক্টের জন্যও একটি API ঘোষণা করে যেগুলি ERC-223 টোকেন গ্রহণ করার কথা। যে কন্ট্র্যাক্টগুলো ERC-223 রিসিভার API সমর্থন করে না, তারা ERC-223 টোকেন গ্রহণ করতে পারে না, যা ব্যবহারকারীর ত্রুটি প্রতিরোধ করে।

যদি একটি স্মার্ট কন্ট্র্যাক্ট নিম্নলিখিত পদ্ধতি এবং ইভেন্টগুলি প্রয়োগ করে, তবে এটিকে একটি ERC-223 সামঞ্জস্যপূর্ণ টোকেন কন্ট্র্যাক্ট বলা যেতে পারে। একবার স্থাপন করা হলে, এটি
Ethereum-এ তৈরি করা টোকেনগুলির ট্র্যাক রাখার জন্য দায়ী থাকবে।

কন্ট্র্যাক্টটি শুধুমাত্র এই ফাংশনগুলি রাখতে বাধ্য নয় এবং একজন ডেভেলপার এই কন্ট্র্যাক্টে বিভিন্ন টোকেন স্ট্যান্ডার্ড থেকে অন্য কোনো বৈশিষ্ট্য যোগ করতে পারেন। উদাহরণস্বরূপ, `approve` এবং `transferFrom` ফাংশনগুলি ERC-223 স্ট্যান্ডার্ডের অংশ নয় তবে প্রয়োজনে এই ফাংশনগুলি প্রয়োগ করা যেতে পারে।

[EIP-223](https://eips.ethereum.org/EIPS/eip-223) থেকে:

### মেথড {#methods}

ERC-223 টোকেনকে অবশ্যই নিম্নলিখিত পদ্ধতিগুলি প্রয়োগ করতে হবে:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

একটি কন্ট্র্যাক্ট যা ERC-223 টোকেন গ্রহণ করার কথা, তাকে অবশ্যই নিম্নলিখিত পদ্ধতিটি প্রয়োগ করতে হবে:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

যদি ERC-223 টোকেন এমন একটি কন্ট্র্যাক্টে পাঠানো হয় যা `tokenReceived(..)` ফাংশনটি প্রয়োগ করে না, তাহলে স্থানান্তরটি অবশ্যই ব্যর্থ হবে এবং টোকেনগুলি প্রেরকের ব্যালেন্স থেকে সরানো যাবে না।

### ইভেন্ট {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### উদাহরণ {#examples}

ERC-223 টোকেনের API, ERC-20-এর মতোই, তাই UI ডেভেলপমেন্টের দৃষ্টিকোণ থেকে কোনো পার্থক্য নেই। এখানে একমাত্র ব্যতিক্রম হল যে ERC-223 টোকেনগুলিতে `approve` + `transferFrom` ফাংশন নাও থাকতে পারে কারণ এই স্ট্যান্ডার্ডের জন্য এগুলি ঐচ্ছিক।

#### Solidity উদাহরণ {#solidity-example}

নিম্নলিখিত উদাহরণটি দেখায় কিভাবে একটি বেসিক ERC-223 টোকেন কন্ট্র্যাক্ট কাজ করে:

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

এখন আমরা চাই যে অন্য একটি কন্ট্র্যাক্ট `tokenA`-এর ডিপোজিট গ্রহণ করুক, এই ভেবে যে tokenA একটি ERC-223 টোকেন। কন্ট্র্যাক্টটিকে অবশ্যই শুধু tokenA গ্রহণ করতে হবে এবং অন্য যেকোনো টোকেন প্রত্যাখ্যান করতে হবে। যখন কন্ট্র্যাক্টটি tokenA গ্রহণ করবে, তখন এটিকে অবশ্যই একটি `Deposit()` ইভেন্ট নির্গত করতে হবে এবং অভ্যন্তরীণ `deposits` ভ্যারিয়েবলের মান বাড়াতে হবে।

এখানে কোডটি দেওয়া হল:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## সাধারণত জিজ্ঞাসিত প্রশ্নসমূহ {#faq}

### আমরা যদি কন্ট্র্যাক্টে কিছু tokenB পাঠাই তাহলে কী হবে? {#sending-tokens}

লেনদেনটি ব্যর্থ হবে, এবং টোকেনের স্থানান্তর ঘটবে না। টোকেনগুলি প্রেরকের ঠিকানায় ফেরত দেওয়া হবে।

### আমরা কীভাবে এই কন্ট্র্যাক্টে ডিপোজিট করতে পারি? {#contract-deposits}

ERC-223 টোকেনের `transfer(address,uint256)` বা `transfer(address,uint256,bytes)` ফাংশন কল করুন, `RecipientContract`-এর ঠিকানা নির্দিষ্ট করে।

### আমরা যদি এই কন্ট্র্যাক্টে একটি ERC-20 টোকেন স্থানান্তর করি তাহলে কী হবে? {#erc-20-transfers}

যদি `RecipientContract`-এ একটি ERC-20 টোকেন পাঠানো হয়, টোকেনগুলি স্থানান্তরিত হবে, কিন্তু স্থানান্তরটি স্বীকৃত হবে না (কোনও `Deposit()` ইভেন্ট ফায়ার করা হবে না, এবং ডিপোজিটের মান পরিবর্তন হবে না)। অবাঞ্ছিত ERC-20 ডিপোজিট ফিল্টার বা প্রতিরোধ করা যায় না।

### যদি আমরা টোকেন ডিপোজিট সম্পূর্ণ হওয়ার পরে কিছু ফাংশন এক্সিকিউট করতে চাই? {#function-execution}

এর একাধিক উপায় আছে। এই উদাহরণে আমরা সেই পদ্ধতিটি অনুসরণ করব যা ERC-223 স্থানান্তরকে ইথার স্থানান্তরের অনুরূপ করে তোলে:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
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

যখন `RecipientContract` একটি ERC-223 টোকেন গ্রহণ করবে, তখন কন্ট্র্যাক্টটি টোকেন লেনদেনের `_data` প্যারামিটার হিসেবে এনকোড করা একটি ফাংশন এক্সিকিউট করবে, যা ইথার লেনদেনগুলি লেনদেনের `data` হিসেবে ফাংশন কল এনকোড করার পদ্ধতির অনুরূপ। আরও তথ্যের জন্য [ডেটা ফিল্ড](/developers/docs/transactions/#the-data-field) পড়ুন।

উপরের উদাহরণে, `RecipientContract`-এর ঠিকানায় `transfer(address,uin256,bytes calldata _data)` ফাংশন দিয়ে একটি ERC-223 টোকেন স্থানান্তর করতে হবে। যদি ডেটা প্যারামিটার `0xc2985578` (`foo()` ফাংশনের সিগনেচার) হয়, তাহলে টোকেন ডিপোজিট পাওয়ার পরে foo() ফাংশনটি চালু হবে এবং Foo() ইভেন্টটি ফায়ার করা হবে।

`_someNumber`-এর জন্য 12345 মান সহ টোকেন স্থানান্তরের `data`-তেও প্যারামিটার এনকোড করা যেতে পারে, উদাহরণস্বরূপ আমরা bar() ফাংশনটিকে কল করতে পারি। এই ক্ষেত্রে, `data` অবশ্যই `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` হতে হবে যেখানে `0x0423a132` হল `bar(uint256)` ফাংশনের সিগনেচার এবং `00000000000000000000000000000000000000000000000000000000000004d2` হল 12345 যা uint256 হিসেবে লেখা।

## সীমাবদ্ধতা {#limitations}

যদিও ERC-223 ERC-20 স্ট্যান্ডার্ডে পাওয়া বেশ কিছু সমস্যার সমাধান করে, এটি তার নিজস্ব সীমাবদ্ধতা ছাড়া নয়:

- গ্রহণযোগ্যতা এবং সামঞ্জস্যতা: ERC-223 এখনও ব্যাপকভাবে গৃহীত হয়নি, যা বিদ্যমান টুল এবং প্ল্যাটফর্মগুলির সাথে এর সামঞ্জস্যতা সীমিত করতে পারে।
- পশ্চাৎগামী সামঞ্জস্যতা: ERC-223, ERC-20-এর সাথে পশ্চাৎগামী সামঞ্জস্যপূর্ণ নয়, যার অর্থ হল বিদ্যমান ERC-20 কন্ট্র্যাক্ট এবং টুলগুলি পরিবর্তন ছাড়া ERC-223 টোকেনগুলির সাথে কাজ করবে না।
- গ্যাস খরচ: ERC-223 স্থানান্তরের অতিরিক্ত চেক এবং কার্যকারিতার ফলে ERC-20 লেনদেনের তুলনায় গ্যাসের খরচ বেশি হতে পারে।

## আরও পড়ুন {#further-reading}

- [EIP-223: ERC-223 টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-223)
- [প্রাথমিক ERC-223 প্রস্তাব](https://github.com/ethereum/eips/issues/223)
