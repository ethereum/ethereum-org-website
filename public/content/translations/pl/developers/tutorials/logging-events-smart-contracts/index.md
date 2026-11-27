---
title: "Logowanie danych z inteligentnych kontraktów za pomocą zdarzeń"
description: "Wprowadzenie do zdarzeń w inteligentnych kontraktach i sposobów ich wykorzystania do logowania danych"
author: "jdourlens"
tags: ["inteligentne kontrakty", "Remix", "Solidity", "zdarzenia"]
skill: intermediate
breadcrumb: "Logowanie zdarzeń"
lang: pl
published: 2020-04-03
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W języku Solidity [zdarzenia](/developers/docs/smart-contracts/anatomy/#events-and-logs) to wysyłane sygnały, które mogą być wyzwalane przez inteligentne kontrakty. Zdecentralizowane aplikacje (dapp) lub cokolwiek połączonego z API JSON-RPC Ethereum może nasłuchiwać tych zdarzeń i odpowiednio na nie reagować. Zdarzenie może być również indeksowane, dzięki czemu jego historia będzie później możliwa do przeszukiwania.

## Zdarzenia {#events}

Jednym z najczęstszych zdarzeń na blockchainie Ethereum jest zdarzenie `Transfer`, które jest emitowane przez tokeny ERC-20, gdy ktoś dokonuje transferu tokenów.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Podpis zdarzenia jest deklarowany wewnątrz kodu kontraktu i może być wyemitowany za pomocą słowa kluczowego emit. Na przykład zdarzenie transferu loguje, kto wysłał transfer (_from_), do kogo (_to_) i ile tokenów zostało przetransferowanych (_value_).

Wróćmy do inteligentnego kontraktu `Counter` z [wdrażania pierwszego inteligentnego kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) i logujmy każdą zmianę wartości. Wyglądałoby to tak:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Publiczna zmienna typu unsigned int do przechowywania liczby zliczeń
    uint256 public count = 0;

    // Funkcja, która inkrementuje nasz licznik
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Niepotrzebny getter do pobrania wartości licznika
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Zauważ, że:

- **Linia 6**: deklarujemy nasze zdarzenie i to, co zawiera, czyli starą i nową wartość.

- **Linia 14**: Kiedy inkrementujemy naszą zmienną count, emitujemy zdarzenie.

Jeśli teraz wdrożymy kontrakt i wywołamy funkcję increment, zobaczymy, że Remix automatycznie wyświetli to, jeśli klikniesz nową transakcję wewnątrz tablicy o nazwie logs.

![Zrzut ekranu Remix](./remix-screenshot.png)

Logi są naprawdę przydatne do debugowania inteligentnych kontraktów, ale są również ważne, jeśli budujesz aplikacje używane przez różne osoby, ponieważ ułatwiają przeprowadzanie analiz w celu śledzenia i zrozumienia, jak używany jest Twój inteligentny kontrakt. Logi generowane przez transakcje są wyświetlane w popularnych eksploratorach bloków i możesz ich również użyć na przykład do tworzenia pozałańcuchowych skryptów do nasłuchiwania określonych zdarzeń i podejmowania działań, gdy one wystąpią.
