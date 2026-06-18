---
title: Strategie przechowywania danych na blockchainie
description: Istnieje kilka sposobów przechowywania danych przy użyciu blockchaina. Ten artykuł porównuje różne strategie, ich koszty i kompromisy, a także wymagania dotyczące bezpiecznego korzystania z nich.
lang: pl
---

Istnieje wiele sposobów przechowywania informacji bezpośrednio na blockchainie lub w sposób zabezpieczony przez blockchain:

- Bloby EIP-4844
- Dane wywołania (calldata)
- Pozałańcuchowo z mechanizmami warstwy 1 (L1)
- „Kod” kontraktu
- Zdarzenia
- Pamięć masowa EVM (storage)

Wybór metody zależy od kilku kryteriów:

- Źródło informacji. Informacje w danych wywołania nie mogą pochodzić bezpośrednio z samego blockchaina.
- Miejsce docelowe informacji. Dane wywołania są dostępne tylko w transakcji, która je zawiera. Zdarzenia w ogóle nie są dostępne onchain.
- Ile zachodu jest akceptowalne? Komputery, na których działa pełny węzeł, mogą przetwarzać więcej danych niż lekki klient w aplikacji działającej w przeglądarce.
- Czy konieczne jest ułatwienie łatwego dostępu do informacji z każdego węzła?
- Wymagania bezpieczeństwa.

## Wymagania bezpieczeństwa {#security-requirements}

Ogólnie rzecz biorąc, bezpieczeństwo informacji składa się z trzech atrybutów:

- _Poufność_ – nieupoważnione podmioty nie mogą odczytać informacji. Jest to ważne w wielu przypadkach, ale nie tutaj. _Na blockchainie nie ma tajemnic_. Blockchainy działają, ponieważ każdy może zweryfikować przejścia stanu, więc niemożliwe jest użycie ich do bezpośredniego przechowywania tajemnic. Istnieją sposoby na przechowywanie poufnych informacji na blockchainie, ale wszystkie opierają się na jakimś komponencie pozałańcuchowym do przechowywania przynajmniej klucza.

- _Integralność_ – informacje są poprawne, nie mogą zostać zmienione przez nieupoważnione podmioty ani w nieautoryzowany sposób (na przykład transfer [tokenów ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) bez zdarzenia `Transfer`). Na blockchainie każdy węzeł weryfikuje każdą zmianę stanu, co zapewnia integralność.

