---
title: "ERC-1363 পেয়েবল টোকেন স্ট্যান্ডার্ড"
description: "ERC-1363 হলো ERC-20 টোকেনগুলোর জন্য একটি এক্সটেনশন ইন্টারফেস যা ট্রান্সফারের পরে প্রাপক কন্ট্রাক্টে বা অনুমোদনের পরে স্পেন্ডার কন্ট্রাক্টে কাস্টম লজিক এক্সিকিউট করতে সহায়তা করে, এবং এই সবকিছু একটিমাত্র লেনদেনের মধ্যেই সম্পন্ন হয়।"
lang: bn
---

## ভূমিকা {#introduction}

### ERC-1363 কী? {#what-is-erc1363}

ERC-1363 হলো ERC-20 টোকেনগুলোর জন্য একটি এক্সটেনশন ইন্টারফেস যা ট্রান্সফারের পরে প্রাপক কন্ট্রাক্টে বা অনুমোদনের পরে স্পেন্ডার কন্ট্রাক্টে কাস্টম লজিক এক্সিকিউট করতে সহায়তা করে, এবং এই সবকিছু একটিমাত্র লেনদেনের মধ্যেই সম্পন্ন হয়।

### ERC-20 থেকে পার্থক্য {#erc20-differences}

স্ট্যান্ডার্ড ERC-20 অপারেশন যেমন `transfer`, `transferFrom` এবং `approve`, আলাদা কোনো লেনদেন ছাড়া প্রাপক বা স্পেন্ডার কন্ট্রাক্টে কোড এক্সিকিউট করার অনুমতি দেয় না।
এটি ইউজার ইন্টারফেস (UI) ডেভেলপমেন্টে জটিলতা তৈরি করে এবং গ্রহণের ক্ষেত্রে বাধা সৃষ্টি করে কারণ ব্যবহারকারীদের প্রথম লেনদেনটি এক্সিকিউট হওয়া পর্যন্ত অপেক্ষা করতে হয় এবং তারপর দ্বিতীয়টি সাবমিট করতে হয়।
তাদেরকে দুইবার গ্যাস (GAS) ফি-ও দিতে হয়।

ERC-1363 ফাঞ্জিবল টোকেনগুলোকে আরও সহজে কাজ করতে এবং কোনো অফচেইন লিসেনার ব্যবহার ছাড়াই কাজ করতে সক্ষম করে তোলে।
এটি একটি ট্রান্সফার বা অনুমোদনের পরে, একটিমাত্র লেনদেনের মাধ্যমে রিসিভার বা স্পেন্ডার কন্ট্রাক্টে কলব্যাক করার অনুমতি দেয়।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা সুপারিশ করছি যে আপনি প্রথমে এগুলো সম্পর্কে পড়ুন:

- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## মূল অংশ {#body}

ERC-1363, ERC-20 টোকেনগুলোর জন্য একটি স্ট্যান্ডার্ড API নিয়ে এসেছে যাতে `transfer`, `transferFrom` বা `approve` এর পরে স্মার্ট কন্ট্রাক্টগুলোর সাথে ইন্টারঅ্যাক্ট করা যায়।

এই স্ট্যান্ডার্ডটি টোকেন ট্রান্সফার করার প্রাথমিক কার্যকারিতা প্রদান করে, পাশাপাশি টোকেনগুলোকে অনুমোদন করার অনুমতি দেয় যাতে সেগুলো অন্য কোনো অনচেইন থার্ড পার্টি দ্বারা খরচ করা যায় এবং তারপর রিসিভার বা স্পেন্ডার কন্ট্রাক্টে কলব্যাক করা যায়।

স্মার্ট কন্ট্রাক্টগুলোর অনেক প্রস্তাবিত ব্যবহার রয়েছে যা ERC-20 কলব্যাক গ্রহণ করতে পারে।

উদাহরণস্বরূপ:

- **ক্রাউডসেল**: পাঠানো টোকেনগুলো তাৎক্ষণিক রিওয়ার্ড বরাদ্দের ট্রিগার করে।
- **পরিষেবা**: পেমেন্ট এক ধাপেই পরিষেবা অ্যাক্সেস সক্রিয় করে।
- **ইনভয়েস**: টোকেনগুলো স্বয়ংক্রিয়ভাবে ইনভয়েস নিষ্পত্তি করে।
- **সাবস্ক্রিপশন**: বার্ষিক রেট অনুমোদন করলে প্রথম মাসের পেমেন্টের মধ্যেই সাবস্ক্রিপশন সক্রিয় হয়ে যায়।

