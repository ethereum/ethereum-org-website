---
title: Come usare Slither per trovare bug nei contratti intelligenti
description: Come usare Slither per trovare automaticamente bug nei contratti intelligenti
author: Trailofbits
lang: it
tags: [ "Solidity", "smart contract", "sicurezza", "test" ]
skill: advanced
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Come usare Slither {#how-to-use-slither}

L'obiettivo di questo tutorial è mostrare come usare Slither per trovare automaticamente bug nei contratti intelligenti.

- [Installazione](#installation)
- [Uso della riga di comando](#command-line)
- [Introduzione all'analisi statica](#static-analysis): Breve introduzione all'analisi statica
- [API](#api-basics): Descrizione dell'API Python

## Installazione {#installation}

Slither richiede Python >= 3.6. Può essere installato tramite pip o usando docker.

Slither tramite pip:

```bash
pip3 install --user slither-analyzer
```

Slither tramite docker:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_L'ultimo comando esegue eth-security-toolbox in un docker che ha accesso alla tua directory corrente. Puoi modificare i file dal tuo host ed eseguire gli strumenti sui file dal docker_

All'interno del docker, esegui:

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

**Riga di comando e script definiti dall'utente.** Slither è dotato di una serie di rilevatori predefiniti che trovano molti bug comuni. Chiamare Slither dalla riga di comando eseguirà tutti i rilevatori; non è necessaria alcuna conoscenza dettagliata dell'analisi statica:

```bash
slither project_paths
```

Oltre ai rilevatori, Slither ha funzionalità di revisione del codice tramite i suoi [printer](https://github.com/crytic/slither#printers) e [strumenti](https://github.com/crytic/slither#tools).

Usa [crytic.io](https://github.com/crytic) per ottenere l'accesso ai rilevatori privati e all'integrazione con GitHub.

## Analisi statica {#static-analysis}

Le funzionalità e il design del framework di analisi statica di Slither sono stati descritti in post del blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) e in un [articolo accademico](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

L'analisi statica esiste in diverse varianti. Molto probabilmente ti rendi conto che i compilatori come [clang](https://clang-analyzer.llvm.org/) e [gcc](https://lwn.net/Articles/806099/) dipendono da queste tecniche di ricerca, ma essa è anche alla base di ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) e strumenti basati su metodi formali come [Frama-C](https://frama-c.com/) e [Polyspace](https://www.mathworks.com/products/polyspace.html)).

Qui non esamineremo in modo esaustivo le tecniche di analisi statica e la ricerca in materia. Ci concentreremo invece su ciò che serve per capire come funziona Slither, in modo da poterlo usare più efficacemente per trovare bug e comprendere il codice.

- [Rappresentazione del codice](#code-representation)
- [Analisi del codice](#analysis)
- [Rappresentazione intermedia](#intermediate-representation)

### Rappresentazione del codice {#code-representation}

A differenza di un'analisi dinamica, che ragiona su un singolo percorso di esecuzione, l'analisi statica ragiona su tutti i percorsi contemporaneamente. Per farlo, si basa su una diversa rappresentazione del codice. Le due più comuni sono l'albero di sintassi astratta (AST) e il grafico del flusso di controllo (CFG).

### Alberi di sintassi astratta (AST) {#abstract-syntax-trees-ast}

Gli AST sono usati ogni volta che il compilatore analizza sintatticamente il codice. Sono probabilmente la struttura più basilare su cui è possibile eseguire un'analisi statica.

In breve, un AST è un albero strutturato in cui, di solito, ogni foglia contiene una variabile o una costante e i nodi interni sono operandi o operazioni di controllo del flusso. Considera il codice seguente:

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

Sebbene sia semplice da costruire, l'AST è una struttura nidificata. A volte, non è la più semplice da analizzare. Ad esempio, per identificare le operazioni usate dall'espressione `a + b <= a`, devi prima analizzare `<=` e poi `+`. Un approccio comune è usare il cosiddetto pattern visitor, che naviga ricorsivamente l'albero. Slither contiene un visitor generico in [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Il codice seguente usa `ExpressionVisitor` per rilevare se l'espressione contiene un'addizione:

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression è l'espressione da testare
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### Grafico del flusso di controllo (CFG) {#control-flow-graph-cfg}

La seconda rappresentazione più comune del codice è il grafico del flusso di controllo (CFG). Come suggerisce il nome, è una rappresentazione basata su grafico che espone tutti i percorsi di esecuzione. Ogni nodo contiene una o più istruzioni. Gli archi nel grafico rappresentano le operazioni di controllo del flusso (if/then/else, loop, ecc.). Il CFG del nostro esempio precedente è:

![CFG](./cfg.png)

Il CFG è la rappresentazione su cui si basa la maggior parte delle analisi.

Esistono molte altre rappresentazioni del codice. Ogni rappresentazione ha vantaggi e svantaggi a seconda dell'analisi che si desidera eseguire.

### Analisi {#analysis}

Il tipo di analisi più semplice che puoi eseguire con Slither è l'analisi sintattica.

### Analisi della sintassi {#syntax-analysis}

Slither può navigare attraverso i diversi componenti del codice e la loro rappresentazione per trovare incoerenze e difetti usando un approccio simile al pattern matching.

Ad esempio, i seguenti rilevatori cercano problemi relativi alla sintassi:

- [Shadowing di variabile di stato](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): itera su tutte le variabili di stato e controlla se qualcuna di esse nasconde una variabile di un contratto ereditato ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interfaccia ERC20 non corretta](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): cerca le firme di funzione ERC20 non corrette ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analisi semantica {#semantic-analysis}

A differenza dell'analisi della sintassi, un'analisi semantica va più in profondità e analizza il "significato" del codice. Questa famiglia include alcuni tipi ampi di analisi. Portano a risultati più potenti e utili, ma sono anche più complessi da scrivere.

Le analisi semantiche sono usate per i rilevamenti di vulnerabilità più avanzati.

#### Analisi della dipendenza dei dati {#fixed-point-computation}

Una variabile `variable_a` si dice dipendente dai dati di `variable_b` se esiste un percorso per il quale il valore di `variable_a` è influenzato da `variable_b`.

Nel codice seguente, `variable_a` dipende da `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither è dotato di funzionalità integrate di [dipendenza dei dati](https://github.com/crytic/slither/wiki/data-dependency), grazie alla sua rappresentazione intermedia (discussa in una sezione successiva).

Un esempio di utilizzo della dipendenza dei dati si trova nel [rilevatore di uguaglianze strette pericolose](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Qui Slither cercherà un confronto di uguaglianza stretta con un valore pericoloso ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) e informerà l'utente che dovrebbe usare `>=` o `<=` invece di `==`, per impedire a un utente malintenzionato di intrappolare il contratto. Tra le altre cose, il rilevatore considererà pericoloso il valore restituito di una chiamata a `balanceOf(indirizzo)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) e utilizzerà il motore di dipendenza dei dati per tracciarne l'uso.

#### Calcolo del punto fisso {#fixed-point-computation}

Se la tua analisi naviga attraverso il CFG e ne segue gli archi, è probabile che tu veda nodi già visitati. Ad esempio, se un loop è presentato come mostrato di seguito:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

La tua analisi dovrà sapere quando fermarsi. Ci sono due strategie principali: (1) iterare su ogni nodo un numero finito di volte, (2) calcolare un cosiddetto _punto fisso_. Un punto fisso significa fondamentalmente che l'analisi di questo nodo non fornisce più alcuna informazione significativa.

Un esempio di utilizzo del punto fisso si può trovare nei rilevatori di rientranza: Slither esplora i nodi e cerca chiamate esterne, operazioni di scrittura e lettura dello storage. Una volta raggiunto un punto fisso ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), interrompe l'esplorazione e analizza i risultati per vedere se è presente una rientranza, attraverso diversi pattern di rientranza ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Scrivere analisi utilizzando un calcolo efficiente del punto fisso richiede una buona comprensione di come l'analisi propaga le sue informazioni.

### Rappresentazione intermedia {#intermediate-representation}

Una rappresentazione intermedia (IR) è un linguaggio inteso per essere più adatto all'analisi statica rispetto a quello originale. Slither traduce Solidity nella sua IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Comprendere SlithIR non è necessario se si vogliono scrivere solo controlli di base. Tuttavia, sarà utile se hai intenzione di scrivere analisi semantiche avanzate. I printer [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) e [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) ti aiuteranno a capire come viene tradotto il codice.

## Nozioni di base sull'API {#api-basics}

Slither ha un'API che ti permette di esplorare gli attributi di base del contratto e le sue funzioni.

Per caricare una codebase:

```python
from slither import Slither
slither = Slither('/percorso/del/progetto')

```

### Esplorazione di contratti e funzioni {#exploring-contracts-and-functions}

Un oggetto `Slither` ha:

- `contracts (list(Contract)`: elenco di contratti
- `contracts_derived (list(Contract)`: elenco di contratti non ereditati da un altro contratto (sottoinsieme di contratti)
- `get_contract_from_name (str)`: restituisce un contratto dal suo nome

Un oggetto `Contract` ha:

- `name (str)`: nome del contratto
- `functions (list(Function))`: elenco di funzioni
- `modifiers (list(Modifier))`: elenco di funzioni
- `all_functions_called (list(Function/Modifier))`: elenco di tutte le funzioni interne raggiungibili dal contratto
- `inheritance (list(Contract))`: elenco di contratti ereditati
- `get_function_from_signature (str)`: restituisce una funzione dalla sua firma
- `get_modifier_from_signature (str)`: restituisce un modificatore dalla sua firma
- `get_state_variable_from_name (str)`: restituisce una StateVariable dal suo nome

Un oggetto `Function` o `Modifier` ha:

- `name (str)`: nome della funzione
- `contract (contract)`: il contratto in cui la funzione è dichiarata
- `nodes (list(Node))`: elenco dei nodi che compongono il CFG della funzione/modificatore
- `entry_point (Node)`: punto di ingresso del CFG
- `variables_read (list(Variable))`: elenco di variabili lette
- `variables_written (list(Variable))`: elenco di variabili scritte
- `state_variables_read (list(StateVariable))`: elenco di variabili di stato lette (sottoinsieme di `variables_read`)
- `state_variables_written (list(StateVariable))`: elenco di variabili di stato scritte (sottoinsieme di `variables_written`)
