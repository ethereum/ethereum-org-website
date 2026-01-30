---
title: Prosta serializacja
description: Wyjaśnienie formatu SSZ Ethereum.
lang: pl
sidebarDepth: 2
---

**Prosta serializacja (SSZ)** to metoda serializacji stosowana w łańcuchu Beacon Chain. Zastępuje ona serializację RLP używaną na warstwie wykonawczej wszędzie w warstwie konsensusu, z wyjątkiem protokołu odnajdywania peerów. Aby dowiedzieć się więcej o serializacji RLP, zobacz [Prefiks o rekurencyjnej długości (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ zostało zaprojektowane tak, aby było deterministyczne, a także aby umożliwiało wydajne tworzenie drzew Merkle'a. SSZ można postrzegać jako składające się z dwóch komponentów: schematu serializacji i schematu tworzenia drzew Merkle'a, który jest zaprojektowany do wydajnej pracy z serializowaną strukturą danych.

## Jak działa SSZ? {#how-does-ssz-work}

### Serializacja {#serialization}

SSZ to schemat serializacji, który nie jest samoopisujący się – zamiast tego opiera się na schemacie, który musi być znany z góry. Celem serializacji SSZ jest przedstawienie obiektów o dowolnej złożoności jako ciągów bajtów. Jest to bardzo prosty proces dla "typów podstawowych". Element jest po prostu konwertowany na bajty szesnastkowe. Typy podstawowe obejmują:

- liczby całkowite bez znaku
- Wartości logiczne

W przypadku złożonych typów "złożonych" serializacja jest bardziej skomplikowana, ponieważ typ złożony zawiera wiele elementów, które mogą mieć różne typy, różne rozmiary lub jedno i drugie. Gdy wszystkie te obiekty mają stałe długości (tzn. rozmiar elementów będzie zawsze stały niezależnie od ich rzeczywistych wartości), serializacja jest po prostu konwersją każdego elementu w typie złożonym uporządkowanym w ciągi bajtów w formacie little-endian. Te ciągi bajtów są ze sobą łączone. Zserializowany obiekt ma reprezentację listy bajtów elementów o stałej długości w tej samej kolejności, w jakiej występują w obiekcie zdeserializowanym.

W przypadku typów o zmiennej długości rzeczywiste dane są zastępowane wartością "przesunięcia" na pozycji tego elementu w zserializowanym obiekcie. Rzeczywiste dane są dodawane do sterty na końcu zserializowanego obiektu. Wartość przesunięcia jest indeksem początku rzeczywistych danych na stercie, działając jako wskaźnik do odpowiednich bajtów.

Poniższy przykład ilustruje, jak działa przesunięcie dla kontenera z elementami o stałej i zmiennej długości:

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

`serialized` miałoby następującą strukturę (tutaj dopełnione tylko do 4 bitów, w rzeczywistości do 32 bitów, z zachowaniem reprezentacji `int` dla przejrzystości):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2  przesunięcie dla number3     wartość dla
                               vector                   vector

```

podzielone na wiersze dla przejrzystości:

```
[
  37, 0, 0, 0,  # kodowanie little-endian dla `number1`.
  55, 0, 0, 0,  # kodowanie little-endian dla `number2`.
  16, 0, 0, 0,  # „Przesunięcie”, które wskazuje, gdzie zaczyna się wartość `vector` (little-endian 16).
  22, 0, 0, 0,  # kodowanie little-endian dla `number3`.
  1, 2, 3, 4,   # Rzeczywiste wartości w `vector`.
]
```

To wciąż uproszczenie – liczby całkowite i zera na powyższych schematach byłyby w rzeczywistości przechowywane jako listy bajtów, w ten sposób:

```
[
  10100101000000000000000000000000  # kodowanie little-endian dla `number1`
  10110111000000000000000000000000  # kodowanie little-endian dla `number2`.
  10010000000000000000000000000000  # „Przesunięcie”, które wskazuje, gdzie zaczyna się wartość `vector` (little-endian 16).
  10010110000000000000000000000000  # kodowanie little-endian dla `number3`.
  10000001100000101000001110000100   # Rzeczywista wartość pola `bytes`.
]
```

Tak więc rzeczywiste wartości dla typów o zmiennej długości są przechowywane na stercie na końcu zserializowanego obiektu, a ich przesunięcia są przechowywane na właściwych pozycjach na uporządkowanej liście pól.

Istnieją również pewne szczególne przypadki, które wymagają specjalnego traktowania, takie jak typ `BitList`, który wymaga dodania ograniczenia długości podczas serializacji i usunięcia go podczas deserializacji. Pełne szczegóły są dostępne w [specyfikacji SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Deserializacja {#deserialization}

Aby zdeserializować ten obiekt, wymagany jest <b>schemat</b>. Schemat definiuje precyzyjny układ zserializowanych danych, tak aby każdy konkretny element mógł zostać zdeserializowany z bloba bajtów w jakiś znaczący obiekt z elementami o odpowiednim typie, wartości, rozmiarze i pozycji. To schemat informuje deserializator, które wartości są rzeczywistymi wartościami, a które przesunięciami. Wszystkie nazwy pól znikają, gdy obiekt jest serializowany, ale są ponownie tworzone podczas deserializacji zgodnie ze schematem.

Zobacz interaktywny opis na [ssz.dev](https://www.ssz.dev/overview).

## Tworzenie drzewa Merkle'a {#merkleization}

Ten zserializowany obiekt SSZ może być następnie przekształcony w drzewo Merkle'a – to znaczy przekształcony w reprezentację tych samych danych w postaci drzewa Merkle'a. Najpierw określa się liczbę 32-bajtowych fragmentów w zserializowanym obiekcie. Są to "liście" drzewa. Całkowita liczba liści musi być potęgą liczby 2, aby haszowanie liści ostatecznie dało pojedynczy korzeń drzewa haszującego. Jeśli tak nie jest, dodawane są dodatkowe liście zawierające 32 bajty zer. Schematycznie:

```
        korzeń drzewa haszującego
            /     \
           /       \
          /         \
         /           \
   hasz liści     hasz liści
     1 i 2           3 i 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 liść1     liść2    liść3     liść4
```

Istnieją również przypadki, w których liście drzewa nie rozkładają się naturalnie równomiernie w taki sposób, jak w powyższym przykładzie. Na przykład liść 4 może być kontenerem z wieloma elementami, które wymagają dodania dodatkowej "głębokości" do drzewa Merkle'a, tworząc nierówne drzewo.

Zamiast odnosić się do tych elementów drzewa jako liść X, węzeł X itd., możemy nadać im uogólnione indeksy, zaczynając od korzenia = 1 i licząc od lewej do prawej na każdym poziomie. Jest to uogólniony indeks wyjaśniony powyżej. Każdy element na zserializowanej liście ma uogólniony indeks równy `2**depth + idx`, gdzie idx jest jego pozycją indeksowaną od zera w zserializowanym obiekcie, a głębokość jest liczbą poziomów w drzewie Merkle'a, którą można określić jako logarytm o podstawie dwa z liczby elementów (liści).

## Indeksy uogólnione {#generalized-indices}

Uogólniony indeks to liczba całkowita, która reprezentuje węzeł w binarnym drzewie Merkle'a, gdzie każdy węzeł ma uogólniony indeks `2 ** depth + index in row`.

```
        1           --głębokość = 0  2**0 + 0 = 1
    2       3       --głębokość = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --głębokość = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Ta reprezentacja daje indeks węzła dla każdego fragmentu danych w drzewie Merkle'a.

## Wielodowody {#multiproofs}

Podanie listy uogólnionych indeksów reprezentujących określony element pozwala nam zweryfikować go względem korzenia drzewa haszującego. Ten korzeń jest naszą akceptowaną wersją rzeczywistości. Wszelkie dane, które otrzymujemy, mogą być zweryfikowane względem tej rzeczywistości poprzez wstawienie ich we właściwe miejsce w drzewie Merkle'a (określone przez ich uogólniony indeks) i obserwowanie, że korzeń pozostaje stały. W specyfikacji [tutaj](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs) znajdują się funkcje, które pokazują, jak obliczyć minimalny zbiór węzłów wymaganych do zweryfikowania zawartości określonego zbioru uogólnionych indeksów.

Na przykład, aby zweryfikować dane o indeksie 9 w poniższym drzewie, potrzebujemy haszu danych o indeksach 8, 9, 5, 3, 1.
Hasz (8,9) powinien być równy haszowi (4), który jest haszowany z 5, aby utworzyć 2, który jest haszowany z 3, aby utworzyć korzeń drzewa 1. Gdyby dla 9 podano nieprawidłowe dane, korzeń by się zmienił – wykrylibyśmy to i nie udałoby się zweryfikować gałęzi.

```
* = dane wymagane do wygenerowania dowodu

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Dalsza lektura {#further-reading}

- [Modernizacja Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Modernizacja Ethereum: tworzenie drzewa Merkle'a](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementacje SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulator SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
