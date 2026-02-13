---
title: Merkle Patricia Trie
description: "Einführung in Merkle Patricia Trie."
lang: de
sidebarDepth: 2
---

Der Zustand von Ethereum (die Gesamtheit aller Konten, Guthaben und Smart Contracts) wird in eine spezielle Version der Datenstruktur kodiert, die in der Informatik allgemein als Hash-Baum bekannt ist. Diese Datenstruktur ist für viele Anwendungen in der Kryptografie nützlich, da sie eine überprüfbare Beziehung zwischen allen einzelnen Daten im Baum herstellt, was zu einem einzigen **Wurzel**-Wert führt, der verwendet werden kann, um Aussagen über die Daten zu beweisen.

Die Datenstruktur von Ethereum ist ein „modifizierter Merkle-Patricia-Trie“. Der Name rührt daher, dass sie einige Merkmale von PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) übernimmt und für einen effizienten Datenabruf (re**trie**val) von Elementen konzipiert ist, die den Ethereum-Zustand ausmachen.

Ein Merkle-Patricia-Trie ist deterministisch und kryptografisch verifizierbar: Die einzige Möglichkeit, eine Zustandswurzel zu erzeugen, besteht darin, sie aus jedem einzelnen Teil des Zustands zu berechnen. Zwei identische Zustände lassen sich leicht nachweisen, indem man den Root-Hash und die Hashes, die zu ihm geführt haben, vergleicht (_ein Merkle-Beweis_). Umgekehrt gibt es keine Möglichkeit, zwei verschiedene Zustände mit demselben Root-Hash zu erstellen, jeder Versuch, einen Zustand mit anderen Werten zu ändern, führt zu einem anderen Stamm-Hash. Theoretisch bietet diese Struktur den „heiligen Gral“ der `O(log(n))`-Effizienz für Einfügungen, Suchvorgänge und Löschungen.

