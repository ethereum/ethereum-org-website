---
title: "স্মার্ট কন্ট্রাক্ট টেস্ট করতে কীভাবে একিডনা ব্যবহার করবেন"
description: "স্মার্ট কন্ট্রাক্ট স্বয়ংক্রিয়ভাবে টেস্ট করতে কীভাবে একিডনা ব্যবহার করবেন"
author: "ট্রেইলঅফবিটস"
lang: bn
tags: ["Solidity", "স্মার্ট কন্ট্রাক্ট", "নিরাপত্তা", "টেস্টিং", "ফাজিং"]
skill: advanced
breadcrumb: "একিডনা"
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## ইনস্টলেশন {#installation}

একিডনা Docker, Homebrew বা প্রি-কম্পাইল করা বাইনারি ব্যবহার করে ইনস্টল করা যেতে পারে। এই টিউটোরিয়ালের উদাহরণগুলো একিডনা 2.3.3 এবং solc 0.8.37 দিয়ে টেস্ট করা হয়েছে।

### Docker-এর মাধ্যমে একিডনা {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_শেষ কমান্ডটি একটি Docker-এ একিডনা ইমেজ রান করে যার আপনার বর্তমান ডিরেক্টরিতে অ্যাক্সেস রয়েছে। আপনি আপনার হোস্ট থেকে ফাইলগুলো পরিবর্তন করতে পারেন এবং Docker থেকে ফাইলগুলোর উপর টুলগুলো রান করতে পারেন। ইমেজটিতে [স্লিদার](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) এবং [solc-select](https://github.com/crytic/solc-select)-ও রয়েছে।_

Docker-এর ভেতরে রান করুন:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### বাইনারি {#binary}

[https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest) থেকে আপনার প্ল্যাটফর্মের জন্য সর্বশেষ রিলিজটি ডাউনলোড করুন। macOS বা Linux-এ আপনি `brew install echidna` রান করতে পারেন, যা এর সাথে স্লিদার এবং crytic-compile ইনস্টল করে।

রিলিজ বাইনারি ব্যবহার করার সময়, [স্লিদার](https://github.com/crytic/slither) এবং [solc-select](https://github.com/crytic/solc-select) নিজে ইনস্টল করুন (উদাহরণস্বরূপ একটি Python ভার্চুয়াল এনভায়রনমেন্টে `pip3 install slither-analyzer solc-select`) এবং একটি কম্পাইলার সংস্করণ নির্বাচন করুন:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

একিডনা স্লিদার ছাড়াই রান করে, তবে স্লিদার `require` স্টেটমেন্টে ব্যবহৃত ম্যাজিক নম্বরের মতো ধ্রুবকগুলো (constants) বের করে আনে এবং নিচের বেশ কয়েকটি উদাহরণ দ্রুত বাগ খুঁজে পেতে এর উপর নির্ভর করে।

## প্রপার্টি-ভিত্তিক ফাজিং পরিচিতি {#introduction-to-property-based-fuzzing}

একিডনা হলো একটি প্রপার্টি-ভিত্তিক ফাজার, যা আমরা আমাদের আগের ব্লগপোস্টগুলোতে বর্ণনা করেছি ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))।

### ফাজিং {#fuzzing}

