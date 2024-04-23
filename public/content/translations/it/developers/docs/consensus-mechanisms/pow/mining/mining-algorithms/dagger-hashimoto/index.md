---
title: Dagger-Hashimoto
description: Uno sguardo dettagliato all'algoritmo di Dagger-Hashimoto.
lang: it
---

Dagger-Hashimoto era l'implementazione e specifica di ricerca originale per l'algoritmo di mining di Ethereum. Dagger-Hashimoto è stato sostituito da [Ethash](#ethash). Il Mining è stata disattivato completamente con[ il Merge](/roadmap/merge/) il 15 settembre 2022. Da allora, Ethereum è stato assicurato utilizzando un meccanismo [proof-of-of-stake](/developers/docs/consensus-mechanisms/pos). Questa pagina è di interesse storico - le informazioni qui non sono più rilevanti per post-Merge Ethereum.

## Prerequisiti {#prerequisites}

Per meglio comprendere questa pagina, ti consigliamo prima di informarti sul [consenso proof-of-work](/developers/docs/consensus-mechanisms/pow), sul [mining](/developers/docs/consensus-mechanisms/pow/mining) e sugli [algoritmi di mining](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto punta a soddisfare due obiettivi:

1.  **Resistenza ASIC**: la creazione di hardware specializzato per l'algoritmo dovrebbe apportare un beneficio minimo
2.  **Verificabilità da un client leggero**: un blocco dovrebbe essere efficientemente verificabile da un client leggero.

Con una modifica aggiuntiva, specifichiamo anche come raggiungere un terzo obiettivo se desiderato, ma al costo di una maggiore complessità:

**Archiviazione della catena completa**: il mining dovrebbe richiedere l'archiviazione dello stato completo della blockchain (a causa della struttura irregolare dell'albero di stato di Ethereum, prevediamo la possibilità di alcune potature (pruning), soprattutto dopo alcuni contratti usati spesso, che vogliamo comunque mantenere al minimo).

## Generazione del DAG {#dag-generation}

Il codice per l'algoritmo sarà definito in Python, di seguito. Per prima cosa, diamo `encode_int` per il marshaling in stringhe di interi non firmati con una precisione specificata. È dato anche il suo opposto:

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

Poi supponiamo che `sha3` sia una funzione che prende un intero e produce un intero e che `dbl_sha3` sia una funzione double-sha3; se vogliamo convertire questo codice di riferimento in un uso d'implementazione:

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

### Parametri {#parameters}

I parametri usati per l'algoritmo sono:

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

`P` in questo caso è un numero primo scelto in modo che `log₂(P)` sia solo di poco inferiore a 512, che corrisponde ai 512 bit che abbiamo usato per rappresentare i nostri numeri. Nota che in realtà deve essere memorizzata solo la seconda metà del DAG, quindi il requisito de-facto di RAM parte da 1 GB e cresce di 441 MB l'anno.

### Costruzione del grafico dagger {#dagger-graph-building}

Il primitivo di costruzione del grafico dagger è definito come segue:

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

Essenzialmente, avvia un grafico come un singolo nodo, `sha3(seed)` e da lì si inizia ad aggiungere sequenzialmente gli altri nodi, a seconda dei nodi casuali precedenti. Quando viene creato un nuovo nodo, è calcolata una potenza modulare del seed per selezionare casualmente degli indici inferiori a `i` (usando il suddetto `x % i`) e i valori dei nodi a questi indici sono usati all'interno di un calcolo per generare un nuovo valore per `x`, che viene poi passato a una piccola funzione di proof-of-work (basata su XOR) per generare, infine, il valore del grafico all'indice `i`. La logica dietro questa costruzione particolare è forzare l'accesso sequenziale del DAG; il valore successivo del DAG che sarà accessibile non è determinabile finché non sia noto il valore corrente. Infine, l'esponenziazione modulare genera ulteriormente un hashing del risultato.

Questo algoritmo si basa su diversi risultati dalla teoria dei numeri. Vedere l'appendice più avanti per una discussione.

## Valutazione da client leggero {#light-client-evaluation}

Questa costruzione del grafico intende consentire a ogni nodo nel grafico di essere ricostruito calcolando solamente l'albero secondario di un piccolo numero di nodi, in modo da richiedere solo una piccola quantità di memoria ausiliaria. Nota che, con k=1, l'albero secondario è solo una catena di valori che cresce al primo elemento nel DAG.

La funzione di calcolo del client leggero per il DAG funziona così:

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

essenzialmente, è semplicemente una riscrittura dell'algoritmo di cui sopra, che elimina il ciclo di calcolo dei valori per l'intero DAG e sostituisce la ricerca del nodo precedente con una chiamata ricorsiva o una ricerca della cache. Nota che per `k=1`, la cache non è necessaria, anche se in realtà un'ulteriore ottimizzazione pre-calcola le prime migliaia di valori del DAG e li mantiene come una cache statica per i calcoli; vedi l'appendice per l'implementazione di un codice a riguardo.

## Doppio buffer di DAG {#double-buffer}

In un client completo, è usato un [_doppio buffer_](https://wikipedia.org/wiki/Multiple_buffering) di 2 DAG prodotti dalla suddetta formula. L'idea è che i DAG siano prodotti ogni `epochtime` numero di blocchi, secondo i parametri indicati sopra. Il client non usa l'ultimo DAG prodotto, ma quello precedente. Il beneficio è che consente ai DAG di essere sostituiti nel tempo senza dover prevedere un passaggio in cui i miner devono improvvisamente ricalcolare tutti i dati. In caso contrario vi sarebbe il rischio, a intervalli regolari, di un brusco rallentamento temporaneo nell'elaborazione della catena e l'aumento drastico della centralizzazione. In quei pochi minuti prima che tutti i dati siano ricalcolati sussiste quindi il rischio di un attacco 51%.

L'algoritmo usato per generare la serie di DAG usati per calcolare il lavoro per un blocco è il seguente:

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

L'idea dietro all'Hashimoto originale è usare la blockchain come dataset, eseguendo un calcolo che selezioni N indici dalla blockchain, raccolga le transazioni a quegli indici, esegua uno XOR di questi dati e restituisca l'hash del risultato. L'algoritmo originale di Thaddeus Dryja, tradotto in Python per coerenza, è il seguente:

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

Sfortunatamente, anche se Hashimoto è considerato gravoso per la RAM, si affida a un'aritmetica a 256 bit, che richiede molti calcoli. Per risolvere questo problema, Dagger-Hashimoto usa comunque solo i 64 bit meno significativi, indicizzando il proprio dataset.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

L'uso di SHA3 doppi consente una forma di dati zero, una pre-verifica quasi istantanea, che verifica solo che sia stato fornito un valore intermedio corretto. Questo livello esterno di proof-of-work è altamente pro-ASIC e abbastanza debole, ma è pensato per rendere ancora più complicati gli attacchi DDoS, poiché per produrre un blocco che non sarà immediatamente scartato deve essere eseguito un po’ di lavoro. Ecco la versione del client leggero:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Mining e verifica {#mining-and-verifying}

Mettiamo ora tutto insieme nell'algoritmo di mining:

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

Ecco l'algoritmo di verifica:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Verifica adatta a un client leggero:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Inoltre, nota che Dagger-Hashimoto impone anche altri requisiti sull'intestazione del blocco:

- Perché la verifica a due livelli funzioni, l'intestazione di un blocco deve avere sia il nonce che il valore medio di pre-sha3
- Da qualche parte, l'intestazione di un blocco deve memorizzare la sha3 del set di seed corrente

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Appendice {#appendix}

Come notato sopra, l'RNG usato per la generazione del DAG si affida ad alcuni risultati dalla teoria dei numeri. Per prima cosa, accertiamoci che l'RNG di Lehmer che è la base per la variabile `picker` abbia un periodo ampio. In secondo luogo, mostriamo che `pow(x,3,P)` non mapperà `x` a `1` o `P-1`, a condizione che all’inizio `x ∈ [2,P-2]`. Infine, mostriamo che `pow(x,3,P)` ha un basso tasso di collisione se trattato come funzione di hashing.

### Generatore di numeri casuali di Lehmer {#lehmer-random-number}

Sebbene la funzione `produce_dag` non necessiti di produrre numeri casuali imparziali, un possibile rischio è dato dal fatto che `seed**i % P` prende solo una manciata di valori. Questo potrebbe fornire un vantaggio ai miner che riconoscono lo schema, rispetto a quelli che non lo conoscono.

Per evitarlo, si è fatto ricorso a un risultato dalla teoria dei numeri. Un [_Numero primo sicuro_](https://en.wikipedia.org/wiki/Safe_prime) si definisce come numero primo `P` tale per cui anche `(P-1)/2` è un numero primo. L'_ordine_ di un membro `x` del [gruppo moltiplicativo](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` è definito come il valore minimo di `m` tale per cui <pre>xᵐ mod P ≡ 1</pre>
Date queste definizioni, abbiamo:

> Osservazione 1. Ipotizziamo che `x` sia un membro del gruppo moltiplicativo `ℤ/Pℤ` per un numero primo sicuro `P`. Se `x mod P ≠ 1 mod P` e `x mod P ≠ P-1 mod P`, allora l'ordine di `x` è `P-1` o `(P-1)/2`.

_Dimostrazione_. Poiché `P` è un numero primo sicuro, allora per il \[Teorema di Lagrange\]\[lagrange\], l'ordine di `x` è `1`, `2`, `(P-1)/2` o `P-1`.

L'ordine di `x` non può essere `1`, poiché secondo il Piccolo teorema di Fermat:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Quindi, `x`, deve essere un'identità moltiplicativa di `ℤ/nℤ`, che è univoca. Poiché abbiamo presupposto che `x ≠ 1`, ciò è impossibile.

L'ordine di `x` non può essere `2` a meno che `x = P-1`, poiché ciò violerebbe il fatto che `P` sia un numero primo.

Dalla suddetta proposizione possiamo capire che iterando `(picker * init) % P`, avrà una lunghezza del ciclo di almeno `(P-1)/2`. Questo perché abbiamo selezionato `P` come un numero primo sicuro, approssimativamente pari a una potenza superiore di due e che `init` è nell'intervallo `[2,2**256+1]`. Data la magnitudine di `P`, non dovremmo mai aspettarci un ciclo dall'esponenziazione modulare.

Quando assegniamo la prima cella nel DAG (la variabile etichettata come `init`), calcoliamo `pow(sha3(seed) + 2, 3, P)`. A prima vista, questo non garantisce che il risultato sia `1` né `P-1`. Tuttavia, poiché `P-1` è un numero primo sicuro, abbiamo la seguente garanzia aggiuntiva, che è un corollario dell'Osservazione 1:

> Osservazione 2. Ipotizziamo che `x` sia un membro del gruppo moltiplicativo `ℤ/Pℤ` per un numero primo sicuro `P`, e prendiamo `w` come numero naturale. Se `x mod P ≠ 1 mod P` e `x mod P ≠ P-1 mod P`, nonché `w mod P ≠ P-1 mod P` e `w mod P ≠ 0 mod P`, allora `xʷ mod P ≠ 1 mod P` e `xʷ mod P ≠ P-1 mod P`

### Esponenziazione modulare come funzione di hash {#modular-exponentiation}

Per certi valori di `P` e `w`, la funzione `pow(x, w, P)` potrebbe avere molte collisioni. Ad esempio, `pow(x,9,19)` prende solo i valori `{1,18}`.

Dato che `P` è primo, allora è possibile scegliere un'appropriata `w` per una funzione di hashing di esponenziazione modulare usando il seguente risultato:

> Osservazione 3. Prendiamo `P` come numero primo; `w` e `P-1` sono coprimi se e solo se per ogni `a` e `b` in `ℤ/Pℤ`:
> 
> <center>
>   `aʷ mod P ≡ bʷ mod P` se e solo se `a mod P ≡ b mod P`
> </center>

Dunque, dato che `P` è primo e `w` è coprimo rispetto a `P-1`, abbiamo che `|{pow(x, w, P) : x ∈ ℤ}| = P`, e questo implica che la funzione di hashing ha la frequenza di collisione minima possibile.

Nel caso speciale in cui `P` sia un numero primo sicuro, come da noi selezionato, allora `P-1` ha solo i fattori 1, 2, `(P-1)/2` e `P-1`. Poiché `P` > 7, sappiamo che 3 è primo rispetto a `P-1`, quindi `w=3` soddisfa la proposizione precedente.

## Algoritmo di valutazione più efficiente basato sulla cache {#cache-based-evaluation}

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
