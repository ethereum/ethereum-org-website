---
title: Zrozumienie specyfikacji EVM z Yellow Paper
description: "Zrozumienie części Yellow Paper, formalnej specyfikacji Ethereum, która wyjaśnia Wirtualną Maszynę Ethereum (EVM)."
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: pl
published: 2022-05-15
---

[Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) to formalna specyfikacja Ethereum. Z wyjątkiem zmian wprowadzonych w ramach [procesu EIP](/eips/), zawiera ona dokładny opis działania wszystkiego. Jest napisana jako praca matematyczna, która zawiera terminologię, która może nie być znana programistom. W tym artykule dowiesz się, jak ją czytać, a co za tym idzie, inne powiązane prace matematyczne.

## Który Yellow Paper? {#which-yellow-paper}

Podobnie jak prawie wszystko inne w Ethereum, Yellow Paper ewoluuje z czasem. Aby móc odnieść się do konkretnej wersji, załadowałem [aktualną wersję w momencie pisania tego tekstu](yellow-paper-berlin.pdf). Numery sekcji, stron i równań, których używam, będą odnosić się do tej wersji. Dobrym pomysłem jest otwarcie jej w innym oknie podczas czytania tego dokumentu.

### Dlaczego EVM? {#why-the-evm}

Oryginalny Yellow Paper został napisany na samym początku rozwoju Ethereum. Opisuje oryginalny mechanizm konsensusu oparty na proof-of-work, który był pierwotnie używany do zabezpieczania sieci. Jednakże we wrześniu 2022 roku Ethereum wyłączyło proof-of-work i zaczęło używać konsensusu opartego na proof-of-stake. Ten samouczek skupi się na częściach Yellow Paper definiujących Wirtualną Maszynę Ethereum. EVM pozostała niezmieniona po przejściu na proof-of-stake (z wyjątkiem zwracanej wartości kodu operacyjnego DIFFICULTY).

## 9 Model wykonania {#9-execution-model}

Ta sekcja (s. 12-14) zawiera większość definicji EVM.

Termin _stan systemu_ obejmuje wszystko, co trzeba wiedzieć o systemie, aby go uruchomić. W typowym komputerze oznacza to pamięć, zawartość rejestrów itp.

