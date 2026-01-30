---
title: Drzewo Merkle Patricia
description: Wprowadzenie do drzewa Merkle Patricia.
lang: pl
sidebarDepth: 2
---

Stan Ethereum (całość wszystkich kont, sald i inteligentnych kontraktów) jest zakodowany w specjalnej wersji struktury danych, znanej w informatyce jako drzewo Merkle. Struktura ta jest przydatna w wielu zastosowaniach w kryptografii, ponieważ tworzy weryfikowalną relację między wszystkimi pojedynczymi fragmentami danych splątanymi w drzewie, co skutkuje pojedynczą wartością **korzenia**, która może być użyta do udowodnienia różnych kwestii dotyczących danych.

Struktura danych Ethereum to „zmodyfikowane drzewo Merkle-Patricia”, nazwane tak, ponieważ czerpie niektóre cechy z PATRICIA (ang. Practical Algorithm To Retrieve Information Coded in Alphanumeric) i ponieważ jest zaprojektowana do wydajnego odzyskiwania (ang. re**trie**val) danych, które składają się na stan Ethereum.

Drzewo Merkle-Patricia jest deterministyczne i weryfikowalne kryptograficznie: jedynym sposobem na wygenerowanie korzenia stanu jest obliczenie go z każdego pojedynczego elementu stanu, a identyczność dwóch stanów można łatwo udowodnić, porównując hasz korzenia i hasze, które do niego doprowadziły (_dowód Merklego_). I odwrotnie, nie ma sposobu na stworzenie dwóch różnych stanów o tym samym haszu korzenia, a każda próba modyfikacji stanu za pomocą różnych wartości spowoduje powstanie innego haszu korzenia stanu. Teoretycznie struktura ta zapewnia „święty Graal” wydajności `O(log(n))` dla operacji wstawiania, wyszukiwania i usuwania.

