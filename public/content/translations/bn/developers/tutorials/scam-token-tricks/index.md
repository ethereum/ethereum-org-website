---
title: "স্ক্যাম টোকেনগুলোর ব্যবহৃত কিছু কৌশল এবং কীভাবে সেগুলো শনাক্ত করা যায়"
description: "এই টিউটোরিয়ালে আমরা একটি স্ক্যাম টোকেন বিশ্লেষণ করে দেখব স্ক্যামাররা কী ধরনের কৌশল ব্যবহার করে, কীভাবে সেগুলো বাস্তবায়ন করে এবং কীভাবে আমরা সেগুলো শনাক্ত করতে পারি।"
author: "ওরি পোমেরান্টজ"
tags:
  - স্ক্যাম
  - Solidity
  - ERC-20
  - JavaScript
  - TypeScript
skill: intermediate
breadcrumb: "স্ক্যাম টোকেনের কৌশল"
published: 2023-09-15
lang: bn
---

এই টিউটোরিয়ালে আমরা [একটি স্ক্যাম টোকেন](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) বিশ্লেষণ করে দেখব স্ক্যামাররা কী ধরনের কৌশল ব্যবহার করে এবং কীভাবে সেগুলো বাস্তবায়ন করে। টিউটোরিয়ালটির শেষে আপনি ERC-20 টোকেন কন্ট্রাক্ট, সেগুলোর সক্ষমতা এবং কেন সন্দেহপ্রবণ হওয়া প্রয়োজন সে সম্পর্কে আরও বিশদ ধারণা পাবেন। এরপর আমরা সেই স্ক্যাম টোকেন থেকে নির্গত ইভেন্টগুলো দেখব এবং কীভাবে স্বয়ংক্রিয়ভাবে শনাক্ত করা যায় যে এটি বৈধ নয় তা জানব।

## স্ক্যাম টোকেন - এগুলো কী, মানুষ কেন এগুলো তৈরি করে এবং কীভাবে এগুলো এড়ানো যায় {#scam-tokens}

ইথেরিয়াম-এর অন্যতম সাধারণ ব্যবহার হলো কোনো গোষ্ঠীর জন্য একটি ট্রেডযোগ্য টোকেন তৈরি করা, যা এক অর্থে তাদের নিজস্ব মুদ্রা। তবে, যেখানেই বৈধ ব্যবহারের মাধ্যমে মূল্য তৈরি হয়, সেখানেই এমন অপরাধীরা থাকে যারা সেই মূল্য নিজেদের জন্য চুরি করার চেষ্টা করে।

ব্যবহারকারীর দৃষ্টিকোণ থেকে আপনি এই বিষয়ে আরও পড়তে পারেন [ethereum.org-এর অন্য কোথাও](/guides/how-to-id-scam-tokens/)। এই টিউটোরিয়ালটি একটি স্ক্যাম টোকেন বিশ্লেষণ করে কীভাবে এটি করা হয় এবং কীভাবে এটি শনাক্ত করা যায় তার ওপর আলোকপাত করে।

### আমি কীভাবে বুঝব যে wARB একটি স্ক্যাম? {#warb-scam}

আমরা যে টোকেনটি বিশ্লেষণ করছি তা হলো [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), যা বৈধ [ARB টোকেন](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)-এর সমতুল্য হওয়ার ভান করে।

