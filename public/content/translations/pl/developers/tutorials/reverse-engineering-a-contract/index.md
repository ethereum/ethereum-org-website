---
title: "Inżynieria wsteczna kontraktu"
description: Jak zrozumieć kontrakt, gdy nie masz kodu źródłowego
author: Ori Pomerantz
lang: pl
tags: ["evm", "kody operacji"]
skill: advanced
breadcrumb: Inżynieria wsteczna
published: 2021-12-30
---
## Wprowadzenie {#introduction}

_Na blockchainie nie ma tajemnic_, wszystko, co się dzieje, jest spójne, weryfikowalne i publicznie dostępne. W idealnym przypadku [kontrakty powinny mieć swój kod źródłowy opublikowany i zweryfikowany w Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Jednak [nie zawsze tak jest](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). W tym artykule dowiesz się, jak przeprowadzić inżynierię wsteczną kontraktów, analizując kontrakt bez kodu źródłowego, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Istnieją dekompilatory, ale nie zawsze generują one [użyteczne wyniki](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). W tym artykule dowiesz się, jak ręcznie przeprowadzić inżynierię wsteczną i zrozumieć kontrakt na podstawie [kodów operacji](https://github.com/wolflo/evm-opcodes), a także jak interpretować wyniki działania dekompilatora.

Aby zrozumieć ten artykuł, powinieneś już znać podstawy EVM i być przynajmniej trochę zaznajomiony z asemblerem EVM. [Możesz przeczytać o tych tematach tutaj](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Przygotowanie kodu wykonywalnego {#prepare-the-executable-code}

Kody operacji możesz uzyskać, przechodząc do Etherscan dla danego kontraktu, klikając zakładkę **Contract**, a następnie **Switch to Opcodes View**. Otrzymasz widok, w którym w każdym wierszu znajduje się jeden kod operacji.

![Opcode View from Etherscan](opcode-view.png)

Aby jednak móc zrozumieć skoki, musisz wiedzieć, gdzie w kodzie znajduje się każdy kod operacji. Jednym ze sposobów, aby to zrobić, jest otwarcie Arkusza Google i wklejenie kodów operacji w kolumnie C. [Możesz pominąć poniższe kroki, tworząc kopię tego już przygotowanego arkusza kalkulacyjnego](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Kolejnym krokiem jest uzyskanie prawidłowych lokalizacji w kodzie, abyśmy mogli zrozumieć skoki. Rozmiar kodu operacji umieścimy w kolumnie B, a lokalizację (w systemie szesnastkowym) w kolumnie A. Wpisz tę funkcję w komórce `B1`, a następnie skopiuj ją i wklej do reszty kolumny B, aż do końca kodu. Po wykonaniu tej czynności możesz ukryć kolumnę B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Najpierw ta funkcja dodaje jeden bajt dla samego kodu operacji, a następnie szuka `PUSH`. Kody operacji PUSH są wyjątkowe, ponieważ muszą mieć dodatkowe bajty dla odkładanej wartości. Jeśli kodem operacji jest `PUSH`, wyodrębniamy liczbę bajtów i ją dodajemy.

W `A1` wpisz pierwsze przesunięcie, czyli zero. Następnie w `A2` wpisz tę funkcję i ponownie skopiuj ją i wklej do reszty kolumny A:

```
=dec2hex(hex2dec(A1)+B1)
```

Potrzebujemy tej funkcji, aby uzyskać wartość szesnastkową, ponieważ wartości, które są odkładane przed skokami (`JUMP` i `JUMPI`), są podawane w systemie szesnastkowym.

## Punkt wejścia (0x00) {#the-entry-point-0x00}

Kontrakty są zawsze wykonywane od pierwszego bajtu. Oto początkowa część kodu:

| Przesunięcie | Kod operacji | Stos (po kodzie operacji) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Pusty                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Pusty                    |

Ten kod robi dwie rzeczy:

1. Zapisuje 0x80 jako 32-bajtową wartość w lokalizacjach pamięci 0x40-0x5F (0x80 jest przechowywane w 0x5F, a 0x40-0x5E to same zera).
2. Odczytuje rozmiar danych wywołania. Zazwyczaj dane wywołania dla kontraktu Ethereum są zgodne z [ABI (interfejsem binarnym aplikacji)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), co wymaga co najmniej czterech bajtów dla selektora funkcji. Jeśli rozmiar danych wywołania jest mniejszy niż cztery, następuje skok do 0x5E.

![Flowchart for this portion](flowchart-entry.png)

### Procedura obsługi pod adresem 0x5E (dla danych wywołania niezgodnych z ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Przesunięcie | Kod operacji |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Ten fragment zaczyna się od `JUMPDEST`. Programy EVM (wirtualnej maszyny Ethereum) zgłaszają wyjątek, jeśli wykonasz skok do kodu operacji, który nie jest `JUMPDEST`. Następnie sprawdza CALLDATASIZE i jeśli jest to „prawda” (czyli nie zero), skacze do 0x7C. Dojdziemy do tego poniżej.

| Przesunięcie | Kod operacji | Stos (po kodzie operacji)                                                  |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) dostarczone przez wywołanie. Nazywane `msg.value` w Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Więc kiedy nie ma danych wywołania, odczytujemy wartość Storage[6]. Jeszcze nie wiemy, jaka to wartość, ale możemy poszukać transakcji, które kontrakt otrzymał bez danych wywołania. Transakcje, które po prostu transferują ETH bez żadnych danych wywołania (a zatem bez metody), mają w Etherscan metodę `Transfer`. W rzeczywistości [pierwsza transakcja, jaką otrzymał kontrakt](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7), to transfer.

Jeśli spojrzymy na tę transakcję i klikniemy **Click to see More**, zobaczymy, że dane wywołania, nazywane danymi wejściowymi (input data), są rzeczywiście puste (`0x`). Zauważ również, że wartość wynosi 1.559 ETH, co będzie miało znaczenie później.

![The call data is empty](calldata-empty.png)

Następnie kliknij zakładkę **State** i rozwiń kontrakt, który poddajemy inżynierii wstecznej (0x2510...). Możesz zobaczyć, że `Storage[6]` zmieniło się podczas transakcji, a jeśli zmienisz Hex na **Number**, zobaczysz, że stało się 1,559,000,000,000,000,000, czyli wartością przetransferowaną w wei (dodałem przecinki dla jasności), odpowiadającą kolejnej wartości kontraktu.

![Zmiana w Storage[6]](storage6.png)

Jeśli spojrzymy na zmiany stanu spowodowane przez [inne transakcje `Transfer` z tego samego okresu](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange), zobaczymy, że `Storage[6]` przez pewien czas śledziło wartość kontraktu. Na razie nazwiemy to `Value*`. Gwiazdka (`*`) przypomina nam, że jeszcze nie _wiemy_, co robi ta zmienna, ale nie może to być tylko śledzenie wartości kontraktu, ponieważ nie ma potrzeby używania pamięci (storage), która jest bardzo droga, gdy można uzyskać saldo konta za pomocą `ADDRESS BALANCE`. Pierwszy kod operacji odkłada na stos własny adres kontraktu. Drugi odczytuje adres na szczycie stosu i zastępuje go saldem tego adresu.

| Przesunięcie | Kod operacji | Stos                                        |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Będziemy kontynuować śledzenie tego kodu w miejscu docelowym skoku.

| Przesunięcie | Kod operacji | Stos                                                        |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` jest operacją bitową, więc odwraca wartość każdego bitu w wartości wywołania.

| Przesunięcie | Kod operacji | Stos                                                                        |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Skaczemy, jeśli `Value*` jest mniejsze niż 2^256-CALLVALUE-1 lub równe tej wartości. Wygląda to na logikę zapobiegającą przepełnieniu (overflow). I rzeczywiście, widzimy, że po kilku bezsensownych operacjach (na przykład zapis do pamięci zaraz zostanie usunięty) pod przesunięciem 0x01DE kontrakt zostaje wycofany, jeśli wykryte zostanie przepełnienie, co jest normalnym zachowaniem.

Zauważ, że takie przepełnienie jest niezwykle mało prawdopodobne, ponieważ wymagałoby, aby wartość wywołania plus `Value*` była porównywalna do 2^256 wei, czyli około 10^59 ETH. [Całkowita podaż ETH w momencie pisania tego tekstu wynosi mniej niż dwieście milionów](https://etherscan.io/stat/supply).

| Przesunięcie | Kod operacji | Stos                                      |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Jeśli dotarliśmy tutaj, pobieramy `Value* + CALLVALUE` i skaczemy do przesunięcia 0x75.

| Przesunięcie | Kod operacji | Stos                            |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Jeśli dotrzemy tutaj (co wymaga, aby dane wywołania były puste), dodajemy do `Value*` wartość wywołania. Jest to spójne z tym, co mówimy o działaniu transakcji `Transfer`.

| Przesunięcie | Kod operacji |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Na koniec czyścimy stos (co nie jest konieczne) i sygnalizujemy pomyślne zakończenie transakcji.

Podsumowując, oto schemat blokowy dla początkowego kodu.

![Entry point flowchart](flowchart-entry.png)

## Handler pod adresem 0x7C {#the-handler-at-0x7c}

Celowo nie umieściłem w nagłówku informacji o tym, co robi ten handler. Nie chodzi o to, aby nauczyć Cię, jak działa ten konkretny kontrakt, ale jak odtwarzać kod źródłowy kontraktów (inżynieria wsteczna). Dowiesz się, co on robi, w ten sam sposób co ja, śledząc kod.

Trafiamy tutaj z kilku miejsc:

- Jeśli dane wywołania mają 1, 2 lub 3 bajty (od przesunięcia 0x63)
- Jeśli podpis metody jest nieznany (od przesunięć 0x42 i 0x5D)

| Przesunięcie | Kod operacji | Stos                 |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

To kolejna komórka pamięci (storage), której nie mogłem znaleźć w żadnych transakcjach, więc trudniej jest określić, co oznacza. Poniższy kod to rozjaśni.

| Przesunięcie | Kod operacji                                      | Stos                            |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-jako-adres 0x9D 0x00 |

Te kody operacji obcinają wartość odczytaną ze Storage[3] do 160 bitów, czyli długości adresu Ethereum.

| Przesunięcie | Kod operacji | Stos                            |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-jako-adres 0x00 |
|     9C | JUMP   | Storage[3]-jako-adres 0x00      |

Ten skok jest zbędny, ponieważ i tak przechodzimy do następnego kodu operacji. Ten kod nie jest tak zoptymalizowany pod kątem zużycia gazu, jak mógłby być.

| Przesunięcie | Kod operacji | Stos                            |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-jako-adres 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-jako-adres      |
|     9F | POP        | Storage[3]-jako-adres           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-jako-adres      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-jako-adres |

Na samym początku kodu ustawiliśmy Mem[0x40] na 0x80. Jeśli poszukamy 0x40 później, zobaczymy, że go nie zmieniamy – możemy więc założyć, że wynosi 0x80.

| Przesunięcie | Kod operacji | Stos                                              |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-jako-adres           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-jako-adres      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-jako-adres |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-jako-adres                        |

Kopiuje wszystkie dane wywołania do pamięci, zaczynając od 0x80.

| Przesunięcie | Kod operacji  | Stos                                                                             |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-jako-adres                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-jako-adres                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adres                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adres                           |
|     AD | DUP6          | Storage[3]-jako-adres 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adres     |
|     AE | GAS           | GAS Storage[3]-jako-adres 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-jako-adres |
|     AF | DELEGATE_CALL |

Teraz wszystko jest o wiele jaśniejsze. Ten kontrakt może działać jako [kontrakt proxy](https://blog.openzeppelin.com/proxy-patterns/), wywołując adres w Storage[3], aby wykonać właściwą pracę. `DELEGATE_CALL` wywołuje oddzielny kontrakt, ale pozostaje w tej samej pamięci (storage). Oznacza to, że delegowany kontrakt, dla którego jesteśmy proxy, ma dostęp do tej samej przestrzeni pamięci. Parametry wywołania to:

- _Gaz_: Cały pozostały gaz
- _Wywoływany adres_: Storage[3]-jako-adres
- _Dane wywołania_: Bajty CALLDATASIZE zaczynające się od 0x80, czyli tam, gdzie umieściliśmy oryginalne dane wywołania
- _Dane zwrotne_: Brak (0x00 - 0x00) Dane zwrotne uzyskamy w inny sposób (patrz poniżej)

| Przesunięcie | Kod operacji   | Stos                                                                                          |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres                          |

Tutaj kopiujemy wszystkie dane zwrotne do bufora pamięci zaczynającego się od 0x80.

| Przesunięcie | Kod operacji | Stos                                                                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres                              |
|     B7 | DUP1         | (((sukces/niepowodzenie wywołania))) (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres   |
|     B8 | ISZERO       | (((czy wywołanie się nie powiodło))) (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((czy wywołanie się nie powiodło))) (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres |
|     BC | JUMPI        | (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres                              |
|     BD | DUP2         | RETURNDATASIZE (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres          |
|     BF | RETURN       |                                                                                                                              |

Zatem po wywołaniu kopiujemy dane zwrotne do bufora 0x80 - 0x80+RETURNDATASIZE, a jeśli wywołanie zakończy się sukcesem, wykonujemy `RETURN` z dokładnie tym buforem.

### Niepowodzenie DELEGATECALL {#delegatecall-failed}

Jeśli dotrzemy tutaj, do 0xC0, oznacza to, że wywołany przez nas kontrakt został wycofany. Ponieważ jesteśmy tylko kontraktem proxy dla tego kontraktu, chcemy zwrócić te same dane i również wycofać transakcję.

| Przesunięcie | Kod operacji | Stos                                                                                                                |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres                     |
|     C1 | DUP2     | RETURNDATASIZE (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((sukces/niepowodzenie wywołania))) RETURNDATASIZE (((sukces/niepowodzenie wywołania))) 0x80 Storage[3]-jako-adres |
|     C3 | REVERT   |

Więc wykonujemy `REVERT` z tym samym buforem, którego użyliśmy wcześniej dla `RETURN`: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## Wywołania ABI {#abi-calls}

Jeśli rozmiar danych wywołania wynosi cztery bajty lub więcej, może to być prawidłowe wywołanie ABI.

| Offset | Kod operacji | Stos                                                   |
| -----: | ------------ | ------------------------------------------------------ |
|      D | PUSH1 0x00   | 0x00                                                   |
|      F | CALLDATALOAD | (((Pierwsze słowo (256 bitów) danych wywołania)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Pierwsze słowo (256 bitów) danych wywołania))) |
|     12 | SHR          | (((pierwsze 32 bity (4 bajty) danych wywołania)))      |

Etherscan informuje nas, że `1C` to nieznany kod operacji, ponieważ [został dodany po tym, jak Etherscan napisał tę funkcję](https://eips.ethereum.org/EIPS/eip-145) i nie została ona zaktualizowana. [Aktualna tabela kodów operacji](https://github.com/wolflo/evm-opcodes) pokazuje nam, że jest to przesunięcie w prawo (shift right).

| Offset | Kod operacji     | Stos                                                                                                           |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((pierwsze 32 bity (4 bajty) danych wywołania))) (((pierwsze 32 bity (4 bajty) danych wywołania)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((pierwsze 32 bity (4 bajty) danych wywołania))) (((pierwsze 32 bity (4 bajty) danych wywołania))) |
|     19 | GT               | 0x3CD8045E>pierwsze-32-bity-danych-wywolania (((pierwsze 32 bity (4 bajty) danych wywołania)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>pierwsze-32-bity-danych-wywolania (((pierwsze 32 bity (4 bajty) danych wywołania)))            |
|     1D | JUMPI            | (((pierwsze 32 bity (4 bajty) danych wywołania)))                                                              |

Podział testów dopasowania podpisu metody na dwie części w ten sposób pozwala zaoszczędzić średnio połowę testów. Kod, który następuje bezpośrednio po tym, oraz kod w 0x43 podążają za tym samym wzorcem: `DUP1` pierwsze 32 bity danych wywołania, `PUSH4 (((method signature>`, wykonuje `EQ`, aby sprawdzić równość, a następnie `JUMPI`, jeśli podpis metody się zgadza. Oto podpisy metod, ich adresy oraz, jeśli jest znana, [odpowiadająca im definicja metody](https://www.4byte.directory/):

| Metoda                                                                                 | Podpis metody | Przesunięcie do skoku |
| -------------------------------------------------------------------------------------- | ------------- | --------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)                | 0x3cd8045e    | 0x0103                |
| ???                                                                                    | 0x81e580d3    | 0x0138                |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)           | 0xba0bafb4    | 0x0158                |
| ???                                                                                    | 0x1f135823    | 0x00C4                |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)               | 0x2eb4a7ab    | 0x00ED                |

Jeśli nie zostanie znalezione żadne dopasowanie, kod skacze do [obsługi proxy pod adresem 0x7C](#the-handler-at-0x7c) w nadziei, że kontrakt, dla którego jesteśmy proxy, ma dopasowanie.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Kod operacji | Stos                          |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

Pierwszą rzeczą, którą robi ta funkcja, jest sprawdzenie, czy wywołanie nie przesłało żadnego ETH. Ta funkcja nie jest [`payable`](https://solidity-by-example.org/payable/). Jeśli ktoś wysłał nam ETH, musi to być błąd, a my chcemy wykonać `REVERT`, aby uniknąć zablokowania tego ETH bez możliwości jego odzyskania.

| Offset | Kod operacji                                      | Stos                                                                        |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3], czyli kontrakt, dla którego jesteśmy proxy)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3], czyli kontrakt, dla którego jesteśmy proxy)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3], czyli kontrakt, dla którego jesteśmy proxy)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3], czyli kontrakt, dla którego jesteśmy proxy))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3], czyli kontrakt, dla którego jesteśmy proxy))) |
|    12D | SWAP2                                             | (((Storage[3], czyli kontrakt, dla którego jesteśmy proxy))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

A 0x80 zawiera teraz adres proxy

| Offset | Kod operacji | Stos      |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Kod E4 {#the-e4-code}

Widzimy te linie po raz pierwszy, ale są one współdzielone z innymi metodami (patrz poniżej). Nazwiemy więc wartość na stosie X i po prostu zapamiętamy, że w `splitter()` wartość tego X wynosi 0xA0.

| Offset | Kod operacji | Stos        |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Zatem ten kod otrzymuje wskaźnik pamięci na stosie (X) i powoduje, że kontrakt wykonuje `RETURN` z buforem wynoszącym 0x80 - X.

W przypadku `splitter()` zwraca to adres, dla którego jesteśmy proxy. `RETURN` zwraca bufor w zakresie 0x80-0x9F, czyli tam, gdzie zapisaliśmy te dane (offset 0x130 powyżej).

## currentWindow() {#currentwindow}

Kod w offsetach 0x158-0x163 jest identyczny z tym, co widzieliśmy w 0x103-0x10E w `splitter()` (poza miejscem docelowym `JUMPI`), więc wiemy, że `currentWindow()` również nie jest `payable`.

| Offset | Kod operacji | Stos                 |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### Kod DA {#the-da-code}

Ten kod jest również współdzielony z innymi metodami. Nazwiemy więc wartość na stosie Y i po prostu zapamiętamy, że w `currentWindow()` wartością tego Y jest Storage[1].

| Offset | Kod operacji | Stos             |
| -----: | ------------ | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

Zapisz Y w 0x80-0x9F.

| Offset | Kod operacji | Stos           |
| -----: | ------------ | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

A reszta została już wyjaśniona [powyżej](#the-e4-code). Zatem skoki do 0xDA zapisują szczyt stosu (Y) w 0x80-0x9F i zwracają tę wartość. W przypadku `currentWindow()` zwraca Storage[1].

## merkleRoot() {#merkleroot}

Kod w offsetach 0xED-0xF8 jest identyczny z tym, co widzieliśmy w 0x103-0x10E w `splitter()` (poza miejscem docelowym `JUMPI`), więc wiemy, że `merkleRoot()` również nie jest `payable`.

| Offset | Kod operacji | Stos                 |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

Co dzieje się po skoku, [już ustaliliśmy](#the-da-code). Zatem `merkleRoot()` zwraca Storage[0].

## 0x81e580d3 {#0x81e580d3}

Kod pod offsetami 0x138-0x143 jest identyczny z tym, co widzieliśmy pod 0x103-0x10E w `splitter()` (poza miejscem docelowym `JUMPI`), więc wiemy, że ta funkcja również nie jest `payable`.

| Offset | Kod operacji | Stos                                                         |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Wygląda na to, że ta funkcja przyjmuje co najmniej 32 bajty (jedno słowo) danych wywołania.

| Offset | Kod operacji | Stos                                         |
| -----: | ------------ | -------------------------------------------- |
|    19D | DUP1         | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2         | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT       |

Jeśli nie otrzyma danych wywołania, transakcja zostaje wycofana bez żadnych zwracanych danych.

Zobaczmy, co się stanie, jeśli funkcja _otrzyma_ potrzebne dane wywołania.

| Offset | Kod operacji | Stos                                     |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` to pierwsze słowo danych wywołania _po_ sygnaturze metody

| Offset | Kod operacji | Stos                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Jeśli pierwsze słowo nie jest mniejsze niż Storage[4], funkcja kończy się niepowodzeniem. Zostaje wycofana bez żadnej zwracanej wartości:

| Offset | Kod operacji | Stos          |
| -----: | ------------ | ------------- |
|    17A | PUSH1 0x00   | 0x00 ...      |
|    17C | DUP1         | 0x00 0x00 ... |
|    17D | REVERT       |

Jeśli calldataload(4) jest mniejsze niż Storage[4], otrzymujemy ten kod:

| Offset | Kod operacji | Stos                                                |
| -----: | ------------ | --------------------------------------------------- |
|    17E | JUMPDEST     | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00   | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2        | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3         | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE       | calldataload(4) 0x00 calldataload(4) 0xDA           |

A lokacje pamięci 0x00-0x1F zawierają teraz dane 0x04 (0x00-0x1E to same zera, 0x1F to cztery)

| Offset | Kod operacji | Stos                                                                    |
| -----: | ------------ | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20   | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1        | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2        | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3         | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD          | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD        | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Zatem w pamięci (storage) znajduje się tabela wyszukiwania, która zaczyna się od SHA3 z 0x000...0004 i ma wpis dla każdej prawidłowej wartości danych wywołania (wartość poniżej Storage[4]).

| Offset | Kod operacji | Stos                                                                    |
| -----: | ------------ | ----------------------------------------------------------------------- |
|    18B | SWAP1        | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP          | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2         | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP         | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Wiemy już, co robi [kod pod offsetem 0xDA](#the-da-code), zwraca on wartość ze szczytu stosu do wywołującego. Zatem ta funkcja zwraca wywołującemu wartość z tabeli wyszukiwania.

## 0x1f135823 {#0x1f135823}

Kod w offsetach 0xC4-0xCF jest identyczny z tym, co widzieliśmy w 0x103-0x10E w `splitter()` (poza miejscem docelowym `JUMPI`), więc wiemy, że ta funkcja również nie jest `payable`.

| Offset | Kod operacji | Stos              |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

Wiemy już, co robi [kod pod offsetem 0xDA](#the-da-code), zwraca on wartość ze szczytu stosu do wywołującego. Więc ta funkcja zwraca `Value*`.

### Podsumowanie metod {#method-summary}

Czy na tym etapie czujesz, że rozumiesz ten kontrakt? Ja nie. Jak dotąd mamy następujące metody:

| Metoda                            | Znaczenie                                                                            |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | Akceptuje wartość przekazaną w wywołaniu i zwiększa `Value*` o tę kwotę      |
| [splitter()](#splitter)           | Zwraca Storage[3], adres proxy                                                       |
| [currentWindow()](#currentwindow) | Zwraca Storage[1]                                                                    |
| [merkleRoot()](#merkleroot)        | Zwraca Storage[0]                                                                    |
| [0x81e580d3](#0x81e580d3)         | Zwraca wartość z tabeli wyszukiwania, pod warunkiem, że parametr jest mniejszy niż Storage[4] |
| [0x1f135823](#0x1f135823)         | Zwraca Storage[6], czyli Value\*                                                     |

Wiemy jednak, że wszelka inna funkcjonalność jest dostarczana przez kontrakt w Storage[3]. Może gdybyśmy wiedzieli, czym jest ten kontrakt, dałoby nam to jakąś wskazówkę. Na szczęście to jest blockchain i wszystko jest wiadome, przynajmniej w teorii. Nie widzieliśmy żadnych metod, które ustawiałyby Storage[3], więc musiało to zostać ustawione przez konstruktor.

## Konstruktor {#the-constructor}

Kiedy [przyglądamy się kontraktowi](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f), możemy również zobaczyć transakcję, która go utworzyła.

![Click the create transaction](create-tx.png)

Jeśli klikniemy tę transakcję, a następnie zakładkę **Stan**, możemy zobaczyć początkowe wartości parametrów. W szczególności możemy zauważyć, że Storage[3] zawiera [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Ten kontrakt musi zawierać brakującą funkcjonalność. Możemy go zrozumieć, używając tych samych narzędzi, których użyliśmy do badanego przez nas kontraktu.

## Kontrakt proxy {#the-proxy-contract}

Używając tych samych technik, których użyliśmy dla oryginalnego kontraktu powyżej, możemy zauważyć, że kontrakt zostaje wycofany, jeśli:

- Do wywołania dołączone jest jakiekolwiek ETH (0x05-0x0F)
- Rozmiar danych wywołania jest mniejszy niż cztery (0x10-0x19 i 0xBE-0xC2)

Oraz że obsługiwane przez niego metody to:

| Metoda                                                                                                          | Podpis metody                | Przesunięcie do skoku |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Możemy zignorować cztery ostatnie metody, ponieważ nigdy do nich nie dotrzemy. Ich podpisy są takie, że nasz oryginalny kontrakt sam się nimi zajmuje (możesz kliknąć podpisy, aby zobaczyć szczegóły powyżej), więc muszą to być [metody, które zostały nadpisane](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Jedną z pozostałych metod jest `claim(<params>)`, a kolejną `isClaimed(<params>)`, więc wygląda to na kontrakt airdropu. Zamiast przechodzić przez resztę kod operacji po kodzie operacji, możemy [wypróbować dekompilator](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), który generuje użyteczne wyniki dla trzech funkcji z tego kontraktu. Inżynieria wsteczna pozostałych pozostaje ćwiczeniem dla czytelnika.

### scaleAmountByPercentage {#scaleamountbypercentage}

Oto co dekompilator zwraca dla tej funkcji:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Pierwsze `require` sprawdza, czy dane wywołania mają, oprócz czterech bajtów podpisu funkcji, co najmniej 64 bajty, co wystarcza na dwa parametry. Jeśli nie, to oczywiście coś jest nie tak.

Instrukcja `if` wydaje się sprawdzać, czy `_param1` nie jest zerem, a `_param1 * _param2` nie jest ujemne. Prawdopodobnie ma to na celu zapobieganie przypadkom przepełnienia (wrap around).

Na koniec funkcja zwraca przeskalowaną wartość.

### claim {#claim}

Kod generowany przez dekompilator jest złożony i nie cały jest dla nas istotny. Pominę jego część, aby skupić się na wierszach, które moim zdaniem dostarczają przydatnych informacji.

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Widzimy tutaj dwie ważne rzeczy:

- `_param2`, chociaż jest zadeklarowane jako `uint256`, w rzeczywistości jest adresem
- `_param1` to okno, z którego odbierane są środki, które musi być `currentWindow` lub wcześniejsze.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Więc teraz wiemy, że Storage[5] to tablica okien i adresów, oraz informacja, czy dany adres odebrał nagrodę dla tego okna.

```python
  ...
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
      revert with 0, 'Invalid proof'
```

Wiemy, że `unknown2eb4a7ab` to w rzeczywistości funkcja `merkleRoot()`, więc ten kod wygląda, jakby weryfikował [dowód Merkle'a](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Oznacza to, że `_param4` jest dowodem Merkle'a.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

W ten sposób kontrakt transferuje własne ETH na inny adres (kontraktu lub posiadany zewnętrznie). Wywołuje go z wartością, która jest kwotą do przetransferowania. Wygląda więc na to, że jest to airdrop ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Dwie ostatnie linie mówią nam, że Storage[2] to również kontrakt, który wywołujemy. Jeśli [spojrzymy na transakcję konstruktora](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange), zobaczymy, że ten kontrakt to [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), kontrakt opakowanego etheru (WETH), [którego kod źródłowy został przesłany do Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Wygląda więc na to, że kontrakt próbuje wysłać ETH do `_param2`. Jeśli mu się to uda, to świetnie. Jeśli nie, próbuje wysłać [WETH](https://weth.tkn.eth.limo/). Jeśli `_param2` jest kontem posiadanym zewnętrznie (EOA), to zawsze może otrzymać ETH, ale kontrakty mogą odmówić przyjęcia ETH. Jednak WETH to ERC-20 i kontrakty nie mogą odmówić jego przyjęcia.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Na końcu funkcji widzimy, że generowany jest wpis logu. [Spójrz na wygenerowane wpisy logów](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) i przefiltruj po temacie, który zaczyna się od `0xdbd5...`. Jeśli [klikniemy jedną z transakcji, która wygenerowała taki wpis](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274), zobaczymy, że rzeczywiście wygląda to na odebranie środków (claim) - konto wysłało wiadomość do kontraktu, który poddajemy inżynierii wstecznej, a w zamian otrzymało ETH.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Ta funkcja jest bardzo podobna do [`claim`](#claim) powyżej. Również sprawdza dowód Merkle'a, próbuje przetransferować ETH do pierwszego i generuje ten sam typ wpisu logu.

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
      revert with 0, 'Invalid proof'
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

Główna różnica polega na tym, że nie ma pierwszego parametru, czyli okna do wypłaty. Zamiast tego występuje pętla po wszystkich oknach, z których można odebrać środki.

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

Wygląda to więc na wariant `claim`, który odbiera środki ze wszystkich okien.

## Podsumowanie {#conclusion}

Teraz powinieneś już wiedzieć, jak zrozumieć kontrakty, których kod źródłowy nie jest dostępny, używając kodów operacji lub (gdy to działa) dekompilatora. Jak widać po długości tego artykułu, inżynieria wsteczna kontraktu nie jest trywialna, ale w systemie, w którym bezpieczeństwo jest kluczowe, ważną umiejętnością jest możliwość weryfikacji, czy kontrakty działają zgodnie z obietnicą.

[Więcej moich prac znajdziesz tutaj](https://cryptodocguy.pro/).