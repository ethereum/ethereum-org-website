---
title: Rejestrowanie danych z inteligentnych kontraktów za pomocą zdarzeń
description: Wprowadzenie do zdarzeń w inteligentnych kontraktach i sposobów ich wykorzystania do rejestrowania danych
author: "jdourlens"
tags: [ "smart kontrakty", "remix", "solidity", "zdarzenia" ]
skill: intermediate
lang: pl
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

W Solidity [zdarzenia](/developers/docs/smart-contracts/anatomy/#events-and-logs) to wysyłane sygnały, które inteligentne kontrakty mogą emitować. Dapki lub wszystko, co jest połączone z API JSON-RPC Ethereum, może nasłuchiwać tych zdarzeń i odpowiednio działać. Zdarzenie można również zindeksować, aby później można było przeszukiwać historię zdarzeń.

## Zdarzenia {#events}

Najczęstszym zdarzeniem na blockchainie Ethereum w momencie pisania tego artykułu jest zdarzenie Transfer, które jest emitowane przez tokeny ERC20, gdy ktoś przenosi tokeny.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Sygnatura zdarzenia jest deklarowana w kodzie kontraktu i może być emitowana za pomocą słowa kluczowego emit. Na przykład zdarzenie transferu rejestruje, kto wysłał transfer (_from_), do kogo (_to_) i ile tokenów zostało przeniesionych (_value_).

Jeśli wrócimy do naszego inteligentnego kontraktu Counter i zdecydujemy się rejestrować za każdym razem, gdy wartość się zmieni. Ponieważ kontrakt ten nie jest przeznaczony do wdrożenia, ale służy jako podstawa do zbudowania kolejnego kontraktu poprzez jego rozszerzenie: nazywa się go kontraktem abstrakcyjnym. W przypadku naszego przykładu z licznikiem Counter wyglądałoby to tak:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Prywatna zmienna typu unsigned int do przechowywania liczby zliczeń
    uint256 private count = 0;

    // Funkcja, która zwiększa nasz licznik
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter do pobrania wartości licznika
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Zauważ, że:

- **Wiersz 5**: deklarujemy nasze zdarzenie i to, co zawiera: starą i nową wartość.

- **Wiersz 13**: Kiedy zwiększamy naszą zmienną count, emitujemy zdarzenie.

Jeżeli teraz wdrożymy kontrakt i wywołamy funkcję `increment`, zobaczymy, że Remix automatycznie to wyświetli, gdy klikniemy nową transakcję w tablicy o nazwie `logs`.

![Zrzut ekranu z Remix](./remix-screenshot.png)

Logi są bardzo przydatne do debugowania inteligentnych kontraktów, ale są również ważne, jeśli tworzysz aplikacje używane przez różne osoby, ponieważ ułatwiają przeprowadzanie analiz w celu śledzenia i zrozumienia, w jaki sposób używane są Twoje inteligentne kontrakty. Logi generowane przez transakcje są wyświetlane w popularnych eksploratorach bloków i można je również wykorzystać, np. do tworzenia skryptów offchain do nasłuchiwania określonych zdarzeń i podejmowania działań w momencie ich wystąpienia.