In naher Zukunft plant Ethereum die Migration zu einer [Verkle-Tree](/roadmap/verkle-trees)-Struktur, die viele neue Möglichkeiten für zukünftige Protokollverbesserungen eröffnen wird.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, sind Grundkenntnisse über [Hashes](https://en.wikipedia.org/wiki/Hash_function), [Merkle-Bäume](https://en.wikipedia.org/wiki/Merkle_tree), [Tries](https://en.wikipedia.org/wiki/Trie) und [Serialisierung](https://en.wikipedia.org/wiki/Serialization) hilfreich. Dieser Artikel beginnt mit einer Beschreibung eines einfachen [Radix-Baums](https://en.wikipedia.org/wiki/Radix_tree) und führt dann schrittweise die für die optimierte Datenstruktur von Ethereum notwendigen Änderungen ein.

## Einfache Radix-Tries {#basic-radix-tries}

Bei einem Basic Radix Trie sieht jede Node wie folgt aus:

```
    [i_0, i_1 ... i_n, value]
```

Wobei `i_0 ...` i_n`die Symbole des Alphabets (oft binär oder hexadezimal) darstellen,`value`der Endwert am Knoten ist und die Werte in den`i_0, i_1 ...` i_n`-Slots entweder `NULL` oder Zeiger auf (in unserem Fall, Hashes von) andere Knoten sind. Dies bildet einen einfachen `(Key, Value)`-Speicher.

Stell dir vor, du möchtest eine Radix-Trie-Datenstruktur nutzen, um die Reihenfolge eines Sets von Key-Value-Paarten dauerhaft zu speichern. Um den Wert zu finden, der dem Key `dog` im Trie zugeordnet ist, wandeln Sie zuerst `dog` in Buchstaben des Alphabets um (was `64 6f 67` ergibt) und steigen dann diesem Pfad folgend den Trie hinab, bis Sie den Wert finden. Das heißt, Sie beginnen mit der Suche nach dem Stamm-Hash in einer flachen Schlüssel-/Wert-Datenbank, um den Stammknoten des trie zu finden. Es wird als Array von Schlüsseln dargestellt, die auf andere Knoten verweisen. Sie würden den Wert am Index `6` als Key verwenden und ihn in der flachen Key/Value-DB nachschlagen, um den Knoten eine Ebene tiefer zu erhalten. Dann wählen Sie Index `4`, um den nächsten Wert nachzuschlagen, dann Index `6` und so weiter, bis Sie, nachdem Sie dem Pfad gefolgt sind: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, den Wert des Knotens nachschlagen und das Ergebnis zurückgeben.

Es besteht ein Unterschied zwischen der Suche im „Trie“ und der zugrunde liegenden flachen Schlüssel /Wert-„DB“. Beide definieren Schlüssel /Wertanordnungen, aber die zugrunde liegende Datenbank kann eine herkömmliche einstufige Suche nach einem Schlüssel durchführen. Das Nachschlagen eines Schlüssels im Trie erfordert mehrere zugrunde liegende DB Suchvorgänge, um zum oben beschriebenen Endwert zu gelangen. Bezeichnen wir Letzteres als `path`, um Mehrdeutigkeiten zu vermeiden.

Die Aktualisierungs- und Löschvorgänge für radix tries können wie folgt definiert werden:

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

Ein "Merkle" Radix taum wird durch die Verknüpfung von Knoten mithilfe deterministisch generierter kryptografischer Hash Verdaut erstellt. Diese Inhaltsadressierung (in der Key/Value-DB `key == keccak256(rlp(value))`) bietet eine kryptografische Integritätsgarantie der gespeicherten Daten. Wenn der Stamm Hash eines bestimmten Tries öffentlich bekannt ist, kann jeder mit Zugriff auf die zugrunde liegenden Blattdaten einen Beweis dafür erstellen, dass der Trie einen bestimmten Wert an einem bestimmten Pfad enthält, indem er die Hashes jedes Knotens bereitstellt, der einen bestimmten Wert mit der Baumwurzel verbindet.

Es ist für einen Angreifer unmöglich, einen Beweis für ein `(path, value)`-Paar zu erbringen, das nicht existiert, da der Root-Hash letztendlich auf allen darunter liegenden Hashes basiert. Jede zugrunde liegende Änderung würde den Root Hash ändern. Sie können sich den Hash als komprimierte Darstellung struktureller Informationen über die Daten vorstellen, die durch den pre-Image Schutz der Hashing Funktion gesichert sind.

Wir bezeichnen eine atomare Einheit eines Radix-Baums (z. B. ein einzelnes Hex-Zeichen oder eine 4-Bit-Binärzahl) als "Nibble". Beim Durchlaufen eines Pfads, jeweils ein Nibble nach dem anderen, wie oben beschrieben, können Knoten auf maximal 16 untergeordnete Elemente verweisen, aber ein `value`-Element enthalten. Wir stellen sie daher als Array der Länge 17 dar. Wir nennen diese 17-element Arrays "Zweig Knoten“.

## Merkle-Patricia-Trie {#merkle-patricia-trees}

Radix tries haben eine große Einschränkung: Sie sind ineffizient. Wenn Sie eine `(path, value)`-Bindung speichern möchten, bei der der Pfad wie in Ethereum 64 Zeichen lang ist (die Anzahl der Nibbles in `bytes32`), benötigen wir über ein Kilobyte zusätzlichen Speicherplatz, um eine Ebene pro Zeichen zu speichern, und jede Suche oder Löschung wird die vollen 64 Schritte benötigen. Der im Folgenden vorgestellte Patricia Trie löst dieses Problem.

### Optimierung {#optimization}

Ein Knoten in einem Merkle Patricia Trie ist einer der folgenden:

1. `NULL` (dargestellt als leere Zeichenfolge)
2. `branch` Ein 17-elementiger Knoten `[ v0 ...` v15, vt ]`
3. `leaf` Ein 2-elementiger Knoten `[ encodedPath, value ]`
4. `extension` Ein 2-elementiger Knoten `[ encodedPath, key ]`

Bei 64 Zeichenpfaden ist es unvermeidlich, dass Sie nach dem Durchlaufen der ersten paar Schichten des trie einen Knoten erreichen, an dem zumindest für einen Teil des Weges kein abweichender Pfad vorhanden ist. Um die Erstellung von bis zu 15 dünn besetzten `NULL`-Knoten entlang des Pfads zu vermeiden, kürzen wir den Abstieg ab, indem wir einen `extension`-Knoten der Form `[ encodedPath, key ]` einrichten, wobei `encodedPath` den "Teilpfad" zum Überspringen enthält (unter Verwendung einer unten beschriebenen kompakten Kodierung) und der `key` für die nächste DB-Suche dient.

Bei einem `leaf`-Knoten, der durch ein Flag im ersten Nibble des `encodedPath` markiert werden kann, kodiert der Pfad alle Pfadfragmente des vorherigen Knotens, und wir können den `value` direkt nachschlagen.

Die obige Optimierung führt jedoch zu Mehrdeutigkeiten.

Wenn Pfade in Nibbles durchlaufen werden, kann es sein, dass eine ungerade Anzahl von Nibbles zu durchlaufen ist, aber da alle Daten im `bytes`-Format gespeichert sind. Es ist nicht möglich, beispielsweise zwischen dem Nibble `1` und den Nibbles `01` zu unterscheiden (beide müssen als `<01>` gespeichert werden). Um eine ungerade Länge anzugeben, wird dem Teilpfad ein Flagge vorangestellt.

### Spezifikation: Kompakte Kodierung einer Hex-Sequenz mit optionalem Terminator {#specification}

Die Kennzeichnung von sowohl _ungerader vs. gerader verbleibender Teilpfadlänge_ als auch _leaf- vs. extension-Knoten_ befindet sich, wie oben beschrieben, im ersten Nibble des Teilpfads eines jeden 2-elementigen Knotens. Sie führen zu Folgendem:

| Hex Zeichen | Bits | Knotentyp teilweise                 | Pfadlänge |
| ----------- | ---- | ----------------------------------- | --------- |
| 0           | 0000 | Verlängerung                        | sogar     |
| 1           | 0001 | Verlängerung                        | seltsam   |
| 2           | 0010 | beendend (Blatt) | sogar     |
| 3           | 0011 | beendend (Blatt) | seltsam   |

Bei einer geraden verbleibenden Pfadlänge (`0` oder `2`) folgt immer ein weiteres `0`-"Padding"-Nibble.

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
        # hexarray hat jetzt eine gerade Länge, dessen erstes Nibble die Flags sind.
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

Hier ist der erweiterte Code zum Abrufen eines Knotens im Merkle Patricia Trie:

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

Nehmen wir an, wir wollen einen Trie, der vier Pfad/Wert-Paare enthält: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Zuerst konvertieren wir sowohl Pfade als auch Werte in `bytes`. Unten werden die tatsächlichen Byte-Darstellungen für _Pfade_ mit `<>` gekennzeichnet, obwohl die _Werte_ zum leichteren Verständnis immer noch als Strings, gekennzeichnet durch `''`, dargestellt werden (auch sie wären eigentlich `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Nun bauen wir einen solchen Trie mit den folgenden Key-Value-Paaren in der zugrundeliegenden Datenbank auf:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Wenn ein Knoten innerhalb eines anderen Knotens referenziert wird, wird `keccak256(rlp.encode(node))` eingefügt, falls `len(rlp.encode(node)) >= 32`, ansonsten `node`, wobei `rlp.encode` die [RLP](/developers/docs/data-structures-and-encoding/rlp)-Kodierungsfunktion ist.

