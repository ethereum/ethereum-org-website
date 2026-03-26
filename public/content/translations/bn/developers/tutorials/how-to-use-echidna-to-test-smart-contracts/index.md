---
title: "স্মার্ট কন্ট্রাক্ট টেস্ট করতে কীভাবে Echidna ব্যবহার করবেন"
description: "স্মার্ট কন্ট্রাক্ট স্বয়ংক্রিয়ভাবে টেস্ট করতে কীভাবে Echidna ব্যবহার করবেন"
author: "ট্রেইলঅফবিটস"
lang: bn
tags: ["Solidity", "স্মার্ট কন্ট্রাক্ট", "নিরাপত্তা", "টেস্টিং", "ফাজিং"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## ইনস্টলেশন {#installation}

Echidna ডকার (docker) এর মাধ্যমে বা প্রি-কম্পাইল করা বাইনারি ব্যবহার করে ইনস্টল করা যেতে পারে।

### ডকারের মাধ্যমে Echidna {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_শেষ কমান্ডটি eth-security-toolbox-কে এমন একটি ডকারে রান করে যার আপনার বর্তমান ডিরেক্টরিতে অ্যাক্সেস রয়েছে। আপনি আপনার হোস্ট থেকে ফাইলগুলো পরিবর্তন করতে পারেন এবং ডকার থেকে ফাইলগুলোর ওপর টুলগুলো রান করতে পারেন।_

ডকারের ভেতরে রান করুন:

```bash
solc-select 0.5.11
cd /home/training
```

### বাইনারি {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## প্রপার্টি-ভিত্তিক ফাজিং (fuzzing) পরিচিতি {#introduction-to-property-based-fuzzing}

Echidna হলো একটি প্রপার্টি-ভিত্তিক ফাজার, যা আমরা আমাদের আগের ব্লগপোস্টগুলোতে বর্ণনা করেছি ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/))।

### ফাজিং {#fuzzing}

