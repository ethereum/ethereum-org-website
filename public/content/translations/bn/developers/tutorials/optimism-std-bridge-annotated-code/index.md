---
title: "অপ্টিমিজম স্ট্যান্ডার্ড ব্রিজ কন্ট্রাক্ট ওয়াকথ্রু"
description: "অপ্টিমিজমের জন্য স্ট্যান্ডার্ড ব্রিজ কীভাবে কাজ করে? কেন এটি এভাবে কাজ করে?"
author: "ওরি পোমেরান্টজ"
tags: ["Solidity", "ব্রিজ", "লেয়ার ২"]
skill: intermediate
breadcrumb: "অপ্টিমিজম ব্রিজ"
published: 2022-03-30
lang: bn
---

[Optimism](https://www.optimism.io/) হলো একটি [অপ্টিমেস্টিক রোলআপ](/developers/docs/scaling/optimistic-rollups/)।
অপ্টিমেস্টিক রোলআপ ইথিরিয়াম মেইননেট (যা লেয়ার 1 বা L1 নামেও পরিচিত)-এর চেয়ে অনেক কম খরচে লেনদেন প্রসেস করতে পারে কারণ নেটওয়ার্ক-এর প্রতিটি নোড-এর পরিবর্তে শুধুমাত্র কয়েকটি নোড দ্বারা লেনদেন প্রসেস করা হয়।
একই সাথে, সমস্ত ডেটা L1-এ লেখা হয় যাতে মেইননেট-এর সমস্ত ইন্টিগ্রিটি এবং অ্যাভেইলেবিলিটি গ্যারান্টির সাথে সবকিছু প্রমাণ এবং পুনর্গঠন করা যায়।

Optimism (বা অন্য কোনো L2)-এ L1 অ্যাসেট ব্যবহার করতে, অ্যাসেটগুলোকে [ব্রিজ](/bridges/#prerequisites) করতে হবে।
এটি অর্জনের একটি উপায় হলো ব্যবহারকারীদের L1-এ অ্যাসেট (ETH এবং [ERC-20 টোকেন](/developers/docs/standards/tokens/erc-20/) সবচেয়ে সাধারণ) লক করা এবং L2-এ ব্যবহার করার জন্য সমতুল্য অ্যাসেট গ্রহণ করা।
শেষ পর্যন্ত, যার কাছেই এগুলো থাকুক না কেন, সে হয়তো এগুলোকে আবার L1-এ ব্রিজ করতে চাইতে পারে।
এটি করার সময়, অ্যাসেটগুলো L2-এ বার্ন করা হয় এবং তারপর L1-এ ব্যবহারকারীর কাছে ফেরত দেওয়া হয়।

এভাবেই [Optimism স্ট্যান্ডার্ড ব্রিজ](https://docs.optimism.io/app-developers/bridging/standard-bridge) কাজ করে।
এই আর্টিকেলে আমরা সেই ব্রিজের সোর্স কোড নিয়ে আলোচনা করব যাতে এটি কীভাবে কাজ করে তা দেখা যায় এবং ভালোভাবে লেখা Solidity কোডের উদাহরণ হিসেবে এটি অধ্যয়ন করা যায়।

## কন্ট্রোল ফ্লো {#control-flows}

ব্রিজের দুটি প্রধান ফ্লো রয়েছে:

- ডিপোজিট (L1 থেকে L2-তে)
- উত্তোলন (L2 থেকে L1-এ)

### ডিপোজিট ফ্লো {#deposit-flow}

#### লেয়ার 1 {#deposit-flow-layer-1}

1. যদি কোনো ERC-20 ডিপোজিট করা হয়, তবে ডিপোজিটর ব্রিজকে ডিপোজিট করা পরিমাণ খরচ করার অনুমতি দেয়
2. ডিপোজিটর L1 ব্রিজকে কল করে (`depositERC20`, `depositERC20To`, `depositETH`, বা `depositETHTo`)
3. L1 ব্রিজ ব্রিজ করা অ্যাসেটের দখল নেয়
   - ETH: কলের অংশ হিসেবে ডিপোজিটর দ্বারা অ্যাসেট ট্রান্সফার করা হয়
   - ERC-20: ডিপোজিটরের দেওয়া অনুমতি ব্যবহার করে ব্রিজ নিজেই অ্যাসেট ট্রান্সফার করে নেয়
4. L1 ব্রিজ ক্রস-ডোমেইন মেসেজ মেকানিজম ব্যবহার করে L2 ব্রিজে `finalizeDeposit` কল করে

#### লেয়ার 2 {#deposit-flow-layer-2}

5. L2 ব্রিজ যাচাই করে যে `finalizeDeposit`-এর কলটি বৈধ কি না:
   - ক্রস ডোমেইন মেসেজ কন্ট্রাক্ট থেকে এসেছে
   - মূলত L1-এর ব্রিজ থেকে এসেছে
6. L2 ব্রিজ চেক করে যে L2-তে ERC-20 টোকেন কন্ট্রাক্টটি সঠিক কি না:
   - L2 কন্ট্রাক্ট রিপোর্ট করে যে এর L1 কাউন্টারপার্টটি ঠিক সেই কন্ট্রাক্ট যেখান থেকে L1-এ টোকেনগুলো এসেছে
   - L2 কন্ট্রাক্ট রিপোর্ট করে যে এটি সঠিক ইন্টারফেস সাপোর্ট করে ([ERC-165 ব্যবহার করে](https://eips.ethereum.org/EIPS/eip-165))।
7. যদি L2 কন্ট্রাক্টটি সঠিক হয়, তবে সঠিক এডড্রেস-এ উপযুক্ত সংখ্যক টোকেন মিন্ট করতে এটিকে কল করুন। যদি না হয়, তবে ব্যবহারকারীকে L1-এ টোকেনগুলো ক্লেইম করার অনুমতি দিতে একটি উত্তোলন প্রক্রিয়া শুরু করুন।

### উত্তোলন ফ্লো {#withdrawal-flow}

#### লেয়ার 2 {#withdrawal-flow-layer-2}

1. উত্তোলনকারী L2 ব্রিজকে কল করে (`withdraw` বা `withdrawTo`)
2. L2 ব্রিজ `msg.sender`-এর অন্তর্গত উপযুক্ত সংখ্যক টোকেন বার্ন করে
3. L2 ব্রিজ ক্রস-ডোমেইন মেসেজ মেকানিজম ব্যবহার করে L1 ব্রিজে `finalizeETHWithdrawal` বা `finalizeERC20Withdrawal` কল করে

#### লেয়ার 1 {#withdrawal-flow-layer-1}

4. L1 ব্রিজ যাচাই করে যে `finalizeETHWithdrawal` বা `finalizeERC20Withdrawal`-এর কলটি বৈধ কি না:
   - ক্রস ডোমেইন মেসেজ মেকানিজম থেকে এসেছে
   - মূলত L2-এর ব্রিজ থেকে এসেছে
5. L1 ব্রিজ উপযুক্ত অ্যাসেট (ETH বা ERC-20) সঠিক এডড্রেস-এ ট্রান্সফার করে

## লেয়ার 1 কোড {#layer-1-code}

এটি সেই কোড যা L1, ইথিরিয়াম মেইননেট-এ রান করে।

### IL1ERC20Bridge {#IL1ERC20Bridge}

[এই ইন্টারফেসটি এখানে সংজ্ঞায়িত করা হয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1ERC20Bridge.sol)।
এতে ERC-20 টোকেন ব্রিজ করার জন্য প্রয়োজনীয় ফাংশন এবং সংজ্ঞা অন্তর্ভুক্ত রয়েছে।

```solidity
// SPDX-License-Identifier: MIT
```

[Optimism-এর বেশিরভাগ কোড MIT লাইসেন্সের অধীনে রিলিজ করা হয়েছে](https://help.optimism.io/hc/en-us/articles/4411908707995-What-software-license-does-Optimism-use-)।

```solidity
pragma solidity >0.5.0 <0.9.0;
```

লেখার সময় Solidity-এর সর্বশেষ ভার্সন হলো 0.8.12।
0.9.0 ভার্সন রিলিজ না হওয়া পর্যন্ত, আমরা জানি না এই কোডটি এর সাথে সামঞ্জস্যপূর্ণ হবে কি না।

```solidity
/* *
 * @title IL1ERC20Bridge */
interface IL1ERC20Bridge {
    /* *********
     * ইভেন্টস *
     ********* */

    event ERC20DepositInitiated(
```

Optimism ব্রিজের পরিভাষায় _ডিপোজিট_ মানে L1 থেকে L2-তে ট্রান্সফার, এবং _উত্তোলন_ মানে L2 থেকে L1-এ ট্রান্সফার।

```solidity
        address indexed _l1Token,
        address indexed _l2Token,
```

বেশিরভাগ ক্ষেত্রে L1-এ একটি ERC-20-এর এডড্রেস L2-তে সমতুল্য ERC-20-এর এডড্রেস-এর সমান হয় না।
[আপনি এখানে টোকেন এডড্রেস-এর তালিকা দেখতে পারেন](https://static.optimism.io/optimism.tokenlist.json)।
`chainId` 1 সহ এডড্রেসটি L1 (মেইননেট)-এ এবং `chainId` 10 সহ এডড্রেসটি L2 (Optimism)-তে রয়েছে।
অন্য দুটি `chainId` ভ্যালু হলো Kovan টেস্ট নেটওয়ার্ক (42) এবং Optimistic Kovan টেস্ট নেটওয়ার্ক (69)-এর জন্য।

```solidity
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

ট্রান্সফারে নোট যোগ করা সম্ভব, সেক্ষেত্রে সেগুলো ইভেন্টগুলোতে যোগ করা হয় যা তাদের রিপোর্ট করে।

```solidity
    event ERC20WithdrawalFinalized(
        address indexed _l1Token,
        address indexed _l2Token,
        address indexed _from,
        address _to,
        uint256 _amount,
        bytes _data
    );
```

একই ব্রিজ কন্ট্রাক্ট উভয় দিকে ট্রান্সফার পরিচালনা করে।
L1 ব্রিজের ক্ষেত্রে, এর মানে হলো ডিপোজিট শুরু করা এবং উত্তোলন চূড়ান্ত করা।

```solidity

    /* *******************
     * পাবলিক ফাংশনস *
     ******************* */

    /* *
     * @dev সংশ্লিষ্ট L2 ব্রিজ কন্ট্রাক্টের ঠিকানা পান।
     * @return সংশ্লিষ্ট L2 ব্রিজ কন্ট্রাক্টের ঠিকানা। */
    function l2TokenBridge() external returns (address);
```

এই ফাংশনটির আসলে প্রয়োজন নেই, কারণ L2-তে এটি একটি প্রি-ডিপ্লয়ড কন্ট্রাক্ট, তাই এটি সর্বদা `0x4200000000000000000000000000000000000010` এডড্রেস-এ থাকে।
এটি এখানে L2 ব্রিজের সাথে সামঞ্জস্যের জন্য রয়েছে, কারণ L1 ব্রিজের এডড্রেস জানা _সহজ_ নয়।

```solidity
    /* *
     * @dev L2-তে কলারের ব্যালেন্সে নির্দিষ্ট পরিমাণ ERC20 ডিপোজিট করুন।
     * @param _l1Token আমরা যে L1 ERC20 ডিপোজিট করছি তার ঠিকানা
     * @param _l2Token L1-এর সংশ্লিষ্ট L2 ERC20-এর ঠিকানা
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ
     * @param _l2Gas L2-তে ডিপোজিট সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র এক্সটার্নাল কন্ট্রাক্টগুলোর সুবিধার জন্য প্রদান করা হয়েছে। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না। */
    function depositERC20(
        address _l1Token,
        address _l2Token,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

`_l2Gas` প্যারামিটার হলো L2 গ্যাস-এর পরিমাণ যা লেনদেন খরচ করার অনুমতি পায়।
[একটি নির্দিষ্ট (উচ্চ) সীমা পর্যন্ত, এটি বিনামূল্যে](https://community.optimism.io/docs/developers/bridge/messaging/#for-l1-%E2%87%92-l2-transactions-2), তাই মিন্ট করার সময় ERC-20 কন্ট্রাক্ট যদি সত্যিই অদ্ভুত কিছু না করে, তবে এটি কোনো সমস্যা হওয়া উচিত নয়।
এই ফাংশনটি সাধারণ পরিস্থিতির যত্ন নেয়, যেখানে একজন ব্যবহারকারী একটি ভিন্ন ব্লকচেইন-এ একই এডড্রেস-এ অ্যাসেট ব্রিজ করে।

```solidity
    /* *
     * @dev L2-তে প্রাপকের ব্যালেন্সে নির্দিষ্ট পরিমাণ ERC20 ডিপোজিট করুন।
     * @param _l1Token আমরা যে L1 ERC20 ডিপোজিট করছি তার ঠিকানা
     * @param _l2Token L1-এর সংশ্লিষ্ট L2 ERC20-এর ঠিকানা
     * @param _to উত্তোলনের ক্রেডিট পাওয়ার জন্য L2 ঠিকানা।
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ।
     * @param _l2Gas L2-তে ডিপোজিট সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র এক্সটার্নাল কন্ট্রাক্টগুলোর সুবিধার জন্য প্রদান করা হয়েছে। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না। */
    function depositERC20To(
        address _l1Token,
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) external;
```

এই ফাংশনটি প্রায় `depositERC20`-এর মতোই, তবে এটি আপনাকে একটি ভিন্ন এডড্রেস-এ ERC-20 পাঠাতে দেয়।

```solidity
    /* ************************
     * ক্রস-চেইন ফাংশনস *
     ************************ */

    /* *
     * @dev L2 থেকে L1-এ উত্তোলন সম্পন্ন করুন এবং প্রাপকের L1 ERC20 টোকেন ব্যালেন্সে ফান্ড ক্রেডিট করুন।
     * L2 থেকে শুরু হওয়া উত্তোলন চূড়ান্ত না হলে এই কলটি ব্যর্থ হবে।
     *
     * @param _l1Token যে L1 টোকেনের জন্য finalizeWithdrawal করা হবে তার ঠিকানা।
     * @param _l2Token যে L2 টোকেন থেকে উত্তোলন শুরু হয়েছিল তার ঠিকানা।
     * @param _from ট্রান্সফার শুরু করা L2 ঠিকানা।
     * @param _to উত্তোলনের ক্রেডিট পাওয়ার জন্য L1 ঠিকানা।
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ।
     * @param _data L2-তে প্রেরকের দেওয়া ডেটা। এই ডেটা শুধুমাত্র এক্সটার্নাল কন্ট্রাক্টগুলোর সুবিধার জন্য প্রদান করা হয়েছে। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না। */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

Optimism-এ উত্তোলন (এবং L2 থেকে L1-এ অন্যান্য মেসেজ) একটি দুই ধাপের প্রক্রিয়া:

1. L2-তে একটি প্রারম্ভিক লেনদেন।
2. L1-এ একটি চূড়ান্ত বা ক্লেইমিং লেনদেন।
   এই লেনদেনটি L2 লেনদেন-এর জন্য [ফল্ট চ্যালেঞ্জ পিরিয়ড](https://community.optimism.io/docs/how-optimism-works/#fault-proofs) শেষ হওয়ার পরে ঘটতে হবে।

### IL1StandardBridge {#il1standardbridge}

[এই ইন্টারফেসটি এখানে সংজ্ঞায়িত করা হয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/IL1StandardBridge.sol)।
এই ফাইলে ETH-এর জন্য ইভেন্ট এবং ফাংশনের সংজ্ঞা রয়েছে।
এই সংজ্ঞাগুলো উপরে ERC-20-এর জন্য `IL1ERC20Bridge`-এ সংজ্ঞায়িত করা সংজ্ঞাগুলোর মতোই।

ব্রিজ ইন্টারফেসটি দুটি ফাইলের মধ্যে বিভক্ত কারণ কিছু ERC-20 টোকেনের কাস্টম প্রসেসিং প্রয়োজন এবং স্ট্যান্ডার্ড ব্রিজ দ্বারা পরিচালনা করা যায় না।
এভাবে কাস্টম ব্রিজ যা এই ধরনের টোকেন পরিচালনা করে তা `IL1ERC20Bridge` ইমপ্লিমেন্ট করতে পারে এবং ETH ব্রিজ করার প্রয়োজন হয় না।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

import "./IL1ERC20Bridge.sol";

/* *
 * @title IL1StandardBridge */
interface IL1StandardBridge is IL1ERC20Bridge {
    /* *********
     * ইভেন্টস *
     ********* */
    event ETHDepositInitiated(
        address indexed _from,
        address indexed _to,
        uint256 _amount,
        bytes _data
    );
```

এই ইভেন্টটি প্রায় ERC-20 ভার্সন (`ERC20DepositInitiated`)-এর মতোই, শুধুমাত্র L1 এবং L2 টোকেন এডড্রেস ছাড়া।
অন্যান্য ইভেন্ট এবং ফাংশনগুলোর ক্ষেত্রেও একই কথা প্রযোজ্য।

```solidity
    event ETHWithdrawalFinalized(
        .
        .
        .
    );

    /* *******************
     * পাবলিক ফাংশনস *
     ******************* */

    /* *
     * @dev L2-তে কলারের ব্যালেন্সে নির্দিষ্ট পরিমাণ ETH ডিপোজিট করুন।
            .
            .
            . */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable;

    /* *
     * @dev L2-তে প্রাপকের ব্যালেন্সে নির্দিষ্ট পরিমাণ ETH ডিপোজিট করুন।
            .
            .
            . */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable;

    /* ************************
     * ক্রস-চেইন ফাংশনস *
     ************************ */

    /* *
     * @dev L2 থেকে L1-এ উত্তোলন সম্পন্ন করুন এবং প্রাপকের L1 ETH টোকেন ব্যালেন্সে ফান্ড ক্রেডিট করুন। যেহেতু শুধুমাত্র xDomainMessenger এই ফাংশনটি কল করতে পারে, তাই উত্তোলন চূড়ান্ত হওয়ার আগে এটি কখনোই কল করা হবে না।
                .
                .
                . */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external;
}
```

### CrossDomainEnabled {#crossdomainenabled}

অন্য লেয়ার-এ মেসেজ পাঠানোর জন্য উভয় ব্রিজ ([L1](#the-l1-bridge-contract) এবং [L2](#the-l2-bridge-contract)) দ্বারা [এই কন্ট্রাক্টটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/CrossDomainEnabled.sol) ইনহেরিট করা হয়।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >0.5.0 <0.9.0;

/* ইন্টারফেস ইমপোর্টস */
import { ICrossDomainMessenger } from "./ICrossDomainMessenger.sol";
```

[এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/bridge/ICrossDomainMessenger.sol) কন্ট্রাক্টকে বলে যে কীভাবে ক্রস ডোমেইন মেসেঞ্জার ব্যবহার করে অন্য লেয়ার-এ মেসেজ পাঠাতে হয়।
এই ক্রস ডোমেইন মেসেঞ্জারটি সম্পূর্ণ অন্য একটি সিস্টেম, এবং এর নিজস্ব একটি আর্টিকেল প্রাপ্য, যা আমি ভবিষ্যতে লেখার আশা করি।

```solidity
/* *
 * @title CrossDomainEnabled
 * @dev ক্রস-ডোমেইন কমিউনিকেশন সম্পাদনকারী কন্ট্রাক্টগুলোর জন্য হেল্পার কন্ট্রাক্ট
 *
 * ব্যবহৃত কম্পাইলার: ইনহেরিটিং কন্ট্রাক্ট দ্বারা সংজ্ঞায়িত */
contract CrossDomainEnabled {
    /* ************
     * ভেরিয়েবলস *
     ************ */

    // অন্য ডোমেইন থেকে মেসেজ পাঠাতে এবং গ্রহণ করতে ব্যবহৃত মেসেঞ্জার কন্ট্রাক্ট।
    address public messenger;

    /* **************
     * কনস্ট্রাক্টর *
     ************** */

    /* *
     * @param _messenger বর্তমান লেয়ারে CrossDomainMessenger-এর ঠিকানা। */
    constructor(address _messenger) {
        messenger = _messenger;
    }
```

কন্ট্রাক্টটির যে একটি প্যারামিটার জানা প্রয়োজন, তা হলো এই লেয়ার-এ ক্রস ডোমেইন মেসেঞ্জারের এডড্রেস।
এই প্যারামিটারটি কনস্ট্রাক্টরে একবার সেট করা হয় এবং কখনো পরিবর্তন হয় না।

```solidity

    /* *********************
     * ফাংশন মডিফায়ারস *
     ********************* */

    /* *
     * মডিফাইড ফাংশনটি শুধুমাত্র একটি নির্দিষ্ট ক্রস-ডোমেইন অ্যাকাউন্ট দ্বারা কলযোগ্য তা নিশ্চিত করে।
     * @param _sourceDomainAccount অরিজিনেটিং ডোমেইনের একমাত্র অ্যাকাউন্ট যা এই ফাংশনটি কল করার জন্য অনুমোদিত। */
    modifier onlyFromCrossDomainAccount(address _sourceDomainAccount) {
```

ক্রস ডোমেইন মেসেজিং ব্লকচেইন-এ চলমান যেকোনো কন্ট্রাক্ট দ্বারা অ্যাক্সেসযোগ্য (হয় ইথিরিয়াম মেইননেট বা Optimism)।
কিন্তু আমাদের প্রতিটি দিকের ব্রিজের প্রয়োজন _শুধুমাত্র_ নির্দিষ্ট মেসেজগুলোকে বিশ্বাস করা যদি সেগুলো অন্য দিকের ব্রিজ থেকে আসে।

```solidity
        require(
            msg.sender == address(getCrossDomainMessenger()),
            "OVM_XCHAIN: messenger contract unauthenticated"
        );
```

শুধুমাত্র উপযুক্ত ক্রস ডোমেইন মেসেঞ্জার (`messenger`, যেমনটি আপনি নিচে দেখতে পাচ্ছেন) থেকে আসা মেসেজগুলো বিশ্বাস করা যেতে পারে।

```solidity

        require(
            getCrossDomainMessenger().xDomainMessageSender() == _sourceDomainAccount,
            "OVM_XCHAIN: wrong sender of cross-domain message"
        );
```

ক্রস ডোমেইন মেসেঞ্জার অন্য লেয়ার-এর সাথে মেসেজ পাঠানো এডড্রেসটি যেভাবে প্রদান করে তা হলো [`.xDomainMessageSender()` ফাংশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1CrossDomainMessenger.sol#L122-L128)।
যতক্ষণ এটি মেসেজ দ্বারা শুরু হওয়া লেনদেন-এ কল করা হয় ততক্ষণ এটি এই তথ্য প্রদান করতে পারে।

আমাদের নিশ্চিত করতে হবে যে আমরা যে মেসেজটি পেয়েছি তা অন্য ব্রিজ থেকে এসেছে।

```solidity

        _;
    }

    /* *********************
     * ইন্টারনাল ফাংশনস *
     ********************* */

    /* *
     * সাধারণত স্টোরেজ থেকে মেসেঞ্জার পায়। চাইল্ড কন্ট্রাক্টের ওভাররাইড করার প্রয়োজন হলে এই ফাংশনটি এক্সপোজ করা হয়।
     * @return যে ক্রস-ডোমেইন মেসেঞ্জার কন্ট্রাক্টটি ব্যবহার করা উচিত তার ঠিকানা। */
    function getCrossDomainMessenger() internal virtual returns (ICrossDomainMessenger) {
        return ICrossDomainMessenger(messenger);
    }
```

এই ফাংশনটি ক্রস ডোমেইন মেসেঞ্জার রিটার্ন করে।
আমরা `messenger` ভেরিয়েবলের পরিবর্তে একটি ফাংশন ব্যবহার করি যাতে এই কন্ট্রাক্ট থেকে ইনহেরিট করা কন্ট্রাক্টগুলো কোন ক্রস ডোমেইন মেসেঞ্জার ব্যবহার করতে হবে তা নির্দিষ্ট করতে একটি এ্যালগরিদম ব্যবহার করতে পারে।

```solidity

    /* *
     * অন্য ডোমেইনের একটি অ্যাকাউন্টে মেসেজ পাঠায়
     * @param _crossDomainTarget গন্তব্য ডোমেইনে উদ্দিষ্ট প্রাপক
     * @param _message টার্গেটে পাঠানোর জন্য ডেটা (সাধারণত `onlyFromCrossDomainAccount()` সহ একটি ফাংশনে কলডেটা)
     * @param _gasLimit টার্গেট ডোমেইনে মেসেজ রিসিভ করার জন্য গ্যাস লিমিট। */
    function sendCrossDomainMessage(
        address _crossDomainTarget,
        uint32 _gasLimit,
        bytes memory _message
```

সবশেষে, যে ফাংশনটি অন্য লেয়ার-এ মেসেজ পাঠায়।

```solidity
    ) internal {
        // slither-disable-next-line reentrancy-events, reentrancy-benign
```

[Slither](https://github.com/crytic/slither) হলো একটি স্ট্যাটিক অ্যানালাইজার যা Optimism প্রতিটি কন্ট্রাক্টে দুর্বলতা এবং অন্যান্য সম্ভাব্য সমস্যা খুঁজতে রান করে।
এই ক্ষেত্রে, নিচের লাইনটি দুটি দুর্বলতা ট্রিগার করে:

1. [রিএন্ট্রান্সি ইভেন্ট](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3)
2. [বিনাইন রিএন্ট্রান্সি](https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2)

```solidity
        getCrossDomainMessenger().sendMessage(_crossDomainTarget, _message, _gasLimit);
    }
}
```

এই ক্ষেত্রে আমরা রিএন্ট্রান্সি নিয়ে চিন্তিত নই, আমরা জানি `getCrossDomainMessenger()` একটি বিশ্বস্ত এডড্রেস রিটার্ন করে, যদিও Slither-এর তা জানার কোনো উপায় নেই।

### The L1 bridge contract {#the-l1-bridge-contract}

[এই কন্ট্রাক্টের সোর্স কোড এখানে রয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L1/messaging/L1StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
```

ইন্টারফেসগুলো অন্যান্য কন্ট্রাক্টের অংশ হতে পারে, তাই তাদের Solidity ভার্সনের একটি বিস্তৃত পরিসর সাপোর্ট করতে হবে।
কিন্তু ব্রিজটি নিজেই আমাদের কন্ট্রাক্ট, এবং এটি কোন Solidity ভার্সন ব্যবহার করে সে সম্পর্কে আমরা কঠোর হতে পারি।

```solidity
/* ইন্টারফেস ইমপোর্টস */
import { IL1StandardBridge } from "./IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "./IL1ERC20Bridge.sol";
```

[IL1ERC20Bridge](#IL1ERC20Bridge) এবং [IL1StandardBridge](#IL1StandardBridge) উপরে ব্যাখ্যা করা হয়েছে।

```solidity
import { IL2ERC20Bridge } from "../../L2/messaging/IL2ERC20Bridge.sol";
```

[এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) আমাদের L2-তে স্ট্যান্ডার্ড ব্রিজ নিয়ন্ত্রণ করার জন্য মেসেজ তৈরি করতে দেয়।

```solidity
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[এই ইন্টারফেসটি](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) আমাদের ERC-20 কন্ট্রাক্ট নিয়ন্ত্রণ করতে দেয়।
[আপনি এখানে এটি সম্পর্কে আরও পড়তে পারেন](/developers/tutorials/erc20-annotated-code/#the-interface)।

```solidity
/* লাইব্রেরি ইমপোর্টস */
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
```

[উপরে ব্যাখ্যা করা হয়েছে](#crossdomainenabled), এই কন্ট্রাক্টটি ইন্টারলেয়ার মেসেজিংয়ের জন্য ব্যবহৃত হয়।

```solidity
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";
```

[`Lib_PredeployAddresses`](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/libraries/constants/Lib_PredeployAddresses.sol)-এ L2 কন্ট্রাক্টগুলোর এডড্রেস রয়েছে যেগুলোর সর্বদা একই এডড্রেস থাকে। এর মধ্যে L2-তে স্ট্যান্ডার্ড ব্রিজ অন্তর্ভুক্ত রয়েছে।

```solidity
import { Address } from "@openzeppelin/contracts/utils/Address.sol";
```

[OpenZeppelin-এর Address ইউটিলিটিজ](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol)। এটি কন্ট্রাক্ট এডড্রেস এবং এক্সটার্নালি ওনড একাউন্ট (EOA)-এর অন্তর্গত এডড্রেসগুলোর মধ্যে পার্থক্য করতে ব্যবহৃত হয়।

মনে রাখবেন যে এটি একটি নিখুঁত সমাধান নয়, কারণ সরাসরি কল এবং কন্ট্রাক্টের কনস্ট্রাক্টর থেকে করা কলগুলোর মধ্যে পার্থক্য করার কোনো উপায় নেই, তবে অন্তত এটি আমাদের কিছু সাধারণ ব্যবহারকারীর ত্রুটি শনাক্ত করতে এবং প্রতিরোধ করতে দেয়।

```solidity
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
```

[ERC-20 স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20) একটি কন্ট্রাক্টের ব্যর্থতা রিপোর্ট করার দুটি উপায় সাপোর্ট করে:

1. রিভার্ট
2. `false` রিটার্ন করা

উভয় ক্ষেত্র পরিচালনা করা আমাদের কোডকে আরও জটিল করে তুলবে, তাই এর পরিবর্তে আমরা [OpenZeppelin-এর `SafeERC20`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol) ব্যবহার করি, যা নিশ্চিত করে যে [সমস্ত ব্যর্থতার ফলে একটি রিভার্ট হয়](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/utils/SafeERC20.sol#L96)।

```solidity
/* *
 * @title L1StandardBridge
 * @dev L1 ETH এবং ERC20 ব্রিজ হলো এমন একটি কন্ট্রাক্ট যা ডিপোজিট করা L1 ফান্ড এবং L2-তে ব্যবহৃত স্ট্যান্ডার্ড টোকেনগুলো স্টোর করে। এটি একটি সংশ্লিষ্ট L2 ব্রিজ সিঙ্ক্রোনাইজ করে, এটিকে ডিপোজিট সম্পর্কে অবহিত করে এবং নতুন চূড়ান্ত হওয়া উত্তোলনের জন্য এটি লিসেন করে।
 * */
contract L1StandardBridge is IL1StandardBridge, CrossDomainEnabled {
    using SafeERC20 for IERC20;
```

এই লাইনটি হলো যেভাবে আমরা প্রতিবার `IERC20` ইন্টারফেস ব্যবহার করার সময় `SafeERC20` র‍্যাপার ব্যবহার করার নির্দেশ দিই।

```solidity

    /* *******************************
     * এক্সটার্নাল কন্ট্রাক্ট রেফারেন্সেস *
     ******************************* */

    address public l2TokenBridge;
```

[L2StandardBridge](#the-l2-bridge-contract)-এর এডড্রেস।

```solidity

    // ডিপোজিট করা L1 টোকেনের ব্যালেন্সে L1 টোকেন থেকে L2 টোকেন ম্যাপ করে
    mapping(address => mapping(address => uint256)) public deposits;
```

এই ধরনের একটি ডাবল [ম্যাপিং](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) হলো যেভাবে আপনি একটি [টু-ডাইমেনশনাল স্পার্স অ্যারে](https://en.wikipedia.org/wiki/Sparse_matrix) সংজ্ঞায়িত করেন।
এই ডেটা স্ট্রাকচারের ভ্যালুগুলো `deposit[L1 token addr][L2 token addr]` হিসেবে চিহ্নিত করা হয়।
ডিফল্ট ভ্যালু হলো শূন্য।
শুধুমাত্র যে সেলগুলো একটি ভিন্ন ভ্যালুতে সেট করা হয় সেগুলো স্টোরেজে লেখা হয়।

```solidity

    /* **************
     * কনস্ট্রাক্টর *
     ************** */

    // এই কন্ট্রাক্টটি একটি প্রক্সির পিছনে থাকে, তাই কনস্ট্রাক্টর প্যারামিটারগুলো অব্যবহৃত থাকবে।
    constructor() CrossDomainEnabled(address(0)) {}
```

স্টোরেজে সমস্ত ভেরিয়েবল কপি না করেই এই কন্ট্রাক্টটি আপগ্রেড করতে সক্ষম হতে চাই।
এটি করার জন্য আমরা একটি [`Proxy`](https://docs.openzeppelin.com/contracts/3.x/api/proxy) ব্যবহার করি, একটি কন্ট্রাক্ট যা একটি পৃথক কন্ট্রাক্টে কল ট্রান্সফার করতে [`delegatecall`](https://solidity-by-example.org/delegatecall/) ব্যবহার করে যার এডড্রেস প্রক্সি কন্ট্রাক্ট দ্বারা সংরক্ষিত থাকে (যখন আপনি আপগ্রেড করেন তখন আপনি প্রক্সিকে সেই এডড্রেস পরিবর্তন করতে বলেন)।
যখন আপনি `delegatecall` ব্যবহার করেন তখন স্টোরেজটি _কলিং_ কন্ট্রাক্টের স্টোরেজ থাকে, তাই সমস্ত কন্ট্রাক্ট স্টেট ভেরিয়েবলের ভ্যালুগুলো প্রভাবিত হয় না।

এই প্যাটার্নের একটি প্রভাব হলো যে কন্ট্রাক্টটি `delegatecall`-এর _কলড_ তার স্টোরেজ ব্যবহৃত হয় না এবং তাই এতে পাস করা কনস্ট্রাক্টর ভ্যালুগুলো কোনো ব্যাপার না।
এই কারণেই আমরা `CrossDomainEnabled` কনস্ট্রাক্টরে একটি অর্থহীন ভ্যালু প্রদান করতে পারি।
এটিও একটি কারণ যে নিচের ইনিশিয়ালাইজেশনটি কনস্ট্রাক্টর থেকে আলাদা।

```solidity
    /* *****************
     * ইনিশিয়ালাইজেশন *
     ***************** */

    /* *
     * @param _l1messenger ক্রস-চেইন কমিউনিকেশনের জন্য ব্যবহৃত L1 মেসেঞ্জারের ঠিকানা।
     * @param _l2TokenBridge L2 স্ট্যান্ডার্ড ব্রিজ ঠিকানা। */
    // slither-disable-next-line external-function
```

এই [Slither টেস্ট](https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external) এমন ফাংশনগুলো শনাক্ত করে যেগুলো কন্ট্রাক্ট কোড থেকে কল করা হয় না এবং তাই `public`-এর পরিবর্তে `external` ঘোষণা করা যেতে পারে।
`external` ফাংশনগুলোর গ্যাস খরচ কম হতে পারে, কারণ সেগুলোকে কলডেটায় প্যারামিটার সরবরাহ করা যেতে পারে।
`public` ঘোষিত ফাংশনগুলো কন্ট্রাক্টের ভেতর থেকে অ্যাক্সেসযোগ্য হতে হবে।
কন্ট্রাক্টগুলো তাদের নিজস্ব কলডেটা পরিবর্তন করতে পারে না, তাই প্যারামিটারগুলো মেমোরিতে থাকতে হবে।
যখন এই ধরনের একটি ফাংশন বাহ্যিকভাবে কল করা হয়, তখন কলডেটা মেমোরিতে কপি করা প্রয়োজন, যার জন্য গ্যাস খরচ হয়।
এই ক্ষেত্রে ফাংশনটি শুধুমাত্র একবার কল করা হয়, তাই অদক্ষতা আমাদের কাছে কোনো ব্যাপার না।

```solidity
    function initialize(address _l1messenger, address _l2TokenBridge) public {
        require(messenger == address(0), "Contract has already been initialized.");
```

`initialize` ফাংশনটি শুধুমাত্র একবার কল করা উচিত।
যদি L1 ক্রস ডোমেইন মেসেঞ্জার বা L2 টোকেন ব্রিজের এডড্রেস পরিবর্তন হয়, তবে আমরা একটি নতুন প্রক্সি এবং একটি নতুন ব্রিজ তৈরি করি যা এটিকে কল করে।
সম্পূর্ণ সিস্টেম আপগ্রেড হওয়া ছাড়া এটি ঘটার সম্ভাবনা কম, যা একটি খুব বিরল ঘটনা।

মনে রাখবেন যে এই ফাংশনটিতে এমন কোনো মেকানিজম নেই যা সীমাবদ্ধ করে যে _কে_ এটিকে কল করতে পারে।
এর মানে হলো তাত্ত্বিকভাবে একজন আক্রমণকারী অপেক্ষা করতে পারে যতক্ষণ না আমরা প্রক্সি এবং ব্রিজের প্রথম ভার্সন ডিপ্লয় করি এবং তারপর বৈধ ব্যবহারকারীর আগে `initialize` ফাংশনে পৌঁছানোর জন্য [ফ্রন্ট-রান](https://solidity-by-example.org/hacks/front-running/) করতে পারে। তবে এটি প্রতিরোধ করার দুটি পদ্ধতি রয়েছে:

1. যদি কন্ট্রাক্টগুলো সরাসরি কোনো EOA দ্বারা ডিপ্লয় না হয়ে [এমন একটি লেনদেন-এ হয় যেখানে অন্য একটি কন্ট্রাক্ট তাদের তৈরি করে](https://medium.com/upstate-interactive/creating-a-contract-with-a-smart-contract-bdb67c5c8595) তবে সম্পূর্ণ প্রক্রিয়াটি অ্যাটমিক হতে পারে এবং অন্য কোনো লেনদেন এক্সিকিউট হওয়ার আগেই শেষ হতে পারে।
2. যদি `initialize`-এর বৈধ কল ব্যর্থ হয় তবে নতুন তৈরি প্রক্সি এবং ব্রিজ উপেক্ষা করা এবং নতুন তৈরি করা সর্বদা সম্ভব।

```solidity
        messenger = _l1messenger;
        l2TokenBridge = _l2TokenBridge;
    }
```

এই দুটি প্যারামিটার ব্রিজের জানা প্রয়োজন।

```solidity

    /* *************
     * ডিপোজিটিং *
     ************* */

    /* * @dev মডিফায়ার যার জন্য প্রেরককে EOA হতে হবে। এই চেকটি initcode-এর মাধ্যমে একটি ক্ষতিকারক কন্ট্রাক্ট দ্বারা বাইপাস করা যেতে পারে, তবে এটি ব্যবহারকারীর ত্রুটিগুলোর যত্ন নেয় যা আমরা এড়াতে চাই। */
    modifier onlyEOA() {
        // কন্ট্রাক্টগুলো থেকে ডিপোজিট বন্ধ করতে ব্যবহৃত হয় (দুর্ঘটনাবশত টোকেন হারানো এড়াতে)
        require(!Address.isContract(msg.sender), "Account not EOA");
        _;
    }
```

এই কারণেই আমাদের OpenZeppelin-এর `Address` ইউটিলিটিজ প্রয়োজন ছিল।

```solidity
    /* *
     * @dev L2-তে কলারের ব্যালেন্সে নির্দিষ্ট পরিমাণ ETH ডিপোজিট করতে
     * কোনো ডেটা ছাড়াই এই ফাংশনটি কল করা যেতে পারে।
     * যেহেতু রিসিভ ফাংশন ডেটা নেয় না, তাই একটি রক্ষণশীল
     * ডিফল্ট পরিমাণ L2-তে ফরোয়ার্ড করা হয়। */
    receive() external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, 200_000, bytes(""));
    }
```

এই ফাংশনটি টেস্টিংয়ের উদ্দেশ্যে বিদ্যমান।
লক্ষ্য করুন যে এটি ইন্টারফেস সংজ্ঞায় উপস্থিত নেই - এটি সাধারণ ব্যবহারের জন্য নয়।

```solidity
    /* *
     * @inheritdoc IL1StandardBridge */
    function depositETH(uint32 _l2Gas, bytes calldata _data) external payable onlyEOA {
        _initiateETHDeposit(msg.sender, msg.sender, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1StandardBridge */
    function depositETHTo(
        address _to,
        uint32 _l2Gas,
        bytes calldata _data
    ) external payable {
        _initiateETHDeposit(msg.sender, _to, _l2Gas, _data);
    }
```

এই দুটি ফাংশন হলো `_initiateETHDeposit`-এর চারপাশের র‍্যাপার, যে ফাংশনটি প্রকৃত ETH ডিপোজিট পরিচালনা করে।

```solidity
    /* *
     * @dev ETH স্টোর করে এবং L2 ETH গেটওয়েকে ডিপোজিট সম্পর্কে অবহিত করে ডিপোজিটের লজিক সম্পাদন করে।
     * @param _from L1-এ যে অ্যাকাউন্ট থেকে ডিপোজিট নেওয়া হবে।
     * @param _to L2-তে যে অ্যাকাউন্টে ডিপোজিট দেওয়া হবে।
     * @param _l2Gas L2-তে ডিপোজিট সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র এক্সটার্নাল কন্ট্রাক্টগুলোর সুবিধার জন্য প্রদান করা হয়েছে। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না। */
    function _initiateETHDeposit(
        address _from,
        address _to,
        uint32 _l2Gas,
        bytes memory _data
    ) internal {
        // finalizeDeposit কলের জন্য কলডেটা তৈরি করুন
        bytes memory message = abi.encodeWithSelector(
```

ক্রস ডোমেইন মেসেজগুলো যেভাবে কাজ করে তা হলো গন্তব্য কন্ট্রাক্টটিকে মেসেজটিকে এর কলডেটা হিসেবে কল করা হয়।
Solidity কন্ট্রাক্টগুলো সর্বদা [ABI স্পেসিফিকেশন](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html) অনুযায়ী তাদের কলডেটা ব্যাখ্যা করে।
Solidity ফাংশন [`abi.encodeWithSelector`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#abi-encoding-and-decoding-functions) সেই কলডেটা তৈরি করে।

```solidity
            IL2ERC20Bridge.finalizeDeposit.selector,
            address(0),
            Lib_PredeployAddresses.OVM_ETH,
            _from,
            _to,
            msg.value,
            _data
        );
```

এখানকার মেসেজটি হলো এই প্যারামিটারগুলোর সাথে [`finalizeDeposit` ফাংশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol#L141-L148) কল করা:

| প্যারামিটার | ভ্যালু                          | অর্থ                                                                                                                                         |
| --------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \_l1Token | address(0)                     | L1-এ ETH (যা কোনো ERC-20 টোকেন নয়)-এর জন্য বিশেষ ভ্যালু                                                                           |
| \_l2Token | Lib_PredeployAddresses.OVM_ETH | L2 কন্ট্রাক্ট যা Optimism-এ ETH পরিচালনা করে, `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` (এই কন্ট্রাক্টটি শুধুমাত্র অভ্যন্তরীণ Optimism ব্যবহারের জন্য) |
| \_from    | \_from                         | L1-এর এডড্রেস যা ETH পাঠায়                                                                                                         |
| \_to      | \_to                           | L2-এর এডড্রেস যা ETH গ্রহণ করে                                                                                                      |
| amount    | msg.value                      | পাঠানো wei-এর পরিমাণ (যা ইতিমধ্যে ব্রিজে পাঠানো হয়েছে)                                                                               |
| \_data    | \_data                         | ডিপোজিটের সাথে যুক্ত করার জন্য অতিরিক্ত ডেটা                                                                                                     |

```solidity
        // L2-তে কলডেটা পাঠান
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);
```

ক্রস ডোমেইন মেসেঞ্জারের মাধ্যমে মেসেজটি পাঠান।

```solidity
        // slither-disable-next-line reentrancy-events
        emit ETHDepositInitiated(_from, _to, msg.value, _data);
    }
```

এই ট্রান্সফার সম্পর্কে শোনে এমন যেকোনো ডিসেন্ট্রালাইজড এপ্লিকেশন-কে জানাতে একটি ইভেন্ট এমিট করুন।

```solidity
    /* *
     * @inheritdoc IL1ERC20Bridge */
    function depositERC20(
		.
		.
		.
    ) external virtual onlyEOA {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, msg.sender, _amount, _l2Gas, _data);
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    function depositERC20To(
		.
		.
		.
    ) external virtual {
        _initiateERC20Deposit(_l1Token, _l2Token, msg.sender, _to, _amount, _l2Gas, _data);
    }
```

এই দুটি ফাংশন হলো `_initiateERC20Deposit`-এর চারপাশের র‍্যাপার, যে ফাংশনটি প্রকৃত ERC-20 ডিপোজিট পরিচালনা করে।

```solidity
    /* *
     * @dev L2 ডিপোজিটেড টোকেন কন্ট্রাক্টকে ডিপোজিট সম্পর্কে অবহিত করে এবং L1 ফান্ড লক করার জন্য একটি হ্যান্ডলার কল করে (যেমন, transferFrom) ডিপোজিটের লজিক সম্পাদন করে।
     *
     * @param _l1Token আমরা যে L1 ERC20 ডিপোজিট করছি তার ঠিকানা
     * @param _l2Token L1-এর সংশ্লিষ্ট L2 ERC20-এর ঠিকানা
     * @param _from L1-এ যে অ্যাকাউন্ট থেকে ডিপোজিট নেওয়া হবে
     * @param _to L2-তে যে অ্যাকাউন্টে ডিপোজিট দেওয়া হবে
     * @param _amount ডিপোজিট করার জন্য ERC20-এর পরিমাণ।
     * @param _l2Gas L2-তে ডিপোজিট সম্পন্ন করার জন্য প্রয়োজনীয় গ্যাস লিমিট।
     * @param _data L2-তে ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র এক্সটার্নাল কন্ট্রাক্টগুলোর সুবিধার জন্য প্রদান করা হয়েছে। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না। */
    function _initiateERC20Deposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l2Gas,
        bytes calldata _data
    ) internal {
```

এই ফাংশনটি উপরের `_initiateETHDeposit`-এর মতোই, তবে কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে।
প্রথম পার্থক্য হলো এই ফাংশনটি টোকেন এডড্রেস এবং ট্রান্সফার করার পরিমাণ প্যারামিটার হিসেবে গ্রহণ করে।
ETH-এর ক্ষেত্রে ব্রিজে কলে ইতিমধ্যে ব্রিজ একাউন্ট-এ অ্যাসেট ট্রান্সফার অন্তর্ভুক্ত থাকে (`msg.value`)।

```solidity
        // যখন L1-এ কোনো ডিপোজিট শুরু হয়, তখন L1 ব্রিজ ভবিষ্যতের জন্য ফান্ডগুলো নিজের কাছে ট্রান্সফার করে
        // উত্তোলনের জন্য। safeTransferFrom কন্ট্রাক্টে কোড আছে কিনা তাও চেক করে, তাই এটি ব্যর্থ হবে যদি
        // _from একটি EOA বা address(0) হয়।
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        IERC20(_l1Token).safeTransferFrom(_from, address(this), _amount);
```

ERC-20 টোকেন ট্রান্সফার ETH থেকে একটি ভিন্ন প্রক্রিয়া অনুসরণ করে:

1. ব্যবহারকারী (`_from`) উপযুক্ত টোকেন ট্রান্সফার করার জন্য ব্রিজকে একটি অনুমতি দেয়।
2. ব্যবহারকারী টোকেন কন্ট্রাক্টের এডড্রেস, পরিমাণ ইত্যাদি দিয়ে ব্রিজকে কল করে।
3. ব্রিজ ডিপোজিট প্রক্রিয়ার অংশ হিসেবে টোকেনগুলো (নিজের কাছে) ট্রান্সফার করে।

প্রথম ধাপটি শেষ দুটির থেকে একটি পৃথক লেনদেন-এ ঘটতে পারে।
তবে, ফ্রন্ট-রানিং কোনো সমস্যা নয় কারণ যে দুটি ফাংশন `_initiateERC20Deposit` কল করে (`depositERC20` এবং `depositERC20To`) তারা শুধুমাত্র `msg.sender`-কে `_from` প্যারামিটার হিসেবে দিয়ে এই ফাংশনটিকে কল করে।

```solidity
        // _l2Token.finalizeDeposit(_to, _amount)-এর জন্য কলডেটা তৈরি করুন
        bytes memory message = abi.encodeWithSelector(
            IL2ERC20Bridge.finalizeDeposit.selector,
            _l1Token,
            _l2Token,
            _from,
            _to,
            _amount,
            _data
        );

        // L2-তে কলডেটা পাঠান
        // slither-disable-next-line reentrancy-events, reentrancy-benign
        sendCrossDomainMessage(l2TokenBridge, _l2Gas, message);

        // slither-disable-next-line reentrancy-benign
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] + _amount;
```

ডিপোজিট করা টোকেনের পরিমাণ `deposits` ডেটা স্ট্রাকচারে যোগ করুন।
L2-তে একাধিক এডড্রেস থাকতে পারে যা একই L1 ERC-20 টোকেনের সাথে মিলে যায়, তাই ডিপোজিটের ট্র্যাক রাখতে L1 ERC-20 টোকেনের ব্রিজের ব্যালেন্স ব্যবহার করা যথেষ্ট নয়।

```solidity

        // slither-disable-next-line reentrancy-events
        emit ERC20DepositInitiated(_l1Token, _l2Token, _from, _to, _amount, _data);
    }

    /* ************************
     * ক্রস-চেইন ফাংশনস *
     ************************ */

    /* *
     * @inheritdoc IL1StandardBridge */
    function finalizeETHWithdrawal(
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

L2 ব্রিজ L2 ক্রস ডোমেইন মেসেঞ্জারে একটি মেসেজ পাঠায় যার ফলে L1 ক্রস ডোমেইন মেসেঞ্জার এই ফাংশনটিকে কল করে (অবশ্যই একবার [মেসেজ চূড়ান্তকারী লেনদেন](https://community.optimism.io/docs/developers/bridge/messaging/#fees-for-l2-%E2%87%92-l1-transactions) L1-এ সাবমিট হওয়ার পর)।

```solidity
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

নিশ্চিত করুন যে এটি একটি _বৈধ_ মেসেজ, যা ক্রস ডোমেইন মেসেঞ্জার থেকে আসছে এবং L2 টোকেন ব্রিজ থেকে উদ্ভূত।
এই ফাংশনটি ব্রিজ থেকে ETH উত্তোলন করতে ব্যবহৃত হয়, তাই আমাদের নিশ্চিত করতে হবে যে এটি শুধুমাত্র অনুমোদিত কলার দ্বারা কল করা হয়েছে।

```solidity
        // slither-disable-next-line reentrancy-events
        (bool success, ) = _to.call{ value: _amount }(new bytes(0));
```

ETH ট্রান্সফার করার উপায় হলো `msg.value`-তে wei-এর পরিমাণ দিয়ে প্রাপককে কল করা।

```solidity
        require(success, "TransferHelper::safeTransferETH: ETH transfer failed");

        // slither-disable-next-line reentrancy-events
        emit ETHWithdrawalFinalized(_from, _to, _amount, _data);
```

উত্তোলন সম্পর্কে একটি ইভেন্ট এমিট করুন।

```solidity
    }

    /* *
     * @inheritdoc IL1ERC20Bridge */
    function finalizeERC20Withdrawal(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
    ) external onlyFromCrossDomainAccount(l2TokenBridge) {
```

এই ফাংশনটি উপরের `finalizeETHWithdrawal`-এর মতোই, ERC-20 টোকেনের জন্য প্রয়োজনীয় পরিবর্তনসহ।

```solidity
        deposits[_l1Token][_l2Token] = deposits[_l1Token][_l2Token] - _amount;
```

`deposits` ডেটা স্ট্রাকচার আপডেট করুন।

```solidity

        // যখন L1-এ কোনো উত্তোলন চূড়ান্ত হয়, তখন L1 ব্রিজ উত্তোলনকারীর কাছে ফান্ড ট্রান্সফার করে
        // slither-disable-next-line reentrancy-events
        IERC20(_l1Token).safeTransfer(_to, _amount);

        // slither-disable-next-line reentrancy-events
        emit ERC20WithdrawalFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
    }


    /* ****************************
     * অস্থায়ী - মাইগ্রেটিং ETH *
     **************************** */

    /* *
     * @dev অ্যাকাউন্টে ETH ব্যালেন্স যোগ করে। এটি একটি পুরানো গেটওয়ে থেকে নতুন গেটওয়েতে ETH
     * মাইগ্রেট করার অনুমতি দেওয়ার জন্য তৈরি করা হয়েছে।
     * দ্রষ্টব্য: এটি শুধুমাত্র একটি আপগ্রেডের জন্য রাখা হয়েছে যাতে আমরা পুরানো কন্ট্রাক্ট থেকে
     * মাইগ্রেট করা ETH গ্রহণ করতে পারি */
    function donateETH() external payable {}
}
```

ব্রিজের একটি পূর্ববর্তী ইমপ্লিমেন্টেশন ছিল।
যখন আমরা সেই ইমপ্লিমেন্টেশন থেকে এটিতে চলে আসি, তখন আমাদের সমস্ত অ্যাসেট সরাতে হয়েছিল।
ERC-20 টোকেনগুলো সহজেই সরানো যেতে পারে।
তবে, একটি কন্ট্রাক্টে ETH ট্রান্সফার করতে আপনার সেই কন্ট্রাক্টের অনুমোদন প্রয়োজন, যা `donateETH` আমাদের প্রদান করে।

## L2-তে ERC-20 টোকেন {#erc-20-tokens-on-l2}

একটি ERC-20 টোকেনকে স্ট্যান্ডার্ড ব্রিজে ফিট করার জন্য, এটিকে স্ট্যান্ডার্ড ব্রিজকে এবং _শুধুমাত্র_ স্ট্যান্ডার্ড ব্রিজকে টোকেন মিন্ট করার অনুমতি দিতে হবে।
এটি প্রয়োজনীয় কারণ ব্রিজগুলোকে নিশ্চিত করতে হবে যে Optimism-এ সার্কুলেট হওয়া টোকেনের সংখ্যা L1 ব্রিজ কন্ট্রাক্টের ভেতরে লক করা টোকেনের সংখ্যার সমান।
যদি L2-তে খুব বেশি টোকেন থাকে তবে কিছু ব্যবহারকারী তাদের অ্যাসেটগুলো আবার L1-এ ব্রিজ করতে অক্ষম হবে।
একটি বিশ্বস্ত ব্রিজের পরিবর্তে, আমরা মূলত [ফ্র্যাকশনাল রিজার্ভ ব্যাংকিং](https://www.investopedia.com/terms/f/fractionalreservebanking.asp) পুনরায় তৈরি করব।
যদি L1-এ খুব বেশি টোকেন থাকে, তবে সেই টোকেনগুলোর কিছু চিরকালের জন্য ব্রিজ কন্ট্রাক্টের ভেতরে লক হয়ে থাকবে কারণ L2 টোকেন বার্ন করা ছাড়া সেগুলো রিলিজ করার কোনো উপায় নেই।

### IL2StandardERC20 {#il2standarderc20}

L2-তে প্রতিটি ERC-20 টোকেন যা স্ট্যান্ডার্ড ব্রিজ ব্যবহার করে তাকে [এই ইন্টারফেসটি](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/IL2StandardERC20.sol) প্রদান করতে হবে, যাতে স্ট্যান্ডার্ড ব্রিজের প্রয়োজনীয় ফাংশন এবং ইভেন্টগুলো রয়েছে।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

[স্ট্যান্ডার্ড ERC-20 ইন্টারফেস](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)-এ `mint` এবং `burn` ফাংশন অন্তর্ভুক্ত নেই।
এই মেথডগুলো [ERC-20 স্ট্যান্ডার্ড](https://eips.ethereum.org/EIPS/eip-20) দ্বারা প্রয়োজনীয় নয়, যা টোকেন তৈরি এবং ধ্বংস করার মেকানিজমগুলো অনির্দিষ্ট রাখে।

```solidity
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
```

[ERC-165 ইন্টারফেস](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/introspection/IERC165.sol) একটি কন্ট্রাক্ট কী কী ফাংশন প্রদান করে তা নির্দিষ্ট করতে ব্যবহৃত হয়।
[আপনি এখানে স্ট্যান্ডার্ডটি পড়তে পারেন](https://eips.ethereum.org/EIPS/eip-165)।

```solidity
interface IL2StandardERC20 is IERC20, IERC165 {
    function l1Token() external returns (address);
```

এই ফাংশনটি L1 টোকেনের এডড্রেস প্রদান করে যা এই কন্ট্রাক্টে ব্রিজ করা হয়েছে।
মনে রাখবেন যে বিপরীত দিকে আমাদের অনুরূপ কোনো ফাংশন নেই।
আমাদের যেকোনো L1 টোকেন ব্রিজ করতে সক্ষম হতে হবে, এটি ইমপ্লিমেন্ট করার সময় L2 সাপোর্ট করার পরিকল্পনা করা হয়েছিল কি না তা নির্বিশেষে।

```solidity

    function mint(address _to, uint256 _amount) external;

    function burn(address _from, uint256 _amount) external;

    event Mint(address indexed _account, uint256 _amount);
    event Burn(address indexed _account, uint256 _amount);
}
```

টোকেন মিন্ট (তৈরি) এবং বার্ন (ধ্বংস) করার ফাংশন এবং ইভেন্ট।
টোকেনের সংখ্যা সঠিক (L1-এ লক করা টোকেনের সংখ্যার সমান) তা নিশ্চিত করতে ব্রিজটি একমাত্র এনটিটি হওয়া উচিত যা এই ফাংশনগুলো রান করতে পারে।

### L2StandardERC20 {#L2StandardERC20}

[এটি হলো `IL2StandardERC20` ইন্টারফেসের আমাদের ইমপ্লিমেন্টেশন](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/standards/L2StandardERC20.sol)।
যদি না আপনার কোনো ধরনের কাস্টম লজিকের প্রয়োজন হয়, আপনার এটি ব্যবহার করা উচিত।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

[OpenZeppelin ERC-20 কন্ট্রাক্ট](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)।
Optimism চাকা পুনরায় আবিষ্কার করায় বিশ্বাস করে না, বিশেষ করে যখন চাকাটি ভালোভাবে অডিট করা হয় এবং অ্যাসেট ধরে রাখার জন্য যথেষ্ট বিশ্বস্ত হওয়া প্রয়োজন।

```solidity
import "./IL2StandardERC20.sol";

contract L2StandardERC20 is IL2StandardERC20, ERC20 {
    address public l1Token;
    address public l2Bridge;
```

এই দুটি অতিরিক্ত কনফিগারেশন প্যারামিটার যা আমাদের প্রয়োজন এবং ERC-20-এর সাধারণত প্রয়োজন হয় না।

```solidity

    /* *
     * @param _l2Bridge L2 স্ট্যান্ডার্ড ব্রিজের ঠিকানা।
     * @param _l1Token সংশ্লিষ্ট L1 টোকেনের ঠিকানা।
     * @param _name ERC20 নাম।
     * @param _symbol ERC20 প্রতীক। */
    constructor(
        address _l2Bridge,
        address _l1Token,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        l1Token = _l1Token;
        l2Bridge = _l2Bridge;
    }
```

প্রথমে আমরা যে কন্ট্রাক্ট থেকে ইনহেরিট করি তার কনস্ট্রাক্টর কল করুন (`ERC20(_name, _symbol)`) এবং তারপর আমাদের নিজস্ব ভেরিয়েবলগুলো সেট করুন।

```solidity

    modifier onlyL2Bridge() {
        require(msg.sender == l2Bridge, "Only L2 Bridge can mint and burn");
        _;
    }


    // slither-disable-next-line external-function
    function supportsInterface(bytes4 _interfaceId) public pure returns (bool) {
        bytes4 firstSupportedInterface = bytes4(keccak256("supportsInterface(bytes4)")); // ERC165
        bytes4 secondSupportedInterface = IL2StandardERC20.l1Token.selector ^
            IL2StandardERC20.mint.selector ^
            IL2StandardERC20.burn.selector;
        return _interfaceId == firstSupportedInterface || _interfaceId == secondSupportedInterface;
    }
```

এভাবেই [ERC-165](https://eips.ethereum.org/EIPS/eip-165) কাজ করে।
প্রতিটি ইন্টারফেস হলো বেশ কয়েকটি সাপোর্টেড ফাংশন, এবং সেই ফাংশনগুলোর [ABI ফাংশন সিলেক্টর](https://docs.soliditylang.org/en/v0.8.12/abi-spec.html#function-selector)-এর [এক্সক্লুসিভ অর](https://en.wikipedia.org/wiki/Exclusive_or) হিসেবে চিহ্নিত করা হয়।

L2 ব্রিজ ERC-165-কে একটি স্যানিটি চেক হিসেবে ব্যবহার করে যাতে নিশ্চিত করা যায় যে এটি যে ERC-20 কন্ট্রাক্টে অ্যাসেট পাঠায় তা একটি `IL2StandardERC20`।

**নোট:** `supportsInterface`-এ মিথ্যা উত্তর প্রদান করা থেকে কোনো দুর্বৃত্ত কন্ট্রাক্টকে বাধা দেওয়ার কিছু নেই, তাই এটি একটি স্যানিটি চেক মেকানিজম, কোনো সিকিউরিটি মেকানিজম _নয়_।

```solidity
    // slither-disable-next-line external-function
    function mint(address _to, uint256 _amount) public virtual onlyL2Bridge {
        _mint(_to, _amount);

        emit Mint(_to, _amount);
    }

    // slither-disable-next-line external-function
    function burn(address _from, uint256 _amount) public virtual onlyL2Bridge {
        _burn(_from, _amount);

        emit Burn(_from, _amount);
    }
}
```

শুধুমাত্র L2 ব্রিজকে অ্যাসেট মিন্ট এবং বার্ন করার অনুমতি দেওয়া হয়েছে।

`_mint` এবং `_burn` আসলে [OpenZeppelin ERC-20 কন্ট্রাক্ট](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)-এ সংজ্ঞায়িত করা হয়েছে।
সেই কন্ট্রাক্টটি কেবল সেগুলোকে বাহ্যিকভাবে প্রকাশ করে না, কারণ টোকেন মিন্ট এবং বার্ন করার শর্তগুলো ERC-20 ব্যবহার করার উপায়গুলোর সংখ্যার মতোই বৈচিত্র্যময়।

## L2 ব্রিজ কোড {#l2-bridge-code}

এটি সেই কোড যা Optimism-এ ব্রিজ রান করে।
[এই কন্ট্রাক্টের সোর্স এখানে রয়েছে](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/L2StandardBridge.sol)।

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* ইন্টারফেস ইমপোর্টস */
import { IL1StandardBridge } from "../../L1/messaging/IL1StandardBridge.sol";
import { IL1ERC20Bridge } from "../../L1/messaging/IL1ERC20Bridge.sol";
import { IL2ERC20Bridge } from "./IL2ERC20Bridge.sol";
```

[IL2ERC20Bridge](https://github.com/ethereum-optimism/optimism/blob/develop/packages/contracts/contracts/L2/messaging/IL2ERC20Bridge.sol) ইন্টারফেসটি আমরা উপরে দেখা [L1 সমতুল্য](#IL1ERC20Bridge)-এর মতোই।
দুটি উল্লেখযোগ্য পার্থক্য রয়েছে:

1. L1-এ আপনি ডিপোজিট শুরু করেন এবং উত্তোলন চূড়ান্ত করেন। এখানে আপনি উত্তোলন শুরু করেন এবং ডিপোজিট চূড়ান্ত করেন।
2. L1-এ ETH এবং ERC-20 টোকেনের মধ্যে পার্থক্য করা প্রয়োজন। L2-তে আমরা উভয়ের জন্য একই ফাংশন ব্যবহার করতে পারি কারণ অভ্যন্তরীণভাবে Optimism-এ ETH ব্যালেন্সগুলো [0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000](https://explorer.optimism.io/address/0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000) এডড্রেস সহ একটি ERC-20 টোকেন হিসেবে পরিচালিত হয়।

```solidity
/* লাইব্রেরি ইমপোর্টস */
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import { CrossDomainEnabled } from "../../libraries/bridge/CrossDomainEnabled.sol";
import { Lib_PredeployAddresses } from "../../libraries/constants/Lib_PredeployAddresses.sol";

/* কন্ট্রাক্ট ইমপোর্টস */
import { IL2StandardERC20 } from "../../standards/IL2StandardERC20.sol";

/* *
 * @title L2StandardBridge
 * @dev L2 স্ট্যান্ডার্ড ব্রিজ হলো এমন একটি কন্ট্রাক্ট যা L1 এবং L2-এর মধ্যে ETH এবং ERC20 ট্রানজিশন সক্ষম করতে L1 স্ট্যান্ডার্ড ব্রিজের সাথে একসাথে কাজ করে।
 * যখন এটি L1 স্ট্যান্ডার্ড ব্রিজে ডিপোজিট সম্পর্কে জানতে পারে তখন এই কন্ট্রাক্টটি নতুন টোকেনগুলোর জন্য মিন্টার হিসেবে কাজ করে।
 * এই কন্ট্রাক্টটি উত্তোলনের উদ্দেশ্যে টোকেনগুলোর বার্নার হিসেবেও কাজ করে, L1 ফান্ড রিলিজ করার জন্য L1 ব্রিজকে অবহিত করে। */
contract L2StandardBridge is IL2ERC20Bridge, CrossDomainEnabled {
    /* *******************************
     * এক্সটার্নাল কন্ট্রাক্ট রেফারেন্সেস *
     ******************************* */

    address public l1TokenBridge;
```

L1 ব্রিজের এডড্রেস-এর ট্র্যাক রাখুন।
মনে রাখবেন যে L1 সমতুল্যের বিপরীতে, এখানে আমাদের এই ভেরিয়েবলটি _প্রয়োজন_।
L1 ব্রিজের এডড্রেস আগে থেকে জানা যায় না।

```solidity

    /* **************
     * কনস্ট্রাক্টর *
     ************** */

    /* *
     * @param _l2CrossDomainMessenger এই কন্ট্রাক্ট দ্বারা ব্যবহৃত ক্রস-ডোমেইন মেসেঞ্জার।
     * @param _l1TokenBridge মেইন চেইনে ডিপ্লয় করা L1 ব্রিজের ঠিকানা। */
    constructor(address _l2CrossDomainMessenger, address _l1TokenBridge)
        CrossDomainEnabled(_l2CrossDomainMessenger)
    {
        l1TokenBridge = _l1TokenBridge;
    }

    /* **************
     * উইথড্রয়িং *
     ************** */

    /* *
     * @inheritdoc IL2ERC20Bridge */
    function withdraw(
        address _l2Token,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, msg.sender, _amount, _l1Gas, _data);
    }

    /* *
     * @inheritdoc IL2ERC20Bridge */
    function withdrawTo(
        address _l2Token,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) external virtual {
        _initiateWithdrawal(_l2Token, msg.sender, _to, _amount, _l1Gas, _data);
    }
```

এই দুটি ফাংশন উত্তোলন শুরু করে।
মনে রাখবেন যে L1 টোকেন এডড্রেস নির্দিষ্ট করার কোনো প্রয়োজন নেই।
L2 টোকেনগুলো আমাদের L1 সমতুল্যের এডড্রেস বলবে বলে আশা করা হয়।

```solidity

    /* *
     * @dev টোকেন বার্ন করে এবং L1 টোকেন গেটওয়েকে উত্তোলন সম্পর্কে অবহিত করে উত্তোলনের লজিক সম্পাদন করে।
     * @param _l2Token যে L2 টোকেন থেকে উত্তোলন শুরু হয়েছে তার ঠিকানা।
     * @param _from L2-তে যে অ্যাকাউন্ট থেকে উত্তোলন নেওয়া হবে।
     * @param _to L1-এ যে অ্যাকাউন্টে উত্তোলন দেওয়া হবে।
     * @param _amount উত্তোলন করার জন্য টোকেনের পরিমাণ।
     * @param _l1Gas অব্যবহৃত, তবে সম্ভাব্য ফরোয়ার্ড কম্প্যাটিবিলিটি বিবেচনার জন্য অন্তর্ভুক্ত করা হয়েছে।
     * @param _data L1-এ ফরোয়ার্ড করার জন্য ঐচ্ছিক ডেটা। এই ডেটা শুধুমাত্র এক্সটার্নাল কন্ট্রাক্টগুলোর সুবিধার জন্য প্রদান করা হয়েছে। সর্বোচ্চ দৈর্ঘ্য প্রয়োগ করা ছাড়া, এই কন্ট্রাক্টগুলো এর বিষয়বস্তু সম্পর্কে কোনো গ্যারান্টি দেয় না। */
    function _initiateWithdrawal(
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        uint32 _l1Gas,
        bytes calldata _data
    ) internal {
        // যখন কোনো উত্তোলন শুরু হয়, তখন আমরা পরবর্তী L2 প্রতিরোধ করতে উত্তোলনকারীর ফান্ড বার্ন করি
        // ব্যবহার
        // slither-disable-next-line reentrancy-events
        IL2StandardERC20(_l2Token).burn(msg.sender, _amount);
```

লক্ষ্য করুন যে আমরা `_from` প্যারামিটারের ওপর নির্ভর করছি _না_ বরং `msg.sender`-এর ওপর নির্ভর করছি যা নকল করা অনেক কঠিন (আমার জানামতে অসম্ভব)।

```solidity

        // l1TokenBridge.finalizeERC20Withdrawal(_to, _amount)-এর জন্য কলডেটা তৈরি করুন
        // slither-disable-next-line reentrancy-events
        address l1Token = IL2StandardERC20(_l2Token).l1Token();
        bytes memory message;

        if (_l2Token == Lib_PredeployAddresses.OVM_ETH) {
```

L1-এ ETH এবং ERC-20-এর মধ্যে পার্থক্য করা প্রয়োজন।

```solidity
            message = abi.encodeWithSelector(
                IL1StandardBridge.finalizeETHWithdrawal.selector,
                _from,
                _to,
                _amount,
                _data
            );
        } else {
            message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                l1Token,
                _l2Token,
                _from,
                _to,
                _amount,
                _data
            );
        }

        // L1 ব্রিজে মেসেজ পাঠান
        // slither-disable-next-line reentrancy-events
        sendCrossDomainMessage(l1TokenBridge, _l1Gas, message);

        // slither-disable-next-line reentrancy-events
        emit WithdrawalInitiated(l1Token, _l2Token, msg.sender, _to, _amount, _data);
    }

    /* ***********************************
     * ক্রস-চেইন ফাংশন: ডিপোজিটিং *
     *********************************** */

    /* *
     * @inheritdoc IL2ERC20Bridge */
    function finalizeDeposit(
        address _l1Token,
        address _l2Token,
        address _from,
        address _to,
        uint256 _amount,
        bytes calldata _data
```

এই ফাংশনটি `L1StandardBridge` দ্বারা কল করা হয়।

```solidity
    ) external virtual onlyFromCrossDomainAccount(l1TokenBridge) {
```

নিশ্চিত করুন যে মেসেজের উৎসটি বৈধ।
এটি গুরুত্বপূর্ণ কারণ এই ফাংশনটি `_mint` কল করে এবং এমন টোকেন দিতে ব্যবহার করা যেতে পারে যা L1-এ ব্রিজের মালিকানাধীন টোকেন দ্বারা কভার করা হয় না।

```solidity
        // টার্গেট টোকেনটি কমপ্লায়েন্ট কিনা তা চেক করুন এবং
        // যাচাই করুন যে L1-এ ডিপোজিট করা টোকেনটি এখানে L2 ডিপোজিট করা টোকেন রিপ্রেজেন্টেশনের সাথে মেলে
        if (
            // slither-disable-next-line reentrancy-events
            ERC165Checker.supportsInterface(_l2Token, 0x1d1d8b63) &&
            _l1Token == IL2StandardERC20(_l2Token).l1Token()
```

স্যানিটি চেক:

1. সঠিক ইন্টারফেস সাপোর্ট করে
2. L2 ERC-20 কন্ট্রাক্টের L1 এডড্রেস টোকেনগুলোর L1 উৎসের সাথে মেলে

```solidity
        ) {
            // যখন কোনো ডিপোজিট চূড়ান্ত হয়, তখন আমরা L2-তে অ্যাকাউন্টে সমপরিমাণ ক্রেডিট করি
            // টোকেন।
            // slither-disable-next-line reentrancy-events
            IL2StandardERC20(_l2Token).mint(_to, _amount);
            // slither-disable-next-line reentrancy-events
            emit DepositFinalized(_l1Token, _l2Token, _from, _to, _amount, _data);
```

যদি স্যানিটি চেক পাস হয়, তবে ডিপোজিট চূড়ান্ত করুন:

1. টোকেনগুলো মিন্ট করুন
2. উপযুক্ত ইভেন্ট এমিট করুন

```solidity
        } else {
            // যে L2 টোকেনে ডিপোজিট করা হচ্ছে সেটি সঠিক ঠিকানা সম্পর্কে দ্বিমত পোষণ করে
            // এর L1 টোকেনের, অথবা সঠিক ইন্টারফেস সমর্থন করে না।
            // এটি শুধুমাত্র তখনই ঘটা উচিত যদি কোনো ক্ষতিকারক L2 টোকেন থাকে, অথবা যদি কোনো ব্যবহারকারী কোনোভাবে
            // ডিপোজিট করার জন্য ভুল L2 টোকেন ঠিকানা নির্দিষ্ট করে।
            // যেকোনো ক্ষেত্রেই, আমরা এখানে প্রক্রিয়াটি থামিয়ে দিই এবং একটি উত্তোলন তৈরি করি
            // মেসেজ যাতে ব্যবহারকারীরা কিছু ক্ষেত্রে তাদের ফান্ড বের করে নিতে পারে।
            // ক্ষতিকারক টোকেন কন্ট্রাক্টগুলো পুরোপুরি প্রতিরোধ করার কোনো উপায় নেই, তবে এটি সীমাবদ্ধ করে
            // ব্যবহারকারীর ত্রুটি এবং কিছু ধরণের ক্ষতিকারক কন্ট্রাক্ট আচরণ প্রশমিত করে।
```

যদি কোনো ব্যবহারকারী ভুল L2 টোকেন এডড্রেস ব্যবহার করে কোনো শনাক্তযোগ্য ত্রুটি করে, তবে আমরা ডিপোজিট বাতিল করতে এবং L1-এ টোকেনগুলো ফেরত দিতে চাই।
L2 থেকে আমরা এটি করার একমাত্র উপায় হলো একটি মেসেজ পাঠানো যা ফল্ট চ্যালেঞ্জ পিরিয়ড পর্যন্ত অপেক্ষা করতে হবে, তবে এটি ব্যবহারকারীর জন্য টোকেনগুলো স্থায়ীভাবে হারানোর চেয়ে অনেক ভালো।

```solidity
            bytes memory message = abi.encodeWithSelector(
                IL1ERC20Bridge.finalizeERC20Withdrawal.selector,
                _l1Token,
                _l2Token,
                _to, // প্রেরকের কাছে ডিপোজিট বাউন্স ব্যাক করতে এখানে _to এবং _from পরিবর্তন করা হয়েছে
                _from,
                _amount,
                _data
            );

            // L1 ব্রিজে মেসেজ পাঠান
            // slither-disable-next-line reentrancy-events
            sendCrossDomainMessage(l1TokenBridge, 0, message);
            // slither-disable-next-line reentrancy-events
            emit DepositFailed(_l1Token, _l2Token, _from, _to, _amount, _data);
        }
    }
}
```

## উপসংহার {#conclusion}

স্ট্যান্ডার্ড ব্রিজ হলো অ্যাসেট ট্রান্সফারের জন্য সবচেয়ে নমনীয় মেকানিজম।
তবে, এটি এত জেনেরিক হওয়ার কারণে এটি সর্বদা ব্যবহার করার সবচেয়ে সহজ মেকানিজম নয়।
বিশেষ করে উত্তোলনের জন্য, বেশিরভাগ ব্যবহারকারী [থার্ড পার্টি ব্রিজ](https://optimism.io/apps#bridge) ব্যবহার করতে পছন্দ করেন যা চ্যালেঞ্জ পিরিয়ডের জন্য অপেক্ষা করে না এবং উত্তোলন চূড়ান্ত করার জন্য কোনো Merkle প্রুফ-এর প্রয়োজন হয় না।

এই ব্রিজগুলো সাধারণত L1-এ অ্যাসেট রাখার মাধ্যমে কাজ করে, যা তারা একটি ছোট ফি-এর বিনিময়ে অবিলম্বে প্রদান করে (প্রায়শই একটি স্ট্যান্ডার্ড ব্রিজ উত্তোলনের জন্য গ্যাস খরচের চেয়ে কম)।
যখন ব্রিজ (বা এটি পরিচালনাকারী লোকেরা) L1 অ্যাসেট কম হওয়ার আশঙ্কা করে তখন এটি L2 থেকে পর্যাপ্ত অ্যাসেট ট্রান্সফার করে। যেহেতু এগুলো অনেক বড় উত্তোলন, তাই উত্তোলন খরচ একটি বড় পরিমাণের ওপর অ্যামর্টাইজ করা হয় এবং এটি অনেক ছোট শতাংশ হয়।

আশা করি এই আর্টিকেলটি আপনাকে লেয়ার ২ কীভাবে কাজ করে এবং কীভাবে পরিষ্কার ও সুরক্ষিত Solidity কোড লিখতে হয় সে সম্পর্কে আরও বুঝতে সাহায্য করেছে।

[আমার আরও কাজের জন্য এখানে দেখুন](https://cryptodocguy.pro/)।