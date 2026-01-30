---
title: "Wdrożenie pierwszego inteligentnego kontraktu"
description: "Wprowadzenie do wdrożenia pierwszego inteligentnego kontraktu w sieci testowej Ethereum"
author: "jdourlens"
tags: [ "smart kontrakty", "remix", "solidity", "wdrażanie" ]
skill: beginner
lang: pl
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Zgaduję, że jesteś tak samo podekscytowany jak my, aby [wdrożyć](/developers/docs/smart-contracts/deploying/) i wejść w interakcję ze swoim pierwszym [inteligentnym kontraktem](/developers/docs/smart-contracts/) na blockchainie Ethereum.

Nie przejmuj się, ponieważ jest to nasz pierwszy inteligentny kontrakt, wdrożymy go w lokalnej [sieci testowej](/developers/docs/networks/), więc jego wdrożenie nic nie kosztuje i możesz się nim bawić, ile tylko chcesz.

## Pisanie naszego kontraktu {#writing-our-contract}

Pierwszym krokiem jest [odwiedzenie Remix](https://remix.ethereum.org/) i utworzenie nowego pliku. W lewej górnej części interfejsu Remix dodaj nowy plik i wprowadź żądaną nazwę pliku.

![Dodawanie nowego pliku w interfejsie Remix](./remix.png)

W nowym pliku wkleimy następujący kod.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Publiczna zmienna typu unsigned int do przechowywania liczby zliczeń
    uint256 public count = 0;

    // Funkcja, która zwiększa nasz licznik
    function increment() public {
        count += 1;
    }

    // Niepotrzebny getter do pobrania wartości licznika
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Jeśli masz doświadczenie w programowaniu, możesz łatwo odgadnąć, co robi ten program. Oto wyjaśnienie linijka po linijce:

- Wiersz 4: Definiujemy kontrakt o nazwie `Counter`.
- Wiersz 7: Nasz kontrakt przechowuje jedną liczbę całkowitą bez znaku o nazwie `count`, zaczynając od 0.
- Wiersz 10: Pierwsza funkcja modyfikuje stan kontraktu i zwiększa naszą zmienną `count`.
- Wiersz 15: Druga funkcja to tylko getter, który umożliwia odczytanie wartości zmiennej `count` poza inteligentnym kontraktem. Zauważ, że ponieważ zdefiniowaliśmy naszą zmienną `count` jako publiczną, nie jest to konieczne, ale zostało pokazane jako przykład.

To wszystko, jeśli chodzi o nasz pierwszy prosty inteligentny kontrakt. Jak być może wiesz, wygląda to jak klasa z języków programowania zorientowanego obiektowo (OOP), takich jak Java lub C++. Nadszedł czas, aby pobawić się naszym kontraktem.

## Wdrażanie naszego kontraktu {#deploying-our-contract}

Ponieważ napisaliśmy nasz pierwszy inteligentny kontrakt, teraz wdrożymy go w blockchainie, aby móc się nim bawić.

[Wdrażanie inteligentnego kontraktu na blockchainie](/developers/docs/smart-contracts/deploying/) to w rzeczywistości tylko wysłanie transakcji zawierającej kod skompilowanego inteligentnego kontraktu bez określania żadnych odbiorców.

Najpierw [skompilujemy kontrakt](/developers/docs/smart-contracts/compiling/), klikając ikonę kompilacji po lewej stronie:

![Ikona kompilacji na pasku narzędzi Remix](./remix-compile-button.png)

Następnie kliknij przycisk kompilacji:

![Przycisk kompilacji w kompilatorze Remix Solidity](./remix-compile.png)

Możesz wybrać opcję "Automatyczna kompilacja", aby kontrakt był zawsze kompilowany po zapisaniu zawartości w edytorze tekstowym.

Następnie przejdź do ekranu "wdrażanie i uruchamianie transakcji":

![Ikona wdrażania na pasku narzędzi Remix](./remix-deploy.png)

Gdy znajdziesz się na ekranie "wdrażanie i uruchamianie transakcji", upewnij się, że wyświetla się nazwa Twojego kontraktu, a następnie kliknij "Wdróż". Jak widać na górze strony, obecne środowisko to "JavaScript VM", co oznacza, że będziemy wdrażać i wchodzić w interakcję z naszym inteligentnym kontraktem na lokalnym testowym blockchainie, aby móc go testować szybciej i bez żadnych opłat.

![Przycisk wdrażania w kompilatorze Remix Solidity](./remix-deploy-button.png)

Po kliknięciu przycisku "Wdróż", na dole pojawi się Twój kontrakt. Kliknij strzałkę po lewej stronie, aby go rozwinąć i wyświetlić zawartość naszego kontraktu. To jest nasza zmienna `counter`, nasza funkcja `increment()` i getter `getCounter()`.

Jeśli klikniesz przycisk `count` lub `getCount`, zostanie odczytana zawartość zmiennej `count` z kontraktu i wyświetlona. Ponieważ nie wywołaliśmy jeszcze funkcji `increment`, wyświetli się 0.

![Przycisk funkcji w kompilatorze Remix Solidity](./remix-function-button.png)

Wywołajmy teraz funkcję `increment`, klikając przycisk. Zobaczysz logi wykonanych transakcji, które pojawią się na dole okna. Zobaczysz, że logi są inne, gdy naciskasz przycisk pobierania danych zamiast przycisku `increment`. Dzieje się tak, ponieważ odczytywanie danych z blockchaina nie wymaga żadnych transakcji (zapisu) ani opłat. Ponieważ tylko modyfikowanie stanu blockchaina wymaga wykonania transakcji:

![Log transakcji](./transaction-log.png)

Po naciśnięciu przycisku `increment`, który wygeneruje transakcję wywołującą naszą funkcję `increment()`, jeśli ponownie klikniemy przyciski `count` lub `getCount`, odczytamy nowo zaktualizowany stan naszego inteligentnego kontraktu ze zmienną `count` większą od 0.

![Nowo zaktualizowany stan inteligentnego kontraktu](./updated-state.png)

W następnym samouczku omówimy, [jak możesz dodawać zdarzenia do swoich inteligentnych kontraktów](/developers/tutorials/logging-events-smart-contracts/). Rejestrowanie zdarzeń jest wygodnym sposobem debugowania inteligentnego kontraktu i zrozumienia, co się dzieje podczas wywoływania funkcji.
