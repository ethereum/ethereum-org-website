---
title: Poświadczenia
description: Opis poświadczeń w Ethereum opartym na dowodzie stawki (proof-of-stake).
lang: pl
---

Oczekuje się, że walidator utworzy, podpisze i rozgłosi poświadczenie podczas każdej epoki. Ta strona opisuje, jak wyglądają te poświadczenia oraz jak są przetwarzane i przekazywane między klientami konsensusu.

## Czym jest poświadczenie? {#what-is-an-attestation}

Co [epokę](/glossary/#epoch) (6,4 minuty) walidator proponuje poświadczenie dla sieci. Poświadczenie dotyczy konkretnego slotu w epoce. Celem poświadczenia jest oddanie głosu na wizję łańcucha według walidatora, w szczególności na najnowszy uzasadniony blok i pierwszy blok w bieżącej epoce (znane jako punkty kontrolne `source` i `target`). Informacje te są łączone dla wszystkich uczestniczących walidatorów, umożliwiając sieci osiągnięcie konsensusu co do stanu blockchaina.

Poświadczenie zawiera następujące elementy:

- `aggregation_bits`: lista bitów walidatorów, gdzie pozycja odpowiada indeksowi walidatora w jego komitecie; wartość (0/1) wskazuje, czy walidator podpisał `data` (tj. czy jest aktywny i zgadza się z proponującym blok)
- `data`: szczegóły dotyczące poświadczenia, jak zdefiniowano poniżej
- `signature`: podpis BLS, który agreguje podpisy poszczególnych walidatorów

Pierwszym zadaniem dla poświadczającego walidatora jest zbudowanie `data`. `data` zawiera następujące informacje:

- `slot`: Numer slotu, do którego odnosi się poświadczenie
- `index`: Numer identyfikujący, do którego komitetu należy walidator w danym slocie
- `beacon_block_root`: Hash korzenia bloku, który walidator widzi na czele łańcucha (wynik zastosowania algorytmu wyboru rozwidlenia)
- `source`: Część głosu ostateczności wskazująca, co walidatory widzą jako najnowszy uzasadniony blok
- `target`: Część głosu ostateczności wskazująca, co walidatory widzą jako pierwszy blok w bieżącej epoce

Po zbudowaniu `data`, walidator może zmienić bit w `aggregation_bits` odpowiadający jego własnemu indeksowi walidatora z 0 na 1, aby pokazać, że wziął udział.

Na koniec walidator podpisuje poświadczenie i rozgłasza je w sieci.

### Zagregowane poświadczenie {#aggregated-attestation}

Przesyłanie tych danych w sieci dla każdego walidatora wiąże się ze znacznym narzutem. Dlatego poświadczenia od poszczególnych walidatorów są agregowane w podsieciach przed szerszym rozgłoszeniem. Obejmuje to agregację podpisów, tak aby rozgłaszane poświadczenie zawierało `data` konsensusu i pojedynczy podpis utworzony przez połączenie podpisów wszystkich walidatorów, którzy zgadzają się z tym `data`. Można to sprawdzić za pomocą `aggregation_bits`, ponieważ dostarcza on indeks każdego walidatora w jego komitecie (którego ID jest podane w `data`), co można wykorzystać do zapytania o poszczególne podpisy.

W każdej epoce 16 walidatorów w każdej podsieci jest wybieranych jako `aggregators` (agregatory). Agregatory zbierają wszystkie poświadczenia, o których słyszą w sieci plotek (gossip network), które mają `data` równoważne z ich własnymi. Nadawca każdego pasującego poświadczenia jest zapisywany w `aggregation_bits`. Następnie agregatory rozgłaszają zagregowane poświadczenie do szerszej sieci.

Kiedy walidator zostaje wybrany jako proponujący blok, pakuje zagregowane poświadczenia z podsieci aż do najnowszego slotu w nowym bloku.

### Cykl życia włączenia poświadczenia {#attestation-inclusion-lifecycle}

1. Generowanie
2. Propagacja
3. Agregacja
4. Propagacja
5. Włączenie

Cykl życia poświadczenia przedstawiono na poniższym schemacie:

![attestation lifecycle](./attestation_schematic.png)

## Nagrody {#rewards}

Walidatory otrzymują nagrody za przesyłanie poświadczeń. Nagroda za poświadczenie zależy od flag uczestnictwa (źródło, cel i głowa), nagrody bazowej oraz wskaźnika uczestnictwa.

Każda z flag uczestnictwa może być prawdziwa (true) lub fałszywa (false), w zależności od przesłanego poświadczenia i jego opóźnienia włączenia.

Najlepszy scenariusz ma miejsce, gdy wszystkie trzy flagi są prawdziwe, w którym to przypadku walidator zarobiłby (za każdą poprawną flagę):

`reward += base reward * flag weight * flag attesting rate / 64`

Wskaźnik poświadczania flagi jest mierzony przy użyciu sumy sald efektywnych wszystkich poświadczających walidatorów dla danej flagi w porównaniu do całkowitego aktywnego salda efektywnego.

### Nagroda bazowa {#base-reward}

Nagroda bazowa jest obliczana na podstawie liczby poświadczających walidatorów i ich efektywnych sald stakowanego etheru:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Opóźnienie włączenia {#inclusion-delay}

W momencie, gdy walidatory głosowały na głowę łańcucha (`block n`), `block n+1` nie był jeszcze zaproponowany. Dlatego poświadczenia naturalnie zostają włączone **jeden blok później**, więc wszystkie poświadczenia, które głosowały na `block n` jako głowę łańcucha, zostały włączone w `block n+1`, a **opóźnienie włączenia** wynosi 1. Jeśli opóźnienie włączenia podwoi się do dwóch slotów, nagroda za poświadczenie zmniejszy się o połowę, ponieważ do obliczenia nagrody za poświadczenie nagroda bazowa jest mnożona przez odwrotność opóźnienia włączenia.

### Scenariusze poświadczeń {#attestation-scenarios}

#### Brakujący głosujący walidator {#missing-voting-validator}

Walidatory mają maksymalnie 1 epokę na przesłanie swojego poświadczenia. Jeśli poświadczenie zostało pominięte w epoce 0, mogą je przesłać z opóźnieniem włączenia w epoce 1.

#### Brakujący agregator {#missing-aggregator}

W sumie przypada 16 agregatorów na epokę. Ponadto losowe walidatory subskrybują **dwie podsieci na 256 epok** i służą jako kopia zapasowa w przypadku braku agregatorów.

#### Brakujący proponujący blok {#missing-block-proposer}

Należy pamiętać, że w niektórych przypadkach szczęśliwy agregator może również zostać proponującym blok. Jeśli poświadczenie nie zostało włączone, ponieważ proponujący blok zniknął, następny proponujący blok odbierze zagregowane poświadczenie i włączy je do następnego bloku. Jednak **opóźnienie włączenia** wzrośnie o jeden.

## Dalsza lektura {#further-reading}

- [Poświadczenia w opatrzonej komentarzami specyfikacji konsensusu Vitalika](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Poświadczenia na eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_