---
title: Beacon Chain
description: Dowiedz się więcej o Beacon Chain – aktualizacji, która wprowadziła dowód stawki (PoS) w Ethereum.
lang: pl
template: upgrade
image: /images/upgrades/core.png
alt: 
summaryPoints:
  - "Beacon Chain wprowadził dowód stawki (PoS) do ekosystemu Ethereum."
  - "Został połączony z oryginalnym łańcuchem dowodu pracy (PoW) Ethereum we wrześniu 2022 roku."
  - "Beacon Chain wprowadził logikę konsensusu i protokół propagacji bloków (gossip protocol), które obecnie zabezpieczają Ethereum."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  Beacon Chain został uruchomiony 1 grudnia 2020 r. i sformalizował dowód stawki (PoS) jako mechanizm konsensusu Ethereum wraz z aktualizacją The Merge 15 września 2022 r.
</UpgradeStatus>

## Czym jest Beacon Chain? {#what-is-the-beacon-chain}

Beacon Chain to nazwa oryginalnego blockchaina opartego na dowodzie stawki (PoS), który został uruchomiony w 2020 roku. Został stworzony, aby upewnić się, że logika konsensusu dowodu stawki jest solidna i zrównoważona przed włączeniem jej w sieci głównej [Ethereum](/). Dlatego działał on równolegle do oryginalnego Ethereum opartego na dowodzie pracy (PoW). Beacon Chain był łańcuchem „pustych” bloków, ale wyłączenie dowodu pracy i włączenie dowodu stawki w Ethereum wymagało poinstruowania Beacon Chain, aby akceptował dane transakcji od klientów warstwy wykonawczej, łączył je w bloki, a następnie organizował w blockchain przy użyciu mechanizmu konsensusu opartego na dowodzie stawki. W tym samym momencie oryginalni klienci Ethereum wyłączyli swoje kopanie, propagację bloku i logikę konsensusu, przekazując to wszystko do Beacon Chain. Wydarzenie to było znane jako [The Merge](/roadmap/merge/). Gdy nastąpił The Merge, nie było już dwóch blockchainów. Zamiast tego powstało jedno Ethereum oparte na dowodzie stawki, które teraz wymaga dwóch różnych klientów na węzeł. Beacon Chain jest teraz warstwą konsensusu, siecią peer-to-peer klientów konsensusu, która obsługuje propagację bloków (gossip) i logikę konsensusu, podczas gdy oryginalni klienci tworzą warstwę wykonawczą, która jest odpowiedzialna za propagację i wykonywanie transakcji oraz zarządzanie stanem Ethereum. Obie warstwy mogą komunikować się ze sobą za pomocą Engine API.

## Co robi Beacon Chain? {#what-does-the-beacon-chain-do}

Beacon Chain to nazwa nadana księdze rachunkowej, która prowadziła i koordynowała sieć [stakujących](/staking/) w Ethereum, zanim zaczęli oni walidować prawdziwe bloki Ethereum. Nie przetwarza on jednak transakcji ani nie obsługuje interakcji z inteligentnymi kontraktami, ponieważ odbywa się to w warstwie wykonawczej.
Beacon Chain jest odpowiedzialny za takie rzeczy, jak obsługa bloków i poświadczeń, uruchamianie algorytmu wyboru rozwidlenia oraz zarządzanie nagrodami i karami.
Przeczytaj więcej na naszej [stronie o architekturze węzła](/developers/docs/nodes-and-clients/node-architecture/#node-comparison).

## Wpływ Beacon Chain {#beacon-chain-features}

### Wprowadzenie stakingu {#introducing-staking}

Beacon Chain wprowadził [dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos/) do Ethereum. Zapewnia to bezpieczeństwo Ethereum, a walidatorom pozwala zarabiać więcej ETH w tym procesie. W praktyce staking polega na stakowaniu ETH w celu aktywacji oprogramowania walidatora. Jako stakujący uruchamiasz oprogramowanie, które tworzy i waliduje nowe bloki w łańcuchu.

Staking służy podobnemu celowi, co kiedyś [kopanie](/developers/docs/consensus-mechanisms/pow/mining/), ale różni się od niego pod wieloma względami. Kopanie wymagało dużych nakładów początkowych w postaci potężnego sprzętu i zużycia energii, co prowadziło do korzyści skali i promowało centralizację. Kopanie nie wiązało się również z żadnym wymogiem blokowania aktywów jako zabezpieczenia, co ograniczało zdolność protokołu do karania złych aktorów po ataku.

Przejście na dowód stawki sprawiło, że Ethereum stało się znacznie bezpieczniejsze i bardziej zdecentralizowane w porównaniu do dowodu pracy. Im więcej osób uczestniczy w sieci, tym bardziej staje się ona zdecentralizowana i bezpieczna przed atakami.


<Alert variant="update">
<AlertEmoji text=":money_bag:"/>
<AlertContent>
<AlertDescription>
  Jeśli jesteś zainteresowany zostaniem walidatorem i pomocą w zabezpieczaniu Ethereum, [dowiedz się więcej o stakingu](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

### Przygotowanie do shardingu {#setting-up-for-sharding}

Odkąd Beacon Chain połączył się z oryginalną siecią główną Ethereum, społeczność Ethereum zaczęła szukać sposobów na skalowanie sieci.

Dowód stawki ma tę zaletę, że posiada rejestr wszystkich zatwierdzonych producentów bloków w danym momencie, z których każdy ma stakowane ETH. Rejestr ten przygotowuje grunt pod możliwość zastosowania zasady „dziel i rządź”, pozwalając na niezawodne rozdzielenie konkretnych obowiązków w sieci.

Ta odpowiedzialność kontrastuje z dowodem pracy, w którym kopiący nie mają żadnych zobowiązań wobec sieci i mogą w każdej chwili przestać kopać i na stałe wyłączyć oprogramowanie swojego węzła bez żadnych konsekwencji. Nie ma również rejestru znanych proponujących bloki (block proposers) ani niezawodnego sposobu na bezpieczne podzielenie obowiązków w sieci.

[Więcej o shardingu](/roadmap/danksharding/)

## Związek między aktualizacjami {#relationship-between-upgrades}

Wszystkie aktualizacje Ethereum są ze sobą w pewien sposób powiązane. Podsumujmy więc, jak Beacon Chain wpływa na inne aktualizacje.

### Beacon Chain i The Merge {#merge-and-beacon-chain}

Początkowo Beacon Chain istniał oddzielnie od sieci głównej Ethereum, ale zostały one połączone w 2022 roku.

<ButtonLink href="/roadmap/merge/">
  The Merge
</ButtonLink>

### Shardy i Beacon Chain {#shards-and-beacon-chain}

Sharding może bezpiecznie wejść do ekosystemu Ethereum tylko wtedy, gdy wdrożony jest mechanizm konsensusu oparty na dowodzie stawki. Beacon Chain wprowadził staking, który „połączył się” z siecią główną, torując drogę dla shardingu, aby pomóc w dalszym skalowaniu Ethereum.

<ButtonLink href="/roadmap/danksharding/">
  Łańcuchy shardów
</ButtonLink>

## Dalsza lektura {#further-reading}

- [Więcej o architekturze węzła](/developers/docs/nodes-and-clients/node-architecture)
- [Więcej o dowodzie stawki (PoS)](/developers/docs/consensus-mechanisms/pos)