নিরাপত্তা কমিউনিটিতে [ফাজিং](https://wikipedia.org/wiki/Fuzzing) একটি সুপরিচিত কৌশল। প্রোগ্রামে বাগ খুঁজে বের করার জন্য কমবেশি র‍্যান্ডম ইনপুট তৈরি করা এর অন্তর্ভুক্ত। প্রথাগত সফটওয়্যারের জন্য ফাজারগুলো (যেমন [AFL](http://lcamtuf.coredump.cx/afl/) বা [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) বাগ খুঁজে বের করার কার্যকর টুল হিসেবে পরিচিত।

সম্পূর্ণ র‍্যান্ডম ইনপুট তৈরির বাইরেও, ভালো ইনপুট তৈরি করার জন্য অনেক কৌশল এবং পদ্ধতি রয়েছে, যার মধ্যে রয়েছে:

- প্রতিটি এক্সিকিউশন থেকে ফিডব্যাক নেওয়া এবং এটি ব্যবহার করে জেনারেশন গাইড করা। উদাহরণস্বরূপ, যদি একটি নতুন তৈরি করা ইনপুট একটি নতুন পাথ ডিসকভারি করতে সাহায্য করে, তবে এর কাছাকাছি নতুন ইনপুট তৈরি করা যৌক্তিক হতে পারে।
- একটি কাঠামোগত সীমাবদ্ধতা (structural constraint) মেনে ইনপুট তৈরি করা। উদাহরণস্বরূপ, যদি আপনার ইনপুটে চেকসামসহ একটি হেডার থাকে, তবে ফাজারকে চেকসাম যাচাই করে এমন ইনপুট তৈরি করতে দেওয়া যৌক্তিক হবে।
- নতুন ইনপুট তৈরি করতে পরিচিত ইনপুট ব্যবহার করা: যদি আপনার কাছে বৈধ ইনপুটের একটি বড় ডেটাসেটের অ্যাক্সেস থাকে, তবে আপনার ফাজার শূন্য থেকে শুরু করার পরিবর্তে সেগুলো থেকে নতুন ইনপুট তৈরি করতে পারে। এগুলোকে সাধারণত _সিডস (seeds)_ বলা হয়।

### প্রপার্টি-ভিত্তিক ফাজিং {#property-based-fuzzing}

একিডনা ফাজারের একটি নির্দিষ্ট পরিবারের অন্তর্গত: প্রপার্টি-ভিত্তিক ফাজিং যা [QuickCheck](https://wikipedia.org/wiki/QuickCheck) দ্বারা ব্যাপকভাবে অনুপ্রাণিত। ক্লাসিক ফাজারের বিপরীতে যা ক্র্যাশ খুঁজে বের করার চেষ্টা করে, একিডনা ব্যবহারকারী-নির্ধারিত ইনভ্যারিয়েন্টগুলো (invariants) ভাঙার চেষ্টা করবে।

স্মার্ট কন্ট্রাক্টে, ইনভ্যারিয়েন্টগুলো হলো Solidity ফাংশন, যা কন্ট্রাক্ট পৌঁছাতে পারে এমন যেকোনো ভুল বা অবৈধ স্টেট উপস্থাপন করতে পারে, যার মধ্যে রয়েছে:

- ভুল অ্যাক্সেস কন্ট্রোল: আক্রমণকারী কন্ট্রাক্টের মালিক হয়ে গেছে।
- ভুল স্টেট মেশিন: কন্ট্রাক্ট পজ (pause) থাকা অবস্থায় টোকেন ট্রান্সফার করা যেতে পারে।
- ভুল পাটিগণিত: ব্যবহারকারী তার ব্যালেন্স আন্ডারফ্লো করতে পারে এবং আনলিমিটেড ফ্রি টোকেন পেতে পারে।

### একিডনা দিয়ে একটি প্রপার্টি টেস্ট করা {#testing-a-property-with-echidna}

আমরা দেখব কীভাবে একিডনা দিয়ে একটি স্মার্ট কন্ট্রাক্ট টেস্ট করতে হয়। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

আমরা ধরে নেব যে এই টোকেনের অবশ্যই নিচের প্রপার্টিগুলো থাকতে হবে:

- যেকোনো ব্যক্তির কাছে সর্বোচ্চ 1000 টোকেন থাকতে পারে
- টোকেনটি ট্রান্সফার করা যাবে না (এটি কোনো ERC-20 টোকেন নয়)

### একটি প্রপার্টি লেখা {#write-a-property}

একিডনা প্রপার্টিগুলো হলো Solidity ফাংশন। একটি প্রপার্টিতে অবশ্যই:

- কোনো আর্গুমেন্ট থাকা যাবে না
- সফল হলে `true` রিটার্ন করতে হবে
- এর নাম `echidna` দিয়ে শুরু হতে হবে

একিডনা যা করবে:

- প্রপার্টি টেস্ট করার জন্য স্বয়ংক্রিয়ভাবে আরবিট্রারি ট্রানজ্যাকশন তৈরি করবে।
- কোনো ট্রানজ্যাকশন প্রপার্টিকে `false` রিটার্ন করালে বা এরর থ্রো করলে তা রিপোর্ট করবে।
- একটি প্রপার্টি কল করার সময় সাইড-ইফেক্ট বাতিল করবে (অর্থাৎ, যদি প্রপার্টিটি কোনো স্টেট ভেরিয়েবল পরিবর্তন করে, তবে টেস্টের পরে তা বাতিল করা হয়)

নিচের প্রপার্টিটি চেক করে যে কলারের কাছে 1000-এর বেশি টোকেন নেই:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

আপনার কন্ট্রাক্টকে আপনার প্রপার্টিগুলো থেকে আলাদা করতে ইনহেরিটেন্স ব্যবহার করুন:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) প্রপার্টিটি ইমপ্লিমেন্ট করে এবং টোকেন থেকে ইনহেরিট করে।

### একটি কন্ট্রাক্ট ইনিশিয়েট করা {#initiate-a-contract}

একিডনার আর্গুমেন্ট ছাড়া একটি [কনস্ট্রাক্টর](/developers/docs/smart-contracts/anatomy/#constructor-functions) প্রয়োজন। যদি আপনার কন্ট্রাক্টের একটি নির্দিষ্ট ইনিশিয়ালাইজেশন প্রয়োজন হয়, তবে আপনাকে এটি কনস্ট্রাক্টরে করতে হবে।

একিডনায় কিছু নির্দিষ্ট ঠিকানা রয়েছে:

- `0x30000` যা কনস্ট্রাক্টরকে কল করে।
- `0x10000`, `0x20000` এবং `0x30000` যা র‍্যান্ডমভাবে অন্যান্য ফাংশনগুলোকে কল করে।
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` যেখানে টেস্টের অধীনে থাকা কন্ট্রাক্টটি ডিপ্লয় করা হয়।

আমাদের বর্তমান উদাহরণে কোনো নির্দিষ্ট ইনিশিয়ালাইজেশনের প্রয়োজন নেই, যার ফলে আমাদের কনস্ট্রাক্টরটি খালি।

### একিডনা রান করা {#run-echidna}

একিডনা এর মাধ্যমে চালু করা হয়:

```sh
echidna contract.sol
```

যদি contract.sol-এ একাধিক কন্ট্রাক্ট থাকে, তবে আপনি টার্গেট নির্দিষ্ট করতে পারেন:

```sh
echidna contract.sol --contract MyContract
```

টার্মিনালে রান করা হলে, একিডনা একটি ইন্টারেক্টিভ UI দেখায়। নিচের উদাহরণগুলোর মতো প্লেইন টেক্সট আউটপুট পেতে `--format text` যোগ করুন।

### সারসংক্ষেপ: একটি প্রপার্টি টেস্ট করা {#summary-testing-a-property}

নিচের অংশটি আমাদের উদাহরণে একিডনা রান করার সারসংক্ষেপ দেয়:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

একিডনা খুঁজে পেয়েছে যে `backdoor` কল করা হলে প্রপার্টিটি লঙ্ঘিত হয়।

## ফাজিং ক্যাম্পেইনের সময় কল করার জন্য ফাংশন ফিল্টার করা {#filtering-functions-to-call-during-a-fuzzing-campaign}

আমরা দেখব কীভাবে ফাজ করার জন্য ফাংশনগুলো ফিল্টার করতে হয়।
লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

এই ছোট উদাহরণটি একটি স্টেট ভেরিয়েবল পরিবর্তন করার জন্য একিডনাকে ট্রানজ্যাকশনের একটি নির্দিষ্ট সিকোয়েন্স খুঁজে বের করতে বাধ্য করে।
এটি একটি ফাজারের জন্য কঠিন।
আমরা এটি যাচাই করতে একিডনা রান করতে পারি:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### ফাংশন ফিল্টার করা {#filtering-functions}

এই কন্ট্রাক্টটি টেস্ট করার জন্য সঠিক সিকোয়েন্স খুঁজে পেতে একিডনার সমস্যা হয় কারণ দুটি রিসেট ফাংশন (`reset1` এবং `reset2`) সমস্ত স্টেট ভেরিয়েবলকে `false`-এ সেট করবে।
যাইহোক, আমরা রিসেট ফাংশনটিকে ব্ল্যাকলিস্ট করতে বা শুধুমাত্র `f`, `g`,
`h` এবং `i` ফাংশনগুলোকে হোয়াইটলিস্ট করতে একটি বিশেষ একিডনা ফিচার ব্যবহার করতে পারি।

ফাংশনগুলো ব্ল্যাকলিস্ট করতে, আমরা এই কনফিগারেশন ফাইলটি ব্যবহার করতে পারি:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

ফাংশন ফিল্টার করার আরেকটি পদ্ধতি হলো হোয়াইটলিস্ট করা ফাংশনগুলোর তালিকা করা। এটি করার জন্য, আমরা এই কনফিগারেশন ফাইলটি ব্যবহার করতে পারি:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- ডিফল্টভাবে `filterBlacklist` হলো `true`।
- সম্পূর্ণ ফাংশনের নামের ওপর ফিল্টারিং করা হয়: কন্ট্রাক্টের নাম, একটি `.` এবং অ্যাপ্লিকেশন বাইনারি ইন্টারফেস (এবিআই) স্বাক্ষর (উদাহরণস্বরূপ `C.f(uint256)`)। যদি আপনার কাছে `f()` এবং `f(uint256)` থাকে, তবে আপনি ঠিক কোনটি ফিল্টার করবেন তা বেছে নিতে পারেন। `"reset1"`-এর মতো একটি সাধারণ নাম কোনো কিছুর সাথেই মেলে না।

### একিডনা রান করা {#run-echidna-1}

একটি কনফিগারেশন ফাইল `blacklist.yaml` দিয়ে একিডনা রান করতে:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

একিডনা প্রায় সাথে সাথেই প্রপার্টিটিকে মিথ্যা প্রমাণ করার জন্য ট্রানজ্যাকশনের সিকোয়েন্স খুঁজে পাবে।

### সারসংক্ষেপ: ফাংশন ফিল্টার করা {#summary-filtering-functions}

একিডনা ফাজিং ক্যাম্পেইনের সময় কল করার জন্য ফাংশনগুলোকে ব্ল্যাকলিস্ট বা হোয়াইটলিস্ট করতে পারে, যা ব্যবহার করে:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

`filterBlacklist` বুলিয়ানের মান অনুযায়ী, একিডনা `C.f1()`, `C.f2()` এবং `C.f3()` ব্ল্যাকলিস্ট করে অথবা শুধুমাত্র এগুলোকে কল করে একটি ফাজিং ক্যাম্পেইন শুরু করে।

## একিডনা দিয়ে কীভাবে Solidity-এর অ্যাসার্ট টেস্ট করবেন {#how-to-test-soliditys-assert-with-echidna}

এই সংক্ষিপ্ত টিউটোরিয়ালে, আমরা দেখাব কীভাবে কন্ট্রাক্টে অ্যাসার্শন চেকিং টেস্ট করতে একিডনা ব্যবহার করতে হয়। ধরা যাক আমাদের কাছে এরকম একটি কন্ট্রাক্ট আছে:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Solidity 0.8 থেকে, পাটিগণিতের ওভারফ্লো ডিফল্টভাবে রিভার্ট হয়। `unchecked` ব্লকটি র‍্যাপিং আচরণ পুনরুদ্ধার করে যাতে `counter` ওভারফ্লো হতে পারে, যা হলো সেই বাগ যা আমরা চাই একিডনা খুঁজে বের করুক।

### একটি অ্যাসার্শন লেখা {#write-an-assertion}

আমরা নিশ্চিত করতে চাই যে এর পার্থক্য রিটার্ন করার পরে `tmp` যেন `counter`-এর চেয়ে কম বা সমান হয়। আমরা একটি
একিডনা প্রপার্টি লিখতে পারতাম, তবে আমাদের `tmp` মানটি কোথাও সংরক্ষণ করতে হবে। এর পরিবর্তে, আমরা এরকম একটি অ্যাসার্শন ব্যবহার করতে পারি:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### একিডনা রান করা {#run-echidna-2}

অ্যাসার্শন ফেইলিওর টেস্টিং সক্ষম করতে, কমান্ড লাইনে `--test-mode assertion` পাস করুন, অথবা একটি [একিডনা কনফিগারেশন ফাইল](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml` তৈরি করুন:

```yaml
testMode: assertion
```

যখন আমরা একিডনায় এই কন্ট্রাক্টটি রান করি, তখন আমরা প্রত্যাশিত ফলাফল পাই:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

যেমনটি আপনি দেখতে পাচ্ছেন, একিডনা `inc` ফাংশনে কিছু অ্যাসার্শন ফেইলিওর রিপোর্ট করে। প্রতি ফাংশনে একাধিক অ্যাসার্শন যোগ করা সম্ভব, তবে একিডনা বলতে পারে না কোন অ্যাসার্শনটি ব্যর্থ হয়েছে।

### কখন এবং কীভাবে অ্যাসার্শন ব্যবহার করবেন {#when-and-how-use-assertions}

অ্যাসার্শনগুলো এক্সপ্লিসিট প্রপার্টির বিকল্প হিসেবে ব্যবহার করা যেতে পারে, বিশেষ করে যদি চেক করার শর্তগুলো সরাসরি কোনো অপারেশন `f`-এর সঠিক ব্যবহারের সাথে সম্পর্কিত হয়। কিছু কোডের পরে অ্যাসার্শন যোগ করা নিশ্চিত করবে যে এটি এক্সিকিউট হওয়ার পরপরই চেক করা হবে:

```solidity
function f(..) public {
    // কিছু জটিল কোড
    ...
    assert (condition);
    ...
}

```

বিপরীতভাবে, একটি এক্সপ্লিসিট একিডনা প্রপার্টি ব্যবহার করলে তা র‍্যান্ডমভাবে ট্রানজ্যাকশন এক্সিকিউট করবে এবং এটি ঠিক কখন চেক করা হবে তা নিশ্চিত করার কোনো সহজ উপায় নেই। তারপরও এই ওয়ার্কঅ্যারাউন্ডটি করা সম্ভব:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

যাইহোক, কিছু সমস্যা রয়েছে:

- যদি `f`-কে `internal` বা `external` হিসেবে ডিক্লেয়ার করা হয় তবে এটি ব্যর্থ হয়।
- `f` কল করার জন্য কোন আর্গুমেন্টগুলো ব্যবহার করা উচিত তা অস্পষ্ট।
- যদি `f` রিভার্ট হয়, তবে প্রপার্টিটি ব্যর্থ হবে।

সাধারণভাবে, কীভাবে অ্যাসার্শন ব্যবহার করতে হয় সে সম্পর্কে আমরা [জন রেগারের (John Regehr) সুপারিশ](https://blog.regehr.org/archives/1091) অনুসরণ করার পরামর্শ দিই:

- অ্যাসার্শন চেকিংয়ের সময় কোনো সাইড ইফেক্ট জোরপূর্বক প্রয়োগ করবেন না। উদাহরণস্বরূপ: `assert(ChangeStateAndReturn() == 1)`
- সুস্পষ্ট স্টেটমেন্টগুলো অ্যাসার্ট করবেন না। উদাহরণস্বরূপ `assert(var >= 0)` যেখানে `var`-কে `uint` হিসেবে ডিক্লেয়ার করা হয়েছে।

পরিশেষে, অনুগ্রহ করে `assert`-এর পরিবর্তে `require` **ব্যবহার করবেন না**, কারণ একিডনা এটি শনাক্ত করতে পারবে না (তবে কন্ট্রাক্টটি যেকোনোভাবেই রিভার্ট হবে)।

### সারসংক্ষেপ: অ্যাসার্শন চেকিং {#summary-assertion-checking}

নিচের অংশটি আমাদের উদাহরণে একিডনা রান করার সারসংক্ষেপ দেয়:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

একিডনা খুঁজে পেয়েছে যে `inc`-এর অ্যাসার্শনটি ব্যর্থ হতে পারে যদি এই ফাংশনটিকে বড় আর্গুমেন্ট দিয়ে একাধিকবার কল করা হয়।

## একটি একিডনা কর্পাস সংগ্রহ এবং পরিবর্তন করা {#collecting-and-modifying-an-echidna-corpus}

আমরা দেখব কীভাবে একিডনার সাথে ট্রানজ্যাকশনের একটি কর্পাস সংগ্রহ এবং ব্যবহার করতে হয়। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

এই ছোট উদাহরণটি একটি স্টেট ভেরিয়েবল পরিবর্তন করার জন্য নির্দিষ্ট মান খুঁজে বের করতে একিডনাকে বাধ্য করে। এটি একটি ফাজারের জন্য কঠিন।
আমরা এটি যাচাই করতে একিডনা রান করতে পারি:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

যাইহোক, এই ফাজিং ক্যাম্পেইন রান করার সময় আমরা এখনও কর্পাস সংগ্রহ করতে একিডনা ব্যবহার করতে পারি।

### একটি কর্পাস সংগ্রহ করা {#collecting-a-corpus}

কর্পাস সংগ্রহ সক্ষম করতে, একটি কর্পাস ডিরেক্টরি তৈরি করুন:

```sh
mkdir corpus-magic
```

এবং একটি [একিডনা কনফিগারেশন ফাইল](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

এখন আমরা আমাদের টুলটি রান করতে পারি এবং সংগৃহীত কর্পাস চেক করতে পারি:

```sh
echidna magic.sol --config config.yaml
```

একিডনা এখনও সঠিক ম্যাজিক ভ্যালুগুলো খুঁজে পাচ্ছে না। এটি কোথায় আটকে যায় তা দেখতে, `corpus-magic/covered.*.txt` কভারেজ রিপোর্টটি দেখুন:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

`r` লেবেলটির অর্থ হলো একিডনা লাইনটিতে পৌঁছেছে কিন্তু এক্সিকিউশন সেখানে রিভার্ট হয়েছে এবং শেষ `require`-এর পরের লাইনগুলো কখনোই এক্সিকিউট হয়নি।

একিডনা যে ট্রানজ্যাকশন সিকোয়েন্সগুলো সংগ্রহ করেছে তা `corpus-magic/coverage/`-এ JSON ফাইল হিসেবে সংরক্ষিত আছে। উদাহরণস্বরূপ, এই ফাইলগুলোর একটির প্রথম ট্রানজ্যাকশনটি ছিল:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

স্পষ্টতই, এই ইনপুটটি আমাদের প্রপার্টিতে ফেইলিওর ট্রিগার করবে না। তবে, পরবর্তী ধাপে, আমরা দেখব কীভাবে এর জন্য এটিকে পরিবর্তন করতে হয়।

### একটি কর্পাস সিড করা {#seeding-a-corpus}

`magic` ফাংশনটি ডিল করার জন্য একিডনার কিছু সাহায্য প্রয়োজন। আমরা এর জন্য উপযুক্ত প্যারামিটার ব্যবহার করতে ইনপুটটি কপি এবং পরিবর্তন করতে যাচ্ছি
(ফাইলের নামগুলো র‍্যান্ডম, তাই আপনার নিজের `corpus-magic/coverage/` ডিরেক্টরি থেকে একটি ব্যবহার করুন):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

আমরা `new.txt` পরিবর্তন করব যাতে এতে `magic(42,129,333,0)` কল করা একটি একক ট্রানজ্যাকশন থাকে। এখন, আমরা একিডনা পুনরায় রান করতে পারি:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

এবার, এটি দেখতে পেয়েছে যে প্রপার্টিটি সাথে সাথেই লঙ্ঘিত হয়েছে।

## উচ্চ গ্যাস খরচসহ ট্রানজ্যাকশন খুঁজে বের করা {#finding-transactions-with-high-gas-consumption}

আমরা দেখব কীভাবে একিডনা দিয়ে উচ্চ গ্যাস খরচসহ ট্রানজ্যাকশনগুলো খুঁজে বের করতে হয়। একিডনার পুরোনো সংস্করণগুলোতে এর জন্য একটি `estimateGas` অপশন ছিল; এটি একিডনা 2.3.0-এ সরিয়ে দেওয়া হয়েছে। এর পরিবর্তে, আমরা `gasleft()` দিয়ে গ্যাস পরিমাপ করি এবং একিডনার [অপ্টিমাইজেশন মোড](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html)-কে এটি সর্বোচ্চ করতে দিই। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

এখানে `expensive`-এর একটি বড় গ্যাস খরচ থাকতে পারে।

### গ্যাস খরচ পরিমাপ করা {#measuring-gas-consumption}

অপ্টিমাইজেশন মোডে, একিডনা `echidna_` দিয়ে শুরু হওয়া ফাংশনগুলো খোঁজে যা কোনো আর্গুমেন্ট নেয় না এবং একটি `int256` রিটার্ন করে, এবং ট্রানজ্যাকশনের সেই সিকোয়েন্সটি খুঁজে বের করার চেষ্টা করে যা রিটার্ন করা মানকে সর্বোচ্চ করে। আমরা একটি টেস্ট কন্ট্রাক্ট যোগ করি যা `f` কল করে, এর ব্যবহৃত গ্যাস রেকর্ড করে এবং সর্বোচ্চ মানটি প্রকাশ করে (উভয় কন্ট্রাক্ট `gas.sol`-এ সেভ করুন):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

অপ্টিমাইজেশন মোড সক্ষম করতে, একটি কনফিগারেশন ফাইল `config.yaml` তৈরি করুন। এই উদাহরণে, ফলাফলগুলো সহজে বোঝার জন্য আমরা ট্রানজ্যাকশন সিকোয়েন্সের আকারও কমিয়ে দেব:

```yaml
testMode: optimization
seqLen: 2
```

### একিডনা রান করা {#run-echidna-3}

একবার কনফিগারেশন ফাইল তৈরি হয়ে গেলে, আমরা এভাবে একিডনা রান করতে পারি:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- প্রদর্শিত গ্যাসটি ইথেরিয়াম ভার্চুয়াল মেশিন (EVM) ইমপ্লিমেন্টেশন দ্বারা পরিমাপ করা হয় যার ওপর একিডনা রান করে, [hevm](https://github.com/argotorg/hevm), এবং এতে `measureF` থেকে ইন্টারনাল কলের ওভারহেড অন্তর্ভুক্ত থাকে।
- সর্বোচ্চ মানটি অনন্য নয়: প্রতিটি ক্যাম্পেইন র‍্যান্ডম হয় এবং দীর্ঘতর ক্যাম্পেইনগুলো (উদাহরণস্বরূপ `--test-limit 200000`) বড় মান খুঁজে পাওয়ার প্রবণতা রাখে।

### গ্যাস-হ্রাসকারী কলগুলো ফিল্টার করা {#filtering-out-gas-reducing-calls}

ওপরের **ফাজিং ক্যাম্পেইনের সময় কল করার জন্য ফাংশন ফিল্টার করা** টিউটোরিয়ালটি দেখায় কীভাবে
আপনার টেস্টিং থেকে কিছু ফাংশন সরিয়ে ফেলতে হয়।
একটি সঠিক গ্যাস এস্টিমেট পাওয়ার জন্য এটি অত্যন্ত গুরুত্বপূর্ণ হতে পারে।
নিচের উদাহরণটি বিবেচনা করুন:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` `check`-কে কল করে এবং এর গ্যাস খরচ রিটার্ন করে। প্রতিটি একিডনা টেস্ট ফাংশনের মতো, এর স্টেট পরিবর্তনগুলো পরে বাতিল করা হয়।

যদি একিডনা সমস্ত ফাংশন কল করতে পারে, তবে এটি সহজে উচ্চ গ্যাস খরচসহ ট্রানজ্যাকশনগুলো খুঁজে পাবে না:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

এর কারণ হলো খরচটি `addrs`-এর আকারের ওপর নির্ভর করে এবং র‍্যান্ডম কলগুলো অ্যারেকে প্রায় খালি রাখার প্রবণতা দেখায়।
যাইহোক, `pop` এবং `clear` ব্ল্যাকলিস্ট করা আমাদের অনেক ভালো ফলাফল দেয়:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

এই ফলাফলের জন্য কল সিকোয়েন্স ছোট করতে কয়েক মিনিট সময় লাগে, কারণ প্রতিটি রিপ্লে ব্যয়বহুল `check` ফাংশনকে কল করে।

### সারসংক্ষেপ: উচ্চ গ্যাস খরচসহ ট্রানজ্যাকশন খুঁজে বের করা {#summary-finding-transactions-with-high-gas-consumption}

একিডনা একটি `echidna_` ফাংশনে `gasleft()` দিয়ে গ্যাস পরিমাপ করে যা একটি `int256` রিটার্ন করে এবং অপ্টিমাইজেশন মোডে রান করে উচ্চ গ্যাস খরচসহ ট্রানজ্যাকশনগুলো খুঁজে পেতে পারে:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

ফাজিং ক্যাম্পেইন শেষ হয়ে গেলে, একিডনা পাওয়া সর্বোচ্চ মান এবং এটি তৈরি করা ট্রানজ্যাকশনের সিকোয়েন্স রিপোর্ট করবে।
