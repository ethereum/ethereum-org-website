---
title: Jak korzystać z Manticore, aby znaleźć błędy w inteligentnych kontraktach
description: Jak używać Manticore do automatycznego wyszukiwania błędów w inteligentnych kontraktach
author: Trailofbits
lang: pl
tags:
  - "solidity"
  - "inteligentne kontrakty"
  - "ochrona"
  - "testing"
  - "weryfikacja formalna"
skill: advanced
published: 2020-01-13
source: Tworzenie bezpiecznych kontraktów
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Celem tego samouczka jest pokazanie, jak używać Manticore do automatycznego wyszukiwania błędów w inteligentnych kontraktach.

## Instalacja {#installation}

Manticore wymaga >= Pythona 3.6. Można go zainstalować za pomocą pip lub dockera.

### Manticore przez dockera {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox

```

_Ostatnie polecenie uruchamia eth-security-toolbox w dockerze, który ma dostęp do bieżącego katalogu. Możesz zmienić pliki z hosta i uruchomić narzędzia na plikach z dockera_

Wewnątrz dockera uruchom:

```bash
solc-select 0.5.11 cd /home/trufflecon/
```

### Manticore przez pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

zaleca się solc 0.5.11.

### Uruchom skrypt {#running-a-script}

Aby uruchomić skrypt Pythona za pomocą Pythona 3:

```bash
python3 script.py
```

## Wprowadzenie do dynamicznego wykonania symbolicznego {#introduction-to-dynamic-symbolic-execution}

### Dynamiczne wykonanie symboliczne w skrócie {#dynamic-symbolic-execution-in-a-nutshell}

Dynamiczne wykonanie symboliczne (DSE) to technika analizy programu, która bada przestrzeń stanów z wysokim stopniem świadomości semantycznej. Ta technika opiera się na odkryciu „ścieżek programu”, przedstawianych jako wzory matematyczne o nazwie `path predicates`. W ujęciu koncepcyjnym technika ta działa na ścieżce dwueatpowo:

1. Są one konstruowane przy użyciu ograniczeń na wejściu programu.
2. Są one używane do generowania danych wejściowych programu, które spowodują wykonanie powiązanych ścieżek.

Takie podejście nie daje fałszywych alarmów w tym sensie, że wszystkie zidentyfikowane stany programu mogą zostać wyzwolone podczas konkretnego wykonania. Na przykład, jeżeli w wyniku analizy stwierdza się przepełnienie liczby całkowitej, gwarantuje się, że jest ono odtwarzalne.

### Przykład predykatu ścieżki {#path-predicate-example}

Aby zrozumieć, jak działa DSE, rozważmy następujący przykład:

```solidity
function f(uint a){

  if (a == 65) {
      // A bug is present
  }

}
```

Jako że `f()` zawiera dwie ścieżki, DSE będzie konstruować dwa różne predykaty ścieżki:

- Ścieżka 1: `a == 65`
- Ścieżka 2: `Not (== 65)`

Każdy predykat ścieżki jest wzorem matematycznym, który można przypisać tak zwanemu [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories), który spróbuje rozwiązać to równanie. W przypadku `Path 1` solver powie, że ścieżka może zostać zbadana za pomocą `a = 65`. Dla `Path 2` solver może dać `a` dowolną wartość inną niż 65, na przykład `a = 0`.

### Weryfikacja właściwości {#verifying-properties}

Manticore pozwala na pełną kontrolę nad każdym wykonaniem każdej ścieżki. W rezultacie pozwala dodawać dowolne ograniczenia do prawie wszystkiego. Kontrola ta pozwala na tworzenie właściwości na kontrakcie.

Rozważ następujący przykład:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

Tutaj jest tylko jedna ścieżka do zbadania w funkcji:

- Ścieżka 1: `c = a + b`

Używając Manticore, możesz sprawdzić przepełnienie i dodać ograniczenia do predykatu ścieżki:

- `c = a + b AND (c < a OR c < b)`

Jeśli można znaleźć ocenę `a` i `b`, dla której powyższy predykat ścieżki jest wykonalny, oznacza to, że znaleziono przepełnienie. Na przykład solver może wygenerować wejście `a = 10 , b = MAXUINT256`.

Jeśli rozważasz wersję stałą:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Powiązany wzór z kontrolą przepełnienia to:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Ten wzór nie może być rozwiązany; innymi słowy jest to **dowód**, że w `safe_add` `c` zawsze będzie wzrastać.

DSE jest więc potężnym narzędziem, które może weryfikować dowolne ograniczenia Twojego kodu.

## Uruchamianie pod Manticore {#running-under-manticore}

Zobaczymy, jak zbadać inteligentny kontrakt z API Manticore. Celem jest następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Uruchom samodzielną eksplorację {#run-a-standalone-exploration}

Możesz uruchomić Manticore bezpośrednio na inteligentnym kontrakcie za pomocą następującego polecenia (`projekt` może być plikiem Solidity lub katalogiem projektu):

```bash
$ manticore project
```

Otrzymasz wyniki takich przypadków testowych (kolejność może się zmienić):

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

Bez dodatkowych informacji Manticore będzie badać kontrakt za pomocą nowej transakcji symbolicznej, dopóki nie zbada nowych ścieżek w kontrakcie. Manticore nie uruchamia nowych transakcji po niepowodzeniu (np. po wycofaniu).

Manticore umieści te informacje w katalogu `mcore_*`. W tym katalogu znajdziesz między innymi:

- `global.summary`: ostrzeżenia o zakresie i kompilatorze
- `test_XXXXX.summary`: zakres, ostatnia instrukcja, salda konta na przypadek testowy
- `test_XXXXX.tx`: szczegółowa lista transakcji na przypadek testowy

W tym miejscu Manticore znajduje 7 przypadków testowych, które odpowiadają (nazwa pliku może się zmienić):

|                      |     Transakcja 0     |   Transakcja 1    | Transakcja 2      | Wynik  |
| :------------------: | :------------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Tworzenie kontraktu  |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Tworzenie kontraktu  | funkcja zastępcza |                   | REVERT |
| **test_00000002.tx** | Tworzenie kontraktu  |                   |                   | RETURN |
| **test_00000003.tx** | Tworzenie kontraktu  |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Tworzenie kontraktu  |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Tworzenie kontraktu  |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Tworzenie kontraktów |      f(!=65)      | funkcja zastępcza | REVERT |

_Podsumowanie eksploracji f(!=65) oznacza f o dowolnej wartości innej niż 65._

Jak możesz zauważyć, Manticore generuje unikalny przypadek testowy dla każdej udanej lub odwróconej transakcji.

Użyj flagi `--quick-mode`, jeśli chcesz szybko eksplorować kod (wyłącza wykrywanie błędów, obliczanie gazu, ...)

### Obsługa inteligentnego kontraktu poprzez API {#manipulate-a-smart-contract-through-the-api}

W tej sekcji opisano szczegóły, jak obsługiwać inteligentny kontrakt za pośrednictwem API Pythona Manticore. Możesz utworzyć nowy plik z rozszerzeniem python `*.py` i napisać potrzebny kod, dodając polecenia API (podstawy, które zostaną opisane poniżej) do tego pliku, a następnie uruchom go poleceniem ` $ python3 *.py`. Możesz również wykonać poniższe polecenia bezpośrednio w konsoli Pythona, aby uruchomić konsolę, użyj polecenia `$ python3`.

### Tworzenie kont {#creating-accounts}

Pierwszą rzeczą, którą powinieneś zrobić, jest uruchomienie nowego blockchaina za pomocą następujących poleceń:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Konto bez kontraktu jest tworzone przy użyciu [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Kontrakt Solidity można wdrożyć za pomocą [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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

- Konta użytkowników i konitraktów można tworzyć za pomocą [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) i [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Wykonywanie transakcji {#executing-transactions}

Manticore obsługuje dwa rodzaje transakcji:

- Transakcja surowa: wszystkie funkcje są analizowane
- Nazwana transakcja: analizowana jest tylko jedna funkcja

#### Transakcja surowa {#raw-transaction}

Surowa transakcja jest wykonywana przy użyciu [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

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

Jeżeli dane są symboliczne, Manticore zbada wszystkie funkcje kontraktu podczas realizacji transakcji. Pomocne będzie zapoznanie się z wyjaśnieniem funkcji fallback w artykule wyjaśniającym, jak działa wybór funkcji: [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/).

#### Nazwana transakcja {#named-transaction}

Funkcje mogą być wykonywane za pośrednictwem ich nazwy. Aby wykonać `f(uint var)` z wartością symboliczną, z user_account i 0 etherów, użyj:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Jeśli wartość `value` transakcji nie jest określona, jest to domyślnie 0.

#### Podsumowanie {#summary-1}

- Argumenty transakcji mogą być konkretne lub symboliczne
- Surowa transakcja analizuje wszystkie funkcje
- Funkcja może być wywołana przez jej nazwę

### Obszar roboczy {#workspace}

`m.workspace` to katalog używany jako katalog wyjściowy dla wszystkich wygenerowanych plików:

```python
print("Results are in {}".format(m.workspace))
```

### Kończenie eksploracji {#terminate-the-exploration}

Aby zatrzymać eksplorację, użyj [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Kolejne transakcje nie powinny być wysyłane po wywołaniu tej metody i wygenerowaniu przypadków testowych dla każdej zbadanej ścieżki.

### Podsumowanie: uruchamianie pod Manticore {#summary-running-under-manticore}

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
m.finalize() # stop the exploration
```

