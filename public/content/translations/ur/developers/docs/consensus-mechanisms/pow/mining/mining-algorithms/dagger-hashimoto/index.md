---
title: "⁦Dagger-Hashimoto⁩"
description: "⁦Dagger-Hashimoto⁩ الگورتھم کا تفصیلی جائزہ۔"
lang: ur
---

Dagger-Hashimoto ایتھیریم کے کان کنی کے الگورتھم کے لیے اصل تحقیقی نفاذ اور تصریح تھی۔ Dagger-Hashimoto کی جگہ [ایتھ ہیش](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash) نے لے لی تھی۔ <span dir="ltr">15 September 2022</span> کو [دی مرج](/roadmap/merge/) پر کان کنی کو مکمل طور پر بند کر دیا گیا تھا۔ اس کے بعد سے، ایتھیریم کو اس کے بجائے [حصہ داری کا ثبوت (PoS)](/developers/docs/consensus-mechanisms/pos) میکانزم کا استعمال کرتے ہوئے محفوظ کیا گیا ہے۔ یہ صفحہ تاریخی دلچسپی کے لیے ہے - یہاں موجود معلومات دی مرج کے بعد کے ایتھیریم کے لیے مزید متعلقہ نہیں ہیں۔

## پیشگی شرائط {#prerequisites}

اس صفحے کو بہتر طور پر سمجھنے کے لیے، ہم تجویز کرتے ہیں کہ آپ پہلے [ثبوتِ کار (PoW) کے اتفاق رائے](/developers/docs/consensus-mechanisms/pow)، [کان کنی](/developers/docs/consensus-mechanisms/pow/mining)، اور [کان کنی کے الگورتھمز](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) کے بارے میں پڑھیں۔

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto کا مقصد دو اہداف کو پورا کرنا ہے:

1.  **ASIC-مزاحمت**: الگورتھم کے لیے مخصوص ہارڈویئر بنانے کا فائدہ جتنا ممکن ہو کم ہونا چاہیے۔
2.  **لائٹ کلائنٹ کی تصدیق**: ایک بلاک کو لائٹ کلائنٹ کے ذریعے مؤثر طریقے سے قابلِ تصدیق ہونا چاہیے۔

ایک اضافی ترمیم کے ساتھ، ہم یہ بھی بتاتے ہیں کہ اگر چاہیں تو تیسرے ہدف کو کیسے پورا کیا جائے، لیکن اضافی پیچیدگی کی قیمت پر:

**مکمل چین اسٹوریج**: کان کنی کے لیے مکمل بلاک چین کی حالت کو ذخیرہ کرنے کا تقاضا ہونا چاہیے (ایتھیریم کی حالت کی ٹرائی کی بے قاعدہ ساخت کی وجہ سے، ہم توقع کرتے ہیں کہ کچھ کٹائی (pruning) ممکن ہو گی، خاص طور پر کچھ اکثر استعمال ہونے والے معاہدوں کی، لیکن ہم اسے کم سے کم کرنا چاہتے ہیں)۔

## DAG کی تخلیق {#dag-generation}

الگورتھم کے لیے کوڈ ذیل میں Python میں بیان کیا جائے گا۔ سب سے پہلے، ہم مخصوص درستگی کے غیر دستخط شدہ (unsigned) انٹیجرز کو اسٹرنگز میں مارشل کرنے کے لیے `encode_int` دیتے ہیں۔ اس کا الٹ بھی دیا گیا ہے:

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

