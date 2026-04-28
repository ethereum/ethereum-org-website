---
title: "ڈیگر-ہاشیموٹو"
description: "ڈیگر-ہاشیموٹو الگورتھم کا تفصیلی جائزہ۔"
lang: ur
---

ڈیگر-ہاشیموٹو (Dagger-Hashimoto) ایتھیریم کے مائننگ الگورتھم کے لیے اصل ریسرچ امپلیمنٹیشن اور تصریح (specification) تھی۔ ڈیگر-ہاشیموٹو کی جگہ [Ethash](#ethash) نے لے لی تھی۔ 15 ستمبر 2022 کو [The Merge](/roadmap/merge/) پر مائننگ کو مکمل طور پر بند کر دیا گیا تھا۔ اس کے بعد سے، ایتھیریم کو اس کے بجائے [پروف آف اسٹیک (proof-of-stake)](/developers/docs/consensus-mechanisms/pos) میکانزم کا استعمال کرتے ہوئے محفوظ کیا گیا ہے۔ یہ صفحہ تاریخی دلچسپی کے لیے ہے - یہاں موجود معلومات مرج (Merge) کے بعد والے ایتھیریم کے لیے مزید متعلقہ نہیں ہیں۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [پروف آف ورک (proof-of-work) کنسینسس](/developers/docs/consensus-mechanisms/pow)، [مائننگ](/developers/docs/consensus-mechanisms/pow/mining)، اور [مائننگ الگورتھمز](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) کے بارے میں پڑھیں۔

## ڈیگر-ہاشیموٹو {#dagger-hashimoto}

ڈیگر-ہاشیموٹو کا مقصد دو اہداف کو پورا کرنا ہے:

1.  **ASIC-مزاحمت (ASIC-resistance)**: الگورتھم کے لیے مخصوص ہارڈویئر بنانے کا فائدہ جتنا ممکن ہو کم ہونا چاہیے۔
2.  **لائٹ کلائنٹ کی تصدیق (Light client verifiability)**: ایک بلاک کو لائٹ کلائنٹ کے ذریعے مؤثر طریقے سے قابل تصدیق ہونا چاہیے۔

ایک اضافی ترمیم کے ساتھ، ہم یہ بھی بتاتے ہیں کہ اگر چاہیں تو تیسرا ہدف کیسے پورا کیا جائے، لیکن اس کی قیمت اضافی پیچیدگی کی صورت میں ہوگی:

**مکمل چین اسٹوریج (Full chain storage)**: مائننگ کے لیے مکمل بلاک چین اسٹیٹ (state) کو اسٹور کرنے کی ضرورت ہونی چاہیے (ایتھیریم اسٹیٹ ٹرائی (state trie) کی بے قاعدہ ساخت کی وجہ سے، ہم توقع کرتے ہیں کہ کچھ کٹائی (pruning) ممکن ہو گی، خاص طور پر کچھ اکثر استعمال ہونے والے کنٹریکٹس کی، لیکن ہم اسے کم سے کم کرنا چاہتے ہیں)۔

## DAG جنریشن {#dag-generation}

الگورتھم کا کوڈ ذیل میں Python میں بیان کیا جائے گا۔ سب سے پہلے، ہم مخصوص درستگی (precision) کے ان سائنڈ انٹیجرز (unsigned ints) کو اسٹرنگز میں مارشل کرنے کے لیے `encode_int` دیتے ہیں۔ اس کا الٹ بھی دیا گیا ہے:

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

اس کے بعد ہم فرض کرتے ہیں کہ `sha3` ایک فنکشن ہے جو ایک انٹیجر لیتا ہے اور ایک انٹیجر آؤٹ پٹ کرتا ہے، اور `dbl_sha3` ایک ڈبل-sha3 فنکشن ہے؛ اگر اس حوالہ کوڈ کو امپلیمنٹیشن میں تبدیل کر رہے ہیں تو استعمال کریں:

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
SAFE_PRIME_512 = 2**512 - 38117 # 2**512 سے چھوٹا سب سے بڑا محفوظ پرائم

params = {
      "n": 4000055296 * 8 // NUM_BITS, # ڈیٹاسیٹ کا سائز (4 گیگا بائٹس)؛ 65536 کا ملٹیپل ہونا لازمی ہے
      "n_inc": 65536, # فی مدت n کی قدر میں اضافہ؛ 65536 کا ملٹیپل ہونا لازمی ہے
                                        # epochtime=20000 کے ساتھ ہر سال 882 MB کا اضافہ ہوتا ہے
      "cache_size": 2500, # لائٹ کلائنٹ کی کیشے کا سائز (لائٹ کی جانب سے منتخب کیا جا سکتا ہے
                                        # کلائنٹ؛ الگورتھم کی تفصیلات کا حصہ نہیں ہے)
      "diff": 2**14, # مشکل (بلاک کی جانچ کے دوران ایڈجسٹ کی جاتی ہے)
      "epochtime": 100000, # بلاکس میں ایپوک (epoch) کی طوالت (ڈیٹاسیٹ کو کتنی بار اپ ڈیٹ کیا جاتا ہے)
      "k": 1, # ایک نوڈ کے پیرنٹس کی تعداد
      "w": w, # ماڈیولر ایکسپونینشیئشن ہیشنگ کے لیے استعمال ہوتا ہے
      "accesses": 200, # ہاشیموٹو (hashimoto) کے دوران ڈیٹاسیٹ تک رسائی کی تعداد
      "P": SAFE_PRIME_512 # ہیشنگ اور رینڈم نمبر جنریشن کے لیے محفوظ پرائم
}
```

اس صورت میں `P` ایک پرائم (prime) ہے جسے اس طرح منتخب کیا گیا ہے کہ `log₂(P)` 512 سے تھوڑا سا کم ہے، جو ان 512 بٹس سے مطابقت رکھتا ہے جنہیں ہم اپنے نمبرز کی نمائندگی کے لیے استعمال کر رہے ہیں۔ نوٹ کریں کہ دراصل DAG کا صرف پچھلا نصف حصہ اسٹور کرنے کی ضرورت ہوتی ہے، لہذا ڈی فیکٹو (de-facto) RAM کی ضرورت 1 GB سے شروع ہوتی ہے اور ہر سال 441 MB تک بڑھتی ہے۔

### ڈیگر گراف کی تعمیر {#dagger-graph-building}

ڈیگر گراف بنانے کا بنیادی طریقہ (primitive) درج ذیل کے طور پر بیان کیا گیا ہے:

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

بنیادی طور پر، یہ ایک گراف کو سنگل نوڈ، `sha3(seed)` کے طور پر شروع کرتا ہے، اور وہاں سے بے ترتیب پچھلے نوڈز کی بنیاد پر ترتیب وار دیگر نوڈز کو شامل کرنا شروع کرتا ہے۔ جب ایک نیا نوڈ بنایا جاتا ہے، تو `i` سے کم کچھ انڈیکسز کو تصادفی طور پر منتخب کرنے کے لیے سیڈ (seed) کی ایک ماڈیولر پاور کا حساب لگایا جاتا ہے (اوپر `x % i` کا استعمال کرتے ہوئے)، اور ان انڈیکسز پر نوڈز کی ویلیوز کو `x` کے لیے ایک نئی ویلیو بنانے کے لیے کیلکولیشن میں استعمال کیا جاتا ہے، جسے پھر ایک چھوٹے پروف آف ورک فنکشن (XOR پر مبنی) میں ڈالا جاتا ہے تاکہ بالآخر انڈیکس `i` پر گراف کی ویلیو تیار کی جا سکے۔ اس مخصوص ڈیزائن کے پیچھے منطق یہ ہے کہ DAG کی ترتیب وار رسائی (sequential access) کو مجبور کیا جائے؛ DAG کی اگلی ویلیو جس تک رسائی حاصل کی جائے گی اس کا تعین اس وقت تک نہیں کیا جا سکتا جب تک کہ موجودہ ویلیو معلوم نہ ہو۔ آخر میں، ماڈیولر ایکسپونینشیئشن (modular exponentiation) نتیجے کو مزید ہیش کرتا ہے۔

یہ الگورتھم نمبر تھیوری کے کئی نتائج پر انحصار کرتا ہے۔ بحث کے لیے نیچے دیا گیا ضمیمہ (appendix) دیکھیں۔

## لائٹ کلائنٹ ایویلیوایشن {#light-client-evaluation}

مذکورہ بالا گراف کی تعمیر کا مقصد گراف میں موجود ہر نوڈ کو صرف تھوڑی تعداد میں نوڈز کے سب ٹری (subtree) کا حساب لگا کر دوبارہ بنانے کی اجازت دینا ہے اور اس کے لیے صرف تھوڑی مقدار میں معاون میموری (auxiliary memory) کی ضرورت ہوتی ہے۔ نوٹ کریں کہ k=1 کے ساتھ، سب ٹری صرف ویلیوز کی ایک چین ہے جو DAG میں پہلے عنصر تک جاتی ہے۔

DAG کے لیے لائٹ کلائنٹ کمپیوٹنگ فنکشن اس طرح کام کرتا ہے:

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

بنیادی طور پر، یہ محض مندرجہ بالا الگورتھم کو دوبارہ لکھنا ہے جو پورے DAG کے لیے ویلیوز کا حساب لگانے کے لوپ کو ہٹاتا ہے اور پہلے والے نوڈ لک اپ (lookup) کو ریکرسیو کال (recursive call) یا کیشے (cache) لک اپ سے بدل دیتا ہے۔ نوٹ کریں کہ `k=1` کے لیے کیشے غیر ضروری ہے، حالانکہ ایک مزید آپٹیمائزیشن دراصل DAG کی پہلی چند ہزار ویلیوز کا پہلے سے حساب لگاتی ہے اور اسے کمپیوٹیشنز کے لیے ایک جامد (static) کیشے کے طور پر رکھتی ہے؛ اس کی کوڈ امپلیمنٹیشن کے لیے ضمیمہ دیکھیں۔

## DAGs کا ڈبل بفر {#double-buffer}

ایک فل کلائنٹ میں، مندرجہ بالا فارمولے کے ذریعے تیار کردہ 2 DAGs کا ایک [_ڈبل بفر (double buffer)_](https://wikipedia.org/wiki/Multiple_buffering) استعمال کیا جاتا ہے۔ خیال یہ ہے کہ اوپر دیے گئے پیرامیٹرز کے مطابق ہر `epochtime` بلاکس کی تعداد پر DAGs تیار کیے جاتے ہیں۔ کلائنٹ کے تازہ ترین تیار کردہ DAG کو استعمال کرنے کے بجائے، یہ پچھلا والا استعمال کرتا ہے۔ اس کا فائدہ یہ ہے کہ یہ DAGs کو وقت کے ساتھ تبدیل کرنے کی اجازت دیتا ہے بغیر کسی ایسے قدم کو شامل کرنے کی ضرورت کے جہاں مائنرز کو اچانک تمام ڈیٹا کا دوبارہ حساب لگانا پڑے۔ بصورت دیگر، باقاعدہ وقفوں پر چین پروسیسنگ میں اچانک عارضی سست روی اور ڈرامائی طور پر سینٹرلائزیشن بڑھنے کا امکان ہے۔ اس طرح تمام ڈیٹا کا دوبارہ حساب لگائے جانے سے پہلے ان چند منٹوں کے اندر 51% حملے کے خطرات ہوتے ہیں۔

ایک بلاک کے لیے کام کا حساب لگانے کے لیے استعمال ہونے والے DAGs کا سیٹ بنانے کے لیے استعمال ہونے والا الگورتھم درج ذیل ہے:

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
        # کوئی بیک بفر ممکن نہیں، صرف فرنٹ بفر بنائیں
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## ہاشیموٹو {#hashimoto}

اصل ہاشیموٹو کے پیچھے خیال یہ ہے کہ بلاک چین کو ایک ڈیٹاسیٹ کے طور پر استعمال کیا جائے، ایک ایسی کمپیوٹیشن کی جائے جو بلاک چین سے N انڈیکسز کو منتخب کرے، ان انڈیکسز پر ٹرانزیکشنز کو اکٹھا کرے، اس ڈیٹا کا XOR کرے، اور نتیجے کا ہیش واپس کرے۔ Thaddeus Dryja کا اصل الگورتھم، جسے مستقل مزاجی کے لیے Python میں ترجمہ کیا گیا ہے، درج ذیل ہے:

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

بدقسمتی سے، اگرچہ ہاشیموٹو کو RAM ہارڈ سمجھا جاتا ہے، یہ 256-بٹ ارتھمیٹک پر انحصار کرتا ہے، جس میں کافی کمپیوٹیشنل اوور ہیڈ ہوتا ہے۔ تاہم، ڈیگر-ہاشیموٹو اس مسئلے کو حل کرنے کے لیے اپنے ڈیٹاسیٹ کو انڈیکس کرتے وقت صرف سب سے کم اہم (least significant) 64 بٹس کا استعمال کرتا ہے۔

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ڈبل SHA3 کا استعمال زیرو-ڈیٹا، تقریباً فوری پری-ویریفکیشن (pre-verification) کی ایک شکل کی اجازت دیتا ہے، جو صرف اس بات کی تصدیق کرتا ہے کہ ایک درست درمیانی ویلیو فراہم کی گئی تھی۔ پروف آف ورک کی یہ بیرونی تہہ انتہائی ASIC-دوست اور کافی کمزور ہے، لیکن یہ DDoS کو مزید مشکل بنانے کے لیے موجود ہے کیونکہ اس چھوٹی سی مقدار کا کام کرنا ضروری ہے تاکہ ایک ایسا بلاک تیار کیا جا سکے جسے فوری طور پر مسترد نہ کیا جائے۔ یہاں لائٹ کلائنٹ ورژن ہے:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## مائننگ اور تصدیق {#mining-and-verifying}

اب، آئیے ان سب کو مائننگ الگورتھم میں ایک ساتھ رکھیں:

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

لائٹ کلائنٹ کے موافق تصدیق:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

اس کے علاوہ، نوٹ کریں کہ ڈیگر-ہاشیموٹو بلاک ہیڈر پر اضافی تقاضے عائد کرتا ہے:

- ٹو-لیئر (two-layer) تصدیق کے کام کرنے کے لیے، ایک بلاک ہیڈر میں نانس (nonce) اور درمیانی ویلیو pre-sha3 دونوں کا ہونا ضروری ہے
- کہیں نہ کہیں، ایک بلاک ہیڈر کو موجودہ سیڈسیٹ (seedset) کا sha3 اسٹور کرنا چاہیے

## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## ضمیمہ {#appendix}

جیسا کہ اوپر ذکر کیا گیا ہے، DAG جنریشن کے لیے استعمال ہونے والا RNG نمبر تھیوری کے کچھ نتائج پر انحصار کرتا ہے۔ سب سے پہلے، ہم یہ یقین دہانی کراتے ہیں کہ Lehmer RNG جو `picker` ویری ایبل کی بنیاد ہے، اس کا پیریڈ (period) وسیع ہے۔ دوسرا، ہم دکھاتے ہیں کہ `pow(x,3,P)` `x` کو `1` یا `P-1` پر میپ نہیں کرے گا بشرطیکہ شروع کرنے کے لیے `x ∈ [2,P-2]` ہو۔ آخر میں، ہم دکھاتے ہیں کہ جب `pow(x,3,P)` کو ہیشنگ فنکشن کے طور پر سمجھا جاتا ہے تو اس میں تصادم (collision) کی شرح کم ہوتی ہے۔

### Lehmer رینڈم نمبر جنریٹر {#lehmer-random-number}

اگرچہ `produce_dag` فنکشن کو غیر جانبدارانہ (unbiased) رینڈم نمبرز تیار کرنے کی ضرورت نہیں ہے، لیکن ایک ممکنہ خطرہ یہ ہے کہ `seed**i % P` صرف مٹھی بھر ویلیوز لیتا ہے۔ یہ ان مائنرز کو فائدہ پہنچا سکتا ہے جو پیٹرن کو پہچانتے ہیں ان کے مقابلے میں جو نہیں پہچانتے۔

اس سے بچنے کے لیے، نمبر تھیوری کے ایک نتیجے سے رجوع کیا جاتا ہے۔ ایک [_سیف پرائم (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) کو ایک پرائم `P` کے طور پر بیان کیا جاتا ہے کہ `(P-1)/2` بھی پرائم ہو۔ [ملٹیپلیکیٹو گروپ (multiplicative group)](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` کے ایک ممبر `x` کے _آرڈر (order)_ کو کم از کم `m` کے طور پر بیان کیا جاتا ہے کہ <pre><span dir="ltr">xᵐ mod P ≡ 1</span></pre>
ان تعریفوں کو دیکھتے ہوئے، ہمارے پاس ہے:

> مشاہدہ 1۔ فرض کریں کہ `x` ایک سیف پرائم `P` کے لیے ملٹیپلیکیٹو گروپ `ℤ/Pℤ` کا ممبر ہے۔ اگر `x mod P ≠ 1 mod P` اور `x mod P ≠ P-1 mod P` ہے، تو `x` کا آرڈر یا تو `P-1` ہے یا `(P-1)/2`۔

_ثبوت_۔ چونکہ `P` ایک سیف پرائم ہے، اس لیے [Lagrange's Theorem][lagrange] کے مطابق ہمارے پاس `x` کا آرڈر یا تو `1`، `2`، `(P-1)/2`، یا `P-1` ہے۔

`x` کا آرڈر `1` نہیں ہو سکتا، کیونکہ Fermat's Little Theorem کے مطابق ہمارے پاس ہے:

<pre><span dir="ltr">x<sup>P-1</sup> mod P ≡ 1</span></pre>

لہذا `x` کو `ℤ/nℤ` کی ایک ملٹیپلیکیٹو شناخت (multiplicative identity) ہونا چاہیے، جو منفرد ہے۔ چونکہ ہم نے فرض کیا تھا کہ `x ≠ 1` ہے، اس لیے یہ ممکن نہیں ہے۔

`x` کا آرڈر `2` نہیں ہو سکتا جب تک کہ `x = P-1` نہ ہو، کیونکہ یہ اس بات کی خلاف ورزی کرے گا کہ `P` پرائم ہے۔

مذکورہ بالا تجویز سے، ہم یہ تسلیم کر سکتے ہیں کہ `(picker * init) % P` کو دہرانے سے سائیکل کی لمبائی کم از کم `(P-1)/2` ہوگی۔ اس کی وجہ یہ ہے کہ ہم نے `P` کو ایک سیف پرائم کے طور پر منتخب کیا ہے جو تقریباً دو کی اعلیٰ پاور کے برابر ہے، اور `init` وقفہ `[2,2**256+1]` میں ہے۔ `P` کی وسعت کو دیکھتے ہوئے، ہمیں کبھی بھی ماڈیولر ایکسپونینشیئشن سے سائیکل کی توقع نہیں کرنی چاہیے۔

جب ہم DAG میں پہلا سیل تفویض کر رہے ہوتے ہیں (ویری ایبل جس کا لیبل `init` ہے)، تو ہم `pow(sha3(seed) + 2, 3, P)` کا حساب لگاتے ہیں۔ پہلی نظر میں، یہ اس بات کی ضمانت نہیں دیتا کہ نتیجہ نہ تو `1` ہے اور نہ ہی `P-1`۔ تاہم، چونکہ `P-1` ایک سیف پرائم ہے، اس لیے ہمارے پاس درج ذیل اضافی یقین دہانی ہے، جو مشاہدہ 1 کا نتیجہ (corollary) ہے:

> مشاہدہ 2۔ فرض کریں کہ `x` ایک سیف پرائم `P` کے لیے ملٹیپلیکیٹو گروپ `ℤ/Pℤ` کا ممبر ہے، اور `w` ایک قدرتی عدد (natural number) ہے۔ اگر `x mod P ≠ 1 mod P` اور `x mod P ≠ P-1 mod P` ہے، اور ساتھ ہی `w mod P ≠ P-1 mod P` اور `w mod P ≠ 0 mod P` ہے، تو `xʷ mod P ≠ 1 mod P` اور `xʷ mod P ≠ P-1 mod P`

### ہیش فنکشن کے طور پر ماڈیولر ایکسپونینشیئشن {#modular-exponentiation}

`P` اور `w` کی مخصوص ویلیوز کے لیے، فنکشن `pow(x, w, P)` میں بہت سے تصادم (collisions) ہو سکتے ہیں۔ مثال کے طور پر، `pow(x,9,19)` صرف `{1,18}` ویلیوز لیتا ہے۔

یہ دیکھتے ہوئے کہ `P` پرائم ہے، تو ماڈیولر ایکسپونینشیئشن ہیشنگ فنکشن کے لیے ایک مناسب `w` کو درج ذیل نتیجے کا استعمال کرتے ہوئے منتخب کیا جا سکتا ہے:

> مشاہدہ 3۔ فرض کریں کہ `P` ایک پرائم ہے؛ `w` اور `P-1` نسبتاً پرائم (relatively prime) ہیں اگر اور صرف اگر `ℤ/Pℤ` میں تمام `a` اور `b` کے لیے:<center>`aʷ mod P ≡ bʷ mod P` اگر اور صرف اگر `a mod P ≡ b mod P`</center>

اس طرح، یہ دیکھتے ہوئے کہ `P` پرائم ہے اور `w`، `P-1` کے لحاظ سے نسبتاً پرائم ہے، ہمارے پاس `|{pow(x, w, P) : x ∈ ℤ}| = P` ہے، جس کا مطلب ہے کہ ہیشنگ فنکشن میں تصادم کی شرح کم از کم ممکنہ حد تک ہے۔

اس خاص صورت میں کہ `P` ایک سیف پرائم ہے جیسا کہ ہم نے منتخب کیا ہے، تو `P-1` کے صرف 1، 2، `(P-1)/2` اور `P-1` فیکٹرز ہیں۔ چونکہ <span dir="ltr">`P` > 7</span> ہے، ہم جانتے ہیں کہ 3، `P-1` کے لحاظ سے نسبتاً پرائم ہے، لہذا `w=3` مندرجہ بالا تجویز کو پورا کرتا ہے۔

## زیادہ مؤثر کیشے پر مبنی ایویلیوایشن الگورتھم {#cache-based-evaluation}

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