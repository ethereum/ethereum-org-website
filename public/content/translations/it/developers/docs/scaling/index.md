---
title: Scalabilità
description: Un'introduzione alle diverse opzioni di scalabilità attualmente in fase di sviluppo da parte della community di Ethereum.
lang: it
sidebarDepth: 3
---

## Panoramica sulla scalabilità {#scaling-overview}

Con la crescita del numero di persone che utilizzano [Ethereum](/), la blockchain ha raggiunto determinati limiti di capacità. Ciò ha fatto aumentare il costo di utilizzo della rete, creando la necessità di "soluzioni di scalabilità". Ci sono molteplici soluzioni in fase di ricerca, test e implementazione che adottano approcci diversi per raggiungere obiettivi simili.

L'obiettivo principale della scalabilità è aumentare la velocità delle transazioni (definitività più rapida) e la capacità transazionale (maggior numero di transazioni al secondo) senza sacrificare la decentralizzazione o la sicurezza. Sulla blockchain layer 1 (l1) di Ethereum, l'elevata domanda porta a transazioni più lente e a [prezzi del gas](/developers/docs/gas/) insostenibili. Aumentare la capacità della rete in termini di velocità e capacità transazionale è fondamentale per un'adozione significativa e di massa di Ethereum.

Sebbene la velocità e la capacità transazionale siano importanti, è essenziale che le soluzioni di scalabilità che consentono di raggiungere questi obiettivi rimangano decentralizzate e sicure. Mantenere bassa la barriera all'ingresso per gli operatori dei nodi è fondamentale per prevenire una progressione verso una potenza di calcolo centralizzata e insicura.

Concettualmente, classifichiamo innanzitutto la scalabilità come scalabilità onchain o scalabilità offchain.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali. L'implementazione di soluzioni di scalabilità è un argomento avanzato, poiché la tecnologia è meno collaudata sul campo e continua a essere oggetto di ricerca e sviluppo.

## Scalabilità onchain {#onchain-scaling}

