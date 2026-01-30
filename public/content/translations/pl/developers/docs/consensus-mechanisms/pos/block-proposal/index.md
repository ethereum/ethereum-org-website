---
title: Propozycja bloku
description: Wyjaśnienie, w jaki sposób bloki są proponowane w Ethereum z dowodem stawki.
lang: pl
---

Bloki są podstawowymi jednostkami łańcucha bloków. Bloki są oddzielnymi jednostkami informacji, które są przekazywane między węzłami, uzgadniane i dodawane do bazy danych każdego węzła. Ta strona wyjaśnia, w jaki sposób są one produkowane.

## Wymagania wstępne {#prerequisites}

Proponowanie bloków jest częścią protokołu dowodu stawki. Aby lepiej zrozumieć tę stronę, zalecamy zapoznanie się z [dowodem stawki](/developers/docs/consensus-mechanisms/pos/) oraz [architekturą bloku](/developers/docs/blocks/).

## Kto produkuje bloki? {#who-produces-blocks}

Konta walidatorów proponują bloki. Konta walidatorów są zarządzane przez operatorów węzłów, którzy uruchamiają oprogramowanie walidatora jako część swoich klientów wykonawczych i klientów konsensusu oraz zdeponowali co najmniej 32 ETH w kontrakcie depozytowym. Jednak każdy walidator jest tylko od czasu do czasu odpowiedzialny za zaproponowanie bloku. Ethereum mierzy czas w slotach i epokach. Każdy slot trwa dwanaście sekund, a 32 sloty (6,4 minuty) tworzą jedną epokę. Każdy slot to okazja do dodania nowego bloku w Ethereum.

### Losowy wybór {#random-selection}

Pojedynczy walidator jest wybierany pseudolosowo do zaproponowania bloku w każdym slocie. W łańcuchu bloków nie ma czegoś takiego jak prawdziwa losowość, ponieważ gdyby każdy węzeł generował prawdziwie losowe liczby, nie mogłyby osiągnąć konsensusu. Zamiast tego celem jest uczynienie procesu wyboru walidatora nieprzewidywalnym. Losowość w Ethereum jest osiągana za pomocą algorytmu o nazwie RANDAO, który miesza hasz od proponenta bloku z ziarnem, które jest aktualizowane co blok. Ta wartość służy do wyboru określonego walidatora z całego zestawu walidatorów. Wybór walidatora jest ustalany z wyprzedzeniem dwóch epok jako sposób na ochronę przed niektórymi rodzajami manipulacji ziarnem.

Chociaż walidatorzy dodają do RANDAO w każdym slocie, globalna wartość RANDAO jest aktualizowana tylko raz na epokę. Aby obliczyć indeks następnego proponenta bloku, wartość RANDAO jest mieszana z numerem slotu, aby dać unikalną wartość w każdym slocie. Prawdopodobieństwo wyboru pojedynczego walidatora nie wynosi po prostu `1/N` (gdzie `N` = całkowita liczba aktywnych walidatorów). Zamiast tego jest ono ważone efektywnym saldem ETH każdego walidatora. Maksymalne efektywne saldo wynosi 32 ETH (oznacza to, że `saldo < 32 ETH` prowadzi do niższej wagi niż `saldo == 32 ETH`, ale `saldo > 32 ETH` nie prowadzi do wyższej wagi niż `saldo == 32 ETH`).

Tylko jeden proponent bloku jest wybierany w każdym slocie. W normalnych warunkach jeden producent bloku tworzy i publikuje pojedynczy blok w przeznaczonym dla niego slocie. Utworzenie dwóch bloków dla tego samego slotu jest wykroczeniem podlegającym slashingowi, często znanym jako „ekwiwokacja”.

## Jak tworzony jest blok? {#how-is-a-block-created}

Oczekuje się, że proponent bloku będzie rozgłaszał podpisany blok beacon, który jest budowany na ostatniej głowie łańcucha zgodnie z widokiem jego własnego, lokalnie uruchomionego algorytmu wyboru forka. Algorytm wyboru forka stosuje wszelkie poświadczenia w kolejce pozostałe z poprzedniego slotu, a następnie znajduje blok o największej skumulowanej wadze poświadczeń w swojej historii. Ten blok jest rodzicem nowego bloku utworzonego przez proponenta.

