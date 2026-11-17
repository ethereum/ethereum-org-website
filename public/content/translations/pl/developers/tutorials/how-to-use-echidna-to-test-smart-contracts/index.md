---
title: "Jak używać Echidny do testowania inteligentnych kontraktów"
description: "Jak używać Echidny do automatycznego testowania inteligentnych kontraktów"
author: "Trailofbits"
lang: pl
tags: ["Solidity", "inteligentne kontrakty", "bezpieczeństwo", "testowanie", "fuzzing"]
skill: advanced
breadcrumb: Echidna
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalacja {#installation}

Echidnę można zainstalować za pomocą Dockera, Homebrew lub używając prekompilowanego pliku binarnego. Przykłady w tym samouczku były testowane z Echidną 2.3.3 i solc 0.8.37.

### Echidna przez Dockera {#echidna-through-docker}

```sh
docker pull ghcr.io/crytic/echidna/echidna:latest
docker run --rm -it -v "$PWD":/src ghcr.io/crytic/echidna/echidna:latest
```

_Ostatnie polecenie uruchamia obraz Echidny w Dockerze, który ma dostęp do Twojego bieżącego katalogu. Możesz zmieniać pliki na swoim hoście i uruchamiać narzędzia na plikach z poziomu Dockera. Obraz zawiera również [Slither](https://github.com/crytic/slither), [crytic-compile](https://github.com/crytic/crytic-compile) oraz [solc-select](https://github.com/crytic/solc-select)._

Wewnątrz Dockera uruchom:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
cd /src
```

### Plik binarny {#binary}

Pobierz najnowszą wersję dla swojej platformy z [https://github.com/crytic/echidna/releases/latest](https://github.com/crytic/echidna/releases/latest). W systemach macOS lub Linux możesz również uruchomić `brew install echidna`, co zainstaluje wraz z nią Slither i crytic-compile.

Używając wydanego pliku binarnego, zainstaluj [Slither](https://github.com/crytic/slither) i [solc-select](https://github.com/crytic/solc-select) samodzielnie (na przykład `pip3 install slither-analyzer solc-select` w środowisku wirtualnym języka Python) i wybierz wersję kompilatora:

```sh
solc-select install 0.8.37
solc-select use 0.8.37
```

Echidna działa bez Slithera, ale Slither wyodrębnia stałe, takie jak magiczne liczby używane w instrukcjach `require`, a kilka poniższych przykładów zależy od niego, aby szybko znajdować błędy.

## Wprowadzenie do fuzzingu opartego na właściwościach {#introduction-to-property-based-fuzzing}

Echidna to fuzzer oparty na właściwościach, który opisaliśmy w naszych poprzednich wpisach na blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) to dobrze znana technika w społeczności zajmującej się bezpieczeństwem. Polega na generowaniu mniej lub bardziej losowych danych wejściowych w celu znalezienia błędów w programie. Fuzzery dla tradycyjnego oprogramowania (takie jak [AFL](http://lcamtuf.coredump.cx/afl/) lub [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) są znane jako wydajne narzędzia do znajdowania błędów.

Poza czysto losowym generowaniem danych wejściowych, istnieje wiele technik i strategii generowania dobrych danych wejściowych, w tym:

- Uzyskiwanie informacji zwrotnych z każdego wykonania i kierowanie generowaniem za ich pomocą. Na przykład, jeśli nowo wygenerowane dane wejściowe prowadzą do odkrywania nowej ścieżki, sensowne może być wygenerowanie nowych danych wejściowych zbliżonych do nich.
- Generowanie danych wejściowych z uwzględnieniem ograniczeń strukturalnych. Na przykład, jeśli dane wejściowe zawierają nagłówek z sumą kontrolną, sensowne będzie pozwolenie fuzzerowi na generowanie danych wejściowych walidujących tę sumę kontrolną.
- Używanie znanych danych wejściowych do generowania nowych: jeśli masz dostęp do dużego zbioru prawidłowych danych wejściowych, Twój fuzzer może generować z nich nowe dane wejściowe, zamiast zaczynać ich generowanie od zera. Są one zazwyczaj nazywane _ziarnami_ (ang. seeds).

### Fuzzing oparty na właściwościach {#property-based-fuzzing}

Echidna należy do specyficznej rodziny fuzzerów: fuzzingu opartego na właściwościach, silnie zainspirowanego przez [QuickCheck](https://wikipedia.org/wiki/QuickCheck). W przeciwieństwie do klasycznego fuzzera, który będzie próbował znaleźć awarie, Echidna będzie próbowała złamać zdefiniowane przez użytkownika niezmienniki.

W inteligentnych kontraktach niezmienniki to funkcje Solidity, które mogą reprezentować dowolny nieprawidłowy lub nieważny stan, jaki kontrakt może osiągnąć, w tym:

- Nieprawidłowa kontrola dostępu: atakujący stał się właścicielem kontraktu.
- Nieprawidłowa maszyna stanu: tokeny mogą być przesyłane, podczas gdy kontrakt jest wstrzymany.
- Nieprawidłowa arytmetyka: użytkownik może spowodować niedomiar (underflow) swojego salda i uzyskać nieograniczoną liczbę darmowych tokenów.

### Testowanie właściwości za pomocą Echidny {#testing-a-property-with-echidna}

Zobaczymy, jak przetestować inteligentny kontrakt za pomocą Echidny. Celem jest następujący inteligentny kontrakt [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    function airdrop() public {
        balances[msg.sender] = 1000;
    }

    function consume() public {
        require(balances[msg.sender] > 0);
        balances[msg.sender] -= 1;
    }

    function backdoor() public {
        balances[msg.sender] += 1;
    }
}
```

Założymy, że ten token musi mieć następujące właściwości:

- Każdy może mieć maksymalnie 1000 tokenów
- Token nie może być przesyłany (nie jest to token ERC-20)

### Pisanie właściwości {#write-a-property}

Właściwości Echidny to funkcje Solidity. Właściwość musi:

- Nie mieć argumentów
- Zwracać `true`, jeśli zakończy się sukcesem
- Mieć nazwę zaczynającą się od `echidna`

Echidna będzie:

- Automatycznie generować dowolne transakcje w celu przetestowania właściwości.
- Zgłaszać wszelkie transakcje prowadzące do zwrócenia przez właściwość `false` lub wyrzucenia błędu.
- Odrzucać efekty uboczne podczas wywoływania właściwości (tj. jeśli właściwość zmienia zmienną stanu, jest to odrzucane po teście)

Poniższa właściwość sprawdza, czy wywołujący nie ma więcej niż 1000 tokenów:

```solidity
function echidna_balance_under_1000() public view returns (bool) {
    return balances[msg.sender] <= 1000;
}
```

Użyj dziedziczenia, aby oddzielić swój kontrakt od swoich właściwości:

```solidity
contract TestToken is Token {
    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

[`testtoken.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/testtoken.sol) implementuje właściwość i dziedziczy po tokenie.

### Inicjowanie kontraktu {#initiate-a-contract}

Echidna potrzebuje [konstruktora](/developers/docs/smart-contracts/anatomy/#constructor-functions) bez argumentów. Jeśli Twój kontrakt wymaga specyficznej inicjalizacji, musisz to zrobić w konstruktorze.

W Echidnie istnieją pewne specyficzne adresy:

- `0x30000`, który wywołuje konstruktor.
- `0x10000`, `0x20000` oraz `0x30000`, które losowo wywołują inne funkcje.
- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, gdzie wdrażany jest testowany kontrakt.

W naszym obecnym przykładzie nie potrzebujemy żadnej szczególnej inicjalizacji, w związku z czym nasz konstruktor jest pusty.

### Uruchamianie Echidny {#run-echidna}

Echidnę uruchamia się za pomocą:

```sh
echidna contract.sol
```

Jeśli contract.sol zawiera wiele kontraktów, możesz określić cel:

```sh
echidna contract.sol --contract MyContract
```

Po uruchomieniu w terminalu Echidna wyświetla interaktywny interfejs użytkownika. Dodaj `--format text`, aby uzyskać zwykły tekst wyjściowy, jak w poniższych przykładach.

### Podsumowanie: Testowanie właściwości {#summary-testing-a-property}

Poniżej znajduje się podsumowanie uruchomienia Echidny na naszym przykładzie:

```solidity
contract TestToken is Token {
    constructor() {}

    function echidna_balance_under_1000() public view returns (bool) {
        return balances[msg.sender] <= 1000;
    }
}
```

```sh
echidna testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence:
    TestToken.airdrop()
    TestToken.backdoor()

...
```

Echidna odkryła, że właściwość jest naruszana, jeśli wywołana zostanie funkcja `backdoor`.

## Filtrowanie funkcji do wywołania podczas kampanii fuzzingowej {#filtering-functions-to-call-during-a-fuzzing-campaign}

Zobaczymy, jak filtrować funkcje poddawane fuzzingowi.
Celem jest następujący inteligentny kontrakt:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool state1 = false;
    bool state2 = false;
    bool state3 = false;
    bool state4 = false;

    function f(uint256 x) public {
        require(x == 12);
        state1 = true;
    }

    function g(uint256 x) public {
        require(state1);
        require(x == 8);
        state2 = true;
    }

    function h(uint256 x) public {
        require(state2);
        require(x == 42);
        state3 = true;
    }

    function i() public {
        require(state3);
        state4 = true;
    }

    function reset1() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function reset2() public {
        state1 = false;
        state2 = false;
        state3 = false;
        return;
    }

    function echidna_state4() public view returns (bool) {
        return (!state4);
    }
}
```

Ten mały przykład zmusza Echidnę do znalezienia określonej sekwencji transakcji w celu zmiany zmiennej stanu.
Jest to trudne dla fuzzera.
Możemy uruchomić Echidnę, aby to zweryfikować:

```sh
echidna multi.sol
...
echidna_state4: passing
...
```

### Filtrowanie funkcji {#filtering-functions}

Echidna ma problemy ze znalezieniem prawidłowej sekwencji do przetestowania tego kontraktu, ponieważ dwie funkcje resetujące (`reset1` i `reset2`) ustawią wszystkie zmienne stanu na `false`.
Możemy jednak użyć specjalnej funkcji Echidny, aby dodać funkcję resetującą do czarnej listy lub dodać do białej listy tylko funkcje `f`, `g`,
`h` i `i`.

Aby dodać funkcje do czarnej listy, możemy użyć tego pliku konfiguracyjnego:

```yaml
filterBlacklist: true
filterFunctions: ["C.reset1()", "C.reset2()"]
```

Innym podejściem do filtrowania funkcji jest wypisanie funkcji z białej listy. Aby to zrobić, możemy użyć tego pliku konfiguracyjnego:

```yaml
filterBlacklist: false
filterFunctions: ["C.f(uint256)", "C.g(uint256)", "C.h(uint256)", "C.i()"]
```

- `filterBlacklist` jest domyślnie ustawione na `true`.
- Filtrowanie jest wykonywane na pełnej nazwie funkcji: nazwie kontraktu, `.` oraz podpisie binarnego interfejsu aplikacji (ABI) (na przykład `C.f(uint256)`). Jeśli masz `f()` i `f(uint256)`, możesz dokładnie wybrać, którą z nich filtrować. Sama nazwa, taka jak `"reset1"`, nie pasuje do niczego.

### Uruchamianie Echidny {#run-echidna-1}

Aby uruchomić Echidnę z plikiem konfiguracyjnym `blacklist.yaml`:

```sh
echidna multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    C.f(12)
    C.g(8)
    C.h(42)
    C.i()
```

Echidna niemal natychmiast znajdzie sekwencję transakcji falsyfikującą właściwość.

### Podsumowanie: Filtrowanie funkcji {#summary-filtering-functions}

Echidna może dodawać funkcje do czarnej lub białej listy w celu ich wywołania podczas kampanii fuzzingowej, używając:

```yaml
filterBlacklist: true
filterFunctions: ["C.f1()", "C.f2()", "C.f3()"]
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna rozpoczyna kampanię fuzzingową, dodając do czarnej listy `C.f1()`, `C.f2()` i `C.f3()` lub wywołując tylko je, w zależności od wartości logicznej `filterBlacklist`.

## Jak testować asercję Solidity za pomocą Echidny {#how-to-test-soliditys-assert-with-echidna}

W tym krótkim samouczku pokażemy, jak używać Echidny do testowania sprawdzania asercji w kontraktach. Załóżmy, że mamy taki kontrakt:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        // tmp <= counter
        return (counter - tmp);
    }
}
```

Od wersji Solidity 0.8 przepełnienia arytmetyczne domyślnie powodują wycofanie. Blok `unchecked` przywraca zachowanie zawijania (wrapping), dzięki czemu `counter` może ulec przepełnieniu, co jest błędem, który chcemy, aby Echidna znalazła.

### Pisanie asercji {#write-an-assertion}

Chcemy upewnić się, że `tmp` jest mniejsze lub równe `counter` po zwróceniu ich różnicy. Moglibyśmy napisać właściwość Echidny, ale musielibyśmy gdzieś przechowywać wartość `tmp`. Zamiast tego moglibyśmy użyć takiej asercji:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

### Uruchamianie Echidny {#run-echidna-2}

Aby włączyć testowanie niepowodzeń asercji, przekaż `--test-mode assertion` w wierszu poleceń lub utwórz [plik konfiguracyjny Echidny](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
testMode: assertion
```

