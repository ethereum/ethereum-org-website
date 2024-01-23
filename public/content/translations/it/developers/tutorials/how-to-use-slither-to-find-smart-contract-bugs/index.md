---
title: Come usare Slither per trovare i bug dello Smart Contract
description: Come usare Slither per trovare automaticamente bug negli Smart Contract
author: Trailofbits
lang: it
tags:
  - "Solidity"
  - "Smart Contract"
  - "sicurezza"
  - "test"
  - "analisi statica"
skill: advanced
published: 2020-06-09
source: Creare contratti sicuri
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Come usare Slither {#how-to-use-slither}

L'obiettivo di questo tutorial è mostrare come usare Slither per trovare automaticamente bug negli Smart Contract.

- [Installazione](#installation)
- [Uso dalla riga di comando](#command-line)
- [Introduzione all'analisi statica](#static-analysis): breve introduzione all'analisi statica
- [API](#api-basics): descrizione dell'API Python

## Installazione {#installation}

Slither richiede Python >=3.6. Può essere installato tramite pip o usando docker.

Slither con pip:

```bash
pip3 install --user slither-analyzer
```

Slither con docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker che ha accesso alla directory corrente. Puoi cambiare i file dall'host ed eseguire gli strumenti sui file dal docker_

In docker, esegui:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Eseguire uno script {#running-a-script}

Per eseguire uno script Python con Python 3:

```bash
python3 script.py
```

### Riga di comando {#command-line}

**Riga di comando e script definiti dall'utente.** Slither comprende una serie di rilevatori predefiniti che trovano molti bug comuni. Chiamare Slither dalla riga di comando eseguirà tutti i rilevatori, non è necessaria alcuna conoscenza dettagliata dell'analisi statica:

```bash
slither project_paths
```

Oltre ai rilevatori, Slither ha capacità di revisione del codice tramite le sue [stampanti](https://github.com/crytic/slither#printers) e i suoi [strumenti](https://github.com/crytic/slither#tools).

Usa [crytic.io](https://github.com/crytic) per ottenere accesso ai rilevatori privati e integrazione con GitHub.

## Analisi statica {#static-analysis}

Le capacità e il design del framework di analisi statica di Slither sono stati descritti in post di blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) e in un [paper accademico](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

L'analisi statica esiste in diversi tipi. Molto probabilmente ti renderai conto che compilatori come [clang](https://clang-analyzer.llvm.org/) e [gcc](https://lwn.net/Articles/806099/) dipendono da queste tecniche di ricerca, che sono anche alla base di [Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) e strumenti basati sui metodi formali come [Frama-C](https://frama-c.com/) e [Polyspace](https://www.mathworks.com/products/polyspace.html).

Qui non esamineremo in modo esaustivo le tecniche di analisi statica e il ricercatore. Ci concentreremo invece su ciò che serve per capire come funziona Slither così da poterlo usare più efficacemente per trovare bug e comprendere il codice.

- [Rappresentazione del codice](#code-representation)
- [Analisi del codice](#analysis)
- [Rappresentazione intermedia](#intermediate-representation)

### Rappresentazione del codice {#code-representation}

A differenza dell'analisi dinamica, che ragiona su un percorso di esecuzione singolo, l'analisi statica ragiona su tutti i percorsi contemporaneamente. Per farlo, si basa su una diversa rappresentazione del codice. Le due tipologie più comuni sono l'albero di sintassi astratta (AST) e il grafico del flusso di controllo (CFG).

### Alberi di sintassi astratta (AST) {#abstract-syntax-trees-ast}

Gli AST sono usati ogni volta che il compilatore analizza il codice. Sono probabilmente la struttura più basilare su cui è eseguibile l'analisi statica.

In pillole, un AST è un albero strutturato dove, di solito, ogni foglia contiene una variabile o una costante e i nodi interni sono operandi o controllano le operazioni del flusso. Considera il codice seguente:

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

L'AST corrispondente è mostrato in:

![AST](./ast.png)

Slither usa l'AST esportato da solc.

Sebbene semplice da costruire, l'AST è una struttura nidificata. A volte, non è la più semplice da analizzare. Per esempio, per identificare le operazioni usate dall'espressione `a + b <= a`, devi prima analizzare `<=` e poi `+`. Un approccio comune è usare il cosiddetto schema dei visitatori, che naviga l'albero in modo ricorsivo. Slither contiene un visitatore generico in [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Il codice seguente usa `ExpressionVisitor` per rilevare se l'espressione contiene una somma:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Grafico del flusso di controllo (CFG) {#control-flow-graph-cfg}

La seconda rappresentazione più comune del codice è il grafico del flusso di controllo (CFG). Come suggerisce il nome, è una rappresentazione basata su un grafico, che espone tutti i percorsi d'esecuzione. Ogni nodo contiene una o più istruzioni. I bordi nel grafico rappresentano le operazioni del flusso di controllo (if/then/else, loop, ecc). Il CFG del nostro esempio precedente è:

![CFG](./cfg.png)

Il CFG è la rappresentazione su cui gran parte delle analisi sono costruite.

Esistono molte altre rappresentazioni del codice. Ogni rappresentazione ha vantaggi e svantaggi a seconda dell'analisi che si desidera eseguire.

### Analisi {#analysis}

Il tipo più semplice di analisi eseguibile con Slither è l'analisi sintattica.

### Analisi della sintassi {#syntax-analysis}

Slither può navigare attraverso diversi componenti del codice e la loro rappresentazione per trovare incoerenze e difetti usando un approccio simile all'abbinamento a schemi.

Per esempio i seguenti rilevatori cercano problemi correlati alla sintassi:

- [Shadowing della variabile di stato](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): esegue iterazioni su tutte le variabili di stato e controlla se qualcuna esegue lo shadowing di una variabile da un contratto ereditato ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interfaccia errata di ERC20](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): cerca firme della funzione ERC20 errate ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analisi semantica {#semantic-analysis}

A differenza dell'analisi di sintassi, un'analisi semantica va più in profondità e analizza il "significato" del codice. Questa famiglia include alcuni tipi generici di analisi. Conducono a risultati più potenti e utili, ma anche più complessi da scrivere.

Le analisi semantiche sono usate per i rilevamenti più avanzati delle vulnerabilità.

#### Analisi della dipendenza dei dati {#fixed-point-computation}

Una variabile `variable_a` si dice dipendente dai dati di `variable_b` se esiste un percorso per cui il valore di `variable_a` è influenzato da `variable_b`.

Nel codice seguente, `variable_a` dipende da `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither è dotato di capacità integrate di [dipendenza dai dati](https://github.com/crytic/slither/wiki/data-dependency), grazie alla sua rappresentazione intermedia (discussa in una sezione successiva).

Un esempio di uso della dipendenza dei dati si può trovare nel [rilevatore di uguaglianze rigorose pericolose](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). In questo caso Slither cercherà confronti tra uguaglianze rigorose a un valore pericoloso ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)), e informerà l'utente che dovrebbe usare `>=` o `<=` anziché `==`, per impedire a un malintenzionato di bloccare il contratto. Tra gli altri, il rilevatore considererà come pericoloso il valore restituito da una chiamata di `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)), e userà il motore delle dipendenze dei dati per monitorarne l'uso.

#### Calcolo del punto fisso {#fixed-point-computation}

Se l'analisi naviga attraverso il CFG e segue i bordi, potresti vedere nodi già visitati. Per esempio, se un ciclo viene presentato come mostrato sotto:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

L'analisi dovrà sapere quando interrompersi. Qui esistono due strategie principali: (1) itera su ogni nodo un numero finito di volte, (2) calcola un cosiddetto _fixpoint_ (punto fisso). Un punto fisso indica fondamentalmente che analizzare il nodo non fornisce alcuna informazione utile.

Un esempio di punto fisso usato si può trovare nei rilevatori di rientranza: Slither esplora i nodi e cerca chiamate esterne, scrive e legge lo storage. Una volta raggiunto un punto fisso ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), interrompe l'esplorazione e analizza i risultati per vedere se è presente una rientranza, tramite diversi schemi di rientranza ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

La scrittura dell'analisi tramite un calcolo efficiente dei punti fissi richiede una buona comprensione di come l'analisi propaga le informazioni.

### Rappresentazione intermedia {#intermediate-representation}

Una rappresentazione intermedia (IR) è un linguaggio pensato per essere più adatto all'analisi statica che a quella originale. Slither traduce Solidity nella propria rappresentazione intermedia: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Comprendere SlithIR non è necessario per scrivere controlli di base. È invece utile se pensi di scrivere analisi semantiche avanzate. Le stampanti [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) e [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) aiuteranno a comprendere come è tradotto il codice.

## Fondamenti delle API {#api-basics}

Slither ha un'API che consente di esplorare gli attributi di base del contratto e le sue funzioni.

Per caricare una base di codice:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Esplorare contratti e funzioni {#exploring-contracts-and-functions}

Un oggetto `Slither` ha:

- `contracts (list(Contract)`: elenco di contratti
- `contracts_derived (list(Contract)`: elenco dei contratti che non vengono ereditati da un altro contratto (sottoinsieme di contratti)
- `get_contract_from_name (str)`: restituisce un contratto dal nome

Un oggetto `Contract` ha:

- `name (str)`: nome del contratto
- `functions (list(Function))`: elenco di funzioni
- `modifiers (list(Modifier))`: elenco di funzioni
- `all_functions_called (list(Function/Modifier))`: elenco di tutte le funzioni interne raggiungibili dal contratto
- `inheritance (list(Contract))`: elenco di contratti ereditati
- `get_function_from_signature (str)`: restituisce una funzione dalla firma
- `get_modifier_from_signature (str)`: restituisce un modificatore dalla firma
- `get_state_variable_from_name (str)`: restituisce una variabile di stato dal nome

Un oggetto `Function` o `Modifier` ha:

- `name (str)`: nome della funzione
- `contract (contract)`: il contratto in cui è dichiarata la funzione
- `nodes (list(Node))`: elenco dei nodi che compongono il CFG della funzione o del modificatore
- `entry_point (Node)`: punto di ingresso del CFG
- `variables_read (list(Variable))`: elenco delle variabili lette
- `variables_written (list(Variable))`: elenco delle variabili scritte
- `state_variables_read (list(StateVariable))`: elenco delle variabili di stato lette (sottoinsieme di variables`read)
- `state_variables_written (list(StateVariable))`: elenco delle variabili di stato scritte (sottoinsieme di variables`written)
