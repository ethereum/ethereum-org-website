---
title: Wie man Manticore verwendet, um Fehler in Smart Contracts zu finden
description: Wie man Manticore verwendet, um automatisch Fehler in Smart Contracts zu finden
author: Trailofbits
lang: de
tags:
  ["Solidity", "Smart Contracts", "Sicherheit", "Testen", "formale Verifizierung"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Ziel dieses Tutorials ist es zu zeigen, wie man Manticore verwendet, um automatisch Fehler in Smart Contracts zu finden.

## Installation {#installation}

Manticore erfordert >= Python 3.6. Es kann über pip oder mit Docker installiert werden.

### Manticore über Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Der letzte Befehl führt die eth-security-toolbox in einem Docker-Container aus, der Zugriff auf Ihr aktuelles Verzeichnis hat. Sie können die Dateien von Ihrem Host aus ändern und die Tools auf die Dateien aus dem Docker-Container anwenden._

Führen Sie innerhalb von Docker Folgendes aus:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore über pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 wird empfohlen.

### Ausführen eines Skripts {#running-a-script}

Um ein Python-Skript mit Python 3 auszuführen:

```bash
python3 script.py
```

## Einführung in die dynamische symbolische Ausführung {#introduction-to-dynamic-symbolic-execution}

### Dynamische symbolische Ausführung auf den Punkt gebracht {#dynamic-symbolic-execution-in-a-nutshell}

Die dynamische symbolische Ausführung (Dynamic Symbolic Execution, DSE) ist eine Programmanalysetechnik, die einen Zustandsraum mit einem hohen Maß an semantischem Bewusstsein untersucht. Diese Technik basiert auf der Entdeckung von „Programmpfaden“, die als mathematische Formeln dargestellt werden, sogenannte `path predicates` (Pfadprädikate). Konzeptionell arbeitet diese Technik in zwei Schritten mit Pfadprädikaten:

1. Sie werden unter Verwendung von Einschränkungen (Constraints) für die Programmeingabe konstruiert.
2. Sie werden verwendet, um Programmeingaben zu generieren, die die Ausführung der zugehörigen Pfade bewirken.

Dieser Ansatz erzeugt keine falsch-positiven Ergebnisse in dem Sinne, dass alle identifizierten Programmzustände während der konkreten Ausführung ausgelöst werden können. Wenn die Analyse beispielsweise einen Integer-Overflow (Ganzzahlüberlauf) findet, ist dieser garantiert reproduzierbar.

### Beispiel für ein Pfadprädikat {#path-predicate-example}

Um einen Einblick in die Funktionsweise von DSE zu erhalten, betrachten Sie das folgende Beispiel:

```solidity
function f(uint a){

  if (a == 65) {
      // Ein Bug ist vorhanden
  }

}
```

Da `f()` zwei Pfade enthält, konstruiert eine DSE zwei verschiedene Pfadprädikate:

- Pfad 1: `a == 65`
- Pfad 2: `Not (a == 65)`

Jedes Pfadprädikat ist eine mathematische Formel, die an einen sogenannten [SMT-Solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories) übergeben werden kann, der versuchen wird, die Gleichung zu lösen. Für `Pfad 1` wird der Solver angeben, dass der Pfad mit `a = 65` erkundet werden kann. Für `Pfad 2` kann der Solver `a` jeden anderen Wert als 65 zuweisen, zum Beispiel `a = 0`.

### Eigenschaften verifizieren {#verifying-properties}

Manticore ermöglicht die vollständige Kontrolle über die gesamte Ausführung jedes Pfades. Infolgedessen können Sie fast allem beliebige Einschränkungen hinzufügen. Diese Kontrolle ermöglicht die Erstellung von Eigenschaften für den Smart Contract.

Betrachten Sie das folgende Beispiel:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // kein Überlaufschutz
  return c;
}
```

Hier gibt es nur einen Pfad in der Funktion zu erkunden:

- Pfad 1: `c = a + b`

Mit Manticore können Sie auf Überläufe prüfen und dem Pfadprädikat Einschränkungen hinzufügen:

- `c = a + b AND (c < a OR c < b)`

Wenn es möglich ist, eine Bewertung von `a` und `b` zu finden, für die das obige Pfadprädikat machbar ist, bedeutet dies, dass Sie einen Überlauf gefunden haben. Zum Beispiel kann der Solver die Eingabe `a = 10 , b = MAXUINT256` generieren.

Wenn Sie eine korrigierte Version betrachten:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Die zugehörige Formel mit Überlaufprüfung wäre:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Diese Formel kann nicht gelöst werden; mit anderen Worten, dies ist ein **Beweis**, dass in `safe_add` `c` immer größer wird.

DSE ist somit ein leistungsstarkes Werkzeug, das beliebige Einschränkungen in Ihrem Code verifizieren kann.

## Ausführen unter Manticore {#running-under-manticore}

Wir werden sehen, wie man einen Smart Contract mit der Manticore-API untersucht. Das Ziel ist der folgende Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Eine eigenständige Untersuchung ausführen {#run-a-standalone-exploration}

Sie können Manticore direkt auf dem Smart Contract mit dem folgenden Befehl ausführen (`project` kann eine Solidity-Datei oder ein Projektverzeichnis sein):

```bash
$ manticore project
```

Sie erhalten die Ausgabe von Testfällen wie diesem (die Reihenfolge kann sich ändern):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Ohne zusätzliche Informationen wird Manticore den Smart Contract mit neuen symbolischen Transaktionen untersuchen, bis keine neuen Pfade im Smart Contract mehr gefunden werden. Manticore führt nach einer fehlgeschlagenen Transaktion (z. B. nach einem Revert) keine neuen Transaktionen aus.

Manticore gibt die Informationen in einem `mcore_*`-Verzeichnis aus. Unter anderem finden Sie in diesem Verzeichnis:

- `global.summary`: Abdeckung und Compiler-Warnungen
- `test_XXXXX.summary`: Abdeckung, letzte Anweisung, Kontostände pro Testfall
- `test_XXXXX.tx`: detaillierte Liste der Transaktionen pro Testfall

Hier findet Manticore 7 Testfälle, die Folgendem entsprechen (die Reihenfolge der Dateinamen kann sich ändern):

|                      |   Transaktion 0   |   Transaktion 1   | Transaktion 2     | Ergebnis |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Vertragserstellung |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Vertragserstellung | Fallback-Funktion |                   | REVERT |
| **test_00000002.tx** | Vertragserstellung |                   |                   | RETURN |
| **test_00000003.tx** | Vertragserstellung |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Vertragserstellung |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Vertragserstellung |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Vertragserstellung |      f(!=65)      | Fallback-Funktion | REVERT |

_Die Untersuchungszusammenfassung f(!=65) bedeutet, dass f mit einem beliebigen Wert ungleich 65 aufgerufen wird._

Wie Sie feststellen können, generiert Manticore für jede erfolgreiche oder rückgängig gemachte (reverted) Transaktion einen eindeutigen Testfall.

Verwenden Sie das Flag `--quick-mode`, wenn Sie eine schnelle Code-Untersuchung wünschen (es deaktiviert Fehlerdetektoren, Gasberechnung, ...).

### Einen Smart Contract über die API manipulieren {#manipulate-a-smart-contract-through-the-api}

Dieser Abschnitt beschreibt im Detail, wie man einen Smart Contract über die Manticore-Python-API manipuliert. Sie können eine neue Datei mit der Python-Erweiterung `*.py` erstellen und den erforderlichen Code schreiben, indem Sie die API-Befehle (deren Grundlagen unten beschrieben werden) in diese Datei einfügen und sie dann mit dem Befehl `$ python3 *.py` ausführen. Sie können die folgenden Befehle auch direkt in der Python-Konsole ausführen. Um die Konsole zu starten, verwenden Sie den Befehl `$ python3`.

### Konten erstellen {#creating-accounts}

Das Erste, was Sie tun sollten, ist, eine neue Blockchain mit den folgenden Befehlen zu initiieren:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Ein Nicht-Vertragskonto (Extern verwaltetes Konto) wird mit [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) erstellt:

```python
user_account = m.create_account(balance=1000)
```

Ein Solidity-Vertrag kann mit [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) bereitgestellt werden:

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Zusammenfassung {#summary}

- Sie können Benutzer- und Vertragskonten mit [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) und [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) erstellen.

### Transaktionen ausführen {#executing-transactions}

Manticore unterstützt zwei Arten von Transaktionen:

- Rohe Transaktion (Raw transaction): Alle Funktionen werden untersucht.
- Benannte Transaktion (Named transaction): Nur eine Funktion wird untersucht.

#### Rohe Transaktion {#raw-transaction}

Eine rohe Transaktion wird mit [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ausgeführt:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Der Aufrufer, die Adresse, die Daten oder der Wert der Transaktion können entweder konkret oder symbolisch sein:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) erstellt einen symbolischen Wert.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) erstellt ein symbolisches Byte-Array.

Zum Beispiel:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Wenn die Daten symbolisch sind, untersucht Manticore während der Transaktionsausführung alle Funktionen des Smart Contracts. Es ist hilfreich, die Erklärung zur Fallback-Funktion im Artikel [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) zu lesen, um zu verstehen, wie die Funktionsauswahl funktioniert.

#### Benannte Transaktion {#named-transaction}

Funktionen können über ihren Namen ausgeführt werden.
Um `f(uint var)` mit einem symbolischen Wert, von `user_account` und mit 0 Ether auszuführen, verwenden Sie:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Wenn der `value` (Wert) der Transaktion nicht angegeben ist, beträgt er standardmäßig 0.

#### Zusammenfassung {#summary-1}

- Argumente einer Transaktion können konkret oder symbolisch sein.
- Eine rohe Transaktion untersucht alle Funktionen.
- Funktionen können über ihren Namen aufgerufen werden.

### Arbeitsbereich {#workspace}

`m.workspace` ist das Verzeichnis, das als Ausgabeverzeichnis für alle generierten Dateien verwendet wird:

```python
print("Results are in {}".format(m.workspace))
```

### Die Untersuchung beenden {#terminate-the-exploration}

Um die Untersuchung zu stoppen, verwenden Sie [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Sobald diese Methode aufgerufen wird, sollten keine weiteren Transaktionen gesendet werden, und Manticore generiert Testfälle für jeden untersuchten Pfad.

### Zusammenfassung: Ausführen unter Manticore {#summary-running-under-manticore}

Wenn wir alle vorherigen Schritte zusammenfassen, erhalten wir:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # die Erkundung stoppen
```