[ফাজিং](https://wikipedia.org/wiki/Fuzzing) হলো নিরাপত্তা কমিউনিটিতে একটি সুপরিচিত কৌশল। প্রোগ্রামে বাগ (bug) খুঁজে বের করার জন্য কমবেশি র‍্যান্ডম ইনপুট তৈরি করা এর কাজ। প্রথাগত সফটওয়্যারের জন্য ফাজারগুলো (যেমন [AFL](http://lcamtuf.coredump.cx/afl/) বা [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) বাগ খুঁজে বের করার কার্যকর টুল হিসেবে পরিচিত।

সম্পূর্ণ র‍্যান্ডম ইনপুট তৈরির বাইরেও, ভালো ইনপুট তৈরি করার জন্য অনেক কৌশল এবং পদ্ধতি রয়েছে, যার মধ্যে অন্তর্ভুক্ত:

- প্রতিটি এক্সিকিউশন থেকে ফিডব্যাক নেওয়া এবং এটি ব্যবহার করে জেনারেশন গাইড করা। উদাহরণস্বরূপ, যদি একটি নতুন তৈরি করা ইনপুট নতুন কোনো পাথ (path) আবিষ্কার করতে সাহায্য করে, তবে এর কাছাকাছি নতুন ইনপুট তৈরি করা যৌক্তিক হতে পারে।
- কাঠামোগত সীমাবদ্ধতা মেনে ইনপুট তৈরি করা। উদাহরণস্বরূপ, যদি আপনার ইনপুটে চেকসাম (checksum) সহ একটি হেডার থাকে, তবে ফাজারকে চেকসাম যাচাই করার মতো ইনপুট তৈরি করতে দেওয়া যৌক্তিক হবে।
- নতুন ইনপুট তৈরি করতে পরিচিত ইনপুট ব্যবহার করা: যদি আপনার কাছে বৈধ ইনপুটের একটি বড় ডেটাসেট থাকে, তবে আপনার ফাজার শূন্য থেকে শুরু করার পরিবর্তে সেগুলো থেকে নতুন ইনপুট তৈরি করতে পারে। এগুলোকে সাধারণত _সীড (seeds)_ বলা হয়।

### প্রপার্টি-ভিত্তিক ফাজিং {#property-based-fuzzing}

Echidna ফাজারের একটি নির্দিষ্ট পরিবারের অন্তর্গত: প্রপার্টি-ভিত্তিক ফাজিং যা [QuickCheck](https://wikipedia.org/wiki/QuickCheck) দ্বারা ব্যাপকভাবে অনুপ্রাণিত। ক্লাসিক ফাজারের বিপরীতে যা ক্র্যাশ খুঁজে বের করার চেষ্টা করে, Echidna ব্যবহারকারী-নির্ধারিত ইনভ্যারিয়েন্টগুলো (invariants) ভাঙার চেষ্টা করবে।

স্মার্ট কন্ট্রাক্ট-এ, ইনভ্যারিয়েন্টগুলো হলো Solidity ফাংশন, যা কন্ট্রাক্ট পৌঁছাতে পারে এমন যেকোনো ভুল বা অবৈধ স্টেট (state) উপস্থাপন করতে পারে, যার মধ্যে রয়েছে:

- ভুল অ্যাক্সেস কন্ট্রোল: আক্রমণকারী কন্ট্রাক্টের মালিক হয়ে গেছে।
- ভুল স্টেট মেশিন: কন্ট্রাক্ট পজ (pause) থাকা অবস্থায় টোকেন ট্রান্সফার করা যেতে পারে।
- ভুল পাটিগণিত: ব্যবহারকারী তার ব্যালেন্স আন্ডারফ্লো (underflow) করতে পারে এবং আনলিমিটেড ফ্রি টোকেন পেতে পারে।

### Echidna দিয়ে একটি প্রপার্টি টেস্ট করা {#testing-a-property-with-echidna}

আমরা দেখব কীভাবে Echidna দিয়ে একটি স্মার্ট কন্ট্রাক্ট টেস্ট করতে হয়। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

আমরা ধরে নেব যে এই টোকেনের নিচের প্রপার্টিগুলো থাকতে হবে:

- যেকোনো ব্যক্তির কাছে সর্বোচ্চ 1000 টোকেন থাকতে পারে
- টোকেনটি ট্রান্সফার করা যাবে না (এটি কোনো ERC-20 টোকেন নয়)

### একটি প্রপার্টি লেখা {#write-a-property}

Echidna প্রপার্টিগুলো হলো Solidity ফাংশন। একটি প্রপার্টিতে অবশ্যই:

- কোনো আর্গুমেন্ট থাকা যাবে না
- সফল হলে `true` রিটার্ন করতে হবে
- এর নাম `echidna` দিয়ে শুরু হতে হবে

Echidna যা করবে:

- প্রপার্টি টেস্ট করার জন্য স্বয়ংক্রিয়ভাবে আরবিট্রারি লেনদেন তৈরি করবে।
- কোনো লেনদেন যদি প্রপার্টিকে `false` রিটার্ন করায় বা এরর (error) থ্রো করে, তবে তা রিপোর্ট করবে।
- প্রপার্টি কল করার সময় সাইড-ইফেক্ট বাতিল করবে (অর্থাৎ, যদি প্রপার্টি কোনো স্টেট ভেরিয়েবল পরিবর্তন করে, তবে টেস্টের পরে তা বাতিল করা হয়)

নিচের প্রপার্টিটি চেক করে যে কলারের কাছে 1000-এর বেশি টোকেন নেই:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

আপনার কন্ট্রাক্টকে প্রপার্টিগুলো থেকে আলাদা করতে ইনহেরিটেন্স (inheritance) ব্যবহার করুন:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) প্রপার্টিটি ইমপ্লিমেন্ট করে এবং টোকেন থেকে ইনহেরিট করে।

### একটি কন্ট্রাক্ট ইনিশিয়েট করা {#initiate-a-contract}

Echidna-এর জন্য আর্গুমেন্ট ছাড়া একটি [কনস্ট্রাক্টর](/developers/docs/smart-contracts/anatomy/#constructor-functions) প্রয়োজন। যদি আপনার কন্ট্রাক্টে নির্দিষ্ট কোনো ইনিশিয়ালাইজেশনের প্রয়োজন হয়, তবে আপনাকে তা কনস্ট্রাক্টরে করতে হবে।

Echidna-তে কিছু নির্দিষ্ট এডড্রেস রয়েছে:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72` যা কনস্ট্রাক্টরকে কল করে।
- `0x10000`, `0x20000`, এবং `0x00a329C0648769a73afAC7F9381e08fb43DBEA70` যা র‍্যান্ডমভাবে অন্যান্য ফাংশনগুলোকে কল করে।

আমাদের বর্তমান উদাহরণে কোনো নির্দিষ্ট ইনিশিয়ালাইজেশনের প্রয়োজন নেই, যার ফলে আমাদের কনস্ট্রাক্টরটি ফাঁকা।

### Echidna রান করা {#run-echidna}

Echidna চালু করা হয় এভাবে:

```bash
echidna-test contract.sol
```

যদি contract.sol-এ একাধিক কন্ট্রাক্ট থাকে, তবে আপনি টার্গেট নির্দিষ্ট করতে পারেন:

```bash
echidna-test contract.sol --contract MyContract
```

### সারসংক্ষেপ: একটি প্রপার্টি টেস্ট করা {#summary-testing-a-property}

নিচে আমাদের উদাহরণে echidna রান করার সারসংক্ষেপ দেওয়া হলো:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna দেখতে পেয়েছে যে `backdoor` কল করা হলে প্রপার্টিটি লঙ্ঘিত হয়।

## ফাজিং ক্যাম্পেইনের সময় কল করার জন্য ফাংশন ফিল্টার করা {#filtering-functions-to-call-during-a-fuzzing-campaign}

আমরা দেখব কীভাবে ফাজ (fuzz) করার জন্য ফাংশনগুলো ফিল্টার করতে হয়।
লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

এই ছোট উদাহরণটি Echidna-কে একটি স্টেট ভেরিয়েবল পরিবর্তন করার জন্য লেনদেনের একটি নির্দিষ্ট সিকোয়েন্স খুঁজে বের করতে বাধ্য করে।
এটি একটি ফাজারের জন্য কঠিন (এর জন্য [Manticore](https://github.com/trailofbits/manticore)-এর মতো একটি সিম্বলিক এক্সিকিউশন টুল ব্যবহার করার পরামর্শ দেওয়া হয়)।
এটি যাচাই করার জন্য আমরা Echidna রান করতে পারি:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### ফাংশন ফিল্টার করা {#filtering-functions}

এই কন্ট্রাক্টটি টেস্ট করার জন্য সঠিক সিকোয়েন্স খুঁজে পেতে Echidna-র সমস্যা হয় কারণ দুটি রিসেট ফাংশন (`reset1` এবং `reset2`) সমস্ত স্টেট ভেরিয়েবলকে `false`-এ সেট করে দেবে।
যাইহোক, আমরা রিসেট ফাংশনটিকে ব্ল্যাকলিস্ট করতে বা শুধুমাত্র `f`, `g`,
`h` এবং `i` ফাংশনগুলোকে হোয়াইটলিস্ট করতে একটি বিশেষ Echidna ফিচার ব্যবহার করতে পারি।

ফাংশন ব্ল্যাকলিস্ট করতে, আমরা এই কনফিগারেশন ফাইলটি ব্যবহার করতে পারি:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

ফাংশন ফিল্টার করার আরেকটি পদ্ধতি হলো হোয়াইটলিস্ট করা ফাংশনগুলোর তালিকা করা। এটি করার জন্য, আমরা এই কনফিগারেশন ফাইলটি ব্যবহার করতে পারি:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` ডিফল্টভাবে `true` থাকে।
- ফিল্টারিং শুধুমাত্র নাম দিয়ে করা হবে (প্যারামিটার ছাড়া)। যদি আপনার `f()` এবং `f(uint256)` থাকে, তবে `"f"` ফিল্টারটি উভয় ফাংশনের সাথেই মিলবে।

### Echidna রান করা {#run-echidna-1}

একটি কনফিগারেশন ফাইল `blacklist.yaml` দিয়ে Echidna রান করতে:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna প্রায় সাথে সাথেই প্রপার্টিটিকে ভুল প্রমাণ করার জন্য লেনদেনের সিকোয়েন্স খুঁজে পাবে।

### সারসংক্ষেপ: ফাংশন ফিল্টার করা {#summary-filtering-functions}

Echidna ফাজিং ক্যাম্পেইনের সময় কল করার জন্য ফাংশনগুলোকে ব্ল্যাকলিস্ট বা হোয়াইটলিস্ট করতে পারে, যা ব্যবহার করে:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna `filterBlacklist` বুলিয়ানের মানের ওপর ভিত্তি করে `f1`, `f2` এবং `f3` ব্ল্যাকলিস্ট করে অথবা শুধুমাত্র এগুলোকে কল করে একটি ফাজিং ক্যাম্পেইন শুরু করে।

## Echidna দিয়ে Solidity-এর assert কীভাবে টেস্ট করবেন {#how-to-test-soliditys-assert-with-echidna}

এই সংক্ষিপ্ত টিউটোরিয়ালে, আমরা দেখাব কীভাবে কন্ট্রাক্টে অ্যাসারশন (assertion) চেকিং টেস্ট করতে Echidna ব্যবহার করতে হয়। ধরুন আমাদের কাছে এরকম একটি কন্ট্রাক্ট আছে:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### একটি অ্যাসারশন লেখা {#write-an-assertion}

আমরা নিশ্চিত করতে চাই যে এর পার্থক্য রিটার্ন করার পরে `tmp` যেন `counter`-এর চেয়ে কম বা সমান হয়। আমরা একটি Echidna প্রপার্টি লিখতে পারতাম, কিন্তু আমাদের `tmp` মানটি কোথাও স্টোর করতে হবে। এর পরিবর্তে, আমরা এরকম একটি অ্যাসারশন ব্যবহার করতে পারি:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Echidna রান করা {#run-echidna-2}

অ্যাসারশন ফেইলিওর টেস্টিং চালু করতে, একটি [Echidna কনফিগারেশন ফাইল](https://github.com/crytic/echidna/wiki/Config) `config.yaml` তৈরি করুন:

```yaml
checkAsserts: true
```

যখন আমরা Echidna-তে এই কন্ট্রাক্টটি রান করি, তখন আমরা প্রত্যাশিত ফলাফল পাই:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

যেমনটি আপনি দেখতে পাচ্ছেন, Echidna `inc` ফাংশনে কিছু অ্যাসারশন ফেইলিওর রিপোর্ট করে। প্রতি ফাংশনে একাধিক অ্যাসারশন যোগ করা সম্ভব, তবে কোন অ্যাসারশনটি ব্যর্থ হয়েছে তা Echidna বলতে পারে না।

### কখন এবং কীভাবে অ্যাসারশন ব্যবহার করবেন {#when-and-how-use-assertions}

অ্যাসারশনগুলো এক্সপ্লিসিট প্রপার্টির বিকল্প হিসেবে ব্যবহার করা যেতে পারে, বিশেষ করে যদি চেক করার শর্তগুলো সরাসরি কোনো অপারেশন `f`-এর সঠিক ব্যবহারের সাথে সম্পর্কিত হয়। কিছু কোডের পরে অ্যাসারশন যোগ করলে তা নিশ্চিত করবে যে এটি এক্সিকিউট হওয়ার পরপরই চেক করা হবে:

```solidity
function f(..) public {
    // কিছু জটিল কোড
    ...
    assert (condition);
    ...
}

```

বিপরীতভাবে, একটি এক্সপ্লিসিট echidna প্রপার্টি ব্যবহার করলে তা র‍্যান্ডমভাবে লেনদেন এক্সিকিউট করবে এবং এটি ঠিক কখন চেক করা হবে তা নিশ্চিত করার কোনো সহজ উপায় নেই। তবে এই ওয়ার্কঅ্যারাউন্ডটি করা এখনও সম্ভব:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

যাইহোক, কিছু সমস্যা রয়েছে:

- যদি `f`-কে `internal` বা `external` হিসেবে ডিক্লেয়ার করা হয় তবে এটি ব্যর্থ হয়।
- `f` কল করার জন্য কোন আর্গুমেন্টগুলো ব্যবহার করা উচিত তা অস্পষ্ট।
- যদি `f` রিভার্ট (revert) করে, তবে প্রপার্টিটি ব্যর্থ হবে।

সাধারণভাবে, আমরা অ্যাসারশন কীভাবে ব্যবহার করতে হয় সে সম্পর্কে [জন রেগেহরের সুপারিশ](https://blog.regehr.org/archives/1091) অনুসরণ করার পরামর্শ দিই:

- অ্যাসারশন চেকিংয়ের সময় কোনো সাইড ইফেক্ট জোর করে প্রয়োগ করবেন না। উদাহরণস্বরূপ: `assert(ChangeStateAndReturn() == 1)`
- সুস্পষ্ট স্টেটমেন্ট অ্যাসার্ট করবেন না। উদাহরণস্বরূপ `assert(var >= 0)` যেখানে `var`-কে `uint` হিসেবে ডিক্লেয়ার করা হয়েছে।

পরিশেষে, অনুগ্রহ করে `assert`-এর পরিবর্তে `require` **ব্যবহার করবেন না**, কারণ Echidna এটি শনাক্ত করতে পারবে না (তবে কন্ট্রাক্টটি যেভাবেই হোক রিভার্ট করবে)।

### সারসংক্ষেপ: অ্যাসারশন চেকিং {#summary-assertion-checking}

নিচে আমাদের উদাহরণে echidna রান করার সারসংক্ষেপ দেওয়া হলো:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna দেখতে পেয়েছে যে `inc`-এর অ্যাসারশনটি ব্যর্থ হতে পারে যদি এই ফাংশনটি বড় আর্গুমেন্ট দিয়ে একাধিকবার কল করা হয়।

## একটি Echidna কর্পাস (corpus) সংগ্রহ এবং পরিবর্তন করা {#collecting-and-modifying-an-echidna-corpus}

আমরা দেখব কীভাবে Echidna দিয়ে লেনদেনের একটি কর্পাস সংগ্রহ এবং ব্যবহার করতে হয়। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

এই ছোট উদাহরণটি Echidna-কে একটি স্টেট ভেরিয়েবল পরিবর্তন করার জন্য নির্দিষ্ট মান খুঁজে বের করতে বাধ্য করে। এটি একটি ফাজারের জন্য কঠিন
(এর জন্য [Manticore](https://github.com/trailofbits/manticore)-এর মতো একটি সিম্বলিক এক্সিকিউশন টুল ব্যবহার করার পরামর্শ দেওয়া হয়)।
এটি যাচাই করার জন্য আমরা Echidna রান করতে পারি:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

যাইহোক, এই ফাজিং ক্যাম্পেইন রান করার সময় আমরা এখনও কর্পাস সংগ্রহ করতে Echidna ব্যবহার করতে পারি।

### একটি কর্পাস সংগ্রহ করা {#collecting-a-corpus}

কর্পাস সংগ্রহ চালু করতে, একটি কর্পাস ডিরেক্টরি তৈরি করুন:

```bash
mkdir corpus-magic
```

এবং একটি [Echidna কনফিগারেশন ফাইল](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

এখন আমরা আমাদের টুলটি রান করতে পারি এবং সংগৃহীত কর্পাস চেক করতে পারি:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna এখনও সঠিক ম্যাজিক মানগুলো খুঁজে পাচ্ছে না, তবে আমরা এর সংগৃহীত কর্পাসটি দেখতে পারি।
উদাহরণস্বরূপ, এই ফাইলগুলোর মধ্যে একটি ছিল:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

স্পষ্টতই, এই ইনপুটটি আমাদের প্রপার্টিতে ফেইলিওর ট্রিগার করবে না। যাইহোক, পরবর্তী ধাপে, আমরা দেখব কীভাবে এর জন্য এটিকে পরিবর্তন করতে হয়।

### একটি কর্পাস সীডিং (seeding) করা {#seeding-a-corpus}

`magic` ফাংশনটি নিয়ে কাজ করার জন্য Echidna-র কিছু সাহায্য প্রয়োজন। আমরা এর জন্য উপযুক্ত
প্যারামিটার ব্যবহার করতে ইনপুটটি কপি এবং পরিবর্তন করতে যাচ্ছি:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

আমরা `magic(42,129,333,0)` কল করার জন্য `new.txt` পরিবর্তন করব। এখন, আমরা Echidna পুনরায় রান করতে পারি:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537

```

এবার, এটি দেখতে পেয়েছে যে প্রপার্টিটি সাথে সাথেই লঙ্ঘিত হয়েছে।

## উচ্চ গ্যাস (gas) খরচ সহ লেনদেন খুঁজে বের করা {#finding-transactions-with-high-gas-consumption}

আমরা দেখব কীভাবে Echidna দিয়ে উচ্চ গ্যাস খরচ সহ লেনদেন খুঁজে বের করতে হয়। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

এখানে `expensive`-এর একটি বড় গ্যাস খরচ থাকতে পারে।

বর্তমানে, Echidna-র টেস্ট করার জন্য সবসময় একটি প্রপার্টি প্রয়োজন হয়: এখানে `echidna_test` সবসময় `true` রিটার্ন করে।
এটি যাচাই করার জন্য আমরা Echidna রান করতে পারি:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### গ্যাস খরচ পরিমাপ করা {#measuring-gas-consumption}

Echidna দিয়ে গ্যাস খরচ পরিমাপ চালু করতে, একটি কনফিগারেশন ফাইল `config.yaml` তৈরি করুন:

```yaml
estimateGas: true
```

এই উদাহরণে, ফলাফলগুলো সহজে বোঝার জন্য আমরা লেনদেনের সিকোয়েন্সের আকারও কমিয়ে দেব:

```yaml
seqLen: 2
estimateGas: true
```

### Echidna রান করা {#run-echidna-3}

একবার কনফিগারেশন ফাইল তৈরি হয়ে গেলে, আমরা এভাবে Echidna রান করতে পারি:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325

```

- দেখানো গ্যাস হলো [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-) দ্বারা প্রদত্ত একটি অনুমান।

### গ্যাস-হ্রাসকারী কলগুলো ফিল্টার করা {#filtering-out-gas-reducing-calls}

ওপরের **ফাজিং ক্যাম্পেইনের সময় কল করার জন্য ফাংশন ফিল্টার করা** টিউটোরিয়ালটি দেখায় কীভাবে
আপনার টেস্টিং থেকে কিছু ফাংশন সরিয়ে ফেলতে হয়।  
একটি সঠিক গ্যাস অনুমান পাওয়ার জন্য এটি অত্যন্ত গুরুত্বপূর্ণ হতে পারে।
নিচের উদাহরণটি বিবেচনা করুন:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

যদি Echidna সমস্ত ফাংশন কল করতে পারে, তবে এটি সহজে উচ্চ গ্যাস খরচ সহ লেনদেন খুঁজে পাবে না:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

এর কারণ হলো খরচটি `addrs`-এর আকারের ওপর নির্ভর করে এবং র‍্যান্ডম কলগুলো অ্যারেকে (array) প্রায় ফাঁকা রাখার প্রবণতা দেখায়।
যাইহোক, `pop` এবং `clear` ব্ল্যাকলিস্ট করা আমাদের অনেক ভালো ফলাফল দেয়:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### সারসংক্ষেপ: উচ্চ গ্যাস খরচ সহ লেনদেন খুঁজে বের করা {#summary-finding-transactions-with-high-gas-consumption}

Echidna `estimateGas` কনফিগারেশন অপশন ব্যবহার করে উচ্চ গ্যাস খরচ সহ লেনদেন খুঁজে পেতে পারে:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

ফাজিং ক্যাম্পেইন শেষ হওয়ার পরে, Echidna প্রতিটি ফাংশনের জন্য সর্বোচ্চ গ্যাস খরচ সহ একটি সিকোয়েন্স রিপোর্ট করবে।