---
title: Łańcuchy odłamkowe
description: Dowiedz się więcej na temat łańcuchów odłamkowych – podział sieci na drobne kawałki zwiększa transakcyjną pojemność Ethereum i sprawia, że łatwiej ją uruchamiać.
lang: pl
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Sharding jest wieloetapowym uaktualnieniem, które polega na zwiększeniu skalowalności i pojemności.
summaryPoint2: Łańcuchy odłamkowe rozkładają obciążenie sieci na 64 nowe łańcuchy.
summaryPoint3: Sprawiają że łatwiej uruchamiać węzły przez zmniejszenie wymagań sprzętowych
summaryPoint4: Techniczne wytyczne zawierają pracę nad łańcuchami szczątkowymi podczas „Fazy 1” i potencjalnie „Fazy 2”
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Łańcuchy odłamkowe powinny być dostarczone około 2023 r., w zależności od tego, jak będą postępowały prace po wdrożeniu <a href="/upgrades/beacon-chain/">łańcucha śledzącego</a>. Te fragmentacje dadzą Ethereum większą pojemność przechowywania i dostępu do danych, ale nie będzie można ich używać do wykonywania kodu. Szczegóły tego są wciąż opracowywane.
</UpgradeStatus>

## Czym jest sharding? {#what-is-sharding}

Sharding jest procesem horyzontalnego dzielenia bazy danych, aby rozkładać obciążenie – to powszechnie stosowana koncepcja w informatyce. W kontekście Ethereum sharding zredukuje przeciążenie sieci i zwiększy liczbę transakcji wykonywanych w ciągu sekundy przez utworzenie nowych łańcuchów zwanych „odłamkami” (dosł. „szczątkami”).

Jest to istotne z innych niż skalowalność powodów.

## Cechy shardingu {#features-of-sharding}

### Każdy może uruchomić węzeł {#everyone-can-run-a-node}

Sharding jest dobrym sposobem na skalowanie, jeżeli chcemy zachować decentralizację jako alternatywę do skalowania przez zwiększanie rozmiaru istniejącej bazy danych. Uczyniłoby to sieć Ethereum mniej dostępną dla walidatorów, ponieważ potrzebowaliby mocnych i drogich komputerów. W przypadku standardowych łańcuchów odłamkowych walidatorzy muszą jedynie przechowywać/przetwarzać dane dla odłamka, który sprawdzają, a nie całej sieci (jak to dzieje się dziś). Przyspiesza to sprawy i drastycznie ogranicza wymagania sprzętowe.

### Większy udział w sieci {#more-network-participation}

Sharding pozwoli Ci w końcu uruchamiać Ethereum na osobistym laptopie bądź telefonie. Wobec tego więcej osób powinno mieć możliwość partycypacji lub uruchamiania [klientów](/developers/docs/nodes-and-clients/) w podzielonym na odłamki Ethereum. Zwiększy to bezpieczeństwo, ponieważ im bardziej sieć jest zdecentralizowana, tym mniejsza przestrzeń płaszczyzny ataku.

