---
title: Jak używać Manticore do znajdowania błędów w inteligentnych kontraktach
description: Jak używać Manticore do automatycznego znajdowania błędów w inteligentnych kontraktach
author: Trailofbits
lang: pl
tags:
  ["solidity", "inteligentne kontrakty", "bezpieczeństwo", "testowanie", "weryfikacja formalna"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Celem tego samouczka jest pokazanie, jak używać Manticore do automatycznego znajdowania błędów w inteligentnych kontraktach.

## Instalacja {#installation}

Manticore wymaga języka Python w wersji >= 3.6. Można go zainstalować za pomocą pip lub używając narzędzia Docker.

### Manticore przez Docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Ostatnie polecenie uruchamia eth-security-toolbox w kontenerze Docker, który ma dostęp do bieżącego katalogu. Możesz zmieniać pliki na swoim hoście i uruchamiać narzędzia na plikach z poziomu Dockera_

Wewnątrz Dockera uruchom:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore przez pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Zalecana jest wersja solc 0.5.11.

### Uruchamianie skryptu {#running-a-script}

Aby uruchomić skrypt w języku Python za pomocą Python 3:

```bash
python3 script.py
```

## Wprowadzenie do dynamicznego wykonywania symbolicznego {#introduction-to-dynamic-symbolic-execution}

### Dynamiczne wykonywanie symboliczne w pigułce {#dynamic-symbolic-execution-in-a-nutshell}

Dynamiczne wykonywanie symboliczne (DSE) to technika analizy programów, która bada przestrzeń stanów z wysokim stopniem świadomości semantycznej. Technika ta opiera się na odkrywaniu „ścieżek programu”, reprezentowanych jako formuły matematyczne zwane `path predicates` (predykatami ścieżek). Koncepcyjnie technika ta operuje na predykatach ścieżek w dwóch krokach:

1. Są one konstruowane przy użyciu ograniczeń nałożonych na dane wejściowe programu.
2. Są one używane do generowania danych wejściowych programu, które spowodują wykonanie powiązanych ścieżek.

Takie podejście nie generuje fałszywych alarmów (false positives) w tym sensie, że wszystkie zidentyfikowane stany programu mogą zostać wywołane podczas konkretnego wykonania. Na przykład, jeśli analiza znajdzie przepełnienie liczby całkowitej, gwarantuje to, że jest ono powtarzalne.

### Przykład predykatu ścieżki {#path-predicate-example}

Aby zrozumieć, jak działa DSE, rozważmy następujący przykład:

```solidity
function f(uint a){

  if (a == 65) {
      // Występuje błąd
  }

}
```

Ponieważ `f()` zawiera dwie ścieżki, DSE skonstruuje dwa różne predykaty ścieżek:

- Ścieżka 1: `a == 65`
- Ścieżka 2: `Not (a == 65)`

Każdy predykat ścieżki jest formułą matematyczną, którą można przekazać do tak zwanego [solwera SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), który spróbuje rozwiązać równanie. Dla `Path 1` solwer stwierdzi, że ścieżkę można zbadać za pomocą `a = 65`. Dla `Path 2` solwer może przypisać `a` dowolną wartość inną niż 65, na przykład `a = 0`.

### Weryfikacja właściwości {#verifying-properties}

Manticore pozwala na pełną kontrolę nad całym wykonaniem każdej ścieżki. W rezultacie umożliwia dodawanie dowolnych ograniczeń do niemal wszystkiego. Ta kontrola pozwala na tworzenie właściwości w kontrakcie.

Rozważmy następujący przykład:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // brak ochrony przed przepełnieniem
  return c;
}
```

Tutaj w funkcji jest tylko jedna ścieżka do zbadania:

- Ścieżka 1: `c = a + b`

Używając Manticore, możesz sprawdzić, czy występuje przepełnienie, i dodać ograniczenia do predykatu ścieżki:

- `c = a + b AND (c < a OR c < b)`

Jeśli możliwe jest znalezienie wartości `a` i `b`, dla których powyższy predykat ścieżki jest wykonalny, oznacza to, że znaleziono przepełnienie. Na przykład solwer może wygenerować dane wejściowe `a = 10 , b = MAXUINT256`.

Jeśli weźmiesz pod uwagę naprawioną wersję:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Powiązana formuła ze sprawdzeniem przepełnienia wyglądałaby następująco:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Tej formuły nie da się rozwiązać; innymi słowy jest to **dowód**, że w `safe_add` wartość `c` zawsze będzie rosła.

DSE jest zatem potężnym narzędziem, które może weryfikować dowolne ograniczenia w Twoim kodzie.

## Uruchamianie pod Manticore {#running-under-manticore}

Zobaczymy, jak badać inteligentny kontrakt za pomocą API Manticore. Celem jest następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Uruchamianie samodzielnej eksploracji {#run-a-standalone-exploration}

Możesz uruchomić Manticore bezpośrednio na inteligentnym kontrakcie za pomocą następującego polecenia (`project` może być plikiem Solidity lub katalogiem projektu):

```bash
$ manticore project
```

Otrzymasz wyniki przypadków testowych podobne do tych (kolejność może ulec zmianie):

```
...
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 0 - STOP
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 1 - REVERT
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 2 - RETURN
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 3 - REVERT
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 4 - STOP
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 5 - REVERT
... m.c.manticore:INFO: Wygenerowano przypadek testowy nr 6 - REVERT
... m.c.manticore:INFO: Wyniki w /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Bez dodatkowych informacji Manticore będzie badać kontrakt za pomocą nowych symbolicznych transakcji, dopóki nie przestanie odkrywać nowych ścieżek w kontrakcie. Manticore nie uruchamia nowych transakcji po nieudanej (np. po wycofaniu).

