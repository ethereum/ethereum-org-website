---
title: "Jak používat Slither k hledání chyb ve smart kontraktech"
description: "Jak používat Slither k automatickému hledání chyb ve smart kontraktech"
author: Trailofbits
lang: cs
tags:
  [
    "solidity",
    "smart kontrakt účty",
    "bezpečnost",
    "testování"
  ]
skill: advanced
published: 2020-06-09
source: "Tvorba bezpečných kontraktů"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Jak používat Slither {#how-to-use-slither}

Cílem tohoto tutoriálu je ukázat, jak používat Slither k automatickému hledání chyb ve smart kontraktech.

- [Instalace](#installation)
- [Použití příkazového řádku](#command-line)
- [Úvod do statické analýzy](#static-analysis): Stručný úvod do statické analýzy
- [API](#api-basics): Popis Python API

## Instalace {#installation}

Slither vyžaduje Python >= 3.6. Lze jej nainstalovat pomocí pip nebo s použitím dockeru.

Slither přes pip:

```bash
pip3 install --user slither-analyzer
```

Slither přes docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Poslední příkaz spustí eth-security-toolbox v dockeru, který má přístup k vašemu aktuálnímu adresáři. Můžete měnit soubory z vašeho hostitele a spouštět nástroje na souborech z dockeru_

Uvnitř dockeru spusťte:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Spuštění skriptu {#running-a-script}

Pro spuštění pythonového skriptu v pythonu 3:

```bash
python3 script.py
```

### Příkazový řádek {#command-line}

**Příkazový řádek versus uživatelsky definované skripty.** Slither je dodáván se sadou předdefinovaných detektorů, které nacházejí mnoho běžných chyb. Zavolání Slitheru z příkazového řádku spustí všechny detektory, není potřeba žádná podrobná znalost statické analýzy:

```bash
slither project_paths
```

Kromě detektorů má Slither také možnosti revize kódu prostřednictvím svých [výpisů](https://github.com/crytic/slither#printers) a [nástrojů](https://github.com/crytic/slither#tools).

Použijte [crytic.io](https://github.com/crytic) pro získání přístupu k soukromým detektorům a integraci s GitHub.

## Statická analýza {#static-analysis}

Schopnosti a design frameworku pro statickou analýzu Slither byly popsány v blogových příspěvcích ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) a v [akademickém článku](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

Statická analýza existuje v různých variantách. S největší pravděpodobností si uvědomujete, že kompilátory jako [clang](https://clang-analyzer.llvm.org/) a [gcc](https://lwn.net/Articles/806099/) závisí na těchto výzkumných technikách, ale jsou také základem pro ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) a nástroje založené na formálních metodách, jako jsou [Frama-C](https://frama-c.com/) a [Polyspace](https://www.mathworks.com/products/polyspace.html).

Nebudeme zde vyčerpávajícím způsobem procházet techniky statické analýzy a výzkum. Místo toho se zaměříme na to, co je potřeba k pochopení fungování Slitheru, abyste jej mohli efektivněji používat k hledání chyb a porozumění kódu.

- [Reprezentace kódu](#code-representation)
- [Analýza kódu](#analysis)
- [Mezilehlá reprezentace](#intermediate-representation)

### Reprezentace kódu {#code-representation}

Na rozdíl od dynamické analýzy, která uvažuje o jedné cestě spuštění, statická analýza uvažuje o všech cestách najednou. K tomu se spoléhá na jinou reprezentaci kódu. Dvě nejběžnější jsou abstraktní syntaktický strom (AST) a graf řízení toku (CFG).

### Abstraktní syntaktické stromy (AST) {#abstract-syntax-trees-ast}

AST se používají pokaždé, když kompilátor parsuje kód. Je to pravděpodobně nejzákladnější struktura, na které lze provádět statickou analýzu.

V kostce, AST je strukturovaný strom, kde obvykle každý list obsahuje proměnnou nebo konstantu a vnitřní uzly jsou operandy nebo operace řízení toku. Zvažte následující kód:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Odpovídající AST je zobrazen v:

![AST](./ast.png)

Slither používá AST exportovaný kompilátorem solc.

I když je AST jednoduché sestavit, jedná se o vnořenou strukturu. Někdy to není nejjednodušší analyzovat. Například pro identifikaci operací použitých ve výrazu `a + b <= a` musíte nejprve analyzovat `<=` a pak `+`. Běžným přístupem je použití takzvaného vzoru návštěvník, který rekurzivně prochází stromem. Slither obsahuje obecného návštěvníka v [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

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

visitor = HasAddition(expression) # expression je výraz, který se má testovat
print(f'Výraz {expression} obsahuje sčítání: {visitor.result()}')
```

### Graf řízení toku (CFG) {#control-flow-graph-cfg}

Druhou nejběžnější reprezentací kódu je graf řízení toku (CFG). Jak název napovídá, jedná se o grafovou reprezentaci, která odhaluje všechny cesty spuštění. Každý uzel obsahuje jednu nebo více instrukcí. Hrany v grafu představují operace řízení toku (if/then/else, smyčka atd.). CFG našeho předchozího příkladu je:

![CFG](./cfg.png)

CFG je reprezentace, na které je postavena většina analýz.

Existuje mnoho dalších reprezentací kódu. Každá reprezentace má výhody a nevýhody v závislosti na analýze, kterou chcete provést.

### Analýza {#analysis}

Nejjednodušším typem analýz, které můžete se Slitherem provádět, jsou syntaktické analýzy.

### Syntaktická analýza {#syntax-analysis}

Slither může procházet různými komponenty kódu a jejich reprezentací, aby našel nekonzistence a nedostatky pomocí přístupu podobného porovnávání vzorů.

Například následující detektory hledají problémy související se syntaxí:

- [Stínování stavové proměnné](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): iteruje přes všechny stavové proměnné a kontroluje, zda některá nestíní proměnnou ze zděděného kontraktu ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Nesprávné rozhraní ERC20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): hledá nesprávné podpisy funkcí ERC20 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Sémantická analýza {#semantic-analysis}

Na rozdíl od syntaktické analýzy jde sémantická analýza hlouběji a analyzuje „význam“ kódu. Tato rodina zahrnuje několik širokých typů analýz. Vedou k výkonnějším a užitečnějším výsledkům, ale jsou také složitější na psaní.

Sémantické analýzy se používají pro nej pokročilejší detekce zranitelností.

#### Analýza závislosti dat {#fixed-point-computation}

O proměnné `variable_a` se říká, že je datově závislá na `variable_b`, pokud existuje cesta, na které je hodnota `variable_a` ovlivněna `variable_b`.

V následujícím kódu je `variable_a` závislá na `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither je dodáván s vestavěnými schopnostmi [datové závislosti](https://github.com/crytic/slither/wiki/data-dependency), díky své mezilehlé reprezentaci (diskutované v pozdější sekci).

Příklad použití datové závislosti lze nalézt v [detektoru nebezpečné striktní rovnosti](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Zde Slither bude hledat porovnání striktní rovnosti s nebezpečnou hodnotou ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), a informuje uživatele, že by měl použít `>=` nebo `<=` místo `==`, aby zabránil útočníkovi uvěznit kontrakt. Mimo jiné bude detektor považovat za nebezpečnou návratovou hodnotu volání `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) a použije engine datové závislosti ke sledování jejího použití.

#### Výpočet pevného bodu {#fixed-point-computation}

Pokud vaše analýza prochází CFG a sleduje hrany, je pravděpodobné, že uvidíte již navštívené uzly. Například, pokud je smyčka představena, jak je uvedeno níže:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Vaše analýza bude muset vědět, kdy se zastavit. Existují zde dvě hlavní strategie: (1) iterovat na každém uzlu konečný početkrát, (2) vypočítat takzvaný _pevný bod_. Pevný bod v podstatě znamená, že analýza tohoto uzlu již neposkytuje žádné smysluplné informace.

Příklad použití pevného bodu lze nalézt v detektorech reentrancy: Slither prozkoumává uzly a hledá externí volání, zápisy do úložiště a čtení z něj. Jakmile dosáhne pevného bodu ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), zastaví průzkum a analyzuje výsledky, aby zjistil, zda je přítomna reentrancy, a to prostřednictvím různých vzorců reentrancy ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Psaní analýz využívajících efektivní výpočet pevného bodu vyžaduje dobré porozumění tomu, jak analýza šíří své informace.

### Mezilehlá reprezentace {#intermediate-representation}

Mezilehlá reprezentace (IR) je jazyk, který má být pro statickou analýzu vhodnější než ten původní. Slither překládá Solidity do své vlastní IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Porozumění SlithIR není nutné, pokud chcete psát pouze základní kontroly. Bude se však hodit, pokud plánujete psát pokročilé sémantické analýzy. [Výpisy](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) SlithIR a [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) vám pomohou pochopit, jak je kód přeložen.

## Základy API {#api-basics}

Slither má API, které vám umožňuje prozkoumat základní atributy kontraktu a jeho funkcí.

Pro načtení kódové báze:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Prozkoumávání kontraktů a funkcí {#exploring-contracts-and-functions}

Objekt `Slither` má:

- `contracts (list(Contract)`: seznam kontraktů
- `contracts_derived (list(Contract)`: seznam kontraktů, které nejsou zděděny jiným kontraktem (podmnožina kontraktů)
- `get_contract_from_name (str)`: Vrátí kontrakt podle jeho jména

Objekt `Contract` má:

- `name (str)`: Jméno kontraktu
- `functions (list(Function))`: Seznam funkcí
- `modifiers (list(Modifier))`: Seznam funkcí
- `all_functions_called (list(Function/Modifier))`: Seznam všech interních funkcí dosažitelných kontraktem
- `inheritance (list(Contract))`: Seznam zděděných kontraktů
- `get_function_from_signature (str)`: Vrátí funkci podle jejího podpisu
- `get_modifier_from_signature (str)`: Vrátí modifikátor podle jeho podpisu
- `get_state_variable_from_name (str)`: Vrátí stavovou proměnnou podle jejího jména

Objekt `Function` nebo `Modifier` má:

- `name (str)`: Jméno funkce
- `contract (contract)`: kontrakt, kde je funkce deklarována
- `nodes (list(Node))`: Seznam uzlů tvořících CFG funkce/modifikátoru
- `entry_point (Node)`: Vstupní bod CFG
- `variables_read (list(Variable))`: Seznam přečtených proměnných
- `variables_written (list(Variable))`: Seznam zapsaných proměnných
- `state_variables_read (list(StateVariable))`: Seznam přečtených stavových proměnných (podmnožina proměnných `read`)
- `state_variables_written (list(StateVariable))`: Seznam zapsaných stavových proměnných (podmnožina proměnných `written`)
