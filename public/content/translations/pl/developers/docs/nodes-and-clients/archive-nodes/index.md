---
title: Węzeł archiwalny Ethereum
description: Przegląd węzłów archiwalnych
lang: pl
sidebarDepth: 2
---

Węzeł archiwalny to instancja klienta Ethereum skonfigurowanego do tworzenia archiwum wszystkich historycznych stanów. Jest to przydatne narzędzie dla niektórych przypadków użycia, ale może być trudniejsze do uruchomienia niż pełny węzeł.

## Wymagania wstępne {#prerequisites}

Należy rozumieć koncepcję [węzła Ethereum](/developers/docs/nodes-and-clients/), [jego architekturę](/developers/docs/nodes-and-clients/node-architecture/), [strategie synchronizacji](/developers/docs/nodes-and-clients/#sync-modes), praktyki [uruchamiania](/developers/docs/nodes-and-clients/run-a-node/) i [korzystania z nich](/developers/docs/apis/json-rpc/).

## Czym jest węzeł archiwalny

Aby zrozumieć znaczenie węzła archiwalnego, wyjaśnijmy pojęcie „stanu”. Ethereum można określić jako _maszynę stanową opartą na transakcjach_. Składa się kont i aplikacji wykonujących transakcje, które zmieniają jego stan. Globalne dane zwierające informacje o każdym koncie i kontrakcie są przechowywanie w bazie danych o strukturze drzewa trie, nazywanej stanem. Zajmuje się tym klient warstwy wykonawczej (EL) i obejmuje:

- Salda i nonce kont
- Kod oraz pamięć kontraktu
- Dane związane z konsensusem, np. kontrakt depozytowy stakingu

Aby wchodzić w interakcję z siecią, weryfikować i tworzyć nowe bloki, klienty Ethereum muszą nadążać za najnowszymi zmianami (czubkiem łańcucha), a więc bieżącym stanem. Klient warstwy wykonawczej skonfigurowany jako pełny węzeł weryfikuje i śledzi najnowszy stan sieci, ale buforuje tylko kilka ostatnich stanów, np. stan powiązany z ostatnimi 128 blokami, dzięki czemu może obsługiwać reorganizacje łańcucha i zapewniać szybki dostęp do najnowszych danych. Najnowszy stan jest tym, czego wszystkie klienty potrzebują do zweryfikowania przychodzących transakcji oraz korzystania z sieci.

Pomyśl sobie o stanie jak o chwilowej migawce sieci w danym bloku, a o archiwum jak o powtórce historii.

Historyczne stany mogą być bezpiecznie przycinane, ponieważ nie są wymaganie sieci do jej funkcjonowania oraz bezużyteczne byłoby dla klienta przechowywania tych wszystkich nieaktualnych danych. Stany, które istniały przed ostatnim blokiem (np. 128 bloków przed głową), są skutecznie odrzucane. Pełne węzły przechowują tylko historyczne dane blockchainu (bloki i transakcje) oraz sporadyczne historyczne migawki tak, aby mogły zregenerować starsze stany na żądanie. Robią to poprzez ponowne wykonanie przeszłych transakcji w EVM, co może być wymagające obliczeniowo, kiedy pożądany stan znajduje się daleko od najbliższej migawki.

Jednak oznacza to, że dostęp do historycznego stanu na pełnym węźle zużywa wiele obliczeń. Klient może być zmuszony wykonać wszystkie przeszłe transakcje oraz obliczyć jeden historyczny stan od genezy. Węzły archiwalne rozwiązują ten problem, przechowując nie tylko najnowsze stany, ale również każdy historyczny stan stworzony po każdym bloku. Zasadniczo stanowi to kompromis z wymaganiem na większą przestrzeń dyskową.

Należy zapamiętać, że siec nie zależy od węzłów archiwalnych na przechowywaniu i dostarczaniu wszystkich historycznych danych. Jak wspomniano wyżej, wszystkie historyczne stany pośrednie mogą zostać pozyskane na pełnym węźle. Transakcje są przechowywane przez dowolny pełny węzeł (obecnie mniej niż 400 GB) i mogą być odtworzone do utworzenia całego archiwum.

### Przypadki użycia

Zwykłe korzystanie z Ethereum takie jak wysyłanie transakcji, wdrażanie kontraktów, weryfikowanie konsensusu itp. nie wymaga dostępu do historycznych stanów. Użytkownicy nigdy nie potrzebują węzła archiwalnego do standardowych interakcji z siecią.

Główną zaletą archiwum stanu jest szybki dostęp do historycznych danych podczas zażądań. Dla przykładu węzeł archiwalny natychmiastowo zwróciłby wyniki na pytania takie jak:

- _Jakie było saldo ETH konta 0x1337... w bloku 15537393?_
- _Jakie jest saldo tokena 0x w kontrakcie 0x w bloku 1920000?_

Jak już wyjaśniono powyżej, pełny węzeł potrzebowałby wygenerować te dane przez wykonanie EVM, co wykorzystuje CPU i wymaga czasu. Węzły archiwalne biorą te informacje ze swojego dysku i natychmiastowo odpowiadają. Jest to przydatna funkcja dla niektórych części infrastruktury, na przykład:

- Dostawców usług takich jak eksploratory bloków
- Badaczy
- Analityków bezpieczeństwa
- Deweloperów zdecentralizowanych aplikacji
- Audytów i zgodności

Istnieją różne bezpłatne [usługi](/developers/docs/nodes-and-clients/nodes-as-a-service/), które również umożliwiają dostęp do danych historycznych. Ponieważ uruchomienie węzła archiwalnego staje się coraz bardziej wymagające, dostęp ten jest w większości ograniczony i działa tylko w przypadku okazjonalnego dostępu. Jeśli Twój projekt wymaga ciągłego dostępu do historycznych danych, to zastanów się, czy nie uruchomić własnego węzła archiwalnego.

## Implementacja i użycie

W tym kontekście węzeł archiwalny oznacza dane obsługiwane przez klienty warstwy wykonawczej skierowane do użytkownika, ponieważ obsługują one bazą danych stanu oraz zapewniają punkty końcowe JSON-RPC. Opcje konfiguracji, czas synchronizacji i rozmiar bazy danych mogą różnić się w zależności od klienta. Szczegóły znajdziesz w dokumentacji swojego klienta.

Przed uruchomieniem własnego węzła archiwalnego, zapoznaj się z różnicami między klientami, a w szczególności z różnymi [wymaganiami sprzętowymi](/developers/docs/nodes-and-clients/run-a-node/#requirements). Większość klientów nie jest zoptymalizowana pod względem tej funkcji, a ich archiwa mogą wymagać ponad 12 TB pamięci. W przeciwieństwie, implementacje takie jak Erigon mogą przechowywać te same dane, zajmując mniej niż 3 TB pamięci, co czyni je najbardziej efektywnym sposobem uruchamiania węzła archiwalnego.

## Zalecane praktyki

Poza ogólnymi [zaleceniami dotyczącymi uruchamiania węzła](/developers/docs/nodes-and-clients/run-a-node/) węzeł archiwalny może być bardziej wymagający pod względem sprzętu i konserwacji. Biorąc pod uwagę [kluczowe funkcje](https://github.com/ledgerwatch/erigon#key-features) Erigona, najbardziej praktycznym podejściem jest użycie implementacji klienta [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Sprzęt

Zawsze weryfikuj wymagania sprzętowe dla konkretnego trybu w dokumentacji klienta.
Największym wymaganiem dla węzłów archiwalnych jest przestrzeń dyskowa. W zależności od klienta wacha się ona od 3 TB do 12 TB. Nawet jeśli dysk HDD może być lepszym rozwiązaniem do przechowywania dużych ilości danych, to synchronizacja ich oraz ciągłe aktualizowanie początku łańcucha będzie wymagało dysków SSD. Dyski [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) są wystarczająco dobre, ale powinny być niezawodnej jakości, co najmniej [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Dyski mogą zostać zamontowane w komputerze stacjonarnym lub serwerze z odpowiednią liczbą gniazd. Takie dedykowane urządzenia są idealnie do uruchamiania węzłów, które mają pracować nieprzerwanie przez długi czas. Całkowicie możliwe jest również uruchomienie go na laptopie, ale możliwość przenoszenia wiąże się z dodatkowymi kosztami.

Wszystkie dane muszą zmieścić się na jednym woluminie, dlatego dyski muszą być połączone, np. za pomocą [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) lub LVM. Warto również rozważyć użycie [ZFS](https://en.wikipedia.org/wiki/ZFS), ponieważ obsługuje on "Copy-on-write", co zapewnia, że dane są poprawnie zapisywane na dysku bez żadnych błędów niskiego poziomu.

Dla większej stabilności i bezpieczeństwa w zapobieganiu przypadkowemu uszkodzeniu bazy danych, zwłaszcza w profesjonalnej konfiguracji, rozważ użycie [pamięci ECC](https://en.wikipedia.org/wiki/ECC_memory), jeśli Twój system ją obsługuje. Zaleca się zazwyczaj, aby pamięć RAM była taka sama jak dla pełnego węzła, ale więcej pamięci RAM może pomóc w przyspieszeniu procesu synchronizacji.

Podczas początkowej synchronizacji, klienty w trybie archiwalnym wykonają każdą transakcję od samej genezy. Prędkość wykonania jest głównie ograniczana przez procesor, więc szybszy procesor może pomóc z czasem wstępnej synchronizacji. Na przeciętnym komputerze, początkowa synchronizacja może zająć nawet do miesiąca.

## Dalsza lektura {#further-reading}

- [Pełny węzeł Ethereum kontra węzeł archiwalny](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, wrzesień 2022_
- [Budowa własnego węzła archiwalnego Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, sierpień 2021_
- [Jak skonfigurować Erigon, RPC Erigona i TrueBlocks (scrape i API) jako usługi](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, zaktualizowano we wrześniu 2022_

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [Uruchamianie węzła](/developers/docs/nodes-and-clients/run-a-node/)
