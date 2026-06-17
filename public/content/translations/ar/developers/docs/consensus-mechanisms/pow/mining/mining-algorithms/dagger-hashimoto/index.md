---
title: "⁦Dagger-Hashimoto⁩"
description: "نظرة تفصيلية على خوارزمية ⁦Dagger-Hashimoto⁩."
lang: ar
---

كانت Dagger-Hashimoto هي التنفيذ البحثي الأصلي والمواصفات لخوارزمية تعدين إيثيريوم. تم استبدال Dagger-Hashimoto بـ [إيثاش](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/#ethash). تم إيقاف التعدين تمامًا عند [الدمج](/roadmap/merge/) في <span dir="ltr">15 September 2022</span>. منذ ذلك الحين، يتم تأمين إيثيريوم باستخدام آلية [إثبات الحصة (PoS)](/developers/docs/consensus-mechanisms/pos) بدلاً من ذلك. هذه الصفحة ذات أهمية تاريخية - المعلومات الواردة هنا لم تعد ذات صلة بإيثيريوم ما بعد الدمج.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصيك بقراءة المزيد أولاً عن [إجماع إثبات العمل (PoW)](/developers/docs/consensus-mechanisms/pow)، و[التعدين](/developers/docs/consensus-mechanisms/pow/mining)، و[خوارزميات التعدين](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## ⁦Dagger-Hashimoto⁩ {#dagger-hashimoto}

تهدف ⁦Dagger-Hashimoto⁩ إلى تحقيق هدفين:

1. **مقاومة ASIC**: يجب أن تكون الفائدة من إنشاء أجهزة متخصصة للخوارزمية صغيرة قدر الإمكان.
2. **قابلية التحقق من قبل عميل خفيف**: يجب أن تكون الكتلة قابلة للتحقق بكفاءة بواسطة عميل خفيف.

مع تعديل إضافي، نحدد أيضًا كيفية تحقيق هدف ثالث إذا رغبت في ذلك، ولكن على حساب تعقيد إضافي:

**تخزين السلسلة بالكامل**: يجب أن يتطلب التعدين تخزين حالة سلسلة الكتل بالكامل (نظرًا للبنية غير المنتظمة لشجرة الحالة في إيثيريوم، نتوقع أن يكون بعض التقليم ممكنًا، خاصة لبعض العقود المستخدمة غالبًا، لكننا نريد تقليل ذلك إلى الحد الأدنى).

## إنشاء DAG {#dag-generation}

سيتم تعريف كود الخوارزمية بلغة Python أدناه. أولاً، نقدم `encode_int` لتحويل الأعداد الصحيحة غير الموقعة (unsigned ints) ذات الدقة المحددة إلى سلاسل نصية. كما يتم إعطاء معكوسها:

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

نفترض بعد ذلك أن `sha3` هي دالة تأخذ عددًا صحيحًا وتخرج عددًا صحيحًا، وأن `dbl_sha3` هي دالة <span dir="ltr">double-sha3</span>؛ إذا كنت تقوم بتحويل هذا الكود المرجعي إلى تنفيذ، فاستخدم:

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

### المعلمات {#parameters}

المعلمات المستخدمة للخوارزمية هي:

```python
SAFE_PRIME_512 = 2**512 - 38117     # أكبر عدد أولي آمن أقل من 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # حجم مجموعة البيانات (4 جيجابايت)؛ يجب أن يكون من مضاعفات 65536
      "n_inc": 65536,                   # الزيادة في قيمة n لكل فترة؛ يجب أن يكون من مضاعفات 65536
                                        # مع epochtime=20000 يعطي نموًا بمقدار 882 ميجابايت في السنة
      "cache_size": 2500,               # حجم ذاكرة التخزين المؤقت للعميل الخفيف (يمكن اختياره بواسطة العميل
                                        # الخفيف؛ ليس جزءًا من مواصفات الخوارزمية)
      "diff": 2**14,                    # الصعوبة (يتم تعديلها أثناء تقييم الكتلة)
      "epochtime": 100000,              # طول الحقبة بالكتل (وتيرة تحديث مجموعة البيانات)
      "k": 1,                           # عدد آباء العقدة
      "w": w,                          # يُستخدم لعملية التجزئة بالرفع المعياري
      "accesses": 200,                  # عدد مرات الوصول إلى مجموعة البيانات أثناء hashimoto
      "P": SAFE_PRIME_512               # عدد أولي آمن لعملية التجزئة وتوليد الأرقام العشوائية
}
```

`P` في هذه الحالة هو عدد أولي تم اختياره بحيث يكون `log₂(P)` أقل بقليل من 512، وهو ما يتوافق مع <span dir="ltr">512 bits</span> التي كنا نستخدمها لتمثيل أرقامنا. لاحظ أن النصف الأخير فقط من DAG يحتاج فعليًا إلى التخزين، لذلك تبدأ متطلبات ذاكرة الوصول العشوائي (RAM) الفعلية من <span dir="ltr">1 GB</span> وتنمو بمقدار <span dir="ltr">441 MB</span> سنويًا.

### بناء رسم Dagger البياني {#dagger-graph-building}

يتم تعريف الأساس لبناء رسم Dagger البياني على النحو التالي:

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

بشكل أساسي، يبدأ الرسم البياني كعقدة واحدة، `sha3(seed)`، ومن هناك يبدأ في إضافة عقد أخرى بالتسلسل بناءً على عقد سابقة عشوائية. عند إنشاء عقدة جديدة، يتم حساب قوة معيارية (modular power) للبذرة (seed) لاختيار بعض المؤشرات عشوائيًا التي تكون أقل من `i` (باستخدام `x % i` أعلاه)، وتُستخدم قيم العقد عند تلك المؤشرات في عملية حسابية لإنشاء قيمة جديدة لـ `x`، والتي يتم إدخالها بعد ذلك في دالة إثبات عمل صغيرة (تعتمد على XOR) لتوليد قيمة الرسم البياني في النهاية عند المؤشر `i`. الأساس المنطقي وراء هذا التصميم المعين هو فرض الوصول التسلسلي إلى DAG؛ لا يمكن تحديد القيمة التالية لـ DAG التي سيتم الوصول إليها حتى تُعرف القيمة الحالية. أخيرًا، تقوم عملية الأس المعياري (modular exponentiation) بتجزئة النتيجة بشكل أكبر.

تعتمد هذه الخوارزمية على عدة نتائج من نظرية الأعداد. راجع الملحق أدناه للمناقشة.

## تقييم العميل الخفيف {#light-client-evaluation}

يهدف بناء الرسم البياني أعلاه إلى السماح بإعادة بناء كل عقدة في الرسم البياني عن طريق حساب شجرة فرعية لعدد صغير فقط من العقد وتتطلب كمية صغيرة فقط من الذاكرة المساعدة. لاحظ أنه مع <span dir="ltr">k=1</span>، تكون الشجرة الفرعية مجرد سلسلة من القيم تصل إلى العنصر الأول في DAG.

تعمل دالة حوسبة العميل الخفيف لـ DAG على النحو التالي:

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

بشكل أساسي، إنها ببساطة إعادة كتابة للخوارزمية أعلاه التي تزيل حلقة حساب القيم لـ DAG بالكامل وتستبدل البحث السابق عن العقدة باستدعاء متكرر (recursive call) أو بحث في ذاكرة التخزين المؤقت (cache). لاحظ أنه بالنسبة لـ `k=1`، فإن ذاكرة التخزين المؤقت غير ضرورية، على الرغم من أن التحسين الإضافي يقوم فعليًا بحساب الآلاف القليلة الأولى من قيم DAG مسبقًا ويحتفظ بها كذاكرة تخزين مؤقت ثابتة للعمليات الحسابية؛ راجع الملحق للحصول على تنفيذ برمجي لذلك.

## التخزين المؤقت المزدوج لـ DAGs {#double-buffer}

في العميل الكامل، يتم استخدام [_تخزين مؤقت مزدوج_](https://wikipedia.org/wiki/Multiple_buffering) لـ 2 DAGs تم إنتاجهما بواسطة الصيغة أعلاه. الفكرة هي أن DAGs يتم إنتاجها كل عدد `epochtime` من الكتل وفقًا للمعلمات أعلاه. بدلاً من أن يستخدم العميل أحدث DAG تم إنتاجه، فإنه يستخدم السابق. تكمن فائدة ذلك في أنه يسمح باستبدال DAGs بمرور الوقت دون الحاجة إلى دمج خطوة حيث يجب على المعدنين فجأة إعادة حساب جميع البيانات. خلاف ذلك، هناك احتمال لحدوث تباطؤ مؤقت مفاجئ في معالجة السلسلة على فترات منتظمة وزيادة المركزية بشكل كبير. وبالتالي مخاطر هجوم 51% خلال تلك الدقائق القليلة قبل إعادة حساب جميع البيانات.

الخوارزمية المستخدمة لإنشاء مجموعة DAGs المستخدمة لحساب العمل لكتلة هي كما يلي:

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
        # لا يمكن إنشاء مخزن مؤقت خلفي، فقط قم بإنشاء مخزن مؤقت أمامي
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

الفكرة وراء Hashimoto الأصلي هي استخدام سلسلة الكتل كمجموعة بيانات، وإجراء عملية حسابية تحدد N من المؤشرات من سلسلة الكتل، وتجمع المعاملات عند تلك المؤشرات، وتنفذ عملية XOR لهذه البيانات، وتُرجع تجزئة النتيجة. خوارزمية Thaddeus Dryja الأصلية، المترجمة إلى Python من أجل الاتساق، هي كما يلي:

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

لسوء الحظ، في حين يُعتبر Hashimoto صعبًا على ذاكرة الوصول العشوائي (RAM hard)، فإنه يعتمد على حسابات <span dir="ltr">256-bit</span>، والتي لها عبء حسابي كبير. ومع ذلك، تستخدم ⁦Dagger-Hashimoto⁩ فقط أقل <span dir="ltr">64 bits</span> أهمية عند فهرسة مجموعة بياناتها لمعالجة هذه المشكلة.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

يسمح استخدام <span dir="ltr">double SHA3</span> بشكل من أشكال التحقق المسبق شبه الفوري بدون بيانات، والتحقق فقط من توفير قيمة وسيطة صحيحة. هذه الطبقة الخارجية من إثبات العمل صديقة جدًا لـ ASIC وضعيفة إلى حد ما، ولكنها موجودة لجعل هجمات حجب الخدمة الموزعة (DDoS) أكثر صعوبة نظرًا لأنه يجب القيام بهذا القدر الصغير من العمل من أجل إنتاج كتلة لن يتم رفضها على الفور. إليك إصدار العميل الخفيف:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## التعدين والتحقق {#mining-and-verifying}

الآن، دعونا نجمع كل ذلك معًا في خوارزمية التعدين:

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

إليك خوارزمية التحقق:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

التحقق الصديق للعميل الخفيف:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

لاحظ أيضًا أن ⁦Dagger-Hashimoto⁩ تفرض متطلبات إضافية على رأس الكتلة:

- لكي يعمل التحقق ثنائي الطبقة، يجب أن يحتوي رأس الكتلة على كل من الرقم الفريد (nonce) والقيمة الوسطى قبل <span dir="ltr">sha3</span>.
- في مكان ما، يجب أن يخزن رأس الكتلة <span dir="ltr">sha3</span> لمجموعة البذور (seedset) الحالية.

## قراءة إضافية {#further-reading}

_هل تعرف موردًا مجتمعيًا ساعدك؟ قم بتعديل هذه الصفحة وأضفه!_

## الملحق {#appendix}

كما لوحظ أعلاه، يعتمد منشئ الأرقام العشوائية (RNG) المستخدم لإنشاء DAG على بعض النتائج من نظرية الأعداد. أولاً، نقدم تأكيدًا على أن Lehmer RNG الذي يمثل الأساس للمتغير `picker` له فترة واسعة. ثانيًا، نوضح أن `pow(x,3,P)` لن يقوم بتعيين `x` إلى `1` أو `P-1` بشرط `x ∈ [2,P-2]` للبدء. أخيرًا، نوضح أن `pow(x,3,P)` لديه معدل تصادم منخفض عند التعامل معه كدالة تجزئة.

### منشئ الأرقام العشوائية Lehmer {#lehmer-random-number}

في حين أن الدالة `produce_dag` لا تحتاج إلى إنتاج أرقام عشوائية غير متحيزة، فإن التهديد المحتمل هو أن `seed**i % P` يأخذ فقط عددًا قليلاً من القيم. قد يوفر هذا ميزة للمعدنين الذين يتعرفون على النمط مقارنة بأولئك الذين لا يفعلون ذلك.

لتجنب ذلك، يتم اللجوء إلى نتيجة من نظرية الأعداد. يُعرّف [_العدد الأولي الآمن (Safe Prime)_](https://en.wikipedia.org/wiki/Safe_prime) بأنه عدد أولي `P` بحيث يكون `(P-1)/2` أيضًا عددًا أوليًا. يُعرّف _ترتيب_ العضو `x` في [المجموعة الضربية (multiplicative group)](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` بأنه الحد الأدنى `m` بحيث <pre>xᵐ mod P ≡ 1</pre>
بالنظر إلى هذه التعريفات، لدينا:

> الملاحظة 1. ليكن `x` عضوًا في المجموعة الضربية `ℤ/Pℤ` لعدد أولي آمن `P`. إذا كان `x mod P ≠ 1 mod P` و`x mod P ≠ P-1 mod P`، فإن ترتيب `x` هو إما `P-1` أو `(P-1)/2`.

_الإثبات_. نظرًا لأن `P` هو عدد أولي آمن، فبموجب [نظرية لاغرانج][lagrange] لدينا أن ترتيب `x` هو إما `1` أو `2` أو `(P-1)/2` أو `P-1`.

لا يمكن أن يكون ترتيب `x` هو `1`، لأنه بموجب نظرية فيرما الصغرى لدينا:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

وبالتالي يجب أن يكون `x` هو المحايد الضربي لـ `ℤ/nℤ`، وهو فريد. نظرًا لأننا افترضنا أن `x ≠ 1` بالافتراض، فهذا غير ممكن.

لا يمكن أن يكون ترتيب `x` هو `2` ما لم يكن `x = P-1`، لأن هذا من شأنه أن ينتهك كون `P` عددًا أوليًا.

من الافتراض أعلاه، يمكننا أن ندرك أن تكرار `(picker * init) % P` سيكون له طول دورة لا يقل عن `(P-1)/2`. هذا لأننا اخترنا `P` ليكون عددًا أوليًا آمنًا يساوي تقريبًا قوة أعلى للعدد اثنين، و`init` يقع في الفترة `[2,2**256+1]`. بالنظر إلى حجم `P`، يجب ألا نتوقع أبدًا دورة من الأس المعياري.

عندما نقوم بتعيين الخلية الأولى في DAG (المتغير المسمى `init`)، فإننا نحسب `pow(sha3(seed) + 2, 3, P)`. للوهلة الأولى، هذا لا يضمن أن النتيجة ليست `1` ولا `P-1`. ومع ذلك، نظرًا لأن `P-1` هو عدد أولي آمن، فلدينا التأكيد الإضافي التالي، وهو نتيجة طبيعية للملاحظة 1:

> الملاحظة 2. ليكن `x` عضوًا في المجموعة الضربية `ℤ/Pℤ` لعدد أولي آمن `P`، وليكن `w` عددًا طبيعيًا. إذا كان `x mod P ≠ 1 mod P` و`x mod P ≠ P-1 mod P`، وكذلك `w mod P ≠ P-1 mod P` و`w mod P ≠ 0 mod P`، فإن `xʷ mod P ≠ 1 mod P` و`xʷ mod P ≠ P-1 mod P`

### الأس المعياري كدالة تجزئة {#modular-exponentiation}

بالنسبة لقيم معينة لـ `P` و`w`، قد يكون للدالة `pow(x, w, P)` العديد من التصادمات. على سبيل المثال، يأخذ `pow(x,9,19)` القيم `{1,18}` فقط.

بالنظر إلى أن `P` هو عدد أولي، فيمكن اختيار `w` مناسب لدالة تجزئة الأس المعياري باستخدام النتيجة التالية:

> الملاحظة 3. ليكن `P` عددًا أوليًا؛ `w` و`P-1` أوليان نسبيًا إذا وفقط إذا كان لجميع `a` و`b` في `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` إذا وفقط إذا كان `a mod P ≡ b mod P`</center>

وبالتالي، بالنظر إلى أن `P` هو عدد أولي وأن `w` أولي نسبيًا لـ `P-1`، فلدينا أن `|{pow(x, w, P) : x ∈ ℤ}| = P`، مما يعني أن دالة التجزئة لديها أقل معدل تصادم ممكن.

في الحالة الخاصة التي يكون فيها `P` عددًا أوليًا آمنًا كما اخترنا، فإن `P-1` له العوامل 1 و2 و`(P-1)/2` و`P-1` فقط. نظرًا لأن `P` > 7، فإننا نعلم أن 3 أولي نسبيًا لـ `P-1`، وبالتالي فإن `w=3` يفي بالافتراض أعلاه.

## خوارزمية تقييم أكثر كفاءة تعتمد على ذاكرة التخزين المؤقت {#cache-based-evaluation}

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