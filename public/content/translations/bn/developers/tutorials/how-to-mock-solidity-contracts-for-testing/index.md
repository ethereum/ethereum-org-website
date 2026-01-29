---
title: পরীক্ষার জন্য সলিডিটি স্মার্ট কন্ট্র্যাক্টগুলিকে কীভাবে মক করা যায়
description: পরীক্ষার সময় আপনার কন্ট্র্যাক্টগুলো নিয়ে কেন মজা করা উচিত
author: Markus Waas
lang: bn
tags: [ "সলিডিটি", "স্মার্ট কন্ট্র্যাক্ট", "পরীক্ষা", "মকিং" ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[মক অবজেক্ট](https://wikipedia.org/wiki/Mock_object) অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিং-এর একটি সাধারণ ডিজাইন প্যাটার্ন। পুরাতন ফরাসি শব্দ 'mocquer' থেকে এসেছে যার অর্থ 'মজা করা', এটি 'বাস্তব কিছু অনুকরণ করা'-তে বিকশিত হয়েছে যা আমরা আসলে প্রোগ্রামিংয়ে করে থাকি। অনুগ্রহ করে শুধুমাত্র আপনার স্মার্ট কন্ট্র্যাক্টগুলো নিয়ে মজা করুন যদি আপনি চান, কিন্তু যখনই পারেন সেগুলোকে মক করুন। এটি আপনার জীবনকে সহজ করে তোলে।

## মকস দিয়ে কন্ট্র্যাক্টের ইউনিট-টেস্টিং {#unit-testing-contracts-with-mocks}

একটি কন্ট্র্যাক্ট মক করার অর্থ হল সেই কন্ট্র্যাক্টের একটি দ্বিতীয় সংস্করণ তৈরি করা যা মূলটির মতোই আচরণ করে, কিন্তু এমনভাবে যা ডেভেলপার দ্বারা সহজেই নিয়ন্ত্রণ করা যায়। আপনি প্রায়শই জটিল কন্ট্র্যাক্টের সম্মুখীন হন যেখানে আপনি কেবল [কন্ট্র্যাক্টের ছোট অংশ ইউনিট-টেস্ট](/developers/docs/smart-contracts/testing/) করতে চান। সমস্যা হল, যদি এই ছোট অংশটি পরীক্ষা করার জন্য একটি খুব নির্দিষ্ট কন্ট্র্যাক্ট স্টেটের প্রয়োজন হয় যেখানে পৌঁছানো কঠিন?

আপনি প্রতিবার জটিল টেস্ট সেটআপ লজিক লিখতে পারেন যা কন্ট্র্যাক্টটিকে প্রয়োজনীয় স্টেটে নিয়ে আসে অথবা আপনি একটি মক লিখুন। ইনহেরিটেন্সের মাধ্যমে একটি কন্ট্র্যাক্ট মক করা সহজ। কেবলমাত্র একটি দ্বিতীয় মক কন্ট্র্যাক্ট তৈরি করুন যা মূলটি থেকে ইনহেরিট করে। এখন আপনি আপনার মকের ফাংশনগুলি ওভাররাইড করতে পারেন। আসুন একটি উদাহরণ দিয়ে এটি দেখি।

## উদাহরণ: প্রাইভেট ERC20 {#example-private-erc20}

আমরা একটি উদাহরণ ERC-20 কন্ট্র্যাক্ট ব্যবহার করি যার একটি প্রাথমিক প্রাইভেট সময় রয়েছে। মালিক ব্যক্তিগত ব্যবহারকারীদের পরিচালনা করতে পারেন এবং শুধুমাত্র তাদেরকেই শুরুতে টোকেন গ্রহণ করার অনুমতি দেওয়া হবে। একটি নির্দিষ্ট সময় অতিবাহিত হয়ে গেলে, প্রত্যেককে টোকেন ব্যবহার করার অনুমতি দেওয়া হবে। আপনি যদি কৌতূহলী হন, আমরা নতুন OpenZeppelin contracts v3 থেকে [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) হুক ব্যবহার করছি।

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: অবৈধ প্রাপক");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

এবং এখন আসুন এটি মক করি।

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

আপনি নিম্নলিখিত ত্রুটি বার্তাগুলির মধ্যে একটি পাবেন:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

যেহেতু আমরা নতুন 0.6 সলিডিটি সংস্করণ ব্যবহার করছি, তাই যে ফাংশনগুলি ওভাররাইড করা যেতে পারে তার জন্য আমাদের `virtual` কীওয়ার্ড এবং ওভাররাইডিং ফাংশনের জন্য override যোগ করতে হবে। সুতরাং আসুন আমরা উভয় `isPublic` ফাংশনে সেগুলি যোগ করি।

এখন আপনার ইউনিট টেস্টে, আপনি পরিবর্তে `PrivateERC20Mock` ব্যবহার করতে পারেন। আপনি যখন প্রাইভেট ব্যবহারের সময় আচরণ পরীক্ষা করতে চান, তখন `setIsPublic(false)` ব্যবহার করুন এবং একইভাবে পাবলিক ব্যবহারের সময় পরীক্ষা করার জন্য `setIsPublic(true)` ব্যবহার করুন। অবশ্যই আমাদের উদাহরণে, আমরা সময় অনুযায়ী পরিবর্তন করার জন্য [টাইম হেল্পার](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) ব্যবহার করতে পারতাম। কিন্তু মকিং-এর ধারণা এখন স্পষ্ট হওয়া উচিত এবং আপনি এমন পরিস্থিতি কল্পনা করতে পারেন যেখানে সময় এগিয়ে দেওয়াটা এত সহজ নয়।

## অনেক কন্ট্র্যাক্ট মক করা {#mocking-many-contracts}

প্রতিটি মকের জন্য যদি আপনাকে আরেকটি কন্ট্র্যাক্ট তৈরি করতে হয় তবে এটি অগোছালো হয়ে যেতে পারে। যদি এটি আপনাকে বিরক্ত করে, আপনি [MockContract](https://github.com/gnosis/mock-contract) লাইব্রেরিটি দেখতে পারেন। এটি আপনাকে তৎক্ষণাৎ কন্ট্র্যাক্টগুলির আচরণ ওভাররাইড এবং পরিবর্তন করতে দেয়। তবে, এটি কেবল অন্য একটি কন্ট্র্যাক্টে কল মক করার জন্য কাজ করে, তাই এটি আমাদের উদাহরণের জন্য কাজ করবে না।

## মকিং আরও শক্তিশালী হতে পারে {#mocking-can-be-even-more-powerful}

মকিংয়ের ক্ষমতা এখানেই শেষ নয়।

- ফাংশন যোগ করা: কেবল একটি নির্দিষ্ট ফাংশন ওভাররাইড করাই কার্যকর নয়, অতিরিক্ত ফাংশন যোগ করাও কার্যকর। টোকেনের জন্য একটি ভাল উদাহরণ হল একটি অতিরিক্ত `mint` ফাংশন থাকা যা যেকোনো ব্যবহারকারীকে বিনামূল্যে নতুন টোকেন পেতে দেয়।
- টেস্টনেটে ব্যবহার: যখন আপনি আপনার ডিএ্যাপ-এর সাথে টেস্টনেটে আপনার কন্ট্র্যাক্টগুলি স্থাপন এবং পরীক্ষা করেন, তখন একটি মকড সংস্করণ ব্যবহার করার কথা বিবেচনা করুন। ফাংশন ওভাররাইড করা এড়িয়ে চলুন যদি না আপনার সত্যিই প্রয়োজন হয়। আপনি সর্বোপরি আসল লজিক পরীক্ষা করতে চান। কিন্তু উদাহরণস্বরূপ একটি রিসেট ফাংশন যোগ করা কার্যকর হতে পারে যা কেবল কন্ট্র্যাক্টের স্টেটকে শুরুতে রিসেট করে, কোনো নতুন স্থাপনার প্রয়োজন নেই। স্পষ্টতই আপনি এটি একটি মেইননেট কন্ট্র্যাক্টে রাখতে চাইবেন না।