কোনটি বৈধ টোকেন তা জানার সবচেয়ে সহজ উপায় হলো এর মূল সংস্থা, [আরবিট্রাম](https://arbitrum.foundation/)-এর দিকে নজর দেওয়া। বৈধ ঠিকানাগুলো [তাদের ডকুমেন্টেশনে](https://docs.arbitrum.foundation/deployment-addresses#token) উল্লেখ করা আছে।

### সোর্স কোড কেন উপলব্ধ? {#why-source}

সাধারণত আমরা আশা করি যারা অন্যদের স্ক্যাম করার চেষ্টা করে তারা গোপনীয়তা বজায় রাখবে, এবং সত্যিই অনেক স্ক্যাম টোকেনের কোড উপলব্ধ থাকে না (উদাহরণস্বরূপ, [এটি](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) এবং [এটি](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))।

তবে, বৈধ টোকেনগুলো সাধারণত তাদের সোর্স কোড প্রকাশ করে, তাই বৈধ দেখানোর জন্য স্ক্যাম টোকেনের লেখকরাও মাঝে মাঝে একই কাজ করে। [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) হলো এমন একটি টোকেন যার সোর্স কোড উপলব্ধ, যা এটিকে বোঝা সহজ করে তোলে।

যদিও কন্ট্রাক্ট ডিপ্লয়াররা সোর্স কোড প্রকাশ করবে কি না তা বেছে নিতে পারে, তবে তারা ভুল সোর্স কোড প্রকাশ করতে _পারে না_। ব্লক এক্সপ্লোরার স্বাধীনভাবে প্রদত্ত সোর্স কোড কম্পাইল করে, এবং যদি এটি হুবহু একই বাইটকোড না পায়, তবে এটি সেই সোর্স কোড প্রত্যাখ্যান করে। [আপনি Etherscan সাইটে এই সম্পর্কে আরও পড়তে পারেন](https://etherscan.io/verifyContract)।

## বৈধ ERC-20 টোকেনগুলোর সাথে তুলনা {#compare-legit-erc20}

আমরা এই টোকেনটিকে বৈধ ERC-20 টোকেনগুলোর সাথে তুলনা করতে যাচ্ছি। বৈধ ERC-20 টোকেনগুলো সাধারণত কীভাবে লেখা হয় সে সম্পর্কে আপনি যদি পরিচিত না হন, তবে [এই টিউটোরিয়ালটি দেখুন](/developers/tutorials/erc20-annotated-code/)।

### বিশেষ সুবিধাপ্রাপ্ত ঠিকানাগুলোর জন্য ধ্রুবক (Constants) {#constants-for-privileged-addresses}

কন্ট্রাক্টগুলোর মাঝে মাঝে বিশেষ সুবিধাপ্রাপ্ত ঠিকানা প্রয়োজন হয়। দীর্ঘমেয়াদী ব্যবহারের জন্য ডিজাইন করা কন্ট্রাক্টগুলো কিছু বিশেষ সুবিধাপ্রাপ্ত ঠিকানাকে সেই ঠিকানাগুলো পরিবর্তন করার অনুমতি দেয়, উদাহরণস্বরূপ একটি নতুন মাল্টিসিগ কন্ট্রাক্ট ব্যবহার সক্ষম করতে। এটি করার বেশ কয়েকটি উপায় রয়েছে।

[`HOP` টোকেন কন্ট্রাক্ট](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) প্যাটার্ন ব্যবহার করে। বিশেষ সুবিধাপ্রাপ্ত ঠিকানাটি স্টোরেজে `_owner` নামক একটি ফিল্ডে রাখা হয় (তৃতীয় ফাইলটি দেখুন, `Ownable.sol`)।

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` টোকেন কন্ট্রাক্ট](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)-এ সরাসরি কোনো বিশেষ সুবিধাপ্রাপ্ত ঠিকানা নেই। তবে, এর কোনো প্রয়োজনও নেই। এটি [ঠিকানা `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code)-এ একটি [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)-এর পেছনে থাকে। সেই কন্ট্রাক্টে একটি বিশেষ সুবিধাপ্রাপ্ত ঠিকানা রয়েছে (চতুর্থ ফাইলটি দেখুন, `ERC1967Upgrade.sol`) যা আপগ্রেডের জন্য ব্যবহার করা যেতে পারে।

```solidity
    /**
     * @dev EIP1967 অ্যাডমিন স্লটে একটি নতুন ঠিকানা সংরক্ষণ করে।
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

বিপরীতে, `wARB` কন্ট্রাক্টে একটি হার্ড কোডেড `contract_owner` রয়েছে।

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

[এই কন্ট্রাক্ট মালিক](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) এমন কোনো কন্ট্রাক্ট নয় যা বিভিন্ন সময়ে বিভিন্ন অ্যাকাউন্ট দ্বারা নিয়ন্ত্রিত হতে পারে, বরং এটি একটি [এক্সটার্নালি ওনড অ্যাকাউন্ট](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)। এর মানে হলো এটি সম্ভবত কোনো ব্যক্তির দ্বারা স্বল্পমেয়াদী ব্যবহারের জন্য ডিজাইন করা হয়েছে, এমন কোনো ERC-20 নিয়ন্ত্রণ করার দীর্ঘমেয়াদী সমাধান হিসেবে নয় যা মূল্যবান থাকবে।

এবং সত্যিই, আমরা যদি Etherscan-এ দেখি তবে দেখতে পাব যে স্ক্যামার এই কন্ট্রাক্টটি 19 মে, 2023 তারিখে মাত্র 12 ঘণ্টার জন্য ব্যবহার করেছিল ([প্রথম ট্রানজ্যাকশন](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) থেকে [শেষ ট্রানজ্যাকশন](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b))।

### ভুয়া `_transfer` ফাংশন {#the-fake-transfer-function}

প্রকৃত হস্তান্তরগুলো [একটি অভ্যন্তরীণ `_transfer` ফাংশন](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) ব্যবহার করে সম্পন্ন হওয়াটাই স্ট্যান্ডার্ড।

`wARB`-এ এই ফাংশনটি প্রায় বৈধ বলে মনে হয়:

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

সন্দেহজনক অংশটি হলো:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

যদি কন্ট্রাক্ট মালিক টোকেন পাঠায়, তবে `Transfer` ইভেন্ট কেন দেখায় যে সেগুলো `deployer` থেকে এসেছে?

তবে, আরও একটি গুরুত্বপূর্ণ বিষয় রয়েছে। এই `_transfer` ফাংশনটি কে কল করে? এটি বাইরে থেকে কল করা যায় না, এটি `internal` হিসেবে চিহ্নিত। এবং আমাদের কাছে থাকা কোডে `_transfer`-এর কোনো কল অন্তর্ভুক্ত নেই। স্পষ্টতই, এটি এখানে একটি ফাঁদ হিসেবে রয়েছে।

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

যখন আমরা টোকেন হস্তান্তর করার জন্য কল করা ফাংশনগুলো, `transfer` এবং `transferFrom` দেখি, তখন আমরা দেখতে পাই যে তারা সম্পূর্ণ ভিন্ন একটি ফাংশন, `_f_`-কে কল করে।

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

এই ফাংশনে দুটি সম্ভাব্য সতর্ক সংকেত (red flags) রয়েছে।

- [ফাংশন মডিফায়ার](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`-এর ব্যবহার। তবে, যখন আমরা সোর্স কোডটি দেখি তখন দেখতে পাই যে `_mod_` আসলে ক্ষতিকারক নয়।

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- একই সমস্যা যা আমরা `_transfer`-এ দেখেছি, তা হলো যখন `contract_owner` টোকেন পাঠায় তখন মনে হয় সেগুলো `deployer` থেকে এসেছে।

### ভুয়া ইভেন্ট ফাংশন `dropNewTokens` {#the-fake-events-function-dropnewtokens}

এখন আমরা এমন কিছুতে আসি যা দেখতে একটি আসল স্ক্যামের মতো। আমি পড়ার সুবিধার জন্য ফাংশনটি কিছুটা সম্পাদনা করেছি, তবে এটি কার্যকারিতার দিক থেকে সমতুল্য।

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

এই ফাংশনে `auth()` মডিফায়ার রয়েছে, যার মানে এটি শুধুমাত্র কন্ট্রাক্ট মালিক দ্বারা কল করা যেতে পারে।

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

এই বিধিনিষেধটি পুরোপুরি যৌক্তিক, কারণ আমরা চাইব না যে কোনো র্যান্ডম অ্যাকাউন্ট টোকেন বিতরণ করুক। তবে, ফাংশনের বাকি অংশটি সন্দেহজনক।

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

একটি পুল অ্যাকাউন্ট থেকে রিসিভারদের একটি অ্যারেতে পরিমাণের একটি অ্যারে হস্তান্তর করার ফাংশনটি পুরোপুরি যৌক্তিক। এমন অনেক ব্যবহার ক্ষেত্র রয়েছে যেখানে আপনি একটি একক উৎস থেকে একাধিক গন্তব্যে টোকেন বিতরণ করতে চাইবেন, যেমন পেরোল, এয়ারড্রপ ইত্যাদি। একাধিক ট্রানজ্যাকশন ইস্যু করার পরিবর্তে, বা এমনকি একই ট্রানজ্যাকশনের অংশ হিসেবে একটি ভিন্ন কন্ট্রাক্ট থেকে ERC-20-কে একাধিকবার কল করার পরিবর্তে একটি একক ট্রানজ্যাকশনে এটি করা (গ্যাসের দিক থেকে) সস্তা।

তবে, `dropNewTokens` তা করে না। এটি [`Transfer` ইভেন্ট](https://eips.ethereum.org/EIPS/eip-20#transfer-1) নির্গত করে, কিন্তু আসলে কোনো টোকেন হস্তান্তর করে না। অফচেইন অ্যাপ্লিকেশনগুলোকে এমন একটি হস্তান্তরের কথা বলে বিভ্রান্ত করার কোনো বৈধ কারণ নেই যা বাস্তবে ঘটেনি।

### পোড়ানোর (burning) `Approve` ফাংশন {#the-burning-approve-function}

ERC-20 কন্ট্রাক্টগুলোতে অ্যালাউন্স-এর জন্য [একটি `approve` ফাংশন](/developers/tutorials/erc20-annotated-code/#approve) থাকার কথা, এবং সত্যিই আমাদের স্ক্যাম টোকেনে এমন একটি ফাংশন রয়েছে, এবং এটি সঠিকও। তবে, যেহেতু Solidity C থেকে এসেছে তাই এটি কেস সেনসিটিভ (case significant)। "Approve" এবং "approve" হলো ভিন্ন স্ট্রিং।

এছাড়াও, এর কার্যকারিতা `approve`-এর সাথে সম্পর্কিত নয়।

```solidity
    function Approve(
        address[] memory holders)
```

এই ফাংশনটি টোকেন হোল্ডারদের ঠিকানাগুলোর একটি অ্যারে দিয়ে কল করা হয়।

```solidity
    public approver() {
```

`approver()` মডিফায়ার নিশ্চিত করে যে শুধুমাত্র `contract_owner`-কে এই ফাংশনটি কল করার অনুমতি দেওয়া হয়েছে (নিচে দেখুন)।

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

প্রতিটি হোল্ডার ঠিকানার জন্য ফাংশনটি হোল্ডারের সম্পূর্ণ ব্যালেন্স `0x00...01` ঠিকানায় সরিয়ে নেয়, যা কার্যকরভাবে এটিকে পুড়িয়ে ফেলে (স্ট্যান্ডার্ডের আসল `burn` মোট সরবরাহও পরিবর্তন করে এবং টোকেনগুলোকে `0x00...00`-এ হস্তান্তর করে)। এর মানে হলো `contract_owner` যেকোনো ব্যবহারকারীর সম্পদ সরিয়ে ফেলতে পারে। এটি এমন কোনো বৈশিষ্ট্য বলে মনে হয় না যা আপনি একটি গভর্নেন্স টোকেন-এ চাইবেন।

### কোডের মানের সমস্যা {#code-quality-issues}

কোডের মানের এই সমস্যাগুলো _প্রমাণ_ করে না যে এই কোডটি একটি স্ক্যাম, তবে এগুলো এটিকে সন্দেহজনক করে তোলে। আরবিট্রাম-এর মতো সুসংগঠিত কোম্পানিগুলো সাধারণত এত খারাপ কোড রিলিজ করে না।

#### `mount` ফাংশন {#the-mount-function}

যদিও এটি [স্ট্যান্ডার্ডে](https://eips.ethereum.org/EIPS/eip-20) নির্দিষ্ট করা নেই, তবে সাধারণভাবে বলতে গেলে যে ফাংশনটি নতুন টোকেন তৈরি করে তাকে [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn) বলা হয়।

আমরা যদি `wARB` কনস্ট্রাক্টর-এ দেখি, তবে দেখতে পাব যে কোনো কারণে মিন্ট ফাংশনটির নাম পরিবর্তন করে `mount` রাখা হয়েছে, এবং দক্ষতার জন্য সম্পূর্ণ পরিমাণের জন্য একবার কল করার পরিবর্তে প্রাথমিক সরবরাহের এক-পঞ্চমাংশ দিয়ে পাঁচবার কল করা হয়েছে।

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

`require`-এর দিকে তাকালে আমরা দেখতে পাই যে শুধুমাত্র কন্ট্রাক্ট মালিককে মিন্ট করার অনুমতি দেওয়া হয়েছে। এটি বৈধ। তবে এরর মেসেজটি হওয়া উচিত _only owner is allowed to mint_ বা এই জাতীয় কিছু। এর পরিবর্তে, এটি হলো অপ্রাসঙ্গিক _ERC20: mint to the zero address_। জিরো অ্যাড্রেস-এ মিন্টিং-এর জন্য সঠিক পরীক্ষা হলো `require(account != address(0), "<error message>")`, যা কন্ট্রাক্টটি কখনোই চেক করার প্রয়োজন মনে করে না।

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

মিন্টিং-এর সাথে সরাসরি সম্পর্কিত আরও দুটি সন্দেহজনক বিষয় রয়েছে:

- একটি `account` প্যারামিটার রয়েছে, যা সম্ভবত সেই অ্যাকাউন্ট হওয়া উচিত যা মিন্ট করা পরিমাণ গ্রহণ করবে। কিন্তু যে ব্যালেন্সটি বৃদ্ধি পায় তা আসলে `contract_owner`-এর।

- যদিও বৃদ্ধি পাওয়া ব্যালেন্সটি `contract_owner`-এর, নির্গত ইভেন্টটি `account`-এ একটি হস্তান্তর দেখায়।

### কেন `auth` এবং `approver` উভয়ই? কেন `mod` যা কিছুই করে না? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

এই কন্ট্রাক্টে তিনটি মডিফায়ার রয়েছে: `_mod_`, `auth`, এবং `approver`।

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` তিনটি প্যারামিটার নেয় এবং সেগুলো দিয়ে কিছুই করে না। এটি কেন রাখা হয়েছে?

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

`auth` এবং `approver` বেশি যৌক্তিক, কারণ তারা চেক করে যে কন্ট্রাক্টটি `contract_owner` দ্বারা কল করা হয়েছিল কি না। আমরা আশা করব যে কিছু বিশেষ সুবিধাপ্রাপ্ত কাজ, যেমন মিন্টিং, সেই অ্যাকাউন্টের মধ্যে সীমাবদ্ধ থাকবে। তবে, _হুবহু একই কাজ_ করে এমন দুটি আলাদা ফাংশন থাকার মানে কী?

## আমরা স্বয়ংক্রিয়ভাবে কী শনাক্ত করতে পারি? {#what-can-we-detect-automatically}

আমরা Etherscan-এর দিকে তাকিয়ে দেখতে পারি যে `wARB` একটি স্ক্যাম টোকেন। তবে, এটি একটি কেন্দ্রীভূত সমাধান। তাত্ত্বিকভাবে, Etherscan-কে ধ্বংস বা হ্যাক করা যেতে পারে। কোনো টোকেন বৈধ কি না তা স্বাধীনভাবে বের করতে পারাটা ভালো।

কিছু কৌশল রয়েছে যা ব্যবহার করে আমরা শনাক্ত করতে পারি যে একটি ERC-20 টোকেন সন্দেহজনক (হয় একটি স্ক্যাম বা খুব খারাপভাবে লেখা), তাদের নির্গত ইভেন্টগুলোর দিকে তাকিয়ে।

## সন্দেহজনক `Approval` ইভেন্ট {#suspicious-approval-events}

[`Approval` ইভেন্টগুলো](https://eips.ethereum.org/EIPS/eip-20#approval) শুধুমাত্র একটি সরাসরি অনুরোধের মাধ্যমেই ঘটা উচিত (এর বিপরীতে [`Transfer` ইভেন্টগুলো](https://eips.ethereum.org/EIPS/eip-20#transfer-1) একটি অ্যালাউন্স-এর ফলে ঘটতে পারে)। এই সমস্যাটির বিস্তারিত ব্যাখ্যা এবং কেন অনুরোধগুলো কোনো কন্ট্রাক্ট দ্বারা মধ্যস্থতা করার পরিবর্তে সরাসরি হওয়া প্রয়োজন তা জানতে [Solidity ডক্স দেখুন](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)।

এর মানে হলো `Approval` ইভেন্টগুলো যা একটি [এক্সটার্নালি ওনড অ্যাকাউন্ট](/developers/docs/accounts/#types-of-account) থেকে খরচ অনুমোদন করে, সেগুলো এমন ট্রানজ্যাকশন থেকে আসতে হবে যা সেই অ্যাকাউন্টে উৎপন্ন হয় এবং যার গন্তব্য হলো ERC-20 কন্ট্রাক্ট। একটি এক্সটার্নালি ওনড অ্যাকাউন্ট থেকে অন্য যেকোনো ধরনের অনুমোদন সন্দেহজনক।

এখানে [এমন একটি প্রোগ্রাম রয়েছে যা এই ধরনের ইভেন্ট শনাক্ত করে](https://github.com/qbzzt/20230915-scam-token-detection), যা [Viem](https://viem.sh/) এবং [TypeScript](https://www.typescriptlang.org/docs/) (টাইপ সেফটি সহ একটি JavaScript ভ্যারিয়েন্ট) ব্যবহার করে। এটি রান করতে:

1. `.env.example`-কে `.env`-এ কপি করুন।
2. একটি ইথেরিয়াম মেইননেট নোড-এর URL প্রদান করতে `.env` সম্পাদনা করুন।
3. প্রয়োজনীয় প্যাকেজগুলো ইনস্টল করতে `pnpm install` রান করুন।
4. সন্দেহজনক অনুমোদনগুলো খুঁজতে `pnpm susApproval` রান করুন।

এখানে লাইন বাই লাইন ব্যাখ্যা দেওয়া হলো:

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

`viem` থেকে টাইপ ডেফিনিশন, ফাংশন এবং চেইন ডেফিনিশন ইমপোর্ট করুন।

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

একটি Viem ক্লায়েন্ট তৈরি করুন। আমাদের শুধুমাত্র ব্লকচেইন থেকে পড়তে হবে, তাই এই ক্লায়েন্টের কোনো প্রাইভেট কী-এর প্রয়োজন নেই।

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

সন্দেহজনক ERC-20 কন্ট্রাক্টের ঠিকানা, এবং যে ব্লকগুলোর মধ্যে আমরা ইভেন্টগুলো খুঁজব। নোড প্রোভাইডাররা সাধারণত ইভেন্ট পড়ার আমাদের ক্ষমতা সীমিত করে কারণ ব্যান্ডউইথ ব্যয়বহুল হতে পারে। সৌভাগ্যবশত `wARB` আঠারো ঘণ্টার জন্য ব্যবহৃত হয়নি, তাই আমরা সমস্ত ইভেন্ট খুঁজতে পারি (মোট মাত্র 13টি ছিল)।

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

এটি হলো Viem-কে ইভেন্টের তথ্যের জন্য জিজ্ঞাসা করার উপায়। যখন আমরা এটিকে ফিল্ডের নামসহ সঠিক ইভেন্ট স্বাক্ষর প্রদান করি, তখন এটি আমাদের জন্য ইভেন্টটি পার্স করে।

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

আমাদের অ্যালগরিদম শুধুমাত্র এক্সটার্নালি ওনড অ্যাকাউন্টগুলোর জন্য প্রযোজ্য। যদি `client.getBytecode` দ্বারা কোনো বাইটকোড রিটার্ন করা হয় তবে এর মানে হলো এটি একটি কন্ট্রাক্ট এবং আমাদের এটি এড়িয়ে যাওয়া উচিত।

আপনি যদি আগে TypeScript ব্যবহার না করে থাকেন, তবে ফাংশন ডেফিনিশনটি কিছুটা অদ্ভুত লাগতে পারে। আমরা শুধু এটিকে বলি না যে প্রথম (এবং একমাত্র) প্যারামিটারটিকে `addr` বলা হয়, বরং এটিও বলি যে এটি `Address` টাইপের। একইভাবে, `: boolean` অংশটি TypeScript-কে বলে যে ফাংশনটির রিটার্ন ভ্যালু হলো একটি বুলিয়ান।

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

এই ফাংশনটি একটি ইভেন্ট থেকে ট্রানজ্যাকশন রসিদ পায়। ট্রানজ্যাকশনের গন্তব্য কী ছিল তা নিশ্চিত করতে আমাদের রসিদটি প্রয়োজন।

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

এটি সবচেয়ে গুরুত্বপূর্ণ ফাংশন, যা আসলে সিদ্ধান্ত নেয় যে কোনো ইভেন্ট সন্দেহজনক কি না। রিটার্ন টাইপ, `(Event | null)`, TypeScript-কে বলে যে এই ফাংশনটি একটি `Event` অথবা `null` রিটার্ন করতে পারে। ইভেন্টটি সন্দেহজনক না হলে আমরা `null` রিটার্ন করি।

```typescript
const owner = ev.args._owner
```

Viem-এর কাছে ফিল্ডের নামগুলো রয়েছে, তাই এটি আমাদের জন্য ইভেন্টটি পার্স করেছে। `_owner` হলো খরচ করা টোকেনগুলোর মালিক।

```typescript
// কন্ট্রাক্ট দ্বারা অনুমোদন সন্দেহজনক নয়
if (await isContract(owner)) return null
```

যদি মালিক একটি কন্ট্রাক্ট হয়, তবে ধরে নিন এই অনুমোদনটি সন্দেহজনক নয়। কোনো কন্ট্রাক্টের অনুমোদন সন্দেহজনক কি না তা পরীক্ষা করার জন্য আমাদের ট্রানজ্যাকশনের সম্পূর্ণ এক্সিকিউশন ট্রেস করতে হবে যাতে দেখা যায় এটি কখনো মালিক কন্ট্রাক্টে পৌঁছেছে কি না, এবং সেই কন্ট্রাক্টটি সরাসরি ERC-20 কন্ট্রাক্টকে কল করেছে কি না। এটি আমরা যতটা করতে চাই তার চেয়ে অনেক বেশি রিসোর্স ব্যয়বহুল।

```typescript
const txn = await getEventTxn(ev)
```

যদি অনুমোদনটি একটি এক্সটার্নালি ওনড অ্যাকাউন্ট থেকে আসে, তবে যে ট্রানজ্যাকশনের কারণে এটি ঘটেছে তা পান।

```typescript
// অনুমোদনটি সন্দেহজনক যদি এটি এমন একজন EOA মালিকের কাছ থেকে আসে যে ট্রানজ্যাকশনের `from` নয়
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

আমরা শুধু স্ট্রিংয়ের সমতা পরীক্ষা করতে পারি না কারণ ঠিকানাগুলো হেক্সাডেসিমেল, তাই সেগুলোতে অক্ষর থাকে। কখনো কখনো, উদাহরণস্বরূপ `txn.from`-এ, সেই অক্ষরগুলো সবই ছোট হাতের হয়। অন্যান্য ক্ষেত্রে, যেমন `ev.args._owner`-এ, ঠিকানাটি [ত্রুটি শনাক্তকরণের জন্য মিক্সড-কেস](https://eips.ethereum.org/EIPS/eip-55)-এ থাকে।

কিন্তু যদি ট্রানজ্যাকশনটি মালিকের কাছ থেকে না হয়, এবং সেই মালিক এক্সটার্নালি ওনড হয়, তবে আমাদের কাছে একটি সন্দেহজনক ট্রানজ্যাকশন রয়েছে।

```typescript
// এটিও সন্দেহজনক যদি ট্রানজ্যাকশনের গন্তব্য সেই ERC-20 কন্ট্রাক্ট না হয় যা আমরা
// তদন্ত করছি
if (txn.to.toLowerCase() != testedAddress) return ev
```

একইভাবে, যদি ট্রানজ্যাকশনের `to` ঠিকানা, অর্থাৎ প্রথম কল করা কন্ট্রাক্টটি, তদন্তাধীন ERC-20 কন্ট্রাক্ট না হয় তবে এটি সন্দেহজনক।

```typescript
    // যদি সন্দেহজনক হওয়ার কোনো কারণ না থাকে, তবে null রিটার্ন করুন।
    return null
}
```

যদি কোনো শর্তই সত্য না হয় তবে `Approval` ইভেন্টটি সন্দেহজনক নয়।

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[একটি `async` ফাংশন](https://www.w3schools.com/js/js_async.asp) একটি `Promise` অবজেক্ট রিটার্ন করে। সাধারণ সিনট্যাক্স, `await x()`-এর সাহায্যে, আমরা প্রসেসিং চালিয়ে যাওয়ার আগে সেই `Promise` পূরণ হওয়ার জন্য অপেক্ষা করি। এটি প্রোগ্রাম করা এবং অনুসরণ করা সহজ, তবে এটি অদক্ষও। যখন আমরা কোনো নির্দিষ্ট ইভেন্টের জন্য `Promise` পূরণ হওয়ার জন্য অপেক্ষা করছি, তখন আমরা ইতিমধ্যেই পরবর্তী ইভেন্টে কাজ শুরু করতে পারি।

এখানে আমরা `Promise` অবজেক্টের একটি অ্যারে তৈরি করতে [`map`](https://www.w3schools.com/jsref/jsref_map.asp) ব্যবহার করি। তারপর আমরা সেই সমস্ত প্রমিসগুলো সমাধান হওয়ার জন্য অপেক্ষা করতে [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) ব্যবহার করি। এরপর আমরা সন্দেহজনক নয় এমন ইভেন্টগুলো সরাতে সেই ফলাফলগুলোকে [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) করি।

### সন্দেহজনক `Transfer` ইভেন্ট {#suspicious-transfer-events}

স্ক্যাম টোকেন শনাক্ত করার আরেকটি সম্ভাব্য উপায় হলো তাদের কোনো সন্দেহজনক হস্তান্তর আছে কি না তা দেখা। উদাহরণস্বরূপ, এমন অ্যাকাউন্টগুলো থেকে হস্তান্তর যাদের কাছে ততগুলো টোকেন নেই। আপনি দেখতে পারেন [কীভাবে এই পরীক্ষাটি বাস্তবায়ন করতে হয়](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), তবে `wARB`-এ এই সমস্যাটি নেই।

## উপসংহার {#conclusion}

ERC-20 স্ক্যামগুলোর স্বয়ংক্রিয় শনাক্তকরণ [ফলস নেগেটিভ](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)-এর সমস্যায় ভোগে, কারণ একটি স্ক্যাম সম্পূর্ণ স্বাভাবিক ERC-20 টোকেন কন্ট্রাক্ট ব্যবহার করতে পারে যা আসলে বাস্তব কিছুর প্রতিনিধিত্ব করে না। তাই আপনার সর্বদা _একটি বিশ্বস্ত উৎস থেকে টোকেন ঠিকানা পাওয়ার_ চেষ্টা করা উচিত।

স্বয়ংক্রিয় শনাক্তকরণ কিছু ক্ষেত্রে সাহায্য করতে পারে, যেমন বিকেন্দ্রীভূত অর্থব্যবস্থা (DeFi) অংশগুলোতে, যেখানে অনেক টোকেন থাকে এবং সেগুলোকে স্বয়ংক্রিয়ভাবে পরিচালনা করতে হয়। তবে বরাবরের মতোই [ক্রেতা সাবধান (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp), নিজের গবেষণা নিজে করুন এবং আপনার ব্যবহারকারীদেরও তা করতে উৎসাহিত করুন।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।