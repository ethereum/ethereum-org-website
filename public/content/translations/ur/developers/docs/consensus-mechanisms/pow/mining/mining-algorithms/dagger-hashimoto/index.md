---
title: Dagger-Hashimoto
description: Dagger-Hashimoto الگورتھم پر ایک تفصیلی نظر۔
lang: ur-in
---

Dagger-Hashimoto Ethereum کے مائننگ الگورتھم کے لیے اصل تحقیقی نفاذ اور تفصیلات تھیں۔ [Ethash](#ethash) نے Dagger-Hashimoto کی جگہ لے لی۔ 15 ستمبر 2022 کو [The Merge](/roadmap/merge/) پر مائننگ مکمل طور پر بند کر دی گئی تھی۔ تب سے، Ethereum کو اس کے بجائے [proof-of-stake](/developers/docs/consensus-mechanisms/pos) میکانزم کا استعمال کرکے محفوظ کیا گیا ہے۔ یہ صفحہ تاریخی دلچسپی کے لیے ہے - یہاں دی گئی معلومات The Merge کے بعد کے Ethereum کے لیے اب متعلقہ نہیں ہیں۔

## شرائط {#prerequisites}

اس صفحہ کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [proof-of-work consensus](/developers/docs/consensus-mechanisms/pow)، [مائننگ](/developers/docs/consensus-mechanisms/pow/mining)، اور [مائننگ الگورتھم](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) کے بارے میں پڑھیں۔

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto کا مقصد دو اہداف کو پورا کرنا ہے:

1. **ASIC-مزاحمت**: الگورتھم کے لیے خصوصی ہارڈ ویئر بنانے سے فائدہ ہر ممکن حد تک کم ہونا چاہیے۔
2. **لائٹ کلائنٹ کی تصدیق کی اہلیت**: ایک بلاک کی لائٹ کلائنٹ کے ذریعے مؤثر طریقے سے تصدیق کی جانی چاہیے۔

ایک اضافی ترمیم کے ساتھ، ہم یہ بھی بتاتے ہیں کہ اگر چاہیں تو تیسرے مقصد کو کیسے پورا کیا جائے، لیکن اضافی پیچیدگی کی قیمت پر:

**مکمل چین اسٹوریج**: مائننگ کے لیے مکمل بلاک چین اسٹیٹ کے اسٹوریج کی ضرورت ہونی چاہیے (Ethereum اسٹیٹ ٹرائی کی بے قاعدہ ساخت کی وجہ سے، ہم توقع کرتے ہیں کہ کچھ کانٹ چھانٹ ممکن ہو گی، خاص طور پر کچھ اکثر استعمال ہونے والے معاہدوں کی، لیکن ہم اسے کم سے کم کرنا چاہتے ہیں)۔

## DAG جنریشن {#dag-generation}

الگورتھم کا کوڈ ذیل میں Python میں بیان کیا جائے گا۔ سب سے پہلے، ہم مخصوص درستگی کے غیر دستخط شدہ انٹس کو سٹرنگز میں مارشل کرنے کے لیے `encode_int` دیتے ہیں۔ اس کا الٹا بھی دیا گیا ہے:

```python
NUM_BITS = 512

def encode_int(x):
    "ایک big-endian اسکیم کا استعمال کرتے ہوئے ایک انٹیجر x کو 64 حروف کی ایک سٹرنگ کے طور پر انکوڈ کریں"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "ایک big-endian اسکیم کا استعمال کرتے ہوئے ایک سٹرنگ سے ایک انٹیجر x کو انکوڈ کریں"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

ہم آگے یہ فرض کرتے ہیں کہ `sha3` ایک فنکشن ہے جو ایک انٹیجر لیتا ہے اور ایک انٹیجر آؤٹ پٹ کرتا ہے، اور `dbl_sha3` ایک ڈبل-sha3 فنکشن ہے؛ اگر اس حوالہ جاتی کوڈ کو نفاذ میں تبدیل کر رہے ہیں تو استعمال کریں:

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

### پیرامیٹرز {#parameters}

الگورتھم کے لیے استعمال ہونے والے پیرامیٹرز یہ ہیں:

```python
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 سے کم سب سے بڑا سیف پرائم

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # ڈیٹاسیٹ کا سائز (4 گیگا بائٹس)؛ 65536 کا ملٹیپل ہونا چاہیے
      "n_inc": 65536,                   # فی مدت n کی قدر میں اضافہ؛ 65536 کا ملٹیپل ہونا چاہیے
                                        # epochtime=20000 کے ساتھ فی سال 882 MB کی نمو دیتا ہے
      "cache_size": 2500,               # لائٹ کلائنٹ کے کیشے کا سائز (لائٹ کے ذریعے منتخب کیا جا سکتا ہے
                                        # کلائنٹ؛ الگورتھم کی تفصیلات کا حصہ نہیں)
      "diff": 2**14,                    # مشکل (بلاک کی تشخیص کے دوران ایڈجسٹ کی گئی)
      "epochtime": 100000,              # بلاکس میں ایک ایپوک کی لمبائی (ڈیٹاسیٹ کتنی بار اپ ڈیٹ ہوتا ہے)
      "k": 1,                           # ایک نوڈ کے والدین کی تعداد
      "w": w,                          # ماڈیولر ایکسپونینشن ہیشنگ کے لیے استعمال کیا جاتا ہے
      "accesses": 200,                  # ہاشیموٹو کے دوران ڈیٹاسیٹ تک رسائی کی تعداد
      "P": SAFE_PRIME_512               # ہیشنگ اور بے ترتیب نمبر بنانے کے لیے سیف پرائم
}
```

اس معاملے میں `P` ایک پرائم ہے جسے اس طرح منتخب کیا گیا ہے کہ `log₂(P)` 512 سے تھوڑا کم ہے، جو ان 512 بٹس سے مطابقت رکھتا ہے جنہیں ہم اپنے نمبروں کی نمائندگی کے لیے استعمال کر رہے ہیں۔ نوٹ کریں کہ اصل میں DAG کے صرف آخری نصف کو ذخیرہ کرنے کی ضرورت ہے، لہذا ڈی-فیکٹو RAM کی ضرورت 1 GB سے شروع ہوتی ہے اور فی سال 441 MB بڑھتی ہے۔

### Dagger گراف بنانا {#dagger-graph-building}

Dagger گراف بنانے کا پرمیٹیو مندرجہ ذیل طور پر بیان کیا گیا ہے:

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

بنیادی طور پر، یہ ایک گراف کو ایک واحد نوڈ، `sha3(seed)` کے طور پر شروع کرتا ہے، اور وہاں سے بے ترتیب پچھلے نوڈز کی بنیاد پر ترتیب وار دوسرے نوڈز کو شامل کرنا شروع کرتا ہے۔ جب ایک نیا نوڈ بنایا جاتا ہے، تو `i` سے کم کچھ انڈیکس کو بے ترتیب طور پر منتخب کرنے کے لیے سیڈ کی ایک ماڈیولر پاور کا حساب لگایا جاتا ہے (اوپر `x % i` کا استعمال کرتے ہوئے)، اور ان انڈیکس پر نوڈز کی قدروں کو `x` کے لیے ایک نئی قدر پیدا کرنے کے لیے ایک حساب میں استعمال کیا جاتا ہے، جسے پھر ایک چھوٹے پروف آف ورک فنکشن (XOR پر مبنی) میں فیڈ کیا جاتا ہے تاکہ آخر کار انڈیکس `i` پر گراف کی قدر پیدا کی جا سکے۔ اس خاص ڈیزائن کے پیچھے استدلال DAG کی ترتیب وار رسائی کو مجبور کرنا ہے؛ DAG کی اگلی قدر جس تک رسائی حاصل کی جائے گی اس کا تعین اس وقت تک نہیں کیا جا سکتا جب تک کہ موجودہ قدر معلوم نہ ہو۔ آخر میں، ماڈیولر ایکسپونینشن نتیجے کو مزید ہیش کرتا ہے۔

یہ الگورتھم نمبر تھیوری کے کئی نتائج پر انحصار کرتا ہے۔ بحث کے لیے نیچے ضمیمہ دیکھیں۔

## لائٹ کلائنٹ کی تشخیص {#light-client-evaluation}

مذکورہ بالا گراف کی تعمیر کا مقصد گراف میں ہر نوڈ کو صرف چند نوڈز کے سب ٹری کا حساب لگا کر دوبارہ تعمیر کرنے کی اجازت دینا ہے اور صرف تھوڑی مقدار میں معاون میموری کی ضرورت ہوتی ہے۔ نوٹ کریں کہ k=1 کے ساتھ، سب ٹری صرف DAG میں پہلے عنصر تک جانے والی قدروں کا ایک سلسلہ ہے۔

DAG کے لیے لائٹ کلائنٹ کمپیوٹنگ فنکشن مندرجہ ذیل طور پر کام کرتا ہے:

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

بنیادی طور پر، یہ صرف مذکورہ بالا الگورتھم کی دوبارہ تحریر ہے جو پورے DAG کے لیے قدروں کا حساب لگانے کے لوپ کو ہٹاتا ہے اور پہلے والے نوڈ لک اپ کو ریکرسیو کال یا کیشے لک اپ سے بدل دیتا ہے۔ نوٹ کریں کہ `k=1` کے لیے کیشے غیر ضروری ہے، حالانکہ مزید اصلاح اصل میں DAG کی پہلی چند ہزار قدروں کا پہلے سے حساب لگاتی ہے اور اسے حساب کے لیے ایک جامد کیشے کے طور پر رکھتی ہے؛ اس کے کوڈ کے نفاذ کے لیے ضمیمہ دیکھیں۔

## DAGs کا ڈبل بفر {#double-buffer}

ایک مکمل کلائنٹ میں، مذکورہ بالا فارمولے سے تیار کردہ 2 DAGs کا ایک [_ڈبل بفر_](https://wikipedia.org/wiki/Multiple_buffering) استعمال کیا جاتا ہے۔ خیال یہ ہے کہ DAGs مذکورہ بالا پیرامیٹرز کے مطابق ہر `epochtime` تعداد کے بلاکس پر تیار کیے جاتے ہیں۔ کلائنٹ تازہ ترین تیار کردہ DAG استعمال کرنے کے بجائے، پچھلا والا استعمال کرتا ہے۔ اس کا فائدہ یہ ہے کہ یہ DAGs کو وقت کے ساتھ تبدیل کرنے کی اجازت دیتا ہے بغیر کسی ایسے قدم کو شامل کرنے کی ضرورت کے جہاں مائنرز کو اچانک تمام ڈیٹا کا دوبارہ حساب لگانا پڑے۔ بصورت دیگر، باقاعدہ وقفوں پر چین پروسیسنگ میں اچانک عارضی سست روی اور مرکزیت میں ڈرامائی طور پر اضافہ ہونے کا امکان ہے۔ اس طرح تمام ڈیٹا کا دوبارہ حساب لگانے سے پہلے ان چند منٹوں کے اندر 51% حملے کا خطرہ ہوتا ہے۔

ایک بلاک کے لیے کام کا حساب لگانے کے لیے استعمال ہونے والے DAGs کا سیٹ بنانے کے لیے استعمال ہونے والا الگورتھم مندرجہ ذیل ہے:

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

## Hashimoto {#hashimoto}

اصل Hashimoto کے پیچھے خیال یہ ہے کہ بلاک چین کو بطور ڈیٹاسیٹ استعمال کیا جائے، ایک ایسا حساب انجام دیا جائے جو بلاک چین سے N انڈیکس منتخب کرتا ہے، ان انڈیکس پر ٹرانزیکشنز کو جمع کرتا ہے، اس ڈیٹا کا XOR انجام دیتا ہے، اور نتیجے کا ہیش واپس کرتا ہے۔ تھڈیئس ڈرائجا کا اصل الگورتھم، مطابقت کے لیے Python میں ترجمہ کیا گیا، مندرجہ ذیل ہے:

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

بدقسمتی سے، جبکہ Hashimoto کو RAM ہارڈ سمجھا جاتا ہے، یہ 256 بٹ ریاضی پر انحصار کرتا ہے، جس میں کافی کمپیوٹیشنل اوور ہیڈ ہوتا ہے۔ تاہم، Dagger-Hashimoto اس مسئلے کو حل کرنے کے لیے اپنے ڈیٹاسیٹ کو انڈیکس کرتے وقت صرف سب سے کم اہم 64 بٹس کا استعمال کرتا ہے۔

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ڈبل SHA3 کا استعمال صفر-ڈیٹا، قریب-فوری پری-ویریفکیشن کی ایک شکل کی اجازت دیتا ہے، صرف اس بات کی تصدیق کرتا ہے کہ ایک درست درمیانی قدر فراہم کی گئی تھی۔ پروف آف ورک کی یہ بیرونی تہہ انتہائی ASIC-فرینڈلی اور کافی کمزور ہے، لیکن DDoS کو مزید مشکل بنانے کے لیے موجود ہے کیونکہ ایک ایسا بلاک بنانے کے لیے کام کی وہ چھوٹی سی مقدار کرنا ضروری ہے جسے فوری طور پر مسترد نہیں کیا جائے گا۔ یہاں لائٹ کلائنٹ ورژن ہے:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## مائننگ اور تصدیق {#mining-and-verifying}

اب، آئیے اس سب کو مائننگ الگورتھم میں ایک ساتھ رکھتے ہیں:

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

یہاں تصدیقی الگورتھم ہے:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

لائٹ کلائنٹ فرینڈلی تصدیق:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

نیز، نوٹ کریں کہ Dagger-Hashimoto بلاک ہیڈر پر اضافی تقاضے عائد کرتا ہے:

- دو-تہہ کی تصدیق کے کام کرنے کے لیے، ایک بلاک ہیڈر میں نونس اور درمیانی قدر دونوں پری-sha3 ہونی چاہئیں۔
- کہیں، ایک بلاک ہیڈر کو موجودہ سیڈ سیٹ کا sha3 ذخیرہ کرنا چاہیے۔

## مزید پڑھیں {#further-reading}

_کسی کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحہ میں ترمیم کریں اور اسے شامل کریں!_

## ضمیمہ {#appendix}

جیسا کہ اوپر ذکر کیا گیا ہے، DAG جنریشن کے لیے استعمال ہونے والا RNG نمبر تھیوری کے کچھ نتائج پر انحصار کرتا ہے۔ سب سے پہلے، ہم یہ یقین دہانی فراہم کرتے ہیں کہ Lehmer RNG جو `picker` متغیر کی بنیاد ہے اس کا ایک وسیع دور ہے۔ دوسرا، ہم دکھاتے ہیں کہ `pow(x,3,P)`، `x` کو `1` یا `P-1` پر میپ نہیں کرے گا بشرطیکہ شروع کرنے کے لیے `x ∈ [2,P-2]` ہو۔ آخر میں، ہم دکھاتے ہیں کہ جب ہیشنگ فنکشن کے طور پر علاج کیا جاتا ہے تو `pow(x,3,P)` کی تصادم کی شرح کم ہوتی ہے۔

### Lehmer رینڈم نمبر جنریٹر {#lehmer-random-number}

جبکہ `produce_dag` فنکشن کو غیر جانبدارانہ بے ترتیب نمبر تیار کرنے کی ضرورت نہیں ہے، ایک ممکنہ خطرہ یہ ہے کہ `seed**i % P` صرف مٹھی بھر قدریں لیتا ہے۔ یہ ان مائنرز کو فائدہ فراہم کر سکتا ہے جو پیٹرن کو پہچانتے ہیں ان لوگوں پر جو نہیں پہچانتے ہیں۔

اس سے بچنے کے لیے، نمبر تھیوری کے ایک نتیجے کی اپیل کی جاتی ہے۔ ایک [_سیف پرائم_](https://en.wikipedia.org/wiki/Safe_prime) کو ایک پرائم `P` کے طور پر بیان کیا گیا ہے جیسے `(P-1)/2` بھی پرائم ہے۔ [ضرب گروپ](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` کے ایک رکن `x` کا _آرڈر_ کم سے کم `m` کے طور پر بیان کیا گیا ہے جیسے کہ <pre>xᵐ mod P ≡ 1</pre>
ان تعریفوں کو دیکھتے ہوئے، ہمارے پاس ہے:

