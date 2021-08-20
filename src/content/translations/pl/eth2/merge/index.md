---
title: Dokowanie głównej sieci z Eth2
description: Dowiedz się więcej o dokowaniu - kiedy główna sieć Ethereum połączy się z systemem proof-of-stake koordynowanym przez łańcuch śledzący.
lang: pl
template: eth2
sidebar: true
image: ../../../../../assets/eth2/merge.png
summaryPoints:
  [
    "Ostatecznie obecna sieć główna Ethereum zostanie połączona (zadokowana) z resztą ulepszeń zawartych w Eth2.",
    "Dokowanie połączy główną sieć „Eth1” z łańcuchem Eth2 i systemem fragmentacji łańcucha sieci.",
    "To będzie oznaczało koniec systemu weryfikacji opartego na proof-of-work oraz pełne przejście na system oparty o proof-of-stake",
    "Być może znasz ten etap jako „Faza 1.5” z technicznego harmonogramu.",
  ]
---

<UpgradeStatus date="~2021/22">
    To ulepszenie nastąpi po uruchomieniu łańcuchów fragmentowych. Będzie to chwila, w której <a href="/eth2/vision/">wizja Eth2</a> zostanie w pełni zrealizowana — bardziej skalarna, bezpieczna i po równi rozwijana z inwestycją wspierającą całą sieć.
</UpgradeStatus>

## Czym jest dokowanie? {#what-is-the-docking}

Ważne jest, by pamiętać, że początkowo inne ulepszenia Eth2 zostaną przetransportowane oddzielnie z [sieci głównej](/glossary/#mainnet) — sieci, której używamy dzisiaj. Sieć główna Ethereum będzie nadal zabezpieczona za pomocą [proof-of-work](/developers/docs/consensus-mechanisms/pow/), nawet gdy [łańcuch śledzący](/eth2/beacon-chain/) i jego [łańcuch odłamków](/eth2/shard-chains/) działają równolegle przy użyciu [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). Dokowanie jest łączeniem tych dwóch systemów.

Wyobraź sobie że Ethereum jest statkiem kosmicznym, który nie jest gotowy na międzygalaktyczną podróż. Dzięki łańcuchowi śledzącemu i łańcuchom odłamkowym społeczność zbuduje nowy silnik i utwardzony kadłub. Kiedy przyjdzie czas, statek zostanie zadokowany z tymi nowymi systemami, więc będzie mógł być jedną całością, gotową do podróży na odległość wielu lat świetlnych i odkrywania wszechświata.

## Dokowanie sieci głównej {#docking-mainnet}

Kiedy sieć główna Ethereum będzie gotowa, zostanie „zadokowana” z łańcuchem śledzącym, stając się jego własnym odłamkiem używającym proof-of-stake zamiast [proof of work](/developers/docs/consensus-mechanisms/pow/).

Główna sieć stworzy możliwość włączenia inteligentnych kontraktów do systemów proof-of-stake oraz pełnej historii i obecnego stanu Ethereum, aby zapewnić, że przejście jest płynne w przypadku wszystkich posiadaczy i użytkowników ETH.

<!-- ### Improving mainnet

Before mainnet docks with the new eth2 system, it’s probably worthwhile sorting some of the issues that are in flight – often referred to as Ethereum1.x.

These include Improvements for

- **End users**: like [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) which changes the way users bid for blockspace. In other words, making transaction fees more efficient for end users.
- **Client runners**: making running clients more sustainable by capping disk space requirements.
- **Developers**: upgrading the EVM to be more flexible.

Plus many more.

[More on Ethereum1.x](/en/learn/#eth-1x)

These improvements all have a place in Eth2 so it’s likely that their progress may affect the timing of the docking. -->

## Po dokowaniu {#after-the-docking}

To będzie sygnał końca Ethereum proof-of-work i początek nowej ery bardziej zrównoważonego, przyjaznego ekologii Ethereum. W tym punkcie Ethereum będzie miało skalę, zabezpieczenia i zrównoważenie opisane w tej [wizji Eth2](/eth2/vision/).

## Relacje między ulepszeniami {#relationship-between-upgrades}

Ulepszenia Eth2 są ze sobą w pewien sposób powiązane. Podsumujmy więc, jak dokowanie wiąże się z innymi ulepszeniami.

### Dokowanie i łańcuch śledzący {#docking-and-beacon-chain}

Kiedy nastąpi dokowanie, stakerzy zostaną przydzieleni do walidacji sieci głównej Ethereum. Tak jak to było z łańcuchami odłamkowymi. [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/) nie będzie dłużej dostępne, więc wydobywcy z chęcią zainwestują swoje przychody w inwestycje w nowy system proof-of-stake.

<ButtonLink to="/eth2/beacon-chain/">Łańcuch śledzący</ButtonLink>

### Dokowanie i łańcuchy odłamkowe {#docking-and-shard-chains}

W momencie, gdy sieć główna staje się odłamkiem, udana implementacja łańcuchów odłamkowych jest kluczowa dla tej aktualizacji. Najprawdopodobniej ta sytuacja odegra kluczową rolę w pomaganiu społeczności w decydowaniu o dalszym rozwoju drugiego ulepszenia shardingu. To ulepszenie sprawi że pojawią się inne odłamki podobne do sieci głównej: będą gotowe do obsługi transakcji, inteligentnych kontraktów, a nie tylko dostarczania większej ilości danych.

<ButtonLink to="/eth2/shard-chains/">Łańcuchy odłamkowe</ButtonLink>
