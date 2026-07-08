---
title: Mechanizmy konsensusu
description: "Wyjaśnienie protokołów konsensusu w systemach rozproszonych i ich roli w Ethereum."
lang: pl
authors: ["Patrick Collins"]
---

Termin „mechanizm konsensusu” jest często używany potocznie w odniesieniu do protokołów „dowodu stawki (PoS)”, „dowodu pracy (PoW)” lub „dowodu autorytetu (PoA)”. Są to jednak tylko elementy mechanizmów konsensusu, które chronią przed [atakami Sybil](/glossary/#sybil-attack). Mechanizmy konsensusu to kompletny zestaw koncepcji, protokołów i zachęt, które umożliwiają rozproszonej grupie węzłów uzgodnienie stanu blockchaina.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać nasze [wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest konsensus? {#what-is-consensus}

Przez konsensus rozumiemy osiągnięcie ogólnego porozumienia. Wyobraź sobie grupę ludzi idących do kina. Jeśli nie ma sprzeciwu wobec zaproponowanego wyboru filmu, konsensus zostaje osiągnięty. Jeśli zdania są podzielone, grupa musi mieć sposób na podjęcie decyzji, który film obejrzeć. W skrajnych przypadkach grupa ostatecznie się podzieli.

W odniesieniu do blockchaina [Ethereum](/) proces ten jest sformalizowany, a osiągnięcie konsensusu oznacza, że co najmniej 66% węzłów w sieci zgadza się co do globalnego stanu sieci.

## Czym jest mechanizm konsensusu? {#what-is-a-consensus-mechanism}

Termin mechanizm konsensusu odnosi się do całego zestawu protokołów, zachęt i koncepcji, które pozwalają sieci węzłów uzgodnić stan blockchaina.

Ethereum wykorzystuje mechanizm konsensusu oparty na dowodzie stawki (PoS), który czerpie swoje kryptoekonomiczne bezpieczeństwo z zestawu nagród i kar stosowanych wobec kapitału zablokowanego przez stakujących. Taka struktura zachęt motywuje poszczególnych stakujących do prowadzenia uczciwych walidatorów, karze tych, którzy tego nie robią, i tworzy niezwykle wysoki koszt ataku na sieć.

Istnieje również protokół, który zarządza tym, jak uczciwi walidatorzy są wybierani do proponowania lub walidacji bloków, przetwarzania transakcji i oddawania głosu na swoją wizję szczytu łańcucha. W rzadkich sytuacjach, gdy wiele bloków znajduje się na tej samej pozycji w pobliżu szczytu łańcucha, istnieje mechanizm wyboru rozwidlenia, który wybiera bloki tworzące „najcięższy” łańcuch, mierzony liczbą walidatorów, którzy oddali głos na te bloki, ważoną ich saldem stakowanych etherów.

Niektóre koncepcje ważne dla konsensusu nie są jawnie zdefiniowane w kodzie, jak na przykład dodatkowe bezpieczeństwo oferowane przez potencjalną koordynację społeczną poza pasmem (out-of-band) jako ostatnią linię obrony przed atakami na sieć.

Te elementy razem tworzą mechanizm konsensusu.

## Rodzaje mechanizmów konsensusu {#types-of-consensus-mechanisms}

### Oparte na dowodzie pracy (PoW) {#proof-of-work}

Podobnie jak Bitcoin, Ethereum używało kiedyś protokołu konsensusu opartego na **dowodzie pracy (PoW)**.

#### Tworzenie bloków {#pow-block-creation}

Górnicy rywalizują o tworzenie nowych bloków wypełnionych przetworzonymi transakcjami. Zwycięzca udostępnia nowy blok reszcie sieci i zarabia trochę nowo wyemitowanego ETH. Wyścig wygrywa komputer, który najszybciej rozwiąże zagadkę matematyczną. Tworzy to kryptograficzne powiązanie między bieżącym blokiem a blokiem poprzednim. Rozwiązanie tej zagadki to praca w „dowodzie pracy”. Kanoniczny łańcuch jest następnie określany przez regułę wyboru rozwidlenia, która wybiera zestaw bloków, w których wykopanie włożono najwięcej pracy.

#### Bezpieczeństwo {#pow-security}

Sieć jest bezpieczna dzięki temu, że do oszukania łańcucha potrzebne byłoby 51% mocy obliczeniowej sieci. Wymagałoby to tak ogromnych inwestycji w sprzęt i energię, że prawdopodobnie wydałbyś więcej, niż byś zyskał.

Więcej o [dowodzie pracy (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Oparte na dowodzie stawki (PoS) {#proof-of-stake}

Ethereum używa obecnie protokołu konsensusu opartego na **dowodzie stawki (PoS)**.

#### Tworzenie bloków {#pos-block-creation}

Walidatorzy tworzą bloki. W każdym slocie losowo wybierany jest jeden walidator, który staje się proponującym blok. Ich klient konsensusu żąda pakietu transakcji jako „ładunku wykonawczego” od sparowanego klienta warstwy wykonawczej. Opakowują to w dane konsensusu, tworząc blok, który wysyłają do innych węzłów w sieci Ethereum. Ta produkcja bloków jest nagradzana w ETH. W rzadkich przypadkach, gdy istnieje wiele możliwych bloków dla jednego slotu lub węzły dowiadują się o blokach w różnym czasie, algorytm wyboru rozwidlenia wybiera blok, który tworzy łańcuch o największej wadze poświadczeń (gdzie waga to liczba poświadczających walidatorów przeskalowana przez ich saldo ETH).

#### Bezpieczeństwo {#pos-security}

System dowodu stawki jest bezpieczny kryptoekonomicznie, ponieważ atakujący próbujący przejąć kontrolę nad łańcuchem musi zniszczyć ogromną ilość ETH. System nagród motywuje poszczególnych stakujących do uczciwego zachowania, a kary zniechęcają ich do złośliwych działań.

Więcej o [dowodzie stawki (PoS)](/developers/docs/consensus-mechanisms/pos/)

### Przewodnik wizualny {#types-of-consensus-video}

Obejrzyj więcej o różnych rodzajach mechanizmów konsensusu używanych w Ethereum:

<VideoWatch slug="understanding-consensus-mechanisms" />

### Odporność na ataki Sybil i wybór łańcucha {#sybil-chain}

Sam dowód pracy i dowód stawki nie są protokołami konsensusu, ale dla uproszczenia często się je tak nazywa. W rzeczywistości są to mechanizmy odporności na ataki Sybil i selektory autorów bloków; są sposobem na podjęcie decyzji, kto jest autorem najnowszego bloku. Innym ważnym elementem jest algorytm wyboru łańcucha (znany również jako algorytm wyboru rozwidlenia), który umożliwia węzłom wybranie jednego prawidłowego bloku na szczycie łańcucha w scenariuszach, w których wiele bloków znajduje się na tej samej pozycji.

**Odporność na ataki Sybil** mierzy, jak protokół radzi sobie z atakiem Sybil. Odporność na tego typu ataki jest niezbędna dla zdecentralizowanego blockchaina i umożliwia równe nagradzanie górników i walidatorów na podstawie włożonych zasobów. Dowód pracy i dowód stawki chronią przed tym, zmuszając użytkowników do zużycia dużej ilości energii lub wniesienia dużego zabezpieczenia. Zabezpieczenia te stanowią ekonomiczny środek odstraszający przed atakami Sybil.

**Reguła wyboru łańcucha** służy do decydowania, który łańcuch jest tym „właściwym”. Bitcoin używa reguły „najdłuższego łańcucha”, co oznacza, że ten blockchain, który jest najdłuższy, zostanie uznany przez resztę węzłów za ważny i to z nim będą pracować. W przypadku łańcuchów opartych na dowodzie pracy najdłuższy łańcuch jest określany przez całkowitą skumulowaną trudność dowodu pracy łańcucha. Ethereum również używało reguły najdłuższego łańcucha; jednak teraz, gdy Ethereum działa w oparciu o dowód stawki, przyjęło zaktualizowany algorytm wyboru rozwidlenia, który mierzy „wagę” łańcucha. Waga to skumulowana suma głosów walidatorów, ważona saldami stakowanych etherów walidatorów.

Ethereum wykorzystuje mechanizm konsensusu znany jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), który łączy [dowód stawki Casper FFG](https://arxiv.org/abs/1710.09437) z [regułą wyboru rozwidlenia GHOST](https://arxiv.org/abs/2003.03052).

## Dalsza lektura {#further-reading}

- [Czym jest algorytm konsensusu blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Czym jest konsensus Nakamoto? Kompletny przewodnik dla początkujących](https://blockonomi.com/nakamoto-consensus/)
- [Jak działa Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [O bezpieczeństwie i wydajności blockchainów opartych na dowodzie pracy](https://eprint.iacr.org/2016/555.pdf)
- [Problem bizantyjskich generałów (Byzantine fault)](https://en.wikipedia.org/wiki/Byzantine_fault)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Dowód pracy (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Kopanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Dowód autorytetu (PoA)](/developers/docs/consensus-mechanisms/poa/)