Manticore wypisze informacje w katalogu `mcore_*`. W tym katalogu znajdziesz między innymi:

- `global.summary`: pokrycie kodu i ostrzeżenia kompilatora
- `test_XXXXX.summary`: pokrycie kodu, ostatnia instrukcja, salda kont dla każdego przypadku testowego
- `test_XXXXX.tx`: szczegółowa lista transakcji dla każdego przypadku testowego

Tutaj Manticore znajduje 7 przypadków testowych, które odpowiadają (kolejność nazw plików może ulec zmianie):

|                      |   Transakcja 0    |   Transakcja 1    | Transakcja 2      | Wynik  |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Utworzenie kontraktu |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Utworzenie kontraktu | funkcja rezerwowa |                   | REVERT |
| **test_00000002.tx** | Utworzenie kontraktu |                   |                   | RETURN |
| **test_00000003.tx** | Utworzenie kontraktu |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Utworzenie kontraktu |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Utworzenie kontraktu |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Utworzenie kontraktu |      f(!=65)      | funkcja rezerwowa | REVERT |

_Podsumowanie eksploracji: f(!=65) oznacza wywołanie funkcji f z dowolną wartością inną niż 65._

Jak można zauważyć, Manticore generuje unikalny przypadek testowy dla każdej udanej lub wycofanej transakcji.

Użyj flagi `--quick-mode`, jeśli zależy Ci na szybkiej eksploracji kodu (wyłącza to detektory błędów, obliczanie gazu itp.).

### Manipulowanie inteligentnym kontraktem przez API {#manipulate-a-smart-contract-through-the-api}

Ta sekcja opisuje szczegóły manipulowania inteligentnym kontraktem za pomocą API Manticore w języku Python. Możesz utworzyć nowy plik z rozszerzeniem Pythona `*.py` i napisać niezbędny kod, dodając do niego polecenia API (których podstawy zostaną opisane poniżej), a następnie uruchomić go za pomocą polecenia `$ python3 *.py`. Możesz również wykonywać poniższe polecenia bezpośrednio w konsoli Pythona; aby uruchomić konsolę, użyj polecenia `$ python3`.

### Tworzenie kont {#creating-accounts}