Beachten Sie, dass beim Aktualisieren eines Tries das Key/Value-Paar `(keccak256(x), x)` in einer persistenten Lookup-Tabelle gespeichert werden muss, _wenn_ der neu erstellte Knoten eine Länge >= 32 hat. Allerdings entfällt die Speicherpflicht, falls der Node kürzer ist. Der Grund dafür ist, dass die Funktion f(x) = x umkehrbar ist.

## Tries in Ethereum {#tries-in-ethereum}

Sämtliche Merkle-Tries im Execution Layer von Ethereum sind als Merkle-Patricia-Trie implementiert.

Der Block Header beinhaltet 3 Roots, von denen jede aus einem dieser 3 Tries stammt.

1. State-Root
2. Transactions-Root
3. Receipts-Root

### Zustands-Trie {#state-trie}

Es existiert nur ein globaler State-Trie, dessen Aktualisierung jedes Mal erfolgt, wenn ein Client einen Block verarbeitet. Darin ist ein `path` immer: `keccak256(ethereumAddress)` und ein `value` immer: `rlp(ethereumAccount)`. Genauer gesagt ist ein Ethereum-`account` ein 4-elementiges Array: `[nonce,balance,storageRoot,codeHash]`. An dieser Stelle ist es erwähnenswert, dass dieser `storageRoot` die Wurzel eines weiteren Patricia-Tries ist:

### Speicher-Trie {#storage-trie}

Im Speicher-Trie befinden sich _alle_ Vertragsdaten. Für jedes Konto gibt es einen separaten Speicherbereich. Um Werte an bestimmten Speicherpositionen an einer bestimmten Adresse abzurufen, werden die Speicheradresse, die ganzzahlige Position der gespeicherten Daten im Speicher und die Block-ID benötigt. Diese können dann als Argumente an die in der JSON-RPC-API definierte Funktion `eth_getStorageAt` übergeben werden, z. B. um die Daten im Speicherslot 0 für die Adresse `0x295a70b2de5e3953354a6a8344e616ed314d7251` abzurufen:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Das Abrufen anderer Elemente im Speicher ist etwas komplizierter, da zuerst die Position im Speicher Trie berechnet werden muss. Die Position wird als `keccak256`-Hash der Adresse und der Speicherposition berechnet, wobei beide links mit Nullen auf eine Länge von 32 Bytes aufgefüllt werden. Die Position für die Daten im Speicherslot 1 für die Adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298` lautet zum Beispiel:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

In einer Geth Konsole kann dies wie folgt berechnet werden:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Der `path` ist daher `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Damit können nun wie bisher die Daten aus dem Speicher abgerufen werden:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Hinweis: Der `storageRoot` für ein Ethereum-Konto ist standardmäßig leer, wenn es sich nicht um ein Vertragskonto handelt.

### Transaktions-Trie {#transaction-trie}

Für jeden Block gibt es einen separaten Transaktions-Trie, der wiederum `(key, value)`-Paare speichert. Ein Pfad ist hier: `rlp(transactionIndex)`. Dies stellt den Key dar, der einem Wert entspricht, der bestimmt wird durch:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Weitere Informationen dazu finden Sie in der [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718)-Dokumentation.

### Beleg-Trie {#receipts-trie}

Jeder Block hat seinen eigenen Belegversuch. Ein `path` ist hier: `rlp(transactionIndex)`. `transactionIndex` ist sein Index innerhalb des Blocks, in dem es enthalten war. Der Beleg Trie wird nie aktualisiert. Ähnlich wie beim Transaktionsverzeichnis gibt es aktuelle und alte Belege. Um eine bestimmte Quittung im Quittungs Trie abzufragen, werden der Index der Transaktion in ihrem Block, die Quittungsnutzlast und der Transaktionstyp benötigt. Der zurückgegebene Beleg kann vom Typ `Receipt` sein, der als Verkettung von `TransactionType` und `ReceiptPayload` definiert ist, oder er kann vom Typ `LegacyReceipt` sein, der als `rlp([status, cumulativeGasUsed, logsBloom, logs])` definiert ist.

Weitere Informationen dazu finden Sie in der [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718)-Dokumentation.

## Weiterführende Lektüre {#further-reading}

- [Modifizierter Merkle-Patricia-Trie — Wie Ethereum einen Zustand speichert](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Den Ethereum-Trie verstehen](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
