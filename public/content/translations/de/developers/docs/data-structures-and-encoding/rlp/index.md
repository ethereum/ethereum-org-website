---
title: RLP Serialisierung (Recursive Length Prefix)
description: "Eine Definition der RLP-Kodierung in der Ausführungsschicht von Ethereum."
lang: de
sidebarDepth: 2
---

Die Serialisierung mit rekursivem Längenpräfix (RLP) wird in den Ausführungsclients von Ethereum häufig verwendet. RLP standardisiert die Datenübertragung zwischen Knoten in einem platzsparenden Format. Der Zweck von RLP besteht darin, beliebig verschachtelte Arrays binärer Daten zu kodieren, und RLP ist die primäre Kodierungsmethode, die zum Serialisieren von Objekten in der Ausführungsschicht von Ethereum verwendet wird. Der Hauptzweck von RLP ist die Kodierung von Strukturen; mit Ausnahme von positiven Ganzzahlen delegiert RLP die Kodierung bestimmter Datentypen (z. B. Zeichenfolgen, Gleitkommazahlen) an Protokolle höherer Ordnung. Positive Ganzzahlen müssen im Big Endian Binärformat ohne führende Nullen dargestellt werden (wodurch der Ganzzahlwert Null dem leeren Byte-Array entspricht). Deserialisierte positive Ganzzahlen mit führenden Nullen müssen von jedem höherstufigen Protokoll, das RLP verwendet, als ungültig behandelt werden.

