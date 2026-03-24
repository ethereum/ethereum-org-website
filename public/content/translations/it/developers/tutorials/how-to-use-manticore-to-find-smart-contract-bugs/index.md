---
title: Come usare Manticore per trovare bug nei contratti intelligenti
description: Come usare Manticore per trovare automaticamente bug nei contratti intelligenti
author: Trailofbits
lang: it
tags:
  ["Solidity", "contratti intelligenti", "sicurezza", "test", "verifica formale"]
skill: advanced
breadcrumb: Manticore
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

Lo scopo di questo tutorial è mostrare come usare Manticore per trovare automaticamente bug nei contratti intelligenti.

## Installazione {#installation}

Manticore richiede python >= 3.6. Può essere installato tramite pip o usando docker.

### Manticore tramite docker {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker che ha accesso alla tua directory corrente. Puoi modificare i file dal tuo host ed eseguire gli strumenti sui file dal docker_

All'interno di docker, esegui:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Manticore tramite pip {#manticore-through-pip}

```bash
pip3 install --user manticore
```

Si consiglia solc 0.5.11.

### Eseguire uno script {#running-a-script}

Per eseguire uno script python con python 3:

```bash
python3 script.py
```

## Introduzione all'esecuzione simbolica dinamica {#introduction-to-dynamic-symbolic-execution}

### L'esecuzione simbolica dinamica in breve {#dynamic-symbolic-execution-in-a-nutshell}

L'esecuzione simbolica dinamica (DSE) è una tecnica di analisi dei programmi che esplora uno spazio degli stati con un alto grado di consapevolezza semantica. Questa tecnica si basa sulla scoperta di "percorsi del programma", rappresentati come formule matematiche chiamate `path predicates` (predicati di percorso). Concettualmente, questa tecnica opera sui predicati di percorso in due passaggi:

1. Vengono costruiti usando vincoli sull'input del programma.
2. Vengono usati per generare input del programma che causeranno l'esecuzione dei percorsi associati.

Questo approccio non produce falsi positivi nel senso che tutti gli stati del programma identificati possono essere attivati durante l'esecuzione concreta. Ad esempio, se l'analisi trova un overflow di interi, è garantito che sia riproducibile.

### Esempio di predicato di percorso {#path-predicate-example}

Per avere un'idea di come funziona la DSE, considera il seguente esempio:

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

