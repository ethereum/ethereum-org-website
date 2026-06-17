---
title: ERC-1363 পেয়েবল টোকেন স্ট্যান্ডার্ড
description: ERC-1363 হলো ERC-20 টোকেনের জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক ট্রানজ্যাকশনের মধ্যে হস্তান্তরের পরে প্রাপক কন্ট্রাক্টে বা অনুমোদনের পরে স্পেন্ডার কন্ট্রাক্টে কাস্টম লজিক কার্যকর করতে সহায়তা করে।
lang: bn
---

## ভূমিকা {#introduction}

### ERC-1363 কী? {#what-is-erc1363}

ERC-1363 হলো ERC-20 টোকেনের জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক ট্রানজ্যাকশনের মধ্যে হস্তান্তরের পরে প্রাপক কন্ট্রাক্টে বা অনুমোদনের পরে স্পেন্ডার কন্ট্রাক্টে কাস্টম লজিক কার্যকর করতে সহায়তা করে।

### ERC-20 থেকে পার্থক্য {#erc20-differences}

স্ট্যান্ডার্ড ERC-20 অপারেশন যেমন `transfer`, `transferFrom` এবং `approve`, আলাদা ট্রানজ্যাকশন ছাড়া প্রাপক বা স্পেন্ডার কন্ট্রাক্টে কোড কার্যকর করার অনুমতি দেয় না।
এটি UI ডেভেলপমেন্টে জটিলতা এবং গ্রহণে বাধা সৃষ্টি করে কারণ ব্যবহারকারীদের প্রথম ট্রানজ্যাকশনটি কার্যকর হওয়ার জন্য অপেক্ষা করতে হয় এবং তারপর দ্বিতীয়টি জমা দিতে হয়।
তাদের দুবার গ্যাসও দিতে হয়।

ERC-1363 ফাঞ্জিবল টোকেনগুলোকে আরও সহজে কাজ করতে এবং কোনো অফচেইন লিসেনার ব্যবহার না করেই কাজ করতে সক্ষম করে তোলে।
এটি একটি একক ট্রানজ্যাকশনে হস্তান্তর বা অনুমোদনের পরে রিসিভার বা স্পেন্ডার কন্ট্রাক্টে একটি কলব্যাক করার অনুমতি দেয়।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা আপনাকে প্রথমে এই বিষয়গুলো পড়ার পরামর্শ দিচ্ছি:

- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## মূল অংশ {#body}

ERC-1363, `transfer`, `transferFrom` বা `approve` এর পরে স্মার্ট কন্ট্রাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য ERC-20 টোকেনের জন্য একটি স্ট্যান্ডার্ড API চালু করে।

এই স্ট্যান্ডার্ডটি টোকেন হস্তান্তর করার প্রাথমিক কার্যকারিতা প্রদান করে, পাশাপাশি টোকেনগুলোকে অনুমোদন করার অনুমতি দেয় যাতে সেগুলো অন্য কোনো অনচেইন থার্ড পার্টি দ্বারা ব্যয় করা যায় এবং তারপর রিসিভার বা স্পেন্ডার কন্ট্রাক্টে একটি কলব্যাক করা যায়।

স্মার্ট কন্ট্রাক্টের অনেক প্রস্তাবিত ব্যবহার রয়েছে যা ERC-1363 কলব্যাক গ্রহণ করতে পারে।

উদাহরণ হতে পারে:

- **ক্রাউড সেল**: পাঠানো টোকেনগুলো তাৎক্ষণিক পুরস্কার বরাদ্দ ট্রিগার করে।
- **পরিষেবা**: পেমেন্ট এক ধাপে পরিষেবা অ্যাক্সেস সক্রিয় করে।
- **ইনভয়েস**: টোকেনগুলো স্বয়ংক্রিয়ভাবে ইনভয়েস নিষ্পত্তি করে।
- **সাবস্ক্রিপশন**: বার্ষিক হার অনুমোদন করলে প্রথম মাসের পেমেন্টের মধ্যেই সাবস্ক্রিপশন সক্রিয় হয়।

এসব কারণে এর মূল নাম ছিল **"পেয়েবল টোকেন"**।

কলব্যাক আচরণ এর উপযোগিতাকে আরও প্রসারিত করে, যা নিচের মতো নিরবচ্ছিন্ন ইন্টারঅ্যাকশন সক্ষম করে:

- **স্টেকিং**: হস্তান্তরিত টোকেনগুলো একটি স্টেকিং কন্ট্রাক্টে স্বয়ংক্রিয় লকিং ট্রিগার করে।
- **ভোট**: প্রাপ্ত টোকেনগুলো একটি গভর্ন্যান্স সিস্টেমে ভোট নিবন্ধন করে।
- **সোয়াপ**: টোকেন অনুমোদন এক ধাপে সোয়াপ লজিক সক্রিয় করে।

ERC-1363 টোকেনগুলো এমন সব ক্ষেত্রে নির্দিষ্ট উপযোগিতার জন্য ব্যবহার করা যেতে পারে যেখানে হস্তান্তর বা অনুমোদন পাওয়ার পরে একটি কলব্যাক কার্যকর করা প্রয়োজন।
প্রাপকের টোকেন পরিচালনা করার ক্ষমতা যাচাই করে স্মার্ট কন্ট্রাক্টে টোকেন হারানো বা টোকেন লক হওয়া এড়াতেও ERC-1363 কার্যকর।

অন্যান্য ERC-20 এক্সটেনশন প্রস্তাবের বিপরীতে, ERC-1363, ERC-20 এর `transfer` এবং `transferFrom` মেথডগুলোকে ওভাররাইড করে না এবং ERC-20 এর সাথে ব্যাকওয়ার্ড সামঞ্জস্য বজায় রেখে বাস্তবায়ন করার জন্য ইন্টারফেস আইডিগুলো সংজ্ঞায়িত করে।

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) থেকে:

### মেথড {#methods}

ERC-1363 স্ট্যান্ডার্ড বাস্তবায়নকারী স্মার্ট কন্ট্রাক্টগুলোকে **অবশ্যই** `ERC1363` ইন্টারফেসের সমস্ত ফাংশন, সেইসাথে `ERC20` এবং `ERC165` ইন্টারফেসগুলো বাস্তবায়ন করতে হবে।

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 টোকেন এর জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক ট্রানজ্যাকশন এ `transfer` বা `transferFrom` এর পরে একটি প্রাপক কন্ট্রাক্ট এ, অথবা `approve` এর পরে একটি স্পেন্ডার কন্ট্রাক্ট এ কোড এক্সিকিউট করা সমর্থন করে।
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: এই ইন্টারফেসের জন্য ERC-165 আইডেন্টিফায়ার হলো 0xb0202a11।
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev কলারের অ্যাকাউন্ট থেকে `to` তে `value` পরিমাণ টোকেন সরায়
   * এবং তারপর `to` তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param to যে ঠিকানায় টোকেন হস্তান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন হস্তান্তর করতে হবে।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো (throw) করে।
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev কলারের অ্যাকাউন্ট থেকে `to` তে `value` পরিমাণ টোকেন সরায়
   * এবং তারপর `to` তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param to যে ঠিকানায় টোকেন হস্তান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন হস্তান্তর করতে হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা, যা `to` এর কলে পাঠানো হয়।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো (throw) করে।
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev অ্যালাউন্স মেকানিজম ব্যবহার করে `from` থেকে `to` তে `value` পরিমাণ টোকেন সরায়
   * এবং তারপর `to` তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param from যে ঠিকানা থেকে টোকেন পাঠাতে হবে।
   * @param to যে ঠিকানায় টোকেন হস্তান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন হস্তান্তর করতে হবে।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো (throw) করে।
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev অ্যালাউন্স মেকানিজম ব্যবহার করে `from` থেকে `to` তে `value` পরিমাণ টোকেন সরায়
   * এবং তারপর `to` তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @param from যে ঠিকানা থেকে টোকেন পাঠাতে হবে।
   * @param to যে ঠিকানায় টোকেন হস্তান্তর করা হচ্ছে।
   * @param value যে পরিমাণ টোকেন হস্তান্তর করতে হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা, যা `to` এর কলে পাঠানো হয়।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো (throw) করে।
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev কলারের টোকেনগুলোর ওপর `spender` এর অ্যালাউন্স হিসেবে `value` পরিমাণ টোকেন সেট করে
   * এবং তারপর `spender` এ `ERC1363Spender::onApprovalReceived` কল করে।
   * @param spender যে ঠিকানা ফান্ড খরচ করবে।
   * @param value যে পরিমাণ টোকেন খরচ করতে হবে।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো (throw) করে।
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev কলারের টোকেনগুলোর ওপর `spender` এর অ্যালাউন্স হিসেবে `value` পরিমাণ টোকেন সেট করে
   * এবং তারপর `spender` এ `ERC1363Spender::onApprovalReceived` কল করে।
   * @param spender যে ঠিকানা ফান্ড খরচ করবে।
   * @param value যে পরিমাণ টোকেন খরচ করতে হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা, যা `spender` এর কলে পাঠানো হয়।
   * @return একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে যদি না থ্রো (throw) করে।
   */
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

