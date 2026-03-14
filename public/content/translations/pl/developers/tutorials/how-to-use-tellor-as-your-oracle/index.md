---
title: "Jak skonfigurować Tellor jako swoją wyrocznię"
description: "Przewodnik po rozpoczęciu integracji wyroczni Tellor z Twoim protokołem"
author: "Tellor"
lang: pl
tags: [ "solidity", "smart kontrakty", "wyrocznie" ]
skill: beginner
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Szybki quiz: Twój protokół jest już prawie gotowy, ale potrzebuje wyroczni, aby uzyskać dostęp do danych off-chain... Co zrobisz?

## Wymagania wstępne (sugerowane) {#soft-prerequisites}

Ten post ma na celu sprawienie, aby dostęp do źródła danych wyroczni był tak prosty i przejrzysty, jak to tylko możliwe. Niemniej jednak, aby skupić się na aspekcie wyroczni, zakładamy następujący poziom Twoich umiejętności programistycznych.

Założenia:

- umiesz poruszać się w terminalu
- masz zainstalowany npm
- wiesz, jak używać npm do zarządzania zależnościami

Tellor to działająca wyrocznia o otwartym kodzie źródłowym, gotowa do wdrożenia. Ten przewodnik dla początkujących ma na celu pokazanie, z jaką łatwością można zacząć korzystać z Tellor, zapewniając Twojemu projektowi w pełni zdecentralizowaną i odporną na cenzurę wyrocznię.

## Przegląd {#overview}

Tellor to system wyroczni, w którym strony mogą zażądać wartości punktu danych off-chain (np. BTC/USD), a reporterzy konkurują o dodanie tej wartości do banku danych on-chain, dostępnego dla wszystkich smart kontraktów Ethereum. Dane wejściowe do tego banku danych są zabezpieczone przez sieć stakujących reporterów. Tellor wykorzystuje krypto-ekonomiczne mechanizmy motywacyjne, nagradzając reporterów za uczciwe przesyłanie danych i karząc złośliwych uczestników poprzez emisję tokena Tellor, Tributes (TRB), oraz mechanizm sporów.

W tym samouczku omówimy:

- Konfiguracja początkowego zestawu narzędzi, którego będziesz potrzebować, aby zacząć.
- Omówimy prosty przykład.
- Lista adresów sieci testowych, na których można obecnie testować Tellor.

## UsingTellor {#usingtellor}

Na początek zainstaluj podstawowe narzędzia niezbędne do używania Tellor jako swojej wyroczni. Użyj [tego pakietu](https://github.com/tellor-io/usingtellor), aby zainstalować kontrakty użytkownika Tellor:

`npm install usingtellor`

Po zainstalowaniu Twoje kontrakty będą mogły dziedziczyć funkcje z kontraktu „UsingTellor”.

Świetnie! Teraz, gdy masz już gotowe narzędzia, przejdźmy przez proste ćwiczenie, w którym pobierzemy cenę bitcoina:

### Przykład BTC/USD {#btcusd-example}

Odziedzicz kontrakt UsingTellor, przekazując adres Tellor jako argument konstruktora:

Spójrz na poniższy przykład:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Ten kontrakt ma teraz dostęp do wszystkich funkcji w UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Pełną listę adresów kontraktów można znaleźć [tutaj](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Dla ułatwienia, repozytorium UsingTellor jest dostarczane z wersją kontraktu [Tellor Playground](https://github.com/tellor-io/TellorPlayground) w celu łatwiejszej integracji. [Tutaj](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) znajdziesz listę przydatnych funkcji.

Aby uzyskać bardziej niezawodną implementację wyroczni Tellor, zapoznaj się z pełną listą dostępnych funkcji [tutaj](https://github.com/tellor-io/usingtellor/blob/master/README.md).
