---
title: Propozycja bloku
description: "Wyjaśnienie, w jaki sposób proponowane są bloki w Ethereum opartym na dowodzie stawki (PoS)."
lang: pl
---

Bloki są podstawowymi jednostkami blockchaina. Bloki to dyskretne jednostki informacji, które są przekazywane między węzłami, uzgadniane i dodawane do bazy danych każdego węzła. Ta strona wyjaśnia, jak są one tworzone.

## Wymagania wstępne {#prerequisites}

Propozycja bloku jest częścią protokołu dowodu stawki (PoS). Aby pomóc w zrozumieniu tej strony, zalecamy przeczytanie o [dowodzie stawki (PoS)](/developers/docs/consensus-mechanisms/pos/) oraz [architekturze bloku](/developers/docs/blocks/).

## Kto produkuje bloki? {#who-produces-blocks}

Konta walidatorów proponują bloki. Konta walidatorów są zarządzane przez operatorów węzłów, którzy uruchamiają oprogramowanie walidatora jako część swoich klientów warstwy wykonawczej i warstwy konsensusu oraz zdeponowali co najmniej 32 ETH w kontrakcie depozytowym. Jednak każdy walidator tylko sporadycznie jest odpowiedzialny za zaproponowanie bloku. [Ethereum](/) mierzy czas w slotach i epokach. Każdy slot trwa dwanaście sekund, a 32 sloty (6,4 minuty) tworzą epokę. Każdy slot to okazja do dodania nowego bloku w Ethereum.

### Losowy wybór {#random-selection}

Pojedynczy walidator jest pseudolosowo wybierany do zaproponowania bloku w każdym slocie. W blockchainie nie ma czegoś takiego jak prawdziwa losowość, ponieważ gdyby każdy węzeł generował prawdziwie losowe liczby, nie mogłyby one dojść do konsensusu. Zamiast tego celem jest uczynienie procesu wyboru walidatora nieprzewidywalnym. Losowość w Ethereum jest osiągana za pomocą algorytmu o nazwie RANDAO, który miesza hash od proponującego blok z ziarnem (seed), które jest aktualizowane w każdym bloku. Ta wartość jest używana do wyboru konkretnego walidatora z całego zestawu walidatorów. Wybór walidatora jest ustalany z wyprzedzeniem dwóch epok jako sposób ochrony przed pewnymi rodzajami manipulacji ziarnem.

Chociaż walidatorzy dodają do RANDAO w każdym slocie, globalna wartość RANDAO jest aktualizowana tylko raz na epokę. Aby obliczyć indeks następnego proponującego blok, wartość RANDAO jest mieszana z numerem slotu, co daje unikalną wartość w każdym slocie. Prawdopodobieństwo wyboru pojedynczego walidatora to nie po prostu `1/N` (gdzie `N` = całkowita liczba aktywnych walidatorów). Zamiast tego jest ono ważone przez efektywne saldo ETH każdego walidatora. Maksymalne efektywne saldo wynosi 32 ETH (oznacza to, że `balance < 32 ETH` prowadzi do niższej wagi niż `balance == 32 ETH`, ale `balance > 32 ETH` nie prowadzi do wyższej wagi niż `balance == 32 ETH`).

W każdym slocie wybierany jest tylko jeden proponujący blok. W normalnych warunkach pojedynczy producent bloku tworzy i udostępnia jeden blok w swoim dedykowanym slocie. Utworzenie dwóch bloków dla tego samego slotu jest przewinieniem podlegającym cięciu, często znanym jako „ekwiwokacja”.

## Jak tworzony jest blok? {#how-is-a-block-created}

Oczekuje się, że proponujący blok rozgłosi podpisany blok śledzący, który jest budowany na szczycie najnowszego czoła łańcucha zgodnie z widokiem jego własnego, lokalnie uruchomionego algorytmu wyboru rozwidlenia. Algorytm wyboru rozwidlenia stosuje wszelkie zakolejkowane poświadczenia pozostałe z poprzedniego slotu, a następnie znajduje blok z największą skumulowaną wagą poświadczeń w swojej historii. Ten blok jest rodzicem nowego bloku utworzonego przez proponującego.

Proponujący blok tworzy blok, zbierając dane z własnej lokalnej bazy danych i widoku łańcucha. Zawartość bloku przedstawiono we fragmencie poniżej:

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

