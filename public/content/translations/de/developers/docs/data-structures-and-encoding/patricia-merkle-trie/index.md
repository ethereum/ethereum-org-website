---
title: Merkle-Patricia-Trie
description: Einführung in den Merkle-Patricia-Trie.
lang: de
sidebarDepth: 2
---

Der Zustand von [Ethereum](/) (die Gesamtheit aller Konten, Salden und Smart Contracts) ist in einer speziellen Version der Datenstruktur kodiert, die in der Informatik allgemein als Merkle-Baum bekannt ist. Diese Struktur ist für viele Anwendungen in der Kryptographie nützlich, da sie eine überprüfbare Beziehung zwischen all den einzelnen Datenstücken herstellt, die im Baum miteinander verflochten sind. Dies führt zu einem einzigen **Wurzel**-Wert (Root), der verwendet werden kann, um Dinge über die Daten zu beweisen.

Die Datenstruktur von Ethereum ist ein „modifizierter Merkle-Patricia-Trie“. Er wird so genannt, weil er einige Merkmale von PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) entlehnt und weil er für den effizienten Datenabruf (re**trie**val) von Elementen konzipiert ist, die den Zustand von Ethereum ausmachen.

Ein Merkle-Patricia-Trie ist deterministisch und kryptographisch verifizierbar: Der einzige Weg, eine Zustandswurzel (State Root) zu generieren, besteht darin, sie aus jedem einzelnen Teil des Zustands zu berechnen. Dass zwei Zustände identisch sind, lässt sich leicht beweisen, indem man den Wurzel-Hash und die Hashes, die zu ihm geführt haben, vergleicht (_ein Merkle-Beweis_). Umgekehrt gibt es keine Möglichkeit, zwei verschiedene Zustände mit demselben Wurzel-Hash zu erstellen, und jeder Versuch, den Zustand mit anderen Werten zu ändern, führt zu einem anderen Wurzel-Hash des Zustands. Theoretisch bietet diese Struktur den „heiligen Gral“ der `O(log(n))`-Effizienz für Einfügungen, Suchvorgänge und Löschungen.

