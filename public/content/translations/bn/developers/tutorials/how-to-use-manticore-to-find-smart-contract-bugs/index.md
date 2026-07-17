---
title: "স্মার্ট কন্ট্রাক্টে বাগ খুঁজতে কীভাবে ম্যান্টিকোর ব্যবহার করবেন"
description: "স্মার্ট কন্ট্রাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজতে কীভাবে ম্যান্টিকোর ব্যবহার করবেন"
author: "ট্রেইলঅফবিটস"
lang: bn
tags:
  ["Solidity", "স্মার্ট কন্ট্রাক্ট", "নিরাপত্তা", "টেস্টিং", "ফর্মাল ভেরিফিকেশন"]
skill: advanced
breadcrumb: "ম্যান্টিকোর"
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

এই টিউটোরিয়ালের উদ্দেশ্য হলো স্মার্ট কন্ট্রাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজতে কীভাবে ম্যান্টিকোর ব্যবহার করতে হয় তা দেখানো।

## ইনস্টলেশন {#installation}

ম্যান্টিকোর-এর জন্য >= Python 3.6 প্রয়োজন। এটি pip-এর মাধ্যমে বা Docker ব্যবহার করে ইনস্টল করা যেতে পারে।

### Docker-এর মাধ্যমে ম্যান্টিকোর {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_শেষ কমান্ডটি একটি Docker-এ eth-security-toolbox চালায় যার আপনার বর্তমান ডিরেক্টরিতে অ্যাক্সেস রয়েছে। আপনি আপনার হোস্ট থেকে ফাইলগুলো পরিবর্তন করতে পারেন এবং Docker থেকে ফাইলগুলোর উপর টুলগুলো চালাতে পারেন_

