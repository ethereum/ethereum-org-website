---
title: خنجر هاشيموتو
description: نظرة تفصيلية على خوارزمية Dagger-Hashimoto.
lang: ar
---

كان Dagger-Hashimoto هو التنفيذ البحثي الأصلي والمواصفات الخاصة بخوارزمية تعدين Ethereum. تم استبدال Dagger-Hashimoto بـ [Ethash](#ethash). تم إيقاف التنقيب بالكامل عند [الدمج](/roadmap/merge/) في 15 سبتمبر 2022. منذ ذلك الحين، تم تأمين Ethereum باستخدام آلية [إثبات الحصة](/developers/docs/consensus-mechanisms/pos) بدلًا من ذلك. هذه الصفحة مخصصة للاهتمام التاريخي - المعلومات الواردة هنا لم تعد ذات صلة بـ Ethereum بعد الدمج.

## المتطلبات الأساسية {#prerequisites}

لفهم هذه الصفحة بشكل أفضل، نوصي بأن تقرأ أولًا عن [إجماع إثبات العمل](/developers/docs/consensus-mechanisms/pow)، و[التنقيب](/developers/docs/consensus-mechanisms/pow/mining)، و[خوارزميات التنقيب](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

يهدف Dagger-Hashimoto إلى تحقيق هدفين:

1. **مقاومة ASIC**: يجب أن تكون الفائدة من إنشاء أجهزة متخصصة للخوارزمية صغيرة قدر الإمكان
2. **إمكانية التحقق لدى العميل الخفيف**: يجب أن تكون الكتلة قابلة للتحقق بكفاءة من قبل عميل خفيف.

من خلال تعديل إضافي، نحدد أيضًا كيفية تحقيق الهدف الثالث إذا رغبنا في ذلك، ولكن على حساب التعقيد الإضافي:

**تخزين السلسلة الكاملة**: يجب أن يتطلب التنقيب تخزين حالة البلوكتشين الكاملة (نظرًا للهيكل غير المنتظم لـ Ethereum state trie، نتوقع أن يكون بعض التقليم ممكنًا، خاصة لبعض العقود المستخدمة بشكل متكرر، لكننا نريد تقليل ذلك).

## إنشاء DAG {#dag-generation}

سيتم تعريف كود الخوارزمية في Python أدناه. أولًا، نقدم `encode_int` لتسلسل الأعداد الصحيحة غير الموقعة ذات الدقة المحددة إلى سلاسل. ويعطى معكوسها أيضًا:

```python
NUM_BITS = 512

def encode_int(x):
    "ترميز عدد صحيح x كسلسلة من 64 حرفًا باستخدام مخطط big-endian"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "فك ترميز عدد صحيح x من سلسلة باستخدام مخطط big-endian"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

نفترض بعد ذلك أن `sha3` هي دالة تأخذ عددًا صحيحًا وتُخرج عددًا صحيحًا، و`dbl_sha3` هي دالة sha3-مزدوجة؛ إذا كنت تريد تحويل هذا الكود المرجعي إلى تنفيذ، استخدم:

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

المعلمات المستخدمة في الخوارزمية هي:

```python
SAFE_PRIME_512 = 2**512 - 38117     # أكبر عدد أولي آمن أقل من 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # حجم مجموعة البيانات (4 جيجابايت)؛ يجب أن يكون من مضاعفات 65536
      "n_inc": 65536,                   # الزيادة في قيمة n لكل فترة؛ يجب أن يكون من مضاعفات 65536
                                        # مع epochtime=20000 يعطي نموًا قدره 882 ميجابايت سنويًا
      "cache_size": 2500,               # حجم ذاكرة التخزين المؤقت للعميل الخفيف (يمكن اختياره من قبل العميل الخفيف؛ ليس جزءًا من مواصفات الخوارزمية)
      "diff": 2**14,                    # الصعوبة (يتم تعديلها أثناء تقييم الكتلة)
      "epochtime": 100000,              # طول الحقبة بالكتل (كم مرة يتم تحديث مجموعة البيانات)
      "k": 1,                           # عدد آباء العقدة
      "w": w,                          # يُستخدم لتجزئة الأُسِّي المعياري
      "accesses": 200,                  # عدد مرات الوصول إلى مجموعة البيانات أثناء hashimoto
      "P": SAFE_PRIME_512               # عدد أولي آمن للتجزئة وإنشاء الأرقام العشوائية
}
```

`P` في هذه الحالة هو عدد أولي تم اختياره بحيث يكون `log₂(P)` أقل بقليل من 512، وهو ما يتوافق مع 512 بت التي نستخدمها لتمثيل أرقامنا. لاحظ أن النصف الأخير فقط من DAG هو الذي يحتاج فعليًا إلى التخزين، وبالتالي فإن متطلبات ذاكرة الوصول العشوائي الفعلية تبدأ من 1 جيجابايت وتنمو بمقدار 441 ميجابايت سنويًا.

### بناء مخطط Dagger {#dagger-graph-building}

يتم تعريف بدائية بناء الرسم البياني للخنجر على النحو التالي:

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

بشكل أساسي، يبدأ المخطط بعقدة واحدة، `sha3(seed)`، ومن هناك يبدأ في إضافة عُقد أخرى بالتتابع استنادًا إلى عُقد سابقة عشوائية. عند إنشاء عقدة جديدة، يتم حساب قوة معيارية للبذرة لاختيار بعض الفهارس الأقل من `i` بشكل عشوائي (باستخدام `x % i` أعلاه)، وتُستخدم قيم العُقد في تلك الفهارس في عملية حسابية لتوليد قيمة جديدة لـ `x`، والتي يتم بعد ذلك إدخالها في دالة إثبات عمل صغيرة (تعتمد على XOR) لتوليد قيمة المخطط في النهاية عند الفهرس `i`. إن الأساس المنطقي وراء هذا التصميم المحدد هو فرض الوصول المتسلسل إلى DAG؛ ولا يمكن تحديد القيمة التالية لـ DAG التي سيتم الوصول إليها حتى يتم معرفة القيمة الحالية. أخيرًا، تقوم الأسس المعيارية بتجزئه النتيجة بشكل أكبر.

تعتمد هذه الخوارزمية على العديد من النتائج المستمدة من نظرية الأعداد. انظر الملحق أدناه للمناقشة.

## تقييم العميل الخفيف {#light-client-evaluation}

يهدف إنشاء الرسم البياني أعلاه إلى السماح بإعادة بناء كل عقدة في الرسم البياني عن طريق حساب شجرة فرعية من عدد صغير فقط من العقد وتتطلب قدرًا صغيرًا فقط من الذاكرة المساعدة. لاحظ أنه مع k=1، تكون الشجرة الفرعية عبارة عن سلسلة من القيم تصل إلى العنصر الأول في DAG فقط.

تعمل وظيفة الحوسبة الخفيفة للعميل لـ DAG على النحو التالي:

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

في الأساس، إنه ببساطة إعادة كتابة للخوارزمية المذكورة أعلاه والتي تزيل حلقة حساب القيم لـ DAG بالكامل وتستبدل البحث السابق عن العقدة بمكالمة متكررة أو بحث في ذاكرة التخزين المؤقت. لاحظ أنه بالنسبة لـ `k=1`، فإن ذاكرة التخزين المؤقت غير ضرورية، على الرغم من أن التحسين الإضافي يقوم في الواقع بحساب أول بضعة آلاف من قيم DAG مسبقًا ويحتفظ بها كذاكرة تخزين مؤقت ثابتة للعمليات الحسابية؛ راجع الملحق للاطلاع على تطبيق الكود لهذا.

## المخزن المؤقت المزدوج لـ DAGs {#double-buffer}

في العميل الكامل، يتم استخدام [_مخزن مؤقت مزدوج_](https://wikipedia.org/wiki/Multiple_buffering) لـ 2 DAGs تم إنتاجهما بواسطة الصيغة أعلاه. الفكرة هي أن DAGs يتم إنتاجها كل `epochtime` عدد من الكتل وفقًا للمعلمات المذكورة أعلاه. بدلاً من استخدام العميل لأحدث DAG تم إنتاجه، فإنه يستخدم DAG السابق. تكمن فائدة هذا في أنه يسمح باستبدال DAGs بمرور الوقت دون الحاجة إلى دمج خطوة حيث يتعين على عمال المناجم إعادة حساب جميع البيانات فجأة. وإلا، فإن هناك احتمالية لحدوث تباطؤ مؤقت مفاجئ في معالجة السلسلة على فترات منتظمة وزيادة المركزية بشكل كبير. وبالتالي، هناك 51% من مخاطر الهجوم خلال تلك الدقائق القليلة قبل إعادة حساب كافة البيانات.

الخوارزمية المستخدمة لتوليد مجموعة DAGs المستخدمة لحساب العمل للكتلة هي كما يلي:

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
        # لا يمكن وجود مخزن مؤقت خلفي، فقط أنشئ مخزنًا مؤقتًا أماميًا
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

الفكرة وراء Hashimoto الأصلي هي استخدام blockchain كمجموعة بيانات، وإجراء عملية حسابية تختار N من المؤشرات من blockchain، وجمع المعاملات في تلك المؤشرات، وتنفيذ XOR لهذه البيانات، وإرجاع تجزئة النتيجة. الخوارزمية الأصلية لثاديوس دريجا، والتي تمت ترجمتها إلى بايثون لتحقيق الاتساق، هي كما يلي:

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

لسوء الحظ، على الرغم من أن Hashimoto يعتبر من الصعب التعامل مع ذاكرة الوصول العشوائي (RAM)، إلا أنه يعتمد على العمليات الحسابية التي تبلغ 256 بت، وهو ما ينطوي على تكلفة حسابية كبيرة. ومع ذلك، يستخدم Dagger-Hashimoto فقط أقل 64 بت أهمية عند فهرسة مجموعة البيانات الخاصة به لمعالجة هذه المشكلة.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

يسمح استخدام SHA3 المزدوج بنوع من التحقق المسبق شبه الفوري بدون بيانات، والتحقق فقط من توفير قيمة وسيطة صحيحة. تعتبر هذه الطبقة الخارجية من إثبات العمل صديقة للغاية لـ ASIC وهي ضعيفة إلى حد ما، ولكنها موجودة لجعل هجمات DDoS أكثر صعوبة حيث يجب القيام بكمية صغيرة من العمل لإنتاج كتلة لن يتم رفضها على الفور. وهنا إصدار العميل الخفيف:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## التنقيب والتحقق {#mining-and-verifying}

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

وهنا خوارزمية التحقق:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

التحقق السهل من العميل:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

لاحظ أيضًا أن Dagger-Hashimoto يفرض متطلبات إضافية على رأس الكتلة:

- لكي يعمل التحقق من طبقتين، يجب أن يحتوي رأس الكتلة على كل من القيمة العشوائية والقيمة الوسطى قبل sha3
- في مكان ما، يجب أن يخزن رأس الكتلة sha3 لمجموعة البذور الحالية

## قراءة إضافية{#further-reading}

_هل تعرف أحد الموارد المجتمعية التي ساعدتك؟ عدّل هذه الصفحة وأضفه!_

## الملحق {#appendix}

كما هو مذكور أعلاه، يعتمد RNG المستخدم لتوليد DAG على بعض النتائج من نظرية الأعداد. أولًا، نقدم تأكيدًا بأن Lehmer RNG الذي هو أساس متغير `picker` له فترة واسعة. ثانيًا، نوضح أن `pow(x,3,P)` لن يربط `x` بـ `1` أو `P-1` بشرط أن يكون `x ∈ [2,P-2]` في البداية. أخيرًا، نوضح أن `pow(x,3,P)` له معدل تصادم منخفض عند التعامل معه كدالة تجزئة.

### مولد أرقام Lehmer العشوائي {#lehmer-random-number}

في حين أن الدالة `produce_dag` لا تحتاج إلى إنتاج أرقام عشوائية غير متحيزة، إلا أن التهديد المحتمل هو أن `seed**i % P` لا يأخذ سوى عدد قليل من القيم. قد يوفر هذا ميزة للمنقبين الذين يتعرفون على النمط مقارنة بأولئك الذين لا يتعرفون عليه.

لتجنب ذلك، تم الاستعانة بنتيجة من نظرية الأعداد. يُعرَّف [_العدد الأولي الآمن_](https://en.wikipedia.org/wiki/Safe_prime) بأنه عدد أولي `P` بحيث يكون `(P-1)/2` عددًا أوليًا أيضًا. تُعرَّف _رتبة_ العضو `x` في [المجموعة الضربية](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` بأنها الحد الأدنى `m` بحيث <pre>xᵐ mod P ≡ 1</pre>
بالنظر إلى هذه التعريفات، لدينا:

> Observation 1. ليكن `x` عضوًا في المجموعة الضربية `ℤ/Pℤ` لعدد أولي آمن `P`. إذا كان `x mod P ≠ 1 mod P` و`x mod P ≠ P-1 mod P`، فإن رتبة `x` تكون إما `P-1` أو `(P-1)/2`.

_إثبات_. بما أن `P` عدد أولي آمن، فإنه بموجب [نظرية لاغرانج][lagrange]، فإن رتبة `x` هي إما `1` أو `2` أو `(P-1)/2` أو `P-1`.

لا يمكن أن تكون رتبة `x` هي `1`، لأنه بموجب نظرية فيرما الصغرى لدينا:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

وبالتالي يجب أن يكون `x` هوية ضربية لـ `ℤ/nℤ`، وهي فريدة من نوعها. بما أننا افترضنا أن `x ≠ 1`، فإن هذا غير ممكن.

لا يمكن أن تكون رتبة `x` هي `2` إلا إذا كان `x = P-1`، لأن هذا من شأنه أن ينتهك كون `P` عددًا أوليًا.

من الاقتراح أعلاه، يمكننا أن ندرك أن تكرار `(picker * init) % P` سيكون له طول دورة لا يقل عن `(P-1)/2`. هذا لأننا اخترنا `P` ليكون عددًا أوليًا آمنًا يساوي تقريبًا قوة أعلى لاثنين، و`init` في الفترة `[2,2**256+1]`. نظرًا لحجم `P`، لا ينبغي أن نتوقع أبدًا دورة من الأُسِّي المعياري.

عندما نقوم بتعيين الخلية الأولى في DAG (المتغير المسمى `init`)، نحسب `pow(sha3(seed) + 2, 3, P)`. للوهلة الأولى، هذا لا يضمن أن النتيجة ليست `1` ولا `P-1`. ومع ذلك، بما أن `P-1` هو عدد أولي آمن، فلدينا الضمان الإضافي التالي، وهو نتيجة طبيعية للملاحظة 1:

> Observation 2. ليكن `x` عضوًا في المجموعة الضربية `ℤ/Pℤ` لعدد أولي آمن `P`، وليكن `w` عددًا طبيعيًا. إذا كان `x mod P ≠ 1 mod P` و `x mod P ≠ P-1 mod P`، وكذلك `w mod P ≠ P-1 mod P` و `w mod P ≠ 0 mod P`، فإن `xʷ mod P ≠ 1 mod P` و `xʷ mod P ≠ P-1 mod P`

### الأُسِّي المعياري كدالة تجزئة {#modular-exponentiation}

بالنسبة لقيم معينة من `P` و `w`، قد تحتوي الدالة `pow(x, w, P)` على العديد من التصادمات. على سبيل المثال، `pow(x,9,19)` يأخذ فقط القيم `{1,18}`.

بافتراض أن `P` عدد أولي، يمكن اختيار `w` مناسب لدالة تجزئة الأُسِّي المعياري باستخدام النتيجة التالية:

> Observation 3. ليكن `P` عددًا أوليًا؛ يكون `w` و `P-1` أوليين نسبيًا إذا وفقط إذا كان لكل `a` و `b` في `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` إذا وفقط إذا كان `a mod P ≡ b mod P`</center>

وبالتالي، بما أن `P` عدد أولي و`w` أولي نسبيًا مع `P-1`، فلدينا `|{pow(x, w, P) : x ∈ ℤ}| = P`، مما يعني أن دالة التجزئة لديها الحد الأدنى الممكن من معدل التصادم.

في الحالة الخاصة التي يكون فيها `P` عددًا أوليًا آمنًا كما اخترنا، فإن `P-1` له فقط العوامل 1، 2، `(P-1)/2` و `P-1`. بما أن `P > 7`، فإننا نعلم أن 3 أولي نسبيًا مع `P-1`، وبالتالي فإن `w=3` يفي بالاقتراح أعلاه.

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
