---
title: "Jak używać narzędzia Slither do znajdowania błędów w inteligentnych kontraktach"
description: "Jak używać narzędzia Slither do automatycznego znajdowania błędów w inteligentnych kontraktach"
author: Trailofbits
lang: pl
tags: ["Solidity", "inteligentne kontrakty", "bezpieczeństwo", "testowanie"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Jak używać narzędzia Slither {#how-to-use-slither}

Celem tego samouczka jest pokazanie, jak używać narzędzia Slither do automatycznego znajdowania błędów w inteligentnych kontraktach.

- [Instalacja](#installation)
- [Użycie wiersza poleceń](#command-line)
- [Wprowadzenie do analizy statycznej](#static-analysis): Krótkie wprowadzenie do analizy statycznej
- [API](#api-basics): Opis API w języku Python

## Instalacja {#installation}

Slither wymaga języka Python w wersji >= 3.6. Można go zainstalować za pomocą pip lub używając narzędzia Docker.

Instalacja Slither przez pip:

```bash
pip3 install --user slither-analyzer
```

Instalacja Slither przez Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Ostatnie polecenie uruchamia eth-security-toolbox w kontenerze Docker, który ma dostęp do Twojego bieżącego katalogu. Możesz zmieniać pliki na swoim hoście i uruchamiać narzędzia na plikach z poziomu Dockera._

Wewnątrz Dockera uruchom:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Uruchamianie skryptu {#running-a-script}

Aby uruchomić skrypt w języku Python za pomocą Python 3:

```bash
python3 script.py
```

### Wiersz poleceń {#command-line}

**Wiersz poleceń a skrypty zdefiniowane przez użytkownika.** Slither jest dostarczany z zestawem predefiniowanych detektorów, które znajdują wiele typowych błędów. Wywołanie narzędzia Slither z wiersza poleceń uruchomi wszystkie detektory, bez konieczności posiadania szczegółowej wiedzy na temat analizy statycznej:

```bash
slither project_paths
```

Oprócz detektorów, Slither posiada możliwości przeglądu kodu dzięki swoim [modułom wypisywania (printers)](https://github.com/crytic/slither#printers) i [narzędziom](https://github.com/crytic/slither#tools).

Użyj [crytic.io](https://github.com/crytic), aby uzyskać dostęp do prywatnych detektorów i integracji z GitHub.

## Analiza statyczna {#static-analysis}

Możliwości i projekt frameworka do analizy statycznej Slither zostały opisane we wpisach na blogu ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) oraz w [artykule naukowym](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Analiza statyczna występuje w różnych odmianach. Prawdopodobnie zdajesz sobie sprawę, że kompilatory takie jak [clang](https://clang-analyzer.llvm.org/) i [gcc](https://lwn.net/Articles/806099/) opierają się na tych technikach badawczych, ale stanowią one również podstawę dla narzędzi takich jak [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) oraz narzędzi opartych na metodach formalnych, takich jak [Frama-C](https://frama-c.com/) i [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nie będziemy tutaj wyczerpująco omawiać technik analizy statycznej ani badań. Zamiast tego skupimy się na tym, co jest potrzebne do zrozumienia, jak działa Slither, abyś mógł skuteczniej używać go do znajdowania błędów i rozumienia kodu.

- [Reprezentacja kodu](#code-representation)
- [Analiza kodu](#analysis)
- [Reprezentacja pośrednia](#intermediate-representation)

### Reprezentacja kodu {#code-representation}

W przeciwieństwie do analizy dynamicznej, która wnioskuje o pojedynczej ścieżce wykonania, analiza statyczna wnioskuje o wszystkich ścieżkach jednocześnie. Aby to zrobić, opiera się na innej reprezentacji kodu. Dwie najpopularniejsze to drzewo składni abstrakcyjnej (AST - Abstract Syntax Tree) i graf przepływu sterowania (CFG - Control Flow Graph).

### Drzewa składni abstrakcyjnej (AST) {#abstract-syntax-trees-ast}

AST są używane za każdym razem, gdy kompilator parsuje kod. Jest to prawdopodobnie najbardziej podstawowa struktura, na której można przeprowadzić analizę statyczną.

W skrócie, AST to ustrukturyzowane drzewo, w którym zazwyczaj każdy liść zawiera zmienną lub stałą, a węzły wewnętrzne to operandy lub operacje przepływu sterowania. Rozważmy następujący kod:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Odpowiadające mu AST pokazano poniżej:

![AST](./ast.png)

Slither używa AST wyeksportowanego przez solc.

Choć proste w budowie, AST jest strukturą zagnieżdżoną. Czasami nie jest to najprostsze do analizy. Na przykład, aby zidentyfikować operacje użyte w wyrażeniu `a + b <= a`, musisz najpierw przeanalizować `<=`, a następnie `+`. Powszechnym podejściem jest użycie tak zwanego wzorca odwiedzającego (visitor pattern), który rekurencyjnie porusza się po drzewie. Slither zawiera ogólnego odwiedzającego w [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Poniższy kod używa `ExpressionVisitor` do wykrycia, czy wyrażenie zawiera dodawanie:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression jest wyrażeniem do przetestowania
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Graf przepływu sterowania (CFG) {#control-flow-graph-cfg}

Drugą najpopularniejszą reprezentacją kodu jest graf przepływu sterowania (CFG). Jak sama nazwa wskazuje, jest to reprezentacja oparta na grafie, która ujawnia wszystkie ścieżki wykonania. Każdy węzeł zawiera jedną lub wiele instrukcji. Krawędzie w grafie reprezentują operacje przepływu sterowania (if/then/else, pętle itp.). CFG naszego poprzedniego przykładu to:

![CFG](./cfg.png)

CFG to reprezentacja, na której opiera się większość analiz.

Istnieje wiele innych reprezentacji kodu. Każda z nich ma swoje zalety i wady w zależności od analizy, którą chcesz przeprowadzić.

### Analiza {#analysis}

Najprostszym rodzajem analiz, jakie można przeprowadzić za pomocą narzędzia Slither, są analizy składniowe.

### Analiza składniowa {#syntax-analysis}

Slither może poruszać się po różnych komponentach kodu i ich reprezentacji, aby znaleźć niespójności i wady, używając podejścia podobnego do dopasowywania wzorców.

Na przykład poniższe detektory szukają problemów związanych ze składnią:

- [Przesłanianie zmiennych stanu (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): iteruje po wszystkich zmiennych stanu i sprawdza, czy którakolwiek z nich przesłania zmienną z dziedziczonego kontraktu ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Nieprawidłowy interfejs ERC-20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): szuka nieprawidłowych sygnatur funkcji ERC-20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analiza semantyczna {#semantic-analysis}

W przeciwieństwie do analizy składniowej, analiza semantyczna sięga głębiej i analizuje „znaczenie” kodu. Ta rodzina obejmuje kilka szerokich typów analiz. Prowadzą one do potężniejszych i bardziej użytecznych wyników, ale są również bardziej złożone w pisaniu.

Analizy semantyczne są używane do najbardziej zaawansowanego wykrywania podatności.

#### Analiza zależności danych {#fixed-point-computation}

Mówi się, że zmienna `variable_a` jest zależna od danych ze zmiennej `variable_b`, jeśli istnieje ścieżka, dla której na wartość `variable_a` wpływa `variable_b`.

W poniższym kodzie `variable_a` jest zależna od `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither posiada wbudowane możliwości [analizy zależności danych](https://github.com/crytic/slither/wiki/data-dependency), dzięki swojej reprezentacji pośredniej (omówionej w dalszej części).

Przykład użycia zależności danych można znaleźć w [detektorze niebezpiecznej ścisłej równości](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). W tym przypadku Slither będzie szukał porównania ścisłej równości z niebezpieczną wartością ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) i poinformuje użytkownika, że powinien użyć `>=` lub `<=` zamiast `==`, aby zapobiec uwięzieniu kontraktu przez atakującego. Między innymi detektor uzna za niebezpieczną wartość zwracaną przez wywołanie `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) i użyje silnika zależności danych do śledzenia jej użycia.

#### Obliczanie punktu stałego {#fixed-point-computation-2}

Jeśli Twoja analiza porusza się po CFG i podąża za krawędziami, prawdopodobnie napotkasz już odwiedzone węzły. Na przykład, jeśli pętla jest przedstawiona jak poniżej:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Twoja analiza będzie musiała wiedzieć, kiedy się zatrzymać. Istnieją tutaj dwie główne strategie: (1) iteracja po każdym węźle skończoną liczbę razy, (2) obliczenie tak zwanego _punktu stałego_ (fixpoint). Punkt stały w zasadzie oznacza, że analiza tego węzła nie dostarcza już żadnych istotnych informacji.

Przykład użycia punktu stałego można znaleźć w detektorach reentrancji: Slither bada węzły i szuka wywołań zewnętrznych, zapisów i odczytów z pamięci (storage). Gdy osiągnie punkt stały ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), zatrzymuje eksplorację i analizuje wyniki, aby sprawdzić, czy występuje reentrancja, poprzez różne wzorce reentrancji ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Pisanie analiz wykorzystujących wydajne obliczanie punktu stałego wymaga dobrego zrozumienia, w jaki sposób analiza propaguje swoje informacje.

### Reprezentacja pośrednia {#intermediate-representation}

Reprezentacja pośrednia (IR - Intermediate Representation) to język, który ma być bardziej podatny na analizę statyczną niż oryginał. Slither tłumaczy język Solidity na własne IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Zrozumienie SlithIR nie jest konieczne, jeśli chcesz pisać tylko podstawowe testy. Przyda się jednak, jeśli planujesz pisać zaawansowane analizy semantyczne. Moduły wypisywania [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) i [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) pomogą Ci zrozumieć, jak tłumaczony jest kod.

## Podstawy API {#api-basics}

Slither posiada API, które pozwala na eksplorację podstawowych atrybutów kontraktu i jego funkcji.

Aby załadować bazę kodu:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Eksploracja kontraktów i funkcji {#exploring-contracts-and-functions}

Obiekt `Slither` posiada:

- `contracts (list(Contract)`: lista kontraktów
- `contracts_derived (list(Contract)`: lista kontraktów, które nie są dziedziczone przez inny kontrakt (podzbiór kontraktów)
- `get_contract_from_name (str)`: Zwraca kontrakt na podstawie jego nazwy

Obiekt `Contract` posiada:

- `name (str)`: Nazwa kontraktu
- `functions (list(Function))`: Lista funkcji
- `modifiers (list(Modifier))`: Lista funkcji
- `all_functions_called (list(Function/Modifier))`: Lista wszystkich funkcji wewnętrznych osiągalnych przez kontrakt
- `inheritance (list(Contract))`: Lista dziedziczonych kontraktów
- `get_function_from_signature (str)`: Zwraca funkcję (Function) na podstawie jej sygnatury
- `get_modifier_from_signature (str)`: Zwraca modyfikator (Modifier) na podstawie jego sygnatury
- `get_state_variable_from_name (str)`: Zwraca zmienną stanu (StateVariable) na podstawie jej nazwy

Obiekt `Function` lub `Modifier` posiada:

- `name (str)`: Nazwa funkcji
- `contract (contract)`: kontrakt, w którym zadeklarowana jest funkcja
- `nodes (list(Node))`: Lista węzłów tworzących CFG funkcji/modyfikatora
- `entry_point (Node)`: Punkt wejścia CFG
- `variables_read (list(Variable))`: Lista odczytywanych zmiennych
- `variables_written (list(Variable))`: Lista zapisywanych zmiennych
- `state_variables_read (list(StateVariable))`: Lista odczytywanych zmiennych stanu (podzbiór variables`read)
- `state_variables_written (list(StateVariable))`: Lista zapisywanych zmiennych stanu (podzbiór variables`written)