Weitere Informationen im [Ethereum Yellow Paper (Anhang B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Um RLP zum Kodieren eines Wörterbuchs zu verwenden, werden folgende zwei kanonische Formen vorgeschlagen:

- Verwenden Sie `[[k1,v1],[k2,v2]...]` mit Schlüsseln in lexikografischer Reihenfolge
- Verwenden Sie die höherstufige Patricia Tree Kodierung wie Ethereum

## Definition {#definition}

Die RLPB Kodierungsfunktion nimmt ein Element auf. Ein Artikel wird wie folgt definiert:

- eine Zeichenfolge (d. h. ein Byte-Array) ist ein Element
- eine Liste von Elementen ist ein Element
- eine positive ganze Zahl ist ein Element

Zu den folgenden Elementen zählen beispielsweise alle:

- eine leere Zeichenfolge;
- die Zeichenfolge, die das Wort „Katze“ enthält;
- eine Liste mit einer beliebigen Anzahl von Zeichenfolgen;
- und komplexere Datenstrukturen wie `["Katze", ["Welpe", "Kuh"], "Pferd", [[]], "Schwein", [""], "Schaf"]`.
- die Zahl `100`

Beachten Sie, dass im Kontext der restlichen Seite „Zeichenfolge“ „eine bestimmte Anzahl von Bytes binärer Daten“ bedeutet. Es werden keine speziellen Kodierungen verwendet und es wird kein Wissen über den Inhalt der Zeichenfolgen vorausgesetzt (außer wie von der Regel gegen nicht-minimale positive Ganzzahlen gefordert).

Die RLP-Kodierung ist wie folgt definiert:

- Bei einer positiven Ganzzahl wird diese in das kürzeste Byte-Array konvertiert, dessen groß endian Interpretation die Ganzzahl ist, und dann gemäß den folgenden Regeln als Zeichenfolge codiert.
- Für ein einzelnes Byte, dessen Wert im Bereich `[0x00, 0x7f]` (dezimal `[0, 127]`) liegt, ist dieses Byte seine eigene RLP-Kodierung.
- Andernfalls, wenn eine Zeichenfolge 0-55 Bytes lang ist, besteht die RLP-Kodierung aus einem einzelnen Byte mit dem Wert **0x80** (Dez. 128) plus der Länge der Zeichenfolge, gefolgt von der Zeichenfolge. Der Bereich des ersten Bytes ist somit `[0x80, 0xb7]` (Dez. `[128, 183]`).
- Wenn eine Zeichenfolge mehr als 55 Bytes lang ist, besteht die RLP-Kodierung aus einem einzelnen Byte mit dem Wert **0xb7** (Dez. 183) plus der Länge der Länge der Zeichenfolge in Bytes in Binärform, gefolgt von der Länge der Zeichenfolge, gefolgt von der Zeichenfolge. Beispielsweise würde eine 1024 Byte lange Zeichenfolge als `\xb9\x04\x00` (Dez. `185, 4, 0`) gefolgt von der Zeichenfolge kodiert. Dabei ist `0xb9` (183 + 2 = 185) das erste Byte, gefolgt von den 2 Bytes `0x0400` (Dez. 1024), die die Länge des eigentlichen Strings angeben. Der Bereich des ersten Bytes ist somit `[0xb8, 0xbf]` (Dez. `[184, 191]`).
- Wenn eine Zeichenfolge 2^64 Bytes oder länger ist, wird sie möglicherweise nicht codiert.
- Wenn die Gesamtnutzlast einer Liste (d. h. die kombinierte Länge all ihrer RLP-kodierten Elemente) 0-55 Bytes lang ist, besteht die RLP-Kodierung aus einem einzelnen Byte mit dem Wert **0xc0** plus der Länge der Nutzlast, gefolgt von der Verkettung der RLP-Kodierungen der Elemente. Der Bereich des ersten Bytes ist somit `[0xc0, 0xf7]` (Dez. `[192, 247]`).
- Wenn die Gesamtnutzlast einer Liste mehr als 55 Bytes lang ist, besteht die RLP-Kodierung aus einem einzelnen Byte mit dem Wert **0xf7** plus der Länge der Länge der Nutzlast in Bytes in Binärform, gefolgt von der Länge der Nutzlast, gefolgt von der Verkettung der RLP-Kodierungen der Elemente. Der Bereich des ersten Bytes ist somit `[0xf8, 0xff]` (Dez. `[248, 255]`).

Im Code lautet dies:

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
    raise Exception("Eingabe zu lang")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Beispiele {#examples}

- die Zeichenfolge "Hund = [ 0x83, 'd', 'o', 'g' ]
- die Liste [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- die leere Zeichenfolge ('null') = `[ 0x80 ]`
- die leere Liste = `[ 0xc0 ]`
- die Ganzzahl 0 = `[ 0x80 ]`
- das Byte `\\x00` = `[ 0x00 ]`
- das Byte `\\x0f` = `[ 0x0f ]`
- die Bytes `\\x04\\x00` = `[ 0x82, 0x04, 0x00 ]`
- die [mengentheoretische Darstellung](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) von drei, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- die Zeichenfolge "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` `, 'e', 'l', 'i', 't' ]`

## RLP-Dekodierung {#rlp-decoding}

Gemäß den Regeln und dem Verfahren der RLP Kodierung wird der Eingang der RLP Dekodierung als ein Array binärer Daten betrachtet. Der RLP Decodierung Verfahren läuft wie folgt ab:

1. entsprechend dem ersten Byte (d. h. Präfix) der Eingabedaten und Dekodierung des Datentyps, der Länge der tatsächlichen Daten und des Offsets;

2. Dekodieren Sie die Daten entsprechend dem Typ und Offset der Daten und beachten Sie dabei die minimale Codierung Regel für positive Ganzzahlen;

3. Fahren Sie mit der Dekodierung des restlichen Inputs fort;

Fahren Sie mit der Dekodierung des restlichen Inputs fort:

1. die Daten sind eine Zeichenfolge, wenn der Bereich des ersten Bytes (d. h. Präfix) [0x00, 0x7f] ist, und die Zeichenfolge genau das erste Byte selbst ist;

2. die Daten sind eine Zeichenfolge, wenn der Bereich des ersten Bytes [0x80, 0xb7] ist und auf das erste Byte die Zeichenfolge folgt, deren Länge gleich dem ersten Byte minus 0x80 ist;

3. die Daten sind eine Zeichenfolge, wenn der Bereich des ersten Bytes [0xb8, 0xbf] ist und die Länge der Zeichenfolge, deren Länge in Bytes gleich dem ersten Byte minus 0xb7 ist, auf das erste Byte folgt und die Zeichenfolge der Länge der Zeichenfolge folgt;

4. die Daten sind eine Liste, wenn der Bereich des ersten Bytes [0xc0, 0xf7] ist und auf das erste Byte die Verkettung der RLP-Kodierungen aller Elemente der Liste folgt, deren Gesamtnutzlast gleich dem ersten Byte minus 0xc0 ist;

5. die Daten sind eine Liste, wenn der Bereich des ersten Bytes [0xf8, 0xff] ist und die Gesamtnutzlast der Liste, deren Länge gleich dem ersten Byte minus 0xf7 ist, auf das erste Byte folgt und die Verkettung der RLP-Kodierungen aller Elemente der Liste der Gesamtnutzlast der Liste folgt;

Im Code lautet dies:

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
        raise Exception("Eingabe ist null")
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
    raise Exception("Eingabe entspricht nicht dem RLP-Kodierungsformat")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("Eingabe ist null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Weiterführende Lektüre {#further-reading}

- [RLP in Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum unter der Haube: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereums rekursives Längenpräfix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Verwandte Themen {#related-topics}

- [Patricia-Merkle-Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