Dzięki zmniejszonym wymaganiom sprzętowym fragmentacja ułatwi samodzielne uruchamianie [klientów](/developers/docs/nodes-and-clients/), bez polegania na usługach pośredniczących. Jeśli masz taką możliwość, rozważ uruchamianie wielu klientów. Może to pomóc poprawić pracę sieci przez zmniejszenie liczby punktów awarii. [Uruchom klienta Eth2](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Na początku musisz uruchomić klienta sieci głównej w tym samym czasie co klienta Eth2. <a href="https://launchpad.ethereum.org" target="_blank">Launchpad</a> poprowadzi Cię przez wymagania sprzętowe oraz proces. Jako alternatywnego rozwiązania możesz też użyć <a href="/developers/docs/apis/backend/#available-libraries">backendowego API</a>.
</InfoBanner>

## Wersja 1 łańcucha odłamkowego: dostępność danych {#data-availability}

Kiedy pierwsze łańcuchy odłamkowe zostaną wysłane, dostarczą dodatkowe dane do sieci. Nie będą obsługiwać transakcji ani inteligentnych kontraktów. Ale nadal w połączeniu z wartościami zbiorczymi oferują niesamowitą poprawę liczby transakcji na sekundę.

Wartości zbiorcze to technologia „warstwy 2”, która istnieje obecnie. Pozwalają one zdecentralizowanym aplikacjom (dapps) na łączenie lub „zbieranie” transakcji w jedną transakcję poza łańcuchem, generowanie dowodów kryptograficznych, a następnie przesyłanie ich do łańcucha. Ogranicza to dane potrzebne do transakcji. Połącz to ze wszystkimi dodatkowymi danymi dostarczonymi przez odłamki i otrzymujesz 100 000 transakcji na sekundę.

[Więcej o wartościach zbiorczych](/developers/docs/layer-2-scaling/)

## Wersja 2 łańcucha odłamkowego: wykonywanie kodu {#code-execution}

Plan zawsze zakładał dodanie dodatkowej funkcjonalności do odłamków, aby uczynić je bardziej podobnymi do dzisiejszej [sieci głównej Ethereum](/glossary/#mainnet). Umożliwiłoby to im przechowywanie i wykonywanie inteligentnych kontraktów oraz obsługę kont. Ale biorąc pod uwagę wzrost liczby transakcji na sekundę, jaki zapewniają odłamki w wersji 1, czy jest to jeszcze potrzebne? Kwestia ta jest nadal przedmiotem debaty we wspólnocie i wydaje się, że istnieje kilka opcji.

### Czy odłamki wymagają wykonania kodu? {#do-shards-need-code-execution}

Vitalik Buterin, podczas rozmowy w ramach podcastu Bankless, przedstawił 3 potencjalne opcje, które warto przedyskutować.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Wykonywanie stanu nie jest wymagane {#state-execution-not-needed}

Oznaczałoby to, że nie dajemy odłamkom możliwości obsługi inteligentnych kontraktów i zostawimy je jako magazyny danych.

#### 2. Miej kilka odłamków wykonawczych {#some-execution-shards}

Być może istnieje kompromis, w którym nie potrzebujemy wszystkich odłamków (64 są obecnie planowane), aby być mądrzejszymi. Moglibyśmy po prostu dodać tę funkcjonalność do kilku z nich, a resztę zostawić. Mogłoby to przyspieszyć realizację.

#### 3. Poczekaj, aż będziemy w stanie uzyskać dowody ZK-Snarks {#wait-for-zk-snarks}

Na koniec, być może powinniśmy ponownie przyjrzeć się tej debacie, gdy dowody ZK-Snarks będą bardziej zdecydowane. Jest to technologia, która mogłaby przyczynić się do wprowadzenia do sieci prawdziwie prywatnych transakcji. Prawdopodobnie będą potrzebować inteligentniejszych odłamków, ale są one wciąż w fazie badań i rozwoju.

#### Inne źródła {#other-sources}

Oto kolejne przemyślenia na ten sam temat:

- [Faza pierwsza i wykonane: Eth2 jako silnik dostępności danych](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, etresear.ch_

Jest to wciąż aktywny punkt dyskusji. Zaktualizujemy te strony, gdy dowiemy się więcej.

## Związek pomiędzy ulepszeniami {#relationship-between-upgrades}

Ulepszenia Eth2 są ze sobą w pewien sposób powiązane. Podsumujmy więc, jak łańcuchy odłamków odnoszą się do innych ulepszeń.

### Odłamki i łańcuch śledzący {#shards-and-beacon-chain}

Łańcuch śledzący zawiera całą logikę zabezpieczania i synchronizacji odłamków. Łańcuch śledzący będzie koordynował pracę stakerów w sieci, przydzielając ich do odłamków, nad którymi muszą pracować. Ułatwi to również komunikację między odłamkami poprzez odbieranie i przechowywanie odłamków danych transakcyjnych, które są dostępne dla innych odłamków. To zapewni odłamkom migawkę stanu Ethereum, aby wszystko było aktualne.

<ButtonLink to="/upgrades/beacon-chain/">Łańcuch śledzący</ButtonLink>

### Odłamki i dokowanie {#shards-and-docking}

Sieć główna Ethereum będzie istnieć tak jak obecnie, nawet po wprowadzeniu odłamków. Jednak w pewnym momencie sieć główna będzie musiała stać się odłamkiem, aby mogła przejść na stakowanie. Nie wiadomo jeszcze, czy sieć główna będzie istniała jako jedyny „inteligentny” odłamek, który może wykonywać kody — ale tak czy inaczej, trzeba będzie podjąć decyzję w sprawie fazy 2 shardingu.

<ButtonLink to="/upgrades/merge/">Dokowanie</ButtonLink>

<Divider />

### Czytaj więcej {#read-more}

<ShardChainsList />