> مشاہدہ 1۔ `x` کو ایک سیف پرائم `P` کے لیے ضرب گروپ `ℤ/Pℤ` کا رکن ہونے دیں۔ اگر `x mod P ≠ 1 mod P` اور `x mod P ≠ P-1 mod P`، تو `x` کا آرڈر یا تو `P-1` ہے یا `(P-1)/2`۔

_ثبوت_۔ چونکہ `P` ایک سیف پرائم ہے، تب [Lagrange کے تھیورم][lagrange] کے ذریعے ہمارے پاس یہ ہے کہ `x` کا آرڈر یا تو `1`، `2`، `(P-1)/2`، یا `P-1` ہے۔

`x` کا آرڈر `1` نہیں ہو سکتا، چونکہ فرما کے چھوٹے تھیورم کے ذریعے ہمارے پاس ہے:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

لہذا `x` کو `ℤ/nℤ` کی ایک ضربی شناخت ہونا چاہیے، جو کہ منفرد ہے۔ چونکہ ہم نے مفروضے کے مطابق یہ فرض کیا ہے کہ `x ≠ 1` ہے، یہ ممکن نہیں ہے۔

`x` کا آرڈر `2` نہیں ہو سکتا جب تک کہ `x = P-1` نہ ہو، چونکہ یہ اس بات کی خلاف ورزی کرے گا کہ `P` پرائم ہے۔