Kiedy uruchomimy ten kontrakt w Echidnie, otrzymamy oczekiwane wyniki:

```sh
echidna assert.sol --config config.yaml
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Jak widać, Echidna zgłasza pewne niepowodzenie asercji w funkcji `inc`. Dodanie więcej niż jednej asercji na funkcję jest możliwe, ale Echidna nie potrafi określić, która asercja zawiodła.

### Kiedy i jak używać asercji {#when-and-how-use-assertions}

Asercje mogą być używane jako alternatywy dla jawnych właściwości, zwłaszcza jeśli warunki do sprawdzenia są bezpośrednio związane z prawidłowym użyciem jakiejś operacji `f`. Dodanie asercji po pewnym kodzie wymusi, że sprawdzenie nastąpi natychmiast po jego wykonaniu:

```solidity
function f(..) public {
    // jakiś skomplikowany kod
    ...
    assert (condition);
    ...
}

```

Z drugiej strony, użycie jawnej właściwości Echidny spowoduje losowe wykonywanie transakcji i nie ma łatwego sposobu na wymuszenie dokładnego momentu jej sprawdzenia. Nadal możliwe jest zastosowanie tego obejścia:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Istnieją jednak pewne problemy:

- Zawodzi, jeśli `f` jest zadeklarowane jako `internal` lub `external`.
- Nie jest jasne, jakich argumentów należy użyć do wywołania `f`.
- Jeśli `f` zostanie wycofana, właściwość zawiedzie.

Ogólnie rzecz biorąc, zalecamy przestrzeganie [zaleceń Johna Regehra](https://blog.regehr.org/archives/1091) dotyczących sposobu używania asercji:

- Nie wymuszaj żadnych efektów ubocznych podczas sprawdzania asercji. Na przykład: `assert(ChangeStateAndReturn() == 1)`
- Nie używaj asercji dla oczywistych stwierdzeń. Na przykład `assert(var >= 0)`, gdzie `var` jest zadeklarowane jako `uint`.

Na koniec, proszę **nie używać** `require` zamiast `assert`, ponieważ Echidna nie będzie w stanie tego wykryć (ale kontrakt i tak zostanie wycofany).

### Podsumowanie: Sprawdzanie asercji {#summary-assertion-checking}

Poniżej znajduje się podsumowanie uruchomienia Echidny na naszym przykładzie:

```solidity
contract Incrementor {
    uint256 private counter = 2 ** 200;

    function inc(uint256 val) public returns (uint256) {
        uint256 tmp = counter;
        unchecked {
            counter += val;
        }
        assert(tmp <= counter);
        return (counter - tmp);
    }
}
```

```sh
echidna assert.sol --test-mode assertion
...
inc(uint256): failed!💥
  Call sequence:
    Incrementor.inc(49775183111401053618147883626307284970293609617350871827880350793793149469639)
    Incrementor.inc(5144534562104187441558356530962235826491531939599480973208359850367425338350)
    Incrementor.inc(60872766323599926080006863949466160074900015204811509590967924145028961380449)