Docker-এর ভিতরে, রান করুন:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip-এর মাধ্যমে ম্যান্টিকোর {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 সুপারিশ করা হয়।

### স্ক্রিপ্ট রান করা {#running-a-script}

Python 3 দিয়ে একটি Python স্ক্রিপ্ট রান করতে:

```bash
python3 script.py
```

## ডায়নামিক সিম্বলিক এক্সিকিউশনের পরিচিতি {#introduction-to-dynamic-symbolic-execution}

### সংক্ষেপে ডায়নামিক সিম্বলিক এক্সিকিউশন {#dynamic-symbolic-execution-in-a-nutshell}

ডায়নামিক সিম্বলিক এক্সিকিউশন (DSE) হলো একটি প্রোগ্রাম বিশ্লেষণ কৌশল যা উচ্চ মাত্রার শব্দার্থিক সচেতনতার সাথে একটি স্টেট স্পেস অন্বেষণ করে। এই কৌশলটি "প্রোগ্রাম পাথ"-এর ডিসকভারি-র উপর ভিত্তি করে তৈরি, যা `path predicates` নামক গাণিতিক সূত্র হিসেবে উপস্থাপিত হয়। ধারণাগতভাবে, এই কৌশলটি দুটি ধাপে পাথ প্রেডিকেটগুলোর উপর কাজ করে:

1. এগুলো প্রোগ্রামের ইনপুটের উপর সীমাবদ্ধতা (constraints) ব্যবহার করে তৈরি করা হয়।
2. এগুলো এমন প্রোগ্রাম ইনপুট তৈরি করতে ব্যবহৃত হয় যা সংশ্লিষ্ট পাথগুলোকে এক্সিকিউট করবে।

এই পদ্ধতিটি কোনো ফলস পজিটিভ তৈরি করে না, কারণ সমস্ত চিহ্নিত প্রোগ্রাম স্টেটগুলো কংক্রিট এক্সিকিউশনের সময় ট্রিগার করা যেতে পারে। উদাহরণস্বরূপ, যদি বিশ্লেষণে কোনো ইন্টিজার ওভারফ্লো পাওয়া যায়, তবে এটি পুনরুৎপাদনযোগ্য হওয়ার নিশ্চয়তা থাকে।

### পাথ প্রেডিকেটের উদাহরণ {#path-predicate-example}

DSE কীভাবে কাজ করে তার একটি ধারণা পেতে, নিচের উদাহরণটি বিবেচনা করুন:

```solidity
function f(uint a){

  if (a == 65) {
      // একটি বাগ উপস্থিত আছে
  }

}
```

যেহেতু `f()`-এ দুটি পাথ রয়েছে, তাই একটি DSE দুটি ভিন্ন পাথ প্রেডিকেট তৈরি করবে:

- পাথ 1: `a == 65`
- পাথ 2: `Not (a == 65)`

প্রতিটি পাথ প্রেডিকেট হলো একটি গাণিতিক সূত্র যা একটি তথাকথিত [SMT সমাধানকারী](https://wikipedia.org/wiki/Satisfiability_modulo_theories)-কে দেওয়া যেতে পারে, যা সমীকরণটি সমাধান করার চেষ্টা করবে। `Path 1`-এর জন্য, সমাধানকারী বলবে যে পাথটি `a = 65` দিয়ে অন্বেষণ করা যেতে পারে। `Path 2`-এর জন্য, সমাধানকারী `a`-কে 65 ছাড়া অন্য যেকোনো মান দিতে পারে, উদাহরণস্বরূপ `a = 0`।

### প্রপার্টি যাচাই করা {#verifying-properties}

ম্যান্টিকোর প্রতিটি পাথের সমস্ত এক্সিকিউশনের উপর সম্পূর্ণ নিয়ন্ত্রণ প্রদান করে। ফলস্বরূপ, এটি আপনাকে প্রায় যেকোনো কিছুর উপর ইচ্ছামতো সীমাবদ্ধতা যোগ করার অনুমতি দেয়। এই নিয়ন্ত্রণটি কন্ট্রাক্টে প্রপার্টি তৈরি করার সুযোগ দেয়।

নিচের উদাহরণটি বিবেচনা করুন:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // কোনো ওভারফ্লো সুরক্ষা নেই
  return c;
}
```

এখানে ফাংশনটিতে অন্বেষণ করার জন্য কেবল একটি পাথ রয়েছে:

- পাথ 1: `c = a + b`

ম্যান্টিকোর ব্যবহার করে, আপনি ওভারফ্লো পরীক্ষা করতে পারেন এবং পাথ প্রেডিকেটে সীমাবদ্ধতা যোগ করতে পারেন:

- `c = a + b AND (c < a OR c < b)`

যদি `a` এবং `b`-এর এমন কোনো মান খুঁজে পাওয়া সম্ভব হয় যার জন্য উপরের পাথ প্রেডিকেটটি কার্যকর, তার মানে হলো আপনি একটি ওভারফ্লো খুঁজে পেয়েছেন। উদাহরণস্বরূপ, সমাধানকারী `a = 10 , b = MAXUINT256` ইনপুট তৈরি করতে পারে।

যদি আপনি একটি সংশোধিত সংস্করণ বিবেচনা করেন:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ওভারফ্লো চেক সহ সংশ্লিষ্ট সূত্রটি হবে:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

এই সূত্রটি সমাধান করা যাবে না; অন্য কথায় এটি একটি **প্রমাণ** যে `safe_add`-এ, `c` সর্বদা বৃদ্ধি পাবে।

DSE তাই একটি শক্তিশালী টুল, যা আপনার কোডের উপর ইচ্ছামতো সীমাবদ্ধতা যাচাই করতে পারে।

## ম্যান্টিকোরের অধীনে রান করা {#running-under-manticore}

আমরা দেখব কীভাবে ম্যান্টিকোর API দিয়ে একটি স্মার্ট কন্ট্রাক্ট অন্বেষণ করতে হয়। লক্ষ্য হলো নিচের স্মার্ট কন্ট্রাক্টটি [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### একটি স্ট্যান্ডঅ্যালোন অন্বেষণ রান করা {#run-a-standalone-exploration}

আপনি নিচের কমান্ডের মাধ্যমে সরাসরি স্মার্ট কন্ট্রাক্টে ম্যান্টিকোর রান করতে পারেন (`project` একটি Solidity ফাইল বা একটি প্রজেক্ট ডিরেক্টরি হতে পারে):

```bash
$ manticore project
```

আপনি এর মতো টেস্টকেসগুলোর আউটপুট পাবেন (ক্রম পরিবর্তন হতে পারে):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

অতিরিক্ত তথ্য ছাড়া, ম্যান্টিকোর নতুন সিম্বলিক ট্রানজ্যাকশন দিয়ে কন্ট্রাক্টটি অন্বেষণ করবে যতক্ষণ না এটি কন্ট্রাক্টে নতুন পাথ অন্বেষণ করা বন্ধ করে। ম্যান্টিকোর কোনো ব্যর্থ ট্রানজ্যাকশনের পরে (যেমন: একটি রিভার্ট-এর পরে) নতুন ট্রানজ্যাকশন চালায় না।

ম্যান্টিকোর একটি `mcore_*` ডিরেক্টরিতে তথ্য আউটপুট করবে। অন্যান্য জিনিসের মধ্যে, আপনি এই ডিরেক্টরিতে পাবেন:

- `global.summary`: কভারেজ এবং কম্পাইলার সতর্কতা
- `test_XXXXX.summary`: কভারেজ, শেষ নির্দেশাবলী, প্রতিটি টেস্ট কেসের জন্য অ্যাকাউন্ট ব্যালেন্স
- `test_XXXXX.tx`: প্রতিটি টেস্ট কেসের জন্য ট্রানজ্যাকশনের বিস্তারিত তালিকা

এখানে ম্যান্টিকোর 7টি টেস্ট কেস খুঁজে পেয়েছে, যা এর সাথে মিলে যায় (ফাইলের নামের ক্রম পরিবর্তন হতে পারে):

|                      |   ট্রানজ্যাকশন 0   |   ট্রানজ্যাকশন 1   | ট্রানজ্যাকশন 2     | ফলাফল |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | কন্ট্রাক্ট তৈরি |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | কন্ট্রাক্ট তৈরি | ফলব্যাক ফাংশন |                   | REVERT |
| **test_00000002.tx** | কন্ট্রাক্ট তৈরি |                   |                   | RETURN |
| **test_00000003.tx** | কন্ট্রাক্ট তৈরি |       f(65)       |                   | REVERT |
| **test_00000004.tx** | কন্ট্রাক্ট তৈরি |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | কন্ট্রাক্ট তৈরি |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | কন্ট্রাক্ট তৈরি |      f(!=65)      | ফলব্যাক ফাংশন | REVERT |

_অন্বেষণের সারাংশ f(!=65) নির্দেশ করে যে f-কে 65 ছাড়া অন্য যেকোনো মান দিয়ে কল করা হয়েছে।_

যেমনটি আপনি লক্ষ্য করতে পারেন, ম্যান্টিকোর প্রতিটি সফল বা রিভার্ট হওয়া ট্রানজ্যাকশনের জন্য একটি অনন্য টেস্ট কেস তৈরি করে।

আপনি যদি দ্রুত কোড অন্বেষণ চান তবে `--quick-mode` ফ্ল্যাগটি ব্যবহার করুন (এটি বাগ ডিটেক্টর, গ্যাস গণনা ইত্যাদি নিষ্ক্রিয় করে)

### API-এর মাধ্যমে একটি স্মার্ট কন্ট্রাক্ট ম্যানিপুলেট করা {#manipulate-a-smart-contract-through-the-api}

এই বিভাগে ম্যান্টিকোর Python API-এর মাধ্যমে কীভাবে একটি স্মার্ট কন্ট্রাক্ট ম্যানিপুলেট করতে হয় তার বিস্তারিত বর্ণনা করা হয়েছে। আপনি Python এক্সটেনশন `*.py` দিয়ে নতুন ফাইল তৈরি করতে পারেন এবং এই ফাইলে API কমান্ডগুলো (যার মূল বিষয়গুলো নিচে বর্ণনা করা হবে) যোগ করে প্রয়োজনীয় কোড লিখতে পারেন এবং তারপর `$ python3 *.py` কমান্ড দিয়ে এটি রান করতে পারেন। এছাড়াও আপনি নিচের কমান্ডগুলো সরাসরি Python কনসোলে এক্সিকিউট করতে পারেন, কনসোল রান করতে `$ python3` কমান্ডটি ব্যবহার করুন।

### অ্যাকাউন্ট তৈরি করা {#creating-accounts}

আপনার প্রথম যে কাজটি করা উচিত তা হলো নিচের কমান্ডগুলো দিয়ে একটি নতুন ব্লকচেইন শুরু করা:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

একটি নন-কন্ট্রাক্ট অ্যাকাউন্ট [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ব্যবহার করে তৈরি করা হয়:

```python
user_account = m.create_account(balance=1000)
```

একটি Solidity কন্ট্রাক্ট [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ব্যবহার করে ডিপ্লয় করা যেতে পারে:

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### সারাংশ {#summary}

- আপনি [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) এবং [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) দিয়ে ব্যবহারকারী এবং চুক্তি অ্যাকাউন্ট তৈরি করতে পারেন।

### ট্রানজ্যাকশন এক্সিকিউট করা {#executing-transactions}

ম্যান্টিকোর দুই ধরনের ট্রানজ্যাকশন সমর্থন করে:

- র (Raw) ট্রানজ্যাকশন: সমস্ত ফাংশন অন্বেষণ করা হয়
- নেমড (Named) ট্রানজ্যাকশন: কেবল একটি ফাংশন অন্বেষণ করা হয়

#### র (Raw) ট্রানজ্যাকশন {#raw-transaction}

একটি র ট্রানজ্যাকশন [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ব্যবহার করে এক্সিকিউট করা হয়:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

কলার, ঠিকানা, ডেটা বা ট্রানজ্যাকশনের মান কংক্রিট বা সিম্বলিক হতে পারে:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) একটি সিম্বলিক মান তৈরি করে।
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) একটি সিম্বলিক বাইট অ্যারে তৈরি করে।

উদাহরণস্বরূপ:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

যদি ডেটা সিম্বলিক হয়, তবে ম্যান্টিকোর ট্রানজ্যাকশন এক্সিকিউশনের সময় কন্ট্রাক্টের সমস্ত ফাংশন অন্বেষণ করবে। ফাংশন নির্বাচন কীভাবে কাজ করে তা বোঝার জন্য [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) আর্টিকেলে ফলব্যাক ফাংশন-এর ব্যাখ্যা দেখা সহায়ক হবে।

#### নেমড (Named) ট্রানজ্যাকশন {#named-transaction}

ফাংশনগুলো তাদের নামের মাধ্যমে এক্সিকিউট করা যেতে পারে।
user_account থেকে একটি সিম্বলিক মান এবং 0 ইথার দিয়ে `f(uint var)` এক্সিকিউট করতে, ব্যবহার করুন:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

যদি ট্রানজ্যাকশনের `value` নির্দিষ্ট করা না থাকে, তবে এটি ডিফল্টরূপে 0 হয়।

#### সারাংশ {#summary-1}

- একটি ট্রানজ্যাকশনের আর্গুমেন্ট কংক্রিট বা সিম্বলিক হতে পারে
- একটি র ট্রানজ্যাকশন সমস্ত ফাংশন অন্বেষণ করবে
- ফাংশন তাদের নাম দিয়ে কল করা যেতে পারে

### ওয়ার্কস্পেস {#workspace}

`m.workspace` হলো তৈরি করা সমস্ত ফাইলের আউটপুট ডিরেক্টরি হিসেবে ব্যবহৃত ডিরেক্টরি:

```python
print("Results are in {}".format(m.workspace))
```

### অন্বেষণ শেষ করা {#terminate-the-exploration}

অন্বেষণ থামাতে [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) ব্যবহার করুন। একবার এই মেথডটি কল করা হলে আর কোনো ট্রানজ্যাকশন পাঠানো উচিত নয় এবং ম্যান্টিকোর অন্বেষণ করা প্রতিটি পাথের জন্য টেস্ট কেস তৈরি করে।

### সারাংশ: ম্যান্টিকোরের অধীনে রান করা {#summary-running-under-manticore}

আগের সমস্ত ধাপগুলো একসাথে রাখলে, আমরা পাই:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # অনুসন্ধান থামান
```

উপরের সমস্ত কোড আপনি [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)-এ খুঁজে পেতে পারেন

## থ্রোয়িং পাথগুলো পাওয়া {#getting-throwing-paths}

আমরা এখন `f()`-এ এক্সেপশন তৈরি করা পাথগুলোর জন্য নির্দিষ্ট ইনপুট তৈরি করব। লক্ষ্য এখনও নিচের স্মার্ট কন্ট্রাক্টটি [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### স্টেট তথ্য ব্যবহার করা {#using-state-information}

এক্সিকিউট করা প্রতিটি পাথের নিজস্ব ব্লকচেইন স্টেট থাকে। একটি স্টেট হয় প্রস্তুত (ready) থাকে অথবা এটি বাতিল (killed) হয়, যার মানে হলো এটি একটি THROW বা REVERT নির্দেশনায় পৌঁছায়:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): প্রস্তুত থাকা স্টেটগুলোর তালিকা (এগুলো কোনো REVERT/INVALID এক্সিকিউট করেনি)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): বাতিল হওয়া স্টেটগুলোর তালিকা
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): সমস্ত স্টেট