[Maszyna Turinga](https://en.wikipedia.org/wiki/Turing_machine) jest modelem obliczeniowym. Zasadniczo jest to uproszczona wersja komputera, o której udowodniono, że ma taką samą zdolność do wykonywania obliczeń jak normalny komputer (wszystko, co może obliczyć komputer, może obliczyć maszyna Turinga i na odwrót). Ten model ułatwia udowadnianie różnych twierdzeń o tym, co jest, a co nie jest obliczalne.

Termin [kompletność Turinga](https://en.wikipedia.org/wiki/Turing_completeness) oznacza komputer, który może wykonywać te same obliczenia co maszyna Turinga. Maszyny Turinga mogą wpaść w nieskończone pętle, a EVM nie, ponieważ zabrakłoby jej gazu, więc jest tylko quasi-kompletna w sensie Turinga.

## 9.1 Podstawy {#91-basics}

Ta sekcja przedstawia podstawy EVM i porównuje ją z innymi modelami obliczeniowymi.

[Maszyna stosowa](https://en.wikipedia.org/wiki/Stack_machine) to komputer, który przechowuje dane pośrednie nie w rejestrach, ale na [**stosie**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Jest to preferowana architektura dla maszyn wirtualnych, ponieważ jest łatwa w implementacji, co oznacza, że błędy i luki w zabezpieczeniach są znacznie mniej prawdopodobne. Pamięć na stosie jest podzielona na 256-bitowe słowa. Zostało to wybrane, ponieważ jest to wygodne dla podstawowych operacji kryptograficznych Ethereum, takich jak haszowanie Keccak-256 i obliczenia na krzywych eliptycznych. Maksymalny rozmiar stosu to 1024 elementy (1024 x 256 bitów). Kiedy kody operacyjne są wykonywane, zazwyczaj pobierają swoje parametry ze stosu. Istnieją kody operacyjne specjalnie do reorganizacji elementów na stosie, takie jak `POP` (usuwa element z wierzchołka stosu), `DUP_N` (duplikuje N-ty element na stosie) itp.

EVM posiada również ulotną przestrzeń zwaną **pamięcią**, która jest używana do przechowywania danych podczas wykonywania. Pamięć ta jest zorganizowana w 32-bajtowe słowa. Wszystkie lokalizacje w pamięci są inicjalizowane do zera. Jeśli wykonasz ten kod w [Yul](https://docs.soliditylang.org/en/latest/yul.html), aby dodać słowo do pamięci, wypełni on 32 bajty pamięci, uzupełniając pustą przestrzeń w słowie zerami, tzn. tworzy jedno słowo – z zerami w lokalizacjach 0–29, 0x60 w lokalizacji 30 i 0xA7 w lokalizacji 31.

```yul
mstore(0, 0x60A7)
```

`mstore` to jeden z trzech kodów operacyjnych, które EVM zapewnia do interakcji z pamięcią – ładuje słowo do pamięci. Pozostałe dwa to `mstore8`, który ładuje pojedynczy bajt do pamięci, oraz `mload`, który przenosi słowo z pamięci na stos.

EVM posiada również oddzielną, nietrwałą **pamięć trwałą (storage)**, która jest utrzymywana jako część stanu systemu – jest ona zorganizowana w tablice słów (w przeciwieństwie do adresowalnych słowami tablic bajtów na stosie). W tej pamięci trwałej kontrakty przechowują trwałe dane — kontrakt może wchodzić w interakcje tylko z własną pamięcią trwałą. Pamięć trwała jest zorganizowana w mapowania klucz-wartość.

Chociaż nie jest to wspomniane w tej sekcji Yellow Paper, warto również wiedzieć, że istnieje czwarty rodzaj pamięci. **Calldata** to adresowalna bajtowo pamięć tylko do odczytu, używana do przechowywania wartości przekazanej wraz z parametrem `data` transakcji. EVM ma określone kody operacyjne do zarządzania `calldata`. `calldatasize` zwraca rozmiar danych. `calldataload` ładuje dane na stos. `calldatacopy` kopiuje dane do pamięci.

Standardowa [architektura von Neumanna](https://en.wikipedia.org/wiki/Von_Neumann_architecture) przechowuje kod i dane w tej samej pamięci. EVM nie przestrzega tego standardu ze względów bezpieczeństwa — współdzielenie pamięci ulotnej umożliwia zmianę kodu programu. Zamiast tego kod jest zapisywany w pamięci trwałej.

Istnieją tylko dwa przypadki, w których kod jest wykonywany z pamięci:

- Gdy kontrakt tworzy inny kontrakt (przy użyciu [`CREATE`](https://www.evm.codes/#f0) lub [`CREATE2`](https://www.evm.codes/#f5)), kod konstruktora kontraktu pochodzi z pamięci.
- Podczas tworzenia _dowolnego_ kontraktu kod konstruktora jest uruchamiany, a następnie zwraca kod właściwego kontraktu, również z pamięci.

Termin wykonanie wyjątkowe oznacza wyjątek, który powoduje zatrzymanie wykonywania bieżącego kontraktu.

## 9.2 Przegląd opłat {#92-fees-overview}

W tej sekcji wyjaśniono, w jaki sposób obliczane są opłaty za gaz. Istnieją trzy koszty:

### Koszt kodu operacyjnego {#opcode-cost}

Nieodłączny koszt danego kodu operacyjnego. Aby uzyskać tę wartość, znajdź grupę kosztów kodu operacyjnego w Dodatku H (s. 28, pod równaniem (327)) i znajdź grupę kosztów w równaniu (324). Daje to funkcję kosztu, która w większości przypadków wykorzystuje parametry z Dodatku G (s. 27).

Na przykład kod operacyjny [`CALLDATACOPY`](https://www.evm.codes/#37) należy do grupy _W<sub>copy</sub>_. Koszt kodu operacyjnego dla tej grupy to _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Patrząc na Dodatek G, widzimy, że obie stałe wynoszą 3, co daje nam _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Nadal musimy rozszyfrować wyrażenie _⌈μ<sub>s</sub>[2]÷32⌉_. Zewnętrzna część, _⌈ \<value\> ⌉_, to funkcja sufitu, czyli funkcja, która dla danej wartości zwraca najmniejszą liczbę całkowitą, która nie jest mniejsza od tej wartości. Na przykład _⌈2,5⌉ = ⌈3⌉ = 3_. Wewnętrzna część to _μ<sub>s</sub>[2]÷32_. Patrząc na sekcję 3 (Konwencje) na s. 3, _μ_ to stan maszyny. Stan maszyny jest zdefiniowany w sekcji 9.4.1 na s. 13. Zgodnie z tą sekcją jednym z parametrów stanu maszyny jest _s_ dla stosu. Podsumowując, wydaje się, że _μ<sub>s</sub>[2]_ to lokalizacja #2 na stosie. Patrząc na [kod operacyjny](https://www.evm.codes/#37), lokalizacja #2 na stosie to rozmiar danych w bajtach. Patrząc na inne kody operacyjne w grupie W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) i [`RETURNDATACOPY`](https://www.evm.codes/#3e), mają one również rozmiar danych w tej samej lokalizacji. Zatem _⌈μ<sub>s</sub>[2]÷32⌉_ to liczba 32-bajtowych słów wymaganych do przechowywania kopiowanych danych. Podsumowując wszystko, nieodłączny koszt [`CALLDATACOPY`](https://www.evm.codes/#37) to 3 jednostki gazu plus 3 za każde kopiowane słowo danych.

### Koszt bieżący {#running-cost}

Koszt uruchomienia kodu, który wywołujemy.

- W przypadku [`CREATE`](https://www.evm.codes/#f0) i [`CREATE2`](https://www.evm.codes/#f5) jest to konstruktor nowego kontraktu.
- W przypadku [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) lub [`DELEGATECALL`](https://www.evm.codes/#f4) jest to kontrakt, który wywołujemy.

### Koszt rozszerzenia pamięci {#expanding-memory-cost}

Koszt rozszerzenia pamięci (w razie potrzeby).

W równaniu 324 wartość ta jest zapisana jako _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Patrząc ponownie na sekcję 9.4.1, widzimy, że _μ<sub>i</sub>_ to liczba słów w pamięci. Zatem _μ<sub>i</sub>_ to liczba słów w pamięci przed kodem operacyjnym, a _μ<sub>i</sub>'_ to liczba słów w pamięci po kodzie operacyjnym.

Funkcja _C<sub>mem</sub>_ jest zdefiniowana w równaniu 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ to funkcja podłogi, czyli funkcja, która dla danej wartości zwraca największą liczbę całkowitą, która nie jest większa od tej wartości. Na przykład _⌊2,5⌋ = ⌊2⌋ = 2._ Gdy _a < √512_, _a<sup>2</sup> < 512_, a wynik funkcji podłogi wynosi zero. Zatem dla pierwszych 22 słów (704 bajtów) koszt rośnie liniowo wraz z liczbą wymaganych słów pamięci. Powyżej tego punktu _⌊a<sup>2</sup> ÷ 512⌋_ jest dodatnie. Gdy wymagana pamięć jest wystarczająco duża, koszt gazu jest proporcjonalny do kwadratu ilości pamięci.

**Uwaga**: te czynniki wpływają tylko na _nieodłączny_ koszt gazu – nie uwzględniają rynku opłat ani napiwków dla walidatorów, które określają, ile użytkownik końcowy musi zapłacić – to tylko surowy koszt uruchomienia określonej operacji na EVM.

[Przeczytaj więcej o gazie](/developers/docs/gas/).

## 9.3 Środowisko wykonawcze {#93-execution-env}

Środowisko wykonawcze to krotka, _I_, która zawiera informacje, które nie są częścią stanu blockchaina ani EVM.

| Parametr        | Kod operacyjny dostępu do danych                                                                                 | Kod Solidity do dostępu do danych                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADRES`](https://www.evm.codes/#30)                                                                             | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35) itp.                                                 | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                                     |
| _I<sub>H</sub>_ | Pola nagłówka bloku, takie jak [`NUMBER`](https://www.evm.codes/#43) i [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, itp. |
| _I<sub>e</sub>_ | Głębokość stosu wywołań dla wywołań między kontraktami (w tym tworzenie kontraktów)           |                                                          |
| _I<sub>w</sub>_ | Czy EVM może zmieniać stan, czy działa statycznie                                                                |                                                          |

Kilka innych parametrów jest niezbędnych do zrozumienia reszty sekcji 9:

| Parametr | Zdefiniowano w sekcji                                          | Znaczenie                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_      | 2 (s. 2, równanie 1)        | Stan blockchaina                                                                                                                                                                                                                                   |
| _g_      | 9.3 (s. 13) | Pozostały gaz                                                                                                                                                                                                                                      |
| _A_      | 6.1 (s. 8)  | Naliczony podstan (zmiany zaplanowane na zakończenie transakcji)                                                                                                                                                                |
| _o_      | 9.3 (s. 13) | Dane wyjściowe — zwracany wynik w przypadku transakcji wewnętrznej (gdy jeden kontrakt wywołuje drugi) i wywołania funkcji widoku (gdy pytasz tylko o informacje, więc nie ma potrzeby czekać na transakcję) |

## 9.4 Przegląd wykonania {#94-execution-overview}

Teraz, gdy mamy już wszystkie wstępne informacje, możemy w końcu zacząć pracować nad tym, jak działa EVM.

Równania 137–142 podają nam warunki początkowe do uruchomienia EVM:

| Symbol           | Wartość początkowa                                                               | Znaczenie                                                                                                                                                                                                                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Pozostały gaz                                                                                                                                                                                                                                                                                                             |
| _μ<sub>pc</sub>_ | _0_                                                                              | Licznik programu, adres następnej instrukcji do wykonania                                                                                                                                                                                                                                                                 |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Pamięć, zainicjalizowana samymi zerami                                                                                                                                                                                                                                                                                    |
| _μ<sub>i</sub>_  | _0_                                                                              | Najwyższa używana lokalizacja pamięci                                                                                                                                                                                                                                                                                     |
| _μ<sub>s</sub>_  | _()_                                                          | Stos, początkowo pusty                                                                                                                                                                                                                                                                                                    |
| _μ<sub>o</sub>_  | _∅_                                                                              | Dane wyjściowe, pusty zbiór do momentu, gdy zatrzymamy się z danymi zwrotnymi ([`RETURN`](https://www.evm.codes/#f3) lub [`REVERT`](https://www.evm.codes/#fd)) lub bez nich ([`STOP`](https://www.evm.codes/#00) lub [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Równanie 143 mówi nam, że w każdym momencie podczas wykonywania istnieją cztery możliwe warunki i co z nimi zrobić:

1. `Z(σ,μ,A,I)`. Z reprezentuje funkcję, która sprawdza, czy operacja tworzy nieprawidłowe przejście stanu (zobacz [zatrzymanie wyjątkowe](#942-exceptional-halting)). Jeśli wynikiem jest Prawda, nowy stan jest identyczny ze starym (z wyjątkiem tego, że gaz jest spalany), ponieważ zmiany nie zostały zaimplementowane.
2. Jeśli wykonywany jest kod operacyjny [`REVERT`](https://www.evm.codes/#fd), nowy stan jest taki sam jak stary stan, a część gazu przepada.
3. Jeśli sekwencja operacji jest zakończona, co jest sygnalizowane przez [`RETURN`](https://www.evm.codes/#f3)), stan jest aktualizowany do nowego stanu.
4. Jeśli nie jesteśmy w jednym z warunków końcowych 1-3, kontynuuj działanie.

## 9.4.1 Stan maszyny {#941-machine-state}

Ta sekcja wyjaśnia bardziej szczegółowo stan maszyny. Określa, że _w_ to bieżący kod operacyjny. Jeśli _μ<sub>pc</sub>_ jest mniejsze niż _||I<sub>b</sub>||_, długość kodu, to ten bajt (_I<sub>b</sub>[μ<sub>pc</sub>]_) jest kodem operacyjnym. W przeciwnym razie kod operacyjny jest zdefiniowany jako [`STOP`](https://www.evm.codes/#00).

Ponieważ jest to [maszyna stosowa](https://en.wikipedia.org/wiki/Stack_machine), musimy śledzić liczbę elementów zdjętych ze stosu (_δ_) i umieszczonych na nim (_α_) przez każdy kod operacyjny.

## 9.4.2 Wyjątkowe zatrzymanie {#942-exceptional-halt}

W tej sekcji zdefiniowano funkcję _Z_, która określa, kiedy mamy do czynienia z nienormalnym zakończeniem. Jest to funkcja [logiczna](https://en.wikipedia.org/wiki/Boolean_data_type), więc używa [_∨_ dla lub logicznego](https://en.wikipedia.org/wiki/Logical_disjunction) i [_∧_ dla i logicznego](https://en.wikipedia.org/wiki/Logical_conjunction).

Mamy wyjątkowe zatrzymanie, jeśli którykolwiek z tych warunków jest prawdziwy:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Jak widzieliśmy w sekcji 9.2, _C_ to funkcja, która określa koszt gazu. Nie ma wystarczającej ilości gazu na pokrycie następnego kodu operacyjnego.

- **_δ<sub>w</sub>=∅_**
  Jeśli liczba elementów zdejmowanych dla kodu operacyjnego jest niezdefiniowana, to sam kod operacyjny jest niezdefiniowany.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Niedomiar stosu, niewystarczająca liczba elementów na stosie dla bieżącego kodu operacyjnego.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Kod operacyjny to [`JUMP`](https://www.evm.codes/#56), a adres to nie [`JUMPDEST`](https://www.evm.codes/#5b). Skoki są ważne _tylko_ wtedy, gdy miejscem docelowym jest [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Kod operacyjny to [`JUMPI`](https://www.evm.codes/#57), warunek jest prawdziwy (niezerowy), więc skok powinien nastąpić, a adres nie jest [`JUMPDEST`](https://www.evm.codes/#5b). Skoki są ważne _tylko_ wtedy, gdy miejscem docelowym jest [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Kod operacyjny to [`RETURNDATACOPY`](https://www.evm.codes/#3e). W tym kodzie operacyjnym element stosu _μ<sub>s</sub>[1]_ to przesunięcie, od którego należy odczytywać dane w buforze danych zwrotnych, a element stosu _μ<sub>s</sub>[2]_ to długość danych. Ten warunek występuje, gdy próbujesz odczytać dane poza końcem bufora danych zwrotnych. Należy zauważyć, że nie ma podobnego warunku dla calldata ani dla samego kodu. Gdy próbujesz odczytać dane poza końcem tych buforów, otrzymujesz po prostu zera.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Przepełnienie stosu. Jeśli uruchomienie kodu operacyjnego spowoduje, że stos będzie zawierał ponad 1024 elementy, przerwij.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Czy działamy statycznie ([¬ to negacja](https://en.wikipedia.org/wiki/Negation), a _I<sub>w</sub>_ jest prawdziwe, gdy możemy zmienić stan blockchaina)? Jeśli tak i próbujemy wykonać operację zmiany stanu, nie może ona się powieść.

  Funkcja _W(w,μ)_ jest zdefiniowana później w równaniu 150. _W(w,μ)_ jest prawdą, jeśli jeden z tych warunków jest prawdziwy:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Te kody operacyjne zmieniają stan, tworząc nowy kontrakt, przechowując wartość lub niszcząc bieżący kontrakt.

  - **_LOG0≤w ∧ w≤LOG4_**
    Jeśli jesteśmy wywoływani statycznie, nie możemy emitować wpisów dziennika.
    Kody operacyjne dziennika znajdują się w zakresie od [`LOG0` (A0)](https://www.evm.codes/#a0) do [`LOG4` (A4)](https://www.evm.codes/#a4).
    Liczba po kodzie operacyjnym dziennika określa, ile tematów zawiera wpis dziennika.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Możesz wywołać inny kontrakt, gdy jesteś statyczny, ale jeśli to zrobisz, nie możesz przelać do niego ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Nie można uruchomić [`SSTORE`](https://www.evm.codes/#55), chyba że masz więcej gazu niż G<sub>callstipend</sub> (zdefiniowane jako 2300 w Dodatku G).

## 9.4.3 Prawidłowość miejsca docelowego skoku {#943-jump-dest-valid}

Tutaj formalnie definiujemy, czym są kody operacyjne [`JUMPDEST`](https://www.evm.codes/#5b). Nie możemy po prostu szukać wartości bajtowej 0x5B, ponieważ może ona znajdować się wewnątrz PUSH (a zatem być danymi, a nie kodem operacyjnym).

W równaniu (153) definiujemy funkcję _N(i,w)_. Pierwszy parametr, _i_, to lokalizacja kodu operacyjnego. Drugi, _w_, to sam kod operacyjny. Jeśli _w∈[PUSH1, PUSH32]_, oznacza to, że kod operacyjny to PUSH (nawiasy kwadratowe definiują zakres, który obejmuje punkty końcowe). W takim przypadku następny kod operacyjny znajduje się w _i+2+(w−PUSH1)_. W przypadku [`PUSH1`](https://www.evm.codes/#60) musimy przesunąć się o dwa bajty (sam PUSH i jednobajtowa wartość), w przypadku [`PUSH2`](https://www.evm.codes/#61) musimy przesunąć się o trzy bajty, ponieważ jest to dwubajtowa wartość itd. Wszystkie inne kody operacyjne EVM mają tylko jeden bajt długości, więc we wszystkich innych przypadkach _N(i,w)=i+1_.

Ta funkcja jest używana w równaniu (152) do zdefiniowania _D<sub>J</sub>(c,i)_, który jest [zbiorem](https://en.wikipedia.org/wiki/Set_\(mathematics\)) wszystkich prawidłowych miejsc docelowych skoku w kodzie _c_, zaczynając od lokalizacji kodu operacyjnego _i_. Ta funkcja jest zdefiniowana rekurencyjnie. Jeśli _i≥||c||_, oznacza to, że jesteśmy na końcu kodu lub za nim. Nie znajdziemy już żadnych miejsc docelowych skoku, więc po prostu zwróć pusty zbiór.

We wszystkich innych przypadkach patrzymy na resztę kodu, przechodząc do następnego kodu operacyjnego i pobierając zbiór, zaczynając od niego. _c[i]_ to bieżący kod operacyjny, więc _N(i,c[i])_ to lokalizacja następnego kodu operacyjnego. _D<sub>J</sub>(c,N(i,c[i]))_ jest zatem zbiorem prawidłowych miejsc docelowych skoku, który zaczyna się od następnego kodu operacyjnego. Jeśli bieżący kod operacyjny nie jest `JUMPDEST`, po prostu zwróć ten zbiór. Jeśli jest to `JUMPDEST`, umieść go w zbiorze wyników i zwróć go.

## 9.4.4 Normalne zatrzymanie {#944-normal-halt}

Funkcja zatrzymania _H_ może zwracać trzy typy wartości.

- Jeśli nie jesteśmy w kodzie operacyjnym zatrzymania, zwróć _∅_, pusty zbiór. Zgodnie z konwencją wartość ta jest interpretowana jako logiczny fałsz.
- Jeśli mamy kod operacyjny zatrzymania, który nie generuje danych wyjściowych (albo [`STOP`](https://www.evm.codes/#00), albo [`SELFDESTRUCT`](https://www.evm.codes/#ff)), zwróć sekwencję zerowej liczby bajtów jako wartość zwracaną. Należy zauważyć, że jest to zupełnie co innego niż pusty zbiór. Ta wartość oznacza, że EVM naprawdę się zatrzymała, tylko nie ma danych zwrotnych do odczytania.
- Jeśli mamy kod operacyjny zatrzymania, który generuje dane wyjściowe (albo [`RETURN`](https://www.evm.codes/#f3), albo [`REVERT`](https://www.evm.codes/#fd)), zwróć sekwencję bajtów określoną przez ten kod operacyjny. Ta sekwencja jest pobierana z pamięci, wartość na szczycie stosu (_μ<sub>s</sub>[0]_) to pierwszy bajt, a wartość za nią (_μ<sub>s</sub>[1]_) to długość.

## H.2 Zestaw instrukcji {#h2-instruction-set}

Zanim przejdziemy do ostatniej podsekcji EVM, 9.5, spójrzmy na same instrukcje. Są one zdefiniowane w Dodatku H.2, który zaczyna się na s. 29. Wszystko, co nie jest określone jako zmieniające się wraz z tym konkretnym kodem operacyjnym, powinno pozostać takie samo. Zmienne, które się zmieniają, są określone jako \<coś\>′.

Spójrzmy na przykład na kod operacyjny [`ADD`](https://www.evm.codes/#01).

| Wartość | Mnemonik | δ | α | Opis                                                                                                                                                                                                                  |
| ------: | -------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x01 | ADD      | 2 | 1 | Operacja dodawania.                                                                                                                                                                                   |
|         |          |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ to liczba wartości, które zdejmujemy ze stosu. W tym przypadku dwie, ponieważ dodajemy dwie górne wartości.

_α_ to liczba wartości, które odkładamy na stos. W tym przypadku jedna, suma.

Zatem nowy wierzchołek stosu (_μ′<sub>s</sub>[0]_) jest sumą starego wierzchołka stosu (_μ<sub>s</sub>[0]_) i starej wartości pod nim (_μ<sub>s</sub>[1]_).

Zamiast przechodzić przez wszystkie kody operacyjne w postaci „listy przyprawiającej o zawrót głowy”, ten artykuł wyjaśnia tylko te kody operacyjne, które wprowadzają coś nowego.

| Wartość | Mnemonik  | δ | α | Opis                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256 | 2 | 1 | Oblicz hasz Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                              |
|         |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Jest to pierwszy kod operacyjny, który uzyskuje dostęp do pamięci (w tym przypadku tylko do odczytu). Może on jednak wykraczać poza obecne granice pamięci, więc musimy zaktualizować _μ<sub>i</sub>._ Robimy to za pomocą funkcji _M_ zdefiniowanej w równaniu 328 na s. 29.

| Wartość | Mnemonik | δ | α | Opis                                                |
| ------: | -------- | - | - | --------------------------------------------------- |
|    0x31 | BALANCE  | 1 | 1 | Pobierz saldo danego konta.         |
|         |          |   |   | ... |

Adres, którego saldo musimy znaleźć to _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Wierzchołek stosu to adres, ale ponieważ adresy mają tylko 160 bitów, obliczamy wartość [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Jeśli _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, oznacza to, że istnieją informacje o tym adresie. W takim przypadku _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ to saldo dla tego adresu. Jeśli _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, oznacza to, że ten adres jest niezainicjalizowany, a saldo wynosi zero. Listę pól informacyjnych konta można zobaczyć w sekcji 4.1 na s. 4.

Drugie równanie, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, jest związane z różnicą w kosztach między dostępem do ciepłej pamięci trwałej (pamięci, do której ostatnio uzyskano dostęp i która prawdopodobnie jest w pamięci podręcznej) a zimną pamięcią trwałą (pamięcią, do której nie było dostępu i która prawdopodobnie znajduje się w wolniejszej pamięci, której odzyskanie jest droższe). _A<sub>a</sub>_ to lista adresów, do których wcześniej uzyskano dostęp w ramach transakcji, a zatem dostęp do nich powinien być tańszy, zgodnie z definicją w sekcji 6.1 na s. 8. Więcej na ten temat można przeczytać w [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Wartość | Mnemonik | δ  | α  | Opis                                                                                                                                            |
| ------: | -------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x8F | DUP16    | 16 | 17 | Duplikuj 16. element stosu.                                                                                     |
|         |          |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Należy pamiętać, że aby użyć dowolnego elementu stosu, musimy go zdjąć, co oznacza, że musimy również zdjąć wszystkie elementy stosu znajdujące się nad nim. W przypadku [`DUP<n>`](https://www.evm.codes/#8f) i [`SWAP<n>`](https://www.evm.codes/#9f) oznacza to konieczność zdjęcia, a następnie odłożenia na stos do szesnastu wartości.

## 9.5 Cykl wykonania {#95-exec-cycle}

Teraz, gdy mamy już wszystkie części, możemy w końcu zrozumieć, jak udokumentowany jest cykl wykonania EVM.

Równanie (155) mówi, że biorąc pod uwagę stan:

- _σ_ (globalny stan blockchaina)
- _μ_ (stan EVM)
- _A_ (podstan, zmiany, które mają nastąpić po zakończeniu transakcji)
- _I_ (środowisko wykonawcze)

Nowy stan to _(σ', μ', A', I')_.

Równania (156)-(158) definiują stos i zmianę w nim spowodowaną przez kod operacyjny (_μ<sub>s</sub>_). Równanie (159) to zmiana w gazie (_μ<sub>g</sub>_). Równanie (160) to zmiana w liczniku programu (_μ<sub>pc</sub>_). Wreszcie równania (161)-(164) określają, że pozostałe parametry pozostają takie same, chyba że zostały wyraźnie zmienione przez kod operacyjny.

W ten sposób EVM jest w pełni zdefiniowana.

## Wnioski {#conclusion}

Notacja matematyczna jest precyzyjna i pozwoliła Yellow Paper na określenie każdego szczegółu Ethereum. Ma to jednak pewne wady:

- Może być zrozumiana tylko przez ludzi, co oznacza, że [testy zgodności](https://github.com/ethereum/tests) muszą być pisane ręcznie.
- Programiści rozumieją kod komputerowy.
  Mogą rozumieć notację matematyczną lub nie.

Być może z tych powodów nowsze [specyfikacje warstwy konsensusu](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) są napisane w Pythonie. Istnieją [specyfikacje warstwy wykonawczej w Pythonie](https://ethereum.github.io/execution-specs), ale nie są one kompletne. Dopóki cały Yellow Paper nie zostanie również przetłumaczony na język Python lub podobny, Yellow Paper będzie nadal w użyciu i warto umieć go czytać.
