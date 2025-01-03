---
title: Pakiety zbiorcze warstwy 2
description: Wprowadzenie do różnych rozwiązania skalowania warstwy 2 opracowywanych obecnie przez społeczność Ethereum.
lang: pl
incomplete: true
sidebarDepth: 3
---

Warstwa 2 to zbiorczy termin dla rozwiązań zaprojektowanych, aby pomóc w skalowaniu aplikacji poprzez obsługę transakcji poza siecią główną Ethereum (warstwa 1), jednocześnie korzystając z solidnego zdecentralizowanego modelu bezpieczeństwa sieci głównej. Szybkość transakcji pogarsza się, gdy sieć jest zajęta, co może pogorszyć wrażenia użytkownika w przypadku niektórych rodzajów aplikacji zdecentralizowanych. A gdy sieć staje się coraz bardziej zajęta, ceny gazu rosną, ponieważ nadawcy transakcji starają się przelicytować się nawzajem. To może sprawić, że korzystanie z Ethereum będzie bardzo kosztowne.

## Warunki wstępne {#prerequisites}

Musisz dobrze się orientować we wszystkich podstawowych tematach i mieć zaawansowaną wiedzę na temat [skalowania Ethereum](/developers/docs/scaling/). Wdrażanie rozwiązań skalujących takich jak pakiety zbiorcze jest trudnym tematem, ponieważ technologia nie jest jeszcze sprawdzona w boju i nadal jest badana i rozwijana.

## Dlaczego warstwa 2 jest potrzebna? {#why-is-layer-2-needed}

- Niektóre przypadki użytkowania, takie jak gry blockchain, nie mają sensu z bieżącymi czasami transakcji
- Korzystanie z aplikacji blockchain może być niepotrzebnie kosztowne
- Żadne aktualizacje skalowalności nie powinny odbywać się kosztem decentralizacji ani bezpieczeństwa — warstwa 2 wykorzystuje Ethereum.

## Pakiety zbiorcze {#rollups}

Pakiety zbiorcze to rozwiązania, które <em x-id="4">wykonują</em> transakcje poza głównym łańcuchem Ethereum (warstwa 1), ale publikują <em x-id="4">dane</em> transakcji w warstwie 1. Ponieważ <em x-id="4">dane</em> transakcji znajdują się w warstwie 1, możliwe jest zabezpieczenie pakietów zbiorczych przez warstwę 1. Dziedziczenie właściwości bezpieczeństwa warstwy 1, przy jednoczesnym wykonywaniu operacji poza warstwą 1, jest cechą definiującą pakiety zbiorcze.

Trzy uproszczone właściwości pakietów zbiorczych:

1. <em x-id="4">wykonanie</em> transakcji poza warstwą 1
2. data lub dowód transakcji znajduje się w warstwie 1
3. kontrakt inteligentny pakietu zbiorczego w warstwie 1, który może wymusić wykonanie w warstwie 2 poprzez użycie danych transakcji w warstwie 1

Pakiety zbiorcze wymagają od „operatorów” wniesienia kaucji w kontrakcie pakiety zbiorczego. Zachęca to operatorów do weryfikowania i prawidłowego przeprowadzania transakcji.

**Użyteczne ze względu na:**

- obniżenie opłat dla użytkowników
- otwarte uczestnictwo
- szybką przepustowość transakcji

Istnieją dwa typy pakietów zbiorczych z różnymi modelami zabezpieczeń:

