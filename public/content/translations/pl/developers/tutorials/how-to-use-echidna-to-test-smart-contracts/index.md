---
title: "Jak używać Echidny do testowania inteligentnych kontraktów"
description: "Jak używać Echidny do automatycznego testowania inteligentnych kontraktów"
author: "Trailofbits"
lang: pl
tags:
  [
    "solidity",
    "smart kontrakty",
    "bezpieczeństwo",
    "testowanie",
    "fuzzing"
  ]
skill: advanced
published: 2020-04-10
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna
---

## Instalacja {#installation}

Echidnę można zainstalować za pomocą platformy Docker lub używając wstępnie skompilowanego pliku binarnego.

### Echidna przez platformę Docker {#echidna-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Ostatnie polecenie uruchamia eth-security-toolbox w dockerze, który ma dostęp do bieżącego katalogu. Możesz zmienić pliki z hosta i uruchomić narzędzia na plikach z dockera_

Wewnątrz Dockera uruchom:

```bash
solc-select 0.5.11
cd /home/training
```

### Plik binarny {#binary}

[https://github.com/crytic/echidna/releases/tag/v1.4.0.0](https://github.com/crytic/echidna/releases/tag/v1.4.0.0)

## Wprowadzenie do testowania opartego na właściwościach (fuzzing) {#introduction-to-property-based-fuzzing}

Echidna to fuzzer oparty na właściwościach, co opisaliśmy w naszych poprzednich wpisach na blogu ([1](https://blog.trailofbits.com/2018/03/09/echidna-a-smart-fuzzer-for-ethereum/), [2](https://blog.trailofbits.com/2018/05/03/state-machine-testing-with-echidna/), [3](https://blog.trailofbits.com/2020/03/30/an-echidna-for-all-seasons/)).

### Fuzzing {#fuzzing}

[Fuzzing](https://wikipedia.org/wiki/Fuzzing) to dobrze znana technika w społeczności zajmującej się bezpieczeństwem. Polega ona na generowaniu danych wejściowych, które są mniej lub bardziej losowe, w celu znalezienia błędów w programie. Fuzzery dla tradycyjnego oprogramowania (takie jak [AFL](http://lcamtuf.coredump.cx/afl/) lub [LibFuzzer](https://llvm.org/docs/LibFuzzer.html)) są znane jako wydajne narzędzia do znajdowania błędów.

Oprócz czysto losowego generowania danych wejściowych istnieje wiele technik i strategii generowania dobrych danych wejściowych, w tym:

- Uzyskiwanie informacji zwrotnej z każdego wykonania i wykorzystywanie jej do kierowania generowaniem. Na przykład, jeśli nowo wygenerowane dane wejściowe prowadzą do odkrycia nowej ścieżki, sensowne może być wygenerowanie nowych danych wejściowych zbliżonych do nich.
- Generowanie danych wejściowych z poszanowaniem ograniczeń strukturalnych. Na przykład, jeśli dane wejściowe zawierają nagłówek z sumą kontrolną, sensowne będzie pozwolić fuzzerowi na wygenerowanie danych wejściowych weryfikujących sumę kontrolną.
- Używanie znanych danych wejściowych do generowania nowych danych wejściowych: jeśli masz dostęp do dużego zbioru prawidłowych danych wejściowych, fuzzer może generować nowe dane wejściowe na ich podstawie, zamiast rozpoczynać generowanie od zera. Są one zwykle nazywane _ziarnami_ (_seeds_).

### Fuzzing oparty na właściwościach {#property-based-fuzzing}

Echidna należy do specyficznej rodziny fuzzerów: fuzzingu opartego na właściwościach, mocno inspirowanego [QuickCheck](https://wikipedia.org/wiki/QuickCheck). W przeciwieństwie do klasycznego fuzzera, który próbuje znaleźć awarie, Echidna próbuje złamać niezmienniki zdefiniowane przez użytkownika.

W inteligentnych kontraktach niezmienniki to funkcje Solidity, które mogą reprezentować dowolny nieprawidłowy lub nieważny stan, jaki kontrakt może osiągnąć, w tym:

- Nieprawidłowa kontrola dostępu: atakujący stał się właścicielem kontraktu.
- Nieprawidłowa maszyna stanu: tokeny mogą być transferowane, gdy kontrakt jest wstrzymany.
- Nieprawidłowa arytmetyka: użytkownik może spowodować niedomiar swojego salda i uzyskać nieograniczoną liczbę darmowych tokenów.

### Testowanie właściwości za pomocą Echidny {#testing-a-property-with-echidna}

Zobaczymy, jak testować inteligentny kontrakt za pomocą Echidny. Celem jest następujący inteligentny kontrakt [`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol):

```solidity
contract Token{
  mapping(address => uint) public balances;
  function airdrop() public{
      balances[msg.sender] = 1000;
  }
  function consume() public{
      require(balances[msg.sender]>0);
      balances[msg.sender] -= 1;
  }
  function backdoor() public{
      balances[msg.sender] += 1;
  }
}
```

Przyjmiemy założenie, że ten token musi mieć następujące właściwości:

- Każdy może mieć maksymalnie 1000 tokenów
- Token nie może być transferowany (nie jest to token ERC20)

### Napisz właściwość {#write-a-property}

Właściwości Echidny to funkcje Solidity. Właściwość musi:

- Nie mieć argumentów
- Zwracać `true` w przypadku powodzenia
- Mieć nazwę zaczynającą się od `echidna`

Echidna:

- Automatycznie generuje dowolne transakcje w celu przetestowania właściwości.
- Zgłaszać wszelkie transakcje, które powodują, że właściwość zwraca `false` lub zgłasza błąd.
- Odrzucać efekty uboczne podczas wywoływania właściwości (tzn. jeśli właściwość zmienia zmienną stanu, jest to odrzucane po teście)

Poniższa właściwość sprawdza, czy dzwoniący nie ma więcej niż 1000 tokenów:

```solidity
function echidna_balance_under_1000() public view returns(bool){
      return balances[msg.sender] <= 1000;
}
```

Użyj dziedziczenia, aby oddzielić swój kontrakt od właściwości:

```solidity
contract TestToken is Token{
      function echidna_balance_under_1000() public view returns(bool){
            return balances[msg.sender] <= 1000;
      }
  }
```

[`token.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/token.sol) implementuje właściwość i dziedziczy po tokenie.

### Inicjowanie kontraktu {#initiate-a-contract}

Echidna potrzebuje [konstruktora](/developers/docs/smart-contracts/anatomy/#constructor-functions) bez argumentów. Jeśli Twój kontrakt wymaga określonej inicjalizacji, musisz to zrobić w konstruktorze.

W Echidnie istnieją pewne specyficzne adresy:

- `0x00a329c0648769A73afAc7F9381E08FB43dBEA72`, który wywołuje konstruktor.
- `0x10000`, `0x20000` i `0x00a329C0648769a73afAC7F9381e08fb43DBEA70`, które losowo wywołują inne funkcje.

W naszym obecnym przykładzie nie potrzebujemy żadnej szczególnej inicjalizacji, w rezultacie nasz konstruktor jest pusty.

### Uruchom Echidnę {#run-echidna}

Echidnę uruchamia się za pomocą:

```bash
echidna-test contract.sol
```

Jeśli contract.sol zawiera wiele kontraktów, możesz określić cel:

```bash
echidna-test contract.sol --contract MyContract
```

### Podsumowanie: Testowanie właściwości {#summary-testing-a-property}

Poniżej podsumowano uruchomienie Echidny na naszym przykładzie:

```solidity
contract TestToken is Token{
    constructor() public {}
        function echidna_balance_under_1000() public view returns(bool){
          return balances[msg.sender] <= 1000;
        }
  }
```

```bash
echidna-test testtoken.sol --contract TestToken
...

echidna_balance_under_1000: failed!💥
  Call sequence, shrinking (1205/5000):
    airdrop()
    backdoor()

...
```

Echidna odkryła, że właściwość jest naruszana, jeśli wywołana zostanie funkcja `backdoor`.

## Filtrowanie funkcji do wywołania podczas kampanii fuzzingu {#filtering-functions-to-call-during-a-fuzzing-campaign}

Zobaczymy, jak filtrować funkcje, które mają być poddane fuzzingowi.
Celem jest następujący inteligentny kontrakt:

```solidity
contract C {
  bool state1 = false;
  bool state2 = false;
  bool state3 = false;
  bool state4 = false;

  function f(uint x) public {
    require(x == 12);
    state1 = true;
  }

  function g(uint x) public {
    require(state1);
    require(x == 8);
    state2 = true;
  }

  function h(uint x) public {
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

  function echidna_state4() public returns (bool) {
    return (!state4);
  }
}
```

Ten mały przykład zmusza Echidnę do znalezienia określonej sekwencji transakcji w celu zmiany zmiennej stanu.
Jest to trudne dla fuzzera (zaleca się użycie narzędzia do wykonywania symbolicznego, takiego jak [Manticore](https://github.com/trailofbits/manticore)).
Możemy uruchomić Echidnę, aby to zweryfikować:

```bash
echidna-test multi.sol
...
echidna_state4: passed! 🎉
Seed: -3684648582249875403
```

### Filtrowanie funkcji {#filtering-functions}

Echidna ma problemy ze znalezieniem prawidłowej sekwencji do przetestowania tego kontraktu, ponieważ dwie funkcje resetowania (`reset1` i `reset2`) ustawią wszystkie zmienne stanu na `false`.
Możemy jednak użyć specjalnej funkcji Echidny, aby dodać funkcje resetowania do czarnej listy lub dodać do białej listy tylko funkcje `f`, `g`,
`h` i `i`.

Aby dodać funkcje do czarnej listy, możemy użyć tego pliku konfiguracyjnego:

```yaml
filterBlacklist: true
filterFunctions: ["reset1", "reset2"]
```

Innym podejściem do filtrowania funkcji jest utworzenie listy dozwolonych funkcji (biała lista). Aby to zrobić, możemy użyć tego pliku konfiguracyjnego:

```yaml
filterBlacklist: false
filterFunctions: ["f", "g", "h", "i"]
```

- `filterBlacklist` jest domyślnie ustawiony na `true`.
- Filtrowanie odbywa się tylko po nazwie (bez parametrów). Jeśli masz `f()` i `f(uint256)`, filtr `"f"` będzie pasował do obu funkcji.

### Uruchom Echidnę {#run-echidna-1}

Aby uruchomić Echidnę z plikiem konfiguracyjnym `blacklist.yaml`:

```bash
echidna-test multi.sol --config blacklist.yaml
...
echidna_state4: failed!💥
  Call sequence:
    f(12)
    g(8)
    h(42)
    i()
```

Echidna niemal natychmiast znajdzie sekwencję transakcji falsyfikujących właściwość.

### Podsumowanie: Filtrowanie funkcji {#summary-filtering-functions}

Echidna może dodawać funkcje do czarnej lub białej listy, które mają być wywoływane podczas kampanii fuzzingu, używając:

```yaml
filterBlacklist: true
filterFunctions: ["f1", "f2", "f3"]
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Echidna rozpoczyna kampanię fuzzingu, dodając `f1`, `f2` i `f3` do czarnej listy lub wywołując tylko te funkcje, w zależności od wartości logicznej `filterBlacklist`.

## Jak testować asercję Solidity za pomocą Echidny {#how-to-test-soliditys-assert-with-echidna}

W tym krótkim samouczku pokażemy, jak używać Echidny do testowania sprawdzania asercji w kontraktach. Załóżmy, że mamy taki kontrakt:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    // tmp <= counter
    return (counter - tmp);
  }
}
```

### Napisz asercję {#write-an-assertion}

Chcemy się upewnić, że `tmp` jest mniejsze lub równe `counter` po zwróceniu ich różnicy. Moglibyśmy napisać właściwość Echidny, ale musielibyśmy gdzieś przechowywać wartość `tmp`. Zamiast tego moglibyśmy użyć takiej asercji:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

### Uruchom Echidnę {#run-echidna-2}

Aby włączyć testowanie niepowodzenia asercji, utwórz [plik konfiguracyjny Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
checkAsserts: true
```

Gdy uruchomimy ten kontrakt w Echidnie, uzyskamy oczekiwane wyniki:

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Jak widać, Echidna zgłasza błąd asercji w funkcji `inc`. Możliwe jest dodanie więcej niż jednej asercji na funkcję, ale Echidna nie jest w stanie stwierdzić, która asercja zawiodła.

### Kiedy i jak używać asercji {#when-and-how-use-assertions}

Asercje mogą być używane jako alternatywa dla jawnych właściwości, zwłaszcza jeśli warunki do sprawdzenia są bezpośrednio związane z prawidłowym użyciem jakiejś operacji `f`. Dodanie asercji po jakimś kodzie wymusi, że sprawdzenie nastąpi natychmiast po jego wykonaniu:

```solidity
function f(..) public {
    // some complex code
    ...
    assert (condition);
    ...
}

```

W przeciwieństwie do tego, użycie jawnej właściwości echidna będzie losowo wykonywać transakcje i nie ma łatwego sposobu, aby wymusić, kiedy dokładnie zostanie ona sprawdzona. Nadal można zastosować to obejście:

```solidity
function echidna_assert_after_f() public returns (bool) {
    f(..);
    return(condition);
}
```

Istnieją jednak pewne problemy:

- Kończy się niepowodzeniem, jeśli `f` jest zadeklarowane jako `internal` lub `external`.
- Nie jest jasne, jakich argumentów należy użyć do wywołania `f`.
- Jeśli `f` zostanie wycofane (revert), właściwość zakończy się niepowodzeniem.

Ogólnie rzecz biorąc, zalecamy stosowanie się do [zaleceń Johna Regehra](https://blog.regehr.org/archives/1091) dotyczących używania asercji:

- Nie wymuszaj żadnych efektów ubocznych podczas sprawdzania asercji. Na przykład: `assert(ChangeStateAndReturn() == 1)`
- Nie należy sprawdzać oczywistych stwierdzeń. Na przykład `assert(var >= 0)`, gdzie `var` jest zadeklarowane jako `uint`.

Na koniec, proszę, **nie używaj** `require` zamiast `assert`, ponieważ Echidna nie będzie w stanie tego wykryć (ale kontrakt i tak zostanie wycofany).

### Podsumowanie: Sprawdzanie asercji {#summary-assertion-checking}

Poniżej podsumowano uruchomienie Echidny na naszym przykładzie:

```solidity
contract Incrementor {
  uint private counter = 2**200;

  function inc(uint val) public returns (uint){
    uint tmp = counter;
    counter += val;
    assert (tmp <= counter);
    return (counter - tmp);
  }
}
```

```bash
echidna-test assert.sol --config config.yaml
Analyzing contract: assert.sol:Incrementor
assertion in inc: failed!💥
  Call sequence, shrinking (2596/5000):
    inc(21711016731996786641919559689128982722488122124807605757398297001483711807488)
    inc(7237005577332262213973186563042994240829374041602535252466099000494570602496)
    inc(86844066927987146567678238756515930889952488499230423029593188005934847229952)

Seed: 1806480648350826486
```

Echidna odkryła, że asercja w `inc` może zakończyć się niepowodzeniem, jeśli ta funkcja zostanie wywołana wielokrotnie z dużymi argumentami.

## Zbieranie i modyfikowanie korpusu Echidna {#collecting-and-modifying-an-echidna-corpus}

Zobaczymy, jak zbierać i wykorzystywać korpus transakcji za pomocą Echidny. Celem jest następujący inteligentny kontrakt [`magic.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/example/magic.sol):

```solidity
contract C {
  bool value_found = false;
  function magic(uint magic_1, uint magic_2, uint magic_3, uint magic_4) public {
    require(magic_1 == 42);
    require(magic_2 == 129);
    require(magic_3 == magic_4+333);
    value_found = true;
    return;
  }

  function echidna_magic_values() public returns (bool) {
    return !value_found;
  }

}
```

Ten mały przykład zmusza Echidnę do znalezienia określonych wartości w celu zmiany zmiennej stanu. Jest to trudne dla fuzzera
(zaleca się użycie narzędzia do wykonywania symbolicznego, takiego jak [Manticore](https://github.com/trailofbits/manticore)).
Możemy uruchomić Echidnę, aby to zweryfikować:

```bash
echidna-test magic.sol
...

echidna_magic_values: passed! 🎉

Seed: 2221503356319272685
```

Możemy jednak nadal używać Echidny do zbierania korpusu podczas prowadzenia tej kampanii fuzzingu.

### Zbieranie korpusu {#collecting-a-corpus}

Aby włączyć zbieranie korpusu, utwórz katalog korpusu:

```bash
mkdir corpus-magic
```

Oraz [plik konfiguracyjny Echidna](https://github.com/crytic/echidna/wiki/Config) `config.yaml`:

```yaml
coverage: true
corpusDir: "corpus-magic"
```

Teraz możemy uruchomić nasze narzędzie i sprawdzić zebrany korpus:

```bash
echidna-test magic.sol --config config.yaml
```

Echidna nadal nie może znaleźć prawidłowych magicznych wartości, ale możemy spojrzeć na zebrany korpus.
Na przykład, jeden z tych plików to:

```json
[
  {
    "_gas'": "0xffffffff",
    "_delay": ["0x13647", "0xccf6"],
    "_src": "00a329c0648769a73afac7f9381e08fb43dbea70",
    "_dst": "00a329c0648769a73afac7f9381e08fb43dbea72",
    "_value": "0x0",
    "_call": {
      "tag": "SolCall",
      "contents": [
        "magic",
        [
          {
            "contents": [
              256,
              "93723985220345906694500679277863898678726808528711107336895287282192244575836"
            ],
            "tag": "AbiUInt"
          },
          {
            "contents": [256, "334"],
            "tag": "AbiUInt"
          },
          {
            "contents": [
              256,
              "68093943901352437066264791224433559271778087297543421781073458233697135179558"
            ],
            "tag": "AbiUInt"
          },
          {
            "tag": "AbiUInt",
            "contents": [256, "332"]
          }
        ]
      ]
    },
    "_gasprice'": "0xa904461f1"
  }
]
```

Oczywiście, te dane wejściowe nie spowodują niepowodzenia naszej właściwości. Jednak w następnym kroku zobaczymy, jak to zmodyfikować.

### Zasilanie korpusu {#seeding-a-corpus}

Echidna potrzebuje pomocy, aby poradzić sobie z funkcją `magic`. Skopiujemy i zmodyfikujemy dane wejściowe, aby użyć odpowiednich
parametrów:

```bash
cp corpus/2712688662897926208.txt corpus/new.txt
```

Zmodyfikujemy plik `new.txt`, aby wywołać `magic(42,129,333,0)`. Teraz możemy ponownie uruchomić Echidnę:

```bash
echidna-test magic.sol --config config.yaml
...
echidna_magic_values: failed!💥
  Call sequence:
    magic(42,129,333,0)


Unique instructions: 142
Unique codehashes: 1
Seed: -7293830866560616537
```

Tym razem natychmiast wykryła, że właściwość jest naruszona.

## Znajdowanie transakcji o wysokim zużyciu gazu {#finding-transactions-with-high-gas-consumption}

Zobaczymy, jak za pomocą Echidny znaleźć transakcje o wysokim zużyciu gazu. Celem jest następujący inteligentny kontrakt:

```solidity
contract C {
  uint state;

  function expensive(uint8 times) internal {
    for(uint8 i=0; i < times; i++)
      state = state + i;
  }

  function f(uint x, uint y, uint8 times) public {
    if (x == 42 && y == 123)
      expensive(times);
    else
      state = 0;
  }

  function echidna_test() public returns (bool) {
    return true;
  }

}
```

Tutaj `expensive` może mieć duże zużycie gazu.

Obecnie Echidna zawsze potrzebuje właściwości do testowania: tutaj `echidna_test` zawsze zwraca `true`.
Możemy uruchomić Echidnę, aby to zweryfikować:

```
echidna-test gas.sol
...
echidna_test: passed! 🎉

Seed: 2320549945714142710
```

### Pomiar zużycia gazu {#measuring-gas-consumption}

Aby włączyć pomiar zużycia gazu za pomocą Echidny, utwórz plik konfiguracyjny `config.yaml`:

```yaml
estimateGas: true
```

W tym przykładzie zmniejszymy również rozmiar sekwencji transakcji, aby wyniki były łatwiejsze do zrozumienia:

```yaml
seqLen: 2
estimateGas: true
```

### Uruchom Echidnę {#run-echidna-3}

Po utworzeniu pliku konfiguracyjnego możemy uruchomić Echidnę w następujący sposób:

```bash
echidna-test gas.sol --config config.yaml
...
echidna_test: passed! 🎉

f used a maximum of 1333608 gas
  Call sequence:
    f(42,123,249) Gas price: 0x10d5733f0a Time delay: 0x495e5 Block delay: 0x88b2

Unique instructions: 157
Unique codehashes: 1
Seed: -325611019680165325
```

- Pokazany gaz jest szacunkiem dostarczonym przez [HEVM](https://github.com/dapphub/dapptools/tree/master/src/hevm#hevm-).

### Odsiewanie wywołań redukujących gaz {#filtering-out-gas-reducing-calls}

Powyższy samouczek na temat **filtrowania funkcji do wywołania podczas kampanii fuzzingu** pokazuje, jak usunąć niektóre funkcje z testowania.  
Może to mieć kluczowe znaczenie dla uzyskania dokładnego oszacowania gazu.
Rozważmy następujący przykład:

```solidity
contract C {
  address [] addrs;
  function push(address a) public {
    addrs.push(a);
  }
  function pop() public {
    addrs.pop();
  }
  function clear() public{
    addrs.length = 0;
  }
  function check() public{
    for(uint256 i = 0; i < addrs.length; i++)
      for(uint256 j = i+1; j < addrs.length; j++)
        if (addrs[i] == addrs[j])
          addrs[j] = address(0x0);
  }
  function echidna_test() public returns (bool) {
      return true;
  }
}
```

Jeśli Echidna może wywołać wszystkie funkcje, nie znajdzie łatwo transakcji o wysokim koszcie gazu:

```
echidna-test pushpop.sol --config config.yaml
...
pop used a maximum of 10746 gas
...
check used a maximum of 23730 gas
...
clear used a maximum of 35916 gas
...
push used a maximum of 40839 gas
```

Dzieje się tak, ponieważ koszt zależy od rozmiaru `addrs`, a losowe wywołania mają tendencję do pozostawiania tablicy prawie pustej.
Jednak umieszczenie na czarnej liście `pop` i `clear` daje nam znacznie lepsze wyniki:

```yaml
filterBlacklist: true
filterFunctions: ["pop", "clear"]
```

```
echidna-test pushpop.sol --config config.yaml
...
push used a maximum of 40839 gas
...
check used a maximum of 1484472 gas
```

### Podsumowanie: Znajdowanie transakcji o wysokim zużyciu gazu {#summary-finding-transactions-with-high-gas-consumption}

Echidna może znaleźć transakcje o wysokim zużyciu gazu, używając opcji konfiguracji `estimateGas`:

```yaml
estimateGas: true
```

```bash
echidna-test contract.sol --config config.yaml
...
```

Po zakończeniu kampanii fuzzingu Echidna zgłosi sekwencję z maksymalnym zużyciem gazu dla każdej funkcji.
