---
title: "Scalabilità"
description: "Un'introduzione alle diverse opzioni di scalabilità attualmente in fase di sviluppo da parte della comunità di Ethereum."
lang: it
sidebarDepth: 3
---

## Panoramica sulla scalabilità {#scaling-overview}

Man mano che il numero di persone che utilizzano [Ethereum](/) è cresciuto, la blockchain ha raggiunto determinati limiti di capacità. Ciò ha fatto aumentare il costo di utilizzo della rete, creando la necessità di "soluzioni di scalabilità". Ci sono molteplici soluzioni in fase di ricerca, test e implementazione che adottano approcci diversi per raggiungere obiettivi simili.

L'obiettivo principale della scalabilità è aumentare la velocità delle transazioni (finalità più rapida) e il throughput delle transazioni (maggior numero di transazioni al secondo) senza sacrificare la decentralizzazione o la sicurezza. Sulla blockchain di Ethereum di livello 1, l'elevata domanda porta a transazioni più lente e a [prezzi del gas](/developers/docs/gas/) non sostenibili. Aumentare la capacità della rete in termini di velocità e throughput è fondamentale per un'adozione significativa e di massa di Ethereum.

Sebbene la velocità e il throughput siano importanti, è essenziale che le soluzioni di scalabilità che consentono di raggiungere questi obiettivi rimangano decentralizzate e sicure. Mantenere bassa la barriera all'ingresso per gli operatori dei nodi è fondamentale per prevenire una progressione verso una potenza di calcolo centralizzata e insicura.

Concettualmente, classifichiamo innanzitutto la scalabilità come scalabilità on-chain o scalabilità fuori catena.

## Prerequisiti {#prerequisites}

Dovresti avere una buona comprensione di tutti gli argomenti fondamentali. L'implementazione di soluzioni di scalabilità è un argomento avanzato poiché la tecnologia è meno collaudata e continua a essere ricercata e sviluppata.

## Scalabilità on-chain {#onchain-scaling}

