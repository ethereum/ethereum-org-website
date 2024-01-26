---
title: Cum se folosește Manticore pentru a găsi erori în contractele inteligente
description: Cum se folosește Manticore pentru a găsi automat erori în contractele inteligente
author: Trailofbits
lang: ro
tags:
  - "solidity"
  - "contracte inteligente"
  - "securitate"
  - "testare"
  - "verificare formală"
skill: advanced
published: 2020-01-13
source: Construirea de contracte sigure
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Scopul acestui tutorial este de a arăta cum să utilizezi Manticore pentru a găsi automat erori în contractele inteligente.

## Instalare {#installation}

Manticore necesită >= python 3.6. Poate fi instalat prin pip sau folosind docker.

### Manticore prin docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_Ultima comandă rulează „eth-security-toolbox” într-un docker, care are acces la directorul curent. Poți schimba fișierele de la gazda ta și poți rula instrumentele de pe fișierele din docker_

În docker, rulează:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore prin pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 este recomandat.

### Rularea unui script {#running-a-script}

Pentru a rula un script python cu python 3:

```bash
python3 script.py
```

## Introducere în execuția simbolică dinamică {#introduction-to-dynamic-symbolic-execution}

### Execuția simbolică dinamică pe scurt {#dynamic-symbolic-execution-in-a-nutshell}

Execuția simbolică dinamică (DSE) este o tehnică de analiză a programului care explorează un spațiu de stare cu un grad ridicat de conștientizare semantică. Această tehnică se bazează pe descoperirea „căii programului”, reprezentată ca o formulă matematică numită `path predicate` (operator de cale). Conceptual, această tehnică funcționează pe operatori de cale în doi pași:

1. Aceștia sunt construiți folosind restricții la intrarea programului.
2. Ei sunt folosiți pentru a genera intrări de program care vor determina executarea căilor asociate.

Această abordare nu produce falsuri pozitive în sensul că toate stările identificate ale programului pot fi declanșate în timpul execuției concrete. De exemplu, dacă analiza găsește o depășire de întreg, este garantat se poate reproduce.

### Exemplu de operatori de cale {#path-predicate-example}

Pentru a avea o perspectivă despre cum funcționează DSE, ia în considerare următorul exemplu:

```solidity
function f(uint a){

  if (a == 65) {
      // A apărut o eroare
  }

}
```

Deoarece `f()` conține două căi, un DSE va construi doi operatori de cale diferiți:

- Calea 1: `a == 65`
- Calea 2: `Not (a == 65)`

