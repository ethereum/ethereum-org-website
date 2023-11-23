---
title: Comprendere le specifiche EVM dello Yellow Paper
description: Comprendere la parte dello Yellow Paper che spiega la macchina virtuale di Ethereum (EVM), ovvero le specifiche formali di Ethereum.
author: "qbzzt"
tags:
  - "evm"
skill: intermediate
lang: it
published: 2022-05-15
---

Lo [Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) è la specifica formale di Ethereum. Tranne che per le modifiche apportate dal [processo EIP](/eips/), contiene la descrizione esatta di come funziona il tutto. È scritto come un documento matematico, che include una terminologia con cui i programmatori potrebbero non avere familiarità. In questo documento si impara a leggerlo e, per estensione, a leggere altri documenti matematici correlati.

## Quale Yellow Paper? {#which-yellow-paper}

Come quasi tutto in Ethereum, lo Yellow Paper evolve nel tempo. Per poter fare riferimento a una versione specifica, ho caricato [la versione corrente al momento della redazione](yellow-paper-berlin.pdf). I numeri di sezione, pagina ed equazione che utilizzerò si riferiranno a quella versione. Sarebbe buona norma aprirla in un'altra finestra durante la lettura di questo documento.

### Perché la EVM? {#why-the-evm}

Lo Yellow Paper originale è stato scritto subito all'inizio dello sviluppo di Ethereum. Descrive il meccanismo di consenso basato sul proof-of-work originariamente utilizzato per proteggere la rete. Tuttavia, Ethereum ha abbandonato il proof-of-work e ha iniziato a utilizzare il consenso basato sul proof-of-stake nel settembre 2022. Questo tutorial si concentra sulle parti dello Yellow Paper che definiscono la macchina virtuale di Ethereum. La EVM è rimasta invariata con il passaggio al proof-of-stake (ad eccezione del valore di restituzione dell’opcode DIFFICULTY).

## 9 Modello di esecuzione {#9-execution-model}

Questa sezione (pagg. 12-14) comprende la maggior parte della definizione della EVM.

Il termine _stato del sistema_ comprende tutto ciò che è necessario sapere sul sistema per farlo funzionare. In un tipico computer, ciò significa la memoria, il contenuto dei registri, ecc.