Den gesamten obigen Code finden Sie in der Datei [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py).

## Pfade mit Ausnahmen (Throwing Paths) abrufen {#getting-throwing-paths}

Wir werden nun spezifische Eingaben für die Pfade generieren, die in `f()` eine Ausnahme auslösen. Das Ziel ist weiterhin der folgende Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Statusinformationen verwenden {#using-state-information}

Jeder ausgeführte Pfad hat seinen eigenen Zustand der Blockchain. Ein Zustand ist entweder bereit (ready) oder er wird beendet (killed), was bedeutet, dass er eine THROW- oder REVERT-Anweisung erreicht:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): die Liste der Zustände, die bereit sind (sie haben kein REVERT/INVALID ausgeführt).
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): die Liste der Zustände, die beendet wurden.
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): alle Zustände.

```python
for state in m.all_states:
    # etwas mit dem Zustand machen
```

Sie können auf Statusinformationen zugreifen. Zum Beispiel:

- `state.platform.get_balance(account.address)`: der Kontostand des Kontos.
- `state.platform.transactions`: die Liste der Transaktionen.
- `state.platform.transactions[-1].return_data`: die von der letzten Transaktion zurückgegebenen Daten.

Die von der letzten Transaktion zurückgegebenen Daten sind ein Array, das mit ABI.deserialize in einen Wert konvertiert werden kann, zum Beispiel:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Wie man einen Testfall generiert {#how-to-generate-testcase}

Verwenden Sie [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase), um einen Testfall zu generieren:

```python
m.generate_testcase(state, 'BugFound')
```

### Zusammenfassung {#summary-2}

- Sie können mit `m.all_states` über den Zustand iterieren.
- `state.platform.get_balance(account.address)` gibt den Kontostand zurück.
- `state.platform.transactions` gibt die Liste der Transaktionen zurück.
- `transaction.return_data` sind die zurückgegebenen Daten.
- `m.generate_testcase(state, name)` generiert Eingaben für den Zustand.

### Zusammenfassung: Pfade mit Ausnahmen abrufen {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

# # Prüfen, ob eine Ausführung mit einem REVERT oder INVALID endet
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Den gesamten obigen Code finden Sie in der Datei [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py).

_Beachten Sie, dass wir ein viel einfacheres Skript hätten generieren können, da alle von `terminated_state` zurückgegebenen Zustände REVERT oder INVALID in ihrem Ergebnis haben: Dieses Beispiel sollte nur demonstrieren, wie man die API manipuliert._

## Einschränkungen hinzufügen {#adding-constraints}

Wir werden sehen, wie man die Untersuchung einschränkt. Wir gehen davon aus, dass die Dokumentation von `f()` besagt, dass die Funktion niemals mit `a == 65` aufgerufen wird, sodass jeder Fehler mit `a == 65` kein echter Fehler ist. Das Ziel ist weiterhin der folgende Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### Operatoren {#operators}

Das Modul [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) erleichtert die Manipulation von Einschränkungen und bietet unter anderem:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than - vorzeichenlos größer als),
- Operators.UGE (unsigned greater than or equal to - vorzeichenlos größer als oder gleich),
- Operators.ULT (unsigned lower than - vorzeichenlos kleiner als),
- Operators.ULE (unsigned lower than or equal to - vorzeichenlos kleiner als oder gleich).

