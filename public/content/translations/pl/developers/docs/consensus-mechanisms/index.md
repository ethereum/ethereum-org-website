---
title: Mechanizmy konsensusu
description: "Wyjaśnienie protokołów konsensusu w systemach rozproszonych i roli, jaką odgrywają w Ethereum."
lang: pl
---

Termin „mechanizm konsensusu” jest często używany potocznie w odniesieniu do protokołów „proof-of-stake”, „proof-of-work” lub „proof-of-authority”. Są to jednak tylko komponenty w mechanizmach konsensusu, które chronią przed [atakami typu Sybil](/glossary/#sybil-attack). Mechanizmy konsensusu są kompletnymi zestawami pomysłów, protokołów i zachęt, które umożliwiają rozproszonemu zestawowi węzłów uzgodnienie stanu blockchainu.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać nasze [wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest konsensus? {#what-is-consensus}

Przez konsensus rozumiemy osiągnięcie ogólnego porozumienia. Weźmy pod uwagę grupę ludzi idących do kina. Jeśli nie ma różnicy zdań co do proponowanego wyboru filmu, to konsensus został osiągnięty. Jeśli nie ma zgody, grupa musi mieć możliwość, by zdecydować, który film obejrzeć. W skrajnych przypadkach grupa ostatecznie się podzieli.

W odniesieniu do blockchainu Ethereum proces ten jest sformalizowany, a osiągnięcie konsensusu oznacza, że co najmniej 66% węzłów w sieci zgadza się co do globalnego stanu sieci.

## Czym jest mechanizm konsensusu? {#what-is-a-consensus-mechanism}

Termin mechanizm konsensusu odnosi się do całego stosu protokołów, zachęt i pomysłów, które pozwalają sieci węzłów uzgodnić stan blockchainu.

Ethereum wykorzystuje mechanizm konsensusu oparty na proof-of-stake, który wywodzi swoje bezpieczeństwo krypto-ekonomiczne z zestawu nagród i kar stosowanych do kapitału zablokowanego przez stakerów. Ta struktura zachęca poszczególnych stakerów do obsługi uczciwych walidatorów, karze tych, którzy tego nie robią i tworzy niezwykle wysoki koszt ataku na sieć.

Następnie istnieje protokół, który zarządza sposobem, w jaki uczciwi walidatorzy są wybierani do proponowania lub walidowania bloków, przetwarzania transakcji i głosowania na ich widok na czele łańcucha. W rzadkich sytuacjach, gdy wiele bloków znajduje się na tej samej pozycji w pobliżu głowy łańcucha, istnieje mechanizm wyboru forka, który wybiera bloki tworzące „najcięższy” łańcuch, mierzony liczbą walidatorów, którzy głosowali na bloki ważone ich saldem etheru.

Niektóre koncepcje są ważne dla konsensusu, które nie są wyraźnie zdefiniowane w kodzie, takie jak dodatkowe bezpieczeństwo oferowane przez potencjalną pozapasmową koordynację społeczną jako ostatnią linię obrony przed atakami na sieć.

Elementy te razem tworzą mechanizm konsensusu.

## Rodzaje mechanizmów konsensusu {#types-of-consensus-mechanisms}

### Oparte na proof-of-work {#proof-of-work}

Podobnie jak Bitcoin, Ethereum korzystało kiedyś z protokołu konsensusu opartego na proof-of-work (PoW).

#### Tworzenie bloku {#pow-block-creation}

Górnicy rywalizują o tworzenie nowych bloków wypełnionych przetworzonymi transakcjami. Zwycięzca dzieli się nowym blokiem z resztą sieci i zarabia świeżo wybite ETH. Wyścig wygrywa komputer, który najszybciej rozwiąże zagadkę matematyczną. Tworzy to kryptograficzne połączenie między bieżącym blokiem a blokiem poprzednim. Rozwiązaniem tej zagadki jest praca w „proof-of-work”. Łańcuch kanoniczny jest następnie określany przez zasadę wyboru forka, która wybiera zestaw bloków, które wykonały najwięcej pracy, aby je wydobyć.

#### Bezpieczeństwo {#pow-security}

Sieć jest bezpieczna dzięki temu, że do oszukania łańcucha potrzeba 51% mocy obliczeniowej sieci. Wymagałoby to ogromnych inwestycji w sprzęt i energię; prawdopodobnie wydasz więcej niż zyskasz.

Więcej o [proof-of-work](/developers/docs/consensus-mechanisms/pow/)

### Oparte na proof-of-stake {#proof-of-stake}

Ethereum wykorzystuje teraz protokół konsensusu oparty na proof-of-stake (PoS).

#### Tworzenie bloku {#pos-block-creation}

Walidatorzy tworzą bloki. Jeden walidator jest losowo wybierany w każdym slocie, aby być proponentem bloku. Jego klient konsensusu żąda pakietu transakcji jako „ładunku wykonawczego” od sparowanego klienta wykonawczego. Zawija to w dane konsensusu, aby utworzyć blok, który wysyła do innych węzłów w sieci Ethereum. Ta produkcja bloków jest nagradzana w ETH. W rzadkich przypadkach, gdy istnieje wiele możliwych bloków dla pojedynczego slotu lub węzły słyszą o blokach w różnym czasie, algorytm wyboru forka wybiera blok, który tworzy łańcuch o największej wadze poświadczeń (gdzie waga to liczba poświadczających walidatorów skalowana przez ich saldo ETH).

#### Bezpieczeństwo {#pos-security}

System proof-of-stake jest bezpieczny pod względem krypto-ekonomicznym, ponieważ atakujący próbujący przejąć kontrolę nad łańcuchem musi zniszczyć ogromną ilość ETH. System nagród zachęca poszczególnych stakerów do uczciwego postępowania, a kary zniechęcają ich do złośliwego działania.

Więcej o [proof-of-stake](/developers/docs/consensus-mechanisms/pos/)

### Przewodnik wizualny {#types-of-consensus-video}

Obejrzyj więcej na temat różnych rodzajów mechanizmów konsensusu stosowanych w Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Odporność na ataki typu Sybil i wybór łańcucha {#sybil-chain}

Proof-of-work i proof-of-stake same w sobie nie są protokołami konsensusu, ale dla uproszczenia często są tak nazywane. Są to w rzeczywistości mechanizmy odporności na ataki typu Sybil i selektory autorów bloków; są one sposobem na podjęcie decyzji, kto jest autorem najnowszego bloku. Innym ważnym elementem jest algorytm wyboru łańcucha (inaczej wybór forka), który umożliwia węzłom wybranie jednego poprawnego bloku na czele łańcucha w scenariuszach, w których istnieje wiele bloków na tej samej pozycji.

**Odporność na ataki typu Sybil** mierzy, jak protokół radzi sobie z atakiem typu Sybil. Odporność na tego typu ataki jest niezbędna dla zdecentralizowanego blockchainu i umożliwia górnikom i walidatorom równe wynagradzanie w oparciu o włożone zasoby. Proof-of-work i proof-of-stake chronią przed tym, zmuszając użytkowników do poświęcenia dużej ilości energii lub ustanowienia dużego zabezpieczenia. Zabezpieczenia te stanowią ekonomiczny czynnik odstraszający przed atakami typu Sybil.

**Zasada wyboru łańcucha** jest używana do decydowania, który łańcuch jest „prawidłowym” łańcuchem. Bitcoin wykorzystuje zasadę „najdłuższego łańcucha”, co oznacza, że którykolwiek blockchain jest najdłuższy, będzie tym, który pozostałe węzły zaakceptują jako prawidłowy i z którym będą pracować. W przypadku łańcuchów proof-of-work najdłuższy łańcuch jest określany przez całkowitą skumulowaną trudność proof-of-work łańcucha. Ethereum również korzystało z zasady najdłuższego łańcucha; jednak teraz, gdy Ethereum działa na zasadzie proof-of-stake, przyjęło zaktualizowany algorytm wyboru forka, który mierzy „wagę” łańcucha. Waga jest skumulowaną sumą głosów walidatorów, ważoną przez salda zestakowanego etheru walidatorów.

Ethereum używa mechanizmu konsensusu znanego jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/), który łączy [proof-of-stake Casper FFG](https://arxiv.org/abs/1710.09437) z [zasadą wyboru forka GHOST](https://arxiv.org/abs/2003.03052).

## Dalsza lektura {#further-reading}

- [Czym jest algorytm konsensusu blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Czym jest konsensus Nakamoto? Kompletny przewodnik dla początkujących](https://blockonomi.com/nakamoto-consensus/)
- [Jak działa Casper?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [O bezpieczeństwie i wydajności blockchainów proof-of-work](https://eprint.iacr.org/2016/555.pdf)
- [Problem bizantyjskich generałów](https://en.wikipedia.org/wiki/Byzantine_fault)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Proof-of-authority](/developers/docs/consensus-mechanisms/poa/)
