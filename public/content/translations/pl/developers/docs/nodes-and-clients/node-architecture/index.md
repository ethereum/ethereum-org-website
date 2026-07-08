---
title: "Architektura węzła"
description: "Wprowadzenie do tego, jak zorganizowane są węzły Ethereum."
lang: pl
---

Węzeł Ethereum składa się z dwóch klientów: [klienta warstwy wykonawczej](/developers/docs/nodes-and-clients/#execution-clients) oraz [klienta konsensusu](/developers/docs/nodes-and-clients/#consensus-clients). Aby węzeł mógł zaproponować nowy blok, musi również uruchomić [klienta walidatora](#validators).

Kiedy Ethereum korzystało z [dowodu pracy (PoW)](/developers/docs/consensus-mechanisms/pow/), klient warstwy wykonawczej wystarczał do uruchomienia pełnego węzła Ethereum. Jednak od czasu wdrożenia [dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/), klient warstwy wykonawczej musi być używany wraz z innym oprogramowaniem zwanym [klientem konsensusu](/developers/docs/nodes-and-clients/#consensus-clients).

Poniższy diagram przedstawia relację między dwoma klientami Ethereum. Obaj klienci łączą się z własnymi sieciami peer-to-peer (P2P). Oddzielne sieci P2P są potrzebne, ponieważ klienci warstwy wykonawczej rozgłaszają transakcje w swojej sieci P2P, co pozwala im zarządzać lokalną pulą transakcji, podczas gdy klienci konsensusu rozgłaszają bloki w swojej sieci P2P, umożliwiając osiągnięcie konsensusu i rozwój łańcucha.

![Diagram of Ethereum node architecture showing execution and consensus layers](node-architecture-text-background.png)

_Istnieje kilka opcji dla klienta warstwy wykonawczej, w tym Erigon, Nethermind i Besu_.

Aby ta dwuklientowa struktura działała, klienci konsensusu muszą przekazywać pakiety transakcji do klienta warstwy wykonawczej. Klient warstwy wykonawczej wykonuje transakcje lokalnie, aby zweryfikować, czy nie naruszają one żadnych zasad Ethereum i czy proponowana aktualizacja stanu Ethereum jest poprawna. Kiedy węzeł zostaje wybrany na producenta bloku, jego instancja klienta konsensusu żąda pakietów transakcji od klienta warstwy wykonawczej, aby włączyć je do nowego bloku i wykonać w celu aktualizacji globalnego stanu. Klient konsensusu steruje klientem warstwy wykonawczej za pośrednictwem lokalnego połączenia RPC przy użyciu [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Co robi klient warstwy wykonawczej? {#execution-client}

Klient warstwy wykonawczej jest odpowiedzialny za walidację, obsługę i rozgłaszanie transakcji, a także za zarządzanie stanem i obsługę Maszyny Wirtualnej Ethereum ([EVM](/developers/docs/evm/)). **Nie** jest on odpowiedzialny za budowanie bloków, rozgłaszanie bloków ani obsługę logiki konsensusu. Te zadania leżą w gestii klienta konsensusu.

Klient warstwy wykonawczej tworzy ładunki wykonawcze – listę transakcji, zaktualizowane drzewo stanu i inne dane związane z wykonaniem. Klienci konsensusu dołączają ładunek wykonawczy do każdego bloku. Klient warstwy wykonawczej jest również odpowiedzialny za ponowne wykonanie transakcji w nowych blokach, aby upewnić się, że są one ważne. Wykonywanie transakcji odbywa się na wbudowanym komputerze klienta warstwy wykonawczej, znanym jako [Maszyna Wirtualna Ethereum (EVM)](/developers/docs/evm).

Klient warstwy wykonawczej oferuje również interfejs użytkownika do Ethereum poprzez [metody RPC](/developers/docs/apis/json-rpc), które umożliwiają użytkownikom odpytywanie blockchaina Ethereum, wysyłanie transakcji i wdrażanie inteligentnych kontraktów. Często wywołania RPC są obsługiwane przez bibliotekę taką jak [Web3js](https://docs.web3js.org/), [Web3py](https://web3py.readthedocs.io/en/v5/) lub przez interfejs użytkownika, taki jak portfel w przeglądarce.

Podsumowując, klient warstwy wykonawczej to:

- brama użytkownika do Ethereum
- dom dla Maszyny Wirtualnej Ethereum, stanu Ethereum i puli transakcji.

## Co robi klient konsensusu? {#consensus-client}

Klient konsensusu zajmuje się całą logiką, która umożliwia węzłowi pozostanie w synchronizacji z siecią Ethereum. Obejmuje to odbieranie bloków od węzłów równorzędnych i uruchamianie algorytmu wyboru rozwidlenia, aby upewnić się, że węzeł zawsze podąża za łańcuchem z największą akumulacją poświadczeń (ważonych przez efektywne salda walidatorów). Podobnie jak klient warstwy wykonawczej, klienci konsensusu mają własną sieć P2P, za pośrednictwem której udostępniają bloki i poświadczenia.

Klient konsensusu nie uczestniczy w poświadczaniu ani proponowaniu bloków – robi to walidator, opcjonalny dodatek do klienta konsensusu. Klient konsensusu bez walidatora jedynie nadąża za czołem łańcucha, pozwalając węzłowi na pozostanie zsynchronizowanym. Umożliwia to użytkownikowi przeprowadzanie transakcji w Ethereum za pomocą klienta warstwy wykonawczej z pewnością, że znajduje się w odpowiednim łańcuchu.

## Walidatory {#validators}

Staking i uruchomienie oprogramowania walidatora sprawia, że węzeł kwalifikuje się do wyboru w celu zaproponowania nowego bloku. Operatorzy węzłów mogą dodać walidatora do swoich klientów konsensusu, deponując 32 ETH w kontrakcie depozytowym. Klient walidatora jest dostarczany w pakiecie z klientem konsensusu i może zostać dodany do węzła w dowolnym momencie. Walidator obsługuje poświadczenia i propozycje bloków. Umożliwia również węzłowi gromadzenie nagród lub utratę ETH poprzez kary lub cięcia.

[Więcej o stakingu](/staking/).

## Porównanie komponentów węzła {#node-comparison}

| Klient warstwy wykonawczej | Klient konsensusu | Walidator |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Rozgłasza transakcje w swojej sieci P2P | Rozgłasza bloki i poświadczenia w swojej sieci P2P | Proponuje bloki |
| Wykonuje/ponownie wykonuje transakcje | Uruchamia algorytm wyboru rozwidlenia | Gromadzi nagrody/kary |
| Weryfikuje przychodzące zmiany stanu | Śledzi czoło łańcucha | Tworzy poświadczenia |
| Zarządza drzewami stanu i paragonów | Zarządza stanem Beacon (zawiera informacje o konsensusie i wykonaniu) | Wymaga stakowania 32 ETH |
| Tworzy ładunek wykonawczy | Śledzi skumulowaną losowość w RANDAO (algorytm zapewniający weryfikowalną losowość do wyboru walidatora i innych operacji konsensusu) | Może zostać poddany cięciu |
| Udostępnia API JSON-RPC do interakcji z Ethereum | Śledzi uzasadnienie i finalizację | |

## Dalsza lektura {#further-reading}

- [Dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos)
- [Propozycja bloku](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Nagrody i kary dla walidatorów](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)