مذکورہ بالا تجویز سے، ہم یہ پہچان سکتے ہیں کہ `(picker * init) % P` کو دہرانے سے سائیکل کی لمبائی کم از کم `(P-1)/2` ہو گی۔ اس کی وجہ یہ ہے کہ ہم نے `P` کو دو کی اعلی طاقت کے تقریباً برابر ایک سیف پرائم کے طور پر منتخب کیا ہے، اور `init` وقفہ `[2,2**256+1]` میں ہے۔ `P` کی شدت کو دیکھتے ہوئے، ہمیں ماڈیولر ایکسپونینشن سے کبھی بھی سائیکل کی توقع نہیں کرنی چاہیے۔

جب ہم DAG میں پہلا سیل تفویض کر رہے ہیں (متغیر جس پر `init` کا لیبل لگا ہوا ہے)، ہم `pow(sha3(seed) + 2, 3, P)` کا حساب لگاتے ہیں۔ پہلی نظر میں، یہ اس بات کی ضمانت نہیں دیتا کہ نتیجہ نہ تو `1` ہے اور نہ ہی `P-1`۔ تاہم، چونکہ `P-1` ایک سیف پرائم ہے، ہمارے پاس مندرجہ ذیل اضافی یقین دہانی ہے، جو مشاہدہ 1 کا نتیجہ ہے:

