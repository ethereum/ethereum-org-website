---
title: Dane i analityka
description: Jak pozyskać analizy na łańcuchu oraz dane do wykorzystania w dapkach
lang: pl
---

## Wprowadzenie {#Introduction}

W miarę rozrastania się sieci Ethereum coraz więcej wartościowych informacji będzie istniało pośród danych na łańcuchu. W miarę szybkiego wzrostu ilości danych obliczanie i agregowanie tych informacji w celu tworzenia raportów lub napędzania zdecentralizowanych aplikacji może stać się czasochłonnym i skomplikowanym przedsięwzięciem.

Wykorzystanie istniejących dostawców danych może przyspieszyć rozwój, zapewnić dokładniejsze wyniki i zmniejszyć bieżące koszty utrzymania. Umożliwi to zespołowi skupienie się na podstawowej funkcjonalności dostarczanej przez projekt.

## Wymagania wstępne {#prerequisites}

Należy rozumieć podstawową koncepcję [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/), aby lepiej zrozumieć ich zastosowanie w kontekście analityki danych. Ponadto należy zapoznać się z pojęciem [indeksu](/glossary/#index), aby zrozumieć korzyści, jakie wnosi on do projektu systemu.

W kwestii podstaw architektury, zrozumienie czym są [API](https://www.wikipedia.org/wiki/API) i [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), nawet w teorii.

## Eksploratory bloków {#block-explorers}

Wiele [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/) oferuje bramki [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer), które zapewnią programistom wgląd w dane czasu rzeczywistego na temat bloków, transakcji, walidatorów, kont i innych działań w łańcuchu.

Programiści mogą następnie przetwarzać i przekształcać te dane, aby zapewnić swoim użytkownikom unikalny wgląd i interakcje z [blockchainem](/glossary/#blockchain). Na przykład [Etherscan](https://etherscan.io) i [Blockscout](https://eth.blockscout.com) dostarczają dane dotyczące wykonania i konsensusu dla każdego 12-sekundowego slotu.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) to protokół indeksujący, który zapewnia łatwy sposób odpytywania danych z blockchaina za pomocą otwartych interfejsów API, znanych jako podgrafy.

Za pomocą The Graph, programiści mogą czerpać korzyści z:

- Zdecentralizowane indeksowanie: Umożliwia indeksowanie danych blockchain z pomocą wielu podmiotów, tym samym eliminując potencjalne pojedyncze punkty awarii
- Zapytania GraphQL: Dostarcza potężny interfejs GraphQL do zapytań indeksowanych danych, sprawiając, że pozyskanie danych jest super proste
- Dostosowywanie: Definiowanie własnej logiki przekształcania i przechowywania danych z blockchaina oraz ponowne wykorzystywanie podgrafów opublikowanych przez innych programistów w sieci The Graph Network.

Należy postępować zgodnie z tym przewodnikiem [szybkiego startu](https://thegraph.com/docs/en/quick-start/), aby utworzyć, wdrożyć i odpytać podgraf w ciągu 5 minut.

## Różnorodność klientów {#client-diversity}

[Różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/) jest ważna dla ogólnego stanu sieci Ethereum, ponieważ zapewnia odporność na błędy i exploity. Obecnie istnieje kilka pulpitów nawigacyjnych dotyczących różnorodności klientów, w tym [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) i [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) wstępnie przetwarza dane blockchaina w tabele relacyjnej bazy danych (DuneSQL), pozwala użytkownikom odpytywać dane blockchaina za pomocą SQL i tworzyć pulpity nawigacyjne na podstawie wyników zapytań. Dane on-chain są zorganizowane w 4 surowych tabelach: `blocks`, `transactions`, (event) `logs` oraz (call) `traces`. Popularne kontrakty i protokoły zostały rozszyfrowane, a każdy z nich posiada własny zestaw tabel wydarzeń i wywołań. Te tabele wydarzeń i wywołań są dalej przetwarzane i organizowane w tabele abstrakcji według rodzaju protokołów, na przykład dex, pożyczki, stablecoiny itp.

## SQD {#sqd}

[SQD](https://sqd.dev/) to zdecentralizowana, hiperskalowalna platforma danych zoptymalizowana pod kątem zapewniania wydajnego, niewymagającego zezwoleń dostępu do dużych ilości danych. Aktualnie przedstawia dane historyczne z łańcucha takie jak rejestry zdarzeń, potwierdzenia transakcji, ślady, różnice stanu dla każdej transakcji. SQD oferuje skuteczny zestaw narzędzi do tworzenia niestandardowych procesów pozyskiwania i przetwarzania danych, osiągając prędkość indeksowania sięgającą 150 tysięcy bloków na sekundę.

Aby zacząć, należy odwiedzić [dokumentację](https://docs.sqd.dev/) lub zobaczyć [przykłady EVM](https://github.com/subsquid-labs/squid-evm-examples), aby dowiedzieć się, co można zbudować za pomocą SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) to wiodący indeksator danych, który zapewnia programistom szybkie, niezawodne, zdecentralizowane i dostosowane interfejsy API dla ich projektów web3. SubQuery wspomaga pracę programistów z ponad 165 ekosystemów (włącznie z Ethereum) za pomocą bogatych indeksowanych danych, które wykorzystać można do tworzenia intuicyjnych i pochłaniających doświadczeń dla użytkowników. Sieć SubQuery zasila twoje niepowstrzymane apki zdecentralizowaną i odporną infrastrukturą sieciową. Zestawu blockchainowych narzędzi programistycznych SubQuery użyjesz do stworzenia aplikacji przyszłości web3 bez poświęcania czasu na tworzenie niestandardowego backendu do przetwarzania danych.

Aby rozpocząć, należy odwiedzić [przewodnik szybkiego startu Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html), aby w ciągu kilku minut rozpocząć indeksowanie danych z blockchaina Ethereum w lokalnym środowisku Docker do celów testowych, przed uruchomieniem w [usłudze zarządzanej SubQuery](https://managedservice.subquery.network/) lub w [zdecentralizowanej sieci SubQuery](https://app.subquery.network/dashboard).

## Język zapytań EVM {#evm-query-language}

Język zapytań do EVM (EQL) jest podobnym do SQL językiem zaprojektowanym, aby stosować zapytania do łańcuchów EVM (Wirtualnej Maszyny Ethereum). Nadrzędnym celem EQL jest obsługa złożonych zapytań relacyjnych dotyczących najważniejszych obywateli EVM (bloków, kont i transakcji) dając jednocześnie programistom i badaczom ergonomiczną składnię do codziennego użytku. Za pomocą EQL programiści mogą pozyskać dane blockchain, używając składni podobnej do SQL i wykluczając potrzebę użycia skomplikowanego kodu szablonowego. EQL wspiera standardowe żądania dotyczące danych blockchain (np. uzyskanie informacji o nonce danego konta i jego saldzie na Ethereum lub zdobycie aktualnego rozmiaru bloku i znacznika czasu) i ciągle rozszerza wsparcie o bardziej złożone żądania i zestawy funkcji.

## Dalsza lektura {#further-reading}

- [Badanie danych kryptograficznych I: Architektury przepływu danych](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Omówienie Graph Network](https://thegraph.com/docs/en/about/)
- [Piaskownica zapytań Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Przykłady kodu API na Etherscanie](https://etherscan.io/apis#contracts)
- [Dokumentacja API na Blockscout](https://docs.blockscout.com/devs/apis)
- [Beaconcha.in – eksplorator łańcucha śledzącego](https://beaconcha.in)
- [Podstawy Dune](https://docs.dune.com/#dune-basics)
- [Przewodnik szybkiego startu SubQuery dla Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Omówienie sieci SQD](https://docs.sqd.dev/)
- [Język zapytań EVM](https://eql.sh/blog/alpha-release-notes)
