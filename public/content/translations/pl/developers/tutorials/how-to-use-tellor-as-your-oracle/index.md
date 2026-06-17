---
title: Jak skonfigurować Tellor jako swoją wyrocznię
description: Przewodnik, jak zacząć integrację wyroczni Tellor z Twoim protokołem
author: "Tellor"
lang: pl
tags: ["solidity", "inteligentne kontrakty", "wyrocznie"]
skill: beginner
breadcrumb: Wyrocznia Tellor
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Szybki test: Twój protokół jest już prawie gotowy, ale potrzebuje wyroczni, aby uzyskać dostęp do danych pozałańcuchowych... Co robisz?

## (Miękkie) Wymagania wstępne {#soft-prerequisites}

Ten post ma na celu uczynienie dostępu do danych z wyroczni tak prostym i bezpośrednim, jak to tylko możliwe. Biorąc to pod uwagę, przyjmujemy następujące założenia dotyczące Twojego poziomu umiejętności programistycznych, aby skupić się na aspekcie wyroczni.

Założenia:

- potrafisz poruszać się po terminalu
- masz zainstalowany npm
- wiesz, jak używać npm do zarządzania zależnościami

Tellor to działająca wyrocznia o otwartym kodzie źródłowym (open-source), gotowa do wdrożenia. Ten przewodnik dla początkujących ma na celu pokazanie, z jaką łatwością można rozpocząć pracę z Tellor, zapewniając swojemu projektowi w pełni zdecentralizowaną i odporną na cenzurę wyrocznię.

## Przegląd {#overview}

Tellor to system wyroczni, w którym strony mogą zażądać wartości pozałańcuchowego punktu danych (np. BTC/USD), a raportujący rywalizują o dodanie tej wartości do banku danych onchain, dostępnego dla wszystkich inteligentnych kontraktów Ethereum. Dane wejściowe do tego banku danych są zabezpieczone przez sieć stakujących raportujących. Tellor wykorzystuje kryptoekonomiczne mechanizmy motywacyjne, nagradzając uczciwe przesyłanie danych przez raportujących i karząc złych aktorów poprzez emisję tokena Tellor, Tributes (TRB), oraz mechanizm rozstrzygania sporów.

W tym samouczku omówimy:

- Konfigurację początkowego zestawu narzędzi, którego będziesz potrzebować, aby zacząć pracę.
- Przejście przez prosty przykład.
- Wypisanie adresów w sieci testowej dla sieci, w których możesz obecnie testować Tellor.

## UsingTellor {#usingtellor}

Pierwszą rzeczą, którą będziesz chciał zrobić, jest zainstalowanie podstawowych narzędzi niezbędnych do używania Tellor jako Twojej wyroczni. Użyj [tego pakietu](https://github.com/tellor-io/usingtellor), aby zainstalować kontrakty użytkownika Tellor (Tellor User Contracts):

`npm install usingtellor`

Po zainstalowaniu pozwoli to Twoim kontraktom dziedziczyć funkcje z kontraktu 'UsingTellor'.

Świetnie! Teraz, gdy masz już gotowe narzędzia, przejdźmy przez proste ćwiczenie, w którym pobierzemy cenę Bitcoina:

### Przykład BTC/USD {#btcusd-example}

Odziedzicz kontrakt UsingTellor, przekazując adres Tellor jako argument konstruktora:

Oto przykład:

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

Pełną listę adresów kontraktów znajdziesz [tutaj](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Dla ułatwienia użytkowania, repozytorium UsingTellor zawiera wersję kontraktu [Tellor Playground](https://github.com/tellor-io/TellorPlayground) w celu łatwiejszej integracji. Zobacz [tutaj](https://github.com/tellor-io/sampleUsingTellor#tellor-playground), aby uzyskać listę przydatnych funkcji.

Aby uzyskać bardziej solidną implementację wyroczni Tellor, sprawdź pełną listę dostępnych funkcji [tutaj](https://github.com/tellor-io/usingtellor/blob/master/README.md).