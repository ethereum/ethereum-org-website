---
title: Skalowanie
description: "Wprowadzenie do różnych opcji skalowania, które są obecnie rozwijane przez społeczność Ethereum."
lang: pl
sidebarDepth: 3
---

## Przegląd skalowania {#scaling-overview}

Wraz ze wzrostem liczby osób korzystających z [Ethereum](/), blockchain osiągnął pewne ograniczenia przepustowości. Spowodowało to wzrost kosztów korzystania z sieci, tworząc potrzebę "rozwiązań skalujących". Istnieje wiele rozwiązań, które są badane, testowane i wdrażane, a które przyjmują różne podejścia do osiągnięcia podobnych celów.

Głównym celem skalowalności jest zwiększenie szybkości transakcji (szybsza ostateczność) i przepustowości transakcji (większa liczba transakcji na sekundę) bez poświęcania decentralizacji lub bezpieczeństwa. Na blockchainie Ethereum warstwy 1, wysoki popyt prowadzi do wolniejszych transakcji i nieopłacalnych [cen gazu](/developers/docs/gas/). Zwiększenie pojemności sieci pod względem szybkości i przepustowości ma fundamentalne znaczenie dla znaczącej i masowej adopcji Ethereum.

Chociaż szybkość i przepustowość są ważne, kluczowe jest, aby rozwiązania skalujące umożliwiające osiągnięcie tych celów pozostały zdecentralizowane i bezpieczne. Utrzymanie niskiej bariery wejścia dla operatorów węzłów ma kluczowe znaczenie w zapobieganiu postępowi w kierunku scentralizowanej i niezabezpieczonej mocy obliczeniowej.

Koncepcyjnie najpierw kategoryzujemy skalowanie jako skalowanie onchain lub skalowanie pozałańcuchowe.

## Wymagania wstępne {#prerequisites}

Powinieneś dobrze rozumieć wszystkie podstawowe tematy. Wdrażanie rozwiązań skalujących jest zaawansowane, ponieważ technologia ta jest mniej sprawdzona w boju i nadal jest badana oraz rozwijana.

## Skalowanie onchain {#onchain-scaling}