اس کے بعد ہم فرض کرتے ہیں کہ `sha3` ایک فنکشن ہے جو ایک انٹیجر لیتا ہے اور ایک انٹیجر آؤٹ پٹ کرتا ہے، اور `dbl_sha3` ایک <span dir="ltr">double-sha3</span> فنکشن ہے؛ اگر اس حوالہ کوڈ کو کسی نفاذ میں تبدیل کر رہے ہیں تو استعمال کریں:

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
SAFE_PRIME_512 = 2**512 - 38117     # 2**512 سے کم سب سے بڑا محفوظ پرائم

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # ڈیٹاسیٹ کا سائز (4 گیگا بائٹس)؛ 65536 کا ملٹیپل ہونا لازمی ہے
      "n_inc": 65536,                   # فی مدت n کی قدر میں اضافہ؛ 65536 کا ملٹیپل ہونا لازمی ہے
                                        # epochtime=20000 کے ساتھ فی سال 882 MB کا اضافہ دیتا ہے
      "cache_size": 2500,               # لائٹ کلائنٹ کی کیشے کا سائز (لائٹ
                                        # کلائنٹ کے ذریعے منتخب کیا جا سکتا ہے؛ الگورتھم کی تفصیلات کا حصہ نہیں ہے)
      "diff": 2**14,                    # دشواری (بلاک کی جانچ کے دوران ایڈجسٹ کی جاتی ہے)
      "epochtime": 100000,              # بلاکس میں ایپوک کی لمبائی (ڈیٹاسیٹ کو کتنی بار اپ ڈیٹ کیا جاتا ہے)
      "k": 1,                           # ایک نوڈ کے والدین کی تعداد
      "w": w,                          # ماڈیولر ایکسپونینشی ایشن ہیشنگ کے لیے استعمال کیا جاتا ہے
      "accesses": 200,                  # ہاشیموٹو کے دوران ڈیٹاسیٹ تک رسائیوں کی تعداد
      "P": SAFE_PRIME_512               # ہیشنگ اور رینڈم نمبر جنریشن کے لیے محفوظ پرائم
}
```

اس صورت میں `P` ایک پرائم (prime) ہے جسے اس طرح منتخب کیا گیا ہے کہ `log₂(P)` <span dir="ltr">512</span> سے تھوڑا کم ہے، جو ان <span dir="ltr">512 bits</span> سے مطابقت رکھتا ہے جنہیں ہم اپنے نمبروں کی نمائندگی کے لیے استعمال کر رہے ہیں۔ نوٹ کریں کہ دراصل DAG کے صرف آخری نصف حصے کو ذخیرہ کرنے کی ضرورت ہوتی ہے، لہذا ڈی فیکٹو RAM کی ضرورت <span dir="ltr">1 GB</span> سے شروع ہوتی ہے اور ہر سال <span dir="ltr">441 MB</span> تک بڑھتی ہے۔

### Dagger گراف کی تعمیر {#dagger-graph-building}

Dagger گراف بنانے کے بنیادی اصول کی تعریف اس طرح کی گئی ہے:

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

بنیادی طور پر، یہ ایک گراف کو ایک واحد نوڈ، `sha3(seed)` کے طور پر شروع کرتا ہے، اور وہاں سے بے ترتیب پچھلے نوڈز کی بنیاد پر ترتیب وار دیگر نوڈز کو شامل کرنا شروع کرتا ہے۔ جب ایک نیا نوڈ بنایا جاتا ہے، تو `i` سے کم کچھ اشاریوں کو تصادفی طور پر منتخب کرنے کے لیے سیڈ (seed) کی ایک ماڈیولر پاور کا حساب لگایا جاتا ہے (اوپر `x % i` کا استعمال کرتے ہوئے)، اور ان اشاریوں پر نوڈز کی قدروں کو `x` کے لیے ایک نئی قدر پیدا کرنے کے لیے ایک حساب میں استعمال کیا جاتا ہے، جسے پھر ایک چھوٹے ثبوتِ کار (PoW) فنکشن (XOR پر مبنی) میں ڈالا جاتا ہے تاکہ بالآخر اشاریہ `i` پر گراف کی قدر پیدا کی جا سکے۔ اس مخصوص ڈیزائن کے پیچھے منطق یہ ہے کہ DAG تک ترتیب وار رسائی کو مجبور کیا جائے؛ DAG کی اگلی قدر جس تک رسائی حاصل کی جائے گی اس کا تعین اس وقت تک نہیں کیا جا سکتا جب تک کہ موجودہ قدر معلوم نہ ہو۔ آخر میں، ماڈیولر ایکسپونینشیئشن (modular exponentiation) نتیجے کو مزید ہیش کرتا ہے۔

یہ الگورتھم نمبر تھیوری کے کئی نتائج پر انحصار کرتا ہے۔ بحث کے لیے ذیل میں ضمیمہ دیکھیں۔

## لائٹ کلائنٹ کی تشخیص {#light-client-evaluation}

مذکورہ بالا گراف کی تعمیر کا مقصد گراف میں موجود ہر نوڈ کو صرف تھوڑی تعداد میں نوڈز کے سب ٹری (subtree) کا حساب لگا کر اور صرف تھوڑی مقدار میں معاون میموری کی ضرورت کے ذریعے دوبارہ تعمیر کرنے کی اجازت دینا ہے۔ نوٹ کریں کہ <span dir="ltr">k=1</span> کے ساتھ، سب ٹری صرف قدروں کی ایک چین ہے جو DAG میں پہلے عنصر تک جاتی ہے۔

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

بنیادی طور پر، یہ محض مندرجہ بالا الگورتھم کو دوبارہ لکھنا ہے جو پورے DAG کے لیے قدروں کا حساب لگانے کے لوپ کو ہٹاتا ہے اور پہلے والے نوڈ لک اپ کو ایک تکراری کال (recursive call) یا کیشے لک اپ (cache lookup) سے بدل دیتا ہے۔ نوٹ کریں کہ `k=1` کے لیے کیشے غیر ضروری ہے، حالانکہ ایک مزید بہتری دراصل DAG کی پہلی چند ہزار قدروں کا پہلے سے حساب لگاتی ہے اور اسے حسابات کے لیے ایک جامد کیشے کے طور پر رکھتی ہے؛ اس کے کوڈ کے نفاذ کے لیے ضمیمہ دیکھیں۔

## DAGs کا ڈبل بفر {#double-buffer}

ایک مکمل کلائنٹ میں، مندرجہ بالا فارمولے کے ذریعے تیار کردہ <span dir="ltr">2 DAGs</span> کا ایک [_ڈبل بفر_](https://wikipedia.org/wiki/Multiple_buffering) استعمال کیا جاتا ہے۔ خیال یہ ہے کہ اوپر دیے گئے پیرامیٹرز کے مطابق ہر `epochtime` بلاکس کی تعداد پر DAGs تیار کیے جاتے ہیں۔ کلائنٹ کے تازہ ترین تیار کردہ DAG کو استعمال کرنے کے بجائے، یہ پچھلے والے کو استعمال کرتا ہے۔ اس کا فائدہ یہ ہے کہ یہ وقت کے ساتھ ساتھ DAGs کو تبدیل کرنے کی اجازت دیتا ہے بغیر کسی ایسے قدم کو شامل کرنے کی ضرورت کے جہاں کان کنوں کو اچانک تمام ڈیٹا کا دوبارہ حساب لگانا پڑے۔ بصورت دیگر، باقاعدہ وقفوں پر چین کی پروسیسنگ میں اچانک عارضی سست روی اور مرکزیت میں ڈرامائی اضافے کا امکان ہے۔ اس طرح تمام ڈیٹا کا دوبارہ حساب لگائے جانے سے پہلے ان چند منٹوں کے اندر ۵۱٪ حملہ کے خطرات ہوتے ہیں۔

ایک بلاک کے لیے کام کا حساب لگانے کے لیے استعمال ہونے والے DAGs کا سیٹ تیار کرنے کے لیے استعمال ہونے والا الگورتھم درج ذیل ہے:

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
        # کوئی بیک بفر ممکن نہیں ہے، بس فرنٹ بفر بنائیں
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

اصل Hashimoto کے پیچھے خیال یہ ہے کہ بلاک چین کو ایک ڈیٹاسیٹ کے طور پر استعمال کیا جائے، ایک ایسا حساب لگایا جائے جو بلاک چین سے N اشاریوں کو منتخب کرے، ان اشاریوں پر لین دین کو اکٹھا کرے، اس ڈیٹا کا XOR انجام دے، اور نتیجے کا ہیش واپس کرے۔ Thaddeus Dryja کا اصل الگورتھم، جسے مستقل مزاجی کے لیے Python میں ترجمہ کیا گیا ہے، درج ذیل ہے:

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

بدقسمتی سے، اگرچہ Hashimoto کو RAM ہارڈ سمجھا جاتا ہے، یہ <span dir="ltr">256-bit</span> ریاضی پر انحصار کرتا ہے، جس میں کافی کمپیوٹیشنل اوور ہیڈ ہوتا ہے۔ تاہم، Dagger-Hashimoto اس مسئلے کو حل کرنے کے لیے اپنے ڈیٹاسیٹ کی اشاریہ سازی کرتے وقت صرف سب سے کم اہم <span dir="ltr">64 bits</span> کا استعمال کرتا ہے۔

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

ڈبل SHA3 کا استعمال صفر-ڈیٹا، تقریباً فوری پیشگی تصدیق کی ایک شکل کی اجازت دیتا ہے، جو صرف اس بات کی تصدیق کرتا ہے کہ ایک درست درمیانی قدر فراہم کی گئی تھی۔ ثبوتِ کار (PoW) کی یہ بیرونی تہہ انتہائی ASIC-دوست اور کافی کمزور ہے، لیکن یہ DDoS کو مزید مشکل بنانے کے لیے موجود ہے کیونکہ ایک ایسا بلاک تیار کرنے کے لیے وہ تھوڑا سا کام کرنا ضروری ہے جسے فوری طور پر مسترد نہ کیا جائے۔ یہاں لائٹ کلائنٹ ورژن ہے:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## کان کنی اور تصدیق {#mining-and-verifying}

اب، آئیے ان سب کو کان کنی کے الگورتھم میں ایک ساتھ رکھیں:

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

لائٹ کلائنٹ کے لیے سازگار تصدیق:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

اس کے علاوہ، نوٹ کریں کہ Dagger-Hashimoto بلاک ہیڈر پر اضافی تقاضے عائد کرتا ہے:

- دو تہوں والی تصدیق کے کام کرنے کے لیے، ایک بلاک ہیڈر میں نانس اور درمیانی قدر <span dir="ltr">pre-sha3</span> دونوں کا ہونا ضروری ہے۔
- کہیں نہ کہیں، ایک بلاک ہیڈر کو موجودہ سیڈ سیٹ (seedset) کا sha3 ذخیرہ کرنا چاہیے۔

## مزید مطالعہ {#further-reading}

_کسی ایسے کمیونٹی وسیلے کے بارے میں جانتے ہیں جس نے آپ کی مدد کی ہو؟ اس صفحے میں ترمیم کریں اور اسے شامل کریں!_

## ضمیمہ {#appendix}

جیسا کہ اوپر ذکر کیا گیا ہے، DAG کی تخلیق کے لیے استعمال ہونے والا RNG نمبر تھیوری کے کچھ نتائج پر انحصار کرتا ہے۔ سب سے پہلے، ہم یہ یقین دہانی کراتے ہیں کہ Lehmer RNG جو `picker` متغیر کی بنیاد ہے، اس کا دورانیہ وسیع ہے۔ دوسرا، ہم دکھاتے ہیں کہ `pow(x,3,P)` `x` کو `1` یا `P-1` پر میپ نہیں کرے گا بشرطیکہ شروع کرنے کے لیے `x ∈ [2,P-2]` ہو۔ آخر میں، ہم دکھاتے ہیں کہ جب `pow(x,3,P)` کو ہیش فنکشن کے طور پر سمجھا جاتا ہے تو اس کی تصادم کی شرح (collision rate) کم ہوتی ہے۔

### Lehmer رینڈم نمبر جنریٹر {#lehmer-random-number}

اگرچہ `produce_dag` فنکشن کو غیر جانبدارانہ بے ترتیب نمبر تیار کرنے کی ضرورت نہیں ہے، لیکن ایک ممکنہ خطرہ یہ ہے کہ `seed**i % P` صرف مٹھی بھر قدریں لیتا ہے۔ یہ ان کان کنوں کو فائدہ پہنچا سکتا ہے جو پیٹرن کو پہچانتے ہیں ان کے مقابلے میں جو نہیں پہچانتے۔

اس سے بچنے کے لیے، نمبر تھیوری کے ایک نتیجے سے رجوع کیا جاتا ہے۔ ایک [_محفوظ پرائم (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) کی تعریف ایک ایسے پرائم `P` کے طور پر کی جاتی ہے کہ `(P-1)/2` بھی پرائم ہو۔ [ضرب والے گروپ (multiplicative group)](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` کے ایک رکن `x` کے _آرڈر_ کی تعریف کم از کم `m` کے طور پر کی جاتی ہے کہ <pre>xᵐ mod P ≡ 1</pre>
ان تعریفوں کو دیکھتے ہوئے، ہمارے پاس ہے:

> مشاہدہ 1۔ فرض کریں کہ `x` ایک محفوظ پرائم `P` کے لیے ضرب والے گروپ `ℤ/Pℤ` کا رکن ہے۔ اگر `x mod P ≠ 1 mod P` اور `x mod P ≠ P-1 mod P`، تو `x` کا آرڈر یا تو `P-1` ہے یا `(P-1)/2`۔

_ثبوت_۔ چونکہ `P` ایک محفوظ پرائم ہے، تو [Lagrange's Theorem][lagrange] کے مطابق ہمارے پاس یہ ہے کہ `x` کا آرڈر یا تو `1`، `2`، `(P-1)/2`، یا `P-1` ہے۔

`x` کا آرڈر `1` نہیں ہو سکتا، کیونکہ Fermat's Little Theorem کے مطابق ہمارے پاس ہے:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

لہذا `x` کو `ℤ/nℤ` کی ضربی شناخت (multiplicative identity) ہونا چاہیے، جو منفرد ہے۔ چونکہ ہم نے مفروضے کے ذریعے فرض کیا تھا کہ `x ≠ 1`، یہ ممکن نہیں ہے۔

`x` کا آرڈر `2` نہیں ہو سکتا جب تک کہ `x = P-1` نہ ہو، کیونکہ یہ اس بات کی خلاف ورزی کرے گا کہ `P` پرائم ہے۔

مذکورہ بالا تجویز سے، ہم یہ تسلیم کر سکتے ہیں کہ `(picker * init) % P` کو دہرانے سے سائیکل کی لمبائی کم از کم `(P-1)/2` ہو گی۔ اس کی وجہ یہ ہے کہ ہم نے `P` کو ایک محفوظ پرائم کے طور پر منتخب کیا ہے جو تقریباً دو کی اعلیٰ طاقت کے برابر ہے، اور `init` وقفہ `[2,2**256+1]` میں ہے۔ `P` کی وسعت کو دیکھتے ہوئے، ہمیں کبھی بھی ماڈیولر ایکسپونینشیئشن سے سائیکل کی توقع نہیں کرنی چاہیے۔

جب ہم DAG میں پہلا سیل تفویض کر رہے ہوتے ہیں (متغیر جس کا لیبل `init` ہے)، تو ہم `pow(sha3(seed) + 2, 3, P)` کا حساب لگاتے ہیں۔ پہلی نظر میں، یہ اس بات کی ضمانت نہیں دیتا کہ نتیجہ نہ تو `1` ہے اور نہ ہی `P-1`۔ تاہم، چونکہ `P-1` ایک محفوظ پرائم ہے، اس لیے ہمارے پاس درج ذیل اضافی یقین دہانی ہے، جو مشاہدہ 1 کا نتیجہ ہے:

> مشاہدہ 2۔ فرض کریں کہ `x` ایک محفوظ پرائم `P` کے لیے ضرب والے گروپ `ℤ/Pℤ` کا رکن ہے، اور فرض کریں کہ `w` ایک قدرتی عدد ہے۔ اگر `x mod P ≠ 1 mod P` اور `x mod P ≠ P-1 mod P`، نیز `w mod P ≠ P-1 mod P` اور `w mod P ≠ 0 mod P`، تو `xʷ mod P ≠ 1 mod P` اور `xʷ mod P ≠ P-1 mod P`

### ہیش فنکشن کے طور پر ماڈیولر ایکسپونینشیئشن {#modular-exponentiation}

`P` اور `w` کی کچھ قدروں کے لیے، فنکشن `pow(x, w, P)` میں بہت سے تصادم ہو سکتے ہیں۔ مثال کے طور پر، `pow(x,9,19)` صرف `{1,18}` قدریں لیتا ہے۔

یہ دیکھتے ہوئے کہ `P` پرائم ہے، تو ماڈیولر ایکسپونینشیئشن ہیشنگ فنکشن کے لیے ایک مناسب `w` درج ذیل نتیجے کا استعمال کرتے ہوئے منتخب کیا جا سکتا ہے:

> مشاہدہ 3۔ فرض کریں کہ `P` ایک پرائم ہے؛ `w` اور `P-1` نسبتاً پرائم ہیں اگر اور صرف اگر `ℤ/Pℤ` میں تمام `a` اور `b` کے لیے:<center>`aʷ mod P ≡ bʷ mod P` اگر اور صرف اگر `a mod P ≡ b mod P`</center>

اس طرح، یہ دیکھتے ہوئے کہ `P` پرائم ہے اور `w` `P-1` کے لیے نسبتاً پرائم ہے، ہمارے پاس یہ ہے کہ `|{pow(x, w, P) : x ∈ ℤ}| = P`، جس کا مطلب ہے کہ ہیشنگ فنکشن میں تصادم کی شرح ممکنہ حد تک کم ہے۔

اس خاص صورت میں کہ `P` ایک محفوظ پرائم ہے جیسا کہ ہم نے منتخب کیا ہے، تو `P-1` کے صرف عوامل (factors) 1، 2، `(P-1)/2` اور `P-1` ہیں۔ چونکہ `P` > 7، ہم جانتے ہیں کہ 3 `P-1` کے لیے نسبتاً پرائم ہے، لہذا `w=3` مندرجہ بالا تجویز کو پورا کرتا ہے۔

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