```python
for state in m.all_states:
    # স্টেট নিয়ে কিছু করুন
```

আপনি স্টেট তথ্য অ্যাক্সেস করতে পারেন। উদাহরণস্বরূপ:

- `state.platform.get_balance(account.address)`: অ্যাকাউন্টের ব্যালেন্স
- `state.platform.transactions`: ট্রানজ্যাকশনের তালিকা
- `state.platform.transactions[-1].return_data`: শেষ ট্রানজ্যাকশন দ্বারা রিটার্ন করা ডেটা

শেষ ট্রানজ্যাকশন দ্বারা রিটার্ন করা ডেটা হলো একটি অ্যারে, যা ABI.deserialize দিয়ে একটি মানে রূপান্তর করা যেতে পারে, উদাহরণস্বরূপ:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### কীভাবে টেস্টকেস তৈরি করবেন {#how-to-generate-testcase}

টেস্টকেস তৈরি করতে [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) ব্যবহার করুন:

```python
m.generate_testcase(state, 'BugFound')
```

### সারাংশ {#summary-2}

- আপনি m.all_states দিয়ে স্টেটের উপর ইটারেট করতে পারেন
- `state.platform.get_balance(account.address)` অ্যাকাউন্টের ব্যালেন্স রিটার্ন করে
- `state.platform.transactions` ট্রানজ্যাকশনের তালিকা রিটার্ন করে
- `transaction.return_data` হলো রিটার্ন করা ডেটা
- `m.generate_testcase(state, name)` স্টেটের জন্য ইনপুট তৈরি করে

