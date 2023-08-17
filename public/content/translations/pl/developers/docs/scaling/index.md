---
title: Skalowanie
description: Wprowadzenie do różnych opcji skalowania opracowywanych obecnie przez społeczność Ethereum.
lang: pl
---

## Omówienie skalowania {#scaling-overview}

Wraz ze wzrostem liczby osób korzystających z Ethereum, blockchain osiągnął pewne ograniczenia pojemności. To spowodowało wzrost kosztów korzystania z sieci, tworząc potrzebę „rozwiązań skalujących”. Istnieje wiele badanych, testowanych i wdrażanych rozwiązań z zastosowanymi różnymi podejściami w celu osiągnięcia podobnych celów.

Głównym celem skalowalności jest zwiększenie szybkości (szybsza nieodwołalność) i przepustowości transakcji (wysoka liczba transakcji na sekundę), bez poświęcania decentralizacji lub bezpieczeństwa (więcej w artykule poświęconym [wizji Eth2](/roadmap/vision/)). W warstwie 1 blockchainu Ethereum wysoki popyt prowadzi do spowolnienia transakcji i nieopłacalnych cen gazu. Zwiększenie pojemności sieci pod względem szybkości i przepustowości ma fundamentalne znaczenie dla znaczącego i masowego przyjęcia Ethereum.

Choć szybkość i przepustowość są ważne, kluczowe znaczenie ma to, aby rozwiązania skalujące umożliwiające osiągnięcie tych celów pozostały zdecentralizowane i bezpieczne. Utrzymanie niskiej bariery wejścia dla operatorów węzłów ma kluczowe znaczenie w zapobieganiu postępowi w kierunku scentralizowanej i niezabezpieczonej mocy obliczeniowej.

Koncepcyjnie najpierw kategoryzujemy skalowanie jako skalowanie on-chain lub off-chain.

## Warunki wstępne {#prerequisites}

Musisz dobrze rozumieć wszystkie podstawowe tematy. Wdrażanie rozwiązań skalujących jest zaawansowane, ponieważ technologia nie jest jeszcze sprawdzona w boju i nadal jest badana i rozwijana.

## Skalowanie on-chain {#on-chain-scaling}

