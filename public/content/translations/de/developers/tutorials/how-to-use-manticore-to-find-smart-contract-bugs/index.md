---
title: So nutzt du Manticore, um Fehler in Smart Contracts zu finden
description: So nutzt du Manticore, um automatisiert Fehler in Smart Contracts zu finden
author: Spuren von bits
lang: de
tags:
  [
    "solidity",
    "intelligente Verträge",
    "Sicherheit",
    "testen",
    "Formale Verifizierung"
  ]
skill: advanced
published: 13.01.2020
source: "Aufbau sicherer Verträge"
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Das Ziel dieses Tutorials ist es zu zeigen, wie du Manticore nutzt, um automatisch Fehler in Smart Contracts zu finden.

## Installation {#installation}

Manticore erfordert Python >= 3.6. Die Installation kann über pip oder Docker erfolgen.

### Manticore über Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Der letzte Befehl führt die eth-security-toolbox in einem Docker aus, der Zugriff auf dein aktuelles Verzeichnis hat. Du kannst die Dateien von deinem Host aus ändern und die Tools für die Dateien aus dem Docker ausführen_

Führe im Docker aus:

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

So führst du ein Python-Skript mit Python 3 aus:

```bash
python3 script.py
```

## Einführung in die dynamische symbolische Ausführung {#introduction-to-dynamic-symbolic-execution}

### Dynamische symbolische Ausführung – kurz erklärt {#dynamic-symbolic-execution-in-a-nutshell}

Die dynamische symbolische Ausführung (DSE) ist eine Programmanalysetechnik, die einen Zustandsraum mit einem hohen Grad an semantischem Bewusstsein untersucht. Diese Technik basiert auf der Entdeckung von „Programmpfaden“, die als mathematische Formeln, sogenannte `path predicates`, dargestellt werden. Konzeptionell arbeitet diese Technik in zwei Schritten mit Pfadprädikaten:

1. Sie werden unter Verwendung von Einschränkungen für die Programmeingabe konstruiert.
2. Sie werden verwendet, um Programmeingaben zu generieren, die die Ausführung der zugehörigen Pfade bewirken.

Dieser Ansatz erzeugt keine Falsch-Positiv-Meldungen, da alle identifizierten Programmzustände während einer konkreten Ausführung ausgelöst werden können. Findet die Analyse beispielsweise einen Integer-Überlauf, ist dieser garantiert reproduzierbar.

### Beispiel für ein Pfadprädikat {#path-predicate-example}

Um einen Einblick in die Funktionsweise von DSE zu erhalten, sieh dir das folgende Beispiel an:

```solidity
function f(uint a){

  if (a == 65) {
      // Ein Fehler ist vorhanden
  }

}
```

Da `f()` zwei Pfade enthält, konstruiert eine DSE zwei verschiedene Pfadprädikate:

- Pfad 1: `a == 65`
- Pfad 2: `Not (a == 65)`

Jedes Pfadprädikat ist eine mathematische Formel, die an einen sogenannten [SMT-Solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories) übergeben werden kann, der versucht, die Gleichung zu lösen. Für `Pfad 1` wird der Solver ausgeben, dass der Pfad mit `a = 65` untersucht werden kann. Für `Pfad 2` kann der Solver für `a` einen beliebigen anderen Wert als 65 angeben, zum Beispiel `a = 0`.

### Überprüfen von Eigenschaften {#verifying-properties}

Manticore ermöglicht die vollständige Kontrolle über die gesamte Ausführung jedes Pfades. Dadurch kannst du beliebige Einschränkungen für fast alles hinzufügen. Diese Kontrolle ermöglicht das Erstellen von Eigenschaften für den Vertrag.