La scalabilità on-chain richiede modifiche al protocollo di Ethereum (la [rete principale](/glossary/#mainnet) di livello 1). Per molto tempo, ci si aspettava che la frammentazione della blockchain avrebbe scalato Ethereum. Ciò avrebbe comportato la divisione della blockchain in pezzi discreti (frammenti) da far verificare a sottoinsiemi di validatori. Tuttavia, la scalabilità tramite i rollup di livello 2 ha preso il sopravvento come tecnica di scalabilità principale. Ciò è supportato dall'aggiunta di una nuova forma di dati più economica allegata ai blocchi di Ethereum, appositamente progettata per rendere i rollup economici per gli utenti.

### Frammentazione {#sharding}

La frammentazione è il processo di divisione di un database. Sottoinsiemi di validatori sarebbero responsabili dei singoli frammenti piuttosto che tenere traccia di tutto Ethereum. La frammentazione è stata sul [piano d'azione](/roadmap/) di Ethereum per molto tempo, e un tempo si intendeva rilasciarla prima de La Fusione (The Merge) alla prova di stake. Tuttavia, il rapido sviluppo dei [rollup di livello 2](#layer-2-scaling) e l'invenzione del [Danksharding](/roadmap/danksharding) (l'aggiunta di blob di dati dei rollup ai blocchi di Ethereum che possono essere verificati in modo molto efficiente dai validatori) ha portato la comunità di Ethereum a favorire una scalabilità incentrata sui rollup invece della scalabilità tramite frammentazione. Questo aiuterà anche a mantenere più semplice la logica di consenso di Ethereum.

## Scalabilità fuori catena {#offchain-scaling}

Le soluzioni fuori catena sono implementate separatamente dalla rete principale di livello 1: non richiedono modifiche al protocollo di Ethereum esistente. Alcune soluzioni, note come soluzioni di "livello 2", derivano la loro sicurezza direttamente dal consenso di Ethereum di livello 1, come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/), i [rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/) o i [canali di stato](/developers/docs/scaling/state-channels/). Altre soluzioni comportano la creazione di nuove catene in varie forme che derivano la loro sicurezza separatamente dalla rete principale, come le [catene laterali](#sidechains), i [validium](#validium) o le [catene plasma](#plasma). Queste soluzioni comunicano con la rete principale ma derivano la loro sicurezza in modo diverso per ottenere una varietà di obiettivi.

### Scalabilità di livello 2 {#layer-2-scaling}

Questa categoria di soluzioni fuori catena deriva la sua sicurezza dalla rete principale di Ethereum.

Livello 2 è un termine collettivo per le soluzioni progettate per aiutare a scalare la tua applicazione gestendo le transazioni fuori dalla rete principale di Ethereum (livello 1) pur sfruttando il robusto modello di sicurezza decentralizzato della rete principale. La velocità delle transazioni ne risente quando la rete è occupata, rendendo l'esperienza utente scadente per determinati tipi di dApp. E man mano che la rete diventa più occupata, i prezzi del gas aumentano poiché i mittenti delle transazioni mirano a superarsi a vicenda con le offerte. Questo può rendere l'utilizzo di Ethereum molto costoso.

La maggior parte delle soluzioni di livello 2 è incentrata su un server o un cluster di server, ognuno dei quali può essere definito nodo, validatore, operatore, sequenziatore, produttore di blocchi o con un termine simile. A seconda dell'implementazione, questi nodi di livello 2 possono essere gestiti da individui, aziende o entità che li utilizzano, o da un operatore di terze parti, o da un ampio gruppo di individui (simile alla rete principale). In generale, le transazioni vengono inviate a questi nodi di livello 2 invece di essere inviate direttamente al livello 1 (rete principale). Per alcune soluzioni, l'istanza di livello 2 le raggruppa in lotti prima di ancorarle al livello 1, dopodiché sono protette dal livello 1 e non possono essere alterate. I dettagli su come ciò avvenga variano in modo significativo tra le diverse tecnologie e implementazioni di livello 2.

Una specifica istanza di livello 2 può essere aperta e condivisa da molte applicazioni, oppure può essere distribuita da un progetto e dedicata a supportare solo la propria applicazione.

#### Perché è necessario il livello 2? {#why-is-layer-2-needed}

- L'aumento delle transazioni al secondo migliora notevolmente l'esperienza utente e riduce la congestione della rete sulla rete principale di Ethereum.
- Le transazioni vengono raggruppate (rollup) in un'unica transazione verso la rete principale di Ethereum, riducendo le commissioni per gli utenti e rendendo Ethereum più inclusivo e accessibile per le persone ovunque.
- Qualsiasi aggiornamento alla scalabilità non dovrebbe andare a scapito della decentralizzazione o della sicurezza: il livello 2 si basa su Ethereum.
- Esistono reti di livello 2 specifiche per le applicazioni che portano il proprio insieme di efficienze quando si lavora con risorse su larga scala.

[Maggiori informazioni sul livello 2](/layer-2/).

#### Rollup {#rollups}

I rollup eseguono le transazioni al di fuori del livello 1 e poi i dati vengono pubblicati sul livello 1 dove viene raggiunto il consenso. Poiché i dati delle transazioni sono inclusi nei blocchi di livello 1, ciò consente ai rollup di essere protetti dalla sicurezza nativa di Ethereum.

Esistono due tipi di rollup con modelli di sicurezza diversi:

- **Rollup ottimistici**: presumono che le transazioni siano valide per impostazione predefinita ed eseguono il calcolo, tramite una [**prova di frode**](/glossary/#fraud-proof), solo in caso di contestazione. [Maggiori informazioni sui rollup ottimistici](/developers/docs/scaling/optimistic-rollups/).
- **Rollup a conoscenza zero**: eseguono il calcolo fuori catena e inviano una [**prova di validità**](/glossary/#validity-proof) alla catena. [Maggiori informazioni sui rollup a conoscenza zero](/developers/docs/scaling/zk-rollups/).

#### Canali di stato {#channels}

I canali di stato utilizzano contratti multifirma per consentire ai partecipanti di effettuare transazioni in modo rapido e libero fuori catena, per poi stabilire la finalità con la rete principale. Ciò riduce al minimo la congestione della rete, le commissioni e i ritardi. I due tipi di canali sono attualmente i canali di stato e i canali di pagamento.

Scopri di più sui [canali di stato](/developers/docs/scaling/state-channels/).

### Catene laterali {#sidechains}

Una catena laterale è una blockchain indipendente compatibile con l'EVM che funziona in parallelo alla rete principale. Queste sono compatibili con Ethereum tramite ponti bidirezionali e funzionano secondo le proprie regole di consenso e parametri dei blocchi scelti.

Scopri di più sulle [catene laterali](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una catena plasma è una blockchain separata che è ancorata alla catena principale di Ethereum e utilizza prove di frode (come i [rollup ottimistici](/developers/docs/scaling/optimistic-rollups/)) per arbitrare le controversie.

Scopri di più su [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una catena Validium utilizza prove di validità come i rollup a conoscenza zero, ma i dati non vengono archiviati sulla catena principale di Ethereum di livello 1. Ciò può portare a 10.000 transazioni al secondo per catena Validium e più catene possono essere eseguite in parallelo.

Scopri di più su [Validium](/developers/docs/scaling/validium/).

## Perché sono necessarie così tante soluzioni di scalabilità? {#why-do-we-need-these}

- Molteplici soluzioni possono aiutare a ridurre la congestione complessiva su qualsiasi parte della rete e anche a prevenire singoli punti di guasto.
- Il tutto è maggiore della somma delle sue parti. Soluzioni diverse possono esistere e lavorare in armonia, consentendo un effetto esponenziale sulla velocità e sul throughput delle transazioni future.
- Non tutte le soluzioni richiedono l'utilizzo diretto dell'algoritmo di consenso di Ethereum e le alternative possono offrire vantaggi che altrimenti sarebbero difficili da ottenere.

## Impari meglio visivamente? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Nota che la spiegazione nel video utilizza il termine "Livello 2" per riferirsi a tutte le soluzioni di scalabilità fuori catena, mentre noi differenziamo il "Livello 2" come una soluzione fuori catena che deriva la sua sicurezza attraverso il consenso della rete principale di livello 1._

<YouTube id="7pWxCklcNsU" />

## Letture di approfondimento {#further-reading}

- [Un piano d'azione di Ethereum incentrato sui rollup](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Analisi aggiornate sulle soluzioni di scalabilità di livello 2 per Ethereum](https://www.l2beat.com/)
- [Valutazione delle soluzioni di scalabilità di livello 2 di Ethereum: un framework di confronto](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guida incompleta ai rollup](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Rollup a conoscenza zero basati su Ethereum: i migliori al mondo](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollup ottimistici vs rollup a conoscenza zero](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Perché i rollup + i frammenti di dati sono l'unica soluzione sostenibile per un'elevata scalabilità](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [Che tipo di livello 3 ha senso?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilità dei dati o: come i rollup hanno imparato a non preoccuparsi e ad amare Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [La guida pratica ai rollup di Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_Conosci una risorsa della comunità che ti ha aiutato? Modifica questa pagina e aggiungila!_

## Tutorial: Costruire livelli 2 scalabili su Ethereum {#tutorials}

- [Tutto ciò che puoi memorizzare nella cache](/developers/tutorials/all-you-can-cache/) _– Come creare e utilizzare un contratto di memorizzazione nella cache per ridurre i costi dei calldata sui rollup._
- [ABI brevi per l'ottimizzazione dei calldata](/developers/tutorials/short-abi/) _– Come utilizzare ABI più brevi per ridurre i costi dei calldata per le transazioni di livello 2._