Cały powyższy kod można znaleźć w [` example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Pobieranie ścieżek zgłaszania {#getting-throwing-paths}

Teraz wygenerujemy konkretne dane wejściowe dla ścieżek zgłaszających wyjątek w `f()`. Celem jest nadal następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Używanie informacji o stanie {#using-state-information}

Każda wykonana ścieżka ma swój stan blockchain. Stan jest gotowy lub został zabity, co oznacza, że osiąga instrukcję THROW lub REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): lista stanów, które są gotowe (nie wykonały REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): lista stanów, które są gotowe (nie wykonały REVERT/INVALID)
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): wszystkie stany

```python
for state in m.all_states:
    # do something with state
```

Możesz uzyskać dostęp do informacji o stanie. Na przykład:

- `state.platform.get_balance(account.address)`: saldo konta
- `state.platform.transactions`: lista transakcji
- `state.platform.transactions[-1].return_data`: dane zwrócone przez ostatnią transakcję

Dane zwrócone przez ostatnią transakcję są tablicą, która może zostać przekonwertowana na wartość z ABI.deserialize, na przykład:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Jak wygenerować przypadek testowy {#how-to-generate-testcase}

Użyj [m.generate_testcase(stan, nazwa)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) aby wygenerować testcase:

```python
m.generate_testcase(state, 'BugFound')
```

### Podsumowanie {#summary-2}

- Możesz iterować ponad stanem za pomocą stanów m.all_states
- `state.platform.get_balance(account.address)` zwraca saldo konta
- `State.platform.transactions` zwraca listę transakcji
- `transaction.return_data` to dane zwrócone
- `m.generate_testcase(stan, nazwa)` generuje dane wejściowe dla stanu

### Podsumowanie: uzyskanie ścieżki zgłaszania {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Cały powyższy kod można znaleźć w [` example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Zauważ, że mogliśmy wygenerować znacznie prostszy skrypt, ponieważ wszystkie stany zwrócone przez terminated_state mają w wyniku REVERT lub INVALID: ten przykład miał jedynie zademonstrować, jak obsługiwać API._

## Dodawanie ograniczeń {#adding-constraints}

Zobaczymy, jak ograniczyć eksplorację. Przyjmiemy założenie, że dokumentacja `f()` stwierdza, że ​​funkcja nigdy nie jest wywoływana z `a == 65`, więc każdy błąd z `a == 65` nie jest prawdziwy błąd. Celem jest nadal następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Moduł [Operatorzy](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) ułatwia manipulowanie ograniczeniami między innymi:

- Operators.AND,
- Operators.OR,
- Operators.UGT (bez znaku większe niż),
- Operators.UGE (bez znaku większe lub równe),
- Operators.ULT (bez znaku mniejsze niż),
- Operators.ULE (bez znaku mniejsze lub równe).

Aby zaimportować moduł, użyj następujących elementów:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` jest używany do dołączania tablicy do wartości. Na przykład należy zmienić wartość return_data transakcji na wartość sprawdzaną względem innej wartości:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Ograniczenia {#state-constraint}

Możesz używać ograniczeń globalnie lub dla określonego stanu.

#### Globalne ograniczenie {#state-constraint}

Użyj `m.constrain (constraint)` aby dodać globalne ograniczenie. Na przykład możesz wywołać kontrakt z adresu symbolicznego i ograniczyć ten adres do określonych wartości:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Ograniczenie stanu {#state-constraint}

Użyj [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain), aby dodać ograniczenie do określonego stanu Może być używany do ograniczania stanu po jego eksploracji, aby sprawdzić na nim jakąś właściwość.

### Sprawdzanie ograniczenia {#checking-constraint}

Użyj `solver.check(state.constraints)`, aby dowiedzieć się, czy ograniczenie jest nadal możliwe. Na przykład poniższe ograniczy symbolic_value do wartości różnej od 65 i sprawdzi, czy stan jest nadal możliwy:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### Podsumowanie: dodwanie ograniczeń {#summary-adding-constraints}

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Cały powyższy kod można znaleźć w [` example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
