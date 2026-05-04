---
title: Validium
description: "Un'introduzione a Validium come soluzione di scalabilità attualmente utilizzata dalla community di Ethereum."
lang: it
sidebarDepth: 3
---

Validium è una [soluzione di scalabilità](/developers/docs/scaling/) che applica l'integrità delle transazioni utilizzando prove di validità come i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/), ma non archivia i dati delle transazioni sulla rete principale di [Ethereum](/). Sebbene la disponibilità dei dati fuori catena introduca dei compromessi, può portare a massicci miglioramenti nella scalabilità (i validium possono elaborare [\~9.000 transazioni, o più, al secondo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prerequisiti {#prerequisites}

Dovresti aver letto e compreso la nostra pagina sulla [scalabilità di Ethereum](/developers/docs/scaling/) e sul [livello 2](/layer-2).

## Cos'è validium? {#what-is-validium}

I validium sono soluzioni di scalabilità che utilizzano la disponibilità dei dati e il calcolo fuori catena progettati per migliorare il throughput elaborando le transazioni fuori dalla rete principale di Ethereum. Come i rollup a conoscenza zero (ZK-rollup), i validium pubblicano [prove a conoscenza-zero](/glossary/#zk-proof) per verificare le transazioni fuori catena su Ethereum. Questo previene transizioni di stato non valide e migliora le garanzie di sicurezza di una catena validium.

Queste "prove di validità" possono presentarsi sotto forma di ZK-SNARK (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) o ZK-STARK (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Maggiori informazioni sulle [prove a conoscenza-zero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

I fondi appartenenti agli utenti di validium sono controllati da un contratto intelligente su Ethereum. I validium offrono prelievi quasi istantanei, in modo molto simile agli ZK-rollup; una volta che la prova di validità per una richiesta di prelievo è stata verificata sulla rete principale, gli utenti possono prelevare i fondi fornendo [prove di Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La prova di Merkle convalida l'inclusione della transazione di prelievo dell'utente in un lotto di transazioni verificato, consentendo al contratto on-chain di elaborare il prelievo.

Tuttavia, gli utenti di validium possono subire il congelamento dei propri fondi e la limitazione dei prelievi. Questo può accadere se i gestori della disponibilità dei dati sulla catena validium nascondono agli utenti i dati di stato fuori catena. Senza accesso ai dati delle transazioni, gli utenti non possono calcolare la prova di Merkle necessaria per dimostrare la proprietà dei fondi ed eseguire i prelievi.

Questa è la principale differenza tra i validium e gli ZK-rollup: le loro posizioni nello spettro della disponibilità dei dati. Entrambe le soluzioni affrontano l'archiviazione dei dati in modo diverso, il che ha implicazioni per la sicurezza e l'assenza di fiducia.

## Come interagiscono i validium con Ethereum? {#how-do-validiums-interact-with-ethereum}

I validium sono protocolli di scalabilità costruiti sopra la catena esistente di Ethereum. Sebbene esegua transazioni fuori catena, una catena validium è amministrata da una raccolta di contratti intelligenti distribuiti sulla rete principale, tra cui:

1. **Contratto verificatore**: Il contratto verificatore verifica la validità delle prove inviate dall'operatore del validium quando effettua aggiornamenti di stato. Questo include prove di validità che attestano la correttezza delle transazioni fuori catena e prove di disponibilità dei dati che verificano l'esistenza dei dati delle transazioni fuori catena.

2. **Contratto principale**: Il contratto principale archivia gli impegni di stato (radici di Merkle) inviati dai produttori di blocchi e aggiorna lo stato del validium una volta che una prova di validità viene verificata on-chain. Questo contratto elabora anche i depositi e i prelievi dalla catena validium.

I validium si affidano anche alla catena principale di Ethereum per quanto segue:

### Regolamento {#settlement}

Le transazioni eseguite su un validium non possono essere completamente confermate finché la catena genitore non ne verifica la validità. Tutte le operazioni condotte su un validium devono infine essere regolate sulla rete principale. La blockchain di Ethereum fornisce anche "garanzie di regolamento" per gli utenti di validium, il che significa che le transazioni fuori catena non possono essere annullate o alterate una volta impegnate on-chain.

### Sicurezza {#security}

Ethereum, agendo come livello di regolamento, garantisce anche la validità delle transizioni di stato su validium. Le transazioni fuori catena eseguite sulla catena validium sono verificate tramite un contratto intelligente sul livello base di Ethereum.

Se il contratto verificatore on-chain ritiene la prova non valida, le transazioni vengono rifiutate. Questo significa che gli operatori devono soddisfare le condizioni di validità imposte dal protocollo di Ethereum prima di aggiornare lo stato del validium.

## Come funziona validium? {#how-does-validium-work}

### Transazioni {#transactions}

Gli utenti inviano transazioni all'operatore, un nodo responsabile dell'esecuzione delle transazioni sulla catena validium. Alcuni validium potrebbero utilizzare un unico operatore per eseguire la catena o affidarsi a un meccanismo di [prova di stake (PoS)](/developers/docs/consensus-mechanisms/pos/) per la rotazione degli operatori.

L'operatore aggrega le transazioni in un lotto e lo invia a un circuito di prova per la dimostrazione. Il circuito di prova accetta il lotto di transazioni (e altri dati rilevanti) come input e produce una prova di validità che verifica che le operazioni siano state eseguite correttamente.

### Impegni di stato {#state-commitments}

Lo stato del validium viene sottoposto a hash come un albero di Merkle con la radice archiviata nel contratto principale su Ethereum. La radice di Merkle, nota anche come radice di stato, funge da impegno crittografico allo stato attuale degli account e dei saldi sul validium.

Per eseguire un aggiornamento di stato, l'operatore deve calcolare una nuova radice di stato (dopo aver eseguito le transazioni) e inviarla al contratto on-chain. Se la prova di validità risulta corretta, lo stato proposto viene accettato e il validium passa alla nuova radice di stato.

### Depositi e prelievi {#deposits-and-withdrawals}

Gli utenti spostano fondi da Ethereum a un validium depositando ETH (o qualsiasi token compatibile con ERC) nel contratto on-chain. Il contratto trasmette l'evento di deposito al validium fuori catena, dove all'indirizzo dell'utente viene accreditato un importo pari al suo deposito. L'operatore include anche questa transazione di deposito in un nuovo lotto.

Per spostare i fondi di nuovo sulla rete principale, un utente di validium avvia una transazione di prelievo e la invia all'operatore che convalida la richiesta di prelievo e la include in un lotto. Anche gli asset dell'utente sulla catena validium vengono distrutti prima che possano uscire dal sistema. Una volta verificata la prova di validità associata al lotto, l'utente può chiamare il contratto principale per prelevare il resto del suo deposito iniziale.

Come meccanismo anti-censura, il protocollo validium consente agli utenti di prelevare direttamente dal contratto validium senza passare per l'operatore. In questo caso, gli utenti devono fornire una prova di Merkle al contratto verificatore che mostri l'inclusione di un account nella radice di stato. Se la prova viene accettata, l'utente può chiamare la funzione di prelievo del contratto principale per far uscire i propri fondi dal validium.

### Invio del lotto {#batch-submission}

Dopo aver eseguito un lotto di transazioni, l'operatore invia la prova di validità associata al contratto verificatore e propone una nuova radice di stato al contratto principale. Se la prova è valida, il contratto principale aggiorna lo stato del validium e finalizza i risultati delle transazioni nel lotto.

A differenza di uno ZK-rollup, i produttori di blocchi su un validium non sono tenuti a pubblicare i dati delle transazioni per i lotti di transazioni (solo le intestazioni dei blocchi). Questo rende validium un protocollo di scalabilità puramente fuori catena, in contrasto con i protocolli di scalabilità "ibridi" (cioè, [livello 2](/layer-2/)) che pubblicano i dati di stato sulla catena principale di Ethereum utilizzando dati blob, `calldata` o una combinazione di entrambi.

### Disponibilità dei dati {#data-availability}

Come accennato, i validium utilizzano un modello di disponibilità dei dati fuori catena, in cui gli operatori archiviano tutti i dati delle transazioni fuori dalla rete principale di Ethereum. La bassa impronta dei dati on-chain di Validium migliora la scalabilità (il throughput non è limitato dalla capacità di elaborazione dei dati di Ethereum) e riduce le commissioni per gli utenti (il costo di pubblicazione dei dati on-chain è inferiore).

La disponibilità dei dati fuori catena, tuttavia, presenta un problema: i dati necessari per creare o verificare le prove di Merkle potrebbero non essere disponibili. Questo significa che gli utenti potrebbero non essere in grado di prelevare fondi dal contratto on-chain se gli operatori dovessero agire in modo malevolo.

Varie soluzioni validium tentano di risolvere questo problema decentralizzando l'archiviazione dei dati di stato. Questo comporta costringere i produttori di blocchi a inviare i dati sottostanti ai "gestori della disponibilità dei dati" responsabili dell'archiviazione dei dati fuori catena e di renderli disponibili agli utenti su richiesta.

I gestori della disponibilità dei dati in validium attestano la disponibilità dei dati per le transazioni fuori catena firmando ogni lotto validium. Queste firme costituiscono una forma di "prova di disponibilità" che il contratto verificatore on-chain controlla prima di approvare gli aggiornamenti di stato.

I validium differiscono nel loro approccio alla gestione della disponibilità dei dati. Alcuni si affidano a parti fidate per archiviare i dati di stato, mentre altri utilizzano validatori assegnati casualmente per il compito.

#### Comitato per la disponibilità dei dati (DAC) {#data-availability-committee}

Per garantire la disponibilità dei dati fuori catena, alcune soluzioni validium nominano un gruppo di entità fidate, note collettivamente come comitato per la disponibilità dei dati (DAC), per archiviare copie dello stato e fornire prove della disponibilità dei dati. I DAC sono più facili da implementare e richiedono meno coordinamento poiché il numero di membri è basso.

Tuttavia, gli utenti devono fidarsi del DAC affinché renda i dati disponibili quando necessario (ad es., per generare prove di Merkle). C'è la possibilità che i membri dei comitati per la disponibilità dei dati [vengano compromessi da un attore malevolo](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) che può quindi trattenere i dati fuori catena.

[Maggiori informazioni sui comitati per la disponibilità dei dati nei validium](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilità dei dati vincolata {#bonded-data-availability}

Altri validium richiedono ai partecipanti incaricati di archiviare i dati offline di mettere in stake (cioè, bloccare) token in un contratto intelligente prima di assumere i loro ruoli. Questo stake funge da "vincolo" per garantire un comportamento onesto tra i gestori della disponibilità dei dati e riduce le ipotesi di fiducia. Se questi partecipanti non riescono a dimostrare la disponibilità dei dati, il vincolo viene punito.

In uno schema di disponibilità dei dati vincolata, chiunque può essere assegnato a conservare i dati fuori catena una volta fornito lo stake richiesto. Questo espande il pool di gestori della disponibilità dei dati idonei, riducendo la centralizzazione che affligge i comitati per la disponibilità dei dati (DAC). Ancora più importante, questo approccio si basa su incentivi criptoeconomici per prevenire attività malevole, il che è considerevolmente più sicuro rispetto alla nomina di parti fidate per proteggere i dati offline nel validium.

[Maggiori informazioni sulla disponibilità dei dati vincolata nei validium](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volition e validium {#volitions-and-validium}

I validium offrono molti vantaggi ma comportano dei compromessi (in particolare, la disponibilità dei dati). Ma, come per molte soluzioni di scalabilità, i validium sono adatti a casi d'uso specifici, motivo per cui sono state create le volition.

Le volition combinano uno ZK-rollup e una catena validium e consentono agli utenti di passare da una soluzione di scalabilità all'altra. Con le volition, gli utenti possono sfruttare la disponibilità dei dati fuori catena del validium per determinate transazioni, pur mantenendo la libertà di passare a una soluzione di disponibilità dei dati on-chain (ZK-rollup) se necessario. Questo dà essenzialmente agli utenti la libertà di scegliere i compromessi dettati dalle loro circostanze uniche.

Un exchange decentralizzato (DEX) potrebbe preferire l'utilizzo dell'infrastruttura scalabile e privata di un validium per scambi di alto valore. Può anche utilizzare uno ZK-rollup per gli utenti che desiderano le maggiori garanzie di sicurezza e l'assenza di fiducia di uno ZK-rollup.

## Validium e compatibilità con l'EVM {#validiums-and-evm-compatibility}

Come gli ZK-rollup, i validium sono per lo più adatti ad applicazioni semplici, come gli scambi di token e i pagamenti. Supportare il calcolo generale e l'esecuzione di contratti intelligenti tra i validium è difficile da implementare, dato il notevole sovraccarico nel dimostrare le istruzioni della [macchina virtuale di Ethereum](/developers/docs/evm/) in un circuito di prova a conoscenza-zero.

Alcuni progetti validium tentano di aggirare questo problema compilando linguaggi compatibili con l'EVM (ad es., Solidity, Vyper) per creare bytecode personalizzato ottimizzato per una dimostrazione efficiente. Uno svantaggio di questo approccio è che le nuove VM adatte alle prove a conoscenza-zero potrebbero non supportare importanti opcode dell'EVM, e gli sviluppatori devono scrivere direttamente nel linguaggio di alto livello per un'esperienza ottimale. Questo crea ancora più problemi: costringe gli sviluppatori a creare dApp con uno stack di sviluppo completamente nuovo e interrompe la compatibilità con l'attuale infrastruttura di Ethereum.

Alcuni team, tuttavia, stanno tentando di ottimizzare gli opcode esistenti dell'EVM per i circuiti di prova ZK. Questo porterà allo sviluppo di una macchina virtuale di Ethereum a conoscenza-zero (zkEVM), una VM compatibile con l'EVM che produce prove per verificare la correttezza dell'esecuzione del programma. Con una zkEVM, le catene validium possono eseguire contratti intelligenti fuori catena e inviare prove di validità per verificare un calcolo fuori catena (senza doverlo rieseguire) su Ethereum.

[Maggiori informazioni sulle zkEVM](https://www.alchemy.com/overviews/zkevm).

## In che modo i validium scalano Ethereum? {#scaling-ethereum-with-validiums}

### 1. Archiviazione dei dati fuori catena {#offchain-data-storage}

I progetti di scalabilità di livello 2, come i rollup ottimistici e gli ZK-rollup, scambiano la scalabilità infinita dei protocolli di scalabilità puramente fuori catena (ad es., [Plasma](/developers/docs/scaling/plasma/)) con la sicurezza pubblicando alcuni dati delle transazioni su L1. Ma questo significa che le proprietà di scalabilità dei rollup sono limitate dalla larghezza di banda dei dati sulla rete principale di Ethereum (la [frammentazione](/roadmap/danksharding/) propone di migliorare la capacità di archiviazione dei dati di Ethereum per questo motivo).

I validium ottengono la scalabilità mantenendo tutti i dati delle transazioni fuori catena e pubblicano solo gli impegni di stato (e le prove di validità) quando trasmettono gli aggiornamenti di stato alla catena principale di Ethereum. L'esistenza di prove di validità, tuttavia, conferisce ai validium garanzie di sicurezza superiori rispetto ad altre soluzioni di scalabilità puramente fuori catena, tra cui Plasma e le [catene laterali](/developers/docs/scaling/sidechains/). Riducendo la quantità di dati che Ethereum deve elaborare prima di convalidare le transazioni fuori catena, i design dei validium estendono notevolmente il throughput sulla rete principale.

### 2. Prove ricorsive {#recursive-proofs}

Una prova ricorsiva è una prova di validità che verifica la validità di altre prove. Queste "prove di prove" vengono generate aggregando ricorsivamente più prove fino a creare un'unica prova finale che verifica tutte le prove precedenti. Le prove ricorsive scalano le velocità di elaborazione della blockchain aumentando il numero di transazioni che possono essere verificate per ogni prova di validità.

In genere, ogni prova di validità che l'operatore del validium invia a Ethereum per la verifica convalida l'integrità di un singolo blocco. Mentre una singola prova ricorsiva può essere utilizzata per confermare la validità di diversi blocchi validium contemporaneamente: questo è possibile poiché il circuito di prova può aggregare ricorsivamente diverse prove di blocco in un'unica prova finale. Se il contratto verificatore on-chain accetta la prova ricorsiva, tutti i blocchi sottostanti vengono finalizzati immediatamente.

## Pro e contro di validium {#pros-and-cons-of-validium}

| Pro | Contro |
| --- | --- |
| Le prove di validità applicano l'integrità delle transazioni fuori catena e impediscono agli operatori di finalizzare aggiornamenti di stato non validi. | La produzione di prove di validità richiede hardware speciale, il che comporta un rischio di centralizzazione. |
| Aumenta l'efficienza del capitale per gli utenti (nessun ritardo nel prelevare i fondi di nuovo su Ethereum). | Supporto limitato per il calcolo generale/contratti intelligenti; sono richiesti linguaggi specializzati per lo sviluppo. |
| Non vulnerabile a determinati attacchi economici affrontati dai sistemi basati su prove di frode in applicazioni di alto valore. | Elevata potenza di calcolo richiesta per generare prove ZK; non conveniente per applicazioni a basso throughput. |
| Riduce le commissioni del gas per gli utenti non pubblicando calldata sulla rete principale di Ethereum. | Tempo di finalità soggettiva più lento (10-30 min per generare una prova ZK) ma più veloce per la finalità completa perché non c'è alcun ritardo per le dispute. |
| Adatto a casi d'uso specifici, come il trading o il gaming su blockchain che danno priorità alla privacy delle transazioni e alla scalabilità. | Agli utenti può essere impedito di prelevare fondi poiché la generazione di prove di Merkle di proprietà richiede che i dati fuori catena siano sempre disponibili. |
| La disponibilità dei dati fuori catena fornisce livelli più elevati di throughput e aumenta la scalabilità. | Il modello di sicurezza si basa su ipotesi di fiducia e incentivi criptoeconomici, a differenza degli ZK-rollup, che si basano puramente su meccanismi di sicurezza crittografica. |

### Usa Validium/Volition {#use-validium-and-volitions}

Diversi progetti forniscono implementazioni di Validium e volition che puoi integrare nelle tue dApp:

**StarkWare StarkEx** - _StarkEx è una soluzione di scalabilità di livello 2 (L2) di Ethereum basata su prove di validità. Può operare in modalità di disponibilità dei dati ZK-Rollup o Validium._

- [Documentazione](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Sito web](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter è un protocollo di scalabilità di livello 2 che affronta la disponibilità dei dati con un approccio ibrido che combina le idee di zkRollup e frammentazione. Può supportare un numero arbitrario di frammenti, ciascuno con la propria politica di disponibilità dei dati._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentazione](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Sito web](https://zksync.io/)

## Letture consigliate {#further-reading}

- [Validium And The Layer 2 Two-By-Two — Issue No. 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition and the Emerging Data Availability spectrum](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [The Practical Guide to Ethereum Rollups](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)