---
title: Serializzazione a prefisso di lunghezza ricorsiva (RLP)
description: Una definizione della codifica rlp nel livello d'esecuzione di Ethereum.
lang: it
sidebarDepth: 2
---

La serializzazione a prefisso di lunghezza ricorsiva (RLP) è usata ampiamente nei client d'esecuzione di Ethereum. L’RLP standardizza il trasferimento di dati tra nodi in un formato efficiente a livello di spazio. Lo scopo dell’RLP è codificare arbitrariamente gli insiemi di dati binari nidificati e l’RLP è il metodo di codifica principale usato per serializzare gli oggetti nel livello d'esecuzione di Ethereum. Lo scopo principale dell'RLP è codificare la struttura; con l'eccezione degli interi positivi, l'RLP delega la codifica dei tipi di dati specifici (es.,stringhe, virgola mobile) a protocolli di ordine superiore. Gli interi positivi devono essere rappresentati in forma binaria big-endian senza zeri iniziali (rendendo il valore intero zero equivalente all'array di byte vuoto). Gli interi positivi deserializzati con zero iniziali devono essere trattati come non validi da qualsiasi protocollo di ordine superiore che utilizzi l'RLP.

Per maggiori informazioni, consultare lo [yellowpaper di Ethereum (Appendice B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Per usare l’RLP per codificare un dizionario, le due forme canoniche suggerite sono:

- usare `[[k1,v1],[k2,v2]...]` con i tasti in ordine lessicografico
- usare la codifica dell'Albero di Patricia di livello superiore come fa Ethereum

## Definizione {#definition}

La codifica RLP prende un elemento. Un elemento è definito come segue:

- una stringa (ovvero insieme di byte) è un elemento
- un elenco di elementi è un elemento
- un intero posiitivo è un elemento

Ad esempio, tutti i seguenti sono elementi:

- una stringa vuota;
- la stringa contenente la parola "gatto";
- un elenco contenente qualsiasi numero di stringhe;
- e strutture di dati più complesse come `["gatto", ["cucciolo", "vacca"], "cavallo", [[]], "maiale", [""], "pecora"]`.
- il numero `100`

Nota che, nel contesto del resto di questa pagina, 'stringa' significa "un certo numero di byte di dati binari"; non è utilizzata alcuna codifica speciale, e non è implicata alcuna conoscenza sul contenuto delle stringhe (tranne come richiesto dalla regola contro gli interi positivi non minimali).

La codifica RLP è definita come segue:

- Per un intero positivo, è convertito al più breve array di byte la cui interpretazione big-endian sia l'intero, quindi, e quindi codificato come una stringa secondo le seguenti regole.
- Per un singolo byte il cui valore è nell'intervallo `[0x00, 0x7f]` (decimale `[0, 127]`), quel byte è la propria codifica RLP.
- Altrimenti, se una stringa è lunga da 0 a 55 byte, la codifica RLP consiste in un singolo byte con valore **0x80** (dec. 128) più la lunghezza della stringa seguita dalla stringa. L'intervallo del primo byte è dunque `[0x80, 0xb7]` (dec. `[128, 183]`).
- Se una stringa è più lunga di 55 byte, la codifica RLP consiste in un singolo byte con valore **0xb7** (dec. 183) più la lunghezza in byte della lunghezza della stringa in forma binaria, seguita dalla lunghezza della stringa, seguita dalla stringa. Ad esempio, una stringa lunga 1024 byte sarebbe codificata come `\xb9\x04\x00` (dec. `185, 4, 0`), seguita dalla stringa. Qui, `0xb9` (183 + 2 = 185) come primo byte, seguito dai 2 byte `0x0400` (dec. 1024) che denotano la lunghezza della stringa effettiva. L'intervallo del primo byte è dunque `[0xb8, 0xbf]` (dec. `[184, 191]`).
- Se una stringa è lunga 2^64 byte o più, potrebbe non essere codificata.
- Se il payload totale di un elenco (cioè la lunghezza combinata di tutti i suoi elementi codificati in RLP) è lunga da 0 a 55 byte, la codifica RLP consiste in un singolo byte dal valore **0xc0**, più la lunghezza del payload, seguita dalla concatenazione delle codifiche RLP degli elementi. L'intervallo del primo byte è dunque `[0xc0, 0xf7]` (dec. `[192, 247]`).
- Se il carico utile totale di un elenco è più lungo di 55 byte, la codifica RLP consiste in un singolo byte con valore **oxf7**, più la lunghezza in byte della lunghezza del payload in forma binaria, seguita dalla lunghezza del carico utile, seguita dalla concatenazione delle codifiche RLP degli elementi. L'intervallo del primo byte è dunque `[0xf8, 0xff]` (dec. `[248, 255]`).

In codice è:

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
- la stringa vuota (“null”) = `[ 0x80 ]`
- l'elenco vuoto = `[ 0xc0 ]`
- l'intero 0 = `[ 0x80 ]`
- il byte '\\x00' = `[ 0x00 ]`
- il byte '\\x0f' = `[ 0x0f ]`
- i byte '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- la [data rappresentazione teorica](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) di tre, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- la stringa "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Decodifica RLP {#rlp-decoding}

Secondo le regole e il processo della codifica RLP, l'input della decodifica RLP è considerato come un array di dati binari. Il processo di decodifica RLP è il seguente:

1.  a seconda del primo byte (ovvero il prefisso) dei dati di input e decodificando il tipo di dati, la lunghezza dei dati effettivi e l'offset;

2.  secondo il tipo e lo scostamento dei dati, decodificali di conseguenza, rispettando la regola di codifica minimale per gli interi positivi;

3.  continua a decodificare il resto dell'input;

Tra loro, le regole per decodificare i tipi di dati e offset sono le seguenti:

1.  i dati sono una stringa se l'intervallo del primo byte (prefisso) è [0x00, 0x7f] e la stringa corrisponde esattamente al primo byte;

2.  i dati sono una stringa se l'intervallo del primo byte è [0x80, 0xb7] e la stringa la cui lunghezza è pari al primo byte meno 0x80 segue il primo byte;

3.  i dati sono una stringa se l'intervallo del primo byte è [0xb8, 0xbf] e la lunghezza della stringa la cui lunghezza in byte è pari al primo byte meno 0xb7 segue il primo byte, e la stringa segue la lunghezza della stringa;

4.  i dati sono una lista se l'intervallo del primo byte è [0xc0, 0xf7] e la concatenazione delle codifiche RLP di tutti gli elementi della lista in cui il payload totale è uguale al primo byte meno 0xc0 segue il primo byte;

5.  i dati sono una lista se l'intervallo del primo byte è [0xf8, 0xff] e il payload totale dell'elenco la cui lunghezza equivale al primo byte meno 0xf7 segue il primo byte e la concatenazione delle codifiche RLP di tutti gli elementi dell'elenco segue il payload totale dell'elenco;

In codice è:

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
- [Dietro le quinte di Ethereum: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Prefisso di Lunghezza Ricorsiva di Ethereum in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Argomenti correlati {#related-topics}

- [Trie di Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