La scalabilità onchain richiede modifiche al protocollo di Ethereum ([Mainnet](/glossary/#mainnet) layer 1 (l1)). Per molto tempo, si è previsto che lo sharding della blockchain avrebbe scalato Ethereum. Ciò avrebbe comportato la divisione della blockchain in parti distinte (shard) da far verificare a sottoinsiemi di validatori. Tuttavia, la scalabilità tramite rollup layer 2 (l2) ha preso il sopravvento come tecnica di scalabilità principale. Ciò è supportato dall'aggiunta di una nuova forma di dati più economica allegata ai blocchi di Ethereum, appositamente progettata per rendere i rollup economici per gli utenti.

### Sharding {#sharding}

Lo sharding è il processo di divisione di un database. Sottoinsiemi di validatori sarebbero responsabili dei singoli shard piuttosto che tenere traccia dell'intero Ethereum. Lo sharding è stato a lungo sulla [roadmap](/roadmap/) di Ethereum, e un tempo si intendeva rilasciarlo prima di The Merge alla Proof-of-Stake (PoS). Tuttavia, il rapido sviluppo dei [rollup layer 2 (l2)](#layer-2-scaling) e l'invenzione del [danksharding](/roadmap/danksharding) (l'aggiunta di blob di dati dei rollup ai blocchi di Ethereum che possono essere verificati in modo molto efficiente dai validatori) ha portato la community di Ethereum a preferire una scalabilità incentrata sui rollup invece della scalabilità tramite sharding. Questo aiuterà anche a mantenere più semplice la logica di consenso di Ethereum.

## Scalabilità offchain {#offchain-scaling}

Le soluzioni offchain sono implementate separatamente dalla Mainnet layer 1 (l1): non richiedono modifiche al protocollo Ethereum esistente. Alcune soluzioni, note come soluzioni "layer 2 (l2)", derivano la loro sicurezza direttamente dal consenso di Ethereum layer 1 (l1), come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/), i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/) o i [canali di stato](/developers/docs/scaling/state-channels/). Altre soluzioni comportano la creazione di nuove catene in varie forme che derivano la loro sicurezza separatamente dalla Mainnet, come le [sidechain](#sidechains), i [validium](#validium) o le [catene Plasma](#plasma). Queste soluzioni comunicano con la Mainnet ma derivano la loro sicurezza in modo diverso per ottenere una varietà di obiettivi.

### Scalabilità layer 2 {#layer-2-scaling}

Questa categoria di soluzioni offchain deriva la sua sicurezza dalla Mainnet di Ethereum.

Layer 2 (l2) è un termine collettivo per le soluzioni progettate per aiutare a scalare la tua applicazione gestendo le transazioni al di fuori della Mainnet di Ethereum (layer 1 (l1)), pur sfruttando il robusto modello di sicurezza decentralizzato della Mainnet. La velocità delle transazioni ne risente quando la rete è congestionata, rendendo l'esperienza utente scadente per alcuni tipi di applicazioni decentralizzate (dapp). E man mano che la rete diventa più trafficata, i prezzi del gas aumentano poiché i mittenti delle transazioni cercano di superarsi a vicenda con le offerte. Questo può rendere l'utilizzo di Ethereum molto costoso.

La maggior parte delle soluzioni layer 2 (l2) è incentrata su un server o un cluster di server, ciascuno dei quali può essere definito nodo, validatore, operatore, sequencer, produttore di blocchi o con un termine simile. A seconda dell'implementazione, questi nodi layer 2 (l2) possono essere gestiti dagli individui, dalle aziende o dalle entità che li utilizzano, oppure da un operatore di terze parti, o da un ampio gruppo di individui (simile alla Mainnet). In generale, le transazioni vengono inviate a questi nodi layer 2 (l2) invece di essere inviate direttamente al layer 1 (l1) (Mainnet). Per alcune soluzioni, l'istanza layer 2 (l2) le raggruppa poi in lotti prima di ancorarle al layer 1 (l1), dopodiché vengono protette dal layer 1 (l1) e non possono essere alterate. I dettagli su come ciò avvenga variano in modo significativo tra le diverse tecnologie e implementazioni layer 2 (l2).

Una specifica istanza layer 2 (l2) può essere aperta e condivisa da molte applicazioni, oppure può essere distribuita da un singolo progetto e dedicata a supportare solo la propria applicazione.

#### Perché è necessario il layer 2? {#why-is-layer-2-needed}

- L'aumento delle transazioni al secondo migliora notevolmente l'esperienza utente e riduce la congestione della rete sulla Mainnet di Ethereum.
- Le transazioni vengono raggruppate (rolled up) in un'unica transazione verso la Mainnet di Ethereum, riducendo le commissioni del gas per gli utenti e rendendo Ethereum più inclusivo e accessibile per le persone ovunque.
- Qualsiasi aggiornamento alla scalabilità non dovrebbe andare a scapito della decentralizzazione o della sicurezza: il layer 2 (l2) è costruito sopra Ethereum.
- Esistono reti layer 2 (l2) specifiche per le applicazioni che apportano il proprio insieme di efficienze quando si lavora con asset su larga scala.

[Maggiori informazioni sul layer 2](/layer-2/).

#### Rollup {#rollups}

I rollup eseguono le transazioni al di fuori del layer 1 (l1) e poi i dati vengono pubblicati sul layer 1 (l1) dove viene raggiunto il consenso. Poiché i dati delle transazioni sono inclusi nei blocchi del layer 1 (l1), ciò consente ai rollup di essere protetti dalla sicurezza nativa di Ethereum.

Esistono due tipi di rollup con modelli di sicurezza diversi:

- **Rollup ottimistici**: presumono che le transazioni siano valide per impostazione predefinita ed eseguono il calcolo, tramite una [**prova di frode**](/glossary/#fraud-proof), solo in caso di contestazione. [Maggiori informazioni sui rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).
- **Rollup a conoscenza zero**: eseguono il calcolo offchain e inviano una [**prova di validità**](/glossary/#validity-proof) alla catena. [Maggiori informazioni sui rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/).

#### Canali di stato {#channels}

I canali di stato utilizzano contratti multisig per consentire ai partecipanti di effettuare transazioni in modo rapido e libero offchain, per poi stabilire la definitività con la Mainnet. Questo riduce al minimo la congestione della rete, le commissioni e i ritardi. I due tipi di canali attualmente esistenti sono i canali di stato e i canali di pagamento.

Scopri di più sui [canali di stato](/developers/docs/scaling/state-channels/).

### Sidechain {#sidechains}

Una sidechain è una blockchain indipendente compatibile con l'EVM che funziona in parallelo alla Mainnet. Queste sono compatibili con Ethereum tramite bridge bidirezionali e funzionano secondo le proprie regole di consenso e parametri di blocco scelti.

Scopri di più sulle [sidechain](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una catena Plasma è una blockchain separata che è ancorata alla catena principale di Ethereum e utilizza prove di frode (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le controversie.

Scopri di più su [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una catena validium utilizza prove di validità come i rollup a conoscenza zero, ma i dati non vengono archiviati sulla catena principale layer 1 (l1) di Ethereum. Questo può portare a 10.000 transazioni al secondo per catena validium e più catene possono essere eseguite in parallelo.

Scopri di più su [Validium](/developers/docs/scaling/validium/).

## Perché sono necessarie così tante soluzioni di scalabilità? {#why-do-we-need-these}

- Molteplici soluzioni possono aiutare a ridurre la congestione complessiva su qualsiasi parte della rete e anche a prevenire singoli punti di guasto.
- Il tutto è maggiore della somma delle sue parti. Soluzioni diverse possono esistere e lavorare in armonia, consentendo un effetto esponenziale sulla futura velocità delle transazioni e sulla capacità transazionale.
- Non tutte le soluzioni richiedono l'utilizzo diretto dell'algoritmo di consenso di Ethereum, e le alternative possono offrire vantaggi che altrimenti sarebbero difficili da ottenere.

## Preferisci imparare visivamente? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Nota che la spiegazione nel video utilizza il termine "Layer 2" per riferirsi a tutte le soluzioni di scalabilità offchain, mentre noi differenziamo il "Layer 2 (l2)" come una soluzione offchain che deriva la sua sicurezza attraverso il consenso della Mainnet layer 1 (l1)._

<VideoWatch slug="rollups-scaling-strategy" />

## Letture di approfondimento {#further-reading}

- [Una roadmap di Ethereum incentrata sui rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analisi aggiornate sulle soluzioni di scalabilità Layer 2 per Ethereum](https://www.l2beat.com/)
- [Valutazione delle soluzioni di scalabilità layer 2 di Ethereum: un framework di confronto](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guida incompleta ai rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollup basati su Ethereum: i migliori al mondo](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollup ottimistici vs ZK Rollup](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Perché i rollup + gli shard di dati sono l'unica soluzione sostenibile per un'elevata scalabilità](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Che tipo di Layer 3 ha senso?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilità dei dati o: come i rollup hanno imparato a non preoccuparsi e ad amare Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Conosci una risorsa della community che ti è stata utile? Modifica questa pagina e aggiungila!_

## Tutorial: Costruire Layer 2 scalabili su Ethereum {#tutorials}

- [All you can cache](/developers/tutorials/all-you-can-cache/) _– Come costruire e utilizzare un contratto di caching per ridurre i costi dei dati di chiamata (calldata) sui rollup._
- [ABI brevi per l'ottimizzazione dei calldata](/developers/tutorials/short-abi/) _– Come utilizzare ABI più brevi per ridurre i costi dei dati di chiamata per le transazioni layer 2 (l2)._