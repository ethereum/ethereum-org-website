---
title: Validium
description: Un'introduzione a Validium come soluzione di ridimensionamento attualmente utilizzata dalla community di Ethereum.
lang: it
sidebarDepth: 3
---

Validium è una [soluzione di ridimensionamento](/developers/docs/scaling/) che fa rispettare l'integrità delle transazioni utilizzando prove di validità come i [rollup a conoscenza zero (ZK-rollup)](/developers/docs/scaling/zk-rollups/), ma non archivia i dati delle transazioni sulla [Mainnet di Ethereum](/). Sebbene la disponibilità dei dati offchain introduca dei compromessi, può portare a massicci miglioramenti nella scalabilità (i validium possono elaborare [\~9.000 transazioni, o più, al secondo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso la nostra pagina sul [ridimensionamento di Ethereum](/developers/docs/scaling/) e sui [layer 2 (l2)](/layer-2).

## Cos'è il validium? {#what-is-validium}

I validium sono soluzioni di ridimensionamento che utilizzano la disponibilità dei dati e il calcolo offchain, progettati per migliorare la capacità transazionale elaborando le transazioni fuori dalla Mainnet di Ethereum. Come i rollup a conoscenza zero (ZK-rollup), i validium pubblicano [prove a conoscenza zero](/glossary/#zk-proof) per verificare le transazioni offchain su Ethereum. Ciò previene transizioni di stato non valide e migliora le garanzie di sicurezza di una catena validium.

Queste "prove di validità" possono presentarsi sotto forma di ZK-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) o ZK-STARK (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Maggiori informazioni sulle [prove a conoscenza zero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

I fondi appartenenti agli utenti validium sono controllati da uno smart contract su Ethereum. I validium offrono prelievi quasi istantanei, in modo molto simile agli ZK-rollup; una volta che la prova di validità per una richiesta di prelievo è stata verificata sulla Mainnet, gli utenti possono prelevare i fondi fornendo [prove di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La prova di Merkle convalida l'inclusione della transazione di prelievo dell'utente in un lotto di transazioni verificato, consentendo al contratto onchain di elaborare il prelievo.

Tuttavia, gli utenti validium possono subire il congelamento dei propri fondi e la limitazione dei prelievi. Ciò può accadere se i gestori della disponibilità dei dati sulla catena validium nascondono agli utenti i dati di stato offchain. Senza accesso ai dati delle transazioni, gli utenti non possono calcolare la prova di Merkle richiesta per dimostrare la proprietà dei fondi ed eseguire i prelievi.

Questa è la principale differenza tra i validium e gli ZK-rollup: le loro posizioni nello spettro della disponibilità dei dati. Entrambe le soluzioni affrontano l'archiviazione dei dati in modo diverso, il che ha implicazioni per la sicurezza e l'assenza di necessità di fiducia.

## Come interagiscono i validium con Ethereum? {#how-do-validiums-interact-with-ethereum}

I validium sono protocolli di ridimensionamento costruiti sopra la catena di Ethereum esistente. Sebbene esegua le transazioni offchain, una catena validium è amministrata da un insieme di smart contract distribuiti sulla Mainnet, tra cui:

1. **Contratto verificatore**: Il contratto verificatore verifica la validità delle prove inviate dall'operatore validium quando effettua aggiornamenti di stato. Ciò include le prove di validità che attestano la correttezza delle transazioni offchain e le prove di disponibilità dei dati che verificano l'esistenza dei dati delle transazioni offchain.

2. **Contratto principale**: Il contratto principale archivia i commitment di stato (radici di Merkle) inviati dai produttori di blocchi e aggiorna lo stato del validium una volta che una prova di validità viene verificata onchain. Questo contratto elabora anche i depositi e i prelievi dalla catena validium.

I validium si affidano inoltre alla catena principale di Ethereum per quanto segue:

### Regolamento {#settlement}

Le transazioni eseguite su un validium non possono essere completamente confermate finché la catena principale non ne verifica la validità. Tutte le operazioni condotte su un validium devono infine essere regolate sulla Mainnet. La blockchain di Ethereum fornisce anche "garanzie di regolamento" per gli utenti validium, il che significa che le transazioni offchain non possono essere annullate o alterate una volta inviate onchain.

### Sicurezza {#security}

Ethereum, agendo come livello di regolamento, garantisce anche la validità delle transizioni di stato sul validium. Le transazioni offchain eseguite sulla catena validium sono verificate tramite uno smart contract sul layer di base di Ethereum.

Se il contratto verificatore onchain ritiene la prova non valida, le transazioni vengono rifiutate. Ciò significa che gli operatori devono soddisfare le condizioni di validità imposte dal protocollo di Ethereum prima di aggiornare lo stato del validium.

## Come funziona il validium? {#how-does-validium-work}

### Transazioni {#transactions}

Gli utenti inviano le transazioni all'operatore, un nodo responsabile dell'esecuzione delle transazioni sulla catena validium. Alcuni validium potrebbero utilizzare un unico operatore per eseguire la catena o affidarsi a un meccanismo di [Proof-of-Stake (PoS)](/developers/docs/consensus-mechanisms/pos/) per la rotazione degli operatori.

L'operatore aggrega le transazioni in un lotto e lo invia a un circuito di prova per la dimostrazione. Il circuito di prova accetta il lotto di transazioni (e altri dati rilevanti) come input e produce in output una prova di validità che verifica che le operazioni siano state eseguite correttamente.

### Commitment di stato {#state-commitments}

Lo stato del validium viene sottoposto a hash come un albero di Merkle con la radice archiviata nel contratto principale su Ethereum. La radice di Merkle, nota anche come radice di stato, funge da commitment crittografico allo stato attuale degli account e dei saldi sul validium.

Per eseguire un aggiornamento di stato, l'operatore deve calcolare una nuova radice di stato (dopo aver eseguito le transazioni) e inviarla al contratto onchain. Se la prova di validità risulta corretta, lo stato proposto viene accettato e il validium passa alla nuova radice di stato.

### Depositi e prelievi {#deposits-and-withdrawals}

Gli utenti spostano i fondi da Ethereum a un validium depositando ETH (o qualsiasi token compatibile con ERC) nel contratto onchain. Il contratto trasmette l'evento di deposito al validium offchain, dove all'indirizzo dell'utente viene accreditato un importo pari al suo deposito. L'operatore include anche questa transazione di deposito in un nuovo lotto.

Per riportare i fondi sulla Mainnet, un utente validium avvia una transazione di prelievo e la invia all'operatore che convalida la richiesta di prelievo e la include in un lotto. Anche gli asset dell'utente sulla catena validium vengono distrutti prima che possano uscire dal sistema. Una volta verificata la prova di validità associata al lotto, l'utente può chiamare il contratto principale per prelevare il resto del suo deposito iniziale.

Come meccanismo anti-censura, il protocollo validium consente agli utenti di prelevare direttamente dal contratto validium senza passare per l'operatore. In questo caso, gli utenti devono fornire una prova di Merkle al contratto verificatore che mostri l'inclusione di un account nella radice di stato. Se la prova viene accettata, l'utente può chiamare la funzione di prelievo del contratto principale per far uscire i propri fondi dal validium.

### Invio del lotto {#batch-submission}

Dopo aver eseguito un lotto di transazioni, l'operatore invia la prova di validità associata al contratto verificatore e propone una nuova radice di stato al contratto principale. Se la prova è valida, il contratto principale aggiorna lo stato del validium e rende finalizzato il risultato delle transazioni nel lotto.

A differenza di uno ZK-rollup, i produttori di blocchi su un validium non sono tenuti a pubblicare i dati delle transazioni per i lotti di transazioni (solo le intestazioni dei blocchi). Ciò rende il validium un protocollo di ridimensionamento puramente offchain, al contrario dei protocolli di ridimensionamento "ibridi" (ovvero i [layer 2 (l2)](/layer-2/)) che pubblicano i dati di stato sulla catena principale di Ethereum utilizzando dati blob, `calldata`, o una combinazione di entrambi.

### Disponibilità dei dati {#data-availability}

Come accennato, i validium utilizzano un modello di disponibilità dei dati offchain, in cui gli operatori archiviano tutti i dati delle transazioni fuori dalla Mainnet di Ethereum. La ridotta impronta dei dati onchain del validium migliora la scalabilità (la capacità transazionale non è limitata dalla capacità di elaborazione dei dati di Ethereum) e riduce le commissioni per gli utenti (il costo di pubblicazione dei dati onchain è inferiore).

La disponibilità dei dati offchain, tuttavia, presenta un problema: i dati necessari per creare o verificare le prove di Merkle potrebbero non essere disponibili. Ciò significa che gli utenti potrebbero non essere in grado di prelevare fondi dal contratto onchain se gli operatori dovessero agire in modo malevolo.

Varie soluzioni validium tentano di risolvere questo problema decentralizzando l'archiviazione dei dati di stato. Ciò comporta costringere i produttori di blocchi a inviare i dati sottostanti ai "gestori della disponibilità dei dati" responsabili dell'archiviazione dei dati offchain e di renderli disponibili agli utenti su richiesta.

I gestori della disponibilità dei dati nel validium attestano la disponibilità dei dati per le transazioni offchain firmando ogni lotto validium. Queste firme costituiscono una forma di "prova di disponibilità" che il contratto verificatore onchain controlla prima di approvare gli aggiornamenti di stato.

I validium differiscono nel loro approccio alla gestione della disponibilità dei dati. Alcuni si affidano a parti fidate per archiviare i dati di stato, mentre altri utilizzano validatori assegnati casualmente per l'attività.

#### DAC (Data Availability Committee) {#data-availability-committee}

Per garantire la disponibilità dei dati offchain, alcune soluzioni validium nominano un gruppo di entità fidate, note collettivamente come DAC (Data Availability Committee), per archiviare copie dello stato e fornire prove della disponibilità dei dati. I DAC sono più facili da implementare e richiedono meno coordinamento poiché il numero di membri è basso.

Tuttavia, gli utenti devono fidarsi del DAC affinché renda disponibili i dati quando necessario (ad es. per generare prove di Merkle). C'è la possibilità che i membri dei comitati per la disponibilità dei dati [vengano compromessi da un attore malintenzionato](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) che può quindi nascondere i dati offchain.

[Maggiori informazioni sui comitati per la disponibilità dei dati nei validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilità dei dati vincolata {#bonded-data-availability}

Altri validium richiedono ai partecipanti incaricati di archiviare i dati offline di mettere in staking (ovvero vincolare) dei token in uno smart contract prima di assumere i loro ruoli. Questo stake funge da "cauzione" per garantire un comportamento onesto tra i gestori della disponibilità dei dati e riduce le assunzioni di fiducia. Se questi partecipanti non riescono a dimostrare la disponibilità dei dati, la cauzione subisce lo slashing.

In uno schema di disponibilità dei dati vincolato, a chiunque può essere assegnato il compito di conservare i dati offchain una volta fornito lo stake richiesto. Ciò espande il pool di gestori della disponibilità dei dati idonei, riducendo la centralizzazione che affligge i DAC. Ancora più importante, questo approccio si basa su incentivi criptoeconomici per prevenire attività dannose, il che è notevolmente più sicuro rispetto alla nomina di parti fidate per proteggere i dati offline nel validium.

[Maggiori informazioni sulla disponibilità dei dati vincolata nei validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition e validium {#volitions-and-validium}

I validium offrono molti vantaggi ma comportano dei compromessi (in particolare, la disponibilità dei dati). Ma, come per molte soluzioni di ridimensionamento, i validium sono adatti a casi d'uso specifici, motivo per cui sono state create le volition.

Le volition combinano uno ZK-rollup e una catena validium e consentono agli utenti di passare da una soluzione di ridimensionamento all'altra. Con le volition, gli utenti possono sfruttare la disponibilità dei dati offchain del validium per determinate transazioni, pur mantenendo la libertà di passare a una soluzione di disponibilità dei dati onchain (ZK-rollup) se necessario. Ciò offre essenzialmente agli utenti la libertà di scegliere i compromessi in base alle loro circostanze uniche.

Un exchange decentralizzato (DEX) potrebbe preferire l'utilizzo dell'infrastruttura scalabile e privata di un validium per operazioni di alto valore. Può anche utilizzare uno ZK-rollup per gli utenti che desiderano le maggiori garanzie di sicurezza e l'assenza di necessità di fiducia di uno ZK-rollup.

## Validium e compatibilità con l'EVM {#validiums-and-evm-compatibility}

Come gli ZK-rollup, i validium sono per lo più adatti ad applicazioni semplici, come gli scambi di token e i pagamenti. Supportare il calcolo generale e l'esecuzione di smart contract tra i validium è difficile da implementare, dato il notevole sovraccarico per dimostrare le istruzioni dell'[EVM](/developers/docs/evm/) in un circuito di prova a conoscenza zero.

Alcuni progetti validium tentano di aggirare questo problema tramite la compilazione di linguaggi compatibili con l'EVM (ad es. Solidity, Vyper) per creare bytecode personalizzato ottimizzato per una dimostrazione efficiente. Uno svantaggio di questo approccio è che le nuove VM compatibili con le prove a conoscenza zero potrebbero non supportare importanti opcode dell'EVM e gli sviluppatori devono scrivere direttamente nel linguaggio di alto livello per un'esperienza ottimale. Ciò crea ancora più problemi: costringe gli sviluppatori a creare dapp con uno stack di sviluppo completamente nuovo e interrompe la compatibilità con l'attuale infrastruttura di Ethereum.

Alcuni team, tuttavia, stanno tentando di ottimizzare gli opcode EVM esistenti per i circuiti di prova ZK. Ciò si tradurrà nello sviluppo di una zkEVM (zero-knowledge Ethereum Virtual Machine), una VM compatibile con l'EVM che produce prove per verificare la correttezza dell'esecuzione del programma. Con una zkEVM, le catene validium possono eseguire smart contract offchain e inviare prove di validità per verificare un calcolo offchain (senza doverlo rieseguire) su Ethereum.

[Maggiori informazioni sulle zkEVM](https://www.alchemy.com/overviews/zkevm).

## Come i validium scalano Ethereum? {#scaling-ethereum-with-validiums}

### 1. Archiviazione dei dati offchain {#offchain-data-storage}

I progetti di ridimensionamento layer 2 (l2), come i rollup ottimistici e gli ZK-rollup, scambiano la scalabilità infinita dei protocolli di ridimensionamento puramente offchain (ad es. [Plasma](/developers/docs/scaling/plasma/)) con la sicurezza pubblicando alcuni dati delle transazioni sul layer 1 (l1). Ma questo significa che le proprietà di scalabilità dei rollup sono limitate dalla larghezza di banda dei dati sulla Mainnet di Ethereum (lo [sharding dei dati](/roadmap/danksharding/) propone di migliorare la capacità di archiviazione dei dati di Ethereum per questo motivo).

I validium ottengono la scalabilità mantenendo tutti i dati delle transazioni offchain e pubblicando solo i commitment di stato (e le prove di validità) quando trasmettono gli aggiornamenti di stato alla catena principale di Ethereum. L'esistenza di prove di validità, tuttavia, conferisce ai validium garanzie di sicurezza più elevate rispetto ad altre soluzioni di ridimensionamento puramente offchain, tra cui Plasma e le [sidechain](/developers/docs/scaling/sidechains/). Riducendo la quantità di dati che Ethereum deve elaborare prima di convalidare le transazioni offchain, i design validium estendono notevolmente la capacità transazionale sulla Mainnet.

### 2. Prove ricorsive {#recursive-proofs}

Una prova ricorsiva è una prova di validità che verifica la validità di altre prove. Queste "prove di prove" vengono generate aggregando ricorsivamente più prove fino a creare un'unica prova finale che verifica tutte le prove precedenti. Le prove ricorsive scalano le velocità di elaborazione della blockchain aumentando il numero di transazioni che possono essere verificate per ogni prova di validità.

In genere, ogni prova di validità che l'operatore validium invia a Ethereum per la verifica convalida l'integrità di un singolo blocco. Mentre una singola prova ricorsiva può essere utilizzata per confermare la validità di diversi blocchi validium contemporaneamente: ciò è possibile poiché il circuito di prova può aggregare ricorsivamente diverse prove di blocco in un'unica prova finale. Se il contratto verificatore onchain accetta la prova ricorsiva, tutti i blocchi sottostanti vengono finalizzati immediatamente.

## Pro e contro del validium {#pros-and-cons-of-validium}

| Pro                                                                                                                      | Contro                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le prove di validità fanno rispettare l'integrità delle transazioni offchain e impediscono agli operatori di finalizzare aggiornamenti di stato non validi. | La produzione di prove di validità richiede hardware speciale, il che pone un rischio di centralizzazione.                                                              |
| Aumenta l'efficienza del capitale per gli utenti (nessun ritardo nel prelievo dei fondi verso Ethereum).                                 | Supporto limitato per il calcolo generale/smart contract; sono richiesti linguaggi specializzati per lo sviluppo.                                             |
| Non vulnerabile a determinati attacchi economici affrontati dai sistemi basati su prove di frode in applicazioni di alto valore.                | Elevata potenza di calcolo richiesta per generare prove ZK; non conveniente per applicazioni a bassa capacità transazionale.                                         |
| Riduce le commissioni del gas per gli utenti non pubblicando i dati di chiamata sulla Mainnet di Ethereum.                                                  | Tempo di definitività soggettiva più lento (10-30 min per generare una prova ZK) ma più veloce verso la definitività completa perché non c'è alcun ritardo per il tempo di contestazione.               |
| Adatto a casi d'uso specifici, come il trading o il gaming su blockchain che danno priorità alla privacy delle transazioni e alla scalabilità.  | Agli utenti può essere impedito di prelevare fondi poiché la generazione di prove di Merkle di proprietà richiede che i dati offchain siano sempre disponibili.      |
| La disponibilità dei dati offchain fornisce livelli più elevati di capacità transazionale e aumenta la scalabilità.                              | Il modello di sicurezza si basa su assunzioni di fiducia e incentivi criptoeconomici, a differenza degli ZK-rollup, che si basano puramente su meccanismi di sicurezza crittografica. |

### Usa Validium/Volition {#use-validium-and-volitions}

Diversi progetti forniscono implementazioni di Validium e volition che puoi integrare nelle tue dapp:

**StarkWare StarkEx** - _StarkEx è una soluzione di scalabilità layer 2 (l2) di Ethereum basata su prove di validità. Può operare in modalità di disponibilità dei dati ZK-Rollup o Validium._

- [Documentazione](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Sito web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter è un protocollo di ridimensionamento layer 2 (l2) che affronta la disponibilità dei dati con un approccio ibrido che combina le idee di zkRollup e sharding. Può supportare un numero arbitrario di shard, ciascuno con la propria politica di disponibilità dei dati._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentazione](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Sito web](https://zksync.io/)

## Letture consigliate {#further-reading}

- [Validium e il Layer 2 Two-By-Two — Numero 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollup vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition e lo spettro emergente della disponibilità dei dati](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)