- _Dostępność_ – informacje są dostępne dla każdego upoważnionego podmiotu. Na blockchainie osiąga się to zazwyczaj poprzez udostępnienie informacji na każdym [pełnym węźle](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Wszystkie przedstawione tu rozwiązania mają doskonałą integralność, ponieważ hashe są publikowane w warstwie 1 (L1). Mają one jednak różne gwarancje dostępności.

## Wymagania wstępne {#prerequisites}

Powinieneś dobrze rozumieć [podstawy blockchaina](/developers/docs/intro-to-ethereum/). Ta strona zakłada również, że czytelnik jest zaznajomiony z [blokami](/developers/docs/blocks/), [transakcjami](/developers/docs/transactions/) i innymi powiązanymi tematami.

## Bloby EIP-4844 {#eip-4844-blobs}

Począwszy od [hard forka Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), blockchain Ethereum zawiera [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), który dodaje do Ethereum bloby danych o ograniczonym czasie życia (początkowo około [18 dni](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Te bloby są wyceniane oddzielnie od [gazu wykonawczego](/developers/docs/gas), chociaż wykorzystują podobny mechanizm. Są one tanim sposobem na publikowanie tymczasowych danych.

Głównym przypadkiem użycia blobów EIP-4844 jest publikowanie transakcji przez rollupy. [Optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups) muszą publikować transakcje na swoich blockchainach. Transakcje te muszą być dostępne dla każdego w [okresie wyzwania](https://docs.optimism.io/connect/resources/glossary#challenge-period), aby umożliwić [weryfikatorom](https://docs.optimism.io/connect/resources/glossary#validator) naprawienie błędu, jeśli [sekwenser](https://docs.optimism.io/connect/resources/glossary#sequencer) rollupa opublikuje nieprawidłowy pierwiastek stanu.

Jednak po upływie okresu wyzwania i gdy pierwiastek stanu zostanie sfinalizowany, jedynym pozostałym celem znajomości tych transakcji jest replikacja obecnego stanu łańcucha. Stan ten jest również dostępny z węzłów łańcucha, co wymaga znacznie mniejszego przetwarzania. Informacje o transakcjach powinny być zatem nadal przechowywane w kilku miejscach, takich jak [eksploratory bloków](/developers/docs/data-and-analytics/block-explorers), ale nie ma potrzeby płacenia za poziom odporności na cenzurę, jaki zapewnia Ethereum.

[Rollupy z wiedzą zerową](/developers/docs/scaling/zk-rollups/#data-availability) również publikują swoje dane transakcyjne, aby umożliwić innym węzłom replikację istniejącego stanu i weryfikację dowodów ważności, ale to znowu jest wymóg krótkoterminowy.

W momencie pisania tego tekstu publikacja w EIP-4844 kosztuje jedno wei (10<sup>-18</sup> ETH) za bajt, co jest znikome w porównaniu do [21 000 gazu wykonawczego, które kosztuje każda transakcja, w tym ta publikująca bloby](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Aktualną cenę EIP-4844 można sprawdzić na stronie [blobscan.com](https://blobscan.com/blocks).

Oto adresy, pod którymi można zobaczyć bloby opublikowane przez niektóre znane rollupy.

| Rollup                               | Adres skrzynki pocztowej                                                                                                         |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Dane wywołania {#calldata}

Dane wywołania odnoszą się do bajtów wysyłanych jako część transakcji. Są one przechowywane jako część stałego rekordu blockchaina w bloku, który zawiera tę transakcję.

Jest to najtańsza metoda na trwałe umieszczenie danych na blockchainie. Koszt za bajt wynosi 4 jednostki gazu wykonawczego (jeśli bajt ma wartość zero) lub 16 jednostek gazu (dowolna inna wartość). Jeśli dane są skompresowane, co jest standardową praktyką, to każda wartość bajtu jest równie prawdopodobna, więc średni koszt wynosi około 15,95 gazu za bajt.

W momencie pisania tego tekstu ceny wynoszą 12 gwei/gaz i 2300 USD/ETH, co oznacza, że koszt wynosi około 45 centów za kilobajt. Ponieważ była to najtańsza metoda przed EIP-4844, to właśnie jej używały rollupy do przechowywania informacji o transakcjach, które muszą być dostępne dla [wyzwań błędów (fault challenges)](https://docs.optimism.io/stack/protocol/overview#fault-proofs), ale nie muszą być dostępne bezpośrednio onchain.

Oto adresy, pod którymi można zobaczyć transakcje opublikowane przez niektóre znane rollupy.

| Rollup                               | Adres skrzynki pocztowej                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Pozałańcuchowo z mechanizmami warstwy 1 (L1) {#offchain-with-l1-mechs}

W zależności od kompromisów w zakresie bezpieczeństwa, akceptowalne może być umieszczenie informacji w innym miejscu i użycie mechanizmu, który zapewnia dostępność danych w razie potrzeby. Aby to zadziałało, muszą zostać spełnione dwa wymagania:

1. Opublikowanie [hasha](https://en.wikipedia.org/wiki/Cryptographic_hash_function) danych na blockchainie, zwanego _zobowiązaniem wejściowym (input commitment)_. Może to być pojedyncze 32-bajtowe słowo, więc nie jest to drogie. Dopóki zobowiązanie wejściowe jest dostępne, integralność jest zapewniona, ponieważ znalezienie jakichkolwiek innych danych, które dałyby ten sam hash, jest niewykonalne. Jeśli więc zostaną dostarczone nieprawidłowe dane, można to wykryć.

2. Posiadanie mechanizmu zapewniającego dostępność. Na przykład w [Redstone](https://redstone.xyz/docs/what-is-redstone) każdy węzeł może przesłać wyzwanie dostępności. Jeśli sekwenser nie odpowie onchain przed upływem terminu, zobowiązanie wejściowe zostaje odrzucone, więc uznaje się, że informacje nigdy nie zostały opublikowane.

Jest to akceptowalne dla optymistycznego rollupa, ponieważ i tak polegamy na posiadaniu co najmniej jednego uczciwego weryfikatora dla pierwiastka stanu. Taki uczciwy weryfikator upewni się również, że posiada dane do przetwarzania bloków, i wyda wyzwanie dostępności, jeśli informacje nie będą dostępne pozałańcuchowo. Ten typ optymistycznego rollupa nazywa się [Plasma](/developers/docs/scaling/plasma/).

## Kod kontraktu {#contract-code}

Informacje, które muszą zostać zapisane tylko raz, nigdy nie są nadpisywane i muszą być dostępne onchain, mogą być przechowywane jako kod kontraktu. Oznacza to, że tworzymy „inteligentny kontrakt” z danymi, a następnie używamy [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) do odczytania informacji. Zaletą jest to, że kopiowanie kodu jest stosunkowo tanie.

Poza kosztem rozszerzenia pamięci, `EXTCODECOPY` kosztuje 2600 gazu za pierwszy dostęp do kontraktu (gdy jest on „zimny”) i 100 gazu za kolejne kopie z tego samego kontraktu plus 3 gazu za 32-bajtowe słowo. W porównaniu z danymi wywołania, które kosztują 15,95 za bajt, jest to tańsze zaczynając od około 200 bajtów. Opierając się na [wzorze na koszty rozszerzenia pamięci](https://www.evm.codes/about#memoryexpansion), dopóki nie potrzebujesz więcej niż 4 MB pamięci, koszt rozszerzenia pamięci jest mniejszy niż koszt dodania danych wywołania.

Oczywiście jest to tylko koszt _odczytu_ danych. Utworzenie kontraktu kosztuje około 32 000 gazu + 200 gazu/bajt. Metoda ta jest opłacalna tylko wtedy, gdy te same informacje muszą być odczytywane wiele razy w różnych transakcjach.

Kod kontraktu może być bezsensowny, o ile nie zaczyna się od `0xEF`. Kontrakty zaczynające się od `0xEF` są interpretowane jako [format obiektu Ethereum (EOF)](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), który ma znacznie bardziej rygorystyczne wymagania.

## Zdarzenia {#events}

[Zdarzenia](https://docs.alchemy.com/docs/solidity-events) są emitowane przez inteligentne kontrakty i odczytywane przez oprogramowanie pozałańcuchowe.
Ich zaletą jest to, że kod pozałańcuchowy może nasłuchiwać zdarzeń. Kosztem jest [gaz](https://www.evm.codes/#a0?fork=cancun), 375 plus 8 gazu za bajt danych. Przy 12 gwei/gaz i 2300 USD/ETH przekłada się to na jeden cent plus 22 centy za kilobajt.

## Pamięć masowa (Storage) {#storage}

Inteligentne kontrakty mają dostęp do [trwałej pamięci masowej](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Jest to jednak bardzo drogie. Zapisanie 32-bajtowego słowa w pustym wcześniej slocie pamięci może [kosztować 22 100 gazu](https://www.evm.codes/#55?fork=cancun). Przy 12 gwei/gaz i 2300 USD/ETH daje to około 61 centów za operację zapisu, czyli 19,5 USD za kilobajt.

Jest to najdroższa forma przechowywania danych w Ethereum.

## Podsumowanie {#summary}

Poniższa tabela podsumowuje różne opcje, ich zalety i wady.

| Typ przechowywania                | Źródło danych      | Gwarancja dostępności                                                                                                             | Dostępność onchain                                             | Dodatkowe ograniczenia                                                  |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Bloby EIP-4844              | Pozałańcuchowe            | Gwarancja Ethereum na [~18 dni](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Dostępny jest tylko hash                                           |                                                                         |
| Dane wywołania                    | Pozałańcuchowe            | Gwarancja Ethereum na zawsze (część blockchaina)                                                                                | Dostępne tylko w przypadku zapisania w kontrakcie i w tej konkretnej transakcji |
| Pozałańcuchowo z mechanizmami L1 | Pozałańcuchowe            | Gwarancja „jednego uczciwego weryfikatora” w okresie wyzwania                                                                        | Tylko hash                                                        | Gwarantowane przez mechanizm wyzwania, tylko w okresie wyzwania |
| Kod kontraktu               | Onchain lub pozałańcuchowe | Gwarancja Ethereum na zawsze (część blockchaina)                                                                                | Tak                                                              | Zapisywane pod „losowym” adresem, nie może zaczynać się od `0xEF`                 |
| Zdarzenia                      | Onchain             | Gwarancja Ethereum na zawsze (część blockchaina)                                                                                | Nie                                                               |
| Pamięć masowa                     | Onchain             | Gwarancja Ethereum na zawsze (część blockchaina i obecnego stanu, dopóki nie zostanie nadpisana)                                        | Tak                                                              |