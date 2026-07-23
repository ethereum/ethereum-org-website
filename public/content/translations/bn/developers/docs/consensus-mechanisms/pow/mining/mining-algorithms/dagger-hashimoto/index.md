---
title: Dagger-Hashimoto
description: "Dagger-Hashimoto অ্যালগরিদমের একটি বিস্তারিত রূপ।"
lang: bn
---

Dagger-Hashimoto ছিল ইথেরিয়াম-এর মাইনিং অ্যালগরিদমের মূল গবেষণা বাস্তবায়ন এবং স্পেসিফিকেশন। Dagger-Hashimoto-এর জায়গা নেয় [ইথহ্যাশ](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash)। 15 সেপ্টেম্বর 2022-এ [দ্য মার্জ](/roadmap/merge/)-এ মাইনিং সম্পূর্ণভাবে বন্ধ করে দেওয়া হয়েছিল। তারপর থেকে, ইথেরিয়াম এর পরিবর্তে একটি [প্রুফ-অফ-স্টেক (PoS)](/developers/docs/consensus-mechanisms/pos) মেকানিজম ব্যবহার করে সুরক্ষিত করা হয়েছে। এই পৃষ্ঠাটি ঐতিহাসিক আগ্রহের জন্য - এখানকার তথ্য পোস্ট-মার্জ ইথেরিয়াম-এর জন্য আর প্রাসঙ্গিক নয়।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালোভাবে বোঝার জন্য, আমরা সুপারিশ করছি যে আপনি প্রথমে [প্রুফ-অফ-ওয়ার্ক (PoW) ঐক্যমত](/developers/docs/consensus-mechanisms/pow), [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining), এবং [মাইনিং অ্যালগরিদম](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) সম্পর্কে পড়ুন।

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto দুটি লক্ষ্য পূরণের উদ্দেশ্য রাখে:

1.  **ASIC-প্রতিরোধ**: অ্যালগরিদমের জন্য বিশেষায়িত হার্ডওয়্যার তৈরি করার সুবিধা যতটা সম্ভব কম হওয়া উচিত
2.  **লাইট ক্লায়েন্ট যাচাইযোগ্যতা**: একটি ব্লক একটি লাইট ক্লায়েন্ট দ্বারা দক্ষতার সাথে যাচাইযোগ্য হওয়া উচিত।

একটি অতিরিক্ত পরিবর্তনের সাথে, আমরা ইচ্ছা করলে কীভাবে তৃতীয় লক্ষ্য পূরণ করা যায় তাও নির্দিষ্ট করি, তবে অতিরিক্ত জটিলতার মূল্যে:

**সম্পূর্ণ চেইন স্টোরেজ**: মাইনিং-এর জন্য সম্পূর্ণ ব্লকচেইন স্টেট সংরক্ষণের প্রয়োজন হওয়া উচিত (ইথেরিয়াম স্টেট ট্রাই-এর অনিয়মিত কাঠামোর কারণে, আমরা অনুমান করি যে কিছু প্রুনিং সম্ভব হবে, বিশেষ করে কিছু প্রায়শই ব্যবহৃত চুক্তির ক্ষেত্রে, তবে আমরা এটি কমিয়ে আনতে চাই)।

## DAG তৈরি {#dag-generation}

অ্যালগরিদমের কোডটি নিচে Python-এ সংজ্ঞায়িত করা হবে। প্রথমে, আমরা নির্দিষ্ট নির্ভুলতার আনসাইনড ইন্টগুলিকে স্ট্রিং-এ রূপান্তর করার জন্য `encode_int` দিই। এর বিপরীতটিও দেওয়া হলো:

```python
NUM_BITS = 512

def encode_int(x):
    "Encode an integer x as a string of 64 characters using a big-endian scheme"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Unencode an integer x from a string using a big-endian scheme"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

এরপর আমরা ধরে নিই যে `sha3` হলো এমন একটি ফাংশন যা একটি পূর্ণসংখ্যা নেয় এবং একটি পূর্ণসংখ্যা আউটপুট দেয়, এবং `dbl_sha3` হলো একটি ডাবল-sha3 ফাংশন; যদি এই রেফারেন্স কোডটিকে একটি বাস্তবায়নে রূপান্তর করতে হয় তবে ব্যবহার করুন:

```python
from pyethereum import utils
def sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(x))

def dbl_sha3(x):
    if isinstance(x, (int, long)):
        x = encode_int(x)
    return decode_int(utils.sha3(utils.sha3(x)))
```

### প্যারামিটার {#parameters}

অ্যালগরিদমের জন্য ব্যবহৃত প্যারামিটারগুলি হলো:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 এর চেয়ে ছোট সবচেয়ে বড় সেফ প্রাইম

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # ডেটাসেটের আকার (৪ গিগাবাইট); অবশ্যই 65536 এর গুণিতক হতে হবে
      "n_inc": 65536,                   # প্রতি পিরিয়ডে n এর মান বৃদ্ধি; অবশ্যই 65536 এর গুণিতক হতে হবে
                                        # epochtime=20000 এর সাথে প্রতি বছর 882 MB বৃদ্ধি পায়
      "cache_size": 2500,               # লাইট ক্লায়েন্টের ক্যাশের আকার (লাইট দ্বারা বেছে নেওয়া যেতে পারে
                                        # ক্লায়েন্ট; অ্যালগো স্পেকের অংশ নয়)
      "diff": 2**14,                    # কাঠিন্য (ব্লক মূল্যায়নের সময় সমন্বয় করা হয়)
      "epochtime": 100000,              # ব্লকগুলোতে একটি ইপকের দৈর্ঘ্য (কত ঘন ঘন ডেটাসেট আপডেট করা হয়)
      "k": 1,                           # একটি নোডের প্যারেন্টের সংখ্যা
      "w": w,                          # মডুলার এক্সপোনেনসিয়েশন হ্যাশিং এর জন্য ব্যবহৃত হয়
      "accesses": 200,                  # হাশিমোটো চলাকালীন ডেটাসেট অ্যাক্সেসের সংখ্যা
      "P": SAFE_PRIME_512               # হ্যাশিং এবং র‍্যান্ডম নম্বর জেনারেশনের জন্য সেফ প্রাইম
}
```

এই ক্ষেত্রে `P` হলো এমন একটি মৌলিক সংখ্যা যা এমনভাবে বেছে নেওয়া হয়েছে যাতে `log₂(P)` 512-এর চেয়ে সামান্য কম হয়, যা আমাদের সংখ্যাগুলিকে উপস্থাপন করতে ব্যবহৃত 512 বিটের সাথে মিলে যায়। মনে রাখবেন যে DAG-এর শুধুমাত্র শেষ অর্ধেকটি আসলে সংরক্ষণ করা প্রয়োজন, তাই ডি-ফ্যাক্টো RAM-এর প্রয়োজনীয়তা 1 GB থেকে শুরু হয় এবং প্রতি বছর 441 MB করে বৃদ্ধি পায়।

### ড্যাগার গ্রাফ তৈরি {#dagger-graph-building}

ড্যাগার গ্রাফ তৈরির প্রিমিটিভটি নিম্নরূপ সংজ্ঞায়িত করা হয়েছে:

```python
def produce_dag(params, seed, length):
    P = params["P"]
    picker = init = pow(sha3(seed), params["w"], P)
    o = [init]
    for i in range(1, length):
        x = picker = (picker * init) % P
        for _ in range(params["k"]):
            x ^= o[x % i]
        o.append(pow(x, params["w"], P))
    return o
```

