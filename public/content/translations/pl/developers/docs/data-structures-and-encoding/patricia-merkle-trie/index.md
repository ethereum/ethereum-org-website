---
title: Drzewo Merkle Patricia
description: Wprowadzenie do drzewa Merkle Patricia.
lang: pl
sidebarDepth: 2
---

Stan [Ethereum](/) (ogół wszystkich kont, sald i inteligentnych kontraktów) jest zakodowany w specjalnej wersji struktury danych znanej ogólnie w informatyce jako drzewo Merklego. Struktura ta jest przydatna w wielu zastosowaniach w kryptografii, ponieważ tworzy weryfikowalną relację między wszystkimi pojedynczymi fragmentami danych powiązanymi w drzewie, co daje pojedynczą wartość **korzenia** (root), która może być użyta do udowodnienia informacji o danych.

Struktura danych Ethereum to „zmodyfikowane drzewo Merkle Patricia”, nazwane tak, ponieważ zapożycza niektóre cechy algorytmu PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) i ponieważ jest zaprojektowana do wydajnego odzyskiwania (re**trie**val) danych elementów, które składają się na stan Ethereum.

Drzewo Merkle Patricia jest deterministyczne i kryptograficznie weryfikowalne: jedynym sposobem na wygenerowanie korzenia stanu jest obliczenie go z każdego pojedynczego fragmentu stanu, a to, że dwa stany są identyczne, można łatwo udowodnić, porównując hash korzenia i hashe, które do niego doprowadziły (_dowód Merklego_). Z drugiej strony, nie ma możliwości utworzenia dwóch różnych stanów z tym samym hashem korzenia, a każda próba modyfikacji stanu za pomocą innych wartości spowoduje powstanie innego hasha korzenia stanu. Teoretycznie struktura ta zapewnia „świętego Graala” wydajności `O(log(n))` dla wstawiania, wyszukiwania i usuwania.

