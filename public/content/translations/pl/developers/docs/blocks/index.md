---
title: Bloki
description: "Przegląd bloków w blockchainie Ethereum – ich struktura danych, dlaczego są potrzebne i jak powstają."
lang: pl
---

Bloki to pakiety transakcji zawierające hash poprzedniego bloku w łańcuchu. Łączy to bloki ze sobą (w łańcuch), ponieważ hashe są kryptograficznie wyprowadzane z danych bloku. Zapobiega to oszustwom, ponieważ jedna zmiana w jakimkolwiek bloku w historii unieważniłaby wszystkie następne bloki, jako że wszystkie kolejne hashe uległyby zmianie, a każdy, kto uruchamia blockchain, by to zauważył.

## Wymagania wstępne {#prerequisites}

Bloki to temat bardzo przyjazny dla początkujących. Aby jednak pomóc Ci lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [kontach](/developers/docs/accounts/), [transakcjach](/developers/docs/transactions/) oraz nasze [wprowadzenie do Ethereum](/developers/docs/intro-to-ethereum/).

## Dlaczego bloki? {#why-blocks}

Aby upewnić się, że wszyscy uczestnicy w sieci [Ethereum](/) utrzymują zsynchronizowany stan i zgadzają się co do dokładnej historii transakcji, grupujemy transakcje w bloki. Oznacza to, że dziesiątki (lub setki) transakcji są zatwierdzane, uzgadniane i synchronizowane jednocześnie.

