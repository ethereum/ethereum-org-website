---
title: Skalowanie
description: Wprowadzenie do różnych opcji skalowania opracowywanych obecnie przez społeczność Ethereum.
lang: pl
sidebarDepth: 3
---

## Przegląd skalowania {#scaling-overview}

Wraz ze wzrostem liczby osób korzystających z Ethereum, blockchain osiągnął pewne ograniczenia pojemności. To spowodowało wzrost kosztów korzystania z sieci, tworząc potrzebę „rozwiązań skalujących”. Istnieje wiele badanych, testowanych i wdrażanych rozwiązań z zastosowanymi różnymi podejściami w celu osiągnięcia podobnych celów.

Głównym celem skalowalności jest zwiększenie szybkości transakcji (szybsza nieodwołalność) i przepustowości transakcji (większa liczba transakcji na sekundę) bez poświęcania decentralizacji lub bezpieczeństwa. Na warstwie 1 blockchaina Ethereum duży popyt prowadzi do wolniejszych transakcji i nieopłacalnych [cen gazu](/developers/docs/gas/). Zwiększenie pojemności sieci pod względem szybkości i przepustowości ma fundamentalne znaczenie dla znaczącego i masowego przyjęcia Ethereum.

Choć szybkość i przepustowość są ważne, kluczowe znaczenie ma to, aby rozwiązania skalujące umożliwiające osiągnięcie tych celów pozostały zdecentralizowane i bezpieczne. Utrzymanie niskiej bariery wejścia dla operatorów węzłów ma kluczowe znaczenie w zapobieganiu postępowi w kierunku scentralizowanej i niezabezpieczonej mocy obliczeniowej.

W sferze koncepcji najpierw kategoryzujemy skalowania jako skalowanie na łańcuchu oraz skalowanie poza łańcuchem.

## Wymagania wstępne {#prerequisites}

Musisz dobrze rozumieć wszystkie podstawowe tematy. Wdrażanie rozwiązań skalujących jest zaawansowane, ponieważ technologia nie jest jeszcze sprawdzona w boju i nadal jest badana i rozwijana.

## Skalowanie na łańcuchu {#onchain-scaling}

