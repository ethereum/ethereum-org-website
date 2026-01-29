---
title: "একটি সলিডিটি স্মার্ট কন্ট্র্যাক্ট থেকে ERC-20 টোকেনগুলির স্থানান্তর এবং অনুমোদন"
description: "সলিডিটি ব্যবহার করে ERC-20 টোকেন স্থানান্তর এবং অনুমোদনগুলি পরিচালনা করে এমন একটি DEX স্মার্ট কন্ট্র্যাক্ট তৈরি করুন।"
author: "jdourlens"
tags: [ "স্মার্ট কন্ট্র্যাক্ট", "টোকেন", "সলিডিটি", "erc-20" ]
skill: intermediate
lang: bn
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

আগের টিউটোরিয়ালে আমরা ইথেরিয়াম ব্লকচেইনে [সলিডিটিতে একটি ERC-20 টোকেনের অ্যানাটমি](/developers/tutorials/understand-the-erc-20-token-smart-contract/) নিয়ে আলোচনা করেছি। এই নিবন্ধে আমরা দেখব কিভাবে সলিডিটি ভাষা ব্যবহার করে একটি টোকেনের সাথে ইন্টারঅ্যাক্ট করার জন্য আমরা একটি স্মার্ট কন্ট্র্যাক্ট ব্যবহার করতে পারি।

এই স্মার্ট কন্ট্র্যাক্টের জন্য, আমরা একটি আসল ডামি ডিসেন্ট্রালাইজড এক্সচেঞ্জ তৈরি করব যেখানে একজন ব্যবহারকারী আমাদের নতুন স্থাপন করা [ERC-20 টোকেন](/developers/docs/standards/tokens/erc-20/) এর জন্য ইথার ট্রেড করতে পারে।

এই টিউটোরিয়ালের জন্য আমরা আগের টিউটোরিয়ালে লেখা কোডটি ভিত্তি হিসাবে ব্যবহার করব। আমাদের DEX তার কনস্ট্রাক্টরে কন্ট্র্যাক্টের একটি উদাহরণ ইনস্ট্যানশিয়েট করবে এবং এই অপারেশনগুলি সম্পাদন করবে:

- টোকেনকে ইথারে বিনিময় করা
- ইথারকে টোকেনে বিনিময় করা

আমরা আমাদের সাধারণ ERC20 কোডবেস যোগ করে আমাদের ডিসেন্ট্রালাইজড এক্সচেঞ্জ কোড শুরু করব:

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

আমাদের নতুন DEX স্মার্ট কন্ট্র্যাক্ট ERC-20 স্থাপন করবে এবং সরবরাহ করা সমস্ত কিছু পাবে:

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

সুতরাং এখন আমাদের DEX আছে এবং এতে সমস্ত টোকেন রিজার্ভ উপলব্ধ রয়েছে। কন্ট্র্যাক্টটির দুটি ফাংশন রয়েছে:

- `buy`: ব্যবহারকারী ইথার পাঠাতে এবং বিনিময়ে টোকেন পেতে পারে
- `sell`: ব্যবহারকারী ইথার ফেরত পেতে টোকেন পাঠানোর সিদ্ধান্ত নিতে পারে

## buy ফাংশন {#the-buy-function}

আসুন buy ফাংশনটি কোড করি। আমাদের প্রথমে মেসেজে থাকা ইথারের পরিমাণ পরীক্ষা করতে হবে এবং যাচাই করতে হবে যে কন্ট্র্যাক্টগুলির কাছে পর্যাপ্ত টোকেন আছে এবং মেসেজে কিছু ইথার আছে। যদি কন্ট্র্যাক্টের কাছে পর্যাপ্ত টোকেন থাকে তবে এটি ব্যবহারকারীকে টোকেনের সংখ্যা পাঠাবে এবং `Bought` ইভেন্টটি নির্গত করবে।

লক্ষ্য করুন যে যদি আমরা একটি ত্রুটির ক্ষেত্রে require ফাংশনটিকে কল করি তবে পাঠানো ইথার সরাসরি প্রত্যাবর্তন করা হবে এবং ব্যবহারকারীকে ফেরত দেওয়া হবে।

জিনিসগুলি সহজ রাখতে, আমরা শুধু 1 Wei এর জন্য 1 টোকেন বিনিময় করি।

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "আপনাকে কিছু ইথার পাঠাতে হবে");
    require(amountTobuy <= dexBalance, "রিজার্ভে পর্যাপ্ত টোকেন নেই");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

যে ক্ষেত্রে কেনা সফল হয়, সেক্ষেত্রে আমাদের লেনদেনে দুটি ইভেন্ট দেখা উচিত: টোকেন `Transfer` এবং `Bought` ইভেন্ট।

![লেনদেনের দুটি ইভেন্ট: স্থানান্তর এবং কেনা](./transfer-and-bought-events.png)

