---
title: Bloki
description: Przegląd bloków w blockchainie Ethereum – ich struktura danych, dlaczego są potrzebne i jak są wytwarzane.
lang: pl
---

Bloki są zestawami transakcji z kryptograficznym hashem poprzedniego bloku w łańcuchu. Łączy to bloki razem (w łańcuch), ponieważ hashe są kryptograficznymi pochodnymi z danych bloku. Zapobiega to oszustwom, ponieważ pojedyncza zmiana w dowolnym, historycznym bloku unieważniłaby wszystkie bloki następujące po nim, gdyż zmianie uległyby kolejne hashe, co wychwyciłby każdy, kto korzysta z blokchaina.

## Wymagania wstępne {#prerequisites}

Bloki to temat przyjazny dla nowicjuszy. Jednak dla lepszego zrozumienia tej strony zalecamy najpierw przeczytać rozdziały o [kontach](/developers/docs/accounts/) i  [transakcjach](/developers/docs/transactions/), a także nasze [Wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Dlaczego bloki? {#why-blocks}

Aby upewnić się, że wszyscy uczestnicy sieci Ethereum pozostają w zsynchronizowanym stanie i zgadzają się co do dokładnej historii transakcji, grupujemy transakcje w blokach. Oznacza to, że dziesiątki (lub setki) transakcji są zatwierdzane, uzgadniane i synchronizowane jednocześnie.

![Diagram przedstawiający transakcję w bloku, która powoduje zmiany stanu](./tx-block.png) _Diagram zaadaptowany z [Ilustrowanego Ethereum EVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Oddzielając zatwierdzenia, dajemy wszystkim uczestnikom sieci wystarczająco dużo czasu na osiągnięcie konsensusu: nawet jeśli żądania transakcji pojawiają się dziesiątki razy na sekundę, bloki są tworzone i zatwierdzane w Ethereum tylko raz na dwanaście sekund.

## Jak działają bloki {#how-blocks-work}

Aby zachować historię transakcji, bloki są ściśle uporządkowane (każdy nowy blok zawiera odniesienie do bloku nadrzędnego), podobnie ściśle uporządkowane są transakcje wewnątrz bloków. Poza rzadkimi przypadkami w każdym dowolnym momencie wszyscy uczestnicy sieci uzgadniają dokładną liczbę i historię bloków, pracują również nad tym, aby grupować bieżące żądania transakcji w następnym bloku.

Po złożeniu bloku przez losowo wybrany walidator w sieci jest on rozpowszechniany w pozostałej części sieci; wszystkie węzły dodają ten blok do końca swojego blockchaina, a do utworzenia następnego bloku wybiera się nowy walidator. Dokładny proces składania bloków i proces zatwierdzania/konsensusu jest obecnie określony przez protokół „proof-of-stake” sieci Ethereum.

## Protokół proof-of-stake (dowód stawki) {#proof-of-work-protocol}

Proof-of-stake oznacza, że:

- Węzły walidujące muszą zestakować 32 ETH do kontraktu depozytowego jako zabezpieczenie przed niewłaściwym zachowaniem. Pomaga to chronić sieć, ponieważ udowodniona nieuczciwa aktywność prowadzi do zniszczenia części lub całości tej stawki.
- W każdym slocie (w odstępie dwunastu sekund) walidator jest losowo wybierany na proponenta bloku. Łączy on transakcje, wykonuje je i określa nowy „stan”. Informacje te zawija w blok i przekazuje innym walidatorom.
- Inne walidatory, które usłyszą o nowym bloku, ponownie wykonują transakcje, aby upewnić się, że zgadzają się z proponowaną zmianą globalnego stanu. Zakładając, że blok jest prawidłowy, dodają go do własnej bazy danych.
- Jeśli walidator usłyszy o dwóch sprzecznych blokach dla tego samego slotu, używa swojego algorytmu wyboru forka, aby wybrać ten popierany przez najwięcej zestakowanych ETH.

[Więcej o proof-of-stake](/developers/docs/consensus-mechanisms/pos)

## Co znajduje się w bloku? {#block-anatomy}

W bloku znajduje się wiele informacji. Na najwyższym poziomie blok zawiera następujące pola:

| Pole             | Opis                                            |
|:---------------- |:----------------------------------------------- |
| `slot`           | slot, do którego należy blok                    |
| `proposer_index` | identyfikator walidatora proponującego blok     |
| `parent_root`    | hash poprzedniego bloku                         |
| `state_root`     | główny hash obiektu stanu                       |
| `treść`          | obiekt zawierający kilka pól, opisanych poniżej |

Blok `body` zawiera kilka własnych pól:

| Pole                 | Opis                                                       |
|:-------------------- |:---------------------------------------------------------- |
| `randao_reveal`      | wartość używana do wyboru następnego proponenta bloku      |
| `eth1_data`          | informacja o kontrakcie depozytowym                        |
| `graffiti`           | dowolne dane używane do oznaczania bloków                  |
| `proposer_slashings` | lista walidatorów do odcięcia                              |
| `attester_slashings` | lista poświadczających do odcięcia                         |
| `poświadczenia`      | lista poświadczeń na korzyść obecnego bloku                |
| `deposits`           | lista nowych depozytów do kontraktu depozytowego           |
| `voluntary_exits`    | lista walidatorów opuszczających sieć                      |
| `sync_aggregate`     | podzbiór walidatorów używanych do obsługi lekkich klientów |
| `execution_payload`  | transakcje przekazane od klienta wykonawczego              |

Pole `attestations` zawiera listę wszystkich poświadczeń w bloku. Poświadczenia mają swój własny typ danych, który zawiera kilka elementów danych. Każde poświadczenie zawiera:

| Pole               | Opis                                                        |
|:------------------ |:----------------------------------------------------------- |
| `aggregation_bits` | listę walidatorów, którzy uczestniczyli w tym poświadczeniu |
| `dane`             | kontener z wieloma podpolami                                |
| `podpis`           | zbiorczy podpis wszystkich poświadczających walidatorów     |

Pole `dane` w `poświadczenia` zawiera:

| Pole                | Opis                                                  |
|:------------------- |:----------------------------------------------------- |
| `slot`              | slot, do którego odnosi się poświadczenie             |
| `indeks`            | indeksy dla poświadczających walidatorów              |
| `beacon_block_root` | główny hash bloku śledzącego zawierającego ten obiekt |
| `źródło`            | ostatni uzasadniony punkt kontrolny                   |
| `target`            | blok graniczny ostatniej epoki                        |

Wykonanie transakcji w `execution_payload` aktualizuje globalny stan. Wszystkie klienty ponownie wykonują transakcje w `execution_payload` w celu upewnienia się, że nowy stan jest zgodny z tym w polu `state_root` nowego bloku. W ten sposób klienty mogą stwierdzić, że nowy blok jest ważny i można go bezpiecznie dodać do ich blockchaina. Pole `execution payload` samo w sobie jest obiektem z kilkoma polami. Istnieje również `execution_payload_header`, który zawiera ważne informacje podsumowujące dane wykonania. Te struktury danych są zorganizowane w następujący sposób:

`execution_payload_header` zawiera następujące pola:

| Pole                | Opis                                                               |
|:------------------- |:------------------------------------------------------------------ |
| `parent_hash`       | hash bloku nadrzędnego                                             |
| `fee_recipient`     | adres konta do uiszczania opłat transakcyjnych                     |
| `state_root`        | główny hash dla globalnego stanu po zastosowaniu zmian w tym bloku |
| `receipts_root`     | hasz potwierdzeń transakcji drzewa trie                            |
| `logs_bloom`        | struktura danych zawierająca dzienniki zdarzeń                     |
| `prev_randao`       | wartość używana w losowym wyborze walidatora                       |
| `block_number`      | numer bieżącego bloku                                              |
| `gas_limit`         | maksymalny gaz dozwolony w tym bloku                               |
| `gas_used`          | rzeczywista ilość gazu użytego w tym bloku                         |
| `znacznik czasu`    | czas bloku                                                         |
| `extra_data`        | dowolne dodatkowe dane jako surowe bajty                           |
| `base_fee_per_gas`  | wartość opłaty podstawowej                                         |
| `block_hash`        | hash bloku wykonania                                               |
| `transactions_root` | główny hash transakcji w ładunku (payload)                         |
| `withdrawal_root`   | główny hash wypłat w ładunku (payload)                             |

Sam `execution_payload` zawiera następujące pola (zauważ, że są identyczne jak w nagłówku (execution_payload_header), z wyjątkiem tego, że zamiast głównego hashu transakcji zawiera rzeczywistą listę transakcji i informacje o wypłacie):

| Pole               | Opis                                                               |
|:------------------ |:------------------------------------------------------------------ |
| `parent_hash`      | hash bloku nadrzędnego                                             |
| `fee_recipient`    | adres konta do uiszczania opłat transakcyjnych                     |
| `state_root`       | główny hash dla globalnego stanu po zastosowaniu zmian w tym bloku |
| `receipts_root`    | hasz potwierdzeń transakcji drzewa trie                            |
| `logs_bloom`       | struktura danych zawierająca dzienniki zdarzeń                     |
| `prev_randao`      | wartość używana w losowym wyborze walidatora                       |
| `block_number`     | numer bieżącego bloku                                              |
| `gas_limit`        | maksymalny gaz dozwolony w tym bloku                               |
| `gas_used`         | rzeczywista ilość gazu użytego w tym bloku                         |
| `znacznik czasu`   | czas bloku                                                         |
| `extra_data`       | dowolne dodatkowe dane jako surowe bajty                           |
| `base_fee_per_gas` | wartość opłaty podstawowej                                         |
| `block_hash`       | hash bloku wykonania                                               |
| `transakcje`       | lista transakcji do wykonania                                      |
| `wypłaty`          | lista obiektów do wypłaty                                          |

Lista `withdrawals` zawiera obiekty `withdrawal` o następującej strukturze:

| Pole             | Opis                                    |
|:---------------- |:--------------------------------------- |
| `address`        | adres konta, z którego dokonano wypłaty |
| `amount`         | kwota wypłaty                           |
| `indeks`         | wartość indeksu wypłaty                 |
| `validatorIndex` | wartość indeksu walidatora              |

## Czas bloku {#block-time}

Czas bloku odnosi się do czasu oddzielającego bloki. W Ethereum czas jest podzielony na dwunastosekundowe jednostki zwane „slotami”. W każdym slocie wybierany jest pojedynczy walidator do zaproponowania bloku. Zakładając, że wszystkie walidatory są online i w pełni funkcjonalne, w każdym slocie będzie blok, co oznacza, że czas bloku wynosi 12 sekund. Jednakże, od czasu do czasu walidatory mogą być offline, gdy zostaną wezwane do zaproponowania bloku, co oznacza, że sloty mogą być czasami puste.

Implementacja ta różni się od systemów opartych na proof-of-work, w których czasy bloków są probabilistyczne i wyznaczane przez docelową trudność wydobycia protokołu. [Średni czas bloku](https://etherscan.io/chart/blocktime) w Ethereum jest tego doskonałym przykładem, jako że przejście od proof-of-work do proof-of-stake można wyraźnie wywnioskować na podstawie spójności nowego 12-sekundowego czasu bloku.

## Rozmiar bloku {#block-size}

Ważna uwaga na zakończenie jest taka, że same bloki są ograniczone pod względem rozmiaru. Każdy blok ma docelowy rozmiar 15 milionów gazu, ale rozmiar bloków będzie zwiększany lub zmniejszany zgodnie z zapotrzebowaniem sieci aż do limitu bloku wynoszącego 30 milionów gazu (2x docelowy rozmiar bloku). Limit gazu w bloku może być korygowany w górę lub w dół o współczynnik 1/1024 w stosunku do limitu gazu w poprzednim bloku. W wyniku tego walidatorzy mogą zmieniać limit gazu w bloku za pośrednictwem konsensusu. Całkowita ilość gazu zużytego przez wszystkie transakcje w bloku musi być mniejsza niż limit gazu w bloku. Jest to ważne, gdyż gwarantuje, iż bloki nie mogą być dowolnie duże. Gdyby bloki mogły mieć dowolną wielkość, wtedy mniej wydajne, pełne węzły stopniowo przestawałyby nadążać za siecią z powodu wymogów odnośnie do przestrzeni i prędkości. Im większy blok, tym większa moc obliczeniowa jest wymagana do przetworzenia go na czas do następnego slotu. Jest to siła centralizująca, której można przeciwdziałać ograniczając rozmiary bloków.

## Dalsza lektura {#further-reading}

_Wiesz o zasobach społecznościowych, które Ci pomogły? Wyedytuj tę stronę i dodaj je!_

## Powiązane tematy {#related-topics}

- [Transakcje](/developers/docs/transactions/)
- [Gaz](/developers/docs/gas/)
- [Proof-of-stake](/developers/docs/consensus-mechanisms/pos)
