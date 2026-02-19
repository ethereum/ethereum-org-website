---
title: "Jak korzystać z Manticore, aby znaleźć błędy w inteligentnych kontraktach"
description: "Jak używać Manticore do automatycznego wyszukiwania błędów w inteligentnych kontraktach"
author: Trailofbits
lang: pl
tags:
  [
    "solidity",
    "smart kontrakty",
    "bezpieczeństwo",
    "testowanie",
    "weryfikacja formalna"
  ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Celem tego samouczka jest pokazanie, jak używać Manticore do automatycznego wyszukiwania błędów w inteligentnych kontraktach.

## Instalacja {#installation}

Manticore wymaga Pythona >= 3.6. Można go zainstalować za pomocą pip lub dockera.

### Manticore przez docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Ostatnie polecenie uruchamia eth-security-toolbox w dockerze, który ma dostęp do bieżącego katalogu. Możesz zmienić pliki z hosta i uruchomić narzędzia na plikach z dockera_

Wewnątrz dockera uruchom:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore przez pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Zalecany jest solc w wersji 0.5.11.

### Uruchamianie skryptu {#running-a-script}

Aby uruchomić skrypt Pythona za pomocą Pythona 3:

```bash
python3 script.py
```

## Wprowadzenie do dynamicznej egzekucji symbolicznej {#introduction-to-dynamic-symbolic-execution}

### Dynamiczna egzekucja symboliczna w pigułce {#dynamic-symbolic-execution-in-a-nutshell}

Dynamiczna egzekucja symboliczna (DSE) to technika analizy programu, która bada przestrzeń stanów z wysokim stopniem świadomości semantycznej. Technika ta opiera się na odkrywaniu „ścieżek programu” reprezentowanych jako formuły matematyczne zwane `path predicates`. Koncepcyjnie, technika ta operuje na predykatach ścieżek w dwóch krokach:

1. Są one konstruowane przy użyciu ograniczeń na wejściu programu.
2. Są one używane do generowania danych wejściowych programu, które spowodują wykonanie powiązanych ścieżek.

Podejście to nie generuje fałszywych alarmów, w tym sensie, że wszystkie zidentyfikowane stany programu mogą zostać wywołane podczas konkretnej egzekucji. Na przykład, jeśli analiza znajdzie przepełnienie liczby całkowitej, jest ono gwarantowanie odtwarzalne.

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

Każdy predykat ścieżki jest formułą matematyczną, którą można przekazać do tak zwanego [solvera SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), który spróbuje rozwiązać równanie. Dla `Ścieżki 1` solver stwierdzi, że ścieżka może być zbadana przy `a = 65`. Dla `Ścieżki 2` solver może podać dla `a` dowolną wartość inną niż 65, na przykład `a = 0`.

### Weryfikacja właściwości {#verifying-properties}

Manticore pozwala na pełną kontrolę nad wykonaniem każdej ścieżki. W rezultacie pozwala na dodawanie dowolnych ograniczeń do prawie wszystkiego. Taka kontrola pozwala na tworzenie właściwości w kontrakcie.

Rozważmy następujący przykład:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // brak zabezpieczenia przed przepełnieniem
  return c;
}
```

W tej funkcji istnieje tylko jedna ścieżka do zbadania:

- Ścieżka 1: `c = a + b`

Używając Manticore, można sprawdzić przepełnienie i dodać ograniczenia do predykatu ścieżki:

- `c = a + b AND (c < a OR c < b)`

Jeśli możliwe jest znalezienie takich wartości `a` i `b`, dla których powyższy predykat ścieżki jest spełnialny, oznacza to, że znaleziono przepełnienie. Na przykład solver może wygenerować dane wejściowe `a = 10, b = MAXUINT256`.

Rozważmy poprawioną wersję:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Powiązana formuła ze sprawdzaniem przepełnienia wyglądałaby następująco:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Ta formuła nie może zostać rozwiązana; innymi słowy jest to **dowód** na to, że w `safe_add`, `c` zawsze będzie rosło.

Dlatego DSE jest potężnym narzędziem, które może weryfikować dowolne ograniczenia w Twoim kodzie.

## Uruchamianie w Manticore {#running-under-manticore}

W tej sekcji pokazano, jak eksplorować inteligentny kontrakt przy użyciu API Manticore. Celem jest następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Uruchomienie samodzielnej eksploracji {#run-a-standalone-exploration}

Możesz uruchomić Manticore bezpośrednio na inteligentnym kontrakcie za pomocą następującego polecenia (`project` może być plikiem Solidity lub katalogiem projektu):

```bash
$ manticore project
```

Otrzymasz dane wyjściowe przypadków testowych, takie jak te (kolejność może się zmienić):

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

Bez dodatkowych informacji Manticore będzie badać kontrakt za pomocą nowych transakcji symbolicznych, dopóki nie zbada nowych ścieżek w kontrakcie. Manticore nie uruchamia nowych transakcji po nieudanej transakcji (np. po operacji `revert`).

Manticore zapisze informacje w katalogu `mcore_*`. W tym katalogu znajdziesz między innymi:

- `global.summary`: pokrycie kodu i ostrzeżenia kompilatora
- `test_XXXXX.summary`: pokrycie kodu, ostatnia instrukcja, salda kont dla każdego przypadku testowego
- `test_XXXXX.tx`: szczegółowa lista transakcji dla każdego przypadku testowego

Manticore znajduje tutaj 7 przypadków testowych, które odpowiadają (kolejność nazw plików może się zmienić):

|                                                           |     Transakcja 0     |        Transakcja 1        | Transakcja 2               |  Wynik |
| :-------------------------------------------------------: | :------------------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | Utworzenie kontraktu | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | Utworzenie kontraktu |      funkcja zastępcza     |                            | REVERT |
| **test_00000002.tx** | Utworzenie kontraktu |                            |                            | RETURN |
| **test_00000003.tx** | Utworzenie kontraktu |  f(65)  |                            | REVERT |
| **test_00000004.tx** | Utworzenie kontraktu | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | Utworzenie kontraktu | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | Utworzenie kontraktu | f(!=65) | funkcja zastępcza          | REVERT |

_Podsumowanie eksploracji: f(!=65) oznacza wywołanie f z dowolną wartością inną niż 65._

Jak można zauważyć, Manticore generuje unikalny przypadek testowy dla każdej pomyślnej lub anulowanej (`reverted`) transakcji.

Użyj flagi `--quick-mode`, jeśli chcesz szybkiej eksploracji kodu (wyłącza ona wykrywacze błędów, obliczanie gazu, ...)

### Manipulowanie inteligentnym kontraktem poprzez API {#manipulate-a-smart-contract-through-the-api}

Ta sekcja opisuje szczegółowo, jak manipulować inteligentnym kontraktem za pośrednictwem API Manticore dla Pythona. Możesz utworzyć nowy plik z rozszerzeniem Pythona `*.py` i napisać niezbędny kod, dodając polecenia API (których podstawy zostaną opisane poniżej) do tego pliku, a następnie uruchomić go za pomocą polecenia `$ python3 *.py`. Możesz również wykonać poniższe polecenia bezpośrednio w konsoli Pythona. Aby uruchomić konsolę, użyj polecenia `$ python3`.

### Tworzenie kont {#creating-accounts}

Pierwszą rzeczą, którą należy zrobić, jest zainicjowanie nowego blockchaina za pomocą następujących poleceń:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Konto niebędące kontraktem jest tworzone za pomocą [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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
# Zainicjuj kontrakt
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Podsumowanie {#summary}

- Można tworzyć konta użytkowników i konta kontraktów za pomocą [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) i [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Wykonywanie transakcji {#executing-transactions}

Manticore obsługuje dwa typy transakcji:

- Surowa transakcja: wszystkie funkcje są badane
- Nazwana transakcja: tylko jedna funkcja jest badana

#### Surowa transakcja {#raw-transaction}

Surowa transakcja jest wykonywana za pomocą [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

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

Jeśli dane są symboliczne, Manticore zbada wszystkie funkcje kontraktu podczas wykonywania transakcji. Pomocne będzie zapoznanie się z wyjaśnieniem funkcji fallback w artykule [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/), aby zrozumieć, jak działa wybór funkcji.

#### Nazwana transakcja {#named-transaction}

Funkcje mogą być wykonywane za pomocą ich nazwy.
Aby wykonać `f(uint var)` z wartością symboliczną, z `user_account` i 0 etherów, użyj:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Jeśli `value` transakcji nie jest określone, domyślnie wynosi 0.

#### Podsumowanie {#summary-1}

- Argumenty transakcji mogą być konkretne lub symboliczne
- Surowa transakcja zbada wszystkie funkcje
- Funkcje mogą być wywoływane po nazwie

### Przestrzeń robocza {#workspace}

`m.workspace` to katalog używany jako katalog wyjściowy dla wszystkich wygenerowanych plików:

```python
print("Results are in {}".format(m.workspace))
```

### Zakończenie eksploracji {#terminate-the-exploration}

Aby zatrzymać eksplorację, użyj [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Po wywołaniu tej metody nie należy wysyłać żadnych dalszych transakcji, a Manticore generuje przypadki testowe dla każdej zbadanej ścieżki.

### Podsumowanie: Uruchamianie w Manticore {#summary-running-under-manticore}

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

## Uzyskiwanie ścieżek powodujących błąd {#getting-throwing-paths}

Teraz wygenerujemy określone dane wejściowe dla ścieżek zgłaszających wyjątek w `f()`. Celem nadal jest następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Każda wykonana ścieżka ma swój stan blockchaina. Stan jest gotowy albo zakończony (killed), co oznacza, że osiąga instrukcję THROW lub REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): lista stanów, które są gotowe (nie wykonały REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): lista stanów, które są zakończone (killed)
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

- Można iterować po stanach za pomocą `m.all_states`
- `state.platform.get_balance(account.address)` zwraca saldo konta
- `state.platform.transactions` zwraca listę transakcji
- `transaction.return_data` to zwrócone dane
- `m.generate_testcase(state, name)` generuje dane wejściowe dla stanu

### Podsumowanie: uzyskiwanie ścieżki powodującej błąd {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Sprawdź, czy wykonanie kończy się instrukcją REVERT lub INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Cały powyższy kod można znaleźć w [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Uwaga: mogliśmy wygenerować znacznie prostszy skrypt, ponieważ wszystkie stany zwrócone przez `terminated_states` mają w wyniku REVERT lub INVALID: ten przykład miał jedynie na celu zademonstrowanie, jak manipulować API._

## Dodawanie ograniczeń {#adding-constraints}

Zobaczymy, jak ograniczyć eksplorację. Przyjmiemy założenie, że dokumentacja funkcji `f()` stwierdza, że funkcja nigdy nie jest wywoływana z `a == 65`, więc każdy błąd przy `a == 65` nie jest prawdziwym błędem. Celem nadal jest następujący inteligentny kontrakt [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Moduł [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) ułatwia manipulowanie ograniczeniami, między innymi udostępnia:

- Operators.AND,
- Operators.OR,
- Operators.UGT (większe niż bez znaku),
- Operators.UGE (większe lub równe niż bez znaku),
- Operators.ULT (mniejsze niż bez znaku),
- Operators.ULE (mniejsze lub równe niż bez znaku).

Aby zaimportować moduł, użyj następującego polecenia:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` służy do łączenia tablicy z wartością. Na przykład `return_data` transakcji musi zostać zmienione na wartość, aby można było je porównać z inną wartością:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Ograniczenia {#state-constraint}

Można używać ograniczeń globalnie lub dla określonego stanu.

#### Ograniczenie globalne {#state-constraint}

Użyj `m.constrain(constraint)`, aby dodać ograniczenie globalne.
Na przykład, można wywołać kontrakt z adresu symbolicznego i ograniczyć ten adres do określonych wartości:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Ograniczenie stanu {#state-constraint}

Użyj [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain), aby dodać ograniczenie do określonego stanu.
Można go użyć do ograniczenia stanu po jego eksploracji, aby sprawdzić na nim pewną właściwość.

### Sprawdzanie ograniczenia {#checking-constraint}

Użyj `solver.check(state.constraints)`, aby dowiedzieć się, czy ograniczenie jest nadal możliwe do spełnienia.
Na przykład, poniższy kod ograniczy `symbolic_value` do wartości innej niż 65 i sprawdzi, czy stan jest nadal możliwy do spełnienia:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # stan jest możliwy do spełnienia
```

### Podsumowanie: dodawanie ograniczeń {#summary-adding-constraints}

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

## Sprawdź, czy wykonanie kończy się instrukcją REVERT lub INVALID

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # nie bierzemy pod uwagę ścieżki, w której a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Cały powyższy kod można znaleźć w [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
