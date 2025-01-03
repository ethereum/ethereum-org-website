---
title: Dagger-Hashamoto
description: نگاهی دقیق به الگوریتم Dagger-Hashimoto.
lang: fa
---

Dagger-Hashimoto زیرساخت و مشخصات اولیه تحقیقاتی برای الگوریتم استخراج اتریوم بود. Dagger-Hashimoto به [Ethash](#ethash) تغییر نام داده شد. استخراج به طور کامل در [ادغام](/roadmap/merge/) در 15 سپتامبر 2022 خاموش شد. از آن زمان، اتریوم با استفاده از مکانیزم [اثبات سهام](/developers/docs/consensus-mechanisms/pos) ایمن شده است. این صفحه برای رجوع تاریخی است - اطلاعات اینجا دیگر مرتبط به اتریوم پس از ادغام نیست.

## موارد مورد نیاز {#prerequisites}

برای فهم بهتر این مقاله، پیشنهاد می کنیم ابتدا [اجماع اثبات کار](/developers/docs/consensus-mechanisms/pow)،[استخراج](/developers/docs/consensus-mechanisms/pow/mining) و [الگوریتم استخراج](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) را مطالعه کنید.

## Dagger-Hashamoto {#dagger-hashimoto}

Dagger-Hashamato دو هدف را برآورده می کند:

1.  **مقاومت در برابر اسیک**: مزیت حاصل از ایجاد سخت افزار تخصصی برای الگوریتم باید تا حد امکان کم باشد
2.  **تأیید پذیری کاربر سبک**: یک بلوک باید به طور مؤثر توسط کاربر سبک قابل تأیید باشد.

با یک تغییر اضافی، همچنین مشخص می کنیم که چگونه می توان یک هدف سوم را در صورت تمایل برآورده کرد، هر چند با بهای افزایش پیچیدگی همراه باشد:

**ذخیره‌سازی زنجیره کامل**: استخراج باید به ذخیره‌سازی حالت بلاک چین کامل نیاز داشته باشد (به دلیل ساختار نامنظم درخت حالت اتریوم، پیش‌بینی می‌کنیم برخی هرس‌ها امکان‌پذیر باشد، به ویژه در بعضی قراردادهای پرمصرف، ولی می خواهیم این را به حداقل برسانیم).

## تولید DAG {#dag-generation}

کد الگوریتم در Python در زیر تعریف خواهد شد. ابتدا، `encode_int` را برای مارشال کردن اینت های بدون علامت با دقت مشخص به سطرها می دهیم. معکوس آن نیز داده می شود:

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

در مرحله بعد فرض می کنیم `sha3` تابعی است که یک عدد صحیح می گیرد و یک عدد صحیح را خروجی می دهد و `dbl_sha3` یک تابع double-sha3 است. اگر این کد مرجع را به یک اجرا تبدیل کنید:

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

### پارامترها {#parameters}

پارامتر هایی که برای الگوریتم مورد استفاده قرار می گیرند:

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

`P` در این حالت یک عدد اول انتخاب شده است، طوری که `log₂(P)` فقط کمی کمتر از 512 است، که متناسب با 512 بیتی است که برای نشان دادن اعدادمان استفاده کرده‌ایم. توجه داشته باشید که تنها نیمه دوم DAG در واقع باید ذخیره شود، بنابراین نیاز واقعی RAM از 1 گیگابایت شروع می شود و 441 مگابایت در سال افزایش می یابد.

### ساختار نمودار Dagger {#dagger-graph-building}

ساختار اولیه نمودار Dagger به صورت زیر تعریف می شود:

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

اساساً، از یک نمودار به عنوان یک گره منفرد، `sha3(seed)` شروع می شود، و از آنجا شروع به اضافه کردن متوالی گره های دیگر بر اساس گره های تصادفی قبلی می کند. هنگامی که یک گره جدید ایجاد می شود، یک توان مدولار از بذر محاسبه می شود تا به طور تصادفی برخی از شاخص های کمتر از `i` (با استفاده از `x % i` بالا) انتخاب شود، و مقادیر گره‌ها در آن شاخص‌ها در یک محاسبه برای ایجاد یک مقدار جدید برای `x` استفاده می‌شوند، که سپس به یک تابع کوچک اثبات کار (بر اساس XOR) وارد می‌شود تا در نهایت مقدار نمودار در فهرست `i` را ایجاد کند. منطق پشت این طراحی خاص، اجبار به دسترسی متوالی به DAG است. تا زمانی که مقدار فعلی مشخص نشود، مقدار بعدی DAG قابل دسترسی نیست. در نهایت، توان مدولار نتیجه را بیشتر هش می کند.

این الگوریتم بر چندین نتیجه از نظریه اعداد متکی است. برای ادامه بحث به پیوست زیر مراجعه کنید.

## ارزیابی کاربر سبک {#light-client-evaluation}

ساختار نمودار بالا تمایل دارد به هر گره در نمودار اجازه دهد با محاسبه زیردرختی از تعداد کمی گره و نیاز به مقدار کمی حافظه کمکی، بازسازی شود. توجه داشته باشید که با k=1، زیردرخت فقط زنجیره ای از مقادیر است که تا اولین عنصر در DAG بالا می رود.

تابع محاسبات کاربر سبک برای DAG به صورت زیر عمل می کند:

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

اساساً، این به سادگی بازنویسی الگوریتم فوق است که حلقه محاسبه مقادیر کل DAG را حذف می کند و جستجوی گره قبلی را با یک فراخوان بازگشتی یا جستجوی حافظه پنهان جایگزین می کند. توجه داشته باشید که برای `k=1` حافظه نهان ضروری نیست، اگرچه یک بهینه سازی بیشتر در واقع چند هزار مقدار اول DAG را از قبل محاسبه می کند و آن را به عنوان یک حافظه نهان ثابت برای محاسبات نگه می دارد. برای اجرای کد این مورد به پیوست مراجعه کنید.

## بافر دوگانه DAGها {#double-buffer}

در یک کاربر کامل، یک [_بافر دوگانه_](https://wikipedia.org/wiki/Multiple_buffering) از 2 DAG تولید شده توسط فرمول بالا استفاده می شود. ایده این است که DAG ها در هر تعداد `زمان ایپوک` بلوک، مطابق با پارامترهای بالا تولید می شوند. به جای اینکه مشتری از آخرین DAG تولید شده استفاده کند، از DAG قبلی استفاده می کند. مزیت این کار این است که اجازه می دهد DAG ها در طول زمان بدون نیاز به ترکیب مرحله ای جایگزین شوند که در آن استخراجگرها باید به طور ناگهانی همه داده ها را دوباره محاسبه کنند. در غیر این صورت، پتانسیل کاهش ناگهانی و موقتی در پردازش زنجیره ای در فواصل زمانی منظم و افزایش چشمگیر تمرکز وجود دارد. بنابراین 51 درصد خطر حمله ظرف چند دقیقه قبل از محاسبه مجدد همه داده ها، وجود دارد.

الگوریتم مورد استفاده برای تولید مجموعه ای از DAGهای مورد استفاده برای محاسبه کار برای یک بلوک به شرح زیر است:

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

## هاشیموتو {#hashimoto}

ایده پشت هاشیموتو اصلی استفاده از بلاک چین به عنوان مجموعه داده، انجام محاسباتی است که N شاخص را از زنجیره بلوکی انتخاب می‌کند، تراکنش‌ها را در آن شاخص‌ها جمع‌آوری می‌کند، XOR این داده‌ها را انجام می‌دهد و هشِ نتیجه را برمی‌گرداند. الگوریتم اصلی Thaddeus Dryja که برای سازگاری به Python ترجمه شده است به شرح زیر است:

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

متأسفانه، در حالی که هاشیموتو برای RAM سخت در نظر گرفته می شود، بر محاسبات 256 بیتی متکی است که سربار محاسباتی قابل توجهی دارد. با این حال، Dagger-Hashimoto هنگام نمایه سازی مجموعه داده های خود برای رسیدگی به این مشکل، تنها از حداقل 64 بیت استفاده می کند.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

استفاده از SHA3 مضاعف امکان پیش‌آزمایی فوری و بدون داده را فراهم می‌کند و فقط تأیید می‌کند که یک مقدار متوسط ​​صحیح ارائه شده است. این لایه بیرونی اثبات کار بسیار ASIC-پسند و نسبتاً ضعیف است، اما وجود دارد تا DDoS را حتی دشوارتر کند زیرا آن مقدار کم کار باید انجام شود تا بلوکی تولید شود که فوراً رد نشود. این نسخه کاربر سبک است:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## استخراج و راستی آزمایی {#mining-and-verifying}

حال، برای االگوریتم استخراج، همه را در کنار یکدیگر قرار می دهیم:

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

این الگوریتم تایید است:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

راستی آزمایی کاربر سبک:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

همچنین، توجه داشته باشید که Dagger-Hashimoto الزامات اضافی را بر روی سر بلوک اعمال می کند:

- برای اینکه تأیید دو لایه کار کند، یک سر بلوک باید هم مقدار نانس و هم مقدار میانی pre-sha3 را داشته باشد
- در جایی، یک سر بلوک باید sha3 مجموعه seedset فعلی را ذخیره کند

## اطلاعات بیشتر {#further-reading}

_آیا منبعی اجتماعی می‌شناسید که به شما کمک کرده باشد؟ این صفحه را ویرایش کنید و آن را اضافه کنید!_

## پیوست‌ {#appendix}

همانطور که در بالا ذکر شد، RNG مورد استفاده برای تولید DAG به برخی نتایج نظریه اعداد متکی است. اول، ما اطمینان می دهیم که Lehmer RNG که مبنایی برای متغیر `picker` است دارای یک دوره گسترده است. دوم، نشان می‌دهیم که `pow(x,3,P)` `x` را به `1` یا `P-1</0 نگاشت نمی‌کند. > <code>x ∈ [2,P-2]` برای شروع ارائه شده است. در نهایت، نشان می‌دهیم که `pow(x,3,P)` وقتی به عنوان یک تابع هش در نظر گرفته می‌شود، نرخ برخورد پایینی دارد.

### مولد اعداد تصادفی Lehmer {#lehmer-random-number}

در حالی که تابع `produce_dag` نیازی به تولید اعداد تصادفی بی طرفانه ندارد، یک تهدید بالقوه این است که `seed**i % P` فقط تعداد انگشت شماری از مقادیر را دریافت کند. این می تواند مزیتی برای استخراجگرها ایجاد کند که الگو را نسبت به کسانی که این کار را نمی شناسند، تشخیص دهند.

برای جلوگیری از این امر، از یک نتیجه نظریه اعداد استفاده می شود. [_Safe Prime_](https://en.wikipedia.org/wiki/Safe_prime) به صورت اول `P` تعریف شده است، طوری که `(P-1)/2` نیز اول باشد. _ترتیب_ یک عضو `x` از [گروه ضربی](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` حداقل `m` تعریف شده است، طوری که <pre>xᵐ mod P ≡ 1</pre>
با توجه به این تعاریف داریم:

> مشاهده 1. اجازه دهید `x` عضوی از گروه ضربی `ℤ/Pℤ` برای عدد اول امن `P` باشد. اگر `x mod P ≠ 1 mod P` و `x mod P ≠ P-1 mod P`، آنگاه ترتیب `x` یا ` است P-1` یا `(P-1)/2`.

_اثبات_. از آنجا که `P` یک عدد اول امن است، پس با \[قضیه لاگرانژ\] \[لاگرانژ\] می‌بینیم که ترتیب `x` یا `1` است یا `2` یا `(P-1)/2` یا `P-1`.

ترتیب `x` نمی تواند `1` باشد، زیرا با قضیه کوچک فرما داریم:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

بنابراین `x` باید یک هویت ضربی از `ℤ/nℤ` باشد، که منحصر به فرد است. از آنجا که فرض کردیم `x ≠ 1`، بر اساس فرض، این امکان پذیر نیست.

ترتیب `x` نمی تواند `2` باشد مگر اینکه `x = P-1` باشد، زیرا این امر ناقض اصلی بودن `P` است.

از گزاره بالا، می توانیم تشخیص دهیم که تکرار `( picker * init) % P` دارای طول چرخه حداقل `(P-1)/2` خواهد بود. این به این دلیل است که ما `P` را به عنوان یک عدد اول امن تقریباً برابر با توان بالاتر از دو انتخاب کردیم و `init` در بازه `[2,2**256+1]` است. با توجه به بزرگی `P`، هرگز نباید انتظار چرخه ای از توان مدولار داشته باشیم.

هنگامی که اولین سلول را در DAG اختصاص می دهیم (متغیر با برچسب `init`)، `pow(sha3(seed) + 2, 3, P)` را محاسبه می کنیم. در نگاه اول، این تضمین نمی کند که نتیجه نه `1` و نه `P-1` باشد. با این حال، از آنجا که `P-1` یک عدد اول امن است، ما تضمین اضافی زیر را داریم که نتیجه مشاهده 1 است:

> مشاهده 2. اجازه دهید `x` عضوی از گروه ضربی `ℤ/Pℤ` برای عدد اول امن `P` باشد، و اجازه دهید `w` یک عدد طبیعی باشد. اگر `x mod P ≠ 1 mod P` و `x mod P ≠ P-1 mod P`، و همچنین `w mod P ≠ P-1 mod P</ 0> و <code>w mod P ≠ 0 mod P`، سپس `xʷ mod P ≠ 1 mod P` و `xʷ mod P ≠ P-1 mod P`

### توان مدولار به عنوان یک تابع هش {#modular-exponentiation}

برای مقادیر معینی از `P` و `w`، تابع `pow(x، w، P)` ممکن است برخوردهای زیادی داشته باشد. برای مثال، `pow(x,9,19)` فقط مقادیر `{1,18}` را می گیرد.

با توجه به اینکه `P` اول است، می‌توان با استفاده از نتیجه زیر، یک `w` مناسب برای یک تابع درهم‌سازی توان مدولار انتخاب کرد:

> مشاهده 3. بگذارید `P` عدد اول باشد. `w` و `P-1` نسبتاً اول هستند اگر و فقط اگر برای همه `a` و `b` در `ℤ /Pℤ`:
> 
> <center>
>   «aʷ mod P ≡ bʷ mod P» اگر و فقط اگر «a mod P ≡ b mod P»
> </center>

بنابراین، با توجه به اینکه `P` اول است و `w` نسبتاً اول نسبت به `P-1`، داریم که `|{pow(x, w, P) : x ∈ ℤ}| = P`، به این معنی است که تابع هش حداقل نرخ برخورد ممکن را دارد.

در حالت خاصی که `P` همانطور که انتخاب کرده‌ایم یک عدد اول امن است، پس `P-1` فقط فاکتورهای 1، 2، `(P-1)/2` و `P-1` را دارد. از آنجا که `P` > 7، می دانیم که 3 نسبتاً اول نسبت به `P-1` است، بنابراین `w=3` گزاره فوق را برآورده می کند.

## الگوریتم کارآمدتر ارزیابی مبتنی بر حافظه پنهان {#cache-based-evaluation}

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
