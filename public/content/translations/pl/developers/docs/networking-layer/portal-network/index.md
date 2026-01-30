---
title: "Sieć portali"
description: "Przegląd Sieci portali — sieci w fazie rozwoju, zaprojektowanej do obsługi klientów o niskich zasobach."
lang: pl
---

Ethereum to sieć złożona z komputerów, na których działa oprogramowanie klienckie Ethereum. Każdy z tych komputerów nazywany jest „węzłem”. Oprogramowanie klienckie pozwala węzłowi wysyłać i odbierać dane w sieci Ethereum oraz weryfikuje dane pod kątem zasad protokołu Ethereum. Węzły przechowują wiele danych historycznych w swojej pamięci dyskowej i dodają do nich nowe pakiety informacji, znane jako bloki, otrzymywane od innych węzłów w sieci. Jest to konieczne, aby zawsze sprawdzać, czy dany węzeł posiada informacje zgodne z resztą sieci. Oznacza to, że uruchomienie węzła może wymagać dużo miejsca na dysku. Niektóre operacje węzła mogą również wymagać dużej ilości pamięci RAM.

Aby obejść ten problem z pamięcią dyskową, opracowano „lekkie” węzły, które żądają informacji od pełnych węzłów, zamiast przechowywać je wszystkie samodzielnie. Oznacza to jednak, że lekki węzeł nie weryfikuje informacji samodzielnie i zamiast tego ufa innemu węzłowi. Oznacza to również, że pełne węzły muszą podjąć dodatkową pracę, aby obsłużyć te lekkie węzły.

Sieć portali to nowy projekt sieciowy dla Ethereum, który ma na celu rozwiązanie problemu dostępności danych dla „lekkich” węzłów bez konieczności ufania lub dodatkowego obciążania pełnych węzłów poprzez udostępnianie niezbędnych danych w małych fragmentach w całej sieci.

Więcej na temat [węzłów i klientów](/developers/docs/nodes-and-clients/)

## Dlaczego potrzebujemy Sieci portali {#why-do-we-need-portal-network}

Węzły Ethereum przechowują własną pełną lub częściową kopię blockchaina Ethereum. Ta lokalna kopia jest używana do walidacji transakcji i zapewnienia, że węzeł podąża za właściwym łańcuchem. Te lokalnie przechowywane dane pozwalają węzłom niezależnie zweryfikować, czy przychodzące dane są ważne i prawidłowe, bez konieczności ufania żadnemu innemu podmiotowi.

