---
title: Portal Network
description: Przegląd Portal Network – będącej w fazie rozwoju sieci zaprojektowanej do obsługi klientów o niskich zasobach.
lang: pl
---

[Ethereum](/) to sieć składająca się z komputerów, na których działa oprogramowanie klienta Ethereum. Każdy z tych komputerów nazywany jest „węzłem” (ang. node). Oprogramowanie klienta pozwala węzłowi wysyłać i odbierać dane w sieci Ethereum oraz weryfikuje dane zgodnie z regułami protokołu Ethereum. Węzły przechowują wiele danych historycznych na swoich dyskach i dodają do nich nowe pakiety informacji, znane jako bloki, otrzymywane od innych węzłów w sieci. Jest to niezbędne, aby zawsze sprawdzać, czy węzeł ma informacje spójne z resztą sieci. Oznacza to, że uruchomienie węzła może wymagać dużej ilości miejsca na dysku. Niektóre operacje węzła mogą również wymagać dużej ilości pamięci RAM.

Aby obejść ten problem z miejscem na dysku, opracowano „lekkie węzły” (ang. light nodes), które żądają informacji od pełnych węzłów, zamiast przechowywać je w całości samodzielnie. Oznacza to jednak, że lekki węzeł nie weryfikuje informacji niezależnie i zamiast tego ufa innemu węzłowi. Oznacza to również, że pełne węzły muszą podjąć dodatkową pracę, aby obsłużyć te lekkie węzły.

Portal Network to nowy projekt sieciowy dla Ethereum, który ma na celu rozwiązanie problemu dostępności danych (DA) dla „lekkich” węzłów bez konieczności ufania pełnym węzłom lub nakładania na nie dodatkowego obciążenia, poprzez udostępnianie niezbędnych danych w małych fragmentach w całej sieci.

Więcej o [węzłach i klientach](/developers/docs/nodes-and-clients/)

## Dlaczego potrzebujemy Portal Network {#why-do-we-need-portal-network}

Węzły Ethereum przechowują własną pełną lub częściową kopię blockchaina Ethereum. Ta lokalna kopia służy do walidacji transakcji i upewnienia się, że węzeł podąża za właściwym łańcuchem. Te lokalnie przechowywane dane pozwalają węzłom niezależnie weryfikować, czy przychodzące dane są ważne i poprawne, bez konieczności ufania jakiemukolwiek innemu podmiotowi.