In naher Zukunft plant Ethereum die Migration zu einer [Verkle-Baum](/roadmap/verkle-trees)-Struktur, was viele neue Möglichkeiten für zukünftige Protokollverbesserungen eröffnen wird.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, wäre es hilfreich, über Grundkenntnisse zu [Hashes](https://en.wikipedia.org/wiki/Hash_function), [Merkle-Bäumen](https://en.wikipedia.org/wiki/Merkle_tree), [Tries](https://en.wikipedia.org/wiki/Trie) und [Serialisierung](https://en.wikipedia.org/wiki/Serialization) zu verfügen. Dieser Artikel beginnt mit einer Beschreibung eines grundlegenden [Radix-Baums](https://en.wikipedia.org/wiki/Radix_tree) und führt dann schrittweise die Modifikationen ein, die für die optimiertere Datenstruktur von Ethereum erforderlich sind.

## Grundlegende Radix-Tries {#basic-radix-tries}

In einem grundlegenden Radix-Trie sieht jeder Knoten wie folgt aus:

```
[i_0, i_1 ... i_n, value]
```

Wobei `i_0 ... i_n` die Symbole des Alphabets (oft binär oder hexadezimal) darstellen, `value` der Endwert am Knoten ist und die Werte in den `i_0, i_1 ... i_n`-Slots entweder `NULL` oder Zeiger auf (in unserem Fall Hashes von) andere Knoten sind. Dies bildet einen grundlegenden `(key, value)`-Speicher.

Angenommen, Sie möchten eine Radix-Baum-Datenstruktur verwenden, um eine Reihenfolge über eine Menge von Schlüssel-Wert-Paaren zu persistieren. Um den Wert zu finden, der aktuell dem Schlüssel `dog` im Trie zugeordnet ist, würden Sie zunächst `dog` in Buchstaben des Alphabets umwandeln (was `64 6f 67` ergibt) und dann den Trie entlang dieses Pfades hinabsteigen, bis Sie den Wert finden. Das heißt, Sie beginnen damit, den Wurzel-Hash in einer flachen Schlüssel/Wert-Datenbank nachzuschlagen, um den Wurzelknoten des Tries zu finden. Er wird als Array von Schlüsseln dargestellt, die auf andere Knoten zeigen. Sie würden den Wert am Index `6` als Schlüssel verwenden und ihn in der flachen Schlüssel/Wert-Datenbank nachschlagen, um den Knoten eine Ebene tiefer zu erhalten. Dann wählen Sie den Index `4`, um den nächsten Wert nachzuschlagen, dann den Index `6` und so weiter, bis Sie, nachdem Sie dem Pfad `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` gefolgt sind, den Wert des Knotens nachschlagen und das Ergebnis zurückgeben.

Es gibt einen Unterschied zwischen dem Nachschlagen von etwas im „Trie“ und der zugrunde liegenden flachen Schlüssel/Wert-„Datenbank“. Beide definieren Schlüssel/Wert-Anordnungen, aber die zugrunde liegende Datenbank kann ein traditionelles 1-Schritt-Nachschlagen eines Schlüssels durchführen. Das Nachschlagen eines Schlüssels im Trie erfordert mehrere Nachschlagevorgänge in der zugrunde liegenden Datenbank, um zu dem oben beschriebenen Endwert zu gelangen. Lassen Sie uns Letzteres als `path` bezeichnen, um Unklarheiten zu beseitigen.

Die Aktualisierungs- und Löschoperationen für Radix-Tries können wie folgt definiert werden:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Ein „Merkle“-Radix-Baum wird aufgebaut, indem Knoten mithilfe deterministisch generierter kryptographischer Hash-Werte verknüpft werden. Diese inhaltsbasierte Adressierung (in der Schlüssel/Wert-Datenbank `key == keccak256(rlp(value))`) bietet eine kryptographische Integritätsgarantie für die gespeicherten Daten. Wenn der Wurzel-Hash eines bestimmten Tries öffentlich bekannt ist, kann jeder mit Zugriff auf die zugrunde liegenden Blattdaten einen Beweis konstruieren, dass der Trie einen bestimmten Wert an einem bestimmten Pfad enthält, indem er die Hashes jedes Knotens bereitstellt, die einen bestimmten Wert mit der Baumwurzel verbinden.

Es ist für einen Angreifer unmöglich, einen Beweis für ein `(path, value)`-Paar zu liefern, das nicht existiert, da der Wurzel-Hash letztendlich auf allen darunterliegenden Hashes basiert. Jede zugrunde liegende Änderung würde den Wurzel-Hash verändern. Sie können sich den Hash als eine komprimierte Darstellung struktureller Informationen über die Daten vorstellen, die durch den Urbild-Schutz (Pre-Image Resistance) der Hashing-Funktion gesichert ist.

Wir bezeichnen eine atomare Einheit eines Radix-Baums (z. B. ein einzelnes Hex-Zeichen oder eine 4-Bit-Binärzahl) als „Nibble“. Während man einen Pfad Nibble für Nibble durchläuft, wie oben beschrieben, können Knoten maximal auf 16 Kinder verweisen, enthalten aber ein `value`-Element. Wir stellen sie daher als ein Array der Länge 17 dar. Wir nennen diese 17-Element-Arrays „Zweigknoten“ (Branch Nodes).

## Merkle-Patricia-Trie {#merkle-patricia-trees}

Radix-Tries haben eine große Einschränkung: Sie sind ineffizient. Wenn Sie eine `(path, value)`-Bindung speichern möchten, bei der der Pfad, wie bei Ethereum, 64 Zeichen lang ist (die Anzahl der Nibbles in `bytes32`), benötigen wir über ein Kilobyte zusätzlichen Speicherplatz, um eine Ebene pro Zeichen zu speichern, und jedes Nachschlagen oder Löschen wird die vollen 64 Schritte in Anspruch nehmen. Der im Folgenden vorgestellte Patricia-Trie löst dieses Problem.

### Optimierung {#optimization}

Ein Knoten in einem Merkle-Patricia-Trie ist eines der folgenden Elemente:

1.  `NULL` (dargestellt als leere Zeichenfolge)
2.  `branch` Ein 17-Element-Knoten `[ v0 ... v15, vt ]`
3.  `leaf` Ein 2-Element-Knoten `[ encodedPath, value ]`
4.  `extension` Ein 2-Element-Knoten `[ encodedPath, key ]`

Bei 64 Zeichen langen Pfaden ist es unvermeidlich, dass Sie nach dem Durchlaufen der ersten paar Ebenen des Tries einen Knoten erreichen, an dem zumindest für einen Teil des Weges nach unten kein abweichender Pfad existiert. Um zu vermeiden, dass bis zu 15 spärliche `NULL`-Knoten entlang des Pfades erstellt werden müssen, kürzen wir den Abstieg ab, indem wir einen `extension`-Knoten der Form `[ encodedPath, key ]` einrichten, wobei `encodedPath` den „Teilpfad“ enthält, um vorzuspringen (unter Verwendung einer unten beschriebenen kompakten Kodierung), und der `key` für das nächste Nachschlagen in der Datenbank dient.

Für einen `leaf`-Knoten, der durch ein Flag im ersten Nibble des `encodedPath` markiert werden kann, kodiert der Pfad alle Pfadfragmente der vorherigen Knoten und wir können den `value` direkt nachschlagen.

Diese obige Optimierung führt jedoch zu Mehrdeutigkeiten.

Wenn wir Pfade in Nibbles durchlaufen, kann es vorkommen, dass wir eine ungerade Anzahl von Nibbles durchlaufen müssen, aber da alle Daten im `bytes`-Format gespeichert werden, ist es nicht möglich, beispielsweise zwischen dem Nibble `1` und den Nibbles `01` zu unterscheiden (beide müssen als `<01>` gespeichert werden). Um eine ungerade Länge anzugeben, wird dem Teilpfad ein Flag vorangestellt.

### Spezifikation: Kompakte Kodierung einer Hex-Sequenz mit optionalem Terminator {#specification}

Die Markierung sowohl der _ungeraden vs. geraden verbleibenden Teilpfadlänge_ als auch des _Blatt- vs. Erweiterungsknotens_ (Leaf vs. Extension Node), wie oben beschrieben, befindet sich im ersten Nibble des Teilpfads jedes 2-Element-Knotens. Sie führen zu Folgendem:

| Hex-Zeichen | Bits | Knotentyp (Teilpfad) | Pfadlänge |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | Erweiterung        | gerade      |
| 1        | 0001 | Erweiterung        | ungerade    |
| 2        | 0010 | terminierend (Blatt)| gerade      |
| 3        | 0011 | terminierend (Blatt)| ungerade    |

Bei einer geraden verbleibenden Pfadlänge (`0` oder `2`) folgt immer ein weiteres `0`-„Padding“-Nibble (Füll-Nibble).

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray hat nun eine gerade Länge, deren erstes Nibble die Flags sind.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Beispiele:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Hier ist der erweiterte Code zum Abrufen eines Knotens im Merkle-Patricia-Trie:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Beispiel-Trie {#example-trie}

Angenommen, wir möchten einen Trie, der vier Pfad/Wert-Paare enthält: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Zuerst konvertieren wir sowohl Pfade als auch Werte in `bytes`. Unten werden die tatsächlichen Byte-Darstellungen für _Pfade_ durch `<>` gekennzeichnet, obwohl _Werte_ zum leichteren Verständnis weiterhin als Zeichenfolgen angezeigt werden, gekennzeichnet durch `''` (auch sie wären eigentlich `bytes`):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Nun bauen wir einen solchen Trie mit den folgenden Schlüssel/Wert-Paaren in der zugrunde liegenden Datenbank auf:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Wenn ein Knoten innerhalb eines anderen Knotens referenziert wird, ist das, was eingefügt wird, `keccak256(rlp.encode(node))`, falls `len(rlp.encode(node)) >= 32`, andernfalls `node`, wobei `rlp.encode` die [RLP](/developers/docs/data-structures-and-encoding/rlp)-Kodierungsfunktion ist.

Beachten Sie, dass man beim Aktualisieren eines Tries das Schlüssel/Wert-Paar `(keccak256(x), x)` in einer persistenten Lookup-Tabelle speichern muss, _wenn_ der neu erstellte Knoten eine Länge >= 32 hat. Wenn der Knoten jedoch kürzer ist, muss man nichts speichern, da die Funktion f(x) = x umkehrbar ist.

## Tries in Ethereum {#tries-in-ethereum}

Alle Merkle-Tries in der Ausführungsschicht von Ethereum verwenden einen Merkle-Patricia-Trie.

Aus einem Block-Header stammen 3 Wurzeln von 3 dieser Tries.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Zustands-Trie {#state-trie}

Es gibt einen globalen Zustands-Trie, und er wird jedes Mal aktualisiert, wenn ein Client einen Block verarbeitet. Darin ist ein `path` immer: `keccak256(ethereumAddress)` und ein `value` ist immer: `rlp(ethereumAccount)`. Genauer gesagt ist ein Ethereum-`account` ein 4-Element-Array aus `[nonce,balance,storageRoot,codeHash]`. An dieser Stelle ist es erwähnenswert, dass diese `storageRoot` die Wurzel eines weiteren Patricia-Tries ist:

### Speicher-Trie {#storage-trie}

Im Speicher-Trie befinden sich _alle_ Vertragsdaten. Es gibt einen separaten Speicher-Trie für jedes Konto. Um Werte an bestimmten Speicherpositionen bei einer gegebenen Adresse abzurufen, werden die Speicheradresse, die ganzzahlige Position der gespeicherten Daten im Speicher und die Block-ID benötigt. Diese können dann als Argumente an die in der JSON-RPC-API definierte `eth_getStorageAt` übergeben werden, z. B. um die Daten im Speicher-Slot 0 für die Adresse `0x295a70b2de5e3953354a6a8344e616ed314d7251` abzurufen:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Das Abrufen anderer Elemente im Speicher ist etwas aufwendiger, da die Position im Speicher-Trie zunächst berechnet werden muss. Die Position wird als `keccak256`-Hash der Adresse und der Speicherposition berechnet, die beide links mit Nullen auf eine Länge von 32 Bytes aufgefüllt werden. Zum Beispiel ist die Position für die Daten im Speicher-Slot 1 für die Adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298`:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

In einer Geth-Konsole kann dies wie folgt berechnet werden:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Der `path` ist daher `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Dies kann nun verwendet werden, um die Daten wie zuvor aus dem Speicher-Trie abzurufen:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Hinweis: Die `storageRoot` für ein Ethereum-Konto ist standardmäßig leer, wenn es sich nicht um ein Contract-Konto handelt.

### Transaktions-Trie {#transaction-trie}

Es gibt einen separaten Transaktions-Trie für jeden Block, der wiederum `(key, value)`-Paare speichert. Ein Pfad hier ist: `rlp(transactionIndex)`, was den Schlüssel darstellt, der einem Wert entspricht, der bestimmt wird durch:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Weitere Informationen hierzu finden Sie in der Dokumentation zu [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Transaktionsbeleg-Trie {#receipts-trie}

Jeder Block hat seinen eigenen Transaktionsbeleg-Trie. Ein `path` hier ist: `rlp(transactionIndex)`. `transactionIndex` ist sein Index innerhalb des Blocks, in den er aufgenommen wurde. Der Transaktionsbeleg-Trie wird niemals aktualisiert. Ähnlich wie beim Transaktions-Trie gibt es aktuelle und Legacy-Transaktionsbelege. Um einen bestimmten Transaktionsbeleg im Transaktionsbeleg-Trie abzufragen, werden der Index der Transaktion in ihrem Block, die Nutzdaten (Payload) des Transaktionsbelegs und der Transaktionstyp benötigt. Der zurückgegebene Transaktionsbeleg kann vom Typ `Receipt` sein, der als Verkettung von `TransactionType` und `ReceiptPayload` definiert ist, oder er kann vom Typ `LegacyReceipt` sein, der als `rlp([status, cumulativeGasUsed, logsBloom, logs])` definiert ist.

Weitere Informationen hierzu finden Sie in der Dokumentation zu [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Weiterführende Literatur {#further-reading}

- [Modifizierter Merkle-Patricia-Trie – Wie Ethereum einen Zustand speichert](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Den Ethereum-Trie verstehen](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)