---
title: Wie man Slither verwendet, um Fehler in Smart Contracts zu finden
description: Wie man Slither verwendet, um automatisch Fehler in Smart Contracts zu finden
author: Trailofbits
lang: de
tags: ["Solidity", "Smart Contracts", "Sicherheit", "Testen"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Wie man Slither verwendet {#how-to-use-slither}

Das Ziel dieses Tutorials ist es zu zeigen, wie man Slither verwendet, um automatisch Fehler in Smart Contracts zu finden.

- [Installation](#installation)
- [Verwendung der Befehlszeile](#command-line)
- [Einführung in die statische Analyse](#static-analysis): Kurze Einführung in die statische Analyse
- [API](#api-basics): Beschreibung der Python-API

## Installation {#installation}

Slither erfordert Python >= 3.6. Es kann über pip oder mit Docker installiert werden.

Slither über pip:

```bash
pip3 install --user slither-analyzer
```

Slither über Docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/share trailofbits/eth-security-toolbox
```

_Der letzte Befehl führt die eth-security-toolbox in einem Docker-Container aus, der Zugriff auf Ihr aktuelles Verzeichnis hat. Sie können die Dateien von Ihrem Host aus ändern und die Tools für die Dateien aus dem Docker-Container heraus ausführen._

Führen Sie innerhalb von Docker Folgendes aus:

```bash
cd /share
```

### Ein Skript ausführen {#running-a-script}

Um ein Python-Skript mit Python 3 auszuführen:

```bash
python3 script.py
```

### Befehlszeile {#command-line}

**Befehlszeile im Vergleich zu benutzerdefinierten Skripten.** Slither wird mit einer Reihe vordefinierter Detektoren geliefert, die viele häufige Fehler finden. Der Aufruf von Slither über die Befehlszeile führt alle Detektoren aus, es sind keine detaillierten Kenntnisse der statischen Analyse erforderlich:

```bash
slither project_paths
```

Zusätzlich zu den Detektoren verfügt Slither über Code-Review-Funktionen durch seine [Printers](https://github.com/crytic/slither#printers) und [Tools](https://github.com/crytic/slither#tools).

Verwenden Sie [crytic.io](https://github.com/crytic), um Zugriff auf private Detektoren und die GitHub-Integration zu erhalten.

## Statische Analyse {#static-analysis}

Die Funktionen und das Design des statischen Analyse-Frameworks Slither wurden in Blogbeiträgen ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) und einem [wissenschaftlichen Artikel](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf) beschrieben.

Statische Analyse gibt es in verschiedenen Ausprägungen. Sie wissen wahrscheinlich, dass Compiler wie [clang](https://clang-analyzer.llvm.org/) und [gcc](https://lwn.net/Articles/806099/) auf diesen Forschungstechniken basieren, aber sie untermauern auch Tools wie [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) und Werkzeuge, die auf formalen Methoden basieren, wie [Frama-C](https://frama-c.com/) und [Polyspace](https://www.mathworks.com/products/polyspace.html).

Wir werden hier nicht erschöpfend auf statische Analysetechniken und Forscher eingehen. Stattdessen konzentrieren wir uns darauf, was nötig ist, um zu verstehen, wie Slither funktioniert, damit Sie es effektiver nutzen können, um Fehler zu finden und Code zu verstehen.

- [Code-Darstellung](#code-representation)
- [Code-Analyse](#analysis)
- [Zwischendarstellung](#intermediate-representation)

### Code-Darstellung {#code-representation}

Im Gegensatz zu einer dynamischen Analyse, die einen einzelnen Ausführungspfad betrachtet, berücksichtigt die statische Analyse alle Pfade auf einmal. Dazu stützt sie sich auf eine andere Code-Darstellung. Die beiden häufigsten sind der abstrakte Syntaxbaum (Abstract Syntax Tree, AST) und der Kontrollflussgraph (Control Flow Graph, CFG).

### Abstrakte Syntaxbäume (AST) {#abstract-syntax-trees-ast}

ASTs werden jedes Mal verwendet, wenn der Compiler Code parst. Es ist wahrscheinlich die grundlegendste Struktur, auf der eine statische Analyse durchgeführt werden kann.

Kurz gesagt ist ein AST ein strukturierter Baum, bei dem normalerweise jedes Blatt eine Variable oder eine Konstante enthält und interne Knoten Operanden oder Kontrollflussoperationen sind. Betrachten Sie den folgenden Code:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

Der entsprechende AST wird hier gezeigt:

![AST](./ast.png)

Slither verwendet den von solc exportierten AST.

Obwohl er einfach zu erstellen ist, ist der AST eine verschachtelte Struktur. Manchmal ist dies nicht am einfachsten zu analysieren. Um beispielsweise die vom Ausdruck `a + b <= a` verwendeten Operationen zu identifizieren, müssen Sie zuerst `<=` und dann `+` analysieren. Ein gängiger Ansatz ist die Verwendung des sogenannten Visitor-Patterns, das rekursiv durch den Baum navigiert. Slither enthält einen generischen Visitor in [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

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
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Kontrollflussgraph (CFG) {#control-flow-graph-cfg}

Die zweithäufigste Code-Darstellung ist der Kontrollflussgraph (CFG). Wie der Name schon sagt, handelt es sich um eine graphenbasierte Darstellung, die alle Ausführungspfade aufzeigt. Jeder Knoten enthält eine oder mehrere Anweisungen. Kanten im Graphen stellen die Kontrollflussoperationen dar (if/then/else, Schleife usw.). Der CFG unseres vorherigen Beispiels ist:

![CFG](./cfg.png)

Der CFG ist die Darstellung, auf der die meisten Analysen aufbauen.

Es existieren viele weitere Code-Darstellungen. Jede Darstellung hat Vor- und Nachteile, je nachdem, welche Analyse Sie durchführen möchten.

### Analyse {#analysis}

Die einfachste Art von Analysen, die Sie mit Slither durchführen können, sind syntaktische Analysen.

### Syntaxanalyse {#syntax-analysis}

Slither kann durch die verschiedenen Komponenten des Codes und deren Darstellung navigieren, um Inkonsistenzen und Fehler mithilfe eines Mustererkennungs-ähnlichen Ansatzes zu finden.

Zum Beispiel suchen die folgenden Detektoren nach syntaxbezogenen Problemen:

- [Shadowing von Zustandsvariablen](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): Iteriert über alle Zustandsvariablen und prüft, ob eine davon eine Variable aus einem geerbten Vertrag überschattet ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Falsche ERC20-Schnittstelle](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): Sucht nach falschen ERC20-Funktionssignaturen ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Semantische Analyse {#semantic-analysis}

Im Gegensatz zur Syntaxanalyse geht eine semantische Analyse tiefer und analysiert die „Bedeutung“ des Codes. Diese Familie umfasst einige breit gefächerte Arten von Analysen. Sie führen zu leistungsfähigeren und nützlicheren Ergebnissen, sind aber auch komplexer zu schreiben.

Semantische Analysen werden für die fortschrittlichsten Schwachstellenerkennungen verwendet.

#### Datenabhängigkeitsanalyse {#fixed-point-computation}

Eine Variable `variable_a` gilt als datenabhängig von `variable_b`, wenn es einen Pfad gibt, auf dem der Wert von `variable_a` durch `variable_b` beeinflusst wird.

Im folgenden Code ist `variable_a` abhängig von `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither verfügt dank seiner Zwischendarstellung (die in einem späteren Abschnitt besprochen wird) über integrierte Funktionen zur [Datenabhängigkeit](https://github.com/crytic/slither/wiki/data-dependency).

Ein Beispiel für die Nutzung von Datenabhängigkeiten findet sich im [Detektor für gefährliche strikte Gleichheit](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Hier sucht Slither nach einem strikten Gleichheitsvergleich mit einem gefährlichen Wert ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) und informiert den Benutzer, dass er `>=` oder `<=` anstelle von `==` verwenden sollte, um zu verhindern, dass ein Angreifer den Vertrag in eine Falle lockt. Unter anderem betrachtet der Detektor den Rückgabewert eines Aufrufs von `balanceOf(address)` als gefährlich ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) und verwendet die Datenabhängigkeits-Engine, um dessen Verwendung zu verfolgen.

#### Fixpunktberechnung {#fixed-point-computation}

Wenn Ihre Analyse durch den CFG navigiert und den Kanten folgt, werden Sie wahrscheinlich bereits besuchte Knoten sehen. Zum Beispiel, wenn eine Schleife wie unten gezeigt vorliegt:

```solidity
for(uint i; i < range; ++i){
    variable_a += 1
}
```

Ihre Analyse muss wissen, wann sie anhalten soll. Hier gibt es zwei Hauptstrategien: (1) eine endliche Anzahl von Malen über jeden Knoten iterieren, (2) einen sogenannten _Fixpunkt_ berechnen. Ein Fixpunkt bedeutet im Grunde, dass die Analyse dieses Knotens keine aussagekräftigen Informationen mehr liefert.

Ein Beispiel für die Verwendung eines Fixpunkts findet sich in den Reentrancy-Detektoren: Slither untersucht die Knoten und sucht nach externen Aufrufen sowie Schreib- und Lesezugriffen auf den Speicher. Sobald ein Fixpunkt erreicht ist ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), stoppt es die Untersuchung und analysiert die Ergebnisse, um anhand verschiedener Reentrancy-Muster zu prüfen, ob eine Reentrancy vorliegt ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Das Schreiben von Analysen unter Verwendung einer effizienten Fixpunktberechnung erfordert ein gutes Verständnis dafür, wie die Analyse ihre Informationen weitergibt.

### Zwischendarstellung {#intermediate-representation}

Eine Zwischendarstellung (Intermediate Representation, IR) ist eine Sprache, die für die statische Analyse besser geeignet sein soll als die Originalsprache. Slither übersetzt Solidity in seine eigene IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Das Verständnis von SlithIR ist nicht erforderlich, wenn Sie nur grundlegende Prüfungen schreiben möchten. Es ist jedoch nützlich, wenn Sie planen, fortgeschrittene semantische Analysen zu schreiben. Die [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir)- und [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa)-Printers helfen Ihnen zu verstehen, wie der Code übersetzt wird.

## API-Grundlagen {#api-basics}

Slither verfügt über eine API, mit der Sie grundlegende Attribute des Vertrags und seiner Funktionen untersuchen können.

Um eine Codebasis zu laden:

```python
from slither.slither import Slither
slither = Slither('/path/to/project')

```

### Verträge und Funktionen untersuchen {#exploring-contracts-and-functions}

Ein `Slither`-Objekt hat:

- `contracts (list(Contract)`: Liste von Verträgen
- `contracts_derived (list(Contract)`: Liste von Verträgen, die nicht von einem anderen Vertrag geerbt werden (Teilmenge von Verträgen)
- `get_contract_from_name (str)`: Gibt einen Vertrag anhand seines Namens zurück

Ein `Contract`-Objekt hat:

- `name (str)`: Name des Vertrags
- `functions (list(Function))`: Liste von Funktionen
- `modifiers (list(Modifier))`: Liste von Funktionen
- `all_functions_called (list(Function/Modifier))`: Liste aller internen Funktionen, die durch den Vertrag erreichbar sind
- `inheritance (list(Contract))`: Liste der geerbten Verträge
- `get_function_from_signature (str)`: Gibt eine Funktion anhand ihrer Signatur zurück
- `get_modifier_from_signature (str)`: Gibt einen Modifikator anhand seiner Signatur zurück
- `get_state_variable_from_name (str)`: Gibt eine Zustandsvariable anhand ihres Namens zurück

Ein `Function`- oder `Modifier`-Objekt hat:

- `name (str)`: Name der Funktion
- `contract (contract)`: der Vertrag, in dem die Funktion deklariert ist
- `nodes (list(Node))`: Liste der Knoten, aus denen sich der CFG der Funktion/des Modifikators zusammensetzt
- `entry_point (Node)`: Einstiegspunkt des CFG
- `variables_read (list(Variable))`: Liste der gelesenen Variablen
- `variables_written (list(Variable))`: Liste der geschriebenen Variablen
- `state_variables_read (list(StateVariable))`: Liste der gelesenen Zustandsvariablen (Teilmenge von variables_read)
- `state_variables_written (list(StateVariable))`: Liste der geschriebenen Zustandsvariablen (Teilmenge von variables_written)