---
title: Comprendere le Specifiche dell'EVM dello Yellow Paper
description: Comprendere la parte dello Yellow Paper, le specifiche formali di Ethereum, che spiega la macchina virtuale di Ethereum (EVM).
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: EVM dello Yellow Paper
lang: it
published: 2022-05-15
---

[Lo Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) è la specifica formale di Ethereum. Tranne dove modificato dal [processo delle EIP](/eips/), contiene la descrizione esatta di come funziona tutto. È scritto come un documento matematico, che include una terminologia che i programmatori potrebbero non trovare familiare. In questo documento imparerai come leggerlo e, per estensione, altri documenti matematici correlati.

## Quale Yellow Paper? {#which-yellow-paper}

Come quasi tutto il resto in Ethereum, lo Yellow Paper si evolve nel tempo. Per poter fare riferimento a una versione specifica, ho caricato [la versione attuale al momento della stesura](yellow-paper-berlin.pdf). I numeri di sezione, pagina ed equazione che utilizzo faranno riferimento a quella versione. È una buona idea tenerlo aperto in un'altra finestra durante la lettura di questo documento.

### Perché l'EVM? {#why-the-evm}

Lo yellow paper originale è stato scritto proprio all'inizio dello sviluppo di Ethereum. Descrive il meccanismo di consenso originale basato sulla prova di lavoro che veniva originariamente utilizzato per proteggere la rete. Tuttavia, Ethereum ha abbandonato la prova di lavoro e ha iniziato a utilizzare il consenso basato sulla prova di stake a settembre 2022. Questo tutorial si concentrerà sulle parti dello yellow paper che definiscono la macchina virtuale di Ethereum. L'EVM è rimasta invariata dalla transizione alla prova di stake (ad eccezione del valore di ritorno dell'opcode DIFFICULTY).

## 9 Modello di esecuzione {#9-execution-model}

Questa sezione (p. 12-14) include la maggior parte della definizione dell'EVM.

Il termine _stato del sistema_ include tutto ciò che devi sapere sul sistema per eseguirlo. In un computer tipico, questo significa la memoria, il contenuto dei registri, ecc.

Una [macchina di Turing](https://en.wikipedia.org/wiki/Turing_machine) è un modello computazionale. Essenzialmente, è una versione semplificata di un computer, che ha dimostrato di avere la stessa capacità di eseguire calcoli di un computer normale (tutto ciò che un computer può calcolare, una macchina di Turing può calcolarlo e viceversa). Questo modello rende più facile dimostrare vari teoremi su cosa è e cosa non è computabile.

Il termine [Turing-completo](https://en.wikipedia.org/wiki/Turing_completeness) indica un computer che può eseguire gli stessi calcoli di una macchina di Turing. Le macchine di Turing possono entrare in cicli infiniti, e l'EVM non può perché esaurirebbe il gas, quindi è solo quasi-Turing-completa.

## 9.1 Basi {#91-basics}

Questa sezione fornisce le basi dell'EVM e come si confronta con altri modelli computazionali.

Una [macchina a stack](https://en.wikipedia.org/wiki/Stack_machine) è un computer che memorizza i dati intermedi non nei registri, ma in uno [**stack**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>) (pila). Questa è l'architettura preferita per le macchine virtuali perché è facile da implementare, il che significa che bug e vulnerabilità di sicurezza sono molto meno probabili. La memoria nello stack è divisa in parole (word) da 256 bit. Questa scelta è stata fatta perché è conveniente per le operazioni crittografiche principali di Ethereum, come l'hashing Keccak-256 e i calcoli sulle curve ellittiche. La dimensione massima dello stack è di 1024 elementi (1024 x 256 bit). Quando gli opcode vengono eseguiti, di solito ottengono i loro parametri dallo stack. Ci sono opcode specifici per riorganizzare gli elementi nello stack come `POP` (rimuove l'elemento dalla cima dello stack), `DUP_N` (duplica l'N-esimo elemento nello stack), ecc.

L'EVM ha anche uno spazio volatile chiamato **memoria** che viene utilizzato per memorizzare i dati durante l'esecuzione. Questa memoria è organizzata in parole da 32 byte. Tutte le posizioni di memoria sono inizializzate a zero. Se esegui questo codice [Yul](https://docs.soliditylang.org/en/latest/yul.html) per aggiungere una parola alla memoria, riempirà 32 byte di memoria riempiendo lo spazio vuoto nella parola con zeri, ovvero crea una parola - con zeri nelle posizioni 0-29, 0x60 nella 30 e 0xA7 nella 31.

```yul
mstore(0, 0x60A7)
```

`mstore` è uno dei tre opcode che l'EVM fornisce per interagire con la memoria: carica una parola nella memoria. Gli altri due sono `mstore8` che carica un singolo byte nella memoria, e `mload` che sposta una parola dalla memoria allo stack.

L'EVM ha anche un modello di **storage** (archiviazione) non volatile separato che viene mantenuto come parte dello stato del sistema: questa memoria è organizzata in array di parole (al contrario degli array di byte indirizzabili a parole nello stack). Questo storage è dove i contratti mantengono i dati persistenti: un contratto può interagire solo con il proprio storage. Lo storage è organizzato in mappature chiave-valore.

Sebbene non sia menzionato in questa sezione dello Yellow Paper, è anche utile sapere che esiste un quarto tipo di memoria. I **Calldata** sono una memoria di sola lettura indirizzabile a byte utilizzata per memorizzare il valore passato con il parametro `data` di una transazione. L'EVM ha opcode specifici per la gestione dei `calldata`. `calldatasize` restituisce la dimensione dei dati. `calldataload` carica i dati nello stack. `calldatacopy` copia i dati nella memoria.

L'architettura standard [di Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) memorizza codice e dati nella stessa memoria. L'EVM non segue questo standard per motivi di sicurezza: la condivisione della memoria volatile rende possibile modificare il codice del programma. Invece, il codice viene salvato nello storage.

Ci sono solo due casi in cui il codice viene eseguito dalla memoria:

- Quando un contratto crea un altro contratto (usando [`CREATE`](https://www.evm.codes/#f0) o [`CREATE2`](https://www.evm.codes/#f5)), il codice per il costruttore del contratto proviene dalla memoria.
- Durante la creazione di _qualsiasi_ contratto, il codice del costruttore viene eseguito e poi ritorna con il codice del contratto effettivo, anch'esso dalla memoria.

Il termine esecuzione eccezionale indica un'eccezione che causa l'interruzione dell'esecuzione del contratto corrente.

## 9.2 Panoramica delle commissioni {#92-fees-overview}

Questa sezione spiega come vengono calcolate le commissioni del gas. Ci sono tre costi:

### Costo dell'opcode {#opcode-cost}

Il costo intrinseco dell'opcode specifico. Per ottenere questo valore, trova il gruppo di costo dell'opcode nell'Appendice H (p. 28, sotto l'equazione (327)) e trova il gruppo di costo nell'equazione (324). Questo ti dà una funzione di costo, che nella maggior parte dei casi utilizza i parametri dell'Appendice G (p. 27).

Ad esempio, l'opcode [`CALLDATACOPY`](https://www.evm.codes/#37) è un membro del gruppo _W<sub>copy</sub>_. Il costo dell'opcode per quel gruppo è _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Guardando l'Appendice G, vediamo che entrambe le costanti sono 3, il che ci dà _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Dobbiamo ancora decifrare l'espressione _⌈μ<sub>s</sub>[2]÷32⌉_. La parte più esterna, _⌈ \<valore\> ⌉_ è la funzione soffitto (ceiling), una funzione che dato un valore restituisce il più piccolo intero che non è comunque minore del valore. Ad esempio, _⌈2.5⌉ = ⌈3⌉ = 3_. La parte interna è _μ<sub>s</sub>[2]÷32_. Guardando la sezione 3 (Convenzioni) a p. 3, _μ_ è lo stato della macchina. Lo stato della macchina è definito nella sezione 9.4.1 a p. 13. Secondo quella sezione, uno dei parametri dello stato della macchina è _s_ per lo stack. Mettendo tutto insieme, sembra che _μ<sub>s</sub>[2]_ sia la posizione #2 nello stack. Guardando [l'opcode](https://www.evm.codes/#37), la posizione #2 nello stack è la dimensione dei dati in byte. Guardando gli altri opcode nel gruppo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) e [`RETURNDATACOPY`](https://www.evm.codes/#3e), anch'essi hanno una dimensione dei dati nella stessa posizione. Quindi _⌈μ<sub>s</sub>[2]÷32⌉_ è il numero di parole da 32 byte necessarie per memorizzare i dati copiati. Mettendo tutto insieme, il costo intrinseco di [`CALLDATACOPY`](https://www.evm.codes/#37) è di 3 gas più 3 per ogni parola di dati copiata.

### Costo di esecuzione {#running-cost}

Il costo di esecuzione del codice che stiamo chiamando.

- Nel caso di [`CREATE`](https://www.evm.codes/#f0) e [`CREATE2`](https://www.evm.codes/#f5), il costruttore per il nuovo contratto.
- Nel caso di [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) o [`DELEGATECALL`](https://www.evm.codes/#f4), il contratto che chiamiamo.

### Costo di espansione della memoria {#expanding-memory-cost}

Il costo di espansione della memoria (se necessario).

Nell'equazione 324, questo valore è scritto come _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Guardando di nuovo la sezione 9.4.1, vediamo che _μ<sub>i</sub>_ è il numero di parole nella memoria. Quindi _μ<sub>i</sub>_ è il numero di parole nella memoria prima dell'opcode e _μ<sub>i</sub>'_ è il numero di parole nella memoria dopo l'opcode.

La funzione _C<sub>mem</sub>_ è definita nell'equazione 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ è la funzione pavimento (floor), una funzione che dato un valore restituisce il più grande intero che non è comunque maggiore del valore. Ad esempio, _⌊2.5⌋ = ⌊2⌋ = 2._ Quando _a < √512_, _a<sup>2</sup> < 512_, e il risultato della funzione pavimento è zero. Quindi per le prime 22 parole (704 byte), il costo aumenta linearmente con il numero di parole di memoria richieste. Oltre quel punto _⌊a<sup>2</sup> ÷ 512⌋_ è positivo. Quando la memoria richiesta è abbastanza alta, il costo del gas è proporzionale al quadrato della quantità di memoria.

**Nota** che questi fattori influenzano solo il costo _intrinseco_ del gas: non tengono conto del mercato delle commissioni o delle mance ai validatori che determinano quanto un utente finale è tenuto a pagare; questo è solo il costo grezzo dell'esecuzione di una particolare operazione sull'EVM.

[Maggiori informazioni sul gas](/developers/docs/gas/).

## 9.3 Ambiente di esecuzione {#93-execution-env}

L'ambiente di esecuzione è una tupla, _I_, che include informazioni che non fanno parte dello stato della blockchain o dell'EVM.

| Parametro       | Opcode per accedere ai dati                                                                                      | Codice Solidity per accedere ai dati     |
| --------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), ecc.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Campi dell'intestazione del blocco, come [`NUMBER`](https://www.evm.codes/#43) e [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, ecc. |
| _I<sub>e</sub>_ | Profondità dello stack di chiamate per le chiamate tra contratti (inclusa la creazione di contratti)                                |
| _I<sub>w</sub>_ | L'EVM è autorizzata a cambiare stato o è in esecuzione in modo statico                                                  |

Alcuni altri parametri sono necessari per comprendere il resto della sezione 9:

| Parametro | Definito nella sezione   | Significato                                                                                                                                                                                                                  |
| --------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (p. 2, equazione 1) | Lo stato della blockchain                                                                                                                                                                                              |
| _g_       | 9.3 (p. 13)          | Gas rimanente                                                                                                                                                                                                            |
| _A_       | 6.1 (p. 8)           | Sottostato maturato (modifiche programmate per quando termina la transazione)                                                                                                                                                       |
| _o_       | 9.3 (p. 13)          | Output: il risultato restituito nel caso di transazione interna (quando un contratto ne chiama un altro) e chiamate a funzioni di visualizzazione (quando si richiedono solo informazioni, quindi non c'è bisogno di aspettare una transazione) |

## 9.4 Panoramica dell'esecuzione {#94-execution-overview}

Ora che abbiamo tutti i preliminari, possiamo finalmente iniziare a lavorare su come funziona l'EVM.

Le equazioni 137-142 ci forniscono le condizioni iniziali per l'esecuzione dell'EVM:

| Simbolo           | Valore iniziale | Significato                                                                                                                                                                                                                                                     |
| ---------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_           | Gas rimanente                                                                                                                                                                                                                                               |
| _μ<sub>pc</sub>_ | _0_           | Program counter, l'indirizzo della prossima istruzione da eseguire                                                                                                                                                                                             |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memoria, inizializzata tutta a zeri                                                                                                                                                                                                                            |
| _μ<sub>i</sub>_  | _0_           | Posizione di memoria più alta utilizzata                                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_          | Lo stack, inizialmente vuoto                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_           | L'output, insieme vuoto fino a quando e a meno che non ci fermiamo con i dati di ritorno ([`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)) o senza di essi ([`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

L'equazione 143 ci dice che ci sono quattro possibili condizioni in ogni momento durante l'esecuzione e cosa fare con esse:

1.  `Z(σ,μ,A,I)`. Z rappresenta una funzione che verifica se un'operazione crea una transizione di stato non valida (vedi [interruzione eccezionale](#942-exceptional-halting)). Se restituisce Vero, il nuovo stato è identico a quello vecchio (tranne per il gas che viene bruciato) perché le modifiche non sono state implementate.
2.  Se l'opcode in esecuzione è [`REVERT`](https://www.evm.codes/#fd), il nuovo stato è uguale al vecchio stato, un po' di gas viene perso.
3.  Se la sequenza di operazioni è terminata, come indicato da un [`RETURN`](https://www.evm.codes/#f3)), lo stato viene aggiornato al nuovo stato.
4.  Se non ci troviamo in una delle condizioni finali 1-3, continua l'esecuzione.

## 9.4.1 Stato della macchina {#941-machine-state}

Questa sezione spiega lo stato della macchina in maggiore dettaglio. Specifica che _w_ è l'opcode corrente. Se _μ<sub>pc</sub>_ è minore di _||I<sub>b</sub>||_, la lunghezza del codice, allora quel byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) è l'opcode. Altrimenti, l'opcode è definito come [`STOP`](https://www.evm.codes/#00).

Poiché si tratta di una [macchina a stack](https://en.wikipedia.org/wiki/Stack_machine), dobbiamo tenere traccia del numero di elementi estratti (_δ_) e inseriti (_α_) da ciascun opcode.

## 9.4.2 Interruzione eccezionale {#942-exceptional-halt}

Questa sezione definisce la funzione _Z_, che specifica quando abbiamo una terminazione anomala. Questa è una funzione [Booleana](https://en.wikipedia.org/wiki/Boolean_data_type), quindi utilizza [_∨_ per un OR logico](https://en.wikipedia.org/wiki/Logical_disjunction) e [_∧_ per un AND logico](https://en.wikipedia.org/wiki/Logical_conjunction).

Abbiamo un'interruzione eccezionale se una qualsiasi di queste condizioni è vera:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Come abbiamo visto nella sezione 9.2, _C_ è la funzione che specifica il costo del gas. Non c'è abbastanza gas rimasto per coprire il prossimo opcode.

- **_δ<sub>w</sub>=∅_**
  Se il numero di elementi estratti per un opcode non è definito, allora l'opcode stesso non è definito.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Underflow dello stack, non ci sono abbastanza elementi nello stack per l'opcode corrente.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  L'opcode è [`JUMP`](https://www.evm.codes/#56) e l'indirizzo non è un [`JUMPDEST`](https://www.evm.codes/#5b). I salti sono validi _solo_ quando la destinazione è un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  L'opcode è [`JUMPI`](https://www.evm.codes/#57), la condizione è vera (diversa da zero) quindi il salto dovrebbe avvenire, e l'indirizzo non è un [`JUMPDEST`](https://www.evm.codes/#5b). I salti sono validi _solo_ quando la destinazione è un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  L'opcode è [`RETURNDATACOPY`](https://www.evm.codes/#3e). In questo opcode l'elemento dello stack _μ<sub>s</sub>[1]_ è l'offset da cui leggere nel buffer dei dati di ritorno, e l'elemento dello stack _μ<sub>s</sub>[2]_ è la lunghezza dei dati. Questa condizione si verifica quando si tenta di leggere oltre la fine del buffer dei dati di ritorno. Nota che non esiste una condizione simile per i calldata o per il codice stesso. Quando provi a leggere oltre la fine di quei buffer ottieni semplicemente degli zeri.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Overflow dello stack. Se l'esecuzione dell'opcode comporterà uno stack di oltre 1024 elementi, interrompi.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Stiamo eseguendo in modo statico ([¬ è la negazione](https://en.wikipedia.org/wiki/Negation) e _I<sub>w</sub>_ è vero quando ci è permesso cambiare lo stato della blockchain)? Se è così, e stiamo provando un'operazione di modifica dello stato, non può avvenire.

  La funzione _W(w,μ)_ è definita più avanti nell'equazione 150. _W(w,μ)_ è vera se una di queste condizioni è vera:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Questi opcode cambiano lo stato, creando un nuovo contratto, memorizzando un valore o distruggendo il contratto corrente.

  - **_LOG0≤w ∧ w≤LOG4_**
    Se veniamo chiamati staticamente non possiamo emettere voci di log.
    Gli opcode di log sono tutti nell'intervallo tra [`LOG0` (A0)](https://www.evm.codes/#a0) e [`LOG4` (A4)](https://www.evm.codes/#a4).
    Il numero dopo l'opcode di log specifica quanti argomenti (topic) contiene la voce di log.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Puoi chiamare un altro contratto quando sei statico, ma se lo fai non puoi trasferirgli ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Non puoi eseguire [`SSTORE`](https://www.evm.codes/#55) a meno che tu non abbia più di G<sub>callstipend</sub> (definito come 2300 nell'Appendice G) gas.

## 9.4.3 Validità della destinazione di salto {#943-jump-dest-valid}

Qui definiamo formalmente quali sono gli opcode [`JUMPDEST`](https://www.evm.codes/#5b). Non possiamo semplicemente cercare il valore del byte 0x5B, perché potrebbe trovarsi all'interno di un PUSH (e quindi essere un dato e non un opcode).

Nell'equazione (153) definiamo una funzione, _N(i,w)_. Il primo parametro, _i_, è la posizione dell'opcode. Il secondo, _w_, è l'opcode stesso. Se _w∈[PUSH1, PUSH32]_ significa che l'opcode è un PUSH (le parentesi quadre definiscono un intervallo che include gli estremi). In quel caso il prossimo opcode si trova a _i+2+(w−PUSH1)_. Per [`PUSH1`](https://www.evm.codes/#60) dobbiamo avanzare di due byte (il PUSH stesso e il valore di un byte), per [`PUSH2`](https://www.evm.codes/#61) dobbiamo avanzare di tre byte perché è un valore di due byte, ecc. Tutti gli altri opcode dell'EVM sono lunghi solo un byte, quindi in tutti gli altri casi _N(i,w)=i+1_.

Questa funzione viene utilizzata nell'equazione (152) per definire _D<sub>J</sub>(c,i)_, che è l'[insieme](<https://en.wikipedia.org/wiki/Set_(mathematics)>) di tutte le destinazioni di salto valide nel codice _c_, a partire dalla posizione dell'opcode _i_. Questa funzione è definita in modo ricorsivo. Se _i≥||c||_, significa che siamo alla fine o dopo la fine del codice. Non troveremo altre destinazioni di salto, quindi restituiamo semplicemente l'insieme vuoto.

In tutti gli altri casi guardiamo il resto del codice passando all'opcode successivo e ottenendo l'insieme a partire da esso. _c[i]_ è l'opcode corrente, quindi _N(i,c[i])_ è la posizione dell'opcode successivo. _D<sub>J</sub>(c,N(i,c[i]))_ è quindi l'insieme delle destinazioni di salto valide che inizia all'opcode successivo. Se l'opcode corrente non è un `JUMPDEST`, restituisci semplicemente quell'insieme. Se è `JUMPDEST`, includilo nell'insieme dei risultati e restituiscilo.

## 9.4.4 Interruzione normale {#944-normal-halt}

La funzione di interruzione _H_, può restituire tre tipi di valori.

- Se non siamo in un opcode di interruzione, restituisci _∅_, l'insieme vuoto. Per convenzione, questo valore viene interpretato come falso Booleano.
- Se abbiamo un opcode di interruzione che non produce output (sia [`STOP`](https://www.evm.codes/#00) che [`SELFDESTRUCT`](https://www.evm.codes/#ff)), restituisci una sequenza di byte di dimensione zero come valore di ritorno. Nota che questo è molto diverso dall'insieme vuoto. Questo valore significa che l'EVM si è davvero interrotta, solo che non ci sono dati di ritorno da leggere.
- Se abbiamo un opcode di interruzione che produce output (sia [`RETURN`](https://www.evm.codes/#f3) che [`REVERT`](https://www.evm.codes/#fd)), restituisci la sequenza di byte specificata da quell'opcode. Questa sequenza è presa dalla memoria, il valore in cima allo stack (_μ<sub>s</sub>[0]_) è il primo byte, e il valore dopo di esso (_μ<sub>s</sub>[1]_) è la lunghezza.

## H.2 Set di istruzioni {#h2-instruction-set}

Prima di passare alla sottosezione finale dell'EVM, la 9.5, diamo un'occhiata alle istruzioni stesse. Sono definite nell'Appendice H.2 che inizia a p. 29. Tutto ciò che non è specificato come modificato con quello specifico opcode dovrebbe rimanere lo stesso. Le variabili che cambiano sono specificate come \<qualcosa\>′.

Ad esempio, diamo un'occhiata all'opcode [`ADD`](https://www.evm.codes/#01).

| Valore | Mnemonico | δ   | α   | Descrizione                                               |
| ----: | -------- | --- | --- | --------------------------------------------------------- |
|  0x01 | ADD      | 2   | 1   | Operazione di addizione.                                       |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ è il numero di valori che estraiamo dallo stack. In questo caso due, perché stiamo sommando i primi due valori.

_α_ è il numero di valori che reinseriamo. In questo caso uno, la somma.

Quindi la nuova cima dello stack (_μ′<sub>s</sub>[0]_) è la somma della vecchia cima dello stack (_μ<sub>s</sub>[0]_) e del vecchio valore sotto di essa (_μ<sub>s</sub>[1]_).

Invece di esaminare tutti gli opcode con un "elenco da far incrociare gli occhi", questo articolo spiega solo quegli opcode che introducono qualcosa di nuovo.

| Valore | Mnemonico  | δ   | α   | Descrizione                                                                                                |
| ----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2   | 1   | Calcola l'hash Keccak-256.                                                                                   |
|       |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Questo è il primo opcode che accede alla memoria (in questo caso, in sola lettura). Tuttavia, potrebbe espandersi oltre i limiti attuali della memoria, quindi dobbiamo aggiornare _μ<sub>i</sub>._ Lo facciamo utilizzando la funzione _M_ definita nell'equazione 328 a p. 29.

| Valore | Mnemonico | δ   | α   | Descrizione                       |
| ----: | -------- | --- | --- | --------------------------------- |
|  0x31 | BALANCE  | 1   | 1   | Ottieni il saldo dell'account specificato. |
|       |          |     |     | ...                               |

L'indirizzo di cui dobbiamo trovare il saldo è _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. La cima dello stack è l'indirizzo, ma poiché gli indirizzi sono solo di 160 bit, calcoliamo il valore [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, significa che ci sono informazioni su questo indirizzo. In quel caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ è il saldo per quell'indirizzo. Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, significa che questo indirizzo non è inizializzato e il saldo è zero. Puoi vedere l'elenco dei campi di informazione dell'account nella sezione 4.1 a p. 4.

La seconda equazione, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, è correlata alla differenza di costo tra l'accesso allo storage caldo (storage a cui si è acceduto di recente ed è probabile che sia nella cache) e allo storage freddo (storage a cui non si è acceduto ed è probabile che si trovi in uno storage più lento e più costoso da recuperare). _A<sub>a</sub>_ è l'elenco degli indirizzi a cui la transazione ha precedentemente effettuato l'accesso, che dovrebbero quindi essere più economici da accedere, come definito nella sezione 6.1 a p. 8. Puoi leggere di più su questo argomento nella [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valore | Mnemonico | δ   | α   | Descrizione                             |
| ----: | -------- | --- | --- | --------------------------------------- |
|  0x8F | DUP16    | 16  | 17  | Duplica il 16° elemento dello stack.              |
|       |          |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Nota che per utilizzare qualsiasi elemento dello stack, dobbiamo estrarlo, il che significa che dobbiamo anche estrarre tutti gli elementi dello stack sopra di esso. Nel caso di [`DUP<n>`](https://www.evm.codes/#8f) e [`SWAP<n>`](https://www.evm.codes/#9f), questo significa dover estrarre e poi reinserire fino a sedici valori.

## 9.5 Il ciclo di esecuzione {#95-exec-cycle}

Ora che abbiamo tutte le parti, possiamo finalmente capire come è documentato il ciclo di esecuzione dell'EVM.

L'equazione (155) dice che dato lo stato:

- _σ_ (stato globale della blockchain)
- _μ_ (stato dell'EVM)
- _A_ (sottostato, modifiche che avverranno al termine della transazione)
- _I_ (ambiente di esecuzione)

Il nuovo stato è _(σ', μ', A', I')_.

Le equazioni (156)-(158) definiscono lo stack e la sua modifica dovuta a un opcode (_μ<sub>s</sub>_). L'equazione (159) è la variazione del gas (_μ<sub>g</sub>_). L'equazione (160) è la variazione del program counter (_μ<sub>pc</sub>_). Infine, le equazioni (161)-(164) specificano che gli altri parametri rimangono gli stessi, a meno che non vengano esplicitamente modificati dall'opcode.

Con questo l'EVM è completamente definita.

## Conclusione {#conclusion}

La notazione matematica è precisa e ha permesso allo Yellow Paper di specificare ogni dettaglio di Ethereum. Tuttavia, presenta alcuni svantaggi:

- Può essere compresa solo dagli esseri umani, il che significa che i [test di conformità](https://github.com/ethereum/tests) devono essere scritti manualmente.
- I programmatori capiscono il codice informatico.
  Potrebbero o meno capire la notazione matematica.

Forse per questi motivi, le più recenti [specifiche del livello di consenso](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) sono scritte in Python. Ci sono [specifiche del livello di esecuzione in Python](https://ethereum.github.io/execution-specs), ma non sono complete. Fino a quando e a meno che l'intero Yellow Paper non venga tradotto anche in Python o in un linguaggio simile, lo Yellow Paper continuerà a essere in servizio, ed è utile saperlo leggere.