যে স্মার্ট কন্ট্রাক্ট `transferAndCall` বা `transferFromAndCall` এর মাধ্যমে ERC-1363 টোকেন গ্রহণ করতে চায় তাকে **অবশ্যই** `ERC1363Receiver` ইন্টারফেস বাস্তবায়ন করতে হবে:

```solidity
/**
 * @title ERC1363Receiver
 * @dev যেকোনো কন্ট্রাক্ট এর জন্য ইন্টারফেস যা ERC-1363 টোকেন কন্ট্রাক্ট থেকে `transferAndCall` বা `transferFromAndCall` সমর্থন করতে চায়।
 */
interface ERC1363Receiver {
  /**
   * @dev যখনই `operator` দ্বারা `from` থেকে `ERC1363::transferAndCall` বা `ERC1363::transferFromAndCall` এর মাধ্যমে এই কন্ট্রাক্ট এ ERC-1363 টোকেন হস্তান্তর করা হয়, তখন এই ফাংশনটি কল করা হয়।
   *
   * NOTE: হস্তান্তর গ্রহণ করতে, এটিকে অবশ্যই
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (অর্থাৎ 0x88a7ca5c, বা এর নিজস্ব ফাংশন সিলেক্টর) রিটার্ন করতে হবে।
   *
   * @param operator যে ঠিকানা `transferAndCall` বা `transferFromAndCall` ফাংশন কল করেছে।
   * @param from যে ঠিকানা থেকে টোকেন হস্তান্তর করা হয়েছে।
   * @param value হস্তান্তরিত টোকেন এর পরিমাণ।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা।
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` যদি হস্তান্তর অনুমোদিত হয় যদি না থ্রো (throw) করে।
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

যে স্মার্ট কন্ট্রাক্ট `approveAndCall` এর মাধ্যমে ERC-1363 টোকেন গ্রহণ করতে চায় তাকে **অবশ্যই** `ERC1363Spender` ইন্টারফেস বাস্তবায়ন করতে হবে:

```solidity
/**
 * @title ERC1363Spender
 * @dev যেকোনো কন্ট্রাক্ট এর জন্য ইন্টারফেস যা ERC-1363 টোকেন কন্ট্রাক্ট থেকে `approveAndCall` সমর্থন করতে চায়।
 */
interface ERC1363Spender {
  /**
   * @dev যখনই কোনো ERC-1363 টোকেন এর `owner` তাদের টোকেন খরচ করার জন্য `ERC1363::approveAndCall` এর মাধ্যমে এই কন্ট্রাক্ট কে অনুমোদন করে, তখন এই ফাংশনটি কল করা হয়।
   *
   * NOTE: অনুমোদন গ্রহণ করতে, এটিকে অবশ্যই
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (অর্থাৎ 0x7b04a2d0, বা এর নিজস্ব ফাংশন সিলেক্টর) রিটার্ন করতে হবে।
   *
   * @param owner যে ঠিকানা `approveAndCall` ফাংশন কল করেছে এবং পূর্বে টোকেনগুলোর মালিক ছিল।
   * @param value যে পরিমাণ টোকেন খরচ করতে হবে।
   * @param data কোনো নির্দিষ্ট বিন্যাস ছাড়া অতিরিক্ত ডেটা।
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` যদি অনুমোদন অনুমোদিত হয় যদি না থ্রো (throw) করে।
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## আরও পড়ুন {#further-reading}

- [ERC-1363: পেয়েবল টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub রিপো](https://github.com/vittominacori/erc1363-payable-token)