মূলত, এটি একটি গ্রাফকে একটি একক নোড, `sha3(seed)` হিসাবে শুরু করে এবং সেখান থেকে পূর্ববর্তী এলোমেলো নোডগুলির উপর ভিত্তি করে ক্রমান্বয়ে অন্যান্য নোড যোগ করতে শুরু করে। যখন একটি নতুন নোড তৈরি করা হয়, তখন `i`-এর চেয়ে কম কিছু সূচক এলোমেলোভাবে নির্বাচন করার জন্য সিডের একটি মডুলার পাওয়ার গণনা করা হয় (উপরের `x % i` ব্যবহার করে), এবং সেই সূচকগুলিতে থাকা নোডগুলির মানগুলি `x`-এর জন্য একটি নতুন মান তৈরি করার জন্য একটি গণনায় ব্যবহৃত হয়, যা পরে সূচক `i`-এ গ্রাফের মান চূড়ান্তভাবে তৈরি করার জন্য একটি ছোট প্রুফ-অফ-ওয়ার্ক (PoW) ফাংশনে (XOR-এর উপর ভিত্তি করে) দেওয়া হয়। এই নির্দিষ্ট ডিজাইনের পেছনের যুক্তি হলো DAG-এর অনুক্রমিক অ্যাক্সেস বাধ্য করা; বর্তমান মান জানা না যাওয়া পর্যন্ত DAG-এর পরবর্তী যে মানটি অ্যাক্সেস করা হবে তা নির্ধারণ করা যায় না। সবশেষে, মডুলার এক্সপোনেনসিয়েশন ফলাফলটিকে আরও হ্যাশ করে।

এই অ্যালগরিদমটি সংখ্যা তত্ত্বের বেশ কয়েকটি ফলাফলের উপর নির্ভর করে। আলোচনার জন্য নিচের পরিশিষ্টটি দেখুন।

## লাইট ক্লায়েন্ট মূল্যায়ন {#light-client-evaluation}

উপরের গ্রাফ নির্মাণের উদ্দেশ্য হলো গ্রাফের প্রতিটি নোডকে শুধুমাত্র অল্প সংখ্যক নোডের একটি সাবট্রি গণনা করে পুনর্গঠন করার অনুমতি দেওয়া এবং এর জন্য শুধুমাত্র অল্প পরিমাণ সহায়ক মেমরির প্রয়োজন হয়। মনে রাখবেন যে k=1 এর সাথে, সাবট্রিটি শুধুমাত্র DAG-এর প্রথম উপাদান পর্যন্ত যাওয়া মানগুলির একটি চেইন।

DAG-এর জন্য লাইট ক্লায়েন্ট কম্পিউটিং ফাংশনটি নিম্নরূপ কাজ করে:

```python
def quick_calc(params, seed, p):
    w, P = params["w"], params["P"]
    cache = {}

    def quick_calc_cached(p):
        if p in cache:
            pass
        elif p == 0:
            cache[p] = pow(sha3(seed), w, P)
        else:
            x = pow(sha3(seed), (p + 1) * w, P)
            for _ in range(params["k"]):
                x ^= quick_calc_cached(x % p)
            cache[p] = pow(x, w, P)
        return cache[p]

    return quick_calc_cached(p)
```

মূলত, এটি কেবল উপরের অ্যালগরিদমের একটি পুনর্লিখন যা সম্পূর্ণ DAG-এর মান গণনা করার লুপটি সরিয়ে দেয় এবং পূর্ববর্তী নোড লুকআপকে একটি রিকার্সিভ কল বা ক্যাশে লুকআপ দিয়ে প্রতিস্থাপন করে। মনে রাখবেন যে `k=1`-এর জন্য ক্যাশে অপ্রয়োজনীয়, যদিও আরও একটি অপ্টিমাইজেশন আসলে DAG-এর প্রথম কয়েক হাজার মান আগে থেকেই গণনা করে এবং গণনার জন্য সেটিকে একটি স্ট্যাটিক ক্যাশে হিসাবে রাখে; এর একটি কোড বাস্তবায়নের জন্য পরিশিষ্টটি দেখুন।

## DAG-এর ডাবল বাফার {#double-buffer}