Betrachte das folgende Beispiel:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // kein Überlaufschutz
  return c;
}
```

Hier gibt es in der Funktion nur einen Pfad zu untersuchen:

- Pfad 1: `c = a + b`

Mit Manticore kannst du auf einen Überlauf prüfen und dem Pfadprädikat Einschränkungen hinzufügen:

- `c = a + b AND (c < a OR c < b)`

Wenn es möglich ist, eine Bewertung für `a` und `b` zu finden, für die das obige Pfadprädikat erfüllbar ist, bedeutet das, dass du einen Überlauf gefunden hast. Der Solver kann beispielsweise die Eingabe `a = 10 , b = MAXUINT256` generieren.

Wenn du eine korrigierte Version betrachtest:

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

Diese Formel kann nicht gelöst werden; mit anderen Worten, das ist ein **Beweis** dafür, dass in `safe_add` der Wert `c` immer größer wird.

DSE ist somit ein leistungsfähiges Tool, das beliebige Einschränkungen in deinem Code überprüfen kann.

## Ausführung mit Manticore {#running-under-manticore}

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

Du kannst Manticore mit dem folgenden Befehl direkt auf dem Smart Contract ausführen (`project` kann eine Solidity-Datei oder ein Projektverzeichnis sein):

```bash
$ manticore project
```

Du erhältst die Ausgabe von Testfällen wie diesem (die Reihenfolge kann sich ändern):

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

Ohne zusätzliche Informationen untersucht Manticore den Vertrag mit neuen symbolischen Transaktionen, bis es keine neuen Pfade mehr auf dem Vertrag untersucht. Manticore führt nach einer fehlgeschlagenen Transaktion (z. B. nach einem Revert) keine neuen Transaktionen aus.

Manticore gibt die Informationen in einem `mcore_*`-Verzeichnis aus. Unter anderem findest du in diesem Verzeichnis:

- `global.summary`: Abdeckung und Compiler-Warnungen
- `test_XXXXX.summary`: Abdeckung, letzte Anweisung, Kontostände pro Testfall
- `test_XXXXX.tx`: detaillierte Liste der Transaktionen pro Testfall

Hier findet Manticore 7 Testfälle, die Folgendem entsprechen (die Reihenfolge der Dateinamen kann sich ändern):

|                                                           |    Transaktion 0   |        Transaktion 1       | Transaktion 2              | Ergebnis |
| :-------------------------------------------------------: | :----------------: | :------------------------: | -------------------------- | :------: |
| **test_00000000.tx** | Vertragserstellung | f(!=65) | f(!=65) |   STOP   |
| **test_00000001.tx** | Vertragserstellung |      Fallback-Funktion     |                            |  REVERT  |
| **test_00000002.tx** | Vertragserstellung |                            |                            |  RETURN  |
| **test_00000003.tx** | Vertragserstellung |  f(65)  |                            |  REVERT  |
| **test_00000004.tx** | Vertragserstellung | f(!=65) |                            |   STOP   |
| **test_00000005.tx** | Vertragserstellung | f(!=65) | f(65)   |  REVERT  |
| **test_00000006.tx** | Vertragserstellung | f(!=65) | Fallback-Funktion          |  REVERT  |

_Zusammenfassung der Untersuchung: f(!=65) bezeichnet einen Aufruf von f mit einem beliebigen Wert, der nicht 65 ist._

Wie du sehen kannst, generiert Manticore für jede erfolgreiche oder rückgängig gemachte (reverted) Transaktion einen eindeutigen Testfall.

Verwende das `--quick-mode`-Flag, wenn du eine schnelle Code-Untersuchung wünschst (es deaktiviert Fehlerdetektoren, Gas-Berechnung, ...)

### Einen Smart Contract über die API manipulieren {#manipulate-a-smart-contract-through-the-api}

Dieser Abschnitt beschreibt im Detail, wie man einen Smart Contract über die Manticore-Python-API manipuliert. Du kannst eine neue Datei mit der Python-Erweiterung `*.py` erstellen und den notwendigen Code schreiben, indem du die API-Befehle (deren Grundlagen unten beschrieben werden) in diese Datei einfügst und sie dann mit dem Befehl `$ python3 *.py` ausführst. Du kannst die folgenden Befehle auch direkt in der Python-Konsole ausführen. Um die Konsole zu starten, verwende den Befehl `$ python3`.

### Erstellen von Konten {#creating-accounts}

Als Erstes solltest du mit den folgenden Befehlen eine neue Blockchain initialisieren:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Ein Nicht-Vertragskonto wird mit [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) erstellt:

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

- Du kannst Benutzer- und Vertragskonten mit [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) und [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) erstellen.

### Ausführen von Transaktionen {#executing-transactions}

Manticore unterstützt zwei Arten von Transaktionen:

- Raw-Transaktion: Alle Funktionen werden untersucht
- Benannte Transaktion: Es wird nur eine Funktion untersucht

#### Raw-Transaktion {#raw-transaction}

Eine Raw-Transaktion wird mit [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) ausgeführt:

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Der Aufrufer, die Adresse, die Daten oder der Wert der Transaktion können entweder konkret oder symbolisch sein:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) erstellt einen symbolischen Wert.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) erstellt ein symbolisches Byte-Array.

Beispiel:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Wenn die Daten symbolisch sind, untersucht Manticore während der Transaktionsausführung alle Funktionen des Vertrags. Es ist hilfreich, die Erklärung der Fallback-Funktion im Artikel [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) zu lesen, um zu verstehen, wie die Funktionsauswahl funktioniert.

#### Benannte Transaktion {#named-transaction}

Funktionen können über ihren Namen ausgeführt werden.
Um `f(uint var)` mit einem symbolischen Wert, von `user_account` und mit 0 Ether auszuführen, verwende:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Wenn der `value` der Transaktion nicht angegeben ist, ist er standardmäßig 0.

#### Zusammenfassung {#summary-1}

- Argumente einer Transaktion können konkret oder symbolisch sein
- Eine Raw-Transaktion untersucht alle Funktionen
- Funktionen können über ihren Namen aufgerufen werden

### Arbeitsbereich {#workspace}

`m.workspace` ist das Verzeichnis, das als Ausgabeverzeichnis für alle erzeugten Dateien verwendet wird:

```python
print("Ergebnisse sind in {}".format(m.workspace))
```

### Die Untersuchung beenden {#terminate-the-exploration}

Um die Untersuchung zu beenden, verwende [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Sobald diese Methode aufgerufen wird, sollten keine weiteren Transaktionen gesendet werden. Manticore generiert dann Testfälle für jeden untersuchten Pfad.

### Zusammenfassung: Ausführung mit Manticore {#summary-running-under-manticore}

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

print("Ergebnisse sind in {}".format(m.workspace))
m.finalize() # die Untersuchung anhalten
```

