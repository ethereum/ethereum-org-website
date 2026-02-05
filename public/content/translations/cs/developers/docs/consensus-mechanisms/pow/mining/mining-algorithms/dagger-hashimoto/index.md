---
title: Dagger-Hashimoto
description: Podrobný pohled na algoritmus Dagger-Hashimoto.
lang: cs
---

Dagger-Hashimoto byla původní výzkumná implementace a specifikace těžebního algoritmu Etherea. Dagger-Hashimoto byl nahrazen [Ethash](#ethash). Těžba byla zcela vypnuta při [Sloučení](/roadmap/merge/) dne 15. září 2022. Od té doby je Ethereum zabezpečeno pomocí mechanismu [důkazu podílem](/developers/docs/consensus-mechanisms/pos). Tato stránka má historický význam – informace na ní již nejsou pro Ethereum po Sloučení relevantní.

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme si nejprve přečíst o [konsensu důkazu prací](/developers/docs/consensus-mechanisms/pow), [těžbě](/developers/docs/consensus-mechanisms/pow/mining) a [těžebních algoritmech](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto se snaží splnit dva cíle:

1. **Odolnost vůči ASIC**: výhoda plynoucí z vytvoření specializovaného hardwaru pro tento algoritmus by měla být co nejmenší
2. **Ověřitelnost lehkým klientem**: blok by měl být efektivně ověřitelný lehkým klientem.

S další úpravou také specifikujeme, jak v případě potřeby splnit třetí cíl, avšak za cenu zvýšené složitosti:

**Úplné úložiště řetězce**: těžba by měla vyžadovat uložení celého stavu blockchainu (kvůli nepravidelné struktuře stavového stromu Ethereum očekáváme, že bude možné určité prořezávání, zejména některých často používaných kontraktů, ale chceme to minimalizovat).

## Generování DAG {#dag-generation}

Kód algoritmu bude definován níže v jazyce Python. Nejprve uvedeme `encode_int` pro převádění celých čísel bez znaménka o zadané přesnosti na řetězce. Je uvedena i jeho inverzní funkce:

```python
NUM_BITS = 512

def encode_int(x):
    "Zakóduje celé číslo x jako řetězec 64 znaků pomocí schématu big-endian"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Dekóduje celé číslo x z řetězce pomocí schématu big-endian"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Dále předpokládáme, že `sha3` je funkce, která přijímá celé číslo a vrací celé číslo, a `dbl_sha3` je funkce double-sha3; pokud převádíte tento referenční kód do implementace, použijte:

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

### Parametry {#parameters}

Parametry použité pro algoritmus jsou:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Největší bezpečné prvočíslo menší než 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Velikost datové sady (4 gigabajty); MUSÍ BÝT NÁSOBEK 65536
      "n_inc": 65536,                   # Přírůstek hodnoty n za období; MUSÍ BÝT NÁSOBEK 65536
                                        # s epochtime=20000 dává 882 MB ročně
      "cache_size": 2500,               # Velikost mezipaměti lehkého klienta (může si zvolit lehký klient, není součástí specifikace algoritmu)
      "diff": 2**14,                    # Obtížnost (upraveno během vyhodnocování bloku)
      "epochtime": 100000,              # Délka epochy v blocích (jak často se datová sada aktualizuje)
      "k": 1,                           # Počet rodičů uzlu
      "w": w,                          # Používá se pro hašování modulárním umocňováním
      "accesses": 200,                  # Počet přístupů k datové sadě během hashimota
      "P": SAFE_PRIME_512               # Bezpečné prvočíslo pro hašování a generování náhodných čísel
}
```

`P` je v tomto případě prvočíslo zvolené tak, že `log₂(P)` je jen o málo menší než 512, což odpovídá 512 bitům, které jsme používali k reprezentaci našich čísel. Všimněte si, že je třeba ukládat pouze druhou polovinu DAG, takže de-facto požadavek na paměť RAM začíná na 1 GB a roste o 441 MB ročně.

### Vytvoření grafu Daggeru {#dagger-graph-building}

Primitivní funkce pro vytvoření grafu Daggeru je definována následovně:

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

V podstatě začíná graf jako jediný uzel, `sha3(seed)`, a odtud začne postupně přidávat další uzly na základě náhodných předchozích uzlů. Když je vytvořen nový uzel, je vypočítána modulární mocnina seedu pro náhodný výběr některých indexů menších než `i` (pomocí `x % i` výše) a hodnoty uzlů na těchto indexech jsou použity ve výpočtu pro generování nové hodnoty `x`, která je pak vložena do malé funkce důkazu prací (založené na XOR) pro konečné vygenerování hodnoty grafu na indexu `i`. Důvodem tohoto konkrétního návrhu je vynutit si sekvenční přístup k DAG; další hodnota DAG, ke které se bude přistupovat, nemůže být určena, dokud není známa aktuální hodnota. Nakonec modulární umocňování výsledek dále hašuje.

Tento algoritmus se opírá o několik výsledků z teorie čísel. Diskuzi naleznete v dodatku níže.

## Vyhodnocení lehkým klientem {#light-client-evaluation}

Výše uvedená konstrukce grafu má umožnit rekonstrukci každého uzlu v grafu výpočtem podstromu pouze malého počtu uzlů a vyžaduje pouze malé množství pomocné paměti. Všimněte si, že s k=1 je podstrom pouze řetězcem hodnot vedoucích až k prvnímu prvku v DAG.

Výpočetní funkce lehkého klienta pro DAG funguje následovně:

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

V podstatě se jedná pouze o přepsání výše uvedeného algoritmu, který odstraňuje smyčku výpočtu hodnot pro celý DAG a nahrazuje dřívější vyhledávání uzlů rekurzivním voláním nebo vyhledáváním v mezipaměti. Všimněte si, že pro `k=1` je mezipaměť zbytečná, ačkoliv další optimalizace ve skutečnosti předpočítává prvních několik tisíc hodnot DAG a ponechává je jako statickou mezipaměť pro výpočty; implementaci tohoto kódu naleznete v dodatku.

## Dvojitá vyrovnávací paměť DAG {#double-buffer}

V plnohodnotném klientovi se používá [_dvojitá vyrovnávací paměť_](https://wikipedia.org/wiki/Multiple_buffering) 2 DAGů vytvořených podle výše uvedeného vzorce. Myšlenka je taková, že DAG se vytvářejí každých `epochtime` bloků podle výše uvedených parametrů. Místo toho, aby klient používal nejnovější vytvořený DAG, používá ten předchozí. Výhodou je, že to umožňuje nahrazovat DAG v průběhu času, aniž by bylo nutné zahrnout krok, kdy těžaři musí náhle přepočítat všechna data. V opačném případě existuje potenciál pro náhlé dočasné zpomalení zpracování řetězce v pravidelných intervalech a dramatické zvýšení centralizace. Tím vzniká riziko 51% útoku během několika minut před přepočítáním všech dat.

Algoritmus použitý ke generování sady DAG používaných k výpočtu práce pro blok je následující:

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
        # Zadní vyrovnávací paměť není možná, vytvořte pouze přední vyrovnávací paměť
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Původní myšlenkou Hashimota je použít blockchain jako datovou sadu, provést výpočet, který vybere N indexů z blockchainu, shromáždí transakce na těchto indexech, provede XOR těchto dat a vrátí haš výsledku. Původní algoritmus Thaddeuse Dryji, přeložený do Pythonu pro konzistenci, je následující:

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

Bohužel, ačkoli je Hashimoto považováno za paměťově náročné, spoléhá na 256bitovou aritmetiku, která má značnou výpočetní režii. Dagger-Hashimoto však k řešení tohoto problému používá při indexování své datové sady pouze nejméně významných 64 bitů.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Použití dvojitého SHA3 umožňuje formu předběžného ověření s nulovými daty a téměř okamžitou odezvou, kdy se ověřuje pouze to, že byla poskytnuta správná mezihodnota. Tato vnější vrstva důkazu prací je vysoce přívětivá k ASIC a poměrně slabá, ale existuje proto, aby ještě více ztížila útoky DDoS, protože toto malé množství práce musí být provedeno, aby se vytvořil blok, který nebude okamžitě zamítnut. Zde je verze pro lehkého klienta:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Těžba a ověřování {#mining-and-verifying}

Nyní to všechno spojíme do těžebního algoritmu:

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

Zde je ověřovací algoritmus:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Ověření přátelské k lehkému klientovi:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Všimněte si také, že Dagger-Hashimoto klade další požadavky na hlavičku bloku:

- Aby dvouvrstvé ověření fungovalo, musí hlavička bloku obsahovat jak nonce, tak střední hodnotu před hašováním sha3.
- Někde musí hlavička bloku ukládat sha3 aktuální sady seedů.

## Další čtení {#further-reading}

_Víte o komunitním zdroji, který vám pomohl? Upravte tuto stránku a přidejte ho!_

## Dodatek {#appendix}

Jak bylo uvedeno výše, RNG použité pro generování DAG se opírá o některé výsledky z teorie čísel. Nejprve poskytneme ujištění, že Lehmerův RNG, který je základem proměnné `picker`, má široké období. Za druhé, ukážeme, že `pow(x,3,P)` nezobrazí `x` na `1` nebo `P-1` za předpokladu, že na začátku je `x ∈ [2,P-2]`. Nakonec ukážeme, že `pow(x,3,P)` má nízkou míru kolizí, pokud je považováno za hašovací funkci.

### Lehmerův generátor náhodných čísel {#lehmer-random-number}

Přestože funkce `produce_dag` nemusí produkovat nezaujatá náhodná čísla, potenciální hrozbou je, že `seed**i % P` nabývá pouze několika hodnot. To by mohlo poskytnout výhodu těžařům, kteří vzor rozpoznají, oproti těm, kteří ho nerozpoznají.

Abychom se tomu vyhnuli, odvoláváme se na výsledek z teorie čísel. [_Bezpečné prvočíslo_](https://en.wikipedia.org/wiki/Safe_prime) je definováno jako prvočíslo `P` takové, že `(P-1)/2` je také prvočíslo. _Řád_ členu `x` [multiplikativní skupiny](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` je definován jako minimální `m` takové, že <pre>xᵐ mod P ≡ 1</pre>
Vzhledem k těmto definicím máme:

> Pozorování 1. Nechť `x` je členem multiplikativní skupiny `ℤ/Pℤ` pro bezpečné prvočíslo `P`. Pokud `x mod P ≠ 1 mod P` a `x mod P ≠ P-1 mod P`, pak řád `x` je buď `P-1` nebo `(P-1)/2`.

_Důkaz_. Protože `P` je bezpečné prvočíslo, pak podle [Lagrangeovy věty][lagrange] máme, že řád `x` je buď `1`, `2`, `(P-1)/2` nebo `P-1`.

Řád `x` nemůže být `1`, protože podle Malé Fermatovy věty máme:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Proto musí být `x` multiplikativní identitou `ℤ/nℤ`, která je jedinečná. Protože jsme předpokládali, že `x ≠ 1`, není to možné.

Řád `x` nemůže být `2`, pokud `x ≠ P-1`, protože by to porušilo, že `P` je prvočíslo.

Z výše uvedeného tvrzení můžeme rozpoznat, že iterace `(picker * init) % P` bude mít délku cyklu alespoň `(P-1)/2`. Je to proto, že jsme zvolili `P` jako bezpečné prvočíslo přibližně rovné vyšší mocnině dvou a `init` je v intervalu `[2,2**256+1]`. Vzhledem k velikosti `P` bychom nikdy neměli očekávat cyklus z modulárního umocňování.

Když přiřazujeme první buňku v DAG (proměnná označená `init`), vypočítáme `pow(sha3(seed) + 2, 3, P)`. Na první pohled to nezaručuje, že výsledek nebude ani `1`, ani `P-1`. Protože je však `P-1` bezpečné prvočíslo, máme následující další ujištění, které je důsledkem Pozorování 1:

> Pozorování 2. Nechť `x` je členem multiplikativní skupiny `ℤ/Pℤ` pro bezpečné prvočíslo `P` a nechť `w` je přirozené číslo. Pokud `x mod P ≠ 1 mod P` a `x mod P ≠ P-1 mod P`, a také `w mod P ≠ P-1 mod P` a `w mod P ≠ 0 mod P`, pak `xʷ mod P ≠ 1 mod P` a `xʷ mod P ≠ P-1 mod P`

### Modulární umocňování jako hašovací funkce {#modular-exponentiation}

Pro určité hodnoty `P` a `w` může mít funkce `pow(x, w, P)` mnoho kolizí. Například `pow(x,9,19)` nabývá pouze hodnot `{1,18}`.

Vzhledem k tomu, že `P` je prvočíslo, lze pomocí následujícího výsledku zvolit vhodné `w` pro hašovací funkci modulárního umocňování:

> Pozorování 3. Nechť `P` je prvočíslo; `w` a `P-1` jsou nesoudělná právě tehdy, když pro všechna `a` a `b` v `ℤ/Pℤ` platí:<center>`aʷ mod P ≡ bʷ mod P` právě tehdy, když `a mod P ≡ b mod P`</center>

Vzhledem k tomu, že `P` je prvočíslo a `w` je nesoudělné s `P-1`, máme tedy `|{pow(x, w, P) : x ∈ ℤ}| = P`, z čehož vyplývá, že hašovací funkce má nejmenší možnou míru kolizí.

Ve zvláštním případě, že `P` je bezpečné prvočíslo, jak jsme si zvolili, pak `P-1` má pouze dělitele 1, 2, `(P-1)/2` a `P-1`. Protože `P` > 7, víme, že 3 je nesoudělné s `P-1`, a proto `w=3` splňuje výše uvedené tvrzení.

## Efektivnější algoritmus vyhodnocování založený na mezipaměti {#cache-based-evaluation}

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