Skalowanie onchain wymaga zmian w protokole Ethereum ([sieć główna](/glossary/#mainnet) warstwy 1). Przez długi czas oczekiwano, że sharding blockchaina przeskaluje Ethereum. Miało to polegać na podzieleniu blockchaina na odrębne części (shardy), które byłyby weryfikowane przez podzbiory walidatorów. Jednakże skalowanie za pomocą rollupów warstwy 2 przejęło rolę głównej techniki skalowania. Jest to wspierane przez dodanie nowej, tańszej formy danych dołączanych do bloków Ethereum, która została specjalnie zaprojektowana, aby rollupy były tanie dla użytkowników.

### Sharding {#sharding}

Sharding to proces dzielenia bazy danych. Podzbiory walidatorów byłyby odpowiedzialne za poszczególne shardy, zamiast śledzić całe Ethereum. Sharding przez długi czas znajdował się na [mapie drogowej](/roadmap/) Ethereum i kiedyś miał zostać wdrożony przed The Merge do dowodu stawki (PoS). Jednak szybki rozwój [rollupów warstwy 2](#layer-2-scaling) i wynalezienie [dankshardingu](/roadmap/danksharding) (dodawanie obiektów blob z danymi rollupów do bloków Ethereum, które mogą być bardzo wydajnie weryfikowane przez walidatorów) doprowadziły społeczność Ethereum do faworyzowania skalowania skoncentrowanego na rollupach zamiast skalowania przez sharding. Pomoże to również zachować prostszą logikę konsensusu Ethereum.

## Skalowanie pozałańcuchowe {#offchain-scaling}

Rozwiązania pozałańcuchowe są wdrażane niezależnie od sieci głównej warstwy 1 – nie wymagają żadnych zmian w istniejącym protokole Ethereum. Niektóre rozwiązania, znane jako rozwiązania "warstwy 2", czerpią swoje bezpieczeństwo bezpośrednio z konsensusu Ethereum warstwy 1, takie jak [optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups/), [rollupy z wiedzą zerową](/developers/docs/scaling/zk-rollups/) lub [kanały stanu](/developers/docs/scaling/state-channels/). Inne rozwiązania obejmują tworzenie nowych łańcuchów w różnych formach, które czerpią swoje bezpieczeństwo niezależnie od sieci głównej, takie jak [łańcuchy poboczne](#sidechains), [validium](#validium) lub [łańcuchy Plasma](#plasma). Rozwiązania te komunikują się z siecią główną, ale czerpią swoje bezpieczeństwo w inny sposób, aby osiągnąć różnorodne cele.

### Skalowanie warstwy 2 {#layer-2-scaling}

Ta kategoria rozwiązań pozałańcuchowych czerpie swoje bezpieczeństwo z sieci głównej Ethereum.

Warstwa 2 to zbiorcze określenie rozwiązań zaprojektowanych w celu pomocy w skalowaniu aplikacji poprzez obsługę transakcji poza siecią główną Ethereum (warstwa 1), przy jednoczesnym wykorzystaniu solidnego, zdecentralizowanego modelu bezpieczeństwa sieci głównej. Szybkość transakcji spada, gdy sieć jest obciążona, co pogarsza doświadczenia użytkowników w przypadku niektórych typów zdecentralizowanych aplikacji (dapp). W miarę jak sieć staje się coraz bardziej obciążona, ceny gazu rosną, ponieważ nadawcy transakcji starają się przelicytować nawzajem. Może to sprawić, że korzystanie z Ethereum stanie się bardzo drogie.

Większość rozwiązań warstwy 2 koncentruje się wokół serwera lub klastra serwerów, z których każdy może być określany jako węzeł, walidator, operator, sekwenser, producent bloków lub podobnym terminem. W zależności od implementacji, te węzły warstwy 2 mogą być obsługiwane przez osoby fizyczne, firmy lub podmioty, które z nich korzystają, przez zewnętrznego operatora lub przez dużą grupę osób (podobnie jak w sieci głównej). Ogólnie rzecz biorąc, transakcje są przesyłane do tych węzłów warstwy 2 zamiast bezpośrednio do warstwy 1 (sieci głównej). W przypadku niektórych rozwiązań instancja warstwy 2 grupuje je w pakiety przed zakotwiczeniem ich w warstwie 1, po czym są one zabezpieczane przez warstwę 1 i nie mogą zostać zmienione. Szczegóły tego, jak to się odbywa, różnią się znacznie w zależności od technologii i implementacji warstwy 2.

Konkretna instancja warstwy 2 może być otwarta i współdzielona przez wiele aplikacji lub może zostać wdrożona przez jeden projekt i dedykowana do obsługi wyłącznie jego aplikacji.

#### Dlaczego warstwa 2 jest potrzebna? {#why-is-layer-2-needed}

- Zwiększona liczba transakcji na sekundę znacznie poprawia doświadczenia użytkowników i zmniejsza przeciążenie sieci głównej Ethereum.
- Transakcje są zwijane w jedną transakcję do sieci głównej Ethereum, co zmniejsza opłaty za gaz dla użytkowników i czyni Ethereum bardziej inkluzywnym i dostępnym dla ludzi na całym świecie.
- Wszelkie aktualizacje skalowalności nie powinny odbywać się kosztem decentralizacji ani bezpieczeństwa – warstwa 2 jest budowana na bazie Ethereum.
- Istnieją sieci warstwy 2 specyficzne dla aplikacji, które wnoszą własny zestaw ulepszeń wydajności podczas pracy z aktywami na dużą skalę.

[Więcej o warstwie 2](/layer-2/).

#### Rollupy {#rollups}

Rollupy wykonują transakcje poza warstwą 1, a następnie dane są publikowane w warstwie 1, gdzie osiągany jest konsensus. Ponieważ dane transakcji są zawarte w blokach warstwy 1, pozwala to na zabezpieczenie rollupów przez natywne bezpieczeństwo Ethereum.

Istnieją dwa rodzaje rollupów o różnych modelach bezpieczeństwa:

- **Optymistyczne rollupy**: zakładają, że transakcje są domyślnie ważne i wykonują obliczenia tylko za pomocą [**dowodu oszustwa**](/glossary/#fraud-proof) w przypadku zakwestionowania. [Więcej o optymistycznych rollupach](/developers/docs/scaling/optimistic-rollups/).
- **Rollupy z wiedzą zerową**: wykonują obliczenia pozałańcuchowo i przesyłają [**dowód ważności**](/glossary/#validity-proof) do łańcucha. [Więcej o rollupach z wiedzą zerową](/developers/docs/scaling/zk-rollups/).

#### Kanały stanu {#channels}

Kanały stanu wykorzystują kontrakty multisig, aby umożliwić uczestnikom szybkie i swobodne przeprowadzanie transakcji pozałańcuchowo, a następnie rozliczanie ostateczności z siecią główną. Minimalizuje to przeciążenie sieci, opłaty i opóźnienia. Obecnie istnieją dwa rodzaje kanałów: kanały stanu i kanały płatności.

Dowiedz się więcej o [kanałach stanu](/developers/docs/scaling/state-channels/).

### Łańcuchy poboczne {#sidechains}

Łańcuch poboczny to niezależny blockchain kompatybilny z EVM, który działa równolegle do sieci głównej. Są one kompatybilne z Ethereum za pośrednictwem dwukierunkowych mostów i działają zgodnie z własnymi, wybranymi zasadami konsensusu i parametrami bloków.

Dowiedz się więcej o [łańcuchach pobocznych](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Łańcuch Plasma to oddzielny blockchain, który jest zakotwiczony w głównym łańcuchu Ethereum i wykorzystuje dowody oszustwa (podobnie jak [optymistyczne rollupy](/developers/docs/scaling/optimistic-rollups/)) do rozstrzygania sporów.

Dowiedz się więcej o sieci [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Łańcuch validium wykorzystuje dowody ważności, podobnie jak rollupy z wiedzą zerową, ale dane nie są przechowywane w głównym łańcuchu Ethereum warstwy 1. Może to prowadzić do 10 tysięcy transakcji na sekundę na łańcuch validium, a wiele łańcuchów może działać równolegle.

Dowiedz się więcej o [validium](/developers/docs/scaling/validium/).

## Dlaczego potrzeba tak wielu rozwiązań skalujących? {#why-do-we-need-these}

- Wiele rozwiązań może pomóc zmniejszyć ogólne przeciążenie w dowolnej części sieci, a także zapobiec pojedynczym punktom awarii.
- Całość jest czymś więcej niż sumą jej części. Różne rozwiązania mogą istnieć i współpracować w harmonii, pozwalając na wykładniczy wpływ na przyszłą szybkość i przepustowość transakcji.
- Nie wszystkie rozwiązania wymagają bezpośredniego wykorzystania algorytmu konsensusu Ethereum, a alternatywy mogą oferować korzyści, które w przeciwnym razie byłyby trudne do uzyskania.

## Wolisz uczyć się wzrokowo? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Uwaga: wyjaśnienie w filmie używa terminu "warstwa 2" w odniesieniu do wszystkich rozwiązań skalowania pozałańcuchowego, podczas gdy my rozróżniamy "warstwę 2" jako rozwiązanie pozałańcuchowe, które czerpie swoje bezpieczeństwo z konsensusu sieci głównej warstwy 1._

<VideoWatch slug="rollups-scaling-strategy" />

## Dalsza lektura {#further-reading}

- [Mapa drogowa Ethereum skoncentrowana na rollupach](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktualne analizy rozwiązań skalujących warstwy 2 dla Ethereum](https://www.l2beat.com/)
- [Ocena rozwiązań skalujących warstwy 2 Ethereum: ramy porównawcze](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Niekompletny przewodnik po rollupach](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Rollupy ZK oparte na Ethereum: światowi liderzy](https://hackmd.io/@canti/rkUT0BD8K)
- [Optymistyczne rollupy a rollupy ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Dlaczego rollupy i shardy danych są jedynym zrównoważonym rozwiązaniem dla wysokiej skalowalności](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Jakie warstwy 3 mają sens?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Dostępność danych, czyli: jak rollupy przestały się martwiować i pokochały Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Samouczki: Budowanie skalowalnych warstw 2 na Ethereum {#tutorials}

- [Wszystko, co możesz zbuforować](/developers/tutorials/all-you-can-cache/) _– Jak zbudować i używać kontraktu buforującego, aby zmniejszyć koszty danych wywołania w rollupach._
- [Krótkie ABI do optymalizacji danych wywołania](/developers/tutorials/short-abi/) _– Jak używać krótszych ABI, aby zmniejszyć koszty danych wywołania dla transakcji warstwy 2._