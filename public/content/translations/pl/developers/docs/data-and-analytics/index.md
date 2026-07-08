---
title: Dane i analityka
description: "Jak uzyskać analitykę i dane onchain do wykorzystania w twoich zdecentralizowanych aplikacjach (dapp)"
lang: pl
---

## Wprowadzenie {#introduction}

W miarę jak wykorzystanie sieci stale rośnie, w danych onchain będzie znajdować się coraz więcej cennych informacji. Ponieważ ilość danych gwałtownie rośnie, obliczanie i agregowanie tych informacji w celu raportowania lub napędzania zdecentralizowanej aplikacji (dapp) może stać się przedsięwzięciem czasochłonnym i wymagającym dużych zasobów obliczeniowych.

Wykorzystanie istniejących dostawców danych może przyspieszyć rozwój, zapewnić dokładniejsze wyniki i zmniejszyć bieżące wysiłki związane z utrzymaniem. Pozwoli to zespołowi skoncentrować się na podstawowej funkcjonalności, którą ich projekt ma za zadanie dostarczyć.

## Wymagania wstępne {#prerequisites}

Powinieneś zrozumieć podstawową koncepcję [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/), aby lepiej zrozumieć ich wykorzystanie w kontekście analityki danych. Ponadto zapoznaj się z koncepcją [indeksu](/glossary/#index), aby zrozumieć korzyści, jakie wnoszą one do projektu systemu.

Jeśli chodzi o podstawy architektury, warto zrozumieć, czym są [API](https://www.wikipedia.org/wiki/API) i [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), nawet w teorii.

## Eksploratory bloków {#block-explorers}

Wiele [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/) oferuje bramki [API](https://www.wikipedia.org/wiki/API) typu [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer), które zapewniają deweloperom wgląd w czasie rzeczywistym w dane dotyczące bloków, transakcji, walidatorów, kont i innej aktywności onchain.

Deweloperzy mogą następnie przetwarzać i przekształcać te dane, aby zapewnić swoim użytkownikom unikalne spostrzeżenia i interakcje z [blockchainem](/glossary/#blockchain). Na przykład [Etherscan](https://etherscan.io) i [Blockscout](https://eth.blockscout.com) dostarczają dane dotyczące wykonania i konsensusu dla każdego 12-sekundowego slotu.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) to protokół indeksowania, który zapewnia łatwy sposób na odpytywanie danych z blockchaina za pośrednictwem otwartych API znanych jako podgrafy.

Dzięki The Graph deweloperzy mogą korzystać z:

- Zdecentralizowanego indeksowania: Umożliwia indeksowanie danych z blockchaina przez wielu indeksatorów, eliminując w ten sposób pojedynczy punkt awarii
- Zapytań GraphQL: Zapewnia potężny interfejs GraphQL do odpytywania zindeksowanych danych, co sprawia, że pobieranie danych jest niezwykle proste
- Dostosowywania: Zdefiniuj własną logikę przekształcania i przechowywania danych z blockchaina oraz ponownie wykorzystuj podgrafy opublikowane przez innych deweloperów w sieci The Graph

Postępuj zgodnie z tym [przewodnikiem szybkiego startu](https://thegraph.com/docs/en/quick-start/), aby utworzyć, wdrożyć i odpytać podgraf w ciągu 5 minut.

## Różnorodność klientów {#client-diversity}

[Różnorodność klientów](/developers/docs/nodes-and-clients/client-diversity/) jest ważna dla ogólnego zdrowia sieci Ethereum, ponieważ zapewnia odporność na błędy i exploity. Obecnie istnieje kilka pulpitów nawigacyjnych dotyczących różnorodności klientów, w tym [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) oraz [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) wstępnie przetwarza dane z blockchaina do tabel relacyjnej bazy danych (DuneSQL), pozwala użytkownikom na odpytywanie danych z blockchaina za pomocą SQL i budowanie pulpitów nawigacyjnych na podstawie wyników zapytań. Dane onchain są zorganizowane w 4 surowe tabele: `blocks`, `transactions`, (zdarzenia) `logs` i (wywołania) `traces`. Popularne kontrakty i protokoły zostały zdekodowane, a każdy z nich ma własny zestaw tabel zdarzeń i wywołań. Te tabele zdarzeń i wywołań są dalej przetwarzane i organizowane w tabele abstrakcji według typu protokołów, na przykład dex, pożyczanie, stablecoiny itp.

## SQD {#sqd}

[SQD](https://sqd.dev/) to zdecentralizowana, hiperskalowalna platforma danych zoptymalizowana pod kątem zapewniania wydajnego, niewymagającego pozwoleń dostępu do dużych ilości danych. Obecnie obsługuje historyczne dane onchain, w tym dzienniki zdarzeń, paragony transakcji, ślady i różnice stanu dla poszczególnych transakcji. SQD oferuje potężny zestaw narzędzi do tworzenia niestandardowych potoków ekstrakcji i przetwarzania danych, osiągając prędkość indeksowania do 150 tys. bloków na sekundę.

Aby rozpocząć, odwiedź [dokumentację](https://docs.sqd.dev/) lub zobacz [przykłady EVM](https://github.com/subsquid-labs/squid-evm-examples) tego, co możesz zbudować za pomocą SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) to wiodący indeksator danych, który zapewnia deweloperom szybkie, niezawodne, zdecentralizowane i dostosowane API dla ich projektów Web3. SubQuery wyposaża deweloperów z ponad 165 ekosystemów (w tym Ethereum) w bogate zindeksowane dane, aby budować intuicyjne i wciągające doświadczenia dla ich użytkowników. SubQuery Network napędza Twoje niepowstrzymane aplikacje dzięki odpornej i zdecentralizowanej sieci infrastrukturalnej. Użyj zestawu narzędzi deweloperskich blockchain od SubQuery, aby budować aplikacje Web3 przyszłości, bez tracenia czasu na tworzenie niestandardowego backendu do działań związanych z przetwarzaniem danych.

Aby rozpocząć, odwiedź [przewodnik szybkiego startu dla Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html), aby w kilka minut zacząć indeksować dane z blockchaina Ethereum w lokalnym środowisku Docker w celu testowania, zanim przejdziesz na produkcję w [zarządzanej usłudze SubQuery](https://managedservice.subquery.network/) lub w [zdecentralizowanej sieci SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) to API danych z blockchaina w czasie rzeczywistym, dostarczające wzbogacone dane dla ponad 70 milionów tokenów w ponad 80 sieciach. Deweloperzy mogą uzyskać dostęp do ustrukturyzowanych cen tokenów, sald portfeli, historii transakcji i zagregowanych analiz (wolumen, płynność, unikalne portfele) bez utrzymywania niestandardowej infrastruktury indeksowania. Codex obsługuje dostarczanie danych w czasie poniżej sekundy za pośrednictwem integracji WebSocket i webhooków.

Aby rozpocząć, odwiedź [dokumentację](https://docs.codex.io), wypróbuj [Eksplorator](https://docs.codex.io/explore) lub zarejestruj się w [panelu nawigacyjnym](https://dashboard.codex.io/signup).

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) to język podobny do SQL, zaprojektowany do odpytywania łańcuchów EVM (Ethereum Virtual Machine). Ostatecznym celem EQL jest obsługa złożonych zapytań relacyjnych na obywatelach pierwszej kategorii łańcucha EVM (blokach, kontach i transakcjach), zapewniając jednocześnie deweloperom i badaczom ergonomiczną składnię do codziennego użytku. Dzięki EQL deweloperzy mogą pobierać dane z blockchaina przy użyciu znanej składni podobnej do SQL i wyeliminować potrzebę stosowania złożonego, powtarzalnego kodu. EQL obsługuje standardowe żądania danych z blockchaina (np. pobieranie nonce i salda konta w Ethereum lub pobieranie bieżącego rozmiaru bloku i znacznika czasu) i stale dodaje obsługę bardziej złożonych żądań i zestawów funkcji.

## Dalsza lektura {#further-reading}

- [Eksploracja danych krypto I: Architektury przepływu danych](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Przegląd sieci Graph](https://thegraph.com/docs/en/about/)
- [Środowisko testowe zapytań Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Przykłady kodu API w Etherscan](https://etherscan.io/apis#contracts)
- [Dokumentacja API w Blockscout](https://docs.blockscout.com/devs/apis)
- [Eksplorator Beacon Chain Beaconcha.in](https://beaconcha.in)
- [Podstawy Dune](https://docs.dune.com/#dune-basics)
- [Przewodnik szybkiego startu SubQuery dla Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Przegląd sieci SQD](https://docs.sqd.dev/)
- [EVM Query Language](https://web.archive.org/web/20250719151453/https://www.eql.sh/blog/alpha-release-notes)

## Samouczki: Dane i analityka / SQL na Ethereum {#tutorials}

- [Poznaj podstawowe tematy związane z Ethereum za pomocą SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Odpytuj dane onchain Ethereum za pomocą SQL, aby zrozumieć podstawy transakcji, bloków i gazu._
