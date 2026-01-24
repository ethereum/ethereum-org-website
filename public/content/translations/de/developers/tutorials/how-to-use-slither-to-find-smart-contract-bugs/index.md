---
title: So verwenden Sie Slither, um Bugs in Smart Contracts zu finden
description: So verwenden Sie Slither, um automatisch Fehler in Smart Contracts zu finden
author: Spuren von bits
lang: de
tags:
  [
    "solidity",
    "intelligente Verträge",
    "Sicherheit",
    "testen"
  ]
skill: advanced
published: 2020-06-09
source: Aufbau sicherer Verträge
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## So verwenden Sie Slither {#how-to-use-slither}

Das Ziel dieses Tutorials ist es zu zeigen, wie Sie Slither verwenden, um automatisch Fehler in Smart Contracts zu finden.

- [Installation](#installation)
- [Verwendung der Befehlszeile](#command-line)
- [Einführung in die statische Analyse](#static-analysis): Kurze Einführung in die statische Analyse
- [API](#api-basics): Python-API-Beschreibung

## Installation {#installation}

Slither erfordert Python >= 3.6. Die Installation kann über pip oder Docker erfolgen.

Slither über pip:

```bash
pip3 install --user slither-analyzer
```

Slither über Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_Der letzte Befehl führt die eth-security-toolbox in einem Docker aus, der Zugriff auf dein aktuelles Verzeichnis hat. Du kannst die Dateien von deinem Host aus ändern und die Tools für die Dateien aus dem Docker ausführen_

Führe im Docker aus:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Ausführen eines Skripts {#running-a-script}

So führst du ein Python-Skript mit Python 3 aus:

```bash
python3 script.py
```

### Befehlszeile {#command-line}

**Befehlszeile versus benutzerdefinierte Skripte.** Slither wird mit einer Reihe von vordefinierten Detektoren geliefert, die viele häufige Fehler finden. Wenn Sie Slither von der Befehlszeile aus aufrufen, werden alle Detektoren ausgeführt, ohne dass detaillierte Kenntnisse der statischen Analyse erforderlich sind:

```bash
slither project_paths
```

Zusätzlich zu den Detektoren verfügt Slither über Code-Review-Funktionen durch seine [Printers](https://github.com/crytic/slither#printers) und [Tools](https://github.com/crytic/slither#tools).

Verwenden Sie [crytic.io](https://github.com/crytic), um Zugang zu privaten Detektoren und zur GitHub-Integration zu erhalten.

## Statische Analyse {#static-analysis}

Die Fähigkeiten und das Design des statischen Analyse-Frameworks von Slither wurden in Blog-Beiträgen ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) und einem [wissenschaftlichen Artikel](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) beschrieben.

Statische Analyse gibt es in verschiedenen Varianten. Ihnen ist wahrscheinlich bewusst, dass Compiler wie [clang](https://clang-analyzer.llvm.org/) und [gcc](https://lwn.net/Articles/806099/) auf diesen Forschungstechniken basieren, aber sie bilden auch die Grundlage für ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) und auf formalen Methoden basierende Werkzeuge wie [Frama-C](https://frama-c.com/) und [Polyspace](https://www.mathworks.com/products/polyspace.html)).

Wir werden hier nicht erschöpfend auf statische Analysetechniken und Forscher eingehen. Stattdessen konzentrieren wir uns darauf, was nötig ist, um zu verstehen, wie Slither funktioniert, damit Sie es effektiver nutzen können, um Fehler zu finden und den Code zu verstehen.

- [Code-Darstellung](#code-representation)
- [Code-Analyse](#analysis)
- [Zwischendarstellung](#intermediate-representation)

### Code-Darstellung {#code-representation}

Im Gegensatz zu einer dynamischen Analyse, die einen einzelnen Ausführungspfad betrachtet, betrachtet die statische Analyse alle Pfade auf einmal. Dazu stützt es sich auf eine andere Code-Darstellung. Die beiden häufigsten sind der abstrakte Syntaxbaum (AST) und der Kontrollflussgraph (CFG).

### Abstrakte Syntaxbäume (AST) {#abstract-syntax-trees-ast}

ASTs werden jedes Mal verwendet, wenn der Compiler Code parst. Es ist wahrscheinlich die grundlegendste Struktur, auf der statische Analysen durchgeführt werden können.

Kurz gesagt, ein AST ist ein strukturierter Baum, in dem normalerweise jedes Blatt eine Variable oder eine Konstante enthält und interne Knoten Operanden oder Kontrollflussoperationen sind. Betrachten Sie den folgenden Code:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Der entsprechende AST ist hier dargestellt:

![AST](./ast.png)

Slither verwendet den von solc exportierten AST.

Obwohl der AST einfach zu erstellen ist, handelt es sich um eine verschachtelte Struktur. Manchmal ist dies nicht am einfachsten zu analysieren. Um beispielsweise die vom Ausdruck `a + b <= a` verwendeten Operationen zu identifizieren, müssen Sie zuerst `<=` und dann `+` analysieren. Ein gängiger Ansatz ist die Verwendung des sogenannten Visitor-Patterns, das rekursiv durch den Baum navigiert. Slither enthält einen generischen Visitor in [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Der folgende Code verwendet `ExpressionVisitor`, um zu erkennen, ob der Ausdruck eine Addition enthält:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression ist der zu testende Ausdruck
print(f'Der Ausdruck {expression} enthält eine Addition: {visitor.result()}')
```

### Kontrollflussgraph (CFG) {#control-flow-graph-cfg}

Die zweithäufigste Code-Darstellung ist der Kontrollflussgraph (CFG). Wie der Name schon sagt, handelt es sich um eine graphbasierte Darstellung, die alle Ausführungspfade aufzeigt. Jeder Knoten enthält eine oder mehrere Anweisungen. Kanten im Graphen stellen die Kontrollflussoperationen dar (if/then/else, Schleife usw.). Der CFG unseres vorherigen Beispiels lautet:

![CFG](./cfg.png)

Der CFG ist die Darstellung, auf der die meisten Analysen aufbauen.

Es gibt viele andere Code-Darstellungen. Jede Darstellung hat Vor- und Nachteile, je nachdem, welche Analyse Sie durchführen möchten.

### Analyse {#analysis}

Die einfachste Art von Analysen, die Sie mit Slither durchführen können, sind syntaktische Analysen.

### Syntaktische Analyse {#syntax-analysis}

Slither kann durch die verschiedenen Komponenten des Codes und deren Darstellung navigieren, um Inkonsistenzen und Fehler mit einem Ansatz zu finden, der dem Pattern-Matching ähnelt.

Die folgenden Detektoren suchen beispielsweise nach syntaxbezogenen Problemen:

- [Zustandsvariablen-Shadowing](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): iteriert über alle Zustandsvariablen und prüft, ob eine davon eine Variable aus einem geerbten Vertrag verschattet ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Inkorrektes ERC20-Interface](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): sucht nach inkorrekten ERC20-Funktionssignaturen ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Semantische Analyse {#semantic-analysis}

Im Gegensatz zur Syntaxanalyse geht eine semantische Analyse tiefer und analysiert die "Bedeutung" des Codes. Diese Familie umfasst einige allgemeine Arten von Analysen. Sie führen zu aussagekräftigeren und nützlicheren Ergebnissen, sind aber auch komplexer zu schreiben.

Semantische Analysen werden für die fortschrittlichsten Schwachstellenerkennungen verwendet.

#### Datenabhängigkeitsanalyse {#fixed-point-computation}

Eine Variable `variable_a` gilt als datenabhängig von `variable_b`, wenn es einen Pfad gibt, auf dem der Wert von `variable_a` durch `variable_b` beeinflusst wird.

Im folgenden Code ist `variable_a` von `variable_b` abhängig:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither verfügt über integrierte [Datenabhängigkeits](https://github.com/crytic/slither/wiki/data-dependency)-Fähigkeiten, dank seiner Zwischendarstellung (die in einem späteren Abschnitt besprochen wird).

Ein Beispiel für die Verwendung der Datenabhängigkeit findet sich im [Detektor für gefährliche strikte Gleichheit](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Hier sucht Slither nach einem strikten Gleichheitsvergleich mit einem gefährlichen Wert ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) und informiert den Benutzer, dass er `>=` oder `<=` anstelle von `==` verwenden sollte, um zu verhindern, dass ein Angreifer den Vertrag in eine Falle lockt. Unter anderem wird der Detektor den Rückgabewert eines Aufrufs von `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) als gefährlich einstufen und die Datenabhängigkeits-Engine verwenden, um seine Verwendung zu verfolgen.

#### Fixpunktberechnung {#fixed-point-computation}

Wenn Ihre Analyse durch den CFG navigiert und den Kanten folgt, werden Sie wahrscheinlich bereits besuchte Knoten sehen. Wenn zum Beispiel eine Schleife wie unten dargestellt ist:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

Ihre Analyse muss wissen, wann sie anhalten muss. Hier gibt es zwei Hauptstrategien: (1) jeden Knoten eine endliche Anzahl von Malen durchlaufen, (2) einen sogenannten _Fixpunkt_ berechnen. Ein Fixpunkt bedeutet im Grunde, dass die Analyse dieses Knotens keine aussagekräftigen Informationen mehr liefert.

Ein Beispiel für die Verwendung eines Fixpunkts findet sich in den Reentrancy-Detektoren: Slither untersucht die Knoten und sucht nach externen Aufrufen sowie Schreib- und Lesezugriffen auf den Speicher. Sobald ein Fixpunkt erreicht ist ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), wird die Untersuchung gestoppt und die Ergebnisse werden anhand verschiedener Reentrancy-Muster ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) analysiert, um festzustellen, ob eine Reentrancy vorliegt.

Das Schreiben von Analysen mit effizienter Fixpunktberechnung erfordert ein gutes Verständnis dafür, wie die Analyse ihre Informationen propagiert.

### Zwischendarstellung {#intermediate-representation}

Eine Zwischendarstellung (Intermediate Representation, IR) ist eine Sprache, die sich besser für die statische Analyse eignen soll als die ursprüngliche. Slither übersetzt Solidity in seine eigene IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Das Verständnis von SlithIR ist nicht notwendig, wenn Sie nur einfache Prüfungen schreiben wollen. Es wird sich jedoch als nützlich erweisen, wenn Sie vorhaben, fortgeschrittene semantische Analysen zu schreiben. Die [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir)- und [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa)-Printers helfen Ihnen zu verstehen, wie der Code übersetzt wird.

## API-Grundlagen {#api-basics}

Slither hat eine API, mit der Sie die grundlegenden Attribute des Vertrags und seiner Funktionen untersuchen können.

So laden Sie eine Codebasis:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Untersuchen von Verträgen und Funktionen {#exploring-contracts-and-functions}

Ein `Slither`-Objekt hat:

- `contracts (list(Contract)`: Liste von Verträgen
- `contracts_derived (list(Contract)`: Liste von Verträgen, die nicht von einem anderen Vertrag geerbt werden (Teilmenge von `contracts`)
- `get_contract_from_name (str)`: Gibt einen Vertrag anhand seines Namens zurück

Ein `Contract`-Objekt hat:

- `name (str)`: Name des Vertrags
- `functions (list(Function))`: Liste von Funktionen
- `modifiers (list(Modifier))`: Liste von Modifikatoren
- `all_functions_called (list(Function/Modifier))`: Liste aller internen Funktionen, die vom Vertrag aus erreichbar sind
- `inheritance (list(Contract))`: Liste der geerbten Verträge
- `get_function_from_signature (str)`: Gibt eine Funktion anhand ihrer Signatur zurück
- `get_modifier_from_signature (str)`: Gibt einen Modifikator anhand seiner Signatur zurück
- `get_state_variable_from_name (str)`: Gibt eine Zustandsvariable anhand ihres Namens zurück

Ein `Function`- oder ein `Modifier`-Objekt hat:

- `name (str)`: Name der Funktion
- `contract (contract)`: der Vertrag, in dem die Funktion deklariert ist
- `nodes (list(Node))`: Liste der Nodes, aus denen der CFG der Funktion/des Modifikators besteht
- `entry_point (Node)`: Einstiegspunkt des CFG
- `variables_read (list(Variable))`: Liste der gelesenen Variablen
- `variables_written (list(Variable))`: Liste der geschriebenen Variablen
- `state_variables_read (list(StateVariable))`: Liste der gelesenen Zustandsvariablen (Teilmenge von `variables_read`)
- `state_variables_written (list(StateVariable))`: Liste der geschriebenen Zustandsvariablen (Teilmenge von `variables_written`)
