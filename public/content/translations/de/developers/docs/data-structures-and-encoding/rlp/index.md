---
title: Recursive-Length-Prefix-Serialisierung (RLP)
description: "Eine Definition der RLP-Codierung in der Ausführungsebene von Ethereum."
lang: de
sidebarDepth: 2
---

Die Recursive-Length-Prefix-Serialisierung (RLP) wird in den Ausführungs-Clients von Ethereum umfassend verwendet. RLP standardisiert die Datenübertragung zwischen Blockchain-Knoten in einem platzsparenden Format. Der Zweck von RLP besteht darin, beliebig verschachtelte Arrays von Binärdaten zu codieren, und RLP ist die primäre Codierungsmethode, die zur Serialisierung von Objekten in der Ausführungsebene von Ethereum verwendet wird. Der Hauptzweck von RLP ist die Codierung von Strukturen; mit Ausnahme von positiven Ganzzahlen (Integers) delegiert RLP die Codierung spezifischer Datentypen (z. B. Strings, Floats) an Protokolle höherer Ordnung. Positive Ganzzahlen müssen in Big-Endian-Binärform ohne führende Nullen dargestellt werden (wodurch der ganzzahlige Wert Null dem leeren Byte-Array entspricht). Deserialisierte positive Ganzzahlen mit führenden Nullen müssen von jedem Protokoll höherer Ordnung, das RLP verwendet, als ungültig behandelt werden.

