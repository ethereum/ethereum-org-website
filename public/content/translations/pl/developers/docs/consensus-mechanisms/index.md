---
title: Mechanizmy konsensusu
description: Wyjaśnienie protokołów konsensusu w systemach rozproszonych i roli, jaką odgrywają w Ethereum.
lang: pl
incomplete: true
---

Jeśli chodzi o blockchainy, takie jak Ethereum, które są w istocie rozproszonymi bazami danych, węzły sieci muszą być w stanie osiągnąć porozumienie w sprawie aktualnego stanu systemu. Osiąga się to za pomocą mechanizmów konsensusu.

Chociaż nie jest to częścią budowania zdecentralizowanej aplikacji, zrozumienie mechanizmów konsensusu pomoże wyjaśnić rzeczy, które są istotne dla Ciebie i doświadczenia Twoich użytkowników, takie jak ceny gazu i czas transakcji.

## Warunki wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać nasze [wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Czym jest mechanizm konsensusu? {#what-is-a-consensus-mechanism}

Mechanizmy konsensusu (znane również jako protokoły konsensusu lub algorytmy konsensusu) umożliwiają współpracę systemów rozproszonych (sieci komputerów) i zachowanie bezpieczeństwa.

Od dziesięcioleci mechanizmy te są wykorzystywane do ustanawiania konsensusu między węzłami baz danych, serwerami aplikacji i inną infrastrukturą przedsiębiorstwa. W ostatnich latach wynaleziono nowe protokoły konsensusu, aby umożliwić systemom kryptoekonomicznym, takim jak Ethereum, uzgodnienie stanu sieci.

Mechanizm konsensusu w systemie kryptoekonomicznym pomaga również zapobiegać niektórym rodzajom ataków ekonomicznych. Teoretycznie atakujący może naruszyć konsensus, kontrolując 51% sieci. Mechanizmy konsensusu mają na celu uczynienie tego „ataku 51%” niewykonalnym. Opracowano różne mechanizmy, aby w różny sposób rozwiązać ten problem bezpieczeństwa.

## Rodzaje mechanizmów konsensusu {#types-of-consensus-mechanisms}

### Proof-of-work {#proof-of-work}

Ethereum, podobnie jak Bitcoin, wykorzystuje obecnie protokół konsensusu proof-of-work (PoW).

#### Tworzenie bloku {#pow-block-creation}

Proof-of-work jest wykonywany przez [górników](/developers/docs/consensus-mechanisms/pow/mining/), którzy konkurują o tworzenie nowych bloków pełnych przetworzonych transakcji. Zwycięzca dzieli się nowym blokiem z resztą sieci i zarabia świeżo wybite ETH. Wyścig wygrywa komputer każdego, kto najszybciej rozwiąże zagadkę matematyczną – w ten sposób powstaje połączenie kryptograficzne między bieżącym blokiem a poprzednim blokiem. Rozwiązanie tej zagadki to praca w „proof of work”.

#### Bezpieczeństwo {#pow-security}

Sieć jest bezpieczna dzięki temu, że do oszukania łańcucha potrzeba 51% mocy obliczeniowej sieci. Wymagałoby to tak ogromnych inwestycji w sprzęt i energię, że prawdopodobnie wydasz więcej, niż zyskasz.

Więcej informacji o [proof-of-work (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Proof-of-stake {#proof-of-stake}

Ethereum planuje uaktualnienie do protokołu konsensusu [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/).

#### Tworzenie bloku {#pos-block-creation}

Proof-of-stake są przeprowadzane przez walidatorów, którzy zaangażowali się w ETH w udział w systemie. Walidator jest wybierany losowo, aby tworzyć nowe bloki, udostępniać je w sieci i zdobywać nagrody. Zamiast wykonywać intensywną pracę obliczeniową, wystarczy postawić ETH w sieci. To właśnie zachęca do zdrowego zachowania w sieci.

#### Bezpieczeństwo {#pos-security}

System proof-of-stake jest bezpieczny dzięki temu, że do oszukania łańcucha potrzebujesz 51% wszystkich postawionych ETH. I że twoja stawka jest obcinana za złośliwe zachowanie.

Więcej informacji o [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Dalsza lektura {#further-reading}

## Tematy powiązane {#related-topics}

- [Proof-of-work](/developers/docs/consensus-mechanisms/pow/)
- [Wydobywanie](/developers/docs/consensus-mechanisms/pow/mining/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
