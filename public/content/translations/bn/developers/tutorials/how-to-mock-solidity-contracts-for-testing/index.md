---
title: "টেস্টিংয়ের জন্য সলিডিটি স্মার্ট কন্ট্রাক্ট কীভাবে মক করবেন"
description: "টেস্টিংয়ের সময় কেন আপনার কন্ট্রাক্টগুলো নিয়ে মজা করা উচিত"
author: "মার্কাস ওয়াস"
lang: bn
tags:
  - solidity
  - স্মার্ট কন্ট্রাক্ট
  - টেস্টিং
  - মকিং
skill: intermediate
breadcrumb: "মকিং কন্ট্রাক্ট"
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

অবজেক্ট-ওরিয়েন্টেড প্রোগ্রামিংয়ে [মক অবজেক্ট](https://wikipedia.org/wiki/Mock_object) (Mock objects) একটি সাধারণ ডিজাইন প্যাটার্ন। প্রাচীন ফরাসি শব্দ 'mocquer' থেকে আসা এই শব্দের অর্থ 'মজা করা', যা পরবর্তীতে 'বাস্তব কিছুর অনুকরণ করা'-তে রূপান্তরিত হয়েছে এবং প্রোগ্রামিংয়ে আমরা মূলত এটাই করে থাকি। আপনি চাইলে আপনার স্মার্ট কন্ট্রাক্ট নিয়ে মজা করতে পারেন, তবে যখনই সম্ভব সেগুলোকে মক করুন। এটি আপনার কাজকে আরও সহজ করে তুলবে।

## মক ব্যবহার করে কন্ট্রাক্টের ইউনিট-টেস্টিং {#unit-testing-contracts-with-mocks}

একটি কন্ট্রাক্ট মক করার অর্থ হলো মূলত সেই কন্ট্রাক্টের একটি দ্বিতীয় সংস্করণ তৈরি করা, যা আসলটির মতোই আচরণ করে, তবে এমনভাবে যাতে ডেভেলপার সহজেই তা নিয়ন্ত্রণ করতে পারেন। অনেক সময় আপনাকে এমন জটিল কন্ট্রাক্ট নিয়ে কাজ করতে হতে পারে, যেখানে আপনি কেবল [কন্ট্রাক্টের ছোট ছোট অংশের ইউনিট-টেস্ট](/developers/docs/smart-contracts/testing/) করতে চান। সমস্যা হলো, এই ছোট অংশটি টেস্ট করার জন্য যদি এমন একটি নির্দিষ্ট কন্ট্রাক্ট স্টেট প্রয়োজন হয়, যা অর্জন করা বেশ কঠিন, তখন কী করবেন?

আপনি চাইলে প্রতিবার জটিল টেস্ট সেটআপ লজিক লিখতে পারেন, যা কন্ট্রাক্টটিকে প্রয়োজনীয় স্টেটে নিয়ে আসবে, অথবা আপনি একটি মক লিখতে পারেন। ইনহেরিটেন্স (inheritance) ব্যবহার করে একটি কন্ট্রাক্ট মক করা খুবই সহজ। শুধু একটি দ্বিতীয় মক কন্ট্রাক্ট তৈরি করুন যা আসল কন্ট্রাক্ট থেকে ইনহেরিট করে। এখন আপনি আপনার মকে ফাংশনগুলো ওভাররাইড করতে পারবেন। চলুন একটি উদাহরণের মাধ্যমে বিষয়টি দেখি।

## উদাহরণ: প্রাইভেট ERC20 {#example-private-erc20}

আমরা একটি উদাহরণস্বরূপ ERC-20 কন্ট্রাক্ট ব্যবহার করছি, যার একটি প্রাথমিক প্রাইভেট সময় রয়েছে। মালিক প্রাইভেট ব্যবহারকারীদের পরিচালনা করতে পারবেন এবং শুরুতে কেবল তারাই টোকেন গ্রহণ করার অনুমতি পাবেন। একটি নির্দিষ্ট সময় পার হওয়ার পর, সবাই টোকেনগুলো ব্যবহার করার অনুমতি পাবে। যদি আপনার কৌতূহল থাকে, তবে জানিয়ে রাখি, আমরা নতুন OpenZeppelin কন্ট্রাক্ট v3 থেকে [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) হুক ব্যবহার করছি।

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

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

আর এখন চলুন এটিকে মক করি।

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

আপনি নিচের যেকোনো একটি এরর মেসেজ পাবেন:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

যেহেতু আমরা নতুন 0.6 Solidity সংস্করণ ব্যবহার করছি, তাই যে ফাংশনগুলো ওভাররাইড করা যায় সেগুলোর জন্য আমাদের `virtual` কিওয়ার্ড যোগ করতে হবে এবং ওভাররাইডিং ফাংশনের জন্য `override` যোগ করতে হবে। তাই চলুন উভয় `isPublic` ফাংশনে এগুলো যোগ করি।

এখন আপনার ইউনিট টেস্টগুলোতে, আপনি এর পরিবর্তে `PrivateERC20Mock` ব্যবহার করতে পারেন। যখন আপনি প্রাইভেট ব্যবহারের সময়ের আচরণ টেস্ট করতে চাইবেন, তখন `setIsPublic(false)` ব্যবহার করুন এবং একইভাবে পাবলিক ব্যবহারের সময় টেস্ট করার জন্য `setIsPublic(true)` ব্যবহার করুন। অবশ্যই আমাদের উদাহরণে, আমরা সময় পরিবর্তন করার জন্য [টাইম হেল্পার](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) ব্যবহার করতে পারতাম। তবে মকিংয়ের ধারণাটি এখন পরিষ্কার হওয়া উচিত এবং আপনি এমন পরিস্থিতি কল্পনা করতে পারেন যেখানে কেবল সময় এগিয়ে নেওয়া এতটা সহজ নয়।

## অনেকগুলো কন্ট্রাক্ট মক করা {#mocking-many-contracts}

প্রতিটি মকের জন্য যদি আপনাকে আলাদা কন্ট্রাক্ট তৈরি করতে হয়, তবে এটি বেশ ঝামেলার হতে পারে। যদি এটি আপনার জন্য বিরক্তিকর হয়, তবে আপনি [MockContract](https://github.com/gnosis/mock-contract) লাইব্রেরিটি দেখতে পারেন। এটি আপনাকে তাৎক্ষণিকভাবে কন্ট্রাক্টের আচরণ ওভাররাইড এবং পরিবর্তন করার সুবিধা দেয়। তবে, এটি কেবল অন্য কন্ট্রাক্টে কল মক করার জন্য কাজ করে, তাই এটি আমাদের উদাহরণের জন্য কাজ করবে না।

## মকিং আরও বেশি শক্তিশালী হতে পারে {#mocking-can-be-even-more-powerful}

মকিংয়ের ক্ষমতা এখানেই শেষ নয়।

- ফাংশন যোগ করা: কেবল একটি নির্দিষ্ট ফাংশন ওভাররাইড করাই উপকারী নয়, বরং অতিরিক্ত ফাংশন যোগ করাও বেশ কাজের। টোকেনের জন্য একটি ভালো উদাহরণ হলো একটি অতিরিক্ত `mint` ফাংশন রাখা, যাতে যেকোনো ব্যবহারকারী বিনামূল্যে নতুন টোকেন পেতে পারে।
- টেস্টনেটে ব্যবহার: যখন আপনি আপনার ডিএ্যাপ-এর সাথে টেস্টনেট-এ আপনার কন্ট্রাক্টগুলো ডিপ্লয় এবং টেস্ট করবেন, তখন একটি মক করা সংস্করণ ব্যবহার করার কথা বিবেচনা করুন। খুব বেশি প্রয়োজন না হলে ফাংশন ওভাররাইড করা এড়িয়ে চলুন। সর্বোপরি আপনি আসল লজিক টেস্ট করতে চান। তবে উদাহরণস্বরূপ একটি রিসেট ফাংশন যোগ করা উপকারী হতে পারে, যা কেবল কন্ট্রাক্ট স্টেট-কে শুরুতে রিসেট করে দেয়, কোনো নতুন ডিপ্লয়মেন্টের প্রয়োজন হয় না। স্পষ্টতই আপনি মেইননেট কন্ট্রাক্টে এমন কিছু রাখতে চাইবেন না।