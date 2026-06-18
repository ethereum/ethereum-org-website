---
title: Dowody Merkle'a dla integralności danych offline
description: Zapewnienie integralności danych onchain dla danych, które są przechowywane głównie pozałańcuchowo
author: Ori Pomerantz
tags: ["przechowywanie"]
skill: advanced
breadcrumb: Dowody Merkle'a
lang: pl
published: 2021-12-30
---

## Wprowadzenie {#introduction}

W idealnym przypadku chcielibyśmy przechowywać wszystko w pamięci masowej Ethereum, która jest rozproszona na tysiącach komputerów i charakteryzuje się niezwykle wysoką dostępnością (dane nie mogą być cenzurowane) oraz integralnością (dane nie mogą być modyfikowane w nieautoryzowany sposób), ale przechowywanie 32-bajtowego słowa kosztuje zazwyczaj 20 000 gazu. W momencie pisania tego tekstu koszt ten jest równy 6,60 USD. Przy cenie 21 centów za bajt jest to zbyt drogie dla wielu zastosowań.

Aby rozwiązać ten problem, ekosystem Ethereum opracował [wiele alternatywnych sposobów na zdecentralizowane przechowywanie danych](/developers/docs/storage/). Zazwyczaj wiążą się one z kompromisem między dostępnością a ceną. Jednak integralność jest zazwyczaj zapewniona.

