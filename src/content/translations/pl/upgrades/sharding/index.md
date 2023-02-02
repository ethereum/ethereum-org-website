---
title: Sharding
description: Poznaj sharding — rozkładanie i rozdzielanie obciążenia danymi niezbędne, aby zapewnić sieci Ethereum większą przepustowość transakcji i ułatwić jej działanie.
lang: pl
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Sharding to wieloetapowe uaktualnienie, mające na celu zwiększenie skalowalności i przepustowości sieci Ethereum.
summaryPoint2: Sharding zapewnia bezpieczną dystrybucję wymagań dotyczących przechowywania danych, dzięki czemu pakiety zbiorcze mogą być jeszcze tańsze, a węzły łatwiejsze w obsłudze.
summaryPoint3: Dzięki nim rozwiązania warstwy 2 mogą oferować niskie opłaty za transakcje, wykorzystując jednocześnie zabezpieczenia sieci Ethereum.
summaryPoint4: To uaktualnienie stało się istotniejsze, odkąd Ethereum przeszło na proof-of-stake.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Sharding może zostać wdrożony w roku 2023. Sharding da Ethereum więcej możliwości przechowywania i dostępu do danych, ale powstałe sieci nie będą używane do wykonywania kodu.
</UpgradeStatus>

## Czym jest sharding? {#what-is-sharding}

Sharding jest procesem horyzontalnego dzielenia bazy danych, aby rozkładać obciążenie – to powszechnie stosowana koncepcja w informatyce. W kontekście Ethereum sharding będzie działać synergicznie z [pakietami zbiorczymi warstwy 2](/layer-2/), rozdzielając ciężar obsługi dużej ilości danych potrzebnych do pakietów zbiorczych na całą sieć. Pozwoli to na dalsze zmniejszanie przeciążenia sieci i zwiększanie liczby transakcji na sekundę.

Jest to istotne z innych niż skalowalność powodów.

## Cechy shardingu {#features-of-sharding}

### Każdy może uruchomić węzeł {#everyone-can-run-a-node}

Sharding jest dobrym sposobem na skalowanie, jeżeli chcemy zachować decentralizację jako alternatywę do skalowania przez zwiększanie rozmiaru istniejącej bazy danych. Uczyniłoby to sieć Ethereum mniej dostępną dla walidatorów, ponieważ potrzebowaliby mocnych i drogich komputerów. Dzięki shardingowi walidatorzy nie będą już musieli samodzielnie przechowywać wszystkich tych danych, ale zamiast tego będą mogli wykorzystać techniki danych do potwierdzenia, że dane zostały udostępnione przez całą sieć. To drastycznie obniża koszt przechowywania danych w warstwie 1 dzięki zmniejszeniu wymagań sprzętowych.

### Większy udział w sieci {#more-network-participation}

Sharding pozwoli Ci w końcu uruchamiać Ethereum na osobistym laptopie bądź telefonie. Wobec tego więcej osób powinno mieć możliwość partycypacji lub uruchamiania [klientów](/developers/docs/nodes-and-clients/) w podzielonym na odłamki Ethereum. Zwiększy to bezpieczeństwo, ponieważ im bardziej sieć jest zdecentralizowana, tym mniejsza przestrzeń płaszczyzny ataku.

Dzięki zmniejszonym wymaganiom sprzętowym fragmentacja ułatwi samodzielne uruchamianie [klientów](/developers/docs/nodes-and-clients/), bez polegania na usługach pośredniczących. Jeśli masz taką możliwość, rozważ uruchamianie wielu klientów. Może to pomóc poprawić pracę sieci przez zmniejszenie liczby punktów awarii.

<br />

<InfoBanner isWarning>
  Klient wykonania musi działać jednocześnie z klientem konsensusu. <a href="https://launchpad.ethereum.org" target="_blank">Launchpad</a> poprowadzi Cię przez wymagania sprzętowe oraz proces.
</InfoBanner>

## Wersja 1 łańcucha odłamkowego: dostępność danych {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Uwaga:</strong> plany dotyczące shardingu ewoluowały wraz z rozwojem wydajniejszych metod skalowania. „Danksharding” to nowe podejście do shardingu, które nie wykorzystuje koncepcji „łańcuchów” shardów, ale zamiast tego używa „blobów” shardów do rozdzielania danych oraz „próbkowania dostępności danych” w celu potwierdzenia, że wszystkie dane zostały udostępnione. Ta zmiana planu rozwiązuje ten sam początkowy problem.<br/><br/>
  <strong>Szczegóły poniżej mogą być nieaktualne w stosunku do najnowszych planów rozwoju.</strong> W czasie gdy będziemy aktualizować te rzeczy, sprawdź <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">Przewodnik autostopowicza po Ethereum</a>, aby zapoznać się z doskonałą analizą planu działania Ethereum.
