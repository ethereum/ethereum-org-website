---
title: "Jak używać Slither do znajdowania błędów w inteligentnych kontraktach"
description: "Jak używać Slither do automatycznego wyszukiwania błędów w inteligentnych kontraktach"
author: Trailofbits
lang: pl
tags:
  [
    "solidity",
    "smart kontrakty",
    "bezpieczeństwo",
    "testowanie"
  ]
skill: advanced
published: 2020-06-09
source: "Tworzenie bezpiecznych kontraktów"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Jak używać Slither {#how-to-use-slither}

Celem tego samouczka jest pokazanie, jak używać Slither do automatycznego wyszukiwania błędów w inteligentnych kontraktach.

- [Instalacja](#installation)
- [Użycie w wierszu poleceń](#command-line)
- [Wprowadzenie do analizy statycznej](#static-analysis): Krótkie wprowadzenie do analizy statycznej
- [API](#api-basics): Opis API Pythona

## Instalacja {#installation}

Slither wymaga Pythona >= 3.6. Można go zainstalować za pomocą pip lub dockera.

Slither przez pip:

```bash
pip3 install --user slither-analyzer
```

Slither przez Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Ostatnie polecenie uruchamia eth-security-toolbox w dockerze, który ma dostęp do bieżącego katalogu. Możesz zmienić pliki z hosta i uruchomić narzędzia na plikach z dockera_

Wewnątrz dockera uruchom:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Uruchamianie skryptu {#running-a-script}

Aby uruchomić skrypt Pythona za pomocą Pythona 3:

```bash
python3 script.py
```

### Wiersz poleceń {#command-line}

**Wiersz poleceń a skrypty zdefiniowane przez użytkownika.** Slither jest wyposażony w zestaw predefiniowanych detektorów, które znajdują wiele częstych błędów. Wywołanie Slither z wiersza poleceń uruchomi wszystkie detektory; nie jest potrzebna szczegółowa wiedza na temat analizy statycznej:

```bash
slither project_paths
```

Oprócz detektorów Slither ma możliwości przeglądu kodu za pomocą swoich [printerów](https://github.com/crytic/slither#printers) i [narzędzi](https://github.com/crytic/slither#tools).

Użyj [crytic.io](https://github.com/crytic), aby uzyskać dostęp do prywatnych detektorów i integracji z GitHub.

## Analiza statyczna {#static-analysis}

Możliwości i projekt frameworka do analizy statycznej Slither zostały opisane w postach na blogu ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) i w [pracy naukowej](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Istnieją różne rodzaje analizy statycznej. Najprawdopodobniej zdajesz sobie sprawę, że kompilatory takie jak [clang](https://clang-analyzer.llvm.org/) i [gcc](https://lwn.net/Articles/806099/) opierają się na tych technikach badawczych, ale stanowią one również podstawę ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/)) i narzędzi opartych na metodach formalnych, takich jak [Frama-C](https://frama-c.com/) i [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nie będziemy tutaj wyczerpująco omawiać technik analizy statycznej ani badań w tej dziedzinie. Zamiast tego skoncentrujemy się na tym, co jest potrzebne, aby zrozumieć, jak działa Slither tak, abyś mógł go skuteczniej używać, aby znaleźć błędy i zrozumieć kod.

- [Reprezentacja kodu](#code-representation)
- [Analiza kodu](#analysis)
- [Reprezentacja pośrednia](#intermediate-representation)

### Reprezentacja kodu {#code-representation}

W przeciwieństwie do analizy dynamicznej, która rozważa pojedynczą ścieżkę wykonania, analiza statyczna rozważa wszystkie ścieżki naraz. W tym celu opiera się na innej reprezentacji kodu. Dwa najczęściej spotykane to abstrakcyjne drzewo składni (AST) i graf przepływu sterowania (CFG).

### Abstrakcyjne drzewa składni (AST) {#abstract-syntax-trees-ast}

AST są używane za każdym razem, gdy kompilator analizuje kod. Jest to prawdopodobnie najbardziej podstawowa struktura, na podstawie której można przeprowadzić analizę statyczną.

Krótko mówiąc, AST to ustrukturyzowane drzewo, w którym zazwyczaj każdy liść zawiera zmienną lub stałą, a węzły wewnętrzne to operandy lub operacje przepływu sterowania. Rozważmy następujący kod:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Odpowiadające mu drzewo AST pokazano poniżej:

![AST](./ast.png)

Slither używa AST eksportowanego przez solc.

Choć prosty w budowie, AST jest strukturą zagnieżdżoną. Czasem jego przeanalizowanie nie jest proste. Na przykład, aby zidentyfikować operacje użyte w wyrażeniu `a + b <= a`, należy najpierw przeanalizować `<=` a następnie `+`. Powszechnym podejściem jest użycie tak zwanego wzorca wizytatora, który rekurencyjnie porusza się po drzewie. Slither zawiera ogólny wizytator w [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Poniższy kod używa `ExpressionVisitor` do wykrycia, czy wyrażenie zawiera operację dodawania:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Graf przepływu sterowania (CFG) {#control-flow-graph-cfg}

Drugą najpowszechniejszą reprezentacją kodu jest graf przepływu sterowania (CFG). Jak sama nazwa wskazuje, jest to reprezentacja oparta na grafie, która ujawnia wszystkie ścieżki wykonania. Każdy węzeł zawiera jedną lub wiele instrukcji. Krawędzie w grafie reprezentują operacje przepływu sterowania (if/then/else, pętle itp.). CFG naszego poprzedniego przykładu to:

![CFG](./cfg.png)

CFG jest reprezentacją, na której opiera się większość analiz.

Istnieje wiele innych reprezentacji kodu. Każda reprezentacja ma zalety i wady w zależności od analizy, którą chcesz przeprowadzić.

### Analiza {#analysis}

Najprostszym typem analiz, jakie można wykonać za pomocą Slither, są analizy składniowe.

### Analiza składniowa {#syntax-analysis}

Slither może poruszać się po różnych komponentach kodu i ich reprezentacjach, aby znaleźć niespójności i wady, stosując podejście podobne do dopasowywania wzorców.

Na przykład poniższe detektory szukają problemów związanych ze składnią:

- [Przesłanianie zmiennej stanu](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): iteruje po wszystkich zmiennych stanu i sprawdza, czy któraś z nich nie przesłania zmiennej z dziedziczonego kontraktu ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Nieprawidłowy interfejs ERC20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): wyszukuje nieprawidłowe sygnatury funkcji ERC20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analiza semantyczna {#semantic-analysis}

W przeciwieństwie do analizy składniowej, analiza semantyczna sięga głębiej i analizuje „znaczenie” kodu. Ta rodzina obejmuje kilka szerokich typów analiz. Prowadzą one do skuteczniejszych i bardziej użytecznych wyników, ale są również bardziej złożone w tworzeniu.

Analizy semantyczne są wykorzystywane do wykrywania najbardziej zaawansowanych podatności.

#### Analiza zależności danych {#fixed-point-computation}

Mówimy, że zmienna `variable_a` jest zależna od danych zmiennej `variable_b`, jeśli istnieje ścieżka wykonania, w której wartość `variable_b` wpływa na wartość `variable_a`.

W poniższym kodzie `variable_a` jest zależna od `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither ma wbudowane możliwości [analizy zależności danych](https://github.com/crytic/slither/wiki/data-dependency) dzięki swojej reprezentacji pośredniej (omówionej w dalszej części).

Przykład wykorzystania zależności danych można znaleźć w detektorze [niebezpiecznych ścisłych równości](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). W tym przypadku Slither będzie szukał porównania ścisłej równości z niebezpieczną wartością ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) i poinformuje użytkownika, że powinien użyć `>=` lub `<=` zamiast `==`, aby uniemożliwić atakującemu zastawienie pułapki na kontrakt. Między innymi detektor uzna za niebezpieczną wartość zwracaną przez wywołanie `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) i użyje silnika zależności danych do śledzenia jej użycia.

#### Obliczanie punktu stałego {#fixed-point-computation}

Jeśli twoja analiza porusza się po CFG i podąża za krawędziami, prawdopodobnie zobaczysz już odwiedzone węzły. Na przykład, jeśli pętla jest przedstawiona jak poniżej:

```solidity
for(uint i; i < zakres; ++){
    variable_a += 1
}
```

Twoja analiza będzie musiała wiedzieć, kiedy się zatrzymać. Istnieją tu dwie główne strategie: (1) iteracja na każdym węźle skończoną liczbę razy, (2) obliczenie tak zwanego _punktu stałego_. Punkt stały w zasadzie oznacza, że analiza tego węzła nie dostarcza żadnych istotnych informacji.

Przykład zastosowania punktu stałego można znaleźć w detektorach reentrancji: Slither bada węzły i szuka zewnętrznych wywołań, zapisów do pamięci i odczytów z niej. Gdy osiągnie punkt stały ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), zatrzymuje eksplorację i analizuje wyniki, aby sprawdzić, czy występuje reentrancja, za pomocą różnych wzorców reentrancji ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Pisanie analiz z wykorzystaniem wydajnych obliczeń punktu stałego wymaga dobrego zrozumienia, w jaki sposób analiza propaguje swoje informacje.

### Reprezentacja pośrednia {#intermediate-representation}

Reprezentacja pośrednia (IR) to język, który ma być bardziej podatny na analizę statyczną niż język oryginalny. Slither tłumaczy Solidity na własną reprezentację pośrednią (IR): [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Zrozumienie SlithIR nie jest konieczne, jeśli chcesz pisać tylko podstawowe sprawdzenia. Będzie to jednak przydatne, jeśli planujesz pisać zaawansowane analizy semantyczne. Printery [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) i [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) pomogą ci zrozumieć, w jaki sposób tłumaczony jest kod.

## Podstawy API {#api-basics}

Slither posiada API, które pozwala na eksplorację podstawowych atrybutów kontraktu i jego funkcji.

Aby załadować bazę kodu:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Eksploracja kontraktów i funkcji {#exploring-contracts-and-functions}

Obiekt `Slither` posiada:

- `contracts (list(Contract))`: lista kontraktów
- `contracts_derived (list(Contract))`: lista kontraktów, które nie są dziedziczone przez żaden inny kontrakt (podzbiór kontraktów)
- `get_contract_from_name (str)`: Zwraca kontrakt na podstawie jego nazwy

Obiekt `Contract` posiada:

- `name (str)`: Nazwa kontraktu
- `functions (list(Function))`: Lista funkcji
- `modifiers (list(Modifier))`: Lista modyfikatorów
- `all_functions_called (list(Function/Modifier))`: Lista wszystkich funkcji wewnętrznych osiągalnych z poziomu kontraktu
- `inheritance (list(Contract))`: Lista dziedziczonych kontraktów
- `get_function_from_signature (str)`: Zwraca funkcję na podstawie jej sygnatury
- `get_modifier_from_signature (str)`: Zwraca modyfikator na podstawie jego sygnatury
- `get_state_variable_from_name (str)`: Zwraca zmienną stanu na podstawie jej nazwy

Obiekt `Function` lub `Modifier` posiada:

- `name (str)`: Nazwa funkcji
- `contract (Contract)`: kontrakt, w którym zadeklarowana jest funkcja
- `nodes (list(Node))`: Lista węzłów tworzących CFG funkcji/modyfikatora
- `entry_point (Node)`: Punkt wejściowy CFG
- `variables_read (list(Variable))`: Lista odczytanych zmiennych
- `variables_written (list(Variable))`: Lista zapisanych zmiennych
- `state_variables_read (list(StateVariable))`: Lista odczytanych zmiennych stanu (podzbiór `variables_read`)
- `state_variables_written (list(StateVariable))`: Lista zapisanych zmiennych stanu (podzbiór `variables_written`)
