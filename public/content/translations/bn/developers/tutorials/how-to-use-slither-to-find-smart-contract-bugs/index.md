---
title: "স্মার্ট কন্ট্র্যাক্ট বাগ খুঁজে বের করতে কীভাবে স্লিদার ব্যবহার করবেন"
description: "স্মার্ট কন্ট্র্যাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজে পেতে কীভাবে স্লিদার ব্যবহার করবেন"
author: Trailofbits
lang: bn
tags:
  [
    "সলিডিটি",
    "স্মার্ট কন্ট্র্যাক্ট",
    "নিরাপত্তা",
    "পরীক্ষা"
  ]
skill: advanced
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## কীভাবে স্লিদার ব্যবহার করবেন {#how-to-use-slither}

এই টিউটোরিয়ালের উদ্দেশ্য হলো স্মার্ট কন্ট্র্যাক্টে স্বয়ংক্রিয়ভাবে বাগ খুঁজে বের করতে কীভাবে স্লিদার ব্যবহার করা যায় তা দেখানো।

- [ইনস্টলেশন](#installation)
- [কমান্ড লাইন ব্যবহার](#command-line)
- [স্ট্যাটিক অ্যানালাইসিসের ভূমিকা](#static-analysis): স্ট্যাটিক অ্যানালাইসিসের সংক্ষিপ্ত ভূমিকা
- [API](#api-basics): পাইথন API-এর বর্ণনা

## ইনস্টলেশন {#installation}

স্লিদারের জন্য পাইথন >= 3.6 প্রয়োজন। এটি pip-এর মাধ্যমে বা docker ব্যবহার করে ইনস্টল করা যেতে পারে।

pip-এর মাধ্যমে স্লিদার:

```bash
pip3 install --user slither-analyzer
```

ডকারের মাধ্যমে স্লিদার:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_শেষ কমান্ডটি একটি docker-এ eth-security-toolbox চালায় যেটির আপনার বর্তমান ডিরেক্টরিতে অ্যাক্সেস আছে। আপনি আপনার হোস্ট থেকে ফাইলগুলো পরিবর্তন করতে পারেন, এবং docker থেকে ফাইলগুলোতে টুলস চালাতে পারেন_

docker-এর ভিতরে, চালান:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### একটি স্ক্রিপ্ট চালানো {#running-a-script}

python 3 দিয়ে একটি python স্ক্রিপ্ট চালাতে:

```bash
python3 script.py
```

### কমান্ড লাইন {#command-line}

**কমান্ড লাইন বনাম ব্যবহারকারী-সংজ্ঞায়িত স্ক্রিপ্ট।** স্লিদার পূর্ব-নির্ধারিত ডিটেক্টরের একটি সেট নিয়ে আসে যা অনেক সাধারণ বাগ খুঁজে পায়। কমান্ড লাইন থেকে স্লিদার কল করলে সমস্ত ডিটেক্টর চলবে, স্ট্যাটিক অ্যানালাইসিস সম্পর্কে বিস্তারিত জ্ঞানের প্রয়োজন নেই:

```bash
slither project_paths
```

ডিটেক্টর ছাড়াও, স্লিদারের [প্রিন্টার](https://github.com/crytic/slither#printers) এবং [টুলস](https://github.com/crytic/slither#tools)-এর মাধ্যমে কোড পর্যালোচনার ক্ষমতা রয়েছে।

প্রাইভেট ডিটেক্টর এবং GitHub ইন্টিগ্রেশনে অ্যাক্সেস পেতে [crytic.io](https://github.com/crytic) ব্যবহার করুন।

## স্ট্যাটিক বিশ্লেষণ {#static-analysis}

স্লিদার স্ট্যাটিক অ্যানালাইসিস ফ্রেমওয়ার্কের ক্ষমতা এবং ডিজাইন ব্লগ পোস্টে ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) এবং একটি [একাডেমিক পেপারে](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) বর্ণনা করা হয়েছে।

স্ট্যাটিক অ্যানালাইসিস বিভিন্ন ধরনের হয়ে থাকে। আপনি সম্ভবত বুঝতে পারছেন যে [clang](https://clang-analyzer.llvm.org/) এবং [gcc](https://lwn.net/Articles/806099/)-এর মতো কম্পাইলারগুলি এই গবেষণা কৌশলগুলির উপর নির্ভর করে, কিন্তু এটি ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) এবং ফর্মাল পদ্ধতির উপর ভিত্তি করে [Frama-C](https://frama-c.com/) এবং [Polyspace](https://www.mathworks.com/products/polyspace.html) -এর মতো টুলসগুলিকেও ভিত্তি করে।

আমরা এখানে স্ট্যাটিক অ্যানালাইসিস কৌশল এবং গবেষকদের পুঙ্খানুপুঙ্খভাবে পর্যালোচনা করব না। পরিবর্তে, আমরা স্লিদার কীভাবে কাজ করে তা বোঝার জন্য যা প্রয়োজন তার উপর ফোকাস করব যাতে আপনি বাগ খুঁজে পেতে এবং কোড বুঝতে এটি আরও কার্যকরভাবে ব্যবহার করতে পারেন।

- [কোড রিপ্রেজেন্টেশন](#code-representation)
- [কোড অ্যানালাইসিস](#analysis)
- [ইন্টারমিডিয়েট রিপ্রেজেন্টেশন](#intermediate-representation)

### কোড রিপ্রেজেন্টেশন {#code-representation}

ডাইনামিক অ্যানালাইসিসের বিপরীতে, যা একটি একক এক্সিকিউশন পথ সম্পর্কে যুক্তি দেয়, স্ট্যাটিক অ্যানালাইসিস একবারে সমস্ত পথ সম্পর্কে যুক্তি দেয়। এটি করার জন্য, এটি একটি ভিন্ন কোড রিপ্রেজেন্টেশনের উপর নির্ভর করে। দুটি সবচেয়ে সাধারণ হলো অ্যাবস্ট্র্যাক্ট সিনট্যাক্স ট্রি (AST) এবং কন্ট্রোল ফ্লো গ্রাফ (CFG)।

### অ্যাবস্ট্র্যাক্ট সিনট্যাক্স ট্রি (AST) {#abstract-syntax-trees-ast}

কম্পাইলার যখনই কোড পার্স করে তখনই AST ব্যবহার করা হয়। এটি সম্ভবত সবচেয়ে মৌলিক কাঠামো যার উপর স্ট্যাটিক অ্যানালাইসিস করা যেতে পারে।

সংক্ষেপে, একটি AST হলো একটি স্ট্রাকচার্ড ট্রি যেখানে, সাধারণত, প্রতিটি লিফ একটি ভেরিয়েবল বা একটি কনস্ট্যান্ট ধারণ করে এবং ইন্টারনাল নোডগুলি হলো অপারেন্ড বা কন্ট্রোল ফ্লো অপারেশন। নিম্নলিখিত কোডটি বিবেচনা করুন:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

সংশ্লিষ্ট AST দেখানো হলো:

![AST](./ast.png)

স্লিদার solc দ্বারা এক্সপোর্ট করা AST ব্যবহার করে।

তৈরি করা সহজ হলেও, AST একটি নেস্টেড কাঠামো। কখনও কখনও, এটি বিশ্লেষণ করার জন্য সবচেয়ে সহজবোধ্য নয়। উদাহরণস্বরূপ, `a + b <= a` এক্সপ্রেশন দ্বারা ব্যবহৃত অপারেশনগুলি সনাক্ত করতে, আপনাকে প্রথমে `<=` এবং তারপর `+` বিশ্লেষণ করতে হবে। একটি সাধারণ পদ্ধতি হলো তথাকথিত ভিজিটর প্যাটার্ন ব্যবহার করা, যা রিকার্সিভলি ট্রি-এর মাধ্যমে নেভিগেট করে। স্লিদার-এ [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) -তে একটি জেনেরিক ভিজিটর রয়েছে।

নিম্নলিখিত কোডটি এক্সপ্রেশনে একটি অ্যাডিশন আছে কিনা তা সনাক্ত করতে `ExpressionVisitor` ব্যবহার করে:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression হলো সেই এক্সপ্রেশন যা পরীক্ষা করা হবে
print(f'এক্সপ্রেশন {expression}-এ একটি অ্যাডিশন আছে: {visitor.result()}')
```

### কন্ট্রোল ফ্লো গ্রাফ (CFG) {#control-flow-graph-cfg}

দ্বিতীয় সবচেয়ে সাধারণ কোড রিপ্রেজেন্টেশন হলো কন্ট্রোল ফ্লো গ্রাফ (CFG)। এর নাম অনুসারে, এটি একটি গ্রাফ-ভিত্তিক রিপ্রেজেন্টেশন যা সমস্ত এক্সিকিউশন পথ প্রকাশ করে। প্রতিটি নোডে এক বা একাধিক ইন্সট্রাকশন থাকে। গ্রাফের এজগুলি কন্ট্রোল ফ্লো অপারেশন (if/then/else, loop, ইত্যাদি) উপস্থাপন করে। আমাদের আগের উদাহরণের CFG হলো:

![CFG](./cfg.png)

CFG হলো সেই রিপ্রেজেন্টেশন যার উপর ভিত্তি করে বেশিরভাগ অ্যানালাইসিস তৈরি করা হয়।

আরও অনেক কোড রিপ্রেজেন্টেশন বিদ্যমান। আপনি যে অ্যানালাইসিস করতে চান সেই অনুযায়ী প্রতিটি রিপ্রেজেন্টেশনের সুবিধা এবং অসুবিধা রয়েছে।

### অ্যানালাইসিস {#analysis}

স্লিদার দিয়ে আপনি যে সবচেয়ে সহজ ধরনের অ্যানালাইসিস করতে পারেন তা হলো সিনট্যাকটিক অ্যানালাইসিস।

### সিনট্যাক্স অ্যানালাইসিস {#syntax-analysis}

স্লিদার কোডের বিভিন্ন উপাদান এবং তাদের রিপ্রেজেন্টেশনের মাধ্যমে নেভিগেট করে প্যাটার্ন ম্যাচিং-এর মতো একটি পদ্ধতি ব্যবহার করে অসামঞ্জস্যতা এবং ত্রুটি খুঁজে বের করতে পারে।

উদাহরণস্বরূপ, নিম্নলিখিত ডিটেক্টরগুলি সিনট্যাক্স-সম্পর্কিত সমস্যাগুলি খুঁজে বের করে:

- [স্টেট ভেরিয়েবল শ্যাডোইং](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): সমস্ত স্টেট ভেরিয়েবলের উপর ইটারেট করে এবং ইনহেরিট করা কন্ট্র্যাক্টের কোনো ভেরিয়েবলকে শ্যাডো করছে কিনা তা পরীক্ষা করে ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [ভুল ERC20 ইন্টারফেস](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): ভুল ERC20 ফাংশন সিগনেচার খুঁজে বের করে ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### সেমান্টিক অ্যানালাইসিস {#semantic-analysis}

সিনট্যাক্স অ্যানালাইসিসের বিপরীতে, একটি সেমান্টিক অ্যানালাইসিস আরও গভীরে গিয়ে কোডের “অর্থ” বিশ্লেষণ করে। এই পরিবারে কিছু বিস্তৃত ধরনের অ্যানালাইসিস অন্তর্ভুক্ত রয়েছে। এগুলো আরও শক্তিশালী এবং দরকারী ফলাফলের দিকে নিয়ে যায়, কিন্তু এগুলো লেখা আরও জটিল।

সবচেয়ে উন্নত দুর্বলতা সনাক্তকরণের জন্য সেমান্টিক অ্যানালাইসিস ব্যবহার করা হয়।

#### ডেটা ডিপেন্ডেন্সি অ্যানালাইসিস {#fixed-point-computation}

একটি ভেরিয়েবল `variable_a`-কে `variable_b`-এর উপর ডেটা-ডিপেন্ডেন্ট বলা হয় যদি এমন একটি পথ থাকে যার জন্য `variable_a`-এর মান `variable_b` দ্বারা প্রভাবিত হয়।

নিম্নলিখিত কোডে, `variable_a` `variable_b`-এর উপর নির্ভরশীল:

```solidity
// ...
variable_a = variable_b + 1;
```

স্লিদার-এর বিল্ট-ইন [ডেটা ডিপেন্ডেন্সি](https://github.com/crytic/slither/wiki/data-dependency) ক্ষমতা রয়েছে, এর ইন্টারমিডিয়েট রিপ্রেজেন্টেশনের জন্য ধন্যবাদ (যা পরবর্তী বিভাগে আলোচনা করা হয়েছে)।

ডেটা ডিপেন্ডেন্সি ব্যবহারের একটি উদাহরণ [বিপজ্জনক স্ট্রিক্ট ইকুয়ালিটি ডিটেক্টর](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)-এ পাওয়া যাবে। এখানে স্লিদার একটি বিপজ্জনক মানের সাথে স্ট্রিক্ট ইকুয়ালিটি তুলনা খুঁজবে ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), এবং ব্যবহারকারীকে জানাবে যে `==`-এর পরিবর্তে `>=` বা `<=` ব্যবহার করা উচিত, যাতে একজন আক্রমণকারী কন্ট্র্যাক্টকে ফাঁদে ফেলতে না পারে। অন্যান্য বিষয়গুলির মধ্যে, ডিটেক্টর `balanceOf(address)`-এ একটি কলের রিটার্ন মানকে বিপজ্জনক হিসাবে বিবেচনা করবে ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), এবং এর ব্যবহার ট্র্যাক করতে ডেটা ডিপেন্ডেন্সি ইঞ্জিন ব্যবহার করবে।

#### ফিক্সড-পয়েন্ট কম্পিউটেশন {#fixed-point-computation}

যদি আপনার অ্যানালাইসিস CFG-এর মাধ্যমে নেভিগেট করে এবং এজগুলি অনুসরণ করে, তাহলে আপনি সম্ভবত ইতিমধ্যে ভিজিট করা নোডগুলি দেখতে পাবেন। উদাহরণস্বরূপ, যদি একটি লুপ নীচে দেখানো হিসাবে উপস্থাপন করা হয়:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

আপনার অ্যানালাইসিসকে জানতে হবে কখন থামতে হবে। এখানে দুটি প্রধান কৌশল রয়েছে: (1) প্রতিটি নোডে একটি সসীম সংখ্যক বার ইটারেট করা, (2) একটি তথাকথিত _ফিক্সপয়েন্ট_ গণনা করা। একটি ফিক্সপয়েন্ট মূলত বোঝায় যে এই নোডটি বিশ্লেষণ করা কোনো অর্থপূর্ণ তথ্য প্রদান করে না।

ফিক্সপয়েন্ট ব্যবহারের একটি উদাহরণ রিএন্ট্রেন্সি ডিটেক্টরে পাওয়া যায়: স্লিদার নোডগুলি এক্সপ্লোর করে, এবং এক্সটার্নাল কল, সংগ্রহস্থলে লেখা এবং পড়া খুঁজে বের করে। একবার এটি একটি ফিক্সপয়েন্টে পৌঁছালে ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), এটি এক্সপ্লোরেশন বন্ধ করে দেয়, এবং বিভিন্ন রিএন্ট্রেন্সি প্যাটার্নের মাধ্যমে ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) একটি রিএন্ট্রেন্সি আছে কিনা তা দেখতে ফলাফল বিশ্লেষণ করে।

কার্যকর ফিক্সড পয়েন্ট কম্পিউটেশন ব্যবহার করে অ্যানালাইসিস লেখার জন্য অ্যানালাইসিসটি কীভাবে তার তথ্য প্রচার করে সে সম্পর্কে একটি ভাল বোঝার প্রয়োজন।

### ইন্টারমিডিয়েট রিপ্রেজেন্টেশন {#intermediate-representation}

একটি ইন্টারমিডিয়েট রিপ্রেজেন্টেশন (IR) হলো এমন একটি ভাষা যা মূল ভাষার চেয়ে স্ট্যাটিক অ্যানালাইসিসের জন্য বেশি উপযোগী। স্লিদার Solidity-কে তার নিজস্ব IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR)-এ অনুবাদ করে।

আপনি যদি শুধুমাত্র বেসিক চেক লিখতে চান তবে SlithIR বোঝা প্রয়োজন নয়। তবে, আপনি যদি উন্নত সেমান্টিক অ্যানালাইসিস লেখার পরিকল্পনা করেন তবে এটি কাজে আসবে। [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) এবং [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) প্রিন্টারগুলি আপনাকে কোডটি কীভাবে অনুবাদ করা হয় তা বুঝতে সাহায্য করবে।

## API বেসিকস {#api-basics}

স্লিদারের একটি API আছে যা আপনাকে কন্ট্র্যাক্ট এবং তার ফাংশনগুলির মৌলিক বৈশিষ্ট্যগুলি এক্সপ্লোর করতে দেয়।

একটি কোডবেস লোড করতে:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### কন্ট্র্যাক্ট এবং ফাংশন এক্সপ্লোর করা {#exploring-contracts-and-functions}

একটি `Slither` অবজেক্টের আছে:

- `contracts (list(Contract)`: কন্ট্র্যাক্টের তালিকা
- `contracts_derived (list(Contract)`: এমন কন্ট্র্যাক্টের তালিকা যা অন্য কোনো কন্ট্র্যাক্ট দ্বারা ইনহেরিট করা হয়নি (কন্ট্র্যাক্টের উপসেট)
- `get_contract_from_name (str)`: তার নাম থেকে একটি কন্ট্র্যাক্ট রিটার্ন করুন

একটি `Contract` অবজেক্টের আছে:

- `name (str)`: কন্ট্র্যাক্টের নাম
- `functions (list(Function))`: ফাংশনের তালিকা
- `modifiers (list(Modifier))`: মডিফায়ারের তালিকা
- `all_functions_called (list(Function/Modifier))`: কন্ট্র্যাক্ট দ্বারা পৌঁছানো যায় এমন সমস্ত ইন্টারনাল ফাংশনের তালিকা
- `inheritance (list(Contract))`: ইনহেরিটেড কন্ট্র্যাক্টের তালিকা
- `get_function_from_signature (str)`: তার সিগনেচার থেকে একটি ফাংশন রিটার্ন করুন
- `get_modifier_from_signature (str)`: তার সিগনেচার থেকে একটি মডিফায়ার রিটার্ন করুন
- `get_state_variable_from_name (str)`: তার নাম থেকে একটি StateVariable রিটার্ন করুন

একটি `Function` বা একটি `Modifier` অবজেক্টের আছে:

- `name (str)`: ফাংশনের নাম
- `contract (contract)`: যে কন্ট্র্যাক্টে ফাংশনটি ডিক্লেয়ার করা হয়েছে
- `nodes (list(Node))`: ফাংশন/মডিফায়ারের CFG গঠনকারী নোডগুলির তালিকা
- `entry_point (Node)`: CFG-এর এন্ট্রি পয়েন্ট
- `variables_read (list(Variable))`: পড়া ভেরিয়েবলের তালিকা
- `variables_written (list(Variable))`: লেখা ভেরিয়েবলের তালিকা
- `state_variables_read (list(StateVariable))`: পড়া স্টেট ভেরিয়েবলের তালিকা (variables`read-এর উপসেট)
- `state_variables_written (list(StateVariable))`: লেখা স্টেট ভেরিয়েবলের তালিকা (variables`written-এর উপসেট)
