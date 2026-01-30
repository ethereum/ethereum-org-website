---
title: "Inżynieria odwrotna kontraktu"
description: Jak zrozumieć kontrakt, gdy nie masz kodu źródłowego
author: Ori Pomerantz
lang: pl
tags: [ "evm", "kody operacyjne" ]
skill: advanced
published: 2021-12-30
---

## Wprowadzenie {#introduction}

_W blockchainie nie ma tajemnic_, wszystko, co się dzieje, jest spójne, weryfikowalne i publicznie dostępne. [kontrakty powinny mieć opublikowany i zweryfikowany kod źródłowy na Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). [Nie zawsze tak jest](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). W tym artykule dowiesz się, jak przeprowadzać inżynierię wsteczną kontraktów, przyglądając się kontraktowi bez kodu źródłowego, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Istnieją odwrotne kompilatory, ale nie zawsze dają one [użyteczne wyniki](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). W tym artykule dowiesz się, jak ręcznie przeprowadzić inżynierię wsteczną i zrozumieć kontrakt z [kodów operacyjnych](https://github.com/wolflo/evm-opcodes), a także jak interpretować wyniki dekompilatora.

Aby zrozumieć ten artykuł, powinieneś już znać podstawy EVM i być przynajmniej w pewnym stopniu zaznajomiony z asemblerem EVM. [Możesz przeczytać o tych tematach tutaj](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Przygotuj kod wykonywalny {#prepare-the-executable-code}

Kody operacyjne można uzyskać, przechodząc do Etherscan dla kontraktu, klikając kartę **Kontrakt**, a następnie **Przełącz na widok kodów operacyjnych**. Otrzymasz widok, w którym w każdej linii znajduje się jeden kod operacyjny.

![Widok kodów operacyjnych z Etherscan](opcode-view.png)

Aby jednak zrozumieć skoki, musisz wiedzieć, gdzie w kodzie znajduje się każdy kod operacyjny. Aby to zrobić, jednym ze sposobów jest otwarcie Arkusza Google i wklejenie kodów operacyjnych w kolumnie C. [Możesz pominąć następujące kroki, tworząc kopię tego już przygotowanego arkusza kalkulacyjnego](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Następnym krokiem jest uzyskanie prawidłowych lokalizacji kodu, abyśmy mogli zrozumieć skoki. Rozmiar kodu operacyjnego umieścimy w kolumnie B, a lokalizację (w systemie szesnastkowym) w kolumnie A. Wpisz tę funkcję w komórce `B1`, a następnie skopiuj i wklej ją do reszty kolumny B, aż do końca kodu. Po wykonaniu tej czynności możesz ukryć kolumnę B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Najpierw ta funkcja dodaje jeden bajt dla samego kodu operacyjnego, a następnie szuka `PUSH`. Kody operacyjne typu „push” są specjalne, ponieważ potrzebują dodatkowych bajtów dla przesyłanej wartości. Jeśli kod operacyjny to `PUSH`, wyodrębniamy liczbę bajtów i dodajemy ją.

W `A1` umieść pierwsze przesunięcie, zero. Następnie w `A2` umieść tę funkcję i ponownie skopiuj i wklej ją do reszty kolumny A:

```
=dec2hex(hex2dec(A1)+B1)
```

Potrzebujemy tej funkcji, aby dać nam wartość szesnastkową, ponieważ wartości, które są wypychane przed skokami (`JUMP` i `JUMPI`), są nam podawane w systemie szesnastkowym.

## Punkt wejścia (0x00) {#the-entry-point-0x00}

Kontrakty są zawsze wykonywane od pierwszego bajtu. To jest początkowa część kodu:

| Przesunięcie | Kod operacyjny | Stos (po kodzie operacyjnym) |
| -----------: | -------------- | ----------------------------------------------- |
|            0 | PUSH1 0x80     | 0x80                                            |
|            2 | PUSH1 0x40     | 0x40, 0x80                                      |
|            4 | MSTORE         | Pusty                                           |
|            5 | PUSH1 0x04     | 0x04                                            |
|            7 | CALLDATASIZE   | CALLDATASIZE 0x04                               |
|            8 | LT             | CALLDATASIZE\<4       |
|            9 | PUSH2 0x005e   | 0x5E CALLDATASIZE\<4  |
|            C | JUMPI          | Pusty                                           |

Ten kod robi dwie rzeczy:

1. Zapisz 0x80 jako 32-bajtową wartość w lokalizacjach pamięci 0x40-0x5F (0x80 jest przechowywane w 0x5F, a 0x40-0x5E to same zera).
2. Odczytaj rozmiar calldata. Zwykle dane wywołania dla kontraktu Ethereum są zgodne z [ABI (binarny interfejs aplikacji)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), który wymaga co najmniej czterech bajtów dla selektora funkcji. Jeśli rozmiar danych wywołania jest mniejszy niż cztery, przejdź do 0x5E.

![Schemat blokowy dla tej części](flowchart-entry.png)

### Procedura obsługi w 0x5E (dla danych wywołania innych niż ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Przesunięcie | Kod operacyjny |
| -----------: | -------------- |
|           5E | JUMPDEST       |
|           5F | CALLDATASIZE   |
|           60 | PUSH2 0x007c   |
|           63 | JUMPI          |

Ten fragment zaczyna się od `JUMPDEST`. Programy EVM (Wirtualna Maszyna Ethereum) zgłaszają wyjątek, jeśli przeskoczysz do kodu operacyjnego, który nie jest `JUMPDEST`. Następnie sprawdza CALLDATASIZE i jeśli jest „prawdziwe” (to znaczy nie jest zerem), przeskakuje do 0x7C. Do tego przejdziemy poniżej.

| Przesunięcie | Kod operacyjny | Stos (po kodzie operacyjnym)                                                    |
| -----------: | -------------- | -------------------------------------------------------------------------------------------------- |
|           64 | CALLVALUE      | [Wei](/glossary/#wei) dostarczone przez wywołanie. Nazywane `msg.value` w Solidity |
|           65 | PUSH1 0x06     | 6 CALLVALUE                                                                                        |
|           67 | PUSH1 0x00     | 0 6 CALLVALUE                                                                                      |
|           69 | DUP3           | CALLVALUE 0 6 CALLVALUE                                                                            |
|           6A | DUP3           | 6 CALLVALUE 0 6 CALLVALUE                                                                          |
|           6B | SLOAD          | Storage[6] CALLVALUE 0 6 CALLVALUE             |

Więc kiedy nie ma danych wywołania, odczytujemy wartość Storage[6]. Nie wiemy jeszcze, jaka to wartość, ale możemy poszukać transakcji, które kontrakt otrzymał bez danych wywołania. Transakcje, które po prostu przesyłają ETH bez żadnych danych wywołania (a zatem bez metody), mają w Etherscan metodę `Transfer`. W rzeczywistości [pierwsza transakcja, jaką otrzymał kontrakt](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) jest transferem.

Jeśli spojrzymy na tę transakcję i klikniemy **Kliknij, aby zobaczyć więcej**, zobaczymy, że dane wywołania, zwane danymi wejściowymi, są rzeczywiście puste (`0x`). Zauważ również, że wartość wynosi 1,559 ETH, co będzie istotne później.

![Dane wywołania są puste](calldata-empty.png)

Następnie kliknij kartę **Stan** i rozwiń kontrakt, którego inżynierię odwrotną przeprowadzamy (0x2510...). Można zauważyć, że `Storage[6]` zmieniło się podczas transakcji, a jeśli zmienisz Hex na **Liczba**, zobaczysz, że stało się to 1,559,000,000,000,000,000, wartość przeniesiona w wei (dodałem przecinki dla przejrzystości), co odpowiada następnej wartości kontraktu.

![Zmiana w Storage[6]](storage6.png)

Jeśli spojrzymy na zmiany stanu spowodowane przez [inne transakcje `Transfer` z tego samego okresu](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), zobaczymy, że `Storage[6]` przez pewien czas śledziło wartość kontraktu. Na razie nazwijmy to `Value*`. Gwiazdka (`*`) przypomina nam, że jeszcze nie _wiemy_, co robi ta zmienna, ale nie może ona służyć tylko do śledzenia wartości kontraktu, ponieważ nie ma potrzeby używania pamięci masowej (storage), która jest bardzo droga, skoro można uzyskać saldo konta za pomocą `ADDRESS BALANCE`. Pierwszy kod operacyjny umieszcza na stosie własny adres kontraktu. Drugi odczytuje adres na szczycie stosu i zastępuje go saldem tego adresu.

| Przesunięcie | Kod operacyjny | Stos                                        |
| -----------: | -------------- | ------------------------------------------- |
|           6C | PUSH2 0x0075   | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|           6F | SWAP2          | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|           70 | SWAP1          | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|           71 | PUSH2 0x01a7   | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|           74 | JUMP           |                                             |

Będziemy kontynuować śledzenie tego kodu w miejscu docelowym skoku.

| Przesunięcie | Kod operacyjny | Stos                                                        |
| -----------: | -------------- | ----------------------------------------------------------- |
|          1A7 | JUMPDEST       | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|          1A8 | PUSH1 0x00     | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|          1AA | DUP3           | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|          1AB | NOT            | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` jest operacją bitową, więc odwraca wartość każdego bitu w wartości wywołania.

| Przesunięcie | Kod operacyjny | Stos                                                                                                   |
| -----------: | -------------- | ------------------------------------------------------------------------------------------------------ |
|          1AC | DUP3           | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|          1AD | GT             | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|          1AE | ISZERO         | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|          1AF | PUSH2 0x01df   | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|          1B2 | JUMPI          |                                                                                                        |

Skaczemy, jeśli `Value*` jest mniejsze niż 2^256-CALLVALUE-1 lub równe tej wartości. Wygląda to na logikę zapobiegającą przepełnieniu. I rzeczywiście, widzimy, że po kilku bezsensownych operacjach (na przykład zapis do pamięci, który zaraz zostanie usunięty) przy przesunięciu 0x01DE kontrakt powraca, jeśli wykryte zostanie przepełnienie, co jest normalnym zachowaniem.

Należy zauważyć, że takie przepełnienie jest niezwykle mało prawdopodobne, ponieważ wymagałoby, aby wartość wywołania plus `Value*` była porównywalna z 2^256 wei, czyli około 10^59 ETH. [Całkowita podaż ETH w momencie pisania tego tekstu wynosi mniej niż dwieście milionów](https://etherscan.io/stat/supply).

| Przesunięcie | Kod operacyjny | Stos                                      |
| -----------: | -------------- | ----------------------------------------- |
|          1DF | JUMPDEST       | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|          1E0 | POP            | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|          1E1 | ADD            | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|          1E2 | SWAP1          | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|          1E3 | JUMP           |                                           |

Jeśli dotarliśmy tutaj, pobierz `Value* + CALLVALUE` i przejdź do przesunięcia 0x75.

| Przesunięcie | Kod operacyjny | Stos                            |
| -----------: | -------------- | ------------------------------- |
|           75 | JUMPDEST       | Value\*+CALLVALUE 0 6 CALLVALUE |
|           76 | SWAP1          | 0 Value\*+CALLVALUE 6 CALLVALUE |
|           77 | SWAP2          | 6 Value\*+CALLVALUE 0 CALLVALUE |
|           78 | SSTORE         | 0 CALLVALUE                     |

Jeśli dotrzemy tutaj (co wymaga, aby dane wywołania były puste), dodajemy do `Value*` wartość wywołania. Jest to zgodne z tym, co według nas robią transakcje `Transfer`.

| Przesunięcie | Kod operacyjny |
| -----------: | -------------- |
|           79 | POP            |
|           7A | POP            |
|           7B | STOP           |

Na koniec wyczyść stos (co nie jest konieczne) i zasygnalizuj pomyślne zakończenie transakcji.

Podsumowując, oto schemat blokowy dla początkowego kodu.

![Schemat blokowy punktu wejścia](flowchart-entry.png)

## Procedura obsługi w 0x7C {#the-handler-at-0x7c}

Celowo nie umieściłem w nagłówku informacji o tym, co robi ta procedura obsługi. Celem nie jest nauczenie Cię, jak działa ten konkretny kontrakt, ale jak przeprowadzać inżynierię wsteczną kontraktów. Dowiesz się, co robi, w ten sam sposób, co ja – śledząc kod.

Docieramy tu z kilku miejsc:

- Jeśli istnieją dane wywołania o długości 1, 2 lub 3 bajtów (z przesunięcia 0x63)
- Jeśli sygnatura metody jest nieznana (z przesunięć 0x42 i 0x5D)

| Przesunięcie | Kod operacyjny | Stos                                                                     |
| -----------: | -------------- | ------------------------------------------------------------------------ |
|           7C | JUMPDEST       |                                                                          |
|           7D | PUSH1 0x00     | 0x00                                                                     |
|           7F | PUSH2 0x009d   | 0x9D 0x00                                                                |
|           82 | PUSH1 0x03     | 0x03 0x9D 0x00                                                           |
|           84 | SLOAD          | Storage[3] 0x9D 0x00 |

To jest kolejna komórka pamięci, której nie mogłem znaleźć w żadnej transakcji, więc trudniej jest dowiedzieć się, co ona oznacza. Poniższy kod wyjaśni to.

| Przesunięcie | Kod operacyjny                                    | Stos                                                                                                                                                |
| -----------: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
|           85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|           9A | AND                                               | Storage[3]-as-address 0x9D 0x00                                                                 |

Te kody operacyjne obcinają wartość, którą odczytujemy z Storage[3] do 160 bitów, czyli długości adresu Ethereum.

| Przesunięcie | Kod operacyjny | Stos                                                                                |
| -----------: | -------------- | ----------------------------------------------------------------------------------- |
|           9B | SWAP1          | 0x9D Storage[3]-as-address 0x00 |
|           9C | JUMP           | Storage[3]-as-address 0x00      |

Ten skok jest zbędny, ponieważ przechodzimy do następnego kodu operacyjnego. Ten kod nie jest tak wydajny pod względem zużycia gazu, jak mógłby być.

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                    |
| -----------: | -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
|           9D | JUMPDEST       | Storage[3]-as-address 0x00                                                          |
|           9E | SWAP1          | 0x00 Storage[3]-as-address                                                          |
|           9F | POP            | Storage[3]-as-address                                                               |
|           A0 | PUSH1 0x40     | 0x40 Storage[3]-as-address                                                          |
|           A2 | MLOAD          | Mem[0x40] Storage[3]-as-address |

Na samym początku kodu ustawiliśmy Mem[0x40] na 0x80. Jeśli spojrzymy na 0x40 później, zobaczymy, że go nie zmieniamy – więc możemy założyć, że jest to 0x80.

| Przesunięcie | Kod operacyjny | Stos                                                                                                  |
| -----------: | -------------- | ----------------------------------------------------------------------------------------------------- |
|           A3 | CALLDATASIZE   | CALLDATASIZE 0x80 Storage[3]-as-address           |
|           A4 | PUSH1 0x00     | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|           A6 | DUP3           | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|           A7 | CALLDATACOPY   | 0x80 Storage[3]-as-address                        |

Skopiuj wszystkie dane wywołania do pamięci, zaczynając od 0x80.

| Przesunięcie | Kod operacyjny                     | Stos                                                                                                                                                                                     |
| -----------: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|           A8 | PUSH1 0x00                         | 0x00 0x80 Storage[3]-as-address                                                                                                      |
|           AA | DUP1                               | 0x00 0x00 0x80 Storage[3]-as-address                                                                                                 |
|           AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                                    |
|           AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                               |
|           AD | DUP6                               | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|           AE | GAS                                | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|           AF | DELEGATE_CALL |                                                                                                                                                                                          |

Teraz wszystko jest znacznie jaśniejsze. Ten kontrakt może działać jako [proxy](https://blog.openzeppelin.com/proxy-patterns/), wywołując adres w Storage[3] w celu wykonania prawdziwej pracy. `DELEGATE_CALL` wywołuje oddzielny kontrakt, ale pozostaje w tej samej pamięci masowej (storage). Oznacza to, że delegowany kontrakt, dla którego jesteśmy proxy, ma dostęp do tej samej przestrzeni pamięci masowej (storage). Parametry wywołania to:

- _Gaz_: Cały pozostały gaz
- _Wywołany adres_: Storage[3]-as-address
- _Dane wywołania_: Bajty CALLDATASIZE zaczynające się od 0x80, gdzie umieściliśmy oryginalne dane wywołania
- _Dane zwrotne_: Brak (0x00 - 0x00) Dane zwrotne uzyskamy w inny sposób (patrz niżej)

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                                                                                       |
| -----------: | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|           B0 | RETURNDATASIZE | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |
|           B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address           |
|           B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|           B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|           B5 | RETURNDATACOPY | RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                          |

Tutaj kopiujemy wszystkie dane zwrotne do bufora pamięci, zaczynając od 0x80.

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                                                                                                                                                                                                                                        |
| -----------: | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|           B6 | DUP2           | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                                       |
|           B7 | DUP1           | (((call success/failure))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address   |
|           B8 | ISZERO         | (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|           B9 | PUSH2 0x00c0   | 0xC0 (((did the call fail))) (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|           BC | JUMPI          | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                                       |
|           BD | DUP2           | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                        |
|           BE | DUP5           | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                                                                   |
|           BF | RETURN         |                                                                                                                                                                                                                                                                                                                                                             |

Więc po wywołaniu kopiujemy dane zwrotne do bufora 0x80 - 0x80+RETURNDATASIZE, a jeśli wywołanie się powiedzie, to `RETURN` z dokładnie tym buforem.

### DELEGATECALL Nie powiodło się {#delegatecall-failed}

Jeśli dotrzemy tutaj, do 0xC0, oznacza to, że wywołany kontrakt został wycofany. Ponieważ jesteśmy tylko proxy dla tego kontraktu, chcemy zwrócić te same dane, a także cofnąć operację.

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                                                                                                                                                                      |
| -----------: | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|           C0 | JUMPDEST       | (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address                     |
|           C1 | DUP2           | RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address      |
|           C2 | DUP5           | 0x80 RETURNDATASIZE (((call success/failure))) RETURNDATASIZE (((call success/failure))) 0x80 Storage[3]-as-address |
|           C3 | REVERT         |                                                                                                                                                                                                                                                                                           |

Więc `REVERT` z tym samym buforem, którego użyliśmy wcześniej dla `RETURN`: 0x80 - 0x80+RETURNDATASIZE

![Schemat blokowy wywołania do proxy](flowchart-proxy.png)

## Wywołania ABI {#abi-calls}

Jeśli rozmiar danych wywołania wynosi cztery bajty lub więcej, może to być prawidłowe wywołanie ABI.

| Przesunięcie | Kod operacyjny | Stos                                                                                                                               |
| -----------: | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
|            D | PUSH1 0x00     | 0x00                                                                                                                               |
|            F | CALLDATALOAD   | (((Pierwsze słowo (256 bitów) danych wywołania)))      |
|           10 | PUSH1 0xe0     | 0xE0 (((Pierwsze słowo (256 bitów) danych wywołania))) |
|           12 | SHR            | (((pierwsze 32 bity (4 bajty) danych wywołania)))      |

Etherscan informuje nas, że `1C` to nieznany kod operacyjny, ponieważ [został dodany po tym, jak Etherscan napisał tę funkcję](https://eips.ethereum.org/EIPS/eip-145), a oni go nie zaktualizowali. [Aktualna tabela kodów operacyjnych](https://github.com/wolflo/evm-opcodes) pokazuje, że jest to przesunięcie w prawo

| Przesunięcie | Kod operacyjny   | Stos                                                                                                                                                                                                                                                                   |
| -----------: | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|           13 | DUP1             | (((pierwsze 32 bity (4 bajty) danych wywołania))) (((pierwsze 32 bity (4 bajty) danych wywołania)))            |
|           14 | PUSH4 0x3cd8045e | 0x3CD8045E (((pierwsze 32 bity (4 bajty) danych wywołania))) (((pierwsze 32 bity (4 bajty) danych wywołania))) |
|           19 | GT               | 0x3CD8045E>pierwsze-32-bity-danych-wywołania (((pierwsze 32 bity (4 bajty) danych wywołania)))                                                                                             |
|           1A | PUSH2 0x0043     | 0x43 0x3CD8045E>pierwsze-32-bity-danych-wywołania (((pierwsze 32 bity (4 bajty) danych wywołania)))                                                                                        |
|           1D | JUMPI            | (((pierwsze 32 bity (4 bajty) danych wywołania)))                                                                                                                                          |

Podzielenie testów dopasowania sygnatury metody na dwie części w ten sposób oszczędza średnio połowę testów. Kod, który bezpośrednio następuje po tym, oraz kod w 0x43, mają ten sam wzorzec: `DUP1` pierwszych 32 bitów danych wywołania, `PUSH4 (((sygnatura metody>`, uruchom `EQ`, aby sprawdzić równość, a następnie `JUMPI`, jeśli sygnatura metody pasuje. Oto sygnatury metod, ich adresy oraz, jeśli jest znana, [odpowiadająca im definicja metody](https://www.4byte.directory/):

| Metoda                                                                                                    | Sygnatura metody | Przesunięcie do skoku |
| --------------------------------------------------------------------------------------------------------- | ---------------- | --------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103                |
| ???                                                                                                       | 0x81e580d3       | 0x0138                |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158                |
| ???                                                                                                       | 0x1f135823       | 0x00C4                |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED                |

Jeśli nie zostanie znalezione dopasowanie, kod przeskakuje do [procedury obsługi proxy w 0x7C](#the-handler-at-0x7c), w nadziei, że kontrakt, dla którego jesteśmy proxy, ma dopasowanie.

![Schemat blokowy wywołań ABI](flowchart-abi.png)

## splitter() {#splitter}

| Przesunięcie | Kod operacyjny | Stos                          |
| -----------: | -------------- | ----------------------------- |
|          103 | JUMPDEST       |                               |
|          104 | CALLVALUE      | CALLVALUE                     |
|          105 | DUP1           | CALLVALUE CALLVALUE           |
|          106 | ISZERO         | CALLVALUE==0 CALLVALUE        |
|          107 | PUSH2 0x010f   | 0x010F CALLVALUE==0 CALLVALUE |
|          10A | JUMPI          | CALLVALUE                     |
|          10B | PUSH1 0x00     | 0x00 CALLVALUE                |
|          10D | DUP1           | 0x00 0x00 CALLVALUE           |
|          10E | REVERT         |                               |

Pierwszą rzeczą, jaką robi ta funkcja, jest sprawdzenie, czy wywołanie nie wysłało żadnego ETH. Ta funkcja nie jest [`płatna`](https://solidity-by-example.org/payable/). Jeśli ktoś wysłał nam ETH, to musi być pomyłka i chcemy `REVERT`, aby uniknąć posiadania tego ETH tam, gdzie nie mogą go odzyskać.

| Przesunięcie | Kod operacyjny                                    | Stos                                                                                                                                                                                                                                      |
| -----------: | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          10F | JUMPDEST                                          |                                                                                                                                                                                                                                           |
|          110 | POP                                               |                                                                                                                                                                                                                                           |
|          111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                                      |
|          113 | SLOAD                                             | (((Storage[3] inaczej kontrakt, dla którego jesteśmy proxy)))                                                                |
|          114 | PUSH1 0x40                                        | 0x40 (((Storage[3] inaczej kontrakt, dla którego jesteśmy proxy)))                                                           |
|          116 | MLOAD                                             | 0x80 (((Storage[3] inaczej kontrakt, dla którego jesteśmy proxy)))                                                           |
|          117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] inaczej kontrakt, dla którego jesteśmy proxy))) |
|          12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] inaczej kontrakt, dla którego jesteśmy proxy))) |
|          12D | SWAP2                                             | (((Storage[3] inaczej kontrakt, dla którego jesteśmy proxy))) 0xFF...FF 0x80 |
|          12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                                                            |
|          12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                                                       |
|          130 | MSTORE                                            | 0x80                                                                                                                                                                                                                                      |

A 0x80 zawiera teraz adres proxy

| Przesunięcie | Kod operacyjny | Stos      |
| -----------: | -------------- | --------- |
|          131 | PUSH1 0x20     | 0x20 0x80 |
|          133 | ADD            | 0xA0      |
|          134 | PUSH2 0x00e4   | 0xE4 0xA0 |
|          137 | JUMP           | 0xA0      |

### Kod E4 {#the-e4-code}

Po raz pierwszy widzimy te linie, ale są one współdzielone z innymi metodami (patrz niżej). Więc nazwiemy wartość na stosie X i po prostu zapamiętamy, że w `splitter()` wartość tego X to 0xA0.

| Przesunięcie | Kod operacyjny | Stos        |
| -----------: | -------------- | ----------- |
|           E4 | JUMPDEST       | X           |
|           E5 | PUSH1 0x40     | 0x40 X      |
|           E7 | MLOAD          | 0x80 X      |
|           E8 | DUP1           | 0x80 0x80 X |
|           E9 | SWAP2          | X 0x80 0x80 |
|           EA | SUB            | X-0x80 0x80 |
|           EB | SWAP1          | 0x80 X-0x80 |
|           EC | RETURN         |             |

Tak więc ten kod otrzymuje wskaźnik pamięci na stosie (X) i powoduje, że kontrakt `RETURN` z buforem, który wynosi 0x80 - X.

W przypadku `splitter()` zwraca to adres, dla którego jesteśmy proxy. `RETURN` zwraca bufor w 0x80-0x9F, czyli tam, gdzie zapisaliśmy te dane (przesunięcie 0x130 powyżej).

## currentWindow() {#currentwindow}

Kod w przesunięciach 0x158-0x163 jest identyczny z tym, który widzieliśmy w 0x103-0x10E w `splitter()` (inny niż miejsce docelowe `JUMPI`), więc wiemy, że `currentWindow()` również nie jest `płatne`.

| Przesunięcie | Kod operacyjny | Stos                                                                     |
| -----------: | -------------- | ------------------------------------------------------------------------ |
|          164 | JUMPDEST       |                                                                          |
|          165 | POP            |                                                                          |
|          166 | PUSH2 0x00da   | 0xDA                                                                     |
|          169 | PUSH1 0x01     | 0x01 0xDA                                                                |
|          16B | SLOAD          | Storage[1] 0xDA      |
|          16C | DUP2           | 0xDA Storage[1] 0xDA |
|          16D | JUMP           | Storage[1] 0xDA      |

### Kod DA {#the-da-code}

Ten kod jest również współdzielony z innymi metodami. Więc nazwiemy wartość na stosie Y i po prostu zapamiętamy, że w `currentWindow()` wartość tego Y to Storage[1].

| Przesunięcie | Kod operacyjny | Stos             |
| -----------: | -------------- | ---------------- |
|           DA | JUMPDEST       | Y 0xDA           |
|           DB | PUSH1 0x40     | 0x40 Y 0xDA      |
|           DD | MLOAD          | 0x80 Y 0xDA      |
|           DE | SWAP1          | Y 0x80 0xDA      |
|           DF | DUP2           | 0x80 Y 0x80 0xDA |
|           E0 | MSTORE         | 0x80 0xDA        |

Zapisz Y do 0x80-0x9F.

| Przesunięcie | Kod operacyjny | Stos           |
| -----------: | -------------- | -------------- |
|           E1 | PUSH1 0x20     | 0x20 0x80 0xDA |
|           E3 | ADD            | 0xA0 0xDA      |

A reszta jest już wyjaśniona [powyżej](#the-e4-code). Tak więc skoki do 0xDA zapisują szczyt stosu (Y) do 0x80-0x9F i zwracają tę wartość. W przypadku `currentWindow()` zwraca Storage[1].

## merkleRoot() {#merkleroot}

Kod w przesunięciach 0xED-0xF8 jest identyczny z tym, który widzieliśmy w 0x103-0x10E w `splitter()` (inny niż miejsce docelowe `JUMPI`), więc wiemy, że `merkleRoot()` również nie jest `płatny`.

| Przesunięcie | Kod operacyjny | Stos                                                                     |
| -----------: | -------------- | ------------------------------------------------------------------------ |
|           F9 | JUMPDEST       |                                                                          |
|           FA | POP            |                                                                          |
|           FB | PUSH2 0x00da   | 0xDA                                                                     |
|           FE | PUSH1 0x00     | 0x00 0xDA                                                                |
|          100 | SLOAD          | Storage[0] 0xDA      |
|          101 | DUP2           | 0xDA Storage[0] 0xDA |
|          102 | JUMP           | Storage[0] 0xDA      |

Co dzieje się po skoku, [już ustaliliśmy](#the-da-code). Więc `merkleRoot()` zwraca Storage[0].

## 0x81e580d3 {#0x81e580d3}

Kod w przesunięciach 0x138-0x143 jest identyczny z tym, który widzieliśmy w 0x103-0x10E w `splitter()` (inny niż miejsce docelowe `JUMPI`), więc wiemy, że ta funkcja również nie jest `płatna`.

| Przesunięcie | Kod operacyjny | Stos                                                                            |
| -----------: | -------------- | ------------------------------------------------------------------------------- |
|          144 | JUMPDEST       |                                                                                 |
|          145 | POP            |                                                                                 |
|          146 | PUSH2 0x00da   | 0xDA                                                                            |
|          149 | PUSH2 0x0153   | 0x0153 0xDA                                                                     |
|          14C | CALLDATASIZE   | CALLDATASIZE 0x0153 0xDA                                                        |
|          14D | PUSH1 0x04     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|          14F | PUSH2 0x018f   | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|          152 | JUMP           | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|          18F | JUMPDEST       | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|          190 | PUSH1 0x00     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
|          192 | PUSH1 0x20     | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
|          194 | DUP3           | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
|          195 | DUP5           | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
|          196 | SUB            | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|          197 | SLT            | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|          198 | ISZERO         | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|          199 | PUSH2 0x01a0   | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
|          19C | JUMPI          | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

Wygląda na to, że ta funkcja przyjmuje co najmniej 32 bajty (jedno słowo) danych wywołania.

| Przesunięcie | Kod operacyjny | Stos                                         |
| -----------: | -------------- | -------------------------------------------- |
|          19D | DUP1           | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|          19E | DUP2           | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|          19F | REVERT         |                                              |

Jeśli nie otrzyma danych wywołania, transakcja zostanie wycofana bez żadnych danych zwrotnych.

Zobaczmy, co się stanie, jeśli funkcja _otrzyma_ potrzebne dane wywołania.

| Przesunięcie | Kod operacyjny | Stos                                                        |
| -----------: | -------------- | ----------------------------------------------------------- |
|          1A0 | JUMPDEST       | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|          1A1 | POP            | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|          1A2 | CALLDATALOAD   | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` to pierwsze słowo danych wywołania _po_ sygnaturze metody

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                                                                                                 |
| -----------: | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          1A3 | SWAP2          | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                          |
|          1A4 | SWAP1          | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                          |
|          1A5 | POP            | 0x0153 calldataload(4) 0xDA                                                                                                                                                                       |
|          1A6 | JUMP           | calldataload(4) 0xDA                                                                                                                                                                              |
|          153 | JUMPDEST       | calldataload(4) 0xDA                                                                                                                                                                              |
|          154 | PUSH2 0x016e   | 0x016E calldataload(4) 0xDA                                                                                                                                                                       |
|          157 | JUMP           | calldataload(4) 0xDA                                                                                                                                                                              |
|          16E | JUMPDEST       | calldataload(4) 0xDA                                                                                                                                                                              |
|          16F | PUSH1 0x04     | 0x04 calldataload(4) 0xDA                                                                                                                                                                         |
|          171 | DUP2           | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |
|          172 | DUP2           | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                 |
|          173 | SLOAD          | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
|          174 | DUP2           | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|          175 | LT             | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|          176 | PUSH2 0x017e   | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|          179 | JUMPI          | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |

Jeśli pierwsze słowo nie jest mniejsze niż Storage[4], funkcja kończy się niepowodzeniem. Wycofuje się bez żadnej zwróconej wartości:

| Przesunięcie | Kod operacyjny | Stos                                                          |
| -----------: | -------------- | ------------------------------------------------------------- |
|          17A | PUSH1 0x00     | 0x00 ...      |
|          17C | DUP1           | 0x00 0x00 ... |
|          17D | REVERT         |                                                               |

Jeśli calldataload(4) jest mniejsze niż Storage[4], otrzymujemy ten kod:

| Przesunięcie | Kod operacyjny | Stos                                                                                      |
| -----------: | -------------- | ----------------------------------------------------------------------------------------- |
|          17E | JUMPDEST       | calldataload(4) 0x04 calldataload(4) 0xDA           |
|          17F | PUSH1 0x00     | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|          181 | SWAP2          | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|          182 | DUP3           | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|          183 | MSTORE         | calldataload(4) 0x00 calldataload(4) 0xDA           |

A lokalizacje pamięci 0x00-0x1F zawierają teraz dane 0x04 (0x00-0x1E to same zera, 0x1F to cztery)

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                                                                                                      |
| -----------: | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          184 | PUSH1 0x20     | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                      |
|          186 | SWAP1          | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                      |
|          187 | SWAP2          | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                      |
|          188 | SHA3           | (((SHA3 z 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                |
|          189 | ADD            | (((SHA3 z 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                |
|          18A | SLOAD          | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Więc w pamięci masowej (storage) znajduje się tabela przeglądowa, która zaczyna się od SHA3 z 0x000...0004 i ma wpis dla każdej legalnej wartości danych wywołania (wartość poniżej Storage[4]).

| Przesunięcie | Kod operacyjny | Stos                                                                                                                                                                                                                      |
| -----------: | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          18B | SWAP1          | calldataload(4) Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA |
|          18C | POP            | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|          18D | DUP2           | 0xDA Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|          18E | JUMP           | Storage[(((SHA3 z 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

Wiemy już, co robi [kod przy przesunięciu 0xDA](#the-da-code), zwraca on wartość szczytu stosu do wywołującego. Więc ta funkcja zwraca wartość z tabeli przeglądowej do wywołującego.

## 0x1f135823 {#0x1f135823}

Kod w przesunięciach 0xC4-0xCF jest identyczny z tym, który widzieliśmy w 0x103-0x10E w `splitter()` (inny niż miejsce docelowe `JUMPI`), więc wiemy, że ta funkcja również nie jest `płatna`.

| Przesunięcie | Kod operacyjny | Stos              |
| -----------: | -------------- | ----------------- |
|           D0 | JUMPDEST       |                   |
|           D1 | POP            |                   |
|           D2 | PUSH2 0x00da   | 0xDA              |
|           D5 | PUSH1 0x06     | 0x06 0xDA         |
|           D7 | SLOAD          | Value\* 0xDA      |
|           D8 | DUP2           | 0xDA Value\* 0xDA |
|           D9 | JUMP           | Value\* 0xDA      |

Wiemy już, co robi [kod przy przesunięciu 0xDA](#the-da-code), zwraca on wartość szczytu stosu do wywołującego. Tak więc ta funkcja zwraca `Value*`.

### Podsumowanie metody {#method-summary}

Czy czujesz, że rozumiesz kontrakt w tym momencie? Ja nie. Do tej pory mamy te metody:

| Metoda                                               | Znaczenie                                                                                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Przelew                                              | Zaakceptuj wartość podaną przez wywołanie i zwiększ `Value*` o tę kwotę                                                                         |
| [splitter()](#splitter)           | Zwróć Storage[3], adres proxy                                                               |
| [currentWindow()](#currentwindow) | Zwróć Storage[1]                                                                            |
| [merkleRoot()](#merkeroot)        | Zwróć Storage[0]                                                                            |
| [0x81e580d3](#0x81e580d3)                            | Zwróć wartość z tabeli przeglądowej, pod warunkiem że parametr jest mniejszy niż Storage[4] |
| [0x1f135823](#0x1f135823)                            | Zwróć Storage[6], inaczej Wartość\*                                                         |

Ale wiemy, że każda inna funkcjonalność jest dostarczana przez kontrakt w Storage[3]. Może gdybyśmy wiedzieli, czym jest ten kontrakt, dałoby nam to jakąś wskazówkę. Na szczęście to jest blockchain i wszystko jest znane, przynajmniej w teorii. Nie widzieliśmy żadnych metod, które ustawiają Storage[3], więc musiało to zostać ustawione przez konstruktor.

## Konstruktor {#the-constructor}

Kiedy [patrzymy na kontrakt](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), możemy również zobaczyć transakcję, która go stworzyła.

![Kliknij transakcję tworzenia](create-tx.png)

Jeśli klikniemy tę transakcję, a następnie kartę **Stan**, możemy zobaczyć początkowe wartości parametrów. W szczególności możemy zobaczyć, że Storage[3] zawiera [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Ten kontrakt musi zawierać brakującą funkcjonalność. Możemy go zrozumieć, używając tych samych narzędzi, których użyliśmy do badania kontraktu.

## Kontrakt proxy {#the-proxy-contract}

Używając tych samych technik, co w przypadku oryginalnego kontraktu powyżej, możemy zobaczyć, że kontrakt cofa się, jeśli:

- Do wywołania dołączone jest jakiekolwiek ETH (0x05-0x0F)
- Rozmiar danych wywołania jest mniejszy niż cztery (0x10-0x19 i 0xBE-0xC2)

Oraz że metody, które obsługuje to:

| Metoda                                                                                                                                                                                 | Sygnatura metody             | Przesunięcie do skoku |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135                |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151                |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110                |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118                |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3                |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148                |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107                |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122                |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8                |

Możemy zignorować cztery dolne metody, ponieważ nigdy do nich nie dotrzemy. Ich sygnatury są takie, że nasz oryginalny kontrakt zajmuje się nimi sam (możesz kliknąć sygnatury, aby zobaczyć szczegóły powyżej), więc muszą to być [metody, które są nadpisywane](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Jedną z pozostałych metod jest `claim(<params>)`, a drugą `isClaimed(<params>)`, więc wygląda na to, że jest to kontrakt airdropu. Zamiast przechodzić przez resztę kod po kodzie, możemy [wypróbować dekompilator](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), który daje użyteczne wyniki dla trzech funkcji z tego kontraktu. Inżynieria odwrotna pozostałych jest pozostawiona jako ćwiczenie dla czytelnika.

### scaleAmountByPercentage {#scaleamountbypercentage}

Oto, co dekompilator daje nam dla tej funkcji:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Pierwsze `require` sprawdza, czy dane wywołania mają, oprócz czterech bajtów sygnatury funkcji, co najmniej 64 bajty, wystarczające dla dwóch parametrów. Jeśli nie, to oczywiście coś jest nie tak.

Instrukcja `if` wydaje się sprawdzać, czy `_param1` nie jest zerem i czy `_param1 * _param2` nie jest ujemne. Prawdopodobnie ma to na celu zapobieżenie przypadkom zawijania.

Na koniec funkcja zwraca przeskalowaną wartość.

### claim {#claim}

Kod, który tworzy dekompilator, jest złożony i nie cały jest dla nas istotny. Pominę niektóre z nich, aby skupić się na liniach, które moim zdaniem dostarczają przydatnych informacji

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'nie można odebrać nagrody za przyszłe okno'
```

Widzimy tutaj dwie ważne rzeczy:

- `_param2`, chociaż jest zadeklarowany jako `uint256`, jest w rzeczywistości adresem
- `_param1` to okno, za które odbierana jest nagroda, które musi być `currentWindow` lub wcześniejsze.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Konto już odebrało nagrodę za dane okno'
```

Więc teraz wiemy, że Storage[5] to tablica okien i adresów oraz tego, czy adres odebrał nagrodę za to okno.

```python
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Nieprawidłowy dowód'
```

Wiemy, że `unknown2eb4a7ab` to w rzeczywistości funkcja `merkleRoot()`, więc ten kod wygląda, jakby weryfikował [dowód Merkle'a](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Oznacza to, że `_param4` jest dowodem Merkle'a.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

W ten sposób kontrakt przekazuje własne ETH na inny adres (kontrakt lub konto zewnętrzne). Wywołuje go z wartością, która jest kwotą do przeniesienia. Wygląda więc na to, że jest to airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Dwie dolne linie mówią nam, że Storage[2] to również kontrakt, który wywołujemy. Jeśli [spojrzymy na transakcję konstruktora](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), zobaczymy, że ten kontrakt to [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), kontrakt Wrapped Ether, [którego kod źródłowy został przesłany do Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Wygląda więc na to, że kontrakty próbują wysłać ETH do `_param2`. Jeśli może to zrobić, świetnie. Jeśli nie, próbuje wysłać [WETH](https://weth.tkn.eth.limo/). Jeśli `_param2` to konto zewnętrzne (EOA), zawsze może ono otrzymywać ETH, ale kontrakty mogą odmawiać przyjmowania ETH. Jednak WETH jest ERC-20 i kontrakty nie mogą odmówić jego przyjęcia.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Na końcu funkcji widzimy, że generowany jest wpis w dzienniku. [Spójrz na wygenerowane wpisy w dzienniku](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) i przefiltruj według tematu, który zaczyna się od `0xdbd5...`. Jeśli [klikniemy jedną z transakcji, która wygenerowała taki wpis](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), zobaczymy, że rzeczywiście wygląda to na odebranie nagrody – konto wysłało wiadomość do kontraktu, którego inżynierię odwrotną przeprowadzamy, a w zamian otrzymało ETH.

![Transakcja odebrania nagrody](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Ta funkcja jest bardzo podobna do [`claim`](#claim) powyżej. Sprawdza również dowód Merkle'a, próbuje przenieść ETH do pierwszego i tworzy ten sam typ wpisu w dzienniku.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Nieprawidłowy dowód'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Główna różnica polega na tym, że nie ma tam pierwszego parametru, czyli okna do wypłaty. Zamiast tego istnieje pętla obejmująca wszystkie okna, za które można odebrać nagrodę.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Wygląda więc na wariant `claim`, który odbiera nagrody za wszystkie okna.

## Wnioski {#conclusion}

Teraz powinieneś już wiedzieć, jak rozumieć kontrakty, których kod źródłowy nie jest dostępny, używając albo kodów operacyjnych, albo (gdy to działa) dekompilatora. Jak widać po długości tego artykułu, inżynieria odwrotna kontraktu nie jest trywialna, ale w systemie, w którym bezpieczeństwo jest kluczowe, ważną umiejętnością jest możliwość weryfikacji, czy kontrakty działają zgodnie z obietnicą.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