W niedalekiej przyszłości Ethereum planuje migrację do struktury [drzewa Verkle](/roadmap/verkle-trees), co otworzy wiele nowych możliwości przyszłych ulepszeń protokołu.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, pomocna będzie podstawowa znajomość [haszy](https://en.wikipedia.org/wiki/Hash_function), [drzew Merklego](https://en.wikipedia.org/wiki/Merkle_tree), [drzew prefiksowych (tries)](https://en.wikipedia.org/wiki/Trie) i [serializacji](https://en.wikipedia.org/wiki/Serialization). Ten artykuł rozpoczyna się od opisu podstawowego [drzewa pozycyjnego (radix)](https://en.wikipedia.org/wiki/Radix_tree), a następnie stopniowo wprowadza modyfikacje niezbędne dla bardziej zoptymalizowanej struktury danych Ethereum.

## Podstawowe drzewa pozycyjne {#basic-radix-tries}

W podstawowym drzewie pozycyjnym każdy węzeł wygląda następująco:

```
    [i_0, i_1 ... i_n, wartość]
```

Gdzie `i_0 ...  `i_n`reprezentują symbole alfabetu (często binarnego lub szesnastkowego),`wartość`jest wartością końcową w węźle, a wartości w`i_0, i_1 ...` `i_n`slotach są albo`NULL`, albo wskaźnikami (w naszym przypadku haszami) do innych węzłów. Tworzy to podstawowy magazyn `(klucz, wartość)\`.

Załóżmy, że chcesz użyć struktury danych drzewa pozycyjnego do utrwalenia porządku w zbiorze par klucz-wartość. Aby znaleźć wartość aktualnie przypisaną do klucza `dog` w drzewie, należy najpierw przekonwertować `dog` na litery alfabetu (co daje `64 6f 67`), a następnie zejść w dół drzewa, podążając tą ścieżką, aż do znalezienia wartości. Oznacza to, że zaczynasz od wyszukania haszu korzenia w płaskiej bazie danych klucz/wartość, aby znaleźć węzeł główny drzewa. Jest on reprezentowany jako tablica kluczy wskazujących na inne węzły. Użyjesz wartości o indeksie `6` jako klucza i wyszukasz ją w płaskiej bazie danych klucz/wartość, aby uzyskać węzeł o jeden poziom niżej. Następnie wybierz indeks `4`, aby wyszukać następną wartość, potem indeks `6` i tak dalej, aż po przejściu ścieżki: `korzeń -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, odszukasz wartość węzła i zwrócisz wynik.

Istnieje różnica między wyszukiwaniem czegoś w „drzewie” a podstawową płaską „bazą danych” klucz/wartość. Oba definiują układy klucz/wartość, ale podstawowa baza danych może wykonać tradycyjne 1-etapowe wyszukiwanie klucza. Wyszukanie klucza w drzewie wymaga wielokrotnego wyszukiwania w podstawowej bazie danych, aby dotrzeć do ostatecznej wartości opisanej powyżej. Aby wyeliminować niejednoznaczność, będziemy nazywać to drugie `ścieżką`.

Operacje aktualizacji i usuwania dla drzew pozycyjnych można zdefiniować w następujący sposób:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Drzewo pozycyjne „Merkle” jest zbudowane przez łączenie węzłów przy użyciu deterministycznie generowanych kryptograficznych skrótów haszujących. To adresowanie treści (w bazie danych klucz/wartość `klucz == keccak256(rlp(wartość))`) zapewnia kryptograficzną gwarancję integralności przechowywanych danych. Jeśli hasz korzenia danego drzewa jest publicznie znany, każdy, kto ma dostęp do danych bazowych liści, może skonstruować dowód, że drzewo zawiera daną wartość w określonej ścieżce, podając hasze każdego węzła łączącego określoną wartość z korzeniem drzewa.

Atakujący nie może przedstawić dowodu na parę `(ścieżka, wartość)`, która nie istnieje, ponieważ hasz korzenia jest ostatecznie oparty na wszystkich haszach znajdujących się pod nim. Każda modyfikacja bazowa zmieniłaby hasz korzenia. Można myśleć o haszu jako o skompresowanej reprezentacji informacji strukturalnych o danych, zabezpieczonej przez ochronę przeciwobrazu funkcji haszującej.

Będziemy odnosić się do jednostki atomowej drzewa pozycyjnego (np. pojedynczego znaku szesnastkowego lub 4-bitowej liczby binarnej) jako „półbajtu”. Podczas przechodzenia ścieżki po jednym półbajcie na raz, jak opisano powyżej, węzły mogą odnosić się maksymalnie do 16 potomków, ale zawierają element `wartość`. Dlatego reprezentujemy je jako tablicę o długości 17. Nazywamy te 17-elementowe tablice „węzłami gałęzi”.

## Drzewo Merkle Patricia {#merkle-patricia-trees}

Drzewa pozycyjne mają jedno poważne ograniczenie: są nieefektywne. Jeśli chcesz przechować jedno powiązanie `(ścieżka, wartość)`, gdzie ścieżka, podobnie jak w Ethereum, ma 64 znaki długości (liczba półbajtów w `bytes32`), będziemy potrzebować ponad kilobajt dodatkowej przestrzeni na przechowanie jednego poziomu na znak, a każde wyszukiwanie lub usuwanie zajmie pełne 64 kroki. Drzewo Patricia wprowadzone w dalszej części rozwiązuje ten problem.

### Optymalizacja {#optimization}

Węzeł w drzewie Merkle Patricia jest jednym z następujących:

1. `NULL` (reprezentowany jako pusty ciąg znaków)
2. `gałąź` 17-elementowy węzeł `[ v0 ...` `v15, vt ]`
3. `liść` 2-elementowy węzeł `[ zakodowanaŚcieżka, wartość ]`
4. `rozszerzenie` 2-elementowy węzeł `[ zakodowanaŚcieżka, klucz ]`

Przy ścieżkach o długości 64 znaków nieuniknione jest, że po przejściu przez kilka pierwszych warstw drzewa dotrzemy do węzła, w którym przez przynajmniej część drogi w dół nie istnieje żadna rozbieżna ścieżka. Aby uniknąć konieczności tworzenia do 15 rzadkich węzłów `NULL` wzdłuż ścieżki, skracamy drogę, tworząc węzeł `rozszerzenia` w formie `[ zakodowanaŚcieżka, klucz ]`, gdzie `zakodowanaŚcieżka` zawiera „częściową ścieżkę” do pominięcia (używając kompaktowego kodowania opisanego poniżej), a `klucz` służy do następnego wyszukiwania w bazie danych.

W przypadku węzła `liścia`, który może być oznaczony flagą w pierwszym półbajcie `zakodowanejŚcieżki`, ścieżka koduje wszystkie fragmenty ścieżek poprzednich węzłów i możemy bezpośrednio wyszukać `wartość`.

Powyższa optymalizacja wprowadza jednak niejednoznaczność.

Podczas przechodzenia ścieżek w półbajtach możemy skończyć z nieparzystą liczbą półbajtów do przejścia, ale ponieważ wszystkie dane są przechowywane w formacie `bajtów`. Nie jest możliwe rozróżnienie, na przykład, półbajtu `1` od półbajtów `01` (oba muszą być przechowywane jako `<01>`). Aby określić nieparzystą długość, częściowa ścieżka jest poprzedzona flagą.

### Specyfikacja: Kompaktowe kodowanie sekwencji szesnastkowej z opcjonalnym terminatorem {#specification}

Oznaczanie zarówno _nieparzystej vs. parzystej pozostałej długości częściowej ścieżki_, jak i _węzła liścia vs. rozszerzenia_, jak opisano powyżej, znajduje się w pierwszym półbajcie częściowej ścieżki dowolnego 2-elementowego węzła. Skutkują one następującymi:

| znak hex | bity | częściowy typ węzła                | długość ścieżki |
| -------- | ---- | ---------------------------------- | --------------- |
| 0        | 0000 | rozszerzenie                       | parzysta        |
| 1        | 0001 | rozszerzenie                       | nieparzysta     |
| 2        | 0010 | kończący (liść) | parzysta        |
| 3        | 0011 | kończący (liść) | nieparzysta     |

Dla parzystej pozostałej długości ścieżki (`0` lub `2`) zawsze następuje kolejny `0` „dopełniający” półbajt.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray now has an even length whose first nibble is the flags.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Przykłady:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Oto rozszerzony kod do pobierania węzła w drzewie Merkle Patricia:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Przykładowe drzewo {#example-trie}

Załóżmy, że chcemy mieć drzewo zawierające cztery pary ścieżka/wartość `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Najpierw konwertujemy zarówno ścieżki, jak i wartości na `bajty`. Poniżej, rzeczywiste reprezentacje bajtowe dla _ścieżek_ są oznaczone przez `<>`, chociaż _wartości_ są nadal pokazane jako ciągi znaków, oznaczone przez `''`, dla łatwiejszego zrozumienia (one również w rzeczywistości byłyby `bajtami`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Teraz budujemy takie drzewo z następującymi parami klucz/wartość w podstawowej bazie danych:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Gdy jeden węzeł jest przywoływany wewnątrz innego węzła, to, co jest dołączane, to `keccak256(rlp.encode(node))`, jeśli `len(rlp.encode(node)) >= 32`, w przeciwnym razie `node`, gdzie `rlp.encode` to funkcja kodowania [RLP](/developers/docs/data-structures-and-encoding/rlp).

Należy pamiętać, że podczas aktualizacji drzewa należy zapisać parę klucz/wartość `(keccak256(x), x)` w trwałej tabeli przeglądowej, _jeśli_ nowo utworzony węzeł ma długość >= 32. Jeśli jednak węzeł jest krótszy, nie trzeba niczego przechowywać, ponieważ funkcja f(x) = x jest odwracalna.

## Drzewa w Ethereum {#tries-in-ethereum}

Wszystkie drzewa Merklego w warstwie wykonawczej Ethereum wykorzystują drzewo Merkle Patricia.

Z nagłówka bloku pochodzą 3 korzenie z 3 takich drzew.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### Drzewo stanu {#state-trie}

Istnieje jedno globalne drzewo stanu, które jest aktualizowane za każdym razem, gdy klient przetwarza blok. W nim `ścieżka` to zawsze: `keccak256(adresEthereum)`, a `wartość` to zawsze: `rlp(kontoEthereum)`. Dokładniej, `konto` Ethereum to 4-elementowa tablica `[nonce,balance,storageRoot,codeHash]`. W tym momencie warto zauważyć, że ten `storageRoot` jest korzeniem innego drzewa Patricia:

### Drzewo przechowywania {#storage-trie}

Drzewo przechowywania to miejsce, w którym znajdują się _wszystkie_ dane kontraktu. Dla każdego konta istnieje oddzielne drzewo przechowywania. Aby pobrać wartości na określonych pozycjach przechowywania pod danym adresem, wymagany jest adres przechowywania, pozycja całkowita przechowywanych danych w magazynie oraz identyfikator bloku. Można je następnie przekazać jako argumenty do `eth_getStorageAt` zdefiniowanego w API JSON-RPC, np. aby pobrać dane ze slotu 0 przechowywania dla adresu `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Pobieranie innych elementów z magazynu jest nieco bardziej skomplikowane, ponieważ najpierw należy obliczyć pozycję w drzewie przechowywania. Pozycja jest obliczana jako hasz `keccak256` adresu i pozycji w magazynie, oba dopełnione z lewej strony zerami do długości 32 bajtów. Na przykład pozycja danych w slocie 1 przechowywania dla adresu `0x391694e7e0b0cce554cb130d723a9d27458f9298` to:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

W konsoli Geth można to obliczyć w następujący sposób:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

`Ścieżka` jest zatem `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Można to teraz wykorzystać do pobrania danych z drzewa przechowywania, tak jak poprzednio:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Uwaga: `storageRoot` dla konta Ethereum jest domyślnie pusty, jeśli nie jest to konto kontraktu.

### Drzewo transakcji {#transaction-trie}

Dla każdego bloku istnieje osobne drzewo transakcji, przechowujące pary `(klucz, wartość)`. Ścieżka tutaj to: `rlp(indeksTransakcji)`, która reprezentuje klucz odpowiadający wartości określonej przez:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Więcej informacji na ten temat można znaleźć w dokumentacji [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Drzewo potwierdzeń {#receipts-trie}

Każdy blok ma własne drzewo potwierdzeń. `Ścieżka` tutaj to: `rlp(indeksTransakcji)`. `indeksTransakcji` to jego indeks w bloku, w którym został zawarty. Drzewo potwierdzeń nigdy nie jest aktualizowane. Podobnie jak w drzewie transakcji, istnieją bieżące i starsze potwierdzenia. Aby wyszukać określone potwierdzenie w drzewie potwierdzeń, wymagany jest indeks transakcji w jej bloku, ładunek potwierdzenia oraz typ transakcji. Zwrócone potwierdzenie może być typu `Receipt`, który jest zdefiniowany jako konkatenacja `TransactionType` i `ReceiptPayload` lub może być typu `LegacyReceipt`, który jest zdefiniowany jako `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Więcej informacji na ten temat można znaleźć w dokumentacji [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Dalsza lektura {#further-reading}

- [Zmodyfikowane drzewo Merkle Patricia — jak Ethereum zapisuje stan](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling w Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Zrozumieć drzewo Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
