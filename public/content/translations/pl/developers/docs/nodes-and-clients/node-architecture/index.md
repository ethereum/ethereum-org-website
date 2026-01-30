---
title: "Architektura węzła"
description: "Wprowadzenie do organizacji węzłów Ethereum."
lang: pl
---

Węzeł Ethereum składa się z dwóch klientów: [klienta wykonawczego](/developers/docs/nodes-and-clients/#execution-clients) i [klienta konsensusu](/developers/docs/nodes-and-clients/#consensus-clients). Aby węzeł mógł zaproponować nowy blok, musi również uruchomić [klienta walidatora](#validators).

Kiedy Ethereum korzystało z [proof-of-work](/developers/docs/consensus-mechanisms/pow/), do uruchomienia pełnego węzła Ethereum wystarczył klient wykonawczy. Jednak od czasu wdrożenia [proof-of-stake](/developers/docs/consensus-mechanisms/pow/), klient wykonawczy musi być używany wraz z innym oprogramowaniem zwanym [klientem konsensusu](/developers/docs/nodes-and-clients/#consensus-clients).

Poniższy diagram pokazuje relację między tymi dwoma klientami Ethereum. Oba klienty łączą się z własną siecią peer-to-peer (P2P). Oddzielnie sieci P2P są potrzebne, ponieważ klienty wykonawcze plotkują transakcje po swojej sieci P2P co pozwala im na zarządzanie lokalną pulą transakcji, podczas gdy klienty konsensusu plotkują bloki po swojej sieci P2P co z kolei pozwala konsensus i rozrost łańcucha.

![](node-architecture-text-background.png)

_Istnieje kilka opcji dla klienta wykonawczego, w tym Erigon, Nethermind i Besu_.

Aby ta dwukliencka struktura działała, klienci konsensusu muszą przekazywać pakiety transakcji do klienta wykonawczego. Klient wykonawczy wykonuje transakcje lokalnie, aby zweryfikować, czy transakcje nie naruszają żadnych zasad Ethereum i czy proponowana aktualizacja stanu Ethereum jest prawidłowa. Gdy węzeł zostanie wybrany na producenta bloku, jego instancja klienta konsensusu żąda od klienta wykonawczego pakietów transakcji, aby uwzględnić je w nowym bloku i wykonać je w celu zaktualizowania globalnego stanu. Klient konsensusu steruje klientem wykonawczym za pośrednictwem lokalnego połączenia RPC, używając [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Co robi klient wykonawczy? {#execution-client}

Klient wykonawczy jest odpowiedzialny za walidację transakcji, ich obsługę i rozgłaszanie, a także za zarządzanie stanem i obsługę Wirtualnej Maszyny Ethereum ([EVM](/developers/docs/evm/)). **Nie jest** on odpowiedzialny za budowanie bloków, rozgłaszanie bloków ani obsługę logiki konsensusu. Są to zadania klienta konsensusu.

Klient wykonawczy tworzy ładunki wykonawcze — listę transakcji, zaktualizowane drzewo trie stanu i inne dane związane z wykonaniem. Klienty konsensusu uwzględniają ładunek wykonawczy w każdym bloku. Klient wykonawczy jest także odpowiedzialny za ponowne wykonywanie transakcji w nowych blokach, aby zapewnić, że są one ważne. Wykonywanie transakcji odbywa się na wbudowanym komputerze klienta wykonawczego, znanym jako [Wirtualna Maszyna Ethereum (EVM)](/developers/docs/evm).

Klient wykonawczy oferuje również interfejs użytkownika do Ethereum za pomocą metod RPC, które pozwalają użytkownikom na zapytywanie blockchainu Ethereum, przesyłanie transakcji oraz wdrażanie inteligentnych kontraktów. Wywołania RPC są zazwyczaj obsługiwane przez biblioteki takie jak Web3js, Web3py lub przez interfejs użytkownika taki jak portfel przeglądarkowy.

Podsumowując, klient wykonawczy jest:

- bramą dla użytkowników do Ethereum
- domem dla wirtualnej maszyny Ethereum, stanu Ethereum oraz puli transakcji.

## Co robi klient konsensusu? {#consensus-client}

Klient konsensusu zajmuje się całą logiką, która umożliwia węzłowi na bycie zsynchronizowanym z siecią Ethereum. Obejmuje to odbieranie bloków od rówieśników oraz uruchamianie algorytmu wyboru forka, aby zapewnić, że węzeł zawsze podąża za łańcuchem z największą kumulacją poświadczeń (ważonych przez efektywne salda walidatorów). Podobnie do klientów wykonawczych, klienty konsensusu mają własne sieci P2P, przez które udostępniają bloki i poświadczenia.

Klient konsensusu nie uczestniczy w poświadczaniu lub proponowaniu bloków — to wykonywane jest przez walidator, opcjonalny dodatek do klienta konsensusu. Klient konsensusu bez walidatora pozwala tylko na nadążenie za początkiem łańcucha, pozwalając węzłowi na pozostanie zsynchronizowanym. To umożliwia użytkownikowi na dokonywanie transakcji z Ethereum za pomocą swojego klienta wykonawczego, będąc pewnym, że jest on we właściwym łańcuchu.

## Walidatorzy {#validators}

Stakowanie i uruchamianie oprogramowania walidatora sprawia, że węzeł może zostać wybrany do zaproponowania nowego bloku. Operatorzy węzłów mogą dodać walidatora do swojego klienta konsensusu wpłacając 32 ETH do kontraktu depozytowego. Klient walidatora dostarczany jest w pakiecie z klientem konsensusu i może zostać dodany do węzła w dowolnym momencie. Walidator zajmuje się poświadczeniami i propozycjami bloków. Umożliwia to również węzłowi gromadzenie nagród lub utratę ETH za pośrednictwem kar lub cięcia.

[Więcej o stakowaniu](/staking/).

## Porównanie komponentów węzła {#node-comparison}

| Klient wykonawczy                                | Klient konsensusu                                                                                                                                            | Walidator                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| Rozgłasza transakcje w swojej sieci P2P          | Rozgłasza bloki i atestacje w swojej sieci P2P                                                                                                               | Proponuje bloki            |
| Wykonuje/ponownie wykonuje transakcje            | Uruchamia algorytm wyboru forka                                                                                                                              | Gromadzi nagrody/kary      |
| Weryfikuje nadchodzące zmiany stanu              | Śledzi początek łańcucha                                                                                                                                     | Robi poświadczenia         |
| Zarządza drzewami trie stanu i wpływów           | Zarządza stanem łańcucha śledzącego (zawiera informacje konsensusu i wykonania)                                                           | Wymaga zestakowania 32 ETH |
| Tworzy ładunki wykonawcze                        | Śledzi skumulowaną losowość w RANDAO (algorytm, który zapewnia weryfikowalną losowość do wyboru walidatorów i innych operacji konsensusu) | Może zostać odcięty        |
| Udostępnia API JSON-RPC do interakcji z Ethereum | Śledzi uzasadnienia i finalizację                                                                                                                            |                            |

## Dalsza lektura {#further-reading}

- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
- [Propozycja bloku](/developers/docs/consensus-mechanisms/pos/block-proposal)
- [Nagrody i kary dla walidatorów](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)
