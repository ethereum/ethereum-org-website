---
title: "স্মার্ট কন্ট্র্যাক্টে বাগ খুঁজে বের করতে Manticore কিভাবে ব্যবহার করবেন"
description: "স্মার্ট কন্ট্র্যাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজে বের করতে Manticore কিভাবে ব্যবহার করবেন"
author: Trailofbits
lang: bn
tags:
  [
    "সলিডিটি",
    "স্মার্ট কন্ট্র্যাক্ট",
    "নিরাপত্তা",
    "পরীক্ষা",
    "প্রথাগত যাচাইকরণ"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

এই টিউটোরিয়ালের লক্ষ্য হল কিভাবে Manticore ব্যবহার করে স্মার্ট কন্ট্র্যাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজে বের করা যায় তা দেখানো।

## ইনস্টলেশন {#installation}

Manticore-এর জন্য >= python 3.6 প্রয়োজন। এটি pip-এর মাধ্যমে বা docker ব্যবহার করে ইনস্টল করা যেতে পারে।

### docker-এর মাধ্যমে Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_শেষ কমান্ডটি একটি docker-এ eth-security-toolbox চালায় যেটির আপনার বর্তমান ডিরেক্টরিতে অ্যাক্সেস আছে। আপনি আপনার হোস্ট থেকে ফাইলগুলো পরিবর্তন করতে পারেন, এবং docker থেকে ফাইলগুলোতে টুলস চালাতে পারেন_

docker-এর ভিতরে, চালান:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip-এর মাধ্যমে Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 সুপারিশ করা হয়।

### একটি স্ক্রিপ্ট চালানো {#running-a-script}

python 3 দিয়ে একটি python স্ক্রিপ্ট চালাতে:

```bash
python3 script.py
```

## ডাইনামিক সিম্বলিক এক্সিকিউশন-এর ভূমিকা {#introduction-to-dynamic-symbolic-execution}

### সংক্ষেপে ডাইনামিক সিম্বলিক এক্সিকিউশন {#dynamic-symbolic-execution-in-a-nutshell}

ডাইনামিক সিম্বলিক এক্সিকিউশন (DSE) হল একটি প্রোগ্রাম অ্যানালিসিস কৌশল যা উচ্চ মাত্রার সিমেন্টিক সচেতনতার সাথে একটি স্টেট স্পেস এক্সপ্লোর করে। এই কৌশলটি "প্রোগ্রাম পাথ" আবিষ্কারের উপর ভিত্তি করে তৈরি, যা `path predicates` নামক গাণিতিক সূত্র হিসাবে উপস্থাপিত হয়। ধারণাগতভাবে, এই কৌশলটি দুটি ধাপে পাথ প্রেডিকেটগুলির উপর কাজ করে:

1. এগুলি প্রোগ্রামের ইনপুটের উপর সীমাবদ্ধতা ব্যবহার করে তৈরি করা হয়।
2. এগুলি এমন প্রোগ্রাম ইনপুট তৈরি করতে ব্যবহৃত হয় যা সংশ্লিষ্ট পাথগুলিকে এক্সিকিউট করাবে।

এই পদ্ধতিটি কোনো ফলস পজিটিভ তৈরি করে না, এই অর্থে যে সমস্ত চিহ্নিত প্রোগ্রাম স্টেট কংক্রিট এক্সিকিউশনের সময় ট্রিগার করা যেতে পারে। উদাহরণস্বরূপ, যদি অ্যানালিসিস একটি ইন্টিজার ওভারফ্লো খুঁজে পায়, তবে এটি পুনরুৎপাদনযোগ্য হওয়ার নিশ্চয়তা দেওয়া হয়।

### পাথ প্রেডিকেটের উদাহরণ {#path-predicate-example}

DSE কীভাবে কাজ করে তার একটি ধারণা পেতে, নিম্নলিখিত উদাহরণটি বিবেচনা করুন:

```solidity
function f(uint a){

  if (a == 65) {
      // একটি বাগ উপস্থিত
  }

}
```

যেহেতু `f()`-এ দুটি পাথ রয়েছে, একটি DSE দুটি ভিন্ন পাথ প্রেডিকেট তৈরি করবে:

- পাথ 1: `a == 65`
- পাথ 2: `Not (a == 65)`

প্রতিটি পাথ প্রেডিকেট একটি গাণিতিক সূত্র যা একটি তথাকথিত [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories)-কে দেওয়া যেতে পারে, যা সমীকরণটি সমাধান করার চেষ্টা করবে। `পাথ 1`-এর জন্য, সলভার বলবে যে `a = 65` দিয়ে পাথটি এক্সপ্লোর করা যাবে। `পাথ 2`-এর জন্য, সলভার `a`-কে 65 ছাড়া অন্য যেকোনো মান দিতে পারে, উদাহরণস্বরূপ `a = 0`।

### প্রপার্টি যাচাই করা {#verifying-properties}

Manticore প্রতিটি পাথের সমস্ত এক্সিকিউশনের উপর সম্পূর্ণ নিয়ন্ত্রণ দেয়। ফলস্বরূপ, এটি আপনাকে প্রায় যেকোনো কিছুতে যথেচ্ছ সীমাবদ্ধতা যোগ করতে দেয়। এই নিয়ন্ত্রণটি কন্ট্র্যাক্টে প্রপার্টি তৈরি করার অনুমতি দেয়।

নিম্নলিখিত উদাহরণটি বিবেচনা করুন:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // কোনো ওভারফ্লো সুরক্ষা নেই
  return c;
}
```

এখানে ফাংশনটিতে এক্সপ্লোর করার জন্য কেবল একটি পাথ রয়েছে:

- পাথ 1: `c = a + b`

Manticore ব্যবহার করে, আপনি ওভারফ্লো পরীক্ষা করতে পারেন এবং পাথ প্রেডিকেটে সীমাবদ্ধতা যোগ করতে পারেন:

- `c = a + b AND (c < a OR c < b)`

যদি `a` এবং `b`-এর এমন একটি মূল্যায়ন খুঁজে পাওয়া সম্ভব হয় যার জন্য উপরের পাথ প্রেডিকেটটি সম্ভব, এর মানে হল আপনি একটি ওভারফ্লো খুঁজে পেয়েছেন। উদাহরণস্বরূপ সলভার `a = 10 , b = MAXUINT256` ইনপুটটি তৈরি করতে পারে।

আপনি যদি একটি ফিক্সড সংস্করণ বিবেচনা করেন:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

ওভারফ্লো পরীক্ষাসহ সংশ্লিষ্ট সূত্রটি হবে:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

এই সূত্রটি সমাধান করা যায় না; অন্য কথায় এটি একটি **প্রমাণ** যে `safe_add`-এ `c` সর্বদা বৃদ্ধি পাবে।

সুতরাং DSE একটি শক্তিশালী টুল, যা আপনার কোডে যথেচ্ছ সীমাবদ্ধতা যাচাই করতে পারে।

## Manticore-এর অধীনে চালানো {#running-under-manticore}

আমরা দেখব কিভাবে Manticore API দিয়ে একটি স্মার্ট কন্ট্র্যাক্ট এক্সপ্লোর করতে হয়। লক্ষ্য হল নিম্নলিখিত স্মার্ট কন্ট্র্যাক্ট [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### একটি স্বতন্ত্র এক্সপ্লোরেশন চালান {#run-a-standalone-exploration}

আপনি নিম্নলিখিত কমান্ড দ্বারা সরাসরি স্মার্ট কন্ট্র্যাক্টে Manticore চালাতে পারেন (`প্রজেক্ট` একটি সলিডিটি ফাইল, বা একটি প্রজেক্ট ডিরেক্টরি হতে পারে):

```bash
$ manticore project
```

আপনি এইরকম টেস্টকেসগুলির আউটপুট পাবেন (ক্রম পরিবর্তন হতে পারে):

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

অতিরিক্ত তথ্য ছাড়া, Manticore নতুন সিম্বলিক
লেনদেনের মাধ্যমে কন্ট্র্যাক্টটি অন্বেষণ করবে যতক্ষণ না এটি কন্ট্র্যাক্টে নতুন পথ অন্বেষণ করা বন্ধ করে। Manticore একটি ব্যর্থ লেনদেনের পরে নতুন লেনদেন চালায় না (যেমন: একটি রিভার্টের পরে)।

Manticore একটি `mcore_*` ডিরেক্টরিতে তথ্য আউটপুট করবে। অন্যান্য জিনিসের মধ্যে, আপনি এই ডিরেক্টরিতে পাবেন:

- `global.summary`: কভারেজ এবং কম্পাইলার সতর্কতা
- `test_XXXXX.summary`: কভারেজ, শেষ নির্দেশনা, প্রতি টেস্ট কেস অনুযায়ী অ্যাকাউন্ট ব্যালেন্স
- `test_XXXXX.tx`: প্রতি টেস্ট কেস অনুযায়ী লেনদেনের বিস্তারিত তালিকা

এখানে Manticore ৭টি টেস্ট কেস খুঁজে পেয়েছে, যা নিম্নরূপ (ফাইলের নামের ক্রম পরিবর্তন হতে পারে):

|                                                           |      লেনদেন 0     |          লেনদেন 1          | লেনদেন 2                   |  ফলাফল |
| :-------------------------------------------------------: | :---------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | কন্ট্র্যাক্ট তৈরি | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | কন্ট্র্যাক্ট তৈরি |        ফলব্যাক ফাংশন       |                            | REVERT |
| **test_00000002.tx** | কন্ট্র্যাক্ট তৈরি |                            |                            | RETURN |
| **test_00000003.tx** | কন্ট্র্যাক্ট তৈরি |  f(65)  |                            | REVERT |
| **test_00000004.tx** | কন্ট্র্যাক্ট তৈরি | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | কন্ট্র্যাক্ট তৈরি | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | কন্ট্র্যাক্ট তৈরি | f(!=65) | ফলব্যাক ফাংশন              | REVERT |

_এক্সপ্লোরেশন সারাংশ f(!=65) বোঝায় যে f-কে 65 থেকে ভিন্ন যেকোনো মান দিয়ে কল করা হয়েছে।_

আপনি যেমন লক্ষ্য করতে পারেন, Manticore প্রতিটি সফল বা রিভার্ট হওয়া লেনদেনের জন্য একটি অনন্য টেস্ট কেস তৈরি করে।

আপনি যদি দ্রুত কোড এক্সপ্লোরেশন চান তবে `--quick-mode` ফ্ল্যাগটি ব্যবহার করুন (এটি বাগ ডিটেক্টর, গ্যাস গণনা ইত্যাদি নিষ্ক্রিয় করে)

### API-এর মাধ্যমে একটি স্মার্ট কন্ট্র্যাক্ট ম্যানিপুলেট করা {#manipulate-a-smart-contract-through-the-api}

এই বিভাগে Manticore Python API-এর মাধ্যমে কীভাবে একটি স্মার্ট কন্ট্র্যাক্ট ম্যানিপুলেট করতে হয় তা বিস্তারিতভাবে বর্ণনা করা হয়েছে। আপনি `*.py` এক্সটেনশন সহ নতুন ফাইল তৈরি করতে পারেন এবং এই ফাইলে API কমান্ডগুলি (যার মূল বিষয়গুলি নীচে বর্ণনা করা হবে) যোগ করে প্রয়োজনীয় কোড লিখতে পারেন এবং তারপরে `$ python3 *.py` কমান্ড দিয়ে এটি চালাতে পারেন। এছাড়াও আপনি নীচের কমান্ডগুলি সরাসরি পাইথন কনসোলে এক্সিকিউট করতে পারেন, কনসোলটি চালানোর জন্য `$ python3` কমান্ডটি ব্যবহার করুন।

### অ্যাকাউন্ট তৈরি করা {#creating-accounts}

আপনার প্রথম যা করা উচিত তা হল নিম্নলিখিত কমান্ডগুলি দিয়ে একটি নতুন ব্লকচেইন শুরু করা:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

একটি নন-কন্ট্র্যাক্ট অ্যাকাউন্ট [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) ব্যবহার করে তৈরি করা হয়:

```python
user_account = m.create_account(balance=1000)
```

একটি সলিডিটি কন্ট্র্যাক্ট [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) ব্যবহার করে ডিপ্লয় করা যেতে পারে:

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
# কন্ট্র্যাক্টটি শুরু করুন
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### সারসংক্ষেপ {#summary}

- আপনি [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) এবং [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) দিয়ে ব্যবহারকারী এবং কন্ট্র্যাক্ট অ্যাকাউন্ট তৈরি করতে পারেন।

### লেনদেন এক্সিকিউট করা {#executing-transactions}

Manticore দুই ধরনের লেনদেন সমর্থন করে:

- র' লেনদেন: সমস্ত ফাংশন এক্সপ্লোর করা হয়
- নামযুক্ত লেনদেন: শুধুমাত্র একটি ফাংশন এক্সপ্লোর করা হয়

#### র' লেনদেন {#raw-transaction}

একটি র' লেনদেন [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ব্যবহার করে এক্সিকিউট করা হয়:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

লেনদেনের কলার, ঠিকানা, ডেটা, বা মান কংক্রিট বা সিম্বলিক উভয়ই হতে পারে:

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

যদি ডেটা সিম্বলিক হয়, Manticore লেনদেন এক্সিকিউশনের সময় কন্ট্র্যাক্টের সমস্ত ফাংশন এক্সপ্লোর করবে। ফাংশন সিলেকশন কীভাবে কাজ করে তা বোঝার জন্য [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) নিবন্ধে ফলব্যাক ফাংশনের ব্যাখ্যা দেখা সহায়ক হবে।

#### নামযুক্ত লেনদেন {#named-transaction}

ফাংশনগুলি তাদের নামের মাধ্যমে এক্সিকিউট করা যেতে পারে।
`f(uint var)`-কে একটি সিম্বলিক মান দিয়ে, user_account থেকে, এবং 0 ইথার সহ এক্সিকিউট করতে, ব্যবহার করুন:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

যদি লেনদেনের `value` নির্দিষ্ট করা না থাকে, তবে এটি ডিফল্টরূপে 0 হয়।

#### সারাংশ {#summary-1}

- একটি লেনদেনের আর্গুমেন্ট কংক্রিট বা সিম্বলিক হতে পারে
- একটি র' লেনদেন সমস্ত ফাংশন এক্সপ্লোর করবে
- ফাংশনকে তাদের নাম দিয়ে কল করা যেতে পারে

### ওয়ার্কস্পেস {#workspace}

`m.workspace` হল জেনারেট করা সমস্ত ফাইলের জন্য আউটপুট ডিরেক্টরি হিসাবে ব্যবহৃত ডিরেক্টরি:

```python
print("Results are in {}".format(m.workspace))
```

### এক্সপ্লোরেশন বন্ধ করুন {#terminate-the-exploration}

এক্সপ্লোরেশন থামাতে [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) ব্যবহার করুন। এই পদ্ধতিটি কল করার পরে আর কোনো লেনদেন পাঠানো উচিত নয় এবং Manticore প্রতিটি এক্সপ্লোর করা পাথের জন্য টেস্ট কেস তৈরি করে।

### সারাংশ: Manticore-এর অধীনে চালানো {#summary-running-under-manticore}

পূর্ববর্তী সমস্ত ধাপ একসাথে রাখলে, আমরা পাই:

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
m.finalize() # এক্সপ্লোরেশন বন্ধ করুন
```

