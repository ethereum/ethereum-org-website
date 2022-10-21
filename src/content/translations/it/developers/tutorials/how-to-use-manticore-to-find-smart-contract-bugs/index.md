---
title: Come usare Manticore per trovare bug negli Smart Contract
description: Come usare Manticore per trovare automaticamente bug negli Smart Contract
author: Trailofbits
lang: it
tags:
  - "Solidity"
  - "Smart Contract"
  - "sicurezza"
  - "test"
  - "verifica formale"
skill: advanced
published: 2020-01-13
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

L'obiettivo di questo tutorial è mostrare come usare Manticore per trovare automaticamente bug negli Smart Contract.

## Installazione {#installation}

Manticore richiede >= Python 3.6. Può essere installato tramite pip o usando docker.

### Manticore con docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker avente accesso alla tua directory corrente. Puoi cambiare i file dal tuo host ed eseguire gli strumenti sui file dal docker_

In docker, esegui:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore con pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

È consigliato solc 0.5.11.

### Esecuzione di uno script {#running-a-script}

Per eseguire uno script Python con Python 3:

```bash
python3 script.py
```

## Introduzione all'esecuzione simbolica dinamica {#introduction-to-dynamic-symbolic-execution}

### Esecuzione simbolica dinamica in pillole {#dynamic-symbolic-execution-in-a-nutshell}

L'esecuzione simbolica dinamica (DSE) è una tecnica di analisi di un programma che esplora uno spazio di stati con un alto grado di consapevolezza semantica. Questa tecnica si basa sulla scoperta dei "percorsi del programma", rappresentati da formule matematiche dette `predicati di percorso`. Concettualmente, opera su predicati di percorso in due passaggi:

1. Vengono costruiti usando vincoli nell'input del programma.
2. Vengono usati per generare input del programma che causeranno l'esecuzione dei percorsi associati.

Questo approccio non produce falsi positivi nel senso che tutti gli stati del programma identificati possono essere attivati durante l'esecuzione concreta. Per esempio, se le analisi trova un overflow di valori interi, è garantito che sia riproducibile.

### Esempio di predicato di percorso {#path-predicate-example}

Per avere un'idea di funziona la DSE, considera il seguente esempio:

```solidity
function f(uint a){

  if (a == 65) {
      // È presente un bug
  }

}
```

Poiché `f()` contiene due percorsi, una DSE costruirà due diversi predicati di percorso:

- Percorso 1: `a == 65`
- Percorso 2: `Not (a == 65)`

Ogni predicato di percorso è una formula matematica che può essere passata a un cosiddetto [risolutore SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), che proverà a risolvere l'equazione. Per il `Percorso 1`, il risolutore dirà che il percorso può essere esplorato con `a = 65`. Per il `Percorso 2`, il risolutore può assegnare ad `a` tutti i valori diversi da 65, per esempio `a = 0`.

### Verifica delle proprietà {#verifying-properties}

Manticore permette un controllo completo su tutta l'esecuzione di ogni percorso. Di conseguenza, consente di aggiungere vincoli arbitrari quasi a tutto. Questo controllo permette di creare proprietà sul contratto.

Considera l'esempio seguente:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

Qui c'è un solo percorso da esplorare nella funzione:

- Percorso 1: `c = a + b`

Usando Manticore, si può controllare l'overflow e aggiungere vincoli al predicato di percorso:

- `c = a + b AND (c < a OR c < b)`

Se è possibile trovare una valutazione di `a` e `b` per cui il predicato di percorso qui sopra sia fattibile, significa che è stato trovato un overflow. Ad esempio, il risolutore può generare l'input `a = 10 , b = MAXUINT256`.

Se consideri una versione fissa:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

La formula associata al controllo dell'overflow sarebbe:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Questa formula non è risolvibile; in altri mondi questa è una **prova** che in `safe_add`, `c` aumenterà sempre.

La DSE è quindi uno strumento potente, che può verificare i vincoli arbitrari nel codice.

## Esecuzione in Manticore {#running-under-manticore}

Vedremo come esplorare uno Smart Contract con l'API Manticore. La destinazione è il seguente Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Esplorazione indipendente {#run-a-standalone-exploration}

Manticore può essere eseguito direttamente sullo Smart Contract con il comando seguente (`project` può essere un file Solidity o una directory del progetto):

```bash
$ manticore project
```

