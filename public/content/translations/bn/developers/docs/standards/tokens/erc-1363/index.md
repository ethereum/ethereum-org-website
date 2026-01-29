---
title: ERC-1363 প্রদেয় টোকেন স্ট্যান্ডার্ড
description: ERC-1363 হল ERC-20 টোকেনগুলির জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক লেনদেনের মধ্যে ট্রান্সফারের পরে প্রাপক কন্ট্র্যাক্টে বা অনুমোদনের পরে স্পেন্ডার কন্ট্র্যাক্টে কাস্টম লজিক এক্সিকিউট করা সমর্থন করে।
lang: bn
---

## ভূমিকা {#introduction}

### ERC-1363 কি? {#what-is-erc1363}

ERC-1363 হল ERC-20 টোকেনগুলির জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক লেনদেনের মধ্যে ট্রান্সফারের পরে প্রাপক কন্ট্র্যাক্টে বা অনুমোদনের পরে স্পেন্ডার কন্ট্র্যাক্টে কাস্টম লজিক এক্সিকিউট করা সমর্থন করে।

### ERC-20 থেকে পার্থক্য {#erc20-differences}

`transfer`, `transferFrom` এবং `approve`-এর মতো স্ট্যান্ডার্ড ERC-20 অপারেশনগুলি একটি পৃথক লেনদেন ছাড়া প্রাপক বা স্পেন্ডার কন্ট্র্যাক্টে কোড এক্সিকিউশনের অনুমতি দেয় না।
এটি UI ডেভেলপমেন্টে জটিলতা নিয়ে আসে এবং গ্রহণে ঘর্ষণ সৃষ্টি করে কারণ ব্যবহারকারীদের প্রথম লেনদেনটি এক্সিকিউট হওয়ার জন্য অপেক্ষা করতে হয় এবং তারপর দ্বিতীয়টি জমা দিতে হয়।
তাদেরকে দুবার GAS প্রদান করতে হয়।

ERC-1363 ফাঞ্জিবল টোকেনকে আরও সহজে কাজ সম্পাদন করতে এবং কোনো অফ-চেইন লিসেনার ব্যবহার না করেই কাজ করতে সক্ষম করে তোলে।
এটি একটি একক লেনদেনে, একটি ট্রান্সফার বা অনুমোদনের পরে, একটি রিসিভার বা স্পেন্ডার কন্ট্র্যাক্টে একটি কলব্যাক করার অনুমতি দেয়।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা আপনাকে প্রথমে নিম্নলিখিত বিষয়গুলি সম্পর্কে পড়ার পরামর্শ দিই:

- [টোকেন স্ট্যান্ডার্ড](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## বডি {#body}

ERC-1363 `transfer`, `transferFrom` বা `approve`-এর পরে স্মার্ট কন্ট্র্যাক্টের সাথে ইন্টারঅ্যাক্ট করার জন্য ERC-20 টোকেনগুলির জন্য একটি স্ট্যান্ডার্ড API চালু করে।

এই স্ট্যান্ডার্ডটি টোকেন ট্রান্সফার করার জন্য প্রাথমিক কার্যকারিতা প্রদান করে, পাশাপাশি টোকেনগুলিকে অনুমোদিত হতে দেয় যাতে সেগুলি অন্য একটি অন-চেইন থার্ড পার্টি দ্বারা ব্যয় করা যায়, এবং তারপর রিসিভার বা স্পেন্ডার কন্ট্র্যাক্টে একটি কলব্যাক করে।

স্মার্ট কন্ট্র্যাক্টের অনেক প্রস্তাবিত ব্যবহার রয়েছে যা ERC-20 কলব্যাক গ্রহণ করতে পারে।

উদাহরণস্বরূপ:

- **ক্রাউডসেল**: পাঠানো টোকেনগুলি তাৎক্ষণিক পুরস্কার বরাদ্দকে ট্রিগার করে।
- **পরিষেবা**: পেমেন্ট এক ধাপে পরিষেবা অ্যাক্সেস সক্রিয় করে।
- **চালান**: টোকেনগুলি স্বয়ংক্রিয়ভাবে চালান নিষ্পত্তি করে।
- **সাবস্ক্রিপশন**: বার্ষিক হার অনুমোদন করা প্রথম মাসের পেমেন্টের মধ্যে সাবস্ক্রিপশন সক্রিয় করে।

এই কারণগুলির জন্য এটিকে মূলত **"প্রদেয় টোকেন"** নামকরণ করা হয়েছিল।

কলব্যাক আচরণটি এর উপযোগিতাকে আরও প্রসারিত করে, যার ফলে নিম্নলিখিতগুলির মতো নির্বিঘ্ন ইন্টারঅ্যাকশন সক্ষম হয়:

- **স্টেকিং**: ট্রান্সফার করা টোকেন একটি স্টেকিং কন্ট্র্যাক্টে স্বয়ংক্রিয় লকিং ট্রিগার করে।
- **ভোটিং**: প্রাপ্ত টোকেনগুলি একটি গভর্নেন্স সিস্টেমে ভোট রেজিস্টার করে।
- **সোয়াপিং**: টোকেন অনুমোদনগুলি এক ধাপে সোয়াপ লজিক সক্রিয় করে।

ERC-1363 টোকেনগুলি সেই সমস্ত ক্ষেত্রে নির্দিষ্ট ইউটিলিটির জন্য ব্যবহার করা যেতে পারে যেখানে একটি ট্রান্সফার বা অনুমোদন প্রাপ্তির পরে একটি কলব্যাক এক্সিকিউট করার প্রয়োজন হয়।
ERC-1363 প্রাপকের টোকেন পরিচালনা করার ক্ষমতা যাচাই করে স্মার্ট কন্ট্র্যাক্টে টোকেন হারানো বা টোকেন লক হওয়া এড়াতেও উপযোগী।

অন্যান্য ERC-20 এক্সটেনশন প্রস্তাবগুলির থেকে ভিন্ন, ERC-1363 ERC-20 `transfer` এবং `transferFrom` মেথডগুলিকে ওভাররাইড করে না এবং ERC-20 এর সাথে ব্যাকওয়ার্ড কম্প্যাটিবিলিটি বজায় রেখে ইমপ্লিমেন্ট করার জন্য ইন্টারফেস আইডিগুলিকে সংজ্ঞায়িত করে।

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) থেকে:

### মেথড {#methods}

ERC-1363 স্ট্যান্ডার্ড ইমপ্লিমেন্ট করা স্মার্ট কন্ট্র্যাক্টগুলিকে `ERC1363` ইন্টারফেসের সমস্ত ফাংশন, পাশাপাশি `ERC20` এবং `ERC165` ইন্টারফেসগুলিও **অবশ্যই** ইমপ্লিমেন্ট করতে হবে।

```solidity
pragma solidity ^0.8.0;

/**
 * @শিরোনাম ERC1363
 * @dev ERC-20 টোকেনের জন্য একটি এক্সটেনশন ইন্টারফেস যা একটি একক লেনদেনে `transfer` বা `transferFrom` এর পরে একটি প্রাপক কন্ট্র্যাক্টে কোড এক্সিকিউট করা, অথবা `approve` এর পরে একটি স্পেন্ডার কন্ট্র্যাক্টে কোড এক্সিকিউট করা সমর্থন করে।
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * দ্রষ্টব্য: এই ইন্টারফেসের জন্য ERC-165 শনাক্তকারী হল 0xb0202a11।
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev কলারের অ্যাকাউন্ট থেকে `to`-তে একটি `value` পরিমাণ টোকেন সরিয়ে নিয়ে যায় এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @প্যারাম to যে ঠিকানায় টোকেনগুলি ট্রান্সফার করা হচ্ছে।
   * @প্যারাম value যে পরিমাণ টোকেন ট্রান্সফার করা হবে।
   * @রিটার্ন একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে, যদি না কোনো থ্রো হয়।
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev কলারের অ্যাকাউন্ট থেকে `to`-তে একটি `value` পরিমাণ টোকেন সরিয়ে নিয়ে যায় এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @প্যারাম to যে ঠিকানায় টোকেনগুলি ট্রান্সফার করা হচ্ছে।
   * @প্যারাম value যে পরিমাণ টোকেন ট্রান্সফার করা হবে।
   * @প্যারাম data কোনো নির্দিষ্ট বিন্যাস ছাড়াই অতিরিক্ত ডেটা, যা `to`-তে কলে পাঠানো হয়।
   * @রিটার্ন একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে, যদি না কোনো থ্রো হয়।
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev অ্যালাউন্স মেকানিজম ব্যবহার করে `from` থেকে `to`-তে একটি `value` পরিমাণ টোকেন সরিয়ে নিয়ে যায় এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @প্যারাম from যে ঠিকানা থেকে টোকেন পাঠাতে হবে।
   * @প্যারাম to যে ঠিকানায় টোকেনগুলি ট্রান্সফার করা হচ্ছে।
   * @প্যারাম value যে পরিমাণ টোকেন ট্রান্সফার করা হবে।
   * @রিটার্ন একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে, যদি না কোনো থ্রো হয়।
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev অ্যালাউন্স মেকানিজম ব্যবহার করে `from` থেকে `to`-তে একটি `value` পরিমাণ টোকেন সরিয়ে নিয়ে যায় এবং তারপর `to`-তে `ERC1363Receiver::onTransferReceived` কল করে।
   * @প্যারাম from যে ঠিকানা থেকে টোকেন পাঠাতে হবে।
   * @প্যারাম to যে ঠিকানায় টোকেনগুলি ট্রান্সফার করা হচ্ছে।
   * @প্যারাম value যে পরিমাণ টোকেন ট্রান্সফার করা হবে।
   * @প্যারাম data কোনো নির্দিষ্ট বিন্যাস ছাড়াই অতিরিক্ত ডেটা, যা `to`-তে কলে পাঠানো হয়।
   * @রিটার্ন একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে, যদি না কোনো থ্রো হয়।
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev কলারের টোকেনের উপর `spender`-এর অ্যালাউন্স হিসাবে একটি `value` পরিমাণ টোকেন সেট করে এবং তারপর `spender`-এর উপর `ERC1363Spender::onApprovalReceived` কল করে।
   * @প্যারাম spender যে ঠিকানা তহবিল ব্যয় করবে।
   * @প্যারাম value যে পরিমাণ টোকেন ব্যয় করা হবে।
   * @রিটার্ন একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে, যদি না কোনো থ্রো হয়।
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev কলারের টোকেনের উপর `spender`-এর অ্যালাউন্স হিসাবে একটি `value` পরিমাণ টোকেন সেট করে এবং তারপর `spender`-এর উপর `ERC1363Spender::onApprovalReceived` কল করে।
   * @প্যারাম spender যে ঠিকানা তহবিল ব্যয় করবে।
   * @প্যারাম value যে পরিমাণ টোকেন ব্যয় করা হবে।
   * @প্যারাম data কোনো নির্দিষ্ট বিন্যাস ছাড়াই অতিরিক্ত ডেটা, যা `spender`-এর কাছে কলে পাঠানো হয়।
   * @রিটার্ন একটি বুলিয়ান মান যা নির্দেশ করে যে অপারেশনটি সফল হয়েছে, যদি না কোনো থ্রো হয়।
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

যে স্মার্ট কন্ট্র্যাক্ট `transferAndCall` বা `transferFromAndCall` এর মাধ্যমে ERC-1363 টোকেন গ্রহণ করতে চায়, তাকে **অবশ্যই** `ERC1363Receiver` ইন্টারফেসটি ইমপ্লিমেন্ট করতে হবে:

```solidity
/**
 * @শিরোনাম ERC1363Receiver
 * @dev ERC-1363 টোকেন কন্ট্র্যাক্ট থেকে `transferAndCall` বা `transferFromAndCall` সমর্থন করতে চায় এমন যেকোনো কন্ট্র্যাক্টের জন্য ইন্টারফেস।
 */
