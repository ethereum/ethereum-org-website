---
title: Dagger-Hashimoto
description: Dagger-Hashimoto-Algorithmus im Detail.
lang: de
---

Dagger-Hashimoto war die ursprüngliche Forschungsimplementierung und Spezifikation für den Mining-Algorithmus von Ethereum. Dagger-Hashimoto wurde durch [Ethash](#ethash) abgelöst. Das Mining wurde mit [der Zusammenführung](/roadmap/merge/) am 15. September 2022 komplett ausgeschaltet. Seitdem wird die Sicherheit von Ethereum durch einen [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)-Mechanismus gewährleistet. Diese Seite dient dem geschichtlichen Interesse – die Informationen hier sind seit der Zusammenführung für Ethereum nicht mehr relevant.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst in den [Proof-of-Work-Konsens](/developers/docs/consensus-mechanisms/pow), das [Mining](/developers/docs/consensus-mechanisms/pow/mining) und [Mining-Algorithmen](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) einzulesen.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto will zwei Ziele erreichen:

1.  **ASIC-Resistenz**: Der Vorteil der Erstellung von spezieller Hardware für den Algorithmus sollte so gering wie möglich sein.
2.  **Light-Client-Verifizierbarkeit**: Ein Block sollte durch einen Light-Client effizient verifiziert werden können.

Durch eine weitere Modifikation spezifizieren wir außerdem, wie – sofern gewünscht – ein drittes Ziel erreicht wird, was jedoch zusätzliche Komplexität mit sich bringt:

**Speichern der vollen Kette**: Mining sollte das Speichern des gesamten Blockchain-Status erfordern (wegen der irregulären Struktur des Ethereum-Statusbaums wird erwartet, dass einige Kürzungen möglich sein werden, insbedondere von eingen oft genutzten Contracts; dies soll aber minimiert werden).

## DAG-Generierung {#dag-generation}

Der Code für den Algorithmus wird unten in Python definiert. Zunächst geben wir `encode_int` zur Anordnung nicht unterzeichneter Einheiten spezifizierter Präzision an Strings. Die entsprechend Umkehrung wird ebenfalls bereitgestellt:

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

Als Nächstes gehen wir davon aus, dass `sah3` eine Funktion ist, die eine Ganzzahl bezieht und eine Ganzzahl ausgibt, und `dbl_sah3` eine Doppelt-sah3-Funktion ist; wenn man diesen Referenzcode in eine Implementierungsanwendung umwandelt:

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

### Parameter {#parameters}

Folgende Parameter werden für den Algorithmus verwendet:

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

`P` ist in diesem Fall eine Primzahl, die so gewählt wurde, dass `log₂(P)` nur etwas geringer als 512 ist, was den 512 Bits entspricht, die wir zur Darstellung unserer Zahlen nutzen. Beachten Sie, dass nur die zweite Hälfte des DAG tatsächlich gespeichert werden muss, sodass der tatsächliche RAM-Bedarf bei 1 GB beginnt und um 441 MB pro Jahr wächst.

### Bau eines Dagger-Graphen {#dagger-graph-building}

Der Primitiv des Baus eines Dagger-Graphen ist wie folgt definiert:

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

Im Wesentlichen wird ein Graph mit einem einzigen Knoten begonnen, `sha3(seed)`, und von dort aus werden nacheinander weitere Knoten auf der Grundlage zufälliger vorheriger Knoten hinzugefügt. Wenn ein neuer Knoten erstellt wird, wird eine modulare Potenz des Seeds berechnet, um zufällig einige Indizes auszuwählen, die kleiner sind als `i` (bei Verwendung von `x % i` oben), und die Werte der Knoten an diesen Indizes werden in einer Berechnung verwendet, um einen neuen Wert für `x` zu generieren, welcher dann in eine kleine Proof-of-Work-Funktion (auf XOR-Basis) hinzugegeben wird, um letztlich den Wert des Graphen an Index `i` zu generieren. Der Grundgedanke hinter diesem speziellen Design ist, einen sequentiellen Zugriff auf den DAG zu erzwingen; der nächste Wert des DAG, auf den zugegriffen wird, kann nicht bestimmt werden, bis der aktuelle Wert bekannt ist. Schließlich wird das Ergebnis durch modulare Potenzierung weiter gehasht.

Dieser Algorithmus stützt sich auf mehrere Ergebnisse aus der Zahlentheorie. Schauen Sie sich den unteren Zusatz mit einer Diskussion an.

## Light-Client-Bewertung {#light-client-evaluation}

Die oben beschriebene Konstruktion des Graphen soll es ermöglichen, jeden Knoten des Graphen zu rekonstruieren, indem ein Unterbaum mit nur wenigen Knoten berechnet wird und wobei nur nur eine geringe Menge an Zusatzspeicher notig ist. Beachten Sie, dass mit „k=1“ dieser Unterbaum nur eine Kette von Werten ist, die sich bis zum ersten Element im DAG hochziehen.

Diese Light-Client-Berechnungsfunktion für den DAG funktioniert wie folgt:

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

Im Wesentlichen handelt es sich einfach um eine neue Implementierung des obigen Algorithmus, bei der die Schleife zur Berechnung der Werte für den gesamten DAG entfällt und die frühere Knotensuche durch einen rekursiven Aufruf oder eine Cache-Suche ersetzt wird. Beachten Sie, dass für `k=1` der Cache unnötig ist, obwohl eine weitere Optimierung die ersten paar Tausend Werte der DAG vorab berechnet und diese als statischen Cache für Berechnungen aufbewahrt; im Zusatz finden Sie eine entsprechende Code-Implementierung.

## Doppelte DAG-Puffer {#double-buffer}

In einem vollen Client wird ein [_doppelter Puffer_](https://wikipedia.org/wiki/Multiple_buffering) von 2 DAGs verwendet, die mithilfe der obigen Formel produziert wurden. Der Gedanke dahinter ist, dass DAGs jede `epochtime` Anzahl von Blöcken entsprechend den obigen Parametern erzeugt werden. Der Client verwendet nicht den zuletzt erstellten DAG, sondern den vorherigen. Das hat den Vorteil, dass die DAGs im Laufe der Zeit ersetzt werden können, ohne dass ein Schritt eingefügt werden muss, bei dem Miner plötzlich alle Daten neu berechnen müssen. Andernfalls besteht die Gefahr einer abrupten, vorübergehenden Verlangsamung der Chain-Verarbeitung in regelmäßigen Abständen und einer dramatisch zunehmenden Zentralisierung. Dadurch könnte es 51-%-Angriffe in diesen wenigen Minuten geben, bevor alle Daten neu berechnet sind.

Der Algorithmus für das Generieren des DAG-Sets zur Berechnung der Arbeit für einen Block ist wie folgt:

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

Die Idee hinter dem ursprünglichen Hashimoto besteht darin, die Blockchain als Datensatz zu nutzen, eine Berechnung durchzuführen, die n Indizes aus der Blockchain auswählt, die Transaktionen an diesen Indizes sammelt, ein XOR dieser Daten durchführt und den Hash des Ergebnisses zurückgibt. Der ursprüngliche Algorithmus von Thaddeus Dryja – der Konsistenz halber in Python übersetzt – lautet wie folgt:

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

Leider gilt Hashimoto zwar als RAM-intensiv, jedoch basiert er auf einer 256-Bit-Arithmetik, die eine erhebliche Rechenlast verursacht. Dagger-Hashimoto verwendet jedoch nur die 64 am wenigsten signifikanten Bits, wenn er seinen Datensatz indiziert, um dieses Problem zu lösen.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Der Einsatz von Doppel-SHA3 ermöglicht eine Form der sofortigen Vorab-Verifizierung ohne Datenübertragung, bei der lediglich geprüft wird, ob ein korrekter Zwischenwert bereitgestellt wurde. Diese äußere Schicht von Proof-of-Work ist äußerst ASIC-freundlich und relativ schwach ausgelegt. Sie existiert jedoch, um DDoS-Angriffe noch weiter zu erschweren, da dieser kleine Arbeitsaufwand erbracht werden muss, um einen Block zu erzeugen, der nicht sofort abgelehnt wird. Hier ist die Light-Client-Version:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Mining und Verifizierung {#mining-and-verifying}

Nun setzen wir das alles in einem Mining-Algorithmus zusammen:

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

Hier ist der Verifizierungsalgorithmus:

```python
def verify(daggerset, params, block, nonce):
    result = hashimoto(daggerset, get_dagsize(params, block),
                       params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Light-Client-freundliche Verifizierung:

```python
def light_verify(params, header, nonce):
    seedset = get_seedset(params, block)
    result = quick_hashimoto(seedset["front_hash"], get_dagsize(params, block),
                             params, decode_int(block.prevhash), nonce)
    return result * params["diff"] < 2**256
```

Beachten Sie außerdem, dass Dagger-Hashimoto zusätzliche Anforderungen an den Blockheader stellt:

- Damit eine Verifizierung mit zwei Ebenen funktioniert, muss ein Block-Header sowohl die Nonce als auch den mittleren Wert vor sha3 haben.
- Irgendwo muss ein Block-Header den sha3 des aktuellen Seed-Sets speichern.

## Weiterführende Informationen {#further-reading}

_Kennst du eine Community-Ressource, die dir geholfen hat? Bearbeite diese Seite und füge sie hinzu!_

## Anhang {#appendix}

Wie oben erwähnt, basiert der für die DAG-Generierung verwendete RNG auf einigen Ergebnissen aus der Zahlentheorie. Zunächst stellen wir sicher, dass der Lehmer-RNG, welcher die Grundlage für die Variable `picker` bildet, eine lange Periode besitzt. Im zweiten Schritt zeigen wir, dass `pow(x,3,P)` `x` nicht `1` oder `P-1` zuordnet, sofern `x ∈ [2,P-2]` als Startwert gilt. Schließlich zeigen wir, dass `pow(x,3,P)` eine niedrige Kollisionsrate hat, wenn es als Hashing-Funktion behandelt wird.

### Lehmer-Zufallszahlengenerator {#lehmer-random-number}

Obwohl die Funktion `produce_dag` keine unverzerrten Zufallszahlen erzeugen muss, besteht eine potenzielle Gefahr darin, dass `seed**i % P` nur eine Handvoll Werte annimmt. Dies könnte Minern, die das Muster erkennen, einen Vorteil gegenüber denen verschaffen, die es nicht tun.

Um dies zu vermeiden, wird auf ein Ergebnis aus der Zahlentheorie zurückgegriffen. Eine [_sichere Primzahl_](https://en.wikipedia.org/wiki/Safe_prime) ist definiert als eine Primzahl `P`, sodass `(P-1)/2` ebenfalls eine Primzahl ist. Die _Reihenfolge_ eines Mitglieds `x` der [multiplikativen Gruppe](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` ist definiert als das minimale `m`, sodass <pre>xᵐ mod P ≡ 1</pre>
Angesichts dieser Definitionen haben wir:

> Beobachtung 1. Lassen Sie `x` ein Mitglied der multiplikativen Gruppe `ℤ/Pℤ` für eine sichere Primzahl `P` sein. Bei `x mod P ≠ 1 mod P` und `x mod P ≠ P-1 mod P` ist die Ordnung von `x` entweder `P-1` oder `(P-1)/2`.

_Beweis_. Da `P` eine sichere Primzahl ist, gilt nach dem \[Satz von Lagrange\]\[lagrange\], dass die Ordnung von `x` entweder `1`, `2`, `(P-1)/2` oder `P-1` ist.

Die Ordnung von `x` kann nicht `1` sein, da wir gemäß dem Little Theorem von Fermat Folgendes haben:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Daher muss `x` eine multiplikative Identität von `ℤ/nℤ` sein, die eindeutig ist. Da wir angenommen haben, dass `x ≠ 1`, ist dies nicht möglich.

Die Ordnung von `x` kann nicht `2` sein, es sei denn, `x = P-1`, weil dies die Aussage verletzen würde, dass `P` eine Primzahl ist.

Aus dem obigen Vorschlag können wir erkennen, dass die Iteration von `(picker * init) % P` eine Zykluslänge von mindestens `(P-1)/2` hat. Das liegt daran, dass wir `P` als sichere Primzahl gewählt haben, die etwa einer höheren Potenz von zwei entspricht, und `init` im Intervall `[2,2**256+1]` liegt. Angesichts der Größe von `P` sollten wir niemals einen Zyklus aus der modularen Potenzierung erwarten.

Wenn wir die erste Zelle im DAG zuweisen (die Variable mit der Bezeichnung `init`), berechnen wir `pow(sha3(seed) + 2, 3, P)`. Auf den ersten Blick stellt dies nicht sicher, dass das Ergebnis weder `1` noch `P-1` ist. Da `P-1` jedoch eine sichere Primzahl ist, haben wir die folgende zusätzliche Sicherheit, die eine Folgerung aus Beobachtung 1 ist:

> Beobachtung 2. `x` sei ein Element der multiplikativen Gruppe `ℤ/Pℤ` für eine sichere Primzahl `P`, und `w` sei eine natürliche Zahl. Wenn `x mod P ≠ 1 mod P` und `x mod P ≠ P-1 mod P` sowie `w mod P ≠ P-1 mod P` und `w mod P ≠ 0 mod P`, dann `xʷ mod P ≠ 1 mod P` und `xʷ mod P ≠ P-1 mod P`.

### Modulare Potenzierung als Hash-Funktion {#modular-exponentiation}

Bei bestimmten Werten von `P` und `w` kann es bei der Funktion `pow(x, w, P)` zu zahlreichen Kollisionen kommen. Beispielsweise nimmt `pow(x,9,19)` nur die Werte `{1,18}` an.

Wenn `P` eine Primzahl ist, kann ein geeignetes `w` für eine Hash-Funktion zur modularen Potenzierung mithilfe des folgenden Ergebnisses ausgewählt werden:

> Beobachtung 3. `P` sei eine Primzahl; `w` und `P-1` sind nur dann teilerfremd, wenn für alle `a` und `b` in `ℤ/Pℤ` Folgendes gilt:
> 
> <center>
>   „aʷ mod P ≡ bʷ mod P“ gilt nur dann, wenn „a mod P ≡ b mod P“
> </center>

Da `P` eine Primzahl ist und `w` teilerfremd zu `P-1` ist, gilt, dass `|{pow(x, w, P) : x ∈ ℤ}| = P`, was bedeutet, dass die Hashing-Funktion die minimal mögliche Kollisionsrate aufweist.

Im speziellen Fall, dass `P` eine sichere Primzahl ist, wie wir sie ausgewählt haben, hat `P-1` nur die Faktoren 1, 2, `(P-1)/2` und `P-1`. Da `P` > 7 ist, wissen wir, dass 3 teilerfremd zu `P-1` ist, daher erfüllt `w=3` die obige Aussage.

## Effizienterer cache-basierter Auswertungsalgorithmus {#cache-based-evaluation}

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
