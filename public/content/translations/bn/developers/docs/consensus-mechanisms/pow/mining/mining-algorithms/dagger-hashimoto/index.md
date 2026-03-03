---
title: Dagger-Hashimoto
description: "Dagger-Hashimoto অ্যালগরিদমের একটি বিশদ আলোচনা।"
lang: bn
---

Dagger-Hashimoto ছিল Ethereum-এর মাইনিং অ্যালগরিদমের জন্য মূল গবেষণা বাস্তবায়ন এবং স্পেসিফিকেশন। Dagger-Hashimoto [Ethash](#ethash) দ্বারা প্রতিস্থাপিত হয়েছিল। ১৫ই সেপ্টেম্বর ২০২২-এ [The Merge](/roadmap/merge/)-এ মাইনিং সম্পূর্ণভাবে বন্ধ করে দেওয়া হয়েছিল। তারপর থেকে, Ethereum পরিবর্তে একটি [প্রুফ-অফ-স্টেক](/developers/docs/consensus-mechanisms/pos) মেকানিজম ব্যবহার করে সুরক্ষিত হয়েছে। এই পৃষ্ঠাটি ঐতিহাসিক আগ্রহের জন্য - এখানে থাকা তথ্যগুলি মার্জ-পরবর্তী Ethereum-এর জন্য আর প্রাসঙ্গিক নয়।

## পূর্বশর্ত {#prerequisites}

এই পৃষ্ঠাটি আরও ভালভাবে বোঝার জন্য, আমরা আপনাকে প্রথমে [প্রুফ-অফ-ওয়ার্ক কনসেন্সাস](/developers/docs/consensus-mechanisms/pow), [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining), এবং [মাইনিং অ্যালগরিদম](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) সম্পর্কে পড়ার পরামর্শ দিই।

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto দুটি লক্ষ্য পূরণের লক্ষ্য রাখে:

1. **ASIC-প্রতিরোধ**: অ্যালগরিদমের জন্য বিশেষ হার্ডওয়্যার তৈরির সুবিধা যতটা সম্ভব কম হওয়া উচিত।
2. **লাইট ক্লায়েন্ট যাচাইযোগ্যতা**: একটি ব্লক একটি লাইট ক্লায়েন্ট দ্বারা দক্ষতার সাথে যাচাইযোগ্য হওয়া উচিত।

একটি অতিরিক্ত পরিবর্তনের সাথে, আমরা আরও নির্দিষ্ট করি যে ইচ্ছা হলে কীভাবে তৃতীয় লক্ষ্য পূরণ করা যায়, তবে অতিরিক্ত জটিলতার মূল্যে:

**সম্পূর্ণ চেইন স্টোরেজ**: মাইনিংয়ের জন্য সম্পূর্ণ ব্লকচেইন স্টেটের স্টোরেজ প্রয়োজন হবে (Ethereum স্টেট ট্রাই-এর অনিয়মিত কাঠামোর কারণে, আমরা আশা করি যে কিছু ছাঁটাই সম্ভব হবে, বিশেষ করে কিছু প্রায়শই ব্যবহৃত চুক্তির ক্ষেত্রে, তবে আমরা এটি কমানো করতে চাই)।

## DAG জেনারেশন {#dag-generation}

অ্যালগরিদমের জন্য কোডটি নিচে পাইথনে সংজ্ঞায়িত করা হবে। প্রথমে, আমরা নির্দিষ্ট নির্ভুলতার আনসাইন্ড পূর্ণসংখ্যাকে স্ট্রিং-এ মার্শালিং করার জন্য `encode_int` প্রদান করি। এর বিপরীতটিও দেওয়া হল:

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

আমরা এরপরে ধরে নিই যে `sha3` একটি ফাংশন যা একটি পূর্ণসংখ্যা নেয় এবং একটি পূর্ণসংখ্যা আউটপুট দেয়, এবং `dbl_sha3` একটি ডাবল-sha3 ফাংশন; যদি এই রেফারেন্স কোডটিকে একটি বাস্তবায়নে রূপান্তর করা হয় তবে ব্যবহার করুন:

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

অ্যালগরিদমের জন্য ব্যবহৃত প্যারামিটারগুলি হল:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Largest Safe Prime less than 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Size of the dataset (4 Gigabytes); MUST BE MULTIPLE OF 65536
      "n_inc": 65536,                   # Increment in value of n per period; MUST BE MULTIPLE OF 65536
                                        # with epochtime=20000 gives 882 MB growth per year
      "cache_size": 2500,               # Size of the light client's cache (can be chosen by light
                                        # client; not part of the algo spec)
      "diff": 2**14,                    # Difficulty (adjusted during block evaluation)
      "epochtime": 100000,              # Length of an epoch in blocks (how often the dataset is updated)
      "k": 1,                           # Number of parents of a node
      "w": w,                          # Used for modular exponentiation hashing
      "accesses": 200,                  # Number of dataset accesses during hashimoto
      "P": SAFE_PRIME_512               # Safe Prime for hashing and random number generation
}
```

`P` এই ক্ষেত্রে এমন একটি প্রাইম যা এমনভাবে বেছে নেওয়া হয়েছে যে `log₂(P)` 512-এর চেয়ে সামান্য কম, যা আমাদের সংখ্যাগুলিকে উপস্থাপন করার জন্য আমরা যে 512 বিট ব্যবহার করছি তার সাথে সঙ্গতিপূর্ণ। লক্ষ্য করুন যে DAG-এর শুধুমাত্র শেষার্ধটি সঞ্চয় করা প্রয়োজন, তাই ডি-ফ্যাক্টো RAM-এর প্রয়োজনীয়তা 1 GB থেকে শুরু হয় এবং প্রতি বছর 441 MB বৃদ্ধি পায়।

### ডেগার গ্রাফ বিল্ডিং {#dagger-graph-building}

ডেগার গ্রাফ বিল্ডিং প্রিমিটিভটি নিম্নরূপ সংজ্ঞায়িত করা হয়েছে:

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

মূলত, এটি একটি গ্রাফকে একটি একক নোড, `sha3(seed)` হিসাবে শুরু করে এবং সেখান থেকে এলোমেলো পূর্ববর্তী নোডের উপর ভিত্তি করে ক্রমানুসারে অন্যান্য নোড যুক্ত করা শুরু করে। যখন একটি নতুন নোড তৈরি করা হয়, তখন `i`-এর চেয়ে কম কিছু সূচক এলোমেলোভাবে নির্বাচন করার জন্য সিডের একটি মডুলার পাওয়ার গণনা করা হয় (উপরে `x % i` ব্যবহার করে), এবং সেই সূচকে থাকা নোডগুলির মানগুলি একটি গণনায় ব্যবহার করা হয় `x`-এর জন্য একটি নতুন মান তৈরি করতে, যা পরে একটি ছোট প্রুফ অফ ওয়ার্ক ফাংশনে (XOR-এর উপর ভিত্তি করে) ফিড করা হয় যাতে অবশেষে সূচক `i`-তে গ্রাফের মান তৈরি করা যায়। এই বিশেষ ডিজাইনের পিছনে যুক্তি হল DAG-এর অনুক্রমিক অ্যাক্সেস জোর করা; DAG-এর পরবর্তী মান যা অ্যাক্সেস করা হবে তা বর্তমান মান না জানা পর্যন্ত নির্ধারণ করা যাবে না। অবশেষে, মডুলার এক্সপোনেনশিয়েশন ফলাফলটিকে আরও হ্যাস করে।

এই অ্যালগরিদম সংখ্যা তত্ত্বের বেশ কয়েকটি ফলাফলের উপর নির্ভর করে। আলোচনার জন্য নীচের পরিশিষ্ট দেখুন।

## লাইট ক্লায়েন্ট মূল্যায়ন {#light-client-evaluation}

উপরের গ্রাফ নির্মাণটি গ্রাফের প্রতিটি নোডকে শুধুমাত্র অল্প সংখ্যক নোডের একটি সাবট্রি গণনা করে এবং শুধুমাত্র অল্প পরিমাণে সহায়ক মেমরির প্রয়োজন করে পুনর্গঠন করার অনুমতি দেওয়ার উদ্দেশ্যে করা হয়েছে। লক্ষ্য করুন যে k=1 হলে, সাবট্রিটি DAG-এর প্রথম উপাদান পর্যন্ত যাওয়া মানগুলির একটি চেইন মাত্র।

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

মূলত, এটি উপরের অ্যালগরিদমের একটি পুনর্লিখন যা সম্পূর্ণ DAG-এর জন্য মান গণনা করার লুপটি সরিয়ে দেয় এবং পূর্ববর্তী নোড লুকআপকে একটি পুনরাবৃত্তিমূলক কল বা একটি ক্যাশে লুকআপ দিয়ে প্রতিস্থাপন করে। লক্ষ্য করুন যে `k=1`-এর জন্য ক্যাশে অপ্রয়োজনীয়, যদিও একটি আরও অপ্টিমাইজেশান আসলে DAG-এর প্রথম কয়েক হাজার মান প্রিকম্পিউট করে এবং সেটিকে গণনার জন্য একটি স্ট্যাটিক ক্যাশে হিসাবে রাখে; এর একটি কোড বাস্তবায়নের জন্য পরিশিষ্ট দেখুন।

## DAG-এর ডাবল বাফার {#double-buffer}

একটি সম্পূর্ণ ক্লায়েন্টে, উপরের সূত্র দ্বারা উৎপাদিত 2টি DAG-এর একটি [_ডাবল বাফার_](https://wikipedia.org/wiki/Multiple_buffering) ব্যবহার করা হয়। ধারণাটি হল যে উপরের প্যারাম অনুযায়ী প্রতি `epochtime` সংখ্যক ব্লক অন্তর DAG তৈরি করা হয়। ক্লায়েন্ট সর্বশেষ উৎপাদিত DAG ব্যবহার করার পরিবর্তে, এটি পূর্ববর্তীটি ব্যবহার করে। এর সুবিধা হল এটি সময়ের সাথে সাথে DAG-গুলিকে প্রতিস্থাপন করার অনুমতি দেয় এমন একটি ধাপ অন্তর্ভুক্ত করার প্রয়োজন ছাড়াই যেখানে মাইনারদের হঠাৎ করে সমস্ত ডেটা পুনরায় গণনা করতে হবে। অন্যথায়, নিয়মিত বিরতিতে চেইন প্রক্রিয়াকরণে একটি আকস্মিক অস্থায়ী মন্দার সম্ভাবনা রয়েছে এবং নাটকীয়ভাবে কেন্দ্রীকরণ বৃদ্ধি পায়। এইভাবে সমস্ত ডেটা পুনরায় গণনা করার আগে সেই কয়েক মিনিটের মধ্যে 51% আক্রমণের ঝুঁকি থাকে।

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
        # No back buffer is possible, just make front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## হ্যাশিমোটো {#hashimoto}

আসল হ্যাশিমোটোর পিছনের ধারণাটি হল ব্লকচেইনকে একটি ডেটাসেট হিসাবে ব্যবহার করা, একটি গণনা সম্পাদন করা যা ব্লকচেইন থেকে N সূচক নির্বাচন করে, সেই সূচকগুলিতে লেনদেন সংগ্রহ করে, এই ডেটার একটি XOR সম্পাদন করে এবং ফলাফলের হ্যাস প্রদান করে। থ্যাডিউস ড্রায়জার আসল অ্যালগরিদম, সামঞ্জস্যের জন্য পাইথনে অনূদিত, নিম্নরূপ:

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

দুর্ভাগ্যবশত, যদিও হ্যাশিমোটোকে RAM হার্ড হিসাবে বিবেচনা করা হয়, এটি 256-বিট গাণিতিকের উপর নির্ভর করে, যার যথেষ্ট গণনামূলক ওভারহেড রয়েছে। যাইহোক, Dagger-Hashimoto এই সমস্যাটি সমাধান করার জন্য তার ডেটাসেটকে ইন্ডেক্স করার সময় শুধুমাত্র সর্বনিম্ন গুরুত্বপূর্ণ 64 বিট ব্যবহার করে।

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ডাবল SHA3-এর ব্যবহার জিরো-ডেটা, প্রায়-তাত্ক্ষণিক প্রাক-যাচাইকরণের একটি ফর্মের অনুমতি দেয়, শুধুমাত্র এটি যাচাই করে যে একটি সঠিক মধ্যবর্তী মান প্রদান করা হয়েছিল। প্রুফ-অফ-ওয়ার্কের এই বাইরের লেয়ারটি অত্যন্ত ASIC-বান্ধব এবং মোটামুটি দুর্বল, তবে এটি DDoS-কে আরও কঠিন করার জন্য বিদ্যমান কারণ একটি ব্লক তৈরি করার জন্য সেই অল্প পরিমাণ কাজ অবশ্যই করতে হবে যা অবিলম্বে বাতিল করা হবে না। এখানে লাইট-ক্লায়েন্ট সংস্করণটি রয়েছে:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## মাইনিং এবং যাচাইকরণ {#mining-and-verifying}

এখন, আসুন আমরা সবকিছু একসাথে মাইনিং অ্যালগরিদমে রাখি:

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

এখানে যাচাইকরণ অ্যালগরিদমটি রয়েছে:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

লাইট-ক্লায়েন্ট বন্ধুত্বপূর্ণ যাচাইকরণ:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

এছাড়াও, মনে রাখবেন যে Dagger-Hashimoto ব্লক হেডারের উপর অতিরিক্ত প্রয়োজনীয়তা আরোপ করে:

- দুই-স্তরীয় যাচাইকরণের কাজ করার জন্য, একটি ব্লক হেডারে অবশ্যই ননস এবং মধ্যবর্তী মান উভয়ই প্রাক-sha3 থাকতে হবে।
- কোথাও, একটি ব্লক হেডারকে অবশ্যই বর্তমান সিডসেটের sha3 সংরক্ষণ করতে হবে।

## আরও পড়ুন {#further-reading}

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পৃষ্ঠাটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## পরিশিষ্ট {#appendix}

উপরে উল্লিখিত হিসাবে, DAG প্রজন্মের জন্য ব্যবহৃত RNG সংখ্যা তত্ত্বের কিছু ফলাফলের উপর নির্ভর করে। প্রথমত, আমরা নিশ্চিত করি যে লেহমার আরএনজি যা `picker` ভেরিয়েবলের ভিত্তি তার একটি বিস্তৃত সময়কাল রয়েছে। দ্বিতীয়ত, আমরা দেখাই যে `pow(x,3,P)` `x`-কে `1` বা `P-1`-এ ম্যাপ করবে না যদি `x ∈ [2,P-2]` দিয়ে শুরু করা হয়। অবশেষে, আমরা দেখাই যে হ্যাশিং ফাংশন হিসাবে ব্যবহার করা হলে `pow(x,3,P)`-এর সংঘর্ষের হার কম থাকে।

### লেহমার র‍্যান্ডম নম্বর জেনারেটর {#lehmer-random-number}

যদিও `produce_dag` ফাংশনটিকে নিরপেক্ষ র‍্যান্ডম সংখ্যা তৈরি করতে হবে না, একটি সম্ভাব্য হুমকি হল `seed**i % P` শুধুমাত্র মুষ্টিমেয় কিছু মান নেয়। এটি প্যাটার্নটি চিনতে পারা মাইনারদের জন্য একটি সুবিধা প্রদান করতে পারে যারা তা করে না।

এটি এড়াতে, সংখ্যা তত্ত্বের একটি ফলাফলের সাহায্য নেওয়া হয়। একটি [_সেফ প্রাইম_](https://en.wikipedia.org/wiki/Safe_prime)-কে একটি প্রাইম `P` হিসাবে সংজ্ঞায়িত করা হয় যাতে `(P-1)/2`ও প্রাইম হয়। [গুণক গ্রুপ](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ`-এর একটি সদস্য `x`-এর _ক্রম_ কে ন্যূনতম `m` হিসাবে সংজ্ঞায়িত করা হয় যেমন <pre>xᵐ mod P ≡ 1</pre>
এই সংজ্ঞাগুলি দেওয়া হলে, আমরা পাই:

> পর্যবেক্ষণ ১। ধরা যাক, `x` একটি সেফ প্রাইম `P`-এর জন্য গুণক গ্রুপ `ℤ/Pℤ`-এর একটি সদস্য। যদি `x mod P ≠ 1 mod P` এবং `x mod P ≠ P-1 mod P` হয়, তাহলে `x`-এর ক্রম হয় `P-1` অথবা `(P-1)/2` হবে।

_প্রমাণ_। যেহেতু `P` একটি সেফ প্রাইম, তাই [লাগ্রাঞ্জের উপপাদ্য][lagrange] দ্বারা আমরা পাই যে `x`-এর ক্রম হয় `1`, `2`, `(P-1)/2`, অথবা `P-1`।

`x`-এর ক্রম `1` হতে পারে না, যেহেতু ফার্মার ছোট উপপাদ্য দ্বারা আমরা পাই:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

অতএব, `x` অবশ্যই `ℤ/nℤ`-এর একটি গুণক পরিচয় হতে হবে, যা অনন্য। যেহেতু আমরা ধরে নিয়েছি যে `x ≠ 1`, তাই এটি সম্ভব নয়।

`x`-এর ক্রম `2` হতে পারে না যদি না `x = P-1` হয়, কারণ এটি `P`-এর প্রাইম হওয়ার বিষয়টিকে লঙ্ঘন করবে।

