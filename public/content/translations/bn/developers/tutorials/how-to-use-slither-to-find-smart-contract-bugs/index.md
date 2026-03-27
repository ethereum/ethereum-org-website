---
title: "স্মার্ট কন্ট্রাক্ট বাগ খুঁজতে স্লিদার (Slither) কীভাবে ব্যবহার করবেন"
description: "স্মার্ট কন্ট্রাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজতে স্লিদার কীভাবে ব্যবহার করবেন"
author: "ট্রেইলঅফবিটস"
lang: bn
tags: ["Solidity", "স্মার্ট কন্ট্রাক্ট", "নিরাপত্তা", "টেস্টিং"]
skill: advanced
breadcrumb: "স্লিদার"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## স্লিদার কীভাবে ব্যবহার করবেন {#how-to-use-slither}

এই টিউটোরিয়ালের উদ্দেশ্য হলো স্মার্ট কন্ট্রাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজতে স্লিদার কীভাবে ব্যবহার করতে হয় তা দেখানো।

- [ইন্সটলেশন](#installation)
- [কমান্ড লাইন ব্যবহার](#command-line)
- [স্ট্যাটিক অ্যানালাইসিসের পরিচিতি](#static-analysis): স্ট্যাটিক অ্যানালাইসিসের সংক্ষিপ্ত পরিচিতি
- [এপিআই (API)](#api-basics): পাইথন এপিআই-এর বিবরণ

## ইন্সটলেশন {#installation}

স্লিদার ব্যবহার করার জন্য Python >= 3.6 প্রয়োজন। এটি pip বা docker ব্যবহার করে ইন্সটল করা যেতে পারে।

pip-এর মাধ্যমে স্লিদার:

```bash
pip3 install --user slither-analyzer
```

docker-এর মাধ্যমে স্লিদার:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_শেষ কমান্ডটি একটি ডকারে eth-security-toolbox চালায় যার আপনার বর্তমান ডিরেক্টরিতে অ্যাক্সেস রয়েছে। আপনি আপনার হোস্ট থেকে ফাইলগুলো পরিবর্তন করতে পারেন এবং ডকার থেকে ফাইলগুলোর উপর টুলগুলো চালাতে পারেন_

ডকারের ভিতরে, রান করুন:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### স্ক্রিপ্ট রান করা {#running-a-script}

python 3 দিয়ে একটি পাইথন স্ক্রিপ্ট রান করতে:

```bash
python3 script.py
```

### কমান্ড লাইন {#command-line}

**কমান্ড লাইন বনাম ব্যবহারকারী-নির্ধারিত স্ক্রিপ্ট।** স্লিদার পূর্বনির্ধারিত ডিটেক্টরের একটি সেট নিয়ে আসে যা অনেক সাধারণ বাগ খুঁজে বের করে। কমান্ড লাইন থেকে স্লিদার কল করলে সমস্ত ডিটেক্টর রান হবে, এর জন্য স্ট্যাটিক অ্যানালাইসিসের বিস্তারিত জ্ঞানের প্রয়োজন নেই:

```bash
slither project_paths
```

ডিটেক্টর ছাড়াও, স্লিদারে এর [printers](https://github.com/crytic/slither#printers) এবং [tools](https://github.com/crytic/slither#tools)-এর মাধ্যমে কোড রিভিউ করার ক্ষমতা রয়েছে।

প্রাইভেট ডিটেক্টর এবং GitHub ইন্টিগ্রেশনে অ্যাক্সেস পেতে [crytic.io](https://github.com/crytic) ব্যবহার করুন।

## স্ট্যাটিক অ্যানালাইসিস {#static-analysis}

স্লিদার স্ট্যাটিক অ্যানালাইসিস ফ্রেমওয়ার্কের ক্ষমতা এবং ডিজাইন ব্লগ পোস্টে ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) এবং একটি [একাডেমিক পেপারে](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) বর্ণনা করা হয়েছে।

স্ট্যাটিক অ্যানালাইসিস বিভিন্ন ধরনের হয়ে থাকে। আপনি সম্ভবত বুঝতে পেরেছেন যে [clang](https://clang-analyzer.llvm.org/) এবং [gcc](https://lwn.net/Articles/806099/)-এর মতো কম্পাইলারগুলো এই গবেষণার কৌশলগুলোর উপর নির্ভর করে, তবে এটি ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/)-এর মতো টুল এবং [Frama-C](https://frama-c.com/) ও [Polyspace](https://www.mathworks.com/products/polyspace.html)-এর মতো ফরমাল মেথডের উপর ভিত্তি করে তৈরি টুলগুলোরও ভিত্তি।

আমরা এখানে স্ট্যাটিক অ্যানালাইসিস কৌশল এবং গবেষকদের নিয়ে বিস্তারিত আলোচনা করব না। এর পরিবর্তে, স্লিদার কীভাবে কাজ করে তা বোঝার জন্য যা প্রয়োজন আমরা তার উপর ফোকাস করব, যাতে আপনি বাগ খুঁজতে এবং কোড বুঝতে এটি আরও কার্যকরভাবে ব্যবহার করতে পারেন।

- [কোড রিপ্রেজেন্টেশন](#code-representation)
- [কোড অ্যানালাইসিস](#analysis)
- [ইন্টারমিডিয়েট রিপ্রেজেন্টেশন](#intermediate-representation)

### কোড রিপ্রেজেন্টেশন {#code-representation}

ডাইনামিক অ্যানালাইসিসের বিপরীতে, যা একটি একক এক্সিকিউশন পাথ নিয়ে কাজ করে, স্ট্যাটিক অ্যানালাইসিস একই সাথে সমস্ত পাথ নিয়ে কাজ করে। এটি করার জন্য, এটি একটি ভিন্ন কোড রিপ্রেজেন্টেশনের উপর নির্ভর করে। সবচেয়ে সাধারণ দুটি হলো অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) এবং কন্ট্রোল ফ্লো গ্রাফ (CFG)।

### অ্যাবস্ট্রাক্ট সিনট্যাক্স ট্রি (AST) {#abstract-syntax-trees-ast}

কম্পাইলার যখনই কোড পার্স করে তখনই AST ব্যবহার করা হয়। এটি সম্ভবত সবচেয়ে মৌলিক কাঠামো যার উপর স্ট্যাটিক অ্যানালাইসিস করা যেতে পারে।

সংক্ষেপে, একটি AST হলো একটি স্ট্রাকচার্ড ট্রি যেখানে সাধারণত প্রতিটি লিফে একটি ভেরিয়েবল বা কনস্ট্যান্ট থাকে এবং ইন্টারনাল নোডগুলো হলো অপারেন্ড বা কন্ট্রোল ফ্লো অপারেশন। নিচের কোডটি বিবেচনা করুন:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

এর সাথে সম্পর্কিত AST নিচে দেখানো হলো:

![AST](./ast.png)

স্লিদার solc দ্বারা এক্সপোর্ট করা AST ব্যবহার করে।

তৈরি করা সহজ হলেও, AST হলো একটি নেস্টেড স্ট্রাকচার। অনেক সময়, এটি বিশ্লেষণ করা সবচেয়ে সহজ কাজ নয়। উদাহরণস্বরূপ, `a + b <= a` এক্সপ্রেশন দ্বারা ব্যবহৃত অপারেশনগুলো শনাক্ত করতে, আপনাকে প্রথমে `<=` এবং তারপর `+` বিশ্লেষণ করতে হবে। একটি সাধারণ পদ্ধতি হলো তথাকথিত ভিজিটর প্যাটার্ন ব্যবহার করা, যা ট্রির মাধ্যমে রিকার্সিভভাবে নেভিগেট করে। স্লিদারে [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)-এ একটি জেনেরিক ভিজিটর রয়েছে।

নিচের কোডটি এক্সপ্রেশনে কোনো যোগ (addition) আছে কিনা তা শনাক্ত করতে `ExpressionVisitor` ব্যবহার করে:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression হলো সেই এক্সপ্রেশন যা টেস্ট করা হবে
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### কন্ট্রোল ফ্লো গ্রাফ (CFG) {#control-flow-graph-cfg}

দ্বিতীয় সবচেয়ে সাধারণ কোড রিপ্রেজেন্টেশন হলো কন্ট্রোল ফ্লো গ্রাফ (CFG)। নাম থেকেই বোঝা যায়, এটি একটি গ্রাফ-ভিত্তিক রিপ্রেজেন্টেশন যা সমস্ত এক্সিকিউশন পাথ প্রকাশ করে। প্রতিটি নোডে এক বা একাধিক ইন্সট্রাকশন থাকে। গ্রাফের এজগুলো কন্ট্রোল ফ্লো অপারেশন (if/then/else, loop ইত্যাদি) উপস্থাপন করে। আমাদের আগের উদাহরণের CFG হলো:

![CFG](./cfg.png)

CFG হলো সেই রিপ্রেজেন্টেশন যার উপর ভিত্তি করে বেশিরভাগ অ্যানালাইসিস তৈরি করা হয়।

আরও অনেক কোড রিপ্রেজেন্টেশন রয়েছে। আপনি যে অ্যানালাইসিস করতে চান তার উপর ভিত্তি করে প্রতিটি রিপ্রেজেন্টেশনের সুবিধা এবং অসুবিধা রয়েছে।

### অ্যানালাইসিস {#analysis}

স্লিদার দিয়ে আপনি যে সবচেয়ে সহজ ধরনের অ্যানালাইসিস করতে পারেন তা হলো সিনট্যাকটিক অ্যানালাইসিস।

### সিনট্যাক্স অ্যানালাইসিস {#syntax-analysis}

স্লিদার প্যাটার্ন ম্যাচিং-এর মতো পদ্ধতি ব্যবহার করে অসঙ্গতি এবং ত্রুটি খুঁজে বের করতে কোডের বিভিন্ন উপাদান এবং তাদের রিপ্রেজেন্টেশনের মাধ্যমে নেভিগেট করতে পারে।

উদাহরণস্বরূপ, নিচের ডিটেক্টরগুলো সিনট্যাক্স-সম্পর্কিত সমস্যাগুলো খোঁজে:

- [স্টেট ভেরিয়েবল শ্যাডোয়িং](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): সমস্ত স্টেট ভেরিয়েবলের উপর ইটারেট করে এবং চেক করে যে কোনোটি ইনহেরিট করা কন্ট্রাক্ট থেকে কোনো ভেরিয়েবলকে শ্যাডো করে কিনা ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [ভুল ERC20 ইন্টারফেস](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): ভুল ERC20 ফাংশন সিগনেচার খোঁজে ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### সিমেন্টিক অ্যানালাইসিস {#semantic-analysis}

সিনট্যাক্স অ্যানালাইসিসের বিপরীতে, একটি সিমেন্টিক অ্যানালাইসিস আরও গভীরে যাবে এবং কোডের "অর্থ" বিশ্লেষণ করবে। এই পরিবারে কিছু বিস্তৃত ধরনের অ্যানালাইসিস অন্তর্ভুক্ত রয়েছে। এগুলো আরও শক্তিশালী এবং দরকারী ফলাফলের দিকে নিয়ে যায়, তবে এগুলো লেখাও আরও জটিল।

সবচেয়ে উন্নত দুর্বলতা শনাক্তকরণের জন্য সিমেন্টিক অ্যানালাইসিস ব্যবহার করা হয়।

#### ডেটা ডিপেন্ডেন্সি অ্যানালাইসিস {#fixed-point-computation}

একটি ভেরিয়েবল `variable_a`-কে `variable_b`-এর ডেটা-ডিপেন্ডেন্ট বলা হয় যদি এমন কোনো পাথ থাকে যার জন্য `variable_a`-এর মান `variable_b` দ্বারা প্রভাবিত হয়।

নিচের কোডে, `variable_a` হলো `variable_b`-এর উপর নির্ভরশীল:

```solidity
// ...
variable_a = variable_b + 1;
```

স্লিদারে বিল্ট-ইন [ডেটা ডিপেন্ডেন্সি](https://github.com/crytic/slither/wiki/data-dependency) ক্ষমতা রয়েছে, এর ইন্টারমিডিয়েট রিপ্রেজেন্টেশনের কারণে (পরবর্তী বিভাগে আলোচনা করা হয়েছে)।

ডেটা ডিপেন্ডেন্সি ব্যবহারের একটি উদাহরণ [বিপজ্জনক স্ট্রিক্ট ইকুয়ালিটি ডিটেক্টরে](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities) পাওয়া যেতে পারে। এখানে স্লিদার একটি বিপজ্জনক মানের সাথে স্ট্রিক্ট ইকুয়ালিটি তুলনা খুঁজবে ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), এবং ব্যবহারকারীকে জানাবে যে কোনো আক্রমণকারীকে কন্ট্রাক্টটি ফাঁদে ফেলা থেকে বিরত রাখতে `==`-এর পরিবর্তে `>=` বা `<=` ব্যবহার করা উচিত। অন্যান্য বিষয়ের মধ্যে, ডিটেক্টরটি `balanceOf(address)`-এ কলের রিটার্ন ভ্যালুকে বিপজ্জনক হিসেবে বিবেচনা করবে ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), এবং এর ব্যবহার ট্র্যাক করতে ডেটা ডিপেন্ডেন্সি ইঞ্জিন ব্যবহার করবে।

#### ফিক্সড-পয়েন্ট কম্পিউটেশন {#fixed-point-computation}

যদি আপনার অ্যানালাইসিস CFG-এর মাধ্যমে নেভিগেট করে এবং এজগুলো অনুসরণ করে, তবে আপনি সম্ভবত ইতিমধ্যে ভিজিট করা নোডগুলো দেখতে পাবেন। উদাহরণস্বরূপ, যদি নিচে দেখানো লুপটি উপস্থিত থাকে:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

আপনার অ্যানালাইসিসকে জানতে হবে কখন থামতে হবে। এখানে দুটি প্রধান কৌশল রয়েছে: (1) প্রতিটি নোডে একটি নির্দিষ্ট সংখ্যক বার ইটারেট করা, (2) একটি তথাকথিত _ফিক্সপয়েন্ট_ গণনা করা। একটি ফিক্সপয়েন্ট মূলত বোঝায় যে এই নোডটি বিশ্লেষণ করা কোনো অর্থপূর্ণ তথ্য প্রদান করে না।

রিএন্ট্রান্সি ডিটেক্টরগুলোতে ব্যবহৃত ফিক্সপয়েন্টের একটি উদাহরণ পাওয়া যেতে পারে: স্লিদার নোডগুলো এক্সপ্লোর করে এবং এক্সটার্নাল কল, স্টোরেজে রাইট এবং রিড খোঁজে। একবার এটি একটি ফিক্সপয়েন্টে পৌঁছালে ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), এটি এক্সপ্লোরেশন থামিয়ে দেয় এবং বিভিন্ন রিএন্ট্রান্সি প্যাটার্নের মাধ্যমে কোনো রিএন্ট্রান্সি উপস্থিত আছে কিনা তা দেখতে ফলাফলগুলো বিশ্লেষণ করে ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py))।

দক্ষ ফিক্সড পয়েন্ট কম্পিউটেশন ব্যবহার করে অ্যানালাইসিস লেখার জন্য অ্যানালাইসিস কীভাবে এর তথ্য প্রচার করে সে সম্পর্কে ভালো ধারণা থাকা প্রয়োজন।

### ইন্টারমিডিয়েট রিপ্রেজেন্টেশন {#intermediate-representation}

একটি ইন্টারমিডিয়েট রিপ্রেজেন্টেশন (IR) হলো এমন একটি ভাষা যা মূল ভাষার চেয়ে স্ট্যাটিক অ্যানালাইসিসের জন্য বেশি উপযোগী। স্লিদার সলিডিটিকে এর নিজস্ব IR-এ অনুবাদ করে: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)।

আপনি যদি শুধুমাত্র বেসিক চেক লিখতে চান তবে SlithIR বোঝার প্রয়োজন নেই। তবে, আপনি যদি উন্নত সিমেন্টিক অ্যানালাইসিস লেখার পরিকল্পনা করেন তবে এটি কাজে আসবে। [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) এবং [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) প্রিন্টারগুলো আপনাকে কোড কীভাবে অনুবাদ করা হয় তা বুঝতে সাহায্য করবে।

## এপিআই (API) বেসিকস {#api-basics}

স্লিদারে একটি API রয়েছে যা আপনাকে কন্ট্রাক্ট এবং এর ফাংশনগুলোর বেসিক অ্যাট্রিবিউটগুলো এক্সপ্লোর করতে দেয়।

একটি কোডবেস লোড করতে:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### কন্ট্রাক্ট এবং ফাংশন এক্সপ্লোর করা {#exploring-contracts-and-functions}

একটি `Slither` অবজেক্টে থাকে:

- `contracts (list(Contract)`: কন্ট্রাক্টের তালিকা
- `contracts_derived (list(Contract)`: এমন কন্ট্রাক্টের তালিকা যা অন্য কোনো কন্ট্রাক্ট দ্বারা ইনহেরিট করা হয়নি (কন্ট্রাক্টের সাবসেট)
- `get_contract_from_name (str)`: নাম থেকে একটি কন্ট্রাক্ট রিটার্ন করে

একটি `Contract` অবজেক্টে থাকে:

- `name (str)`: কন্ট্রাক্টের নাম
- `functions (list(Function))`: ফাংশনের তালিকা
- `modifiers (list(Modifier))`: ফাংশনের তালিকা
- `all_functions_called (list(Function/Modifier))`: কন্ট্রাক্ট দ্বারা পৌঁছানো যায় এমন সমস্ত ইন্টারনাল ফাংশনের তালিকা
- `inheritance (list(Contract))`: ইনহেরিট করা কন্ট্রাক্টের তালিকা
- `get_function_from_signature (str)`: সিগনেচার থেকে একটি ফাংশন রিটার্ন করে
- `get_modifier_from_signature (str)`: সিগনেচার থেকে একটি মডিফায়ার রিটার্ন করে
- `get_state_variable_from_name (str)`: নাম থেকে একটি StateVariable রিটার্ন করে

একটি `Function` বা `Modifier` অবজেক্টে থাকে:

- `name (str)`: ফাংশনের নাম
- `contract (contract)`: যে কন্ট্রাক্টে ফাংশনটি ডিক্লেয়ার করা হয়েছে
- `nodes (list(Node))`: ফাংশন/মডিফায়ারের CFG গঠনকারী নোডগুলোর তালিকা
- `entry_point (Node)`: CFG-এর এন্ট্রি পয়েন্ট
- `variables_read (list(Variable))`: রিড করা ভেরিয়েবলের তালিকা
- `variables_written (list(Variable))`: রাইট করা ভেরিয়েবলের তালিকা
- `state_variables_read (list(StateVariable))`: রিড করা স্টেট ভেরিয়েবলের তালিকা (variables`read-এর সাবসেট)
- `state_variables_written (list(StateVariable))`: রাইট করা স্টেট ভেরিয়েবলের তালিকা (variables`written-এর সাবসেট)