> مشاہدہ 2۔ `x` کو ایک سیف پرائم `P` کے لیے ضرب گروپ `ℤ/Pℤ` کا رکن ہونے دیں، اور `w` کو ایک قدرتی عدد ہونے دیں۔ اگر `x mod P ≠ 1 mod P` اور `x mod P ≠ P-1 mod P`، نیز `w mod P ≠ P-1 mod P` اور `w mod P ≠ 0 mod P`، تو `xʷ mod P ≠ 1 mod P` اور `xʷ mod P ≠ P-1 mod P`

### ماڈیولر ایکسپونینشن بطور ہیش فنکشن {#modular-exponentiation}

`P` اور `w` کی کچھ قدروں کے لیے، فنکشن `pow(x, w, P)` میں بہت سے تصادم ہو سکتے ہیں۔ مثال کے طور پر، `pow(x,9,19)` صرف `{1,18}` کی قدریں لیتا ہے۔

یہ دیکھتے ہوئے کہ `P` پرائم ہے، تب ایک ماڈیولر ایکسپونینشن ہیشنگ فنکشن کے لیے ایک مناسب `w` مندرجہ ذیل نتیجے کا استعمال کرتے ہوئے منتخب کیا جا سکتا ہے:

> مشاہدہ 3۔ `P` کو ایک پرائم ہونے دیں؛ `w` اور `P-1` نسبتاً پرائم ہیں اگر اور صرف اگر `ℤ/Pℤ` میں تمام `a` اور `b` کے لیے:<center>`aʷ mod P ≡ bʷ mod P` اگر اور صرف اگر `a mod P ≡ b mod P`</center>

اس طرح، یہ دیکھتے ہوئے کہ `P` پرائم ہے اور `w` نسبتاً `P-1` کے پرائم ہے، ہمارے پاس یہ ہے کہ `|{pow(x, w, P) : x ∈ ℤ}| = P`، جس کا مطلب ہے کہ ہیشنگ فنکشن میں تصادم کی کم سے کم ممکنہ شرح ہے۔

خاص صورت میں کہ `P` ایک سیف پرائم ہے جیسا کہ ہم نے منتخب کیا ہے، تب `P-1` کے صرف عوامل 1، 2، `(P-1)/2` اور `P-1` ہیں۔ چونکہ `P` > 7، ہم جانتے ہیں کہ 3 نسبتاً `P-1` کے پرائم ہے، لہذا `w=3` مذکورہ بالا تجویز کو پورا کرتا ہے۔

## زیادہ موثر کیشے پر مبنی تشخیصی الگورتھم {#cache-based-evaluation}

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