## sell ফাংশন {#the-sell-function}

বিক্রির জন্য দায়ী ফাংশনের জন্য প্রথমে ব্যবহারকারীকে আগে থেকে approve ফাংশন কল করে পরিমাণটি অনুমোদন করতে হবে। স্থানান্তর অনুমোদন করার জন্য DEX দ্বারা ইনস্ট্যানশিয়েট করা ERC20Basic টোকেনটি ব্যবহারকারী দ্বারা কল করা প্রয়োজন। DEX কন্ট্র্যাক্টের `token()` ফাংশনটি প্রথমে কল করে এটি অর্জন করা যেতে পারে যেখানে DEX `token` নামক ERC20Basic কন্ট্র্যাক্টটি স্থাপন করেছে তার ঠিকানাটি পুনরুদ্ধার করার জন্য। তারপরে আমরা আমাদের সেশনে সেই কন্ট্র্যাক্টের একটি উদাহরণ তৈরি করি এবং তার `approve` ফাংশনটি কল করি। তারপর আমরা DEX-এর `sell` ফাংশন কল করতে এবং আমাদের টোকেনগুলিকে ইথারের জন্য আবার সোয়্যাপ করতে সক্ষম। উদাহরণস্বরূপ, একটি ইন্টারেক্টিভ ব্রাউনি সেশনে এটি দেখতে এইরকম:

```python
#### ইন্টারেক্টিভ ব্রাউনি কনসোলে পাইথন...

# DEX স্থাপন করুন
dex = DEX.deploy({'from':account1})

# টোকেনের জন্য ইথার সোয়্যাপ করতে buy ফাংশনটি কল করুন
# 1e18 হল wei-তে চিহ্নিত 1 ইথার
dex.buy({'from': account2, 1e18})

# ERC20 টোকেনের জন্য স্থাপনার ঠিকানা পান
# যা DEX কন্ট্র্যাক্ট তৈরির সময় স্থাপন করা হয়েছিল
# dex.token() টোকেনের জন্য স্থাপন করা ঠিকানা প্রদান করে
token = ERC20Basic.at(dex.token())

# টোকেনের approve ফাংশনটি কল করুন
# dex ঠিকানাটিকে স্পেন্ডার হিসেবে অনুমোদন করুন
# এবং আপনার কতগুলি টোকেন এটি খরচ করার অনুমতি পাবে
token.approve(dex.address, 3e18, {'from':account2})

```

তারপর যখন sell ফাংশনটি কল করা হয়, আমরা পরীক্ষা করব যে কলার ঠিকানা থেকে কন্ট্র্যাক্ট ঠিকানায় স্থানান্তর সফল হয়েছে কিনা এবং তারপর কলার ঠিকানায় ইথারগুলি ফেরত পাঠাব।

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "আপনাকে অন্তত কিছু টোকেন বিক্রি করতে হবে");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "টোকেন অ্যালাউন্স পরীক্ষা করুন");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

যদি সবকিছু ঠিকঠাক কাজ করে তবে আপনার লেনদেনে 2টি ইভেন্ট (একটি `Transfer` এবং `Sold`) দেখা উচিত এবং আপনার টোকেন ব্যালেন্স এবং ইথার ব্যালেন্স আপডেট করা উচিত।

![লেনদেনের দুটি ইভেন্ট: স্থানান্তর এবং বিক্রি](./transfer-and-sold-events.png)

<Divider />

এই টিউটোরিয়াল থেকে আমরা দেখেছি কিভাবে একটি ERC-20 টোকেনের ব্যালেন্স এবং অ্যালাউন্স পরীক্ষা করতে হয় এবং ইন্টারফেস ব্যবহার করে একটি ERC20 স্মার্ট কন্ট্র্যাক্টের `Transfer` এবং `TransferFrom` কল করতে হয়।

একবার আপনি একটি লেনদেন করলে আমাদের কাছে একটি জাভাস্ক্রিপ্ট টিউটোরিয়াল রয়েছে [লেনদেন সম্পর্কে অপেক্ষা করা এবং বিস্তারিত জানার জন্য](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) যা আপনার চুক্তিতে করা হয়েছিল এবং একটি [টিউটোরিয়াল টোকেন স্থানান্তর বা অন্য কোনো ইভেন্ট দ্বারা উত্পন্ন ইভেন্ট ডিকোড করার জন্য](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) যতক্ষণ আপনার ABI থাকে।

টিউটোরিয়ালের জন্য সম্পূর্ণ কোড এখানে দেওয়া হল:

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "আপনাকে কিছু ইথার পাঠাতে হবে");
        require(amountTobuy <= dexBalance, "রিজার্ভে পর্যাপ্ত টোকেন নেই");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "আপনাকে অন্তত কিছু টোকেন বিক্রি করতে হবে");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "টোকেন অ্যালাউন্স পরীক্ষা করুন");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