Una [macchina di Turing](https://en.wikipedia.org/wiki/Turing_machine) è un modello computazionale. In sostanza, si tratta di una versione semplificata di un computer, che ha dimostrato di avere la stessa capacità di eseguire calcoli di un normale computer (una macchina di Turing può calcolare tutto ciò che può calcolare un computer e viceversa). Questo modello facilita la dimostrazione di vari teoremi su cosa è e cosa non è computabile.

Il termine

Turing equivalente indica un computer che può eseguire gli stessi calcoli di una macchina di Turing. Le macchine di Turing possono entrare in loop infiniti, mentre l'EVM non può farlo perché finirebbe il carburante, quindi è solo quasi Turing equivalente.

## 9.1 Nozioni di base {#91-basics}

Questa sezione fornisce le nozioni di base della EVM e come si compara ad altri modelli computazionali.

Una [macchina a stack](https://en.wikipedia.org/wiki/Stack_machine) è un computer che memorizza i dati intermedi non in registri, ma in una [**stack**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Questa è l'architettura preferibile per le macchine virtuali perché è facile da implementare, il che significa che i bug e le vulnerabilità di sicurezza sono molto meno probabili. La memoria dello stack è divisa in parole da 256 bit. Questa scelta è stata fatta perché è utile per le operazioni crittografiche fondamentali di Ethereum, come l'hashing Keccak-256 e i calcoli a curva ellittica. La dimensione massima dello stack è di 1024 byte. Quando gli opcode vengono eseguiti, di solito ottengono i loro parametri dallo stack. Esistono opcode specifici per riorganizzare gli elementi dello stack, come `POP` (rimuove l'elemento dalla cima dello stack), `DUP_N` (duplica l'elemento N dello stack), ecc.

L'EVM dispone anche di uno spazio volatile chiamato **memoria** che viene utilizzato per memorizzare i dati durante l'esecuzione. Questa memoria è organizzata in parole da 32 byte. Tutte le posizioni di memoria sono inizializzate a zero. Se si esegue questo codice [Yul](https://docs.soliditylang.org/en/latest/yul.html) per aggiungere una parola alla memoria, esso riempirà 32 byte di memoria riempiendo lo spazio vuoto della parola con degli zeri, ossia creando una parola con degli zeri nelle posizioni 0-29, 0x60-30 e 0xA7-31.

```yul
mstore(0, 0x60A7)
```

`mstore` è uno dei tre opcode che la EVM mette a disposizione per interagire con la memoria: carica una parola in memoria. Gli altri due sono `mstore8` che carica un singolo byte in memoria e `mload` che sposta una parola dalla memoria allo stack.

La EVM ha anche un modello separato di <strong>archiviazione</strong> non volatile che viene mantenuta come parte dello stato del sistema; questa memoria è organizzata in un array di parole (al contrario degli array di byte con indirizzamento a parola nello stack). Questa archiviazione è il luogo in cui i contratti conservano i dati permanenti. Un contratto può interagire solo con la propria archiviazione. L’archiviazione è organizzata in mappature chiave-valore.

Sebbene non sia menzionato in questa sezione dello Yellow Paper, è utile sapere che esiste un quarto tipo di memoria. **Calldata** è una memoria di sola lettura con indirizzamento a byte utilizzata per memorizzare il valore trasmesso con il parametro `data` di una transazione. L'EVM dispone di opcode specifici per la gestione di `calldata`. `calldatasize` restituisce la dimensione dei dati. `calldataload` carica i dati nello stack. `calldatacopy` copia i dati in memoria.

L'[architettura Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) standard memorizza codice e dati nella stessa memoria. L'EVM non segue questo standard per motivi di sicurezza: la condivisione della memoria volatile rende possibile la modifica del codice del programma. Il codice viene invece salvato nell’archiviazione.

Esistono solo due casi in cui il codice viene eseguito dalla memoria:

- Quando un contratto crea un altro contratto (usando [`CREATE`](https://www.evm.codes/#f0) o [`CREATE2`](https://www.evm.codes/#f5)), il codice per il costruttore del contratto viene dalla memoria.
- Durante la creazione di _qualsiasi_ contratto, il codice del costruttore viene eseguito e poi restituisce il codice del contratto vero e proprio, anch'esso dalla memoria.

Con il termine esecuzione eccezionale si intende un'eccezione che causa l'interruzione dell'esecuzione del contratto attivo.

## 9.2 Panoramica delle commissioni {#92-fees-overview}

Questa sezione spiega come vengono calcolate le commissioni del carburante. I costi sono tre:

### Costo dell’opcode {#opcode-cost}

Il costo intrinseco dello specifico opcode. Per ottenere questo valore, trova il gruppo di costo dell’opcode nell'Appendice H (pag. 28, sotto l'equazione (327)) e trova il gruppo di costo nell'equazione (324). Si ottiene così una funzione di costo, che nella maggior parte dei casi utilizza i parametri dell'Appendice G (pag. 27).

Ad esempio, l'opcode [`CALLDATACOPY`](https://www.evm.codes/#37) fa parte del gruppo _W<sub>copy</sub>_. Il costo dell'opcode per questo gruppo è _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Guardando l'Appendice G, vediamo che entrambe le costanti sono 3, il che ci dà _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Dobbiamo ancora decifrare l'espressione _⌈μ<sub>s</sub>[2]÷32⌉_. La parte più esterna, _⌈ \<valore\> ⌉_ è la funzione ceiling: una funzione che, dato un valore, restituisce il più piccolo numero intero che non è ancora minore del valore stesso. Ad esempio, _⌈2,5⌉ = ⌈3⌉ = 3_. La parte interna è _μ<sub>s</sub>[2]÷32_. Guardando la sezione 3 (Convenzioni) a pag. 3, _μ_ è lo stato della macchina. Lo stato della macchina è definito nella sezione 9.4.1 a pag. 13. Secondo questa sezione, uno dei parametri di stato della macchina è _s_ per lo stack. Mettendo tutto insieme, sembra che _μ<sub>s</sub>[2]_ sia la posizione #2 dello stack. Guardando [l'opcode](https://www.evm.codes/#37), la posizione #2 dello stack è la dimensione dei dati in byte. Osservando gli altri opcode del gruppo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) e [`RETURNDATACOPY`](https://www.evm.codes/#3e), anch'essi hanno una dimensione di dati nella stessa posizione. Quindi _⌈μ<sub>s</sub>[2]÷32⌉_ è il numero di parole da 32 byte necessarie per memorizzare i dati copiati. Mettendo tutto insieme, il costo intrinseco di [`CALLDATACOPY`](https://www.evm.codes/#37) è di 3 unità di carburante più 3 per ogni parola di dati copiata.

### Costi di esecuzione {#running-cost}

Il costo dell'esecuzione del codice che stiamo chiamando.

- Nel caso di [`CREATE`](https://www.evm.codes/#f0) e [`CREATE2`](https://www.evm.codes/#f5), il costruttore del nuovo contratto.
- Nel caso di [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) o [`DELEGATECALL`](https://www.evm.codes/#f4), il contratto che viene chiamato.

### Costo di espansione della memoria {#expanding-memory-cost}

Il costo per espandere la memoria (se necessario).

Nell'equazione 324, questo valore è scritto come _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Se guardiamo di nuovo la sezione 9.4.1, vediamo che _μ<sub>i</sub>_ è il numero di parole in memoria. Quindi _μ<sub>i</sub>_ è il numero di parole in memoria prima dell'opcode e _μ<sub>i</sub>'_ è il numero di parole in memoria dopo l'opcode.

La funzione _C<sub>mem</sub>_ è definita nell'equazione 326: _C<sub>mem</sub>(a) = G<sub>memoria</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ è la funzione floor; una funzione che, dato un valore, restituisce il più grande numero intero che non è ancora maggiore del valore stesso. Ad esempio, _⌊2,5⌋ = ⌊2⌋ = 2,_ Quando _a < √512_, _a<sup>2</sup> < 512_, il risultato della funzione floor è zero. Quindi, per le prime 22 parole (704 byte) il costo aumenta linearmente con il numero di parole di memoria richieste. Oltre quel punto _⌊a<sup>2</sup> ÷ 512⌋_ è positivo. Quando la memoria richiesta è sufficientemente alta, il costo del carburante è proporzionale al quadrato della quantità di memoria.

**Si noti** che questi fattori influenzano solo il costo _intrinseco_ del carburante - non tengono conto del mercato delle commissioni o delle mance ai validatori che determinano quanto un utente finale è tenuto a pagare - questo è solo il costo grezzo dell'esecuzione di una specifica operazione sulla EVM.

[Maggiori informazioni sul carburante](/developers/docs/gas/).

## 9.3 Ambiente di esecuzione {#93-execution-env}

L'ambiente di esecuzione è una tupla, _I_, che include informazioni che non fanno parte dello stato della blockchain o della EVM.

| Parametro       | Opcode per accedere ai dati                                                                                              | Codice Solidity per accedere ai dati     |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                   | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                    | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                  | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), ecc.                                                                        | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                    | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                 | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                  | `address(this).code`                     |
| _I<sub>H</sub>_ | Campi di intestazione del blocco, come [`NUMBER`](https://www.evm.codes/#43) e [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, ecc. |
| _I<sub>e</sub>_ | Profondità dello stack di chiamate per le chiamate tra contratti (compresa la creazione del contratto)                   |                                          |
| _I<sub>w</sub>_ | La EVM può cambiare stato o funziona in modo statico?                                                                    |                                          |

Per comprendere il resto della sezione 9 sono necessari alcuni altri parametri:

| Parametro | Definito nella sezione  | Significato                                                                                                                                                                                                                                   |
| --------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (pag. 2, equazione 1) | Lo stato della blockchain                                                                                                                                                                                                                     |
| _g_       | 9.3 (pag. 13)           | Carburante rimanente                                                                                                                                                                                                                          |
| _A_       | 6.1 (pag. 8)            | Sottostato accumulato (modifiche previste per la fine della transazione)                                                                                                                                                                      |
| _o_       | 9.3 (pag. 13)           | Output: il risultato restituito in caso di transazione interna (quando un contratto ne invoca un altro) e di chiamate a funzioni di visualizzazione (quando si chiedono solo informazioni, quindi non è necessario attendere una transazione) |

## 9.4 Panoramica dell'esecuzione {#94-execution-overview}

Ora che possediamo tutte le conoscenze preliminari, possiamo finalmente iniziare a lavorare sul funzionamento della EVM.

Le equazioni 137-142 ci forniscono le condizioni iniziali per l'esecuzione della EVM:

| Symbol           | Valore iniziale | Significato                                                                                                                                                                                                                                                           |
| ---------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_             | Carburante rimanente                                                                                                                                                                                                                                                  |
| _μ<sub>pc</sub>_ | _0_             | Contatore del programma, l'indirizzo della prossima istruzione da eseguire                                                                                                                                                                                            |
| _μ<sub>m</sub>_  | _(0, 0, ...)_   | Memoria, inizializzata a tutti zero                                                                                                                                                                                                                                   |
| _μ<sub>i</sub>_  | _0_             | Posizione di memoria più alta utilizzata                                                                                                                                                                                                                              |
| _μ<sub>s</sub>_  | _()_            | Lo stack, inizialmente vuoto                                                                                                                                                                                                                                          |
| _μ<sub>o</sub>_  | _∅_             | L'output, un insieme vuoto fino a quando e a meno che ci si fermi, con i dati restituiti ([`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)) o senza ([`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

L'equazione 143 ci dice che ci sono quattro possibili condizioni in ogni momento dell'esecuzione e cosa fare con esse:

1.  `Z(σ,μ,A,I)`. Z rappresenta una funzione che verifica se un'operazione crea una transizione di stato non valida (vedere [arresto eccezionale](#942-exceptional-halting)). Se la valutazione è True, il nuovo stato è identico al vecchio (tranne per il carburante che viene bruciato), perché le modifiche non sono state implementate.
2.  Se l'opcode eseguito è [`REVERT`](https://www.evm.codes/#fd), il nuovo stato è uguale a quello vecchio, ma si perde un po' di carburante.
3.  Se la sequenza di operazioni è terminata, come indicato da un [`RETURN`](https://www.evm.codes/#f3)), lo stato viene aggiornato al nuovo stato.
4.  Se non ci troviamo in una delle condizioni di interruzione 1-3, continua a eseguire il codice.

## 9.4.1 Stato della macchina {#941-machine-state}

Questa sezione spiega in modo più dettagliato lo stato della macchina. Specifica che _w_ è l'opcode attuale. Se _μ<sub>pc</sub>_ è inferiore a _||I<sub>b</sub>||_, la lunghezza del codice, allora quel byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) è l'opcode. Altrimenti, l'opcode è definito come [`STOP`](https://www.evm.codes/#00).

Poiché si tratta di una [macchina a stack](https://en.wikipedia.org/wiki/Stack_machine), dobbiamo tenere traccia del numero di elementi estratti (_δ_) e introdotti (_α_) da ciascun opcode.

## 9.4.2 Arresto eccezionale {#942-exceptional-halt}

Questa sezione definisce la funzione _Z_, che specifica quando si ha un'interruzione anomala. Si tratta di una funzione [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), quindi utilizza [_∨_ per un OR logico](https://en.wikipedia.org/wiki/Logical_disjunction) e [_∧_ per un AND logico](https://en.wikipedia.org/wiki/Logical_conjunction).

Abbiamo un arresto eccezionale se una di queste condizioni è True:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_** Come abbiamo visto nella sezione 9.2, _C_ è la funzione che specifica il costo del carburante. Non è rimasto abbastanza carburante per coprire il prossimo opcode.

- **_δ<sub>w</sub>=∅_** Se il numero di elementi estratti per un opcode è indefinito, l'opcode stesso è indefinito.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_** Sottoeccedenze dello stack, non ci sono abbastanza elementi nello stack per l'opcode corrente.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_** L'opcode è [`JUMP`](https://www.evm.codes/#56) e l'indirizzo non è un [`JUMPDEST`](https://www.evm.codes/#5b). I salti sono validi _solo_ quando la destinazione è un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_** L'opcode è [`JUMPI`](https://www.evm.codes/#57), la condizione è True (non zero), quindi il salto dovrebbe avvenire, e l'indirizzo non è un [`JUMPDEST`](https://www.evm.codes/#5b). I salti sono validi _solo_ quando la destinazione è un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_** L'opcode è [`RETURNDATACOPY`](https://www.evm.codes/#3e). In questo opcode l'elemento dello stack _μ<sub>s</sub>[1]_ è l'offset da cui leggere il buffer dei dati restituiti e l'elemento dello stack _μ<sub>s</sub>[2]_ è la lunghezza dei dati. Questa condizione si verifica quando si cerca di leggere oltre la fine del buffer dei dati restituiti. Si noti che non esiste una condizione simile per il calldata o per il codice stesso. Quando si cerca di leggere oltre la fine di quei buffer, si ottengono solo degli zeri.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Sottoeccedenza dello stack. Se l'esecuzione dell'opcode comporta uno stack di oltre 1024 elementi, interrompere l'operazione.

- **_¬I<sub>w</sub> ∧ W(w,μ)_** Stiamo eseguendo staticamente ([¬ è la negazione](https://en.wikipedia.org/wiki/Negation) e _I<sub>w</sub>_ è True quando ci è permesso di cambiare lo stato della blockchain)? Se è così, e stiamo tentando un'operazione di cambio di stato, essa non può verificarsi.

  La funzione _W(w,μ)_ è definita successivamente nell'equazione 150. _W(w,μ)_ è True se una di queste condizioni è True:

  - **_w ∈ {CREATE, CREATE2, SSTORE, SELFDESTRUCT}_** Questi opcode modificano lo stato, creando un nuovo contratto, memorizzando un valore o distruggendo il contratto attuale.

  - **_LOG0≤w ∧ w≤LOG4_** Se siamo chiamati staticamente, non possiamo emettere voci di registro. Gli opcode del registro sono tutti compresi nell'intervallo tra [`LOG0` (A0)](https://www.evm.codes/#a0) e [`LOG4` (A4)](https://www.evm.codes/#a4). Il numero dopo l'opcode del registro specifica quanti argomenti contiene la voce del registro.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_** È possibile chiamare un altro contratto quando si è statici, ma in tal caso non è possibile trasferirvi ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_** Non è possibile eseguire [`SSTORE`](https://www.evm.codes/#55) se non si ha più di G<sub>callstipend</sub> (definito come 2300 nell'Appendice G) carburante.

## 9.4.3 Validità della destinazione del salto {#943-jump-dest-valid}

Qui definiamo formalmente cosa sono gli opcode [`JUMPDEST`](https://www.evm.codes/#5b). Non possiamo limitarci a cercare il valore del byte 0x5B, perché potrebbe trovarsi all'interno di un PUSH (e quindi di dati e non di un opcode).

Nell'equazione (153) definiamo una funzione, _N(i,w)_. Il primo parametro, _i_, è la posizione dell'opcode. Il secondo, _w_, è l'opcode stesso. Se _w∈[PUSH1, PUSH32]_ significa che l'opcode è un PUSH (le parentesi quadre definiscono un intervallo che include gli endpoint). In questo caso l'opcode successivo si trova a _i+2+(w-PUSH1)_. Per [`PUSH1`](https://www.evm.codes/#60) dobbiamo avanzare di due byte (il PUSH stesso e il valore di un byte), per [`PUSH2`](https://www.evm.codes/#61) dobbiamo avanzare di tre byte perché è un valore da due byte, ecc. Tutti gli altri opcode dell'EVM sono lunghi un solo byte, quindi in tutti gli altri casi _N(i,w)=i+1_.

Questa funzione viene utilizzata nell'equazione (152) per definire _D<sub>J</sub>(c,i)_, che è l'[insieme](<https://en.wikipedia.org/wiki/Set_(mathematics)>) di tutte le destinazioni di salto valide nel codice _c_, a partire dalla posizione dell'opcode _i_. Questa funzione è definita in modo ricorsivo. Se _i≥|c|_, significa che siamo alla fine del codice oppure oltre. Non troveremo altre destinazioni di salto, quindi verrà restituito semplicemente l'insieme vuoto.

In tutti gli altri casi si guarda al resto del codice andando all'opcode successivo e ottenendo l'insieme a partire da esso. _c[i]_ è l'opcode corrente, quindi _N(i,c[i])_ è la posizione del prossimo opcode. _D<sub>J</sub>(c,N(i,c[i]))_ è quindi l'insieme delle destinazioni di salto valide che inizia dall'opcode successivo. Se l'opcode corrente non è un `JUMPDEST`, restituisce semplicemente l'insieme. Se è `JUMPDEST`, viene incluso nell'insieme dei risultati e restituito.

## 9.4.4 Arresto normale {#944-normal-halt}

La funzione di arresto _H_ può restituire tre tipi di valori.

- Se non siamo in un opcode di arresto, restituisce _∅_, l'insieme vuoto. Per convenzione, questo valore viene interpretato come un False booleano.
- Se abbiamo un opcode di arresto che non produce un output (o [`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)), restituisce una sequenza di byte di dimensione zero come valore restituito. Si noti che questo è molto diverso dall'insieme vuoto. Questo valore significa che l'EVM si è davvero arrestata, ma non ci sono dati restituiti da leggere.
- Se abbiamo un opcode di arresto che produce un output (o [`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)), restituisce la sequenza di byte specificata da quell'opcode. Questa sequenza viene presa dalla memoria, il valore in cima allo stack(_μ<sub>s</sub>[0]_) è il primo byte e il valore successivo (_μ<sub>s</sub>[1]_) è la lunghezza.

## H.2 Insieme di istruzioni {#h2-instruction-set}

Prima di passare alla sottosezione finale della EVM, la 9.5, esaminiamo le istruzioni stesse. Sono definite nell'Appendice H.2 che inizia a pag. 29. Tutto ciò che non è specificato come variabile con quello specifico opcode deve rimanere inalterato. Le variabili che cambiano sono specificate con \<something\>′.

Ad esempio, esaminiamo l'opcode [`ADD`](https://www.evm.codes/#01).

| Valore | Mnemonica | δ   | α   | Descrizione                                               |
| -----: | --------- | --- | --- | --------------------------------------------------------- |
|   0x01 | ADD       | 2   | 1   | Operazione di addizione.                                  |
|        |           |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ è il numero di valori che estraiamo dallo stack. In questo caso due, perché stiamo sommando i primi due valori.

_α_ è il numero di valori che reinseriamo. In questo caso uno, la somma.

Quindi la nuova cima dello stack (_μ′<sub>s</sub>[0]_) è la somma della vecchia cima dello stack (_μ<sub>s</sub>[0]_) e del vecchio valore sottostante a quest'ultima (_μ<sub>s</sub>[1]_).

Invece di passare in rassegna tutti gli opcode con una "noiosissima lista", questo articolo spiega solo gli opcode che introducono qualcosa di nuovo.

| Valore | Mnemonica | δ   | α   | Descrizione                                                                                                |
| -----: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|   0x20 | KECCAK256 | 2   | 1   | Calcola l'hash Keccak-256.                                                                                 |
|        |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|        |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Questo è il primo opcode che accede alla memoria (in questo caso, di sola lettura). Tuttavia, potrebbe espandersi oltre i limiti attuali della memoria, quindi è necessario aggiornare _μ<sub>i</sub>._ Per farlo, si utilizza la funzione _M_ definita nell'equazione 328 a pag. 29.

| Valore | Mnemonica | δ   | α   | Descrizione                          |
| -----: | --------- | --- | --- | ------------------------------------ |
|   0x31 | BALANCE   | 1   | 1   | Ottiene il saldo del conto indicato. |
|        |           |     |     | ...                                  |

L'indirizzo di cui dobbiamo trovare il saldo è _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. La parte superiore dello stack è l'indirizzo, ma poiché gli indirizzi sono solo 160 bit, calcoliamo il valore [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, significa che esistono informazioni su questo indirizzo. In questo caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ è il saldo per quell'indirizzo. Se _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, significa che questo indirizzo non è inizializzato e il saldo è zero. L'elenco dei campi informativi del conto è riportato nella sezione 4.1 a pag. 4.

La seconda equazione, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ {μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, è relativa alla differenza di costo tra l'accesso all'archiviazione calda (archiviazione a cui si è acceduto di recente e che probabilmente è memorizzata nella cache) e all'archiviazione fredda (archiviazione a cui non si è acceduto e che probabilmente si trova in un'archiviazione più lenta e più costosa da recuperare). _A<sub>a</sub>_ è l'elenco degli indirizzi precedentemente consultati dalla transazione, che quindi dovrebbero essere meno costosi da raggiungere, come definito nella sezione 6.1 a pag. 8. Per ulteriori informazioni su questo argomento, puoi consultare [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valore | Mnemonica | δ   | α   | Descrizione                             |
| -----: | --------- | --- | --- | --------------------------------------- |
|   0x8F | DUP16     | 16  | 17  | Duplica il 16° elemento dello stack.    |
|        |           |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Si noti che per utilizzare un elemento dello stack è necessario estrarlo, il che significa che è necessario estrarre anche tutti gli elementi dello stack che si trovano sopra di esso. Nel caso di [`DUP<n>`](https://www.evm.codes/#8f) e [`SWAP<n>`](https://www.evm.codes/#9f), ciò significa dover estrarre e poi reinserire fino a sedici valori.

## 9.5 Il ciclo di esecuzione {#95-exec-cycle}

Ora che abbiamo tutte le parti, possiamo finalmente capire come viene documentato il ciclo di esecuzione della EVM.

L'equazione (155) dice che dato lo stato:

- _σ_ (stato globale della blockchain)
- _μ_ (stato della EVM)
- _A_ (sottostato, modifiche da apportare al termine della transazione)
- _I_ (ambiente di esecuzione)

Il nuovo stato è _(σ', μ', A', I')_.

Le equazioni (156)-(158) definiscono lo stack e la sua variazione dovuta a un opcode (_μ<sub>s</sub>_). L'equazione (159) è la variazione di carburante (_μ<sub>g</sub>_). L'equazione (160) rappresenta la variazione del contatore del programma (_μ<sub>pc</sub>_). Infine, le equazioni (161)-(164) specificano che gli altri parametri rimangono invariati, a meno che non vengano modificati esplicitamente dall'opcode.

Con ciò la EVM è completamente definita.

## Conclusioni {#conclusion}

La notazione matematica è precisa e ha permesso allo Yellow Paper di specificare ogni dettaglio di Ethereum. Tuttavia, presenta alcuni svantaggi:

- Può essere compreso solo dagli esseri umani, il che significa che i [test di conformità](https://github.com/ethereum/tests) devono essere scritti manualmente.
- I programmatori capiscono il codice informatico. Non è detto che comprendano la notazione matematica.

Forse per queste ragioni, le più recenti [specifiche del livello di consenso](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) sono scritte in Python. Esistono [specifiche del livello di esecuzione in Python](https://ethereum.github.io/execution-specs), ma non sono complete. Fino a quando e a meno che l'intero Yellow Paper non venga tradotto anche in Python o in un linguaggio simile, lo Yellow Paper continuerà ad essere utilizzato ed è utile saperlo leggere.