উপরের সমস্ত কোড আপনি [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) এর মধ্যে খুঁজে পেতে পারেন

## থ্রোয়িং পাথ পাওয়া {#getting-throwing-paths}

আমরা এখন `f()`-এ একটি এক্সেপশন উত্থাপনকারী পাথগুলির জন্য নির্দিষ্ট ইনপুট তৈরি করব। লক্ষ্য এখনও নিম্নলিখিত স্মার্ট কন্ট্র্যাক্ট [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### স্টেটের তথ্য ব্যবহার করা {#using-state-information}

প্রতিটি এক্সিকিউট করা পাথের নিজস্ব ব্লকচেইনের স্টেট রয়েছে। একটি স্টেট হয় রেডি থাকে অথবা কিল হয়ে যায়, যার অর্থ এটি একটি THROW বা REVERT নির্দেশনায় পৌঁছেছে:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): রেডি থাকা স্টেটগুলির তালিকা (তারা একটি REVERT/INVALID এক্সিকিউট করেনি)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): কিল হয়ে যাওয়া স্টেটগুলির তালিকা
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): সমস্ত স্টেট

```python
for state in m.all_states:
    # স্টেট নিয়ে কিছু করুন
```

আপনি স্টেটের তথ্য অ্যাক্সেস করতে পারেন। উদাহরণস্বরূপ:

- `state.platform.get_balance(account.address)`: অ্যাকাউন্টের ব্যালেন্স
- `state.platform.transactions`: লেনদেনের তালিকা
- `state.platform.transactions[-1].return_data`: শেষ লেনদেন দ্বারা ফেরত দেওয়া ডেটা

শেষ লেনদেন দ্বারা ফেরত দেওয়া ডেটা একটি অ্যারে, যা ABI.deserialize দিয়ে একটি মানে রূপান্তরিত করা যেতে পারে, উদাহরণস্বরূপ:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### কীভাবে টেস্টকেস জেনারেট করবেন {#how-to-generate-testcase}

টেস্টকেস জেনারেট করতে [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) ব্যবহার করুন:

```python
m.generate_testcase(state, 'BugFound')
```

### সারাংশ {#summary-2}

- আপনি m.all_states দিয়ে স্টেটের উপর ইটারেট করতে পারেন
- `state.platform.get_balance(account.address)` অ্যাকাউন্টের ব্যালেন্স ফেরত দেয়
- `state.platform.transactions` লেনদেনের তালিকা ফেরত দেয়
- `transaction.return_data` হল ফেরত দেওয়া ডেটা
- `m.generate_testcase(state, name)` স্টেটের জন্য ইনপুট জেনারেট করে