Otterrai l'output dei casi di prova, come il seguente (l'ordine potrebbe variare):

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contract Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

Senza altre informazioni, Manticore esplorerà il contratto con nuove transazioni simboliche, finché non esplorerà nuovi percorsi sul contratto. Manticore non esegue nuove transazioni se una non riesce (ad esempio dopo un ripristino).

Manticore restituirà le informazioni un una directory `mcore_*`. In questa directory troverai, tra altre cose:

- `global.summary`: copertura e avvisi del compilatore
- `test_XXXXX.summary`: copertura, ultima istruzione, saldi dell'account per test case
- `test_XXXXX.tx`: elenco dettagliato delle transazioni per test case

Qui Manticore trova 7 test case che corrispondono a (l'ordine dei nomi dei file potrebbe variare):

|                      |      Transazione 0      |    Transazione 1     | Transazione 2        | Risultato |
| :------------------: | :---------------------: | :------------------: | -------------------- | :-------: |
| **test_00000000.tx** | Creazione del contratto |       f(!=65)        | f(!=65)              |   STOP    |
| **test_00000001.tx** | Creazione del contratto | funzione di fallback |                      |  REVERT   |
| **test_00000002.tx** | Creazione del contratto |                      |                      |  RETURN   |
| **test_00000003.tx** | Creazione del contratto |        f(65)         |                      |  REVERT   |
| **test_00000004.tx** | Creazione del contratto |       f(!=65)        |                      |   STOP    |
| **test_00000005.tx** | Creazione del contratto |       f(!=65)        | f(65)                |  REVERT   |
| **test_00000006.tx** | Creazione del contratto |       f(!=65)        | funzione di fallback |  REVERT   |

_Il riepilogo dell'esplorazione f(!=65) denota f chiamata con ogni valore diverso da 65._

Come puoi notare, Manticore genera un test case univoco per ogni transazione riuscita o ripristinata.

Usa il flag `--quick-mode` se desideri un'esplorazione veloce del codice (disabilita rilevatori di bug, calcolo del carburante, ecc.)

### Manipolazione di uno Smart Contract tramite l'API {#manipulate-a-smart-contract-through-the-api}

Questa sezione contiene informazioni su come manipolare uno Smart Contract tramite l'API Python di Manticore. Puoi creare un nuovo file con l'estensione di Python `*.py` e scrivere il codice necessario aggiungendo i comandi dell'API (le basi saranno descritte di seguito) in questo file e poi eseguirlo con il comando `$ python3 *.py`. Puoi anche eseguire i comandi qui sotto direttamente nella console Python. Per eseguirla usa il comando `$ python3`.

### Creazione di account {#creating-accounts}

La prima da fare è inizializzare una nuova blockchain con i comandi seguenti:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Un account senza contratto viene creato usando [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

```python
user_account = m.create_account(balance=1000)
```

Un contratto Solidity può essere distribuito usando [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract):

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
# Inizializza il contratto
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Riepilogo {#summary}

- Puoi creare account utente e di contratto con [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) e [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Esecuzione di transazioni {#executing-transactions}

Manticore supporta due tipi di transazione:

- Transazione grezza: vengono esplorate tutte le funzioni
- Transazione con nome: viene esplorata solo una funzione

#### Transazione grezza {#raw-transaction}

Una transazione grezza viene eseguita usando [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction):

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

Il chiamante, l'indirizzo, i dati o il valore della transazione possono essere concreti o simbolici:

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) crea un valore simbolico.
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) crea un array di byte simbolici.

Ad esempio:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Se i dati sono simbolici, Manticore esplorerà tutte le funzioni del contratto durante l'esecuzione della transazione. È utile consultare la spiegazione della funzione di fallback nell'articolo [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) per comprendere come funziona la selezione delle funzioni.

#### Transazione con nome {#named-transaction}

Le funzioni sono eseguibili tramite il loro nome. Per eseguire `f(uint var)` con un valore simbolico, da user_account e con 0 ether, usa:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Se `value` della transazione non è specificato, è 0 di default.

#### Riepilogo {#summary-1}

- Gli argomenti di una transazione possono essere concreti o simbolici
- Una transazione grezza esplorerà tutte le funzioni
- La funzione può essere chiamata con il suo nome

### Area di lavoro {#workspace}

`m.workspace` è la directory usata come output per tutti i file generati:

```python
print("Results are in {}".format(m.workspace))
```

### Chiusura dell'esplorazione {#terminate-the-exploration}

Per interrompere l'esplorazione usa [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Nessun'altra transazione dovrebbe essere inviata una volta chiamato questo metodo e dopo che Manticore ha generato test case per ognuno dei percorsi esplorati.

### Riepilogo: esecuzione in Manticore {#summary-running-under-manticore}

Mettendo insieme tutti i passaggi precedenti, otteniamo:

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

Tutto il codice sopra lo puoi trovare in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Ottenere i percorsi che generano eccezioni {#getting-throwing-paths}

Ora creeremo input specifici per i percorsi che generano un'eccezione in `f()`. La destinazione è ancora il seguente Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Uso delle informazioni di stato {#using-state-information}

Ogni percorso eseguito ha il proprio stato della blockchain. Uno stato è pronto o terminato, a significare che ha raggiunto un'istruzione THROW o REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): l'elenco degli stati pronti (cioè che non hanno eseguito un REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): l'elenco degli stati terminati
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): tutti gli stati

```python
for state in m.all_states:
    # esegue un'operazione con lo stato
```

Puoi accedere alle informazioni sullo stato. Per esempio:

- `state.platform.get_balance(account.address)`: il saldo dell'account
- `state.platform.transactions`: l'elenco delle transazioni
- `state.platform.transactions[-1].return_data`: i dati restituiti dall'ultima transazione

I dati restituiti dall'ultima transazione sono un array, convertibile in un valore con ABI.deserialize, per esempio:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Come generare test case {#how-to-generate-testcase}

Usa [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) per generare test case:

```python
m.generate_testcase(state, 'BugFound')
```

### Riepilogo {#summary-2}

- Puoi eseguire iterazioni sullo stato con m.all_states
- `state.platform.get_balance(account.address)` restituisce il saldo del conto
- `state.platform.transactions` restituisce l'elenco delle transazioni
- `transaction.return_data` sono i dati restituiti
- `m.generate_testcase(state, name)` genera input per lo stato

### Riepilogo: ottenere il percorso che genera eccezioni {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Controlla se l'esecuzione termina con REVERT o INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Tutto il codice qui sopra si trova in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Nota: avremmo potuto generare uno script molto più semplice poiché tutti gli stati restituiti da terminated_state hanno REVERT o INVALID nel risultato. Questo esempio era inteso solo per dimostrare come manipolare l'API._

## Aggiunta di vincoli {#adding-constraints}

Vediamo ora come vincolare l'esplorazione. Presumiamo che la documentazione di `f()` indichi che la funzione non viene mai chiamata con `a == 65`, quindi ogni bug con `a == 65` non è un vero bug. La destinazione è ancora il seguente Smart Contract [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Il modulo [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita la manipolazione dei vincoli, fornendo tra l'altro:

- Operators.AND,
- Operators.OR,
- Operators.UGT (maggiore di senza segno),
- Operators.UGE (maggiore o uguale a senza segno),
- Operators.ULT (minore di senza segno),
- Operators.ULE (minore o uguale a senza segno).

Per importare il modulo usa:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` è usato per concatenare un array a un valore. Per esempio, return_data di una transazione deve essere modificato in valore per poter essere verificato a fronte di un altro valore:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Vincoli {#state-constraint}

Puoi usare vincoli globalmente o per uno stato specifico.

#### Vincolo globale {#state-constraint}

Usa `m.constrain(constraint)` per aggiungere un vincolo globale. Per esempio, puoi chiamare un contratto da un indirizzo simbolico e limitare quest'indirizzo a valori specifici:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Vincolo di stato {#state-constraint}

Usa [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) per aggiungere un vincolo a uno stato specifico Può essere usato per vincolare lo stato dopo la sua esplorazione per verificarvi della proprietà.

### Controllo di un vincolo {#checking-constraint}

Usa `solver.check(state.constraints)` per sapere se un vincolo è ancora fattibile. Per esempio, il codice seguente vincola symbolic_value ad essere diverso da 65 e controlla se lo stato è ancora fattibile:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # lo stato è fattibile
```

### Riepilogo: aggiunta di vincoli {#summary-adding-constraints}

Aggiungendo il vincolo al codice precedente, otteniamo:

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

## Controlla se l'esecuzione termina con REVERT o INVALID
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

Tutto il codice sopra si può trovare in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)