interface ERC1363Receiver {
  /**
   * @dev যখনই `operator` দ্বারা `from` থেকে `ERC1363::transferAndCall` বা `ERC1363::transferFromAndCall` এর মাধ্যমে এই কন্ট্র্যাক্টে ERC-1363 টোকেনগুলি ট্রান্সফার করা হয়, তখন এই ফাংশনটি কল করা হয়।
   *
   * দ্রষ্টব্য: ট্রান্সফার গ্রহণ করতে, এটিকে অবশ্যই
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (অর্থাৎ 0x88a7ca5c, বা এর নিজস্ব ফাংশন সিলেক্টর) রিটার্ন করতে হবে।
   *
   * @প্যারাম operator যে ঠিকানাটি `transferAndCall` বা `transferFromAndCall` ফাংশন কল করেছে।
   * @প্যারাম from যে ঠিকানা থেকে টোকেন ট্রান্সফার করা হয়েছে।
   * @প্যারাম value ট্রান্সফার করা টোকেনের পরিমাণ।
   * @প্যারাম data কোনো নির্দিষ্ট বিন্যাস ছাড়াই অতিরিক্ত ডেটা।
   * @রিটার্ন `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` যদি ট্রান্সফার অনুমোদিত হয়, যদি না থ্রোয়িং হয়।
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

যে স্মার্ট কন্ট্র্যাক্ট `approveAndCall` এর মাধ্যমে ERC-1363 টোকেন গ্রহণ করতে চায়, তাকে **অবশ্যই** `ERC1363Spender` ইন্টারফেসটি ইমপ্লিমেন্ট করতে হবে:

```solidity
/**
 * @শিরোনাম ERC1363Spender
 * @dev ERC-1363 টোকেন কন্ট্র্যাক্ট থেকে `approveAndCall` সমর্থন করতে চায় এমন যেকোনো কন্ট্র্যাক্টের জন্য ইন্টারফেস।
 */
interface ERC1363Spender {
  /**
   * @dev যখনই কোনো ERC-1363 টোকেনের `owner` এই কন্ট্র্যাক্টকে `ERC1363::approveAndCall` এর মাধ্যমে তাদের টোকেন ব্যয় করার জন্য অনুমোদন দেয়, তখন এই ফাংশনটি কল করা হয়।
   *
   * দ্রষ্টব্য: অনুমোদন গ্রহণ করতে, এটিকে অবশ্যই
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (অর্থাৎ 0x7b04a2d0, বা এর নিজস্ব ফাংশন সিলেক্টর) রিটার্ন করতে হবে।
   *
   * @প্যারাম owner যে ঠিকানাটি `approveAndCall` ফাংশন কল করেছে এবং পূর্বে টোকেনের মালিক ছিল।
   * @প্যারাম value যে পরিমাণ টোকেন ব্যয় করা হবে।
   * @প্যারাম data কোনো নির্দিষ্ট বিন্যাস ছাড়াই অতিরিক্ত ডেটা।
   * @রিটার্ন `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` যদি অনুমোদন অনুমোদিত হয়, যদি না থ্রোয়িং হয়।
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## আরও পড়ুন {#further-reading}

- [ERC-1363: প্রদেয় টোকেন স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub রেপো](https://github.com/vittominacori/erc1363-payable-token)