Um das Modul zu importieren, verwenden Sie Folgendes:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` wird verwendet, um ein Array mit einem Wert zu verketten. Zum Beispiel müssen die `return_data` einer Transaktion in einen Wert geändert werden, um gegen einen anderen Wert geprüft zu werden:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Einschränkungen {#state-constraint}

Sie können Einschränkungen global oder für einen bestimmten Zustand verwenden.

#### Globale Einschränkung {#state-constraint}

Verwenden Sie `m.constrain(constraint)`, um eine globale Einschränkung hinzuzufügen.
Zum Beispiel können Sie einen Smart Contract von einer symbolischen Adresse aus aufrufen und diese Adresse auf bestimmte Werte beschränken:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Zustandseinschränkung {#state-constraint}

Verwenden Sie [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain), um einem bestimmten Zustand eine Einschränkung hinzuzufügen.
Dies kann verwendet werden, um den Zustand nach seiner Untersuchung einzuschränken, um eine Eigenschaft daran zu überprüfen.

### Einschränkung überprüfen {#checking-constraint}

Verwenden Sie `solver.check(state.constraints)`, um zu erfahren, ob eine Einschränkung noch machbar ist.
Das Folgende schränkt beispielsweise `symbolic_value` so ein, dass es sich von 65 unterscheidet, und prüft, ob der Zustand noch machbar ist:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # Zustand ist zulässig
```

### Zusammenfassung: Einschränkungen hinzufügen {#summary-adding-constraints}

Wenn wir dem vorherigen Code eine Einschränkung hinzufügen, erhalten wir:

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

# # Prüfen, ob eine Ausführung mit einem REVERT oder INVALID endet
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # wir berücksichtigen den Pfad nicht, bei dem a == 65 ist
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Den gesamten obigen Code finden Sie in der Datei [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py).