একটি সম্পূর্ণ ক্লায়েন্টে, উপরের সূত্র দ্বারা উৎপাদিত 2টি DAG-এর একটি [_ডাবল বাফার_](https://wikipedia.org/wiki/Multiple_buffering) ব্যবহার করা হয়। ধারণাটি হলো উপরের প্যারামিটারগুলি অনুসারে প্রতি `epochtime` সংখ্যক ব্লকে DAG তৈরি করা হয়। ক্লায়েন্ট সর্বশেষ উৎপাদিত DAG ব্যবহার করার পরিবর্তে, এটি আগেরটি ব্যবহার করে। এর সুবিধা হলো এটি সময়ের সাথে সাথে DAG-গুলিকে প্রতিস্থাপন করার অনুমতি দেয় এমন কোনো পদক্ষেপ অন্তর্ভুক্ত করার প্রয়োজন ছাড়াই যেখানে মাইনারদের হঠাৎ করে সমস্ত ডেটা পুনরায় গণনা করতে হবে। অন্যথায়, নিয়মিত বিরতিতে চেইন প্রক্রিয়াকরণে হঠাৎ অস্থায়ী ধীরগতি এবং নাটকীয়ভাবে কেন্দ্রীকরণ বৃদ্ধির সম্ভাবনা থাকে। ফলে সমস্ত ডেটা পুনরায় গণনা করার আগে সেই কয়েক মিনিটের মধ্যে 51% আক্রমণের ঝুঁকি থাকে।

একটি ব্লকের জন্য কাজ গণনা করতে ব্যবহৃত DAG-এর সেট তৈরি করতে ব্যবহৃত অ্যালগরিদমটি নিম্নরূপ:

```python
def get_prevhash(n):
    from pyethereum.blocks import GENESIS_PREVHASH
    from pyethereum import chain_manager
    if n <= 0:
        return hash_to_int(GENESIS_PREVHASH)
    else:
        prevhash = chain_manager.index.get_block_by_number(n - 1)
        return decode_int(prevhash)

def get_seedset(params, block):
    seedset = {}
    seedset["back_number"] = block.number - (block.number % params["epochtime"])
    seedset["back_hash"] = get_prevhash(seedset["back_number"])
    seedset["front_number"] = max(seedset["back_number"] - params["epochtime"], 0)
    seedset["front_hash"] = get_prevhash(seedset["front_number"])
    return seedset

def get_dagsize(params, block):
    return params["n"] + (block.number // params["epochtime"]) * params["n_inc"]

def get_daggerset(params, block):
    dagsz = get_dagsize(params, block)
    seedset = get_seedset(params, block)
    if seedset["front_hash"] <= 0:
        # কোনো ব্যাক বাফার সম্ভব নয়, শুধু ফ্রন্ট বাফার তৈরি করুন
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

মূল Hashimoto-এর পেছনের ধারণাটি হলো ব্লকচেইনকে একটি ডেটাসেট হিসাবে ব্যবহার করা, এমন একটি গণনা সম্পাদন করা যা ব্লকচেইন থেকে N সূচক নির্বাচন করে, সেই সূচকগুলিতে লেনদেনগুলি সংগ্রহ করে, এই ডেটার একটি XOR সম্পাদন করে এবং ফলাফলের হ্যাশ প্রদান করে। Thaddeus Dryja-এর মূল অ্যালগরিদম, সামঞ্জস্যের জন্য Python-এ অনুবাদ করা হয়েছে, তা নিম্নরূপ:

```python
def orig_hashimoto(prev_hash, merkle_root, list_of_transactions, nonce):
    hash_output_A = sha256(prev_hash + merkle_root + nonce)
    txid_mix = 0
    for i in range(64):
        shifted_A = hash_output_A >> i
        transaction = shifted_A % len(list_of_transactions)
        txid_mix ^= list_of_transactions[transaction] << i
    return txid_mix ^ (nonce << 192)
```

দুর্ভাগ্যবশত, যদিও Hashimoto-কে RAM হার্ড বলে মনে করা হয়, এটি 256-বিট পাটিগণিতের উপর নির্ভর করে, যার যথেষ্ট গণনামূলক ওভারহেড রয়েছে। তবে, Dagger-Hashimoto এই সমস্যাটি সমাধানের জন্য এর ডেটাসেট ইনডেক্স করার সময় শুধুমাত্র সবচেয়ে কম তাৎপর্যপূর্ণ 64 বিট ব্যবহার করে।

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ডাবল SHA3-এর ব্যবহার এক ধরণের জিরো-ডেটা, প্রায়-তাত্ক্ষণিক প্রাক-যাচাইকরণের অনুমতি দেয়, যা শুধুমাত্র যাচাই করে যে একটি সঠিক মধ্যবর্তী মান প্রদান করা হয়েছিল। প্রুফ-অফ-ওয়ার্ক (PoW)-এর এই বাইরের স্তরটি অত্যন্ত ASIC-বান্ধব এবং মোটামুটি দুর্বল, তবে এটি DDoS-কে আরও কঠিন করে তোলার জন্য বিদ্যমান কারণ এমন একটি ব্লক তৈরি করার জন্য সেই সামান্য পরিমাণ কাজ করতে হবে যা অবিলম্বে প্রত্যাখ্যান করা হবে না। এখানে লাইট-ক্লায়েন্ট সংস্করণটি দেওয়া হলো:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## মাইনিং এবং যাচাইকরণ {#mining-and-verifying}

এখন, আসুন আমরা সবগুলোকে একসাথে মাইনিং অ্যালগরিদমে রাখি:

```python
def mine(daggerset, params, block):
    from random import randint
    nonce = randint(0, 2**64)
    while 1:
        result = hashimoto(daggerset, get_dagsize(params, block),
                           params, decode_int(block.prevhash), nonce)
        if result * params["diff"] < 2**256:
            break
        nonce += 1
        if nonce >= 2**64:
            nonce = 0
    return nonce
```

এখানে যাচাইকরণ অ্যালগরিদমটি দেওয়া হলো:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

লাইট-ক্লায়েন্ট বান্ধব যাচাইকরণ:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

এছাড়াও, মনে রাখবেন যে Dagger-Hashimoto ব্লক হেডারে অতিরিক্ত প্রয়োজনীয়তা আরোপ করে:

- দ্বি-স্তর যাচাইকরণ কাজ করার জন্য, একটি ব্লক হেডারে অবশ্যই নন্স এবং মধ্যবর্তী মান pre-sha3 উভয়ই থাকতে হবে
- কোথাও, একটি ব্লক হেডারকে অবশ্যই বর্তমান সিডসেটের sha3 সংরক্ষণ করতে হবে

## আরও পড়ুন {#further-reading}

_আপনাকে সাহায্য করেছে এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## পরিশিষ্ট {#appendix}

উপরে যেমন উল্লেখ করা হয়েছে, DAG তৈরির জন্য ব্যবহৃত RNG সংখ্যা তত্ত্বের কিছু ফলাফলের উপর নির্ভর করে। প্রথমত, আমরা এই আশ্বাস প্রদান করি যে Lehmer RNG যা `picker` ভেরিয়েবলের ভিত্তি, তার একটি বিস্তৃত সময়কাল রয়েছে। দ্বিতীয়ত, আমরা দেখাই যে `pow(x,3,P)` `x`-কে `1` বা `P-1`-এ ম্যাপ করবে না যদি শুরুতে `x ∈ [2,P-2]` প্রদান করা হয়। সবশেষে, আমরা দেখাই যে একটি হ্যাশ ফাংশন হিসাবে বিবেচনা করা হলে `pow(x,3,P)`-এর সংঘর্ষের হার কম।

### Lehmer র্যান্ডম নম্বর জেনারেটর {#lehmer-random-number}

যদিও `produce_dag` ফাংশনটির নিরপেক্ষ র্যান্ডম সংখ্যা তৈরি করার প্রয়োজন নেই, একটি সম্ভাব্য হুমকি হলো যে `seed**i % P` শুধুমাত্র মুষ্টিমেয় কিছু মান গ্রহণ করে। এটি সেই মাইনারদের সুবিধা প্রদান করতে পারে যারা প্যাটার্নটি চিনতে পারে, তাদের তুলনায় যারা পারে না।

এটি এড়াতে, সংখ্যা তত্ত্বের একটি ফলাফলের আবেদন করা হয়। একটি [_নিরাপদ মৌলিক সংখ্যা (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime)-কে এমন একটি মৌলিক সংখ্যা `P` হিসাবে সংজ্ঞায়িত করা হয় যাতে `(P-1)/2`-ও মৌলিক হয়। [মাল্টিপ্লিকেটিভ গ্রুপ](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ`-এর একটি সদস্য `x`-এর _অর্ডার_ হলো ন্যূনতম `m` যাতে <pre>xᵐ mod P ≡ 1</pre>
এই সংজ্ঞাগুলি দেওয়া হলে, আমরা পাই:

> পর্যবেক্ষণ 1. ধরা যাক `x` একটি নিরাপদ মৌলিক সংখ্যা `P`-এর জন্য মাল্টিপ্লিকেটিভ গ্রুপ `ℤ/Pℤ`-এর একটি সদস্য। যদি `x mod P ≠ 1 mod P` এবং `x mod P ≠ P-1 mod P` হয়, তবে `x`-এর অর্ডার হয় `P-1` অথবা `(P-1)/2` হবে।

_প্রমাণ_। যেহেতু `P` একটি নিরাপদ মৌলিক সংখ্যা, তাই [Lagrange's Theorem][lagrange] দ্বারা আমরা পাই যে `x`-এর অর্ডার হয় `1`, `2`, `(P-1)/2`, অথবা `P-1`।

`x`-এর অর্ডার `1` হতে পারে না, কারণ Fermat's Little Theorem দ্বারা আমরা পাই:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

অতএব `x`-কে অবশ্যই `ℤ/nℤ`-এর একটি মাল্টিপ্লিকেটিভ আইডেন্টিটি হতে হবে, যা অনন্য। যেহেতু আমরা অনুমান করে নিয়েছি যে `x ≠ 1`, তাই এটি সম্ভব নয়।

`x`-এর অর্ডার `2` হতে পারে না যদি না `x = P-1` হয়, কারণ এটি `P` মৌলিক হওয়ার শর্ত লঙ্ঘন করবে।

উপরের প্রস্তাবনা থেকে, আমরা বুঝতে পারি যে `(picker * init) % P` পুনরাবৃত্তি করলে এর সাইকেল দৈর্ঘ্য কমপক্ষে `(P-1)/2` হবে। এর কারণ হলো আমরা `P`-কে এমন একটি নিরাপদ মৌলিক সংখ্যা হিসাবে নির্বাচন করেছি যা প্রায় দুই-এর উচ্চতর পাওয়ারের সমান, এবং `init` `[2,2**256+1]` ব্যবধানে রয়েছে। `P`-এর মাত্রা বিবেচনা করে, আমাদের কখনই মডুলার এক্সপোনেনসিয়েশন থেকে একটি সাইকেল আশা করা উচিত নয়।

যখন আমরা DAG-এ প্রথম সেলটি (ভেরিয়েবল যার লেবেল `init`) বরাদ্দ করছি, তখন আমরা `pow(sha3(seed) + 2, 3, P)` গণনা করি। প্রথম নজরে, এটি গ্যারান্টি দেয় না যে ফলাফলটি `1` বা `P-1` কোনোটিই নয়। তবে, যেহেতু `P-1` একটি নিরাপদ মৌলিক সংখ্যা, তাই আমাদের কাছে নিম্নলিখিত অতিরিক্ত আশ্বাস রয়েছে, যা পর্যবেক্ষণ 1-এর একটি অনুসিদ্ধান্ত:

> পর্যবেক্ষণ 2. ধরা যাক `x` একটি নিরাপদ মৌলিক সংখ্যা `P`-এর জন্য মাল্টিপ্লিকেটিভ গ্রুপ `ℤ/Pℤ`-এর একটি সদস্য, এবং ধরা যাক `w` একটি স্বাভাবিক সংখ্যা। যদি `x mod P ≠ 1 mod P` এবং `x mod P ≠ P-1 mod P` হয়, সেইসাথে `w mod P ≠ P-1 mod P` এবং `w mod P ≠ 0 mod P` হয়, তবে `xʷ mod P ≠ 1 mod P` এবং `xʷ mod P ≠ P-1 mod P`

### একটি হ্যাশ ফাংশন হিসাবে মডুলার এক্সপোনেনসিয়েশন {#modular-exponentiation}

`P` এবং `w`-এর নির্দিষ্ট মানগুলির জন্য, `pow(x, w, P)` ফাংশনে অনেক সংঘর্ষ হতে পারে। উদাহরণস্বরূপ, `pow(x,9,19)` শুধুমাত্র `{1,18}` মানগুলি গ্রহণ করে।

যেহেতু `P` মৌলিক, তাই একটি মডুলার এক্সপোনেনসিয়েশন হ্যাশিং ফাংশনের জন্য একটি উপযুক্ত `w` নিম্নলিখিত ফলাফল ব্যবহার করে বেছে নেওয়া যেতে পারে:

> পর্যবেক্ষণ 3. ধরা যাক `P` একটি মৌলিক সংখ্যা; `w` এবং `P-1` আপেক্ষিকভাবে মৌলিক হবে যদি এবং কেবল যদি `ℤ/Pℤ`-এ সমস্ত `a` এবং `b`-এর জন্য:<center>`aʷ mod P ≡ bʷ mod P` হয় যদি এবং কেবল যদি `a mod P ≡ b mod P` হয়</center>

সুতরাং, যেহেতু `P` মৌলিক এবং `w` `P-1`-এর সাথে আপেক্ষিকভাবে মৌলিক, তাই আমরা পাই যে `|{pow(x, w, P) : x ∈ ℤ}| = P`, যার অর্থ হলো হ্যাশিং ফাংশনটির সম্ভাব্য ন্যূনতম সংঘর্ষের হার রয়েছে।

বিশেষ ক্ষেত্রে যেখানে `P` একটি নিরাপদ মৌলিক সংখ্যা যেমনটি আমরা নির্বাচন করেছি, তখন `P-1`-এর শুধুমাত্র 1, 2, `(P-1)/2` এবং `P-1` ফ্যাক্টর রয়েছে। যেহেতু `P` > 7, আমরা জানি যে 3 `P-1`-এর সাথে আপেক্ষিকভাবে মৌলিক, তাই `w=3` উপরের প্রস্তাবনাটি পূরণ করে।

## আরও দক্ষ ক্যাশে-ভিত্তিক মূল্যায়ন অ্যালগরিদম {#cache-based-evaluation}

```python
def quick_calc(params, seed, p):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_calc_cached(cache, params, p)

def quick_calc_cached(cache, params, p):
    P = params["P"]
    if p < len(cache):
        return cache[p]
    else:
        x = pow(cache[0], p + 1, P)
        for _ in range(params["k"]):
            x ^= quick_calc_cached(cache, params, x % p)
        return pow(x, params["w"], P)

def quick_hashimoto(seed, dagsize, params, header, nonce):
    cache = produce_dag(params, seed, params["cache_size"])
    return quick_hashimoto_cached(cache, dagsize, params, header, nonce)

def quick_hashimoto_cached(cache, dagsize, params, header, nonce):
    m = dagsize // 2
    mask = 2**64 - 1
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc_cached(cache, params, m + (mix & mask) % m)
    return dbl_sha3(mix)
```