এসব কারণে এর মূল নাম দেওয়া হয়েছিল **"পেয়েবল টোকেন"**।

কলব্যাক আচরণ এর উপযোগিতাকে আরও প্রসারিত করে, যা নিচের মতো নিরবচ্ছিন্ন ইন্টারঅ্যাকশনগুলোকে সক্ষম করে:

- **স্টেকিং**: ট্রান্সফার করা টোকেনগুলো একটি স্টেকিং কন্ট্রাক্টে স্বয়ংক্রিয় লকিং ট্রিগার করে।
- **ভোটিং**: প্রাপ্ত টোকেনগুলো একটি গভর্নেন্স সিস্টেমে ভোট নিবন্ধন করে।
- **সোয়াপিং**: টোকেন অনুমোদন এক ধাপেই সোয়াপ লজিক সক্রিয় করে।

ERC-1363 টোকেনগুলো এমন সব ক্ষেত্রে নির্দিষ্ট উপযোগিতার জন্য ব্যবহার করা যেতে পারে যেখানে ট্রান্সফার বা অনুমোদন পাওয়ার পরে একটি কলব্যাক এক্সিকিউট করা প্রয়োজন।
প্রাপকের টোকেন পরিচালনা করার ক্ষমতা যাচাই করার মাধ্যমে স্মার্ট কন্ট্রাক্টগুলোতে টোকেন হারানো বা টোকেন লক হওয়া এড়াতেও ERC-1363 কার্যকর।

অন্যান্য ERC-20 এক্সটেনশন প্রস্তাবগুলোর বিপরীতে, ERC-1363, ERC-20 এর `transfer` এবং `transferFrom` মেথডগুলোকে ওভাররাইড করে না এবং ERC-20 এর সাথে ব্যাকওয়ার্ড সামঞ্জস্য বজায় রেখে ইমপ্লিমেন্ট করার জন্য ইন্টারফেস আইডিগুলো সংজ্ঞায়িত করে।

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) থেকে:

### মেথডগুলো {#methods}

ERC-1363 স্ট্যান্ডার্ড ইমপ্লিমেন্ট করা স্মার্ট কন্ট্রাক্টগুলোকে **অবশ্যই** `ERC1363` ইন্টারফেসের সমস্ত ফাংশন, সেইসাথে `ERC20` এবং `ERC165` ইন্টারফেসগুলো ইমপ্লিমেন্ট করতে হবে।

```solidity
pragma solidity ^0.8.0;

/* *
 * @title ERC1363
 * @dev ERC-20 টোকেনগুলির জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক লেনদেনে `transfer` বা `transferFrom`-এর পরে একটি প্রাপক চুক্তিতে কোড কার্যকর করা, বা `approve`-এর পরে একটি স্পেন্ডার চুক্তিতে কোড কার্যকর করা সমর্থন করে। */
interface ERC1363 is ERC20, ERC165 {
  /* * NOTE: এই ইন্টারফেসের জন্য ERC-165 আইডেন্টিফায়ার হল 0xb0202a11।
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)')) */

  /* *
   * @dev কলারের অ্যাকাউন্ট থেকে `to`-তে `value` পরিমাণ টোকেন স্থানান্তর করে
   * এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param to যে ঠিকানায় টোকেন স্থানান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন স্থানান্তর করা হবে।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো করা হয়। */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /* *
   * @dev কলারের অ্যাকাউন্ট থেকে `to`-তে `value` পরিমাণ টোকেন স্থানান্তর করে
   * এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param to যে ঠিকানায় টোকেন স্থানান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন স্থানান্তর করা হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা, যা `to`-তে কলে পাঠানো হয়।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো করা হয়। */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev অ্যালাউন্স মেকানিজম ব্যবহার করে `from` থেকে `to`-তে `value` পরিমাণ টোকেন স্থানান্তর করে
   * এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param from যে ঠিকানা থেকে টোকেন পাঠানো হবে।
   * @param to যে ঠিকানায় টোকেন স্থানান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন স্থানান্তর করা হবে।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো করা হয়। */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /* *
   * @dev অ্যালাউন্স মেকানিজম ব্যবহার করে `from` থেকে `to`-তে `value` পরিমাণ টোকেন স্থানান্তর করে
   * এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param from যে ঠিকানা থেকে টোকেন পাঠানো হবে।
   * @param to যে ঠিকানায় টোকেন স্থানান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন স্থানান্তর করা হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা, যা `to`-তে কলে পাঠানো হয়।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো করা হয়। */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /* *
   * @dev কলারের টোকেনগুলির উপর `spender`-এর অ্যালাউন্স হিসাবে `value` পরিমাণ টোকেন সেট করে
   * এবং তারপর `spender`-এ `ERC1363Spender::onApprovalReceived` কল করে।
   * @param spender যে ঠিকানাটি ফান্ড খরচ করবে।
   * @param value যে পরিমাণ টোকেন খরচ করা হবে।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো করা হয়। */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /* *
   * @dev কলারের টোকেনগুলির উপর `spender`-এর অ্যালাউন্স হিসাবে `value` পরিমাণ টোকেন সেট করে
   * এবং তারপর `spender`-এ `ERC1363Spender::onApprovalReceived` কল করে।
   * @param spender যে ঠিকানাটি ফান্ড খরচ করবে।
   * @param value যে পরিমাণ টোকেন খরচ করা হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা, যা `spender`-এ কলে পাঠানো হয়।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো করা হয়। */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

যে স্মার্ট কন্ট্রাক্ট `transferAndCall` বা `transferFromAndCall` এর মাধ্যমে ERC-1363 টোকেন গ্রহণ করতে চায়, তাকে **অবশ্যই** `ERC1363Receiver` ইন্টারফেস ইমপ্লিমেন্ট করতে হবে:

```solidity
/* *
 * @title ERC1363Receiver
 * @dev যেকোনো চুক্তির জন্য ইন্টারফেস যা ERC-1363 টোকেন চুক্তিগুলি থেকে `transferAndCall` বা `transferFromAndCall` সমর্থন করতে চায়। */