W tym artykule dowiesz się, **jak** zapewnić integralność danych bez przechowywania ich na blockchainie, wykorzystując [dowody Merkle'a](https://computersciencewiki.org/index.php/Merkle_proof).

## Jak to działa? {#how-does-it-work}

W teorii moglibyśmy po prostu przechowywać hash danych onchain i wysyłać wszystkie dane w transakcjach, które tego wymagają. Jednak to wciąż jest zbyt drogie. Bajt danych w transakcji kosztuje około 16 gazu, co obecnie wynosi około pół centa, czyli około 5 USD za kilobajt. Przy cenie 5000 USD za megabajt jest to nadal zbyt drogie dla wielu zastosowań, nawet bez dodatkowych kosztów haszowania danych.

Rozwiązaniem jest wielokrotne haszowanie różnych podzbiorów danych, dzięki czemu dla danych, których nie musisz wysyłać, możesz po prostu wysłać hash. Robi się to za pomocą drzewa Merklego, struktury danych w postaci drzewa, w której każdy węzeł jest hashem węzłów znajdujących się poniżej:

![Merkle Tree](tree.png)

Hash korzenia to jedyna część, która musi być przechowywana onchain. Aby udowodnić określoną wartość, dostarczasz wszystkie hashe, które muszą zostać z nią połączone, aby uzyskać korzeń. Na przykład, aby udowodnić `C`, dostarczasz `D`, `H(A-B)` oraz `H(E-H)`.

![Proof of the value of C](proof-c.png)

## Implementacja {#implementation}

[Przykładowy kod jest dostępny tutaj](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Kod pozałańcuchowy {#offchain-code}

W tym artykule używamy języka JavaScript do obliczeń pozałańcuchowych. Większość zdecentralizowanych aplikacji ma swój komponent pozałańcuchowy w języku JavaScript.

#### Tworzenie korzenia drzewa Merklego {#creating-the-merkle-root}

Najpierw musimy dostarczyć korzeń drzewa Merklego do łańcucha.

```javascript
const ethers = require("ethers")
```

[Używamy funkcji skrótu z pakietu ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// Surowe dane, których integralność musimy zweryfikować. Pierwsze dwa bajty s
// ą identyfikatorem użytkownika, a ostatnie dwa bajty to liczba tokenów, które
// użytkownik obecnie posiada.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Kodowanie każdego wpisu jako pojedynczej 256-bitowej liczby całkowitej skutkuje mniej czytelnym kodem niż na przykład użycie JSON. Oznacza to jednak znacznie mniej przetwarzania w celu odzyskania danych w kontrakcie, a co za tym idzie, znacznie niższe koszty gazu. [Możesz odczytywać JSON onchain](https://github.com/chrisdotn/jsmnSol), ale jest to po prostu zły pomysł, jeśli można tego uniknąć.

```javascript
// Tablica wartości hash, jako BigInty
const hashArray = dataArray
```

W tym przypadku nasze dane to od samego początku wartości 256-bitowe, więc żadne przetwarzanie nie jest potrzebne. Jeśli użyjemy bardziej skomplikowanej struktury danych, takiej jak ciągi znaków, musimy upewnić się, że najpierw zhaszujemy dane, aby uzyskać tablicę hashów. Zauważ, że wynika to również z faktu, że nie zależy nam na tym, czy użytkownicy znają informacje innych użytkowników. W przeciwnym razie musielibyśmy użyć haszowania w taki sposób, aby użytkownik 1 nie znał wartości dla użytkownika 0, użytkownik 2 nie znał wartości dla użytkownika 3 itd.

```javascript
// Konwersja między ciągiem znaków, którego oczekuje funkcja skrótu, a
// BigIntem, którego używamy wszędzie indziej.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

Funkcja skrótu z pakietu ethers oczekuje ciągu znaków JavaScript z liczbą szesnastkową, takiego jak `0x60A7`, i odpowiada innym ciągiem znaków o tej samej strukturze. Jednak w pozostałej części kodu łatwiej jest używać `BigInt`, więc konwertujemy na ciąg szesnastkowy i z powrotem.

```javascript
// Symetryczny hash pary, dzięki czemu nie będzie nas obchodzić, czy kolejność jest odwrócona.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Ta funkcja jest symetryczna (hash z a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Oznacza to, że podczas sprawdzania dowodu Merkle'a nie musimy się martwić, czy umieścić wartość z dowodu przed, czy po obliczonej wartości. Sprawdzanie dowodu Merkle'a odbywa się onchain, więc im mniej musimy tam zrobić, tym lepiej.

> Ostrzeżenie:
> Kryptografia jest trudniejsza, niż się wydaje.
> Początkowa wersja tego artykułu zawierała funkcję skrótu `hash(a^b)`.
> To był **zły** pomysł, ponieważ oznaczało to, że znając prawidłowe wartości `a` i `b`, można było użyć `b' = a^b^a'` do udowodnienia dowolnej pożądanej wartości `a'`.
> Przy użyciu tej funkcji musiałbyś obliczyć `b'` w taki sposób, aby `hash(a') ^ hash(b')` było równe znanej wartości (kolejnej gałęzi w drodze do korzenia), co jest znacznie trudniejsze.

```javascript
// Wartość oznaczająca, że dana gałąź jest pusta, nie
// ma wartości
const empty = 0n
```

Gdy liczba wartości nie jest całkowitą potęgą dwójki, musimy obsłużyć puste gałęzie. Ten program robi to, wstawiając zero jako symbol zastępczy.

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// Oblicz jeden poziom w górę drzewa tablicy hash, obliczając hash
// każdej pary po kolei
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Aby uniknąć nadpisania danych wejściowych // Dodaj pustą wartość, jeśli to konieczne (potrzebujemy, aby wszystkie liście były // sparowane)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Ta funkcja „wspina się” o jeden poziom w drzewie Merklego, haszując pary wartości na bieżącej warstwie. Zauważ, że nie jest to najbardziej wydajna implementacja; moglibyśmy uniknąć kopiowania danych wejściowych i po prostu dodać `hashEmpty` w odpowiednim miejscu w pętli, ale ten kod został zoptymalizowany pod kątem czytelności.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Wspinaj się w górę drzewa, aż zostanie tylko jedna wartość, czyli // korzeń. // // Jeśli warstwa ma nieparzystą liczbę wpisów, // kod w oneLevelUp dodaje pustą wartość, więc jeśli mamy na przykład // 10 liści, będziemy mieli 5 gałęzi w drugiej warstwie, 3 // gałęzie w trzeciej, 2 w czwartej, a korzeń jest piąty

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Aby uzyskać korzeń, wspinaj się, aż pozostanie tylko jedna wartość.

#### Tworzenie dowodu Merkle'a {#creating-a-merkle-proof}

Dowód Merkle'a to wartości, które należy zhaszować razem z udowadnianą wartością, aby odzyskać korzeń drzewa Merklego. Wartość do udowodnienia jest często dostępna z innych danych, więc wolę podawać ją oddzielnie, a nie jako część kodu.

```javascript
// Dowód Merkle'a składa się z wartości z listy wpisów do
// haszowania. Ponieważ używamy symetrycznej funkcji skrótu, nie
// potrzebujemy lokalizacji elementu, aby zweryfikować dowód, a jedynie do jego utworzenia
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Aż dotrzemy na sam szczyt
    while (currentLayer.length > 1) {
        // Brak warstw o nieparzystej długości
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Jeśli currentN jest nieparzyste, dodaj wartość przed nim do dowodu
            ? currentLayer[currentN-1]
               // Jeśli jest parzyste, dodaj wartość po nim
            : currentLayer[currentN+1])

```

Haszujemy `(v[0],v[1])`, `(v[2],v[3])` itd. Zatem dla wartości parzystych potrzebujemy następnej, a dla nieparzystych – poprzedniej.

```javascript
        // Przejdź do następnej warstwy w górę
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Kod onchain {#onchain-code}

Na koniec mamy kod, który sprawdza dowód. Kod onchain jest napisany w języku [Solidity](https://docs.soliditylang.org/en/v0.8.11/). Optymalizacja jest tutaj znacznie ważniejsza, ponieważ gaz jest stosunkowo drogi.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Napisałem to przy użyciu [środowiska programistycznego Hardhat](https://hardhat.org/), które pozwala nam na [wyświetlanie danych w konsoli z poziomu Solidity](https://hardhat.org/docs/cookbook/debug-logs) podczas programowania.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Niezwykle niebezpieczne, w kodzie produkcyjnym dostęp do
    // tej funkcji MUSI BYĆ ściśle ograniczony, prawdopodobnie do
    // właściciela
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Funkcje ustawiające (set) i pobierające (get) dla korzenia drzewa Merklego. Pozwolenie każdemu na aktualizację korzenia drzewa Merklego to _niezwykle zły pomysł_ w systemie produkcyjnym. Robię to tutaj dla uproszczenia przykładowego kodu. **Nie rób tego w systemie, w którym integralność danych ma rzeczywiste znaczenie**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Ta funkcja generuje hash pary. Jest to po prostu tłumaczenie na Solidity kodu JavaScript dla `hash` i `pairHash`.

**Uwaga:** To kolejny przypadek optymalizacji pod kątem czytelności. Opierając się na [definicji funkcji](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), możliwe byłoby przechowywanie danych jako wartości [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) i uniknięcie konwersji.

```solidity
    // Weryfikacja dowodu Merkle'a
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

W notacji matematycznej weryfikacja dowodu Merkle'a wygląda następująco: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Ten kod to implementuje.

## Dowody Merkle'a i rollupy nie idą w parze {#merkle-proofs-and-rollups}

Dowody Merkle'a nie współpracują dobrze z [rollupami](/developers/docs/scaling/#rollups). Powodem jest to, że rollupy zapisują wszystkie dane transakcji na warstwie 1 (L1), ale przetwarzają je na warstwie 2 (L2). Koszt wysłania dowodu Merkle'a wraz z transakcją wynosi średnio 638 gazu na warstwę (obecnie bajt w danych wywołania kosztuje 16 gazu, jeśli nie jest zerem, i 4, jeśli jest zerem). Jeśli mamy 1024 słowa danych, dowód Merkle'a wymaga dziesięciu warstw, czyli łącznie 6380 gazu.

Patrząc na przykład na [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), zapis gazu na L1 kosztuje około 100 gwei, a gaz na L2 kosztuje 0,001 gwei (jest to normalna cena, która może wzrosnąć w przypadku przeciążenia sieci). Zatem za koszt jednego gazu na L1 możemy wydać sto tysięcy gazu na przetwarzanie na L2. Zakładając, że nie nadpisujemy pamięci masowej, oznacza to, że możemy zapisać około pięciu słów do pamięci na L2 w cenie jednego gazu na L1. W przypadku pojedynczego dowodu Merkle'a możemy zapisać całe 1024 słowa do pamięci masowej (zakładając, że można je od początku obliczyć onchain, a nie dostarczać w transakcji) i nadal pozostanie nam większość gazu.

## Wnioski {#conclusion}

W prawdziwym życiu prawdopodobnie nigdy nie będziesz samodzielnie implementować drzew Merklego. Istnieją dobrze znane i zbadane biblioteki, z których możesz skorzystać, i ogólnie rzecz biorąc, najlepiej nie implementować prymitywów kryptograficznych na własną rękę. Mam jednak nadzieję, że teraz lepiej rozumiesz dowody Merkle'a i potrafisz zdecydować, kiedy warto ich użyć.

Zauważ, że chociaż dowody Merkle'a zachowują _integralność_, nie zachowują _dostępności_. Świadomość, że nikt inny nie może przejąć Twoich aktywów, jest marnym pocieszeniem, jeśli magazyn danych zdecyduje się zablokować dostęp, a Ty również nie będziesz w stanie skonstruować drzewa Merklego, aby uzyskać do nich dostęp. Dlatego drzewa Merklego najlepiej sprawdzają się w połączeniu z jakimś rodzajem zdecentralizowanego przechowywania danych, takim jak IPFS.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).