W niedalekiej przyszłości Ethereum planuje migrację do struktury [drzewa Verkle](/roadmap/verkle-trees), co otworzy wiele nowych możliwości dla przyszłych ulepszeń protokołu.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, pomocna będzie podstawowa wiedza na temat [hashy](https://en.wikipedia.org/wiki/Hash_function), [drzew Merklego](https://en.wikipedia.org/wiki/Merkle_tree), [drzew trie](https://en.wikipedia.org/wiki/Trie) i [serializacji](https://en.wikipedia.org/wiki/Serialization). Ten artykuł zaczyna się od opisu podstawowego [drzewa radix](https://en.wikipedia.org/wiki/Radix_tree), a następnie stopniowo wprowadza modyfikacje niezbędne dla bardziej zoptymalizowanej struktury danych Ethereum.

## Podstawowe drzewa radix {#basic-radix-tries}

W podstawowym drzewie radix każdy węzeł wygląda następująco:

```
[i_0, i_1 ... i_n, value]
```

Gdzie `i_0 ... i_n` reprezentują symbole alfabetu (często binarne lub szesnastkowe), `value` jest wartością końcową w węźle, a wartości w slotach `i_0, i_1 ... i_n` to albo `NULL`, albo wskaźniki do (w naszym przypadku hashe) innych węzłów. Tworzy to podstawowy magazyn `(key, value)`.

Załóżmy, że chcesz użyć struktury danych drzewa radix do zachowania porządku w zbiorze par klucz-wartość. Aby znaleźć wartość aktualnie zmapowaną do klucza `dog` w drzewie trie, najpierw przekonwertowałbyś `dog` na litery alfabetu (otrzymując `64 6f 67`), a następnie schodziłbyś w dół drzewa podążając tą ścieżką, aż znajdziesz wartość. Oznacza to, że zaczynasz od wyszukania hasha korzenia w płaskiej bazie danych klucz/wartość, aby znaleźć węzeł główny drzewa trie. Jest on reprezentowany jako tablica kluczy wskazujących na inne węzły. Użyłbyś wartości pod indeksem `6` jako klucza i wyszukałbyś ją w płaskiej bazie danych klucz/wartość, aby uzyskać węzeł o jeden poziom niżej. Następnie wybrałbyś indeks `4`, aby wyszukać następną wartość, potem indeks `6` i tak dalej, aż po przejściu ścieżki: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, sprawdziłbyś wartość węzła i zwrócił wynik.

Istnieje różnica między wyszukiwaniem czegoś w „drzewie trie” a w bazowej płaskiej „bazie danych” klucz/wartość. Obie definiują układy klucz/wartość, ale bazowa baza danych może wykonać tradycyjne, jednoetapowe wyszukiwanie klucza. Wyszukiwanie klucza w drzewie trie wymaga wielu wyszukiwań w bazowej bazie danych, aby dotrzeć do ostatecznej wartości opisanej powyżej. Nazwijmy to drugie `path`, aby wyeliminować niejednoznaczność.

Operacje aktualizacji i usuwania dla drzew radix można zdefiniować następująco:

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

Drzewo radix „Merklego” jest budowane poprzez łączenie węzłów za pomocą deterministycznie generowanych kryptograficznych skrótów (hashy). To adresowanie treścią (w bazie danych klucz/wartość `key == keccak256(rlp(value))`) zapewnia kryptograficzną gwarancję integralności przechowywanych danych. Jeśli hash korzenia danego drzewa trie jest publicznie znany, to każdy, kto ma dostęp do bazowych danych liści, może skonstruować dowód, że drzewo trie zawiera daną wartość na określonej ścieżce, dostarczając hashe każdego węzła łączącego określoną wartość z korzeniem drzewa.

Niemożliwe jest, aby atakujący dostarczył dowód na istnienie pary `(path, value)`, która nie istnieje, ponieważ hash korzenia ostatecznie opiera się na wszystkich hashach poniżej niego. Jakakolwiek modyfikacja u podstaw zmieniłaby hash korzenia. Możesz myśleć o hashu jako o skompresowanej reprezentacji informacji strukturalnych o danych, zabezpieczonej przez ochronę przed znalezieniem przeciwobrazu funkcji haszującej.

Będziemy odnosić się do atomowej jednostki drzewa radix (np. pojedynczego znaku szesnastkowego lub 4-bitowej liczby binarnej) jako „półbajtu” (nibble). Podczas przemierzania ścieżki po jednym półbajcie na raz, jak opisano powyżej, węzły mogą maksymalnie odnosić się do 16 dzieci, ale zawierają element `value`. Dlatego reprezentujemy je jako tablicę o długości 17. Nazywamy te 17-elementowe tablice „węzłami gałęzi” (branch nodes).

## Drzewo Merkle Patricia {#merkle-patricia-trees}

Drzewa radix mają jedno główne ograniczenie: są nieefektywne. Jeśli chcesz przechować jedno powiązanie `(path, value)`, gdzie ścieżka, tak jak w Ethereum, ma 64 znaki długości (liczba półbajtów w `bytes32`), będziemy potrzebować ponad kilobajta dodatkowego miejsca na przechowanie jednego poziomu na znak, a każde wyszukiwanie lub usunięcie zajmie pełne 64 kroki. Drzewo Patricia wprowadzone poniżej rozwiązuje ten problem.

### Optymalizacja {#optimization}

Węzeł w drzewie Merkle Patricia to jeden z poniższych:

1.  `NULL` (reprezentowany jako pusty ciąg znaków)
2.  `branch` 17-elementowy węzeł `[ v0 ... v15, vt ]`
3.  `leaf` 2-elementowy węzeł `[ encodedPath, value ]`
4.  `extension` 2-elementowy węzeł `[ encodedPath, key ]`

Przy 64-znakowych ścieżkach jest nieuniknione, że po przejściu pierwszych kilku warstw drzewa trie dotrzesz do węzła, w którym nie istnieje żadna rozbieżna ścieżka przez co najmniej część drogi w dół. Aby uniknąć konieczności tworzenia do 15 rzadkich węzłów `NULL` wzdłuż ścieżki, skracamy zejście, konfigurując węzeł `extension` w postaci `[ encodedPath, key ]`, gdzie `encodedPath` zawiera „częściową ścieżkę” do przeskoczenia (przy użyciu kompaktowego kodowania opisanego poniżej), a `key` służy do następnego wyszukiwania w bazie danych.

W przypadku węzła `leaf`, który może być oznaczony flagą w pierwszym półbajcie `encodedPath`, ścieżka koduje wszystkie fragmenty ścieżki poprzedniego węzła i możemy bezpośrednio wyszukać `value`.

Powyższa optymalizacja wprowadza jednak niejednoznaczność.

Przemierzając ścieżki w półbajtach, możemy skończyć z nieparzystą liczbą półbajtów do przejścia, ale ponieważ wszystkie dane są przechowywane w formacie `bytes`, nie jest możliwe odróżnienie na przykład półbajtu `1` od półbajtów `01` (oba muszą być przechowywane jako `<01>`). Aby określić nieparzystą długość, częściowa ścieżka jest poprzedzona flagą.

### Specyfikacja: Kompaktowe kodowanie sekwencji szesnastkowej z opcjonalnym terminatorem {#specification}

Oznaczanie flagami zarówno _nieparzystej vs. parzystej pozostałej długości częściowej ścieżki_, jak i _węzła liścia vs. węzła rozszerzenia_, jak opisano powyżej, znajduje się w pierwszym półbajcie częściowej ścieżki dowolnego 2-elementowego węzła. Skutkuje to następującym układem:

| znak hex | bity | typ węzła częściowego | długość ścieżki |
| -------- | ---- | --------------------- | --------------- |
| 0        | 0000 | rozszerzenie          | parzysta        |
| 1        | 0001 | rozszerzenie          | nieparzysta     |
| 2        | 0010 | kończący (liść)       | parzysta        |
| 3        | 0011 | kończący (liść)       | nieparzysta     |

W przypadku parzystej pozostałej długości ścieżki (`0` lub `2`), zawsze będzie po niej następował kolejny półbajt „wypełniający” (padding) `0`.

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
        # hexarray ma teraz parzystą długość, a jego pierwszy półbajt to flagi.
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

### Przykładowe drzewo trie {#example-trie}

Załóżmy, że chcemy mieć drzewo trie zawierające cztery pary ścieżka/wartość `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Najpierw konwertujemy zarówno ścieżki, jak i wartości na `bytes`. Poniżej rzeczywiste reprezentacje bajtowe dla _ścieżek_ są oznaczone przez `<>`, chociaż _wartości_ są nadal pokazywane jako ciągi znaków, oznaczone przez `''`, dla łatwiejszego zrozumienia (one również byłyby w rzeczywistości `bytes`):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Teraz budujemy takie drzewo trie z następującymi parami klucz/wartość w bazowej bazie danych:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Kiedy jeden węzeł jest odwoływany wewnątrz innego węzła, to co jest dołączane to `keccak256(rlp.encode(node))`, jeśli `len(rlp.encode(node)) >= 32`, w przeciwnym razie `node`, gdzie `rlp.encode` jest funkcją kodującą [RLP](/developers/docs/data-structures-and-encoding/rlp).

Zauważ, że podczas aktualizacji drzewa trie należy zapisać parę klucz/wartość `(keccak256(x), x)` w trwałej tabeli wyszukiwania, _jeśli_ nowo utworzony węzeł ma długość >= 32. Jeśli jednak węzeł jest krótszy, nie trzeba niczego zapisywać, ponieważ funkcja f(x) = x jest odwracalna.

## Drzewa trie w Ethereum {#tries-in-ethereum}

Wszystkie drzewa Merklego w warstwie wykonawczej Ethereum używają drzewa Merkle Patricia.

Z nagłówka bloku pochodzą 3 korzenie z 3 takich drzew trie.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Drzewo stanu {#state-trie}

Istnieje jedno globalne drzewo stanu i jest ono aktualizowane za każdym razem, gdy klient przetwarza blok. W nim `path` to zawsze: `keccak256(ethereumAddress)`, a `value` to zawsze: `rlp(ethereumAccount)`. Dokładniej mówiąc, `account` w Ethereum to 4-elementowa tablica `[nonce,balance,storageRoot,codeHash]`. W tym miejscu warto zauważyć, że ten `storageRoot` jest korzeniem kolejnego drzewa Patricia:

### Drzewo trie pamięci {#storage-trie}

Drzewo trie pamięci to miejsce, w którym znajdują się _wszystkie_ dane kontraktu. Dla każdego konta istnieje oddzielne drzewo trie pamięci. Aby pobrać wartości na określonych pozycjach pamięci pod danym adresem, wymagany jest adres pamięci, całkowita pozycja przechowywanych danych w pamięci oraz identyfikator bloku. Można je następnie przekazać jako argumenty do `eth_getStorageAt` zdefiniowanego w API JSON-RPC, np. aby pobrać dane w slocie pamięci 0 dla adresu `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Pobieranie innych elementów z pamięci jest nieco bardziej skomplikowane, ponieważ najpierw należy obliczyć pozycję w drzewie trie pamięci. Pozycja jest obliczana jako hash `keccak256` adresu i pozycji w pamięci, oba dopełnione z lewej strony zerami do długości 32 bajtów. Na przykład pozycja dla danych w slocie pamięci 1 dla adresu `0x391694e7e0b0cce554cb130d723a9d27458f9298` to:

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

`path` to zatem `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Można to teraz wykorzystać do pobrania danych z drzewa trie pamięci, tak jak poprzednio:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Uwaga: `storageRoot` dla konta Ethereum jest domyślnie puste, jeśli nie jest to konto kontraktu.

### Drzewo trie transakcji {#transaction-trie}

Dla każdego bloku istnieje oddzielne drzewo trie transakcji, ponownie przechowujące pary `(key, value)`. Ścieżka tutaj to: `rlp(transactionIndex)`, co reprezentuje klucz odpowiadający wartości określonej przez:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Więcej informacji na ten temat można znaleźć w dokumentacji [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Drzewo trie pokwitowań {#receipts-trie}

Każdy blok ma swoje własne drzewo trie pokwitowań. `path` tutaj to: `rlp(transactionIndex)`. `transactionIndex` to jego indeks w bloku, w którym został zawarty. Drzewo trie pokwitowań nigdy nie jest aktualizowane. Podobnie jak w przypadku drzewa trie transakcji, istnieją obecne i starsze (legacy) pokwitowania. Aby zapytać o konkretne pokwitowanie w drzewie trie pokwitowań, wymagany jest indeks transakcji w jej bloku, ładunek (payload) pokwitowania i typ transakcji. Zwrócone pokwitowanie może być typu `Receipt`, co jest zdefiniowane jako konkatenacja `TransactionType` i `ReceiptPayload`, lub może być typu `LegacyReceipt`, co jest zdefiniowane jako `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Więcej informacji na ten temat można znaleźć w dokumentacji [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Dalsza lektura {#further-reading}

- [Zmodyfikowane drzewo Merkle Patricia — jak Ethereum zapisuje stan](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling w Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Zrozumienie drzewa trie w Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)