...
```

Echidna odkryła, że asercja w `inc` może zawieść, jeśli ta funkcja zostanie wywołana wielokrotnie z dużymi argumentami.

## Zbieranie i modyfikowanie korpusu Echidny {#collecting-and-modifying-an-echidna-corpus}

Zobaczymy, jak zebrać i użyć korpusu transakcji za pomocą Echidny. Celem jest następujący inteligentny kontrakt [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    bool value_found = false;

    function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
        require(magic_1 == 42);
        require(magic_2 == 129);
        require(magic_3 == magic_4 + 333);
        value_found = true;
        return;
    }

    function echidna_magic_values() public view returns (bool) {
        return !value_found;
    }
}
```

Ten mały przykład zmusza Echidnę do znalezienia pewnych wartości w celu zmiany zmiennej stanu. Jest to trudne dla fuzzera.
Możemy uruchomić Echidnę, aby to zweryfikować:

```sh
echidna magic.sol
...

echidna_magic_values: passing
...
```

Niemniej jednak nadal możemy używać Echidny do zbierania korpusu podczas uruchamiania tej kampanii fuzzingowej.

### Zbieranie korpusu {#collecting-a-corpus}

Aby włączyć zbieranie korpusu, utwórz katalog korpusu:

```sh
mkdir corpus-magic
```

