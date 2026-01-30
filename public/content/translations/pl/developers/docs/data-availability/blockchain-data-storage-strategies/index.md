---
title: Strategie przechowywania danych blockchainu
description: "Istnieje kilka sposobów przechowywania danych za pomocą blockchaina. W tym artykule porównamy różne strategie, ich koszty i kompromisy, a także wymagania dotyczące ich bezpiecznego stosowania."
lang: pl
---

Istnieje wiele sposobów przechowywania informacji bezpośrednio w blockchainie lub w sposób zabezpieczony przez blockchain:

- Bloby EIP-4844
- Calldata
- Offchain z mechanizmami L1
- „Kod” kontraktu
- Zdarzenia
- Przechowywanie EVM

Wybór metody zależy od kilku kryteriów:

- Źródło informacji. Informacje w calldata nie mogą pochodzić bezpośrednio z samego blockchaina.
- Miejsce docelowe informacji. Calldata jest dostępna tylko w transakcji, która ją zawiera. Zdarzenia nie są w ogóle dostępne onchain.
- Jakie utrudnienia są dopuszczalne? Komputery, które uruchamiają pełny node, mogą wykonać więcej operacji przetwarzania niż lekki klient w aplikacji działającej w przeglądarce.
- Czy konieczne jest ułatwienie dostępu do informacji z każdego node'a?
- Wymagania dotyczące bezpieczeństwa.

## Wymagania dotyczące bezpieczeństwa {#security-requirements}

Ogólnie rzecz biorąc, bezpieczeństwo informacji składa się z trzech atrybutów:

- _Poufność_, nieautoryzowane podmioty nie mogą odczytywać informacji. Jest to ważne w wielu przypadkach, ale nie w tym. _W blockchainie nie ma tajemnic_. Blockchainy działają, ponieważ każdy może zweryfikować przejścia stanów, więc niemożliwe jest ich użycie do bezpośredniego przechowywania tajemnic. Istnieją sposoby na przechowywanie poufnych informacji w blockchainie, ale wszystkie opierają się na pewnym komponencie offchain do przechowywania co najmniej klucza.

- _Integralność_, informacja jest poprawna, nie może być zmieniana przez nieautoryzowane podmioty ani w nieautoryzowany sposób (na przykład transfer [tokenów ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) bez zdarzenia `Transfer`). W blockchainie każdy node weryfikuje każdą zmianę stanu, co zapewnia integralność.