- **Pakiety zbiorcze o wiedzy zerowej**: uruchamiają obliczenia off-chain i przesyłają do łańcucha [**dowód ważności**](/glossary/#validity-proof)
- **Optymistyczne pakiety zbiorcze**: zakładają, że transakcje są domyślnie ważne i w razie problemów uruchamiają jedynie obliczenia za pośrednictwem [**dowodu oszustwa**](/glossary/#fraud-proof)

### Pakiety zbiorcze o wiedzy zerowej {#zk-rollups}

Pakiety zbiorcze o wiedzy zerowej, znane również jako pakiety zbiorcze, łączą setki transferów off-chain i generują dowód kryptograficzny, znany jako SNARK (succinct non-interactive argument of knowledge). Określa się to jako dowód ważności, który jest publikowany w warstwie 1.

Inteligentny kontrakt pakietu zbiorczego ZK utrzymuje stan wszystkich transferów w warstwie 2, a stan ten może być aktualizowany tylko za pomocą dowodu ważności. To znaczy, że pakiety zbiorcze ZK potrzebują jedynie dowodu ważności, a nie wszystkich danych transakcji. W przypadku pakietu zbiorczego ZK walidacja bloku jest szybsza i tańsza, ponieważ zawiera mniej danych.

W przypadku pakietu zbiorczego ZK nie ma opóźnień przy przenoszeniu środków z warstwy 2 do warstwy 1, ponieważ dowód ważności zaakceptowany przez kontrakt pakietu zbiorczego ZK już zweryfikował środki.

Ponieważ pakiety zbiorcze ZK znajdują się w warstwie 2, mogą być zoptymalizowane w celu dalszego zmniejszenia rozmiaru transakcji. Na przykład konto jest reprezentowane przez indeks zamiast adres, co zmniejsza transakcję z 32 bajtów do zaledwie 4 bajtów. Transakcje są także zapisywane w Ethereum jako `calldata`, co ogranicza gaz.

#### Zalety i wady {#zk-pros-and-cons}

| Zalety                                                                                                                            | Wady                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Szybszy czas osiągnięcia nieodwołalności, ponieważ stan jest natychmiast weryfikowany po przesłaniu dowodów do głównego łańcucha. | Niektóre nie obsługują EVM.                                                                                                       |
| Niepodatne na ataki ekonomiczne, na które mogą być podatne [optymistyczne pakiety zbiorcze](#optimistic-pros-and-cons).           | Obliczenia dowodu ważności są intensywne – nie warto ich przeprowadzać w przypadku aplikacji o niewielkiej aktywności w łańcuchu. |
| Są bezpieczne i zdecentralizowane, ponieważ dane, które są potrzebne do odzyskania stanu, są przechowywane w łańcuchu warstwy 1.  | Operator może wpływać na zamawianie transakcji                                                                                    |

#### Użycie pakietów zbiorczych ZK {#use-zk-rollups}

Istnieje wiele implementacji pakietów zbiorczych ZK, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://zksync.io/)
- [Aztec 2.0](https://aztec.network/)
- [Sieć Hermez](https://hermez.io/)
- [zkTube](https://zktube.io/)

### Optymistyczne pakiety zbiorcze {#optimistic-rollups}

Optymistyczne pakiety zbiorcze są umieszczone równolegle do głównego łańcucha Ethereum w warstwie 2. Mogą one oferować ulepszenia skalowalności, ponieważ domyślnie nie dokonują żadnych obliczeń. Zamiast tego, po dokonaniu transakcji proponują nowy stan do sieci głównej, czyli „notarialnie” potwierdzają transakcję.

W przypadku optymistycznych pakietów zbiorczych transakcje są zapisywane w łańcuchu Ethereum jako `calldata`, co optymalizuje je jeszcze bardziej dzięki ograniczeniu kosztów gazu.

Ponieważ obliczanie to powolna, droga część korzystania z Ethereum, optymistyczne pakiety zbiorcze mogą przynieść nawet 10-100-krotną poprawę skalowalności zależną od transakcji. Ta liczba zwiększy się jeszcze bardziej wraz z wprowadzeniem [łańcuchów odłamkowych](/roadmap/danksharding). Wynika to z faktu, że w przypadku zakwestionowania transakcji dostępnych będzie więcej danych.

#### Transakcje sporne {#disputing-transactions}

Optymistyczne pakiety zbiorcze nie obliczają transakcji, więc potrzebny jest mechanizm zapewniający, że transakcje są legalne, a nie oszukańcze. W tym miejscu pojawiają się dowody oszustwa. Jeśli ktoś powiadomi o oszukańczej transakcji, pakiet zbiorczy wykryje oszustwo i uruchomi obliczenie transakcji przy użyciu dostępnych danych o stanie. Oznacza to, że możesz mieć dłuższy czas oczekiwania na potwierdzenie transakcji niż w przypadku pakietu zbiorczego ZK, ponieważ może być zakwestionowana.

![Schemat pokazujący, co się dzieje, gdy dochodzi do oszukańczej transakcji w optymistycznym pakiecie zbiorczym w Ethereum](../optimistic-rollups/optimistic-rollups.png)

Gaz potrzebny do obliczenia dowodu oszustwa jest nawet refundowany. Ben Jones z Optimism opisuje istniejący system zabezpieczeń:

"_każdy, kto mógłby podjąć działania, które trzeba by udowodnić jako nieuczciwe, aby zabezpieczyć swoje fundusze, wymaga złożenia kaucji. Zasadniczo bierzesz trochę ETH, blokujesz go i mówisz „Hej, obiecuję powiedzieć prawdę”... Jeśli nie powiem prawdy, a oszustwa zostaną udowodnione, pieniądze te zostaną odcięte. Niektóre z tych pieniędzy nie tylko zostaną odcięte, ale część z nich będzie zapłatą za gaz, który ludzie wydali, przeprowadzając dowód oszustwa_"

Widać więc zachęty: uczestnicy są karani za prowadzenie oszustw i otrzymują zwrot kosztów za ich udowodnienie.

#### Zalety i wady {#optimistic-pros-and-cons}

| Zalety                                                                                                                                                        | Wady                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Wszystko, co możesz zrobić na warstwie 1 Ethereum, możesz zrobić za pomocą optymistycznych pakietów zbiorczych ze względu na kompatybilność z EVM i Solidity. | Długi czas oczekiwania na transakcję on-chain ze względu na potencjalne kwestionowanie oszustwa. |
| Wszystkie dane transakcji są przechowywane w łańcuchu warstwy 1, co oznacza, że są bezpieczne i zdecentralizowane.                                            | Operator może wpływać na zamawianie transakcji                                                   |

#### Stosowanie optymistycznych pakietów zbiorczych {#use-optimistic-rollups}

Istnieje wiele implementacji optymistycznych pakietów zbiorczych, które można zintegrować z własnymi aplikacjami zdecentralizowanymi:

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Sieć paliwowa](https://fuel.sh/)
- [Cartesi](https://cartesi.io)
- [Boba](https://boba.network/)

## Rozwiązania hybrydowe {#hybrid-solutions}

Istnieją rozwiązania hybrydowe, które łączą w sobie najlepsze elementy wielu technologii warstwy 2 i mogą oferować konfigurowalne kompromisy.

### Używanie rozwiązań hybrydowych {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Dalsza lektura {#further-reading}

- [Niekompletny przewodnik po pakietach zbiorczych](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Zero-Knowledge Blockchain Scalability](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**Pakiety zbiorcze ZK**

**Optymistyczne pakiety zbiorcze**

- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [Jak faktycznie działa pakiet zbiorczy Optimism?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)

**Rozwiązania hybrydowe**

- [Adding Hybrid PoS-Rollup Sidechain to Celer’s Coherent Layer-2 Platform on Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_