Skalowanie na łańcuchu wymaga zmian w protokole Ethereum (warstwa 1 [sieci głównej](/glossary/#mainnet)). Przez długi czas oczekiwano, że sharding blockchainu pozwoli na skalowanie Ethereum. Miało to polegać na podzieleniu blockchainu na dyskretne części (shards), które miały być weryfikowane przez podzbiory walidatorów. Skalowanie za pomocą pakietów zbiorczych warstwy 2 stało się jednak podstawową techniką skalowania. Jest to wspierane przez dodanie nowej, tańszej formy danych dołączonych do bloków Ethereum, która została specjalnie zaprojektowana, aby uczynić pakiety zbiorcze tanimi dla użytkowników.

### Sharding {#sharding}

Sharding to proces dzielenia bazy danych. Podzbiory walidatorów byłyby odpowiedzialne za poszczególne shardy, zamiast śledzić całe Ethereum. Sharding przez długi czas znajdował się w [planie działania](/roadmap/) Ethereum i miał zostać wdrożony przed Połączeniem do proof-of-stake. Jednak szybki rozwój [rollupów warstwy 2](#layer-2-scaling) i wynalezienie [Dankshardingu](/roadmap/danksharding) (dodawanie do bloków Ethereum blobów z danymi rollupów, które mogą być bardzo wydajnie weryfikowane przez walidatorów) sprawiło, że społeczność Ethereum faworyzuje skalowanie skoncentrowane na rollupach zamiast skalowania przez sharding. Pomoże to również uprościć logikę konsensusu Ethereum.

## Skalowanie poza łańcuchem {#offchain-scaling}

Rozwiązania poza łańcuchem są implementowane osobno od pierwszej warstwy sieci głównej — nie wymagają wprowadzania zmian do istniejącego protokołu Ethereum. Niektóre rozwiązania, znane jako rozwiązania "warstwy 2", czerpią swoje bezpieczeństwo bezpośrednio z konsensusu warstwy 1 Ethereum, takie jak [rollupy optymistyczne](/developers/docs/scaling/optimistic-rollups/), [rollupy zerowej wiedzy](/developers/docs/scaling/zk-rollups/) lub [kanały stanu](/developers/docs/scaling/state-channels/). Inne rozwiązania obejmują tworzenie nowych łańcuchów w różnych formach, które czerpią swoje bezpieczeństwo niezależnie od sieci głównej, takie jak [łańcuchy poboczne](#sidechains), [validiumy](#validium) lub [łańcuchy plasma](#plasma). Rozwiązania te komunikują się z siecią główną, ale czerpią swoje bezpieczeństwo w inny sposób, aby osiągnąć różnorodne cele.

### Skalowanie na warstwie 2 {#layer-2-scaling}

Ta kategoria rozwiązań poza łańcuchem czerpie swoje bezpieczeństwo z sieci głównej Ethereum.

Warstwa 2 to zbiorczy termin dla rozwiązań zaprojektowanych, aby pomóc w skalowaniu aplikacji poprzez obsługę transakcji poza siecią główną Ethereum (warstwa 1), jednocześnie korzystając z solidnego zdecentralizowanego modelu zabezpieczeń sieci głównej. Szybkość transakcji pogarsza się, gdy sieć jest zajęta, co sprawia, że doświadczenie użytkownika jest słabe w przypadku niektórych zdecentralizowanych aplikacji. A gdy sieć staje się coraz bardziej zajęta, ceny gazu rosną, ponieważ nadawcy transakcji starają się przelicytować się nawzajem. To może sprawić, że korzystanie z Ethereum będzie bardzo kosztowne.

Większość rozwiązań warstwy 2 skupia się wokół serwera lub klastra serwerów, z których każdy może być określany jako węzeł, walidator, operator, sekwencer, wytwórca bloku lub podobnie. Zależnie od implementacji te węzły warstwy 2 mogą być uruchamiane przez osoby, firmy lub podmioty, które ich używają, lub przez operatora zewnętrznego, lub przez dużą grupę osób (podobnie do sieci głównej). Ogólnie rzecz biorąc, transakcje są przesyłane do tych węzłów warstwy 2 zamiast bezpośrednio do warstwy 1 (sieci głównej). W przypadku niektórych rozwiązań instancja warstwy drugiej grupuje je następnie przed zakotwiczeniem w warstwie pierwszej. Gdy to nastąpi, są one zabezpieczone przez warstwę pierwszą i nie mogą zostać zmienione. Szczegóły dotyczące sposobu realizacji tego celu różnią się znacznie w zależności od technologii i implementacji warstwy 2.

Określone wystąpienie warstwy 2 może być otwarte i współużytkowane przez wiele aplikacji lub może zostać wdrożone przez jeden projekt i przeznaczone do obsługi tylko jego aplikacji.

#### Do czego jest potrzebna warstwa 2? {#why-is-layer-2-needed}

- Zwiększona liczba transakcji na sekundę znacznie poprawia wrażenia użytkownika i zmniejsza przeciążenie sieci głównej Ethereum.
- Transakcje są zwijane w jedną transakcję do sieci głównej Ethereum, co zmniejsza opłaty za gaz dla użytkowników i sprawia, że Ethereum jest bardziej inkluzywne i dostępne dla ludzi na całym świecie.
- Żadne aktualizacje skalowalności nie powinny odbywać się kosztem decentralizacji ani bezpieczeństwa — warstwa 2 wykorzystuje sieć Ethereum.
- Istnieją specyficzne dla aplikacji sieci warstwy 2, które oferują własny zestaw wydajności podczas pracy z aktywami na dużą skalę.

[Więcej o warstwie 2](/layer-2/).

#### Rollupy {#rollups}

Pakiety zbiorcze wykonują transakcje poza warstwą 1, a następnie dane są przesyłane do warstwy 1, gdzie osiągany jest konsensus. Dane transakcji są zawarte w blokach warstwy 1, co pozwala na zabezpieczenie pakietów zbiorczych przez natywne zabezpieczenia Ethereum.

Istnieją dwa typy pakietów zbiorczych z różnymi modelami zabezpieczeń:

- **Rollupy optymistyczne**: zakładają, że transakcje są domyślnie ważne i uruchamiają obliczenia, za pomocą [**dowodu oszustwa**](/glossary/#fraud-proof), tylko w przypadku zakwestionowania. [Więcej o rollupach optymistycznych](/developers/docs/scaling/optimistic-rollups/).
- **Rollupy zerowej wiedzy**: uruchamiają obliczenia poza łańcuchem i przesyłają do łańcucha [**dowód ważności**](/glossary/#validity-proof). [Więcej o rollupach zerowej wiedzy](/developers/docs/scaling/zk-rollups/).

#### Kanały stanu {#channels}

Kanały uzyskiwania informacji używają kontraktów multisig do umożliwienia uczestnikom dowolnego wykonywania szybkich transakcji oraz późniejszego ustalania nieodwołalności z siecią główną. Minimalizuje to zatory sieciowe, opłaty i opóźnienia. Dwa typy kanałów to obecnie kanały uzyskiwania informacji i kanały płatnicze.

Dowiedz się więcej o [kanałach stanu](/developers/docs/scaling/state-channels/).

### Łańcuchy poboczne {#sidechains}

Łańcuch poboczny to niezależny, kompatybilny z EVM blockchain, który działa równolegle do sieci głównej. Są one kompatybilne z Ethereum za pośrednictwem dwukierunkowych mostów i działają zgodnie z własnymi zasadami konsensusu i parametrami bloków.

Dowiedz się więcej o [łańcuchach pobocznych](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Łańcuch plasma to oddzielny blockchain zakotwiczony w głównym łańcuchu Ethereum, który używa dowodów oszustwa (podobnie jak [rollupy optymistyczne](/developers/docs/scaling/optimistic-rollups/)) do rozstrzygania sporów.

Dowiedz się więcej o [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Łańcuch Validium wykorzystuje dowody ważności, takie jak pakiety zbiorcze o wiedzy zerowej, ale dane nie są przechowywane w głównym łańcuchu Ethereum warstwy 1. Może to prowadzić do 10 tysięcy transakcji na sekundę na łańcuch Validium i można równolegle uruchomić wiele łańcuchów.

Dowiedz się więcej o [Validium](/developers/docs/scaling/validium/).

## Dlaczego potrzebujemy tak wielu rozwiązań do skalowania? {#why-do-we-need-these}

- Wiele rozwiązań może pomóc zmniejszyć ogólne przeciążenie w dowolnej części sieci, a także zapobiegać pojedynczym punktom awarii.
- Całość jest większa niż suma jej części. Różne rozwiązania mogą istnieć i działać w harmonii, pozwalając na uzyskanie wykładniczego efektu w zakresie szybkości i przepustowości transakcji w przyszłości.
- Nie wszystkie rozwiązania wymagają bezpośredniego wykorzystania algorytmu konsensusu Ethereum, a alternatywne rozwiązania mogą oferować korzyści, które w przeciwnym razie byłoby trudno uzyskać.

## Jesteś raczej wzrokowcem? Dla wzrokowców {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Zauważ, że wyjaśnienie przedstawione w wideo zawiera termin "Warstwa druga" odnosząc się do wszystkich rozwiązań skalowania poza łańcuchem, podczas gdy my wyróżniamy "Warstwę drugą" jako rozwiązanie skalowania poza łańcuchem, które czerpie swoje bezpieczeństwo z konsensusu pierwszej warstwy sieci głównej._

<YouTube id="7pWxCklcNsU" />

## Dalsza lektura {#further-reading}

- [Plan działania Ethereum skoncentrowany na rollupach](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Aktualne analizy rozwiązań skalowania warstwy 2 dla Ethereum](https://www.l2beat.com/)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Niekompletny przewodnik po rollupach](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Ethereum-powered ZK-Rollups: World Beaters](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollupy optymistyczne kontra rollupy ZK](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Dlaczego rollupy i shardy danych są jedynym zrównoważonym rozwiązaniem zapewniającym wysoką skalowalność](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Jakiego rodzaju warstwy 3 mają sens?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Dostępność danych, czyli jak rollupy nauczyły się nie martwić i pokochały Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [Praktyczny przewodnik po rollupach Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