Oraz [plik konfiguracyjny Echidny](https://secure-contracts.com/program-analysis/echidna/configuration.html) `config.yaml`:

```yaml
corpusDir: "corpus-magic"
```

Teraz możemy uruchomić nasze narzędzie i sprawdzić zebrany korpus:

```sh
echidna magic.sol --config config.yaml
```

Echidna nadal nie może znaleźć prawidłowych magicznych wartości. Aby zobaczyć, gdzie utknęła, spójrz na raport pokrycia `corpus-magic/covered.*.txt`:

```text
7 | *   |     function magic(uint256 magic_1, uint256 magic_2, uint256 magic_3, uint256 magic_4) public {
  8 | *r  |         require(magic_1 == 42);
  9 | *r  |         require(magic_2 == 129);
 10 | *r  |         require(magic_3 == magic_4 + 333);
 11 |     |         value_found = true;
 12 |     |         return;
```

Etykieta `r` oznacza, że Echidna dotarła do tej linii, ale wykonanie zostało tam wycofane, a linie po ostatnim `require` nigdy nie są wykonywane.

Sekwencje transakcji zebrane przez Echidnę są przechowywane jako pliki JSON w `corpus-magic/coverage/`. Na przykład pierwsza transakcja jednego z tych plików to:

```json
[
  {
    "call": {
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639806"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "761"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "91238239174727894896282446013839801776340298206661877345279631871841712965531"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "115792089237316195423570985008687907853269984665640564039457584007913129639804"
            ],
            "tag": "AbiUInt"
          }
        ]
      ],
      "tag": "SolCall"
    },
    "delay": [
      "0x00000000000000000000000000000000000000000000000000000000000103ef",
      "0x000000000000000000000000000000000000000000000000000000000000d38b"
    ],
    "dst": "0x00a329c0648769A73afAc7F9381E08FB43dBEA72",
    "gas": 12500000,
    "gasprice": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "src": "0x0000000000000000000000000000000000020000",
    "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
  }
]
```

Oczywiście te dane wejściowe nie wywołają błędu w naszej właściwości. Jednak w następnym kroku zobaczymy, jak je zmodyfikować w tym celu.

### Zasilanie korpusu (seeding) {#seeding-a-corpus}

Echidna potrzebuje trochę pomocy, aby poradzić sobie z funkcją `magic`. Skopiujemy i zmodyfikujemy dane wejściowe, aby użyć dla niej odpowiednich parametrów (nazwy plików są losowe, więc użyj jednego z własnego katalogu `corpus-magic/coverage/`):

```sh
cp corpus-magic/coverage/249425678654647553.txt corpus-magic/coverage/new.txt
```

Zmodyfikujemy `new.txt` tak, aby zawierał pojedynczą transakcję wywołującą `magic(42,129,333,0)`. Teraz możemy ponownie uruchomić Echidnę:

```sh
echidna magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    C.magic(42,129,333,0)

...
```

Tym razem natychmiast odkryła, że właściwość jest naruszana.

## Znajdowanie transakcji o wysokim zużyciu gazu {#finding-transactions-with-high-gas-consumption}

Zobaczymy, jak znaleźć transakcje o wysokim zużyciu gazu za pomocą Echidny. Starsze wersje Echidny miały do tego opcję `estimateGas`; została ona usunięta w Echidnie 2.3.0. Zamiast tego mierzymy gaz za pomocą `gasleft()` i pozwalamy [trybowi optymalizacji](https://secure-contracts.com/program-analysis/echidna/advanced/optimization_mode.html) Echidny go zmaksymalizować. Celem jest następujący inteligentny kontrakt:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    uint256 state;

    function expensive(uint8 times) internal {
        for (uint8 i = 0; i < times; i++) {
            state = state + i;
        }
    }

    function f(uint256 x, uint256 y, uint8 times) public {
        if (x == 42 && y == 123) {
            expensive(times);
        } else {
            state = 0;
        }
    }
}
```

Tutaj `expensive` może mieć duże zużycie gazu.

### Pomiar zużycia gazu {#measuring-gas-consumption}

W trybie optymalizacji Echidna szuka funkcji zaczynających się od `echidna_`, które nie przyjmują argumentów i zwracają `int256`, a następnie próbuje znaleźć sekwencję transakcji, która maksymalizuje zwracaną wartość. Dodajemy kontrakt testowy, który wywołuje `f`, rejestruje zużyty gaz i eksponuje maksimum (zapisz oba kontrakty w `gas.sol`):

```solidity
contract TestGas is C {
    int256 maxGasUsed;

    function measureF(uint256 x, uint256 y, uint8 times) public {
        uint256 start = gasleft();
        f(x, y, times);
        int256 used = int256(start - gasleft());
        if (used > maxGasUsed) {
            maxGasUsed = used;
        }
    }

    function echidna_opt_gas_f() public view returns (int256) {
        return maxGasUsed;
    }
}
```

Aby włączyć tryb optymalizacji, utwórz plik konfiguracyjny `config.yaml`. W tym przykładzie zmniejszymy również rozmiar sekwencji transakcji, aby wyniki były łatwiejsze do zrozumienia:

```yaml
testMode: optimization
seqLen: 2
```

### Uruchamianie Echidny {#run-echidna-3}

Gdy mamy już utworzony plik konfiguracyjny, możemy uruchomić Echidnę w ten sposób:

```sh
echidna gas.sol --contract TestGas --config config.yaml
...
echidna_opt_gas_f: max value: 127128

  Call sequence:
    TestGas.measureF(42,123,223)

...
```

- Pokazany gaz jest mierzony przez implementację Maszyny Wirtualnej Ethereum (EVM), na której działa Echidna, [hevm](https://github.com/argotorg/hevm), i obejmuje narzut wewnętrznego wywołania z `measureF`.
- Maksimum nie jest unikalne: każda kampania jest losowa, a dłuższe kampanie (na przykład `--test-limit 200000`) mają tendencję do znajdowania większych wartości.

### Filtrowanie wywołań zmniejszających zużycie gazu {#filtering-out-gas-reducing-calls}

Powyższy samouczek dotyczący **filtrowania funkcji do wywołania podczas kampanii fuzzingowej** pokazuje, jak usunąć niektóre funkcje z testowania.  
Może to mieć kluczowe znaczenie dla uzyskania dokładnego oszacowania gazu.
Rozważmy następujący przykład:

```solidity
// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.0;

contract C {
    address[] addrs;

    function push(address a) public {
        addrs.push(a);
    }

    function pop() public {
        addrs.pop();
    }

    function clear() public {
        delete addrs;
    }

    function check() public {
        for (uint256 i = 0; i < addrs.length; i++)
            for (uint256 j = i + 1; j < addrs.length; j++)
                if (addrs[i] == addrs[j]) addrs[j] = address(0x0);
    }

    function echidna_opt_gas_check() public returns (int256) {
        uint256 start = gasleft();
        check();
        return int256(start - gasleft());
    }
}
```

`echidna_opt_gas_check` wywołuje `check` i zwraca jego koszt w gazie. Podobnie jak w przypadku każdej funkcji testowej Echidny, jej zmiany stanu są następnie odrzucane.

Jeśli Echidna może wywołać wszystkie funkcje, nie znajdzie łatwo transakcji o wysokim koszcie gazu:

```sh
echidna pushpop.sol --test-mode optimization
...
echidna_opt_gas_check: max value: 265706
...
```

Dzieje się tak, ponieważ koszt zależy od rozmiaru `addrs`, a losowe wywołania mają tendencję do pozostawiania tablicy prawie pustej.
Dodanie do czarnej listy `pop` i `clear` daje nam jednak znacznie lepsze wyniki:

```yaml
testMode: optimization
filterBlacklist: true
filterFunctions: ["C.pop()", "C.clear()"]
```

```sh
echidna pushpop.sol --config config.yaml
...
echidna_opt_gas_check: max value: 2446228
...
```

Zmniejszanie sekwencji wywołań dla tego wyniku zajmuje kilka minut, ponieważ każde powtórzenie wywołuje kosztowną funkcję `check`.

### Podsumowanie: Znajdowanie transakcji o wysokim zużyciu gazu {#summary-finding-transactions-with-high-gas-consumption}

Echidna może znaleźć transakcje o wysokim zużyciu gazu, mierząc gaz za pomocą `gasleft()` w funkcji `echidna_`, która zwraca `int256`, i działając w trybie optymalizacji:

```yaml
testMode: optimization
```

```sh
echidna contract.sol --config config.yaml
...
```

Echidna zgłosi maksymalną znalezioną wartość i sekwencję transakcji, która ją wygenerowała, po zakończeniu kampanii fuzzingowej.
