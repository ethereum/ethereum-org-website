---
title: Simple Serialize
description: "Erklärung des SSZ-Formats von Ethereum."
lang: de
sidebarDepth: 2
---

**Simple Serialize (SSZ)** ist die Serialisierungsmethode, die auf der Beacon Chain verwendet wird. Sie ersetzt die RLP-Serialisierung, die auf der Ausführungsschicht verwendet wird, überall in der Konsensschicht, mit Ausnahme des Peer-Erkennungsprotokolls. Um mehr über die RLP-Serialisierung zu erfahren, siehe [Recursive-Length Prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ ist so konzipiert, dass es deterministisch ist und sich effizient in einen Merkle-Baum umwandeln lässt (merkleisieren). Man kann sich SSZ als aus zwei Komponenten bestehend vorstellen: einem Serialisierungsschema und einem Merkleisierungs-Schema, das darauf ausgelegt ist, effizient mit der serialisierten Datenstruktur zu arbeiten.

## Wie funktioniert SSZ? {#how-does-ssz-work}

### Serialisierung {#serialization}

SSZ ist ein Serialisierungsschema, das nicht selbsterklärend ist – vielmehr stützt es sich auf ein Schema, das im Voraus bekannt sein muss. Das Ziel der SSZ-Serialisierung ist es, Objekte beliebiger Komplexität als Byte-Strings darzustellen. Dies ist ein sehr einfacher Prozess für „Basistypen“. Das Element wird einfach in hexadezimale Bytes umgewandelt. Zu den Basistypen gehören:

- Vorzeichenlose Ganzzahlen (unsigned integers)
- Boolesche Werte

Für komplexe „zusammengesetzte“ Typen ist die Serialisierung komplizierter, da der zusammengesetzte Typ mehrere Elemente enthält, die unterschiedliche Typen oder unterschiedliche Größen oder beides haben können. Wenn diese Objekte alle feste Längen haben (d. h. die Größe der Elemente ist unabhängig von ihren tatsächlichen Werten immer konstant), ist die Serialisierung einfach eine Umwandlung jedes Elements im zusammengesetzten Typ, geordnet in Little-Endian-Byte-Strings. Diese Byte-Strings werden zusammengefügt. Das serialisierte Objekt weist die Byte-Listen-Darstellung der Elemente mit fester Länge in derselben Reihenfolge auf, in der sie im deserialisierten Objekt erscheinen.

Bei Typen mit variablen Längen werden die tatsächlichen Daten durch einen „Offset“-Wert an der Position dieses Elements im serialisierten Objekt ersetzt. Die tatsächlichen Daten werden einem Heap am Ende des serialisierten Objekts hinzugefügt. Der Offset-Wert ist der Index für den Beginn der tatsächlichen Daten im Heap und fungiert als Zeiger auf die relevanten Bytes.

Das folgende Beispiel veranschaulicht, wie das Offsetting für einen Container mit sowohl festen als auch variablen Längenelementen funktioniert:

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

`serialized` hätte die folgende Struktur (hier nur auf 4 Bits aufgefüllt, in der Realität auf 32 Bits aufgefüllt, wobei die Darstellung `int` der Übersichtlichkeit halber beibehalten wird):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   Nummer 1      Nummer 2   Offset für    Nummer 3    Wert für
                              Vektor                   Vektor
```

der Übersichtlichkeit halber auf mehrere Zeilen aufgeteilt:

```
[
  37, 0, 0, 0,  # Little-Endian-Codierung von `number1`.
  55, 0, 0, 0,  # Little-Endian-Codierung von `number2`.
  16, 0, 0, 0,  # Der „Offset“, der angibt, wo der Wert von `vector` beginnt (Little-Endian 16).
  22, 0, 0, 0,  # Little-Endian-Codierung von `number3`.
  1, 2, 3, 4,   # Die tatsächlichen Werte in `vector`.
]
```

Dies ist immer noch eine Vereinfachung – die Ganzzahlen und Nullen in den obigen Schemata wären in Wirklichkeit gespeicherte Byte-Listen, wie hier:

```
[
  10100101000000000000000000000000  # Little-Endian-Codierung von `number1`
  10110111000000000000000000000000  # Little-Endian-Codierung von `number2`.
  10010000000000000000000000000000  # Der „Offset“, der angibt, wo der Wert von `vector` beginnt (Little-Endian 16).
  10010110000000000000000000000000  # Little-Endian-Codierung von `number3`.
  10000001100000101000001110000100   # Der tatsächliche Wert des Feldes `bytes`.
]
```

Die tatsächlichen Werte für Typen mit variabler Länge werden also in einem Heap am Ende des serialisierten Objekts gespeichert, wobei ihre Offsets an den richtigen Positionen in der geordneten Liste der Felder gespeichert werden.

Es gibt auch einige Sonderfälle, die eine spezifische Behandlung erfordern, wie z. B. der Typ `BitList`, bei dem während der Serialisierung eine Längenbegrenzung hinzugefügt und bei der Deserialisierung entfernt werden muss. Alle Details finden Sie in der [SSZ-Spezifikation](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

Um dieses Objekt zu deserialisieren, wird das <b>Schema</b> benötigt. Das Schema definiert das genaue Layout der serialisierten Daten, sodass jedes spezifische Element aus einem Blob von Bytes in ein sinnvolles Objekt deserialisiert werden kann, bei dem die Elemente den richtigen Typ, Wert, die richtige Größe und Position haben. Das Schema teilt dem Deserialisierer mit, welche Werte tatsächliche Werte und welche Offsets sind. Alle Feldnamen verschwinden, wenn ein Objekt serialisiert wird, werden aber bei der Deserialisierung gemäß dem Schema wiederhergestellt.
## Merkleisierung {#merkleization}

Dieses SSZ-serialisierte Objekt kann dann merkleisiert werden – das heißt, in eine Merkle-Baum-Darstellung derselben Daten umgewandelt werden. Zunächst wird die Anzahl der 32-Byte-Blöcke im serialisierten Objekt bestimmt. Dies sind die „Blätter“ des Baumes. Die Gesamtzahl der Blätter muss eine Zweierpotenz sein, damit das gemeinsame Hashing der Blätter schließlich eine einzige Hash-Baum-Wurzel ergibt. Wenn dies von Natur aus nicht der Fall ist, werden zusätzliche Blätter hinzugefügt, die 32 Bytes an Nullen enthalten. Schematisch dargestellt:

```
Hash-Baum-Wurzel
            /     \
           /       \
          /         \
         /           \
   Hash der Blätter Hash der Blätter
       1 und 2          3 und 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 Blatt1    Blatt2 Blatt3    Blatt4
```

Es gibt auch Fälle, in denen sich die Blätter des Baumes nicht von Natur aus so gleichmäßig verteilen wie im obigen Beispiel. Zum Beispiel könnte Blatt 4 ein Container mit mehreren Elementen sein, die zusätzliche „Tiefe“ erfordern, die dem Merkle-Baum hinzugefügt werden muss, wodurch ein ungleichmäßiger Baum entsteht.

Anstatt diese Baumelemente als Blatt X, Knoten X usw. zu bezeichnen, können wir ihnen verallgemeinerte Indizes geben, beginnend mit Wurzel = 1 und von links nach rechts auf jeder Ebene zählend. Dies ist der oben erklärte verallgemeinerte Index. Jedes Element in der serialisierten Liste hat einen verallgemeinerten Index gleich `2**depth + idx`, wobei idx seine nullbasierte Position im serialisierten Objekt ist und die Tiefe die Anzahl der Ebenen im Merkle-Baum ist, die als Zweierlogarithmus der Anzahl der Elemente (Blätter) bestimmt werden kann.

## Verallgemeinerte Indizes {#generalized-indices}

Ein verallgemeinerter Index ist eine Ganzzahl, die einen Knoten in einem binären Merkle-Baum darstellt, in dem jeder Knoten einen verallgemeinerten Index `2 ** depth + index in row` hat.

```
1           --Tiefe = 0  2**0 + 0 = 1
    2       3       --Tiefe = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --Tiefe = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Diese Darstellung liefert einen Knoten-Index für jedes Datenelement im Merkle-Baum.

## Multiproofs {#multiproofs}

Die Bereitstellung der Liste der verallgemeinerten Indizes, die ein bestimmtes Element darstellen, ermöglicht es uns, es gegen die Hash-Baum-Wurzel zu verifizieren. Diese Wurzel ist unsere akzeptierte Version der Realität. Alle uns zur Verfügung gestellten Daten können gegen diese Realität verifiziert werden, indem sie an der richtigen Stelle in den Merkle-Baum eingefügt werden (bestimmt durch ihren verallgemeinerten Index) und beobachtet wird, dass die Wurzel konstant bleibt. Es gibt [hier](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) Funktionen in der Spezifikation, die zeigen, wie die minimale Menge an Knoten berechnet wird, die erforderlich ist, um den Inhalt einer bestimmten Menge von verallgemeinerten Indizes zu verifizieren.

Um beispielsweise Daten in Index 9 im untenstehenden Baum zu verifizieren, benötigen wir den Hash der Daten an den Indizes 8, 9, 5, 3, 1.
Der Hash von (8,9) sollte gleich dem Hash (4) sein, der mit 5 gehasht wird, um 2 zu erzeugen, was wiederum mit 3 gehasht wird, um die Baumwurzel 1 zu erzeugen. Wenn für 9 falsche Daten bereitgestellt würden, würde sich die Wurzel ändern – wir würden dies erkennen und den Zweig nicht verifizieren können.

```
* = Daten, die zur Generierung des Beweises erforderlich sind

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

- [Upgrading Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Upgrading Ethereum: Merkleisierung](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [SSZ-Implementierungen](https://github.com/ethereum/consensus-specs/issues/2138)
- [SSZ-Rechner](https://simpleserialize.com/)
