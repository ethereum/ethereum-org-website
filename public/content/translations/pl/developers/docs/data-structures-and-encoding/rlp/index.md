---
title: Serializacja prefiksem o rekursywnej długości (RLP)
description: Definicja kodowania RLP w warstwie wykonawczej Ethereum.
lang: pl
sidebarDepth: 2
---

Serializacja przy użyciu prefiksu o rekursywnej długości (RLP) jest szeroko stosowana w klientach wykonawczych Ethereum. RLP standaryzuje przesyłanie danych pomiędzy węzłami w formacie oszczędzającym miejsce. Celem RLP jest kodowanie dowolnie zagnieżdżonych tablic danych binarnych oraz RLP jest główną metodą kodowania wykorzystywaną do serializacji obiektów w warstwie wykonawczej Ethereum. Głównym celem RLP jest kodowanie struktury; z wyjątkiem dodatnich liczb całkowitych, RLP oddelegowuje kodowanie specyficznych typów danych (np. ciągów znaków, liczb zmiennoprzecinkowych) do protokołów wyższego rzędu. Dodatnie liczby całkowite muszą być reprezentowane w postaci binarnej big endian bez zer wiodących (w ten sposób wartość całkowita zero jest równoważna pustej tablicy bajtów). Deserializowane dodatnie liczby całkowite z wiodącymi zerami powinny być traktowane jako nieprawidłowe przez dowolny protokół wyższego rzędu wykorzystujący RLP.

