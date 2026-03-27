---
title: Serializzazione a prefisso di lunghezza ricorsiva (RLP)
description: Una definizione della codifica rlp nel livello di esecuzione di Ethereum.
lang: it
sidebarDepth: 2
---

La serializzazione a prefisso di lunghezza ricorsiva (RLP) è ampiamente utilizzata nei client di esecuzione di Ethereum. L'RLP standardizza il trasferimento di dati tra i nodi in un formato efficiente in termini di spazio. Lo scopo dell'RLP è codificare array di dati binari nidificati in modo arbitrario, ed è il metodo di codifica principale utilizzato per serializzare gli oggetti nel livello di esecuzione di Ethereum. Lo scopo principale dell'RLP è codificare la struttura; a eccezione degli interi positivi, l'RLP delega la codifica di tipi di dati specifici (es. stringhe, float) a protocolli di ordine superiore. Gli interi positivi devono essere rappresentati in formato binario big-endian senza zeri iniziali (rendendo così il valore intero zero equivalente all'array di byte vuoto). Gli interi positivi deserializzati con zeri iniziali devono essere trattati come non validi da qualsiasi protocollo di ordine superiore che utilizzi l'RLP.

Maggiori informazioni nel [Yellow Paper di Ethereum (Appendice B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Per utilizzare l'RLP per codificare un dizionario, le due forme canoniche suggerite sono:

- usare `[[k1,v1],[k2,v2]...]` con le chiavi in ordine lessicografico
- usare la codifica di livello superiore Patricia Tree come fa [Ethereum](/)

## Definizione {#definition}

La funzione di codifica RLP accetta un elemento. Un elemento è definito come segue:

- una stringa (ovvero, un array di byte) è un elemento
- un elenco di elementi è un elemento
- un intero positivo è un elemento

Ad esempio, tutti i seguenti sono elementi:

- una stringa vuota;
- la stringa contenente la parola "cat";
- un elenco contenente un numero qualsiasi di stringhe;
- e strutture dati più complesse come `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- il numero `100`

Nota che nel contesto del resto di questa pagina, per 'stringa' si intende "un certo numero di byte di dati binari"; non vengono utilizzate codifiche speciali e non è implicita alcuna conoscenza del contenuto delle stringhe (salvo quanto richiesto dalla regola contro gli interi positivi non minimi).

La codifica RLP è definita come segue:

- Per un intero positivo, viene convertito nell'array di byte più corto la cui interpretazione big-endian è l'intero, e poi codificato come stringa secondo le regole sottostanti.
- Per un singolo byte il cui valore è nell'intervallo `[0x00, 0x7f]` (decimale `[0, 127]`), quel byte è la sua stessa codifica RLP.
- Altrimenti, se una stringa è lunga 0-55 byte, la codifica RLP consiste in un singolo byte con valore **0x80** (dec. 128) più la lunghezza della stringa, seguito dalla stringa. L'intervallo del primo byte è quindi `[0x80, 0xb7]` (dec. `[128, 183]`).
- Se una stringa è lunga più di 55 byte, la codifica RLP consiste in un singolo byte con valore **0xb7** (dec. 183) più la lunghezza in byte della lunghezza della stringa in formato binario, seguito dalla lunghezza della stringa, seguito dalla stringa. Ad esempio, una stringa lunga 1024 byte verrebbe codificata come `\xb9\x04\x00` (dec. `185, 4, 0`) seguita dalla stringa. Qui, `0xb9` (183 + 2 = 185) è il primo byte, seguito dai 2 byte `0x0400` (dec. 1024) che denotano la lunghezza della stringa effettiva. L'intervallo del primo byte è quindi `[0xb8, 0xbf]` (dec. `[184, 191]`).
- Se una stringa è lunga 2^64 byte, o più, potrebbe non essere codificata.
- Se il payload totale di un elenco (ovvero, la lunghezza combinata di tutti i suoi elementi codificati in RLP) è lungo 0-55 byte, la codifica RLP consiste in un singolo byte con valore **0xc0** più la lunghezza del payload, seguito dalla concatenazione delle codifiche RLP degli elementi. L'intervallo del primo byte è quindi `[0xc0, 0xf7]` (dec. `[192, 247]`).
- Se il payload totale di un elenco è lungo più di 55 byte, la codifica RLP consiste in un singolo byte con valore **0xf7** più la lunghezza in byte della lunghezza del payload in formato binario, seguito dalla lunghezza del payload, seguito dalla concatenazione delle codifiche RLP degli elementi. L'intervallo del primo byte è quindi `[0xf8, 0xff]` (dec. `[248, 255]`).

In forma sintetica:

| Intervallo  | Byte 1     | Byte 2     | ...        | Byte 9                | Byte 10    | Significato                               |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | stringa a byte singolo                    |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | stringa corta (0-55 byte)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | stringa lunga, N+1 byte per la lunghezza, poi il payload |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | elenco corto (0-55 byte)                  |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | elenco lungo, N+1 byte per la lunghezza, poi il payload |

- `p` = payload
- `n` = lunghezza (numero di byte del payload)
- `N` = offset della lunghezza della lunghezza (seguono N+1 byte `n`)

Nel codice, questo è:

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

## Esempi {#examples}

- la stringa "dog" = [ 0x83, 'd', 'o', 'g' ]
- l'elenco [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- la stringa vuota ('null') = `[ 0x80 ]`
- l'elenco vuoto = `[ 0xc0 ]`
- l'intero 0 = `[ 0x80 ]`
- il byte '\\x00' = `[ 0x00 ]`
- il byte '\\x0f' = `[ 0x0f ]`
- i byte '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- la [rappresentazione teorica degli insiemi](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) di tre, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- la stringa "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Decodifica RLP {#rlp-decoding}

Secondo le regole e il processo della codifica RLP, l'input della decodifica RLP è considerato come un array di dati binari. Il processo di decodifica RLP è il seguente:

1.  in base al primo byte (ovvero, il prefisso) dei dati di input e decodificando il tipo di dati, la lunghezza dei dati effettivi e l'offset;

2.  in base al tipo e all'offset dei dati, decodificare i dati in modo corrispondente, rispettando la regola di codifica minima per gli interi positivi;

3.  continuare a decodificare il resto dell'input;

Tra queste, le regole di decodifica dei tipi di dati e dell'offset sono le seguenti:

1.  i dati sono una stringa se l'intervallo del primo byte (ovvero, il prefisso) è [0x00, 0x7f], e la stringa è esattamente il primo byte stesso;

2.  i dati sono una stringa se l'intervallo del primo byte è [0x80, 0xb7], e la stringa la cui lunghezza è uguale al primo byte meno 0x80 segue il primo byte;

3.  i dati sono una stringa se l'intervallo del primo byte è [0xb8, 0xbf], e la lunghezza della stringa la cui lunghezza in byte è uguale al primo byte meno 0xb7 segue il primo byte, e la stringa segue la lunghezza della stringa;

4.  i dati sono un elenco se l'intervallo del primo byte è [0xc0, 0xf7], e la concatenazione delle codifiche RLP di tutti gli elementi dell'elenco il cui payload totale è uguale al primo byte meno 0xc0 segue il primo byte;

5.  i dati sono un elenco se l'intervallo del primo byte è [0xf8, 0xff], e il payload totale dell'elenco la cui lunghezza è uguale al primo byte meno 0xf7 segue il primo byte, e la concatenazione delle codifiche RLP di tutti gli elementi dell'elenco segue il payload totale dell'elenco;

Nel codice, questo è:

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

## Letture consigliate {#further-reading}

- [RLP in Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum under the hood: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Argomenti correlati {#related-topics}

- [Trie di Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)