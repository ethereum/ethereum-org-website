---
title: Simple serialize
description: Wyjaśnienie formatu SSZ w Ethereum.
lang: pl
sidebarDepth: 2
---

**Simple serialize (SSZ)** to metoda serializacji używana na Beacon Chain. Zastępuje ona serializację RLP używaną w warstwie wykonawczej wszędzie w warstwie konsensusu, z wyjątkiem protokołu odkrywania węzłów równorzędnych (peer discovery). Aby dowiedzieć się więcej o serializacji RLP, zobacz [Recursive-length prefix (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ został zaprojektowany tak, aby był deterministyczny, a także aby wydajnie tworzyć drzewa Merklego. Można uznać, że SSZ składa się z dwóch komponentów: schematu serializacji i schematu merkleizacji, który został zaprojektowany do wydajnej pracy z serializowaną strukturą danych.

## Jak działa SSZ? {#how-does-ssz-work}

### Serializacja {#serialization}

SSZ to schemat serializacji, który nie jest samoopisujący – opiera się raczej na schemacie (schema), który musi być znany z góry. Celem serializacji SSZ jest reprezentowanie obiektów o dowolnej złożoności jako ciągów bajtów. Jest to bardzo prosty proces dla „typów podstawowych”. Element jest po prostu konwertowany na bajty szesnastkowe. Typy podstawowe obejmują:

- liczby całkowite bez znaku (unsigned integers)
- wartości logiczne (Booleans)

W przypadku złożonych typów „kompozytowych” serializacja jest bardziej skomplikowana, ponieważ typ kompozytowy zawiera wiele elementów, które mogą mieć różne typy, różne rozmiary lub jedno i drugie. Gdy wszystkie te obiekty mają stałą długość (tj. rozmiar elementów zawsze będzie stały, niezależnie od ich rzeczywistych wartości), serializacja jest po prostu konwersją każdego elementu w typie kompozytowym, uporządkowanego w ciągi bajtów w formacie little-endian. Te ciągi bajtów są ze sobą łączone. Serializowany obiekt ma reprezentację w postaci listy bajtów elementów o stałej długości w takiej samej kolejności, w jakiej pojawiają się one w zdeserializowanym obiekcie.

W przypadku typów o zmiennej długości rzeczywiste dane są zastępowane wartością „przesunięcia” (offset) na pozycji tego elementu w serializowanym obiekcie. Rzeczywiste dane są dodawane do sterty (heap) na końcu serializowanego obiektu. Wartość przesunięcia to indeks początku rzeczywistych danych na stercie, działający jako wskaźnik do odpowiednich bajtów.

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

`serialized` miałby następującą strukturę (tutaj dopełnioną tylko do 4 bitów, w rzeczywistości dopełnioną do 32 bitów, z zachowaniem reprezentacji `int` dla jasności):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2   przesunięcie   number 3   wartość dla
                           dla wektora                 wektora
```

podzielone na wiersze dla jasności:

```
[
  37, 0, 0, 0,  # kodowanie little-endian dla `number1`.
  55, 0, 0, 0,  # kodowanie little-endian dla `number2`.
  16, 0, 0, 0,  # „Przesunięcie” (offset), które wskazuje, gdzie zaczyna się wartość `vector` (little-endian 16).
  22, 0, 0, 0,  # kodowanie little-endian dla `number3`.
  1, 2, 3, 4,   # Rzeczywiste wartości w `vector`.
]
```

To wciąż uproszczenie – liczby całkowite i zera na powyższych schematach w rzeczywistości byłyby przechowywane jako listy bajtów, w ten sposób:

```
[
  10100101000000000000000000000000  # kodowanie little-endian dla `number1`
  10110111000000000000000000000000  # kodowanie little-endian dla `number2`.
  10010000000000000000000000000000  # „Przesunięcie” (offset), które wskazuje, gdzie zaczyna się wartość `vector` (little-endian 16).
  10010110000000000000000000000000  # kodowanie little-endian dla `number3`.
  10000001100000101000001110000100   # Rzeczywista wartość pola `bytes`.
]
```

Zatem rzeczywiste wartości dla typów o zmiennej długości są przechowywane na stercie na końcu serializowanego obiektu, a ich przesunięcia są przechowywane na odpowiednich pozycjach w uporządkowanej liście pól.

Istnieją również pewne szczególne przypadki, które wymagają specyficznego traktowania, takie jak typ `BitList`, który wymaga dodania limitu długości podczas serializacji i usunięcia go podczas deserializacji. Pełne szczegóły są dostępne w [specyfikacji SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserializacja {#deserialization}

Do zdeserializowania tego obiektu wymagany jest <b>schemat</b>. Schemat definiuje dokładny układ serializowanych danych, dzięki czemu każdy konkretny element może zostać zdeserializowany z bloba bajtów do sensownego obiektu, w którym elementy mają odpowiedni typ, wartość, rozmiar i pozycję. To schemat informuje deserializator, które wartości są rzeczywistymi wartościami, a które przesunięciami. Wszystkie nazwy pól znikają podczas serializacji obiektu, ale są przywracane podczas deserializacji zgodnie ze schematem.

Zobacz [ssz.dev](https://www.ssz.dev/overview), aby zapoznać się z interaktywnym wyjaśnieniem tego zagadnienia.

## Merkleizacja {#merkleization}

Ten serializowany obiekt SSZ może następnie zostać poddany merkleizacji – to znaczy przekształcony w reprezentację tych samych danych w postaci drzewa Merklego. Najpierw określana jest liczba 32-bajtowych fragmentów (chunks) w serializowanym obiekcie. Są to „liście” drzewa. Całkowita liczba liści musi być potęgą liczby 2, aby haszowanie liści ostatecznie dało pojedynczy korzeń drzewa hashów (hash-tree-root). Jeśli tak nie jest w naturalny sposób, dodawane są dodatkowe liście zawierające 32 bajty zer. Schematycznie:

```
korzeń drzewa hashów
            /     \
           /       \
          /         \
         /           \
     hash liści      hash liści
       1 i 2           3 i 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 liść1     liść2  liść3     liść4
```

Zdarzają się również przypadki, w których liście drzewa nie rozkładają się naturalnie równomiernie w sposób pokazany w powyższym przykładzie. Na przykład liść 4 może być kontenerem z wieloma elementami, które wymagają dodania dodatkowej „głębokości” do drzewa Merklego, tworząc nierówne drzewo.

Zamiast odnosić się do tych elementów drzewa jako liść X, węzeł X itp., możemy nadać im uogólnione indeksy, zaczynając od korzenia = 1 i licząc od lewej do prawej wzdłuż każdego poziomu. To jest uogólniony indeks wyjaśniony powyżej. Każdy element na serializowanej liście ma uogólniony indeks równy `2**depth + idx`, gdzie idx to jego pozycja indeksowana od zera w serializowanym obiekcie, a głębokość (depth) to liczba poziomów w drzewie Merklego, którą można określić jako logarytm o podstawie dwa z liczby elementów (liści).

## Uogólnione indeksy {#generalized-indices}

Uogólniony indeks to liczba całkowita reprezentująca węzeł w binarnym drzewie Merklego, gdzie każdy węzeł ma uogólniony indeks `2 ** depth + index in row`.

```
1           --głębokość = 0  2**0 + 0 = 1
    2       3       --głębokość = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --głębokość = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Ta reprezentacja daje indeks węzła dla każdego fragmentu danych w drzewie Merklego.

## Dowody wielokrotne (Multiproofs) {#multiproofs}

Dostarczenie listy uogólnionych indeksów reprezentujących określony element pozwala nam zweryfikować go względem korzenia drzewa hashów (hash-tree-root). Ten korzeń jest naszą zaakceptowaną wersją rzeczywistości. Wszelkie dostarczone nam dane można zweryfikować z tą rzeczywistością, wstawiając je w odpowiednie miejsce w drzewie Merklego (określone przez ich uogólniony indeks) i obserwując, czy korzeń pozostaje niezmienny. W specyfikacji [tutaj](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) znajdują się funkcje, które pokazują, jak obliczyć minimalny zestaw węzłów wymagany do weryfikacji zawartości określonego zestawu uogólnionych indeksów.

Na przykład, aby zweryfikować dane pod indeksem 9 w poniższym drzewie, potrzebujemy hasha danych pod indeksami 8, 9, 5, 3, 1.
Hash z (8,9) powinien być równy hashowi (4), który jest haszowany z 5, aby utworzyć 2, a ten z kolei jest haszowany z 3, aby utworzyć korzeń drzewa 1. Gdyby dla 9 podano nieprawidłowe dane, korzeń uległby zmianie – wykrylibyśmy to i weryfikacja gałęzi zakończyłaby się niepowodzeniem.

```
* = dane wymagane do wygenerowania dowodu

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15
```

## Dalsza lektura {#further-reading}

- [Aktualizacja Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Aktualizacja Ethereum: Merkleizacja](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementacje SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Kalkulator SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)