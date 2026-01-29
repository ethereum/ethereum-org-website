---
title: "স্ক্যাম টোকেন দ্বারা ব্যবহৃত কিছু কৌশল এবং সেগুলি কীভাবে সনাক্ত করা যায়"
description: এই টিউটোরিয়ালে আমরা একটি স্ক্যাম টোকেনকে ব্যবচ্ছেদ করে দেখব যে স্ক্যামাররা কী কী কৌশল খেলে, তারা কীভাবে সেগুলি প্রয়োগ করে এবং আমরা কীভাবে সেগুলি সনাক্ত করতে পারি।
author: Ori Pomerantz
tags:
  [
    "স্ক্যাম",
    "সলিডিটি",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: bn
---

এই টিউটোরিয়ালে আমরা স্ক্যামাররা কী কী কৌশল ব্যবহার করে এবং কীভাবে তারা সেগুলি প্রয়োগ করে তা দেখতে [একটি স্ক্যাম টোকেন](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) ব্যবচ্ছেদ করব। টিউটোরিয়ালের শেষে আপনি ERC-20 টোকেন চুক্তি, তাদের ক্ষমতা এবং কেন সন্দেহবাদিতা প্রয়োজন সে সম্পর্কে আরও বিস্তৃত ধারণা পাবেন। তারপর আমরা সেই স্ক্যাম টোকেন দ্বারা নির্গত ইভেন্টগুলি দেখব এবং দেখব যে এটি স্বয়ংক্রিয়ভাবে বৈধ নয় তা আমরা কীভাবে সনাক্ত করতে পারি।

## স্ক্যাম টোকেন - সেগুলি কী, কেন মানুষ সেগুলি তৈরি করে এবং কীভাবে সেগুলি এড়ানো যায় {#scam-tokens}

Ethereum-এর অন্যতম সাধারণ ব্যবহার হল একটি গোষ্ঠীর জন্য একটি ট্রেডযোগ্য টোকেন তৈরি করা, এক অর্থে তাদের নিজস্ব মুদ্রা। যাইহোক, যেখানেই মূল্য নিয়ে আসে এমন বৈধ ব্যবহারের ক্ষেত্র রয়েছে, সেখানে অপরাধীরাও রয়েছে যারা নিজেদের জন্য সেই মূল্য চুরি করার চেষ্টা করে।

আপনি ব্যবহারকারীর দৃষ্টিকোণ থেকে [ethereum.org-এর অন্যত্র](/guides/how-to-id-scam-tokens/) এই বিষয় সম্পর্কে আরও পড়তে পারেন। এই টিউটোরিয়ালটি একটি স্ক্যাম টোকেন ব্যবচ্ছেদ করার উপর দৃষ্টি নিবদ্ধ করে এটি কীভাবে করা হয় এবং কীভাবে এটি সনাক্ত করা যায় তা দেখার জন্য।

### আমি কীভাবে জানব যে wARB একটি স্ক্যাম? {#warb-scam}

আমরা যে টোকেনটি ব্যবচ্ছেদ করছি তা হল [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), যা বৈধ [ARB টোকেন](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)-এর সমতুল্য হওয়ার ভান করে।

কোনটি বৈধ টোকেন তা জানার সবচেয়ে সহজ উপায় হল উৎপত্তিস্থল সংস্থা, [Arbitrum](https://arbitrum.foundation/)-এর দিকে নজর দেওয়া। বৈধ ঠিকানাগুলি [তাদের নথিপত্রে](https://docs.arbitrum.foundation/deployment-addresses#token) নির্দিষ্ট করা আছে।

### সোর্স কোড কেন পাওয়া যায়? {#why-source}

সাধারণত আমরা আশা করি যে যারা অন্যদের স্ক্যাম করার চেষ্টা করে তারা গোপনীয় হবে এবং প্রকৃতপক্ষে অনেক স্ক্যাম টোকেনের কোড উপলব্ধ থাকে না (উদাহরণস্বরূপ, [এইটি](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) এবং [এইটি](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))।

যাইহোক, বৈধ টোকেনগুলি সাধারণত তাদের সোর্স কোড প্রকাশ করে, তাই বৈধ বলে মনে হওয়ার জন্য স্ক্যাম টোকেনগুলির লেখকরাও কখনও কখনও একই কাজ করে। [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) সেইসব টোকেনগুলির মধ্যে একটি যার সোর্স কোড উপলব্ধ রয়েছে, যা এটিকে বোঝা সহজ করে তোলে।

যদিও চুক্তি স্থাপনকারীরা সোর্স কোড প্রকাশ করবেন কিনা তা বেছে নিতে পারেন, তারা ভুল সোর্স কোড প্রকাশ করতে _পারেন না_। ব্লক এক্সপ্লোরার স্বাধীনভাবে প্রদত্ত সোর্স কোড কম্পাইল করে, এবং যদি এটি একই বাইটকোড না পায়, তবে এটি সেই সোর্স কোড প্রত্যাখ্যান করে। [আপনি Etherscan সাইটে এই সম্পর্কে আরও পড়তে পারেন](https://etherscan.io/verifyContract)।

## বৈধ ERC-20 টোকেনের সাথে তুলনা {#compare-legit-erc20}

আমরা এই টোকেনটিকে বৈধ ERC-20 টোকেনগুলির সাথে তুলনা করতে যাচ্ছি। বৈধ ERC-20 টোকেনগুলি সাধারণত কীভাবে লেখা হয় তার সাথে যদি আপনি পরিচিত না হন, [এই টিউটোরিয়ালটি দেখুন](/developers/tutorials/erc20-annotated-code/)।

### বিশেষ সুবিধাপ্রাপ্ত ঠিকানার জন্য কনস্ট্যান্ট {#constants-for-privileged-addresses}

চুক্তিতে কখনও কখনও বিশেষ সুবিধাপ্রাপ্ত ঠিকানার প্রয়োজন হয়। দীর্ঘমেয়াদী ব্যবহারের জন্য ডিজাইন করা চুক্তিগুলি কিছু বিশেষ সুবিধাপ্রাপ্ত ঠিকানাকে সেই ঠিকানাগুলি পরিবর্তন করার অনুমতি দেয়, উদাহরণস্বরূপ একটি নতুন মাল্টিসিগ চুক্তির ব্যবহার সক্ষম করতে। এটি করার বিভিন্ন উপায় আছে।

[`HOP` টোকেন চুক্তি](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) প্যাটার্ন ব্যবহার করে। বিশেষ সুবিধাপ্রাপ্ত ঠিকানাটি স্টোরেজে রাখা হয়, `_owner` নামক একটি ফিল্ডে (তৃতীয় ফাইলটি দেখুন, `Ownable.sol`)।

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` টোকেন চুক্তিতে](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) সরাসরি কোনো বিশেষ সুবিধাপ্রাপ্ত ঠিকানা নেই। যাইহোক, এর একটির প্রয়োজন নেই। এটি [`0xb50721bcf8d664c30412cfbc6cf7a15145234ad1` ঠিকানায়](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) একটি [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)-এর পিছনে বসে। সেই চুক্তিতে একটি বিশেষ সুবিধাপ্রাপ্ত ঠিকানা রয়েছে (চতুর্থ ফাইলটি দেখুন, `ERC1967Upgrade.sol`) যা আপগ্রেডের জন্য ব্যবহার করা যেতে পারে।

```solidity
    /**
     * @dev EIP1967 অ্যাডমিন স্লটে একটি নতুন ঠিকানা স্টোর করে।
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

বিপরীতে, `wARB` চুক্তিতে একটি হার্ড কোডেড `contract_owner` আছে।

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[এই চুক্তির মালিক](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) এমন কোনো চুক্তি নয় যা বিভিন্ন সময়ে বিভিন্ন অ্যাকাউন্ট দ্বারা নিয়ন্ত্রিত হতে পারে, বরং একটি [বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্ট](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)। এর মানে হল যে এটি সম্ভবত একজন ব্যক্তির দ্বারা স্বল্পমেয়াদী ব্যবহারের জন্য ডিজাইন করা হয়েছে, মূল্যবান থাকবে এমন একটি ERC-20 নিয়ন্ত্রণ করার জন্য দীর্ঘমেয়াদী সমাধান হিসাবে নয়।

এবং প্রকৃতপক্ষে, যদি আমরা Etherscan-এ দেখি, আমরা দেখতে পাই যে স্ক্যামারটি 19 মে, 2023-এর সময় মাত্র 12 ঘণ্টার জন্য এই চুক্তিটি ব্যবহার করেছে ([প্রথম লেনদেন](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) থেকে [শেষ লেনদেন](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b))।

### নকল `_transfer` ফাংশন {#the-fake-transfer-function}

[একটি অভ্যন্তরীণ `_transfer` ফাংশন](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) ব্যবহার করে প্রকৃত স্থানান্তর হওয়াটা স্ট্যান্ডার্ড।

`wARB`-এ এই ফাংশনটি প্রায় বৈধ দেখায়:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

সন্দেহজনক অংশটি হল:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

যদি চুক্তির মালিক টোকেন পাঠান, তাহলে `Transfer` ইভেন্টটি কেন দেখায় যে সেগুলি `deployer` থেকে এসেছে?

যাইহোক, একটি আরো গুরুত্বপূর্ণ সমস্যা আছে। এই `_transfer` ফাংশন কে কল করে? এটিকে বাইরে থেকে কল করা যায় না, এটি `internal` হিসাবে চিহ্নিত করা হয়েছে। এবং আমাদের কাছে থাকা কোডে `_transfer`-এ কোনো কল অন্তর্ভুক্ত নেই। স্পষ্টতই, এটি এখানে একটি ফাঁদ হিসাবে রয়েছে।

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

যখন আমরা টোকেন স্থানান্তর করার জন্য কল করা ফাংশনগুলি দেখি, `transfer` এবং `transferFrom`, আমরা দেখি যে তারা একটি সম্পূর্ণ ভিন্ন ফাংশন, `_f_` কল করে।

### আসল `_f_` ফাংশন {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

এই ফাংশনে দুটি সম্ভাব্য লাল পতাকা রয়েছে।

- [ফাংশন মডিফায়ার](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`-এর ব্যবহার। যাইহোক, যখন আমরা সোর্স কোডটি দেখি তখন আমরা দেখতে পাই যে `_mod_` আসলে নিরীহ।

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- একই সমস্যা আমরা `_transfer`-এ দেখেছি, যা হল যখন `contract_owner` টোকেন পাঠায় তখন সেগুলি `deployer` থেকে এসেছে বলে মনে হয়।

### নকল ইভেন্ট ফাংশন `dropNewTokens` {#the-fake-events-function-dropNewTokens}

এখন আমরা এমন কিছুতে এসেছি যা একটি আসল স্ক্যামের মতো দেখাচ্ছে। আমি পঠনযোগ্যতার জন্য ফাংশনটি কিছুটা সম্পাদনা করেছি, কিন্তু এটি কার্যকরীভাবে সমতুল্য।

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

এই ফাংশনে `auth()` মডিফায়ার রয়েছে, যার মানে এটি শুধুমাত্র চুক্তির মালিক দ্বারা কল করা যেতে পারে।

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

এই সীমাবদ্ধতাটি নিখুঁত অর্থবহ, কারণ আমরা চাই না যে এলোমেলো অ্যাকাউন্টগুলি টোকেন বিতরণ করুক। যাইহোক, ফাংশনের বাকি অংশ সন্দেহজনক।

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

একটি পুল অ্যাকাউন্ট থেকে রিসিভারদের একটি অ্যারেতে একটি পরিমাণের অ্যারে স্থানান্তর করার জন্য একটি ফাংশন নিখুঁত অর্থবহ। অনেক ব্যবহারের ক্ষেত্রে আপনি একটি একক উৎস থেকে একাধিক গন্তব্যে টোকেন বিতরণ করতে চাইবেন, যেমন পে-রোল, এয়ারড্রপ ইত্যাদি। একাধিক লেনদেন ইস্যু করার পরিবর্তে একটি একক লেনদেনে এটি করা (গ্যাস-এর দিক থেকে) সস্তা, অথবা এমনকি একই লেনদেনের অংশ হিসাবে একটি ভিন্ন চুক্তি থেকে একাধিকবার ERC-20 কল করা।

যাইহোক, `dropNewTokens` তা করে না। এটি [`Transfer` ইভেন্ট](https://eips.ethereum.org/EIPS/eip-20#transfer-1) নির্গত করে, কিন্তু আসলে কোনো টোকেন স্থানান্তর করে না। অফচেইন অ্যাপ্লিকেশনগুলিকে এমন একটি স্থানান্তরের কথা বলে বিভ্রান্ত করার কোনো বৈধ কারণ নেই যা আসলে ঘটেনি।

### বার্নিং `Approve` ফাংশন {#the-burning-approve-function}

ERC-20 চুক্তিগুলিতে ভাতাগুলির জন্য [একটি `approve` ফাংশন](/developers/tutorials/erc20-annotated-code/#approve) থাকার কথা, এবং প্রকৃতপক্ষে আমাদের স্ক্যাম টোকেনের এমন একটি ফাংশন রয়েছে এবং এটি এমনকি সঠিক। যাইহোক, যেহেতু Solidity C থেকে এসেছে, তাই এটি কেস সংবেদনশীল। "Approve" এবং "approve" ভিন্ন স্ট্রিং।

এছাড়াও, কার্যকারিতা `approve`-এর সাথে সম্পর্কিত নয়।

```solidity
    function Approve(
        address[] memory holders)
```

এই ফাংশনটি টোকেনের হোল্ডারদের জন্য ঠিকানার একটি অ্যারে দিয়ে কল করা হয়।

```solidity
    public approver() {
```

`approver()` মডিফায়ার নিশ্চিত করে যে শুধুমাত্র `contract_owner`-কে এই ফাংশনটি কল করার অনুমতি দেওয়া হয়েছে (নীচে দেখুন)।

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

প্রতিটি হোল্ডার ঠিকানার জন্য ফাংশনটি হোল্ডারের সম্পূর্ণ ব্যালেন্স `0x00...01` ঠিকানায় স্থানান্তরিত করে, কার্যকরভাবে এটিকে বার্ন করে (স্ট্যান্ডার্ডে প্রকৃত `burn` মোট সরবরাহও পরিবর্তন করে, এবং টোকেনগুলিকে `0x00...00`-এ স্থানান্তর করে)। এর মানে হল যে `contract_owner` যেকোনো ব্যবহারকারীর সম্পদ সরিয়ে ফেলতে পারে। এটি একটি গভর্নেন্স টোকেনে আপনি চাইবেন এমন একটি বৈশিষ্ট্য বলে মনে হয় না।

### কোড মানের সমস্যা {#code-quality-issues}

এই কোড মানের সমস্যাগুলি _প্রমাণ_ করে না যে এই কোডটি একটি স্ক্যাম, তবে তারা এটিকে সন্দেহজনক করে তোলে। Arbitrum-এর মতো সংগঠিত কোম্পানিগুলো সাধারণত এত খারাপ কোড প্রকাশ করে না।

#### `mount` ফাংশন {#the-mount-function}

যদিও এটি [স্ট্যান্ডার্ডে](https://eips.ethereum.org/EIPS/eip-20) নির্দিষ্ট করা নেই, সাধারণভাবে বলতে গেলে নতুন টোকেন তৈরি করার ফাংশনকে [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) বলা হয়।

যদি আমরা `wARB` কনস্ট্রাক্টরের দিকে তাকাই, আমরা দেখতে পাই যে মিন্ট ফাংশনটির নাম কোনো কারণে `mount` করা হয়েছে, এবং দক্ষতার জন্য সম্পূর্ণ পরিমাণের জন্য একবারের পরিবর্তে প্রাথমিক সরবরাহের এক পঞ্চমাংশ দিয়ে পাঁচবার কল করা হয়েছে।

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` ফাংশনটিও সন্দেহজনক।

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require`-এর দিকে তাকালে আমরা দেখি যে শুধুমাত্র চুক্তির মালিককেই মিন্ট করার অনুমতি দেওয়া হয়েছে। এটা বৈধ। কিন্তু ত্রুটির বার্তাটি হওয়া উচিত _শুধুমাত্র মালিককে মিন্ট করার অনুমতি দেওয়া হয়েছে_ বা এই জাতীয় কিছু। পরিবর্তে, এটি অপ্রাসঙ্গিক _ERC20: mint to the zero address_। শূন্য ঠিকানায় মিন্ট করার জন্য সঠিক পরীক্ষা হল `require(account != address(0), "<error message>")`, যা চুক্তিটি কখনও পরীক্ষা করার প্রয়োজন বোধ করে না।

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

মিন্টিংয়ের সাথে সরাসরি সম্পর্কিত আরও দুটি সন্দেহজনক তথ্য রয়েছে:

- একটি `account` প্যারামিটার রয়েছে, যা সম্ভবত সেই অ্যাকাউন্ট যা মিন্ট করা পরিমাণ গ্রহণ করবে। কিন্তু যে ব্যালেন্সটি বৃদ্ধি পায় তা আসলে `contract_owner`-এর।

- যদিও বর্ধিত ব্যালেন্স `contract_owner`-এর অন্তর্গত, নির্গত ইভেন্টটি `account`-এ একটি স্থানান্তর দেখায়।

### কেন `auth` এবং `approver` দুটোই? কেন `mod` যা কিছুই করে না? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

এই চুক্তিতে তিনটি মডিফায়ার রয়েছে: `_mod_`, `auth`, এবং `approver`।

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` তিনটি প্যারামিটার নেয় এবং তাদের সাথে কিছুই করে না। এটি কেন আছে?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` এবং `approver` আরও অর্থবহ, কারণ তারা পরীক্ষা করে যে চুক্তিটি `contract_owner` দ্বারা কল করা হয়েছিল। আমরা আশা করব যে মিন্টিংয়ের মতো নির্দিষ্ট কিছু সুবিধাপ্রাপ্ত ক্রিয়া সেই অ্যাকাউন্টে সীমাবদ্ধ থাকবে। যাইহোক, দুটি পৃথক ফাংশন থাকার মানে কী যা _ঠিক একই কাজ_ করে?

## আমরা স্বয়ংক্রিয়ভাবে কী সনাক্ত করতে পারি? {#what-can-we-detect-automatically}

আমরা Etherscan দেখে বুঝতে পারি যে `wARB` একটি স্ক্যাম টোকেন। যাইহোক, এটি একটি কেন্দ্রীভূত সমাধান। তাত্ত্বিকভাবে, Etherscan-কে বিপর্যস্ত বা হ্যাক করা যেতে পারে। একটি টোকেন বৈধ কি না তা স্বাধীনভাবে বের করতে পারা ভালো।

একটি ERC-20 টোকেন সন্দেহজনক কিনা (হয় একটি স্ক্যাম বা খুব খারাপভাবে লেখা) তা সনাক্ত করতে আমরা কিছু কৌশল ব্যবহার করতে পারি, তারা যে ইভেন্টগুলি নির্গত করে তা দেখে।

## সন্দেহজনক `Approval` ইভেন্ট {#suspicious-approval-events}

[`Approval` ইভেন্টগুলি](https://eips.ethereum.org/EIPS/eip-20#approval) শুধুমাত্র একটি সরাসরি অনুরোধের সাথে ঘটা উচিত ([`Transfer` ইভেন্টগুলির](https://eips.ethereum.org/EIPS/eip-20#transfer-1) বিপরীতে যা একটি ভাতার ফলস্বরূপ ঘটতে পারে)। এই সমস্যার বিস্তারিত ব্যাখ্যা এবং কেন অনুরোধগুলি সরাসরি হতে হবে, একটি চুক্তির মাধ্যমে মধ্যস্থতা না করে, তার জন্য [Solidity ডক্স দেখুন](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)।

এর মানে হল যে `Approval` ইভেন্টগুলি যা একটি [বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্ট](/developers/docs/accounts/#types-of-account) থেকে ব্যয় অনুমোদন করে সেগুলিকে সেই অ্যাকাউন্টে উদ্ভূত লেনদেন থেকে আসতে হবে, এবং যার গন্তব্য হল ERC-20 চুক্তি। একটি বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্ট থেকে অন্য যেকোনো ধরনের অনুমোদন সন্দেহজনক।

এখানে [viem](https://viem.sh/) এবং [TypeScript](https://www.typescriptlang.org/docs/), টাইপ সুরক্ষাসহ একটি JavaScript ভেরিয়েন্ট ব্যবহার করে [এই ধরনের ইভেন্ট শনাক্তকারী একটি প্রোগ্রাম](https://github.com/qbzzt/20230915-scam-token-detection) দেওয়া হলো। এটি চালানোর জন্য:

1. `.env.example`-কে `.env`-এ কপি করুন।
2. একটি Ethereum mainnet নোডের URL সরবরাহ করতে `.env` সম্পাদনা করুন।
3. প্রয়োজনীয় প্যাকেজগুলি ইনস্টল করতে `pnpm install` চালান।
4. সন্দেহজনক অনুমোদনগুলি খুঁজতে `pnpm susApproval` চালান।

এখানে একটি লাইন-বাই-লাইন ব্যাখ্যা দেওয়া হল:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem` থেকে টাইপ সংজ্ঞা, ফাংশন এবং চেইন সংজ্ঞা ইম্পোর্ট করুন।

```typescript
import { config } from "dotenv"
config()
```

URL পেতে `.env` পড়ুন।

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

একটি Viem ক্লায়েন্ট তৈরি করুন। আমাদের কেবল ব্লকচেইন থেকে পড়তে হবে, তাই এই ক্লায়েন্টের একটি প্রাইভেট কী-এর প্রয়োজন নেই।

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

সন্দেহজনক ERC-20 চুক্তির ঠিকানা, এবং যে ব্লকগুলির মধ্যে আমরা ইভেন্টগুলি খুঁজব। নোড প্রদানকারীরা সাধারণত ইভেন্টগুলি পড়ার আমাদের ক্ষমতা সীমাবদ্ধ করে কারণ ব্যান্ডউইথ ব্যয়বহুল হতে পারে। সৌভাগ্যবশত `wARB` আঠারো ঘণ্টার জন্য ব্যবহারে ছিল না, তাই আমরা সমস্ত ইভেন্টগুলি সন্ধান করতে পারি (মোট মাত্র 13টি ছিল)।

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Viem-কে ইভেন্টের তথ্য জিজ্ঞাসা করার এটিই উপায়। যখন আমরা এটিকে ফিল্ডের নামসহ সঠিক ইভেন্ট স্বাক্ষর সরবরাহ করি, তখন এটি আমাদের জন্য ইভেন্টটিকে পার্স করে।

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

আমাদের অ্যালগরিদম শুধুমাত্র বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্টের জন্য প্রযোজ্য। যদি `client.getBytecode` দ্বারা কোনো বাইটকোড ফেরত দেওয়া হয় তবে এর মানে হল এটি একটি চুক্তি এবং আমাদের এটি এড়িয়ে যাওয়া উচিত।

আপনি যদি আগে TypeScript ব্যবহার না করে থাকেন, তবে ফাংশন সংজ্ঞাটি কিছুটা অদ্ভুত লাগতে পারে। আমরা কেবল এটি বলি না যে প্রথম (এবং একমাত্র) প্যারামিটারটিকে `addr` বলা হয়, বরং এটি `Address` টাইপের। একইভাবে, `: boolean` অংশটি TypeScript-কে বলে যে ফাংশনের রিটার্ন মান একটি বুলিয়ান।

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

এই ফাংশনটি একটি ইভেন্ট থেকে লেনদেনের রসিদ পায়। লেনদেনের গন্তব্য কী ছিল তা নিশ্চিত করার জন্য আমাদের রসিদ প্রয়োজন।

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

এটি সবচেয়ে গুরুত্বপূর্ণ ফাংশন, যা আসলে সিদ্ধান্ত নেয় যে একটি ইভেন্ট সন্দেহজনক কিনা। রিটার্ন টাইপ, `(Event | null)`, TypeScript-কে বলে যে এই ফাংশনটি হয় একটি `Event` বা `null` রিটার্ন করতে পারে। ইভেন্টটি সন্দেহজনক না হলে আমরা `null` রিটার্ন করি।

```typescript
const owner = ev.args._owner
```

Viem-এর কাছে ফিল্ডের নাম আছে, তাই এটি আমাদের জন্য ইভেন্টটি পার্স করেছে। `_owner` হল ব্যয় করা টোকেনের মালিক।

```typescript
// চুক্তি দ্বারা অনুমোদনগুলি সন্দেহজনক নয়
if (await isContract(owner)) return null
```

মালিক যদি একটি চুক্তি হয়, ধরে নিন এই অনুমোদনটি সন্দেহজনক নয়। একটি চুক্তির অনুমোদন সন্দেহজনক কিনা তা পরীক্ষা করার জন্য আমাদের লেনদেনের সম্পূর্ণ এক্সিকিউশন ট্রেস করতে হবে তা দেখতে এটি কখনও মালিক চুক্তিতে পৌঁছেছে কিনা, এবং যদি সেই চুক্তিটি সরাসরি ERC-20 চুক্তিটিকে কল করে থাকে। এটি আমরা যা করতে চাই তার চেয়ে অনেক বেশি রিসোর্স ব্যয়বহুল।

```typescript
const txn = await getEventTxn(ev)
```

যদি অনুমোদনটি একটি বাহ্যিকভাবে মালিকানাধীন অ্যাকাউন্ট থেকে আসে, তবে যে লেনদেনটি এটি ঘটিয়েছে তা পান।

```typescript
// অনুমোদনটি সন্দেহজনক যদি এটি একটি EOA মালিকের কাছ থেকে আসে যা লেনদেনের `from` নয়
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

আমরা শুধু স্ট্রিং সমতার জন্য পরীক্ষা করতে পারি না কারণ ঠিকানাগুলি হেক্সাডেসিমেল, তাই সেগুলিতে অক্ষর থাকে। কখনও কখনও, উদাহরণস্বরূপ `txn.from`-এ, সেই অক্ষরগুলি সবই ছোট হাতের। অন্যান্য ক্ষেত্রে, যেমন `ev.args._owner`, ঠিকানাটি [ত্রুটি শনাক্তকরণের জন্য মিশ্র-কেসে](https://eips.ethereum.org/EIPS/eip-55) থাকে।

কিন্তু যদি লেনদেনটি মালিকের কাছ থেকে না হয়, এবং সেই মালিক বাহ্যিকভাবে মালিকানাধীন হয়, তাহলে আমাদের কাছে একটি সন্দেহজনক লেনদেন রয়েছে।

```typescript
// এটিও সন্দেহজনক যদি লেনদেনের গন্তব্যটি আমরা তদন্ত করছি এমন ERC-20 চুক্তি না হয়
//
if (txn.to.toLowerCase() != testedAddress) return ev
```

একইভাবে, যদি লেনদেনের `to` ঠিকানা, প্রথম কল করা চুক্তিটি, তদন্তাধীন ERC-20 চুক্তি না হয় তবে এটি সন্দেহজনক।

```typescript
    // যদি সন্দেহ করার কোনো কারণ না থাকে, তাহলে null রিটার্ন করুন।
    return null
}
```

যদি কোনো শর্তই সত্য না হয়, তাহলে `Approval` ইভেন্টটি সন্দেহজনক নয়।

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[একটি `async` ফাংশন](https://www.w3schools.com/js/js_async.asp) একটি `Promise` অবজেক্ট রিটার্ন করে। সাধারণ সিনট্যাক্স, `await x()` দিয়ে, আমরা প্রসেসিং চালিয়ে যাওয়ার আগে সেই `Promise`-এর পূরণ হওয়ার জন্য অপেক্ষা করি। এটি প্রোগ্রাম করা এবং অনুসরণ করা সহজ, তবে এটি অদক্ষও। যখন আমরা একটি নির্দিষ্ট ইভেন্টের জন্য `Promise`-এর পূরণ হওয়ার জন্য অপেক্ষা করছি, আমরা ইতিমধ্যেই পরবর্তী ইভেন্টে কাজ শুরু করতে পারি।

এখানে আমরা `Promise` অবজেক্টের একটি অ্যারে তৈরি করতে [`map`](https://www.w3schools.com/jsref/jsref_map.asp) ব্যবহার করি। তারপর আমরা সেই সমস্ত প্রতিশ্রুতির সমাধান হওয়ার জন্য অপেক্ষা করতে [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) ব্যবহার করি। তারপর আমরা সেই ফলাফলগুলিকে [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) করে অ-সন্দেহজনক ইভেন্টগুলি সরিয়ে দিই।

### সন্দেহজনক `Transfer` ইভেন্ট {#suspicious-transfer-events}

স্ক্যাম টোকেন শনাক্ত করার আরেকটি সম্ভাব্য উপায় হল তাদের কোনো সন্দেহজনক স্থানান্তর আছে কিনা তা দেখা। উদাহরণস্বরূপ, যে অ্যাকাউন্টগুলিতে এত টোকেন নেই সেখান থেকে স্থানান্তর। আপনি [এই পরীক্ষাটি কীভাবে বাস্তবায়ন করবেন তা দেখতে পারেন](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), কিন্তু `wARB`-এর এই সমস্যা নেই।

## উপসংহার {#conclusion}

ERC-20 স্ক্যামের স্বয়ংক্রিয় সনাক্তকরণ [ফলস নেগেটিভ](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error) সমস্যায় ভোগে, কারণ একটি স্ক্যাম একটি সম্পূর্ণ স্বাভাবিক ERC-20 টোকেন চুক্তি ব্যবহার করতে পারে যা কেবল কোনো বাস্তব কিছু উপস্থাপন করে না। সুতরাং আপনার সর্বদা _একটি বিশ্বস্ত উৎস থেকে টোকেন ঠিকানা পাওয়ার_ চেষ্টা করা উচিত।

স্বয়ংক্রিয় সনাক্তকরণ কিছু ক্ষেত্রে সাহায্য করতে পারে, যেমন DeFi অংশগুলিতে, যেখানে অনেক টোকেন রয়েছে এবং সেগুলি স্বয়ংক্রিয়ভাবে পরিচালনা করা প্রয়োজন। কিন্তু বরাবরের মতোই [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), আপনার নিজের গবেষণা করুন, এবং আপনার ব্যবহারকারীদেরও একই কাজ করতে উৎসাহিত করুন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।