Each path predicate is a mathematical formula that can be given to a so-called [SMT solver](https://wikipedia.org/wiki/Satisfiability_modulo_theories), which will try to solve the equation. Pentru `Path 1`, rezolvatorul va spune că această cale poate fi explorată cu `a = 65`. Pentru `Path 2`, rezolvatorul îi poate da lui `a` orice altă valoare diferită de 65, de exemplu `a = 0`.

### Verificarea proprietăților {#verifying-properties}

Manticore permite un control complet asupra întregii execuții a fiecărei căi. Ca rezultat, permite adăugarea de restricții arbitrare la aproape orice. Acest control permite crearea de proprietăți în contract.

Să considerăm următorul exemplu:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // fără protecție de overflow
  return c;
}
```

Aici există o singură cale de explorat în funcție:

- Calea 1: `c = a + b`

Folosind Manticore, poți verifica dacă există depășiri și poți adăuga constrângeri la operatorii căii:

- `c = a + b AND (c < a OR c < b)`

Dacă se poate găsi o evaluare lui `a` și lui `b` pentru care operatorul de cale de mai sus este fezabil, înseamnă că ai găsit o depășire. De exemplu, rezolvatorul poate genera intrarea `a = 10, b = MAXUINT256`.

Dacă iei în considerare o versiune fixă:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

Formula asociată cu verificarea pentru depășire va fi:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Această formulă nu poate fi rezolvată; într-o lume imaginară, aceasta ar fi o **dovadă** că în `safe_add`, `c` va crește întotdeauna.

DSE este, prin urmare, un instrument puternic, care poate să verifice constrângeri arbitrare în codul tău.

## Rularea sub Manticore {#running-under-manticore}

Vom vedea cum să explorăm un contract inteligent cu API-ul Manticore. Obiectivul este următorul contract inteligent [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Rulează o explorare independentă {#run-a-standalone-exploration}

Poți rula Manticore direct pe contractul inteligent prin următoarea comandă (`project` poate fi un fișier Solidity sau un director de proiect):

```bash
$ manticore project
```

Vei obține ieșirea unor cazuri de testare, cum ar fi acestea (ordinea se poate schimba):

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

Fără informații suplimentare, Manticore va explora contractul cu noi tranzacții simbolice până când nu explorează noi căi în contract. Manticore nu execută tranzacții noi după o eroare (de exemplu: după o revenire).

Manticore va afișa informațiile într-un director `mcore_*`. Printre altele, vei găsi în acest director:

- `global.summary`: acoperire și avertismente ale compilatorului
- `test_XXXXX.summary`: acoperire, ultima instrucțiune, solduri de cont pe caz de testare
- `test_XXXXX.tx`: lista detaliată a tranzacțiilor pe caz de testare

Aici Manticore găsește 7 cazuri de testare, care corespund (ordinea numelui fișierului se poate modifica):

|                      |     Tranzacția 0     |    Tranzacția 1    | Tranzacția 2       | Rezultat |
| :------------------: | :------------------: | :----------------: | ------------------ | :------: |
| **test_00000000.tx** | Crearea contractului |      f(!=65)       | f(!=65)            |   STOP   |
| **test_00000001.tx** | Crearea contractului | funcția de rezervă |                    |  REVERT  |
| **test_00000002.tx** | Crearea contractului |                    |                    |  RETURN  |
| **test_00000003.tx** | Crearea contractului |       f(65)        |                    |  REVERT  |
| **test_00000004.tx** | Crearea contractului |      f(!=65)       |                    |   STOP   |
| **test_00000005.tx** | Crearea contractului |      f(!=65)       | f(65)              |  REVERT  |
| **test_00000006.tx** | Crearea contractului |      f(!=65)       | funcția de rezervă |  REVERT  |

_Rezumatul explorării f (! = 65) reprezintă f apelat cu orice valoare diferită de 65._

După cum poți observa, Manticore generează un caz de test unic pentru fiecare tranzacție reușită sau revenită.

Utilizați flagul `--quick-mode` dacă doriți o explorare rapidă a codului (dezactivează detectoarele de bug-uri, calculul gazului, ...)

### Manipulează un contract inteligent prin API {#manipulate-a-smart-contract-through-the-api}

Această secțiune descrie în detaliu modul de manipulare a unui contract inteligent cu API-ului Manticore Python. Poți crea un fișier nou cu extensia python `*.py` și scrie codul necesar adăugând comenzile API (ale căror elemente de bază vor fi descrise mai jos) în acest fișier și apoi îl poți rula cu comanda `$ python3 *.py `. De asemenea, poți executa comenzile de mai jos direct în consola python; pentru a rula consola utilizează comanda `$ python3`.

### Crearea conturilor {#creating-accounts}

Primul lucru care trebuie făcut este să inițiezi un nou blockchain cu următoarele comenzi:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

A non-contract account is created using [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

A Solidity contract can be deployed using [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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
# inițiază contractul
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Rezumat {#summary}

- You can create user and contract accounts with [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) and [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Executarea tranzacțiilor {#executing-transactions}

Manticore acceptă două tipuri de tranzacții:

- Tranzacția brută: explorează toate funcțiile
- Tranzacția denumită: explorează o singură funcție

#### Tranzacția brută {#raw-transaction}

A raw transaction is executed using [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Apelantul, adresa, datele sau valoarea tranzacției pot să fie concrete sau simbolice:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) creates a symbolic value.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) creates a symbolic byte array.

De exemplu:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Dacă datele sunt simbolice, Manticore va explora toate funcțiile contractului în timpul executării tranzacției. Va fi util să vezi explicația funcției Fallback în articolul [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) pentru a înțelege cum funcționează selecția funcțiilor.

#### Tranzacția denumită {#named-transaction}

Funcțiile pot fi executate prin numele lor. Pentru a executa `f(uint var)` cu o valoare simbolică, din contul utilizatorului și cu 0 eter, utilizează:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Dacă argumentul `valoare` al tranzacției nu este specificată, este 0 în mod implicit.

#### Rezumat {#summary-1}

- Argumentele unei tranzacții pot fi concrete sau simbolice
- O tranzacție brută va explora toate funcțiile
- Funcția poate fi apelată după numele ei

### Spațiu de lucru {#workspace}

`m.workspace` este directorul folosit ca director de ieșire pentru toate fișierele generate:

```python
print("Results are in {}".format(m.workspace))
```

### Terminarea explorării {#terminate-the-exploration}

To stop the exploration use [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Nu trebuie trimise alte tranzacții odată ce această metodă este apelată și Manticore generează cazuri de testare pentru fiecare cale explorată.

### Rezumat: Rularea sub Manticore {#summary-running-under-manticore}

Punând împreună toți pașii anteriori, obținem:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Rezultatele sunt în {}".format(m.workspace))
m.finalize() # oprește explorarea
```

