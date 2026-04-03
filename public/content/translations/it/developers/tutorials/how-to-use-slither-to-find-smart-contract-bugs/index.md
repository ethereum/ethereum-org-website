---
title: Come usare Slither per trovare bug nei contratti intelligenti
description: Come usare Slither per trovare automaticamente bug nei contratti intelligenti
author: Trailofbits
lang: it
tags: ["Solidity", "contratti intelligenti", "sicurezza", "test"]
skill: advanced
breadcrumb: Slither
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Come usare Slither {#how-to-use-slither}

Lo scopo di questo tutorial è mostrare come usare Slither per trovare automaticamente bug nei contratti intelligenti.

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

All'interno di docker, esegui:

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### Eseguire uno script {#running-a-script}

Per eseguire uno script python con python 3:

```bash
python3 script.py
```

### Riga di comando {#command-line}

**Riga di comando rispetto a script definiti dall'utente.** Slither è fornito con un set di rilevatori predefiniti che trovano molti bug comuni. Chiamare Slither dalla riga di comando eseguirà tutti i rilevatori, senza che sia necessaria alcuna conoscenza dettagliata dell'analisi statica:

```bash
slither project_paths
```

Oltre ai rilevatori, Slither ha capacità di revisione del codice attraverso i suoi [printer](https://github.com/crytic/slither#printers) e [strumenti](https://github.com/crytic/slither#tools).

Usa [crytic.io](https://github.com/crytic) per ottenere l'accesso a rilevatori privati e all'integrazione con GitHub.

## Analisi statica {#static-analysis}

Le capacità e il design del framework di analisi statica Slither sono stati descritti in post del blog ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) e in un [documento accademico](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf).

L'analisi statica esiste in diverse varianti. Molto probabilmente ti renderai conto che compilatori come [clang](https://clang-analyzer.llvm.org/) e [gcc](https://lwn.net/Articles/806099/) dipendono da queste tecniche di ricerca, ma è anche alla base di ([Infer](https://fbinfer.com/), [CodeClimate](https://codeclimate.com/), [FindBugs](http://findbugs.sourceforge.net/) e strumenti basati su metodi formali come [Frama-C](https://frama-c.com/) e [Polyspace](https://www.mathworks.com/products/polyspace.html).

Non esamineremo in modo esaustivo le tecniche di analisi statica e i ricercatori qui. Ci concentreremo invece su ciò che è necessario per comprendere come funziona Slither, in modo da poterlo usare più efficacemente per trovare bug e comprendere il codice.

- [Rappresentazione del codice](#code-representation)
- [Analisi del codice](#analysis)
- [Rappresentazione intermedia](#intermediate-representation)

### Rappresentazione del codice {#code-representation}

A differenza di un'analisi dinamica, che ragiona su un singolo percorso di esecuzione, l'analisi statica ragiona su tutti i percorsi contemporaneamente. Per farlo, si affida a una diversa rappresentazione del codice. Le due più comuni sono l'albero sintattico astratto (AST) e il grafo del flusso di controllo (CFG).

### Alberi Sintattici Astratti (AST) {#abstract-syntax-trees-ast}

Gli AST vengono usati ogni volta che il compilatore analizza il codice. È probabilmente la struttura più basilare su cui può essere eseguita l'analisi statica.

In breve, un AST è un albero strutturato in cui, di solito, ogni foglia contiene una variabile o una costante e i nodi interni sono operandi o operazioni del flusso di controllo. Considera il seguente codice:

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

Sebbene semplice da costruire, l'AST è una struttura annidata. A volte, non è la più semplice da analizzare. Ad esempio, per identificare le operazioni usate dall'espressione `a + b <= a`, devi prima analizzare `<=` e poi `+`. Un approccio comune è usare il cosiddetto pattern visitor, che naviga attraverso l'albero in modo ricorsivo. Slither contiene un visitor generico in [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py).

Il seguente codice usa `ExpressionVisitor` per rilevare se l'espressione contiene un'addizione:

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

### Grafo del Flusso di Controllo (CFG) {#control-flow-graph-cfg}

La seconda rappresentazione del codice più comune è il grafo del flusso di controllo (CFG). Come suggerisce il nome, è una rappresentazione basata su grafi che espone tutti i percorsi di esecuzione. Ogni nodo contiene una o più istruzioni. Gli archi nel grafo rappresentano le operazioni del flusso di controllo (if/then/else, loop, ecc.). Il CFG del nostro esempio precedente è:

![CFG](./cfg.png)

Il CFG è la rappresentazione su cui si basa la maggior parte delle analisi.

Esistono molte altre rappresentazioni del codice. Ogni rappresentazione ha vantaggi e svantaggi a seconda dell'analisi che si desidera eseguire.

### Analisi {#analysis}

Il tipo più semplice di analisi che puoi eseguire con Slither sono le analisi sintattiche.

### Analisi sintattica {#syntax-analysis}

Slither può navigare attraverso i diversi componenti del codice e la loro rappresentazione per trovare incongruenze e difetti usando un approccio simile al pattern matching.

Ad esempio, i seguenti rilevatori cercano problemi legati alla sintassi:

- [Shadowing delle variabili di stato](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): itera su tutte le variabili di stato e controlla se qualcuna fa ombra a una variabile di un contratto ereditato ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [Interfaccia ERC20 errata](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): cerca firme di funzioni ERC20 errate ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### Analisi semantica {#semantic-analysis}

A differenza dell'analisi sintattica, un'analisi semantica andrà più a fondo e analizzerà il "significato" del codice. Questa famiglia include alcuni ampi tipi di analisi. Portano a risultati più potenti e utili, ma sono anche più complessi da scrivere.

Le analisi semantiche vengono usate per i rilevamenti di vulnerabilità più avanzati.

#### Analisi delle dipendenze dei dati {#fixed-point-computation}

Si dice che una variabile `variable_a` è dipendente dai dati di `variable_b` se esiste un percorso per il quale il valore di `variable_a` è influenzato da `variable_b`.

Nel seguente codice, `variable_a` è dipendente da `variable_b`:

```solidity
// ...
variable_a = variable_b + 1;
```

Slither è dotato di capacità integrate di [dipendenza dei dati](https://github.com/crytic/slither/wiki/data-dependency), grazie alla sua rappresentazione intermedia (discussa in una sezione successiva).

Un esempio di utilizzo della dipendenza dei dati può essere trovato nel [rilevatore di uguaglianza stretta pericolosa](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities). Qui Slither cercherà un confronto di uguaglianza stretta con un valore pericoloso ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)) e informerà l'utente che dovrebbe usare `>=` o `<=` piuttosto che `==`, per impedire a un utente malintenzionato di intrappolare il contratto. Tra le altre cose, il rilevatore considererà come pericoloso il valore di ritorno di una chiamata a `balanceOf(address)` ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)) e userà il motore di dipendenza dei dati per tracciarne l'utilizzo.

#### Calcolo del punto fisso {#fixed-point-computation}

Se la tua analisi naviga attraverso il CFG e segue gli archi, è probabile che tu veda nodi già visitati. Ad esempio, se è presente un ciclo come mostrato di seguito:

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

La tua analisi dovrà sapere quando fermarsi. Ci sono due strategie principali qui: (1) iterare su ogni nodo un numero finito di volte, (2) calcolare un cosiddetto _punto fisso_ (fixpoint). Un punto fisso significa fondamentalmente che l'analisi di questo nodo non fornisce alcuna informazione significativa.

Un esempio di punto fisso utilizzato può essere trovato nei rilevatori di rientranza: Slither esplora i nodi e cerca chiamate esterne, scritture e letture nello spazio di archiviazione. Una volta raggiunto un punto fisso ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)), interrompe l'esplorazione e analizza i risultati per vedere se è presente una rientranza, attraverso diversi pattern di rientranza ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)).

Scrivere analisi usando un calcolo efficiente del punto fisso richiede una buona comprensione di come l'analisi propaga le sue informazioni.

### Rappresentazione intermedia {#intermediate-representation}

Una rappresentazione intermedia (IR) è un linguaggio concepito per essere più adatto all'analisi statica rispetto a quello originale. Slither traduce Solidity nella propria IR: [SlithIR](https://github.com/crytic/slither/wiki/SlithIR).

Comprendere SlithIR non è necessario se si desidera solo scrivere controlli di base. Tuttavia, tornerà utile se si prevede di scrivere analisi semantiche avanzate. I printer [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) e [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) ti aiuteranno a capire come viene tradotto il codice.

## Basi dell'API {#api-basics}

Slither ha un'API che ti consente di esplorare gli attributi di base del contratto e delle sue funzioni.

Per caricare una base di codice:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### Esplorare contratti e funzioni {#exploring-contracts-and-functions}

Un oggetto `Slither` ha:

- `contracts (list(Contract)`: elenco dei contratti
- `contracts_derived (list(Contract)`: elenco dei contratti che non sono ereditati da un altro contratto (sottoinsieme di contratti)
- `get_contract_from_name (str)`: Restituisce un contratto dal suo nome

Un oggetto `Contract` ha:

- `name (str)`: Nome del contratto
- `functions (list(Function))`: Elenco delle funzioni
- `modifiers (list(Modifier))`: Elenco delle funzioni
- `all_functions_called (list(Function/Modifier))`: Elenco di tutte le funzioni interne raggiungibili dal contratto
- `inheritance (list(Contract))`: Elenco dei contratti ereditati
- `get_function_from_signature (str)`: Restituisce una Function dalla sua firma
- `get_modifier_from_signature (str)`: Restituisce un Modifier dalla sua firma
- `get_state_variable_from_name (str)`: Restituisce una StateVariable dal suo nome

Un oggetto `Function` o `Modifier` ha:

- `name (str)`: Nome della funzione
- `contract (contract)`: il contratto in cui è dichiarata la funzione
- `nodes (list(Node))`: Elenco dei nodi che compongono il CFG della funzione/modificatore
- `entry_point (Node)`: Punto di ingresso del CFG
- `variables_read (list(Variable))`: Elenco delle variabili lette
- `variables_written (list(Variable))`: Elenco delle variabili scritte
- `state_variables_read (list(StateVariable))`: Elenco delle variabili di stato lette (sottoinsieme di variables`read)
- `state_variables_written (list(StateVariable))`: Elenco delle variabili di stato scritte (sottoinsieme di variables`written)