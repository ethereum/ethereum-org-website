---
title: Serializacja RLP (Recursive-length prefix)
description: Definicja kodowania RLP w warstwie wykonawczej Ethereum.
lang: pl
sidebarDepth: 2
---

Serializacja RLP (Recursive Length Prefix) jest szeroko stosowana w klientach wykonawczych Ethereum. RLP standaryzuje transfer danych między węzłami w formacie oszczędzającym miejsce. Celem RLP jest kodowanie dowolnie zagnieżdżonych tablic danych binarnych, a RLP jest główną metodą kodowania używaną do serializacji obiektów w warstwie wykonawczej Ethereum. Głównym celem RLP jest kodowanie struktury; z wyjątkiem dodatnich liczb całkowitych, RLP deleguje kodowanie określonych typów danych (np. ciągów znaków, liczb zmiennoprzecinkowych) do protokołów wyższego rzędu. Dodatnie liczby całkowite muszą być reprezentowane w postaci binarnej big-endian bez zer wiodących (co sprawia, że wartość całkowita zero jest równoważna pustej tablicy bajtów). Zdeserializowane dodatnie liczby całkowite z zerami wiodącymi muszą być traktowane jako nieprawidłowe przez każdy protokół wyższego rzędu korzystający z RLP.

Więcej informacji w [żółtej księdze Ethereum (Dodatek B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Aby użyć RLP do zakodowania słownika, dwiema sugerowanymi formami kanonicznymi są:

- użycie `[[k1,v1],[k2,v2]...]` z kluczami w porządku leksykograficznym
- użycie kodowania wyższego poziomu Patricia Tree, tak jak robi to [Ethereum](/)

## Definicja {#definition}

Funkcja kodująca RLP przyjmuje element (item). Element jest zdefiniowany następująco:

- ciąg znaków (tj. tablica bajtów) jest elementem
- lista elementów jest elementem
- dodatnia liczba całkowita jest elementem

Na przykład, wszystkie poniższe są elementami:

- pusty ciąg znaków;
- ciąg znaków zawierający słowo „cat”;
- lista zawierająca dowolną liczbę ciągów znaków;
- oraz bardziej złożone struktury danych, takie jak `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- liczba `100`

Należy pamiętać, że w kontekście reszty tej strony „ciąg znaków” (string) oznacza „określoną liczbę bajtów danych binarnych”; nie są używane żadne specjalne kodowania i nie zakłada się żadnej wiedzy na temat zawartości ciągów znaków (z wyjątkiem wymagań wynikających z reguły zabraniającej stosowania nieminimalnych dodatnich liczb całkowitych).

Kodowanie RLP jest zdefiniowane następująco:

- W przypadku dodatniej liczby całkowitej jest ona konwertowana na najkrótszą tablicę bajtów, której interpretacją big-endian jest ta liczba całkowita, a następnie kodowana jako ciąg znaków zgodnie z poniższymi regułami.
- Dla pojedynczego bajtu, którego wartość mieści się w przedziale `[0x00, 0x7f]` (dziesiętnie `[0, 127]`), ten bajt jest swoim własnym kodowaniem RLP.
- W przeciwnym razie, jeśli ciąg znaków ma długość 0-55 bajtów, kodowanie RLP składa się z pojedynczego bajtu o wartości **0x80** (dziesiętnie 128) powiększonej o długość ciągu znaków, po którym następuje sam ciąg znaków. Zakres pierwszego bajtu to zatem `[0x80, 0xb7]` (dziesiętnie `[128, 183]`).
- Jeśli ciąg znaków ma więcej niż 55 bajtów długości, kodowanie RLP składa się z pojedynczego bajtu o wartości **0xb7** (dziesiętnie 183) powiększonej o długość w bajtach długości ciągu znaków w postaci binarnej, po którym następuje długość ciągu znaków, a następnie sam ciąg znaków. Na przykład ciąg znaków o długości 1024 bajtów zostałby zakodowany jako `\xb9\x04\x00` (dziesiętnie `185, 4, 0`), po którym następuje ciąg znaków. W tym przypadku `0xb9` (183 + 2 = 185) jako pierwszy bajt, po którym następują 2 bajty `0x0400` (dziesiętnie 1024) oznaczające długość właściwego ciągu znaków. Zakres pierwszego bajtu to zatem `[0xb8, 0xbf]` (dziesiętnie `[184, 191]`).
- Jeśli ciąg znaków ma długość 2^64 bajtów lub więcej, nie może zostać zakodowany.
- Jeśli całkowity ładunek (payload) listy (tj. łączna długość wszystkich jej elementów kodowanych w RLP) ma długość 0-55 bajtów, kodowanie RLP składa się z pojedynczego bajtu o wartości **0xc0** powiększonej o długość ładunku, po którym następuje konkatenacja kodowań RLP elementów. Zakres pierwszego bajtu to zatem `[0xc0, 0xf7]` (dziesiętnie `[192, 247]`).
- Jeśli całkowity ładunek listy ma więcej niż 55 bajtów długości, kodowanie RLP składa się z pojedynczego bajtu o wartości **0xf7** powiększonej o długość w bajtach długości ładunku w postaci binarnej, po którym następuje długość ładunku, a następnie konkatenacja kodowań RLP elementów. Zakres pierwszego bajtu to zatem `[0xf8, 0xff]` (dziesiętnie `[248, 255]`).

W zwięzłej formie:

| Zakres       | Bajt 1     | Bajt 2     | ...        | Bajt 9                | Bajt 10    | Znaczenie                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | ciąg znaków o dł. jednego bajtu                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | krótki ciąg znaków (0-55 bajtów)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | długi ciąg znaków, N+1 bajtów na długość, potem ładunek |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | krótka lista (0-55 bajtów)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | długa lista, N+1 bajtów na długość, potem ładunek |

- `p` = ładunek (payload)
- `n` = długość (liczba bajtów ładunku)
- `N` = przesunięcie długości długości (następuje N+1 bajtów `n`)

W kodzie wygląda to następująco:

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

## Przykłady {#examples}

- ciąg znaków „dog” = [ 0x83, 'd', 'o', 'g' ]
- lista [ „cat”, „dog” ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- pusty ciąg znaków ('null') = `[ 0x80 ]`
- pusta lista = `[ 0xc0 ]`
- liczba całkowita 0 = `[ 0x80 ]`
- bajt '\x00' = `[ 0x00 ]`
- bajt '\x0f' = `[ 0x0f ]`
- bajty '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- [teoriomnogościowa reprezentacja](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) liczby trzy, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- ciąg znaków „Lorem ipsum dolor sit amet, consectetur adipisicing elit” = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Dekodowanie RLP {#rlp-decoding}

Zgodnie z regułami i procesem kodowania RLP, wejście dekodowania RLP jest traktowane jako tablica danych binarnych. Proces dekodowania RLP przebiega następująco:

1.  na podstawie pierwszego bajtu (tj. prefiksu) danych wejściowych dekodowany jest typ danych, długość właściwych danych oraz przesunięcie (offset);

2.  zgodnie z typem i przesunięciem danych, dane są odpowiednio dekodowane, z zachowaniem reguły minimalnego kodowania dla dodatnich liczb całkowitych;

3.  kontynuowane jest dekodowanie reszty wejścia;

Zasady dekodowania typów danych i przesunięcia są następujące:

1.  dane są ciągiem znaków, jeśli zakres pierwszego bajtu (tj. prefiksu) to [0x00, 0x7f], a ciąg znaków jest dokładnie tym pierwszym bajtem;

2.  dane są ciągiem znaków, jeśli zakres pierwszego bajtu to [0x80, 0xb7], a ciąg znaków, którego długość jest równa pierwszemu bajtowi minus 0x80, następuje po pierwszym bajcie;

3.  dane są ciągiem znaków, jeśli zakres pierwszego bajtu to [0xb8, 0xbf], a długość ciągu znaków, której długość w bajtach jest równa pierwszemu bajtowi minus 0xb7, następuje po pierwszym bajcie, po czym następuje sam ciąg znaków;

4.  dane są listą, jeśli zakres pierwszego bajtu to [0xc0, 0xf7], a konkatenacja kodowań RLP wszystkich elementów listy, których całkowity ładunek jest równy pierwszemu bajtowi minus 0xc0, następuje po pierwszym bajcie;

5.  dane są listą, jeśli zakres pierwszego bajtu to [0xf8, 0xff], a całkowity ładunek listy, którego długość jest równa pierwszemu bajtowi minus 0xf7, następuje po pierwszym bajcie, po czym następuje konkatenacja kodowań RLP wszystkich elementów listy;

W kodzie wygląda to następująco:

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

## Dalsza lektura {#further-reading}

- [RLP w Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum od kuchni: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Ethereum's Recursive Length Prefix in ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Powiązane tematy {#related-topics}

- [Drzewo Patricia Merkle Trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)