Ta metoda skalowania wymaga zmian w protokole Ethereum ([sieć główna](/glossary/#mainnet) warstwy 1). Obecnie głównym punktem zainteresowania w przypadku tej metody skalowania jest sharding.

### Sharding {#sharding}

Sharding jest procesem poziomego dzielenia bazy danych w celu rozłożenia obciążenia. W kontekście Ethereum sharding zmniejszy zatłoczenie sieci i zwiększy liczbę transakcji na sekundę dzięki tworzeniu nowych łańcuchów — „odłamków”. Odciąży to również każdego walidatora, który nie będzie już musiał przetwarzać wszystkich transakcji w całej sieci.

Dowiedz się więcej o <a href="/roadmap/danksharding/">shardingu</a>.

## Skalowanie off-chain {#off-chain-scaling}

Rozwiązania off-chain są implementowane oddzielnie od sieci głównej warstwy 1 — nie wymagają żadnych zmian w istniejącym protokole Ethereum. Niektóre rozwiązania, określane jako rozwiązania „warstwy 2” czerpią swoje zabezpieczenia bezpośrednio z warstwy 1 konsensusu Ethereum. Są to np. [pakiety zbiorcze](/developers/docs/scaling/#rollups) lub [kanały stanu](/developers/docs/scaling/state-channels/). Inne rozwiązania obejmują tworzenie nowych łańcuchów w różnych formach czerpiących zabezpieczenia oddzielnie z sieci głównej. Są to np. [łańcuchy boczne](#sidechains) lub łańcuchy [plazmy](#plasma). Te rozwiązania komunikują się z siecią główną, ale inaczej uzyskują zabezpieczenia, aby osiągnąć zróżnicowane cele.

### Skalowanie warstwy 2 {#layer-2-scaling}

Rozwiązania off-chain tej kategorii czerpią zabezpieczenia z sieci głównej Ethereum.

Większość rozwiązań warstwy 2 skupia się wokół serwera lub klastra serwerów, z których każdy z nich może być określany jako węzeł, walidator, operator, sekwencer, wytwórca bloku lub podobnie. Zależnie od implementacji te węzły warstwy 2 mogą być uruchamiane przez osoby, firmy lub podmioty, które ich używają, lub przez operatora zewnętrznego, lub przez dużą grupę osób (podobnie do sieci głównej). Ogólnie rzecz biorąc, transakcje są przesyłane do tych węzłów warstwy 2 zamiast bezpośrednio do warstwy 1 (sieci głównej). Niektóre rozwiązania instancja warstwy 2 dzieli na grupy przed zakotwiczeniem ich w warstwie 1, po czym są one zabezpieczane przez warstwę 1 i nie mogą być zmieniane. Szczegóły dotyczące sposobu realizacji tego celu różnią się znacznie w zależności od technologii i implementacji drugiego poziomu.

Określona instancja warstwy 2 może być otwarta i współdzielona przez wiele aplikacji lub może być wdrożona przez jeden projekt i przeznaczona do obsługi tylko jego aplikacji.

#### Pakiety zbiorcze {#rollups}

Pakiety zbiorcze wykonują transakcje poza warstwą 1, a następnie dane są przesyłane do warstwy 1, gdzie osiągany jest konsensus. Ponieważ dane transakcji są zawarte w blokach warstwy 1, pozwala to na zabezpieczenie pakietów zbiorczych przez natywne zabezpieczenia Ethereum.

- [Pakiety zbiorcze ZK](/developers/docs/scaling/zk-rollups/)
- [Optymistyczne pakiety zbiorcze](/developers/docs/scaling/optimistic-rollups/)

Dowiedz się więcej o [pakietach zbiorczych](/developers/docs/scaling/#rollups).

#### Kanały uzyskiwania informacji {#channels}

Kanały uzyskiwania informacji wykorzystują kontrakty z wielopodpisem, aby umożliwić uczestnikom szybką i swobodną transakcję off-chain, a następnie ostateczne rozliczenie z siecią główną. Minimalizuje to zatory sieciowe, opłaty i opóźnienia. Dwa rodzaje kanałów to obecnie kanały uzyskiwania informacji i kanały płatnicze.

Dowiedz się więcej o [kanałach uzyskiwania informacji](/developers/docs/scaling/state-channels/).

### Łańcuchy boczne {#sidechains}

Łańcuch boczny (sidechain) jest niezależnym blockchainem kompatybilnym z EVM, który działa równolegle do sieci głównej. Kompatybilność z Ethereum uzyskują dzięki dwukierunkowym mostkom i działają według własnych zasad konsensusu i parametrów bloków.

Dowiedz się więcej o [łańcuchach bocznych](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Łańcuch plazmowy to oddzielny blockchain, który jest zakotwiczony w głównym łańcuchu Ethereum, i używa dowodów oszustw (takich jak [optymistyczne pakiety zbiorcze](/developers/docs/scaling/optimistic-rollups/)) do arbitrażu sporów.

Dowiedz się więcej o [Plasmie](/developers/docs/scaling/plasma/).

## Dlaczego potrzebujemy tak wielu rozwiązań do skalowania? {#why-do-we-need-these}

- Wiele rozwiązań może pomóc w zmniejszeniu całkowitego przeciążenia w dowolnej części sieci, a także zapobiega występowaniu pojedynczych punktów awarii.
- Całość jest większa niż suma jej części. Różne rozwiązania mogą istnieć i działać w harmonii, pozwalając na uzyskanie wykładniczego efektu w zakresie szybkości i przepustowości transakcji w przyszłości.
- Nie wszystkie rozwiązania wymagają bezpośredniego wykorzystania algorytmu konsensusu Ethereum, a alternatywne rozwiązania mogą oferować korzyści, które w przeciwnym razie byłyby trudne do uzyskania.
- Żadne pojedyncze rozwiązanie skalujące nie wystarczy do realizacji [wizji eth2](/roadmap/vision/).

## Jesteś raczej wzrokowcem? {#a-visual-demo}

<YouTube id="BgCgauWVTs0" />

_Zauważ, że w wyjaśnieniu w filmie termin „Warstwa 2” jest używany w odniesieniu do wszystkich rozwiązań skalowania off-chain, podczas gdy my określamy „warstwę 2” jako rozwiązanie off-chain, które uzyskuje bezpieczeństwo za pośrednictwem konsensusu sieci głównej warstwy 1._

## Dalsza lektura {#further-reading}

- [Aktualne analizy dotyczące rozwiązań skalowania warstwy 2 dla Ethereum](https://www.l2beat.com/)
- [Ocena rozwiązań skalowania warstwy 2 Ethereum: schemat porównawczy](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Niekompletny przewodnik po pakietach zbiorczych](https://vitalik.ca/general/2021/01/05/rollup.html)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
