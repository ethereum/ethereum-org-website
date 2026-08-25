---
title: "Zrozumienie specyfikacji EVM w żółtej księdze"
description: "Zrozumienie części żółtej księgi, formalnej specyfikacji Ethereum, która wyjaśnia maszynę wirtualną Ethereum (EVM)."
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: "Żółta księga EVM"
lang: pl
published: 2022-05-15
---

[Żółta księga](https://ethereum.github.io/yellowpaper/paper.pdf) to formalna specyfikacja Ethereum. Z wyjątkiem poprawek wprowadzonych przez [proces EIP](/eips/), zawiera ona dokładny opis tego, jak wszystko działa. Jest napisana w formie pracy matematycznej, co obejmuje terminologię, która może nie być znana programistom. Z tego artykułu dowiesz się, jak ją czytać, a co za tym idzie, jak czytać inne powiązane prace matematyczne.

## Która żółta księga? {#which-yellow-paper}

Jak prawie wszystko w Ethereum, żółta księga ewoluuje w czasie. Aby móc odnieść się do konkretnej wersji, przesłałem [wersję aktualną w momencie pisania](https://ethereum.github.io/yellowpaper/paper.pdf). Numery sekcji, stron i równań, których używam, będą odnosić się do tej wersji. Dobrym pomysłem jest otwarcie jej w innym oknie podczas czytania tego dokumentu.

### Dlaczego EVM? {#why-the-evm}

Oryginalna żółta księga została napisana na samym początku rozwoju Ethereum. Opisuje ona oryginalny mechanizm konsensusu oparty na dowodzie pracy (PoW), który był pierwotnie używany do zabezpieczania sieci. Jednakże we wrześniu 2022 roku Ethereum wyłączyło dowód pracy i zaczęło używać konsensusu opartego na dowodzie stawki (PoS). Ten samouczek skupi się na częściach żółtej księgi definiujących maszynę wirtualną Ethereum (EVM). EVM pozostała niezmieniona po przejściu na dowód stawki (z wyjątkiem wartości zwracanej przez kod operacji DIFFICULTY).

## 9 Model wykonawczy

Ta sekcja (str. 14-16) zawiera większość definicji EVM.

Termin _stan systemu_ (system state) obejmuje wszystko, co musisz wiedzieć o systemie, aby go uruchomić. W typowym komputerze oznacza to pamięć, zawartość rejestrów itp.

[Maszyna Turinga](https://en.wikipedia.org/wiki/Turing_machine) to model obliczeniowy. Zasadniczo jest to uproszczona wersja komputera, o której udowodniono, że ma taką samą zdolność do wykonywania obliczeń, jak normalny komputer (wszystko, co komputer może obliczyć, maszyna Turinga również może obliczyć i odwrotnie). Ten model ułatwia udowadnianie różnych twierdzeń na temat tego, co jest, a co nie jest obliczalne.

Termin [kompletność w sensie Turinga](https://en.wikipedia.org/wiki/Turing_completeness) (Turing-complete) oznacza komputer, który może wykonywać te same obliczenia co maszyna Turinga. Maszyny Turinga mogą wpaść w nieskończone pętle, a EVM nie może, ponieważ zabrakłoby jej gazu, więc jest tylko quasi-kompletna w sensie Turinga.
## 9.1 Podstawy {#91-basics}

Ta sekcja przedstawia podstawy EVM i jej porównanie z innymi modelami obliczeniowymi.

[Maszyna stosowa](https://en.wikipedia.org/wiki/Stack_machine) to komputer, który przechowuje dane pośrednie nie w rejestrach, ale na [**stosie**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Jest to preferowana architektura dla maszyn wirtualnych, ponieważ jest łatwa do wdrożenia, co oznacza, że błędy i luki w zabezpieczeniach są znacznie mniej prawdopodobne. Pamięć na stosie jest podzielona na 256-bitowe słowa. Zostało to wybrane, ponieważ jest to wygodne dla podstawowych operacji kryptograficznych Ethereum, takich jak haszowanie Keccak-256 i obliczenia na krzywych eliptycznych. Maksymalny rozmiar stosu to 1024 elementy (1024 x 256 bitów). Kiedy kody operacji są wykonywane, zazwyczaj pobierają swoje parametry ze stosu. Istnieją kody operacji przeznaczone specjalnie do reorganizacji elementów na stosie, takie jak `POP` (usuwa element ze szczytu stosu), `DUP_N` (duplikuje N-ty element na stosie) itp.

EVM posiada również ulotną przestrzeń zwaną **pamięcią** (memory), która służy do przechowywania danych podczas wykonywania. Ta pamięć jest zorganizowana w 32-bajtowe słowa. Wszystkie lokalizacje w pamięci są inicjowane zerami. Jeśli wykonasz ten kod [Yul](https://docs.soliditylang.org/en/latest/yul.html), aby dodać słowo do pamięci, wypełni on 32 bajty pamięci, uzupełniając puste miejsce w słowie zerami, tj. utworzy jedno słowo - z zerami w lokalizacjach 0-29, 0x60 w 30 i 0xA7 w 31.

```yul
mstore(0, 0x60A7)
```

`mstore` to jeden z trzech kodów operacji, które EVM udostępnia do interakcji z pamięcią - ładuje on słowo do pamięci. Pozostałe dwa to `mstore8`, który ładuje pojedynczy bajt do pamięci, oraz `mload`, który przenosi słowo z pamięci na stos.

EVM posiada również oddzielny, nieulotny model **pamięci masowej** (storage), który jest utrzymywany jako część stanu systemu - ta pamięć jest zorganizowana w tablice słów (w przeciwieństwie do adresowalnych słowami tablic bajtów na stosie). W tej pamięci masowej kontrakty przechowują trwałe dane - kontrakt może wchodzić w interakcje tylko z własną pamięcią masową. Pamięć masowa jest zorganizowana w mapowania klucz-wartość.

Chociaż nie wspomniano o tym w tej sekcji żółtej księgi, warto również wiedzieć, że istnieje czwarty rodzaj pamięci. **Dane wywołania** (calldata) to adresowalna bajtowo pamięć tylko do odczytu, używana do przechowywania wartości przekazanej z parametrem `data` transakcji. EVM posiada specyficzne kody operacji do zarządzania `calldata`. `calldatasize` zwraca rozmiar danych. `calldataload` ładuje dane na stos. `calldatacopy` kopiuje dane do pamięci.

Standardowa [architektura von Neumanna](https://en.wikipedia.org/wiki/Von_Neumann_architecture) przechowuje kod i dane w tej samej pamięci. EVM nie podąża za tym standardem ze względów bezpieczeństwa - współdzielenie pamięci ulotnej umożliwia zmianę kodu programu. Zamiast tego kod jest zapisywany w pamięci masowej.

Istnieją tylko dwa przypadki, w których kod jest wykonywany z pamięci:

- Kiedy kontrakt tworzy inny kontrakt (używając [`CREATE`](https://www.evm.codes/#f0) lub [`CREATE2`](https://www.evm.codes/#f5)), kod konstruktora kontraktu pochodzi z pamięci.
- Podczas tworzenia _dowolnego_ kontraktu, kod konstruktora jest uruchamiany, a następnie zwraca kod właściwego kontraktu, również z pamięci.

Termin wyjątkowe wykonanie (exceptional execution) oznacza wyjątek, który powoduje zatrzymanie wykonywania bieżącego kontraktu.

## 9.2 Przegląd opłat {#92-fees-overview}

Ta sekcja wyjaśnia, jak obliczane są opłaty za gaz. Istnieją trzy koszty:

### Koszt kodu operacji

Nieodłączny koszt konkretnego kodu operacji. Aby uzyskać tę wartość, znajdź grupę kosztów kodu operacji w Dodatku H (str. 29, pod równaniem (329)) i znajdź grupę kosztów w równaniu (326). Daje to funkcję kosztu, która w większości przypadków używa parametrów z Dodatku G (str. 28).

Na przykład kod operacji [`CALLDATACOPY`](https://www.evm.codes/#37) jest członkiem grupy _W<sub>copy</sub>_. Koszt kodu operacji dla tej grupy to _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Patrząc na Dodatek G, widzimy, że obie stałe wynoszą 3, co daje nam _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Nadal musimy rozszyfrować wyrażenie _⌈μ<sub>s</sub>[2]÷32⌉_. Zewnętrzna część, _⌈ \<value\> ⌉_ to funkcja sufitu (ceiling function), funkcja, która dla danej wartości zwraca najmniejszą liczbę całkowitą, która nie jest mniejsza od tej wartości. Na przykład _⌈2.5⌉ = ⌈3⌉ = 3_. Wewnętrzna część to _μ<sub>s</sub>[2]÷32_. Patrząc na sekcję 3 (Konwencje) na str. 3, _μ_ to stan maszyny. Stan maszyny jest zdefiniowany w sekcji 9.4.1 na str. 15. Zgodnie z tą sekcją, jednym z parametrów stanu maszyny jest _s_ dla stosu. Biorąc to wszystko pod uwagę, wydaje się, że _μ<sub>s</sub>[2]_ to lokalizacja nr 2 na stosie. Patrząc na [kod operacji](https://www.evm.codes/#37), lokalizacja nr 2 na stosie to rozmiar danych w bajtach. Patrząc na inne kody operacji w grupie W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) i [`RETURNDATACOPY`](https://www.evm.codes/#3e), one również mają rozmiar danych w tej samej lokalizacji. Zatem _⌈μ<sub>s</sub>[2]÷32⌉_ to liczba 32-bajtowych słów wymaganych do przechowania kopiowanych danych. Podsumowując, nieodłączny koszt [`CALLDATACOPY`](https://www.evm.codes/#37) to 3 jednostki gazu plus 3 za każde kopiowane słowo danych.
### Koszt uruchomienia {#running-cost}

Koszt uruchomienia kodu, który wywołujemy.

- W przypadku [`CREATE`](https://www.evm.codes/#f0) i [`CREATE2`](https://www.evm.codes/#f5), konstruktor dla nowego kontraktu.
- W przypadku [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) lub [`DELEGATECALL`](https://www.evm.codes/#f4), kontrakt, który wywołujemy.

### Koszt rozszerzenia pamięci

Koszt rozszerzenia pamięci (jeśli jest to konieczne).

W równaniu 326 ta wartość jest zapisana jako _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Patrząc ponownie na sekcję 9.4.1, widzimy, że _μ<sub>i</sub>_ to liczba słów w pamięci. Zatem _μ<sub>i</sub>_ to liczba słów w pamięci przed kodem operacji, a _μ<sub>i</sub>'_ to liczba słów w pamięci po kodzie operacji.

Funkcja _C<sub>mem</sub>_ jest zdefiniowana w równaniu 328: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ to funkcja podłogi (floor function), funkcja, która dla danej wartości zwraca największą liczbę całkowitą, która nie jest większa od tej wartości. Na przykład _⌊2.5⌋ = ⌊2⌋ = 2._ Kiedy _a < √512_, _a<sup>2</sup> < 512_, a wynik funkcji podłogi wynosi zero. Zatem dla pierwszych 22 słów (704 bajtów) koszt rośnie liniowo wraz z liczbą wymaganych słów pamięci. Poza tym punktem _⌊a<sup>2</sup> ÷ 512⌋_ jest dodatnie. Kiedy wymagana pamięć jest wystarczająco duża, koszt gazu jest proporcjonalny do kwadratu ilości pamięci.

**Uwaga**, że te czynniki wpływają tylko na _nieodłączny_ koszt gazu - nie biorą pod uwagę rynku opłat ani napiwków dla walidatorów, które określają, ile użytkownik końcowy musi zapłacić - jest to tylko surowy koszt uruchomienia konkretnej operacji w EVM.

[Dowiedz się więcej o gazie](/developers/docs/gas/).
## 9.3 Środowisko wykonawcze

Środowisko wykonawcze to krotka (tuple), _I_, która zawiera informacje niebędące częścią stanu blockchaina ani EVM.

| Parametr        | Kod operacji dostępu do danych                                                                                   | Kod Solidity dostępu do danych           |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35) itp.                                                                 | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Pola nagłówka bloku, takie jak [`NUMBER`](https://www.evm.codes/#43) i [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty` itp.  |
| _I<sub>e</sub>_ | Głębokość stosu wywołań dla wywołań między kontraktami (w tym tworzenia kontraktów)                              |                                          |
| _I<sub>w</sub>_ | Czy EVM ma pozwolenie na zmianę stanu, czy działa statycznie                                                     |                                          |

Kilka innych parametrów jest niezbędnych do zrozumienia reszty sekcji 9:

| Parametr  | Zdefiniowano w sekcji | Znaczenie                                                                                                                                                                                                                         |
| --------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (str. 2, równanie 1)| Stan blockchaina                                                                                                                                                                                                                  |
| _g_       | 9.3 (str. 14)         | Pozostały gaz                                                                                                                                                                                                                     |
| _A_       | 6.1 (str. 9)          | Narosły podstan (zmiany zaplanowane na moment zakończenia transakcji)                                                                                                                                                             |
| _o_       | 9.3 (str. 14)         | Wyjście - zwrócony wynik w przypadku transakcji wewnętrznej (gdy jeden kontrakt wywołuje inny) i wywołań funkcji widoku (gdy po prostu prosisz o informacje, więc nie ma potrzeby czekać na transakcję)                           |
## 9.4 Przegląd wykonania

Teraz, gdy mamy już wszystkie wstępne informacje, możemy wreszcie zacząć pracę nad tym, jak działa EVM.

Równania 146-151 dają nam warunki początkowe do uruchomienia EVM:

| Symbol           | Wartość początkowa | Znaczenie                                                                                                                                                                                                                                                         |
| ---------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                | Pozostały gaz                                                                                                                                                                                                                                                     |
| _μ<sub>pc</sub>_ | _0_                | Licznik programu, adres następnej instrukcji do wykonania                                                                                                                                                                                                         |
| _μ<sub>m</sub>_  | _(0, 0, ...)_      | Pamięć, zainicjowana samymi zerami                                                                                                                                                                                                                                |
| _μ<sub>i</sub>_  | _0_                | Najwyższa użyta lokalizacja pamięci                                                                                                                                                                                                                               |
| _μ<sub>s</sub>_  | _()_               | Stos, początkowo pusty                                                                                                                                                                                                                                            |
| _μ<sub>o</sub>_  | _∅_                | Wyjście, zbiór pusty, dopóki nie zatrzymamy się ze zwracanymi danymi ([`RETURN`](https://www.evm.codes/#f3) lub [`REVERT`](https://www.evm.codes/#fd)) lub bez nich ([`STOP`](https://www.evm.codes/#00) lub [`SELFDESTRUCT`](https://www.evm.codes/#ff)).      |

Równanie 152 mówi nam, że w każdym momencie podczas wykonywania istnieją cztery możliwe warunki i co z nimi zrobić:

1.  `Z(σ,μ,A,I)`. Z reprezentuje funkcję, która sprawdza, czy operacja tworzy nieprawidłowe przejście stanu (zobacz [wyjątkowe zatrzymanie](#942-exceptional-halt)). Jeśli jej wynikiem jest Prawda (True), nowy stan jest identyczny ze starym (z wyjątkiem tego, że gaz zostaje spalony), ponieważ zmiany nie zostały wdrożone.
2.  Jeśli wykonywanym kodem operacji jest [`REVERT`](https://www.evm.codes/#fd), nowy stan jest taki sam jak stary stan, a część gazu zostaje utracona.
3.  Jeśli sekwencja operacji jest zakończona, co sygnalizuje [`RETURN`](https://www.evm.codes/#f3)), stan jest aktualizowany do nowego stanu.
4.  Jeśli nie znajdujemy się w żadnym z warunków końcowych 1-3, kontynuuj działanie.
## 9.4.1 Stan maszyny {#941-machine-state}

Ta sekcja wyjaśnia stan maszyny bardziej szczegółowo. Określa, że _w_ to bieżący kod operacji. Jeśli _μ<sub>pc</sub>_ jest mniejsze niż _||I<sub>b</sub>||_, długość kodu, to ten bajt (_I<sub>b</sub>[μ<sub>pc</sub>]_) jest kodem operacji. W przeciwnym razie kod operacji jest zdefiniowany jako [`STOP`](https://www.evm.codes/#00).

Ponieważ jest to [maszyna stosowa](https://en.wikipedia.org/wiki/Stack_machine), musimy śledzić liczbę elementów zdjętych (_δ_) i odłożonych (_α_) przez każdy kod operacji.

## 9.4.2 Wyjątkowe zatrzymanie

Ta sekcja definiuje funkcję _Z_, która określa, kiedy mamy do czynienia z nieprawidłowym zakończeniem. Jest to funkcja [logiczna (Boolean)](https://en.wikipedia.org/wiki/Boolean_data_type), więc używa [_∨_ dla logicznego lub](https://en.wikipedia.org/wiki/Logical_disjunction) oraz [_∧_ dla logicznego i](https://en.wikipedia.org/wiki/Logical_conjunction).

Mamy wyjątkowe zatrzymanie, jeśli którykolwiek z tych warunków jest prawdziwy:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Jak widzieliśmy w sekcji 9.2, _C_ to funkcja określająca koszt gazu. Nie ma wystarczającej ilości gazu, aby pokryć następny kod operacji.

- **_δ<sub>w</sub>=∅_**
  Jeśli liczba elementów zdjętych ze stosu dla kodu operacji jest niezdefiniowana, to sam kod operacji jest niezdefiniowany.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Niedomiar stosu (stack underflow), niewystarczająca liczba elementów na stosie dla bieżącego kodu operacji.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Kodem operacji jest [`JUMP`](https://www.evm.codes/#56), a adres nie jest [`JUMPDEST`](https://www.evm.codes/#5b). Skoki są ważne _tylko_ wtedy, gdy miejscem docelowym jest [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Kodem operacji jest [`JUMPI`](https://www.evm.codes/#57), warunek jest prawdziwy (niezerowy), więc skok powinien nastąpić, a adres nie jest [`JUMPDEST`](https://www.evm.codes/#5b). Skoki są ważne _tylko_ wtedy, gdy miejscem docelowym jest [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Kodem operacji jest [`RETURNDATACOPY`](https://www.evm.codes/#3e). W tym kodzie operacji element stosu _μ<sub>s</sub>[1]_ to przesunięcie (offset), od którego należy czytać w buforze zwracanych danych, a element stosu _μ<sub>s</sub>[2]_ to długość danych. Ten warunek występuje, gdy próbujesz czytać poza końcem bufora zwracanych danych. Zauważ, że nie ma podobnego warunku dla danych wywołania (calldata) ani dla samego kodu. Kiedy próbujesz czytać poza końcem tych buforów, po prostu otrzymujesz zera.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Przepełnienie stosu. Jeśli uruchomienie kodu operacji spowoduje powstanie stosu o wielkości ponad 1024 elementów, przerwij.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Czy działamy statycznie ([¬ to negacja](https://en.wikipedia.org/wiki/Negation), a _I<sub>w</sub>_ jest prawdziwe, gdy mamy pozwolenie na zmianę stanu blockchaina)? Jeśli tak, a próbujemy wykonać operację zmieniającą stan, nie może się to wydarzyć.

  Funkcja _W(w,μ)_ jest zdefiniowana później w równaniu 159. _W(w,μ)_ jest prawdziwe, jeśli jeden z tych warunków jest prawdziwy:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Te kody operacji zmieniają stan, tworząc nowy kontrakt, przechowując wartość lub niszcząc bieżący kontrakt.

  - **_LOG0≤w ∧ w≤LOG4_**
    Jeśli jesteśmy wywoływani statycznie, nie możemy emitować wpisów logów.
    Wszystkie kody operacji logów znajdują się w przedziale od [`LOG0` (A0)](https://www.evm.codes/#a0) do [`LOG4` (A4)](https://www.evm.codes/#a4).
    Liczba po kodzie operacji logu określa, ile tematów (topics) zawiera wpis logu.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Możesz wywołać inny kontrakt, gdy jesteś statyczny, ale jeśli to zrobisz, nie możesz przetransferować do niego ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Nie możesz uruchomić [`SSTORE`](https://www.evm.codes/#55), chyba że masz więcej niż G<sub>callstipend</sub> (zdefiniowane jako 2300 w Dodatku G) gazu.
## 9.4.3 Ważność miejsca docelowego skoku

Tutaj formalnie definiujemy, czym są kody operacji [`JUMPDEST`](https://www.evm.codes/#5b). Nie możemy po prostu szukać wartości bajtu 0x5B, ponieważ może on znajdować się wewnątrz PUSH (i w związku z tym być danymi, a nie kodem operacji).

W równaniu (162) definiujemy funkcję _N(i,w)_. Pierwszy parametr, _i_, to lokalizacja kodu operacji. Drugi, _w_, to sam kod operacji. Jeśli _w∈[PUSH1, PUSH32]_, oznacza to, że kodem operacji jest PUSH (nawiasy kwadratowe definiują przedział, który obejmuje punkty końcowe). W takim przypadku następny kod operacji znajduje się pod adresem _i+2+(w−PUSH1)_. Dla [`PUSH1`](https://www.evm.codes/#60) musimy przesunąć się o dwa bajty (sam PUSH i jednobajtowa wartość), dla [`PUSH2`](https://www.evm.codes/#61) musimy przesunąć się o trzy bajty, ponieważ jest to wartość dwubajtowa itp. Wszystkie inne kody operacji EVM mają długość tylko jednego bajtu, więc we wszystkich innych przypadkach _N(i,w)=i+1_.

Ta funkcja jest używana w równaniu (161) do zdefiniowania _D<sub>J</sub>(c,i)_, co jest [zbiorem](<https://en.wikipedia.org/wiki/Set_(mathematics)>) wszystkich ważnych miejsc docelowych skoku w kodzie _c_, zaczynając od lokalizacji kodu operacji _i_. Ta funkcja jest zdefiniowana rekurencyjnie. Jeśli _i≥||c||_, oznacza to, że jesteśmy na końcu lub za końcem kodu. Nie znajdziemy już więcej miejsc docelowych skoku, więc po prostu zwracamy zbiór pusty.

We wszystkich innych przypadkach patrzymy na resztę kodu, przechodząc do następnego kodu operacji i pobierając zbiór zaczynający się od niego. _c[i]_ to bieżący kod operacji, więc _N(i,c[i])_ to lokalizacja następnego kodu operacji. _D<sub>J</sub>(c,N(i,c[i]))_ to zatem zbiór ważnych miejsc docelowych skoku, który zaczyna się od następnego kodu operacji. Jeśli bieżący kod operacji nie jest `JUMPDEST`, po prostu zwróć ten zbiór. Jeśli jest to `JUMPDEST`, dołącz go do zbioru wynikowego i zwróć go.
## 9.4.4 Normalne zatrzymanie {#944-normal-halt}

Funkcja zatrzymania _H_ może zwracać trzy typy wartości.

- Jeśli nie jesteśmy w kodzie operacji zatrzymania, zwróć _∅_, zbiór pusty. Zgodnie z konwencją, ta wartość jest interpretowana jako logiczny fałsz.
- Jeśli mamy kod operacji zatrzymania, który nie generuje wyjścia (albo [`STOP`](https://www.evm.codes/#00), albo [`SELFDESTRUCT`](https://www.evm.codes/#ff)), zwróć sekwencję o rozmiarze zero bajtów jako wartość zwracaną. Zauważ, że bardzo różni się to od zbioru pustego. Ta wartość oznacza, że EVM naprawdę się zatrzymała, po prostu nie ma żadnych zwracanych danych do odczytania.
- Jeśli mamy kod operacji zatrzymania, który generuje wyjście (albo [`RETURN`](https://www.evm.codes/#f3), albo [`REVERT`](https://www.evm.codes/#fd)), zwróć sekwencję bajtów określoną przez ten kod operacji. Ta sekwencja jest pobierana z pamięci, wartość na szczycie stosu (_μ<sub>s</sub>[0]_) to pierwszy bajt, a wartość po niej (_μ<sub>s</sub>[1]_) to długość.

## H.2 Zestaw instrukcji

Zanim przejdziemy do ostatniej podsekcji EVM, 9.5, przyjrzyjmy się samym instrukcjom. Są one zdefiniowane w Dodatku H.2, który zaczyna się na str. 30. Oczekuje się, że wszystko, co nie zostało określone jako zmieniające się wraz z tym konkretnym kodem operacji, pozostanie takie samo. Zmienne, które ulegają zmianie, są określone jako \<coś\>′.

Na przykład spójrzmy na kod operacji [`ADD`](https://www.evm.codes/#01).

| Wartość | Mnemonik | δ   | α   | Opis                                                      |
| ------: | -------- | --- | --- | --------------------------------------------------------- |
|    0x01 | ADD      | 2   | 1   | Operacja dodawania.                                       |
|         |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ to liczba wartości, które zdejmujemy ze stosu. W tym przypadku dwie, ponieważ dodajemy dwie górne wartości.

_α_ to liczba wartości, które odkładamy z powrotem. W tym przypadku jedna, suma.

Zatem nowy szczyt stosu (_μ′<sub>s</sub>[0]_) to suma starego szczytu stosu (_μ<sub>s</sub>[0]_) i starej wartości pod nim (_μ<sub>s</sub>[1]_).

Zamiast przeglądać wszystkie kody operacji w postaci nużącej listy, ten artykuł wyjaśnia tylko te kody operacji, które wprowadzają coś nowego.

| Wartość | Mnemonik  | δ   | α   | Opis                                                                                                       |
| ------: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256 | 2   | 1   | Oblicz hash Keccak-256.                                                                                    |
|         |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Jest to pierwszy kod operacji, który uzyskuje dostęp do pamięci (w tym przypadku tylko do odczytu). Może on jednak wykraczać poza obecne granice pamięci, więc musimy zaktualizować _μ<sub>i</sub>._ Robimy to za pomocą funkcji _M_ zdefiniowanej w równaniu 330 na str. 30.

| Wartość | Mnemonik | δ   | α   | Opis                               |
| ------: | -------- | --- | --- | ---------------------------------- |
|    0x31 | BALANCE  | 1   | 1   | Pobierz saldo podanego konta.      |
|         |          |     |     | ...                                |

Adres, którego saldo musimy znaleźć, to _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Szczyt stosu to adres, ale ponieważ adresy mają tylko 160 bitów, obliczamy wartość [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Jeśli _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, oznacza to, że istnieją informacje o tym adresie. W takim przypadku _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ to saldo dla tego adresu. Jeśli _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, oznacza to, że ten adres jest niezainicjowany, a saldo wynosi zero. Listę pól informacji o koncie można zobaczyć w sekcji 4.1 na str. 4.

Drugie równanie, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, jest związane z różnicą w kosztach między dostępem do ciepłej pamięci masowej (pamięci masowej, do której niedawno uzyskano dostęp i która prawdopodobnie znajduje się w pamięci podręcznej) a zimnej pamięci masowej (pamięci masowej, do której nie uzyskano dostępu i która prawdopodobnie znajduje się w wolniejszej pamięci masowej, której pobranie jest droższe). _A<sub>a</sub>_ to lista adresów, do których transakcja uzyskała wcześniej dostęp, a zatem dostęp do nich powinien być tańszy, jak zdefiniowano w sekcji 6.1 na str. 9. Możesz przeczytać więcej na ten temat w [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Wartość | Mnemonik | δ   | α   | Opis                                    |
| ------: | -------- | --- | --- | --------------------------------------- |
|    0x8F | DUP16    | 16  | 17  | Zduplikuj 16. element stosu.            |
|         |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Zauważ, że aby użyć dowolnego elementu stosu, musimy go zdjąć, co oznacza, że musimy również zdjąć wszystkie elementy stosu znajdujące się nad nim. W przypadku [`DUP<n>`](https://www.evm.codes/#8f) i [`SWAP<n>`](https://www.evm.codes/#9f) oznacza to konieczność zdjęcia, a następnie odłożenia do szesnastu wartości.
## 9.5 Cykl wykonania

Teraz, gdy mamy już wszystkie części, możemy wreszcie zrozumieć, jak udokumentowany jest cykl wykonania EVM.

Równanie (164) mówi, że biorąc pod uwagę stan:

- _σ_ (globalny stan blockchaina)
- _μ_ (stan EVM)
- _A_ (podstan, zmiany, które mają nastąpić po zakończeniu transakcji)
- _I_ (środowisko wykonawcze)

Nowy stan to _(σ', μ', A', I')_.

Równania (165)-(167) definiują stos i jego zmianę spowodowaną kodem operacji (_μ<sub>s</sub>_). Równanie (168) to zmiana gazu (_μ<sub>g</sub>_). Równanie (169) to zmiana licznika programu (_μ<sub>pc</sub>_). Wreszcie równania (170)-(173) określają, że pozostałe parametry pozostają takie same, chyba że zostaną wyraźnie zmienione przez kod operacji.

Dzięki temu EVM jest w pełni zdefiniowana.
## Wnioski {#conclusion}

Notacja matematyczna jest precyzyjna i pozwoliła żółtej księdze określić każdy szczegół Ethereum. Ma jednak pewne wady:

- Może być zrozumiana tylko przez ludzi, co oznacza, że [testy zgodności](https://github.com/ethereum/tests) muszą być pisane ręcznie.
- Programiści rozumieją kod komputerowy.
  Mogą, ale nie muszą rozumieć notacji matematycznej.

Być może z tych powodów nowsze [specyfikacje warstwy konsensusu](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) są napisane w języku Python. Istnieją [specyfikacje warstwy wykonawczej w języku Python](https://ethereum.github.io/execution-specs), ale nie są one kompletne. Dopóki cała żółta księga nie zostanie również przetłumaczona na język Python lub podobny, żółta księga będzie nadal w użyciu i warto umieć ją czytać.
