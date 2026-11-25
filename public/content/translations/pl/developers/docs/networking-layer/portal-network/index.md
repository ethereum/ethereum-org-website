---
title: Portal Network
description: "Przegląd Portal Network, sieci peer-to-peer, która zapewnia dostępność historii Ethereum, gdy klienty przestają przechowywać ją w całości."
lang: pl
---

[Ethereum](/) to sieć składająca się z komputerów, na których działa oprogramowanie klienta Ethereum. Każdy z tych komputerów nazywany jest „węzłem”. Oprogramowanie klienta pozwala węzłowi wysyłać i odbierać dane w sieci Ethereum oraz weryfikuje dane zgodnie z regułami protokołu Ethereum. Węzły przechowują wiele danych historycznych na swoich dyskach i dodają do nich nowe pakiety informacji, znane jako bloki, otrzymywane od innych węzłów w sieci. Jest to niezbędne, aby zawsze móc sprawdzić, czy węzeł posiada informacje spójne z resztą sieci. Oznacza to, że uruchomienie węzła może wymagać dużej ilości miejsca na dysku. Niektóre operacje węzła mogą również wymagać dużej ilości pamięci RAM.

Klienty wykonawcze nie muszą już przechowywać wszystkich tych danych. Od lipca 2025 r. mogą one odrzucać ciała i pokwitowania bloków sprzed [The Merge](/roadmap/merge/), a mapa drogowa Ethereum zakłada z czasem odrzucanie coraz większej części historii łańcucha. Historia ta musi jednak pozostać dostępna dla każdego, kto jej potrzebuje, np. dla eksploratorów bloków, indeksatorów lub portfeli wyszukujących stare transakcje.

Portal Network zapewnia dostępność tej historii, udostępniając ją w małych fragmentach w wielu węzłach. Żaden węzeł nie musi przechowywać jej w całości, a każdy węzeł może pobrać dowolny fragment i sprawdzić go z danymi, które już posiada, bez konieczności ufania węzłowi, który go wysłał.

Więcej o [węzłach i klientach](/developers/docs/nodes-and-clients/)

## Dlaczego potrzebujemy Portal Network {#why-do-we-need-portal-network}

Węzły Ethereum przechowują własną pełną lub częściową kopię blockchaina Ethereum. Ta lokalna kopia służy do walidacji transakcji i upewnienia się, że węzeł podąża za właściwym łańcuchem. Te lokalnie przechowywane dane pozwalają węzłom na niezależną weryfikację, czy przychodzące dane są ważne i poprawne, bez konieczności ufania jakiemukolwiek innemu podmiotowi.

