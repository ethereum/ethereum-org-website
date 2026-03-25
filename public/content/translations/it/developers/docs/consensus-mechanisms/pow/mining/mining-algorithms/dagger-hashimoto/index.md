---
title: Dagger-Hashimoto
description: Uno sguardo dettagliato all'algoritmo Dagger-Hashimoto.
lang: it
---

Dagger-Hashimoto è stata l'implementazione di ricerca e la specifica originale per l'algoritmo di mining di Ethereum. Dagger-Hashimoto è stato sostituito da [Ethash](#ethash). Il mining è stato completamente disattivato con [Il Merge](/roadmap/merge/) il 15 settembre 2022. Da allora, Ethereum è stato messo in sicurezza utilizzando invece un meccanismo di [prova di stake](/developers/docs/consensus-mechanisms/pos). Questa pagina è di interesse storico: le informazioni qui contenute non sono più rilevanti per l'Ethereum post-Merge.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, ti consigliamo di leggere prima il [consenso basato sulla prova di lavoro](/developers/docs/consensus-mechanisms/pow), il [mining](/developers/docs/consensus-mechanisms/pow/mining) e gli [algoritmi di mining](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms).

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto mira a soddisfare due obiettivi:

1.  **Resistenza agli ASIC**: il vantaggio derivante dalla creazione di hardware specializzato per l'algoritmo dovrebbe essere il più piccolo possibile
2.  **Verificabilità del client leggero**: un blocco dovrebbe essere verificabile in modo efficiente da un client leggero.

Con un'ulteriore modifica, specifichiamo anche come soddisfare un terzo obiettivo, se lo si desidera, ma al costo di una maggiore complessità:

**Archiviazione dell'intera catena**: il mining dovrebbe richiedere l'archiviazione dello stato completo della blockchain (a causa della struttura irregolare del trie dello stato di Ethereum, prevediamo che sarà possibile una certa potatura, in particolare di alcuni contratti usati di frequente, ma vogliamo ridurla al minimo).

## Generazione del DAG {#dag-generation}

Il codice per l'algoritmo verrà definito in Python di seguito. Innanzitutto, forniamo `encode_int` per il marshalling di interi senza segno di precisione specificata in stringhe. Viene fornito anche il suo inverso:

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

Supponiamo poi che `sha3` sia una funzione che accetta un intero e restituisce un intero, e `dbl_sha3` sia una funzione double-sha3; se si converte questo codice di riferimento in un'implementazione, utilizzare:

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

I parametri utilizzati per l'algoritmo sono:

```python
SAFE_PRIME_512 = 2**512 - 38117 # Il più grande numero primo sicuro minore di 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS, # Dimensione del dataset (4 Gigabyte); DEVE ESSERE UN MULTIPLO DI 65536
      "n_inc": 65536, # Incremento del valore di n per periodo; DEVE ESSERE UN MULTIPLO DI 65536
                                        # con epochtime=20000 dà una crescita di 882 MB all'anno
      "cache_size": 2500, # Dimensione della cache del light client (può essere scelta dal light
                                        # client; non fa parte delle specifiche dell'algoritmo)
      "diff": 2**14, # Difficoltà (regolata durante la valutazione del blocco)
      "epochtime": 100000, # Lunghezza di un'epoca in blocchi (con quale frequenza viene aggiornato il dataset)
      "k": 1, # Numero di genitori di un nodo
      "w": w, # Usato per l'hash dell'esponenziazione modulare
      "accesses": 200, # Numero di accessi al dataset durante hashimoto
      "P": SAFE_PRIME_512 # Numero primo sicuro per l'hash e la generazione di numeri casuali
}
```

In questo caso `P` è un numero primo scelto in modo tale che `log₂(P)` sia solo leggermente inferiore a 512, il che corrisponde ai 512 bit che abbiamo utilizzato per rappresentare i nostri numeri. Nota che solo l'ultima metà del DAG deve essere effettivamente archiviata, quindi il requisito di RAM de facto parte da 1 GB e cresce di 441 MB all'anno.

### Costruzione del grafo Dagger {#dagger-graph-building}

La primitiva di costruzione del grafo Dagger è definita come segue:

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

Essenzialmente, inizia un grafo come un singolo nodo, `sha3(seed)`, e da lì inizia ad aggiungere sequenzialmente altri nodi basati su nodi precedenti casuali. Quando viene creato un nuovo nodo, viene calcolata una potenza modulare del seme per selezionare casualmente alcuni indici minori di `i` (usando `x % i` sopra), e i valori dei nodi a quegli indici vengono utilizzati in un calcolo per generare un nuovo valore per `x`, che viene poi inserito in una piccola funzione di prova di lavoro (basata su XOR) per generare infine il valore del grafo all'indice `i`. La logica alla base di questo particolare design è forzare l'accesso sequenziale del DAG; il valore successivo del DAG a cui si accederà non può essere determinato finché non si conosce il valore corrente. Infine, l'esponenziazione modulare esegue ulteriormente l'hash del risultato.

Questo algoritmo si basa su diversi risultati della teoria dei numeri. Consulta l'appendice di seguito per una discussione.

## Valutazione del client leggero {#light-client-evaluation}

La costruzione del grafo di cui sopra intende consentire la ricostruzione di ciascun nodo nel grafo calcolando un sottoalbero di un piccolo numero di nodi e richiedendo solo una piccola quantità di memoria ausiliaria. Nota che con k=1, il sottoalbero è solo una catena di valori che arriva fino al primo elemento nel DAG.

La funzione di calcolo del client leggero per il DAG funziona come segue:

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

Essenzialmente, è semplicemente una riscrittura dell'algoritmo di cui sopra che rimuove il ciclo di calcolo dei valori per l'intero DAG e sostituisce la precedente ricerca del nodo con una chiamata ricorsiva o una ricerca nella cache. Nota che per `k=1` la cache non è necessaria, sebbene un'ulteriore ottimizzazione precalcoli effettivamente le prime migliaia di valori del DAG e li mantenga come cache statica per i calcoli; consulta l'appendice per un'implementazione del codice di questo.

## Doppio buffer di DAG {#double-buffer}

In un client completo, viene utilizzato un [_doppio buffer_](https://wikipedia.org/wiki/Multiple_buffering) di 2 DAG prodotti dalla formula precedente. L'idea è che i DAG vengano prodotti ogni numero `epochtime` di blocchi in base ai parametri di cui sopra. Invece di utilizzare l'ultimo DAG prodotto, il client utilizza quello precedente. Il vantaggio di questo è che consente di sostituire i DAG nel tempo senza dover incorporare un passaggio in cui i minatori devono ricalcolare improvvisamente tutti i dati. Altrimenti, c'è il potenziale per un brusco rallentamento temporaneo nell'elaborazione della catena a intervalli regolari e un aumento drammatico della centralizzazione. Di conseguenza, rischi di attacco del 51% in quei pochi minuti prima che tutti i dati vengano ricalcolati.

L'algoritmo utilizzato per generare l'insieme di DAG utilizzati per calcolare il lavoro per un blocco è il seguente:

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
        # Nessun back buffer è possibile, crea solo il front buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

L'idea alla base dell'Hashimoto originale è quella di utilizzare la blockchain come set di dati, eseguendo un calcolo che seleziona N indici dalla blockchain, raccoglie le transazioni a quegli indici, esegue uno XOR di questi dati e restituisce l'hash del risultato. L'algoritmo originale di Thaddeus Dryja, tradotto in Python per coerenza, è il seguente:

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

Sfortunatamente, sebbene Hashimoto sia considerato intensivo per la RAM, si basa sull'aritmetica a 256 bit, che ha un notevole sovraccarico computazionale. Tuttavia, Dagger-Hashimoto utilizza solo i 64 bit meno significativi durante l'indicizzazione del suo set di dati per risolvere questo problema.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

L'uso del doppio SHA3 consente una forma di pre-verifica quasi istantanea a zero dati, verificando solo che sia stato fornito un valore intermedio corretto. Questo livello esterno di prova di lavoro è altamente compatibile con gli ASIC e piuttosto debole, ma esiste per rendere gli attacchi DDoS ancora più difficili poiché quella piccola quantità di lavoro deve essere svolta per produrre un blocco che non verrà rifiutato immediatamente. Ecco la versione per client leggero:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Mining e verifica {#mining-and-verifying}

Ora, mettiamo tutto insieme nell'algoritmo di mining:

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

Verifica compatibile con il client leggero:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Inoltre, nota che Dagger-Hashimoto impone requisiti aggiuntivi sull'intestazione del blocco:

- Affinché la verifica a due livelli funzioni, un'intestazione del blocco deve avere sia il nonce che il valore intermedio pre-sha3
- Da qualche parte, un'intestazione del blocco deve memorizzare lo sha3 del seedset corrente

## Letture consigliate {#further-reading}

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Appendice {#appendix}

Come notato sopra, l'RNG utilizzato per la generazione del DAG si basa su alcuni risultati della teoria dei numeri. In primo luogo, forniamo la garanzia che l'RNG di Lehmer che è alla base della variabile `picker` abbia un periodo ampio. In secondo luogo, mostriamo che `pow(x,3,P)` non mapperà `x` a `1` o `P-1` a condizione che `x ∈ [2,P-2]` per iniziare. Infine, mostriamo che `pow(x,3,P)` ha un basso tasso di collisione quando trattato come una funzione di hashing.

### Generatore di numeri casuali di Lehmer {#lehmer-random-number}

Sebbene la funzione `produce_dag` non debba produrre numeri casuali non distorti, una potenziale minaccia è che `seed**i % P` assuma solo una manciata di valori. Ciò potrebbe fornire un vantaggio ai minatori che riconoscono il modello rispetto a quelli che non lo fanno.

Per evitare ciò, si fa appello a un risultato della teoria dei numeri. Un [_Numero primo sicuro_](https://en.wikipedia.org/wiki/Safe_prime) è definito come un numero primo `P` tale che anche `(P-1)/2` sia primo. L'_ordine_ di un membro `x` del [gruppo moltiplicativo](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` è definito come il minimo `m` tale che <pre>xᵐ mod P ≡ 1</pre>
Date queste definizioni, abbiamo:

> Osservazione 1. Sia `x` un membro del gruppo moltiplicativo `ℤ/Pℤ` per un numero primo sicuro `P`. Se `x mod P ≠ 1 mod P` e `x mod P ≠ P-1 mod P`, allora l'ordine di `x` è `P-1` o `(P-1)/2`.

_Dimostrazione_. Poiché `P` è un numero primo sicuro, allora per il [Teorema di Lagrange][lagrange] abbiamo che l'ordine di `x` è `1`, `2`, `(P-1)/2` o `P-1`.

L'ordine di `x` non può essere `1`, poiché per il Piccolo Teorema di Fermat abbiamo:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Quindi `x` deve essere un'identità moltiplicativa di `ℤ/nℤ`, che è unica. Poiché abbiamo supposto che `x ≠ 1` per ipotesi, questo non è possibile.

L'ordine di `x` non può essere `2` a meno che `x = P-1`, poiché ciò violerebbe il fatto che `P` sia primo.

Dalla proposizione precedente, possiamo riconoscere che l'iterazione di `(picker * init) % P` avrà una lunghezza del ciclo di almeno `(P-1)/2`. Questo perché abbiamo selezionato `P` in modo che sia un numero primo sicuro approssimativamente uguale a una potenza superiore di due, e `init` è nell'intervallo `[2,2**256+1]`. Data la grandezza di `P`, non dovremmo mai aspettarci un ciclo dall'esponenziazione modulare.

Quando assegniamo la prima cella nel DAG (la variabile etichettata `init`), calcoliamo `pow(sha3(seed) + 2, 3, P)`. A prima vista, questo non garantisce che il risultato non sia né `1` né `P-1`. Tuttavia, poiché `P-1` è un numero primo sicuro, abbiamo la seguente garanzia aggiuntiva, che è un corollario dell'Osservazione 1:

> Osservazione 2. Sia `x` un membro del gruppo moltiplicativo `ℤ/Pℤ` per un numero primo sicuro `P`, e sia `w` un numero naturale. Se `x mod P ≠ 1 mod P` e `x mod P ≠ P-1 mod P`, così come `w mod P ≠ P-1 mod P` e `w mod P ≠ 0 mod P`, allora `xʷ mod P ≠ 1 mod P` e `xʷ mod P ≠ P-1 mod P`

### Esponenziazione modulare come funzione di hash {#modular-exponentiation}

Per determinati valori di `P` e `w`, la funzione `pow(x, w, P)` potrebbe avere molte collisioni. Ad esempio, `pow(x,9,19)` assume solo i valori `{1,18}`.

Dato che `P` è primo, allora un `w` appropriato per una funzione di hashing di esponenziazione modulare può essere scelto utilizzando il seguente risultato:

> Osservazione 3. Sia `P` un numero primo; `w` e `P-1` sono coprimi se e solo se per tutti gli `a` e `b` in `ℤ/Pℤ`:<center>`aʷ mod P ≡ bʷ mod P` se e solo se `a mod P ≡ b mod P`</center>

Pertanto, dato che `P` è primo e `w` è coprimo rispetto a `P-1`, abbiamo che `|{pow(x, w, P) : x ∈ ℤ}| = P`, il che implica che la funzione di hashing ha il tasso di collisione minimo possibile.

Nel caso speciale in cui `P` sia un numero primo sicuro come abbiamo selezionato, allora `P-1` ha solo i fattori 1, 2, `(P-1)/2` e `P-1`. Poiché `P` > 7, sappiamo che 3 è coprimo rispetto a `P-1`, quindi `w=3` soddisfa la proposizione precedente.

## Algoritmo di valutazione basato su cache più efficiente {#cache-based-evaluation}

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