Więcej informacji w [żółtej księdze Ethereum (Dodatek B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Aby użyć RLP do zakodowania słownika, zaleca się dwie następujące kanoniczne formy:

- użyj `[[k1,v1],[k2,v2]...]` z kluczami w porządku leksykograficznym
- użycie kodowania wyższego poziomu drzewa Patricia, tak jak robi to Ethereum

## Definicja {#definition}

Funkcja kodowania RLP przyjmuje jeden element. Element zdefiniowany jest w następujący sposób：

- ciąg znaków (tzn. tablica bajtów) jest elementem
- lista elementów jest elementem
- dodatnia liczba całkowita jest elementem

Dla przykładu wszystko, co poniżej jest elementem:

- pusty ciąg znaków;
- ciąg znaków zawierający słowo „cat”;
- lista zawierająca dowolną ilość ciągów znaków;
- oraz bardziej złożone struktury danych, takie jak `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- liczba `100`

Zauważ, że w kontekście reszty tej strony „ciąg znaków” oznacza „określoną liczbę bajtów danych binarnych”; nie są używane żadne specjalne kodowania i nie jest implikowana żadna wiedza na temat zawartości ciągów znaków (z wyjątkiem tego, co jest wymagane przez regułę przeciwko nieminimalnym dodatnim liczbom całkowitym).

Kodowanie RLP definiuje się w następujący sposób:

- Dla dodatniej liczby całkowitej: jest ona konwertowana na najkrótszą tablicę bajtów, której interpretacja w postaci big endian odpowiada tej liczbie całkowitej, a następnie kodowana jako ciąg znaków zgodnie z poniższymi zasadami.
- Dla pojedynczego bajtu, którego wartość znajduje się w zakresie `[0x00, 0x7f]` (dziesiętnie `[0, 127]`), ten bajt jest swoim własnym kodowaniem RLP.
- W przeciwnym razie, jeśli ciąg znaków ma 0-55 bajtów długości, kodowanie RLP składa się z pojedynczego bajtu o wartości **0x80** (dzies. 128) plus długość ciągu, po której następuje sam ciąg. Zakres pierwszego bajtu wynosi więc `[0x80, 0xb7]` (dzies. `[128, 183]`).
- Jeśli ciąg znaków ma więcej niż 55 bajtów, kodowanie RLP składa się z pojedynczego bajtu o wartości **0xb7** (dzies. 183) plus długość w bajtach długości ciągu w postaci binarnej, po której następuje długość ciągu, a po niej sam ciąg. Na przykład ciąg znaków o długości 1024 bajtów byłby zakodowany jako `\xb9\x04\x00` (dzies. `185, 4, 0`), po którym następuje ciąg. Tutaj, `0xb9` (183 + 2 = 185) jako pierwszy bajt, po którym następują 2 bajty `0x0400` (dzies. 1024) oznaczające długość właściwego ciągu. Zakres pierwszego bajtu wynosi więc `[0xb8, 0xbf]` (dzies. `[184, 191]`).
- Jeśli ciąg znaków ma długość 2^64 bajtów lub większą, nie może zostać zakodowany.
- Jeśli całkowity ładunek listy (tzn. łączna długość wszystkich jej elementów zakodowanych w RLP) ma 0-55 bajtów długości, kodowanie RLP składa się z pojedynczego bajtu o wartości **0xc0** plus długość ładunku, po którym następuje konkatenacja kodowań RLP poszczególnych elementów. Zakres pierwszego bajtu wynosi więc `[0xc0, 0xf7]` (dzies. `[192, 247]`).
- Jeśli całkowity ładunek listy ma więcej niż 55 bajtów, kodowanie RLP składa się z pojedynczego bajtu o wartości **0xf7** plus długość w bajtach długości ładunku w postaci binarnej, po której następuje długość ładunku, a następnie konkatenacja kodowań RLP poszczególnych elementów. Zakres pierwszego bajtu wynosi więc `[0xf8, 0xff]` (dzies. `[248, 255]`).

W kodzie wygląda to tak:

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
    raise Exception("zbyt długie dane wejściowe")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Przykłady {#examples}

- ciąg znaków „dog” = [ 0x83, 'd', 'o', 'g' ]
- lista [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- pusty ciąg znaków ('null') = `[ 0x80 ]`
- pusta lista = `[ 0xc0 ]`
- liczba całkowita 0 = `[ 0x80 ]`
- bajt '\\x00' = `[ 0x00 ]`
- bajt '\\x0f' = `[ 0x0f ]`
- bajty '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- the [reprezentacja teoriomnogościowa](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) of three, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- ciąg znaków "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Dekodowanie RLP {#rlp-decoding}

Zgodnie z zasadami i procesem kodowania RLP, dane wejściowe dla dekodowania RLP są traktowane jako tablica danych binarnych. Proces dekodowania RLP jest następujący:

1. zgodnie z pierwszym bajtem (tzn. prefiksem) danych wejściowych i dekodowaniem typu danych, długości rzeczywistych danych i przesunięcia;

2. zgodnie z typem oraz przesunięciem danych, następuje dekodowanie danych z uwzględnieniem reguły minimalnego kodowania dla dodatnich liczb całkowitych;

3. następnie kontynuuje się dekodowanie pozostałej części danych wejściowych;

Wśród nich zasady dekodowania typów oraz przesunięcia danych są następujące:

1. dane są ciągiem znaków, jeśli zakres pierwszego bajtu (tzn. prefiksu) wynosi [0x00, 0x7f], a sam ciąg jest dokładnie tym pierwszym bajtem;

2. dane są ciągiem znaków, jeśli zakres pierwszego bajtu wynosi [0x80, 0xb7], a za pierwszym bajtem znajduje się ciąg znaków o długości równej pierwszemu bajtowi minus 0x80;

3. dane są ciągiem znaków, jeśli zakres pierwszego bajtu wynosi [0xb8, 0xbf], a długość ciągu, której długość w bajtach jest równa pierwszemu bajtowi minus 0xb7, znajduje się za pierwszym bajtem, a za długością znajduje się sam ciąg;

4. dane są listą, jeśli zakres pierwszego bajtu wynosi [0xc0, 0xf7], a za pierwszym bajtem znajduje się konkatenacja kodowań RLP wszystkich elementów listy, których łączny ładunek jest równy pierwszemu bajtowi minus 0xc0;

5. dane są listą, jeśli zakres pierwszego bajtu wynosi [0xf8, 0xff], a za pierwszym bajtem znajduje się łączny ładunek listy, której długość jest równa pierwszemu bajtowi minus 0xf7, a po łącznym ładunku listy następuje konkatenacja kodowań RLP wszystkich elementów listy;

W kodzie wygląda to tak:

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
        raise Exception("puste dane wejściowe")
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
    raise Exception("dane wejściowe niezgodne z formą kodowania RLP")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("puste dane wejściowe")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Dalsza lektura {#further-reading}

- [RLP w Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum od podszewki: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- Coglio, A. (2020 r.). Prefiks o rekursywnej długości Ethereum w ACL2. preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Powiązane tematy {#related-topics}

- [drzewo Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