![A diagram showing transaction in a block causing state changes](./tx-block.png)
_Diagram zaadaptowany z [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Rozkładając zatwierdzenia w czasie, dajemy wszystkim uczestnikom sieci wystarczająco dużo czasu na osiągnięcie konsensusu: chociaż żądania transakcji pojawiają się dziesiątki razy na sekundę, bloki są tworzone i zatwierdzane w Ethereum tylko raz na dwanaście sekund.

## Jak działają bloki {#how-blocks-work}

Aby zachować historię transakcji, bloki są ściśle uporządkowane (każdy nowo utworzony blok zawiera odniesienie do swojego bloku nadrzędnego), a transakcje wewnątrz bloków również są ściśle uporządkowane. Z wyjątkiem rzadkich przypadków, w dowolnym momencie wszyscy uczestnicy sieci zgadzają się co do dokładnej liczby i historii bloków oraz pracują nad zgrupowaniem bieżących żądań transakcji w następny blok.

Gdy blok zostanie złożony przez losowo wybranego walidatora w sieci, jest on propagowany do reszty sieci; wszystkie węzły dodają ten blok na koniec swojego blockchaina, a nowy walidator jest wybierany do utworzenia następnego bloku. Dokładny proces składania bloków oraz proces zatwierdzania/konsensusu jest obecnie określony przez protokół „dowodu stawki (PoS)” Ethereum.

## Protokół dowodu stawki (PoS) {#proof-of-stake-protocol}

Dowód stawki (PoS) oznacza co następuje:

- Węzły walidujące muszą stakować 32 ETH w kontrakcie depozytowym jako zabezpieczenie przed złym zachowaniem. Pomaga to chronić sieć, ponieważ udowodniona nieuczciwa aktywność prowadzi do zniszczenia części lub całości tej stawki.
- W każdym slocie (oddalonym od siebie o dwanaście sekund) walidator jest losowo wybierany jako proponujący blok. Grupuje on transakcje, wykonuje je i określa nowy „stan”. Opakowuje te informacje w blok i przekazuje je innym walidatorom.
- Inni walidatorzy, którzy dowiadują się o nowym bloku, ponownie wykonują transakcje, aby upewnić się, że zgadzają się z proponowaną zmianą globalnego stanu. Zakładając, że blok jest ważny, dodają go do własnej bazy danych.
- Jeśli walidator dowie się o dwóch sprzecznych blokach dla tego samego slotu, używa swojego algorytmu wyboru rozwidlenia, aby wybrać ten, który jest poparty największą ilością stakowanego ETH.

[Więcej o dowodzie stawki (PoS)](/developers/docs/consensus-mechanisms/pos)

## Co znajduje się w bloku? {#block-anatomy}

Blok zawiera wiele informacji. Na najwyższym poziomie blok zawiera następujące pola:

| Pole | Opis |
| :--------------- | :---------------------------------------------------- |
| `slot` | slot, do którego należy blok |
| `proposer_index` | ID walidatora będącego proponującym blok |
| `parent_root` | hash poprzedniego bloku |
| `state_root` | hash główny (root hash) obiektu stanu |
| `body` | obiekt zawierający kilka pól, jak zdefiniowano poniżej |

Obiekt `body` bloku zawiera kilka własnych pól:

| Pole | Opis |
| :------------------- | :----------------------------------------------- |
| `randao_reveal` | wartość używana do wyboru następnego proponującego blok |
| `eth1_data` | informacje o kontrakcie depozytowym |
| `graffiti` | dowolne dane używane do oznaczania bloków |
| `proposer_slashings` | lista walidatorów do ukarania cięciem |
| `attester_slashings` | lista poświadczających do ukarania cięciem |
| `attestations` | lista poświadczeń dokonanych dla poprzednich slotów |
| `deposits` | lista nowych depozytów do kontraktu depozytowego |
| `voluntary_exits` | lista walidatorów opuszczających sieć |
| `sync_aggregate` | podzbiór walidatorów używanych do obsługi lekkich klientów |
| `execution_payload` | transakcje przekazane z klienta warstwy wykonawczej |

Pole `attestations` zawiera listę wszystkich poświadczeń w bloku. Poświadczenia mają swój własny typ danych, który zawiera kilka informacji. Każde poświadczenie zawiera:

| Pole | Opis |
| :----------------- | :------------------------------------------------------------- |
| `aggregation_bits` | lista walidatorów, którzy wzięli udział w tym poświadczeniu |
| `data` | kontener z wieloma podpólami |
| `signature` | zagregowany podpis zestawu walidatorów dla części `data` |

Pole `data` w `attestation` zawiera następujące elementy:

| Pole | Opis |
| :------------------ | :-------------------------------------------------------------- |
| `slot` | slot, którego dotyczy poświadczenie |
| `index` | indeksy poświadczających walidatorów |
| `beacon_block_root` | hash główny bloku śledzącego widzianego jako szczyt łańcucha |
| `source` | ostatni uzasadniony punkt kontrolny |
| `target` | najnowszy blok graniczny epoki |

Wykonanie transakcji w `execution_payload` aktualizuje globalny stan. Wszyscy klienci ponownie wykonują transakcje w `execution_payload`, aby upewnić się, że nowy stan pasuje do tego w polu `state_root` nowego bloku. W ten sposób klienci mogą stwierdzić, że nowy blok jest ważny i bezpieczny do dodania do ich blockchaina. Sam `execution payload` jest obiektem z kilkoma polami. Istnieje również `execution_payload_header`, który zawiera ważne informacje podsumowujące o danych wykonawczych. Te struktury danych są zorganizowane w następujący sposób:

`execution_payload_header` zawiera następujące pola:

| Pole | Opis |
| :------------------ | :------------------------------------------------------------------ |
| `parent_hash` | hash bloku nadrzędnego |
| `fee_recipient` | adres konta, na które uiszczane są opłaty transakcyjne |
| `state_root` | hash główny dla globalnego stanu po zastosowaniu zmian w tym bloku |
| `receipts_root` | hash drzewa (trie) paragonów transakcji |
| `logs_bloom` | struktura danych zawierająca logi zdarzeń |
| `prev_randao` | wartość używana w losowym wyborze walidatora |
| `block_number` | numer bieżącego bloku |
| `gas_limit` | maksymalny limit gazu dozwolony w tym bloku |
| `gas_used` | rzeczywista ilość gazu zużyta w tym bloku |
| `timestamp` | czas bloku |
| `extra_data` | dowolne dodatkowe dane jako surowe bajty |
| `base_fee_per_gas` | wartość opłaty podstawowej |
| `block_hash` | hash bloku wykonawczego |
| `transactions_root` | hash główny transakcji w ładunku (payload) |
| `withdrawal_root` | hash główny wypłat w ładunku |

Sam `execution_payload` zawiera następujące elementy (zauważ, że jest to identyczne z nagłówkiem, z tą różnicą, że zamiast hasha głównego transakcji zawiera rzeczywistą listę transakcji i informacje o wypłatach):

| Pole | Opis |
| :----------------- | :------------------------------------------------------------------ |
| `parent_hash` | hash bloku nadrzędnego |
| `fee_recipient` | adres konta, na które uiszczane są opłaty transakcyjne |
| `state_root` | hash główny dla globalnego stanu po zastosowaniu zmian w tym bloku |
| `receipts_root` | hash drzewa (trie) paragonów transakcji |
| `logs_bloom` | struktura danych zawierająca logi zdarzeń |
| `prev_randao` | wartość używana w losowym wyborze walidatora |
| `block_number` | numer bieżącego bloku |
| `gas_limit` | maksymalny limit gazu dozwolony w tym bloku |
| `gas_used` | rzeczywista ilość gazu zużyta w tym bloku |
| `timestamp` | czas bloku |
| `extra_data` | dowolne dodatkowe dane jako surowe bajty |
| `base_fee_per_gas` | wartość opłaty podstawowej |
| `block_hash` | hash bloku wykonawczego |
| `transactions` | lista transakcji do wykonania |
| `withdrawals` | lista obiektów wypłat |

Lista `withdrawals` zawiera obiekty `withdrawal` o następującej strukturze:

| Pole | Opis |
| :--------------- | :--------------------------------- |
| `address` | adres konta, które dokonało wypłaty |
| `amount` | kwota wypłaty |
| `index` | wartość indeksu wypłaty |
| `validatorIndex` | wartość indeksu walidatora |

## Czas bloku {#block-time}

Czas bloku odnosi się do czasu oddzielającego bloki. W Ethereum czas jest podzielony na dwunastosekundowe jednostki zwane „slotami”. W każdym slocie wybierany jest jeden walidator, który ma zaproponować blok. Zakładając, że wszyscy walidatorzy są online i w pełni funkcjonalni, w każdym slocie pojawi się blok, co oznacza, że czas bloku wynosi 12 s. Jednak czasami walidatorzy mogą być offline, gdy zostaną wezwani do zaproponowania bloku, co oznacza, że sloty mogą czasami pozostać puste.

Ta implementacja różni się od systemów opartych na dowodzie pracy (PoW), w których czasy bloków są probabilistyczne i dostrajane przez docelową trudność kopania protokołu. [Średni czas bloku](https://etherscan.io/chart/blocktime) w Ethereum jest tego doskonałym przykładem, gdzie przejście z dowodu pracy (PoW) na dowód stawki (PoS) można wyraźnie wywnioskować na podstawie spójności nowego 12-sekundowego czasu bloku.

## Rozmiar bloku {#block-size}

Ostatnią ważną uwagą jest to, że same bloki mają ograniczony rozmiar. Każdy blok ma docelowy rozmiar 30 milionów gazu, ale rozmiar bloków będzie rósł lub malał zgodnie z wymaganiami sieci, aż do limitu bloku wynoszącego 60 milionów gazu (2x docelowy rozmiar bloku). Limit gazu bloku może być korygowany w górę lub w dół o współczynnik 1/1024 w stosunku do limitu gazu poprzedniego bloku. W rezultacie walidatorzy mogą zmieniać limit gazu bloku poprzez konsensus. Całkowita ilość gazu zużyta przez wszystkie transakcje w bloku musi być mniejsza niż limit gazu bloku. Jest to ważne, ponieważ gwarantuje, że bloki nie mogą być dowolnie duże. Gdyby bloki mogły być dowolnie duże, mniej wydajne pełne węzły stopniowo przestałyby nadążać za siecią ze względu na wymagania dotyczące przestrzeni i szybkości. Im większy blok, tym większa moc obliczeniowa jest wymagana do przetworzenia go na czas przed następnym slotem. Jest to siła centralizująca, której przeciwdziała się poprzez ograniczanie rozmiarów bloków.

## Dalsza lektura {#further-reading}

_Znasz zasób społeczności, który Ci pomógł? Edytuj tę stronę i dodaj go!_

## Powiązane tematy {#related-topics}

- [Transakcje](/developers/docs/transactions/)
- [Gaz](/developers/docs/gas/)
- [Dowód stawki (PoS)](/developers/docs/consensus-mechanisms/pos)