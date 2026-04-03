---
title: Simple serialize
description: "Erklärung des SSZ-Formats von Ethereum."
lang: de
sidebarDepth: 2
---

**Simple Serialize (SSZ)** ist die Serialisierungsmethode, die auf der Beacon Chain verwendet wird. Sie ersetzt die RLP-Serialisierung, die auf der Ausführungsebene verwendet wird, überall auf der Konsensebene, mit Ausnahme des Peer-Discovery-Protokolls. Um mehr über die RLP-Serialisierung zu erfahren, siehe [Recursive-Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ ist so konzipiert, dass es deterministisch ist und sich effizient merkelisieren lässt. Man kann sich SSZ als aus zwei Komponenten bestehend vorstellen: einem Serialisierungsschema und einem Merkelisierungsschema, das so konzipiert ist, dass es effizient mit der serialisierten Datenstruktur arbeitet.

## Wie funktioniert SSZ? {#how-does-ssz-work}

### Serialisierung {#serialization}

SSZ ist ein Serialisierungsschema, das nicht selbsterklärend ist – vielmehr stützt es sich auf ein Schema, das im Voraus bekannt sein muss. Das Ziel der SSZ-Serialisierung ist es, Objekte beliebiger Komplexität als Byte-Strings darzustellen. Dies ist ein sehr einfacher Prozess für „Basistypen“. Das Element wird einfach in hexadezimale Bytes umgewandelt. Zu den Basistypen gehören:

- vorzeichenlose Ganzzahlen (unsigned integers)
- boolesche Werte (Booleans)

Für komplexe „zusammengesetzte“ Typen ist die Serialisierung komplizierter, da der zusammengesetzte Typ mehrere Elemente enthält, die unterschiedliche Typen oder unterschiedliche Größen oder beides haben können. Wenn diese Objekte alle feste Längen haben (d. h. die Größe der Elemente ist unabhängig von ihren tatsächlichen Werten immer konstant), ist die Serialisierung einfach eine Umwandlung jedes Elements im zusammengesetzten Typ, geordnet in Little-Endian-Byte-Strings. Diese Byte-Strings werden zusammengefügt. Das serialisierte Objekt hat die Bytelisten-Darstellung der Elemente mit fester Länge in derselben Reihenfolge, in der sie im deserialisierten Objekt erscheinen.

Bei Typen mit variablen Längen werden die tatsächlichen Daten durch einen „Offset“-Wert an der Position dieses Elements im serialisierten Objekt ersetzt. Die tatsächlichen Daten werden einem Heap am Ende des serialisierten Objekts hinzugefügt. Der Offset-Wert ist der Index für den Beginn der tatsächlichen Daten im Heap und fungiert als Zeiger auf die relevanten Bytes.

Das folgende Beispiel veranschaulicht, wie das Offsetting für einen Container mit Elementen sowohl fester als auch variabler Länge funktioniert:

```rust

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

`serialized` hätte die folgende Struktur (hier nur auf 4 Bits aufgefüllt, in der Realität auf 32 Bits aufgefüllt, und die `int`-Darstellung wird der Übersichtlichkeit halber beibehalten):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

der Übersichtlichkeit halber auf mehrere Zeilen aufgeteilt:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Dies ist immer noch eine Vereinfachung – die Ganzzahlen und Nullen in den obigen Schemata wären eigentlich gespeicherte Bytelisten, wie hier:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Die tatsächlichen Werte für Typen mit variabler Länge werden also in einem Heap am Ende des serialisierten Objekts gespeichert, wobei ihre Offsets an den richtigen Positionen in der geordneten Liste der Felder gespeichert werden.

Es gibt auch einige Sonderfälle, die eine spezifische Behandlung erfordern, wie z. B. der Typ `BitList`, bei dem während der Serialisierung eine Längenbegrenzung hinzugefügt und bei der Deserialisierung entfernt werden muss. Vollständige Details sind in der [SSZ-Spezifikation](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md) verfügbar.

### Deserialisierung {#deserialization}

Um dieses Objekt zu deserialisieren, wird das <b>Schema</b> benötigt. Das Schema definiert das genaue Layout der serialisierten Daten, sodass jedes spezifische Element aus einem Byte-Blob in ein sinnvolles Objekt deserialisiert werden kann, bei dem die Elemente den richtigen Typ, Wert, die richtige Größe und Position haben. Es ist das Schema, das dem Deserialisierer mitteilt, welche Werte tatsächliche Werte und welche Offsets sind. Alle Feldnamen verschwinden, wenn ein Objekt serialisiert wird, werden aber bei der Deserialisierung gemäß dem Schema wieder instanziiert.

Siehe [ssz.dev](https://www.ssz.dev/overview) für eine interaktive Erklärung dazu.

## Merkelisierung {#merkleization}

Dieses SSZ-serialisierte Objekt kann dann merkelisiert werden – das heißt, in eine Merkle-Baum-Darstellung derselben Daten umgewandelt werden. Zunächst wird die Anzahl der 32-Byte-Blöcke im serialisierten Objekt bestimmt. Dies sind die „Blätter“ (Leaves) des Baums. Die Gesamtzahl der Blätter muss eine Zweierpotenz sein, damit das gemeinsame Hashen der Blätter schließlich eine einzige Hash-Baum-Wurzel (Hash-Tree-Root) ergibt. Wenn dies von Natur aus nicht der Fall ist, werden zusätzliche Blätter hinzugefügt, die 32 Bytes an Nullen enthalten. Schematisch dargestellt:

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

Es gibt auch Fälle, in denen sich die Blätter des Baums nicht von Natur aus so gleichmäßig verteilen wie im obigen Beispiel. Zum Beispiel könnte Blatt 4 ein Container mit mehreren Elementen sein, die zusätzliche „Tiefe“ erfordern, die dem Merkle-Baum hinzugefügt werden muss, wodurch ein ungleichmäßiger Baum entsteht.

Anstatt diese Baumelemente als Blatt X, Knoten X usw. zu bezeichnen, können wir ihnen verallgemeinerte Indizes geben, beginnend mit Wurzel = 1 und von links nach rechts entlang jeder Ebene zählend. Dies ist der oben erklärte verallgemeinerte Index. Jedes Element in der serialisierten Liste hat einen verallgemeinerten Index, der gleich `2**depth + idx` ist, wobei idx seine nullbasierte Position im serialisierten Objekt ist und die Tiefe (depth) die Anzahl der Ebenen im Merkle-Baum ist, die als Zweierlogarithmus der Anzahl der Elemente (Blätter) bestimmt werden kann.

## Verallgemeinerte Indizes {#generalized-indices}

Ein verallgemeinerter Index ist eine Ganzzahl, die einen Knoten in einem binären Merkle-Baum darstellt, wobei jeder Knoten einen verallgemeinerten Index `2 ** depth + index in row` hat.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Diese Darstellung liefert einen Knotenindex für jedes Datenelement im Merkle-Baum.

## Multiproofs {#multiproofs}

Die Bereitstellung der Liste der verallgemeinerten Indizes, die ein bestimmtes Element darstellen, ermöglicht es uns, es gegen die Hash-Baum-Wurzel zu verifizieren. Diese Wurzel ist unsere akzeptierte Version der Realität. Alle Daten, die uns zur Verfügung gestellt werden, können gegen diese Realität verifiziert werden, indem sie an der richtigen Stelle in den Merkle-Baum eingefügt werden (bestimmt durch ihren verallgemeinerten Index) und beobachtet wird, dass die Wurzel konstant bleibt. Es gibt Funktionen in der Spezifikation [hier](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs), die zeigen, wie man die minimale Menge an Knoten berechnet, die erforderlich ist, um den Inhalt einer bestimmten Menge von verallgemeinerten Indizes zu verifizieren.

Um beispielsweise Daten im Index 9 im untenstehenden Baum zu verifizieren, benötigen wir den Hash der Daten an den Indizes 8, 9, 5, 3, 1.
Der Hash von (8,9) sollte gleich dem Hash (4) sein, der mit 5 gehasht wird, um 2 zu erzeugen, was wiederum mit 3 gehasht wird, um die Baumwurzel 1 zu erzeugen. Wenn für 9 falsche Daten bereitgestellt würden, würde sich die Wurzel ändern – wir würden dies erkennen und den Zweig nicht verifizieren können.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Weiterführende Literatur {#further-reading}

- [Upgrading Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Upgrading Ethereum: Merkelisierung](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ-Implementierungen](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ-Rechner](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)