উপরের প্রস্তাবনা থেকে, আমরা বুঝতে পারি যে `(picker * init) % P`-এর পুনরাবৃত্তির একটি চক্র দৈর্ঘ্য অন্তত `(P-1)/2` হবে। এর কারণ হল আমরা `P`-কে দুইয়ের একটি উচ্চতর পাওয়ারের প্রায় সমান একটি সেফ প্রাইম হিসাবে নির্বাচন করেছি, এবং `init` ব্যবধান `[2,2**256+1]`-এর মধ্যে রয়েছে। `P`-এর বিশালতার পরিপ্রেক্ষিতে, আমাদের মডুলার এক্সপোনেনশিয়েশন থেকে কোনো চক্র আশা করা উচিত নয়।

যখন আমরা DAG-এর প্রথম সেলটি নির্ধারণ করছি (`init` লেবেলযুক্ত ভেরিয়েবল), আমরা `pow(sha3(seed) + 2, 3, P)` গণনা করি। প্রথম নজরে, এটি গ্যারান্টি দেয় না যে ফলাফলটি `1` বা `P-1` কোনোটিই নয়। যাইহোক, যেহেতু `P-1` একটি সেফ প্রাইম, আমাদের কাছে নিম্নলিখিত অতিরিক্ত আশ্বাস রয়েছে, যা পর্যবেক্ষণ ১-এর একটি উপসিদ্ধান্ত:

> পর্যবেক্ষণ ২। ধরা যাক, `x` একটি সেফ প্রাইম `P`-এর জন্য গুণক গ্রুপ `ℤ/Pℤ`-এর একটি সদস্য, এবং ধরা যাক `w` একটি স্বাভাবিক সংখ্যা। যদি `x mod P ≠ 1 mod P` এবং `x mod P ≠ P-1 mod P` হয়, এবং সেইসাথে `w mod P ≠ P-1 mod P` এবং `w mod P ≠ 0 mod P` হয়, তাহলে `xʷ mod P ≠ 1 mod P` এবং `xʷ mod P ≠ P-1 mod P` হবে।

### একটি হ্যাস ফাংশন হিসাবে মডুলার এক্সপোনেনসিয়েশন {#modular-exponentiation}

`P` এবং `w`-এর নির্দিষ্ট মানের জন্য, `pow(x, w, P)` ফাংশনে অনেক সংঘর্ষ হতে পারে। উদাহরণস্বরূপ, `pow(x,9,19)` শুধুমাত্র `{1,18}` মানগুলি নেয়।

যেহেতু `P` প্রাইম, তাই একটি মডুলার এক্সপোনেনশিয়েশন হ্যাশিং ফাংশনের জন্য একটি উপযুক্ত `w` নিম্নলিখিত ফলাফল ব্যবহার করে বেছে নেওয়া যেতে পারে:

> পর্যবেক্ষণ ৩। ধরা যাক, `P` একটি প্রাইম; `w` এবং `P-1` তুলনামূলকভাবে প্রাইম হবে যদি এবং কেবল যদি `ℤ/Pℤ`-এর সমস্ত `a` এবং `b`-এর জন্য:<center>`aʷ mod P ≡ bʷ mod P` হয় যদি এবং কেবল যদি `a mod P ≡ b mod P` হয়</center>

এইভাবে, যেহেতু `P` প্রাইম এবং `w` `P-1`-এর সাথে তুলনামূলকভাবে প্রাইম, আমরা পাই যে `|{pow(x, w, P) : x ∈ ℤ}| = P`, যা বোঝায় যে হ্যাশিং ফাংশনের সম্ভাব্য সর্বনিম্ন সংঘর্ষের হার রয়েছে।

বিশেষ ক্ষেত্রে যখন `P` আমাদের নির্বাচিত সেফ প্রাইম, তখন `P-1`-এর শুধুমাত্র উৎপাদক 1, 2, `(P-1)/2` এবং `P-1` থাকে। যেহেতু `P` > 7, আমরা জানি যে 3 `P-1`-এর সাথে তুলনামূলকভাবে প্রাইম, তাই `w=3` উপরের প্রস্তাবনাটি পূরণ করে।

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