Den gesamten obigen Code findest du in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Pfade erhalten, die eine Ausnahme auslösen {#getting-throwing-paths}

Wir generieren nun spezifische Eingaben für die Pfade, die in `f()` eine Ausnahme auslösen. Das Ziel ist nach wie vor der folgende Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Verwenden von Zustandsinformationen {#using-state-information}

Jeder ausgeführte Pfad hat seinen eigenen Zustand der Blockchain. Ein Zustand ist entweder bereit (ready) oder beendet (killed), was bedeutet, dass er eine THROW- oder REVERT-Anweisung erreicht:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): die Liste der Zustände, die bereit sind (sie haben kein REVERT/INVALID ausgeführt)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): die Liste der beendeten Zustände
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): alle Zustände

```python
for state in m.all_states:
    # etwas mit dem Zustand tun
```

Du kannst auf Zustandsinformationen zugreifen. Beispiel:

- `state.platform.get_balance(account.address)`: der Kontostand des Kontos
- `state.platform.transactions`: die Liste der Transaktionen
- `state.platform.transactions[-1].return_data`: die von der letzten Transaktion zurückgegebenen Daten

Die von der letzten Transaktion zurückgegebenen Daten sind ein Array, das beispielsweise mit `ABI.deserialize` in einen Wert umgewandelt werden kann:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### So generierst du einen Testfall {#how-to-generate-testcase}

Verwende [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase), um einen Testfall zu generieren:

```python
m.generate_testcase(state, 'BugFound')
```

### Zusammenfassung {#summary-2}

- Du kannst mit `m.all_states` über die Zustände iterieren
- `state.platform.get_balance(account.address)` gibt den Kontostand des Kontos zurück
- `state.platform.transactions` gibt die Liste der Transaktionen zurück
- `transaction.return_data` sind die zurückgegebenen Daten
- `m.generate_testcase(state, name)` generiert Eingaben für den Zustand

### Zusammenfassung: Pfad erhalten, der eine Ausnahme auslöst {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Prüfen, ob eine Ausführung mit REVERT oder INVALID endet
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Ausnahme gefunden {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Den gesamten obigen Code findest du in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Hinweis: Wir hätten ein viel einfacheres Skript generieren können, da alle von `terminated_state` zurückgegebenen Zustände REVERT oder INVALID in ihrem Ergebnis haben: Dieses Beispiel sollte nur demonstrieren, wie man die API manipuliert._

## Hinzufügen von Einschränkungen {#adding-constraints}

Wir werden sehen, wie man die Untersuchung einschränken kann. Wir gehen von der Annahme aus, dass die Dokumentation von `f()` besagt, dass die Funktion niemals mit `a == 65` aufgerufen wird, sodass jeder Fehler bei `a == 65` kein echter Fehler ist. Das Ziel ist nach wie vor der folgende Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Das [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py)-Modul erleichtert die Bearbeitung von Einschränkungen und bietet unter anderem Folgendes:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than),
- Operators.UGE (unsigned greater than or equal to),
- Operators.ULT (unsigned lower than),
- Operators.ULE (unsigned lower than or equal to).

Verwende Folgendes, um das Modul zu importieren:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` wird verwendet, um ein Array mit einem Wert zu verketten. Zum Beispiel muss `return_data` einer Transaktion in einen Wert geändert werden, um ihn mit einem anderen Wert zu vergleichen:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Einschränkungen {#state-constraint}

Du kannst Einschränkungen global oder für einen bestimmten Zustand verwenden.

#### Globale Einschränkung {#state-constraint}

Verwende `m.constrain(constraint)`, um eine globale Einschränkung hinzuzufügen.
Du kannst zum Beispiel einen Vertrag von einer symbolischen Adresse aus aufrufen und diese Adresse auf bestimmte Werte beschränken:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Zustandsbeschränkung {#state-constraint}

Verwende [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain), um eine Einschränkung zu einem bestimmten Zustand hinzuzufügen.
Dies kann verwendet werden, um den Zustand nach seiner Untersuchung einzuschränken, um eine Eigenschaft darin zu überprüfen.

### Einschränkung prüfen {#checking-constraint}

Verwende `solver.check(state.constraints)`, um zu erfahren, ob eine Einschränkung noch erfüllbar ist.
Das folgende Beispiel schränkt beispielsweise `symbolic_value` so ein, dass es sich von 65 unterscheidet, und prüft, ob der Zustand noch erfüllbar ist:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # Zustand ist erfüllbar
```

### Zusammenfassung: Hinzufügen von Einschränkungen {#summary-adding-constraints}

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

## Prüfen, ob eine Ausführung mit REVERT oder INVALID endet
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # wir betrachten den Pfad nicht, in dem a == 65 ist
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Fehler gefunden, Ergebnisse sind in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'Kein Fehler gefunden')
```

Den gesamten obigen Code findest du in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