Proponent bloku tworzy blok, zbierając dane z własnej lokalnej bazy danych i widoku łańcucha. Zawartość bloku pokazano w poniższym fragmencie kodu:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Pole `randao_reveal` przyjmuje weryfikowalną wartość losową, którą proponent bloku tworzy, podpisując numer bieżącej epoki. `eth1_data` to głos na widok kontraktu depozytowego przez proponenta bloku, w tym na root drzewa Merkle depozytów oraz całkowitą liczbę depozytów, które umożliwiają weryfikację nowych depozytów. `graffiti` to opcjonalne pole, które można wykorzystać do dodania wiadomości do bloku. `proposer_slashings` i `attester_slashings` to pola zawierające dowody na to, że niektórzy walidatorzy popełnili wykroczenia podlegające slashingowi, zgodnie z widokiem łańcucha przez proponenta. `deposits` to lista nowych depozytów walidatorów, o których wie proponent bloku, a `voluntary_exits` to lista walidatorów, którzy chcą wyjść, o których proponent bloku usłyszał w sieci plotek warstwy konsensusu. `sync_aggregate` to wektor pokazujący, którzy walidatorzy zostali wcześniej przypisani do komitetu synchronizacji (podzbioru walidatorów, którzy obsługują dane lekkiego klienta) i uczestniczyli w podpisywaniu danych.

`execution_payload` umożliwia przekazywanie informacji o transakcjach między klientami wykonawczymi a klientami konsensusu. `execution_payload` to blok danych wykonawczych, który jest zagnieżdżony wewnątrz bloku beacon. Pola wewnątrz `execution_payload` odzwierciedlają strukturę bloku opisaną w Yellow Paper Ethereum, z tym wyjątkiem, że nie ma ommerów, a `prev_randao` istnieje w miejsce `difficulty`. Klient wykonawczy ma dostęp do lokalnej puli transakcji, o których usłyszał w swojej własnej sieci plotek. Transakcje te są wykonywane lokalnie w celu wygenerowania zaktualizowanego trie stanu, znanego jako post-state. Transakcje są zawarte w `execution_payload` jako lista o nazwie `transactions`, a post-state jest podany w polu `state-root`.

Wszystkie te dane są gromadzone w bloku beacon, podpisywane i rozgłaszane do peerów proponenta bloku, którzy propagują je dalej do swoich peerów itd.

Przeczytaj więcej o [anatomii bloków](/developers/docs/blocks).

## Co dzieje się z blokiem? {#what-happens-to-blocks}

Blok jest dodawany do lokalnej bazy danych proponenta bloku i rozgłaszany do peerów za pośrednictwem sieci plotek warstwy konsensusu. Gdy walidator otrzyma blok, weryfikuje dane w nim zawarte, w tym sprawdza, czy blok ma prawidłowego rodzica, odpowiada prawidłowemu slotowi, czy indeks proponenta jest zgodny z oczekiwaniami, czy ujawnienie RANDAO jest prawidłowe i czy proponent nie został poddany slashingowi. `execution_payload` jest rozpakowywany, a klient wykonawczy walidatora ponownie wykonuje transakcje z listy, aby sprawdzić proponowaną zmianę stanu. Zakładając, że blok przejdzie wszystkie te kontrole, każdy walidator dodaje blok do swojego własnego kanonicznego łańcucha. Następnie proces rozpoczyna się od nowa w następnym slocie.

## Nagrody za blok {#block-rewards}

Proponent bloku otrzymuje zapłatę za swoją pracę. Istnieje `base_reward`, która jest obliczana jako funkcja liczby aktywnych walidatorów i ich efektywnych sald. Proponent bloku otrzymuje następnie ułamek `base_reward` za każde prawidłowe poświadczenie zawarte w bloku; im więcej walidatorów poświadczy blok, tym większa nagroda dla proponenta bloku. Istnieje również nagroda za zgłaszanie walidatorów, którzy powinni zostać poddani slashingowi, równa `1/512 * efektywne saldo` za każdego walidatora poddanego slashingowi.

[Więcej o nagrodach i karach](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Dalsza lektura {#further-reading}

- [Wprowadzenie do bloków](/developers/docs/blocks/)
- [Wprowadzenie do proof-of-stake](/developers/docs/consensus-mechanisms/pos/)
- [Specyfikacje konsensusu Ethereum](https://github.com/ethereum/consensus-specs)
- [Wprowadzenie do Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Aktualizacja Ethereum](https://eth2book.info/)
