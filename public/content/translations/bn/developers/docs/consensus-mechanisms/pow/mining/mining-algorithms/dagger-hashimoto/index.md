---
title: "ড্যাগার-হাশিমোতো"
description: "ড্যাগার-হাশিমোতো এ্যালগরিদম সম্পর্কে একটি বিস্তারিত আলোচনা।"
lang: bn
---

ড্যাগার-হাশিমোতো ছিল ইথিরিয়ামের মাইনিং এ্যালগরিদমের মূল গবেষণা বাস্তবায়ন এবং স্পেসিফিকেশন। ড্যাগার-হাশিমোতো পরবর্তীতে [Ethash](#ethash) দ্বারা প্রতিস্থাপিত হয়। ১৫ই সেপ্টেম্বর ২০২২-এ [The Merge](/roadmap/merge/)-এর মাধ্যমে মাইনিং সম্পূর্ণভাবে বন্ধ করে দেওয়া হয়। এরপর থেকে, ইথিরিয়ামকে সুরক্ষিত করার জন্য এর পরিবর্তে একটি [প্রুফ-অফ-স্টেক](/developers/docs/consensus-mechanisms/pos) মেকানিজম ব্যবহার করা হচ্ছে। এই পেজটি ঐতিহাসিক আগ্রহের জন্য - এখানকার তথ্যগুলো মার্জ-পরবর্তী ইথিরিয়ামের জন্য আর প্রাসঙ্গিক নয়।

## পূর্বশর্ত {#prerequisites}

এই পেজটি ভালোভাবে বোঝার জন্য, আমরা সুপারিশ করছি যে আপনি প্রথমে [প্রুফ-অফ-ওয়ার্ক কনসেন্সাস](/developers/docs/consensus-mechanisms/pow), [মাইনিং](/developers/docs/consensus-mechanisms/pow/mining), এবং [মাইনিং এ্যালগরিদম](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) সম্পর্কে পড়ে নিন।

## ড্যাগার-হাশিমোতো {#dagger-hashimoto}

ড্যাগার-হাশিমোতো দুটি লক্ষ্য পূরণের উদ্দেশ্যে তৈরি:

1.  **ASIC-প্রতিরোধ (ASIC-resistance)**: এ্যালগরিদমের জন্য বিশেষায়িত হার্ডওয়্যার তৈরি করার সুবিধা যতটা সম্ভব কম হওয়া উচিত
2.  **লাইট ক্লায়েন্ট যাচাইযোগ্যতা (Light client verifiability)**: একটি ব্লক একটি লাইট ক্লায়েন্ট দ্বারা দক্ষতার সাথে যাচাইযোগ্য হওয়া উচিত।

একটি অতিরিক্ত পরিবর্তনের মাধ্যমে, আমরা প্রয়োজনে কীভাবে তৃতীয় একটি লক্ষ্য পূরণ করা যায় তাও নির্দিষ্ট করি, তবে এর জন্য অতিরিক্ত জটিলতা স্বীকার করতে হবে:

**সম্পূর্ণ চেইন স্টোরেজ (Full chain storage)**: মাইনিং এর জন্য সম্পূর্ণ ব্লকচেইন স্টেট সংরক্ষণ করা প্রয়োজন (ইথিরিয়াম স্টেট ট্রাই-এর অনিয়মিত কাঠামোর কারণে, আমরা আশা করি যে কিছু প্রুনিং বা ছাঁটাই সম্ভব হবে, বিশেষ করে কিছু বহুল ব্যবহৃত কন্ট্রাক্টের ক্ষেত্রে, তবে আমরা এটি ন্যূনতম রাখতে চাই)।

## ড্যাগ (DAG) জেনারেশন {#dag-generation}

এ্যালগরিদমের কোডটি নিচে পাইথনে সংজ্ঞায়িত করা হবে। প্রথমে, আমরা নির্দিষ্ট নির্ভুলতার আনসাইনড ইন্টিজারগুলোকে স্ট্রিংয়ে রূপান্তর করার জন্য `encode_int` দিচ্ছি। এর বিপরীতটিও দেওয়া হলো:

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

এরপর আমরা ধরে নিচ্ছি যে `sha3` হলো এমন একটি ফাংশন যা একটি ইন্টিজার ইনপুট নেয় এবং একটি ইন্টিজার আউটপুট দেয়, এবং `dbl_sha3` হলো একটি ডাবল-sha3 ফাংশন; যদি এই রেফারেন্স কোডটিকে একটি বাস্তবায়নে রূপান্তর করতে চান তবে ব্যবহার করুন:

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

এ্যালগরিদমের জন্য ব্যবহৃত প্যারামিটারগুলো হলো:

```python
SAFE_PRIME_512 = 2**512 - 38117 # 2**512 এর চেয়ে ছোট সবচেয়ে বড় সেফ প্রাইম

params = {
      "n": 4000055296 * 8 // NUM_BITS, # ডেটাসেটের আকার (৪ গিগাবাইট); অবশ্যই ৬৫৫৩৬ এর গুণিতক হতে হবে
      "n_inc": 65536, # প্রতি পিরিয়ডে n এর মান বৃদ্ধি; অবশ্যই ৬৫৫৩৬ এর গুণিতক হতে হবে
                                        # epochtime=20000 এর সাথে প্রতি বছর ৮৮২ মেগাবাইট (MB) বৃদ্ধি পায়
      "cache_size": 2500, # লাইট ক্লায়েন্টের ক্যাশের আকার (লাইট দ্বারা নির্বাচন করা যেতে পারে
                                        # ক্লায়েন্ট; অ্যালগো স্পেকের অংশ নয়)
      "diff": 2**14, # ডিফিকাল্টি (ব্লক মূল্যায়নের সময় সমন্বয় করা হয়)
      "epochtime": 100000, # ব্লকে একটি ইপকের দৈর্ঘ্য (কত ঘন ঘন ডেটাসেট আপডেট করা হয়)
      "k": 1, # একটি নোডের প্যারেন্টের সংখ্যা
      "w": w, # মডুলার এক্সপোনেনসিয়েশন হ্যাসিং এর জন্য ব্যবহৃত হয়
      "accesses": 200, # হ্যাসিমোতো এর সময় ডেটাসেট অ্যাক্সেসের সংখ্যা
      "P": SAFE_PRIME_512 # হ্যাসিং এবং র‍্যান্ডম নম্বর জেনারেশনের জন্য সেফ প্রাইম
}
```

এই ক্ষেত্রে `P` হলো এমন একটি মৌলিক সংখ্যা (prime) যা এমনভাবে বেছে নেওয়া হয়েছে যেন `log₂(P)` ৫১২-এর চেয়ে সামান্য কম হয়, যা আমাদের সংখ্যাগুলোকে উপস্থাপন করতে ব্যবহৃত ৫১২ বিটের সাথে মিলে যায়। মনে রাখবেন যে ড্যাগ (DAG)-এর শুধুমাত্র শেষ অর্ধেক অংশটি সংরক্ষণ করা প্রয়োজন, তাই ডি-ফ্যাক্টো RAM-এর প্রয়োজনীয়তা 1 GB থেকে শুরু হয় এবং প্রতি বছর 441 MB করে বৃদ্ধি পায়।

### ড্যাগার গ্রাফ তৈরি {#dagger-graph-building}

ড্যাগার গ্রাফ তৈরির প্রাথমিক রূপটি নিচে সংজ্ঞায়িত করা হলো:

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

মূলত, এটি একটি গ্রাফকে একটি একক নোড, `sha3(seed)` হিসেবে শুরু করে এবং সেখান থেকে পূর্ববর্তী র্যান্ডম নোডগুলোর ওপর ভিত্তি করে ক্রমান্বয়ে অন্যান্য নোড যোগ করতে থাকে। যখন একটি নতুন নোড তৈরি হয়, তখন `i`-এর চেয়ে ছোট কিছু সূচক (index) র্যান্ডমভাবে নির্বাচন করার জন্য সিডের একটি মডুলার পাওয়ার গণনা করা হয় (উপরে `x % i` ব্যবহার করে), এবং সেই সূচকগুলোতে থাকা নোডগুলোর মান ব্যবহার করে `x`-এর জন্য একটি নতুন মান তৈরি করার হিসাব করা হয়, যা পরে একটি ছোট প্রুফ-অফ-ওয়ার্ক ফাংশনে (XOR-এর ওপর ভিত্তি করে) পাঠানো হয় যাতে শেষ পর্যন্ত `i` সূচকে গ্রাফের মান তৈরি করা যায়। এই নির্দিষ্ট ডিজাইনের পেছনের যুক্তি হলো ড্যাগ (DAG)-এর সিকোয়েন্সিয়াল অ্যাক্সেস বাধ্য করা; বর্তমান মান জানা না যাওয়া পর্যন্ত ড্যাগ-এর পরবর্তী কোন মানটি অ্যাক্সেস করা হবে তা নির্ধারণ করা যায় না। সবশেষে, মডুলার এক্সপোনেনসিয়েশন ফলাফলটিকে আরও হ্যাস করে।

এই এ্যালগরিদমটি সংখ্যাতত্ত্বের (number theory) বেশ কয়েকটি ফলাফলের ওপর নির্ভর করে। আলোচনার জন্য নিচের পরিশিষ্টটি দেখুন।

## লাইট ক্লায়েন্ট মূল্যায়ন {#light-client-evaluation}

উপরের গ্রাফ নির্মাণের উদ্দেশ্য হলো গ্রাফের প্রতিটি নোডকে শুধুমাত্র অল্প সংখ্যক নোডের একটি সাবট্রি গণনা করে পুনর্গঠন করার সুযোগ দেওয়া এবং এর জন্য শুধুমাত্র অল্প পরিমাণ সহায়ক মেমরি প্রয়োজন হয়। মনে রাখবেন যে k=1 হলে, সাবট্রিটি শুধুমাত্র ড্যাগ (DAG)-এর প্রথম উপাদান পর্যন্ত যাওয়া মানগুলোর একটি চেইন।

ড্যাগ (DAG)-এর জন্য লাইট ক্লায়েন্ট কম্পিউটিং ফাংশনটি নিচের মতো কাজ করে:

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

মূলত, এটি উপরের এ্যালগরিদমের একটি পুনর্লিখন যা সম্পূর্ণ ড্যাগ (DAG)-এর মান গণনা করার লুপটি সরিয়ে দেয় এবং পূর্ববর্তী নোড লুকআপকে একটি রিকার্সিভ কল বা ক্যাশ লুকআপ দিয়ে প্রতিস্থাপন করে। মনে রাখবেন যে `k=1`-এর জন্য ক্যাশ অপ্রয়োজনীয়, যদিও আরও অপ্টিমাইজেশনের জন্য ড্যাগ-এর প্রথম কয়েক হাজার মান আগে থেকেই গণনা করে রাখা হয় এবং গণনার জন্য সেটিকে একটি স্ট্যাটিক ক্যাশ হিসেবে রাখা হয়; এর কোড বাস্তবায়নের জন্য পরিশিষ্টটি দেখুন।

## ড্যাগ (DAG)-এর ডাবল বাফার {#double-buffer}

একটি ফুল ক্লায়েন্ট-এ, উপরের সূত্র দ্বারা উৎপাদিত ২টি ড্যাগ (DAG)-এর একটি [_ডাবল বাফার_](https://wikipedia.org/wiki/Multiple_buffering) ব্যবহার করা হয়। ধারণাটি হলো উপরের প্যারামিটার অনুযায়ী প্রতি `epochtime` সংখ্যক ব্লকস-এ ড্যাগ তৈরি হয়। ক্লায়েন্ট সর্বশেষ উৎপাদিত ড্যাগ ব্যবহার করার পরিবর্তে, এর আগেরটি ব্যবহার করে। এর সুবিধা হলো এটি সময়ের সাথে সাথে ড্যাগগুলোকে প্রতিস্থাপন করার সুযোগ দেয়, যেখানে মাইনারদের হঠাৎ করে সমস্ত ডেটা পুনরায় গণনা করার কোনো ধাপ অন্তর্ভুক্ত করার প্রয়োজন হয় না। অন্যথায়, নিয়মিত বিরতিতে চেইন প্রসেসিংয়ে হঠাৎ করে অস্থায়ী ধীরগতি এবং নাটকীয়ভাবে কেন্দ্রীকরণ বৃদ্ধির সম্ভাবনা থাকে। ফলে সমস্ত ডেটা পুনরায় গণনা করার আগের কয়েক মিনিটের মধ্যে ৫১% এ্যাটাক-এর ঝুঁকি থাকে।

একটি ব্লক-এর কাজ গণনা করতে ব্যবহৃত ড্যাগগুলোর সেট তৈরি করার এ্যালগরিদমটি নিচে দেওয়া হলো:

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

## হাশিমোতো {#hashimoto}

মূল হাশিমোতোর পেছনের ধারণাটি হলো ব্লকচেইন-কে একটি ডেটাসেট হিসেবে ব্যবহার করা, এমন একটি গণনা করা যা ব্লকচেইন থেকে N সংখ্যক সূচক নির্বাচন করে, সেই সূচকগুলোতে থাকা লেনদেন-গুলো সংগ্রহ করে, এই ডেটার একটি XOR সম্পাদন করে এবং ফলাফলের হ্যাস ফেরত দেয়। থাডিয়াস ড্রায়ার (Thaddeus Dryja) মূল এ্যালগরিদমটি, সামঞ্জস্যের জন্য পাইথনে অনুবাদ করা হয়েছে, যা নিচে দেওয়া হলো:

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

দুর্ভাগ্যবশত, যদিও হাশিমোতোকে RAM হার্ড হিসেবে বিবেচনা করা হয়, এটি 256-বিট পাটিগণিতের ওপর নির্ভর করে, যার উল্লেখযোগ্য কম্পিউটেশনাল ওভারহেড রয়েছে। তবে, ড্যাগার-হাশিমোতো এই সমস্যা সমাধানের জন্য এর ডেটাসেট ইনডেক্স করার সময় শুধুমাত্র সবচেয়ে কম গুরুত্বপূর্ণ (least significant) 64 বিট ব্যবহার করে।

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ডাবল SHA3-এর ব্যবহার এক ধরণের জিরো-ডেটা, প্রায়-তাৎক্ষণিক প্রি-ভেরিফিকেশনের সুযোগ দেয়, যা শুধুমাত্র যাচাই করে যে একটি সঠিক মধ্যবর্তী মান প্রদান করা হয়েছিল। প্রুফ-অফ-ওয়ার্ক-এর এই বাইরের স্তরটি অত্যন্ত ASIC-বান্ধব এবং বেশ দুর্বল, তবে এটি DDoS-কে আরও কঠিন করার জন্য বিদ্যমান, কারণ একটি ব্লক তৈরি করতে সেই সামান্য পরিমাণ কাজ অবশ্যই করতে হবে যা তাৎক্ষণিকভাবে প্রত্যাখ্যাত হবে না। নিচে লাইট-ক্লায়েন্ট সংস্করণটি দেওয়া হলো:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## মাইনিং এবং যাচাইকরণ {#mining-and-verifying}

এখন, চলুন সবকিছু একসাথে করে মাইনিং এ্যালগরিদম-এ রূপ দিই:

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

নিচে যাচাইকরণ এ্যালগরিদমটি দেওয়া হলো:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

লাইট-ক্লায়েন্ট বান্ধব যাচাইকরণ:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

এছাড়াও, মনে রাখবেন যে ড্যাগার-হাশিমোতো ব্লক হেডারের ওপর অতিরিক্ত প্রয়োজনীয়তা আরোপ করে:

- দুই-স্তরের যাচাইকরণ কাজ করার জন্য, একটি ব্লক হেডারে অবশ্যই নন্স এবং মধ্যবর্তী মান pre-sha3 উভয়ই থাকতে হবে
- কোনো এক জায়গায়, একটি ব্লক হেডারকে অবশ্যই বর্তমান সিডসেটের sha3 সংরক্ষণ করতে হবে

## আরও পড়ুন {#further-reading}

_এমন কোনো কমিউনিটি রিসোর্স সম্পর্কে জানেন যা আপনাকে সাহায্য করেছে? এই পেজটি সম্পাদনা করুন এবং এটি যোগ করুন!_

## পরিশিষ্ট {#appendix}

উপরে যেমন উল্লেখ করা হয়েছে, ড্যাগ (DAG) জেনারেশনের জন্য ব্যবহৃত RNG সংখ্যাতত্ত্বের কিছু ফলাফলের ওপর নির্ভর করে। প্রথমত, আমরা এই নিশ্চয়তা প্রদান করি যে লেহমার (Lehmer) RNG, যা `picker` ভেরিয়েবলের ভিত্তি, তার একটি বিস্তৃত পর্যায় (wide period) রয়েছে। দ্বিতীয়ত, আমরা দেখাই যে `pow(x,3,P)` `x`-কে `1` বা `P-1`-এ ম্যাপ করবে না, যদি শুরুতে `x ∈ [2,P-2]` হয়। সবশেষে, আমরা দেখাই যে `pow(x,3,P)`-কে একটি হ্যাসিং ফাংশন হিসেবে বিবেচনা করা হলে এর কলিশন রেট (collision rate) কম হয়।

### লেহমার র্যান্ডম নম্বর জেনারেটর {#lehmer-random-number}

যদিও `produce_dag` ফাংশনটির আনবায়াসড (unbiased) র্যান্ডম নম্বর তৈরি করার প্রয়োজন নেই, একটি সম্ভাব্য হুমকি হলো `seed**i % P` শুধুমাত্র কয়েকটি মান গ্রহণ করে। এটি সেই মাইনারদের সুবিধা দিতে পারে যারা প্যাটার্নটি চিনতে পারে, তাদের তুলনায় যারা পারে না।

এটি এড়ানোর জন্য, সংখ্যাতত্ত্বের একটি ফলাফলের আশ্রয় নেওয়া হয়। একটি [_সেফ প্রাইম (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime)-কে এমন একটি মৌলিক সংখ্যা `P` হিসেবে সংজ্ঞায়িত করা হয় যার জন্য `(P-1)/2`-ও একটি মৌলিক সংখ্যা। [মাল্টিপ্লিকেটিভ গ্রুপ (multiplicative group)](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ`-এর একটি সদস্য `x`-এর _অর্ডার (order)_-কে ন্যূনতম `m` হিসেবে সংজ্ঞায়িত করা হয় যাতে <pre>xᵐ mod P ≡ 1</pre> হয়।
এই সংজ্ঞাগুলোর ওপর ভিত্তি করে, আমরা পাই:

> পর্যবেক্ষণ ১. ধরি `x` হলো একটি সেফ প্রাইম `P`-এর জন্য মাল্টিপ্লিকেটিভ গ্রুপ `ℤ/Pℤ`-এর একটি সদস্য। যদি `x mod P ≠ 1 mod P` এবং `x mod P ≠ P-1 mod P` হয়, তবে `x`-এর অর্ডার হবে `P-1` অথবা `(P-1)/2`।

_প্রমাণ_। যেহেতু `P` একটি সেফ প্রাইম, তাই [ল্যাগ্রাঞ্জের উপপাদ্য (Lagrange's Theorem)][lagrange] অনুযায়ী আমরা পাই যে `x`-এর অর্ডার হলো `1`, `2`, `(P-1)/2`, অথবা `P-1`।

`x`-এর অর্ডার `1` হতে পারে না, কারণ ফার্মার লিটল থিওরেম (Fermat's Little Theorem) অনুযায়ী আমরা পাই:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

অতএব `x`-কে অবশ্যই `ℤ/nℤ`-এর একটি মাল্টিপ্লিকেটিভ আইডেন্টিটি হতে হবে, যা অনন্য। যেহেতু আমরা ধরে নিয়েছি যে `x ≠ 1`, তাই এটি সম্ভব নয়।

`x`-এর অর্ডার `2` হতে পারে না যদি না `x = P-1` হয়, কারণ এটি `P` একটি মৌলিক সংখ্যা হওয়ার শর্ত লঙ্ঘন করবে।

উপরের প্রস্তাবনা থেকে, আমরা বুঝতে পারি যে `(picker * init) % P` ইটারেট করলে এর সাইকেল লেংথ (cycle length) কমপক্ষে `(P-1)/2` হবে। এর কারণ হলো আমরা `P`-কে এমন একটি সেফ প্রাইম হিসেবে নির্বাচন করেছি যা প্রায় দুই-এর একটি উচ্চ ঘাতের (higher power of two) সমান, এবং `init` হলো `[2,2**256+1]` ব্যবধানের মধ্যে। `P`-এর বিশালতার কারণে, আমাদের কখনোই মডুলার এক্সপোনেনসিয়েশন থেকে কোনো সাইকেল আশা করা উচিত নয়।

যখন আমরা ড্যাগ (DAG)-এর প্রথম সেলটি (যাকে `init` ভেরিয়েবল হিসেবে লেবেল করা হয়েছে) অ্যাসাইন করি, তখন আমরা `pow(sha3(seed) + 2, 3, P)` গণনা করি। প্রথম দেখায়, এটি গ্যারান্টি দেয় না যে ফলাফলটি `1` বা `P-1` কোনোটিই নয়। তবে, যেহেতু `P-1` একটি সেফ প্রাইম, তাই আমাদের কাছে নিচের অতিরিক্ত নিশ্চয়তা রয়েছে, যা পর্যবেক্ষণ ১-এর একটি অনুসিদ্ধান্ত:

> পর্যবেক্ষণ ২. ধরি `x` হলো একটি সেফ প্রাইম `P`-এর জন্য মাল্টিপ্লিকেটিভ গ্রুপ `ℤ/Pℤ`-এর একটি সদস্য, এবং `w` হলো একটি স্বাভাবিক সংখ্যা। যদি `x mod P ≠ 1 mod P` এবং `x mod P ≠ P-1 mod P` হয়, পাশাপাশি `w mod P ≠ P-1 mod P` এবং `w mod P ≠ 0 mod P` হয়, তবে `xʷ mod P ≠ 1 mod P` এবং `xʷ mod P ≠ P-1 mod P` হবে।

### একটি হ্যাস ফাংশন হিসেবে মডুলার এক্সপোনেনসিয়েশন {#modular-exponentiation}

`P` এবং `w`-এর নির্দিষ্ট কিছু মানের জন্য, `pow(x, w, P)` ফাংশনটিতে অনেক কলিশন (collisions) থাকতে পারে। উদাহরণস্বরূপ, `pow(x,9,19)` শুধুমাত্র `{1,18}` মানগুলো গ্রহণ করে।

যেহেতু `P` একটি মৌলিক সংখ্যা, তাই মডুলার এক্সপোনেনসিয়েশন হ্যাসিং ফাংশনের জন্য একটি উপযুক্ত `w` নিচের ফলাফলটি ব্যবহার করে বেছে নেওয়া যেতে পারে:

> পর্যবেক্ষণ ৩. ধরি `P` একটি মৌলিক সংখ্যা; `w` এবং `P-1` সহমৌলিক (relatively prime) হবে যদি এবং কেবল যদি `ℤ/Pℤ`-এর সমস্ত `a` এবং `b`-এর জন্য:<center>`aʷ mod P ≡ bʷ mod P` হয় যদি এবং কেবল যদি `a mod P ≡ b mod P` হয়</center>

সুতরাং, যেহেতু `P` একটি মৌলিক সংখ্যা এবং `w` হলো `P-1`-এর সাথে সহমৌলিক, তাই আমরা পাই যে `|{pow(x, w, P) : x ∈ ℤ}| = P`, যার অর্থ হলো হ্যাসিং ফাংশনটির কলিশন রেট সম্ভাব্য সর্বনিম্ন।

বিশেষ ক্ষেত্রে যেখানে `P` একটি সেফ প্রাইম যেমনটি আমরা নির্বাচন করেছি, তখন `P-1`-এর উৎপাদকগুলো হলো শুধুমাত্র 1, 2, `(P-1)/2` এবং `P-1`। যেহেতু `P` > 7, আমরা জানি যে 3 হলো `P-1`-এর সাথে সহমৌলিক, তাই `w=3` উপরের প্রস্তাবনাটি পূরণ করে।

## আরও দক্ষ ক্যাশ-ভিত্তিক মূল্যায়ন এ্যালগরিদম {#cache-based-evaluation}

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