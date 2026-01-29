---
title: Einfache Serialisierung
description: "Erklärung des SSZ Formats von Ethereum."
lang: de
sidebarDepth: 2
---

**Simple Serialize (SSZ)** ist die Serialisierungsmethode, die auf der Beacon Chain verwendet wird. Es ersetzt die auf der Ausführungsebene verwendete RLP Serialisierung überall auf der Konsensebene mit Ausnahme des Peer-Discovery Protokolls. Weitere Informationen zur RLP-Serialisierung findest du unter [Recursive-Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ ist so konzipiert, dass es deterministisch ist und sich auch effizient Merkleize lässt. Man kann sich SSZ als aus zwei Komponenten bestehend vorstellen: einem Serialisierungs Schema und einem Merkleisierungs Schema, das für die effiziente Arbeit mit der serialisierten Datenstruktur konzipiert ist.

## Wie funktioniert SSZ? {#how-does-ssz-work}

### Serialisierung {#serialization}

SSZ ist ein Serialisierungs Schema, das nicht selbstbeschreibend ist, sondern auf einem Schema basiert, das im Voraus bekannt sein muss. Das Ziel der SSZ Serialisierung besteht darin, Objekte beliebiger Komplexität als Bytefolgen darzustellen. Für „Basistypen“ ist dies ein sehr einfacher Vorgang. Das Element wird einfach in hexadezimale Bytes umgewandelt. Zu den Grundtypen gehören:

- Vorzeichenlose Ganzzahlen
- Boolesche Werte

Bei komplexen „zusammengesetzten“ Typen ist die Serialisierung komplizierter, da der zusammengesetzte Typ mehrere Elemente enthält, die unterschiedliche Typen oder unterschiedliche Größen oder beides haben können. Wenn diese Objekte alle eine feste Länge haben (d. h. die Größe der Elemente ist unabhängig von ihren tatsächlichen Werten immer konstant), ist die Serialisierung einfach eine Konvertierung jedes Elements im zusammengesetzten Typ in der entsprechenden Reihenfolge in Little-Endian-Bytestrings. Diese Byte Strings werden zusammengefügt. Das serialisierte Objekt verfügt über die Byte Listendarstellung der Elemente mit fester Länge in derselben Reihenfolge, in der sie im deserialisierten Objekt erscheinen.

Bei Typen mit variabler Länge werden die tatsächlichen Daten durch einen „Offset“-Wert an der Position dieses Elements im serialisierten Objekt ersetzt. Die eigentlichen Daten werden am Ende des serialisierten Objekts zu einem Haufen hinzugefügt. Der Offsetwert ist der Index für den Beginn der eigentlichen Daten im Haufen und fungiert als Zeiger auf die relevanten Bytes.

Das folgende Beispiel veranschaulicht, wie der Ausgleich für einen Container mit Elementen fester und variabler Länge funktioniert:

```Rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` hätte die folgende Struktur (hier nur auf 4 Bit aufgefüllt, in Wirklichkeit auf 32 Bit, wobei die `int`-Darstellung zur Verdeutlichung beibehalten wird):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2     Offset für    number3     Wert für
                              vector                   vector

```

Zur besseren Übersichtlichkeit auf mehrere Zeilen aufgeteilt:

```
[
  37, 0, 0, 0,  # Little-Endian-Kodierung von `number1`.
  55, 0, 0, 0,  # Little-Endian-Kodierung von `number2`.
  16, 0, 0, 0,  # Der „Offset“, der anzeigt, wo der Wert von `vector` beginnt (Little-Endian 16).
  22, 0, 0, 0,  # Little-Endian-Kodierung von `number3`.
  1, 2, 3, 4,   # Die tatsächlichen Werte in `vector`.
]
```

Dies ist immer noch eine Vereinfachung – die Ganzzahlen und Nullen in den obigen Schemata würden tatsächlich als Byte listen gespeichert, etwa so:

```
[
  10100101000000000000000000000000  # Little-Endian-Kodierung von `number1`
  10110111000000000000000000000000  # Little-Endian-Kodierung von `number2`.
  10010000000000000000000000000000  # Der „Offset“, der anzeigt, wo der Wert von `vector` beginnt (Little-Endian 16).
  10010110000000000000000000000000  # Little-Endian-Kodierung von `number3`.
  10000001100000101000001110000100   # Der tatsächliche Wert des `bytes`-Feldes.
]
```

Daher werden die tatsächlichen Werte für Typen mit variabler Länge in einem Haufen am Ende des serialisierten Objekts gespeichert, wobei ihre Offsets an den richtigen Positionen in der geordneten Liste der Felder gespeichert werden.

Es gibt auch einige Sonderfälle, die eine besondere Behandlung erfordern, wie z. B. der Typ `BitList`, bei dem während der Serialisierung eine Längenbegrenzung hinzugefügt und während der Deserialisierung entfernt werden muss. Alle Details findest du in der [SSZ-Spezifikation](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Deserialisierung {#deserialization}

Zum Deseria lisieren dieses Objekts ist das <b>Schema</b> erforderlich. Das Schema definiert das genaue Layout der serialisierten Daten, sodass jedes spezifische Element aus einem Byte Klecks in ein aussagekräftiges Objekt deserialisiert werden kann, wobei die Elemente den richtigen Typ, Wert, die richtige Größe und Position haben. Das Schema teilt dem Deserialisierer mit, welche Werte tatsächliche Werte und welche Offsets sind. Alle Feldnamen verschwinden, wenn ein Objekt serialisiert wird, werden aber bei der Deserialisierung gemäß dem Schema neu instanziiert.

Eine interaktive Erklärung dazu findest du auf [ssz.dev](https://www.ssz.dev/overview).

## Merkleisierung {#merkleization}

Dieses SSZ Serialisierte Objekt kann dann merkleisiert werden, d. h. in eine Merkle Baum Darstellung derselben Daten umgewandelt werden. Zunächst wird die Anzahl der 32-Byte-Blöcke im serialisierten Objekt ermittelt. Dies sind die „Blätter“ des Baumes. Die Gesamtzahl der Blätter muss eine Zweierpotenz sein, damit das Zusammenführen der Blätter schließlich eine einzelne Hash-Baum-Wurzel ergibt. Wenn dies nicht von Natur aus der Fall ist, werden zusätzliche Blätter mit 32 Bytes Nullen hinzugefügt. Schematisch.

```
        Hash-Baumwurzel
            /     \
           /       \
          /         \
         /           \
   Hash der Blätter  Hash der Blätter
     1 und 2           3 und 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 Blatt1    Blatt2   Blatt3    Blatt4
```

Es gibt auch Fälle, in denen die Blätter des Baumes nicht von Natur aus gleichmäßig verteilt sind, wie im obigen Beispiel. Beispielsweise könnte Blatt 4 ein Container mit mehreren Elementen sein, die dem Merkle Baum zusätzliche „Tiefe“ hinzufügen müssen, wodurch ein ungleichmäßiger Baum entsteht.

Anstatt diese Baumelemente als Blatt X, Knoten X usw. zu bezeichnen, können wir ihnen verallgemeinerte Indizes zuweisen, beginnend mit Wurzel = 1 und von links nach rechts entlang jeder Ebene zählend. Dies ist der oben Erläuterte verallgemeinerte Index. Jedes Element in der serialisierten Liste hat einen verallgemeinerten Index gleich `2**depth + idx`, wobei idx seine nullindizierte Position im serialisierten Objekt und die Tiefe die Anzahl der Ebenen im Merkle-Baum ist, die als Logarithmus zur Basis zwei der Anzahl der Elemente (Blätter) bestimmt werden kann.

## Verallgemeinerte Indizes {#generalized-indices}

Ein verallgemeinerter Index ist eine Ganzzahl, die einen Node in einem binären Merkle-Baum darstellt, wobei jeder Node einen verallgemeinerten Index von `2 ** depth + index in row` hat.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Diese Darstellung ergibt einen Knotenindex für jedes Datenelement im Merkle Baum.

## Multiproofs {#multiproofs}

Durch die Bereitstellung der Liste verallgemeinerter Indizes, die ein bestimmtes Element darstellen, können wir es anhand der Hash-Baum-Wurzel überprüfen. Diese Wurzel ist unsere akzeptierte Version der Realität. Alle uns zur Verfügung gestellten Daten können anhand dieser Realität überprüft werden, indem sie an der richtigen Stelle im Merkle Baum eingefügt werden (bestimmt durch seinen verallgemeinerten Index) und beobachtet wird, dass die Wurzel konstant bleibt. In der Spezifikation findest du [hier](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) Funktionen, die zeigen, wie die minimale Menge an Nodes berechnet wird, die benötigt wird, um den Inhalt einer bestimmten Menge verallgemeinerter Indizes zu verifizieren.

Um beispielsweise Daten im Index 9 im folgenden Baum zu überprüfen, benötigen wir den Hash der Daten an den Indizes 8, 9, 5, 3, 1.
Der Hash von (8,9) sollte dem Hash (4) entsprechen, der mit 5 gehasht wird, um 2 zu erzeugen, das mit 3 gehasht wird, um die Baumwurzel 1 zu erzeugen. Wenn für 9 falsche Daten angegeben würden, würde sich die Wurzel ändern – wir würden dies erkennen und den Zweig nicht überprüfen.

```
* = Daten, die zur Erzeugung des Proofs erforderlich sind

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Weiterführende Lektüre {#further-reading}

- [Ethereum upgraden: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Ethereum upgraden: Merkleisierung](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ-Implementierungen](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ-Rechner](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