Ta lokalna kopia blockchaina oraz powiązane dane o stanie i potwierdzeniach zajmują dużo miejsca na dysku twardym węzła. Na przykład, do uruchomienia węzła za pomocą [Geth](https://geth.ethereum.org) sparowanego z klientem konsensusu zalecany jest dysk twardy o pojemności 2 TB. Korzystając z synchronizacji typu snap, która przechowuje tylko dane łańcucha z relatywnie najnowszego zestawu bloków, Geth zazwyczaj zajmuje około 650 GB miejsca na dysku, ale rośnie w tempie około 14 GB/tydzień (można okresowo przycinać węzeł z powrotem do 650 GB).

Oznacza to, że uruchamianie węzłów może być kosztowne, ponieważ duża ilość miejsca na dysku musi być przeznaczona na Ethereum. W planie działania Ethereum istnieje kilka rozwiązań tego problemu, w tym [wygasanie historii](/roadmap/statelessness/#history-expiry), [wygasanie stanu](/roadmap/statelessness/#state-expiry) i [bezstanowość](/roadmap/statelessness/). Jednakże do ich wdrożenia prawdopodobnie pozostało jeszcze kilka lat. Istnieją również [lekkie węzły](/developers/docs/nodes-and-clients/light-clients/), które nie zapisują własnej kopii danych łańcucha, lecz żądają potrzebnych im danych od pełnych węzłów. Oznacza to jednak, że lekkie węzły muszą ufać pełnym węzłom w kwestii dostarczania rzetelnych danych, a także obciąża to pełne węzły, które muszą obsługiwać dane potrzebne lekkim węzłom.

Sieć portali ma na celu zapewnienie alternatywnego sposobu pozyskiwania danych przez lekkie węzły, który nie wymaga zaufania ani znacznego zwiększania pracy, jaką muszą wykonywać pełne węzły. Sposobem na to będzie wprowadzenie nowej metody udostępniania danych przez węzły Ethereum w całej sieci.

## Jak działa Sieć portali? {#how-does-portal-network-work}

Węzły Ethereum mają ścisłe protokoły, które określają sposób ich wzajemnej komunikacji. Klienci wykonawczy komunikują się za pomocą zestawu podprotokołów znanych jako [DevP2P](/developers/docs/networking-layer/#devp2p), podczas gdy klienci konsensusu używają innego stosu podprotokołów o nazwie [libP2P](/developers/docs/networking-layer/#libp2p). Definiują one typy danych, które mogą być przekazywane między węzłami.

![devP2P i libP2P](portal-network-devp2p-libp2p.png)

Węzły mogą również udostępniać określone dane za pośrednictwem [API JSON-RPC](/developers/docs/apis/json-rpc/), w ten sposób aplikacje i portfele wymieniają informacje z węzłami Ethereum. Jednak żaden z nich nie jest idealnym protokołem do obsługi danych dla lekkich klientów.

Lekcy klienci nie mogą obecnie żądać określonych fragmentów danych łańcucha za pośrednictwem DevP2P lub libP2p, ponieważ protokoły te są przeznaczone wyłącznie do umożliwienia synchronizacji łańcucha oraz rozpowszechniania bloków i transakcji. Lekcy klienci nie chcą pobierać tych informacji, ponieważ przestałyby być „lekkimi”.

Interfejs API JSON-RPC również nie jest idealnym wyborem dla żądań danych przez lekkiego klienta, ponieważ opiera się na połączeniu z określonym pełnym węzłem lub scentralizowanym dostawcą RPC, który może obsłużyć dane. Oznacza to, że lekki klient musi ufać uczciwości danego węzła/dostawcy, a także pełny węzeł może być zmuszony do obsługi wielu żądań od wielu lekkich klientów, co zwiększa jego wymagania dotyczące przepustowości.

Celem Sieci portali jest ponowne przemyślenie całego projektu, budując go specjalnie z myślą o lekkości, poza ograniczeniami projektowymi istniejących klientów Ethereum.

Główną ideą Sieci portali jest wykorzystanie najlepszych elementów obecnego stosu sieciowego poprzez umożliwienie udostępniania informacji potrzebnych lekkim klientom, takich jak dane historyczne i tożsamość obecnej głowy łańcucha, za pośrednictwem lekkiej, zdecentralizowanej sieci peer-to-peer w stylu DevP2P, wykorzystującej [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (podobne do Bittorrent).

Pomysł polega na dodaniu do każdego węzła małych części całkowitych historycznych danych Ethereum i niektórych określonych obowiązków węzła. Następnie żądania są obsługiwane poprzez wyszukiwanie węzłów przechowujących określone dane, o które poproszono, i pobieranie ich od nich.

Odwraca to normalny model, w którym lekkie węzły znajdują pojedynczy węzeł i proszą go o filtrowanie i obsługę dużych ilości danych; zamiast tego szybko filtrują dużą sieć węzłów, z których każdy obsługuje niewielkie ilości danych.

Celem jest umożliwienie zdecentralizowanej sieci lekkich klientów Portal:

- śledzenie głowy łańcucha
- synchronizowanie najnowszych i historycznych danych łańcucha
- pobieranie danych o stanie
- transmitowanie transakcji
- wykonywanie transakcji przy użyciu [EVM](/developers/docs/evm/)

Korzyści płynące z tego projektu sieci to:

- zmniejszenie zależności od scentralizowanych dostawców
- Zmniejszenie zużycia przepustowości internetowej
- Zminimalizowana lub zerowa synchronizacja
- Dostępność dla urządzeń o ograniczonych zasobach (\<1 GB RAM, \<100 MB miejsca na dysku, 1 procesor)

Poniższa tabela przedstawia funkcje istniejących klientów, które mogą być dostarczane przez Sieć portali, umożliwiając użytkownikom dostęp do tych funkcji na urządzeniach o bardzo niskich zasobach.

### Sieci portali

| Lekki klient Beacon  | Sieć stanu               | Plotkowanie transakcji | Sieć historii |
| -------------------- | ------------------------ | ---------------------- | ------------- |
| Lekki łańcuch Beacon | Konto i pamięć kontraktu | Lekki mempool          | Nagłówki      |
| Dane protokołu       |                          |                        | Treści bloków |
|                      |                          |                        | Potwierdzenia |

## Domyślna różnorodność klientów {#client-diversity-as-default}

Deweloperzy Sieci portali podjęli również decyzję projektową, aby od samego początku budować cztery oddzielne klienty Sieci portali.

Klienci Sieci portali to:

- [Trin](https://github.com/ethereum/trin): napisany w języku Rust
- [Fluffy](https://fluffy.guide): napisany w języku Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): napisany w języku Typescript
- [Shisui](https://github.com/zen-eth/shisui): napisany w języku Go

Posiadanie wielu niezależnych implementacji klientów zwiększa odporność i decentralizację sieci Ethereum.

Jeśli jeden klient napotka problemy lub luki w zabezpieczeniach, inne klienty mogą nadal działać płynnie, zapobiegając pojedynczemu punktowi awarii. Dodatkowo, różnorodne implementacje klientów sprzyjają innowacjom i konkurencji, napędzając ulepszenia i zmniejszając ryzyko monokultury w ekosystemie.

## Dalsza lektura {#further-reading}

- [Sieć portali (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord Sieci portali](https://discord.gg/CFFnmE7Hbs)
- [Strona internetowa Sieci portali](https://www.ethportal.net/)
