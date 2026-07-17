---
title: "Wdrażanie pierwszego inteligentnego kontraktu"
description: "Wprowadzenie do wdrażania pierwszego inteligentnego kontraktu w sieci testowej Ethereum"
author: "jdourlens"
tags: ["inteligentne kontrakty", "Remix", "Solidity", "wdrażanie"]
skill: beginner
breadcrumb: "Wdróż pierwszy kontrakt"
lang: pl
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Zgaduję, że jesteś równie podekscytowany jak my, aby [wdrożyć](/developers/docs/smart-contracts/deploying/) i wejść w interakcję ze swoim pierwszym [inteligentnym kontraktem](/developers/docs/smart-contracts/) na blockchainie Ethereum.

Nie martw się, ponieważ jest to nasz pierwszy inteligentny kontrakt, wdrożymy go w [lokalnej sieci testowej](/developers/docs/networks/), więc jego wdrożenie nic Cię nie będzie kosztować i będziesz mógł się nim bawić do woli.

## Pisanie naszego kontraktu {#writing-our-contract}

Pierwszym krokiem jest [odwiedzenie Remix](https://remix.ethereum.org/) i utworzenie nowego pliku. W lewej górnej części interfejsu Remix dodaj nowy plik i wprowadź wybraną nazwę pliku.

![Adding a new file in the Remix interface](./remix.png)

W nowym pliku wkleimy następujący kod.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Publiczna zmienna typu unsigned int do przechowywania liczby zliczeń
    uint256 public count = 0;

    // Funkcja inkrementująca nasz licznik
    function increment() public {
        count += 1;
    }

    // Niepotrzebny getter do pobrania wartości licznika
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Jeśli jesteś przyzwyczajony do programowania, możesz łatwo odgadnąć, co robi ten program. Oto wyjaśnienie linijka po linijce:

- Linia 4: Definiujemy kontrakt o nazwie `Counter`.
- Linia 7: Nasz kontrakt przechowuje jedną liczbę całkowitą bez znaku (unsigned integer) o nazwie `count`, zaczynającą się od 0.
- Linia 10: Pierwsza funkcja zmodyfikuje stan kontraktu i zwiększy (`increment()`) naszą zmienną `count`.
- Linia 15: Druga funkcja to po prostu getter, który pozwala na odczytanie wartości zmiennej `count` poza inteligentnym kontraktem. Zauważ, że ponieważ zdefiniowaliśmy naszą zmienną `count` jako publiczną, nie jest to konieczne, ale zostało pokazane jako przykład.

To wszystko, jeśli chodzi o nasz pierwszy prosty inteligentny kontrakt. Jak być może wiesz, wygląda on jak klasa z języków programowania obiektowego (OOP), takich jak Java czy C++. Nadszedł czas, aby pobawić się naszym kontraktem.

## Wdrażanie naszego kontraktu {#deploying-our-contract}

Skoro napisaliśmy nasz pierwszy inteligentny kontrakt, teraz wdrożymy go na blockchainie, aby móc się nim pobawić.

[Wdrożenie inteligentnego kontraktu na blockchainie](/developers/docs/smart-contracts/deploying/) to tak naprawdę tylko wysłanie transakcji zawierającej kod skompilowanego inteligentnego kontraktu bez określania żadnych odbiorców.

Najpierw [skompilujemy kontrakt](/developers/docs/smart-contracts/compiling/), klikając ikonę kompilacji po lewej stronie:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Następnie kliknij przycisk kompilacji:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Możesz zaznaczyć opcję „Auto compile” (Automatyczna kompilacja), dzięki czemu kontrakt będzie zawsze kompilowany po zapisaniu zawartości w edytorze tekstu.

Następnie przejdź do ekranu „deploy and run transactions” (wdrażanie i uruchamianie transakcji):

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Gdy znajdziesz się na ekranie „deploy and run transactions”, upewnij się, że nazwa Twojego kontraktu jest widoczna, i kliknij „Deploy” (Wdróż). Jak widać na górze strony, obecne środowisko to „JavaScript VM”, co oznacza, że wdrożymy nasz inteligentny kontrakt i będziemy z nim wchodzić w interakcje na lokalnym testowym blockchainie, aby móc testować szybciej i bez żadnych opłat.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Po kliknięciu przycisku „Deploy” zobaczysz swój kontrakt na dole. Kliknij strzałkę po lewej stronie, aby go rozwinąć, dzięki czemu zobaczymy zawartość naszego kontraktu. To nasza zmienna `counter`, nasza funkcja `increment()` oraz getter `getCounter()`.

Jeśli klikniesz przycisk `count` lub `getCount`, pobierze on zawartość zmiennej `count` kontraktu i ją wyświetli. Ponieważ nie wywołaliśmy jeszcze funkcji `increment`, powinno wyświetlić się 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Wywołajmy teraz funkcję `increment`, klikając przycisk. Zobaczysz logi wykonanych transakcji pojawiające się na dole okna. Zauważysz, że logi różnią się, gdy naciskasz przycisk do pobierania danych, w porównaniu do przycisku `increment`. Dzieje się tak, ponieważ odczytywanie danych na blockchainie nie wymaga żadnych transakcji (zapisu) ani opłat. Tylko modyfikacja stanu blockchaina wymaga wykonania transakcji:

![A log of transactions](./transaction-log.png)

Po naciśnięciu przycisku inkrementacji, który wygeneruje transakcję wywołującą naszą funkcję `increment()`, jeśli ponownie klikniemy przyciski count lub getCount, odczytamy nowo zaktualizowany stan naszego inteligentnego kontraktu, w którym zmienna count będzie większa niż 0.

![Newly updated state of the smart contract](./updated-state.png)

W następnym samouczku omówimy, [jak możesz dodawać zdarzenia do swoich inteligentnych kontraktów](/developers/tutorials/logging-events-smart-contracts/). Logowanie zdarzeń to wygodny sposób na debugowanie inteligentnego kontraktu i zrozumienie, co dzieje się podczas wywoływania funkcji.