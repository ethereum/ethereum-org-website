---
title: "Poświadczenia"
description: "Opis poświadczeń w Ethereum opartym na dowodzie stawki (proof-of-stake)."
lang: pl
---

Oczekuje się, że walidator utworzy, podpisze i rozgłosi poświadczenie podczas każdej epoki. Ta strona opisuje, jak wyglądają te poświadczenia oraz jak są przetwarzane i przekazywane między klientami konsensusu.

## Czym jest poświadczenie? {#what-is-an-attestation}

W każdej [epoce](/glossary/#epoch) (6,4 minuty) walidator rozgłasza poświadczenie do sieci. Poświadczenie dotyczy konkretnego slotu w epoce. Celem poświadczenia jest oddanie głosu popierającego wizję łańcucha według walidatora, w szczególności szczyt łańcucha, najnowszy uzasadniony punkt kontrolny oraz punkt kontrolny na początku bieżącej epoki (znane jako punkty kontrolne `source` i `target`). Informacje te są łączone dla wszystkich uczestniczących walidatorów, co pozwala sieci osiągnąć konsensus co do stanu blockchaina.

Od czasu [aktualizacji Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), poświadczenie od pojedynczego walidatora i zagregowane poświadczenie mają różne formaty. Poświadczenie pojedynczego walidatora zawiera:

- `committee_index`: komitet, do którego należy walidator w danym slocie
- `attester_index`: indeks walidatora
- `data`: szczegóły dotyczące poświadczenia, jak zdefiniowano poniżej
- `signature`: podpis BLS walidatora dla `data`

Pierwszym zadaniem dla poświadczającego walidatora jest zbudowanie `data`. `data` zawiera następujące informacje:

- `slot`: Numer slotu, do którego odnosi się poświadczenie
- `index`: Ustawione na `0` od czasu Pectra. Komitet jest identyfikowany poza `data` (przez `committee_index` lub przez `committee_bits` w agregacie), dzięki czemu głosy z różnych komitetów mają identyczne `data` i mogą być agregowane razem. Przed Pectra to pole identyfikowało komitet
- `beacon_block_root`: Hash główny bloku, który walidator widzi na szczycie łańcucha (wynik zastosowania algorytmu wyboru rozwidlenia)
- `source`: Część głosu ostateczności wskazująca, co walidatory widzą jako najnowszy uzasadniony punkt kontrolny
- `target`: Część głosu ostateczności wskazująca, co walidatory widzą jako punkt kontrolny na początku bieżącej epoki (blok w jej pierwszym slocie lub najnowszy blok przed nim, jeśli ten slot jest pusty)

Po zbudowaniu `data`, walidator podpisuje je i rozgłasza poświadczenie do [podsieci](#aggregated-attestation) dla swojego komitetu.

### Zagregowane poświadczenie {#aggregated-attestation}

Przekazywanie tych danych w sieci dla każdego walidatora wiąże się ze znacznym obciążeniem. Dlatego poświadczenia od poszczególnych walidatorów są agregowane w podsieciach przed szerszym rozgłoszeniem. Obejmuje to wspólne agregowanie podpisów, tak aby rozgłaszane poświadczenie zawierało konsensusowe `data` oraz pojedynczy podpis utworzony przez połączenie podpisów wszystkich walidatorów, którzy zgadzają się z tym `data`. Zagregowane poświadczenie zawiera:

- `aggregation_bits`: listę bitów z jednym bitem na członka każdego uwzględnionego komitetu, gdzie pozycja odpowiada pozycji walidatora w jego komitecie; wartość (0/1) wskazuje, czy podpis tego walidatora jest uwzględniony
- `data`: dane poświadczenia, które podpisał każdy uwzględniony walidator
- `signature`: podpis BLS, który agreguje podpisy uwzględnionych walidatorów
- `committee_bits`: członkowie których komitetów są objęci przez `aggregation_bits`

Każdy może sprawdzić zagregowany podpis w odniesieniu do połączonych kluczy publicznych walidatorów, których bity są ustawione.

W każdym slocie około 16 członków każdego komitetu jest wybieranych na jego `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Walidator dowiaduje się, czy został wybrany, na podstawie własnego podpisu dla numeru slotu. Agregatorzy zbierają wszystkie poświadczenia, które słyszą w podsieci swojego komitetu, mające to samo `data` co ich własne, i łączą je, zapisując nadawcę każdego z nich w `aggregation_bits`. Następnie agregatorzy rozgłaszają agregat do szerszej sieci.

Kiedy walidator zostaje wybrany na proponującego blok, dołącza zagregowane poświadczenia z ostatnich slotów do nowego bloku. Od czasu Pectra, proponujący może łączyć agregaty z różnych komitetów, które współdzielą to samo `data`, w jedno poświadczenie, a blok może pomieścić do 8 z nich.

### Cykl życia włączenia poświadczenia {#attestation-inclusion-lifecycle}

1. Generowanie
2. Propagacja
3. Agregacja
4. Propagacja
5. Włączenie

Cykl życia poświadczenia przedstawiono na poniższym schemacie:

<AttestationsDiagram />

## Nagrody {#rewards}

Walidatory są nagradzane za przesyłanie poświadczeń. Nagroda za poświadczenie zależy od flag uczestnictwa (źródło, cel i szczyt), nagrody podstawowej oraz wskaźnika uczestnictwa.

Każda z flag uczestnictwa może być prawdziwa lub fałszywa, w zależności od przesłanego poświadczenia i jego opóźnienia włączenia.

Najlepszy scenariusz ma miejsce, gdy wszystkie trzy flagi są prawdziwe, w którym to przypadku walidator zarobiłby (za każdą poprawną flagę):

`reward += base reward * flag weight * flag attesting rate / 64`

Wskaźnik poświadczania flagi jest mierzony przy użyciu sumy sald efektywnych wszystkich poświadczających walidatorów dla danej flagi w porównaniu do całkowitego aktywnego salda efektywnego.

### Nagroda podstawowa {#base-reward}

Nagroda podstawowa jest obliczana na podstawie liczby poświadczających walidatorów i ich efektywnych sald stakowanego etheru:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Opóźnienie włączenia {#inclusion-delay}

W momencie, gdy walidatory głosowały na szczyt łańcucha (`block n`), `block n+1` nie został jeszcze zaproponowany. Dlatego poświadczenia naturalnie zostają włączone **jeden blok później**, więc wszystkie poświadczenia, które głosowały na to, że `block n` jest szczytem łańcucha, zostały włączone w `block n+1`, a **opóźnienie włączenia** wynosi 1. Opóźnienie włączenia decyduje o tym, jakie flagi uczestnictwa zdobywa poświadczenie:

- `head`: tylko jeśli opóźnienie włączenia wynosi dokładnie 1 slot
- `source`: jeśli opóźnienie włączenia wynosi co najwyżej 5 slotów (całkowity pierwiastek kwadratowy z 32 slotów w epoce)
- `target`: zawsze, gdy poświadczenie jest włączone (od czasu aktualizacji Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Zatem poświadczenie włączone z opóźnieniem dwóch slotów traci nagrodę za szczyt, ale nadal zdobywa nagrody za źródło i cel.

### Scenariusze poświadczeń {#attestation-scenarios}

#### Brakujący głosujący walidator {#missing-voting-validator}

Poświadczenie może zostać włączone do dowolnego bloku od slotu po jego utworzeniu aż do końca następnej epoki. Jeśli poświadczenie z epoki 0 nie zostanie włączone do bloku podczas epoki 0, nadal może zostać włączone w epoce 1, z dłuższym opóźnieniem włączenia.

#### Brakujący agregator {#missing-aggregator}

Każdy komitet dąży do posiadania około 16 agregatorów w każdym slocie, więc jeden brakujący agregator rzadko powstrzymuje poświadczenia komitetu przed zagregowaniem. Niezależnie od tego, każdy węzeł Beacon pozostaje subskrybentem **dwóch podsieci przez 256 epok** naraz, wybranych na podstawie jego identyfikatora węzła, co zapewnia dobre połączenie każdej podsieci.

#### Brakujący proponujący blok {#missing-block-proposer}

Należy zauważyć, że w niektórych przypadkach szczęśliwy agregator może również zostać proponującym blok. Jeśli poświadczenie nie zostało włączone, ponieważ proponujący blok zniknął, następny proponujący blok pobierze zagregowane poświadczenie i włączy je do następnego bloku. Jednakże **opóźnienie włączenia** wzrośnie o jeden.

## Dalsza lektura {#further-reading}

- [Poświadczenia w opatrzonej adnotacjami specyfikacji konsensusu Vitalika](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Poświadczenia na eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Poświadczenia w specyfikacji konsensusu Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_
