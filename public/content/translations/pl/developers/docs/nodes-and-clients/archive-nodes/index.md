---
title: Węzeł archiwalny Ethereum
description: Przegląd węzłów archiwalnych
lang: pl
sidebarDepth: 2
---

Węzeł archiwalny to instancja klienta [Ethereum](/) skonfigurowana do budowania archiwum wszystkich historycznych stanów. Jest to przydatne narzędzie w niektórych przypadkach użycia, ale jego uruchomienie może być trudniejsze niż w przypadku pełnego węzła.

## Wymagania wstępne {#prerequisites}

Powinieneś rozumieć koncepcję [węzła Ethereum](/developers/docs/nodes-and-clients/), [jego architekturę](/developers/docs/nodes-and-clients/node-architecture/), [strategie synchronizacji](/developers/docs/nodes-and-clients/#sync-modes) oraz praktyki ich [uruchamiania](/developers/docs/nodes-and-clients/run-a-node/) i [używania](/developers/docs/apis/json-rpc/).

## Czym jest węzeł archiwalny {#what-is-an-archive-node}

Aby zrozumieć znaczenie węzła archiwalnego, wyjaśnijmy pojęcie „stanu”. Ethereum można określić jako _maszynę stanów opartą na transakcjach_. Składa się z kont i aplikacji wykonujących transakcje, które zmieniają ich stan. Globalne dane z informacjami o każdym koncie i kontrakcie są przechowywane w bazie danych typu trie zwanej stanem. Jest to obsługiwane przez klienta warstwy wykonawczej (EL) i obejmuje:

- Salda kont i wartości nonce
- Kod i pamięć kontraktów
- Dane związane z konsensusem, np. kontrakt depozytu stakingowego (Staking Deposit Contract)

Aby wchodzić w interakcje z siecią, weryfikować i tworzyć nowe bloki, klienci Ethereum muszą być na bieżąco z najnowszymi zmianami (szczytem łańcucha), a tym samym z obecnym stanem. Klient warstwy wykonawczej skonfigurowany jako pełny węzeł weryfikuje i śledzi najnowszy stan sieci, ale buforuje tylko kilka ostatnich stanów, np. stan powiązany z ostatnimi 128 blokami, dzięki czemu może obsługiwać reorganizacje łańcucha i zapewniać szybki dostęp do najnowszych danych. Najnowszy stan to to, czego wszyscy klienci potrzebują do weryfikacji przychodzących transakcji i korzystania z sieci.

Możesz wyobrazić sobie stan jako chwilowy zrzut (snapshot) sieci w danym bloku, a archiwum jako odtworzenie historii.

Historyczne stany mogą być bezpiecznie przycinane (pruned), ponieważ nie są one niezbędne do działania sieci, a przechowywanie wszystkich nieaktualnych danych przez klienta byłoby bezużytecznie nadmiarowe. Stany, które istniały przed pewnym niedawnym blokiem (np. 128 bloków przed szczytem), są skutecznie odrzucane. Pełne węzły przechowują tylko historyczne dane blockchain (bloki i transakcje) oraz sporadyczne historyczne zrzuty, których mogą użyć do zregenerowania starszych stanów na żądanie. Robią to poprzez ponowne wykonanie przeszłych transakcji w EVM, co może być wymagające obliczeniowo, gdy pożądany stan jest daleko od najbliższego zrzutu.

Oznacza to jednak, że dostęp do historycznego stanu na pełnym węźle pochłania dużo mocy obliczeniowej. Klient może musieć wykonać wszystkie przeszłe transakcje i obliczyć jeden historyczny stan od bloku genezy (genesis). Węzły archiwalne rozwiązują ten problem, przechowując nie tylko najnowsze stany, ale każdy historyczny stan utworzony po każdym bloku. Zasadniczo jest to kompromis kosztem większego zapotrzebowania na przestrzeń dyskową.

Należy zauważyć, że sieć nie jest zależna od węzłów archiwalnych w zakresie przechowywania i udostępniania wszystkich danych historycznych. Jak wspomniano powyżej, wszystkie historyczne stany pośrednie można wyprowadzić na pełnym węźle. Transakcje są przechowywane przez każdy pełny węzeł (obecnie mniej niż 400 GB) i mogą zostać odtworzone w celu zbudowania całego archiwum.

### Przypadki użycia {#use-cases}

Regularne korzystanie z Ethereum, takie jak wysyłanie transakcji, wdrażanie kontraktów, weryfikacja konsensusu itp., nie wymaga dostępu do stanów historycznych. Użytkownicy nigdy nie potrzebują węzła archiwalnego do standardowej interakcji z siecią.

Główną zaletą archiwum stanu jest szybki dostęp do zapytań o stany historyczne. Na przykład węzeł archiwalny natychmiast zwróciłby wyniki takie jak:

- _Jakie było saldo ETH konta 0x1337... w bloku 15537393?_
- _Jakie jest saldo tokena 0x w kontrakcie 0x w bloku 1920000?_

Jak wyjaśniono powyżej, pełny węzeł musiałby wygenerować te dane poprzez wykonanie w EVM, co zużywa procesor i zajmuje czas. Węzły archiwalne uzyskują do nich dostęp na dysku i natychmiast serwują odpowiedzi. Jest to przydatna funkcja dla niektórych części infrastruktury, na przykład:

- Dostawców usług, takich jak eksploratory bloków
- Badaczy
- Analityków bezpieczeństwa
- Twórców zdecentralizowanych aplikacji (dapp)
- Audytów i zgodności (compliance)

Istnieją różne darmowe [usługi](/developers/docs/nodes-and-clients/nodes-as-a-service/), które również umożliwiają dostęp do danych historycznych. Ponieważ uruchomienie węzła archiwalnego jest bardziej wymagające, dostęp ten jest w większości ograniczony i sprawdza się tylko w przypadku sporadycznego korzystania. Jeśli Twój projekt wymaga stałego dostępu do danych historycznych, powinieneś rozważyć samodzielne uruchomienie takiego węzła.

## Implementacje i użycie {#implementations-and-usage}

Węzeł archiwalny w tym kontekście oznacza dane serwowane przez klientów warstwy wykonawczej skierowanych do użytkownika, ponieważ obsługują oni bazę danych stanu i udostępniają punkty końcowe JSON-RPC. Opcje konfiguracji, czas synchronizacji i rozmiar bazy danych mogą się różnić w zależności od klienta. Aby uzyskać szczegółowe informacje, zapoznaj się z dokumentacją dostarczoną przez Twojego klienta.

Przed uruchomieniem własnego węzła archiwalnego zapoznaj się z różnicami między klientami, a w szczególności z różnymi [wymaganiami sprzętowymi](/developers/docs/nodes-and-clients/run-a-node/#requirements). Większość klientów nie jest zoptymalizowana pod kątem tej funkcji, a ich archiwa wymagają ponad 12 TB przestrzeni. W przeciwieństwie do nich, implementacje takie jak Erigon mogą przechowywać te same dane na mniej niż 3 TB, co czyni je najbardziej efektywnym sposobem na uruchomienie węzła archiwalnego.

## Zalecane praktyki {#recommended-practices}

Oprócz ogólnych [zaleceń dotyczących uruchamiania węzła](/developers/docs/nodes-and-clients/run-a-node/), węzeł archiwalny może być bardziej wymagający pod względem sprzętu i konserwacji. Biorąc pod uwagę [kluczowe funkcje](https://github.com/ledgerwatch/erigon#key-features) Erigona, najbardziej praktycznym podejściem jest użycie implementacji klienta [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Sprzęt {#hardware}

Zawsze upewnij się, że zweryfikowałeś wymagania sprzętowe dla danego trybu w dokumentacji klienta.
Największym wymaganiem dla węzłów archiwalnych jest przestrzeń dyskowa. W zależności od klienta waha się ona od 3 TB do 12 TB. Nawet jeśli dyski HDD mogą być uważane za lepsze rozwiązanie dla dużych ilości danych, ich synchronizacja i ciągłe aktualizowanie szczytu łańcucha będą wymagały dysków SSD. Dyski [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) są wystarczająco dobre, ale powinny być niezawodnej jakości, co najmniej [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Dyski można zamontować w komputerze stacjonarnym lub serwerze z wystarczającą liczbą gniazd. Takie dedykowane urządzenia są idealne do uruchamiania węzła o wysokim czasie dostępności (uptime). Całkowicie możliwe jest uruchomienie go na laptopie, ale przenośność będzie wiązała się z dodatkowymi kosztami.

Wszystkie dane muszą zmieścić się na jednym woluminie, dlatego dyski muszą zostać połączone, np. za pomocą [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) lub LVM. Warto również rozważyć użycie [ZFS](https://en.wikipedia.org/wiki/ZFS), ponieważ obsługuje on mechanizm „Copy-on-write”, który zapewnia prawidłowe zapisywanie danych na dysku bez żadnych błędów niskiego poziomu.

Aby uzyskać większą stabilność i bezpieczeństwo w zapobieganiu przypadkowemu uszkodzeniu bazy danych, zwłaszcza w profesjonalnej konfiguracji, rozważ użycie pamięci [ECC](https://en.wikipedia.org/wiki/ECC_memory), jeśli Twój system ją obsługuje. Ogólnie zaleca się, aby rozmiar pamięci RAM był taki sam jak w przypadku pełnego węzła, ale większa ilość pamięci RAM może pomóc przyspieszyć synchronizację.

Podczas początkowej synchronizacji klienci w trybie archiwalnym wykonają każdą transakcję od bloku genezy. Szybkość wykonywania jest w dużej mierze ograniczona przez procesor, więc szybszy procesor może pomóc skrócić czas początkowej synchronizacji. Na przeciętnym komputerze konsumenckim początkowa synchronizacja może potrwać nawet miesiąc.

## Dalsza lektura {#further-reading}

- [Pełny węzeł Ethereum a węzeł archiwalny](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) – _QuickNode, wrzesień 2022 r._
- [Budowa własnego węzła archiwalnego Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) – _Thomas Jay Rush, sierpień 2021 r._
- [Jak skonfigurować Erigon, RPC Erigona i TrueBlocks (scrape i API) jako usługi](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, zaktualizowano we wrześniu 2022 r._

## Powiązane tematy {#related-topics}

- [Węzły i klienci](/developers/docs/nodes-and-clients/)
- [Uruchamianie węzła](/developers/docs/nodes-and-clients/run-a-node/)