Weitere Informationen finden Sie im [Ethereum Yellow Paper (Anhang B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Um RLP zur Codierung eines Wörterbuchs (Dictionary) zu verwenden, sind die beiden vorgeschlagenen kanonischen Formen:

- Verwendung von `[[k1,v1],[k2,v2]...]` mit Schlüsseln in lexikografischer Reihenfolge
- Verwendung der übergeordneten Patricia-Tree-Codierung, wie es [Ethereum](/) tut

## Definition {#definition}

Die RLP-Codierungsfunktion nimmt ein Element (Item) auf. Ein Element ist wie folgt definiert:

- ein String (d. h. ein Byte-Array) ist ein Element
- eine Liste von Elementen ist ein Element
- eine positive Ganzzahl ist ein Element

Zum Beispiel sind alle folgenden Dinge Elemente:

- ein leerer String;
- der String, der das Wort "cat" enthält;
- eine Liste, die eine beliebige Anzahl von Strings enthält;
- und komplexere Datenstrukturen wie `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- die Zahl `100`

Beachten Sie, dass im Kontext des Rests dieser Seite „String“ „eine bestimmte Anzahl von Bytes an Binärdaten“ bedeutet; es werden keine speziellen Codierungen verwendet und es wird kein Wissen über den Inhalt der Strings vorausgesetzt (außer wie durch die Regel gegen nicht-minimale positive Ganzzahlen gefordert).

Die RLP-Codierung ist wie folgt definiert:

- Eine positive Ganzzahl wird in das kürzeste Byte-Array umgewandelt, dessen Big-Endian-Interpretation die Ganzzahl ist, und dann gemäß den unten stehenden Regeln als String codiert.
- Für ein einzelnes Byte, dessen Wert im Bereich `[0x00, 0x7f]` (dezimal `[0, 127]`) liegt, ist dieses Byte seine eigene RLP-Codierung.
- Andernfalls, wenn ein String 0-55 Bytes lang ist, besteht die RLP-Codierung aus einem einzelnen Byte mit dem Wert **0x80** (dez. 128) plus der Länge des Strings, gefolgt vom String. Der Bereich des ersten Bytes ist somit `[0x80, 0xb7]` (dez. `[128, 183]`).
- Wenn ein String mehr als 55 Bytes lang ist, besteht die RLP-Codierung aus einem einzelnen Byte mit dem Wert **0xb7** (dez. 183) plus der Länge in Bytes der Länge des Strings in Binärform, gefolgt von der Länge des Strings, gefolgt vom String. Zum Beispiel würde ein 1024 Byte langer String als `\xb9\x04\x00` (dez. `185, 4, 0`) gefolgt vom String codiert werden. Hier ist `0xb9` (183 + 2 = 185) das erste Byte, gefolgt von den 2 Bytes `0x0400` (dez. 1024), die die Länge des eigentlichen Strings angeben. Der Bereich des ersten Bytes ist somit `[0xb8, 0xbf]` (dez. `[184, 191]`).
- Wenn ein String 2^64 Bytes lang oder länger ist, darf er nicht codiert werden.
- Wenn die gesamten Nutzdaten (Payload) einer Liste (d. h. die kombinierte Länge aller ihrer RLP-codierten Elemente) 0-55 Bytes lang sind, besteht die RLP-Codierung aus einem einzelnen Byte mit dem Wert **0xc0** plus der Länge der Nutzdaten, gefolgt von der Verkettung der RLP-Codierungen der Elemente. Der Bereich des ersten Bytes ist somit `[0xc0, 0xf7]` (dez. `[192, 247]`).
- Wenn die gesamten Nutzdaten einer Liste mehr als 55 Bytes lang sind, besteht die RLP-Codierung aus einem einzelnen Byte mit dem Wert **0xf7** plus der Länge in Bytes der Länge der Nutzdaten in Binärform, gefolgt von der Länge der Nutzdaten, gefolgt von der Verkettung der RLP-Codierungen der Elemente. Der Bereich des ersten Bytes ist somit `[0xf8, 0xff]` (dez. `[248, 255]`).

In Kurzform:

| Bereich     | Byte 1     | Byte 2     | ...        | Byte 9                | Byte 10    | Bedeutung                                 |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | Einzel-Byte-String                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | kurzer String (0-55 Bytes)                |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | langer String, N+1 Bytes für Länge, dann Nutzdaten |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | kurze Liste (0-55 Bytes)                  |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | lange Liste, N+1 Bytes für Länge, dann Nutzdaten |

- `p` = Nutzdaten (Payload)
- `n` = Länge (Anzahl der Nutzdaten-Bytes)
- `N` = Länge-der-Länge-Offset (N+1 `n` Bytes folgen)

Im Code sieht das so aus:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Beispiele {#examples}

- der String "dog" = [ 0x83, 'd', 'o', 'g' ]
- die Liste [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- der leere String ('null') = `[ 0x80 ]`
- die leere Liste = `[ 0xc0 ]`
- die Ganzzahl 0 = `[ 0x80 ]`
- das Byte '\x00' = `[ 0x00 ]`
- das Byte '\x0f' = `[ 0x0f ]`
- die Bytes '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- die [mengentheoretische Darstellung](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) von drei, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- der String "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## RLP-Decodierung {#rlp-decoding}

Gemäß den Regeln und dem Prozess der RLP-Codierung wird die Eingabe der RLP-Decodierung als ein Array von Binärdaten betrachtet. Der RLP-Decodierungsprozess läuft wie folgt ab:

1.  Anhand des ersten Bytes (d. h. des Präfixes) der Eingabedaten werden der Datentyp, die Länge der eigentlichen Daten und der Offset decodiert;

2.  Anhand des Typs und des Offsets der Daten werden die Daten entsprechend decodiert, wobei die minimale Codierungsregel für positive Ganzzahlen beachtet wird;

3.  Fahren Sie mit der Decodierung des Rests der Eingabe fort;

Dabei lauten die Regeln für die Decodierung von Datentypen und Offsets wie folgt:

1.  Die Daten sind ein String, wenn der Bereich des ersten Bytes (d. h. des Präfixes) [0x00, 0x7f] ist, und der String ist exakt das erste Byte selbst;

2.  Die Daten sind ein String, wenn der Bereich des ersten Bytes [0x80, 0xb7] ist, und der String, dessen Länge gleich dem ersten Byte minus 0x80 ist, folgt auf das erste Byte;

3.  Die Daten sind ein String, wenn der Bereich des ersten Bytes [0xb8, 0xbf] ist, und die Länge des Strings, dessen Länge in Bytes gleich dem ersten Byte minus 0xb7 ist, folgt auf das erste Byte, und der String folgt auf die Länge des Strings;

4.  Die Daten sind eine Liste, wenn der Bereich des ersten Bytes [0xc0, 0xf7] ist, und die Verkettung der RLP-Codierungen aller Elemente der Liste, deren gesamte Nutzdaten gleich dem ersten Byte minus 0xc0 sind, folgt auf das erste Byte;

5.  Die Daten sind eine Liste, wenn der Bereich des ersten Bytes [0xf8, 0xff] ist, und die gesamten Nutzdaten der Liste, deren Länge gleich dem ersten Byte minus 0xf7 ist, folgen auf das erste Byte, und die Verkettung der RLP-Codierungen aller Elemente der Liste folgt auf die gesamten Nutzdaten der Liste;

Im Code sieht das so aus:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Weiterführende Literatur {#further-reading}

- [RLP in Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum under the hood: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Verwandte Themen {#related-topics}

- [Patricia Merkle Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)