### সারাংশ: থ্রোয়িং পাথ পাওয়া {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## একটি এক্সিকিউশন রিভার্ট বা INVALID দিয়ে শেষ হয় কিনা তা পরীক্ষা করুন
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

উপরের সমস্ত কোড আপনি [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)-এ খুঁজে পেতে পারেন

_দ্রষ্টব্য: আমরা আরও অনেক সহজ স্ক্রিপ্ট তৈরি করতে পারতাম, কারণ terminated_state দ্বারা রিটার্ন করা সমস্ত স্টেটের ফলাফলে REVERT বা INVALID থাকে: এই উদাহরণটি কেবল API কীভাবে ম্যানিপুলেট করতে হয় তা দেখানোর জন্য ছিল।_

## সীমাবদ্ধতা যোগ করা {#adding-constraints}

আমরা দেখব কীভাবে অন্বেষণকে সীমাবদ্ধ করতে হয়। আমরা ধরে নেব যে `f()`-এর ডকুমেন্টেশনে বলা হয়েছে যে ফাংশনটি কখনোই `a == 65` দিয়ে কল করা হয় না, তাই `a == 65` সহ কোনো বাগ আসল বাগ নয়। লক্ষ্য এখনও নিচের স্মার্ট কন্ট্রাক্টটি [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### অপারেটর {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) মডিউলটি সীমাবদ্ধতা ম্যানিপুলেট করা সহজ করে, অন্যান্য জিনিসের মধ্যে এটি প্রদান করে:

- Operators.AND,
- Operators.OR,
- Operators.UGT (আনসাইনড গ্রেটার দ্যান),
- Operators.UGE (আনসাইনড গ্রেটার দ্যান অর ইকুয়াল টু),
- Operators.ULT (আনসাইনড লোয়ার দ্যান),
- Operators.ULE (আনসাইনড লোয়ার দ্যান অর ইকুয়াল টু)।

মডিউলটি ইমপোর্ট করতে নিচেরটি ব্যবহার করুন:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` একটি অ্যারে-কে একটি মানের সাথে যুক্ত করতে ব্যবহৃত হয়। উদাহরণস্বরূপ, একটি ট্রানজ্যাকশনের return_data-কে অন্য একটি মানের বিপরীতে চেক করার জন্য একটি মানে পরিবর্তন করতে হবে:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### সীমাবদ্ধতা {#state-constraint}

আপনি বিশ্বব্যাপী (globally) বা একটি নির্দিষ্ট স্টেটের জন্য সীমাবদ্ধতা ব্যবহার করতে পারেন।

#### গ্লোবাল সীমাবদ্ধতা {#state-constraint-2}

একটি গ্লোবাল সীমাবদ্ধতা যোগ করতে `m.constrain(constraint)` ব্যবহার করুন।
উদাহরণস্বরূপ, আপনি একটি সিম্বলিক ঠিকানা থেকে একটি কন্ট্রাক্ট কল করতে পারেন এবং এই ঠিকানাকে নির্দিষ্ট মান হতে সীমাবদ্ধ করতে পারেন:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### স্টেট সীমাবদ্ধতা {#state-constraint-3}

একটি নির্দিষ্ট স্টেটে সীমাবদ্ধতা যোগ করতে [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) ব্যবহার করুন।
এটি অন্বেষণের পরে স্টেটের উপর কোনো প্রপার্টি চেক করার জন্য স্টেটকে সীমাবদ্ধ করতে ব্যবহৃত হতে পারে।

### সীমাবদ্ধতা চেক করা {#checking-constraint}

একটি সীমাবদ্ধতা এখনও কার্যকর কিনা তা জানতে `solver.check(state.constraints)` ব্যবহার করুন।
উদাহরণস্বরূপ, নিচেরটি symbolic_value-কে 65 থেকে ভিন্ন হতে সীমাবদ্ধ করবে এবং স্টেটটি এখনও কার্যকর কিনা তা চেক করবে:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # স্টেটটি সম্ভব
```

### সারাংশ: সীমাবদ্ধতা যোগ করা {#summary-adding-constraints}

আগের কোডে সীমাবদ্ধতা যোগ করলে, আমরা পাই:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## একটি এক্সিকিউশন রিভার্ট বা INVALID দিয়ে শেষ হয় কিনা তা পরীক্ষা করুন
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # আমরা সেই পাথটি বিবেচনা করি না যেখানে a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

উপরের সমস্ত কোড আপনি [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)-এ খুঁজে পেতে পারেন