Ogni predicato di percorso è una formula matematica che può essere fornita a un cosiddetto [risolutore SMT](https://wikipedia.org/wiki/Satisfiability_modulo_theories), che cercherà di risolvere l'equazione. Per il `Percorso 1`, il risolutore dirà che il percorso può essere esplorato con `a = 65`. Per il `Percorso 2`, il risolutore può dare ad `a` qualsiasi valore diverso da 65, ad esempio `a = 0`.

### Verificare le proprietà {#verifying-properties}

Manticore consente un controllo completo su tutta l'esecuzione di ogni percorso. Di conseguenza, ti permette di aggiungere vincoli arbitrari a quasi tutto. Questo controllo consente la creazione di proprietà sul contratto.

Considera il seguente esempio:

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // nessuna protezione da overflow
  return c;
}
```

Qui c'è solo un percorso da esplorare nella funzione:

- Percorso 1: `c = a + b`

Usando Manticore, puoi controllare l'overflow e aggiungere vincoli al predicato di percorso:

- `c = a + b AND (c < a OR c < b)`

Se è possibile trovare una valutazione di `a` e `b` per cui il predicato di percorso sopra è fattibile, significa che hai trovato un overflow. Ad esempio, il risolutore può generare l'input `a = 10 , b = MAXUINT256`.

Se consideri una versione corretta:

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

La formula associata con il controllo dell'overflow sarebbe:

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

Questa formula non può essere risolta; in altre parole questa è una **prova** che in `safe_add`, `c` aumenterà sempre.

La DSE è quindi uno strumento potente, che può verificare vincoli arbitrari sul tuo codice.

## Esecuzione in Manticore {#running-under-manticore}

Vedremo come esplorare un contratto intelligente con l'API di Manticore. L'obiettivo è il seguente contratto intelligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Eseguire un'esplorazione autonoma {#run-a-standalone-exploration}

Puoi eseguire Manticore direttamente sul contratto intelligente con il seguente comando (`project` può essere un file Solidity o una directory di progetto):

```bash
$ manticore project
```

Otterrai l'output dei casi di test come questo (l'ordine potrebbe cambiare):

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

Senza informazioni aggiuntive, Manticore esplorerà il contratto con nuove transazioni simboliche finché non esplorerà nuovi percorsi sul contratto. Manticore non esegue nuove transazioni dopo una fallita (es: dopo un revert).

Manticore produrrà le informazioni in una directory `mcore_*`. Tra le altre cose, troverai in questa directory:

- `global.summary`: copertura e avvisi del compilatore
- `test_XXXXX.summary`: copertura, ultima istruzione, saldi degli account per caso di test
- `test_XXXXX.tx`: elenco dettagliato delle transazioni per caso di test

Qui Manticore trova 7 casi di test, che corrispondono a (l'ordine dei nomi dei file potrebbe cambiare):

|                      |   Transazione 0   |   Transazione 1   | Transazione 2     | Risultato |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | Creazione del contratto |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | Creazione del contratto | funzione di fallback |                   | REVERT |
| **test_00000002.tx** | Creazione del contratto |                   |                   | RETURN |
| **test_00000003.tx** | Creazione del contratto |       f(65)       |                   | REVERT |
| **test_00000004.tx** | Creazione del contratto |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | Creazione del contratto |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | Creazione del contratto |      f(!=65)      | funzione di fallback | REVERT |

_Il riepilogo dell'esplorazione f(!=65) indica f chiamata con qualsiasi valore diverso da 65._

Come puoi notare, Manticore genera un caso di test unico per ogni transazione riuscita o annullata.

Usa il flag `--quick-mode` se desideri un'esplorazione rapida del codice (disabilita i rilevatori di bug, il calcolo del gas, ...)

### Manipolare un contratto intelligente tramite l'API {#manipulate-a-smart-contract-through-the-api}

Questa sezione descrive in dettaglio come manipolare un contratto intelligente tramite l'API Python di Manticore. Puoi creare un nuovo file con estensione python `*.py` e scrivere il codice necessario aggiungendo i comandi dell'API (le cui basi saranno descritte di seguito) in questo file e poi eseguirlo con il comando `$ python3 *.py`. Inoltre puoi eseguire i comandi sottostanti direttamente nella console python; per avviare la console usa il comando `$ python3`.

### Creare account {#creating-accounts}

La prima cosa che dovresti fare è avviare una nuova blockchain con i seguenti comandi:

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

Un account non contrattuale viene creato usando [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account):

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
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### Riepilogo {#summary}

- Puoi creare account utente e contratto con [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) e [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract).

### Eseguire transazioni {#executing-transactions}

Manticore supporta due tipi di transazione:

- Transazione grezza: tutte le funzioni vengono esplorate
- Transazione nominata: viene esplorata solo una funzione

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
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) crea un array di byte simbolico.

Ad esempio:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

Se i dati sono simbolici, Manticore esplorerà tutte le funzioni del contratto durante l'esecuzione della transazione. Sarà utile vedere la spiegazione della funzione di fallback nell'articolo [Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) per capire come funziona la selezione della funzione.

#### Transazione nominata {#named-transaction}

Le funzioni possono essere eseguite tramite il loro nome.
Per eseguire `f(uint var)` con un valore simbolico, da user_account e con 0 ether, usa:

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

Se il `value` della transazione non è specificato, è 0 per impostazione predefinita.

#### Riepilogo {#summary-1}

- Gli argomenti di una transazione possono essere concreti o simbolici
- Una transazione grezza esplorererà tutte le funzioni
- Le funzioni possono essere chiamate con il loro nome

### Spazio di lavoro {#workspace}

`m.workspace` è la directory usata come directory di output per tutti i file generati:

```python
print("Results are in {}".format(m.workspace))
```

### Terminare l'esplorazione {#terminate-the-exploration}

Per interrompere l'esplorazione usa [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize). Nessuna ulteriore transazione dovrebbe essere inviata una volta chiamato questo metodo e Manticore genera casi di test per ciascuno dei percorsi esplorati.

### Riepilogo: Esecuzione in Manticore {#summary-running-under-manticore}

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
m.finalize() # interrompi l'esplorazione
```

