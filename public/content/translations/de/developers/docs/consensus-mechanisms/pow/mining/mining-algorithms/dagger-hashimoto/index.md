---
title: Dagger-Hashimoto
description: Ein detaillierter Blick auf den Dagger-Hashimoto-Algorithmus.
lang: de
---

Dagger-Hashimoto war die ursprüngliche Forschungsimplementierung und Spezifikation für den Mining-Algorithmus von Ethereum. Dagger-Hashimoto wurde durch [Ethash](#ethash) ersetzt. Das Mining wurde beim [Merge](/roadmap/merge/) am 15. September 2022 vollständig abgeschaltet. Seitdem wird Ethereum stattdessen durch einen [Proof-of-Stake](/developers/docs/consensus-mechanisms/pos)-Mechanismus gesichert. Diese Seite ist von historischem Interesse – die hierin enthaltenen Informationen sind für das Post-Merge-Ethereum nicht mehr relevant.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über den [Proof-of-Work-Konsens](/developers/docs/consensus-mechanisms/pow), [Mining](/developers/docs/consensus-mechanisms/pow/mining) und [Mining-Algorithmen](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms) zu informieren.

## Dagger-Hashimoto {#dagger-hashimoto}

Dagger-Hashimoto zielt darauf ab, zwei Ziele zu erfüllen:

1.  **ASIC-Resistenz**: Der Nutzen aus der Entwicklung spezialisierter Hardware für den Algorithmus sollte so gering wie möglich sein.
2.  **Verifizierbarkeit durch Light Clients**: Ein Block sollte von einem Light Client effizient verifizierbar sein.

Mit einer zusätzlichen Modifikation spezifizieren wir auch, wie ein drittes Ziel auf Wunsch erfüllt werden kann, jedoch auf Kosten zusätzlicher Komplexität:

**Speicherung der gesamten Chain**: Das Mining sollte die Speicherung des gesamten Blockchain-Zustands erfordern (aufgrund der unregelmäßigen Struktur des Ethereum-Zustands-Tries gehen wir davon aus, dass ein gewisses Pruning möglich sein wird, insbesondere bei einigen häufig verwendeten Verträgen, aber wir möchten dies minimieren).

## DAG-Generierung {#dag-generation}

Der Code für den Algorithmus wird unten in Python definiert. Zuerst geben wir `encode_int` an, um vorzeichenlose Ganzzahlen (unsigned ints) einer bestimmten Genauigkeit in Strings umzuwandeln. Die Umkehrung ist ebenfalls angegeben:

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

Wir nehmen im Folgenden an, dass `sha3` eine Funktion ist, die eine Ganzzahl annimmt und eine Ganzzahl ausgibt, und `dbl_sha3` eine Double-SHA3-Funktion ist; wenn Sie diesen Referenzcode in eine Implementierung umwandeln, verwenden Sie:

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

Die für den Algorithmus verwendeten Parameter sind:

```python
SAFE_PRIME_512 = 2**512 - 38117 # Größte sichere Primzahl kleiner als 2**512

params = {
      "n": 4000055296 * 8 // NUM_BITS, # Größe des Datensatzes (4 Gigabyte); MUSS EIN VIELFACHES VON 65536 SEIN
      "n_inc": 65536, # Erhöhung des Wertes von n pro Periode; MUSS EIN VIELFACHES VON 65536 SEIN
                                        # mit epochtime=20000 ergibt sich ein Wachstum von 882 MB pro Jahr
      "cache_size": 2500, # Größe des Caches des Light-Clients (kann vom Light-
                                        # Client gewählt werden; nicht Teil der Algo-Spezifikation)
      "diff": 2**14, # Schwierigkeit (wird während der Blockauswertung angepasst)
      "epochtime": 100000, # Länge einer Epoche in Blöcken (wie oft der Datensatz aktualisiert wird)
      "k": 1, # Anzahl der Elternknoten eines Knotens
      "w": w, # Wird für modulares Exponentiations-Hashing verwendet
      "accesses": 200, # Anzahl der Datensatzzugriffe während Hashimoto
      "P": SAFE_PRIME_512 # Sichere Primzahl für Hashing und Zufallszahlengenerierung
}
```

In diesem Fall ist `P` eine Primzahl, die so gewählt wurde, dass `log₂(P)` nur geringfügig kleiner als 512 ist, was den 512 Bits entspricht, die wir zur Darstellung unserer Zahlen verwendet haben. Beachten Sie, dass nur die zweite Hälfte des DAG tatsächlich gespeichert werden muss, sodass der De-facto-RAM-Bedarf bei 1 GB beginnt und um 441 MB pro Jahr wächst.

### Dagger-Graphenerstellung {#dagger-graph-building}

Das Primitiv zur Erstellung des Dagger-Graphen ist wie folgt definiert:

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

Im Wesentlichen beginnt es einen Graphen als einzelnen Knoten, `sha3(seed)`, und fügt von dort aus sequenziell weitere Knoten basierend auf zufälligen vorherigen Knoten hinzu. Wenn ein neuer Knoten erstellt wird, wird eine modulare Potenz des Seeds berechnet, um zufällig einige Indizes kleiner als `i` auszuwählen (unter Verwendung von `x % i` oben), und die Werte der Knoten an diesen Indizes werden in einer Berechnung verwendet, um einen neuen Wert für `x` zu generieren, der dann in eine kleine Proof-of-Work-Funktion (basierend auf XOR) eingespeist wird, um letztendlich den Wert des Graphen am Index `i` zu generieren. Der Grund für dieses spezielle Design ist es, einen sequenziellen Zugriff auf den DAG zu erzwingen; der nächste Wert des DAG, auf den zugegriffen wird, kann erst bestimmt werden, wenn der aktuelle Wert bekannt ist. Schließlich hasht die modulare Exponentiation das Ergebnis weiter.

Dieser Algorithmus stützt sich auf mehrere Ergebnisse aus der Zahlentheorie. Siehe den Anhang unten für eine Diskussion.

## Light-Client-Auswertung {#light-client-evaluation}

Die obige Graphenkonstruktion zielt darauf ab, dass jeder Knoten im Graphen rekonstruiert werden kann, indem ein Teilbaum aus nur einer kleinen Anzahl von Knoten berechnet wird und nur eine geringe Menge an Hilfsspeicher benötigt wird. Beachten Sie, dass bei k=1 der Teilbaum nur eine Kette von Werten ist, die bis zum ersten Element im DAG reicht.

Die Light-Client-Berechnungsfunktion für den DAG funktioniert wie folgt:

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

Im Wesentlichen handelt es sich einfach um eine Umschreibung des obigen Algorithmus, die die Schleife zur Berechnung der Werte für den gesamten DAG entfernt und die frühere Knotensuche durch einen rekursiven Aufruf oder eine Cache-Suche ersetzt. Beachten Sie, dass für `k=1` der Cache unnötig ist, obwohl eine weitere Optimierung tatsächlich die ersten paar tausend Werte des DAG vorberechnet und diese als statischen Cache für Berechnungen bereithält; siehe den Anhang für eine Code-Implementierung davon.

## Doppelter Puffer von DAGs {#double-buffer}

In einem vollständigen Client wird ein [_doppelter Puffer_ (Double Buffer)](https://wikipedia.org/wiki/Multiple_buffering) von 2 DAGs verwendet, die durch die obige Formel erzeugt wurden. Die Idee ist, dass DAGs alle `epochtime` Anzahl von Blöcken gemäß den obigen Parametern erzeugt werden. Anstatt dass der Client den zuletzt erzeugten DAG verwendet, verwendet er den vorherigen. Der Vorteil davon ist, dass die DAGs im Laufe der Zeit ersetzt werden können, ohne dass ein Schritt integriert werden muss, bei dem Miner plötzlich alle Daten neu berechnen müssen. Andernfalls besteht die Gefahr einer abrupten vorübergehenden Verlangsamung der Chain-Verarbeitung in regelmäßigen Abständen und einer dramatisch zunehmenden Zentralisierung. Somit bestehen Risiken für einen 51-%-Angriff innerhalb dieser wenigen Minuten, bevor alle Daten neu berechnet sind.

Der Algorithmus, der verwendet wird, um den Satz von DAGs zu generieren, die zur Berechnung der Arbeit für einen Block verwendet werden, lautet wie folgt:

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
        # Kein Back-Buffer möglich, erstelle einfach einen Front-Buffer
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": 0}}
    else:
        return {"front": {"dag": produce_dag(params, seedset["front_hash"], dagsz),
                          "block_number": seedset["front_number"]},
                "back": {"dag": produce_dag(params, seedset["back_hash"], dagsz),
                         "block_number": seedset["back_number"]}}
```

## Hashimoto {#hashimoto}

Die Idee hinter dem ursprünglichen Hashimoto ist es, die Blockchain als Datensatz zu verwenden und eine Berechnung durchzuführen, die N Indizes aus der Blockchain auswählt, die Transaktionen an diesen Indizes sammelt, ein XOR dieser Daten durchführt und den Hash des Ergebnisses zurückgibt. Der ursprüngliche Algorithmus von Thaddeus Dryja, der aus Konsistenzgründen in Python übersetzt wurde, lautet wie folgt:

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

Obwohl Hashimoto als RAM-hart gilt, stützt es sich leider auf 256-Bit-Arithmetik, was einen erheblichen Rechenaufwand bedeutet. Dagger-Hashimoto verwendet jedoch nur die niedrigstwertigen 64 Bits bei der Indizierung seines Datensatzes, um dieses Problem zu beheben.

```python
def hashimoto(dag, dagsize, params, header, nonce):
    m = dagsize / 2
    mix = sha3(encode_int(nonce) + header)
    for _ in range(params["accesses"]):
        mix ^= dag[m + (mix % 2**64) % m]
    return dbl_sha3(mix)
```

Die Verwendung von Double-SHA3 ermöglicht eine Form der datenlosen, nahezu sofortigen Vorab-Verifizierung, bei der nur überprüft wird, ob ein korrekter Zwischenwert bereitgestellt wurde. Diese äußere Schicht des Proof-of-Work ist sehr ASIC-freundlich und ziemlich schwach, existiert aber, um DDoS noch schwieriger zu machen, da diese geringe Menge an Arbeit geleistet werden muss, um einen Block zu produzieren, der nicht sofort abgelehnt wird. Hier ist die Light-Client-Version:

```python
def quick_hashimoto(seed, dagsize, params, header, nonce):
    m = dagsize // 2
    mix = sha3(nonce + header)
    for _ in range(params["accesses"]):
        mix ^= quick_calc(params, seed, m + (mix % 2**64) % m)
    return dbl_sha3(mix)
```

## Mining und Verifizierung {#mining-and-verifying}

Lassen Sie uns nun alles im Mining-Algorithmus zusammenfassen:

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

Beachten Sie auch, dass Dagger-Hashimoto zusätzliche Anforderungen an den Block-Header stellt:

- Damit die zweischichtige Verifizierung funktioniert, muss ein Block-Header sowohl die Nonce als auch den mittleren Wert vor SHA3 enthalten.
- Irgendwo muss ein Block-Header den SHA3 des aktuellen Seed-Sets speichern.

## Weiterführende Literatur {#further-reading}

_Kennen Sie eine Community-Ressource, die Ihnen geholfen hat? Bearbeiten Sie diese Seite und fügen Sie sie hinzu!_

## Anhang {#appendix}

Wie oben angemerkt, stützt sich der für die DAG-Generierung verwendete RNG (Zufallszahlengenerator) auf einige Ergebnisse aus der Zahlentheorie. Erstens stellen wir sicher, dass der Lehmer-RNG, der die Basis für die Variable `picker` bildet, eine große Periode hat. Zweitens zeigen wir, dass `pow(x,3,P)` `x` nicht auf `1` oder `P-1` abbildet, vorausgesetzt, `x ∈ [2,P-2]` zu Beginn. Schließlich zeigen wir, dass `pow(x,3,P)` eine niedrige Kollisionsrate aufweist, wenn es als Hash-Funktion behandelt wird.

### Lehmer-Zufallszahlengenerator {#lehmer-random-number}

Während die Funktion `produce_dag` keine unverzerrten Zufallszahlen erzeugen muss, besteht eine potenzielle Bedrohung darin, dass `seed**i % P` nur eine Handvoll Werte annimmt. Dies könnte Minern, die das Muster erkennen, einen Vorteil gegenüber denjenigen verschaffen, die dies nicht tun.

Um dies zu vermeiden, wird auf ein Ergebnis aus der Zahlentheorie zurückgegriffen. Eine [_sichere Primzahl_ (Safe Prime)](https://en.wikipedia.org/wiki/Safe_prime) ist definiert als eine Primzahl `P`, bei der `(P-1)/2` ebenfalls eine Primzahl ist. Die _Ordnung_ eines Elements `x` der [multiplikativen Gruppe](https://en.wikipedia.org/wiki/Multiplicative_group_of_integers_modulo_n) `ℤ/nℤ` ist definiert als das minimale `m`, sodass <pre>xᵐ mod P ≡ 1</pre>
Unter Berücksichtigung dieser Definitionen haben wir:

> Beobachtung 1. Sei `x` ein Element der multiplikativen Gruppe `ℤ/Pℤ` für eine sichere Primzahl `P`. Wenn `x mod P ≠ 1 mod P` und `x mod P ≠ P-1 mod P`, dann ist die Ordnung von `x` entweder `P-1` oder `(P-1)/2`.

_Beweis_. Da `P` eine sichere Primzahl ist, gilt nach dem [Satz von Lagrange][lagrange], dass die Ordnung von `x` entweder `1`, `2`, `(P-1)/2` oder `P-1` ist.

Die Ordnung von `x` kann nicht `1` sein, da nach dem kleinen Satz von Fermat gilt:

<pre>x<sup>P-1</sup> mod P ≡ 1</pre>

Daher muss `x` eine multiplikative Identität von `ℤ/nℤ` sein, die eindeutig ist. Da wir angenommen haben, dass `x ≠ 1`, ist dies nicht möglich.

Die Ordnung von `x` kann nicht `2` sein, es sei denn, `x = P-1`, da dies verletzen würde, dass `P` eine Primzahl ist.

Aus der obigen Aussage können wir erkennen, dass die Iteration von `(picker * init) % P` eine Zykluslänge von mindestens `(P-1)/2` haben wird. Dies liegt daran, dass wir `P` als eine sichere Primzahl ausgewählt haben, die ungefähr einer höheren Zweierpotenz entspricht, und `init` im Intervall `[2,2**256+1]` liegt. Angesichts der Größe von `P` sollten wir niemals einen Zyklus aus der modularen Exponentiation erwarten.

Wenn wir die erste Zelle im DAG zuweisen (die Variable mit der Bezeichnung `init`), berechnen wir `pow(sha3(seed) + 2, 3, P)`. Auf den ersten Blick garantiert dies nicht, dass das Ergebnis weder `1` noch `P-1` ist. Da `P-1` jedoch eine sichere Primzahl ist, haben wir die folgende zusätzliche Sicherheit, die ein Korollar aus Beobachtung 1 ist:

> Beobachtung 2. Sei `x` ein Element der multiplikativen Gruppe `ℤ/Pℤ` für eine sichere Primzahl `P`, und sei `w` eine natürliche Zahl. Wenn `x mod P ≠ 1 mod P` und `x mod P ≠ P-1 mod P`, sowie `w mod P ≠ P-1 mod P` und `w mod P ≠ 0 mod P`, dann ist `xʷ mod P ≠ 1 mod P` und `xʷ mod P ≠ P-1 mod P`

### Modulare Exponentiation als Hash-Funktion {#modular-exponentiation}

Für bestimmte Werte von `P` und `w` kann die Funktion `pow(x, w, P)` viele Kollisionen aufweisen. Zum Beispiel nimmt `pow(x,9,19)` nur die Werte `{1,18}` an.

Da `P` eine Primzahl ist, kann ein geeignetes `w` für eine modulare Exponentiations-Hash-Funktion unter Verwendung des folgenden Ergebnisses ausgewählt werden:

> Beobachtung 3. Sei `P` eine Primzahl; `w` und `P-1` sind teilerfremd, wenn und nur wenn für alle `a` und `b` in `ℤ/Pℤ` gilt:<center>`aʷ mod P ≡ bʷ mod P` wenn und nur wenn `a mod P ≡ b mod P`</center>

Da `P` eine Primzahl ist und `w` teilerfremd zu `P-1` ist, gilt somit `|{pow(x, w, P) : x ∈ ℤ}| = P`, was impliziert, dass die Hash-Funktion die minimal mögliche Kollisionsrate aufweist.

In dem speziellen Fall, dass `P` eine sichere Primzahl ist, wie wir sie ausgewählt haben, hat `P-1` nur die Faktoren 1, 2, `(P-1)/2` und `P-1`. Da `P` > 7, wissen wir, dass 3 teilerfremd zu `P-1` ist, daher erfüllt `w=3` die obige Aussage.

## Effizienterer Cache-basierter Auswertungsalgorithmus {#cache-based-evaluation}

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