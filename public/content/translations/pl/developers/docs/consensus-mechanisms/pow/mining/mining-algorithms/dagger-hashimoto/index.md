---
title: Dagger-Hashimoto
description: Szczegółowe omówienie algorytmu Dagger-Hashimoto.
lang: pl
---

Dagger-Hashimoto był oryginalną implementacją badawczą i specyfikacją algorytmu wydobywczego Ethereum. Dagger-Hashimoto został zastąpiony przez [Ethash](#ethash). Wydobycie zostało całkowicie wyłączone podczas [Połączenia](/roadmap/merge/) 15 września 2022 r. Od tego czasu Ethereum jest zabezpieczane za pomocą mechanizmu [dowodu stawki](/developers/docs/consensus-mechanisms/pos). Ta strona ma charakter historyczny – zawarte tu informacje nie są już istotne dla Ethereum po Połączeniu.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw zapoznanie się z [konsensusem dowodu pracy](/developers/docs/consensus-mechanisms/pow), [wydobyciem](/developers/docs/consensus-mechanisms/pow/mining) i [algorytmami wydobywczymi](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto ma na celu spełnienie dwóch założeń:

1. **Odporność na ASIC**: korzyść z tworzenia specjalistycznego sprzętu dla algorytmu powinna być jak najmniejsza
2. **Weryfikowalność przez lekkiego klienta**: blok powinien być efektywnie weryfikowalny przez lekkiego klienta.

Dzięki dodatkowej modyfikacji określamy również, w jaki sposób w razie potrzeby można osiągnąć trzeci cel, ale kosztem dodatkowej złożoności:

**Przechowywanie pełnego łańcucha**: wydobycie powinno wymagać przechowywania pełnego stanu blockchain (ze względu na nieregularną strukturę trie stanu Ethereum przewidujemy, że możliwe będzie pewne przycinanie, szczególnie w przypadku niektórych często używanych kontraktów, ale chcemy to zminimalizować).

## Generowanie DAG {#dag-generation}

Kod algorytmu zostanie zdefiniowany poniżej w języku Python. Najpierw podajemy `encode_int` do porządkowania (marshaling) liczb całkowitych bez znaku o określonej precyzji do ciągów znaków. Podana jest również jego odwrotność:

```python
NUM_BITS = 512

def encode_int(x):
    "Zakoduj liczbę całkowitą x jako ciąg 64 znaków przy użyciu schematu big-endian"
    o = ''
    for _ in range(NUM_BITS / 8):
        o = chr(x % 256) + o
        x //= 256
    return o

def decode_int(s):
    "Odkoduj liczbę całkowitą x z ciągu znaków przy użyciu schematu big-endian"
    x = 0
    for c in s:
        x *= 256
        x += ord(c)
    return x
```

Następnie zakładamy, że `sha3` jest funkcją, która przyjmuje i zwraca liczbę całkowitą, a `dbl_sha3` jest funkcją podwójnego sha3; jeśli konwertujesz ten kod referencyjny na implementację, użyj:

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

Parametry używane w algorytmie to:

```python
SAFE_PRIME_512 = 2**512 - 38117     # Największa bezpieczna liczba pierwsza mniejsza niż 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS,  # Rozmiar zbioru danych (4 gigabajty); MUSI BYĆ WIELOKROTNOŚCIĄ 65536
      "n_inc": 65536,                   # Przyrost wartości n na okres; MUSI BYĆ WIELOKROTNOŚCIĄ 65536
                                        # z epochtime=20000 daje 882 MB wzrostu rocznie
      "cache_size": 2500,               # Rozmiar pamięci podręcznej lekkiego klienta (może być wybrany przez lekkiego klienta; nie jest częścią specyfikacji algorytmu)
      "diff": 2**14,                    # Trudność (dostosowywana podczas oceny bloku)
      "epochtime": 100000,              # Długość epoki w blokach (jak często aktualizowany jest zbiór danych)
      "k": 1,                           # Liczba rodziców węzła
      "w": w,                          # Używane do haszowania potęgowania modularnego
      "accesses": 200,                  # Liczba dostępów do zbioru danych podczas hashimoto
      "P": SAFE_PRIME_512               # Bezpieczna liczba pierwsza do haszowania i generowania liczb losowych
}
```

W tym przypadku `P` jest liczbą pierwszą wybraną w taki sposób, że `log₂(P)` jest tylko nieznacznie mniejsze od 512, co odpowiada 512 bitom, których używaliśmy do reprezentowania naszych liczb. Należy zauważyć, że w rzeczywistości przechowywana musi być tylko druga połowa DAG, więc de facto zapotrzebowanie na pamięć RAM zaczyna się od 1 GB i rośnie o 441 MB rocznie.

### Budowanie grafu Dagger {#dagger-graph-building}

Prymityw budowania grafu Dagger jest zdefiniowany w następujący sposób:

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

Zasadniczo rozpoczyna on graf jako pojedynczy węzeł, `sha3(seed)`, a stamtąd zaczyna sekwencyjnie dodawać inne węzły w oparciu o losowe poprzednie węzły. Po utworzeniu nowego węzła obliczana jest modularna potęga seeda w celu losowego wyboru niektórych indeksów mniejszych niż `i` (przy użyciu `x % i` powyżej), a wartości węzłów w tych indeksach są używane w obliczeniach do wygenerowania nowej wartości `x`, która jest następnie wprowadzana do małej funkcji dowodu pracy (opartej na XOR) w celu ostatecznego wygenerowania wartości grafu o indeksie `i`. Uzasadnieniem tego konkretnego projektu jest wymuszenie sekwencyjnego dostępu do DAG; następna wartość DAG, do której będzie uzyskiwany dostęp, nie może zostać określona, dopóki bieżąca wartość nie jest znana. Na koniec potęgowanie modularne dalej haszuje wynik.

Ten algorytm opiera się na kilku wynikach z teorii liczb. Zobacz dyskusję w poniższym dodatku.

## Ocena lekkiego klienta {#light-client-evaluation}

Powyższa konstrukcja grafu ma na celu umożliwienie rekonstrukcji każdego węzła w grafie poprzez obliczenie poddrzewa składającego się tylko z niewielkiej liczby węzłów i wymagającego tylko niewielkiej ilości pamięci pomocniczej. Należy pamiętać, że przy k=1 poddrzewo jest tylko łańcuchem wartości prowadzącym do pierwszego elementu w DAG.

Funkcja obliczeniowa lekkiego klienta dla DAG działa w następujący sposób:

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

Zasadniczo jest to po prostu przepisanie powyższego algorytmu, który usuwa pętlę obliczania wartości dla całego DAG i zastępuje wcześniejsze wyszukiwanie węzłów wywołaniem rekurencyjnym lub wyszukiwaniem w pamięci podręcznej. Należy pamiętać, że dla `k=1` pamięć podręczna jest niepotrzebna, chociaż dalsza optymalizacja w rzeczywistości wstępnie oblicza kilka pierwszych tysięcy wartości DAG i zachowuje je jako statyczną pamięć podręczną do obliczeń; zobacz dodatek, aby zobaczyć implementację kodu.

## Podwójny bufor DAG {#double-buffer}

W pełnym kliencie używany jest [_podwójny bufor_](https://wikipedia.org/wiki/Multiple_buffering) 2 DAG-ów wyprodukowanych według powyższego wzoru. Chodzi o to, że DAG są produkowane co `epochtime` bloków zgodnie z powyższymi parametrami. Zamiast używać najnowszego wyprodukowanego DAG-a, klient używa poprzedniego. Zaletą tego rozwiązania jest to, że pozwala na wymianę DAG-ów w czasie bez konieczności wprowadzania kroku, w którym górnicy muszą nagle ponownie obliczyć wszystkie dane. W przeciwnym razie istnieje ryzyko nagłego, tymczasowego spowolnienia przetwarzania łańcucha w regularnych odstępach czasu i radykalnego zwiększenia centralizacji. Stąd ryzyko ataku 51% w ciągu tych kilku minut przed ponownym obliczeniem wszystkich danych.

Algorytm używany do generowania zestawu DAG-ów wykorzystywanych do obliczenia pracy dla bloku jest następujący:

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
        # Tylny bufor nie jest możliwy, utwórz tylko przedni bufor
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Idea oryginalnego Hashimoto polega na wykorzystaniu blockchain jako zbioru danych, wykonaniu obliczeń, które wybierają N indeksów z blockchain, zebraniu transakcji z tych indeksów, wykonaniu operacji XOR na tych danych i zwróceniu haszu wyniku. Oryginalny algorytm Thaddeusa Dryji, przetłumaczony na język Python dla spójności, jest następujący:

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

Niestety, chociaż Hashimoto jest uważany za trudny pod względem pamięci RAM, opiera się on na 256-bitowej arytmetyce, co wiąże się ze znacznym obciążeniem obliczeniowym. Jednakże Dagger-Hashimoto używa tylko najmniej znaczących 64 bitów podczas indeksowania swojego zbioru danych, aby rozwiązać ten problem.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Użycie podwójnego SHA3 pozwala na formę zerodanych, niemal natychmiastowej weryfikacji wstępnej, weryfikując jedynie, czy została podana poprawna wartość pośrednia. Ta zewnętrzna warstwa dowodu pracy jest bardzo przyjazna dla ASIC i dość słaba, ale istnieje, aby jeszcze bardziej utrudnić ataki DDoS, ponieważ ta niewielka ilość pracy musi zostać wykonana, aby wyprodukować blok, który nie zostanie natychmiast odrzucony. Oto wersja dla lekkiego klienta:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Wydobywanie i weryfikacja {#mining-and-verifying}

Teraz połączmy to wszystko w algorytm wydobywczy:

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

Oto algorytm weryfikacji:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Weryfikacja przyjazna dla lekkiego klienta:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Należy również zauważyć, że Dagger-Hashimoto nakłada dodatkowe wymagania na nagłówek bloku:

- Aby weryfikacja dwuwarstwowa działała, nagłówek bloku musi zawierać zarówno nonce, jak i wartość środkową pre-sha3
- Gdzieś nagłówek bloku musi przechowywać sha3 bieżącego zestawu seedów

## Dalsza lektura {#further-reading}

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Dodatek {#appendix}

Jak wspomniano powyżej, RNG używany do generowania DAG opiera się na pewnych wynikach z teorii liczb. Po pierwsze, zapewniamy, że RNG Lehmera, który jest podstawą zmiennej `picker`, ma długi okres. Po drugie, pokazujemy, że `pow(x,3,P)` nie zmapuje `x` na `1` lub `P-1`, pod warunkiem, że na początku `x ∈ [2,P-2]`. Na koniec pokazujemy, że `pow(x,3,P)` ma niski wskaźnik kolizji, gdy jest traktowany jako funkcja haszująca.

### Generator liczb losowych Lehmera {#lehmer-random-number}

Chociaż funkcja `produce_dag` nie musi generować obiektywnych liczb losowych, potencjalnym zagrożeniem jest to, że `seed**i % P` przyjmuje tylko kilka wartości. Może to dać przewagę górnikom, którzy rozpoznają wzorzec, nad tymi, którzy go nie rozpoznają.

Aby tego uniknąć, odwołano się do wyniku z teorii liczb. [_Bezpieczna liczba pierwsza_](https://en.wikipedia.org/wiki/Safe_prime) jest zdefiniowana jako liczba pierwsza `P` taka, że `(P-1)/2` jest również liczbą pierwszą. _Rząd_ elementu `x` [grupy multiplikatywnej](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` jest zdefiniowany jako minimalne `m` takie, że <pre>xᵐ mod P ≡ 1</pre>
Biorąc pod uwagę te definicje, mamy:

> Obserwacja 1. Niech `x` będzie członkiem grupy multiplikatywnej `ℤ/Pℤ` dla bezpiecznej liczby pierwszej `P`. Jeśli `x mod P ≠ 1 mod P` i `x mod P ≠ P-1 mod P`, to rząd `x` wynosi `P-1` lub `(P-1)/2`.

_Dowód_. Ponieważ `P` jest bezpieczną liczbą pierwszą, to z [Twierdzenia Lagrange'a][lagrange] wynika, że rząd `x` wynosi `1`, `2`, `(P-1)/2` lub `P-1`.

Rząd `x` nie może wynosić `1`, ponieważ z małego twierdzenia Fermata mamy:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Stąd `x` musi być tożsamością multiplikatywną `ℤ/nℤ`, która jest unikalna. Ponieważ z założenia `x ≠ 1`, nie jest to możliwe.

Rząd `x` nie może wynosić `2`, chyba że `x = P-1`, ponieważ naruszałoby to pierwszość `P`.

Z powyższego twierdzenia możemy wywnioskować, że iteracja `(picker * init) % P` będzie miała długość cyklu co najmniej `(P-1)/2`. Dzieje się tak, ponieważ wybraliśmy `P` jako bezpieczną liczbę pierwszą w przybliżeniu równą wyższej potędze dwójki, a `init` znajduje się w przedziale `[2,2**256+1]`. Biorąc pod uwagę wielkość `P`, nigdy nie powinniśmy spodziewać się cyklu z potęgowania modularnego.

Podczas przypisywania pierwszej komórki w DAG (zmienna oznaczona `init`), obliczamy `pow(sha3(seed) + 2, 3, P)`. Na pierwszy rzut oka nie gwarantuje to, że wynik nie jest ani `1`, ani `P-1`. Jednakże, ponieważ `P-1` jest bezpieczną liczbą pierwszą, mamy następujące dodatkowe zapewnienie, które jest wnioskiem z Obserwacji 1:

> Obserwacja 2. Niech `x` będzie członkiem grupy multiplikatywnej `ℤ/Pℤ` dla bezpiecznej liczby pierwszej `P` i niech `w` będzie liczbą naturalną. Jeśli `x mod P ≠ 1 mod P` i `x mod P ≠ P-1 mod P`, a także `w mod P ≠ P-1 mod P` i `w mod P ≠ 0 mod P`, to `xʷ mod P ≠ 1 mod P` i `xʷ mod P ≠ P-1 mod P`

### Potęgowanie modularne jako funkcja haszująca {#modular-exponentiation}

Dla pewnych wartości `P` i `w` funkcja `pow(x, w, P)` może mieć wiele kolizji. Na przykład `pow(x,9,19)` przyjmuje tylko wartości `{1,18}`.

Biorąc pod uwagę, że `P` jest liczbą pierwszą, odpowiednie `w` dla funkcji haszującej potęgowania modularnego można wybrać, korzystając z następującego wyniku:

> Obserwacja 3. Niech `P` będzie liczbą pierwszą; `w` i `P-1` są względnie pierwsze wtedy i tylko wtedy, gdy dla wszystkich `a` i `b` w `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` wtedy i tylko wtedy, gdy `a mod P ≡ b mod P`</center>

Zatem, biorąc pod uwagę, że `P` jest liczbą pierwszą, a `w` jest względnie pierwsza z `P-1`, mamy, że `|{pow(x, w, P) : x ∈ ℤ}| = P`, co oznacza, że funkcja haszująca ma najniższy możliwy wskaźnik kolizji.

W szczególnym przypadku, gdy `P` jest bezpieczną liczbą pierwszą, tak jak wybraliśmy, `P-1` ma tylko czynniki 1, 2, `(P-1)/2` i `P-1`. Ponieważ `P` > 7, wiemy, że 3 jest względnie pierwsza z `P-1`, stąd `w=3` spełnia powyższe twierdzenie.

## Bardziej wydajny algorytm oceny oparty na pamięci podręcznej {#cache-based-evaluation}

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
