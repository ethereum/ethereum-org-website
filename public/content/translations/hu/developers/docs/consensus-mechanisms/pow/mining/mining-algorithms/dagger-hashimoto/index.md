---
title: Dagger-Hashimoto
description: A Dagger-Hashimoto algoritmus részletes áttekintése.
lang: hu
---

A Dagger-Hashimoto volt az Ethereum bányászati algoritmusának eredeti fejlesztési implementációja és specifikációja. A Dagger-Hashimoto algoritmust az [Ethash](#ethash) váltotta le. A bányászatot teljesen kikapcsolták az [egyesítés (Merge)](/roadmap/merge/) frissítés életbe lépésekor, 2022. szeptember 15-én. Azóta az Ethereumot a [proof-of-stake (letéti igazolás)](/developers/docs/consensus-mechanisms/pos) mechanizmusa biztosítja. Ez az oldal elavult témákat tartalmaz, amelyek többé már nem relevánsak az egyesítés (Merge) utáni Ethereummal kapcsolatban.

## Előfeltételek {#prerequisites}

A jelen téma könnyebb megértéséhez javasoljuk, hogy tekintse meg a [proof-of-work konszenzus](/developers/docs/consensus-mechanisms/pow), a [bányászat](/developers/docs/consensus-mechanisms/pow/mining), és a [bányászati algoritmusok](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) témáit.

## Dagger-Hashimoto {#dagger-hashimoto}

A Dagger-Hashimoto két célt szolgál:

1.  **ASIC-ellenálló**: az algoritmus futtatásához a specializált hardver kialakításából adódó előny a lehető legkisebb legyen
2.  **Könnyű kliens általi ellenőrizhetőség**: a blokkot egy könnyű kliens is le tudja ellenőrizni hatékonyan.

Egy újabb módosítással meghatározhatjuk, hogyan tud egy harmadik célt is kielégíteni, de ez a komplexitás növekedésével jár:

**A teljes lánc tárolása**: a bányászathoz a teljes blokklánc státuszát le kell tárolni (az Ethereum státuszfa szabálytalan struktúrája miatt talán lehetséges ennek megrövidítése, főleg a gyakori szerződéseknél, de ezt minimalizálni szeretnénk).

## DAG létrehozása {#dag-generation}

Az algoritmus kódját pythonban alább találja. Először az `encode_int` kódot adjuk meg, hogy a megadott pontosságú nem aláírt egész számokat sztringekké alakítsa. Ennek fordítottja is megadásra kerül:

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

Ezután, feltételezve, hogy az `sha3` egy olyan függvény, ami egész számot kap és azt is ad ki eredményként, továbbá a `dbl_sha3` egy dupla sha3 függvény; ha ezt a referenciakódot implementációvá alakítjuk:

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

### Paraméterek {#parameters}

Az algoritmushoz a következő paramétereket használjuk:

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

A `P` ebben az esetben egy olyan prímszám, hogy a `log₂(P)` éppen csak kisebb legyen, mint 512, ami az 512 bithez kapcsolódik, amit a számok reprezentálására használunk. Érdemes megjegyezni, hogy a DAG-nek csak a második felét kell eltárolni, így a RAM-igény 1 GB-tól indul és 441 MB-tal növekszik évente.

### Dagger-gráfépítés {#dagger-graph-building}

A dagger-gráfépítési függvényt a következőképpen definiáljuk:

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

Lényegében a gráfot egy egyszerű csomópontként kezdi (`sha3(seed)`), és innen ad hozzá szekvenciálisan újabb csomópontokat a véletlenszerű előzők csomópontok alapján. Egy új csomópont létrehozásakor a mag moduláris hatványát kiszámítjuk, hogy véletlenszerűen kiválasszunk néhány `i`-nél kisebb indexet (a fenti `x % i` használatával), és az ezeknél az indexeknél lévő csomópontok értékeit egy számításban felhasználjuk az `x` új értékének létrehozásához, amelyet aztán egy kis (XOR-alapú) proof-of-work függvénybe táplálunk, hogy végül az `i` indexnél lévő gráf értékét generáljuk. E sajátos kialakítás értelme az, hogy a DAG-hoz szekvenciális hozzáférést biztosítson; a DAG következő értékét nem lehet meghatározni addig, amíg a jelenlegi nem ismert. Végül a moduláris exponenciálás hasheli tovább az eredményt.

Ez az algoritmus a számelmélet számos eredményén alapszik. Az alábbi függelékben megtalálhatja az erről szóló beszélgetést.

## Könnyű kliens általi értékelés {#light-client-evaluation}

Ez a gráfkonstrukció arra való, hogy a gráf minden csomópontja újraépíthető legyen egy kis számú csomópontból álló alfa segítségével, és csak kevés kiegészítő memória kelljen hozzá. Vegye figyelembe, hogy ha k=1, akkor az alfastruktúra csak az értékek egy olyan lánca, ami a DAG első eleméig tart.

A DAG-re a következőképpen működik a könnyű kliens számítási függvénye:

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

Lényegében ez a fenti algoritmus átirata, ami kiveszi a teljes DAG számítási ciklusát, és a korábbi csomópontkereső függvényt cseréli le egy rekurzív hívásra vagy egy cache-keresőre. Érdemes megjegyezni, hogy `k=1` esetén a cache szükségtelen, bár egy további optimalizálással a DAG első néhány ezer értékét előre kiszámítja, és statikus cache-ként tárolja a számításokhoz; ennek kódmegvalósítását tekintse meg a függelékben.

## A DAG-ek dupla puffere {#double-buffer}

Egy teljes kliensben 2 DAG [_dupla pufferét_](https://wikipedia.org/wiki/Multiple_buffering) használják, melyet a fenti képlet ad meg. Az elképzelés szerint a DAG-eket minden `epochtime` (korszakban) blokkszámonként készítik a fenti paramétereknek megfelelően. Ahelyett, hogy a kliens a legutóbbi DAG-et használná, az eggyel korábbit veszi figyelembe. Ennek előnye az, hogy a DAG-eket le lehet cserélni idővel anélkül, hogy a bányászoknak hirtelen az összes adatot újra kellene számolniuk. Máskülönben felmerül egy hirtelen, átmeneti lelassulás esélye a láncfeldolgozásnak, ami drasztikusan növeli a centralizációt. Így megnő az 51%-os támadás kockázata is az adat újraszámítása előtti percekben.

A blokkhoz szükséges munka kiszámításához használt DAG-ek halmazának létrehozására használt algoritmus a következő:

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

Az eredeti Hashimoto lényege, hogy a blokkláncot adathalmazként használja, és olyan számítást végez, amely kiválaszt N indexet a blokkláncból, összegyűjti a tranzakciókat ezeken az indexeken, elvégzi a XOR-t ezekre az adatokra, és visszaadja az eredmény hashét. Thaddeus Dryja eredeti algoritmusa, Pythonra átfordítva a konzisztencia érdekében, így néz ki:

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

Sajnálatos módon, miközben a Hashimoto nagy RAM-igényű, 256 bites aritmetikán alapszik, ami jelentős számítási többletköltséggel jár. Ugyanakkor a Dagger-Hashimoto csak a legkevésbé szignifikáns 64 bitet használja az adathalmaz indexálására, hogy ezt a problémát kezelje.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

A dupla SHA3 használata lehetővé teszi a nulla adatot tartalmazó, szinte azonnali előzetes ellenőrzést, amely csak azt ellenőrzi, hogy a helyes közbenső értéket adták meg. A proof-of-worknek ez a külső rétege rendkívül ASIC-barát és meglehetősen gyenge, de azért létezik, hogy még nehezebbé tegye a DDoS-t, mivel ezt a kis mennyiségű munkát kell elvégezni ahhoz, hogy egy olyan blokkot hozzanak létre, amelyet nem utasítanak el azonnal. Ez a könnyű kliens verziója:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Bányászat és ellenőrzés {#mining-and-verifying}

Most vezessük be mindezt a bányászati algoritmusba:

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

Ez az ellenőrzési algoritmus:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Ez a könnyű kliens általi barátságos ellenőrzés:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Emellett érdemes megjegyezni, hogy a Dagger-Hashimoto a blokkfejlécre egyéb követelményeket is megfogalmazott:

- A kétszintű ellenőrzéshez a blokkfejlécnek tartalmaznia kell a nonce-t és az sha3 előtti köztes értéket
- Valahol a blokkfejlécnek tárolnia kell a jelenlegi seed-halmaz sha3-ját

## További olvasnivaló {#further-reading}

_Ismersz olyan közösségi anyagot, mely segített neked? Módosítsd az oldalt és add hozzá!_

## Függelék {#appendix}

Mint fentebb említettük, a DAG generálásához használt RNG a számelmélet néhány eredményére támaszkodik. Először is biztosítjuk, hogy a `picker` változó alapjául szolgáló Lehmer RNG széles periódussal rendelkezik. Másodszor, megmutatjuk, hogy a `pow(x,3,P)` nem fogja `x` kódot `1` vagy `P-1` értékre leképezni, feltéve, hogy `x ∈ [2,P-2]`. Végül megmutatjuk, hogy a `pow(x,3,P)` alacsony ütközési rátával rendelkezik, ha hash függvényként kezeljük.

### Lehmer véletlenszám-generátor {#lehmer-random-number}

Bár a `produce_dag` függvénynek nem kell torzítatlan véletlen számokat produkálnia, és potenciális veszélyt jelent, hogy a `seed**i % P` csak néhány értéket vesz fel. Ez előnyt jelenthet azoknak a bányászoknak, akik felismerik a mintát, miközben mások nem.

Ennek elkerülése érdekében egy számelméleti eredményre hivatkozunk. A [_biztonságos prímszám_](https://en.wikipedia.org/wiki/Safe_prime) egy olyan prím `P`, amelynél a `(P-1)/2` szintén prímszám. A [multiplikatív csoport](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) egy `x` tagjának _rendje_ a `ℤ/nℤ` meghatározása szerint a minimális `m` úgy, hogy <pre>xᵐ mod P ≡ 1</pre>
Ezen definíciók szerint:

> 1. megfigyelés. Legyen `x` a `ℤ/Pℤ` multiplikatív csoport tagja egy biztonságos `P` prímszámhoz. Ha `x mod P ≠ 1 mod P` és `x mod P ≠ P-1 mod P`, akkor `x` rendje vagy `P-1` vagy `(P-1)/2`.

_Bizonyítás_. Mivel `P` egy biztonságos prímszám, akkor a \[Lagrange-tétel\]\[lagrange\] alapján azt kell mondanunk, hogy `x` rendje vagy `1`, `2`, `(P-1)/2` vagy `P-1`.

A `x` sorrendje nem lehet `1` Fermat kis tételéből következően:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Ezért `x` a `ℤ/nℤ` multiplikatív azonosságának kell lennie, ami egyedi. Mivel feltételezésünk szerint `x ≠ 1`, ez nem lehetséges.

Az `x` sorrendje nem lehet `2`, kivéve, ha `x = P-1`, mivel ez sértené, hogy `P` prímszám.

A fenti tételből felismerhetjük, hogy a `(picker * init) % P` ismétlése legalább `(P-1)/2` ciklushosszúságú lesz. Ennek az az oka, hogy a `P` értékének egy biztonságos prímszámot választottunk, amely megközelítőleg egyenlő a kettő nagyobb hatványával, és `init` a `[2,2**256+1]` intervallumban van. A `P` nagyságát tekintve a moduláris exponenciálástól nem várhatunk ciklust.

A DAG első cellájának (az `init` feliratú változó) hozzárendelésekor kiszámítjuk a `pow(sha3(seed) + 2, 3, P)` értékét. Első pillantásra ez nem garantálja, hogy az eredmény nem `1` és nem `P-1`. Mivel azonban `P-1` egy biztonságos prímszám, a következő további bizonyosságunk van, amely az 1. megfigyelés következménye:

> 2. megfigyelés. Legyen `x` a `ℤ/Pℤ` multiplikatív csoport tagja egy biztonságos `P` prímszámhoz, és legyen `w` egy természetes szám. Ha `x mod P ≠ 1 mod P` és `x mod P ≠ P-1 mod P`, valamint `w mod P ≠ P-1 mod P` és `w mod P ≠ 0 mod P`, akkor `xʷ mod P ≠ 1 mod P` és `xʷ mod P ≠ P-1 mod P`

### Moduláris exponenciálás hashfüggvényként {#modular-exponentiation}

A `P` és `w` bizonyos értékei esetén a `pow(x, w, P)` függvénynek sok ütközése lehet. Például a `pow(x,9,19)` csak `{1,18}` értékeket vesz fel.

Adott, hogy `P` prímszám, akkor egy megfelelő `w` moduláris exponenciálási hashfüggvényhez a következő eredmény segítségével választható ki:

> 3. megfigyelés. Legyen `P` egy prímszám; `w` és `P-1` akkor, és csak akkor relatív prímszámok, ha minden `a` és `b` esetén `ℤ/Pℤ`:
> 
> <center>
>   `aʷ mod P ≡ bʷ mod P`, ha és csak ha `a mod P ≡ b mod P`
> </center>

Így, feltéve, hogy `P` prím és `w` relatíve prím `P-1`-hez, akkor `|{pow(x, w, P) : x ∈ ℤ}| = P`, ami azt jelenti, hogy a hashfüggvény a lehető legkisebb ütközési rátával rendelkezik.

Abban a speciális esetben, ha `P` egy biztonságos prímszám, ahogyan azt választottuk, akkor `P-1` csak 1, 2, `(P-1)/2` és `P-1` faktorokkal rendelkezik. Mivel `P` > 7, tudjuk, hogy 3 relatív prím a `P-1`-hez, ezért `w=3` kielégíti a fenti tételt.

## Hatékonyabb cache-alapú kiértékelő algoritmus {#cache-based-evaluation}

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
