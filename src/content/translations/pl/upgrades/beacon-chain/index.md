---
title: Łańcuch śledzący
description: Dowiedz się więcej o łańcuchu śledzącym, pierwszym większym uaktualnieniu Eth2 dla Ethereum.
lang: pl
template: upgrade
image: ../../../../../assets/upgrades/core.png
summaryPoint1: Łańcuch śledzący nie zmienia nic w Ethereum, którego dziś używamy.
summaryPoint2: Będzie koordynował sieć.
summaryPoint3: Wprowadza dowód stawki do ekosystemu Ethereum.
summaryPoint4: Być może znasz to jako "etap 0" w hamonogramie technicznym
---

<UpgradeStatus isShipped dateKey="page-upgrades-beacon-date">
    Łańcuch śledzący ruszył 1 grudnia w południe czasu uniwersalnego. Aby dowiedzieć się więcej, <a href="https://beaconscan.com/">przeglądaj dane</a>. Jeżeli chcesz pomóc w walidacji łańcucha, możesz <a href="/staking/">zastawić swoje ETH</a>.
</UpgradeStatus>

## Co robi łańcuch śledzący? {#what-does-the-beacon-chain-do}

Łańcuch śledzący będzie prowadził lub koordynował rozszerzoną sieć [fragmentów](/upgrades/sharding/) i [zastawiających](/staking/). Ale nie będzie jak sieć główna [Ethereum](/glossary/#mainnet) dzisiaj. Nie może on obsługiwać kont ani inteligentnych kontraktów.

Rola łańcucha śledzącego z czasem się zmieni, ale jest to podstawowy komponent [bezpiecznego, zrównoważonego i skalowalnego Ethereum, nad którym pracujemy](/upgrades/vision/).

## Funkcje łańcucha śledzącego {#beacon-chain-features}

### Wprowadzenie do zastawiania {#introducing-staking}

Łańcuch śledzący wprowadzi do Ethereum [dowód stawki](/developers/docs/consensus-mechanisms/pos/). Jest to nowy sposób na utrzymanie bezpieczeństwa Ethereum. Pomyśl o tym jak o dobru wspólnym, które sprawi, że Ethereum stanie się zdrowsze i w trakcie pozwoli ci zarobić więcej ETH. W praktyce będzie to wymagało od ciebie inwestowania ETH w celu aktywacji oprogramowania walidującego. Jako walidator będziesz przetwarzać transakcje i tworzyć nowe bloki w łańcuchu.

Zastawianie i stawanie się walidatorem jest łatwiejsze niż [wydobywanie](/developers/docs/mining/) (sposób w jaki sieć jest zabezpieczana obecnie). Mechanizm ten ma szansę w dłuższej perspektywie zwiększyć bezpieczeństwo Ethereum. Im więcej osób będzie współpracować w sieci, tym bardziej stanie się zdecentralizowana i zabezpieczona przed atakiem.

<InfoBanner emoji=":money_bag:">
Jeżeli jesteś zainteresowany staniem się walidatorem i pomocą w zabezpieczaniu łańcucha śledzącego, <a href="/staking/">dowiedz się więcej o zastawianiu</a>.
</InfoBanner>

Jest to również ważna zmiana w stosunku do drugiej aktualizacji Eth2: [łańcuchów szczątkowych](/upgrades/sharding/).

### Ustawianie łańcuchów szczątkowych {#setting-up-for-shard-chains}

Łańcuchy szczątkowe będą drugą aktualizacją Eth2. Zwiększą przepustowość sieci i poprawią szybkość transakcji przez rozszerzenie sieci do 64 łańcuchów bloków. Łańcuch śledzący stanowi ważny pierwszy krok we wprowadzaniu łańcuchów szczątkowych, ponieważ do bezpiecznej pracy wymagają one zastawów.

Ostatecznie łańcuch śledzący będzie również odpowiedzialny za losowe przypisywanie inwestorów, aby sprawdzali łańcuchy szczątkowe. Ma to kluczowe znaczenie w utrudnianiu zmów między inwestorami i przejmowania fragmentu. Cóż, oznacza to, że szansa na przejęcie będzie wynosiła [mniej niż 1 na bilion](https://medium.com/@chihchengliang/minimum-committee-size-explained-67047111fa20).

## Relacje między ulepszeniami {#relationship-between-upgrades}

Wszystkie ulepszenia Eth2 są poniekąd wzajemnie powiązane. Więc podsumujmy, jak łańcuch śledzący wpływa na inne ulepszenia.

### Mainnet and the Beacon Chain {#mainnet-and-beacon-chain}

Łańcuchy szczątkowe mogą bezpiecznie wejść do ekosystemu Ethereum jedynie z istniejącym już mechanizmem konsensusu bazującym na dowodzie stawki. Łańcuch śledzący umożliwi zastawianie, torując drogę dla ulepszenia wprowadzającego łańcuchy szczątkowe.

<ButtonLink to="/upgrades/merge/">Łańcuchy szczątkowe</ButtonLink>

### Odłamki i łańcuch śledzący {#shards-and-beacon-chain}

Łańcuch śledzący będzie początkowo odrębny od głównej sieci Ethereum, której używamy dziś. Jednak ostatecznie zostaną one połączone.

<ButtonLink to="/upgrades/sharding/">Dokowanie</ButtonLink>

<Divider />

## Interakcja z łańcuchem śledzącym {#interact-with-beacon-chain}

<BeaconChainActions />
