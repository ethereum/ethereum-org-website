---
title: "Poświadczenia"
description: "Opis zaświadczeń proof-of-stake na Ethereum."
lang: pl
---

Od walidatora oczekuje się, że utworzy, podpisze i rozgłosi poświadczenie w każdej epoce. Na tej stronie opisano, jak wyglądają te poświadczenia oraz jak są przetwarzane i przekazywane między klientami konsensusu.

## Czym jest poświadczenie? {#what-is-an-attestation}

W każdej [epoce](/glossary/#epoch) (6,4 minuty) walidator proponuje sieci poświadczenie. Poświadczenie dotyczy określonego slotu w epoce. Celem poświadczenia jest zagłosowanie za widokiem łańcucha przez walidatora, w szczególności za ostatnim uzasadnionym blokiem i pierwszym blokiem w bieżącej epoce (znanymi jako punkty kontrolne `source` i `target`). Informacje te są łączone dla wszystkich uczestniczących walidatorów, umożliwiając sieci osiągnięcie konsensusu co do stanu łańcucha bloków.

Poświadczenie zawiera następujące składniki:

- `aggregation_bits`: lista bitowa walidatorów, w której pozycja odpowiada indeksowi walidatora w jego komitecie; wartość (0/1) wskazuje, czy walidator podpisał `dane` (tj. czy jest aktywny i zgadza się z proponującym blok)
- `data`: szczegóły dotyczące poświadczenia, zdefiniowane poniżej
- `signature`: podpis BLS, który agreguje podpisy poszczególnych walidatorów

Pierwszym zadaniem walidatora poświadczającego jest zbudowanie `danych`. `Dane` zawierają następujące informacje:

- `slot`: numer slotu, do którego odnosi się poświadczenie
- `index`: numer identyfikujący komitet, do którego należy walidator w danym slocie
- `beacon_block_root`: główny hasz bloku, który walidator widzi na czele łańcucha (wynik zastosowania algorytmu wyboru forka)
- `source`: część głosowania w sprawie nieodwołalności, wskazująca, co walidatorzy postrzegają jako najnowszy uzasadniony blok
- `target`: część głosowania w sprawie nieodwołalności, wskazująca, co walidatorzy postrzegają jako pierwszy blok w bieżącej epoce

Po zbudowaniu `danych`, walidator może zmienić bit w `aggregation_bits` odpowiadający jego własnemu indeksowi walidatora z 0 na 1, aby pokazać, że brał udział.

Na koniec walidator podpisuje poświadczenie i rozgłasza je w sieci.

### Poświadczenie zagregowane {#aggregated-attestation}

Przekazywanie tych danych w sieci dla każdego walidatora wiąże się ze znacznym narzutem. Dlatego poświadczenia od poszczególnych walidatorów są agregowane w podsieciach, zanim zostaną szerzej rozgłoszone. Obejmuje to agregowanie podpisów, tak aby rozgłaszane poświadczenie zawierało `dane` konsensusu i pojedynczy podpis utworzony przez połączenie podpisów wszystkich walidatorów, którzy zgadzają się z tymi `danymi`. Można to sprawdzić za pomocą `aggregation_bits`, ponieważ dostarcza to indeks każdego walidatora w jego komitecie (którego ID jest podane w `danych`), który można wykorzystać do odpytywania poszczególnych podpisów.

W każdej epoce 16 walidatorów w każdej podsieci jest wybieranych na `agregatorów`. Agregatorzy zbierają wszystkie poświadczenia, o których usłyszą w sieci gossip, które mają `dane` równoważne z ich własnymi. Nadawca każdego pasującego poświadczenia jest zapisywany w `aggregation_bits`. Agregatorzy następnie rozgłaszają agregat poświadczeń do szerszej sieci.

Gdy walidator zostaje wybrany na proponującego blok, pakuje zagregowane poświadczenia z podsieci aż do najnowszego slotu w nowym bloku.

### Cykl życia włączenia poświadczenia {#attestation-inclusion-lifecycle}

1. Generowanie
2. Propagacja
3. Agregacja
4. Propagacja
5. Włączenie

Cykl życia poświadczenia jest przedstawiony na poniższym schemacie:

![cykl życia poświadczenia](./attestation_schematic.png)

## Nagrody {#rewards}

Walidatorzy są nagradzani za przesyłanie poświadczeń. Nagroda za poświadczenie zależy od flag uczestnictwa (źródło, cel i głowa), nagrody podstawowej i wskaźnika uczestnictwa.

Każda z flag uczestnictwa może mieć wartość „prawda” lub „fałsz”, w zależności od przesłanego poświadczenia i jego opóźnienia włączenia.

Najlepszy scenariusz ma miejsce, gdy wszystkie trzy flagi mają wartość „prawda”, w którym to przypadku walidator zarobi (za każdą prawidłową flagę):

`nagroda += nagroda podstawowa * waga flagi * wskaźnik poświadczania flagi / 64`

Wskaźnik poświadczania flagi jest mierzony za pomocą sumy efektywnych sald wszystkich walidatorów poświadczających dla danej flagi w porównaniu z całkowitym aktywnym saldem efektywnym.

### Nagroda podstawowa {#base-reward}

Nagroda podstawowa jest obliczana na podstawie liczby walidatorów poświadczających i ich efektywnych sald stakowanego etheru:

`nagroda podstawowa = efektywne saldo walidatora x 2^6 / SQRT(Efektywne saldo wszystkich aktywnych walidatorów)`

#### Opóźnienie włączenia {#inclusion-delay}

W momencie, gdy walidatorzy głosowali nad głową łańcucha (`blok n`), `blok n+1` nie został jeszcze zaproponowany. Dlatego poświadczenia są naturalnie włączane **jeden blok później**, więc wszystkie poświadczenia, które głosowały za tym, że `blok n` jest głową łańcucha, zostały włączone do `bloku n+1`, a **opóźnienie włączenia** wynosi 1. Jeśli opóźnienie włączenia podwoi się do dwóch slotów, nagroda za poświadczenie zmniejszy się o połowę, ponieważ do obliczenia nagrody za poświadczenie, nagroda podstawowa jest mnożona przez odwrotność opóźnienia włączenia.

### Scenariusze poświadczeń {#attestation-scenarios}

#### Brakujący walidator głosujący {#missing-voting-validator}

Walidatorzy mają maksymalnie 1 epokę na przesłanie swojego poświadczenia. Jeśli poświadczenie zostało pominięte w epoce 0, mogą je przesłać z opóźnieniem włączenia w epoce 1.

#### Brakujący agregator {#missing-aggregator}

W sumie jest 16 agregatorów na epokę. Ponadto losowi walidatorzy subskrybują **dwie podsieci na 256 epok** i służą jako kopia zapasowa na wypadek braku agregatorów.

#### Brakujący proponujący blok {#missing-block-proposer}

Należy pamiętać, że w niektórych przypadkach szczęśliwy agregator może również stać się proponującym blok. Jeśli poświadczenie nie zostało włączone, ponieważ brakuje proponującego blok, następny proponujący blok pobierze zagregowane poświadczenie i włączy je do następnego bloku. Jednakże **opóźnienie włączenia** wzrośnie o jeden.

## Dalsza lektura {#further-reading}

- [Poświadczenia w specyfikacji konsensusu z adnotacjami Vitalika](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Poświadczenia w eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Znasz jakieś zasoby społeczności, które Ci pomogły? Edytuj tę stronę i dodaj je!_
