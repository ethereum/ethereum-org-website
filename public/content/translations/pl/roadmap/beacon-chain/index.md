---
title: Łańcuch śledzący
description: Dowiedz się więcej o łańcuchu śledzącym — uaktualnieniu, które wprowadziło mechanizm proof-of-stake w sieci Ethereum.
lang: pl
template: upgrade
image: /images/upgrades/core.png
alt:
summaryPoint1: Łańcuch śledzący wprowadził mechanizm proof-of-stake do ekosystemu Ethereum.
summaryPoint2: Został on połączony z pierwotnym łańcuchem proof-of-work Ethereum we wrześniu 2022.
summaryPoint3: Łańcuch śledzący wprowadził logikę konsensusu i protokół uzgadniania bloków, który obecnie zabezpiecza Ethereum.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Łańcuch śledzący wdrożono 1 grudnia 2020 roku, a 15 września 2022 roku uaktualniono Połączenie i sformalizowano proof-of-stake jako mechanizm konsensusu Ethereum.
</UpgradeStatus>

## Czym jest łańcuch śledzący? {#what-is-the-beacon-chain}

Łańcuch śledzący to nazwa oryginalnego blockchainu proof-of-stake, który został uruchomiony w 2020 r. Został on stworzony w celu upewnienia się, że logika konsensusu proof-of-stake jest solidna i zrównoważona przed jej uruchomieniem w sieci głównej Ethereum. W związku z tym działał on równolegle z pierwotnym mechanizmem proof-of-work Ethereum. Łańcuch śledzący był łańcuchem „pustych” bloków, ale wyłączenie proof-of-work i włączenie proof-of-stake na Ethereum wymagało poinstruowania łańcucha śledzącego, aby akceptował dane transakcji od klientów wykonawczych, grupował je w bloki, a następnie organizował je w blockchain przy użyciu mechanizmu konsensusu opartego na proof-of-stake. W tym samym momencie pierwotni klienci Ethereum wyłączyli wydobywanie, propagację bloków i logikę konsensusu, przekazując je w całości łańcuchowi śledzącemu. Wydarzenie to było określane jako [Połączenie](/roadmap/merge/). Gdy doszło do Połączenia, nie było już dwóch blockchainów. Zamiast tego istniał tylko jeden proof-of-stake Ethereum, który teraz wymaga dwóch różnych klientów na węzeł. Łańcuch śledzący jest teraz warstwą konsensusu, siecią peer-to-peer klientów konsensusu, która obsługuje plotki blokowe i logikę konsensusu, podczas gdy oryginalni klienci tworzą warstwę wykonawczą, która jest odpowiedzialna za plotkowanie i wykonywanie transakcji oraz zarządzanie stanem Ethereum. Obie warstwy mogą komunikować się ze sobą za pomocą Engine API.

## Co robi łańcuch śledzący? {#what-does-the-beacon-chain-do}

Łańcuch śledzący to nazwa nadana księdze głównej kont, która prowadziła i koordynowała sieć [stakerów](/staking/) Ethereum, zanim stakerzy ci zaczęli weryfikować prawdziwe bloki Ethereum. Nie przetwarza on jednak transakcji ani nie obsługuje interakcji inteligentnych kontraktów, ponieważ odbywa się to w warstwie wykonawczej. Łańcuch śledzący jest odpowiedzialny za takie rzeczy jak obsługa bloków i poświadczeń, uruchamianie algorytmu wyboru forka oraz zarządzanie nagrodami i karami. Więcej informacji znajdziesz na naszej [stronie architektury węzła](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Wpływ łańcucha śledzącego {#beacon-chain-features}

### Wprowadzenie do stakowania {#introducing-staking}

Łańcuch śledzący wprowadził do Ethereum mechanizm [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Zapewnia to bezpieczeństwo Ethereum, a walidatorzy zarabiają więcej ETH. W praktyce stakowanie polega na stakowaniu ETH w celu aktywowania oprogramowania walidatora. Jako staker używasz oprogramowania, które tworzy i waliduje nowe bloki w łańcuchu.

Stakowanie służy podobnym celom, co kiedyś [wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/), ale różni się pod wieloma względami. Wydobywanie wymagało dużych nakładów początkowych w postaci potężnego sprzętu i zużycia energii, co skutkowało ekonomią skali i promowało centralizację. Wydobywanie nie wiązało się również z żadnym wymogiem blokowania aktywów jako zabezpieczenia, co ograniczało zdolność protokołu do karania złych podmiotów po ataku.

Przejście na proof-of-stake sprawiło, że sieć Ethereum stała się znacznie bezpieczniejsza i zdecentralizowana w porównaniu z proof-of-work. Im więcej osób uczestniczy w sieci, tym bardziej staję się ona zdecentralizowana i lepiej zabezpieczona przed atakami.

Stosowanie proof-of-stake jako mechanizmu konsensusu jest fundamentalnym elementem [bezpiecznego, przyjaznego dla środowiska i skalowalnego Ethereum, które mamy teraz](/roadmap/vision/).

<InfoBanner emoji=":money_bag:">
  Jeśli chcesz zostać walidatorem i pomóc w zabezpieczaniu Ethereum, <a href="/staking/">dowiedz się więcej o stakingu</a>.
</InfoBanner>

### Przygotowanie do shardingu {#setting-up-for-sharding}

Odkąd łańcuch śledzący połączył się z pierwotną siecią główną Ethereum, społeczność Ethereum zaczęła przymierzać się do skalowania sieci.

Zaletą proof-of-stake jest posiadanie rejestru wszystkich zatwierdzonych producentów bloków w danym momencie, z których każdy stakuje ETH. Rejestr ten stwarza możliwość dzielenia i podbijania, ale niezawodnie rozdziela konkretne obowiązki sieciowe.

Ta odpowiedzialność jest przeciwieństwem proof-of-work, gdzie górnicy nie mają żadnych zobowiązań wobec sieci i mogą w jednej chwili zaprzestać wydobycia i wyłączyć oprogramowanie swojego węzła bez żadnych konsekwencji. Nie istnieje też rejestr znanych proponentów bloków ani niezawodny sposób na bezpieczny podział obowiązków sieciowych.

[Więcej o shardingu](/roadmap/danksharding/)

## Relacje między uaktualnieniami {#relationship-between-upgrades}

Wszystkie uaktualnienia Ethereum są w pewnym stopniu wzajemnie powiązane. Podsumujmy zatem, jak łańcuch śledzący wpływa na inne uaktualnienia.

### Łańcuch śledzący i Połączenie {#merge-and-beacon-chain}

Na początku łańcuch śledzący istniał oddzielnie od sieci głównej Ethereum, ale zostały one połączone w 2022 r.

<ButtonLink href="/roadmap/merge/">
  Połączenie
</ButtonLink>

### Shardy i łańcuch śledzący {#shards-and-beacon-chain}

Sharding może bezpiecznie wejść do ekosystemu Ethereum tylko z mechanizmem konsensusu proof-of-stake. Łańcuch śledzący wprowadził staking, który „połączył się” z siecią główną, umożliwiając shardingowi pomoc w dalszym skalowaniu Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Łańcuchy odłamkowe
</ButtonLink>

## Dalsza lektura

- [Więcej na temat przyszłych uaktualnień Ethereum](/roadmap/vision)
- [Więcej o architekturze węzłów](/developers/docs/nodes-and-clients/node-architecture)
- [Więcej o proof-of-stake](/developers/docs/consensus-mechanisms/pos)