Pole `randao_reveal` przyjmuje weryfikowalną wartość losową, którą proponujący blok tworzy poprzez podpisywanie numeru bieżącej epoki. `eth1_data` to głos na widok kontraktu depozytowego proponującego blok, w tym korzeń drzewa Merkle depozytów i całkowitą liczbę depozytów, co umożliwia weryfikację nowych depozytów. `graffiti` to opcjonalne pole, które może być użyte do dodania wiadomości do bloku. `proposer_slashings` i `attester_slashings` to pola zawierające dowód, że pewni walidatorzy popełnili przewinienia podlegające cięciu zgodnie z widokiem łańcucha proponującego. `deposits` to lista nowych depozytów walidatorów, o których wie proponujący blok, a `voluntary_exits` to lista walidatorów, którzy chcą dokonać wyjścia, o których proponujący blok usłyszał w sieci plotkowania (gossip network) warstwy konsensusu. `sync_aggregate` to wektor pokazujący, którzy walidatorzy byli wcześniej przypisani do komitetu synchronizacyjnego (podzbioru walidatorów obsługujących dane dla lekkich klientów) i uczestniczyli w podpisywaniu danych.

`execution_payload` umożliwia przekazywanie informacji o transakcjach między klientami warstwy wykonawczej i warstwy konsensusu. `execution_payload` to blok danych wykonawczych, który jest zagnieżdżony wewnątrz bloku śledzącego. Pola wewnątrz `execution_payload` odzwierciedlają strukturę bloku opisaną w żółtej księdze Ethereum, z tą różnicą, że nie ma w niej ommerów, a `prev_randao` istnieje zamiast `difficulty`. Klient warstwy wykonawczej ma dostęp do lokalnej puli transakcji, o których usłyszał we własnej sieci plotkowania. Te transakcje są wykonywane lokalnie w celu wygenerowania zaktualizowanego drzewa stanu, znanego jako stan końcowy (post-state). Transakcje są dołączane do `execution_payload` jako lista o nazwie `transactions`, a stan końcowy jest podawany w polu `state-root`.

Wszystkie te dane są zbierane w bloku śledzącym, podpisywane i rozgłaszane do węzłów partnerskich (peers) proponującego blok, które propagują je dalej do swoich węzłów partnerskich itd.

Przeczytaj więcej o [anatomii bloków](/developers/docs/blocks).

## Co dzieje się z blokiem? {#what-happens-to-blocks}

Blok jest dodawany do lokalnej bazy danych proponującego blok i rozgłaszany do węzłów partnerskich przez sieć plotkowania warstwy konsensusu. Kiedy walidator otrzymuje blok, weryfikuje zawarte w nim dane, w tym sprawdza, czy blok ma prawidłowego rodzica, odpowiada właściwemu slotowi, czy indeks proponującego jest zgodny z oczekiwaniami, czy ujawnienie RANDAO jest prawidłowe i czy proponujący nie został ukarany cięciem. `execution_payload` jest rozpakowywany, a klient warstwy wykonawczej walidatora ponownie wykonuje transakcje z listy, aby sprawdzić proponowaną zmianę stanu. Zakładając, że blok przejdzie wszystkie te kontrole, każdy walidator dodaje blok do własnego kanonicznego łańcucha. Następnie proces rozpoczyna się od nowa w kolejnym slocie.

## Nagrody za blok {#block-rewards}

Proponujący blok otrzymuje zapłatę za swoją pracę. Istnieje `base_reward` obliczana jako funkcja liczby aktywnych walidatorów i ich efektywnych sald. Proponujący blok otrzymuje następnie ułamek `base_reward` za każde ważne poświadczenie zawarte w bloku; im więcej walidatorów poświadcza blok, tym większa jest nagroda proponującego blok. Istnieje również nagroda za zgłaszanie walidatorów, którzy powinni zostać ukarani cięciem, równa `1/512 * effective balance` za każdego ukaranego cięciem walidatora.

[Więcej o nagrodach i karach](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Dalsza lektura {#further-reading}

- [Wprowadzenie do bloków](/developers/docs/blocks/)
- [Wprowadzenie do dowodu stawki (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Specyfikacje konsensusu Ethereum](https://github.com/ethereum/consensus-specs)
- [Wprowadzenie do Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Aktualizacja Ethereum](https://eth2book.info/)