---
title: Comprendere le specifiche EVM dello Yellow Paper
description: Comprendere la parte dello Yellow Paper, le specifiche formali per Ethereum, che spiega la macchina virtuale di Ethereum (EVM).
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: it
published: 2022-05-15
---

[Lo Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) è la specifica formale per Ethereum. Tranne dove modificato dal [processo EIP](/eips/), contiene la descrizione esatta di come funziona tutto. È scritto come un documento matematico, che include una terminologia che i programmatori potrebbero non trovare familiare. In questo articolo imparerai a leggerlo e, per estensione, altri articoli matematici correlati.

## Quale Yellow Paper? {#which-yellow-paper}

Come quasi tutto il resto in Ethereum, lo Yellow Paper si evolve nel tempo. Per poter fare riferimento a una versione specifica, ho caricato [la versione attuale al momento della stesura](yellow-paper-berlin.pdf). I numeri di sezione, pagina ed equazione che uso faranno riferimento a quella versione. È una buona idea averlo aperto in un'altra finestra mentre leggi questo documento.

### Perché l'EVM? {#why-the-evm}

Lo Yellow Paper originale è stato scritto proprio all'inizio dello sviluppo di Ethereum. Descrive il meccanismo di consenso basato sul proof-of-work originariamente utilizzato per proteggere la rete. Tuttavia, a settembre 2022 Ethereum ha disattivato il proof-of-work e ha iniziato a utilizzare un consenso basato sul proof-of-stake. Questo tutorial si concentrerà sulle parti dello Yellow Paper che definiscono la macchina virtuale di Ethereum. L'EVM è rimasta invariata dalla transizione al proof-of-stake (ad eccezione del valore di ritorno dell'opcode DIFFICULTY).

## 9 Modello di esecuzione {#9-execution-model}

Questa sezione (pag. 12-14) include la maggior parte della definizione dell'EVM.

Il termine _stato del sistema_ include tutto ciò che devi sapere sul sistema per eseguirlo. In un computer tipico, questo significa la memoria, il contenuto dei registri, ecc.

Una [macchina di Turing](https://en.wikipedia.org/wiki/Turing_machine) è un modello computazionale. In sostanza, è una versione semplificata di un computer, che ha dimostrato di avere la stessa capacità di eseguire calcoli di un computer normale (tutto ciò che un computer può calcolare, può essere calcolato da una macchina di Turing e viceversa). Questo modello rende più facile dimostrare vari teoremi su ciò che è e ciò che non è calcolabile.

Il termine [Turing-completo](https://en.wikipedia.org/wiki/Turing_completeness) indica un computer che può eseguire gli stessi calcoli di una macchina di Turing. Le macchine di Turing possono entrare in loop infiniti, mentre l'EVM non può perché esaurirebbe il gas, quindi è solo quasi-Turing-completa.

## 9.1 Nozioni di base {#91-basics}

Questa sezione fornisce le nozioni di base dell'EVM e la confronta con altri modelli computazionali.

Una [macchina a stack](https://en.wikipedia.org/wiki/Stack_machine) è un computer che archivia i dati intermedi non nei registri, ma in uno [**stack**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Questa è l'architettura preferita per le macchine virtuali perché è facile da implementare, il che significa che bug e vulnerabilità di sicurezza sono molto meno probabili. La memoria nello stack è divisa in parole da 256 bit. Questa scelta è stata fatta perché è conveniente per le operazioni crittografiche principali di Ethereum, come l'hashing Keccak-256 e i calcoli delle curve ellittiche. La dimensione massima dello stack è di 1024 elementi (1024 x 256 bit). Quando gli opcode vengono eseguiti, di solito ottengono i loro parametri dallo stack. Esistono opcode specifici per riorganizzare gli elementi nello stack come `POP` (rimuove l'elemento dalla cima dello stack), `DUP_N` (duplica l'N-esimo elemento nello stack), ecc.

L'EVM ha anche uno spazio volatile chiamato **memoria** che viene utilizzato per archiviare i dati durante l'esecuzione. Questa memoria è organizzata in parole da 32 byte. Tutte le posizioni di memoria sono inizializzate a zero. Se esegui questo codice [Yul](https://docs.soliditylang.org/en/latest/yul.html) per aggiungere una parola alla memoria, riempirà 32 byte di memoria riempiendo lo spazio vuoto nella parola con zeri, ovvero crea una parola - con zeri nelle posizioni 0-29, 0x60 alla 30 e 0xA7 alla 31.

```yul
mstore(0, 0x60A7)
```

`mstore` è uno dei tre opcode che l'EVM fornisce per interagire con la memoria: carica una parola in memoria. Gli altri due sono `mstore8` che carica un singolo byte in memoria e `mload` che sposta una parola dalla memoria allo stack.

L'EVM ha anche un modello di **archiviazione** non volatile separato che viene mantenuto come parte dello stato del sistema: questa memoria è organizzata in array di parole (a differenza degli array di byte indirizzabili per parola nello stack). Questa archiviazione è dove i contratti conservano i dati persistenti: un contratto può interagire solo con la propria archiviazione. L'archiviazione è organizzata in mappature chiave-valore.

Sebbene non sia menzionato in questa sezione dello Yellow Paper, è anche utile sapere che esiste un quarto tipo di memoria. **Calldata** è una memoria di sola lettura indirizzabile per byte utilizzata per archiviare il valore passato con il parametro `data` di una transazione. L'EVM ha opcode specifici per la gestione di `calldata`. `calldatasize` restituisce la dimensione dei dati. `calldataload` carica i dati nello stack. `calldatacopy` copia i dati in memoria.

L'architettura standard di [Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) archivia codice e dati nella stessa memoria. L'EVM non segue questo standard per motivi di sicurezza: la condivisione della memoria volatile rende possibile la modifica del codice del programma. Invece, il codice viene salvato nell'archiviazione.

Ci sono solo due casi in cui il codice viene eseguito dalla memoria:

- Quando un contratto crea un altro contratto (usando [`CREATE`](https://www.evm.codes/#f0) o [`CREATE2`](https://www.evm.codes/#f5)), il codice per il costruttore del contratto proviene dalla memoria.
- Durante la creazione di _qualsiasi_ contratto, il codice del costruttore viene eseguito e quindi restituisce il codice del contratto effettivo, sempre dalla memoria.

Il termine esecuzione eccezionale indica un'eccezione che causa l'arresto dell'esecuzione del contratto corrente.

## 9.2 Panoramica delle commissioni {#92-fees-overview}

Questa sezione spiega come vengono calcolate le commissioni sul gas. Ci sono tre costi:

### Costo dell'opcode {#opcode-cost}

Il costo intrinseco dell'opcode specifico. Per ottenere questo valore, trova il gruppo di costo dell'opcode nell'Appendice H (pag. 28, sotto l'equazione (327)) e trova il gruppo di costo nell'equazione (324). Questo ti dà una funzione di costo, che nella maggior parte dei casi usa i parametri dell'Appendice G (pag. 27).

Ad esempio, l'opcode [`CALLDATACOPY`](https://www.evm.codes/#37) è un membro del gruppo _W<sub>copy</sub>_. Il costo dell'opcode per quel gruppo è _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Guardando l'Appendice G, vediamo che entrambe le costanti sono 3, il che ci dà _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Dobbiamo ancora decifrare l'espressione _⌈μ<sub>s</sub>[2]÷32⌉_. La parte più esterna, _⌈ \<valore\> ⌉_ è la funzione ceiling, una funzione che, dato un valore, restituisce il più piccolo intero che non è ancora più piccolo del valore. Ad esempio, _⌈2,5⌉ = ⌈3⌉ = 3_. La parte interna è _μ<sub>s</sub>[2]÷32_. Guardando la sezione 3 (Convenzioni) a pag. 3, _μ_ è lo stato della macchina. Lo stato della macchina è definito nella sezione 9.4.1 a pag. 13. Secondo quella sezione, uno dei parametri dello stato della macchina è _s_ per lo stack. Mettendo tutto insieme, sembra che _μ<sub>s</sub>[2]_ sia la posizione #2 nello stack. Guardando [l'opcode](https://www.evm.codes/#37), la posizione #2 nello stack è la dimensione dei dati in byte. Guardando gli altri opcode nel gruppo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) e [`RETURNDATACOPY`](https://www.evm.codes/#3e), anch'essi hanno una dimensione di dati nella stessa posizione. Quindi _⌈μ<sub>s</sub>[2]÷32⌉_ è il numero di parole da 32 byte necessarie per archiviare i dati da copiare. Mettendo tutto insieme, il costo intrinseco di [`CALLDATACOPY`](https://www.evm.codes/#37) è 3 gas più 3 per ogni parola di dati copiata.

### Costo di esecuzione {#running-cost}

Il costo di esecuzione del codice che stiamo chiamando.

- Nel caso di [`CREATE`](https://www.evm.codes/#f0) e [`CREATE2`](https://www.evm.codes/#f5), il costruttore per il nuovo contratto.
- Nel caso di [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) o [`DELEGATECALL`](https://www.evm.codes/#f4), il contratto che chiamiamo.

### Costo di espansione della memoria {#expanding-memory-cost}

Il costo di espansione della memoria (se necessario).

Nell'equazione 324, questo valore è scritto come _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Guardando di nuovo la sezione 9.4.1, vediamo che _μ<sub>i</sub>_ è il numero di parole in memoria. Quindi _μ<sub>i</sub>_ è il numero di parole in memoria prima dell'opcode e _μ<sub>i</sub>'_ è il numero di parole in memoria dopo l'opcode.

La funzione _C<sub>mem</sub>_ è definita nell'equazione 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ è la funzione floor, una funzione che, dato un valore, restituisce il più grande intero che non è ancora più grande del valore. Ad esempio, _⌊2,5⌋ = ⌊2⌋ = 2._ Quando _a < √512_, _a<sup>2</sup> < 512_, e il risultato della funzione floor è zero. Quindi, per le prime 22 parole (704 byte), il costo aumenta linearmente con il numero di parole di memoria richieste. Oltre quel punto, _⌊a<sup>2</sup> ÷ 512⌋_ è positivo. Quando la memoria richiesta è sufficientemente alta, il costo del gas è proporzionale al quadrato della quantità di memoria.

**Nota**: questi fattori influenzano solo il costo del gas _intrinseco_; non tengono conto del mercato delle commissioni o delle mance ai validatori che determinano quanto un utente finale è tenuto a pagare. Questo è solo il costo grezzo dell'esecuzione di una particolare operazione sull'EVM.

[Leggi di più sul gas](/developers/docs/gas/).

## 9.3 Ambiente di esecuzione {#93-execution-env}

L'ambiente di esecuzione è una tupla, _I_, che include informazioni che non fanno parte dello stato della blockchain o dell'EVM.

| Parametro       | Opcode per accedere ai dati                                                                                                | Codice Solidity per accedere ai dati                     |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                     | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                      | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                    | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), ecc.                                                          | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                      | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                   | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                    | `address(this).code`                                     |
| _I<sub>H</sub>_ | Campi dell'intestazione del blocco, come [`NUMBER`](https://www.evm.codes/#43) e [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, ecc. |
| _I<sub>e</sub>_ | Profondità dello stack di chiamate per le chiamate tra contratti (inclusa la creazione del contratto)   |                                                          |
| _I<sub>w</sub>_ | L'EVM è autorizzata a cambiare stato, o sta funzionando in modo statico?                                                   |                                                          |

Alcuni altri parametri sono necessari per capire il resto della sezione 9:

| Parametro | Definito nella sezione                                           | Significato                                                                                                                                                                                                                                                                                                  |
| --------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (pag. 2, equazione 1)       | Lo stato della blockchain                                                                                                                                                                                                                                                                                    |
| _g_       | 9.3 (pag. 13) | Gas rimanente                                                                                                                                                                                                                                                                                                |
| _A_       | 6.1 (pag. 8)  | Sottostato maturato (modifiche programmate per la fine della transazione)                                                                                                                                                                                                                 |
| _o_       | 9.3 (pag. 13) | Output: il risultato restituito nel caso di una transazione interna (quando un contratto ne chiama un altro) e le chiamate per visualizzare le funzioni (quando stai solo chiedendo informazioni, quindi non c'è bisogno di attendere una transazione) |

## 9.4 Panoramica dell'esecuzione {#94-execution-overview}

Ora che abbiamo tutte le nozioni preliminari, possiamo finalmente iniziare a lavorare su come funziona l'EVM.

Le equazioni 137-142 ci danno le condizioni iniziali per l'esecuzione dell'EVM:

| Simbolo          | Valore iniziale                                                                  | Significato                                                                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Gas rimanente                                                                                                                                                                                                                                                                                                        |
| _μ<sub>pc</sub>_ | _0_                                                                              | Contatore di programma, l'indirizzo della prossima istruzione da eseguire                                                                                                                                                                                                                                            |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memoria, inizializzata con tutti zeri                                                                                                                                                                                                                                                                                |
| _μ<sub>i</sub>_  | _0_                                                                              | Posizione di memoria più alta utilizzata                                                                                                                                                                                                                                                                             |
| _μ<sub>s</sub>_  | _()_                                                          | Lo stack, inizialmente vuoto                                                                                                                                                                                                                                                                                         |
| _μ<sub>o</sub>_  | _∅_                                                                              | L'output, insieme vuoto fino a quando non ci si ferma con dati di ritorno ([`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)) o senza di essi ([`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

L'equazione 143 ci dice che ci sono quattro possibili condizioni in ogni momento durante l'esecuzione e cosa fare con esse:

1. `Z(σ,μ,A,I)`. Z rappresenta una funzione che verifica se un'operazione crea una transizione di stato non valida (vedi [arresto eccezionale](#942-exceptional-halting)). Se restituisce True, il nuovo stato è identico a quello vecchio (tranne per il gas che viene consumato) perché le modifiche non sono state implementate.
2. Se l'opcode in esecuzione è [`REVERT`](https://www.evm.codes/#fd), il nuovo stato è lo stesso del vecchio stato, viene perso del gas.
3. Se la sequenza di operazioni è terminata, come indicato da un [`RETURN`](https://www.evm.codes/#f3)), lo stato viene aggiornato al nuovo stato.
4. Se non ci troviamo in una delle condizioni di fine 1-3, continua l'esecuzione.

## 9.4.1 Stato della macchina {#941-machine-state}

Questa sezione spiega lo stato della macchina in modo più dettagliato. Specifica che _w_ è l'opcode corrente. Se _μ<sub>pc</sub>_ è inferiore a _||I<sub>b</sub>||_, la lunghezza del codice, allora quel byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) è l'opcode. Altrimenti, l'opcode è definito come [`STOP`](https://www.evm.codes/#00).

Poiché questa è una [macchina a stack](https://en.wikipedia.org/wiki/Stack_machine), dobbiamo tenere traccia del numero di elementi estratti (_δ_) e inseriti (_α_) da ogni opcode.

## 9.4.2 Arresto eccezionale {#942-exceptional-halt}

Questa sezione definisce la funzione _Z_, che specifica quando si ha una terminazione anomala. Questa è una funzione [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), quindi usa [_∨_ per un OR logico](https://en.wikipedia.org/wiki/Logical_disjunction) e [_∧_ per un AND logico](https://en.wikipedia.org/wiki/Logical_conjunction).

Abbiamo un arresto eccezionale se una di queste condizioni è vera:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Come abbiamo visto nella sezione 9.2, _C_ è la funzione che specifica il costo del gas. Non c'è abbastanza gas rimasto per coprire il prossimo opcode.

- **_δ<sub>w</sub>=∅_**
  Se il numero di elementi estratti per un opcode è indefinito, allora l'opcode stesso è indefinito.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Stack underflow, non ci sono abbastanza elementi nello stack per l'opcode corrente.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  L'opcode è [`JUMP`](https://www.evm.codes/#56) e l'indirizzo non è un [`JUMPDEST`](https://www.evm.codes/#5b). I salti sono validi _solo_ quando la destinazione è un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  L'opcode è [`JUMPI`](https://www.evm.codes/#57), la condizione è vera (diversa da zero), quindi il salto dovrebbe avvenire, e l'indirizzo non è un [`JUMPDEST`](https://www.evm.codes/#5b). I salti sono validi _solo_ quando la destinazione è un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  L'opcode è [`RETURNDATACOPY`](https://www.evm.codes/#3e). In questo opcode, l'elemento dello stack _μ<sub>s</sub>[1]_ è l'offset da cui leggere nel buffer dei dati di ritorno, e l'elemento dello stack _μ<sub>s</sub>[2]_ è la lunghezza dei dati. Questa condizione si verifica quando si tenta di leggere oltre la fine del buffer dei dati di ritorno. Nota che non c'è una condizione simile per i calldata o per il codice stesso. Quando provi a leggere oltre la fine di quei buffer, ottieni solo zeri.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Stack overflow. Se l'esecuzione dell'opcode risulterà in uno stack di oltre 1024 elementi, interrompi.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Stiamo eseguendo staticamente ([¬ è la negazione](https://en.wikipedia.org/wiki/Negation) e _I<sub>w</sub>_ è vero quando ci è permesso di cambiare lo stato della blockchain)? Se è così, e stiamo provando un'operazione che cambia lo stato, non può accadere.

  La funzione _W(w,μ)_ è definita più avanti nell'equazione 150. _W(w,μ)_ è vero se una di queste condizioni è vera:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Questi opcode cambiano lo stato, creando un nuovo contratto, archiviando un valore o distruggendo il contratto corrente.

  - **_LOG0≤w ∧ w≤LOG4_**
    Se veniamo chiamati staticamente non possiamo emettere voci di registro.
    Gli opcode di registro sono tutti nell'intervallo tra [`LOG0` (A0)](https://www.evm.codes/#a0) e [`LOG4` (A4)](https://www.evm.codes/#a4).
    Il numero dopo l'opcode di registro specifica quanti argomenti contiene la voce di registro.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Puoi chiamare un altro contratto quando sei statico, ma se lo fai non puoi trasferirgli ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Non puoi eseguire [`SSTORE`](https://www.evm.codes/#55) a meno che tu non abbia più di G<sub>callstipend</sub> (definito come 2300 nell'Appendice G) di gas.

## 9.4.3 Validità della destinazione del salto {#943-jump-dest-valid}

Qui definiamo formalmente cosa sono gli opcode [`JUMPDEST`](https://www.evm.codes/#5b). Non possiamo semplicemente cercare il valore di byte 0x5B, perché potrebbe essere all'interno di un PUSH (e quindi dati e non un opcode).

Nell'equazione (153) definiamo una funzione, _N(i,w)_. Il primo parametro, _i_, è la posizione dell'opcode. Il secondo, _w_, è l'opcode stesso. Se _w∈[PUSH1, PUSH32]_ significa che l'opcode è un PUSH (le parentesi quadre definiscono un intervallo che include gli estremi). In tal caso, l'opcode successivo si trova in _i+2+(w−PUSH1)_. Per [`PUSH1`](https://www.evm.codes/#60) dobbiamo avanzare di due byte (il PUSH stesso e il valore di un byte), per [`PUSH2`](https://www.evm.codes/#61) dobbiamo avanzare di tre byte perché è un valore di due byte, ecc. Tutti gli altri opcode dell'EVM sono lunghi un solo byte, quindi in tutti gli altri casi _N(i,w)=i+1_.

Questa funzione è usata nell'equazione (152) per definire _D<sub>J</sub>(c,i)_, che è l'[insieme](https://en.wikipedia.org/wiki/Set_\(mathematics\)) di tutte le destinazioni di salto valide nel codice _c_, a partire dalla posizione dell'opcode _i_. Questa funzione è definita ricorsivamente. Se _i≥||c||_, significa che siamo alla fine del codice o oltre. Non troveremo altre destinazioni di salto, quindi restituisci semplicemente l'insieme vuoto.

In tutti gli altri casi, guardiamo il resto del codice andando all'opcode successivo e ottenendo l'insieme a partire da esso. _c[i]_ è l'opcode corrente, quindi _N(i,c[i])_ è la posizione dell'opcode successivo. _D<sub>J</sub>(c,N(i,c[i]))_ è quindi l'insieme di destinazioni di salto valide che inizia dall'opcode successivo. Se l'opcode corrente non è un `JUMPDEST`, restituisci semplicemente quell'insieme. Se è `JUMPDEST`, includilo nell'insieme dei risultati e restituiscilo.

## 9.4.4 Arresto normale {#944-normal-halt}

La funzione di arresto _H_, può restituire tre tipi di valori.

- Se non siamo in un opcode di arresto, restituisce _∅_, l'insieme vuoto. Per convenzione, questo valore viene interpretato come booleano falso.
- Se abbiamo un opcode di arresto che non produce output (o [`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)), restituisce una sequenza di byte di dimensione zero come valore di ritorno. Nota che questo è molto diverso dall'insieme vuoto. Questo valore significa che l'EVM si è effettivamente arrestata, solo che non ci sono dati di ritorno da leggere.
- Se abbiamo un opcode di arresto che produce output (o [`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)), restituisce la sequenza di byte specificata da quell'opcode. Questa sequenza è presa dalla memoria, il valore in cima allo stack (_μ<sub>s</sub>[0]_) è il primo byte, e il valore dopo di esso (_μ<sub>s</sub>[1]_) è la lunghezza.

## H.2 Set di istruzioni {#h2-instruction-set}

Prima di passare alla sottosezione finale dell'EVM, 9.5, diamo un'occhiata alle istruzioni stesse. Sono definite nell'Appendice H.2 che inizia a pag. 29. Tutto ciò che non è specificato come variabile con quello specifico opcode dovrebbe rimanere invariato. Le variabili che cambiano sono specificate con \<qualcosa\>′.

Ad esempio, diamo un'occhiata all'opcode [`ADD`](https://www.evm.codes/#01).

| Valore | Mnemonico | δ | α | Descrizione                                                                                                                                                                                                           |
| -----: | --------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   0x01 | ADD       | 2 | 1 | Operazione di addizione.                                                                                                                                                                              |
|        |           |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ è il numero di valori che estraiamo dallo stack. In questo caso due, perché stiamo sommando i primi due valori.

_α_ è il numero di valori che reinseriamo. In questo caso uno, la somma.

Quindi il nuovo elemento in cima allo stack (_μ′<sub>s</sub>[0]_) è la somma del vecchio elemento in cima allo stack (_μ<sub>s</sub>[0]_) e del vecchio valore sottostante (_μ<sub>s</sub>[1]_).

Invece di passare in rassegna tutti gli opcode con una lista noiosa, questo articolo spiega solo gli opcode che introducono qualcosa di nuovo.

| Valore | Mnemonico | δ | α | Descrizione                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| -----: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   0x20 | KECCAK256 | 2 | 1 | Calcola l'hash Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                           |
|        |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|        |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Questo è il primo opcode che accede alla memoria (in questo caso, in sola lettura). Tuttavia, potrebbe espandersi oltre i limiti correnti della memoria, quindi dobbiamo aggiornare _μ<sub>i</sub>._ Lo facciamo usando la funzione _M_ definita nell'equazione 328 a pag. 29.

| Valore | Mnemonico | δ | α | Descrizione                                         |
| -----: | --------- | - | - | --------------------------------------------------- |
|   0x31 | BALANCE   | 1 | 1 | Ottieni il saldo del conto dato.    |
|        |           |   |   | ... |

L'indirizzo di cui dobbiamo trovare il saldo è _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. La cima dello stack è l'indirizzo, ma poiché gli indirizzi sono solo di 160 bit, calcoliamo il valore [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, significa che ci sono informazioni su questo indirizzo. In tal caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ è il saldo per quell'indirizzo. Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, significa che questo indirizzo non è inizializzato e il saldo è zero. Puoi vedere l'elenco dei campi di informazione del conto nella sezione 4.1 a pag. 4.

La seconda equazione, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, è correlata alla differenza di costo tra l'accesso all'archiviazione calda (archiviazione a cui si è avuto accesso di recente e che probabilmente è memorizzata nella cache) e l'archiviazione fredda (archiviazione a cui non si è avuto accesso e che probabilmente si trova in un'archiviazione più lenta e più costosa da recuperare). _A<sub>a</sub>_ è l'elenco degli indirizzi a cui si è avuto accesso in precedenza dalla transazione, che dovrebbero quindi essere più economici da accedere, come definito nella sezione 6.1 a pag. 8. Puoi leggere di più su questo argomento in [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valore | Mnemonico | δ  | α  | Descrizione                                                                                                                                     |
| -----: | --------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|   0x8F | DUP16     | 16 | 17 | Duplica il 16° elemento dello stack.                                                                                            |
|        |           |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Nota che per usare un qualsiasi elemento dello stack, dobbiamo estrarlo, il che significa che dobbiamo estrarre anche tutti gli elementi dello stack sopra di esso. Nel caso di [`DUP<n>`](https://www.evm.codes/#8f) e [`SWAP<n>`](https://www.evm.codes/#9f), questo significa dover estrarre e poi inserire fino a sedici valori.

## 9.5 Il ciclo di esecuzione {#95-exec-cycle}

Ora che abbiamo tutte le parti, possiamo finalmente capire come è documentato il ciclo di esecuzione dell'EVM.

L'equazione (155) afferma che, dato lo stato:

- _σ_ (stato globale della blockchain)
- _μ_ (stato dell'EVM)
- _A_ (sottostato, modifiche da apportare al termine della transazione)
- _I_ (ambiente di esecuzione)

Il nuovo stato è _(σ', μ', A', I')_.

Le equazioni (156)-(158) definiscono lo stack e la sua variazione dovuta a un opcode (_μ<sub>s</sub>_). L'equazione (159) è la variazione del gas (_μ<sub>g</sub>_). L'equazione (160) è la variazione del contatore di programma (_μ<sub>pc</sub>_). Infine, le equazioni (161)-(164) specificano che gli altri parametri rimangono gli stessi, a meno che non siano esplicitamente modificati dall'opcode.

Con questo, l'EVM è completamente definita.

## Conclusione {#conclusion}

La notazione matematica è precisa e ha permesso allo Yellow Paper di specificare ogni dettaglio di Ethereum. Tuttavia, presenta alcuni svantaggi:

- Può essere compreso solo dagli esseri umani, il che significa che i [test di conformità](https://github.com/ethereum/tests) devono essere scritti manualmente.
- I programmatori capiscono il codice informatico.
  Possono capire o meno la notazione matematica.

Forse per queste ragioni, le più recenti [specifiche del livello di consenso](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) sono scritte in Python. Ci sono [specifiche del livello di esecuzione in Python](https://ethereum.github.io/execution-specs), ma non sono complete. Fino a quando e a meno che l'intero Yellow Paper non venga tradotto anche in Python o in un linguaggio simile, lo Yellow Paper continuerà a essere in servizio, ed è utile saperlo leggere.