Pierwszą rzeczą, którą powinieneś zrobić, jest zainicjowanie nowego blockchaina za pomocą następujących poleceń:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Konto niebędące kontraktem tworzy się za pomocą [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Kontrakt w języku Solidity można wdrożyć za pomocą [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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

#### Podsumowanie {#summary}

- Możesz tworzyć konta użytkowników i konta kontraktów za pomocą [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) oraz [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Wykonywanie transakcji {#executing-transactions}

Manticore obsługuje dwa typy transakcji:

- Transakcja surowa (raw transaction): badane są wszystkie funkcje
- Transakcja nazwana (named transaction): badana jest tylko jedna funkcja

#### Transakcja surowa {#raw-transaction}

Surową transakcję wykonuje się za pomocą [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Wywołujący, adres, dane lub wartość transakcji mogą być konkretne lub symboliczne:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) tworzy wartość symboliczną.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) tworzy symboliczną tablicę bajtów.

Na przykład:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Jeśli dane są symboliczne, Manticore zbada wszystkie funkcje kontraktu podczas wykonywania transakcji. Pomocne będzie zapoznanie się z wyjaśnieniem funkcji rezerwowej (fallback function) w artykule [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/), aby zrozumieć, jak działa wybór funkcji.

#### Transakcja nazwana {#named-transaction}

Funkcje można wykonywać poprzez ich nazwę.
Aby wykonać `f(uint var)` z wartością symboliczną, z konta user_account i z wartością 0 ether, użyj:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Jeśli `value` transakcji nie jest określona, domyślnie wynosi 0.

#### Podsumowanie {#summary-1}

- Argumenty transakcji mogą być konkretne lub symboliczne
- Surowa transakcja zbada wszystkie funkcje
- Funkcje można wywoływać po ich nazwie

### Przestrzeń robocza {#workspace}

`m.workspace` to katalog używany jako katalog wyjściowy dla wszystkich wygenerowanych plików:

```python
print("Results are in {}".format(m.workspace))
```

### Zakończenie eksploracji {#terminate-the-exploration}

Aby zatrzymać eksplorację, użyj [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Po wywołaniu tej metody nie należy wysyłać żadnych dalszych transakcji, a Manticore wygeneruje przypadki testowe dla każdej zbadanej ścieżki.

### Podsumowanie: Uruchamianie pod Manticore {#summary-running-under-manticore}

Łącząc wszystkie poprzednie kroki, otrzymujemy:

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
m.finalize() # zatrzymaj eksplorację
```

Cały powyższy kod można znaleźć w [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Uzyskiwanie ścieżek zgłaszających wyjątki {#getting-throwing-paths}

Wygenerujemy teraz konkretne dane wejściowe dla ścieżek zgłaszających wyjątek w `f()`. Celem jest nadal następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Korzystanie z informacji o stanie {#using-state-information}

Każda wykonana ścieżka ma swój stan blockchaina. Stan jest albo gotowy (ready), albo zabity (killed), co oznacza, że osiąga instrukcję THROW lub REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): lista stanów, które są gotowe (nie wykonały REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): lista stanów, które zostały zabite
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): wszystkie stany

```python
for state in m.all_states:
    # zrób coś ze stanem
```

Możesz uzyskać dostęp do informacji o stanie. Na przykład:

- `state.platform.get_balance(account.address)`: saldo konta
- `state.platform.transactions`: lista transakcji
- `state.platform.transactions[-1].return_data`: dane zwrócone przez ostatnią transakcję

Dane zwrócone przez ostatnią transakcję to tablica, którą można przekonwertować na wartość za pomocą ABI.deserialize, na przykład:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Jak wygenerować przypadek testowy {#how-to-generate-testcase}

Użyj [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase), aby wygenerować przypadek testowy:

```python
m.generate_testcase(state, 'BugFound')
```

### Podsumowanie {#summary-2}

- Możesz iterować po stanie za pomocą m.all_states
- `state.platform.get_balance(account.address)` zwraca saldo konta
- `state.platform.transactions` zwraca listę transakcji
- `transaction.return_data` to zwrócone dane
- `m.generate_testcase(state, name)` generuje dane wejściowe dla stanu

### Podsumowanie: Uzyskiwanie ścieżki zgłaszającej wyjątek {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Sprawdź, czy wykonanie kończy się wycofaniem lub INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Cały powyższy kod można znaleźć w [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Uwaga: moglibyśmy wygenerować znacznie prostszy skrypt, ponieważ wszystkie stany zwrócone przez terminated_state mają w swoim wyniku REVERT lub INVALID. Ten przykład miał jedynie na celu zademonstrowanie, jak manipulować API._

## Dodawanie ograniczeń {#adding-constraints}

Zobaczymy, jak ograniczyć eksplorację. Założymy, że dokumentacja `f()` stwierdza, że funkcja nigdy nie jest wywoływana z `a == 65`, więc każdy błąd z `a == 65` nie jest prawdziwym błędem. Celem jest nadal następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Operatory {#operators}

Moduł [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) ułatwia manipulowanie ograniczeniami, a między innymi zapewnia:

- Operators.AND,
- Operators.OR,
- Operators.UGT (unsigned greater than - bez znaku większe niż),
- Operators.UGE (unsigned greater than or equal to - bez znaku większe lub równe),
- Operators.ULT (unsigned lower than - bez znaku mniejsze niż),
- Operators.ULE (unsigned lower than or equal to - bez znaku mniejsze lub równe).

Aby zaimportować moduł, użyj następującego kodu:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` służy do łączenia tablicy w wartość. Na przykład return_data transakcji musi zostać zmienione na wartość, aby można było ją porównać z inną wartością:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Ograniczenia {#state-constraint}

Możesz używać ograniczeń globalnie lub dla określonego stanu.

#### Ograniczenie globalne {#state-constraint-2}

Użyj `m.constrain(constraint)`, aby dodać globalne ograniczenie.
Na przykład możesz wywołać kontrakt z symbolicznego adresu i ograniczyć ten adres do określonych wartości:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Ograniczenie stanu {#state-constraint-3}

Użyj [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain), aby dodać ograniczenie do określonego stanu.
Można tego użyć do ograniczenia stanu po jego zbadaniu, aby sprawdzić na nim pewną właściwość.

### Sprawdzanie ograniczenia {#checking-constraint}

Użyj `solver.check(state.constraints)`, aby dowiedzieć się, czy ograniczenie jest nadal wykonalne.
Na przykład poniższy kod ograniczy symbolic_value do wartości innej niż 65 i sprawdzi, czy stan jest nadal wykonalny:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # stan jest wykonalny
```

### Podsumowanie: Dodawanie ograniczeń {#summary-adding-constraints}

Dodając ograniczenie do poprzedniego kodu, otrzymujemy:

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

## Sprawdź, czy wykonanie kończy się wycofaniem lub INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # nie rozważamy ścieżki, w której a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Cały powyższy kod można znaleźć w [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)