Tutto il codice sopra lo puoi trovare in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

## Ottenere percorsi che generano eccezioni {#getting-throwing-paths}

Ora genereremo input specifici per i percorsi che sollevano un'eccezione in `f()`. L'obiettivo è ancora il seguente contratto intelligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

### Usare le informazioni di stato {#using-state-information}

Ogni percorso eseguito ha il suo stato della blockchain. Uno stato è pronto (ready) o è terminato (killed), il che significa che raggiunge un'istruzione THROW o REVERT:

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): l'elenco degli stati che sono pronti (non hanno eseguito un REVERT/INVALID)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): l'elenco degli stati che sono terminati
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): tutti gli stati

```python
for state in m.all_states:
    # fare qualcosa con lo stato
```

Puoi accedere alle informazioni di stato. Ad esempio:

- `state.platform.get_balance(account.address)`: il saldo dell'account
- `state.platform.transactions`: l'elenco delle transazioni
- `state.platform.transactions[-1].return_data`: i dati restituiti dall'ultima transazione

I dati restituiti dall'ultima transazione sono un array, che può essere convertito in un valore con ABI.deserialize, ad esempio:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### Come generare un caso di test {#how-to-generate-testcase}

Usa [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) per generare un caso di test:

```python
m.generate_testcase(state, 'BugFound')
```

### Riepilogo {#summary-2}

- Puoi iterare sullo stato con m.all_states
- `state.platform.get_balance(account.address)` restituisce il saldo dell'account
- `state.platform.transactions` restituisce l'elenco delle transazioni
- `transaction.return_data` sono i dati restituiti
- `m.generate_testcase(state, name)` genera input per lo stato

### Riepilogo: Ottenere percorsi che generano eccezioni {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

# # Verifica se un'esecuzione termina con un REVERT o INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

Tutto il codice sopra lo puoi trovare in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)

_Nota che avremmo potuto generare uno script molto più semplice, poiché tutti gli stati restituiti da terminated_state hanno REVERT o INVALID nel loro risultato: questo esempio aveva solo lo scopo di dimostrare come manipolare l'API._

## Aggiungere vincoli {#adding-constraints}

Vedremo come vincolare l'esplorazione. Faremo l'ipotesi che la documentazione di `f()` affermi che la funzione non viene mai chiamata con `a == 65`, quindi qualsiasi bug con `a == 65` non è un vero bug. L'obiettivo è ancora il seguente contratto intelligente [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol):

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

Il modulo [Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) facilita la manipolazione dei vincoli, tra le altre cose fornisce:

- Operators.AND,
- Operators.OR,
- Operators.UGT (maggiore di senza segno),
- Operators.UGE (maggiore o uguale a senza segno),
- Operators.ULT (minore di senza segno),
- Operators.ULE (minore o uguale a senza segno).

Per importare il modulo usa quanto segue:

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` viene usato per concatenare un array a un valore. Ad esempio, il return_data di una transazione deve essere modificato in un valore per essere confrontato con un altro valore:

```python
last_return = Operators.CONCAT(256, *last_return)
```

### Vincoli {#state-constraint}

Puoi usare i vincoli a livello globale o per uno stato specifico.

#### Vincolo globale {#state-constraint}

Usa `m.constrain(constraint)` per aggiungere un vincolo globale.
Ad esempio, puoi chiamare un contratto da un indirizzo simbolico e vincolare questo indirizzo a valori specifici:

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### Vincolo di stato {#state-constraint}

Usa [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) per aggiungere un vincolo a uno stato specifico.
Può essere usato per vincolare lo stato dopo la sua esplorazione per verificare alcune proprietà su di esso.

### Verificare i vincoli {#checking-constraint}

Usa `solver.check(state.constraints)` per sapere se un vincolo è ancora fattibile.
Ad esempio, quanto segue vincolerà symbolic_value a essere diverso da 65 e verificherà se lo stato è ancora fattibile:

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # lo stato è fattibile
```

### Riepilogo: Aggiungere vincoli {#summary-adding-constraints}

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

# # Verifica se un'esecuzione termina con un REVERT o INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # non consideriamo il percorso in cui a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

Tutto il codice sopra lo puoi trovare in [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)