Ta lokalna kopia blockchaina oraz powiązane z nią dane stanu i pokwitowań zajmują dużo miejsca na dysku twardym węzła. Na przykład do uruchomienia węzła używającego [Geth](https://geth.ethereum.org) w parze z klientem konsensusu zalecany jest dysk SSD o pojemności 4 TB. Z pełną historią łańcucha Geth zajmuje ponad 1,8 TB miejsca na dysku (stan na wrzesień 2026 r.), a wartość ta stale rośnie wraz z łańcuchem.

Oznacza to, że uruchamianie węzłów może być kosztowne, ponieważ dużą ilość miejsca na dysku trzeba przeznaczyć na Ethereum. [Wygasanie historii](/roadmap/statelessness/#history-expiry) zmniejsza to zapotrzebowanie, pozwalając klientom na usuwanie starych danych bloków, których nie potrzebują do podążania za łańcuchem: od czasu [częściowego wygasania historii](https://blog.ethereum.org/2025/07/08/partial-history-exp) w lipcu 2025 r. klienty wykonawcze mogą odrzucać ciała i pokwitowania każdego bloku sprzed The Merge. [Wygasanie stanu](/roadmap/statelessness/#state-expiry) i [bezstanowość](/roadmap/statelessness/) to kolejne rozwiązania, które wciąż są badane.

Gdy węzły przestaną przechowywać starą historię, nie będą mogły jej już udostępniać innym. Archiwa, torrenty i dostawcy przechowują jej kopie; Portal Network rozprasza ją w wielu węzłach, dzięki czemu pozostaje ona dostępna bez polegania na żadnym z nich.

## Jak działa Portal Network? {#how-does-portal-network-work}

Węzły Ethereum mają rygorystyczne protokoły, które określają, w jaki sposób komunikują się ze sobą. Klienty wykonawcze komunikują się za pomocą zestawu podprotokołów znanych jako [devp2p](/developers/docs/networking-layer/#devp2p), podczas gdy klienty konsensusu używają innego stosu podprotokołów zwanego [libp2p](/developers/docs/networking-layer/#libp2p). Protokół devp2p pozwala węzłowi żądać ciał bloków i pokwitowań od swoich węzłów równorzędnych, ale węzeł równorzędny, który odrzucił starą historię, nie może jej udostępnić. Aplikacje i portfele mogą również pobierać dane z węzła za pośrednictwem [interfejsu programowania aplikacji (API) JSON-RPC](/developers/docs/apis/json-rpc/), ale opiera się to na jednym węźle lub dostawcy przechowującym dane i na zaufaniu do jego uczciwości.

Portal Network to oddzielna sieć peer-to-peer zbudowana w celu udostępniania historii. Działa ona w oparciu o [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), protokół odkrywania węzłów, którego klienty konsensusu używają również do znajdowania węzłów równorzędnych, i organizuje swoje węzły w postaci [rozproszonej tablicy hashów (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), podobnie jak w sieci BitTorrent. Każdy węzeł ma identyfikator węzła (node ID), a każdy fragment treści, taki jak pokwitowania jednego bloku, ma identyfikator treści (content ID) w tej samej przestrzeni identyfikatorów, pochodzący od numeru bloku. Każdy węzeł przechowuje treść, której identyfikatory są najbliższe jego własnemu identyfikatorowi, aż do wybranej przez siebie odległości, zwanej jego promieniem. Aby pobrać fragment treści, węzeł pyta znane mu węzły równorzędne, które są najbliżej identyfikatora treści. Węzły równorzędne, które go nie posiadają, odpowiadają węzłami, które są jeszcze bliżej, dopóki żądanie nie dotrze do węzła, który go przechowuje.

<PortalHistoryDiagram />

Węzeł nigdy nie musi ufać otrzymywanym danym. Przechowuje on każdy nagłówek bloku, a każdy nagłówek zatwierdza transakcje i pokwitowania swojego bloku poprzez korzenie (roots), takie jak `transactionsRoot` i `receiptsRoot`. Przed ich użyciem węzeł sprawdza ciało bloku lub pokwitowania bloku z tymi korzeniami.

### Sieci Portal Network {#the-portal-networks}

Portal Network został początkowo zaprojektowany jako kilka podsieci, które pozwoliłyby lekkim klientom podążać za łańcuchem bez ufania pełnemu węzłowi: sieć lekkich klientów Beacon Chain, sieć stanu, sieć plotkowania o transakcjach (transaction gossip network) i sieć historii. W 2025 r. specyfikacje wszystkich z nich z wyjątkiem jednej zostały przeniesione do starszych wersji (legacy), a rozwój skupia się teraz na **sieci historii** (History network), która przechowuje ciała i pokwitowania przeszłych bloków dla klientów wykonawczych, którzy zachowują każdy nagłówek bloku, ale odrzucili resztę historii.

## Klienty Portal Network {#client-diversity-as-default}

Kilka zespołów zbudowało klienty Portal Network:

- [Klient Nimbus Portal](https://fluffy.guide) (wcześniej Fluffy): napisany w języku Nim i wciąż aktywnie rozwijany
- [Trin](https://github.com/ethereum/trin): napisany w języku Rust, nie jest już utrzymywany
- [Ultralight](https://github.com/ethereumjs/ultralight): napisany w języku TypeScript, bez aktualizacji od połowy 2025 r.
- [Shisui](https://github.com/zen-eth/shisui): napisany w języku Go, bez aktualizacji od połowy 2025 r.

## Dalsza lektura {#further-reading}

- [Specyfikacje Portal Network](https://github.com/ethereum/portal-network-specs)
- [Wykorzystanie protokołu Portal Network do wygasania historii](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Częściowe wygasanie historii](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Portal Network (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Strona internetowa Portal Network](https://www.ethportal.net/)
