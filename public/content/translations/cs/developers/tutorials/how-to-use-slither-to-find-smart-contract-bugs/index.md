---
title: "Jak používat Slither k hledání chyb v chytrých kontraktech"
description: "Jak používat Slither k automatickému hledání chyb v chytrých kontraktech"
author: Trailofbits
lang: cs
tags: ["Solidity", "chytré kontrakty", "bezpečnost", "testování"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Jak používat Slither {#how-to-use-slither}

Cílem tohoto tutoriálu je ukázat, jak používat Slither k automatickému hledání chyb v chytrých kontraktech.

- [Instalace](#installation)
- [Použití příkazového řádku](#command-line)
- [Úvod do statické analýzy](#static-analysis): Stručný úvod do statické analýzy
- [API](#api-basics): Popis Python API

## Instalace {#installation}

Slither vyžaduje Python >= 3.6. Lze jej nainstalovat přes pip nebo pomocí Dockeru.

Slither přes pip:

```bash
pip3 install --user slither-analyzer
```

Slither přes Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Poslední příkaz spustí eth-security-toolbox v Dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory ze svého hostitelského systému a spouštět nástroje na souborech z Dockeru._

Uvnitř Dockeru spusťte:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Spuštění skriptu {#running-a-script}

Pro spuštění Python skriptu pomocí Pythonu 3:

```bash
python3 script.py
```

### Příkazový řádek {#command-line}

**Příkazový řádek versus uživatelsky definované skripty.** Slither přichází se sadou předdefinovaných detektorů, které nacházejí mnoho běžných chyb. Volání Slitheru z příkazového řádku spustí všechny detektory, není potřeba žádná detailní znalost statické analýzy:

```bash
slither project_paths
```

Kromě detektorů má Slither schopnosti revize kódu prostřednictvím svých [nástrojů pro výpis (printers)](https://github.com/crytic/slither#printers) a [nástrojů](https://github.com/crytic/slither#tools).

Použijte [crytic.io](https://github.com/crytic) pro získání přístupu k soukromým detektorům a integraci s GitHubem.

## Statická analýza {#static-analysis}

Schopnosti a návrh frameworku pro statickou analýzu Slither byly popsány v příspěvcích na blogu ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) a v [akademickém článku](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Statická analýza existuje v různých podobách. Pravděpodobně si uvědomujete, že kompilátory jako [clang](https://clang-analyzer.llvm.org/) a [gcc](https://lwn.net/Articles/806099/) závisí na těchto výzkumných technikách, ale tvoří také základ nástrojů jako [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](https://findbugs.sourceforge.net/) a nástrojů založených na formálních metodách, jako jsou [Frama-C](https://frama-c.com/) a [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nebudeme zde vyčerpávajícím způsobem zkoumat techniky statické analýzy a výzkum. Místo toho se zaměříme na to, co je potřeba k pochopení toho, jak Slither funguje, abyste jej mohli efektivněji používat k hledání chyb a porozumění kódu.

- [Reprezentace kódu](#code-representation)
- [Analýza kódu](#analysis)
- [Průběžná reprezentace (Intermediate representation)](#intermediate-representation)

### Reprezentace kódu {#code-representation}

Na rozdíl od dynamické analýzy, která uvažuje o jediné cestě provádění, statická analýza uvažuje o všech cestách najednou. K tomu se spoléhá na jinou reprezentaci kódu. Dvě nejběžnější jsou abstraktní syntaktický strom (AST) a graf toku řízení (CFG).

### Abstraktní syntaktické stromy (AST) {#abstract-syntax-trees-ast}

AST se používají pokaždé, když kompilátor parsuje kód. Je to pravděpodobně nejzákladnější struktura, na které lze provádět statickou analýzu.

Stručně řečeno, AST je strukturovaný strom, kde obvykle každý list obsahuje proměnnou nebo konstantu a vnitřní uzly jsou operandy nebo operace toku řízení. Zvažte následující kód:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Odpovídající AST je zobrazen na:

![AST](./ast.png)

Slither používá AST exportovaný pomocí solc.

Ačkoli je snadné jej sestavit, AST je vnořená struktura. Někdy to není to nejpřímočařejší pro analýzu. Například k identifikaci operací použitých výrazem `a + b <= a` musíte nejprve analyzovat `<=` a poté `+`. Běžným přístupem je použití takzvaného návrhového vzoru návštěvník (visitor pattern), který prochází stromem rekurzivně. Slither obsahuje obecného návštěvníka v [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Následující kód používá `ExpressionVisitor` k detekci, zda výraz obsahuje sčítání:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression je výraz, který má být testován
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Graf toku řízení (CFG) {#control-flow-graph-cfg}

Druhou nejběžnější reprezentací kódu je graf toku řízení (CFG). Jak název napovídá, jedná se o reprezentaci založenou na grafech, která odhaluje všechny cesty provádění. Každý uzel obsahuje jednu nebo více instrukcí. Hrany v grafu představují operace toku řízení (if/then/else, smyčka atd.). CFG našeho předchozího příkladu je:

![CFG](./cfg.png)

CFG je reprezentace, na které je postavena většina analýz.

Existuje mnoho dalších reprezentací kódu. Každá reprezentace má výhody a nevýhody podle analýzy, kterou chcete provést.

### Analýza {#analysis}

Nejjednodušším typem analýz, které můžete se Slitherem provádět, jsou syntaktické analýzy.

### Syntaktická analýza {#syntax-analysis}

Slither dokáže procházet různými komponentami kódu a jejich reprezentací, aby našel nesrovnalosti a nedostatky pomocí přístupu podobného porovnávání vzorů (pattern matching).

Například následující detektory hledají problémy související se syntaxí:

- [Zastínění stavové proměnné (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): iteruje přes všechny stavové proměnné a kontroluje, zda některá nezastiňuje proměnnou ze zděděného kontraktu ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Nesprávné rozhraní ERC-20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): hledá nesprávné podpisy funkcí ERC-20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Sémantická analýza {#semantic-analysis}

Na rozdíl od syntaktické analýzy půjde sémantická analýza hlouběji a bude analyzovat „význam“ kódu. Tato rodina zahrnuje některé široké typy analýz. Vedou k silnějším a užitečnějším výsledkům, ale je také složitější je napsat.

Sémantické analýzy se používají pro nejpokročilejší detekce zranitelností.

#### Analýza datových závislostí {#fixed-point-computation}

O proměnné `variable_a` se říká, že je datově závislá na `variable_b`, pokud existuje cesta, pro kterou je hodnota `variable_a` ovlivněna `variable_b`.

V následujícím kódu je `variable_a` závislá na `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither přichází s vestavěnými schopnostmi pro [datové závislosti](https://github.com/crytic/slither/wiki/data-dependency) díky své průběžné reprezentaci (diskutováno v pozdější části).

Příklad použití datové závislosti lze nalézt v [detektoru nebezpečné striktní rovnosti](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Zde bude Slither hledat porovnání striktní rovnosti s nebezpečnou hodnotou ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) a bude informovat uživatele, že by měl použít `>=` nebo `<=` spíše než `==`, aby zabránil útočníkovi uvěznit kontrakt. Mimo jiné bude detektor považovat za nebezpečnou návratovou hodnotu volání `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) a použije engine datových závislostí ke sledování jejího použití.

#### Výpočet pevného bodu (Fixed-point computation) {#fixed-point-computation-2}

Pokud vaše analýza prochází CFG a sleduje hrany, pravděpodobně uvidíte již navštívené uzly. Například pokud je smyčka prezentována tak, jak je znázorněno níže:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Vaše analýza bude muset vědět, kdy se zastavit. Zde existují dvě hlavní strategie: (1) iterovat na každém uzlu konečný početkrát, (2) vypočítat takzvaný _pevný bod (fixpoint)_. Pevný bod v podstatě znamená, že analýza tohoto uzlu neposkytuje žádné smysluplné informace.

Příklad použití pevného bodu lze nalézt v detektorech reentrance: Slither prozkoumává uzly a hledá externí volání, zápis a čtení do úložiště. Jakmile dosáhne pevného bodu ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), zastaví průzkum a analyzuje výsledky, aby zjistil, zda je přítomna reentrance, prostřednictvím různých vzorů reentrance ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Psaní analýz pomocí efektivního výpočtu pevného bodu vyžaduje dobré pochopení toho, jak analýza šíří své informace.

### Průběžná reprezentace {#intermediate-representation}

Průběžná reprezentace (IR) je jazyk, který má být pro statickou analýzu vhodnější než ten původní. Slither překládá Solidity do svého vlastního IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Porozumění SlithIR není nutné, pokud chcete psát pouze základní kontroly. Bude se vám však hodit, pokud plánujete psát pokročilé sémantické analýzy. Nástroje pro výpis (printers) [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) a [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vám pomohou pochopit, jak je kód překládán.

## Základy API {#api-basics}

Slither má API, které vám umožní prozkoumat základní atributy kontraktu a jeho funkcí.

Pro načtení kódové základny:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Zkoumání kontraktů a funkcí {#exploring-contracts-and-functions}

Objekt `Slither` má:

- `contracts (list(Contract)`: seznam kontraktů
- `contracts_derived (list(Contract)`: seznam kontraktů, které nejsou zděděny jiným kontraktem (podmnožina kontraktů)
- `get_contract_from_name (str)`: Vrátí kontrakt podle jeho názvu

Objekt `Contract` má:

- `name (str)`: Název kontraktu
- `functions (list(Function))`: Seznam funkcí
- `modifiers (list(Modifier))`: Seznam funkcí
- `all_functions_called (list(Function/Modifier))`: Seznam všech interních funkcí dosažitelných kontraktem
- `inheritance (list(Contract))`: Seznam zděděných kontraktů
- `get_function_from_signature (str)`: Vrátí funkci (Function) podle jejího podpisu
- `get_modifier_from_signature (str)`: Vrátí modifikátor (Modifier) podle jeho podpisu
- `get_state_variable_from_name (str)`: Vrátí stavovou proměnnou (StateVariable) podle jejího názvu

Objekt `Function` nebo `Modifier` má:

- `name (str)`: Název funkce
- `contract (contract)`: kontrakt, kde je funkce deklarována
- `nodes (list(Node))`: Seznam uzlů tvořících CFG funkce/modifikátoru
- `entry_point (Node)`: Vstupní bod CFG
- `variables_read (list(Variable))`: Seznam čtených proměnných
- `variables_written (list(Variable))`: Seznam zapisovaných proměnných
- `state_variables_read (list(StateVariable))`: Seznam čtených stavových proměnných (podmnožina variables`read)
- `state_variables_written (list(StateVariable))`: Seznam zapisovaných stavových proměnných (podmnožina variables`written)