- _Dostępność_, informacja jest dostępna dla każdego autoryzowanego podmiotu. W blockchainie jest to zazwyczaj osiągane poprzez udostępnienie informacji na każdym [pełnym nodzie](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Wszystkie te różne rozwiązania charakteryzują się doskonałą integralnością, ponieważ hasze są publikowane na L1. Mają one jednak różne gwarancje dostępności.

## Wymagania wstępne {#prerequisites}

Należy dobrze rozumieć [podstawy blockchaina](/developers/docs/intro-to-ethereum/). Na tej stronie zakłada się również, że czytelnik jest zaznajomiony z [blokami](/developers/docs/blocks/), [transakcjami](/developers/docs/transactions/) i innymi powiązanymi tematami.

## Bloby EIP-4844 {#eip-4844-blobs}

Począwszy od [hardforka Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md), blockchain Ethereum zawiera [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), który dodaje do Ethereum bloby danych o ograniczonym czasie życia (początkowo około [18 dni](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Te bloby są wyceniane oddzielnie od [gazu wykonawczego](/developers/docs/gas), chociaż używają podobnego mechanizmu. Są tanim sposobem na publikowanie tymczasowych danych.

Głównym przypadkiem użycia blobów EIP-4844 jest publikowanie transakcji przez pakiety zbiorcze. [Optymistyczne pakiety zbiorcze](/developers/docs/scaling/optimistic-rollups) muszą publikować transakcje na swoich blockchainach. Transakcje te muszą być dostępne dla każdego w [okresie wyzwania](https://docs.optimism.io/connect/resources/glossary#challenge-period), aby umożliwić [walidatorom](https://docs.optimism.io/connect/resources/glossary#validator) naprawienie błędu, jeśli [sekwencer](https://docs.optimism.io/connect/resources/glossary#sequencer) pakietu zbiorczego opublikuje nieprawidłowy state root.

Jednakże, gdy okres wyzwania minie, a state root zostanie sfinalizowany, pozostałym celem znajomości tych transakcji jest replikacja bieżącego stanu łańcucha. Ten stan jest również dostępny z node'ów łańcucha, przy czym wymagane jest o wiele mniej przetwarzania. Tak więc informacje o transakcjach powinny być nadal przechowywane w kilku miejscach, takich jak [eksploratory bloków](/developers/docs/data-and-analytics/block-explorers), ale nie ma potrzeby płacić za poziom odporności na cenzurę, jaki zapewnia Ethereum.

[Pakiety zbiorcze o wiedzy zerowej](/developers/docs/scaling/zk-rollups/#data-availability) również publikują swoje dane transakcyjne, aby umożliwić innym node'om replikację istniejącego stanu i weryfikację dowodów ważności, ale jest to znowu wymóg krótkoterminowy.

W momencie pisania tego tekstu publikacja w EIP-4844 kosztuje jeden wei (10<sup>-18</sup> ETH) za bajt, co jest znikomą kwotą w porównaniu z [21 000 jednostek gazu wykonawczego, które kosztuje każda transakcja, w tym transakcja publikująca bloby](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Aktualną cenę EIP-4844 można zobaczyć na [blobscan.com](https://blobscan.com/blocks).

Oto adresy, pod którymi można zobaczyć bloby opublikowane przez niektóre znane pakiety zbiorcze.

| Pakiet zbiorczy                      | Adres skrzynki pocztowej                                                                                                |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Calldata {#calldata}

Calldata odnosi się do bajtów wysyłanych w ramach transakcji. Jest ona przechowywana jako część trwałego zapisu blockchaina w bloku, który zawiera daną transakcję.

Jest to najtańsza metoda trwałego umieszczania danych w blockchainie. Koszt za bajt wynosi 4 jednostki gazu wykonawczego (jeśli bajt jest zerowy) lub 16 jednostek gazu (dla każdej innej wartości). Jeśli dane są skompresowane, co jest standardową praktyką, to każda wartość bajtu jest równie prawdopodobna, więc średni koszt wynosi około 15,95 jednostek gazu na bajt.

W chwili pisania tego tekstu ceny wynoszą 12 gwei/gaz i 2300 $/ETH, co oznacza, że koszt wynosi około 45 centów za kilobajt. Ponieważ była to najtańsza metoda przed EIP-4844, jest to metoda, której pakiety zbiorcze używały do przechowywania informacji o transakcjach, które muszą być dostępne dla [wyzwań dotyczących błędów](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ale nie muszą być dostępne bezpośrednio onchain.

Oto adresy, pod którymi można zobaczyć transakcje opublikowane przez niektóre znane pakiety zbiorcze.

| Pakiet zbiorczy                      | Adres skrzynki pocztowej                                                                                                      |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Offchain z mechanizmami L1 {#offchain-with-l1-mechs}

W zależności od kompromisów w zakresie bezpieczeństwa, może być dopuszczalne umieszczenie informacji w innym miejscu i użycie mechanizmu, który zapewni dostępność danych w razie potrzeby. Aby to zadziałało, muszą być spełnione dwa wymagania:

1. Opublikuj [hasz](https://en.wikipedia.org/wiki/Cryptographic_hash_function) danych w blockchainie, zwany _zobowiązaniem wejściowym_. Może to być pojedyncze 32-bajtowe słowo, więc nie jest to drogie. Dopóki zobowiązanie wejściowe jest dostępne, integralność jest zapewniona, ponieważ nie jest wykonalne znalezienie innych danych, które haszowałyby się do tej samej wartości. Więc jeśli zostaną podane nieprawidłowe dane, można to wykryć.

2. Posiadanie mechanizmu, który zapewnia dostępność. Na przykład w [Redstone](https://redstone.xyz/docs/what-is-redstone) każdy node może zgłosić wyzwanie dostępności. Jeśli sekwencer nie odpowie onchain przed upływem terminu, zobowiązanie wejściowe jest odrzucane, więc informacja jest uważana za nigdy nieopublikowaną.

Jest to dopuszczalne w przypadku optymistycznego pakietu zbiorczego, ponieważ już polegamy na istnieniu co najmniej jednego uczciwego weryfikatora dla state root. Taki uczciwy weryfikator upewni się również, że ma dane do przetwarzania bloków i zgłosi wyzwanie dostępności, jeśli informacja nie będzie dostępna offchain. Ten typ optymistycznego pakietu zbiorczego nazywa się [plasma](/developers/docs/scaling/plasma/).

## Kod kontraktu {#contract-code}

Informacje, które trzeba zapisać tylko raz, nigdy nie są nadpisywane i muszą być dostępne onchain, mogą być przechowywane jako kod kontraktu. Oznacza to, że tworzymy „inteligentny kontrakt” z danymi, a następnie używamy [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) do odczytania informacji. Zaletą jest to, że kopiowanie kodu jest stosunkowo tanie.

Oprócz kosztu rozszerzenia pamięci, `EXTCODECOPY` kosztuje 2600 jednostek gazu za pierwszy dostęp do kontraktu (kiedy jest „zimny”) i 100 jednostek gazu za kolejne kopie z tego samego kontraktu plus 3 jednostki gazu za 32-bajtowe słowo. W porównaniu z calldata, która kosztuje 15,95 za bajt, jest to tańsze, zaczynając od około 200 bajtów. Na podstawie [wzoru na koszty rozszerzenia pamięci](https://www.evm.codes/about#memoryexpansion), o ile nie potrzeba więcej niż 4 MB pamięci, koszt rozszerzenia pamięci jest mniejszy niż koszt dodania calldata.

Oczywiście jest to tylko koszt _odczytu_ danych. Utworzenie kontraktu kosztuje około 32 000 jednostek gazu + 200 jednostek gazu/bajt. Ta metoda jest ekonomiczna tylko wtedy, gdy te same informacje muszą być odczytywane wielokrotnie w różnych transakcjach.

Kod kontraktu może być bezsensowny, o ile nie zaczyna się od `0xEF`. Kontrakty zaczynające się od `0xEF` są interpretowane jako [format obiektu Ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), który ma znacznie surowsze wymagania.

## Zdarzenia {#events}

[Zdarzenia](https://docs.alchemy.com/docs/solidity-events) są emitowane przez inteligentne kontrakty i odczytywane przez oprogramowanie offchain.
Ich zaletą jest to, że kod offchain może nasłuchiwać zdarzeń. Koszt to [gaz](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 jednostek gazu za bajt danych. Przy 12 gwei/gaz i 2300 $/ETH, przekłada się to na jednego centa plus 22 centy za kilobajt.

## Przechowywanie {#storage}

Inteligentne kontrakty mają dostęp do [trwałego przechowywania](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Jest ono jednak bardzo drogie. Zapisanie 32-bajtowego słowa do wcześniej pustego slotu pamięci może [kosztować 22 100 jednostek gazu](https://www.evm.codes/#55?fork=cancun). Przy 12 gwei/gaz i 2300 $/ETH, daje to około 61 centów za operację zapisu, czyli 19,5 dolara za kilobajt.

Jest to najdroższa forma przechowywania w Ethereum.

## Podsumowanie {#summary}

Poniższa tabela podsumowuje różne opcje, ich zalety i wady.

| Typ przechowywania         | Źródło danych        | Gwarancja dostępności                                                                                                                            | Dostępność onchain                                                | Dodatkowe ograniczenia                                          |
| -------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------- |
| Bloby EIP-4844             | Offchain             | Gwarancja Ethereum na [~18 dni](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Dostępny jest tylko hasz                                          |                                                                 |
| Calldata                   | Offchain             | Gwarancja Ethereum na zawsze (część blockchaina)                                                                              | Dostępne tylko w przypadku zapisu do kontraktu i w tej transakcji |                                                                 |
| Offchain z mechanizmami L1 | Offchain             | Gwarancja „jednego uczciwego weryfikatora” w okresie wyzwania                                                                                    | Tylko hasz                                                        | Gwarantowane przez mechanizm wyzwania, tylko w okresie wyzwania |
| Kod kontraktu              | Onchain lub offchain | Gwarancja Ethereum na zawsze (część blockchaina)                                                                              | Tak                                                               | Zapisywany pod „losowy” adres, nie może zaczynać się od `0xEF`  |
| Zdarzenia                  | Onchain              | Gwarancja Ethereum na zawsze (część blockchaina)                                                                              | Nie                                                               |                                                                 |
| Przechowywanie             | Onchain              | Gwarancja Ethereum na zawsze (część blockchaina i obecnego stanu do momentu nadpisania)                                       | Tak                                                               |                                                                 |
