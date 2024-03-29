---
title: Dane i analityka
description: Jak uzyskać analizy i dane on-chain do wykorzystania w Twoich aplikacjach zdecentralizowanych
lang: pl
---

## Wprowadzenie {#Introduction}

W miarę wzrostu wykorzystania sieci coraz więcej cennych informacji będzie znajdować się w danych on-chain. W miarę szybkiego wzrostu ilości danych, obliczanie i agregowanie tych informacji w celu tworzenia raportów lub napędzania aplikacji dapp może stać się czasochłonnym i skomplikowanym przedsięwzięciem.

Wykorzystanie istniejących dostawców danych może przyspieszyć rozwój, dać dokładniejsze wyniki i zmniejszyć nakłady na bieżącą konserwację. Umożliwi to zespołowi skupienie się na podstawowej funkcjonalności dostarczanej przez projekt.

## Warunki wstępne {#prerequisites}

Musisz rozumieć koncepcję leżącą u podstaw [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/), aby lepiej orientować się w kwestiach używania ich w kontekście analizy danych. Dodatkowo, zapoznaj się z koncepcją [indeksu](/glossary/#index), aby zrozumieć korzyści, jakie indeksy dodają do projektu systemu.

W zakresie podstaw architektury, zrozumienie, czym są [API](https://www.wikipedia.org/wiki/API) i [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), nawet teoretycznie.

## Graph {#the-graph}

[Graph Network](https://thegraph.com/) jest zdecentralizowanym protokołem do porządkowania danych blockchainu. Zamiast budować i zarządzać scentralizowanymi magazynami danych w celu agregacji danych on-chain, dzięki The Graph deweloperzy mogą tworzyć bezserwerowe aplikacje, które działają w całości na infrastrukturze publicznej.

Za pomocą [GraphQL](https://graphql.org/), deweloperzy mogą korzystać z każdego otwartego API, znanego jako sub-graph, aby uzyskać niezbędne informacje, które są potrzebne do napędzania ich aplikacji zdecentralizowanych. Dzięki zapytaniom do tych indeksowanych sub-graphów, raporty i aplikacje dapp nie tylko uzyskują korzyści związane z wydajnością i skalowalnością, ale także wbudowaną dokładność zapewnianą przez konsensus sieciowy. W miarę jak do sieci dodawane są nowe ulepszenia i/lub sub-graphy, Twoje projekty mogą szybko iterować, aby wykorzystać te ulepszenia.

## Eksplorator bloków {#block-explorers}

Wiele [eksploratorów bloków](/developers/docs/data-and-analytics/block-explorers/) oferuje bramy [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) zapewniające deweloperom widoczność w czasie rzeczywistym danych dotyczących bloków, transakcji, górników, kont i innych aktywności on-chain.

Programiści mogą następnie przetwarzać i przekształcać te dane, aby umożliwić użytkownikom unikalne informacje i interakcje z [blockchainem](/glossary/#blockchain).

## Dalsza lektura {#further-reading}

- [Przegląd Graph Network](https://thegraph.com/docs/network#overview)
- [Graph Query Playground](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Przykłady kodu API w EtherScan](https://etherscan.io/apis#contracts)
