---
title: Dagger-Hashimoto
description: "Детальний огляд алгоритму Dagger-Hashimoto."
lang: uk
---

Dagger-Hashimoto — це початкова дослідницька реалізація та специфікація для алгоритму майнінгу Ethereum. Алгоритм Dagger-Hashimoto був замінений на [Ethash](#ethash). Майнінг було повністю вимкнено під час [Злиття (The Merge)](/roadmap/merge/) 15 вересня 2022 року. Відтоді безпека Ethereum забезпечується за допомогою механізму [доказу частки володіння (proof-of-stake)](/developers/docs/consensus-mechanisms/pos). Ця сторінка представляє історичний інтерес: інформація на ній більше не є актуальною для Ethereum після Злиття.

## Передумови {#prerequisites}

Щоб краще зрозуміти цю сторінку, ми рекомендуємо вам спочатку ознайомитися з [консенсусом доказу виконаної роботи (proof-of-work)](/developers/docs/consensus-mechanisms/pow), [майнінгом](/developers/docs/consensus-mechanisms/pow/mining) та [алгоритмами майнінгу](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto має на меті досягнення двох цілей:

1. **Стійкість до ASIC**: вигода від створення спеціалізованого обладнання для цього алгоритму має бути якомога меншою
2. **Верифікація легким клієнтом**: блок має ефективно перевірятися легким клієнтом.

За допомогою додаткової модифікації ми також визначаємо, як за бажанням досягти третьої мети, але за рахунок додаткової складності:

**Повне зберігання ланцюга**: майнінг повинен вимагати зберігання повного стану блокчейну (через нерегулярну структуру дерева станів Ethereum ми припускаємо, що можливе деяке скорочення, зокрема, деяких часто використовуваних контрактів, але ми хочемо звести це до мінімуму).

## Генерація DAG {#dag-generation}

Код для алгоритму буде визначено на Python нижче. По-перше, ми надаємо `encode_int` для маршалінгу беззнакових цілих чисел заданої точності в рядки. Його зворотний порядок також наведено:

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

Далі ми припускаємо, що `sha3` — це функція, яка приймає ціле число та виводить ціле число, а `dbl_sha3` — це функція подвійного sha3; якщо ви перетворюєте цей еталонний код у реалізацію, використовуйте:

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

### Параметри {#parameters}

Для алгоритму використовуються такі параметри:

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

У цьому випадку `P` — це просте число, вибране так, що `log₂(P)` трохи менше 512, що відповідає 512 бітам, які ми використовуємо для представлення наших чисел. Зауважте, що насправді потрібно зберігати лише останню половину DAG, тому фактична потреба в оперативній пам’яті починається з 1 ГБ і зростає на 441 МБ на рік.

### Побудова графа Dagger {#dagger-graph-building}

Примітив побудови графа Dagger визначається так:

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

По суті, він починає граф як один вузол `sha3(seed)` і звідти починає послідовно додавати інші вузли на основі випадкових попередніх вузлів. Коли створюється новий вузол, обчислюється модульний степінь початкового числа для випадкового вибору деяких індексів, менших за `i` (використовуючи `x % i` вище), і значення вузлів за цими індексами використовуються в обчисленні для генерації нового значення для `x`, яке потім передається в невелику функцію доказу виконаної роботи (на основі XOR), щоб зрештою згенерувати значення графа за індексом `i`. Обґрунтування цього конкретного дизайну полягає в тому, щоб примусити послідовний доступ до DAG; наступне значення DAG, до якого буде отримано доступ, неможливо визначити, доки не буде відомо поточне значення. Нарешті, модульне піднесення до степеня додатково гешує результат.

Цей алгоритм спирається на кілька результатів з теорії чисел. Дивіться обговорення в додатку нижче.

## Оцінка легкого клієнта {#light-client-evaluation}

Наведена вище конструкція графа призначена для того, щоб дозволити реконструювати кожен вузол у графі, обчислюючи піддерево лише з невеликої кількості вузлів і вимагаючи лише невеликого обсягу допоміжної пам’яті. Зауважте, що при k=1 піддерево — це лише ланцюжок значень, що ведуть до першого елемента в DAG.

Обчислювальна функція легкого клієнта для DAG працює так:

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

По суті, це просто переписаний вищезгаданий алгоритм, який видаляє цикл обчислення значень для всього DAG і замінює попередній пошук вузла рекурсивним викликом або пошуком у кеші. Зауважте, що для `k=1` кеш не потрібен, хоча подальша оптимізація фактично попередньо обчислює перші кілька тисяч значень DAG і зберігає їх як статичний кеш для обчислень; дивіться реалізацію коду цього в додатку.

## Подвійний буфер DAG {#double-buffer}

У повному клієнті використовується [_подвійний буфер_](https://wikipedia.org/wiki/Multiple_buffering) з 2 DAG, створених за наведеною вище формулою. Ідея полягає в тому, що DAG створюються кожні `epochtime` блоків відповідно до наведених вище параметрів. Замість того, щоб клієнт використовував останній створений DAG, він використовує попередній. Перевага цього полягає в тому, що це дозволяє з часом замінювати DAG без необхідності включати крок, на якому майнери повинні раптово перерахувати всі дані. В іншому випадку існує ймовірність різкого тимчасового уповільнення обробки ланцюга через регулярні проміжки часу та різкого посилення централізації. Таким чином, ризики атаки 51% протягом тих кількох хвилин, перш ніж усі дані будуть перераховані.

Алгоритм, що використовується для генерації набору DAG, які використовуються для обчислення роботи для блоку, має такий вигляд:

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

Ідея оригінального Hashimoto полягає у використанні блокчейну як набору даних, виконуючи обчислення, яке вибирає N індексів з блокчейну, збирає транзакції за цими індексами, виконує операцію XOR над цими даними та повертає геш результату. Оригінальний алгоритм Тадеуша Дрижа, перекладений на Python для узгодженості, має такий вигляд:

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

На жаль, хоча Hashimoto вважається стійким до оперативної пам’яті, він покладається на 256-бітну арифметику, що має значні обчислювальні накладні витрати. Однак, щоб вирішити цю проблему, Dagger-Hashimoto використовує лише 64 найменш значущі біти під час індексування свого набору даних.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Використання подвійного SHA3 дозволяє здійснювати попередню перевірку без даних майже миттєво, перевіряючи лише те, що було надано правильне проміжне значення. Цей зовнішній шар доказу виконаної роботи є дуже дружнім до ASIC і досить слабким, але існує для того, щоб ще більше ускладнити DDoS-атаки, оскільки цю невелику кількість роботи необхідно виконати, щоб створити блок, який не буде негайно відхилено. Ось версія для легкого клієнта:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Майнінг і перевірка {#mining-and-verifying}

Тепер давайте об’єднаємо все це в алгоритм майнінгу:

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

Ось алгоритм перевірки:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Верифікація, дружня до легких клієнтів:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Крім того, зауважте, що Dagger-Hashimoto накладає додаткові вимоги до заголовка блоку:

- Щоб дворівнева перевірка працювала, заголовок блоку повинен мати як nonce, так і середнє значення до sha3
- Десь заголовок блоку повинен зберігати sha3 поточного набору початкових значень

## Для подальшого читання {#further-reading}

_Знайшли ресурс, який допоміг з цією темою? Відредагуйте цю сторінку і додайте його!_

## Додаток {#appendix}

Як зазначалося вище, генератор випадкових чисел, що використовується для створення DAG, спирається на деякі результати з теорії чисел. По-перше, ми надаємо гарантію, що генератор випадкових чисел Лемера, що є основою для змінної `picker`, має великий період. По-друге, ми показуємо, що `pow(x,3,P)` не відображатиме `x` на `1` або `P-1` за умови, що `x ∈ [2,P-2]` на початку. Нарешті, ми показуємо, що `pow(x,3,P)` має низький рівень колізій при використанні як геш-функції.

### Генератор випадкових чисел Лемера {#lehmer-random-number}

Хоча функція `produce_dag` не потребує створення незміщених випадкових чисел, потенційна загроза полягає в тому, що `seed**i % P` приймає лише кілька значень. Це може надати перевагу майнерам, які розпізнають закономірність, над тими, хто цього не робить.

Щоб уникнути цього, звертаються до результату з теорії чисел. [_Безпечне просте число_](https://en.wikipedia.org/wiki/Safe_prime) визначається як просте число `P`, таке, що `(P-1)/2` також є простим. _Порядок_ члена `x` [мультиплікативної групи](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` визначається як мінімальне `m` таке, що <pre>xᵐ mod P ≡ 1</pre>
З огляду на ці визначення, ми маємо:

> Спостереження 1. Нехай `x` є членом мультиплікативної групи `ℤ/Pℤ` для безпечного простого числа `P`. Якщо `x mod P ≠ 1 mod P` і `x mod P ≠ P-1 mod P`, то порядок `x` дорівнює або `P-1`, або `(P-1)/2`.

_Доказ_. Оскільки `P` є безпечним простим числом, то за [теоремою Лагранжа][lagrange] ми маємо, що порядок `x` дорівнює `1`, `2`, `(P-1)/2` або `P-1`.

Порядок `x` не може бути `1`, оскільки за Малою теоремою Ферма ми маємо:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Отже, `x` має бути мультиплікативною одиницею `ℤ/nℤ`, яка є унікальною. Оскільки ми припустили, що `x ≠ 1`, це неможливо.

Порядок `x` не може дорівнювати `2`, якщо `x = P-1`, оскільки це порушило б те, що `P` є простим числом.

З наведеного вище твердження ми можемо визнати, що ітерація `(picker * init) % P` матиме довжину циклу щонайменше `(P-1)/2`. Це тому, що ми вибрали `P` як безпечне просте число, приблизно рівне вищому степеню двійки, а `init` знаходиться в інтервалі `[2,2**256+1]`. Враховуючи величину `P`, ми ніколи не повинні очікувати циклу від модульного піднесення до степеня.

Коли ми призначаємо першу комірку в DAG (змінна з позначкою `init`), ми обчислюємо `pow(sha3(seed) + 2, 3, P)`. На перший погляд це не гарантує, що результат не буде ні `1`, ні `P-1`. Однак, оскільки `P-1` є безпечним простим числом, ми маємо таку додаткову гарантію, що є наслідком Спостереження 1:

> Спостереження 2. Нехай `x` є членом мультиплікативної групи `ℤ/Pℤ` для безпечного простого числа `P`, і нехай `w` є натуральним числом. Якщо `x mod P ≠ 1 mod P` і `x mod P ≠ P-1 mod P`, а також `w mod P ≠ P-1 mod P` і `w mod P ≠ 0 mod P`, тоді `xʷ mod P ≠ 1 mod P` і `xʷ mod P ≠ P-1 mod P`

### Модульне піднесення до степеня як геш-функція {#modular-exponentiation}

Для певних значень `P` і `w` функція `pow(x, w, P)` може мати багато колізій. Наприклад, `pow(x,9,19)` приймає лише значення `{1,18}`.

З огляду на те, що `P` є простим числом, тоді відповідне `w` для функції гешування з модульним піднесенням до степеня можна вибрати, використовуючи такий результат:

> Спостереження 3. Нехай `P` є простим числом; `w` і `P-1` є взаємно простими тоді й лише тоді, коли для всіх `a` та `b` у `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` тоді й лише тоді, коли `a mod P ≡ b mod P`</center>

Таким чином, з огляду на те, що `P` є простим числом, а `w` є взаємно простим із `P-1`, ми маємо, що `|{pow(x, w, P) : x ∈ ℤ}| = P`, що означає, що геш-функція має мінімально можливий рівень колізій.

У спеціальному випадку, коли `P` є безпечним простим числом, яке ми вибрали, то `P-1` має лише множники 1, 2, `(P-1)/2` і `P-1`. Оскільки `P` > 7, ми знаємо, що 3 є взаємно простим із `P-1`, отже, `w=3` задовольняє наведене вище твердження.

## Більш ефективний алгоритм оцінки на основі кешу {#cache-based-evaluation}

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