</InfoBanner>

Kiedy pierwsze łańcuchy odłamkowe zostaną wysłane, dostarczą dodatkowe dane do sieci. Nie będą obsługiwać transakcji ani inteligentnych kontraktów. Ale nadal w połączeniu z wartościami zbiorczymi oferują niesamowitą poprawę liczby transakcji na sekundę.

Wartości zbiorcze to technologia „warstwy 2”, która istnieje obecnie. Pozwalają one zdecentralizowanym aplikacjom (dapps) na łączenie lub „zbieranie” transakcji w jedną transakcję poza łańcuchem, generowanie dowodów kryptograficznych, a następnie przesyłanie ich do łańcucha. Ogranicza to dane potrzebne do transakcji. Połącz to ze wszystkimi dodatkowymi danymi dostarczonymi przez odłamki i otrzymujesz 100 000 transakcji na sekundę.

## Wersja 2 łańcucha odłamkowego: wykonywanie kodu {#code-execution}

Zawsze planowano, aby do odłamków dodać dodatkowe funkcje, upodobniające je do dzisiejszej [sieci głównej Ethereum](/glossary/#mainnet). Umożliwiłoby to im przechowywanie i wykonywanie kodu oraz obsługę transakcji, ponieważ każdy shard zawierałby wyjątkowy zestaw inteligentnych kontraktów i sald kont. Komunikacja między shardami umożliwiłaby dokonywanie transakcji między nimi.

Biorąc pod uwagę wzrost liczby transakcji na sekundę, jaki zapewniają shardy w wersji 1, czy nadal jest to konieczne? Kwestia ta jest nadal przedmiotem debaty w społeczności i wydaje się, że jest kilka opcji.

### Czy odłamki wymagają wykonania kodu? {#do-shards-need-code-execution}

Vitalik Buterin podczas rozmowy w podcaście Bankless przedstawił 3 potencjalne opcje, które warto przedyskutować.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Wykonywanie stanu nie jest wymagane {#state-execution-not-needed}

To znaczy, że nie dajemy odłamkom możliwości obsługi inteligentnych kontraktów i zostawiamy je jako magazyny danych.

#### 2. Miej kilka odłamków wykonawczych {#some-execution-shards}

Być może istnieje kompromis, który nie wymaga, aby wszystkie shardy były inteligentniejsze. Moglibyśmy po prostu dodać tę funkcjonalność do kilku z nich, a resztę zostawić. Mogłoby to przyspieszyć realizację.

#### 3. Poczekaj, aż będziemy w stanie uzyskać dowody ZK-Snarks {#wait-for-zk-snarks}

Na koniec, być może powinniśmy ponownie przyjrzeć się tej debacie, gdy dowody ZK-Snarks będą bardziej zdecydowane. Jest to technologia, która mogłaby przyczynić się do wprowadzenia do sieci prawdziwie prywatnych transakcji. Prawdopodobnie będą potrzebować inteligentniejszych shardów, ale są one wciąż w fazie badań i rozwoju.

#### Inne źródła {#other-sources}

Oto kolejne przemyślenia na ten sam temat:

- [Faza pierwsza i wykonane: Eth2 jako silnik dostępności danych](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, etresear.ch_

Jest to wciąż aktywny punkt dyskusji. Zaktualizujemy te strony, gdy dowiemy się więcej.

## Związek pomiędzy ulepszeniami {#relationship-between-upgrades}

Wszystkie uaktualnienia Ethereum są poniekąd wzajemnie powiązane. Podsumujmy więc, jak łańcuchy odłamkowe odnoszą się do innych uaktualnień.

### Shardy i blockchain Ethereum {#shards-and-blockchain}

Logika zapewniająca bezpieczeństwo i synchronizację shardów jest zintegrowana z klientami Ethereum, którzy budują sieć blockchain. Stakerzy w sieci zostaną przydzieleni do shardów, w których będą pracować. Shardy będą miały dostęp do migawek z innych shardów, dzięki czemu będą mogły budować widok stanu Ethereum, aby wszystko było aktualne.

### Czytaj więcej {#read-more}

<ShardChainsList />
