---
title: "একটি সলিডিটি স্মার্ট কন্ট্রাক্ট থেকে ERC-20 টোকেনের ট্রান্সফার এবং অ্যাপ্রুভাল"
description: "সলিডিটি ব্যবহার করে একটি DEX স্মার্ট কন্ট্রাক্ট তৈরি করুন যা ERC-20 টোকেন ট্রান্সফার এবং অ্যাপ্রুভাল পরিচালনা করে।"
author: "jdourlens"
tags: ["স্মার্ট কন্ট্রাক্ট", "টোকেন", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "ERC-20 ট্রান্সফার"
lang: bn
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

পূর্ববর্তী টিউটোরিয়ালে আমরা ইথিরিয়াম ব্লকচেইনে [সলিডিটিতে একটি ERC-20 টোকেনের অ্যানাটমি](/developers/tutorials/understand-the-erc-20-token-smart-contract/) সম্পর্কে জেনেছি। এই আর্টিকেলে আমরা দেখব কীভাবে সলিডিটি ভাষা ব্যবহার করে একটি টোকেনের সাথে ইন্টারঅ্যাক্ট করার জন্য একটি স্মার্ট কন্ট্রাক্ট ব্যবহার করা যায়।

এই স্মার্ট কন্ট্রাক্টের জন্য, আমরা একটি বাস্তব ডামি ডিসেন্ট্রালাইজড এক্সচেঞ্জ তৈরি করব যেখানে একজন ব্যবহারকারী আমাদের নতুন ডিপ্লয় করা [ERC-20 টোকেন](/developers/docs/standards/tokens/erc-20/)-এর বিনিময়ে ইথার ট্রেড করতে পারবেন।

এই টিউটোরিয়ালের জন্য আমরা পূর্ববর্তী টিউটোরিয়ালে লেখা কোডটিকে ভিত্তি হিসেবে ব্যবহার করব। আমাদের DEX এর কনস্ট্রাক্টরে কন্ট্রাক্টের একটি ইনস্ট্যান্স তৈরি করবে এবং নিচের কাজগুলো সম্পাদন করবে:

- টোকেন থেকে ইথারে এক্সচেঞ্জ করা
- ইথার থেকে টোকেনে এক্সচেঞ্জ করা

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

আমাদের নতুন DEX স্মার্ট কন্ট্রাক্ট ERC-20 ডিপ্লয় করবে এবং সরবরাহকৃত সবকিছু পাবে:

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

সুতরাং এখন আমাদের কাছে আমাদের DEX আছে এবং এতে সমস্ত টোকেন রিজার্ভ উপলব্ধ রয়েছে। কন্ট্রাক্টটির দুটি ফাংশন রয়েছে:

- `buy`: ব্যবহারকারী ইথার পাঠাতে পারেন এবং বিনিময়ে টোকেন পেতে পারেন
- `sell`: ব্যবহারকারী ইথার ফেরত পেতে টোকেন পাঠানোর সিদ্ধান্ত নিতে পারেন

## buy ফাংশন {#the-buy-function}

চলুন buy ফাংশনটি কোড করি। আমাদের প্রথমে মেসেজে থাকা ইথারের পরিমাণ চেক করতে হবে এবং যাচাই করতে হবে যে কন্ট্রাক্টগুলোর কাছে পর্যাপ্ত টোকেন আছে এবং মেসেজে কিছু ইথার রয়েছে। যদি কন্ট্রাক্টের কাছে পর্যাপ্ত টোকেন থাকে তবে এটি ব্যবহারকারীকে টোকেনের সংখ্যা পাঠাবে এবং `Bought` ইভেন্ট এমিট করবে।

মনে রাখবেন যে যদি আমরা কোনো ত্রুটির ক্ষেত্রে require ফাংশন কল করি, তবে পাঠানো ইথার সরাসরি রিভার্ট হয়ে যাবে এবং ব্যবহারকারীকে ফেরত দেওয়া হবে।

বিষয়গুলো সহজ রাখার জন্য, আমরা শুধু 1 Wei-এর বিনিময়ে 1 টোকেন এক্সচেঞ্জ করব।

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

যদি কেনা সফল হয় তবে আমাদের লেনদেনে দুটি ইভেন্ট দেখতে পাওয়া উচিত: টোকেন `Transfer` এবং `Bought` ইভেন্ট।

![লেনদেনে দুটি ইভেন্ট: Transfer এবং Bought](./transfer-and-bought-events.png)

## sell ফাংশন {#the-sell-function}

বিক্রির জন্য দায়ী ফাংশনটি প্রথমে ব্যবহারকারীকে আগে থেকে approve ফাংশন কল করে পরিমাণটি অনুমোদন করতে বলবে। ট্রান্সফার অনুমোদন করার জন্য DEX দ্বারা ইনস্ট্যানশিয়েট করা ERC20Basic টোকেনটিকে ব্যবহারকারীর দ্বারা কল করা প্রয়োজন। এটি প্রথমে DEX কন্ট্রাক্টের `token()` ফাংশন কল করে অর্জন করা যেতে পারে, যাতে DEX যেখানে `token` নামক ERC20Basic কন্ট্রাক্ট ডিপ্লয় করেছে সেই এডড্রেসটি পুনরুদ্ধার করা যায়। তারপর আমরা আমাদের সেশনে সেই কন্ট্রাক্টের একটি ইনস্ট্যান্স তৈরি করি এবং এর `approve` ফাংশন কল করি। এরপর আমরা DEX-এর `sell` ফাংশন কল করতে এবং ইথারের বিনিময়ে আমাদের টোকেনগুলো সোয়াপ করতে সক্ষম হই। উদাহরণস্বরূপ, একটি ইন্টারেক্টিভ ব্রাউনি সেশনে এটি দেখতে এমন হয়:

```python
# ### ইন্টারেক্টিভ ব্রাউনি কনসোলে পাইথন...

# DEX ডিপ্লয় করুন
dex = DEX.deploy({'from':account1})

# টোকেনের জন্য ইথার সোয়াপ করতে buy ফাংশনটি কল করুন
# 1e18 হলো ওয়েই (wei) এককে ১ ইথার
dex.buy({'from': account2, 1e18})

# ERC20 টোকেনের ডিপ্লয়মেন্ট অ্যাড্রেসটি সংগ্রহ করুন
# যা DEX কন্ট্রাক্ট তৈরির সময় ডিপ্লয় করা হয়েছিল
# dex.token() টোকেনের ডিপ্লয় করা অ্যাড্রেসটি রিটার্ন করে
token = ERC20Basic.at(dex.token())

# টোকেনের approve ফাংশনটি কল করুন
# স্পেন্ডার হিসেবে dex অ্যাড্রেসটিকে অ্যাপ্রুভ করুন
# এবং এটি আপনার কতগুলো টোকেন খরচ করার অনুমতি পাবে
token.approve(dex.address, 3e18, {'from':account2})

```

তারপর যখন sell ফাংশন কল করা হয়, আমরা চেক করব কলার এডড্রেস থেকে কন্ট্রাক্ট এডড্রেসে ট্রান্সফার সফল হয়েছে কিনা এবং তারপর কলার এডড্রেসে ইথারগুলো ফেরত পাঠাব।

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

যদি সবকিছু ঠিকঠাক কাজ করে তবে আপনার লেনদেনে 2টি ইভেন্ট (একটি `Transfer` এবং `Sold`) দেখতে পাওয়া উচিত এবং আপনার টোকেন ব্যালেন্স ও ইথার ব্যালেন্স আপডেট হওয়া উচিত।

![লেনদেনে দুটি ইভেন্ট: Transfer এবং Sold](./transfer-and-sold-events.png)

<Divider />

এই টিউটোরিয়াল থেকে আমরা দেখেছি কীভাবে একটি ERC-20 টোকেনের ব্যালেন্স এবং অ্যালাউন্স চেক করতে হয় এবং ইন্টারফেস ব্যবহার করে একটি ERC20 স্মার্ট কন্ট্রাক্টের `Transfer` এবং `TransferFrom` কল করতে হয়।

একবার আপনি একটি লেনদেন করলে, আপনার কন্ট্রাক্টে করা [লেনদেনগুলোর জন্য অপেক্ষা করতে এবং বিস্তারিত জানতে](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) আমাদের একটি জাভাস্ক্রিপ্ট টিউটোরিয়াল রয়েছে এবং যতক্ষণ আপনার কাছে ABI আছে ততক্ষণ [টোকেন ট্রান্সফার বা অন্য কোনো ইভেন্ট দ্বারা জেনারেট করা ইভেন্টগুলো ডিকোড করার জন্য একটি টিউটোরিয়াল](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/) রয়েছে।

নিচে টিউটোরিয়ালের সম্পূর্ণ কোড দেওয়া হলো:

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
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```