Ta lokalna kopia blockchaina oraz powiązane dane stanu i pokwitowań zajmują dużo miejsca na dysku twardym węzła. Na przykład do uruchomienia węzła przy użyciu [Geth](https://geth.ethereum.org) w połączeniu z klientem konsensusu zalecany jest dysk twardy o pojemności 2 TB. Korzystając z synchronizacji snap (snap sync), która przechowuje tylko dane łańcucha ze stosunkowo niedawnego zestawu bloków, Geth zazwyczaj zajmuje około 650 GB miejsca na dysku, ale rośnie w tempie około 14 GB tygodniowo (można okresowo przycinać węzeł z powrotem do 650 GB).

Oznacza to, że uruchamianie węzłów może być kosztowne, ponieważ duża ilość miejsca na dysku musi być dedykowana dla Ethereum. Na mapie drogowej Ethereum znajduje się kilka rozwiązań tego problemu, w tym [wygasanie historii](/roadmap/statelessness/#history-expiry), [wygasanie stanu](/roadmap/statelessness/#state-expiry) i [bezstanowość](/roadmap/statelessness/). Jednak prawdopodobnie minie jeszcze kilka lat, zanim zostaną one wdrożone. Istnieją również [lekkie węzły](/developers/docs/nodes-and-clients/light-clients/), które nie zapisują własnej kopii danych łańcucha, lecz żądają potrzebnych im danych od pełnych węzłów. Oznacza to jednak, że lekkie węzły muszą ufać pełnym węzłom, że dostarczą uczciwe dane, a także obciąża to pełne węzły, które muszą obsługiwać dane potrzebne lekkim węzłom.

Portal Network ma na celu zapewnienie alternatywnego sposobu pozyskiwania danych przez lekkie węzły, który nie wymaga zaufania ani znacznego zwiększania pracy, jaką muszą wykonać pełne węzły. Sposobem na to będzie wprowadzenie nowego sposobu udostępniania danych w sieci przez węzły Ethereum.

## Jak działa Portal Network? {#how-does-portal-network-work}

Węzły Ethereum mają ścisłe protokoły, które określają, w jaki sposób komunikują się ze sobą. Klienty warstwy wykonawczej komunikują się za pomocą zestawu podprotokołów znanych jako [devp2p](/developers/docs/networking-layer/#devp2p), podczas gdy klienty konsensusu używają innego stosu podprotokołów zwanego [libp2p](/developers/docs/networking-layer/#libp2p). Definiują one rodzaje danych, które mogą być przekazywane między węzłami.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Węzły mogą również udostępniać określone dane za pośrednictwem [API JSON-RPC](/developers/docs/apis/json-rpc/), w ten sposób aplikacje i portfele wymieniają informacje z węzłami Ethereum. Jednak żaden z nich nie jest idealnym protokołem do udostępniania danych lekkim klientom.

Lekkie klienty nie mogą obecnie żądać określonych fragmentów danych łańcucha przez devp2p lub libp2p, ponieważ te protokoły są zaprojektowane tylko w celu umożliwienia synchronizacji łańcucha oraz rozgłaszania (gossiping) bloków i transakcji. Lekkie klienty nie chcą pobierać tych informacji, ponieważ przestałyby być „lekkie”.

API JSON-RPC również nie jest idealnym wyborem dla żądań danych lekkich klientów, ponieważ opiera się na połączeniu z określonym pełnym węzłem lub scentralizowanym dostawcą RPC, który może udostępniać dane. Oznacza to, że lekki klient musi ufać temu konkretnemu węzłowi/dostawcy, że jest uczciwy, a ponadto pełny węzeł może musieć obsługiwać wiele żądań od wielu lekkich klientów, co zwiększa jego wymagania dotyczące przepustowości.

Celem Portal Network jest przemyślenie całego projektu, budowanie specjalnie pod kątem lekkości, poza ograniczeniami projektowymi istniejących klientów Ethereum.

Główną ideą Portal Network jest wykorzystanie najlepszych elementów obecnego stosu sieciowego poprzez umożliwienie udostępniania informacji potrzebnych lekkim klientom, takich jak dane historyczne i tożsamość obecnego szczytu łańcucha (head of the chain), za pośrednictwem lekkiej, zdecentralizowanej sieci peer-to-peer w stylu devp2p, wykorzystującej [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (podobnie jak w sieci BitTorrent).

Pomysł polega na dodaniu do każdego węzła małych części całkowitych danych historycznych Ethereum i pewnych specyficznych obowiązków węzła. Następnie żądania są obsługiwane poprzez wyszukiwanie węzłów przechowujących określone dane, o które poproszono, i pobieranie ich od nich.

Odwraca to normalny model lekkich węzłów, które znajdują pojedynczy węzeł i żądają od niego filtrowania i udostępniania dużych ilości danych; zamiast tego szybko filtrują dużą sieć węzłów, z których każdy obsługuje niewielkie ilości danych.

Celem jest umożliwienie zdecentralizowanej sieci lekkich klientów Portal na:

- śledzenie szczytu łańcucha
- synchronizację najnowszych i historycznych danych łańcucha
- pobieranie danych stanu
- rozgłaszanie transakcji
- wykonywanie transakcji przy użyciu [EVM](/developers/docs/evm/)

Korzyści z takiego projektu sieci to:

- zmniejszenie zależności od scentralizowanych dostawców
- zmniejszenie zużycia przepustowości Internetu
- zminimalizowana lub zerowa synchronizacja
- dostępność dla urządzeń o ograniczonych zasobach (\<1 GB RAM, \<100 MB miejsca na dysku, 1 CPU)

Poniższa tabela przedstawia funkcje istniejących klientów, które mogą być dostarczane przez Portal Network, umożliwiając użytkownikom dostęp do tych funkcji na urządzeniach o bardzo niskich zasobach.

### Sieci Portal {#the-portal-networks}

| Lekki klient Beacon | Sieć stanu                   | Rozgłaszanie transakcji | Sieć historii   | Kanoniczny indeks transakcji |
| ------------------- | ---------------------------- | ----------------------- | --------------- | ---------------------------- |
| Lekki łańcuch Beacon| Pamięć kont i kontraktów     | Lekki mempool           | Nagłówki        | TxHash > Hash, Indeks        |
| Dane protokołu      |                              |                         | Ciała bloków    |                              |
|                     |                              |                         | Pokwitowania    |                              |

## Różnorodność klientów domyślnie {#client-diversity-as-default}

Deweloperzy Portal Network podjęli również decyzję projektową o zbudowaniu czterech oddzielnych klientów Portal Network od pierwszego dnia.

Klienty Portal Network to:

- [Trin](https://github.com/ethereum/trin): napisany w języku Rust
- [Fluffy](https://fluffy.guide): napisany w języku Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): napisany w języku TypeScript
- [Shisui](https://github.com/zen-eth/shisui): napisany w języku Go

Posiadanie wielu niezależnych implementacji klientów zwiększa odporność i decentralizację sieci Ethereum.

Jeśli jeden klient napotka problemy lub luki w zabezpieczeniach, inne klienty mogą nadal działać płynnie, zapobiegając pojedynczemu punktowi awarii. Ponadto różnorodne implementacje klientów sprzyjają innowacjom i konkurencji, napędzając ulepszenia i zmniejszając ryzyko monokultury w ekosystemie.

## Dalsza lektura {#further-reading}

- [Portal Network (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Strona internetowa Portal Network](https://www.ethportal.net/)