interface ERC1363Receiver {
  /* *
   * @dev যখনই ERC-1363 টোকেনগুলি `from` থেকে `operator` দ্বারা `ERC1363::transferAndCall` বা `ERC1363::transferFromAndCall`-এর মাধ্যমে এই চুক্তিতে স্থানান্তরিত হয়, তখন এই ফাংশনটি কল করা হয়।
   *
   * NOTE: স্থানান্তর গ্রহণ করতে, এটিকে অবশ্যই
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (অর্থাৎ 0x88a7ca5c, বা এর নিজস্ব ফাংশন সিলেক্টর) রিটার্ন করতে হবে।
   *
   * @param operator যে ঠিকানাটি `transferAndCall` বা `transferFromAndCall` ফাংশন কল করেছে।
   * @param from যে ঠিকানা থেকে টোকেন স্থানান্তরিত হয়।
   * @param value স্থানান্তরিত টোকেনের পরিমাণ।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা।
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` যদি স্থানান্তর অনুমোদিত হয় যদি না থ্রো করা হয়। */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

যে স্মার্ট কন্ট্রাক্ট `approveAndCall` এর মাধ্যমে ERC-1363 টোকেন গ্রহণ করতে চায়, তাকে **অবশ্যই** `ERC1363Spender` ইন্টারফেস ইমপ্লিমেন্ট করতে হবে:

```solidity
/* *
 * @title ERC1363Spender
 * @dev যেকোনো চুক্তির জন্য ইন্টারফেস যা ERC-1363 টোকেন চুক্তিগুলি থেকে `approveAndCall` সমর্থন করতে চায়। */
interface ERC1363Spender {
  /* *
   * @dev যখনই একজন ERC-1363 টোকেন `owner` তাদের টোকেন খরচ করার জন্য `ERC1363::approveAndCall`-এর মাধ্যমে এই চুক্তিটি অনুমোদন করে, তখন এই ফাংশনটি কল করা হয়।
   *
   * NOTE: অনুমোদন গ্রহণ করতে, এটিকে অবশ্যই
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (অর্থাৎ 0x7b04a2d0, বা এর নিজস্ব ফাংশন সিলেক্টর) রিটার্ন করতে হবে।
   *
   * @param owner যে ঠিকানাটি `approveAndCall` ফাংশন কল করেছে এবং পূর্বে টোকেনগুলির মালিক ছিল।
   * @param value যে পরিমাণ টোকেন খরচ করা হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা।
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` যদি অনুমোদন অনুমোদিত হয় যদি না থ্রো করা হয়। */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## আরও পড়ুন {#further-reading}

- [ERC-1363: পেয়েবল টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: গিটহাব রিপো](https://github.com/vittominacori/erc1363-payable-token)