### সারাংশ: থ্রোয়িং পাথ পাওয়া {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## একটি এক্সিকিউশন REVERT বা INVALID দিয়ে শেষ হয় কিনা তা পরীক্ষা করুন

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

উপরের সমস্ত কোড আপনি [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) এর মধ্যে খুঁজে পেতে পারেন

_দ্রষ্টব্য আমরা একটি অনেক সহজ স্ক্রিপ্ট তৈরি করতে পারতাম, কারণ terminated_state দ্বারা ফেরত দেওয়া সমস্ত স্টেটের ফলাফলে REVERT বা INVALID থাকে: এই উদাহরণটি শুধুমাত্র API কীভাবে ম্যানিপুলেট করতে হয় তা প্রদর্শনের জন্য ছিল।_

## সীমাবদ্ধতা যোগ করা {#adding-constraints}

আমরা দেখব কীভাবে এক্সপ্লোরেশনকে সীমাবদ্ধ করা যায়। আমরা এই ধারণাটি ধরে নেব যে `f()`-এর
ডকুমেন্টেশন অনুযায়ী ফাংশনটি কখনও `a == 65` দিয়ে কল করা হয় না, তাই `a == 65` সহ যেকোনো বাগ একটি আসল বাগ নয়। লক্ষ্য এখনও নিম্নলিখিত স্মার্ট কন্ট্র্যাক্ট [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

[অপারেটর](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) মডিউলটি সীমাবদ্ধতার ম্যানিপুলেশনকে সহজ করে, অন্যান্য জিনিসের মধ্যে এটি প্রদান করে:

- Operators.AND,
- Operators.OR,
- Operators.UGT (আনসাইন্ড গ্রেটার দ্যান),
- Operators.UGE (আনসাইন্ড গ্রেটার দ্যান অর ইকুয়াল টু),
- Operators.ULT (আনসাইন্ড লোয়ার দ্যান),
- Operators.ULE (আনসাইন্ড লোয়ার দ্যান অর ইকুয়াল টু)।

মডিউলটি ইম্পোর্ট করতে নিম্নলিখিতটি ব্যবহার করুন:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` একটি অ্যারের সাথে একটি মান কনক্যাটেনেট করতে ব্যবহৃত হয়। উদাহরণস্বরূপ, একটি লেনদেনের return_data-কে অন্য একটি মানের সাথে পরীক্ষা করার জন্য একটি মানে পরিবর্তন করতে হবে:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### সীমাবদ্ধতা {#state-constraint}

আপনি বিশ্বব্যাপী বা একটি নির্দিষ্ট স্টেটের জন্য সীমাবদ্ধতা ব্যবহার করতে পারেন।

#### গ্লোবাল সীমাবদ্ধতা {#state-constraint}

একটি গ্লোবাল সীমাবদ্ধতা যোগ করতে `m.constrain(constraint)` ব্যবহার করুন।
উদাহরণস্বরূপ, আপনি একটি সিম্বলিক ঠিকানা থেকে একটি কন্ট্র্যাক্ট কল করতে পারেন, এবং এই ঠিকানাটিকে নির্দিষ্ট মানে সীমাবদ্ধ করতে পারেন:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### স্টেট সীমাবদ্ধতা {#state-constraint}

একটি নির্দিষ্ট স্টেটে সীমাবদ্ধতা যোগ করতে [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) ব্যবহার করুন।
এটি এক্সপ্লোরেশনের পরে স্টেটের উপর কিছু প্রপার্টি পরীক্ষা করার জন্য স্টেটকে সীমাবদ্ধ করতে ব্যবহার করা যেতে পারে।

### সীমাবদ্ধতা পরীক্ষা করা {#checking-constraint}

একটি সীমাবদ্ধতা এখনও সম্ভব কিনা তা জানতে `solver.check(state.constraints)` ব্যবহার করুন।
উদাহরণস্বরূপ, নিম্নলিখিতটি symbolic_value-কে 65 থেকে ভিন্ন হতে সীমাবদ্ধ করবে এবং স্টেটটি এখনও সম্ভব কিনা তা পরীক্ষা করবে:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # স্টেটটি সম্ভব
```

### সারাংশ: সীমাবদ্ধতা যোগ করা {#summary-adding-constraints}

পূর্ববর্তী কোডে সীমাবদ্ধতা যোগ করে, আমরা পাই:

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

## একটি এক্সিকিউশন REVERT বা INVALID দিয়ে শেষ হয় কিনা তা পরীক্ষা করুন

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # আমরা সেই পাথ বিবেচনা করি না যেখানে a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'বাগ পাওয়া গেছে, ফলাফলগুলো {m.workspace}-এ আছে')
            no_bug_found = False

if no_bug_found:
    print(f'কোনো বাগ পাওয়া যায়নি')
```

উপরের সমস্ত কোড আপনি [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) এর মধ্যে খুঁজে পেতে পারেন
