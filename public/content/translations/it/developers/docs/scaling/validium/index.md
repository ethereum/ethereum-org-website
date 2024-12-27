---
title: Validium
description: Un'introduzione a Validium come soluzione di scalabilità, attualmente utilizzata dalla comunità Ethereum.
lang: it
sidebarDepth: 3
---

Validium è una [soluzione di ridimensionamento](/developers/docs/scaling/) che impongono l'integrità delle transazioni usando prove di validità come i [rollup ZK](/developers/docs/scaling/zk-rollups/), ma non memorizza i dati della transazione sulla Rete principale di Ethereum. Sebbene la disponibilità di dati off-chain introduca dei compromessi, può tradursi in enormi miglioramenti della scalabilità (i validium possono elaborare [circa 9.000 transazioni o più, al secondo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso la nostra pagina sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e il [livello 2](/layer-2).

## Cos'è un validium? {#what-is-validium}

I validium sono soluzioni di ridimensionamento che usano la disponibilità di dati off-chain e il calcolo progettato per migliorare il volume elaborando le transazioni al di fuori della Rete principale di Ethereum. Come i rollup a conoscenza zero (rollup ZK), i validium pubblicano delle [prove a conoscenza zero](/glossary/#zk-proof) per verificare le transazioni off-chain su Ethereum. Questo impedisce transizioni di stato non valide e migliora le garanzie di sicurezza di una catena validium.

Queste "prove di validità" possono essere sotto forma di ZK-SNARK (argomenti di conoscenza succinti non interattivi a conoscenza zero) o ZK-STARK (argomenti di conoscenza trasparenti e scalabili a conoscenza zero). Maggiori informazioni sulle [prove a conoscenza zero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

I fondi appartenenti agli utenti di validium sono controllati da un contratto intelligente su Ethereum. I validium offrono prelievi quasi istantanei, analogamente ai rollup ZK; una volta che la prova di validità per una richiesta di prelievo è stata verificata sulla Rete principale, gli utenti possono prelevare i fondi fornendo delle [prove di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La prova di Merkle convalida l'inclusione della transazione di prelievo dell'utente in un batch di transazioni verificate, consentendo al contratto on-chain di elaborare il prelievo.

Tuttavia, gli utenti di validium possono vedersi congelati i fondi e limitati i prelievi. Questo può verificarsi se i gestori della disponibilità dei dati sulla catena validium trattengono i dati di stato off-chain dagli utenti. Senza accesso ai dati della transazione, gli utenti non possono calcolare la prova di Merkle richiesta per dimostrare la proprietà dei fondi ed eseguire i prelievi.

Questa è la differenza principale tra i validium e i rollup ZK: le loro posizioni sullo spettro della disponibilità dei dati. Le due soluzioni affrontano l'archiviazione dei dati in modo diverso, il che ha implicazioni per la sicurezza e la mancanza di fiducia.

## Come interagiscono i validium con Ethereum? {#how-do-validiums-interact-with-ethereum}

I validium sono protocolli di ridimensionamento basati sulla catena di Ethereum esistente. Sebbene esegua le transazioni al di fuori della catena, una catena di Validium è amministrata da un insieme di contratti intelligenti distribuiti sulla Rete Principale, tra cui:

1. **Contratto di verifica**: il contratto di verifica, verifica la validità delle prove inviate dall'operatore di validium creando aggiornamenti di stato. Questo include le prove di validità che attestano la correttezza delle transazioni off-chain e le prove di disponibilità dei dati che verificano l'esistenza dei dati della transazione off-chain.

2. **Contratto principale**: il contratto principale memorizza gli impegni di stato (radici di Merkle) inviati dai produttori di blocchi e aggiorna lo stato del validium una volta verificata la prova di validità sulla catena. Questo contratto elabora inoltre i depositi alla e i prelievi dalla catena validium.

I validium si affidano anche alla catena principale di Ethereum per quanto segue:

### Accordo {#settlement}

Le transazioni eseguite su un validium non possono essere completamente confermate finché la catena genitore ne verifica la validità. Tutte le attività svolte su un validium devono essere infine regolate sulla Rete principale. La blockchain di Ethereum fornisce anche "garanzie di accordo" per gli utenti di validium, a significare che le transazioni off-chain non sono annullabili o alterabili una volta che se ne è assunto l'impegno sulla catena.

### Sicurezza {#security}

Ethereum, agendo da livello d'accordo, garantisce anche la validità delle transizioni di stato su validium. Le transazioni esterne alla catena eseguite sulla catena di Validium sono verificate tramite un contratto intelligente sul livello di base di Ethereum.

Se il contratto di verifica on-chain ritiene che la prova non sia valida, le transazioni sono rifiutate. Questo significa che gli operatori devono soddisfare le condizioni di validità imposte dal protocollo Ethereum prima di aggiornare lo stato del validium.

## Come funziona un validium? {#how-does-validium-work}

### Transazioni {#transactions}

Gli utenti inviano le transazioni all'operatore, un nodo responsabile di eseguire le transazioni sulla catena validium. Alcuni validium potrebbero usare un unico operatore per eseguire la catena o affidarsi a un meccanismo di [proof-of-stake (PoS)](/developers/docs/consensus-mechanisms/pos/) per la rotazione degli operatori.

L'operatore aggrega le transazioni in un batch e lo invia a un circuito di prova. Il circuito di prova accetta il batch di transazioni (e altri dati pertinenti) come input e restituisce una prova di validità che verifica che le operazioni siano state eseguite correttamente.

### Impegni di stato {#state-commitments}

Lo stato del validium è associato a un hash come un albero di Merkle, con la radice memorizzata nel contratto principale su Ethereum. La radice di Merkle, anche nota come radice di stato, agisce da impegno crittografico allo stato corrente dei conti e saldi sul Validium.

Per eseguire un aggiornamento di stato, l'operatore deve calcolare una nuova radice di stato (dopo aver eseguito le transazioni) e inviarla al contratto on-chain. Se la prova di validità corrisponde, lo stato proposto viene accettato e il validium passa alla nuova radice di stato.

### Depositi e prelievi {#deposits-and-withdrawals}

Gli utenti spostano i fondi da Ethereum a un validium depositando ETH (o qualsiasi token compatibile con ERC) nel contratto on-chain. Il contratto trasmette l'evento di deposito al validium al di fuori della catena, dove sull'indirizzo dell'utente viene accreditato un importo equivalente al suo deposito. L'operatore include inoltre questa transazione di deposito in un nuovo batch.

Per spostare nuovamente i fondi nella Rete principale, l'utente di un validium avvia una transazione di prelievo e la invia all'operatore, che convalida la richiesta di prelievo e la include in un batch. Le risorse dell'utente sulla catena validium sono inoltre distrutte prima che possano uscire dal sistema. Una volta che la prova di validità associata al batch è verificata, l'utente può richiamare il contratto principale per prelevare ciò che rimane del suo deposito iniziale.

Come meccanismo anti-censura, il protocollo validium consente agli utenti di prelevare direttamente dal contratto di validium senza passare per l'operatore. In questo caso, gli utenti devono fornire una prova di Merkle al contratto di verifica, mostrando l'inclusione di un conto nella radice di stato. Se la prova è accettata, l'utente può richiamare la funzione di prelievo del contratto principale per far uscire i suoi fondi dal validium.

### Invio del batch {#batch-submission}

Dopo aver eseguito un lotto di transazioni, l'operatore invia la prova di validità associata al contratto verificatore e propone una nuova radice di stato al contratto principale. Se la prova è valida, il contratto principale aggiorna lo stato del validium e finalizza i risultati delle transazioni nel batch.

A differenza di un rollup ZK, i produttori di blocchi su un validium non devono pubblicare i dati della transazione per i batch di transazioni (solo le intestazioni dei blocchi). Questo rende validium un protocollo di ridimensionamento puramente off-chain, a differenza dei protocolli di ridimensionamento "ibridi" (cioè, il [livello 2](/layer-2/)) che pubblicano i dati di stato sulla catena principale di Ethereum come `calldata`.

### Disponibilità dei dati {#data-availability}

Come accennato, i validium utilizzano un modello di disponibilità dei dati off-chain, dove gli operatori memorizzano tutti i dati delle transazioni al di fuori della Rete principale di Ethereum. La bassa impronta di dati on-chain di validium migliora la scalabilità (il volume non è limitato dalla capacità di elaborazione dei dati di Ethereum) e riduce le commissioni dell'utente (il costo di pubblicazione di `calldata` è inferiore).

La disponibilità di dati off-chain, tuttavia, presenta un problema: i dati necessari per creare o verificare le prove di Merkle potrebbero non essere disponibili. Questo significa che gli utenti potrebbero non riuscire a prelevare i fondi dal contratto on-chain se gli operatori dovessero agire in modo malevolo.

Varie soluzioni di validium tentano di risolvere questo problema decentralizzando l'archiviazione dei dati di stato. Questo comporta di costringere i produttori di blocchi a inviare i dati sottostanti a "gestori della disponibilità dei dati", responsabili dell'archiviazione dei dati off-chain e di renderli disponibili agli utenti su richiesta.

I gestori della disponibilità dei dati in validium attestano alla disponibilità dei dati per le transazioni off-chain firmando ogni batch del validium. Queste firme costituiscono una forma di "prova di disponibilità", che il contratto di verifica on-chain controlla prima di approvare gli aggiornamenti di stato.

I validium differiscono nel loro approccio alla gestione della disponibilità dei dati. Alcuni si affidano a parti fidate per memorizzare i dati di stato, mentre altri usano dei validatori assegnati casualmente per l'attività.

#### Comitato di disponibilità dei dati (DAC) {#data-availability-committee}

Per garantire la disponibilità di dati off-chain, alcune soluzioni di validium nominano un gruppo di entità fidate, collettivamente note come comitato di disponibilità dei dati (DAC), per memorizzare copie dello stato e fornire prova della disponibilità dei dati. I DAC sono più facili da implementare e richiedono un coordinamento minore, vista la bassa adesione.

Tuttavia, gli utenti devono fidarsi del fatto che i DAC rendono disponibili i dati quando serve (ad es. per generare le prove di Merkle). Esiste la possibilità che i membri del comitato di disponibilità dei dati [siano compromessi da un attore malevolo](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view), che potrebbe poi trattenere i dati off-chain.

[Maggiori informazioni sui comitati di disponibilità dei dati nei validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilità dei dati vincolata {#bonded-data-availability}

Altri validium richiedono ai partecipanti incaricati di archiviare i dati offline, di mettere in staking (cioè bloccare) i token in un contratto intelligente, prima di assumere i propri ruoli. Questo staking funge da "cauzione" per garantire il comportamento onesto tra i gestori della disponibilità dei dati e riduce le ipotesi di fiducia. Se questi partecipanti non riescono a provare la disponibilità dei dati, la cauzione viene decurtata.

In uno schema di disponibilità dei dati vincolato, chiunque può esser assegnato a detenere dati off-chain una volta fornito lo stake necessario. Questo espande il pool di gestori di disponibilità dei dati idonei, riducendo la centralizzazione che influenza i comitati di disponibilità dei dati (DAC). Ancora più importante, questo approccio si affida a incentivi criptoeconomici per prevenire l'attività malevola, il che è considerevolmente più sicuro che nominare parti fidate per proteggere i dati offline nel validium.

[Maggiori informazioni sulla disponibilità dei dati vincolata nei validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volizioni e validium {#volitions-and-validium}

I validium offrono molti vantaggi, ma presentano dei compromessi (in particolare, la disponibilità dei dati). Ma, come molte soluzioni di ridimensionamento, i validium sono adatti a casi d'uso specifici, ecco perché sono state create le volizioni.

Le volizioni combinano un rollup ZK e una catena validium e consentono agli utenti di passare tra le due soluzioni di ridimensionamento. Con le volizioni, gli utenti possono approfittare della disponibilità di dati off-chain di validium per determinate transazioni, mantenendo la libertà di passare a una soluzione di disponibilità dei dati on-chain (rollup ZK) se necessario. Questo dà essenzialmente agli utenti la libertà di scegliere i compromessi in base alle loro circostanze specifiche.

Una piattaforma di scambio decentralizzata (DEX) potrebbe preferire l'uso di un'infrastruttura scalabile e privata di validium per gli scambi di valore elevato. Può anche usare un rollup ZK per gli utenti che desiderano le maggiori garanzie di sicurezza e la mancanza di fiducia dei rollup ZK.

## Compatibilità tra validium ed EVM {#validiums-and-evm-compatibility}

Come i rollup ZK, i validium sono per lo più adatti ad applicazioni semplici, come gli scambi di token e i pagamenti. Supportare il calcolo generale e l'esecuzione di contratti intelligenti tra i Validium è difficile da implementare, dato il considerevole sovraccarico del provare le istruzioni dell'[EVM](/developers/docs/evm/) in un circuito di prova a conoscenza zero.

Alcuni progetti di validium provano ad aggirare questo problema compilando linguaggi compatibili all'EVM (es., Solidity, Vyper) per creare bytecode personalizzato e ottimizzato per una prova efficiente. Un inconveniente di questo approccio è che le nuove VM proof-friendly a conoscenza zero potrebbero non supportare importanti opcode dell'EVM, e gli sviluppatori devono scrivere direttamente nel linguaggio di alto livello per un'esperienza ottimale. Questo crea persino più problemi: obbliga gli sviluppatori a creare dapp con uno stack di sviluppo del tutto nuovo e spezza la compatibilità con l'infrastruttura corrente di Ethereum.

Alcuni team, tuttavia, stanno cercando di ottimizzare gli opcode EVM esistenti per i circuiti di prova ZK. Questo risulterà nello sviluppo di una Macchina virtuale di Ethereum a conoscenza zero (zkEVM), una VM compatibile all'EVM che produce prove per verificare la correttezza dell'esecuzione del programma. Con una zkEVM, le catene di Validium possono eseguire i contratti intelligenti all'esterno della catena e inviare le prove di validità per verificare un calcolo esterno alla catena (senza doverlo eseguire nuovamente) su Ethereum.

[Maggiori informazioni sulle zkEVM](https://www.alchemy.com/overviews/zkevm).

## Come fanno i validium a ridimensionare Ethereum? {#scaling-ethereum-with-validiums}

### 1. Archiviazione dei dati off-chain {#off-chain-data-storage}

I progetti di ridimensionamento del livello 2, come i rollup ottimistici e a conoscenza zero, rinunciano all'infinita scalabilità dei protocolli di ridimensionamento off-chain puri (ad es. [Plasma](/developers/docs/scaling/plasma/)) in cambio della sicurezza, pubblicando alcuni dati di transazione su L1. Ma questo fa sì che le proprietà di scalabilità dei rollup sia limitata dalla larghezza di banda dei dati sulla Rete principale di Ethereum (lo [sharding dei dati](/roadmap/danksharding/) propone di migliorare la capacità di archiviazione dei dati di Ethereum per questo motivo).

I validium ottengono la scalabilità mantenendo tutti i dati della transazione al di fuori della catena e pubblicando gli impegni di stato (e le prove di validità) solo quando ritrasmettono gli aggiornamenti di stato alla catena principale di Ethereum. L'esistenza delle prove di validità, tuttavia, dà ai validium garanzie di sicurezza maggiori rispetto ad altre soluzioni di ridimensionamento off-chain pure, tra cui Plasma e le [sidechain](/developers/docs/scaling/sidechains/). Riducendo la quantità di dati che Ethereum deve elaborare prima di convalidare le transazioni off-chain, i validium estendono enormemente il volume sulla Rete principale.

### 2. Prove ricorsive {#recursive-proofs}

Una prova ricorsiva è una prova di validità che verifica la validità di altre prove. Questa "prova di prove" è generata aggregando diverse prove in modo ricorsivo finché non viene creata una prova finale che verifica tutte le prove precedenti. Le prove ricorsive scalano le velocità d'elaborazione della blockchain aumentando il numero di transazioni verificabili per prova di validità.

Tipicamente, ogni prova di validità che l'operatore del validium invia a Ethereum per la verifica convalida l'integrità di un singolo blocco. Una singola prova ricorsiva può essere utilizzata per confermare la validità di diversi blocchi di validium allo stesso tempo; ciò è possibile poiché il circuito di prova può aggregare in modo ricorsivo diverse prove di blocco in una prova finale. Se il contratto di verifica on-chain accetta la prova ricorsiva, tutti i blocchi sottostanti sono immediatamente finalizzati.

## Pro e contro di validium {#pros-and-cons-of-validium}

| Pro                                                                                                                                                   | Contro                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le prove di validità impongono l'integrità delle transazioni off-chain e impediscono agli operatori di finalizzare aggiornamenti di stato non validi. | Produrre le prove di validità richiede hardware speciale, il che pone un rischio di centralizzazione.                                                                               |
| Aumenta l'efficienza del capitale per gli utenti (nessun ritardo nel prelievo dei fondi per riportarli su Ethereum)                                   | Supporto limitato al calcolo generale/ai contratti intelligenti; linguaggi specializzati richiesti per lo sviluppo.                                                                 |
| Non vulnerabile a certi tipi di attacchi economici subiti da sistemi basati su prove di frode in applicazioni ad alto valore.                         | Elevata potenza di calcolo per generare le prove ZK; non conveniente per applicazioni a basso volume.                                                                               |
| Riduce le commissioni del gas per gli utenti, non pubblicando i calldata alla Rete Principale di Ethereum.                                            | Tempo di finalità soggettiva più limitato (10-30 minuti per generare una prova ZK) ma più veloce per la finalità completa perché non c'è ritardo dovuto ai tempi di contestazione.  |
| Idoneo per casi d'uso specifici, come trading o gaming su blockchain, che danno priorità alla privacy e alla scalabilità della transazione.           | Agli utenti può essere impedito il prelievo di fondi poiché la generazione delle prove di Merkle della proprietà richiede la continua disponibilità dei dati off-chain.             |
| La disponibilità di dati off-chain fornisce livelli di volume maggiori e aumenta la scalabilità.                                                      | Il modello di sicurezza si affida a ipotesi di fiducia e incentivi cripto-economici, a differenza dei rollup ZK, che si affidano puramente a meccanismi di sicurezza crittografica. |

### Usare validium/volizioni {#use-validium-and-volitions}

Diversi progetti forniscono implementazioni di validium e volizioni che puoi integrare nelle tue dapp:

**StarkWare StarkEx** - _StarkEx è una soluzione di scalabilità del Livello 2 (L2) di Ethereum basata su prove di validità. Può operare in modalità di disponibilità dei dati rollup ZK o validium._

- [Documentazione](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Sito web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter è un protocollo di ridimensionamento del Livello 2 che affronta la disponibilità dei dati con un approccio ibrido che combina le idee dei rollup Zk e dello sharding. Può supportare arbitrariamente molti shard, ognuno con la propria politica di disponibilità dei dati._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentazione](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [Sito web](https://zksync.io/)

## Letture consigliate {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Rollup ZK vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums, and Volitions: Learn About the Hottest Ethereum Scaling Solutions](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
