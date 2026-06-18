---
title: "Logowanie danych z inteligentnych kontraktów za pomocą zdarzeń"
description: "Wprowadzenie do zdarzeń w inteligentnych kontraktach i sposobów ich wykorzystania do logowania danych"
author: "jdourlens"
tags: ["inteligentne kontrakty", "Remix", "Solidity", "zdarzenia"]
skill: intermediate
breadcrumb: "Logowanie zdarzeń"
lang: pl
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W języku Solidity [zdarzenia](/developers/docs/smart-contracts/anatomy/#events-and-logs) to wysyłane sygnały, które mogą być wyzwalane przez inteligentne kontrakty. Zdecentralizowane aplikacje (dapp) lub cokolwiek połączonego z API JSON-RPC Ethereum może nasłuchiwać tych zdarzeń i odpowiednio na nie reagować. Zdarzenie może być również indeksowane, dzięki czemu jego historia będzie później możliwa do przeszukiwania.

## Zdarzenia {#events}

Najczęstszym zdarzeniem na blockchainie Ethereum w momencie pisania tego artykułu jest zdarzenie Transfer, które jest emitowane przez tokeny ERC-20, gdy ktoś wykonuje transfer tokenów.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Podpis zdarzenia jest deklarowany wewnątrz kodu kontraktu i może być wyemitowany za pomocą słowa kluczowego emit. Na przykład zdarzenie transferu loguje, kto wysłał transfer (_from_), do kogo (_to_) i ile tokenów zostało przetransferowanych (_value_).

Jeśli wrócimy do naszego inteligentnego kontraktu Counter i zdecydujemy się logować każdą zmianę wartości. Ponieważ ten kontrakt nie jest przeznaczony do wdrożenia, ale służy jako baza do budowy innego kontraktu poprzez jego rozszerzenie: nazywa się go kontraktem abstrakcyjnym. W przypadku naszego przykładu licznika wyglądałoby to tak:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Prywatna zmienna typu unsigned int do przechowywania liczby zliczeń
    uint256 private count = 0;

    // Funkcja inkrementująca nasz licznik
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter do pobierania wartości licznika
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Zauważ, że:

- **Linia 5**: deklarujemy nasze zdarzenie i to, co zawiera, czyli starą i nową wartość.

- **Linia 13**: Kiedy inkrementujemy naszą zmienną count, emitujemy zdarzenie.

Jeśli teraz wdrożymy kontrakt i wywołamy funkcję increment, zobaczymy, że Remix automatycznie go wyświetli, jeśli klikniesz nową transakcję wewnątrz tablicy o nazwie logs.

![Remix screenshot](./remix-screenshot.png)

Logi są naprawdę przydatne do debugowania inteligentnych kontraktów, ale są również ważne, jeśli budujesz aplikacje używane przez różne osoby, ponieważ ułatwiają tworzenie analityki w celu śledzenia i zrozumienia, w jaki sposób używany jest Twój inteligentny kontrakt. Logi generowane przez transakcje są wyświetlane w popularnych eksploratorach bloków, a ponadto możesz na przykład użyć ich do tworzenia skryptów pozałańcuchowych do nasłuchiwania określonych zdarzeń i podejmowania działań, gdy one wystąpią.