Tot codul de mai sus îl poți găsi în [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Obținerea căilor de aruncare {#getting-throwing-paths}

Acum vom genera intrări specifice pentru căile care ridică o excepție în `f()`. Obiectivul este în continuare următorul contract inteligent [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Utilizarea informațiilor de stare {#using-state-information}

Fiecare cale executată are starea sa de blockchain. O stare este fie pregătită, fie ucisă, ceea ce înseamnă că ajunge la instrucțiunea THROW sau REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): Lista stărilor care sunt pregătite (acestea nu au executat REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): lista stărilor care sunt ucise
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): toate stările

```python
for state in m.all_states:
    # fă ceva cu starea
```

Poți accesa informațiile despre stare. De exemplu:

- `state.platform.get_balance(account.address)`: soldul contului
- `state.platform.transactions`: lista tranzacțiilor
- `state.platform.transactions[-1].return_data`: datele returnate de ultima tranzacție

Datele returnate de ultima tranzacție sunt o matrice, care poate fi convertită într-o valoare cu „ABI.deserialize”, de exemplu:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Cum să generezi un caz de test {#how-to-generate-testcase}

Use [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) to generate testcase:

```python
m.generate_testcase(state, 'BugFound')
```

### Rezumat {#summary-2}

- Poți itera starea cu m.all_states
- `state.platform.get_balance(account.address)` returnează soldul contului
- `state.platform.transactions` returnează lista tranzacțiilor
- `transaction.return_data` sunt datele returnate
- `m.generate_testcase(state, name)` generează intrări pentru stare

### Rezumat: Obținerea căilor de aruncare {#summary-getting-throwing-path}

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

Tot codul de mai sus îl poți găsi în [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Notează că am fi putut genera un script mult mai simplu, ca toate stările returnate de terminat_state având REVERT sau INVALID în rezultatul lor: Acest exemplu a fost menit doar să demonstreze modul de manipulare API._

## Adăugarea de restricții {#adding-constraints}

Vom vedea cum să constrângem explorarea. Vom face presupunerea că documentația din `f()` afirmă că funcția nu este apelată niciodată cu `a == 65`, deci orice eroare cu `a == 65` nu este o eroarea adevărată. Obiectivul este în continuare următorul contract inteligent [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Operatori {#operators}

Modulul [Operatori](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilitează manipularea restricțiilor, printre altele oferind:

- Operators.AND,
- Operators.OR,
- Operators.UGT (nesemnat mai mare de),
- Operators.UGE (nesemnat mai mare sau egal cu),
- Operators.ULT (nesemnat mai mic de),
- Operators.ULE (nesemnat mai mic sau egal cu).

Pentru a importa modulul, utilizează următoarele:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` este utilizat pentru a concatena o matrice la o valoare. De exemplu, return_data ale unei tranzacții trebuie să fie modificate la o valoare care trebuie verificată cu o altă valoare:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Restricții {#state-constraint}

Poți utiliza constrângeri la nivel global sau pentru o anumită stare.

#### Restricție globală {#state-constraint}

Use `m.constrain(constraint)` to add a global constraint. De exemplu, poți apela un contract de la o adresă simbolică și împiedica această adresă să aibă o valoare specifică:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Restricție de stare {#state-constraint}

Use [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) to add a constraint to a specific state It can be used to constrain the state after its exploration to check some property on it.

### Verificarea restricțiilor {#checking-constraint}

Utilizează `solver.check(state.constraints)` pentru a afla dacă o restricție este încă fezabilă. De exemplu, următoarele vor restrânge „symbolic_value” să fie diferite de 65 și să verifice dacă starea este încă fezabilă:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # starea este fezabilă
```

### Sumar: Adăugarea restricțiilor {#summary-adding-constraints}

Adăugând restricții codului anterior, obținem:

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

Tot codul de mai sus îl poți găsi în [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
